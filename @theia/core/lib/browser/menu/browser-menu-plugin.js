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
exports.MenuCommandRegistry = exports.BrowserMenuBarContribution = exports.DynamicMenuWidget = exports.MenuServices = exports.DynamicMenuBarWidget = exports.BrowserMainMenuFactory = exports.MenuBarWidget = void 0;
var inversify_1 = require("inversify");
var widgets_1 = require("@phosphor/widgets");
var commands_1 = require("@phosphor/commands");
var common_1 = require("../../common");
var keybinding_1 = require("../keybinding");
var context_key_service_1 = require("../context-key-service");
var context_menu_context_1 = require("./context-menu-context");
var widgets_2 = require("../widgets");
var shell_1 = require("../shell");
var MenuBarWidget = /** @class */ (function (_super) {
    __extends(MenuBarWidget, _super);
    function MenuBarWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MenuBarWidget;
}(widgets_1.MenuBar));
exports.MenuBarWidget = MenuBarWidget;
var BrowserMainMenuFactory = /** @class */ (function () {
    function BrowserMainMenuFactory() {
    }
    BrowserMainMenuFactory.prototype.createMenuBar = function () {
        var _this = this;
        var menuBar = new DynamicMenuBarWidget();
        menuBar.id = 'theia:menubar';
        this.fillMenuBar(menuBar);
        var listener = this.keybindingRegistry.onKeybindingsChanged(function () {
            menuBar.clearMenus();
            _this.fillMenuBar(menuBar);
        });
        menuBar.disposed.connect(function () { return listener.dispose(); });
        return menuBar;
    };
    BrowserMainMenuFactory.prototype.fillMenuBar = function (menuBar) {
        var e_1, _a;
        var menuModel = this.menuProvider.getMenu(common_1.MAIN_MENU_BAR);
        var menuCommandRegistry = this.createMenuCommandRegistry(menuModel);
        try {
            for (var _b = __values(menuModel.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var menu = _c.value;
                if (menu instanceof common_1.CompositeMenuNode) {
                    var menuWidget = this.createMenuWidget(menu, { commands: menuCommandRegistry });
                    menuBar.addMenu(menuWidget);
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
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BrowserMainMenuFactory.prototype.createContextMenu = function (path, args) {
        var menuModel = this.menuProvider.getMenu(path);
        var menuCommandRegistry = this.createMenuCommandRegistry(menuModel, args).snapshot();
        var contextMenu = this.createMenuWidget(menuModel, { commands: menuCommandRegistry });
        return contextMenu;
    };
    BrowserMainMenuFactory.prototype.createMenuWidget = function (menu, options) {
        return new DynamicMenuWidget(menu, options, this.services);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BrowserMainMenuFactory.prototype.createMenuCommandRegistry = function (menu, args) {
        if (args === void 0) { args = []; }
        var menuCommandRegistry = new MenuCommandRegistry(this.services);
        this.registerMenu(menuCommandRegistry, menu, args);
        return menuCommandRegistry;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BrowserMainMenuFactory.prototype.registerMenu = function (menuCommandRegistry, menu, args) {
        var e_2, _a;
        try {
            for (var _b = __values(menu.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (child instanceof common_1.ActionMenuNode) {
                    menuCommandRegistry.registerActionMenu(child, args);
                    if (child.altNode) {
                        menuCommandRegistry.registerActionMenu(child.altNode, args);
                    }
                }
                else if (child instanceof common_1.CompositeMenuNode) {
                    this.registerMenu(menuCommandRegistry, child, args);
                }
                else {
                    this.handleDefault(menuCommandRegistry, child, args);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BrowserMainMenuFactory.prototype.handleDefault = function (menuCommandRegistry, menuNode, args) {
        // NOOP
    };
    Object.defineProperty(BrowserMainMenuFactory.prototype, "services", {
        get: function () {
            return {
                context: this.context,
                contextKeyService: this.contextKeyService,
                commandRegistry: this.commandRegistry,
                keybindingRegistry: this.keybindingRegistry,
                menuWidgetFactory: this
            };
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        inversify_1.inject(context_key_service_1.ContextKeyService),
        __metadata("design:type", context_key_service_1.ContextKeyService)
    ], BrowserMainMenuFactory.prototype, "contextKeyService", void 0);
    __decorate([
        inversify_1.inject(context_menu_context_1.ContextMenuContext),
        __metadata("design:type", context_menu_context_1.ContextMenuContext)
    ], BrowserMainMenuFactory.prototype, "context", void 0);
    __decorate([
        inversify_1.inject(common_1.CommandRegistry),
        __metadata("design:type", common_1.CommandRegistry)
    ], BrowserMainMenuFactory.prototype, "commandRegistry", void 0);
    __decorate([
        inversify_1.inject(keybinding_1.KeybindingRegistry),
        __metadata("design:type", keybinding_1.KeybindingRegistry)
    ], BrowserMainMenuFactory.prototype, "keybindingRegistry", void 0);
    __decorate([
        inversify_1.inject(common_1.MenuModelRegistry),
        __metadata("design:type", common_1.MenuModelRegistry)
    ], BrowserMainMenuFactory.prototype, "menuProvider", void 0);
    BrowserMainMenuFactory = __decorate([
        inversify_1.injectable()
    ], BrowserMainMenuFactory);
    return BrowserMainMenuFactory;
}());
exports.BrowserMainMenuFactory = BrowserMainMenuFactory;
var DynamicMenuBarWidget = /** @class */ (function (_super) {
    __extends(DynamicMenuBarWidget, _super);
    function DynamicMenuBarWidget() {
        var _this = _super.call(this) || this;
        // HACK we need to hook in on private method _openChildMenu. Don't do this at home!
        DynamicMenuBarWidget.prototype['_openChildMenu'] = function () {
            if (_this.activeMenu instanceof DynamicMenuWidget) {
                // `childMenu` is `null` if we open the menu. For example, menu is not shown and you click on `Edit`.
                // However, the `childMenu` is set, when `Edit` was already open and you move the mouse over `Select`.
                // We want to save the focus object for the former case only.
                if (!_this.childMenu) {
                    var activeElement = document.activeElement;
                    if (activeElement instanceof HTMLElement) {
                        _this.previousFocusedElement = activeElement;
                    }
                }
                _this.activeMenu.aboutToShow({ previousFocusedElement: _this.previousFocusedElement });
            }
            _super.prototype['_openChildMenu'].call(_this);
        };
        return _this;
    }
    DynamicMenuBarWidget.prototype.activateMenu = function (label) {
        var labels = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            labels[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var menu, menuPath, current, _loop_1, labels_1, labels_1_1, itemLabel, e_3_1;
            var e_3, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        menu = this.menus.find(function (m) { return m.title.label === label; });
                        if (!menu) {
                            throw new Error("could not find '" + label + "' menu");
                        }
                        this.activeMenu = menu;
                        this.openActiveMenu();
                        return [4 /*yield*/, widgets_2.waitForRevealed(menu)];
                    case 1:
                        _b.sent();
                        menuPath = [label];
                        current = menu;
                        _loop_1 = function (itemLabel) {
                            var item;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        item = current.items.find(function (i) { return i.label === itemLabel; });
                                        if (!item || !item.submenu) {
                                            throw new Error("could not find '" + label + "' submenu in " + menuPath.map(function (l) { return "'" + l + "'"; }).join(' -> ') + " menu");
                                        }
                                        current.activeItem = item;
                                        current.triggerActiveItem();
                                        current = item.submenu;
                                        return [4 /*yield*/, widgets_2.waitForRevealed(current)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        labels_1 = __values(labels), labels_1_1 = labels_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!labels_1_1.done) return [3 /*break*/, 6];
                        itemLabel = labels_1_1.value;
                        return [5 /*yield**/, _loop_1(itemLabel)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        labels_1_1 = labels_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_3_1 = _b.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (labels_1_1 && !labels_1_1.done && (_a = labels_1.return)) _a.call(labels_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, current];
                }
            });
        });
    };
    DynamicMenuBarWidget.prototype.triggerMenuItem = function (label) {
        var labels = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            labels[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var menuPath, menu, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!labels.length) {
                            throw new Error('menu item label is not specified');
                        }
                        menuPath = __spread([label], labels.slice(0, labels.length - 1));
                        return [4 /*yield*/, this.activateMenu.apply(this, __spread([menuPath[0]], menuPath.slice(1)))];
                    case 1:
                        menu = _a.sent();
                        item = menu.items.find(function (i) { return i.label === labels[labels.length - 1]; });
                        if (!item) {
                            throw new Error("could not find '" + label + "' item in " + menuPath.map(function (l) { return "'" + l + "'"; }).join(' -> ') + " menu");
                        }
                        menu.activeItem = item;
                        menu.triggerActiveItem();
                        return [2 /*return*/, item];
                }
            });
        });
    };
    return DynamicMenuBarWidget;
}(MenuBarWidget));
exports.DynamicMenuBarWidget = DynamicMenuBarWidget;
var MenuServices = /** @class */ (function () {
    function MenuServices() {
    }
    return MenuServices;
}());
exports.MenuServices = MenuServices;
/**
 * A menu widget that would recompute its items on update.
 */
var DynamicMenuWidget = /** @class */ (function (_super) {
    __extends(DynamicMenuWidget, _super);
    function DynamicMenuWidget(menu, options, services) {
        var _this = _super.call(this, options) || this;
        _this.menu = menu;
        _this.options = options;
        _this.services = services;
        if (menu.label) {
            _this.title.label = menu.label;
        }
        if (menu.iconClass) {
            _this.title.iconClass = menu.iconClass;
        }
        _this.updateSubMenus(_this, _this.menu, _this.options.commands);
        return _this;
    }
    // Hint: this is not called from the context menu use-case, but is not required.
    // For the context menu the command registry state is calculated by the factory before `open`.
    DynamicMenuWidget.prototype.aboutToShow = function (_a) {
        var _this = this;
        var previousFocusedElement = _a.previousFocusedElement;
        this.preserveFocusedElement(previousFocusedElement);
        this.clearItems();
        this.runWithPreservedFocusContext(function () {
            _this.options.commands.snapshot();
            _this.updateSubMenus(_this, _this.menu, _this.options.commands);
        });
    };
    DynamicMenuWidget.prototype.open = function (x, y, options) {
        var _this = this;
        var cb = function () {
            _this.restoreFocusedElement();
            _this.aboutToClose.disconnect(cb);
        };
        this.aboutToClose.connect(cb);
        _super.prototype.open.call(this, x, y, options);
    };
    DynamicMenuWidget.prototype.updateSubMenus = function (parent, menu, commands) {
        var e_4, _a;
        var items = this.buildSubMenus([], menu, commands);
        try {
            for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                parent.addItem(item);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    DynamicMenuWidget.prototype.buildSubMenus = function (items, menu, commands) {
        var e_5, _a;
        try {
            for (var _b = __values(menu.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                if (item instanceof common_1.CompositeMenuNode) {
                    if (item.children.length) { // do not render empty nodes
                        if (item.isSubmenu) { // submenu node
                            var submenu = this.services.menuWidgetFactory.createMenuWidget(item, this.options);
                            if (!submenu.items.length) {
                                continue;
                            }
                            items.push({
                                type: 'submenu',
                                submenu: submenu,
                            });
                        }
                        else { // group node
                            var submenu = this.buildSubMenus([], item, commands);
                            if (!submenu.length) {
                                continue;
                            }
                            if (items.length) { // do not put a separator above the first group
                                items.push({
                                    type: 'separator'
                                });
                            }
                            items.push.apply(items, __spread(submenu)); // render children
                        }
                    }
                }
                else if (item instanceof common_1.ActionMenuNode) {
                    var _d = this.services, context_1 = _d.context, contextKeyService = _d.contextKeyService;
                    var node = item.altNode && context_1.altPressed ? item.altNode : item;
                    var when = node.action.when;
                    if (!(commands.isVisible(node.action.commandId) && (!when || contextKeyService.match(when)))) {
                        continue;
                    }
                    items.push({
                        command: node.action.commandId,
                        type: 'command'
                    });
                }
                else {
                    items.push.apply(items, __spread(this.handleDefault(item)));
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return items;
    };
    DynamicMenuWidget.prototype.handleDefault = function (menuNode) {
        return [];
    };
    DynamicMenuWidget.prototype.preserveFocusedElement = function (previousFocusedElement) {
        if (previousFocusedElement === void 0) { previousFocusedElement = document.activeElement; }
        if (!this.previousFocusedElement && previousFocusedElement instanceof HTMLElement) {
            this.previousFocusedElement = previousFocusedElement;
            return true;
        }
        return false;
    };
    DynamicMenuWidget.prototype.restoreFocusedElement = function () {
        if (this.previousFocusedElement) {
            this.previousFocusedElement.focus({ preventScroll: true });
            this.previousFocusedElement = undefined;
            return true;
        }
        return false;
    };
    DynamicMenuWidget.prototype.runWithPreservedFocusContext = function (what) {
        var focusToRestore = undefined;
        var activeElement = document.activeElement;
        if (this.previousFocusedElement && activeElement instanceof HTMLElement && this.previousFocusedElement !== activeElement) {
            focusToRestore = activeElement;
            this.previousFocusedElement.focus({ preventScroll: true });
        }
        try {
            what();
        }
        finally {
            if (focusToRestore) {
                focusToRestore.focus({ preventScroll: true });
            }
        }
    };
    return DynamicMenuWidget;
}(widgets_1.Menu));
exports.DynamicMenuWidget = DynamicMenuWidget;
var BrowserMenuBarContribution = /** @class */ (function () {
    function BrowserMenuBarContribution(factory) {
        this.factory = factory;
    }
    BrowserMenuBarContribution.prototype.onStart = function (app) {
        var logo = this.createLogo();
        app.shell.addWidget(logo, { area: 'top' });
        var menu = this.factory.createMenuBar();
        app.shell.addWidget(menu, { area: 'top' });
    };
    Object.defineProperty(BrowserMenuBarContribution.prototype, "menuBar", {
        get: function () {
            return this.shell.topPanel.widgets.find(function (w) { return w instanceof MenuBarWidget; });
        },
        enumerable: false,
        configurable: true
    });
    BrowserMenuBarContribution.prototype.createLogo = function () {
        var logo = new widgets_1.Widget();
        logo.id = 'theia:icon';
        logo.addClass('theia-icon');
        return logo;
    };
    __decorate([
        inversify_1.inject(shell_1.ApplicationShell),
        __metadata("design:type", shell_1.ApplicationShell)
    ], BrowserMenuBarContribution.prototype, "shell", void 0);
    BrowserMenuBarContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(BrowserMainMenuFactory)),
        __metadata("design:paramtypes", [BrowserMainMenuFactory])
    ], BrowserMenuBarContribution);
    return BrowserMenuBarContribution;
}());
exports.BrowserMenuBarContribution = BrowserMenuBarContribution;
/**
 * Stores Theia-specific action menu nodes instead of PhosphorJS commands with their handlers.
 */
var MenuCommandRegistry = /** @class */ (function (_super) {
    __extends(MenuCommandRegistry, _super);
    function MenuCommandRegistry(services) {
        var _this = _super.call(this) || this;
        _this.services = services;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.actions = new Map();
        _this.toDispose = new common_1.DisposableCollection();
        return _this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MenuCommandRegistry.prototype.registerActionMenu = function (menu, args) {
        var commandId = menu.action.commandId;
        var commandRegistry = this.services.commandRegistry;
        var command = commandRegistry.getCommand(commandId);
        if (!command) {
            return;
        }
        var id = command.id;
        if (this.actions.has(id)) {
            return;
        }
        this.actions.set(id, [menu, args]);
    };
    MenuCommandRegistry.prototype.snapshot = function () {
        var e_6, _a;
        this.toDispose.dispose();
        try {
            for (var _b = __values(this.actions.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), menu = _d[0], args = _d[1];
                this.toDispose.push(this.registerCommand(menu, args));
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return this;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MenuCommandRegistry.prototype.registerCommand = function (menu, args) {
        var _a = this.services, commandRegistry = _a.commandRegistry, keybindingRegistry = _a.keybindingRegistry;
        var command = commandRegistry.getCommand(menu.action.commandId);
        if (!command) {
            return common_1.Disposable.NULL;
        }
        var id = command.id;
        if (this.hasCommand(id)) {
            // several menu items can be registered for the same command in different contexts
            return common_1.Disposable.NULL;
        }
        // We freeze the `isEnabled`, `isVisible`, and `isToggled` states so they won't change.
        var enabled = commandRegistry.isEnabled.apply(commandRegistry, __spread([id], args));
        var visible = commandRegistry.isVisible.apply(commandRegistry, __spread([id], args));
        var toggled = commandRegistry.isToggled.apply(commandRegistry, __spread([id], args));
        var unregisterCommand = this.addCommand(id, {
            execute: function () { return commandRegistry.executeCommand.apply(commandRegistry, __spread([id], args)); },
            label: menu.label,
            icon: menu.icon,
            isEnabled: function () { return enabled; },
            isVisible: function () { return visible; },
            isToggled: function () { return toggled; }
        });
        var bindings = keybindingRegistry.getKeybindingsForCommand(id);
        // Only consider the first keybinding.
        if (bindings.length) {
            var binding = bindings[0];
            var keys = keybindingRegistry.acceleratorFor(binding);
            this.addKeyBinding({
                command: id,
                keys: keys,
                selector: '.p-Widget' // We have the PhosphorJS dependency anyway.
            });
        }
        return common_1.Disposable.create(function () { return unregisterCommand.dispose(); });
    };
    return MenuCommandRegistry;
}(commands_1.CommandRegistry));
exports.MenuCommandRegistry = MenuCommandRegistry;
//# sourceMappingURL=browser-menu-plugin.js.map