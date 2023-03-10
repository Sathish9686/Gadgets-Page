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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeSource = exports.CompositeTreeElement = void 0;
var inversify_1 = require("inversify");
var event_1 = require("../../common/event");
var disposable_1 = require("../../common/disposable");
var CompositeTreeElement;
(function (CompositeTreeElement) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    function is(element) {
        return !!element && 'getElements' in element;
    }
    CompositeTreeElement.is = is;
    function hasElements(element) {
        return is(element) && element.hasElements !== false;
    }
    CompositeTreeElement.hasElements = hasElements;
})(CompositeTreeElement = exports.CompositeTreeElement || (exports.CompositeTreeElement = {}));
var TreeSource = /** @class */ (function () {
    function TreeSource(options) {
        if (options === void 0) { options = {}; }
        this.onDidChangeEmitter = new event_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
        this.toDispose = new disposable_1.DisposableCollection(this.onDidChangeEmitter);
        this.id = options.id;
        this.placeholder = options.placeholder;
    }
    TreeSource.prototype.fireDidChange = function () {
        this.onDidChangeEmitter.fire(undefined);
    };
    TreeSource.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    TreeSource = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.unmanaged()),
        __metadata("design:paramtypes", [Object])
    ], TreeSource);
    return TreeSource;
}());
exports.TreeSource = TreeSource;
//# sourceMappingURL=tree-source.js.map