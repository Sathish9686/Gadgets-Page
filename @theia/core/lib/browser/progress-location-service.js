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
exports.ProgressLocationService = void 0;
var inversify_1 = require("inversify");
var message_service_protocol_1 = require("../common/message-service-protocol");
var promise_util_1 = require("../common/promise-util");
var event_1 = require("../common/event");
var ProgressLocationService = /** @class */ (function () {
    function ProgressLocationService() {
        this.emitters = new Map();
        this.lastEvents = new Map();
        this.progressByLocation = new Map();
    }
    ProgressLocationService.prototype.getProgress = function (locationId) {
        return this.lastEvents.get(locationId);
    };
    ProgressLocationService.prototype.onProgress = function (locationId) {
        var emitter = this.addEmitter(locationId);
        return emitter.event;
    };
    ProgressLocationService.prototype.addEmitter = function (locationId) {
        var emitter = new event_1.Emitter();
        var list = this.emitters.get(locationId) || [];
        list.push(emitter);
        this.emitters.set(locationId, list);
        return emitter;
    };
    ProgressLocationService.prototype.showProgress = function (progressId, message, cancellationToken) {
        return __awaiter(this, void 0, void 0, function () {
            var locationId, result;
            var _this = this;
            return __generator(this, function (_a) {
                locationId = this.getLocationId(message);
                result = new promise_util_1.Deferred();
                cancellationToken.onCancellationRequested(function () {
                    _this.processEvent(progressId, locationId, 'done');
                    result.resolve(message_service_protocol_1.ProgressMessage.Cancel);
                });
                this.processEvent(progressId, locationId, 'start');
                return [2 /*return*/, result.promise];
            });
        });
    };
    ProgressLocationService.prototype.processEvent = function (progressId, locationId, event) {
        var progressSet = this.progressByLocation.get(locationId) || new Set();
        if (event === 'start') {
            progressSet.add(progressId);
        }
        else {
            progressSet.delete(progressId);
        }
        this.progressByLocation.set(locationId, progressSet);
        var show = !!progressSet.size;
        this.fireEvent(locationId, show);
    };
    ProgressLocationService.prototype.fireEvent = function (locationId, show) {
        var lastEvent = this.lastEvents.get(locationId);
        var shouldFire = !lastEvent || lastEvent.show !== show;
        if (shouldFire) {
            this.lastEvents.set(locationId, { show: show });
            this.getOrCreateEmitters(locationId).forEach(function (e) { return e.fire({ show: show }); });
        }
    };
    ProgressLocationService.prototype.getOrCreateEmitters = function (locationId) {
        var emitters = this.emitters.get(locationId);
        if (!emitters) {
            emitters = [this.addEmitter(locationId)];
        }
        return emitters;
    };
    ProgressLocationService.prototype.getLocationId = function (message) {
        return message.options && message.options.location || 'unknownLocation';
    };
    ProgressLocationService.prototype.reportProgress = function (progressId, update, message, cancellationToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ProgressLocationService = __decorate([
        inversify_1.injectable()
    ], ProgressLocationService);
    return ProgressLocationService;
}());
exports.ProgressLocationService = ProgressLocationService;
//# sourceMappingURL=progress-location-service.js.map