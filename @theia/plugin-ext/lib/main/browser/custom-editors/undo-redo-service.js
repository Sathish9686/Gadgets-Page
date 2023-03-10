"use strict";
/********************************************************************************
 * Copyright (c) 2021 SAP SE or an SAP affiliate company and others.
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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// copied and modified from https://github.com/microsoft/vscode/blob/53eac52308c4611000a171cc7bf1214293473c78/src/vs/platform/undoRedo/common/undoRedoService.ts#
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceEditStack = exports.UndoRedoService = void 0;
var inversify_1 = require("inversify");
var UndoRedoService = /** @class */ (function () {
    function UndoRedoService() {
        this.editStacks = new Map();
    }
    UndoRedoService.prototype.pushElement = function (resource, undo, redo) {
        var editStack;
        if (this.editStacks.has(resource.toString())) {
            editStack = this.editStacks.get(resource.toString());
        }
        else {
            editStack = new ResourceEditStack();
            this.editStacks.set(resource.toString(), editStack);
        }
        editStack.pushElement({ undo: undo, redo: redo });
    };
    UndoRedoService.prototype.removeElements = function (resource) {
        if (this.editStacks.has(resource.toString())) {
            this.editStacks.delete(resource.toString());
        }
    };
    UndoRedoService.prototype.undo = function (resource) {
        if (!this.editStacks.has(resource.toString())) {
            return;
        }
        var editStack = this.editStacks.get(resource.toString());
        var element = editStack.getClosestPastElement();
        if (!element) {
            return;
        }
        editStack.moveBackward(element);
        element.undo();
    };
    UndoRedoService.prototype.redo = function (resource) {
        if (!this.editStacks.has(resource.toString())) {
            return;
        }
        var editStack = this.editStacks.get(resource.toString());
        var element = editStack.getClosestFutureElement();
        if (!element) {
            return;
        }
        editStack.moveForward(element);
        element.redo();
    };
    UndoRedoService = __decorate([
        inversify_1.injectable()
    ], UndoRedoService);
    return UndoRedoService;
}());
exports.UndoRedoService = UndoRedoService;
var ResourceEditStack = /** @class */ (function () {
    function ResourceEditStack() {
        this.past = [];
        this.future = [];
    }
    ResourceEditStack.prototype.pushElement = function (element) {
        this.future = [];
        this.past.push(element);
    };
    ResourceEditStack.prototype.getClosestPastElement = function () {
        if (this.past.length === 0) {
            return null;
        }
        return this.past[this.past.length - 1];
    };
    ResourceEditStack.prototype.getClosestFutureElement = function () {
        if (this.future.length === 0) {
            return null;
        }
        return this.future[this.future.length - 1];
    };
    ResourceEditStack.prototype.moveBackward = function (element) {
        this.past.pop();
        this.future.push(element);
    };
    ResourceEditStack.prototype.moveForward = function (element) {
        this.future.pop();
        this.past.push(element);
    };
    return ResourceEditStack;
}());
exports.ResourceEditStack = ResourceEditStack;
//# sourceMappingURL=undo-redo-service.js.map