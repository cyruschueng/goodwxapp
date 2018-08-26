var React = require("react");
var ReactDOM = require("react-dom");
var PubSub = require("pubsub-js");
var Public_error = require('./Public_error.jsx');
//require("../cssv2/chooseCouponOut.css");
var ChooseCouponOut = require('./ChooseCouponOut.jsx');
var SQueRenDingDan = {
    SCategory_SQueRenDingDan: 5080200,
    SQueRenDingDan_ShouJiHao: 5080201,//手机号
    SQueRenDingDan_WeiXinHao: 5080202,//微信号
    SQueRenDingDan_TongShouJiHao: 5080203,//同手机号
    SQueRenDingDan_XuanZeYouHuiQuan: 5080204,//选择优惠券
    SQueRenDingDan_TiJiaoDingDan: 5080205//提交订单
};
var currentCouponId = '';
var goodsInfos;
var PhoneBtn = false;
var youHuiState = '';
var timer = null;//定时获取优惠券信息
var isChangePhone = false;//是否使用了更新手机号

var verifyTimer;//获取验证码倒计时
var verifyAgainTimer;//重新获取验证码倒计时

var initHasLimit;//刚进入页面的时候判断时候是否限时特价
var endHasLimit;//点击提交订单的时候判断时候是否限时特价

var changePriceSubmit = false;

var submitPhone = getParamByUrl('phoneNo');

//部分页面公用参数
var publicData = {
    phoneNum: '',//app外用户手机号
    ticket: '',
    outAppLogin: (getCookie('appOutPhone') == false) ? false : true
};
window.publicData = publicData;

var ConfirmOrder = React.createClass({

    getInitialState: function () {
        //定义‘确认订单’按钮的位置；
        delCookie('youHuiState');
        var deviceType = isMobile();
        /*if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
            if (getCookie("saveCampFrom") == "1") { //如果是从燃脂营学员首页续营
                var getPageInfo = function () {
                    var data = {
                        iconType: 0,
                        iconColor: "",
                        backNum: 1,
                        closeWebview: 0,
                        hidden: false,
                        isHandle: false,
                        functionName: ""
                        //isRefreshPage:true
                    };
                    return JSON.stringify(data);
                };
                appFc.controlLeft(getPageInfo());
            }
            var titledata = {
                title: '确认订单',
                /!*isShare:false,
                backgroundColor:'#2c2f31'*!/
                color: "",
                opacity: "",
                backgroundColor: "",
                backgroundOpacity: ""
            };
            titledata = JSON.stringify(titledata);
            appFc.controlTitle(titledata);
        }*/
        return {
            beginTime_year: '',
            beginTime_month: '',
            beginTime_day: '',
            originPrice: '',
            currentPrice: '',
            goodsName: '',
            infoImg: '',
            headImg: '',
            userName: '',
            onerror: '',
            couponInfo: [],
            phoneNum: '',
            wechatNum: '',
            selectImg: 'image/confirmOrder/order-3.png',
            goodsId: '',//商品ID
            goodReminder: '',//商品ID
            youHuiState: "",
            currentCouponId: "",
            leftTime: 60,
            againGetCodeShow: false
        }
    },
    componentWillMount: function () {
        if (publicData.outAppLogin == false) {
            window.location.href = 'https://a.picooc.com/web/fatburn/productDetails.html?linkId=' + getParamByUrl('linkId');
        } else {
            var me = this;
            var urlOrder = ajaxLink + "/v1/api/campSell/confirmOrderOut" + window.location.search;//有关优惠券的信息
            // var urlOrder = "http://pm.picooc.com:18092/v1/api/campSell/confirmOrderOut" + window.location.search;//有关优惠券的信息

            console.log(urlOrder);
            $.ajax({
                type: "get",
                url: urlOrder,
                dataType: "json",
                success: function (data) {
                    console.log(urlOrder);
                    if (data.code == 200) {

                        $('.alertsVerify .verifyBox .phone').bind('input propertychange', function () {
                            if ($.trim($(this).val()) != '') {
                                $('.alertsVerify .verifyBox .verifyBtn2').css('background', '#00AFF0');
                            } else {
                                $('.alertsVerify .verifyBox .verifyBtn2').css('background', '#999999');
                            }
                        });
                        $('.alertsVerify .verifyBox .code').bind('input propertychange', function () {
                            if ($.trim($(this).val()) != '') {
                                $('.alertsVerify .verifyBox .verifyBtn1').css('background', '#00AFF0');
                            } else {
                                $('.alertsVerify .verifyBox .verifyBtn1').css('background', '#999999');
                            }
                        });

                        console.log('confirmOrder', data);

                        $('body').show();//ajax请求成功显示body
                        $('.good .infoDesc .goodsName').ellipsis({ //超出2行加省略号
                            english: false,
                            lineNum: 2
                        });


                        initHasLimit = data.resp.goodsInfo.hasLimit;
                        var currentPrice = (data.resp.goodsInfo.hasLimit == true) ? data.resp.goodsInfo.especialPrice : data.resp.goodsInfo.curentPrice;//实付价格
                        var beginTimeArr = data.resp.goodsInfo.beginTime.split('-'); //开营时间

                        me.setState({
                            beginTime_year: beginTimeArr[0],//开营时间:年
                            beginTime_month: beginTimeArr[1],//开营时间:月
                            beginTime_day: beginTimeArr[2],//开营时间:日
                            originPrice: data.resp.goodsInfo.originPrice,//应付价格
                            currentPrice: (data.resp.goodsInfo.hasLimit == true) ? data.resp.goodsInfo.especialPrice : data.resp.goodsInfo.curentPrice,//实付价格
                            goodsName: data.resp.goodsInfo.gradeName,//商品名称
                            goodsId: data.resp.goodsInfo.id,//商品id
                            goodReminder: data.resp.goodsInfo.goodReminder//商品id

                        });

                        PubSub.subscribe("currentPrice", function (evName, currentPrice) {
                            me.setState({ currentPrice: currentPrice });
                            var youhuiText = '',
                                youHuiMoney = '',
                                realyPay = '';
                            if (data.resp.couponInfo.length == 0) {
                                youhuiText = '无可使用的优惠';
                                youHuiMoney = '-¥0';
                                realyPay = '¥' + currentPrice;
                            } else {
                                if (data.resp.couponInfo[0].expire == true || data.resp.couponInfo[0].isUse == 1) {//过期 或 已使用
                                    youhuiText = '无可使用的优惠';
                                    youHuiMoney = '-¥0';
                                    realyPay = '¥' + currentPrice;
                                } else {
                                    youhuiText = '¥' + data.resp.couponInfo[0].value;
                                    youHuiMoney = '-¥' + data.resp.couponInfo[0].value;
                                    if (currentPrice != 0) {
                                        currentPriceNew = currentPrice - data.resp.couponInfo[0].value;
                                        currentPriceNew = Math.round(currentPriceNew * 100) / 100; //四舍五入，并保留两位小数；
                                        realyPay = '¥' + currentPriceNew;
                                    }
                                }
                            }
                            var youhuiData = {
                                youhuiText: youhuiText,
                                youHuiMoney: youHuiMoney,
                                realyPay: realyPay,
                                currentPriceNew: currentPriceNew,
                                firstCouponId: firstCouponId
                            }
                            console.log(youhuiData);
                            PubSub.publish('youhuiData', youhuiData);
                        });


                        var currentPriceNew = '';
                        var firstCouponId = (data.resp.couponInfo.length > 0) ? data.resp.couponInfo[0].id : null;
                        console.log(firstCouponId);

                        me.setState({
                            onerror: onerror,
                            couponInfo: data.resp.couponInfo //优惠价格
                        });
                        var youhuiText = '',
                            youHuiMoney = '',
                            realyPay = '';
                        if (data.resp.couponInfo.length == 0) {
                            youhuiText = '无可使用的优惠';
                            youHuiMoney = '-¥0';
                            realyPay = '¥' + currentPrice;
                        } else {
                            if (data.resp.couponInfo[0].expire == true || data.resp.couponInfo[0].isUse == 1) {//过期 或 已使用
                                youhuiText = '无可使用的优惠';
                                youHuiMoney = '-¥0';
                                realyPay = '¥' + currentPrice;
                            } else {
                                youhuiText = '¥' + data.resp.couponInfo[0].value;
                                youHuiMoney = '-¥' + data.resp.couponInfo[0].value;
                                if (currentPrice != 0) {
                                    currentPriceNew = currentPrice - data.resp.couponInfo[0].value;
                                    currentPriceNew = Math.round(currentPriceNew * 100) / 100; //四舍五入，并保留两位小数；
                                    realyPay = '¥' + currentPriceNew;
                                }
                            }
                        }
                        var youhuiData = {
                            youhuiText: youhuiText,
                            youHuiMoney: youHuiMoney,
                            realyPay: realyPay,
                            currentPriceNew: currentPriceNew,
                            firstCouponId: firstCouponId
                        }
                        console.log(youhuiData);
                        PubSub.publish('youhuiData', youhuiData);
                    } else {
                        $(".error-main-t").html(data.result.message);
                        $(".errorAlert").css("display", "block");
                        $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                    }
                },
                error: function () {
                    $(".error-main-t").html("啊哦，您的网络不太给力~");
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            });
        }
        /*
        var finalUrl = ajaxLink + "/v1/api/campGoods/getGoodsInfo" + window.location.search;//获取商品详情信息
        this.serverRequest = $.get(finalUrl, function (data) {
            if (data.code == 200) {
                $('body').show();//ajax请求成功显示body
                var beginTimeArr = data.resp.beginTime.split('-'); //开营时间
                $('.good .infoDesc .goodsName').ellipsis({ //超出2行加省略号
                    english: false,
                    lineNum: 2
                });
                var pictureArr = JSON.parse(data.resp.picture);
                var infoImg = pictureArr[0].url;
                var currentPrice = data.resp.curentPrice;//实付价格
                var goodsId = data.resp.id;//商品id
                /!*this.setState({
                    beginTime_year: beginTimeArr[0],//开营时间:年
                    beginTime_month: beginTimeArr[1],//开营时间:月
                    beginTime_day: beginTimeArr[2],//开营时间:日
                    originPrice: data.resp.originPrice,//应付价格
                    currentPrice: data.resp.curentPrice,//实付价格
                    infoImg: pictureArr[0].url,//商品头图
                    goodsName: data.resp.name,//商品名称
                    goodsId: data.resp.id//商品id
                });*!/
                var _this = this;
                var urlOrder = ajaxLink + "/v1/api/campSell/confirmOrder" + window.location.search + '&goodsId=' + goodsId;//有关优惠券的信息
                console.log(urlOrder);
                $.ajax({
                    type: "get",
                    url: urlOrder,
                    dataType: "json",
                    success: function (data) {
                        console.log(urlOrder);
                        if (data.code == 200) {

                            $('body').show();//ajax请求成功显示body
                            $('.good .infoDesc .goodsName').ellipsis({ //超出2行加省略号
                                english: false,
                                lineNum: 2
                            });

                            var beginTimeArr = data.resp.goodsInfo.beginTime.split('-'); //开营时间

                            _this.setState({
                                beginTime_year: beginTimeArr[0],//开营时间:年
                                beginTime_month: beginTimeArr[1],//开营时间:月
                                beginTime_day: beginTimeArr[2],//开营时间:日
                                originPrice: data.resp.goodsInfo.originPrice,//应付价格
                                currentPrice: data.resp.goodsInfo.curentPrice,//实付价格
                                goodsName: data.resp.goodsInfo.className,//商品名称
                                goodsId: data.resp.goodsInfo.id//商品id
                            });


                            var currentPriceNew = '';
                            var firstCouponId = (data.resp.couponInfo.length > 0) ? data.resp.couponInfo[0].id : null;
                            console.log(firstCouponId);
                            //用户头像
                            var headImg = '', onerror = '';
                            if (data.resp.roleInfo.sex == 0) {
                                headImg = data.resp.roleInfo.headPortraitUrl;
                                onerror = 'this.src=' + arrHeadImg[0];
                            } else if (data.resp.roleInfo.sex == 1) {
                                headImg = data.resp.roleInfo.headPortraitUrl;
                                onerror = 'this.src=' + arrHeadImg[1];

                            }
                            var userName = data.resp.roleInfo.name;
                            if (userName.length > 5) {
                                userName = userName.substring(0, 5) + '...';
                            }
                            _this.setState({
                                headImg: headImg,
                                userName: userName,
                                onerror: onerror,
                                couponInfo: data.resp.couponInfo //优惠价格
                            });
                            var youhuiText = '',
                                youHuiMoney = '',
                                realyPay = '';
                            if (data.resp.couponInfo.length == 0) {
                                youhuiText = '无可使用的优惠';
                                youHuiMoney = '-¥0';
                                realyPay = '¥' + currentPrice;
                            } else {
                                if (data.resp.couponInfo[0].expire == true || data.resp.couponInfo[0].isUse == 1) {//过期 或 已使用
                                    youhuiText = '无可使用的优惠';
                                    youHuiMoney = '-¥0';
                                    realyPay = '¥' + currentPrice;
                                } else {
                                    youhuiText = '¥' + data.resp.couponInfo[0].value;
                                    youHuiMoney = '-¥' + data.resp.couponInfo[0].value;
                                    if (currentPrice != 0) {
                                        currentPriceNew = currentPrice - data.resp.couponInfo[0].value;
                                        currentPriceNew = Math.round(currentPriceNew * 100) / 100; //四舍五入，并保留两位小数；
                                        realyPay = '¥' + currentPriceNew;
                                    }
                                }
                            }
                            var youhuiData = {
                                youhuiText: youhuiText,
                                youHuiMoney: youHuiMoney,
                                realyPay: realyPay,
                                currentPriceNew: currentPriceNew,
                                firstCouponId: firstCouponId
                            }
                            console.log(youhuiData);
                            PubSub.publish('youhuiData', youhuiData);
                        } else {
                            $(".error-main-t").html(data.result.message);
                            $(".errorAlert").css("display", "block");
                            $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                        }
                    },
                    error: function () {
                        $(".error-main-t").html("啊哦，您的网络不太给力~");
                        $(".errorAlert").css("display", "block");
                        $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                    }
                });
            } else {
                $(".error-main-t").html(data.result.message);
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        }.bind(this));*/

    },
    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    componentWillUpdate:function(){
        // PubSub.subscribe("jsonData", function (evName, jsonData) {
        //     var jsonDataNew = JSON.parse(jsonData);
        //     currentCouponId = jsonDataNew.currentCouponId;
        //     this.setState({
        //      youHuiState: jsonDataNew.youHuiState,
        //      currentCouponId: jsonDataNew.currentCouponId
        //      });
        // }.bind(this));
    },
    
    componentDidMount: function () {
        //填写手机号和微信号
        var confirmOrderPhone = getCookie('confirmOrderPhone');//之前输入的数据在cookie中保存1天；
        var confirmOrderWechat = getCookie('confirmOrderWechat');

        var userUserId = getCookie("userUserId");
        var userRoleId = getCookie("userRoleId");
        var phoneNum, wechatNum;//设置手机号与微信号
        //如果是同一账号，则默认保存之前输入的手机号和微信号
        if ((userUserId == getParamByUrl("userId")) && (userRoleId == getParamByUrl("roleId"))) {
            phoneNum = confirmOrderPhone;
            wechatNum = confirmOrderWechat
        } else {
            delCookie("confirmOrderPhone");
            delCookie("confirmOrderWechat");
            phoneNum = '';
            wechatNum = '';
        }
        this.setState({
            phoneNum: phoneNum,
            wechatNum: wechatNum
        })
        setCookie("userUserId", getParamByUrl("userId"), 1);//userId保存cookie
        setCookie("userRoleId", getParamByUrl("roleId"), 1);//roleId保存cookie
        PubSub.subscribe("jsonData", function (evName, jsonData) {
            var jsonDataNew = JSON.parse(jsonData);
            currentCouponId = jsonDataNew.currentCouponId;
            this.setState({
             youHuiState: jsonDataNew.youHuiState,
             currentCouponId: jsonDataNew.currentCouponId
             });
            //this.setState({ youHuiState: jsonDataNew.youHuiState });
            //this.setState({ currentCouponId: jsonDataNew.currentCouponId });

        }.bind(this));


        /*PubSub.subscribe("jsonData", function (evName, jsonData) {
            alert(5);
            var jsonDataNew = JSON.parse(jsonData);
            /!*this.setState({
                youHuiState: jsonDataNew.youHuiState,
                currentCouponId: jsonDataNew.currentCouponId
            });*!/
            alert(currentCouponId+"|"+jsonDataNew.youHuiState);
            this.setState({ youHuiState: jsonDataNew.youHuiState });
            this.setState({ currentCouponId: jsonDataNew.currentCouponId });
            currentCouponId = jsonDataNew.currentCouponId;
            alert(currentCouponId+"|"+jsonDataNew.youHuiState);

        }.bind(this));*/


    },
    //设置埋点（注意input用的是获取焦点focus事件）
    PhoneNumFoucs: function (event) {
        event.stopPropagation();
        setMaiDian(SQueRenDingDan.SCategory_SQueRenDingDan, SQueRenDingDan.SQueRenDingDan_ShouJiHao);//手机号埋点
    },
    WechatNumFoucs: function (event) {
        event.stopPropagation();
        setMaiDian(SQueRenDingDan.SCategory_SQueRenDingDan, SQueRenDingDan.SQueRenDingDan_WeiXinHao);//手机号埋点
    },
    // 输入手机号
    PhoneNumInput: function (event) {
        event.stopPropagation();
        var ele = event.currentTarget;
        var phoneNum = $(ele).val();
        var selectImg = '';//选择是否和手机号一致的图片切换
        if ($(ele).val().length > 0) {
            $(".check").css("display", "block");
        } else {
            $(".check").css("display", "none");
        }
        if (($("#phoneNum").val() == $("#wechatNum").val()) && ($("#phoneNum").val() != '') && ($("#wechatNum").val() != '')) {
            selectImg = 'image/confirmOrder/order-4.png';
        } else {
            selectImg = 'image/confirmOrder/order-3.png';
        }
        this.setState({
            phoneNum: $(ele).val(),
            selectImg: selectImg
        });
        setCookie('confirmOrderPhone', $(ele).val(), 1);//设置保存手机号的cookie

    },
    // 输入微信号
    WechatNumFoucs: function (event) {
        event.stopPropagation();

        var ele = event.currentTarget;
        var wechatNum = $(ele).val();
        var selectImg = '';//选择是否和手机号一致的图片切换

        if (($("#phoneNum").val() == $("#wechatNum").val()) && ($("#phoneNum").val() != '') && ($("#wechatNum").val() != '')) {
            selectImg = 'image/confirmOrder/order-4.png';
        } else {
            selectImg = 'image/confirmOrder/order-3.png';
        }
        this.setState({
            wechatNum: $(ele).val(),
            selectImg: selectImg
        });
        setCookie('confirmOrderWechat', $(ele).val(), 1);//设置保存微信号的cookie        
    },
    // 选择是否和手机号一样
    SelectStatus: function (event) {
        event.stopPropagation();
        var ele = event.currentTarget;
        var selectImg = '';//选择是否和手机号一致的图片切换 
        if (!PhoneBtn) {
            selectImg = 'image/confirmOrder/order-4.png';
            this.setState({
                phoneNum: $("#phoneNum").val(),
                wechatNum: $("#phoneNum").val(),
                selectImg: selectImg
            });
            PhoneBtn = true;
        } else {
            selectImg = 'image/confirmOrder/order-3.png';
            this.setState({
                wechatNum: '',
                selectImg: selectImg
            });
            PhoneBtn = false;
        }
        setMaiDian(SQueRenDingDan.SCategory_SQueRenDingDan, SQueRenDingDan.SQueRenDingDan_TongShouJiHao);//同手机号埋点

        setCookie('confirmOrderWechat', $('#wechatNum').val(), 1);//设置保存微信号的cookie
    },
    render: function () {
        console.log('主组件currentCouponId='+currentCouponId);
        var me = this;
        var beginTime_year = this.state.beginTime_year,//开营-年
            beginTime_month = this.state.beginTime_month,//开营-月
            beginTime_day = this.state.beginTime_day,//开营-日
            originPrice = this.state.originPrice,
            currentPrice = this.state.currentPrice,//实际价格
            infoImg = this.state.infoImg,//商品头图
            headImg = this.state.headImg,//头像
            userName = this.state.userName,//用户名
            onerror = this.state.onerror,
            goodsName = this.state.goodsName,//商品名
            couponInfo = this.state.couponInfo,
            goodsId = this.state.goodsId,//商品id
            phoneNum = this.state.phoneNum,//手机号
            wechatNum = this.state.wechatNum,//微信号
            selectImg = this.state.selectImg,//选择是否和手机号一致的图片切换
            goodReminder = this.state.goodReminder,
            youHuiState = this.state.youHuiState,
            currentCouponId = this.state.currentCouponId;
        console.log('youHuiState='+youHuiState);
        console.log('currentCouponId='+currentCouponId);
        var goods = {
            "goodsId": goodsId,
            "phoneNo": phoneNum,
            "weChat": wechatNum,
            "origPrice": originPrice
        };
        if (phoneNum.length > 0) {
            $(".check").css("display", "block");
        }
        if ((phoneNum == wechatNum) && (phoneNum != '') && (wechatNum != '')) {
            selectImg = 'image/confirmOrder/order-4.png';
        }
        var phoneNo = getParamByUrl('phoneNo');
        return (
            <section className="container">
                {/*
                 <aside className="row common info">
                 <div className="col-xs-12 col-sm-12 buy">
                 <div className="col-xs-12 col-sm-12">
                 <span>参营人：</span>
                 <img className="avatar" src={headImg} onerror={onerror} alt='' />
                 <span className="userName">{userName}</span>
                 </div>
                 </div>
                 </aside>
                */}
                <div className="row noAppTitle" style={{ display: 'none' }}>
                    <div className="col-xs-4 col-sm-4"></div>
                    <div className="col-xs-4 col-sm-4 middle"><img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/logoLeft.png" /></div>
                    <div className="col-xs-4 col-sm-4"></div>
                </div>
                <aside className="row infoInput phone">
                    <div className="row col-xs-12 col-sm-12">
                        <div className="col-xs-2 col-sm-2 logo"><img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/confirmOrder/phone.png" /></div>
                        <div className="col-xs-6 col-sm-6 tiaoZheng">
                            <input readOnly id="phoneNum" type="tel" placeholder="您的手机号" onFocus={this.PhoneNumFoucs} onInput={this.PhoneNumInput} value={(isChangePhone == true) ? publicData.phoneNum : getParamByUrl('phoneNo')} unselectable="on" />
                        </div>
                        <div className="changePhone" style={{ display: 'block' }}><span className="changeText" onClick={me.changePhone}>更换</span></div>
                    </div>
                </aside>

                {/*
                 <aside className="row common infoInput wechat">
                 <div className="row col-xs-12 col-sm-12">
                 <div className="col-xs-2 col-sm-2 logo"><img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/confirmOrder/wechat.png" /></div>
                 <div className="row col-xs-10 col-sm-10 sameHeight">
                 <div className="col-xs-8 col-sm-8 tiaoZheng">
                 <input id="wechatNum" type="text"  placeholder="您的微信号" onFocus={this.WechatNumFoucs} onInput={this.WechatNumFoucs} value={wechatNum} />
                 </div>
                 <div className="row col-xs-4 col-sm-4 right check">
                 <img id="samePhone" src={selectImg} onClick={this.SelectStatus} />&emsp;同手机号
                 </div>
                 </div>
                 </div>
                 </aside>
                */}

                <aside className="row common good">
                    <div className="row col-xs-12 col-sm-12 aboutInfo">
                        <div className="col-xs-3 col-sm-3 infoImg"><img src={goodReminder} /></div>
                        <div className="col-xs-9 col-sm-9 infoDesc">
                            <div className="goodsName">
                                <p>{goodsName}</p>
                            </div>
                            <p className="open beginTime">开营时间：<span className="year">{beginTime_year}</span>年<span className="month">{beginTime_month}</span>月<span className="day">{beginTime_day}</span>日</p>
                            <p className="price">¥<span className="new-price">{currentPrice}</span></p>
                        </div>
                    </div>
                </aside>
                <PriceCont youHuiState={youHuiState} currentCouponId={currentCouponId} couponInfo={couponInfo} currentPrice={currentPrice} goods={goods} />

                <Public_error />
                <ChooseCouponOut />

                <div className="alertsVerify" style={{ display: 'none' }}>
                    <div className="bg"></div>
                    <div className="row verifyBox" style={{ display: 'none' }}>
                        <img className="closeImg" onClick={me.closeVerifyFun} src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/close.png" alt="" />
                        <div className="title">请验证手机号码</div>
                        <div className="row col-xs-12 col-sm-12 infoInput">
                            <div className="col-xs-2 col-sm-2 logo"><img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/verify.png" /></div>
                            <div className="row col-xs-10 col-sm-10 sameHeight">
                                <div className="col-xs-12 col-sm-12 tiaoZheng">
                                    <input ref="code" className="ipt code" type="text" placeholder="4 位验证码" />
                                </div>
                                {/*<div className="row col-xs-5 col-sm-5 right check"><span className="checkText" onClick={me.getCode}>获取验证码</span></div>*/}
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 verifyBtn verifyBtn1" onClick={me.goToVerify}>验证</div>
                        <div className="col-xs-12 col-sm-12 warning" style={{ display: me.state.againGetCodeShow == false ? "block" : "none" }}>接收短信大约需要<span>{me.state.leftTime}</span>s</div>
                        <div className="col-xs-12 col-sm-12 warning" style={{ display: me.state.againGetCodeShow == false ? "none" : "block" }}>收不到验证码？<span className="againGetCode" onClick={me.liJiVerifyAgain}>重新获取</span></div>
                    </div>
                    <div className="row verifyBox" style={{ display: 'block' }}>
                        <img className="closeImg" onClick={me.closeVerifyFun} src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/close.png" alt="" />
                        <div className="title">请验证手机号码</div>
                        <div className="row col-xs-12 col-sm-12 infoInput">
                            <div className="col-xs-2 col-sm-2 logo"><img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/phone.png" /></div>
                            <div className="row col-xs-10 col-sm-10 sameHeight">
                                <div className="col-xs-12 col-sm-12 tiaoZheng">
                                    <input ref="phoneNum" className="ipt phone" type="text" placeholder="输入手机号" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 verifyBtn verifyBtn2" onClick={me.liJiVerify}>立即验证</div>
                        <div className="col-xs-12 col-sm-12 warning" style={{ visibility: 'hidden' }}>**</div>
                    </div>

                    <div id="TCaptcha"></div>

                </div>

            </section>
        )
    },

    //点击更换手机号
    changePhone: function () {

        $('.alertsVerify').show();
        $('.alertsVerify .verifyBox').hide().eq(1).show();
        $('.alertsVerify .verifyBox .warning').hide().eq(0).show();

        //禁止滚动条
        $('html, body').css('overflow', 'hidden').on("touchmove",function(ev){
            ev = ev || event;
            if(ev.preventDefault){
                ev.preventDefault();
            }else{
                return false;
            }
        });
    },

    //closeVerifyFun
    closeVerifyFun: function () {
        var me = this;

        //关闭获取验证码的定时器
        clearInterval(verifyTimer);
        clearInterval(verifyAgainTimer);
        me.setState({
            leftTime: 60
        });

        $('.alertsVerify').hide();

        $('html, body').css('overflow', 'auto').off("touchmove");

    },
    //点击立即验证
    liJiVerify: function () {
        var me = this;
        publicData.phoneNum = me.refs.phoneNum.value;
        if($.trim(me.refs.phoneNum.value) != ''){
            var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
            if (myreg.test(publicData.phoneNum)) {//如果手机号格式正确
                $.ajax({
                    type: "get",
                    url: ajaxLink + "/v1/api/captcha/getTencentUrlForSms",//正式使用
                    //url: "https://a.picooc.com:10000/v1/api/captcha/getTencentUrlForSms",//测试使用
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if (data.result.code == 200) {
                            console.log('图形验证码', data);
                            $("#graphJs").show().attr("src", data.resp.url);
                            var capTime = setInterval(function () {
                                if (capInit != undefined) {
                                    clearInterval(capTime);
                                    var capOption = { callback: cbfn, showHeader: true };
                                    capInit(document.getElementById("TCaptcha"), capOption);
                                    $('#TCaptcha').css({
                                        'display':'block',
                                        'overflow': 'hidden',
                                        'position':'fixed',
                                        'top':'0',
                                        'left':'0',
                                        'zIndex':'1000',
                                        'width':$(window).width(),
                                        'height':$(window).height()
                                    });
                                    $('#TCaptcha, #TCaptcha iframe').css('overflow', 'hidden');
                                    //回调函数：验证码页面关闭时回调
                                    function cbfn(retJson) {
                                        if (retJson.ret == 0) {
                                            $('#TCaptcha').hide();
                                            console.log('retJson', retJson);
                                            publicData.ticket = retJson.ticket;
                                            $('.alertsVerify .verifyBox').hide().eq(0).show();

                                            var aa = 59;
                                            verifyTimer = setInterval(function () {
                                                if (aa == 0) {
                                                    clearInterval(verifyTimer);
                                                    me.setState({
                                                        againGetCodeShow: true
                                                    });
                                                }
                                                me.setState({
                                                    leftTime: aa--
                                                });
                                            }, 1000);
                                            $.ajax({
                                                type: "get",
                                                url: ajaxLink + "/v1/api/campSell/sendSmsValidateCode?phoneNo=" + publicData.phoneNum + '&ticket=' + publicData.ticket,
                                                dataType: "json",
                                                success: function (data) {
                                                    console.log(data);

                                                }
                                            });
                                        }
                                        else {
                                            //用户关闭验证码页面，没有验证
                                            $('#TCaptcha').hide();
                                        }
                                    }
                                }
                            }, 100);

                        }
                    }
                });

            } else {
                $('.alerts').eq(5).html('手机号填写有误，请重新核对哦~').stop(true).fadeIn(200).delay(2000).fadeOut(200);
            }
        }
    },

    liJiVerifyAgain: function () {
        var me = this;
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
        if (myreg.test(publicData.phoneNum)) {//如果手机号格式正确
            $.ajax({
                type: "get",
                url: ajaxLink + "/v1/api/captcha/getTencentUrlForSms",//正式使用
                //url: "https://a.picooc.com:10000/v1/api/captcha/getTencentUrlForSms",//测试使用
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (data.result.code == 200) {
                        console.log('图形验证码', data);
                        $("#graphJs").show().attr("src", data.resp.url);
                        var capTime = setInterval(function () {
                            if (capInit != undefined) {
                                clearInterval(capTime);
                                var capOption = { callback: cbfn, showHeader: true };
                                capInit(document.getElementById("TCaptcha"), capOption);
                                $('#TCaptcha').css({
                                    'display':'block',
                                    'overflow': 'hidden',
                                    'position':'fixed',
                                    'top':'0',
                                    'left':'0',
                                    'zIndex':'1000',
                                    'width':$(window).width(),
                                    'height':$(window).height()
                                });
                                $('#TCaptcha, #TCaptcha iframe').css('overflow', 'hidden');
                                //回调函数：验证码页面关闭时回调
                                function cbfn(retJson) {
                                    if (retJson.ret == 0) {
                                        $('#TCaptcha').hide();
                                        console.log('retJson', retJson);
                                        publicData.ticket = retJson.ticket;
                                        $('.alertsVerify .verifyBox').hide().eq(0).show();
                                        me.setState({
                                            leftTime: 60,
                                            againGetCodeShow: false
                                        });

                                        var aa = 59;
                                        verifyAgainTimer = setInterval(function () {
                                            if (aa == 0) {
                                                clearInterval(verifyAgainTimer);
                                                me.setState({
                                                    againGetCodeShow: true
                                                });
                                            }
                                            me.setState({
                                                leftTime: aa--
                                            });
                                        }, 1000);
                                        $.ajax({
                                            type: "get",
                                            //url: "http://172.17.1.233:8080/v1/api/campSell/sendSmsValidateCode?phoneNo="+publicData.phoneNum +'&ticket='+ticket,
                                            url: ajaxLink + "/v1/api/campSell/sendSmsValidateCode?phoneNo=" + publicData.phoneNum + '&ticket=' + publicData.ticket,
                                            dataType: "json",
                                            success: function (data) {
                                                console.log(data);

                                            }
                                        });
                                    }
                                    else {
                                        //用户关闭验证码页面，没有验证
                                        $('#TCaptcha').hide();
                                    }
                                }
                            }
                        }, 100);

                    }
                }
            });

        } else {
            $('.alerts').eq(5).html('手机号填写有误，请重新核对哦~').stop(true).fadeIn(200).delay(2000).fadeOut(200);
        }
    },

    //点击验证
    goToVerify: function () {
        var me = this;
        var data = me.props.alertBox;
        if($.trim(me.refs.code.value) != ''){
            console.log(ajaxLink + '/v1/api/campSell/verifyCode?phoneNo=' + publicData.phoneNum + '&code=' + me.refs.code.value);
            $.ajax({
                type: 'get',
                //url:'http://172.17.1.233:8080/v1/api/campSell/verifyCode?phoneNo='+publicData.phoneNum+'&code='+me.refs.code.value,
                url: ajaxLink + '/v1/api/campSell/verifyCode?phoneNo=' + publicData.phoneNum + '&code=' + me.refs.code.value,

                success: function (data) {
                    console.log(data);
                    if (data.code == 200) {
                        isChangePhone = true;
                        $('.alertsVerify').hide();
                        submitPhone = publicData.phoneNum;
                        console.log('appOutPhone='+publicData.phoneNum);
                        setCookie('appOutPhone', publicData.phoneNum, 7);
                        console.log('更新appOutPhone='+publicData.phoneNum);

                        //$('#phoneNum').val(publicData.phoneNum);//更新显示手机号

                        $('html, body').css('overflow', 'auto').off("touchmove");


                        removeParamByUrl('phoneNo');
                        var url = window.location.search.substring(1);
                        var arr = url.split("&");
                        var result = [];
                        var str = '?';
                        for (var i = 0; i < arr.length; i++) {
                            var param = arr[i].split("=");
                            if ('phoneNo' != param[0]) {
                                str += '&' + param[0] + '=' + param[1];
                                //return  param[1];
                            }
                        }
                        window.location.href = 'confirmOrderOut.html' + str + '&phoneNo=' + publicData.phoneNum;


                    } else {
                        isChangePhone = false;
                        $('.alerts').eq(5).html('验证码输入错误').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    }

});
var PriceCont = React.createClass({
    getInitialState: function () {
        return {
            youhuiData2: {},
            goodsInfos: {}
        }
    },
    componentDidMount: function () {
        var me = this;
        var heightBody = $(window).height();
        var heightJine = $('.empty').offset().top;
        $('body').css('height', heightBody + 'px');
        $('.pay').show();
        var heightPay = $('.pay').height();
        if (heightJine + heightPay > heightBody) {
            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();
                $('.empty').css('marginBottom', 50 + 'px');
                $('.pay').css('bottom', -scrollTop + 'px');
            });
        }
        PubSub.subscribe("youhuiData", function (evName, youhuiData2) {
            this.setState({ youhuiData2: youhuiData2 });
        }.bind(this));

        var goodsInfos = JSON.parse(localStorage.getItem('goodsInfos'));
        // var goodsInfos = getCookie('goodsInfos');
        // 若有微信支付返回的code 则直接调起公众号（微信内）支付
        if (getParamByUrl('code') != 'false') {
            //alert('goWechatPay:' + goodsInfos.linkId);
            me.goWechatPay(goodsInfos);
        }

    },
    //设置一个定时器，定时获取cookie值
    componentWillUpdate: function () {
        //谭超修改 20170831
        /*var youhuiData2 = this.state.youhuiData2;
        var currentPrice = this.props.currentPrice,
            youhuiText = '',
            youHuiMoney = '',
            realyPay = '',
            currentPriceNew = '';
        youHuiState = this.props.youHuiState;

        currentCouponId = this.props.currentCouponId;
        if (youHuiState != '') {
            if (youHuiState == undefined) {
                youhuiText = '不使用优惠券';
                youHuiMoney = '-¥0';
                realyPay = '¥' + currentPrice;
            } else {
                youhuiText = '¥' + youHuiState;
                youHuiMoney = '-¥' + youHuiState;
                if (currentPrice != 0) {
                    currentPriceNew = currentPrice - youHuiState;
                    currentPriceNew = Math.round(currentPriceNew * 100) / 100; //四舍五入，并保留两位小数；
                    realyPay = '¥' + currentPriceNew;
                }
            }
            youhuiData2.youhuiText = youhuiText;
            youhuiData2.youHuiMoney = youHuiMoney;
            youhuiData2.realyPay = realyPay;
            youhuiData2.currentPriceNew = currentPriceNew;
            //PubSub.publish('youhuiData', youhuiData2);
        }*/

    },
    // 选择优惠券
    SelectYhuiClick: function (event) {
        event.stopPropagation();
        setMaiDian(SQueRenDingDan.SCategory_SQueRenDingDan, SQueRenDingDan.SQueRenDingDan_XuanZeYouHuiQuan);//选择优惠券埋点
        delCookie('youHuiState');
        $("#couponBox").css("min-height", $(window).height());
        $("#couponBox").css("display", "block");

    },
    // 提交订单
    SubmitOrder: function (event) {
        var me = this;
        console.log(me);
        if (changePriceSubmit == true) {//如果价格发生变化，用户点击弹窗中的取消/提交按钮之后，下次点击确认订单，就直接真正提交订单了；
            me.realSubmitFun();
        } else {
            var urlOrder = ajaxLink + "/v1/api/campSell/confirmOrderOut" + window.location.search;//有关优惠券的信息
            $.ajax({
                type: "get",
                url: urlOrder,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (data.code == 200) {
                        endHasLimit = data.resp.goodsInfo.hasLimit;
                        if (initHasLimit == endHasLimit) {
                            me.realSubmitFun();
                        } else if ((initHasLimit == true) || (endHasLimit == false)) {//限时特价转为原价
                            PubSub.publish('currentPrice', data.resp.goodsInfo.curentPrice);
                            $('#nowPrice').html('您选择的商品价格发生了变化，当前价格为：' + data.resp.goodsInfo.curentPrice + '元，是否继续提交订单？');
                            $('.payOrNotBox').show();
                        }
                        else if ((initHasLimit == false) || (endHasLimit == true)) {//原价转为限时特价
                            PubSub.publish('currentPrice', data.resp.goodsInfo.especialPrice);
                            $('#nowPrice').html('您选择的商品价格发生了变化，当前价格为：' + data.resp.goodsInfo.especialPrice + '元，是否继续提交订单？');
                            $('.payOrNotBox').show();
                        }
                    } else {
                        $(".error-main-t").html(data.result.message);
                        $(".errorAlert").css("display", "block");
                        $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                    }
                },
                error: function () {
                    $(".error-main-t").html("啊哦，您的网络不太给力~");
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            });
        }



    },

    realSubmitFun: function () {
        var me = this;
        console.log('submit', me);
        event.stopPropagation();
        setMaiDian(SQueRenDingDan.SCategory_SQueRenDingDan, SQueRenDingDan.SQueRenDingDan_TiJiaoDingDan);//提交订单埋点
        var goods = this.props.goods;
        // clearInterval(timer);
        var phoneNum = goods.phoneNo;
        var goodsId = goods.goodsId;
        var wechatNum = goods.weChat;
        var originPrice = goods.origPrice;
        var currentPrice = this.props.currentPrice;
        var currentPriceNew = this.state.youhuiData2.currentPriceNew;
        var couponPrice = this.state.youhuiData2.youHuiMoney.substring(2);
        var firstCouponId = this.state.youhuiData2.firstCouponId;
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
        var urlStock = ajaxLink + '/v1/api/campSell/getClassStockOut' + window.location.search;//获取商品库存状态
        console.log(urlStock);
        $.ajax({
            type: "get",
            url: urlStock,
            dataType: "json",
            success: function (data) {
                console.log(3, data);
                if (data.code == 200) {
                    console.log('data.resp=' + data.resp);
                    if (data.resp == 1) {//售罄但有未支付的订单
                        $('.alerts').eq(0).stop(true).fadeIn(200).delay(2000).fadeOut(200);//已拍完，但还有人未付款
                    } else if (data.resp == 2) {//售罄且都支付完成
                        $('.alerts').eq(1).stop(true).fadeIn(200).delay(2000).fadeOut(200);//手慢了，名额被抢光啦～
                    }
                    else if (data.resp == 5) {// 不能同时购买多份  //3：表示支付成功； 5：提交订单但未支付
                        $('.alerts').eq(5).html('您在当前所选时段内已有订单啦，处理后再来试试吧～').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                    } /*else if (data.resp == 7) {//data.resp == 7 相同手机号码不能在同一开营周期内购买多个燃脂营；
                        $('.alerts').eq(5).html('您在当前所选时间内已经参营啦，换个时间吧～').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                    } else if (data.resp == 8) {//data.resp == 8 还有未支付的订单，不能买时间冲突的其他期
                        $('.alerts').eq(5).html('您在当前所选时段内已有订单啦，处理后再来试试吧～').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                    }*/ else if ((data.resp == 3) || (data.resp == 4) || (data.resp == 7) || (data.resp == 8)) {// 有库存
                        //else{// 有库存
                        if ($(".submit span").attr("data-clicked") == "0") {
                            //执行点击
                            $(".submit span").attr("data-clicked", "1");//避免多次点击；
                            var trafficSource = '';
                            if (getParamByUrl('refer') == 1) {//banner
                                trafficSource = 'appBanner'
                            } else if (getParamByUrl('refer') == 2) {//push推送
                                trafficSource = 'push'
                            } else if (getParamByUrl('refer') == 3) {//开屏
                                trafficSource = 'kaiPing'
                            } else if (getParamByUrl('refer') == 4) {//从订单详情页进入
                                trafficSource = 'orderDetail'
                            } else if (getParamByUrl('refer') == 6) {//从'我的'售卖入口进入
                                trafficSource = 'woDe'
                            }
                            else if (getParamByUrl('refer') == 5) {
                                trafficSource = 'wenzhang'
                            }
                            else { //其他
                                trafficSource = 'other'
                            }
                            var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
                            // 判断当前页面是否在微信内，若在使用公众号（微信内）支付方式，若不在使用微信的h5支付方式
                            // if (ua.match(/MicroMessenger/i) == "micromessenger") {
                            //     var sourceType = "公众号购买"
                            // }
                            // else {
                            //     var sourceType = "H5购买"
                            // }
                            var sourceType;
                            if (isOutApp()) {
                                // alert('qq:'+ua.match(/\sQQ/i))
                                // if (browser.versions.mobile) {
                                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                                    sourceType = "微信";
                                }
                                else if (ua.match(/WeiBo/i) == "weibo") {
                                    sourceType = "微博";
                                }
                                else if (ua.match(/\sQQ/i) == " qq") {
                                    // alert('zhehsiqq');
                                    sourceType = 'QQ';
                                }
                                else {
                                    sourceType = '浏览器';
                                }
                            } else {
                                sourceType = "燃脂营APP";
                            }

                            // return core;
                            // alert('QQ'
                            var goodsInfo = {
                                "coachId": parseInt(getParamByUrl('coachId')),
                                "linkId": parseInt(getParamByUrl('linkId')),
                                "goodsId": parseInt(getParamByUrl('classId')),
                                "userId": 0,//app外全部为0
                                "phoneNo": submitPhone,
                                "origPrice": originPrice,
                                "currentPrice": couponPrice > 0 ? currentPriceNew : currentPrice,
                                "couponPrice": parseInt(couponPrice),
                                "isCoupon": couponPrice > 0 ? 1 : 0,
                                "couponId": couponPrice > 0 ? ((youHuiState == '') ? firstCouponId : currentCouponId) : null,
                                "sourceType": sourceType,
                                "trafficSource": trafficSource, //流量来源，开屏/push/短信/banner/其他
                                "isOwnPicooc": parseInt(getParamByUrl('isOwnPicooc')) //是否有秤
                            };
                            // alert('goodsInfos.linkId:' + goodsInfo.linkId);
                            // alert(JSON.stringify(goodsInfo));
                            // console.log('goodsInfo ', goodsInfo);
                            me.setState({
                                goodsInfos: goodsInfo
                            });
                            localStorage.setItem('goodsInfos', JSON.stringify(goodsInfo));
                            // setCookie('goodsInfos', JSON.stringify(goodsInfo), 1);
                            // alert(ua);
                            // alert(ua.match(/MicroMessenger/i));
                            // 判断当前页面是否在微信内，若在使用公众号（微信内）支付方式，若不在使用微信的h5支付方式
                            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                                var code = getParamByUrl('code');
                                // 判断是否存在微信code，若没有使用微信api回调当前页面，返回code
                                if (getParamByUrl('code') == 'false') {

                                    removeParamByUrl('phoneNo');
                                    var url = window.location.search.substring(1);
                                    var arr = url.split("&");
                                    var result = [];
                                    var str = '?';
                                    for (var i = 0; i < arr.length; i++) {
                                        var param = arr[i].split("=");
                                        if ('phoneNo' != param[0]) {
                                            str += '&' + param[0] + '=' + param[1];
                                            //return  param[1];
                                        }
                                    }
                                    // alert(submitPhone);
                                    //var phoneNo = getCookie('appOutPhone');
                                    var fromurl = window.location.protocol + "//" + window.location.host + window.location.pathname + str + '&phoneNo=' + submitPhone;
                                    // var fromurl = "https://a.picooc.com"+window.location.pathname+str+'&phoneNo='+phoneNo;
                                    // alert(fromurl);
                                    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa291214cb3348ead&redirect_uri=' + encodeURIComponent(fromurl) + '&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';
                                    location.href = url;
                                }

                            }
                            else {
                                me.goH5WechatPay(goodsInfo);
                            }
                        }
                    }
                    else {
                        //不再执行点击操作
                    }
                } else {
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            },
            error: function () {
                $(".error-main-t").html("啊哦，您的网络不太给力~");
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        });
    },

    goWechatPay: function (goodsInfos) {
        // alert('微信内')
        // alert(JSON.stringify(goodsInfos));
        $.ajax({
            url: ajaxLink + '/v1/api/campOrder/generatePublicOrder' + location.search,
            type: 'post',
            data: JSON.stringify(goodsInfos),
            dataType: "json",
            contentType: 'application/json',
            success: function (data) {
                if (data.code == 200) {
                    var orderId = data.resp;
                    removeParamByUrl('phoneNo');
                    var url = window.location.search.substring(1);
                    var arr = url.split("&");
                    var result = [];
                    var str = '?';
                    for (var i = 0; i < arr.length; i++) {
                        var param = arr[i].split("=");
                        if ('phoneNo' != param[0]) {
                            str += '&' + param[0] + '=' + param[1];
                            //return  param[1];
                        }
                    }
                    // submitPhone = publicData.phoneNum;
                    // var phoneNo = getCookie('appOutPhone');

                    window.location.href = "payment.html" + str + '&phoneNo=' + submitPhone + '&orderId=' + orderId + '&fromGo=1';
                    //window.location.href ="payment.html"+window.location.search+ '&orderId='+orderId;
                } else {
                    $(".error-main-t").html(data.reap.result);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
                }
            },
            error: function () {
                $(".error-main-t").html('网络错误');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }
        })
    },

    goH5WechatPay: function (goodsInfos) { //微信外使用微信内的h5支付方式

        // alert('微信外');
        var goodsInfos = goodsInfos;
        var url = ajaxLink + '/v1/api/campOrder/generateH5Order' + window.location.search;//向后台提交数据
        // alert(url);
        $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(goodsInfos),
            success: function (data) {
                console.log('goH5WechatPay', data);
                if (data.code == 200) {
                    // 请求成功，回调微信返回的支付页面，去支付
                    var orderUrl = data.resp.orderUrl;
                    var orderId = data.resp.orderId;

                    removeParamByUrl('phoneNo');
                    var url = window.location.search.substring(1);
                    var arr = url.split("&");
                    var result = [];
                    var str = '?';
                    for (var i = 0; i < arr.length; i++) {
                        var param = arr[i].split("=");
                        if ('phoneNo' != param[0]) {
                            str += '&' + param[0] + '=' + param[1];
                            //return  param[1];
                        }
                    }
                    // var phoneNo = getCookie('appOutPhone');
                    // alert("payment.html" + str + '&phoneNo=' + submitPhone + '&orderUrl=' + orderUrl + '&orderId=' + orderId + '&fromGo=1');
                    window.location.href = "payment.html" + str + '&phoneNo=' + submitPhone + '&orderUrl=' + orderUrl + '&orderId=' + orderId + '&fromGo=1';
                    //window.location.href = "payment.html" + window.location.search + '&orderUrl=' + orderUrl + '&orderId=' + orderId;

                    //window.location.href = decodeURIComponent(orderUrl);
                    // window.location.href = "payment.html" + window.location.search + '&orderUrl=' + orderUrl + '&orderId=' + orderId;

                }
                else {
                    $(".error-main-t").html(data.resp.result);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
                }
            },
            error: function () {
                $(".error-main-t").html('网络错误');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }
        });
    },
    render: function () {
        var me = this;
        console.log('realy', this);
        var youhuiData2 = this.state.youhuiData2;
        var currentPrice = this.props.currentPrice,
            youhuiText = '',
            youHuiMoney = '',
            realyPay = '',
            currentPriceNew = '';
            youHuiState = this.props.youHuiState;

        currentCouponId = this.props.currentCouponId;
        if (youHuiState != '') {
            if (youHuiState == undefined) {
                youhuiText = '不使用优惠券';
                youHuiMoney = '-¥0';
                realyPay = '¥' + currentPrice;
            } else {
                youhuiText = '¥' + youHuiState;
                youHuiMoney = '-¥' + youHuiState;
                if (currentPrice != 0) {
                    currentPriceNew = currentPrice - youHuiState;
                    currentPriceNew = Math.round(currentPriceNew * 100) / 100; //四舍五入，并保留两位小数；
                    realyPay = '¥' + currentPriceNew;
                }
            }
            youhuiData2.youhuiText = youhuiText;
            youhuiData2.youHuiMoney = youHuiMoney;
            youhuiData2.realyPay = realyPay;
            youhuiData2.currentPriceNew = currentPriceNew;
            //PubSub.publish('youhuiData', youhuiData2);
        }
        var currentPrice = this.props.currentPrice,
            youhuiText = youhuiData2.youhuiText,
            youHuiMoney = youhuiData2.youHuiMoney,
            realyPay = youhuiData2.realyPay;
            //谭超修改20170831
       /* var currentPrice = this.props.currentPrice,
            youhuiText = this.state.youhuiData2.youhuiText,
            youHuiMoney = this.state.youhuiData2.youHuiMoney,
            realyPay = this.state.youhuiData2.realyPay;*/
        return (
            <div>
                <aside className="row common sameHeight youhui" onClick={this.SelectYhuiClick}>
                    <div className="col-xs-12 col-sm-12">
                        <div className="col-xs-6 col-sm-6 status"><img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/confirmOrder/youhui.png" />&emsp;<span className="aboutYouhui">优惠券</span></div>
                        <div className="col-xs-6 col-sm-6 right money">
                            <span>
                                {youhuiText}
                            </span>&emsp;<img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/confirmOrder/more.png" /></div>
                    </div>
                </aside>
                <aside className="row common jine">
                    <div className="col-xs-12 col-sm-12 first">
                        <div className="col-xs-6 col-sm-6 status">商品金额</div>
                        <div className="col-xs-6 col-sm-6 right money">¥<span className="new-price">{currentPrice}</span></div>
                    </div>
                    <div className="col-xs-12 col-sm-12">
                        <div className="col-xs-6 col-sm-6 status">优惠金额</div>
                        <div className="col-xs-6 col-sm-6 right money youHuiMoney">{youHuiMoney}</div>
                    </div>
                </aside>
                <aside className="empty">

                </aside>
                <aside className="row sameHeight pay" style={{ "display": "none" }}>
                    <div className="col-xs-6 col-sm-6 realyPay">实付款: &nbsp;<span className="money">{realyPay}</span></div>
                    <div className="col-xs-6 col-sm-6 submit right"><span data-clicked="0" onClick={this.SubmitOrder}>提交订单</span></div>
                </aside>
                <aside className="alertBox">
                    <div className="alerts" style={{ "display": "none" }}>
                        已拍完，但还有人未付款，待会儿再来看看吧～
                    </div>
                    <div className="alerts" style={{ "display": "none" }}>
                        手慢了，名额被抢光啦～
                    </div>
                    <div className="alerts" style={{ "display": "none" }}>
                        同一账号只能购买一次哦!请核对参营人员信息～
                    </div>
                    <div className="alerts" style={{ "display": "none" }}>
                        请填写参营人员手机号码～
                    </div>
                    <div className="alerts" style={{ "display": "none" }}>
                        手机号填写有误，请重新核对哦～
                    </div>
                    <div className="alerts" style={{ "display": "none" }}>

                    </div>
                </aside>
                <aside className="payOrNotBox" style={{ display: 'none' }}>
                    <div className="payOrNot" id="nowPrice">

                    </div>
                    <div className="btns row">
                        <div className="col-xs-6 col-sm-6 left" onClick={me.cancelPay}>取消</div>
                        <div className="col-xs-6 col-sm-6 right" onClick={me.confirmPay}>提交</div>
                    </div>
                </aside>



            </div>
        )
    },


    //取消支付
    cancelPay: function () {
        changePriceSubmit = true;
        $('.payOrNotBox').hide();
    },

    //确认支付
    confirmPay: function () {
        var me = this;
        changePriceSubmit = true;
        $('.payOrNotBox').hide();
        me.realSubmitFun();
    }
});

ReactDOM.render(<ConfirmOrder />, document.getElementById('order_box'));

//从支付页面返回到商品介绍页
function gobackToGood() {
    var getPageInfo = function () {
        var data = {
            backNum: 0,//默认为1，
            closeWebview: 1//默认为0
        };
        return JSON.stringify(data);
    };
    appFc.deleteHistory(getPageInfo());
}
window.gobackToGood = gobackToGood;