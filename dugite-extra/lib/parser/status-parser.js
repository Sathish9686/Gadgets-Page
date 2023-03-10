"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var status_1 = require("../model/status");
var ChangedEntryType = '1';
var RenamedOrCopiedEntryType = '2';
var UnmergedEntryType = 'u';
var UntrackedEntryType = '?';
var IgnoredEntryType = '!';
/** Parses output from git status --porcelain -z into file status entries */
function parsePorcelainStatus(output, limit) {
    if (limit === void 0) { limit = Number.MAX_SAFE_INTEGER; }
    var entries = new Array();
    // See https://git-scm.com/docs/git-status
    //
    // In the short-format, the status of each path is shown as
    // XY PATH1 -> PATH2
    //
    // There is also an alternate -z format recommended for machine parsing. In that
    // format, the status field is the same, but some other things change. First,
    // the -> is omitted from rename entries and the field order is reversed (e.g
    // from -> to becomes to from). Second, a NUL (ASCII 0) follows each filename,
    // replacing space as a field separator and the terminating newline (but a space
    // still separates the status field from the first filename). Third, filenames
    // containing special characters are not specially formatted; no quoting or
    // backslash-escaping is performed.
    var fields = output.split('\0');
    var field;
    var limitCounter = 0;
    var incomplete = false;
    while ((field = fields.shift())) {
        if (field.startsWith('# ') && field.length > 2) {
            entries.push({ kind: 'header', value: field.substr(2) });
            continue;
        }
        if (limitCounter === limit) {
            incomplete = true;
            break;
        }
        var entryKind = field.substr(0, 1);
        if (entryKind === ChangedEntryType) {
            entries.push(parseChangedEntry(field));
        }
        else if (entryKind === RenamedOrCopiedEntryType) {
            entries.push(parsedRenamedOrCopiedEntry(field, fields.shift()));
        }
        else if (entryKind === UnmergedEntryType) {
            entries.push(parseUnmergedEntry(field));
        }
        else if (entryKind === UntrackedEntryType) {
            entries.push(parseUntrackedEntry(field));
        }
        else if (entryKind === IgnoredEntryType) {
            // Ignored, we don't care about these for now
        }
        limitCounter++;
    }
    return { entries: entries, incomplete: incomplete };
}
exports.parsePorcelainStatus = parsePorcelainStatus;
// 1 <XY> <sub> <mH> <mI> <mW> <hH> <hI> <path>
var changedEntryRe = /^1 ([MADRCU?!.]{2}) (N\.\.\.|S[C.][M.][U.]) (\d+) (\d+) (\d+) ([a-f0-9]+) ([a-f0-9]+) (.*?)$/;
function parseChangedEntry(field) {
    var match = changedEntryRe.exec(field);
    if (!match) {
        throw new Error("Failed to parse status line for changed entry: " + field);
    }
    return {
        kind: 'entry',
        statusCode: match[1],
        path: match[8],
    };
}
// 2 <XY> <sub> <mH> <mI> <mW> <hH> <hI> <X><score> <path><sep><origPath>
var renamedOrCopiedEntryRe = /^2 ([MADRCU?!.]{2}) (N\.\.\.|S[C.][M.][U.]) (\d+) (\d+) (\d+) ([a-f0-9]+) ([a-f0-9]+) ([RC]\d+) (.*?)$/;
function parsedRenamedOrCopiedEntry(field, oldPath) {
    var match = renamedOrCopiedEntryRe.exec(field);
    if (!match) {
        throw new Error("Failed to parse status line for renamed or copied entry: " + field);
    }
    if (!oldPath) {
        throw new Error('Failed to parse renamed or copied entry, could not parse old path');
    }
    return {
        kind: 'entry',
        statusCode: match[1],
        oldPath: oldPath,
        path: match[9],
    };
}
// u <xy> <sub> <m1> <m2> <m3> <mW> <h1> <h2> <h3> <path>
var unmergedEntryRe = /^u ([DAU]{2}) (N\.\.\.|S[C.][M.][U.]) (\d+) (\d+) (\d+) (\d+) ([a-f0-9]+) ([a-f0-9]+) ([a-f0-9]+) (.*?)$/;
function parseUnmergedEntry(field) {
    var match = unmergedEntryRe.exec(field);
    if (!match) {
        throw new Error("Failed to parse status line for unmerged entry: " + field);
    }
    return {
        kind: 'entry',
        statusCode: match[1],
        path: match[10],
    };
}
function parseUntrackedEntry(field) {
    var path = field.substr(2);
    return {
        kind: 'entry',
        // NOTE: We return ?? instead of ? here to play nice with mapStatus,
        // might want to consider changing this (and mapStatus) in the future.
        statusCode: '??',
        path: path,
    };
}
/**
 * Map the raw status text from Git to a structure we can work with in the app.
 */
function mapStatus(status) {
    if (status === '??') {
        return {
            kind: 'untracked'
        };
    }
    if (status === '.M') {
        return {
            kind: 'ordinary',
            type: 'modified',
            index: status_1.GitStatusEntry.Unchanged,
            workingTree: status_1.GitStatusEntry.Modified,
        };
    }
    if (status === 'M.') {
        return {
            kind: 'ordinary',
            type: 'modified',
            index: status_1.GitStatusEntry.Modified,
            workingTree: status_1.GitStatusEntry.Unchanged,
        };
    }
    if (status === '.A') {
        return {
            kind: 'ordinary',
            type: 'added',
            index: status_1.GitStatusEntry.Unchanged,
            workingTree: status_1.GitStatusEntry.Added,
        };
    }
    if (status === 'A.') {
        return {
            kind: 'ordinary',
            type: 'added',
            index: status_1.GitStatusEntry.Added,
            workingTree: status_1.GitStatusEntry.Unchanged,
        };
    }
    if (status === '.D') {
        return {
            kind: 'ordinary',
            type: 'deleted',
            index: status_1.GitStatusEntry.Unchanged,
            workingTree: status_1.GitStatusEntry.Deleted,
        };
    }
    if (status === 'D.') {
        return {
            kind: 'ordinary',
            type: 'deleted',
            index: status_1.GitStatusEntry.Deleted,
            workingTree: status_1.GitStatusEntry.Unchanged,
        };
    }
    if (status === 'R.') {
        return {
            kind: 'renamed',
            index: status_1.GitStatusEntry.Renamed,
            workingTree: status_1.GitStatusEntry.Unchanged,
        };
    }
    if (status === '.R') {
        return {
            kind: 'renamed',
            index: status_1.GitStatusEntry.Unchanged,
            workingTree: status_1.GitStatusEntry.Renamed,
        };
    }
    if (status === 'C.') {
        return {
            kind: 'copied',
            index: status_1.GitStatusEntry.Copied,
            workingTree: status_1.GitStatusEntry.Unchanged,
        };
    }
    if (status === '.C') {
        return {
            kind: 'copied',
            index: status_1.GitStatusEntry.Unchanged,
            workingTree: status_1.GitStatusEntry.Copied,
        };
    }
    if (status === 'AD') {
        return {
            kind: 'ordinary',
            type: 'added',
            index: status_1.GitStatusEntry.Added,
            workingTree: status_1.GitStatusEntry.Deleted,
        };
    }
    if (status === 'AM') {
        return {
            kind: 'ordinary',
            type: 'added',
            index: status_1.GitStatusEntry.Added,
            workingTree: status_1.GitStatusEntry.Modified,
        };
    }
    if (status === 'RM') {
        return {
            kind: 'renamed',
            index: status_1.GitStatusEntry.Renamed,
            workingTree: status_1.GitStatusEntry.Modified,
        };
    }
    if (status === 'RD') {
        return {
            kind: 'renamed',
            index: status_1.GitStatusEntry.Renamed,
            workingTree: status_1.GitStatusEntry.Deleted,
        };
    }
    if (status === 'DD') {
        return {
            kind: 'conflicted',
            us: status_1.GitStatusEntry.Deleted,
            them: status_1.GitStatusEntry.Deleted,
        };
    }
    if (status === 'AU') {
        return {
            kind: 'conflicted',
            us: status_1.GitStatusEntry.Added,
            them: status_1.GitStatusEntry.Modified,
        };
    }
    if (status === 'UD') {
        return {
            kind: 'conflicted',
            us: status_1.GitStatusEntry.Modified,
            them: status_1.GitStatusEntry.Deleted,
        };
    }
    if (status === 'UA') {
        return {
            kind: 'conflicted',
            us: status_1.GitStatusEntry.Modified,
            them: status_1.GitStatusEntry.Added,
        };
    }
    if (status === 'DU') {
        return {
            kind: 'conflicted',
            us: status_1.GitStatusEntry.Deleted,
            them: status_1.GitStatusEntry.Modified,
        };
    }
    if (status === 'AA') {
        return {
            kind: 'conflicted',
            us: status_1.GitStatusEntry.Added,
            them: status_1.GitStatusEntry.Added,
        };
    }
    if (status === 'UU') {
        return {
            kind: 'conflicted',
            us: status_1.GitStatusEntry.Modified,
            them: status_1.GitStatusEntry.Modified,
        };
    }
    // as a fallback, we assume the file is modified in some way
    return {
        kind: 'ordinary',
        type: 'modified',
    };
}
exports.mapStatus = mapStatus;
//# sourceMappingURL=status-parser.js.map