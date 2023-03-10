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
exports.ElectronMainMenuFactory = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var electron = require("electron");
var inversify_1 = require("inversify");
var common_1 = require("../../common");
var browser_1 = require("../../browser");
var context_key_service_1 = require("../../browser/context-key-service");
var debounce = require("lodash.debounce");
var context_menu_context_1 = require("../../browser/menu/context-menu-context");
var ElectronMainMenuFactory = /** @class */ (function () {
    function ElectronMainMenuFactory(commandRegistry, preferencesService, menuProvider, keybindingRegistry) {
        var _this = this;
        this.commandRegistry = commandRegistry;
        this.preferencesService = preferencesService;
        this.menuProvider = menuProvider;
        this.keybindingRegistry = keybindingRegistry;
        this._toggledCommands = new Set();
        preferencesService.onPreferenceChanged(debounce(function () {
            var e_1, _a;
            if (_this._menu) {
                try {
                    for (var _b = __values(_this._toggledCommands), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        _this._menu.getMenuItemById(item).checked = _this.commandRegistry.isToggled(item);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                electron.remote.getCurrentWindow().setMenu(_this._menu);
            }
        }, 10));
        keybindingRegistry.onKeybindingsChanged(function () {
            var createdMenuBar = _this.createMenuBar();
            if (common_1.isOSX) {
                electron.remote.Menu.setApplicationMenu(createdMenuBar);
            }
            else {
                electron.remote.getCurrentWindow().setMenu(createdMenuBar);
            }
        });
    }
    ElectronMainMenuFactory.prototype.createMenuBar = function () {
        var menuModel = this.menuProvider.getMenu(common_1.MAIN_MENU_BAR);
        var template = this.fillMenuTemplate([], menuModel);
        if (common_1.isOSX) {
            template.unshift(this.createOSXMenu());
        }
        var menu = electron.remote.Menu.buildFromTemplate(template);
        this._menu = menu;
        return menu;
    };
    ElectronMainMenuFactory.prototype.createContextMenu = function (menuPath, args) {
        var menuModel = this.menuProvider.getMenu(menuPath);
        var template = this.fillMenuTemplate([], menuModel, args, { showDisabled: false });
        return electron.remote.Menu.buildFromTemplate(template);
    };
    ElectronMainMenuFactory.prototype.fillMenuTemplate = function (items, menuModel, args, options) {
        var e_2, _a;
        var _this = this;
        if (args === void 0) { args = []; }
        var showDisabled = ((options === null || options === void 0 ? void 0 : options.showDisabled) === undefined) ? true : options === null || options === void 0 ? void 0 : options.showDisabled;
        var _loop_1 = function (menu) {
            var _a, _b, _c, _d, _e;
            if (menu instanceof common_1.CompositeMenuNode) {
                if (menu.children.length > 0) {
                    // do not render empty nodes
                    if (menu.isSubmenu) { // submenu node
                        var submenu = this_1.fillMenuTemplate([], menu, args, options);
                        if (submenu.length === 0) {
                            return "continue";
                        }
                        items.push({
                            label: menu.label,
                            submenu: submenu
                        });
                    }
                    else { // group node
                        // process children
                        var submenu = this_1.fillMenuTemplate([], menu, args, options);
                        if (submenu.length === 0) {
                            return "continue";
                        }
                        if (items.length > 0) {
                            // do not put a separator above the first group
                            items.push({
                                type: 'separator'
                            });
                        }
                        // render children
                        items.push.apply(items, __spread(submenu));
                    }
                }
            }
            else if (menu instanceof common_1.ActionMenuNode) {
                var node = menu.altNode && this_1.context.altPressed ? menu.altNode : menu;
                var commandId_1 = node.action.commandId;
                // That is only a sanity check at application startup.
                if (!this_1.commandRegistry.getCommand(commandId_1)) {
                    throw new Error("Unknown command with ID: " + commandId_1 + ".");
                }
                if (!(_a = this_1.commandRegistry).isVisible.apply(_a, __spread([commandId_1], args))
                    || (!!node.action.when && !this_1.contextKeyService.match(node.action.when))) {
                    return "continue";
                }
                // We should omit rendering context-menu items which are disabled.
                if (!showDisabled && !(_b = this_1.commandRegistry).isEnabled.apply(_b, __spread([commandId_1], args))) {
                    return "continue";
                }
                var bindings = this_1.keybindingRegistry.getKeybindingsForCommand(commandId_1);
                var accelerator = void 0;
                /* Only consider the first keybinding. */
                if (bindings.length > 0) {
                    var binding = bindings[0];
                    accelerator = this_1.acceleratorFor(binding);
                }
                var menuItem = {
                    id: node.id,
                    label: node.label,
                    type: (_c = this_1.commandRegistry).getToggledHandler.apply(_c, __spread([commandId_1], args)) ? 'checkbox' : 'normal',
                    checked: (_d = this_1.commandRegistry).isToggled.apply(_d, __spread([commandId_1], args)),
                    enabled: true,
                    visible: true,
                    accelerator: accelerator,
                    click: function () { return _this.execute(commandId_1, args); }
                };
                if (common_1.isOSX) {
                    var role = this_1.roleFor(node.id);
                    if (role) {
                        menuItem.role = role;
                        delete menuItem.click;
                    }
                }
                items.push(menuItem);
                if ((_e = this_1.commandRegistry).getToggledHandler.apply(_e, __spread([commandId_1], args))) {
                    this_1._toggledCommands.add(commandId_1);
                }
            }
            else {
                items.push.apply(items, __spread(this_1.handleDefault(menu, args, options)));
            }
        };
        var this_1 = this;
        try {
            for (var _b = __values(menuModel.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var menu = _c.value;
                _loop_1(menu);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return items;
    };
    ElectronMainMenuFactory.prototype.handleDefault = function (menuNode, args, options) {
        if (args === void 0) { args = []; }
        return [];
    };
    /**
     * Return a user visible representation of a keybinding.
     */
    ElectronMainMenuFactory.prototype.acceleratorFor = function (keybinding) {
        var bindingKeySequence = this.keybindingRegistry.resolveKeybinding(keybinding);
        // FIXME see https://github.com/electron/electron/issues/11740
        // Key Sequences can't be represented properly in the electron menu.
        //
        // We can do what VS Code does, and append the chords as a suffix to the menu label.
        // https://github.com/eclipse-theia/theia/issues/1199#issuecomment-430909480
        if (bindingKeySequence.length > 1) {
            return '';
        }
        var keyCode = bindingKeySequence[0];
        return this.keybindingRegistry.acceleratorForKeyCode(keyCode, '+');
    };
    ElectronMainMenuFactory.prototype.roleFor = function (id) {
        var role;
        switch (id) {
            case browser_1.CommonCommands.UNDO.id:
                role = 'undo';
                break;
            case browser_1.CommonCommands.REDO.id:
                role = 'redo';
                break;
            case browser_1.CommonCommands.CUT.id:
                role = 'cut';
                break;
            case browser_1.CommonCommands.COPY.id:
                role = 'copy';
                break;
            case browser_1.CommonCommands.PASTE.id:
                role = 'paste';
                break;
            case browser_1.CommonCommands.SELECT_ALL.id:
                role = 'selectAll';
                break;
            default:
                break;
        }
        return role;
    };
    ElectronMainMenuFactory.prototype.execute = function (command, args) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 3, , 4]);
                        if (!(_b = this.commandRegistry).isEnabled.apply(_b, __spread([command], args))) return [3 /*break*/, 2];
                        return [4 /*yield*/, (_c = this.commandRegistry).executeCommand.apply(_c, __spread([command], args))];
                    case 1:
                        _f.sent();
                        if (this._menu && (_d = this.commandRegistry).isVisible.apply(_d, __spread([command], args))) {
                            this._menu.getMenuItemById(command).checked = (_e = this.commandRegistry).isToggled.apply(_e, __spread([command], args));
                            electron.remote.getCurrentWindow().setMenu(this._menu);
                        }
                        _f.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        _a = _f.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ElectronMainMenuFactory.prototype.createOSXMenu = function () {
        return {
            label: 'Theia',
            submenu: [
                {
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    role: 'hide'
                },
                {
                    role: 'hideOthers'
                },
                {
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'quit'
                }
            ]
        };
    };
    __decorate([
        inversify_1.inject(context_key_service_1.ContextKeyService),
        __metadata("design:type", context_key_service_1.ContextKeyService)
    ], ElectronMainMenuFactory.prototype, "contextKeyService", void 0);
    __decorate([
        inversify_1.inject(context_menu_context_1.ContextMenuContext),
        __metadata("design:type", context_menu_context_1.ContextMenuContext)
    ], ElectronMainMenuFactory.prototype, "context", void 0);
    ElectronMainMenuFactory = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.CommandRegistry)),
        __param(1, inversify_1.inject(browser_1.PreferenceService)),
        __param(2, inversify_1.inject(common_1.MenuModelRegistry)),
        __param(3, inversify_1.inject(browser_1.KeybindingRegistry)),
        __metadata("design:paramtypes", [common_1.CommandRegistry, Object, common_1.MenuModelRegistry,
            browser_1.KeybindingRegistry])
    ], ElectronMainMenuFactory);
    return ElectronMainMenuFactory;
}());
exports.ElectronMainMenuFactory = ElectronMainMenuFactory;
//# sourceMappingURL=electron-main-menu-factory.js.map