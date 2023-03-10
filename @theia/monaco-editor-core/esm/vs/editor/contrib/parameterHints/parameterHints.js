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
import * as nls from '../../../nls';
import { Disposable } from '../../../base/common/lifecycle';
import { IInstantiationService } from '../../../platform/instantiation/common/instantiation';
import { EditorContextKeys } from '../../common/editorContextKeys';
import { ContextKeyExpr } from '../../../platform/contextkey/common/contextkey';
import { registerEditorAction, registerEditorContribution, EditorAction, EditorCommand, registerEditorCommand } from '../../browser/editorExtensions';
import { ParameterHintsWidget } from './parameterHintsWidget';
import { Context } from './provideSignatureHelp';
import * as modes from '../../common/modes';
var ParameterHintsController = /** @class */ (function (_super) {
    __extends(ParameterHintsController, _super);
    function ParameterHintsController(editor, instantiationService) {
        var _this = _super.call(this) || this;
        _this.editor = editor;
        _this.widget = _this._register(instantiationService.createInstance(ParameterHintsWidget, _this.editor));
        return _this;
    }
    ParameterHintsController.get = function (editor) {
        return editor.getContribution(ParameterHintsController.ID);
    };
    ParameterHintsController.prototype.cancel = function () {
        this.widget.cancel();
    };
    ParameterHintsController.prototype.previous = function () {
        this.widget.previous();
    };
    ParameterHintsController.prototype.next = function () {
        this.widget.next();
    };
    ParameterHintsController.prototype.trigger = function (context) {
        this.widget.trigger(context);
    };
    ParameterHintsController.ID = 'editor.controller.parameterHints';
    ParameterHintsController = __decorate([
        __param(1, IInstantiationService)
    ], ParameterHintsController);
    return ParameterHintsController;
}(Disposable));
var TriggerParameterHintsAction = /** @class */ (function (_super) {
    __extends(TriggerParameterHintsAction, _super);
    function TriggerParameterHintsAction() {
        return _super.call(this, {
            id: 'editor.action.triggerParameterHints',
            label: nls.localize('parameterHints.trigger.label', "Trigger Parameter Hints"),
            alias: 'Trigger Parameter Hints',
            precondition: EditorContextKeys.hasSignatureHelpProvider,
            kbOpts: {
                kbExpr: EditorContextKeys.editorTextFocus,
                primary: 2048 /* CtrlCmd */ | 1024 /* Shift */ | 10 /* Space */,
                weight: 100 /* EditorContrib */
            }
        }) || this;
    }
    TriggerParameterHintsAction.prototype.run = function (accessor, editor) {
        var controller = ParameterHintsController.get(editor);
        if (controller) {
            controller.trigger({
                triggerKind: modes.SignatureHelpTriggerKind.Invoke
            });
        }
    };
    return TriggerParameterHintsAction;
}(EditorAction));
export { TriggerParameterHintsAction };
registerEditorContribution(ParameterHintsController.ID, ParameterHintsController);
registerEditorAction(TriggerParameterHintsAction);
var weight = 100 /* EditorContrib */ + 75;
var ParameterHintsCommand = EditorCommand.bindToContribution(ParameterHintsController.get);
registerEditorCommand(new ParameterHintsCommand({
    id: 'closeParameterHints',
    precondition: Context.Visible,
    handler: function (x) { return x.cancel(); },
    kbOpts: {
        weight: weight,
        kbExpr: EditorContextKeys.focus,
        primary: 9 /* Escape */,
        secondary: [1024 /* Shift */ | 9 /* Escape */]
    }
}));
registerEditorCommand(new ParameterHintsCommand({
    id: 'showPrevParameterHint',
    precondition: ContextKeyExpr.and(Context.Visible, Context.MultipleSignatures),
    handler: function (x) { return x.previous(); },
    kbOpts: {
        weight: weight,
        kbExpr: EditorContextKeys.focus,
        primary: 16 /* UpArrow */,
        secondary: [512 /* Alt */ | 16 /* UpArrow */],
        mac: { primary: 16 /* UpArrow */, secondary: [512 /* Alt */ | 16 /* UpArrow */, 256 /* WinCtrl */ | 46 /* KEY_P */] }
    }
}));
registerEditorCommand(new ParameterHintsCommand({
    id: 'showNextParameterHint',
    precondition: ContextKeyExpr.and(Context.Visible, Context.MultipleSignatures),
    handler: function (x) { return x.next(); },
    kbOpts: {
        weight: weight,
        kbExpr: EditorContextKeys.focus,
        primary: 18 /* DownArrow */,
        secondary: [512 /* Alt */ | 18 /* DownArrow */],
        mac: { primary: 18 /* DownArrow */, secondary: [512 /* Alt */ | 18 /* DownArrow */, 256 /* WinCtrl */ | 44 /* KEY_N */] }
    }
}));
