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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickOpenService = void 0;
var inversify_1 = require("inversify");
var event_1 = require("../../common/event");
/**
 * @deprecated import from `@theia/core/lib/common/quick-open-service` instead
 */
var quick_open_service_1 = require("../../common/quick-open-service");
Object.defineProperty(exports, "QuickOpenOptions", { enumerable: true, get: function () { return quick_open_service_1.QuickOpenOptions; } });
var QuickOpenService = /** @class */ (function () {
    function QuickOpenService() {
        this.onDidChangeActiveEmitter = new event_1.Emitter();
        this.onDidChangeActive = this.onDidChangeActiveEmitter.event;
    }
    QuickOpenService.prototype.getActive = function () {
        return [];
    };
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    QuickOpenService.prototype.open = function (model, options) { };
    QuickOpenService.prototype.hide = function (reason) { };
    QuickOpenService.prototype.showDecoration = function (type) { };
    QuickOpenService.prototype.hideDecoration = function () { };
    QuickOpenService.prototype.refresh = function () { };
    QuickOpenService = __decorate([
        inversify_1.injectable()
    ], QuickOpenService);
    return QuickOpenService;
}());
exports.QuickOpenService = QuickOpenService;
//# sourceMappingURL=quick-open-service.js.map