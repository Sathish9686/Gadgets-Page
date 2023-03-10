"use strict";
/********************************************************************************
 * Copyright (C) 2017-2018 TypeFox and others.
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
exports.NsfwFileSystemWatcherServer = void 0;
var fs = require("fs");
var nsfw = require("nsfw");
var paths = require("path");
var minimatch_1 = require("minimatch");
var disposable_1 = require("@theia/core/lib/common/disposable");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var file_change_collection_1 = require("../file-change-collection");
var timers_1 = require("timers");
var debounce = require('lodash.debounce');
/**
 * @deprecated since 1.6.0 use `NsfwFileSystemWatcherService` instead.
 */
var NsfwFileSystemWatcherServer = /** @class */ (function () {
    function NsfwFileSystemWatcherServer(options) {
        var _this = this;
        this.watcherSequence = 1;
        this.watchers = new Map();
        this.watcherOptions = new Map();
        this.toDispose = new disposable_1.DisposableCollection(disposable_1.Disposable.create(function () { return _this.setClient(undefined); }));
        this.changes = new file_change_collection_1.FileChangeCollection();
        /**
         * Fires file changes to clients.
         * It is debounced in the case if the filesystem is spamming to avoid overwhelming clients with events.
         */
        this.fireDidFilesChanged = debounce(function () { return _this.doFireDidFilesChanged(); }, 50);
        this.options = __assign({ nsfwOptions: {}, verbose: false, info: function (message) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return console.info.apply(console, __spread([message], args));
            }, error: function (message) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return console.error.apply(console, __spread([message], args));
            } }, options);
    }
    NsfwFileSystemWatcherServer.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    NsfwFileSystemWatcherServer.prototype.watchFileChanges = function (uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var watcherId, basePath, toDisposeWatcher, toClearTimer_1, timer_1;
            var _this = this;
            return __generator(this, function (_a) {
                watcherId = this.watcherSequence++;
                basePath = file_uri_1.FileUri.fsPath(uri);
                this.debug('Starting watching:', basePath);
                toDisposeWatcher = new disposable_1.DisposableCollection();
                this.watchers.set(watcherId, toDisposeWatcher);
                toDisposeWatcher.push(disposable_1.Disposable.create(function () { return _this.watchers.delete(watcherId); }));
                if (fs.existsSync(basePath)) {
                    this.start(watcherId, basePath, options, toDisposeWatcher);
                }
                else {
                    toClearTimer_1 = new disposable_1.DisposableCollection();
                    timer_1 = timers_1.setInterval(function () {
                        if (fs.existsSync(basePath)) {
                            toClearTimer_1.dispose();
                            _this.pushAdded(watcherId, basePath);
                            _this.start(watcherId, basePath, options, toDisposeWatcher);
                        }
                    }, 500);
                    toClearTimer_1.push(disposable_1.Disposable.create(function () { return timers_1.clearInterval(timer_1); }));
                    toDisposeWatcher.push(toClearTimer_1);
                }
                this.toDispose.push(toDisposeWatcher);
                return [2 /*return*/, watcherId];
            });
        });
    };
    NsfwFileSystemWatcherServer.prototype.start = function (watcherId, basePath, rawOptions, toDisposeWatcher) {
        return __awaiter(this, void 0, void 0, function () {
            var options, watcher;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = __assign({ ignored: [] }, rawOptions);
                        if (options.ignored.length > 0) {
                            this.debug('Files ignored for watching', options.ignored);
                        }
                        return [4 /*yield*/, nsfw(fs.realpathSync(basePath), function (events) {
                                var e_1, _a;
                                try {
                                    for (var events_1 = __values(events), events_1_1 = events_1.next(); !events_1_1.done; events_1_1 = events_1.next()) {
                                        var event_1 = events_1_1.value;
                                        if (event_1.action === 0 /* CREATED */) {
                                            _this.pushAdded(watcherId, _this.resolvePath(event_1.directory, event_1.file));
                                        }
                                        if (event_1.action === 1 /* DELETED */) {
                                            _this.pushDeleted(watcherId, _this.resolvePath(event_1.directory, event_1.file));
                                        }
                                        if (event_1.action === 2 /* MODIFIED */) {
                                            _this.pushUpdated(watcherId, _this.resolvePath(event_1.directory, event_1.file));
                                        }
                                        if (event_1.action === 3 /* RENAMED */) {
                                            _this.pushDeleted(watcherId, _this.resolvePath(event_1.directory, event_1.oldFile));
                                            _this.pushAdded(watcherId, _this.resolvePath(event_1.newDirectory || event_1.directory, event_1.newFile));
                                        }
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (events_1_1 && !events_1_1.done && (_a = events_1.return)) _a.call(events_1);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                            }, __assign({ errorCallback: function (error) {
                                    // see https://github.com/atom/github/issues/342
                                    console.warn("Failed to watch \"" + basePath + "\":", error);
                                    if (error === 'Inotify limit reached') {
                                        if (_this.client) {
                                            _this.client.onError();
                                        }
                                    }
                                    _this.unwatchFileChanges(watcherId);
                                } }, this.options.nsfwOptions))];
                    case 1:
                        watcher = _a.sent();
                        return [4 /*yield*/, watcher.start()];
                    case 2:
                        _a.sent();
                        this.options.info('Started watching:', basePath);
                        if (!toDisposeWatcher.disposed) return [3 /*break*/, 4];
                        this.debug('Stopping watching:', basePath);
                        return [4 /*yield*/, watcher.stop()];
                    case 3:
                        _a.sent();
                        // remove a reference to nsfw otherwise GC cannot collect it
                        watcher = undefined;
                        this.options.info('Stopped watching:', basePath);
                        return [2 /*return*/];
                    case 4:
                        toDisposeWatcher.push(disposable_1.Disposable.create(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.watcherOptions.delete(watcherId);
                                        if (!watcher) return [3 /*break*/, 2];
                                        this.debug('Stopping watching:', basePath);
                                        return [4 /*yield*/, watcher.stop()];
                                    case 1:
                                        _a.sent();
                                        // remove a reference to nsfw otherwise GC cannot collect it
                                        watcher = undefined;
                                        this.options.info('Stopped watching:', basePath);
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); }));
                        this.watcherOptions.set(watcherId, {
                            ignored: options.ignored.map(function (pattern) { return new minimatch_1.Minimatch(pattern, { dot: true }); })
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NsfwFileSystemWatcherServer.prototype.unwatchFileChanges = function (watcherId) {
        var disposable = this.watchers.get(watcherId);
        if (disposable) {
            this.watchers.delete(watcherId);
            disposable.dispose();
        }
        return Promise.resolve();
    };
    NsfwFileSystemWatcherServer.prototype.setClient = function (client) {
        if (client && this.toDispose.disposed) {
            return;
        }
        this.client = client;
    };
    NsfwFileSystemWatcherServer.prototype.pushAdded = function (watcherId, path) {
        this.debug('Added:', path);
        this.pushFileChange(watcherId, path, 1 /* ADDED */);
    };
    NsfwFileSystemWatcherServer.prototype.pushUpdated = function (watcherId, path) {
        this.debug('Updated:', path);
        this.pushFileChange(watcherId, path, 0 /* UPDATED */);
    };
    NsfwFileSystemWatcherServer.prototype.pushDeleted = function (watcherId, path) {
        this.debug('Deleted:', path);
        this.pushFileChange(watcherId, path, 2 /* DELETED */);
    };
    NsfwFileSystemWatcherServer.prototype.pushFileChange = function (watcherId, path, type) {
        if (this.isIgnored(watcherId, path)) {
            return;
        }
        var uri = file_uri_1.FileUri.create(path).toString();
        this.changes.push({ uri: uri, type: type });
        this.fireDidFilesChanged();
    };
    NsfwFileSystemWatcherServer.prototype.resolvePath = function (directory, file) {
        var path = paths.join(directory, file);
        try {
            return fs.realpathSync(path);
        }
        catch (_a) {
            try {
                // file does not exist try to resolve directory
                return paths.join(fs.realpathSync(directory), file);
            }
            catch (_b) {
                // directory does not exist fall back to symlink
                return path;
            }
        }
    };
    NsfwFileSystemWatcherServer.prototype.doFireDidFilesChanged = function () {
        var changes = this.changes.values();
        this.changes = new file_change_collection_1.FileChangeCollection();
        var event = { changes: changes };
        if (this.client) {
            this.client.onDidFilesChanged(event);
        }
    };
    NsfwFileSystemWatcherServer.prototype.isIgnored = function (watcherId, path) {
        var options = this.watcherOptions.get(watcherId);
        return !!options && options.ignored.length > 0 && options.ignored.some(function (m) { return m.match(path); });
    };
    NsfwFileSystemWatcherServer.prototype.debug = function (message) {
        var _a;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (this.options.verbose) {
            (_a = this.options).info.apply(_a, __spread([message], params));
        }
    };
    return NsfwFileSystemWatcherServer;
}());
exports.NsfwFileSystemWatcherServer = NsfwFileSystemWatcherServer;
//# sourceMappingURL=nsfw-filesystem-watcher.js.map