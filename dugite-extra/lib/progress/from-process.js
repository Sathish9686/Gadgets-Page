"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var byline = require('byline');
/**
 * Merges an instance of IGitExecutionOptions with a process callback provided
 * by progressProcessCallback.
 *
 * If the given options object already has a processCallback specified it will
 * be overwritten.
 */
function executionOptionsWithProgress(options, parser, progressCallback) {
    return merge(options, {
        processCallback: progressProcessCallback(parser, progressCallback),
    });
}
exports.executionOptionsWithProgress = executionOptionsWithProgress;
/**
 * Returns a callback which can be passed along to the processCallback option
 * in IGitExecution. The callback then takes care of reading stderr of the
 * process and parsing its contents using the provided parser.
 */
function progressProcessCallback(parser, progressCallback) {
    return function (process) {
        byline(process.stderr).on('data', function (line) {
            progressCallback(parser.parse(line));
        });
    };
}
exports.progressProcessCallback = progressProcessCallback;
function merge(obj, subset) {
    var copy = Object.assign({}, obj);
    for (var k in subset) {
        if (subset.hasOwnProperty(k)) {
            copy[k] = subset[k];
        }
    }
    return copy;
}
//# sourceMappingURL=from-process.js.map