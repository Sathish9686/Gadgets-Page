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
exports.TreeViewsMainImpl = void 0;
var plugin_api_rpc_1 = require("../../../common/plugin-api-rpc");
var plugin_view_registry_1 = require("./plugin-view-registry");
var browser_1 = require("@theia/core/lib/browser");
var view_context_key_service_1 = require("./view-context-key-service");
var core_1 = require("@theia/core");
var tree_view_widget_1 = require("./tree-view-widget");
var plugin_view_widget_1 = require("./plugin-view-widget");
var TreeViewsMainImpl = /** @class */ (function () {
    function TreeViewsMainImpl(rpc, container) {
        this.container = container;
        this.treeViewProviders = new Map();
        this.toDispose = new core_1.DisposableCollection(core_1.Disposable.create(function () { }));
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.TREE_VIEWS_EXT);
        this.viewRegistry = container.get(plugin_view_registry_1.PluginViewRegistry);
        this.contextKeys = this.container.get(view_context_key_service_1.ViewContextKeyService);
        this.widgetManager = this.container.get(browser_1.WidgetManager);
    }
    TreeViewsMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    TreeViewsMainImpl.prototype.$registerTreeDataProvider = function (treeViewId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.treeViewProviders.set(treeViewId, this.viewRegistry.registerViewDataProvider(treeViewId, function (_a) {
                    var state = _a.state, viewInfo = _a.viewInfo;
                    return __awaiter(_this, void 0, void 0, function () {
                        var widget, root;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, this.widgetManager.getOrCreateWidget(plugin_view_registry_1.PLUGIN_VIEW_DATA_FACTORY_ID, { id: treeViewId })];
                                case 1:
                                    widget = _b.sent();
                                    widget.model.viewInfo = viewInfo;
                                    if (!state) return [3 /*break*/, 3];
                                    widget.restoreState(state);
                                    // ensure that state is completely restored
                                    return [4 /*yield*/, widget.model.refresh()];
                                case 2:
                                    // ensure that state is completely restored
                                    _b.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    if (!widget.model.root) {
                                        root = {
                                            id: '',
                                            parent: undefined,
                                            name: '',
                                            visible: false,
                                            expanded: true,
                                            children: []
                                        };
                                        widget.model.root = root;
                                    }
                                    _b.label = 4;
                                case 4:
                                    if (this.toDispose.disposed) {
                                        widget.model.proxy = undefined;
                                    }
                                    else {
                                        widget.model.proxy = this.proxy;
                                        this.toDispose.push(core_1.Disposable.create(function () { return widget.model.proxy = undefined; }));
                                        this.handleTreeEvents(widget.id, widget);
                                    }
                                    return [4 /*yield*/, widget.model.refresh()];
                                case 5:
                                    _b.sent();
                                    return [2 /*return*/, widget];
                            }
                        });
                    });
                }));
                this.toDispose.push(core_1.Disposable.create(function () { return _this.$unregisterTreeDataProvider(treeViewId); }));
                return [2 /*return*/];
            });
        });
    };
    TreeViewsMainImpl.prototype.$unregisterTreeDataProvider = function (treeViewId) {
        return __awaiter(this, void 0, void 0, function () {
            var treeDataProvider;
            return __generator(this, function (_a) {
                treeDataProvider = this.treeViewProviders.get(treeViewId);
                if (treeDataProvider) {
                    this.treeViewProviders.delete(treeViewId);
                    treeDataProvider.dispose();
                }
                return [2 /*return*/];
            });
        });
    };
    TreeViewsMainImpl.prototype.$refresh = function (treeViewId) {
        return __awaiter(this, void 0, void 0, function () {
            var viewPanel, widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.viewRegistry.getView(treeViewId)];
                    case 1:
                        viewPanel = _a.sent();
                        widget = viewPanel && viewPanel.widgets[0];
                        if (!(widget instanceof tree_view_widget_1.TreeViewWidget)) return [3 /*break*/, 3];
                        return [4 /*yield*/, widget.model.refresh()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // elementParentChain parameter contain a list of tree ids from root to the revealed node
    // all parents of the revealed node should be fetched and expanded in order for it to reveal
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TreeViewsMainImpl.prototype.$reveal = function (treeViewId, elementParentChain, options) {
        return __awaiter(this, void 0, void 0, function () {
            var viewPanel, widget, elementId, treeNode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.viewRegistry.openView(treeViewId, { activate: options.focus, reveal: true })];
                    case 1:
                        viewPanel = _a.sent();
                        widget = viewPanel && viewPanel.widgets[0];
                        if (!(widget instanceof tree_view_widget_1.TreeViewWidget)) return [3 /*break*/, 5];
                        elementId = elementParentChain.pop();
                        return [4 /*yield*/, this.expandParentChain(widget.model, elementParentChain)];
                    case 2:
                        _a.sent();
                        treeNode = widget.model.getNode(elementId);
                        if (!treeNode) return [3 /*break*/, 5];
                        if (!(options.expand && browser_1.ExpandableTreeNode.is(treeNode))) return [3 /*break*/, 4];
                        return [4 /*yield*/, widget.model.expandNode(treeNode)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (options.select && browser_1.SelectableTreeNode.is(treeNode)) {
                            widget.model.selectNode(treeNode);
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Expand all parents of the node to reveal from root. This should also fetch missing nodes to the frontend.
     */
    TreeViewsMainImpl.prototype.expandParentChain = function (model, elementParentChain) {
        return __awaiter(this, void 0, void 0, function () {
            var elementParentChain_1, elementParentChain_1_1, elementId, treeNode, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 7]);
                        elementParentChain_1 = __values(elementParentChain), elementParentChain_1_1 = elementParentChain_1.next();
                        _b.label = 1;
                    case 1:
                        if (!!elementParentChain_1_1.done) return [3 /*break*/, 4];
                        elementId = elementParentChain_1_1.value;
                        treeNode = model.getNode(elementId);
                        if (!browser_1.ExpandableTreeNode.is(treeNode)) return [3 /*break*/, 3];
                        return [4 /*yield*/, model.expandNode(treeNode)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        elementParentChain_1_1 = elementParentChain_1.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (elementParentChain_1_1 && !elementParentChain_1_1.done && (_a = elementParentChain_1.return)) _a.call(elementParentChain_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    TreeViewsMainImpl.prototype.$setMessage = function (treeViewId, message) {
        return __awaiter(this, void 0, void 0, function () {
            var viewPanel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.viewRegistry.getView(treeViewId)];
                    case 1:
                        viewPanel = _a.sent();
                        if (viewPanel instanceof plugin_view_widget_1.PluginViewWidget) {
                            viewPanel.message = message;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TreeViewsMainImpl.prototype.$setTitle = function (treeViewId, title) {
        return __awaiter(this, void 0, void 0, function () {
            var viewPanel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.viewRegistry.getView(treeViewId)];
                    case 1:
                        viewPanel = _a.sent();
                        if (viewPanel) {
                            viewPanel.title.label = title;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TreeViewsMainImpl.prototype.handleTreeEvents = function (treeViewId, treeViewWidget) {
        var _this = this;
        this.toDispose.push(treeViewWidget.model.onExpansionChanged(function (event) {
            _this.proxy.$setExpanded(treeViewId, event.id, event.expanded);
        }));
        this.toDispose.push(treeViewWidget.model.onSelectionChanged(function (event) {
            if (event.length === 1) {
                var contextValue = event[0].contextValue;
                _this.contextKeys.viewItem.set(contextValue);
            }
            else {
                _this.contextKeys.viewItem.set('');
            }
            _this.contextKeys.view.set(treeViewId);
            _this.proxy.$setSelection(treeViewId, event.map(function (node) { return node.id; }));
        }));
        var updateVisible = function () { return _this.proxy.$setVisible(treeViewId, treeViewWidget.isVisible); };
        updateVisible();
        this.toDispose.push(treeViewWidget.onDidChangeVisibility(function () { return updateVisible(); }));
    };
    return TreeViewsMainImpl;
}());
exports.TreeViewsMainImpl = TreeViewsMainImpl;
//# sourceMappingURL=tree-views-main.js.map