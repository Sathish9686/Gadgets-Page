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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScmTreeLabelProvider = void 0;
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var label_provider_1 = require("@theia/core/lib/browser/label-provider");
var tree_1 = require("@theia/core/lib/browser/tree");
var scm_tree_model_1 = require("./scm-tree-model");
var ScmTreeLabelProvider = /** @class */ (function () {
    function ScmTreeLabelProvider() {
    }
    ScmTreeLabelProvider.prototype.canHandle = function (element) {
        return tree_1.TreeNode.is(element) && (scm_tree_model_1.ScmFileChangeGroupNode.is(element) || scm_tree_model_1.ScmFileChangeFolderNode.is(element) || scm_tree_model_1.ScmFileChangeNode.is(element)) ? 60 : 0;
    };
    ScmTreeLabelProvider.prototype.getName = function (node) {
        if (scm_tree_model_1.ScmFileChangeGroupNode.is(node)) {
            return node.groupLabel;
        }
        if (scm_tree_model_1.ScmFileChangeFolderNode.is(node)) {
            return node.path;
        }
        if (scm_tree_model_1.ScmFileChangeNode.is(node)) {
            return this.labelProvider.getName(new uri_1.default(node.sourceUri));
        }
        return '';
    };
    __decorate([
        inversify_1.inject(label_provider_1.LabelProvider),
        __metadata("design:type", label_provider_1.LabelProvider)
    ], ScmTreeLabelProvider.prototype, "labelProvider", void 0);
    ScmTreeLabelProvider = __decorate([
        inversify_1.injectable()
    ], ScmTreeLabelProvider);
    return ScmTreeLabelProvider;
}());
exports.ScmTreeLabelProvider = ScmTreeLabelProvider;
//# sourceMappingURL=scm-tree-label-provider.js.map