"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.DirNode = exports.FileNode = exports.FileStatNodeData = exports.FileStatNode = exports.FileTree = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var files_1 = require("../../common/files");
var message_service_1 = require("@theia/core/lib/common/message-service");
var file_service_1 = require("../file-service");
var FileTree = /** @class */ (function (_super) {
    __extends(FileTree, _super);
    function FileTree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileTree.prototype.resolveChildren = function (parent) {
        return __awaiter(this, void 0, void 0, function () {
            var fileStat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!FileStatNode.is(parent)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.resolveFileStat(parent)];
                    case 1:
                        fileStat = _a.sent();
                        if (fileStat) {
                            return [2 /*return*/, this.toNodes(fileStat, parent)];
                        }
                        return [2 /*return*/, []];
                    case 2: return [2 /*return*/, _super.prototype.resolveChildren.call(this, parent)];
                }
            });
        });
    };
    FileTree.prototype.resolveFileStat = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            var fileStat, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fileService.resolve(node.uri)];
                    case 1:
                        fileStat = _a.sent();
                        node.fileStat = fileStat;
                        return [2 /*return*/, fileStat];
                    case 2:
                        e_1 = _a.sent();
                        if (!(e_1 instanceof files_1.FileOperationError && e_1.fileOperationResult === 1 /* FILE_NOT_FOUND */)) {
                            this.messagingService.error(e_1.message);
                        }
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileTree.prototype.toNodes = function (fileStat, parent) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fileStat.children) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, Promise.all(fileStat.children.map(function (child) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, this.toNode(child, parent)];
                            }); }); }))];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.sort(DirNode.compare)];
                }
            });
        });
    };
    FileTree.prototype.toNode = function (fileStat, parent) {
        var uri = fileStat.resource;
        var id = this.toNodeId(uri, parent);
        var node = this.getNode(id);
        if (fileStat.isDirectory) {
            if (DirNode.is(node)) {
                node.fileStat = fileStat;
                return node;
            }
            return {
                id: id, uri: uri, fileStat: fileStat, parent: parent,
                expanded: false,
                selected: false,
                children: []
            };
        }
        if (FileNode.is(node)) {
            node.fileStat = fileStat;
            return node;
        }
        return {
            id: id, uri: uri, fileStat: fileStat, parent: parent,
            selected: false
        };
    };
    FileTree.prototype.toNodeId = function (uri, parent) {
        return uri.path.toString();
    };
    __decorate([
        inversify_1.inject(file_service_1.FileService),
        __metadata("design:type", file_service_1.FileService)
    ], FileTree.prototype, "fileService", void 0);
    __decorate([
        inversify_1.inject(message_service_1.MessageService),
        __metadata("design:type", message_service_1.MessageService)
    ], FileTree.prototype, "messagingService", void 0);
    FileTree = __decorate([
        inversify_1.injectable()
    ], FileTree);
    return FileTree;
}(browser_1.TreeImpl));
exports.FileTree = FileTree;
var FileStatNode;
(function (FileStatNode) {
    function is(node) {
        return !!node && 'fileStat' in node;
    }
    FileStatNode.is = is;
    function getUri(node) {
        if (is(node)) {
            return node.fileStat.resource.toString();
        }
        return undefined;
    }
    FileStatNode.getUri = getUri;
})(FileStatNode = exports.FileStatNode || (exports.FileStatNode = {}));
var FileStatNodeData;
(function (FileStatNodeData) {
    function is(node) {
        return !!node && 'uri' in node && ('fileStat' in node || 'stat' in node);
    }
    FileStatNodeData.is = is;
})(FileStatNodeData = exports.FileStatNodeData || (exports.FileStatNodeData = {}));
var FileNode;
(function (FileNode) {
    function is(node) {
        return FileStatNode.is(node) && !node.fileStat.isDirectory;
    }
    FileNode.is = is;
})(FileNode = exports.FileNode || (exports.FileNode = {}));
var DirNode;
(function (DirNode) {
    function is(node) {
        return FileStatNode.is(node) && node.fileStat.isDirectory;
    }
    DirNode.is = is;
    function compare(node, node2) {
        return DirNode.dirCompare(node, node2) || uriCompare(node, node2);
    }
    DirNode.compare = compare;
    function uriCompare(node, node2) {
        if (FileStatNode.is(node)) {
            if (FileStatNode.is(node2)) {
                return node.uri.displayName.localeCompare(node2.uri.displayName);
            }
            return 1;
        }
        if (FileStatNode.is(node2)) {
            return -1;
        }
        return 0;
    }
    DirNode.uriCompare = uriCompare;
    function dirCompare(node, node2) {
        var a = DirNode.is(node) ? 1 : 0;
        var b = DirNode.is(node2) ? 1 : 0;
        return b - a;
    }
    DirNode.dirCompare = dirCompare;
    function createRoot(fileStat) {
        var uri = fileStat.resource;
        var id = uri.toString();
        return {
            id: id, uri: uri, fileStat: fileStat,
            visible: true,
            parent: undefined,
            children: [],
            expanded: true,
            selected: false
        };
    }
    DirNode.createRoot = createRoot;
    function getContainingDir(node) {
        var containing = node;
        while (!!containing && !is(containing)) {
            containing = containing.parent;
        }
        return containing;
    }
    DirNode.getContainingDir = getContainingDir;
})(DirNode = exports.DirNode || (exports.DirNode = {}));
//# sourceMappingURL=file-tree.js.map