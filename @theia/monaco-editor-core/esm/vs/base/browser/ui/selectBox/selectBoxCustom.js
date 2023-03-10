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
import './selectBoxCustom.css';
import { dispose, Disposable } from '../../../common/lifecycle';
import { Event, Emitter } from '../../../common/event';
import { KeyCodeUtils } from '../../../common/keyCodes';
import { StandardKeyboardEvent } from '../../keyboardEvent';
import * as dom from '../../dom';
import * as arrays from '../../../common/arrays';
import { List } from '../list/listWidget';
import { domEvent } from '../../event';
import { isMacintosh } from '../../../common/platform';
import { renderMarkdown } from '../../markdownRenderer';
var $ = dom.$;
var SELECT_OPTION_ENTRY_TEMPLATE_ID = 'selectOption.entry.template';
var SelectListRenderer = /** @class */ (function () {
    function SelectListRenderer() {
    }
    Object.defineProperty(SelectListRenderer.prototype, "templateId", {
        get: function () { return SELECT_OPTION_ENTRY_TEMPLATE_ID; },
        enumerable: true,
        configurable: true
    });
    SelectListRenderer.prototype.renderTemplate = function (container) {
        var data = Object.create(null);
        data.disposables = [];
        data.root = container;
        data.text = dom.append(container, $('.option-text'));
        data.decoratorRight = dom.append(container, $('.option-decorator-right'));
        data.itemDescription = dom.append(container, $('.option-text-description'));
        dom.addClass(data.itemDescription, 'visually-hidden');
        return data;
    };
    SelectListRenderer.prototype.renderElement = function (element, index, templateData) {
        var data = templateData;
        var text = element.text;
        var decoratorRight = element.decoratorRight;
        var isDisabled = element.isDisabled;
        data.text.textContent = text;
        data.decoratorRight.innerText = (!!decoratorRight ? decoratorRight : '');
        if (typeof element.description === 'string') {
            var itemDescriptionId = (text.replace(/ /g, '_').toLowerCase() + '_description_' + data.root.id);
            data.text.setAttribute('aria-describedby', itemDescriptionId);
            data.itemDescription.id = itemDescriptionId;
            data.itemDescription.innerText = element.description;
        }
        // pseudo-select disabled option
        if (isDisabled) {
            dom.addClass(data.root, 'option-disabled');
        }
        else {
            // Make sure we do class removal from prior template rendering
            dom.removeClass(data.root, 'option-disabled');
        }
    };
    SelectListRenderer.prototype.disposeTemplate = function (templateData) {
        templateData.disposables = dispose(templateData.disposables);
    };
    return SelectListRenderer;
}());
var SelectBoxList = /** @class */ (function (_super) {
    __extends(SelectBoxList, _super);
    function SelectBoxList(options, selected, contextViewProvider, styles, selectBoxOptions) {
        var _this = _super.call(this) || this;
        _this.options = [];
        _this._currentSelection = 0;
        _this._hasDetails = false;
        _this._skipLayout = false;
        _this._sticky = false; // for dev purposes only
        _this._isVisible = false;
        _this.selectBoxOptions = selectBoxOptions || Object.create(null);
        if (typeof _this.selectBoxOptions.minBottomMargin !== 'number') {
            _this.selectBoxOptions.minBottomMargin = SelectBoxList.DEFAULT_DROPDOWN_MINIMUM_BOTTOM_MARGIN;
        }
        else if (_this.selectBoxOptions.minBottomMargin < 0) {
            _this.selectBoxOptions.minBottomMargin = 0;
        }
        _this.selectElement = document.createElement('select');
        // Use custom CSS vars for padding calculation
        _this.selectElement.className = 'monaco-select-box monaco-select-box-dropdown-padding';
        if (typeof _this.selectBoxOptions.ariaLabel === 'string') {
            _this.selectElement.setAttribute('aria-label', _this.selectBoxOptions.ariaLabel);
        }
        _this._onDidSelect = new Emitter();
        _this._register(_this._onDidSelect);
        _this.styles = styles;
        _this.registerListeners();
        _this.constructSelectDropDown(contextViewProvider);
        _this.selected = selected || 0;
        if (options) {
            _this.setOptions(options, selected);
        }
        return _this;
    }
    // IDelegate - List renderer
    SelectBoxList.prototype.getHeight = function () {
        return 18;
    };
    SelectBoxList.prototype.getTemplateId = function () {
        return SELECT_OPTION_ENTRY_TEMPLATE_ID;
    };
    SelectBoxList.prototype.constructSelectDropDown = function (contextViewProvider) {
        // SetUp ContextView container to hold select Dropdown
        this.contextViewProvider = contextViewProvider;
        this.selectDropDownContainer = dom.$('.monaco-select-box-dropdown-container');
        // Use custom CSS vars for padding calculation (shared with parent select)
        dom.addClass(this.selectDropDownContainer, 'monaco-select-box-dropdown-padding');
        // Setup container for select option details
        this.selectionDetailsPane = dom.append(this.selectDropDownContainer, $('.select-box-details-pane'));
        // Create span flex box item/div we can measure and control
        var widthControlOuterDiv = dom.append(this.selectDropDownContainer, $('.select-box-dropdown-container-width-control'));
        var widthControlInnerDiv = dom.append(widthControlOuterDiv, $('.width-control-div'));
        this.widthControlElement = document.createElement('span');
        this.widthControlElement.className = 'option-text-width-control';
        dom.append(widthControlInnerDiv, this.widthControlElement);
        // Always default to below position
        this._dropDownPosition = 0 /* BELOW */;
        // Inline stylesheet for themes
        this.styleElement = dom.createStyleSheet(this.selectDropDownContainer);
    };
    SelectBoxList.prototype.registerListeners = function () {
        // Parent native select keyboard listeners
        var _this = this;
        this._register(dom.addStandardDisposableListener(this.selectElement, 'change', function (e) {
            _this.selected = e.target.selectedIndex;
            _this._onDidSelect.fire({
                index: e.target.selectedIndex,
                selected: e.target.value
            });
            if (!!_this.options[_this.selected] && !!_this.options[_this.selected].text) {
                _this.selectElement.title = _this.options[_this.selected].text;
            }
        }));
        // Have to implement both keyboard and mouse controllers to handle disabled options
        // Intercept mouse events to override normal select actions on parents
        this._register(dom.addDisposableListener(this.selectElement, dom.EventType.CLICK, function (e) {
            dom.EventHelper.stop(e);
            if (_this._isVisible) {
                _this.hideSelectDropDown(true);
            }
            else {
                _this.showSelectDropDown();
            }
        }));
        this._register(dom.addDisposableListener(this.selectElement, dom.EventType.MOUSE_DOWN, function (e) {
            dom.EventHelper.stop(e);
        }));
        // Intercept keyboard handling
        this._register(dom.addDisposableListener(this.selectElement, dom.EventType.KEY_DOWN, function (e) {
            var event = new StandardKeyboardEvent(e);
            var showDropDown = false;
            // Create and drop down select list on keyboard select
            if (isMacintosh) {
                if (event.keyCode === 18 /* DownArrow */ || event.keyCode === 16 /* UpArrow */ || event.keyCode === 10 /* Space */ || event.keyCode === 3 /* Enter */) {
                    showDropDown = true;
                }
            }
            else {
                if (event.keyCode === 18 /* DownArrow */ && event.altKey || event.keyCode === 16 /* UpArrow */ && event.altKey || event.keyCode === 10 /* Space */ || event.keyCode === 3 /* Enter */) {
                    showDropDown = true;
                }
            }
            if (showDropDown) {
                _this.showSelectDropDown();
                dom.EventHelper.stop(e);
            }
        }));
    };
    Object.defineProperty(SelectBoxList.prototype, "onDidSelect", {
        get: function () {
            return this._onDidSelect.event;
        },
        enumerable: true,
        configurable: true
    });
    SelectBoxList.prototype.setOptions = function (options, selected) {
        var _this = this;
        if (!arrays.equals(this.options, options)) {
            this.options = options;
            this.selectElement.options.length = 0;
            this._hasDetails = false;
            this.options.forEach(function (option, index) {
                _this.selectElement.add(_this.createOption(option.text, index, option.isDisabled));
                if (typeof option.description === 'string') {
                    _this._hasDetails = true;
                }
            });
        }
        if (selected !== undefined) {
            this.select(selected);
            // Set current = selected since this is not necessarily a user exit
            this._currentSelection = this.selected;
        }
    };
    SelectBoxList.prototype.setOptionsList = function () {
        // Mirror options in drop-down
        // Populate select list for non-native select mode
        if (this.selectList) {
            this.selectList.splice(0, this.selectList.length, this.options);
        }
    };
    SelectBoxList.prototype.select = function (index) {
        if (index >= 0 && index < this.options.length) {
            this.selected = index;
        }
        else if (index > this.options.length - 1) {
            // Adjust index to end of list
            // This could make client out of sync with the select
            this.select(this.options.length - 1);
        }
        else if (this.selected < 0) {
            this.selected = 0;
        }
        this.selectElement.selectedIndex = this.selected;
        if (!!this.options[this.selected] && !!this.options[this.selected].text) {
            this.selectElement.title = this.options[this.selected].text;
        }
    };
    SelectBoxList.prototype.setAriaLabel = function (label) {
        this.selectBoxOptions.ariaLabel = label;
        this.selectElement.setAttribute('aria-label', this.selectBoxOptions.ariaLabel);
    };
    SelectBoxList.prototype.focus = function () {
        if (this.selectElement) {
            this.selectElement.focus();
        }
    };
    SelectBoxList.prototype.blur = function () {
        if (this.selectElement) {
            this.selectElement.blur();
        }
    };
    SelectBoxList.prototype.render = function (container) {
        dom.addClass(container, 'select-container');
        container.appendChild(this.selectElement);
        this.applyStyles();
    };
    SelectBoxList.prototype.style = function (styles) {
        var content = [];
        this.styles = styles;
        // Style non-native select mode
        if (this.styles.listFocusBackground) {
            content.push(".monaco-select-box-dropdown-container > .select-box-dropdown-list-container .monaco-list .monaco-list-row.focused { background-color: " + this.styles.listFocusBackground + " !important; }");
        }
        if (this.styles.listFocusForeground) {
            content.push(".monaco-select-box-dropdown-container > .select-box-dropdown-list-container .monaco-list .monaco-list-row.focused:not(:hover) { color: " + this.styles.listFocusForeground + " !important; }");
        }
        if (this.styles.decoratorRightForeground) {
            content.push(".monaco-select-box-dropdown-container > .select-box-dropdown-list-container .monaco-list .monaco-list-row .option-decorator-right { color: " + this.styles.decoratorRightForeground + " !important; }");
        }
        if (this.styles.selectBackground && this.styles.selectBorder && !this.styles.selectBorder.equals(this.styles.selectBackground)) {
            content.push(".monaco-select-box-dropdown-container { border: 1px solid " + this.styles.selectBorder + " } ");
            content.push(".monaco-select-box-dropdown-container > .select-box-details-pane.border-top { border-top: 1px solid " + this.styles.selectBorder + " } ");
            content.push(".monaco-select-box-dropdown-container > .select-box-details-pane.border-bottom { border-bottom: 1px solid " + this.styles.selectBorder + " } ");
        }
        else if (this.styles.selectListBorder) {
            content.push(".monaco-select-box-dropdown-container > .select-box-details-pane.border-top { border-top: 1px solid " + this.styles.selectListBorder + " } ");
            content.push(".monaco-select-box-dropdown-container > .select-box-details-pane.border-bottom { border-bottom: 1px solid " + this.styles.selectListBorder + " } ");
        }
        // Hover foreground - ignore for disabled options
        if (this.styles.listHoverForeground) {
            content.push(".monaco-select-box-dropdown-container > .select-box-dropdown-list-container .monaco-list .monaco-list-row:hover { color: " + this.styles.listHoverForeground + " !important; }");
            content.push(".monaco-select-box-dropdown-container > .select-box-dropdown-list-container .monaco-list .monaco-list-row.option-disabled:hover { background-color: " + this.styles.listActiveSelectionForeground + " !important; }");
        }
        // Hover background - ignore for disabled options
        if (this.styles.listHoverBackground) {
            content.push(".monaco-select-box-dropdown-container > .select-box-dropdown-list-container .monaco-list .monaco-list-row:not(.option-disabled):not(.focused):hover { background-color: " + this.styles.listHoverBackground + " !important; }");
            content.push(".monaco-select-box-dropdown-container > .select-box-dropdown-list-container .monaco-list .monaco-list-row.option-disabled:hover { background-color: " + this.styles.selectBackground + " !important; }");
        }
        // Match quickOpen outline styles - ignore for disabled options
        if (this.styles.listFocusOutline) {
            content.push(".monaco-select-box-dropdown-container > .select-box-dropdown-list-container .monaco-list .monaco-list-row.focused { outline: 1.6px dotted " + this.styles.listFocusOutline + " !important; outline-offset: -1.6px !important; }");
        }
        if (this.styles.listHoverOutline) {
            content.push(".monaco-select-box-dropdown-container > .select-box-dropdown-list-container .monaco-list .monaco-list-row:hover:not(.focused) { outline: 1.6px dashed " + this.styles.listHoverOutline + " !important; outline-offset: -1.6px !important; }");
            content.push(".monaco-select-box-dropdown-container > .select-box-dropdown-list-container .monaco-list .monaco-list-row.option-disabled:hover { outline: none !important; }");
        }
        this.styleElement.innerHTML = content.join('\n');
        this.applyStyles();
    };
    SelectBoxList.prototype.applyStyles = function () {
        // Style parent select
        if (this.selectElement) {
            var background = this.styles.selectBackground ? this.styles.selectBackground.toString() : '';
            var foreground = this.styles.selectForeground ? this.styles.selectForeground.toString() : '';
            var border = this.styles.selectBorder ? this.styles.selectBorder.toString() : '';
            this.selectElement.style.backgroundColor = background;
            this.selectElement.style.color = foreground;
            this.selectElement.style.borderColor = border;
        }
        // Style drop down select list (non-native mode only)
        if (this.selectList) {
            this.styleList();
        }
    };
    SelectBoxList.prototype.styleList = function () {
        if (this.selectList) {
            var background = this.styles.selectBackground ? this.styles.selectBackground.toString() : '';
            this.selectList.style({});
            var listBackground = this.styles.selectListBackground ? this.styles.selectListBackground.toString() : background;
            this.selectDropDownListContainer.style.backgroundColor = listBackground;
            this.selectionDetailsPane.style.backgroundColor = listBackground;
            var optionsBorder = this.styles.focusBorder ? this.styles.focusBorder.toString() : '';
            this.selectDropDownContainer.style.outlineColor = optionsBorder;
            this.selectDropDownContainer.style.outlineOffset = '-1px';
        }
    };
    SelectBoxList.prototype.createOption = function (value, index, disabled) {
        var option = document.createElement('option');
        option.value = value;
        option.text = value;
        option.disabled = !!disabled;
        return option;
    };
    // ContextView dropdown methods
    SelectBoxList.prototype.showSelectDropDown = function () {
        var _this = this;
        this.selectionDetailsPane.innerText = '';
        if (!this.contextViewProvider || this._isVisible) {
            return;
        }
        // Lazily create and populate list only at open, moved from constructor
        this.createSelectList(this.selectDropDownContainer);
        this.setOptionsList();
        // This allows us to flip the position based on measurement
        // Set drop-down position above/below from required height and margins
        // If pre-layout cannot fit at least one option do not show drop-down
        this.contextViewProvider.showContextView({
            getAnchor: function () { return _this.selectElement; },
            render: function (container) { return _this.renderSelectDropDown(container, true); },
            layout: function () {
                _this.layoutSelectDropDown();
            },
            onHide: function () {
                dom.toggleClass(_this.selectDropDownContainer, 'visible', false);
                dom.toggleClass(_this.selectElement, 'synthetic-focus', false);
            },
            anchorPosition: this._dropDownPosition
        });
        // Hide so we can relay out
        this._isVisible = true;
        this.hideSelectDropDown(false);
        this.contextViewProvider.showContextView({
            getAnchor: function () { return _this.selectElement; },
            render: function (container) { return _this.renderSelectDropDown(container); },
            layout: function () { return _this.layoutSelectDropDown(); },
            onHide: function () {
                dom.toggleClass(_this.selectDropDownContainer, 'visible', false);
                dom.toggleClass(_this.selectElement, 'synthetic-focus', false);
            },
            anchorPosition: this._dropDownPosition
        });
        // Track initial selection the case user escape, blur
        this._currentSelection = this.selected;
        this._isVisible = true;
    };
    SelectBoxList.prototype.hideSelectDropDown = function (focusSelect) {
        if (!this.contextViewProvider || !this._isVisible) {
            return;
        }
        this._isVisible = false;
        if (focusSelect) {
            this.selectElement.focus();
        }
        this.contextViewProvider.hideContextView();
    };
    SelectBoxList.prototype.renderSelectDropDown = function (container, preLayoutPosition) {
        var _this = this;
        container.appendChild(this.selectDropDownContainer);
        // Pre-Layout allows us to change position
        this.layoutSelectDropDown(preLayoutPosition);
        return {
            dispose: function () {
                // contextView will dispose itself if moving from one View to another
                try {
                    container.removeChild(_this.selectDropDownContainer); // remove to take out the CSS rules we add
                }
                catch (error) {
                    // Ignore, removed already by change of focus
                }
            }
        };
    };
    // Iterate over detailed descriptions, find max height
    SelectBoxList.prototype.measureMaxDetailsHeight = function () {
        var _this = this;
        var maxDetailsPaneHeight = 0;
        this.options.forEach(function (option, index) {
            _this.selectionDetailsPane.innerText = '';
            if (option.description) {
                if (option.descriptionIsMarkdown) {
                    _this.selectionDetailsPane.appendChild(_this.renderDescriptionMarkdown(option.description));
                }
                else {
                    _this.selectionDetailsPane.innerText = option.description;
                }
                _this.selectionDetailsPane.style.display = 'block';
            }
            else {
                _this.selectionDetailsPane.style.display = 'none';
            }
            if (_this.selectionDetailsPane.offsetHeight > maxDetailsPaneHeight) {
                maxDetailsPaneHeight = _this.selectionDetailsPane.offsetHeight;
            }
        });
        // Reset description to selected
        this.selectionDetailsPane.innerText = '';
        var description = this.options[this.selected].description || null;
        var descriptionIsMarkdown = this.options[this.selected].descriptionIsMarkdown || null;
        if (description) {
            if (descriptionIsMarkdown) {
                this.selectionDetailsPane.appendChild(this.renderDescriptionMarkdown(description));
            }
            else {
                this.selectionDetailsPane.innerText = description;
            }
            this.selectionDetailsPane.style.display = 'block';
        }
        return maxDetailsPaneHeight;
    };
    SelectBoxList.prototype.layoutSelectDropDown = function (preLayoutPosition) {
        // Avoid recursion from layout called in onListFocus
        if (this._skipLayout) {
            return false;
        }
        // Layout ContextView drop down select list and container
        // Have to manage our vertical overflow, sizing, position below or above
        // Position has to be determined and set prior to contextView instantiation
        if (this.selectList) {
            // Make visible to enable measurements
            dom.toggleClass(this.selectDropDownContainer, 'visible', true);
            var selectPosition = dom.getDomNodePagePosition(this.selectElement);
            var styles = getComputedStyle(this.selectElement);
            var verticalPadding = parseFloat(styles.getPropertyValue('--dropdown-padding-top')) + parseFloat(styles.getPropertyValue('--dropdown-padding-bottom'));
            var maxSelectDropDownHeightBelow = (window.innerHeight - selectPosition.top - selectPosition.height - (this.selectBoxOptions.minBottomMargin || 0));
            var maxSelectDropDownHeightAbove = (selectPosition.top - SelectBoxList.DEFAULT_DROPDOWN_MINIMUM_TOP_MARGIN);
            // Determine optimal width - min(longest option), opt(parent select, excluding margins), max(ContextView controlled)
            var selectWidth = this.selectElement.offsetWidth;
            var selectMinWidth = this.setWidthControlElement(this.widthControlElement);
            var selectOptimalWidth = Math.max(selectMinWidth, Math.round(selectWidth)).toString() + 'px';
            this.selectDropDownContainer.style.width = selectOptimalWidth;
            // Get initial list height and determine space above and below
            this.selectList.getHTMLElement().style.height = '';
            this.selectList.layout();
            var listHeight = this.selectList.contentHeight;
            var maxDetailsPaneHeight = this._hasDetails ? this.measureMaxDetailsHeight() : 0;
            var minRequiredDropDownHeight = listHeight + verticalPadding + maxDetailsPaneHeight;
            var maxVisibleOptionsBelow = ((Math.floor((maxSelectDropDownHeightBelow - verticalPadding - maxDetailsPaneHeight) / this.getHeight())));
            var maxVisibleOptionsAbove = ((Math.floor((maxSelectDropDownHeightAbove - verticalPadding - maxDetailsPaneHeight) / this.getHeight())));
            // If we are only doing pre-layout check/adjust position only
            // Calculate vertical space available, flip up if insufficient
            // Use reflected padding on parent select, ContextView style
            // properties not available before DOM attachment
            if (preLayoutPosition) {
                // Check if select moved out of viewport , do not open
                // If at least one option cannot be shown, don't open the drop-down or hide/remove if open
                if ((selectPosition.top + selectPosition.height) > (window.innerHeight - 22)
                    || selectPosition.top < SelectBoxList.DEFAULT_DROPDOWN_MINIMUM_TOP_MARGIN
                    || ((maxVisibleOptionsBelow < 1) && (maxVisibleOptionsAbove < 1))) {
                    // Indicate we cannot open
                    return false;
                }
                // Determine if we have to flip up
                // Always show complete list items - never more than Max available vertical height
                if (maxVisibleOptionsBelow < SelectBoxList.DEFAULT_MINIMUM_VISIBLE_OPTIONS
                    && maxVisibleOptionsAbove > maxVisibleOptionsBelow
                    && this.options.length > maxVisibleOptionsBelow) {
                    this._dropDownPosition = 1 /* ABOVE */;
                    this.selectDropDownContainer.removeChild(this.selectDropDownListContainer);
                    this.selectDropDownContainer.removeChild(this.selectionDetailsPane);
                    this.selectDropDownContainer.appendChild(this.selectionDetailsPane);
                    this.selectDropDownContainer.appendChild(this.selectDropDownListContainer);
                    dom.removeClass(this.selectionDetailsPane, 'border-top');
                    dom.addClass(this.selectionDetailsPane, 'border-bottom');
                }
                else {
                    this._dropDownPosition = 0 /* BELOW */;
                    this.selectDropDownContainer.removeChild(this.selectDropDownListContainer);
                    this.selectDropDownContainer.removeChild(this.selectionDetailsPane);
                    this.selectDropDownContainer.appendChild(this.selectDropDownListContainer);
                    this.selectDropDownContainer.appendChild(this.selectionDetailsPane);
                    dom.removeClass(this.selectionDetailsPane, 'border-bottom');
                    dom.addClass(this.selectionDetailsPane, 'border-top');
                }
                // Do full layout on showSelectDropDown only
                return true;
            }
            // Check if select out of viewport or cutting into status bar
            if ((selectPosition.top + selectPosition.height) > (window.innerHeight - 22)
                || selectPosition.top < SelectBoxList.DEFAULT_DROPDOWN_MINIMUM_TOP_MARGIN
                || (this._dropDownPosition === 0 /* BELOW */ && maxVisibleOptionsBelow < 1)
                || (this._dropDownPosition === 1 /* ABOVE */ && maxVisibleOptionsAbove < 1)) {
                // Cannot properly layout, close and hide
                this.hideSelectDropDown(true);
                return false;
            }
            // SetUp list dimensions and layout - account for container padding
            // Use position to check above or below available space
            if (this._dropDownPosition === 0 /* BELOW */) {
                if (this._isVisible && maxVisibleOptionsBelow + maxVisibleOptionsAbove < 1) {
                    // If drop-down is visible, must be doing a DOM re-layout, hide since we don't fit
                    // Hide drop-down, hide contextview, focus on parent select
                    this.hideSelectDropDown(true);
                    return false;
                }
                // Adjust list height to max from select bottom to margin (default/minBottomMargin)
                if (minRequiredDropDownHeight > maxSelectDropDownHeightBelow) {
                    listHeight = (maxVisibleOptionsBelow * this.getHeight());
                }
            }
            else {
                if (minRequiredDropDownHeight > maxSelectDropDownHeightAbove) {
                    listHeight = (maxVisibleOptionsAbove * this.getHeight());
                }
            }
            // Set adjusted list height and relayout
            this.selectList.layout(listHeight);
            this.selectList.domFocus();
            // Finally set focus on selected item
            if (this.selectList.length > 0) {
                this.selectList.setFocus([this.selected || 0]);
                this.selectList.reveal(this.selectList.getFocus()[0] || 0);
            }
            if (this._hasDetails) {
                // Leave the selectDropDownContainer to size itself according to children (list + details) - #57447
                this.selectList.getHTMLElement().style.height = (listHeight + verticalPadding) + 'px';
                this.selectDropDownContainer.style.height = '';
            }
            else {
                this.selectDropDownContainer.style.height = (listHeight + verticalPadding) + 'px';
            }
            this.selectDropDownContainer.style.width = selectOptimalWidth;
            // Maintain focus outline on parent select as well as list container - tabindex for focus
            this.selectDropDownListContainer.setAttribute('tabindex', '0');
            dom.toggleClass(this.selectElement, 'synthetic-focus', true);
            dom.toggleClass(this.selectDropDownContainer, 'synthetic-focus', true);
            return true;
        }
        else {
            return false;
        }
    };
    SelectBoxList.prototype.setWidthControlElement = function (container) {
        var elementWidth = 0;
        if (container) {
            var longest_1 = 0;
            var longestLength_1 = 0;
            this.options.forEach(function (option, index) {
                var len = option.text.length + (!!option.decoratorRight ? option.decoratorRight.length : 0);
                if (len > longestLength_1) {
                    longest_1 = index;
                    longestLength_1 = len;
                }
            });
            container.innerHTML = this.options[longest_1].text + (!!this.options[longest_1].decoratorRight ? (this.options[longest_1].decoratorRight + ' ') : '');
            elementWidth = dom.getTotalWidth(container);
        }
        return elementWidth;
    };
    SelectBoxList.prototype.createSelectList = function (parent) {
        var _this = this;
        // If we have already constructive list on open, skip
        if (this.selectList) {
            return;
        }
        // SetUp container for list
        this.selectDropDownListContainer = dom.append(parent, $('.select-box-dropdown-list-container'));
        this.listRenderer = new SelectListRenderer();
        this.selectList = new List('SelectBoxCustom', this.selectDropDownListContainer, this, [this.listRenderer], {
            ariaLabel: this.selectBoxOptions.ariaLabel,
            useShadows: false,
            verticalScrollMode: 3 /* Visible */,
            keyboardSupport: false,
            mouseSupport: false
        });
        // SetUp list keyboard controller - control navigation, disabled items, focus
        var onSelectDropDownKeyDown = Event.chain(domEvent(this.selectDropDownListContainer, 'keydown'))
            .filter(function () { return _this.selectList.length > 0; })
            .map(function (e) { return new StandardKeyboardEvent(e); });
        this._register(onSelectDropDownKeyDown.filter(function (e) { return e.keyCode === 3 /* Enter */; }).on(function (e) { return _this.onEnter(e); }, this));
        this._register(onSelectDropDownKeyDown.filter(function (e) { return e.keyCode === 9 /* Escape */; }).on(function (e) { return _this.onEscape(e); }, this));
        this._register(onSelectDropDownKeyDown.filter(function (e) { return e.keyCode === 16 /* UpArrow */; }).on(this.onUpArrow, this));
        this._register(onSelectDropDownKeyDown.filter(function (e) { return e.keyCode === 18 /* DownArrow */; }).on(this.onDownArrow, this));
        this._register(onSelectDropDownKeyDown.filter(function (e) { return e.keyCode === 12 /* PageDown */; }).on(this.onPageDown, this));
        this._register(onSelectDropDownKeyDown.filter(function (e) { return e.keyCode === 11 /* PageUp */; }).on(this.onPageUp, this));
        this._register(onSelectDropDownKeyDown.filter(function (e) { return e.keyCode === 14 /* Home */; }).on(this.onHome, this));
        this._register(onSelectDropDownKeyDown.filter(function (e) { return e.keyCode === 13 /* End */; }).on(this.onEnd, this));
        this._register(onSelectDropDownKeyDown.filter(function (e) { return (e.keyCode >= 21 /* KEY_0 */ && e.keyCode <= 56 /* KEY_Z */) || (e.keyCode >= 80 /* US_SEMICOLON */ && e.keyCode <= 108 /* NUMPAD_DIVIDE */); }).on(this.onCharacter, this));
        // SetUp list mouse controller - control navigation, disabled items, focus
        this._register(Event.chain(domEvent(this.selectList.getHTMLElement(), 'mouseup'))
            .filter(function () { return _this.selectList.length > 0; })
            .on(function (e) { return _this.onMouseUp(e); }, this));
        this._register(this.selectList.onMouseOver(function (e) { return typeof e.index !== 'undefined' && _this.selectList.setFocus([e.index]); }));
        this._register(this.selectList.onFocusChange(function (e) { return _this.onListFocus(e); }));
        this._register(dom.addDisposableListener(this.selectDropDownContainer, dom.EventType.FOCUS_OUT, function (e) {
            if (!_this._isVisible || dom.isAncestor(e.relatedTarget, _this.selectDropDownContainer)) {
                return;
            }
            _this.onListBlur();
        }));
        this.selectList.getHTMLElement().setAttribute('aria-label', this.selectBoxOptions.ariaLabel || '');
        this.selectList.getHTMLElement().setAttribute('aria-expanded', 'true');
        this.styleList();
    };
    // List methods
    // List mouse controller - active exit, select option, fire onDidSelect if change, return focus to parent select
    SelectBoxList.prototype.onMouseUp = function (e) {
        dom.EventHelper.stop(e);
        var target = e.target;
        if (!target) {
            return;
        }
        // Check our mouse event is on an option (not scrollbar)
        if (!!target.classList.contains('slider')) {
            return;
        }
        var listRowElement = target.closest('.monaco-list-row');
        if (!listRowElement) {
            return;
        }
        var index = Number(listRowElement.getAttribute('data-index'));
        var disabled = listRowElement.classList.contains('option-disabled');
        // Ignore mouse selection of disabled options
        if (index >= 0 && index < this.options.length && !disabled) {
            this.selected = index;
            this.select(this.selected);
            this.selectList.setFocus([this.selected]);
            this.selectList.reveal(this.selectList.getFocus()[0]);
            // Only fire if selection change
            if (this.selected !== this._currentSelection) {
                // Set current = selected
                this._currentSelection = this.selected;
                this._onDidSelect.fire({
                    index: this.selectElement.selectedIndex,
                    selected: this.options[this.selected].text
                });
                if (!!this.options[this.selected] && !!this.options[this.selected].text) {
                    this.selectElement.title = this.options[this.selected].text;
                }
            }
            this.hideSelectDropDown(true);
        }
    };
    // List Exit - passive - implicit no selection change, hide drop-down
    SelectBoxList.prototype.onListBlur = function () {
        if (this._sticky) {
            return;
        }
        if (this.selected !== this._currentSelection) {
            // Reset selected to current if no change
            this.select(this._currentSelection);
        }
        this.hideSelectDropDown(false);
    };
    SelectBoxList.prototype.renderDescriptionMarkdown = function (text, actionHandler) {
        var cleanRenderedMarkdown = function (element) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var child = element.childNodes.item(i);
                var tagName = child.tagName && child.tagName.toLowerCase();
                if (tagName === 'img') {
                    element.removeChild(child);
                }
                else {
                    cleanRenderedMarkdown(child);
                }
            }
        };
        var renderedMarkdown = renderMarkdown({ value: text }, { actionHandler: actionHandler });
        renderedMarkdown.classList.add('select-box-description-markdown');
        cleanRenderedMarkdown(renderedMarkdown);
        return renderedMarkdown;
    };
    // List Focus Change - passive - update details pane with newly focused element's data
    SelectBoxList.prototype.onListFocus = function (e) {
        // Skip during initial layout
        if (!this._isVisible || !this._hasDetails) {
            return;
        }
        this.selectionDetailsPane.innerText = '';
        var selectedIndex = e.indexes[0];
        var description = this.options[selectedIndex].description;
        var descriptionIsMarkdown = this.options[selectedIndex].descriptionIsMarkdown;
        if (description) {
            if (descriptionIsMarkdown) {
                var actionHandler = this.options[selectedIndex].descriptionMarkdownActionHandler;
                this.selectionDetailsPane.appendChild(this.renderDescriptionMarkdown(description, actionHandler));
            }
            else {
                this.selectionDetailsPane.innerText = description;
            }
            this.selectionDetailsPane.style.display = 'block';
        }
        else {
            this.selectionDetailsPane.style.display = 'none';
        }
        // Avoid recursion
        this._skipLayout = true;
        this.contextViewProvider.layout();
        this._skipLayout = false;
    };
    // List keyboard controller
    // List exit - active - hide ContextView dropdown, reset selection, return focus to parent select
    SelectBoxList.prototype.onEscape = function (e) {
        dom.EventHelper.stop(e);
        // Reset selection to value when opened
        this.select(this._currentSelection);
        this.hideSelectDropDown(true);
    };
    // List exit - active - hide ContextView dropdown, return focus to parent select, fire onDidSelect if change
    SelectBoxList.prototype.onEnter = function (e) {
        dom.EventHelper.stop(e);
        // Only fire if selection change
        if (this.selected !== this._currentSelection) {
            this._currentSelection = this.selected;
            this._onDidSelect.fire({
                index: this.selectElement.selectedIndex,
                selected: this.options[this.selected].text
            });
            if (!!this.options[this.selected] && !!this.options[this.selected].text) {
                this.selectElement.title = this.options[this.selected].text;
            }
        }
        this.hideSelectDropDown(true);
    };
    // List navigation - have to handle a disabled option (jump over)
    SelectBoxList.prototype.onDownArrow = function () {
        if (this.selected < this.options.length - 1) {
            // Skip disabled options
            var nextOptionDisabled = this.options[this.selected + 1].isDisabled;
            if (nextOptionDisabled && this.options.length > this.selected + 2) {
                this.selected += 2;
            }
            else if (nextOptionDisabled) {
                return;
            }
            else {
                this.selected++;
            }
            // Set focus/selection - only fire event when closing drop-down or on blur
            this.select(this.selected);
            this.selectList.setFocus([this.selected]);
            this.selectList.reveal(this.selectList.getFocus()[0]);
        }
    };
    SelectBoxList.prototype.onUpArrow = function () {
        if (this.selected > 0) {
            // Skip disabled options
            var previousOptionDisabled = this.options[this.selected - 1].isDisabled;
            if (previousOptionDisabled && this.selected > 1) {
                this.selected -= 2;
            }
            else {
                this.selected--;
            }
            // Set focus/selection - only fire event when closing drop-down or on blur
            this.select(this.selected);
            this.selectList.setFocus([this.selected]);
            this.selectList.reveal(this.selectList.getFocus()[0]);
        }
    };
    SelectBoxList.prototype.onPageUp = function (e) {
        var _this = this;
        dom.EventHelper.stop(e);
        this.selectList.focusPreviousPage();
        // Allow scrolling to settle
        setTimeout(function () {
            _this.selected = _this.selectList.getFocus()[0];
            // Shift selection down if we land on a disabled option
            if (_this.options[_this.selected].isDisabled && _this.selected < _this.options.length - 1) {
                _this.selected++;
                _this.selectList.setFocus([_this.selected]);
            }
            _this.selectList.reveal(_this.selected);
            _this.select(_this.selected);
        }, 1);
    };
    SelectBoxList.prototype.onPageDown = function (e) {
        var _this = this;
        dom.EventHelper.stop(e);
        this.selectList.focusNextPage();
        // Allow scrolling to settle
        setTimeout(function () {
            _this.selected = _this.selectList.getFocus()[0];
            // Shift selection up if we land on a disabled option
            if (_this.options[_this.selected].isDisabled && _this.selected > 0) {
                _this.selected--;
                _this.selectList.setFocus([_this.selected]);
            }
            _this.selectList.reveal(_this.selected);
            _this.select(_this.selected);
        }, 1);
    };
    SelectBoxList.prototype.onHome = function (e) {
        dom.EventHelper.stop(e);
        if (this.options.length < 2) {
            return;
        }
        this.selected = 0;
        if (this.options[this.selected].isDisabled && this.selected > 1) {
            this.selected++;
        }
        this.selectList.setFocus([this.selected]);
        this.selectList.reveal(this.selected);
        this.select(this.selected);
    };
    SelectBoxList.prototype.onEnd = function (e) {
        dom.EventHelper.stop(e);
        if (this.options.length < 2) {
            return;
        }
        this.selected = this.options.length - 1;
        if (this.options[this.selected].isDisabled && this.selected > 1) {
            this.selected--;
        }
        this.selectList.setFocus([this.selected]);
        this.selectList.reveal(this.selected);
        this.select(this.selected);
    };
    // Mimic option first character navigation of native select
    SelectBoxList.prototype.onCharacter = function (e) {
        var ch = KeyCodeUtils.toString(e.keyCode);
        var optionIndex = -1;
        for (var i = 0; i < this.options.length - 1; i++) {
            optionIndex = (i + this.selected + 1) % this.options.length;
            if (this.options[optionIndex].text.charAt(0).toUpperCase() === ch && !this.options[optionIndex].isDisabled) {
                this.select(optionIndex);
                this.selectList.setFocus([optionIndex]);
                this.selectList.reveal(this.selectList.getFocus()[0]);
                dom.EventHelper.stop(e);
                break;
            }
        }
    };
    SelectBoxList.prototype.dispose = function () {
        this.hideSelectDropDown(false);
        _super.prototype.dispose.call(this);
    };
    SelectBoxList.DEFAULT_DROPDOWN_MINIMUM_BOTTOM_MARGIN = 32;
    SelectBoxList.DEFAULT_DROPDOWN_MINIMUM_TOP_MARGIN = 2;
    SelectBoxList.DEFAULT_MINIMUM_VISIBLE_OPTIONS = 3;
    return SelectBoxList;
}(Disposable));
export { SelectBoxList };
