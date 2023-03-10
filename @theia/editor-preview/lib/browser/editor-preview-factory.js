"use strict";
/********************************************************************************
 * Copyright (C) 2018 Google and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorPreviewWidgetFactory = void 0;
var uri_1 = require("@theia/core/lib/common/uri");
var browser_1 = require("@theia/core/lib/browser");
var editor_preview_widget_1 = require("./editor-preview-widget");
var inversify_1 = require("inversify");
var browser_2 = require("@theia/editor/lib/browser");
var coreutils_1 = require("@phosphor/coreutils");
var EditorPreviewWidgetFactory = /** @class */ (function () {
    function EditorPreviewWidgetFactory() {
        this.id = EditorPreviewWidgetFactory_1.ID;
    }
    EditorPreviewWidgetFactory_1 = EditorPreviewWidgetFactory;
    EditorPreviewWidgetFactory.generateUniqueId = function () {
        return coreutils_1.UUID.uuid4();
    };
    EditorPreviewWidgetFactory.prototype.createWidget = function (options) {
        return this.doCreate(options);
    };
    EditorPreviewWidgetFactory.prototype.doCreate = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var widget, _a, previewWidget;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(options.session === EditorPreviewWidgetFactory_1.sessionId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.editorManager.getOrCreateByUri(new uri_1.default(options.initialUri))];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = undefined;
                        _b.label = 3;
                    case 3:
                        widget = _a;
                        previewWidget = new editor_preview_widget_1.EditorPreviewWidget(this.widgetManager, widget);
                        previewWidget.id = options.id;
                        return [2 /*return*/, previewWidget];
                }
            });
        });
    };
    var EditorPreviewWidgetFactory_1;
    EditorPreviewWidgetFactory.ID = 'editor-preview-widget';
    EditorPreviewWidgetFactory.sessionId = EditorPreviewWidgetFactory_1.generateUniqueId();
    __decorate([
        inversify_1.inject(browser_1.WidgetManager),
        __metadata("design:type", browser_1.WidgetManager)
    ], EditorPreviewWidgetFactory.prototype, "widgetManager", void 0);
    __decorate([
        inversify_1.inject(browser_2.EditorManager),
        __metadata("design:type", browser_2.EditorManager)
    ], EditorPreviewWidgetFactory.prototype, "editorManager", void 0);
    EditorPreviewWidgetFactory = EditorPreviewWidgetFactory_1 = __decorate([
        inversify_1.injectable()
    ], EditorPreviewWidgetFactory);
    return EditorPreviewWidgetFactory;
}());
exports.EditorPreviewWidgetFactory = EditorPreviewWidgetFactory;
//# sourceMappingURL=editor-preview-factory.js.map