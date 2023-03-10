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
Object.defineProperty(exports, "__esModule", { value: true });
var git_1 = require("../core/git");
var progress_1 = require("../progress");
/**
 * Pull from the specified remote.
 *
 * @param repository - The repository in which the pull should take place
 *
 * @param remote     - The name of the remote that should be pulled from
 *
 * @param branch     - The name of the branch to pull from. It is required when pulling from a remote which is
 *                      not the default remote tracking of the currently active branch.
 *
 * @param progressCallback - An optional function which will be invoked
 *                           with information about the current progress
 *                           of the pull operation. When provided this enables
 *                           the '--progress' command line flag for
 *                           'git pull'.
 */
function pull(repositoryPath, remote, branch, options, progressCallback) {
    return __awaiter(this, void 0, void 0, function () {
        var opts, title_1, kind_1, args, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    opts = {};
                    if (options) {
                        opts = __assign({}, opts, options);
                    }
                    if (progressCallback) {
                        title_1 = "Pulling " + remote;
                        kind_1 = 'pull';
                        opts = progress_1.executionOptionsWithProgress(opts, new progress_1.PullProgressParser(), function (progress) {
                            // In addition to progress output from the remote end and from
                            // git itself, the stderr output from pull contains information
                            // about ref updates. We don't need to bring those into the progress
                            // stream so we'll just punt on anything we don't know about for now.
                            if (progress.kind === 'context') {
                                if (!progress.text.startsWith('remote: Counting objects')) {
                                    return;
                                }
                            }
                            var description = progress.kind === 'progress' ? progress.details.text : progress.text;
                            var value = progress.percent;
                            progressCallback({ kind: kind_1, title: title_1, description: description, value: value, remote: remote });
                        });
                        // Initial progress
                        progressCallback({ kind: kind_1, title: title_1, value: 0, remote: remote });
                    }
                    args = ['pull', remote];
                    if (branch) {
                        args.push(branch);
                    }
                    if (progressCallback) {
                        args.push('--progress');
                    }
                    return [4 /*yield*/, git_1.git(args, repositoryPath, 'pull', opts)];
                case 1:
                    result = _a.sent();
                    if (result.gitErrorDescription) {
                        throw new git_1.GitError(result, args);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.pull = pull;
//# sourceMappingURL=pull.js.map