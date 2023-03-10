"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
exports.ExtensionPackageCollector = void 0;
var json_file_1 = require("./json-file");
var extension_package_1 = require("./extension-package");
var ExtensionPackageCollector = /** @class */ (function () {
    function ExtensionPackageCollector(extensionPackageFactory, resolveModule) {
        this.extensionPackageFactory = extensionPackageFactory;
        this.resolveModule = resolveModule;
        this.sorted = [];
        this.visited = new Map();
    }
    ExtensionPackageCollector.prototype.collect = function (pck) {
        this.root = pck;
        this.collectPackages(pck);
        return this.sorted;
    };
    ExtensionPackageCollector.prototype.collectPackages = function (pck) {
        if (!pck.dependencies) {
            return;
        }
        // eslint-disable-next-line guard-for-in
        for (var dependency in pck.dependencies) {
            var versionRange = pck.dependencies[dependency];
            this.collectPackage(dependency, versionRange);
        }
    };
    ExtensionPackageCollector.prototype.collectPackagesWithParent = function (pck, parent) {
        var current = this.parent;
        this.parent = parent;
        this.collectPackages(pck);
        this.parent = current;
    };
    ExtensionPackageCollector.prototype.collectPackage = function (name, versionRange) {
        if (this.visited.has(name)) {
            return;
        }
        this.visited.set(name, true);
        var packagePath;
        try {
            packagePath = this.resolveModule(name + '/package.json');
        }
        catch (error) {
            console.warn("Failed to resolve module: " + name);
        }
        if (!packagePath) {
            return;
        }
        var pck = json_file_1.readJsonFile(packagePath);
        if (extension_package_1.RawExtensionPackage.is(pck)) {
            var parent_1 = this.parent;
            var version = pck.version;
            var transitive = !(name in this.root.dependencies);
            pck.installed = { packagePath: packagePath, version: version, parent: parent_1, transitive: transitive };
            pck.version = versionRange;
            var extensionPackage = this.extensionPackageFactory(pck);
            this.collectPackagesWithParent(pck, extensionPackage);
            this.sorted.push(extensionPackage);
        }
    };
    return ExtensionPackageCollector;
}());
exports.ExtensionPackageCollector = ExtensionPackageCollector;
//# sourceMappingURL=extension-package-collector.js.map