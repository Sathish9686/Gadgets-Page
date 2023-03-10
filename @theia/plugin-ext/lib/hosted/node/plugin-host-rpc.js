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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginHostRPC = void 0;
var plugin_manager_1 = require("../../plugin/plugin-manager");
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var plugin_context_1 = require("../../plugin/plugin-context");
var preference_registry_1 = require("../../plugin/preference-registry");
var debug_1 = require("../../plugin/node/debug/debug");
var editors_and_documents_1 = require("../../plugin/editors-and-documents");
var workspace_1 = require("../../plugin/workspace");
var message_registry_1 = require("../../plugin/message-registry");
var env_node_ext_1 = require("../../plugin/node/env-node-ext");
var clipboard_ext_1 = require("../../plugin/clipboard-ext");
var plugin_manifest_loader_1 = require("./plugin-manifest-loader");
var plugin_storage_1 = require("../../plugin/plugin-storage");
var webviews_1 = require("../../plugin/webviews");
var terminal_ext_1 = require("../../plugin/terminal-ext");
/**
 * Handle the RPC calls.
 */
var PluginHostRPC = /** @class */ (function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function PluginHostRPC(rpc) {
        this.rpc = rpc;
    }
    PluginHostRPC.prototype.initialize = function () {
        var envExt = new env_node_ext_1.EnvNodeExtImpl(this.rpc);
        var storageProxy = new plugin_storage_1.KeyValueStorageProxy(this.rpc);
        var debugExt = new debug_1.DebugExtImpl(this.rpc);
        var editorsAndDocumentsExt = new editors_and_documents_1.EditorsAndDocumentsExtImpl(this.rpc);
        var messageRegistryExt = new message_registry_1.MessageRegistryExt(this.rpc);
        var workspaceExt = new workspace_1.WorkspaceExtImpl(this.rpc, editorsAndDocumentsExt, messageRegistryExt);
        var preferenceRegistryExt = new preference_registry_1.PreferenceRegistryExtImpl(this.rpc, workspaceExt);
        var clipboardExt = new clipboard_ext_1.ClipboardExt(this.rpc);
        var webviewExt = new webviews_1.WebviewsExtImpl(this.rpc, workspaceExt);
        var terminalService = new terminal_ext_1.TerminalServiceExtImpl(this.rpc);
        this.pluginManager = this.createPluginManager(envExt, terminalService, storageProxy, preferenceRegistryExt, webviewExt, this.rpc);
        this.rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.HOSTED_PLUGIN_MANAGER_EXT, this.pluginManager);
        this.rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.EDITORS_AND_DOCUMENTS_EXT, editorsAndDocumentsExt);
        this.rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.WORKSPACE_EXT, workspaceExt);
        this.rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.PREFERENCE_REGISTRY_EXT, preferenceRegistryExt);
        this.rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.STORAGE_EXT, storageProxy);
        this.rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.WEBVIEWS_EXT, webviewExt);
        this.apiFactory = plugin_context_1.createAPIFactory(this.rpc, this.pluginManager, envExt, debugExt, preferenceRegistryExt, editorsAndDocumentsExt, workspaceExt, messageRegistryExt, clipboardExt, webviewExt);
    };
    PluginHostRPC.prototype.terminate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pluginManager.terminate()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PluginHostRPC.prototype.initContext = function (contextPath, plugin) {
        var _a = plugin.rawModel, name = _a.name, version = _a.version;
        console.log('PLUGIN_HOST(' + process.pid + '): initializing(' + name + '@' + version + ' with ' + contextPath + ')');
        try {
            var backendInit = require(contextPath);
            backendInit.doInitialization(this.apiFactory, plugin);
        }
        catch (e) {
            console.error(e);
        }
    };
    PluginHostRPC.prototype.createPluginManager = function (envExt, terminalService, storageProxy, preferencesManager, webview, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rpc) {
        var _this = this;
        var extensionTestsPath = process.env.extensionTestsPath;
        var self = this;
        var pluginManager = new plugin_manager_1.PluginManagerExtImpl({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            loadPlugin: function (plugin) {
                console.log('PLUGIN_HOST(' + process.pid + '): PluginManagerExtImpl/loadPlugin(' + plugin.pluginPath + ')');
                // cleaning the cache for all files of that plug-in.
                Object.keys(require.cache).forEach(function (key) {
                    var mod = require.cache[key];
                    // attempting to reload a native module will throw an error, so skip them
                    if (mod.id.endsWith('.node')) {
                        return;
                    }
                    // remove children that are part of the plug-in
                    var i = mod.children.length;
                    while (i--) {
                        var childMod = mod.children[i];
                        // ensure the child module is not null, is in the plug-in folder, and is not a native module (see above)
                        if (childMod && childMod.id.startsWith(plugin.pluginFolder) && !childMod.id.endsWith('.node')) {
                            // cleanup exports - note that some modules (e.g. ansi-styles) define their
                            // exports in an immutable manner, so overwriting the exports throws an error
                            delete childMod.exports;
                            mod.children.splice(i, 1);
                            for (var j = 0; j < childMod.children.length; j++) {
                                delete childMod.children[j];
                            }
                        }
                    }
                    if (key.startsWith(plugin.pluginFolder)) {
                        // delete entry
                        delete require.cache[key];
                        var ix = mod.parent.children.indexOf(mod);
                        if (ix >= 0) {
                            mod.parent.children.splice(ix, 1);
                        }
                    }
                });
                if (plugin.pluginPath) {
                    return require(plugin.pluginPath);
                }
            },
            init: function (raw) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, foreign, raw_1, raw_1_1, plg, pluginModel, pluginLifecycle, rawModel, backendInitPath, plugin, e_1, e_2_1;
                    var e_2, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                console.log('PLUGIN_HOST(' + process.pid + '): PluginManagerExtImpl/init()');
                                result = [];
                                foreign = [];
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 8, 9, 10]);
                                raw_1 = __values(raw), raw_1_1 = raw_1.next();
                                _b.label = 2;
                            case 2:
                                if (!!raw_1_1.done) return [3 /*break*/, 7];
                                plg = raw_1_1.value;
                                _b.label = 3;
                            case 3:
                                _b.trys.push([3, 5, , 6]);
                                pluginModel = plg.model;
                                pluginLifecycle = plg.lifecycle;
                                return [4 /*yield*/, plugin_manifest_loader_1.loadManifest(pluginModel.packagePath)];
                            case 4:
                                rawModel = _b.sent();
                                rawModel.packagePath = pluginModel.packagePath;
                                if (pluginModel.entryPoint.frontend) {
                                    foreign.push({
                                        pluginPath: pluginModel.entryPoint.frontend,
                                        pluginFolder: pluginModel.packagePath,
                                        model: pluginModel,
                                        lifecycle: pluginLifecycle,
                                        rawModel: rawModel
                                    });
                                }
                                else {
                                    backendInitPath = pluginLifecycle.backendInitPath;
                                    // if no init path, try to init as regular Theia plugin
                                    if (!backendInitPath) {
                                        backendInitPath = __dirname + '/scanners/backend-init-theia.js';
                                    }
                                    plugin = {
                                        pluginPath: pluginModel.entryPoint.backend,
                                        pluginFolder: pluginModel.packagePath,
                                        model: pluginModel,
                                        lifecycle: pluginLifecycle,
                                        rawModel: rawModel
                                    };
                                    self.initContext(backendInitPath, plugin);
                                    result.push(plugin);
                                }
                                return [3 /*break*/, 6];
                            case 5:
                                e_1 = _b.sent();
                                console.error("Failed to initialize " + plg.model.id + " plugin.", e_1);
                                return [3 /*break*/, 6];
                            case 6:
                                raw_1_1 = raw_1.next();
                                return [3 /*break*/, 2];
                            case 7: return [3 /*break*/, 10];
                            case 8:
                                e_2_1 = _b.sent();
                                e_2 = { error: e_2_1 };
                                return [3 /*break*/, 10];
                            case 9:
                                try {
                                    if (raw_1_1 && !raw_1_1.done && (_a = raw_1.return)) _a.call(raw_1);
                                }
                                finally { if (e_2) throw e_2.error; }
                                return [7 /*endfinally*/];
                            case 10: return [2 /*return*/, [result, foreign]];
                        }
                    });
                });
            },
            initExtApi: function (extApi) {
                var e_3, _a;
                try {
                    for (var extApi_1 = __values(extApi), extApi_1_1 = extApi_1.next(); !extApi_1_1.done; extApi_1_1 = extApi_1.next()) {
                        var api = extApi_1_1.value;
                        if (api.backendInitPath) {
                            try {
                                var extApiInit = require(api.backendInitPath);
                                extApiInit.provideApi(rpc, pluginManager);
                            }
                            catch (e) {
                                console.error(e);
                            }
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (extApi_1_1 && !extApi_1_1.done && (_a = extApi_1.return)) _a.call(extApi_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            },
            loadTests: extensionTestsPath ? function () { return __awaiter(_this, void 0, void 0, function () {
                var testRunner, requireError;
                return __generator(this, function (_a) {
                    try {
                        testRunner = require(extensionTestsPath);
                    }
                    catch (error) {
                        requireError = error;
                    }
                    // Execute the runner if it follows our spec
                    if (testRunner && typeof testRunner.run === 'function') {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                testRunner.run(extensionTestsPath, function (error) {
                                    if (error) {
                                        reject(error.toString());
                                    }
                                    else {
                                        resolve(undefined);
                                    }
                                });
                            })];
                    }
                    throw new Error(requireError ?
                        requireError.toString() :
                        "Path " + extensionTestsPath + " does not point to a valid extension test runner.");
                });
            }); } : undefined
        }, envExt, terminalService, storageProxy, preferencesManager, webview, rpc);
        return pluginManager;
    };
    return PluginHostRPC;
}());
exports.PluginHostRPC = PluginHostRPC;
//# sourceMappingURL=plugin-host-rpc.js.map