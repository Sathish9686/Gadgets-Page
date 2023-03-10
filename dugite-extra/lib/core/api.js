"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Remove the remote prefix from the string. If there is no prefix, returns
 * `undefined`. E.g.:
 *
 *  origin/my-branch       -> my-branch
 *  origin/thing/my-branch -> thing/my-branch
 *  my-branch              -> null
 */
function removeRemotePrefix(name) {
    var pieces = name.match(/.*?\/(.*)/);
    if (!pieces || pieces.length < 2) {
        return undefined;
    }
    return pieces[1];
}
exports.removeRemotePrefix = removeRemotePrefix;
//# sourceMappingURL=api.js.map