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
exports.CommonVariableContribution = void 0;
var inversify_1 = require("inversify");
var application_protocol_1 = require("@theia/core/lib/common/application-protocol");
var env_variables_1 = require("@theia/core/lib/common/env-variables");
var command_1 = require("@theia/core/lib/common/command");
var os_1 = require("@theia/core/lib/common/os");
var preference_service_1 = require("@theia/core/lib/browser/preferences/preference-service");
var resource_context_key_1 = require("@theia/core/lib/browser/resource-context-key");
var quick_input_service_1 = require("@theia/core/lib/browser/quick-open/quick-input-service");
var quick_pick_service_1 = require("@theia/core/lib/common/quick-pick-service");
var CommonVariableContribution = /** @class */ (function () {
    function CommonVariableContribution() {
    }
    CommonVariableContribution.prototype.registerVariables = function (variables) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, execPath, backendOS;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.env.getExecPath(),
                            this.appServer.getBackendOS()
                        ])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), execPath = _a[0], backendOS = _a[1];
                        variables.registerVariable({
                            name: 'execPath',
                            resolve: function () { return execPath; }
                        });
                        variables.registerVariable({
                            name: 'pathSeparator',
                            resolve: function () { return backendOS === os_1.OS.Type.Windows ? '\\' : '/'; }
                        });
                        variables.registerVariable({
                            name: 'env',
                            resolve: function (_, envVariableName) { return __awaiter(_this, void 0, void 0, function () {
                                var envVariable, _a, envValue;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = envVariableName;
                                            if (!_a) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.env.getValue(envVariableName)];
                                        case 1:
                                            _a = (_b.sent());
                                            _b.label = 2;
                                        case 2:
                                            envVariable = _a;
                                            envValue = envVariable && envVariable.value;
                                            return [2 /*return*/, envValue || ''];
                                    }
                                });
                            }); }
                        });
                        variables.registerVariable({
                            name: 'config',
                            resolve: function (resourceUri, preferenceName) {
                                if (resourceUri === void 0) { resourceUri = _this.resourceContextKey.get(); }
                                if (!preferenceName) {
                                    return undefined;
                                }
                                return _this.preferences.get(preferenceName, undefined, resourceUri && resourceUri.toString());
                            }
                        });
                        variables.registerVariable({
                            name: 'command',
                            resolve: function (_, command) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        // eslint-disable-next-line no-return-await
                                        _a = command;
                                        if (!_a) 
                                        // eslint-disable-next-line no-return-await
                                        return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.commands.executeCommand(command)];
                                    case 1:
                                        _a = (_b.sent());
                                        _b.label = 2;
                                    case 2: 
                                    // eslint-disable-next-line no-return-await
                                    return [2 /*return*/, _a];
                                }
                            }); }); }
                        });
                        variables.registerVariable({
                            name: 'input',
                            resolve: function (resourceUri, variable, section) {
                                if (resourceUri === void 0) { resourceUri = _this.resourceContextKey.get(); }
                                return __awaiter(_this, void 0, void 0, function () {
                                    var configuration, inputs, input, elements, _a, _b, option;
                                    var e_1, _c;
                                    return __generator(this, function (_d) {
                                        if (!variable || !section) {
                                            return [2 /*return*/, undefined];
                                        }
                                        configuration = this.preferences.get(section, undefined, resourceUri && resourceUri.toString());
                                        inputs = !!configuration && 'inputs' in configuration ? configuration.inputs : undefined;
                                        input = Array.isArray(inputs) && inputs.find(function (item) { return !!item && item.id === variable; });
                                        if (!input) {
                                            return [2 /*return*/, undefined];
                                        }
                                        if (input.type === 'promptString') {
                                            if (typeof input.description !== 'string') {
                                                return [2 /*return*/, undefined];
                                            }
                                            return [2 /*return*/, this.quickInputService.open({
                                                    prompt: input.description,
                                                    value: input.default
                                                })];
                                        }
                                        if (input.type === 'pickString') {
                                            if (typeof input.description !== 'string' || !Array.isArray(input.options)) {
                                                return [2 /*return*/, undefined];
                                            }
                                            elements = [];
                                            try {
                                                for (_a = __values(input.options), _b = _a.next(); !_b.done; _b = _a.next()) {
                                                    option = _b.value;
                                                    if (typeof option !== 'string') {
                                                        return [2 /*return*/, undefined];
                                                    }
                                                    if (option === input.default) {
                                                        elements.unshift({
                                                            description: 'Default',
                                                            label: option,
                                                            value: option
                                                        });
                                                    }
                                                    else {
                                                        elements.push({
                                                            label: option,
                                                            value: option
                                                        });
                                                    }
                                                }
                                            }
                                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                            finally {
                                                try {
                                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                                }
                                                finally { if (e_1) throw e_1.error; }
                                            }
                                            return [2 /*return*/, this.quickPickService.show(elements, { placeholder: input.description })];
                                        }
                                        if (input.type === 'command') {
                                            if (typeof input.command !== 'string') {
                                                return [2 /*return*/, undefined];
                                            }
                                            return [2 /*return*/, this.commands.executeCommand(input.command, input.args)];
                                        }
                                        return [2 /*return*/, undefined];
                                    });
                                });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(env_variables_1.EnvVariablesServer),
        __metadata("design:type", Object)
    ], CommonVariableContribution.prototype, "env", void 0);
    __decorate([
        inversify_1.inject(command_1.CommandService),
        __metadata("design:type", Object)
    ], CommonVariableContribution.prototype, "commands", void 0);
    __decorate([
        inversify_1.inject(preference_service_1.PreferenceService),
        __metadata("design:type", Object)
    ], CommonVariableContribution.prototype, "preferences", void 0);
    __decorate([
        inversify_1.inject(resource_context_key_1.ResourceContextKey),
        __metadata("design:type", resource_context_key_1.ResourceContextKey)
    ], CommonVariableContribution.prototype, "resourceContextKey", void 0);
    __decorate([
        inversify_1.inject(quick_input_service_1.QuickInputService),
        __metadata("design:type", quick_input_service_1.QuickInputService)
    ], CommonVariableContribution.prototype, "quickInputService", void 0);
    __decorate([
        inversify_1.inject(quick_pick_service_1.QuickPickService),
        __metadata("design:type", Object)
    ], CommonVariableContribution.prototype, "quickPickService", void 0);
    __decorate([
        inversify_1.inject(application_protocol_1.ApplicationServer),
        __metadata("design:type", Object)
    ], CommonVariableContribution.prototype, "appServer", void 0);
    CommonVariableContribution = __decorate([
        inversify_1.injectable()
    ], CommonVariableContribution);
    return CommonVariableContribution;
}());
exports.CommonVariableContribution = CommonVariableContribution;
//# sourceMappingURL=common-variable-contribution.js.map