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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteFileServiceContribution = void 0;
var inversify_1 = require("inversify");
var remote_file_system_provider_1 = require("../common/remote-file-system-provider");
var RemoteFileServiceContribution = /** @class */ (function () {
    function RemoteFileServiceContribution() {
    }
    RemoteFileServiceContribution.prototype.registerFileSystemProviders = function (service) {
        var _this = this;
        var registering = this.provider.ready.then(function () {
            return service.registerProvider('file', _this.provider);
        });
        service.onWillActivateFileSystemProvider(function (event) {
            if (event.scheme === 'file') {
                event.waitUntil(registering);
            }
        });
    };
    __decorate([
        inversify_1.inject(remote_file_system_provider_1.RemoteFileSystemProvider),
        __metadata("design:type", remote_file_system_provider_1.RemoteFileSystemProvider)
    ], RemoteFileServiceContribution.prototype, "provider", void 0);
    RemoteFileServiceContribution = __decorate([
        inversify_1.injectable()
    ], RemoteFileServiceContribution);
    return RemoteFileServiceContribution;
}());
exports.RemoteFileServiceContribution = RemoteFileServiceContribution;
//# sourceMappingURL=remote-file-service-contribution.js.map