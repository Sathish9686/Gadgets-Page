/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { createDecorator } from '../../instantiation/common/instantiation';
import { basename } from '../../../base/common/resources';
import { localize } from '../../../nls';
export var IDialogService = createDecorator('dialogService');
export var IFileDialogService = createDecorator('fileDialogService');
var MAX_CONFIRM_FILES = 10;
export function getFileNamesMessage(fileNamesOrResources) {
    var message = [];
    message.push.apply(message, fileNamesOrResources.slice(0, MAX_CONFIRM_FILES).map(function (fileNameOrResource) { return typeof fileNameOrResource === 'string' ? fileNameOrResource : basename(fileNameOrResource); }));
    if (fileNamesOrResources.length > MAX_CONFIRM_FILES) {
        if (fileNamesOrResources.length - MAX_CONFIRM_FILES === 1) {
            message.push(localize('moreFile', "...1 additional file not shown"));
        }
        else {
            message.push(localize('moreFiles', "...{0} additional files not shown", fileNamesOrResources.length - MAX_CONFIRM_FILES));
        }
    }
    message.push('');
    return message.join('\n');
}
