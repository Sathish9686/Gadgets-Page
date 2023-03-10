/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
import { createDecorator } from '../../instantiation/common/instantiation';
import { Emitter } from '../../../base/common/event';
import { Disposable } from '../../../base/common/lifecycle';
import { isUndefinedOrNull } from '../../../base/common/types';
export var IStorageService = createDecorator('storageService');
export var WillSaveStateReason;
(function (WillSaveStateReason) {
    WillSaveStateReason[WillSaveStateReason["NONE"] = 0] = "NONE";
    WillSaveStateReason[WillSaveStateReason["SHUTDOWN"] = 1] = "SHUTDOWN";
})(WillSaveStateReason || (WillSaveStateReason = {}));
var InMemoryStorageService = /** @class */ (function (_super) {
    __extends(InMemoryStorageService, _super);
    function InMemoryStorageService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onDidChangeStorage = _this._register(new Emitter());
        _this.onDidChangeStorage = _this._onDidChangeStorage.event;
        _this._onWillSaveState = _this._register(new Emitter());
        _this.onWillSaveState = _this._onWillSaveState.event;
        _this.globalCache = new Map();
        _this.workspaceCache = new Map();
        return _this;
    }
    InMemoryStorageService.prototype.getCache = function (scope) {
        return scope === 0 /* GLOBAL */ ? this.globalCache : this.workspaceCache;
    };
    InMemoryStorageService.prototype.get = function (key, scope, fallbackValue) {
        var value = this.getCache(scope).get(key);
        if (isUndefinedOrNull(value)) {
            return fallbackValue;
        }
        return value;
    };
    InMemoryStorageService.prototype.getBoolean = function (key, scope, fallbackValue) {
        var value = this.getCache(scope).get(key);
        if (isUndefinedOrNull(value)) {
            return fallbackValue;
        }
        return value === 'true';
    };
    InMemoryStorageService.prototype.getNumber = function (key, scope, fallbackValue) {
        var value = this.getCache(scope).get(key);
        if (isUndefinedOrNull(value)) {
            return fallbackValue;
        }
        return parseInt(value, 10);
    };
    InMemoryStorageService.prototype.store = function (key, value, scope) {
        // We remove the key for undefined/null values
        if (isUndefinedOrNull(value)) {
            return this.remove(key, scope);
        }
        // Otherwise, convert to String and store
        var valueStr = String(value);
        // Return early if value already set
        var currentValue = this.getCache(scope).get(key);
        if (currentValue === valueStr) {
            return Promise.resolve();
        }
        // Update in cache
        this.getCache(scope).set(key, valueStr);
        // Events
        this._onDidChangeStorage.fire({ scope: scope, key: key });
        return Promise.resolve();
    };
    InMemoryStorageService.prototype.remove = function (key, scope) {
        var wasDeleted = this.getCache(scope).delete(key);
        if (!wasDeleted) {
            return Promise.resolve(); // Return early if value already deleted
        }
        // Events
        this._onDidChangeStorage.fire({ scope: scope, key: key });
        return Promise.resolve();
    };
    InMemoryStorageService.prototype.logStorage = function () {
        logStorage(this.globalCache, this.workspaceCache, 'inMemory', 'inMemory');
    };
    InMemoryStorageService.prototype.migrate = function (toWorkspace) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    InMemoryStorageService.prototype.flush = function () {
        this._onWillSaveState.fire({ reason: WillSaveStateReason.NONE });
    };
    return InMemoryStorageService;
}(Disposable));
export { InMemoryStorageService };
export function logStorage(global, workspace, globalPath, workspacePath) {
    return __awaiter(this, void 0, void 0, function () {
        var safeParse, globalItems, globalItemsParsed, workspaceItems, workspaceItemsParsed, globalValues, workspaceValues;
        return __generator(this, function (_a) {
            safeParse = function (value) {
                try {
                    return JSON.parse(value);
                }
                catch (error) {
                    return value;
                }
            };
            globalItems = new Map();
            globalItemsParsed = new Map();
            global.forEach(function (value, key) {
                globalItems.set(key, value);
                globalItemsParsed.set(key, safeParse(value));
            });
            workspaceItems = new Map();
            workspaceItemsParsed = new Map();
            workspace.forEach(function (value, key) {
                workspaceItems.set(key, value);
                workspaceItemsParsed.set(key, safeParse(value));
            });
            console.group("Storage: Global (path: " + globalPath + ")");
            globalValues = [];
            globalItems.forEach(function (value, key) {
                globalValues.push({ key: key, value: value });
            });
            console.table(globalValues);
            console.groupEnd();
            console.log(globalItemsParsed);
            console.group("Storage: Workspace (path: " + workspacePath + ")");
            workspaceValues = [];
            workspaceItems.forEach(function (value, key) {
                workspaceValues.push({ key: key, value: value });
            });
            console.table(workspaceValues);
            console.groupEnd();
            console.log(workspaceItemsParsed);
            return [2 /*return*/];
        });
    });
}
