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
import './selectBox.css';
import { Widget } from '../widget';
import { Color } from '../../../common/color';
import { deepClone } from '../../../common/objects';
import { SelectBoxNative } from './selectBoxNative';
import { SelectBoxList } from './selectBoxCustom';
import { isMacintosh } from '../../../common/platform';
export var defaultStyles = {
    selectBackground: Color.fromHex('#3C3C3C'),
    selectForeground: Color.fromHex('#F0F0F0'),
    selectBorder: Color.fromHex('#3C3C3C')
};
var SelectBox = /** @class */ (function (_super) {
    __extends(SelectBox, _super);
    function SelectBox(options, selected, contextViewProvider, styles, selectBoxOptions) {
        if (styles === void 0) { styles = deepClone(defaultStyles); }
        var _this = _super.call(this) || this;
        // Default to native SelectBox for OSX unless overridden
        if (isMacintosh && !(selectBoxOptions === null || selectBoxOptions === void 0 ? void 0 : selectBoxOptions.useCustomDrawn)) {
            _this.selectBoxDelegate = new SelectBoxNative(options, selected, styles, selectBoxOptions);
        }
        else {
            _this.selectBoxDelegate = new SelectBoxList(options, selected, contextViewProvider, styles, selectBoxOptions);
        }
        _this._register(_this.selectBoxDelegate);
        return _this;
    }
    Object.defineProperty(SelectBox.prototype, "onDidSelect", {
        // Public SelectBox Methods - routed through delegate interface
        get: function () {
            return this.selectBoxDelegate.onDidSelect;
        },
        enumerable: true,
        configurable: true
    });
    SelectBox.prototype.setOptions = function (options, selected) {
        this.selectBoxDelegate.setOptions(options, selected);
    };
    SelectBox.prototype.select = function (index) {
        this.selectBoxDelegate.select(index);
    };
    SelectBox.prototype.setAriaLabel = function (label) {
        this.selectBoxDelegate.setAriaLabel(label);
    };
    SelectBox.prototype.focus = function () {
        this.selectBoxDelegate.focus();
    };
    SelectBox.prototype.blur = function () {
        this.selectBoxDelegate.blur();
    };
    // Public Widget Methods - routed through delegate interface
    SelectBox.prototype.render = function (container) {
        this.selectBoxDelegate.render(container);
    };
    SelectBox.prototype.style = function (styles) {
        this.selectBoxDelegate.style(styles);
    };
    SelectBox.prototype.applyStyles = function () {
        this.selectBoxDelegate.applyStyles();
    };
    return SelectBox;
}(Widget));
export { SelectBox };
