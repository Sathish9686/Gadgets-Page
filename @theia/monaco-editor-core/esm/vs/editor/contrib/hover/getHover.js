/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { coalesce } from '../../../base/common/arrays';
import { CancellationToken } from '../../../base/common/cancellation';
import { onUnexpectedExternalError } from '../../../base/common/errors';
import { registerModelAndPositionCommand } from '../../browser/editorExtensions';
import { HoverProviderRegistry } from '../../common/modes';
export function getHover(model, position, token) {
    var supports = HoverProviderRegistry.ordered(model);
    var promises = supports.map(function (support) {
        return Promise.resolve(support.provideHover(model, position, token)).then(function (hover) {
            return hover && isValid(hover) ? hover : undefined;
        }, function (err) {
            onUnexpectedExternalError(err);
            return undefined;
        });
    });
    return Promise.all(promises).then(coalesce);
}
registerModelAndPositionCommand('_executeHoverProvider', function (model, position) { return getHover(model, position, CancellationToken.None); });
function isValid(result) {
    var hasRange = (typeof result.range !== 'undefined');
    var hasHtmlContent = typeof result.contents !== 'undefined' && result.contents && result.contents.length > 0;
    return hasRange && hasHtmlContent;
}
