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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.TasksMainImpl = void 0;
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var common_1 = require("@theia/core/lib/common");
var task_contribution_1 = require("@theia/task/lib/browser/task-contribution");
var task_protocol_1 = require("@theia/task/lib/common/task-protocol");
var task_watcher_1 = require("@theia/task/lib/common/task-watcher");
var task_service_1 = require("@theia/task/lib/browser/task-service");
var browser_1 = require("@theia/task/lib/browser");
var TasksMainImpl = /** @class */ (function () {
    function TasksMainImpl(rpc, container) {
        var _this = this;
        this.taskProviders = new Map();
        this.toDispose = new common_1.DisposableCollection();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.TASKS_EXT);
        this.taskProviderRegistry = container.get(task_contribution_1.TaskProviderRegistry);
        this.taskResolverRegistry = container.get(task_contribution_1.TaskResolverRegistry);
        this.taskWatcher = container.get(task_watcher_1.TaskWatcher);
        this.taskService = container.get(task_service_1.TaskService);
        this.taskDefinitionRegistry = container.get(browser_1.TaskDefinitionRegistry);
        this.toDispose.push(this.taskWatcher.onTaskCreated(function (event) {
            _this.proxy.$onDidStartTask({
                id: event.taskId,
                task: _this.fromTaskConfiguration(event.config)
            });
        }));
        this.toDispose.push(this.taskWatcher.onTaskExit(function (event) {
            _this.proxy.$onDidEndTask(event.taskId);
        }));
        this.toDispose.push(this.taskWatcher.onDidStartTaskProcess(function (event) {
            if (event.processId !== undefined) {
                _this.proxy.$onDidStartTaskProcess(event.processId, {
                    id: event.taskId,
                    task: _this.fromTaskConfiguration(event.config)
                });
            }
        }));
        this.toDispose.push(this.taskWatcher.onDidEndTaskProcess(function (event) {
            if (event.code !== undefined) {
                _this.proxy.$onDidEndTaskProcess(event.code, event.taskId);
            }
        }));
    }
    TasksMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    TasksMainImpl.prototype.$registerTaskProvider = function (handle, type) {
        var _this = this;
        var taskProvider = this.createTaskProvider(handle);
        var taskResolver = this.createTaskResolver(handle);
        var toDispose = new common_1.DisposableCollection(this.taskProviderRegistry.register(type, taskProvider, handle), this.taskResolverRegistry.register(type, taskResolver), common_1.Disposable.create(function () { return _this.taskProviders.delete(handle); }));
        this.taskProviders.set(handle, toDispose);
        this.toDispose.push(toDispose);
    };
    TasksMainImpl.prototype.$unregister = function (handle) {
        var disposable = this.taskProviders.get(handle);
        if (disposable) {
            disposable.dispose();
        }
    };
    TasksMainImpl.prototype.$fetchTasks = function (taskVersion, taskType) {
        return __awaiter(this, void 0, void 0, function () {
            var token, _a, configured, provided, result, _b, _c, tasks, tasks_1, tasks_1_1, task, type, label, _scope, _source, properties, dto, key;
            var e_1, _d, e_2, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (taskVersion && !taskVersion.startsWith('2.')) { // Theia does not support 1.x or earlier task versions
                            return [2 /*return*/, []];
                        }
                        token = this.taskService.startUserAction();
                        return [4 /*yield*/, Promise.all([
                                this.taskService.getConfiguredTasks(token),
                                this.taskService.getProvidedTasks(token)
                            ])];
                    case 1:
                        _a = __read.apply(void 0, [_f.sent(), 2]), configured = _a[0], provided = _a[1];
                        result = [];
                        try {
                            for (_b = __values([configured, provided]), _c = _b.next(); !_c.done; _c = _b.next()) {
                                tasks = _c.value;
                                try {
                                    for (tasks_1 = (e_2 = void 0, __values(tasks)), tasks_1_1 = tasks_1.next(); !tasks_1_1.done; tasks_1_1 = tasks_1.next()) {
                                        task = tasks_1_1.value;
                                        if (!taskType || (!!this.taskDefinitionRegistry.getDefinition(task) ? task._source === taskType : task.type === taskType)) {
                                            type = task.type, label = task.label, _scope = task._scope, _source = task._source, properties = __rest(task, ["type", "label", "_scope", "_source"]);
                                            dto = { type: type, label: label, scope: _scope, source: _source };
                                            for (key in properties) {
                                                if (properties.hasOwnProperty(key)) {
                                                    dto[key] = properties[key];
                                                }
                                            }
                                            result.push(dto);
                                        }
                                    }
                                }
                                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                finally {
                                    try {
                                        if (tasks_1_1 && !tasks_1_1.done && (_e = tasks_1.return)) _e.call(tasks_1);
                                    }
                                    finally { if (e_2) throw e_2.error; }
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    TasksMainImpl.prototype.$executeTask = function (taskDto) {
        return __awaiter(this, void 0, void 0, function () {
            var taskConfig, taskInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        taskConfig = this.toTaskConfiguration(taskDto);
                        return [4 /*yield*/, this.taskService.runTask(taskConfig)];
                    case 1:
                        taskInfo = _a.sent();
                        if (taskInfo) {
                            return [2 /*return*/, {
                                    id: taskInfo.taskId,
                                    task: this.fromTaskConfiguration(taskInfo.config)
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TasksMainImpl.prototype.$taskExecutions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var runningTasks;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.taskService.getRunningTasks()];
                    case 1:
                        runningTasks = _a.sent();
                        return [2 /*return*/, runningTasks.map(function (taskInfo) { return ({
                                id: taskInfo.taskId,
                                task: _this.fromTaskConfiguration(taskInfo.config)
                            }); })];
                }
            });
        });
    };
    TasksMainImpl.prototype.$terminateTask = function (id) {
        this.taskService.kill(id);
    };
    TasksMainImpl.prototype.createTaskProvider = function (handle) {
        var _this = this;
        return {
            provideTasks: function () {
                return _this.proxy.$provideTasks(handle).then(function (v) {
                    return v.map(function (taskDto) {
                        return _this.toTaskConfiguration(taskDto);
                    });
                });
            }
        };
    };
    TasksMainImpl.prototype.createTaskResolver = function (handle) {
        var _this = this;
        return {
            resolveTask: function (taskConfig) {
                return _this.proxy.$resolveTask(handle, _this.fromTaskConfiguration(taskConfig)).then(function (v) {
                    return _this.toTaskConfiguration(v);
                });
            }
        };
    };
    TasksMainImpl.prototype.toTaskConfiguration = function (taskDto) {
        var group = taskDto.group, taskConfiguration = __rest(taskDto, ["group"]);
        if (group === 'build' || group === 'test') {
            taskConfiguration.group = group;
        }
        return Object.assign(taskConfiguration, {
            _source: taskConfiguration.source,
            _scope: taskConfiguration.scope
        });
    };
    TasksMainImpl.prototype.fromTaskConfiguration = function (task) {
        var group = task.group, taskDto = __rest(task, ["group"]);
        if (group) {
            if (task_protocol_1.TaskCustomization.isBuildTask(task)) {
                taskDto.group = 'build';
            }
            else if (task_protocol_1.TaskCustomization.isTestTask(task)) {
                taskDto.group = 'test';
            }
        }
        return Object.assign(taskDto, {
            source: taskDto._source,
            scope: taskDto._scope
        });
    };
    return TasksMainImpl;
}());
exports.TasksMainImpl = TasksMainImpl;
//# sourceMappingURL=tasks-main.js.map