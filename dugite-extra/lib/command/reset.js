"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var git_1 = require("../core/git");
function resetModeToFlag(mode) {
    switch (mode) {
        case 0 /* Hard */:
            return '--hard';
        case 2 /* Mixed */:
            return '--mixed';
        case 1 /* Soft */:
            return '--soft';
        default:
            throw new Error("Unknown reset mode: " + mode);
    }
}
/** Reset with the mode to the ref. */
function reset(repositoryPath, mode, ref, options) {
    return __awaiter(this, void 0, void 0, function () {
        var modeFlag;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    modeFlag = resetModeToFlag(mode);
                    return [4 /*yield*/, git_1.git(['reset', modeFlag, ref, '--'], repositoryPath, 'reset', options)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.reset = reset;
/**
 * Updates the index with information from a particular tree for a given
 * set of paths.
 *
 * @param repository The repository in which to reset the index.
 *
 * @param mode      Which mode to use when resetting, see the GitResetMode
 *                  enum for more information.
 *
 * @param ref       A string which resolves to a tree, for example 'HEAD' or a
 *                  commit sha.
 *
 * @param paths     The paths that should be updated in the index with information
 *                  from the given tree
 */
function resetPaths(repositoryPath, mode, ref, paths, options) {
    return __awaiter(this, void 0, void 0, function () {
        var modeFlag;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!paths.length) {
                        return [2 /*return*/];
                    }
                    modeFlag = resetModeToFlag(mode);
                    return [4 /*yield*/, git_1.git(__spread(['reset', modeFlag, ref, '--'], paths), repositoryPath, 'reset', options)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.resetPaths = resetPaths;
/** Unstage all paths. */
function unstageAll(repositoryPath, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, git_1.git(['reset', '--', '.'], repositoryPath, 'unstageAll', options)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.unstageAll = unstageAll;
//# sourceMappingURL=reset.js.map