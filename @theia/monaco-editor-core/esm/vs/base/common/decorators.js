/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
export function createDecorator(mapFn) {
    return function (target, key, descriptor) {
        var fnKey = null;
        var fn = null;
        if (typeof descriptor.value === 'function') {
            fnKey = 'value';
            fn = descriptor.value;
        }
        else if (typeof descriptor.get === 'function') {
            fnKey = 'get';
            fn = descriptor.get;
        }
        if (!fn) {
            throw new Error('not supported');
        }
        descriptor[fnKey] = mapFn(fn, key);
    };
}
var memoizeId = 0;
export function createMemoizer() {
    var memoizeKeyPrefix = "$memoize" + memoizeId++;
    var self = undefined;
    var result = function memoize(target, key, descriptor) {
        var fnKey = null;
        var fn = null;
        if (typeof descriptor.value === 'function') {
            fnKey = 'value';
            fn = descriptor.value;
            if (fn.length !== 0) {
                console.warn('Memoize should only be used in functions with zero parameters');
            }
        }
        else if (typeof descriptor.get === 'function') {
            fnKey = 'get';
            fn = descriptor.get;
        }
        if (!fn) {
            throw new Error('not supported');
        }
        var memoizeKey = memoizeKeyPrefix + ":" + key;
        descriptor[fnKey] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            self = this;
            if (!this.hasOwnProperty(memoizeKey)) {
                Object.defineProperty(this, memoizeKey, {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: fn.apply(this, args)
                });
            }
            return this[memoizeKey];
        };
    };
    result.clear = function () {
        if (typeof self === 'undefined') {
            return;
        }
        Object.getOwnPropertyNames(self).forEach(function (property) {
            if (property.indexOf(memoizeKeyPrefix) === 0) {
                delete self[property];
            }
        });
    };
    return result;
}
export function memoize(target, key, descriptor) {
    return createMemoizer()(target, key, descriptor);
}
export function debounce(delay, reducer, initialValueProvider) {
    return createDecorator(function (fn, key) {
        var timerKey = "$debounce$" + key;
        var resultKey = "$debounce$result$" + key;
        return function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!this[resultKey]) {
                this[resultKey] = initialValueProvider ? initialValueProvider() : undefined;
            }
            clearTimeout(this[timerKey]);
            if (reducer) {
                this[resultKey] = reducer.apply(void 0, __spreadArrays([this[resultKey]], args));
                args = [this[resultKey]];
            }
            this[timerKey] = setTimeout(function () {
                fn.apply(_this, args);
                _this[resultKey] = initialValueProvider ? initialValueProvider() : undefined;
            }, delay);
        };
    });
}
export function throttle(delay, reducer, initialValueProvider) {
    return createDecorator(function (fn, key) {
        var timerKey = "$throttle$timer$" + key;
        var resultKey = "$throttle$result$" + key;
        var lastRunKey = "$throttle$lastRun$" + key;
        var pendingKey = "$throttle$pending$" + key;
        return function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!this[resultKey]) {
                this[resultKey] = initialValueProvider ? initialValueProvider() : undefined;
            }
            if (this[lastRunKey] === null || this[lastRunKey] === undefined) {
                this[lastRunKey] = -Number.MAX_VALUE;
            }
            if (reducer) {
                this[resultKey] = reducer.apply(void 0, __spreadArrays([this[resultKey]], args));
            }
            if (this[pendingKey]) {
                return;
            }
            var nextTime = this[lastRunKey] + delay;
            if (nextTime <= Date.now()) {
                this[lastRunKey] = Date.now();
                fn.apply(this, [this[resultKey]]);
                this[resultKey] = initialValueProvider ? initialValueProvider() : undefined;
            }
            else {
                this[pendingKey] = true;
                this[timerKey] = setTimeout(function () {
                    _this[pendingKey] = false;
                    _this[lastRunKey] = Date.now();
                    fn.apply(_this, [_this[resultKey]]);
                    _this[resultKey] = initialValueProvider ? initialValueProvider() : undefined;
                }, nextTime - Date.now());
            }
        };
    });
}
