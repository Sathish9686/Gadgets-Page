"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var git_1 = require("../core/git");
var status_1 = require("../model/status");
var diff_1 = require("../model/diff");
var diff_2 = require("./diff");
var patch_formatter_1 = require("../parser/patch-formatter");
function applyPatchToIndex(repositoryPath, file, options) {
    return __awaiter(this, void 0, void 0, function () {
        var oldFile, _a, info, _b, mode, oid, applyArgs, diff, opts, patch;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(file.status === status_1.AppFileStatus.Renamed && file.oldPath)) return [3 /*break*/, 4];
                    // Make sure the index knows of the removed file. We could use
                    // update-index --force-remove here but we're not since it's
                    // possible that someone staged a rename and then recreated the
                    // original file and we don't have any guarantees for in which order
                    // partial stages vs full-file stages happen. By using git add the
                    // worst that could happen is that we re-stage a file already staged
                    // by updateIndex.
                    return [4 /*yield*/, git_1.git(['add', '--u', '--', file.oldPath], repositoryPath, 'applyPatchToIndex')];
                case 1:
                    // Make sure the index knows of the removed file. We could use
                    // update-index --force-remove here but we're not since it's
                    // possible that someone staged a rename and then recreated the
                    // original file and we don't have any guarantees for in which order
                    // partial stages vs full-file stages happen. By using git add the
                    // worst that could happen is that we re-stage a file already staged
                    // by updateIndex.
                    _c.sent();
                    return [4 /*yield*/, git_1.git(['ls-tree', 'HEAD', '--', file.oldPath], repositoryPath, 'applyPatchToIndex')];
                case 2:
                    oldFile = _c.sent();
                    _a = __read(oldFile.stdout.split('\t', 1), 1), info = _a[0];
                    _b = __read(info.split(' ', 3), 3), mode = _b[0], oid = _b[2];
                    // Add the old file blob to the index under the new name
                    return [4 /*yield*/, git_1.git(['update-index', '--add', '--cacheinfo', mode, oid, file.path], repositoryPath, 'applyPatchToIndex', options)];
                case 3:
                    // Add the old file blob to the index under the new name
                    _c.sent();
                    _c.label = 4;
                case 4:
                    applyArgs = ['apply', '--cached', '--unidiff-zero', '--whitespace=nowarn', '-'];
                    return [4 /*yield*/, diff_2.getWorkingDirectoryDiff(repositoryPath, file)];
                case 5:
                    diff = _c.sent();
                    if (diff.kind !== diff_1.DiffType.Text) {
                        throw new Error("Unexpected diff result returned: '" + diff.kind + "'");
                    }
                    opts = {};
                    if (options) {
                        opts = __assign({}, options);
                    }
                    return [4 /*yield*/, patch_formatter_1.formatPatch(file, diff)];
                case 6:
                    patch = _c.sent();
                    opts = __assign({}, opts, { stdin: patch });
                    return [4 /*yield*/, git_1.git(applyArgs, repositoryPath, 'applyPatchToIndex', opts)];
                case 7:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.applyPatchToIndex = applyPatchToIndex;
//# sourceMappingURL=apply.js.map