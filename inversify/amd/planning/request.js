define(["require", "exports", "../utils/id"], function (require, exports, id_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Request = void 0;
    var Request = (function () {
        function Request(serviceIdentifier, parentContext, parentRequest, bindings, target) {
            this.id = id_1.id();
            this.serviceIdentifier = serviceIdentifier;
            this.parentContext = parentContext;
            this.parentRequest = parentRequest;
            this.target = target;
            this.childRequests = [];
            this.bindings = (Array.isArray(bindings) ? bindings : [bindings]);
            this.requestScope = parentRequest === null
                ? new Map()
                : null;
        }
        Request.prototype.addChildRequest = function (serviceIdentifier, bindings, target) {
            var child = new Request(serviceIdentifier, this.parentContext, this, bindings, target);
            this.childRequests.push(child);
            return child;
        };
        return Request;
    }());
    exports.Request = Request;
});
