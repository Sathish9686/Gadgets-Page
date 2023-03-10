/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { SimpleWorkerServer } from '../base/common/worker/simpleWorker';
import { EditorSimpleWorker } from './common/services/editorSimpleWorker';
var initialized = false;
export function initialize(foreignModule) {
    if (initialized) {
        return;
    }
    initialized = true;
    var simpleWorker = new SimpleWorkerServer(function (msg) {
        self.postMessage(msg);
    }, function (host) { return new EditorSimpleWorker(host, foreignModule); });
    self.onmessage = function (e) {
        simpleWorker.onmessage(e.data);
    };
}
self.onmessage = function (e) {
    // Ignore first message in this case and initialize if not yet initialized
    if (!initialized) {
        initialize(null);
    }
};
