/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
import { localize } from '../../../nls';
import { sep } from '../../../base/common/path';
import { URI } from '../../../base/common/uri';
import { createDecorator } from '../../instantiation/common/instantiation';
import { startsWithIgnoreCase } from '../../../base/common/strings';
import { isEqualOrParent, isEqual } from '../../../base/common/resources';
import { isUndefinedOrNull } from '../../../base/common/types';
export var IFileService = createDecorator('fileService');
export var FileType;
(function (FileType) {
    FileType[FileType["Unknown"] = 0] = "Unknown";
    FileType[FileType["File"] = 1] = "File";
    FileType[FileType["Directory"] = 2] = "Directory";
    FileType[FileType["SymbolicLink"] = 64] = "SymbolicLink";
})(FileType || (FileType = {}));
export function hasReadWriteCapability(provider) {
    return !!(provider.capabilities & 2 /* FileReadWrite */);
}
export function hasFileFolderCopyCapability(provider) {
    return !!(provider.capabilities & 8 /* FileFolderCopy */);
}
export function hasOpenReadWriteCloseCapability(provider) {
    return !!(provider.capabilities & 4 /* FileOpenReadWriteClose */);
}
export function hasFileReadStreamCapability(provider) {
    return !!(provider.capabilities & 16 /* FileReadStream */);
}
export var FileSystemProviderErrorCode;
(function (FileSystemProviderErrorCode) {
    FileSystemProviderErrorCode["FileExists"] = "EntryExists";
    FileSystemProviderErrorCode["FileNotFound"] = "EntryNotFound";
    FileSystemProviderErrorCode["FileNotADirectory"] = "EntryNotADirectory";
    FileSystemProviderErrorCode["FileIsADirectory"] = "EntryIsADirectory";
    FileSystemProviderErrorCode["FileExceedsMemoryLimit"] = "EntryExceedsMemoryLimit";
    FileSystemProviderErrorCode["FileTooLarge"] = "EntryTooLarge";
    FileSystemProviderErrorCode["NoPermissions"] = "NoPermissions";
    FileSystemProviderErrorCode["Unavailable"] = "Unavailable";
    FileSystemProviderErrorCode["Unknown"] = "Unknown";
})(FileSystemProviderErrorCode || (FileSystemProviderErrorCode = {}));
var FileSystemProviderError = /** @class */ (function (_super) {
    __extends(FileSystemProviderError, _super);
    function FileSystemProviderError(message, code) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        return _this;
    }
    return FileSystemProviderError;
}(Error));
export { FileSystemProviderError };
export function createFileSystemProviderError(error, code) {
    var providerError = new FileSystemProviderError(error.toString(), code);
    markAsFileSystemProviderError(providerError, code);
    return providerError;
}
export function ensureFileSystemProviderError(error) {
    if (!error) {
        return createFileSystemProviderError(localize('unknownError', "Unknown Error"), FileSystemProviderErrorCode.Unknown); // https://github.com/Microsoft/vscode/issues/72798
    }
    return error;
}
export function markAsFileSystemProviderError(error, code) {
    error.name = code ? code + " (FileSystemError)" : "FileSystemError";
    return error;
}
export function toFileSystemProviderErrorCode(error) {
    // Guard against abuse
    if (!error) {
        return FileSystemProviderErrorCode.Unknown;
    }
    // FileSystemProviderError comes with the code
    if (error instanceof FileSystemProviderError) {
        return error.code;
    }
    // Any other error, check for name match by assuming that the error
    // went through the markAsFileSystemProviderError() method
    var match = /^(.+) \(FileSystemError\)$/.exec(error.name);
    if (!match) {
        return FileSystemProviderErrorCode.Unknown;
    }
    switch (match[1]) {
        case FileSystemProviderErrorCode.FileExists: return FileSystemProviderErrorCode.FileExists;
        case FileSystemProviderErrorCode.FileIsADirectory: return FileSystemProviderErrorCode.FileIsADirectory;
        case FileSystemProviderErrorCode.FileNotADirectory: return FileSystemProviderErrorCode.FileNotADirectory;
        case FileSystemProviderErrorCode.FileNotFound: return FileSystemProviderErrorCode.FileNotFound;
        case FileSystemProviderErrorCode.FileExceedsMemoryLimit: return FileSystemProviderErrorCode.FileExceedsMemoryLimit;
        case FileSystemProviderErrorCode.FileTooLarge: return FileSystemProviderErrorCode.FileTooLarge;
        case FileSystemProviderErrorCode.NoPermissions: return FileSystemProviderErrorCode.NoPermissions;
        case FileSystemProviderErrorCode.Unavailable: return FileSystemProviderErrorCode.Unavailable;
    }
    return FileSystemProviderErrorCode.Unknown;
}
export function toFileOperationResult(error) {
    // FileSystemProviderError comes with the result already
    if (error instanceof FileOperationError) {
        return error.fileOperationResult;
    }
    // Otherwise try to find from code
    switch (toFileSystemProviderErrorCode(error)) {
        case FileSystemProviderErrorCode.FileNotFound:
            return 1 /* FILE_NOT_FOUND */;
        case FileSystemProviderErrorCode.FileIsADirectory:
            return 0 /* FILE_IS_DIRECTORY */;
        case FileSystemProviderErrorCode.NoPermissions:
            return 6 /* FILE_PERMISSION_DENIED */;
        case FileSystemProviderErrorCode.FileExists:
            return 4 /* FILE_MOVE_CONFLICT */;
        case FileSystemProviderErrorCode.FileExceedsMemoryLimit:
            return 9 /* FILE_EXCEEDS_MEMORY_LIMIT */;
        case FileSystemProviderErrorCode.FileTooLarge:
            return 7 /* FILE_TOO_LARGE */;
        default:
            return 10 /* FILE_OTHER_ERROR */;
    }
}
var FileOperationEvent = /** @class */ (function () {
    function FileOperationEvent(resource, operation, target) {
        this.resource = resource;
        this.operation = operation;
        this.target = target;
    }
    FileOperationEvent.prototype.isOperation = function (operation) {
        return this.operation === operation;
    };
    return FileOperationEvent;
}());
export { FileOperationEvent };
var FileChangesEvent = /** @class */ (function () {
    function FileChangesEvent(changes) {
        this._changes = changes;
    }
    Object.defineProperty(FileChangesEvent.prototype, "changes", {
        get: function () {
            return this._changes;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns true if this change event contains the provided file with the given change type (if provided). In case of
     * type DELETED, this method will also return true if a folder got deleted that is the parent of the
     * provided file path.
     */
    FileChangesEvent.prototype.contains = function (resource, type) {
        if (!resource) {
            return false;
        }
        var checkForChangeType = !isUndefinedOrNull(type);
        return this._changes.some(function (change) {
            if (checkForChangeType && change.type !== type) {
                return false;
            }
            // For deleted also return true when deleted folder is parent of target path
            if (change.type === 2 /* DELETED */) {
                return isEqualOrParent(resource, change.resource);
            }
            return isEqual(resource, change.resource);
        });
    };
    /**
     * Returns the changes that describe added files.
     */
    FileChangesEvent.prototype.getAdded = function () {
        return this.getOfType(1 /* ADDED */);
    };
    /**
     * Returns if this event contains added files.
     */
    FileChangesEvent.prototype.gotAdded = function () {
        return this.hasType(1 /* ADDED */);
    };
    /**
     * Returns the changes that describe deleted files.
     */
    FileChangesEvent.prototype.getDeleted = function () {
        return this.getOfType(2 /* DELETED */);
    };
    /**
     * Returns if this event contains deleted files.
     */
    FileChangesEvent.prototype.gotDeleted = function () {
        return this.hasType(2 /* DELETED */);
    };
    /**
     * Returns the changes that describe updated files.
     */
    FileChangesEvent.prototype.getUpdated = function () {
        return this.getOfType(0 /* UPDATED */);
    };
    /**
     * Returns if this event contains updated files.
     */
    FileChangesEvent.prototype.gotUpdated = function () {
        return this.hasType(0 /* UPDATED */);
    };
    FileChangesEvent.prototype.getOfType = function (type) {
        return this._changes.filter(function (change) { return change.type === type; });
    };
    FileChangesEvent.prototype.hasType = function (type) {
        return this._changes.some(function (change) {
            return change.type === type;
        });
    };
    return FileChangesEvent;
}());
export { FileChangesEvent };
export function isParent(path, candidate, ignoreCase) {
    if (!path || !candidate || path === candidate) {
        return false;
    }
    if (candidate.length > path.length) {
        return false;
    }
    if (candidate.charAt(candidate.length - 1) !== sep) {
        candidate += sep;
    }
    if (ignoreCase) {
        return startsWithIgnoreCase(path, candidate);
    }
    return path.indexOf(candidate) === 0;
}
var FileOperationError = /** @class */ (function (_super) {
    __extends(FileOperationError, _super);
    function FileOperationError(message, fileOperationResult, options) {
        var _this = _super.call(this, message) || this;
        _this.fileOperationResult = fileOperationResult;
        _this.options = options;
        return _this;
    }
    FileOperationError.isFileOperationError = function (obj) {
        return obj instanceof Error && !isUndefinedOrNull(obj.fileOperationResult);
    };
    return FileOperationError;
}(Error));
export { FileOperationError };
export var AutoSaveConfiguration = {
    OFF: 'off',
    AFTER_DELAY: 'afterDelay',
    ON_FOCUS_CHANGE: 'onFocusChange',
    ON_WINDOW_CHANGE: 'onWindowChange'
};
export var HotExitConfiguration = {
    OFF: 'off',
    ON_EXIT: 'onExit',
    ON_EXIT_AND_WINDOW_CLOSE: 'onExitAndWindowClose'
};
export var FILES_ASSOCIATIONS_CONFIG = 'files.associations';
export var FILES_EXCLUDE_CONFIG = 'files.exclude';
export var FileKind;
(function (FileKind) {
    FileKind[FileKind["FILE"] = 0] = "FILE";
    FileKind[FileKind["FOLDER"] = 1] = "FOLDER";
    FileKind[FileKind["ROOT_FOLDER"] = 2] = "ROOT_FOLDER";
})(FileKind || (FileKind = {}));
/**
 * A hint to disable etag checking for reading/writing.
 */
export var ETAG_DISABLED = '';
export function etag(stat) {
    if (typeof stat.size !== 'number' || typeof stat.mtime !== 'number') {
        return undefined;
    }
    return stat.mtime.toString(29) + stat.size.toString(31);
}
export function whenProviderRegistered(file, fileService) {
    if (fileService.canHandleResource(URI.from({ scheme: file.scheme }))) {
        return Promise.resolve();
    }
    return new Promise(function (c, e) {
        var disposable = fileService.onDidChangeFileSystemProviderRegistrations(function (e) {
            if (e.scheme === file.scheme && e.added) {
                disposable.dispose();
                c();
            }
        });
    });
}
