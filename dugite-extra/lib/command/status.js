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
var status_parser_1 = require("../parser/status-parser");
var diff_1 = require("../model/diff");
var status_1 = require("../model/status");
function convertToAppStatus(status) {
    if (status.kind === 'ordinary') {
        switch (status.type) {
            case 'added':
                return status_1.AppFileStatus.New;
            case 'modified':
                return status_1.AppFileStatus.Modified;
            case 'deleted':
                return status_1.AppFileStatus.Deleted;
        }
    }
    else if (status.kind === 'copied') {
        return status_1.AppFileStatus.Copied;
    }
    else if (status.kind === 'renamed') {
        return status_1.AppFileStatus.Renamed;
    }
    else if (status.kind === 'conflicted') {
        return status_1.AppFileStatus.Conflicted;
    }
    else if (status.kind === 'untracked') {
        return status_1.AppFileStatus.New;
    }
    throw new Error("Unknown file status " + status);
}
// See: https://git-scm.com/docs/git-status#_short_format
function isChangeInIndex(statusCode) {
    var index = statusCode.charAt(0);
    return index === 'M' || index === 'A' || index === 'D' || index === 'U' || index === 'R' || index === 'C';
}
function isChangeInWorkTree(statusCode) {
    var _a = __read(statusCode, 2), workingTree = _a[1];
    return workingTree === 'M' || workingTree === 'A' || workingTree === 'D' || workingTree === 'U';
}
/**
 *  Retrieve the status for a given repository,
 *  and fail gracefully if the location is not a Git repository
 */
function getStatus(repositoryPath, noOptionalLocks, limit, options) {
    if (noOptionalLocks === void 0) { noOptionalLocks = true; }
    if (limit === void 0) { limit = Number.MAX_SAFE_INTEGER; }
    return __awaiter(this, void 0, void 0, function () {
        var args, version, canUseNoOptionalLocks, e_1, parsed, _a, rawMajor, rawMinor, major, minor, result, files, existingFiles, currentBranch, currentUpstreamBranch, currentTip, branchAheadBehind, _b, entries, incomplete, _loop_1, entries_1, entries_1_1, entry, workingDirectory;
        var e_2, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    args = [];
                    if (!noOptionalLocks) return [3 /*break*/, 6];
                    if (!(typeof process.env.GIT__CAN_USE_NO_OPTIONAL_LOCKS === 'undefined')) return [3 /*break*/, 5];
                    console.info("Checking whether '--no-optional-locks' can be used with the current Git executable. Minimum required version is '2.15.0'.");
                    version = void 0;
                    canUseNoOptionalLocks = false;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, git_1.gitVersion(options)];
                case 2:
                    version = _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _d.sent();
                    console.error('Error ocurred when determining the Git version.', e_1);
                    return [3 /*break*/, 4];
                case 4:
                    if (!version) {
                        console.warn("Cannot determine the Git version. Disabling '--no-optional-locks' for all subsequent calls.");
                    }
                    else {
                        parsed = version.replace(/^git version /, '');
                        _a = __read(parsed.split('.'), 2), rawMajor = _a[0], rawMinor = _a[1];
                        if (rawMajor && rawMinor) {
                            major = parseInt(rawMajor, 10);
                            minor = parseInt(rawMinor, 10);
                            if (Number.isInteger(major) && Number.isInteger(minor)) {
                                canUseNoOptionalLocks = major >= 2 && minor >= 15;
                            }
                        }
                        if (!canUseNoOptionalLocks) {
                            console.warn("Git version was: '" + parsed + "'. Disabling '--no-optional-locks' for all subsequent calls.");
                        }
                        else {
                            console.info("'--no-optional-locks' is a valid Git option for the current Git version: '" + parsed + "'.");
                        }
                    }
                    process.env.GIT__CAN_USE_NO_OPTIONAL_LOCKS = "" + canUseNoOptionalLocks;
                    _d.label = 5;
                case 5:
                    if (process.env.GIT__CAN_USE_NO_OPTIONAL_LOCKS === 'true') {
                        args.push('--no-optional-locks');
                    }
                    _d.label = 6;
                case 6:
                    args.push('status', '--untracked-files=all', '--branch', '--porcelain=2', '-z');
                    return [4 /*yield*/, git_1.git(args, repositoryPath, 'getStatus', options)];
                case 7:
                    result = _d.sent();
                    files = new Array();
                    existingFiles = new Set();
                    currentBranch = undefined;
                    currentUpstreamBranch = undefined;
                    currentTip = undefined;
                    branchAheadBehind = undefined;
                    _b = status_parser_1.parsePorcelainStatus(result.stdout, limit), entries = _b.entries, incomplete = _b.incomplete;
                    _loop_1 = function (entry) {
                        if (entry.kind === 'entry') {
                            var status = status_parser_1.mapStatus(entry.statusCode);
                            if (status.kind === 'ordinary') {
                                // when a file is added in the index but then removed in the working
                                // directory, the file won't be part of the commit, so we can skip
                                // displaying this entry in the changes list
                                if (status.index === status_1.GitStatusEntry.Added &&
                                    status.workingTree === status_1.GitStatusEntry.Deleted) {
                                    return "continue";
                                }
                            }
                            if (status.kind === 'untracked') {
                                // when a delete has been staged, but an untracked file exists with the
                                // same path, we should ensure that we only draw one entry in the
                                // changes list - see if an entry already exists for this path and
                                // remove it if found
                                if (existingFiles.has(entry.path)) {
                                    var existingEntry = files.findIndex(function (p) { return p.path === entry.path; });
                                    if (existingEntry > -1) {
                                        files.splice(existingEntry, 1);
                                    }
                                }
                            }
                            // for now we just poke at the existing summary
                            var summary = convertToAppStatus(status);
                            var selection = diff_1.DiffSelection.fromInitialSelection(diff_1.DiffSelectionType.All);
                            var changeInIndex = isChangeInIndex(entry.statusCode);
                            var changeInWorkingTree = isChangeInWorkTree(entry.statusCode);
                            if (changeInIndex) {
                                files.push(new status_1.WorkingDirectoryFileChange(entry.path, summary, selection, entry.oldPath, true));
                                existingFiles.add(entry.path);
                            }
                            if (changeInWorkingTree) {
                                files.push(new status_1.WorkingDirectoryFileChange(entry.path, summary, selection, entry.oldPath, false));
                                existingFiles.add(entry.path);
                            }
                            // Must be untracked
                            if (!changeInIndex && !changeInWorkingTree) {
                                files.push(new status_1.WorkingDirectoryFileChange(entry.path, summary, selection, entry.oldPath, false));
                                existingFiles.add(entry.path);
                            }
                        }
                        else if (entry.kind === 'header') {
                            var m = void 0;
                            var value = entry.value;
                            // This intentionally does not match branch.oid initial
                            if ((m = value.match(/^branch\.oid ([a-f0-9]+)$/))) {
                                currentTip = m[1];
                            }
                            else if ((m = value.match(/^branch.head (.*)/))) {
                                if (m[1] !== '(detached)') {
                                    currentBranch = m[1];
                                }
                            }
                            else if ((m = value.match(/^branch.upstream (.*)/))) {
                                currentUpstreamBranch = m[1];
                            }
                            else if ((m = value.match(/^branch.ab \+(\d+) -(\d+)$/))) {
                                var ahead = parseInt(m[1], 10);
                                var behind = parseInt(m[2], 10);
                                if (!isNaN(ahead) && !isNaN(behind)) {
                                    branchAheadBehind = { ahead: ahead, behind: behind };
                                }
                            }
                        }
                    };
                    try {
                        for (entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                            entry = entries_1_1.value;
                            _loop_1(entry);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (entries_1_1 && !entries_1_1.done && (_c = entries_1.return)) _c.call(entries_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    workingDirectory = new status_1.WorkingDirectoryStatus(files, true);
                    return [2 /*return*/, {
                            currentBranch: currentBranch,
                            currentTip: currentTip,
                            currentUpstreamBranch: currentUpstreamBranch,
                            branchAheadBehind: branchAheadBehind,
                            exists: true,
                            workingDirectory: workingDirectory,
                            incomplete: incomplete
                        }];
            }
        });
    });
}
exports.getStatus = getStatus;
//# sourceMappingURL=status.js.map