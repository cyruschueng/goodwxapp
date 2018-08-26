var React=require("react");
var PubSub = require("pubsub-js");
var ticket;
var ProductDetails_alertBox=React.createClass({

    getInitialState:function(){
        var me = this;
        return {
            leftTime:60,
            againGetCodeShow:false
        };
    },

    componentDidMount:function(){
        var me = this;
        var data = me.props.alertBox;
    },

    render:function(){
        var me = this;
        var data = me.props.alertBox;
        if(data.code ==200){
            console.log(me.props.alertBox,880000);
        }
        return (
            /*弹出框*/
            <aside className="alertBox">
                <div className="alerts" style={{display:"none"}}>
                    预约成功！我们将在下期开售前2<br/>小时内通知您～
                </div>
                <div className="alerts" style={{display:"none"}}>
                    设置成功！<br/>我们将会在开售前5分钟提醒您～
                </div>
                <div className="alerts" style={{display:"none"}}>
                    已拍完，但还有人未付款，待会<br/>儿再来看看吧～
                </div>
                <div className="alerts oneLine" style={{display:"none"}}>
                    手慢了，名额被抢光啦～
                </div>
                <div className="alerts" style={{display:"none"}}>
                    您在当前所选时间内已经参营啦，换个时间吧～
                </div>
                <div className="alerts" style={{display:"none"}}>
                    您在当前所选时段内已有订单啦，点击右上角[我的]处理后再来试试吧～
                </div>
                <div className="alerts" style={{display:"none"}}>

                </div>
                <div className="alerts2" style={{display:"none"}}>
                    <div className="bg cancelBg"></div>
                    <div className="row appOuter version">
                        <p className="text2">温馨提示：<br/>新版本支持APP内无登录无跳转支付；购买燃脂营后可立即查看班级入口哦！</p>
                        <div className="isUpdate">
                            {/*<div className="col-xs-6 col-sm-6 cancel">暂不更新</div>*/}
                            <div className="col-xs-6 col-sm-6 cancel">暂不更新</div>
                            <div className="col-xs-6 col-sm-6 updata">立即升级</div>
                        </div>
                    </div>
                </div>
                <div className="alerts2" style={{display:"none"}}>
                    <div className="bg"></div>
                    <div className="row appOuter version">
                        <p className="text2">同一个账号限购一次，您可在“我的—我的燃脂营—我的订单”中查看订单详情哦~</p>
                        <div className="know">
                            <div className="col-xs-12 col-sm-12 knowInner">我知道啦</div>
                        </div>
                    </div>
                </div>
                <div className="alerts2" style={{display:"none"}}>
                    <div className="bg"></div>
                    <div className="row appOuter version">
                        <p className="text2">您不能购买哦，建议您注册或登录个人账号后为自己购买～</p>
                        <div className="forSelf">
                            <div className="col-xs-12 col-sm-12 forSelfInner">我知道啦</div>
                        </div>
                    </div>
                </div>
                <div className="alerts2" style={{display:"none"}}>
                    <div className="bg cancelBg"></div>
                    <div className="row appOuter version">
                        <p className="text2">温馨提示：<br/>新版本支持APP内无登录无跳转支付；购买燃脂营后可立即查看班级入口哦！打开手机应用商店即可更新到最新版本~</p>
                        <div className="forSelf">
                            {/*<div className="col-xs-12 col-sm-12 forSelfInner notGengXin">暂不更新</div>*/}
                            <div className="col-xs-12 col-sm-12 forSelfInner notGengXin">我知道了</div>
                        </div>
                    </div>
                </div>
                <div className="alerts2" style={{display:"none"}}>
                    <div className="bg cancelBg"></div>
                    <div className="row appOuter version">
                        <p className="text2">温馨提示：<br/>更新一下下，客服妹纸会偷偷告诉您减脂塑形秘籍哦~</p>
                        <div className="isUpdate">
                            <div className="col-xs-6 col-sm-6 cancelNew">暂不更新</div>
                            <div className="col-xs-6 col-sm-6 updataNew">立即升级</div>
                        </div>
                    </div>
                </div>
                <div className="alerts2" style={{display:"none"}}>
                    <div className="bg"></div>
                    <div className="row appOuter version">
                        <p className="text2">温馨提示：<br/>更新一下下，客服妹纸会偷偷告诉您减脂塑形秘籍哦！打开手机应用商店即可更新到最新版~</p>
                        <div className="forSelf">
                            <div className="col-xs-12 col-sm-12 forSelfInnerNew">我知道啦</div>
                        </div>
                    </div>
                </div>
                <div className="alertsVerify" style={{display:me.props.verifyStatus}}>
                    <div className="bg"></div>
                    <div className="row verifyBox" style={{display:'none'}}>
                        <img className="closeImg" onClick={me.props.verifyFun} src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/close.png" alt=""/>
                        <div className="title">请验证手机号码</div>
                        <div className="row col-xs-12 col-sm-12 infoInput">
                            <div className="col-xs-2 col-sm-2 logo"><img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/verify.png"/></div>
                            <div className="row col-xs-10 col-sm-10 sameHeight">
                                <div className="col-xs-12 col-sm-12 tiaoZheng">
                                    <input ref="code" className="ipt code" type="text" placeholder="4 位验证码"/>
                                </div>
                                {/*<div className="row col-xs-5 col-sm-5 right check"><span className="checkText" onClick={me.getCode}>获取验证码</span></div>*/}
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 verifyBtn verifyBtn1"  onClick={me.goToVerify}>验证</div>
                        <div className="col-xs-12 col-sm-12 warning" style={{display:me.state.againGetCodeShow==false?"block":"none"}}>接收短信大约需要<span className="nowLeftTime">{me.state.leftTime}</span>s</div>
                        <div className="col-xs-12 col-sm-12 warning" style={{display:me.state.againGetCodeShow==false?"none":"block"}}>收不到验证码？<span className="againGetCode" onClick={me.liJiVerifyAgain}>重新获取</span></div>
                    </div>
                    <div className="row verifyBox" style={{display:'block'}}>
                        <img className="closeImg" onClick={me.props.verifyFun} src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/close.png" alt=""/>
                        <div className="title">请验证手机号码</div>
                        <div className="row col-xs-12 col-sm-12 infoInput">
                            <div className="col-xs-2 col-sm-2 logo"><img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/phone.png"/></div>
                            <div className="row col-xs-10 col-sm-10 sameHeight">
                                <div className="col-xs-12 col-sm-12 tiaoZheng">
                                    <input ref="phoneNum" className="ipt phone" type="text" placeholder="输入手机号"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 verifyBtn verifyBtn2" onClick={me.liJiVerify}>立即验证</div>
                        <div className="col-xs-12 col-sm-12 warning" style={{visibility:'hidden'}}>**</div>
                    </div>

                    <div id="TCaptcha"></div>

                </div>
            </aside>
        );
    },
    
    //点击立即验证
    liJiVerify:function(){
        var me = this;
        var data = me.props.alertBox;
        publicData.phoneNum = me.refs.phoneNum.value;
        if($.trim(me.refs.phoneNum.value) != ''){
            var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
            if(myreg.test(publicData.phoneNum)){//如果手机号格式正确
                $.ajax({
                    type: "get",
                    //url: "http://172.17.1.233:8080/v1/api/captcha/getTencentUrlForSms",
                    url: ajaxLink + "/v1/api/captcha/getTencentUrlForSms",
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if(data.result.code==200){
                            console.log('图形验证码', data);
                            $("#graphJs").attr("src",data.resp.url);
                            var capTime=setInterval(function(){
                                if(capInit!=undefined){
                                    clearInterval(capTime);
                                    var capOption = {callback:cbfn, showHeader:true};
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
                                    function cbfn(retJson) {
                                        if (retJson.ret == 0) {
                                            $('#TCaptcha').hide();
                                            console.log('retJson', retJson);
                                            ticket = retJson.ticket;
                                            $('.alertsVerify .verifyBox').hide().eq(0).show();
                                            var aa = 59;
                                            publicData.verifyTimer = setInterval(function(){
                                                if(aa == 0){
                                                    clearInterval(publicData.verifyTimer);
                                                    me.setState({
                                                        againGetCodeShow:true
                                                    });
                                                }
                                                me.setState({
                                                    leftTime: aa--
                                                });
                                            }, 1000);
                                            $.ajax({
                                                type: "get",
                                                //url: "http://172.17.1.233:8080/v1/api/campSell/sendSmsValidateCode?phoneNo="+publicData.phoneNum +'&ticket='+ticket,
                                                url: ajaxLink + "/v1/api/campSell/sendSmsValidateCode?phoneNo="+publicData.phoneNum +'&ticket='+ticket,
                                                dataType: "json",
                                                success: function (data) {
                                                    console.log(data);

                                                }
                                            });

                                            // 用户验证成功
                                            // document.getElementById("ticket").value = retJson.ticket;
                                            // document.getElementById("myform").submit();
                                        }
                                        else {
                                            $('#TCaptcha').hide();
                                            //用户关闭验证码页面，没有验证
                                        }
                                    }
                                }
                            },100);

                        }
                    }
                });

            }else{
                $('.alertBox .alerts').eq(6).html('手机号填写有误，请重新核对哦~').stop(true).fadeIn(200).delay(2000).fadeOut(200);//手机号输入错误
            }
        }
    },


    liJiVerifyAgain:function(){
        var me = this;
        var data = me.props.alertBox;
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
        if(myreg.test(publicData.phoneNum)){//如果手机号格式正确
            $.ajax({
                type: "get",
                //url: "http://172.17.1.233:8080/v1/api/captcha/getTencentUrlForSms",
                url: ajaxLink + "/v1/api/captcha/getTencentUrlForSms",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if(data.result.code==200){
                        console.log('图形验证码', data);
                        $("#graphJs").attr("src",data.resp.url);
                        var capTime=setInterval(function(){
                            if(capInit!=undefined){
                                clearInterval(capTime);
                                var capOption = {callback:cbfn, showHeader:true};
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
                                /*$('#TCaptcha, #TCaptcha iframe').css('overflow', 'hidden').on("touchmove",function(ev){
                                    ev = ev || event;
                                    if(ev.preventDefault){
                                        ev.preventDefault();
                                    }else{
                                        return false;
                                    }
                                });*/
                                //回调函数：验证码页面关闭时回调
                                function cbfn(retJson) {
                                    if (retJson.ret == 0) {
                                        $('#TCaptcha').hide();
                                        console.log('retJson', retJson);
                                        ticket = retJson.ticket;
                                        $('.alertsVerify .verifyBox').hide().eq(0).show();
                                        me.setState({
                                            leftTime:60,
                                            againGetCodeShow:false
                                        });

                                        var aa = 59;
                                        publicData.verifyAgainTimer = setInterval(function(){
                                            if(aa == 0){
                                                clearInterval(publicData.verifyAgainTimer);
                                                me.setState({
                                                    againGetCodeShow:true
                                                });
                                            }
                                            me.setState({
                                                leftTime: aa--
                                            });
                                        }, 1000);
                                        $.ajax({
                                            type: "get",
                                            //url: "http://172.17.1.233:8080/v1/api/campSell/sendSmsValidateCode?phoneNo="+publicData.phoneNum +'&ticket='+ticket,
                                            url: ajaxLink + "/v1/api/campSell/sendSmsValidateCode?phoneNo="+publicData.phoneNum +'&ticket='+ticket,
                                            dataType: "json",
                                            success: function (data) {
                                                console.log(data);

                                            }
                                        });
                                    }
                                    else {
                                        $('#TCaptcha').hide();
                                        //用户关闭验证码页面，没有验证
                                    }
                                }
                            }
                        },100);

                    }
                }
            });

        }else{
            $('.alertBox .alerts').eq(6).html('手机号填写有误，请重新核对哦~').stop(true).fadeIn(200).delay(2000).fadeOut(200);//手机号输入错误
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
    goToVerify:function(){
        var me = this;
        var data = me.props.alertBox;
        if($.trim(me.refs.code.value) != ''){
            $.ajax({
                type:'get',
                //url:'http://172.17.1.233:8080/v1/api/campSell/verifyCode?phoneNo='+publicData.phoneNum+'&code='+me.refs.code.value,
                url:ajaxLink + '/v1/api/campSell/verifyCode?phoneNo='+publicData.phoneNum+'&code='+me.refs.code.value,

                success:function(data){
                    console.log(data);
                    if(data.code == 200){
                        $('.alertsVerify').hide();
                        publicData.outAppLogin = true;
                        // setCookie('appOutPhone', publicData.phoneNum, 1);
                        //setCookiePath("appOutPhone", publicData.phoneNum, 7, "/;domain=picooc.com");
                        setCookie("appOutPhone", publicData.phoneNum, 7);
                        //alert(getCookie('appOutPhone'));
                        
                        if(getCookie('clickSource') == 'formMyself'){//从点击我的弹得浮层
                            delCookie('clickSource');
                            window.location.href = 'myInfo.html'+window.location.search + "&phoneNo="+ publicData.phoneNum;
                        }else if(getCookie('clickSource') == 'formGoToBuy'){//从点击立即购买弹得浮层
                            delCookie('clickSource');
                            window.location.href = 'confirmOrderOut.html' + window.location.search + '&classId=' + publicData.classId + '&phoneNo=' + publicData.phoneNum + "&isOwnPicooc=" + publicData.is_balance; //正常跳转
                        }

                        $('html, body').css('overflow', 'auto').off("touchmove");

                    }else{
                        publicData.outAppLogin = false;
                        $('.alertBox .alerts').eq(6).html('验证码输入错误').stop(true).fadeIn(200).delay(2000).fadeOut(200);//验证码输入错误
                    }
                },
                error : function (){
                    $(".error-main-t").html(data.message);
                    $(".errorAlert").css("display","block");
                    $(".error-main").css("margin-top",-$(".error-main").height()/2);
                }
            });
        }
    }

});

module.exports = ProductDetails_alertBox;