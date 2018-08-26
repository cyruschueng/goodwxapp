webpackJsonp([13,36],{

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _React$createClass;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_error = __webpack_require__(3);
var ChooseCouponNew = __webpack_require__(62);
var SQueRenDingDan = {
    SCategory_SQueRenDingDan: 5080200,
    SQueRenDingDan_ShouJiHao: 5080201, //手机号
    SQueRenDingDan_WeiXinHao: 5080202, //微信号
    SQueRenDingDan_TongShouJiHao: 5080203, //同手机号
    SQueRenDingDan_XuanZeYouHuiQuan: 5080204, //选择优惠券
    SQueRenDingDan_TiJiaoDingDan: 5080205 //提交订单
};
var PhoneBtn = false;
var youHuiState = '';
var timer = null; //定时获取优惠券信息
var currentCouponId = '';

var initHasLimit; //刚进入页面的时候判断时候是否限时特价
var endHasLimit; //点击提交订单的时候判断时候是否限时特价

var changePriceSubmit = false;
// alert("d:"+localStorage.getItem("bb"));

//localStorage.removeItem("youHuiState");
var ConfirmOrder = React.createClass((_React$createClass = {
    displayName: "ConfirmOrder",


    getInitialState: function getInitialState() {
        var me = this;

        //定义‘确认订单’按钮的位置；
        delCookie('youHuiState');
        //localStorage.removeItem("youHuiState");

        //控制title和left
        clientFunA();

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
            goodsId: '', //商品ID
            goodReminder: '', //商品头图
            sex: ''
        };
    },
    componentWillMount: function componentWillMount() {
        var me = this;
        var urlOrder = ajaxLink + "/v1/api/campSell/confirmOrder" + window.location.search; //有关优惠券的信息
        console.log(urlOrder);
        $.ajax({
            type: "get",
            url: urlOrder,
            dataType: "json",
            success: function success(data) {
                console.log(urlOrder);
                if (data.code == 200) {

                    $('body').show(); //ajax请求成功显示body
                    $('.good .infoDesc .goodsName').ellipsis({ //超出2行加省略号
                        english: false,
                        lineNum: 2
                    });
                    initHasLimit = data.resp.goodsInfo.hasLimit;
                    var currentPrice = data.resp.goodsInfo.hasLimit == true ? data.resp.goodsInfo.especialPrice : data.resp.goodsInfo.curentPrice; //实付价格
                    var beginTimeArr = data.resp.goodsInfo.beginTime.split('-'); //开营时间

                    me.setState({
                        beginTime_year: beginTimeArr[0], //开营时间:年
                        beginTime_month: beginTimeArr[1], //开营时间:月
                        beginTime_day: beginTimeArr[2], //开营时间:日
                        originPrice: data.resp.goodsInfo.originPrice, //应付价格
                        //currentPrice: data.resp.goodsInfo.curentPrice,//实付价格
                        currentPrice: data.resp.goodsInfo.hasLimit == true ? data.resp.goodsInfo.especialPrice : data.resp.goodsInfo.curentPrice, //实付价格
                        infoImg: data.resp.roleInfo.headPortraitUrl, //商品头图
                        goodsName: data.resp.goodsInfo.gradeName, //商品名称
                        goodsId: data.resp.goodsInfo.id, //商品id
                        goodReminder: data.resp.goodsInfo.goodReminder, //商品头图
                        sex: data.resp.roleInfo.sex
                    });

                    PubSub.subscribe("currentPrice", function (evName, currentPrice) {
                        me.setState({ currentPrice: currentPrice });
                        var currentPriceNew = '';
                        var firstCouponId = data.resp.couponInfo.length > 0 ? data.resp.couponInfo[0].id : null;
                        console.log(firstCouponId);
                        //用户头像
                        var headImg = '',
                            onerror = '';
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
                        me.setState({
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
                            if (data.resp.couponInfo[0].expire == true || data.resp.couponInfo[0].isUse == 1) {
                                //过期 或 已使用
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
                        };
                        console.log(youhuiData);
                        PubSub.publish('youhuiData', youhuiData);
                    });

                    var currentPriceNew = '';
                    var firstCouponId = data.resp.couponInfo.length > 0 ? data.resp.couponInfo[0].id : null;
                    console.log(firstCouponId);
                    //用户头像
                    var headImg = '',
                        onerror = '';
                    if (data.resp.roleInfo.sex == 0) {
                        headImg = data.resp.roleInfo.headPortraitUrl;
                        //onerror = 'this.src=' + arrHeadImg[0];
                        onerror = arrHeadImg[0];
                    } else if (data.resp.roleInfo.sex == 1) {
                        headImg = data.resp.roleInfo.headPortraitUrl;
                        //onerror = 'this.src=' + arrHeadImg[1];
                        onerror = arrHeadImg[1];
                    }
                    var userName = data.resp.roleInfo.name;
                    if (userName.length > 5) {
                        userName = userName.substring(0, 5) + '...';
                    }
                    me.setState({
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
                        if (data.resp.couponInfo[0].expire == true || data.resp.couponInfo[0].isUse == 1) {
                            //过期 或 已使用
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
                    };
                    console.log(youhuiData);
                    PubSub.publish('youhuiData', youhuiData);
                } else {
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            },
            error: function error() {
                $(".error-main-t").html("啊哦，您的网络不太给力~");
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        });
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
                                infoImg: data.resp.roleInfo.headPortraitUrl,//商品头图
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
    componentWillUnmount: function componentWillUnmount() {
        this.serverRequest.abort();
    },
    componentDidMount: function componentDidMount() {
        //填写手机号和微信号
        var confirmOrderPhone = getCookie('confirmOrderPhone'); //之前输入的数据在cookie中保存1天；
        var confirmOrderWechat = getCookie('confirmOrderWechat');

        var userUserId = getCookie("userUserId");
        var userRoleId = getCookie("userRoleId");
        var phoneNum, wechatNum; //设置手机号与微信号
        //如果是同一账号，则默认保存之前输入的手机号和微信号
        if (userUserId == getParamByUrl("userId") && userRoleId == getParamByUrl("roleId")) {
            phoneNum = confirmOrderPhone;
            wechatNum = confirmOrderWechat;
        } else {
            delCookie("confirmOrderPhone");
            delCookie("confirmOrderWechat");
            phoneNum = '';
            wechatNum = '';
        }
        this.setState({
            phoneNum: phoneNum,
            wechatNum: wechatNum
        });
        setCookie("userUserId", getParamByUrl("userId"), 1); //userId保存cookie
        setCookie("userRoleId", getParamByUrl("roleId"), 1); //roleId保存cookie
    },
    //设置埋点（注意input用的是获取焦点focus事件）
    PhoneNumFoucs: function PhoneNumFoucs(event) {
        event.stopPropagation();
        setMaiDian(SQueRenDingDan.SCategory_SQueRenDingDan, SQueRenDingDan.SQueRenDingDan_ShouJiHao); //手机号埋点
    },
    WechatNumFoucs: function WechatNumFoucs(event) {
        event.stopPropagation();
        setMaiDian(SQueRenDingDan.SCategory_SQueRenDingDan, SQueRenDingDan.SQueRenDingDan_WeiXinHao); //手机号埋点
    },
    // 输入手机号
    PhoneNumInput: function PhoneNumInput(event) {
        event.stopPropagation();
        var ele = event.currentTarget;
        var phoneNum = $(ele).val();
        var selectImg = ''; //选择是否和手机号一致的图片切换
        if ($(ele).val().length > 0) {
            $(".check").css("display", "block");
        } else {
            $(".check").css("display", "none");
        }
        if ($("#phoneNum").val() == $("#wechatNum").val() && $("#phoneNum").val() != '' && $("#wechatNum").val() != '') {
            selectImg = 'image/confirmOrder/order-4.png';
        } else {
            selectImg = 'image/confirmOrder/order-3.png';
        }
        this.setState({
            phoneNum: $(ele).val(),
            selectImg: selectImg
        });
        setCookie('confirmOrderPhone', $(ele).val(), 1); //设置保存手机号的cookie
    }
}, _defineProperty(_React$createClass, "WechatNumFoucs", function WechatNumFoucs(event) {
    event.stopPropagation();

    var ele = event.currentTarget;
    var wechatNum = $(ele).val();
    var selectImg = ''; //选择是否和手机号一致的图片切换

    if ($("#phoneNum").val() == $("#wechatNum").val() && $("#phoneNum").val() != '' && $("#wechatNum").val() != '') {
        selectImg = 'image/confirmOrder/order-4.png';
    } else {
        selectImg = 'image/confirmOrder/order-3.png';
    }
    this.setState({
        wechatNum: $(ele).val(),
        selectImg: selectImg
    });
    setCookie('confirmOrderWechat', $(ele).val(), 1); //设置保存微信号的cookie        
}), _defineProperty(_React$createClass, "SelectStatus", function SelectStatus(event) {
    event.stopPropagation();
    var ele = event.currentTarget;
    var selectImg = ''; //选择是否和手机号一致的图片切换 
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
    setMaiDian(SQueRenDingDan.SCategory_SQueRenDingDan, SQueRenDingDan.SQueRenDingDan_TongShouJiHao); //同手机号埋点

    setCookie('confirmOrderWechat', $('#wechatNum').val(), 1); //设置保存微信号的cookie
}), _defineProperty(_React$createClass, "render", function render() {
    console.log(this);

    var beginTime_year = this.state.beginTime_year,
        //开营-年
    beginTime_month = this.state.beginTime_month,
        //开营-月
    beginTime_day = this.state.beginTime_day,
        //开营-日
    originPrice = this.state.originPrice,
        currentPrice = this.state.currentPrice,
        //实际价格
    infoImg = this.state.infoImg,
        //商品头图
    headImg = this.state.headImg,
        //头像
    userName = this.state.userName,
        //用户名
    onerror = this.state.onerror,
        goodsName = this.state.goodsName,
        //商品名
    couponInfo = this.state.couponInfo,
        goodsId = this.state.goodsId,
        //商品id
    phoneNum = this.state.phoneNum,
        //手机号
    wechatNum = this.state.wechatNum,
        //微信号
    selectImg = this.state.selectImg,
        //选择是否和手机号一致的图片切换
    goodReminder = this.state.goodReminder,
        //商品头图
    sex = this.state.sex;
    var goods = {
        "goodsId": goodsId,
        "phoneNo": phoneNum,
        "weChat": wechatNum,
        "origPrice": originPrice
    };
    if (phoneNum.length > 0) {
        $(".check").css("display", "block");
    }
    if (phoneNum == wechatNum && phoneNum != '' && wechatNum != '') {
        selectImg = 'image/confirmOrder/order-4.png';
    }
    return React.createElement(
        "div",
        null,
        React.createElement(
            "section",
            { className: "container", id: "confirmOrderNew" },
            React.createElement(
                "aside",
                { className: "row common info" },
                React.createElement(
                    "div",
                    { className: "col-xs-12 col-sm-12 buy" },
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12" },
                        React.createElement(
                            "span",
                            null,
                            "\u53C2\u8425\u4EBA\uFF1A"
                        ),
                        React.createElement("img", { className: "avatar", src: headImg, onError: imgError.bind(this, sex), alt: "" }),
                        React.createElement(
                            "span",
                            { className: "userName" },
                            userName
                        )
                    )
                )
            ),
            React.createElement(
                "aside",
                { className: "row common infoInput phone" },
                React.createElement(
                    "div",
                    { className: "row col-xs-12 col-sm-12" },
                    React.createElement(
                        "div",
                        { className: "col-xs-2 col-sm-2 logo" },
                        React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/confirmOrder/phone.png" })
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-10 col-sm-10 tiaoZheng" },
                        React.createElement("input", { id: "phoneNum", type: "tel", placeholder: "\u60A8\u7684\u624B\u673A\u53F7", onFocus: this.PhoneNumFoucs, onInput: this.PhoneNumInput, value: phoneNum })
                    )
                )
            ),
            React.createElement(
                "aside",
                { className: "row common infoInput wechat" },
                React.createElement(
                    "div",
                    { className: "row col-xs-12 col-sm-12" },
                    React.createElement(
                        "div",
                        { className: "col-xs-2 col-sm-2 logo" },
                        React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/confirmOrder/wechat.png" })
                    ),
                    React.createElement(
                        "div",
                        { className: "row col-xs-10 col-sm-10 sameHeight" },
                        React.createElement(
                            "div",
                            { className: "col-xs-8 col-sm-8 tiaoZheng" },
                            React.createElement("input", { id: "wechatNum", type: "text", placeholder: "\u60A8\u7684\u5FAE\u4FE1\u53F7", onFocus: this.WechatNumFoucs, onInput: this.WechatNumFoucs, value: wechatNum })
                        ),
                        React.createElement(
                            "div",
                            { className: "row col-xs-4 col-sm-4 right check" },
                            React.createElement("img", { id: "samePhone", src: selectImg, onClick: this.SelectStatus }),
                            "\u2003\u540C\u624B\u673A\u53F7"
                        )
                    )
                )
            ),
            React.createElement(
                "aside",
                { className: "row common good" },
                React.createElement(
                    "div",
                    { className: "row col-xs-12 col-sm-12 aboutInfo" },
                    React.createElement(
                        "div",
                        { className: "col-xs-3 col-sm-3 infoImg" },
                        React.createElement("img", { src: goodReminder })
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-9 col-sm-9 infoDesc" },
                        React.createElement(
                            "div",
                            { className: "goodsName" },
                            React.createElement(
                                "p",
                                null,
                                goodsName
                            )
                        ),
                        React.createElement(
                            "p",
                            { className: "open beginTime" },
                            "\u5F00\u8425\u65F6\u95F4\uFF1A",
                            React.createElement(
                                "span",
                                { className: "year" },
                                beginTime_year
                            ),
                            "\u5E74",
                            React.createElement(
                                "span",
                                { className: "month" },
                                beginTime_month
                            ),
                            "\u6708",
                            React.createElement(
                                "span",
                                { className: "day" },
                                beginTime_day
                            ),
                            "\u65E5"
                        ),
                        React.createElement(
                            "p",
                            { className: "price" },
                            "\xA5",
                            React.createElement(
                                "span",
                                { className: "new-price" },
                                currentPrice
                            )
                        )
                    )
                )
            ),
            React.createElement(PriceCont, { couponInfo: couponInfo, currentPrice: currentPrice, goods: goods }),
            React.createElement(Public_error, null)
        ),
        React.createElement(ChooseCouponNew, null)
    );
}), _React$createClass));
var PriceCont = React.createClass({
    displayName: "PriceCont",

    getInitialState: function getInitialState() {
        return {
            youhuiData: {}
        };
    },
    componentDidMount: function componentDidMount() {
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
        PubSub.subscribe("youhuiData", function (evName, youhuiData) {
            this.setState({ youhuiData: youhuiData });
        }.bind(this));

        PubSub.subscribe("test", function (evName, value) {
            //alert(getCookie('youHuiState'));
            //alert(getCookie('youHuiS'));

            var youhuiData = me.state.youhuiData;
            //var currentCouponId = '';
            var currentPrice = me.props.currentPrice,
                youhuiText = '',
                youHuiMoney = '',
                realyPay = '',
                currentPriceNew = '';
            // clearInterval(timer);
            timer = setInterval(function () {
                console.log('1', getCookie('youHuiState'));
                youHuiState = value;
                currentCouponId = getCookie('currentCouponId');
                //youHuiState = localStorage.getItem('youHuiState');
                //currentCouponId = localStorage.getItem('currentCouponId');


                if (youHuiState == undefined || youHuiState == '') {
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
                youhuiData.youhuiText = youhuiText;
                youhuiData.youHuiMoney = youHuiMoney;
                youhuiData.realyPay = realyPay;
                youhuiData.currentPriceNew = currentPriceNew;
                //console.log(youhuiData);
                PubSub.publish('youhuiData', youhuiData);
                clearInterval(timer);

                clientFunA(); //控制左上角和title
                $("#couponBoxNew").hide();
                $('#confirmOrderNew').show();

                console.log(youhuiData);
            }, 100);
        });
    },
    //设置一个定时器，定时获取cookie值
    toggleCoupon: function toggleCoupon() {
        var me = this;
        var youhuiData = this.state.youhuiData;
        //var currentCouponId = '';
        var currentPrice = this.props.currentPrice,
            youhuiText = '',
            youHuiMoney = '',
            realyPay = '',
            currentPriceNew = '';
        // clearInterval(timer);
        timer = setInterval(function () {
            console.log('1', getCookie('youHuiState'));
            youHuiState = getCookie('youHuiState');
            currentCouponId = getCookie('currentCouponId');
            //youHuiState = localStorage.getItem('youHuiState');
            //currentCouponId = localStorage.getItem('currentCouponId');

            if (youHuiState != null) {
                console.log(3);
                if (youHuiState == 'undefined') {
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
                youhuiData.youhuiText = youhuiText;
                youhuiData.youHuiMoney = youHuiMoney;
                youhuiData.realyPay = realyPay;
                youhuiData.currentPriceNew = currentPriceNew;
                //console.log(youhuiData);
                PubSub.publish('youhuiData', youhuiData);
                clearInterval(timer);
            }
            console.log(youhuiData);
        }, 100);
    },
    // 选择优惠券
    SelectYhuiClick: function SelectYhuiClick(event) {
        var me = this;
        event.stopPropagation();
        setMaiDian(SQueRenDingDan.SCategory_SQueRenDingDan, SQueRenDingDan.SQueRenDingDan_XuanZeYouHuiQuan); //选择优惠券埋点
        delCookie('youHuiState');
        //me.toggleCoupon();
        //localStorage.removeItem('youHuiState');
        /*var deviceType = isMobile();
        var currentCouponId = '';
        if (deviceType == "isApp" && ((typeof mobileApp != "undefined") || (typeof window.webkit != "undefined"))) {
            var data = {
                link: absoluteUrl + 'chooseCoupon.html' + window.location.search,
                animation: 1//默认1从右到左，2从下到上
            };
            data = JSON.stringify(data);
            me.toggleCoupon();
              if(getParamByUrl('webver')>2){
                //window.location.href=absoluteUrl + 'chooseCoupon.html' + window.location.search;
               appFc.openWebview(data);
            }else {
                mobileApp.openWebview(data);//当为手机时，打开新的链接
            }
            } else { //和if内容一样
            //设置一个定时器，定时获取cookie值
            delCookie('youHuiState');
            //localStorage.removeItem('youHuiState');
            me.toggleCoupon();
            window.location.href = absoluteUrl + 'chooseCoupon.html' + window.location.search;//如果是电脑上测试，可以跳转新的链接，不能达到openWebview和下个页面的deleteHistory的效果；
          }*/

        clientFunB(); //控制左上角和title
        $('#confirmOrderNew').hide();
        $("#couponBoxNew").css("min-height", $(window).height());
        $("#couponBoxNew").css("display", "block");
    },

    // 提交订单
    SubmitOrder: function SubmitOrder(event) {
        var me = this;
        console.log(me);
        if (changePriceSubmit == true) {
            //如果价格发生变化，用户点击弹窗中的取消/提交按钮之后，下次点击确认订单，就直接真正提交订单了；
            me.realSubmitFun();
        } else {
            var urlOrder = ajaxLink + "/v1/api/campSell/confirmOrder" + window.location.search; //有关优惠券的信息
            $.ajax({
                type: "get",
                url: urlOrder,
                dataType: "json",
                success: function success(data) {
                    console.log(data);
                    if (data.code == 200) {
                        endHasLimit = data.resp.goodsInfo.hasLimit;
                        if (initHasLimit == endHasLimit) {
                            me.realSubmitFun();
                        } else if (initHasLimit == true || endHasLimit == false) {
                            //限时特价转为原价
                            PubSub.publish('currentPrice', data.resp.goodsInfo.curentPrice);
                            $('#nowPrice').html('您选择的商品价格发生了变化，当前价格为：' + data.resp.goodsInfo.curentPrice + '元，是否继续提交订单？');
                            $('.payOrNotBox').show();
                        } else if (initHasLimit == false || endHasLimit == true) {
                            //原价转为限时特价
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
                error: function error() {
                    $(".error-main-t").html("啊哦，您的网络不太给力~");
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            });
        }
    },

    // 提交订单(确定提交)
    realSubmitFun: function realSubmitFun() {
        var me = this;
        event.stopPropagation();
        setMaiDian(SQueRenDingDan.SCategory_SQueRenDingDan, SQueRenDingDan.SQueRenDingDan_TiJiaoDingDan); //提交订单埋点
        var goods = this.props.goods;
        // clearInterval(timer);
        var phoneNum = goods.phoneNo;
        var goodsId = goods.goodsId;
        var wechatNum = goods.weChat;
        var originPrice = goods.origPrice;
        var currentPrice = this.props.currentPrice;
        var currentPriceNew = this.state.youhuiData.currentPriceNew;
        var couponPrice = this.state.youhuiData.youHuiMoney.substring(2);
        var firstCouponId = this.state.youhuiData.firstCouponId;
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
        if (phoneNum == undefined || phoneNum == null || phoneNum == "") {
            $('.alerts').eq(3).stop(true).fadeIn(200).delay(2000).fadeOut(200); //请填写参营人员手机号码
        } else if (!myreg.test(phoneNum)) {
            $('.alerts').eq(4).stop(true).fadeIn(200).delay(2000).fadeOut(200); //手机号填写有误，请重新核对哦
        } else {
            var urlStock = ajaxLink + '/v1/api/campSell/getClassStock' + window.location.search; //获取商品库存状态
            console.log(urlStock);
            $.ajax({
                type: "get",
                url: urlStock,
                dataType: "json",
                success: function success(data) {
                    console.log(3, data);
                    if (data.code == 200) {
                        console.log('data.resp=' + data.resp);
                        if (data.resp == 1) {
                            //售罄但有未支付的订单
                            $('.alerts').eq(0).stop(true).fadeIn(200).delay(2000).fadeOut(200); //已拍完，但还有人未付款
                        } else if (data.resp == 2) {
                            //售罄且都支付完成
                            $('.alerts').eq(1).stop(true).fadeIn(200).delay(2000).fadeOut(200); //手慢了，名额被抢光啦～
                        } else if (data.resp == 3 || data.resp == 5) {
                            // 不能同时购买多份  //3：表示支付成功； 5：提交订单但未支付
                            $('.alerts').eq(2).stop(true).fadeIn(200).delay(2000).fadeOut(200); //同一账号只能购买一次
                        } else if (data.resp == 7 || data.resp == 10) {
                            //data.resp == 7 相同手机号码不能在同一开营周期内购买多个燃脂营；
                            $('.alerts').eq(5).html('您在当前所选时间内已经参营啦，换个时间吧～').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                        } else if (data.resp == 8 || data.resp == 9) {
                            //data.resp == 8 还有未支付的订单，不能买时间冲突的其他期
                            $('.alerts').eq(5).html('您在当前所选时段内已有订单啦，处理后再来试试吧～').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                        } else if (data.resp == 4) {
                            // 有库存
                            //else{// 有库存
                            if ($(".submit span").attr("data-clicked") == "0") {
                                //执行点击
                                $(".submit span").attr("data-clicked", "1"); //避免多次点击；
                                var trafficSource = '';
                                if (getParamByUrl('refer') == 1) {
                                    //banner
                                    trafficSource = 'appBanner';
                                } else if (getParamByUrl('refer') == 2) {
                                    //push推送
                                    trafficSource = 'push';
                                } else if (getParamByUrl('refer') == 3) {
                                    //开屏
                                    trafficSource = 'kaiPing';
                                } else if (getParamByUrl('refer') == 4) {
                                    //从订单详情页进入
                                    trafficSource = 'orderDetail';
                                } else if (getParamByUrl('refer') == 6) {
                                    //从'我的'售卖入口进入
                                    trafficSource = 'woDe';
                                } else if (getParamByUrl('refer') == 5) {
                                    trafficSource = 'wenzhang';
                                } else {
                                    //其他
                                    trafficSource = 'other';
                                }
                                var goodsInfo = {
                                    "linkId": parseInt(getParamByUrl('linkId')),
                                    "goodsId": parseInt(getParamByUrl('classId')),
                                    "userId": parseInt(getParamByUrl('userId')),
                                    "roleId": parseInt(getParamByUrl('roleId')),
                                    "phoneNo": phoneNum,
                                    "weChat": wechatNum,
                                    "origPrice": originPrice,
                                    "currentPrice": couponPrice > 0 ? currentPriceNew : currentPrice,
                                    "couponPrice": parseInt(couponPrice),
                                    "isCoupon": couponPrice > 0 ? 1 : 0,
                                    "couponId": couponPrice > 0 ? youHuiState == '' ? firstCouponId : currentCouponId : null,
                                    "sourceType": "燃脂营APP",
                                    "trafficSource": trafficSource //流量来源，开屏/push/短信/banner/其他
                                };
                                console.log('goodsInfo ', goodsInfo);
                                var urlGenerateOrder = ajaxLink + '/v1/api/campOrder/generateOrder' + window.location.search; //向后台提交数据
                                $.ajax({
                                    type: "POST",
                                    url: urlGenerateOrder,
                                    dataType: "json",
                                    contentType: 'application/json',
                                    data: JSON.stringify(goodsInfo),
                                    success: function success(data) {
                                        console.log(4, data);
                                        if (data.code == 200) {
                                            // console.log('向后台提交数据！');
                                            console.log(absoluteUrl + "orderSuccess.html" + window.location.search + "&orderId=" + data.resp);
                                            var deviceType = isMobile();
                                            if (deviceType == "isApp") {
                                                var getPageInfo = function getPageInfo() {
                                                    var paydata = {
                                                        orderId: data.resp,
                                                        url: absoluteUrl + "orderSuccess.html" + window.location.search + "&orderId=" + data.resp,
                                                        price: goodsInfo.currentPrice,
                                                        isRefresh: true,
                                                        function: "gobackToGood"
                                                    };
                                                    return JSON.stringify(paydata);
                                                };
                                                if (getParamByUrl('webver') > 2) {
                                                    appFc.gotoPay(getPageInfo());
                                                } else {
                                                    mobileApp.gotoPay(getPageInfo());
                                                }
                                            }
                                            setCookiePath("toOrderSuccess", "0", 1, "/;domain=picooc.com");
                                        } else {
                                            $(".error-main-t").html(data.message);
                                            $(".errorAlert").css("display", "block");
                                            $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                                        }
                                    }
                                });
                            }
                        } else {
                            //不再执行点击操作
                        }
                    } else {
                        $(".error-main-t").html(data.result.message);
                        $(".errorAlert").css("display", "block");
                        $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                    }
                },
                error: function error() {
                    $(".error-main-t").html("啊哦，您的网络不太给力~");
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            });
        }
    },
    render: function render() {
        var me = this;
        var currentPrice = this.props.currentPrice,
            youhuiText = this.state.youhuiData.youhuiText,
            youHuiMoney = this.state.youhuiData.youHuiMoney,
            realyPay = this.state.youhuiData.realyPay;
        return React.createElement(
            "div",
            null,
            React.createElement(
                "aside",
                { className: "row common sameHeight youhui", onClick: this.SelectYhuiClick },
                React.createElement(
                    "div",
                    { className: "col-xs-12 col-sm-12" },
                    React.createElement(
                        "div",
                        { className: "col-xs-6 col-sm-6 status" },
                        React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/confirmOrder/youhui.png" }),
                        "\u2003",
                        React.createElement(
                            "span",
                            { className: "aboutYouhui" },
                            "\u4F18\u60E0\u5238"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-6 col-sm-6 right money" },
                        React.createElement(
                            "span",
                            null,
                            youhuiText
                        ),
                        "\u2003",
                        React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/confirmOrder/more.png" })
                    )
                )
            ),
            React.createElement(
                "aside",
                { className: "row common jine" },
                React.createElement(
                    "div",
                    { className: "col-xs-12 col-sm-12 first" },
                    React.createElement(
                        "div",
                        { className: "col-xs-6 col-sm-6 status" },
                        "\u5546\u54C1\u91D1\u989D"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-6 col-sm-6 right money" },
                        "\xA5",
                        React.createElement(
                            "span",
                            { className: "new-price" },
                            currentPrice
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-xs-12 col-sm-12" },
                    React.createElement(
                        "div",
                        { className: "col-xs-6 col-sm-6 status" },
                        "\u4F18\u60E0\u91D1\u989D"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-6 col-sm-6 right money youHuiMoney" },
                        youHuiMoney
                    )
                )
            ),
            React.createElement("aside", { className: "empty" }),
            React.createElement(
                "aside",
                { className: "row sameHeight pay", style: { "display": "none" } },
                React.createElement(
                    "div",
                    { className: "col-xs-6 col-sm-6 realyPay" },
                    "\u5B9E\u4ED8\u6B3E: \xA0",
                    React.createElement(
                        "span",
                        { className: "money" },
                        realyPay
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-xs-6 col-sm-6 submit right" },
                    React.createElement(
                        "span",
                        { "data-clicked": "0", onClick: this.SubmitOrder },
                        "\u63D0\u4EA4\u8BA2\u5355"
                    )
                )
            ),
            React.createElement(
                "aside",
                { className: "alertBox" },
                React.createElement(
                    "div",
                    { className: "alerts", style: { "display": "none" } },
                    "\u5DF2\u62CD\u5B8C\uFF0C\u4F46\u8FD8\u6709\u4EBA\u672A\u4ED8\u6B3E\uFF0C\u5F85\u4F1A\u513F\u518D\u6765\u770B\u770B\u5427\uFF5E"
                ),
                React.createElement(
                    "div",
                    { className: "alerts", style: { "display": "none" } },
                    "\u624B\u6162\u4E86\uFF0C\u540D\u989D\u88AB\u62A2\u5149\u5566\uFF5E"
                ),
                React.createElement(
                    "div",
                    { className: "alerts", style: { "display": "none" } },
                    "\u540C\u4E00\u8D26\u53F7\u53EA\u80FD\u8D2D\u4E70\u4E00\u6B21\u54E6!\u8BF7\u6838\u5BF9\u53C2\u8425\u4EBA\u5458\u4FE1\u606F\uFF5E"
                ),
                React.createElement(
                    "div",
                    { className: "alerts", style: { "display": "none" } },
                    "\u8BF7\u586B\u5199\u53C2\u8425\u4EBA\u5458\u624B\u673A\u53F7\u7801\uFF5E"
                ),
                React.createElement(
                    "div",
                    { className: "alerts", style: { "display": "none" } },
                    "\u624B\u673A\u53F7\u586B\u5199\u6709\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u6838\u5BF9\u54E6\uFF5E"
                ),
                React.createElement("div", { className: "alerts", style: { "display": "none" } })
            ),
            React.createElement(
                "aside",
                { className: "payOrNotBox", style: { display: 'none' } },
                React.createElement("div", { className: "payOrNot", id: "nowPrice" }),
                React.createElement(
                    "div",
                    { className: "btns row" },
                    React.createElement(
                        "div",
                        { className: "col-xs-6 col-sm-6 left", onClick: me.cancelPay },
                        "\u53D6\u6D88"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-6 col-sm-6 right", onClick: me.confirmPay },
                        "\u63D0\u4EA4"
                    )
                )
            )
        );
    },

    //取消支付
    cancelPay: function cancelPay() {
        changePriceSubmit = true;
        $('.payOrNotBox').hide();
    },

    //确认支付
    confirmPay: function confirmPay() {
        var me = this;
        changePriceSubmit = true;
        $('.payOrNotBox').hide();
        me.realSubmitFun();
    }

});

ReactDOM.render(React.createElement(ConfirmOrder, null), document.getElementById('order_box'));

//从支付页面返回到商品介绍页
function gobackToGood() {
    var getPageInfo = function getPageInfo() {
        var data = {
            backNum: 0, //默认为1，
            closeWebview: 1 //默认为0
        };
        return JSON.stringify(data);
    };
    if (getParamByUrl('webver') > 2) {
        appFc.deleteHistory(getPageInfo());
    } else {
        mobileApp.deleteHistory(getPageInfo());
    }
}
window.gobackToGood = gobackToGood;

/*function AA(){
    alert(1);
    $("#couponBoxNew").hide();
    $('#confirmOrderNew').show();
}
window.AA = AA;*/

function clientFunA() {
    $("#couponBoxNew").hide();
    $('#confirmOrderNew').show();
    // alert('FunA');
    var deviceType = isMobile();
    if (getParamByUrl('webver') > 2 && deviceType == "isApp") {
        if (getCookie("saveCampFrom") == "1") {//如果是从燃脂营学员首页续营

        }
        var getPageInfo1 = function getPageInfo1() {
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
        appFc.controlLeft(getPageInfo1());
        var titledata = {
            title: '确认订单',
            /*isShare:false,
             backgroundColor:'#2c2f31'*/
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        titledata = JSON.stringify(titledata);
        appFc.controlTitle(titledata);
    } else {
        var getPageInfo2 = function getPageInfo2() {
            var data = {
                title: '确认订单',
                isShare: false,
                backgroundColor: '#2c2f31'
            };
            return JSON.stringify(data);
        };
        if (deviceType == "isApp") {
            mobileApp.getShareInfo(getPageInfo2());
        }
        document.documentElement.style.webkitTouchCallout = 'none';

        if (deviceType == "isApp") {
            if (getCookie("saveCampFrom") == "1") {//如果是从燃脂营学员首页续营

            }
            var getPageInfo3 = function getPageInfo3() {
                var data = {
                    iconType: 0, //0:默认箭头，1：叉，2：iconUrl传图片
                    backNum: 1,
                    closeWebview: 0, //默认为0
                    iconUrl: "",
                    functionName: ""
                };
                return JSON.stringify(data);
            };
            mobileApp.showLeftBtn(getPageInfo3());
        }
    }
}
window.clientFunA = clientFunA;

/*function BB(){
    alert(2);
    $('#confirmOrderNew').hide();
    $("#couponBoxNew").css("min-height", $(window).height());
    $("#couponBoxNew").css("display", "block");
}
window.BB = BB;*/

function clientFunB() {
    // alert('FunB');
    var deviceType = isMobile();
    if (getParamByUrl('webver') > 2 && deviceType == "isApp") {
        if (getCookie("saveCampFrom") == "1") {//如果是从燃脂营学员首页续营

        }
        var getPageInfo1 = function getPageInfo1() {
            var data = {
                iconType: 0,
                iconColor: "",
                backNum: 0,
                closeWebview: 0,
                hidden: false,
                isHandle: true, //是否控制左上角
                functionName: "clientFunA"
                //isRefreshPage:true
            };
            return JSON.stringify(data);
        };
        appFc.controlLeft(getPageInfo1());
        var titledata = {
            title: '我的优惠券',
            /*isShare:false,
             backgroundColor:'#2c2f31'*/
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        titledata = JSON.stringify(titledata);
        appFc.controlTitle(titledata);
    } else {
        var getPageInfo2 = function getPageInfo2() {
            var data = {
                title: '我的优惠券',
                isShare: false,
                backgroundColor: '#2c2f31'
            };
            return JSON.stringify(data);
        };
        if (deviceType == "isApp") {
            mobileApp.getShareInfo(getPageInfo2());
        }
        document.documentElement.style.webkitTouchCallout = 'none';

        if (deviceType == "isApp") {
            if (getCookie("saveCampFrom") == "1") {//如果是从燃脂营学员首页续营

            }
            var getPageInfo3 = function getPageInfo3() {
                var data = {
                    iconType: 0, //0:默认箭头，1：叉，2：iconUrl传图片
                    backNum: 0,
                    closeWebview: 0, //默认为0
                    iconUrl: "",
                    isHandle: true, //是否控制左上角
                    functionName: "clientFunA"
                };
                return JSON.stringify(data);
            };
            mobileApp.showLeftBtn(getPageInfo3());
        }
    }
}
window.clientFunB = clientFunB;

/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_error = __webpack_require__(3);
var SXuanZeYouHuiQuan = {
    SCategory_SXuanZeYouHuiQuan: 5080300,
    SXuanZeYouHuiQuan_BuShiYongYouHuiQuan: 5080301, //不使用优惠券
    SXuanZeYouHuiQuan_ShiYongYouHuiQuan: 5080302 //使用优惠券
};

var CouponList = React.createClass({
    displayName: "CouponList",


    CircleClick: function CircleClick(event) {
        event.stopPropagation();
        event.preventDefault();
        setMaiDian(SXuanZeYouHuiQuan.SCategory_SXuanZeYouHuiQuan, SXuanZeYouHuiQuan.SXuanZeYouHuiQuan_BuShiYongYouHuiQuan); //不使用优惠券埋点
        //this.deleteHistory();//回退到上一个页面(只可以在手机上测试)

        //$("#couponBoxNew").hide();
        //$('#confirmOrderNew').show();
        PubSub.publish("test", 1);
    },
    SelectCircle: function SelectCircle(event) {
        event.stopPropagation();
        event.preventDefault();
        var couponList = this.props.couponList;
        var $circle1 = $(".circle1"); //伪数组
        var ele = event.currentTarget;
        $circle1.removeClass("active");
        $circle1.attr("src", "https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle2.png");
        $(ele).children().children(".circle1").attr("src", "https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png");
        $(ele).children().children(".circle1").addClass("active");
        var value = $(ele).find('.value2').html();

        var index = $(ele).attr('data-index');
        var currentCouponId = value == undefined ? null : couponList[index - 1].id;
        //localStorage.setItem("youHuiState",value);
        //localStorage.setItem("currentCouponId",currentCouponId);
        //localStorage.setItem("chooseIndex",$(ele).index());
        setCookie('youHuiState', value, 1); //设置优惠状态的cookie
        setCookie('youHuiS', value, 1); //设置优惠状态的cookie
        setCookie('currentCouponId', currentCouponId, 1); //设置优惠状态的cookie--id
        setCookie('chooseIndex', $(ele).index(), 1); //选中的优惠券列表的第几个


        //alert(value);
        //alert(getCookie('youHuiState'));
        //alert(getCookie('youHuiS'));


        if (ele.nodeName.toLowerCase() == 'aside') {
            setMaiDian(SXuanZeYouHuiQuan.SCategory_SXuanZeYouHuiQuan, SXuanZeYouHuiQuan.SXuanZeYouHuiQuan_BuShiYongYouHuiQuan); //不使用优惠券埋点
            setCookie('chooseIndex', 'noChoose2', 1); //不选优惠券
            //localStorage.setItem("chooseIndex",noChoose2);
        } else if (ele.nodeName.toLowerCase() == 'div') {
            setMaiDian(SXuanZeYouHuiQuan.SCategory_SXuanZeYouHuiQuan, SXuanZeYouHuiQuan.SXuanZeYouHuiQuan_ShiYongYouHuiQuan); //使用优惠券埋点
            setCookie('chooseIndex', index - 1, 1); //选中的可用优惠券列表的第几个
            //localStorage.setItem("chooseIndex",index - 1);
        }

        // setCookie('bb', 3, 1);
        // localStorage.setItem("bb",5);
        // setCookiePath('aaa', 3, 1,"/;domain=picooc.com");
        // var time1=setTimeout(function(){
        //      clearTimeout(time1);
        //      this.deleteHistory();//回退到上一个页面(只可以在手机上测试)
        // },500);
        //this.deleteHistory();//回退到上一个页面(只可以在手机上测试)
        PubSub.publish("test", value);
    },
    // 选择好优惠券之后，页面自动跳转到确认订单页面；
    deleteHistory: function deleteHistory() {
        var getPageInfo = function getPageInfo() {
            var data = {
                backNum: 1, //默认为1，
                closeWebview: 0 //默认为0
            };
            return JSON.stringify(data);
        };
        if (getParamByUrl('webver') > 2) {
            appFc.deleteHistory(getPageInfo());
        } else {
            mobileApp.deleteHistory(getPageInfo());
        }
    },
    render: function render() {
        var couponList = this.props.couponList;
        var couponListHTML = [];
        // var NoCoupon = [];
        var hasCanUse = false;
        if (couponList.length > 0) {
            for (var i = 0; i < couponList.length; i++) {
                if (couponList[i].isUse == 0) {
                    //没用过
                    if (!couponList[i].expire) {
                        //没有过期
                        hasCanUse = true;
                        couponListHTML.push(React.createElement(
                            "div",
                            { className: "row col-xs-12 col-sm-12 avail isAvail", key: i /*onClick={this.CircleClick}*/ },
                            React.createElement(
                                "div",
                                { className: "msg msg2 msgActive", onClick: this.SelectCircle, "data-index": i + 1 },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-8 col-sm-8 continue" },
                                    React.createElement("img", { className: "circle circle1 aboutCircle keYongQuan", src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png" }),
                                    "\xA0\xA0",
                                    React.createElement(
                                        "span",
                                        null,
                                        couponList[i].name
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-4 col-sm-4 value" },
                                    React.createElement(
                                        "span",
                                        { className: "value1" },
                                        "\xA5"
                                    ),
                                    " ",
                                    React.createElement(
                                        "span",
                                        { className: "value2" },
                                        couponList[i].value
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 term" },
                                "\u6709\u6548\u671F\uFF1A",
                                couponList[i].beginTime + '-',
                                couponList[i].endTime
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 require" },
                                " ",
                                couponList[i].rule
                            )
                        ));
                    } else {
                        //过期
                        couponListHTML.push(React.createElement(
                            "div",
                            { className: "row col-xs-12 col-sm-12 avail notAvail", key: i },
                            React.createElement(
                                "div",
                                { className: "msg" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-8 col-sm-8 continue" },
                                    React.createElement("img", { className: "circle", src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle2.png" }),
                                    "\xA0\xA0",
                                    React.createElement(
                                        "span",
                                        null,
                                        couponList[i].name
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-4 col-sm-4 value" },
                                    React.createElement(
                                        "span",
                                        { className: "value1" },
                                        "\xA5"
                                    ),
                                    " ",
                                    React.createElement(
                                        "span",
                                        { className: "value2" },
                                        couponList[i].value
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 term" },
                                "\u6709\u6548\u671F\uFF1A",
                                couponList[i].beginTime + '-',
                                couponList[i].endTime
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 require" },
                                couponList[i].rule
                            ),
                            React.createElement("img", { className: "status", src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/expire.png" })
                        ));
                    }
                } else if (couponList[i].isUse == 1) {
                    //已使用
                    couponListHTML.push(React.createElement(
                        "div",
                        { className: "row col-xs-12 col-sm-12 avail notAvail", key: i },
                        React.createElement(
                            "div",
                            { className: "msg" },
                            React.createElement(
                                "div",
                                { className: "col-xs-8 col-sm-8 continue" },
                                React.createElement("img", { className: "circle", src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle2.png" }),
                                "\xA0\xA0",
                                React.createElement(
                                    "span",
                                    null,
                                    couponList[i].name
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-4 col-sm-4 value" },
                                React.createElement(
                                    "span",
                                    { className: "value1" },
                                    "\xA5"
                                ),
                                " ",
                                React.createElement(
                                    "span",
                                    { className: "value2" },
                                    couponList[i].value
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-12 col-sm-12 term" },
                            "\u6709\u6548\u671F\uFF1A",
                            couponList[i].beginTime + ' - ',
                            couponList[i].endTime
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-12 col-sm-12 require" },
                            couponList[i].rule
                        ),
                        React.createElement("img", { className: "status", src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/used.png" })
                    ));
                }
            }
        } else {
            // NoCoupon.push(
            //     <div className="row noCoupon" key='0'>暂无可使用的优惠券～</div>
            // );
            // console.log(NoCoupon);
        }
        return React.createElement(
            "div",
            null,
            React.createElement(
                "aside",
                { className: "row noCoupons msg2", onClick: this.SelectCircle, "data-index": "0" },
                React.createElement(
                    "div",
                    { className: "col-xs-2 col-sm-2 noImg" },
                    React.createElement("img", { className: "circle circle1", src: hasCanUse == true ? "https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle2.png" : "https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png" })
                ),
                React.createElement(
                    "div",
                    { className: "col-xs-10 col-sm-10 noUse" },
                    "\u4E0D\u4F7F\u7528\u4F18\u60E0\u52B5"
                )
            ),
            React.createElement(
                "aside",
                { className: "row coupons", style: { 'display': 'block' } },
                couponListHTML
            )
        );
    }
});

var CouponContainer = React.createClass({
    displayName: "CouponContainer",

    getInitialState: function getInitialState() {

        /*if(getParamByUrl('webver')>2){
            var getPageInfo = function () {
                var data = {
                    title: '我的优惠券',
                    color: "",
                    opacity: "",
                    backgroundColor: "",
                    backgroundOpacity: ""
                };
                return JSON.stringify(data);
            };
            appFc.controlTitle(getPageInfo());
        }else{
            var getPageInfo = function (){
                var data = {
                    title:'我的优惠券',
                    isShare:false,
                    backgroundColor:'#2c2f31'
                };
                return JSON.stringify(data);
            };
            var deviceType=isMobile();
            if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
                mobileApp.getShareInfo(getPageInfo());
            }
            document.documentElement.style.webkitTouchCallout='none';
        }*/

        return {
            couponList: []
        };
    },
    componentWillMount: function componentWillMount() {
        var chooseIndex = getCookie('chooseIndex');
        console.log('chooseIndex=' + chooseIndex); //选中的优惠券列表的第几个
        var finalUrl = ajaxLink + "/v1/api/campCoupon/findCoupon" + window.location.search;
        this.serverRequest = $.get(finalUrl, function (data) {
            console.log(1, data);
            if (data.code == 200) {
                //setCookie('youHuiState', '', 1);//清除优惠状态的cookie
                console.log("getCookie('youHuiState')", getCookie('youHuiState'));
                this.setState({
                    couponList: data.resp.couponList //获取优惠券列表数据
                });
                if (data.resp.couponList.length > 0) {
                    //如果只有一张可用券，则默认选中
                    if ($('.msg2 .keYongQuan').length == 0) {
                        $(".circle1:first").attr("src", "https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png"); //不使用优惠券打勾
                    }
                    //判断选中的是哪一个优惠券，再次进入该页面时，上一次选中的优惠券前面打勾
                    $('.aboutCircle').attr('src', 'https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle2.png');
                    if (chooseIndex != '') {
                        if (chooseIndex == 'noChoose2') {
                            $(".circle1:first").attr("src", "https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png"); //不使用优惠券
                        } else {
                            $('.aboutCircle').eq(Number(chooseIndex)).attr('src', 'https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png'); //第chooseIndex个有效的优惠券前面打勾
                        }
                    } else {
                        $('.aboutCircle:first').attr('src', 'https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png'); //第一个有效的优惠券前面打勾(默认状态)
                    }
                } else {
                    $(".coupons").html("");
                    $(".circle1").attr("src", "https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png");
                    var str2 = '<div class="row noCoupon">暂无可使用的优惠券～</div>';
                    $(".coupons").append(str2);
                }
            } else {
                $(".error-main-t").html(data.result.message);
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        }.bind(this));
    },
    render: function render() {
        var couponList = this.state.couponList;
        return React.createElement(
            "section",
            { className: "container", id: "couponBoxNew", style: { "display": "none" } },
            React.createElement(CouponList, { couponList: couponList }),
            React.createElement(Public_error, null)
        );
    }
});

module.exports = CouponContainer;

//ReactDOM.render(<CouponContainer />, document.getElementById('CouponBox'));

/***/ })

},[207]);