"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var status_1 = require("../model/status");
var diff_1 = require("../model/diff");
/**
 * Generates a string matching the format of a GNU unified diff header excluding
 * the (optional) timestamp fields
 *
 * Note that this multi-line string includes a trailing newline.
 *
 * @param from  The relative path to the original version of the file or
 *              null if the file is newly created.
 *
 * @param to    The relative path to the new version of the file or
 *              null if the file is the file is newly created.
 */
function formatPatchHeader(from, to) {
    // https://en.wikipedia.org/wiki/Diff_utility
    //
    // > At the beginning of the patch is the file information, including the full
    // > path and a time stamp delimited by a tab character.
    // >
    // > [...] the original file is preceded by "---" and the new file is preceded
    // > by "+++".
    //
    // We skip the time stamp to match git
    var fromPath = from ? "a/" + from : '/dev/null';
    var toPath = to ? "b/" + to : '/dev/null';
    return "--- " + fromPath + "\n+++ " + toPath + "\n";
}
/**
 * Generates a string matching the format of a GNU unified diff header excluding
 * the (optional) timestamp fields with the appropriate from/to file names based
 * on the file state of the given WorkingDirectoryFileChange
 */
function formatPatchHeaderForFile(file) {
    switch (file.status) {
        case status_1.AppFileStatus.New:
            return formatPatchHeader(null, file.path);
        case status_1.AppFileStatus.Conflicted:
        // One might initially believe that renamed files should diff
        // against their old path. This is, after all, how git diff
        // does it right after a rename. But if we're creating a patch
        // to be applied along with a rename we must target the renamed
        // file.
        case status_1.AppFileStatus.Renamed:
        case status_1.AppFileStatus.Deleted:
        case status_1.AppFileStatus.Modified:
        case status_1.AppFileStatus.Copied:
            return formatPatchHeader(file.path, file.path);
    }
    throw new Error("Unknown file status " + file.status + ".");
}
/**
 * Generates a string matching the format of a GNU unified diff hunk header.
 * Note that this single line string includes a single trailing newline.
 *
 * @param oldStartLine The line in the old (or original) file where this diff
 *                     hunk starts.
 *
 * @param oldLineCount The number of lines in the old (or original) file that
 *                     this diff hunk covers.
 *
 * @param newStartLine The line in the new file where this diff hunk starts
 *
 * @param newLineCount The number of lines in the new file that this diff hunk
 *                     covers
 */
function formatHunkHeader(oldStartLine, oldLineCount, newStartLine, newLineCount, sectionHeading) {
    // > @@ -l,s +l,s @@ optional section heading
    // >
    // > The hunk range information contains two hunk ranges. The range for the hunk of the original
    // > file is preceded by a minus symbol, and the range for the new file is preceded by a plus
    // > symbol. Each hunk range is of the format l,s where l is the starting line number and s is
    // > the number of lines the change hunk applies to for each respective file.
    // >
    // > In many versions of GNU diff, each range can omit the comma and trailing value s,
    // > in which case s defaults to 1
    var lineInfoBefore = oldLineCount === 1
        ? "" + oldStartLine
        : oldStartLine + "," + oldLineCount;
    var lineInfoAfter = newLineCount === 1
        ? "" + newStartLine
        : newStartLine + "," + newLineCount;
    sectionHeading = sectionHeading ? " " + sectionHeading : '';
    return "@@ -" + lineInfoBefore + " +" + lineInfoAfter + " @@" + sectionHeading + "\n";
}
/**
 * Creates a GNU unified diff based on the original diff and a number
 * of selected or unselected lines (from file.selection). The patch is
 * formatted with the intention of being used for applying against an index
 * with git apply.
 *
 * Note that the file must have at least one selected addition or deletion,
 * ie it's not supported to use this method as a general purpose diff
 * formatter.
 *
 * @param file  The file that the resulting patch will be applied to.
 *              This is used to determine the from and to paths for the
 *              patch header as well as retrieving the line selection state
 *
 * @param diff  The source diff
 */
function formatPatch(file, diff) {
    var patch = '';
    diff.hunks.forEach(function (hunk, hunkIndex) {
        var hunkBuf = '';
        var oldCount = 0;
        var newCount = 0;
        var anyAdditionsOrDeletions = false;
        hunk.lines.forEach(function (line, lineIndex) {
            var absoluteIndex = hunk.unifiedDiffStart + lineIndex;
            // We write our own hunk headers
            if (line.type === diff_1.DiffLineType.Hunk) {
                return;
            }
            // Context lines can always be let through, they will
            // never appear for new files.
            if (line.type === diff_1.DiffLineType.Context) {
                hunkBuf += line.text + "\n";
                oldCount++;
                newCount++;
            }
            else if (file.selection.isSelected(absoluteIndex)) {
                // A line selected for inclusion.
                // Use the line as-is
                hunkBuf += line.text + "\n";
                if (line.type === diff_1.DiffLineType.Add) {
                    newCount++;
                }
                if (line.type === diff_1.DiffLineType.Delete) {
                    oldCount++;
                }
                anyAdditionsOrDeletions = true;
            }
            else {
                // Unselected lines in new files needs to be ignored. A new file by
                // definition only consists of additions and therefore so will the
                // partial patch. If the user has elected not to commit a particular
                // addition we need to generate a patch that pretends that the line
                // never existed.
                if (file.status === status_1.AppFileStatus.New) {
                    return;
                }
                // An unselected added line has no impact on this patch, pretend
                // it was never added to the old file by dropping it.
                if (line.type === diff_1.DiffLineType.Add) {
                    return;
                }
                // An unselected deleted line has never happened as far as this patch
                // is concerned which means that we should treat it as if it's still
                // in the old file so we'll convert it to a context line.
                if (line.type === diff_1.DiffLineType.Delete) {
                    hunkBuf += " " + line.text.substr(1) + "\n";
                    oldCount++;
                    newCount++;
                }
                else {
                    // Guarantee that we've covered all the line types
                    throw new Error("Unsupported line type " + line.type + ".");
                }
            }
            if (line.noTrailingNewLine) {
                hunkBuf += '\ No newline at end of file\n';
            }
        });
        // Skip writing this hunk if all there is is context lines.
        if (!anyAdditionsOrDeletions) {
            return;
        }
        patch += formatHunkHeader(hunk.header.oldStartLine, oldCount, hunk.header.newStartLine, newCount);
        patch += hunkBuf;
    });
    // If we get into this state we should never have been called in the first
    // place. Someone gave us a faulty diff and/or faulty selection state.
    if (!patch.length) {
        throw new Error("Could not generate a patch for file " + file.path + ", patch empty");
    }
    patch = formatPatchHeaderForFile(file) + patch;
    return patch;
}
exports.formatPatch = formatPatch;
//# sourceMappingURL=patch-formatter.js.map