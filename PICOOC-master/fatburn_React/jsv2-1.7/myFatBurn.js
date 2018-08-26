webpackJsonp([29],{

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_error = __webpack_require__(3);
var swisperCtr = 0; //轮播图是否需要滑动
var isShowHistory = true; //是否展示历史燃脂营这一行
var isShowMyOrder = true; //是否展示我的订单这一行
var CampStateContainer = React.createClass({
    displayName: "CampStateContainer",


    getInitialState: function getInitialState() {
        var me = this;
        me.myFatBurnFun();
        delCookie("stuPageJump");
        delCookie("stuPageJump");
        delCookie("campTrend");
        delCookie("campTrend");
        delCookie("isRefresh");
        delCookie("isRefresh");
        //title
        var titleData = {
            title: "我的燃脂营",
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        titleData = JSON.stringify(titleData);
        appFc.controlTitle(titleData);

        //左上角
        var getPageInfo = function getPageInfo() {
            var data = {
                iconType: 0,
                iconColor: "",
                backNum: 0,
                closeWebview: 1,
                hidden: false,
                isHandle: false,
                functionName: ""
                //isRefreshPage:true
            };
            return JSON.stringify(data);
        };
        appFc.controlLeft(getPageInfo());

        return {
            activeBoxAlert: 0, //激活码弹窗
            serviceState: 0, //客服是否带小红点
            myFatBurnData: {}
        };
    },

    componentWillMount: function componentWillMount() {},
    myFatBurnFun: function myFatBurnFun() {
        var me = this;
        var myFatBurnUrl = ajaxLink + "/v1/api/campCommon/campEntry" + window.location.search; //获取我的燃脂营信息
        //var myFatBurnUrl = "http://172.17.1.233:8080/v1/api/campCommon/campEntry" + window.location.search;
        console.log(myFatBurnUrl);
        $.ajax({
            type: 'get',
            url: myFatBurnUrl,
            success: function success(data) {
                if (data.code == 200) {
                    console.log('我的燃脂营', data);
                    me.setState({
                        myFatBurnData: data
                    });

                    //激活btn颜色
                    $('.alertBox .alert .ipt').bind('input propertychange', function () {
                        if ($.trim($(this).val()) != '') {
                            $('.alertBox .alert .btn').css('background', '#30C1B7');
                        } else {
                            $('.alertBox .alert .btn').css('background', '#999999');
                        }
                    });
                } else {
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }

                if (typeof me.state.myFatBurnData.resp != "undefined") {
                    if (swisperCtr == 1) {
                        //有多个banner
                        //获取html根标签的font-size值；修改spaceBetween
                        var fontSize = $('html').css('fontSize');
                        var spaceBetween = parseInt(fontSize) * 2.3;

                        $('.swiper-container .swiper-wrapper').addClass('swiperLeft');
                        var slideLength = $('.swiper-container .swiper-wrapper .swiper-slide').length;
                        //alert(slideLength);
                        var mySwiper = new Swiper('.swiper-container', {
                            initialSlide: 0,
                            direction: 'horizontal', //水平滑动
                            //loop: true, //循环播放
                            //autoplay: 2000, //自动播放
                            autoplayDisableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
                            onSlideChangeStart: function onSlideChangeStart(swiper) {
                                //swiper-container的偏移位置
                                if (swiper.activeIndex == slideLength - 1) {
                                    $('.swiper-container .swiper-wrapper').removeClass('swiperLeft');
                                    $('.swiper-container .swiper-wrapper').addClass('swiperLeft2');
                                } else {
                                    $('.swiper-container .swiper-wrapper').removeClass('swiperLeft2');
                                    $('.swiper-container .swiper-wrapper').addClass('swiperLeft');
                                }
                                //alert(swiper.activeIndex); //切换结束时，告诉我现在是第几个slide
                            },
                            spaceBetween: -spaceBetween //swiper-slide之间的间隙
                        });
                    }

                    //客服小红点
                    var deviceType4 = isMobile();
                    if (deviceType4 == "isApp" && getParamByUrl('webver') > 1) {
                        //显示客服小红点
                        var showDot = function showDot() {
                            //alert("展示小红点成功");
                            //客服：展示小红点
                            me.setState({
                                serviceState: 1
                            });
                        };

                        //低版本兼容
                        if (deviceType4 == "isApp" && typeof mobileApp != "undefined" && getParamByUrl('webver') == 2) {
                            var data6 = {
                                type: 1, //燃脂营售前
                                function: "showDot" //展示小红点的方法名
                            };
                            data6 = JSON.stringify(data6);
                            mobileApp.easeModChatDot(data6);
                        } else {
                            var data4 = {
                                type: 1, //燃脂营售前
                                function: "showDot" //展示小红点的方法名
                                //function:"me.showDot"//展示小红点的方法名
                            };
                            data4 = JSON.stringify(data4);
                            appFc.easeModChatDot(data4);
                        }

                        //访问的是全局的方法showDot
                        window.showDot = showDot;
                    }
                }
            },
            error: function error() {
                $(".error-main-t").html(data.message);
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        });
    },

    render: function render() {
        var me = this;
        var data = me.state.myFatBurnData;
        if (typeof me.state.myFatBurnData.resp != "undefined") {

            var campStatus = data.resp.campInfo;

            //banner状态
            /*var campStatus = {
                notBuy:[],//未购买燃脂营
                isOpenCamp:[1,1],  //isOpenCamp  willCamp
                isCamp:[1],//最多只有一个  //isCamping isCamp
                campHistory:[1] //campHistory camped
            };*/
            var bannerStr = '';
            if (data.resp.isBuy == 0) {
                //未购买燃脂营
                isShowHistory = false;
                isShowMyOrder = false;
                bannerStr = React.createElement(
                    "div",
                    { className: "col-xs-12 col-sm-12 swiper-slide notBuyBox", onClick: me.notBuyFun },
                    React.createElement(
                        "div",
                        { className: "public notBuy" },
                        React.createElement(
                            "div",
                            { className: "info" },
                            React.createElement(
                                "div",
                                { className: "desc1" },
                                "\u5F00\u901A\u71C3\u8102\u8425\u670D\u52A1"
                            ),
                            React.createElement(
                                "div",
                                { className: "desc2" },
                                "\u7EBF\u4E0A\u79C1\u6559\u4E3A\u60A8\u91CF\u8EAB\u6253\u9020\u4E13\u5C5E\u8BAD\u7EC3\u6307\u5BFC"
                            ),
                            React.createElement(
                                "a",
                                { href: "javascript:void(0);", className: "moreLink" },
                                "\u4E86\u89E3\u66F4\u591A"
                            )
                        )
                    )
                );
            } else {
                //已购买燃脂营
                //有历史燃脂营，且没有即将开营，且没有在营 （默认显示最新结营的时间）
                if (campStatus.campHistory != undefined && campStatus.isOpenCamp == undefined && campStatus.isCamp == undefined) {
                    //if((campStatus.campHistory != undefined) && (campStatus.campHistory.length > 0) && (campStatus.isOpenCamp != undefined) && (campStatus.isCamp == undefined)){
                    isShowHistory = false;
                    if (campStatus.campHistory.length == 1) {
                        bannerStr = React.createElement(
                            "div",
                            { className: "swiper-wrapper" },
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 swiper-slide campHistoryBox", onClick: me.campHistoryFun, "data-camp-url": campStatus.campHistory[0].campUrl },
                                React.createElement(
                                    "div",
                                    { className: "public camped" },
                                    React.createElement(
                                        "h3",
                                        null,
                                        React.createElement(
                                            "span",
                                            { className: "campName" },
                                            campStatus.campHistory[0].className
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "row campedBox" },
                                        React.createElement(
                                            "div",
                                            { className: "col-xs-12 col-sm-12 title" },
                                            React.createElement("img", { className: "titleImg", src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/camped.png", alt: "" }),
                                            React.createElement(
                                                "span",
                                                { className: "titleName" },
                                                "\u5DF2\u7ED3\u8425"
                                            )
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "col-xs-12 col-sm-12 grade" },
                                            campStatus.campHistory[0].showName
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "col-xs-12 col-sm-12 date" },
                                            campStatus.campHistory[0].beginTime,
                                            "-",
                                            campStatus.campHistory[0].endTime
                                        )
                                    )
                                )
                            )
                        );
                    } else {
                        swisperCtr = 1; //有多个banner
                        var list = [];
                        campStatus.campHistory.map(function (item, index) {
                            list.push(React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 swiper-slide campHistoryBox", key: index, onClick: me.campHistoryFun, "data-camp-url": campStatus.campHistory[index].campUrl },
                                React.createElement(
                                    "div",
                                    { className: "public camped" },
                                    React.createElement(
                                        "h3",
                                        null,
                                        React.createElement(
                                            "span",
                                            { className: "campName" },
                                            campStatus.campHistory[index].className
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "row campedBox" },
                                        React.createElement(
                                            "div",
                                            { className: "col-xs-12 col-sm-12 title" },
                                            React.createElement("img", { className: "titleImg", src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/camped.png", alt: "" }),
                                            React.createElement(
                                                "span",
                                                { className: "titleName" },
                                                "\u5DF2\u7ED3\u8425"
                                            )
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "col-xs-12 col-sm-12 grade" },
                                            campStatus.campHistory[index].showName
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "col-xs-12 col-sm-12 date" },
                                            campStatus.campHistory[index].beginTime,
                                            "-",
                                            campStatus.campHistory[index].endTime
                                        )
                                    )
                                )
                            ));
                        });
                        bannerStr = React.createElement(
                            "div",
                            { className: "swiper-wrapper" },
                            list
                        );
                    }
                } else {

                    if (campStatus.campHistory == undefined) {
                        //如果没有历史燃脂营，则不显示
                        isShowHistory = false;
                    }

                    //有正在开营的班级
                    if (campStatus.isCamp != undefined) {
                        //if (campStatus.isCamp.length == 0) {
                        //没有即将开营的班级
                        if (campStatus.isOpenCamp == undefined) {
                            //if (campStatus.isOpenCamp.length == 0){
                            bannerStr = React.createElement(
                                "div",
                                { className: "swiper-wrapper" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 swiper-slide isCampingBox", onClick: me.isCampFun, "data-camp-url": campStatus.isCamp[0].campUrl },
                                    React.createElement(
                                        "div",
                                        { className: "public isCamping" },
                                        React.createElement(
                                            "h3",
                                            null,
                                            React.createElement(
                                                "span",
                                                { className: "campName" },
                                                campStatus.isCamp[0].className
                                            )
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "row campedBox" },
                                            React.createElement(
                                                "div",
                                                { className: "col-xs-12 col-sm-12 title" },
                                                React.createElement("img", { className: "titleImg", src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/isCamping.png", alt: "" }),
                                                React.createElement(
                                                    "span",
                                                    { className: "titleName" },
                                                    "\u53C2\u8425\u7B2C",
                                                    React.createElement(
                                                        "span",
                                                        { className: "day" },
                                                        me.getDiffDay(campStatus.isCamp[0].beginTime, data.resp.nowDate) + 1
                                                    ),
                                                    "\u5929"
                                                )
                                            ),
                                            React.createElement(
                                                "div",
                                                { className: "col-xs-12 col-sm-12 grade" },
                                                campStatus.isCamp[0].showName
                                            )
                                        )
                                    )
                                )
                            );
                            // 有即将开营的班级(需调整：遍历数组)
                        } else {
                            swisperCtr = 1; //有多个banner
                            var list = [];

                            campStatus.isOpenCamp.map(function (item, index) {
                                list.push(React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 swiper-slide willCampBox", key: index, onClick: me.getDiffDay(data.resp.nowDate, campStatus.isOpenCamp[index].beginTime) > 1 ? me.isOpenCampFun1 : me.isOpenCampFun2, "data-camp-url": campStatus.isOpenCamp[index].campUrl },
                                    React.createElement(
                                        "div",
                                        { className: "public willCamp" },
                                        React.createElement(
                                            "div",
                                            { className: "topBox" },
                                            React.createElement(
                                                "h3",
                                                null,
                                                React.createElement(
                                                    "span",
                                                    { className: "campName" },
                                                    campStatus.isOpenCamp[index].className
                                                )
                                            ),
                                            React.createElement(
                                                "div",
                                                { className: "campedBox" },
                                                React.createElement(
                                                    "div",
                                                    { className: "row beginTime" },
                                                    React.createElement(
                                                        "div",
                                                        { className: "col-xs-12 col-sm-12 dateText" },
                                                        "\u8DDD ",
                                                        React.createElement(
                                                            "span",
                                                            { className: "date" },
                                                            campStatus.isOpenCamp[index].beginTime.split('.')[1],
                                                            "\u6708",
                                                            campStatus.isOpenCamp[index].beginTime.split('.')[2],
                                                            "\u65E5"
                                                        ),
                                                        "\u5F00\u8425"
                                                    ),
                                                    React.createElement(
                                                        "div",
                                                        { className: "col-xs-12 col-sm-12" },
                                                        React.createElement(
                                                            "span",
                                                            { className: "lefts" },
                                                            "\u8FD8\u6709",
                                                            me.getDiffDay(data.resp.nowDate, campStatus.isOpenCamp[index].beginTime),
                                                            "\u5929"
                                                        )
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                "p",
                                                { className: "readySth" },
                                                React.createElement("img", { className: "readySthImg",
                                                    src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/readySth.png",
                                                    alt: "" }),
                                                React.createElement(
                                                    "span",
                                                    {
                                                        className: "readyText" },
                                                    "\u5165\u8425\u524D\u9700\u8981\u51C6\u5907\u4EC0\u4E48\uFF1F "
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "row question" },
                                            React.createElement(
                                                "div",
                                                { className: "col-xs-6 col-sm-6 enterCamp", onClick: campStatus.isOpenCamp[index].sourceType == '燃脂营APP' || campStatus.isOpenCamp[index].sourceType == '有赞' ? me.enterCampQuestionFun1 : me.enterCampQuestionFun2, "data-order-id": campStatus.isOpenCamp[index].orderId },
                                                React.createElement(
                                                    "span",
                                                    { className: "status" },
                                                    React.createElement("img", {
                                                        className: "wenJuan",
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/enterCamp.png" }),
                                                    React.createElement("img", {
                                                        className: "isOk", style: { display: campStatus.isOpenCamp[index].isJoinRed == 0 ? "none" : "block" },
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/isOk.png" })
                                                ),
                                                React.createElement(
                                                    "span",
                                                    {
                                                        className: "text" },
                                                    "\u5165\u8425\u95EE\u5377",
                                                    React.createElement("img", { className: "redPoint", style: { display: campStatus.isOpenCamp[index].isJoinRed == 0 ? "block" : "none" },
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/redPoint.png",
                                                        alt: "" })
                                                ),
                                                React.createElement(
                                                    "span",
                                                    { className: "more" },
                                                    React.createElement("img", {
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more2.png" })
                                                )
                                            ),
                                            React.createElement(
                                                "div",
                                                { className: "col-xs-6 col-sm-6 sport", onClick: me.sportQuestionFun, "data-order-id": campStatus.isOpenCamp[index].orderId, "data-order-sex": campStatus.isOpenCamp[index].sex },
                                                React.createElement(
                                                    "span",
                                                    { className: "status" },
                                                    React.createElement("img", {
                                                        className: "wenJuan",
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/sport.png" }),
                                                    React.createElement("img", {
                                                        className: "isOk", style: { display: campStatus.isOpenCamp[index].isPhysicalRed == 0 ? "none" : "block" },
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/isOk.png" })
                                                ),
                                                React.createElement(
                                                    "span",
                                                    { className: "text" },
                                                    "\u8FD0\u52A8\u6D4B\u8BD5",
                                                    React.createElement("img", { className: "redPoint", style: { display: campStatus.isOpenCamp[index].isPhysicalRed == 0 ? "block" : "none" },
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/redPoint.png",
                                                        alt: "" })
                                                ),
                                                React.createElement(
                                                    "span",
                                                    { className: "more" },
                                                    React.createElement("img", {
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more2.png" })
                                                )
                                            )
                                        )
                                    )
                                ));
                            });

                            bannerStr = React.createElement(
                                "div",
                                { className: "swiper-wrapper" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 swiper-slide isCampingBox", onClick: me.isCampFun, "data-camp-url": campStatus.isCamp[0].campUrl },
                                    React.createElement(
                                        "div",
                                        { className: "public isCamping" },
                                        React.createElement(
                                            "h3",
                                            null,
                                            React.createElement(
                                                "span",
                                                { className: "campName" },
                                                campStatus.isCamp[0].className
                                            )
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "row campedBox" },
                                            React.createElement(
                                                "div",
                                                { className: "col-xs-12 col-sm-12 title" },
                                                React.createElement("img", { className: "titleImg", src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/isCamping.png", alt: "" }),
                                                React.createElement(
                                                    "span",
                                                    { className: "titleName" },
                                                    "\u53C2\u8425\u7B2C",
                                                    React.createElement(
                                                        "span",
                                                        { className: "day" },
                                                        me.getDiffDay(campStatus.isCamp[0].beginTime, data.resp.nowDate) + 1
                                                    ),
                                                    "\u5929"
                                                )
                                            ),
                                            React.createElement(
                                                "div",
                                                { className: "col-xs-12 col-sm-12 grade" },
                                                campStatus.isCamp[0].showName
                                            )
                                        )
                                    )
                                ),
                                list
                            );
                        }
                    } else {
                        //没有正在开营的班级
                        //肯定是有即将开营的,可能有多个
                        if (campStatus.isOpenCamp.length == 1) {
                            //如果为一个即将开营的
                            //if(campStatus.isOpenCamp.length == 1){
                            bannerStr = React.createElement(
                                "div",
                                { className: "swiper-wrapper" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 swiper-slide willCampBox", onClick: me.getDiffDay(data.resp.nowDate, campStatus.isOpenCamp[0].beginTime) > 1 ? me.isOpenCampFun1 : me.isOpenCampFun2, "data-camp-url": campStatus.isOpenCamp[0].campUrl },
                                    React.createElement(
                                        "div",
                                        { className: "public willCamp" },
                                        React.createElement(
                                            "div",
                                            { className: "topBox" },
                                            React.createElement(
                                                "h3",
                                                null,
                                                React.createElement(
                                                    "span",
                                                    { className: "campName" },
                                                    campStatus.isOpenCamp[0].className
                                                )
                                            ),
                                            React.createElement(
                                                "div",
                                                { className: "campedBox" },
                                                React.createElement(
                                                    "div",
                                                    { className: "row beginTime" },
                                                    React.createElement(
                                                        "div",
                                                        { className: "col-xs-12 col-sm-12 dateText" },
                                                        "\u8DDD ",
                                                        React.createElement(
                                                            "span",
                                                            { className: "date" },
                                                            campStatus.isOpenCamp[0].beginTime.split('.')[1],
                                                            "\u6708",
                                                            campStatus.isOpenCamp[0].beginTime.split('.')[2],
                                                            "\u65E5"
                                                        ),
                                                        "\u5F00\u8425"
                                                    ),
                                                    React.createElement(
                                                        "div",
                                                        { className: "col-xs-12 col-sm-12" },
                                                        React.createElement(
                                                            "span",
                                                            { className: "lefts" },
                                                            "\u8FD8\u6709",
                                                            me.getDiffDay(data.resp.nowDate, campStatus.isOpenCamp[0].beginTime),
                                                            "\u5929"
                                                        )
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                "p",
                                                { className: "readySth" },
                                                React.createElement("img", { className: "readySthImg",
                                                    src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/readySth.png",
                                                    alt: "" }),
                                                React.createElement(
                                                    "span",
                                                    {
                                                        className: "readyText" },
                                                    "\u5165\u8425\u524D\u9700\u8981\u51C6\u5907\u4EC0\u4E48\uFF1F "
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "row question" },
                                            React.createElement(
                                                "div",
                                                { className: "col-xs-6 col-sm-6 enterCamp", onClick: campStatus.isOpenCamp[0].sourceType == '燃脂营APP' || campStatus.isOpenCamp[0].sourceType == '有赞' ? me.enterCampQuestionFun1 : me.enterCampQuestionFun2, "data-order-id": campStatus.isOpenCamp[0].orderId },
                                                React.createElement(
                                                    "span",
                                                    { className: "status" },
                                                    React.createElement("img", {
                                                        className: "wenJuan",
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/enterCamp.png" }),
                                                    React.createElement("img", {
                                                        className: "isOk", style: { display: campStatus.isOpenCamp[0].isJoinRed == 0 ? "none" : "block" },
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/isOk.png" })
                                                ),
                                                React.createElement(
                                                    "span",
                                                    {
                                                        className: "text" },
                                                    "\u5165\u8425\u95EE\u5377",
                                                    React.createElement("img", { className: "redPoint", style: { display: campStatus.isOpenCamp[0].isJoinRed == 0 ? "block" : "none" },
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/redPoint.png",
                                                        alt: "" })
                                                ),
                                                React.createElement(
                                                    "span",
                                                    { className: "more" },
                                                    React.createElement("img", {
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more2.png" })
                                                )
                                            ),
                                            React.createElement(
                                                "div",
                                                { className: "col-xs-6 col-sm-6 sport", onClick: me.sportQuestionFun, "data-order-id": campStatus.isOpenCamp[0].orderId, "data-order-sex": campStatus.isOpenCamp[0].sex },
                                                React.createElement(
                                                    "span",
                                                    { className: "status" },
                                                    React.createElement("img", {
                                                        className: "wenJuan",
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/sport.png" }),
                                                    React.createElement("img", {
                                                        className: "isOk", style: { display: campStatus.isOpenCamp[0].isPhysicalRed == 0 ? "none" : "block" },
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/isOk.png" })
                                                ),
                                                React.createElement(
                                                    "span",
                                                    { className: "text" },
                                                    "\u8FD0\u52A8\u6D4B\u8BD5",
                                                    React.createElement("img", { className: "redPoint", style: { display: campStatus.isOpenCamp[0].isPhysicalRed == 0 ? "block" : "none" },
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/redPoint.png",
                                                        alt: "" })
                                                ),
                                                React.createElement(
                                                    "span",
                                                    { className: "more" },
                                                    React.createElement("img", {
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more2.png" })
                                                )
                                            )
                                        )
                                    )
                                )
                            );
                        } else {
                            //如果为多个即将开营的
                            swisperCtr = 1;
                            var list = [];

                            campStatus.isOpenCamp.map(function (item, index) {
                                list.push(React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 swiper-slide willCampBox", key: index, onClick: me.getDiffDay(data.resp.nowDate, campStatus.isOpenCamp[index].beginTime) > 1 ? me.isOpenCampFun1 : me.isOpenCampFun2, "data-camp-url": campStatus.isOpenCamp[index].campUrl },
                                    React.createElement(
                                        "div",
                                        { className: "public willCamp" },
                                        React.createElement(
                                            "div",
                                            { className: "topBox" },
                                            React.createElement(
                                                "h3",
                                                null,
                                                React.createElement(
                                                    "span",
                                                    { className: "campName" },
                                                    campStatus.isOpenCamp[index].className
                                                )
                                            ),
                                            React.createElement(
                                                "div",
                                                { className: "campedBox" },
                                                React.createElement(
                                                    "div",
                                                    { className: "row beginTime" },
                                                    React.createElement(
                                                        "div",
                                                        { className: "col-xs-12 col-sm-12 dateText" },
                                                        "\u8DDD ",
                                                        React.createElement(
                                                            "span",
                                                            { className: "date" },
                                                            campStatus.isOpenCamp[index].beginTime.split('.')[1],
                                                            "\u6708",
                                                            campStatus.isOpenCamp[index].beginTime.split('.')[2],
                                                            "\u65E5"
                                                        ),
                                                        "\u5F00\u8425"
                                                    ),
                                                    React.createElement(
                                                        "div",
                                                        { className: "col-xs-12 col-sm-12" },
                                                        React.createElement(
                                                            "span",
                                                            { className: "lefts" },
                                                            "\u8FD8\u6709",
                                                            me.getDiffDay(data.resp.nowDate, campStatus.isOpenCamp[index].beginTime),
                                                            "\u5929"
                                                        )
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                "p",
                                                { className: "readySth" },
                                                React.createElement("img", { className: "readySthImg",
                                                    src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/readySth.png",
                                                    alt: "" }),
                                                React.createElement(
                                                    "span",
                                                    {
                                                        className: "readyText" },
                                                    "\u5165\u8425\u524D\u9700\u8981\u51C6\u5907\u4EC0\u4E48\uFF1F "
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "row question" },
                                            React.createElement(
                                                "div",
                                                { className: "col-xs-6 col-sm-6 enterCamp", onClick: campStatus.isOpenCamp[index].sourceType == '燃脂营APP' || campStatus.isOpenCamp[index].sourceType == '有赞' ? me.enterCampQuestionFun1 : me.enterCampQuestionFun2, "data-order-id": campStatus.isOpenCamp[index].orderId },
                                                React.createElement(
                                                    "span",
                                                    { className: "status" },
                                                    React.createElement("img", {
                                                        className: "wenJuan",
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/enterCamp.png" }),
                                                    React.createElement("img", {
                                                        className: "isOk", style: { display: campStatus.isOpenCamp[index].isJoinRed == 0 ? "none" : "block" },
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/isOk.png" })
                                                ),
                                                React.createElement(
                                                    "span",
                                                    {
                                                        className: "text" },
                                                    "\u5165\u8425\u95EE\u5377",
                                                    React.createElement("img", { className: "redPoint", style: { display: campStatus.isOpenCamp[index].isJoinRed == 0 ? "block" : "none" },
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/redPoint.png",
                                                        alt: "" })
                                                ),
                                                React.createElement(
                                                    "span",
                                                    { className: "more" },
                                                    React.createElement("img", {
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more2.png" })
                                                )
                                            ),
                                            React.createElement(
                                                "div",
                                                { className: "col-xs-6 col-sm-6 sport", onClick: me.sportQuestionFun, "data-order-id": campStatus.isOpenCamp[index].orderId, "data-order-sex": campStatus.isOpenCamp[index].sex },
                                                React.createElement(
                                                    "span",
                                                    { className: "status" },
                                                    React.createElement("img", {
                                                        className: "wenJuan",
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/sport.png" }),
                                                    React.createElement("img", {
                                                        className: "isOk", style: { display: campStatus.isOpenCamp[index].isPhysicalRed == 0 ? "none" : "block" },
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/isOk.png" })
                                                ),
                                                React.createElement(
                                                    "span",
                                                    { className: "text" },
                                                    "\u8FD0\u52A8\u6D4B\u8BD5",
                                                    React.createElement("img", { className: "redPoint", style: { display: campStatus.isOpenCamp[index].isPhysicalRed == 0 ? "block" : "none" },
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/redPoint.png",
                                                        alt: "" })
                                                ),
                                                React.createElement(
                                                    "span",
                                                    { className: "more" },
                                                    React.createElement("img", {
                                                        src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more2.png" })
                                                )
                                            )
                                        )
                                    )
                                ));
                            });

                            bannerStr = React.createElement(
                                "div",
                                { className: "swiper-wrapper" },
                                list
                            );
                        }
                    }
                }
            }

            var myFatBurnStr = React.createElement(
                "section",
                { className: "container", style: { display: "block" } },
                React.createElement(
                    "aside",
                    { className: "row swiper-container" },
                    bannerStr
                ),
                React.createElement(
                    "div",
                    { className: "myInfoBox" },
                    React.createElement(
                        "aside",
                        { className: "row common history", style: { display: isShowHistory == true ? "block" : 'none' }, onClick: me.historyInfo },
                        React.createElement(
                            "div",
                            { className: "col-xs-6 col-sm-6 left" },
                            React.createElement("img", { className: "leftImg", src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/history.png" }),
                            React.createElement(
                                "span",
                                { className: "leftText" },
                                "\u5386\u53F2\u71C3\u8102\u8425"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-6 col-sm-6 right" },
                            React.createElement("img", { className: "rightImg", src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more.png" })
                        )
                    ),
                    React.createElement(
                        "aside",
                        { className: "row common myOrder" /*style={{display:(isShowMyOrder==true)?"block":'none'}}*/, onClick: me.OrderInfo },
                        React.createElement(
                            "div",
                            { className: "col-xs-6 col-sm-6 left" },
                            React.createElement("img", { className: "leftImg", src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/order.png" }),
                            React.createElement(
                                "span",
                                { className: "leftText" },
                                "\u6211\u7684\u8BA2\u5355"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-6 col-sm-6 right" },
                            React.createElement("img", { className: "rightImg", src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more.png" })
                        )
                    ),
                    React.createElement(
                        "aside",
                        { className: "row common myCoupon", onClick: me.couponInfo },
                        React.createElement(
                            "div",
                            { className: "col-xs-6 col-sm-6 left" },
                            React.createElement("img", { className: "leftImg", src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/coupon.png" }),
                            React.createElement(
                                "span",
                                { className: "leftText" },
                                "\u6211\u7684\u4F18\u60E0\u5238"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-6 col-sm-6 right" },
                            React.createElement("img", { className: "rightImg", src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more.png" })
                        )
                    ),
                    React.createElement(
                        "aside",
                        { className: "row common activation" },
                        React.createElement(
                            "div",
                            { className: "col-xs-6 col-sm-6 left" },
                            React.createElement("img", { className: "leftImg", src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/activeId.png" }),
                            React.createElement(
                                "span",
                                { className: "leftText" },
                                "\u6FC0\u6D3B\u7801"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-6 col-sm-6 right" },
                            React.createElement(
                                "span",
                                { className: "rightText", onClick: me.activeFun },
                                "\u7ACB\u5373\u6FC0\u6D3B"
                            )
                        )
                    )
                ),
                React.createElement(
                    "aside",
                    { className: "row service", onClick: me.serviceFunction },
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12" },
                        React.createElement("img", { className: "serviceImg", src: me.state.serviceState == 0 ? "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/service.png" : "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/service_red.png" })
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12" },
                        React.createElement(
                            "span",
                            { className: "serviceText" },
                            "\u8054\u7CFB\u5BA2\u670D"
                        )
                    )
                ),
                React.createElement(
                    "aside",
                    { className: "row alertBox", style: { display: me.state.activeBoxAlert == 0 ? "none" : "block" } },
                    React.createElement(
                        "div",
                        { className: "alert" },
                        React.createElement("img", { onClick: me.closeActiveFun, src: "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/close.png", className: "closeBtn" }),
                        React.createElement(
                            "h3",
                            { className: "title" },
                            "\u8BF7\u8F93\u5165\u6FC0\u6D3B\u7801"
                        ),
                        React.createElement("input", { type: "text", ref: "activationCode", className: "ipt" }),
                        React.createElement(
                            "button",
                            { className: "btn", onClick: me.goToActiveFun },
                            "\u6FC0\u6D3B"
                        )
                    )
                ),
                React.createElement(
                    "aside",
                    { className: "row floatingBox", style: { display: "none" } },
                    React.createElement("div", { className: "floating" })
                ),
                React.createElement(
                    "aside",
                    { className: "row bindBox", style: { display: "none" } },
                    React.createElement(
                        "div",
                        { className: "bind" },
                        React.createElement("p", { className: "bindQuestion" }),
                        React.createElement(
                            "div",
                            { className: "col-xs-6 col-sm-6 tab left" },
                            "\u6682\u4E0D"
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-6 col-sm-6 tab right" },
                            "\u7ACB\u5373\u7ED1\u5B9A"
                        )
                    )
                )
            );
        }

        return React.createElement(
            "div",
            null,
            myFatBurnStr
        );
    },

    activeFun: function activeFun() {
        var me = this;
        var data = me.state.myFatBurnData;
        me.setState({
            activeBoxAlert: 1
        });
    },

    closeActiveFun: function closeActiveFun() {
        var me = this;
        var data = me.state.myFatBurnData;
        me.setState({
            activeBoxAlert: 0
        });
    },

    goToActiveFun: function goToActiveFun() {
        var me = this;
        var totalData = me.state.myFatBurnData;
        var activationCode = me.refs.activationCode.value;
        if ($.trim(activationCode) != '') {
            //如果输入框内容不为空，才执行ajax
            var activeUrl = ajaxLink + "/v1/api/campOrder/activeCode" + window.location.search + "&activationCode=" + activationCode;
            //var activeUrl = "http://172.17.1.233:8080/v1/api/campOrder/activeCode"+ window.location.search+"&activationCode="+activationCode;
            console.log(activeUrl);
            $.ajax({
                type: 'get',
                url: activeUrl,
                success: function success(data) {
                    console.log("激活结果", data);
                    if (data.code == 200) {
                        if (data.resp.status == 0) {
                            //激活码已使用
                            $('.floatingBox').show();
                            $('.floatingBox .floating').html('该激活码已经被使用了哦~').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                        } else if (data.resp.status == 2) {
                            //激活码错误
                            $('.floatingBox').show();
                            $('.floatingBox .floating').html('激活码输入错误，重新试试看吧~').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                        } else if (data.resp.status == 3) {
                            //激活码失效
                            $('.floatingBox').show();
                            $('.floatingBox .floating').html('该激活码已经失效~').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                        } else if (data.resp.status == 4) {
                            //
                            $('.floatingBox').show();
                            $('.floatingBox .floating').html('激活失败~该账号已有同时段开班的燃脂营啦！可以联系售后客服为您处理哦（微信号：picooc2）').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                        } else if (data.resp.status == 1) {
                            //激活成功
                            $('.floatingBox').show();
                            $('.floatingBox .floating').html('恭喜您，激活成功！').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                            setTimeout(function () {
                                window.location.reload();
                            }, 2000);
                            setTimeout(function () {
                                if (data.resp.isBinding == false) {
                                    //需要绑定
                                    var bindPhone = data.resp.phoneNo;
                                    $('.bindBox').show();
                                    $('.bindBox .bind .bindQuestion').html('是否将手机号码' + data.resp.phoneNo + '绑定至当前账号？绑定后您可以更加便捷地查看此手机号码下的订单和优惠券哦~');
                                    $('.bindBox .bind .left').unbind('click').click(function () {
                                        //暂不绑定
                                        $('.bindBox').hide();
                                    });
                                    $('.bindBox .bind .right').unbind('click').click(function () {
                                        //绑定
                                        $('.bindBox').hide();
                                        //var bindUrl = "http://172.17.1.233:8080/v1/api/campOrder/bindingPhone"+ window.location.search;
                                        var bindUrl = ajaxLink + "/v1/api/campOrder/bindingPhone" + window.location.search;
                                        $.ajax({
                                            type: 'get',
                                            url: bindUrl,
                                            success: function success(data) {
                                                console.log(data);
                                                if (data.code == 200) {
                                                    appFc.updateUsePhone(bindPhone);
                                                    /*if(getParamByUrl("os")=="android"){
                                                     mobileApp.updateUsePhone(bindPhone);
                                                     }
                                                     else{
                                                     window.webkit.messageHandlers.updateUsePhone.postMessage(bindPhone);
                                                     }*/
                                                    $('.floatingBox').show();
                                                    $('.floatingBox .floating').html('绑定成功！').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                                                } else {
                                                    $('.floatingBox').show();
                                                    $('.floatingBox .floating').html('绑定失败，请稍后再试~').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                                                }
                                            },
                                            error: function error() {
                                                $(".error-main-t").html(data.message);
                                                $(".errorAlert").css("display", "block");
                                                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                                            }
                                        });
                                    });
                                }
                            }, 2000);
                        }
                    } else {
                        $(".error-main-t").html(data.result.message);
                        $(".errorAlert").css("display", "block");
                        $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                    }
                },
                error: function error() {
                    $(".error-main-t").html(data.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            });
            me.setState({
                activeBoxAlert: 0
            });
        }
    },

    //历史燃脂营
    historyInfo: function historyInfo() {
        var me = this;
        var data = me.state.myFatBurnData;
        var sex = data.resp.sex;
        window.location.href = 'historyCamp.html' + window.location.search + '&sex=' + sex;
    },

    //我的订单
    OrderInfo: function OrderInfo() {
        var me = this;
        var data = me.state.myFatBurnData;
        window.location.href = data.resp.myOrderUrl + '&' + window.location.search.substring(1);
    },

    //我的优惠券
    couponInfo: function couponInfo() {
        var me = this;
        var data = me.state.myFatBurnData;
        window.location.href = data.resp.myCouponUrl + '&' + window.location.search.substring(1);
    },

    //去往客服
    serviceFunction: function serviceFunction() {
        var me = this;
        var deviceType = isMobile();
        if (deviceType == "isApp") {
            //正常版本
            //兼容低版本
            if (getParamByUrl('webver') == 2) {
                mobileApp.goToEaseModChat();
            } else {
                appFc.goToEaseModChat();
            }
            //客服：不展示小红点
            me.setState({
                serviceState: 0
            });
        }
    },

    getDiffDay: function getDiffDay(timeBegin, timeEnd) {
        var time1 = timeBegin;
        var time2 = timeEnd;
        if (getParamByUrl("os") == "iOS") {
            // 判断如果是ios，显示2016/11/14的格式；
            time1 = timeBegin.replace(/\./g, "/");
            time2 = timeEnd.replace(/\./g, "/");
        }
        var timeDiff = new Date(time2).getTime() - new Date(time1).getTime();
        return timeDiff / (1000 * 24 * 3600);
    },

    //notBuyFun(燃脂营售卖首页)
    notBuyFun: function notBuyFun() {
        var me = this;
        var data = me.state.myFatBurnData;
        window.location.href = data.resp.shareInfo.link + '&' + window.location.search.substring(1);
    },

    //campHistoryFun
    campHistoryFun: function campHistoryFun(event) {
        var me = this;
        var data = me.state.myFatBurnData;
        var campHistoryUrl = event.currentTarget.getAttribute("data-camp-url");
        var sex = data.resp.sex;

        var url = campHistoryUrl + '&' + window.location.search.substring(1) + '&sex=' + sex;
        var getPageInfo = function getPageInfo() {
            var data = {
                link: url,
                animation: 1 //默认1从右到左，2从下到上
            };
            return JSON.stringify(data);
        };
        var deviceType = isMobile();
        if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
            appFc.openWebview(getPageInfo());
        } else {
            window.location.href = url;
        }

        //window.location.href = campHistoryUrl+'&'+window.location.search.substring(1)+ '&sex='+sex;
    },

    //isCampFun
    isCampFun: function isCampFun(event) {
        var me = this;
        var data = me.state.myFatBurnData;
        var isCampUrl = event.currentTarget.getAttribute("data-camp-url");
        var sex = data.resp.sex;
        var orderId = data.resp.orderId;
        //  +'&orderId='+orderId
        var url = isCampUrl + '&' + window.location.search.substring(1) + '&sex=' + sex;
        var getPageInfo = function getPageInfo() {
            var data = {
                link: url,
                animation: 1 //默认1从右到左，2从下到上
            };
            return JSON.stringify(data);
        };
        var deviceType = isMobile();
        if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
            appFc.openWebview(getPageInfo());
        } else {
            window.location.href = url;
        }

        //window.location.href = isCampUrl+'&'+window.location.search.substring(1)+ '&sex='+sex;
    },

    //isOpenCampFun1
    isOpenCampFun1: function isOpenCampFun1(event) {
        //入营前准备
        event.stopPropagation();
        window.location.href = 'https://a.picooc.com/details358' + window.location.search;
    },
    //isOpenCampFun2
    isOpenCampFun2: function isOpenCampFun2(event) {
        //提前一天进入student.html页面
        event.stopPropagation();
        var me = this;
        var data = me.state.myFatBurnData;
        var isOpenCampUrl = event.currentTarget.getAttribute("data-camp-url");
        var sex = data.resp.sex;

        var url = isOpenCampUrl + '&' + window.location.search.substring(1) + '&sex=' + sex;
        var getPageInfo = function getPageInfo() {
            var data = {
                link: url,
                animation: 1 //默认1从右到左，2从下到上
            };
            return JSON.stringify(data);
        };
        var deviceType = isMobile();
        if (deviceType == "isApp") {
            appFc.openWebview(getPageInfo());
        } else {
            window.location.href = url;
        }

        //window.location.href = isOpenCampUrl+'&'+window.location.search.substring(1)+ '&sex='+sex;
    },

    //enterCampQuestionFun
    enterCampQuestionFun1: function enterCampQuestionFun1(event) {
        event.stopPropagation();
        var me = this;
        var data = me.state.myFatBurnData;
        var orderId = event.currentTarget.getAttribute("data-order-id");
        var finalUrl = location.origin + "/v1/api/campQuestion/complete" + window.location.search + '&orderId=' + orderId;
        $.ajax({
            url: finalUrl,
            type: 'get',
            dataType: 'json',
            success: function success(data) {
                if (data.code == 200) {

                    if (data.resp.profile == true) {
                        var url = absoluteUrl + "questionnaireShow.html" + window.location.search + '&orderId=' + orderId;
                        // var url = absoluteUrl + "questionnaire2.html" + window.location.search + '&orderId=' + orderId;
                        var getPageInfo = function getPageInfo() {
                            var data = {
                                link: url,
                                animation: 1 //默认1从右到左，2从下到上
                            };
                            return JSON.stringify(data);
                        };
                        var deviceType = isMobile();
                        if (deviceType == "isApp") {
                            appFc.openWebview(getPageInfo());
                        } else {
                            window.location.href = url;
                        }
                    } else {

                        //   var url = absoluteUrl + "questionnaireShow.html" + window.location.search + '&orderId=' + orderId;
                        var url = absoluteUrl + "questionnaire2.html" + window.location.search + '&orderId=' + orderId;
                        var getPageInfo = function getPageInfo() {
                            var data = {
                                link: url,
                                animation: 1 //默认1从右到左，2从下到上
                            };
                            return JSON.stringify(data);
                        };
                        var deviceType = isMobile();
                        if (deviceType == "isApp") {
                            appFc.openWebview(getPageInfo());
                        } else {
                            window.location.href = url;
                        }
                    }
                } else {
                    $(".error-main-t").html(data.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            },
            error: function error() {
                $(".error-main-t").html('网络错误~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        });
    },
    enterCampQuestionFun2: function enterCampQuestionFun2(event) {
        event.stopPropagation();
        var me = this;
        var data = me.state.myFatBurnData;
        var orderId = event.currentTarget.getAttribute("data-order-id");

        var finalUrl = location.origin + "/v1/api/campQuestion/complete" + window.location.search + '&orderId=' + orderId;
        $.ajax({
            url: finalUrl,
            type: 'get',
            dataType: 'json',
            success: function success(data) {
                if (data.code == 200) {

                    if (data.resp.profile == true) {
                        // window.location.href = "questionnaireShow1.html" + window.location.search;
                        var url = absoluteUrl + "questionnaireShow1.html" + window.location.search + '&orderId=' + orderId;
                        // var url = absoluteUrl + "questionnaire2.html" + window.location.search + '&orderId=' + orderId;
                        var getPageInfo = function getPageInfo() {
                            var data = {
                                link: url,
                                animation: 1 //默认1从右到左，2从下到上
                            };
                            return JSON.stringify(data);
                        };
                        var deviceType = isMobile();
                        if (deviceType == "isApp") {
                            appFc.openWebview(getPageInfo());
                        } else {
                            window.location.href = url;
                        }
                    } else {
                        var url = absoluteUrl + "questionnaire1.html" + window.location.search + '&orderId=' + orderId;
                        var getPageInfo = function getPageInfo() {
                            var data = {
                                link: url,
                                animation: 1 //默认1从右到左，2从下到上
                            };
                            return JSON.stringify(data);
                        };
                        var deviceType = isMobile();
                        if (deviceType == "isApp") {
                            appFc.openWebview(getPageInfo());
                        } else {
                            window.location.href = url;
                        }
                    }
                } else {
                    $(".error-main-t").html(data.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            },
            error: function error() {
                $(".error-main-t").html('网络错误~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        });
    },

    //sportQuestionFun
    sportQuestionFun: function sportQuestionFun(event) {
        event.stopPropagation();
        setCookiePath("toQuestionSource", 2, 1, "/;domain=picooc.com");
        var me = this;
        var data = me.state.myFatBurnData;
        var orderId = event.currentTarget.getAttribute("data-order-id");
        //var sex = event.currentTarget.getAttribute("data-order-sex");
        var sex = data.resp.sex;
        var finalUrl = location.origin + "/v1/api/campQuestion/complete" + window.location.search + '&orderId=' + orderId;
        $.ajax({
            url: finalUrl,
            type: 'get',
            dataType: 'json',
            success: function success(data) {
                if (data.code == 200) {

                    if (data.resp.sportText == true) {
                        //window.location.href="trainExplain.html"+window.location.search;
                        //还没有做体侧视频
                        if (data.resp.sportVideo == false) {
                            // alert('false')
                            me.jumpSport(data.resp.campId, orderId);
                        } else {
                            me.getSportResult(data.resp.campId, orderId);
                        }
                    } else {
                        var url = absoluteUrl + "trainExplain.html" + window.location.search + '&orderId=' + orderId + '&sex=' + sex;
                        var getPageInfo = function getPageInfo() {
                            var data = {
                                link: url,
                                animation: 1 //默认1从右到左，2从下到上
                            };
                            return JSON.stringify(data);
                        };
                        var deviceType = isMobile();
                        if (deviceType == "isApp") {
                            appFc.openWebview(getPageInfo());
                        } else {
                            window.location.href = url;
                        }
                        // window.location.href = "trainExplain.html" + window.location.search;
                    }
                } else {
                    $(".error-main-t").html(data.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            },
            error: function error() {
                $(".error-main-t").html('网络错误~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        });

        // window.location.href="trainExplain.html"+window.location.search + '&orderId='+orderId + '&sex='+sex;
    },
    //查看运动测试结果
    getSportResult: function getSportResult(campId, orderId) {
        var roleId = getParamByUrl("roleId");
        // var orderId = getParamByUrl("orderId");

        var deviceType = isMobile();
        var getPageInfo = function getPageInfo() {
            var data = {
                roleId: roleId,
                campId: campId,
                orderId: orderId
            };
            return JSON.stringify(data);
        };
        if (deviceType == "isApp") {
            if (getParamByUrl("os") == "android") {
                mobileApp.getSportResult(getPageInfo());
            } else {
                window.webkit.messageHandlers.getSportResult.postMessage(getPageInfo());
            }
        }
        document.documentElement.style.webkitTouchCallout = 'none';
    },
    //设置跳到运动视频的方法
    jumpSport: function jumpSport(campId, orderId) {
        //alert("campId:"+campId);
        var roleId = getParamByUrl("roleId");
        // var orderId = getParamByUrl("orderId");

        var deviceType = isMobile();
        var type = 1;
        var getPageInfo = function getPageInfo() {
            var data = {
                roleId: roleId,
                type: type,
                campId: campId,
                orderId: orderId
            };
            return JSON.stringify(data);
        };
        // alert(getPageInfo());
        if (deviceType == "isApp") {
            if (getParamByUrl("os") == "android") {
                // alert(data);
                mobileApp.jumpSport(getPageInfo());
            } else {
                window.webkit.messageHandlers.jumpSport.postMessage(getPageInfo());
            }
        }
        document.documentElement.style.webkitTouchCallout = 'none';
    }

});

var Component = React.createClass({
    displayName: "Component",

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(CampStateContainer, null),
            React.createElement(Public_error, null)
        );
    }
});

ReactDOM.render(React.createElement(Component, null), document.getElementById('campStateBox'));

/***/ })

},[220]);