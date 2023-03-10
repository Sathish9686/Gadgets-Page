/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
import * as dom from '../../../base/browser/dom';
import { HighlightedLabel } from '../../../base/browser/ui/highlightedlabel/highlightedLabel';
import { values } from '../../../base/common/collections';
import { createMatches } from '../../../base/common/filters';
import './media/outlineTree.css';
import './media/symbol-icons.css';
import { Range } from '../../common/core/range';
import { SymbolKinds } from '../../common/modes';
import { OutlineElement, OutlineGroup, OutlineModel } from './outlineModel';
import { localize } from '../../../nls';
import { IconLabel } from '../../../base/browser/ui/iconLabel/iconLabel';
import { IConfigurationService } from '../../../platform/configuration/common/configuration';
import { MarkerSeverity } from '../../../platform/markers/common/markers';
import { IThemeService, registerThemingParticipant } from '../../../platform/theme/common/themeService';
import { registerColor, listErrorForeground, listWarningForeground, foreground } from '../../../platform/theme/common/colorRegistry';
import { IdleValue } from '../../../base/common/async';
import { ITextResourceConfigurationService } from '../../common/services/textResourceConfigurationService';
var OutlineNavigationLabelProvider = /** @class */ (function () {
    function OutlineNavigationLabelProvider() {
    }
    OutlineNavigationLabelProvider.prototype.getKeyboardNavigationLabel = function (element) {
        if (element instanceof OutlineGroup) {
            return element.provider.displayName || element.id;
        }
        else {
            return element.symbol.name;
        }
    };
    return OutlineNavigationLabelProvider;
}());
export { OutlineNavigationLabelProvider };
var OutlineIdentityProvider = /** @class */ (function () {
    function OutlineIdentityProvider() {
    }
    OutlineIdentityProvider.prototype.getId = function (element) {
        return element.id;
    };
    return OutlineIdentityProvider;
}());
export { OutlineIdentityProvider };
var OutlineGroupTemplate = /** @class */ (function () {
    function OutlineGroupTemplate(labelContainer, label) {
        this.labelContainer = labelContainer;
        this.label = label;
    }
    OutlineGroupTemplate.id = 'OutlineGroupTemplate';
    return OutlineGroupTemplate;
}());
export { OutlineGroupTemplate };
var OutlineElementTemplate = /** @class */ (function () {
    function OutlineElementTemplate(container, iconLabel, iconClass, decoration) {
        this.container = container;
        this.iconLabel = iconLabel;
        this.iconClass = iconClass;
        this.decoration = decoration;
    }
    OutlineElementTemplate.id = 'OutlineElementTemplate';
    return OutlineElementTemplate;
}());
export { OutlineElementTemplate };
var OutlineVirtualDelegate = /** @class */ (function () {
    function OutlineVirtualDelegate() {
    }
    OutlineVirtualDelegate.prototype.getHeight = function (_element) {
        return 22;
    };
    OutlineVirtualDelegate.prototype.getTemplateId = function (element) {
        if (element instanceof OutlineGroup) {
            return OutlineGroupTemplate.id;
        }
        else {
            return OutlineElementTemplate.id;
        }
    };
    return OutlineVirtualDelegate;
}());
export { OutlineVirtualDelegate };
var OutlineGroupRenderer = /** @class */ (function () {
    function OutlineGroupRenderer() {
        this.templateId = OutlineGroupTemplate.id;
    }
    OutlineGroupRenderer.prototype.renderTemplate = function (container) {
        var labelContainer = dom.$('.outline-element-label');
        dom.addClass(container, 'outline-element');
        dom.append(container, labelContainer);
        return new OutlineGroupTemplate(labelContainer, new HighlightedLabel(labelContainer, true));
    };
    OutlineGroupRenderer.prototype.renderElement = function (node, index, template) {
        template.label.set(node.element.provider.displayName || localize('provider', "Outline Provider"), createMatches(node.filterData));
    };
    OutlineGroupRenderer.prototype.disposeTemplate = function (_template) {
        // nothing
    };
    return OutlineGroupRenderer;
}());
export { OutlineGroupRenderer };
var OutlineElementRenderer = /** @class */ (function () {
    function OutlineElementRenderer(_configurationService, _themeService) {
        this._configurationService = _configurationService;
        this._themeService = _themeService;
        this.templateId = OutlineElementTemplate.id;
    }
    OutlineElementRenderer.prototype.renderTemplate = function (container) {
        dom.addClass(container, 'outline-element');
        var iconLabel = new IconLabel(container, { supportHighlights: true });
        var iconClass = dom.$('.outline-element-icon');
        var decoration = dom.$('.outline-element-decoration');
        container.prepend(iconClass);
        container.appendChild(decoration);
        return new OutlineElementTemplate(container, iconLabel, iconClass, decoration);
    };
    OutlineElementRenderer.prototype.renderElement = function (node, index, template) {
        var element = node.element;
        var options = {
            matches: createMatches(node.filterData),
            labelEscapeNewLines: true,
            extraClasses: [],
            title: localize('title.template', "{0} ({1})", element.symbol.name, OutlineElementRenderer._symbolKindNames[element.symbol.kind])
        };
        if (this._configurationService.getValue("outline.icons" /* icons */)) {
            // add styles for the icons
            template.iconClass.className = '';
            dom.addClasses(template.iconClass, "outline-element-icon " + SymbolKinds.toCssClassName(element.symbol.kind, true));
        }
        if (element.symbol.tags.indexOf(1 /* Deprecated */) >= 0) {
            options.extraClasses.push("deprecated");
            options.matches = [];
        }
        template.iconLabel.setLabel(element.symbol.name, element.symbol.detail, options);
        this._renderMarkerInfo(element, template);
    };
    OutlineElementRenderer.prototype._renderMarkerInfo = function (element, template) {
        if (!element.marker) {
            dom.hide(template.decoration);
            template.container.style.removeProperty('--outline-element-color');
            return;
        }
        var _a = element.marker, count = _a.count, topSev = _a.topSev;
        var color = this._themeService.getTheme().getColor(topSev === MarkerSeverity.Error ? listErrorForeground : listWarningForeground);
        var cssColor = color ? color.toString() : 'inherit';
        // color of the label
        if (this._configurationService.getValue("outline.problems.colors" /* problemsColors */)) {
            template.container.style.setProperty('--outline-element-color', cssColor);
        }
        else {
            template.container.style.removeProperty('--outline-element-color');
        }
        // badge with color/rollup
        if (!this._configurationService.getValue("outline.problems.badges" /* problemsBadges */)) {
            dom.hide(template.decoration);
        }
        else if (count > 0) {
            dom.show(template.decoration);
            dom.removeClass(template.decoration, 'bubble');
            template.decoration.innerText = count < 10 ? count.toString() : '+9';
            template.decoration.title = count === 1 ? localize('1.problem', "1 problem in this element") : localize('N.problem', "{0} problems in this element", count);
            template.decoration.style.setProperty('--outline-element-color', cssColor);
        }
        else {
            dom.show(template.decoration);
            dom.addClass(template.decoration, 'bubble');
            template.decoration.innerText = '\uea71';
            template.decoration.title = localize('deep.problem', "Contains elements with problems");
            template.decoration.style.setProperty('--outline-element-color', cssColor);
        }
    };
    OutlineElementRenderer.prototype.disposeTemplate = function (_template) {
        _template.iconLabel.dispose();
    };
    OutlineElementRenderer._symbolKindNames = (_a = {},
        _a[17 /* Array */] = localize('Array', "array"),
        _a[16 /* Boolean */] = localize('Boolean', "boolean"),
        _a[4 /* Class */] = localize('Class', "class"),
        _a[13 /* Constant */] = localize('Constant', "constant"),
        _a[8 /* Constructor */] = localize('Constructor', "constructor"),
        _a[9 /* Enum */] = localize('Enum', "enumeration"),
        _a[21 /* EnumMember */] = localize('EnumMember', "enumeration member"),
        _a[23 /* Event */] = localize('Event', "event"),
        _a[7 /* Field */] = localize('Field', "field"),
        _a[0 /* File */] = localize('File', "file"),
        _a[11 /* Function */] = localize('Function', "function"),
        _a[10 /* Interface */] = localize('Interface', "interface"),
        _a[19 /* Key */] = localize('Key', "key"),
        _a[5 /* Method */] = localize('Method', "method"),
        _a[1 /* Module */] = localize('Module', "module"),
        _a[2 /* Namespace */] = localize('Namespace', "namespace"),
        _a[20 /* Null */] = localize('Null', "null"),
        _a[15 /* Number */] = localize('Number', "number"),
        _a[18 /* Object */] = localize('Object', "object"),
        _a[24 /* Operator */] = localize('Operator', "operator"),
        _a[3 /* Package */] = localize('Package', "package"),
        _a[6 /* Property */] = localize('Property', "property"),
        _a[14 /* String */] = localize('String', "string"),
        _a[22 /* Struct */] = localize('Struct', "struct"),
        _a[25 /* TypeParameter */] = localize('TypeParameter', "type parameter"),
        _a[12 /* Variable */] = localize('Variable', "variable"),
        _a);
    OutlineElementRenderer = __decorate([
        __param(0, IConfigurationService),
        __param(1, IThemeService)
    ], OutlineElementRenderer);
    return OutlineElementRenderer;
}());
export { OutlineElementRenderer };
var OutlineFilter = /** @class */ (function () {
    function OutlineFilter(_prefix, _textResourceConfigService) {
        this._prefix = _prefix;
        this._textResourceConfigService = _textResourceConfigService;
    }
    OutlineFilter.prototype.filter = function (element) {
        var outline = OutlineModel.get(element);
        var uri;
        if (outline) {
            uri = outline.textModel.uri;
        }
        if (!(element instanceof OutlineElement)) {
            return true;
        }
        var configName = OutlineFilter.kindToConfigName[element.symbol.kind];
        var configKey = this._prefix + "." + configName;
        return this._textResourceConfigService.getValue(uri, configKey);
    };
    OutlineFilter.configNameToKind = Object.freeze((_b = {},
        _b['showFiles'] = 0 /* File */,
        _b['showModules'] = 1 /* Module */,
        _b['showNamespaces'] = 2 /* Namespace */,
        _b['showPackages'] = 3 /* Package */,
        _b['showClasses'] = 4 /* Class */,
        _b['showMethods'] = 5 /* Method */,
        _b['showProperties'] = 6 /* Property */,
        _b['showFields'] = 7 /* Field */,
        _b['showConstructors'] = 8 /* Constructor */,
        _b['showEnums'] = 9 /* Enum */,
        _b['showInterfaces'] = 10 /* Interface */,
        _b['showFunctions'] = 11 /* Function */,
        _b['showVariables'] = 12 /* Variable */,
        _b['showConstants'] = 13 /* Constant */,
        _b['showStrings'] = 14 /* String */,
        _b['showNumbers'] = 15 /* Number */,
        _b['showBooleans'] = 16 /* Boolean */,
        _b['showArrays'] = 17 /* Array */,
        _b['showObjects'] = 18 /* Object */,
        _b['showKeys'] = 19 /* Key */,
        _b['showNull'] = 20 /* Null */,
        _b['showEnumMembers'] = 21 /* EnumMember */,
        _b['showStructs'] = 22 /* Struct */,
        _b['showEvents'] = 23 /* Event */,
        _b['showOperators'] = 24 /* Operator */,
        _b['showTypeParameters'] = 25 /* TypeParameter */,
        _b));
    OutlineFilter.kindToConfigName = Object.freeze((_c = {},
        _c[0 /* File */] = 'showFiles',
        _c[1 /* Module */] = 'showModules',
        _c[2 /* Namespace */] = 'showNamespaces',
        _c[3 /* Package */] = 'showPackages',
        _c[4 /* Class */] = 'showClasses',
        _c[5 /* Method */] = 'showMethods',
        _c[6 /* Property */] = 'showProperties',
        _c[7 /* Field */] = 'showFields',
        _c[8 /* Constructor */] = 'showConstructors',
        _c[9 /* Enum */] = 'showEnums',
        _c[10 /* Interface */] = 'showInterfaces',
        _c[11 /* Function */] = 'showFunctions',
        _c[12 /* Variable */] = 'showVariables',
        _c[13 /* Constant */] = 'showConstants',
        _c[14 /* String */] = 'showStrings',
        _c[15 /* Number */] = 'showNumbers',
        _c[16 /* Boolean */] = 'showBooleans',
        _c[17 /* Array */] = 'showArrays',
        _c[18 /* Object */] = 'showObjects',
        _c[19 /* Key */] = 'showKeys',
        _c[20 /* Null */] = 'showNull',
        _c[21 /* EnumMember */] = 'showEnumMembers',
        _c[22 /* Struct */] = 'showStructs',
        _c[23 /* Event */] = 'showEvents',
        _c[24 /* Operator */] = 'showOperators',
        _c[25 /* TypeParameter */] = 'showTypeParameters',
        _c));
    OutlineFilter = __decorate([
        __param(1, ITextResourceConfigurationService)
    ], OutlineFilter);
    return OutlineFilter;
}());
export { OutlineFilter };
var OutlineItemComparator = /** @class */ (function () {
    function OutlineItemComparator(type) {
        if (type === void 0) { type = 0 /* ByPosition */; }
        this.type = type;
        this._collator = new IdleValue(function () { return new Intl.Collator(undefined, { numeric: true }); });
    }
    OutlineItemComparator.prototype.compare = function (a, b) {
        if (a instanceof OutlineGroup && b instanceof OutlineGroup) {
            return a.providerIndex - b.providerIndex;
        }
        else if (a instanceof OutlineElement && b instanceof OutlineElement) {
            if (this.type === 2 /* ByKind */) {
                return a.symbol.kind - b.symbol.kind || this._collator.getValue().compare(a.symbol.name, b.symbol.name);
            }
            else if (this.type === 1 /* ByName */) {
                return this._collator.getValue().compare(a.symbol.name, b.symbol.name) || Range.compareRangesUsingStarts(a.symbol.range, b.symbol.range);
            }
            else if (this.type === 0 /* ByPosition */) {
                return Range.compareRangesUsingStarts(a.symbol.range, b.symbol.range) || this._collator.getValue().compare(a.symbol.name, b.symbol.name);
            }
        }
        return 0;
    };
    return OutlineItemComparator;
}());
export { OutlineItemComparator };
var OutlineDataSource = /** @class */ (function () {
    function OutlineDataSource() {
    }
    OutlineDataSource.prototype.getChildren = function (element) {
        if (!element) {
            return [];
        }
        return values(element.children);
    };
    return OutlineDataSource;
}());
export { OutlineDataSource };
export var SYMBOL_ICON_ARRAY_FOREGROUND = registerColor('symbolIcon.arrayForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.arrayForeground', 'The foreground color for array symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_BOOLEAN_FOREGROUND = registerColor('symbolIcon.booleanForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.booleanForeground', 'The foreground color for boolean symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_CLASS_FOREGROUND = registerColor('symbolIcon.classForeground', {
    dark: '#EE9D28',
    light: '#D67E00',
    hc: '#EE9D28'
}, localize('symbolIcon.classForeground', 'The foreground color for class symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_COLOR_FOREGROUND = registerColor('symbolIcon.colorForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.colorForeground', 'The foreground color for color symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_CONSTANT_FOREGROUND = registerColor('symbolIcon.constantForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.constantForeground', 'The foreground color for constant symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_CONSTRUCTOR_FOREGROUND = registerColor('symbolIcon.constructorForeground', {
    dark: '#B180D7',
    light: '#652D90',
    hc: '#B180D7'
}, localize('symbolIcon.constructorForeground', 'The foreground color for constructor symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_ENUMERATOR_FOREGROUND = registerColor('symbolIcon.enumeratorForeground', {
    dark: '#EE9D28',
    light: '#D67E00',
    hc: '#EE9D28'
}, localize('symbolIcon.enumeratorForeground', 'The foreground color for enumerator symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_ENUMERATOR_MEMBER_FOREGROUND = registerColor('symbolIcon.enumeratorMemberForeground', {
    dark: '#75BEFF',
    light: '#007ACC',
    hc: '#75BEFF'
}, localize('symbolIcon.enumeratorMemberForeground', 'The foreground color for enumerator member symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_EVENT_FOREGROUND = registerColor('symbolIcon.eventForeground', {
    dark: '#EE9D28',
    light: '#D67E00',
    hc: '#EE9D28'
}, localize('symbolIcon.eventForeground', 'The foreground color for event symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_FIELD_FOREGROUND = registerColor('symbolIcon.fieldForeground', {
    dark: '#75BEFF',
    light: '#007ACC',
    hc: '#75BEFF'
}, localize('symbolIcon.fieldForeground', 'The foreground color for field symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_FILE_FOREGROUND = registerColor('symbolIcon.fileForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.fileForeground', 'The foreground color for file symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_FOLDER_FOREGROUND = registerColor('symbolIcon.folderForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.folderForeground', 'The foreground color for folder symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_FUNCTION_FOREGROUND = registerColor('symbolIcon.functionForeground', {
    dark: '#B180D7',
    light: '#652D90',
    hc: '#B180D7'
}, localize('symbolIcon.functionForeground', 'The foreground color for function symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_INTERFACE_FOREGROUND = registerColor('symbolIcon.interfaceForeground', {
    dark: '#75BEFF',
    light: '#007ACC',
    hc: '#75BEFF'
}, localize('symbolIcon.interfaceForeground', 'The foreground color for interface symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_KEY_FOREGROUND = registerColor('symbolIcon.keyForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.keyForeground', 'The foreground color for key symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_KEYWORD_FOREGROUND = registerColor('symbolIcon.keywordForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.keywordForeground', 'The foreground color for keyword symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_METHOD_FOREGROUND = registerColor('symbolIcon.methodForeground', {
    dark: '#B180D7',
    light: '#652D90',
    hc: '#B180D7'
}, localize('symbolIcon.methodForeground', 'The foreground color for method symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_MODULE_FOREGROUND = registerColor('symbolIcon.moduleForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.moduleForeground', 'The foreground color for module symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_NAMESPACE_FOREGROUND = registerColor('symbolIcon.namespaceForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.namespaceForeground', 'The foreground color for namespace symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_NULL_FOREGROUND = registerColor('symbolIcon.nullForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.nullForeground', 'The foreground color for null symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_NUMBER_FOREGROUND = registerColor('symbolIcon.numberForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.numberForeground', 'The foreground color for number symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_OBJECT_FOREGROUND = registerColor('symbolIcon.objectForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.objectForeground', 'The foreground color for object symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_OPERATOR_FOREGROUND = registerColor('symbolIcon.operatorForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.operatorForeground', 'The foreground color for operator symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_PACKAGE_FOREGROUND = registerColor('symbolIcon.packageForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.packageForeground', 'The foreground color for package symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_PROPERTY_FOREGROUND = registerColor('symbolIcon.propertyForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.propertyForeground', 'The foreground color for property symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_REFERENCE_FOREGROUND = registerColor('symbolIcon.referenceForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.referenceForeground', 'The foreground color for reference symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_SNIPPET_FOREGROUND = registerColor('symbolIcon.snippetForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.snippetForeground', 'The foreground color for snippet symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_STRING_FOREGROUND = registerColor('symbolIcon.stringForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.stringForeground', 'The foreground color for string symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_STRUCT_FOREGROUND = registerColor('symbolIcon.structForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.structForeground', 'The foreground color for struct symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_TEXT_FOREGROUND = registerColor('symbolIcon.textForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.textForeground', 'The foreground color for text symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_TYPEPARAMETER_FOREGROUND = registerColor('symbolIcon.typeParameterForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.typeParameterForeground', 'The foreground color for type parameter symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_UNIT_FOREGROUND = registerColor('symbolIcon.unitForeground', {
    dark: foreground,
    light: foreground,
    hc: foreground
}, localize('symbolIcon.unitForeground', 'The foreground color for unit symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
export var SYMBOL_ICON_VARIABLE_FOREGROUND = registerColor('symbolIcon.variableForeground', {
    dark: '#75BEFF',
    light: '#007ACC',
    hc: '#75BEFF'
}, localize('symbolIcon.variableForeground', 'The foreground color for variable symbols. These symbols appear in the outline, breadcrumb, and suggest widget.'));
registerThemingParticipant(function (theme, collector) {
    var symbolIconArrayColor = theme.getColor(SYMBOL_ICON_ARRAY_FOREGROUND);
    if (symbolIconArrayColor) {
        collector.addRule(".codicon-symbol-array { color: " + symbolIconArrayColor + " !important; }");
    }
    var symbolIconBooleanColor = theme.getColor(SYMBOL_ICON_BOOLEAN_FOREGROUND);
    if (symbolIconBooleanColor) {
        collector.addRule(".codicon-symbol-boolean { color: " + symbolIconBooleanColor + " !important; }");
    }
    var symbolIconClassColor = theme.getColor(SYMBOL_ICON_CLASS_FOREGROUND);
    if (symbolIconClassColor) {
        collector.addRule(".codicon-symbol-class { color: " + symbolIconClassColor + " !important; }");
    }
    var symbolIconMethodColor = theme.getColor(SYMBOL_ICON_METHOD_FOREGROUND);
    if (symbolIconMethodColor) {
        collector.addRule(".codicon-symbol-method { color: " + symbolIconMethodColor + " !important; }");
    }
    var symbolIconColorColor = theme.getColor(SYMBOL_ICON_COLOR_FOREGROUND);
    if (symbolIconColorColor) {
        collector.addRule(".codicon-symbol-color { color: " + symbolIconColorColor + " !important; }");
    }
    var symbolIconConstantColor = theme.getColor(SYMBOL_ICON_CONSTANT_FOREGROUND);
    if (symbolIconConstantColor) {
        collector.addRule(".codicon-symbol-constant { color: " + symbolIconConstantColor + " !important; }");
    }
    var symbolIconConstructorColor = theme.getColor(SYMBOL_ICON_CONSTRUCTOR_FOREGROUND);
    if (symbolIconConstructorColor) {
        collector.addRule(".codicon-symbol-constructor { color: " + symbolIconConstructorColor + " !important; }");
    }
    var symbolIconEnumeratorColor = theme.getColor(SYMBOL_ICON_ENUMERATOR_FOREGROUND);
    if (symbolIconEnumeratorColor) {
        collector.addRule("\n\t\t\t.codicon-symbol-value,.codicon-symbol-enum { color: " + symbolIconEnumeratorColor + " !important; }");
    }
    var symbolIconEnumeratorMemberColor = theme.getColor(SYMBOL_ICON_ENUMERATOR_MEMBER_FOREGROUND);
    if (symbolIconEnumeratorMemberColor) {
        collector.addRule(".codicon-symbol-enum-member { color: " + symbolIconEnumeratorMemberColor + " !important; }");
    }
    var symbolIconEventColor = theme.getColor(SYMBOL_ICON_EVENT_FOREGROUND);
    if (symbolIconEventColor) {
        collector.addRule(".codicon-symbol-event { color: " + symbolIconEventColor + " !important; }");
    }
    var symbolIconFieldColor = theme.getColor(SYMBOL_ICON_FIELD_FOREGROUND);
    if (symbolIconFieldColor) {
        collector.addRule(".codicon-symbol-field { color: " + symbolIconFieldColor + " !important; }");
    }
    var symbolIconFileColor = theme.getColor(SYMBOL_ICON_FILE_FOREGROUND);
    if (symbolIconFileColor) {
        collector.addRule(".codicon-symbol-file { color: " + symbolIconFileColor + " !important; }");
    }
    var symbolIconFolderColor = theme.getColor(SYMBOL_ICON_FOLDER_FOREGROUND);
    if (symbolIconFolderColor) {
        collector.addRule(".codicon-symbol-folder { color: " + symbolIconFolderColor + " !important; }");
    }
    var symbolIconFunctionColor = theme.getColor(SYMBOL_ICON_FUNCTION_FOREGROUND);
    if (symbolIconFunctionColor) {
        collector.addRule(".codicon-symbol-function { color: " + symbolIconFunctionColor + " !important; }");
    }
    var symbolIconInterfaceColor = theme.getColor(SYMBOL_ICON_INTERFACE_FOREGROUND);
    if (symbolIconInterfaceColor) {
        collector.addRule(".codicon-symbol-interface { color: " + symbolIconInterfaceColor + " !important; }");
    }
    var symbolIconKeyColor = theme.getColor(SYMBOL_ICON_KEY_FOREGROUND);
    if (symbolIconKeyColor) {
        collector.addRule(".codicon-symbol-key { color: " + symbolIconKeyColor + " !important; }");
    }
    var symbolIconKeywordColor = theme.getColor(SYMBOL_ICON_KEYWORD_FOREGROUND);
    if (symbolIconKeywordColor) {
        collector.addRule(".codicon-symbol-keyword { color: " + symbolIconKeywordColor + " !important; }");
    }
    var symbolIconModuleColor = theme.getColor(SYMBOL_ICON_MODULE_FOREGROUND);
    if (symbolIconModuleColor) {
        collector.addRule(".codicon-symbol-module { color: " + symbolIconModuleColor + " !important; }");
    }
    var outlineNamespaceColor = theme.getColor(SYMBOL_ICON_NAMESPACE_FOREGROUND);
    if (outlineNamespaceColor) {
        collector.addRule(".codicon-symbol-namespace { color: " + outlineNamespaceColor + " !important; }");
    }
    var symbolIconNullColor = theme.getColor(SYMBOL_ICON_NULL_FOREGROUND);
    if (symbolIconNullColor) {
        collector.addRule(".codicon-symbol-null { color: " + symbolIconNullColor + " !important; }");
    }
    var symbolIconNumberColor = theme.getColor(SYMBOL_ICON_NUMBER_FOREGROUND);
    if (symbolIconNumberColor) {
        collector.addRule(".codicon-symbol-number { color: " + symbolIconNumberColor + " !important; }");
    }
    var symbolIconObjectColor = theme.getColor(SYMBOL_ICON_OBJECT_FOREGROUND);
    if (symbolIconObjectColor) {
        collector.addRule(".codicon-symbol-object { color: " + symbolIconObjectColor + " !important; }");
    }
    var symbolIconOperatorColor = theme.getColor(SYMBOL_ICON_OPERATOR_FOREGROUND);
    if (symbolIconOperatorColor) {
        collector.addRule(".codicon-symbol-operator { color: " + symbolIconOperatorColor + " !important; }");
    }
    var symbolIconPackageColor = theme.getColor(SYMBOL_ICON_PACKAGE_FOREGROUND);
    if (symbolIconPackageColor) {
        collector.addRule(".codicon-symbol-package { color: " + symbolIconPackageColor + " !important; }");
    }
    var symbolIconPropertyColor = theme.getColor(SYMBOL_ICON_PROPERTY_FOREGROUND);
    if (symbolIconPropertyColor) {
        collector.addRule(".codicon-symbol-property { color: " + symbolIconPropertyColor + " !important; }");
    }
    var symbolIconReferenceColor = theme.getColor(SYMBOL_ICON_REFERENCE_FOREGROUND);
    if (symbolIconReferenceColor) {
        collector.addRule(".codicon-symbol-reference { color: " + symbolIconReferenceColor + " !important; }");
    }
    var symbolIconSnippetColor = theme.getColor(SYMBOL_ICON_SNIPPET_FOREGROUND);
    if (symbolIconSnippetColor) {
        collector.addRule(".codicon-symbol-snippet { color: " + symbolIconSnippetColor + " !important; }");
    }
    var symbolIconStringColor = theme.getColor(SYMBOL_ICON_STRING_FOREGROUND);
    if (symbolIconStringColor) {
        collector.addRule(".codicon-symbol-string { color: " + symbolIconStringColor + " !important; }");
    }
    var symbolIconStructColor = theme.getColor(SYMBOL_ICON_STRUCT_FOREGROUND);
    if (symbolIconStructColor) {
        collector.addRule(".codicon-symbol-struct { color: " + symbolIconStructColor + " !important; }");
    }
    var symbolIconTextColor = theme.getColor(SYMBOL_ICON_TEXT_FOREGROUND);
    if (symbolIconTextColor) {
        collector.addRule(".codicon-symbol-text { color: " + symbolIconTextColor + " !important; }");
    }
    var symbolIconTypeParameterColor = theme.getColor(SYMBOL_ICON_TYPEPARAMETER_FOREGROUND);
    if (symbolIconTypeParameterColor) {
        collector.addRule(".codicon-symbol-type-parameter { color: " + symbolIconTypeParameterColor + " !important; }");
    }
    var symbolIconUnitColor = theme.getColor(SYMBOL_ICON_UNIT_FOREGROUND);
    if (symbolIconUnitColor) {
        collector.addRule(".codicon-symbol-unit { color: " + symbolIconUnitColor + " !important; }");
    }
    var symbolIconVariableColor = theme.getColor(SYMBOL_ICON_VARIABLE_FOREGROUND);
    if (symbolIconVariableColor) {
        collector.addRule(".codicon-symbol-variable { color: " + symbolIconVariableColor + " !important; }");
    }
});
