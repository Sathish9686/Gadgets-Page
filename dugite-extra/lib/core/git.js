"use strict";
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
var fs = require("fs");
var Path = require("path");
var find_git_exec_1 = require("find-git-exec");
var dugite_no_gpl_1 = require("dugite-no-gpl");
var find_git_exec_2 = require("find-git-exec");
// tslint:disable:max-line-length
var __GIT_PATH__ = { gitDir: undefined, gitExecPath: undefined, searched: false };
function getResultMessage(result) {
    var description = result.gitErrorDescription;
    if (description) {
        return description;
    }
    if (result.stderr.length) {
        return result.stderr;
    }
    else if (result.stdout.length) {
        return result.stdout;
    }
    else {
        return 'Unknown error';
    }
}
var GitError = /** @class */ (function (_super) {
    __extends(GitError, _super);
    function GitError(result, args) {
        var _this = _super.call(this, getResultMessage(result)) || this;
        _this.name = 'GitError';
        _this.result = result;
        _this.args = args;
        return _this;
    }
    return GitError;
}(Error));
exports.GitError = GitError;
function pathExists(path) {
    if (path === undefined) {
        return false;
    }
    try {
        fs.accessSync(path, fs.F_OK);
        return true;
    }
    catch (_a) {
        return false;
    }
}
/**
 * `path` is the `pwd` where the Git command gets executed.
 */
function gitExternal(args, path, options) {
    if (options.exec === undefined) {
        throw new Error("options.exec must be defined.");
    }
    // XXX: this is just to keep the original code from here https://github.com/desktop/dugite/blob/master/lib/git-process.ts#L172-L227
    var maxBuffer = options.maxBuffer ? options.maxBuffer : 10 * 1024 * 1024;
    var exec = options.exec;
    return new Promise(function (resolve, reject) {
        var stdin = undefined;
        if (options.stdin !== undefined) {
            if (typeof options.stdin === 'string') {
                stdin = options.stdin;
            }
            else {
                stdin = options.stdin.toString('utf8');
            }
        }
        exec(args, { cwd: path, stdin: stdin }, function (err, stdout, stderr) {
            if (!err) {
                resolve({ stdout: stdout, stderr: stderr, exitCode: 0 });
                return;
            }
            var errWithCode = err;
            var code = errWithCode.code;
            // If the error's code is a string then it means the code isn't the
            // process's exit code but rather an error coming from Node's bowels,
            // e.g., ENOENT.
            if (typeof code === 'string') {
                if (code === 'ENOENT') {
                    var message = err.message;
                    if (pathExists(process.env.LOCAL_GIT_DIRECTORY) === false) {
                        message = 'Unable to find path to repository on disk.';
                        code = dugite_no_gpl_1.RepositoryDoesNotExistErrorCode;
                    }
                    else {
                        message = "Git could not be found at the expected path: '" + process.env.LOCAL_GIT_DIRECTORY + "'. This might be a problem with how the application is packaged, so confirm this folder hasn't been removed when packaging.";
                        code = dugite_no_gpl_1.GitNotFoundErrorCode;
                    }
                    var error = new Error(message);
                    error.name = err.name;
                    error.code = code;
                    reject(error);
                }
                else {
                    reject(err);
                }
                return;
            }
            if (typeof code === 'number') {
                resolve({ stdout: stdout, stderr: stderr, exitCode: code });
                return;
            }
            // Git has returned an output that couldn't fit in the specified buffer
            // as we don't know how many bytes it requires, rethrow the error with
            // details about what it was previously set to...
            if (err.message === 'stdout maxBuffer exceeded') {
                reject(new Error("The output from the command could not fit into the allocated stdout buffer. Set options.maxBuffer to a larger value than " + maxBuffer + " bytes"));
            }
            else {
                reject(err);
            }
        });
    });
}
/**
 * Shell out to git with the given arguments, at the given path.
 *
 * @param {args}             The arguments to pass to `git`.
 *
 * @param {path}             The working directory path for the execution of the
 *                           command.
 *
 * @param {name}             The name for the command based on its caller's
 *                           context. This will be used for performance
 *                           measurements and debugging.
 *
 * @param {options}          Configuration options for the execution of git,
 *                           see IGitExecutionOptions for more information.
 *
 * Returns the result. If the command exits with a code not in
 * `successExitCodes` or an error not in `expectedErrors`, a `GitError` will be
 * thrown.
 */
function git(args, path, name, options) {
    return __awaiter(this, void 0, void 0, function () {
        var ssh, defaultOptions, opts, result, exitCode, gitError, acceptableExitCode, gitErrorDescription, gitResult, acceptableError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(process.env.GIT_OVER_SSH_TEST === 'true')) return [3 /*break*/, 2];
                    return [4 /*yield*/, setupSsh()];
                case 1:
                    ssh = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, , 9, 10]);
                    if (options
                        && options.exec
                        && (typeof process.env.LOCAL_GIT_PATH === 'undefined')) {
                        throw new Error('LOCAL_GIT_PATH must be specified when using an exec function.');
                    }
                    defaultOptions = {
                        successExitCodes: new Set([0]),
                        expectedErrors: new Set(),
                    };
                    opts = __assign({}, defaultOptions, options);
                    result = void 0;
                    if (!(options && options.exec)) return [3 /*break*/, 4];
                    return [4 /*yield*/, gitExternal(args, path, options)];
                case 3:
                    result = _a.sent();
                    return [3 /*break*/, 8];
                case 4: return [4 /*yield*/, initGitEnv()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, configureGitEnv()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, dugite_no_gpl_1.GitProcess.exec(args, path, options)];
                case 7:
                    result = _a.sent();
                    _a.label = 8;
                case 8:
                    exitCode = result.exitCode;
                    gitError = undefined;
                    acceptableExitCode = opts.successExitCodes ? opts.successExitCodes.has(exitCode) : false;
                    if (!acceptableExitCode) {
                        gitError = dugite_no_gpl_1.GitProcess.parseError(result.stderr) || undefined;
                        if (!gitError) {
                            gitError = dugite_no_gpl_1.GitProcess.parseError(result.stdout) || undefined;
                        }
                    }
                    gitErrorDescription = gitError ? getDescriptionForError(gitError) : undefined;
                    gitResult = __assign({}, result, { gitError: gitError, gitErrorDescription: gitErrorDescription });
                    acceptableError = true;
                    if (gitError && opts.expectedErrors) {
                        acceptableError = opts.expectedErrors.has(gitError);
                    }
                    if ((gitError && acceptableError) || acceptableExitCode) {
                        return [2 /*return*/, gitResult];
                    }
                    console.error("The command `git " + args.join(' ') + "` exited with an unexpected code: " + exitCode + ". The caller should either handle this error, or expect that exit code.");
                    if (result.stdout.length) {
                        console.error(result.stdout);
                    }
                    if (result.stderr.length) {
                        console.error(result.stderr);
                    }
                    if (gitError) {
                        console.error("(The error was parsed as " + gitError + ": " + gitErrorDescription + ")");
                    }
                    throw new GitError(gitResult, args);
                case 9:
                    if (ssh && 'dispose' in ssh && typeof ssh.dispose === 'function') {
                        ssh.dispose();
                    }
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.git = git;
function setupSsh(options) {
    return __awaiter(this, void 0, void 0, function () {
        var ssh, gitPath, SSH, exec;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (options === undefined) {
                        options = {};
                    }
                    return [4 /*yield*/, find_git_exec_2.default()];
                case 1:
                    gitPath = _a.sent();
                    if (typeof process.env.LOCAL_GIT_PATH === 'undefined') {
                        process.env.LOCAL_GIT_PATH = gitPath.path;
                    }
                    SSH = require('node-ssh');
                    return [4 /*yield*/, new SSH().connect({
                            host: process.env.GIT_OVER_SSH_TEST_HOST || 'localhost',
                            username: process.env.GIT_OVER_SSH_TEST_USERNAME || 'username',
                            password: process.env.GIT_OVER_SSH_TEST_PASSWORD || 'password',
                        })];
                case 2:
                    ssh = _a.sent();
                    exec = function (args, options, callback) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, stdout, stderr, code, error;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, ssh.execCommand(gitPath.path + " " + args.join(' '), { cwd: options.cwd, stdin: options.stdin })];
                                case 1:
                                    _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr, code = _a.code;
                                    error = null;
                                    if (code) {
                                        error = new Error(stderr || 'Unknown error.');
                                        error.code = code;
                                    }
                                    callback(error, stdout, stderr);
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    options.exec = exec;
                    return [2 /*return*/, ssh];
            }
        });
    });
}
function gitVersion(options) {
    return __awaiter(this, void 0, void 0, function () {
        var args, path, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    args = ['--version'];
                    path = '';
                    if (!(options && options.exec)) return [3 /*break*/, 2];
                    return [4 /*yield*/, gitExternal(args, path, options)];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 6];
                case 2: return [4 /*yield*/, initGitEnv()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, configureGitEnv()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, dugite_no_gpl_1.GitProcess.exec(args, path, options)];
                case 5:
                    result = _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/, (result.stdout || '').trim()];
            }
        });
    });
}
exports.gitVersion = gitVersion;
function initGitEnv() {
    return __awaiter(this, void 0, void 0, function () {
        var git_1, gitDir, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(process.env.USE_LOCAL_GIT === 'true' && !process.env.LOCAL_GIT_DIRECTORY && !process.env.GIT_EXEC_PATH && !__GIT_PATH__.searched)) return [3 /*break*/, 5];
                    console.log("'USE_LOCAL_GIT' is set to true. Trying to use local Git for 'dugite' execution.");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, find_git_exec_1.default()];
                case 2:
                    git_1 = _a.sent();
                    if (git_1 && git_1.path && git_1.execPath) {
                        gitDir = Path.dirname(Path.dirname(git_1.path));
                        if (fs.existsSync(gitDir) && fs.existsSync(git_1.execPath)) {
                            __GIT_PATH__.gitDir = gitDir;
                            __GIT_PATH__.gitExecPath = git_1.execPath;
                            console.log("Using external Git executable. Git path: " + git_1.path + ". Git exec-path: " + git_1.execPath + ". [Version: " + git_1.version + "]");
                        }
                        else {
                            throw new Error("Cannot find local Git executable: " + git_1 + ".");
                        }
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error("Cannot find local Git executable.", error_1);
                    __GIT_PATH__.gitDir = undefined;
                    __GIT_PATH__.gitExecPath = undefined;
                    return [3 /*break*/, 5];
                case 4:
                    __GIT_PATH__.searched = true;
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function configureGitEnv() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (process.env.USE_LOCAL_GIT === 'true'
                && !process.env.LOCAL_GIT_DIRECTORY
                && !process.env.GIT_EXEC_PATH
                && __GIT_PATH__.searched
                && __GIT_PATH__.gitDir
                && __GIT_PATH__.gitExecPath) {
                process.env.LOCAL_GIT_DIRECTORY = __GIT_PATH__.gitDir;
                process.env.GIT_EXEC_PATH = __GIT_PATH__.gitExecPath;
            }
            return [2 /*return*/];
        });
    });
}
function getDescriptionForError(error) {
    switch (error) {
        case dugite_no_gpl_1.GitError.SSHKeyAuditUnverified:
            return 'The SSH key is unverified.';
        case dugite_no_gpl_1.GitError.SSHAuthenticationFailed:
        case dugite_no_gpl_1.GitError.SSHPermissionDenied:
        case dugite_no_gpl_1.GitError.HTTPSAuthenticationFailed:
            return 'Authentication failed. You may not have permission to access the repository or the repository may have been archived.';
        case dugite_no_gpl_1.GitError.RemoteDisconnection:
            return 'The remote disconnected. Check your Internet connection and try again.';
        case dugite_no_gpl_1.GitError.HostDown:
            return 'The host is down. Check your Internet connection and try again.';
        case dugite_no_gpl_1.GitError.RebaseConflicts:
            return 'We found some conflicts while trying to rebase. Please resolve the conflicts before continuing.';
        case dugite_no_gpl_1.GitError.MergeConflicts:
            return 'We found some conflicts while trying to merge. Please resolve the conflicts and commit the changes.';
        case dugite_no_gpl_1.GitError.HTTPSRepositoryNotFound:
        case dugite_no_gpl_1.GitError.SSHRepositoryNotFound:
            return 'The repository does not seem to exist anymore. You may not have access, or it may have been deleted or renamed.';
        case dugite_no_gpl_1.GitError.PushNotFastForward:
            return 'The repository has been updated since you last pulled. Try pulling before pushing.';
        case dugite_no_gpl_1.GitError.BranchDeletionFailed:
            return 'Could not delete the branch. It was probably already deleted.';
        case dugite_no_gpl_1.GitError.DefaultBranchDeletionFailed:
            return "The branch is the repository's default branch and cannot be deleted.";
        case dugite_no_gpl_1.GitError.RevertConflicts:
            return 'To finish reverting, please merge and commit the changes.';
        case dugite_no_gpl_1.GitError.EmptyRebasePatch:
            return 'There aren???t any changes left to apply.';
        case dugite_no_gpl_1.GitError.NoMatchingRemoteBranch:
            return 'There aren???t any remote branches that match the current branch.';
        case dugite_no_gpl_1.GitError.NothingToCommit:
            return 'There are no changes to commit.';
        case dugite_no_gpl_1.GitError.NoSubmoduleMapping:
            return 'A submodule was removed from .gitmodules, but the folder still exists in the repository. Delete the folder, commit the change, then try again.';
        case dugite_no_gpl_1.GitError.SubmoduleRepositoryDoesNotExist:
            return 'A submodule points to a location which does not exist.';
        case dugite_no_gpl_1.GitError.InvalidSubmoduleSHA:
            return 'A submodule points to a commit which does not exist.';
        case dugite_no_gpl_1.GitError.LocalPermissionDenied:
            return 'Permission denied.';
        case dugite_no_gpl_1.GitError.InvalidMerge:
            return 'This is not something we can merge.';
        case dugite_no_gpl_1.GitError.InvalidRebase:
            return 'This is not something we can rebase.';
        case dugite_no_gpl_1.GitError.NonFastForwardMergeIntoEmptyHead:
            return 'The merge you attempted is not a fast-forward, so it cannot be performed on an empty branch.';
        case dugite_no_gpl_1.GitError.PatchDoesNotApply:
            return 'The requested changes conflict with one or more files in the repository.';
        case dugite_no_gpl_1.GitError.BranchAlreadyExists:
            return 'A branch with that name already exists.';
        case dugite_no_gpl_1.GitError.BadRevision:
            return 'Bad revision.';
        case dugite_no_gpl_1.GitError.NotAGitRepository:
            return 'This is not a git repository.';
        case dugite_no_gpl_1.GitError.ProtectedBranchForcePush:
            return 'This branch is protected from force-push operations.';
        case dugite_no_gpl_1.GitError.ProtectedBranchRequiresReview:
            return 'This branch is protected and any changes requires an approved review. Open a pull request with changes targeting this branch instead.';
        case dugite_no_gpl_1.GitError.PushWithFileSizeExceedingLimit:
            return "The push operation includes a file which exceeds GitHub's file size restriction of 100MB. Please remove the file from history and try again.";
        case dugite_no_gpl_1.GitError.HexBranchNameRejected:
            return 'The branch name cannot be a 40-character string of hexadecimal characters, as this is the format that Git uses for representing objects.';
        case dugite_no_gpl_1.GitError.ForcePushRejected:
            return 'The force push has been rejected for the current branch.';
        case dugite_no_gpl_1.GitError.InvalidRefLength:
            return 'A ref cannot be longer than 255 characters.';
        case dugite_no_gpl_1.GitError.CannotMergeUnrelatedHistories:
            return 'Unable to merge unrelated histories in this repository.';
        case dugite_no_gpl_1.GitError.PushWithPrivateEmail:
            return 'Cannot push these commits as they contain an email address marked as private on GitHub.';
        case dugite_no_gpl_1.GitError.LFSAttributeDoesNotMatch:
            return 'Git LFS attribute found in global Git configuration does not match expected value.';
        case dugite_no_gpl_1.GitError.ProtectedBranchDeleteRejected:
            return 'This branch cannot be deleted from the remote repository because it is marked as protected.';
        case dugite_no_gpl_1.GitError.ProtectedBranchRequiredStatus:
            return 'The push was rejected by the remote server because a required status check has not been satisfied.';
        case dugite_no_gpl_1.GitError.BranchRenameFailed:
            return 'The branch could not be renamed.';
        case dugite_no_gpl_1.GitError.PathDoesNotExist:
            return 'The path does not exist on disk.';
        case dugite_no_gpl_1.GitError.InvalidObjectName:
            return 'The object was not found in the Git repository.';
        case dugite_no_gpl_1.GitError.OutsideRepository:
            return 'This path is not a valid path inside the repository.';
        case dugite_no_gpl_1.GitError.LockFileAlreadyExists:
            return 'A lock file already exists in the repository, which blocks this operation from completing.';
        default:
            throw new Error("Unknown error: " + error);
    }
}
//# sourceMappingURL=git.js.map