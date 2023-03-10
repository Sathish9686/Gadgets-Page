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
import * as extpath from './extpath';
import * as paths from './path';
import { URI } from './uri';
import { equalsIgnoreCase } from './strings';
import { Schemas } from './network';
import { isLinux, isWindows } from './platform';
import { parse } from './glob';
import { TernarySearchTree } from './map';
export function getComparisonKey(resource) {
    return hasToIgnoreCase(resource) ? resource.toString().toLowerCase() : resource.toString();
}
export function hasToIgnoreCase(resource) {
    // A file scheme resource is in the same platform as code, so ignore case for non linux platforms
    // Resource can be from another platform. Lowering the case as an hack. Should come from File system provider
    return resource && resource.scheme === Schemas.file ? !isLinux : true;
}
export function basenameOrAuthority(resource) {
    return basename(resource) || resource.authority;
}
/**
 * Tests whether a `candidate` URI is a parent or equal of a given `base` URI.
 * @param base A uri which is "longer"
 * @param parentCandidate A uri which is "shorter" then `base`
 */
export function isEqualOrParent(base, parentCandidate, ignoreCase) {
    if (ignoreCase === void 0) { ignoreCase = hasToIgnoreCase(base); }
    if (base.scheme === parentCandidate.scheme) {
        if (base.scheme === Schemas.file) {
            return extpath.isEqualOrParent(originalFSPath(base), originalFSPath(parentCandidate), ignoreCase);
        }
        if (isEqualAuthority(base.authority, parentCandidate.authority)) {
            return extpath.isEqualOrParent(base.path, parentCandidate.path, ignoreCase, '/');
        }
    }
    return false;
}
/**
 * Tests wheter the two authorities are the same
 */
export function isEqualAuthority(a1, a2) {
    return a1 === a2 || equalsIgnoreCase(a1, a2);
}
export function isEqual(first, second, ignoreCase) {
    if (ignoreCase === void 0) { ignoreCase = hasToIgnoreCase(first); }
    if (first === second) {
        return true;
    }
    if (!first || !second) {
        return false;
    }
    if (first.scheme !== second.scheme || !isEqualAuthority(first.authority, second.authority)) {
        return false;
    }
    var p1 = first.path || '/', p2 = second.path || '/';
    return p1 === p2 || ignoreCase && equalsIgnoreCase(p1 || '/', p2 || '/');
}
export function basename(resource) {
    return paths.posix.basename(resource.path);
}
export function extname(resource) {
    return paths.posix.extname(resource.path);
}
/**
 * Return a URI representing the directory of a URI path.
 *
 * @param resource The input URI.
 * @returns The URI representing the directory of the input URI.
 */
export function dirname(resource) {
    if (resource.path.length === 0) {
        return resource;
    }
    if (resource.scheme === Schemas.file) {
        return URI.file(paths.dirname(originalFSPath(resource)));
    }
    var dirname = paths.posix.dirname(resource.path);
    if (resource.authority && dirname.length && dirname.charCodeAt(0) !== 47 /* Slash */) {
        console.error("dirname(\"" + resource.toString + ")) resulted in a relative path");
        dirname = '/'; // If a URI contains an authority component, then the path component must either be empty or begin with a CharCode.Slash ("/") character
    }
    return resource.with({
        path: dirname
    });
}
/**
 * Join a URI path with path fragments and normalizes the resulting path.
 *
 * @param resource The input URI.
 * @param pathFragment The path fragment to add to the URI path.
 * @returns The resulting URI.
 */
export function joinPath(resource) {
    var _a;
    var pathFragment = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        pathFragment[_i - 1] = arguments[_i];
    }
    var joinedPath;
    if (resource.scheme === Schemas.file) {
        joinedPath = URI.file(paths.join.apply(paths, __spreadArrays([originalFSPath(resource)], pathFragment))).path;
    }
    else {
        joinedPath = (_a = paths.posix).join.apply(_a, __spreadArrays([resource.path || '/'], pathFragment));
    }
    return resource.with({
        path: joinedPath
    });
}
/**
 * Normalizes the path part of a URI: Resolves `.` and `..` elements with directory names.
 *
 * @param resource The URI to normalize the path.
 * @returns The URI with the normalized path.
 */
export function normalizePath(resource) {
    if (!resource.path.length) {
        return resource;
    }
    var normalizedPath;
    if (resource.scheme === Schemas.file) {
        normalizedPath = URI.file(paths.normalize(originalFSPath(resource))).path;
    }
    else {
        normalizedPath = paths.posix.normalize(resource.path);
    }
    return resource.with({
        path: normalizedPath
    });
}
/**
 * Returns the fsPath of an URI where the drive letter is not normalized.
 * See #56403.
 */
export function originalFSPath(uri) {
    var value;
    var uriPath = uri.path;
    if (uri.authority && uriPath.length > 1 && uri.scheme === Schemas.file) {
        // unc path: file://shares/c$/far/boo
        value = "//" + uri.authority + uriPath;
    }
    else if (isWindows
        && uriPath.charCodeAt(0) === 47 /* Slash */
        && extpath.isWindowsDriveLetter(uriPath.charCodeAt(1))
        && uriPath.charCodeAt(2) === 58 /* Colon */) {
        value = uriPath.substr(1);
    }
    else {
        // other path
        value = uriPath;
    }
    if (isWindows) {
        value = value.replace(/\//g, '\\');
    }
    return value;
}
/**
 * Returns true if the URI path is absolute.
 */
export function isAbsolutePath(resource) {
    return !!resource.path && resource.path[0] === '/';
}
/**
 * Returns true if the URI path has a trailing path separator
 */
export function hasTrailingPathSeparator(resource, sep) {
    if (sep === void 0) { sep = paths.sep; }
    if (resource.scheme === Schemas.file) {
        var fsp = originalFSPath(resource);
        return fsp.length > extpath.getRoot(fsp).length && fsp[fsp.length - 1] === sep;
    }
    else {
        var p = resource.path;
        return (p.length > 1 && p.charCodeAt(p.length - 1) === 47 /* Slash */) && !(/^[a-zA-Z]:(\/$|\\$)/.test(resource.fsPath)); // ignore the slash at offset 0
    }
}
/**
 * Removes a trailing path separator, if there's one.
 * Important: Doesn't remove the first slash, it would make the URI invalid
 */
export function removeTrailingPathSeparator(resource, sep) {
    if (sep === void 0) { sep = paths.sep; }
    // Make sure that the path isn't a drive letter. A trailing separator there is not removable.
    if (hasTrailingPathSeparator(resource, sep)) {
        return resource.with({ path: resource.path.substr(0, resource.path.length - 1) });
    }
    return resource;
}
/**
 * Adds a trailing path separator to the URI if there isn't one already.
 * For example, c:\ would be unchanged, but c:\users would become c:\users\
 */
export function addTrailingPathSeparator(resource, sep) {
    if (sep === void 0) { sep = paths.sep; }
    var isRootSep = false;
    if (resource.scheme === Schemas.file) {
        var fsp = originalFSPath(resource);
        isRootSep = ((fsp !== undefined) && (fsp.length === extpath.getRoot(fsp).length) && (fsp[fsp.length - 1] === sep));
    }
    else {
        sep = '/';
        var p = resource.path;
        isRootSep = p.length === 1 && p.charCodeAt(p.length - 1) === 47 /* Slash */;
    }
    if (!isRootSep && !hasTrailingPathSeparator(resource, sep)) {
        return resource.with({ path: resource.path + '/' });
    }
    return resource;
}
/**
 * Returns a relative path between two URIs. If the URIs don't have the same schema or authority, `undefined` is returned.
 * The returned relative path always uses forward slashes.
 */
export function relativePath(from, to, ignoreCase) {
    if (ignoreCase === void 0) { ignoreCase = hasToIgnoreCase(from); }
    if (from.scheme !== to.scheme || !isEqualAuthority(from.authority, to.authority)) {
        return undefined;
    }
    if (from.scheme === Schemas.file) {
        var relativePath_1 = paths.relative(from.path, to.path);
        return isWindows ? extpath.toSlashes(relativePath_1) : relativePath_1;
    }
    var fromPath = from.path || '/', toPath = to.path || '/';
    if (ignoreCase) {
        // make casing of fromPath match toPath
        var i = 0;
        for (var len = Math.min(fromPath.length, toPath.length); i < len; i++) {
            if (fromPath.charCodeAt(i) !== toPath.charCodeAt(i)) {
                if (fromPath.charAt(i).toLowerCase() !== toPath.charAt(i).toLowerCase()) {
                    break;
                }
            }
        }
        fromPath = toPath.substr(0, i) + fromPath.substr(i);
    }
    return paths.posix.relative(fromPath, toPath);
}
/**
 * Resolves an absolute or relative path against a base URI.
 * The path can be relative or absolute posix or a Windows path
 */
export function resolvePath(base, path) {
    if (base.scheme === Schemas.file) {
        var newURI = URI.file(paths.resolve(originalFSPath(base), path));
        return base.with({
            authority: newURI.authority,
            path: newURI.path
        });
    }
    if (path.indexOf('/') === -1) { // no slashes? it's likely a Windows path
        path = extpath.toSlashes(path);
        if (/^[a-zA-Z]:(\/|$)/.test(path)) { // starts with a drive letter
            path = '/' + path;
        }
    }
    return base.with({
        path: paths.posix.resolve(base.path, path)
    });
}
export function distinctParents(items, resourceAccessor) {
    var distinctParents = [];
    var _loop_1 = function (i) {
        var candidateResource = resourceAccessor(items[i]);
        if (items.some(function (otherItem, index) {
            if (index === i) {
                return false;
            }
            return isEqualOrParent(candidateResource, resourceAccessor(otherItem));
        })) {
            return "continue";
        }
        distinctParents.push(items[i]);
    };
    for (var i = 0; i < items.length; i++) {
        _loop_1(i);
    }
    return distinctParents;
}
/**
 * Data URI related helpers.
 */
export var DataUri;
(function (DataUri) {
    DataUri.META_DATA_LABEL = 'label';
    DataUri.META_DATA_DESCRIPTION = 'description';
    DataUri.META_DATA_SIZE = 'size';
    DataUri.META_DATA_MIME = 'mime';
    function parseMetaData(dataUri) {
        var metadata = new Map();
        // Given a URI of:  data:image/png;size:2313;label:SomeLabel;description:SomeDescription;base64,77+9UE5...
        // the metadata is: size:2313;label:SomeLabel;description:SomeDescription
        var meta = dataUri.path.substring(dataUri.path.indexOf(';') + 1, dataUri.path.lastIndexOf(';'));
        meta.split(';').forEach(function (property) {
            var _a = property.split(':'), key = _a[0], value = _a[1];
            if (key && value) {
                metadata.set(key, value);
            }
        });
        // Given a URI of:  data:image/png;size:2313;label:SomeLabel;description:SomeDescription;base64,77+9UE5...
        // the mime is: image/png
        var mime = dataUri.path.substring(0, dataUri.path.indexOf(';'));
        if (mime) {
            metadata.set(DataUri.META_DATA_MIME, mime);
        }
        return metadata;
    }
    DataUri.parseMetaData = parseMetaData;
})(DataUri || (DataUri = {}));
var ResourceGlobMatcher = /** @class */ (function () {
    function ResourceGlobMatcher(globalExpression, rootExpressions) {
        this.expressionsByRoot = TernarySearchTree.forPaths();
        this.globalExpression = parse(globalExpression);
        for (var _i = 0, rootExpressions_1 = rootExpressions; _i < rootExpressions_1.length; _i++) {
            var expression = rootExpressions_1[_i];
            this.expressionsByRoot.set(expression.root.toString(), { root: expression.root, expression: parse(expression.expression) });
        }
    }
    ResourceGlobMatcher.prototype.matches = function (resource) {
        var rootExpression = this.expressionsByRoot.findSubstr(resource.toString());
        if (rootExpression) {
            var path = relativePath(rootExpression.root, resource);
            if (path && !!rootExpression.expression(path)) {
                return true;
            }
        }
        return !!this.globalExpression(resource.path);
    };
    return ResourceGlobMatcher;
}());
export { ResourceGlobMatcher };
export function toLocalResource(resource, authority) {
    if (authority) {
        var path = resource.path;
        if (path && path[0] !== paths.posix.sep) {
            path = paths.posix.sep + path;
        }
        return resource.with({ scheme: Schemas.vscodeRemote, authority: authority, path: path });
    }
    return resource.with({ scheme: Schemas.file });
}
