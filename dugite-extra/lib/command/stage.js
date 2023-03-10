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
var path = require("path");
var git_1 = require("../core/git");
var status_1 = require("./status");
/**
 * Add the given files to the index, stages the files.
 *
 * @param repository the repository path to the local Git clone.
 * @param filePaths the absolute FS path of the files to stage. If not specified, or an empty array, the it stages all changes.
 */
function stage(repositoryPath, filePaths, options) {
    return __awaiter(this, void 0, void 0, function () {
        var paths;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    paths = [];
                    if (filePaths === undefined || (Array.isArray(filePaths) && filePaths.length === 0)) {
                        paths.push('.');
                    }
                    else {
                        paths.push.apply(paths, __spread((Array.isArray(filePaths) ? filePaths : [filePaths]).map(function (f) { return path.relative(repositoryPath, f); })));
                    }
                    return [4 /*yield*/, git_1.git(__spread(['add'], paths), repositoryPath, 'stage', options)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.stage = stage;
/**
 * Removes the given files from the index. In other words, unstages the files.
 *
 * @param repository the repository path to the local Git clone.
 * @param filePaths the absolute FS path of the files to unstage. If not specified, or an empty array, is resets everything.
 * @param treeish the treeish to reset to. If not specified, then `HEAD` will be used.
 * @param where `index` to reset the index state, `working-tree` to reset the working tree but keep the index state. `all` to perform a hard reset. `all` be default.
 */
function unstage(repositoryPath, filePaths, treeish, where, options) {
    if (filePaths === void 0) { filePaths = []; }
    if (treeish === void 0) { treeish = 'HEAD'; }
    if (where === void 0) { where = 'all'; }
    return __awaiter(this, void 0, void 0, function () {
        var _treeish, _where, branch, args, paths;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _treeish = treeish || 'HEAD';
                    _where = where || 'all';
                    return [4 /*yield*/, git_1.git(['branch'], repositoryPath, 'branch', options)];
                case 1:
                    branch = _a.sent();
                    args = [];
                    // Detached HEAD.
                    if (!branch.stdout.trim()) {
                        args.push.apply(args, __spread(['rm', '--cached', '-r', '--']));
                    }
                    else {
                        if (_where === 'working-tree') {
                            args.push.apply(args, __spread(['checkout-index', '-f', '-u']));
                        }
                        else {
                            args.push('reset');
                            if (_where === 'index') {
                                args.push('-q');
                            }
                        }
                        args.push.apply(args, __spread([_treeish, '--']));
                    }
                    paths = [];
                    if (filePaths === undefined || (Array.isArray(filePaths) && filePaths.length === 0)) {
                        paths.push('.');
                    }
                    else {
                        paths.push.apply(paths, __spread((Array.isArray(filePaths) ? filePaths : [filePaths]).map(function (f) { return path.relative(repositoryPath, f); })));
                    }
                    args.push.apply(args, __spread(paths));
                    return [4 /*yield*/, git_1.git(args, repositoryPath, 'unstage', options)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.unstage = unstage;
/**
 * Returns with a list of all staged files from the repository.
 *
 * @param repository the repository or its FS path to get the staged files from.
 */
function getStagedFiles(repositoryPath, options) {
    return __awaiter(this, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, status_1.getStatus(repositoryPath, true, Number.MIN_SAFE_INTEGER, options)];
                case 1:
                    status = _a.sent();
                    return [2 /*return*/, status.workingDirectory.files.filter(function (f) { return f.staged; })];
            }
        });
    });
}
exports.getStagedFiles = getStagedFiles;
//# sourceMappingURL=stage.js.map