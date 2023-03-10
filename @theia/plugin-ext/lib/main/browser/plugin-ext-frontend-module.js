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
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../src/main/style/status-bar.css");
require("../../../src/main/browser/style/index.css");
require("../../../src/main/browser/style/comments.css");
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var common_1 = require("@theia/core/lib/common");
var messaging_1 = require("@theia/core/lib/browser/messaging");
var hosted_plugin_1 = require("../../hosted/browser/hosted-plugin");
var hosted_plugin_watcher_1 = require("../../hosted/browser/hosted-plugin-watcher");
var commands_1 = require("./commands");
var plugin_frontend_contribution_1 = require("./plugin-frontend-contribution");
var plugin_protocol_1 = require("../../common/plugin-protocol");
var modal_notification_1 = require("./dialogs/modal-notification");
var plugin_ext_widget_1 = require("./plugin-ext-widget");
var plugin_frontend_view_contribution_1 = require("./plugin-frontend-view-contribution");
var plugin_ext_deploy_command_1 = require("./plugin-ext-deploy-command");
var text_editor_model_service_1 = require("./text-editor-model-service");
var untitled_resource_1 = require("./editor/untitled-resource");
var menus_contribution_handler_1 = require("./menus/menus-contribution-handler");
var plugin_contribution_handler_1 = require("./plugin-contribution-handler");
var plugin_view_registry_1 = require("./view/plugin-view-registry");
var workspace_main_1 = require("./workspace-main");
var plugin_ext_api_contribution_1 = require("../../common/plugin-ext-api-contribution");
var plugin_paths_protocol_1 = require("../common/plugin-paths-protocol");
var keybindings_contribution_handler_1 = require("./keybindings/keybindings-contribution-handler");
var debug_session_contribution_1 = require("@theia/debug/lib/browser/debug-session-contribution");
var plugin_debug_session_contribution_registry_1 = require("./debug/plugin-debug-session-contribution-registry");
var plugin_debug_service_1 = require("./debug/plugin-debug-service");
var debug_service_1 = require("@theia/debug/lib/common/debug-service");
var plugin_shared_style_1 = require("./plugin-shared-style");
var selection_provider_command_1 = require("./selection-provider-command");
var view_column_service_1 = require("./view-column-service");
var view_context_key_service_1 = require("./view/view-context-key-service");
var plugin_view_widget_1 = require("./view/plugin-view-widget");
var tree_view_widget_1 = require("./view/tree-view-widget");
var rpc_protocol_1 = require("../../common/rpc-protocol");
var common_2 = require("../../common");
var languages_main_1 = require("./languages-main");
var output_channel_registry_main_1 = require("./output-channel-registry-main");
var webview_1 = require("./webview/webview");
var webview_environment_1 = require("./webview/webview-environment");
var webview_theme_data_provider_1 = require("./webview/webview-theme-data-provider");
var webview_preferences_1 = require("./webview/webview-preferences");
var webview_resource_cache_1 = require("./webview/webview-resource-cache");
var plugin_icon_theme_service_1 = require("./plugin-icon-theme-service");
var plugin_tree_view_node_label_provider_1 = require("./view/plugin-tree-view-node-label-provider");
var webview_widget_factory_1 = require("./webview/webview-widget-factory");
var comments_service_1 = require("./comments/comments-service");
var comments_decorator_1 = require("./comments/comments-decorator");
var comments_contribution_1 = require("./comments/comments-contribution");
var comments_context_key_service_1 = require("./comments/comments-context-key-service");
var custom_editor_contribution_1 = require("./custom-editors/custom-editor-contribution");
var plugin_custom_editor_registry_1 = require("./custom-editors/plugin-custom-editor-registry");
var custom_editor_widget_factory_1 = require("../browser/custom-editors/custom-editor-widget-factory");
var custom_editor_widget_1 = require("./custom-editors/custom-editor-widget");
var custom_editor_service_1 = require("./custom-editors/custom-editor-service");
var undo_redo_service_1 = require("./custom-editors/undo-redo-service");
exports.default = new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
    bind(languages_main_1.LanguagesMainImpl).toSelf().inTransientScope();
    bind(common_2.LanguagesMainFactory).toFactory(function (context) { return function (rpc) {
        var child = context.container.createChild();
        child.bind(rpc_protocol_1.RPCProtocol).toConstantValue(rpc);
        return child.get(languages_main_1.LanguagesMainImpl);
    }; });
    bind(output_channel_registry_main_1.OutputChannelRegistryMainImpl).toSelf().inTransientScope();
    bind(common_2.OutputChannelRegistryFactory).toFactory(function (context) { return function () {
        var child = context.container.createChild();
        return child.get(output_channel_registry_main_1.OutputChannelRegistryMainImpl);
    }; });
    bind(modal_notification_1.ModalNotification).toSelf().inSingletonScope();
    bind(hosted_plugin_1.HostedPluginSupport).toSelf().inSingletonScope();
    bind(hosted_plugin_watcher_1.HostedPluginWatcher).toSelf().inSingletonScope();
    bind(selection_provider_command_1.SelectionProviderCommandContribution).toSelf().inSingletonScope();
    bind(common_1.CommandContribution).toService(selection_provider_command_1.SelectionProviderCommandContribution);
    bind(commands_1.OpenUriCommandHandler).toSelf().inSingletonScope();
    bind(plugin_frontend_contribution_1.PluginApiFrontendContribution).toSelf().inSingletonScope();
    bind(common_1.CommandContribution).toService(plugin_frontend_contribution_1.PluginApiFrontendContribution);
    bind(text_editor_model_service_1.EditorModelService).toSelf().inSingletonScope();
    bind(untitled_resource_1.UntitledResourceResolver).toSelf().inSingletonScope();
    bind(common_1.ResourceResolver).toService(untitled_resource_1.UntitledResourceResolver);
    bind(browser_1.FrontendApplicationContribution).toDynamicValue(function (ctx) { return ({
        onStart: function () {
            ctx.container.get(hosted_plugin_1.HostedPluginSupport).onStart(ctx.container);
        }
    }); });
    bind(plugin_protocol_1.HostedPluginServer).toDynamicValue(function (ctx) {
        var connection = ctx.container.get(messaging_1.WebSocketConnectionProvider);
        var hostedWatcher = ctx.container.get(hosted_plugin_watcher_1.HostedPluginWatcher);
        return connection.createProxy(plugin_protocol_1.hostedServicePath, hostedWatcher.getHostedPluginClient());
    }).inSingletonScope();
    bind(plugin_paths_protocol_1.PluginPathsService).toDynamicValue(function (ctx) {
        var connection = ctx.container.get(messaging_1.WebSocketConnectionProvider);
        return connection.createProxy(plugin_paths_protocol_1.pluginPathsServicePath);
    }).inSingletonScope();
    browser_1.bindViewContribution(bind, plugin_frontend_view_contribution_1.PluginFrontendViewContribution);
    bind(plugin_ext_widget_1.PluginWidget).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(function (ctx) { return ({
        id: plugin_frontend_view_contribution_1.PluginFrontendViewContribution.PLUGINS_WIDGET_FACTORY_ID,
        createWidget: function () { return ctx.container.get(plugin_ext_widget_1.PluginWidget); }
    }); });
    bind(plugin_ext_deploy_command_1.PluginExtDeployCommandService).toSelf().inSingletonScope();
    bind(plugin_protocol_1.PluginServer).toDynamicValue(function (ctx) {
        var provider = ctx.container.get(messaging_1.WebSocketConnectionProvider);
        return provider.createProxy(plugin_protocol_1.pluginServerJsonRpcPath);
    }).inSingletonScope();
    bind(view_context_key_service_1.ViewContextKeyService).toSelf().inSingletonScope();
    bind(plugin_tree_view_node_label_provider_1.PluginTreeViewNodeLabelProvider).toSelf().inSingletonScope();
    bind(browser_1.LabelProviderContribution).toService(plugin_tree_view_node_label_provider_1.PluginTreeViewNodeLabelProvider);
    bind(browser_1.WidgetFactory).toDynamicValue(function (_a) {
        var container = _a.container;
        return ({
            id: plugin_view_registry_1.PLUGIN_VIEW_DATA_FACTORY_ID,
            createWidget: function (identifier) {
                var child = browser_1.createTreeContainer(container, {
                    contextMenuPath: tree_view_widget_1.VIEW_ITEM_CONTEXT_MENU,
                    globalSelection: true
                });
                child.bind(tree_view_widget_1.TreeViewWidgetIdentifier).toConstantValue(identifier);
                child.bind(tree_view_widget_1.PluginTree).toSelf();
                child.rebind(browser_1.TreeImpl).toService(tree_view_widget_1.PluginTree);
                child.bind(tree_view_widget_1.PluginTreeModel).toSelf();
                child.rebind(browser_1.TreeModelImpl).toService(tree_view_widget_1.PluginTreeModel);
                child.bind(tree_view_widget_1.TreeViewWidget).toSelf();
                child.rebind(browser_1.TreeWidget).toService(tree_view_widget_1.TreeViewWidget);
                return child.get(browser_1.TreeWidget);
            }
        });
    }).inSingletonScope();
    webview_preferences_1.bindWebviewPreferences(bind);
    bind(webview_environment_1.WebviewEnvironment).toSelf().inSingletonScope();
    bind(webview_theme_data_provider_1.WebviewThemeDataProvider).toSelf().inSingletonScope();
    bind(webview_resource_cache_1.WebviewResourceCache).toSelf().inSingletonScope();
    bind(webview_1.WebviewWidget).toSelf();
    bind(webview_widget_factory_1.WebviewWidgetFactory).toDynamicValue(function (ctx) { return new webview_widget_factory_1.WebviewWidgetFactory(ctx.container); }).inSingletonScope();
    bind(browser_1.WidgetFactory).toService(webview_widget_factory_1.WebviewWidgetFactory);
    bind(custom_editor_contribution_1.CustomEditorContribution).toSelf().inSingletonScope();
    bind(common_1.CommandContribution).toService(custom_editor_contribution_1.CustomEditorContribution);
    bind(plugin_custom_editor_registry_1.PluginCustomEditorRegistry).toSelf().inSingletonScope();
    bind(custom_editor_service_1.CustomEditorService).toSelf().inSingletonScope();
    bind(custom_editor_widget_1.CustomEditorWidget).toSelf();
    bind(custom_editor_widget_factory_1.CustomEditorWidgetFactory).toDynamicValue(function (ctx) { return new custom_editor_widget_factory_1.CustomEditorWidgetFactory(ctx.container); }).inSingletonScope();
    bind(browser_1.WidgetFactory).toService(custom_editor_widget_factory_1.CustomEditorWidgetFactory);
    bind(undo_redo_service_1.UndoRedoService).toSelf().inSingletonScope();
    bind(plugin_view_widget_1.PluginViewWidget).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(function (_a) {
        var container = _a.container;
        return ({
            id: plugin_view_registry_1.PLUGIN_VIEW_FACTORY_ID,
            createWidget: function (identifier) {
                var child = container.createChild();
                child.bind(plugin_view_widget_1.PluginViewWidgetIdentifier).toConstantValue(identifier);
                return child.get(plugin_view_widget_1.PluginViewWidget);
            }
        });
    }).inSingletonScope();
    bind(browser_1.WidgetFactory).toDynamicValue(function (_a) {
        var container = _a.container;
        return ({
            id: plugin_view_registry_1.PLUGIN_VIEW_CONTAINER_FACTORY_ID,
            createWidget: function (identifier) {
                return container.get(browser_1.ViewContainer.Factory)(identifier);
            }
        });
    }).inSingletonScope();
    bind(plugin_shared_style_1.PluginSharedStyle).toSelf().inSingletonScope();
    bind(plugin_view_registry_1.PluginViewRegistry).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toService(plugin_view_registry_1.PluginViewRegistry);
    bind(plugin_icon_theme_service_1.PluginIconThemeFactory).toFactory(function (_a) {
        var container = _a.container;
        return function (definition) {
            var child = container.createChild();
            child.bind(plugin_icon_theme_service_1.PluginIconThemeDefinition).toConstantValue(definition);
            child.bind(plugin_icon_theme_service_1.PluginIconTheme).toSelf().inSingletonScope();
            return child.get(plugin_icon_theme_service_1.PluginIconTheme);
        };
    });
    bind(plugin_icon_theme_service_1.PluginIconThemeService).toSelf().inSingletonScope();
    bind(browser_1.LabelProviderContribution).toService(plugin_icon_theme_service_1.PluginIconThemeService);
    bind(menus_contribution_handler_1.MenusContributionPointHandler).toSelf().inSingletonScope();
    bind(menus_contribution_handler_1.CodeEditorWidgetUtil).toSelf().inSingletonScope();
    bind(keybindings_contribution_handler_1.KeybindingsContributionPointHandler).toSelf().inSingletonScope();
    bind(plugin_contribution_handler_1.PluginContributionHandler).toSelf().inSingletonScope();
    bind(workspace_main_1.TextContentResourceResolver).toSelf().inSingletonScope();
    bind(common_1.ResourceResolver).toService(workspace_main_1.TextContentResourceResolver);
    common_1.bindContributionProvider(bind, plugin_ext_api_contribution_1.MainPluginApiProvider);
    bind(plugin_debug_service_1.PluginDebugService).toSelf().inSingletonScope();
    rebind(debug_service_1.DebugService).toService(plugin_debug_service_1.PluginDebugService);
    bind(plugin_debug_session_contribution_registry_1.PluginDebugSessionContributionRegistry).toSelf().inSingletonScope();
    rebind(debug_session_contribution_1.DebugSessionContributionRegistry).toService(plugin_debug_session_contribution_registry_1.PluginDebugSessionContributionRegistry);
    bind(view_column_service_1.ViewColumnService).toSelf().inSingletonScope();
    bind(comments_service_1.CommentsService).to(comments_service_1.PluginCommentService).inSingletonScope();
    bind(comments_decorator_1.CommentingRangeDecorator).toSelf().inSingletonScope();
    bind(comments_contribution_1.CommentsContribution).toSelf().inSingletonScope();
    bind(comments_context_key_service_1.CommentsContextKeyService).toSelf().inSingletonScope();
});
//# sourceMappingURL=plugin-ext-frontend-module.js.map