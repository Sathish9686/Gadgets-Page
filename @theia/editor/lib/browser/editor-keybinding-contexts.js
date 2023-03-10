"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrictEditorTextFocusContext = exports.DiffEditorTextFocusContext = exports.EditorTextFocusContext = exports.EditorKeybindingContexts = void 0;
var inversify_1 = require("inversify");
var editor_manager_1 = require("./editor-manager");
var browser_1 = require("@theia/core/lib/browser");
var EditorKeybindingContexts;
(function (EditorKeybindingContexts) {
    /**
     * ID of a keybinding context that is enabled when the active text editor has the focus.
     */
    EditorKeybindingContexts.editorTextFocus = 'editorTextFocus';
    /**
     * ID of a keybinding context that is enabled when the active diff editor has the focus.
     */
    EditorKeybindingContexts.diffEditorTextFocus = 'diffEditorTextFocus';
    /**
     * Unique identifier of a keybinding context that is enabled if the active editor has the focus but it does not have any overlaying widgets, such as the content assist widget.
     */
    EditorKeybindingContexts.strictEditorTextFocus = 'strictEditorTextFocus';
})(EditorKeybindingContexts = exports.EditorKeybindingContexts || (exports.EditorKeybindingContexts = {}));
var EditorTextFocusContext = /** @class */ (function () {
    function EditorTextFocusContext() {
        this.id = EditorKeybindingContexts.editorTextFocus;
    }
    EditorTextFocusContext.prototype.isEnabled = function () {
        return !!this.getEditor();
    };
    EditorTextFocusContext.prototype.getEditor = function () {
        var widget = this.editorManager.activeEditor;
        if (widget && this.canHandle(widget)) {
            return widget;
        }
        return undefined;
    };
    EditorTextFocusContext.prototype.canHandle = function (widget) {
        return widget.editor.isFocused();
    };
    __decorate([
        inversify_1.inject(editor_manager_1.EditorManager),
        __metadata("design:type", editor_manager_1.EditorManager)
    ], EditorTextFocusContext.prototype, "editorManager", void 0);
    EditorTextFocusContext = __decorate([
        inversify_1.injectable()
    ], EditorTextFocusContext);
    return EditorTextFocusContext;
}());
exports.EditorTextFocusContext = EditorTextFocusContext;
var DiffEditorTextFocusContext = /** @class */ (function (_super) {
    __extends(DiffEditorTextFocusContext, _super);
    function DiffEditorTextFocusContext() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = EditorKeybindingContexts.diffEditorTextFocus;
        return _this;
    }
    DiffEditorTextFocusContext.prototype.canHandle = function (widget) {
        return _super.prototype.canHandle.call(this, widget) && browser_1.DiffUris.isDiffUri(widget.editor.uri);
    };
    DiffEditorTextFocusContext = __decorate([
        inversify_1.injectable()
    ], DiffEditorTextFocusContext);
    return DiffEditorTextFocusContext;
}(EditorTextFocusContext));
exports.DiffEditorTextFocusContext = DiffEditorTextFocusContext;
/**
 * Keybinding context that is enabled when the active text editor has the focus **AND** it does not
 * have any widgets (for example, the content assist widget) overlaying the active editor.
 */
var StrictEditorTextFocusContext = /** @class */ (function (_super) {
    __extends(StrictEditorTextFocusContext, _super);
    function StrictEditorTextFocusContext() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = EditorKeybindingContexts.strictEditorTextFocus;
        return _this;
    }
    StrictEditorTextFocusContext = __decorate([
        inversify_1.injectable()
    ], StrictEditorTextFocusContext);
    return StrictEditorTextFocusContext;
}(EditorTextFocusContext));
exports.StrictEditorTextFocusContext = StrictEditorTextFocusContext;
//# sourceMappingURL=editor-keybinding-contexts.js.map