"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var git_1 = require("./git");
var steps = [
    { title: 'Checking out files', weight: 1 },
];
/**
 * A class that parses output from `git checkout --progress` and provides
 * structured progress events.
 */
var CheckoutProgressParser = /** @class */ (function (_super) {
    __extends(CheckoutProgressParser, _super);
    function CheckoutProgressParser() {
        return _super.call(this, steps) || this;
    }
    return CheckoutProgressParser;
}(git_1.GitProgressParser));
exports.CheckoutProgressParser = CheckoutProgressParser;
//# sourceMappingURL=checkout.js.map