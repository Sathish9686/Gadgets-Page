"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputContribution = void 0;
var inversify_1 = require("inversify");
var widget_1 = require("@theia/core/lib/browser/widgets/widget");
var browser_1 = require("@theia/core/lib/browser");
var common_1 = require("@theia/core/lib/common");
var view_contribution_1 = require("@theia/core/lib/browser/shell/view-contribution");
var output_widget_1 = require("./output-widget");
var output_context_menu_1 = require("./output-context-menu");
var output_uri_1 = require("../common/output-uri");
var clipboard_service_1 = require("@theia/core/lib/browser/clipboard-service");
var output_channel_1 = require("../common/output-channel");
var output_commands_1 = require("./output-commands");
var quick_pick_service_1 = require("@theia/core/lib/common/quick-pick-service");
var OutputContribution = /** @class */ (function (_super) {
    __extends(OutputContribution, _super);
    function OutputContribution() {
        var _this = _super.call(this, {
            widgetId: output_widget_1.OutputWidget.ID,
            widgetName: 'Output',
            defaultWidgetOptions: {
                area: 'bottom'
            },
            toggleCommandId: 'output:toggle',
            toggleKeybinding: 'CtrlCmd+Shift+U'
        }) || this;
        _this.id = output_widget_1.OutputWidget.ID + "-opener";
        return _this;
    }
    OutputContribution.prototype.init = function () {
        var _this = this;
        this.outputChannelManager.onChannelWasShown(function (_a) {
            var name = _a.name, preserveFocus = _a.preserveFocus;
            return browser_1.open(_this.openerService, output_uri_1.OutputUri.create(name), { activate: !preserveFocus, reveal: true });
        });
    };
    OutputContribution.prototype.registerCommands = function (registry) {
        var _this = this;
        _super.prototype.registerCommands.call(this, registry);
        registry.registerCommand(output_commands_1.OutputCommands.CLEAR__WIDGET, {
            isEnabled: function (arg) {
                if (arg instanceof widget_1.Widget) {
                    return arg instanceof output_widget_1.OutputWidget;
                }
                return _this.shell.currentWidget instanceof output_widget_1.OutputWidget;
            },
            isVisible: function (arg) {
                if (arg instanceof widget_1.Widget) {
                    return arg instanceof output_widget_1.OutputWidget;
                }
                return _this.shell.currentWidget instanceof output_widget_1.OutputWidget;
            },
            execute: function () {
                _this.widget.then(function (widget) {
                    _this.withWidget(widget, function (output) {
                        output.clear();
                        return true;
                    });
                });
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.LOCK__WIDGET, {
            isEnabled: function (widget) { return _this.withWidget(widget, function (output) { return !output.isLocked; }); },
            isVisible: function (widget) { return _this.withWidget(widget, function (output) { return !output.isLocked; }); },
            execute: function (widget) { return _this.withWidget(widget, function (output) {
                output.lock();
                return true;
            }); }
        });
        registry.registerCommand(output_commands_1.OutputCommands.UNLOCK__WIDGET, {
            isEnabled: function (widget) { return _this.withWidget(widget, function (output) { return output.isLocked; }); },
            isVisible: function (widget) { return _this.withWidget(widget, function (output) { return output.isLocked; }); },
            execute: function (widget) { return _this.withWidget(widget, function (output) {
                output.unlock();
                return true;
            }); }
        });
        registry.registerCommand(output_commands_1.OutputCommands.COPY_ALL, {
            execute: function () {
                var _a;
                var textToCopy = (_a = _this.tryGetWidget()) === null || _a === void 0 ? void 0 : _a.getText();
                if (textToCopy) {
                    _this.clipboardService.writeText(textToCopy);
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.APPEND, {
            execute: function (_a) {
                var name = _a.name, text = _a.text;
                if (name && text) {
                    _this.outputChannelManager.getChannel(name).append(text);
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.APPEND_LINE, {
            execute: function (_a) {
                var name = _a.name, text = _a.text;
                if (name && text) {
                    _this.outputChannelManager.getChannel(name).appendLine(text);
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.CLEAR, {
            execute: function (_a) {
                var name = _a.name;
                if (name) {
                    _this.outputChannelManager.getChannel(name).clear();
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.DISPOSE, {
            execute: function (_a) {
                var name = _a.name;
                if (name) {
                    _this.outputChannelManager.deleteChannel(name);
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.SHOW, {
            execute: function (_a) {
                var name = _a.name, options = _a.options;
                if (name) {
                    var preserveFocus = options && options.preserveFocus || false;
                    _this.outputChannelManager.getChannel(name).show({ preserveFocus: preserveFocus });
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.HIDE, {
            execute: function (_a) {
                var name = _a.name;
                if (name) {
                    _this.outputChannelManager.getChannel(name).hide();
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.CLEAR__QUICK_PICK, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var channel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pick({
                                placeholder: 'Clear output channel.',
                                channels: this.outputChannelManager.getChannels().slice()
                            })];
                        case 1:
                            channel = _a.sent();
                            if (channel) {
                                channel.clear();
                            }
                            return [2 /*return*/];
                    }
                });
            }); },
            isEnabled: function () { return !!_this.outputChannelManager.getChannels().length; },
            isVisible: function () { return !!_this.outputChannelManager.getChannels().length; }
        });
        registry.registerCommand(output_commands_1.OutputCommands.SHOW__QUICK_PICK, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var channel, name_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pick({
                                placeholder: 'Show output channel.',
                                channels: this.outputChannelManager.getChannels().slice()
                            })];
                        case 1:
                            channel = _a.sent();
                            if (channel) {
                                name_1 = channel.name;
                                registry.executeCommand(output_commands_1.OutputCommands.SHOW.id, { name: name_1, options: { preserveFocus: false } });
                            }
                            return [2 /*return*/];
                    }
                });
            }); },
            isEnabled: function () { return !!_this.outputChannelManager.getChannels().length; },
            isVisible: function () { return !!_this.outputChannelManager.getChannels().length; }
        });
        registry.registerCommand(output_commands_1.OutputCommands.HIDE__QUICK_PICK, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var channel, name_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pick({
                                placeholder: 'Hide output channel.',
                                channels: this.outputChannelManager.getVisibleChannels().slice()
                            })];
                        case 1:
                            channel = _a.sent();
                            if (channel) {
                                name_2 = channel.name;
                                registry.executeCommand(output_commands_1.OutputCommands.HIDE.id, { name: name_2 });
                            }
                            return [2 /*return*/];
                    }
                });
            }); },
            isEnabled: function () { return !!_this.outputChannelManager.getVisibleChannels().length; },
            isVisible: function () { return !!_this.outputChannelManager.getVisibleChannels().length; }
        });
        registry.registerCommand(output_commands_1.OutputCommands.DISPOSE__QUICK_PICK, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var channel, name_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pick({
                                placeholder: 'Close output channel.',
                                channels: this.outputChannelManager.getChannels().slice()
                            })];
                        case 1:
                            channel = _a.sent();
                            if (channel) {
                                name_3 = channel.name;
                                registry.executeCommand(output_commands_1.OutputCommands.DISPOSE.id, { name: name_3 });
                            }
                            return [2 /*return*/];
                    }
                });
            }); },
            isEnabled: function () { return !!_this.outputChannelManager.getChannels().length; },
            isVisible: function () { return !!_this.outputChannelManager.getChannels().length; }
        });
    };
    OutputContribution.prototype.registerMenus = function (registry) {
        _super.prototype.registerMenus.call(this, registry);
        registry.registerMenuAction(output_context_menu_1.OutputContextMenu.TEXT_EDIT_GROUP, {
            commandId: browser_1.CommonCommands.COPY.id
        });
        registry.registerMenuAction(output_context_menu_1.OutputContextMenu.TEXT_EDIT_GROUP, {
            commandId: output_commands_1.OutputCommands.COPY_ALL.id,
            label: 'Copy All'
        });
        registry.registerMenuAction(output_context_menu_1.OutputContextMenu.COMMAND_GROUP, {
            commandId: browser_1.quickCommand.id,
            label: 'Find Command...'
        });
        registry.registerMenuAction(output_context_menu_1.OutputContextMenu.WIDGET_GROUP, {
            commandId: output_commands_1.OutputCommands.CLEAR__WIDGET.id,
            label: 'Clear Output'
        });
    };
    OutputContribution.prototype.canHandle = function (uri) {
        return output_uri_1.OutputUri.is(uri) ? 200 : 0;
    };
    OutputContribution.prototype.open = function (uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!output_uri_1.OutputUri.is(uri)) {
                            throw new Error("Expected '" + output_uri_1.OutputUri.SCHEME + "' URI scheme. Got: " + uri + " instead.");
                        }
                        return [4 /*yield*/, this.openView(options)];
                    case 1:
                        widget = _a.sent();
                        return [2 /*return*/, widget];
                }
            });
        });
    };
    OutputContribution.prototype.withWidget = function (widget, predicate) {
        if (widget === void 0) { widget = this.tryGetWidget(); }
        if (predicate === void 0) { predicate = function () { return true; }; }
        return widget instanceof output_widget_1.OutputWidget ? predicate(widget) : false;
    };
    OutputContribution.prototype.pick = function (_a) {
        var channels = _a.channels, placeholder = _a.placeholder;
        return __awaiter(this, void 0, void 0, function () {
            var items, i, channel;
            return __generator(this, function (_b) {
                items = [];
                for (i = 0; i < channels.length; i++) {
                    channel = channels[i];
                    if (i === 0) {
                        items.push({ label: channel.isVisible ? 'Output Channels' : 'Hidden Channels', type: 'separator' });
                    }
                    else if (!channel.isVisible && channels[i - 1].isVisible) {
                        items.push({ label: 'Hidden Channels', type: 'separator' });
                    }
                    items.push({ label: channel.name, value: channel });
                }
                return [2 /*return*/, this.quickPickService.show(items, { placeholder: placeholder })];
            });
        });
    };
    __decorate([
        inversify_1.inject(clipboard_service_1.ClipboardService),
        __metadata("design:type", Object)
    ], OutputContribution.prototype, "clipboardService", void 0);
    __decorate([
        inversify_1.inject(common_1.CommandService),
        __metadata("design:type", Object)
    ], OutputContribution.prototype, "commandService", void 0);
    __decorate([
        inversify_1.inject(output_channel_1.OutputChannelManager),
        __metadata("design:type", output_channel_1.OutputChannelManager)
    ], OutputContribution.prototype, "outputChannelManager", void 0);
    __decorate([
        inversify_1.inject(browser_1.OpenerService),
        __metadata("design:type", Object)
    ], OutputContribution.prototype, "openerService", void 0);
    __decorate([
        inversify_1.inject(quick_pick_service_1.QuickPickService),
        __metadata("design:type", Object)
    ], OutputContribution.prototype, "quickPickService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], OutputContribution.prototype, "init", null);
    OutputContribution = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], OutputContribution);
    return OutputContribution;
}(view_contribution_1.AbstractViewContribution));
exports.OutputContribution = OutputContribution;
//# sourceMappingURL=output-contribution.js.map