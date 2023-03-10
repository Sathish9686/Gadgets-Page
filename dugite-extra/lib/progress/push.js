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
/**
 * Highly approximate (some would say outright inaccurate) division
 * of the individual progress reporting steps in a push operation
 */
var steps = [
    { title: 'Compressing objects', weight: 0.2 },
    { title: 'Writing objects', weight: 0.7 },
    { title: 'remote: Resolving deltas', weight: 0.1 },
];
/**
 * A utility class for interpreting the output from `git push --progress`
 * and turning that into a percentage value estimating the overall progress
 * of the clone.
 */
var PushProgressParser = /** @class */ (function (_super) {
    __extends(PushProgressParser, _super);
    function PushProgressParser() {
        return _super.call(this, steps) || this;
    }
    return PushProgressParser;
}(git_1.GitProgressParser));
exports.PushProgressParser = PushProgressParser;
//# sourceMappingURL=push.js.map