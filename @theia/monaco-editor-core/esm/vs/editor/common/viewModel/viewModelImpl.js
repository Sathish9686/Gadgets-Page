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
import { Color } from '../../../base/common/color';
import * as strings from '../../../base/common/strings';
import { EDITOR_FONT_DEFAULTS, filterValidationDecorations } from '../config/editorOptions';
import { Position } from '../core/position';
import { Range } from '../core/range';
import { TokenizationRegistry } from '../modes';
import { tokenizeLineToHTML } from '../modes/textToHtmlTokenizer';
import { MinimapTokensColorTracker } from './minimapTokensColorTracker';
import * as viewEvents from '../view/viewEvents';
import { ViewLayout } from '../viewLayout/viewLayout';
import { IdentityLinesCollection, SplitLinesCollection } from './splitLinesCollection';
import { MinimapLinesRenderingData, ViewLineRenderingData } from './viewModel';
import { ViewModelDecorations } from './viewModelDecorations';
import { RunOnceScheduler } from '../../../base/common/async';
import * as platform from '../../../base/common/platform';
var USE_IDENTITY_LINES_COLLECTION = true;
var ViewModel = /** @class */ (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel(editorId, configuration, model, domLineBreaksComputerFactory, monospaceLineBreaksComputerFactory, scheduleAtNextAnimationFrame) {
        var _this = _super.call(this) || this;
        _this.editorId = editorId;
        _this.configuration = configuration;
        _this.model = model;
        _this._tokenizeViewportSoon = _this._register(new RunOnceScheduler(function () { return _this.tokenizeViewport(); }, 50));
        _this.hasFocus = false;
        _this.viewportStartLine = -1;
        _this.viewportStartLineTrackedRange = null;
        _this.viewportStartLineDelta = 0;
        if (USE_IDENTITY_LINES_COLLECTION && _this.model.isTooLargeForTokenization()) {
            _this.lines = new IdentityLinesCollection(_this.model);
        }
        else {
            var options = _this.configuration.options;
            var fontInfo = options.get(34 /* fontInfo */);
            var wrappingStrategy = options.get(103 /* wrappingStrategy */);
            var wrappingInfo = options.get(108 /* wrappingInfo */);
            var wrappingIndent = options.get(102 /* wrappingIndent */);
            _this.lines = new SplitLinesCollection(_this.model, domLineBreaksComputerFactory, monospaceLineBreaksComputerFactory, fontInfo, _this.model.getOptions().tabSize, wrappingStrategy, wrappingInfo.wrappingColumn, wrappingIndent);
        }
        _this.coordinatesConverter = _this.lines.createCoordinatesConverter();
        _this.viewLayout = _this._register(new ViewLayout(_this.configuration, _this.getLineCount(), scheduleAtNextAnimationFrame));
        _this._register(_this.viewLayout.onDidScroll(function (e) {
            if (e.scrollTopChanged) {
                _this._tokenizeViewportSoon.schedule();
            }
            try {
                var eventsCollector = _this._beginEmit();
                eventsCollector.emit(new viewEvents.ViewScrollChangedEvent(e));
            }
            finally {
                _this._endEmit();
            }
        }));
        _this._register(_this.viewLayout.onDidContentSizeChange(function (e) {
            try {
                var eventsCollector = _this._beginEmit();
                eventsCollector.emit(new viewEvents.ViewContentSizeChangedEvent(e));
            }
            finally {
                _this._endEmit();
            }
        }));
        _this.decorations = new ViewModelDecorations(_this.editorId, _this.model, _this.configuration, _this.lines, _this.coordinatesConverter);
        _this._registerModelEvents();
        _this._register(_this.configuration.onDidChange(function (e) {
            try {
                var eventsCollector = _this._beginEmit();
                _this._onConfigurationChanged(eventsCollector, e);
            }
            finally {
                _this._endEmit();
            }
        }));
        _this._register(MinimapTokensColorTracker.getInstance().onDidChange(function () {
            try {
                var eventsCollector = _this._beginEmit();
                eventsCollector.emit(new viewEvents.ViewTokensColorsChangedEvent());
            }
            finally {
                _this._endEmit();
            }
        }));
        return _this;
    }
    ViewModel.prototype.dispose = function () {
        // First remove listeners, as disposing the lines might end up sending
        // model decoration changed events ... and we no longer care about them ...
        _super.prototype.dispose.call(this);
        this.decorations.dispose();
        this.lines.dispose();
        this.invalidateMinimapColorCache();
        this.viewportStartLineTrackedRange = this.model._setTrackedRange(this.viewportStartLineTrackedRange, null, 1 /* NeverGrowsWhenTypingAtEdges */);
    };
    ViewModel.prototype.tokenizeViewport = function () {
        var linesViewportData = this.viewLayout.getLinesViewportData();
        var startPosition = this.coordinatesConverter.convertViewPositionToModelPosition(new Position(linesViewportData.startLineNumber, 1));
        var endPosition = this.coordinatesConverter.convertViewPositionToModelPosition(new Position(linesViewportData.endLineNumber, 1));
        this.model.tokenizeViewport(startPosition.lineNumber, endPosition.lineNumber);
    };
    ViewModel.prototype.setHasFocus = function (hasFocus) {
        this.hasFocus = hasFocus;
    };
    ViewModel.prototype._onConfigurationChanged = function (eventsCollector, e) {
        // We might need to restore the current centered view range, so save it (if available)
        var previousViewportStartModelPosition = null;
        if (this.viewportStartLine !== -1) {
            var previousViewportStartViewPosition = new Position(this.viewportStartLine, this.getLineMinColumn(this.viewportStartLine));
            previousViewportStartModelPosition = this.coordinatesConverter.convertViewPositionToModelPosition(previousViewportStartViewPosition);
        }
        var restorePreviousViewportStart = false;
        var options = this.configuration.options;
        var fontInfo = options.get(34 /* fontInfo */);
        var wrappingStrategy = options.get(103 /* wrappingStrategy */);
        var wrappingInfo = options.get(108 /* wrappingInfo */);
        var wrappingIndent = options.get(102 /* wrappingIndent */);
        if (this.lines.setWrappingSettings(fontInfo, wrappingStrategy, wrappingInfo.wrappingColumn, wrappingIndent)) {
            eventsCollector.emit(new viewEvents.ViewFlushedEvent());
            eventsCollector.emit(new viewEvents.ViewLineMappingChangedEvent());
            eventsCollector.emit(new viewEvents.ViewDecorationsChangedEvent());
            this.decorations.onLineMappingChanged();
            this.viewLayout.onFlushed(this.getLineCount());
            if (this.viewLayout.getCurrentScrollTop() !== 0) {
                // Never change the scroll position from 0 to something else...
                restorePreviousViewportStart = true;
            }
        }
        if (e.hasChanged(68 /* readOnly */)) {
            // Must read again all decorations due to readOnly filtering
            this.decorations.reset();
            eventsCollector.emit(new viewEvents.ViewDecorationsChangedEvent());
        }
        eventsCollector.emit(new viewEvents.ViewConfigurationChangedEvent(e));
        this.viewLayout.onConfigurationChanged(e);
        if (restorePreviousViewportStart && previousViewportStartModelPosition) {
            var viewPosition = this.coordinatesConverter.convertModelPositionToViewPosition(previousViewportStartModelPosition);
            var viewPositionTop = this.viewLayout.getVerticalOffsetForLineNumber(viewPosition.lineNumber);
            this.viewLayout.setScrollPositionNow({ scrollTop: viewPositionTop + this.viewportStartLineDelta });
        }
    };
    ViewModel.prototype._registerModelEvents = function () {
        var _this = this;
        this._register(this.model.onDidChangeRawContentFast(function (e) {
            try {
                var eventsCollector = _this._beginEmit();
                var hadOtherModelChange = false;
                var hadModelLineChangeThatChangedLineMapping = false;
                var changes = e.changes;
                var versionId = e.versionId;
                // Do a first pass to compute line mappings, and a second pass to actually interpret them
                var lineBreaksComputer = _this.lines.createLineBreaksComputer();
                for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
                    var change = changes_1[_i];
                    switch (change.changeType) {
                        case 4 /* LinesInserted */: {
                            for (var _a = 0, _b = change.detail; _a < _b.length; _a++) {
                                var line = _b[_a];
                                lineBreaksComputer.addRequest(line, null);
                            }
                            break;
                        }
                        case 2 /* LineChanged */: {
                            lineBreaksComputer.addRequest(change.detail, null);
                            break;
                        }
                    }
                }
                var lineBreaks = lineBreaksComputer.finalize();
                var lineBreaksOffset = 0;
                for (var _c = 0, changes_2 = changes; _c < changes_2.length; _c++) {
                    var change = changes_2[_c];
                    switch (change.changeType) {
                        case 1 /* Flush */: {
                            _this.lines.onModelFlushed();
                            eventsCollector.emit(new viewEvents.ViewFlushedEvent());
                            _this.decorations.reset();
                            _this.viewLayout.onFlushed(_this.getLineCount());
                            hadOtherModelChange = true;
                            break;
                        }
                        case 3 /* LinesDeleted */: {
                            var linesDeletedEvent = _this.lines.onModelLinesDeleted(versionId, change.fromLineNumber, change.toLineNumber);
                            if (linesDeletedEvent !== null) {
                                eventsCollector.emit(linesDeletedEvent);
                                _this.viewLayout.onLinesDeleted(linesDeletedEvent.fromLineNumber, linesDeletedEvent.toLineNumber);
                            }
                            hadOtherModelChange = true;
                            break;
                        }
                        case 4 /* LinesInserted */: {
                            var insertedLineBreaks = lineBreaks.slice(lineBreaksOffset, lineBreaksOffset + change.detail.length);
                            lineBreaksOffset += change.detail.length;
                            var linesInsertedEvent = _this.lines.onModelLinesInserted(versionId, change.fromLineNumber, change.toLineNumber, insertedLineBreaks);
                            if (linesInsertedEvent !== null) {
                                eventsCollector.emit(linesInsertedEvent);
                                _this.viewLayout.onLinesInserted(linesInsertedEvent.fromLineNumber, linesInsertedEvent.toLineNumber);
                            }
                            hadOtherModelChange = true;
                            break;
                        }
                        case 2 /* LineChanged */: {
                            var changedLineBreakData = lineBreaks[lineBreaksOffset];
                            lineBreaksOffset++;
                            var _d = _this.lines.onModelLineChanged(versionId, change.lineNumber, changedLineBreakData), lineMappingChanged = _d[0], linesChangedEvent = _d[1], linesInsertedEvent = _d[2], linesDeletedEvent = _d[3];
                            hadModelLineChangeThatChangedLineMapping = lineMappingChanged;
                            if (linesChangedEvent) {
                                eventsCollector.emit(linesChangedEvent);
                            }
                            if (linesInsertedEvent) {
                                eventsCollector.emit(linesInsertedEvent);
                                _this.viewLayout.onLinesInserted(linesInsertedEvent.fromLineNumber, linesInsertedEvent.toLineNumber);
                            }
                            if (linesDeletedEvent) {
                                eventsCollector.emit(linesDeletedEvent);
                                _this.viewLayout.onLinesDeleted(linesDeletedEvent.fromLineNumber, linesDeletedEvent.toLineNumber);
                            }
                            break;
                        }
                        case 5 /* EOLChanged */: {
                            // Nothing to do. The new version will be accepted below
                            break;
                        }
                    }
                }
                _this.lines.acceptVersionId(versionId);
                _this.viewLayout.onHeightMaybeChanged();
                if (!hadOtherModelChange && hadModelLineChangeThatChangedLineMapping) {
                    eventsCollector.emit(new viewEvents.ViewLineMappingChangedEvent());
                    eventsCollector.emit(new viewEvents.ViewDecorationsChangedEvent());
                    _this.decorations.onLineMappingChanged();
                }
            }
            finally {
                _this._endEmit();
            }
            // Update the configuration and reset the centered view line
            _this.viewportStartLine = -1;
            _this.configuration.setMaxLineNumber(_this.model.getLineCount());
            // Recover viewport
            if (!_this.hasFocus && _this.model.getAttachedEditorCount() >= 2 && _this.viewportStartLineTrackedRange) {
                var modelRange = _this.model._getTrackedRange(_this.viewportStartLineTrackedRange);
                if (modelRange) {
                    var viewPosition = _this.coordinatesConverter.convertModelPositionToViewPosition(modelRange.getStartPosition());
                    var viewPositionTop = _this.viewLayout.getVerticalOffsetForLineNumber(viewPosition.lineNumber);
                    _this.viewLayout.setScrollPositionNow({ scrollTop: viewPositionTop + _this.viewportStartLineDelta });
                }
            }
        }));
        this._register(this.model.onDidChangeTokens(function (e) {
            var viewRanges = [];
            for (var j = 0, lenJ = e.ranges.length; j < lenJ; j++) {
                var modelRange = e.ranges[j];
                var viewStartLineNumber = _this.coordinatesConverter.convertModelPositionToViewPosition(new Position(modelRange.fromLineNumber, 1)).lineNumber;
                var viewEndLineNumber = _this.coordinatesConverter.convertModelPositionToViewPosition(new Position(modelRange.toLineNumber, _this.model.getLineMaxColumn(modelRange.toLineNumber))).lineNumber;
                viewRanges[j] = {
                    fromLineNumber: viewStartLineNumber,
                    toLineNumber: viewEndLineNumber
                };
            }
            try {
                var eventsCollector = _this._beginEmit();
                eventsCollector.emit(new viewEvents.ViewTokensChangedEvent(viewRanges));
            }
            finally {
                _this._endEmit();
            }
            if (e.tokenizationSupportChanged) {
                _this._tokenizeViewportSoon.schedule();
            }
        }));
        this._register(this.model.onDidChangeLanguageConfiguration(function (e) {
            try {
                var eventsCollector = _this._beginEmit();
                eventsCollector.emit(new viewEvents.ViewLanguageConfigurationEvent());
            }
            finally {
                _this._endEmit();
            }
        }));
        this._register(this.model.onDidChangeOptions(function (e) {
            // A tab size change causes a line mapping changed event => all view parts will repaint OK, no further event needed here
            if (_this.lines.setTabSize(_this.model.getOptions().tabSize)) {
                _this.decorations.onLineMappingChanged();
                _this.viewLayout.onFlushed(_this.getLineCount());
                try {
                    var eventsCollector = _this._beginEmit();
                    eventsCollector.emit(new viewEvents.ViewFlushedEvent());
                    eventsCollector.emit(new viewEvents.ViewLineMappingChangedEvent());
                    eventsCollector.emit(new viewEvents.ViewDecorationsChangedEvent());
                }
                finally {
                    _this._endEmit();
                }
            }
        }));
        this._register(this.model.onDidChangeDecorations(function (e) {
            _this.decorations.onModelDecorationsChanged();
            try {
                var eventsCollector = _this._beginEmit();
                eventsCollector.emit(new viewEvents.ViewDecorationsChangedEvent());
            }
            finally {
                _this._endEmit();
            }
        }));
    };
    ViewModel.prototype.setHiddenAreas = function (ranges) {
        try {
            var eventsCollector = this._beginEmit();
            var lineMappingChanged = this.lines.setHiddenAreas(ranges);
            if (lineMappingChanged) {
                eventsCollector.emit(new viewEvents.ViewFlushedEvent());
                eventsCollector.emit(new viewEvents.ViewLineMappingChangedEvent());
                eventsCollector.emit(new viewEvents.ViewDecorationsChangedEvent());
                this.decorations.onLineMappingChanged();
                this.viewLayout.onFlushed(this.getLineCount());
                this.viewLayout.onHeightMaybeChanged();
            }
        }
        finally {
            this._endEmit();
        }
    };
    ViewModel.prototype.getVisibleRanges = function () {
        var visibleViewRange = this.getCompletelyVisibleViewRange();
        var visibleRange = this.coordinatesConverter.convertViewRangeToModelRange(visibleViewRange);
        var hiddenAreas = this.lines.getHiddenAreas();
        if (hiddenAreas.length === 0) {
            return [visibleRange];
        }
        var result = [], resultLen = 0;
        var startLineNumber = visibleRange.startLineNumber;
        var startColumn = visibleRange.startColumn;
        var endLineNumber = visibleRange.endLineNumber;
        var endColumn = visibleRange.endColumn;
        for (var i = 0, len = hiddenAreas.length; i < len; i++) {
            var hiddenStartLineNumber = hiddenAreas[i].startLineNumber;
            var hiddenEndLineNumber = hiddenAreas[i].endLineNumber;
            if (hiddenEndLineNumber < startLineNumber) {
                continue;
            }
            if (hiddenStartLineNumber > endLineNumber) {
                continue;
            }
            if (startLineNumber < hiddenStartLineNumber) {
                result[resultLen++] = new Range(startLineNumber, startColumn, hiddenStartLineNumber - 1, this.model.getLineMaxColumn(hiddenStartLineNumber - 1));
            }
            startLineNumber = hiddenEndLineNumber + 1;
            startColumn = 1;
        }
        if (startLineNumber < endLineNumber || (startLineNumber === endLineNumber && startColumn < endColumn)) {
            result[resultLen++] = new Range(startLineNumber, startColumn, endLineNumber, endColumn);
        }
        return result;
    };
    ViewModel.prototype.getCompletelyVisibleViewRange = function () {
        var partialData = this.viewLayout.getLinesViewportData();
        var startViewLineNumber = partialData.completelyVisibleStartLineNumber;
        var endViewLineNumber = partialData.completelyVisibleEndLineNumber;
        return new Range(startViewLineNumber, this.getLineMinColumn(startViewLineNumber), endViewLineNumber, this.getLineMaxColumn(endViewLineNumber));
    };
    ViewModel.prototype.getCompletelyVisibleViewRangeAtScrollTop = function (scrollTop) {
        var partialData = this.viewLayout.getLinesViewportDataAtScrollTop(scrollTop);
        var startViewLineNumber = partialData.completelyVisibleStartLineNumber;
        var endViewLineNumber = partialData.completelyVisibleEndLineNumber;
        return new Range(startViewLineNumber, this.getLineMinColumn(startViewLineNumber), endViewLineNumber, this.getLineMaxColumn(endViewLineNumber));
    };
    ViewModel.prototype.saveState = function () {
        var compatViewState = this.viewLayout.saveState();
        var scrollTop = compatViewState.scrollTop;
        var firstViewLineNumber = this.viewLayout.getLineNumberAtVerticalOffset(scrollTop);
        var firstPosition = this.coordinatesConverter.convertViewPositionToModelPosition(new Position(firstViewLineNumber, this.getLineMinColumn(firstViewLineNumber)));
        var firstPositionDeltaTop = this.viewLayout.getVerticalOffsetForLineNumber(firstViewLineNumber) - scrollTop;
        return {
            scrollLeft: compatViewState.scrollLeft,
            firstPosition: firstPosition,
            firstPositionDeltaTop: firstPositionDeltaTop
        };
    };
    ViewModel.prototype.reduceRestoreState = function (state) {
        if (typeof state.firstPosition === 'undefined') {
            // This is a view state serialized by an older version
            return this._reduceRestoreStateCompatibility(state);
        }
        var modelPosition = this.model.validatePosition(state.firstPosition);
        var viewPosition = this.coordinatesConverter.convertModelPositionToViewPosition(modelPosition);
        var scrollTop = this.viewLayout.getVerticalOffsetForLineNumber(viewPosition.lineNumber) - state.firstPositionDeltaTop;
        return {
            scrollLeft: state.scrollLeft,
            scrollTop: scrollTop
        };
    };
    ViewModel.prototype._reduceRestoreStateCompatibility = function (state) {
        return {
            scrollLeft: state.scrollLeft,
            scrollTop: state.scrollTopWithoutViewZones
        };
    };
    ViewModel.prototype.getTabSize = function () {
        return this.model.getOptions().tabSize;
    };
    ViewModel.prototype.getOptions = function () {
        return this.model.getOptions();
    };
    ViewModel.prototype.getLineCount = function () {
        return this.lines.getViewLineCount();
    };
    /**
     * Gives a hint that a lot of requests are about to come in for these line numbers.
     */
    ViewModel.prototype.setViewport = function (startLineNumber, endLineNumber, centeredLineNumber) {
        this.viewportStartLine = startLineNumber;
        var position = this.coordinatesConverter.convertViewPositionToModelPosition(new Position(startLineNumber, this.getLineMinColumn(startLineNumber)));
        this.viewportStartLineTrackedRange = this.model._setTrackedRange(this.viewportStartLineTrackedRange, new Range(position.lineNumber, position.column, position.lineNumber, position.column), 1 /* NeverGrowsWhenTypingAtEdges */);
        var viewportStartLineTop = this.viewLayout.getVerticalOffsetForLineNumber(startLineNumber);
        var scrollTop = this.viewLayout.getCurrentScrollTop();
        this.viewportStartLineDelta = scrollTop - viewportStartLineTop;
    };
    ViewModel.prototype.getActiveIndentGuide = function (lineNumber, minLineNumber, maxLineNumber) {
        return this.lines.getActiveIndentGuide(lineNumber, minLineNumber, maxLineNumber);
    };
    ViewModel.prototype.getLinesIndentGuides = function (startLineNumber, endLineNumber) {
        return this.lines.getViewLinesIndentGuides(startLineNumber, endLineNumber);
    };
    ViewModel.prototype.getLineContent = function (lineNumber) {
        return this.lines.getViewLineContent(lineNumber);
    };
    ViewModel.prototype.getLineLength = function (lineNumber) {
        return this.lines.getViewLineLength(lineNumber);
    };
    ViewModel.prototype.getLineMinColumn = function (lineNumber) {
        return this.lines.getViewLineMinColumn(lineNumber);
    };
    ViewModel.prototype.getLineMaxColumn = function (lineNumber) {
        return this.lines.getViewLineMaxColumn(lineNumber);
    };
    ViewModel.prototype.getLineFirstNonWhitespaceColumn = function (lineNumber) {
        var result = strings.firstNonWhitespaceIndex(this.getLineContent(lineNumber));
        if (result === -1) {
            return 0;
        }
        return result + 1;
    };
    ViewModel.prototype.getLineLastNonWhitespaceColumn = function (lineNumber) {
        var result = strings.lastNonWhitespaceIndex(this.getLineContent(lineNumber));
        if (result === -1) {
            return 0;
        }
        return result + 2;
    };
    ViewModel.prototype.getDecorationsInViewport = function (visibleRange) {
        return this.decorations.getDecorationsViewportData(visibleRange).decorations;
    };
    ViewModel.prototype.getViewLineRenderingData = function (visibleRange, lineNumber) {
        var mightContainRTL = this.model.mightContainRTL();
        var mightContainNonBasicASCII = this.model.mightContainNonBasicASCII();
        var tabSize = this.getTabSize();
        var lineData = this.lines.getViewLineData(lineNumber);
        var allInlineDecorations = this.decorations.getDecorationsViewportData(visibleRange).inlineDecorations;
        var inlineDecorations = allInlineDecorations[lineNumber - visibleRange.startLineNumber];
        return new ViewLineRenderingData(lineData.minColumn, lineData.maxColumn, lineData.content, lineData.continuesWithWrappedLine, mightContainRTL, mightContainNonBasicASCII, lineData.tokens, inlineDecorations, tabSize, lineData.startVisibleColumn);
    };
    ViewModel.prototype.getViewLineData = function (lineNumber) {
        return this.lines.getViewLineData(lineNumber);
    };
    ViewModel.prototype.getMinimapLinesRenderingData = function (startLineNumber, endLineNumber, needed) {
        var result = this.lines.getViewLinesData(startLineNumber, endLineNumber, needed);
        return new MinimapLinesRenderingData(this.getTabSize(), result);
    };
    ViewModel.prototype.getAllOverviewRulerDecorations = function (theme) {
        return this.lines.getAllOverviewRulerDecorations(this.editorId, filterValidationDecorations(this.configuration.options), theme);
    };
    ViewModel.prototype.invalidateOverviewRulerColorCache = function () {
        var decorations = this.model.getOverviewRulerDecorations();
        for (var _i = 0, decorations_1 = decorations; _i < decorations_1.length; _i++) {
            var decoration = decorations_1[_i];
            var opts = decoration.options.overviewRuler;
            if (opts) {
                opts.invalidateCachedColor();
            }
        }
    };
    ViewModel.prototype.invalidateMinimapColorCache = function () {
        var decorations = this.model.getAllDecorations();
        for (var _i = 0, decorations_2 = decorations; _i < decorations_2.length; _i++) {
            var decoration = decorations_2[_i];
            var opts = decoration.options.minimap;
            if (opts) {
                opts.invalidateCachedColor();
            }
        }
    };
    ViewModel.prototype.getValueInRange = function (range, eol) {
        var modelRange = this.coordinatesConverter.convertViewRangeToModelRange(range);
        return this.model.getValueInRange(modelRange, eol);
    };
    ViewModel.prototype.getModelLineMaxColumn = function (modelLineNumber) {
        return this.model.getLineMaxColumn(modelLineNumber);
    };
    ViewModel.prototype.validateModelPosition = function (position) {
        return this.model.validatePosition(position);
    };
    ViewModel.prototype.validateModelRange = function (range) {
        return this.model.validateRange(range);
    };
    ViewModel.prototype.deduceModelPositionRelativeToViewPosition = function (viewAnchorPosition, deltaOffset, lineFeedCnt) {
        var modelAnchor = this.coordinatesConverter.convertViewPositionToModelPosition(viewAnchorPosition);
        if (this.model.getEOL().length === 2) {
            // This model uses CRLF, so the delta must take that into account
            if (deltaOffset < 0) {
                deltaOffset -= lineFeedCnt;
            }
            else {
                deltaOffset += lineFeedCnt;
            }
        }
        var modelAnchorOffset = this.model.getOffsetAt(modelAnchor);
        var resultOffset = modelAnchorOffset + deltaOffset;
        return this.model.getPositionAt(resultOffset);
    };
    ViewModel.prototype.getEOL = function () {
        return this.model.getEOL();
    };
    ViewModel.prototype.getPlainTextToCopy = function (modelRanges, emptySelectionClipboard, forceCRLF) {
        var newLineCharacter = forceCRLF ? '\r\n' : this.model.getEOL();
        modelRanges = modelRanges.slice(0);
        modelRanges.sort(Range.compareRangesUsingStarts);
        var hasEmptyRange = false;
        var hasNonEmptyRange = false;
        for (var _i = 0, modelRanges_1 = modelRanges; _i < modelRanges_1.length; _i++) {
            var range = modelRanges_1[_i];
            if (range.isEmpty()) {
                hasEmptyRange = true;
            }
            else {
                hasNonEmptyRange = true;
            }
        }
        if (!hasNonEmptyRange) {
            // all ranges are empty
            if (!emptySelectionClipboard) {
                return '';
            }
            var modelLineNumbers = modelRanges.map(function (r) { return r.startLineNumber; });
            var result_1 = '';
            for (var i = 0; i < modelLineNumbers.length; i++) {
                if (i > 0 && modelLineNumbers[i - 1] === modelLineNumbers[i]) {
                    continue;
                }
                result_1 += this.model.getLineContent(modelLineNumbers[i]) + newLineCharacter;
            }
            return result_1;
        }
        if (hasEmptyRange && emptySelectionClipboard) {
            // mixed empty selections and non-empty selections
            var result_2 = [];
            var prevModelLineNumber = 0;
            for (var _a = 0, modelRanges_2 = modelRanges; _a < modelRanges_2.length; _a++) {
                var modelRange = modelRanges_2[_a];
                var modelLineNumber = modelRange.startLineNumber;
                if (modelRange.isEmpty()) {
                    if (modelLineNumber !== prevModelLineNumber) {
                        result_2.push(this.model.getLineContent(modelLineNumber));
                    }
                }
                else {
                    result_2.push(this.model.getValueInRange(modelRange, forceCRLF ? 2 /* CRLF */ : 0 /* TextDefined */));
                }
                prevModelLineNumber = modelLineNumber;
            }
            return result_2.length === 1 ? result_2[0] : result_2;
        }
        var result = [];
        for (var _b = 0, modelRanges_3 = modelRanges; _b < modelRanges_3.length; _b++) {
            var modelRange = modelRanges_3[_b];
            if (!modelRange.isEmpty()) {
                result.push(this.model.getValueInRange(modelRange, forceCRLF ? 2 /* CRLF */ : 0 /* TextDefined */));
            }
        }
        return result.length === 1 ? result[0] : result;
    };
    ViewModel.prototype.getRichTextToCopy = function (modelRanges, emptySelectionClipboard) {
        var languageId = this.model.getLanguageIdentifier();
        if (languageId.id === 1 /* PlainText */) {
            return null;
        }
        if (modelRanges.length !== 1) {
            // no multiple selection support at this time
            return null;
        }
        var range = modelRanges[0];
        if (range.isEmpty()) {
            if (!emptySelectionClipboard) {
                // nothing to copy
                return null;
            }
            var lineNumber = range.startLineNumber;
            range = new Range(lineNumber, this.model.getLineMinColumn(lineNumber), lineNumber, this.model.getLineMaxColumn(lineNumber));
        }
        var fontInfo = this.configuration.options.get(34 /* fontInfo */);
        var colorMap = this._getColorMap();
        var fontFamily = fontInfo.fontFamily === EDITOR_FONT_DEFAULTS.fontFamily ? fontInfo.fontFamily : "'" + fontInfo.fontFamily + "', " + EDITOR_FONT_DEFAULTS.fontFamily;
        return {
            mode: languageId.language,
            html: ("<div style=\""
                + ("color: " + colorMap[1 /* DefaultForeground */] + ";")
                + ("background-color: " + colorMap[2 /* DefaultBackground */] + ";")
                + ("font-family: " + fontFamily + ";")
                + ("font-weight: " + fontInfo.fontWeight + ";")
                + ("font-size: " + fontInfo.fontSize + "px;")
                + ("line-height: " + fontInfo.lineHeight + "px;")
                + "white-space: pre;"
                + "\">"
                + this._getHTMLToCopy(range, colorMap)
                + '</div>')
        };
    };
    ViewModel.prototype._getHTMLToCopy = function (modelRange, colorMap) {
        var startLineNumber = modelRange.startLineNumber;
        var startColumn = modelRange.startColumn;
        var endLineNumber = modelRange.endLineNumber;
        var endColumn = modelRange.endColumn;
        var tabSize = this.getTabSize();
        var result = '';
        for (var lineNumber = startLineNumber; lineNumber <= endLineNumber; lineNumber++) {
            var lineTokens = this.model.getLineTokens(lineNumber);
            var lineContent = lineTokens.getLineContent();
            var startOffset = (lineNumber === startLineNumber ? startColumn - 1 : 0);
            var endOffset = (lineNumber === endLineNumber ? endColumn - 1 : lineContent.length);
            if (lineContent === '') {
                result += '<br>';
            }
            else {
                result += tokenizeLineToHTML(lineContent, lineTokens.inflate(), colorMap, startOffset, endOffset, tabSize, platform.isWindows);
            }
        }
        return result;
    };
    ViewModel.prototype._getColorMap = function () {
        var colorMap = TokenizationRegistry.getColorMap();
        var result = ['#000000'];
        if (colorMap) {
            for (var i = 1, len = colorMap.length; i < len; i++) {
                result[i] = Color.Format.CSS.formatHex(colorMap[i]);
            }
        }
        return result;
    };
    return ViewModel;
}(viewEvents.ViewEventEmitter));
export { ViewModel };
