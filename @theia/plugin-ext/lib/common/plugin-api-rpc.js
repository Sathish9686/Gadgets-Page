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
exports.MAIN_RPC_CONTEXT = exports.PLUGIN_RPC_CONTEXT = exports.OutputChannelRegistryFactory = exports.LanguagesMainFactory = exports.WorkspaceTextEditDto = exports.TrackedRangeStickiness = exports.TextEditorRevealType = exports.EditorPosition = exports.CommentsEditCommandArg = exports.CommentsContextCommandArg = exports.CommentsCommandArg = exports.TimelineCommandArg = exports.ScmCommandArg = exports.TreeViewItemCollapsibleState = exports.TreeViewSelection = exports.MainMessageType = exports.emptyPlugin = exports.UIKind = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var rpc_protocol_1 = require("./rpc-protocol");
var UIKind;
(function (UIKind) {
    /**
     * Extensions are accessed from a desktop application.
     */
    UIKind[UIKind["Desktop"] = 1] = "Desktop";
    /**
     * Extensions are accessed from a web browser.
     */
    UIKind[UIKind["Web"] = 2] = "Web";
})(UIKind = exports.UIKind || (exports.UIKind = {}));
exports.emptyPlugin = {
    lifecycle: {
        startMethod: 'empty',
        stopMethod: 'empty'
    },
    model: {
        id: 'emptyPlugin',
        name: 'emptyPlugin',
        publisher: 'Theia',
        version: 'empty',
        displayName: 'empty',
        description: 'empty',
        engine: {
            type: 'empty',
            version: 'empty'
        },
        packagePath: 'empty',
        packageUri: 'empty',
        entryPoint: {}
    },
    pluginPath: 'empty',
    pluginFolder: 'empty',
    rawModel: {
        name: 'emptyPlugin',
        publisher: 'Theia',
        version: 'empty',
        displayName: 'empty',
        description: 'empty',
        engines: {
            type: 'empty',
            version: 'empty'
        },
        packagePath: 'empty'
    }
};
var MainMessageType;
(function (MainMessageType) {
    MainMessageType[MainMessageType["Error"] = 0] = "Error";
    MainMessageType[MainMessageType["Warning"] = 1] = "Warning";
    MainMessageType[MainMessageType["Info"] = 2] = "Info";
})(MainMessageType = exports.MainMessageType || (exports.MainMessageType = {}));
var TreeViewSelection;
(function (TreeViewSelection) {
    function is(arg) {
        return !!arg && typeof arg === 'object' && 'treeViewId' in arg && 'treeItemId' in arg;
    }
    TreeViewSelection.is = is;
})(TreeViewSelection = exports.TreeViewSelection || (exports.TreeViewSelection = {}));
/**
 * Collapsible state of the tree item
 */
var TreeViewItemCollapsibleState;
(function (TreeViewItemCollapsibleState) {
    /**
     * Determines an item can be neither collapsed nor expanded. Implies it has no children.
     */
    TreeViewItemCollapsibleState[TreeViewItemCollapsibleState["None"] = 0] = "None";
    /**
     * Determines an item is collapsed
     */
    TreeViewItemCollapsibleState[TreeViewItemCollapsibleState["Collapsed"] = 1] = "Collapsed";
    /**
     * Determines an item is expanded
     */
    TreeViewItemCollapsibleState[TreeViewItemCollapsibleState["Expanded"] = 2] = "Expanded";
})(TreeViewItemCollapsibleState = exports.TreeViewItemCollapsibleState || (exports.TreeViewItemCollapsibleState = {}));
var ScmCommandArg;
(function (ScmCommandArg) {
    function is(arg) {
        return !!arg && typeof arg === 'object' && 'sourceControlHandle' in arg;
    }
    ScmCommandArg.is = is;
})(ScmCommandArg = exports.ScmCommandArg || (exports.ScmCommandArg = {}));
var TimelineCommandArg;
(function (TimelineCommandArg) {
    function is(arg) {
        return !!arg && typeof arg === 'object' && 'timelineHandle' in arg;
    }
    TimelineCommandArg.is = is;
})(TimelineCommandArg = exports.TimelineCommandArg || (exports.TimelineCommandArg = {}));
var CommentsCommandArg;
(function (CommentsCommandArg) {
    function is(arg) {
        return !!arg && typeof arg === 'object' && 'commentControlHandle' in arg && 'commentThreadHandle' in arg && 'text' in arg && !('commentUniqueId' in arg);
    }
    CommentsCommandArg.is = is;
})(CommentsCommandArg = exports.CommentsCommandArg || (exports.CommentsCommandArg = {}));
var CommentsContextCommandArg;
(function (CommentsContextCommandArg) {
    function is(arg) {
        return !!arg && typeof arg === 'object' && 'commentControlHandle' in arg && 'commentThreadHandle' in arg && 'commentUniqueId' in arg && !('text' in arg);
    }
    CommentsContextCommandArg.is = is;
})(CommentsContextCommandArg = exports.CommentsContextCommandArg || (exports.CommentsContextCommandArg = {}));
var CommentsEditCommandArg;
(function (CommentsEditCommandArg) {
    function is(arg) {
        return !!arg && typeof arg === 'object' && 'commentControlHandle' in arg && 'commentThreadHandle' in arg && 'commentUniqueId' in arg && 'text' in arg;
    }
    CommentsEditCommandArg.is = is;
})(CommentsEditCommandArg = exports.CommentsEditCommandArg || (exports.CommentsEditCommandArg = {}));
var EditorPosition;
(function (EditorPosition) {
    EditorPosition[EditorPosition["ONE"] = 0] = "ONE";
    EditorPosition[EditorPosition["TWO"] = 1] = "TWO";
    EditorPosition[EditorPosition["THREE"] = 2] = "THREE";
    EditorPosition[EditorPosition["FOUR"] = 3] = "FOUR";
    EditorPosition[EditorPosition["FIVE"] = 4] = "FIVE";
    EditorPosition[EditorPosition["SIX"] = 5] = "SIX";
    EditorPosition[EditorPosition["SEVEN"] = 6] = "SEVEN";
    EditorPosition[EditorPosition["EIGHT"] = 7] = "EIGHT";
    EditorPosition[EditorPosition["NINE"] = 8] = "NINE";
})(EditorPosition = exports.EditorPosition || (exports.EditorPosition = {}));
var TextEditorRevealType;
(function (TextEditorRevealType) {
    TextEditorRevealType[TextEditorRevealType["Default"] = 0] = "Default";
    TextEditorRevealType[TextEditorRevealType["InCenter"] = 1] = "InCenter";
    TextEditorRevealType[TextEditorRevealType["InCenterIfOutsideViewport"] = 2] = "InCenterIfOutsideViewport";
    TextEditorRevealType[TextEditorRevealType["AtTop"] = 3] = "AtTop";
})(TextEditorRevealType = exports.TextEditorRevealType || (exports.TextEditorRevealType = {}));
/**
 * Describes the behavior of decorations when typing/editing near their edges.
 */
var TrackedRangeStickiness;
(function (TrackedRangeStickiness) {
    TrackedRangeStickiness[TrackedRangeStickiness["AlwaysGrowsWhenTypingAtEdges"] = 0] = "AlwaysGrowsWhenTypingAtEdges";
    TrackedRangeStickiness[TrackedRangeStickiness["NeverGrowsWhenTypingAtEdges"] = 1] = "NeverGrowsWhenTypingAtEdges";
    TrackedRangeStickiness[TrackedRangeStickiness["GrowsOnlyWhenTypingBefore"] = 2] = "GrowsOnlyWhenTypingBefore";
    TrackedRangeStickiness[TrackedRangeStickiness["GrowsOnlyWhenTypingAfter"] = 3] = "GrowsOnlyWhenTypingAfter";
})(TrackedRangeStickiness = exports.TrackedRangeStickiness || (exports.TrackedRangeStickiness = {}));
var WorkspaceTextEditDto;
(function (WorkspaceTextEditDto) {
    function is(arg) {
        return !!arg
            && 'resource' in arg
            && 'edit' in arg
            && arg.edit !== null
            && typeof arg.edit === 'object';
    }
    WorkspaceTextEditDto.is = is;
})(WorkspaceTextEditDto = exports.WorkspaceTextEditDto || (exports.WorkspaceTextEditDto = {}));
exports.LanguagesMainFactory = Symbol('LanguagesMainFactory');
exports.OutputChannelRegistryFactory = Symbol('OutputChannelRegistryFactory');
exports.PLUGIN_RPC_CONTEXT = {
    AUTHENTICATION_MAIN: rpc_protocol_1.createProxyIdentifier('AuthenticationMain'),
    COMMAND_REGISTRY_MAIN: rpc_protocol_1.createProxyIdentifier('CommandRegistryMain'),
    QUICK_OPEN_MAIN: rpc_protocol_1.createProxyIdentifier('QuickOpenMain'),
    DIALOGS_MAIN: rpc_protocol_1.createProxyIdentifier('DialogsMain'),
    WORKSPACE_MAIN: rpc_protocol_1.createProxyIdentifier('WorkspaceMain'),
    MESSAGE_REGISTRY_MAIN: rpc_protocol_1.createProxyIdentifier('MessageRegistryMain'),
    TEXT_EDITORS_MAIN: rpc_protocol_1.createProxyIdentifier('TextEditorsMain'),
    DOCUMENTS_MAIN: rpc_protocol_1.createProxyIdentifier('DocumentsMain'),
    STATUS_BAR_MESSAGE_REGISTRY_MAIN: rpc_protocol_1.createProxyIdentifier('StatusBarMessageRegistryMain'),
    ENV_MAIN: rpc_protocol_1.createProxyIdentifier('EnvMain'),
    NOTIFICATION_MAIN: rpc_protocol_1.createProxyIdentifier('NotificationMain'),
    TERMINAL_MAIN: rpc_protocol_1.createProxyIdentifier('TerminalServiceMain'),
    TREE_VIEWS_MAIN: rpc_protocol_1.createProxyIdentifier('TreeViewsMain'),
    PREFERENCE_REGISTRY_MAIN: rpc_protocol_1.createProxyIdentifier('PreferenceRegistryMain'),
    OUTPUT_CHANNEL_REGISTRY_MAIN: rpc_protocol_1.createProxyIdentifier('OutputChannelRegistryMain'),
    LANGUAGES_MAIN: rpc_protocol_1.createProxyIdentifier('LanguagesMain'),
    CONNECTION_MAIN: rpc_protocol_1.createProxyIdentifier('ConnectionMain'),
    WEBVIEWS_MAIN: rpc_protocol_1.createProxyIdentifier('WebviewsMain'),
    CUSTOM_EDITORS_MAIN: rpc_protocol_1.createProxyIdentifier('CustomEditorsMain'),
    STORAGE_MAIN: rpc_protocol_1.createProxyIdentifier('StorageMain'),
    TASKS_MAIN: rpc_protocol_1.createProxyIdentifier('TasksMain'),
    DEBUG_MAIN: rpc_protocol_1.createProxyIdentifier('DebugMain'),
    FILE_SYSTEM_MAIN: rpc_protocol_1.createProxyIdentifier('FileSystemMain'),
    SCM_MAIN: rpc_protocol_1.createProxyIdentifier('ScmMain'),
    DECORATIONS_MAIN: rpc_protocol_1.createProxyIdentifier('DecorationsMain'),
    WINDOW_MAIN: rpc_protocol_1.createProxyIdentifier('WindowMain'),
    CLIPBOARD_MAIN: rpc_protocol_1.createProxyIdentifier('ClipboardMain'),
    LABEL_SERVICE_MAIN: rpc_protocol_1.createProxyIdentifier('LabelServiceMain'),
    TIMELINE_MAIN: rpc_protocol_1.createProxyIdentifier('TimelineMain'),
    THEMING_MAIN: rpc_protocol_1.createProxyIdentifier('ThemingMain'),
    COMMENTS_MAIN: rpc_protocol_1.createProxyIdentifier('CommentsMain')
};
exports.MAIN_RPC_CONTEXT = {
    AUTHENTICATION_EXT: rpc_protocol_1.createProxyIdentifier('AuthenticationExt'),
    HOSTED_PLUGIN_MANAGER_EXT: rpc_protocol_1.createProxyIdentifier('PluginManagerExt'),
    COMMAND_REGISTRY_EXT: rpc_protocol_1.createProxyIdentifier('CommandRegistryExt'),
    QUICK_OPEN_EXT: rpc_protocol_1.createProxyIdentifier('QuickOpenExt'),
    WINDOW_STATE_EXT: rpc_protocol_1.createProxyIdentifier('WindowStateExt'),
    NOTIFICATION_EXT: rpc_protocol_1.createProxyIdentifier('NotificationExt'),
    WORKSPACE_EXT: rpc_protocol_1.createProxyIdentifier('WorkspaceExt'),
    TEXT_EDITORS_EXT: rpc_protocol_1.createProxyIdentifier('TextEditorsExt'),
    EDITORS_AND_DOCUMENTS_EXT: rpc_protocol_1.createProxyIdentifier('EditorsAndDocumentsExt'),
    DOCUMENTS_EXT: rpc_protocol_1.createProxyIdentifier('DocumentsExt'),
    TERMINAL_EXT: rpc_protocol_1.createProxyIdentifier('TerminalServiceExt'),
    OUTPUT_CHANNEL_REGISTRY_EXT: rpc_protocol_1.createProxyIdentifier('OutputChannelRegistryExt'),
    TREE_VIEWS_EXT: rpc_protocol_1.createProxyIdentifier('TreeViewsExt'),
    PREFERENCE_REGISTRY_EXT: rpc_protocol_1.createProxyIdentifier('PreferenceRegistryExt'),
    LANGUAGES_EXT: rpc_protocol_1.createProxyIdentifier('LanguagesExt'),
    CONNECTION_EXT: rpc_protocol_1.createProxyIdentifier('ConnectionExt'),
    WEBVIEWS_EXT: rpc_protocol_1.createProxyIdentifier('WebviewsExt'),
    CUSTOM_EDITORS_EXT: rpc_protocol_1.createProxyIdentifier('CustomEditorsExt'),
    STORAGE_EXT: rpc_protocol_1.createProxyIdentifier('StorageExt'),
    TASKS_EXT: rpc_protocol_1.createProxyIdentifier('TasksExt'),
    DEBUG_EXT: rpc_protocol_1.createProxyIdentifier('DebugExt'),
    FILE_SYSTEM_EXT: rpc_protocol_1.createProxyIdentifier('FileSystemExt'),
    ExtHostFileSystemEventService: rpc_protocol_1.createProxyIdentifier('ExtHostFileSystemEventService'),
    SCM_EXT: rpc_protocol_1.createProxyIdentifier('ScmExt'),
    DECORATIONS_EXT: rpc_protocol_1.createProxyIdentifier('DecorationsExt'),
    LABEL_SERVICE_EXT: rpc_protocol_1.createProxyIdentifier('LabelServiceExt'),
    TIMELINE_EXT: rpc_protocol_1.createProxyIdentifier('TimeLineExt'),
    THEMING_EXT: rpc_protocol_1.createProxyIdentifier('ThemingExt'),
    COMMENTS_EXT: rpc_protocol_1.createProxyIdentifier('CommentsExt')
};
//# sourceMappingURL=plugin-api-rpc.js.map