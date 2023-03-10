"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
exports.MessagingContribution = exports.MessagingContainer = void 0;
var ws = require("ws");
var url = require("url");
var inversify_1 = require("inversify");
var connection_1 = require("vscode-ws-jsonrpc/lib/socket/connection");
var launch = require("vscode-ws-jsonrpc/lib/server/launch");
var common_1 = require("../../common");
var web_socket_channel_1 = require("../../common/messaging/web-socket-channel");
var messaging_service_1 = require("./messaging-service");
var logger_1 = require("./logger");
var connection_container_module_1 = require("./connection-container-module");
var Route = require("route-parser");
var ws_request_validators_1 = require("../ws-request-validators");
exports.MessagingContainer = Symbol('MessagingContainer');
var MessagingContribution = /** @class */ (function () {
    function MessagingContribution() {
        this.wsHandlers = new MessagingContribution_1.ConnectionHandlers();
        this.channelHandlers = new MessagingContribution_1.ConnectionHandlers();
        this.checkAliveTimeout = 30000;
    }
    MessagingContribution_1 = MessagingContribution;
    MessagingContribution.prototype.init = function () {
        var e_1, _a;
        var _this = this;
        this.ws(web_socket_channel_1.WebSocketChannel.wsPath, function (_, socket) { return _this.handleChannels(socket); });
        try {
            for (var _b = __values(this.contributions.getContributions()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var contribution = _c.value;
                contribution.configure(this);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    MessagingContribution.prototype.listen = function (spec, callback) {
        this.wsChannel(spec, function (params, channel) {
            var connection = connection_1.createWebSocketConnection(channel, new logger_1.ConsoleLogger());
            callback(params, connection);
        });
    };
    MessagingContribution.prototype.forward = function (spec, callback) {
        this.wsChannel(spec, function (params, channel) {
            var connection = launch.createWebSocketConnection(channel);
            callback(params, messaging_service_1.WebSocketChannelConnection.create(connection, channel));
        });
    };
    MessagingContribution.prototype.wsChannel = function (spec, callback) {
        this.channelHandlers.push(spec, function (params, channel) { return callback(params, channel); });
    };
    MessagingContribution.prototype.ws = function (spec, callback) {
        this.wsHandlers.push(spec, callback);
    };
    MessagingContribution.prototype.onStart = function (server) {
        var _this = this;
        this.webSocketServer = new ws.Server({
            noServer: true,
            perMessageDeflate: {
                // don't compress if a message is less than 256kb
                threshold: 256 * 1024
            }
        });
        server.on('upgrade', this.handleHttpUpgrade.bind(this));
        this.webSocketServer.on('connection', function (socket, request) {
            socket.alive = true;
            socket.on('pong', function () { return socket.alive = true; });
            _this.handleConnection(socket, request);
        });
        setInterval(function () {
            _this.webSocketServer.clients.forEach(function (socket) {
                if (socket.alive === false) {
                    socket.terminate();
                    return;
                }
                socket.alive = false;
                socket.ping();
            });
        }, this.checkAliveTimeout);
    };
    /**
     * Route HTTP upgrade requests to the WebSocket server.
     */
    MessagingContribution.prototype.handleHttpUpgrade = function (request, socket, head) {
        var _this = this;
        this.wsRequestValidator.allowWsUpgrade(request).then(function (allowed) {
            if (allowed) {
                _this.webSocketServer.handleUpgrade(request, socket, head, function (client) {
                    _this.webSocketServer.emit('connection', client, request);
                });
            }
            else {
                console.error("refused a websocket connection: " + request.connection.remoteAddress);
                socket.write('HTTP/1.1 403 Forbidden\n\n');
                socket.destroy();
            }
        }, function (error) {
            console.error(error);
            socket.write('HTTP/1.1 500 Internal Error\n\n');
            socket.destroy();
        });
    };
    MessagingContribution.prototype.handleConnection = function (socket, request) {
        var pathname = request.url && url.parse(request.url).pathname;
        if (pathname && !this.wsHandlers.route(pathname, socket)) {
            console.error('Cannot find a ws handler for the path: ' + pathname);
        }
    };
    MessagingContribution.prototype.handleChannels = function (socket) {
        var _this = this;
        var channelHandlers = this.getConnectionChannelHandlers(socket);
        var channels = new Map();
        socket.on('message', function (data) {
            try {
                var message = JSON.parse(data.toString());
                if (message.kind === 'open') {
                    var id_1 = message.id, path_1 = message.path;
                    var channel = _this.createChannel(id_1, socket);
                    if (channelHandlers.route(path_1, channel)) {
                        channel.ready();
                        console.debug("Opening channel for service path '" + path_1 + "'. [ID: " + id_1 + "]");
                        channels.set(id_1, channel);
                        channel.onClose(function () {
                            console.debug("Closing channel on service path '" + path_1 + "'. [ID: " + id_1 + "]");
                            channels.delete(id_1);
                        });
                    }
                    else {
                        console.error('Cannot find a service for the path: ' + path_1);
                    }
                }
                else {
                    var id = message.id;
                    var channel = channels.get(id);
                    if (channel) {
                        channel.handleMessage(message);
                    }
                    else {
                        console.error('The ws channel does not exist', id);
                    }
                }
            }
            catch (error) {
                console.error('Failed to handle message', { error: error, data: data });
            }
        });
        socket.on('error', function (err) {
            var e_2, _a;
            try {
                for (var _b = __values(channels.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var channel = _c.value;
                    channel.fireError(err);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
        socket.on('close', function (code, reason) {
            var e_3, _a;
            try {
                for (var _b = __values(__spread(channels.values())), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var channel = _c.value;
                    channel.close(code, reason);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            channels.clear();
        });
    };
    MessagingContribution.prototype.createSocketContainer = function (socket) {
        var connectionContainer = this.container.createChild();
        connectionContainer.bind(ws).toConstantValue(socket);
        return connectionContainer;
    };
    MessagingContribution.prototype.getConnectionChannelHandlers = function (socket) {
        var e_4, _a;
        var connectionContainer = this.createSocketContainer(socket);
        common_1.bindContributionProvider(connectionContainer, common_1.ConnectionHandler);
        connectionContainer.load.apply(connectionContainer, __spread(this.connectionModules.getContributions()));
        var connectionChannelHandlers = new MessagingContribution_1.ConnectionHandlers(this.channelHandlers);
        var connectionHandlers = connectionContainer.getNamed(common_1.ContributionProvider, common_1.ConnectionHandler);
        var _loop_1 = function (connectionHandler) {
            connectionChannelHandlers.push(connectionHandler.path, function (_, channel) {
                var connection = connection_1.createWebSocketConnection(channel, new logger_1.ConsoleLogger());
                connectionHandler.onConnection(connection);
            });
        };
        try {
            for (var _b = __values(connectionHandlers.getContributions(true)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var connectionHandler = _c.value;
                _loop_1(connectionHandler);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return connectionChannelHandlers;
    };
    MessagingContribution.prototype.createChannel = function (id, socket) {
        return new web_socket_channel_1.WebSocketChannel(id, function (content) {
            if (socket.readyState < ws.CLOSING) {
                socket.send(content, function (err) {
                    if (err) {
                        throw err;
                    }
                });
            }
        });
    };
    var MessagingContribution_1;
    __decorate([
        inversify_1.inject(exports.MessagingContainer),
        __metadata("design:type", Object)
    ], MessagingContribution.prototype, "container", void 0);
    __decorate([
        inversify_1.inject(common_1.ContributionProvider),
        inversify_1.named(connection_container_module_1.ConnectionContainerModule),
        __metadata("design:type", Object)
    ], MessagingContribution.prototype, "connectionModules", void 0);
    __decorate([
        inversify_1.inject(common_1.ContributionProvider),
        inversify_1.named(messaging_service_1.MessagingService.Contribution),
        __metadata("design:type", Object)
    ], MessagingContribution.prototype, "contributions", void 0);
    __decorate([
        inversify_1.inject(ws_request_validators_1.WsRequestValidator),
        __metadata("design:type", ws_request_validators_1.WsRequestValidator)
    ], MessagingContribution.prototype, "wsRequestValidator", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MessagingContribution.prototype, "init", null);
    MessagingContribution = MessagingContribution_1 = __decorate([
        inversify_1.injectable()
    ], MessagingContribution);
    return MessagingContribution;
}());
exports.MessagingContribution = MessagingContribution;
(function (MessagingContribution) {
    var ConnectionHandlers = /** @class */ (function () {
        function ConnectionHandlers(parent) {
            this.parent = parent;
            this.handlers = [];
        }
        ConnectionHandlers.prototype.push = function (spec, callback) {
            var route = new Route(spec);
            this.handlers.push(function (path, channel) {
                var params = route.match(path);
                if (!params) {
                    return false;
                }
                callback(params, channel);
                return route.reverse(params);
            });
        };
        ConnectionHandlers.prototype.route = function (path, connection) {
            var e_5, _a;
            try {
                for (var _b = __values(this.handlers), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var handler = _c.value;
                    try {
                        var result = handler(path, connection);
                        if (result) {
                            return result;
                        }
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
            if (this.parent) {
                return this.parent.route(path, connection);
            }
            return false;
        };
        return ConnectionHandlers;
    }());
    MessagingContribution.ConnectionHandlers = ConnectionHandlers;
})(MessagingContribution = exports.MessagingContribution || (exports.MessagingContribution = {}));
exports.MessagingContribution = MessagingContribution;
//# sourceMappingURL=messaging-contribution.js.map