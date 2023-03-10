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
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
var isElectron = require('is-electron');
/**
 * The electron specific environment.
 */
var ElectronEnv = /** @class */ (function () {
    function ElectronEnv() {
        /**
         * Environment variable that can be accessed on the `process` to check if running in electron or not.
         */
        this.THEIA_ELECTRON_VERSION = 'THEIA_ELECTRON_VERSION';
    }
    /**
     * `true` if running in electron. Otherwise, `false`.
     *
     * Can be called from both the `main` and the render process. Also works for forked cluster workers.
     */
    ElectronEnv.prototype.is = function () {
        return isElectron();
    };
    /**
     * `true` if running in Electron in development mode. Otherwise, `false`.
     *
     * Cannot be used from the browser. From the browser, it is always `false`.
     */
    ElectronEnv.prototype.isDevMode = function () {
        return this.is()
            && typeof process !== 'undefined'
            // `defaultApp` does not exist on the Node.js API, but on electron (`electron.d.ts`).
            && (process.defaultApp || /node_modules[/]electron[/]/.test(process.execPath)); // eslint-disable-line @typescript-eslint/no-explicit-any
    };
    /**
     * Creates and return with a new environment object which always contains the `ELECTRON_RUN_AS_NODE: 1` property pair.
     * This should be used to `spawn` and `fork` a new Node.js process from the Node.js shipped with Electron. Otherwise, a new Electron
     * process will be spawned which [has side-effects](https://github.com/eclipse-theia/theia/issues/5385).
     *
     * If called from the backend and the `env` argument is not defined, it falls back to `process.env` such as Node.js behaves
     * with the [`SpawnOptions`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options).
     * If `env` is defined, it will be shallow-copied.
     *
     * Calling this function from the frontend does not make any sense, hence throw an error.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ElectronEnv.prototype.runAsNodeEnv = function (env) {
        if (typeof process === 'undefined') {
            throw new Error("'process' cannot be undefined.");
        }
        return __assign(__assign({}, (env === undefined ? process.env : env)), { ELECTRON_RUN_AS_NODE: 1 });
    };
    return ElectronEnv;
}());
var electron = new ElectronEnv();
var environment = { electron: electron };
exports.environment = environment;
//# sourceMappingURL=environment.js.map