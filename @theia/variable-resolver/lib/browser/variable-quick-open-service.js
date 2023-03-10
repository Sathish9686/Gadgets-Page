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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableQuickOpenService = void 0;
var inversify_1 = require("inversify");
var message_service_1 = require("@theia/core/lib/common/message-service");
var quick_open_model_1 = require("@theia/core/lib/common/quick-open-model");
var quick_open_service_1 = require("@theia/core/lib/browser/quick-open/quick-open-service");
var quick_input_service_1 = require("@theia/core/lib/browser/quick-open/quick-input-service");
var variable_1 = require("./variable");
var variable_resolver_service_1 = require("./variable-resolver-service");
var VariableQuickOpenService = /** @class */ (function () {
    function VariableQuickOpenService(variableRegistry, quickOpenService) {
        this.variableRegistry = variableRegistry;
        this.quickOpenService = quickOpenService;
    }
    VariableQuickOpenService.prototype.open = function () {
        var _this = this;
        this.items = this.variableRegistry.getVariables().map(function (v) { return new quick_open_model_1.QuickOpenItem({
            label: '${' + v.name + '}',
            detail: v.description,
            run: function (mode) {
                if (mode === quick_open_model_1.QuickOpenMode.OPEN) {
                    setTimeout(function () { return _this.showValue(v); });
                    return true;
                }
                return false;
            }
        }); });
        this.quickOpenService.open(this, {
            placeholder: 'Registered variables',
            fuzzyMatchLabel: true,
            fuzzyMatchDescription: true,
            fuzzySort: true
        });
    };
    VariableQuickOpenService.prototype.onType = function (lookFor, acceptor) {
        acceptor(this.items);
    };
    VariableQuickOpenService.prototype.showValue = function (variable) {
        return __awaiter(this, void 0, void 0, function () {
            var argument, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.quickInputService.open({
                            placeHolder: 'Type a variable argument'
                        })];
                    case 1:
                        argument = _a.sent();
                        return [4 /*yield*/, this.variableResolver.resolve('${' + variable.name + ':' + argument + '}')];
                    case 2:
                        value = _a.sent();
                        if (typeof value === 'string') {
                            this.messages.info(value);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(message_service_1.MessageService),
        __metadata("design:type", message_service_1.MessageService)
    ], VariableQuickOpenService.prototype, "messages", void 0);
    __decorate([
        inversify_1.inject(quick_input_service_1.QuickInputService),
        __metadata("design:type", quick_input_service_1.QuickInputService)
    ], VariableQuickOpenService.prototype, "quickInputService", void 0);
    __decorate([
        inversify_1.inject(variable_resolver_service_1.VariableResolverService),
        __metadata("design:type", variable_resolver_service_1.VariableResolverService)
    ], VariableQuickOpenService.prototype, "variableResolver", void 0);
    VariableQuickOpenService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(variable_1.VariableRegistry)),
        __param(1, inversify_1.inject(quick_open_service_1.QuickOpenService)),
        __metadata("design:paramtypes", [variable_1.VariableRegistry,
            quick_open_service_1.QuickOpenService])
    ], VariableQuickOpenService);
    return VariableQuickOpenService;
}());
exports.VariableQuickOpenService = VariableQuickOpenService;
//# sourceMappingURL=variable-quick-open-service.js.map