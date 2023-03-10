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
export var FIN = { done: true, value: undefined };
export var Iterator;
(function (Iterator) {
    var _empty = {
        next: function () {
            return FIN;
        }
    };
    function empty() {
        return _empty;
    }
    Iterator.empty = empty;
    function single(value) {
        var done = false;
        return {
            next: function () {
                if (done) {
                    return FIN;
                }
                done = true;
                return { done: false, value: value };
            }
        };
    }
    Iterator.single = single;
    function fromArray(array, index, length) {
        if (index === void 0) { index = 0; }
        if (length === void 0) { length = array.length; }
        return {
            next: function () {
                if (index >= length) {
                    return FIN;
                }
                return { done: false, value: array[index++] };
            }
        };
    }
    Iterator.fromArray = fromArray;
    function fromNativeIterator(it) {
        return {
            next: function () {
                var result = it.next();
                if (result.done) {
                    return FIN;
                }
                return { done: false, value: result.value };
            }
        };
    }
    Iterator.fromNativeIterator = fromNativeIterator;
    function from(elements) {
        if (!elements) {
            return Iterator.empty();
        }
        else if (Array.isArray(elements)) {
            return Iterator.fromArray(elements);
        }
        else {
            return elements;
        }
    }
    Iterator.from = from;
    function map(iterator, fn) {
        return {
            next: function () {
                var element = iterator.next();
                if (element.done) {
                    return FIN;
                }
                else {
                    return { done: false, value: fn(element.value) };
                }
            }
        };
    }
    Iterator.map = map;
    function filter(iterator, fn) {
        return {
            next: function () {
                while (true) {
                    var element = iterator.next();
                    if (element.done) {
                        return FIN;
                    }
                    if (fn(element.value)) {
                        return { done: false, value: element.value };
                    }
                }
            }
        };
    }
    Iterator.filter = filter;
    function forEach(iterator, fn) {
        for (var next = iterator.next(); !next.done; next = iterator.next()) {
            fn(next.value);
        }
    }
    Iterator.forEach = forEach;
    function collect(iterator, atMost) {
        if (atMost === void 0) { atMost = Number.POSITIVE_INFINITY; }
        var result = [];
        if (atMost === 0) {
            return result;
        }
        var i = 0;
        for (var next = iterator.next(); !next.done; next = iterator.next()) {
            result.push(next.value);
            if (++i >= atMost) {
                break;
            }
        }
        return result;
    }
    Iterator.collect = collect;
    function concat() {
        var iterators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            iterators[_i] = arguments[_i];
        }
        var i = 0;
        return {
            next: function () {
                if (i >= iterators.length) {
                    return FIN;
                }
                var iterator = iterators[i];
                var result = iterator.next();
                if (result.done) {
                    i++;
                    return this.next();
                }
                return result;
            }
        };
    }
    Iterator.concat = concat;
    function chain(iterator) {
        return new ChainableIterator(iterator);
    }
    Iterator.chain = chain;
})(Iterator || (Iterator = {}));
var ChainableIterator = /** @class */ (function () {
    function ChainableIterator(it) {
        this.it = it;
    }
    ChainableIterator.prototype.next = function () { return this.it.next(); };
    ChainableIterator.prototype.map = function (fn) { return new ChainableIterator(Iterator.map(this.it, fn)); };
    ChainableIterator.prototype.filter = function (fn) { return new ChainableIterator(Iterator.filter(this.it, fn)); };
    return ChainableIterator;
}());
export { ChainableIterator };
export function getSequenceIterator(arg) {
    if (Array.isArray(arg)) {
        return Iterator.fromArray(arg);
    }
    else if (!arg) {
        return Iterator.empty();
    }
    else {
        return arg;
    }
}
var ArrayIterator = /** @class */ (function () {
    function ArrayIterator(items, start, end, index) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = items.length; }
        if (index === void 0) { index = start - 1; }
        this.items = items;
        this.start = start;
        this.end = end;
        this.index = index;
    }
    ArrayIterator.prototype.first = function () {
        this.index = this.start;
        return this.current();
    };
    ArrayIterator.prototype.next = function () {
        this.index = Math.min(this.index + 1, this.end);
        return this.current();
    };
    ArrayIterator.prototype.current = function () {
        if (this.index === this.start - 1 || this.index === this.end) {
            return null;
        }
        return this.items[this.index];
    };
    return ArrayIterator;
}());
export { ArrayIterator };
var ArrayNavigator = /** @class */ (function (_super) {
    __extends(ArrayNavigator, _super);
    function ArrayNavigator(items, start, end, index) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = items.length; }
        if (index === void 0) { index = start - 1; }
        return _super.call(this, items, start, end, index) || this;
    }
    ArrayNavigator.prototype.current = function () {
        return _super.prototype.current.call(this);
    };
    ArrayNavigator.prototype.previous = function () {
        this.index = Math.max(this.index - 1, this.start - 1);
        return this.current();
    };
    ArrayNavigator.prototype.first = function () {
        this.index = this.start;
        return this.current();
    };
    ArrayNavigator.prototype.last = function () {
        this.index = this.end - 1;
        return this.current();
    };
    ArrayNavigator.prototype.parent = function () {
        return null;
    };
    return ArrayNavigator;
}(ArrayIterator));
export { ArrayNavigator };
var MappedIterator = /** @class */ (function () {
    function MappedIterator(iterator, fn) {
        this.iterator = iterator;
        this.fn = fn;
        // noop
    }
    MappedIterator.prototype.next = function () { return this.fn(this.iterator.next()); };
    return MappedIterator;
}());
export { MappedIterator };
var MappedNavigator = /** @class */ (function (_super) {
    __extends(MappedNavigator, _super);
    function MappedNavigator(navigator, fn) {
        var _this = _super.call(this, navigator, fn) || this;
        _this.navigator = navigator;
        return _this;
    }
    MappedNavigator.prototype.current = function () { return this.fn(this.navigator.current()); };
    MappedNavigator.prototype.previous = function () { return this.fn(this.navigator.previous()); };
    MappedNavigator.prototype.parent = function () { return this.fn(this.navigator.parent()); };
    MappedNavigator.prototype.first = function () { return this.fn(this.navigator.first()); };
    MappedNavigator.prototype.last = function () { return this.fn(this.navigator.last()); };
    MappedNavigator.prototype.next = function () { return this.fn(this.navigator.next()); };
    return MappedNavigator;
}(MappedIterator));
export { MappedNavigator };
