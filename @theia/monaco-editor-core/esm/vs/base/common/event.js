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
import { onUnexpectedError } from './errors';
import { once as onceFn } from './functional';
import { Disposable, toDisposable, combinedDisposable, DisposableStore } from './lifecycle';
import { LinkedList } from './linkedList';
export var Event;
(function (Event) {
    Event.None = function () { return Disposable.None; };
    /**
     * Given an event, returns another event which only fires once.
     */
    function once(event) {
        return function (listener, thisArgs, disposables) {
            if (thisArgs === void 0) { thisArgs = null; }
            // we need this, in case the event fires during the listener call
            var didFire = false;
            var result;
            result = event(function (e) {
                if (didFire) {
                    return;
                }
                else if (result) {
                    result.dispose();
                }
                else {
                    didFire = true;
                }
                return listener.call(thisArgs, e);
            }, null, disposables);
            if (didFire) {
                result.dispose();
            }
            return result;
        };
    }
    Event.once = once;
    /**
     * Given an event and a `map` function, returns another event which maps each element
     * through the mapping function.
     */
    function map(event, map) {
        return snapshot(function (listener, thisArgs, disposables) {
            if (thisArgs === void 0) { thisArgs = null; }
            return event(function (i) { return listener.call(thisArgs, map(i)); }, null, disposables);
        });
    }
    Event.map = map;
    /**
     * Given an event and an `each` function, returns another identical event and calls
     * the `each` function per each element.
     */
    function forEach(event, each) {
        return snapshot(function (listener, thisArgs, disposables) {
            if (thisArgs === void 0) { thisArgs = null; }
            return event(function (i) { each(i); listener.call(thisArgs, i); }, null, disposables);
        });
    }
    Event.forEach = forEach;
    function filter(event, filter) {
        return snapshot(function (listener, thisArgs, disposables) {
            if (thisArgs === void 0) { thisArgs = null; }
            return event(function (e) { return filter(e) && listener.call(thisArgs, e); }, null, disposables);
        });
    }
    Event.filter = filter;
    /**
     * Given an event, returns the same event but typed as `Event<void>`.
     */
    function signal(event) {
        return event;
    }
    Event.signal = signal;
    /**
     * Given a collection of events, returns a single event which emits
     * whenever any of the provided events emit.
     */
    function any() {
        var events = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            events[_i] = arguments[_i];
        }
        return function (listener, thisArgs, disposables) {
            if (thisArgs === void 0) { thisArgs = null; }
            return combinedDisposable.apply(void 0, events.map(function (event) { return event(function (e) { return listener.call(thisArgs, e); }, null, disposables); }));
        };
    }
    Event.any = any;
    /**
     * Given an event and a `merge` function, returns another event which maps each element
     * and the cumulative result through the `merge` function. Similar to `map`, but with memory.
     */
    function reduce(event, merge, initial) {
        var output = initial;
        return map(event, function (e) {
            output = merge(output, e);
            return output;
        });
    }
    Event.reduce = reduce;
    /**
     * Given a chain of event processing functions (filter, map, etc), each
     * function will be invoked per event & per listener. Snapshotting an event
     * chain allows each function to be invoked just once per event.
     */
    function snapshot(event) {
        var listener;
        var emitter = new Emitter({
            onFirstListenerAdd: function () {
                listener = event(emitter.fire, emitter);
            },
            onLastListenerRemove: function () {
                listener.dispose();
            }
        });
        return emitter.event;
    }
    Event.snapshot = snapshot;
    function debounce(event, merge, delay, leading, leakWarningThreshold) {
        if (delay === void 0) { delay = 100; }
        if (leading === void 0) { leading = false; }
        var subscription;
        var output = undefined;
        var handle = undefined;
        var numDebouncedCalls = 0;
        var emitter = new Emitter({
            leakWarningThreshold: leakWarningThreshold,
            onFirstListenerAdd: function () {
                subscription = event(function (cur) {
                    numDebouncedCalls++;
                    output = merge(output, cur);
                    if (leading && !handle) {
                        emitter.fire(output);
                        output = undefined;
                    }
                    clearTimeout(handle);
                    handle = setTimeout(function () {
                        var _output = output;
                        output = undefined;
                        handle = undefined;
                        if (!leading || numDebouncedCalls > 1) {
                            emitter.fire(_output);
                        }
                        numDebouncedCalls = 0;
                    }, delay);
                });
            },
            onLastListenerRemove: function () {
                subscription.dispose();
            }
        });
        return emitter.event;
    }
    Event.debounce = debounce;
    /**
     * Given an event, it returns another event which fires only once and as soon as
     * the input event emits. The event data is the number of millis it took for the
     * event to fire.
     */
    function stopwatch(event) {
        var start = new Date().getTime();
        return map(once(event), function (_) { return new Date().getTime() - start; });
    }
    Event.stopwatch = stopwatch;
    /**
     * Given an event, it returns another event which fires only when the event
     * element changes.
     */
    function latch(event) {
        var firstCall = true;
        var cache;
        return filter(event, function (value) {
            var shouldEmit = firstCall || value !== cache;
            firstCall = false;
            cache = value;
            return shouldEmit;
        });
    }
    Event.latch = latch;
    /**
     * Buffers the provided event until a first listener comes
     * along, at which point fire all the events at once and
     * pipe the event from then on.
     *
     * ```typescript
     * const emitter = new Emitter<number>();
     * const event = emitter.event;
     * const bufferedEvent = buffer(event);
     *
     * emitter.fire(1);
     * emitter.fire(2);
     * emitter.fire(3);
     * // nothing...
     *
     * const listener = bufferedEvent(num => console.log(num));
     * // 1, 2, 3
     *
     * emitter.fire(4);
     * // 4
     * ```
     */
    function buffer(event, nextTick, _buffer) {
        if (nextTick === void 0) { nextTick = false; }
        if (_buffer === void 0) { _buffer = []; }
        var buffer = _buffer.slice();
        var listener = event(function (e) {
            if (buffer) {
                buffer.push(e);
            }
            else {
                emitter.fire(e);
            }
        });
        var flush = function () {
            if (buffer) {
                buffer.forEach(function (e) { return emitter.fire(e); });
            }
            buffer = null;
        };
        var emitter = new Emitter({
            onFirstListenerAdd: function () {
                if (!listener) {
                    listener = event(function (e) { return emitter.fire(e); });
                }
            },
            onFirstListenerDidAdd: function () {
                if (buffer) {
                    if (nextTick) {
                        setTimeout(flush);
                    }
                    else {
                        flush();
                    }
                }
            },
            onLastListenerRemove: function () {
                if (listener) {
                    listener.dispose();
                }
                listener = null;
            }
        });
        return emitter.event;
    }
    Event.buffer = buffer;
    var ChainableEvent = /** @class */ (function () {
        function ChainableEvent(event) {
            this.event = event;
        }
        ChainableEvent.prototype.map = function (fn) {
            return new ChainableEvent(map(this.event, fn));
        };
        ChainableEvent.prototype.forEach = function (fn) {
            return new ChainableEvent(forEach(this.event, fn));
        };
        ChainableEvent.prototype.filter = function (fn) {
            return new ChainableEvent(filter(this.event, fn));
        };
        ChainableEvent.prototype.reduce = function (merge, initial) {
            return new ChainableEvent(reduce(this.event, merge, initial));
        };
        ChainableEvent.prototype.latch = function () {
            return new ChainableEvent(latch(this.event));
        };
        ChainableEvent.prototype.debounce = function (merge, delay, leading, leakWarningThreshold) {
            if (delay === void 0) { delay = 100; }
            if (leading === void 0) { leading = false; }
            return new ChainableEvent(debounce(this.event, merge, delay, leading, leakWarningThreshold));
        };
        ChainableEvent.prototype.on = function (listener, thisArgs, disposables) {
            return this.event(listener, thisArgs, disposables);
        };
        ChainableEvent.prototype.once = function (listener, thisArgs, disposables) {
            return once(this.event)(listener, thisArgs, disposables);
        };
        return ChainableEvent;
    }());
    function chain(event) {
        return new ChainableEvent(event);
    }
    Event.chain = chain;
    function fromNodeEventEmitter(emitter, eventName, map) {
        if (map === void 0) { map = function (id) { return id; }; }
        var fn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return result.fire(map.apply(void 0, args));
        };
        var onFirstListenerAdd = function () { return emitter.on(eventName, fn); };
        var onLastListenerRemove = function () { return emitter.removeListener(eventName, fn); };
        var result = new Emitter({ onFirstListenerAdd: onFirstListenerAdd, onLastListenerRemove: onLastListenerRemove });
        return result.event;
    }
    Event.fromNodeEventEmitter = fromNodeEventEmitter;
    function fromDOMEventEmitter(emitter, eventName, map) {
        if (map === void 0) { map = function (id) { return id; }; }
        var fn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return result.fire(map.apply(void 0, args));
        };
        var onFirstListenerAdd = function () { return emitter.addEventListener(eventName, fn); };
        var onLastListenerRemove = function () { return emitter.removeEventListener(eventName, fn); };
        var result = new Emitter({ onFirstListenerAdd: onFirstListenerAdd, onLastListenerRemove: onLastListenerRemove });
        return result.event;
    }
    Event.fromDOMEventEmitter = fromDOMEventEmitter;
    function fromPromise(promise) {
        var emitter = new Emitter();
        var shouldEmit = false;
        promise
            .then(undefined, function () { return null; })
            .then(function () {
            if (!shouldEmit) {
                setTimeout(function () { return emitter.fire(undefined); }, 0);
            }
            else {
                emitter.fire(undefined);
            }
        });
        shouldEmit = true;
        return emitter.event;
    }
    Event.fromPromise = fromPromise;
    function toPromise(event) {
        return new Promise(function (c) { return once(event)(c); });
    }
    Event.toPromise = toPromise;
})(Event || (Event = {}));
var _globalLeakWarningThreshold = -1;
export function setGlobalLeakWarningThreshold(n) {
    var oldValue = _globalLeakWarningThreshold;
    _globalLeakWarningThreshold = n;
    return {
        dispose: function () {
            _globalLeakWarningThreshold = oldValue;
        }
    };
}
var LeakageMonitor = /** @class */ (function () {
    function LeakageMonitor(customThreshold, name) {
        if (name === void 0) { name = Math.random().toString(18).slice(2, 5); }
        this.customThreshold = customThreshold;
        this.name = name;
        this._warnCountdown = 0;
    }
    LeakageMonitor.prototype.dispose = function () {
        if (this._stacks) {
            this._stacks.clear();
        }
    };
    LeakageMonitor.prototype.check = function (listenerCount) {
        var _this = this;
        var threshold = _globalLeakWarningThreshold;
        if (typeof this.customThreshold === 'number') {
            threshold = this.customThreshold;
        }
        if (threshold <= 0 || listenerCount < threshold) {
            return undefined;
        }
        if (!this._stacks) {
            this._stacks = new Map();
        }
        var stack = new Error().stack.split('\n').slice(3).join('\n');
        var count = (this._stacks.get(stack) || 0);
        this._stacks.set(stack, count + 1);
        this._warnCountdown -= 1;
        if (this._warnCountdown <= 0) {
            // only warn on first exceed and then every time the limit
            // is exceeded by 50% again
            this._warnCountdown = threshold * 0.5;
            // find most frequent listener and print warning
            var topStack_1;
            var topCount_1 = 0;
            this._stacks.forEach(function (count, stack) {
                if (!topStack_1 || topCount_1 < count) {
                    topStack_1 = stack;
                    topCount_1 = count;
                }
            });
            console.warn("[" + this.name + "] potential listener LEAK detected, having " + listenerCount + " listeners already. MOST frequent listener (" + topCount_1 + "):");
            console.warn(topStack_1);
        }
        return function () {
            var count = (_this._stacks.get(stack) || 0);
            _this._stacks.set(stack, count - 1);
        };
    };
    return LeakageMonitor;
}());
/**
 * The Emitter can be used to expose an Event to the public
 * to fire it from the insides.
 * Sample:
    class Document {

        private readonly _onDidChange = new Emitter<(value:string)=>any>();

        public onDidChange = this._onDidChange.event;

        // getter-style
        // get onDidChange(): Event<(value:string)=>any> {
        // 	return this._onDidChange.event;
        // }

        private _doIt() {
            //...
            this._onDidChange.fire(value);
        }
    }
 */
var Emitter = /** @class */ (function () {
    function Emitter(options) {
        this._disposed = false;
        this._options = options;
        this._leakageMon = _globalLeakWarningThreshold > 0
            ? new LeakageMonitor(this._options && this._options.leakWarningThreshold)
            : undefined;
    }
    Object.defineProperty(Emitter.prototype, "event", {
        /**
         * For the public to allow to subscribe
         * to events from this Emitter
         */
        get: function () {
            var _this = this;
            if (!this._event) {
                this._event = function (listener, thisArgs, disposables) {
                    if (!_this._listeners) {
                        _this._listeners = new LinkedList();
                    }
                    var firstListener = _this._listeners.isEmpty();
                    if (firstListener && _this._options && _this._options.onFirstListenerAdd) {
                        _this._options.onFirstListenerAdd(_this);
                    }
                    var remove = _this._listeners.push(!thisArgs ? listener : [listener, thisArgs]);
                    if (firstListener && _this._options && _this._options.onFirstListenerDidAdd) {
                        _this._options.onFirstListenerDidAdd(_this);
                    }
                    if (_this._options && _this._options.onListenerDidAdd) {
                        _this._options.onListenerDidAdd(_this, listener, thisArgs);
                    }
                    // check and record this emitter for potential leakage
                    var removeMonitor;
                    if (_this._leakageMon) {
                        removeMonitor = _this._leakageMon.check(_this._listeners.size);
                    }
                    var result;
                    result = {
                        dispose: function () {
                            if (removeMonitor) {
                                removeMonitor();
                            }
                            result.dispose = Emitter._noop;
                            if (!_this._disposed) {
                                remove();
                                if (_this._options && _this._options.onLastListenerRemove) {
                                    var hasListeners = (_this._listeners && !_this._listeners.isEmpty());
                                    if (!hasListeners) {
                                        _this._options.onLastListenerRemove(_this);
                                    }
                                }
                            }
                        }
                    };
                    if (disposables instanceof DisposableStore) {
                        disposables.add(result);
                    }
                    else if (Array.isArray(disposables)) {
                        disposables.push(result);
                    }
                    return result;
                };
            }
            return this._event;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * To be kept private to fire an event to
     * subscribers
     */
    Emitter.prototype.fire = function (event) {
        if (this._listeners) {
            // put all [listener,event]-pairs into delivery queue
            // then emit all event. an inner/nested event might be
            // the driver of this
            if (!this._deliveryQueue) {
                this._deliveryQueue = new LinkedList();
            }
            for (var iter = this._listeners.iterator(), e = iter.next(); !e.done; e = iter.next()) {
                this._deliveryQueue.push([e.value, event]);
            }
            while (this._deliveryQueue.size > 0) {
                var _a = this._deliveryQueue.shift(), listener = _a[0], event_1 = _a[1];
                try {
                    if (typeof listener === 'function') {
                        listener.call(undefined, event_1);
                    }
                    else {
                        listener[0].call(listener[1], event_1);
                    }
                }
                catch (e) {
                    onUnexpectedError(e);
                }
            }
        }
    };
    Emitter.prototype.dispose = function () {
        if (this._listeners) {
            this._listeners.clear();
        }
        if (this._deliveryQueue) {
            this._deliveryQueue.clear();
        }
        if (this._leakageMon) {
            this._leakageMon.dispose();
        }
        this._disposed = true;
    };
    Emitter._noop = function () { };
    return Emitter;
}());
export { Emitter };
var PauseableEmitter = /** @class */ (function (_super) {
    __extends(PauseableEmitter, _super);
    function PauseableEmitter(options) {
        var _this = _super.call(this, options) || this;
        _this._isPaused = 0;
        _this._eventQueue = new LinkedList();
        _this._mergeFn = options && options.merge;
        return _this;
    }
    PauseableEmitter.prototype.pause = function () {
        this._isPaused++;
    };
    PauseableEmitter.prototype.resume = function () {
        if (this._isPaused !== 0 && --this._isPaused === 0) {
            if (this._mergeFn) {
                // use the merge function to create a single composite
                // event. make a copy in case firing pauses this emitter
                var events = this._eventQueue.toArray();
                this._eventQueue.clear();
                _super.prototype.fire.call(this, this._mergeFn(events));
            }
            else {
                // no merging, fire each event individually and test
                // that this emitter isn't paused halfway through
                while (!this._isPaused && this._eventQueue.size !== 0) {
                    _super.prototype.fire.call(this, this._eventQueue.shift());
                }
            }
        }
    };
    PauseableEmitter.prototype.fire = function (event) {
        if (this._listeners) {
            if (this._isPaused !== 0) {
                this._eventQueue.push(event);
            }
            else {
                _super.prototype.fire.call(this, event);
            }
        }
    };
    return PauseableEmitter;
}(Emitter));
export { PauseableEmitter };
var AsyncEmitter = /** @class */ (function (_super) {
    __extends(AsyncEmitter, _super);
    function AsyncEmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsyncEmitter.prototype.fireAsync = function (data, token, promiseJoin) {
        return __awaiter(this, void 0, void 0, function () {
            var iter, e, _loop_1, this_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._listeners) {
                            return [2 /*return*/];
                        }
                        if (!this._asyncDeliveryQueue) {
                            this._asyncDeliveryQueue = new LinkedList();
                        }
                        for (iter = this._listeners.iterator(), e = iter.next(); !e.done; e = iter.next()) {
                            this._asyncDeliveryQueue.push([e.value, data]);
                        }
                        _loop_1 = function () {
                            var _a, listener, data_1, thenables, event_2;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = this_1._asyncDeliveryQueue.shift(), listener = _a[0], data_1 = _a[1];
                                        thenables = [];
                                        event_2 = __assign(__assign({}, data_1), { waitUntil: function (p) {
                                                if (Object.isFrozen(thenables)) {
                                                    throw new Error('waitUntil can NOT be called asynchronous');
                                                }
                                                if (promiseJoin) {
                                                    p = promiseJoin(p, typeof listener === 'function' ? listener : listener[0]);
                                                }
                                                thenables.push(p);
                                            } });
                                        try {
                                            if (typeof listener === 'function') {
                                                listener.call(undefined, event_2);
                                            }
                                            else {
                                                listener[0].call(listener[1], event_2);
                                            }
                                        }
                                        catch (e) {
                                            onUnexpectedError(e);
                                            return [2 /*return*/, "continue"];
                                        }
                                        // freeze thenables-collection to enforce sync-calls to
                                        // wait until and then wait for all thenables to resolve
                                        Object.freeze(thenables);
                                        return [4 /*yield*/, Promise.all(thenables).catch(function (e) { return onUnexpectedError(e); })];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 1;
                    case 1:
                        if (!(this._asyncDeliveryQueue.size > 0 && !token.isCancellationRequested)) return [3 /*break*/, 3];
                        return [5 /*yield**/, _loop_1()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AsyncEmitter;
}(Emitter));
export { AsyncEmitter };
var EventMultiplexer = /** @class */ (function () {
    function EventMultiplexer() {
        var _this = this;
        this.hasListeners = false;
        this.events = [];
        this.emitter = new Emitter({
            onFirstListenerAdd: function () { return _this.onFirstListenerAdd(); },
            onLastListenerRemove: function () { return _this.onLastListenerRemove(); }
        });
    }
    Object.defineProperty(EventMultiplexer.prototype, "event", {
        get: function () {
            return this.emitter.event;
        },
        enumerable: true,
        configurable: true
    });
    EventMultiplexer.prototype.add = function (event) {
        var _this = this;
        var e = { event: event, listener: null };
        this.events.push(e);
        if (this.hasListeners) {
            this.hook(e);
        }
        var dispose = function () {
            if (_this.hasListeners) {
                _this.unhook(e);
            }
            var idx = _this.events.indexOf(e);
            _this.events.splice(idx, 1);
        };
        return toDisposable(onceFn(dispose));
    };
    EventMultiplexer.prototype.onFirstListenerAdd = function () {
        var _this = this;
        this.hasListeners = true;
        this.events.forEach(function (e) { return _this.hook(e); });
    };
    EventMultiplexer.prototype.onLastListenerRemove = function () {
        var _this = this;
        this.hasListeners = false;
        this.events.forEach(function (e) { return _this.unhook(e); });
    };
    EventMultiplexer.prototype.hook = function (e) {
        var _this = this;
        e.listener = e.event(function (r) { return _this.emitter.fire(r); });
    };
    EventMultiplexer.prototype.unhook = function (e) {
        if (e.listener) {
            e.listener.dispose();
        }
        e.listener = null;
    };
    EventMultiplexer.prototype.dispose = function () {
        this.emitter.dispose();
    };
    return EventMultiplexer;
}());
export { EventMultiplexer };
/**
 * The EventBufferer is useful in situations in which you want
 * to delay firing your events during some code.
 * You can wrap that code and be sure that the event will not
 * be fired during that wrap.
 *
 * ```
 * const emitter: Emitter;
 * const delayer = new EventDelayer();
 * const delayedEvent = delayer.wrapEvent(emitter.event);
 *
 * delayedEvent(console.log);
 *
 * delayer.bufferEvents(() => {
 *   emitter.fire(); // event will not be fired yet
 * });
 *
 * // event will only be fired at this point
 * ```
 */
var EventBufferer = /** @class */ (function () {
    function EventBufferer() {
        this.buffers = [];
    }
    EventBufferer.prototype.wrapEvent = function (event) {
        var _this = this;
        return function (listener, thisArgs, disposables) {
            return event(function (i) {
                var buffer = _this.buffers[_this.buffers.length - 1];
                if (buffer) {
                    buffer.push(function () { return listener.call(thisArgs, i); });
                }
                else {
                    listener.call(thisArgs, i);
                }
            }, undefined, disposables);
        };
    };
    EventBufferer.prototype.bufferEvents = function (fn) {
        var buffer = [];
        this.buffers.push(buffer);
        var r = fn();
        this.buffers.pop();
        buffer.forEach(function (flush) { return flush(); });
        return r;
    };
    return EventBufferer;
}());
export { EventBufferer };
/**
 * A Relay is an event forwarder which functions as a replugabble event pipe.
 * Once created, you can connect an input event to it and it will simply forward
 * events from that input event through its own `event` property. The `input`
 * can be changed at any point in time.
 */
var Relay = /** @class */ (function () {
    function Relay() {
        var _this = this;
        this.listening = false;
        this.inputEvent = Event.None;
        this.inputEventListener = Disposable.None;
        this.emitter = new Emitter({
            onFirstListenerDidAdd: function () {
                _this.listening = true;
                _this.inputEventListener = _this.inputEvent(_this.emitter.fire, _this.emitter);
            },
            onLastListenerRemove: function () {
                _this.listening = false;
                _this.inputEventListener.dispose();
            }
        });
        this.event = this.emitter.event;
    }
    Object.defineProperty(Relay.prototype, "input", {
        set: function (event) {
            this.inputEvent = event;
            if (this.listening) {
                this.inputEventListener.dispose();
                this.inputEventListener = event(this.emitter.fire, this.emitter);
            }
        },
        enumerable: true,
        configurable: true
    });
    Relay.prototype.dispose = function () {
        this.inputEventListener.dispose();
        this.emitter.dispose();
    };
    return Relay;
}());
export { Relay };
