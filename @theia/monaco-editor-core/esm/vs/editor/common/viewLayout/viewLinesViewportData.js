/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Range } from '../core/range';
/**
 * Contains all data needed to render at a specific viewport.
 */
var ViewportData = /** @class */ (function () {
    function ViewportData(selections, partialData, whitespaceViewportData, model) {
        this.selections = selections;
        this.startLineNumber = partialData.startLineNumber | 0;
        this.endLineNumber = partialData.endLineNumber | 0;
        this.relativeVerticalOffset = partialData.relativeVerticalOffset;
        this.bigNumbersDelta = partialData.bigNumbersDelta | 0;
        this.whitespaceViewportData = whitespaceViewportData;
        this._model = model;
        this.visibleRange = new Range(partialData.startLineNumber, this._model.getLineMinColumn(partialData.startLineNumber), partialData.endLineNumber, this._model.getLineMaxColumn(partialData.endLineNumber));
    }
    ViewportData.prototype.getViewLineRenderingData = function (lineNumber) {
        return this._model.getViewLineRenderingData(this.visibleRange, lineNumber);
    };
    ViewportData.prototype.getDecorationsInViewport = function () {
        return this._model.getDecorationsInViewport(this.visibleRange);
    };
    return ViewportData;
}());
export { ViewportData };
