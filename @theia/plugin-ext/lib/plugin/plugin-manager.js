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
exports.PluginManagerExtImpl = void 0;
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var path_1 = require("path");
var plugin_storage_1 = require("./plugin-storage");
var event_1 = require("@theia/core/lib/common/event");
var ActivatedPlugin = /** @class */ (function () {
    function ActivatedPlugin(pluginContext, exports, stopFn) {
        this.pluginContext = pluginContext;
        this.exports = exports;
        this.stopFn = stopFn;
    }
    return ActivatedPlugin;
}());
var PluginManagerExtImpl = /** @class */ (function () {
    function PluginManagerExtImpl(host, envExt, terminalService, storageProxy, preferencesManager, webview, rpc) {
        this.host = host;
        this.envExt = envExt;
        this.terminalService = terminalService;
        this.storageProxy = storageProxy;
        this.preferencesManager = preferencesManager;
        this.webview = webview;
        this.rpc = rpc;
        this.registry = new Map();
        this.activations = new Map();
        /** promises to whether loading each plugin has been successful */
        this.loadedPlugins = new Map();
        this.activatedPlugins = new Map();
        this.pluginContextsMap = new Map();
        this.onDidChangeEmitter = new event_1.Emitter();
        this.jsonValidation = [];
        this.messageRegistryProxy = this.rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.MESSAGE_REGISTRY_MAIN);
        this.notificationMain = this.rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.NOTIFICATION_MAIN);
    }
    PluginManagerExtImpl.prototype.fireOnDidChange = function () {
        this.onDidChangeEmitter.fire(undefined);
    };
    PluginManagerExtImpl.prototype.$stop = function (pluginId) {
        return __awaiter(this, void 0, void 0, function () {
            var plugin;
            return __generator(this, function (_a) {
                if (!pluginId) {
                    return [2 /*return*/, this.stopAll()];
                }
                this.registry.delete(pluginId);
                this.pluginContextsMap.delete(pluginId);
                this.loadedPlugins.delete(pluginId);
                plugin = this.activatedPlugins.get(pluginId);
                if (!plugin) {
                    return [2 /*return*/];
                }
                this.activatedPlugins.delete(pluginId);
                return [2 /*return*/, this.stopPlugin(pluginId, plugin)];
            });
        });
    };
    PluginManagerExtImpl.prototype.terminate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.stopAll({ terminating: true })];
            });
        });
    };
    PluginManagerExtImpl.prototype.stopAll = function (options) {
        if (options === void 0) { options = { terminating: false }; }
        return __awaiter(this, void 0, void 0, function () {
            var promises, _a, _b, _c, id, plugin;
            var e_1, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        promises = [];
                        try {
                            for (_a = __values(this.activatedPlugins), _b = _a.next(); !_b.done; _b = _a.next()) {
                                _c = __read(_b.value, 2), id = _c[0], plugin = _c[1];
                                promises.push(this.stopPlugin(id, plugin, options));
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        this.registry.clear();
                        this.loadedPlugins.clear();
                        this.activatedPlugins.clear();
                        this.pluginContextsMap.clear();
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginManagerExtImpl.prototype.stopPlugin = function (id, plugin, options) {
        if (options === void 0) { options = { terminating: false }; }
        return __awaiter(this, void 0, void 0, function () {
            var result, pluginContext, _a, _b, subscription, e_2;
            var e_3, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (plugin.stopFn) {
                            try {
                                result = plugin.stopFn();
                            }
                            catch (e) {
                                if (!options.terminating) {
                                    console.error("[" + id + "]: failed to stop:", e);
                                }
                            }
                        }
                        pluginContext = plugin.pluginContext;
                        if (pluginContext) {
                            try {
                                for (_a = __values(pluginContext.subscriptions), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    subscription = _b.value;
                                    try {
                                        subscription.dispose();
                                    }
                                    catch (e) {
                                        if (!options.terminating) {
                                            console.error("[" + id + "]: failed to dispose subscription:", e);
                                        }
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
                        }
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, result];
                    case 2:
                        _d.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _d.sent();
                        if (!options.terminating) {
                            console.error("[" + id + "]: failed to stop:", e_2);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PluginManagerExtImpl.prototype.$init = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.storageProxy.init(params.globalState, params.workspaceState);
                this.envExt.setQueryParameters(params.env.queryParams);
                this.envExt.setLanguage(params.env.language);
                this.envExt.setShell(params.env.shell);
                this.envExt.setUIKind(params.env.uiKind);
                this.envExt.setApplicationName(params.env.appName);
                this.preferencesManager.init(params.preferences);
                if (params.extApi) {
                    this.host.initExtApi(params.extApi);
                }
                this.webview.init(params.webview);
                this.jsonValidation = params.jsonValidation;
                return [2 /*return*/];
            });
        });
    };
    PluginManagerExtImpl.prototype.$start = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, plugins, foreignPlugins, foreignPlugins_1, foreignPlugins_1_1, plugin, plugins_1, plugins_1_1, plugin, _b, _c, activationEvent, e_4_1;
            var e_5, _d, e_6, _e, e_4, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        this.configStorage = params.configStorage;
                        return [4 /*yield*/, this.host.init(params.plugins)];
                    case 1:
                        _a = __read.apply(void 0, [_g.sent(), 2]), plugins = _a[0], foreignPlugins = _a[1];
                        try {
                            // add foreign plugins
                            for (foreignPlugins_1 = __values(foreignPlugins), foreignPlugins_1_1 = foreignPlugins_1.next(); !foreignPlugins_1_1.done; foreignPlugins_1_1 = foreignPlugins_1.next()) {
                                plugin = foreignPlugins_1_1.value;
                                this.registerPlugin(plugin);
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (foreignPlugins_1_1 && !foreignPlugins_1_1.done && (_d = foreignPlugins_1.return)) _d.call(foreignPlugins_1);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                        try {
                            // add own plugins, before initialization
                            for (plugins_1 = __values(plugins), plugins_1_1 = plugins_1.next(); !plugins_1_1.done; plugins_1_1 = plugins_1.next()) {
                                plugin = plugins_1_1.value;
                                this.registerPlugin(plugin);
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (plugins_1_1 && !plugins_1_1.done && (_e = plugins_1.return)) _e.call(plugins_1);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                        // run eager plugins
                        return [4 /*yield*/, this.$activateByEvent('*')];
                    case 2:
                        // run eager plugins
                        _g.sent();
                        _g.label = 3;
                    case 3:
                        _g.trys.push([3, 8, 9, 10]);
                        _b = __values(params.activationEvents), _c = _b.next();
                        _g.label = 4;
                    case 4:
                        if (!!_c.done) return [3 /*break*/, 7];
                        activationEvent = _c.value;
                        return [4 /*yield*/, this.$activateByEvent(activationEvent)];
                    case 5:
                        _g.sent();
                        _g.label = 6;
                    case 6:
                        _c = _b.next();
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_4_1 = _g.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_c && !_c.done && (_f = _b.return)) _f.call(_b);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        if (this.host.loadTests) {
                            return [2 /*return*/, this.host.loadTests()];
                        }
                        this.fireOnDidChange();
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginManagerExtImpl.prototype.registerPlugin = function (plugin) {
        var e_7, _a;
        var _this = this;
        if (plugin.model.id === 'vscode.json-language-features' && this.jsonValidation.length) {
            // VS Code contribute all built-in validations via vscode.json-language-features
            // we enrich them with Theia validations registered on the startup
            // dynamic validations can be provided only via VS Code extensions
            // content is fetched by the extension later via vscode.workspace.openTextDocument
            var contributes = plugin.rawModel.contributes = (plugin.rawModel.contributes || {});
            contributes.jsonValidation = (contributes.jsonValidation || []).concat(this.jsonValidation);
        }
        this.registry.set(plugin.model.id, plugin);
        if (plugin.pluginPath && Array.isArray(plugin.rawModel.activationEvents)) {
            var activation = function () { return _this.$activatePlugin(plugin.model.id); };
            // an internal activation event is a subject to change
            this.setActivation("onPlugin:" + plugin.model.id, activation);
            var unsupportedActivationEvents = plugin.rawModel.activationEvents.filter(function (e) { return !PluginManagerExtImpl.SUPPORTED_ACTIVATION_EVENTS.has(e.split(':')[0]); });
            if (unsupportedActivationEvents.length) {
                console.warn("Unsupported activation events: " + unsupportedActivationEvents.join(', ') + ", please open an issue: https://github.com/eclipse-theia/theia/issues/new");
            }
            try {
                for (var _b = __values(plugin.rawModel.activationEvents), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var activationEvent = _c.value;
                    if (activationEvent === 'onUri') {
                        activationEvent = "onUri:theia://" + plugin.model.id;
                    }
                    this.setActivation(activationEvent, activation);
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
    };
    PluginManagerExtImpl.prototype.setActivation = function (activationEvent, activation) {
        var activations = this.activations.get(activationEvent) || [];
        activations.push(activation);
        this.activations.set(activationEvent, activations);
    };
    PluginManagerExtImpl.prototype.loadPlugin = function (plugin, configStorage, visited) {
        if (visited === void 0) { visited = new Set(); }
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                // in order to break cycles
                if (visited.has(plugin.model.id)) {
                    return [2 /*return*/, true];
                }
                visited.add(plugin.model.id);
                loading = this.loadedPlugins.get(plugin.model.id);
                if (!loading) {
                    loading = (function () { return __awaiter(_this, void 0, void 0, function () {
                        var progressId, _a, _b, dependencyId, dependency, loadedSuccessfully, e_8_1, pluginMain, err_1, message;
                        var e_8, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0: return [4 /*yield*/, this.notificationMain.$startProgress({
                                        title: "Activating " + (plugin.model.displayName || plugin.model.name),
                                        location: 'window'
                                    })];
                                case 1:
                                    progressId = _d.sent();
                                    _d.label = 2;
                                case 2:
                                    _d.trys.push([2, 13, 14, 15]);
                                    if (!plugin.rawModel.extensionDependencies) return [3 /*break*/, 11];
                                    _d.label = 3;
                                case 3:
                                    _d.trys.push([3, 9, 10, 11]);
                                    _a = __values(plugin.rawModel.extensionDependencies), _b = _a.next();
                                    _d.label = 4;
                                case 4:
                                    if (!!_b.done) return [3 /*break*/, 8];
                                    dependencyId = _b.value;
                                    dependency = this.registry.get(dependencyId.toLowerCase());
                                    if (!dependency) return [3 /*break*/, 6];
                                    return [4 /*yield*/, this.loadPlugin(dependency, configStorage, visited)];
                                case 5:
                                    loadedSuccessfully = _d.sent();
                                    if (!loadedSuccessfully) {
                                        throw new Error("Dependent extension '" + (dependency.model.displayName || dependency.model.id) + "' failed to activate.");
                                    }
                                    return [3 /*break*/, 7];
                                case 6: throw new Error("Dependent extension '" + dependencyId + "' is not installed.");
                                case 7:
                                    _b = _a.next();
                                    return [3 /*break*/, 4];
                                case 8: return [3 /*break*/, 11];
                                case 9:
                                    e_8_1 = _d.sent();
                                    e_8 = { error: e_8_1 };
                                    return [3 /*break*/, 11];
                                case 10:
                                    try {
                                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                    }
                                    finally { if (e_8) throw e_8.error; }
                                    return [7 /*endfinally*/];
                                case 11:
                                    pluginMain = this.host.loadPlugin(plugin);
                                    // see https://github.com/TypeFox/vscode/blob/70b8db24a37fafc77247de7f7cb5bb0195120ed0/src/vs/workbench/api/common/extHostExtensionService.ts#L372-L376
                                    pluginMain = pluginMain || {};
                                    return [4 /*yield*/, this.startPlugin(plugin, configStorage, pluginMain)];
                                case 12:
                                    _d.sent();
                                    return [2 /*return*/, true];
                                case 13:
                                    err_1 = _d.sent();
                                    message = "Activating extension '" + (plugin.model.displayName || plugin.model.name) + "' failed:";
                                    this.messageRegistryProxy.$showMessage(plugin_api_rpc_1.MainMessageType.Error, message + ' ' + err_1.message, {}, []);
                                    console.error(message, err_1);
                                    return [2 /*return*/, false];
                                case 14:
                                    this.notificationMain.$stopProgress(progressId);
                                    return [7 /*endfinally*/];
                                case 15: return [2 /*return*/];
                            }
                        });
                    }); })();
                }
                this.loadedPlugins.set(plugin.model.id, loading);
                return [2 /*return*/, loading];
            });
        });
    };
    PluginManagerExtImpl.prototype.$updateStoragePath = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.configStorage) {
                    this.configStorage.hostStoragePath = path;
                }
                this.pluginContextsMap.forEach(function (pluginContext, pluginId) {
                    pluginContext.storagePath = path ? path_1.join(path, pluginId) : undefined;
                });
                return [2 /*return*/];
            });
        });
    };
    PluginManagerExtImpl.prototype.$activateByEvent = function (activationEvent) {
        return __awaiter(this, void 0, void 0, function () {
            var activations, pendingActivations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        activations = this.activations.get(activationEvent);
                        if (!activations) {
                            return [2 /*return*/];
                        }
                        this.activations.set(activationEvent, undefined);
                        pendingActivations = [];
                        while (activations.length) {
                            pendingActivations.push(activations.pop()());
                        }
                        return [4 /*yield*/, Promise.all(pendingActivations)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginManagerExtImpl.prototype.$activatePlugin = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var plugin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        plugin = this.registry.get(id);
                        if (!(plugin && this.configStorage)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadPlugin(plugin, this.configStorage)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PluginManagerExtImpl.prototype.startPlugin = function (plugin, configStorage, pluginMain) {
        return __awaiter(this, void 0, void 0, function () {
            var subscriptions, asAbsolutePath, logPath, storagePath, globalStoragePath, pluginContext, stopFn, id, pluginExport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subscriptions = [];
                        asAbsolutePath = function (relativePath) { return path_1.join(plugin.pluginFolder, relativePath); };
                        logPath = path_1.join(configStorage.hostLogPath, plugin.model.id);
                        storagePath = configStorage.hostStoragePath ? path_1.join(configStorage.hostStoragePath, plugin.model.id) : undefined;
                        globalStoragePath = path_1.join(configStorage.hostGlobalStoragePath, plugin.model.id);
                        pluginContext = {
                            extensionPath: plugin.pluginFolder,
                            globalState: new plugin_storage_1.Memento(plugin.model.id, true, this.storageProxy),
                            workspaceState: new plugin_storage_1.Memento(plugin.model.id, false, this.storageProxy),
                            subscriptions: subscriptions,
                            asAbsolutePath: asAbsolutePath,
                            logPath: logPath,
                            storagePath: storagePath,
                            globalStoragePath: globalStoragePath,
                            environmentVariableCollection: this.terminalService.getEnvironmentVariableCollection(plugin.model.id)
                        };
                        this.pluginContextsMap.set(plugin.model.id, pluginContext);
                        stopFn = undefined;
                        if (typeof pluginMain[plugin.lifecycle.stopMethod] === 'function') {
                            stopFn = pluginMain[plugin.lifecycle.stopMethod];
                        }
                        id = plugin.model.displayName || plugin.model.id;
                        if (!(typeof pluginMain[plugin.lifecycle.startMethod] === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, pluginMain[plugin.lifecycle.startMethod].apply(getGlobal(), [pluginContext])];
                    case 1:
                        pluginExport = _a.sent();
                        this.activatedPlugins.set(plugin.model.id, new ActivatedPlugin(pluginContext, pluginExport, stopFn));
                        return [3 /*break*/, 3];
                    case 2:
                        // https://github.com/TypeFox/vscode/blob/70b8db24a37fafc77247de7f7cb5bb0195120ed0/src/vs/workbench/api/common/extHostExtensionService.ts#L400-L401
                        console.log("plugin " + id + ", " + plugin.lifecycle.startMethod + " method is undefined so the module is the extension's exports");
                        this.activatedPlugins.set(plugin.model.id, new ActivatedPlugin(pluginContext, pluginMain));
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PluginManagerExtImpl.prototype.getAllPlugins = function () {
        return Array.from(this.registry.values());
    };
    PluginManagerExtImpl.prototype.getPluginExport = function (pluginId) {
        var activePlugin = this.activatedPlugins.get(pluginId);
        if (activePlugin) {
            return activePlugin.exports;
        }
        return undefined;
    };
    PluginManagerExtImpl.prototype.getPluginById = function (pluginId) {
        return this.registry.get(pluginId);
    };
    PluginManagerExtImpl.prototype.isRunning = function (pluginId) {
        return this.registry.has(pluginId);
    };
    PluginManagerExtImpl.prototype.isActive = function (pluginId) {
        return this.activatedPlugins.has(pluginId);
    };
    PluginManagerExtImpl.prototype.activatePlugin = function (pluginId) {
        return this.$activatePlugin(pluginId);
    };
    Object.defineProperty(PluginManagerExtImpl.prototype, "onDidChange", {
        get: function () {
            return this.onDidChangeEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    PluginManagerExtImpl.SUPPORTED_ACTIVATION_EVENTS = new Set([
        '*',
        'onLanguage',
        'onCommand',
        'onDebug', 'onDebugInitialConfigurations', 'onDebugResolve', 'onDebugAdapterProtocolTracker',
        'workspaceContains',
        'onView',
        'onUri',
        'onWebviewPanel',
        'onFileSystem',
        'onCustomEditor',
        'onStartupFinished'
    ]);
    return PluginManagerExtImpl;
}());
exports.PluginManagerExtImpl = PluginManagerExtImpl;
// for electron
function getGlobal() {
    return typeof self === 'undefined' ? typeof global === 'undefined' ? null : global : self;
}
//# sourceMappingURL=plugin-manager.js.map