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
exports.LocalhostMatcher = exports.URLMatcher = exports.AbstractCmdClickTerminalContribution = void 0;
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var opener_service_1 = require("@theia/core/lib/browser/opener-service");
var uri_1 = require("@theia/core/lib/common/uri");
var AbstractCmdClickTerminalContribution = /** @class */ (function () {
    function AbstractCmdClickTerminalContribution() {
    }
    AbstractCmdClickTerminalContribution.prototype.getValidate = function (terminalWidget) {
        return function () { return Promise.resolve(true); };
    };
    AbstractCmdClickTerminalContribution.prototype.onCreate = function (terminalWidget) {
        return __awaiter(this, void 0, void 0, function () {
            var term, regexp, handler, validate, wrappedHandler, matcherId;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        term = terminalWidget.getTerminal();
                        return [4 /*yield*/, this.getRegExp(terminalWidget)];
                    case 1:
                        regexp = _a.sent();
                        handler = this.getHandler(terminalWidget);
                        validate = this.getValidate(terminalWidget);
                        wrappedHandler = function (event, match) {
                            event.preventDefault();
                            if (_this.isCommandPressed(event) || _this.wasTouchEvent(event, terminalWidget.lastTouchEndEvent)) {
                                handler(event, match);
                            }
                            else {
                                term.focus();
                            }
                        };
                        matcherId = term.registerLinkMatcher(regexp, wrappedHandler, {
                            willLinkActivate: function (event, uri) { return _this.isCommandPressed(event) || _this.wasTouchEvent(event, terminalWidget.lastTouchEndEvent); },
                            tooltipCallback: function (event, uri) {
                                if (!_this.wasTouchEvent(event, terminalWidget.lastTouchEndEvent)) {
                                    terminalWidget.showHoverMessage(event.clientX, event.clientY, _this.getHoverMessage());
                                }
                            },
                            leaveCallback: function () {
                                terminalWidget.hideHover();
                            },
                            validationCallback: function (uri, callBack) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = callBack;
                                            return [4 /*yield*/, validate(uri)];
                                        case 1:
                                            _a.apply(void 0, [_b.sent()]);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }
                        });
                        terminalWidget.onDispose(function () {
                            term.deregisterLinkMatcher(matcherId);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AbstractCmdClickTerminalContribution.prototype.isCommandPressed = function (event) {
        return core_1.isOSX ? event.metaKey : event.ctrlKey;
    };
    AbstractCmdClickTerminalContribution.prototype.wasTouchEvent = function (event, lastTouchEnd) {
        if (!lastTouchEnd) {
            return false;
        }
        if ((event.timeStamp - lastTouchEnd.timeStamp) > 400) {
            // A 'touchend' event typically precedes a matching 'click' event by 50ms.
            return false;
        }
        if (Math.abs(event.pageX - lastTouchEnd.pageX) > 5) {
            // Matching 'touchend' and 'click' events typically have the same page coordinates,
            // plus or minus 1 pixel.
            return false;
        }
        if (Math.abs(event.pageY - lastTouchEnd.pageY) > 5) {
            return false;
        }
        // We have a match! This link was tapped.
        return true;
    };
    AbstractCmdClickTerminalContribution.prototype.getHoverMessage = function () {
        if (core_1.isOSX) {
            return 'Cmd + click to follow link';
        }
        else {
            return 'Ctrl + click to follow link';
        }
    };
    AbstractCmdClickTerminalContribution = __decorate([
        inversify_1.injectable()
    ], AbstractCmdClickTerminalContribution);
    return AbstractCmdClickTerminalContribution;
}());
exports.AbstractCmdClickTerminalContribution = AbstractCmdClickTerminalContribution;
var URLMatcher = /** @class */ (function (_super) {
    __extends(URLMatcher, _super);
    function URLMatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    URLMatcher.prototype.getRegExp = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/];
            });
        });
    };
    URLMatcher.prototype.getHandler = function () {
        var _this = this;
        return function (event, uri) {
            return opener_service_1.open(_this.openerService, new uri_1.default(uri));
        };
    };
    __decorate([
        inversify_1.inject(opener_service_1.OpenerService),
        __metadata("design:type", Object)
    ], URLMatcher.prototype, "openerService", void 0);
    URLMatcher = __decorate([
        inversify_1.injectable()
    ], URLMatcher);
    return URLMatcher;
}(AbstractCmdClickTerminalContribution));
exports.URLMatcher = URLMatcher;
var LocalhostMatcher = /** @class */ (function (_super) {
    __extends(LocalhostMatcher, _super);
    function LocalhostMatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalhostMatcher.prototype.getRegExp = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, /(https?:\/\/)?(localhost|127\.0\.0\.1|0\.0\.0\.0)(:[0-9]{1,5})?([-a-zA-Z0-9@:%_\+.~#?&//=]*)/];
            });
        });
    };
    LocalhostMatcher.prototype.getHandler = function () {
        var _this = this;
        return function (event, matched) {
            var uri = matched.startsWith('http') ? matched : "http://" + matched;
            opener_service_1.open(_this.openerService, new uri_1.default(uri));
        };
    };
    __decorate([
        inversify_1.inject(opener_service_1.OpenerService),
        __metadata("design:type", Object)
    ], LocalhostMatcher.prototype, "openerService", void 0);
    LocalhostMatcher = __decorate([
        inversify_1.injectable()
    ], LocalhostMatcher);
    return LocalhostMatcher;
}(AbstractCmdClickTerminalContribution));
exports.LocalhostMatcher = LocalhostMatcher;
//# sourceMappingURL=terminal-linkmatcher.js.map