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
var inversify_1 = require("inversify");
var webview_widget_factory_1 = require("../browser/webview/webview-widget-factory");
var custom_editor_widget_factory_1 = require("../browser/custom-editors/custom-editor-widget-factory");
var electron_webview_widget_factory_1 = require("./webview/electron-webview-widget-factory");
exports.default = new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
    rebind(webview_widget_factory_1.WebviewWidgetFactory).toDynamicValue(function (ctx) { return new electron_webview_widget_factory_1.ElectronWebviewWidgetFactory(ctx.container); }).inSingletonScope();
    rebind(custom_editor_widget_factory_1.CustomEditorWidgetFactory).toDynamicValue(function (ctx) { return new electron_webview_widget_factory_1.ElectronCustomEditorWidgetFactory(ctx.container); }).inSingletonScope();
});
//# sourceMappingURL=plugin-ext-frontend-electron-module.js.map