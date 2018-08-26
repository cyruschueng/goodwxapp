var React = require("react");
var ReactDOM = require("react-dom");
var Public_error = require('./Public_error.jsx');
var swisperCtr = 0;//轮播图是否需要滑动
var isShowHistory = true; //是否展示历史燃脂营这一行
var isShowMyOrder = true; //是否展示我的订单这一行
var CampStateContainer = React.createClass({
    getInitialState: function () {
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
        var getPageInfo = function () {
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
            activeBoxAlert: 0,//激活码弹窗
            serviceState: 0,//客服是否带小红点
            myFatBurnData: {}
        }
    },

    componentWillMount: function () {

    },
    myFatBurnFun: function () {
        var me = this;
        var myFatBurnUrl = ajaxLink + "/v1/api/campCommon/campEntry" + window.location.search;//获取我的燃脂营信息
        //var myFatBurnUrl = "http://172.17.1.233:8080/v1/api/campCommon/campEntry" + window.location.search;
        console.log(myFatBurnUrl);
        $.ajax({
            type: 'get',
            url: myFatBurnUrl,
            success: function (data) {
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
                    if (swisperCtr == 1) {//有多个banner
                        //获取html根标签的font-size值；修改spaceBetween
                        var fontSize = $('html').css('fontSize');
                        var spaceBetween = parseInt(fontSize) * 2.3;

                        $('.swiper-container .swiper-wrapper').addClass('swiperLeft');
                        var slideLength = $('.swiper-container .swiper-wrapper .swiper-slide').length;
                        //alert(slideLength);
                        var mySwiper = new Swiper('.swiper-container', {
                            initialSlide: 0,
                            direction: 'horizontal',//水平滑动
                            //loop: true, //循环播放
                            //autoplay: 2000, //自动播放
                            autoplayDisableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
                            onSlideChangeStart: function (swiper) {//swiper-container的偏移位置
                                if (swiper.activeIndex == (slideLength - 1)) {
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
                        //低版本兼容
                        if (deviceType4 == "isApp" && (typeof mobileApp != "undefined") && getParamByUrl('webver') == 2) {
                            var data6 = {
                                type: 1,//燃脂营售前
                                function: "showDot"//展示小红点的方法名
                            };
                            data6 = JSON.stringify(data6);
                            mobileApp.easeModChatDot(data6);
                        } else {
                            var data4 = {
                                type: 1,//燃脂营售前
                                function: "showDot"//展示小红点的方法名
                                //function:"me.showDot"//展示小红点的方法名
                            };
                            data4 = JSON.stringify(data4);
                            appFc.easeModChatDot(data4);
                        }

                        //访问的是全局的方法showDot
                        window.showDot = showDot;
                        //显示客服小红点
                        function showDot() {
                            //alert("展示小红点成功");
                            //客服：展示小红点
                            me.setState({
                                serviceState: 1
                            });
                        }
                    }
                }
            },
            error: function () {
                $(".error-main-t").html(data.message);
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        });
    },

    render: function () {
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
            if (data.resp.isBuy == 0) {//未购买燃脂营
                isShowHistory = false;
                isShowMyOrder = false;
                bannerStr =
                    <div className="col-xs-12 col-sm-12 swiper-slide notBuyBox" onClick={me.notBuyFun}>
                        <div className="public notBuy">
                            <div className="info">
                                <div className="desc1">开通燃脂营服务</div>
                                <div className="desc2">线上私教为您量身打造专属训练指导</div>
                                <a href="javascript:void(0);" className="moreLink">了解更多</a>
                            </div>
                        </div>
                    </div>;
            } else {//已购买燃脂营
                //有历史燃脂营，且没有即将开营，且没有在营 （默认显示最新结营的时间）
                if ((campStatus.campHistory != undefined) && (campStatus.isOpenCamp == undefined) && (campStatus.isCamp == undefined)) {
                    //if((campStatus.campHistory != undefined) && (campStatus.campHistory.length > 0) && (campStatus.isOpenCamp != undefined) && (campStatus.isCamp == undefined)){
                    isShowHistory = false;
                    if (campStatus.campHistory.length == 1) {
                        bannerStr =
                            <div className="swiper-wrapper">
                                <div className="col-xs-12 col-sm-12 swiper-slide campHistoryBox" onClick={me.campHistoryFun} data-camp-url={campStatus.campHistory[0].campUrl}>
                                    <div className="public camped">
                                        <h3><span className="campName">{campStatus.campHistory[0].className}</span></h3>
                                        <div className="row campedBox">
                                            <div className="col-xs-12 col-sm-12 title">
                                                <img className="titleImg" src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/camped.png" alt="" />
                                                <span className="titleName">已结营</span>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 grade">{campStatus.campHistory[0].showName}</div>
                                            <div className="col-xs-12 col-sm-12 date">{campStatus.campHistory[0].beginTime}-{campStatus.campHistory[0].endTime}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>;
                    } else {
                        swisperCtr = 1;//有多个banner
                        var list = [];
                        campStatus.campHistory.map(function (item, index) {
                            list.push(
                                <div className="col-xs-12 col-sm-12 swiper-slide campHistoryBox" key={index} onClick={me.campHistoryFun} data-camp-url={campStatus.campHistory[index].campUrl}>
                                    <div className="public camped">
                                        <h3><span className="campName">{campStatus.campHistory[index].className}</span></h3>
                                        <div className="row campedBox">
                                            <div className="col-xs-12 col-sm-12 title">
                                                <img className="titleImg" src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/camped.png" alt="" />
                                                <span className="titleName">已结营</span>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 grade">{campStatus.campHistory[index].showName}</div>
                                            <div className="col-xs-12 col-sm-12 date">{campStatus.campHistory[index].beginTime}-{campStatus.campHistory[index].endTime}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        });
                        bannerStr =
                            <div className="swiper-wrapper">
                                {list}
                            </div>
                    }
                } else {

                    if ((campStatus.campHistory == undefined)) {//如果没有历史燃脂营，则不显示
                        isShowHistory = false;
                    }

                    //有正在开营的班级
                    if (campStatus.isCamp != undefined) {
                        //if (campStatus.isCamp.length == 0) {
                        //没有即将开营的班级
                        if (campStatus.isOpenCamp == undefined) {
                            //if (campStatus.isOpenCamp.length == 0){
                            bannerStr =
                                <div className="swiper-wrapper">
                                    <div className="col-xs-12 col-sm-12 swiper-slide isCampingBox" onClick={me.isCampFun} data-camp-url={campStatus.isCamp[0].campUrl}>
                                        <div className="public isCamping">
                                            <h3><span className="campName">{campStatus.isCamp[0].className}</span></h3>
                                            <div className="row campedBox">
                                                <div className="col-xs-12 col-sm-12 title">
                                                    <img className="titleImg" src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/isCamping.png" alt="" />
                                                    <span className="titleName">参营第<span className="day">{me.getDiffDay(campStatus.isCamp[0].beginTime, data.resp.nowDate) + 1}</span>天</span>
                                                </div>
                                                <div className="col-xs-12 col-sm-12 grade">{campStatus.isCamp[0].showName}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>;
                            // 有即将开营的班级(需调整：遍历数组)
                        } else {
                            swisperCtr = 1;//有多个banner
                            var list = [];

                            campStatus.isOpenCamp.map(function (item, index) {
                                list.push(
                                    <div className="col-xs-12 col-sm-12 swiper-slide willCampBox" key={index} onClick={(me.getDiffDay(data.resp.nowDate, campStatus.isOpenCamp[index].beginTime) > 1) ? me.isOpenCampFun1 : me.isOpenCampFun2} data-camp-url={campStatus.isOpenCamp[index].campUrl}>
                                        <div className="public willCamp">
                                            <div className="topBox">
                                                <h3><span className="campName">{campStatus.isOpenCamp[index].className}</span></h3>
                                                <div className="campedBox">
                                                    <div className="row beginTime">
                                                        <div className="col-xs-12 col-sm-12 dateText">距 <span className="date">{campStatus.isOpenCamp[index].beginTime.split('.')[1]}月{campStatus.isOpenCamp[index].beginTime.split('.')[2]}日</span>
                                                            开营
                                                        </div>
                                                        <div className="col-xs-12 col-sm-12"><span className="lefts">还有{me.getDiffDay(data.resp.nowDate, campStatus.isOpenCamp[index].beginTime)}天</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="readySth"><img className="readySthImg"
                                                    src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/readySth.png"
                                                    alt="" /><span
                                                        className="readyText">入营前需要准备什么？ </span></p>
                                            </div>
                                            <div className="row question">
                                                <div className="col-xs-6 col-sm-6 enterCamp" onClick={((campStatus.isOpenCamp[index].sourceType == '燃脂营APP') || (campStatus.isOpenCamp[index].sourceType == '有赞')) ? me.enterCampQuestionFun1 : me.enterCampQuestionFun2} data-order-id={campStatus.isOpenCamp[index].orderId}>
                                                    <span className="status"><img
                                                        className="wenJuan"
                                                        src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/enterCamp.png" /><img
                                                            className="isOk" style={{ display: (campStatus.isOpenCamp[index].isJoinRed == 0) ? "none" : "block" }}
                                                            src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/isOk.png" /></span><span
                                                                className="text">入营问卷<img className="redPoint" style={{ display: (campStatus.isOpenCamp[index].isJoinRed == 0) ? "block" : "none" }}
                                                                    src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/redPoint.png"
                                                                    alt="" /></span><span className="more"><img
                                                                        src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more2.png" /></span>
                                                </div>
                                                <div className="col-xs-6 col-sm-6 sport" onClick={me.sportQuestionFun} data-order-id={campStatus.isOpenCamp[index].orderId} data-order-sex={campStatus.isOpenCamp[index].sex}>
                                                    <span className="status"><img
                                                        className="wenJuan"
                                                        src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/sport.png" /><img
                                                            className="isOk" style={{ display: (campStatus.isOpenCamp[index].isPhysicalRed == 0) ? "none" : "block" }}
                                                            src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/isOk.png" /></span>
                                                    <span className="text">运动测试<img className="redPoint" style={{ display: (campStatus.isOpenCamp[index].isPhysicalRed == 0) ? "block" : "none" }}
                                                        src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/redPoint.png"
                                                        alt="" /></span>
                                                    <span className="more"><img
                                                        src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more2.png" /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            });

                            bannerStr =
                                <div className="swiper-wrapper">
                                    <div className="col-xs-12 col-sm-12 swiper-slide isCampingBox" onClick={me.isCampFun} data-camp-url={campStatus.isCamp[0].campUrl}>
                                        <div className="public isCamping">
                                            <h3><span className="campName">{campStatus.isCamp[0].className}</span></h3>
                                            <div className="row campedBox">
                                                <div className="col-xs-12 col-sm-12 title">
                                                    <img className="titleImg" src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/isCamping.png" alt="" />
                                                    <span className="titleName">参营第<span className="day">{me.getDiffDay(campStatus.isCamp[0].beginTime, data.resp.nowDate) + 1}</span>天</span>
                                                </div>
                                                <div className="col-xs-12 col-sm-12 grade">{campStatus.isCamp[0].showName}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {list}
                                </div>;


                        }
                    } else {//没有正在开营的班级
                        //肯定是有即将开营的,可能有多个
                        if (campStatus.isOpenCamp.length == 1) {//如果为一个即将开营的
                            //if(campStatus.isOpenCamp.length == 1){
                            bannerStr =
                                <div className="swiper-wrapper">
                                    <div className="col-xs-12 col-sm-12 swiper-slide willCampBox" onClick={(me.getDiffDay(data.resp.nowDate, campStatus.isOpenCamp[0].beginTime) > 1) ? me.isOpenCampFun1 : me.isOpenCampFun2} data-camp-url={campStatus.isOpenCamp[0].campUrl}>
                                        <div className="public willCamp">
                                            <div className="topBox">
                                                <h3><span className="campName">{campStatus.isOpenCamp[0].className}</span></h3>
                                                <div className="campedBox">
                                                    <div className="row beginTime">
                                                        <div className="col-xs-12 col-sm-12 dateText">距 <span className="date">{campStatus.isOpenCamp[0].beginTime.split('.')[1]}月{campStatus.isOpenCamp[0].beginTime.split('.')[2]}日</span>
                                                            开营
                                                        </div>
                                                        <div className="col-xs-12 col-sm-12"><span className="lefts">还有{me.getDiffDay(data.resp.nowDate, campStatus.isOpenCamp[0].beginTime)}天</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="readySth"><img className="readySthImg"
                                                    src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/readySth.png"
                                                    alt="" /><span
                                                        className="readyText">入营前需要准备什么？ </span></p>
                                            </div>
                                            <div className="row question">
                                                <div className="col-xs-6 col-sm-6 enterCamp" onClick={((campStatus.isOpenCamp[0].sourceType == '燃脂营APP') || (campStatus.isOpenCamp[0].sourceType == '有赞')) ? me.enterCampQuestionFun1 : me.enterCampQuestionFun2} data-order-id={campStatus.isOpenCamp[0].orderId}>
                                                    <span className="status"><img
                                                        className="wenJuan"
                                                        src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/enterCamp.png" /><img
                                                            className="isOk" style={{ display: (campStatus.isOpenCamp[0].isJoinRed == 0) ? "none" : "block" }}
                                                            src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/isOk.png" /></span><span
                                                                className="text">入营问卷<img className="redPoint" style={{ display: (campStatus.isOpenCamp[0].isJoinRed == 0) ? "block" : "none" }}
                                                                    src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/redPoint.png"
                                                                    alt="" /></span><span className="more"><img
                                                                        src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more2.png" /></span>
                                                </div>
                                                <div className="col-xs-6 col-sm-6 sport" onClick={me.sportQuestionFun} data-order-id={campStatus.isOpenCamp[0].orderId} data-order-sex={campStatus.isOpenCamp[0].sex}>
                                                    <span className="status"><img
                                                        className="wenJuan"
                                                        src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/sport.png" /><img
                                                            className="isOk" style={{ display: (campStatus.isOpenCamp[0].isPhysicalRed == 0) ? "none" : "block" }}
                                                            src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/isOk.png" /></span>
                                                    <span className="text">运动测试<img className="redPoint" style={{ display: (campStatus.isOpenCamp[0].isPhysicalRed == 0) ? "block" : "none" }}
                                                        src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/redPoint.png"
                                                        alt="" /></span>
                                                    <span className="more"><img
                                                        src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more2.png" /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        } else {//如果为多个即将开营的
                            swisperCtr = 1;
                            var list = [];

                            campStatus.isOpenCamp.map(function (item, index) {
                                list.push(
                                    <div className="col-xs-12 col-sm-12 swiper-slide willCampBox" key={index} onClick={(me.getDiffDay(data.resp.nowDate, campStatus.isOpenCamp[index].beginTime) > 1) ? me.isOpenCampFun1 : me.isOpenCampFun2} data-camp-url={campStatus.isOpenCamp[index].campUrl}>
                                        <div className="public willCamp">
                                            <div className="topBox">
                                                <h3><span className="campName">{campStatus.isOpenCamp[index].className}</span></h3>
                                                <div className="campedBox">
                                                    <div className="row beginTime">
                                                        <div className="col-xs-12 col-sm-12 dateText">距 <span className="date">{campStatus.isOpenCamp[index].beginTime.split('.')[1]}月{campStatus.isOpenCamp[index].beginTime.split('.')[2]}日</span>
                                                            开营
                                                        </div>
                                                        <div className="col-xs-12 col-sm-12"><span className="lefts">还有{me.getDiffDay(data.resp.nowDate, campStatus.isOpenCamp[index].beginTime)}天</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="readySth"><img className="readySthImg"
                                                    src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/readySth.png"
                                                    alt="" /><span
                                                        className="readyText">入营前需要准备什么？ </span></p>
                                            </div>
                                            <div className="row question">
                                                <div className="col-xs-6 col-sm-6 enterCamp" onClick={((campStatus.isOpenCamp[index].sourceType == '燃脂营APP') || (campStatus.isOpenCamp[index].sourceType == '有赞')) ? me.enterCampQuestionFun1 : me.enterCampQuestionFun2} data-order-id={campStatus.isOpenCamp[index].orderId}>
                                                    <span className="status"><img
                                                        className="wenJuan"
                                                        src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/enterCamp.png" /><img
                                                            className="isOk" style={{ display: (campStatus.isOpenCamp[index].isJoinRed == 0) ? "none" : "block" }}
                                                            src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/isOk.png" /></span><span
                                                                className="text">入营问卷<img className="redPoint" style={{ display: (campStatus.isOpenCamp[index].isJoinRed == 0) ? "block" : "none" }}
                                                                    src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/redPoint.png"
                                                                    alt="" /></span><span className="more"><img
                                                                        src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more2.png" /></span>
                                                </div>
                                                <div className="col-xs-6 col-sm-6 sport" onClick={me.sportQuestionFun} data-order-id={campStatus.isOpenCamp[index].orderId} data-order-sex={campStatus.isOpenCamp[index].sex}>
                                                    <span className="status"><img
                                                        className="wenJuan"
                                                        src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/sport.png" /><img
                                                            className="isOk" style={{ display: (campStatus.isOpenCamp[index].isPhysicalRed == 0) ? "none" : "block" }}
                                                            src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/isOk.png" /></span>
                                                    <span className="text">运动测试<img className="redPoint" style={{ display: (campStatus.isOpenCamp[index].isPhysicalRed == 0) ? "block" : "none" }}
                                                        src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/redPoint.png"
                                                        alt="" /></span>
                                                    <span className="more"><img
                                                        src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more2.png" /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            });

                            bannerStr =
                                <div className="swiper-wrapper">
                                    {list}
                                </div>
                        }
                    }
                }
            }


            var myFatBurnStr =
                <section className="container" style={{ display: "block" }}>
                    <aside className="row swiper-container">

                        {bannerStr}

                    </aside>
                    <div className="myInfoBox">
                        <aside className="row common history" style={{ display: (isShowHistory == true) ? "block" : 'none' }} onClick={me.historyInfo}>
                            <div className="col-xs-6 col-sm-6 left">
                                <img className="leftImg" src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/history.png" /><span className="leftText">历史燃脂营</span>
                            </div>
                            <div className="col-xs-6 col-sm-6 right">
                                <img className="rightImg" src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more.png" />
                            </div>
                        </aside>
                        <aside className="row common myOrder" /*style={{display:(isShowMyOrder==true)?"block":'none'}}*/ onClick={me.OrderInfo}>
                            <div className="col-xs-6 col-sm-6 left">
                                <img className="leftImg" src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/order.png" /><span className="leftText">我的订单</span>
                            </div>
                            <div className="col-xs-6 col-sm-6 right">
                                <img className="rightImg" src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more.png" />
                            </div>
                        </aside>
                        <aside className="row common myCoupon" onClick={me.couponInfo}>
                            <div className="col-xs-6 col-sm-6 left">
                                <img className="leftImg" src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/coupon.png" /><span className="leftText">我的优惠券</span>
                            </div>
                            <div className="col-xs-6 col-sm-6 right">
                                <img className="rightImg" src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/more.png" />
                            </div>
                        </aside>
                        <aside className="row common activation">
                            <div className="col-xs-6 col-sm-6 left">
                                <img className="leftImg" src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/activeId.png" /><span className="leftText">激活码</span>
                            </div>
                            <div className="col-xs-6 col-sm-6 right">
                                <span className="rightText" onClick={me.activeFun}>立即激活</span>
                            </div>
                        </aside>
                    </div>
                    <aside className="row service" onClick={me.serviceFunction}>
                        <div className="col-xs-12 col-sm-12"><img className="serviceImg" src={(me.state.serviceState == 0) ? "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/service.png" : "https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/service_red.png"} /></div>
                        <div className="col-xs-12 col-sm-12"><span className="serviceText">联系客服</span></div>
                    </aside>
                    <aside className="row alertBox" style={{ display: (me.state.activeBoxAlert == 0) ? "none" : "block" }}>
                        <div className="alert">
                            <img onClick={me.closeActiveFun} src="https://cdn2.picooc.com/web/res/fatburn/image/myFatBurn/close.png" className="closeBtn" />
                            <h3 className="title">请输入激活码</h3>
                            <input type="text" ref="activationCode" className="ipt" />
                            <button className="btn" onClick={me.goToActiveFun}>激活</button>
                        </div>
                    </aside>
                    <aside className="row floatingBox" style={{ display: "none" }}>
                        <div className="floating"></div>
                    </aside>

                    <aside className="row bindBox" style={{ display: "none" }}>
                        <div className="bind">
                            <p className="bindQuestion"></p>
                            <div className="col-xs-6 col-sm-6 tab left">暂不</div>
                            <div className="col-xs-6 col-sm-6 tab right">立即绑定</div>
                        </div>

                    </aside>


                </section>;


        }

        return (
            <div>{myFatBurnStr}</div>
        );
    },


    activeFun: function () {
        var me = this;
        var data = me.state.myFatBurnData;
        me.setState({
            activeBoxAlert: 1
        });
    },

    closeActiveFun: function () {
        var me = this;
        var data = me.state.myFatBurnData;
        me.setState({
            activeBoxAlert: 0
        });
    },

    goToActiveFun: function () {
        var me = this;
        var totalData = me.state.myFatBurnData;
        var activationCode = me.refs.activationCode.value;
        if($.trim(activationCode) != ''){//如果输入框内容不为空，才执行ajax
            var activeUrl = ajaxLink + "/v1/api/campOrder/activeCode" + window.location.search + "&activationCode=" + activationCode;
            //var activeUrl = "http://172.17.1.233:8080/v1/api/campOrder/activeCode"+ window.location.search+"&activationCode="+activationCode;
            console.log(activeUrl);
            $.ajax({
                type: 'get',
                url: activeUrl,
                success: function (data) {
                    console.log("激活结果", data);
                    if (data.code == 200) {
                        if (data.resp.status == 0) {//激活码已使用
                            $('.floatingBox').show();
                            $('.floatingBox .floating').html('该激活码已经被使用了哦~').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                        } else if (data.resp.status == 2) {//激活码错误
                            $('.floatingBox').show();
                            $('.floatingBox .floating').html('激活码输入错误，重新试试看吧~').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                        } else if (data.resp.status == 3) {//激活码失效
                            $('.floatingBox').show();
                            $('.floatingBox .floating').html('该激活码已经失效~').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                        } else if (data.resp.status == 4) {//
                            $('.floatingBox').show();
                            $('.floatingBox .floating').html('激活失败~该账号已有同时段开班的燃脂营啦！可以联系售后客服为您处理哦（微信号：picooc2）').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                        } else if (data.resp.status == 1) {//激活成功
                            $('.floatingBox').show();
                            $('.floatingBox .floating').html('恭喜您，激活成功！').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                            setTimeout(function(){
                                window.location.reload();
                            }, 2000);
                            setTimeout(function () {
                                if (data.resp.isBinding == false) {//需要绑定
                                    var bindPhone = data.resp.phoneNo;
                                    $('.bindBox').show();
                                    $('.bindBox .bind .bindQuestion').html('是否将手机号码' + data.resp.phoneNo + '绑定至当前账号？绑定后您可以更加便捷地查看此手机号码下的订单和优惠券哦~');
                                    $('.bindBox .bind .left').unbind('click').click(function () {//暂不绑定
                                        $('.bindBox').hide();
                                    });
                                    $('.bindBox .bind .right').unbind('click').click(function () {//绑定
                                        $('.bindBox').hide();
                                        //var bindUrl = "http://172.17.1.233:8080/v1/api/campOrder/bindingPhone"+ window.location.search;
                                        var bindUrl = ajaxLink + "/v1/api/campOrder/bindingPhone" + window.location.search;
                                        $.ajax({
                                            type: 'get',
                                            url: bindUrl,
                                            success: function (data) {
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
                                            error: function () {
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
                error: function () {
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
    historyInfo: function () {
        var me = this;
        var data = me.state.myFatBurnData;
        var sex = data.resp.sex;
        window.location.href = 'historyCamp.html' + window.location.search + '&sex=' + sex;
    },

    //我的订单
    OrderInfo: function () {
        var me = this;
        var data = me.state.myFatBurnData;
        window.location.href = data.resp.myOrderUrl + '&' + window.location.search.substring(1);
    },

    //我的优惠券
    couponInfo: function () {
        var me = this;
        var data = me.state.myFatBurnData;
        window.location.href = data.resp.myCouponUrl + '&' + window.location.search.substring(1);
    },

    //去往客服
    serviceFunction: function () {
        var me = this;
        var deviceType = isMobile();
        if (deviceType == "isApp") {//正常版本
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

    getDiffDay: function (timeBegin, timeEnd) {
        var time1 = timeBegin;
        var time2 = timeEnd;
        if (getParamByUrl("os") == "iOS") {// 判断如果是ios，显示2016/11/14的格式；
            time1 = timeBegin.replace(/\./g, "/");
            time2 = timeEnd.replace(/\./g, "/");
        }
        var timeDiff = new Date(time2).getTime() - new Date(time1).getTime();
        return timeDiff / (1000 * 24 * 3600);
    },

    //notBuyFun(燃脂营售卖首页)
    notBuyFun: function () {
        var me = this;
        var data = me.state.myFatBurnData;
        window.location.href = data.resp.shareInfo.link + '&' + window.location.search.substring(1);
    },

    //campHistoryFun
    campHistoryFun: function (event) {
        var me = this;
        var data = me.state.myFatBurnData;
        var campHistoryUrl = event.currentTarget.getAttribute("data-camp-url");
        var sex = data.resp.sex;

        var url = campHistoryUrl + '&' + window.location.search.substring(1) + '&sex=' + sex;
        var getPageInfo = function () {
            var data = {
                link: url,
                animation: 1//默认1从右到左，2从下到上
            };
            return JSON.stringify(data);
        };
        var deviceType = isMobile();
        if (deviceType == "isApp" && getParamByUrl("testtype")!="tanchao") {
            appFc.openWebview(getPageInfo());
        } else {
            window.location.href = url;
        }

        //window.location.href = campHistoryUrl+'&'+window.location.search.substring(1)+ '&sex='+sex;
    },

    //isCampFun
    isCampFun: function (event) {
        var me = this;
        var data = me.state.myFatBurnData;
        var isCampUrl = event.currentTarget.getAttribute("data-camp-url");
        var sex = data.resp.sex;
        var orderId = data.resp.orderId;
//  +'&orderId='+orderId
        var url = isCampUrl + '&' + window.location.search.substring(1) + '&sex=' + sex;
        var getPageInfo = function () {
            var data = {
                link: url,
                animation: 1//默认1从右到左，2从下到上
            };
            return JSON.stringify(data);
        };
        var deviceType = isMobile();
        if (deviceType == "isApp" && getParamByUrl("testtype")!="tanchao") {
            appFc.openWebview(getPageInfo());
        } else {
            window.location.href = url;
        }

        //window.location.href = isCampUrl+'&'+window.location.search.substring(1)+ '&sex='+sex;
    },

    //isOpenCampFun1
    isOpenCampFun1: function (event) {//入营前准备
        event.stopPropagation();
        window.location.href = 'https://a.picooc.com/details358'+window.location.search;
    },
    //isOpenCampFun2
    isOpenCampFun2: function (event) {//提前一天进入student.html页面
        event.stopPropagation();
        var me = this;
        var data = me.state.myFatBurnData;
        var isOpenCampUrl = event.currentTarget.getAttribute("data-camp-url");
        var sex = data.resp.sex;

        var url = isOpenCampUrl + '&' + window.location.search.substring(1) + '&sex=' + sex;
        var getPageInfo = function () {
            var data = {
                link: url,
                animation: 1//默认1从右到左，2从下到上
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
    enterCampQuestionFun1: function (event) {
        event.stopPropagation();
        var me = this;
        var data = me.state.myFatBurnData;
        var orderId = event.currentTarget.getAttribute("data-order-id");
        var finalUrl = location.origin + "/v1/api/campQuestion/complete" + window.location.search + '&orderId=' + orderId;
        $.ajax({
            url: finalUrl,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {

                    if (data.resp.profile == true) {
                        var url = absoluteUrl + "questionnaireShow.html" + window.location.search + '&orderId=' + orderId;
                        // var url = absoluteUrl + "questionnaire2.html" + window.location.search + '&orderId=' + orderId;
                        var getPageInfo = function () {
                            var data = {
                                link: url,
                                animation: 1//默认1从右到左，2从下到上
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
                        var getPageInfo = function () {
                            var data = {
                                link: url,
                                animation: 1//默认1从右到左，2从下到上
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
                }
                else {
                    $(".error-main-t").html(data.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            },
            error: function () {
                $(".error-main-t").html('网络错误~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);

            }
        })
    },
    enterCampQuestionFun2: function (event) {
        event.stopPropagation();
        var me = this;
        var data = me.state.myFatBurnData;
        var orderId = event.currentTarget.getAttribute("data-order-id");

        var finalUrl = location.origin + "/v1/api/campQuestion/complete" + window.location.search + '&orderId=' + orderId;
        $.ajax({
            url: finalUrl,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {

                    if (data.resp.profile == true) {
                        // window.location.href = "questionnaireShow1.html" + window.location.search;
                        var url = absoluteUrl + "questionnaireShow1.html" + window.location.search + '&orderId=' + orderId;
                        // var url = absoluteUrl + "questionnaire2.html" + window.location.search + '&orderId=' + orderId;
                        var getPageInfo = function () {
                            var data = {
                                link: url,
                                animation: 1//默认1从右到左，2从下到上
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
                        var getPageInfo = function () {
                            var data = {
                                link: url,
                                animation: 1//默认1从右到左，2从下到上
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
                }
                else {
                    $(".error-main-t").html(data.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            },
            error: function () {
                $(".error-main-t").html('网络错误~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        })

    },

    //sportQuestionFun
    sportQuestionFun: function (event) {
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
            success: function (data) {
                if (data.code == 200) {

                    if (data.resp.sportText == true) {
                        //window.location.href="trainExplain.html"+window.location.search;
                        //还没有做体侧视频
                        if (data.resp.sportVideo == false) {
                            // alert('false')
                            me.jumpSport(data.resp.campId,orderId);
                        } else {
                            me.getSportResult(data.resp.campId,orderId);
                        }
                    } else {
                        var url = absoluteUrl + "trainExplain.html" + window.location.search + '&orderId=' + orderId + '&sex=' + sex;
                        var getPageInfo = function () {
                            var data = {
                                link: url,
                                animation: 1//默认1从右到左，2从下到上
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


                }
                else {
                    $(".error-main-t").html(data.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            },
            error: function () {
                $(".error-main-t").html('网络错误~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        })


        // window.location.href="trainExplain.html"+window.location.search + '&orderId='+orderId + '&sex='+sex;
    },
    //查看运动测试结果
    getSportResult: function (campId,orderId) {
        var roleId = getParamByUrl("roleId");
        // var orderId = getParamByUrl("orderId");

        var deviceType = isMobile();
        var getPageInfo = function () {
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
    jumpSport: function (campId,orderId) {
        //alert("campId:"+campId);
        var roleId = getParamByUrl("roleId");
        // var orderId = getParamByUrl("orderId");

        var deviceType = isMobile();
        var type = 1;
        var getPageInfo = function () {
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
    render: function () {
        return (
            <div>
                <CampStateContainer />
                <Public_error />
            </div>
        );
    }
});

ReactDOM.render(
    <Component />, document.getElementById('campStateBox')
);





