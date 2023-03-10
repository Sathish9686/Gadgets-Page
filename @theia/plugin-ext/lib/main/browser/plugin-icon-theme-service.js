"use strict";
/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// some code is copied and modified from:
// https://github.com/microsoft/vscode/blob/7cf4cca47aa025a590fc939af54932042302be63/src/vs/workbench/services/themes/browser/fileIconThemeData.ts
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginIconThemeService = exports.PluginIconTheme = exports.PluginIconThemeDefinition = exports.PluginIconThemeFactory = void 0;
var debounce = require("lodash.debounce");
var jsoncparser = require("jsonc-parser");
var inversify_1 = require("inversify");
var icon_theme_service_1 = require("@theia/core/lib/browser/icon-theme-service");
var plugin_protocol_1 = require("../../common/plugin-protocol");
var uri_1 = require("@theia/core/lib/common/uri");
var disposable_1 = require("@theia/core/lib/common/disposable");
var event_1 = require("@theia/core/lib/common/event");
var label_provider_1 = require("@theia/core/lib/browser/label-provider");
var browser_1 = require("@theia/filesystem/lib/browser");
var navigator_tree_1 = require("@theia/navigator/lib/browser/navigator-tree");
var endpoint_1 = require("@theia/core/lib/browser/endpoint");
var file_service_1 = require("@theia/filesystem/lib/browser/file-service");
var files_1 = require("@theia/filesystem/lib/common/files");
exports.PluginIconThemeFactory = Symbol('PluginIconThemeFactory');
var PluginIconThemeDefinition = /** @class */ (function () {
    function PluginIconThemeDefinition() {
    }
    PluginIconThemeDefinition = __decorate([
        inversify_1.injectable()
    ], PluginIconThemeDefinition);
    return PluginIconThemeDefinition;
}());
exports.PluginIconThemeDefinition = PluginIconThemeDefinition;
var PluginIconTheme = /** @class */ (function (_super) {
    __extends(PluginIconTheme, _super);
    function PluginIconTheme() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onDidChangeEmitter = new event_1.Emitter();
        _this.onDidChange = _this.onDidChangeEmitter.event;
        _this.toDeactivate = new disposable_1.DisposableCollection();
        _this.toUnload = new disposable_1.DisposableCollection();
        _this.toDisposeStyleElement = new disposable_1.DisposableCollection();
        _this.toDispose = new disposable_1.DisposableCollection(_this.toDeactivate, _this.toDisposeStyleElement, _this.toUnload, _this.onDidChangeEmitter);
        _this.icons = new Set();
        _this.reload = debounce(function () {
            _this.toUnload.dispose();
            _this.doActivate();
        }, 50);
        _this.fileIcon = 'theia-plugin-file-icon';
        _this.folderIcon = 'theia-plugin-folder-icon';
        _this.folderExpandedIcon = 'theia-plugin-folder-expanded-icon';
        _this.rootFolderIcon = 'theia-plugin-root-folder-icon';
        _this.rootFolderExpandedIcon = 'theia-plugin-root-folder-expanded-icon';
        return _this;
    }
    PluginIconTheme.prototype.init = function () {
        Object.assign(this, this.definition);
        this.packageRootUri = new uri_1.default(this.packageUri);
        this.locationUri = new uri_1.default(this.uri).parent;
    };
    PluginIconTheme.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    PluginIconTheme.prototype.fireDidChange = function () {
        this.onDidChangeEmitter.fire({ affects: function () { return true; } });
    };
    PluginIconTheme.prototype.activate = function () {
        var _this = this;
        if (!this.toDeactivate.disposed) {
            return this.toDeactivate;
        }
        this.toDeactivate.push(disposable_1.Disposable.create(function () { return _this.fireDidChange(); }));
        this.doActivate();
        return this.toDeactivate;
    };
    PluginIconTheme.prototype.doActivate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.load()];
                    case 1:
                        _a.sent();
                        this.updateStyleElement();
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginIconTheme.prototype.updateStyleElement = function () {
        this.toDisposeStyleElement.dispose();
        if (this.toDeactivate.disposed || !this.styleSheetContent) {
            return;
        }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.className = 'theia-icon-theme';
        styleElement.innerText = this.styleSheetContent;
        document.head.appendChild(styleElement);
        var toRemoveStyleElement = disposable_1.Disposable.create(function () { return styleElement.remove(); });
        this.toDisposeStyleElement.push(toRemoveStyleElement);
        this.toDeactivate.push(toRemoveStyleElement);
        this.fireDidChange();
    };
    /**
     * This should be aligned with
     * https://github.com/microsoft/vscode/blob/7cf4cca47aa025a590fc939af54932042302be63/src/vs/workbench/services/themes/browser/fileIconThemeData.ts#L201
     */
    PluginIconTheme.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uri, result, content, json, toUnwatch, iconDefinitions, definitionSelectors, acceptSelector, fonts, fonts_1, fonts_1_1, font, src, _a, _b, srcLocation, cssUrl, firstFont, _c, _d, definitionId, iconDefinition, selectors, cssUrl, body;
            var e_1, _e, e_2, _f, e_3, _g;
            var _this = this;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        if (this.styleSheetContent !== undefined) {
                            return [2 /*return*/];
                        }
                        this.styleSheetContent = '';
                        this.toUnload.push(disposable_1.Disposable.create(function () {
                            _this.styleSheetContent = undefined;
                            _this.hasFileIcons = undefined;
                            _this.hasFolderIcons = undefined;
                            _this.hidesExplorerArrows = undefined;
                            _this.icons.clear();
                        }));
                        uri = new uri_1.default(this.uri);
                        return [4 /*yield*/, this.fileService.read(uri)];
                    case 1:
                        result = _h.sent();
                        content = result.value;
                        json = jsoncparser.parse(content, undefined, { disallowComments: false });
                        this.hidesExplorerArrows = !!json.hidesExplorerArrows;
                        toUnwatch = this.fileService.watch(uri);
                        if (this.toUnload.disposed) {
                            toUnwatch.dispose();
                        }
                        else {
                            this.toUnload.push(toUnwatch);
                            this.toUnload.push(this.fileService.onDidFilesChange(function (e) {
                                if (e.contains(uri, 1 /* ADDED */) || e.contains(uri, 0 /* UPDATED */)) {
                                    _this.reload();
                                }
                            }));
                        }
                        iconDefinitions = json.iconDefinitions;
                        if (!iconDefinitions) {
                            return [2 /*return*/];
                        }
                        definitionSelectors = new Map();
                        acceptSelector = function (themeType, definitionId) {
                            var e_4, _a;
                            var icons = [];
                            for (var _i = 2; _i < arguments.length; _i++) {
                                icons[_i - 2] = arguments[_i];
                            }
                            if (!iconDefinitions[definitionId]) {
                                return;
                            }
                            var selector = '';
                            try {
                                for (var icons_1 = __values(icons), icons_1_1 = icons_1.next(); !icons_1_1.done; icons_1_1 = icons_1.next()) {
                                    var icon = icons_1_1.value;
                                    if (icon) {
                                        selector += '.' + icon;
                                        _this.icons.add(icon);
                                    }
                                }
                            }
                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                            finally {
                                try {
                                    if (icons_1_1 && !icons_1_1.done && (_a = icons_1.return)) _a.call(icons_1);
                                }
                                finally { if (e_4) throw e_4.error; }
                            }
                            if (!selector) {
                                return;
                            }
                            var selectors = definitionSelectors.get(definitionId) || [];
                            if (themeType !== 'dark') {
                                selector = '.theia-' + themeType + ' ' + selector;
                            }
                            selectors.push(selector);
                            selectors.push(selector + '::before');
                            definitionSelectors.set(definitionId, selectors);
                        };
                        this.collectSelectors(json, acceptSelector.bind(undefined, 'dark'));
                        if (json.light) {
                            this.collectSelectors(json.light, acceptSelector.bind(undefined, 'light'));
                        }
                        if (json.highContrast) {
                            this.collectSelectors(json.highContrast, acceptSelector.bind(undefined, 'hc'));
                        }
                        if (!this.icons.size) {
                            return [2 /*return*/];
                        }
                        fonts = json.fonts;
                        if (Array.isArray(fonts)) {
                            try {
                                for (fonts_1 = __values(fonts), fonts_1_1 = fonts_1.next(); !fonts_1_1.done; fonts_1_1 = fonts_1.next()) {
                                    font = fonts_1_1.value;
                                    if (font) {
                                        src = '';
                                        if (Array.isArray(font.src)) {
                                            try {
                                                for (_a = (e_2 = void 0, __values(font.src)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                                    srcLocation = _b.value;
                                                    if (srcLocation && srcLocation.path) {
                                                        cssUrl = this.toCSSUrl(srcLocation.path);
                                                        if (cssUrl) {
                                                            if (src) {
                                                                src += ', ';
                                                            }
                                                            src += cssUrl + " format('" + srcLocation.format + "')";
                                                        }
                                                    }
                                                }
                                            }
                                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                            finally {
                                                try {
                                                    if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                                                }
                                                finally { if (e_2) throw e_2.error; }
                                            }
                                        }
                                        if (src) {
                                            this.styleSheetContent += "@font-face {\n    src: " + src + ";\n    font-family: '" + font.id + "';\n    font-weight: " + font.weight + ";\n    font-style: " + font.style + ";\n}\n";
                                        }
                                    }
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (fonts_1_1 && !fonts_1_1.done && (_e = fonts_1.return)) _e.call(fonts_1);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            firstFont = fonts[0];
                            if (firstFont && firstFont.id) {
                                this.styleSheetContent += "." + this.fileIcon + "::before, ." + this.folderIcon + "::before, ." + this.rootFolderIcon + "::before {\n    font-family: '" + firstFont.id + "';\n    font-size: " + (firstFont.size || '150%') + ";\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    vertical-align: top;\n}\n";
                            }
                        }
                        try {
                            for (_c = __values(definitionSelectors.keys()), _d = _c.next(); !_d.done; _d = _c.next()) {
                                definitionId = _d.value;
                                iconDefinition = iconDefinitions[definitionId];
                                selectors = definitionSelectors.get(definitionId);
                                if (selectors && iconDefinition) {
                                    cssUrl = this.toCSSUrl(iconDefinition.iconPath);
                                    if (cssUrl) {
                                        this.styleSheetContent += selectors.join(', ') + " {\n    content: ' ';\n    background-image: " + cssUrl + ";\n    background-size: 16px;\n    background-position: left center;\n    background-repeat: no-repeat;\n}\n";
                                    }
                                    if (iconDefinition.fontCharacter || iconDefinition.fontColor) {
                                        body = '';
                                        if (iconDefinition.fontColor) {
                                            body += " color: " + iconDefinition.fontColor + ";";
                                        }
                                        if (iconDefinition.fontCharacter) {
                                            body += " content: '" + iconDefinition.fontCharacter + "';";
                                        }
                                        if (iconDefinition.fontSize) {
                                            body += " font-size: " + iconDefinition.fontSize + ";";
                                        }
                                        if (iconDefinition.fontId) {
                                            body += " font-family: " + iconDefinition.fontId + ";";
                                        }
                                        this.styleSheetContent += selectors.join(', ') + " {" + body + " }\n";
                                    }
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_g = _c.return)) _g.call(_c);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginIconTheme.prototype.toCSSUrl = function (iconPath) {
        if (!iconPath) {
            return undefined;
        }
        var iconUri = this.locationUri.resolve(iconPath);
        var relativePath = this.packageRootUri.path.relative(iconUri.path.normalize());
        return relativePath && "url('" + new endpoint_1.Endpoint({
            path: "hostedPlugin/" + this.pluginId + "/" + encodeURIComponent(relativePath.normalize().toString())
        }).getRestUrl().toString() + "')";
    };
    PluginIconTheme.prototype.escapeCSS = function (value) {
        value = value.replace(/[^\-a-zA-Z0-9]/g, '-');
        if (value.charAt(0).match(/[0-9\-]/)) {
            value = '-' + value;
        }
        return value;
    };
    PluginIconTheme.prototype.folderNameIcon = function (folderName) {
        return 'theia-plugin-' + this.escapeCSS(folderName.toLowerCase()) + '-folder-name-icon';
    };
    PluginIconTheme.prototype.expandedFolderNameIcon = function (folderName) {
        return 'theia-plugin-' + this.escapeCSS(folderName.toLowerCase()) + '-expanded-folder-name-icon';
    };
    PluginIconTheme.prototype.fileNameIcon = function (fileName) {
        fileName = fileName.toLowerCase();
        var extIndex = fileName.indexOf('.');
        var icons = extIndex !== -1 ? this.fileExtensionIcon(fileName.substr(extIndex + 1)) : [];
        icons.unshift('theia-plugin-' + this.escapeCSS(fileName) + '-file-name-icon');
        return icons;
    };
    PluginIconTheme.prototype.fileExtensionIcon = function (fileExtension) {
        fileExtension = fileExtension.toString();
        var icons = [];
        var segments = fileExtension.split('.');
        if (segments.length) {
            if (segments.length) {
                for (var i = 0; i < segments.length; i++) {
                    icons.push('theia-plugin-' + this.escapeCSS(segments.slice(i).join('.')) + '-ext-file-icon');
                }
                icons.push('theia-plugin-ext-file-icon'); // extra segment to increase file-ext score
            }
        }
        return icons;
    };
    PluginIconTheme.prototype.languageIcon = function (languageId) {
        return 'theia-plugin-' + this.escapeCSS(languageId) + '-lang-file-icon';
    };
    PluginIconTheme.prototype.collectSelectors = function (associations, accept) {
        if (associations.folder) {
            accept(associations.folder, this.folderIcon);
            this.hasFolderIcons = true;
        }
        if (associations.folderExpanded) {
            accept(associations.folderExpanded, this.folderExpandedIcon);
            this.hasFolderIcons = true;
        }
        var rootFolder = associations.rootFolder || associations.folder;
        if (rootFolder) {
            accept(rootFolder, this.rootFolderIcon);
            this.hasFolderIcons = true;
        }
        var rootFolderExpanded = associations.rootFolderExpanded || associations.folderExpanded;
        if (rootFolderExpanded) {
            accept(rootFolderExpanded, this.rootFolderExpandedIcon);
            this.hasFolderIcons = true;
        }
        if (associations.file) {
            accept(associations.file, this.fileIcon);
            this.hasFileIcons = true;
        }
        var folderNames = associations.folderNames;
        if (folderNames) {
            // eslint-disable-next-line guard-for-in
            for (var folderName in folderNames) {
                accept(folderNames[folderName], this.folderNameIcon(folderName), this.folderIcon);
                this.hasFolderIcons = true;
            }
        }
        var folderNamesExpanded = associations.folderNamesExpanded;
        if (folderNamesExpanded) {
            // eslint-disable-next-line guard-for-in
            for (var folderName in folderNamesExpanded) {
                accept(folderNamesExpanded[folderName], this.expandedFolderNameIcon(folderName), this.folderExpandedIcon);
                this.hasFolderIcons = true;
            }
        }
        var languageIds = associations.languageIds;
        if (languageIds) {
            if (!languageIds.jsonc && languageIds.json) {
                languageIds.jsonc = languageIds.json;
            }
            // eslint-disable-next-line guard-for-in
            for (var languageId in languageIds) {
                accept(languageIds[languageId], this.languageIcon(languageId), this.fileIcon);
                this.hasFileIcons = true;
            }
        }
        var fileExtensions = associations.fileExtensions;
        if (fileExtensions) {
            // eslint-disable-next-line guard-for-in
            for (var fileExtension in fileExtensions) {
                accept.apply(void 0, __spread([fileExtensions[fileExtension]], this.fileExtensionIcon(fileExtension), [this.fileIcon]));
                this.hasFileIcons = true;
            }
        }
        var fileNames = associations.fileNames;
        if (fileNames) {
            // eslint-disable-next-line guard-for-in
            for (var fileName in fileNames) {
                accept.apply(void 0, __spread([fileNames[fileName]], this.fileNameIcon(fileName), [this.fileIcon]));
                this.hasFileIcons = true;
            }
        }
    };
    /**
     * This should be aligned with
     * https://github.com/microsoft/vscode/blob/7cf4cca47aa025a590fc939af54932042302be63/src/vs/editor/common/services/getIconClasses.ts#L5
     */
    PluginIconTheme.prototype.getIcon = function (element) {
        var e_5, _a;
        var icon = '';
        try {
            for (var _b = __values(this.getClassNames(element)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var className = _c.value;
                if (this.icons.has(className)) {
                    if (icon) {
                        icon += ' ';
                    }
                    icon += className;
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return icon;
    };
    PluginIconTheme.prototype.getClassNames = function (element) {
        if (navigator_tree_1.WorkspaceRootNode.is(element)) {
            var name_1 = this.labelProvider.getName(element);
            if (element.expanded) {
                return [this.rootFolderExpandedIcon, this.expandedFolderNameIcon(name_1)];
            }
            return [this.rootFolderIcon, this.folderNameIcon(name_1)];
        }
        if (browser_1.DirNode.is(element)) {
            if (element.expanded) {
                var name_2 = this.labelProvider.getName(element);
                return [this.folderExpandedIcon, this.expandedFolderNameIcon(name_2)];
            }
            return this.getFolderClassNames(element);
        }
        if (browser_1.FileStatNode.is(element)) {
            return this.getFileClassNames(element, element.fileStat.resource.toString());
        }
        if (files_1.FileStat.is(element)) {
            if (element.isDirectory) {
                return this.getFolderClassNames(element);
            }
            return this.getFileClassNames(element, element.resource.toString());
        }
        if (label_provider_1.URIIconReference.is(element)) {
            if (element.id === 'folder') {
                return this.getFolderClassNames(element);
            }
            return this.getFileClassNames(element, element.uri && element.uri.toString());
        }
        return this.getFileClassNames(element, element.toString());
    };
    PluginIconTheme.prototype.getFolderClassNames = function (element) {
        var name = this.labelProvider.getName(element);
        return [this.folderIcon, this.folderNameIcon(name)];
    };
    PluginIconTheme.prototype.getFileClassNames = function (element, uri) {
        var name = this.labelProvider.getName(element);
        var classNames = this.fileNameIcon(name);
        if (uri) {
            var language = monaco.services.StaticServices.modeService.get().createByFilepathOrFirstLine(monaco.Uri.parse(uri));
            classNames.push(this.languageIcon(language.languageIdentifier.language));
            classNames.unshift(this.fileIcon);
        }
        return classNames;
    };
    __decorate([
        inversify_1.inject(file_service_1.FileService),
        __metadata("design:type", file_service_1.FileService)
    ], PluginIconTheme.prototype, "fileService", void 0);
    __decorate([
        inversify_1.inject(label_provider_1.LabelProvider),
        __metadata("design:type", label_provider_1.LabelProvider)
    ], PluginIconTheme.prototype, "labelProvider", void 0);
    __decorate([
        inversify_1.inject(PluginIconThemeDefinition),
        __metadata("design:type", PluginIconThemeDefinition)
    ], PluginIconTheme.prototype, "definition", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PluginIconTheme.prototype, "init", null);
    PluginIconTheme = __decorate([
        inversify_1.injectable()
    ], PluginIconTheme);
    return PluginIconTheme;
}(PluginIconThemeDefinition));
exports.PluginIconTheme = PluginIconTheme;
var PluginIconThemeService = /** @class */ (function () {
    function PluginIconThemeService() {
        this.onDidChangeEmitter = new event_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
    }
    PluginIconThemeService.prototype.fireDidChange = function () {
        this.onDidChangeEmitter.fire({ affects: function () { return true; } });
    };
    PluginIconThemeService.prototype.register = function (contribution, plugin) {
        var _this = this;
        var pluginId = plugin_protocol_1.getPluginId(plugin.metadata.model);
        var packageUri = plugin.metadata.model.packageUri;
        var iconTheme = this.iconThemeFactory({
            id: contribution.id,
            label: contribution.label || new uri_1.default(contribution.uri).path.base,
            description: contribution.description,
            uri: contribution.uri,
            uiTheme: contribution.uiTheme,
            pluginId: pluginId,
            packageUri: packageUri
        });
        return new disposable_1.DisposableCollection(iconTheme, iconTheme.onDidChange(function () { return _this.fireDidChange(); }), this.iconThemeService.register(iconTheme));
    };
    PluginIconThemeService.prototype.canHandle = function (element) {
        var current = this.iconThemeService.getDefinition(this.iconThemeService.current);
        if (current instanceof PluginIconTheme && ((element instanceof uri_1.default && element.scheme === 'file') || label_provider_1.URIIconReference.is(element) || files_1.FileStat.is(element) || browser_1.FileStatNode.is(element))) {
            return Number.MAX_SAFE_INTEGER;
        }
        return 0;
    };
    PluginIconThemeService.prototype.getIcon = function (element) {
        var current = this.iconThemeService.getDefinition(this.iconThemeService.current);
        if (current instanceof PluginIconTheme) {
            return current.getIcon(element);
        }
        return undefined;
    };
    __decorate([
        inversify_1.inject(icon_theme_service_1.IconThemeService),
        __metadata("design:type", icon_theme_service_1.IconThemeService)
    ], PluginIconThemeService.prototype, "iconThemeService", void 0);
    __decorate([
        inversify_1.inject(exports.PluginIconThemeFactory),
        __metadata("design:type", Function)
    ], PluginIconThemeService.prototype, "iconThemeFactory", void 0);
    PluginIconThemeService = __decorate([
        inversify_1.injectable()
    ], PluginIconThemeService);
    return PluginIconThemeService;
}());
exports.PluginIconThemeService = PluginIconThemeService;
//# sourceMappingURL=plugin-icon-theme-service.js.map