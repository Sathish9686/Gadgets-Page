/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_jsonrpc_1 = require("vscode-jsonrpc");
exports.ErrorCodes = vscode_jsonrpc_1.ErrorCodes;
exports.ResponseError = vscode_jsonrpc_1.ResponseError;
exports.CancellationToken = vscode_jsonrpc_1.CancellationToken;
exports.CancellationTokenSource = vscode_jsonrpc_1.CancellationTokenSource;
exports.Disposable = vscode_jsonrpc_1.Disposable;
exports.Event = vscode_jsonrpc_1.Event;
exports.Emitter = vscode_jsonrpc_1.Emitter;
exports.Trace = vscode_jsonrpc_1.Trace;
exports.TraceFormat = vscode_jsonrpc_1.TraceFormat;
exports.SetTraceNotification = vscode_jsonrpc_1.SetTraceNotification;
exports.LogTraceNotification = vscode_jsonrpc_1.LogTraceNotification;
exports.RequestType = vscode_jsonrpc_1.RequestType;
exports.RequestType0 = vscode_jsonrpc_1.RequestType0;
exports.NotificationType = vscode_jsonrpc_1.NotificationType;
exports.NotificationType0 = vscode_jsonrpc_1.NotificationType0;
exports.MessageReader = vscode_jsonrpc_1.MessageReader;
exports.MessageWriter = vscode_jsonrpc_1.MessageWriter;
exports.ConnectionStrategy = vscode_jsonrpc_1.ConnectionStrategy;
exports.StreamMessageReader = vscode_jsonrpc_1.StreamMessageReader;
exports.StreamMessageWriter = vscode_jsonrpc_1.StreamMessageWriter;
exports.IPCMessageReader = vscode_jsonrpc_1.IPCMessageReader;
exports.IPCMessageWriter = vscode_jsonrpc_1.IPCMessageWriter;
exports.createClientPipeTransport = vscode_jsonrpc_1.createClientPipeTransport;
exports.createServerPipeTransport = vscode_jsonrpc_1.createServerPipeTransport;
exports.generateRandomPipeName = vscode_jsonrpc_1.generateRandomPipeName;
exports.createClientSocketTransport = vscode_jsonrpc_1.createClientSocketTransport;
exports.createServerSocketTransport = vscode_jsonrpc_1.createServerSocketTransport;
exports.ProgressType = vscode_jsonrpc_1.ProgressType;
__export(require("vscode-languageserver-types"));
__export(require("./protocol"));
const callHierarchy = require("./protocol.callHierarchy.proposed");
const st = require("./protocol.sematicTokens.proposed");
var Proposed;
(function (Proposed) {
    let CallHierarchyPrepareRequest;
    (function (CallHierarchyPrepareRequest) {
        CallHierarchyPrepareRequest.method = callHierarchy.CallHierarchyPrepareRequest.method;
        CallHierarchyPrepareRequest.type = callHierarchy.CallHierarchyPrepareRequest.type;
    })(CallHierarchyPrepareRequest = Proposed.CallHierarchyPrepareRequest || (Proposed.CallHierarchyPrepareRequest = {}));
    let CallHierarchyIncomingCallsRequest;
    (function (CallHierarchyIncomingCallsRequest) {
        CallHierarchyIncomingCallsRequest.method = callHierarchy.CallHierarchyIncomingCallsRequest.method;
        CallHierarchyIncomingCallsRequest.type = callHierarchy.CallHierarchyIncomingCallsRequest.type;
    })(CallHierarchyIncomingCallsRequest = Proposed.CallHierarchyIncomingCallsRequest || (Proposed.CallHierarchyIncomingCallsRequest = {}));
    let CallHierarchyOutgoingCallsRequest;
    (function (CallHierarchyOutgoingCallsRequest) {
        CallHierarchyOutgoingCallsRequest.method = callHierarchy.CallHierarchyOutgoingCallsRequest.method;
        CallHierarchyOutgoingCallsRequest.type = callHierarchy.CallHierarchyOutgoingCallsRequest.type;
    })(CallHierarchyOutgoingCallsRequest = Proposed.CallHierarchyOutgoingCallsRequest || (Proposed.CallHierarchyOutgoingCallsRequest = {}));
    Proposed.SemanticTokenTypes = st.SemanticTokenTypes;
    Proposed.SemanticTokenModifiers = st.SemanticTokenModifiers;
    Proposed.SemanticTokens = st.SemanticTokens;
    let SemanticTokensRequest;
    (function (SemanticTokensRequest) {
        SemanticTokensRequest.method = st.SemanticTokensRequest.method;
        SemanticTokensRequest.type = st.SemanticTokensRequest.type;
    })(SemanticTokensRequest = Proposed.SemanticTokensRequest || (Proposed.SemanticTokensRequest = {}));
    let SemanticTokensEditsRequest;
    (function (SemanticTokensEditsRequest) {
        SemanticTokensEditsRequest.method = st.SemanticTokensEditsRequest.method;
        SemanticTokensEditsRequest.type = st.SemanticTokensEditsRequest.type;
    })(SemanticTokensEditsRequest = Proposed.SemanticTokensEditsRequest || (Proposed.SemanticTokensEditsRequest = {}));
    let SemanticTokensRangeRequest;
    (function (SemanticTokensRangeRequest) {
        SemanticTokensRangeRequest.method = st.SemanticTokensRangeRequest.method;
        SemanticTokensRangeRequest.type = st.SemanticTokensRangeRequest.type;
    })(SemanticTokensRangeRequest = Proposed.SemanticTokensRangeRequest || (Proposed.SemanticTokensRangeRequest = {}));
})(Proposed = exports.Proposed || (exports.Proposed = {}));
function createProtocolConnection(reader, writer, logger, strategy) {
    return vscode_jsonrpc_1.createMessageConnection(reader, writer, logger, strategy);
}
exports.createProtocolConnection = createProtocolConnection;
