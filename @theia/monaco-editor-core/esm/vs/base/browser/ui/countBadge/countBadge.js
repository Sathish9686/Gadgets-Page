/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './countBadge.css';
import { $, append } from '../../dom';
import { format } from '../../../common/strings';
import { Color } from '../../../common/color';
import { mixin } from '../../../common/objects';
var defaultOpts = {
    badgeBackground: Color.fromHex('#4D4D4D'),
    badgeForeground: Color.fromHex('#FFFFFF')
};
var CountBadge = /** @class */ (function () {
    function CountBadge(container, options) {
        this.count = 0;
        this.options = options || Object.create(null);
        mixin(this.options, defaultOpts, false);
        this.badgeBackground = this.options.badgeBackground;
        this.badgeForeground = this.options.badgeForeground;
        this.badgeBorder = this.options.badgeBorder;
        this.element = append(container, $('.monaco-count-badge'));
        this.countFormat = this.options.countFormat || '{0}';
        this.titleFormat = this.options.titleFormat || '';
        this.setCount(this.options.count || 0);
    }
    CountBadge.prototype.setCount = function (count) {
        this.count = count;
        this.render();
    };
    CountBadge.prototype.setCountFormat = function (countFormat) {
        this.countFormat = countFormat;
        this.render();
    };
    CountBadge.prototype.setTitleFormat = function (titleFormat) {
        this.titleFormat = titleFormat;
        this.render();
    };
    CountBadge.prototype.render = function () {
        this.element.textContent = format(this.countFormat, this.count);
        this.element.title = format(this.titleFormat, this.count);
        this.applyStyles();
    };
    CountBadge.prototype.style = function (styles) {
        this.badgeBackground = styles.badgeBackground;
        this.badgeForeground = styles.badgeForeground;
        this.badgeBorder = styles.badgeBorder;
        this.applyStyles();
    };
    CountBadge.prototype.applyStyles = function () {
        if (this.element) {
            var background = this.badgeBackground ? this.badgeBackground.toString() : '';
            var foreground = this.badgeForeground ? this.badgeForeground.toString() : '';
            var border = this.badgeBorder ? this.badgeBorder.toString() : '';
            this.element.style.backgroundColor = background;
            this.element.style.color = foreground;
            this.element.style.borderWidth = border ? '1px' : '';
            this.element.style.borderStyle = border ? 'solid' : '';
            this.element.style.borderColor = border;
        }
    };
    return CountBadge;
}());
export { CountBadge };
