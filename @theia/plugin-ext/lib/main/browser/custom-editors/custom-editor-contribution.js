"use strict";
/********************************************************************************
 * Copyright (c) 2021 SAP SE or an SAP affiliate company and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomEditorContribution = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var custom_editor_widget_1 = require("./custom-editor-widget");
var CustomEditorContribution = /** @class */ (function () {
    function CustomEditorContribution() {
    }
    CustomEditorContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        commands.registerHandler(browser_1.CommonCommands.UNDO.id, {
            isEnabled: function () { return _this.shell.activeWidget instanceof custom_editor_widget_1.CustomEditorWidget; },
            execute: function () { return _this.shell.activeWidget.undo(); }
        });
        commands.registerHandler(browser_1.CommonCommands.REDO.id, {
            isEnabled: function () { return _this.shell.activeWidget instanceof custom_editor_widget_1.CustomEditorWidget; },
            execute: function () { return _this.shell.activeWidget.redo(); }
        });
    };
    __decorate([
        inversify_1.inject(browser_1.ApplicationShell),
        __metadata("design:type", browser_1.ApplicationShell)
    ], CustomEditorContribution.prototype, "shell", void 0);
    CustomEditorContribution = __decorate([
        inversify_1.injectable()
    ], CustomEditorContribution);
    return CustomEditorContribution;
}());
exports.CustomEditorContribution = CustomEditorContribution;
//# sourceMappingURL=custom-editor-contribution.js.map