"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../core/api");
// NOTE: The values here matter as they are used to sort
// local and remote branches, Local should come before Remote
var BranchType;
(function (BranchType) {
    BranchType[BranchType["Local"] = 0] = "Local";
    BranchType[BranchType["Remote"] = 1] = "Remote";
})(BranchType = exports.BranchType || (exports.BranchType = {}));
/** A branch as loaded from Git. */
var Branch = /** @class */ (function () {
    function Branch(name, upstream, tip, type) {
        this.name = name;
        this.upstream = upstream;
        this.tip = tip;
        this.type = type;
    }
    Object.defineProperty(Branch.prototype, "remote", {
        /** The name of the upstream's remote. */
        get: function () {
            var upstream = this.upstream;
            if (!upstream) {
                return undefined;
            }
            var pieces = upstream.match(/(.*?)\/.*/);
            if (!pieces || pieces.length < 2) {
                return undefined;
            }
            return pieces[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Branch.prototype, "upstreamWithoutRemote", {
        /**
         * The name of the branch's upstream without the remote prefix.
         */
        get: function () {
            if (!this.upstream) {
                return undefined;
            }
            return api_1.removeRemotePrefix(this.upstream);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Branch.prototype, "nameWithoutRemote", {
        /**
         * The name of the branch without the remote prefix. If the branch is a local
         * branch, this is the same as its `name`.
         */
        get: function () {
            if (this.type === BranchType.Local) {
                return this.name;
            }
            else {
                var withoutRemote = api_1.removeRemotePrefix(this.name);
                return withoutRemote || this.name;
            }
        },
        enumerable: true,
        configurable: true
    });
    return Branch;
}());
exports.Branch = Branch;
//# sourceMappingURL=branch.js.map