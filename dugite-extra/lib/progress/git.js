"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A utility class for interpreting progress output from `git`
 * and turning that into a percentage value estimating the overall progress
 * of the an operation. An operation could be something like `git fetch`
 * which contains multiple steps, each individually reported by Git as
 * progress events between 0 and 100%.
 *
 * A parser cannot be reused, it's mean to parse a single stderr stream
 * for Git.
 */
var GitProgressParser = /** @class */ (function () {
    /**
     * Initialize a new instance of a Git progress parser.
     *
     * @param steps - A series of steps that could be present in the git
     *                output with relative weight between these steps. Note
     *                that order is significant here as once the parser sees
     *                a progress line that matches a step all previous steps
     *                are considered completed and overall progress is adjusted
     *                accordingly.
     */
    function GitProgressParser(steps) {
        /* The provided steps should always occur in order but some
         * might not happen at all (like remote compression of objects) so
         * we keep track of the "highest" seen step so that we can fill in
         * progress with the assumption that we've already seen the previous
         * steps.
         */
        this.stepIndex = 0;
        this.lastPercent = 0;
        if (!steps.length) {
            throw new Error('must specify at least one step');
        }
        // Scale the step weight so that they're all a percentage
        // adjusted to the total weight of all steps.
        var totalStepWeight = steps.reduce(function (sum, step) { return sum + step.weight; }, 0);
        this.steps = steps.map(function (step) { return ({
            title: step.title,
            weight: step.weight / totalStepWeight,
        }); });
    }
    /**
     * Parse the given line of output from Git, returns either an IGitProgress
     * instance if the line could successfully be parsed as a Git progress
     * event whose title was registered with this parser or an IGitOutput
     * instance if the line couldn't be parsed or if the title wasn't
     * registered with the parser.
     */
    GitProgressParser.prototype.parse = function (line) {
        var progress = parse(line);
        if (!progress) {
            return { kind: 'context', text: line, percent: this.lastPercent };
        }
        var percent = 0;
        for (var i = 0; i < this.steps.length; i++) {
            var step = this.steps[i];
            if (i >= this.stepIndex && progress.title === step.title) {
                if (progress.total) {
                    percent += step.weight * (progress.value / progress.total);
                }
                this.stepIndex = i;
                this.lastPercent = percent;
                return { kind: 'progress', percent: percent, details: progress };
            }
            else {
                percent += step.weight;
            }
        }
        return { kind: 'context', text: line, percent: this.lastPercent };
    };
    return GitProgressParser;
}());
exports.GitProgressParser = GitProgressParser;
var percentRe = /^(\d{1,3})% \((\d+)\/(\d+)\)$/;
var valueOnlyRe = /^\d+$/;
/**
 * Attempts to parse a single line of progress output from Git.
 *
 * For details about how Git formats progress see
 *
 *   https://github.com/git/git/blob/6a2c2f8d34fa1e8f3bb85d159d354810ed63692e/progress.c
 *
 * Some examples:
 *  remote: Counting objects: 123
 *  remote: Counting objects: 167587, done.
 *  Receiving objects:  99% (166741/167587), 272.10 MiB | 2.39 MiB/s
 *  Checking out files:  100% (728/728)
 *  Checking out files:  100% (728/728), done
 *
 * @returns An object containing well-structured information about the progress
 *          or null if the line could not be parsed as a Git progress line.
 */
function parse(line) {
    var titleLength = line.lastIndexOf(': ');
    if (titleLength === 0) {
        return null;
    }
    if (titleLength - 2 >= line.length) {
        return null;
    }
    var title = line.substr(0, titleLength);
    var progressText = line.substr(title.length + 2).trim();
    if (!progressText.length) {
        return null;
    }
    var progressParts = progressText.split(', ');
    if (!progressParts.length) {
        return null;
    }
    var value;
    var total = undefined;
    var percent = undefined;
    if (valueOnlyRe.test(progressParts[0])) {
        value = parseInt(progressParts[0], 10);
        if (isNaN(value)) {
            return null;
        }
    }
    else {
        var percentMatch = percentRe.exec(progressParts[0]);
        if (!percentMatch || percentMatch.length !== 4) {
            return null;
        }
        percent = parseInt(percentMatch[1], 10);
        value = parseInt(percentMatch[2], 10);
        total = parseInt(percentMatch[3], 10);
        if (isNaN(percent) || isNaN(value) || isNaN(total)) {
            return null;
        }
    }
    var done = false;
    // We don't parse throughput at the moment so let's just loop
    // through the remaining
    for (var i = 1; i < progressParts.length; i++) {
        if (progressParts[i] === 'done.') {
            done = true;
            break;
        }
    }
    return { title: title, value: value, percent: percent, total: total, done: done, text: line };
}
exports.parse = parse;
//# sourceMappingURL=git.js.map