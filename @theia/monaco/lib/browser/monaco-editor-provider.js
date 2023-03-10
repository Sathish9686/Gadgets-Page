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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonacoEditorProvider = exports.MonacoEditorFactory = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var uri_1 = require("@theia/core/lib/common/uri");
var browser_1 = require("@theia/editor/lib/browser");
var diff_uris_1 = require("@theia/core/lib/browser/diff-uris");
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var vscode_languageserver_protocol_1 = require("vscode-languageserver-protocol");
var monaco_command_service_1 = require("./monaco-command-service");
var monaco_context_menu_1 = require("./monaco-context-menu");
var monaco_diff_editor_1 = require("./monaco-diff-editor");
var monaco_diff_navigator_factory_1 = require("./monaco-diff-navigator-factory");
var monaco_editor_1 = require("./monaco-editor");
var monaco_editor_model_1 = require("./monaco-editor-model");
var monaco_editor_service_1 = require("./monaco-editor-service");
var monaco_quick_open_service_1 = require("./monaco-quick-open-service");
var monaco_text_model_service_1 = require("./monaco-text-model-service");
var monaco_workspace_1 = require("./monaco-workspace");
var monaco_bulk_edit_service_1 = require("./monaco-bulk-edit-service");
var application_protocol_1 = require("@theia/core/lib/common/application-protocol");
var core_1 = require("@theia/core");
var browser_2 = require("@theia/core/lib/browser");
var monaco_resolved_keybinding_1 = require("./monaco-resolved-keybinding");
var monaco_to_protocol_converter_1 = require("./monaco-to-protocol-converter");
var protocol_to_monaco_converter_1 = require("./protocol-to-monaco-converter");
var browser_3 = require("@theia/filesystem/lib/browser");
exports.MonacoEditorFactory = Symbol('MonacoEditorFactory');
var MonacoEditorProvider = /** @class */ (function () {
    function MonacoEditorProvider(codeEditorService, textModelService, contextMenuService, m2p, p2m, workspace, commandServiceFactory, editorPreferences, quickOpenService, diffNavigatorFactory, 
    /** @deprecated since 1.6.0 */
    applicationServer, contextKeyService) {
        this.codeEditorService = codeEditorService;
        this.textModelService = textModelService;
        this.contextMenuService = contextMenuService;
        this.m2p = m2p;
        this.p2m = p2m;
        this.workspace = workspace;
        this.commandServiceFactory = commandServiceFactory;
        this.editorPreferences = editorPreferences;
        this.quickOpenService = quickOpenService;
        this.diffNavigatorFactory = diffNavigatorFactory;
        this.applicationServer = applicationServer;
        this.contextKeyService = contextKeyService;
        var staticServices = monaco.services.StaticServices;
        var init = staticServices.init.bind(monaco.services.StaticServices);
        var themeService = staticServices.standaloneThemeService.get();
        var originalGetTheme = themeService.getTheme.bind(themeService);
        var patchedGetTokenStyleMetadataFlag = '__patched_getTokenStyleMetadata';
        // based on https://github.com/microsoft/vscode/commit/4731a227e377da8cb14ed5697dd1ba8faea40538
        // TODO remove after migrating to monaco 0.21
        themeService.getTheme = function () {
            var theme = originalGetTheme();
            if (!(patchedGetTokenStyleMetadataFlag in theme)) {
                Object.defineProperty(theme, patchedGetTokenStyleMetadataFlag, { enumerable: false, configurable: false, writable: false, value: true });
                theme.getTokenStyleMetadata = function (type, modifiers) {
                    // use theme rules match
                    var style = theme.tokenTheme._match([type].concat(modifiers).join('.'));
                    var metadata = style.metadata;
                    var foreground = monaco.modes.TokenMetadata.getForeground(metadata);
                    var fontStyle = monaco.modes.TokenMetadata.getFontStyle(metadata);
                    return {
                        foreground: foreground,
                        italic: Boolean(fontStyle & 1 /* Italic */),
                        bold: Boolean(fontStyle & 2 /* Bold */),
                        underline: Boolean(fontStyle & 4 /* Underline */)
                    };
                };
            }
            return theme;
        };
        monaco.services.StaticServices.init = function (o) {
            var result = init(o);
            result[0].set(monaco.services.ICodeEditorService, codeEditorService);
            return result;
        };
    }
    MonacoEditorProvider_1 = MonacoEditorProvider;
    Object.defineProperty(MonacoEditorProvider.prototype, "current", {
        /**
         * Returns the last focused MonacoEditor.
         * It takes into account inline editors as well.
         * If you are interested only in standalone editors then use `MonacoEditor.getCurrent(EditorManager)`
         */
        get: function () {
            return this._current;
        },
        enumerable: false,
        configurable: true
    });
    MonacoEditorProvider.prototype.getModel = function (uri, toDispose) {
        return __awaiter(this, void 0, void 0, function () {
            var reference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.textModelService.createModelReference(uri)];
                    case 1:
                        reference = _a.sent();
                        if (!!reference.object.valid) return [3 /*break*/, 3];
                        return [4 /*yield*/, reference.object.sync()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!reference.object.valid) {
                            reference.dispose();
                            throw Object.assign(new Error("'" + uri.toString() + "' is invalid"), { code: 'MODEL_IS_INVALID' });
                        }
                        toDispose.push(reference);
                        return [2 /*return*/, reference.object];
                }
            });
        });
    };
    MonacoEditorProvider.prototype.get = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.editorPreferences.ready];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.doCreateEditor(uri, function (override, toDispose) { return _this.createEditor(uri, override, toDispose); })];
                }
            });
        });
    };
    MonacoEditorProvider.prototype.doCreateEditor = function (uri, factory) {
        return __awaiter(this, void 0, void 0, function () {
            var commandService, contextKeyService, _a, codeEditorService, textModelService, contextMenuService, IWorkspaceEditService, toDispose, openerService, editor, standaloneCommandService;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        commandService = this.commandServiceFactory();
                        contextKeyService = this.contextKeyService.createScoped();
                        _a = this, codeEditorService = _a.codeEditorService, textModelService = _a.textModelService, contextMenuService = _a.contextMenuService;
                        IWorkspaceEditService = this.bulkEditService;
                        toDispose = new common_1.DisposableCollection(commandService);
                        openerService = new monaco.services.OpenerService(codeEditorService, commandService);
                        openerService.registerOpener({
                            open: function (u, options) { return _this.interceptOpen(u, options); }
                        });
                        return [4 /*yield*/, factory({
                                codeEditorService: codeEditorService,
                                textModelService: textModelService,
                                contextMenuService: contextMenuService,
                                commandService: commandService,
                                IWorkspaceEditService: IWorkspaceEditService,
                                contextKeyService: contextKeyService,
                                openerService: openerService
                            }, toDispose)];
                    case 1:
                        editor = _b.sent();
                        editor.onDispose(function () { return toDispose.dispose(); });
                        this.suppressMonacoKeybindingListener(editor);
                        this.injectKeybindingResolver(editor);
                        standaloneCommandService = new monaco.services.StandaloneCommandService(editor.instantiationService);
                        commandService.setDelegate(standaloneCommandService);
                        toDispose.push(this.installQuickOpenService(editor));
                        toDispose.push(this.installReferencesController(editor));
                        toDispose.push(editor.onFocusChanged(function (focused) {
                            if (focused) {
                                _this._current = editor;
                            }
                        }));
                        toDispose.push(common_1.Disposable.create(function () {
                            if (_this._current === editor) {
                                _this._current = undefined;
                            }
                        }));
                        return [2 /*return*/, editor];
                }
            });
        });
    };
    /**
     * Intercept internal Monaco open calls and delegate to OpenerService.
     */
    MonacoEditorProvider.prototype.interceptOpen = function (monacoUri, monacoOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var options, uri, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = undefined;
                        if (monacoOptions) {
                            if ('openToSide' in monacoOptions && monacoOptions.openToSide) {
                                options = Object.assign(options || {}, {
                                    widgetOptions: {
                                        mode: 'split-right'
                                    }
                                });
                            }
                            if ('openExternal' in monacoOptions && monacoOptions.openExternal) {
                                options = Object.assign(options || {}, {
                                    openExternal: true
                                });
                            }
                        }
                        uri = new uri_1.default(monacoUri.toString());
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, browser_2.open(this.openerService, uri, options)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        e_1 = _a.sent();
                        console.error("Fail to open '" + uri.toString() + "':", e_1);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Suppresses Monaco keydown listener to avoid triggering default Monaco keybindings
     * if they are overridden by a user. Monaco keybindings should be registered as Theia keybindings
     * to allow a user to customize them.
     */
    MonacoEditorProvider.prototype.suppressMonacoKeybindingListener = function (editor) {
        var e_2, _a;
        var keydownListener;
        var keybindingService = editor.getControl()._standaloneKeybindingService;
        try {
            for (var _b = __values(keybindingService._store._toDispose), _c = _b.next(); !_c.done; _c = _b.next()) {
                var listener = _c.value;
                if ('_type' in listener && listener['_type'] === 'keydown') {
                    keydownListener = listener;
                    break;
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
        if (keydownListener) {
            keydownListener.dispose();
        }
    };
    MonacoEditorProvider.prototype.injectKeybindingResolver = function (editor) {
        var _this = this;
        var keybindingService = editor.getControl()._standaloneKeybindingService;
        keybindingService.resolveKeybinding = function (keybinding) { return [new monaco_resolved_keybinding_1.MonacoResolvedKeybinding(monaco_resolved_keybinding_1.MonacoResolvedKeybinding.keySequence(keybinding), _this.keybindingRegistry)]; };
        keybindingService.resolveKeyboardEvent = function (keyboardEvent) {
            var keybinding = new monaco.keybindings.SimpleKeybinding(keyboardEvent.ctrlKey, keyboardEvent.shiftKey, keyboardEvent.altKey, keyboardEvent.metaKey, keyboardEvent.keyCode).toChord();
            return new monaco_resolved_keybinding_1.MonacoResolvedKeybinding(monaco_resolved_keybinding_1.MonacoResolvedKeybinding.keySequence(keybinding), _this.keybindingRegistry);
        };
    };
    MonacoEditorProvider.prototype.createEditor = function (uri, override, toDispose) {
        if (diff_uris_1.DiffUris.isDiffUri(uri)) {
            return this.createMonacoDiffEditor(uri, override, toDispose);
        }
        return this.createMonacoEditor(uri, override, toDispose);
    };
    Object.defineProperty(MonacoEditorProvider.prototype, "preferencePrefixes", {
        get: function () {
            return ['editor.'];
        },
        enumerable: false,
        configurable: true
    });
    MonacoEditorProvider.prototype.createMonacoEditor = function (uri, override, toDispose) {
        return __awaiter(this, void 0, void 0, function () {
            var model, options, factory, editor;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getModel(uri, toDispose)];
                    case 1:
                        model = _a.sent();
                        options = this.createMonacoEditorOptions(model);
                        factory = this.factories.getContributions().find(function (_a) {
                            var scheme = _a.scheme;
                            return uri.scheme === scheme;
                        });
                        editor = factory
                            ? factory.create(model, options, override)
                            : new monaco_editor_1.MonacoEditor(uri, model, document.createElement('div'), this.services, options, override);
                        toDispose.push(this.editorPreferences.onPreferenceChanged(function (event) {
                            if (event.affects(uri.toString(), model.languageId)) {
                                _this.updateMonacoEditorOptions(editor, event);
                            }
                        }));
                        toDispose.push(editor.onLanguageChanged(function () { return _this.updateMonacoEditorOptions(editor); }));
                        editor.document.onWillSaveModel(function (event) { return event.waitUntil(_this.formatOnSave(editor, event)); });
                        return [2 /*return*/, editor];
                }
            });
        });
    };
    MonacoEditorProvider.prototype.createMonacoEditorOptions = function (model) {
        var options = this.createOptions(this.preferencePrefixes, model.uri, model.languageId);
        options.model = model.textEditorModel;
        options.readOnly = model.readOnly;
        options.lineNumbersMinChars = model.lineNumbersMinChars;
        return options;
    };
    MonacoEditorProvider.prototype.updateMonacoEditorOptions = function (editor, event) {
        if (event) {
            var preferenceName = event.preferenceName;
            var overrideIdentifier = editor.document.languageId;
            var newValue = this.editorPreferences.get({ preferenceName: preferenceName, overrideIdentifier: overrideIdentifier }, undefined, editor.uri.toString());
            editor.getControl().updateOptions(this.setOption(preferenceName, newValue, this.preferencePrefixes));
        }
        else {
            var options = this.createMonacoEditorOptions(editor.document);
            delete options.model;
            editor.getControl().updateOptions(options);
        }
    };
    MonacoEditorProvider.prototype.shouldFormat = function (editor, event) {
        var _a;
        if (event.reason !== vscode_languageserver_protocol_1.TextDocumentSaveReason.Manual) {
            return false;
        }
        if ((_a = event.options) === null || _a === void 0 ? void 0 : _a.formatType) {
            switch (event.options.formatType) {
                case 1 /* ON */: return true;
                case 2 /* OFF */: return false;
                case 3 /* DIRTY */: return editor.document.dirty;
            }
        }
        return true;
    };
    MonacoEditorProvider.prototype.formatOnSave = function (editor, event) {
        return __awaiter(this, void 0, void 0, function () {
            var overrideIdentifier, uri, formatOnSave, formatOnSaveTimeout_1, shouldRemoveWhiteSpace;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.shouldFormat(editor, event)) {
                            return [2 /*return*/, []];
                        }
                        overrideIdentifier = editor.document.languageId;
                        uri = editor.uri.toString();
                        formatOnSave = this.editorPreferences.get({ preferenceName: 'editor.formatOnSave', overrideIdentifier: overrideIdentifier }, undefined, uri);
                        if (!formatOnSave) return [3 /*break*/, 2];
                        formatOnSaveTimeout_1 = this.editorPreferences.get({ preferenceName: 'editor.formatOnSaveTimeout', overrideIdentifier: overrideIdentifier }, undefined, uri);
                        return [4 /*yield*/, Promise.race([
                                new Promise(function (_, reject) { return setTimeout(function () { return reject(new Error("Aborted format on save after " + formatOnSaveTimeout_1 + "ms")); }, formatOnSaveTimeout_1); }),
                                editor.runAction('editor.action.formatDocument')
                            ])];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        shouldRemoveWhiteSpace = this.filePreferences.get({ preferenceName: 'files.trimTrailingWhitespace', overrideIdentifier: overrideIdentifier }, undefined, uri);
                        if (!shouldRemoveWhiteSpace) return [3 /*break*/, 4];
                        return [4 /*yield*/, editor.runAction('editor.action.trimTrailingWhitespace')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, []];
                }
            });
        });
    };
    Object.defineProperty(MonacoEditorProvider.prototype, "diffPreferencePrefixes", {
        get: function () {
            return __spread(this.preferencePrefixes, ['diffEditor.']);
        },
        enumerable: false,
        configurable: true
    });
    MonacoEditorProvider.prototype.createMonacoDiffEditor = function (uri, override, toDispose) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, original, modified, _b, originalModel, modifiedModel, options, editor;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = __read(diff_uris_1.DiffUris.decode(uri), 2), original = _a[0], modified = _a[1];
                        return [4 /*yield*/, Promise.all([this.getModel(original, toDispose), this.getModel(modified, toDispose)])];
                    case 1:
                        _b = __read.apply(void 0, [_c.sent(), 2]), originalModel = _b[0], modifiedModel = _b[1];
                        options = this.createMonacoDiffEditorOptions(originalModel, modifiedModel);
                        editor = new monaco_diff_editor_1.MonacoDiffEditor(uri, document.createElement('div'), originalModel, modifiedModel, this.services, this.diffNavigatorFactory, options, override);
                        toDispose.push(this.editorPreferences.onPreferenceChanged(function (event) {
                            var originalFileUri = original.withoutQuery().withScheme('file').toString();
                            if (event.affects(originalFileUri, editor.document.languageId)) {
                                _this.updateMonacoDiffEditorOptions(editor, event, originalFileUri);
                            }
                        }));
                        toDispose.push(editor.onLanguageChanged(function () { return _this.updateMonacoDiffEditorOptions(editor); }));
                        return [2 /*return*/, editor];
                }
            });
        });
    };
    MonacoEditorProvider.prototype.createMonacoDiffEditorOptions = function (original, modified) {
        var options = this.createOptions(this.diffPreferencePrefixes, modified.uri, modified.languageId);
        options.originalEditable = !original.readOnly;
        options.readOnly = modified.readOnly;
        return options;
    };
    MonacoEditorProvider.prototype.updateMonacoDiffEditorOptions = function (editor, event, resourceUri) {
        if (event) {
            var preferenceName = event.preferenceName;
            var overrideIdentifier = editor.document.languageId;
            var newValue = this.editorPreferences.get({ preferenceName: preferenceName, overrideIdentifier: overrideIdentifier }, undefined, resourceUri);
            editor.diffEditor.updateOptions(this.setOption(preferenceName, newValue, this.diffPreferencePrefixes));
        }
        else {
            var options = this.createMonacoDiffEditorOptions(editor.originalModel, editor.modifiedModel);
            editor.diffEditor.updateOptions(options);
        }
    };
    MonacoEditorProvider.prototype.createOptions = function (prefixes, uri, overrideIdentifier) {
        var _this = this;
        return Object.keys(this.editorPreferences).reduce(function (options, preferenceName) {
            var value = _this.editorPreferences.get({ preferenceName: preferenceName, overrideIdentifier: overrideIdentifier }, undefined, uri);
            return _this.setOption(preferenceName, common_1.deepClone(value), prefixes, options);
        }, {});
    };
    MonacoEditorProvider.prototype.setOption = function (preferenceName, value, prefixes, options) {
        if (options === void 0) { options = {}; }
        var optionName = this.toOptionName(preferenceName, prefixes);
        this.doSetOption(options, value, optionName.split('.'));
        return options;
    };
    MonacoEditorProvider.prototype.toOptionName = function (preferenceName, prefixes) {
        var e_3, _a;
        try {
            for (var prefixes_1 = __values(prefixes), prefixes_1_1 = prefixes_1.next(); !prefixes_1_1.done; prefixes_1_1 = prefixes_1.next()) {
                var prefix = prefixes_1_1.value;
                if (preferenceName.startsWith(prefix)) {
                    return preferenceName.substr(prefix.length);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (prefixes_1_1 && !prefixes_1_1.done && (_a = prefixes_1.return)) _a.call(prefixes_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return preferenceName;
    };
    MonacoEditorProvider.prototype.doSetOption = function (obj, value, names, idx) {
        if (idx === void 0) { idx = 0; }
        var name = names[idx];
        if (!obj[name]) {
            if (names.length > (idx + 1)) {
                obj[name] = {};
                this.doSetOption(obj[name], value, names, (idx + 1));
            }
            else {
                obj[name] = value;
            }
        }
    };
    MonacoEditorProvider.prototype.installQuickOpenService = function (editor) {
        var _this = this;
        var control = editor.getControl();
        var quickOpenController = control._contributions['editor.controller.quickOpenController'];
        var originalRun = quickOpenController.run;
        var toDispose = new common_1.DisposableCollection();
        quickOpenController.dispose = function () { return toDispose.dispose(); };
        quickOpenController.run = function (options) {
            var toDisposeOnClose = toDispose.push(common_1.Disposable.create(function () { return _this.quickOpenService.hide(); }));
            var selection = control.getSelection();
            _this.quickOpenService.internalOpen(__assign(__assign({}, options), { onClose: function (canceled) {
                    toDisposeOnClose.dispose();
                    quickOpenController.clearDecorations();
                    // Restore selection if canceled
                    if (canceled && selection) {
                        control.setSelection(selection);
                        control.revealRangeInCenterIfOutsideViewport(selection);
                    }
                    // Return focus to the editor if
                    // - focus is back on the <body> element because no other focusable element was clicked
                    // - a command was picked from the picker which indicates the editor should get focused
                    if (document.activeElement === document.body || !canceled) {
                        editor.focus();
                    }
                } }));
        };
        return common_1.Disposable.create(function () { return quickOpenController.run = originalRun; });
    };
    MonacoEditorProvider.prototype.installReferencesController = function (editor) {
        var _this = this;
        var control = editor.getControl();
        var referencesController = control._contributions['editor.contrib.referencesController'];
        var originalGotoReference = referencesController._gotoReference;
        referencesController._gotoReference = function (ref) { return __awaiter(_this, void 0, void 0, function () {
            var range, model;
            return __generator(this, function (_a) {
                if (referencesController._widget) {
                    referencesController._widget.hide();
                }
                referencesController._ignoreModelChangeEvent = true;
                range = monaco.Range.lift(ref.range).collapseToStart();
                model = referencesController._model;
                referencesController._model = undefined;
                referencesController._editorService.openCodeEditor({
                    resource: ref.uri,
                    options: { selection: range }
                }, control).then(function (openedEditor) {
                    referencesController._model = model;
                    referencesController._ignoreModelChangeEvent = false;
                    if (!openedEditor) {
                        referencesController.closeWidget();
                        return;
                    }
                    if (openedEditor !== control) {
                        // preserve the model that it does not get disposed in `referencesController.closeWidget`
                        referencesController._model = undefined;
                        // to preserve the active editor
                        var focus_1 = control.focus;
                        control.focus = function () { };
                        referencesController.closeWidget();
                        control.focus = focus_1;
                        var modelPromise = Promise.resolve(model);
                        modelPromise.cancel = function () { };
                        openedEditor._contributions['editor.contrib.referencesController'].toggleWidget(range, modelPromise, true);
                        return;
                    }
                    if (referencesController._widget) {
                        referencesController._widget.show(range);
                        referencesController._widget.focusOnReferenceTree();
                    }
                }, function (e) {
                    referencesController._ignoreModelChangeEvent = false;
                    monaco.error.onUnexpectedError(e);
                });
                return [2 /*return*/];
            });
        }); };
        return common_1.Disposable.create(function () { return referencesController._gotoReference = originalGotoReference; });
    };
    MonacoEditorProvider.prototype.getDiffNavigator = function (editor) {
        if (editor instanceof monaco_diff_editor_1.MonacoDiffEditor) {
            return editor.diffNavigator;
        }
        return monaco_diff_navigator_factory_1.MonacoDiffNavigatorFactory.nullNavigator;
    };
    MonacoEditorProvider.prototype.createInline = function (uri, node, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.doCreateEditor(uri, function (override, toDispose) { return __awaiter(_this, void 0, void 0, function () {
                        var document, model;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    override.contextMenuService = {
                                        showContextMenu: function () { }
                                    };
                                    document = new monaco_editor_model_1.MonacoEditorModel({
                                        uri: uri,
                                        readContents: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                            return [2 /*return*/, ''];
                                        }); }); },
                                        dispose: function () { }
                                    }, this.m2p, this.p2m);
                                    toDispose.push(document);
                                    return [4 /*yield*/, document.load()];
                                case 1:
                                    model = (_a.sent()).textEditorModel;
                                    return [2 /*return*/, new monaco_editor_1.MonacoEditor(uri, document, node, this.services, Object.assign({
                                            model: model,
                                            isSimpleWidget: true,
                                            autoSizing: false,
                                            minHeight: 1,
                                            maxHeight: 1
                                        }, MonacoEditorProvider_1.inlineOptions, options), override)];
                            }
                        });
                    }); })];
            });
        });
    };
    var MonacoEditorProvider_1;
    MonacoEditorProvider.inlineOptions = {
        wordWrap: 'on',
        overviewRulerLanes: 0,
        glyphMargin: false,
        lineNumbers: 'off',
        folding: false,
        selectOnLineNumbers: false,
        hideCursorInOverviewRuler: true,
        selectionHighlight: false,
        scrollbar: {
            horizontal: 'hidden'
        },
        lineDecorationsWidth: 0,
        overviewRulerBorder: false,
        scrollBeyondLastLine: false,
        renderLineHighlight: 'none',
        fixedOverflowWidgets: true,
        acceptSuggestionOnEnter: 'smart',
        minimap: {
            enabled: false
        }
    };
    __decorate([
        inversify_1.inject(core_1.ContributionProvider),
        inversify_1.named(exports.MonacoEditorFactory),
        __metadata("design:type", Object)
    ], MonacoEditorProvider.prototype, "factories", void 0);
    __decorate([
        inversify_1.inject(monaco_bulk_edit_service_1.MonacoBulkEditService),
        __metadata("design:type", monaco_bulk_edit_service_1.MonacoBulkEditService)
    ], MonacoEditorProvider.prototype, "bulkEditService", void 0);
    __decorate([
        inversify_1.inject(monaco_editor_1.MonacoEditorServices),
        __metadata("design:type", monaco_editor_1.MonacoEditorServices)
    ], MonacoEditorProvider.prototype, "services", void 0);
    __decorate([
        inversify_1.inject(browser_2.KeybindingRegistry),
        __metadata("design:type", browser_2.KeybindingRegistry)
    ], MonacoEditorProvider.prototype, "keybindingRegistry", void 0);
    __decorate([
        inversify_1.inject(browser_2.OpenerService),
        __metadata("design:type", Object)
    ], MonacoEditorProvider.prototype, "openerService", void 0);
    __decorate([
        inversify_1.inject(browser_3.FileSystemPreferences),
        __metadata("design:type", Object)
    ], MonacoEditorProvider.prototype, "filePreferences", void 0);
    MonacoEditorProvider = MonacoEditorProvider_1 = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(monaco_editor_service_1.MonacoEditorService)),
        __param(1, inversify_1.inject(monaco_text_model_service_1.MonacoTextModelService)),
        __param(2, inversify_1.inject(monaco_context_menu_1.MonacoContextMenuService)),
        __param(3, inversify_1.inject(monaco_to_protocol_converter_1.MonacoToProtocolConverter)),
        __param(4, inversify_1.inject(protocol_to_monaco_converter_1.ProtocolToMonacoConverter)),
        __param(5, inversify_1.inject(monaco_workspace_1.MonacoWorkspace)),
        __param(6, inversify_1.inject(monaco_command_service_1.MonacoCommandServiceFactory)),
        __param(7, inversify_1.inject(browser_1.EditorPreferences)),
        __param(8, inversify_1.inject(monaco_quick_open_service_1.MonacoQuickOpenService)),
        __param(9, inversify_1.inject(monaco_diff_navigator_factory_1.MonacoDiffNavigatorFactory)),
        __param(10, inversify_1.inject(application_protocol_1.ApplicationServer)),
        __param(11, inversify_1.inject(monaco.contextKeyService.ContextKeyService)),
        __metadata("design:paramtypes", [monaco_editor_service_1.MonacoEditorService,
            monaco_text_model_service_1.MonacoTextModelService,
            monaco_context_menu_1.MonacoContextMenuService,
            monaco_to_protocol_converter_1.MonacoToProtocolConverter,
            protocol_to_monaco_converter_1.ProtocolToMonacoConverter,
            monaco_workspace_1.MonacoWorkspace, Function, Object, monaco_quick_open_service_1.MonacoQuickOpenService,
            monaco_diff_navigator_factory_1.MonacoDiffNavigatorFactory, Object, monaco.contextKeyService.ContextKeyService])
    ], MonacoEditorProvider);
    return MonacoEditorProvider;
}());
exports.MonacoEditorProvider = MonacoEditorProvider;
//# sourceMappingURL=monaco-editor-provider.js.map