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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
import { createStyleSheet } from '../../../base/browser/dom';
import { PagedList } from '../../../base/browser/ui/list/listPaging';
import { DefaultStyleController, isSelectionRangeChangeEvent, isSelectionSingleChangeEvent, List } from '../../../base/browser/ui/list/listWidget';
import { Emitter } from '../../../base/common/event';
import { Disposable, dispose, toDisposable, DisposableStore, combinedDisposable } from '../../../base/common/lifecycle';
import { isUndefinedOrNull } from '../../../base/common/types';
import { DefaultController, DefaultTreestyler } from '../../../base/parts/tree/browser/treeDefaults';
import { Tree } from '../../../base/parts/tree/browser/treeImpl';
import { localize } from '../../../nls';
import { IConfigurationService, getMigratedSettingValue } from '../../configuration/common/configuration';
import { Extensions as ConfigurationExtensions } from '../../configuration/common/configurationRegistry';
import { ContextKeyExpr, IContextKeyService, RawContextKey } from '../../contextkey/common/contextkey';
import { createDecorator, IInstantiationService } from '../../instantiation/common/instantiation';
import { IKeybindingService } from '../../keybinding/common/keybinding';
import { Registry } from '../../registry/common/platform';
import { attachListStyler, computeStyles, defaultListStyles } from '../../theme/common/styler';
import { IThemeService } from '../../theme/common/themeService';
import { InputFocusedContextKey } from '../../contextkey/common/contextkeys';
import { ObjectTree, CompressibleObjectTree } from '../../../base/browser/ui/tree/objectTree';
import { AsyncDataTree, CompressibleAsyncDataTree } from '../../../base/browser/ui/tree/asyncDataTree';
import { DataTree } from '../../../base/browser/ui/tree/dataTree';
import { IAccessibilityService } from '../../accessibility/common/accessibility';
export var IListService = createDecorator('listService');
var ListService = /** @class */ (function () {
    function ListService(_themeService) {
        this._themeService = _themeService;
        this.disposables = new DisposableStore();
        this.lists = [];
        this._lastFocusedWidget = undefined;
        this._hasCreatedStyleController = false;
    }
    Object.defineProperty(ListService.prototype, "lastFocusedList", {
        get: function () {
            return this._lastFocusedWidget;
        },
        enumerable: true,
        configurable: true
    });
    ListService.prototype.register = function (widget, extraContextKeys) {
        var _this = this;
        if (!this._hasCreatedStyleController) {
            this._hasCreatedStyleController = true;
            // create a shared default tree style sheet for performance reasons
            var styleController = new DefaultStyleController(createStyleSheet(), '');
            this.disposables.add(attachListStyler(styleController, this._themeService));
        }
        if (this.lists.some(function (l) { return l.widget === widget; })) {
            throw new Error('Cannot register the same widget multiple times');
        }
        // Keep in our lists list
        var registeredList = { widget: widget, extraContextKeys: extraContextKeys };
        this.lists.push(registeredList);
        // Check for currently being focused
        if (widget.getHTMLElement() === document.activeElement) {
            this._lastFocusedWidget = widget;
        }
        return combinedDisposable(widget.onDidFocus(function () { return _this._lastFocusedWidget = widget; }), toDisposable(function () { return _this.lists.splice(_this.lists.indexOf(registeredList), 1); }), widget.onDidDispose(function () {
            _this.lists = _this.lists.filter(function (l) { return l !== registeredList; });
            if (_this._lastFocusedWidget === widget) {
                _this._lastFocusedWidget = undefined;
            }
        }));
    };
    ListService.prototype.dispose = function () {
        this.disposables.dispose();
    };
    ListService = __decorate([
        __param(0, IThemeService)
    ], ListService);
    return ListService;
}());
export { ListService };
var RawWorkbenchListFocusContextKey = new RawContextKey('listFocus', true);
export var WorkbenchListSupportsMultiSelectContextKey = new RawContextKey('listSupportsMultiselect', true);
export var WorkbenchListFocusContextKey = ContextKeyExpr.and(RawWorkbenchListFocusContextKey, ContextKeyExpr.not(InputFocusedContextKey));
export var WorkbenchListHasSelectionOrFocus = new RawContextKey('listHasSelectionOrFocus', false);
export var WorkbenchListDoubleSelection = new RawContextKey('listDoubleSelection', false);
export var WorkbenchListMultiSelection = new RawContextKey('listMultiSelection', false);
export var WorkbenchListSupportsKeyboardNavigation = new RawContextKey('listSupportsKeyboardNavigation', true);
export var WorkbenchListAutomaticKeyboardNavigationKey = 'listAutomaticKeyboardNavigation';
export var WorkbenchListAutomaticKeyboardNavigation = new RawContextKey(WorkbenchListAutomaticKeyboardNavigationKey, true);
export var didBindWorkbenchListAutomaticKeyboardNavigation = false;
function createScopedContextKeyService(contextKeyService, widget) {
    var result = contextKeyService.createScoped(widget.getHTMLElement());
    RawWorkbenchListFocusContextKey.bindTo(result);
    return result;
}
export var multiSelectModifierSettingKey = 'workbench.list.multiSelectModifier';
export var openModeSettingKey = 'workbench.list.openMode';
export var horizontalScrollingKey = 'workbench.list.horizontalScrolling';
export var keyboardNavigationSettingKey = 'workbench.list.keyboardNavigation';
export var automaticKeyboardNavigationSettingKey = 'workbench.list.automaticKeyboardNavigation';
var treeIndentKey = 'workbench.tree.indent';
var treeRenderIndentGuidesKey = 'workbench.tree.renderIndentGuides';
function getHorizontalScrollingSetting(configurationService) {
    return getMigratedSettingValue(configurationService, horizontalScrollingKey, 'workbench.tree.horizontalScrolling');
}
function useAltAsMultipleSelectionModifier(configurationService) {
    return configurationService.getValue(multiSelectModifierSettingKey) === 'alt';
}
function useSingleClickToOpen(configurationService) {
    return configurationService.getValue(openModeSettingKey) !== 'doubleClick';
}
var MultipleSelectionController = /** @class */ (function (_super) {
    __extends(MultipleSelectionController, _super);
    function MultipleSelectionController(configurationService) {
        var _this = _super.call(this) || this;
        _this.configurationService = configurationService;
        _this.useAltAsMultipleSelectionModifier = useAltAsMultipleSelectionModifier(configurationService);
        _this.registerListeners();
        return _this;
    }
    MultipleSelectionController.prototype.registerListeners = function () {
        var _this = this;
        this._register(this.configurationService.onDidChangeConfiguration(function (e) {
            if (e.affectsConfiguration(multiSelectModifierSettingKey)) {
                _this.useAltAsMultipleSelectionModifier = useAltAsMultipleSelectionModifier(_this.configurationService);
            }
        }));
    };
    MultipleSelectionController.prototype.isSelectionSingleChangeEvent = function (event) {
        if (this.useAltAsMultipleSelectionModifier) {
            return event.browserEvent.altKey;
        }
        return isSelectionSingleChangeEvent(event);
    };
    MultipleSelectionController.prototype.isSelectionRangeChangeEvent = function (event) {
        return isSelectionRangeChangeEvent(event);
    };
    return MultipleSelectionController;
}(Disposable));
var WorkbenchOpenController = /** @class */ (function (_super) {
    __extends(WorkbenchOpenController, _super);
    function WorkbenchOpenController(configurationService, existingOpenController) {
        var _this = _super.call(this) || this;
        _this.configurationService = configurationService;
        _this.existingOpenController = existingOpenController;
        _this.openOnSingleClick = useSingleClickToOpen(configurationService);
        _this.registerListeners();
        return _this;
    }
    WorkbenchOpenController.prototype.registerListeners = function () {
        var _this = this;
        this._register(this.configurationService.onDidChangeConfiguration(function (e) {
            if (e.affectsConfiguration(openModeSettingKey)) {
                _this.openOnSingleClick = useSingleClickToOpen(_this.configurationService);
            }
        }));
    };
    WorkbenchOpenController.prototype.shouldOpen = function (event) {
        if (event instanceof MouseEvent) {
            var isLeftButton = event.button === 0;
            var isDoubleClick = event.detail === 2;
            if (isLeftButton && !this.openOnSingleClick && !isDoubleClick) {
                return false;
            }
            if (isLeftButton /* left mouse button */ || event.button === 1 /* middle mouse button */) {
                return this.existingOpenController ? this.existingOpenController.shouldOpen(event) : true;
            }
            return false;
        }
        return this.existingOpenController ? this.existingOpenController.shouldOpen(event) : true;
    };
    return WorkbenchOpenController;
}(Disposable));
function toWorkbenchListOptions(options, configurationService, keybindingService) {
    var disposables = new DisposableStore();
    var result = __assign({}, options);
    if (options.multipleSelectionSupport !== false && !options.multipleSelectionController) {
        var multipleSelectionController = new MultipleSelectionController(configurationService);
        result.multipleSelectionController = multipleSelectionController;
        disposables.add(multipleSelectionController);
    }
    var openController = new WorkbenchOpenController(configurationService, options.openController);
    result.openController = openController;
    disposables.add(openController);
    result.keyboardNavigationDelegate = {
        mightProducePrintableCharacter: function (e) {
            return keybindingService.mightProducePrintableCharacter(e);
        }
    };
    return [result, disposables];
}
var WorkbenchList = /** @class */ (function (_super) {
    __extends(WorkbenchList, _super);
    function WorkbenchList(user, container, delegate, renderers, options, contextKeyService, listService, themeService, configurationService, keybindingService) {
        var _this = this;
        var horizontalScrolling = typeof options.horizontalScrolling !== 'undefined' ? options.horizontalScrolling : getHorizontalScrollingSetting(configurationService);
        var _a = toWorkbenchListOptions(options, configurationService, keybindingService), workbenchListOptions = _a[0], workbenchListOptionsDisposable = _a[1];
        _this = _super.call(this, user, container, delegate, renderers, __assign(__assign(__assign({ keyboardSupport: false }, computeStyles(themeService.getTheme(), defaultListStyles)), workbenchListOptions), { horizontalScrolling: horizontalScrolling })) || this;
        _this.disposables.add(workbenchListOptionsDisposable);
        _this.contextKeyService = createScopedContextKeyService(contextKeyService, _this);
        _this.configurationService = configurationService;
        var listSupportsMultiSelect = WorkbenchListSupportsMultiSelectContextKey.bindTo(_this.contextKeyService);
        listSupportsMultiSelect.set(!(options.multipleSelectionSupport === false));
        _this.listHasSelectionOrFocus = WorkbenchListHasSelectionOrFocus.bindTo(_this.contextKeyService);
        _this.listDoubleSelection = WorkbenchListDoubleSelection.bindTo(_this.contextKeyService);
        _this.listMultiSelection = WorkbenchListMultiSelection.bindTo(_this.contextKeyService);
        _this._useAltAsMultipleSelectionModifier = useAltAsMultipleSelectionModifier(configurationService);
        _this.disposables.add(_this.contextKeyService);
        _this.disposables.add(listService.register(_this));
        if (options.overrideStyles) {
            _this.disposables.add(attachListStyler(_this, themeService, options.overrideStyles));
        }
        _this.disposables.add(_this.onSelectionChange(function () {
            var selection = _this.getSelection();
            var focus = _this.getFocus();
            _this.listHasSelectionOrFocus.set(selection.length > 0 || focus.length > 0);
            _this.listMultiSelection.set(selection.length > 1);
            _this.listDoubleSelection.set(selection.length === 2);
        }));
        _this.disposables.add(_this.onFocusChange(function () {
            var selection = _this.getSelection();
            var focus = _this.getFocus();
            _this.listHasSelectionOrFocus.set(selection.length > 0 || focus.length > 0);
        }));
        _this.registerListeners();
        return _this;
    }
    WorkbenchList.prototype.registerListeners = function () {
        var _this = this;
        this.disposables.add(this.configurationService.onDidChangeConfiguration(function (e) {
            if (e.affectsConfiguration(multiSelectModifierSettingKey)) {
                _this._useAltAsMultipleSelectionModifier = useAltAsMultipleSelectionModifier(_this.configurationService);
            }
        }));
    };
    Object.defineProperty(WorkbenchList.prototype, "useAltAsMultipleSelectionModifier", {
        get: function () {
            return this._useAltAsMultipleSelectionModifier;
        },
        enumerable: true,
        configurable: true
    });
    WorkbenchList = __decorate([
        __param(5, IContextKeyService),
        __param(6, IListService),
        __param(7, IThemeService),
        __param(8, IConfigurationService),
        __param(9, IKeybindingService)
    ], WorkbenchList);
    return WorkbenchList;
}(List));
export { WorkbenchList };
var WorkbenchPagedList = /** @class */ (function (_super) {
    __extends(WorkbenchPagedList, _super);
    function WorkbenchPagedList(user, container, delegate, renderers, options, contextKeyService, listService, themeService, configurationService, keybindingService) {
        var _this = this;
        var horizontalScrolling = typeof options.horizontalScrolling !== 'undefined' ? options.horizontalScrolling : getHorizontalScrollingSetting(configurationService);
        var _a = toWorkbenchListOptions(options, configurationService, keybindingService), workbenchListOptions = _a[0], workbenchListOptionsDisposable = _a[1];
        _this = _super.call(this, user, container, delegate, renderers, __assign(__assign(__assign({ keyboardSupport: false }, computeStyles(themeService.getTheme(), defaultListStyles)), workbenchListOptions), { horizontalScrolling: horizontalScrolling })) || this;
        _this.disposables = new DisposableStore();
        _this.disposables.add(workbenchListOptionsDisposable);
        _this.contextKeyService = createScopedContextKeyService(contextKeyService, _this);
        _this.configurationService = configurationService;
        var listSupportsMultiSelect = WorkbenchListSupportsMultiSelectContextKey.bindTo(_this.contextKeyService);
        listSupportsMultiSelect.set(!(options.multipleSelectionSupport === false));
        _this._useAltAsMultipleSelectionModifier = useAltAsMultipleSelectionModifier(configurationService);
        _this.disposables.add(_this.contextKeyService);
        _this.disposables.add(listService.register(_this));
        if (options.overrideStyles) {
            _this.disposables.add(attachListStyler(_this, themeService, options.overrideStyles));
        }
        _this.registerListeners();
        return _this;
    }
    WorkbenchPagedList.prototype.registerListeners = function () {
        var _this = this;
        this.disposables.add(this.configurationService.onDidChangeConfiguration(function (e) {
            if (e.affectsConfiguration(multiSelectModifierSettingKey)) {
                _this._useAltAsMultipleSelectionModifier = useAltAsMultipleSelectionModifier(_this.configurationService);
            }
        }));
    };
    Object.defineProperty(WorkbenchPagedList.prototype, "useAltAsMultipleSelectionModifier", {
        get: function () {
            return this._useAltAsMultipleSelectionModifier;
        },
        enumerable: true,
        configurable: true
    });
    WorkbenchPagedList.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposables.dispose();
    };
    WorkbenchPagedList = __decorate([
        __param(5, IContextKeyService),
        __param(6, IListService),
        __param(7, IThemeService),
        __param(8, IConfigurationService),
        __param(9, IKeybindingService)
    ], WorkbenchPagedList);
    return WorkbenchPagedList;
}(PagedList));
export { WorkbenchPagedList };
/**
 * @deprecated
 */
var sharedTreeStyleSheet;
function getSharedTreeStyleSheet() {
    if (!sharedTreeStyleSheet) {
        sharedTreeStyleSheet = createStyleSheet();
    }
    return sharedTreeStyleSheet;
}
/**
 * @deprecated
 */
function handleTreeController(configuration, instantiationService) {
    if (!configuration.controller) {
        configuration.controller = instantiationService.createInstance(WorkbenchTreeController, {});
    }
    if (!configuration.styler) {
        configuration.styler = new DefaultTreestyler(getSharedTreeStyleSheet());
    }
    return configuration;
}
/**
 * @deprecated
 */
var WorkbenchTree = /** @class */ (function (_super) {
    __extends(WorkbenchTree, _super);
    function WorkbenchTree(container, configuration, options, contextKeyService, listService, themeService, instantiationService, configurationService) {
        var _this = this;
        var config = handleTreeController(configuration, instantiationService);
        var horizontalScrollMode = configurationService.getValue(horizontalScrollingKey) ? 1 /* Auto */ : 2 /* Hidden */;
        var opts = __assign(__assign({ horizontalScrollMode: horizontalScrollMode, keyboardSupport: false }, computeStyles(themeService.getTheme(), defaultListStyles)), options);
        _this = _super.call(this, container, config, opts) || this;
        _this.disposables = [];
        _this.contextKeyService = createScopedContextKeyService(contextKeyService, _this);
        WorkbenchListSupportsMultiSelectContextKey.bindTo(_this.contextKeyService);
        _this.listHasSelectionOrFocus = WorkbenchListHasSelectionOrFocus.bindTo(_this.contextKeyService);
        _this.listDoubleSelection = WorkbenchListDoubleSelection.bindTo(_this.contextKeyService);
        _this.listMultiSelection = WorkbenchListMultiSelection.bindTo(_this.contextKeyService);
        _this._openOnSingleClick = useSingleClickToOpen(configurationService);
        _this._useAltAsMultipleSelectionModifier = useAltAsMultipleSelectionModifier(configurationService);
        _this.disposables.push(_this.contextKeyService, listService.register(_this), attachListStyler(_this, themeService));
        _this.disposables.push(_this.onDidChangeSelection(function () {
            var selection = _this.getSelection();
            var focus = _this.getFocus();
            _this.listHasSelectionOrFocus.set((selection && selection.length > 0) || !!focus);
            _this.listDoubleSelection.set(selection && selection.length === 2);
            _this.listMultiSelection.set(selection && selection.length > 1);
        }));
        _this.disposables.push(_this.onDidChangeFocus(function () {
            var selection = _this.getSelection();
            var focus = _this.getFocus();
            _this.listHasSelectionOrFocus.set((selection && selection.length > 0) || !!focus);
        }));
        _this.disposables.push(configurationService.onDidChangeConfiguration(function (e) {
            if (e.affectsConfiguration(openModeSettingKey)) {
                _this._openOnSingleClick = useSingleClickToOpen(configurationService);
            }
            if (e.affectsConfiguration(multiSelectModifierSettingKey)) {
                _this._useAltAsMultipleSelectionModifier = useAltAsMultipleSelectionModifier(configurationService);
            }
        }));
        return _this;
    }
    Object.defineProperty(WorkbenchTree.prototype, "openOnSingleClick", {
        get: function () {
            return this._openOnSingleClick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkbenchTree.prototype, "useAltAsMultipleSelectionModifier", {
        get: function () {
            return this._useAltAsMultipleSelectionModifier;
        },
        enumerable: true,
        configurable: true
    });
    WorkbenchTree.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposables = dispose(this.disposables);
    };
    WorkbenchTree = __decorate([
        __param(3, IContextKeyService),
        __param(4, IListService),
        __param(5, IThemeService),
        __param(6, IInstantiationService),
        __param(7, IConfigurationService)
    ], WorkbenchTree);
    return WorkbenchTree;
}(Tree));
export { WorkbenchTree };
/**
 * @deprecated
 */
function massageControllerOptions(options) {
    if (typeof options.keyboardSupport !== 'boolean') {
        options.keyboardSupport = false;
    }
    if (typeof options.clickBehavior !== 'number') {
        options.clickBehavior = 0 /* ON_MOUSE_DOWN */;
    }
    return options;
}
/**
 * @deprecated
 */
var WorkbenchTreeController = /** @class */ (function (_super) {
    __extends(WorkbenchTreeController, _super);
    function WorkbenchTreeController(options, configurationService) {
        var _this = _super.call(this, massageControllerOptions(options)) || this;
        _this.configurationService = configurationService;
        _this.disposables = new DisposableStore();
        // if the open mode is not set, we configure it based on settings
        if (isUndefinedOrNull(options.openMode)) {
            _this.setOpenMode(_this.getOpenModeSetting());
            _this.registerListeners();
        }
        return _this;
    }
    WorkbenchTreeController.prototype.registerListeners = function () {
        var _this = this;
        this.disposables.add(this.configurationService.onDidChangeConfiguration(function (e) {
            if (e.affectsConfiguration(openModeSettingKey)) {
                _this.setOpenMode(_this.getOpenModeSetting());
            }
        }));
    };
    WorkbenchTreeController.prototype.getOpenModeSetting = function () {
        return useSingleClickToOpen(this.configurationService) ? 0 /* SINGLE_CLICK */ : 1 /* DOUBLE_CLICK */;
    };
    WorkbenchTreeController.prototype.dispose = function () {
        this.disposables.dispose();
    };
    WorkbenchTreeController = __decorate([
        __param(1, IConfigurationService)
    ], WorkbenchTreeController);
    return WorkbenchTreeController;
}(DefaultController));
export { WorkbenchTreeController };
export function getSelectionKeyboardEvent(typeArg, preserveFocus) {
    if (typeArg === void 0) { typeArg = 'keydown'; }
    var e = new KeyboardEvent(typeArg);
    e.preserveFocus = preserveFocus;
    return e;
}
var TreeResourceNavigator = /** @class */ (function (_super) {
    __extends(TreeResourceNavigator, _super);
    function TreeResourceNavigator(tree, options) {
        var _this = _super.call(this) || this;
        _this.tree = tree;
        _this._onDidOpenResource = new Emitter();
        _this.onDidOpenResource = _this._onDidOpenResource.event;
        _this.options = __assign({
            openOnSelection: true
        }, (options || {}));
        _this.registerListeners();
        return _this;
    }
    TreeResourceNavigator.prototype.registerListeners = function () {
        var _this = this;
        if (this.options && this.options.openOnFocus) {
            this._register(this.tree.onDidChangeFocus(function (e) { return _this.onFocus(e); }));
        }
        if (this.options && this.options.openOnSelection) {
            this._register(this.tree.onDidChangeSelection(function (e) { return _this.onSelection(e); }));
        }
        this._register(this.tree.onDidOpen(function (e) { return _this.onSelection(e); }));
    };
    TreeResourceNavigator.prototype.onFocus = function (e) {
        var focus = this.tree.getFocus();
        this.tree.setSelection(focus, e.browserEvent);
        if (!e.browserEvent) {
            return;
        }
        var isMouseEvent = e.browserEvent && e.browserEvent instanceof MouseEvent;
        if (!isMouseEvent) {
            var preserveFocus = (e.browserEvent instanceof KeyboardEvent && typeof e.browserEvent.preserveFocus === 'boolean') ?
                !!e.browserEvent.preserveFocus :
                true;
            this.open(preserveFocus, false, false, e.browserEvent);
        }
    };
    TreeResourceNavigator.prototype.onSelection = function (e, doubleClick) {
        if (doubleClick === void 0) { doubleClick = false; }
        if (!e.browserEvent || e.browserEvent.type === 'contextmenu') {
            return;
        }
        var isKeyboardEvent = e.browserEvent instanceof KeyboardEvent;
        var isMiddleClick = e.browserEvent instanceof MouseEvent ? e.browserEvent.button === 1 : false;
        var isDoubleClick = e.browserEvent.detail === 2;
        var preserveFocus = (e.browserEvent instanceof KeyboardEvent && typeof e.browserEvent.preserveFocus === 'boolean') ?
            !!e.browserEvent.preserveFocus :
            !isDoubleClick;
        if (this.tree.openOnSingleClick || isDoubleClick || isKeyboardEvent) {
            var sideBySide = e.browserEvent instanceof MouseEvent && (e.browserEvent.ctrlKey || e.browserEvent.metaKey || e.browserEvent.altKey);
            this.open(preserveFocus, isDoubleClick || isMiddleClick, sideBySide, e.browserEvent);
        }
    };
    TreeResourceNavigator.prototype.open = function (preserveFocus, pinned, sideBySide, browserEvent) {
        this._onDidOpenResource.fire({
            editorOptions: {
                preserveFocus: preserveFocus,
                pinned: pinned,
                revealIfVisible: true
            },
            sideBySide: sideBySide,
            element: this.tree.getSelection()[0],
            browserEvent: browserEvent
        });
    };
    return TreeResourceNavigator;
}(Disposable));
export { TreeResourceNavigator };
function createKeyboardNavigationEventFilter(container, keybindingService) {
    var inChord = false;
    return function (event) {
        if (inChord) {
            inChord = false;
            return false;
        }
        var result = keybindingService.softDispatch(event, container);
        if (result && result.enterChord) {
            inChord = true;
            return false;
        }
        inChord = false;
        return true;
    };
}
var WorkbenchObjectTree = /** @class */ (function (_super) {
    __extends(WorkbenchObjectTree, _super);
    function WorkbenchObjectTree(user, container, delegate, renderers, options, contextKeyService, listService, themeService, configurationService, keybindingService, accessibilityService) {
        var _this = this;
        var _a = workbenchTreeDataPreamble(container, options, contextKeyService, configurationService, keybindingService, accessibilityService), treeOptions = _a.options, getAutomaticKeyboardNavigation = _a.getAutomaticKeyboardNavigation, disposable = _a.disposable;
        _this = _super.call(this, user, container, delegate, renderers, treeOptions) || this;
        _this.disposables.add(disposable);
        _this.internals = new WorkbenchTreeInternals(_this, treeOptions, getAutomaticKeyboardNavigation, options.overrideStyles, contextKeyService, listService, themeService, configurationService, accessibilityService);
        _this.disposables.add(_this.internals);
        return _this;
    }
    Object.defineProperty(WorkbenchObjectTree.prototype, "contextKeyService", {
        get: function () { return this.internals.contextKeyService; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkbenchObjectTree.prototype, "useAltAsMultipleSelectionModifier", {
        get: function () { return this.internals.useAltAsMultipleSelectionModifier; },
        enumerable: true,
        configurable: true
    });
    WorkbenchObjectTree = __decorate([
        __param(5, IContextKeyService),
        __param(6, IListService),
        __param(7, IThemeService),
        __param(8, IConfigurationService),
        __param(9, IKeybindingService),
        __param(10, IAccessibilityService)
    ], WorkbenchObjectTree);
    return WorkbenchObjectTree;
}(ObjectTree));
export { WorkbenchObjectTree };
var WorkbenchCompressibleObjectTree = /** @class */ (function (_super) {
    __extends(WorkbenchCompressibleObjectTree, _super);
    function WorkbenchCompressibleObjectTree(user, container, delegate, renderers, options, contextKeyService, listService, themeService, configurationService, keybindingService, accessibilityService) {
        var _this = this;
        var _a = workbenchTreeDataPreamble(container, options, contextKeyService, configurationService, keybindingService, accessibilityService), treeOptions = _a.options, getAutomaticKeyboardNavigation = _a.getAutomaticKeyboardNavigation, disposable = _a.disposable;
        _this = _super.call(this, user, container, delegate, renderers, treeOptions) || this;
        _this.disposables.add(disposable);
        _this.internals = new WorkbenchTreeInternals(_this, treeOptions, getAutomaticKeyboardNavigation, options.overrideStyles, contextKeyService, listService, themeService, configurationService, accessibilityService);
        _this.disposables.add(_this.internals);
        return _this;
    }
    Object.defineProperty(WorkbenchCompressibleObjectTree.prototype, "contextKeyService", {
        get: function () { return this.internals.contextKeyService; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkbenchCompressibleObjectTree.prototype, "useAltAsMultipleSelectionModifier", {
        get: function () { return this.internals.useAltAsMultipleSelectionModifier; },
        enumerable: true,
        configurable: true
    });
    WorkbenchCompressibleObjectTree = __decorate([
        __param(5, IContextKeyService),
        __param(6, IListService),
        __param(7, IThemeService),
        __param(8, IConfigurationService),
        __param(9, IKeybindingService),
        __param(10, IAccessibilityService)
    ], WorkbenchCompressibleObjectTree);
    return WorkbenchCompressibleObjectTree;
}(CompressibleObjectTree));
export { WorkbenchCompressibleObjectTree };
var WorkbenchDataTree = /** @class */ (function (_super) {
    __extends(WorkbenchDataTree, _super);
    function WorkbenchDataTree(user, container, delegate, renderers, dataSource, options, contextKeyService, listService, themeService, configurationService, keybindingService, accessibilityService) {
        var _this = this;
        var _a = workbenchTreeDataPreamble(container, options, contextKeyService, configurationService, keybindingService, accessibilityService), treeOptions = _a.options, getAutomaticKeyboardNavigation = _a.getAutomaticKeyboardNavigation, disposable = _a.disposable;
        _this = _super.call(this, user, container, delegate, renderers, dataSource, treeOptions) || this;
        _this.disposables.add(disposable);
        _this.internals = new WorkbenchTreeInternals(_this, treeOptions, getAutomaticKeyboardNavigation, options.overrideStyles, contextKeyService, listService, themeService, configurationService, accessibilityService);
        _this.disposables.add(_this.internals);
        return _this;
    }
    Object.defineProperty(WorkbenchDataTree.prototype, "contextKeyService", {
        get: function () { return this.internals.contextKeyService; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkbenchDataTree.prototype, "useAltAsMultipleSelectionModifier", {
        get: function () { return this.internals.useAltAsMultipleSelectionModifier; },
        enumerable: true,
        configurable: true
    });
    WorkbenchDataTree.prototype.updateOptions = function (options) {
        if (options === void 0) { options = {}; }
        _super.prototype.updateOptions.call(this, options);
        if (options.overrideStyles) {
            this.internals.updateStyleOverrides(options.overrideStyles);
        }
    };
    WorkbenchDataTree = __decorate([
        __param(6, IContextKeyService),
        __param(7, IListService),
        __param(8, IThemeService),
        __param(9, IConfigurationService),
        __param(10, IKeybindingService),
        __param(11, IAccessibilityService)
    ], WorkbenchDataTree);
    return WorkbenchDataTree;
}(DataTree));
export { WorkbenchDataTree };
var WorkbenchAsyncDataTree = /** @class */ (function (_super) {
    __extends(WorkbenchAsyncDataTree, _super);
    function WorkbenchAsyncDataTree(user, container, delegate, renderers, dataSource, options, contextKeyService, listService, themeService, configurationService, keybindingService, accessibilityService) {
        var _this = this;
        var _a = workbenchTreeDataPreamble(container, options, contextKeyService, configurationService, keybindingService, accessibilityService), treeOptions = _a.options, getAutomaticKeyboardNavigation = _a.getAutomaticKeyboardNavigation, disposable = _a.disposable;
        _this = _super.call(this, user, container, delegate, renderers, dataSource, treeOptions) || this;
        _this.disposables.add(disposable);
        _this.internals = new WorkbenchTreeInternals(_this, treeOptions, getAutomaticKeyboardNavigation, options.overrideStyles, contextKeyService, listService, themeService, configurationService, accessibilityService);
        _this.disposables.add(_this.internals);
        return _this;
    }
    Object.defineProperty(WorkbenchAsyncDataTree.prototype, "contextKeyService", {
        get: function () { return this.internals.contextKeyService; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkbenchAsyncDataTree.prototype, "useAltAsMultipleSelectionModifier", {
        get: function () { return this.internals.useAltAsMultipleSelectionModifier; },
        enumerable: true,
        configurable: true
    });
    WorkbenchAsyncDataTree.prototype.updateOptions = function (options) {
        if (options === void 0) { options = {}; }
        _super.prototype.updateOptions.call(this, options);
        if (options.overrideStyles) {
            this.internals.updateStyleOverrides(options.overrideStyles);
        }
    };
    WorkbenchAsyncDataTree = __decorate([
        __param(6, IContextKeyService),
        __param(7, IListService),
        __param(8, IThemeService),
        __param(9, IConfigurationService),
        __param(10, IKeybindingService),
        __param(11, IAccessibilityService)
    ], WorkbenchAsyncDataTree);
    return WorkbenchAsyncDataTree;
}(AsyncDataTree));
export { WorkbenchAsyncDataTree };
var WorkbenchCompressibleAsyncDataTree = /** @class */ (function (_super) {
    __extends(WorkbenchCompressibleAsyncDataTree, _super);
    function WorkbenchCompressibleAsyncDataTree(user, container, virtualDelegate, compressionDelegate, renderers, dataSource, options, contextKeyService, listService, themeService, configurationService, keybindingService, accessibilityService) {
        var _this = this;
        var _a = workbenchTreeDataPreamble(container, options, contextKeyService, configurationService, keybindingService, accessibilityService), treeOptions = _a.options, getAutomaticKeyboardNavigation = _a.getAutomaticKeyboardNavigation, disposable = _a.disposable;
        _this = _super.call(this, user, container, virtualDelegate, compressionDelegate, renderers, dataSource, treeOptions) || this;
        _this.disposables.add(disposable);
        _this.internals = new WorkbenchTreeInternals(_this, treeOptions, getAutomaticKeyboardNavigation, options.overrideStyles, contextKeyService, listService, themeService, configurationService, accessibilityService);
        _this.disposables.add(_this.internals);
        return _this;
    }
    Object.defineProperty(WorkbenchCompressibleAsyncDataTree.prototype, "contextKeyService", {
        get: function () { return this.internals.contextKeyService; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkbenchCompressibleAsyncDataTree.prototype, "useAltAsMultipleSelectionModifier", {
        get: function () { return this.internals.useAltAsMultipleSelectionModifier; },
        enumerable: true,
        configurable: true
    });
    WorkbenchCompressibleAsyncDataTree = __decorate([
        __param(7, IContextKeyService),
        __param(8, IListService),
        __param(9, IThemeService),
        __param(10, IConfigurationService),
        __param(11, IKeybindingService),
        __param(12, IAccessibilityService)
    ], WorkbenchCompressibleAsyncDataTree);
    return WorkbenchCompressibleAsyncDataTree;
}(CompressibleAsyncDataTree));
export { WorkbenchCompressibleAsyncDataTree };
function workbenchTreeDataPreamble(container, options, contextKeyService, configurationService, keybindingService, accessibilityService) {
    WorkbenchListSupportsKeyboardNavigation.bindTo(contextKeyService);
    if (!didBindWorkbenchListAutomaticKeyboardNavigation) {
        WorkbenchListAutomaticKeyboardNavigation.bindTo(contextKeyService);
        didBindWorkbenchListAutomaticKeyboardNavigation = true;
    }
    var getAutomaticKeyboardNavigation = function () {
        // give priority to the context key value to disable this completely
        var automaticKeyboardNavigation = contextKeyService.getContextKeyValue(WorkbenchListAutomaticKeyboardNavigationKey);
        if (automaticKeyboardNavigation) {
            automaticKeyboardNavigation = configurationService.getValue(automaticKeyboardNavigationSettingKey);
        }
        return automaticKeyboardNavigation;
    };
    var accessibilityOn = accessibilityService.isScreenReaderOptimized();
    var keyboardNavigation = accessibilityOn ? 'simple' : configurationService.getValue(keyboardNavigationSettingKey);
    var horizontalScrolling = typeof options.horizontalScrolling !== 'undefined' ? options.horizontalScrolling : getHorizontalScrollingSetting(configurationService);
    var openOnSingleClick = useSingleClickToOpen(configurationService);
    var _a = toWorkbenchListOptions(options, configurationService, keybindingService), workbenchListOptions = _a[0], disposable = _a[1];
    var additionalScrollHeight = options.additionalScrollHeight;
    return {
        getAutomaticKeyboardNavigation: getAutomaticKeyboardNavigation,
        disposable: disposable,
        options: __assign(__assign({ 
            // ...options, // TODO@Joao why is this not splatted here?
            keyboardSupport: false }, workbenchListOptions), { indent: configurationService.getValue(treeIndentKey), renderIndentGuides: configurationService.getValue(treeRenderIndentGuidesKey), automaticKeyboardNavigation: getAutomaticKeyboardNavigation(), simpleKeyboardNavigation: keyboardNavigation === 'simple', filterOnType: keyboardNavigation === 'filter', horizontalScrolling: horizontalScrolling,
            openOnSingleClick: openOnSingleClick, keyboardNavigationEventFilter: createKeyboardNavigationEventFilter(container, keybindingService), additionalScrollHeight: additionalScrollHeight, hideTwistiesOfChildlessElements: options.hideTwistiesOfChildlessElements })
    };
}
var WorkbenchTreeInternals = /** @class */ (function () {
    function WorkbenchTreeInternals(tree, options, getAutomaticKeyboardNavigation, overrideStyles, contextKeyService, listService, themeService, configurationService, accessibilityService) {
        var _this = this;
        this.tree = tree;
        this.themeService = themeService;
        this.disposables = [];
        this.contextKeyService = createScopedContextKeyService(contextKeyService, tree);
        var listSupportsMultiSelect = WorkbenchListSupportsMultiSelectContextKey.bindTo(this.contextKeyService);
        listSupportsMultiSelect.set(!(options.multipleSelectionSupport === false));
        this.hasSelectionOrFocus = WorkbenchListHasSelectionOrFocus.bindTo(this.contextKeyService);
        this.hasDoubleSelection = WorkbenchListDoubleSelection.bindTo(this.contextKeyService);
        this.hasMultiSelection = WorkbenchListMultiSelection.bindTo(this.contextKeyService);
        this._useAltAsMultipleSelectionModifier = useAltAsMultipleSelectionModifier(configurationService);
        var interestingContextKeys = new Set();
        interestingContextKeys.add(WorkbenchListAutomaticKeyboardNavigationKey);
        var updateKeyboardNavigation = function () {
            var accessibilityOn = accessibilityService.isScreenReaderOptimized();
            var keyboardNavigation = accessibilityOn ? 'simple' : configurationService.getValue(keyboardNavigationSettingKey);
            tree.updateOptions({
                simpleKeyboardNavigation: keyboardNavigation === 'simple',
                filterOnType: keyboardNavigation === 'filter'
            });
        };
        this.updateStyleOverrides(overrideStyles);
        this.disposables.push(this.contextKeyService, listService.register(tree), tree.onDidChangeSelection(function () {
            var selection = tree.getSelection();
            var focus = tree.getFocus();
            _this.hasSelectionOrFocus.set(selection.length > 0 || focus.length > 0);
            _this.hasMultiSelection.set(selection.length > 1);
            _this.hasDoubleSelection.set(selection.length === 2);
        }), tree.onDidChangeFocus(function () {
            var selection = tree.getSelection();
            var focus = tree.getFocus();
            _this.hasSelectionOrFocus.set(selection.length > 0 || focus.length > 0);
        }), configurationService.onDidChangeConfiguration(function (e) {
            if (e.affectsConfiguration(openModeSettingKey)) {
                tree.updateOptions({ openOnSingleClick: useSingleClickToOpen(configurationService) });
            }
            if (e.affectsConfiguration(multiSelectModifierSettingKey)) {
                _this._useAltAsMultipleSelectionModifier = useAltAsMultipleSelectionModifier(configurationService);
            }
            if (e.affectsConfiguration(treeIndentKey)) {
                var indent = configurationService.getValue(treeIndentKey);
                tree.updateOptions({ indent: indent });
            }
            if (e.affectsConfiguration(treeRenderIndentGuidesKey)) {
                var renderIndentGuides = configurationService.getValue(treeRenderIndentGuidesKey);
                tree.updateOptions({ renderIndentGuides: renderIndentGuides });
            }
            if (e.affectsConfiguration(keyboardNavigationSettingKey)) {
                updateKeyboardNavigation();
            }
            if (e.affectsConfiguration(automaticKeyboardNavigationSettingKey)) {
                tree.updateOptions({ automaticKeyboardNavigation: getAutomaticKeyboardNavigation() });
            }
        }), this.contextKeyService.onDidChangeContext(function (e) {
            if (e.affectsSome(interestingContextKeys)) {
                tree.updateOptions({ automaticKeyboardNavigation: getAutomaticKeyboardNavigation() });
            }
        }), accessibilityService.onDidChangeScreenReaderOptimized(function () { return updateKeyboardNavigation(); }));
    }
    Object.defineProperty(WorkbenchTreeInternals.prototype, "useAltAsMultipleSelectionModifier", {
        get: function () {
            return this._useAltAsMultipleSelectionModifier;
        },
        enumerable: true,
        configurable: true
    });
    WorkbenchTreeInternals.prototype.updateStyleOverrides = function (overrideStyles) {
        dispose(this.styler);
        this.styler = overrideStyles ? attachListStyler(this.tree, this.themeService, overrideStyles) : Disposable.None;
    };
    WorkbenchTreeInternals.prototype.dispose = function () {
        this.disposables = dispose(this.disposables);
        this.styler = dispose(this.styler);
    };
    WorkbenchTreeInternals = __decorate([
        __param(4, IContextKeyService),
        __param(5, IListService),
        __param(6, IThemeService),
        __param(7, IConfigurationService),
        __param(8, IAccessibilityService)
    ], WorkbenchTreeInternals);
    return WorkbenchTreeInternals;
}());
var configurationRegistry = Registry.as(ConfigurationExtensions.Configuration);
configurationRegistry.registerConfiguration({
    'id': 'workbench',
    'order': 7,
    'title': localize('workbenchConfigurationTitle', "Workbench"),
    'type': 'object',
    'properties': (_a = {},
        _a[multiSelectModifierSettingKey] = {
            'type': 'string',
            'enum': ['ctrlCmd', 'alt'],
            'enumDescriptions': [
                localize('multiSelectModifier.ctrlCmd', "Maps to `Control` on Windows and Linux and to `Command` on macOS."),
                localize('multiSelectModifier.alt', "Maps to `Alt` on Windows and Linux and to `Option` on macOS.")
            ],
            'default': 'ctrlCmd',
            'description': localize({
                key: 'multiSelectModifier',
                comment: [
                    '- `ctrlCmd` refers to a value the setting can take and should not be localized.',
                    '- `Control` and `Command` refer to the modifier keys Ctrl or Cmd on the keyboard and can be localized.'
                ]
            }, "The modifier to be used to add an item in trees and lists to a multi-selection with the mouse (for example in the explorer, open editors and scm view). The 'Open to Side' mouse gestures - if supported - will adapt such that they do not conflict with the multiselect modifier.")
        },
        _a[openModeSettingKey] = {
            'type': 'string',
            'enum': ['singleClick', 'doubleClick'],
            'default': 'singleClick',
            'description': localize({
                key: 'openModeModifier',
                comment: ['`singleClick` and `doubleClick` refers to a value the setting can take and should not be localized.']
            }, "Controls how to open items in trees and lists using the mouse (if supported). For parents with children in trees, this setting will control if a single click expands the parent or a double click. Note that some trees and lists might choose to ignore this setting if it is not applicable. ")
        },
        _a[horizontalScrollingKey] = {
            'type': 'boolean',
            'default': false,
            'description': localize('horizontalScrolling setting', "Controls whether lists and trees support horizontal scrolling in the workbench.")
        },
        _a['workbench.tree.horizontalScrolling'] = {
            'type': 'boolean',
            'default': false,
            'description': localize('tree horizontalScrolling setting', "Controls whether trees support horizontal scrolling in the workbench."),
            'deprecationMessage': localize('deprecated', "This setting is deprecated, please use '{0}' instead.", horizontalScrollingKey)
        },
        _a[treeIndentKey] = {
            'type': 'number',
            'default': 8,
            minimum: 0,
            maximum: 40,
            'description': localize('tree indent setting', "Controls tree indentation in pixels.")
        },
        _a[treeRenderIndentGuidesKey] = {
            type: 'string',
            enum: ['none', 'onHover', 'always'],
            default: 'onHover',
            description: localize('render tree indent guides', "Controls whether the tree should render indent guides.")
        },
        _a[keyboardNavigationSettingKey] = {
            'type': 'string',
            'enum': ['simple', 'highlight', 'filter'],
            'enumDescriptions': [
                localize('keyboardNavigationSettingKey.simple', "Simple keyboard navigation focuses elements which match the keyboard input. Matching is done only on prefixes."),
                localize('keyboardNavigationSettingKey.highlight', "Highlight keyboard navigation highlights elements which match the keyboard input. Further up and down navigation will traverse only the highlighted elements."),
                localize('keyboardNavigationSettingKey.filter', "Filter keyboard navigation will filter out and hide all the elements which do not match the keyboard input.")
            ],
            'default': 'highlight',
            'description': localize('keyboardNavigationSettingKey', "Controls the keyboard navigation style for lists and trees in the workbench. Can be simple, highlight and filter.")
        },
        _a[automaticKeyboardNavigationSettingKey] = {
            'type': 'boolean',
            'default': true,
            markdownDescription: localize('automatic keyboard navigation setting', "Controls whether keyboard navigation in lists and trees is automatically triggered simply by typing. If set to `false`, keyboard navigation is only triggered when executing the `list.toggleKeyboardNavigation` command, for which you can assign a keyboard shortcut.")
        },
        _a)
});
