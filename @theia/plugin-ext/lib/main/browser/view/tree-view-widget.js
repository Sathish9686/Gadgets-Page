"use strict";
/********************************************************************************
 * Copyright (C) 2018-2019 Red Hat, Inc. and others.
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.TreeViewWidget = exports.PluginTreeModel = exports.PluginTree = exports.TreeViewWidgetIdentifier = exports.CompositeTreeViewNode = exports.TreeViewNode = exports.VIEW_ITEM_INLINE_MENU = exports.VIEW_ITEM_CONTEXT_MENU = exports.TREE_NODE_HYPERLINK = void 0;
var vscode_uri_1 = require("vscode-uri");
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var plugin_api_rpc_1 = require("../../../common/plugin-api-rpc");
var menu_1 = require("@theia/core/lib/common/menu");
var React = require("react");
var plugin_shared_style_1 = require("../plugin-shared-style");
var view_context_key_service_1 = require("./view-context-key-service");
var widget_1 = require("@theia/core/lib/browser/widgets/widget");
var event_1 = require("@theia/core/lib/common/event");
var message_service_1 = require("@theia/core/lib/common/message-service");
var uri_1 = require("@theia/core/lib/common/uri");
var context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
exports.TREE_NODE_HYPERLINK = 'theia-TreeNodeHyperlink';
exports.VIEW_ITEM_CONTEXT_MENU = ['view-item-context-menu'];
exports.VIEW_ITEM_INLINE_MENU = ['view-item-inline-menu'];
var TreeViewNode;
(function (TreeViewNode) {
    function is(arg) {
        return !!arg && browser_1.SelectableTreeNode.is(arg) && !browser_1.ExpandableTreeNode.is(arg) && !browser_1.CompositeTreeNode.is(arg);
    }
    TreeViewNode.is = is;
})(TreeViewNode = exports.TreeViewNode || (exports.TreeViewNode = {}));
var CompositeTreeViewNode;
(function (CompositeTreeViewNode) {
    function is(arg) {
        return !!arg && browser_1.SelectableTreeNode.is(arg) && browser_1.ExpandableTreeNode.is(arg) && browser_1.CompositeTreeNode.is(arg);
    }
    CompositeTreeViewNode.is = is;
})(CompositeTreeViewNode = exports.CompositeTreeViewNode || (exports.CompositeTreeViewNode = {}));
var TreeViewWidgetIdentifier = /** @class */ (function () {
    function TreeViewWidgetIdentifier() {
    }
    TreeViewWidgetIdentifier = __decorate([
        inversify_1.injectable()
    ], TreeViewWidgetIdentifier);
    return TreeViewWidgetIdentifier;
}());
exports.TreeViewWidgetIdentifier = TreeViewWidgetIdentifier;
var PluginTree = /** @class */ (function (_super) {
    __extends(PluginTree, _super);
    function PluginTree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onDidChangeWelcomeStateEmitter = new event_1.Emitter();
        _this.onDidChangeWelcomeState = _this.onDidChangeWelcomeStateEmitter.event;
        return _this;
    }
    Object.defineProperty(PluginTree.prototype, "proxy", {
        get: function () {
            return this._proxy;
        },
        set: function (proxy) {
            this._proxy = proxy;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginTree.prototype, "viewInfo", {
        set: function (viewInfo) {
            this._viewInfo = viewInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginTree.prototype, "isEmpty", {
        get: function () {
            return this._isEmpty;
        },
        enumerable: false,
        configurable: true
    });
    PluginTree.prototype.resolveChildren = function (parent) {
        return __awaiter(this, void 0, void 0, function () {
            var children;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._proxy) {
                            return [2 /*return*/, _super.prototype.resolveChildren.call(this, parent)];
                        }
                        return [4 /*yield*/, this.fetchChildren(this._proxy, parent)];
                    case 1:
                        children = _a.sent();
                        return [2 /*return*/, children.map(function (value) { return _this.createTreeNode(value, parent); })];
                }
            });
        });
    };
    PluginTree.prototype.fetchChildren = function (proxy, parent) {
        return __awaiter(this, void 0, void 0, function () {
            var children, oldEmpty, e_1, label;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, proxy.$getChildren(this.identifier.id, parent.id)];
                    case 1:
                        children = _a.sent();
                        oldEmpty = this._isEmpty;
                        this._isEmpty = !parent.id && (!children || children.length === 0);
                        if (oldEmpty !== this._isEmpty) {
                            this.onDidChangeWelcomeStateEmitter.fire();
                        }
                        return [2 /*return*/, children || []];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1) {
                            console.error("Failed to fetch children for '" + this.identifier.id + "'", e_1);
                            label = this._viewInfo ? this._viewInfo.name : this.identifier.id;
                            this.notification.error(label + ": " + e_1.message);
                        }
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PluginTree.prototype.createTreeNode = function (item, parent) {
        var icon = this.toIconClass(item);
        var resourceUri = item.resourceUri && vscode_uri_1.URI.revive(item.resourceUri).toString();
        var themeIconId = item.themeIconId ? item.themeIconId : item.collapsibleState !== plugin_api_rpc_1.TreeViewItemCollapsibleState.None ? 'folder' : 'file';
        var update = {
            name: item.label,
            icon: icon,
            description: item.description,
            themeIconId: themeIconId,
            resourceUri: resourceUri,
            tooltip: item.tooltip,
            contextValue: item.contextValue
        };
        var node = this.getNode(item.id);
        if (item.collapsibleState !== undefined && item.collapsibleState !== plugin_api_rpc_1.TreeViewItemCollapsibleState.None) {
            if (CompositeTreeViewNode.is(node)) {
                return Object.assign(node, update);
            }
            return Object.assign({
                id: item.id,
                parent: parent,
                visible: true,
                selected: false,
                expanded: plugin_api_rpc_1.TreeViewItemCollapsibleState.Expanded === item.collapsibleState,
                children: []
            }, update);
        }
        if (TreeViewNode.is(node)) {
            return Object.assign(node, update, { command: item.command });
        }
        return Object.assign({
            id: item.id,
            parent: parent,
            visible: true,
            selected: false,
            command: item.command
        }, update);
    };
    PluginTree.prototype.toIconClass = function (item) {
        if (item.icon) {
            return 'fa ' + item.icon;
        }
        if (item.iconUrl) {
            var reference = this.sharedStyle.toIconClass(item.iconUrl);
            this.toDispose.push(reference);
            return reference.object.iconClass;
        }
        return undefined;
    };
    __decorate([
        inversify_1.inject(plugin_shared_style_1.PluginSharedStyle),
        __metadata("design:type", plugin_shared_style_1.PluginSharedStyle)
    ], PluginTree.prototype, "sharedStyle", void 0);
    __decorate([
        inversify_1.inject(TreeViewWidgetIdentifier),
        __metadata("design:type", TreeViewWidgetIdentifier)
    ], PluginTree.prototype, "identifier", void 0);
    __decorate([
        inversify_1.inject(message_service_1.MessageService),
        __metadata("design:type", message_service_1.MessageService)
    ], PluginTree.prototype, "notification", void 0);
    PluginTree = __decorate([
        inversify_1.injectable()
    ], PluginTree);
    return PluginTree;
}(browser_1.TreeImpl));
exports.PluginTree = PluginTree;
var PluginTreeModel = /** @class */ (function (_super) {
    __extends(PluginTreeModel, _super);
    function PluginTreeModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PluginTreeModel.prototype, "proxy", {
        get: function () {
            return this.tree.proxy;
        },
        set: function (proxy) {
            this.tree.proxy = proxy;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginTreeModel.prototype, "viewInfo", {
        set: function (viewInfo) {
            this.tree.viewInfo = viewInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginTreeModel.prototype, "isTreeEmpty", {
        get: function () {
            return this.tree.isEmpty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginTreeModel.prototype, "onDidChangeWelcomeState", {
        get: function () {
            return this.tree.onDidChangeWelcomeState;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        inversify_1.inject(PluginTree),
        __metadata("design:type", PluginTree)
    ], PluginTreeModel.prototype, "tree", void 0);
    PluginTreeModel = __decorate([
        inversify_1.injectable()
    ], PluginTreeModel);
    return PluginTreeModel;
}(browser_1.TreeModelImpl));
exports.PluginTreeModel = PluginTreeModel;
var TreeViewWidget = /** @class */ (function (_super) {
    __extends(TreeViewWidget, _super);
    function TreeViewWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._contextSelection = false;
        _this.onDidChangeVisibilityEmitter = new event_1.Emitter();
        _this.onDidChangeVisibility = _this.onDidChangeVisibilityEmitter.event;
        return _this;
    }
    TreeViewWidget.prototype.init = function () {
        _super.prototype.init.call(this);
        this.id = this.identifier.id;
        this.addClass('theia-tree-view');
        this.node.style.height = '100%';
        this.model.onDidChangeWelcomeState(this.update, this);
        this.toDispose.push(this.model.onDidChangeWelcomeState(this.update, this));
        this.toDispose.push(this.onDidChangeVisibilityEmitter);
    };
    TreeViewWidget.prototype.renderIcon = function (node, props) {
        var icon = this.toNodeIcon(node);
        if (icon) {
            return React.createElement("div", { className: icon + ' theia-tree-view-icon' });
        }
        return undefined;
    };
    TreeViewWidget.prototype.renderCaption = function (node, props) {
        var classes = [browser_1.TREE_NODE_SEGMENT_CLASS];
        if (!this.hasTrailingSuffixes(node)) {
            classes.push(browser_1.TREE_NODE_SEGMENT_GROW_CLASS);
        }
        var className = classes.join(' ');
        var title = node.tooltip ||
            (node.resourceUri && this.labelProvider.getLongName(new uri_1.default(node.resourceUri)))
            || this.toNodeName(node);
        var attrs = this.decorateCaption(node, {
            className: className,
            id: node.id,
            title: title
        });
        var children = this.getCaption(node);
        return React.createElement.apply(React, __spread(['div', attrs], children));
    };
    TreeViewWidget.prototype.getCaption = function (node) {
        var nodes = [];
        var name = this.toNodeName(node) || '';
        var description = this.toNodeDescription(node);
        var work = name;
        var regex = /\[([^\[]+)\]\(([^\)]+)\)/g;
        var matchResult = work.match(regex);
        if (matchResult) {
            matchResult.forEach(function (match, index) {
                nodes.push(React.createElement("span", { key: "m" + index }, work.substring(0, work.indexOf(match))));
                var execResult = regex.exec(name);
                nodes.push(React.createElement("a", { key: "l" + index, href: execResult[2], target: '_blank', className: exports.TREE_NODE_HYPERLINK, onClick: function (e) { return e.stopPropagation(); } }, execResult[1]));
                work = work.substring(work.indexOf(match) + match.length);
            });
        }
        return React.createElement("div", { className: 'noWrapInfoTree' },
            nodes,
            work && React.createElement("span", null, work),
            description && React.createElement("span", { className: 'theia-tree-view-description' }, description));
    };
    TreeViewWidget.prototype.renderTailDecorations = function (node, props) {
        var _this = this;
        if (this.model.selectedNodes.every(function (selected) { return selected.id !== node.id; }) && node.id !== this.hoverNodeId) {
            return false;
        }
        return this.contextKeys.with({ view: this.id, viewItem: node.contextValue }, function () {
            var menu = _this.menus.getMenu(exports.VIEW_ITEM_INLINE_MENU);
            var arg = _this.toTreeViewSelection(node);
            return React.createElement(React.Fragment, null, menu.children.map(function (item, index) { return item instanceof menu_1.ActionMenuNode && _this.renderInlineCommand(item, index, arg); }));
        });
    };
    TreeViewWidget.prototype.toTreeViewSelection = function (node) {
        return { treeViewId: this.id, treeItemId: node.id };
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TreeViewWidget.prototype.renderInlineCommand = function (node, index, arg) {
        var _this = this;
        var icon = node.icon;
        if (!icon || !this.commands.isVisible(node.action.commandId, arg) || !this.contextKeys.match(node.action.when)) {
            return false;
        }
        var className = [browser_1.TREE_NODE_SEGMENT_CLASS, browser_1.TREE_NODE_TAIL_CLASS, icon, 'theia-tree-view-inline-action'].join(' ');
        return React.createElement("div", { key: index, className: className, title: node.label, onClick: function (e) {
                e.stopPropagation();
                _this.commands.executeCommand(node.action.commandId, arg);
            } });
    };
    TreeViewWidget.prototype.setHoverNodeId = function (hoverNodeId) {
        this.hoverNodeId = hoverNodeId;
        this.update();
    };
    TreeViewWidget.prototype.createNodeAttributes = function (node, props) {
        var _this = this;
        return __assign(__assign({}, _super.prototype.createNodeAttributes.call(this, node, props)), { onMouseOver: function () { return _this.setHoverNodeId(node.id); }, onMouseOut: function () { return _this.setHoverNodeId(undefined); } });
    };
    TreeViewWidget.prototype.toContextMenuArgs = function (node) {
        return [this.toTreeViewSelection(node)];
    };
    TreeViewWidget.prototype.setFlag = function (flag) {
        _super.prototype.setFlag.call(this, flag);
        if (flag === widget_1.Widget.Flag.IsVisible) {
            this.onDidChangeVisibilityEmitter.fire(this.isVisible);
        }
    };
    TreeViewWidget.prototype.clearFlag = function (flag) {
        _super.prototype.clearFlag.call(this, flag);
        if (flag === widget_1.Widget.Flag.IsVisible) {
            this.onDidChangeVisibilityEmitter.fire(this.isVisible);
        }
    };
    TreeViewWidget.prototype.handleEnter = function (event) {
        _super.prototype.handleEnter.call(this, event);
        this.tryExecuteCommand();
    };
    TreeViewWidget.prototype.handleClickEvent = function (node, event) {
        _super.prototype.handleClickEvent.call(this, node, event);
        this.tryExecuteCommand(node);
    };
    // execute TreeItem.command if present
    TreeViewWidget.prototype.tryExecuteCommand = function (node) {
        var e_2, _a, _b;
        var treeNodes = (node ? [node] : this.model.selectedNodes);
        try {
            for (var treeNodes_1 = __values(treeNodes), treeNodes_1_1 = treeNodes_1.next(); !treeNodes_1_1.done; treeNodes_1_1 = treeNodes_1.next()) {
                var treeNode = treeNodes_1_1.value;
                if (treeNode && treeNode.command) {
                    (_b = this.commands).executeCommand.apply(_b, __spread([treeNode.command.id], (treeNode.command.arguments || [])));
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (treeNodes_1_1 && !treeNodes_1_1.done && (_a = treeNodes_1.return)) _a.call(treeNodes_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    Object.defineProperty(TreeViewWidget.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (message) {
            this._message = message;
            this.update();
        },
        enumerable: false,
        configurable: true
    });
    TreeViewWidget.prototype.render = function () {
        return React.createElement('div', this.createContainerAttributes(), this.renderSearchInfo(), this.renderTree(this.model));
    };
    TreeViewWidget.prototype.renderSearchInfo = function () {
        if (this._message) {
            return React.createElement("div", { className: 'theia-TreeViewInfo' }, this._message);
        }
        return undefined;
    };
    TreeViewWidget.prototype.shouldShowWelcomeView = function () {
        return (this.model.proxy === undefined || this.model.isTreeEmpty) && this.message === undefined;
    };
    __decorate([
        inversify_1.inject(menu_1.MenuModelRegistry),
        __metadata("design:type", menu_1.MenuModelRegistry)
    ], TreeViewWidget.prototype, "menus", void 0);
    __decorate([
        inversify_1.inject(view_context_key_service_1.ViewContextKeyService),
        __metadata("design:type", view_context_key_service_1.ViewContextKeyService)
    ], TreeViewWidget.prototype, "contextKeys", void 0);
    __decorate([
        inversify_1.inject(TreeViewWidgetIdentifier),
        __metadata("design:type", TreeViewWidgetIdentifier)
    ], TreeViewWidget.prototype, "identifier", void 0);
    __decorate([
        inversify_1.inject(PluginTreeModel),
        __metadata("design:type", PluginTreeModel)
    ], TreeViewWidget.prototype, "model", void 0);
    __decorate([
        inversify_1.inject(context_key_service_1.ContextKeyService),
        __metadata("design:type", context_key_service_1.ContextKeyService)
    ], TreeViewWidget.prototype, "contextKeyService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TreeViewWidget.prototype, "init", null);
    TreeViewWidget = __decorate([
        inversify_1.injectable()
    ], TreeViewWidget);
    return TreeViewWidget;
}(browser_1.TreeViewWelcomeWidget));
exports.TreeViewWidget = TreeViewWidget;
//# sourceMappingURL=tree-view-widget.js.map