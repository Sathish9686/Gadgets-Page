define(["require", "exports", "../constants/metadata_keys"], function (require, exports, METADATA_KEY) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Metadata = void 0;
    var Metadata = (function () {
        function Metadata(key, value) {
            this.key = key;
            this.value = value;
        }
        Metadata.prototype.toString = function () {
            if (this.key === METADATA_KEY.NAMED_TAG) {
                return "named: " + this.value.toString() + " ";
            }
            else {
                return "tagged: { key:" + this.key.toString() + ", value: " + this.value + " }";
            }
        };
        return Metadata;
    }());
    exports.Metadata = Metadata;
});
