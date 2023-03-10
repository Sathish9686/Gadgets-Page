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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.theiaUritoUriComponents = exports.Schemes = void 0;
// some well known URI schemas
// based on https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/base/common/network.ts#L9-L79
// TODO move to network.ts file
var Schemes;
(function (Schemes) {
    /**
     * A schema that is used for models that exist in memory
     * only and that have no correspondence on a server or such.
     */
    Schemes.inMemory = 'inmemory';
    /**
     * A schema that is used for setting files
     */
    Schemes.vscode = 'vscode';
    /**
     * A schema that is used for internal private files
     */
    Schemes.internal = 'private';
    /**
     * A walk-through document.
     */
    Schemes.walkThrough = 'walkThrough';
    /**
     * An embedded code snippet.
     */
    Schemes.walkThroughSnippet = 'walkThroughSnippet';
    Schemes.http = 'http';
    Schemes.https = 'https';
    Schemes.file = 'file';
    Schemes.mailto = 'mailto';
    Schemes.untitled = 'untitled';
    Schemes.data = 'data';
    Schemes.command = 'command';
    Schemes.vscodeRemote = 'vscode-remote';
    Schemes.vscodeRemoteResource = 'vscode-remote-resource';
    Schemes.userData = 'vscode-userdata';
    Schemes.vscodeCustomEditor = 'vscode-custom-editor';
    Schemes.vscodeSettings = 'vscode-settings';
    Schemes.webviewPanel = 'webview-panel';
})(Schemes = exports.Schemes || (exports.Schemes = {}));
function theiaUritoUriComponents(uri) {
    return {
        scheme: uri.scheme,
        authority: uri.authority,
        path: uri.path.toString(),
        query: uri.query,
        fragment: uri.fragment
    };
}
exports.theiaUritoUriComponents = theiaUritoUriComponents;
//# sourceMappingURL=uri-components.js.map