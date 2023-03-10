"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var diff_1 = require("../model/diff");
// https://en.wikipedia.org/wiki/Diff_utility
//
// @@ -l,s +l,s @@ optional section heading
//
// The hunk range information contains two hunk ranges. The range for the hunk of the original
// file is preceded by a minus symbol, and the range for the new file is preceded by a plus
// symbol. Each hunk range is of the format l,s where l is the starting line number and s is
// the number of lines the change hunk applies to for each respective file.
//
// In many versions of GNU diff, each range can omit the comma and trailing value s,
// in which case s defaults to 1
var diffHeaderRe = /^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/;
var DiffPrefixAdd = '+';
var DiffPrefixDelete = '-';
var DiffPrefixContext = ' ';
var DiffPrefixNoNewline = '\\';
var DiffLinePrefixChars = new Set([DiffPrefixAdd, DiffPrefixDelete, DiffPrefixContext, DiffPrefixNoNewline]);
/**
 * A parser for the GNU unified diff format
 *
 * See https://www.gnu.org/software/diffutils/manual/html_node/Detailed-Unified.html
 */
var DiffParser = /** @class */ (function () {
    function DiffParser() {
        this.reset();
    }
    /**
     * Resets the internal parser state so that it can be reused.
     *
     * This is done automatically at the end of each parse run.
     */
    DiffParser.prototype.reset = function () {
        this.ls = 0;
        this.le = -1;
        this.text = '';
    };
    /**
     * Aligns the internal character pointers at the boundaries of
     * the next line.
     *
     * Returns true if successful or false if the end of the diff
     * has been reached.
     */
    DiffParser.prototype.nextLine = function () {
        this.ls = this.le + 1;
        // We've reached the end of the diff
        if (this.ls >= this.text.length) {
            return false;
        }
        this.le = this.text.indexOf('\n', this.ls);
        // If we can't find the next newline character we'll put our
        // end pointer at the end of the diff string
        if (this.le === -1) {
            this.le = this.text.length;
        }
        // We've succeeded if there's anything to read in between the
        // start and the end
        return this.ls !== this.le;
    };
    /**
     * Advances to the next line and returns it as a substring
     * of the raw diff text. Returns null if end of diff was
     * reached.
     */
    DiffParser.prototype.readLine = function () {
        return this.nextLine()
            ? this.text.substring(this.ls, this.le)
            : null;
    };
    /** Tests if the current line starts with the given search text */
    DiffParser.prototype.lineStartsWith = function (searchString) {
        return this.text.startsWith(searchString, this.ls);
    };
    /** Tests if the current line ends with the given search text */
    DiffParser.prototype.lineEndsWith = function (searchString) {
        return this.text.endsWith(searchString, this.le);
    };
    /**
     * Returns the starting character of the next line without
     * advancing the internal state. Returns null if advancing
     * would mean reaching the end of the diff.
     */
    DiffParser.prototype.peek = function () {
        var p = this.le + 1;
        return p < this.text.length ? this.text[p] : null;
    };
    /**
     * Parse the diff header, meaning everything from the
     * start of the diff output to the end of the line beginning
     * with +++
     *
     * Example diff header:
     *
     *   diff --git a/app/src/lib/diff-parser.ts b/app/src/lib/diff-parser.ts
     *   index e1d4871..3bd3ee0 100644
     *   --- a/app/src/lib/diff-parser.ts
     *   +++ b/app/src/lib/diff-parser.ts
     *
     * Returns an object with information extracted from the diff
     * header (currently whether it's a binary patch) or null if
     * the end of the diff was reached before the +++ line could be
     * found (which is a valid state).
     */
    DiffParser.prototype.parseDiffHeader = function () {
        // TODO: There's information in here that we might want to
        // capture, such as mode changes
        while (this.nextLine()) {
            if (this.lineStartsWith('Binary files ') && this.lineEndsWith('differ')) {
                return { isBinary: true };
            }
            if (this.lineStartsWith('+++')) {
                return { isBinary: false };
            }
        }
        // It's not an error to not find the +++ line, see the
        // 'parses diff of empty file' test in diff-parser-tests.ts
        return null;
    };
    /**
     * Attempts to convert a RegExp capture group into a number.
     * If the group doesn't exist or wasn't captured the function
     * will return the value of the defaultValue parameter or throw
     * an error if no default value was provided. If the captured
     * string can't be converted to a number an error will be thrown.
     */
    DiffParser.prototype.numberFromGroup = function (m, group, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        var str = m[group];
        if (!str) {
            if (!defaultValue) {
                throw new Error("Group " + group + " missing from regexp match and no defaultValue was provided");
            }
            return defaultValue;
        }
        var num = parseInt(str, 10);
        if (isNaN(num)) {
            throw new Error("Could not parse capture group " + group + " into number: " + str);
        }
        return num;
    };
    /**
     * Parses a hunk header or throws an error if the given line isn't
     * a well-formed hunk header.
     *
     * We currently only extract the line number information and
     * ignore any hunk headings.
     *
     * Example hunk header:
     *
     * @@ -84,10 +82,8 @@ export function parseRawDiff(lines: ReadonlyArray<string>): Diff {
     *
     * Where everything after the last @@ is what's known as the hunk, or section, heading
     */
    DiffParser.prototype.parseHunkHeader = function (line) {
        var m = diffHeaderRe.exec(line);
        if (!m) {
            throw new Error("Invalid hunk header format: '" + line + "'");
        }
        // If endLines are missing default to 1, see diffHeaderRe docs
        var oldStartLine = this.numberFromGroup(m, 1);
        var oldLineCount = this.numberFromGroup(m, 2, 1);
        var newStartLine = this.numberFromGroup(m, 3);
        var newLineCount = this.numberFromGroup(m, 4, 1);
        return new diff_1.DiffHunkHeader(oldStartLine, oldLineCount, newStartLine, newLineCount);
    };
    /**
     * Convenience function which lets us leverage the type system to
     * prove exhaustive checks in parseHunk.
     *
     * Takes an arbitrary string and checks to see if the first character
     * of that string is one of the allowed prefix characters for diff
     * lines (ie lines in between hunk headers).
     */
    DiffParser.prototype.parseLinePrefix = function (c) {
        // Since we know that DiffLinePrefixChars and the DiffLinePrefix type
        // include the same characters we can tell the type system that we
        // now know that c[0] is one of the characters in the DifflinePrefix set
        if (c && c.length && DiffLinePrefixChars.has(c[0])) {
            return c[0];
        }
        return null;
    };
    /**
     * Parses a hunk, including its header or throws an error if the diff doesn't
     * contain a well-formed diff hunk at the current position.
     *
     * Expects that the position has been advanced to the beginning of a presumed
     * diff hunk header.
     *
     * @param linesConsumed The number of unified diff lines consumed up until
     *                      this point by the diff parser. Used to give the
     *                      position and length (in lines) of the parsed hunk
     *                      relative to the overall parsed diff. These numbers
     *                      have no real meaning in the context of a diff and
     *                      are only used to aid the app in line-selections.
     */
    DiffParser.prototype.parseHunk = function (linesConsumed) {
        var headerLine = this.readLine();
        if (!headerLine) {
            throw new Error('Expected hunk header but reached end of diff');
        }
        var header = this.parseHunkHeader(headerLine);
        var lines = new Array();
        lines.push(new diff_1.DiffLine(headerLine, diff_1.DiffLineType.Hunk, null, null));
        var c;
        var rollingDiffBeforeCounter = header.oldStartLine;
        var rollingDiffAfterCounter = header.newStartLine;
        while ((c = this.parseLinePrefix(this.peek()))) {
            var line = this.readLine();
            if (!line) {
                throw new Error('Expected unified diff line but reached end of diff');
            }
            // A marker indicating that the last line in the original or the new file
            // is missing a trailing newline. In other words, the presence of this marker
            // means that the new and/or original file lacks a trailing newline.
            //
            // When we find it we have to look up the previous line and set the
            // noTrailingNewLine flag
            if (c === DiffPrefixNoNewline) {
                // See https://github.com/git/git/blob/21f862b498925194f8f1ebe8203b7a7df756555b/apply.c#L1725-L1732
                if (line.length < 12) {
                    throw new Error("Expected no newline at end of file marker but got " + line);
                }
                var previousLineIndex = lines.length - 1;
                var previousLine = lines[previousLineIndex];
                lines[previousLineIndex] = previousLine.withNoTrailingNewLine(true);
                continue;
            }
            var diffLine = void 0;
            if (c === DiffPrefixAdd) {
                diffLine = new diff_1.DiffLine(line, diff_1.DiffLineType.Add, null, rollingDiffAfterCounter++);
            }
            else if (c === DiffPrefixDelete) {
                diffLine = new diff_1.DiffLine(line, diff_1.DiffLineType.Delete, rollingDiffBeforeCounter++, null);
            }
            else if (c === DiffPrefixContext) {
                diffLine = new diff_1.DiffLine(line, diff_1.DiffLineType.Context, rollingDiffBeforeCounter++, rollingDiffAfterCounter++);
            }
            else {
                throw new Error("Unknown DiffLinePrefix: " + c + ".");
            }
            lines.push(diffLine);
        }
        if (lines.length === 1) {
            throw new Error('Malformed diff, empty hunk');
        }
        return new diff_1.DiffHunk(header, lines, linesConsumed, linesConsumed + lines.length - 1);
    };
    /**
     * Parse a well-formed unified diff into hunks and lines.
     *
     * @param text A unified diff produced by git diff, git log --patch
     *             or any other git plumbing command that produces unified
     *             diffs.
     */
    DiffParser.prototype.parse = function (text) {
        this.text = text;
        try {
            var headerInfo = this.parseDiffHeader();
            var headerEnd = this.le;
            var header = this.text.substring(0, headerEnd);
            // empty diff
            if (!headerInfo) {
                return { header: header, contents: '', hunks: [], isBinary: false };
            }
            if (headerInfo.isBinary) {
                return { header: header, contents: '', hunks: [], isBinary: true };
            }
            var hunks = new Array();
            var linesConsumed = 0;
            do {
                var hunk = this.parseHunk(linesConsumed);
                hunks.push(hunk);
                linesConsumed += hunk.lines.length;
            } while (this.peek());
            var contents = this.text
                .substring(headerEnd + 1, this.le)
                // Note that this simply returns a reference to the
                // substring if no match is found, it does not create
                // a new string instance.
                .replace(/\n\\ No newline at end of file/g, '');
            return { header: header, contents: contents, hunks: hunks, isBinary: headerInfo.isBinary };
        }
        finally {
            this.reset();
        }
    };
    return DiffParser;
}());
exports.DiffParser = DiffParser;
//# sourceMappingURL=diff-parser.js.map