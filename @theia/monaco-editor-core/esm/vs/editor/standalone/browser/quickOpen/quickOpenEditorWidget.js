/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dimension } from '../../../../base/browser/dom';
import { QuickOpenWidget } from '../../../../base/parts/quickopen/browser/quickOpenWidget';
import { foreground } from '../../../../platform/theme/common/colorRegistry';
import { attachQuickOpenStyler } from '../../../../platform/theme/common/styler';
var QuickOpenEditorWidget = /** @class */ (function () {
    function QuickOpenEditorWidget(codeEditor, onOk, onCancel, onType, configuration, themeService) {
        this.codeEditor = codeEditor;
        this.themeService = themeService;
        this.visible = false;
        this.domNode = document.createElement('div');
        this.quickOpenWidget = new QuickOpenWidget(this.domNode, {
            onOk: onOk,
            onCancel: onCancel,
            onType: onType
        }, {
            inputPlaceHolder: undefined,
            inputAriaLabel: configuration.inputAriaLabel,
            keyboardSupport: true
        });
        this.styler = attachQuickOpenStyler(this.quickOpenWidget, this.themeService, {
            pickerGroupForeground: foreground
        });
        this.quickOpenWidget.create();
        this.codeEditor.addOverlayWidget(this);
    }
    QuickOpenEditorWidget.prototype.setInput = function (model, focus) {
        this.quickOpenWidget.setInput(model, focus);
    };
    QuickOpenEditorWidget.prototype.getId = function () {
        return QuickOpenEditorWidget.ID;
    };
    QuickOpenEditorWidget.prototype.getDomNode = function () {
        return this.domNode;
    };
    QuickOpenEditorWidget.prototype.destroy = function () {
        this.codeEditor.removeOverlayWidget(this);
        this.quickOpenWidget.dispose();
        this.styler.dispose();
    };
    QuickOpenEditorWidget.prototype.isVisible = function () {
        return !!this.visible;
    };
    QuickOpenEditorWidget.prototype.show = function (value) {
        this.visible = true;
        var editorLayout = this.codeEditor.getLayoutInfo();
        if (editorLayout) {
            this.quickOpenWidget.layout(new Dimension(editorLayout.width, editorLayout.height));
        }
        this.quickOpenWidget.show(value);
        this.codeEditor.layoutOverlayWidget(this);
    };
    QuickOpenEditorWidget.prototype.hide = function () {
        this.visible = false;
        this.quickOpenWidget.hide();
        this.codeEditor.layoutOverlayWidget(this);
    };
    QuickOpenEditorWidget.prototype.getPosition = function () {
        if (this.visible) {
            return {
                preference: 2 /* TOP_CENTER */
            };
        }
        return null;
    };
    QuickOpenEditorWidget.ID = 'editor.contrib.quickOpenEditorWidget';
    return QuickOpenEditorWidget;
}());
export { QuickOpenEditorWidget };
