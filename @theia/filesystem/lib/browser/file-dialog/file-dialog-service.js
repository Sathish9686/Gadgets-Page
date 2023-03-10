"use strict";
/********************************************************************************
 * Copyright (C) 2018 Ericsson and others.
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultFileDialogService = exports.FileDialogService = void 0;
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var browser_1 = require("@theia/core/lib/browser");
var file_tree_1 = require("../file-tree");
var file_dialog_1 = require("./file-dialog");
var file_service_1 = require("../file-service");
var env_variables_1 = require("@theia/core/lib/common/env-variables");
exports.FileDialogService = Symbol('FileDialogService');
var DefaultFileDialogService = /** @class */ (function () {
    function DefaultFileDialogService() {
    }
    DefaultFileDialogService.prototype.showOpenDialog = function (props, folder) {
        return __awaiter(this, void 0, void 0, function () {
            var title, rootNode, dialog, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        title = props.title || 'Open';
                        return [4 /*yield*/, this.getRootNode(folder)];
                    case 1:
                        rootNode = _a.sent();
                        if (!rootNode) return [3 /*break*/, 4];
                        dialog = this.openFileDialogFactory(Object.assign(props, { title: title }));
                        return [4 /*yield*/, dialog.model.navigateTo(rootNode)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, dialog.open()];
                    case 3:
                        value = _a.sent();
                        if (value) {
                            if (!Array.isArray(value)) {
                                return [2 /*return*/, value.uri];
                            }
                            return [2 /*return*/, value.map(function (node) { return node.uri; })];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, undefined];
                }
            });
        });
    };
    DefaultFileDialogService.prototype.showSaveDialog = function (props, folder) {
        return __awaiter(this, void 0, void 0, function () {
            var title, rootNode, dialog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        title = props.title || 'Save';
                        return [4 /*yield*/, this.getRootNode(folder)];
                    case 1:
                        rootNode = _a.sent();
                        if (!rootNode) return [3 /*break*/, 3];
                        dialog = this.saveFileDialogFactory(Object.assign(props, { title: title }));
                        return [4 /*yield*/, dialog.model.navigateTo(rootNode)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, dialog.open()];
                    case 3: return [2 /*return*/, undefined];
                }
            });
        });
    };
    DefaultFileDialogService.prototype.getRootNode = function (folderToOpen) {
        return __awaiter(this, void 0, void 0, function () {
            var folder, _a, _b, _c, folderUri, rootUri, rootStat, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = folderToOpen;
                        if (_a) return [3 /*break*/, 2];
                        _b = {};
                        _c = uri_1.default.bind;
                        return [4 /*yield*/, this.environments.getHomeDirUri()];
                    case 1:
                        _a = (_b.resource = new (_c.apply(uri_1.default, [void 0, _e.sent()]))(),
                            _b.isDirectory = true,
                            _b);
                        _e.label = 2;
                    case 2:
                        folder = _a;
                        folderUri = folder.resource;
                        rootUri = folder.isDirectory ? folderUri : folderUri.parent;
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.fileService.resolve(rootUri)];
                    case 4:
                        rootStat = _e.sent();
                        return [2 /*return*/, file_tree_1.DirNode.createRoot(rootStat)];
                    case 5:
                        _d = _e.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, undefined];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(env_variables_1.EnvVariablesServer),
        __metadata("design:type", Object)
    ], DefaultFileDialogService.prototype, "environments", void 0);
    __decorate([
        inversify_1.inject(file_service_1.FileService),
        __metadata("design:type", file_service_1.FileService)
    ], DefaultFileDialogService.prototype, "fileService", void 0);
    __decorate([
        inversify_1.inject(file_dialog_1.OpenFileDialogFactory),
        __metadata("design:type", Function)
    ], DefaultFileDialogService.prototype, "openFileDialogFactory", void 0);
    __decorate([
        inversify_1.inject(browser_1.LabelProvider),
        __metadata("design:type", browser_1.LabelProvider)
    ], DefaultFileDialogService.prototype, "labelProvider", void 0);
    __decorate([
        inversify_1.inject(file_dialog_1.SaveFileDialogFactory),
        __metadata("design:type", Function)
    ], DefaultFileDialogService.prototype, "saveFileDialogFactory", void 0);
    DefaultFileDialogService = __decorate([
        inversify_1.injectable()
    ], DefaultFileDialogService);
    return DefaultFileDialogService;
}());
exports.DefaultFileDialogService = DefaultFileDialogService;
//# sourceMappingURL=file-dialog-service.js.map