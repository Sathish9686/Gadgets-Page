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
var fs = require("fs-extra");
var git_1 = require("../core/git");
/**
 * Initializes a new Git repository to the destination folder. On demand, creates the desired folder structure and commits the changes.
 *
 * @param path the desired destination folder for the new Git repository.
 * @param add `true` if all the repository content has to be added to the index.
 * @param commit `true` if the directory structure has to be committed.
 */
function initRepository(path, add, commit) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, git_1.git(['init'], path, 'init')];
                case 1:
                    if ((_a.sent()).exitCode !== 0) {
                        throw new Error("Error while initializing a repository under " + path + ".");
                    }
                    return [4 /*yield*/, git_1.git(['config', 'user.email', '"jon@doe.com"'], path, 'config')];
                case 2:
                    if ((_a.sent()).exitCode !== 0) {
                        throw new Error("Error while setting user email to the Git configuration.");
                    }
                    return [4 /*yield*/, git_1.git(['config', 'user.name', '"Jon Doe"'], path, 'config')];
                case 3:
                    if ((_a.sent()).exitCode !== 0) {
                        throw new Error("Error while setting user name to the Git configuration.");
                    }
                    return [4 /*yield*/, git_1.git(['config', 'core.autocrlf', 'false'], path, 'config')];
                case 4:
                    // To make sure we have `\n` as the line ending on both Windows and *NIX when asserting the tests.
                    // Otherwise, a `git checkout-index -u` will convert `\n` to `\r\n` on Windows.
                    if ((_a.sent()).exitCode !== 0) {
                        throw new Error("Error while adjusting core.autocrlf in the Git configuration.");
                    }
                    if (!add) return [3 /*break*/, 7];
                    return [4 /*yield*/, git_1.git(['add', '.'], path, 'add')];
                case 5:
                    if ((_a.sent()).exitCode !== 0) {
                        throw new Error("Error while staging changes into the repository.");
                    }
                    if (!commit) return [3 /*break*/, 7];
                    return [4 /*yield*/, git_1.git(['commit', '-F', '-'], path, 'createCommit', { stdin: 'Initial commit.' })];
                case 6:
                    if ((_a.sent()).exitCode !== 0) {
                        throw new Error("Error while committing changes into the repository");
                    }
                    _a.label = 7;
                case 7: return [2 /*return*/, path];
            }
        });
    });
}
exports.initRepository = initRepository;
function createTestRepository(root) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fs.mkdirSync(path.join(root, 'folder'));
                    fs.writeFileSync(path.join(root, 'A.txt'), 'A', { encoding: 'utf8' });
                    fs.writeFileSync(path.join(root, 'B.txt'), 'B', { encoding: 'utf8' });
                    fs.writeFileSync(path.join(root, 'folder', 'C.txt'), 'C', { encoding: 'utf8' });
                    return [4 /*yield*/, initRepository(root, true, true)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, root];
            }
        });
    });
}
exports.createTestRepository = createTestRepository;
function usesLocalGit() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, process.env.USE_LOCAL_GIT === 'true'];
        });
    });
}
exports.usesLocalGit = usesLocalGit;
function remove(repositoryPath, filesToDelete) {
    var e_1, _a;
    var files = (Array.isArray(filesToDelete) ? filesToDelete : [filesToDelete]).map(function (f) { return path.join(repositoryPath, f); });
    try {
        for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
            var f = files_1_1.value;
            if (!fs.existsSync(f)) {
                throw new Error("Cannot delete file " + f + ", it does not exist.");
            }
            if (!fs.statSync(f).isFile()) {
                throw new Error("Only files can be deleted, directories not: " + f + ".");
            }
            fs.unlinkSync(f);
            if (fs.existsSync(f)) {
                throw new Error("Cannot delete file: " + f + ".");
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return files;
}
exports.remove = remove;
function add(repositoryPath, filesToCreate) {
    var e_2, _a;
    var files = (Array.isArray(filesToCreate) ? filesToCreate : [filesToCreate]).map(function (f) {
        return { path: path.join(repositoryPath, f.path), data: f.data || '' };
    });
    try {
        for (var files_2 = __values(files), files_2_1 = files_2.next(); !files_2_1.done; files_2_1 = files_2.next()) {
            var f = files_2_1.value;
            if (fs.existsSync(f.path)) {
                throw new Error("File " + f.path + ", already exists.");
            }
            fs.writeFileSync(f.path, f.data);
            if (!fs.existsSync(f.path)) {
                throw new Error("Cannot create new file: " + f.path + ".");
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (files_2_1 && !files_2_1.done && (_a = files_2.return)) _a.call(files_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return files.map(function (f) { return f.path; });
}
exports.add = add;
function modify(repositoryPath, filesToModify) {
    var e_3, _a;
    var files = (Array.isArray(filesToModify) ? filesToModify : [filesToModify]).map(function (f) {
        return { path: path.join(repositoryPath, f.path), data: f.data };
    });
    try {
        for (var files_3 = __values(files), files_3_1 = files_3.next(); !files_3_1.done; files_3_1 = files_3.next()) {
            var f = files_3_1.value;
            if (!fs.existsSync(f.path)) {
                throw new Error("Cannot modify the content of the file " + f.path + ", it does not exist.");
            }
            if (!fs.statSync(f.path).isFile()) {
                throw new Error("Only files can be modified, directories not: " + f.path + ".");
            }
            fs.writeFileSync(f.path, f.data);
            if (!fs.existsSync(f.path) || fs.readFileSync(f.path, 'utf-8') !== f.data) {
                throw new Error("Cannot modify the file content file: " + f.path + ".");
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (files_3_1 && !files_3_1.done && (_a = files_3.return)) _a.call(files_3);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return files.map(function (f) { return f.path; });
}
exports.modify = modify;
function rename(repositoryPath, filesToRename) {
    var e_4, _a;
    var files = (Array.isArray(filesToRename) ? filesToRename : [filesToRename]).map(function (f) {
        return { oldPath: path.join(repositoryPath, f.oldPath), newPath: path.join(repositoryPath, f.newPath) };
    });
    try {
        for (var files_4 = __values(files), files_4_1 = files_4.next(); !files_4_1.done; files_4_1 = files_4.next()) {
            var f = files_4_1.value;
            if (!fs.existsSync(f.oldPath)) {
                throw new Error("Cannot rename the file " + f.oldPath + ", it does not exist.");
            }
            if (fs.existsSync(f.newPath)) {
                throw new Error("Cannot rename the file " + f.oldPath + ", a file already exists in the destination: " + f.newPath + ".");
            }
            if (!fs.statSync(f.oldPath).isFile()) {
                throw new Error("Only files can be renamed, directories not: " + f.oldPath + ".");
            }
            fs.renameSync(f.oldPath, f.newPath);
            if (!fs.existsSync(f.newPath) || fs.existsSync(f.oldPath)) {
                throw new Error("Cannot rename file: " + f.oldPath + " -> " + f.newPath + ".");
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (files_4_1 && !files_4_1.done && (_a = files_4.return)) _a.call(files_4);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return __spread(files.map(function (f) { return f.oldPath; }), files.map(function (f) { return f.newPath; }));
}
exports.rename = rename;
function contentIsEqual(repositoryPath, fileNameOrPath, content) {
    var fileContent = fs.readFileSync(path.join(repositoryPath, fileNameOrPath), { encoding: 'utf8' });
    return fileContent === content;
}
exports.contentIsEqual = contentIsEqual;
//# sourceMappingURL=test-helper.js.map