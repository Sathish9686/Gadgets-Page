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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableRegistry = exports.VariableContribution = void 0;
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
exports.VariableContribution = Symbol('VariableContribution');
/**
 * The variable registry manages variables.
 */
var VariableRegistry = /** @class */ (function () {
    function VariableRegistry() {
        this.variables = new Map();
        this.toDispose = new core_1.DisposableCollection();
    }
    VariableRegistry.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    /**
     * Register the given variable.
     * Do nothing if a variable is already registered for the given variable name.
     */
    VariableRegistry.prototype.registerVariable = function (variable) {
        var _this = this;
        if (this.variables.has(variable.name)) {
            console.warn("A variables with name " + variable.name + " is already registered.");
            return core_1.Disposable.NULL;
        }
        this.variables.set(variable.name, variable);
        var disposable = {
            dispose: function () { return _this.variables.delete(variable.name); }
        };
        this.toDispose.push(disposable);
        return disposable;
    };
    /**
     * Return all registered variables.
     */
    VariableRegistry.prototype.getVariables = function () {
        return __spread(this.variables.values());
    };
    /**
     * Get a variable for the given name or `undefined` if none.
     */
    VariableRegistry.prototype.getVariable = function (name) {
        return this.variables.get(name);
    };
    /**
     * Register an array of variables.
     * Do nothing if a variable is already registered for the given variable name.
     */
    VariableRegistry.prototype.registerVariables = function (variables) {
        var _this = this;
        return variables.map(function (v) { return _this.registerVariable(v); });
    };
    VariableRegistry = __decorate([
        inversify_1.injectable()
    ], VariableRegistry);
    return VariableRegistry;
}());
exports.VariableRegistry = VariableRegistry;
//# sourceMappingURL=variable.js.map