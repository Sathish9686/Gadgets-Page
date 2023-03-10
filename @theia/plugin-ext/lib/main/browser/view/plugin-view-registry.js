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
exports.PluginViewRegistry = exports.PLUGIN_VIEW_DATA_FACTORY_ID = exports.PLUGIN_VIEW_CONTAINER_FACTORY_ID = exports.PLUGIN_VIEW_FACTORY_ID = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var plugin_shared_style_1 = require("../plugin-shared-style");
var debug_widget_1 = require("@theia/debug/lib/browser/view/debug-widget");
var plugin_view_widget_1 = require("./plugin-view-widget");
var scm_contribution_1 = require("@theia/scm/lib/browser/scm-contribution");
var browser_2 = require("@theia/navigator/lib/browser");
var navigator_contribution_1 = require("@theia/navigator/lib/browser/navigator-contribution");
var debug_frontend_application_contribution_1 = require("@theia/debug/lib/browser/debug-frontend-application-contribution");
var disposable_1 = require("@theia/core/lib/common/disposable");
var command_1 = require("@theia/core/lib/common/command");
var menu_1 = require("@theia/core/lib/common/menu");
var quick_view_service_1 = require("@theia/core/lib/browser/quick-view-service");
var event_1 = require("@theia/core/lib/common/event");
var context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
var search_in_workspace_widget_1 = require("@theia/search-in-workspace/lib/browser/search-in-workspace-widget");
var view_context_key_service_1 = require("./view-context-key-service");
var problem_widget_1 = require("@theia/markers/lib/browser/problem/problem-widget");
var output_widget_1 = require("@theia/output/lib/browser/output-widget");
var debug_console_contribution_1 = require("@theia/debug/lib/browser/console/debug-console-contribution");
var terminal_widget_impl_1 = require("@theia/terminal/lib/browser/terminal-widget-impl");
exports.PLUGIN_VIEW_FACTORY_ID = 'plugin-view';
exports.PLUGIN_VIEW_CONTAINER_FACTORY_ID = 'plugin-view-container';
exports.PLUGIN_VIEW_DATA_FACTORY_ID = 'plugin-view-data';
var PluginViewRegistry = /** @class */ (function () {
    function PluginViewRegistry() {
        this.onDidExpandViewEmitter = new event_1.Emitter();
        this.onDidExpandView = this.onDidExpandViewEmitter.event;
        this.views = new Map();
        this.viewsWelcome = new Map();
        this.viewContainers = new Map();
        this.containerViews = new Map();
        this.viewClauseContexts = new Map();
        this.viewDataProviders = new Map();
        this.viewDataState = new Map();
        this.visiblePanels = new Set();
        this.visibleViewlets = new Set();
    }
    PluginViewRegistry.prototype.init = function () {
        var _this = this;
        // VS Code Viewlets
        this.trackVisibleWidget(browser_2.EXPLORER_VIEW_CONTAINER_ID, { viewletId: 'workbench.view.explorer' });
        this.trackVisibleWidget(search_in_workspace_widget_1.SearchInWorkspaceWidget.ID, { viewletId: 'workbench.view.search', sideArea: true });
        this.trackVisibleWidget(scm_contribution_1.SCM_VIEW_CONTAINER_ID, { viewletId: 'workbench.view.scm' });
        this.trackVisibleWidget(debug_widget_1.DebugWidget.ID, { viewletId: 'workbench.view.debug' });
        // TODO workbench.view.extensions - Theia does not have a proper extension view yet
        // VS Code Panels
        this.trackVisibleWidget(problem_widget_1.PROBLEMS_WIDGET_ID, { panelId: 'workbench.panel.markers' });
        this.trackVisibleWidget(output_widget_1.OUTPUT_WIDGET_KIND, { panelId: 'workbench.panel.output' });
        this.trackVisibleWidget(debug_console_contribution_1.DebugConsoleContribution.options.id, { panelId: 'workbench.panel.repl' });
        this.trackVisibleWidget(terminal_widget_impl_1.TERMINAL_WIDGET_FACTORY_ID, { panelId: 'workbench.panel.terminal' });
        // TODO workbench.panel.comments - Theia does not have a proper comments view yet
        this.trackVisibleWidget(search_in_workspace_widget_1.SearchInWorkspaceWidget.ID, { panelId: 'workbench.view.search', sideArea: false });
        this.updateFocusedView();
        this.shell.onDidChangeActiveWidget(function () { return _this.updateFocusedView(); });
        this.widgetManager.onWillCreateWidget(function (_a) {
            var factoryId = _a.factoryId, widget = _a.widget, waitUntil = _a.waitUntil;
            if (factoryId === browser_2.EXPLORER_VIEW_CONTAINER_ID && widget instanceof browser_1.ViewContainer) {
                waitUntil(_this.prepareViewContainer('explorer', widget));
            }
            if (factoryId === scm_contribution_1.SCM_VIEW_CONTAINER_ID && widget instanceof browser_1.ViewContainer) {
                waitUntil(_this.prepareViewContainer('scm', widget));
            }
            if (factoryId === debug_widget_1.DebugWidget.ID && widget instanceof debug_widget_1.DebugWidget) {
                var viewContainer = widget['sessionWidget']['viewContainer'];
                waitUntil(_this.prepareViewContainer('debug', viewContainer));
            }
            if (factoryId === exports.PLUGIN_VIEW_CONTAINER_FACTORY_ID && widget instanceof browser_1.ViewContainer) {
                waitUntil(_this.prepareViewContainer(_this.toViewContainerId(widget.options), widget));
            }
            if (factoryId === exports.PLUGIN_VIEW_FACTORY_ID && widget instanceof plugin_view_widget_1.PluginViewWidget) {
                waitUntil(_this.prepareView(widget));
            }
        });
        this.widgetManager.onDidCreateWidget(function (event) {
            if (event.widget instanceof browser_2.FileNavigatorWidget) {
                _this.registerViewWelcome({
                    view: 'explorer',
                    // eslint-disable-next-line max-len
                    content: 'You have not yet opened a folder.\n[Open Folder](command:workbench.action.files.openFolder)',
                    order: 0
                });
            }
        });
        this.doRegisterViewContainer('test', 'left', {
            label: 'Test',
            iconClass: 'theia-plugin-test-tab-icon',
            closeable: true
        });
        this.contextKeyService.onDidChange(function (e) {
            var e_1, _a, e_2, _b, e_3, _c;
            try {
                for (var _d = __values(_this.views.values()), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var _f = __read(_e.value, 2), view = _f[1];
                    var clauseContext = _this.viewClauseContexts.get(view.id);
                    if (clauseContext && e.affects(clauseContext)) {
                        _this.updateViewVisibility(view.id);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var _g = __values(_this.viewsWelcome), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var _j = __read(_h.value, 2), viewId = _j[0], viewWelcomes = _j[1];
                    try {
                        for (var _k = (e_3 = void 0, __values(viewWelcomes.entries())), _l = _k.next(); !_l.done; _l = _k.next()) {
                            var _m = __read(_l.value, 1), index = _m[0];
                            var viewWelcomeId = _this.toViewWelcomeId(index, viewId);
                            var clauseContext = _this.viewClauseContexts.get(viewWelcomeId);
                            if (clauseContext && e.affects(clauseContext)) {
                                _this.updateViewWelcomeVisibility(viewId);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    };
    PluginViewRegistry.prototype.updateViewWelcomeVisibility = function (viewId) {
        return __awaiter(this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTreeViewWelcomeWidget(viewId)];
                    case 1:
                        widget = _a.sent();
                        if (widget) {
                            widget.handleWelcomeContextChange();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginViewRegistry.prototype.updateViewVisibility = function (viewId) {
        return __awaiter(this, void 0, void 0, function () {
            var widget, viewInfo, _a, viewContainerId, viewContainer, part;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getView(viewId)];
                    case 1:
                        widget = _b.sent();
                        if (!!widget) return [3 /*break*/, 4];
                        if (!this.isViewVisible(viewId)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.openView(viewId)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                    case 4:
                        viewInfo = this.views.get(viewId);
                        if (!viewInfo) {
                            return [2 /*return*/];
                        }
                        _a = __read(viewInfo, 1), viewContainerId = _a[0];
                        return [4 /*yield*/, this.getPluginViewContainer(viewContainerId)];
                    case 5:
                        viewContainer = _b.sent();
                        if (!viewContainer) {
                            return [2 /*return*/];
                        }
                        part = viewContainer.getPartFor(widget);
                        if (!part) {
                            return [2 /*return*/];
                        }
                        widget.updateViewVisibility(function () {
                            return part.setHidden(!_this.isViewVisible(viewId));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginViewRegistry.prototype.isViewVisible = function (viewId) {
        var viewInfo = this.views.get(viewId);
        if (!viewInfo) {
            return false;
        }
        var _a = __read(viewInfo, 2), view = _a[1];
        return view.when === undefined || view.when === 'true' || this.contextKeyService.match(view.when);
    };
    PluginViewRegistry.prototype.registerViewContainer = function (location, viewContainer) {
        if (this.viewContainers.has(viewContainer.id)) {
            console.warn('view container such id already registered: ', JSON.stringify(viewContainer));
            return disposable_1.Disposable.NULL;
        }
        var toDispose = new disposable_1.DisposableCollection();
        var containerClass = 'theia-plugin-view-container';
        var iconClass = 'plugin-view-container-icon-' + viewContainer.id;
        var iconUrl = plugin_shared_style_1.PluginSharedStyle.toExternalIconUrl(viewContainer.iconUrl);
        toDispose.push(this.style.insertRule('.' + containerClass + '.' + iconClass, function () { return "\n                mask: url('" + iconUrl + "') no-repeat 50% 50%;\n                -webkit-mask: url('" + iconUrl + "') no-repeat 50% 50%;\n            "; }));
        toDispose.push(this.doRegisterViewContainer(viewContainer.id, location, {
            label: viewContainer.title,
            iconClass: containerClass + ' ' + iconClass,
            closeable: true
        }));
        return toDispose;
    };
    PluginViewRegistry.prototype.doRegisterViewContainer = function (id, location, options) {
        var _this = this;
        var toDispose = new disposable_1.DisposableCollection();
        this.viewContainers.set(id, [location, options]);
        toDispose.push(disposable_1.Disposable.create(function () { return _this.viewContainers.delete(id); }));
        var toggleCommandId = "plugin.view-container." + id + ".toggle";
        toDispose.push(this.commands.registerCommand({
            id: toggleCommandId,
            label: 'Toggle ' + options.label + ' View'
        }, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var widget;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getPluginViewContainer(id)];
                        case 1:
                            widget = _a.sent();
                            if (!widget) return [3 /*break*/, 2];
                            widget.dispose();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.openViewContainer(id)];
                        case 3:
                            widget = _a.sent();
                            if (widget) {
                                this.shell.activateWidget(widget.id);
                            }
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); }
        }));
        toDispose.push(this.menus.registerMenuAction(browser_1.CommonMenus.VIEW_VIEWS, {
            commandId: toggleCommandId,
            label: options.label
        }));
        toDispose.push(this.quickView.registerItem({
            label: options.label,
            open: function () { return __awaiter(_this, void 0, void 0, function () {
                var widget;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.openViewContainer(id)];
                        case 1:
                            widget = _a.sent();
                            if (widget) {
                                this.shell.activateWidget(widget.id);
                            }
                            return [2 /*return*/];
                    }
                });
            }); }
        }));
        toDispose.push(disposable_1.Disposable.create(function () { return __awaiter(_this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPluginViewContainer(id)];
                    case 1:
                        widget = _a.sent();
                        if (widget) {
                            widget.dispose();
                        }
                        return [2 /*return*/];
                }
            });
        }); }));
        return toDispose;
    };
    PluginViewRegistry.prototype.getContainerViews = function (viewContainerId) {
        return this.containerViews.get(viewContainerId) || [];
    };
    PluginViewRegistry.prototype.registerView = function (viewContainerId, view) {
        var _this = this;
        var _a;
        if (this.views.has(view.id)) {
            console.warn('view with such id already registered: ', JSON.stringify(view));
            return disposable_1.Disposable.NULL;
        }
        var toDispose = new disposable_1.DisposableCollection();
        view.when = (_a = view.when) === null || _a === void 0 ? void 0 : _a.trim();
        this.views.set(view.id, [viewContainerId, view]);
        toDispose.push(disposable_1.Disposable.create(function () { return _this.views.delete(view.id); }));
        var containerViews = this.getContainerViews(viewContainerId);
        containerViews.push(view.id);
        this.containerViews.set(viewContainerId, containerViews);
        toDispose.push(disposable_1.Disposable.create(function () {
            var index = containerViews.indexOf(view.id);
            if (index !== -1) {
                containerViews.splice(index, 1);
            }
        }));
        if (view.when && view.when !== 'false' && view.when !== 'true') {
            this.viewClauseContexts.set(view.id, this.contextKeyService.parseKeys(view.when));
            toDispose.push(disposable_1.Disposable.create(function () { return _this.viewClauseContexts.delete(view.id); }));
        }
        toDispose.push(this.quickView.registerItem({
            label: view.name,
            when: view.when,
            open: function () { return _this.openView(view.id, { activate: true }); }
        }));
        toDispose.push(this.commands.registerCommand({ id: view.id + ".focus" }, {
            execute: function () { return _this.openView(view.id, { activate: true }); }
        }));
        return toDispose;
    };
    PluginViewRegistry.prototype.registerViewWelcome = function (viewWelcome) {
        var _this = this;
        var toDispose = new disposable_1.DisposableCollection();
        var viewsWelcome = this.viewsWelcome.get(viewWelcome.view) || [];
        viewsWelcome.push(viewWelcome);
        this.viewsWelcome.set(viewWelcome.view, viewsWelcome);
        this.handleViewWelcomeChange(viewWelcome.view);
        toDispose.push(disposable_1.Disposable.create(function () {
            var index = viewsWelcome.indexOf(viewWelcome);
            if (index !== -1) {
                viewsWelcome.splice(index, 1);
            }
            _this.handleViewWelcomeChange(viewWelcome.view);
        }));
        if (viewWelcome.when) {
            var index = viewsWelcome.indexOf(viewWelcome);
            var viewWelcomeId_1 = this.toViewWelcomeId(index, viewWelcome.view);
            this.viewClauseContexts.set(viewWelcomeId_1, this.contextKeyService.parseKeys(viewWelcome.when));
            toDispose.push(disposable_1.Disposable.create(function () { return _this.viewClauseContexts.delete(viewWelcomeId_1); }));
        }
        return toDispose;
    };
    PluginViewRegistry.prototype.handleViewWelcomeChange = function (viewId) {
        return __awaiter(this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTreeViewWelcomeWidget(viewId)];
                    case 1:
                        widget = _a.sent();
                        if (widget) {
                            widget.handleViewWelcomeContentChange(this.getViewWelcomes(viewId));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginViewRegistry.prototype.getTreeViewWelcomeWidget = function (viewId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (viewId) {
                    case 'explorer':
                        return [2 /*return*/, this.widgetManager.getWidget(browser_2.FILE_NAVIGATOR_ID)];
                    default:
                        return [2 /*return*/, this.widgetManager.getWidget(exports.PLUGIN_VIEW_DATA_FACTORY_ID, { id: viewId })];
                }
                return [2 /*return*/];
            });
        });
    };
    PluginViewRegistry.prototype.getViewWelcomes = function (viewId) {
        return this.viewsWelcome.get(viewId) || [];
    };
    PluginViewRegistry.prototype.getView = function (viewId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.views.has(viewId)) {
                    return [2 /*return*/, undefined];
                }
                return [2 /*return*/, this.widgetManager.getWidget(exports.PLUGIN_VIEW_FACTORY_ID, this.toPluginViewWidgetIdentifier(viewId))];
            });
        });
    };
    PluginViewRegistry.prototype.openView = function (viewId, options) {
        return __awaiter(this, void 0, void 0, function () {
            var view;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doOpenView(viewId)];
                    case 1:
                        view = _a.sent();
                        if (!(view && options)) return [3 /*break*/, 5];
                        if (!(options.activate === true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.shell.activateWidget(view.id)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(options.reveal === true)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.shell.revealWidget(view.id)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, view];
                }
            });
        });
    };
    PluginViewRegistry.prototype.doOpenView = function (viewId) {
        return __awaiter(this, void 0, void 0, function () {
            var widget, data, _a, containerId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getView(viewId)];
                    case 1:
                        widget = _b.sent();
                        if (widget) {
                            return [2 /*return*/, widget];
                        }
                        data = this.views.get(viewId);
                        if (!data) {
                            return [2 /*return*/, undefined];
                        }
                        _a = __read(data, 1), containerId = _a[0];
                        return [4 /*yield*/, this.openViewContainer(containerId)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, this.getView(viewId)];
                }
            });
        });
    };
    PluginViewRegistry.prototype.prepareView = function (widget) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a, view, currentDataWidget, viewDataWidget;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = this.views.get(widget.options.viewId);
                        if (!data) {
                            return [2 /*return*/];
                        }
                        _a = __read(data, 2), view = _a[1];
                        widget.title.label = view.name;
                        currentDataWidget = widget.widgets[0];
                        return [4 /*yield*/, this.createViewDataWidget(view.id)];
                    case 1:
                        viewDataWidget = _b.sent();
                        if (widget.isDisposed) {
                            // eslint-disable-next-line no-unused-expressions
                            viewDataWidget === null || viewDataWidget === void 0 ? void 0 : viewDataWidget.dispose();
                            return [2 /*return*/];
                        }
                        if (currentDataWidget !== viewDataWidget) {
                            if (currentDataWidget) {
                                currentDataWidget.dispose();
                            }
                            if (viewDataWidget) {
                                widget.addWidget(viewDataWidget);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginViewRegistry.prototype.openViewContainer = function (containerId) {
        return __awaiter(this, void 0, void 0, function () {
            var widget, widget, widget, data, _a, location, identifier, containerWidget;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(containerId === 'explorer')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.explorer.openView()];
                    case 1:
                        widget = _b.sent();
                        if (widget.parent instanceof browser_1.ViewContainer) {
                            return [2 /*return*/, widget.parent];
                        }
                        return [2 /*return*/, undefined];
                    case 2:
                        if (!(containerId === 'scm')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.scm.openView()];
                    case 3:
                        widget = _b.sent();
                        if (widget.parent instanceof browser_1.ViewContainer) {
                            return [2 /*return*/, widget.parent];
                        }
                        return [2 /*return*/, undefined];
                    case 4:
                        if (!(containerId === 'debug')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.debug.openView()];
                    case 5:
                        widget = _b.sent();
                        return [2 /*return*/, widget['sessionWidget']['viewContainer']];
                    case 6:
                        data = this.viewContainers.get(containerId);
                        if (!data) {
                            return [2 /*return*/, undefined];
                        }
                        _a = __read(data, 1), location = _a[0];
                        identifier = this.toViewContainerIdentifier(containerId);
                        return [4 /*yield*/, this.widgetManager.getOrCreateWidget(exports.PLUGIN_VIEW_CONTAINER_FACTORY_ID, identifier)];
                    case 7:
                        containerWidget = _b.sent();
                        if (!!containerWidget.isAttached) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.shell.addWidget(containerWidget, {
                                area: browser_1.ApplicationShell.isSideArea(location) ? location : 'left',
                                rank: Number.MAX_SAFE_INTEGER
                            })];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [2 /*return*/, containerWidget];
                }
            });
        });
    };
    PluginViewRegistry.prototype.prepareViewContainer = function (viewContainerId, containerWidget) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a, options, _loop_1, this_1, _b, _c, viewId, e_4_1;
            var e_4, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        data = this.viewContainers.get(viewContainerId);
                        if (data) {
                            _a = __read(data, 2), options = _a[1];
                            containerWidget.setTitleOptions(options);
                        }
                        _loop_1 = function (viewId) {
                            var identifier, widget, part, tryFireOnDidExpandView, toFire_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        identifier = this_1.toPluginViewWidgetIdentifier(viewId);
                                        return [4 /*yield*/, this_1.widgetManager.getOrCreateWidget(exports.PLUGIN_VIEW_FACTORY_ID, identifier)];
                                    case 1:
                                        widget = _a.sent();
                                        if (containerWidget.getTrackableWidgets().indexOf(widget) === -1) {
                                            containerWidget.addWidget(widget, {
                                                initiallyCollapsed: !!containerWidget.getParts().length,
                                                initiallyHidden: !this_1.isViewVisible(viewId)
                                            });
                                        }
                                        part = containerWidget.getPartFor(widget);
                                        if (part) {
                                            // if a view is explicitly hidden then suppress updating visibility based on `when` closure
                                            part.onDidChangeVisibility(function () { return widget.suppressUpdateViewVisibility = part.isHidden; });
                                            tryFireOnDidExpandView = function () {
                                                if (widget.widgets.length === 0) {
                                                    if (!part.collapsed && part.isVisible) {
                                                        _this.onDidExpandViewEmitter.fire(viewId);
                                                    }
                                                }
                                                else {
                                                    toFire_1.dispose();
                                                }
                                            };
                                            toFire_1 = new disposable_1.DisposableCollection(part.onCollapsed(tryFireOnDidExpandView), part.onDidChangeVisibility(tryFireOnDidExpandView));
                                            tryFireOnDidExpandView();
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, 7, 8]);
                        _b = __values(this.getContainerViews(viewContainerId)), _c = _b.next();
                        _e.label = 2;
                    case 2:
                        if (!!_c.done) return [3 /*break*/, 5];
                        viewId = _c.value;
                        return [5 /*yield**/, _loop_1(viewId)];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4:
                        _c = _b.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_4_1 = _e.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    PluginViewRegistry.prototype.getPluginViewContainer = function (viewContainerId) {
        return __awaiter(this, void 0, void 0, function () {
            var debug, identifier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (viewContainerId === 'explorer') {
                            return [2 /*return*/, this.widgetManager.getWidget(browser_2.EXPLORER_VIEW_CONTAINER_ID)];
                        }
                        if (viewContainerId === 'scm') {
                            return [2 /*return*/, this.widgetManager.getWidget(scm_contribution_1.SCM_VIEW_CONTAINER_ID)];
                        }
                        if (!(viewContainerId === 'debug')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.widgetManager.getWidget(debug_widget_1.DebugWidget.ID)];
                    case 1:
                        debug = _a.sent();
                        if (debug instanceof debug_widget_1.DebugWidget) {
                            return [2 /*return*/, debug['sessionWidget']['viewContainer']];
                        }
                        _a.label = 2;
                    case 2:
                        identifier = this.toViewContainerIdentifier(viewContainerId);
                        return [2 /*return*/, this.widgetManager.getWidget(exports.PLUGIN_VIEW_CONTAINER_FACTORY_ID, identifier)];
                }
            });
        });
    };
    PluginViewRegistry.prototype.initWidgets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises, _loop_2, _a, _b, id;
            var e_5, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        promises = [];
                        _loop_2 = function (id) {
                            promises.push((function () { return __awaiter(_this, void 0, void 0, function () {
                                var viewContainer;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getPluginViewContainer(id)];
                                        case 1:
                                            viewContainer = _a.sent();
                                            if (!!viewContainer) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.openViewContainer(id)];
                                        case 2:
                                            viewContainer = _a.sent();
                                            if (viewContainer && !viewContainer.getParts().filter(function (part) { return !part.isHidden; }).length) {
                                                // close view containers without any visible view parts
                                                viewContainer.dispose();
                                            }
                                            return [3 /*break*/, 5];
                                        case 3: return [4 /*yield*/, this.prepareViewContainer(this.toViewContainerId(viewContainer.options), viewContainer)];
                                        case 4:
                                            _a.sent();
                                            _a.label = 5;
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); })().catch(console.error));
                        };
                        try {
                            for (_a = __values(this.viewContainers.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
                                id = _b.value;
                                _loop_2(id);
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                        promises.push((function () { return __awaiter(_this, void 0, void 0, function () {
                            var explorer;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.widgetManager.getWidget(browser_2.EXPLORER_VIEW_CONTAINER_ID)];
                                    case 1:
                                        explorer = _a.sent();
                                        if (!(explorer instanceof browser_1.ViewContainer)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this.prepareViewContainer('explorer', explorer)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })().catch(console.error));
                        promises.push((function () { return __awaiter(_this, void 0, void 0, function () {
                            var scm;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.widgetManager.getWidget(scm_contribution_1.SCM_VIEW_CONTAINER_ID)];
                                    case 1:
                                        scm = _a.sent();
                                        if (!(scm instanceof browser_1.ViewContainer)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this.prepareViewContainer('scm', scm)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })().catch(console.error));
                        promises.push((function () { return __awaiter(_this, void 0, void 0, function () {
                            var debug, viewContainer;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.widgetManager.getWidget(debug_widget_1.DebugWidget.ID)];
                                    case 1:
                                        debug = _a.sent();
                                        if (!(debug instanceof debug_widget_1.DebugWidget)) return [3 /*break*/, 3];
                                        viewContainer = debug['sessionWidget']['viewContainer'];
                                        return [4 /*yield*/, this.prepareViewContainer('debug', viewContainer)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })().catch(console.error));
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginViewRegistry.prototype.removeStaleWidgets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var views, views_1, views_1_1, view, id, viewContainers, viewContainers_1, viewContainers_1_1, viewContainer, id;
            var e_6, _a, e_7, _b;
            return __generator(this, function (_c) {
                views = this.widgetManager.getWidgets(exports.PLUGIN_VIEW_FACTORY_ID);
                try {
                    for (views_1 = __values(views), views_1_1 = views_1.next(); !views_1_1.done; views_1_1 = views_1.next()) {
                        view = views_1_1.value;
                        if (view instanceof plugin_view_widget_1.PluginViewWidget) {
                            id = this.toViewId(view.options);
                            if (!this.views.has(id)) {
                                view.dispose();
                            }
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (views_1_1 && !views_1_1.done && (_a = views_1.return)) _a.call(views_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                viewContainers = this.widgetManager.getWidgets(exports.PLUGIN_VIEW_CONTAINER_FACTORY_ID);
                try {
                    for (viewContainers_1 = __values(viewContainers), viewContainers_1_1 = viewContainers_1.next(); !viewContainers_1_1.done; viewContainers_1_1 = viewContainers_1.next()) {
                        viewContainer = viewContainers_1_1.value;
                        if (viewContainer instanceof browser_1.ViewContainer) {
                            id = this.toViewContainerId(viewContainer.options);
                            if (!this.viewContainers.has(id)) {
                                viewContainer.dispose();
                            }
                        }
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (viewContainers_1_1 && !viewContainers_1_1.done && (_b = viewContainers_1.return)) _b.call(viewContainers_1);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
                return [2 /*return*/];
            });
        });
    };
    PluginViewRegistry.prototype.toViewContainerIdentifier = function (viewContainerId) {
        return { id: exports.PLUGIN_VIEW_CONTAINER_FACTORY_ID + ':' + viewContainerId, progressLocationId: viewContainerId };
    };
    PluginViewRegistry.prototype.toViewContainerId = function (identifier) {
        return identifier.id.substr(exports.PLUGIN_VIEW_CONTAINER_FACTORY_ID.length + 1);
    };
    PluginViewRegistry.prototype.toPluginViewWidgetIdentifier = function (viewId) {
        return { id: exports.PLUGIN_VIEW_FACTORY_ID + ':' + viewId, viewId: viewId };
    };
    PluginViewRegistry.prototype.toViewId = function (identifier) {
        return identifier.viewId;
    };
    PluginViewRegistry.prototype.toViewWelcomeId = function (index, viewId) {
        return "view-welcome." + viewId + "." + index;
    };
    /**
     * retrieve restored layout state from previous??user session but close widgets
     * widgets should be opened only when view data providers are registered
     */
    PluginViewRegistry.prototype.onDidInitializeLayout = function () {
        var e_8, _a;
        var widgets = this.widgetManager.getWidgets(exports.PLUGIN_VIEW_DATA_FACTORY_ID);
        try {
            for (var widgets_1 = __values(widgets), widgets_1_1 = widgets_1.next(); !widgets_1_1.done; widgets_1_1 = widgets_1.next()) {
                var widget = widgets_1_1.value;
                if (browser_1.StatefulWidget.is(widget)) {
                    var state = widget.storeState();
                    if (state) {
                        this.viewDataState.set(widget.id, state);
                    }
                }
                widget.dispose();
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (widgets_1_1 && !widgets_1_1.done && (_a = widgets_1.return)) _a.call(widgets_1);
            }
            finally { if (e_8) throw e_8.error; }
        }
    };
    PluginViewRegistry.prototype.registerViewDataProvider = function (viewId, provider) {
        var _this = this;
        if (this.viewDataProviders.has(viewId)) {
            console.error("data provider for '" + viewId + "' view is already registered");
            return disposable_1.Disposable.NULL;
        }
        this.viewDataProviders.set(viewId, provider);
        var toDispose = new disposable_1.DisposableCollection(disposable_1.Disposable.create(function () {
            _this.viewDataProviders.delete(viewId);
            _this.viewDataState.delete(viewId);
        }));
        this.getView(viewId).then(function (view) { return __awaiter(_this, void 0, void 0, function () {
            var toDisposeOnDidExpandView_1, unsubscribe_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (toDispose.disposed) {
                            return [2 /*return*/];
                        }
                        if (!view) return [3 /*break*/, 3];
                        if (!view.isVisible) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.prepareView(view)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        toDisposeOnDidExpandView_1 = new disposable_1.DisposableCollection(this.onDidExpandView(function (id) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(id === viewId)) return [3 /*break*/, 2];
                                        unsubscribe_1();
                                        return [4 /*yield*/, this.prepareView(view)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); }));
                        unsubscribe_1 = function () { return toDisposeOnDidExpandView_1.dispose(); };
                        view.disposed.connect(unsubscribe_1);
                        toDisposeOnDidExpandView_1.push(disposable_1.Disposable.create(function () { return view.disposed.disconnect(unsubscribe_1); }));
                        toDispose.push(toDisposeOnDidExpandView_1);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        return toDispose;
    };
    PluginViewRegistry.prototype.createViewDataWidget = function (viewId) {
        return __awaiter(this, void 0, void 0, function () {
            var view, provider, _a, viewInfo, state, widget;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        view = this.views.get(viewId);
                        provider = this.viewDataProviders.get(viewId);
                        if (!view || !provider) {
                            return [2 /*return*/, undefined];
                        }
                        _a = __read(view, 2), viewInfo = _a[1];
                        state = this.viewDataState.get(viewId);
                        return [4 /*yield*/, provider({ state: state, viewInfo: viewInfo })];
                    case 1:
                        widget = _b.sent();
                        widget.handleViewWelcomeContentChange(this.getViewWelcomes(viewId));
                        if (browser_1.StatefulWidget.is(widget)) {
                            this.storeViewDataStateOnDispose(viewId, widget);
                        }
                        else {
                            this.viewDataState.delete(viewId);
                        }
                        return [2 /*return*/, widget];
                }
            });
        });
    };
    PluginViewRegistry.prototype.storeViewDataStateOnDispose = function (viewId, widget) {
        var _this = this;
        var dispose = widget.dispose.bind(widget);
        widget.dispose = function () {
            var state = widget.storeState();
            if (state) {
                _this.viewDataState.set(viewId, state);
            }
            dispose();
        };
    };
    PluginViewRegistry.prototype.trackVisibleWidget = function (factoryId, view) {
        var _this = this;
        this.doTrackVisibleWidget(this.widgetManager.tryGetWidget(factoryId), view);
        this.widgetManager.onDidCreateWidget(function (event) {
            if (factoryId === event.factoryId) {
                var widget = event.widget;
                _this.doTrackVisibleWidget(widget, view);
            }
        });
    };
    PluginViewRegistry.prototype.doTrackVisibleWidget = function (widget, view) {
        var _this = this;
        if (widget instanceof browser_1.BaseWidget) {
            widget.onDidChangeVisibility(function () { return _this.updateVisibleWidget(widget, view); });
            var toDispose_1 = new disposable_1.DisposableCollection(disposable_1.Disposable.create(function () { return _this.updateVisibleWidget(widget, view); }), this.shell.onDidChangeActiveWidget(function () {
                if (_this.shell.activeWidget === widget) {
                    _this.updateVisibleWidget(widget, view);
                }
            }));
            if (view.sideArea !== undefined) {
                toDispose_1.pushAll([
                    this.shell.onDidAddWidget(function (w) {
                        if (w === widget) {
                            _this.updateVisibleWidget(widget, view);
                        }
                    })
                ]);
            }
            widget.disposed.connect(function () { return toDispose_1.dispose(); });
        }
    };
    PluginViewRegistry.prototype.updateVisibleWidget = function (widget, view) {
        var visibleViews = 'viewletId' in view ? this.visibleViewlets : this.visiblePanels;
        var viewId = 'viewletId' in view ? view.viewletId : view.panelId;
        var visibleView = 'viewletId' in view ? this.viewContextKeys.activeViewlet : this.viewContextKeys.activePanel;
        visibleViews.delete(viewId);
        if (this.isVisibleWidget(widget, view)) {
            visibleView.set(viewId);
            visibleViews.add(viewId);
        }
        else {
            var lastVisibleView = __spread(visibleViews.values())[visibleViews.size - 1];
            visibleView.set(lastVisibleView);
        }
    };
    PluginViewRegistry.prototype.isVisibleWidget = function (widget, view) {
        if (widget.isDisposed || !widget.isVisible) {
            return false;
        }
        if (view.sideArea === undefined) {
            return true;
        }
        var area = this.shell.getAreaFor(widget);
        return view.sideArea === (area === 'left' || area === 'right');
    };
    PluginViewRegistry.prototype.updateFocusedView = function () {
        var widget = this.shell.activeWidget;
        if (widget instanceof plugin_view_widget_1.PluginViewWidget) {
            this.viewContextKeys.focusedView.set(widget.options.viewId);
        }
        else {
            this.viewContextKeys.focusedView.reset();
        }
    };
    __decorate([
        inversify_1.inject(browser_1.ApplicationShell),
        __metadata("design:type", browser_1.ApplicationShell)
    ], PluginViewRegistry.prototype, "shell", void 0);
    __decorate([
        inversify_1.inject(plugin_shared_style_1.PluginSharedStyle),
        __metadata("design:type", plugin_shared_style_1.PluginSharedStyle)
    ], PluginViewRegistry.prototype, "style", void 0);
    __decorate([
        inversify_1.inject(browser_1.WidgetManager),
        __metadata("design:type", browser_1.WidgetManager)
    ], PluginViewRegistry.prototype, "widgetManager", void 0);
    __decorate([
        inversify_1.inject(scm_contribution_1.ScmContribution),
        __metadata("design:type", scm_contribution_1.ScmContribution)
    ], PluginViewRegistry.prototype, "scm", void 0);
    __decorate([
        inversify_1.inject(navigator_contribution_1.FileNavigatorContribution),
        __metadata("design:type", navigator_contribution_1.FileNavigatorContribution)
    ], PluginViewRegistry.prototype, "explorer", void 0);
    __decorate([
        inversify_1.inject(debug_frontend_application_contribution_1.DebugFrontendApplicationContribution),
        __metadata("design:type", debug_frontend_application_contribution_1.DebugFrontendApplicationContribution)
    ], PluginViewRegistry.prototype, "debug", void 0);
    __decorate([
        inversify_1.inject(command_1.CommandRegistry),
        __metadata("design:type", command_1.CommandRegistry)
    ], PluginViewRegistry.prototype, "commands", void 0);
    __decorate([
        inversify_1.inject(menu_1.MenuModelRegistry),
        __metadata("design:type", menu_1.MenuModelRegistry)
    ], PluginViewRegistry.prototype, "menus", void 0);
    __decorate([
        inversify_1.inject(quick_view_service_1.QuickViewService),
        __metadata("design:type", quick_view_service_1.QuickViewService)
    ], PluginViewRegistry.prototype, "quickView", void 0);
    __decorate([
        inversify_1.inject(context_key_service_1.ContextKeyService),
        __metadata("design:type", context_key_service_1.ContextKeyService)
    ], PluginViewRegistry.prototype, "contextKeyService", void 0);
    __decorate([
        inversify_1.inject(view_context_key_service_1.ViewContextKeyService),
        __metadata("design:type", view_context_key_service_1.ViewContextKeyService)
    ], PluginViewRegistry.prototype, "viewContextKeys", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PluginViewRegistry.prototype, "init", null);
    PluginViewRegistry = __decorate([
        inversify_1.injectable()
    ], PluginViewRegistry);
    return PluginViewRegistry;
}());
exports.PluginViewRegistry = PluginViewRegistry;
//# sourceMappingURL=plugin-view-registry.js.map