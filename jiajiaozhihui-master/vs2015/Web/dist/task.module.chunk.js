webpackJsonp(["task.module"],{

/***/ "../../../../../src/app/task/detail/task-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".rotation{\r\n    -webkit-transform: rotate(360deg);\r\n            transform: rotate(360deg);\r\n    -webkit-animation: rotation 3s linear infinite ;\r\n            animation: rotation 3s linear infinite ;\r\n}\r\n@-webkit-keyframes rotation{\r\n    from { -webkit-transform: rotate(0deg); transform: rotate(0deg);}\r\n    to {-webkit-transform: rotate(360deg);transform: rotate(360deg);}\r\n}\r\n@keyframes rotation{\r\n    from { -webkit-transform: rotate(0deg); transform: rotate(0deg);}\r\n    to {-webkit-transform: rotate(360deg);transform: rotate(360deg);}\r\n}\r\n\r\n/*头部title*/\r\n.weui-cell__bd:first-child{\r\n\t\r\n}\r\n/*头部背景*/\r\n.weui-panel__bd{\r\n\tbackground: url(" + __webpack_require__("../../../../../src/assets/my-bg.png") + ") no-repeat center;\r\n\tbackground-size:cover;\r\n\theight: 200px;\r\n\tcolor: #000;\r\n}\r\n.weui-flex{\r\n\tpadding: 30px 20px;\r\n}\r\n.weui-flex__item div{\r\n\tline-height: 2.4;\r\n}\r\n.weui-flex__item p{\r\n\tfont-size: 13px;\r\n\tline-height: 2;\r\n}\r\n.weui-flex__item p.authorP{\r\n    display: inline-block;\r\n    padding: 2px 25px;\r\n    background: rgba(251,251,251,0.2);\r\n    border-radius: 15px;\r\n    margin-bottom: 10px;\r\n}\r\n.subject-info{\r\n    height:140px; width:100%;position: relative;\r\n}\r\n.subject-info-img{\r\n    width:120px;\r\n    height: 120px;\r\n    position: relative;\r\n    border: 3px solid #fff;\r\n    /*display: none;*/\r\n}\r\n.subject-info-img img{\r\n    width: 100%;\r\n}\r\n.subject-info-number{\r\n    width:100%;\r\n    position: absolute;\r\n    bottom: 5px;\r\n    left:15px;\r\n    color:#fff;\r\n}\r\n.weui-media-box::before{left:0;border: none;}\r\n.weui-panel::before{border:none;}\r\n\r\n.weui-media-box__info{\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: flex;\r\n}\r\n.weui-media-box__info__meta{\r\n\tpadding: 0 1rem;\r\n\t-webkit-box-flex: 1;\r\n\t    -ms-flex: 1;\r\n\t        flex: 1;\r\n\ttext-align: center;\r\n}\r\n.weui-media-box__info__meta span{\r\n\tcolor: #fff;\r\n}\r\n.weui-media-box__info__meta span:before{\r\n\tmargin-right: 3px;\r\n}\r\n/*.weui-cell__ft{\r\n\twidth: 2rem;\r\n\theight: 1rem;\r\n\tbackground: url(../../../assets/images/play-jjzh.png));\r\n}\r\n.weui-cell__ft p span:before{\r\n\tcontent: none;\r\n}\r\n.weui-cell__ft p span:after{\r\n\tcontent: none;\r\n}*/\r\n.weui-cells-body{\r\n\tpadding-bottom: 72px;\r\n}\r\n\r\n.weui-cell_content div{\r\n\tcolor: #999;\r\n\tfont-size: 14px;\r\n}\r\n.weui-cell_content p{\r\n\tline-height: 2;\r\n}\r\n.weui-cell_content div img{\r\n\twidth: 0.7rem;\r\n\tmargin-right: 3px;\r\n}\r\n.weui-cell_content div span{\r\n\tmargin-right: 10px;\r\n\tvertical-align: text-top;\r\n}\r\n.weui-cells-body .weui-cell__ft img{\r\n\twidth: 2rem;\r\n}\r\n.weui-media-box__title{\r\n\tfont-size: 16px;\r\n}\r\n.weui-cells-body{\r\n\tmin-height: 10rem;\r\n}\r\n.settingDiv{\r\n\tdisplay: inline-block;\r\n}\r\n.weui-media-box__info__meta_extra{\r\n\tborder: none;\r\n}\r\n\r\nlabel.weui-cells_checkbox::before{\r\n\tposition: relative;\r\n}\r\nlabel.weui-cells_checkbox::after{\r\n\tposition: relative;\r\n}\r\n.music-plan{\r\n\ttext-align: center;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/task/detail/task-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"weui-cells topnav\">\n  <div class=\"weui-cell\">\n    <div class=\"weui-cell__hd\">\n      <a [routerLink]=\"['/task']\"><span class=\"fa fa-chevron-left topnav-title\"></span> </a>\n    </div>\n    <div class=\"weui-cell__bd\">\n      <p class=\"topnav-title\" style=\"text-align:center\">{{info?.resource?.title}}</p>\n    </div>\n  </div>\n</div>\n\n\n<div class=\"weui-panel\" style=\"margin-top:0;\">\n  <div class=\"weui-panel__bd\">\n    <div class=\"subject-info\">\n      <div class=\"weui-flex\">\n        <div style=\"padding-right:15px;\">\n          <div class=\"subject-info-img\">\n            <img src=\"http://192.168.100.76{{info?.resource?.imgSrc}}\">\n          </div>\n        </div>\n        <div class=\"weui-flex__item\" style=\"color:#fff;\">\n          <div>{{info?.resource?.title}}</div>\n          <p class=\"authorP\">{{info?.resource?.expert?.name || info?.resource?.expert?.nickName }}</p>\n        </div>\n      </div>\n    </div>\n    <div class=\"weui-media-box weui-media-box_text\">\n      <ul class=\"weui-media-box__info\">\n        <li class=\"weui-media-box__info__meta weui-media-box__info__meta_extra\">\n          <a [routerLink]=\"['../intro',info?.resource?.id || 0]\"><span class=\"fa fa-file-text\"> 介绍</span></a>\n        </li>\n        <li class=\"weui-media-box__info__meta weui-media-box__info__meta_extra\">\n          <span class=\"fa fa-heart-o\">{{info?.collectNumber}}</span>\n        </li>\n        <li class=\"weui-media-box__info__meta weui-media-box__info__meta_extra\">\n          <span class=\"fa fa-commenting-o\">{{info?.commentNumber}}</span>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n<div class=\"weui-cells\" style=\"margin-top:0;\">\n  <div class=\"weui-cell__bd\">\n    <div class=\"weui-flex\" style=\"padding:10px 15px;\">\n      <!-- <div class=\"weui-flex__item\">\n        <div class=\"music-plan\" style=\"position:relative;\">\n          <span class=\"fa fa-refresh\" style=\"font-size:25px;color:#f90\"></span>\n        </div>\n      </div> -->\n      <div class=\"weui-flex__item \">\n        <div class=\"music-plan\" (click)=\"audioService.Prev()\" ><span class=\"fa fa-step-backward\" style=\"font-size:25px;color:#f90\"></span></div>\n      </div>\n      <div class=\"weui-flex__item\">\n        <div class=\"music-plan\" (click)=\"playAudio()\" >\n          <span class=\"fa \" [ngClass]=\"{'fa-pause':audioService.PlayData().IsPlaying==true,'fa-play':audioService.PlayData().IsPlaying==false}\"  style=\"font-size:30px; color:#f90\"></span>\n        </div>\n      </div>\n      <div class=\"weui-flex__item\">\n        <div class=\"music-plan\" (click)=\"audioService.Next()\"><span class=\"fa fa-step-forward\" style=\"font-size:25px;color:#f90\"></span></div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"weui-progress\">\n    <div class=\"weui-progress__bar\">\n        <div class=\"weui-progress__inner-bar js_progress\" [ngStyle]=\"{'width': audioService.PlayData().Current / audioService.PlayData().During * 100 + '%'}\"></div>\n    </div>\n</div>\n<div class=\"weui-cells\" style=\"margin-top:0;\">\n  <div class=\"weui-cell\" (click)=\"playAudio(i)\"  *ngFor=\"let courses of info?.resourceList; let i=index \">\n    <div class=\"weui-cell__hd\">\n      <img [ngClass]=\"{'rotation':audioService.PlayData().Index==i && audioService.PlayData().IsPlaying==true  }\" style=\"border-radius:20px;width:40px;\" src=\"../../../assets/t2.jpg\"  alt=\"\">\n    </div>\n    <div class=\"weui-cell__bd\">\n      <h4 class=\"weui-media-box__title\">{{courses?.fileTitle}}</h4>\n      <p class=\"weui-media-box__desc\" *ngIf=\"audioService.PlayData().Index==i\" ></p>\n    </div>\n    <div class=\"weui-cell__ft\">\n    </div>\n  </div>\n</div>\n<usual-comment-list [courseid]=\"info?.courses?.id || courseId \" ></usual-comment-list>\n<usual-comment-add [courseId]=\"info?.courses?.id || 0\" ></usual-comment-add>"

/***/ }),

/***/ "../../../../../src/app/task/detail/task-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_task_service__ = __webpack_require__("../../../../../src/app/task/service/task.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_audio_service__ = __webpack_require__("../../../../../src/app/service/audio.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TaskDetailComponent = (function () {
    function TaskDetailComponent(audioService, activatedRoute, taskService) {
        this.audioService = audioService;
        this.activatedRoute = activatedRoute;
        this.taskService = taskService;
        this.courseId = 0;
    }
    TaskDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (res) {
            _this.courseId = res.id;
            _this.taskService.getCourseDetail(res.id).subscribe(function (res1) {
                console.log(res1);
                _this.info = res1.task;
                var list = _this.ConvertToAudioModel(res1.task.resourceList);
                _this.audioService.AddRange(list);
            });
        });
        this.audioService.playEndEvent.subscribe(function (res) {
            _this.taskService.learnRecord(res.Id).subscribe(function (result) {
            });
        });
    };
    TaskDetailComponent.prototype.ConvertToAudioModel = function (data) {
        var list = [];
        data.forEach(function (element) {
            var x = {
                Id: element.id,
                Title: element.fileTitle,
                Cover: element.fileImg,
                Url: element.fileLink,
                Size: 0,
                DuringSecond: ''
            };
            list.push(x);
        });
        return list;
    };
    TaskDetailComponent.prototype.playAudio = function (sn) {
        var right = this.taskService.Right();
        if (right.permission === false) {
            var html = "<a ng-reflect-router-link=\"/helper\" href=\"/helper/index\" style=\"color:#fff;\" >\u64CD\u4F5C\u5931\u8D25:\u4F60\u8FD8\u6CA1\u6709\u52A0\u5165\u73ED\u7EA7 <small style=\"color:#337ab7\">\u70B9\u51FB\u6211,\u67E5\u770B\u5E2E\u52A9</small></a>";
            $.toptip(html, 'error');
        }
        else {
            if (right.check === true) {
                if (right.type < this.catalogue) {
                    var html = "<a ng-reflect-router-link=\"/helper\" href=\"/helper/index\" style=\"color:#fff;\" >\u8B66\u544A:\u4F60\u6CA1\u6709\u6743\u9650\u5B66\u4E60\u5F53\u524D\u6559\u7A0B <small style=\"color:#337ab7\">\u70B9\u51FB\u6211,\u67E5\u770B\u5E2E\u52A9</small></a>";
                    console.log(html);
                    $.toptip(html, 'warning');
                }
                else {
                    if (sn != null) {
                        var list = this.audioService.PlayList();
                        this.audioService.Toggle(list[sn]);
                    }
                    else {
                        this.audioService.Toggle();
                    }
                }
            }
            else {
                var html = "<a ng-reflect-router-link=\"/helper\" href=\"/helper/index\" style=\"color:#fff;\" >\u64CD\u4F5C\u5931\u8D25:\u4F60\u7684\u6743\u9650\u6B63\u5728\u5BA1\u6838 <small style=\"color:#337ab7\">\u70B9\u51FB\u6211,\u67E5\u770B\u5E2E\u52A9</small></a>";
                $.toptip(html, 'warning');
            }
        }
    };
    return TaskDetailComponent;
}());
TaskDetailComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["o" /* Component */])({
        selector: 'app-task-detail',
        template: __webpack_require__("../../../../../src/app/task/detail/task-detail.component.html"),
        styles: [__webpack_require__("../../../../../src/app/task/detail/task-detail.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__service_audio_service__["a" /* AudioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_audio_service__["a" /* AudioService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__service_task_service__["a" /* TaskService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__service_task_service__["a" /* TaskService */]) === "function" && _c || Object])
], TaskDetailComponent);

var _a, _b, _c;
//# sourceMappingURL=task-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/task/intro/task-intro.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/task/intro/task-intro.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"weui-cells topnav\">\n  <a [routerLink]=\"['/task/detail',0]\" class=\"weui-cell\">\n    <div class=\"weui-cell__hd\">\n      <span class=\"fa fa-chevron-left topnav-title\"></span>\n    </div>\n    <div class=\"weui-cell__bd\">\n      <p class=\"topnav-title\" style=\"text-align:center\">初中数学</p>\n    </div>\n  </a>\n</div>\n<article class=\"weui-article\">\n    <section>\n        亲爱的社员：\n        您的任务激活时间是-年-月-日，活动完成时间是-年-月-日。一旦激活任务，便意味着在为期一年的时间里，同意接受以下各项条件的约束：\n        每月需按照系统要求完成国学经典的学习及践行任务的考核，其中包括\n    </section>\n</article>\n"

/***/ }),

/***/ "../../../../../src/app/task/intro/task-intro.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskIntroComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TaskIntroComponent = (function () {
    function TaskIntroComponent() {
    }
    TaskIntroComponent.prototype.ngOnInit = function () { };
    return TaskIntroComponent;
}());
TaskIntroComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-task-intro',
        template: __webpack_require__("../../../../../src/app/task/intro/task-intro.component.html"),
        styles: [__webpack_require__("../../../../../src/app/task/intro/task-intro.component.css")],
    }),
    __metadata("design:paramtypes", [])
], TaskIntroComponent);

//# sourceMappingURL=task-intro.component.js.map

/***/ }),

/***/ "../../../../../src/app/task/service/task.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appconfig_config__ = __webpack_require__("../../../../../src/app/appconfig/config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TaskService = (function () {
    function TaskService(http) {
        this.http = http;
    }
    TaskService.prototype.getCourse = function () {
        var data = JSON.parse(localStorage.getItem('appData'));
        var serverUrl = '/app/microlecture/courses';
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http.post(serverUrl, { resourceType: __WEBPACK_IMPORTED_MODULE_4__appconfig_config__["a" /* AppConfig */].resourceType }, options).map(function (res) {
            return res.json();
        }).catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    TaskService.prototype.getCourseDetail = function (id) {
        var data = JSON.parse(localStorage.getItem('appData'));
        var serverUrl = '/app/microlecture/courses/' + id;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http.post(serverUrl, { resourceType: __WEBPACK_IMPORTED_MODULE_4__appconfig_config__["a" /* AppConfig */].resourceType, openid: data.info.openId }, options).map(function (res) {
            return res.json();
        }).catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    TaskService.prototype.Right = function () {
        var data = this.GetUserInfo();
        return {
            permission: __WEBPACK_IMPORTED_MODULE_3_lodash__["isEmpty"](data.other.classNo) === true ? false : true,
            classNo: data.other.classNo,
            type: data.other.classType,
            check: data.other.isact === 0 ? false : true
        };
    };
    TaskService.prototype.GetUserInfo = function () {
        var data = JSON.parse(localStorage.getItem('appData'));
        return data.info;
    };
    TaskService.prototype.addComments = function (courseId1, msg) {
        var member = this.GetUserInfo();
        var data = {
            msg: msg,
            sender: member.wxUserInfo.openId,
            headimg: member.wxUserInfo.headImgUrl,
            nickname: member.wxUserInfo.nickName
        };
        var serverUrl = '/app/microlecture/courses/' + courseId1 + '/comments/add';
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http.post(serverUrl, data, options).map(function (res) {
            return res.json();
        }).catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    TaskService.prototype.learnRecord = function (courseid) {
        var member = this.GetUserInfo();
        var data = {
            learner: member.wxUserInfo.openId,
        };
        var serverUrl = '/app/microlecture/learn/record/' + courseid + '/add';
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http.post(serverUrl, data, options).map(function (res) {
            return res.json();
        }).catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return TaskService;
}());
TaskService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], TaskService);

var _a;
//# sourceMappingURL=task.service.js.map

/***/ }),

/***/ "../../../../../src/app/task/task.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".rotation{\r\n    -webkit-transform: rotate(360deg);\r\n            transform: rotate(360deg);\r\n    -webkit-animation: rotation 3s linear infinite ;\r\n            animation: rotation 3s linear infinite ;\r\n}\r\n@-webkit-keyframes rotation{\r\n    from { -webkit-transform: rotate(0deg); transform: rotate(0deg);}\r\n    to {-webkit-transform: rotate(360deg);transform: rotate(360deg);}\r\n}\r\n@keyframes rotation{\r\n    from { -webkit-transform: rotate(0deg); transform: rotate(0deg);}\r\n    to {-webkit-transform: rotate(360deg);transform: rotate(360deg);}\r\n}\r\na{ color:#111}\r\n\r\n.primary{\r\n    color:#337ab7\r\n}\r\n.advanced{\r\n    color:#f0ad4e\r\n}\r\n.outstanding{\r\n    color:#d9534f\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/task/task.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"weui-cells topnav\">\n  <div  class=\"weui-cell\">\n    <div class=\"weui-cell__hd\">\n      <a [routerLink]=\"['/new']\"><span class=\"fa fa-chevron-left topnav-title\"></span></a> \n    </div>\n    <div class=\"weui-cell__bd\">\n      <p class=\"topnav-title\" style=\"text-align:center\">最新课程</p>\n    </div>\n    <div class=\"weui-cell__ft\" >\n      <a href=\"http://161s5g6007.51mypc.cn/app/appstart/basic/baseinfo.ashx?redirect_url=http://161s5g6007.51mypc.cn/app/pay/wxpay001.aspx?r=a=app001|h=start|id=106\"  *ngIf=\"member?.other?.classNo=='' || member?.other?.classNo ==0 \"  ><span style=\"background:#f60;color:#fff;\" class=\"weui-btn weui-btn_mini weui-btn_default\">加入班级</span></a>\n    </div>\n  </div>\n</div>\n\n<div class=\"weui-cells\" style=\"margin-top:0;\">\n  <div class=\"weui-cell weui-cell_access\">\n    <div class=\"weui-cell__hd\">\n      <img style=\"width:40px; height:40px; border-radius:20px;\" src=\"{{member?.wxUserInfo?.headImgUrl}}\">\n    </div>\n    <div class=\"weui-cell__bd\">\n      <p style=\"color:#666\">{{member?.wxUserInfo?.nickName}}</p>\n      <ul *ngIf=\"member?.other?.classNo !='' || member?.other?.classNo !=0 \" class=\"weui-media-box__info\" style=\"margin-top:5px;\">\n        <li class=\"weui-media-box__info__meta\">{{member?.other?.className}}</li>\n        <li class=\"weui-media-box__info__meta weui-media-box__info__meta_extra\">{{member?.other?.classTypeName}}</li>\n      </ul>\n      <ul *ngIf=\"member?.other?.classNo =='' || member?.other?.classNo ==0 \" class=\"weui-media-box__info\" style=\"margin-top:5px;\">\n        <li class=\"weui-media-box__info__meta\" style=\"color:#f60;\">你还没有加入班级</li>\n        <li class=\"weui-media-box__info__meta weui-media-box__info__meta_extra\"></li>\n      </ul>\n    </div>\n    <div class=\"weui-cell__ft\"></div>\n  </div>\n</div>\n<div class=\"weui-cells__title\">最新课程</div>\n<div class=\"weui-cells\">\n\n  <a class=\"weui-cell\" [routerLink]=\"['../detail',item?.id]\" *ngFor=\"let item of taskList?.latest\">\n    <div class=\"weui-cell__hd\" style=\"height:80px; width:80px;padding-right:15px;\">\n      <img style=\"width:100%;\" src=\"{{'http://192.168.100.76'+item?.resource?.smallImgSrc}}\"></div>\n    <div class=\"weui-cell__bd\">\n      <p>{{item?.resource?.title}}</p>\n      <ul class=\"weui-media-box__info\" style=\"margin-top:5px;\">\n        <li class=\"weui-media-box__info__meta\">{{item?.roleName}}</li>\n        <li class=\"weui-media-box__info__meta weui-media-box__info__meta_extra\">讲师 {{item?.resource?.expert?.name || item?.resource?.expert?.nickName }}</li>\n        <!-- <li class=\"weui-media-box__info__meta weui-media-box__info__meta_extra\">10084</li> -->\n        <li class=\"weui-media-box__info__meta weui-media-box__info__meta_extra\">分享</li>\n      </ul>\n    </div>\n    <div class=\"weui-cell__ft\"></div>\n  </a>\n</div>\n<div style=\"background:#eee;height:5px;\"></div>\n<div class=\"weui-cells__title\">历史课程</div>\n<div class=\"weui-cells\">\n  <a class=\"weui-cell\" [routerLink]=\"['../detail',1]\" *ngFor=\"let item of taskList?.history\">\n    <div class=\"weui-cell__hd\" style=\"height:80px; width:80px;padding-right:15px;\">\n      <img style=\"width:100%;\" src=\"{{'http://192.168.100.76'+item?.resource?.smallImgSrc}}\"></div>\n    <div class=\"weui-cell__bd\">\n      <p>{{item?.resource?.title}}</p>\n      <ul class=\"weui-media-box__info\" style=\"margin-top:5px;\">\n        <li class=\"weui-media-box__info__meta\">{{item?.roleName}}</li>\n        <li class=\"weui-media-box__info__meta\">{{item?.resource?.expert?.name || item?.resource?.expert?.nickName }}</li>\n        <li class=\"weui-media-box__info__meta weui-media-box__info__meta_extra\">10084</li>\n        <li class=\"weui-media-box__info__meta weui-media-box__info__meta_extra\">分享</li>\n      </ul>\n    </div>\n    <div class=\"weui-cell__ft\"></div>\n  </a>\n</div>\n<a href=\"javascript:void(0);\" class=\"weui-cell weui-cell_access weui-cell_link\">\n  <div class=\"weui-cell__bd\">查看更多</div>\n  <span class=\"weui-cell__ft\"></span>\n</a>\n<div style=\"padding-bottom:60px;\"></div>\n<div style=\"position:fixed; width:100%; bottom:0;\">\n  <app-nav [currIndex]=\"0\"></app-nav>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/task/task.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_task_service__ = __webpack_require__("../../../../../src/app/task/service/task.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_audio_service__ = __webpack_require__("../../../../../src/app/service/audio.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TaskComponent = (function () {
    function TaskComponent(taskService, audioService, router) {
        this.taskService = taskService;
        this.audioService = audioService;
        this.router = router;
    }
    TaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.member = this.taskService.GetUserInfo();
        console.log(this.member);
        this.taskService.getCourse().subscribe(function (res) {
            if (res.success === true) {
                _this.taskList = res.task;
                console.log('数据测试');
                console.log(res);
                // this.audioService.AddRange(this.ConverToOriginalAudioList(res.task));
                // this.audioService.PreLoad();
            }
        });
    };
    TaskComponent.prototype.ConverToOriginalAudioList = function (x) {
        var list = [];
        x.forEach(function (element) {
            var audio = {
                Cover: element.cover,
                Id: element.id,
                Title: element.title,
                Source: element.source
            };
            list.push(audio);
        });
        return list;
    };
    return TaskComponent;
}());
TaskComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-task',
        template: __webpack_require__("../../../../../src/app/task/task.component.html"),
        styles: [__webpack_require__("../../../../../src/app/task/task.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_task_service__["a" /* TaskService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_task_service__["a" /* TaskService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_audio_service__["a" /* AudioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_audio_service__["a" /* AudioService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _c || Object])
], TaskComponent);

var _a, _b, _c;
//# sourceMappingURL=task.component.js.map

/***/ }),

/***/ "../../../../../src/app/task/task.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskModule", function() { return TaskModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_task_service__ = __webpack_require__("../../../../../src/app/task/service/task.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_usual_usual_module__ = __webpack_require__("../../../../../src/app/common/usual/usual.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__task_component__ = __webpack_require__("../../../../../src/app/task/task.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__task_router__ = __webpack_require__("../../../../../src/app/task/task.router.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_audio_panel_audio_panel_module__ = __webpack_require__("../../../../../src/app/common/audio-panel/audio-panel.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__detail_task_detail_component__ = __webpack_require__("../../../../../src/app/task/detail/task-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__common_nav_nav_module__ = __webpack_require__("../../../../../src/app/common/nav/nav.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__intro_task_intro_component__ = __webpack_require__("../../../../../src/app/task/intro/task-intro.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var TaskModule = (function () {
    function TaskModule() {
    }
    return TaskModule;
}());
TaskModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_7__common_audio_panel_audio_panel_module__["a" /* AudioPanelModule */],
            __WEBPACK_IMPORTED_MODULE_9__common_nav_nav_module__["a" /* NavModule */],
            __WEBPACK_IMPORTED_MODULE_2__common_usual_usual_module__["a" /* UsualModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_6__task_router__["a" /* TaskRoute */])
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_1__service_task_service__["a" /* TaskService */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_5__task_component__["a" /* TaskComponent */], __WEBPACK_IMPORTED_MODULE_8__detail_task_detail_component__["a" /* TaskDetailComponent */], __WEBPACK_IMPORTED_MODULE_10__intro_task_intro_component__["a" /* TaskIntroComponent */]]
    })
], TaskModule);

//# sourceMappingURL=task.module.js.map

/***/ }),

/***/ "../../../../../src/app/task/task.router.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskRoute; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task_component__ = __webpack_require__("../../../../../src/app/task/task.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__detail_task_detail_component__ = __webpack_require__("../../../../../src/app/task/detail/task-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro_task_intro_component__ = __webpack_require__("../../../../../src/app/task/intro/task-intro.component.ts");



var TaskRoute = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        component: __WEBPACK_IMPORTED_MODULE_0__task_component__["a" /* TaskComponent */]
    },
    {
        path: 'detail/:id',
        component: __WEBPACK_IMPORTED_MODULE_1__detail_task_detail_component__["a" /* TaskDetailComponent */]
    },
    {
        path: 'detail/intro/:id',
        component: __WEBPACK_IMPORTED_MODULE_2__intro_task_intro_component__["a" /* TaskIntroComponent */]
    }
];
//# sourceMappingURL=task.router.js.map

/***/ }),

/***/ "../../../../../src/assets/my-bg.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "my-bg.924ceaabe802dec9d186.png";

/***/ })

});
//# sourceMappingURL=task.module.chunk.js.map