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
 * of the individual progress reporting steps in a clone operation
 */
var steps = [
    { title: 'remote: Compressing objects', weight: 0.1 },
    { title: 'Receiving objects', weight: 0.6 },
    { title: 'Resolving deltas', weight: 0.1 },
    { title: 'Checking out files', weight: 0.2 },
];
/**
 * A utility class for interpreting the output from `git clone --progress`
 * and turning that into a percentage value estimating the overall progress
 * of the clone.
 */
var CloneProgressParser = /** @class */ (function (_super) {
    __extends(CloneProgressParser, _super);
    function CloneProgressParser() {
        return _super.call(this, steps) || this;
    }
    return CloneProgressParser;
}(git_1.GitProgressParser));
exports.CloneProgressParser = CloneProgressParser;
//# sourceMappingURL=clone.js.map