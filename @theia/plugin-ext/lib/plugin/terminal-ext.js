"use strict";
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
exports.PseudoTerminal = exports.TerminalExtImpl = exports.EnvironmentVariableCollection = exports.TerminalServiceExtImpl = void 0;
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
var uuid_1 = require("@phosphor/coreutils/lib/uuid");
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var event_1 = require("@theia/core/lib/common/event");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var types_impl_1 = require("./types-impl");
/**
 * Provides high level terminal plugin api to use in the Theia plugins.
 * This service allow(with help proxy) create and use terminal emulator.
 */
var TerminalServiceExtImpl = /** @class */ (function () {
    function TerminalServiceExtImpl(rpc) {
        this._terminals = new Map();
        this._pseudoTerminals = new Map();
        this.onDidCloseTerminalEmitter = new event_1.Emitter();
        this.onDidCloseTerminal = this.onDidCloseTerminalEmitter.event;
        this.onDidOpenTerminalEmitter = new event_1.Emitter();
        this.onDidOpenTerminal = this.onDidOpenTerminalEmitter.event;
        this.onDidChangeActiveTerminalEmitter = new event_1.Emitter();
        this.onDidChangeActiveTerminal = this.onDidChangeActiveTerminalEmitter.event;
        this.environmentVariableCollections = new Map();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.TERMINAL_MAIN);
    }
    Object.defineProperty(TerminalServiceExtImpl.prototype, "terminals", {
        get: function () {
            return __spread(this._terminals.values());
        },
        enumerable: false,
        configurable: true
    });
    TerminalServiceExtImpl.prototype.createTerminal = function (nameOrOptions, shellPath, shellArgs) {
        var options;
        var pseudoTerminal = undefined;
        var id = "plugin-terminal-" + uuid_1.UUID.uuid4();
        if (typeof nameOrOptions === 'object') {
            if ('pty' in nameOrOptions) {
                pseudoTerminal = nameOrOptions.pty;
                options = {
                    name: nameOrOptions.name,
                };
                this._pseudoTerminals.set(id, new PseudoTerminal(id, this.proxy, pseudoTerminal));
            }
            else {
                options = nameOrOptions;
            }
        }
        else {
            options = {
                name: nameOrOptions,
                shellPath: shellPath,
                shellArgs: shellArgs
            };
        }
        this.proxy.$createTerminal(id, options, !!pseudoTerminal);
        return this.obtainTerminal(id, options.name || 'Terminal');
    };
    TerminalServiceExtImpl.prototype.obtainTerminal = function (id, name) {
        var terminal = this._terminals.get(id);
        if (!terminal) {
            terminal = new TerminalExtImpl(this.proxy);
            this._terminals.set(id, terminal);
        }
        terminal.name = name;
        return terminal;
    };
    TerminalServiceExtImpl.prototype.$terminalOnInput = function (id, data) {
        var terminal = this._pseudoTerminals.get(id);
        if (!terminal) {
            return;
        }
        terminal.emitOnInput(data);
    };
    TerminalServiceExtImpl.prototype.$terminalSizeChanged = function (id, clos, rows) {
        var terminal = this._pseudoTerminals.get(id);
        if (!terminal) {
            return;
        }
        terminal.emitOnResize(clos, rows);
    };
    TerminalServiceExtImpl.prototype.$terminalCreated = function (id, name) {
        var terminal = this.obtainTerminal(id, name);
        terminal.id.resolve(id);
        this.onDidOpenTerminalEmitter.fire(terminal);
    };
    TerminalServiceExtImpl.prototype.$terminalNameChanged = function (id, name) {
        var terminal = this._terminals.get(id);
        if (terminal) {
            terminal.name = name;
        }
    };
    TerminalServiceExtImpl.prototype.$terminalOpened = function (id, processId, cols, rows) {
        var terminal = this._terminals.get(id);
        if (terminal) {
            // resolve for existing clients
            terminal.deferredProcessId.resolve(processId);
            // install new if terminal is reconnected
            terminal.deferredProcessId = new promise_util_1.Deferred();
            terminal.deferredProcessId.resolve(processId);
        }
        var pseudoTerminal = this._pseudoTerminals.get(id);
        if (pseudoTerminal) {
            pseudoTerminal.emitOnOpen(cols, rows);
        }
    };
    TerminalServiceExtImpl.prototype.$terminalClosed = function (id) {
        var terminal = this._terminals.get(id);
        if (terminal) {
            this.onDidCloseTerminalEmitter.fire(terminal);
            this._terminals.delete(id);
        }
        var pseudoTerminal = this._pseudoTerminals.get(id);
        if (pseudoTerminal) {
            pseudoTerminal.emitOnClose();
            this._pseudoTerminals.delete(id);
        }
    };
    Object.defineProperty(TerminalServiceExtImpl.prototype, "activeTerminal", {
        get: function () {
            return this.activeTerminalId && this._terminals.get(this.activeTerminalId) || undefined;
        },
        enumerable: false,
        configurable: true
    });
    TerminalServiceExtImpl.prototype.$currentTerminalChanged = function (id) {
        this.activeTerminalId = id;
        this.onDidChangeActiveTerminalEmitter.fire(this.activeTerminal);
    };
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    // some code copied and modified from https://github.com/microsoft/vscode/blob/1.49.0/src/vs/workbench/api/common/extHostTerminalService.ts
    TerminalServiceExtImpl.prototype.getEnvironmentVariableCollection = function (extensionIdentifier) {
        var collection = this.environmentVariableCollections.get(extensionIdentifier);
        if (!collection) {
            collection = new EnvironmentVariableCollection();
            this.setEnvironmentVariableCollection(extensionIdentifier, collection);
        }
        return collection;
    };
    TerminalServiceExtImpl.prototype.syncEnvironmentVariableCollection = function (extensionIdentifier, collection) {
        var serialized = __spread(collection.map.entries());
        this.proxy.$setEnvironmentVariableCollection(extensionIdentifier, collection.persistent, serialized.length === 0 ? undefined : serialized);
    };
    TerminalServiceExtImpl.prototype.setEnvironmentVariableCollection = function (extensionIdentifier, collection) {
        var _this = this;
        this.environmentVariableCollections.set(extensionIdentifier, collection);
        collection.onDidChangeCollection(function () {
            // When any collection value changes send this immediately, this is done to ensure
            // following calls to createTerminal will be created with the new environment. It will
            // result in more noise by sending multiple updates when called but collections are
            // expected to be small.
            _this.syncEnvironmentVariableCollection(extensionIdentifier, collection);
        });
    };
    TerminalServiceExtImpl.prototype.$initEnvironmentVariableCollections = function (collections) {
        var _this = this;
        collections.forEach(function (entry) {
            var extensionIdentifier = entry[0];
            var collection = new EnvironmentVariableCollection(entry[1]);
            _this.setEnvironmentVariableCollection(extensionIdentifier, collection);
        });
    };
    return TerminalServiceExtImpl;
}());
exports.TerminalServiceExtImpl = TerminalServiceExtImpl;
var EnvironmentVariableCollection = /** @class */ (function () {
    function EnvironmentVariableCollection(serialized) {
        this.map = new Map();
        this._persistent = true;
        this.onDidChangeCollectionEmitter = new event_1.Emitter();
        this.onDidChangeCollection = this.onDidChangeCollectionEmitter.event;
        this.map = new Map(serialized);
    }
    Object.defineProperty(EnvironmentVariableCollection.prototype, "persistent", {
        get: function () { return this._persistent; },
        set: function (value) {
            this._persistent = value;
            this.onDidChangeCollectionEmitter.fire();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EnvironmentVariableCollection.prototype, "size", {
        get: function () {
            return this.map.size;
        },
        enumerable: false,
        configurable: true
    });
    EnvironmentVariableCollection.prototype.replace = function (variable, value) {
        this._setIfDiffers(variable, { value: value, type: types_impl_1.EnvironmentVariableMutatorType.Replace });
    };
    EnvironmentVariableCollection.prototype.append = function (variable, value) {
        this._setIfDiffers(variable, { value: value, type: types_impl_1.EnvironmentVariableMutatorType.Append });
    };
    EnvironmentVariableCollection.prototype.prepend = function (variable, value) {
        this._setIfDiffers(variable, { value: value, type: types_impl_1.EnvironmentVariableMutatorType.Prepend });
    };
    EnvironmentVariableCollection.prototype._setIfDiffers = function (variable, mutator) {
        var current = this.map.get(variable);
        if (!current || current.value !== mutator.value || current.type !== mutator.type) {
            this.map.set(variable, mutator);
            this.onDidChangeCollectionEmitter.fire();
        }
    };
    EnvironmentVariableCollection.prototype.get = function (variable) {
        return this.map.get(variable);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EnvironmentVariableCollection.prototype.forEach = function (callback, thisArg) {
        var _this = this;
        this.map.forEach(function (value, key) { return callback.call(thisArg, key, value, _this); });
    };
    EnvironmentVariableCollection.prototype.delete = function (variable) {
        this.map.delete(variable);
        this.onDidChangeCollectionEmitter.fire();
    };
    EnvironmentVariableCollection.prototype.clear = function () {
        this.map.clear();
        this.onDidChangeCollectionEmitter.fire();
    };
    return EnvironmentVariableCollection;
}());
exports.EnvironmentVariableCollection = EnvironmentVariableCollection;
var TerminalExtImpl = /** @class */ (function () {
    function TerminalExtImpl(proxy) {
        this.proxy = proxy;
        this.id = new promise_util_1.Deferred();
        this.deferredProcessId = new promise_util_1.Deferred();
    }
    Object.defineProperty(TerminalExtImpl.prototype, "processId", {
        get: function () {
            return this.deferredProcessId.promise;
        },
        enumerable: false,
        configurable: true
    });
    TerminalExtImpl.prototype.sendText = function (text, addNewLine) {
        var _this = this;
        if (addNewLine === void 0) { addNewLine = true; }
        this.id.promise.then(function (id) { return _this.proxy.$sendText(id, text, addNewLine); });
    };
    TerminalExtImpl.prototype.show = function (preserveFocus) {
        var _this = this;
        this.id.promise.then(function (id) { return _this.proxy.$show(id, preserveFocus); });
    };
    TerminalExtImpl.prototype.hide = function () {
        var _this = this;
        this.id.promise.then(function (id) { return _this.proxy.$hide(id); });
    };
    TerminalExtImpl.prototype.dispose = function () {
        var _this = this;
        this.id.promise.then(function (id) { return _this.proxy.$dispose(id); });
    };
    return TerminalExtImpl;
}());
exports.TerminalExtImpl = TerminalExtImpl;
var PseudoTerminal = /** @class */ (function () {
    function PseudoTerminal(id, proxy, pseudoTerminal) {
        var _this = this;
        this.proxy = proxy;
        this.pseudoTerminal = pseudoTerminal;
        pseudoTerminal.onDidWrite(function (data) {
            _this.proxy.$write(id, data);
        });
        if (pseudoTerminal.onDidClose) {
            pseudoTerminal.onDidClose(function () {
                _this.proxy.$dispose(id);
            });
        }
        if (pseudoTerminal.onDidOverrideDimensions) {
            pseudoTerminal.onDidOverrideDimensions(function (e) {
                if (e) {
                    _this.proxy.$resize(id, e.columns, e.rows);
                }
            });
        }
    }
    PseudoTerminal.prototype.emitOnClose = function () {
        this.pseudoTerminal.close();
    };
    PseudoTerminal.prototype.emitOnInput = function (data) {
        if (this.pseudoTerminal.handleInput) {
            this.pseudoTerminal.handleInput(data);
        }
    };
    PseudoTerminal.prototype.emitOnOpen = function (cols, rows) {
        this.pseudoTerminal.open({
            rows: rows,
            columns: cols,
        });
    };
    PseudoTerminal.prototype.emitOnResize = function (cols, rows) {
        if (this.pseudoTerminal.setDimensions) {
            this.pseudoTerminal.setDimensions({ columns: cols, rows: rows });
        }
    };
    return PseudoTerminal;
}());
exports.PseudoTerminal = PseudoTerminal;
//# sourceMappingURL=terminal-ext.js.map