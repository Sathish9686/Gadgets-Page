"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextmateSnippetCompletionProvider = void 0;
/**
 * @deprecated use MonacoSnippetSuggestProvider instead
 */
var TextmateSnippetCompletionProvider = /** @class */ (function () {
    function TextmateSnippetCompletionProvider(config, mdLanguage) {
        var e_1, _a;
        if (mdLanguage === void 0) { mdLanguage = ''; }
        this.config = config;
        this.mdLanguage = mdLanguage;
        this.items = [];
        try {
            for (var _b = __values(Object.keys(config)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_1 = _c.value;
                var textmateSnippet = config[name_1];
                var insertText = Array.isArray(textmateSnippet.body) ? textmateSnippet.body.join('\n') : textmateSnippet.body;
                this.items.push({
                    label: textmateSnippet.prefix,
                    detail: textmateSnippet.description,
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    documentation: {
                        value: '```' + this.mdLanguage + '\n' + this.replaceVariables(insertText) + '```'
                    },
                    insertText: insertText,
                    range: undefined
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    TextmateSnippetCompletionProvider.prototype.replaceVariables = function (textmateSnippet) {
        return new monaco.snippetParser.SnippetParser().parse(textmateSnippet).toString();
    };
    TextmateSnippetCompletionProvider.prototype.provideCompletionItems = function (document, position, context, token) {
        return {
            suggestions: this.items
        };
    };
    return TextmateSnippetCompletionProvider;
}());
exports.TextmateSnippetCompletionProvider = TextmateSnippetCompletionProvider;
//# sourceMappingURL=textmate-snippet-completion-provider.js.map