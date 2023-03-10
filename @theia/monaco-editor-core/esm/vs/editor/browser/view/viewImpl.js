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
import * as dom from '../../../base/browser/dom';
import { createFastDomNode } from '../../../base/browser/fastDomNode';
import { onUnexpectedError } from '../../../base/common/errors';
import { PointerHandler } from '../controller/pointerHandler';
import { TextAreaHandler } from '../controller/textAreaHandler';
import { ViewController } from './viewController';
import { ViewOutgoingEvents } from './viewOutgoingEvents';
import { ContentViewOverlays, MarginViewOverlays } from './viewOverlays';
import { PartFingerprints } from './viewPart';
import { ViewContentWidgets } from '../viewParts/contentWidgets/contentWidgets';
import { CurrentLineHighlightOverlay, CurrentLineMarginHighlightOverlay } from '../viewParts/currentLineHighlight/currentLineHighlight';
import { DecorationsOverlay } from '../viewParts/decorations/decorations';
import { EditorScrollbar } from '../viewParts/editorScrollbar/editorScrollbar';
import { GlyphMarginOverlay } from '../viewParts/glyphMargin/glyphMargin';
import { IndentGuidesOverlay } from '../viewParts/indentGuides/indentGuides';
import { LineNumbersOverlay } from '../viewParts/lineNumbers/lineNumbers';
import { ViewLines } from '../viewParts/lines/viewLines';
import { LinesDecorationsOverlay } from '../viewParts/linesDecorations/linesDecorations';
import { Margin } from '../viewParts/margin/margin';
import { MarginViewLineDecorationsOverlay } from '../viewParts/marginDecorations/marginDecorations';
import { Minimap } from '../viewParts/minimap/minimap';
import { ViewOverlayWidgets } from '../viewParts/overlayWidgets/overlayWidgets';
import { DecorationsOverviewRuler } from '../viewParts/overviewRuler/decorationsOverviewRuler';
import { OverviewRuler } from '../viewParts/overviewRuler/overviewRuler';
import { Rulers } from '../viewParts/rulers/rulers';
import { ScrollDecorationViewPart } from '../viewParts/scrollDecoration/scrollDecoration';
import { SelectionsOverlay } from '../viewParts/selections/selections';
import { ViewCursors } from '../viewParts/viewCursors/viewCursors';
import { ViewZones } from '../viewParts/viewZones/viewZones';
import { Position } from '../../common/core/position';
import { Range } from '../../common/core/range';
import { RenderingContext } from '../../common/view/renderingContext';
import { ViewContext } from '../../common/view/viewContext';
import { ViewEventDispatcher } from '../../common/view/viewEventDispatcher';
import * as viewEvents from '../../common/view/viewEvents';
import { ViewportData } from '../../common/viewLayout/viewLinesViewportData';
import { ViewEventHandler } from '../../common/viewModel/viewEventHandler';
import { getThemeTypeSelector } from '../../../platform/theme/common/themeService';
import { PointerHandlerLastRenderData } from '../controller/mouseTarget';
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(commandDelegate, configuration, themeService, model, cursor, outgoingEvents) {
        var _this = _super.call(this) || this;
        _this._cursor = cursor;
        _this._renderAnimationFrame = null;
        _this.outgoingEvents = outgoingEvents;
        var viewController = new ViewController(configuration, model, _this.outgoingEvents, commandDelegate);
        // The event dispatcher will always go through _renderOnce before dispatching any events
        _this.eventDispatcher = new ViewEventDispatcher(function (callback) { return _this._renderOnce(callback); });
        // Ensure the view is the first event handler in order to update the layout
        _this.eventDispatcher.addEventHandler(_this);
        // The view context is passed on to most classes (basically to reduce param. counts in ctors)
        _this._context = new ViewContext(configuration, themeService.getTheme(), model, _this.eventDispatcher);
        _this._register(themeService.onThemeChange(function (theme) {
            _this._context.theme = theme;
            _this.eventDispatcher.emit(new viewEvents.ViewThemeChangedEvent());
            _this.render(true, false);
        }));
        _this.viewParts = [];
        // Keyboard handler
        _this._textAreaHandler = new TextAreaHandler(_this._context, viewController, _this.createTextAreaHandlerHelper());
        _this.viewParts.push(_this._textAreaHandler);
        // These two dom nodes must be constructed up front, since references are needed in the layout provider (scrolling & co.)
        _this.linesContent = createFastDomNode(document.createElement('div'));
        _this.linesContent.setClassName('lines-content' + ' monaco-editor-background');
        _this.linesContent.setPosition('absolute');
        _this.domNode = createFastDomNode(document.createElement('div'));
        _this.domNode.setClassName(_this.getEditorClassName());
        _this.overflowGuardContainer = createFastDomNode(document.createElement('div'));
        PartFingerprints.write(_this.overflowGuardContainer, 3 /* OverflowGuard */);
        _this.overflowGuardContainer.setClassName('overflow-guard');
        _this._scrollbar = new EditorScrollbar(_this._context, _this.linesContent, _this.domNode, _this.overflowGuardContainer);
        _this.viewParts.push(_this._scrollbar);
        // View Lines
        _this.viewLines = new ViewLines(_this._context, _this.linesContent);
        // View Zones
        _this.viewZones = new ViewZones(_this._context);
        _this.viewParts.push(_this.viewZones);
        // Decorations overview ruler
        var decorationsOverviewRuler = new DecorationsOverviewRuler(_this._context);
        _this.viewParts.push(decorationsOverviewRuler);
        var scrollDecoration = new ScrollDecorationViewPart(_this._context);
        _this.viewParts.push(scrollDecoration);
        var contentViewOverlays = new ContentViewOverlays(_this._context);
        _this.viewParts.push(contentViewOverlays);
        contentViewOverlays.addDynamicOverlay(new CurrentLineHighlightOverlay(_this._context));
        contentViewOverlays.addDynamicOverlay(new SelectionsOverlay(_this._context));
        contentViewOverlays.addDynamicOverlay(new IndentGuidesOverlay(_this._context));
        contentViewOverlays.addDynamicOverlay(new DecorationsOverlay(_this._context));
        var marginViewOverlays = new MarginViewOverlays(_this._context);
        _this.viewParts.push(marginViewOverlays);
        marginViewOverlays.addDynamicOverlay(new CurrentLineMarginHighlightOverlay(_this._context));
        marginViewOverlays.addDynamicOverlay(new GlyphMarginOverlay(_this._context));
        marginViewOverlays.addDynamicOverlay(new MarginViewLineDecorationsOverlay(_this._context));
        marginViewOverlays.addDynamicOverlay(new LinesDecorationsOverlay(_this._context));
        marginViewOverlays.addDynamicOverlay(new LineNumbersOverlay(_this._context));
        var margin = new Margin(_this._context);
        margin.getDomNode().appendChild(_this.viewZones.marginDomNode);
        margin.getDomNode().appendChild(marginViewOverlays.getDomNode());
        _this.viewParts.push(margin);
        // Content widgets
        _this.contentWidgets = new ViewContentWidgets(_this._context, _this.domNode);
        _this.viewParts.push(_this.contentWidgets);
        _this.viewCursors = new ViewCursors(_this._context);
        _this.viewParts.push(_this.viewCursors);
        // Overlay widgets
        _this.overlayWidgets = new ViewOverlayWidgets(_this._context);
        _this.viewParts.push(_this.overlayWidgets);
        var rulers = new Rulers(_this._context);
        _this.viewParts.push(rulers);
        var minimap = new Minimap(_this._context);
        _this.viewParts.push(minimap);
        // -------------- Wire dom nodes up
        if (decorationsOverviewRuler) {
            var overviewRulerData = _this._scrollbar.getOverviewRulerLayoutInfo();
            overviewRulerData.parent.insertBefore(decorationsOverviewRuler.getDomNode(), overviewRulerData.insertBefore);
        }
        _this.linesContent.appendChild(contentViewOverlays.getDomNode());
        _this.linesContent.appendChild(rulers.domNode);
        _this.linesContent.appendChild(_this.viewZones.domNode);
        _this.linesContent.appendChild(_this.viewLines.getDomNode());
        _this.linesContent.appendChild(_this.contentWidgets.domNode);
        _this.linesContent.appendChild(_this.viewCursors.getDomNode());
        _this.overflowGuardContainer.appendChild(margin.getDomNode());
        _this.overflowGuardContainer.appendChild(_this._scrollbar.getDomNode());
        _this.overflowGuardContainer.appendChild(scrollDecoration.getDomNode());
        _this.overflowGuardContainer.appendChild(_this._textAreaHandler.textArea);
        _this.overflowGuardContainer.appendChild(_this._textAreaHandler.textAreaCover);
        _this.overflowGuardContainer.appendChild(_this.overlayWidgets.getDomNode());
        _this.overflowGuardContainer.appendChild(minimap.getDomNode());
        _this.domNode.appendChild(_this.overflowGuardContainer);
        _this.domNode.appendChild(_this.contentWidgets.overflowingContentWidgetsDomNode);
        _this._applyLayout();
        // Pointer handler
        _this.pointerHandler = _this._register(new PointerHandler(_this._context, viewController, _this.createPointerHandlerHelper()));
        _this._register(model.addEventListener(function (events) {
            _this.eventDispatcher.emitMany(events);
        }));
        _this._register(_this._cursor.addEventListener(function (events) {
            _this.eventDispatcher.emitMany(events);
        }));
        return _this;
    }
    View.prototype._flushAccumulatedAndRenderNow = function () {
        this._renderNow();
    };
    View.prototype.createPointerHandlerHelper = function () {
        var _this = this;
        return {
            viewDomNode: this.domNode.domNode,
            linesContentDomNode: this.linesContent.domNode,
            focusTextArea: function () {
                _this.focus();
            },
            getLastRenderData: function () {
                var lastViewCursorsRenderData = _this.viewCursors.getLastRenderData() || [];
                var lastTextareaPosition = _this._textAreaHandler.getLastRenderData();
                return new PointerHandlerLastRenderData(lastViewCursorsRenderData, lastTextareaPosition);
            },
            shouldSuppressMouseDownOnViewZone: function (viewZoneId) {
                return _this.viewZones.shouldSuppressMouseDownOnViewZone(viewZoneId);
            },
            shouldSuppressMouseDownOnWidget: function (widgetId) {
                return _this.contentWidgets.shouldSuppressMouseDownOnWidget(widgetId);
            },
            getPositionFromDOMInfo: function (spanNode, offset) {
                _this._flushAccumulatedAndRenderNow();
                return _this.viewLines.getPositionFromDOMInfo(spanNode, offset);
            },
            visibleRangeForPosition: function (lineNumber, column) {
                _this._flushAccumulatedAndRenderNow();
                return _this.viewLines.visibleRangeForPosition(new Position(lineNumber, column));
            },
            getLineWidth: function (lineNumber) {
                _this._flushAccumulatedAndRenderNow();
                return _this.viewLines.getLineWidth(lineNumber);
            }
        };
    };
    View.prototype.createTextAreaHandlerHelper = function () {
        var _this = this;
        return {
            visibleRangeForPositionRelativeToEditor: function (lineNumber, column) {
                _this._flushAccumulatedAndRenderNow();
                return _this.viewLines.visibleRangeForPosition(new Position(lineNumber, column));
            }
        };
    };
    View.prototype._applyLayout = function () {
        var options = this._context.configuration.options;
        var layoutInfo = options.get(107 /* layoutInfo */);
        this.domNode.setWidth(layoutInfo.width);
        this.domNode.setHeight(layoutInfo.height);
        this.overflowGuardContainer.setWidth(layoutInfo.width);
        this.overflowGuardContainer.setHeight(layoutInfo.height);
        this.linesContent.setWidth(1000000);
        this.linesContent.setHeight(1000000);
    };
    View.prototype.getEditorClassName = function () {
        var focused = this._textAreaHandler.isFocused() ? ' focused' : '';
        return this._context.configuration.options.get(104 /* editorClassName */) + ' ' + getThemeTypeSelector(this._context.theme.type) + focused;
    };
    // --- begin event handlers
    View.prototype.onConfigurationChanged = function (e) {
        this.domNode.setClassName(this.getEditorClassName());
        this._applyLayout();
        return false;
    };
    View.prototype.onContentSizeChanged = function (e) {
        this.outgoingEvents.emitContentSizeChange(e);
        return false;
    };
    View.prototype.onFocusChanged = function (e) {
        this.domNode.setClassName(this.getEditorClassName());
        this._context.model.setHasFocus(e.isFocused);
        if (e.isFocused) {
            this.outgoingEvents.emitViewFocusGained();
        }
        else {
            this.outgoingEvents.emitViewFocusLost();
        }
        return false;
    };
    View.prototype.onScrollChanged = function (e) {
        this.outgoingEvents.emitScrollChanged(e);
        return false;
    };
    View.prototype.onThemeChanged = function (e) {
        this.domNode.setClassName(this.getEditorClassName());
        return false;
    };
    // --- end event handlers
    View.prototype.dispose = function () {
        if (this._renderAnimationFrame !== null) {
            this._renderAnimationFrame.dispose();
            this._renderAnimationFrame = null;
        }
        this.eventDispatcher.removeEventHandler(this);
        this.outgoingEvents.dispose();
        this.viewLines.dispose();
        // Destroy view parts
        for (var i = 0, len = this.viewParts.length; i < len; i++) {
            this.viewParts[i].dispose();
        }
        this.viewParts = [];
        _super.prototype.dispose.call(this);
    };
    View.prototype._renderOnce = function (callback) {
        var r = safeInvokeNoArg(callback);
        this._scheduleRender();
        return r;
    };
    View.prototype._scheduleRender = function () {
        if (this._renderAnimationFrame === null) {
            this._renderAnimationFrame = dom.runAtThisOrScheduleAtNextAnimationFrame(this._onRenderScheduled.bind(this), 100);
        }
    };
    View.prototype._onRenderScheduled = function () {
        this._renderAnimationFrame = null;
        this._flushAccumulatedAndRenderNow();
    };
    View.prototype._renderNow = function () {
        var _this = this;
        safeInvokeNoArg(function () { return _this._actualRender(); });
    };
    View.prototype._getViewPartsToRender = function () {
        var result = [], resultLen = 0;
        for (var i = 0, len = this.viewParts.length; i < len; i++) {
            var viewPart = this.viewParts[i];
            if (viewPart.shouldRender()) {
                result[resultLen++] = viewPart;
            }
        }
        return result;
    };
    View.prototype._actualRender = function () {
        if (!dom.isInDOM(this.domNode.domNode)) {
            return;
        }
        var viewPartsToRender = this._getViewPartsToRender();
        if (!this.viewLines.shouldRender() && viewPartsToRender.length === 0) {
            // Nothing to render
            return;
        }
        var partialViewportData = this._context.viewLayout.getLinesViewportData();
        this._context.model.setViewport(partialViewportData.startLineNumber, partialViewportData.endLineNumber, partialViewportData.centeredLineNumber);
        var viewportData = new ViewportData(this._cursor.getViewSelections(), partialViewportData, this._context.viewLayout.getWhitespaceViewportData(), this._context.model);
        if (this.contentWidgets.shouldRender()) {
            // Give the content widgets a chance to set their max width before a possible synchronous layout
            this.contentWidgets.onBeforeRender(viewportData);
        }
        if (this.viewLines.shouldRender()) {
            this.viewLines.renderText(viewportData);
            this.viewLines.onDidRender();
            // Rendering of viewLines might cause scroll events to occur, so collect view parts to render again
            viewPartsToRender = this._getViewPartsToRender();
        }
        var renderingContext = new RenderingContext(this._context.viewLayout, viewportData, this.viewLines);
        // Render the rest of the parts
        for (var i = 0, len = viewPartsToRender.length; i < len; i++) {
            var viewPart = viewPartsToRender[i];
            viewPart.prepareRender(renderingContext);
        }
        for (var i = 0, len = viewPartsToRender.length; i < len; i++) {
            var viewPart = viewPartsToRender[i];
            viewPart.render(renderingContext);
            viewPart.onDidRender();
        }
    };
    // --- BEGIN CodeEditor helpers
    View.prototype.delegateVerticalScrollbarMouseDown = function (browserEvent) {
        this._scrollbar.delegateVerticalScrollbarMouseDown(browserEvent);
    };
    View.prototype.restoreState = function (scrollPosition) {
        this._context.viewLayout.setScrollPositionNow({ scrollTop: scrollPosition.scrollTop });
        this._context.model.tokenizeViewport();
        this._renderNow();
        this.viewLines.updateLineWidths();
        this._context.viewLayout.setScrollPositionNow({ scrollLeft: scrollPosition.scrollLeft });
    };
    View.prototype.getOffsetForColumn = function (modelLineNumber, modelColumn) {
        var modelPosition = this._context.model.validateModelPosition({
            lineNumber: modelLineNumber,
            column: modelColumn
        });
        var viewPosition = this._context.model.coordinatesConverter.convertModelPositionToViewPosition(modelPosition);
        this._flushAccumulatedAndRenderNow();
        var visibleRange = this.viewLines.visibleRangeForPosition(new Position(viewPosition.lineNumber, viewPosition.column));
        if (!visibleRange) {
            return -1;
        }
        return visibleRange.left;
    };
    View.prototype.getTargetAtClientPoint = function (clientX, clientY) {
        var mouseTarget = this.pointerHandler.getTargetAtClientPoint(clientX, clientY);
        if (!mouseTarget) {
            return null;
        }
        return ViewOutgoingEvents.convertViewToModelMouseTarget(mouseTarget, this._context.model.coordinatesConverter);
    };
    View.prototype.createOverviewRuler = function (cssClassName) {
        return new OverviewRuler(this._context, cssClassName);
    };
    View.prototype.change = function (callback) {
        var _this = this;
        return this._renderOnce(function () {
            var zonesHaveChanged = _this.viewZones.changeViewZones(callback);
            if (zonesHaveChanged) {
                _this._context.viewLayout.onHeightMaybeChanged();
                _this._context.privateViewEventBus.emit(new viewEvents.ViewZonesChangedEvent());
            }
            return zonesHaveChanged;
        });
    };
    View.prototype.render = function (now, everything) {
        if (everything) {
            // Force everything to render...
            this.viewLines.forceShouldRender();
            for (var i = 0, len = this.viewParts.length; i < len; i++) {
                var viewPart = this.viewParts[i];
                viewPart.forceShouldRender();
            }
        }
        if (now) {
            this._flushAccumulatedAndRenderNow();
        }
        else {
            this._scheduleRender();
        }
    };
    View.prototype.focus = function () {
        this._textAreaHandler.focusTextArea();
    };
    View.prototype.isFocused = function () {
        return this._textAreaHandler.isFocused();
    };
    View.prototype.refreshFocusState = function () {
        this._textAreaHandler.refreshFocusState();
    };
    View.prototype.setAriaOptions = function (options) {
        this._textAreaHandler.setAriaOptions(options);
    };
    View.prototype.addContentWidget = function (widgetData) {
        this.contentWidgets.addWidget(widgetData.widget);
        this.layoutContentWidget(widgetData);
        this._scheduleRender();
    };
    View.prototype.layoutContentWidget = function (widgetData) {
        var newRange = widgetData.position ? widgetData.position.range || null : null;
        if (newRange === null) {
            var newPosition = widgetData.position ? widgetData.position.position : null;
            if (newPosition !== null) {
                newRange = new Range(newPosition.lineNumber, newPosition.column, newPosition.lineNumber, newPosition.column);
            }
        }
        var newPreference = widgetData.position ? widgetData.position.preference : null;
        this.contentWidgets.setWidgetPosition(widgetData.widget, newRange, newPreference);
        this._scheduleRender();
    };
    View.prototype.removeContentWidget = function (widgetData) {
        this.contentWidgets.removeWidget(widgetData.widget);
        this._scheduleRender();
    };
    View.prototype.addOverlayWidget = function (widgetData) {
        this.overlayWidgets.addWidget(widgetData.widget);
        this.layoutOverlayWidget(widgetData);
        this._scheduleRender();
    };
    View.prototype.layoutOverlayWidget = function (widgetData) {
        var newPreference = widgetData.position ? widgetData.position.preference : null;
        var shouldRender = this.overlayWidgets.setWidgetPosition(widgetData.widget, newPreference);
        if (shouldRender) {
            this._scheduleRender();
        }
    };
    View.prototype.removeOverlayWidget = function (widgetData) {
        this.overlayWidgets.removeWidget(widgetData.widget);
        this._scheduleRender();
    };
    return View;
}(ViewEventHandler));
export { View };
function safeInvokeNoArg(func) {
    try {
        return func();
    }
    catch (e) {
        onUnexpectedError(e);
    }
}
