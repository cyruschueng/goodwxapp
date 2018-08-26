webpackJsonp([7],{

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var Fc_bindBigImg = __webpack_require__(6);
//图片放大预览方法，需要单独引入Fc_bindBigImg.jsx
//引入方法
// PubSub.subscribe("bigImgData",function(evName,bigImgData){
//         	//添加大图预览
//           	this.setState({bigImgArr:bigImgData});
//         }.bind(this));
//bigImgArr为数组
// objImg:{

// }
var Public_bigImg = React.createClass({
	displayName: "Public_bigImg",

	render: function render() {
		var bigImgArr = this.props.bigImgArr;
		var list = [];
		var paginationList = [];
		console.log(publicData.objImg);
		for (var i = 0; i < bigImgArr.length; i++) {
			list.push(React.createElement("div", { className: "col-xs-12 col-sm-12 swiper-slide bigImg-li", key: i, "data-index": i, style: { backgroundImage: 'url(' + bigImgArr[i].url + ')' }, onTouchStart: Fc_bindBigImg.imgTouchStart.bind(this), onTouchMove: Fc_bindBigImg.imgTouchMove.bind(this), onTouchEnd: Fc_bindBigImg.imgTouchEnd.bind(this) }));
		}
		if (bigImgArr.length > 1) {
			for (var i = 0; i < bigImgArr.length; i++) {
				paginationList.push(React.createElement("span", { className: "swiper-pagination-bullet", key: i }));
			}
		}

		return React.createElement(
			"div",
			{ className: "row" },
			React.createElement(
				"aside",
				{ className: "row swiper-container swiper-container-bigImg bigImg" },
				React.createElement(
					"div",
					{ className: "row swiper-wrapper bigImg-main" },
					list
				),
				React.createElement(
					"div",
					{ className: "swiper-pagination swiper-pagination-bigImg swiper-pagination-report" },
					paginationList
				)
			),
			React.createElement(
				"div",
				{ className: "saveImg-ceng", onTouchStart: Fc_bindBigImg.saveImgCengTouchStart },
				React.createElement(
					"aside",
					{ className: "row saveImg" },
					React.createElement(
						"div",
						{ className: "col-xs-12 col-sm-12 saveImg-btn saveImg-item", onTouchStart: Fc_bindBigImg.saveImgBtnTouchStart },
						"\u4FDD\u5B58\u56FE\u7247"
					),
					React.createElement(
						"div",
						{ className: "col-xs-12 col-sm-12 cancelImg-btn saveImg-item", onTouchStart: Fc_bindBigImg.cancelImgBtnTouchStart },
						"\u53D6\u6D88"
					)
				)
			)
		);
	}
});
module.exports = Public_bigImg;

/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 加载相关组件
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_Error = __webpack_require__(3);
var PubSub = __webpack_require__(2);
var Public_BIGImg = __webpack_require__(10);
var Fc_bindBigImg = __webpack_require__(6);

// 默认图片
var frontdefaultImg = ["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-w.png", "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-m.png"];
var sidedefaultImg = ["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-w.png", "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-m.png"];

var campId = getParamByUrl("campId");
var roleId = getParamByUrl("roleId");
// 相关埋点参数
var SWoDeXiangCe = {
    SCategory_SWoDeXiangCe: 5060900,
    SWoDeXiangCe_ShanChuZhaoPian: 5060901, //删除照片
    SWoDeXiangCe_BianJiZhaoPian: 5060902, //编辑照片
    SWoDeXiangCe_TiaoZhuanShangChuanZhaoPian: 5060903, //跳转上传照片
    SWoDeXiangCe_TuPianYuLan: 5060904 //图片预览
};
// 定义预览图的URL数组
var publicData = {
    objImg: {}
};
window.publicData = publicData;
// 相册组件
var MyPHoneAlbum = React.createClass({
    displayName: "MyPHoneAlbum",

    componentDidMount: function componentDidMount() {
        // 设置相关css样式
        $(".partRight-img-li2").css("height", $(".partRight-img-li2").width() * 366 / 275);
        //part左边距离
        for (var i = 0; i < $(".partLeft-p1-span").length; i++) {
            if ($(".partLeft-p1 .partLeft-p1-span").eq(i).width() > $(".partLeft-p2 .partLeft-p2-span").eq(i).width()) {
                console.log(i);
                if ($(".partLeft-p3 .partLeft-p3-span").width() > $(".partLeft-p1 .partLeft-p1-span").width()) {
                    $(".partLeft-p1").css("padding-left", ($(".partLeft-p3 .partLeft-p3-span").width() - $(".partLeft-p1 .partLeft-p1-span").width()) / 2);
                } else {
                    $(".partLeft-p3").css("padding-left", ($(".partLeft-p1 .partLeft-p1-span").width() - $(".partLeft-p3 .partLeft-p3-span").width()) / 2);
                }
                $(".partLeft-p2").eq(i).css("padding-left", parseInt($(".partLeft-p1").eq(0).css("padding-left")) + ($(".partLeft-p1 .partLeft-p1-span").eq(i).width() - $(".partLeft-p2 .partLeft-p2-span").eq(i).width()) / 2 - 1);
            } else {
                console.log("a:" + i);
                $(".partLeft-p1 .partLeft-p1-span").eq(i).css("padding-left", ($(".partLeft-p2 .partLeft-p2-span").eq(i).width() - $(".partLeft-p1 .partLeft-p1-span").eq(i).width()) / 2);
                $(".partLeft-p3 .partLeft-p3-span").eq(i).css("padding-left", ($(".partLeft-p2 .partLeft-p2-span").eq(i).width() - $(".partLeft-p3 .partLeft-p3-span").eq(i).width()) / 2);
            }
        }
    },
    // 点击删除
    delImgClick: function delImgClick(event) {
        event.stopPropagation();
        var ele = event.currentTarget;
        //删除图片
        $(".fixbg").css("display", "block");
        $(".fixbg-main").css("margin-top", -$(".fixbg-main").height() / 2);
        $(".deltime").html($(ele).attr("data-datetime"));
        var campPictureId = $(ele).attr("data-camppictureid");

        var createTime = $(ele).attr("data-createtime");
        var waistMeasureId = $(ele).attr("data-waistmeasureid");

        var waistMeasure = $(ele).attr("data-waistmeasure");
        if (waistMeasure == "--") {
            waistMeasure = 0;
        }
        var delImgParmData = {
            campPictureId: campPictureId,
            createTime: createTime,
            waistMeasureId: waistMeasureId,
            waistMeasure: waistMeasure
        };
        PubSub.publish('delImgParm', delImgParmData);
        setMaiDian(SWoDeXiangCe.SCategory_SWoDeXiangCe, SWoDeXiangCe.SWoDeXiangCe_ShanChuZhaoPian);
    },
    //编辑图片
    editPhoneClick: function editPhoneClick(event) {
        event.stopPropagation();
        var ele = event.currentTarget;
        var campPictureId = $(ele).attr("data-camppictureid");
        if (getParamByUrl("imgId") != "false") {
            var searchLink = removeParamByUrl("imgId");
            window.location.href = "editPhoto.html" + searchLink + "&imgId=" + campPictureId;
        } else {
            window.location.href = "editPhoto.html" + window.location.search + "&imgId=" + campPictureId;
        }
        setMaiDian(SWoDeXiangCe.SCategory_SWoDeXiangCe, SWoDeXiangCe.SWoDeXiangCe_BianJiZhaoPian);
    },
    render: function render() {
        var _React$createElement;

        var PhoneData = this.props.PhoneData;
        var index = this.props.index;
        return React.createElement(
            "aside",
            { className: "row page1 msgType1", "data-pictureid": PhoneData[index].id, key: index },
            React.createElement(
                "article",
                { className: "row list" },
                React.createElement(
                    "aside",
                    { className: "row part " },
                    React.createElement(
                        "div",
                        { className: "col-xs-2 col-sm-2 partLeft2" },
                        React.createElement(
                            "div",
                            { className: "row" },
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 partLeft-p1" },
                                React.createElement(
                                    "span",
                                    { className: "partLeft-p1-span" },
                                    "DAY"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 partLeft-p2" },
                                React.createElement(
                                    "span",
                                    { className: "partLeft-p2-span" },
                                    PhoneData[index].day
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 partLeft-p3" },
                                React.createElement(
                                    "span",
                                    { className: "partLeft-p3-span" },
                                    PhoneData[index].time
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 partRight", part: "2" },
                        React.createElement(
                            "div",
                            { className: "content" },
                            React.createElement(
                                "span",
                                { className: "", style: { 'width': '35%' } },
                                "\u4F53\u91CD:",
                                React.createElement(
                                    "span",
                                    { className: "weight" },
                                    PhoneData[index].weight + 'KG'
                                )
                            ),
                            React.createElement(
                                "span",
                                { className: "", style: { 'width': '30%' } },
                                "\u8102\u80AA:",
                                React.createElement(
                                    "span",
                                    { className: "fat" },
                                    PhoneData[index].fat + '%'
                                )
                            ),
                            React.createElement(
                                "span",
                                { className: "", style: { 'width': '35%' } },
                                "\u8170\u56F4:",
                                React.createElement(
                                    "span",
                                    { className: "waistline" },
                                    PhoneData[index].waistMeasure + 'CM'
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "row " },
                            React.createElement(
                                "div",
                                { className: "col-xs-6 col-sm-6 partRight-img" },
                                React.createElement("div", { className: "col-xs-12 col-sm-12 partRight-img-li partRight-img-li2 ", objimg: "img2", objimgindex: "0", style: { 'backgroundImage': 'url(' + PhoneData[index].frontPicture + '@500h_500w_1e)' },
                                    "data-obj_img": 'frontPicture' + index, onClick: Fc_bindBigImg.bindBigImg })
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-6 col-sm-6 partRight-img" },
                                React.createElement("div", { className: "col-xs-12 col-sm-12 partRight-img-li partRight-img-li2 ", objimg: "img2", objimgindex: "0", style: { 'backgroundImage': 'url(' + PhoneData[index].facePicture + '@500h_500w_1e)' },
                                    "data-obj_img": 'facePicture' + index, onClick: Fc_bindBigImg.bindBigImg })
                            )
                        )
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "manage" },
                React.createElement(
                    "a",
                    (_React$createElement = { className: "edit", "data-camppictureid": PhoneData[index].id, "data-day": PhoneData[index].day,
                        "data-waistmeasure": PhoneData[index].waistMeasure, "data-fat": PhoneData[index].fat,
                        "data-weight": PhoneData[index].weight, "data-facepicture": PhoneData[index].facePicture,
                        "data-frontpicture": PhoneData[index].frontPicture, "data-datetime": PhoneData[index].time }, _defineProperty(_React$createElement, "data-camppictureid", PhoneData[index].id), _defineProperty(_React$createElement, "onClick", this.editPhoneClick), _React$createElement),
                    React.createElement("span", null)
                ),
                React.createElement(
                    "span",
                    { className: "del", "data-datetime": PhoneData[index].time, "data-camppictureid": PhoneData[index].id,
                        "data-waistmeasureid": PhoneData[index].waistMeasureId, "data-createtime": PhoneData[index].createTime,
                        "data-waistmeasure": PhoneData[index].waistMeasure, onClick: this.delImgClick },
                    React.createElement("span", null)
                )
            )
        );
    }
});
// 页面总容器
var PHoneAlbumBox = React.createClass({
    displayName: "PHoneAlbumBox",

    // 初始化相关参数
    getInitialState: function getInitialState() {
        var mytitleData = {
            title: '我的相册',
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        mytitleData = JSON.stringify(mytitleData);
        appFc.controlTitle(mytitleData);
        //左上角返回控制
        var loadtourl = getCookie("loadtourl");
        // 如果图片删除完，返回二级
        if (loadtourl && loadtourl == 0) {
            if (getParamByUrl("testtype") != "tanchao") {
                var data = {
                    iconType: 0,
                    iconColor: "",
                    backNum: 2,
                    closeWebview: 0,
                    hidden: false,
                    isHandle: false,
                    functionName: ""
                };
                data = JSON.stringify(data);
                appFc.controlLeft(data);
            }
        } else {
            // 没有删除完图片返回一级
            if (getParamByUrl("testtype") != "tanchao") {
                var data = {
                    iconType: 0,
                    iconColor: "",
                    backNum: 1,
                    closeWebview: 0,
                    hidden: false,
                    isHandle: false,
                    functionName: ""
                };
                data = JSON.stringify(data);
                appFc.controlLeft(data);
            }
        }
        // 右上角管理编辑
        function getControl1() {
            $(".manage").show();
            var getPageInfo1 = function getPageInfo1() {
                var data = {
                    iconType: 1, //走文案
                    id: "2",
                    functionName: "getControl2",
                    iconUrl: "",
                    iconName: "完成",
                    redDotType: "1",
                    redDotShow: false,
                    redDotNum: "0",
                    nativeType: "",
                    content: "",
                    str: "完成",
                    color: "",
                    opacity: ""

                };
                return JSON.stringify(data);
            };
            appFc.controlRightInfo(getPageInfo1());
        }
        function getControl2() {
            $(".manage").hide();
            var getPageInfo1 = function getPageInfo1() {
                var data = {
                    iconType: 1, //走文案
                    id: "2",
                    functionName: "getControl1",
                    iconUrl: "",
                    iconName: "管理",
                    redDotType: "1",
                    redDotShow: false,
                    redDotNum: "0",
                    nativeType: "",
                    content: "",
                    str: "管理",
                    color: "",
                    opacity: ""
                };
                return JSON.stringify(data);
            };
            appFc.controlRightInfo(getPageInfo1());
        }
        window.getControl2 = getControl2;
        window.getControl1 = getControl1;
        var getPageInfo6 = function getPageInfo6() {
            var data = {
                iconType: 1, //0走图片逻辑，1走文案逻辑
                rightStr: {
                    str: "管理",
                    color: "",
                    opacity: "",
                    id: "0",
                    type: "0",
                    functionName: "getControl1",
                    redDotType: "1",
                    redDotShow: false,
                    redDotNum: "0",
                    nativeType: "",
                    content: ""
                },
                rightIcon: []
            };
            return JSON.stringify(data);
        };
        window.getPageInfo6 = getPageInfo6();
        appFc.controlRight(getPageInfo6());
        return {
            phoneData: [],
            bigImgArr: [],
            delImgParmData: {}
        };
    },
    componentWillMount: function componentWillMount() {
        var finalUrl = ajaxLink + "/v1/api/campStu/pictureList" + window.location.search + "&campId=" + campId + "&roleId=" + roleId;

        this.serverRequest = $.get(finalUrl, function (data) {
            if (data.code == 200) {
                if (data.resp.sex == 0) {
                    var defaultFrontUrl = frontdefaultImg[0];
                    var defaultSideUrl = sidedefaultImg[0];
                } else {
                    var defaultFrontUrl = frontdefaultImg[1];
                    var defaultSideUrl = sidedefaultImg[1];
                }
                if (data.resp.data.length > 0) {
                    for (var i = 0; i < data.resp.data.length; i++) {
                        if (data.resp.data[i].frontPicture == "" || data.resp.data[i].frontPicture == null) {
                            data.resp.data[i].frontPicture = defaultFrontUrl;
                        }
                        if (data.resp.data[i].facePicture == "" || data.resp.data[i].facePicture == null) {
                            data.resp.data[i].facePicture = defaultSideUrl;
                        }
                        if (data.resp.data[i].weight == null || data.resp.data[i].weight == "") {
                            data.resp.data[i].weight = "--";
                        }
                        if (data.resp.data[i].fat == null || data.resp.data[i].fat == "") {
                            data.resp.data[i].fat = "--";
                        }
                        if (data.resp.data[i].waistMeasure == null || data.resp.data[i].waistMeasure == "") {
                            data.resp.data[i].waistMeasure = "--";
                        }
                    }
                }
                this.setState({
                    phoneData: data.resp.data
                });
            }
        }.bind(this));
    },
    componentWillUnmount: function componentWillUnmount() {
        this.serverRequest.abert();
    },
    componentDidMount: function componentDidMount() {
        // 接收图片数据
        PubSub.subscribe('bigImgData', function (ev, bigImgDate) {
            this.setState({
                bigImgArr: bigImgDate
            });
        }.bind(this));
        // 接收删除照片需要的参数
        PubSub.subscribe('delImgParm', function (ev, delImgParmData) {
            this.setState({
                delImgParmData: delImgParmData
            });
        }.bind(this));
        $(".msg").css("margin-bottom", $(".upload-container").height() + 30);
        // var deviceType8 = isMobile();
        // if (deviceType8 == "isApp" && (typeof mobileApp != "undefined")) {
        //     $(".test").css("display", "none");
        // } else {
        //     alert(345);
        //     $(".test").css("display", "block");
        //     $(".bianji").unbind("click").click(function () {
        //         $(".manage").show();
        //     });
        //     $(".wancheng").unbind("click").click(function () {
        //         $(".manage").hide();
        //     });
        // };
    },
    // 删除照片-取消
    CancelClick: function CancelClick() {
        $(".fixbg").css("display", "none");
    },
    // 删除照片-确认
    SureClick: function SureClick() {
        var delImgParmData = this.state.delImgParmData,
            campPictureId = delImgParmData.campPictureId,
            createTime = delImgParmData.createTime,
            waistMeasureId = delImgParmData.waistMeasureId,
            waistMeasure = delImgParmData.waistMeasure;
        var len = $(".msgType1").length;
        var finalUrl = ajaxLink + "/v1/api/campStu/deletePicture" + window.location.search + "&campPictureId=" + campPictureId;
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function success(data) {
                if (data.code == 200) {
                    // var id = $('[campPictureId='+campPictureId+']').attr("campPictureId");	
                    $('[data-pictureid=' + campPictureId + ']').remove();
                    if (waistMeasureId != null && waistMeasureId != "") {
                        var getPageInfo9 = function getPageInfo9() {
                            var param = {
                                roleId: roleId,
                                serverId: waistMeasureId,
                                girthNum: 0,
                                time: data.resp.operateTrime
                                // isDelete:true,  //删除体围标识，true是，false否
                            };
                            return JSON.stringify(param);
                        };
                        var deviceType = isMobile();
                        if (deviceType == "isApp") {
                            appFc.changeGirth(getPageInfo9());
                        }
                    }
                    len--;
                    alert('还有' + len + '张');
                    if (len == 1 || len == 0) {
                        if (getCookie("toPhoto") == 0) {
                            var getPageInfo = function getPageInfo() {
                                var data = {
                                    iconType: 0, //0:默认箭头，1：叉，2：iconUrl传图片
                                    backNum: 2, //1为正常后退，
                                    closeWebview: 0, //默认为0
                                    iconUrl: ""
                                };
                                return JSON.stringify(data);
                            };
                            var deviceType = isMobile();
                            if (deviceType == "isApp") {
                                appFc.controlLeft(getPageInfo());
                            }
                        } else {
                            var getPageInfo = function getPageInfo() {
                                var data = {
                                    iconType: 0, //0:默认箭头，1：叉，2：iconUrl传图片
                                    backNum: 1, //1为正常后退，
                                    closeWebview: 0, //默认为0
                                    iconUrl: ""
                                };
                                return JSON.stringify(data);
                            };
                            var deviceType = isMobile();
                            if (deviceType == "isApp") {
                                appFc.controlLeft(getPageInfo());
                            }
                        }
                    }
                } else {
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
                }
            }
        });
        $(".fixbg").css("display", "none");
    },
    uploadClick: function uploadClick(event) {
        var ele = event.currentTarget;
        // ss("opacity", "0.6");
        setCookie("uploadurl", 1, 1); //跳转到上传照片页面的标识
        $(ele).attr("href", "figureContrast.html" + window.location.search + "&campId=" + campId + "&roleId=" + roleId + "&uploadurl=1");
        setMaiDian(SWoDeXiangCe.SCategory_SWoDeXiangCe, SWoDeXiangCe.SWoDeXiangCe_TiaoZhuanShangChuanZhaoPian);
        event.stopPropagation();
    },
    render: function render() {
        var PhoneData = this.state.phoneData;
        var phoneList = [];
        // 动态加载图片MyPHoneAlbum组件，并把图片的URL存储在publicData对象里面
        if (PhoneData.length > 0) {
            for (var i = 0; i < PhoneData.length; i++) {
                publicData.objImg['frontPicture' + i] = [];
                publicData.objImg['facePicture' + i] = [];
                publicData.objImg['frontPicture' + i].push({ 'url': PhoneData[i].frontPicture });
                publicData.objImg['facePicture' + i].push({ 'url': PhoneData[i].facePicture });
                phoneList.push(React.createElement(MyPHoneAlbum, { PhoneData: PhoneData, index: i, key: i }));
            }
        }
        var obj_bigImg;
        var bigImgArr = this.state.bigImgArr;
        if (bigImgArr != '') {
            obj_bigImg = React.createElement(Public_BIGImg, { bigImgArr: this.state.bigImgArr });
        } else {
            obj_bigImg = React.createElement("i", null);
        }
        return React.createElement(
            "div",
            null,
            React.createElement(
                "section",
                { className: "container" },
                React.createElement(
                    "div",
                    { className: "row test col-xs-12 col-sm-12" },
                    React.createElement(
                        "div",
                        { className: "bianji col-xs-6 col-sm-6" },
                        "\u7BA1\u7406"
                    ),
                    React.createElement(
                        "div",
                        { className: "wancheng col-xs-6 col-sm-6" },
                        "\u5B8C\u6210"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "msg" },
                    phoneList
                ),
                React.createElement(
                    "div",
                    { className: "upload-container" },
                    React.createElement(
                        "div",
                        { className: "row upload" },
                        React.createElement(
                            "a",
                            { className: "row", onClick: this.uploadClick },
                            "\u4E0A\u4F20\u7167\u7247"
                        )
                    )
                ),
                obj_bigImg
            ),
            React.createElement(
                "div",
                { className: "row fixbg" },
                React.createElement(
                    "div",
                    { className: "col-xs-12 col-sm-12 fixbg-main" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-xs-12 col-sm-12 fixbg-main-t" },
                            "\u662F\u5426\u8981\u5220\u9664",
                            React.createElement("span", { className: "deltime" }),
                            "\u7684\u7167\u7247\uFF1F"
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-12 col-sm-12 fixbg-main-btn" },
                            React.createElement(
                                "div",
                                { className: "row" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-6 col-sm-6 fixbg-main-btn1", onClick: this.CancelClick },
                                    "\u53D6\u6D88"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-6 col-sm-6 fixbg-main-btn2", onClick: this.SureClick },
                                    "\u786E\u5B9A"
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(Public_Error, null),
            React.createElement(
                "div",
                { className: "saveImg-ceng" },
                React.createElement(
                    "aside",
                    { className: "row saveImg" },
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 saveImg-btn saveImg-item", onClick: Fc_bindBigImg.saveImgBtnTouchStart },
                        "\u4FDD\u5B58\u56FE\u7247"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 cancelImg-btn saveImg-item", onClick: Fc_bindBigImg.cancelImgBtnTouchStart },
                        "\u53D6\u6D88"
                    )
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(PHoneAlbumBox, null), document.getElementById('myPhoneAlbumBox'));

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PubSub = __webpack_require__(2);
var Fc_bindBigImg = {};
var windowW = $(window).width();
var windowH = $(window).height();
var mySwiper;
var t1;
var saveLink;
var closeImgBtn = true; //防止连续点击

//保存图片
var timeout;

var timeBtn;
var startX;
var startY;
var moveEndX;
var moveEndY;
//绑定图片预览方法
// 将参数存到publicData.objImg下面，设置window.publicData=publicData;
// 参数格式类似于
// objImg={
// 		img0:[url0,url1,url2,url3,url4],
// 		img1:[url0,url1,url2,url3,url4],
// 		img2:[url0,url1,url2,url3,url4],
// 		img3:[url0,url1,url2,url3,url4]
// }
// 在小图上绑定data-obj_img=img0属性，小图点击绑定bindBigImg事件

window.commentDisplayBtn = false;
Fc_bindBigImg.bindBigImg = function (event) {
	//publicData.objImg为图片预览对象
	if ($(".comment2").css("display") == "block" || commentDisplayBtn) {
		$("#comment-msg").blur();
		commentDisplayBtn = false;
	} else {
		timeBtn = true;
		//setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_YuLanTuPian);
		var bigImgNameData = event.currentTarget.getAttribute("data-obj_img");
		var swiperIndex = event.currentTarget.getAttribute("data-obj_img_index");
		var bigImgData = publicData.objImg[bigImgNameData];

		PubSub.publish("bigImgData", bigImgData);
		if ($(".page1").css("display") == "block") {
			$(".setcard-img").css("display", "none");
		}
		$(".comment").css("display", "none");
		$("#comment-msg").blur();

		$(".getImg-bg").css("height", $(".getImg-bg").width());
		//设置宽高
		$(".bigImg-li").css("width", windowW);
		if (getParamByUrl("os") == "android") {
			$(".bigImg-li").css("height", windowH + 70);
		} else {
			$(".bigImg-li").css("height", windowH + 64);
		}

		//隐藏title
		var data = {
			display: false
		};
		data = JSON.stringify(data);
		appFc.showTitle(data);

		//控制安卓返回键
		var getPageInfo = function getPageInfo() {
			var data = {
				controlBtn: true,
				function: "closeBigImg"
			};
			return JSON.stringify(data);
		};
		appFc.showBackBtn(getPageInfo());
		t1 = setTimeout(function () {
			$("body").css("max-height", $(window).height());
			$("body").css("overflow", "hidden");

			$(".swiper-container").css("width", $(window).width());
			$(".swiper-wrapper").css("width", $(window).width());
			$(".bigImg-li").css("width", $(window).width());
			$(".bigImg").css("display", "block");
			document.addEventListener('touchmove', function (event) {
				//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
				if ($("body").css("overflow") == "hidden") {
					event.preventDefault();
				}
			});
			if (publicData.objImg[bigImgNameData].length == 1) {
				mySwiper = new Swiper('.swiper-container-bigImg', {});
				console.log(mySwiper);
			} else {
				mySwiper = new Swiper('.swiper-container-bigImg', {
					pagination: '.swiper-pagination-bigImg',
					spaceBetween: 1,
					centeredSlides: true,
					initialSlide: swiperIndex
				});
				console.log(mySwiper);
			}
		}, 200);
	}
};
Fc_bindBigImg.imgTouchStart = function (event) {
	console.log(event);

	clearTimeout(timeout);
	timeout = "";
	startX = event.changedTouches[0].pageX, startY = event.changedTouches[0].pageY;
	//startX = event.originalEvent.changedTouches[0].pageX,
	//startY = event.originalEvent.changedTouches[0].pageY;
	var x = event.currentTarget.getAttribute("data-index");
	console.log(event.currentTarget.getAttribute("data-index"));
	saveLink = $(event.currentTarget).css("background-image").split("\(")[1].split("\)")[0];
	console.log(saveLink);

	console.log($(".bigImg").css("display"));
	console.log("setTimeout1");
	timeout = setTimeout(function () {
		if ($(".bigImg").css("display") == "block") {
			console.log("setTimeout2");
			$(".saveImg-ceng").css("height", $(window).height());
			$(".saveImg-ceng").css("display", "block");
			timeBtn = false;
		}
		clearTimeout(timeout);
	}, 800);
	event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动 
};
Fc_bindBigImg.imgTouchMove = function (event) {

	if ($(".saveImg-ceng").css("display") == "block") {
		//$(".saveImg-ceng").css("display","none");
		clearTimeout(timeout);
		timeBtn = false;
	} else {
		moveEndX = event.changedTouches[0].pageX;
		moveEndY = event.changedTouches[0].pageY;
		var moveX;
		var moveY;
		moveX = moveEndX - startX;
		moveY = moveEndY - startY;
		console.log(moveX + "|" + moveY);
		if (moveX < -50 || moveX > 50 || moveY < -50 || moveY > 50) {
			clearTimeout(timeout);
			timeBtn = false;
		}
	}
	event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动  
};
Fc_bindBigImg.imgTouchEnd = function (event) {
	//clearTimeout(timeout);
	moveEndX = event.changedTouches[0].pageX;
	moveEndY = event.changedTouches[0].pageY;
	var moveX;
	var moveY;
	moveX = moveEndX - startX;
	moveY = moveEndY - startY;

	if (moveX < -20 || moveX > 20 || moveY < -20 || moveY > 20) {
		console.log("clearTimeout执行");
		clearTimeout(timeout);
		timeBtn = false;
	}
	clearTimeout(timeout);
	console.log("timeBtn:" + timeBtn);
	console.log(timeout);
	if (timeBtn) {
		closeBigImg();
	}
	timeBtn = true;
	event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动  
};
Fc_bindBigImg.saveImgBtnTouchStart = function () {
	event.stopPropagation();
	event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动  
	var deviceType = isMobile(); //判断是不是app的方法
	/*alert(saveLink);
 saveLink=JSON.stringify(saveLink);
 console.log(typeof saveLink);
 console.log(saveLink);*/
	var getPageInfo = function getPageInfo() {
		var data = {
			url: saveLink
		};
		return JSON.stringify(data);
	};
	appFc.saveImg(getPageInfo());
	$(".saveImg-ceng").css("display", "none");
	//$(".saveImg-btn").unbind("touchstart");
};
Fc_bindBigImg.cancelImgBtnTouchStart = function () {
	event.stopPropagation();
	event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动 
	$(".saveImg-ceng").css("display", "none");
};
Fc_bindBigImg.saveImgCengTouchStart = function () {
	$(".saveImg-ceng").css("display", "none");
	event.stopPropagation();
	event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动  
};
//关闭图片预览
function closeBigImg() {
	if (closeImgBtn) {
		closeImgBtn = false;

		var data = {
			display: true
		};
		data = JSON.stringify(data);
		appFc.showTitle(data);
		//关闭返回键控制

		var getPageInfo = function getPageInfo() {
			var data = {
				controlBtn: false,
				function: ""
			};
			return JSON.stringify(data);
		};
		appFc.showBackBtn(getPageInfo());

		var t2 = setTimeout(function () {
			$("body").css("overflow", "auto");
			//$("body").css("max-height","auto");
			$("body").removeAttr("style");
			$(".bigImg").css("display", "none");
			if ($(".page1").css("display") == "block") {
				$(".setcard-img").css("display", "block");
			}
			$(".saveImg-ceng").css("display", "none");
			document.addEventListener('touchmove', function (event) {
				//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
				if ($("body").css("overflow") == "hidden") {
					event.preventDefault();
				}
			});
			clearTimeout(t1);
			clearTimeout(t2);
			console.log(mySwiper);

			//mySwiper.slideTo(0,1000,false);
			//$(".swiper-pagination").html('');
			// if(mySwiper && mySwiper.params && mySwiper.params.slideTo){
			// 	mySwiper.slideTo(0,1000,false);
			// }
			// if(mySwiper && mySwiper.detachEvents){
			// 	mySwiper.destroy(true);
			// }
			// var bigImgData=[];
			// PubSub.publish("bigImgData",bigImgData);
			try {
				mySwiper.slideTo(0, 1000, false);
				mySwiper.destroy(true);
				console.log("mySwiper摧毁");
			} catch (err) {
				var bigImgData = [];
				PubSub.publish("bigImgData", bigImgData);
				console.log("mySwiper错误");
			}
			closeImgBtn = true;
		}, 200);
	}
	//mySwiper.update();
	//$(".bigImg-main").css("transform","translate3d(0px, 0px, 0px)");
	event.stopPropagation();
}

module.exports = Fc_bindBigImg;

/***/ })

},[229]);