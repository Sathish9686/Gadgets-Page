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
export var ListAriaRootRole;
(function (ListAriaRootRole) {
    /** default tree structure role */
    ListAriaRootRole["TREE"] = "tree";
    /** role='tree' can interfere with screenreaders reading nested elements inside the tree row. Use FORM in that case. */
    ListAriaRootRole["FORM"] = "form";
})(ListAriaRootRole || (ListAriaRootRole = {}));
export var ListDragOverReactions = {
    reject: function () { return { accept: false }; },
    accept: function () { return { accept: true }; },
};
var ListError = /** @class */ (function (_super) {
    __extends(ListError, _super);
    function ListError(user, message) {
        return _super.call(this, "ListError [" + user + "] " + message) || this;
    }
    return ListError;
}(Error));
export { ListError };
var CachedListVirtualDelegate = /** @class */ (function () {
    function CachedListVirtualDelegate() {
        this.cache = new WeakMap();
    }
    CachedListVirtualDelegate.prototype.getHeight = function (element) {
        var _a;
        return (_a = this.cache.get(element)) !== null && _a !== void 0 ? _a : this.estimateHeight(element);
    };
    CachedListVirtualDelegate.prototype.setDynamicHeight = function (element, height) {
        if (height > 0) {
            this.cache.set(element, height);
        }
    };
    return CachedListVirtualDelegate;
}());
export { CachedListVirtualDelegate };
