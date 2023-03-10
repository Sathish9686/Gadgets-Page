"use strict";
/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
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
exports.ProblemWidgetTabBarDecorator = void 0;
var inversify_1 = require("inversify");
var event_1 = require("@theia/core/lib/common/event");
var problem_manager_1 = require("./problem-manager");
var ProblemWidgetTabBarDecorator = /** @class */ (function () {
    function ProblemWidgetTabBarDecorator() {
        this.id = 'theia-problems-widget-tabbar-decorator';
        this.emitter = new event_1.Emitter();
    }
    ProblemWidgetTabBarDecorator.prototype.init = function () {
        var _this = this;
        this.problemManager.onDidChangeMarkers(function () { return _this.fireDidChangeDecorations(); });
    };
    ProblemWidgetTabBarDecorator.prototype.decorate = function (title) {
        if (title.owner.id === 'problems') {
            var _a = this.problemManager.getProblemStat(), infos = _a.infos, warnings = _a.warnings, errors = _a.errors;
            var markerCount = infos + warnings + errors;
            return markerCount > 0 ? [{ badge: markerCount }] : [];
        }
        else {
            return [];
        }
    };
    Object.defineProperty(ProblemWidgetTabBarDecorator.prototype, "onDidChangeDecorations", {
        get: function () {
            return this.emitter.event;
        },
        enumerable: false,
        configurable: true
    });
    ProblemWidgetTabBarDecorator.prototype.fireDidChangeDecorations = function () {
        this.emitter.fire(undefined);
    };
    __decorate([
        inversify_1.inject(problem_manager_1.ProblemManager),
        __metadata("design:type", problem_manager_1.ProblemManager)
    ], ProblemWidgetTabBarDecorator.prototype, "problemManager", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ProblemWidgetTabBarDecorator.prototype, "init", null);
    ProblemWidgetTabBarDecorator = __decorate([
        inversify_1.injectable()
    ], ProblemWidgetTabBarDecorator);
    return ProblemWidgetTabBarDecorator;
}());
exports.ProblemWidgetTabBarDecorator = ProblemWidgetTabBarDecorator;
//# sourceMappingURL=problem-widget-tab-bar-decorator.js.map