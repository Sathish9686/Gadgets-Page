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
exports.StatusBarImpl = exports.StatusBar = exports.STATUSBAR_WIDGET_FACTORY_ID = exports.StatusBarAlignment = void 0;
var React = require("react");
var inversify_1 = require("inversify");
var octicons_react_1 = require("@primer/octicons-react");
var common_1 = require("../../common");
var react_widget_1 = require("../widgets/react-widget");
var frontend_application_state_1 = require("../frontend-application-state");
var label_parser_1 = require("../label-parser");
var StatusBarAlignment;
(function (StatusBarAlignment) {
    StatusBarAlignment[StatusBarAlignment["LEFT"] = 0] = "LEFT";
    StatusBarAlignment[StatusBarAlignment["RIGHT"] = 1] = "RIGHT";
})(StatusBarAlignment = exports.StatusBarAlignment || (exports.StatusBarAlignment = {}));
exports.STATUSBAR_WIDGET_FACTORY_ID = 'statusBar';
exports.StatusBar = Symbol('StatusBar');
var StatusBarImpl = /** @class */ (function (_super) {
    __extends(StatusBarImpl, _super);
    function StatusBarImpl(commands, entryService, applicationStateService) {
        var _this = _super.call(this) || this;
        _this.commands = commands;
        _this.entryService = entryService;
        _this.applicationStateService = applicationStateService;
        _this.entries = new Map();
        delete _this.scrollOptions;
        _this.id = 'theia-statusBar';
        _this.addClass('noselect');
        return _this;
    }
    Object.defineProperty(StatusBarImpl.prototype, "ready", {
        get: function () {
            return this.applicationStateService.reachedAnyState('initialized_layout', 'ready');
        },
        enumerable: false,
        configurable: true
    });
    StatusBarImpl.prototype.setElement = function (id, entry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready];
                    case 1:
                        _a.sent();
                        this.entries.set(id, entry);
                        this.update();
                        return [2 /*return*/];
                }
            });
        });
    };
    StatusBarImpl.prototype.removeElement = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready];
                    case 1:
                        _a.sent();
                        this.entries.delete(id);
                        this.update();
                        return [2 /*return*/];
                }
            });
        });
    };
    StatusBarImpl.prototype.setBackgroundColor = function (color) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready];
                    case 1:
                        _a.sent();
                        this.internalSetBackgroundColor(color);
                        this.update();
                        return [2 /*return*/];
                }
            });
        });
    };
    StatusBarImpl.prototype.internalSetBackgroundColor = function (color) {
        this.backgroundColor = color;
        this.node.style.backgroundColor = this.backgroundColor || '';
    };
    StatusBarImpl.prototype.setColor = function (color) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready];
                    case 1:
                        _a.sent();
                        this.internalSetColor(color);
                        this.update();
                        return [2 /*return*/];
                }
            });
        });
    };
    StatusBarImpl.prototype.internalSetColor = function (color) {
        this.color = color;
    };
    StatusBarImpl.prototype.render = function () {
        var _this = this;
        var leftEntries = [];
        var rightEntries = [];
        var elements = Array.from(this.entries).sort(function (left, right) {
            var lp = left[1].priority || 0;
            var rp = right[1].priority || 0;
            return rp - lp;
        });
        elements.forEach(function (_a) {
            var _b = __read(_a, 2), id = _b[0], entry = _b[1];
            if (entry.alignment === StatusBarAlignment.LEFT) {
                leftEntries.push(_this.renderElement(id, entry));
            }
            else {
                rightEntries.push(_this.renderElement(id, entry));
            }
        });
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'area left' }, leftEntries),
            React.createElement("div", { className: 'area right' }, rightEntries));
    };
    StatusBarImpl.prototype.onclick = function (entry) {
        var _this = this;
        return function () {
            var _a;
            if (entry.command) {
                var args = entry.arguments || [];
                (_a = _this.commands).executeCommand.apply(_a, __spread([entry.command], args));
            }
        };
    };
    StatusBarImpl.prototype.createAttributes = function (entry) {
        var attrs = {};
        if (entry.command) {
            attrs.onClick = this.onclick(entry);
            attrs.className = 'element hasCommand';
        }
        else if (entry.onclick) {
            attrs.onClick = function (e) {
                if (entry.onclick) {
                    entry.onclick(e);
                }
            };
            attrs.className = 'element hasCommand';
        }
        else {
            attrs.className = 'element';
        }
        if (entry.tooltip) {
            attrs.title = entry.tooltip;
        }
        attrs.style = {
            color: entry.color || this.color
        };
        if (entry.className) {
            attrs.className += ' ' + entry.className;
        }
        return attrs;
    };
    StatusBarImpl.prototype.renderElement = function (id, entry) {
        var childStrings = this.entryService.parse(entry.text);
        var children = [];
        childStrings.forEach(function (val, key) {
            if (!(typeof val === 'string') && label_parser_1.LabelIcon.is(val)) {
                var octicon = octicons_react_1.getIconByName(val.name);
                if (octicon) {
                    children.push(React.createElement("span", { key: key, className: val.animation ? 'fa-' + val.animation : 'fa' },
                        React.createElement(octicons_react_1.default, { icon: octicon, height: 12.5, width: 12.5 })));
                }
                else {
                    children.push(React.createElement("span", { key: key, className: "fa fa-" + val.name + " " + (val.animation ? 'fa-' + val.animation : '') }));
                }
            }
            else {
                children.push(React.createElement("span", { key: key }, val));
            }
        });
        var elementInnerDiv = React.createElement(React.Fragment, null, children);
        return React.createElement('div', __assign({ key: id }, this.createAttributes(entry)), elementInnerDiv);
    };
    StatusBarImpl = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.CommandService)),
        __param(1, inversify_1.inject(label_parser_1.LabelParser)),
        __param(2, inversify_1.inject(frontend_application_state_1.FrontendApplicationStateService)),
        __metadata("design:paramtypes", [Object, label_parser_1.LabelParser,
            frontend_application_state_1.FrontendApplicationStateService])
    ], StatusBarImpl);
    return StatusBarImpl;
}(react_widget_1.ReactWidget));
exports.StatusBarImpl = StatusBarImpl;
//# sourceMappingURL=status-bar.js.map