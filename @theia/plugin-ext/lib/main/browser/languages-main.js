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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMonacoWorkspaceEdit = exports.LanguagesMainImpl = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// Method `$changeLanguage` copied and modified
// from https://github.com/microsoft/vscode/blob/e9c50663154c369a06355ce752b447af5b580dc3/src/vs/workbench/api/browser/mainThreadLanguages.ts#L30-L42
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var inversify_1 = require("inversify");
var plugin_api_rpc_model_1 = require("../../common/plugin-api-rpc-model");
var rpc_protocol_1 = require("../../common/rpc-protocol");
var monaco_languages_1 = require("@theia/monaco/lib/browser/monaco-languages");
var uri_1 = require("@theia/core/lib/common/uri");
var disposable_1 = require("@theia/core/lib/common/disposable");
var event_1 = require("@theia/core/lib/common/event");
var browser_1 = require("@theia/markers/lib/browser");
var vst = require("vscode-languageserver-types");
var browser_2 = require("@theia/callhierarchy/lib/browser");
var callhierarchy_type_converters_1 = require("./callhierarchy/callhierarchy-type-converters");
var object_identifier_1 = require("../../common/object-identifier");
var types_1 = require("../../common/types");
var paths_util_1 = require("../../common/paths-util");
var semantic_tokens_dto_1 = require("../../common/semantic-tokens-dto");
var LanguagesMainImpl = /** @class */ (function () {
    function LanguagesMainImpl(rpc) {
        this.services = new Map();
        this.toDispose = new disposable_1.DisposableCollection();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.LANGUAGES_EXT);
    }
    LanguagesMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    LanguagesMainImpl.prototype.$getLanguages = function () {
        return Promise.resolve(monaco.languages.getLanguages().map(function (l) { return l.id; }));
    };
    LanguagesMainImpl.prototype.$changeLanguage = function (resource, languageId) {
        var uri = monaco.Uri.revive(resource);
        var model = monaco.editor.getModel(uri);
        if (!model) {
            return Promise.reject(new Error('Invalid uri'));
        }
        var langId = monaco.languages.getEncodedLanguageId(languageId);
        if (!langId) {
            return Promise.reject(new Error("Unknown language ID: " + languageId));
        }
        monaco.editor.setModelLanguage(model, languageId);
        return Promise.resolve(undefined);
    };
    LanguagesMainImpl.prototype.register = function (handle, service) {
        var _this = this;
        this.services.set(handle, service);
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.$unregister(handle); }));
    };
    LanguagesMainImpl.prototype.$unregister = function (handle) {
        var disposable = this.services.get(handle);
        if (disposable) {
            this.services.delete(handle);
            disposable.dispose();
        }
    };
    LanguagesMainImpl.prototype.$setLanguageConfiguration = function (handle, languageId, configuration) {
        var config = {
            comments: configuration.comments,
            brackets: configuration.brackets,
            wordPattern: reviveRegExp(configuration.wordPattern),
            indentationRules: reviveIndentationRule(configuration.indentationRules),
            onEnterRules: reviveOnEnterRules(configuration.onEnterRules),
        };
        this.register(handle, monaco.languages.setLanguageConfiguration(languageId, config));
    };
    LanguagesMainImpl.prototype.$registerCompletionSupport = function (handle, pluginInfo, selector, triggerCharacters, supportsResolveDetails) {
        var _this = this;
        this.register(handle, monaco.modes.CompletionProviderRegistry.register(this.toLanguageSelector(selector), {
            triggerCharacters: triggerCharacters,
            provideCompletionItems: function (model, position, context, token) { return _this.provideCompletionItems(handle, model, position, context, token); },
            resolveCompletionItem: supportsResolveDetails
                ? function (model, position, suggestion, token) { return Promise.resolve(_this.resolveCompletionItem(handle, model, position, suggestion, token)); }
                : undefined
        }));
    };
    LanguagesMainImpl.prototype.provideCompletionItems = function (handle, model, position, context, token) {
        var _this = this;
        return this.proxy.$provideCompletionItems(handle, model.uri, position, context, token).then(function (result) {
            if (!result) {
                return undefined;
            }
            return {
                suggestions: result.completions.map(function (c) { return Object.assign(c, {
                    range: c.range || result.defaultRange
                }); }),
                incomplete: result.incomplete,
                dispose: function () { return _this.proxy.$releaseCompletionItems(handle, result.id); }
            };
        });
    };
    LanguagesMainImpl.prototype.resolveCompletionItem = function (handle, model, position, item, token) {
        var _a = item, parentId = _a.parentId, id = _a.id;
        return this.proxy.$resolveCompletionItem(handle, parentId, id, token).then(function (resolved) {
            if (resolved) {
                types_1.mixin(item, resolved, true);
            }
            return item;
        });
    };
    LanguagesMainImpl.prototype.$registerDefinitionProvider = function (handle, pluginInfo, selector) {
        var languageSelector = this.toLanguageSelector(selector);
        var definitionProvider = this.createDefinitionProvider(handle);
        this.register(handle, monaco.languages.registerDefinitionProvider(languageSelector, definitionProvider));
    };
    LanguagesMainImpl.prototype.$registerDeclarationProvider = function (handle, pluginInfo, selector) {
        var languageSelector = this.toLanguageSelector(selector);
        var declarationProvider = this.createDeclarationProvider(handle);
        this.register(handle, monaco.languages.registerDeclarationProvider(languageSelector, declarationProvider));
    };
    LanguagesMainImpl.prototype.$registerReferenceProvider = function (handle, pluginInfo, selector) {
        var languageSelector = this.toLanguageSelector(selector);
        var referenceProvider = this.createReferenceProvider(handle);
        this.register(handle, monaco.languages.registerReferenceProvider(languageSelector, referenceProvider));
    };
    LanguagesMainImpl.prototype.createReferenceProvider = function (handle) {
        var _this = this;
        return {
            provideReferences: function (model, position, context, token) { return _this.provideReferences(handle, model, position, context, token); }
        };
    };
    LanguagesMainImpl.prototype.provideReferences = function (handle, model, position, context, token) {
        return this.proxy.$provideReferences(handle, model.uri, position, context, token).then(function (result) {
            var e_1, _a;
            if (!result) {
                return undefined;
            }
            if (Array.isArray(result)) {
                var references = [];
                try {
                    for (var result_1 = __values(result), result_1_1 = result_1.next(); !result_1_1.done; result_1_1 = result_1.next()) {
                        var item = result_1_1.value;
                        references.push(__assign(__assign({}, item), { uri: monaco.Uri.revive(item.uri) }));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (result_1_1 && !result_1_1.done && (_a = result_1.return)) _a.call(result_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return references;
            }
            return undefined;
        });
    };
    LanguagesMainImpl.prototype.$registerSignatureHelpProvider = function (handle, pluginInfo, selector, metadata) {
        var languageSelector = this.toLanguageSelector(selector);
        var signatureHelpProvider = this.createSignatureHelpProvider(handle, metadata);
        this.register(handle, monaco.languages.registerSignatureHelpProvider(languageSelector, signatureHelpProvider));
    };
    LanguagesMainImpl.prototype.$clearDiagnostics = function (id) {
        var e_2, _a;
        try {
            for (var _b = __values(this.problemManager.getUris()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var uri = _c.value;
                this.problemManager.setMarkers(new uri_1.default(uri), id, []);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    LanguagesMainImpl.prototype.$changeDiagnostics = function (id, delta) {
        var e_3, _a;
        try {
            for (var delta_1 = __values(delta), delta_1_1 = delta_1.next(); !delta_1_1.done; delta_1_1 = delta_1.next()) {
                var _b = __read(delta_1_1.value, 2), uriString = _b[0], markers = _b[1];
                var uri = new uri_1.default(uriString);
                this.problemManager.setMarkers(uri, id, markers.map(reviveMarker));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (delta_1_1 && !delta_1_1.done && (_a = delta_1.return)) _a.call(delta_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    LanguagesMainImpl.prototype.$registerImplementationProvider = function (handle, pluginInfo, selector) {
        var languageSelector = this.toLanguageSelector(selector);
        var implementationProvider = this.createImplementationProvider(handle);
        this.register(handle, monaco.languages.registerImplementationProvider(languageSelector, implementationProvider));
    };
    LanguagesMainImpl.prototype.createImplementationProvider = function (handle) {
        var _this = this;
        return {
            provideImplementation: function (model, position, token) { return _this.provideImplementation(handle, model, position, token); }
        };
    };
    LanguagesMainImpl.prototype.provideImplementation = function (handle, model, position, token) {
        return this.proxy.$provideImplementation(handle, model.uri, position, token).then(function (result) {
            var e_4, _a;
            if (!result) {
                return undefined;
            }
            if (Array.isArray(result)) {
                // using DefinitionLink because Location is mandatory part of DefinitionLink
                var definitionLinks = [];
                try {
                    for (var result_2 = __values(result), result_2_1 = result_2.next(); !result_2_1.done; result_2_1 = result_2.next()) {
                        var item = result_2_1.value;
                        definitionLinks.push(__assign(__assign({}, item), { uri: monaco.Uri.revive(item.uri) }));
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (result_2_1 && !result_2_1.done && (_a = result_2.return)) _a.call(result_2);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                return definitionLinks;
            }
            else {
                // single Location
                return {
                    uri: monaco.Uri.revive(result.uri),
                    range: result.range
                };
            }
        });
    };
    LanguagesMainImpl.prototype.$registerTypeDefinitionProvider = function (handle, pluginInfo, selector) {
        var languageSelector = this.toLanguageSelector(selector);
        var typeDefinitionProvider = this.createTypeDefinitionProvider(handle);
        this.register(handle, monaco.languages.registerTypeDefinitionProvider(languageSelector, typeDefinitionProvider));
    };
    LanguagesMainImpl.prototype.createTypeDefinitionProvider = function (handle) {
        var _this = this;
        return {
            provideTypeDefinition: function (model, position, token) { return _this.provideTypeDefinition(handle, model, position, token); }
        };
    };
    LanguagesMainImpl.prototype.provideTypeDefinition = function (handle, model, position, token) {
        return this.proxy.$provideTypeDefinition(handle, model.uri, position, token).then(function (result) {
            var e_5, _a;
            if (!result) {
                return undefined;
            }
            if (Array.isArray(result)) {
                // using DefinitionLink because Location is mandatory part of DefinitionLink
                var definitionLinks = [];
                try {
                    for (var result_3 = __values(result), result_3_1 = result_3.next(); !result_3_1.done; result_3_1 = result_3.next()) {
                        var item = result_3_1.value;
                        definitionLinks.push(__assign(__assign({}, item), { uri: monaco.Uri.revive(item.uri) }));
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (result_3_1 && !result_3_1.done && (_a = result_3.return)) _a.call(result_3);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                return definitionLinks;
            }
            else {
                // single Location
                return {
                    uri: monaco.Uri.revive(result.uri),
                    range: result.range
                };
            }
        });
    };
    LanguagesMainImpl.prototype.$registerHoverProvider = function (handle, pluginInfo, selector) {
        var languageSelector = this.toLanguageSelector(selector);
        var hoverProvider = this.createHoverProvider(handle);
        this.register(handle, monaco.languages.registerHoverProvider(languageSelector, hoverProvider));
    };
    LanguagesMainImpl.prototype.createHoverProvider = function (handle) {
        var _this = this;
        return {
            provideHover: function (model, position, token) { return _this.provideHover(handle, model, position, token); }
        };
    };
    LanguagesMainImpl.prototype.provideHover = function (handle, model, position, token) {
        return this.proxy.$provideHover(handle, model.uri, position, token);
    };
    LanguagesMainImpl.prototype.$registerDocumentHighlightProvider = function (handle, pluginInfo, selector) {
        var languageSelector = this.toLanguageSelector(selector);
        var documentHighlightProvider = this.createDocumentHighlightProvider(handle);
        this.register(handle, monaco.languages.registerDocumentHighlightProvider(languageSelector, documentHighlightProvider));
    };
    LanguagesMainImpl.prototype.createDocumentHighlightProvider = function (handle) {
        var _this = this;
        return {
            provideDocumentHighlights: function (model, position, token) { return _this.provideDocumentHighlights(handle, model, position, token); }
        };
    };
    LanguagesMainImpl.prototype.provideDocumentHighlights = function (handle, model, position, token) {
        return this.proxy.$provideDocumentHighlights(handle, model.uri, position, token).then(function (result) {
            var e_6, _a;
            if (!result) {
                return undefined;
            }
            if (Array.isArray(result)) {
                var highlights = [];
                try {
                    for (var result_4 = __values(result), result_4_1 = result_4.next(); !result_4_1.done; result_4_1 = result_4.next()) {
                        var item = result_4_1.value;
                        highlights.push(__assign(__assign({}, item), { kind: (item.kind ? item.kind : monaco.languages.DocumentHighlightKind.Text) }));
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (result_4_1 && !result_4_1.done && (_a = result_4.return)) _a.call(result_4);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                return highlights;
            }
            return undefined;
        });
    };
    LanguagesMainImpl.prototype.$registerWorkspaceSymbolProvider = function (handle, pluginInfo) {
        var workspaceSymbolProvider = this.createWorkspaceSymbolProvider(handle);
        this.register(handle, this.monacoLanguages.registerWorkspaceSymbolProvider(workspaceSymbolProvider));
    };
    LanguagesMainImpl.prototype.createWorkspaceSymbolProvider = function (handle) {
        var _this = this;
        return {
            provideWorkspaceSymbols: function (params, token) { return _this.provideWorkspaceSymbols(handle, params, token); },
            resolveWorkspaceSymbol: function (symbol, token) { return _this.resolveWorkspaceSymbol(handle, symbol, token); }
        };
    };
    LanguagesMainImpl.prototype.provideWorkspaceSymbols = function (handle, params, token) {
        return this.proxy.$provideWorkspaceSymbols(handle, params.query, token);
    };
    LanguagesMainImpl.prototype.resolveWorkspaceSymbol = function (handle, symbol, token) {
        return this.proxy.$resolveWorkspaceSymbol(handle, symbol, token);
    };
    LanguagesMainImpl.prototype.$registerDocumentLinkProvider = function (handle, pluginInfo, selector) {
        var languageSelector = this.toLanguageSelector(selector);
        var linkProvider = this.createLinkProvider(handle);
        this.register(handle, monaco.languages.registerLinkProvider(languageSelector, linkProvider));
    };
    LanguagesMainImpl.prototype.createLinkProvider = function (handle) {
        var _this = this;
        return {
            provideLinks: function (model, token) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, this.provideLinks(handle, model, token)];
            }); }); },
            resolveLink: function (link, token) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, this.resolveLink(handle, link, token)];
            }); }); }
        };
    };
    LanguagesMainImpl.prototype.provideLinks = function (handle, model, token) {
        return __awaiter(this, void 0, void 0, function () {
            var links;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.proxy.$provideDocumentLinks(handle, model.uri, token)];
                    case 1:
                        links = _a.sent();
                        if (!links) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, {
                                links: links.map(function (link) { return _this.toMonacoLink(link); }),
                                dispose: function () {
                                    if (links && Array.isArray(links)) {
                                        _this.proxy.$releaseDocumentLinks(handle, links.map(function (link) { return object_identifier_1.ObjectIdentifier.of(link); }));
                                    }
                                }
                            }];
                }
            });
        });
    };
    LanguagesMainImpl.prototype.resolveLink = function (handle, link, token) {
        return __awaiter(this, void 0, void 0, function () {
            var resolved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.proxy.$resolveDocumentLink(handle, link, token)];
                    case 1:
                        resolved = _a.sent();
                        return [2 /*return*/, resolved && this.toMonacoLink(resolved)];
                }
            });
        });
    };
    LanguagesMainImpl.prototype.toMonacoLink = function (link) {
        return __assign(__assign({}, link), { url: !!link.url && typeof link.url !== 'string' ? monaco.Uri.revive(link.url) : link.url });
    };
    LanguagesMainImpl.prototype.$registerCodeLensSupport = function (handle, pluginInfo, selector, eventHandle) {
        var languageSelector = this.toLanguageSelector(selector);
        var lensProvider = this.createCodeLensProvider(handle);
        if (typeof eventHandle === 'number') {
            var emitter = new event_1.Emitter();
            this.register(eventHandle, emitter);
            lensProvider.onDidChange = emitter.event;
        }
        this.register(handle, monaco.languages.registerCodeLensProvider(languageSelector, lensProvider));
    };
    LanguagesMainImpl.prototype.createCodeLensProvider = function (handle) {
        var _this = this;
        return {
            provideCodeLenses: function (model, token) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, this.provideCodeLenses(handle, model, token)];
            }); }); },
            resolveCodeLens: function (model, codeLens, token) { return _this.resolveCodeLens(handle, model, codeLens, token); }
        };
    };
    LanguagesMainImpl.prototype.provideCodeLenses = function (handle, model, token) {
        return __awaiter(this, void 0, void 0, function () {
            var lenses;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.proxy.$provideCodeLenses(handle, model.uri, token)];
                    case 1:
                        lenses = _a.sent();
                        if (!lenses) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, {
                                lenses: lenses,
                                dispose: function () {
                                    if (lenses && Array.isArray(lenses)) {
                                        _this.proxy.$releaseCodeLenses(handle, lenses.map(function (symbol) { return object_identifier_1.ObjectIdentifier.of(symbol); }));
                                    }
                                }
                            }];
                }
            });
        });
    };
    LanguagesMainImpl.prototype.resolveCodeLens = function (handle, model, codeLens, token) {
        return this.proxy.$resolveCodeLens(handle, model.uri, codeLens, token);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LanguagesMainImpl.prototype.$emitCodeLensEvent = function (eventHandle, event) {
        var obj = this.services.get(eventHandle);
        if (obj instanceof event_1.Emitter) {
            obj.fire(event);
        }
    };
    LanguagesMainImpl.prototype.$registerOutlineSupport = function (handle, pluginInfo, selector) {
        var languageSelector = this.toLanguageSelector(selector);
        var symbolProvider = this.createDocumentSymbolProvider(handle);
        this.register(handle, monaco.modes.DocumentSymbolProviderRegistry.register(languageSelector, symbolProvider));
    };
    LanguagesMainImpl.prototype.createDocumentSymbolProvider = function (handle) {
        var _this = this;
        return {
            provideDocumentSymbols: function (model, token) { return _this.provideDocumentSymbols(handle, model, token); }
        };
    };
    LanguagesMainImpl.prototype.provideDocumentSymbols = function (handle, model, token) {
        return this.proxy.$provideDocumentSymbols(handle, model.uri, token);
    };
    LanguagesMainImpl.prototype.createDefinitionProvider = function (handle) {
        var _this = this;
        return {
            provideDefinition: function (model, position, token) { return _this.provideDefinition(handle, model, position, token); }
        };
    };
    LanguagesMainImpl.prototype.createDeclarationProvider = function (handle) {
        var _this = this;
        return {
            provideDeclaration: function (model, position, token) { return _this.provideDeclaration(handle, model, position, token); }
        };
    };
    LanguagesMainImpl.prototype.provideDeclaration = function (handle, model, position, token) {
        return this.proxy.$provideDeclaration(handle, model.uri, position, token).then(function (result) {
            var e_7, _a;
            if (!result) {
                return undefined;
            }
            if (Array.isArray(result)) {
                // using DefinitionLink because Location is mandatory part of DefinitionLink
                var definitionLinks = [];
                try {
                    for (var result_5 = __values(result), result_5_1 = result_5.next(); !result_5_1.done; result_5_1 = result_5.next()) {
                        var item = result_5_1.value;
                        definitionLinks.push(__assign(__assign({}, item), { uri: monaco.Uri.revive(item.uri) }));
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (result_5_1 && !result_5_1.done && (_a = result_5.return)) _a.call(result_5);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
                return definitionLinks;
            }
            else {
                // single Location
                return {
                    uri: monaco.Uri.revive(result.uri),
                    range: result.range
                };
            }
        });
    };
    LanguagesMainImpl.prototype.provideDefinition = function (handle, model, position, token) {
        return this.proxy.$provideDefinition(handle, model.uri, position, token).then(function (result) {
            var e_8, _a;
            if (!result) {
                return undefined;
            }
            if (Array.isArray(result)) {
                // using DefinitionLink because Location is mandatory part of DefinitionLink
                var definitionLinks = [];
                try {
                    for (var result_6 = __values(result), result_6_1 = result_6.next(); !result_6_1.done; result_6_1 = result_6.next()) {
                        var item = result_6_1.value;
                        definitionLinks.push(__assign(__assign({}, item), { uri: monaco.Uri.revive(item.uri) }));
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (result_6_1 && !result_6_1.done && (_a = result_6.return)) _a.call(result_6);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
                return definitionLinks;
            }
            else {
                // single Location
                return {
                    uri: monaco.Uri.revive(result.uri),
                    range: result.range
                };
            }
        });
    };
    LanguagesMainImpl.prototype.createSignatureHelpProvider = function (handle, metadata) {
        var _this = this;
        return {
            signatureHelpTriggerCharacters: metadata.triggerCharacters,
            signatureHelpRetriggerCharacters: metadata.retriggerCharacters,
            provideSignatureHelp: function (model, position, token, context) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, this.provideSignatureHelp(handle, model, position, token, context)];
            }); }); }
        };
    };
    LanguagesMainImpl.prototype.provideSignatureHelp = function (handle, model, position, token, context) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.proxy.$provideSignatureHelp(handle, model.uri, position, context, token)];
                    case 1:
                        value = _a.sent();
                        if (!value) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, {
                                value: value,
                                dispose: function () {
                                    if (typeof value.id === 'number') {
                                        _this.proxy.$releaseSignatureHelp(handle, value.id);
                                    }
                                }
                            }];
                }
            });
        });
    };
    LanguagesMainImpl.prototype.$registerDocumentFormattingSupport = function (handle, pluginInfo, selector) {
        var languageSelector = this.toLanguageSelector(selector);
        var documentFormattingEditSupport = this.createDocumentFormattingSupport(handle, pluginInfo);
        this.register(handle, monaco.languages.registerDocumentFormattingEditProvider(languageSelector, documentFormattingEditSupport));
    };
    LanguagesMainImpl.prototype.createDocumentFormattingSupport = function (handle, pluginInfo) {
        var _this = this;
        var provider = {
            extensionId: {
                value: pluginInfo.id
            },
            displayName: pluginInfo.name,
            provideDocumentFormattingEdits: function (model, options, token) {
                return _this.provideDocumentFormattingEdits(handle, model, options, token);
            }
        };
        return provider;
    };
    LanguagesMainImpl.prototype.provideDocumentFormattingEdits = function (handle, model, options, token) {
        return this.proxy.$provideDocumentFormattingEdits(handle, model.uri, options, token);
    };
    LanguagesMainImpl.prototype.$registerRangeFormattingSupport = function (handle, pluginInfo, selector) {
        var languageSelector = this.toLanguageSelector(selector);
        var rangeFormattingEditProvider = this.createRangeFormattingSupport(handle, pluginInfo);
        this.register(handle, monaco.languages.registerDocumentRangeFormattingEditProvider(languageSelector, rangeFormattingEditProvider));
    };
    LanguagesMainImpl.prototype.createRangeFormattingSupport = function (handle, pluginInfo) {
        var _this = this;
        var provider = {
            extensionId: {
                value: pluginInfo.id
            },
            displayName: pluginInfo.name,
            provideDocumentRangeFormattingEdits: function (model, range, options, token) {
                return _this.provideDocumentRangeFormattingEdits(handle, model, range, options, token);
            }
        };
        return provider;
    };
    LanguagesMainImpl.prototype.provideDocumentRangeFormattingEdits = function (handle, model, range, options, token) {
        return this.proxy.$provideDocumentRangeFormattingEdits(handle, model.uri, range, options, token);
    };
    LanguagesMainImpl.prototype.$registerOnTypeFormattingProvider = function (handle, pluginInfo, selector, autoFormatTriggerCharacters) {
        var languageSelector = this.toLanguageSelector(selector);
        var onTypeFormattingProvider = this.createOnTypeFormattingProvider(handle, autoFormatTriggerCharacters);
        this.register(handle, monaco.languages.registerOnTypeFormattingEditProvider(languageSelector, onTypeFormattingProvider));
    };
    LanguagesMainImpl.prototype.createOnTypeFormattingProvider = function (handle, autoFormatTriggerCharacters) {
        var _this = this;
        return {
            autoFormatTriggerCharacters: autoFormatTriggerCharacters,
            provideOnTypeFormattingEdits: function (model, position, ch, options, token) { return _this.provideOnTypeFormattingEdits(handle, model, position, ch, options, token); }
        };
    };
    LanguagesMainImpl.prototype.provideOnTypeFormattingEdits = function (handle, model, position, ch, options, token) {
        return this.proxy.$provideOnTypeFormattingEdits(handle, model.uri, position, ch, options, token);
    };
    LanguagesMainImpl.prototype.$registerFoldingRangeProvider = function (handle, pluginInfo, selector) {
        var languageSelector = this.toLanguageSelector(selector);
        var provider = this.createFoldingRangeProvider(handle);
        this.register(handle, monaco.languages.registerFoldingRangeProvider(languageSelector, provider));
    };
    LanguagesMainImpl.prototype.createFoldingRangeProvider = function (handle) {
        var _this = this;
        return {
            provideFoldingRanges: function (model, context, token) { return _this.provideFoldingRanges(handle, model, context, token); }
        };
    };
    LanguagesMainImpl.prototype.provideFoldingRanges = function (handle, model, context, token) {
        return this.proxy.$provideFoldingRange(handle, model.uri, context, token);
    };
    LanguagesMainImpl.prototype.$registerSelectionRangeProvider = function (handle, pluginInfo, selector) {
        var languageSelector = this.toLanguageSelector(selector);
        var provider = this.createSelectionRangeProvider(handle);
        this.register(handle, monaco.languages.registerSelectionRangeProvider(languageSelector, provider));
    };
    LanguagesMainImpl.prototype.createSelectionRangeProvider = function (handle) {
        var _this = this;
        return {
            provideSelectionRanges: function (model, positions, token) { return _this.provideSelectionRanges(handle, model, positions, token); }
        };
    };
    LanguagesMainImpl.prototype.provideSelectionRanges = function (handle, model, positions, token) {
        return this.proxy.$provideSelectionRanges(handle, model.uri, positions, token);
    };
    LanguagesMainImpl.prototype.$registerDocumentColorProvider = function (handle, pluginInfo, selector) {
        var languageSelector = this.toLanguageSelector(selector);
        var colorProvider = this.createColorProvider(handle);
        this.register(handle, monaco.languages.registerColorProvider(languageSelector, colorProvider));
    };
    LanguagesMainImpl.prototype.createColorProvider = function (handle) {
        var _this = this;
        return {
            provideDocumentColors: function (model, token) { return _this.provideDocumentColors(handle, model, token); },
            provideColorPresentations: function (model, colorInfo, token) { return _this.provideColorPresentations(handle, model, colorInfo, token); }
        };
    };
    LanguagesMainImpl.prototype.provideDocumentColors = function (handle, model, token) {
        return this.proxy.$provideDocumentColors(handle, model.uri, token).then(function (documentColors) {
            return documentColors.map(function (documentColor) {
                var _a = __read(documentColor.color, 4), red = _a[0], green = _a[1], blue = _a[2], alpha = _a[3];
                var color = {
                    red: red,
                    green: green,
                    blue: blue,
                    alpha: alpha
                };
                return {
                    color: color,
                    range: documentColor.range
                };
            });
        });
    };
    LanguagesMainImpl.prototype.provideColorPresentations = function (handle, model, colorInfo, token) {
        return this.proxy.$provideColorPresentations(handle, model.uri, {
            color: [
                colorInfo.color.red,
                colorInfo.color.green,
                colorInfo.color.blue,
                colorInfo.color.alpha
            ],
            range: colorInfo.range
        }, token);
    };
    LanguagesMainImpl.prototype.$registerQuickFixProvider = function (handle, pluginInfo, selector, providedCodeActionKinds) {
        var _this = this;
        var languageSelector = this.toLanguageSelector(selector);
        var quickFixProvider = {
            provideCodeActions: function (model, range, context, token) {
                var markers = monaco.services.StaticServices.markerService.get().read({ resource: model.uri }).filter(function (m) { return monaco.Range.areIntersectingOrTouching(m, range); });
                return _this.provideCodeActions(handle, model, range, { markers: markers, only: context.only }, token);
            },
            providedCodeActionKinds: providedCodeActionKinds
        };
        this.register(handle, monaco.modes.CodeActionProviderRegistry.register(languageSelector, quickFixProvider));
    };
    LanguagesMainImpl.prototype.provideCodeActions = function (handle, model, rangeOrSelection, context, token) {
        return __awaiter(this, void 0, void 0, function () {
            var actions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.proxy.$provideCodeActions(handle, model.uri, rangeOrSelection, __assign({}, context), token)];
                    case 1:
                        actions = _a.sent();
                        if (!actions) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, {
                                actions: actions.map(function (a) { return toMonacoAction(a); }),
                                dispose: function () {
                                    // TODO this.proxy.$releaseCodeActions(handle, cacheId);
                                }
                            }];
                }
            });
        });
    };
    LanguagesMainImpl.prototype.$registerRenameProvider = function (handle, pluginInfo, selector, supportsResolveLocation) {
        var languageSelector = this.toLanguageSelector(selector);
        var renameProvider = this.createRenameProvider(handle, supportsResolveLocation);
        this.register(handle, monaco.languages.registerRenameProvider(languageSelector, renameProvider));
    };
    LanguagesMainImpl.prototype.createRenameProvider = function (handle, supportsResolveLocation) {
        var _this = this;
        return {
            provideRenameEdits: function (model, position, newName, token) { return _this.provideRenameEdits(handle, model, position, newName, token); },
            resolveRenameLocation: supportsResolveLocation
                ? function (model, position, token) {
                    return _this.resolveRenameLocation(handle, model, position, token);
                }
                : undefined
        };
    };
    LanguagesMainImpl.prototype.provideRenameEdits = function (handle, model, position, newName, token) {
        return this.proxy.$provideRenameEdits(handle, model.uri, position, newName, token).then(toMonacoWorkspaceEdit);
    };
    LanguagesMainImpl.prototype.$registerCallHierarchyProvider = function (handle, selector) {
        var languageSelector = this.toLanguageSelector(selector);
        var callHierarchyService = this.createCallHierarchyService(handle, languageSelector);
        this.register(handle, this.callHierarchyServiceContributionRegistry.add(callHierarchyService));
    };
    LanguagesMainImpl.prototype.createCallHierarchyService = function (handle, language) {
        var _this = this;
        return {
            selector: language,
            getRootDefinition: function (uri, position, cancellationToken) {
                return _this.proxy.$provideRootDefinition(handle, callhierarchy_type_converters_1.toUriComponents(uri), callhierarchy_type_converters_1.fromPosition(position), cancellationToken)
                    .then(function (def) { return callhierarchy_type_converters_1.toDefinition(def); });
            },
            getCallers: function (definition, cancellationToken) { return _this.proxy.$provideCallers(handle, callhierarchy_type_converters_1.fromDefinition(definition), cancellationToken)
                .then(function (result) {
                var e_9, _a;
                if (!result) {
                    return undefined;
                }
                if (Array.isArray(result)) {
                    var callers = [];
                    try {
                        for (var result_7 = __values(result), result_7_1 = result_7.next(); !result_7_1.done; result_7_1 = result_7.next()) {
                            var item = result_7_1.value;
                            callers.push(callhierarchy_type_converters_1.toCaller(item));
                        }
                    }
                    catch (e_9_1) { e_9 = { error: e_9_1 }; }
                    finally {
                        try {
                            if (result_7_1 && !result_7_1.done && (_a = result_7.return)) _a.call(result_7);
                        }
                        finally { if (e_9) throw e_9.error; }
                    }
                    return callers;
                }
                return undefined;
            }); }
        };
    };
    LanguagesMainImpl.prototype.resolveRenameLocation = function (handle, model, position, token) {
        return this.proxy.$resolveRenameLocation(handle, model.uri, position, token);
    };
    // --- semantic tokens
    LanguagesMainImpl.prototype.$registerDocumentSemanticTokensProvider = function (handle, pluginInfo, selector, legend, eventHandle) {
        var languageSelector = this.toLanguageSelector(selector);
        var event = undefined;
        if (typeof eventHandle === 'number') {
            var emitter = new event_1.Emitter();
            this.register(eventHandle, emitter);
            event = emitter.event;
        }
        var provider = this.createDocumentSemanticTokensProvider(handle, legend, event);
        this.register(handle, monaco.languages.registerDocumentSemanticTokensProvider(languageSelector, provider));
    };
    LanguagesMainImpl.prototype.createDocumentSemanticTokensProvider = function (handle, legend, event) {
        var _this = this;
        return {
            releaseDocumentSemanticTokens: function (resultId) {
                if (resultId) {
                    _this.proxy.$releaseDocumentSemanticTokens(handle, parseInt(resultId, 10));
                }
            },
            getLegend: function () { return legend; },
            provideDocumentSemanticTokens: function (model, lastResultId, token) { return __awaiter(_this, void 0, void 0, function () {
                var nLastResultId, encodedDto, dto;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            nLastResultId = lastResultId ? parseInt(lastResultId, 10) : 0;
                            return [4 /*yield*/, this.proxy.$provideDocumentSemanticTokens(handle, model.uri, nLastResultId, token)];
                        case 1:
                            encodedDto = _a.sent();
                            if (!encodedDto) {
                                return [2 /*return*/, null];
                            }
                            if (token.isCancellationRequested) {
                                return [2 /*return*/, null];
                            }
                            dto = semantic_tokens_dto_1.decodeSemanticTokensDto(encodedDto);
                            if (dto.type === 'full') {
                                return [2 /*return*/, {
                                        resultId: String(dto.id),
                                        data: dto.data
                                    }];
                            }
                            return [2 /*return*/, {
                                    resultId: String(dto.id),
                                    edits: dto.deltas
                                }];
                    }
                });
            }); }
        };
    };
    LanguagesMainImpl.prototype.$emitDocumentSemanticTokensEvent = function (eventHandle) {
        var obj = this.services.get(eventHandle);
        if (obj instanceof event_1.Emitter) {
            obj.fire(undefined);
        }
    };
    LanguagesMainImpl.prototype.$registerDocumentRangeSemanticTokensProvider = function (handle, pluginInfo, selector, legend) {
        var languageSelector = this.toLanguageSelector(selector);
        var provider = this.createDocumentRangeSemanticTokensProvider(handle, legend);
        this.register(handle, monaco.languages.registerDocumentRangeSemanticTokensProvider(languageSelector, provider));
    };
    LanguagesMainImpl.prototype.createDocumentRangeSemanticTokensProvider = function (handle, legend) {
        var _this = this;
        return {
            getLegend: function () { return legend; },
            provideDocumentRangeSemanticTokens: function (model, range, token) { return __awaiter(_this, void 0, void 0, function () {
                var encodedDto, dto;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.proxy.$provideDocumentRangeSemanticTokens(handle, model.uri, range, token)];
                        case 1:
                            encodedDto = _a.sent();
                            if (!encodedDto) {
                                return [2 /*return*/, null];
                            }
                            if (token.isCancellationRequested) {
                                return [2 /*return*/, null];
                            }
                            dto = semantic_tokens_dto_1.decodeSemanticTokensDto(encodedDto);
                            if (dto.type === 'full') {
                                return [2 /*return*/, {
                                        resultId: String(dto.id),
                                        data: dto.data
                                    }];
                            }
                            throw new Error('Unexpected');
                    }
                });
            }); }
        };
    };
    // --- suggest
    LanguagesMainImpl.prototype.toLanguageSelector = function (filters) {
        return filters.map(function (filter) {
            var pattern;
            if (typeof filter.pattern === 'string') {
                pattern = filter.pattern;
            }
            else if (filter.pattern) {
                pattern = {
                    base: monaco.path.normalize(filter.pattern.base),
                    pattern: filter.pattern.pattern,
                    pathToRelative: paths_util_1.relative
                };
            }
            return {
                language: filter.language,
                scheme: filter.scheme,
                pattern: pattern
            };
        });
    };
    __decorate([
        inversify_1.inject(monaco_languages_1.MonacoLanguages),
        __metadata("design:type", monaco_languages_1.MonacoLanguages)
    ], LanguagesMainImpl.prototype, "monacoLanguages", void 0);
    __decorate([
        inversify_1.inject(browser_1.ProblemManager),
        __metadata("design:type", browser_1.ProblemManager)
    ], LanguagesMainImpl.prototype, "problemManager", void 0);
    __decorate([
        inversify_1.inject(browser_2.CallHierarchyServiceProvider),
        __metadata("design:type", browser_2.CallHierarchyServiceProvider)
    ], LanguagesMainImpl.prototype, "callHierarchyServiceContributionRegistry", void 0);
    LanguagesMainImpl = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(rpc_protocol_1.RPCProtocol)),
        __metadata("design:paramtypes", [Object])
    ], LanguagesMainImpl);
    return LanguagesMainImpl;
}());
exports.LanguagesMainImpl = LanguagesMainImpl;
function reviveMarker(marker) {
    var monacoMarker = {
        code: marker.code,
        severity: reviveSeverity(marker.severity),
        range: reviveRange(marker.startLineNumber, marker.startColumn, marker.endLineNumber, marker.endColumn),
        message: marker.message,
        source: marker.source,
        relatedInformation: undefined
    };
    if (marker.relatedInformation) {
        monacoMarker.relatedInformation = marker.relatedInformation.map(reviveRelated);
    }
    return monacoMarker;
}
function reviveSeverity(severity) {
    switch (severity) {
        case plugin_api_rpc_model_1.MarkerSeverity.Error: return vst.DiagnosticSeverity.Error;
        case plugin_api_rpc_model_1.MarkerSeverity.Warning: return vst.DiagnosticSeverity.Warning;
        case plugin_api_rpc_model_1.MarkerSeverity.Info: return vst.DiagnosticSeverity.Information;
        case plugin_api_rpc_model_1.MarkerSeverity.Hint: return vst.DiagnosticSeverity.Hint;
    }
}
function reviveRange(startLine, startColumn, endLine, endColumn) {
    // note: language server range is 0-based, marker is 1-based, so need to deduct 1 here
    return {
        start: {
            line: startLine - 1,
            character: startColumn - 1
        },
        end: {
            line: endLine - 1,
            character: endColumn - 1
        }
    };
}
function reviveRelated(related) {
    return {
        message: related.message,
        location: {
            uri: related.resource,
            range: reviveRange(related.startLineNumber, related.startColumn, related.endLineNumber, related.endColumn)
        }
    };
}
function reviveRegExp(regExp) {
    if (typeof regExp === 'undefined' || regExp === null) {
        return undefined;
    }
    return new RegExp(regExp.pattern, regExp.flags);
}
function reviveIndentationRule(indentationRule) {
    if (typeof indentationRule === 'undefined' || indentationRule === null) {
        return undefined;
    }
    return {
        increaseIndentPattern: reviveRegExp(indentationRule.increaseIndentPattern),
        decreaseIndentPattern: reviveRegExp(indentationRule.decreaseIndentPattern),
        indentNextLinePattern: reviveRegExp(indentationRule.indentNextLinePattern),
        unIndentedLinePattern: reviveRegExp(indentationRule.unIndentedLinePattern),
    };
}
function reviveOnEnterRule(onEnterRule) {
    return {
        beforeText: reviveRegExp(onEnterRule.beforeText),
        afterText: reviveRegExp(onEnterRule.afterText),
        action: onEnterRule.action
    };
}
function reviveOnEnterRules(onEnterRules) {
    if (typeof onEnterRules === 'undefined' || onEnterRules === null) {
        return undefined;
    }
    return onEnterRules.map(reviveOnEnterRule);
}
function toMonacoAction(action) {
    return __assign(__assign({}, action), { diagnostics: action.diagnostics ? action.diagnostics.map(function (m) { return toMonacoMarkerData(m); }) : undefined, edit: action.edit ? toMonacoWorkspaceEdit(action.edit) : undefined });
}
function toMonacoMarkerData(marker) {
    return __assign(__assign({}, marker), { relatedInformation: marker.relatedInformation
            ? marker.relatedInformation.map(function (i) { return toMonacoRelatedInformation(i); })
            : undefined });
}
function toMonacoRelatedInformation(relatedInfo) {
    return __assign(__assign({}, relatedInfo), { resource: monaco.Uri.parse(relatedInfo.resource) });
}
function toMonacoWorkspaceEdit(data) {
    return {
        edits: (data && data.edits || []).map(function (edit) {
            if (plugin_api_rpc_1.WorkspaceTextEditDto.is(edit)) {
                return {
                    resource: monaco.Uri.revive(edit.resource),
                    edit: edit.edit, metadata: edit.metadata
                };
            }
            else {
                return {
                    newUri: monaco.Uri.revive(edit.newUri), oldUri: monaco.Uri.revive(edit.oldUri),
                    options: edit.options, metadata: edit.metadata
                };
            }
        })
    };
}
exports.toMonacoWorkspaceEdit = toMonacoWorkspaceEdit;
//# sourceMappingURL=languages-main.js.map