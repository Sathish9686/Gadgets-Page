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
 * of the individual progress reporting steps in a pull operation.
 *
 * Note: A pull is essentially the same as a fetch except we might
 * have to check out some files at the end. We assume that these
 * delta updates are fairly quick though.
 */
var steps = [
    { title: 'remote: Compressing objects', weight: 0.1 },
    { title: 'Receiving objects', weight: 0.7 },
    { title: 'Resolving deltas', weight: 0.15 },
    { title: 'Checking out files', weight: 0.15 },
];
/**
 * A utility class for interpreting the output from `git pull --progress`
 * and turning that into a percentage value estimating the overall progress
 * of the pull.
 */
var PullProgressParser = /** @class */ (function (_super) {
    __extends(PullProgressParser, _super);
    function PullProgressParser() {
        return _super.call(this, steps) || this;
    }
    return PullProgressParser;
}(git_1.GitProgressParser));
exports.PullProgressParser = PullProgressParser;
//# sourceMappingURL=pull.js.map