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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAPIFactory = void 0;
var command_registry_1 = require("./command-registry");
var event_1 = require("@theia/core/lib/common/event");
var cancellation_1 = require("@theia/core/lib/common/cancellation");
var quick_open_1 = require("./quick-open");
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var status_bar_message_registry_1 = require("./status-bar-message-registry");
var window_state_1 = require("./window-state");
var types_impl_1 = require("./types-impl");
var authentication_ext_1 = require("./authentication-ext");
var plugin_api_rpc_model_1 = require("../common/plugin-api-rpc-model");
var text_editors_1 = require("./text-editors");
var documents_1 = require("./documents");
var vscode_uri_1 = require("vscode-uri");
var editor_options_1 = require("../common/editor-options");
var output_channel_registry_1 = require("./output-channel-registry");
var terminal_ext_1 = require("./terminal-ext");
var languages_1 = require("./languages");
var type_converters_1 = require("./type-converters");
var dialogs_1 = require("./dialogs");
var notification_1 = require("./notification");
var language_selector_1 = require("@theia/callhierarchy/lib/common/language-selector");
var markdown_string_1 = require("./markdown-string");
var tree_views_1 = require("./tree/tree-views");
var connection_ext_1 = require("./connection-ext");
var tasks_1 = require("./tasks/tasks");
var file_system_ext_impl_1 = require("./file-system-ext-impl");
var scm_1 = require("./scm");
var decorations_1 = require("./decorations");
var file_system_event_service_ext_impl_1 = require("./file-system-event-service-ext-impl");
var label_service_1 = require("../plugin/label-service");
var timeline_1 = require("./timeline");
var theming_1 = require("./theming");
var comments_1 = require("./comments");
var custom_editors_1 = require("./custom-editors");
function createAPIFactory(rpc, pluginManager, envExt, debugExt, preferenceRegistryExt, editorsAndDocumentsExt, workspaceExt, messageRegistryExt, clipboard, webviewExt) {
    var authenticationExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.AUTHENTICATION_EXT, new authentication_ext_1.AuthenticationExtImpl(rpc));
    var commandRegistry = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.COMMAND_REGISTRY_EXT, new command_registry_1.CommandRegistryImpl(rpc));
    var quickOpenExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.QUICK_OPEN_EXT, new quick_open_1.QuickOpenExtImpl(rpc));
    var dialogsExt = new dialogs_1.DialogsExtImpl(rpc);
    var windowStateExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.WINDOW_STATE_EXT, new window_state_1.WindowStateExtImpl(rpc));
    var notificationExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.NOTIFICATION_EXT, new notification_1.NotificationExtImpl(rpc));
    var editors = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.TEXT_EDITORS_EXT, new text_editors_1.TextEditorsExtImpl(rpc, editorsAndDocumentsExt));
    var documents = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.DOCUMENTS_EXT, new documents_1.DocumentsExtImpl(rpc, editorsAndDocumentsExt));
    var statusBarMessageRegistryExt = new status_bar_message_registry_1.StatusBarMessageRegistryExt(rpc);
    var terminalExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.TERMINAL_EXT, new terminal_ext_1.TerminalServiceExtImpl(rpc));
    var outputChannelRegistryExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.OUTPUT_CHANNEL_REGISTRY_EXT, new output_channel_registry_1.OutputChannelRegistryExtImpl(rpc));
    var languagesExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.LANGUAGES_EXT, new languages_1.LanguagesExtImpl(rpc, documents, commandRegistry));
    var treeViewsExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.TREE_VIEWS_EXT, new tree_views_1.TreeViewsExtImpl(rpc, commandRegistry));
    var tasksExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.TASKS_EXT, new tasks_1.TasksExtImpl(rpc));
    var connectionExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.CONNECTION_EXT, new connection_ext_1.ConnectionExtImpl(rpc));
    var fileSystemExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.FILE_SYSTEM_EXT, new file_system_ext_impl_1.FileSystemExtImpl(rpc, languagesExt));
    var extHostFileSystemEvent = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.ExtHostFileSystemEventService, new file_system_event_service_ext_impl_1.ExtHostFileSystemEventService(rpc, editorsAndDocumentsExt));
    var scmExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.SCM_EXT, new scm_1.ScmExtImpl(rpc, commandRegistry));
    var decorationsExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.DECORATIONS_EXT, new decorations_1.DecorationsExtImpl(rpc));
    var labelServiceExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.LABEL_SERVICE_EXT, new label_service_1.LabelServiceExtImpl(rpc));
    var timelineExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.TIMELINE_EXT, new timeline_1.TimelineExtImpl(rpc, commandRegistry));
    var themingExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.THEMING_EXT, new theming_1.ThemingExtImpl(rpc));
    var commentsExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.COMMENTS_EXT, new comments_1.CommentsExtImpl(rpc, commandRegistry, documents));
    var customEditorExt = rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.CUSTOM_EDITORS_EXT, new custom_editors_1.CustomEditorsExtImpl(rpc, documents, webviewExt, workspaceExt));
    rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.DEBUG_EXT, debugExt);
    return function (plugin) {
        var authentication = {
            registerAuthenticationProvider: function (provider) {
                return authenticationExt.registerAuthenticationProvider(provider);
            },
            get onDidChangeAuthenticationProviders() {
                return authenticationExt.onDidChangeAuthenticationProviders;
            },
            getProviderIds: function () {
                return authenticationExt.getProviderIds();
            },
            get providerIds() {
                return authenticationExt.providerIds;
            },
            get providers() {
                return authenticationExt.providers;
            },
            getSession: function (providerId, scopes, options) {
                return authenticationExt.getSession(plugin, providerId, scopes, options);
            },
            logout: function (providerId, sessionId) {
                return authenticationExt.logout(providerId, sessionId);
            },
            get onDidChangeSessions() {
                return authenticationExt.onDidChangeSessions;
            }
        };
        var commands = {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            registerCommand: function (command, handler, thisArg) {
                // use of the ID when registering commands
                if (typeof command === 'string') {
                    var rawCommands = plugin.rawModel.contributes && plugin.rawModel.contributes.commands;
                    var contributedCommands = rawCommands ? Array.isArray(rawCommands) ? rawCommands : [rawCommands] : undefined;
                    if (handler && contributedCommands && contributedCommands.some(function (item) { return item.command === command; })) {
                        return commandRegistry.registerHandler(command, handler, thisArg);
                    }
                    return commandRegistry.registerCommand({ id: command }, handler, thisArg);
                }
                return commandRegistry.registerCommand(command, handler, thisArg);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            executeCommand: function (commandId) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return commandRegistry.executeCommand.apply(commandRegistry, __spread([commandId], args));
            },
            registerTextEditorCommand: function (command, handler, thisArg) {
                return commandRegistry.registerCommand({ id: command }, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var activeTextEditor = editors.getActiveEditor();
                    if (!activeTextEditor) {
                        console.warn('Cannot execute ' + command + ' because there is no active text editor.');
                        return undefined;
                    }
                    return activeTextEditor.edit(function (edit) {
                        args.unshift(activeTextEditor, edit);
                        handler.apply(thisArg, args);
                    }).then(function (result) {
                        if (!result) {
                            console.warn('Edits from command ' + command + ' were not applied.');
                        }
                    }, function (err) {
                        console.warn('An error occurred while running command ' + command, err);
                    });
                });
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            registerHandler: function (commandId, handler, thisArg) {
                return commandRegistry.registerHandler(commandId, handler, thisArg);
            },
            getKeyBinding: function (commandId) {
                return commandRegistry.getKeyBinding(commandId);
            },
            getCommands: function (filterInternal) {
                if (filterInternal === void 0) { filterInternal = false; }
                return commandRegistry.getCommands(filterInternal);
            },
            registerDiffInformationCommand: function (command, callback, thisArg) {
                // Dummy implementation.
                return new types_impl_1.Disposable(function () { });
            }
        };
        var onDidChangeActiveTerminal = terminalExt.onDidChangeActiveTerminal, onDidCloseTerminal = terminalExt.onDidCloseTerminal, onDidOpenTerminal = terminalExt.onDidOpenTerminal;
        var showInformationMessage = messageRegistryExt.showMessage.bind(messageRegistryExt, plugin_api_rpc_1.MainMessageType.Info);
        var showWarningMessage = messageRegistryExt.showMessage.bind(messageRegistryExt, plugin_api_rpc_1.MainMessageType.Warning);
        var showErrorMessage = messageRegistryExt.showMessage.bind(messageRegistryExt, plugin_api_rpc_1.MainMessageType.Error);
        var window = {
            get activeTerminal() {
                return terminalExt.activeTerminal;
            },
            get activeTextEditor() {
                return editors.getActiveEditor();
            },
            get visibleTextEditors() {
                return editors.getVisibleTextEditors();
            },
            get terminals() {
                return terminalExt.terminals;
            },
            onDidChangeActiveTerminal: onDidChangeActiveTerminal,
            onDidChangeActiveTextEditor: function (listener, thisArg, disposables) {
                return editors.onDidChangeActiveTextEditor(listener, thisArg, disposables);
            },
            onDidChangeVisibleTextEditors: function (listener, thisArg, disposables) {
                return editors.onDidChangeVisibleTextEditors(listener, thisArg, disposables);
            },
            onDidChangeTextEditorSelection: function (listener, thisArg, disposables) {
                return editors.onDidChangeTextEditorSelection(listener, thisArg, disposables);
            },
            onDidChangeTextEditorOptions: function (listener, thisArg, disposables) {
                return editors.onDidChangeTextEditorOptions(listener, thisArg, disposables);
            },
            onDidChangeTextEditorViewColumn: function (listener, thisArg, disposables) {
                return editors.onDidChangeTextEditorViewColumn(listener, thisArg, disposables);
            },
            onDidChangeTextEditorVisibleRanges: function (listener, thisArg, disposables) {
                return editors.onDidChangeTextEditorVisibleRanges(listener, thisArg, disposables);
            },
            showTextDocument: function (documentArg, columnOrOptions, preserveFocus) {
                return __awaiter(this, void 0, void 0, function () {
                    var documentOptions, uri, textEditor;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                uri = documentArg instanceof vscode_uri_1.URI ? documentArg : documentArg.uri;
                                if (typeof columnOrOptions === 'number') {
                                    documentOptions = {
                                        viewColumn: columnOrOptions
                                    };
                                }
                                else if (columnOrOptions && (columnOrOptions.preserveFocus || columnOrOptions.preview || columnOrOptions.selection || columnOrOptions.viewColumn)) {
                                    documentOptions = __assign({}, columnOrOptions);
                                }
                                if (preserveFocus) {
                                    if (documentOptions) {
                                        documentOptions.preserveFocus = preserveFocus;
                                    }
                                    else {
                                        documentOptions = { preserveFocus: preserveFocus };
                                    }
                                }
                                return [4 /*yield*/, documents.showDocument(uri, documentOptions)];
                            case 1:
                                _a.sent();
                                textEditor = editors.getVisibleTextEditors().find(function (editor) { return editor.document.uri.toString() === uri.toString(); });
                                if (textEditor) {
                                    return [2 /*return*/, Promise.resolve(textEditor)];
                                }
                                else {
                                    throw new Error("Failed to show text document " + documentArg.toString());
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            showQuickPick: function (items, options, token) {
                return quickOpenExt.showQuickPick(items, options, token);
            },
            createQuickPick: function () {
                return quickOpenExt.createQuickPick(plugin);
            },
            showWorkspaceFolderPick: function (options) {
                return workspaceExt.pickWorkspaceFolder(options);
            },
            showInformationMessage: showInformationMessage,
            showWarningMessage: showWarningMessage,
            showErrorMessage: showErrorMessage,
            showOpenDialog: function (options) {
                return dialogsExt.showOpenDialog(options);
            },
            showSaveDialog: function (options) {
                return dialogsExt.showSaveDialog(options);
            },
            showUploadDialog: function (options) {
                return dialogsExt.showUploadDialog(options);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setStatusBarMessage: function (text, arg) {
                return statusBarMessageRegistryExt.setStatusBarMessage(text, arg);
            },
            showInputBox: function (options, token) {
                return quickOpenExt.showInput(options, token);
            },
            createStatusBarItem: function (alignment, priority) {
                return statusBarMessageRegistryExt.createStatusBarItem(alignment, priority);
            },
            createOutputChannel: function (name) {
                return outputChannelRegistryExt.createOutputChannel(name, type_converters_1.pluginToPluginInfo(plugin));
            },
            createWebviewPanel: function (viewType, title, showOptions, options) {
                if (options === void 0) { options = {}; }
                return webviewExt.createWebview(viewType, title, showOptions, options, plugin);
            },
            registerWebviewPanelSerializer: function (viewType, serializer) {
                return webviewExt.registerWebviewPanelSerializer(viewType, serializer, plugin);
            },
            registerCustomEditorProvider: function (viewType, provider, options) {
                if (options === void 0) { options = {}; }
                return customEditorExt.registerCustomEditorProvider(viewType, provider, options, plugin);
            },
            get state() {
                return windowStateExt.getWindowState();
            },
            onDidChangeWindowState: function (listener, thisArg, disposables) {
                return windowStateExt.onDidChangeWindowState(listener, thisArg, disposables);
            },
            createTerminal: function (nameOrOptions, shellPath, shellArgs) {
                return terminalExt.createTerminal(nameOrOptions, shellPath, shellArgs);
            },
            onDidCloseTerminal: onDidCloseTerminal,
            onDidOpenTerminal: onDidOpenTerminal,
            createTextEditorDecorationType: function (options) {
                return editors.createTextEditorDecorationType(options);
            },
            registerTreeDataProvider: function (viewId, treeDataProvider) {
                return treeViewsExt.registerTreeDataProvider(plugin, viewId, treeDataProvider);
            },
            createTreeView: function (viewId, options) {
                return treeViewsExt.createTreeView(plugin, viewId, options);
            },
            withProgress: function (options, task) {
                return notificationExt.withProgress(options, task);
            },
            registerDecorationProvider: function (provider) {
                return decorationsExt.registerDecorationProvider(provider);
            },
            registerUriHandler: function (handler) {
                // TODO ?
                return new types_impl_1.Disposable(function () { });
            },
            createInputBox: function () {
                return quickOpenExt.createInputBox(plugin);
            },
            registerTerminalLinkProvider: function (provider) {
                /* NOOP. To be implemented at later stage */
            },
            get activeColorTheme() {
                return themingExt.activeColorTheme;
            },
            onDidChangeActiveColorTheme: function (listener, thisArg, disposables) {
                return themingExt.onDidChangeActiveColorTheme(listener, thisArg, disposables);
            }
        };
        var workspace = {
            get fs() {
                return fileSystemExt.fileSystem;
            },
            get rootPath() {
                return workspaceExt.rootPath;
            },
            get workspaceFolders() {
                return workspaceExt.workspaceFolders;
            },
            get workspaceFile() {
                return workspaceExt.workspaceFile;
            },
            get name() {
                return workspaceExt.name;
            },
            onDidChangeWorkspaceFolders: function (listener, thisArg, disposables) {
                return workspaceExt.onDidChangeWorkspaceFolders(listener, thisArg, disposables);
            },
            get textDocuments() {
                return documents.getAllDocumentData().map(function (data) { return data.document; });
            },
            onDidChangeTextDocument: function (listener, thisArg, disposables) {
                return documents.onDidChangeDocument(listener, thisArg, disposables);
            },
            onDidCloseTextDocument: function (listener, thisArg, disposables) {
                return documents.onDidRemoveDocument(listener, thisArg, disposables);
            },
            onDidOpenTextDocument: function (listener, thisArg, disposables) {
                return documents.onDidAddDocument(listener, thisArg, disposables);
            },
            onWillSaveTextDocument: function (listener, thisArg, disposables) {
                return documents.onWillSaveTextDocument(listener, thisArg, disposables);
            },
            onDidSaveTextDocument: function (listener, thisArg, disposables) {
                return documents.onDidSaveTextDocument(listener, thisArg, disposables);
            },
            onDidCreateFiles: function (listener, thisArg, disposables) { return extHostFileSystemEvent.onDidCreateFile(listener, thisArg, disposables); },
            onDidDeleteFiles: function (listener, thisArg, disposables) { return extHostFileSystemEvent.onDidDeleteFile(listener, thisArg, disposables); },
            onDidRenameFiles: function (listener, thisArg, disposables) { return extHostFileSystemEvent.onDidRenameFile(listener, thisArg, disposables); },
            onWillCreateFiles: function (listener, thisArg, disposables) {
                return extHostFileSystemEvent.getOnWillCreateFileEvent(plugin)(listener, thisArg, disposables);
            },
            onWillDeleteFiles: function (listener, thisArg, disposables) {
                return extHostFileSystemEvent.getOnWillDeleteFileEvent(plugin)(listener, thisArg, disposables);
            },
            onWillRenameFiles: function (listener, thisArg, disposables) {
                return extHostFileSystemEvent.getOnWillRenameFileEvent(plugin)(listener, thisArg, disposables);
            },
            getConfiguration: function (section, resource) {
                return preferenceRegistryExt.getConfiguration(section, resource);
            },
            onDidChangeConfiguration: function (listener, thisArgs, disposables) {
                return preferenceRegistryExt.onDidChangeConfiguration(listener, thisArgs, disposables);
            },
            openTextDocument: function (uriOrFileNameOrOptions) {
                return __awaiter(this, void 0, void 0, function () {
                    var options, uri, data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                options = uriOrFileNameOrOptions;
                                if (!(typeof uriOrFileNameOrOptions === 'string')) return [3 /*break*/, 1];
                                uri = vscode_uri_1.URI.file(uriOrFileNameOrOptions);
                                return [3 /*break*/, 5];
                            case 1:
                                if (!(uriOrFileNameOrOptions instanceof vscode_uri_1.URI)) return [3 /*break*/, 2];
                                uri = uriOrFileNameOrOptions;
                                return [3 /*break*/, 5];
                            case 2:
                                if (!(!options || typeof options === 'object')) return [3 /*break*/, 4];
                                return [4 /*yield*/, documents.createDocumentData(options)];
                            case 3:
                                uri = _a.sent();
                                return [3 /*break*/, 5];
                            case 4: return [2 /*return*/, Promise.reject(new Error('illegal argument - uriOrFileNameOrOptions'))];
                            case 5: return [4 /*yield*/, documents.openDocument(uri)];
                            case 6:
                                data = _a.sent();
                                return [2 /*return*/, data && data.document];
                        }
                    });
                });
            },
            createFileSystemWatcher: function (pattern, ignoreCreate, ignoreChange, ignoreDelete) {
                return extHostFileSystemEvent.createFileSystemWatcher(type_converters_1.fromGlobPattern(pattern), ignoreCreate, ignoreChange, ignoreDelete);
            },
            findFiles: function (include, exclude, maxResults, token) {
                return workspaceExt.findFiles(include, exclude, maxResults, token);
            },
            findTextInFiles: function (query, optionsOrCallback, callbackOrToken, token) {
                return workspaceExt.findTextInFiles(query, optionsOrCallback, callbackOrToken, token);
            },
            saveAll: function (includeUntitled) {
                return editors.saveAll(includeUntitled);
            },
            applyEdit: function (edit) {
                return editors.applyWorkspaceEdit(edit);
            },
            registerTextDocumentContentProvider: function (scheme, provider) {
                return workspaceExt.registerTextDocumentContentProvider(scheme, provider);
            },
            registerFileSystemProvider: function (scheme, provider) {
                return fileSystemExt.registerFileSystemProvider(scheme, provider);
            },
            getWorkspaceFolder: function (uri) {
                return workspaceExt.getWorkspaceFolder(uri);
            },
            asRelativePath: function (pathOrUri, includeWorkspace) {
                return workspaceExt.getRelativePath(pathOrUri, includeWorkspace);
            },
            updateWorkspaceFolders: function (index, deleteCount) {
                var workspaceFoldersToAdd = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    workspaceFoldersToAdd[_i - 2] = arguments[_i];
                }
                return workspaceExt.updateWorkspaceFolders.apply(workspaceExt, __spread([index, deleteCount || 0], workspaceFoldersToAdd));
            },
            registerTaskProvider: function (type, provider) {
                return tasks.registerTaskProvider(type, provider);
            },
            registerResourceLabelFormatter: function (formatter) {
                return labelServiceExt.$registerResourceLabelFormatter(formatter);
            },
            registerTimelineProvider: function (scheme, provider) {
                return timelineExt.registerTimelineProvider(plugin, scheme, provider);
            }
        };
        var onDidChangeLogLevel = new event_1.Emitter();
        var env = Object.freeze({
            get appName() { return envExt.appName; },
            get appRoot() { return envExt.appRoot; },
            get language() { return envExt.language; },
            get machineId() { return envExt.machineId; },
            get sessionId() { return envExt.sessionId; },
            get uriScheme() { return envExt.uriScheme; },
            get shell() { return envExt.shell; },
            get uiKind() { return envExt.uiKind; },
            clipboard: clipboard,
            getEnvVariable: function (envVarName) {
                return envExt.getEnvVariable(envVarName);
            },
            getQueryParameter: function (queryParamName) {
                return envExt.getQueryParameter(queryParamName);
            },
            getQueryParameters: function () {
                return envExt.getQueryParameters();
            },
            getClientOperatingSystem: function () {
                return envExt.getClientOperatingSystem();
            },
            openExternal: function (uri) {
                return windowStateExt.openUri(uri);
            },
            asExternalUri: function (target) {
                return windowStateExt.asExternalUri(target);
            },
            get logLevel() { return types_impl_1.LogLevel.Info; },
            get onDidChangeLogLevel() { return onDidChangeLogLevel.event; }
        });
        var languages = {
            getLanguages: function () {
                return languagesExt.getLanguages();
            },
            setTextDocumentLanguage: function (document, languageId) {
                return languagesExt.changeLanguage(document.uri, languageId);
            },
            match: function (selector, document) {
                return language_selector_1.score(type_converters_1.fromDocumentSelector(selector), document.uri.scheme, document.uri.path, document.languageId, true);
            },
            get onDidChangeDiagnostics() {
                return languagesExt.onDidChangeDiagnostics;
            },
            getDiagnostics: function (resource) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return languagesExt.getDiagnostics(resource);
            },
            createDiagnosticCollection: function (name) {
                return languagesExt.createDiagnosticCollection(name);
            },
            setLanguageConfiguration: function (language, configuration) {
                return languagesExt.setLanguageConfiguration(language, configuration);
            },
            registerCompletionItemProvider: function (selector, provider) {
                var triggerCharacters = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    triggerCharacters[_i - 2] = arguments[_i];
                }
                return languagesExt.registerCompletionItemProvider(selector, provider, triggerCharacters, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerDefinitionProvider: function (selector, provider) {
                return languagesExt.registerDefinitionProvider(selector, provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerDeclarationProvider: function (selector, provider) {
                return languagesExt.registerDeclarationProvider(selector, provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerSignatureHelpProvider: function (selector, provider, first) {
                var remaining = [];
                for (var _i = 3; _i < arguments.length; _i++) {
                    remaining[_i - 3] = arguments[_i];
                }
                var metadata;
                if (typeof first === 'object') {
                    metadata = first;
                }
                else {
                    var triggerCharacters = [];
                    metadata = { triggerCharacters: triggerCharacters, retriggerCharacters: [] };
                    if (first) {
                        triggerCharacters.push.apply(triggerCharacters, __spread([first], remaining));
                    }
                }
                return languagesExt.registerSignatureHelpProvider(selector, provider, metadata, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerTypeDefinitionProvider: function (selector, provider) {
                return languagesExt.registerTypeDefinitionProvider(selector, provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerImplementationProvider: function (selector, provider) {
                return languagesExt.registerImplementationProvider(selector, provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerHoverProvider: function (selector, provider) {
                return languagesExt.registerHoverProvider(selector, provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerDocumentHighlightProvider: function (selector, provider) {
                return languagesExt.registerDocumentHighlightProvider(selector, provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerWorkspaceSymbolProvider: function (provider) {
                return languagesExt.registerWorkspaceSymbolProvider(provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerDocumentFormattingEditProvider: function (selector, provider) {
                return languagesExt.registerDocumentFormattingEditProvider(selector, provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerDocumentRangeFormattingEditProvider: function (selector, provider) {
                return languagesExt.registerDocumentRangeFormattingEditProvider(selector, provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerOnTypeFormattingEditProvider: function (selector, provider, firstTriggerCharacter) {
                var moreTriggerCharacters = [];
                for (var _i = 3; _i < arguments.length; _i++) {
                    moreTriggerCharacters[_i - 3] = arguments[_i];
                }
                return languagesExt.registerOnTypeFormattingEditProvider(selector, provider, [firstTriggerCharacter].concat(moreTriggerCharacters), type_converters_1.pluginToPluginInfo(plugin));
            },
            registerDocumentLinkProvider: function (selector, provider) {
                return languagesExt.registerDocumentLinkProvider(selector, provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerCodeActionsProvider: function (selector, provider, metadata) {
                return languagesExt.registerCodeActionsProvider(selector, provider, plugin.model, type_converters_1.pluginToPluginInfo(plugin), metadata);
            },
            registerCodeLensProvider: function (selector, provider) {
                return languagesExt.registerCodeLensProvider(selector, provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerReferenceProvider: function (selector, provider) {
                return languagesExt.registerReferenceProvider(selector, provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerDocumentSymbolProvider: function (selector, provider) {
                return languagesExt.registerDocumentSymbolProvider(selector, provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerColorProvider: function (selector, provider) {
                return languagesExt.registerColorProvider(selector, provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerFoldingRangeProvider: function (selector, provider) {
                return languagesExt.registerFoldingRangeProvider(selector, provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerSelectionRangeProvider: function (selector, provider) {
                return languagesExt.registerSelectionRangeProvider(selector, provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerRenameProvider: function (selector, provider) {
                return languagesExt.registerRenameProvider(selector, provider, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerDocumentSemanticTokensProvider: function (selector, provider, legend) {
                return languagesExt.registerDocumentSemanticTokensProvider(selector, provider, legend, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerDocumentRangeSemanticTokensProvider: function (selector, provider, legend) {
                return languagesExt.registerDocumentRangeSemanticTokensProvider(selector, provider, legend, type_converters_1.pluginToPluginInfo(plugin));
            },
            registerCallHierarchyProvider: function (selector, provider) {
                return languagesExt.registerCallHierarchyProvider(selector, provider);
            }
        };
        var plugins = {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            get all() {
                return pluginManager.getAllPlugins().map(function (plg) { return new Plugin(pluginManager, plg); });
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            getPlugin: function (pluginId) {
                var plg = pluginManager.getPluginById(pluginId.toLowerCase());
                if (plg) {
                    return new Plugin(pluginManager, plg);
                }
                return undefined;
            },
            get onDidChange() {
                return pluginManager.onDidChange;
            }
        };
        var debuggersContributions = plugin.rawModel.contributes && plugin.rawModel.contributes.debuggers || [];
        debugExt.assistedInject(connectionExt, commandRegistry);
        debugExt.registerDebuggersContributions(plugin.pluginFolder, debuggersContributions);
        var debug = {
            get activeDebugSession() {
                return debugExt.activeDebugSession;
            },
            get activeDebugConsole() {
                return debugExt.activeDebugConsole;
            },
            get breakpoints() {
                return debugExt.breakpoints;
            },
            get onDidChangeActiveDebugSession() {
                return debugExt.onDidChangeActiveDebugSession;
            },
            get onDidStartDebugSession() {
                return debugExt.onDidStartDebugSession;
            },
            get onDidReceiveDebugSessionCustomEvent() {
                return debugExt.onDidReceiveDebugSessionCustomEvent;
            },
            get onDidTerminateDebugSession() {
                return debugExt.onDidTerminateDebugSession;
            },
            get onDidChangeBreakpoints() {
                return debugExt.onDidChangeBreakpoints;
            },
            registerDebugAdapterDescriptorFactory: function (debugType, factory) {
                return debugExt.registerDebugAdapterDescriptorFactory(debugType, factory);
            },
            registerDebugConfigurationProvider: function (debugType, provider) {
                return debugExt.registerDebugConfigurationProvider(debugType, provider);
            },
            registerDebugAdapterTrackerFactory: function (debugType, factory) {
                return debugExt.registerDebugAdapterTrackerFactory(debugType, factory);
            },
            startDebugging: function (folder, nameOrConfiguration) {
                return debugExt.startDebugging(folder, nameOrConfiguration);
            },
            addBreakpoints: function (breakpoints) {
                debugExt.addBreakpoints(breakpoints);
            },
            removeBreakpoints: function (breakpoints) {
                debugExt.removeBreakpoints(breakpoints);
            }
        };
        var tasks = {
            registerTaskProvider: function (type, provider) {
                return tasksExt.registerTaskProvider(type, provider);
            },
            fetchTasks: function (filter) {
                return tasksExt.fetchTasks(filter);
            },
            executeTask: function (task) {
                return tasksExt.executeTask(task);
            },
            get taskExecutions() {
                return tasksExt.taskExecutions;
            },
            onDidStartTask: function (listener, thisArg, disposables) {
                return tasksExt.onDidStartTask(listener, thisArg, disposables);
            },
            onDidEndTask: function (listener, thisArg, disposables) {
                return tasksExt.onDidEndTask(listener, thisArg, disposables);
            },
            onDidStartTaskProcess: function (listener, thisArg, disposables) {
                return tasksExt.onDidStartTaskProcess(listener, thisArg, disposables);
            },
            onDidEndTaskProcess: function (listener, thisArg, disposables) {
                return tasksExt.onDidEndTaskProcess(listener, thisArg, disposables);
            }
        };
        var scm = {
            get inputBox() {
                var inputBox = scmExt.getLastInputBox(plugin);
                if (inputBox) {
                    return inputBox;
                }
                else {
                    throw new Error('Input box not found!');
                }
            },
            createSourceControl: function (id, label, rootUri) {
                return scmExt.createSourceControl(plugin, id, label, rootUri);
            }
        };
        var comments = {
            createCommentController: function (id, label) {
                return commentsExt.createCommentController(plugin, id, label);
            }
        };
        return {
            version: require('../../package.json').version,
            authentication: authentication,
            commands: commands,
            comments: comments,
            window: window,
            workspace: workspace,
            env: env,
            languages: languages,
            plugins: plugins,
            debug: debug,
            tasks: tasks,
            scm: scm,
            // Types
            StatusBarAlignment: types_impl_1.StatusBarAlignment,
            Disposable: types_impl_1.Disposable,
            EventEmitter: event_1.Emitter,
            CancellationTokenSource: cancellation_1.CancellationTokenSource,
            MarkdownString: markdown_string_1.MarkdownString,
            Position: types_impl_1.Position,
            Range: types_impl_1.Range,
            Selection: types_impl_1.Selection,
            ViewColumn: types_impl_1.ViewColumn,
            TextEditorSelectionChangeKind: types_impl_1.TextEditorSelectionChangeKind,
            Uri: vscode_uri_1.URI,
            EndOfLine: types_impl_1.EndOfLine,
            TextEditorRevealType: types_impl_1.TextEditorRevealType,
            TextEditorCursorStyle: editor_options_1.TextEditorCursorStyle,
            TextEditorLineNumbersStyle: types_impl_1.TextEditorLineNumbersStyle,
            ThemeColor: types_impl_1.ThemeColor,
            ThemeIcon: types_impl_1.ThemeIcon,
            SnippetString: types_impl_1.SnippetString,
            DecorationRangeBehavior: types_impl_1.DecorationRangeBehavior,
            OverviewRulerLane: types_impl_1.OverviewRulerLane,
            ConfigurationTarget: types_impl_1.ConfigurationTarget,
            RelativePattern: types_impl_1.RelativePattern,
            IndentAction: types_impl_1.IndentAction,
            CompletionItem: types_impl_1.CompletionItem,
            CompletionItemKind: types_impl_1.CompletionItemKind,
            CompletionList: types_impl_1.CompletionList,
            DebugConsoleMode: types_impl_1.DebugConsoleMode,
            DiagnosticSeverity: types_impl_1.DiagnosticSeverity,
            DiagnosticRelatedInformation: types_impl_1.DiagnosticRelatedInformation,
            Location: types_impl_1.Location,
            LogLevel: types_impl_1.LogLevel,
            DiagnosticTag: types_impl_1.DiagnosticTag,
            CompletionItemTag: types_impl_1.CompletionItemTag,
            Diagnostic: types_impl_1.Diagnostic,
            CompletionTriggerKind: types_impl_1.CompletionTriggerKind,
            TextEdit: types_impl_1.TextEdit,
            ProgressLocation: types_impl_1.ProgressLocation,
            ProgressOptions: types_impl_1.ProgressOptions,
            Progress: types_impl_1.Progress,
            ParameterInformation: types_impl_1.ParameterInformation,
            SignatureInformation: types_impl_1.SignatureInformation,
            SignatureHelp: types_impl_1.SignatureHelp,
            SignatureHelpTriggerKind: types_impl_1.SignatureHelpTriggerKind,
            Hover: types_impl_1.Hover,
            DocumentHighlightKind: types_impl_1.DocumentHighlightKind,
            DocumentHighlight: types_impl_1.DocumentHighlight,
            DocumentLink: types_impl_1.DocumentLink,
            CodeLens: types_impl_1.CodeLens,
            CodeActionKind: types_impl_1.CodeActionKind,
            CodeActionTrigger: types_impl_1.CodeActionTrigger,
            TextDocumentSaveReason: types_impl_1.TextDocumentSaveReason,
            CodeAction: types_impl_1.CodeAction,
            TreeItem: types_impl_1.TreeItem,
            TreeItem2: types_impl_1.TreeItem,
            TreeItemCollapsibleState: types_impl_1.TreeItemCollapsibleState,
            SymbolKind: plugin_api_rpc_model_1.SymbolKind,
            SymbolTag: types_impl_1.SymbolTag,
            DocumentSymbol: types_impl_1.DocumentSymbol,
            WorkspaceEdit: types_impl_1.WorkspaceEdit,
            SymbolInformation: types_impl_1.SymbolInformation,
            FileType: types_impl_1.FileType,
            FileChangeType: types_impl_1.FileChangeType,
            ShellQuoting: types_impl_1.ShellQuoting,
            ShellExecution: types_impl_1.ShellExecution,
            ProcessExecution: types_impl_1.ProcessExecution,
            TaskScope: types_impl_1.TaskScope,
            TaskRevealKind: types_impl_1.TaskRevealKind,
            TaskPanelKind: types_impl_1.TaskPanelKind,
            TaskGroup: types_impl_1.TaskGroup,
            Task: types_impl_1.Task,
            Task2: types_impl_1.Task2,
            DebugAdapterExecutable: types_impl_1.DebugAdapterExecutable,
            DebugAdapterServer: types_impl_1.DebugAdapterServer,
            Breakpoint: types_impl_1.Breakpoint,
            SourceBreakpoint: types_impl_1.SourceBreakpoint,
            FunctionBreakpoint: types_impl_1.FunctionBreakpoint,
            Color: types_impl_1.Color,
            ColorInformation: types_impl_1.ColorInformation,
            ColorPresentation: types_impl_1.ColorPresentation,
            FoldingRange: types_impl_1.FoldingRange,
            SelectionRange: types_impl_1.SelectionRange,
            FoldingRangeKind: types_impl_1.FoldingRangeKind,
            OperatingSystem: types_impl_1.OperatingSystem,
            WebviewPanelTargetArea: types_impl_1.WebviewPanelTargetArea,
            UIKind: types_impl_1.UIKind,
            FileSystemError: types_impl_1.FileSystemError,
            CommentThreadCollapsibleState: types_impl_1.CommentThreadCollapsibleState,
            QuickInputButtons: types_impl_1.QuickInputButtons,
            CommentMode: types_impl_1.CommentMode,
            CallHierarchyItem: types_impl_1.CallHierarchyItem,
            CallHierarchyIncomingCall: types_impl_1.CallHierarchyIncomingCall,
            CallHierarchyOutgoingCall: types_impl_1.CallHierarchyOutgoingCall,
            TimelineItem: types_impl_1.TimelineItem,
            EnvironmentVariableMutatorType: types_impl_1.EnvironmentVariableMutatorType,
            SemanticTokensLegend: types_impl_1.SemanticTokensLegend,
            SemanticTokensBuilder: types_impl_1.SemanticTokensBuilder,
            SemanticTokens: types_impl_1.SemanticTokens,
            SemanticTokensEdits: types_impl_1.SemanticTokensEdits,
            SemanticTokensEdit: types_impl_1.SemanticTokensEdit,
            ColorThemeKind: types_impl_1.ColorThemeKind,
            SourceControlInputBoxValidationType: types_impl_1.SourceControlInputBoxValidationType
        };
    };
}
exports.createAPIFactory = createAPIFactory;
var Plugin = /** @class */ (function () {
    function Plugin(pluginManager, plugin) {
        this.pluginManager = pluginManager;
        this.id = plugin.model.id;
        this.pluginPath = plugin.pluginFolder;
        this.packageJSON = plugin.rawModel;
        this.pluginType = plugin.model.entryPoint.frontend ? 'frontend' : 'backend';
    }
    Object.defineProperty(Plugin.prototype, "isActive", {
        get: function () {
            return this.pluginManager.isActive(this.id);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Plugin.prototype, "exports", {
        get: function () {
            return this.pluginManager.getPluginExport(this.id);
        },
        enumerable: false,
        configurable: true
    });
    Plugin.prototype.activate = function () {
        var _this = this;
        return this.pluginManager.activatePlugin(this.id).then(function () { return _this.exports; });
    };
    return Plugin;
}());
//# sourceMappingURL=plugin-context.js.map