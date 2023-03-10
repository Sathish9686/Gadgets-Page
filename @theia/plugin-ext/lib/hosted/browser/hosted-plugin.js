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
// some code copied and modified from https://github.com/microsoft/vscode/blob/da5fb7d5b865aa522abc7e82c10b746834b98639/src/vs/workbench/api/node/extHostExtensionService.ts
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
exports.PluginContributions = exports.HostedPluginSupport = exports.PluginProgressLocation = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var debounce = require("lodash.debounce");
var coreutils_1 = require("@phosphor/coreutils");
var inversify_1 = require("inversify");
var plugin_worker_1 = require("../../main/browser/plugin-worker");
var plugin_protocol_1 = require("../../common/plugin-protocol");
var hosted_plugin_watcher_1 = require("./hosted-plugin-watcher");
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var main_context_1 = require("../../main/browser/main-context");
var rpc_protocol_1 = require("../../common/rpc-protocol");
var core_1 = require("@theia/core");
var preferences_1 = require("@theia/core/lib/browser/preferences");
var browser_1 = require("@theia/workspace/lib/browser");
var plugin_contribution_handler_1 = require("../../main/browser/plugin-contribution-handler");
var env_main_1 = require("../../main/browser/env-main");
var plugin_ext_api_contribution_1 = require("../../common/plugin-ext-api-contribution");
var plugin_paths_protocol_1 = require("../../main/common/plugin-paths-protocol");
var preference_registry_main_1 = require("../../main/browser/preference-registry-main");
var plugin_protocol_2 = require("../../common/plugin-protocol");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var debug_session_manager_1 = require("@theia/debug/lib/browser/debug-session-manager");
var debug_configuration_manager_1 = require("@theia/debug/lib/browser/debug-configuration-manager");
var file_search_service_1 = require("@theia/file-search/lib/common/file-search-service");
var core_2 = require("@theia/core");
var frontend_application_state_1 = require("@theia/core/lib/browser/frontend-application-state");
var plugin_view_registry_1 = require("../../main/browser/view/plugin-view-registry");
var task_contribution_1 = require("@theia/task/lib/browser/task-contribution");
var webview_environment_1 = require("../../main/browser/webview/webview-environment");
var webview_1 = require("../../main/browser/webview/webview");
var widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
var terminal_service_1 = require("@theia/terminal/lib/browser/base/terminal-service");
var env_variables_1 = require("@theia/core/lib/common/env-variables");
var uri_1 = require("@theia/core/lib/common/uri");
var frontend_application_config_provider_1 = require("@theia/core/lib/browser/frontend-application-config-provider");
var environment_1 = require("@theia/application-package/lib/environment");
var json_schema_store_1 = require("@theia/core/lib/browser/json-schema-store");
var file_service_1 = require("@theia/filesystem/lib/browser/file-service");
var plugin_custom_editor_registry_1 = require("../../main/browser/custom-editors/plugin-custom-editor-registry");
var custom_editor_widget_1 = require("../../main/browser/custom-editors/custom-editor-widget");
exports.PluginProgressLocation = 'plugin';
var HostedPluginSupport = /** @class */ (function () {
    function HostedPluginSupport() {
        var _this = this;
        this.clientId = coreutils_1.UUID.uuid4();
        this.managers = new Map();
        this.contributions = new Map();
        this.activationEvents = new Set();
        this.onDidChangePluginsEmitter = new core_2.Emitter();
        this.onDidChangePlugins = this.onDidChangePluginsEmitter.event;
        this.deferredWillStart = new promise_util_1.Deferred();
        this.deferredDidStart = new promise_util_1.Deferred();
        this.loadQueue = Promise.resolve(undefined);
        this.load = debounce(function () { return _this.loadQueue = _this.loadQueue.then(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.progressService.withProgress('', exports.PluginProgressLocation, function () { return _this.doLoad(); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error('Failed to load plugins:', e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); }); }, 50, { leading: true });
        this.webviewsToRestore = new Set();
        this.webviewRevivers = new Map();
    }
    Object.defineProperty(HostedPluginSupport.prototype, "willStart", {
        /**
         * Resolves when the initial plugins are loaded and about to be started.
         */
        get: function () {
            return this.deferredWillStart.promise;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HostedPluginSupport.prototype, "didStart", {
        /**
         * Resolves when the initial plugins are started.
         */
        get: function () {
            return this.deferredDidStart.promise;
        },
        enumerable: false,
        configurable: true
    });
    HostedPluginSupport.prototype.init = function () {
        var e_2, _a;
        var _this = this;
        this.theiaReadyPromise = Promise.all([this.preferenceServiceImpl.ready, this.workspaceService.roots]);
        this.workspaceService.onWorkspaceChanged(function () { return _this.updateStoragePath(); });
        var modeService = monaco.services.StaticServices.modeService.get();
        try {
            for (var _b = __values(Object.keys(modeService['_instantiatedModes'])), _c = _b.next(); !_c.done; _c = _b.next()) {
                var modeId = _c.value;
                var mode = modeService['_instantiatedModes'][modeId];
                this.activateByLanguage(mode.getId());
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        modeService.onDidCreateMode(function (mode) { return _this.activateByLanguage(mode.getId()); });
        this.commands.onWillExecuteCommand(function (event) { return _this.ensureCommandHandlerRegistration(event); });
        this.debugSessionManager.onWillStartDebugSession(function (event) { return _this.ensureDebugActivation(event); });
        this.debugSessionManager.onWillResolveDebugConfiguration(function (event) { return _this.ensureDebugActivation(event, 'onDebugResolve', event.debugType); });
        this.debugConfigurationManager.onWillProvideDebugConfiguration(function (event) { return _this.ensureDebugActivation(event, 'onDebugInitialConfigurations'); });
        this.viewRegistry.onDidExpandView(function (id) { return _this.activateByView(id); });
        this.taskProviderRegistry.onWillProvideTaskProvider(function (event) { return _this.ensureTaskActivation(event); });
        this.taskResolverRegistry.onWillProvideTaskResolver(function (event) { return _this.ensureTaskActivation(event); });
        this.fileService.onWillActivateFileSystemProvider(function (event) { return _this.ensureFileSystemActivation(event); });
        this.customEditorRegistry.onWillOpenCustomEditor(function (event) { return _this.activateByCustomEditor(event); });
        this.widgets.onDidCreateWidget(function (_a) {
            var factoryId = _a.factoryId, widget = _a.widget;
            if ((factoryId === webview_1.WebviewWidget.FACTORY_ID || factoryId === custom_editor_widget_1.CustomEditorWidget.FACTORY_ID) && widget instanceof webview_1.WebviewWidget) {
                var storeState_1 = widget.storeState.bind(widget);
                var restoreState_1 = widget.restoreState.bind(widget);
                widget.storeState = function () {
                    if (_this.webviewRevivers.has(widget.viewType)) {
                        return storeState_1();
                    }
                    return undefined;
                };
                widget.restoreState = function (state) {
                    if (state.viewType) {
                        restoreState_1(state);
                        _this.preserveWebview(widget);
                    }
                    else {
                        widget.dispose();
                    }
                };
            }
        });
    };
    Object.defineProperty(HostedPluginSupport.prototype, "plugins", {
        get: function () {
            var plugins = [];
            this.contributions.forEach(function (contributions) { return plugins.push(contributions.plugin.metadata); });
            return plugins;
        },
        enumerable: false,
        configurable: true
    });
    HostedPluginSupport.prototype.getPlugin = function (id) {
        var contributions = this.contributions.get(id);
        return contributions && contributions.plugin;
    };
    /** do not call it, except from the plugin frontend contribution */
    HostedPluginSupport.prototype.onStart = function (container) {
        var _this = this;
        this.container = container;
        this.load();
        this.watcher.onDidDeploy(function () { return _this.load(); });
        this.server.onDidOpenConnection(function () { return _this.load(); });
    };
    HostedPluginSupport.prototype.doLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toDisconnect, contributionsByHost;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toDisconnect = new core_1.DisposableCollection(core_1.Disposable.create(function () { }));
                        toDisconnect.push(core_1.Disposable.create(function () { return _this.preserveWebviews(); }));
                        this.server.onDidCloseConnection(function () { return toDisconnect.dispose(); });
                        // process empty plugins as well in order to properly remove stale plugin widgets
                        return [4 /*yield*/, this.syncPlugins()];
                    case 1:
                        // process empty plugins as well in order to properly remove stale plugin widgets
                        _a.sent();
                        // it has to be resolved before awaiting layout is initialized
                        // otherwise clients can hang forever in the initialization phase
                        this.deferredWillStart.resolve();
                        // make sure that the previous state, including plugin widgets, is restored
                        // and core layout is initialized, i.e. explorer, scm, debug views are already added to the shell
                        // but shell is not yet revealed
                        return [4 /*yield*/, this.appState.reachedState('initialized_layout')];
                    case 2:
                        // make sure that the previous state, including plugin widgets, is restored
                        // and core layout is initialized, i.e. explorer, scm, debug views are already added to the shell
                        // but shell is not yet revealed
                        _a.sent();
                        if (toDisconnect.disposed) {
                            // if disconnected then don't try to load plugin contributions
                            return [2 /*return*/];
                        }
                        contributionsByHost = this.loadContributions(toDisconnect);
                        return [4 /*yield*/, this.viewRegistry.initWidgets()];
                    case 3:
                        _a.sent();
                        // remove restored plugin widgets which were not registered by contributions
                        this.viewRegistry.removeStaleWidgets();
                        return [4 /*yield*/, this.theiaReadyPromise];
                    case 4:
                        _a.sent();
                        if (toDisconnect.disposed) {
                            // if disconnected then don't try to init plugin code and dynamic contributions
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.startPlugins(contributionsByHost, toDisconnect)];
                    case 5:
                        _a.sent();
                        this.deferredDidStart.resolve();
                        this.restoreWebviews();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sync loaded and deployed plugins:
     * - undeployed plugins are unloaded
     * - newly deployed plugins are initialized
     */
    HostedPluginSupport.prototype.syncPlugins = function () {
        return __awaiter(this, void 0, void 0, function () {
            var initialized, syncPluginsMeasurement, toUnload, pluginIds, deployedPluginIds, deployedPluginIds_1, deployedPluginIds_1_1, pluginId, toUnload_1, toUnload_1_1, pluginId, contribution, plugins, _loop_1, this_1, plugins_1, plugins_1_1, plugin;
            var e_3, _a, e_4, _b, e_5, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        initialized = 0;
                        syncPluginsMeasurement = this.createMeasurement('syncPlugins');
                        toUnload = new Set(this.contributions.keys());
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, , 5, 6]);
                        pluginIds = [];
                        return [4 /*yield*/, this.server.getDeployedPluginIds()];
                    case 2:
                        deployedPluginIds = _d.sent();
                        try {
                            for (deployedPluginIds_1 = __values(deployedPluginIds), deployedPluginIds_1_1 = deployedPluginIds_1.next(); !deployedPluginIds_1_1.done; deployedPluginIds_1_1 = deployedPluginIds_1.next()) {
                                pluginId = deployedPluginIds_1_1.value;
                                toUnload.delete(pluginId);
                                if (!this.contributions.has(pluginId)) {
                                    pluginIds.push(pluginId);
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (deployedPluginIds_1_1 && !deployedPluginIds_1_1.done && (_a = deployedPluginIds_1.return)) _a.call(deployedPluginIds_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        try {
                            for (toUnload_1 = __values(toUnload), toUnload_1_1 = toUnload_1.next(); !toUnload_1_1.done; toUnload_1_1 = toUnload_1.next()) {
                                pluginId = toUnload_1_1.value;
                                contribution = this.contributions.get(pluginId);
                                if (contribution) {
                                    contribution.dispose();
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (toUnload_1_1 && !toUnload_1_1.done && (_b = toUnload_1.return)) _b.call(toUnload_1);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        if (!pluginIds.length) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.server.getDeployedPlugins({ pluginIds: pluginIds })];
                    case 3:
                        plugins = _d.sent();
                        _loop_1 = function (plugin) {
                            var pluginId = plugin.metadata.model.id;
                            var contributions = new PluginContributions(plugin);
                            this_1.contributions.set(pluginId, contributions);
                            contributions.push(core_1.Disposable.create(function () { return _this.contributions.delete(pluginId); }));
                            initialized++;
                        };
                        this_1 = this;
                        try {
                            for (plugins_1 = __values(plugins), plugins_1_1 = plugins_1.next(); !plugins_1_1.done; plugins_1_1 = plugins_1.next()) {
                                plugin = plugins_1_1.value;
                                _loop_1(plugin);
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (plugins_1_1 && !plugins_1_1.done && (_c = plugins_1.return)) _c.call(plugins_1);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                        _d.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (initialized || toUnload.size) {
                            this.onDidChangePluginsEmitter.fire(undefined);
                        }
                        return [7 /*endfinally*/];
                    case 6:
                        this.logMeasurement('Sync', initialized, syncPluginsMeasurement);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Always synchronous in order to simplify handling disconnections.
     * @throws never
     */
    HostedPluginSupport.prototype.loadContributions = function (toDisconnect) {
        var e_6, _a;
        var _this = this;
        var loaded = 0;
        var loadPluginsMeasurement = this.createMeasurement('loadPlugins');
        var hostContributions = new Map();
        var _loop_2 = function (contributions) {
            var plugin = contributions.plugin.metadata;
            var pluginId = plugin.model.id;
            if (contributions.state === PluginContributions.State.INITIALIZING) {
                contributions.state = PluginContributions.State.LOADING;
                contributions.push(core_1.Disposable.create(function () { return console.log("[" + pluginId + "]: Unloaded plugin."); }));
                contributions.push(this_2.contributionHandler.handleContributions(this_2.clientId, contributions.plugin));
                contributions.state = PluginContributions.State.LOADED;
                console.log("[" + this_2.clientId + "][" + pluginId + "]: Loaded contributions.");
                loaded++;
            }
            if (contributions.state === PluginContributions.State.LOADED) {
                contributions.state = PluginContributions.State.STARTING;
                var host = plugin.model.entryPoint.frontend ? 'frontend' : plugin.host;
                var dynamicContributions = hostContributions.get(plugin.host) || [];
                dynamicContributions.push(contributions);
                hostContributions.set(host, dynamicContributions);
                toDisconnect.push(core_1.Disposable.create(function () {
                    contributions.state = PluginContributions.State.LOADED;
                    console.log("[" + _this.clientId + "][" + pluginId + "]: Disconnected.");
                }));
            }
        };
        var this_2 = this;
        try {
            for (var _b = __values(this.contributions.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var contributions = _c.value;
                _loop_2(contributions);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
        this.logMeasurement('Load contributions', loaded, loadPluginsMeasurement);
        return hostContributions;
    };
    HostedPluginSupport.prototype.startPlugins = function (contributionsByHost, toDisconnect) {
        return __awaiter(this, void 0, void 0, function () {
            var started, startPluginsMeasurement, _a, hostLogPath, hostStoragePath, hostGlobalStoragePath, thenable, configStorage, _loop_3, this_3, contributionsByHost_1, contributionsByHost_1_1, _b, host, hostContributions, state_1, e_7_1;
            var e_7, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        started = 0;
                        startPluginsMeasurement = this.createMeasurement('startPlugins');
                        return [4 /*yield*/, Promise.all([
                                this.pluginPathsService.getHostLogPath(),
                                this.getStoragePath(),
                                this.getHostGlobalStoragePath()
                            ])];
                    case 1:
                        _a = __read.apply(void 0, [_d.sent(), 3]), hostLogPath = _a[0], hostStoragePath = _a[1], hostGlobalStoragePath = _a[2];
                        if (toDisconnect.disposed) {
                            return [2 /*return*/];
                        }
                        thenable = [];
                        configStorage = {
                            hostLogPath: hostLogPath,
                            hostStoragePath: hostStoragePath,
                            hostGlobalStoragePath: hostGlobalStoragePath
                        };
                        _loop_3 = function (host, hostContributions) {
                            var manager, plugins;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this_3.obtainManager(host, hostContributions, toDisconnect)];
                                    case 1:
                                        manager = _a.sent();
                                        if (!manager) {
                                            return [2 /*return*/, { value: void 0 }];
                                        }
                                        plugins = hostContributions.map(function (contributions) { return contributions.plugin.metadata; });
                                        thenable.push((function () { return __awaiter(_this, void 0, void 0, function () {
                                            var activationEvents, _loop_4, this_4, hostContributions_1, hostContributions_1_1, contributions, e_8;
                                            var e_9, _a;
                                            var _this = this;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        _b.trys.push([0, 2, , 3]);
                                                        activationEvents = __spread(this.activationEvents);
                                                        return [4 /*yield*/, manager.$start({ plugins: plugins, configStorage: configStorage, activationEvents: activationEvents })];
                                                    case 1:
                                                        _b.sent();
                                                        if (toDisconnect.disposed) {
                                                            return [2 /*return*/];
                                                        }
                                                        _loop_4 = function (contributions) {
                                                            started++;
                                                            var plugin = contributions.plugin;
                                                            var id = plugin.metadata.model.id;
                                                            contributions.state = PluginContributions.State.STARTED;
                                                            console.log("[" + this_4.clientId + "][" + id + "]: Started plugin.");
                                                            toDisconnect.push(contributions.push(core_1.Disposable.create(function () {
                                                                console.log("[" + _this.clientId + "][" + id + "]: Stopped plugin.");
                                                                manager.$stop(id);
                                                            })));
                                                            this_4.activateByWorkspaceContains(manager, plugin);
                                                        };
                                                        this_4 = this;
                                                        try {
                                                            for (hostContributions_1 = __values(hostContributions), hostContributions_1_1 = hostContributions_1.next(); !hostContributions_1_1.done; hostContributions_1_1 = hostContributions_1.next()) {
                                                                contributions = hostContributions_1_1.value;
                                                                _loop_4(contributions);
                                                            }
                                                        }
                                                        catch (e_9_1) { e_9 = { error: e_9_1 }; }
                                                        finally {
                                                            try {
                                                                if (hostContributions_1_1 && !hostContributions_1_1.done && (_a = hostContributions_1.return)) _a.call(hostContributions_1);
                                                            }
                                                            finally { if (e_9) throw e_9.error; }
                                                        }
                                                        return [3 /*break*/, 3];
                                                    case 2:
                                                        e_8 = _b.sent();
                                                        console.error("Failed to start plugins for '" + host + "' host", e_8);
                                                        return [3 /*break*/, 3];
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        }); })());
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_3 = this;
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 9]);
                        contributionsByHost_1 = __values(contributionsByHost), contributionsByHost_1_1 = contributionsByHost_1.next();
                        _d.label = 3;
                    case 3:
                        if (!!contributionsByHost_1_1.done) return [3 /*break*/, 6];
                        _b = __read(contributionsByHost_1_1.value, 2), host = _b[0], hostContributions = _b[1];
                        return [5 /*yield**/, _loop_3(host, hostContributions)];
                    case 4:
                        state_1 = _d.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _d.label = 5;
                    case 5:
                        contributionsByHost_1_1 = contributionsByHost_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_7_1 = _d.sent();
                        e_7 = { error: e_7_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (contributionsByHost_1_1 && !contributionsByHost_1_1.done && (_c = contributionsByHost_1.return)) _c.call(contributionsByHost_1);
                        }
                        finally { if (e_7) throw e_7.error; }
                        return [7 /*endfinally*/];
                    case 9: return [4 /*yield*/, Promise.all(thenable)];
                    case 10:
                        _d.sent();
                        return [4 /*yield*/, this.activateByEvent('onStartupFinished')];
                    case 11:
                        _d.sent();
                        if (toDisconnect.disposed) {
                            return [2 /*return*/];
                        }
                        this.logMeasurement('Start', started, startPluginsMeasurement);
                        return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginSupport.prototype.obtainManager = function (host, hostContributions, toDisconnect) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var manager, pluginId, rpc, _b, extApi, globalState, workspaceState, webviewResourceRoot, webviewCspSource, defaultShell, jsonValidation;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        manager = this.managers.get(host);
                        if (!!manager) return [3 /*break*/, 3];
                        pluginId = plugin_protocol_1.getPluginId(hostContributions[0].plugin.metadata.model);
                        rpc = this.initRpc(host, pluginId);
                        toDisconnect.push(rpc);
                        manager = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.HOSTED_PLUGIN_MANAGER_EXT);
                        this.managers.set(host, manager);
                        toDisconnect.push(core_1.Disposable.create(function () { return _this.managers.delete(host); }));
                        return [4 /*yield*/, Promise.all([
                                this.server.getExtPluginAPI(),
                                this.pluginServer.getAllStorageValues(undefined),
                                this.pluginServer.getAllStorageValues({
                                    workspace: (_a = this.workspaceService.workspace) === null || _a === void 0 ? void 0 : _a.resource.toString(),
                                    roots: this.workspaceService.tryGetRoots().map(function (root) { return root.resource.toString(); })
                                }),
                                this.webviewEnvironment.resourceRoot(),
                                this.webviewEnvironment.cspSource(),
                                this.terminalService.getDefaultShell(),
                                this.jsonSchemaStore.schemas
                            ])];
                    case 1:
                        _b = __read.apply(void 0, [_c.sent(), 7]), extApi = _b[0], globalState = _b[1], workspaceState = _b[2], webviewResourceRoot = _b[3], webviewCspSource = _b[4], defaultShell = _b[5], jsonValidation = _b[6];
                        if (toDisconnect.disposed) {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, manager.$init({
                                preferences: preference_registry_main_1.getPreferences(this.preferenceProviderProvider, this.workspaceService.tryGetRoots()),
                                globalState: globalState,
                                workspaceState: workspaceState,
                                env: {
                                    queryParams: env_main_1.getQueryParameters(),
                                    language: navigator.language,
                                    shell: defaultShell,
                                    uiKind: environment_1.environment.electron.is() ? plugin_api_rpc_1.UIKind.Desktop : plugin_api_rpc_1.UIKind.Web,
                                    appName: frontend_application_config_provider_1.FrontendApplicationConfigProvider.get().applicationName
                                },
                                extApi: extApi,
                                webview: {
                                    webviewResourceRoot: webviewResourceRoot,
                                    webviewCspSource: webviewCspSource
                                },
                                jsonValidation: jsonValidation
                            })];
                    case 2:
                        _c.sent();
                        if (toDisconnect.disposed) {
                            return [2 /*return*/, undefined];
                        }
                        _c.label = 3;
                    case 3: return [2 /*return*/, manager];
                }
            });
        });
    };
    HostedPluginSupport.prototype.initRpc = function (host, pluginId) {
        var _this = this;
        var rpc = host === 'frontend' ? new plugin_worker_1.PluginWorker().rpc : this.createServerRpc(pluginId, host);
        main_context_1.setUpPluginApi(rpc, this.container);
        this.mainPluginApiProviders.getContributions().forEach(function (p) { return p.initialize(rpc, _this.container); });
        return rpc;
    };
    HostedPluginSupport.prototype.createServerRpc = function (pluginID, hostID) {
        var _this = this;
        return new rpc_protocol_1.RPCProtocolImpl({
            onMessage: this.watcher.onPostMessageEvent,
            send: function (message) {
                var wrappedMessage = {};
                wrappedMessage['pluginID'] = pluginID;
                wrappedMessage['content'] = message;
                _this.server.onMessage(JSON.stringify(wrappedMessage));
            }
        }, hostID);
    };
    HostedPluginSupport.prototype.updateStoragePath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var path, _a, _b, manager;
            var e_10, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.getStoragePath()];
                    case 1:
                        path = _d.sent();
                        try {
                            for (_a = __values(this.managers.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                                manager = _b.value;
                                manager.$updateStoragePath(path);
                            }
                        }
                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_10) throw e_10.error; }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginSupport.prototype.getStoragePath = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var roots;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.workspaceService.roots];
                    case 1:
                        roots = _b.sent();
                        return [2 /*return*/, this.pluginPathsService.getHostStoragePath((_a = this.workspaceService.workspace) === null || _a === void 0 ? void 0 : _a.resource.toString(), roots.map(function (root) { return root.resource.toString(); }))];
                }
            });
        });
    };
    HostedPluginSupport.prototype.getHostGlobalStoragePath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var configDirUri, globalStorageFolderUri, globalStorageFolderFsPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.envServer.getConfigDirUri()];
                    case 1:
                        configDirUri = _a.sent();
                        globalStorageFolderUri = new uri_1.default(configDirUri).resolve('globalStorage');
                        return [4 /*yield*/, this.fileService.exists(globalStorageFolderUri)];
                    case 2:
                        if (!!(_a.sent())) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.fileService.createFolder(globalStorageFolderUri)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.fileService.fsPath(globalStorageFolderUri)];
                    case 5:
                        globalStorageFolderFsPath = _a.sent();
                        if (!globalStorageFolderFsPath) {
                            throw new Error("Could not resolve the FS path for URI: " + globalStorageFolderUri);
                        }
                        return [2 /*return*/, globalStorageFolderFsPath];
                }
            });
        });
    };
    HostedPluginSupport.prototype.activateByEvent = function (activationEvent) {
        return __awaiter(this, void 0, void 0, function () {
            var activation, _a, _b, manager;
            var e_11, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.activationEvents.has(activationEvent)) {
                            return [2 /*return*/];
                        }
                        this.activationEvents.add(activationEvent);
                        activation = [];
                        try {
                            for (_a = __values(this.managers.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                                manager = _b.value;
                                activation.push(manager.$activateByEvent(activationEvent));
                            }
                        }
                        catch (e_11_1) { e_11 = { error: e_11_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_11) throw e_11.error; }
                        }
                        return [4 /*yield*/, Promise.all(activation)];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginSupport.prototype.activateByViewContainer = function (viewContainerId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.viewRegistry.getContainerViews(viewContainerId).map(function (viewId) { return _this.activateByView(viewId); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginSupport.prototype.activateByView = function (viewId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.activateByEvent("onView:" + viewId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginSupport.prototype.activateByLanguage = function (languageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.activateByEvent("onLanguage:" + languageId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginSupport.prototype.activateByCommand = function (commandId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.activateByEvent("onCommand:" + commandId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginSupport.prototype.activateByCustomEditor = function (viewType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.activateByEvent("onCustomEditor:" + viewType)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginSupport.prototype.activateByFileSystem = function (event) {
        return this.activateByEvent("onFileSystem:" + event.scheme);
    };
    HostedPluginSupport.prototype.ensureFileSystemActivation = function (event) {
        event.waitUntil(this.activateByFileSystem(event));
    };
    HostedPluginSupport.prototype.ensureCommandHandlerRegistration = function (event) {
        var activation = this.activateByCommand(event.commandId);
        if (this.commands.getCommand(event.commandId) &&
            (!this.contributionHandler.hasCommand(event.commandId) ||
                this.contributionHandler.hasCommandHandler(event.commandId))) {
            return;
        }
        var waitForCommandHandler = new promise_util_1.Deferred();
        var listener = this.contributionHandler.onDidRegisterCommandHandler(function (id) {
            if (id === event.commandId) {
                listener.dispose();
                waitForCommandHandler.resolve();
            }
        });
        var p = Promise.all([
            activation,
            waitForCommandHandler.promise
        ]);
        p.then(function () { return listener.dispose(); }, function () { return listener.dispose(); });
        event.waitUntil(p);
    };
    HostedPluginSupport.prototype.ensureTaskActivation = function (event) {
        event.waitUntil(this.activateByCommand('workbench.action.tasks.runTask'));
    };
    HostedPluginSupport.prototype.ensureDebugActivation = function (event, activationEvent, debugType) {
        event.waitUntil(this.activateByDebug(activationEvent, debugType));
    };
    HostedPluginSupport.prototype.activateByDebug = function (activationEvent, debugType) {
        return __awaiter(this, void 0, void 0, function () {
            var promises;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [this.activateByEvent('onDebug')];
                        if (activationEvent) {
                            promises.push(this.activateByEvent(activationEvent));
                            if (debugType) {
                                promises.push(this.activateByEvent(activationEvent + ':' + debugType));
                            }
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginSupport.prototype.activateByWorkspaceContains = function (manager, plugin) {
        return __awaiter(this, void 0, void 0, function () {
            var activationEvents, paths, includePatterns, activationEvents_1, activationEvents_1_1, activationEvent, fileNameOrGlob, activatePlugin, promises, tokenSource_1, searchTimeout_1, _a;
            var e_12, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        activationEvents = plugin.contributes && plugin.contributes.activationEvents;
                        if (!activationEvents) {
                            return [2 /*return*/];
                        }
                        paths = [];
                        includePatterns = [];
                        try {
                            // should be aligned with https://github.com/microsoft/vscode/blob/da5fb7d5b865aa522abc7e82c10b746834b98639/src/vs/workbench/api/node/extHostExtensionService.ts#L460-L469
                            for (activationEvents_1 = __values(activationEvents), activationEvents_1_1 = activationEvents_1.next(); !activationEvents_1_1.done; activationEvents_1_1 = activationEvents_1.next()) {
                                activationEvent = activationEvents_1_1.value;
                                if (/^workspaceContains:/.test(activationEvent)) {
                                    fileNameOrGlob = activationEvent.substr('workspaceContains:'.length);
                                    if (fileNameOrGlob.indexOf('*') >= 0 || fileNameOrGlob.indexOf('?') >= 0) {
                                        includePatterns.push(fileNameOrGlob);
                                    }
                                    else {
                                        paths.push(fileNameOrGlob);
                                    }
                                }
                            }
                        }
                        catch (e_12_1) { e_12 = { error: e_12_1 }; }
                        finally {
                            try {
                                if (activationEvents_1_1 && !activationEvents_1_1.done && (_b = activationEvents_1.return)) _b.call(activationEvents_1);
                            }
                            finally { if (e_12) throw e_12.error; }
                        }
                        activatePlugin = function () { return manager.$activateByEvent("onPlugin:" + plugin.metadata.model.id); };
                        promises = [];
                        if (paths.length) {
                            promises.push(this.workspaceService.containsSome(paths));
                        }
                        if (includePatterns.length) {
                            tokenSource_1 = new core_1.CancellationTokenSource();
                            searchTimeout_1 = setTimeout(function () {
                                tokenSource_1.cancel();
                                // activate eagerly if took to long to search
                                activatePlugin();
                            }, 7000);
                            promises.push((function () { return __awaiter(_this, void 0, void 0, function () {
                                var result, e_13;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, 3, 4]);
                                            return [4 /*yield*/, this.fileSearchService.find('', {
                                                    rootUris: this.workspaceService.tryGetRoots().map(function (r) { return r.resource.toString(); }),
                                                    includePatterns: includePatterns,
                                                    limit: 1
                                                }, tokenSource_1.token)];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/, result.length > 0];
                                        case 2:
                                            e_13 = _a.sent();
                                            if (!core_2.isCancelled(e_13)) {
                                                console.error(e_13);
                                            }
                                            return [2 /*return*/, false];
                                        case 3:
                                            clearTimeout(searchTimeout_1);
                                            return [7 /*endfinally*/];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })());
                        }
                        _a = promises.length;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(promises).then(function (exists) { return exists.some(function (v) { return v; }); })];
                    case 1:
                        _a = (_c.sent());
                        _c.label = 2;
                    case 2:
                        if (!_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, activatePlugin()];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginSupport.prototype.activatePlugin = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var activation, _a, _b, manager;
            var e_14, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        activation = [];
                        try {
                            for (_a = __values(this.managers.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                                manager = _b.value;
                                activation.push(manager.$activatePlugin(id));
                            }
                        }
                        catch (e_14_1) { e_14 = { error: e_14_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_14) throw e_14.error; }
                        }
                        return [4 /*yield*/, Promise.all(activation)];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginSupport.prototype.createMeasurement = function (name) {
        var startMarker = name + "-start";
        var endMarker = name + "-end";
        performance.clearMeasures(name);
        performance.clearMarks(startMarker);
        performance.clearMarks(endMarker);
        performance.mark(startMarker);
        return function () {
            performance.mark(endMarker);
            performance.measure(name, startMarker, endMarker);
            var entries = performance.getEntriesByName(name);
            var duration = entries.length > 0 ? entries[0].duration : Number.NaN;
            performance.clearMeasures(name);
            performance.clearMarks(startMarker);
            performance.clearMarks(endMarker);
            return duration;
        };
    };
    HostedPluginSupport.prototype.logMeasurement = function (prefix, count, measurement) {
        var duration = measurement();
        if (duration === Number.NaN) {
            // Measurement was prevented by native API, do not log NaN duration
            return;
        }
        var pluginCount = count + " plugin" + (count === 1 ? '' : 's');
        console.log("[" + this.clientId + "] " + prefix + " of " + pluginCount + " took: " + duration.toFixed(1) + " ms");
    };
    HostedPluginSupport.prototype.registerWebviewReviver = function (viewType, reviver) {
        if (this.webviewRevivers.has(viewType)) {
            throw new Error("Reviver for " + viewType + " already registered");
        }
        this.webviewRevivers.set(viewType, reviver);
    };
    HostedPluginSupport.prototype.unregisterWebviewReviver = function (viewType) {
        this.webviewRevivers.delete(viewType);
    };
    HostedPluginSupport.prototype.preserveWebviews = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, webview, _c, _d, webview;
            var e_15, _e, e_16, _f;
            return __generator(this, function (_g) {
                try {
                    for (_a = __values(this.widgets.getWidgets(webview_1.WebviewWidget.FACTORY_ID)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        webview = _b.value;
                        this.preserveWebview(webview);
                    }
                }
                catch (e_15_1) { e_15 = { error: e_15_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                    }
                    finally { if (e_15) throw e_15.error; }
                }
                try {
                    for (_c = __values(this.widgets.getWidgets(custom_editor_widget_1.CustomEditorWidget.FACTORY_ID)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        webview = _d.value;
                        webview.modelRef.dispose();
                        if (webview['closeWithoutSaving']) {
                            delete webview['closeWithoutSaving'];
                        }
                        this.customEditorRegistry.resolveWidget(webview);
                    }
                }
                catch (e_16_1) { e_16 = { error: e_16_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                    }
                    finally { if (e_16) throw e_16.error; }
                }
                return [2 /*return*/];
            });
        });
    };
    HostedPluginSupport.prototype.preserveWebview = function (webview) {
        var _this = this;
        if (!this.webviewsToRestore.has(webview)) {
            this.webviewsToRestore.add(webview);
            webview.disposed.connect(function () { return _this.webviewsToRestore.delete(webview); });
        }
    };
    HostedPluginSupport.prototype.restoreWebviews = function () {
        var e_17, _a;
        try {
            for (var _b = __values(this.webviewsToRestore), _c = _b.next(); !_c.done; _c = _b.next()) {
                var webview = _c.value;
                this.restoreWebview(webview);
            }
        }
        catch (e_17_1) { e_17 = { error: e_17_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_17) throw e_17.error; }
        }
        this.webviewsToRestore.clear();
    };
    HostedPluginSupport.prototype.restoreWebview = function (webview) {
        return __awaiter(this, void 0, void 0, function () {
            var restore, e_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.activateByEvent("onWebviewPanel:" + webview.viewType)];
                    case 1:
                        _a.sent();
                        restore = this.webviewRevivers.get(webview.viewType);
                        if (!restore) {
                            /* eslint-disable max-len */
                            webview.setHTML(this.getDeserializationFailedContents("\n            <p>The extension providing '" + webview.viewType + "' view is not capable of restoring it.</p>\n            <p>Want to help fix this? Please inform the extension developer to register a <a href=\"https://code.visualstudio.com/api/extension-guides/webview#serialization\">reviver</a>.</p>\n            "));
                            /* eslint-enable max-len */
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, restore(webview)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_18 = _a.sent();
                        webview.setHTML(this.getDeserializationFailedContents("\n            An error occurred while restoring '" + webview.viewType + "' view. Please check logs.\n            "));
                        console.error('Failed to restore the webview', e_18);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginSupport.prototype.getDeserializationFailedContents = function (message) {
        return "<!DOCTYPE html>\n        <html>\n            <head>\n                <meta http-equiv=\"Content-type\" content=\"text/html;charset=UTF-8\">\n                <meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none';\">\n            </head>\n            <body>" + message + "</body>\n        </html>";
    };
    __decorate([
        inversify_1.inject(core_1.ILogger),
        __metadata("design:type", Object)
    ], HostedPluginSupport.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(plugin_protocol_1.HostedPluginServer),
        __metadata("design:type", Object)
    ], HostedPluginSupport.prototype, "server", void 0);
    __decorate([
        inversify_1.inject(hosted_plugin_watcher_1.HostedPluginWatcher),
        __metadata("design:type", hosted_plugin_watcher_1.HostedPluginWatcher)
    ], HostedPluginSupport.prototype, "watcher", void 0);
    __decorate([
        inversify_1.inject(plugin_contribution_handler_1.PluginContributionHandler),
        __metadata("design:type", plugin_contribution_handler_1.PluginContributionHandler)
    ], HostedPluginSupport.prototype, "contributionHandler", void 0);
    __decorate([
        inversify_1.inject(core_1.ContributionProvider),
        inversify_1.named(plugin_ext_api_contribution_1.MainPluginApiProvider),
        __metadata("design:type", Object)
    ], HostedPluginSupport.prototype, "mainPluginApiProviders", void 0);
    __decorate([
        inversify_1.inject(plugin_protocol_2.PluginServer),
        __metadata("design:type", Object)
    ], HostedPluginSupport.prototype, "pluginServer", void 0);
    __decorate([
        inversify_1.inject(preferences_1.PreferenceProviderProvider),
        __metadata("design:type", Function)
    ], HostedPluginSupport.prototype, "preferenceProviderProvider", void 0);
    __decorate([
        inversify_1.inject(preferences_1.PreferenceServiceImpl),
        __metadata("design:type", preferences_1.PreferenceServiceImpl)
    ], HostedPluginSupport.prototype, "preferenceServiceImpl", void 0);
    __decorate([
        inversify_1.inject(plugin_paths_protocol_1.PluginPathsService),
        __metadata("design:type", Object)
    ], HostedPluginSupport.prototype, "pluginPathsService", void 0);
    __decorate([
        inversify_1.inject(browser_1.WorkspaceService),
        __metadata("design:type", browser_1.WorkspaceService)
    ], HostedPluginSupport.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(core_1.CommandRegistry),
        __metadata("design:type", core_1.CommandRegistry)
    ], HostedPluginSupport.prototype, "commands", void 0);
    __decorate([
        inversify_1.inject(debug_session_manager_1.DebugSessionManager),
        __metadata("design:type", debug_session_manager_1.DebugSessionManager)
    ], HostedPluginSupport.prototype, "debugSessionManager", void 0);
    __decorate([
        inversify_1.inject(debug_configuration_manager_1.DebugConfigurationManager),
        __metadata("design:type", debug_configuration_manager_1.DebugConfigurationManager)
    ], HostedPluginSupport.prototype, "debugConfigurationManager", void 0);
    __decorate([
        inversify_1.inject(file_service_1.FileService),
        __metadata("design:type", file_service_1.FileService)
    ], HostedPluginSupport.prototype, "fileService", void 0);
    __decorate([
        inversify_1.inject(file_search_service_1.FileSearchService),
        __metadata("design:type", Object)
    ], HostedPluginSupport.prototype, "fileSearchService", void 0);
    __decorate([
        inversify_1.inject(frontend_application_state_1.FrontendApplicationStateService),
        __metadata("design:type", frontend_application_state_1.FrontendApplicationStateService)
    ], HostedPluginSupport.prototype, "appState", void 0);
    __decorate([
        inversify_1.inject(plugin_view_registry_1.PluginViewRegistry),
        __metadata("design:type", plugin_view_registry_1.PluginViewRegistry)
    ], HostedPluginSupport.prototype, "viewRegistry", void 0);
    __decorate([
        inversify_1.inject(task_contribution_1.TaskProviderRegistry),
        __metadata("design:type", task_contribution_1.TaskProviderRegistry)
    ], HostedPluginSupport.prototype, "taskProviderRegistry", void 0);
    __decorate([
        inversify_1.inject(task_contribution_1.TaskResolverRegistry),
        __metadata("design:type", task_contribution_1.TaskResolverRegistry)
    ], HostedPluginSupport.prototype, "taskResolverRegistry", void 0);
    __decorate([
        inversify_1.inject(core_1.ProgressService),
        __metadata("design:type", core_1.ProgressService)
    ], HostedPluginSupport.prototype, "progressService", void 0);
    __decorate([
        inversify_1.inject(webview_environment_1.WebviewEnvironment),
        __metadata("design:type", webview_environment_1.WebviewEnvironment)
    ], HostedPluginSupport.prototype, "webviewEnvironment", void 0);
    __decorate([
        inversify_1.inject(widget_manager_1.WidgetManager),
        __metadata("design:type", widget_manager_1.WidgetManager)
    ], HostedPluginSupport.prototype, "widgets", void 0);
    __decorate([
        inversify_1.inject(terminal_service_1.TerminalService),
        __metadata("design:type", Object)
    ], HostedPluginSupport.prototype, "terminalService", void 0);
    __decorate([
        inversify_1.inject(env_variables_1.EnvVariablesServer),
        __metadata("design:type", Object)
    ], HostedPluginSupport.prototype, "envServer", void 0);
    __decorate([
        inversify_1.inject(json_schema_store_1.JsonSchemaStore),
        __metadata("design:type", json_schema_store_1.JsonSchemaStore)
    ], HostedPluginSupport.prototype, "jsonSchemaStore", void 0);
    __decorate([
        inversify_1.inject(plugin_custom_editor_registry_1.PluginCustomEditorRegistry),
        __metadata("design:type", plugin_custom_editor_registry_1.PluginCustomEditorRegistry)
    ], HostedPluginSupport.prototype, "customEditorRegistry", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], HostedPluginSupport.prototype, "init", null);
    HostedPluginSupport = __decorate([
        inversify_1.injectable()
    ], HostedPluginSupport);
    return HostedPluginSupport;
}());
exports.HostedPluginSupport = HostedPluginSupport;
var PluginContributions = /** @class */ (function (_super) {
    __extends(PluginContributions, _super);
    function PluginContributions(plugin) {
        var _this = _super.call(this) || this;
        _this.plugin = plugin;
        _this.state = PluginContributions.State.INITIALIZING;
        return _this;
    }
    return PluginContributions;
}(core_1.DisposableCollection));
exports.PluginContributions = PluginContributions;
(function (PluginContributions) {
    var State;
    (function (State) {
        State[State["INITIALIZING"] = 0] = "INITIALIZING";
        State[State["LOADING"] = 1] = "LOADING";
        State[State["LOADED"] = 2] = "LOADED";
        State[State["STARTING"] = 3] = "STARTING";
        State[State["STARTED"] = 4] = "STARTED";
    })(State = PluginContributions.State || (PluginContributions.State = {}));
})(PluginContributions = exports.PluginContributions || (exports.PluginContributions = {}));
exports.PluginContributions = PluginContributions;
//# sourceMappingURL=hosted-plugin.js.map