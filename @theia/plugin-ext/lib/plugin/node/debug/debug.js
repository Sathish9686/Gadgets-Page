"use strict";
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
exports.DebugExtImpl = void 0;
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
var event_1 = require("@theia/core/lib/common/event");
var path_1 = require("@theia/core/lib/common/path");
var vscode_uri_1 = require("vscode-uri");
var plugin_api_rpc_1 = require("../../../common/plugin-api-rpc");
var connection_1 = require("../../../common/connection");
var types_impl_1 = require("../../types-impl");
var plugin_debug_adapter_executable_resolver_1 = require("./plugin-debug-adapter-executable-resolver");
var plugin_debug_adapter_session_1 = require("./plugin-debug-adapter-session");
var plugin_debug_adapter_starter_1 = require("./plugin-debug-adapter-starter");
var plugin_debug_adapter_tracker_1 = require("./plugin-debug-adapter-tracker");
var uuid = require("uuid");
/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: rename file to `debug-ext.ts`
/**
 * It is supposed to work at node only.
 */
var DebugExtImpl = /** @class */ (function () {
    function DebugExtImpl(rpc) {
        var _this = this;
        // debug sessions by sessionId
        this.sessions = new Map();
        // providers by type
        this.configurationProviders = new Map();
        /**
         * Only use internally, don't send it to the frontend. It's expensive!
         * It's already there as a part of the plugin metadata.
         */
        this.debuggersContributions = new Map();
        this.descriptorFactories = new Map();
        this.trackerFactories = [];
        this.contributionPaths = new Map();
        this.onDidChangeBreakpointsEmitter = new event_1.Emitter();
        this.onDidChangeActiveDebugSessionEmitter = new event_1.Emitter();
        this.onDidTerminateDebugSessionEmitter = new event_1.Emitter();
        this.onDidStartDebugSessionEmitter = new event_1.Emitter();
        this.onDidReceiveDebugSessionCustomEmitter = new event_1.Emitter();
        this._breakpoints = new Map();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.DEBUG_MAIN);
        this.activeDebugConsole = {
            append: function (value) { return _this.proxy.$appendToDebugConsole(value); },
            appendLine: function (value) { return _this.proxy.$appendLineToDebugConsole(value); }
        };
    }
    Object.defineProperty(DebugExtImpl.prototype, "breakpoints", {
        get: function () {
            return __spread(this._breakpoints.values());
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets dependencies.
     */
    DebugExtImpl.prototype.assistedInject = function (connectionExt, commandRegistryExt) {
        this.connectionExt = connectionExt;
        this.commandRegistryExt = commandRegistryExt;
    };
    /**
     * Registers contributions.
     * @param pluginFolder plugin folder path
     * @param contributions available debuggers contributions
     */
    DebugExtImpl.prototype.registerDebuggersContributions = function (pluginFolder, contributions) {
        var _this = this;
        contributions.forEach(function (contribution) {
            _this.contributionPaths.set(contribution.type, pluginFolder);
            _this.debuggersContributions.set(contribution.type, contribution);
            _this.proxy.$registerDebuggerContribution({
                type: contribution.type,
                label: contribution.label || contribution.type
            });
            console.log("Debugger contribution has been registered: " + contribution.type);
        });
    };
    Object.defineProperty(DebugExtImpl.prototype, "onDidReceiveDebugSessionCustomEvent", {
        get: function () {
            return this.onDidReceiveDebugSessionCustomEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DebugExtImpl.prototype, "onDidChangeActiveDebugSession", {
        get: function () {
            return this.onDidChangeActiveDebugSessionEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DebugExtImpl.prototype, "onDidTerminateDebugSession", {
        get: function () {
            return this.onDidTerminateDebugSessionEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DebugExtImpl.prototype, "onDidStartDebugSession", {
        get: function () {
            return this.onDidStartDebugSessionEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DebugExtImpl.prototype, "onDidChangeBreakpoints", {
        get: function () {
            return this.onDidChangeBreakpointsEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    DebugExtImpl.prototype.addBreakpoints = function (breakpoints) {
        var e_1, _a;
        var added = [];
        try {
            for (var breakpoints_1 = __values(breakpoints), breakpoints_1_1 = breakpoints_1.next(); !breakpoints_1_1.done; breakpoints_1_1 = breakpoints_1.next()) {
                var b = breakpoints_1_1.value;
                if (this._breakpoints.has(b.id)) {
                    continue;
                }
                this._breakpoints.set(b.id, b);
                added.push(b);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (breakpoints_1_1 && !breakpoints_1_1.done && (_a = breakpoints_1.return)) _a.call(breakpoints_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (added.length) {
            this.onDidChangeBreakpointsEmitter.fire({ added: added, removed: [], changed: [] });
            this.proxy.$addBreakpoints(added);
        }
    };
    DebugExtImpl.prototype.removeBreakpoints = function (breakpoints) {
        var e_2, _a;
        var removed = [];
        var removedIds = [];
        try {
            for (var breakpoints_2 = __values(breakpoints), breakpoints_2_1 = breakpoints_2.next(); !breakpoints_2_1.done; breakpoints_2_1 = breakpoints_2.next()) {
                var b = breakpoints_2_1.value;
                if (!this._breakpoints.has(b.id)) {
                    continue;
                }
                this._breakpoints.delete(b.id);
                removed.push(b);
                removedIds.push(b.id);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (breakpoints_2_1 && !breakpoints_2_1.done && (_a = breakpoints_2.return)) _a.call(breakpoints_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (removed.length) {
            this.onDidChangeBreakpointsEmitter.fire({ added: [], removed: removed, changed: [] });
            this.proxy.$removeBreakpoints(removedIds);
        }
    };
    DebugExtImpl.prototype.startDebugging = function (folder, nameOrConfiguration) {
        return this.proxy.$startDebugging(folder, nameOrConfiguration);
    };
    DebugExtImpl.prototype.registerDebugAdapterDescriptorFactory = function (debugType, factory) {
        var _this = this;
        if (this.descriptorFactories.has(debugType)) {
            throw new Error("Descriptor factory for " + debugType + " has been already registered");
        }
        this.descriptorFactories.set(debugType, factory);
        return types_impl_1.Disposable.create(function () { return _this.descriptorFactories.delete(debugType); });
    };
    DebugExtImpl.prototype.registerDebugAdapterTrackerFactory = function (debugType, factory) {
        var _this = this;
        if (!factory) {
            return types_impl_1.Disposable.create(function () { });
        }
        this.trackerFactories.push([debugType, factory]);
        return types_impl_1.Disposable.create(function () {
            _this.trackerFactories = _this.trackerFactories.filter(function (tuple) { return tuple[1] !== factory; });
        });
    };
    DebugExtImpl.prototype.registerDebugConfigurationProvider = function (debugType, provider) {
        var _this = this;
        console.log("Debug configuration provider has been registered: " + debugType);
        var providers = this.configurationProviders.get(debugType) || new Set();
        this.configurationProviders.set(debugType, providers);
        providers.add(provider);
        return types_impl_1.Disposable.create(function () {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            var providers = _this.configurationProviders.get(debugType);
            if (providers) {
                providers.delete(provider);
                if (providers.size === 0) {
                    _this.configurationProviders.delete(debugType);
                }
            }
        });
    };
    DebugExtImpl.prototype.$onSessionCustomEvent = function (sessionId, event, body) {
        return __awaiter(this, void 0, void 0, function () {
            var session;
            return __generator(this, function (_a) {
                session = this.sessions.get(sessionId);
                if (session) {
                    this.onDidReceiveDebugSessionCustomEmitter.fire({ event: event, body: body, session: session });
                }
                return [2 /*return*/];
            });
        });
    };
    DebugExtImpl.prototype.$sessionDidCreate = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var session;
            return __generator(this, function (_a) {
                session = this.sessions.get(sessionId);
                if (session) {
                    this.onDidStartDebugSessionEmitter.fire(session);
                }
                return [2 /*return*/];
            });
        });
    };
    DebugExtImpl.prototype.$sessionDidDestroy = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var session;
            return __generator(this, function (_a) {
                session = this.sessions.get(sessionId);
                if (session) {
                    this.onDidTerminateDebugSessionEmitter.fire(session);
                }
                return [2 /*return*/];
            });
        });
    };
    DebugExtImpl.prototype.$sessionDidChange = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.activeDebugSession = sessionId ? this.sessions.get(sessionId) : undefined;
                this.onDidChangeActiveDebugSessionEmitter.fire(this.activeDebugSession);
                return [2 /*return*/];
            });
        });
    };
    DebugExtImpl.prototype.$breakpointsDidChange = function (added, removed, changed) {
        return __awaiter(this, void 0, void 0, function () {
            var a, r, c, added_1, added_1_1, b, bExt, removed_1, removed_1_1, id, bExt, changed_1, changed_1_1, b, bExt, functionName, location_1, enabled, condition, hitCondition, logMessage, range;
            var e_3, _a, e_4, _b, e_5, _c;
            return __generator(this, function (_d) {
                a = [];
                r = [];
                c = [];
                try {
                    for (added_1 = __values(added), added_1_1 = added_1.next(); !added_1_1.done; added_1_1 = added_1.next()) {
                        b = added_1_1.value;
                        if (this._breakpoints.has(b.id)) {
                            continue;
                        }
                        bExt = this.toBreakpointExt(b);
                        if (bExt) {
                            this._breakpoints.set(bExt.id, bExt);
                            a.push(bExt);
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (added_1_1 && !added_1_1.done && (_a = added_1.return)) _a.call(added_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                try {
                    for (removed_1 = __values(removed), removed_1_1 = removed_1.next(); !removed_1_1.done; removed_1_1 = removed_1.next()) {
                        id = removed_1_1.value;
                        bExt = this._breakpoints.get(id);
                        if (bExt) {
                            this._breakpoints.delete(id);
                            r.push(bExt);
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (removed_1_1 && !removed_1_1.done && (_b = removed_1.return)) _b.call(removed_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                try {
                    for (changed_1 = __values(changed), changed_1_1 = changed_1.next(); !changed_1_1.done; changed_1_1 = changed_1.next()) {
                        b = changed_1_1.value;
                        bExt = this._breakpoints.get(b.id);
                        if (bExt) {
                            functionName = b.functionName, location_1 = b.location, enabled = b.enabled, condition = b.condition, hitCondition = b.hitCondition, logMessage = b.logMessage;
                            if (bExt instanceof types_impl_1.FunctionBreakpoint && functionName) {
                                Object.assign(bExt, { enabled: enabled, condition: condition, hitCondition: hitCondition, logMessage: logMessage, functionName: functionName });
                            }
                            else if (bExt instanceof types_impl_1.SourceBreakpoint && location_1) {
                                range = new types_impl_1.Range(location_1.range.startLineNumber, location_1.range.startColumn, location_1.range.endLineNumber, location_1.range.endColumn);
                                Object.assign(bExt, { enabled: enabled, condition: condition, hitCondition: hitCondition, logMessage: logMessage, location: new types_impl_1.Location(vscode_uri_1.URI.revive(location_1.uri), range) });
                            }
                            c.push(bExt);
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (changed_1_1 && !changed_1_1.done && (_c = changed_1.return)) _c.call(changed_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                this.onDidChangeBreakpointsEmitter.fire({ added: a, removed: r, changed: c });
                return [2 /*return*/];
            });
        });
    };
    DebugExtImpl.prototype.toBreakpointExt = function (_a) {
        var functionName = _a.functionName, location = _a.location, enabled = _a.enabled, condition = _a.condition, hitCondition = _a.hitCondition, logMessage = _a.logMessage;
        if (location) {
            var range = new types_impl_1.Range(location.range.startLineNumber, location.range.startColumn, location.range.endLineNumber, location.range.endColumn);
            return new types_impl_1.SourceBreakpoint(new types_impl_1.Location(vscode_uri_1.URI.revive(location.uri), range), enabled, condition, hitCondition, logMessage);
        }
        if (functionName) {
            return new types_impl_1.FunctionBreakpoint(functionName, enabled, condition, hitCondition, logMessage);
        }
        return undefined;
    };
    DebugExtImpl.prototype.$createDebugSession = function (debugConfiguration) {
        return __awaiter(this, void 0, void 0, function () {
            var sessionId, theiaSession, tracker, communicationProvider, debugAdapterSession, connection;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessionId = uuid.v4();
                        theiaSession = {
                            id: sessionId,
                            type: debugConfiguration.type,
                            name: debugConfiguration.name,
                            configuration: debugConfiguration,
                            customRequest: function (command, args) { return __awaiter(_this, void 0, void 0, function () {
                                var response;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, this.proxy.$customRequest(sessionId, command, args)];
                                        case 1:
                                            response = _b.sent();
                                            if (response && response.success) {
                                                return [2 /*return*/, response.body];
                                            }
                                            return [2 /*return*/, Promise.reject(new Error((_a = response.message) !== null && _a !== void 0 ? _a : 'custom request failed'))];
                                    }
                                });
                            }); }
                        };
                        return [4 /*yield*/, this.createDebugAdapterTracker(theiaSession)];
                    case 1:
                        tracker = _a.sent();
                        return [4 /*yield*/, this.createCommunicationProvider(theiaSession, debugConfiguration)];
                    case 2:
                        communicationProvider = _a.sent();
                        debugAdapterSession = new plugin_debug_adapter_session_1.PluginDebugAdapterSession(communicationProvider, tracker, theiaSession);
                        this.sessions.set(sessionId, debugAdapterSession);
                        return [4 /*yield*/, this.connectionExt.ensureConnection(sessionId)];
                    case 3:
                        connection = _a.sent();
                        debugAdapterSession.start(new connection_1.PluginWebSocketChannel(connection));
                        return [2 /*return*/, sessionId];
                }
            });
        });
    };
    DebugExtImpl.prototype.$terminateDebugSession = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var debugAdapterSession;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugAdapterSession = this.sessions.get(sessionId);
                        if (!debugAdapterSession) return [3 /*break*/, 2];
                        return [4 /*yield*/, debugAdapterSession.stop()];
                    case 1:
                        _a.sent();
                        this.sessions.delete(sessionId);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DebugExtImpl.prototype.$getTerminalCreationOptions = function (debugType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.doGetTerminalCreationOptions(debugType)];
            });
        });
    };
    DebugExtImpl.prototype.doGetTerminalCreationOptions = function (debugType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, undefined];
            });
        });
    };
    DebugExtImpl.prototype.$provideDebugConfigurations = function (debugType, workspaceFolderUri) {
        return __awaiter(this, void 0, void 0, function () {
            var result, providers, providers_1, providers_1_1, provider, _a, _b, e_6_1;
            var e_6, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        result = [];
                        providers = this.configurationProviders.get(debugType);
                        if (!providers) return [3 /*break*/, 8];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        providers_1 = __values(providers), providers_1_1 = providers_1.next();
                        _d.label = 2;
                    case 2:
                        if (!!providers_1_1.done) return [3 /*break*/, 5];
                        provider = providers_1_1.value;
                        if (!provider.provideDebugConfigurations) return [3 /*break*/, 4];
                        _b = (_a = result).concat;
                        return [4 /*yield*/, provider.provideDebugConfigurations(this.toWorkspaceFolder(workspaceFolderUri))];
                    case 3:
                        result = _b.apply(_a, [(_d.sent()) || []]);
                        _d.label = 4;
                    case 4:
                        providers_1_1 = providers_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_6_1 = _d.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (providers_1_1 && !providers_1_1.done && (_c = providers_1.return)) _c.call(providers_1);
                        }
                        finally { if (e_6) throw e_6.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, result];
                }
            });
        });
    };
    DebugExtImpl.prototype.$resolveDebugConfigurations = function (debugConfiguration, workspaceFolderUri) {
        return __awaiter(this, void 0, void 0, function () {
            var current, _a, _b, providers, providers_2, providers_2_1, provider, next, e_7, e_8_1, e_9_1;
            var e_9, _c, e_8, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        current = debugConfiguration;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 14, 15, 16]);
                        _a = __values([this.configurationProviders.get(debugConfiguration.type), this.configurationProviders.get('*')]), _b = _a.next();
                        _e.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 13];
                        providers = _b.value;
                        if (!providers) return [3 /*break*/, 12];
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, 10, 11, 12]);
                        providers_2 = (e_8 = void 0, __values(providers)), providers_2_1 = providers_2.next();
                        _e.label = 4;
                    case 4:
                        if (!!providers_2_1.done) return [3 /*break*/, 9];
                        provider = providers_2_1.value;
                        if (!provider.resolveDebugConfiguration) return [3 /*break*/, 8];
                        _e.label = 5;
                    case 5:
                        _e.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, provider.resolveDebugConfiguration(this.toWorkspaceFolder(workspaceFolderUri), current)];
                    case 6:
                        next = _e.sent();
                        if (next) {
                            current = next;
                        }
                        else {
                            return [2 /*return*/, current];
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        e_7 = _e.sent();
                        console.error(e_7);
                        return [3 /*break*/, 8];
                    case 8:
                        providers_2_1 = providers_2.next();
                        return [3 /*break*/, 4];
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        e_8_1 = _e.sent();
                        e_8 = { error: e_8_1 };
                        return [3 /*break*/, 12];
                    case 11:
                        try {
                            if (providers_2_1 && !providers_2_1.done && (_d = providers_2.return)) _d.call(providers_2);
                        }
                        finally { if (e_8) throw e_8.error; }
                        return [7 /*endfinally*/];
                    case 12:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 13: return [3 /*break*/, 16];
                    case 14:
                        e_9_1 = _e.sent();
                        e_9 = { error: e_9_1 };
                        return [3 /*break*/, 16];
                    case 15:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_9) throw e_9.error; }
                        return [7 /*endfinally*/];
                    case 16: return [2 /*return*/, current];
                }
            });
        });
    };
    DebugExtImpl.prototype.$resolveDebugConfigurationWithSubstitutedVariables = function (debugConfiguration, workspaceFolderUri) {
        return __awaiter(this, void 0, void 0, function () {
            var current, _a, _b, providers, providers_3, providers_3_1, provider, next, e_10, e_11_1, e_12_1;
            var e_12, _c, e_11, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        current = debugConfiguration;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 14, 15, 16]);
                        _a = __values([this.configurationProviders.get(debugConfiguration.type), this.configurationProviders.get('*')]), _b = _a.next();
                        _e.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 13];
                        providers = _b.value;
                        if (!providers) return [3 /*break*/, 12];
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, 10, 11, 12]);
                        providers_3 = (e_11 = void 0, __values(providers)), providers_3_1 = providers_3.next();
                        _e.label = 4;
                    case 4:
                        if (!!providers_3_1.done) return [3 /*break*/, 9];
                        provider = providers_3_1.value;
                        if (!provider.resolveDebugConfigurationWithSubstitutedVariables) return [3 /*break*/, 8];
                        _e.label = 5;
                    case 5:
                        _e.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, provider.resolveDebugConfigurationWithSubstitutedVariables(this.toWorkspaceFolder(workspaceFolderUri), current)];
                    case 6:
                        next = _e.sent();
                        if (next) {
                            current = next;
                        }
                        else {
                            return [2 /*return*/, current];
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        e_10 = _e.sent();
                        console.error(e_10);
                        return [3 /*break*/, 8];
                    case 8:
                        providers_3_1 = providers_3.next();
                        return [3 /*break*/, 4];
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        e_11_1 = _e.sent();
                        e_11 = { error: e_11_1 };
                        return [3 /*break*/, 12];
                    case 11:
                        try {
                            if (providers_3_1 && !providers_3_1.done && (_d = providers_3.return)) _d.call(providers_3);
                        }
                        finally { if (e_11) throw e_11.error; }
                        return [7 /*endfinally*/];
                    case 12:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 13: return [3 /*break*/, 16];
                    case 14:
                        e_12_1 = _e.sent();
                        e_12 = { error: e_12_1 };
                        return [3 /*break*/, 16];
                    case 15:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_12) throw e_12.error; }
                        return [7 /*endfinally*/];
                    case 16: return [2 /*return*/, current];
                }
            });
        });
    };
    DebugExtImpl.prototype.createDebugAdapterTracker = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, plugin_debug_adapter_tracker_1.PluginDebugAdapterTracker.create(session, this.trackerFactories)];
            });
        });
    };
    DebugExtImpl.prototype.createCommunicationProvider = function (session, debugConfiguration) {
        return __awaiter(this, void 0, void 0, function () {
            var executable, descriptorFactory, descriptor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolveDebugAdapterExecutable(debugConfiguration)];
                    case 1:
                        executable = _a.sent();
                        descriptorFactory = this.descriptorFactories.get(session.type);
                        if (!descriptorFactory) return [3 /*break*/, 3];
                        return [4 /*yield*/, descriptorFactory.createDebugAdapterDescriptor(session, executable)];
                    case 2:
                        descriptor = _a.sent();
                        if (descriptor) {
                            if ('port' in descriptor) {
                                return [2 /*return*/, plugin_debug_adapter_starter_1.connectDebugAdapter(descriptor)];
                            }
                            else {
                                return [2 /*return*/, plugin_debug_adapter_starter_1.startDebugAdapter(descriptor)];
                            }
                        }
                        _a.label = 3;
                    case 3:
                        if ('debugServer' in debugConfiguration) {
                            return [2 /*return*/, plugin_debug_adapter_starter_1.connectDebugAdapter({ port: debugConfiguration.debugServer })];
                        }
                        else {
                            if (!executable) {
                                throw new Error('It is not possible to provide debug adapter executable.');
                            }
                            return [2 /*return*/, plugin_debug_adapter_starter_1.startDebugAdapter(executable)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DebugExtImpl.prototype.resolveDebugAdapterExecutable = function (debugConfiguration) {
        return __awaiter(this, void 0, void 0, function () {
            var type, contribution, executable, contributionPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type = debugConfiguration.type;
                        contribution = this.debuggersContributions.get(type);
                        if (!contribution) return [3 /*break*/, 3];
                        if (!contribution.adapterExecutableCommand) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.commandRegistryExt.executeCommand(contribution.adapterExecutableCommand)];
                    case 1:
                        executable = _a.sent();
                        if (executable) {
                            return [2 /*return*/, executable];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        contributionPath = this.contributionPaths.get(type);
                        if (contributionPath) {
                            return [2 /*return*/, plugin_debug_adapter_executable_resolver_1.resolveDebugAdapterExecutable(contributionPath, contribution)];
                        }
                        _a.label = 3;
                    case 3: throw new Error("It is not possible to provide debug adapter executable for '" + debugConfiguration.type + "'.");
                }
            });
        });
    };
    DebugExtImpl.prototype.toWorkspaceFolder = function (folder) {
        if (!folder) {
            return undefined;
        }
        var uri = vscode_uri_1.URI.parse(folder);
        var path = new path_1.Path(uri.path);
        return {
            uri: uri,
            name: path.base,
            index: 0
        };
    };
    return DebugExtImpl;
}());
exports.DebugExtImpl = DebugExtImpl;
//# sourceMappingURL=debug.js.map