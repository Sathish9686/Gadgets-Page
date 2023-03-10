"use strict";
/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VSXEnvironment = void 0;
var inversify_1 = require("inversify");
var env_variables_1 = require("@theia/core/lib/common/env-variables");
var uri_1 = require("@theia/core/lib/common/uri");
var plugin_vscode_types_1 = require("@theia/plugin-ext-vscode/lib/common/plugin-vscode-types");
var VSXEnvironment = /** @class */ (function () {
    function VSXEnvironment() {
    }
    VSXEnvironment.prototype.getRegistryUri = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vsxRegistryUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this._registryUri) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.environments.getValue('VSX_REGISTRY_URL')];
                    case 1:
                        vsxRegistryUrl = _a.sent();
                        this._registryUri = new uri_1.default(vsxRegistryUrl && vsxRegistryUrl.value || 'https://open-vsx.org');
                        _a.label = 2;
                    case 2: return [2 /*return*/, this._registryUri];
                }
            });
        });
    };
    VSXEnvironment.prototype.getRegistryApiUri = function () {
        return __awaiter(this, void 0, void 0, function () {
            var registryUri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRegistryUri()];
                    case 1:
                        registryUri = _a.sent();
                        return [2 /*return*/, registryUri.resolve('api')];
                }
            });
        });
    };
    VSXEnvironment.prototype.getVscodeApiVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var apiVersion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this._apiVersion) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.environments.getValue('VSCODE_API_VERSION')];
                    case 1:
                        apiVersion = _a.sent();
                        this._apiVersion = (apiVersion === null || apiVersion === void 0 ? void 0 : apiVersion.value) || plugin_vscode_types_1.VSCODE_DEFAULT_API_VERSION;
                        _a.label = 2;
                    case 2: return [2 /*return*/, this._apiVersion];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(env_variables_1.EnvVariablesServer),
        __metadata("design:type", Object)
    ], VSXEnvironment.prototype, "environments", void 0);
    VSXEnvironment = __decorate([
        inversify_1.injectable()
    ], VSXEnvironment);
    return VSXEnvironment;
}());
exports.VSXEnvironment = VSXEnvironment;
//# sourceMappingURL=vsx-environment.js.map