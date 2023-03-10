"use strict";
/********************************************************************************
 * Copyright (C) 2015-2021 Red Hat, Inc.
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
exports.VsCodePluginScanner = void 0;
var inversify_1 = require("inversify");
var plugin_ext_1 = require("@theia/plugin-ext");
var scanner_theia_1 = require("@theia/plugin-ext/lib/hosted/node/scanners/scanner-theia");
var VsCodePluginScanner = /** @class */ (function (_super) {
    __extends(VsCodePluginScanner, _super);
    function VsCodePluginScanner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.VSCODE_TYPE = 'vscode';
        _this.VSCODE_PREFIX = 'vscode:extension/';
        return _this;
    }
    Object.defineProperty(VsCodePluginScanner.prototype, "apiType", {
        get: function () {
            return this.VSCODE_TYPE;
        },
        enumerable: false,
        configurable: true
    });
    VsCodePluginScanner.prototype.getModel = function (plugin) {
        // publisher can be empty on vscode extension development
        var publisher = plugin.publisher || '';
        var result = {
            packagePath: plugin.packagePath,
            packageUri: this.pluginUriFactory.createUri(plugin).toString(),
            // see id definition: https://github.com/microsoft/vscode/blob/15916055fe0cb9411a5f36119b3b012458fe0a1d/src/vs/platform/extensions/common/extensions.ts#L167-L169
            id: publisher.toLowerCase() + "." + plugin.name.toLowerCase(),
            name: plugin.name,
            publisher: publisher,
            version: plugin.version,
            displayName: plugin.displayName,
            description: plugin.description,
            engine: {
                type: this.VSCODE_TYPE,
                version: plugin.engines[this.VSCODE_TYPE]
            },
            entryPoint: {
                backend: plugin.main
            },
            iconUrl: plugin.icon && plugin_ext_1.PluginPackage.toPluginUrl(plugin, plugin.icon),
            readmeUrl: plugin_ext_1.PluginPackage.toPluginUrl(plugin, './README.md'),
            licenseUrl: plugin_ext_1.PluginPackage.toPluginUrl(plugin, './LICENSE')
        };
        return result;
    };
    /**
     * Maps extension dependencies to deployable extension dependencies.
     */
    VsCodePluginScanner.prototype.getDependencies = function (plugin) {
        var e_1, _a;
        var _this = this;
        // Store the list of dependencies.
        var dependencies = new Map();
        try {
            // Iterate through the list of dependencies from `extensionDependencies` and `extensionPack`.
            for (var _b = __values([plugin.extensionDependencies, plugin.extensionPack]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var dependency = _c.value;
                if (dependency !== undefined) {
                    // Iterate over the list of dependencies present, and add them to the collection.
                    dependency.forEach(function (dep) {
                        var dependencyId = dep.toLowerCase();
                        dependencies.set(dependencyId, _this.VSCODE_PREFIX + dependencyId);
                    });
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Return the map of dependencies if present, else `undefined`.
        return dependencies.size > 0 ? dependencies : undefined;
    };
    VsCodePluginScanner.prototype.getLifecycle = function (plugin) {
        return {
            startMethod: 'activate',
            stopMethod: 'deactivate',
            backendInitPath: __dirname + '/plugin-vscode-init.js'
        };
    };
    VsCodePluginScanner = __decorate([
        inversify_1.injectable()
    ], VsCodePluginScanner);
    return VsCodePluginScanner;
}(scanner_theia_1.TheiaPluginScanner));
exports.VsCodePluginScanner = VsCodePluginScanner;
//# sourceMappingURL=scanner-vscode.js.map