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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// copied and modified from https://github.com/Microsoft/vscode/blob/master/src/vs/workbench/services/workspace/node/workspaceEditingService.ts
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
exports.WorkspaceExtImpl = void 0;
var paths = require("path");
var event_1 = require("@theia/core/lib/common/event");
var cancellation_1 = require("@theia/core/lib/common/cancellation");
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var path_1 = require("@theia/core/lib/common/path");
var vscode_uri_1 = require("vscode-uri");
var paths_1 = require("@theia/callhierarchy/lib/common/paths");
var paths_util_1 = require("../common/paths-util");
var uri_components_1 = require("../common/uri-components");
var type_converters_1 = require("./type-converters");
var Converter = require("./type-converters");
var WorkspaceExtImpl = /** @class */ (function () {
    function WorkspaceExtImpl(rpc, editorsAndDocuments, messageService) {
        this.editorsAndDocuments = editorsAndDocuments;
        this.messageService = messageService;
        this.workspaceFoldersChangedEmitter = new event_1.Emitter();
        this.onDidChangeWorkspaceFolders = this.workspaceFoldersChangedEmitter.event;
        this.documentContentProviders = new Map();
        this.searchInWorkspaceEmitter = new event_1.Emitter();
        this.workspaceSearchSequence = 0;
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.WORKSPACE_MAIN);
    }
    Object.defineProperty(WorkspaceExtImpl.prototype, "rootPath", {
        get: function () {
            var folder = this.folders && this.folders[0];
            return folder && folder.uri.fsPath;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WorkspaceExtImpl.prototype, "workspaceFolders", {
        get: function () {
            if (this.folders && this.folders.length === 0) {
                return undefined;
            }
            return this.folders;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WorkspaceExtImpl.prototype, "workspaceFile", {
        get: function () {
            return this.workspaceFileUri;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WorkspaceExtImpl.prototype, "name", {
        get: function () {
            if (this.workspaceFolders && this.workspaceFolders.length > 0) {
                return new path_1.Path(this.workspaceFolders[0].uri.path).base;
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    WorkspaceExtImpl.prototype.$onWorkspaceFoldersChanged = function (event) {
        var _this = this;
        var newRoots = event.roots || [];
        var newFolders = newRoots.map(function (root, index) { return _this.toWorkspaceFolder(root, index); });
        var delta = this.deltaFolders(this.folders, newFolders);
        this.folders = newFolders;
        this.refreshWorkspaceFile();
        this.workspaceFoldersChangedEmitter.fire(delta);
    };
    WorkspaceExtImpl.prototype.$onWorkspaceLocationChanged = function (stat) {
        this.updateWorkSpace(stat);
    };
    WorkspaceExtImpl.prototype.$onTextSearchResult = function (searchRequestId, done, result) {
        var _this = this;
        if (result) {
            result.matches.map(function (next) {
                var range = {
                    endColumn: next.character + next.length,
                    endLineNumber: next.line + 1,
                    startColumn: next.character,
                    startLineNumber: next.line + 1
                };
                var tRange = Converter.toRange(range);
                var searchResult = {
                    uri: vscode_uri_1.URI.parse(result.fileUri),
                    preview: {
                        text: typeof next.lineText === 'string' ? next.lineText : next.lineText.text,
                        matches: tRange
                    },
                    ranges: tRange
                };
                return searchResult;
            }).forEach(function (next) { return _this.searchInWorkspaceEmitter.fire({ result: next, searchId: searchRequestId }); });
        }
        else if (done) {
            this.searchInWorkspaceEmitter.fire({ searchId: searchRequestId });
        }
    };
    WorkspaceExtImpl.prototype.deltaFolders = function (currentFolders, newFolders) {
        if (currentFolders === void 0) { currentFolders = []; }
        if (newFolders === void 0) { newFolders = []; }
        var added = this.foldersDiff(newFolders, currentFolders);
        var removed = this.foldersDiff(currentFolders, newFolders);
        return { added: added, removed: removed };
    };
    WorkspaceExtImpl.prototype.foldersDiff = function (folder1, folder2) {
        if (folder1 === void 0) { folder1 = []; }
        if (folder2 === void 0) { folder2 = []; }
        var map = new Map();
        folder1.forEach(function (folder) { return map.set(folder.uri.toString(), folder); });
        folder2.forEach(function (folder) { return map.delete(folder.uri.toString()); });
        return folder1.filter(function (folder) { return map.has(folder.uri.toString()); });
    };
    WorkspaceExtImpl.prototype.toWorkspaceFolder = function (root, index) {
        var uri = vscode_uri_1.URI.parse(root);
        var path = new path_1.Path(uri.path);
        return {
            uri: uri,
            name: path.base,
            index: index
        };
    };
    WorkspaceExtImpl.prototype.pickWorkspaceFolder = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var optionsMain = {
                placeHolder: options && options.placeHolder ? options.placeHolder : undefined,
                ignoreFocusOut: options && options.ignoreFocusOut
            };
            _this.proxy.$pickWorkspaceFolder(optionsMain).then(function (value) {
                resolve(value);
            });
        });
    };
    WorkspaceExtImpl.prototype.findFiles = function (include, exclude, maxResults, token) {
        if (token === void 0) { token = cancellation_1.CancellationToken.None; }
        var includePattern;
        var includeFolderUri;
        if (include) {
            if (typeof include === 'string') {
                includePattern = include;
            }
            else {
                includePattern = include.pattern;
                includeFolderUri = vscode_uri_1.URI.file(include.base).toString();
            }
        }
        else {
            includePattern = '';
        }
        var excludePatternOrDisregardExcludes;
        if (exclude === undefined) {
            excludePatternOrDisregardExcludes = ''; // default excludes
        }
        else if (exclude) {
            if (typeof exclude === 'string') {
                excludePatternOrDisregardExcludes = exclude;
            }
            else {
                excludePatternOrDisregardExcludes = exclude.pattern;
            }
        }
        else {
            excludePatternOrDisregardExcludes = false; // no excludes
        }
        if (token && token.isCancellationRequested) {
            return Promise.resolve([]);
        }
        return this.proxy.$startFileSearch(includePattern, includeFolderUri, excludePatternOrDisregardExcludes, maxResults, token)
            .then(function (data) { return Array.isArray(data) ? data.map(function (uri) { return vscode_uri_1.URI.revive(uri); }) : []; });
    };
    WorkspaceExtImpl.prototype.findTextInFiles = function (query, optionsOrCallback, callbackOrToken, token) {
        var options;
        var callback;
        if (typeof optionsOrCallback === 'object') {
            options = optionsOrCallback;
            callback = callbackOrToken;
        }
        else {
            options = {};
            callback = optionsOrCallback;
            token = callbackOrToken;
        }
        var nextSearchID = this.workspaceSearchSequence + 1;
        this.workspaceSearchSequence = nextSearchID;
        var disposable = this.searchInWorkspaceEmitter.event(function (searchResult) {
            if (searchResult.searchId === nextSearchID) {
                if (searchResult.result) {
                    callback(searchResult.result);
                }
                else {
                    disposable.dispose();
                }
            }
        });
        if (token) {
            token.onCancellationRequested(function () {
                disposable.dispose();
            });
        }
        return this.proxy.$findTextInFiles(query, options || {}, nextSearchID, token);
    };
    WorkspaceExtImpl.prototype.registerTextDocumentContentProvider = function (scheme, provider) {
        var _this = this;
        // `file` and `untitled` schemas are reserved by `workspace.openTextDocument` API:
        // `file`-scheme for opening a file
        // `untitled`-scheme for opening a new file that should be saved
        if (scheme === uri_components_1.Schemes.file || scheme === uri_components_1.Schemes.untitled || this.documentContentProviders.has(scheme)) {
            throw new Error("Text Content Document Provider for scheme '" + scheme + "' is already registered");
        }
        this.documentContentProviders.set(scheme, provider);
        this.proxy.$registerTextDocumentContentProvider(scheme);
        var onDidChangeSubscription;
        if (typeof provider.onDidChange === 'function') {
            onDidChangeSubscription = provider.onDidChange(function (uri) { return __awaiter(_this, void 0, void 0, function () {
                var content;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(uri.scheme === scheme && this.editorsAndDocuments.getDocument(uri.toString()))) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.$provideTextDocumentContent(uri.toString())];
                        case 1:
                            content = _a.sent();
                            if (content) {
                                this.proxy.$onTextDocumentContentChange(uri.toString(), content);
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
        }
        var instance = this;
        return {
            dispose: function () {
                if (instance.documentContentProviders.delete(scheme)) {
                    instance.proxy.$unregisterTextDocumentContentProvider(scheme);
                }
                if (onDidChangeSubscription) {
                    onDidChangeSubscription.dispose();
                }
            }
        };
    };
    WorkspaceExtImpl.prototype.$provideTextDocumentContent = function (documentURI) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, provider;
            return __generator(this, function (_a) {
                uri = vscode_uri_1.URI.parse(documentURI);
                provider = this.documentContentProviders.get(uri.scheme);
                if (provider) {
                    return [2 /*return*/, provider.provideTextDocumentContent(uri, cancellation_1.CancellationToken.None)];
                }
                return [2 /*return*/, undefined];
            });
        });
    };
    WorkspaceExtImpl.prototype.getWorkspaceFolder = function (uri, resolveParent) {
        if (!this.folders || !this.folders.length) {
            return undefined;
        }
        function dirname(resource) {
            if (resource.scheme === 'file') {
                return vscode_uri_1.URI.file(paths.dirname(resource.fsPath));
            }
            return resource.with({
                path: paths.dirname(resource.path)
            });
        }
        if (resolveParent && this.hasFolder(uri)) {
            uri = dirname(uri);
        }
        var resourcePath = uri.toString();
        var workspaceFolder;
        for (var i = 0; i < this.folders.length; i++) {
            var folder = this.folders[i];
            var folderPath = folder.uri.toString();
            if (resourcePath === folderPath) {
                return type_converters_1.toWorkspaceFolder(folder);
            }
            if (resourcePath.startsWith(folderPath)
                && resourcePath[folderPath.length] === '/'
                && (!workspaceFolder || folderPath.length > workspaceFolder.uri.toString().length)) {
                workspaceFolder = folder;
            }
        }
        return workspaceFolder;
    };
    WorkspaceExtImpl.prototype.hasFolder = function (uri) {
        if (!this.folders) {
            return false;
        }
        return this.folders.some(function (folder) { return folder.uri.toString() === uri.toString(); });
    };
    WorkspaceExtImpl.prototype.getRelativePath = function (pathOrUri, includeWorkspace) {
        var path;
        if (typeof pathOrUri === 'string') {
            path = pathOrUri;
        }
        else if (typeof pathOrUri !== 'undefined') {
            path = pathOrUri.fsPath;
        }
        if (!path) {
            return path;
        }
        var folder = this.getWorkspaceFolder(typeof pathOrUri === 'string' ? vscode_uri_1.URI.file(pathOrUri) : pathOrUri, true);
        if (!folder) {
            return path;
        }
        if (typeof includeWorkspace === 'undefined') {
            includeWorkspace = this.folders.length > 1;
        }
        var result = paths_util_1.relative(folder.uri.fsPath, path);
        if (includeWorkspace) {
            result = folder.name + "/" + result;
        }
        return paths_1.normalize(result, true);
    };
    WorkspaceExtImpl.prototype.updateWorkspaceFolders = function (start, deleteCount) {
        var _a;
        var _this = this;
        var workspaceFoldersToAdd = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            workspaceFoldersToAdd[_i - 2] = arguments[_i];
        }
        var rootsToAdd = new Set();
        if (Array.isArray(workspaceFoldersToAdd)) {
            workspaceFoldersToAdd.forEach(function (folderToAdd) {
                var uri = vscode_uri_1.URI.isUri(folderToAdd.uri) && folderToAdd.uri.toString();
                if (uri && !rootsToAdd.has(uri)) {
                    rootsToAdd.add(uri);
                }
            });
        }
        if ([start, deleteCount].some(function (i) { return typeof i !== 'number' || i < 0; })) {
            return false; // validate numbers
        }
        if (deleteCount === 0 && rootsToAdd.size === 0) {
            return false; // nothing to delete or add
        }
        var currentWorkspaceFolders = this.workspaceFolders || [];
        if (start + deleteCount > currentWorkspaceFolders.length) {
            return false; // cannot delete more than we have
        }
        // Simulate the updateWorkspaceFolders method on our data to do more validation
        var newWorkspaceFolders = currentWorkspaceFolders.slice(0);
        newWorkspaceFolders.splice.apply(newWorkspaceFolders, __spread([start, deleteCount], __spread(rootsToAdd).map(function (uri) { return ({ uri: vscode_uri_1.URI.parse(uri), name: undefined, index: undefined }); })));
        var _loop_1 = function (i) {
            var folder = newWorkspaceFolders[i];
            if (newWorkspaceFolders.some(function (otherFolder, index) { return index !== i && folder.uri.toString() === otherFolder.uri.toString(); })) {
                return { value: false };
            }
        };
        for (var i = 0; i < newWorkspaceFolders.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        var _b = this.deltaFolders(currentWorkspaceFolders, newWorkspaceFolders), added = _b.added, removed = _b.removed;
        if (added.length === 0 && removed.length === 0) {
            return false; // nothing actually changed
        }
        // Trigger on main side
        (_a = this.proxy).$updateWorkspaceFolders.apply(_a, __spread([start, deleteCount], rootsToAdd)).then(undefined, function (error) {
            return _this.messageService.showMessage(plugin_api_rpc_1.MainMessageType.Error, "Failed to update workspace folders: " + error);
        });
        return true;
    };
    WorkspaceExtImpl.prototype.refreshWorkspaceFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var workspace;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.proxy.$getWorkspace()];
                    case 1:
                        workspace = _a.sent();
                        this.updateWorkSpace(workspace);
                        return [2 /*return*/];
                }
            });
        });
    };
    WorkspaceExtImpl.prototype.updateWorkSpace = function (workspace) {
        // A workspace directory implies an undefined workspace file
        if (workspace && !workspace.isDirectory) {
            this.workspaceFileUri = vscode_uri_1.URI.parse(workspace.resource.toString());
        }
    };
    return WorkspaceExtImpl;
}());
exports.WorkspaceExtImpl = WorkspaceExtImpl;
//# sourceMappingURL=workspace.js.map