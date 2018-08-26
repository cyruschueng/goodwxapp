webpackJsonp(["new.module"],{

/***/ "../../../../../src/app/new/new.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".weui-bar__item--on{\r\n    border-bottom:2px solid #f60;\r\n    background-color: #fff;\r\n}\r\n.weui-navbar__item:after{\r\n    border-right: none;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/new/new.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"weui-cells topnav\">\n  <div class=\"weui-cell\">\n    <div class=\"weui-cell__hd\">\n      <a [routerLink]=\"['/task']\"><span class=\"fa fa-chevron-left topnav-title\"></span></a>\n    </div>\n    <div class=\"weui-cell__bd\">\n      <p class=\"topnav-title\" style=\"text-align:center\">动态</p>\n    </div>\n    <div class=\"weui-cell_ft\">\n      \n    </div>\n  </div>\n</div>\n<div class=\"weui-tab\">\n  <div class=\"weui-navbar\" style=\"background-color:#fff;\">\n    <a class=\"weui-navbar__item weui-bar__item--on\" href=\"#tab1\">\n          最新\n        </a>\n    <a class=\"weui-navbar__item\" href=\"#tab2\">\n          排行榜\n        </a>\n  </div>\n  <div class=\"weui-tab__bd\">\n    <div id=\"tab1\" class=\"weui-tab__bd-item weui-tab__bd-item--active\">\n      <app-news-list ></app-news-list>\n      <app-news-add ></app-news-add>\n    </div>\n    <div id=\"tab2\" class=\"weui-tab__bd-item\">\n      <app-usual-rank></app-usual-rank>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/new/new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_new_service__ = __webpack_require__("../../../../../src/app/new/service/new.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NewComponent = (function () {
    function NewComponent(newService) {
        this.newService = newService;
    }
    NewComponent.prototype.ngOnInit = function () {
        var url = window.location.href;
        this.newService.getWxConfig(url).subscribe(function (res) {
            wx.config({
                debug: true,
                appId: res.config.AppId,
                timestamp: res.config.Timestamp,
                nonceStr: res.config.NonceStr,
                signature: res.config.Signature,
                jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        });
    };
    return NewComponent;
}());
NewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-new',
        template: __webpack_require__("../../../../../src/app/new/new.component.html"),
        styles: [__webpack_require__("../../../../../src/app/new/new.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_new_service__["a" /* NewService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_new_service__["a" /* NewService */]) === "function" && _a || Object])
], NewComponent);

var _a;
//# sourceMappingURL=new.component.js.map

/***/ }),

/***/ "../../../../../src/app/new/new.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewModule", function() { return NewModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_nav_nav_module__ = __webpack_require__("../../../../../src/app/common/nav/nav.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__new_component__ = __webpack_require__("../../../../../src/app/new/new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__new_router__ = __webpack_require__("../../../../../src/app/new/new.router.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_usual_usual_module__ = __webpack_require__("../../../../../src/app/common/usual/usual.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_new_service__ = __webpack_require__("../../../../../src/app/new/service/new.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var NewModule = (function () {
    function NewModule() {
    }
    return NewModule;
}());
NewModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_6__common_usual_usual_module__["a" /* UsualModule */],
            __WEBPACK_IMPORTED_MODULE_0__common_nav_nav_module__["a" /* NavModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_5__new_router__["a" /* NewRoute */])
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_7__service_new_service__["a" /* NewService */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_4__new_component__["a" /* NewComponent */]]
    })
], NewModule);

//# sourceMappingURL=new.module.js.map

/***/ }),

/***/ "../../../../../src/app/new/new.router.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewRoute; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__new_component__ = __webpack_require__("../../../../../src/app/new/new.component.ts");

var NewRoute = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        component: __WEBPACK_IMPORTED_MODULE_0__new_component__["a" /* NewComponent */]
    }
];
//# sourceMappingURL=new.router.js.map

/***/ }),

/***/ "../../../../../src/app/new/service/new.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NewService = (function () {
    function NewService(http) {
        this.http = http;
    }
    NewService.prototype.getWxConfig = function (url) {
        var data = {
            url: url
        };
        var serverUrl = '/app/microlecture/wx/jsconfig';
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http.post(serverUrl, data, options).map(function (res) {
            return res.json();
        }).catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return NewService;
}());
NewService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], NewService);

var _a;
//# sourceMappingURL=new.service.js.map

/***/ })

});
//# sourceMappingURL=new.module.chunk.js.map