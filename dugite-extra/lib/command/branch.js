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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var git_1 = require("../core/git");
var branch_1 = require("../model/branch");
var commit_identity_1 = require("../model/commit-identity");
var delimiter = '1F';
var delimiterString = String.fromCharCode(parseInt(delimiter, 16));
var forEachRefFormat = [
    '%(refname)',
    '%(refname:short)',
    '%(upstream:short)',
    '%(objectname)',
    '%(author)',
    '%(parent)',
    '%(subject)',
    '%(body)',
    "%" + delimiter,
].join('%00');
function listBranch(repositoryPath, type, options) {
    return __awaiter(this, void 0, void 0, function () {
        var opts, result, exitCode, name, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(type === 'current')) return [3 /*break*/, 3];
                    opts = {};
                    if (options) {
                        opts = __assign({}, options);
                    }
                    opts = __assign({}, opts, { successExitCodes: new Set([0, 1, 128]) });
                    return [4 /*yield*/, git_1.git(['rev-parse', '--abbrev-ref', 'HEAD'], repositoryPath, 'getCurrentBranch', opts)];
                case 1:
                    result = _a.sent();
                    exitCode = result.exitCode;
                    // If the error code 1 is returned if no upstream.
                    // If the error code 128 is returned if the branch is unborn.
                    if (exitCode === 1 || exitCode === 128) {
                        return [2 /*return*/, undefined];
                    }
                    name = result.stdout.trim().replace(/^heads\//, '');
                    return [4 /*yield*/, getBranches(repositoryPath, ["refs/heads/" + name], options)];
                case 2: return [2 /*return*/, (_a.sent()).shift()];
                case 3: return [4 /*yield*/, getBranches(repositoryPath, [], options)];
                case 4:
                    result = _a.sent();
                    switch (type) {
                        case 'local': return [2 /*return*/, result.filter(function (branch) { return branch.type === branch_1.BranchType.Local; })];
                        case 'remote': return [2 /*return*/, result.filter(function (branch) { return branch.type === branch_1.BranchType.Remote; })];
                        case 'all': return [2 /*return*/, result];
                        default: throw new Error("Unhandled type: " + type + ".");
                    }
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.listBranch = listBranch;
function createBranch(repositoryPath, name, createOptions, options) {
    return __awaiter(this, void 0, void 0, function () {
        var startPoint, checkout, args;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startPoint = createOptions ? createOptions.startPoint : undefined;
                    checkout = createOptions ? createOptions.checkout : false;
                    args = checkout ? ['checkout', '-b', name] : ['branch', name];
                    if (startPoint) {
                        args.push(startPoint);
                    }
                    return [4 /*yield*/, git_1.git(args, repositoryPath, 'createBranch', options)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createBranch = createBranch;
function renameBranch(repositoryPath, name, newName, renameOptions, options) {
    return __awaiter(this, void 0, void 0, function () {
        var force, args;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    force = renameOptions ? renameOptions.force : false;
                    args = ['branch', "" + (force ? '-M' : '-m'), name, newName];
                    return [4 /*yield*/, git_1.git(args, repositoryPath, 'renameBranch', options)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.renameBranch = renameBranch;
function deleteBranch(repositoryPath, name, deleteOptions, options) {
    return __awaiter(this, void 0, void 0, function () {
        var force, remote, args, branches, _a, branch;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    force = deleteOptions ? deleteOptions.force : false;
                    remote = deleteOptions ? deleteOptions.remote : false;
                    args = ['branch', "" + (force ? '-D' : '-d'), "" + name];
                    if (!remote) return [3 /*break*/, 2];
                    return [4 /*yield*/, getBranches(repositoryPath, [], options)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = [];
                    _b.label = 3;
                case 3:
                    branches = _a;
                    return [4 /*yield*/, git_1.git(args, repositoryPath, 'deleteBranch', options)];
                case 4:
                    _b.sent();
                    if (!(remote && branches && branches.length)) return [3 /*break*/, 6];
                    branch = branches.find(function (branch) { return branch.name.replace(/^heads\//, '') === name; });
                    if (!(branch && branch.remote)) return [3 /*break*/, 6];
                    // Push the remote deletion.
                    return [4 /*yield*/, git_1.git(['push', branch.remote, ":" + branch.upstreamWithoutRemote], repositoryPath, 'deleteRemoteBranch', options)];
                case 5:
                    // Push the remote deletion.
                    _b.sent();
                    _b.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.deleteBranch = deleteBranch;
function getBranches(repositoryPath, prefixes, options) {
    return __awaiter(this, void 0, void 0, function () {
        var args, result, names, lines;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!prefixes || !prefixes.length) {
                        prefixes = ['refs/heads', 'refs/remotes'];
                    }
                    args = __spread(['for-each-ref', "--format=" + forEachRefFormat, '--sort=-committerdate'], prefixes);
                    return [4 /*yield*/, git_1.git(args, repositoryPath, 'getBranches', options)];
                case 1:
                    result = _a.sent();
                    names = result.stdout;
                    lines = names.split(delimiterString);
                    // Remove the trailing newline.
                    lines.splice(-1, 1);
                    return [2 /*return*/, lines.map(function (line, ix) {
                            // Preceding newline character after first row.
                            var pieces = (ix > 0 ? line.substr(1) : line).split('\0');
                            var ref = pieces[0];
                            var name = pieces[1];
                            var upstream = pieces[2];
                            var sha = pieces[3];
                            var authorIdentity = pieces[4];
                            var author = commit_identity_1.CommitIdentity.parseIdentity(authorIdentity);
                            if (!author) {
                                throw new Error("Couldn't parse author identity " + authorIdentity + ".");
                            }
                            var parentSHAs = pieces[5].split(' ');
                            var summary = pieces[6];
                            var body = pieces[7];
                            var tip = { sha: sha, summary: summary, body: body, author: author, parentSHAs: parentSHAs };
                            var type = ref.startsWith('refs/head') ? branch_1.BranchType.Local : branch_1.BranchType.Remote;
                            return new branch_1.Branch(name, upstream.length > 0 ? upstream : undefined, tip, type);
                        })];
            }
        });
    });
}
//# sourceMappingURL=branch.js.map