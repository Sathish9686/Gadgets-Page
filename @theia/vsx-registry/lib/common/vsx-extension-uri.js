"use strict";
/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VSXExtensionUri = void 0;
var uri_1 = require("@theia/core/lib/common/uri");
var VSXExtensionUri;
(function (VSXExtensionUri) {
    function toUri(id) {
        return new uri_1.default("vscode:extension/" + id);
    }
    VSXExtensionUri.toUri = toUri;
    function toId(uri) {
        if (uri.scheme === 'vscode' && uri.path.dir.toString() === 'extension') {
            return uri.path.base;
        }
        return undefined;
    }
    VSXExtensionUri.toId = toId;
})(VSXExtensionUri = exports.VSXExtensionUri || (exports.VSXExtensionUri = {}));
//# sourceMappingURL=vsx-extension-uri.js.map