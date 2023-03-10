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
exports.backendApplicationModule = void 0;
var inversify_1 = require("inversify");
var application_package_1 = require("@theia/application-package");
var common_1 = require("../common");
var backend_application_1 = require("./backend-application");
var cli_1 = require("./cli");
var messaging_1 = require("./messaging");
var application_server_1 = require("./application-server");
var application_protocol_1 = require("../common/application-protocol");
var env_variables_1 = require("./../common/env-variables");
var env_variables_2 = require("./env-variables");
var connection_container_module_1 = require("./messaging/connection-container-module");
var quick_pick_service_1 = require("../common/quick-pick-service");
var ws_request_validators_1 = require("./ws-request-validators");
inversify_1.decorate(inversify_1.injectable(), application_package_1.ApplicationPackage);
var commandConnectionModule = connection_container_module_1.ConnectionContainerModule.create(function (_a) {
    var bindFrontendService = _a.bindFrontendService;
    bindFrontendService(common_1.commandServicePath, common_1.CommandService);
});
var messageConnectionModule = connection_container_module_1.ConnectionContainerModule.create(function (_a) {
    var bind = _a.bind, bindFrontendService = _a.bindFrontendService;
    bindFrontendService(common_1.messageServicePath, common_1.MessageClient);
    bind(common_1.MessageService).toSelf().inSingletonScope();
});
var quickPickConnectionModule = connection_container_module_1.ConnectionContainerModule.create(function (_a) {
    var bindFrontendService = _a.bindFrontendService;
    bindFrontendService(quick_pick_service_1.quickPickServicePath, quick_pick_service_1.QuickPickService);
});
exports.backendApplicationModule = new inversify_1.ContainerModule(function (bind) {
    bind(connection_container_module_1.ConnectionContainerModule).toConstantValue(commandConnectionModule);
    bind(connection_container_module_1.ConnectionContainerModule).toConstantValue(messageConnectionModule);
    bind(connection_container_module_1.ConnectionContainerModule).toConstantValue(quickPickConnectionModule);
    bind(cli_1.CliManager).toSelf().inSingletonScope();
    common_1.bindContributionProvider(bind, cli_1.CliContribution);
    bind(backend_application_1.BackendApplicationCliContribution).toSelf().inSingletonScope();
    bind(cli_1.CliContribution).toService(backend_application_1.BackendApplicationCliContribution);
    bind(backend_application_1.BackendApplication).toSelf().inSingletonScope();
    common_1.bindContributionProvider(bind, backend_application_1.BackendApplicationContribution);
    bind(messaging_1.IPCConnectionProvider).toSelf().inSingletonScope();
    bind(application_server_1.ApplicationServerImpl).toSelf().inSingletonScope();
    bind(application_protocol_1.ApplicationServer).toService(application_server_1.ApplicationServerImpl);
    bind(common_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new common_1.JsonRpcConnectionHandler(application_protocol_1.applicationPath, function () {
            return ctx.container.get(application_protocol_1.ApplicationServer);
        });
    }).inSingletonScope();
    bind(env_variables_1.EnvVariablesServer).to(env_variables_2.EnvVariablesServerImpl).inSingletonScope();
    bind(common_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new common_1.JsonRpcConnectionHandler(env_variables_1.envVariablesPath, function () {
            var envVariablesServer = ctx.container.get(env_variables_1.EnvVariablesServer);
            return envVariablesServer;
        });
    }).inSingletonScope();
    bind(application_package_1.ApplicationPackage).toDynamicValue(function (_a) {
        var container = _a.container;
        var projectPath = container.get(backend_application_1.BackendApplicationCliContribution).projectPath;
        return new application_package_1.ApplicationPackage({ projectPath: projectPath });
    }).inSingletonScope();
    bind(ws_request_validators_1.WsRequestValidator).toSelf().inSingletonScope();
    common_1.bindContributionProvider(bind, ws_request_validators_1.WsRequestValidatorContribution);
});
//# sourceMappingURL=backend-application-module.js.map