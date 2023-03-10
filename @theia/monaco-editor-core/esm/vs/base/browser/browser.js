/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Emitter } from '../common/event';
var WindowManager = /** @class */ (function () {
    function WindowManager() {
        // --- Zoom Level
        this._zoomLevel = 0;
        this._lastZoomLevelChangeTime = 0;
        this._onDidChangeZoomLevel = new Emitter();
        this.onDidChangeZoomLevel = this._onDidChangeZoomLevel.event;
        // --- Zoom Factor
        this._zoomFactor = 1;
        // --- Fullscreen
        this._fullscreen = false;
        this._onDidChangeFullscreen = new Emitter();
        this.onDidChangeFullscreen = this._onDidChangeFullscreen.event;
    }
    WindowManager.prototype.getZoomLevel = function () {
        return this._zoomLevel;
    };
    WindowManager.prototype.getTimeSinceLastZoomLevelChanged = function () {
        return Date.now() - this._lastZoomLevelChangeTime;
    };
    WindowManager.prototype.setZoomLevel = function (zoomLevel, isTrusted) {
        if (this._zoomLevel === zoomLevel) {
            return;
        }
        this._zoomLevel = zoomLevel;
        // See https://github.com/Microsoft/vscode/issues/26151
        this._lastZoomLevelChangeTime = isTrusted ? 0 : Date.now();
        this._onDidChangeZoomLevel.fire(this._zoomLevel);
    };
    WindowManager.prototype.getZoomFactor = function () {
        return this._zoomFactor;
    };
    WindowManager.prototype.setZoomFactor = function (zoomFactor) {
        this._zoomFactor = zoomFactor;
    };
    // --- Pixel Ratio
    WindowManager.prototype.getPixelRatio = function () {
        var ctx = document.createElement('canvas').getContext('2d');
        var dpr = window.devicePixelRatio || 1;
        var bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
        return dpr / bsr;
    };
    WindowManager.prototype.setFullscreen = function (fullscreen) {
        if (this._fullscreen === fullscreen) {
            return;
        }
        this._fullscreen = fullscreen;
        this._onDidChangeFullscreen.fire();
    };
    WindowManager.prototype.isFullscreen = function () {
        return this._fullscreen;
    };
    WindowManager.INSTANCE = new WindowManager();
    return WindowManager;
}());
/** A zoom index, e.g. 1, 2, 3 */
export function setZoomLevel(zoomLevel, isTrusted) {
    WindowManager.INSTANCE.setZoomLevel(zoomLevel, isTrusted);
}
export function getZoomLevel() {
    return WindowManager.INSTANCE.getZoomLevel();
}
/** Returns the time (in ms) since the zoom level was changed */
export function getTimeSinceLastZoomLevelChanged() {
    return WindowManager.INSTANCE.getTimeSinceLastZoomLevelChanged();
}
export function onDidChangeZoomLevel(callback) {
    return WindowManager.INSTANCE.onDidChangeZoomLevel(callback);
}
/** The zoom scale for an index, e.g. 1, 1.2, 1.4 */
export function getZoomFactor() {
    return WindowManager.INSTANCE.getZoomFactor();
}
export function setZoomFactor(zoomFactor) {
    WindowManager.INSTANCE.setZoomFactor(zoomFactor);
}
export function getPixelRatio() {
    return WindowManager.INSTANCE.getPixelRatio();
}
export function setFullscreen(fullscreen) {
    WindowManager.INSTANCE.setFullscreen(fullscreen);
}
export function isFullscreen() {
    return WindowManager.INSTANCE.isFullscreen();
}
export var onDidChangeFullscreen = WindowManager.INSTANCE.onDidChangeFullscreen;
var userAgent = navigator.userAgent;
export var isIE = (userAgent.indexOf('Trident') >= 0);
export var isEdge = (userAgent.indexOf('Edge/') >= 0);
export var isEdgeOrIE = isIE || isEdge;
export var isOpera = (userAgent.indexOf('Opera') >= 0);
export var isFirefox = (userAgent.indexOf('Firefox') >= 0);
export var isWebKit = (userAgent.indexOf('AppleWebKit') >= 0);
export var isChrome = (userAgent.indexOf('Chrome') >= 0);
export var isSafari = (!isChrome && (userAgent.indexOf('Safari') >= 0));
export var isWebkitWebView = (!isChrome && !isSafari && isWebKit);
export var isIPad = (userAgent.indexOf('iPad') >= 0 || (isSafari && navigator.maxTouchPoints > 0));
export var isEdgeWebView = isEdge && (userAgent.indexOf('WebView/') >= 0);
export var isStandalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
