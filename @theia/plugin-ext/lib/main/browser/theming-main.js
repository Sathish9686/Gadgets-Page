"use strict";
/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
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
exports.ThemingMainImpl = void 0;
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var theming_1 = require("@theia/core/lib/browser/theming");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// some code copied and modified from https://github.com/microsoft/vscode/blob/bafca191f55a234fad20ab67bb689aacc80e7a1a/src/vs/workbench/api/browser/mainThreadTheming.ts
var ThemingMainImpl = /** @class */ (function () {
    function ThemingMainImpl(rpc) {
        var _this = this;
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.THEMING_EXT);
        this.themeChangeListener = theming_1.ThemeService.get().onThemeChange(function (e) {
            _this.proxy.$onColorThemeChange(e.newTheme.type);
        });
        this.proxy.$onColorThemeChange(theming_1.ThemeService.get().getCurrentTheme().type);
    }
    ThemingMainImpl.prototype.dispose = function () {
        this.themeChangeListener.dispose();
    };
    return ThemingMainImpl;
}());
exports.ThemingMainImpl = ThemingMainImpl;
//# sourceMappingURL=theming-main.js.map