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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendApplicationStateService = void 0;
var inversify_1 = require("inversify");
var event_1 = require("../common/event");
var promise_util_1 = require("../common/promise-util");
var logger_1 = require("../common/logger");
var FrontendApplicationStateService = /** @class */ (function () {
    function FrontendApplicationStateService() {
        this._state = 'init';
        this.deferred = {};
        this.stateChanged = new event_1.Emitter();
    }
    Object.defineProperty(FrontendApplicationStateService.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (state) {
            if (state !== this._state) {
                if (this.deferred[this._state] === undefined) {
                    this.deferred[this._state] = new promise_util_1.Deferred();
                }
                var oldState = this._state;
                this._state = state;
                if (this.deferred[state] === undefined) {
                    this.deferred[state] = new promise_util_1.Deferred();
                }
                this.deferred[state].resolve();
                this.logger.info("Changed application state from '" + oldState + "' to '" + this._state + "'.");
                this.stateChanged.fire(state);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FrontendApplicationStateService.prototype, "onStateChanged", {
        get: function () {
            return this.stateChanged.event;
        },
        enumerable: false,
        configurable: true
    });
    FrontendApplicationStateService.prototype.reachedState = function (state) {
        if (this.deferred[state] === undefined) {
            this.deferred[state] = new promise_util_1.Deferred();
        }
        return this.deferred[state].promise;
    };
    FrontendApplicationStateService.prototype.reachedAnyState = function () {
        var _this = this;
        var states = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            states[_i] = arguments[_i];
        }
        return Promise.race(states.map(function (s) { return _this.reachedState(s); }));
    };
    __decorate([
        inversify_1.inject(logger_1.ILogger),
        __metadata("design:type", Object)
    ], FrontendApplicationStateService.prototype, "logger", void 0);
    FrontendApplicationStateService = __decorate([
        inversify_1.injectable()
    ], FrontendApplicationStateService);
    return FrontendApplicationStateService;
}());
exports.FrontendApplicationStateService = FrontendApplicationStateService;
//# sourceMappingURL=frontend-application-state.js.map