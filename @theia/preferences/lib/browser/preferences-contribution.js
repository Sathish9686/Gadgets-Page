"use strict";
/********************************************************************************
 * Copyright (C) 2018 Ericsson and others.
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
exports.PreferencesContribution = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/core/lib/browser");
var os_1 = require("@theia/core/lib/common/os");
var browser_3 = require("@theia/editor/lib/browser");
var preference_widget_1 = require("./views/preference-widget");
var workspace_preference_provider_1 = require("./workspace-preference-provider");
var preference_types_1 = require("./util/preference-types");
var clipboard_service_1 = require("@theia/core/lib/browser/clipboard-service");
var file_service_1 = require("@theia/filesystem/lib/browser/file-service");
var PreferencesContribution = /** @class */ (function (_super) {
    __extends(PreferencesContribution, _super);
    function PreferencesContribution() {
        return _super.call(this, {
            widgetId: preference_widget_1.PreferencesWidget.ID,
            widgetName: preference_widget_1.PreferencesWidget.LABEL,
            defaultWidgetOptions: {
                area: 'main',
            },
        }) || this;
    }
    PreferencesContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        commands.registerCommand(browser_1.CommonCommands.OPEN_PREFERENCES, {
            execute: function () { return _this.openView({ reveal: true }); },
        });
        commands.registerCommand(preference_types_1.PreferencesCommands.OPEN_PREFERENCES_JSON_TOOLBAR, {
            isEnabled: function () { return true; },
            isVisible: function (w) { return _this.withWidget(w, function () { return true; }); },
            execute: function (preferenceNode) {
                _this.openPreferencesJSON(preferenceNode);
            }
        });
        commands.registerCommand(preference_types_1.PreferencesCommands.COPY_JSON_NAME, {
            isEnabled: preference_types_1.Preference.EditorCommandArgs.is,
            isVisible: preference_types_1.Preference.EditorCommandArgs.is,
            execute: function (_a) {
                var id = _a.id, value = _a.value;
                _this.clipboardService.writeText(id);
            }
        });
        commands.registerCommand(preference_types_1.PreferencesCommands.COPY_JSON_VALUE, {
            isEnabled: preference_types_1.Preference.EditorCommandArgs.is,
            isVisible: preference_types_1.Preference.EditorCommandArgs.is,
            execute: function (_a) {
                var id = _a.id, value = _a.value;
                var jsonString = "\"" + id + "\": " + JSON.stringify(value);
                _this.clipboardService.writeText(jsonString);
            }
        });
        commands.registerCommand(preference_types_1.PreferencesCommands.RESET_PREFERENCE, {
            isEnabled: preference_types_1.Preference.EditorCommandArgs.is,
            isVisible: preference_types_1.Preference.EditorCommandArgs.is,
            execute: function (_a) {
                var id = _a.id;
                _this.preferenceService.set(id, undefined, Number(_this.scopeTracker.currentScope.scope), _this.scopeTracker.currentScope.uri);
            }
        });
    };
    PreferencesContribution.prototype.registerMenus = function (menus) {
        menus.registerMenuAction(browser_1.CommonMenus.FILE_SETTINGS_SUBMENU_OPEN, {
            commandId: browser_1.CommonCommands.OPEN_PREFERENCES.id,
            label: browser_1.CommonCommands.OPEN_PREFERENCES.label,
            order: 'a10',
        });
        menus.registerMenuAction(browser_1.CommonMenus.SETTINGS_OPEN, {
            commandId: browser_1.CommonCommands.OPEN_PREFERENCES.id,
            label: browser_1.CommonCommands.OPEN_PREFERENCES.label,
            order: 'a10',
        });
        menus.registerMenuAction(preference_types_1.PreferenceMenus.PREFERENCE_EDITOR_CONTEXT_MENU, {
            commandId: preference_types_1.PreferencesCommands.RESET_PREFERENCE.id,
            label: preference_types_1.PreferencesCommands.RESET_PREFERENCE.label,
            order: 'a'
        });
        menus.registerMenuAction(preference_types_1.PreferenceMenus.PREFERENCE_EDITOR_COPY_ACTIONS, {
            commandId: preference_types_1.PreferencesCommands.COPY_JSON_VALUE.id,
            label: preference_types_1.PreferencesCommands.COPY_JSON_VALUE.label,
            order: 'b'
        });
        menus.registerMenuAction(preference_types_1.PreferenceMenus.PREFERENCE_EDITOR_COPY_ACTIONS, {
            commandId: preference_types_1.PreferencesCommands.COPY_JSON_NAME.id,
            label: preference_types_1.PreferencesCommands.COPY_JSON_NAME.label,
            order: 'c'
        });
    };
    PreferencesContribution.prototype.registerKeybindings = function (keybindings) {
        keybindings.registerKeybinding({
            command: browser_1.CommonCommands.OPEN_PREFERENCES.id,
            keybinding: (os_1.isOSX && !browser_2.isFirefox) ? 'cmd+,' : 'ctrl+,'
        });
    };
    PreferencesContribution.prototype.registerToolbarItems = function (toolbar) {
        toolbar.registerItem({
            id: preference_types_1.PreferencesCommands.OPEN_PREFERENCES_JSON_TOOLBAR.id,
            command: preference_types_1.PreferencesCommands.OPEN_PREFERENCES_JSON_TOOLBAR.id,
            tooltip: 'Open Preferences in JSON',
            priority: 0,
        });
    };
    PreferencesContribution.prototype.openPreferencesJSON = function (preferenceNode) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var wasOpenedFromEditor, _b, scope, activeScopeIsFolder, uri, scopeID, preferenceId, currentPreferenceValue, valueInCurrentScope, jsonEditorWidget, jsonUriToOpen, text, index, numReturns;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        wasOpenedFromEditor = preferenceNode.constructor !== preference_widget_1.PreferencesWidget;
                        _b = this.scopeTracker.currentScope, scope = _b.scope, activeScopeIsFolder = _b.activeScopeIsFolder, uri = _b.uri;
                        scopeID = Number(scope);
                        preferenceId = wasOpenedFromEditor ? preferenceNode.id : '';
                        // when opening from toolbar, widget is passed as arg by default (we don't need this info)
                        if (wasOpenedFromEditor && preferenceNode.preference.values) {
                            currentPreferenceValue = preferenceNode.preference.values;
                            valueInCurrentScope = (_a = preference_types_1.Preference.getValueInScope(currentPreferenceValue, scopeID)) !== null && _a !== void 0 ? _a : currentPreferenceValue.defaultValue;
                            this.preferenceService.set(preferenceId, valueInCurrentScope, scopeID, uri);
                        }
                        return [4 /*yield*/, this.obtainConfigUri(scopeID, activeScopeIsFolder, uri)];
                    case 1:
                        jsonUriToOpen = _c.sent();
                        if (!jsonUriToOpen) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.editorManager.open(jsonUriToOpen)];
                    case 2:
                        jsonEditorWidget = _c.sent();
                        if (wasOpenedFromEditor) {
                            text = jsonEditorWidget.editor.document.getText();
                            if (preferenceId) {
                                index = text.match(preferenceId).index;
                                numReturns = text.slice(0, index).match(new RegExp('\n', 'g')).length;
                                jsonEditorWidget.editor.cursor = { line: numReturns, character: 4 + preferenceId.length + 4 };
                            }
                        }
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PreferencesContribution.prototype.obtainConfigUri = function (serializedScope, activeScopeIsFolder, resource) {
        return __awaiter(this, void 0, void 0, function () {
            var scope, resourceUri, configUri, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        scope = serializedScope;
                        if (activeScopeIsFolder === 'true') {
                            scope = browser_1.PreferenceScope.Folder;
                        }
                        resourceUri = !!resource ? resource : undefined;
                        configUri = this.preferenceService.getConfigUri(scope, resourceUri);
                        if (!configUri) {
                            return [2 /*return*/, undefined];
                        }
                        _a = configUri;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fileService.exists(configUri)];
                    case 1:
                        _a = !(_b.sent());
                        _b.label = 2;
                    case 2:
                        if (!_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.fileService.create(configUri)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, configUri];
                }
            });
        });
    };
    /**
     * Determine if the current widget is the PreferencesWidget.
     */
    PreferencesContribution.prototype.withWidget = function (widget, fn) {
        if (widget === void 0) { widget = this.tryGetWidget(); }
        if (widget instanceof preference_widget_1.PreferencesWidget && widget.id === preference_widget_1.PreferencesWidget.ID) {
            return fn(widget);
        }
        return false;
    };
    __decorate([
        inversify_1.inject(file_service_1.FileService),
        __metadata("design:type", file_service_1.FileService)
    ], PreferencesContribution.prototype, "fileService", void 0);
    __decorate([
        inversify_1.inject(browser_1.PreferenceProvider),
        inversify_1.named(browser_1.PreferenceScope.Workspace),
        __metadata("design:type", workspace_preference_provider_1.WorkspacePreferenceProvider)
    ], PreferencesContribution.prototype, "workspacePreferenceProvider", void 0);
    __decorate([
        inversify_1.inject(browser_3.EditorManager),
        __metadata("design:type", browser_3.EditorManager)
    ], PreferencesContribution.prototype, "editorManager", void 0);
    __decorate([
        inversify_1.inject(browser_1.PreferenceService),
        __metadata("design:type", Object)
    ], PreferencesContribution.prototype, "preferenceService", void 0);
    __decorate([
        inversify_1.inject(clipboard_service_1.ClipboardService),
        __metadata("design:type", Object)
    ], PreferencesContribution.prototype, "clipboardService", void 0);
    __decorate([
        inversify_1.inject(preference_widget_1.PreferencesWidget),
        __metadata("design:type", preference_widget_1.PreferencesWidget)
    ], PreferencesContribution.prototype, "scopeTracker", void 0);
    PreferencesContribution = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], PreferencesContribution);
    return PreferencesContribution;
}(browser_1.AbstractViewContribution));
exports.PreferencesContribution = PreferencesContribution;
//# sourceMappingURL=preferences-contribution.js.map