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
import './textAreaHandler.css';
import * as nls from '../../../nls';
import * as browser from '../../../base/browser/browser';
import { createFastDomNode } from '../../../base/browser/fastDomNode';
import * as platform from '../../../base/common/platform';
import * as strings from '../../../base/common/strings';
import { Configuration } from '../config/configuration';
import { CopyOptions, TextAreaInput } from './textAreaInput';
import { PagedScreenReaderStrategy, TextAreaState } from './textAreaState';
import { PartFingerprints, ViewPart } from '../view/viewPart';
import { LineNumbersOverlay } from '../viewParts/lineNumbers/lineNumbers';
import { Margin } from '../viewParts/margin/margin';
import { EditorOptions } from '../../common/config/editorOptions';
import { getMapForWordSeparators } from '../../common/controller/wordCharacterClassifier';
import { Position } from '../../common/core/position';
import { Range } from '../../common/core/range';
import { Selection } from '../../common/core/selection';
import * as viewEvents from '../../common/view/viewEvents';
var VisibleTextAreaData = /** @class */ (function () {
    function VisibleTextAreaData(top, left, width) {
        this.top = top;
        this.left = left;
        this.width = width;
    }
    VisibleTextAreaData.prototype.setWidth = function (width) {
        return new VisibleTextAreaData(this.top, this.left, width);
    };
    return VisibleTextAreaData;
}());
var canUseZeroSizeTextarea = (browser.isEdgeOrIE || browser.isFirefox);
var TextAreaHandler = /** @class */ (function (_super) {
    __extends(TextAreaHandler, _super);
    function TextAreaHandler(context, viewController, viewHelper) {
        var _this = _super.call(this, context) || this;
        // --- end view API
        _this._primaryCursorPosition = new Position(1, 1);
        _this._primaryCursorVisibleRange = null;
        _this._viewController = viewController;
        _this._viewHelper = viewHelper;
        _this._scrollLeft = 0;
        _this._scrollTop = 0;
        var options = _this._context.configuration.options;
        var layoutInfo = options.get(107 /* layoutInfo */);
        _this._setAccessibilityOptions(options);
        _this._contentLeft = layoutInfo.contentLeft;
        _this._contentWidth = layoutInfo.contentWidth;
        _this._contentHeight = layoutInfo.height;
        _this._fontInfo = options.get(34 /* fontInfo */);
        _this._lineHeight = options.get(49 /* lineHeight */);
        _this._emptySelectionClipboard = options.get(25 /* emptySelectionClipboard */);
        _this._copyWithSyntaxHighlighting = options.get(15 /* copyWithSyntaxHighlighting */);
        _this._visibleTextArea = null;
        _this._selections = [new Selection(1, 1, 1, 1)];
        _this._modelSelections = [new Selection(1, 1, 1, 1)];
        _this._lastRenderPosition = null;
        // Text Area (The focus will always be in the textarea when the cursor is blinking)
        _this.textArea = createFastDomNode(document.createElement('textarea'));
        PartFingerprints.write(_this.textArea, 6 /* TextArea */);
        _this.textArea.setClassName('inputarea');
        _this.textArea.setAttribute('wrap', 'off');
        _this.textArea.setAttribute('autocorrect', 'off');
        _this.textArea.setAttribute('autocapitalize', 'off');
        _this.textArea.setAttribute('autocomplete', 'off');
        _this.textArea.setAttribute('spellcheck', 'false');
        _this.textArea.setAttribute('aria-label', _this._getAriaLabel(options));
        _this.textArea.setAttribute('role', 'textbox');
        _this.textArea.setAttribute('aria-multiline', 'true');
        _this.textArea.setAttribute('aria-haspopup', 'false');
        _this.textArea.setAttribute('aria-autocomplete', 'both');
        if (platform.isWeb && options.get(68 /* readOnly */)) {
            _this.textArea.setAttribute('readonly', 'true');
        }
        _this.textAreaCover = createFastDomNode(document.createElement('div'));
        _this.textAreaCover.setPosition('absolute');
        var simpleModel = {
            getLineCount: function () {
                return _this._context.model.getLineCount();
            },
            getLineMaxColumn: function (lineNumber) {
                return _this._context.model.getLineMaxColumn(lineNumber);
            },
            getValueInRange: function (range, eol) {
                return _this._context.model.getValueInRange(range, eol);
            }
        };
        var textAreaInputHost = {
            getDataToCopy: function (generateHTML) {
                var rawTextToCopy = _this._context.model.getPlainTextToCopy(_this._modelSelections, _this._emptySelectionClipboard, platform.isWindows);
                var newLineCharacter = _this._context.model.getEOL();
                var isFromEmptySelection = (_this._emptySelectionClipboard && _this._modelSelections.length === 1 && _this._modelSelections[0].isEmpty());
                var multicursorText = (Array.isArray(rawTextToCopy) ? rawTextToCopy : null);
                var text = (Array.isArray(rawTextToCopy) ? rawTextToCopy.join(newLineCharacter) : rawTextToCopy);
                var html = undefined;
                var mode = null;
                if (generateHTML) {
                    if (CopyOptions.forceCopyWithSyntaxHighlighting || (_this._copyWithSyntaxHighlighting && text.length < 65536)) {
                        var richText = _this._context.model.getRichTextToCopy(_this._modelSelections, _this._emptySelectionClipboard);
                        if (richText) {
                            html = richText.html;
                            mode = richText.mode;
                        }
                    }
                }
                return {
                    isFromEmptySelection: isFromEmptySelection,
                    multicursorText: multicursorText,
                    text: text,
                    html: html,
                    mode: mode
                };
            },
            getScreenReaderContent: function (currentState) {
                if (browser.isIPad) {
                    // Do not place anything in the textarea for the iPad
                    return TextAreaState.EMPTY;
                }
                if (_this._accessibilitySupport === 1 /* Disabled */) {
                    // We know for a fact that a screen reader is not attached
                    // On OSX, we write the character before the cursor to allow for "long-press" composition
                    // Also on OSX, we write the word before the cursor to allow for the Accessibility Keyboard to give good hints
                    if (platform.isMacintosh) {
                        var selection = _this._selections[0];
                        if (selection.isEmpty()) {
                            var position = selection.getStartPosition();
                            var textBefore = _this._getWordBeforePosition(position);
                            if (textBefore.length === 0) {
                                textBefore = _this._getCharacterBeforePosition(position);
                            }
                            if (textBefore.length > 0) {
                                return new TextAreaState(textBefore, textBefore.length, textBefore.length, position, position);
                            }
                        }
                    }
                    return TextAreaState.EMPTY;
                }
                return PagedScreenReaderStrategy.fromEditorSelection(currentState, simpleModel, _this._selections[0], _this._accessibilityPageSize, _this._accessibilitySupport === 0 /* Unknown */);
            },
            deduceModelPosition: function (viewAnchorPosition, deltaOffset, lineFeedCnt) {
                return _this._context.model.deduceModelPositionRelativeToViewPosition(viewAnchorPosition, deltaOffset, lineFeedCnt);
            }
        };
        _this._textAreaInput = _this._register(new TextAreaInput(textAreaInputHost, _this.textArea));
        _this._register(_this._textAreaInput.onKeyDown(function (e) {
            _this._viewController.emitKeyDown(e);
        }));
        _this._register(_this._textAreaInput.onKeyUp(function (e) {
            _this._viewController.emitKeyUp(e);
        }));
        _this._register(_this._textAreaInput.onPaste(function (e) {
            var pasteOnNewLine = false;
            var multicursorText = null;
            var mode = null;
            if (e.metadata) {
                pasteOnNewLine = (_this._emptySelectionClipboard && !!e.metadata.isFromEmptySelection);
                multicursorText = (typeof e.metadata.multicursorText !== 'undefined' ? e.metadata.multicursorText : null);
                mode = e.metadata.mode;
            }
            _this._viewController.paste('keyboard', e.text, pasteOnNewLine, multicursorText, mode);
        }));
        _this._register(_this._textAreaInput.onCut(function () {
            _this._viewController.cut('keyboard');
        }));
        _this._register(_this._textAreaInput.onType(function (e) {
            if (e.replaceCharCnt) {
                _this._viewController.replacePreviousChar('keyboard', e.text, e.replaceCharCnt);
            }
            else {
                _this._viewController.type('keyboard', e.text);
            }
        }));
        _this._register(_this._textAreaInput.onSelectionChangeRequest(function (modelSelection) {
            _this._viewController.setSelection('keyboard', modelSelection);
        }));
        _this._register(_this._textAreaInput.onCompositionStart(function () {
            var lineNumber = _this._selections[0].startLineNumber;
            var column = _this._selections[0].startColumn;
            _this._context.privateViewEventBus.emit(new viewEvents.ViewRevealRangeRequestEvent('keyboard', new Range(lineNumber, column, lineNumber, column), 0 /* Simple */, true, 1 /* Immediate */));
            // Find range pixel position
            var visibleRange = _this._viewHelper.visibleRangeForPositionRelativeToEditor(lineNumber, column);
            if (visibleRange) {
                _this._visibleTextArea = new VisibleTextAreaData(_this._context.viewLayout.getVerticalOffsetForLineNumber(lineNumber), visibleRange.left, canUseZeroSizeTextarea ? 0 : 1);
                _this._render();
            }
            // Show the textarea
            _this.textArea.setClassName('inputarea ime-input');
            _this._viewController.compositionStart('keyboard');
        }));
        _this._register(_this._textAreaInput.onCompositionUpdate(function (e) {
            if (browser.isEdgeOrIE) {
                // Due to isEdgeOrIE (where the textarea was not cleared initially)
                // we cannot assume the text consists only of the composited text
                _this._visibleTextArea = _this._visibleTextArea.setWidth(0);
            }
            else {
                // adjust width by its size
                _this._visibleTextArea = _this._visibleTextArea.setWidth(measureText(e.data, _this._fontInfo));
            }
            _this._render();
        }));
        _this._register(_this._textAreaInput.onCompositionEnd(function () {
            _this._visibleTextArea = null;
            _this._render();
            _this.textArea.setClassName('inputarea');
            _this._viewController.compositionEnd('keyboard');
        }));
        _this._register(_this._textAreaInput.onFocus(function () {
            _this._context.privateViewEventBus.emit(new viewEvents.ViewFocusChangedEvent(true));
        }));
        _this._register(_this._textAreaInput.onBlur(function () {
            _this._context.privateViewEventBus.emit(new viewEvents.ViewFocusChangedEvent(false));
        }));
        return _this;
    }
    TextAreaHandler.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    TextAreaHandler.prototype._getWordBeforePosition = function (position) {
        var lineContent = this._context.model.getLineContent(position.lineNumber);
        var wordSeparators = getMapForWordSeparators(this._context.configuration.options.get(96 /* wordSeparators */));
        var column = position.column;
        var distance = 0;
        while (column > 1) {
            var charCode = lineContent.charCodeAt(column - 2);
            var charClass = wordSeparators.get(charCode);
            if (charClass !== 0 /* Regular */ || distance > 50) {
                return lineContent.substring(column - 1, position.column - 1);
            }
            distance++;
            column--;
        }
        return lineContent.substring(0, position.column - 1);
    };
    TextAreaHandler.prototype._getCharacterBeforePosition = function (position) {
        if (position.column > 1) {
            var lineContent = this._context.model.getLineContent(position.lineNumber);
            var charBefore = lineContent.charAt(position.column - 2);
            if (!strings.isHighSurrogate(charBefore.charCodeAt(0))) {
                return charBefore;
            }
        }
        return '';
    };
    TextAreaHandler.prototype._getAriaLabel = function (options) {
        var accessibilitySupport = options.get(2 /* accessibilitySupport */);
        if (accessibilitySupport === 1 /* Disabled */) {
            return nls.localize('accessibilityOffAriaLabel', "The editor is not accessible at this time. Press Alt+F1 for options.");
        }
        return options.get(4 /* ariaLabel */);
    };
    TextAreaHandler.prototype._setAccessibilityOptions = function (options) {
        this._accessibilitySupport = options.get(2 /* accessibilitySupport */);
        var accessibilityPageSize = options.get(3 /* accessibilityPageSize */);
        if (this._accessibilitySupport === 2 /* Enabled */ && accessibilityPageSize === EditorOptions.accessibilityPageSize.defaultValue) {
            // If a screen reader is attached and the default value is not set we shuold automatically increase the page size to 160 for a better experience
            // If we put more than 160 lines the nvda can not handle this https://github.com/microsoft/vscode/issues/89717
            this._accessibilityPageSize = 160;
        }
        else {
            this._accessibilityPageSize = accessibilityPageSize;
        }
    };
    // --- begin event handlers
    TextAreaHandler.prototype.onConfigurationChanged = function (e) {
        var options = this._context.configuration.options;
        var layoutInfo = options.get(107 /* layoutInfo */);
        this._setAccessibilityOptions(options);
        this._contentLeft = layoutInfo.contentLeft;
        this._contentWidth = layoutInfo.contentWidth;
        this._contentHeight = layoutInfo.height;
        this._fontInfo = options.get(34 /* fontInfo */);
        this._lineHeight = options.get(49 /* lineHeight */);
        this._emptySelectionClipboard = options.get(25 /* emptySelectionClipboard */);
        this._copyWithSyntaxHighlighting = options.get(15 /* copyWithSyntaxHighlighting */);
        this.textArea.setAttribute('aria-label', this._getAriaLabel(options));
        if (platform.isWeb && e.hasChanged(68 /* readOnly */)) {
            if (options.get(68 /* readOnly */)) {
                this.textArea.setAttribute('readonly', 'true');
            }
            else {
                this.textArea.removeAttribute('readonly');
            }
        }
        if (e.hasChanged(2 /* accessibilitySupport */)) {
            this._textAreaInput.writeScreenReaderContent('strategy changed');
        }
        return true;
    };
    TextAreaHandler.prototype.onCursorStateChanged = function (e) {
        this._selections = e.selections.slice(0);
        this._modelSelections = e.modelSelections.slice(0);
        this._textAreaInput.writeScreenReaderContent('selection changed');
        return true;
    };
    TextAreaHandler.prototype.onDecorationsChanged = function (e) {
        // true for inline decorations that can end up relayouting text
        return true;
    };
    TextAreaHandler.prototype.onFlushed = function (e) {
        return true;
    };
    TextAreaHandler.prototype.onLinesChanged = function (e) {
        return true;
    };
    TextAreaHandler.prototype.onLinesDeleted = function (e) {
        return true;
    };
    TextAreaHandler.prototype.onLinesInserted = function (e) {
        return true;
    };
    TextAreaHandler.prototype.onScrollChanged = function (e) {
        this._scrollLeft = e.scrollLeft;
        this._scrollTop = e.scrollTop;
        return true;
    };
    TextAreaHandler.prototype.onZonesChanged = function (e) {
        return true;
    };
    // --- end event handlers
    // --- begin view API
    TextAreaHandler.prototype.isFocused = function () {
        return this._textAreaInput.isFocused();
    };
    TextAreaHandler.prototype.focusTextArea = function () {
        this._textAreaInput.focusTextArea();
    };
    TextAreaHandler.prototype.refreshFocusState = function () {
        this._textAreaInput.refreshFocusState();
    };
    TextAreaHandler.prototype.getLastRenderData = function () {
        return this._lastRenderPosition;
    };
    TextAreaHandler.prototype.setAriaOptions = function (options) {
        if (options.activeDescendant) {
            this.textArea.setAttribute('aria-haspopup', 'true');
            this.textArea.setAttribute('aria-autocomplete', 'list');
            this.textArea.setAttribute('aria-activedescendant', options.activeDescendant);
        }
        else {
            this.textArea.setAttribute('aria-haspopup', 'false');
            this.textArea.setAttribute('aria-autocomplete', 'both');
            this.textArea.removeAttribute('aria-activedescendant');
        }
    };
    TextAreaHandler.prototype.prepareRender = function (ctx) {
        this._primaryCursorPosition = new Position(this._selections[0].positionLineNumber, this._selections[0].positionColumn);
        this._primaryCursorVisibleRange = ctx.visibleRangeForPosition(this._primaryCursorPosition);
    };
    TextAreaHandler.prototype.render = function (ctx) {
        this._textAreaInput.writeScreenReaderContent('render');
        this._render();
    };
    TextAreaHandler.prototype._render = function () {
        if (this._visibleTextArea) {
            // The text area is visible for composition reasons
            this._renderInsideEditor(null, this._visibleTextArea.top - this._scrollTop, this._contentLeft + this._visibleTextArea.left - this._scrollLeft, this._visibleTextArea.width, this._lineHeight);
            return;
        }
        if (!this._primaryCursorVisibleRange) {
            // The primary cursor is outside the viewport => place textarea to the top left
            this._renderAtTopLeft();
            return;
        }
        var left = this._contentLeft + this._primaryCursorVisibleRange.left - this._scrollLeft;
        if (left < this._contentLeft || left > this._contentLeft + this._contentWidth) {
            // cursor is outside the viewport
            this._renderAtTopLeft();
            return;
        }
        var top = this._context.viewLayout.getVerticalOffsetForLineNumber(this._selections[0].positionLineNumber) - this._scrollTop;
        if (top < 0 || top > this._contentHeight) {
            // cursor is outside the viewport
            this._renderAtTopLeft();
            return;
        }
        // The primary cursor is in the viewport (at least vertically) => place textarea on the cursor
        if (platform.isMacintosh) {
            // For the popup emoji input, we will make the text area as high as the line height
            // We will also make the fontSize and lineHeight the correct dimensions to help with the placement of these pickers
            this._renderInsideEditor(this._primaryCursorPosition, top, left, canUseZeroSizeTextarea ? 0 : 1, this._lineHeight);
            return;
        }
        this._renderInsideEditor(this._primaryCursorPosition, top, left, canUseZeroSizeTextarea ? 0 : 1, canUseZeroSizeTextarea ? 0 : 1);
    };
    TextAreaHandler.prototype._renderInsideEditor = function (renderedPosition, top, left, width, height) {
        this._lastRenderPosition = renderedPosition;
        var ta = this.textArea;
        var tac = this.textAreaCover;
        Configuration.applyFontInfo(ta, this._fontInfo);
        ta.setTop(top);
        ta.setLeft(left);
        ta.setWidth(width);
        ta.setHeight(height);
        tac.setTop(0);
        tac.setLeft(0);
        tac.setWidth(0);
        tac.setHeight(0);
    };
    TextAreaHandler.prototype._renderAtTopLeft = function () {
        this._lastRenderPosition = null;
        var ta = this.textArea;
        var tac = this.textAreaCover;
        Configuration.applyFontInfo(ta, this._fontInfo);
        ta.setTop(0);
        ta.setLeft(0);
        tac.setTop(0);
        tac.setLeft(0);
        if (canUseZeroSizeTextarea) {
            ta.setWidth(0);
            ta.setHeight(0);
            tac.setWidth(0);
            tac.setHeight(0);
            return;
        }
        // (in WebKit the textarea is 1px by 1px because it cannot handle input to a 0x0 textarea)
        // specifically, when doing Korean IME, setting the textarea to 0x0 breaks IME badly.
        ta.setWidth(1);
        ta.setHeight(1);
        tac.setWidth(1);
        tac.setHeight(1);
        var options = this._context.configuration.options;
        if (options.get(40 /* glyphMargin */)) {
            tac.setClassName('monaco-editor-background textAreaCover ' + Margin.OUTER_CLASS_NAME);
        }
        else {
            if (options.get(50 /* lineNumbers */).renderType !== 0 /* Off */) {
                tac.setClassName('monaco-editor-background textAreaCover ' + LineNumbersOverlay.CLASS_NAME);
            }
            else {
                tac.setClassName('monaco-editor-background textAreaCover');
            }
        }
    };
    return TextAreaHandler;
}(ViewPart));
export { TextAreaHandler };
function measureText(text, fontInfo) {
    // adjust width by its size
    var canvasElem = document.createElement('canvas');
    var context = canvasElem.getContext('2d');
    context.font = createFontString(fontInfo);
    var metrics = context.measureText(text);
    if (browser.isFirefox) {
        return metrics.width + 2; // +2 for Japanese...
    }
    else {
        return metrics.width;
    }
}
function createFontString(bareFontInfo) {
    return doCreateFontString('normal', bareFontInfo.fontWeight, bareFontInfo.fontSize, bareFontInfo.lineHeight, bareFontInfo.fontFamily);
}
function doCreateFontString(fontStyle, fontWeight, fontSize, lineHeight, fontFamily) {
    // The full font syntax is:
    // style | variant | weight | stretch | size/line-height | fontFamily
    // (https://developer.mozilla.org/en-US/docs/Web/CSS/font)
    // But it appears Edge and IE11 cannot properly parse `stretch`.
    return fontStyle + " normal " + fontWeight + " " + fontSize + "px / " + lineHeight + "px " + fontFamily;
}
