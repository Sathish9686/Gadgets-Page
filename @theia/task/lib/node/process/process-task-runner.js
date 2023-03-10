"use strict";
/********************************************************************************
 * Copyright (C) 2017-2019 Ericsson and others.
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.ProcessTaskRunner = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var node_1 = require("@theia/core/lib/node");
var node_2 = require("@theia/process/lib/node");
var shell_quoting_1 = require("@theia/process/lib/common/shell-quoting");
var process_task_1 = require("./process-task");
var task_protocol_1 = require("../../common/process/task-protocol");
var fs = require("fs");
var shell_process_1 = require("@theia/terminal/lib/node/shell-process");
var core_2 = require("@theia/core");
/**
 * Task runner that runs a task as a process or a command inside a shell.
 */
var ProcessTaskRunner = /** @class */ (function () {
    function ProcessTaskRunner() {
    }
    /**
     * Runs a task from the given task configuration.
     * @param taskConfig task configuration to run a task from. The provided task configuration must have a shape of `CommandProperties`.
     */
    ProcessTaskRunner.prototype.run = function (taskConfig, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var terminalProcessOptions, terminal_1, processType, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!taskConfig.command) {
                            throw new Error("Process task config must have 'command' property specified");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        terminalProcessOptions = this.getResolvedCommand(taskConfig);
                        terminal_1 = this.terminalProcessFactory(terminalProcessOptions);
                        // Wait for the confirmation that the process is successfully started, or has failed to start.
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                terminal_1.onStart(resolve);
                                terminal_1.onError(function (error) {
                                    reject(task_protocol_1.ProcessTaskError.CouldNotRun(error.code));
                                });
                            })];
                    case 2:
                        // Wait for the confirmation that the process is successfully started, or has failed to start.
                        _a.sent();
                        processType = taskConfig.type;
                        return [2 /*return*/, this.taskFactory({
                                label: taskConfig.label,
                                process: terminal_1,
                                processType: processType,
                                context: ctx,
                                config: taskConfig,
                                command: this.getCommand(processType, terminalProcessOptions)
                            })];
                    case 3:
                        error_1 = _a.sent();
                        this.logger.error("Error occurred while creating task: " + error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessTaskRunner.prototype.getResolvedCommand = function (taskConfig) {
        var _this = this;
        var systemSpecificCommand;
        // on windows, windows-specific options, if available, take precedence
        if (core_1.isWindows && taskConfig.windows !== undefined) {
            systemSpecificCommand = this.getSystemSpecificCommand(taskConfig, 'windows');
        }
        else if (core_1.isOSX && taskConfig.osx !== undefined) { // on macOS, mac-specific options, if available, take precedence
            systemSpecificCommand = this.getSystemSpecificCommand(taskConfig, 'osx');
        }
        else if (!core_1.isWindows && !core_1.isOSX && taskConfig.linux !== undefined) { // on linux, linux-specific options, if available, take precedence
            systemSpecificCommand = this.getSystemSpecificCommand(taskConfig, 'linux');
        }
        else { // system-specific options are unavailable, use the default
            systemSpecificCommand = this.getSystemSpecificCommand(taskConfig, undefined);
        }
        var options = systemSpecificCommand.options;
        // Use task's cwd with spawned process and pass node env object to
        // new process, so e.g. we can re-use the system path
        if (options) {
            options.env = __assign(__assign({}, process.env), (options.env || {}));
        }
        if (typeof systemSpecificCommand.command === 'undefined') {
            throw new Error('The `command` field of a task cannot be undefined.');
        }
        /** Executable to actually spawn. */
        var command;
        /** List of arguments passed to `command`. */
        var args;
        /**
         * Only useful on Windows, has to do with how node-pty handles complex commands.
         * This string should not include the executable, only what comes after it (arguments).
         */
        var commandLine;
        if (taskConfig.type === 'shell') {
            // When running a shell task, we have to spawn a shell process somehow,
            // and tell it to run the command the user wants to run inside of it.
            //
            // E.g:
            // - Spawning a process:
            //     spawn(process_exe, [...args])
            // - Spawning a shell and run a command:
            //     spawn(shell_exe, [shell_exec_cmd_flag, command])
            //
            // The fun part is, the `command` to pass as an argument usually has to be
            // what you would type verbatim inside the shell, so escaping rules apply.
            //
            // What's even more funny is that on Windows, node-pty uses a special
            // mechanism to pass complex escaped arguments, via a string.
            //
            // We need to accommodate for most shells, so we need to get specific.
            /** Shell command to run: */
            var shellCommand = void 0;
            /** Arguments passed to the shell, aka `command` here. */
            var execArgs = [];
            /** Pack of functions used to escape the `subCommand` and `subArgs` to run in the shell. */
            var quotingFunctions_1;
            var shell = systemSpecificCommand.options.shell;
            command = shell && shell.executable || shell_process_1.ShellProcess.getShellExecutablePath();
            args = [];
            if (/bash(.exe)?$/.test(command)) {
                quotingFunctions_1 = shell_quoting_1.BashQuotingFunctions;
                execArgs = ['-c'];
            }
            else if (/wsl(.exe)?$/.test(command)) {
                quotingFunctions_1 = shell_quoting_1.BashQuotingFunctions;
                execArgs = ['-e'];
            }
            else if (/cmd(.exe)?$/.test(command)) {
                quotingFunctions_1 = shell_quoting_1.CmdQuotingFunctions;
                execArgs = ['/S', '/C'];
            }
            else if (/(ps|pwsh|powershell)(.exe)?/.test(command)) {
                quotingFunctions_1 = shell_quoting_1.PowershellQuotingFunctions;
                execArgs = ['-c'];
            }
            else {
                quotingFunctions_1 = shell_quoting_1.BashQuotingFunctions;
                execArgs = ['-l', '-c'];
            }
            // Allow overriding shell options from task configuration.
            if (shell && shell.args) {
                args = __spread(shell.args);
            }
            else {
                args = __spread(execArgs);
            }
            // Check if an argument list is defined or not. Empty is ok.
            if (Array.isArray(systemSpecificCommand.args)) {
                var commandLineElements = __spread([systemSpecificCommand.command], systemSpecificCommand.args).map(function (arg) {
                    // We want to quote arguments only if needed.
                    if (quotingFunctions_1 && typeof arg === 'string' && _this.argumentNeedsQuotes(arg, quotingFunctions_1)) {
                        return {
                            quoting: "strong" /* Strong */,
                            value: arg,
                        };
                    }
                    else {
                        return arg;
                    }
                });
                shellCommand = shell_quoting_1.createShellCommandLine(commandLineElements, quotingFunctions_1);
            }
            else {
                // No arguments are provided, so `command` is actually the full command line to execute.
                shellCommand = systemSpecificCommand.command;
            }
            if (core_1.isWindows && /cmd(.exe)?$/.test(command)) {
                // Let's take the following command, including an argument containing whitespace:
                //     cmd> node -p process.argv 1 2 "  3"
                //
                // We would expect the following output:
                //     json> [ '...\\node.exe', '1', '2', '  3' ]
                //
                // Let's run this command through `cmd.exe` using `child_process`:
                //     js> void childprocess.spawn('cmd.exe', ['/s', '/c', 'node -p process.argv 1 2 "  3"']).stderr.on('data', console.log)
                //
                // We get the correct output, but when using node-pty:
                //     js> void nodepty.spawn('cmd.exe', ['/s', '/c', 'node -p process.argv 1 2 "  3"']).on('data', console.log)
                //
                // Then the output looks like:
                //     json> [ '...\\node.exe', '1', '2', '"', '3"' ]
                //
                // To fix that, we need to use a special node-pty feature and pass arguments as one string:
                //     js> nodepty.spawn('cmd.exe', '/s /c "node -p process.argv 1 2 "  3""')
                //
                // Note the extra quotes that need to be added around the whole command.
                commandLine = __spread(args, ["\"" + shellCommand + "\""]).join(' ');
            }
            args.push(shellCommand);
        }
        else {
            // When running process tasks, `command` is the executable to run,
            // and `args` are the arguments we want to pass to it.
            command = systemSpecificCommand.command;
            if (Array.isArray(systemSpecificCommand.args)) {
                // Process task doesn't handle quotation: Normalize arguments from `ShellQuotedString` to raw `string`.
                args = systemSpecificCommand.args.map(function (arg) { return typeof arg === 'string' ? arg : arg.value; });
            }
            else {
                args = [];
            }
        }
        return { command: command, args: args, commandLine: commandLine, options: options };
    };
    ProcessTaskRunner.prototype.getCommand = function (processType, terminalProcessOptions) {
        if (terminalProcessOptions.args) {
            if (processType === 'shell') {
                return terminalProcessOptions.args[terminalProcessOptions.args.length - 1];
            }
            else if (processType === 'process') {
                return terminalProcessOptions.command + " " + terminalProcessOptions.args.join(' ');
            }
        }
    };
    /**
     * This is task specific, to align with VS Code's behavior.
     *
     * When parsing arguments, VS Code will try to detect if the user already
     * tried to quote things.
     *
     * See: https://github.com/microsoft/vscode/blob/d363b988e1e58cf49963841c498681cdc6cb55a3/src/vs/workbench/contrib/tasks/browser/terminalTaskSystem.ts#L1101-L1127
     *
     * @param value
     * @param shellQuotingOptions
     */
    ProcessTaskRunner.prototype.argumentNeedsQuotes = function (value, shellQuotingOptions) {
        var characters = shellQuotingOptions.characters;
        var needQuotes = new Set(__spread([' '], characters.needQuotes || []));
        if (!characters) {
            return false;
        }
        if (value.length >= 2) {
            var first = value[0] === characters.strong ? characters.strong : value[0] === characters.weak ? characters.weak : undefined;
            if (first === value[value.length - 1]) {
                return false;
            }
        }
        var quote;
        for (var i = 0; i < value.length; i++) {
            // We found the end quote.
            var ch = value[i];
            if (ch === quote) {
                quote = undefined;
            }
            else if (quote !== undefined) {
                // skip the character. We are quoted.
                continue;
            }
            else if (ch === characters.escape) {
                // Skip the next character
                i++;
            }
            else if (ch === characters.strong || ch === characters.weak) {
                quote = ch;
            }
            else if (needQuotes.has(ch)) {
                return true;
            }
        }
        return false;
    };
    ProcessTaskRunner.prototype.getSystemSpecificCommand = function (taskConfig, system) {
        // initialize with default values from the `taskConfig`
        var command = taskConfig.command;
        var args = taskConfig.args;
        var options = core_2.deepClone(taskConfig.options) || {};
        if (system) {
            if (taskConfig[system].command) {
                command = taskConfig[system].command;
            }
            if (taskConfig[system].args) {
                args = taskConfig[system].args;
            }
            if (taskConfig[system].options) {
                options = taskConfig[system].options;
            }
        }
        if (options.cwd) {
            options.cwd = this.asFsPath(options.cwd);
        }
        return { command: command, args: args, options: options };
    };
    ProcessTaskRunner.prototype.asFsPath = function (uriOrPath) {
        return (uriOrPath.startsWith('file:'))
            ? node_1.FileUri.fsPath(uriOrPath)
            : uriOrPath;
    };
    /**
     * @deprecated
     *
     * Remove ProcessTaskRunner.findCommand, introduce process "started" event
     * Checks for the existence of a file, at the provided path, and make sure that
     * it's readable and executable.
     */
    ProcessTaskRunner.prototype.executableFileExists = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            fs.access(filePath, fs.constants.F_OK | fs.constants.X_OK, function (err) {
                                resolve(err ? false : true);
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    __decorate([
        inversify_1.inject(core_1.ILogger),
        inversify_1.named('task'),
        __metadata("design:type", Object)
    ], ProcessTaskRunner.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(node_2.RawProcessFactory),
        __metadata("design:type", Function)
    ], ProcessTaskRunner.prototype, "rawProcessFactory", void 0);
    __decorate([
        inversify_1.inject(node_2.TerminalProcessFactory),
        __metadata("design:type", Function)
    ], ProcessTaskRunner.prototype, "terminalProcessFactory", void 0);
    __decorate([
        inversify_1.inject(process_task_1.TaskFactory),
        __metadata("design:type", Function)
    ], ProcessTaskRunner.prototype, "taskFactory", void 0);
    ProcessTaskRunner = __decorate([
        inversify_1.injectable()
    ], ProcessTaskRunner);
    return ProcessTaskRunner;
}());
exports.ProcessTaskRunner = ProcessTaskRunner;
//# sourceMappingURL=process-task-runner.js.map