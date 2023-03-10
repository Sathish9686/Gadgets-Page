/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { DelegatedLogService } from './log';
import { Event } from '../../../base/common/event';
var LoggerChannel = /** @class */ (function () {
    function LoggerChannel(service) {
        this.service = service;
        this.onDidChangeLogLevel = Event.buffer(service.onDidChangeLogLevel, true);
    }
    LoggerChannel.prototype.listen = function (_, event) {
        switch (event) {
            case 'onDidChangeLogLevel': return this.onDidChangeLogLevel;
        }
        throw new Error("Event not found: " + event);
    };
    LoggerChannel.prototype.call = function (_, command, arg) {
        switch (command) {
            case 'setLevel':
                this.service.setLevel(arg);
                return Promise.resolve();
            case 'consoleLog':
                this.consoleLog(arg[0], arg[1]);
                return Promise.resolve();
        }
        throw new Error("Call not found: " + command);
    };
    LoggerChannel.prototype.consoleLog = function (severity, args) {
        var consoleFn = console.log;
        switch (severity) {
            case 'error':
                consoleFn = console.error;
                break;
            case 'warn':
                consoleFn = console.warn;
                break;
            case 'info':
                consoleFn = console.info;
                break;
        }
        consoleFn.call.apply(consoleFn, __spreadArrays([console], args));
    };
    return LoggerChannel;
}());
export { LoggerChannel };
var LoggerChannelClient = /** @class */ (function () {
    function LoggerChannelClient(channel) {
        this.channel = channel;
    }
    Object.defineProperty(LoggerChannelClient.prototype, "onDidChangeLogLevel", {
        get: function () {
            return this.channel.listen('onDidChangeLogLevel');
        },
        enumerable: true,
        configurable: true
    });
    LoggerChannelClient.prototype.setLevel = function (level) {
        LoggerChannelClient.setLevel(this.channel, level);
    };
    LoggerChannelClient.setLevel = function (channel, level) {
        return channel.call('setLevel', level);
    };
    LoggerChannelClient.prototype.consoleLog = function (severity, args) {
        this.channel.call('consoleLog', [severity, args]);
    };
    return LoggerChannelClient;
}());
export { LoggerChannelClient };
var FollowerLogService = /** @class */ (function (_super) {
    __extends(FollowerLogService, _super);
    function FollowerLogService(master, logService) {
        var _this = _super.call(this, logService) || this;
        _this.master = master;
        _this._register(master.onDidChangeLogLevel(function (level) { return logService.setLevel(level); }));
        return _this;
    }
    FollowerLogService.prototype.setLevel = function (level) {
        _super.prototype.setLevel.call(this, level);
        this.master.setLevel(level);
    };
    return FollowerLogService;
}(DelegatedLogService));
export { FollowerLogService };
