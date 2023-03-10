"use strict";
/********************************************************************************
 * Copyright (C) 2019 Red Hat, Inc. and others.
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
exports.ScmRepository = void 0;
var common_1 = require("@theia/core/lib/common");
var scm_input_1 = require("./scm-input");
var ScmRepository = /** @class */ (function () {
    function ScmRepository(provider, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.provider = provider;
        this.options = options;
        this.onDidChangeEmitter = new common_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
        this.toDispose = new common_1.DisposableCollection(this.onDidChangeEmitter);
        this.toDispose.pushAll([
            this.provider,
            this.input = new scm_input_1.ScmInput(options.input),
            this.input.onDidChange(function () { return _this.fireDidChange(); })
        ]);
    }
    ScmRepository.prototype.fireDidChange = function () {
        this.onDidChangeEmitter.fire(undefined);
    };
    ScmRepository.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    return ScmRepository;
}());
exports.ScmRepository = ScmRepository;
//# sourceMappingURL=scm-repository.js.map