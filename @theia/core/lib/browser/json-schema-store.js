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
exports.DefaultJsonSchemaContribution = exports.JsonSchemaStore = exports.JsonSchemaContribution = void 0;
var inversify_1 = require("inversify");
var contribution_provider_1 = require("../common/contribution-provider");
var endpoint_1 = require("./endpoint");
var promise_util_1 = require("../common/promise-util");
exports.JsonSchemaContribution = Symbol('JsonSchemaContribution');
var JsonSchemaStore = /** @class */ (function () {
    function JsonSchemaStore() {
        this._schemas = new promise_util_1.Deferred();
    }
    Object.defineProperty(JsonSchemaStore.prototype, "schemas", {
        get: function () {
            return this._schemas.promise;
        },
        enumerable: false,
        configurable: true
    });
    JsonSchemaStore.prototype.onStart = function () {
        var e_1, _a;
        var _this = this;
        var pendingRegistrations = [];
        var schemas = [];
        var freeze = function () {
            Object.freeze(schemas);
            _this._schemas.resolve(schemas);
        };
        var registerTimeout = this.getRegisterTimeout();
        var frozenErrorCode = 'JsonSchemaRegisterContext.frozen';
        var context = {
            registerSchema: function (schema) {
                if (Object.isFrozen(schemas)) {
                    throw new Error(frozenErrorCode);
                }
                schemas.push(schema);
            }
        };
        var _loop_1 = function (contribution) {
            var result = contribution.registerSchemas(context);
            if (result) {
                pendingRegistrations.push(result.then(function () { }, function (e) {
                    if (e instanceof Error && e.message === frozenErrorCode) {
                        console.error(contribution.constructor.name + ".registerSchemas is taking more than " + registerTimeout.toFixed(1) + " ms, new schemas are ignored.");
                    }
                    else {
                        console.error(e);
                    }
                }));
            }
        };
        try {
            for (var _b = __values(this.contributions.getContributions()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var contribution = _c.value;
                _loop_1(contribution);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (pendingRegistrations.length) {
            var pending = Promise.all(pendingRegistrations).then(function () { });
            if (registerTimeout) {
                pending = Promise.race([pending, promise_util_1.timeout(registerTimeout)]);
            }
            pending.then(freeze);
        }
        else {
            freeze();
        }
    };
    JsonSchemaStore.prototype.getRegisterTimeout = function () {
        return 500;
    };
    __decorate([
        inversify_1.inject(contribution_provider_1.ContributionProvider),
        inversify_1.named(exports.JsonSchemaContribution),
        __metadata("design:type", Object)
    ], JsonSchemaStore.prototype, "contributions", void 0);
    JsonSchemaStore = __decorate([
        inversify_1.injectable()
    ], JsonSchemaStore);
    return JsonSchemaStore;
}());
exports.JsonSchemaStore = JsonSchemaStore;
var DefaultJsonSchemaContribution = /** @class */ (function () {
    function DefaultJsonSchemaContribution() {
    }
    DefaultJsonSchemaContribution.prototype.registerSchemas = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, schemas, schemas_1, schemas_1_1, s;
            var e_2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = new endpoint_1.Endpoint().httpScheme + "//schemastore.azurewebsites.net/api/json/catalog.json";
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        schemas = (_b.sent()).schemas;
                        try {
                            for (schemas_1 = __values(schemas), schemas_1_1 = schemas_1.next(); !schemas_1_1.done; schemas_1_1 = schemas_1.next()) {
                                s = schemas_1_1.value;
                                if (s.fileMatch) {
                                    context.registerSchema({
                                        fileMatch: s.fileMatch,
                                        url: s.url
                                    });
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (schemas_1_1 && !schemas_1_1.done && (_a = schemas_1.return)) _a.call(schemas_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultJsonSchemaContribution = __decorate([
        inversify_1.injectable()
    ], DefaultJsonSchemaContribution);
    return DefaultJsonSchemaContribution;
}());
exports.DefaultJsonSchemaContribution = DefaultJsonSchemaContribution;
//# sourceMappingURL=json-schema-store.js.map