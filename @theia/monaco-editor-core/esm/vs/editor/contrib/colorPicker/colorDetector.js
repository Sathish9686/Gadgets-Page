/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { TimeoutTimer, createCancelablePromise } from '../../../base/common/async';
import { RGBA } from '../../../base/common/color';
import { onUnexpectedError } from '../../../base/common/errors';
import { hash } from '../../../base/common/hash';
import { Disposable, DisposableStore } from '../../../base/common/lifecycle';
import { registerEditorContribution } from '../../browser/editorExtensions';
import { ICodeEditorService } from '../../browser/services/codeEditorService';
import { Range } from '../../common/core/range';
import { ModelDecorationOptions } from '../../common/model/textModel';
import { ColorProviderRegistry } from '../../common/modes';
import { getColors } from './color';
import { IConfigurationService } from '../../../platform/configuration/common/configuration';
var MAX_DECORATORS = 500;
var ColorDetector = /** @class */ (function (_super) {
    __extends(ColorDetector, _super);
    function ColorDetector(_editor, _codeEditorService, _configurationService) {
        var _this = _super.call(this) || this;
        _this._editor = _editor;
        _this._codeEditorService = _codeEditorService;
        _this._configurationService = _configurationService;
        _this._localToDispose = _this._register(new DisposableStore());
        _this._decorationsIds = [];
        _this._colorDatas = new Map();
        _this._colorDecoratorIds = [];
        _this._decorationsTypes = new Set();
        _this._register(_editor.onDidChangeModel(function (e) {
            _this._isEnabled = _this.isEnabled();
            _this.onModelChanged();
        }));
        _this._register(_editor.onDidChangeModelLanguage(function (e) { return _this.onModelChanged(); }));
        _this._register(ColorProviderRegistry.onDidChange(function (e) { return _this.onModelChanged(); }));
        _this._register(_editor.onDidChangeConfiguration(function (e) {
            var prevIsEnabled = _this._isEnabled;
            _this._isEnabled = _this.isEnabled();
            if (prevIsEnabled !== _this._isEnabled) {
                if (_this._isEnabled) {
                    _this.onModelChanged();
                }
                else {
                    _this.removeAllDecorations();
                }
            }
        }));
        _this._timeoutTimer = null;
        _this._computePromise = null;
        _this._isEnabled = _this.isEnabled();
        _this.onModelChanged();
        return _this;
    }
    ColorDetector.prototype.isEnabled = function () {
        var model = this._editor.getModel();
        if (!model) {
            return false;
        }
        var languageId = model.getLanguageIdentifier();
        // handle deprecated settings. [languageId].colorDecorators.enable
        var deprecatedConfig = this._configurationService.getValue(languageId.language);
        if (deprecatedConfig) {
            var colorDecorators = deprecatedConfig['colorDecorators']; // deprecatedConfig.valueOf('.colorDecorators.enable');
            if (colorDecorators && colorDecorators['enable'] !== undefined && !colorDecorators['enable']) {
                return colorDecorators['enable'];
            }
        }
        return this._editor.getOption(12 /* colorDecorators */);
    };
    ColorDetector.get = function (editor) {
        return editor.getContribution(this.ID);
    };
    ColorDetector.prototype.dispose = function () {
        this.stop();
        this.removeAllDecorations();
        _super.prototype.dispose.call(this);
    };
    ColorDetector.prototype.onModelChanged = function () {
        var _this = this;
        this.stop();
        if (!this._isEnabled) {
            return;
        }
        var model = this._editor.getModel();
        if (!model || !ColorProviderRegistry.has(model)) {
            return;
        }
        this._localToDispose.add(this._editor.onDidChangeModelContent(function (e) {
            if (!_this._timeoutTimer) {
                _this._timeoutTimer = new TimeoutTimer();
                _this._timeoutTimer.cancelAndSet(function () {
                    _this._timeoutTimer = null;
                    _this.beginCompute();
                }, ColorDetector.RECOMPUTE_TIME);
            }
        }));
        this.beginCompute();
    };
    ColorDetector.prototype.beginCompute = function () {
        var _this = this;
        this._computePromise = createCancelablePromise(function (token) {
            var model = _this._editor.getModel();
            if (!model) {
                return Promise.resolve([]);
            }
            return getColors(model, token);
        });
        this._computePromise.then(function (colorInfos) {
            _this.updateDecorations(colorInfos);
            _this.updateColorDecorators(colorInfos);
            _this._computePromise = null;
        }, onUnexpectedError);
    };
    ColorDetector.prototype.stop = function () {
        if (this._timeoutTimer) {
            this._timeoutTimer.cancel();
            this._timeoutTimer = null;
        }
        if (this._computePromise) {
            this._computePromise.cancel();
            this._computePromise = null;
        }
        this._localToDispose.clear();
    };
    ColorDetector.prototype.updateDecorations = function (colorDatas) {
        var _this = this;
        var decorations = colorDatas.map(function (c) { return ({
            range: {
                startLineNumber: c.colorInfo.range.startLineNumber,
                startColumn: c.colorInfo.range.startColumn,
                endLineNumber: c.colorInfo.range.endLineNumber,
                endColumn: c.colorInfo.range.endColumn
            },
            options: ModelDecorationOptions.EMPTY
        }); });
        this._decorationsIds = this._editor.deltaDecorations(this._decorationsIds, decorations);
        this._colorDatas = new Map();
        this._decorationsIds.forEach(function (id, i) { return _this._colorDatas.set(id, colorDatas[i]); });
    };
    ColorDetector.prototype.updateColorDecorators = function (colorData) {
        var _this = this;
        var decorations = [];
        var newDecorationsTypes = {};
        for (var i = 0; i < colorData.length && decorations.length < MAX_DECORATORS; i++) {
            var _a = colorData[i].colorInfo.color, red = _a.red, green = _a.green, blue = _a.blue, alpha = _a.alpha;
            var rgba = new RGBA(Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255), alpha);
            var subKey = hash(rgba).toString(16);
            var color = "rgba(" + rgba.r + ", " + rgba.g + ", " + rgba.b + ", " + rgba.a + ")";
            var key = 'colorBox-' + subKey;
            if (!this._decorationsTypes.has(key) && !newDecorationsTypes[key]) {
                this._codeEditorService.registerDecorationType(key, {
                    before: {
                        contentText: ' ',
                        border: 'solid 0.1em #000',
                        margin: '0.1em 0.2em 0 0.2em',
                        width: '0.8em',
                        height: '0.8em',
                        backgroundColor: color
                    },
                    dark: {
                        before: {
                            border: 'solid 0.1em #eee'
                        }
                    }
                }, undefined, this._editor);
            }
            newDecorationsTypes[key] = true;
            decorations.push({
                range: {
                    startLineNumber: colorData[i].colorInfo.range.startLineNumber,
                    startColumn: colorData[i].colorInfo.range.startColumn,
                    endLineNumber: colorData[i].colorInfo.range.endLineNumber,
                    endColumn: colorData[i].colorInfo.range.endColumn
                },
                options: this._codeEditorService.resolveDecorationOptions(key, true)
            });
        }
        this._decorationsTypes.forEach(function (subType) {
            if (!newDecorationsTypes[subType]) {
                _this._codeEditorService.removeDecorationType(subType);
            }
        });
        this._colorDecoratorIds = this._editor.deltaDecorations(this._colorDecoratorIds, decorations);
    };
    ColorDetector.prototype.removeAllDecorations = function () {
        var _this = this;
        this._decorationsIds = this._editor.deltaDecorations(this._decorationsIds, []);
        this._colorDecoratorIds = this._editor.deltaDecorations(this._colorDecoratorIds, []);
        this._decorationsTypes.forEach(function (subType) {
            _this._codeEditorService.removeDecorationType(subType);
        });
    };
    ColorDetector.prototype.getColorData = function (position) {
        var _this = this;
        var model = this._editor.getModel();
        if (!model) {
            return null;
        }
        var decorations = model
            .getDecorationsInRange(Range.fromPositions(position, position))
            .filter(function (d) { return _this._colorDatas.has(d.id); });
        if (decorations.length === 0) {
            return null;
        }
        return this._colorDatas.get(decorations[0].id);
    };
    ColorDetector.ID = 'editor.contrib.colorDetector';
    ColorDetector.RECOMPUTE_TIME = 1000; // ms
    ColorDetector = __decorate([
        __param(1, ICodeEditorService),
        __param(2, IConfigurationService)
    ], ColorDetector);
    return ColorDetector;
}(Disposable));
export { ColorDetector };
registerEditorContribution(ColorDetector.ID, ColorDetector);
