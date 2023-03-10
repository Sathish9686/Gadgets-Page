"use strict";
/********************************************************************************
 * Copyright (C) 2018 Red Hat, Inc. and others.
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginVscodeCommandsContribution = exports.VscodeCommands = void 0;
var core_1 = require("@theia/core");
var browser_1 = require("@theia/core/lib/browser");
var context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
var application_shell_mouse_tracker_1 = require("@theia/core/lib/browser/shell/application-shell-mouse-tracker");
var command_1 = require("@theia/core/lib/common/command");
var uri_1 = require("@theia/core/lib/common/uri");
var browser_2 = require("@theia/editor/lib/browser");
var menus_contribution_handler_1 = require("@theia/plugin-ext/lib/main/browser/menus/menus-contribution-handler");
var documents_main_1 = require("@theia/plugin-ext/lib/main/browser/documents-main");
var untitled_resource_1 = require("@theia/plugin-ext/lib/main/browser/editor/untitled-resource");
var type_converters_1 = require("@theia/plugin-ext/lib/plugin/type-converters");
var browser_3 = require("@theia/workspace/lib/browser");
var workspace_service_1 = require("@theia/workspace/lib/browser/workspace-service");
var diff_service_1 = require("@theia/workspace/lib/browser/diff-service");
var inversify_1 = require("inversify");
var vscode_uri_1 = require("vscode-uri");
var plugin_protocol_1 = require("@theia/plugin-ext/lib/common/plugin-protocol");
var monaco_editor_1 = require("@theia/monaco/lib/browser/monaco-editor");
var terminal_frontend_contribution_1 = require("@theia/terminal/lib/browser/terminal-frontend-contribution");
var quick_open_workspace_1 = require("@theia/workspace/lib/browser/quick-open-workspace");
var terminal_service_1 = require("@theia/terminal/lib/browser/base/terminal-service");
var navigator_contribution_1 = require("@theia/navigator/lib/browser/navigator-contribution");
var browser_4 = require("@theia/navigator/lib/browser");
var tree_selection_1 = require("@theia/core/lib/browser/tree/tree-selection");
var file_service_1 = require("@theia/filesystem/lib/browser/file-service");
var VscodeCommands;
(function (VscodeCommands) {
    VscodeCommands.OPEN = {
        id: 'vscode.open'
    };
    VscodeCommands.OPEN_FOLDER = {
        id: 'vscode.openFolder'
    };
    VscodeCommands.DIFF = {
        id: 'vscode.diff'
    };
    VscodeCommands.INSTALL_FROM_VSIX = {
        id: 'workbench.extensions.installExtension'
    };
})(VscodeCommands = exports.VscodeCommands || (exports.VscodeCommands = {}));
var PluginVscodeCommandsContribution = /** @class */ (function () {
    function PluginVscodeCommandsContribution() {
    }
    PluginVscodeCommandsContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        commands.registerCommand(VscodeCommands.OPEN, {
            isVisible: function () { return false; },
            execute: function (resource, columnOrOptions) { return __awaiter(_this, void 0, void 0, function () {
                var options, editorOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!resource) {
                                throw new Error(VscodeCommands.OPEN.id + " command requires at least URI argument.");
                            }
                            if (!vscode_uri_1.URI.isUri(resource)) {
                                throw new Error("Invalid argument for " + VscodeCommands.OPEN.id + " command with URI argument. Found " + resource);
                            }
                            if (typeof columnOrOptions === 'number') {
                                options = {
                                    viewColumn: columnOrOptions
                                };
                            }
                            else if (columnOrOptions) {
                                options = __assign({}, columnOrOptions);
                            }
                            editorOptions = documents_main_1.DocumentsMainImpl.toEditorOpenerOptions(this.shell, options);
                            return [4 /*yield*/, browser_1.open(this.openerService, new uri_1.default(resource), editorOptions)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }
        });
        commands.registerCommand(VscodeCommands.OPEN_FOLDER, {
            isVisible: function () { return false; },
            execute: function (resource, arg) {
                if (arg === void 0) { arg = {}; }
                return __awaiter(_this, void 0, void 0, function () {
                    var options;
                    return __generator(this, function (_a) {
                        if (!resource) {
                            return [2 /*return*/, commands.executeCommand(browser_3.WorkspaceCommands.OPEN_WORKSPACE.id)];
                        }
                        if (!vscode_uri_1.URI.isUri(resource)) {
                            throw new Error("Invalid argument for " + VscodeCommands.OPEN_FOLDER.id + " command with URI argument. Found " + resource);
                        }
                        if (typeof arg === 'boolean') {
                            options = { preserveWindow: !arg };
                        }
                        else {
                            options = { preserveWindow: !arg.forceNewWindow };
                        }
                        this.workspaceService.open(new uri_1.default(resource), options);
                        return [2 /*return*/];
                    });
                });
            }
        });
        commands.registerCommand(VscodeCommands.DIFF, {
            isVisible: function () { return false; },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            execute: function (left, right, label, options) { return __awaiter(_this, void 0, void 0, function () {
                var leftURI, editorOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!left || !right) {
                                throw new Error(VscodeCommands.DIFF + " command requires at least two URI arguments. Found left=" + left + ", right=" + right + " as arguments");
                            }
                            if (!vscode_uri_1.URI.isUri(left)) {
                                throw new Error("Invalid argument for " + VscodeCommands.DIFF.id + " command with left argument. Expecting URI left type but found " + left);
                            }
                            if (!vscode_uri_1.URI.isUri(right)) {
                                throw new Error("Invalid argument for " + VscodeCommands.DIFF.id + " command with right argument. Expecting URI right type but found " + right);
                            }
                            leftURI = new uri_1.default(left);
                            editorOptions = documents_main_1.DocumentsMainImpl.toEditorOpenerOptions(this.shell, options);
                            return [4 /*yield*/, this.diffService.openDiffEditor(leftURI, new uri_1.default(right), label, editorOptions)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }
        });
        // https://code.visualstudio.com/docs/getstarted/keybindings#_navigation
        /*
         * internally, in VS Code, any widget opened in the main area is represented as an editor
         * operations below apply to them, but not to side-bar widgets, like the explorer
         *
         * in Theia, there are not such difference and any widget can be put in any area
         * because of it we filter out editors from views based on `NavigatableWidget.is`
         * and apply actions only to them
         */
        commands.registerCommand({ id: 'workbench.action.files.newUntitledFile' }, {
            execute: function () { return browser_1.open(_this.openerService, untitled_resource_1.createUntitledURI()); }
        });
        if (!core_1.environment.electron.is() || core_1.isOSX) {
            commands.registerCommand({ id: 'workbench.action.files.openFileFolder' }, {
                execute: function () { return commands.executeCommand(browser_3.WorkspaceCommands.OPEN.id); }
            });
        }
        commands.registerCommand({ id: 'workbench.action.files.openFile' }, {
            execute: function () { return commands.executeCommand(browser_3.WorkspaceCommands.OPEN_FILE.id); }
        });
        commands.registerCommand({ id: 'workbench.action.files.openFolder' }, {
            execute: function () { return commands.executeCommand(browser_3.WorkspaceCommands.OPEN_FOLDER.id); }
        });
        commands.registerCommand({ id: 'workbench.action.addRootFolder' }, {
            execute: function () { return commands.executeCommand(browser_3.WorkspaceCommands.ADD_FOLDER.id); }
        });
        commands.registerCommand({ id: 'workbench.action.gotoLine' }, {
            execute: function () { return commands.executeCommand('editor.action.gotoLine'); }
        });
        commands.registerCommand({ id: 'workbench.action.quickOpen' }, {
            execute: function () { return _this.quickOpen.open(''); }
        });
        commands.registerCommand({ id: 'workbench.action.openSettings' }, {
            execute: function () { return commands.executeCommand(browser_1.CommonCommands.OPEN_PREFERENCES.id); }
        });
        commands.registerCommand({ id: VscodeCommands.INSTALL_FROM_VSIX.id }, {
            execute: function (vsixUriOrExtensionId) { return __awaiter(_this, void 0, void 0, function () {
                var uriPath, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(typeof vsixUriOrExtensionId === 'string')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.pluginServer.deploy("vscode:extension/" + vsixUriOrExtensionId)];
                        case 1:
                            _b.sent();
                            return [3 /*break*/, 7];
                        case 2:
                            if (!type_converters_1.isUriComponents(vsixUriOrExtensionId)) return [3 /*break*/, 3];
                            _a = vscode_uri_1.URI.revive(vsixUriOrExtensionId).fsPath;
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, this.fileService.fsPath(vsixUriOrExtensionId)];
                        case 4:
                            _a = _b.sent();
                            _b.label = 5;
                        case 5:
                            uriPath = _a;
                            return [4 /*yield*/, this.pluginServer.deploy("local-file:" + uriPath)];
                        case 6:
                            _b.sent();
                            _b.label = 7;
                        case 7: return [2 /*return*/];
                    }
                });
            }); }
        });
        commands.registerCommand({ id: 'workbench.action.files.save', }, {
            execute: function (uri) {
                if (uri) {
                    var uriString_1 = uri.toString();
                    var widget = _this.shell.widgets.find(function (w) {
                        var resourceUri = browser_1.Saveable.is(w) && browser_1.NavigatableWidget.is(w) && w.getResourceUri();
                        return (resourceUri && resourceUri.toString()) === uriString_1;
                    });
                    if (browser_1.Saveable.is(widget)) {
                        browser_1.Saveable.save(widget);
                    }
                }
                else {
                    _this.shell.save();
                }
            }
        });
        commands.registerCommand({ id: 'workbench.action.files.saveAll', }, {
            execute: function () { return _this.shell.saveAll(); }
        });
        commands.registerCommand({ id: 'workbench.action.closeActiveEditor' }, {
            execute: function (uri) { return __awaiter(_this, void 0, void 0, function () {
                var widget, uriString_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            widget = this.editorManager.currentEditor || this.shell.currentWidget;
                            if (uri) {
                                uriString_2 = uri.toString();
                                widget = this.shell.widgets.find(function (w) {
                                    var resourceUri = browser_1.NavigatableWidget.is(w) && w.getResourceUri();
                                    return (resourceUri && resourceUri.toString()) === uriString_2;
                                });
                            }
                            if (!this.codeEditorWidgetUtil.is(widget)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.shell.closeWidget(widget.id)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); }
        });
        commands.registerCommand({ id: 'workbench.action.closeOtherEditors' }, {
            execute: function (uri) { return __awaiter(_this, void 0, void 0, function () {
                var editor, uriString_3, _a, _b, widget, e_1_1;
                var e_1, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            editor = this.editorManager.currentEditor || this.shell.currentWidget;
                            if (uri) {
                                uriString_3 = uri.toString();
                                editor = this.editorManager.all.find(function (e) {
                                    var resourceUri = e.getResourceUri();
                                    return (resourceUri && resourceUri.toString()) === uriString_3;
                                });
                            }
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 6, 7, 8]);
                            _a = __values(this.shell.widgets), _b = _a.next();
                            _d.label = 2;
                        case 2:
                            if (!!_b.done) return [3 /*break*/, 5];
                            widget = _b.value;
                            if (!(this.codeEditorWidgetUtil.is(widget) && widget !== editor)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.shell.closeWidget(widget.id)];
                        case 3:
                            _d.sent();
                            _d.label = 4;
                        case 4:
                            _b = _a.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_1_1 = _d.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            }); }
        });
        commands.registerCommand({ id: 'workbench.action.closeEditorsInGroup' }, {
            execute: function (uri) {
                var editor = _this.editorManager.currentEditor || _this.shell.currentWidget;
                if (uri) {
                    var uriString_4 = uri.toString();
                    editor = _this.editorManager.all.find(function (e) {
                        var resourceUri = e.getResourceUri();
                        return (resourceUri && resourceUri.toString()) === uriString_4;
                    });
                }
                if (editor) {
                    var tabBar = _this.shell.getTabBarFor(editor);
                    if (tabBar) {
                        _this.shell.closeTabs(tabBar, function (_a) {
                            var owner = _a.owner;
                            return _this.codeEditorWidgetUtil.is(owner);
                        });
                    }
                }
            }
        });
        commands.registerCommand({ id: 'workbench.action.closeEditorsInOtherGroups' }, {
            execute: function () {
                var e_2, _a;
                var editor = _this.editorManager.currentEditor || _this.shell.currentWidget;
                if (editor) {
                    var editorTabBar = _this.shell.getTabBarFor(editor);
                    try {
                        for (var _b = __values(_this.shell.allTabBars), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var tabBar = _c.value;
                            if (tabBar !== editorTabBar) {
                                _this.shell.closeTabs(tabBar, function (_a) {
                                    var owner = _a.owner;
                                    return _this.codeEditorWidgetUtil.is(owner);
                                });
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        });
        commands.registerCommand({ id: 'workbench.action.closeEditorsToTheLeft' }, {
            execute: function () {
                var editor = _this.editorManager.currentEditor || _this.shell.currentWidget;
                if (editor) {
                    var tabBar = _this.shell.getTabBarFor(editor);
                    if (tabBar) {
                        var left_1 = true;
                        _this.shell.closeTabs(tabBar, function (_a) {
                            var owner = _a.owner;
                            if (owner === editor) {
                                left_1 = false;
                                return false;
                            }
                            return left_1 && _this.codeEditorWidgetUtil.is(owner);
                        });
                    }
                }
            }
        });
        commands.registerCommand({ id: 'workbench.action.closeEditorsToTheRight' }, {
            execute: function () {
                var editor = _this.editorManager.currentEditor || _this.shell.currentWidget;
                if (editor) {
                    var tabBar = _this.shell.getTabBarFor(editor);
                    if (tabBar) {
                        var left_2 = true;
                        _this.shell.closeTabs(tabBar, function (_a) {
                            var owner = _a.owner;
                            if (owner === editor) {
                                left_2 = false;
                                return false;
                            }
                            return !left_2 && _this.codeEditorWidgetUtil.is(owner);
                        });
                    }
                }
            }
        });
        commands.registerCommand({ id: 'workbench.action.closeAllEditors' }, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var promises, _a, _b, widget;
                var e_3, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            promises = [];
                            try {
                                for (_a = __values(this.shell.widgets), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    widget = _b.value;
                                    if (this.codeEditorWidgetUtil.is(widget)) {
                                        promises.push(this.shell.closeWidget(widget.id));
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            return [4 /*yield*/, Promise.all(promises)];
                        case 1:
                            _d.sent();
                            return [2 /*return*/];
                    }
                });
            }); }
        });
        commands.registerCommand({ id: 'workbench.action.nextEditor' }, {
            execute: function () { return _this.shell.activateNextTab(); }
        });
        commands.registerCommand({ id: 'workbench.action.previousEditor' }, {
            execute: function () { return _this.shell.activatePreviousTab(); }
        });
        commands.registerCommand({ id: 'workbench.action.navigateBack' }, {
            execute: function () { return commands.executeCommand(browser_2.EditorCommands.GO_BACK.id); }
        });
        commands.registerCommand({ id: 'workbench.action.navigateForward' }, {
            execute: function () { return commands.executeCommand(browser_2.EditorCommands.GO_FORWARD.id); }
        });
        commands.registerCommand({ id: 'workbench.action.navigateToLastEditLocation' }, {
            execute: function () { return commands.executeCommand(browser_2.EditorCommands.GO_LAST_EDIT.id); }
        });
        commands.registerCommand({ id: 'openInTerminal' }, {
            execute: function (resource) { return _this.terminalContribution.openInTerminal(new uri_1.default(resource.toString())); }
        });
        commands.registerCommand({ id: 'workbench.action.reloadWindow' }, {
            execute: function () {
                window.location.reload();
            }
        });
        commands.registerCommand({ id: 'workbench.action.revertAndCloseActiveEditor' }, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var editor, monacoEditor, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            editor = this.editorManager.currentEditor;
                            if (!editor) return [3 /*break*/, 5];
                            monacoEditor = monaco_editor_1.MonacoEditor.getCurrent(this.editorManager);
                            if (!monacoEditor) return [3 /*break*/, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 5]);
                            return [4 /*yield*/, monacoEditor.document.revert()];
                        case 2:
                            _a.sent();
                            editor.close();
                            return [3 /*break*/, 5];
                        case 3:
                            error_1 = _a.sent();
                            return [4 /*yield*/, this.shell.closeWidget(editor.id, { save: false })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); }
        });
        /**
         * TODO:
         * Keep Open: workbench.action.keepEditor
         * Open Next: workbench.action.openNextRecentlyUsedEditorInGroup
         * Open Previous: workbench.action.openPreviousRecentlyUsedEditorInGroup
         * Copy Path of Active File: workbench.action.files.copyPathOfActiveFile
         * Reveal Active File in Windows: workbench.action.files.revealActiveFileInWindows
         * Show Opened File in New Window: workbench.action.files.showOpenedFileInNewWindow
         * Compare Opened File With: workbench.files.action.compareFileWith
         */
        // Register built-in language service commands
        // see https://code.visualstudio.com/api/references/commands
        /* eslint-disable @typescript-eslint/no-explicit-any */
        // TODO register other `vscode.execute...` commands.
        // see https://github.com/microsoft/vscode/blob/master/src/vs/workbench/api/common/extHostApiCommands.ts
        commands.registerCommand({
            id: 'vscode.executeDefinitionProvider'
        }, {
            execute: (function (resource, position) {
                return commands.executeCommand('_executeDefinitionProvider', monaco.Uri.from(resource), position);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeDeclarationProvider'
        }, {
            execute: (function (resource, position) {
                return commands.executeCommand('_executeDeclarationProvider', monaco.Uri.from(resource), position);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeTypeDefinitionProvider'
        }, {
            execute: (function (resource, position) {
                return commands.executeCommand('_executeTypeDefinitionProvider', monaco.Uri.from(resource), position);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeImplementationProvider'
        }, {
            execute: (function (resource, position) {
                return commands.executeCommand('_executeImplementationProvider', monaco.Uri.from(resource), position);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeHoverProvider'
        }, {
            execute: (function (resource, position) {
                return commands.executeCommand('_executeHoverProvider', monaco.Uri.from(resource), position);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeDocumentHighlights'
        }, {
            execute: (function (resource, position) {
                return commands.executeCommand('_executeDocumentHighlights', monaco.Uri.from(resource), position);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeReferenceProvider'
        }, {
            execute: (function (resource, position) { return commands.executeCommand('_executeReferenceProvider', monaco.Uri.from(resource), position); })
        });
        commands.registerCommand({
            id: 'vscode.executeDocumentSymbolProvider'
        }, {
            execute: function (resource) { return commands.executeCommand('_executeDocumentSymbolProvider', monaco.Uri.parse(resource.toString())).then(function (value) {
                if (!Array.isArray(value) || value === undefined) {
                    return undefined;
                }
                return value.map(function (loc) { return type_converters_1.toDocumentSymbol(loc); });
            }); }
        });
        commands.registerCommand({
            id: 'vscode.executeFormatDocumentProvider'
        }, {
            execute: (function (resource, options) {
                return commands.executeCommand('_executeFormatDocumentProvider', monaco.Uri.from(resource), options);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeFormatRangeProvider'
        }, {
            execute: (function (resource, range, options) {
                return commands.executeCommand('_executeFormatRangeProvider', monaco.Uri.from(resource), range, options);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeFormatOnTypeProvider'
        }, {
            execute: (function (resource, position, ch, options) {
                return commands.executeCommand('_executeFormatOnTypeProvider', monaco.Uri.from(resource), position, ch, options);
            })
        });
        commands.registerCommand({
            id: 'vscode.prepareCallHierarchy'
        }, {
            execute: (function (resource, position) {
                return commands.executeCommand('_executePrepareCallHierarchy', monaco.Uri.from(resource), position);
            })
        });
        commands.registerCommand({
            id: 'vscode.provideIncomingCalls'
        }, {
            execute: (function (item) {
                return commands.executeCommand('_executeProvideIncomingCalls', { item: item });
            })
        });
        commands.registerCommand({
            id: 'vscode.provideOutgoingCalls'
        }, {
            execute: (function (item) {
                return commands.executeCommand('_executeProvideOutgoingCalls', { item: item });
            })
        });
        commands.registerCommand({
            id: 'workbench.action.openRecent'
        }, {
            execute: function () { return _this.quickOpenWorkspace.select(); }
        });
        commands.registerCommand({
            id: 'explorer.newFolder'
        }, {
            execute: function () { return commands.executeCommand(browser_3.WorkspaceCommands.NEW_FOLDER.id); }
        });
        commands.registerCommand({
            id: 'workbench.action.terminal.sendSequence'
        }, {
            execute: function (args) {
                if (args === undefined || args.text === undefined) {
                    return;
                }
                var currentTerminal = _this.terminalService.currentTerminal;
                if (currentTerminal === undefined) {
                    return;
                }
                currentTerminal.sendText(args.text);
            }
        });
        commands.registerCommand({
            id: 'workbench.action.terminal.kill'
        }, {
            execute: function () {
                var currentTerminal = _this.terminalService.currentTerminal;
                if (currentTerminal === undefined) {
                    return;
                }
                currentTerminal.dispose();
            }
        });
        commands.registerCommand({
            id: 'workbench.view.explorer'
        }, {
            execute: function () { return commands.executeCommand(navigator_contribution_1.FileNavigatorCommands.FOCUS.id); }
        });
        commands.registerCommand({
            id: 'copyFilePath'
        }, {
            execute: function () { return commands.executeCommand(browser_1.CommonCommands.COPY_PATH.id); }
        });
        commands.registerCommand({
            id: 'copyRelativeFilePath'
        }, {
            execute: function () { return commands.executeCommand(navigator_contribution_1.FileNavigatorCommands.COPY_RELATIVE_FILE_PATH.id); }
        });
        commands.registerCommand({
            id: 'revealInExplorer'
        }, {
            execute: function (resource) { return __awaiter(_this, void 0, void 0, function () {
                var navigator, model, node;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!vscode_uri_1.URI.isUri(resource)) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.shell.revealWidget(browser_4.FILE_NAVIGATOR_ID)];
                        case 1:
                            navigator = _a.sent();
                            if (!!navigator) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.commandService.executeCommand(navigator_contribution_1.FILE_NAVIGATOR_TOGGLE_COMMAND_ID)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.shell.revealWidget(browser_4.FILE_NAVIGATOR_ID)];
                        case 3:
                            navigator = _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!(navigator instanceof browser_4.FileNavigatorWidget)) return [3 /*break*/, 6];
                            model = navigator.model;
                            return [4 /*yield*/, model.revealFile(new uri_1.default(resource))];
                        case 5:
                            node = _a.sent();
                            if (tree_selection_1.SelectableTreeNode.is(node)) {
                                model.selectNode(node);
                            }
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            }); }
        });
    };
    __decorate([
        inversify_1.inject(command_1.CommandService),
        __metadata("design:type", Object)
    ], PluginVscodeCommandsContribution.prototype, "commandService", void 0);
    __decorate([
        inversify_1.inject(context_key_service_1.ContextKeyService),
        __metadata("design:type", context_key_service_1.ContextKeyService)
    ], PluginVscodeCommandsContribution.prototype, "contextKeyService", void 0);
    __decorate([
        inversify_1.inject(browser_2.EditorManager),
        __metadata("design:type", browser_2.EditorManager)
    ], PluginVscodeCommandsContribution.prototype, "editorManager", void 0);
    __decorate([
        inversify_1.inject(browser_1.ApplicationShell),
        __metadata("design:type", browser_1.ApplicationShell)
    ], PluginVscodeCommandsContribution.prototype, "shell", void 0);
    __decorate([
        inversify_1.inject(diff_service_1.DiffService),
        __metadata("design:type", diff_service_1.DiffService)
    ], PluginVscodeCommandsContribution.prototype, "diffService", void 0);
    __decorate([
        inversify_1.inject(browser_1.OpenerService),
        __metadata("design:type", Object)
    ], PluginVscodeCommandsContribution.prototype, "openerService", void 0);
    __decorate([
        inversify_1.inject(application_shell_mouse_tracker_1.ApplicationShellMouseTracker),
        __metadata("design:type", application_shell_mouse_tracker_1.ApplicationShellMouseTracker)
    ], PluginVscodeCommandsContribution.prototype, "mouseTracker", void 0);
    __decorate([
        inversify_1.inject(browser_1.PrefixQuickOpenService),
        __metadata("design:type", browser_1.PrefixQuickOpenService)
    ], PluginVscodeCommandsContribution.prototype, "quickOpen", void 0);
    __decorate([
        inversify_1.inject(workspace_service_1.WorkspaceService),
        __metadata("design:type", workspace_service_1.WorkspaceService)
    ], PluginVscodeCommandsContribution.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(terminal_frontend_contribution_1.TerminalFrontendContribution),
        __metadata("design:type", terminal_frontend_contribution_1.TerminalFrontendContribution)
    ], PluginVscodeCommandsContribution.prototype, "terminalContribution", void 0);
    __decorate([
        inversify_1.inject(quick_open_workspace_1.QuickOpenWorkspace),
        __metadata("design:type", quick_open_workspace_1.QuickOpenWorkspace)
    ], PluginVscodeCommandsContribution.prototype, "quickOpenWorkspace", void 0);
    __decorate([
        inversify_1.inject(terminal_service_1.TerminalService),
        __metadata("design:type", Object)
    ], PluginVscodeCommandsContribution.prototype, "terminalService", void 0);
    __decorate([
        inversify_1.inject(menus_contribution_handler_1.CodeEditorWidgetUtil),
        __metadata("design:type", menus_contribution_handler_1.CodeEditorWidgetUtil)
    ], PluginVscodeCommandsContribution.prototype, "codeEditorWidgetUtil", void 0);
    __decorate([
        inversify_1.inject(plugin_protocol_1.PluginServer),
        __metadata("design:type", Object)
    ], PluginVscodeCommandsContribution.prototype, "pluginServer", void 0);
    __decorate([
        inversify_1.inject(file_service_1.FileService),
        __metadata("design:type", file_service_1.FileService)
    ], PluginVscodeCommandsContribution.prototype, "fileService", void 0);
    PluginVscodeCommandsContribution = __decorate([
        inversify_1.injectable()
    ], PluginVscodeCommandsContribution);
    return PluginVscodeCommandsContribution;
}());
exports.PluginVscodeCommandsContribution = PluginVscodeCommandsContribution;
//# sourceMappingURL=plugin-vscode-commands-contribution.js.map