"use strict";
/********************************************************************************
 * Copyright (C) 2018 Red Hat, Inc. and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
// copied from https://github.com/microsoft/vscode/blob/1.37.0/src/vs/workbench/api/common/extHostTypes.ts
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticTokensEdits = exports.SemanticTokensEdit = exports.SemanticTokens = exports.SemanticTokensBuilder = exports.SemanticTokensLegend = exports.TimelineItem = exports.CallHierarchyOutgoingCall = exports.CallHierarchyIncomingCall = exports.CallHierarchyItem = exports.UIKind = exports.WebviewPanelTargetArea = exports.OperatingSystem = exports.SelectionRange = exports.FoldingRangeKind = exports.FoldingRange = exports.ColorFormat = exports.ColorPresentation = exports.ColorInformation = exports.Color = exports.FunctionBreakpoint = exports.SourceBreakpoint = exports.Breakpoint = exports.LogLevel = exports.DebugAdapterServer = exports.DebugAdapterExecutable = exports.Task2 = exports.Task = exports.TaskScope = exports.TaskGroup = exports.ShellExecution = exports.TaskRevealKind = exports.TaskPanelKind = exports.ShellQuoting = exports.ProcessExecution = exports.ProgressLocation = exports.Progress = exports.ProgressOptions = exports.FileType = exports.FileSystemError = exports.FileChangeType = exports.CommentMode = exports.QuickInputButtons = exports.CommentThreadCollapsibleState = exports.DocumentSymbol = exports.SymbolInformation = exports.SymbolTag = exports.TreeItemCollapsibleState = exports.TreeItem = exports.WorkspaceEdit = exports.CodeAction = exports.TextDocumentSaveReason = exports.CodeActionKind = exports.CodeActionTrigger = exports.CodeLens = exports.DocumentLink = exports.DocumentHighlight = exports.DocumentHighlightKind = exports.Hover = exports.SignatureHelp = exports.SignatureHelpTriggerKind = exports.SignatureInformation = exports.ParameterInformation = exports.MarkerTag = exports.MarkerSeverity = exports.Diagnostic = exports.CompletionItemTag = exports.DiagnosticTag = exports.Location = exports.DiagnosticRelatedInformation = exports.DebugConsoleMode = exports.DiagnosticSeverity = exports.CompletionList = exports.CompletionItem = exports.CompletionItemKind = exports.CompletionTriggerKind = exports.TextEdit = exports.IndentAction = exports.RelativePattern = exports.ConfigurationTarget = exports.OverviewRulerLane = exports.DecorationRangeBehavior = exports.TextEditorRevealType = exports.ThemeIcon = exports.ThemeColor = exports.SnippetString = exports.EnvironmentVariableMutatorType = exports.EndOfLine = exports.Selection = exports.Range = exports.Position = exports.TextEditorSelectionChangeKind = exports.ColorTheme = exports.SourceControlInputBoxValidationType = exports.ColorThemeKind = exports.ViewColumn = exports.TextEditorLineNumbersStyle = exports.StatusBarAlignment = exports.Disposable = void 0;
/* eslint-disable no-null/no-null */
/* eslint-disable @typescript-eslint/no-explicit-any */
var uuid_1 = require("@phosphor/coreutils/lib/uuid");
var errors_1 = require("../common/errors");
var vscode_uri_1 = require("vscode-uri");
var paths_util_1 = require("../common/paths-util");
var strings_1 = require("@theia/core/lib/common/strings");
var markdown_string_1 = require("./markdown-string");
var plugin_api_rpc_model_1 = require("../common/plugin-api-rpc-model");
var files_1 = require("@theia/filesystem/lib/common/files");
var Disposable = /** @class */ (function () {
    function Disposable(func) {
        this.disposable = func;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Disposable.from = function () {
        var disposables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            disposables[_i] = arguments[_i];
        }
        return new Disposable(function () {
            var e_1, _a;
            if (disposables) {
                try {
                    for (var disposables_1 = __values(disposables), disposables_1_1 = disposables_1.next(); !disposables_1_1.done; disposables_1_1 = disposables_1.next()) {
                        var disposable = disposables_1_1.value;
                        if (disposable && typeof disposable.dispose === 'function') {
                            disposable.dispose();
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (disposables_1_1 && !disposables_1_1.done && (_a = disposables_1.return)) _a.call(disposables_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    /**
     * Dispose this object.
     */
    Disposable.prototype.dispose = function () {
        if (this.disposable) {
            this.disposable();
            this.disposable = undefined;
        }
    };
    Disposable.create = function (func) {
        return new Disposable(func);
    };
    return Disposable;
}());
exports.Disposable = Disposable;
var StatusBarAlignment;
(function (StatusBarAlignment) {
    StatusBarAlignment[StatusBarAlignment["Left"] = 1] = "Left";
    StatusBarAlignment[StatusBarAlignment["Right"] = 2] = "Right";
})(StatusBarAlignment = exports.StatusBarAlignment || (exports.StatusBarAlignment = {}));
var TextEditorLineNumbersStyle;
(function (TextEditorLineNumbersStyle) {
    TextEditorLineNumbersStyle[TextEditorLineNumbersStyle["Off"] = 0] = "Off";
    TextEditorLineNumbersStyle[TextEditorLineNumbersStyle["On"] = 1] = "On";
    TextEditorLineNumbersStyle[TextEditorLineNumbersStyle["Relative"] = 2] = "Relative";
})(TextEditorLineNumbersStyle = exports.TextEditorLineNumbersStyle || (exports.TextEditorLineNumbersStyle = {}));
/**
 * Denotes a column in the editor window.
 * Columns are used to show editors side by side.
 */
var ViewColumn;
(function (ViewColumn) {
    ViewColumn[ViewColumn["Active"] = -1] = "Active";
    ViewColumn[ViewColumn["Beside"] = -2] = "Beside";
    ViewColumn[ViewColumn["One"] = 1] = "One";
    ViewColumn[ViewColumn["Two"] = 2] = "Two";
    ViewColumn[ViewColumn["Three"] = 3] = "Three";
    ViewColumn[ViewColumn["Four"] = 4] = "Four";
    ViewColumn[ViewColumn["Five"] = 5] = "Five";
    ViewColumn[ViewColumn["Six"] = 6] = "Six";
    ViewColumn[ViewColumn["Seven"] = 7] = "Seven";
    ViewColumn[ViewColumn["Eight"] = 8] = "Eight";
    ViewColumn[ViewColumn["Nine"] = 9] = "Nine";
})(ViewColumn = exports.ViewColumn || (exports.ViewColumn = {}));
/**
 * Represents a color theme kind.
 */
var ColorThemeKind;
(function (ColorThemeKind) {
    ColorThemeKind[ColorThemeKind["Light"] = 1] = "Light";
    ColorThemeKind[ColorThemeKind["Dark"] = 2] = "Dark";
    ColorThemeKind[ColorThemeKind["HighContrast"] = 3] = "HighContrast";
})(ColorThemeKind = exports.ColorThemeKind || (exports.ColorThemeKind = {}));
/**
 * Represents the validation type of the Source Control input.
 */
var SourceControlInputBoxValidationType;
(function (SourceControlInputBoxValidationType) {
    /**
     * Something not allowed by the rules of a language or other means.
     */
    SourceControlInputBoxValidationType[SourceControlInputBoxValidationType["Error"] = 0] = "Error";
    /**
     * Something suspicious but allowed.
     */
    SourceControlInputBoxValidationType[SourceControlInputBoxValidationType["Warning"] = 1] = "Warning";
    /**
     * Something to inform about but not a problem.
     */
    SourceControlInputBoxValidationType[SourceControlInputBoxValidationType["Information"] = 2] = "Information";
})(SourceControlInputBoxValidationType = exports.SourceControlInputBoxValidationType || (exports.SourceControlInputBoxValidationType = {}));
var ColorTheme = /** @class */ (function () {
    function ColorTheme(kind) {
        this.kind = kind;
    }
    return ColorTheme;
}());
exports.ColorTheme = ColorTheme;
/**
 * Represents sources that can cause `window.onDidChangeEditorSelection`
 */
var TextEditorSelectionChangeKind;
(function (TextEditorSelectionChangeKind) {
    TextEditorSelectionChangeKind[TextEditorSelectionChangeKind["Keyboard"] = 1] = "Keyboard";
    TextEditorSelectionChangeKind[TextEditorSelectionChangeKind["Mouse"] = 2] = "Mouse";
    TextEditorSelectionChangeKind[TextEditorSelectionChangeKind["Command"] = 3] = "Command";
})(TextEditorSelectionChangeKind = exports.TextEditorSelectionChangeKind || (exports.TextEditorSelectionChangeKind = {}));
(function (TextEditorSelectionChangeKind) {
    function fromValue(s) {
        switch (s) {
            case 'keyboard': return TextEditorSelectionChangeKind.Keyboard;
            case 'mouse': return TextEditorSelectionChangeKind.Mouse;
            case 'api': return TextEditorSelectionChangeKind.Command;
        }
        return undefined;
    }
    TextEditorSelectionChangeKind.fromValue = fromValue;
})(TextEditorSelectionChangeKind = exports.TextEditorSelectionChangeKind || (exports.TextEditorSelectionChangeKind = {}));
var Position = /** @class */ (function () {
    function Position(line, char) {
        if (line < 0) {
            throw new Error('line number cannot be negative');
        }
        if (char < 0) {
            throw new Error('char number cannot be negative');
        }
        this._line = line;
        this._character = char;
    }
    Object.defineProperty(Position.prototype, "line", {
        get: function () {
            return this._line;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Position.prototype, "character", {
        get: function () {
            return this._character;
        },
        enumerable: false,
        configurable: true
    });
    Position.prototype.isBefore = function (other) {
        if (this._line < other._line) {
            return true;
        }
        if (other._line < this._line) {
            return false;
        }
        return this._character < other._character;
    };
    Position.prototype.isBeforeOrEqual = function (other) {
        if (this._line < other._line) {
            return true;
        }
        if (other._line < this._line) {
            return false;
        }
        return this._character <= other._character;
    };
    Position.prototype.isAfter = function (other) {
        return !this.isBeforeOrEqual(other);
    };
    Position.prototype.isAfterOrEqual = function (other) {
        return !this.isBefore(other);
    };
    Position.prototype.isEqual = function (other) {
        return this._line === other._line && this._character === other._character;
    };
    Position.prototype.compareTo = function (other) {
        if (this._line < other._line) {
            return -1;
        }
        else if (this._line > other.line) {
            return 1;
        }
        else {
            // equal line
            if (this._character < other._character) {
                return -1;
            }
            else if (this._character > other._character) {
                return 1;
            }
            else {
                // equal line and character
                return 0;
            }
        }
    };
    Position.prototype.translate = function (lineDeltaOrChange, characterDelta) {
        if (characterDelta === void 0) { characterDelta = 0; }
        if (lineDeltaOrChange === null || characterDelta === null) {
            throw errors_1.illegalArgument();
        }
        var lineDelta;
        if (typeof lineDeltaOrChange === 'undefined') {
            lineDelta = 0;
        }
        else if (typeof lineDeltaOrChange === 'number') {
            lineDelta = lineDeltaOrChange;
        }
        else {
            lineDelta = typeof lineDeltaOrChange.lineDelta === 'number' ? lineDeltaOrChange.lineDelta : 0;
            characterDelta = typeof lineDeltaOrChange.characterDelta === 'number' ? lineDeltaOrChange.characterDelta : 0;
        }
        if (lineDelta === 0 && characterDelta === 0) {
            return this;
        }
        return new Position(this.line + lineDelta, this.character + characterDelta);
    };
    Position.prototype.with = function (lineOrChange, character) {
        if (character === void 0) { character = this.character; }
        if (lineOrChange === null || character === null) {
            throw errors_1.illegalArgument();
        }
        var line;
        if (typeof lineOrChange === 'undefined') {
            line = this.line;
        }
        else if (typeof lineOrChange === 'number') {
            line = lineOrChange;
        }
        else {
            line = typeof lineOrChange.line === 'number' ? lineOrChange.line : this.line;
            character = typeof lineOrChange.character === 'number' ? lineOrChange.character : this.character;
        }
        if (line === this.line && character === this.character) {
            return this;
        }
        return new Position(line, character);
    };
    Position.Min = function () {
        var e_2, _a;
        var positions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            positions[_i] = arguments[_i];
        }
        var result = positions.pop();
        try {
            for (var positions_1 = __values(positions), positions_1_1 = positions_1.next(); !positions_1_1.done; positions_1_1 = positions_1.next()) {
                var p = positions_1_1.value;
                if (p.isBefore(result)) {
                    result = p;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (positions_1_1 && !positions_1_1.done && (_a = positions_1.return)) _a.call(positions_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
    };
    Position.Max = function () {
        var e_3, _a;
        var positions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            positions[_i] = arguments[_i];
        }
        var result = positions.pop();
        try {
            for (var positions_2 = __values(positions), positions_2_1 = positions_2.next(); !positions_2_1.done; positions_2_1 = positions_2.next()) {
                var p = positions_2_1.value;
                if (p.isAfter(result)) {
                    result = p;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (positions_2_1 && !positions_2_1.done && (_a = positions_2.return)) _a.call(positions_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return result;
    };
    Position.isPosition = function (other) {
        if (!other) {
            return false;
        }
        if (other instanceof Position) {
            return true;
        }
        var _a = other, line = _a.line, character = _a.character;
        if (typeof line === 'number' && typeof character === 'number') {
            return true;
        }
        return false;
    };
    return Position;
}());
exports.Position = Position;
var Range = /** @class */ (function () {
    function Range(startLineOrStart, startColumnOrEnd, endLine, endColumn) {
        var start = undefined;
        var end = undefined;
        if (typeof startLineOrStart === 'number' && typeof startColumnOrEnd === 'number' && typeof endLine === 'number' && typeof endColumn === 'number') {
            start = new Position(startLineOrStart, startColumnOrEnd);
            end = new Position(endLine, endColumn);
        }
        else if (startLineOrStart instanceof Position && startColumnOrEnd instanceof Position) {
            start = startLineOrStart;
            end = startColumnOrEnd;
        }
        if (!start || !end) {
            throw new Error('Invalid arguments');
        }
        if (start.isBefore(end)) {
            this._start = start;
            this._end = end;
        }
        else {
            this._start = end;
            this._end = start;
        }
    }
    Object.defineProperty(Range.prototype, "start", {
        get: function () {
            return this._start;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "end", {
        get: function () {
            return this._end;
        },
        enumerable: false,
        configurable: true
    });
    Range.prototype.contains = function (positionOrRange) {
        if (positionOrRange instanceof Range) {
            return this.contains(positionOrRange._start)
                && this.contains(positionOrRange._end);
        }
        else if (positionOrRange instanceof Position) {
            if (positionOrRange.isBefore(this._start)) {
                return false;
            }
            if (this._end.isBefore(positionOrRange)) {
                return false;
            }
            return true;
        }
        return false;
    };
    Range.prototype.isEqual = function (other) {
        return this._start.isEqual(other._start) && this._end.isEqual(other._end);
    };
    Range.prototype.intersection = function (other) {
        var start = Position.Max(other.start, this._start);
        var end = Position.Min(other.end, this._end);
        if (start.isAfter(end)) {
            // this happens when there is no overlap:
            // |-----|
            //          |----|
            return undefined;
        }
        return new Range(start, end);
    };
    Range.prototype.union = function (other) {
        if (this.contains(other)) {
            return this;
        }
        else if (other.contains(this)) {
            return other;
        }
        var start = Position.Min(other.start, this._start);
        var end = Position.Max(other.end, this.end);
        return new Range(start, end);
    };
    Object.defineProperty(Range.prototype, "isEmpty", {
        get: function () {
            return this._start.isEqual(this._end);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "isSingleLine", {
        get: function () {
            return this._start.line === this._end.line;
        },
        enumerable: false,
        configurable: true
    });
    Range.prototype.with = function (startOrChange, end) {
        if (end === void 0) { end = this.end; }
        if (startOrChange === null || end === null) {
            throw errors_1.illegalArgument();
        }
        var start;
        if (!startOrChange) {
            start = this.start;
        }
        else if (Position.isPosition(startOrChange)) {
            start = startOrChange;
        }
        else {
            start = startOrChange.start || this.start;
            end = startOrChange.end || this.end;
        }
        if (start.isEqual(this._start) && end.isEqual(this.end)) {
            return this;
        }
        return new Range(start, end);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Range.isRange = function (thing) {
        if (thing instanceof Range) {
            return true;
        }
        if (!thing) {
            return false;
        }
        return Position.isPosition(thing.start)
            && Position.isPosition(thing.end);
    };
    return Range;
}());
exports.Range = Range;
var Selection = /** @class */ (function (_super) {
    __extends(Selection, _super);
    function Selection(anchorLineOrAnchor, anchorColumnOrActive, activeLine, activeColumn) {
        var _this = this;
        var anchor = undefined;
        var active = undefined;
        if (typeof anchorLineOrAnchor === 'number' && typeof anchorColumnOrActive === 'number' && typeof activeLine === 'number' && typeof activeColumn === 'number') {
            anchor = new Position(anchorLineOrAnchor, anchorColumnOrActive);
            active = new Position(activeLine, activeColumn);
        }
        else if (anchorLineOrAnchor instanceof Position && anchorColumnOrActive instanceof Position) {
            anchor = anchorLineOrAnchor;
            active = anchorColumnOrActive;
        }
        if (!anchor || !active) {
            throw new Error('Invalid arguments');
        }
        _this = _super.call(this, anchor, active) || this;
        _this._anchor = anchor;
        _this._active = active;
        return _this;
    }
    Object.defineProperty(Selection.prototype, "active", {
        get: function () {
            return this._active;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "anchor", {
        get: function () {
            return this._anchor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "isReversed", {
        get: function () {
            return this._anchor === this._end;
        },
        enumerable: false,
        configurable: true
    });
    return Selection;
}(Range));
exports.Selection = Selection;
var EndOfLine;
(function (EndOfLine) {
    EndOfLine[EndOfLine["LF"] = 1] = "LF";
    EndOfLine[EndOfLine["CRLF"] = 2] = "CRLF";
})(EndOfLine = exports.EndOfLine || (exports.EndOfLine = {}));
var EnvironmentVariableMutatorType;
(function (EnvironmentVariableMutatorType) {
    EnvironmentVariableMutatorType[EnvironmentVariableMutatorType["Replace"] = 1] = "Replace";
    EnvironmentVariableMutatorType[EnvironmentVariableMutatorType["Append"] = 2] = "Append";
    EnvironmentVariableMutatorType[EnvironmentVariableMutatorType["Prepend"] = 3] = "Prepend";
})(EnvironmentVariableMutatorType = exports.EnvironmentVariableMutatorType || (exports.EnvironmentVariableMutatorType = {}));
var SnippetString = /** @class */ (function () {
    function SnippetString(value) {
        this._tabstop = 1;
        this.value = value || '';
    }
    SnippetString.isSnippetString = function (thing) {
        if (thing instanceof SnippetString) {
            return true;
        }
        if (!thing) {
            return false;
        }
        return typeof thing.value === 'string';
    };
    SnippetString._escape = function (value) {
        return value.replace(/\$|}|\\/g, '\\$&');
    };
    SnippetString.prototype.appendText = function (string) {
        this.value += SnippetString._escape(string);
        return this;
    };
    SnippetString.prototype.appendTabstop = function (number) {
        if (number === void 0) { number = this._tabstop++; }
        this.value += '$';
        this.value += number;
        return this;
    };
    SnippetString.prototype.appendPlaceholder = function (value, number) {
        if (number === void 0) { number = this._tabstop++; }
        if (typeof value === 'function') {
            var nested = new SnippetString();
            nested._tabstop = this._tabstop;
            value(nested);
            this._tabstop = nested._tabstop;
            value = nested.value;
        }
        else {
            value = SnippetString._escape(value);
        }
        this.value += '${';
        this.value += number;
        this.value += ':';
        this.value += value;
        this.value += '}';
        return this;
    };
    SnippetString.prototype.appendVariable = function (name, defaultValue) {
        if (typeof defaultValue === 'function') {
            var nested = new SnippetString();
            nested._tabstop = this._tabstop;
            defaultValue(nested);
            this._tabstop = nested._tabstop;
            defaultValue = nested.value;
        }
        else if (typeof defaultValue === 'string') {
            defaultValue = defaultValue.replace(/\$|}/g, '\\$&');
        }
        this.value += '${';
        this.value += name;
        if (defaultValue) {
            this.value += ':';
            this.value += defaultValue;
        }
        this.value += '}';
        return this;
    };
    return SnippetString;
}());
exports.SnippetString = SnippetString;
var ThemeColor = /** @class */ (function () {
    function ThemeColor(id) {
        this.id = id;
    }
    return ThemeColor;
}());
exports.ThemeColor = ThemeColor;
var ThemeIcon = /** @class */ (function () {
    function ThemeIcon(id) {
        this.id = id;
    }
    ThemeIcon.File = new ThemeIcon('file');
    ThemeIcon.Folder = new ThemeIcon('folder');
    return ThemeIcon;
}());
exports.ThemeIcon = ThemeIcon;
var TextEditorRevealType;
(function (TextEditorRevealType) {
    TextEditorRevealType[TextEditorRevealType["Default"] = 0] = "Default";
    TextEditorRevealType[TextEditorRevealType["InCenter"] = 1] = "InCenter";
    TextEditorRevealType[TextEditorRevealType["InCenterIfOutsideViewport"] = 2] = "InCenterIfOutsideViewport";
    TextEditorRevealType[TextEditorRevealType["AtTop"] = 3] = "AtTop";
})(TextEditorRevealType = exports.TextEditorRevealType || (exports.TextEditorRevealType = {}));
/**
 * These values match very carefully the values of `TrackedRangeStickiness`
 */
var DecorationRangeBehavior;
(function (DecorationRangeBehavior) {
    /**
     * TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges
     */
    DecorationRangeBehavior[DecorationRangeBehavior["OpenOpen"] = 0] = "OpenOpen";
    /**
     * TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges
     */
    DecorationRangeBehavior[DecorationRangeBehavior["ClosedClosed"] = 1] = "ClosedClosed";
    /**
     * TrackedRangeStickiness.GrowsOnlyWhenTypingBefore
     */
    DecorationRangeBehavior[DecorationRangeBehavior["OpenClosed"] = 2] = "OpenClosed";
    /**
     * TrackedRangeStickiness.GrowsOnlyWhenTypingAfter
     */
    DecorationRangeBehavior[DecorationRangeBehavior["ClosedOpen"] = 3] = "ClosedOpen";
})(DecorationRangeBehavior = exports.DecorationRangeBehavior || (exports.DecorationRangeBehavior = {}));
/**
 * Vertical Lane in the overview ruler of the editor.
 */
var OverviewRulerLane;
(function (OverviewRulerLane) {
    OverviewRulerLane[OverviewRulerLane["Left"] = 1] = "Left";
    OverviewRulerLane[OverviewRulerLane["Center"] = 2] = "Center";
    OverviewRulerLane[OverviewRulerLane["Right"] = 4] = "Right";
    OverviewRulerLane[OverviewRulerLane["Full"] = 7] = "Full";
})(OverviewRulerLane = exports.OverviewRulerLane || (exports.OverviewRulerLane = {}));
var ConfigurationTarget;
(function (ConfigurationTarget) {
    ConfigurationTarget[ConfigurationTarget["Global"] = 1] = "Global";
    ConfigurationTarget[ConfigurationTarget["Workspace"] = 2] = "Workspace";
    ConfigurationTarget[ConfigurationTarget["WorkspaceFolder"] = 3] = "WorkspaceFolder";
    ConfigurationTarget[ConfigurationTarget["Default"] = 4] = "Default";
    ConfigurationTarget[ConfigurationTarget["Memory"] = 5] = "Memory";
})(ConfigurationTarget = exports.ConfigurationTarget || (exports.ConfigurationTarget = {}));
var RelativePattern = /** @class */ (function () {
    function RelativePattern(base, pattern) {
        this.pattern = pattern;
        if (typeof base !== 'string') {
            if (!base || !vscode_uri_1.URI.isUri(base.uri)) {
                throw errors_1.illegalArgument('base');
            }
        }
        if (typeof pattern !== 'string') {
            throw errors_1.illegalArgument('pattern');
        }
        this.base = typeof base === 'string' ? base : base.uri.fsPath;
    }
    RelativePattern.prototype.pathToRelative = function (from, to) {
        return paths_util_1.relative(from, to);
    };
    return RelativePattern;
}());
exports.RelativePattern = RelativePattern;
var IndentAction;
(function (IndentAction) {
    IndentAction[IndentAction["None"] = 0] = "None";
    IndentAction[IndentAction["Indent"] = 1] = "Indent";
    IndentAction[IndentAction["IndentOutdent"] = 2] = "IndentOutdent";
    IndentAction[IndentAction["Outdent"] = 3] = "Outdent";
})(IndentAction = exports.IndentAction || (exports.IndentAction = {}));
var TextEdit = /** @class */ (function () {
    function TextEdit(range, newText) {
        this.range = range;
        this.newText = newText;
    }
    Object.defineProperty(TextEdit.prototype, "range", {
        get: function () {
            return this._range;
        },
        set: function (value) {
            if (value && !Range.isRange(value)) {
                throw errors_1.illegalArgument('range');
            }
            this._range = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextEdit.prototype, "newText", {
        get: function () {
            return this._newText || '';
        },
        set: function (value) {
            if (value && typeof value !== 'string') {
                throw errors_1.illegalArgument('newText');
            }
            this._newText = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextEdit.prototype, "newEol", {
        get: function () {
            return this._newEol;
        },
        set: function (value) {
            if (value && typeof value !== 'number') {
                throw errors_1.illegalArgument('newEol');
            }
            this._newEol = value;
        },
        enumerable: false,
        configurable: true
    });
    TextEdit.isTextEdit = function (thing) {
        if (thing instanceof TextEdit) {
            return true;
        }
        if (!thing) {
            return false;
        }
        return Range.isRange(thing.range)
            && typeof thing.newText === 'string';
    };
    TextEdit.replace = function (range, newText) {
        return new TextEdit(range, newText);
    };
    TextEdit.insert = function (position, newText) {
        return TextEdit.replace(new Range(position, position), newText);
    };
    TextEdit.delete = function (range) {
        return TextEdit.replace(range, '');
    };
    TextEdit.setEndOfLine = function (eol) {
        var ret = new TextEdit(undefined, undefined);
        ret.newEol = eol;
        return ret;
    };
    return TextEdit;
}());
exports.TextEdit = TextEdit;
var CompletionTriggerKind;
(function (CompletionTriggerKind) {
    CompletionTriggerKind[CompletionTriggerKind["Invoke"] = 0] = "Invoke";
    CompletionTriggerKind[CompletionTriggerKind["TriggerCharacter"] = 1] = "TriggerCharacter";
    CompletionTriggerKind[CompletionTriggerKind["TriggerForIncompleteCompletions"] = 2] = "TriggerForIncompleteCompletions";
})(CompletionTriggerKind = exports.CompletionTriggerKind || (exports.CompletionTriggerKind = {}));
var CompletionItemKind;
(function (CompletionItemKind) {
    CompletionItemKind[CompletionItemKind["Text"] = 0] = "Text";
    CompletionItemKind[CompletionItemKind["Method"] = 1] = "Method";
    CompletionItemKind[CompletionItemKind["Function"] = 2] = "Function";
    CompletionItemKind[CompletionItemKind["Constructor"] = 3] = "Constructor";
    CompletionItemKind[CompletionItemKind["Field"] = 4] = "Field";
    CompletionItemKind[CompletionItemKind["Variable"] = 5] = "Variable";
    CompletionItemKind[CompletionItemKind["Class"] = 6] = "Class";
    CompletionItemKind[CompletionItemKind["Interface"] = 7] = "Interface";
    CompletionItemKind[CompletionItemKind["Module"] = 8] = "Module";
    CompletionItemKind[CompletionItemKind["Property"] = 9] = "Property";
    CompletionItemKind[CompletionItemKind["Unit"] = 10] = "Unit";
    CompletionItemKind[CompletionItemKind["Value"] = 11] = "Value";
    CompletionItemKind[CompletionItemKind["Enum"] = 12] = "Enum";
    CompletionItemKind[CompletionItemKind["Keyword"] = 13] = "Keyword";
    CompletionItemKind[CompletionItemKind["Snippet"] = 14] = "Snippet";
    CompletionItemKind[CompletionItemKind["Color"] = 15] = "Color";
    CompletionItemKind[CompletionItemKind["File"] = 16] = "File";
    CompletionItemKind[CompletionItemKind["Reference"] = 17] = "Reference";
    CompletionItemKind[CompletionItemKind["Folder"] = 18] = "Folder";
    CompletionItemKind[CompletionItemKind["EnumMember"] = 19] = "EnumMember";
    CompletionItemKind[CompletionItemKind["Constant"] = 20] = "Constant";
    CompletionItemKind[CompletionItemKind["Struct"] = 21] = "Struct";
    CompletionItemKind[CompletionItemKind["Event"] = 22] = "Event";
    CompletionItemKind[CompletionItemKind["Operator"] = 23] = "Operator";
    CompletionItemKind[CompletionItemKind["TypeParameter"] = 24] = "TypeParameter";
})(CompletionItemKind = exports.CompletionItemKind || (exports.CompletionItemKind = {}));
var CompletionItem = /** @class */ (function () {
    function CompletionItem(label, kind) {
        this.label = label;
        this.kind = kind;
    }
    return CompletionItem;
}());
exports.CompletionItem = CompletionItem;
var CompletionList = /** @class */ (function () {
    function CompletionList(items, isIncomplete) {
        if (items === void 0) { items = []; }
        if (isIncomplete === void 0) { isIncomplete = false; }
        this.items = items;
        this.isIncomplete = isIncomplete;
    }
    return CompletionList;
}());
exports.CompletionList = CompletionList;
var DiagnosticSeverity;
(function (DiagnosticSeverity) {
    DiagnosticSeverity[DiagnosticSeverity["Error"] = 0] = "Error";
    DiagnosticSeverity[DiagnosticSeverity["Warning"] = 1] = "Warning";
    DiagnosticSeverity[DiagnosticSeverity["Information"] = 2] = "Information";
    DiagnosticSeverity[DiagnosticSeverity["Hint"] = 3] = "Hint";
})(DiagnosticSeverity = exports.DiagnosticSeverity || (exports.DiagnosticSeverity = {}));
var DebugConsoleMode;
(function (DebugConsoleMode) {
    DebugConsoleMode[DebugConsoleMode["Separate"] = 0] = "Separate";
    DebugConsoleMode[DebugConsoleMode["MergeWithParent"] = 1] = "MergeWithParent";
})(DebugConsoleMode = exports.DebugConsoleMode || (exports.DebugConsoleMode = {}));
var DiagnosticRelatedInformation = /** @class */ (function () {
    function DiagnosticRelatedInformation(location, message) {
        this.location = location;
        this.message = message;
    }
    return DiagnosticRelatedInformation;
}());
exports.DiagnosticRelatedInformation = DiagnosticRelatedInformation;
var Location = /** @class */ (function () {
    function Location(uri, rangeOrPosition) {
        this.uri = uri;
        if (rangeOrPosition instanceof Range) {
            this.range = rangeOrPosition;
        }
        else if (rangeOrPosition instanceof Position) {
            this.range = new Range(rangeOrPosition, rangeOrPosition);
        }
    }
    Location.isLocation = function (thing) {
        if (thing instanceof Location) {
            return true;
        }
        if (!thing) {
            return false;
        }
        return Range.isRange(thing.range)
            && vscode_uri_1.URI.isUri(thing.uri);
    };
    return Location;
}());
exports.Location = Location;
var DiagnosticTag;
(function (DiagnosticTag) {
    DiagnosticTag[DiagnosticTag["Unnecessary"] = 1] = "Unnecessary";
})(DiagnosticTag = exports.DiagnosticTag || (exports.DiagnosticTag = {}));
var CompletionItemTag;
(function (CompletionItemTag) {
    CompletionItemTag[CompletionItemTag["Deprecated"] = 1] = "Deprecated";
})(CompletionItemTag = exports.CompletionItemTag || (exports.CompletionItemTag = {}));
var Diagnostic = /** @class */ (function () {
    function Diagnostic(range, message, severity) {
        if (severity === void 0) { severity = DiagnosticSeverity.Error; }
        this.range = range;
        this.message = message;
        this.severity = severity;
    }
    return Diagnostic;
}());
exports.Diagnostic = Diagnostic;
var MarkerSeverity;
(function (MarkerSeverity) {
    MarkerSeverity[MarkerSeverity["Hint"] = 1] = "Hint";
    MarkerSeverity[MarkerSeverity["Info"] = 2] = "Info";
    MarkerSeverity[MarkerSeverity["Warning"] = 4] = "Warning";
    MarkerSeverity[MarkerSeverity["Error"] = 8] = "Error";
})(MarkerSeverity = exports.MarkerSeverity || (exports.MarkerSeverity = {}));
var MarkerTag;
(function (MarkerTag) {
    MarkerTag[MarkerTag["Unnecessary"] = 1] = "Unnecessary";
})(MarkerTag = exports.MarkerTag || (exports.MarkerTag = {}));
var ParameterInformation = /** @class */ (function () {
    function ParameterInformation(label, documentation) {
        this.label = label;
        this.documentation = documentation;
    }
    return ParameterInformation;
}());
exports.ParameterInformation = ParameterInformation;
var SignatureInformation = /** @class */ (function () {
    function SignatureInformation(label, documentation) {
        this.label = label;
        this.documentation = documentation;
        this.parameters = [];
    }
    return SignatureInformation;
}());
exports.SignatureInformation = SignatureInformation;
var SignatureHelpTriggerKind;
(function (SignatureHelpTriggerKind) {
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["Invoke"] = 1] = "Invoke";
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["TriggerCharacter"] = 2] = "TriggerCharacter";
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["ContentChange"] = 3] = "ContentChange";
})(SignatureHelpTriggerKind = exports.SignatureHelpTriggerKind || (exports.SignatureHelpTriggerKind = {}));
var SignatureHelp = /** @class */ (function () {
    function SignatureHelp() {
        this.signatures = [];
    }
    return SignatureHelp;
}());
exports.SignatureHelp = SignatureHelp;
var Hover = /** @class */ (function () {
    function Hover(contents, range) {
        if (!contents) {
            errors_1.illegalArgument('contents must be defined');
        }
        if (Array.isArray(contents)) {
            this.contents = contents;
        }
        else if (markdown_string_1.isMarkdownString(contents)) {
            this.contents = [contents];
        }
        else {
            this.contents = [contents];
        }
        this.range = range;
    }
    return Hover;
}());
exports.Hover = Hover;
var DocumentHighlightKind;
(function (DocumentHighlightKind) {
    DocumentHighlightKind[DocumentHighlightKind["Text"] = 0] = "Text";
    DocumentHighlightKind[DocumentHighlightKind["Read"] = 1] = "Read";
    DocumentHighlightKind[DocumentHighlightKind["Write"] = 2] = "Write";
})(DocumentHighlightKind = exports.DocumentHighlightKind || (exports.DocumentHighlightKind = {}));
var DocumentHighlight = /** @class */ (function () {
    function DocumentHighlight(range, kind) {
        this.range = range;
        this.kind = kind;
    }
    return DocumentHighlight;
}());
exports.DocumentHighlight = DocumentHighlight;
var DocumentLink = /** @class */ (function () {
    function DocumentLink(range, target) {
        if (target && !(vscode_uri_1.URI.isUri(target))) {
            throw errors_1.illegalArgument('target');
        }
        if (!Range.isRange(range) || range.isEmpty) {
            throw errors_1.illegalArgument('range');
        }
        this.range = range;
        this.target = target;
    }
    return DocumentLink;
}());
exports.DocumentLink = DocumentLink;
var CodeLens = /** @class */ (function () {
    function CodeLens(range, command) {
        this.range = range;
        this.command = command;
    }
    Object.defineProperty(CodeLens.prototype, "isResolved", {
        get: function () {
            return !!this.command;
        },
        enumerable: false,
        configurable: true
    });
    return CodeLens;
}());
exports.CodeLens = CodeLens;
var CodeActionTrigger;
(function (CodeActionTrigger) {
    CodeActionTrigger[CodeActionTrigger["Automatic"] = 1] = "Automatic";
    CodeActionTrigger[CodeActionTrigger["Manual"] = 2] = "Manual";
})(CodeActionTrigger = exports.CodeActionTrigger || (exports.CodeActionTrigger = {}));
var CodeActionKind = /** @class */ (function () {
    function CodeActionKind(value) {
        this.value = value;
    }
    CodeActionKind.prototype.append = function (parts) {
        return new CodeActionKind(this.value ? this.value + CodeActionKind.sep + parts : parts);
    };
    CodeActionKind.prototype.contains = function (other) {
        return this.value === other.value || strings_1.startsWithIgnoreCase(other.value, this.value + CodeActionKind.sep);
    };
    CodeActionKind.prototype.intersects = function (other) {
        return this.contains(other) || other.contains(this);
    };
    CodeActionKind.sep = '.';
    CodeActionKind.Empty = new CodeActionKind('');
    CodeActionKind.QuickFix = CodeActionKind.Empty.append('quickfix');
    CodeActionKind.Refactor = CodeActionKind.Empty.append('refactor');
    CodeActionKind.RefactorExtract = CodeActionKind.Refactor.append('extract');
    CodeActionKind.RefactorInline = CodeActionKind.Refactor.append('inline');
    CodeActionKind.RefactorRewrite = CodeActionKind.Refactor.append('rewrite');
    CodeActionKind.Source = CodeActionKind.Empty.append('source');
    CodeActionKind.SourceOrganizeImports = CodeActionKind.Source.append('organizeImports');
    CodeActionKind.SourceFixAll = CodeActionKind.Source.append('fixAll');
    return CodeActionKind;
}());
exports.CodeActionKind = CodeActionKind;
var TextDocumentSaveReason;
(function (TextDocumentSaveReason) {
    TextDocumentSaveReason[TextDocumentSaveReason["Manual"] = 1] = "Manual";
    TextDocumentSaveReason[TextDocumentSaveReason["AfterDelay"] = 2] = "AfterDelay";
    TextDocumentSaveReason[TextDocumentSaveReason["FocusOut"] = 3] = "FocusOut";
})(TextDocumentSaveReason = exports.TextDocumentSaveReason || (exports.TextDocumentSaveReason = {}));
var CodeAction = /** @class */ (function () {
    function CodeAction(title, kind) {
        this.title = title;
        this.kind = kind;
    }
    return CodeAction;
}());
exports.CodeAction = CodeAction;
var WorkspaceEdit = /** @class */ (function () {
    function WorkspaceEdit() {
        this._edits = new Array();
    }
    WorkspaceEdit.prototype.renameFile = function (from, to, options, metadata) {
        this._edits.push({ _type: 1, from: from, to: to, options: options, metadata: metadata });
    };
    WorkspaceEdit.prototype.createFile = function (uri, options, metadata) {
        this._edits.push({ _type: 1, from: undefined, to: uri, options: options, metadata: metadata });
    };
    WorkspaceEdit.prototype.deleteFile = function (uri, options, metadata) {
        this._edits.push({ _type: 1, from: uri, to: undefined, options: options, metadata: metadata });
    };
    WorkspaceEdit.prototype.replace = function (uri, range, newText, metadata) {
        this._edits.push({ _type: 2, uri: uri, edit: new TextEdit(range, newText), metadata: metadata });
    };
    WorkspaceEdit.prototype.insert = function (resource, position, newText, metadata) {
        this.replace(resource, new Range(position, position), newText, metadata);
    };
    WorkspaceEdit.prototype.delete = function (resource, range, metadata) {
        this.replace(resource, range, '', metadata);
    };
    WorkspaceEdit.prototype.has = function (uri) {
        var e_4, _a;
        try {
            for (var _b = __values(this._edits), _c = _b.next(); !_c.done; _c = _b.next()) {
                var edit = _c.value;
                if (edit && edit._type === 2 && edit.uri.toString() === uri.toString()) {
                    return true;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return false;
    };
    WorkspaceEdit.prototype.set = function (uri, edits) {
        var e_5, _a;
        if (!edits) {
            // remove all text edits for `uri`
            for (var i = 0; i < this._edits.length; i++) {
                var element = this._edits[i];
                if (element && element._type === 2 && element.uri.toString() === uri.toString()) {
                    this._edits[i] = undefined;
                }
            }
            this._edits = this._edits.filter(function (e) { return !!e; });
        }
        else {
            try {
                // append edit to the end
                for (var edits_1 = __values(edits), edits_1_1 = edits_1.next(); !edits_1_1.done; edits_1_1 = edits_1.next()) {
                    var edit = edits_1_1.value;
                    if (edit) {
                        this._edits.push({ _type: 2, uri: uri, edit: edit });
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (edits_1_1 && !edits_1_1.done && (_a = edits_1.return)) _a.call(edits_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
    };
    WorkspaceEdit.prototype.get = function (uri) {
        var e_6, _a;
        var res = [];
        try {
            for (var _b = __values(this._edits), _c = _b.next(); !_c.done; _c = _b.next()) {
                var candidate = _c.value;
                if (candidate && candidate._type === 2 && candidate.uri.toString() === uri.toString()) {
                    res.push(candidate.edit);
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
        if (res.length === 0) {
            return undefined;
        }
        return res;
    };
    WorkspaceEdit.prototype.entries = function () {
        var e_7, _a;
        var textEdits = new Map();
        try {
            for (var _b = __values(this._edits), _c = _b.next(); !_c.done; _c = _b.next()) {
                var candidate = _c.value;
                if (candidate && candidate._type === 2) {
                    var textEdit = textEdits.get(candidate.uri.toString());
                    if (!textEdit) {
                        textEdit = [candidate.uri, []];
                        textEdits.set(candidate.uri.toString(), textEdit);
                    }
                    textEdit[1].push(candidate.edit);
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        var result = [];
        textEdits.forEach(function (v) { return result.push(v); });
        return result;
    };
    WorkspaceEdit.prototype._allEntries = function () {
        var e_8, _a;
        var res = [];
        try {
            for (var _b = __values(this._edits), _c = _b.next(); !_c.done; _c = _b.next()) {
                var edit = _c.value;
                if (!edit) {
                    continue;
                }
                if (edit._type === 1) {
                    res.push([edit.from, edit.to, edit.options, edit.metadata]);
                }
                else {
                    res.push([edit.uri, [edit.edit], edit.metadata]);
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return res;
    };
    Object.defineProperty(WorkspaceEdit.prototype, "size", {
        get: function () {
            return this.entries().length;
        },
        enumerable: false,
        configurable: true
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    WorkspaceEdit.prototype.toJSON = function () {
        return this.entries();
    };
    return WorkspaceEdit;
}());
exports.WorkspaceEdit = WorkspaceEdit;
var TreeItem = /** @class */ (function () {
    function TreeItem(arg1, collapsibleState) {
        if (collapsibleState === void 0) { collapsibleState = TreeItemCollapsibleState.None; }
        this.collapsibleState = collapsibleState;
        if (arg1 instanceof vscode_uri_1.URI) {
            this.resourceUri = arg1;
        }
        else {
            this.label = arg1;
        }
    }
    return TreeItem;
}());
exports.TreeItem = TreeItem;
var TreeItemCollapsibleState;
(function (TreeItemCollapsibleState) {
    TreeItemCollapsibleState[TreeItemCollapsibleState["None"] = 0] = "None";
    TreeItemCollapsibleState[TreeItemCollapsibleState["Collapsed"] = 1] = "Collapsed";
    TreeItemCollapsibleState[TreeItemCollapsibleState["Expanded"] = 2] = "Expanded";
})(TreeItemCollapsibleState = exports.TreeItemCollapsibleState || (exports.TreeItemCollapsibleState = {}));
var SymbolTag;
(function (SymbolTag) {
    SymbolTag[SymbolTag["Deprecated"] = 1] = "Deprecated";
})(SymbolTag = exports.SymbolTag || (exports.SymbolTag = {}));
var SymbolInformation = /** @class */ (function () {
    function SymbolInformation(name, kind, rangeOrContainer, locationOrUri, containerName) {
        this.name = name;
        this.kind = kind;
        this.containerName = containerName;
        if (typeof rangeOrContainer === 'string') {
            this.containerName = rangeOrContainer;
        }
        if (locationOrUri instanceof Location) {
            this.location = locationOrUri;
        }
        else if (rangeOrContainer instanceof Range) {
            this.location = new Location(locationOrUri, rangeOrContainer);
        }
        SymbolInformation.validate(this);
    }
    SymbolInformation.validate = function (candidate) {
        if (!candidate.name) {
            throw new Error('Should provide a name inside candidate field');
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SymbolInformation.prototype.toJSON = function () {
        return {
            name: this.name,
            kind: plugin_api_rpc_model_1.SymbolKind[this.kind],
            location: this.location,
            containerName: this.containerName
        };
    };
    return SymbolInformation;
}());
exports.SymbolInformation = SymbolInformation;
var DocumentSymbol = /** @class */ (function () {
    function DocumentSymbol(name, detail, kind, range, selectionRange) {
        this.name = name;
        this.detail = detail;
        this.kind = kind;
        this.range = range;
        this.selectionRange = selectionRange;
        this.children = [];
        DocumentSymbol.validate(this);
    }
    DocumentSymbol.validate = function (candidate) {
        if (!candidate.name) {
            throw new Error('Should provide a name inside candidate field');
        }
        if (!candidate.range.contains(candidate.selectionRange)) {
            throw new Error('selectionRange must be contained in fullRange');
        }
        if (candidate.children) {
            candidate.children.forEach(DocumentSymbol.validate);
        }
    };
    return DocumentSymbol;
}());
exports.DocumentSymbol = DocumentSymbol;
var CommentThreadCollapsibleState;
(function (CommentThreadCollapsibleState) {
    CommentThreadCollapsibleState[CommentThreadCollapsibleState["Collapsed"] = 0] = "Collapsed";
    CommentThreadCollapsibleState[CommentThreadCollapsibleState["Expanded"] = 1] = "Expanded";
})(CommentThreadCollapsibleState = exports.CommentThreadCollapsibleState || (exports.CommentThreadCollapsibleState = {}));
var QuickInputButtons = /** @class */ (function () {
    function QuickInputButtons() {
    }
    QuickInputButtons.Back = {
        iconPath: {
            id: 'Back'
        },
        tooltip: 'Back'
    };
    return QuickInputButtons;
}());
exports.QuickInputButtons = QuickInputButtons;
var CommentMode;
(function (CommentMode) {
    CommentMode[CommentMode["Editing"] = 0] = "Editing";
    CommentMode[CommentMode["Preview"] = 1] = "Preview";
})(CommentMode = exports.CommentMode || (exports.CommentMode = {}));
// #region file api
var FileChangeType;
(function (FileChangeType) {
    FileChangeType[FileChangeType["Changed"] = 1] = "Changed";
    FileChangeType[FileChangeType["Created"] = 2] = "Created";
    FileChangeType[FileChangeType["Deleted"] = 3] = "Deleted";
})(FileChangeType = exports.FileChangeType || (exports.FileChangeType = {}));
var FileSystemError = /** @class */ (function (_super) {
    __extends(FileSystemError, _super);
    function FileSystemError(uriOrMessage, code, terminator) {
        if (code === void 0) { code = files_1.FileSystemProviderErrorCode.Unknown; }
        var _a;
        var _this = _super.call(this, vscode_uri_1.URI.isUri(uriOrMessage) ? uriOrMessage.toString(true) : uriOrMessage) || this;
        _this.code = (_a = terminator === null || terminator === void 0 ? void 0 : terminator.name) !== null && _a !== void 0 ? _a : 'Unknown';
        // mark the error as file system provider error so that
        // we can extract the error code on the receiving side
        files_1.markAsFileSystemProviderError(_this, code);
        // workaround when extending builtin objects and when compiling to ES5, see:
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        if (typeof Object.setPrototypeOf === 'function') {
            Object.setPrototypeOf(_this, FileSystemError.prototype);
        }
        if (typeof Error.captureStackTrace === 'function' && typeof terminator === 'function') {
            // nice stack traces
            Error.captureStackTrace(_this, terminator);
        }
        return _this;
    }
    FileSystemError.FileExists = function (messageOrUri) {
        return new FileSystemError(messageOrUri, files_1.FileSystemProviderErrorCode.FileExists, FileSystemError.FileExists);
    };
    FileSystemError.FileNotFound = function (messageOrUri) {
        return new FileSystemError(messageOrUri, files_1.FileSystemProviderErrorCode.FileNotFound, FileSystemError.FileNotFound);
    };
    FileSystemError.FileNotADirectory = function (messageOrUri) {
        return new FileSystemError(messageOrUri, files_1.FileSystemProviderErrorCode.FileNotADirectory, FileSystemError.FileNotADirectory);
    };
    FileSystemError.FileIsADirectory = function (messageOrUri) {
        return new FileSystemError(messageOrUri, files_1.FileSystemProviderErrorCode.FileIsADirectory, FileSystemError.FileIsADirectory);
    };
    FileSystemError.NoPermissions = function (messageOrUri) {
        return new FileSystemError(messageOrUri, files_1.FileSystemProviderErrorCode.NoPermissions, FileSystemError.NoPermissions);
    };
    FileSystemError.Unavailable = function (messageOrUri) {
        return new FileSystemError(messageOrUri, files_1.FileSystemProviderErrorCode.Unavailable, FileSystemError.Unavailable);
    };
    return FileSystemError;
}(Error));
exports.FileSystemError = FileSystemError;
// #endregion
var FileType;
(function (FileType) {
    FileType[FileType["Unknown"] = 0] = "Unknown";
    FileType[FileType["File"] = 1] = "File";
    FileType[FileType["Directory"] = 2] = "Directory";
    FileType[FileType["SymbolicLink"] = 64] = "SymbolicLink";
})(FileType = exports.FileType || (exports.FileType = {}));
var ProgressOptions = /** @class */ (function () {
    function ProgressOptions(location, title, cancellable) {
        this.location = location;
    }
    return ProgressOptions;
}());
exports.ProgressOptions = ProgressOptions;
var Progress = /** @class */ (function () {
    function Progress() {
    }
    /**
     * Report a progress update.
     * @param value A progress item, like a message and/or an
     * report on how much work finished
     */
    Progress.prototype.report = function (value) {
    };
    return Progress;
}());
exports.Progress = Progress;
var ProgressLocation;
(function (ProgressLocation) {
    /**
     * Show progress for the source control viewlet, as overlay for the icon and as progress bar
     * inside the viewlet (when visible). Neither supports cancellation nor discrete progress.
     */
    ProgressLocation[ProgressLocation["SourceControl"] = 1] = "SourceControl";
    /**
     * Show progress in the status bar of the editor. Neither supports cancellation nor discrete progress.
     */
    ProgressLocation[ProgressLocation["Window"] = 10] = "Window";
    /**
     * Show progress as notification with an optional cancel button. Supports to show infinite and discrete progress.
     */
    ProgressLocation[ProgressLocation["Notification"] = 15] = "Notification";
})(ProgressLocation = exports.ProgressLocation || (exports.ProgressLocation = {}));
function computeTaskExecutionId(values) {
    var id = '';
    for (var i = 0; i < values.length; i++) {
        id += values[i].replace(/,/g, ',,') + ',';
    }
    return id;
}
var ProcessExecution = /** @class */ (function () {
    function ProcessExecution(process, varg1, varg2) {
        if (typeof process !== 'string') {
            throw errors_1.illegalArgument('process');
        }
        this.executionProcess = process;
        if (varg1 !== undefined) {
            if (Array.isArray(varg1)) {
                this.arguments = varg1;
                this.executionOptions = varg2;
            }
            else {
                this.executionOptions = varg1;
            }
        }
        if (this.arguments === undefined) {
            this.arguments = [];
        }
    }
    Object.defineProperty(ProcessExecution.prototype, "process", {
        get: function () {
            return this.executionProcess;
        },
        set: function (value) {
            if (typeof value !== 'string') {
                throw errors_1.illegalArgument('process');
            }
            this.executionProcess = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProcessExecution.prototype, "args", {
        get: function () {
            return this.arguments;
        },
        set: function (value) {
            if (!Array.isArray(value)) {
                value = [];
            }
            this.arguments = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProcessExecution.prototype, "options", {
        get: function () {
            return this.executionOptions;
        },
        set: function (value) {
            this.executionOptions = value;
        },
        enumerable: false,
        configurable: true
    });
    ProcessExecution.prototype.computeId = function () {
        var e_9, _a;
        var props = [];
        props.push('process');
        if (this.executionProcess !== undefined) {
            props.push(this.executionProcess);
        }
        if (this.arguments && this.arguments.length > 0) {
            try {
                for (var _b = __values(this.arguments), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var arg = _c.value;
                    props.push(arg);
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_9) throw e_9.error; }
            }
        }
        return computeTaskExecutionId(props);
    };
    ProcessExecution.is = function (value) {
        var candidate = value;
        return candidate && !!candidate.process;
    };
    return ProcessExecution;
}());
exports.ProcessExecution = ProcessExecution;
var ShellQuoting;
(function (ShellQuoting) {
    ShellQuoting[ShellQuoting["Escape"] = 1] = "Escape";
    ShellQuoting[ShellQuoting["Strong"] = 2] = "Strong";
    ShellQuoting[ShellQuoting["Weak"] = 3] = "Weak";
})(ShellQuoting = exports.ShellQuoting || (exports.ShellQuoting = {}));
var TaskPanelKind;
(function (TaskPanelKind) {
    TaskPanelKind[TaskPanelKind["Shared"] = 1] = "Shared";
    TaskPanelKind[TaskPanelKind["Dedicated"] = 2] = "Dedicated";
    TaskPanelKind[TaskPanelKind["New"] = 3] = "New";
})(TaskPanelKind = exports.TaskPanelKind || (exports.TaskPanelKind = {}));
var TaskRevealKind;
(function (TaskRevealKind) {
    TaskRevealKind[TaskRevealKind["Always"] = 1] = "Always";
    TaskRevealKind[TaskRevealKind["Silent"] = 2] = "Silent";
    TaskRevealKind[TaskRevealKind["Never"] = 3] = "Never";
})(TaskRevealKind = exports.TaskRevealKind || (exports.TaskRevealKind = {}));
var ShellExecution = /** @class */ (function () {
    function ShellExecution(arg0, arg1, arg2) {
        if (Array.isArray(arg1) || typeof arg1 === 'string') {
            if (!arg0) {
                throw errors_1.illegalArgument('command can\'t be undefined or null');
            }
            if (typeof arg0 !== 'string' && typeof arg0.value !== 'string') {
                throw errors_1.illegalArgument('command');
            }
            this.shellCommand = arg0;
            this.arguments = arg1;
            this.shellOptions = arg2;
        }
        else {
            if (typeof arg0 !== 'string') {
                throw errors_1.illegalArgument('commandLine');
            }
            this.shellCommandLine = arg0;
            this.shellOptions = arg1;
        }
    }
    Object.defineProperty(ShellExecution.prototype, "commandLine", {
        get: function () {
            return this.shellCommandLine;
        },
        set: function (value) {
            if (typeof value !== 'string') {
                throw errors_1.illegalArgument('commandLine');
            }
            this.shellCommandLine = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShellExecution.prototype, "command", {
        get: function () {
            return this.shellCommand;
        },
        set: function (value) {
            if (typeof value !== 'string' && typeof value.value !== 'string') {
                throw errors_1.illegalArgument('command');
            }
            this.shellCommand = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShellExecution.prototype, "args", {
        get: function () {
            return this.arguments;
        },
        set: function (value) {
            this.arguments = value || [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShellExecution.prototype, "options", {
        get: function () {
            return this.shellOptions;
        },
        set: function (value) {
            this.shellOptions = value;
        },
        enumerable: false,
        configurable: true
    });
    ShellExecution.prototype.computeId = function () {
        var e_10, _a;
        var props = [];
        props.push('shell');
        if (this.shellCommandLine !== undefined) {
            props.push(this.shellCommandLine);
        }
        if (this.shellCommand !== undefined) {
            props.push(typeof this.shellCommand === 'string' ? this.shellCommand : this.shellCommand.value);
        }
        if (this.arguments && this.arguments.length > 0) {
            try {
                for (var _b = __values(this.arguments), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var arg = _c.value;
                    props.push(typeof arg === 'string' ? arg : arg.value);
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_10) throw e_10.error; }
            }
        }
        return computeTaskExecutionId(props);
    };
    ShellExecution.is = function (value) {
        var candidate = value;
        return candidate && (!!candidate.commandLine || !!candidate.command);
    };
    return ShellExecution;
}());
exports.ShellExecution = ShellExecution;
var TaskGroup = /** @class */ (function () {
    function TaskGroup(id, label) {
        if (typeof id !== 'string') {
            throw errors_1.illegalArgument('id');
        }
        if (typeof label !== 'string') {
            throw errors_1.illegalArgument('name');
        }
        this.groupId = id;
    }
    TaskGroup.from = function (value) {
        switch (value) {
            case 'clean':
                return TaskGroup.Clean;
            case 'build':
                return TaskGroup.Build;
            case 'rebuild':
                return TaskGroup.Rebuild;
            case 'test':
                return TaskGroup.Test;
            default:
                return undefined;
        }
    };
    Object.defineProperty(TaskGroup.prototype, "id", {
        get: function () {
            return this.groupId;
        },
        enumerable: false,
        configurable: true
    });
    TaskGroup.Clean = new TaskGroup('clean', 'Clean');
    TaskGroup.Build = new TaskGroup('build', 'Build');
    TaskGroup.Rebuild = new TaskGroup('rebuild', 'Rebuild');
    TaskGroup.Test = new TaskGroup('test', 'Test');
    return TaskGroup;
}());
exports.TaskGroup = TaskGroup;
var TaskScope;
(function (TaskScope) {
    TaskScope[TaskScope["Global"] = 1] = "Global";
    TaskScope[TaskScope["Workspace"] = 2] = "Workspace";
})(TaskScope = exports.TaskScope || (exports.TaskScope = {}));
var Task = /** @class */ (function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function Task() {
        var _a, _b;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var taskDefinition;
        var scope;
        var name;
        var source;
        var execution;
        var problemMatchers;
        if (typeof args[1] === 'string') {
            _a = __read(args, 5), taskDefinition = _a[0], name = _a[1], source = _a[2], execution = _a[3], problemMatchers = _a[4];
        }
        else {
            _b = __read(args, 6), taskDefinition = _b[0], scope = _b[1], name = _b[2], source = _b[3], execution = _b[4], problemMatchers = _b[5];
        }
        this.definition = taskDefinition;
        this.scope = scope;
        this.name = name;
        this.source = source;
        this.execution = execution;
        if (typeof problemMatchers === 'string') {
            this.taskProblemMatchers = [problemMatchers];
            this.hasTaskProblemMatchers = true;
        }
        else if (Array.isArray(problemMatchers)) {
            this.taskProblemMatchers = problemMatchers;
            this.hasTaskProblemMatchers = true;
        }
        else {
            this.taskProblemMatchers = [];
            this.hasTaskProblemMatchers = false;
        }
        this.isTaskBackground = false;
    }
    Object.defineProperty(Task.prototype, "definition", {
        get: function () {
            return this.taskDefinition;
        },
        set: function (value) {
            if (value === undefined || value === null) {
                throw errors_1.illegalArgument('Kind can\'t be undefined or null');
            }
            this.taskDefinition = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "scope", {
        get: function () {
            return this.taskScope;
        },
        set: function (value) {
            if (value === null) {
                value = undefined;
            }
            this.taskScope = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "name", {
        get: function () {
            return this.taskName;
        },
        set: function (value) {
            if (typeof value !== 'string') {
                throw errors_1.illegalArgument('name');
            }
            this.taskName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "execution", {
        get: function () {
            return this.taskExecution;
        },
        set: function (value) {
            if (value === null) {
                value = undefined;
            }
            this.taskExecution = value;
            this.updateDefinitionBasedOnExecution();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "problemMatchers", {
        get: function () {
            return this.taskProblemMatchers;
        },
        set: function (value) {
            if (!Array.isArray(value)) {
                this.taskProblemMatchers = [];
                this.hasTaskProblemMatchers = false;
                return;
            }
            this.taskProblemMatchers = value;
            this.hasTaskProblemMatchers = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "hasProblemMatchers", {
        get: function () {
            return this.hasTaskProblemMatchers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "isBackground", {
        get: function () {
            return this.isTaskBackground;
        },
        set: function (value) {
            if (value !== true && value !== false) {
                value = false;
            }
            this.isTaskBackground = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "source", {
        get: function () {
            return this.taskSource;
        },
        set: function (value) {
            if (typeof value !== 'string' || value.length === 0) {
                throw errors_1.illegalArgument('source must be a string of length > 0');
            }
            this.taskSource = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "group", {
        get: function () {
            return this.taskGroup;
        },
        set: function (value) {
            if (value === undefined || value === null) {
                this.taskGroup = undefined;
                return;
            }
            this.taskGroup = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "presentationOptions", {
        get: function () {
            return this.taskPresentationOptions;
        },
        set: function (value) {
            if (value === null) {
                value = undefined;
            }
            this.taskPresentationOptions = value;
        },
        enumerable: false,
        configurable: true
    });
    Task.prototype.updateDefinitionBasedOnExecution = function () {
        if (this.taskExecution instanceof ProcessExecution) {
            Object.assign(this.taskDefinition, {
                type: 'process',
                id: this.taskExecution.computeId(),
                taskType: this.taskDefinition.type
            });
        }
        else if (this.taskExecution instanceof ShellExecution) {
            Object.assign(this.taskDefinition, {
                type: 'shell',
                id: this.taskExecution.computeId(),
                taskType: this.taskDefinition.type
            });
        }
    };
    return Task;
}());
exports.Task = Task;
var Task2 = /** @class */ (function (_super) {
    __extends(Task2, _super);
    function Task2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Task2;
}(Task));
exports.Task2 = Task2;
var DebugAdapterExecutable = /** @class */ (function () {
    /**
     * Creates a description for a debug adapter based on an executable program.
     *
     * @param command The command or executable path that implements the debug adapter.
     * @param args Optional arguments to be passed to the command or executable.
     * @param options Optional options to be used when starting the command or executable.
     */
    function DebugAdapterExecutable(command, args, options) {
        this.command = command;
        this.args = args;
        this.options = options;
    }
    return DebugAdapterExecutable;
}());
exports.DebugAdapterExecutable = DebugAdapterExecutable;
/**
 * Represents a debug adapter running as a socket based server.
 */
var DebugAdapterServer = /** @class */ (function () {
    /**
     * Create a description for a debug adapter running as a socket based server.
     */
    function DebugAdapterServer(port, host) {
        this.port = port;
        this.host = host;
    }
    return DebugAdapterServer;
}());
exports.DebugAdapterServer = DebugAdapterServer;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Trace"] = 1] = "Trace";
    LogLevel[LogLevel["Debug"] = 2] = "Debug";
    LogLevel[LogLevel["Info"] = 3] = "Info";
    LogLevel[LogLevel["Warning"] = 4] = "Warning";
    LogLevel[LogLevel["Error"] = 5] = "Error";
    LogLevel[LogLevel["Critical"] = 6] = "Critical";
    LogLevel[LogLevel["Off"] = 7] = "Off";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
/**
 * The base class of all breakpoint types.
 */
var Breakpoint = /** @class */ (function () {
    function Breakpoint(enabled, condition, hitCondition, logMessage) {
        this.enabled = enabled || false;
        this.condition = condition;
        this.hitCondition = hitCondition;
        this.logMessage = logMessage;
    }
    Object.defineProperty(Breakpoint.prototype, "id", {
        /**
         * The unique ID of the breakpoint.
         */
        get: function () {
            if (!this._id) {
                this._id = uuid_1.UUID.uuid4();
            }
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    return Breakpoint;
}());
exports.Breakpoint = Breakpoint;
/**
 * A breakpoint specified by a source location.
 */
var SourceBreakpoint = /** @class */ (function (_super) {
    __extends(SourceBreakpoint, _super);
    /**
     * Create a new breakpoint for a source location.
     */
    function SourceBreakpoint(location, enabled, condition, hitCondition, logMessage) {
        var _this = _super.call(this, enabled, condition, hitCondition, logMessage) || this;
        _this.location = location;
        return _this;
    }
    return SourceBreakpoint;
}(Breakpoint));
exports.SourceBreakpoint = SourceBreakpoint;
/**
 * A breakpoint specified by a function name.
 */
var FunctionBreakpoint = /** @class */ (function (_super) {
    __extends(FunctionBreakpoint, _super);
    /**
     * Create a new function breakpoint.
     */
    function FunctionBreakpoint(functionName, enabled, condition, hitCondition, logMessage) {
        var _this = _super.call(this, enabled, condition, hitCondition, logMessage) || this;
        _this.functionName = functionName;
        return _this;
    }
    return FunctionBreakpoint;
}(Breakpoint));
exports.FunctionBreakpoint = FunctionBreakpoint;
var Color = /** @class */ (function () {
    function Color(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
    return Color;
}());
exports.Color = Color;
var ColorInformation = /** @class */ (function () {
    function ColorInformation(range, color) {
        if (color && !(color instanceof Color)) {
            throw errors_1.illegalArgument('color');
        }
        if (!Range.isRange(range)) {
            throw errors_1.illegalArgument('range');
        }
        this.range = range;
        this.color = color;
    }
    return ColorInformation;
}());
exports.ColorInformation = ColorInformation;
var ColorPresentation = /** @class */ (function () {
    function ColorPresentation(label) {
        if (!label || typeof label !== 'string') {
            throw errors_1.illegalArgument('label');
        }
        this.label = label;
    }
    return ColorPresentation;
}());
exports.ColorPresentation = ColorPresentation;
var ColorFormat;
(function (ColorFormat) {
    ColorFormat[ColorFormat["RGB"] = 0] = "RGB";
    ColorFormat[ColorFormat["HEX"] = 1] = "HEX";
    ColorFormat[ColorFormat["HSL"] = 2] = "HSL";
})(ColorFormat = exports.ColorFormat || (exports.ColorFormat = {}));
var FoldingRange = /** @class */ (function () {
    function FoldingRange(start, end, kind) {
        this.start = start;
        this.end = end;
        this.kind = kind;
    }
    return FoldingRange;
}());
exports.FoldingRange = FoldingRange;
var FoldingRangeKind;
(function (FoldingRangeKind) {
    FoldingRangeKind[FoldingRangeKind["Comment"] = 1] = "Comment";
    FoldingRangeKind[FoldingRangeKind["Imports"] = 2] = "Imports";
    FoldingRangeKind[FoldingRangeKind["Region"] = 3] = "Region";
})(FoldingRangeKind = exports.FoldingRangeKind || (exports.FoldingRangeKind = {}));
var SelectionRange = /** @class */ (function () {
    function SelectionRange(range, parent) {
        this.range = range;
        this.parent = parent;
        if (parent && !parent.range.contains(this.range)) {
            throw new Error('Invalid argument: parent must contain this range');
        }
    }
    return SelectionRange;
}());
exports.SelectionRange = SelectionRange;
/**
 * Enumeration of the supported operating systems.
 */
var OperatingSystem;
(function (OperatingSystem) {
    OperatingSystem["Windows"] = "Windows";
    OperatingSystem["Linux"] = "Linux";
    OperatingSystem["OSX"] = "OSX";
})(OperatingSystem = exports.OperatingSystem || (exports.OperatingSystem = {}));
/** The areas of the application shell where webview panel can reside. */
var WebviewPanelTargetArea;
(function (WebviewPanelTargetArea) {
    WebviewPanelTargetArea["Main"] = "main";
    WebviewPanelTargetArea["Left"] = "left";
    WebviewPanelTargetArea["Right"] = "right";
    WebviewPanelTargetArea["Bottom"] = "bottom";
})(WebviewPanelTargetArea = exports.WebviewPanelTargetArea || (exports.WebviewPanelTargetArea = {}));
/**
 * Possible kinds of UI that can use extensions.
 */
var UIKind;
(function (UIKind) {
    /**
     * Extensions are accessed from a desktop application.
     */
    UIKind[UIKind["Desktop"] = 1] = "Desktop";
    /**
     * Extensions are accessed from a web browser.
     */
    UIKind[UIKind["Web"] = 2] = "Web";
})(UIKind = exports.UIKind || (exports.UIKind = {}));
var CallHierarchyItem = /** @class */ (function () {
    function CallHierarchyItem(kind, name, detail, uri, range, selectionRange) {
        this.kind = kind;
        this.name = name;
        this.detail = detail;
        this.uri = uri;
        this.range = range;
        this.selectionRange = selectionRange;
    }
    CallHierarchyItem.isCallHierarchyItem = function (thing) {
        if (thing instanceof CallHierarchyItem) {
            return true;
        }
        if (!thing) {
            return false;
        }
        return typeof thing.kind === 'number' &&
            typeof thing.name === 'string' &&
            vscode_uri_1.URI.isUri(thing.uri) &&
            Range.isRange(thing.range) &&
            Range.isRange(thing.selectionRange);
    };
    return CallHierarchyItem;
}());
exports.CallHierarchyItem = CallHierarchyItem;
var CallHierarchyIncomingCall = /** @class */ (function () {
    function CallHierarchyIncomingCall(item, fromRanges) {
        this.fromRanges = fromRanges;
        this.from = item;
    }
    return CallHierarchyIncomingCall;
}());
exports.CallHierarchyIncomingCall = CallHierarchyIncomingCall;
var CallHierarchyOutgoingCall = /** @class */ (function () {
    function CallHierarchyOutgoingCall(item, fromRanges) {
        this.fromRanges = fromRanges;
        this.to = item;
    }
    return CallHierarchyOutgoingCall;
}());
exports.CallHierarchyOutgoingCall = CallHierarchyOutgoingCall;
var TimelineItem = /** @class */ (function () {
    function TimelineItem(label, timestamp) {
        this.label = label;
        this.timestamp = timestamp;
    }
    return TimelineItem;
}());
exports.TimelineItem = TimelineItem;
// #region Semantic Coloring
var SemanticTokensLegend = /** @class */ (function () {
    function SemanticTokensLegend(tokenTypes, tokenModifiers) {
        if (tokenModifiers === void 0) { tokenModifiers = []; }
        this.tokenTypes = tokenTypes;
        this.tokenModifiers = tokenModifiers;
    }
    return SemanticTokensLegend;
}());
exports.SemanticTokensLegend = SemanticTokensLegend;
function isStrArrayOrUndefined(arg) {
    return ((typeof arg === 'undefined') || (Array.isArray(arg) && arg.every(function (e) { return typeof e === 'string'; })));
}
var SemanticTokensBuilder = /** @class */ (function () {
    function SemanticTokensBuilder(legend) {
        this._prevLine = 0;
        this._prevChar = 0;
        this._dataIsSortedAndDeltaEncoded = true;
        this._data = [];
        this._dataLen = 0;
        this._tokenTypeStrToInt = new Map();
        this._tokenModifierStrToInt = new Map();
        this._hasLegend = false;
        if (legend) {
            this._hasLegend = true;
            for (var i = 0, len = legend.tokenTypes.length; i < len; i++) {
                this._tokenTypeStrToInt.set(legend.tokenTypes[i], i);
            }
            for (var i = 0, len = legend.tokenModifiers.length; i < len; i++) {
                this._tokenModifierStrToInt.set(legend.tokenModifiers[i], i);
            }
        }
    }
    SemanticTokensBuilder.prototype.push = function (arg0, arg1, arg2, arg3, arg4) {
        if (typeof arg0 === 'number' && typeof arg1 === 'number' && typeof arg2 === 'number' && typeof arg3 === 'number' &&
            (typeof arg4 === 'number' || typeof arg4 === 'undefined')) {
            if (typeof arg4 === 'undefined') {
                arg4 = 0;
            }
            // 1st overload
            return this._pushEncoded(arg0, arg1, arg2, arg3, arg4);
        }
        if (Range.isRange(arg0) && typeof arg1 === 'string' && isStrArrayOrUndefined(arg2)) {
            // 2nd overload
            return this._push(arg0, arg1, arg2);
        }
        throw errors_1.illegalArgument();
    };
    SemanticTokensBuilder.prototype._push = function (range, tokenType, tokenModifiers) {
        var e_11, _a;
        if (!this._hasLegend) {
            throw new Error('Legend must be provided in constructor');
        }
        if (range.start.line !== range.end.line) {
            throw new Error('`range` cannot span multiple lines');
        }
        if (!this._tokenTypeStrToInt.has(tokenType)) {
            throw new Error('`tokenType` is not in the provided legend');
        }
        var line = range.start.line;
        var char = range.start.character;
        var length = range.end.character - range.start.character;
        var nTokenType = this._tokenTypeStrToInt.get(tokenType);
        var nTokenModifiers = 0;
        if (tokenModifiers) {
            try {
                for (var tokenModifiers_1 = __values(tokenModifiers), tokenModifiers_1_1 = tokenModifiers_1.next(); !tokenModifiers_1_1.done; tokenModifiers_1_1 = tokenModifiers_1.next()) {
                    var tokenModifier = tokenModifiers_1_1.value;
                    if (!this._tokenModifierStrToInt.has(tokenModifier)) {
                        throw new Error('`tokenModifier` is not in the provided legend');
                    }
                    var nTokenModifier = this._tokenModifierStrToInt.get(tokenModifier);
                    nTokenModifiers |= (1 << nTokenModifier) >>> 0;
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (tokenModifiers_1_1 && !tokenModifiers_1_1.done && (_a = tokenModifiers_1.return)) _a.call(tokenModifiers_1);
                }
                finally { if (e_11) throw e_11.error; }
            }
        }
        this._pushEncoded(line, char, length, nTokenType, nTokenModifiers);
    };
    SemanticTokensBuilder.prototype._pushEncoded = function (line, char, length, tokenType, tokenModifiers) {
        if (this._dataIsSortedAndDeltaEncoded && (line < this._prevLine || (line === this._prevLine && char < this._prevChar))) {
            // push calls were ordered and are no longer ordered
            this._dataIsSortedAndDeltaEncoded = false;
            // Remove delta encoding from data
            var tokenCount = (this._data.length / 5) | 0;
            var prevLine = 0;
            var prevChar = 0;
            for (var i = 0; i < tokenCount; i++) {
                // eslint-disable-next-line @typescript-eslint/no-shadow
                var line_1 = this._data[5 * i];
                // eslint-disable-next-line @typescript-eslint/no-shadow
                var char_1 = this._data[5 * i + 1];
                if (line_1 === 0) {
                    // on the same line as previous token
                    line_1 = prevLine;
                    char_1 += prevChar;
                }
                else {
                    // on a different line than previous token
                    line_1 += prevLine;
                }
                this._data[5 * i] = line_1;
                this._data[5 * i + 1] = char_1;
                prevLine = line_1;
                prevChar = char_1;
            }
        }
        var pushLine = line;
        var pushChar = char;
        if (this._dataIsSortedAndDeltaEncoded && this._dataLen > 0) {
            pushLine -= this._prevLine;
            if (pushLine === 0) {
                pushChar -= this._prevChar;
            }
        }
        this._data[this._dataLen++] = pushLine;
        this._data[this._dataLen++] = pushChar;
        this._data[this._dataLen++] = length;
        this._data[this._dataLen++] = tokenType;
        this._data[this._dataLen++] = tokenModifiers;
        this._prevLine = line;
        this._prevChar = char;
    };
    SemanticTokensBuilder._sortAndDeltaEncode = function (data) {
        var pos = [];
        var tokenCount = (data.length / 5) | 0;
        for (var i = 0; i < tokenCount; i++) {
            pos[i] = i;
        }
        pos.sort(function (a, b) {
            var aLine = data[5 * a];
            var bLine = data[5 * b];
            if (aLine === bLine) {
                var aChar = data[5 * a + 1];
                var bChar = data[5 * b + 1];
                return aChar - bChar;
            }
            return aLine - bLine;
        });
        var result = new Uint32Array(data.length);
        var prevLine = 0;
        var prevChar = 0;
        for (var i = 0; i < tokenCount; i++) {
            var srcOffset = 5 * pos[i];
            var line = data[srcOffset + 0];
            var char = data[srcOffset + 1];
            var length_1 = data[srcOffset + 2];
            var tokenType = data[srcOffset + 3];
            var tokenModifiers = data[srcOffset + 4];
            var pushLine = line - prevLine;
            var pushChar = (pushLine === 0 ? char - prevChar : char);
            var dstOffset = 5 * i;
            result[dstOffset + 0] = pushLine;
            result[dstOffset + 1] = pushChar;
            result[dstOffset + 2] = length_1;
            result[dstOffset + 3] = tokenType;
            result[dstOffset + 4] = tokenModifiers;
            prevLine = line;
            prevChar = char;
        }
        return result;
    };
    SemanticTokensBuilder.prototype.build = function (resultId) {
        if (!this._dataIsSortedAndDeltaEncoded) {
            return new SemanticTokens(SemanticTokensBuilder._sortAndDeltaEncode(this._data), resultId);
        }
        return new SemanticTokens(new Uint32Array(this._data), resultId);
    };
    return SemanticTokensBuilder;
}());
exports.SemanticTokensBuilder = SemanticTokensBuilder;
var SemanticTokens = /** @class */ (function () {
    function SemanticTokens(data, resultId) {
        this.resultId = resultId;
        this.data = data;
    }
    return SemanticTokens;
}());
exports.SemanticTokens = SemanticTokens;
var SemanticTokensEdit = /** @class */ (function () {
    function SemanticTokensEdit(start, deleteCount, data) {
        this.start = start;
        this.deleteCount = deleteCount;
        this.data = data;
    }
    return SemanticTokensEdit;
}());
exports.SemanticTokensEdit = SemanticTokensEdit;
var SemanticTokensEdits = /** @class */ (function () {
    function SemanticTokensEdits(edits, resultId) {
        this.resultId = resultId;
        this.edits = edits;
    }
    return SemanticTokensEdits;
}());
exports.SemanticTokensEdits = SemanticTokensEdits;
// #endregion
//# sourceMappingURL=types-impl.js.map