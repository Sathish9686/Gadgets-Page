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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The status entry code as reported by Git.
 */
var GitStatusEntry;
(function (GitStatusEntry) {
    // M
    GitStatusEntry[GitStatusEntry["Modified"] = 0] = "Modified";
    // A
    GitStatusEntry[GitStatusEntry["Added"] = 1] = "Added";
    // D
    GitStatusEntry[GitStatusEntry["Deleted"] = 2] = "Deleted";
    // R
    GitStatusEntry[GitStatusEntry["Renamed"] = 3] = "Renamed";
    // C
    GitStatusEntry[GitStatusEntry["Copied"] = 4] = "Copied";
    // .
    GitStatusEntry[GitStatusEntry["Unchanged"] = 5] = "Unchanged";
    // ?
    GitStatusEntry[GitStatusEntry["Untracked"] = 6] = "Untracked";
    // !
    GitStatusEntry[GitStatusEntry["Ignored"] = 7] = "Ignored";
    // U
    //
    // While U is a valid code here, we currently mark conflicts as "Modified"
    // in the application - this will likely be something we need to revisit
    // down the track as we improve our merge conflict experience
    GitStatusEntry[GitStatusEntry["UpdatedButUnmerged"] = 8] = "UpdatedButUnmerged";
})(GitStatusEntry = exports.GitStatusEntry || (exports.GitStatusEntry = {}));
/** The file status as represented in GitHub Desktop. */
var AppFileStatus;
(function (AppFileStatus) {
    AppFileStatus[AppFileStatus["New"] = 0] = "New";
    AppFileStatus[AppFileStatus["Modified"] = 1] = "Modified";
    AppFileStatus[AppFileStatus["Deleted"] = 2] = "Deleted";
    AppFileStatus[AppFileStatus["Copied"] = 3] = "Copied";
    AppFileStatus[AppFileStatus["Renamed"] = 4] = "Renamed";
    AppFileStatus[AppFileStatus["Conflicted"] = 5] = "Conflicted";
})(AppFileStatus = exports.AppFileStatus || (exports.AppFileStatus = {}));
/**
 * The state of the changed file in the working directory.
 */
var FileStatus;
(function (FileStatus) {
    FileStatus[FileStatus["New"] = 0] = "New";
    FileStatus[FileStatus["Modified"] = 1] = "Modified";
    FileStatus[FileStatus["Deleted"] = 2] = "Deleted";
    FileStatus[FileStatus["Renamed"] = 3] = "Renamed";
    FileStatus[FileStatus["Conflicted"] = 4] = "Conflicted";
    FileStatus[FileStatus["Copied"] = 5] = "Copied";
})(FileStatus = exports.FileStatus || (exports.FileStatus = {}));
/**
 * Represents a file change in the working directory.
 */
var FileChange = /** @class */ (function () {
    /**
     * Creates a new file change instance.
     *
     * @param path The relative path to the file in the repository.
     * @param status The original path in the case of a renamed file.
     * @param oldPath The status of the change to the file.
     */
    function FileChange(path, status, oldPath, staged) {
        if (staged === void 0) { staged = true; }
        this.path = path;
        this.status = status;
        this.oldPath = oldPath;
        this.staged = staged;
    }
    Object.defineProperty(FileChange.prototype, "id", {
        /** An ID for the file change. */
        get: function () {
            return this.status + "+" + this.path;
        },
        enumerable: true,
        configurable: true
    });
    return FileChange;
}());
exports.FileChange = FileChange;
/** encapsulate the changes to a file in the working directory  */
var WorkingDirectoryFileChange = /** @class */ (function (_super) {
    __extends(WorkingDirectoryFileChange, _super);
    /**
     * Creates a new working directory file change instance.
     * @param path The relative path to the file in the repository.
     * @param status The original path in the case of a renamed file.
     * @param selection contains the selection details for this file - all, nothing or partial.
     * @param oldPath The status of the change to the file.
     */
    function WorkingDirectoryFileChange(path, status, selection, oldPath, staged) {
        if (staged === void 0) { staged = true; }
        var _this = _super.call(this, path, status, oldPath, staged) || this;
        _this.selection = selection;
        return _this;
    }
    /**
     * Create a new WorkingDirectoryFileChange with the given includedness.
     */
    WorkingDirectoryFileChange.prototype.withIncludeAll = function (include) {
        var newSelection = include
            ? this.selection.withSelectAll()
            : this.selection.withSelectNone();
        return this.withSelection(newSelection);
    };
    /**
     * Create a new `WorkingDirectoryFileChange` instance with the given diff selection.
     * @param selection the diff selection.
     */
    WorkingDirectoryFileChange.prototype.withSelection = function (selection) {
        return new WorkingDirectoryFileChange(this.path, this.status, selection, this.oldPath);
    };
    return WorkingDirectoryFileChange;
}(FileChange));
exports.WorkingDirectoryFileChange = WorkingDirectoryFileChange;
/**
 * The state of the working directory for a repository.
 */
var WorkingDirectoryStatus = /** @class */ (function () {
    /**
     * Creates a new instance that represents the working directory status.
     *
     * @param files The list of changes in the repository's working directory.
     * @param includeAll Update the include checkbox state of the form.
     */
    function WorkingDirectoryStatus(files, includeAll) {
        if (includeAll === void 0) { includeAll = true; }
        this.files = files;
        this.includeAll = includeAll;
    }
    /**
     * Update the include state of all files in the working directory
     */
    WorkingDirectoryStatus.prototype.withIncludeAllFiles = function (includeAll) {
        var newFiles = this.files.map(function (f) { return f.withIncludeAll(includeAll); });
        return new WorkingDirectoryStatus(newFiles, includeAll);
    };
    /**
     * Update by replacing the file with the same ID with a new file.
     *
     * @param file updates the argument after replacing all files then returns with a new instance.
     */
    WorkingDirectoryStatus.prototype.byReplacingFile = function (file) {
        var newFiles = this.files.map(function (f) { return f.id === file.id ? file : f; });
        return new WorkingDirectoryStatus(newFiles, this.includeAll);
    };
    /**
     * Find the file with the given ID.
     *
     * @param id the internal unique ID of the file.
     */
    WorkingDirectoryStatus.prototype.findFileWithID = function (id) {
        return this.files.find(function (f) { return f.id === id; });
    };
    return WorkingDirectoryStatus;
}());
exports.WorkingDirectoryStatus = WorkingDirectoryStatus;
//# sourceMappingURL=status.js.map