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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.TextContentResource = exports.TextContentResourceResolver = exports.WorkspaceMainImpl = void 0;
var inversify_1 = require("inversify");
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var vscode_uri_1 = require("vscode-uri");
var quick_open_model_1 = require("@theia/core/lib/browser/quick-open/quick-open-model");
var monaco_quick_open_service_1 = require("@theia/monaco/lib/browser/monaco-quick-open-service");
var file_search_service_1 = require("@theia/file-search/lib/common/file-search-service");
var uri_1 = require("@theia/core/lib/common/uri");
var browser_1 = require("@theia/workspace/lib/browser");
var disposable_1 = require("@theia/core/lib/common/disposable");
var core_1 = require("@theia/core");
var plugin_protocol_1 = require("../../common/plugin-protocol");
var browser_2 = require("@theia/filesystem/lib/browser");
var search_in_workspace_service_1 = require("@theia/search-in-workspace/lib/browser/search-in-workspace-service");
var WorkspaceMainImpl = /** @class */ (function () {
    function WorkspaceMainImpl(rpc, container) {
        var _this = this;
        this.toDispose = new disposable_1.DisposableCollection();
        this.workspaceSearch = new Set();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.WORKSPACE_EXT);
        this.storageProxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.STORAGE_EXT);
        this.quickOpenService = container.get(monaco_quick_open_service_1.MonacoQuickOpenService);
        this.fileSearchService = container.get(file_search_service_1.FileSearchService);
        this.searchInWorkspaceService = container.get(search_in_workspace_service_1.SearchInWorkspaceService);
        this.resourceResolver = container.get(TextContentResourceResolver);
        this.pluginServer = container.get(plugin_protocol_1.PluginServer);
        this.workspaceService = container.get(browser_1.WorkspaceService);
        this.fsPreferences = container.get(browser_2.FileSystemPreferences);
        this.processWorkspaceFoldersChanged(this.workspaceService.tryGetRoots().map(function (root) { return root.resource.toString(); }));
        this.toDispose.push(this.workspaceService.onWorkspaceChanged(function (roots) {
            _this.processWorkspaceFoldersChanged(roots.map(function (root) { return root.resource.toString(); }));
        }));
        this.toDispose.push(this.workspaceService.onWorkspaceLocationChanged(function (stat) {
            _this.proxy.$onWorkspaceLocationChanged(stat);
        }));
    }
    WorkspaceMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    WorkspaceMainImpl.prototype.processWorkspaceFoldersChanged = function (roots) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var keyValueStorageWorkspacesData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isAnyRootChanged(roots) === false) {
                            return [2 /*return*/];
                        }
                        this.roots = roots;
                        this.proxy.$onWorkspaceFoldersChanged({ roots: roots });
                        return [4 /*yield*/, this.pluginServer.getAllStorageValues({
                                workspace: (_a = this.workspaceService.workspace) === null || _a === void 0 ? void 0 : _a.resource.toString(),
                                roots: this.workspaceService.tryGetRoots().map(function (root) { return root.resource.toString(); })
                            })];
                    case 1:
                        keyValueStorageWorkspacesData = _b.sent();
                        this.storageProxy.$updatePluginsWorkspaceData(keyValueStorageWorkspacesData);
                        return [2 /*return*/];
                }
            });
        });
    };
    WorkspaceMainImpl.prototype.isAnyRootChanged = function (roots) {
        if (!this.roots || this.roots.length !== roots.length) {
            return true;
        }
        return this.roots.some(function (root, index) { return root !== roots[index]; });
    };
    WorkspaceMainImpl.prototype.$getWorkspace = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.workspaceService.workspace];
            });
        });
    };
    WorkspaceMainImpl.prototype.$pickWorkspaceFolder = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Return undefined if workspace root is not set
            if (!_this.roots || !_this.roots.length) {
                resolve(undefined);
                return;
            }
            // Active before appearing the pick menu
            var activeElement = window.document.activeElement;
            // WorkspaceFolder to be returned
            var returnValue;
            var items = _this.roots.map(function (root) {
                var rootUri = vscode_uri_1.URI.parse(root);
                var rootPathName = rootUri.path.substring(rootUri.path.lastIndexOf('/') + 1);
                return new quick_open_model_1.QuickOpenItem({
                    label: rootPathName,
                    detail: rootUri.path,
                    run: function (mode) {
                        if (mode === quick_open_model_1.QuickOpenMode.OPEN) {
                            returnValue = {
                                uri: rootUri,
                                name: rootPathName,
                                index: 0
                            };
                        }
                        return true;
                    }
                });
            });
            // Create quick open model
            var model = {
                onType: function (lookFor, acceptor) {
                    acceptor(items);
                }
            };
            // Show pick menu
            _this.quickOpenService.open(model, {
                fuzzyMatchLabel: true,
                fuzzyMatchDetail: true,
                fuzzyMatchDescription: true,
                placeholder: options.placeHolder,
                onClose: function () {
                    if (activeElement) {
                        activeElement.focus({ preventScroll: true });
                    }
                    resolve(returnValue);
                }
            });
        });
    };
    WorkspaceMainImpl.prototype.$startFileSearch = function (includePattern, includeFolderUri, excludePatternOrDisregardExcludes, maxResults) {
        return __awaiter(this, void 0, void 0, function () {
            var roots, rootUris, rootUris_1, rootUris_1_1, rootUri, opts, rootUris_2, rootUris_2_1, rootUri, filesExclude, excludePattern, rootOptions, rootExcludePatterns, uriStrs;
            var e_1, _a, e_2, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        roots = {};
                        rootUris = includeFolderUri ? [includeFolderUri] : this.roots;
                        try {
                            for (rootUris_1 = __values(rootUris), rootUris_1_1 = rootUris_1.next(); !rootUris_1_1.done; rootUris_1_1 = rootUris_1.next()) {
                                rootUri = rootUris_1_1.value;
                                roots[rootUri] = {};
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (rootUris_1_1 && !rootUris_1_1.done && (_a = rootUris_1.return)) _a.call(rootUris_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        opts = {
                            rootOptions: roots,
                            useGitIgnore: excludePatternOrDisregardExcludes !== false
                        };
                        if (includePattern) {
                            opts.includePatterns = [includePattern];
                        }
                        if (typeof excludePatternOrDisregardExcludes === 'string') {
                            opts.excludePatterns = [excludePatternOrDisregardExcludes];
                        }
                        if (excludePatternOrDisregardExcludes !== false) {
                            try {
                                for (rootUris_2 = __values(rootUris), rootUris_2_1 = rootUris_2.next(); !rootUris_2_1.done; rootUris_2_1 = rootUris_2.next()) {
                                    rootUri = rootUris_2_1.value;
                                    filesExclude = this.fsPreferences.get('files.exclude', undefined, rootUri);
                                    if (filesExclude) {
                                        for (excludePattern in filesExclude) {
                                            if (filesExclude[excludePattern]) {
                                                rootOptions = roots[rootUri];
                                                rootExcludePatterns = rootOptions.excludePatterns || [];
                                                rootExcludePatterns.push(excludePattern);
                                                rootOptions.excludePatterns = rootExcludePatterns;
                                            }
                                        }
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (rootUris_2_1 && !rootUris_2_1.done && (_b = rootUris_2.return)) _b.call(rootUris_2);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                        if (typeof maxResults === 'number') {
                            opts.limit = maxResults;
                        }
                        return [4 /*yield*/, this.fileSearchService.find('', opts)];
                    case 1:
                        uriStrs = _c.sent();
                        return [2 /*return*/, uriStrs.map(function (uriStr) { return vscode_uri_1.URI.parse(uriStr); })];
                }
            });
        });
    };
    WorkspaceMainImpl.prototype.$findTextInFiles = function (query, options, searchRequestId, token) {
        if (token === void 0) { token = core_1.CancellationToken.None; }
        return __awaiter(this, void 0, void 0, function () {
            var maxHits, excludes, includes, canceledRequest;
            var _this = this;
            return __generator(this, function (_a) {
                maxHits = options.maxResults ? options.maxResults : 150;
                excludes = options.exclude ? (typeof options.exclude === 'string' ? options.exclude : options.exclude.pattern) : undefined;
                includes = options.include ? (typeof options.include === 'string' ? options.include : options.include.pattern) : undefined;
                canceledRequest = false;
                return [2 /*return*/, new Promise(function (resolve) {
                        var matches = 0;
                        var what = query.pattern;
                        _this.searchInWorkspaceService.searchWithCallback(what, _this.roots, {
                            onResult: function (searchId, result) {
                                if (canceledRequest) {
                                    return;
                                }
                                var hasSearch = _this.workspaceSearch.has(searchId);
                                if (!hasSearch) {
                                    _this.workspaceSearch.add(searchId);
                                    token.onCancellationRequested(function () {
                                        _this.searchInWorkspaceService.cancel(searchId);
                                        canceledRequest = true;
                                    });
                                }
                                if (token.isCancellationRequested) {
                                    _this.searchInWorkspaceService.cancel(searchId);
                                    canceledRequest = true;
                                    return;
                                }
                                if (result && result.matches && result.matches.length) {
                                    while ((matches + result.matches.length) > maxHits) {
                                        result.matches.splice(result.matches.length - 1, 1);
                                    }
                                    _this.proxy.$onTextSearchResult(searchRequestId, false, result);
                                    matches += result.matches.length;
                                    if (maxHits <= matches) {
                                        _this.searchInWorkspaceService.cancel(searchId);
                                    }
                                }
                            },
                            onDone: function (searchId, _error) {
                                var hasSearch = _this.workspaceSearch.has(searchId);
                                if (hasSearch) {
                                    _this.searchInWorkspaceService.cancel(searchId);
                                    _this.workspaceSearch.delete(searchId);
                                }
                                _this.proxy.$onTextSearchResult(searchRequestId, true);
                                if (maxHits <= matches) {
                                    resolve({ limitHit: true });
                                }
                                else {
                                    resolve({ limitHit: false });
                                }
                            }
                        }, {
                            useRegExp: query.isRegExp,
                            matchCase: query.isCaseSensitive,
                            matchWholeWord: query.isWordMatch,
                            exclude: excludes ? [excludes] : undefined,
                            include: includes ? [includes] : undefined,
                            maxResults: maxHits
                        });
                    })];
            });
        });
    };
    WorkspaceMainImpl.prototype.$registerTextDocumentContentProvider = function (scheme) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.resourceResolver.registerContentProvider(scheme, this.proxy);
                this.toDispose.push(disposable_1.Disposable.create(function () { return _this.resourceResolver.unregisterContentProvider(scheme); }));
                return [2 /*return*/];
            });
        });
    };
    WorkspaceMainImpl.prototype.$unregisterTextDocumentContentProvider = function (scheme) {
        this.resourceResolver.unregisterContentProvider(scheme);
    };
    WorkspaceMainImpl.prototype.$onTextDocumentContentChange = function (uri, content) {
        this.resourceResolver.onContentChange(uri, content);
    };
    WorkspaceMainImpl.prototype.$updateWorkspaceFolders = function (start, deleteCount) {
        var rootsToAdd = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rootsToAdd[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (_a = this.workspaceService).spliceRoots.apply(_a, __spread([start, deleteCount], rootsToAdd.map(function (root) { return new uri_1.default(root); })))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return WorkspaceMainImpl;
}());
exports.WorkspaceMainImpl = WorkspaceMainImpl;
var TextContentResourceResolver = /** @class */ (function () {
    function TextContentResourceResolver() {
        // Resource providers for different schemes
        this.providers = new Map();
        // Opened resources
        this.resources = new Map();
    }
    TextContentResourceResolver.prototype.resolve = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                provider = this.providers.get(uri.scheme);
                if (provider) {
                    return [2 /*return*/, provider.provideResource(uri)];
                }
                throw new Error("Unable to find Text Content Resource Provider for scheme '" + uri.scheme + "'");
            });
        });
    };
    TextContentResourceResolver.prototype.registerContentProvider = function (scheme, proxy) {
        if (this.providers.has(scheme)) {
            throw new Error("Text Content Resource Provider for scheme '" + scheme + "' is already registered");
        }
        var instance = this;
        this.providers.set(scheme, {
            provideResource: function (uri) {
                var resource = instance.resources.get(uri.toString());
                if (resource) {
                    return resource;
                }
                resource = new TextContentResource(uri, proxy, {
                    dispose: function () {
                        instance.resources.delete(uri.toString());
                    }
                });
                instance.resources.set(uri.toString(), resource);
                return resource;
            }
        });
    };
    TextContentResourceResolver.prototype.unregisterContentProvider = function (scheme) {
        if (!this.providers.delete(scheme)) {
            throw new Error("Text Content Resource Provider for scheme '" + scheme + "' has not been registered");
        }
    };
    TextContentResourceResolver.prototype.onContentChange = function (uri, content) {
        var resource = this.resources.get(uri);
        if (resource) {
            resource.setContent(content);
        }
    };
    TextContentResourceResolver = __decorate([
        inversify_1.injectable()
    ], TextContentResourceResolver);
    return TextContentResourceResolver;
}());
exports.TextContentResourceResolver = TextContentResourceResolver;
var TextContentResource = /** @class */ (function () {
    function TextContentResource(uri, proxy, disposable) {
        this.uri = uri;
        this.proxy = proxy;
        this.disposable = disposable;
        this.onDidChangeContentsEmitter = new core_1.Emitter();
        this.onDidChangeContents = this.onDidChangeContentsEmitter.event;
    }
    TextContentResource.prototype.readContents = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var content, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.cache) return [3 /*break*/, 1];
                        content = this.cache;
                        this.cache = undefined;
                        return [2 /*return*/, content];
                    case 1: return [4 /*yield*/, this.proxy.$provideTextDocumentContent(this.uri.toString())];
                    case 2:
                        content = _a.sent();
                        if (content) {
                            return [2 /*return*/, content];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, Promise.reject(new Error("Unable to get content for '" + this.uri.toString() + "'"))];
                }
            });
        });
    };
    TextContentResource.prototype.dispose = function () {
        this.disposable.dispose();
    };
    TextContentResource.prototype.setContent = function (content) {
        this.cache = content;
        this.onDidChangeContentsEmitter.fire(undefined);
    };
    return TextContentResource;
}());
exports.TextContentResource = TextContentResource;
//# sourceMappingURL=workspace-main.js.map