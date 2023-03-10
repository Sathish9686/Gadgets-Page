"use strict";
/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
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
exports.GitScmFileChange = exports.GitAmendSupport = exports.GitScmProvider = exports.GitScmProviderOptions = void 0;
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var diff_uris_1 = require("@theia/core/lib/browser/diff-uris");
var core_1 = require("@theia/core");
var disposable_1 = require("@theia/core/lib/common/disposable");
var command_1 = require("@theia/core/lib/common/command");
var dialogs_1 = require("@theia/core/lib/browser/dialogs");
var editor_manager_1 = require("@theia/editor/lib/browser/editor-manager");
var browser_1 = require("@theia/workspace/lib/browser");
var common_1 = require("../common");
var git_resource_1 = require("./git-resource");
var git_error_handler_1 = require("./git-error-handler");
var label_provider_1 = require("@theia/core/lib/browser/label-provider");
var file_service_1 = require("@theia/filesystem/lib/browser/file-service");
var GitScmProviderOptions = /** @class */ (function () {
    function GitScmProviderOptions() {
    }
    GitScmProviderOptions = __decorate([
        inversify_1.injectable()
    ], GitScmProviderOptions);
    return GitScmProviderOptions;
}());
exports.GitScmProviderOptions = GitScmProviderOptions;
var GitScmProvider = /** @class */ (function () {
    function GitScmProvider() {
        this.onDidChangeEmitter = new core_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
        this.onDidChangeStatusBarCommandsEmitter = new core_1.Emitter();
        this.onDidChangeStatusBarCommands = this.onDidChangeStatusBarCommandsEmitter.event;
        this.toDispose = new disposable_1.DisposableCollection(this.onDidChangeEmitter, this.onDidChangeStatusBarCommandsEmitter);
        this.id = 'git';
        this.label = 'Git';
        this.state = GitScmProvider_1.initState();
    }
    GitScmProvider_1 = GitScmProvider;
    GitScmProvider.prototype.fireDidChange = function () {
        this.onDidChangeEmitter.fire(undefined);
    };
    GitScmProvider.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    GitScmProvider.prototype.init = function () {
        this._amendSupport = new GitAmendSupport(this, this.repository, this.git);
    };
    Object.defineProperty(GitScmProvider.prototype, "repository", {
        get: function () {
            return this.options.repository;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitScmProvider.prototype, "rootUri", {
        get: function () {
            return this.repository.localUri;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitScmProvider.prototype, "amendSupport", {
        get: function () {
            return this._amendSupport;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitScmProvider.prototype, "acceptInputCommand", {
        get: function () {
            return {
                command: 'git.commit.all',
                tooltip: 'Commit all the staged changes',
                title: 'Commit'
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitScmProvider.prototype, "statusBarCommands", {
        get: function () {
            return this._statusBarCommands;
        },
        set: function (statusBarCommands) {
            this._statusBarCommands = statusBarCommands;
            this.onDidChangeStatusBarCommandsEmitter.fire(statusBarCommands);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitScmProvider.prototype, "groups", {
        get: function () {
            return this.state.groups;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitScmProvider.prototype, "stagedChanges", {
        get: function () {
            return this.state.stagedChanges;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitScmProvider.prototype, "unstagedChanges", {
        get: function () {
            return this.state.unstagedChanges;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitScmProvider.prototype, "mergeChanges", {
        get: function () {
            return this.state.mergeChanges;
        },
        enumerable: false,
        configurable: true
    });
    GitScmProvider.prototype.getStatus = function () {
        return this.state.status;
    };
    GitScmProvider.prototype.setStatus = function (status) {
        var e_1, _a;
        var state = GitScmProvider_1.initState(status);
        if (status) {
            try {
                for (var _b = __values(status.changes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var change = _c.value;
                    if (common_1.GitFileStatus[common_1.GitFileStatus.Conflicted.valueOf()] !== common_1.GitFileStatus[change.status]) {
                        if (change.staged) {
                            state.stagedChanges.push(change);
                        }
                        else {
                            state.unstagedChanges.push(change);
                        }
                    }
                    else {
                        if (!change.staged) {
                            state.mergeChanges.push(change);
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        state.groups.push(this.createGroup('merge', 'Merge Changes', state.mergeChanges, true));
        state.groups.push(this.createGroup('index', 'Staged changes', state.stagedChanges, true));
        state.groups.push(this.createGroup('workingTree', 'Changes', state.unstagedChanges, false));
        this.state = state;
        this.input.placeholder = "Message (press {0} to commit" + (status && status.branch ? ' on \'' + status.branch + '\'' : '') + ")";
        this.fireDidChange();
    };
    GitScmProvider.prototype.createGroup = function (id, label, changes, hideWhenEmpty) {
        var e_2, _a;
        var group = {
            id: id,
            label: label,
            hideWhenEmpty: hideWhenEmpty,
            provider: this,
            resources: [],
            dispose: function () { }
        };
        try {
            for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                var change = changes_1_1.value;
                this.addScmResource(group, change);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (changes_1_1 && !changes_1_1.done && (_a = changes_1.return)) _a.call(changes_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return group;
    };
    GitScmProvider.prototype.addScmResource = function (group, change) {
        var _this = this;
        var sourceUri = new uri_1.default(change.uri);
        group.resources.push({
            group: group,
            sourceUri: sourceUri,
            decorations: {
                letter: common_1.GitFileStatus.toAbbreviation(change.status, change.staged),
                color: common_1.GitFileStatus.getColor(change.status, change.staged),
                tooltip: common_1.GitFileStatus.toString(change.status)
            },
            open: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, this.open(change, { mode: 'reveal' })];
            }); }); }
        });
    };
    GitScmProvider.prototype.open = function (change, options) {
        return __awaiter(this, void 0, void 0, function () {
            var uriToOpen;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uriToOpen = this.getUriToOpen(change);
                        return [4 /*yield*/, this.editorManager.open(uriToOpen, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GitScmProvider.prototype.getUriToOpen = function (change) {
        var changeUri = new uri_1.default(change.uri);
        var fromFileUri = change.oldUri ? new uri_1.default(change.oldUri) : changeUri; // set oldUri on renamed and copied
        if (change.status === common_1.GitFileStatus.Deleted) {
            if (change.staged) {
                return changeUri.withScheme(git_resource_1.GIT_RESOURCE_SCHEME).withQuery('HEAD');
            }
            else {
                return changeUri.withScheme(git_resource_1.GIT_RESOURCE_SCHEME);
            }
        }
        if (change.status !== common_1.GitFileStatus.New) {
            if (change.staged) {
                return diff_uris_1.DiffUris.encode(fromFileUri.withScheme(git_resource_1.GIT_RESOURCE_SCHEME).withQuery('HEAD'), changeUri.withScheme(git_resource_1.GIT_RESOURCE_SCHEME), this.labelProvider.getName(changeUri) + ' (Index)');
            }
            if (this.stagedChanges.find(function (c) { return c.uri === change.uri; })) {
                return diff_uris_1.DiffUris.encode(fromFileUri.withScheme(git_resource_1.GIT_RESOURCE_SCHEME), changeUri, this.labelProvider.getName(changeUri) + ' (Working tree)');
            }
            if (this.mergeChanges.find(function (c) { return c.uri === change.uri; })) {
                return changeUri;
            }
            return diff_uris_1.DiffUris.encode(fromFileUri.withScheme(git_resource_1.GIT_RESOURCE_SCHEME).withQuery('HEAD'), changeUri, this.labelProvider.getName(changeUri) + ' (Working tree)');
        }
        if (change.staged) {
            return changeUri.withScheme(git_resource_1.GIT_RESOURCE_SCHEME);
        }
        if (this.stagedChanges.find(function (c) { return c.uri === change.uri; })) {
            return diff_uris_1.DiffUris.encode(changeUri.withScheme(git_resource_1.GIT_RESOURCE_SCHEME), changeUri, this.labelProvider.getName(changeUri) + ' (Working tree)');
        }
        return changeUri;
    };
    GitScmProvider.prototype.openChange = function (change, options) {
        return __awaiter(this, void 0, void 0, function () {
            var uriToOpen;
            return __generator(this, function (_a) {
                uriToOpen = this.getUriToOpen(change);
                return [2 /*return*/, this.editorManager.open(uriToOpen, options)];
            });
        });
    };
    GitScmProvider.prototype.findChange = function (uri) {
        var stringUri = uri.toString();
        var merge = this.mergeChanges.find(function (c) { return c.uri.toString() === stringUri; });
        if (merge) {
            return merge;
        }
        var unstaged = this.unstagedChanges.find(function (c) { return c.uri.toString() === stringUri; });
        if (unstaged) {
            return unstaged;
        }
        return this.stagedChanges.find(function (c) { return c.uri.toString() === stringUri; });
    };
    GitScmProvider.prototype.stageAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // TODO resolve deletion conflicts
                        // TODO confirm staging unresolved files
                        return [4 /*yield*/, this.git.add(this.repository, [])];
                    case 1:
                        // TODO resolve deletion conflicts
                        // TODO confirm staging unresolved files
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        this.gitErrorHandler.handleError(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GitScmProvider.prototype.stage = function (uriArg) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, repository, unstagedChanges_1, mergeChanges_1, uris, unstagedUris, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = this, repository = _a.repository, unstagedChanges_1 = _a.unstagedChanges, mergeChanges_1 = _a.mergeChanges;
                        uris = Array.isArray(uriArg) ? uriArg : [uriArg];
                        unstagedUris = uris
                            .filter(function (uri) {
                            var resourceUri = new uri_1.default(uri);
                            return unstagedChanges_1.some(function (change) { return resourceUri.isEqualOrParent(new uri_1.default(change.uri)); })
                                || mergeChanges_1.some(function (change) { return resourceUri.isEqualOrParent(new uri_1.default(change.uri)); });
                        });
                        if (!(unstagedUris.length !== 0)) return [3 /*break*/, 2];
                        // TODO resolve deletion conflicts
                        // TODO confirm staging of a unresolved file
                        return [4 /*yield*/, this.git.add(repository, uris)];
                    case 1:
                        // TODO resolve deletion conflicts
                        // TODO confirm staging of a unresolved file
                        _b.sent();
                        _b.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        this.gitErrorHandler.handleError(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GitScmProvider.prototype.unstageAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, repository, stagedChanges, uris, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this, repository = _a.repository, stagedChanges = _a.stagedChanges;
                        uris = stagedChanges.map(function (c) { return c.uri; });
                        return [4 /*yield*/, this.git.unstage(repository, uris)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        this.gitErrorHandler.handleError(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GitScmProvider.prototype.unstage = function (uriArg) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, repository, stagedChanges_1, uris, stagedUris, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = this, repository = _a.repository, stagedChanges_1 = _a.stagedChanges;
                        uris = Array.isArray(uriArg) ? uriArg : [uriArg];
                        stagedUris = uris
                            .filter(function (uri) {
                            var resourceUri = new uri_1.default(uri);
                            return stagedChanges_1.some(function (change) { return resourceUri.isEqualOrParent(new uri_1.default(change.uri)); });
                        });
                        if (!(stagedUris.length !== 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.git.unstage(repository, uris)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_4 = _b.sent();
                        this.gitErrorHandler.handleError(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GitScmProvider.prototype.discardAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newUris, uris, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.confirmAll()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 5];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        newUris = this.unstagedChanges.filter(function (c) { return c.status === common_1.GitFileStatus.New; }).map(function (c) { return c.uri; });
                        this.deleteAll(newUris);
                        uris = this.unstagedChanges.map(function (c) { return c.uri; });
                        return [4 /*yield*/, this.git.unstage(this.repository, uris, { treeish: 'HEAD', reset: 'working-tree' })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_5 = _a.sent();
                        this.gitErrorHandler.handleError(error_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GitScmProvider.prototype.discard = function (uriArg) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, uris, status, pairs, urisInIndex;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repository = this.repository;
                        uris = Array.isArray(uriArg) ? uriArg : [uriArg];
                        status = this.getStatus();
                        if (!status) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Promise.all(uris
                                .filter(function (uri) {
                                var uriAsUri = new uri_1.default(uri);
                                return status.changes.some(function (change) { return uriAsUri.isEqualOrParent(new uri_1.default(change.uri)); });
                            })
                                .map(function (uri) {
                                var includeIndexFlag = function () { return __awaiter(_this, void 0, void 0, function () {
                                    var isInIndex;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.git.lsFiles(repository, uri, { errorUnmatch: true })];
                                            case 1:
                                                isInIndex = _a.sent();
                                                return [2 /*return*/, { uri: uri, isInIndex: isInIndex }];
                                        }
                                    });
                                }); };
                                return includeIndexFlag();
                            }))];
                    case 1:
                        pairs = _a.sent();
                        urisInIndex = pairs.filter(function (pair) { return pair.isInIndex; }).map(function (pair) { return pair.uri; });
                        if (!(urisInIndex.length !== 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.confirm(urisInIndex)];
                    case 2:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        _a.label = 3;
                    case 3: return [4 /*yield*/, Promise.all(pairs.map(function (pair) {
                            var discardSingle = function () { return __awaiter(_this, void 0, void 0, function () {
                                var error_6;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!pair.isInIndex) return [3 /*break*/, 5];
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, this.git.unstage(repository, pair.uri, { treeish: 'HEAD', reset: 'working-tree' })];
                                        case 2:
                                            _a.sent();
                                            return [3 /*break*/, 4];
                                        case 3:
                                            error_6 = _a.sent();
                                            this.gitErrorHandler.handleError(error_6);
                                            return [3 /*break*/, 4];
                                        case 4: return [3 /*break*/, 7];
                                        case 5: return [4 /*yield*/, this.commands.executeCommand(browser_1.WorkspaceCommands.FILE_DELETE.id, new uri_1.default(pair.uri))];
                                        case 6:
                                            _a.sent();
                                            _a.label = 7;
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            }); };
                            return discardSingle();
                        }))];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GitScmProvider.prototype.confirm = function (paths) {
        var _this = this;
        var fileText;
        if (paths.length <= 3) {
            fileText = paths.map(function (path) { return _this.labelProvider.getName(new uri_1.default(path)); }).join(', ');
        }
        else {
            fileText = paths.length + " files";
        }
        return new dialogs_1.ConfirmDialog({
            title: 'Discard changes',
            msg: "Do you really want to discard changes in " + fileText + "?"
        }).open();
    };
    GitScmProvider.prototype.confirmAll = function () {
        return new dialogs_1.ConfirmDialog({
            title: 'Discard All Changes',
            msg: 'Do you really want to discard all changes?'
        }).open();
    };
    GitScmProvider.prototype.delete = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fileService.delete(uri, { recursive: true })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        console.error(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GitScmProvider.prototype.deleteAll = function (uris) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(uris.map(function (uri) { return _this.delete(new uri_1.default(uri)); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GitScmProvider.prototype.createScmCommit = function (gitCommit) {
        var scmCommit = {
            id: gitCommit.sha,
            summary: gitCommit.summary,
            authorName: gitCommit.author.name,
            authorEmail: gitCommit.author.email,
            authorDateRelative: gitCommit.authorDateRelative,
        };
        return scmCommit;
    };
    GitScmProvider.prototype.createScmHistoryCommit = function (gitCommit) {
        var _this = this;
        var range = {
            fromRevision: gitCommit.sha + '~1',
            toRevision: gitCommit.sha
        };
        var scmCommit = __assign(__assign({}, this.createScmCommit(gitCommit)), { commitDetailUri: this.toCommitDetailUri(gitCommit.sha), scmProvider: this, gitFileChanges: gitCommit.fileChanges.map(function (change) { return new GitScmFileChange(change, _this, range); }), get fileChanges() {
                return this.gitFileChanges;
            },
            get commitDetailOptions() {
                return {
                    rootUri: this.scmProvider.rootUri,
                    commitSha: gitCommit.sha,
                    commitMessage: gitCommit.summary,
                    messageBody: gitCommit.body,
                    authorName: gitCommit.author.name,
                    authorEmail: gitCommit.author.email,
                    authorDate: gitCommit.author.timestamp,
                    authorDateRelative: gitCommit.authorDateRelative,
                };
            } });
        return scmCommit;
    };
    GitScmProvider.prototype.relativePath = function (uri) {
        var parsedUri = new uri_1.default(uri);
        var gitRepo = { localUri: this.rootUri };
        var relativePath = common_1.Repository.relativePath(gitRepo, parsedUri);
        if (relativePath) {
            return relativePath.toString();
        }
        return this.labelProvider.getLongName(parsedUri);
    };
    GitScmProvider.prototype.toCommitDetailUri = function (commitSha) {
        return new uri_1.default('').withScheme(GitScmProvider_1.GIT_COMMIT_DETAIL).withFragment(commitSha);
    };
    var GitScmProvider_1;
    __decorate([
        inversify_1.inject(editor_manager_1.EditorManager),
        __metadata("design:type", editor_manager_1.EditorManager)
    ], GitScmProvider.prototype, "editorManager", void 0);
    __decorate([
        inversify_1.inject(git_error_handler_1.GitErrorHandler),
        __metadata("design:type", git_error_handler_1.GitErrorHandler)
    ], GitScmProvider.prototype, "gitErrorHandler", void 0);
    __decorate([
        inversify_1.inject(file_service_1.FileService),
        __metadata("design:type", file_service_1.FileService)
    ], GitScmProvider.prototype, "fileService", void 0);
    __decorate([
        inversify_1.inject(common_1.Git),
        __metadata("design:type", Object)
    ], GitScmProvider.prototype, "git", void 0);
    __decorate([
        inversify_1.inject(command_1.CommandService),
        __metadata("design:type", Object)
    ], GitScmProvider.prototype, "commands", void 0);
    __decorate([
        inversify_1.inject(GitScmProviderOptions),
        __metadata("design:type", GitScmProviderOptions)
    ], GitScmProvider.prototype, "options", void 0);
    __decorate([
        inversify_1.inject(label_provider_1.LabelProvider),
        __metadata("design:type", label_provider_1.LabelProvider)
    ], GitScmProvider.prototype, "labelProvider", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], GitScmProvider.prototype, "init", null);
    GitScmProvider = GitScmProvider_1 = __decorate([
        inversify_1.injectable()
    ], GitScmProvider);
    return GitScmProvider;
}());
exports.GitScmProvider = GitScmProvider;
(function (GitScmProvider) {
    GitScmProvider.GIT_COMMIT_DETAIL = 'git-commit-detail-widget';
    function initState(status) {
        return {
            status: status,
            stagedChanges: [],
            unstagedChanges: [],
            mergeChanges: [],
            groups: []
        };
    }
    GitScmProvider.initState = initState;
    GitScmProvider.Factory = Symbol('GitScmProvider.Factory');
})(GitScmProvider = exports.GitScmProvider || (exports.GitScmProvider = {}));
exports.GitScmProvider = GitScmProvider;
var GitAmendSupport = /** @class */ (function () {
    function GitAmendSupport(provider, repository, git) {
        this.provider = provider;
        this.repository = repository;
        this.git = git;
    }
    GitAmendSupport.prototype.getInitialAmendingCommits = function (amendingHeadCommitSha, latestCommitSha) {
        return __awaiter(this, void 0, void 0, function () {
            var commits;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.git.log(this.repository, {
                            range: { toRevision: amendingHeadCommitSha, fromRevision: latestCommitSha },
                            maxCount: 50
                        })];
                    case 1:
                        commits = _a.sent();
                        return [2 /*return*/, commits.map(function (commit) { return _this.provider.createScmCommit(commit); })];
                }
            });
        });
    };
    GitAmendSupport.prototype.getMessage = function (commit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.git.exec(this.repository, ['log', '-n', '1', '--format=%B', commit])];
                    case 1: return [2 /*return*/, (_a.sent()).stdout.trim()];
                }
            });
        });
    };
    GitAmendSupport.prototype.reset = function (commit) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = commit === 'HEAD~';
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.isHeadInitialCommit()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (!_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.git.exec(this.repository, ['update-ref', '-d', 'HEAD'])];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.git.exec(this.repository, ['reset', commit, '--soft'])];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    GitAmendSupport.prototype.isHeadInitialCommit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.git.revParse(this.repository, { ref: 'HEAD~' })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, !result];
                }
            });
        });
    };
    GitAmendSupport.prototype.getLastCommit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var commits;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.git.log(this.repository, { maxCount: 1 })];
                    case 1:
                        commits = _a.sent();
                        if (commits.length > 0) {
                            return [2 /*return*/, this.provider.createScmCommit(commits[0])];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return GitAmendSupport;
}());
exports.GitAmendSupport = GitAmendSupport;
var GitScmFileChange = /** @class */ (function () {
    function GitScmFileChange(fileChange, scmProvider, range) {
        this.fileChange = fileChange;
        this.scmProvider = scmProvider;
        this.range = range;
    }
    Object.defineProperty(GitScmFileChange.prototype, "gitFileChange", {
        get: function () {
            return this.fileChange;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitScmFileChange.prototype, "uri", {
        get: function () {
            return this.fileChange.uri;
        },
        enumerable: false,
        configurable: true
    });
    GitScmFileChange.prototype.getCaption = function () {
        var provider = this.scmProvider;
        var result = provider.relativePath(this.fileChange.uri) + " - " + common_1.GitFileStatus.toString(this.fileChange.status, true);
        if (this.fileChange.oldUri) {
            result = provider.relativePath(this.fileChange.oldUri) + " -> " + result;
        }
        return result;
    };
    GitScmFileChange.prototype.getStatusCaption = function () {
        return common_1.GitFileStatus.toString(this.fileChange.status, true);
    };
    GitScmFileChange.prototype.getStatusAbbreviation = function () {
        return common_1.GitFileStatus.toAbbreviation(this.fileChange.status, this.fileChange.staged);
    };
    GitScmFileChange.prototype.getClassNameForStatus = function () {
        return 'git-status staged ' + common_1.GitFileStatus[this.fileChange.status].toLowerCase();
    };
    GitScmFileChange.prototype.getUriToOpen = function () {
        var uri = new uri_1.default(this.fileChange.uri);
        var fromFileURI = this.fileChange.oldUri ? new uri_1.default(this.fileChange.oldUri) : uri; // set oldUri on renamed and copied
        if (!this.range) {
            return uri;
        }
        var fromURI = this.range.fromRevision
            ? fromFileURI.withScheme(git_resource_1.GIT_RESOURCE_SCHEME).withQuery(this.range.fromRevision.toString())
            : fromFileURI;
        var toURI = this.range.toRevision
            ? uri.withScheme(git_resource_1.GIT_RESOURCE_SCHEME).withQuery(this.range.toRevision.toString())
            : uri;
        var uriToOpen = uri;
        if (this.fileChange.status === common_1.GitFileStatus.Deleted) {
            uriToOpen = fromURI;
        }
        else if (this.fileChange.status === common_1.GitFileStatus.New) {
            uriToOpen = toURI;
        }
        else {
            uriToOpen = diff_uris_1.DiffUris.encode(fromURI, toURI);
        }
        return uriToOpen;
    };
    return GitScmFileChange;
}());
exports.GitScmFileChange = GitScmFileChange;
//# sourceMappingURL=git-scm-provider.js.map