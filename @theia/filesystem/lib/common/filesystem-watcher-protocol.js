"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.ReconnectingFileSystemWatcherServer = exports.FileSystemWatcherServerProxy = exports.FileSystemWatcherServer = exports.FileSystemWatcherService = void 0;
var inversify_1 = require("inversify");
exports.FileSystemWatcherService = Symbol('FileSystemWatcherServer2');
exports.FileSystemWatcherServer = Symbol('FileSystemWatcherServer');
exports.FileSystemWatcherServerProxy = Symbol('FileSystemWatcherServerProxy');
/**
 * @deprecated not used internally anymore.
 */
var ReconnectingFileSystemWatcherServer = /** @class */ (function () {
    function ReconnectingFileSystemWatcherServer(proxy) {
        var _this = this;
        this.proxy = proxy;
        this.watcherSequence = 1;
        this.watchParams = new Map();
        this.localToRemoteWatcher = new Map();
        var onInitialized = this.proxy.onDidOpenConnection(function () {
            // skip reconnection on the first connection
            onInitialized.dispose();
            _this.proxy.onDidOpenConnection(function () { return _this.reconnect(); });
        });
    }
    ReconnectingFileSystemWatcherServer.prototype.reconnect = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.watchParams.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), watcher = _d[0], _e = _d[1], uri = _e.uri, options = _e.options;
                this.doWatchFileChanges(watcher, uri, options);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    ReconnectingFileSystemWatcherServer.prototype.dispose = function () {
        this.proxy.dispose();
    };
    ReconnectingFileSystemWatcherServer.prototype.watchFileChanges = function (uri, options) {
        var watcher = this.watcherSequence++;
        this.watchParams.set(watcher, { uri: uri, options: options });
        return this.doWatchFileChanges(watcher, uri, options);
    };
    ReconnectingFileSystemWatcherServer.prototype.doWatchFileChanges = function (watcher, uri, options) {
        var _this = this;
        return this.proxy.watchFileChanges(uri, options).then(function (remote) {
            _this.localToRemoteWatcher.set(watcher, remote);
            return watcher;
        });
    };
    ReconnectingFileSystemWatcherServer.prototype.unwatchFileChanges = function (watcher) {
        this.watchParams.delete(watcher);
        var remote = this.localToRemoteWatcher.get(watcher);
        if (remote) {
            this.localToRemoteWatcher.delete(watcher);
            return this.proxy.unwatchFileChanges(remote);
        }
        return Promise.resolve();
    };
    ReconnectingFileSystemWatcherServer.prototype.setClient = function (client) {
        this.proxy.setClient(client);
    };
    ReconnectingFileSystemWatcherServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(exports.FileSystemWatcherServerProxy)),
        __metadata("design:paramtypes", [Object])
    ], ReconnectingFileSystemWatcherServer);
    return ReconnectingFileSystemWatcherServer;
}());
exports.ReconnectingFileSystemWatcherServer = ReconnectingFileSystemWatcherServer;
//# sourceMappingURL=filesystem-watcher-protocol.js.map