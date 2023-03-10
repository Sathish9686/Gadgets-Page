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
var Path = require("path");
var git_1 = require("../core/git");
var progress_1 = require("../progress");
/**
 * Check out the given branch.
 *
 * @param repository - The repository in which the branch checkout should
 *                     take place
 *
 * @param name       - The branch name that should be checked out
 *
 * @param progressCallback - An optional function which will be invoked
 *                           with information about the current progress
 *                           of the checkout operation. When provided this
 *                           enables the '--progress' command line flag for
 *                           'git checkout'.
 */
function checkoutBranch(repositoryPath, name, options, progressCallback) {
    return __awaiter(this, void 0, void 0, function () {
        var processCallback, title_1, kind_1, targetBranch_1, args, opts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    processCallback = undefined;
                    if (progressCallback) {
                        title_1 = "Checking out branch " + name;
                        kind_1 = 'checkout';
                        targetBranch_1 = name;
                        processCallback = progress_1.progressProcessCallback(new progress_1.CheckoutProgressParser(), function (progress) {
                            if (progress.kind === 'progress') {
                                var description = progress.details.text;
                                var value = progress.percent;
                                progressCallback({ kind: kind_1, title: title_1, description: description, value: value, targetBranch: targetBranch_1 });
                            }
                        });
                        // Initial progress
                        progressCallback({ kind: kind_1, title: title_1, value: 0, targetBranch: targetBranch_1 });
                    }
                    args = processCallback
                        ? ['checkout', '--progress', name, '--']
                        : ['checkout', name, '--'];
                    opts = __assign({}, options, { processCallback: processCallback });
                    return [4 /*yield*/, git_1.git(args, repositoryPath, 'checkoutBranch', opts)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.checkoutBranch = checkoutBranch;
/** Check out the paths at HEAD. */
function checkoutPaths(repositoryPath, paths, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkout(repositoryPath, paths, 'HEAD', false, false, options)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.checkoutPaths = checkoutPaths;
/**
 * Reverts the state of the file to the specified one.
 *
 * @param repositoryPath the local Git clone or its FS path.
 * @param paths the absolute file paths of the resources that have to be checked out.
 * @param treeish the commit SHA to check out. If not given, `HEAD` will be checked out.
 * @param merge when checking out paths from the index, this option lets you recreate the conflicted merge in the specified paths.
 * @param force when checking out paths from the index, do not fail upon unmerged entries; instead, unmerged entries are ignored.
 */
function checkout(repositoryPath, paths, commitSHA, merge, force, options) {
    return __awaiter(this, void 0, void 0, function () {
        var args;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    args = ['checkout'];
                    if (commitSHA) {
                        args.push(commitSHA);
                    }
                    if (merge) {
                        args.push('-m');
                    }
                    if (force) {
                        args.push('-f');
                    }
                    args.push('--');
                    args.push.apply(args, __spread(paths.map(function (p) { return Path.relative(repositoryPath, p); })));
                    return [4 /*yield*/, git_1.git(args, repositoryPath, 'checkoutPaths', options)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.checkout = checkout;
//# sourceMappingURL=checkout.js.map