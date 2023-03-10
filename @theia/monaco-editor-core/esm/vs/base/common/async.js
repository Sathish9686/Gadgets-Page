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
import { CancellationTokenSource } from './cancellation';
import * as errors from './errors';
import { Emitter } from './event';
import { toDisposable } from './lifecycle';
export function isThenable(obj) {
    return obj && typeof obj.then === 'function';
}
export function createCancelablePromise(callback) {
    var source = new CancellationTokenSource();
    var thenable = callback(source.token);
    var promise = new Promise(function (resolve, reject) {
        source.token.onCancellationRequested(function () {
            reject(errors.canceled());
        });
        Promise.resolve(thenable).then(function (value) {
            source.dispose();
            resolve(value);
        }, function (err) {
            source.dispose();
            reject(err);
        });
    });
    return new /** @class */ (function () {
        function class_1() {
        }
        class_1.prototype.cancel = function () {
            source.cancel();
        };
        class_1.prototype.then = function (resolve, reject) {
            return promise.then(resolve, reject);
        };
        class_1.prototype.catch = function (reject) {
            return this.then(undefined, reject);
        };
        class_1.prototype.finally = function (onfinally) {
            return promise.finally(onfinally);
        };
        return class_1;
    }());
}
export function raceCancellation(promise, token, defaultValue) {
    return Promise.race([promise, new Promise(function (resolve) { return token.onCancellationRequested(function () { return resolve(defaultValue); }); })]);
}
export function asPromise(callback) {
    return new Promise(function (resolve, reject) {
        var item = callback();
        if (isThenable(item)) {
            item.then(resolve, reject);
        }
        else {
            resolve(item);
        }
    });
}
/**
 * A helper to prevent accumulation of sequential async tasks.
 *
 * Imagine a mail man with the sole task of delivering letters. As soon as
 * a letter submitted for delivery, he drives to the destination, delivers it
 * and returns to his base. Imagine that during the trip, N more letters were submitted.
 * When the mail man returns, he picks those N letters and delivers them all in a
 * single trip. Even though N+1 submissions occurred, only 2 deliveries were made.
 *
 * The throttler implements this via the queue() method, by providing it a task
 * factory. Following the example:
 *
 * 		const throttler = new Throttler();
 * 		const letters = [];
 *
 * 		function deliver() {
 * 			const lettersToDeliver = letters;
 * 			letters = [];
 * 			return makeTheTrip(lettersToDeliver);
 * 		}
 *
 * 		function onLetterReceived(l) {
 * 			letters.push(l);
 * 			throttler.queue(deliver);
 * 		}
 */
var Throttler = /** @class */ (function () {
    function Throttler() {
        this.activePromise = null;
        this.queuedPromise = null;
        this.queuedPromiseFactory = null;
    }
    Throttler.prototype.queue = function (promiseFactory) {
        var _this = this;
        if (this.activePromise) {
            this.queuedPromiseFactory = promiseFactory;
            if (!this.queuedPromise) {
                var onComplete_1 = function () {
                    _this.queuedPromise = null;
                    var result = _this.queue(_this.queuedPromiseFactory);
                    _this.queuedPromiseFactory = null;
                    return result;
                };
                this.queuedPromise = new Promise(function (c) {
                    _this.activePromise.then(onComplete_1, onComplete_1).then(c);
                });
            }
            return new Promise(function (c, e) {
                _this.queuedPromise.then(c, e);
            });
        }
        this.activePromise = promiseFactory();
        return new Promise(function (c, e) {
            _this.activePromise.then(function (result) {
                _this.activePromise = null;
                c(result);
            }, function (err) {
                _this.activePromise = null;
                e(err);
            });
        });
    };
    return Throttler;
}());
export { Throttler };
var Sequencer = /** @class */ (function () {
    function Sequencer() {
        this.current = Promise.resolve(null);
    }
    Sequencer.prototype.queue = function (promiseTask) {
        return this.current = this.current.then(function () { return promiseTask(); });
    };
    return Sequencer;
}());
export { Sequencer };
/**
 * A helper to delay execution of a task that is being requested often.
 *
 * Following the throttler, now imagine the mail man wants to optimize the number of
 * trips proactively. The trip itself can be long, so he decides not to make the trip
 * as soon as a letter is submitted. Instead he waits a while, in case more
 * letters are submitted. After said waiting period, if no letters were submitted, he
 * decides to make the trip. Imagine that N more letters were submitted after the first
 * one, all within a short period of time between each other. Even though N+1
 * submissions occurred, only 1 delivery was made.
 *
 * The delayer offers this behavior via the trigger() method, into which both the task
 * to be executed and the waiting period (delay) must be passed in as arguments. Following
 * the example:
 *
 * 		const delayer = new Delayer(WAITING_PERIOD);
 * 		const letters = [];
 *
 * 		function letterReceived(l) {
 * 			letters.push(l);
 * 			delayer.trigger(() => { return makeTheTrip(); });
 * 		}
 */
var Delayer = /** @class */ (function () {
    function Delayer(defaultDelay) {
        this.defaultDelay = defaultDelay;
        this.timeout = null;
        this.completionPromise = null;
        this.doResolve = null;
        this.doReject = null;
        this.task = null;
    }
    Delayer.prototype.trigger = function (task, delay) {
        var _this = this;
        if (delay === void 0) { delay = this.defaultDelay; }
        this.task = task;
        this.cancelTimeout();
        if (!this.completionPromise) {
            this.completionPromise = new Promise(function (c, e) {
                _this.doResolve = c;
                _this.doReject = e;
            }).then(function () {
                _this.completionPromise = null;
                _this.doResolve = null;
                if (_this.task) {
                    var task_1 = _this.task;
                    _this.task = null;
                    return task_1();
                }
                return undefined;
            });
        }
        this.timeout = setTimeout(function () {
            _this.timeout = null;
            if (_this.doResolve) {
                _this.doResolve(null);
            }
        }, delay);
        return this.completionPromise;
    };
    Delayer.prototype.isTriggered = function () {
        return this.timeout !== null;
    };
    Delayer.prototype.cancel = function () {
        this.cancelTimeout();
        if (this.completionPromise) {
            if (this.doReject) {
                this.doReject(errors.canceled());
            }
            this.completionPromise = null;
        }
    };
    Delayer.prototype.cancelTimeout = function () {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    };
    Delayer.prototype.dispose = function () {
        this.cancelTimeout();
    };
    return Delayer;
}());
export { Delayer };
/**
 * A helper to delay execution of a task that is being requested often, while
 * preventing accumulation of consecutive executions, while the task runs.
 *
 * The mail man is clever and waits for a certain amount of time, before going
 * out to deliver letters. While the mail man is going out, more letters arrive
 * and can only be delivered once he is back. Once he is back the mail man will
 * do one more trip to deliver the letters that have accumulated while he was out.
 */
var ThrottledDelayer = /** @class */ (function () {
    function ThrottledDelayer(defaultDelay) {
        this.delayer = new Delayer(defaultDelay);
        this.throttler = new Throttler();
    }
    ThrottledDelayer.prototype.trigger = function (promiseFactory, delay) {
        var _this = this;
        return this.delayer.trigger(function () { return _this.throttler.queue(promiseFactory); }, delay);
    };
    ThrottledDelayer.prototype.isTriggered = function () {
        return this.delayer.isTriggered();
    };
    ThrottledDelayer.prototype.cancel = function () {
        this.delayer.cancel();
    };
    ThrottledDelayer.prototype.dispose = function () {
        this.delayer.dispose();
    };
    return ThrottledDelayer;
}());
export { ThrottledDelayer };
/**
 * A barrier that is initially closed and then becomes opened permanently.
 */
var Barrier = /** @class */ (function () {
    function Barrier() {
        var _this = this;
        this._isOpen = false;
        this._promise = new Promise(function (c, e) {
            _this._completePromise = c;
        });
    }
    Barrier.prototype.isOpen = function () {
        return this._isOpen;
    };
    Barrier.prototype.open = function () {
        this._isOpen = true;
        this._completePromise(true);
    };
    Barrier.prototype.wait = function () {
        return this._promise;
    };
    return Barrier;
}());
export { Barrier };
export function timeout(millis, token) {
    if (!token) {
        return createCancelablePromise(function (token) { return timeout(millis, token); });
    }
    return new Promise(function (resolve, reject) {
        var handle = setTimeout(resolve, millis);
        token.onCancellationRequested(function () {
            clearTimeout(handle);
            reject(errors.canceled());
        });
    });
}
export function disposableTimeout(handler, timeout) {
    if (timeout === void 0) { timeout = 0; }
    var timer = setTimeout(handler, timeout);
    return toDisposable(function () { return clearTimeout(timer); });
}
export function ignoreErrors(promise) {
    return promise.then(undefined, function (_) { return undefined; });
}
/**
 * Runs the provided list of promise factories in sequential order. The returned
 * promise will complete to an array of results from each promise.
 */
export function sequence(promiseFactories) {
    var results = [];
    var index = 0;
    var len = promiseFactories.length;
    function next() {
        return index < len ? promiseFactories[index++]() : null;
    }
    function thenHandler(result) {
        if (result !== undefined && result !== null) {
            results.push(result);
        }
        var n = next();
        if (n) {
            return n.then(thenHandler);
        }
        return Promise.resolve(results);
    }
    return Promise.resolve(null).then(thenHandler);
}
export function first(promiseFactories, shouldStop, defaultValue) {
    if (shouldStop === void 0) { shouldStop = function (t) { return !!t; }; }
    if (defaultValue === void 0) { defaultValue = null; }
    var index = 0;
    var len = promiseFactories.length;
    var loop = function () {
        if (index >= len) {
            return Promise.resolve(defaultValue);
        }
        var factory = promiseFactories[index++];
        var promise = Promise.resolve(factory());
        return promise.then(function (result) {
            if (shouldStop(result)) {
                return Promise.resolve(result);
            }
            return loop();
        });
    };
    return loop();
}
/**
 * A helper to queue N promises and run them all with a max degree of parallelism. The helper
 * ensures that at any time no more than M promises are running at the same time.
 */
var Limiter = /** @class */ (function () {
    function Limiter(maxDegreeOfParalellism) {
        this._size = 0;
        this.maxDegreeOfParalellism = maxDegreeOfParalellism;
        this.outstandingPromises = [];
        this.runningPromises = 0;
        this._onFinished = new Emitter();
    }
    Object.defineProperty(Limiter.prototype, "onFinished", {
        get: function () {
            return this._onFinished.event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Limiter.prototype, "size", {
        get: function () {
            return this._size;
            // return this.runningPromises + this.outstandingPromises.length;
        },
        enumerable: true,
        configurable: true
    });
    Limiter.prototype.queue = function (factory) {
        var _this = this;
        this._size++;
        return new Promise(function (c, e) {
            _this.outstandingPromises.push({ factory: factory, c: c, e: e });
            _this.consume();
        });
    };
    Limiter.prototype.consume = function () {
        var _this = this;
        while (this.outstandingPromises.length && this.runningPromises < this.maxDegreeOfParalellism) {
            var iLimitedTask = this.outstandingPromises.shift();
            this.runningPromises++;
            var promise = iLimitedTask.factory();
            promise.then(iLimitedTask.c, iLimitedTask.e);
            promise.then(function () { return _this.consumed(); }, function () { return _this.consumed(); });
        }
    };
    Limiter.prototype.consumed = function () {
        this._size--;
        this.runningPromises--;
        if (this.outstandingPromises.length > 0) {
            this.consume();
        }
        else {
            this._onFinished.fire();
        }
    };
    Limiter.prototype.dispose = function () {
        this._onFinished.dispose();
    };
    return Limiter;
}());
export { Limiter };
/**
 * A queue is handles one promise at a time and guarantees that at any time only one promise is executing.
 */
var Queue = /** @class */ (function (_super) {
    __extends(Queue, _super);
    function Queue() {
        return _super.call(this, 1) || this;
    }
    return Queue;
}(Limiter));
export { Queue };
/**
 * A helper to organize queues per resource. The ResourceQueue makes sure to manage queues per resource
 * by disposing them once the queue is empty.
 */
var ResourceQueue = /** @class */ (function () {
    function ResourceQueue() {
        this.queues = new Map();
    }
    ResourceQueue.prototype.queueFor = function (resource) {
        var _this = this;
        var key = resource.toString();
        if (!this.queues.has(key)) {
            var queue_1 = new Queue();
            queue_1.onFinished(function () {
                queue_1.dispose();
                _this.queues.delete(key);
            });
            this.queues.set(key, queue_1);
        }
        return this.queues.get(key);
    };
    ResourceQueue.prototype.dispose = function () {
        this.queues.forEach(function (queue) { return queue.dispose(); });
        this.queues.clear();
    };
    return ResourceQueue;
}());
export { ResourceQueue };
var TimeoutTimer = /** @class */ (function () {
    function TimeoutTimer(runner, timeout) {
        this._token = -1;
        if (typeof runner === 'function' && typeof timeout === 'number') {
            this.setIfNotSet(runner, timeout);
        }
    }
    TimeoutTimer.prototype.dispose = function () {
        this.cancel();
    };
    TimeoutTimer.prototype.cancel = function () {
        if (this._token !== -1) {
            clearTimeout(this._token);
            this._token = -1;
        }
    };
    TimeoutTimer.prototype.cancelAndSet = function (runner, timeout) {
        var _this = this;
        this.cancel();
        this._token = setTimeout(function () {
            _this._token = -1;
            runner();
        }, timeout);
    };
    TimeoutTimer.prototype.setIfNotSet = function (runner, timeout) {
        var _this = this;
        if (this._token !== -1) {
            // timer is already set
            return;
        }
        this._token = setTimeout(function () {
            _this._token = -1;
            runner();
        }, timeout);
    };
    return TimeoutTimer;
}());
export { TimeoutTimer };
var IntervalTimer = /** @class */ (function () {
    function IntervalTimer() {
        this._token = -1;
    }
    IntervalTimer.prototype.dispose = function () {
        this.cancel();
    };
    IntervalTimer.prototype.cancel = function () {
        if (this._token !== -1) {
            clearInterval(this._token);
            this._token = -1;
        }
    };
    IntervalTimer.prototype.cancelAndSet = function (runner, interval) {
        this.cancel();
        this._token = setInterval(function () {
            runner();
        }, interval);
    };
    return IntervalTimer;
}());
export { IntervalTimer };
var RunOnceScheduler = /** @class */ (function () {
    function RunOnceScheduler(runner, timeout) {
        this.timeoutToken = -1;
        this.runner = runner;
        this.timeout = timeout;
        this.timeoutHandler = this.onTimeout.bind(this);
    }
    /**
     * Dispose RunOnceScheduler
     */
    RunOnceScheduler.prototype.dispose = function () {
        this.cancel();
        this.runner = null;
    };
    /**
     * Cancel current scheduled runner (if any).
     */
    RunOnceScheduler.prototype.cancel = function () {
        if (this.isScheduled()) {
            clearTimeout(this.timeoutToken);
            this.timeoutToken = -1;
        }
    };
    /**
     * Cancel previous runner (if any) & schedule a new runner.
     */
    RunOnceScheduler.prototype.schedule = function (delay) {
        if (delay === void 0) { delay = this.timeout; }
        this.cancel();
        this.timeoutToken = setTimeout(this.timeoutHandler, delay);
    };
    /**
     * Returns true if scheduled.
     */
    RunOnceScheduler.prototype.isScheduled = function () {
        return this.timeoutToken !== -1;
    };
    RunOnceScheduler.prototype.onTimeout = function () {
        this.timeoutToken = -1;
        if (this.runner) {
            this.doRun();
        }
    };
    RunOnceScheduler.prototype.doRun = function () {
        if (this.runner) {
            this.runner();
        }
    };
    return RunOnceScheduler;
}());
export { RunOnceScheduler };
var RunOnceWorker = /** @class */ (function (_super) {
    __extends(RunOnceWorker, _super);
    function RunOnceWorker(runner, timeout) {
        var _this = _super.call(this, runner, timeout) || this;
        _this.units = [];
        return _this;
    }
    RunOnceWorker.prototype.work = function (unit) {
        this.units.push(unit);
        if (!this.isScheduled()) {
            this.schedule();
        }
    };
    RunOnceWorker.prototype.doRun = function () {
        var units = this.units;
        this.units = [];
        if (this.runner) {
            this.runner(units);
        }
    };
    RunOnceWorker.prototype.dispose = function () {
        this.units = [];
        _super.prototype.dispose.call(this);
    };
    return RunOnceWorker;
}(RunOnceScheduler));
export { RunOnceWorker };
/**
 * Execute the callback the next time the browser is idle
 */
export var runWhenIdle;
(function () {
    if (typeof requestIdleCallback !== 'function' || typeof cancelIdleCallback !== 'function') {
        var dummyIdle_1 = Object.freeze({
            didTimeout: true,
            timeRemaining: function () { return 15; }
        });
        runWhenIdle = function (runner) {
            var handle = setTimeout(function () { return runner(dummyIdle_1); });
            var disposed = false;
            return {
                dispose: function () {
                    if (disposed) {
                        return;
                    }
                    disposed = true;
                    clearTimeout(handle);
                }
            };
        };
    }
    else {
        runWhenIdle = function (runner, timeout) {
            var handle = requestIdleCallback(runner, typeof timeout === 'number' ? { timeout: timeout } : undefined);
            var disposed = false;
            return {
                dispose: function () {
                    if (disposed) {
                        return;
                    }
                    disposed = true;
                    cancelIdleCallback(handle);
                }
            };
        };
    }
})();
/**
 * An implementation of the "idle-until-urgent"-strategy as introduced
 * here: https://philipwalton.com/articles/idle-until-urgent/
 */
var IdleValue = /** @class */ (function () {
    function IdleValue(executor) {
        var _this = this;
        this._didRun = false;
        this._executor = function () {
            try {
                _this._value = executor();
            }
            catch (err) {
                _this._error = err;
            }
            finally {
                _this._didRun = true;
            }
        };
        this._handle = runWhenIdle(function () { return _this._executor(); });
    }
    IdleValue.prototype.dispose = function () {
        this._handle.dispose();
    };
    IdleValue.prototype.getValue = function () {
        if (!this._didRun) {
            this._handle.dispose();
            this._executor();
        }
        if (this._error) {
            throw this._error;
        }
        return this._value;
    };
    return IdleValue;
}());
export { IdleValue };
//#endregion
export function retry(task, delay, retries) {
    return __awaiter(this, void 0, void 0, function () {
        var lastError, i, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < retries)) return [3 /*break*/, 7];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 6]);
                    return [4 /*yield*/, task()];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    error_1 = _a.sent();
                    lastError = error_1;
                    return [4 /*yield*/, timeout(delay)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 6:
                    i++;
                    return [3 /*break*/, 1];
                case 7: throw lastError;
            }
        });
    });
}
