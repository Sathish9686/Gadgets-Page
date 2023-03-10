/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { CursorColumns, SingleCursorState } from './cursorCommon';
import { Position } from '../core/position';
import { Range } from '../core/range';
import * as strings from '../../../base/common/strings';
var CursorPosition = /** @class */ (function () {
    function CursorPosition(lineNumber, column, leftoverVisibleColumns) {
        this.lineNumber = lineNumber;
        this.column = column;
        this.leftoverVisibleColumns = leftoverVisibleColumns;
    }
    return CursorPosition;
}());
export { CursorPosition };
var MoveOperations = /** @class */ (function () {
    function MoveOperations() {
    }
    MoveOperations.leftPosition = function (model, lineNumber, column) {
        if (column > model.getLineMinColumn(lineNumber)) {
            column = column - strings.prevCharLength(model.getLineContent(lineNumber), column - 1);
        }
        else if (lineNumber > 1) {
            lineNumber = lineNumber - 1;
            column = model.getLineMaxColumn(lineNumber);
        }
        return new Position(lineNumber, column);
    };
    MoveOperations.left = function (config, model, lineNumber, column) {
        var pos = MoveOperations.leftPosition(model, lineNumber, column);
        return new CursorPosition(pos.lineNumber, pos.column, 0);
    };
    MoveOperations.moveLeft = function (config, model, cursor, inSelectionMode, noOfColumns) {
        var lineNumber, column;
        if (cursor.hasSelection() && !inSelectionMode) {
            // If we are in selection mode, move left without selection cancels selection and puts cursor at the beginning of the selection
            lineNumber = cursor.selection.startLineNumber;
            column = cursor.selection.startColumn;
        }
        else {
            var r = MoveOperations.left(config, model, cursor.position.lineNumber, cursor.position.column - (noOfColumns - 1));
            lineNumber = r.lineNumber;
            column = r.column;
        }
        return cursor.move(inSelectionMode, lineNumber, column, 0);
    };
    MoveOperations.rightPosition = function (model, lineNumber, column) {
        if (column < model.getLineMaxColumn(lineNumber)) {
            column = column + strings.nextCharLength(model.getLineContent(lineNumber), column - 1);
        }
        else if (lineNumber < model.getLineCount()) {
            lineNumber = lineNumber + 1;
            column = model.getLineMinColumn(lineNumber);
        }
        return new Position(lineNumber, column);
    };
    MoveOperations.right = function (config, model, lineNumber, column) {
        var pos = MoveOperations.rightPosition(model, lineNumber, column);
        return new CursorPosition(pos.lineNumber, pos.column, 0);
    };
    MoveOperations.moveRight = function (config, model, cursor, inSelectionMode, noOfColumns) {
        var lineNumber, column;
        if (cursor.hasSelection() && !inSelectionMode) {
            // If we are in selection mode, move right without selection cancels selection and puts cursor at the end of the selection
            lineNumber = cursor.selection.endLineNumber;
            column = cursor.selection.endColumn;
        }
        else {
            var r = MoveOperations.right(config, model, cursor.position.lineNumber, cursor.position.column + (noOfColumns - 1));
            lineNumber = r.lineNumber;
            column = r.column;
        }
        return cursor.move(inSelectionMode, lineNumber, column, 0);
    };
    MoveOperations.down = function (config, model, lineNumber, column, leftoverVisibleColumns, count, allowMoveOnLastLine) {
        var currentVisibleColumn = CursorColumns.visibleColumnFromColumn(model.getLineContent(lineNumber), column, config.tabSize) + leftoverVisibleColumns;
        lineNumber = lineNumber + count;
        var lineCount = model.getLineCount();
        if (lineNumber > lineCount) {
            lineNumber = lineCount;
            if (allowMoveOnLastLine) {
                column = model.getLineMaxColumn(lineNumber);
            }
            else {
                column = Math.min(model.getLineMaxColumn(lineNumber), column);
            }
        }
        else {
            column = CursorColumns.columnFromVisibleColumn2(config, model, lineNumber, currentVisibleColumn);
        }
        leftoverVisibleColumns = currentVisibleColumn - CursorColumns.visibleColumnFromColumn(model.getLineContent(lineNumber), column, config.tabSize);
        return new CursorPosition(lineNumber, column, leftoverVisibleColumns);
    };
    MoveOperations.moveDown = function (config, model, cursor, inSelectionMode, linesCount) {
        var lineNumber, column;
        if (cursor.hasSelection() && !inSelectionMode) {
            // If we are in selection mode, move down acts relative to the end of selection
            lineNumber = cursor.selection.endLineNumber;
            column = cursor.selection.endColumn;
        }
        else {
            lineNumber = cursor.position.lineNumber;
            column = cursor.position.column;
        }
        var r = MoveOperations.down(config, model, lineNumber, column, cursor.leftoverVisibleColumns, linesCount, true);
        return cursor.move(inSelectionMode, r.lineNumber, r.column, r.leftoverVisibleColumns);
    };
    MoveOperations.translateDown = function (config, model, cursor) {
        var selection = cursor.selection;
        var selectionStart = MoveOperations.down(config, model, selection.selectionStartLineNumber, selection.selectionStartColumn, cursor.selectionStartLeftoverVisibleColumns, 1, false);
        var position = MoveOperations.down(config, model, selection.positionLineNumber, selection.positionColumn, cursor.leftoverVisibleColumns, 1, false);
        return new SingleCursorState(new Range(selectionStart.lineNumber, selectionStart.column, selectionStart.lineNumber, selectionStart.column), selectionStart.leftoverVisibleColumns, new Position(position.lineNumber, position.column), position.leftoverVisibleColumns);
    };
    MoveOperations.up = function (config, model, lineNumber, column, leftoverVisibleColumns, count, allowMoveOnFirstLine) {
        var currentVisibleColumn = CursorColumns.visibleColumnFromColumn(model.getLineContent(lineNumber), column, config.tabSize) + leftoverVisibleColumns;
        lineNumber = lineNumber - count;
        if (lineNumber < 1) {
            lineNumber = 1;
            if (allowMoveOnFirstLine) {
                column = model.getLineMinColumn(lineNumber);
            }
            else {
                column = Math.min(model.getLineMaxColumn(lineNumber), column);
            }
        }
        else {
            column = CursorColumns.columnFromVisibleColumn2(config, model, lineNumber, currentVisibleColumn);
        }
        leftoverVisibleColumns = currentVisibleColumn - CursorColumns.visibleColumnFromColumn(model.getLineContent(lineNumber), column, config.tabSize);
        return new CursorPosition(lineNumber, column, leftoverVisibleColumns);
    };
    MoveOperations.moveUp = function (config, model, cursor, inSelectionMode, linesCount) {
        var lineNumber, column;
        if (cursor.hasSelection() && !inSelectionMode) {
            // If we are in selection mode, move up acts relative to the beginning of selection
            lineNumber = cursor.selection.startLineNumber;
            column = cursor.selection.startColumn;
        }
        else {
            lineNumber = cursor.position.lineNumber;
            column = cursor.position.column;
        }
        var r = MoveOperations.up(config, model, lineNumber, column, cursor.leftoverVisibleColumns, linesCount, true);
        return cursor.move(inSelectionMode, r.lineNumber, r.column, r.leftoverVisibleColumns);
    };
    MoveOperations.translateUp = function (config, model, cursor) {
        var selection = cursor.selection;
        var selectionStart = MoveOperations.up(config, model, selection.selectionStartLineNumber, selection.selectionStartColumn, cursor.selectionStartLeftoverVisibleColumns, 1, false);
        var position = MoveOperations.up(config, model, selection.positionLineNumber, selection.positionColumn, cursor.leftoverVisibleColumns, 1, false);
        return new SingleCursorState(new Range(selectionStart.lineNumber, selectionStart.column, selectionStart.lineNumber, selectionStart.column), selectionStart.leftoverVisibleColumns, new Position(position.lineNumber, position.column), position.leftoverVisibleColumns);
    };
    MoveOperations.moveToBeginningOfLine = function (config, model, cursor, inSelectionMode) {
        var lineNumber = cursor.position.lineNumber;
        var minColumn = model.getLineMinColumn(lineNumber);
        var firstNonBlankColumn = model.getLineFirstNonWhitespaceColumn(lineNumber) || minColumn;
        var column;
        var relevantColumnNumber = cursor.position.column;
        if (relevantColumnNumber === firstNonBlankColumn) {
            column = minColumn;
        }
        else {
            column = firstNonBlankColumn;
        }
        return cursor.move(inSelectionMode, lineNumber, column, 0);
    };
    MoveOperations.moveToEndOfLine = function (config, model, cursor, inSelectionMode) {
        var lineNumber = cursor.position.lineNumber;
        var maxColumn = model.getLineMaxColumn(lineNumber);
        return cursor.move(inSelectionMode, lineNumber, maxColumn, 0);
    };
    MoveOperations.moveToBeginningOfBuffer = function (config, model, cursor, inSelectionMode) {
        return cursor.move(inSelectionMode, 1, 1, 0);
    };
    MoveOperations.moveToEndOfBuffer = function (config, model, cursor, inSelectionMode) {
        var lastLineNumber = model.getLineCount();
        var lastColumn = model.getLineMaxColumn(lastLineNumber);
        return cursor.move(inSelectionMode, lastLineNumber, lastColumn, 0);
    };
    return MoveOperations;
}());
export { MoveOperations };
