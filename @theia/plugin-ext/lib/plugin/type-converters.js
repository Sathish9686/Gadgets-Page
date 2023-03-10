"use strict";
/********************************************************************************
 * Copyright (C) 2018 Red Hat, Inc. and others.
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginToPluginInfo = exports.pathOrURIToURI = exports.ThemableDecorationAttachmentRenderOptions = exports.ThemableDecorationRenderOptions = exports.DecorationRangeBehavior = exports.DecorationRenderOptions = exports.quickPickItemToPickOpenItem = exports.fromColorPresentation = exports.toColor = exports.fromColor = exports.fromFoldingRangeKind = exports.fromFoldingRange = exports.fromSelectionRange = exports.toSymbolInformation = exports.fromSymbolInformation = exports.getShellExecutionOptions = exports.getShellArgs = exports.getShellExecution = exports.getProcessExecution = exports.fromShellExecution = exports.fromProcessExecution = exports.toTask = exports.fromTask = exports.toWorkspaceFolder = exports.toCallHierarchyOutgoingCall = exports.toCallHierarchyIncomingCall = exports.toCallHierarchyItem = exports.fromCallHierarchyItem = exports.toLocation = exports.isModelCallHierarchyOutgoingCall = exports.isModelCallHierarchyIncomingCall = exports.isModelCallHierarchyItem = exports.isUriComponents = exports.isModelRange = exports.isModelLocation = exports.toSymbolTag = exports.fromSymbolTag = exports.toDocumentSymbol = exports.fromDocumentSymbol = exports.SymbolKind = exports.fromWorkspaceEdit = exports.SignatureHelp = exports.SignatureInformation = exports.ParameterInformation = exports.fromDocumentHighlight = exports.fromDocumentHighlightKind = exports.DocumentLink = exports.fromDefinitionLink = exports.fromLocation = exports.fromHover = exports.convertDiagnosticToMarkerData = exports.fromTextEdit = exports.toCompletionItemKind = exports.fromCompletionItemKind = exports.fromGlobPattern = exports.fromDocumentSelector = exports.toMarkdown = exports.fromMarkdown = exports.fromManyMarkdown = exports.fromRangeOrRangeWithMessage = exports.isDecorationOptionsArr = exports.toPosition = exports.fromPosition = exports.fromRange = exports.toRange = exports.fromSelection = exports.toSelection = exports.toWebviewPanelShowOptions = exports.fromViewColumn = exports.toViewColumn = void 0;
var vscode_languageserver_types_1 = require("vscode-languageserver-types");
var vscode_uri_1 = require("vscode-uri");
var rpc = require("../common/plugin-api-rpc");
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var model = require("../common/plugin-api-rpc-model");
var markdown_string_1 = require("./markdown-string");
var types = require("./types-impl");
var types_impl_1 = require("./types-impl");
var SIDE_GROUP = -2;
var ACTIVE_GROUP = -1;
var BUILD_GROUP = 'build';
var TEST_GROUP = 'test';
function toViewColumn(ep) {
    if (typeof ep !== 'number') {
        return undefined;
    }
    if (ep === plugin_api_rpc_1.EditorPosition.ONE) {
        return types.ViewColumn.One;
    }
    else if (ep === plugin_api_rpc_1.EditorPosition.TWO) {
        return types.ViewColumn.Two;
    }
    else if (ep === plugin_api_rpc_1.EditorPosition.THREE) {
        return types.ViewColumn.Three;
    }
    else if (ep === plugin_api_rpc_1.EditorPosition.FOUR) {
        return types.ViewColumn.Four;
    }
    else if (ep === plugin_api_rpc_1.EditorPosition.FIVE) {
        return types.ViewColumn.Five;
    }
    else if (ep === plugin_api_rpc_1.EditorPosition.SIX) {
        return types.ViewColumn.Six;
    }
    else if (ep === plugin_api_rpc_1.EditorPosition.SEVEN) {
        return types.ViewColumn.Seven;
    }
    else if (ep === plugin_api_rpc_1.EditorPosition.EIGHT) {
        return types.ViewColumn.Eight;
    }
    else if (ep === plugin_api_rpc_1.EditorPosition.NINE) {
        return types.ViewColumn.Nine;
    }
    return undefined;
}
exports.toViewColumn = toViewColumn;
function fromViewColumn(column) {
    if (typeof column === 'number' && column >= types.ViewColumn.One) {
        return column - 1;
    }
    if (column === types.ViewColumn.Beside) {
        return SIDE_GROUP;
    }
    return ACTIVE_GROUP;
}
exports.fromViewColumn = fromViewColumn;
function toWebviewPanelShowOptions(options) {
    if (typeof options === 'object') {
        var showOptions = options;
        return {
            area: showOptions.area ? showOptions.area : types.WebviewPanelTargetArea.Main,
            viewColumn: showOptions.viewColumn ? fromViewColumn(showOptions.viewColumn) : undefined,
            preserveFocus: showOptions.preserveFocus ? showOptions.preserveFocus : false
        };
    }
    return {
        area: types.WebviewPanelTargetArea.Main,
        viewColumn: fromViewColumn(options),
        preserveFocus: false
    };
}
exports.toWebviewPanelShowOptions = toWebviewPanelShowOptions;
function toSelection(selection) {
    var selectionStartLineNumber = selection.selectionStartLineNumber, selectionStartColumn = selection.selectionStartColumn, positionLineNumber = selection.positionLineNumber, positionColumn = selection.positionColumn;
    var start = new types.Position(selectionStartLineNumber - 1, selectionStartColumn - 1);
    var end = new types.Position(positionLineNumber - 1, positionColumn - 1);
    return new types.Selection(start, end);
}
exports.toSelection = toSelection;
function fromSelection(selection) {
    var active = selection.active, anchor = selection.anchor;
    return {
        selectionStartLineNumber: anchor.line + 1,
        selectionStartColumn: anchor.character + 1,
        positionLineNumber: active.line + 1,
        positionColumn: active.character + 1
    };
}
exports.fromSelection = fromSelection;
function toRange(range) {
    // if (!range) {
    //     return undefined;
    // }
    var startLineNumber = range.startLineNumber, startColumn = range.startColumn, endLineNumber = range.endLineNumber, endColumn = range.endColumn;
    return new types.Range(startLineNumber - 1, startColumn - 1, endLineNumber - 1, endColumn - 1);
}
exports.toRange = toRange;
function fromRange(range) {
    if (!range) {
        return undefined;
    }
    var start = range.start, end = range.end;
    return {
        startLineNumber: start.line + 1,
        startColumn: start.character + 1,
        endLineNumber: end.line + 1,
        endColumn: end.character + 1
    };
}
exports.fromRange = fromRange;
function fromPosition(position) {
    return { lineNumber: position.line + 1, column: position.character + 1 };
}
exports.fromPosition = fromPosition;
function toPosition(position) {
    return new types.Position(position.lineNumber - 1, position.column - 1);
}
exports.toPosition = toPosition;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDecorationOptions(something) {
    return (typeof something.range !== 'undefined');
}
function isDecorationOptionsArr(something) {
    if (something.length === 0) {
        return true;
    }
    return isDecorationOptions(something[0]) ? true : false;
}
exports.isDecorationOptionsArr = isDecorationOptionsArr;
function fromRangeOrRangeWithMessage(ranges) {
    if (isDecorationOptionsArr(ranges)) {
        return ranges.map(function (r) {
            var hoverMessage;
            if (Array.isArray(r.hoverMessage)) {
                hoverMessage = fromManyMarkdown(r.hoverMessage);
            }
            else if (r.hoverMessage) {
                hoverMessage = fromMarkdown(r.hoverMessage);
            }
            else {
                hoverMessage = undefined;
            }
            return {
                range: fromRange(r.range),
                hoverMessage: hoverMessage,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                renderOptions: r.renderOptions
            };
        });
    }
    else {
        return ranges.map(function (r) {
            return ({
                range: fromRange(r)
            });
        });
    }
}
exports.fromRangeOrRangeWithMessage = fromRangeOrRangeWithMessage;
function fromManyMarkdown(markup) {
    return markup.map(fromMarkdown);
}
exports.fromManyMarkdown = fromManyMarkdown;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCodeblock(thing) {
    return thing && typeof thing === 'object'
        && typeof thing.language === 'string'
        && typeof thing.value === 'string';
}
function fromMarkdown(markup) {
    if (isCodeblock(markup)) {
        var language = markup.language, value = markup.value;
        return { value: '```' + language + '\n' + value + '\n```\n' };
    }
    else if (markdown_string_1.isMarkdownString(markup)) {
        return markup;
    }
    else if (typeof markup === 'string') {
        return { value: markup };
    }
    else {
        return { value: '' };
    }
}
exports.fromMarkdown = fromMarkdown;
function toMarkdown(value) {
    var ret = new markdown_string_1.MarkdownString(value.value);
    ret.isTrusted = value.isTrusted;
    return ret;
}
exports.toMarkdown = toMarkdown;
function fromDocumentSelector(selector) {
    if (!selector) {
        return undefined;
    }
    else if (Array.isArray(selector)) {
        return selector.map(fromDocumentSelector);
    }
    else if (typeof selector === 'string') {
        return selector;
    }
    else {
        return {
            language: selector.language,
            scheme: selector.scheme,
            pattern: fromGlobPattern(selector.pattern)
        };
    }
}
exports.fromDocumentSelector = fromDocumentSelector;
function fromGlobPattern(pattern) {
    if (typeof pattern === 'string') {
        return pattern;
    }
    if (isRelativePattern(pattern)) {
        return new types.RelativePattern(pattern.base, pattern.pattern);
    }
    return pattern;
}
exports.fromGlobPattern = fromGlobPattern;
function isRelativePattern(obj) {
    var rp = obj;
    return rp && typeof rp.base === 'string' && typeof rp.pattern === 'string';
}
function fromCompletionItemKind(kind) {
    switch (kind) {
        case types.CompletionItemKind.Method: return model.CompletionItemKind.Method;
        case types.CompletionItemKind.Function: return model.CompletionItemKind.Function;
        case types.CompletionItemKind.Constructor: return model.CompletionItemKind.Constructor;
        case types.CompletionItemKind.Field: return model.CompletionItemKind.Field;
        case types.CompletionItemKind.Variable: return model.CompletionItemKind.Variable;
        case types.CompletionItemKind.Class: return model.CompletionItemKind.Class;
        case types.CompletionItemKind.Interface: return model.CompletionItemKind.Interface;
        case types.CompletionItemKind.Struct: return model.CompletionItemKind.Struct;
        case types.CompletionItemKind.Module: return model.CompletionItemKind.Module;
        case types.CompletionItemKind.Property: return model.CompletionItemKind.Property;
        case types.CompletionItemKind.Unit: return model.CompletionItemKind.Unit;
        case types.CompletionItemKind.Value: return model.CompletionItemKind.Value;
        case types.CompletionItemKind.Constant: return model.CompletionItemKind.Constant;
        case types.CompletionItemKind.Enum: return model.CompletionItemKind.Enum;
        case types.CompletionItemKind.EnumMember: return model.CompletionItemKind.EnumMember;
        case types.CompletionItemKind.Keyword: return model.CompletionItemKind.Keyword;
        case types.CompletionItemKind.Snippet: return model.CompletionItemKind.Snippet;
        case types.CompletionItemKind.Text: return model.CompletionItemKind.Text;
        case types.CompletionItemKind.Color: return model.CompletionItemKind.Color;
        case types.CompletionItemKind.File: return model.CompletionItemKind.File;
        case types.CompletionItemKind.Reference: return model.CompletionItemKind.Reference;
        case types.CompletionItemKind.Folder: return model.CompletionItemKind.Folder;
        case types.CompletionItemKind.Event: return model.CompletionItemKind.Event;
        case types.CompletionItemKind.Operator: return model.CompletionItemKind.Operator;
        case types.CompletionItemKind.TypeParameter: return model.CompletionItemKind.TypeParameter;
    }
    return model.CompletionItemKind.Property;
}
exports.fromCompletionItemKind = fromCompletionItemKind;
function toCompletionItemKind(kind) {
    switch (kind) {
        case model.CompletionItemKind.Method: return types.CompletionItemKind.Method;
        case model.CompletionItemKind.Function: return types.CompletionItemKind.Function;
        case model.CompletionItemKind.Constructor: return types.CompletionItemKind.Constructor;
        case model.CompletionItemKind.Field: return types.CompletionItemKind.Field;
        case model.CompletionItemKind.Variable: return types.CompletionItemKind.Variable;
        case model.CompletionItemKind.Class: return types.CompletionItemKind.Class;
        case model.CompletionItemKind.Interface: return types.CompletionItemKind.Interface;
        case model.CompletionItemKind.Struct: return types.CompletionItemKind.Struct;
        case model.CompletionItemKind.Module: return types.CompletionItemKind.Module;
        case model.CompletionItemKind.Property: return types.CompletionItemKind.Property;
        case model.CompletionItemKind.Unit: return types.CompletionItemKind.Unit;
        case model.CompletionItemKind.Value: return types.CompletionItemKind.Value;
        case model.CompletionItemKind.Constant: return types.CompletionItemKind.Constant;
        case model.CompletionItemKind.Enum: return types.CompletionItemKind.Enum;
        case model.CompletionItemKind.EnumMember: return types.CompletionItemKind.EnumMember;
        case model.CompletionItemKind.Keyword: return types.CompletionItemKind.Keyword;
        case model.CompletionItemKind.Snippet: return types.CompletionItemKind.Snippet;
        case model.CompletionItemKind.Text: return types.CompletionItemKind.Text;
        case model.CompletionItemKind.Color: return types.CompletionItemKind.Color;
        case model.CompletionItemKind.File: return types.CompletionItemKind.File;
        case model.CompletionItemKind.Reference: return types.CompletionItemKind.Reference;
        case model.CompletionItemKind.Folder: return types.CompletionItemKind.Folder;
        case model.CompletionItemKind.Event: return types.CompletionItemKind.Event;
        case model.CompletionItemKind.Operator: return types.CompletionItemKind.Operator;
        case model.CompletionItemKind.TypeParameter: return types.CompletionItemKind.TypeParameter;
    }
    return types.CompletionItemKind.Property;
}
exports.toCompletionItemKind = toCompletionItemKind;
function fromTextEdit(edit) {
    return {
        text: edit.newText,
        range: fromRange(edit.range)
    };
}
exports.fromTextEdit = fromTextEdit;
function convertDiagnosticToMarkerData(diagnostic) {
    return {
        code: convertCode(diagnostic.code),
        severity: convertSeverity(diagnostic.severity),
        message: diagnostic.message,
        source: diagnostic.source,
        startLineNumber: diagnostic.range.start.line + 1,
        startColumn: diagnostic.range.start.character + 1,
        endLineNumber: diagnostic.range.end.line + 1,
        endColumn: diagnostic.range.end.character + 1,
        relatedInformation: convertRelatedInformation(diagnostic.relatedInformation),
        tags: convertTags(diagnostic.tags)
    };
}
exports.convertDiagnosticToMarkerData = convertDiagnosticToMarkerData;
function convertCode(code) {
    if (typeof code === 'number') {
        return String(code);
    }
    else {
        return code;
    }
}
function convertSeverity(severity) {
    switch (severity) {
        case types.DiagnosticSeverity.Error: return types.MarkerSeverity.Error;
        case types.DiagnosticSeverity.Warning: return types.MarkerSeverity.Warning;
        case types.DiagnosticSeverity.Information: return types.MarkerSeverity.Info;
        case types.DiagnosticSeverity.Hint: return types.MarkerSeverity.Hint;
    }
}
function convertRelatedInformation(diagnosticsRelatedInformation) {
    var e_1, _a;
    if (!diagnosticsRelatedInformation) {
        return undefined;
    }
    var relatedInformation = [];
    try {
        for (var diagnosticsRelatedInformation_1 = __values(diagnosticsRelatedInformation), diagnosticsRelatedInformation_1_1 = diagnosticsRelatedInformation_1.next(); !diagnosticsRelatedInformation_1_1.done; diagnosticsRelatedInformation_1_1 = diagnosticsRelatedInformation_1.next()) {
            var item = diagnosticsRelatedInformation_1_1.value;
            relatedInformation.push({
                resource: item.location.uri.toString(),
                message: item.message,
                startLineNumber: item.location.range.start.line + 1,
                startColumn: item.location.range.start.character + 1,
                endLineNumber: item.location.range.end.line + 1,
                endColumn: item.location.range.end.character + 1
            });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (diagnosticsRelatedInformation_1_1 && !diagnosticsRelatedInformation_1_1.done && (_a = diagnosticsRelatedInformation_1.return)) _a.call(diagnosticsRelatedInformation_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return relatedInformation;
}
function convertTags(tags) {
    var e_2, _a;
    if (!tags) {
        return undefined;
    }
    var markerTags = [];
    try {
        for (var tags_1 = __values(tags), tags_1_1 = tags_1.next(); !tags_1_1.done; tags_1_1 = tags_1.next()) {
            var tag = tags_1_1.value;
            switch (tag) {
                case types.DiagnosticTag.Unnecessary: markerTags.push(types.MarkerTag.Unnecessary);
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (tags_1_1 && !tags_1_1.done && (_a = tags_1.return)) _a.call(tags_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return markerTags;
}
function fromHover(hover) {
    return {
        range: fromRange(hover.range),
        contents: fromManyMarkdown(hover.contents)
    };
}
exports.fromHover = fromHover;
function fromLocation(location) {
    return {
        uri: location.uri,
        range: fromRange(location.range)
    };
}
exports.fromLocation = fromLocation;
function fromDefinitionLink(definitionLink) {
    return {
        uri: definitionLink.targetUri,
        range: fromRange(definitionLink.targetRange),
        originSelectionRange: definitionLink.originSelectionRange ? fromRange(definitionLink.originSelectionRange) : undefined,
        targetSelectionRange: definitionLink.targetSelectionRange ? fromRange(definitionLink.targetSelectionRange) : undefined
    };
}
exports.fromDefinitionLink = fromDefinitionLink;
var DocumentLink;
(function (DocumentLink) {
    function from(link) {
        return {
            range: fromRange(link.range),
            url: link.target,
            tooltip: link.tooltip
        };
    }
    DocumentLink.from = from;
    function to(link) {
        var target = undefined;
        if (link.url) {
            try {
                target = typeof link.url === 'string' ? vscode_uri_1.URI.parse(link.url, true) : vscode_uri_1.URI.revive(link.url);
            }
            catch (err) {
                // ignore
            }
        }
        return new types.DocumentLink(toRange(link.range), target);
    }
    DocumentLink.to = to;
})(DocumentLink = exports.DocumentLink || (exports.DocumentLink = {}));
function fromDocumentHighlightKind(kind) {
    switch (kind) {
        case types.DocumentHighlightKind.Text: return model.DocumentHighlightKind.Text;
        case types.DocumentHighlightKind.Read: return model.DocumentHighlightKind.Read;
        case types.DocumentHighlightKind.Write: return model.DocumentHighlightKind.Write;
    }
    return model.DocumentHighlightKind.Text;
}
exports.fromDocumentHighlightKind = fromDocumentHighlightKind;
function fromDocumentHighlight(documentHighlight) {
    return {
        range: fromRange(documentHighlight.range),
        kind: fromDocumentHighlightKind(documentHighlight.kind)
    };
}
exports.fromDocumentHighlight = fromDocumentHighlight;
var ParameterInformation;
(function (ParameterInformation) {
    function from(info) {
        return {
            label: info.label,
            documentation: info.documentation ? fromMarkdown(info.documentation) : undefined
        };
    }
    ParameterInformation.from = from;
    function to(info) {
        return {
            label: info.label,
            documentation: markdown_string_1.isMarkdownString(info.documentation) ? toMarkdown(info.documentation) : info.documentation
        };
    }
    ParameterInformation.to = to;
})(ParameterInformation = exports.ParameterInformation || (exports.ParameterInformation = {}));
var SignatureInformation;
(function (SignatureInformation) {
    function from(info) {
        return {
            label: info.label,
            documentation: info.documentation ? fromMarkdown(info.documentation) : undefined,
            parameters: info.parameters && info.parameters.map(ParameterInformation.from)
        };
    }
    SignatureInformation.from = from;
    function to(info) {
        return {
            label: info.label,
            documentation: markdown_string_1.isMarkdownString(info.documentation) ? toMarkdown(info.documentation) : info.documentation,
            parameters: info.parameters && info.parameters.map(ParameterInformation.to)
        };
    }
    SignatureInformation.to = to;
})(SignatureInformation = exports.SignatureInformation || (exports.SignatureInformation = {}));
var SignatureHelp;
(function (SignatureHelp) {
    function from(id, help) {
        return {
            id: id,
            activeSignature: help.activeSignature,
            activeParameter: help.activeParameter,
            signatures: help.signatures && help.signatures.map(SignatureInformation.from)
        };
    }
    SignatureHelp.from = from;
    function to(help) {
        return {
            activeSignature: help.activeSignature,
            activeParameter: help.activeParameter,
            signatures: help.signatures && help.signatures.map(SignatureInformation.to)
        };
    }
    SignatureHelp.to = to;
})(SignatureHelp = exports.SignatureHelp || (exports.SignatureHelp = {}));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromWorkspaceEdit(value, documents) {
    var e_3, _a;
    var result = {
        edits: []
    };
    try {
        for (var _b = __values(value._allEntries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var entry = _c.value;
            var _d = __read(entry, 2), uri = _d[0], uriOrEdits = _d[1];
            if (Array.isArray(uriOrEdits)) {
                // text edits
                var doc = documents ? documents.getDocument(uri.toString()) : undefined;
                result.edits.push({ resource: uri, modelVersionId: doc && doc.version, edit: uriOrEdits.map(fromTextEdit)[0], metadata: entry[2] });
            }
            else {
                // resource edits
                result.edits.push({ oldUri: uri, newUri: uriOrEdits, options: entry[2], metadata: entry[3] });
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return result;
}
exports.fromWorkspaceEdit = fromWorkspaceEdit;
var SymbolKind;
(function (SymbolKind) {
    var fromMapping = Object.create(null);
    fromMapping[model.SymbolKind.File] = model.SymbolKind.File;
    fromMapping[model.SymbolKind.Module] = model.SymbolKind.Module;
    fromMapping[model.SymbolKind.Namespace] = model.SymbolKind.Namespace;
    fromMapping[model.SymbolKind.Package] = model.SymbolKind.Package;
    fromMapping[model.SymbolKind.Class] = model.SymbolKind.Class;
    fromMapping[model.SymbolKind.Method] = model.SymbolKind.Method;
    fromMapping[model.SymbolKind.Property] = model.SymbolKind.Property;
    fromMapping[model.SymbolKind.Field] = model.SymbolKind.Field;
    fromMapping[model.SymbolKind.Constructor] = model.SymbolKind.Constructor;
    fromMapping[model.SymbolKind.Enum] = model.SymbolKind.Enum;
    fromMapping[model.SymbolKind.Interface] = model.SymbolKind.Interface;
    fromMapping[model.SymbolKind.Function] = model.SymbolKind.Function;
    fromMapping[model.SymbolKind.Variable] = model.SymbolKind.Variable;
    fromMapping[model.SymbolKind.Constant] = model.SymbolKind.Constant;
    fromMapping[model.SymbolKind.String] = model.SymbolKind.String;
    fromMapping[model.SymbolKind.Number] = model.SymbolKind.Number;
    fromMapping[model.SymbolKind.Boolean] = model.SymbolKind.Boolean;
    fromMapping[model.SymbolKind.Array] = model.SymbolKind.Array;
    fromMapping[model.SymbolKind.Object] = model.SymbolKind.Object;
    fromMapping[model.SymbolKind.Key] = model.SymbolKind.Key;
    fromMapping[model.SymbolKind.Null] = model.SymbolKind.Null;
    fromMapping[model.SymbolKind.EnumMember] = model.SymbolKind.EnumMember;
    fromMapping[model.SymbolKind.Struct] = model.SymbolKind.Struct;
    fromMapping[model.SymbolKind.Event] = model.SymbolKind.Event;
    fromMapping[model.SymbolKind.Operator] = model.SymbolKind.Operator;
    fromMapping[model.SymbolKind.TypeParameter] = model.SymbolKind.TypeParameter;
    function fromSymbolKind(kind) {
        return fromMapping[kind] || model.SymbolKind.Property;
    }
    SymbolKind.fromSymbolKind = fromSymbolKind;
    function toSymbolKind(kind) {
        for (var k in fromMapping) {
            if (fromMapping[k] === kind) {
                return Number(k);
            }
        }
        return model.SymbolKind.Property;
    }
    SymbolKind.toSymbolKind = toSymbolKind;
})(SymbolKind = exports.SymbolKind || (exports.SymbolKind = {}));
function fromDocumentSymbol(info) {
    var result = {
        name: info.name,
        detail: info.detail,
        range: fromRange(info.range),
        tags: info.tags ? info.tags.map(fromSymbolTag) : [],
        selectionRange: fromRange(info.selectionRange),
        kind: SymbolKind.fromSymbolKind(info.kind)
    };
    if (info.children) {
        result.children = info.children.map(fromDocumentSymbol);
    }
    return result;
}
exports.fromDocumentSymbol = fromDocumentSymbol;
function toDocumentSymbol(symbol) {
    return {
        name: symbol.name,
        detail: symbol.detail,
        range: toRange(symbol.range),
        tags: symbol.tags && symbol.tags.length > 0 ? symbol.tags.map(toSymbolTag) : [],
        selectionRange: toRange(symbol.selectionRange),
        children: symbol.children ? symbol.children.map(toDocumentSymbol) : [],
        kind: SymbolKind.toSymbolKind(symbol.kind)
    };
}
exports.toDocumentSymbol = toDocumentSymbol;
function fromSymbolTag(kind) {
    switch (kind) {
        case types.SymbolTag.Deprecated: return model.SymbolTag.Deprecated;
    }
}
exports.fromSymbolTag = fromSymbolTag;
function toSymbolTag(kind) {
    switch (kind) {
        case model.SymbolTag.Deprecated: return types.SymbolTag.Deprecated;
    }
}
exports.toSymbolTag = toSymbolTag;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isModelLocation(thing) {
    if (!thing) {
        return false;
    }
    return isModelRange(thing.range) &&
        isUriComponents(thing.uri);
}
exports.isModelLocation = isModelLocation;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isModelRange(thing) {
    if (!thing) {
        return false;
    }
    return (('startLineNumber' in thing) && typeof thing.startLineNumber === 'number') &&
        (('startColumn' in thing) && typeof thing.startColumn === 'number') &&
        (('endLineNumber' in thing) && typeof thing.endLineNumber === 'number') &&
        (('endColumn' in thing) && typeof thing.endColumn === 'number');
}
exports.isModelRange = isModelRange;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUriComponents(thing) {
    if (!thing) {
        return false;
    }
    return (('scheme' in thing) && typeof thing.scheme === 'string') &&
        (('path' in thing) && typeof thing.path === 'string') &&
        (('query' in thing) && typeof thing.query === 'string') &&
        (('fragment' in thing) && typeof thing.fragment === 'string');
}
exports.isUriComponents = isUriComponents;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isModelCallHierarchyItem(thing) {
    if (!thing) {
        return false;
    }
    return false;
}
exports.isModelCallHierarchyItem = isModelCallHierarchyItem;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isModelCallHierarchyIncomingCall(thing) {
    if (!thing) {
        return false;
    }
    return false;
}
exports.isModelCallHierarchyIncomingCall = isModelCallHierarchyIncomingCall;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isModelCallHierarchyOutgoingCall(thing) {
    if (!thing) {
        return false;
    }
    return false;
}
exports.isModelCallHierarchyOutgoingCall = isModelCallHierarchyOutgoingCall;
function toLocation(value) {
    return new types.Location(vscode_uri_1.URI.revive(value.uri), toRange(value.range));
}
exports.toLocation = toLocation;
function fromCallHierarchyItem(item) {
    return {
        kind: SymbolKind.fromSymbolKind(item.kind),
        name: item.name,
        detail: item.detail,
        uri: item.uri,
        range: fromRange(item.range),
        selectionRange: fromRange(item.selectionRange)
    };
}
exports.fromCallHierarchyItem = fromCallHierarchyItem;
function toCallHierarchyItem(value) {
    return new types.CallHierarchyItem(SymbolKind.toSymbolKind(value.kind), value.name, value.detail ? value.detail : '', vscode_uri_1.URI.revive(value.uri), toRange(value.range), toRange(value.selectionRange));
}
exports.toCallHierarchyItem = toCallHierarchyItem;
function toCallHierarchyIncomingCall(value) {
    return new types.CallHierarchyIncomingCall(toCallHierarchyItem(value.from), value.fromRanges && value.fromRanges.map(toRange));
}
exports.toCallHierarchyIncomingCall = toCallHierarchyIncomingCall;
function toCallHierarchyOutgoingCall(value) {
    return new types.CallHierarchyOutgoingCall(toCallHierarchyItem(value.to), value.fromRanges && value.fromRanges.map(toRange));
}
exports.toCallHierarchyOutgoingCall = toCallHierarchyOutgoingCall;
function toWorkspaceFolder(folder) {
    return {
        uri: vscode_uri_1.URI.revive(folder.uri),
        name: folder.name,
        index: folder.index
    };
}
exports.toWorkspaceFolder = toWorkspaceFolder;
function fromTask(task) {
    if (!task) {
        return undefined;
    }
    var taskDto = {};
    taskDto.label = task.name;
    taskDto.source = task.source;
    if (task.hasProblemMatchers) {
        taskDto.problemMatcher = task.problemMatchers;
    }
    if ('detail' in task) {
        taskDto.detail = task.detail;
    }
    if (typeof task.scope === 'object') {
        taskDto.scope = task.scope.uri.toString();
    }
    else if (typeof task.scope === 'number') {
        taskDto.scope = task.scope;
    }
    var group = task.group;
    if (group === types_impl_1.TaskGroup.Build) {
        taskDto.group = BUILD_GROUP;
    }
    else if (group === types_impl_1.TaskGroup.Test) {
        taskDto.group = TEST_GROUP;
    }
    var taskDefinition = task.definition;
    if (!taskDefinition) {
        return taskDto;
    }
    taskDto.type = taskDefinition.type;
    var type = taskDefinition.type, properties = __rest(taskDefinition, ["type"]);
    for (var key in properties) {
        if (properties.hasOwnProperty(key)) {
            taskDto[key] = properties[key];
        }
    }
    var execution = task.execution;
    if (!execution) {
        return taskDto;
    }
    if (taskDefinition.type === 'shell' || types.ShellExecution.is(execution)) {
        return fromShellExecution(execution, taskDto);
    }
    if (taskDefinition.type === 'process' || types.ProcessExecution.is(execution)) {
        return fromProcessExecution(execution, taskDto);
    }
    return taskDto;
}
exports.fromTask = fromTask;
function toTask(taskDto) {
    if (!taskDto) {
        throw new Error('Task should be provided for converting');
    }
    var type = taskDto.type, label = taskDto.label, source = taskDto.source, scope = taskDto.scope, problemMatcher = taskDto.problemMatcher, detail = taskDto.detail, command = taskDto.command, args = taskDto.args, options = taskDto.options, windows = taskDto.windows, group = taskDto.group, properties = __rest(taskDto, ["type", "label", "source", "scope", "problemMatcher", "detail", "command", "args", "options", "windows", "group"]);
    var result = {};
    result.name = label;
    result.source = source;
    if (detail) {
        result.detail = detail;
    }
    if (typeof scope === 'string') {
        var uri = vscode_uri_1.URI.parse(scope);
        result.scope = {
            uri: uri,
            name: uri.toString(),
            index: 0
        };
    }
    else {
        result.scope = scope;
    }
    var taskType = type;
    var taskDefinition = {
        type: taskType
    };
    result.definition = taskDefinition;
    if (taskType === 'process') {
        result.execution = getProcessExecution(taskDto);
    }
    var execution = { command: command, args: args, options: options };
    if (taskType === 'shell' || types.ShellExecution.is(execution)) {
        result.execution = getShellExecution(taskDto);
    }
    if (group) {
        if (group === BUILD_GROUP) {
            result.group = types_impl_1.TaskGroup.Build;
        }
        else if (group === TEST_GROUP) {
            result.group = types_impl_1.TaskGroup.Test;
        }
    }
    if (!properties) {
        return result;
    }
    for (var key in properties) {
        if (properties.hasOwnProperty(key)) {
            taskDefinition[key] = properties[key];
        }
    }
    return result;
}
exports.toTask = toTask;
function fromProcessExecution(execution, taskDto) {
    taskDto.command = execution.process;
    taskDto.args = execution.args;
    var options = execution.options;
    if (options) {
        taskDto.options = options;
    }
    return taskDto;
}
exports.fromProcessExecution = fromProcessExecution;
function fromShellExecution(execution, taskDto) {
    var options = execution.options;
    if (options) {
        taskDto.options = getShellExecutionOptions(options);
    }
    var commandLine = execution.commandLine;
    if (commandLine) {
        taskDto.command = commandLine;
        return taskDto;
    }
    var command = execution.command;
    if (typeof command === 'string') {
        taskDto.command = command;
        taskDto.args = getShellArgs(execution.args);
        return taskDto;
    }
    else {
        throw new Error('Converting ShellQuotedString command is not implemented');
    }
}
exports.fromShellExecution = fromShellExecution;
function getProcessExecution(taskDto) {
    return new types.ProcessExecution(taskDto.command, taskDto.args || [], taskDto.options || {});
}
exports.getProcessExecution = getProcessExecution;
function getShellExecution(taskDto) {
    if (taskDto.command && Array.isArray(taskDto.args) && taskDto.args.length !== 0) {
        return new types.ShellExecution(taskDto.command, taskDto.args, taskDto.options || {});
    }
    return new types.ShellExecution(taskDto.command || taskDto.commandLine, taskDto.options || {});
}
exports.getShellExecution = getShellExecution;
function getShellArgs(args) {
    if (!args || args.length === 0) {
        return [];
    }
    var element = args[0];
    if (typeof element === 'string') {
        return args;
    }
    var result = [];
    var shellQuotedArgs = args;
    shellQuotedArgs.forEach(function (arg) {
        result.push(arg.value);
    });
    return result;
}
exports.getShellArgs = getShellArgs;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getShellExecutionOptions(options) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var result = {};
    var env = options.env;
    if (env) {
        result['env'] = env;
    }
    var executable = options.executable;
    if (executable) {
        result['executable'] = executable;
    }
    var shellQuoting = options.shellQuoting;
    if (shellQuoting) {
        result['shellQuoting'] = shellQuoting;
    }
    var shellArgs = options.shellArgs;
    if (shellArgs) {
        result['shellArgs'] = shellArgs;
    }
    var cwd = options.cwd;
    if (cwd) {
        Object.assign(result, { cwd: cwd });
    }
    return result;
}
exports.getShellExecutionOptions = getShellExecutionOptions;
function fromSymbolInformation(symbolInformation) {
    if (!symbolInformation) {
        return undefined;
    }
    if (symbolInformation.location && symbolInformation.location.range) {
        var p1 = vscode_languageserver_types_1.Position.create(symbolInformation.location.range.start.line, symbolInformation.location.range.start.character);
        var p2 = vscode_languageserver_types_1.Position.create(symbolInformation.location.range.end.line, symbolInformation.location.range.end.character);
        return vscode_languageserver_types_1.SymbolInformation.create(symbolInformation.name, symbolInformation.kind++, vscode_languageserver_types_1.Range.create(p1, p2), symbolInformation.location.uri.toString(), symbolInformation.containerName);
    }
    return {
        name: symbolInformation.name,
        containerName: symbolInformation.containerName,
        kind: symbolInformation.kind++,
        location: {
            uri: symbolInformation.location.uri.toString()
        }
    };
}
exports.fromSymbolInformation = fromSymbolInformation;
function toSymbolInformation(symbolInformation) {
    if (!symbolInformation) {
        return undefined;
    }
    return {
        name: symbolInformation.name,
        containerName: symbolInformation.containerName,
        kind: symbolInformation.kind,
        location: {
            uri: vscode_uri_1.URI.parse(symbolInformation.location.uri),
            range: symbolInformation.location.range
        }
    };
}
exports.toSymbolInformation = toSymbolInformation;
function fromSelectionRange(selectionRange) {
    return { range: fromRange(selectionRange.range) };
}
exports.fromSelectionRange = fromSelectionRange;
function fromFoldingRange(foldingRange) {
    var range = {
        start: foldingRange.start + 1,
        end: foldingRange.end + 1
    };
    if (foldingRange.kind) {
        range.kind = fromFoldingRangeKind(foldingRange.kind);
    }
    return range;
}
exports.fromFoldingRange = fromFoldingRange;
function fromFoldingRangeKind(kind) {
    if (kind) {
        switch (kind) {
            case types.FoldingRangeKind.Comment:
                return model.FoldingRangeKind.Comment;
            case types.FoldingRangeKind.Imports:
                return model.FoldingRangeKind.Imports;
            case types.FoldingRangeKind.Region:
                return model.FoldingRangeKind.Region;
        }
    }
    return undefined;
}
exports.fromFoldingRangeKind = fromFoldingRangeKind;
function fromColor(color) {
    return [color.red, color.green, color.blue, color.alpha];
}
exports.fromColor = fromColor;
function toColor(color) {
    return new types.Color(color[0], color[1], color[2], color[3]);
}
exports.toColor = toColor;
function fromColorPresentation(colorPresentation) {
    return {
        label: colorPresentation.label,
        textEdit: colorPresentation.textEdit ? fromTextEdit(colorPresentation.textEdit) : undefined,
        additionalTextEdits: colorPresentation.additionalTextEdits ? colorPresentation.additionalTextEdits.map(function (value) { return fromTextEdit(value); }) : undefined
    };
}
exports.fromColorPresentation = fromColorPresentation;
function quickPickItemToPickOpenItem(items) {
    var pickItems = [];
    for (var handle = 0; handle < items.length; handle++) {
        var item = items[handle];
        var label = void 0;
        var description = void 0;
        var detail = void 0;
        var picked = void 0;
        var groupLabel = void 0;
        var showBorder = void 0;
        if (typeof item === 'string') {
            label = item;
        }
        else {
            (label = item.label, description = item.description, detail = item.detail, picked = item.picked, groupLabel = item.groupLabel, showBorder = item.showBorder);
        }
        pickItems.push({
            label: label,
            description: description,
            handle: handle,
            detail: detail,
            picked: picked,
            groupLabel: groupLabel,
            showBorder: showBorder
        });
    }
    return pickItems;
}
exports.quickPickItemToPickOpenItem = quickPickItemToPickOpenItem;
var DecorationRenderOptions;
(function (DecorationRenderOptions) {
    function from(options) {
        return {
            isWholeLine: options.isWholeLine,
            rangeBehavior: options.rangeBehavior ? DecorationRangeBehavior.from(options.rangeBehavior) : undefined,
            overviewRulerLane: options.overviewRulerLane,
            light: options.light ? ThemableDecorationRenderOptions.from(options.light) : undefined,
            dark: options.dark ? ThemableDecorationRenderOptions.from(options.dark) : undefined,
            backgroundColor: options.backgroundColor,
            outline: options.outline,
            outlineColor: options.outlineColor,
            outlineStyle: options.outlineStyle,
            outlineWidth: options.outlineWidth,
            border: options.border,
            borderColor: options.borderColor,
            borderRadius: options.borderRadius,
            borderSpacing: options.borderSpacing,
            borderStyle: options.borderStyle,
            borderWidth: options.borderWidth,
            fontStyle: options.fontStyle,
            fontWeight: options.fontWeight,
            textDecoration: options.textDecoration,
            cursor: options.cursor,
            color: options.color,
            opacity: options.opacity,
            letterSpacing: options.letterSpacing,
            gutterIconPath: options.gutterIconPath ? pathOrURIToURI(options.gutterIconPath) : undefined,
            gutterIconSize: options.gutterIconSize,
            overviewRulerColor: options.overviewRulerColor,
            before: options.before ? ThemableDecorationAttachmentRenderOptions.from(options.before) : undefined,
            after: options.after ? ThemableDecorationAttachmentRenderOptions.from(options.after) : undefined,
        };
    }
    DecorationRenderOptions.from = from;
})(DecorationRenderOptions = exports.DecorationRenderOptions || (exports.DecorationRenderOptions = {}));
var DecorationRangeBehavior;
(function (DecorationRangeBehavior) {
    function from(value) {
        if (typeof value === 'undefined') {
            return value;
        }
        switch (value) {
            case types.DecorationRangeBehavior.OpenOpen:
                return rpc.TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges;
            case types.DecorationRangeBehavior.ClosedClosed:
                return rpc.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges;
            case types.DecorationRangeBehavior.OpenClosed:
                return rpc.TrackedRangeStickiness.GrowsOnlyWhenTypingBefore;
            case types.DecorationRangeBehavior.ClosedOpen:
                return rpc.TrackedRangeStickiness.GrowsOnlyWhenTypingAfter;
        }
    }
    DecorationRangeBehavior.from = from;
})(DecorationRangeBehavior = exports.DecorationRangeBehavior || (exports.DecorationRangeBehavior = {}));
var ThemableDecorationRenderOptions;
(function (ThemableDecorationRenderOptions) {
    function from(options) {
        if (typeof options === 'undefined') {
            return options;
        }
        return {
            backgroundColor: options.backgroundColor,
            outline: options.outline,
            outlineColor: options.outlineColor,
            outlineStyle: options.outlineStyle,
            outlineWidth: options.outlineWidth,
            border: options.border,
            borderColor: options.borderColor,
            borderRadius: options.borderRadius,
            borderSpacing: options.borderSpacing,
            borderStyle: options.borderStyle,
            borderWidth: options.borderWidth,
            fontStyle: options.fontStyle,
            fontWeight: options.fontWeight,
            textDecoration: options.textDecoration,
            cursor: options.cursor,
            color: options.color,
            opacity: options.opacity,
            letterSpacing: options.letterSpacing,
            gutterIconPath: options.gutterIconPath ? pathOrURIToURI(options.gutterIconPath) : undefined,
            gutterIconSize: options.gutterIconSize,
            overviewRulerColor: options.overviewRulerColor,
            before: options.before ? ThemableDecorationAttachmentRenderOptions.from(options.before) : undefined,
            after: options.after ? ThemableDecorationAttachmentRenderOptions.from(options.after) : undefined,
        };
    }
    ThemableDecorationRenderOptions.from = from;
})(ThemableDecorationRenderOptions = exports.ThemableDecorationRenderOptions || (exports.ThemableDecorationRenderOptions = {}));
var ThemableDecorationAttachmentRenderOptions;
(function (ThemableDecorationAttachmentRenderOptions) {
    function from(options) {
        if (typeof options === 'undefined') {
            return options;
        }
        return {
            contentText: options.contentText,
            contentIconPath: options.contentIconPath ? pathOrURIToURI(options.contentIconPath) : undefined,
            border: options.border,
            borderColor: options.borderColor,
            fontStyle: options.fontStyle,
            fontWeight: options.fontWeight,
            textDecoration: options.textDecoration,
            color: options.color,
            backgroundColor: options.backgroundColor,
            margin: options.margin,
            width: options.width,
            height: options.height,
        };
    }
    ThemableDecorationAttachmentRenderOptions.from = from;
})(ThemableDecorationAttachmentRenderOptions = exports.ThemableDecorationAttachmentRenderOptions || (exports.ThemableDecorationAttachmentRenderOptions = {}));
function pathOrURIToURI(value) {
    if (typeof value === 'undefined') {
        return value;
    }
    if (typeof value === 'string') {
        return vscode_uri_1.URI.file(value);
    }
    else {
        return value;
    }
}
exports.pathOrURIToURI = pathOrURIToURI;
function pluginToPluginInfo(plugin) {
    return {
        id: plugin.model.id,
        name: plugin.model.name
    };
}
exports.pluginToPluginInfo = pluginToPluginInfo;
//# sourceMappingURL=type-converters.js.map