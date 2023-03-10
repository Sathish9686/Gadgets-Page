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
var Path = require("path");
var Fs = require("fs");
var git_1 = require("../core/git");
var show_1 = require("./show");
var status_1 = require("../model/status");
var diff_1 = require("../model/diff");
var diff_parser_1 = require("../parser/diff-parser");
/**
 *  Defining the list of known extensions we can render inside the app
 */
var imageFileExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif']);
/**
 * Render the difference between a file in the given commit and its parent
 *
 * @param commitish A commit SHA or some other identifier that ultimately dereferences
 *                  to a commit.
 */
function getCommitDiff(repositoryPath, file, commitish, options) {
    var args = ['log', commitish, '-m', '-1', '--first-parent', '--patch-with-raw', '-z', '--no-color', '--', file.path];
    return git_1.git(args, repositoryPath, 'getCommitDiff', options)
        .then(function (value) { return diffFromRawDiffOutput(value.stdout); })
        .then(function (diff) { return convertDiff(repositoryPath, file, diff, commitish); });
}
exports.getCommitDiff = getCommitDiff;
/**
 * Render the diff for a file within the repository working directory. The file will be
 * compared against HEAD if it's tracked, if not it'll be compared to an empty file meaning
 * that all content in the file will be treated as additions.
 */
function getWorkingDirectoryDiff(repositoryPath, file, options) {
    var opts = {};
    if (options) {
        opts = __assign({}, opts, options);
    }
    var args;
    // `--no-ext-diff` should be provided wherever we invoke `git diff` so that any
    // diff.external program configured by the user is ignored
    if (file.status === status_1.AppFileStatus.New) {
        // `git diff --no-index` seems to emulate the exit codes from `diff` irrespective of
        // whether you set --exit-code
        //
        // this is the behaviour:
        // - 0 if no changes found
        // - 1 if changes found
        // -   and error otherwise
        //
        // citation in source:
        // https://github.com/git/git/blob/1f66975deb8402131fbf7c14330d0c7cdebaeaa2/diff-no-index.c#L300
        opts = __assign({}, opts, { successExitCodes: new Set([0, 1]) });
        args = ['diff', '--no-ext-diff', '--no-index', '--patch-with-raw', '-z', '--no-color', '--', '/dev/null', file.path];
    }
    else if (file.status === status_1.AppFileStatus.Renamed) {
        // NB: Technically this is incorrect, the best kind of incorrect.
        // In order to show exactly what will end up in the commit we should
        // perform a diff between the new file and the old file as it appears
        // in HEAD. By diffing against the index we won't show any changes
        // already staged to the renamed file which differs from our other diffs.
        // The closest I got to that was running hash-object and then using
        // git diff <blob> <blob> but that seems a bit excessive.
        args = ['diff', '--no-ext-diff', '--patch-with-raw', '-z', '--no-color', '--', file.path];
    }
    else {
        args = ['diff', 'HEAD', '--no-ext-diff', '--patch-with-raw', '-z', '--no-color', '--', file.path];
    }
    return git_1.git(args, repositoryPath, 'getWorkingDirectoryDiff', opts)
        .then(function (value) { return diffFromRawDiffOutput(value.stdout); })
        .then(function (diff) { return convertDiff(repositoryPath, file, diff, 'HEAD'); });
}
exports.getWorkingDirectoryDiff = getWorkingDirectoryDiff;
function getImageDiff(repositoryPath, file, commitish) {
    return __awaiter(this, void 0, void 0, function () {
        var current, previous;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    current = undefined;
                    previous = undefined;
                    if (!(file instanceof status_1.WorkingDirectoryFileChange)) return [3 /*break*/, 5];
                    // No idea what to do about this, a conflicted binary (presumably) file.
                    // Ideally we'd show all three versions and let the user pick but that's
                    // a bit out of scope for now.
                    if (file.status === status_1.AppFileStatus.Conflicted) {
                        return [2 /*return*/, { kind: diff_1.DiffType.Image }];
                    }
                    if (!(file.status !== status_1.AppFileStatus.Deleted)) return [3 /*break*/, 2];
                    return [4 /*yield*/, getWorkingDirectoryImage(repositoryPath, file)];
                case 1:
                    current = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(file.status !== status_1.AppFileStatus.New)) return [3 /*break*/, 4];
                    return [4 /*yield*/, getBlobImage(repositoryPath, file.oldPath || file.path, 'HEAD')];
                case 3:
                    // If we have file.oldPath that means it's a rename so we'll
                    // look for that file.
                    previous = _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 9];
                case 5:
                    if (!(file.status !== status_1.AppFileStatus.Deleted)) return [3 /*break*/, 7];
                    return [4 /*yield*/, getBlobImage(repositoryPath, file.path, commitish)];
                case 6:
                    current = _a.sent();
                    _a.label = 7;
                case 7:
                    if (!(file.status !== status_1.AppFileStatus.New)) return [3 /*break*/, 9];
                    return [4 /*yield*/, getBlobImage(repositoryPath, file.oldPath || file.path, commitish + "^")];
                case 8:
                    // TODO: commitish^ won't work for the first commit
                    //
                    // If we have file.oldPath that means it's a rename so we'll
                    // look for that file.
                    previous = _a.sent();
                    _a.label = 9;
                case 9: return [2 /*return*/, {
                        kind: diff_1.DiffType.Image,
                        previous: previous,
                        current: current,
                    }];
            }
        });
    });
}
function convertDiff(repositoryPath, file, diff, commitish) {
    return __awaiter(this, void 0, void 0, function () {
        var extension;
        return __generator(this, function (_a) {
            if (diff.isBinary) {
                extension = Path.extname(file.path);
                // some extension we don't know how to parse, never mind
                if (!imageFileExtensions.has(extension)) {
                    return [2 /*return*/, {
                            kind: diff_1.DiffType.Binary,
                        }];
                }
                else {
                    return [2 /*return*/, getImageDiff(repositoryPath, file, commitish)];
                }
            }
            return [2 /*return*/, {
                    kind: diff_1.DiffType.Text,
                    text: diff.contents,
                    hunks: diff.hunks,
                }];
        });
    });
}
exports.convertDiff = convertDiff;
/**
 * Map a given file extension to the related data URL media type
 */
function getMediaType(extension) {
    if (extension === '.png') {
        return 'image/png';
    }
    if (extension === '.jpg' || extension === '.jpeg') {
        return 'image/jpg';
    }
    if (extension === '.gif') {
        return 'image/gif';
    }
    // fallback value as per the spec
    return 'text/plain';
}
/**
 * Utility function used by get(Commit|WorkingDirectory)Diff.
 *
 * Parses the output from a diff-like command that uses `--path-with-raw`
 */
function diffFromRawDiffOutput(result) {
    var pieces = result.split('\0');
    var parser = new diff_parser_1.DiffParser();
    return parser.parse(pieces[pieces.length - 1]);
}
function getBlobImage(repositoryPath, path, commitish) {
    return __awaiter(this, void 0, void 0, function () {
        var extension, contents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    extension = Path.extname(path);
                    return [4 /*yield*/, show_1.getBlobContents(repositoryPath, commitish, path)];
                case 1:
                    contents = _a.sent();
                    return [2 /*return*/, {
                            contents: contents.toString('base64'),
                            mediaType: getMediaType(extension),
                        }];
            }
        });
    });
}
exports.getBlobImage = getBlobImage;
function getWorkingDirectoryImage(repositoryPath, file) {
    return __awaiter(this, void 0, void 0, function () {
        var extension, contents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    extension = Path.extname(file.path);
                    return [4 /*yield*/, getWorkingDirectoryContents(repositoryPath, file)];
                case 1:
                    contents = _a.sent();
                    return [2 /*return*/, {
                            contents: contents,
                            mediaType: getMediaType(extension),
                        }];
            }
        });
    });
}
exports.getWorkingDirectoryImage = getWorkingDirectoryImage;
/**
 * Retrieve the binary contents of a blob from the working directory
 *
 * Returns a promise containing the base64 encoded string,
 * as <img> tags support the data URI scheme instead of
 * needing to reference a file:// URI
 *
 * https://en.wikipedia.org/wiki/Data_URI_scheme
 *
 */
function getWorkingDirectoryContents(repositoryPath, file) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var path = Path.join(repositoryPath, file.path);
                    Fs.readFile(path, { flag: 'r' }, function (error, buffer) {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(buffer.toString('base64'));
                    });
                })];
        });
    });
}
//# sourceMappingURL=diff.js.map