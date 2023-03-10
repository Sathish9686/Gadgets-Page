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
import './checkbox.css';
import * as DOM from '../../dom';
import { Widget } from '../widget';
import { Color } from '../../../common/color';
import { Emitter } from '../../../common/event';
import * as objects from '../../../common/objects';
import { BaseActionViewItem } from '../actionbar/actionbar';
import { DisposableStore } from '../../../common/lifecycle';
var defaultOpts = {
    inputActiveOptionBorder: Color.fromHex('#007ACC00'),
    inputActiveOptionBackground: Color.fromHex('#0E639C50')
};
var CheckboxActionViewItem = /** @class */ (function (_super) {
    __extends(CheckboxActionViewItem, _super);
    function CheckboxActionViewItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.disposables = new DisposableStore();
        return _this;
    }
    CheckboxActionViewItem.prototype.render = function (container) {
        var _this = this;
        this.element = container;
        this.disposables.clear();
        this.checkbox = new Checkbox({
            actionClassName: this._action.class,
            isChecked: this._action.checked,
            title: this._action.label
        });
        this.disposables.add(this.checkbox);
        this.disposables.add(this.checkbox.onChange(function () { return _this._action.checked = !!_this.checkbox && _this.checkbox.checked; }, this));
        this.element.appendChild(this.checkbox.domNode);
    };
    CheckboxActionViewItem.prototype.updateEnabled = function () {
        if (this.checkbox) {
            if (this.isEnabled()) {
                this.checkbox.enable();
            }
            else {
                this.checkbox.disable();
            }
        }
    };
    CheckboxActionViewItem.prototype.updateChecked = function () {
        if (this.checkbox) {
            this.checkbox.checked = this._action.checked;
        }
    };
    CheckboxActionViewItem.prototype.dispose = function () {
        this.disposables.dispose();
        _super.prototype.dispose.call(this);
    };
    return CheckboxActionViewItem;
}(BaseActionViewItem));
export { CheckboxActionViewItem };
var Checkbox = /** @class */ (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox(opts) {
        var _this = _super.call(this) || this;
        _this._onChange = _this._register(new Emitter());
        _this.onChange = _this._onChange.event;
        _this._onKeyDown = _this._register(new Emitter());
        _this.onKeyDown = _this._onKeyDown.event;
        _this._opts = objects.deepClone(opts);
        objects.mixin(_this._opts, defaultOpts, false);
        _this._checked = _this._opts.isChecked;
        _this.domNode = document.createElement('div');
        _this.domNode.title = _this._opts.title;
        _this.domNode.className = 'monaco-custom-checkbox codicon ' + (_this._opts.actionClassName || '') + ' ' + (_this._checked ? 'checked' : 'unchecked');
        _this.domNode.tabIndex = 0;
        _this.domNode.setAttribute('role', 'checkbox');
        _this.domNode.setAttribute('aria-checked', String(_this._checked));
        _this.domNode.setAttribute('aria-label', _this._opts.title);
        _this.applyStyles();
        _this.onclick(_this.domNode, function (ev) {
            _this.checked = !_this._checked;
            _this._onChange.fire(false);
            ev.preventDefault();
        });
        _this.ignoreGesture(_this.domNode);
        _this.onkeydown(_this.domNode, function (keyboardEvent) {
            if (keyboardEvent.keyCode === 10 /* Space */ || keyboardEvent.keyCode === 3 /* Enter */) {
                _this.checked = !_this._checked;
                _this._onChange.fire(true);
                keyboardEvent.preventDefault();
                return;
            }
            _this._onKeyDown.fire(keyboardEvent);
        });
        return _this;
    }
    Object.defineProperty(Checkbox.prototype, "enabled", {
        get: function () {
            return this.domNode.getAttribute('aria-disabled') !== 'true';
        },
        enumerable: true,
        configurable: true
    });
    Checkbox.prototype.focus = function () {
        this.domNode.focus();
    };
    Object.defineProperty(Checkbox.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (newIsChecked) {
            this._checked = newIsChecked;
            this.domNode.setAttribute('aria-checked', String(this._checked));
            if (this._checked) {
                this.domNode.classList.add('checked');
            }
            else {
                this.domNode.classList.remove('checked');
            }
            this.applyStyles();
        },
        enumerable: true,
        configurable: true
    });
    Checkbox.prototype.width = function () {
        return 2 /*marginleft*/ + 2 /*border*/ + 2 /*padding*/ + 16 /* icon width */;
    };
    Checkbox.prototype.style = function (styles) {
        if (styles.inputActiveOptionBorder) {
            this._opts.inputActiveOptionBorder = styles.inputActiveOptionBorder;
        }
        if (styles.inputActiveOptionBackground) {
            this._opts.inputActiveOptionBackground = styles.inputActiveOptionBackground;
        }
        this.applyStyles();
    };
    Checkbox.prototype.applyStyles = function () {
        if (this.domNode) {
            this.domNode.style.borderColor = this._checked && this._opts.inputActiveOptionBorder ? this._opts.inputActiveOptionBorder.toString() : 'transparent';
            this.domNode.style.backgroundColor = this._checked && this._opts.inputActiveOptionBackground ? this._opts.inputActiveOptionBackground.toString() : 'transparent';
        }
    };
    Checkbox.prototype.enable = function () {
        this.domNode.tabIndex = 0;
        this.domNode.setAttribute('aria-disabled', String(false));
    };
    Checkbox.prototype.disable = function () {
        DOM.removeTabIndexAndUpdateFocus(this.domNode);
        this.domNode.setAttribute('aria-disabled', String(true));
    };
    return Checkbox;
}(Widget));
export { Checkbox };
var SimpleCheckbox = /** @class */ (function (_super) {
    __extends(SimpleCheckbox, _super);
    function SimpleCheckbox(title, isChecked) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.isChecked = isChecked;
        _this.checkbox = new Checkbox({ title: _this.title, isChecked: _this.isChecked, actionClassName: 'monaco-simple-checkbox codicon-check' });
        _this.domNode = _this.checkbox.domNode;
        _this.styles = {};
        _this.checkbox.onChange(function () {
            _this.applyStyles();
        });
        return _this;
    }
    Object.defineProperty(SimpleCheckbox.prototype, "checked", {
        get: function () {
            return this.checkbox.checked;
        },
        set: function (newIsChecked) {
            this.checkbox.checked = newIsChecked;
            this.applyStyles();
        },
        enumerable: true,
        configurable: true
    });
    SimpleCheckbox.prototype.style = function (styles) {
        this.styles = styles;
        this.applyStyles();
    };
    SimpleCheckbox.prototype.applyStyles = function () {
        this.domNode.style.color = this.styles.checkboxForeground ? this.styles.checkboxForeground.toString() : '';
        this.domNode.style.backgroundColor = this.styles.checkboxBackground ? this.styles.checkboxBackground.toString() : '';
        this.domNode.style.borderColor = this.styles.checkboxBorder ? this.styles.checkboxBorder.toString() : '';
    };
    return SimpleCheckbox;
}(Widget));
export { SimpleCheckbox };
