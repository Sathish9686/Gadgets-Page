"use strict";
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
var DiffType;
(function (DiffType) {
    /** changes to a text file, which may be partially selected for commit */
    DiffType[DiffType["Text"] = 0] = "Text";
    /** changes to files of a known format, which can be viewed in the app */
    DiffType[DiffType["Image"] = 1] = "Image";
    /** changes to an unknown file format, which Git is unable to present in a human-friendly format */
    DiffType[DiffType["Binary"] = 2] = "Binary";
    /** change to a repository which is included as a submodule of this repository */
    DiffType[DiffType["Submodule"] = 3] = "Submodule";
})(DiffType = exports.DiffType || (exports.DiffType = {}));
/** indicate what a line in the diff represents */
var DiffLineType;
(function (DiffLineType) {
    DiffLineType[DiffLineType["Context"] = 0] = "Context";
    DiffLineType[DiffLineType["Add"] = 1] = "Add";
    DiffLineType[DiffLineType["Delete"] = 2] = "Delete";
    DiffLineType[DiffLineType["Hunk"] = 3] = "Hunk";
})(DiffLineType = exports.DiffLineType || (exports.DiffLineType = {}));
/** track details related to each line in the diff */
var DiffLine = /** @class */ (function () {
    function DiffLine(text, type, oldLineNumber, newLineNuber, noTrailingNewLine) {
        if (noTrailingNewLine === void 0) { noTrailingNewLine = false; }
        this.text = text;
        this.type = type;
        this.oldLineNumber = oldLineNumber;
        this.newLineNumber = newLineNuber;
        this.noTrailingNewLine = noTrailingNewLine;
    }
    DiffLine.prototype.withNoTrailingNewLine = function (noTrailingNewLine) {
        return new DiffLine(this.text, this.type, this.oldLineNumber, this.newLineNumber, noTrailingNewLine);
    };
    DiffLine.prototype.isIncludeableLine = function () {
        return this.type === DiffLineType.Add || this.type === DiffLineType.Delete;
    };
    return DiffLine;
}());
exports.DiffLine = DiffLine;
/** details about the start and end of a diff hunk */
var DiffHunkHeader = /** @class */ (function () {
    function DiffHunkHeader(oldStartLine, oldLineCount, newStartLine, newLineCount, sectionHeading) {
        this.oldStartLine = oldStartLine;
        this.oldLineCount = oldLineCount;
        this.newStartLine = newStartLine;
        this.newLineCount = newLineCount;
    }
    return DiffHunkHeader;
}());
exports.DiffHunkHeader = DiffHunkHeader;
/** each diff is made up of a number of hunks */
var DiffHunk = /** @class */ (function () {
    function DiffHunk(header, lines, unifiedDiffStart, unifiedDiffEnd) {
        this.header = header;
        this.unifiedDiffStart = unifiedDiffStart;
        this.unifiedDiffEnd = unifiedDiffEnd;
        this.lines = lines;
    }
    return DiffHunk;
}());
exports.DiffHunk = DiffHunk;
/**
 * A container for holding an image for display in the application
 */
var Image = /** @class */ (function () {
    function Image() {
    }
    return Image;
}());
exports.Image = Image;
var FileSummary = /** @class */ (function () {
    function FileSummary(path, added, removed) {
        this.path = path;
        this.added = added;
        this.removed = removed;
    }
    Object.defineProperty(FileSummary.prototype, "id", {
        /** An ID for the file change. */
        get: function () {
            return this.added + "+" + this.removed + "+" + this.path;
        },
        enumerable: true,
        configurable: true
    });
    return FileSummary;
}());
exports.FileSummary = FileSummary;
var DiffSelectionType;
(function (DiffSelectionType) {
    DiffSelectionType[DiffSelectionType["All"] = 0] = "All";
    DiffSelectionType[DiffSelectionType["Partial"] = 1] = "Partial";
    DiffSelectionType[DiffSelectionType["None"] = 2] = "None";
})(DiffSelectionType = exports.DiffSelectionType || (exports.DiffSelectionType = {}));
/**
 * Utility function which determines whether a boolean selection state
 * matches the given DiffSelectionType. A true selection state matches
 * DiffSelectionType.All, a false selection state matches
 * DiffSelectionType.None and if the selection type is partial there's
 * never a match.
 */
function typeMatchesSelection(selectionType, selected) {
    switch (selectionType) {
        case DiffSelectionType.All: return selected;
        case DiffSelectionType.None: return !selected;
        case DiffSelectionType.Partial: return false;
        default:
            throw new Error("Unknown selection type " + selectionType + ".");
    }
}
/**
 * An immutable, efficient, storage object for tracking selections of indexable
 * lines. While general purpose by design this is currently used exclusively for
 * tracking selected lines in modified files in the working directory.
 *
 * This class starts out with an initial (or default) selection state, ie
 * either all lines are selected by default or no lines are selected by default.
 *
 * The selection can then be transformed by marking a line or a range of lines
 * as selected or not selected. Internally the class maintains a list of lines
 * whose selection state has diverged from the default selection state.
 */
var DiffSelection = /** @class */ (function () {
    function DiffSelection(defaultSelectionType, divergingLines, selectableLines) {
        this.defaultSelectionType = defaultSelectionType;
        this.divergingLines = divergingLines || null;
        this.selectableLines = selectableLines || null;
    }
    /**
     * Initialize a new selection instance where either all lines are selected by default
     * or not lines are selected by default.
     */
    DiffSelection.fromInitialSelection = function (initialSelection) {
        if (initialSelection !== DiffSelectionType.All && initialSelection !== DiffSelectionType.None) {
            throw new Error('Can only instantiate a DiffSelection with All or None as the initial selection.');
        }
        return new DiffSelection(initialSelection, null, null);
    };
    /** Returns a value indicating the computed overall state of the selection */
    DiffSelection.prototype.getSelectionType = function () {
        var divergingLines = this.divergingLines;
        var selectableLines = this.selectableLines;
        // No diverging lines, happy path. Either all lines are selected or none are.
        if (!divergingLines) {
            return this.defaultSelectionType;
        }
        if (divergingLines.size === 0) {
            return this.defaultSelectionType;
        }
        // If we know which lines are selectable we need to check that
        // all lines are divergent and return the inverse of default selection.
        // To avoid looping through the set that often our happy path is
        // if there's a size mismatch.
        if (selectableLines && selectableLines.size === divergingLines.size) {
            var allSelectableLinesAreDivergent = __spread(selectableLines).every(function (i) { return divergingLines.has(i); });
            if (allSelectableLinesAreDivergent) {
                return this.defaultSelectionType === DiffSelectionType.All
                    ? DiffSelectionType.None
                    : DiffSelectionType.All;
            }
        }
        // Note that without any selectable lines we'll report partial selection
        // as long as we have any diverging lines since we have no way of knowing
        // if _all_ lines are divergent or not
        return DiffSelectionType.Partial;
    };
    /** Returns a value indicating wether the given line number is selected or not */
    DiffSelection.prototype.isSelected = function (lineIndex) {
        var lineIsDivergent = !!this.divergingLines && this.divergingLines.has(lineIndex);
        if (this.defaultSelectionType === DiffSelectionType.All) {
            return !lineIsDivergent;
        }
        else if (this.defaultSelectionType === DiffSelectionType.None) {
            return lineIsDivergent;
        }
        else {
            throw new Error("Unknown base selection type " + this.defaultSelectionType + ".");
        }
    };
    /**
     * Returns a value indicating wether the given line number is selectable.
     * A line not being selectable usually means it's a hunk header or a context
     * line.
     */
    DiffSelection.prototype.isSelectable = function (lineIndex) {
        return this.selectableLines
            ? this.selectableLines.has(lineIndex)
            : true;
    };
    /**
     * Returns a copy of this selection instance with the provided
     * line selection update.
     *
     * @param lineIndex The index (line number) of the line which should
     *                 be selected or unselected.
     *
     * @param selected Whether the given line number should be marked
     *                 as selected or not.
     */
    DiffSelection.prototype.withLineSelection = function (lineIndex, selected) {
        return this.withRangeSelection(lineIndex, 1, selected);
    };
    /**
     * Returns a copy of this selection instance with the provided
     * line selection update. This is similar to the withLineSelection
     * method except that it allows updating the selection state of
     * a range of lines at once. Use this if you ever need to modify
     * the selection state of more than one line at a time as it's
     * more efficient.
     *
     * @param from     The line index (inclusive) from where to start
     *                 updating the line selection state.
     *
     * @param to       The number of lines for which to update the
     *                 selection state. A value of zero means no lines
     *                 are updated and a value of 1 means only the
     *                 line given by lineIndex will be updated.
     *
     * @param selected Whether the lines should be marked as selected
     *                 or not.
     */
    // Lower inclusive, upper exclusive. Same as substring
    DiffSelection.prototype.withRangeSelection = function (from, length, selected) {
        var computedSelectionType = this.getSelectionType();
        var to = from + length;
        // Nothing for us to do here. This state is when all lines are already
        // selected and we're being asked to select more or when no lines are
        // selected and we're being asked to unselect something.
        if (typeMatchesSelection(computedSelectionType, selected)) {
            return this;
        }
        if (computedSelectionType === DiffSelectionType.Partial) {
            var newDivergingLines = new Set(this.divergingLines);
            if (typeMatchesSelection(this.defaultSelectionType, selected)) {
                for (var i = from; i < to; i++) {
                    newDivergingLines.delete(i);
                }
            }
            else {
                for (var i = from; i < to; i++) {
                    // Ensure it's selectable
                    if (this.isSelectable(i)) {
                        newDivergingLines.add(i);
                    }
                }
            }
            return new DiffSelection(this.defaultSelectionType, newDivergingLines.size === 0 ? null : newDivergingLines, this.selectableLines);
        }
        else {
            var newDivergingLines = new Set();
            for (var i = from; i < to; i++) {
                if (this.isSelectable(i)) {
                    newDivergingLines.add(i);
                }
            }
            return new DiffSelection(computedSelectionType, newDivergingLines, this.selectableLines);
        }
    };
    /**
     * Returns a copy of this selection instance where the selection state
     * of the specified line has been toggled (inverted).
     *
     * @param lineIndex The index (line number) of the line which should
     *                 be selected or unselected.
     */
    DiffSelection.prototype.withToggleLineSelection = function (lineIndex) {
        return this.withLineSelection(lineIndex, !this.isSelected(lineIndex));
    };
    /**
     * Returns a copy of this selection instance with all lines selected.
     */
    DiffSelection.prototype.withSelectAll = function () {
        return new DiffSelection(DiffSelectionType.All, null, this.selectableLines);
    };
    /**
     * Returns a copy of this selection instance with no lines selected.
     */
    DiffSelection.prototype.withSelectNone = function () {
        return new DiffSelection(DiffSelectionType.None, null, this.selectableLines);
    };
    /**
     * Returns a copy of this selection instance with a specified set of
     * selecable lines. By default a DiffSelection instance allows selecting
     * all lines (in fact, it has no notion of how many lines exists or what
     * it is that is being selected).
     *
     * If the selection instance lacks a set of selectable lines it can not
     * supply an accurate value from getSelectionType when the selection of
     * all lines have diverged from the default state (since it doesn't know
     * what all lines mean).
     */
    DiffSelection.prototype.withSelectableLines = function (selectableLines) {
        var divergingLines = this.divergingLines
            ? new Set(__spread(this.divergingLines).filter(function (x) { return selectableLines.has(x); }))
            : null;
        return new DiffSelection(this.defaultSelectionType, divergingLines, selectableLines);
    };
    return DiffSelection;
}());
exports.DiffSelection = DiffSelection;
//# sourceMappingURL=diff.js.map