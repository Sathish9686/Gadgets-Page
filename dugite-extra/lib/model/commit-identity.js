"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A tuple of name, email, and date for the author or commit
 * info in a commit.
 */
var CommitIdentity = /** @class */ (function () {
    function CommitIdentity(name, email, date, tzOffset) {
        this.name = name;
        this.email = email;
        this.date = date;
        this.tzOffset = tzOffset || new Date().getTimezoneOffset();
    }
    /**
     * Parses a Git ident string (GIT_AUTHOR_IDENT or GIT_COMMITTER_IDENT)
     * into a commit identity. Returns null if string could not be parsed.
     */
    CommitIdentity.parseIdentity = function (identity) {
        // See fmt_ident in ident.c:
        //  https://github.com/git/git/blob/3ef7618e6/ident.c#L346
        //
        // Format is "NAME <EMAIL> DATE"
        //  Markus Olsson <j.markus.olsson@gmail.com> 1475670580 +0200
        //
        // Note that `git var` will strip any < and > from the name and email, see:
        //  https://github.com/git/git/blob/3ef7618e6/ident.c#L396
        //
        // Note also that this expects a date formatted with the RAW option in git see:
        //  https://github.com/git/git/blob/35f6318d4/date.c#L191
        //
        var m = identity.match(/^(.*?) <(.*?)> (\d+) (\+|-)?(\d{2})(\d{2})/);
        if (!m) {
            return null;
        }
        var name = m[1];
        var email = m[2];
        // The date is specified as seconds from the epoch,
        // Date() expects milliseconds since the epoch.
        var date = new Date(parseInt(m[3], 10) * 1000);
        // The RAW option never uses alphanumeric timezone identifiers and in my
        // testing I've never found it to omit the leading + for a positive offset
        // but the docs for strprintf seems to suggest it might on some systems so
        // we're playing it safe.
        var tzSign = m[4] === '-' ? '-' : '+';
        var tzHH = m[5];
        var tzmm = m[6];
        var tzMinutes = parseInt(tzHH, 10) * 60 + parseInt(tzmm, 10);
        var tzOffset = tzMinutes * (tzSign === '-' ? -1 : 1);
        return new CommitIdentity(name, email, date, tzOffset);
    };
    return CommitIdentity;
}());
exports.CommitIdentity = CommitIdentity;
//# sourceMappingURL=commit-identity.js.map