"use strict";
/********************************************************************************
 * Copyright (C) 2020 Arm and others.
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
exports.ScmExtraLayoutVersion4Migration = void 0;
var inversify_1 = require("inversify");
var scm_history_contribution_1 = require("./history/scm-history-contribution");
var ScmExtraLayoutVersion4Migration = /** @class */ (function () {
    function ScmExtraLayoutVersion4Migration() {
        this.layoutVersion = 4.0;
    }
    ScmExtraLayoutVersion4Migration.prototype.onWillInflateWidget = function (desc, _a) {
        var parent = _a.parent;
        if (desc.constructionOptions.factoryId === 'git-history') {
            desc.constructionOptions.factoryId = scm_history_contribution_1.SCM_HISTORY_ID;
            return desc;
        }
        return undefined;
    };
    ScmExtraLayoutVersion4Migration = __decorate([
        inversify_1.injectable()
    ], ScmExtraLayoutVersion4Migration);
    return ScmExtraLayoutVersion4Migration;
}());
exports.ScmExtraLayoutVersion4Migration = ScmExtraLayoutVersion4Migration;
//# sourceMappingURL=scm-extra-layout-migrations.js.map