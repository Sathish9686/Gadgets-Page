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
exports.PluginContributionHandler = void 0;
var inversify_1 = require("inversify");
var textmate_1 = require("@theia/monaco/lib/browser/textmate");
var menus_contribution_handler_1 = require("./menus/menus-contribution-handler");
var plugin_view_registry_1 = require("./view/plugin-view-registry");
var plugin_custom_editor_registry_1 = require("./custom-editors/plugin-custom-editor-registry");
var browser_1 = require("@theia/core/lib/browser");
var keybindings_contribution_handler_1 = require("./keybindings/keybindings-contribution-handler");
var monaco_snippet_suggest_provider_1 = require("@theia/monaco/lib/browser/monaco-snippet-suggest-provider");
var plugin_shared_style_1 = require("./plugin-shared-style");
var command_1 = require("@theia/core/lib/common/command");
var disposable_1 = require("@theia/core/lib/common/disposable");
var event_1 = require("@theia/core/lib/common/event");
var browser_2 = require("@theia/task/lib/browser");
var plugin_debug_service_1 = require("./debug/plugin-debug-service");
var debug_schema_updater_1 = require("@theia/debug/lib/browser/debug-schema-updater");
var monaco_theming_service_1 = require("@theia/monaco/lib/browser/monaco-theming-service");
var color_registry_1 = require("@theia/core/lib/browser/color-registry");
var plugin_icon_theme_service_1 = require("./plugin-icon-theme-service");
var common_1 = require("@theia/core/lib/common");
var PluginContributionHandler = /** @class */ (function () {
    function PluginContributionHandler() {
        this.injections = new Map();
        this.commandHandlers = new Map();
        this.onDidRegisterCommandHandlerEmitter = new event_1.Emitter();
        this.onDidRegisterCommandHandler = this.onDidRegisterCommandHandlerEmitter.event;
    }
    /**
     * Always synchronous in order to simplify handling disconnections.
     * @throws never, loading of each contribution should handle errors
     * in order to avoid preventing loading of other contributions or extensions
     */
    PluginContributionHandler.prototype.handleContributions = function (clientId, plugin) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f, e_7, _g, e_8, _h, e_9, _j, e_10, _k, e_11, _l, e_12, _m, e_13, _o;
        var _this = this;
        var contributions = plugin.contributes;
        if (!contributions) {
            return disposable_1.Disposable.NULL;
        }
        var toDispose = new disposable_1.DisposableCollection(disposable_1.Disposable.create(function () { }));
        /* eslint-disable @typescript-eslint/no-explicit-any */
        var logError = function (message) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return console.error.apply(console, __spread(["[" + clientId + "][" + plugin.metadata.model.id + "]: " + message], args));
        };
        var logWarning = function (message) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return console.warn.apply(console, __spread(["[" + clientId + "][" + plugin.metadata.model.id + "]: " + message], args));
        };
        var pushContribution = function (id, contribute) {
            if (toDispose.disposed) {
                return;
            }
            try {
                toDispose.push(contribute());
            }
            catch (e) {
                logError("Failed to load '" + id + "' contribution.", e);
            }
        };
        var configuration = contributions.configuration;
        if (configuration) {
            var _loop_1 = function (config) {
                pushContribution('configuration', function () { return _this.preferenceSchemaProvider.setSchema(config); });
            };
            try {
                for (var configuration_1 = __values(configuration), configuration_1_1 = configuration_1.next(); !configuration_1_1.done; configuration_1_1 = configuration_1.next()) {
                    var config = configuration_1_1.value;
                    _loop_1(config);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (configuration_1_1 && !configuration_1_1.done && (_a = configuration_1.return)) _a.call(configuration_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        var configurationDefaults = contributions.configurationDefaults;
        if (configurationDefaults) {
            pushContribution('configurationDefaults', function () { return _this.updateDefaultOverridesSchema(configurationDefaults); });
        }
        var languages = contributions.languages;
        if (languages && languages.length) {
            var _loop_2 = function (lang) {
                // it is not possible to unregister a language
                monaco.languages.register({
                    id: lang.id,
                    aliases: lang.aliases,
                    extensions: lang.extensions,
                    filenamePatterns: lang.filenamePatterns,
                    filenames: lang.filenames,
                    firstLine: lang.firstLine,
                    mimetypes: lang.mimetypes
                });
                var langConfiguration = lang.configuration;
                if (langConfiguration) {
                    pushContribution("language." + lang.id + ".configuration", function () { return monaco.languages.setLanguageConfiguration(lang.id, {
                        wordPattern: _this.createRegex(langConfiguration.wordPattern),
                        autoClosingPairs: langConfiguration.autoClosingPairs,
                        brackets: langConfiguration.brackets,
                        comments: langConfiguration.comments,
                        folding: _this.convertFolding(langConfiguration.folding),
                        surroundingPairs: langConfiguration.surroundingPairs,
                        indentationRules: _this.convertIndentationRules(langConfiguration.indentationRules)
                    }); });
                }
            };
            try {
                for (var languages_1 = __values(languages), languages_1_1 = languages_1.next(); !languages_1_1.done; languages_1_1 = languages_1.next()) {
                    var lang = languages_1_1.value;
                    _loop_2(lang);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (languages_1_1 && !languages_1_1.done && (_b = languages_1.return)) _b.call(languages_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        var grammars = contributions.grammars;
        if (grammars && grammars.length) {
            var grammarsWithLanguage_1 = [];
            var _loop_3 = function (grammar) {
                var e_14, _a;
                if (grammar.injectTo) {
                    var _loop_16 = function (injectScope) {
                        pushContribution("grammar.injectTo." + injectScope, function () {
                            var injections = _this.injections.get(injectScope) || [];
                            injections.push(grammar.scope);
                            _this.injections.set(injectScope, injections);
                            return disposable_1.Disposable.create(function () {
                                var index = injections.indexOf(grammar.scope);
                                if (index !== -1) {
                                    injections.splice(index, 1);
                                }
                            });
                        });
                    };
                    try {
                        for (var _b = (e_14 = void 0, __values(grammar.injectTo)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var injectScope = _c.value;
                            _loop_16(injectScope);
                        }
                    }
                    catch (e_14_1) { e_14 = { error: e_14_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_14) throw e_14.error; }
                    }
                }
                if (grammar.language) {
                    // processing is deferred.
                    grammarsWithLanguage_1.push(grammar);
                }
                pushContribution("grammar.textmate.scope." + grammar.scope, function () { return _this.grammarsRegistry.registerTextmateGrammarScope(grammar.scope, {
                    getGrammarDefinition: function () {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, {
                                        format: grammar.format,
                                        content: grammar.grammar || '',
                                        location: grammar.grammarLocation
                                    }];
                            });
                        });
                    },
                    getInjections: function (scopeName) {
                        return _this.injections.get(scopeName);
                    }
                }); });
            };
            try {
                for (var grammars_1 = __values(grammars), grammars_1_1 = grammars_1.next(); !grammars_1_1.done; grammars_1_1 = grammars_1.next()) {
                    var grammar = grammars_1_1.value;
                    _loop_3(grammar);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (grammars_1_1 && !grammars_1_1.done && (_c = grammars_1.return)) _c.call(grammars_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            // load grammars on next tick to await registration of languages from all plugins in current tick
            // see https://github.com/eclipse-theia/theia/issues/6907#issuecomment-578600243
            setTimeout(function () {
                var e_15, _a;
                var _loop_17 = function (grammar) {
                    var language = grammar.language;
                    pushContribution("grammar.language." + language + ".scope", function () { return _this.grammarsRegistry.mapLanguageIdToTextmateGrammar(language, grammar.scope); });
                    pushContribution("grammar.language." + language + ".configuration", function () { return _this.grammarsRegistry.registerGrammarConfiguration(language, {
                        embeddedLanguages: _this.convertEmbeddedLanguages(grammar.embeddedLanguages, logWarning),
                        tokenTypes: _this.convertTokenTypes(grammar.tokenTypes)
                    }); });
                };
                try {
                    for (var grammarsWithLanguage_2 = __values(grammarsWithLanguage_1), grammarsWithLanguage_2_1 = grammarsWithLanguage_2.next(); !grammarsWithLanguage_2_1.done; grammarsWithLanguage_2_1 = grammarsWithLanguage_2.next()) {
                        var grammar = grammarsWithLanguage_2_1.value;
                        _loop_17(grammar);
                    }
                }
                catch (e_15_1) { e_15 = { error: e_15_1 }; }
                finally {
                    try {
                        if (grammarsWithLanguage_2_1 && !grammarsWithLanguage_2_1.done && (_a = grammarsWithLanguage_2.return)) _a.call(grammarsWithLanguage_2);
                    }
                    finally { if (e_15) throw e_15.error; }
                }
                // activate grammars only once everything else is loaded.
                // see https://github.com/eclipse-theia/theia-cpp-extensions/issues/100#issuecomment-610643866
                setTimeout(function () {
                    var e_16, _a;
                    var _loop_18 = function (grammar) {
                        var language = grammar.language;
                        pushContribution("grammar.language." + language + ".activation", function () { return _this.monacoTextmateService.activateLanguage(language); });
                    };
                    try {
                        for (var grammarsWithLanguage_3 = __values(grammarsWithLanguage_1), grammarsWithLanguage_3_1 = grammarsWithLanguage_3.next(); !grammarsWithLanguage_3_1.done; grammarsWithLanguage_3_1 = grammarsWithLanguage_3.next()) {
                            var grammar = grammarsWithLanguage_3_1.value;
                            _loop_18(grammar);
                        }
                    }
                    catch (e_16_1) { e_16 = { error: e_16_1 }; }
                    finally {
                        try {
                            if (grammarsWithLanguage_3_1 && !grammarsWithLanguage_3_1.done && (_a = grammarsWithLanguage_3.return)) _a.call(grammarsWithLanguage_3);
                        }
                        finally { if (e_16) throw e_16.error; }
                    }
                });
            });
        }
        pushContribution('commands', function () { return _this.registerCommands(contributions); });
        pushContribution('menus', function () { return _this.menusContributionHandler.handle(plugin); });
        pushContribution('keybindings', function () { return _this.keybindingsContributionHandler.handle(contributions); });
        if (contributions.customEditors) {
            var _loop_4 = function (customEditor) {
                pushContribution("customEditors." + customEditor.viewType, function () { return _this.customEditorRegistry.registerCustomEditor(customEditor); });
            };
            try {
                for (var _p = __values(contributions.customEditors), _q = _p.next(); !_q.done; _q = _p.next()) {
                    var customEditor = _q.value;
                    _loop_4(customEditor);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_q && !_q.done && (_d = _p.return)) _d.call(_p);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        if (contributions.viewsContainers) {
            var _loop_5 = function (location_1) {
                var e_17, _a;
                if (contributions.viewsContainers.hasOwnProperty(location_1)) {
                    var _loop_19 = function (viewContainer) {
                        pushContribution("viewContainers." + viewContainer.id, function () { return _this.viewRegistry.registerViewContainer(location_1, viewContainer); });
                    };
                    try {
                        for (var _b = (e_17 = void 0, __values(contributions.viewsContainers[location_1])), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var viewContainer = _c.value;
                            _loop_19(viewContainer);
                        }
                    }
                    catch (e_17_1) { e_17 = { error: e_17_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_17) throw e_17.error; }
                    }
                }
            };
            for (var location_1 in contributions.viewsContainers) {
                _loop_5(location_1);
            }
        }
        if (contributions.views) {
            var _loop_6 = function (location_2) {
                var e_18, _a;
                var _loop_20 = function (view) {
                    pushContribution("views." + view.id, function () { return _this.viewRegistry.registerView(location_2, view); });
                };
                try {
                    for (var _b = (e_18 = void 0, __values(contributions.views[location_2])), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var view = _c.value;
                        _loop_20(view);
                    }
                }
                catch (e_18_1) { e_18 = { error: e_18_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_18) throw e_18.error; }
                }
            };
            // eslint-disable-next-line guard-for-in
            for (var location_2 in contributions.views) {
                _loop_6(location_2);
            }
        }
        if (contributions.viewsWelcome) {
            var _loop_7 = function (index, viewWelcome) {
                pushContribution("viewsWelcome." + viewWelcome.view + "." + index, function () { return _this.viewRegistry.registerViewWelcome(viewWelcome); });
            };
            try {
                for (var _r = __values(contributions.viewsWelcome.entries()), _s = _r.next(); !_s.done; _s = _r.next()) {
                    var _t = __read(_s.value, 2), index = _t[0], viewWelcome = _t[1];
                    _loop_7(index, viewWelcome);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_s && !_s.done && (_e = _r.return)) _e.call(_r);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        if (contributions.snippets) {
            var _loop_8 = function (snippet) {
                pushContribution("snippets." + snippet.uri, function () { return _this.snippetSuggestProvider.fromURI(snippet.uri, {
                    language: snippet.language,
                    source: snippet.source
                }); });
            };
            try {
                for (var _u = __values(contributions.snippets), _v = _u.next(); !_v.done; _v = _u.next()) {
                    var snippet = _v.value;
                    _loop_8(snippet);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_v && !_v.done && (_f = _u.return)) _f.call(_u);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
        if (contributions.themes && contributions.themes.length) {
            var pending_1 = {};
            var _loop_9 = function (theme) {
                pushContribution("themes." + theme.uri, function () { return _this.monacoThemingService.register(theme, pending_1); });
            };
            try {
                for (var _w = __values(contributions.themes), _x = _w.next(); !_x.done; _x = _w.next()) {
                    var theme = _x.value;
                    _loop_9(theme);
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_x && !_x.done && (_g = _w.return)) _g.call(_w);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
        if (contributions.iconThemes && contributions.iconThemes.length) {
            var _loop_10 = function (iconTheme) {
                pushContribution("iconThemes." + iconTheme.uri, function () { return _this.iconThemeService.register(iconTheme, plugin); });
            };
            try {
                for (var _y = __values(contributions.iconThemes), _z = _y.next(); !_z.done; _z = _y.next()) {
                    var iconTheme = _z.value;
                    _loop_10(iconTheme);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_z && !_z.done && (_h = _y.return)) _h.call(_y);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }
        if (contributions.colors) {
            pushContribution('colors', function () {
                var _a;
                return (_a = _this.colors).register.apply(_a, __spread(contributions.colors));
            });
        }
        if (contributions.taskDefinitions) {
            var _loop_11 = function (taskDefinition) {
                pushContribution("taskDefinitions." + taskDefinition.taskType, function () { return _this.taskDefinitionRegistry.register(taskDefinition); });
            };
            try {
                for (var _0 = __values(contributions.taskDefinitions), _1 = _0.next(); !_1.done; _1 = _0.next()) {
                    var taskDefinition = _1.value;
                    _loop_11(taskDefinition);
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_1 && !_1.done && (_j = _0.return)) _j.call(_0);
                }
                finally { if (e_9) throw e_9.error; }
            }
        }
        if (contributions.problemPatterns) {
            var _loop_12 = function (problemPattern) {
                pushContribution("problemPatterns." + (problemPattern.name || problemPattern.regexp), function () { return _this.problemPatternRegistry.register(problemPattern); });
            };
            try {
                for (var _2 = __values(contributions.problemPatterns), _3 = _2.next(); !_3.done; _3 = _2.next()) {
                    var problemPattern = _3.value;
                    _loop_12(problemPattern);
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_3 && !_3.done && (_k = _2.return)) _k.call(_2);
                }
                finally { if (e_10) throw e_10.error; }
            }
        }
        if (contributions.problemMatchers) {
            var _loop_13 = function (problemMatcher) {
                pushContribution("problemMatchers." + problemMatcher.label, function () { return _this.problemMatcherRegistry.register(problemMatcher); });
            };
            try {
                for (var _4 = __values(contributions.problemMatchers), _5 = _4.next(); !_5.done; _5 = _4.next()) {
                    var problemMatcher = _5.value;
                    _loop_13(problemMatcher);
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_5 && !_5.done && (_l = _4.return)) _l.call(_4);
                }
                finally { if (e_11) throw e_11.error; }
            }
        }
        if (contributions.debuggers && contributions.debuggers.length) {
            toDispose.push(disposable_1.Disposable.create(function () { return _this.debugSchema.update(); }));
            var _loop_14 = function (contribution) {
                pushContribution("debuggers." + contribution.type, function () { return _this.debugService.registerDebugger(contribution); });
            };
            try {
                for (var _6 = __values(contributions.debuggers), _7 = _6.next(); !_7.done; _7 = _6.next()) {
                    var contribution = _7.value;
                    _loop_14(contribution);
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (_7 && !_7.done && (_m = _6.return)) _m.call(_6);
                }
                finally { if (e_12) throw e_12.error; }
            }
            this.debugSchema.update();
        }
        if (contributions.resourceLabelFormatters) {
            var _loop_15 = function (formatter) {
                var e_19, _a;
                var _loop_21 = function (contribution) {
                    if (contribution instanceof browser_1.DefaultUriLabelProviderContribution) {
                        pushContribution("resourceLabelFormatters." + formatter.scheme, function () { return contribution.registerFormatter(formatter); });
                    }
                };
                try {
                    for (var _b = (e_19 = void 0, __values(this_1.contributionProvider.getContributions())), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var contribution = _c.value;
                        _loop_21(contribution);
                    }
                }
                catch (e_19_1) { e_19 = { error: e_19_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_19) throw e_19.error; }
                }
            };
            var this_1 = this;
            try {
                for (var _8 = __values(contributions.resourceLabelFormatters), _9 = _8.next(); !_9.done; _9 = _8.next()) {
                    var formatter = _9.value;
                    _loop_15(formatter);
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (_9 && !_9.done && (_o = _8.return)) _o.call(_8);
                }
                finally { if (e_13) throw e_13.error; }
            }
        }
        return toDispose;
    };
    PluginContributionHandler.prototype.registerCommands = function (contribution) {
        var e_20, _a;
        if (!contribution.commands) {
            return disposable_1.Disposable.NULL;
        }
        var toDispose = new disposable_1.DisposableCollection();
        try {
            for (var _b = __values(contribution.commands), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = _c.value, iconUrl = _d.iconUrl, themeIcon = _d.themeIcon, command = _d.command, category = _d.category, title = _d.title;
                var reference = iconUrl && this.style.toIconClass(iconUrl);
                var icon = themeIcon && monaco.theme.ThemeIcon.fromString(themeIcon);
                var iconClass = void 0;
                if (reference) {
                    toDispose.push(reference);
                    iconClass = reference.object.iconClass;
                }
                else if (icon) {
                    iconClass = monaco.theme.ThemeIcon.asClassName(icon);
                }
                toDispose.push(this.registerCommand({ id: command, category: category, label: title, iconClass: iconClass }));
            }
        }
        catch (e_20_1) { e_20 = { error: e_20_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_20) throw e_20.error; }
        }
        return toDispose;
    };
    PluginContributionHandler.prototype.registerCommand = function (command) {
        var _this = this;
        if (this.hasCommand(command.id)) {
            console.warn("command '" + command.id + "' already registered");
            return disposable_1.Disposable.NULL;
        }
        var commandHandler = {
            execute: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __awaiter(_this, void 0, void 0, function () {
                    var handler;
                    return __generator(this, function (_a) {
                        handler = this.commandHandlers.get(command.id);
                        if (!handler) {
                            throw new Error("command '" + command.id + "' not found");
                        }
                        return [2 /*return*/, handler.apply(void 0, __spread(args))];
                    });
                });
            },
            // Always enabled - a command can be executed programmatically or via the commands palette.
            isEnabled: function () { return true; },
            // Visibility rules are defined via the `menus` contribution point.
            isVisible: function () { return true; }
        };
        var toDispose = new disposable_1.DisposableCollection();
        if (this.commands.getCommand(command.id)) {
            // overriding built-in command, i.e. `type` by the VSCodeVim extension
            toDispose.push(this.commands.registerHandler(command.id, commandHandler));
        }
        else {
            toDispose.push(this.commands.registerCommand(command, commandHandler));
        }
        this.commandHandlers.set(command.id, undefined);
        toDispose.push(disposable_1.Disposable.create(function () { return _this.commandHandlers.delete(command.id); }));
        return toDispose;
    };
    PluginContributionHandler.prototype.registerCommandHandler = function (id, execute) {
        var _this = this;
        if (this.hasCommandHandler(id)) {
            console.warn("command handler '" + id + "' already registered");
            return disposable_1.Disposable.NULL;
        }
        this.commandHandlers.set(id, execute);
        this.onDidRegisterCommandHandlerEmitter.fire(id);
        return disposable_1.Disposable.create(function () { return _this.commandHandlers.set(id, undefined); });
    };
    PluginContributionHandler.prototype.hasCommand = function (id) {
        return this.commandHandlers.has(id);
    };
    PluginContributionHandler.prototype.hasCommandHandler = function (id) {
        return !!this.commandHandlers.get(id);
    };
    PluginContributionHandler.prototype.updateDefaultOverridesSchema = function (configurationDefaults) {
        var defaultOverrides = {
            id: 'defaultOverrides',
            title: 'Default Configuration Overrides',
            properties: {}
        };
        // eslint-disable-next-line guard-for-in
        for (var key in configurationDefaults) {
            var defaultValue = configurationDefaults[key];
            if (this.preferenceSchemaProvider.testOverrideValue(key, defaultValue)) {
                defaultOverrides.properties[key] = {
                    type: 'object',
                    default: defaultValue,
                    description: "Configure editor settings to be overridden for " + key + " language."
                };
            }
        }
        if (Object.keys(defaultOverrides.properties).length) {
            return this.preferenceSchemaProvider.setSchema(defaultOverrides);
        }
        return disposable_1.Disposable.NULL;
    };
    PluginContributionHandler.prototype.createRegex = function (value) {
        if (typeof value === 'string') {
            return new RegExp(value, '');
        }
        return undefined;
    };
    PluginContributionHandler.prototype.convertIndentationRules = function (rules) {
        if (!rules) {
            return undefined;
        }
        return {
            decreaseIndentPattern: this.createRegex(rules.decreaseIndentPattern),
            increaseIndentPattern: this.createRegex(rules.increaseIndentPattern),
            indentNextLinePattern: this.createRegex(rules.indentNextLinePattern),
            unIndentedLinePattern: this.createRegex(rules.unIndentedLinePattern)
        };
    };
    PluginContributionHandler.prototype.convertFolding = function (folding) {
        if (!folding) {
            return undefined;
        }
        var result = {
            offSide: folding.offSide
        };
        if (folding.markers) {
            result.markers = {
                end: this.createRegex(folding.markers.end),
                start: this.createRegex(folding.markers.start)
            };
        }
        return result;
    };
    PluginContributionHandler.prototype.convertTokenTypes = function (tokenTypes) {
        if (typeof tokenTypes === 'undefined' || tokenTypes === null) {
            return undefined;
        }
        var result = Object.create(null);
        var scopes = Object.keys(tokenTypes);
        var len = scopes.length;
        for (var i = 0; i < len; i++) {
            var scope = scopes[i];
            var tokenType = tokenTypes[scope];
            switch (tokenType) {
                case 'string':
                    result[scope] = 2 /* String */;
                    break;
                case 'other':
                    result[scope] = 0 /* Other */;
                    break;
                case 'comment':
                    result[scope] = 1 /* Comment */;
                    break;
            }
        }
        return result;
    };
    PluginContributionHandler.prototype.convertEmbeddedLanguages = function (languages, logWarning) {
        if (typeof languages === 'undefined' || languages === null) {
            return undefined;
        }
        var result = Object.create(null);
        var scopes = Object.keys(languages);
        var len = scopes.length;
        for (var i = 0; i < len; i++) {
            var scope = scopes[i];
            var langId = languages[scope];
            result[scope] = textmate_1.getEncodedLanguageId(langId);
            if (!result[scope]) {
                logWarning("Language for '" + scope + "' not found.");
            }
        }
        return result;
    };
    __decorate([
        inversify_1.inject(textmate_1.TextmateRegistry),
        __metadata("design:type", textmate_1.TextmateRegistry)
    ], PluginContributionHandler.prototype, "grammarsRegistry", void 0);
    __decorate([
        inversify_1.inject(plugin_view_registry_1.PluginViewRegistry),
        __metadata("design:type", plugin_view_registry_1.PluginViewRegistry)
    ], PluginContributionHandler.prototype, "viewRegistry", void 0);
    __decorate([
        inversify_1.inject(plugin_custom_editor_registry_1.PluginCustomEditorRegistry),
        __metadata("design:type", plugin_custom_editor_registry_1.PluginCustomEditorRegistry)
    ], PluginContributionHandler.prototype, "customEditorRegistry", void 0);
    __decorate([
        inversify_1.inject(menus_contribution_handler_1.MenusContributionPointHandler),
        __metadata("design:type", menus_contribution_handler_1.MenusContributionPointHandler)
    ], PluginContributionHandler.prototype, "menusContributionHandler", void 0);
    __decorate([
        inversify_1.inject(browser_1.PreferenceSchemaProvider),
        __metadata("design:type", browser_1.PreferenceSchemaProvider)
    ], PluginContributionHandler.prototype, "preferenceSchemaProvider", void 0);
    __decorate([
        inversify_1.inject(textmate_1.MonacoTextmateService),
        __metadata("design:type", textmate_1.MonacoTextmateService)
    ], PluginContributionHandler.prototype, "monacoTextmateService", void 0);
    __decorate([
        inversify_1.inject(keybindings_contribution_handler_1.KeybindingsContributionPointHandler),
        __metadata("design:type", keybindings_contribution_handler_1.KeybindingsContributionPointHandler)
    ], PluginContributionHandler.prototype, "keybindingsContributionHandler", void 0);
    __decorate([
        inversify_1.inject(monaco_snippet_suggest_provider_1.MonacoSnippetSuggestProvider),
        __metadata("design:type", monaco_snippet_suggest_provider_1.MonacoSnippetSuggestProvider)
    ], PluginContributionHandler.prototype, "snippetSuggestProvider", void 0);
    __decorate([
        inversify_1.inject(command_1.CommandRegistry),
        __metadata("design:type", command_1.CommandRegistry)
    ], PluginContributionHandler.prototype, "commands", void 0);
    __decorate([
        inversify_1.inject(plugin_shared_style_1.PluginSharedStyle),
        __metadata("design:type", plugin_shared_style_1.PluginSharedStyle)
    ], PluginContributionHandler.prototype, "style", void 0);
    __decorate([
        inversify_1.inject(browser_2.TaskDefinitionRegistry),
        __metadata("design:type", browser_2.TaskDefinitionRegistry)
    ], PluginContributionHandler.prototype, "taskDefinitionRegistry", void 0);
    __decorate([
        inversify_1.inject(browser_2.ProblemMatcherRegistry),
        __metadata("design:type", browser_2.ProblemMatcherRegistry)
    ], PluginContributionHandler.prototype, "problemMatcherRegistry", void 0);
    __decorate([
        inversify_1.inject(browser_2.ProblemPatternRegistry),
        __metadata("design:type", browser_2.ProblemPatternRegistry)
    ], PluginContributionHandler.prototype, "problemPatternRegistry", void 0);
    __decorate([
        inversify_1.inject(plugin_debug_service_1.PluginDebugService),
        __metadata("design:type", plugin_debug_service_1.PluginDebugService)
    ], PluginContributionHandler.prototype, "debugService", void 0);
    __decorate([
        inversify_1.inject(debug_schema_updater_1.DebugSchemaUpdater),
        __metadata("design:type", debug_schema_updater_1.DebugSchemaUpdater)
    ], PluginContributionHandler.prototype, "debugSchema", void 0);
    __decorate([
        inversify_1.inject(monaco_theming_service_1.MonacoThemingService),
        __metadata("design:type", monaco_theming_service_1.MonacoThemingService)
    ], PluginContributionHandler.prototype, "monacoThemingService", void 0);
    __decorate([
        inversify_1.inject(color_registry_1.ColorRegistry),
        __metadata("design:type", color_registry_1.ColorRegistry)
    ], PluginContributionHandler.prototype, "colors", void 0);
    __decorate([
        inversify_1.inject(plugin_icon_theme_service_1.PluginIconThemeService),
        __metadata("design:type", plugin_icon_theme_service_1.PluginIconThemeService)
    ], PluginContributionHandler.prototype, "iconThemeService", void 0);
    __decorate([
        inversify_1.inject(common_1.ContributionProvider),
        inversify_1.named(browser_1.LabelProviderContribution),
        __metadata("design:type", Object)
    ], PluginContributionHandler.prototype, "contributionProvider", void 0);
    PluginContributionHandler = __decorate([
        inversify_1.injectable()
    ], PluginContributionHandler);
    return PluginContributionHandler;
}());
exports.PluginContributionHandler = PluginContributionHandler;
//# sourceMappingURL=plugin-contribution-handler.js.map