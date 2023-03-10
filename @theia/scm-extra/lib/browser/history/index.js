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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScmHistoryProvider = exports.ScmHistorySupport = void 0;
var scm_history_widget_1 = require("./scm-history-widget");
Object.defineProperty(exports, "ScmHistorySupport", { enumerable: true, get: function () { return scm_history_widget_1.ScmHistorySupport; } });
var ScmHistoryProvider;
(function (ScmHistoryProvider) {
    function is(scmProvider) {
        return !!scmProvider && 'historySupport' in scmProvider;
    }
    ScmHistoryProvider.is = is;
})(ScmHistoryProvider = exports.ScmHistoryProvider || (exports.ScmHistoryProvider = {}));
//# sourceMappingURL=index.js.map