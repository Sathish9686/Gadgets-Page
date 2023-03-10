"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiFileDownloadHandler = exports.SingleFileDownloadHandler = exports.DownloadLinkHandler = exports.FileDownloadHandler = void 0;
var os = require("os");
var fs = require("fs-extra");
var path = require("path");
var uuid_1 = require("uuid");
var inversify_1 = require("inversify");
var http_status_codes_1 = require("http-status-codes");
var uri_1 = require("@theia/core/lib/common/uri");
var objects_1 = require("@theia/core/lib/common/objects");
var logger_1 = require("@theia/core/lib/common/logger");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var directory_archiver_1 = require("./directory-archiver");
var file_download_data_1 = require("../../common/download/file-download-data");
var file_download_cache_1 = require("./file-download-cache");
var FileDownloadHandler = /** @class */ (function () {
    function FileDownloadHandler() {
    }
    /**
     * Prepares the file and the link for download
     */
    FileDownloadHandler.prototype.prepareDownload = function (request, response, options) {
        return __awaiter(this, void 0, void 0, function () {
            var name, stat, data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = path.basename(options.filePath);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fs.access(options.filePath, fs.constants.R_OK)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, fs.stat(options.filePath)];
                    case 3:
                        stat = _a.sent();
                        this.fileDownloadCache.addDownload(options.downloadId, { file: options.filePath, remove: options.remove, size: stat.size, root: options.root });
                        data = { name: name, id: options.downloadId };
                        response.status(http_status_codes_1.OK).send(data).end();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        this.handleError(response, e_1, http_status_codes_1.INTERNAL_SERVER_ERROR);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FileDownloadHandler.prototype.download = function (request, response, downloadInfo, id) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, statSize, range, rangeStart, rangeEnd, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = downloadInfo.file;
                        statSize = downloadInfo.size;
                        // this sets the content-disposition and content-type automatically
                        response.attachment(filePath);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs.access(filePath, fs.constants.R_OK)];
                    case 2:
                        _a.sent();
                        response.setHeader('Accept-Ranges', 'bytes');
                        range = this.parseRangeHeader(request.headers['range'], statSize);
                        if (!range) {
                            response.setHeader('Content-Length', statSize);
                            this.streamDownload(http_status_codes_1.OK, response, fs.createReadStream(filePath), id);
                        }
                        else {
                            rangeStart = range.start;
                            rangeEnd = range.end;
                            if (rangeStart >= statSize || rangeEnd >= statSize) {
                                response.setHeader('Content-Range', "bytes */" + statSize);
                                // Return the 416 'Requested Range Not Satisfiable'.
                                response.status(http_status_codes_1.REQUESTED_RANGE_NOT_SATISFIABLE).end();
                                return [2 /*return*/];
                            }
                            response.setHeader('Content-Range', "bytes " + rangeStart + "-" + rangeEnd + "/" + statSize);
                            response.setHeader('Content-Length', rangeStart === rangeEnd ? 0 : (rangeEnd - rangeStart + 1));
                            response.setHeader('Cache-Control', 'no-cache');
                            this.streamDownload(http_status_codes_1.PARTIAL_CONTENT, response, fs.createReadStream(filePath, { start: rangeStart, end: rangeEnd }), id);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        this.fileDownloadCache.deleteDownload(id);
                        this.handleError(response, e_2, http_status_codes_1.INTERNAL_SERVER_ERROR);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Streams the file and pipe it to the Response to avoid any OOM issues
     */
    FileDownloadHandler.prototype.streamDownload = function (status, response, stream, id) {
        var _this = this;
        response.status(status);
        stream.on('error', function (error) {
            _this.fileDownloadCache.deleteDownload(id);
            _this.handleError(response, error, http_status_codes_1.INTERNAL_SERVER_ERROR);
        });
        response.on('error', function (error) {
            _this.fileDownloadCache.deleteDownload(id);
            _this.handleError(response, error, http_status_codes_1.INTERNAL_SERVER_ERROR);
        });
        response.on('close', function () {
            stream.destroy();
        });
        stream.pipe(response);
    };
    FileDownloadHandler.prototype.parseRangeHeader = function (range, statSize) {
        if (!range || range.length === 0 || Array.isArray(range)) {
            return;
        }
        var index = range.indexOf('=');
        if (index === -1) {
            return;
        }
        var rangeType = range.slice(0, index);
        if (rangeType !== 'bytes') {
            return;
        }
        var _a = __read(range.slice(index + 1).split('-').map(function (r) { return parseInt(r, 10); }), 2), start = _a[0], end = _a[1];
        return {
            start: isNaN(start) ? 0 : start,
            end: (isNaN(end) || end > statSize - 1) ? (statSize - 1) : end
        };
    };
    FileDownloadHandler.prototype.archive = function (inputPath, outputPath, entries) {
        if (outputPath === void 0) { outputPath = path.join(os.tmpdir(), uuid_1.v4()); }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.directoryArchiver.archive(inputPath, outputPath, entries)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, outputPath];
                }
            });
        });
    };
    FileDownloadHandler.prototype.createTempDir = function (downloadId) {
        if (downloadId === void 0) { downloadId = uuid_1.v4(); }
        return __awaiter(this, void 0, void 0, function () {
            var outputPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outputPath = path.join(os.tmpdir(), downloadId);
                        return [4 /*yield*/, fs.mkdir(outputPath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, outputPath];
                }
            });
        });
    };
    FileDownloadHandler.prototype.handleError = function (response, reason, status) {
        if (status === void 0) { status = http_status_codes_1.INTERNAL_SERVER_ERROR; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logger.error(reason);
                response.status(status).send('Unable to download file.').end();
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        inversify_1.inject(logger_1.ILogger),
        __metadata("design:type", Object)
    ], FileDownloadHandler.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(directory_archiver_1.DirectoryArchiver),
        __metadata("design:type", directory_archiver_1.DirectoryArchiver)
    ], FileDownloadHandler.prototype, "directoryArchiver", void 0);
    __decorate([
        inversify_1.inject(file_download_cache_1.FileDownloadCache),
        __metadata("design:type", file_download_cache_1.FileDownloadCache)
    ], FileDownloadHandler.prototype, "fileDownloadCache", void 0);
    FileDownloadHandler = __decorate([
        inversify_1.injectable()
    ], FileDownloadHandler);
    return FileDownloadHandler;
}());
exports.FileDownloadHandler = FileDownloadHandler;
(function (FileDownloadHandler) {
    FileDownloadHandler.SINGLE = Symbol('single');
    FileDownloadHandler.MULTI = Symbol('multi');
    FileDownloadHandler.DOWNLOAD_LINK = Symbol('download');
})(FileDownloadHandler = exports.FileDownloadHandler || (exports.FileDownloadHandler = {}));
exports.FileDownloadHandler = FileDownloadHandler;
var DownloadLinkHandler = /** @class */ (function (_super) {
    __extends(DownloadLinkHandler, _super);
    function DownloadLinkHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DownloadLinkHandler.prototype.handle = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var method, query, cancelDownload, downloadInfo;
            return __generator(this, function (_a) {
                method = request.method, query = request.query;
                if (method !== 'GET' && method !== 'HEAD') {
                    this.handleError(response, "Unexpected HTTP method. Expected GET got '" + method + "' instead.", http_status_codes_1.METHOD_NOT_ALLOWED);
                    return [2 /*return*/];
                }
                if (query === undefined || query.id === undefined || typeof query.id !== 'string') {
                    this.handleError(response, "Cannot access the 'id' query from the request. The query was: " + JSON.stringify(query) + ".", http_status_codes_1.BAD_REQUEST);
                    return [2 /*return*/];
                }
                cancelDownload = query.cancel;
                downloadInfo = this.fileDownloadCache.getDownload(query.id);
                if (!downloadInfo) {
                    this.handleError(response, "Cannot find the file from the request. The query was: " + JSON.stringify(query) + ".", http_status_codes_1.NOT_FOUND);
                    return [2 /*return*/];
                }
                // allow head request to determine the content length for parallel downloaders
                if (method === 'HEAD') {
                    response.setHeader('Content-Length', downloadInfo.size);
                    response.status(http_status_codes_1.OK).end();
                    return [2 /*return*/];
                }
                if (!cancelDownload) {
                    this.download(request, response, downloadInfo, query.id);
                }
                else {
                    this.logger.info('Download', query.id, 'has been cancelled');
                    this.fileDownloadCache.deleteDownload(query.id);
                }
                return [2 /*return*/];
            });
        });
    };
    DownloadLinkHandler = __decorate([
        inversify_1.injectable()
    ], DownloadLinkHandler);
    return DownloadLinkHandler;
}(FileDownloadHandler));
exports.DownloadLinkHandler = DownloadLinkHandler;
var SingleFileDownloadHandler = /** @class */ (function (_super) {
    __extends(SingleFileDownloadHandler, _super);
    function SingleFileDownloadHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SingleFileDownloadHandler.prototype.handle = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var method, body, query, uri, filePath, stat, _a, downloadId, options, outputRootPath, outputPath, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        method = request.method, body = request.body, query = request.query;
                        if (method !== 'GET') {
                            this.handleError(response, "Unexpected HTTP method. Expected GET got '" + method + "' instead.", http_status_codes_1.METHOD_NOT_ALLOWED);
                            return [2 /*return*/];
                        }
                        if (body !== undefined && !objects_1.isEmpty(body)) {
                            this.handleError(response, "The request body must either undefined or empty when downloading a single file. The body was: " + JSON.stringify(body) + ".", http_status_codes_1.BAD_REQUEST);
                            return [2 /*return*/];
                        }
                        if (query === undefined || query.uri === undefined || typeof query.uri !== 'string') {
                            this.handleError(response, "Cannot access the 'uri' query from the request. The query was: " + JSON.stringify(query) + ".", http_status_codes_1.BAD_REQUEST);
                            return [2 /*return*/];
                        }
                        uri = new uri_1.default(query.uri).toString(true);
                        filePath = file_uri_1.FileUri.fsPath(uri);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs.stat(filePath)];
                    case 2:
                        stat = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        this.handleError(response, "The file does not exist. URI: " + uri + ".", http_status_codes_1.NOT_FOUND);
                        return [2 /*return*/];
                    case 4:
                        _b.trys.push([4, 11, , 12]);
                        downloadId = uuid_1.v4();
                        options = { filePath: filePath, downloadId: downloadId, remove: false };
                        if (!!stat.isDirectory()) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.prepareDownload(request, response, options)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 6: return [4 /*yield*/, this.createTempDir(downloadId)];
                    case 7:
                        outputRootPath = _b.sent();
                        outputPath = path.join(outputRootPath, path.basename(filePath) + ".tar");
                        return [4 /*yield*/, this.archive(filePath, outputPath)];
                    case 8:
                        _b.sent();
                        options.filePath = outputPath;
                        options.remove = true;
                        options.root = outputRootPath;
                        return [4 /*yield*/, this.prepareDownload(request, response, options)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        e_3 = _b.sent();
                        this.handleError(response, e_3, http_status_codes_1.INTERNAL_SERVER_ERROR);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    SingleFileDownloadHandler = __decorate([
        inversify_1.injectable()
    ], SingleFileDownloadHandler);
    return SingleFileDownloadHandler;
}(FileDownloadHandler));
exports.SingleFileDownloadHandler = SingleFileDownloadHandler;
var MultiFileDownloadHandler = /** @class */ (function (_super) {
    __extends(MultiFileDownloadHandler, _super);
    function MultiFileDownloadHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiFileDownloadHandler.prototype.handle = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var method, body, _a, _b, uri, _c, e_4_1, downloadId, outputRootPath_1, distinctUris, tarPaths, _loop_1, this_1, _d, _e, _f, rootUri, uris, e_5_1, options, _g, outputPath, outputPath, e_6;
            var e_4, _h, e_5, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        method = request.method, body = request.body;
                        if (method !== 'PUT') {
                            this.handleError(response, "Unexpected HTTP method. Expected PUT got '" + method + "' instead.", http_status_codes_1.METHOD_NOT_ALLOWED);
                            return [2 /*return*/];
                        }
                        if (body === undefined) {
                            this.handleError(response, 'The request body must be defined when downloading multiple files.', http_status_codes_1.BAD_REQUEST);
                            return [2 /*return*/];
                        }
                        if (!file_download_data_1.FileDownloadData.is(body)) {
                            this.handleError(response, "Unexpected body format. Cannot extract the URIs from the request body. Body was: " + JSON.stringify(body) + ".", http_status_codes_1.BAD_REQUEST);
                            return [2 /*return*/];
                        }
                        if (body.uris.length === 0) {
                            this.handleError(response, "Insufficient body format. No URIs were defined by the request body. Body was: " + JSON.stringify(body) + ".", http_status_codes_1.BAD_REQUEST);
                            return [2 /*return*/];
                        }
                        _k.label = 1;
                    case 1:
                        _k.trys.push([1, 8, 9, 10]);
                        _a = __values(body.uris), _b = _a.next();
                        _k.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 7];
                        uri = _b.value;
                        _k.label = 3;
                    case 3:
                        _k.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, fs.access(file_uri_1.FileUri.fsPath(uri))];
                    case 4:
                        _k.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _c = _k.sent();
                        this.handleError(response, "The file does not exist. URI: " + uri + ".", http_status_codes_1.NOT_FOUND);
                        return [2 /*return*/];
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_4_1 = _k.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_h = _a.return)) _h.call(_a);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        _k.trys.push([10, 26, , 27]);
                        downloadId = uuid_1.v4();
                        return [4 /*yield*/, this.createTempDir(downloadId)];
                    case 11:
                        outputRootPath_1 = _k.sent();
                        distinctUris = Array.from(new Set(body.uris.map(function (uri) { return new uri_1.default(uri); })));
                        tarPaths = [];
                        _loop_1 = function (rootUri, uris) {
                            var rootPath, entries, outputPath;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        rootPath = file_uri_1.FileUri.fsPath(rootUri);
                                        entries = uris.map(file_uri_1.FileUri.fsPath).map(function (p) { return path.relative(rootPath, p); });
                                        outputPath = path.join(outputRootPath_1, path.basename(rootPath) + ".tar");
                                        return [4 /*yield*/, this_1.archive(rootPath, outputPath, entries)];
                                    case 1:
                                        _a.sent();
                                        tarPaths.push(outputPath);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _k.label = 12;
                    case 12:
                        _k.trys.push([12, 18, 19, 20]);
                        return [4 /*yield*/, this.directoryArchiver.findCommonParents(distinctUris)];
                    case 13:
                        _d = __values.apply(void 0, [(_k.sent()).entries()]), _e = _d.next();
                        _k.label = 14;
                    case 14:
                        if (!!_e.done) return [3 /*break*/, 17];
                        _f = __read(_e.value, 2), rootUri = _f[0], uris = _f[1];
                        return [5 /*yield**/, _loop_1(rootUri, uris)];
                    case 15:
                        _k.sent();
                        _k.label = 16;
                    case 16:
                        _e = _d.next();
                        return [3 /*break*/, 14];
                    case 17: return [3 /*break*/, 20];
                    case 18:
                        e_5_1 = _k.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 20];
                    case 19:
                        try {
                            if (_e && !_e.done && (_j = _d.return)) _j.call(_d);
                        }
                        finally { if (e_5) throw e_5.error; }
                        return [7 /*endfinally*/];
                    case 20:
                        options = { filePath: '', downloadId: downloadId, remove: true, root: outputRootPath_1 };
                        if (!(tarPaths.length === 1)) return [3 /*break*/, 22];
                        _g = __read(tarPaths, 1), outputPath = _g[0];
                        options.filePath = outputPath;
                        return [4 /*yield*/, this.prepareDownload(request, response, options)];
                    case 21:
                        _k.sent();
                        return [3 /*break*/, 25];
                    case 22:
                        outputPath = path.join(outputRootPath_1, "theia-archive-" + Date.now() + ".tar");
                        options.filePath = outputPath;
                        return [4 /*yield*/, this.archive(outputRootPath_1, outputPath, tarPaths.map(function (p) { return path.relative(outputRootPath_1, p); }))];
                    case 23:
                        _k.sent();
                        return [4 /*yield*/, this.prepareDownload(request, response, options)];
                    case 24:
                        _k.sent();
                        _k.label = 25;
                    case 25: return [3 /*break*/, 27];
                    case 26:
                        e_6 = _k.sent();
                        this.handleError(response, e_6, http_status_codes_1.INTERNAL_SERVER_ERROR);
                        return [3 /*break*/, 27];
                    case 27: return [2 /*return*/];
                }
            });
        });
    };
    MultiFileDownloadHandler = __decorate([
        inversify_1.injectable()
    ], MultiFileDownloadHandler);
    return MultiFileDownloadHandler;
}(FileDownloadHandler));
exports.MultiFileDownloadHandler = MultiFileDownloadHandler;
//# sourceMappingURL=file-download-handler.js.map