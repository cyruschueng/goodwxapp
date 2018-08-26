webpackJsonp([5],{

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var PubSub = __webpack_require__(2);
var ticket;
var ProductDetails_alertBox = React.createClass({
    displayName: "ProductDetails_alertBox",


    getInitialState: function getInitialState() {
        var me = this;
        return {
            leftTime: 60,
            againGetCodeShow: false
        };
    },

    componentDidMount: function componentDidMount() {
        var me = this;
        var data = me.props.alertBox;
    },

    render: function render() {
        var me = this;
        var data = me.props.alertBox;
        if (data.code == 200) {
            console.log(me.props.alertBox, 880000);
        }
        return (
            /*弹出框*/
            React.createElement(
                "aside",
                { className: "alertBox" },
                React.createElement(
                    "div",
                    { className: "alerts", style: { display: "none" } },
                    "\u9884\u7EA6\u6210\u529F\uFF01\u6211\u4EEC\u5C06\u5728\u4E0B\u671F\u5F00\u552E\u524D2",
                    React.createElement("br", null),
                    "\u5C0F\u65F6\u5185\u901A\u77E5\u60A8\uFF5E"
                ),
                React.createElement(
                    "div",
                    { className: "alerts", style: { display: "none" } },
                    "\u8BBE\u7F6E\u6210\u529F\uFF01",
                    React.createElement("br", null),
                    "\u6211\u4EEC\u5C06\u4F1A\u5728\u5F00\u552E\u524D5\u5206\u949F\u63D0\u9192\u60A8\uFF5E"
                ),
                React.createElement(
                    "div",
                    { className: "alerts", style: { display: "none" } },
                    "\u5DF2\u62CD\u5B8C\uFF0C\u4F46\u8FD8\u6709\u4EBA\u672A\u4ED8\u6B3E\uFF0C\u5F85\u4F1A",
                    React.createElement("br", null),
                    "\u513F\u518D\u6765\u770B\u770B\u5427\uFF5E"
                ),
                React.createElement(
                    "div",
                    { className: "alerts oneLine", style: { display: "none" } },
                    "\u624B\u6162\u4E86\uFF0C\u540D\u989D\u88AB\u62A2\u5149\u5566\uFF5E"
                ),
                React.createElement(
                    "div",
                    { className: "alerts", style: { display: "none" } },
                    "\u60A8\u5728\u5F53\u524D\u6240\u9009\u65F6\u95F4\u5185\u5DF2\u7ECF\u53C2\u8425\u5566\uFF0C\u6362\u4E2A\u65F6\u95F4\u5427\uFF5E"
                ),
                React.createElement(
                    "div",
                    { className: "alerts", style: { display: "none" } },
                    "\u60A8\u5728\u5F53\u524D\u6240\u9009\u65F6\u6BB5\u5185\u5DF2\u6709\u8BA2\u5355\u5566\uFF0C\u70B9\u51FB\u53F3\u4E0A\u89D2[\u6211\u7684]\u5904\u7406\u540E\u518D\u6765\u8BD5\u8BD5\u5427\uFF5E"
                ),
                React.createElement("div", { className: "alerts", style: { display: "none" } }),
                React.createElement(
                    "div",
                    { className: "alerts2", style: { display: "none" } },
                    React.createElement("div", { className: "bg cancelBg" }),
                    React.createElement(
                        "div",
                        { className: "row appOuter version" },
                        React.createElement(
                            "p",
                            { className: "text2" },
                            "\u6E29\u99A8\u63D0\u793A\uFF1A",
                            React.createElement("br", null),
                            "\u65B0\u7248\u672C\u652F\u6301APP\u5185\u65E0\u767B\u5F55\u65E0\u8DF3\u8F6C\u652F\u4ED8\uFF1B\u8D2D\u4E70\u71C3\u8102\u8425\u540E\u53EF\u7ACB\u5373\u67E5\u770B\u73ED\u7EA7\u5165\u53E3\u54E6\uFF01"
                        ),
                        React.createElement(
                            "div",
                            { className: "isUpdate" },
                            React.createElement(
                                "div",
                                { className: "col-xs-6 col-sm-6 cancel" },
                                "\u6682\u4E0D\u66F4\u65B0"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-6 col-sm-6 updata" },
                                "\u7ACB\u5373\u5347\u7EA7"
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "alerts2", style: { display: "none" } },
                    React.createElement("div", { className: "bg" }),
                    React.createElement(
                        "div",
                        { className: "row appOuter version" },
                        React.createElement(
                            "p",
                            { className: "text2" },
                            "\u540C\u4E00\u4E2A\u8D26\u53F7\u9650\u8D2D\u4E00\u6B21\uFF0C\u60A8\u53EF\u5728\u201C\u6211\u7684\u2014\u6211\u7684\u71C3\u8102\u8425\u2014\u6211\u7684\u8BA2\u5355\u201D\u4E2D\u67E5\u770B\u8BA2\u5355\u8BE6\u60C5\u54E6~"
                        ),
                        React.createElement(
                            "div",
                            { className: "know" },
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 knowInner" },
                                "\u6211\u77E5\u9053\u5566"
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "alerts2", style: { display: "none" } },
                    React.createElement("div", { className: "bg" }),
                    React.createElement(
                        "div",
                        { className: "row appOuter version" },
                        React.createElement(
                            "p",
                            { className: "text2" },
                            "\u60A8\u4E0D\u80FD\u8D2D\u4E70\u54E6\uFF0C\u5EFA\u8BAE\u60A8\u6CE8\u518C\u6216\u767B\u5F55\u4E2A\u4EBA\u8D26\u53F7\u540E\u4E3A\u81EA\u5DF1\u8D2D\u4E70\uFF5E"
                        ),
                        React.createElement(
                            "div",
                            { className: "forSelf" },
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 forSelfInner" },
                                "\u6211\u77E5\u9053\u5566"
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "alerts2", style: { display: "none" } },
                    React.createElement("div", { className: "bg cancelBg" }),
                    React.createElement(
                        "div",
                        { className: "row appOuter version" },
                        React.createElement(
                            "p",
                            { className: "text2" },
                            "\u6E29\u99A8\u63D0\u793A\uFF1A",
                            React.createElement("br", null),
                            "\u65B0\u7248\u672C\u652F\u6301APP\u5185\u65E0\u767B\u5F55\u65E0\u8DF3\u8F6C\u652F\u4ED8\uFF1B\u8D2D\u4E70\u71C3\u8102\u8425\u540E\u53EF\u7ACB\u5373\u67E5\u770B\u73ED\u7EA7\u5165\u53E3\u54E6\uFF01\u6253\u5F00\u624B\u673A\u5E94\u7528\u5546\u5E97\u5373\u53EF\u66F4\u65B0\u5230\u6700\u65B0\u7248\u672C~"
                        ),
                        React.createElement(
                            "div",
                            { className: "forSelf" },
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 forSelfInner notGengXin" },
                                "\u6211\u77E5\u9053\u4E86"
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "alerts2", style: { display: "none" } },
                    React.createElement("div", { className: "bg cancelBg" }),
                    React.createElement(
                        "div",
                        { className: "row appOuter version" },
                        React.createElement(
                            "p",
                            { className: "text2" },
                            "\u6E29\u99A8\u63D0\u793A\uFF1A",
                            React.createElement("br", null),
                            "\u66F4\u65B0\u4E00\u4E0B\u4E0B\uFF0C\u5BA2\u670D\u59B9\u7EB8\u4F1A\u5077\u5077\u544A\u8BC9\u60A8\u51CF\u8102\u5851\u5F62\u79D8\u7C4D\u54E6~"
                        ),
                        React.createElement(
                            "div",
                            { className: "isUpdate" },
                            React.createElement(
                                "div",
                                { className: "col-xs-6 col-sm-6 cancelNew" },
                                "\u6682\u4E0D\u66F4\u65B0"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-6 col-sm-6 updataNew" },
                                "\u7ACB\u5373\u5347\u7EA7"
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "alerts2", style: { display: "none" } },
                    React.createElement("div", { className: "bg" }),
                    React.createElement(
                        "div",
                        { className: "row appOuter version" },
                        React.createElement(
                            "p",
                            { className: "text2" },
                            "\u6E29\u99A8\u63D0\u793A\uFF1A",
                            React.createElement("br", null),
                            "\u66F4\u65B0\u4E00\u4E0B\u4E0B\uFF0C\u5BA2\u670D\u59B9\u7EB8\u4F1A\u5077\u5077\u544A\u8BC9\u60A8\u51CF\u8102\u5851\u5F62\u79D8\u7C4D\u54E6\uFF01\u6253\u5F00\u624B\u673A\u5E94\u7528\u5546\u5E97\u5373\u53EF\u66F4\u65B0\u5230\u6700\u65B0\u7248~"
                        ),
                        React.createElement(
                            "div",
                            { className: "forSelf" },
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 forSelfInnerNew" },
                                "\u6211\u77E5\u9053\u5566"
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "alertsVerify", style: { display: me.props.verifyStatus } },
                    React.createElement("div", { className: "bg" }),
                    React.createElement(
                        "div",
                        { className: "row verifyBox", style: { display: 'none' } },
                        React.createElement("img", { className: "closeImg", onClick: me.props.verifyFun, src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/close.png", alt: "" }),
                        React.createElement(
                            "div",
                            { className: "title" },
                            "\u8BF7\u9A8C\u8BC1\u624B\u673A\u53F7\u7801"
                        ),
                        React.createElement(
                            "div",
                            { className: "row col-xs-12 col-sm-12 infoInput" },
                            React.createElement(
                                "div",
                                { className: "col-xs-2 col-sm-2 logo" },
                                React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/verify.png" })
                            ),
                            React.createElement(
                                "div",
                                { className: "row col-xs-10 col-sm-10 sameHeight" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 tiaoZheng" },
                                    React.createElement("input", { ref: "code", className: "ipt code", type: "text", placeholder: "4 \u4F4D\u9A8C\u8BC1\u7801" })
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-12 col-sm-12 verifyBtn verifyBtn1", onClick: me.goToVerify },
                            "\u9A8C\u8BC1"
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-12 col-sm-12 warning", style: { display: me.state.againGetCodeShow == false ? "block" : "none" } },
                            "\u63A5\u6536\u77ED\u4FE1\u5927\u7EA6\u9700\u8981",
                            React.createElement(
                                "span",
                                { className: "nowLeftTime" },
                                me.state.leftTime
                            ),
                            "s"
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-12 col-sm-12 warning", style: { display: me.state.againGetCodeShow == false ? "none" : "block" } },
                            "\u6536\u4E0D\u5230\u9A8C\u8BC1\u7801\uFF1F",
                            React.createElement(
                                "span",
                                { className: "againGetCode", onClick: me.liJiVerifyAgain },
                                "\u91CD\u65B0\u83B7\u53D6"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row verifyBox", style: { display: 'block' } },
                        React.createElement("img", { className: "closeImg", onClick: me.props.verifyFun, src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/close.png", alt: "" }),
                        React.createElement(
                            "div",
                            { className: "title" },
                            "\u8BF7\u9A8C\u8BC1\u624B\u673A\u53F7\u7801"
                        ),
                        React.createElement(
                            "div",
                            { className: "row col-xs-12 col-sm-12 infoInput" },
                            React.createElement(
                                "div",
                                { className: "col-xs-2 col-sm-2 logo" },
                                React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/phone.png" })
                            ),
                            React.createElement(
                                "div",
                                { className: "row col-xs-10 col-sm-10 sameHeight" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 tiaoZheng" },
                                    React.createElement("input", { ref: "phoneNum", className: "ipt phone", type: "text", placeholder: "\u8F93\u5165\u624B\u673A\u53F7" })
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-12 col-sm-12 verifyBtn verifyBtn2", onClick: me.liJiVerify },
                            "\u7ACB\u5373\u9A8C\u8BC1"
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-12 col-sm-12 warning", style: { visibility: 'hidden' } },
                            "**"
                        )
                    ),
                    React.createElement("div", { id: "TCaptcha" })
                )
            )
        );
    },

    //点击立即验证
    liJiVerify: function liJiVerify() {
        var me = this;
        var data = me.props.alertBox;
        publicData.phoneNum = me.refs.phoneNum.value;
        if ($.trim(me.refs.phoneNum.value) != '') {
            var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
            if (myreg.test(publicData.phoneNum)) {
                //如果手机号格式正确
                $.ajax({
                    type: "get",
                    //url: "http://172.17.1.233:8080/v1/api/captcha/getTencentUrlForSms",
                    url: ajaxLink + "/v1/api/captcha/getTencentUrlForSms",
                    dataType: "json",
                    success: function success(data) {
                        console.log(data);
                        if (data.result.code == 200) {
                            console.log('图形验证码', data);
                            $("#graphJs").attr("src", data.resp.url);
                            var capTime = setInterval(function () {
                                if (capInit != undefined) {
                                    /*$('#TCaptcha, #TCaptcha iframe').css('overflow', 'hidden').on("touchmove",function(ev){
                                        ev = ev || event;
                                        if(ev.preventDefault){
                                            ev.preventDefault();
                                        }else{
                                            return false;
                                        }
                                    });*/
                                    //setTimeout(function(){alert(document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("feedback").html());},200);
                                    // var capTime2=setInterval(
                                    //     function(){
                                    //         //                                 var imgs = i.contentWindow.document.getElementsByTagName('img');
                                    //         // for(var i=0;i<imgs.length;i++)imgs[i].style.display='none'
                                    //         // console.log("feedback:"+$(".captcha_icon_feedback"));
                                    //         if(typeof document.getElementsByTagName("iframe")[0]!="undefined"){
                                    //             console.log(document.getElementsByTagName("iframe")[0].contentWindow);
                                    //             if(typeof document.getElementsByTagName("iframe")[0].contentWindow!="undefined"){
                                    //                 console.log(document.getElementsByTagName("iframe")[0].contentWindow.document);
                                    //                 if(typeof document.getElementsByTagName("iframe")[0].contentWindow.document!="undefined"){
                                    //                     console.log(document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("feedback"));
                                    //                     if(typeof document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("feedback")!="undefined" && document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("feedback")!=null){
                                    //                         document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("feedback").style.display="none";
                                    //                     }
                                    //                 }
                                    //             }

                                    //            // $("iframe").eq(0).contentWindow.eq(".captcha_icon_feedback").css("display","none");
                                    //         }
                                    //     },200);
                                    //回调函数：验证码页面关闭时回调
                                    var cbfn = function cbfn(retJson) {
                                        if (retJson.ret == 0) {
                                            $('#TCaptcha').hide();
                                            console.log('retJson', retJson);
                                            ticket = retJson.ticket;
                                            $('.alertsVerify .verifyBox').hide().eq(0).show();
                                            var aa = 59;
                                            publicData.verifyTimer = setInterval(function () {
                                                if (aa == 0) {
                                                    clearInterval(publicData.verifyTimer);
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
                                                url: ajaxLink + "/v1/api/campSell/sendSmsValidateCode?phoneNo=" + publicData.phoneNum + '&ticket=' + ticket,
                                                dataType: "json",
                                                success: function success(data) {
                                                    console.log(data);
                                                }
                                            });

                                            // 用户验证成功
                                            // document.getElementById("ticket").value = retJson.ticket;
                                            // document.getElementById("myform").submit();
                                        } else {
                                            $('#TCaptcha').hide();
                                            //用户关闭验证码页面，没有验证
                                        }
                                    };

                                    clearInterval(capTime);
                                    var capOption = { callback: cbfn, showHeader: true };
                                    capInit(document.getElementById("TCaptcha"), capOption);
                                    $('#TCaptcha').css({
                                        'display': 'block',
                                        'overflow': 'hidden',
                                        'position': 'fixed',
                                        'top': '0',
                                        'left': '0',
                                        'zIndex': '1000',
                                        'width': $(window).width(),
                                        'height': $(window).height()
                                    });
                                    $('#TCaptcha, #TCaptcha iframe').css('overflow', 'hidden');
                                }
                            }, 100);
                        }
                    }
                });
            } else {
                $('.alertBox .alerts').eq(6).html('手机号填写有误，请重新核对哦~').stop(true).fadeIn(200).delay(2000).fadeOut(200); //手机号输入错误
            }
        }
    },

    liJiVerifyAgain: function liJiVerifyAgain() {
        var me = this;
        var data = me.props.alertBox;
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
        if (myreg.test(publicData.phoneNum)) {
            //如果手机号格式正确
            $.ajax({
                type: "get",
                //url: "http://172.17.1.233:8080/v1/api/captcha/getTencentUrlForSms",
                url: ajaxLink + "/v1/api/captcha/getTencentUrlForSms",
                dataType: "json",
                success: function success(data) {
                    console.log(data);
                    if (data.result.code == 200) {
                        console.log('图形验证码', data);
                        $("#graphJs").attr("src", data.resp.url);
                        var capTime = setInterval(function () {
                            if (capInit != undefined) {
                                /*$('#TCaptcha, #TCaptcha iframe').css('overflow', 'hidden').on("touchmove",function(ev){
                                    ev = ev || event;
                                    if(ev.preventDefault){
                                        ev.preventDefault();
                                    }else{
                                        return false;
                                    }
                                });*/
                                //回调函数：验证码页面关闭时回调
                                var cbfn = function cbfn(retJson) {
                                    if (retJson.ret == 0) {
                                        $('#TCaptcha').hide();
                                        console.log('retJson', retJson);
                                        ticket = retJson.ticket;
                                        $('.alertsVerify .verifyBox').hide().eq(0).show();
                                        me.setState({
                                            leftTime: 60,
                                            againGetCodeShow: false
                                        });

                                        var aa = 59;
                                        publicData.verifyAgainTimer = setInterval(function () {
                                            if (aa == 0) {
                                                clearInterval(publicData.verifyAgainTimer);
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
                                            url: ajaxLink + "/v1/api/campSell/sendSmsValidateCode?phoneNo=" + publicData.phoneNum + '&ticket=' + ticket,
                                            dataType: "json",
                                            success: function success(data) {
                                                console.log(data);
                                            }
                                        });
                                    } else {
                                        $('#TCaptcha').hide();
                                        //用户关闭验证码页面，没有验证
                                    }
                                };

                                clearInterval(capTime);
                                var capOption = { callback: cbfn, showHeader: true };
                                capInit(document.getElementById("TCaptcha"), capOption);
                                $('#TCaptcha').css({
                                    'display': 'block',
                                    'overflow': 'hidden',
                                    'position': 'fixed',
                                    'top': '0',
                                    'left': '0',
                                    'zIndex': '1000',
                                    'width': $(window).width(),
                                    'height': $(window).height()
                                });
                                $('#TCaptcha, #TCaptcha iframe').css('overflow', 'hidden');
                            }
                        }, 100);
                    }
                }
            });
        } else {
            $('.alertBox .alerts').eq(6).html('手机号填写有误，请重新核对哦~').stop(true).fadeIn(200).delay(2000).fadeOut(200); //手机号输入错误
        }
    },

    /*getCode:function(){
        var me = this;
        var data = me.props.alertBox;
        /!*me.setState({
            leftTime:60,
            againGetCodeShow:false
        });*!/
        var aa = 59;
          $.ajax({
            type: "get",
            //url: "http://172.17.1.233:8080/v1/api/campSell/sendSmsValidateCode?phoneNo="+publicData.phoneNum +'&ticket='+ticket,
            url: ajaxLink + "/v1/api/campSell/sendSmsValidateCode?phoneNo="+publicData.phoneNum +'&ticket='+ticket,
            dataType: "json",
            success: function (data) {
                console.log(data);
                var timer = setInterval(function(){
                    if(aa == 0){
                        clearInterval(timer);
                        /!*me.setState({
                            againGetCodeShow:true
                        });*!/
                    }
                    me.setState({
                        leftTime: aa--
                    });
                }, 1000);
              }
        })
    },*/

    //点击验证
    goToVerify: function goToVerify() {
        var me = this;
        var data = me.props.alertBox;
        if ($.trim(me.refs.code.value) != '') {
            $.ajax({
                type: 'get',
                //url:'http://172.17.1.233:8080/v1/api/campSell/verifyCode?phoneNo='+publicData.phoneNum+'&code='+me.refs.code.value,
                url: ajaxLink + '/v1/api/campSell/verifyCode?phoneNo=' + publicData.phoneNum + '&code=' + me.refs.code.value,

                success: function success(data) {
                    console.log(data);
                    if (data.code == 200) {
                        $('.alertsVerify').hide();
                        publicData.outAppLogin = true;
                        // setCookie('appOutPhone', publicData.phoneNum, 1);
                        //setCookiePath("appOutPhone", publicData.phoneNum, 7, "/;domain=picooc.com");
                        setCookie("appOutPhone", publicData.phoneNum, 7);
                        //alert(getCookie('appOutPhone'));

                        if (getCookie('clickSource') == 'formMyself') {
                            //从点击我的弹得浮层
                            delCookie('clickSource');
                            window.location.href = 'myInfo.html' + window.location.search + "&phoneNo=" + publicData.phoneNum;
                        } else if (getCookie('clickSource') == 'formGoToBuy') {
                            //从点击立即购买弹得浮层
                            delCookie('clickSource');
                            window.location.href = 'confirmOrderOut.html' + window.location.search + '&classId=' + publicData.classId + '&phoneNo=' + publicData.phoneNum + "&isOwnPicooc=" + publicData.is_balance; //正常跳转
                        }

                        $('html, body').css('overflow', 'auto').off("touchmove");
                    } else {
                        publicData.outAppLogin = false;
                        $('.alertBox .alerts').eq(6).html('验证码输入错误').stop(true).fadeIn(200).delay(2000).fadeOut(200); //验证码输入错误
                    }
                },
                error: function error() {
                    $(".error-main-t").html(data.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            });
        }
    }

});

module.exports = ProductDetails_alertBox;

/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var PubSub = __webpack_require__(2);
var m = 1;
var mySwiper;
var ProductDetails_banner = React.createClass({
    displayName: "ProductDetails_banner",


    getInitialState: function getInitialState() {
        var me = this;

        return {
            initState: 0, //页面初始化状态
            nowType: '', //当前类型，默认A类
            bannerArr: [] //banner数组
        };
    },

    componentWillMount: function componentWillMount() {
        var me = this;
        var data = me.props.banner;

        var nowTypeNum = 0;
        for (var i = 0; i < data.resp.info.length; i++) {
            if (data.resp.info[i].hasStock) {
                nowTypeNum = i;
                break;
            }
        }

        var pictureStr = data.resp.info[nowTypeNum].inPicture;
        var pictureArr = pictureStr.split(',');
        me.setState({
            nowType: nowTypeNum,
            bannerArr: pictureArr
        });
    },
    componentDidMount: function componentDidMount() {

        var me = this;
        var data = me.props.banner;
        console.log('11111111111', me);
        mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal', //水平滑动
            //loop: true, //循环播放
            autoplay: 2000, //自动播放
            autoplayDisableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
            pagination: '.swiper-pagination' // 分页器
        });
        //轮播图小圆点转换为整数值；
        var $bannerPoint = $('.swiper-container .swiper-pagination .swiper-pagination-bullet');
        $bannerPoint.css("height", parseInt($bannerPoint.height()) + 'px');
        $bannerPoint.css("width", parseInt($bannerPoint.width()) + 'px');
        $bannerPoint.css("borderRadius", parseInt($bannerPoint.css('borderRadius')) + 'px');

        PubSub.subscribe("chooseType", function (msg, chooseType) {

            //alert('chooseType='+chooseType);
            var pictureStr = data.resp.info[chooseType].inPicture;
            var pictureArr = pictureStr.split(',');

            me.setState({
                nowType: chooseType,
                bannerArr: pictureArr
            });
            //$(me.refs.bannerBox).remove();
            console.log('zqqqqqqqqqqq', $(me.refs.bannerBox));
        });
        //

    },
    componentWillUpdate: function componentWillUpdate() {
        var me = this;
        //$('me.refs.bannerBox').remove();
        console.log(11, $(me.refs.bannerBox));
        //$("#bannerBox").remove();
        //$(".swiper-container .swiper-wrapper").empty();
        $(".swiper-pagination").empty();
        mySwiper.destroy(true, true);
    },
    componentDidUpdate: function componentDidUpdate() {
        //alert($(".swiper-container").html());

        mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal', //水平滑动
            //loop: true, //循环播放
            autoplay: 2000, //自动播放
            autoplayDisableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
            pagination: '.swiper-pagination' // 分页器
        });
        //轮播图小圆点转换为整数值；
        var $bannerPoint = $('.swiper-container .swiper-pagination .swiper-pagination-bullet');
        $bannerPoint.css("height", parseInt($bannerPoint.height()) + 'px');
        $bannerPoint.css("width", parseInt($bannerPoint.width()) + 'px');
        $bannerPoint.css("borderRadius", parseInt($bannerPoint.css('borderRadius')) + 'px');
    },
    render: function render() {
        var me = this;
        var data = me.props.banner;

        if (data.code == 200) {
            //$(".swiper-container").remove();
            var bannerArr = me.state.bannerArr;
            console.log(888, bannerArr);
            // var bannerArr = [1,2];
            var nowType = me.state.nowType;
            //var bannerStr ={};
            var list = [];
            var list2 = [];
            //  alert(list);
            // alert(bannerArr);
            bannerArr.map(function (item, index) {
                list.push(React.createElement(
                    "div",
                    { className: "col-xs-12 col-sm-12 swiper-slide", key: index },
                    React.createElement(
                        "a",
                        { href: "javascript:void(0);" },
                        React.createElement("img", { src: bannerArr[index] })
                    )
                ));
            });

            // for(var n=0;n<bannerArr.length;n++){
            //     list.push(
            //         <div className="col-xs-12 col-sm-12 swiper-slide" key={n}>
            //             <a href="javascript:void(0);">{bannerArr[n]}</a>
            //         </div>
            //     )
            //     list2.push(
            //         <span className="swiper-pagination-bullet"  key={n}></span>
            //     )
            // }
            //$('.swiper-container').html('');
            //alert("c:"+list.length);
            console.log("b:", list);

            //$(".swiper-container .swiper-slide").eq(0).remove();
            //$(".swiper-container .swiper-slide").eq($(".swiper-container .swiper-slide").length-1).remove();

            var bannerStr = React.createElement(
                "aside",
                { className: "row swiper-container" },
                React.createElement(
                    "div",
                    { className: "swiper-wrapper" },
                    list
                ),
                React.createElement("div", { className: "swiper-pagination" })
            );
        }

        console.log("a:", bannerStr);
        return (
            /*轮播图*/

            React.createElement(
                "div",
                { ref: "bannerBox" },
                bannerStr
            )
        );
    }

});

module.exports = ProductDetails_banner;

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var PubSub = __webpack_require__(2);
var ProductDetails_chooseFatburn = React.createClass({
    displayName: "ProductDetails_chooseFatburn",


    getInitialState: function getInitialState() {
        var me = this;
        return {
            nowType: '', //当前类型，默认A类
            inDesc: '', //商品描述
            userEvaluation: '' //用户评价
        };
    },

    componentWillMount: function componentWillMount() {
        var me = this;
        var data = me.props.chooseFatburn;

        var nowTypeNum = 0;
        for (var i = 0; i < data.resp.info.length; i++) {
            if (data.resp.info[i].hasStock) {
                nowTypeNum = i;
                break;
            }
        }

        var userEvaluation = data.resp.info[nowTypeNum].userEvaluation.split(',');
        var inDesc = data.resp.info[nowTypeNum].inDesc;
        me.setState({
            nowType: nowTypeNum,
            userEvaluation: userEvaluation,
            inDesc: inDesc
        });
    },
    componentDidMount: function componentDidMount() {
        var me = this;
        var data = me.props.chooseFatburn;
        PubSub.subscribe("chooseType", function (msg, chooseType) {

            var inDesc = data.resp.info[chooseType].inDesc;
            var userEvaluation = data.resp.info[chooseType].userEvaluation.split(',');
            me.setState({
                inDesc: inDesc,
                userEvaluation: userEvaluation
            });
        });
    },

    render: function render() {
        var me = this;
        var data = me.props.chooseFatburn;
        var chooseFatburnStr = "";
        if (data.code == 200) {

            var inDesc = me.state.inDesc;
            var userEvaluation = me.state.userEvaluation;
            //底部的商品详情图
            var strDesc = [];
            //var DescArr = JSON.parse(data.resp.good_desc);
            var strDesc2 = [];

            if (userEvaluation) {
                userEvaluation.map(function (item, index) {
                    strDesc2.push(React.createElement("img", { key: index, className: "commentDetail", src: userEvaluation[index] }));
                });
            }
            chooseFatburnStr = React.createElement(
                "div",
                null,
                React.createElement(
                    "aside",
                    { className: "choose detailOrComment detailOrComment1", ref: "detailBox" },
                    React.createElement("div", { id: "expandDetails", dangerouslySetInnerHTML: { __html: inDesc } })
                ),
                React.createElement(
                    "aside",
                    { className: "comments detailOrComment", style: { display: "none" }, ref: "commentBox" },
                    strDesc2
                )
            );
        }

        return (
            /*选择燃脂营*/
            React.createElement(
                "div",
                null,
                chooseFatburnStr
            )
        );
    }

});

module.exports = ProductDetails_chooseFatburn;

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var PubSub = __webpack_require__(2);
var ProductDetails_productDesc = React.createClass({
    displayName: "ProductDetails_productDesc",


    getInitialState: function getInitialState() {
        var me = this;
        me.productDesc();
        return {
            hasChoose: 0, //是否已选班级类型
            nowType: '', //当前类型，默认A类
            nowTypeTitle: '', //当前类型Title
            nowClass: '', //当前班级 默认第一个
            nowClassName: '', //当前班级名称
            month: '',
            day: ''
        };
    },

    componentWillMount: function componentWillMount() {
        var me = this;
        var data = me.props.productDesc;

        var nowTypeNum = 0;
        for (var i = 0; i < data.resp.info.length; i++) {
            if (data.resp.info[i].hasStock) {
                nowTypeNum = i;
                break;
            }
        }

        //获取第一个商品类型的信息
        var info1 = data.resp.info[nowTypeNum];
        console.log("info1", info1);
        var info1ClassesArr = info1.classes;
        var nowIndex = 0;
        for (var i = 0; i < info1ClassesArr.length; i++) {
            //有库存
            if (info1ClassesArr[i].sellOut == false) {
                nowIndex = i;
                break;
            }
        }
        me.setState({
            nowType: nowTypeNum,
            nowTypeTitle: info1.gradeName,
            nowClass: nowIndex,
            nowClassName: info1ClassesArr[nowIndex].className
        });
        if (typeof nowIndex == 'number') {
            //有
            //有库存
            var beginTimeArr = info1ClassesArr[nowIndex].beginTime.split('-'); //开营时间
            me.setState({
                hasChoose: 1,
                month: beginTimeArr[0],
                day: beginTimeArr[1]
            });
        }
    },

    componentDidMount: function componentDidMount() {
        var me = this;
        var data = me.props.productDesc;

        PubSub.subscribe("chooseType", function (msg, chooseType) {

            //获取第一个商品类型的信息
            var info1 = data.resp.info[chooseType];
            console.log("info1", info1);
            var info1ClassesArr = info1.classes;
            var nowIndex;
            for (var i = 0; i < info1ClassesArr.length; i++) {
                //有库存
                if (info1ClassesArr[i].sellOut == false) {
                    nowIndex = i;
                    break;
                }
            }
            me.setState({
                nowType: chooseType,
                nowTypeTitle: info1.gradeName,
                nowClass: nowIndex,
                nowClassName: info1ClassesArr[nowIndex].className
            });
            if (typeof nowIndex == 'number') {
                //有
                //有库存
                var beginTimeArr = info1ClassesArr[nowIndex].beginTime.split('-'); //开营时间
                me.setState({
                    hasChoose: 1,
                    month: beginTimeArr[0],
                    day: beginTimeArr[1]
                });
            }
        });

        PubSub.subscribe("chooseClass", function (msg, chooseClass) {

            //获取第一个商品类型的信息
            var info1 = data.resp.info[me.state.nowType];
            console.log("info1", info1);
            var info1ClassesArr = info1.classes;

            var beginTimeArr = info1ClassesArr[chooseClass].beginTime.split('-'); //开营时间
            me.setState({
                nowTypeTitle: info1.gradeName,
                nowClass: chooseClass,
                nowClassName: info1ClassesArr[chooseClass].className,
                hasChoose: 1,
                month: beginTimeArr[0],
                day: beginTimeArr[1]
            });
        });
    },

    render: function render() {
        var me = this;
        var data = me.props.productDesc;
        var productDescStr = "";
        console.log('eeee', me);
        if (data.code == 200) {

            /*nowTypeTitle:'', //当前类型Title
             nowClass:'',//当前班级 默认第一个
             nowClassName:'',//当前班级名称
             month:'',
             day:''*/

            var nowTypeTitle = me.state.nowTypeTitle;
            var hasChoose = me.state.hasChoose;
            var nowClass = me.state.nowClass;
            var nowClassName = me.state.nowClassName;
            var month = me.state.month;
            var day = me.state.day;

            var hasChooseStr = '';
            if (hasChoose == 0) {
                hasChooseStr = '请选择 班级类型';
            } else if (hasChoose == 1) {
                hasChooseStr = React.createElement(
                    "p",
                    null,
                    "\u5DF2\u9009\uFF1A",
                    React.createElement(
                        "span",
                        null,
                        nowClassName
                    ),
                    "\xA0\xA0",
                    React.createElement(
                        "span",
                        null,
                        month,
                        "\u6708",
                        day,
                        "\u65E5"
                    )
                );
            }

            productDescStr = React.createElement(
                "aside",
                { className: "row desc" },
                React.createElement(
                    "article",
                    { className: "row desc1" },
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 content" },
                        React.createElement(
                            "h3",
                            null,
                            nowTypeTitle
                        )
                    )
                ),
                React.createElement(
                    "article",
                    { className: "row tabSelected", onClick: me.tabSelected },
                    React.createElement(
                        "div",
                        { className: "col-xs-10 col-sm-10", ref: "left" },
                        hasChooseStr
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-2 col-sm-2 more", ref: "right" },
                        React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/more.png" })
                    )
                ),
                React.createElement(
                    "article",
                    { className: "row tabToggle" },
                    React.createElement(
                        "div",
                        { className: "col-xs-6 col-sm-6 leftTab tabActive aboutTab", onClick: me.tabLeftFunction, ref: "left" },
                        React.createElement(
                            "span",
                            null,
                            "\u5546\u54C1\u8BE6\u60C5"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-6 col-sm-6 rightTab aboutTab", onClick: me.tabRightFunction, ref: "right" },
                        "\u5546\u54C1\u8BC4\u4EF7"
                    )
                )
            );
        }
        return (
            /*产品描述*/
            React.createElement(
                "div",
                null,
                productDescStr
            )
        );
    },

    //productDesc
    productDesc: function productDesc() {
        var me = this;
    },

    //点击切换tab标签；商品详情--商品评价
    tabLeftFunction: function tabLeftFunction(event) {
        var me = this;
        setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_ShangPinXiangQing); //商品详情
        $(me.refs.left).addClass('tabActive');
        $(me.refs.right).removeClass('tabActive');
        $('.detailOrComment').hide().eq(0).show();
    },
    tabRightFunction: function tabRightFunction() {
        var me = this;
        setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_ShangPinPingJia); //商品评价
        $(me.refs.right).addClass('tabActive');
        $(me.refs.left).removeClass('tabActive');
        $('.detailOrComment').hide().eq(1).show();
    },
    //点击显示更多
    tabSelected: function tabSelected() {
        var me = this;
        $('.boxSale .bg, .sale .detailInfo').show();
        $('html, body').css('overflow', 'hidden').on("touchmove", function (ev) {
            ev = ev || event;
            if (ev.preventDefault) {
                ev.preventDefault();
            } else {
                return false;
            }
        });
    }

});

module.exports = ProductDetails_productDesc;

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var PubSub = __webpack_require__(2);

var nowDate;
var userAgentInfo = navigator.userAgent;
var ProductDetails_productState = React.createClass({
    displayName: "ProductDetails_productState",


    getInitialState: function getInitialState() {
        var me = this;
        return {
            nowType: '', //当前类型，默认A类
            nowClass: '', //当前班级 默认第一个
            originPrice: '',
            curentPrice: '',
            especialPrice: '',
            stock: '', //初始化库存
            sellOut: '',
            limited: '', //限时特价
            limitedEndtime: '', //显示特价结束时间
            day: '',
            hour: '',
            minute: '',
            second: ''
        };
    },

    componentWillMount: function componentWillMount() {
        var me = this;
        var data = me.props.productState;
        //alert(data.resp.nowDate);
        nowDate = data.resp.nowDate;

        if (getParamByUrl("os") == "iOS" || !!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            // 判断如果是ios，显示2016/11/14的格式；
            nowDate = nowDate.replace(/-/g, "/");
        }
        nowDate = parseInt(new Date(nowDate) / 1000);

        setInterval(function () {
            nowDate++;
            //console.log('nowDate='+nowDate);
        }, 1000);

        var nowTypeNum = 0;
        for (var i = 0; i < data.resp.info.length; i++) {
            if (data.resp.info[i].hasStock) {
                nowTypeNum = i;
                break;
            }
        }

        var info1 = data.resp.info[nowTypeNum]; //类型
        console.log("info1", info1.classes);
        var info1ClassesArr = info1.classes; //当前类型下所有班级
        var nowIndex = 0; //当前类型下的第一个班级
        for (var i = 0; i < info1ClassesArr.length; i++) {
            //有库存
            if (info1ClassesArr[i].sellOut == false) {
                nowIndex = i;
                break;
            }
        }

        me.setState({
            nowType: nowTypeNum,
            nowClass: nowIndex,
            originPrice: info1ClassesArr[nowIndex].originPrice,
            curentPrice: info1ClassesArr[nowIndex].curentPrice,
            especialPrice: info1ClassesArr[nowIndex].especialPrice,
            stock: info1ClassesArr[nowIndex].stock,
            sellOut: info1ClassesArr[nowIndex].sellOut,
            limited: info1ClassesArr[nowIndex].limited,
            limitedEndtime: info1ClassesArr[nowIndex].limitedEndtime
        });
        //alert(me.state.nowClass);

    },

    componentDidMount: function componentDidMount() {

        var me = this;
        var data = me.props.productState;
        console.log('me', me);

        if (me.state.limited == 1) {
            //限时特价商品时间展示

            var limitedEndtime = me.state.limitedEndtime;
            //var day,hour,minute,second;
            if (getParamByUrl("os") == "iOS" || !!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                // 判断如果是ios，显示2016/11/14的格式；
                limitedEndtime = limitedEndtime.replace(/-/g, "/");
                //nowDate = nowDate.replace(/-/g,"/");
            } else {}
            var intDiff = new Date(limitedEndtime);
            //console.log(parseInt(intDiff/1000));
            console.log(nowDate);
            intDiff = parseInt(intDiff / 1000) - nowDate; //倒计时总秒数量
            console.log('intDiff=' + intDiff);

            var aboutTimerInit, aboutTimerType, aboutTimerClass;
            aboutTimerInit = setInterval(function () {
                console.log(111);
                if (intDiff > 0) {
                    var day = Math.floor(intDiff / (60 * 60 * 24));
                    var hour = Math.floor(intDiff / (60 * 60)) - day * 24;
                    var minute = Math.floor(intDiff / 60) - day * 24 * 60 - hour * 60;
                    var second = Math.floor(intDiff) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
                    day = (day < 10 ? '0' : '') + day;
                    hour = (hour < 10 ? '0' : '') + hour;
                    minute = (minute < 10 ? '0' : '') + minute;
                    second = (second < 10 ? '0' : '') + second;
                    me.setState({
                        day: day,
                        hour: hour,
                        minute: minute,
                        second: second
                    });
                    intDiff--;
                } else if (intDiff == 0) {
                    window.location.reload(); //倒计时为0时，刷新整个页面
                    clearInterval(aboutTimerInit); //清除定时器
                }
            }, 1000);
        }

        //当publish的时候才会执行subscribe
        me.sectionValue = PubSub.subscribe("chooseType", function (msg, section) {
            clearInterval(aboutTimerInit); //清除定时器
            clearInterval(aboutTimerType); //清除定时器
            clearInterval(aboutTimerClass); //清除定时器
            console.log('me.state.day=' + me.state.day);
            var info1 = data.resp.info[section]; //类型
            //me.setState({
            //    nowType:section
            //});
            //info1 = data.resp.info[section][0];//类型
            var info1ClassesArr = info1.classes; //当前类型下所有班级
            var nowIndex = 0; //当前类型下的第一个班级
            for (var i = 0; i < info1ClassesArr.length; i++) {
                //有库存
                if (info1ClassesArr[i].sellOut == false) {
                    nowIndex = i;
                    break;
                }
            }
            me.setState({
                nowType: section,
                nowClass: nowIndex,
                originPrice: info1ClassesArr[nowIndex].originPrice,
                curentPrice: info1ClassesArr[nowIndex].curentPrice,
                especialPrice: info1ClassesArr[nowIndex].especialPrice,
                stock: info1ClassesArr[nowIndex].stock,
                sellOut: info1ClassesArr[nowIndex].sellOut,
                limited: info1ClassesArr[nowIndex].limited,
                limitedEndtime: info1ClassesArr[nowIndex].limitedEndtime
            });

            if (me.state.limited == 1) {
                //限时特价商品时间展示
                //var nowDate = data.resp.nowDate;
                var limitedEndtime = me.state.limitedEndtime;
                //var day,hour,minute,second;
                if (getParamByUrl("os") == "iOS" || !!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                    // 判断如果是ios，显示2016/11/14的格式；
                    limitedEndtime = limitedEndtime.replace(/-/g, "/");
                    //nowDate = nowDate.replace(/-/g,"/");
                } else {}
                var intDiff = new Date(limitedEndtime);
                intDiff = parseInt(intDiff / 1000) - nowDate; //倒计时总秒数量
                console.log(intDiff);

                aboutTimerType = setInterval(function () {
                    console.log("section=" + section);
                    if (intDiff > 0) {
                        var day = Math.floor(intDiff / (60 * 60 * 24));
                        var hour = Math.floor(intDiff / (60 * 60)) - day * 24;
                        var minute = Math.floor(intDiff / 60) - day * 24 * 60 - hour * 60;
                        var second = Math.floor(intDiff) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
                        day = (day < 10 ? '0' : '') + day;
                        hour = (hour < 10 ? '0' : '') + hour;
                        minute = (minute < 10 ? '0' : '') + minute;
                        second = (second < 10 ? '0' : '') + second;
                        me.setState({
                            day: day,
                            hour: hour,
                            minute: minute,
                            second: second
                        });
                        intDiff--;
                    } else if (intDiff == 0) {
                        window.location.reload(); //倒计时为0时，刷新整个页面
                        clearInterval(aboutTimerType); //清除定时器
                    }
                }, 1000);
            }
        });

        //当publish的时候才会执行subscribe
        PubSub.subscribe("chooseClass", function (msg, section) {
            clearInterval(aboutTimerInit); //清除定时器
            clearInterval(aboutTimerType); //清除定时器
            clearInterval(aboutTimerClass); //清除定时器
            console.log('me.state.day=' + me.state.day);
            var info1 = data.resp.info[me.state.nowType]; //类型
            var info1ClassesArr = info1.classes; //当前类型下所有班级
            var nowIndex = 0; //当前类型下的第一个班级
            for (var i = 0; i < info1ClassesArr.length; i++) {
                //有库存
                if (info1ClassesArr[i].sellOut == false) {
                    nowIndex = i;
                    break;
                }
            }
            me.setState({
                nowClass: section,
                originPrice: info1ClassesArr[section].originPrice,
                curentPrice: info1ClassesArr[section].curentPrice,
                especialPrice: info1ClassesArr[section].especialPrice,
                stock: info1ClassesArr[section].stock,
                sellOut: info1ClassesArr[section].sellOut,
                limited: info1ClassesArr[section].limited,
                limitedEndtime: info1ClassesArr[section].limitedEndtime
            });

            if (me.state.limited == 1) {
                //限时特价商品时间展示
                //var nowDate = data.resp.nowDate;
                var limitedEndtime = me.state.limitedEndtime;
                //var day,hour,minute,second;
                if (getParamByUrl("os") == "iOS" || !!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                    // 判断如果是ios，显示2016/11/14的格式；
                    limitedEndtime = limitedEndtime.replace(/-/g, "/");
                    //nowDate = nowDate.replace(/-/g,"/");
                } else {}
                var intDiff = new Date(limitedEndtime);
                intDiff = parseInt(intDiff / 1000) - nowDate; //倒计时总秒数量
                console.log(intDiff);

                aboutTimerClass = setInterval(function () {
                    console.log("section=" + section);
                    if (intDiff > 0) {
                        var day = Math.floor(intDiff / (60 * 60 * 24));
                        var hour = Math.floor(intDiff / (60 * 60)) - day * 24;
                        var minute = Math.floor(intDiff / 60) - day * 24 * 60 - hour * 60;
                        var second = Math.floor(intDiff) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
                        day = (day < 10 ? '0' : '') + day;
                        hour = (hour < 10 ? '0' : '') + hour;
                        minute = (minute < 10 ? '0' : '') + minute;
                        second = (second < 10 ? '0' : '') + second;
                        me.setState({
                            day: day,
                            hour: hour,
                            minute: minute,
                            second: second
                        });
                        intDiff--;
                    } else if (intDiff == 0) {
                        window.location.reload(); //倒计时为0时，刷新整个页面
                        clearInterval(aboutTimerClass); //清除定时器
                    }
                }, 1000);
            }
        });
        //alert(me.state.nowType);


        //productDetails_saleState页面：点击立即购买时，库存变为0
        PubSub.subscribe("noStock", function (msg) {
            me.setState({
                stock: 0
            });
        });
        PubSub.subscribe("sellOut", function (msg) {
            me.setState({
                sellOut: true
            });
        });
    },
    componentWillUpdate: function componentWillUpdate() {
        //state变化后执行
        var me = this;
        var data = me.props.productState;
    },

    render: function render() {

        var me = this;
        var data = me.props.productState;
        var productStateStr = "";
        if (data.code == 200) {

            var nowClass = me.state.nowClass;
            var originPrice = me.state.originPrice;
            var curentPrice = me.state.curentPrice;
            var especialPrice = me.state.especialPrice;
            var stock = me.state.stock;
            var sellOut = me.state.sellOut;
            var limited = me.state.limited;
            var day = me.state.day;
            var hour = me.state.hour;
            var minute = me.state.minute;
            var second = me.state.second;

            console.log('me.state.nowType=' + me.state.nowType);
            console.log('me.state.nowClass=' + me.state.nowClass);

            productStateStr = React.createElement(
                "aside",
                { className: "row info" },
                React.createElement(
                    "div",
                    { className: "info1", style: { display: limited == 0 ? "block" : 'none' } },
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 infoLeft" },
                        React.createElement(
                            "span",
                            { className: "new-priceBox" },
                            "\xA5",
                            React.createElement(
                                "span",
                                { className: "new-price" },
                                limited == 1 ? especialPrice : curentPrice
                            )
                        ),
                        React.createElement(
                            "span",
                            { className: "old-priceBox", style: { display: limited == 1 ? originPrice == especialPrice ? "none" : 'inline-block' : originPrice == curentPrice ? "none" : 'inline-block' } },
                            React.createElement(
                                "del",
                                null,
                                "\u539F\u4EF7"
                            ),
                            React.createElement(
                                "del",
                                { className: "old-price" },
                                me.state.originPrice
                            ),
                            React.createElement(
                                "del",
                                null,
                                "\u5143"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 infoRight" },
                        React.createElement(
                            "div",
                            { className: "times status status3", style: { display: sellOut == false ? "block" : 'none' } },
                            React.createElement(
                                "p",
                                null,
                                "\u5269\u4F59:",
                                React.createElement(
                                    "span",
                                    { className: "num" },
                                    stock
                                ),
                                "\u5E2D"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "times status2", style: { display: sellOut == true ? "block" : 'none' } },
                            React.createElement(
                                "p",
                                null,
                                "\u62A2\u5149\u4E86\uFF5E"
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "info2", style: { display: me.state.limited == 1 ? "block" : 'none' } },
                    React.createElement(
                        "div",
                        { className: "value" },
                        React.createElement(
                            "span",
                            { className: "valueLogo" },
                            "\xA5"
                        ),
                        "\xA0",
                        React.createElement(
                            "span",
                            { className: "valueNum" },
                            limited == 1 ? especialPrice : curentPrice
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "teJia" },
                        React.createElement(
                            "span",
                            { className: "priceNew" },
                            "\u9650\u65F6\u7279\u4EF7"
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "del",
                            { className: "priceOld" },
                            React.createElement(
                                "del",
                                null,
                                "\u539F\u4EF7"
                            ),
                            React.createElement(
                                "del",
                                { className: "num" },
                                originPrice
                            ),
                            React.createElement(
                                "del",
                                null,
                                "\u5143"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "leftTime" },
                        React.createElement(
                            "p",
                            { className: "space" },
                            React.createElement(
                                "span",
                                { className: "" },
                                "\u8DDD\u7ED3\u675F\u8FD8\u5269"
                            )
                        ),
                        React.createElement(
                            "p",
                            { className: "space" },
                            React.createElement(
                                "span",
                                { style: { display: parseInt(me.state.day) > 0 ? "inline-block" : 'none' } },
                                React.createElement(
                                    "span",
                                    { className: "num" },
                                    day
                                ),
                                "\u5929"
                            ),
                            React.createElement(
                                "span",
                                { className: "num" },
                                hour
                            ),
                            "\u65F6",
                            React.createElement(
                                "span",
                                { className: "num" },
                                minute
                            ),
                            "\u5206",
                            React.createElement(
                                "span",
                                { className: "num" },
                                second
                            ),
                            "\u79D2"
                        )
                    )
                )
            );
        }
        return (
            /*产品状态*/
            React.createElement(
                "div",
                null,
                productStateStr
            )
        );
    }

});

module.exports = ProductDetails_productState;

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var PubSub = __webpack_require__(2);
var buyFlag = true; //防止多次点击立即购买
var is_balance = getParamByUrl('innerToOut') == 1 ? 1 : 0; //是否有秤，app外打开默认无秤，app内低版本跳转之后打开，默认是有秤；

var changeNoStock = false;
var ProductDetails_saleState = React.createClass({
    displayName: "ProductDetails_saleState",


    getInitialState: function getInitialState() {
        var me = this;
        return {
            info: '', //所有班级信息
            nowType: "", //当前类型，默认A类
            gradeName: '', //当前类型名称
            info1ClassesArr: '', //当前类型下所有班级
            nowClass: '', //当前班级 默认第一个
            nowClassName: '', //当前班级名称
            originPrice: '',
            curentPrice: '',
            especialPrice: '',
            stock: '', //初始化库存
            sellOut: '', //真正售罄
            limited: '', //限时特价
            headPicture: '' //商品头图

        };
    },
    componentWillMount: function componentWillMount() {

        var me = this;
        var data = me.props.saleState;

        var nowTypeNum = 0;
        for (var i = 0; i < data.resp.info.length; i++) {
            if (data.resp.info[i].hasStock) {
                nowTypeNum = i;
                break;
            }
        }

        var info1 = data.resp.info[nowTypeNum]; //类型
        var headPicture = data.resp.info[nowTypeNum].inPicture.split(',')[0];
        var info1ClassesArr = info1.classes; //当前类型下所有班级
        var nowIndex = 0; //当前类型下的第一个班级
        for (var i = 0; i < info1ClassesArr.length; i++) {
            //有库存
            if (info1ClassesArr[i].sellOut == false) {
                nowIndex = i;
                break;
            }
        }

        me.setState({
            nowType: nowTypeNum,
            info: data.resp.info,
            gradeName: data.resp.info[nowTypeNum].gradeName,
            info1ClassesArr: info1ClassesArr,
            nowClass: nowIndex,
            nowClassName: info1ClassesArr[nowIndex].className,
            originPrice: info1ClassesArr[nowIndex].originPrice,
            curentPrice: info1ClassesArr[nowIndex].curentPrice,
            especialPrice: info1ClassesArr[nowIndex].especialPrice,
            stock: info1ClassesArr[nowIndex].stock,
            sellOut: info1ClassesArr[nowIndex].sellOut,
            limited: info1ClassesArr[nowIndex].limited,
            headPicture: headPicture
        });
    },
    render: function render() {
        var deviceType = isMobile();
        var me = this;
        var data = me.props.saleState;
        var saleState = '';
        if (data.code == 200) {
            publicData.is_balance = is_balance;

            var info = me.state.info;
            console.log('info', info);
            var nowType = me.state.nowType;
            var info1ClassesArr = me.state.info1ClassesArr;
            var nowClass = me.state.nowClass;

            var gradeName = me.state.gradeName;
            var nowClassName = me.state.nowClassName;
            var originPrice = me.state.originPrice;
            var curentPrice = me.state.curentPrice;
            var especialPrice = me.state.especialPrice;
            var stock = me.state.stock;
            var sellOut = me.state.sellOut;
            var limited = me.state.limited;
            var headPicture = me.state.headPicture;

            console.log('is_balance=' + is_balance);

            //最终传给后台的classId
            //alert(info[nowType].classes[nowClass].classId);
            publicData.classId = info[nowType].classes[nowClass].classId;

            var info1Classes = [];
            var beginTimes = [];
            var immediatelyBuyStyle;

            //大类显示规则
            info.map(function (item, index) {
                var style = 'chooseText';
                var finalStyle;
                if (limited == 1) {
                    //checkedLimit
                    finalStyle = index == me.state.nowType ? style + ' checkedLimit' : style;
                } else {
                    finalStyle = index == me.state.nowType ? style + ' checked' : style;
                    /*alert(changeNoStock);
                    if(changeNoStock == true){
                        alert(1);
                        finalStyle = index== me.state.nowType?style+' noStock': style;
                    }else{
                        alert(2);
                        finalStyle = index== me.state.nowType?style+' checked': style;
                    }*/
                }
                //var finalStyle = index== me.state.nowType?style+' checked': style;
                var noStock = true;
                if (info[index].hasStock == false) {
                    finalStyle += ' noStock';
                }
                /*for(var i=0; i<info[index].classes.length; i++){
                    if(info[index].classes[i].stock != 0){
                        noStock = false;
                      }
                }
                if(noStock == true){
                    finalStyle = finalStyle +' noStock';
                }*/

                var showYouHuiLogo = false;
                for (var i = 0; i < info[index].classes.length; i++) {
                    if (info[index].classes[i].limited == 1 && info[index].classes[i].sellOut == false) {
                        showYouHuiLogo = true;
                    }
                }

                info1Classes.push(

                /*<div className="col-xs-3 col-sm-3 aboutthis">
                  </div>*/
                React.createElement(
                    "span",
                    { className: finalStyle, key: index, "data-index": index, onClick: item.hasStock == true ? me.checkClass.bind(me, index) : "" },
                    info[index].className,
                    React.createElement("img", { className: "youHui", style: { display: info[index].hasLimit == true && item.hasStock == true && showYouHuiLogo ? 'block' : 'none' }, src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/youHui.png", alt: "" })
                ));
            });

            //开营时间显示规则

            info[nowType].classes.map(function (item, index) {
                var style = 'chooseText';
                var isClickAble = true;
                var finalStyle;
                if (limited == 1) {
                    //checkedLimit
                    finalStyle = index == me.state.nowClass ? style + ' checkedLimit' : style;
                } else {
                    finalStyle = index == me.state.nowClass ? style + ' checked' : style;
                    /*if(changeNoStock == true){
                        finalStyle = index== me.state.nowClass?style+' noStock': style;
                    }else{
                        finalStyle = index== me.state.nowClass?style+' checked': style;
                    }*/
                    /*if(changeNoStock == true){
                        if(index== me.state.nowClass){
                            isClickAble = false;
                            finalStyle = style+' noStock';
                        }else{
                            finalStyle = style;
                        }
                    }else{
                        if(index== me.state.nowClass){
                            finalStyle = style+' checked';
                        }else{
                            finalStyle = style;
                        }
                    }*/
                }
                if (info[nowType].classes[index].sellOut == true) {
                    isClickAble = false;
                    //finalStyle = index== me.state.nowType?style+' noStock': style;
                    finalStyle += ' noStock';
                }
                //alert(nowType);
                //alert(index);
                var beginTime = info[nowType].classes[index].beginTime.split('-');
                beginTimes.push(React.createElement(
                    "span",
                    { className: finalStyle, key: index, "data-index": index, onClick: isClickAble == false ? "" : me.checkBeginTime.bind(me, index) },
                    beginTime[0],
                    "\u6708",
                    beginTime[1],
                    "\u65E5",
                    React.createElement("img", { className: "youHui", style: { display: info[nowType].classes[index].limited == 1 && isClickAble ? 'block' : 'none' }, src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/youHui.png", alt: "" })
                ));
            });

            //立即购买显示规则  (isClickAble==true)?(me.checkBeginTime.bind(me, index)):''  (limited==1)?"state6":"state5"
            //2017年8月11日15:02:40 设置开售提醒去掉了
            /*var buyOrWarning = false;
            var outApp = false;
            if ((info.length == 1) && (info1ClassesArr.length == 1) && (info[0].hasSale == false)) {
                buyOrWarning = true;
                if (isOutApp() && (getParamByUrl('webver') > 1)) {
                    outApp = true;
                }
            }*/
            if (limited == 1) {
                if (sellOut == true) {
                    immediatelyBuyStyle = "state7"; //售罄：灰色背景
                } else {
                    immediatelyBuyStyle = "state6"; //限时特价：红色背景
                }
            } else {
                if (sellOut == true) {
                    immediatelyBuyStyle = "state7"; //售罄：灰色背景
                } else {
                    immediatelyBuyStyle = "state5"; //正常状态
                }
            }

            //是否有秤的样式
            var isWeightStyle = saleState = React.createElement(
                "div",
                { className: "boxSale", style: { display: "block" } },
                React.createElement("div", { className: "bg", style: { display: "none" } }),
                React.createElement(
                    "aside",
                    { className: "row sale" },
                    React.createElement(
                        "div",
                        { className: limited == 1 ? "col-xs-12 col-sm-12 detailInfo teJiabg" : "col-xs-12 col-sm-12 detailInfo", style: { display: "none" } },
                        React.createElement("img", { className: "close", onClick: me.closeDetailInfo, src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/close.png " }),
                        React.createElement(
                            "aside",
                            { className: "row good" },
                            React.createElement(
                                "div",
                                { className: "row col-xs-12 col-sm-12 aboutInfo" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-4 col-sm-4 infoImg" },
                                    React.createElement("img", { src: headPicture })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-8 col-sm-8 infoDesc" },
                                    React.createElement(
                                        "div",
                                        { className: "goodsName" },
                                        React.createElement(
                                            "p",
                                            null,
                                            gradeName
                                        )
                                    ),
                                    React.createElement(
                                        "p",
                                        { className: "price" },
                                        React.createElement(
                                            "span",
                                            { className: limited == 1 ? "newPriceLimit" : "newPrice" },
                                            "\xA5",
                                            limited == 1 ? especialPrice : curentPrice
                                        ),
                                        React.createElement(
                                            "span",
                                            { className: "oldPrice", style: { display: limited == 1 ? especialPrice == originPrice ? "none" : 'inline-block' : curentPrice == originPrice ? "none" : 'inline-block' } },
                                            React.createElement(
                                                "del",
                                                null,
                                                "\xA5"
                                            ),
                                            React.createElement(
                                                "del",
                                                null,
                                                originPrice
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        "p",
                                        { className: limited == 1 ? "leftNumLimit" : "leftNum" },
                                        "\u5269\u4F59\uFF1A",
                                        stock,
                                        "\u5E2D"
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "type row" },
                                React.createElement(
                                    "p",
                                    { className: "col-xs-12 col-sm-12 title" },
                                    "\u9009\u62E9\u73ED\u7EA7"
                                ),
                                info1Classes
                            ),
                            React.createElement(
                                "div",
                                { className: "type row aboutBeginTime" },
                                React.createElement(
                                    "p",
                                    { className: "col-xs-12 col-sm-12 title" },
                                    "\u5F00\u8425\u65F6\u95F4"
                                ),
                                beginTimes
                            ),
                            React.createElement(
                                "div",
                                { className: "type row", style: { display: isOutApp() == true ? 'block' : 'none' } },
                                React.createElement(
                                    "p",
                                    { className: "col-xs-12 col-sm-12 title" },
                                    "\u662F\u5426\u6709\u79E4"
                                ),
                                React.createElement(
                                    "span",
                                    { className: sellOut == true ? "chooseText noStock" : limited == 1 ? "chooseText checkedLimit" : "chooseText checked", ref: "noWeight", onClick: sellOut == true ? "" : me.noWeight },
                                    "\u65E0\u79E4",
                                    React.createElement("img", { className: "youHui", style: { display: limited == 1 && sellOut == false ? 'block' : 'none' }, src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/youHui.png" })
                                ),
                                React.createElement(
                                    "span",
                                    { className: sellOut == true ? "chooseText noStock" : "chooseText", ref: "haveWeight", onClick: sellOut == true ? "" : me.haveWeight },
                                    "\u6709\u79E4",
                                    React.createElement("img", { className: "youHui", style: { display: 'none' }, src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/youHui.png" })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "type row", style: { display: getParamByUrl('innerToOut') == 1 ? 'block' : 'none' } },
                                React.createElement(
                                    "p",
                                    { className: "col-xs-12 col-sm-12 title" },
                                    "\u662F\u5426\u6709\u79E4"
                                ),
                                React.createElement(
                                    "span",
                                    { className: sellOut == true ? "chooseText noStock" : limited == 1 ? "chooseText checkedLimit" : "chooseText checked", ref: "haveWeightInner", onClick: sellOut == true ? "" : me.haveWeightInner },
                                    "\u6709\u79E4",
                                    React.createElement("img", { className: "youHui", style: { display: limited == 1 && sellOut == false ? 'block' : 'none' }, src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/youHui.png" })
                                ),
                                React.createElement(
                                    "span",
                                    { className: sellOut == true ? "chooseText noStock" : "chooseText", ref: "noWeightInner", onClick: sellOut == true ? "" : me.noWeightInner },
                                    "\u65E0\u79E4",
                                    React.createElement("img", { className: "youHui", style: { display: 'none' }, src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/youHui.png" })
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-3 col-sm-3 service", style: { display: "block" }, onClick: isOutApp() == true || getParamByUrl('innerToOut') == 1 ? me.outAppService : me.props.serviceFunction },
                        React.createElement("img", { src: limited == 1 ? "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/redNoMsg.png" : "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/greenNoMsg.png" }),
                        React.createElement("img", { src: limited == 1 ? "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/redHasMsg.png" : "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/greenHasMsg.png", style: { display: "none" } })
                    ),
                    React.createElement(
                        "a",
                        { href: "javascript:void(0);" },
                        React.createElement(
                            "div",
                            { className: "col-xs-9 col-sm-9 state" /*style={{ display: buyOrWarning == false ? "block" : "none" }}*/ },
                            React.createElement(
                                "span",
                                { className: immediatelyBuyStyle, onClick: sellOut == true ? "" : me.immediatelyBuy, ref: "buyBtn" },
                                "\u7ACB\u5373\u8D2D\u4E70"
                            )
                        )
                    )
                )
            );
        }

        return (
            /*售卖状态*/
            React.createElement(
                "div",
                null,
                saleState
            )
        );
    },
    closeDetailInfo: function closeDetailInfo() {
        $('.boxSale .bg, .sale .detailInfo').hide();
        $('html, body').css('overflow', 'auto').off("touchmove");
    },

    //选择班级
    checkClass: function checkClass(index) {
        buyFlag = true; //可以点击立即购买
        var me = this;

        //初始化显示是否有秤的状态
        is_balance = getParamByUrl('innerToOut') == 1 ? 1 : 0; //是否有秤，app外打开默认无秤，app内低版本跳转之后打开，默认是有秤；
        $(me.refs.haveWeight).removeClass('checkedLimit');
        $(me.refs.haveWeight).removeClass('checked');

        $(me.refs.noWeightInner).removeClass('checkedLimit');
        $(me.refs.noWeightInner).removeClass('checked');

        console.log('is_balance', is_balance);
        publicData.is_balance = is_balance;

        //alert(id);
        //var index = event.currentTarget.getAttribute("data-index");//设置埋点
        //
        //$(event.currentTarget).css("color","red");
        //var index = $(this).index();
        //alert(index);
        //$(this).addClass('checked');
        me.setState({
            nowType: index
        });

        PubSub.publish('chooseType', index); //大类

        var data = me.props.saleState;
        var info1 = data.resp.info[index]; //类型
        var headPicture = data.resp.info[index].inPicture.split(',')[0];
        var info1ClassesArr = info1.classes; //当前类型下所有班级
        var nowIndex = 0; //当前类型下的第一个班级
        for (var i = 0; i < info1ClassesArr.length; i++) {
            //有库存
            if (info1ClassesArr[i].sellOut == false) {
                nowIndex = i;
                break;
            }
        }

        me.setState({
            info: data.resp.info,
            gradeName: data.resp.info[index].gradeName,
            info1ClassesArr: info1ClassesArr,
            nowClass: nowIndex,
            nowClassName: info1ClassesArr[nowIndex].className,
            originPrice: info1ClassesArr[nowIndex].originPrice,
            curentPrice: info1ClassesArr[nowIndex].curentPrice,
            especialPrice: info1ClassesArr[nowIndex].especialPrice,
            stock: info1ClassesArr[nowIndex].stock,
            sellOut: info1ClassesArr[nowIndex].sellOut,
            limited: info1ClassesArr[nowIndex].limited,
            headPicture: headPicture
        });

        $(me.refs.haveWeight).children('img').hide();
        $(me.refs.noWeightInner).children('img').hide();
        if (info1ClassesArr[nowIndex].limited == 1) {

            $(me.refs.noWeight).addClass('checkedLimit');
            $(me.refs.noWeight).children('img').show();

            $(me.refs.haveWeightInner).addClass('checkedLimit');
            $(me.refs.haveWeightInner).children('img').show();
        } else {
            $(me.refs.noWeight).addClass('checked');
            $(me.refs.noWeight).children('img').hide();

            $(me.refs.haveWeightInner).addClass('checked');
            $(me.refs.haveWeightInner).children('img').hide();
        }
    },

    //选择开营时间
    checkBeginTime: function checkBeginTime(index) {
        buyFlag = true; //可以点击立即购买
        var me = this;

        //初始化显示是否有秤的状态
        is_balance = getParamByUrl('innerToOut') == 1 ? 1 : 0; //是否有秤，app外打开默认无秤，app内低版本跳转之后打开，默认是有秤；


        $(me.refs.noWeightInner).removeClass('checkedLimit');
        $(me.refs.noWeightInner).removeClass('checked');

        console.log('is_balance', is_balance);
        publicData.is_balance = is_balance;
        //alert(id);
        //var index = event.currentTarget.getAttribute("data-index");//设置埋点
        //
        //$(event.currentTarget).css("color","red");
        //var index = $(this).index();
        //alert(index);
        //$(this).addClass('checked');
        me.setState({
            nowClass: index
        });
        PubSub.publish('chooseClass', index);

        var data = me.props.saleState;
        var info1 = data.resp.info[me.state.nowType]; //类型
        var headPicture = data.resp.info[me.state.nowType].inPicture.split(',')[0];
        var info1ClassesArr = info1.classes; //当前类型下所有班级
        var nowIndex = 0; //当前类型下的第一个班级
        for (var i = 0; i < info1ClassesArr.length; i++) {
            //有库存
            if (info1ClassesArr[i].sellOut == false) {
                nowIndex = i;
                break;
            }
        }

        me.setState({
            info: data.resp.info,
            gradeName: data.resp.info[me.state.nowType].gradeName,
            info1ClassesArr: info1ClassesArr,
            nowClass: index,
            nowClassName: info1ClassesArr[index].className,
            originPrice: info1ClassesArr[index].originPrice,
            curentPrice: info1ClassesArr[index].curentPrice,
            especialPrice: info1ClassesArr[index].especialPrice,
            stock: info1ClassesArr[index].stock,
            sellOut: info1ClassesArr[index].sellOut,
            limited: info1ClassesArr[index].limited,
            headPicture: headPicture
        });

        $(me.refs.haveWeight).removeClass('checkedLimit');
        $(me.refs.haveWeight).removeClass('checked');

        $(me.refs.haveWeight).children('img').hide();
        $(me.refs.noWeightInner).children('img').hide();
        if (info1ClassesArr[index].limited == 1) {

            $(me.refs.noWeight).addClass('checkedLimit');
            $(me.refs.noWeight).children('img').show();

            $(me.refs.haveWeightInner).addClass('checkedLimit');
            $(me.refs.haveWeightInner).children('img').show();
        } else {
            $(me.refs.noWeight).addClass('checked');
            $(me.refs.noWeight).children('img').hide();

            $(me.refs.haveWeightInner).addClass('checked');
            $(me.refs.haveWeightInner).children('img').hide();
        }
    },

    //无秤
    noWeight: function noWeight() {
        var me = this;
        var limited = me.state.limited;
        if (limited == 1) {
            $(me.refs.noWeight).addClass('checkedLimit'); //第一个按钮增加限时特价背景
            $(me.refs.noWeight).children('img').show(); //第一个按钮增加优惠标志
            $(me.refs.haveWeight).removeClass('checkedLimit'); //第二个按钮移出限时特价背景
            $(me.refs.haveWeight).children('img').hide(); //第二个按钮移出优惠标志
        } else {
            $(me.refs.noWeight).addClass('checked');
            $(me.refs.haveWeight).removeClass('checked');

            $(me.refs.haveWeight).children('img').hide();
            $(me.refs.noWeight).children('img').hide();
        }
        is_balance = 0;
        publicData.is_balance = is_balance;
    },
    //有秤
    haveWeight: function haveWeight() {
        var me = this;
        var limited = me.state.limited;
        //alert(limited);
        if (limited == 1) {
            $(me.refs.haveWeight).addClass('checkedLimit');
            $(me.refs.noWeight).removeClass('checkedLimit');

            $(me.refs.haveWeight).children('img').show();
            $(me.refs.noWeight).children('img').hide();
        } else {
            $(me.refs.haveWeight).addClass('checked');
            $(me.refs.noWeight).removeClass('checked');

            $(me.refs.haveWeight).children('img').hide();
            $(me.refs.noWeight).children('img').hide();
        }
        is_balance = 1;
        publicData.is_balance = is_balance;
    },

    //无秤
    noWeightInner: function noWeightInner() {
        var me = this;
        var limited = me.state.limited;
        if (limited == 1) {
            $(me.refs.noWeightInner).addClass('checkedLimit');
            $(me.refs.noWeightInner).children('img').show(); //第一个按钮增加优惠标志
            $(me.refs.haveWeightInner).removeClass('checkedLimit');
            $(me.refs.haveWeightInner).children('img').hide(); //第二个按钮移出优惠标志
        } else {
            $(me.refs.noWeightInner).addClass('checked');
            $(me.refs.haveWeightInner).removeClass('checked');
        }
        is_balance = 0;
        publicData.is_balance = is_balance;
    },
    //有秤
    haveWeightInner: function haveWeightInner() {
        var me = this;
        var limited = me.state.limited;
        if (limited == 1) {
            $(me.refs.haveWeightInner).addClass('checkedLimit');
            $(me.refs.haveWeightInner).children('img').show(); //第一个按钮增加优惠标志
            $(me.refs.noWeightInner).removeClass('checkedLimit');
            $(me.refs.noWeightInner).children('img').hide(); //第二个按钮移出优惠标志
        } else {
            $(me.refs.haveWeightInner).addClass('checked');
            $(me.refs.noWeightInner).removeClass('checked');
        }
        is_balance = 1;
        publicData.is_balance = is_balance;
    },

    //立即购买service
    immediatelyBuy: function immediatelyBuy() {
        if (isMobile() == 'isPC') {
            $('.alertBox .alerts').eq(6).html('啊哦！暂时不支持电脑购买，请使用手机下单吧～').stop(true).fadeIn(200).delay(2000).fadeOut(200);
        } else {
            var me = this;
            var data = me.props.saleState;

            var info = me.state.info;
            console.log('info', info);
            var nowType = me.state.nowType;
            var info1ClassesArr = me.state.info1ClassesArr;
            var nowClass = me.state.nowClass;

            var gradeName = me.state.gradeName;
            var nowClassName = me.state.nowClassName;
            var originPrice = me.state.originPrice;
            var curentPrice = me.state.curentPrice;
            var especialPrice = me.state.especialPrice;
            var stock = me.state.stock;
            var sellOut = me.state.sellOut;
            var limited = me.state.limited;
            var headPicture = me.state.headPicture;

            if (buyFlag == true || buyFlag == false) {
                //暂时去掉点击立即购买防止多次点击
                buyFlag = false; //不可以点击立即购买
                setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_LiJiGouMai); //立即购买埋点
                var classId = me.state.info[me.state.nowType].classes[me.state.nowClass].classId;
                //alert(classId);outAppPhone

                if (isOutApp() == true || getParamByUrl('innerToOut') == 1) {
                    //如果是app外
                    // 判断是不是无痕浏览
                    try {
                        window.localStorage.foobar = "foobar";
                    } catch (_) {
                        alert("请取消浏览器无痕浏览再购买哦~");
                    }
                    console.log('APP外购买');
                    //需要提前定义cookie
                    if (publicData.outAppLogin == false) {
                        buyFlag = true; //再次点击立即购买还可以弹窗
                        PubSub.publish('outAppPhone', 'block'); //app外：用户没有登陆，则显示验证手机号弹窗
                        $('.alertsVerify .verifyBox').hide().eq(1).show(); //如果弹窗关闭，下次进来需要再次弹出输入手机号的弹框
                        $('.alertBox .alertsVerify .verifyBox .warning').hide().eq(0).show();
                        setCookie('clickSource', 'formGoToBuy', 1); //从点击立即购买弹得浮层

                        //禁止滚动条
                        $('html, body').css('overflow', 'hidden').on("touchmove", function (ev) {
                            ev = ev || event;
                            if (ev.preventDefault) {
                                ev.preventDefault();
                            } else {
                                return false;
                            }
                        });
                    } else {
                        //用户已登陆
                        if (me.state.sellOut == false) {
                            //当前库存不为0才可以购买

                            //电话号码需要修改

                            var urlStock = ajaxLink + '/v1/api/campSell/getClassStockOut' + window.location.search + '&classId=' + classId + '&phoneNo=' + getCookie('appOutPhone'); //获取商品库存状态
                            $.ajax({
                                type: "get",
                                url: urlStock,
                                dataType: "json",
                                success: function success(data) {
                                    console.log(4, data);
                                    console.log('urlStock', urlStock);
                                    if (data.result.code == 200) {
                                        //alert('data.resp=' + data.resp);
                                        console.log('库存data.resp=' + data.resp);
                                        if (data.resp == 1) {
                                            //$('.info .infoRight .times').hide().eq(5).show(); //库存：0          有未支付的订单
                                            me.setState({
                                                stock: 0
                                            });
                                            PubSub.publish('noStock'); //大类
                                            $('.alertBox .alerts').eq(2).stop(true).fadeIn(200).delay(2000).fadeOut(200); //已拍完，但还有人未付款
                                        } else if (data.resp == 2) {
                                            //库存：抢光了
                                            //$('.info .infoRight .times').hide().eq(4).show();
                                            //changeNoStock = true;
                                            me.setState({
                                                stock: 0,
                                                sellOut: true
                                                //limited:0
                                            });
                                            PubSub.publish('noStock'); //大类
                                            PubSub.publish('sellOut'); //真正售罄
                                            //$('.aboutBeginTime .chooseText').eq(me.state.nowClass).addClass('noStock').unbind('click');
                                            $('.alertBox .alerts').eq(3).stop(true).fadeIn(200).delay(2000).fadeOut(200); //手慢了，名额被抢光啦～
                                            //me.AppointmentOrReminder2(0,0,1,0,nextId);//状态切换为：预约下期；
                                        } /* else if (data.resp == 3 || data.resp == 5) { //3：表示支付成功； 5：提交订单但未支付
                                          $('.alertBox .alerts2').hide().eq(1).show();//遮罩显示:同一账号只能购买一次哦!请核对参营人员信息～
                                          $('.alerts2 .knowInner').unbind('click').click(function () {
                                          setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_BuNengGouMaiDuoCi);//不能购买多次燃脂营
                                          $('.alertBox .alerts2').eq(1).hide();//遮罩隐藏
                                          });
                                          } */else if (data.resp == 6) {
                                                //data.resp == 6  //只有主账号才能购买，使用者不能购买
                                                $('.alertBox .alerts2').hide().eq(2).show(); //遮罩显示
                                                $('.alerts2 .forSelfInner').unbind('click').click(function () {
                                                    setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_ZhuZhangHaoGouMai); //主账号购买
                                                    $('.alertBox .alerts2').eq(2).hide(); //遮罩隐藏
                                                });
                                            } else if (data.resp == 4) {
                                                //data.resp == 4 正常购买

                                                delCookie('chooseIndex'); //删除选择优惠券时定义的cookie
                                                // window.location.href = 'confirmOrderOut.html' + window.location.search + '&classId=' + classId + '&phoneNo=' + getCookie('appOutPhone') + "&is_balance=" + is_balance; //正常跳转

                                                // var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
                                                // //电话号码需要修改
                                                // if (ua.match(/MicroMessenger/i) == "micromessenger") {
                                                //     alert(getCookie('appOutPhone'));

                                                window.location.href = 'confirmOrderOut.html' + window.location.search + '&classId=' + classId + '&phoneNo=' + getCookie('appOutPhone') + "&isOwnPicooc=" + is_balance; //正常跳转
                                            } /*else if (data.resp == 3 || data.resp == 7) {//购买时间不能冲突
                                              $('.alertBox .alerts').eq(4).stop(true).fadeIn(200).delay(2000).fadeOut(200);
                                              } else if (data.resp == 5 || data.resp == 8) {//data.resp == 8 还有未支付的订单，不能买时间冲突的其他期
                                              $('.alertBox .alerts').eq(5).stop(true).fadeIn(200).delay(2000).fadeOut(200);
                                              }*/
                                            else if (data.resp == 5) {
                                                    //data.resp == 5 已经提交过订单还未支付
                                                    $('.alertBox .alerts').eq(5).stop(true).fadeIn(200).delay(2000).fadeOut(200);
                                                } else {
                                                    //新增需求：同期燃脂营app外可以购买多个
                                                    $('.alertBox .alerts2').hide().eq(2).show(); //遮罩显示
                                                    $('.alertBox .alerts2 .text2').html('温馨提示：该账号已有同时段开班的燃脂营哦~'); //遮罩显示
                                                    $('.alerts2 .forSelfInner').unbind('click').click(function () {
                                                        $('.alertBox .alerts2').eq(2).hide(); //遮罩隐藏

                                                        window.location.href = 'confirmOrderOut.html' + window.location.search + '&classId=' + classId + '&phoneNo=' + getCookie('appOutPhone') + "&isOwnPicooc=" + is_balance; //正常跳转

                                                    });
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
                    }
                } else {
                    //如果是app内
                    // alert('APP内购买');
                    // console.log('APP内购买');
                    //判断燃脂营版本
                    if (getParamByUrl('webver') > 1) {
                        //版本正常(正式)
                        if (me.state.sellOut == false) {
                            //当前库存不为0才可以购买
                            var urlStock = ajaxLink + '/v1/api/campSell/getClassStock' + window.location.search + '&classId=' + classId; //获取商品库存状态
                            $.ajax({
                                type: "get",
                                url: urlStock,
                                dataType: "json",
                                success: function success(data) {
                                    console.log(4, data);
                                    if (data.result.code == 200) {
                                        console.log('data.resp=' + data.resp);
                                        if (data.resp == 1) {
                                            //$('.info .infoRight .times').hide().eq(5).show(); //库存：0          有未支付的订单
                                            me.setState({
                                                stock: 0
                                            });
                                            //$(me.refs.buyBtn).addClass('state7');
                                            PubSub.publish('noStock'); //大类
                                            $('.alertBox .alerts').eq(2).stop(true).fadeIn(200).delay(2000).fadeOut(200); //已拍完，但还有人未付款
                                        } else if (data.resp == 2) {
                                            //库存：抢光了
                                            //$('.info .infoRight .times').hide().eq(4).show();
                                            me.setState({
                                                stock: 0,
                                                sellOut: true
                                            });
                                            PubSub.publish('noStock'); //大类
                                            PubSub.publish('sellOut'); //真正售罄
                                            $('.alertBox .alerts').eq(3).stop(true).fadeIn(200).delay(2000).fadeOut(200); //手慢了，名额被抢光啦～
                                            //me.AppointmentOrReminder2(0,0,1,0,nextId);//状态切换为：预约下期；
                                        } else if (data.resp == 3 || data.resp == 5) {
                                            //3：表示支付成功； 5：提交订单但未支付
                                            $('.alertBox .alerts2').hide().eq(1).show(); //遮罩显示:同一账号只能购买一次哦!请核对参营人员信息～
                                            $('.alerts2 .knowInner').unbind('click').click(function () {
                                                setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_BuNengGouMaiDuoCi); //不能购买多次燃脂营
                                                $('.alertBox .alerts2').eq(1).hide(); //遮罩隐藏
                                            });
                                        } else if (data.resp == 6) {
                                            //data.resp == 6  //只有主账号才能购买，使用者不能购买
                                            $('.alertBox .alerts2').hide().eq(2).show(); //遮罩显示
                                            $('.alerts2 .forSelfInner').unbind('click').click(function () {
                                                setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_ZhuZhangHaoGouMai); //主账号购买
                                                $('.alertBox .alerts2').eq(2).hide(); //遮罩隐藏
                                            });
                                        } else if (data.resp == 4) {
                                            //data.resp == 4 正常购买
                                            delCookie('chooseIndex'); //删除选择优惠券时定义的cookie
                                            var url = absoluteUrl + 'confirmOrder.html' + window.location.search + '&classId=' + classId; //正常跳转

                                            var getPageInfo = function getPageInfo() {
                                                var data = {
                                                    link: url,
                                                    animation: 1 //默认1从右到左，2从下到上
                                                };
                                                return JSON.stringify(data);
                                            };
                                            var deviceType = isMobile();
                                            if (deviceType == "isApp") {
                                                /*var data={
                                                    link:absoluteUrl+"figureContrastShare.html"+window.location.search,
                                                    animation: 1//默认1从右到左，2从下到上
                                                };
                                                data=JSON.stringify(data);
                                                mobileApp.openWebview(data);*/
                                                appFc.openWebview(getPageInfo());
                                            } else {
                                                window.location.href = url;
                                            }
                                        } else if (data.resp == 7) {
                                            //data.resp == 7 相同手机号码不能在同一开营周期内购买多个燃脂营；
                                            $('.alertBox .alerts').eq(4).stop(true).fadeIn(200).delay(2000).fadeOut(200);
                                        } else if (data.resp == 8) {
                                            //data.resp == 8 您在当前所选时段内已有订单啦，处理后再来试试吧~
                                            $('.alertBox .alerts').eq(6).html('您在当前所选时段内已有订单啦，处理后再来试试吧~').stop(true).fadeIn(200).delay(2000).fadeOut(200);
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
                    } else {
                        //版本过低
                        if (getParamByUrl("os") == "iOS") {
                            // 判断如果是ios
                            $('.alertBox .alerts2').hide().eq(0).show(); //遮罩显示升级
                            $('.alerts2 .isUpdate .cancel').unbind('click').click(function () {
                                $('.alertBox .alerts2').hide();
                                //setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_QuYouZanGouMai);//去有赞购买

                                //window.location.href = data.resp.share.shareUrl;//此处需要修改，跳转到有赞购买；
                            });
                            $('.alerts2 .isUpdate .updata').unbind('click').click(function () {
                                setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_ShengJiBanBen); //版本升级埋点
                                window.location.href = 'https://itunes.apple.com/us/app/picooc/id729928969?mt=8'; //跳转到APP版本升级页面
                            });
                        } else if (getParamByUrl("os") == "android") {
                            // 判断如果是android
                            $('.alertBox .alerts2').hide().eq(3).show(); //遮罩显示升级
                            $('.alerts2 .notGengXin').unbind('click').click(function () {
                                $('.alertBox .alerts2').hide();
                                //setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_QuYouZanGouMai);//去有赞购买
                            });
                        }
                        $('.alerts2 .cancelBg').unbind('click').click(function () {
                            setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_QuXiaoShengJiBanBen); //取消升级版本
                            $('.alertBox .alerts2').hide(); //遮罩隐藏
                        });
                    }
                }
            }
        }
    },

    //outAppService:app外客服function
    outAppService: function outAppService() {
        window.location.href = 'https://kefu.easemob.com/webim/im.html?tenantId=26797';
    },

    //点击设置开售提醒
    warningBuy: function warningBuy() {
        var me = this;
        var data = me.props.saleState;
        var info1ClassesArr = me.state.info1ClassesArr;
        var classId = info1ClassesArr[0].classId;
        var url = window.location.protocol + "//" + window.location.host + window.location.pathname;
        url = url.slice(0, -5); //去掉.html
        console.log(url);
        //var getAppointmentUrl = "http://172.17.1.233:8080/v1/api/campSell/getAppointment" + window.location.search+'&classId='+classId+'&url='+url;//将用户点击状态返回给后台
        var getAppointmentUrl = ajaxLink + "/v1/api/campSell/getAppointment" + window.location.search + '&classId=' + classId + '&url=' + url; //将用户点击状态返回给后台
        $.ajax({
            type: 'get',
            url: getAppointmentUrl,
            dataType: "json",
            success: function success(data) {
                if (data.code == 200) {
                    console.log(data);
                    $(me.refs.warningBtn).addClass('state9').html('已提醒');
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
    }

});

module.exports = ProductDetails_saleState;

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var PubSub = __webpack_require__(2);
var Public_error = __webpack_require__(3);
var ProductDetails_saleState = __webpack_require__(126);
var ProductDetails_banner = __webpack_require__(122);
var ProductDetails_productState = __webpack_require__(125);
var ProductDetails_productDesc = __webpack_require__(124);
var ProductDetails_chooseFatburn = __webpack_require__(123);
var ProductDetails_alertBox = __webpack_require__(121);
var SShangPinXiangQing = {
	SCategory_SShangPinXiangQing: 5080100,
	SShangPinXiangQing_YuYueXiaQi: 5080101, //预约下期
	SShangPinXiangQing_KaiShouTiXing: 5080102, //开售提醒
	SShangPinXiangQing_LiJiGouMai: 5080103, //立即购买
	SShangPinXiangQing_ShengJiBanBen: 5080104, //升级版本
	SShangPinXiangQing_QuYouZanGouMai: 5080105, //去有赞购买
	SShangPinXiangQing_QuXiaoShengJiBanBen: 5080106, //取消升级版本
	SShangPinXiangQing_ShangPinXiangQing: 5080107, //商品详情
	SShangPinXiangQing_ShangPinPingJia: 5080108, //商品评价
	SShangPinXiangQing_KeFuXiTong: 5080109, //客服系统
	SShangPinXiangQing_BuNengGouMaiDuoCi: 5080110, //不能购买多次
	SShangPinXiangQing_ZhuZhangHaoGouMai: 5080111 //主账号购买
};

window.SShangPinXiangQing = SShangPinXiangQing;
var goodsId = ""; //当前商品id
var nextId = ""; //下一个商品的id
$('.sale .service img').hide().eq(0).show(); //默认不显示客服小红点
//1.6取消刷新页面
var deviceType = isMobile();
/*if(deviceType == "isApp" && getParamByUrl('webver')>1){
	//兼容低版本
	if((getParamByUrl('webver') == 2) && (typeof mobileApp.markedAsNeedToRefresh != "undefined")){
		mobileApp.markedAsNeedToRefresh();//客户端刷新当前页面
	}else{
		appFc.markedAsNeedToRefresh();//客户端刷新当前页面
	}
}*/

//部分页面公用参数stock
var publicData = {
	stock: 0,
	//nowType:0, //当前类型
	nowClass: '', //当前班级
	outAppLogin: getCookie('appOutPhone') == false ? false : true, //app外进入页面
	phoneNum: '', //app外用户手机号
	code: '', //app外验证码
	verifyTimer: '', //获取验证码倒计时
	verifyAgainTimer: '' //重新获取验证码倒计时
};
window.publicData = publicData;

var ProductDetailsContainer = React.createClass({
	displayName: "ProductDetailsContainer",


	getInitialState: function getInitialState() {
		var me = this;
		me.showGoodsStatus(); //展示商品信息
		return {
			verifyStatus: 'none', //验证手机号弹窗
			hasOnLine: 1, //是否有商品在售
			productDetailsData: {}
		};
	},
	componentWillMount: function componentWillMount() {},
	componentDidMount: function componentDidMount() {
		var me = this;
		//app外：点击立即购买时，如果用户没有登陆手机号，则显示该弹窗
		PubSub.subscribe("outAppPhone", function (msg, outAppPhone) {
			me.setState({
				verifyStatus: outAppPhone
			});
		});
	},

	render: function render() {
		//alert('render');
		var me = this;
		var data = me.state.productDetailsData;
		//alert(typeof me.state.productDetailsData.resp);
		//客户端控制方法(左上角，title，右上角)
		if (typeof me.state.productDetailsData.resp != "undefined") {
			//alert(typeof isOutApp);
			//alert(isOutApp());
			if (isOutApp() == false) {
				//app内才执行此方法
				console.log(me);
				if (typeof me.state.productDetailsData.resp != "undefined") {
					//低版本兼容（低版本的title和右上角是在一起的）
					if (getParamByUrl('webver') > 2) {
						//高版本控制title和右上角方法
						//中间title
						var titleData = {
							title: "有品燃脂营",
							color: "",
							opacity: "",
							backgroundColor: "",
							backgroundOpacity: ""
						};
						titleData = JSON.stringify(titleData);
						appFc.controlTitle(titleData);

						//如果有商品在线，才展示右上角分享
						//if(me.state.hasOnLine != 0){
						if (data.resp.info.length != 0) {

							//右上角
							var iconUrl = "";
							var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_share.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png"];
							if (getParamByUrl("os") == "android") {
								iconUrl = iconShare[0];
							} else {
								iconUrl = iconShare[1];
							}
							var getPageInfo4 = function getPageInfo4() {
								var data3 = {
									iconType: 0, //0走图片逻辑，1走文案逻辑
									rightStr: {
										str: "",
										color: "",
										opacity: "",
										id: "0"
									},
									rightIcon: [{
										type: "1", //调用客户端方法
										id: "1",
										functionName: "",
										iconUrl: iconUrl,
										iconName: "分享",
										redDotType: "1",
										redDotShow: false,
										redDotNum: "0",
										nativeType: "0", //分享
										content: {
											shareTitle: data.resp.share.shareTitle,
											//shareUrl:data.resp.share.shareUrl,
											shareUrl: data.resp.share.link,
											shareIcon: data.resp.share.shareIcon,
											shareDesc: data.resp.share.shareDesc,
											shareTag: data.resp.share.shareTag,
											/*shareTitle:'',
            shareUrl:'',
            shareIcon:'',
            shareDesc:'',
            shareTag:'',*/
											shareType: "0",
											shareBackgroundColor: '',
											shareTypeDesc: "",
											fatBurnName: ''
										}
									}]
								};
								return JSON.stringify(data3);
							};
							appFc.controlRight(getPageInfo4());
						}
					} else {
						//低版本控制title和右上角的方法
						var getPageInfo = function getPageInfo() {
							if (getParamByUrl('webver') > 1) {
								//if(me.state.hasOnLine != 0){
								if (data.resp.info.length != 0) {
									var data2 = {
										title: '有品燃脂营',
										backgroundColor: '#2c2f31',
										isShare: true,
										shareTitle: data.resp.share.shareTitle,
										//shareUrl:data.resp.share.shareUrl,
										shareUrl: data.resp.share.link,
										shareIcon: data.resp.share.shareIcon,
										shareDesc: data.resp.share.shareDesc,
										shareTag: data.resp.share.shareTag
									};
								}
							} else {
								var data2 = {
									title: '有品燃脂营',
									backgroundColor: '#2c2f31',
									isShare: false
								};
							}
							return JSON.stringify(data2);
						};
						var deviceType = isMobile();
						if (deviceType == "isApp" && typeof mobileApp != "undefined") {
							mobileApp.getShareInfo(getPageInfo());
						}
						document.documentElement.style.webkitUserSelect = 'none';
						document.documentElement.style.webkitTouchCallout = 'none';
					}

					if (deviceType == "isApp" && getParamByUrl('webver') > 2) {
						if (getCookie("saveCampFrom") == "1") {
							//如果是从燃脂营学员首页续营
							//左上角
							var getPageInfo = function getPageInfo() {
								var data = {
									iconType: 0,
									iconColor: "",
									backNum: 3,
									closeWebview: 0,
									hidden: false,
									isHandle: false,
									functionName: ""
								};
								return JSON.stringify(data);
							};
							appFc.controlLeft(getPageInfo());
						} else if (parseInt(getParamByUrl("refer")) == 3) {
							var getPageInfo2 = function getPageInfo2() {
								var data = {
									iconType: 1,
									iconColor: "",
									backNum: 1,
									closeWebview: 0,
									hidden: false,
									isHandle: false,
									functionName: ""
								};
								return JSON.stringify(data);
							};
							appFc.controlLeft(getPageInfo2());
						} else {
							var getPageInfo1 = function getPageInfo1() {
								var data = {
									iconType: 0,
									iconColor: "",
									backNum: 1,
									closeWebview: 0,
									hidden: false,
									isHandle: false,
									functionName: ""
								};
								return JSON.stringify(data);
							};
							appFc.controlLeft(getPageInfo1());
						}
					} else if (getParamByUrl('webver') > 1) {
						//低版本兼容
						if (deviceType == "isApp" && typeof mobileApp != "undefined" && getParamByUrl('webver') == 2) {
							if (getCookie("saveCampFrom") == "1") {
								//如果是从燃脂营学员首页续营
								var getPageInfo3 = function getPageInfo3() {
									var data = {
										iconType: 0, //0:默认箭头，1：叉，2：iconUrl传图片
										backNum: 3,
										closeWebview: 0, //默认为0
										iconUrl: ""
									};
									return JSON.stringify(data);
								};
								mobileApp.showLeftBtn(getPageInfo3());
							} else {
								var getPageInfo4 = function getPageInfo4() {
									var data = {
										iconType: 0, //0:默认箭头，1：叉，2：iconUrl传图片
										backNum: 1,
										closeWebview: 0, //默认为0
										iconUrl: ""
									};
									return JSON.stringify(data);
								};
								mobileApp.showLeftBtn(getPageInfo4());
							}
						}
					}
				}
			} else {
				var setShare = function setShare() {
					var host = window.location.protocol + "//" + window.location.host;
					var finalUrl = host + "/getWxData";
					var shareUrl = location.href.split('#')[0];
					$.ajax({
						type: "post",
						url: finalUrl,
						data: {
							reqUrl: shareUrl
						},
						dataType: "json",
						success: function success(result) {
							if (result.status == "success") {
								wx.config({
									debug: false,
									appId: result.data.appId,
									timestamp: result.data.timestamp,
									nonceStr: result.data.nonceStr,
									signature: result.data.signature,
									jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
								});

								wxShare();
							}
						}
					});
				};

				var wxShare = function wxShare() {
					var shareObject = {
						title: data.resp.share.shareTitle,
						desc: data.resp.share.shareDesc,
						link: window.location.protocol + "//" + window.location.host + window.location.pathname + '?linkId=' + getParamByUrl('linkId'),
						imgUrl: data.resp.share.shareIcon
						//检测api是否生效
					};wx.ready(function () {
						console.log(shareObject);
						// 分享到朋友圈
						wx.onMenuShareTimeline(shareObject);
						// 分享给朋友
						wx.onMenuShareAppMessage(shareObject);
						// 分享到QQ
						wx.onMenuShareQQ(shareObject);
						// 分享到微博
						wx.onMenuShareWeibo(shareObject);
					});
				};

				//app外微信分享
				setShare();
			}
		}

		var str = '';
		console.log(data.code);
		if (data.code == 200) {
			//alert('a');
			if (me.state.hasOnLine == 0) {
				str = React.createElement(
					"div",
					null,
					React.createElement(
						"section",
						{ className: "offLine" },
						React.createElement(
							"p",
							{ className: "offLineTip" },
							"\u554A\u5594~\u8BE5\u5546\u54C1\u5DF2\u4E0B\u67B6..."
						),
						React.createElement(
							"div",
							{ className: "offLineImg" },
							React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/offLine.png" })
						),
						React.createElement(
							"div",
							null,
							React.createElement(
								"button",
								{ className: "offLineBtn", onClick: me.offLineBtn },
								"\u67E5\u770B\u6700\u65B0\u71C3\u8102\u8425\u5546\u54C1"
							)
						)
					)
				);
			} else {
				str = React.createElement(
					"div",
					null,
					React.createElement(
						"section",
						{ className: "container aboutSale" },
						React.createElement(ProductDetails_saleState, { saleState: data, serviceFunction: me.serviceFunction }),
						React.createElement(
							"div",
							{ className: "row noAppTitle", style: { display: isOutApp() == true || isLowVersion() == true || getParamByUrl('innerToOut') == 1 ? 'block' : 'none' } },
							React.createElement(
								"div",
								{ className: "col-xs-4 col-sm-4 middle middle2" },
								React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/logoLeft.png" })
							),
							React.createElement("div", { className: "col-xs-4 col-sm-4" }),
							React.createElement(
								"div",
								{ className: "col-xs-4 col-sm-4 right right2" },
								React.createElement("img", { onClick: this.alertsVerifyFun, src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/mine.png" })
							)
						),
						React.createElement(ProductDetails_banner, { banner: data }),
						React.createElement(ProductDetails_productState, { productState: data }),
						React.createElement(ProductDetails_productDesc, { productDesc: data }),
						React.createElement(ProductDetails_chooseFatburn, { chooseFatburn: data }),
						React.createElement(ProductDetails_alertBox, { alertBox: data, verifyStatus: me.state.verifyStatus, verifyFun: this.verifyFun })
					)
				);
			}
		} else {
			str = React.createElement("i", null);
		}

		return React.createElement(
			"div",
			null,
			str
		);
	},

	/*获取商品详情页信息*/
	showGoodsStatus: function showGoodsStatus() {
		var me = this;

		//燃脂营1.6新接口
		var finalUrl = ajaxLink + "/v1/api/campSell/findSellById" + window.location.search; //获取商品信息
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function success(data) {
				if (data.result.code == 200) {
					//alert(data.code);
					console.log('商品详情页', data);
					//全部售罄状态
					if (data.resp.info.length == 0) {
						me.setState({
							hasOnLine: 0
						});
					}
					if (typeof me.state.productDetailsData.resp != "undefined") {
						if (me.state.productDetailsData.resp.info.length > 0) {
							data.resp.info = me.state.productDetailsData.resp.info.concat(data.resp.info);
						}
					}
					me.setState({
						productDetailsData: data
					});

					if (getParamByUrl('chaojie') == 'chaojie') {
						$('#clearCookie').show().unbind('click').click(function () {
							//alert(getCookie('appOutPhone'));
							delCookie('appOutPhone');
						});
					}

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

					if (isOutApp() == false && getParamByUrl('innerToOut') != 1) {
						//app内才执行
						//客服小红点

						var deviceType4 = isMobile();
						if (deviceType4 == "isApp" && getParamByUrl('webver') > 1) {
							//显示客服小红点
							var showDot = function showDot() {
								//alert("展示小红点成功");
								$('.sale .service img').hide().eq(1).show(); //客服：展示小红点
								$('.sale .service2 img').hide().eq(1).show(); //客服：展示小红点
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

					//detailOrComment文字可编辑
					/*var str =
     	'<p style="padding: 0.25rem 0;"><a href="https://www.picooc.com/wap/?lag=zh">PICOOC官网</a></p>' +
     	'<p><span>夏天=空调+wifi+西瓜，这不就是夏天最准确的描述么！嗜瓜如命的我最近很纠结，西瓜虽好，但是有人说吃西瓜是减肥的，又有人说西瓜含糖高，不能多吃，会长胖的。<strong>所以，正在减脂的我到底能不能吃西瓜？</strong></span></p>' +
     	'<p style="text-align:center;"> <span style="font-size:16px;color:#64451D;"></span><img src="http://detection.picooc.com/data/upload/editor/2017-07-06/595dfe1f6e628.jpg" alt=""> </p>';
     		$('.detailOrComment1').append('<div id="expandDetails">'+str+'</div>');*/
				} else {
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2);
				}
			},
			error: function error() {
				//alert(data.code);
				$(".error-main-t").html(data.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		});
	},

	//去往客服
	goToEaseModChat: function goToEaseModChat() {
		var me = this;
		var deviceType = isMobile();
		if (deviceType == "isApp") {
			if (getParamByUrl('webver') > 1) {
				//正常版本

				//兼容低版本
				if (getParamByUrl('webver') == 2) {
					mobileApp.goToEaseModChat();
				} else {
					appFc.goToEaseModChat();
				}
				$('.sale .service img').hide().eq(0).show(); //客服：不展示小红点
				$('.sale .service2 img').hide().eq(0).show(); //客服：不展示小红点
			} else {
				//低版本
				if (getParamByUrl("os") == "iOS") {
					// 判断如果是ios

					//燃脂营售卖
					$('.alertBox .alerts2').hide().eq(4).show(); //遮罩显示升级
					$('.alerts2 .isUpdate .cancelNew').unbind('click').click(function () {
						setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_QuXiaoShengJiBanBen); //取消升级版本
						$('.alertBox .alerts2').hide(); //遮罩隐藏
					});
					$('.alerts2 .isUpdate .updataNew').unbind('click').click(function () {
						setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_ShengJiBanBen); //版本升级埋点
						window.location.href = 'https://itunes.apple.com/us/app/picooc/id729928969?mt=8'; //跳转到APP版本升级页面
					});
				} else if (getParamByUrl("os") == "android") {
					// 判断如果是android

					//燃脂营售卖
					$('.alertBox .alerts2').hide().eq(5).show(); //遮罩显示
					$('.alerts2 .forSelfInnerNew').unbind('click').click(function () {
						$('.alertBox .alerts2').hide(); //遮罩隐藏
					});
				}
			}
		}
	},

	//点击客服
	serviceFunction: function serviceFunction() {
		var me = this;
		setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing, SShangPinXiangQing.SShangPinXiangQing_KeFuXiTong); //客服系统埋点
		me.goToEaseModChat();
	},

	//点击我的
	alertsVerifyFun: function alertsVerifyFun() {
		var me = this;
		// 判断无痕浏览
		try {
			window.localStorage.foobar = "foobar";
		} catch (_) {
			alert("请取消浏览器无痕浏览再购买哦~");
		}
		//alert(publicData.phoneNum);
		//alert(publicData.outAppLogin);
		if (publicData.outAppLogin == false) {
			//alert(1);
			PubSub.publish('outAppPhone', 'block'); //app外：用户没有登陆，则显示验证手机号弹窗
			$('.alertsVerify .verifyBox').hide().eq(1).show(); //如果弹窗关闭，下次进来需要再次弹出输入手机号的弹框
			$('.alertBox .alertsVerify .verifyBox .warning').hide().eq(0).show();
			//禁止滚动条
			$('html, body').css('overflow', 'hidden').on("touchmove", function (ev) {
				ev = ev || event;
				if (ev.preventDefault) {
					ev.preventDefault();
				} else {
					return false;
				}
			});
		} else {

			window.location.href = absoluteUrl + 'myInfo.html' + window.location.search + "&phoneNo=" + getCookie('appOutPhone');
		}
	},
	//点击验证
	verifyFun: function verifyFun() {
		$('html, body').css('overflow', 'auto').off("touchmove");
		clearInterval(publicData.verifyTimer);
		clearInterval(publicData.verifyAgainTimer);
		$('.alertBox .alertsVerify .verifyBox .warning .nowLeftTime').html(60);
		var me = this;
		me.setState({
			verifyStatus: 'none'
		});
	},

	//查看其他最新商品
	offLineBtn: function offLineBtn() {
		var me = this;
		var data = me.state.productDetailsData;
		removeParamByUrl('linkId');
		var url = window.location.search.substring(1);
		var arr = url.split("&");
		var result = [];
		var str = '?';
		for (var i = 0; i < arr.length; i++) {
			var param = arr[i].split("=");
			if ('linkId' != param[0]) {
				str += '&' + param[0] + '=' + param[1];
				//return  param[1];
			}
		}
		var linkId = data.resp.share.linkId;
		window.location.href = 'productDetails.html' + str + '&linkId=' + linkId;
	}

});

var Component = React.createClass({
	displayName: "Component",


	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(ProductDetailsContainer, null),
			React.createElement(Public_error, null)
		);
	}
});

ReactDOM.render(React.createElement(Component, null), document.getElementById('productDetailsBox'));

/***/ })

},[230]);