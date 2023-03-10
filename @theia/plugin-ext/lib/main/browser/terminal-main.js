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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalServiceMainImpl = void 0;
var browser_1 = require("@theia/core/lib/browser");
var terminal_service_1 = require("@theia/terminal/lib/browser/base/terminal-service");
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var disposable_1 = require("@theia/core/lib/common/disposable");
var shell_terminal_protocol_1 = require("@theia/terminal/lib/common/shell-terminal-protocol");
/**
 * Plugin api service allows working with terminal emulator.
 */
var TerminalServiceMainImpl = /** @class */ (function () {
    function TerminalServiceMainImpl(rpc, container) {
        var e_1, _a;
        var _this = this;
        this.toDispose = new disposable_1.DisposableCollection();
        this.terminals = container.get(terminal_service_1.TerminalService);
        this.shell = container.get(browser_1.ApplicationShell);
        this.shellTerminalServer = container.get(shell_terminal_protocol_1.ShellTerminalServerProxy);
        this.extProxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.TERMINAL_EXT);
        this.toDispose.push(this.terminals.onDidCreateTerminal(function (terminal) { return _this.trackTerminal(terminal); }));
        try {
            for (var _b = __values(this.terminals.all), _c = _b.next(); !_c.done; _c = _b.next()) {
                var terminal = _c.value;
                this.trackTerminal(terminal);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.toDispose.push(this.terminals.onDidChangeCurrentTerminal(function () { return _this.updateCurrentTerminal(); }));
        this.updateCurrentTerminal();
        if (this.shellTerminalServer.collections.size > 0) {
            var collectionAsArray = __spread(this.shellTerminalServer.collections.entries());
            var serializedCollections = collectionAsArray.map(function (e) { return [e[0], __spread(e[1].map.entries())]; });
            this.extProxy.$initEnvironmentVariableCollections(serializedCollections);
        }
    }
    TerminalServiceMainImpl.prototype.$setEnvironmentVariableCollection = function (extensionIdentifier, persistent, collection) {
        if (collection) {
            this.shellTerminalServer.setCollection(extensionIdentifier, persistent, collection);
        }
        else {
            this.shellTerminalServer.deleteCollection(extensionIdentifier);
        }
    };
    TerminalServiceMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    TerminalServiceMainImpl.prototype.updateCurrentTerminal = function () {
        var currentTerminal = this.terminals.currentTerminal;
        this.extProxy.$currentTerminalChanged(currentTerminal && currentTerminal.id);
    };
    TerminalServiceMainImpl.prototype.trackTerminal = function (terminal) {
        return __awaiter(this, void 0, void 0, function () {
            var name, updateTitle, updateProcessId;
            var _this = this;
            return __generator(this, function (_a) {
                name = terminal.title.label;
                this.extProxy.$terminalCreated(terminal.id, name);
                updateTitle = function () {
                    if (name !== terminal.title.label) {
                        name = terminal.title.label;
                        _this.extProxy.$terminalNameChanged(terminal.id, name);
                    }
                };
                terminal.title.changed.connect(updateTitle);
                this.toDispose.push(disposable_1.Disposable.create(function () { return terminal.title.changed.disconnect(updateTitle); }));
                updateProcessId = function () { return terminal.processId.then(function (processId) { return _this.extProxy.$terminalOpened(terminal.id, processId, terminal.dimensions.cols, terminal.dimensions.rows); }, function () { }); };
                updateProcessId();
                this.toDispose.push(terminal.onDidOpen(function () { return updateProcessId(); }));
                this.toDispose.push(terminal.onTerminalDidClose(function () { return _this.extProxy.$terminalClosed(terminal.id); }));
                this.toDispose.push(terminal.onSizeChanged(function (_a) {
                    var cols = _a.cols, rows = _a.rows;
                    _this.extProxy.$terminalSizeChanged(terminal.id, cols, rows);
                }));
                this.toDispose.push(terminal.onData(function (data) {
                    _this.extProxy.$terminalOnInput(terminal.id, data);
                }));
                return [2 /*return*/];
            });
        });
    };
    TerminalServiceMainImpl.prototype.$write = function (id, data) {
        var terminal = this.terminals.getById(id);
        if (!terminal) {
            return;
        }
        terminal.write(data);
    };
    TerminalServiceMainImpl.prototype.$resize = function (id, cols, rows) {
        var terminal = this.terminals.getById(id);
        if (!terminal) {
            return;
        }
        terminal.resize(cols, rows);
    };
    TerminalServiceMainImpl.prototype.$createTerminal = function (id, options, isPseudoTerminal) {
        return __awaiter(this, void 0, void 0, function () {
            var terminal, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.terminals.newTerminal({
                                id: id,
                                title: options.name,
                                shellPath: options.shellPath,
                                shellArgs: options.shellArgs,
                                cwd: options.cwd,
                                env: options.env,
                                destroyTermOnClose: true,
                                useServerTitle: false,
                                attributes: options.attributes,
                                isPseudoTerminal: isPseudoTerminal,
                            })];
                    case 1:
                        terminal = _a.sent();
                        terminal.start();
                        return [2 /*return*/, terminal.id];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error('Failed to create terminal. Cause: ' + error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TerminalServiceMainImpl.prototype.$sendText = function (id, text, addNewLine) {
        var terminal = this.terminals.getById(id);
        if (terminal) {
            text = text.replace(/\r?\n/g, '\r');
            if (addNewLine && text.charAt(text.length - 1) !== '\r') {
                text += '\r';
            }
            terminal.sendText(text);
        }
    };
    TerminalServiceMainImpl.prototype.$show = function (id, preserveFocus) {
        var terminal = this.terminals.getById(id);
        if (terminal) {
            var options = {};
            if (preserveFocus) {
                options.mode = 'reveal';
            }
            this.terminals.open(terminal, options);
        }
    };
    TerminalServiceMainImpl.prototype.$hide = function (id) {
        var terminal = this.terminals.getById(id);
        if (terminal && terminal.isVisible) {
            var area = this.shell.getAreaFor(terminal);
            if (area) {
                this.shell.collapsePanel(area);
            }
        }
    };
    TerminalServiceMainImpl.prototype.$dispose = function (id) {
        var terminal = this.terminals.getById(id);
        if (terminal) {
            terminal.dispose();
        }
    };
    return TerminalServiceMainImpl;
}());
exports.TerminalServiceMainImpl = TerminalServiceMainImpl;
//# sourceMappingURL=terminal-main.js.map