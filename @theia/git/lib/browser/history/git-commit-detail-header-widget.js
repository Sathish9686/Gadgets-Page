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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitCommitDetailHeaderWidget = void 0;
var inversify_1 = require("inversify");
var scm_avatar_service_1 = require("@theia/scm/lib/browser/scm-avatar-service");
var git_commit_detail_widget_options_1 = require("./git-commit-detail-widget-options");
var browser_1 = require("@theia/core/lib/browser");
var React = require("react");
var GitCommitDetailHeaderWidget = /** @class */ (function (_super) {
    __extends(GitCommitDetailHeaderWidget, _super);
    function GitCommitDetailHeaderWidget(commitDetailOptions) {
        var _this = _super.call(this) || this;
        _this.commitDetailOptions = commitDetailOptions;
        _this.id = 'commit-header' + commitDetailOptions.commitSha;
        _this.title.label = commitDetailOptions.commitSha.substr(0, 8);
        _this.options = {
            range: {
                fromRevision: commitDetailOptions.commitSha + '~1',
                toRevision: commitDetailOptions.commitSha
            }
        };
        _this.title.closable = true;
        _this.title.iconClass = 'icon-git-commit tab-git-icon';
        return _this;
    }
    GitCommitDetailHeaderWidget.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.avatarService.getAvatar(this.commitDetailOptions.authorEmail)];
                    case 1:
                        _a.authorAvatar = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GitCommitDetailHeaderWidget.prototype.render = function () {
        return React.createElement('div', this.createContainerAttributes(), this.renderDiffListHeader());
    };
    GitCommitDetailHeaderWidget.prototype.createContainerAttributes = function () {
        return {
            style: { flexGrow: 0 }
        };
    };
    GitCommitDetailHeaderWidget.prototype.renderDiffListHeader = function () {
        var authorEMail = this.commitDetailOptions.authorEmail;
        var subject = React.createElement("div", { className: 'subject' }, this.commitDetailOptions.commitMessage);
        var body = React.createElement("div", { className: 'body' }, this.commitDetailOptions.messageBody || '');
        var subjectRow = React.createElement("div", { className: 'header-row' },
            React.createElement("div", { className: 'subjectContainer' },
                subject,
                body));
        var author = React.createElement("div", { className: 'author header-value noWrapInfo' }, this.commitDetailOptions.authorName);
        var mail = React.createElement("div", { className: 'mail header-value noWrapInfo' }, "<" + authorEMail + ">");
        var authorRow = React.createElement("div", { className: 'header-row noWrapInfo' },
            React.createElement("div", { className: 'theia-header' }, "author: "),
            author);
        var mailRow = React.createElement("div", { className: 'header-row noWrapInfo' },
            React.createElement("div", { className: 'theia-header' }, "e-mail: "),
            mail);
        var authorDate = new Date(this.commitDetailOptions.authorDate);
        var dateStr = authorDate.toLocaleDateString('en', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour12: true,
            hour: 'numeric',
            minute: 'numeric'
        });
        var date = React.createElement("div", { className: 'date header-value noWrapInfo' }, dateStr);
        var dateRow = React.createElement("div", { className: 'header-row noWrapInfo' },
            React.createElement("div", { className: 'theia-header' }, "date: "),
            date);
        var revisionRow = React.createElement("div", { className: 'header-row noWrapInfo' },
            React.createElement("div", { className: 'theia-header' }, "revision: "),
            React.createElement("div", { className: 'header-value noWrapInfo' }, this.commitDetailOptions.commitSha));
        var gravatar = React.createElement("div", { className: 'image-container' },
            React.createElement("img", { className: 'gravatar', src: this.authorAvatar }));
        var commitInfo = React.createElement("div", { className: 'header-row commit-info-row' },
            gravatar,
            React.createElement("div", { className: 'commit-info' },
                authorRow,
                mailRow,
                dateRow,
                revisionRow));
        return React.createElement("div", { className: 'diff-header' },
            subjectRow,
            commitInfo);
    };
    __decorate([
        inversify_1.inject(browser_1.KeybindingRegistry),
        __metadata("design:type", browser_1.KeybindingRegistry)
    ], GitCommitDetailHeaderWidget.prototype, "keybindings", void 0);
    __decorate([
        inversify_1.inject(scm_avatar_service_1.ScmAvatarService),
        __metadata("design:type", scm_avatar_service_1.ScmAvatarService)
    ], GitCommitDetailHeaderWidget.prototype, "avatarService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], GitCommitDetailHeaderWidget.prototype, "init", null);
    GitCommitDetailHeaderWidget = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(git_commit_detail_widget_options_1.GitCommitDetailWidgetOptions)),
        __metadata("design:paramtypes", [Object])
    ], GitCommitDetailHeaderWidget);
    return GitCommitDetailHeaderWidget;
}(browser_1.ReactWidget));
exports.GitCommitDetailHeaderWidget = GitCommitDetailHeaderWidget;
//# sourceMappingURL=git-commit-detail-header-widget.js.map