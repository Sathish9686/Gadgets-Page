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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var git_1 = require("../core/git");
var diff_1 = require("../model/diff");
var apply_1 = require("./apply");
var status_1 = require("../model/status");
/**
 * Updates the index with file contents from the working tree.
 *
 * @param paths   A list of paths which are to be updated with file contents and
 *                status from the working directory.
 *
 * @param options See the IUpdateIndexOptions interface for more details.
 */
function updateIndex(repositoryPath, paths, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var args;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!paths.length) {
                        return [2 /*return*/];
                    }
                    args = ['update-index'];
                    if (options.add !== false) {
                        args.push('--add');
                    }
                    if (options.remove !== false || options.forceRemove === true) {
                        args.push('--remove');
                    }
                    if (options.forceRemove) {
                        args.push('--force-remove');
                    }
                    if (options.replace !== false) {
                        args.push('--replace');
                    }
                    args.push('-z', '--stdin');
                    return [4 /*yield*/, git_1.git(args, repositoryPath, 'updateIndex', { stdin: paths.join('\0') })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Stage all the given files by either staging the entire path or by applying
 * a patch.
 *
 * Note that prior to stageFiles the index has been completely reset,
 * the job of this function is to set up the index in such a way that it
 * reflects what the user has selected in the app.
 */
function stageFiles(repositoryPath, files) {
    return __awaiter(this, void 0, void 0, function () {
        var normal, oldRenamed, partial, files_1, files_1_1, file, partial_1, partial_1_1, file, e_1_1;
        var e_2, _a, e_1, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    normal = [];
                    oldRenamed = [];
                    partial = [];
                    try {
                        for (files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                            file = files_1_1.value;
                            if (file.selection.getSelectionType() === diff_1.DiffSelectionType.All) {
                                normal.push(file.path);
                                if (file.status === status_1.AppFileStatus.Renamed && file.oldPath) {
                                    oldRenamed.push(file.oldPath);
                                }
                            }
                            else {
                                partial.push(file);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    // Staging files happens in three steps.
                    //
                    // In the first step we run through all of the renamed files, or
                    // more specifically the source files (old) that were renamed and
                    // forcefully remove them from the index. We do this in order to handle
                    // the scenario where a file has been renamed and a new file has been
                    // created in its original position. Think of it like this
                    //
                    // $ touch foo && git add foo && git commit -m 'foo'
                    // $ git mv foo bar
                    // $ echo "I'm a new foo" > foo
                    //
                    // Now we have a file which is of type Renamed that has its path set
                    // to 'bar' and its oldPath set to 'foo'. But there's a new file called
                    // foo in the repository. So if the user selects the 'foo -> bar' change
                    // but not the new 'foo' file for inclusion in this commit we don't
                    // want to add the new 'foo', we just want to recreate the move in the
                    // index. We do this by forcefully removing the old path from the index
                    // and then later (in step 2) stage the new file.
                    return [4 /*yield*/, updateIndex(repositoryPath, oldRenamed, { forceRemove: true })];
                case 1:
                    // Staging files happens in three steps.
                    //
                    // In the first step we run through all of the renamed files, or
                    // more specifically the source files (old) that were renamed and
                    // forcefully remove them from the index. We do this in order to handle
                    // the scenario where a file has been renamed and a new file has been
                    // created in its original position. Think of it like this
                    //
                    // $ touch foo && git add foo && git commit -m 'foo'
                    // $ git mv foo bar
                    // $ echo "I'm a new foo" > foo
                    //
                    // Now we have a file which is of type Renamed that has its path set
                    // to 'bar' and its oldPath set to 'foo'. But there's a new file called
                    // foo in the repository. So if the user selects the 'foo -> bar' change
                    // but not the new 'foo' file for inclusion in this commit we don't
                    // want to add the new 'foo', we just want to recreate the move in the
                    // index. We do this by forcefully removing the old path from the index
                    // and then later (in step 2) stage the new file.
                    _c.sent();
                    // In the second step we update the index to match
                    // the working directory in the case of new, modified, deleted,
                    // and copied files as well as the destination paths for renamed
                    // paths.
                    return [4 /*yield*/, updateIndex(repositoryPath, normal)];
                case 2:
                    // In the second step we update the index to match
                    // the working directory in the case of new, modified, deleted,
                    // and copied files as well as the destination paths for renamed
                    // paths.
                    _c.sent();
                    if (!partial.length) return [3 /*break*/, 10];
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 8, 9, 10]);
                    partial_1 = __values(partial), partial_1_1 = partial_1.next();
                    _c.label = 4;
                case 4:
                    if (!!partial_1_1.done) return [3 /*break*/, 7];
                    file = partial_1_1.value;
                    return [4 /*yield*/, apply_1.applyPatchToIndex(repositoryPath, file)];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    partial_1_1 = partial_1.next();
                    return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_1_1 = _c.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (partial_1_1 && !partial_1_1.done && (_b = partial_1.return)) _b.call(partial_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.stageFiles = stageFiles;
//# sourceMappingURL=update-index.js.map