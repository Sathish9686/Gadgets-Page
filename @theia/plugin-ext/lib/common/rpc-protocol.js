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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// copied from https://github.com/Microsoft/vscode/blob/master/src/vs/workbench/services/extensions/node/rpcProtocol.ts
// with small modifications
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformErrorForSerialization = exports.RPCProtocolImpl = exports.ConnectionClosedError = exports.createProxyIdentifier = exports.ProxyIdentifier = exports.RPCProtocol = void 0;
var disposable_1 = require("@theia/core/lib/common/disposable");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var vscode_uri_1 = require("vscode-uri");
var uri_1 = require("@theia/core/lib/common/uri");
var vscode_languageserver_protocol_1 = require("vscode-languageserver-protocol");
var types_impl_1 = require("../plugin/types-impl");
var buffer_1 = require("@theia/core/lib/common/buffer");
exports.RPCProtocol = Symbol('RPCProtocol');
var ProxyIdentifier = /** @class */ (function () {
    function ProxyIdentifier(isMain, id) {
        this.isMain = isMain;
        // TODO this is nasty, rewrite this
        this.id = id.toString();
    }
    return ProxyIdentifier;
}());
exports.ProxyIdentifier = ProxyIdentifier;
function createProxyIdentifier(identifier) {
    return new ProxyIdentifier(false, identifier);
}
exports.createProxyIdentifier = createProxyIdentifier;
var ConnectionClosedError;
(function (ConnectionClosedError) {
    var code = 'RPC_PROTOCOL_CLOSED';
    function create(message) {
        if (message === void 0) { message = 'connection is closed'; }
        return Object.assign(new Error(message), { code: code });
    }
    ConnectionClosedError.create = create;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function is(error) {
        return !!error && typeof error === 'object' && 'code' in error && error['code'] === code;
    }
    ConnectionClosedError.is = is;
})(ConnectionClosedError = exports.ConnectionClosedError || (exports.ConnectionClosedError = {}));
var RPCProtocolImpl = /** @class */ (function () {
    function RPCProtocolImpl(connection, remoteHostID) {
        var _this = this;
        this.remoteHostID = remoteHostID;
        this.locals = new Map();
        this.proxies = new Map();
        this.lastMessageId = 0;
        this.cancellationTokenSources = new Map();
        this.pendingRPCReplies = new Map();
        this.toDispose = new disposable_1.DisposableCollection(disposable_1.Disposable.create(function () { }));
        this.toDispose.push(this.multiplexor = new RPCMultiplexer(connection, function (msg) { return _this.receiveOneMessage(msg); }, remoteHostID));
        this.toDispose.push(disposable_1.Disposable.create(function () {
            var e_1, _a;
            _this.proxies.clear();
            try {
                for (var _b = __values(_this.pendingRPCReplies.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var reply = _c.value;
                    reply.reject(ConnectionClosedError.create());
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            _this.pendingRPCReplies.clear();
        }));
    }
    Object.defineProperty(RPCProtocolImpl.prototype, "isDisposed", {
        get: function () {
            return this.toDispose.disposed;
        },
        enumerable: false,
        configurable: true
    });
    RPCProtocolImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    RPCProtocolImpl.prototype.getProxy = function (proxyId) {
        if (this.isDisposed) {
            throw ConnectionClosedError.create();
        }
        var proxy = this.proxies.get(proxyId.id);
        if (!proxy) {
            proxy = this.createProxy(proxyId.id);
            this.proxies.set(proxyId.id, proxy);
        }
        return proxy;
    };
    RPCProtocolImpl.prototype.set = function (identifier, instance) {
        var _this = this;
        if (this.isDisposed) {
            throw ConnectionClosedError.create();
        }
        this.locals.set(identifier.id, instance);
        if (disposable_1.Disposable.is(instance)) {
            this.toDispose.push(instance);
        }
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.locals.delete(identifier.id); }));
        return instance;
    };
    RPCProtocolImpl.prototype.createProxy = function (proxyId) {
        var _this = this;
        var handler = {
            get: function (target, name) {
                if (!target[name] && name.charCodeAt(0) === 36 /* CharCode.DollarSign */) {
                    target[name] = function () {
                        var myArgs = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            myArgs[_i] = arguments[_i];
                        }
                        return _this.remoteCall(proxyId, name, myArgs);
                    };
                }
                return target[name];
            }
        };
        return new Proxy(Object.create(null), handler);
    };
    RPCProtocolImpl.prototype.remoteCall = function (proxyId, methodName, args) {
        var _this = this;
        if (this.isDisposed) {
            return Promise.reject(ConnectionClosedError.create());
        }
        var cancellationToken = args.length && vscode_languageserver_protocol_1.CancellationToken.is(args[args.length - 1]) ? args.pop() : undefined;
        if (cancellationToken && cancellationToken.isCancellationRequested) {
            return Promise.reject(canceled());
        }
        var callId = String(++this.lastMessageId);
        var result = new promise_util_1.Deferred();
        if (cancellationToken) {
            args.push('add.cancellation.token');
            cancellationToken.onCancellationRequested(function () {
                return _this.multiplexor.send(MessageFactory.cancel(callId, _this.messageToSendHostId));
            });
        }
        this.pendingRPCReplies.set(callId, result);
        this.multiplexor.send(MessageFactory.request(callId, proxyId, methodName, args, this.messageToSendHostId));
        return result.promise;
    };
    RPCProtocolImpl.prototype.receiveOneMessage = function (rawmsg) {
        if (this.isDisposed) {
            return;
        }
        var msg = JSON.parse(rawmsg, ObjectsTransferrer.reviver);
        // handle message that sets the Host ID
        if (msg.setHostID) {
            this.messageToSendHostId = msg.setHostID;
            return;
        }
        // skip message if not matching host
        if (this.remoteHostID && msg.hostID && this.remoteHostID !== msg.hostID) {
            return;
        }
        switch (msg.type) {
            case 1 /* Request */:
                this.receiveRequest(msg);
                break;
            case 2 /* Reply */:
                this.receiveReply(msg);
                break;
            case 3 /* ReplyErr */:
                this.receiveReplyErr(msg);
                break;
            case 4 /* Cancel */:
                this.receiveCancel(msg);
                break;
        }
    };
    RPCProtocolImpl.prototype.receiveCancel = function (msg) {
        var cancellationTokenSource = this.cancellationTokenSources.get(msg.id);
        if (cancellationTokenSource) {
            cancellationTokenSource.cancel();
        }
    };
    RPCProtocolImpl.prototype.receiveRequest = function (msg) {
        var _this = this;
        var callId = msg.id;
        var proxyId = msg.proxyId;
        // convert `null` to `undefined`, since we don't use `null` in internal plugin APIs
        var args = msg.args.map(function (arg) { return arg === null ? undefined : arg; }); // eslint-disable-line no-null/no-null
        var addToken = args.length && args[args.length - 1] === 'add.cancellation.token' ? args.pop() : false;
        if (addToken) {
            var tokenSource = new vscode_languageserver_protocol_1.CancellationTokenSource();
            this.cancellationTokenSources.set(callId, tokenSource);
            args.push(tokenSource.token);
        }
        var invocation = this.invokeHandler(proxyId, msg.method, args);
        invocation.then(function (result) {
            _this.cancellationTokenSources.delete(callId);
            _this.multiplexor.send(MessageFactory.replyOK(callId, result, _this.messageToSendHostId));
        }, function (error) {
            _this.cancellationTokenSources.delete(callId);
            _this.multiplexor.send(MessageFactory.replyErr(callId, error, _this.messageToSendHostId));
        });
    };
    RPCProtocolImpl.prototype.receiveReply = function (msg) {
        var callId = msg.id;
        var pendingReply = this.pendingRPCReplies.get(callId);
        if (!pendingReply) {
            return;
        }
        this.pendingRPCReplies.delete(callId);
        pendingReply.resolve(msg.res);
    };
    RPCProtocolImpl.prototype.receiveReplyErr = function (msg) {
        var callId = msg.id;
        var pendingReply = this.pendingRPCReplies.get(callId);
        if (!pendingReply) {
            return;
        }
        this.pendingRPCReplies.delete(callId);
        var err = undefined;
        if (msg.err && msg.err.$isError) {
            err = new Error();
            err.name = msg.err.name;
            err.message = msg.err.message;
            err.stack = msg.err.stack;
        }
        pendingReply.reject(err);
    };
    RPCProtocolImpl.prototype.invokeHandler = function (proxyId, methodName, args) {
        try {
            return Promise.resolve(this.doInvokeHandler(proxyId, methodName, args));
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    RPCProtocolImpl.prototype.doInvokeHandler = function (proxyId, methodName, args) {
        var actor = this.locals.get(proxyId);
        if (!actor) {
            throw new Error('Unknown actor ' + proxyId);
        }
        var method = actor[methodName];
        if (typeof method !== 'function') {
            throw new Error('Unknown method ' + methodName + ' on actor ' + proxyId);
        }
        return method.apply(actor, args);
    };
    return RPCProtocolImpl;
}());
exports.RPCProtocolImpl = RPCProtocolImpl;
function canceled() {
    var error = new Error('Canceled');
    error.name = error.message;
    return error;
}
/**
 * Sends/Receives multiple messages in one go:
 *  - multiple messages to be sent from one stack get sent in bulk at `process.nextTick`.
 *  - each incoming message is handled in a separate `process.nextTick`.
 */
var RPCMultiplexer = /** @class */ (function () {
    function RPCMultiplexer(connection, onMessage, remoteHostId) {
        var _this = this;
        this.toDispose = new disposable_1.DisposableCollection();
        this.connection = connection;
        this.sendAccumulatedBound = this.sendAccumulated.bind(this);
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.messagesToSend = []; }));
        this.toDispose.push(this.connection.onMessage(function (data) {
            var len = data.length;
            for (var i = 0; i < len; i++) {
                onMessage(data[i]);
            }
        }));
        this.messagesToSend = [];
        if (remoteHostId) {
            this.send("{\"setHostID\":\"" + remoteHostId + "\"}");
        }
    }
    RPCMultiplexer.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    RPCMultiplexer.prototype.sendAccumulated = function () {
        var tmp = this.messagesToSend;
        this.messagesToSend = [];
        this.connection.send(tmp);
    };
    RPCMultiplexer.prototype.send = function (msg) {
        if (this.toDispose.disposed) {
            throw ConnectionClosedError.create();
        }
        if (this.messagesToSend.length === 0) {
            if (typeof setImmediate !== 'undefined') {
                setImmediate(this.sendAccumulatedBound);
            }
            else {
                setTimeout(this.sendAccumulatedBound, 0);
            }
        }
        this.messagesToSend.push(msg);
    };
    return RPCMultiplexer;
}());
var MessageFactory = /** @class */ (function () {
    function MessageFactory() {
    }
    MessageFactory.cancel = function (req, messageToSendHostId) {
        var prefix = '';
        if (messageToSendHostId) {
            prefix = "\"hostID\":\"" + messageToSendHostId + "\",";
        }
        return "{" + prefix + "\"type\":" + 4 /* Cancel */ + ",\"id\":\"" + req + "\"}";
    };
    MessageFactory.request = function (req, rpcId, method, args, messageToSendHostId) {
        var prefix = '';
        if (messageToSendHostId) {
            prefix = "\"hostID\":\"" + messageToSendHostId + "\",";
        }
        return "{" + prefix + "\"type\":" + 1 /* Request */ + ",\"id\":\"" + req + "\",\"proxyId\":\"" + rpcId + "\",\"method\":\"" + method + "\",\"args\":" + JSON.stringify(args, ObjectsTransferrer.replacer) + "}";
    };
    MessageFactory.replyOK = function (req, res, messageToSendHostId) {
        var prefix = '';
        if (messageToSendHostId) {
            prefix = "\"hostID\":\"" + messageToSendHostId + "\",";
        }
        if (typeof res === 'undefined') {
            return "{" + prefix + "\"type\":" + 2 /* Reply */ + ",\"id\":\"" + req + "\"}";
        }
        return "{" + prefix + "\"type\":" + 2 /* Reply */ + ",\"id\":\"" + req + "\",\"res\":" + safeStringify(res, ObjectsTransferrer.replacer) + "}";
    };
    MessageFactory.replyErr = function (req, err, messageToSendHostId) {
        var prefix = '';
        if (messageToSendHostId) {
            prefix = "\"hostID\":\"" + messageToSendHostId + "\",";
        }
        err = typeof err === 'string' ? new Error(err) : err;
        if (err instanceof Error) {
            return "{" + prefix + "\"type\":" + 3 /* ReplyErr */ + ",\"id\":\"" + req + "\",\"err\":" + safeStringify(transformErrorForSerialization(err)) + "}";
        }
        return "{" + prefix + "\"type\":" + 3 /* ReplyErr */ + ",\"id\":\"" + req + "\",\"err\":null}";
    };
    return MessageFactory;
}());
/**
 * These functions are responsible for correct transferring objects via rpc channel.
 *
 * To reach that some specific kind of objects is converted to json in some custom way
 * and then, after receiving, revived to objects again,
 * so there is feeling that object was transferred via rpc channel.
 *
 * To distinguish between regular and altered objects, field $type is added to altered ones.
 * Also value of that field specifies kind of the object.
 */
var ObjectsTransferrer;
(function (ObjectsTransferrer) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function replacer(key, value) {
        if (value instanceof uri_1.default) {
            return {
                $type: SerializedObjectType.THEIA_URI,
                data: value.toString()
            };
        }
        else if (value instanceof types_impl_1.Range) {
            var range = value;
            var serializedValue = {
                start: {
                    line: range.start.line,
                    character: range.start.character
                },
                end: {
                    line: range.end.line,
                    character: range.end.character
                }
            };
            return {
                $type: SerializedObjectType.THEIA_RANGE,
                data: JSON.stringify(serializedValue)
            };
        }
        else if (value && value['$mid'] === 1) {
            // Given value is VSCode URI
            // We cannot use instanceof here because VSCode URI has toJSON method which is invoked before this replacer.
            var uri = vscode_uri_1.URI.revive(value);
            return {
                $type: SerializedObjectType.VSCODE_URI,
                data: uri.toString()
            };
        }
        else if (value instanceof buffer_1.BinaryBuffer) {
            var bytes = __spread(value.buffer.values());
            return {
                $type: SerializedObjectType.TEXT_BUFFER,
                data: JSON.stringify({ bytes: bytes })
            };
        }
        return value;
    }
    ObjectsTransferrer.replacer = replacer;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function reviver(key, value) {
        if (isSerializedObject(value)) {
            switch (value.$type) {
                case SerializedObjectType.THEIA_URI:
                    return new uri_1.default(value.data);
                case SerializedObjectType.VSCODE_URI:
                    return vscode_uri_1.URI.parse(value.data);
                case SerializedObjectType.THEIA_RANGE:
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var obj = JSON.parse(value.data);
                    var start = new types_impl_1.Position(obj.start.line, obj.start.character);
                    var end = new types_impl_1.Position(obj.end.line, obj.end.character);
                    return new types_impl_1.Range(start, end);
                case SerializedObjectType.TEXT_BUFFER:
                    var data = JSON.parse(value.data);
                    return buffer_1.BinaryBuffer.wrap(Uint8Array.from(data.bytes));
            }
        }
        return value;
    }
    ObjectsTransferrer.reviver = reviver;
})(ObjectsTransferrer || (ObjectsTransferrer = {}));
var SerializedObjectType;
(function (SerializedObjectType) {
    SerializedObjectType[SerializedObjectType["THEIA_URI"] = 0] = "THEIA_URI";
    SerializedObjectType[SerializedObjectType["VSCODE_URI"] = 1] = "VSCODE_URI";
    SerializedObjectType[SerializedObjectType["THEIA_RANGE"] = 2] = "THEIA_RANGE";
    SerializedObjectType[SerializedObjectType["TEXT_BUFFER"] = 3] = "TEXT_BUFFER";
})(SerializedObjectType || (SerializedObjectType = {}));
function isSerializedObject(obj) {
    return obj && obj.$type !== undefined && obj.data !== undefined;
}
var CancelMessage = /** @class */ (function () {
    function CancelMessage() {
    }
    return CancelMessage;
}());
var RequestMessage = /** @class */ (function () {
    function RequestMessage() {
    }
    return RequestMessage;
}());
var ReplyMessage = /** @class */ (function () {
    function ReplyMessage() {
    }
    return ReplyMessage;
}());
var ReplyErrMessage = /** @class */ (function () {
    function ReplyErrMessage() {
    }
    return ReplyErrMessage;
}());
function transformErrorForSerialization(error) {
    if (error instanceof Error) {
        var name_1 = error.name, message = error.message;
        var stack = error.stacktrace || error.stack;
        return {
            $isError: true,
            name: name_1,
            message: message,
            stack: stack
        };
    }
    // return as is
    return error;
}
exports.transformErrorForSerialization = transformErrorForSerialization;
function safeStringify(obj, replacer) {
    try {
        return JSON.stringify(obj, replacer);
    }
    catch (err) {
        return 'null';
    }
}
//# sourceMappingURL=rpc-protocol.js.map