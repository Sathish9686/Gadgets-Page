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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickOpenFrontendContribution = void 0;
var inversify_1 = require("inversify");
var common_1 = require("../../common");
var prefix_quick_open_service_1 = require("./prefix-quick-open-service");
var QuickOpenFrontendContribution = /** @class */ (function () {
    function QuickOpenFrontendContribution() {
    }
    QuickOpenFrontendContribution.prototype.onStart = function () {
        var _this = this;
        this.contributionProvider.getContributions().forEach(function (contrib) {
            return contrib.registerQuickOpenHandlers(_this.quickOpenHandlerRegistry);
        });
    };
    __decorate([
        inversify_1.inject(prefix_quick_open_service_1.QuickOpenHandlerRegistry),
        __metadata("design:type", prefix_quick_open_service_1.QuickOpenHandlerRegistry)
    ], QuickOpenFrontendContribution.prototype, "quickOpenHandlerRegistry", void 0);
    __decorate([
        inversify_1.inject(common_1.ContributionProvider),
        inversify_1.named(prefix_quick_open_service_1.QuickOpenContribution),
        __metadata("design:type", Object)
    ], QuickOpenFrontendContribution.prototype, "contributionProvider", void 0);
    QuickOpenFrontendContribution = __decorate([
        inversify_1.injectable()
    ], QuickOpenFrontendContribution);
    return QuickOpenFrontendContribution;
}());
exports.QuickOpenFrontendContribution = QuickOpenFrontendContribution;
//# sourceMappingURL=quick-open-frontend-contribution.js.map