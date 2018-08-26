var React = require("react");
var ReactDOM = require("react-dom");
var Public_error = require('./Public_error.jsx');
var SDingDanXiangQing = {
    SCategory_SDingDanXiangQing: 5080500,
    SDingDanXiangQing_ShiFouQuXiaoDingDan: 5080501,//是否取消订单
    SDingDanXiangQing_QuXiaoDingDan: 5080502,//取消订单
    SDingDanXiangQing_ZanBuQuXiao: 5080503,//暂不取消
    SDingDanXiangQing_LianXiKeFu: 5080504,//联系客服
    SDingDanXiangQing_QuXiaoLianXiKeFu: 5080505,//取消联系客服
    SDingDanXiangQing_QianWangWeiXin: 5080506,//前往微信
    SDingDanXiangQing_QianWangShangPinXiangQing: 5080507,//前往商品详情页
    SDingDanXiangQing_QuZhiFu: 5080508//去支付
};
//部分页面公用参数
var publicData = {
    outAppLogin: (getCookie('appOutPhone') == false) ? false : true
};
window.publicData = publicData;

var userAgentInfo = navigator.userAgent;
var isIOS = (!!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));
var goodsId = "";
var arr1 = [
    <span className="wait">等待付款</span>,
    <span className="nowait">已完成</span>,
    <span className="nowait">已取消</span>,
    <span className="nowait">已关闭</span>,
    <span className="nowait">退款中</span>,
    <span className="nowait">退款完成</span>];

var OrderDetailsContainer = React.createClass({

    getInitialState: function () {
        var me = this;
        window.getOrderInfo = me.getOrderInfo;
        me.getOrderInfo();

        return {
            orderDetailsData: {}
        }
    },
    componentWillMount: function () {
        if (publicData.outAppLogin == false) {
            window.location.href = 'productDetails.html?linkId=' + getParamByUrl('linkId');
        }
    },
    componentDidMount: function () {
        // var goodsInfos = JSON.parse(localStorage.getItem('goodsInfos'));
        // 若有微信支付返回的code 则直接调起公众号（微信内）支付
        // if (getParamByUrl('code') != 'false') {
        //     this.goWechatPay(goodsInfos);
        // }
    },
    render: function () {
        var me = this;
        var data = me.state.orderDetailsData;
        var objOrder;
        var displayState = "none";
        var payState = "none";
        var wechatState = "none";
        console.log(data);
        if (typeof data.resp != "undefined") {
            displayState = 'block';//显示container
            var beginTime = data.resp.beginTime;
            var arr = beginTime.split('-');
            var beginTime2 = arr[0] + '年' + arr[1] + '月' + arr[2] + '日';
            var aboutCurrentPrice = "¥" + data.resp.currentPrice;
            if (data.resp.orderType == 0) {//如果状态为：等待付款
                payState = "block";
                me.timeDiffer(data.resp.nowDate, data.resp.endTime);
            }
            //var goodsUrl = JSON.parse(data.resp.goodsUrl);
            var wechatNum = "";
            wechatState = "block";
            wechatNum = data.resp.weChat;
            if (data.resp.weChat && data.resp.weChat != null && data.resp.weChat != "") {
                wechatState = "block";
                wechatNum = data.resp.weChat;
                if (wechatNum.length > 20) {
                    wechatNum = wechatNum.substring(0, 12) + "...";
                }
            }
            objOrder = <div>
                <section className="container" style={{ display: displayState }}>
                    <div className="row noAppTitle" style={{ display: 'none' }}>
                        <div className="col-xs-4 col-sm-4 left" onClick={me.leftFunction}>关闭</div>
                        <div className="col-xs-4 col-sm-4 middle"><img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/logoLeft.png" /></div>
                        <div className="col-xs-4 col-sm-4"></div>
                    </div>
                    <aside className="row order common">
                        <div className="row col-xs-12 col-sm-12 orderDetail">
                            <div className="col-xs-8 col-sm-8 left">订单编号：<span id="orderId">{data.resp.orderId}</span></div>
                            <div className="col-xs-4 col-sm-4 right" id="orderStatus">{arr1[data.resp.orderType]}</div>
                        </div>
                        <div className="row col-xs-12 col-sm-12 info" onClick={me.infoFunction}>
                            <div className="col-xs-3 col-sm-3 infoImg"><img id="orderImg" src={data.resp.goodsUrl} /></div>
                            <div className="col-xs-9 col-sm-9 infoDesc">
                                <h3 id="orderName">{data.resp.goodsName}</h3>
                                <div className="infoDesc_bottom">
                                    <p className="campBegin">开营时间：<span id="beginTime">{beginTime2}</span></p>
                                    <p className="price" id="price">¥<span id="totalPrice">{data.resp.origPrice}</span></p>
                                </div>
                            </div>
                        </div>
                    </aside>
                    {/*
                         <aside className="row common content content5">
                         <div className="row col-xs-12 col-sm-12">
                         <div className="col-xs-5 col-sm-5 left">参营人</div>
                         <div className="col-xs-7 col-sm-7 right" id="userName">{data.resp.userName}</div>
                         </div>
                         </aside>
                         */}
                    <aside className="row common content content1" style={{ height: "auto" }}>
                        <div className="borderTop jiHuo content1-padding" style={{ display: ((data.resp.orderType == 1) && (data.resp.activationCode != null)) ? "block" : "none" }}>

                            <div className="col-xs-7 col-sm-7 left" style={{ 'display': (isIOS == true) ? "none" : "block" }}>
                                 激活码：<input className="activationCode readonly" ref="activationCode" id="needCode" value={data.resp.activationCode} type="text" readOnly unselectable="on" />
                             </div>
                             <div className="col-xs-7 col-sm-7 left" style={{ 'display': (isIOS == true) ? "block" : "none" }}>
                                激活码：<span className="activationCode2">{data.resp.activationCode}</span>
                             </div>

                            {
                                /*<div className="col-xs-7 col-sm-7 left">
                                 <span className="">激活码：</span><input className="activationCode readonly" ref="activationCode" value={data.resp.activationCode} type="text" readOnly />
                                 </div>*/
                            }

                            <div style={{ 'display': (isIOS == true) ? "none" : "block" }} className="col-xs-5 col-sm-5 right" id="copy"><span className="copyText" data-clipboard-target="#needCode" data-clipboard-action="copy">复制</span></div>
                            <div style={{ 'display': (isIOS == true) ? "block" : "none" }} className="col-xs-5 col-sm-5 right" id="copy"><span className="copyText" style={{ 'border': 'none' }}>可长按复制</span></div>
                        </div>
                        <div className="row col-xs-12 col-sm-12 content1-padding">
                            <div className="col-xs-5 col-sm-5 left">手机号</div>
                            <div className="col-xs-7 col-sm-7 right" id="phoneNum">{data.resp.phoneNo}</div>
                        </div>
                        {/*
                             <div className="row col-xs-12 col-sm-12 borderTop content1-padding" style={{display:"block"}}>
                             <div className="col-xs-5 col-sm-5 left">微信号</div>
                             <div className="col-xs-7 col-sm-7 right" id="wechatNum">{wechatNum}</div>
                             </div>
                             */}
                    </aside>
                    <aside className="row common content content2">
                        <div className="row col-xs-12 col-sm-12">
                            <div className="col-xs-5 col-sm-5 left">支付方式</div>
                            <div className="col-xs-7 col-sm-7 right">微信支付</div>
                        </div>
                    </aside>
                    <aside className="row common content content3">
                        <div className="row col-xs-12 col-sm-12">
                            <div className="col-xs-5 col-sm-5 left">商品总额</div>
                            <div className="col-xs-7 col-sm-7 right right2">¥<span
                                id="origPrice">{data.resp.origPrice}</span></div>
                            <div className="col-xs-5 col-sm-5 left">优惠券</div>
                            <div className="col-xs-7 col-sm-7 right right2">-¥<span
                                id="couponPrice">{data.resp.couponPrice}</span></div>
                            <div className="col-xs-6 col-sm-6 left"></div>
                            <div className="col-xs-6 col-sm-6 right right2 right3"><span>实付款</span><span
                                id="currentPrice" style={{ marginLeft: '1rem' }}>{aboutCurrentPrice}</span></div>
                        </div>
                    </aside>
                    <aside style={{ 'display': (isIOS == false) ? "block" : "none" }} className="row common content content4 service" id="copyService" data-clipboard-action="copy" data-clipboard-target="#picooc"/* onClick={me.serviceFunction}*/>
                        <div className="row col-xs-12 col-sm-12 contact">
                            <img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/orderDetailsOut/server.png" /> <span>联系客服</span>
                        </div>
                        <input ref="picooc" id="picooc" value="picooc2" type="text" readOnly style={{ position: 'absolute', opacity: '0', left: '0', zIndex: '-9' }} />
                    </aside>
                    <aside style={{ 'display': (isIOS == true) ? "block" : "none" }} className="row common content content4 service" onClick={me.iOsServiceFunction}>
                        <div className="row col-xs-12 col-sm-12 contact">
                            <img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/orderDetailsOut/server.png" /> <span>联系客服</span>
                        </div>
                    </aside>
                    <aside className="row common content status" style={{ display: payState }}>
                        <div className="row col-xs-12 col-sm-12">
                            <div className="row col-xs-6 col-sm-6 left">
                                <div className="col-xs-12 col-sm-12 time">待付款剩余时间</div>
                                <div className="col-xs-12 col-sm-12 timeNum">
                                    <span id="hour"></span>
                                    <span id="minute"></span>
                                    <span id="second"></span>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-6 right">
                                <span className="cancel" onClick={me.cancelOrderFunction}
                                    data-order_id={data.resp.orderId}
                                    data-goods_id={data.resp.goodsId}>取消订单</span><span
                                        onClick={me.goToPayFunction} className="gotoPay" data-order={JSON.stringify(data.resp)} data-order_id={data.resp.orderId}
                                        style={{ marginLeft: '1rem' }}>去支付</span>
                            </div>
                        </div>
                    </aside>

                    <aside className="alertBox" style={{ display: "none" }}>
                        <div className="alerts">复制成功</div>
                    </aside>

                </section>

                <aside className="row fixbg">
                    <div className="col-xs-12 col-sm-12 fixbg-main">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 fixbg-main-t"></div>
                            <div className="col-xs-12 col-sm-12 fixbg-main-btn">
                                <div className="row row1">
                                    <div className="col-xs-12 col-sm-12 fixbg-main-btn1"></div>
                                    {/*<div className="col-xs-6 col-sm-6 fixbg-main-btn2"></div>*/}
                                </div>
                                <div className="row row2" style={{'display':"none"}}>
                                    <div className="col-xs-6 col-sm-6 fixbg-main-btn1"></div>
                                    <div className="col-xs-6 col-sm-6 fixbg-main-btn2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                <aside className="row fixBg">
                    <div className="col-xs-12 col-sm-12 fixBg-main">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 fixBg-top">
                                <div className="row">

                                    <div className="col-xs-12 col-sm-12 fixBg-p"></div>

                                </div>
                            </div>
                        </div>
                    </div>

                </aside>
            </div>
        }
        else {
            objOrder = <i></i>;
        }
        return (
            objOrder
        );

    },
    getOrderInfo: function () {
        var me = this;
        var finalUrl = ajaxLink + "/v1/api/campOrder/orderInfo" + window.location.search;
        //var finalUrl = "http://172.17.1.233:8080/v1/api/campOrder/orderInfo" + window.location.search;
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    console.log(data);
                    console.log(finalUrl);
                    if (typeof me.state.orderDetailsData.resp != "undefined") {
                        if (me.state.orderDetailsData.resp.records.length > 0) {
                            data.resp.records = me.state.orderDetailsData.resp.records.concat(data.resp.records);
                        }
                    }
                    me.setState({ orderDetailsData: data });

                    //复制激活码
                    var clipboard = new Clipboard('.copyText');
                    var clipboard2 = new Clipboard('#copyService');

                    clipboard.on('success', function (e) {
                        console.log(e);
                        $('.alertBox').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                    });

                    clipboard.on('error', function (e) {
                        console.log(e);
                    });
                    clipboard2.on('success', function (e) {
                        console.log(e);

                        $(".fixbg-main-t").html('已复制燃脂营售后客服微信号<span style="color:#35d0c5;">picooc2</span>，请前往微信，在顶部搜索中粘贴');
                        $(".fixbg-main-t").css("text-align", "left");
                        $(".fixbg-main-btn1").html("我知道了");
                        $(".fixbg-main-btn2").html("前往微信");
                        $(".fixbg").css("display", "block");
                        $(".fixbg-main").css("margin-top", -$(".fixbg-main").height() / 2);
                        $(".fixbg-main").css("width", "90%");
                        $(".fixbg-main").css("left", "5%");
                        /*$(".fixbg-main-btn2").unbind("click").click(function(){
                         setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing,SDingDanXiangQing.SDingDanXiangQing_QianWangWeiXin);
                         $(".fixbg").css("display","none");
                         var deviceType=isMobile();
                         if(deviceType == "isApp"){
                         if(getParamByUrl('webver')>2){
                         appFc.gotoWechat();
                         }else{
                         mobileApp.gotoWechat();
                         }
                         }
                         });*/
                        $(".fixbg-main-btn1").unbind("click").click(function () {
                            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_QuXiaoLianXiKeFu);
                            $(".fixbg").css("display", "none");
                        });

                    });

                    clipboard2.on('error', function (e) {
                        console.log(e);
                    });

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
        })
    },

    iOsServiceFunction: function () {
        $(".fixbg-main-t").html('如有疑问，请添加燃脂营售后客服微信哦~（微信号：<span style="color:#35d0c5;">picooc2</span>）');
        $(".fixbg-main-t").css("text-align", "left");
        $(".fixbg-main-btn1").html("我知道了");
        $(".fixbg-main-btn2").html("前往微信");
        $(".fixbg").css("display", "block");
        $(".fixbg-main").css("margin-top", -$(".fixbg-main").height() / 2);
        $(".fixbg-main").css("width", "90%");
        $(".fixbg-main").css("left", "5%");
        /*$(".fixbg-main-btn2").unbind("click").click(function(){
         setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing,SDingDanXiangQing.SDingDanXiangQing_QianWangWeiXin);
         $(".fixbg").css("display","none");
         var deviceType=isMobile();
         if(deviceType == "isApp"){
         if(getParamByUrl('webver')>2){
         appFc.gotoWechat();
         }else{
         mobileApp.gotoWechat();
         }
         }
         });*/
        $(".fixbg-main-btn1").unbind("click").click(function () {
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_QuXiaoLianXiKeFu);
            $(".fixbg").css("display", "none");
        });
    },

    //点击进入详情页
    infoFunction: function () {
        var me = this;
        var data = me.state.orderDetailsData;
        setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_QianWangShangPinXiangQing);
        var linkId = data.resp.linkId;
        // alert(linkId);
        if (linkId != null) {
            window.location.href = "productDetails.html?refer=4&linkId=" + linkId;//refer=4从订单详情页进入
        }
    },
    //打开微信
    serviceFunction() {
        setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_LianXiKeFu);

        //复制
        var me = this;
        console.log('me', me);
        me.refs.picooc.select(); // 选择对象
        console.log(me.refs.picooc);
        document.execCommand("Copy"); // 执行浏览器复制命令
        //alert("已复制好，可贴粘。");

        /*var deviceType=isMobile();
        if(deviceType == "isApp"){
            var getPageInfo = function (){
                var data = {
                    content:"picooc2"
                };
                return JSON.stringify(data);
            };
            //复制到手机剪贴板
            if(getParamByUrl('webver')>2){
                appFc.copyContent(getPageInfo());
            }else{
                mobileApp.copyContent(getPageInfo());
            }
        }*/

        // $(".fixbg-main-t").html('燃脂营售后服务微信号<span style="color:#c7b1a4;">picooc2</span>，已复制到剪贴板，请前往微信，在顶部搜索中粘贴');
        $(".fixbg-main-t").html('已复制燃脂营售后客服微信号<span style="color:#35d0c5;">picooc2</span>，请前往微信，在顶部搜索中粘贴');
        $(".fixbg-main-t").css("text-align", "left");
        $(".fixbg-main-btn1").html("我知道了");
        $(".fixbg-main-btn2").html("前往微信");
        $(".fixbg").css("display", "block");
        $(".fixbg-main").css("margin-top", -$(".fixbg-main").height() / 2);
        $(".fixbg-main").css("width", "90%");
        $(".fixbg-main").css("left", "5%");
        /*$(".fixbg-main-btn2").unbind("click").click(function(){
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing,SDingDanXiangQing.SDingDanXiangQing_QianWangWeiXin);
            $(".fixbg").css("display","none");
            var deviceType=isMobile();
            if(deviceType == "isApp"){
                if(getParamByUrl('webver')>2){
                    appFc.gotoWechat();
                }else{
                    mobileApp.gotoWechat();
                }
            }
        });*/
        $(".fixbg-main-btn1").unbind("click").click(function () {
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_QuXiaoLianXiKeFu);
            $(".fixbg").css("display", "none");
        });
    },
    //取消订单
    cancelOrderFunction: function () {
        var me = this;
        setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_ShiFouQuXiaoDingDan);
        goodsId = $(".cancel").attr("data-goods_id");
        $(".fixbg-main-t").html("确认取消订单？");
        $(".fixbg-main-t").css("text-align", "center");
        $(".fixbg-main-btn1").html("取消订单");
        $(".fixbg-main-btn2").html("暂不取消");
        $(".fixbg .row1").css("display", "none");
        $(".fixbg .row2").css("display", "block");
        $(".fixbg").css("display", "block");
        $(".fixbg-main").css("margin-top", -$(".fixbg-main").height() / 2);
        $(".fixbg-main").css("width", "84%");
        $(".fixbg-main").css("left", "8%");
        $(".fixbg-main-btn2").unbind("click").click(function () {
            $(".fixbg .row1").css("display", "block");
            $(".fixbg .row2").css("display", "none");
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_ZanBuQuXiao);
            $(".fixbg").css("display", "none");
        });
        $(".fixbg-main-btn1").unbind("click").click(function () {
            $(".fixbg .row1").css("display", "block");
            $(".fixbg .row2").css("display", "none");
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_QuXiaoDingDan);
            //取消订单
            me.cancelOrder(2);
        });
    },
    //去支付
    goToPayFunction: function (event) {
        var me = this;
        var data = me.state.orderDetailsData;
        setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_QuZhiFu);
        setCookiePath("toOrderSuccess", "2", 1, "/;domain=picooc.com");
        var goodsInfo1 = JSON.parse(event.currentTarget.getAttribute("data-order"));
        var goodsInfo = {
            "goodsId": goodsInfo1.goodsId,
            "orderId": goodsInfo1.orderId,
            "userId": 0,//app外全部为0
            "phoneNo": goodsInfo1.phoneNo,
            "origPrice": goodsInfo1.originPrice,
            "currentPrice": goodsInfo1.currentPrice,
            "couponPrice": goodsInfo1.couponPrice,
            "isCoupon": goodsInfo1.isCoupon,
            "couponId": goodsInfo1.couponId,
            'orderUrl': goodsInfo1.orderUrl,
            "sourceType": goodsInfo1.sourceType,
            "trafficSource": goodsInfo1.trafficSource, //流量来源，开屏/push/短信/banner/其他
            "isOwnPicooc": goodsInfo1.isOwnPicooc //是否有秤
        };
        localStorage.setItem('goodsInfos', JSON.stringify(goodsInfo))
        var orderId = event.currentTarget.getAttribute("data-order_id");
        var currentPrice = event.currentTarget.getAttribute("data-price");
        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        // 判断当前页面是否在微信内，若在使用公众号（微信内）支付方式，若不在使用微信的h5支付方式
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            // alert(goodsInfo.sourceType);
            // var code = getParamByUrl('code');
            // 判断是否存在微信code，若没有使用微信api回调当前页面，返回code
            // if (getParamByUrl('code') == 'false') {
            if (goodsInfo.sourceType == '微信') {
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
                // alert('微信里')
                window.location.href = "payment.html" + str + '&phoneNo=' + goodsInfo.phoneNo + '&fromGo=1';

            }
            else if (goodsInfo.sourceType == '燃脂营APP' || goodsInfo.sourceType == '有赞') {
                $(".error-main-t").html('该订单在有品app上生成哒，请在同一个渠道完成支付~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }
            else if (goodsInfo.sourceType == '微博') {
                $(".error-main-t").html('该订单在微博上生成哒，请在同一个渠道完成支付~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }
            else if (goodsInfo.sourceType == 'QQ') {
                $(".error-main-t").html('该订单在qq上生成哒，请在同一个渠道完成支付~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }
            else if (goodsInfo.sourceType == '浏览器') {
                $(".error-main-t").html('该订单在浏览器上生成哒，请在同一个渠道完成支付~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }

        }
        else {
            // alert(goodsInfo.sourceType);
            if (goodsInfo.sourceType == '微信') {
                $(".error-main-t").html('该订单在微信上生成哒，请在同一个渠道完成支付~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }
            else if (goodsInfo.sourceType == '燃脂营APP' || goodsInfo.sourceType == '有赞') {
                $(".error-main-t").html('该订单在有品app上生成哒，请在同一个渠道完成支付~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }
            else {
                // alert('微信外');
                // 微信外
                removeParamByUrl('phoneNo');
                var url = window.location.search.substring(1);
                var arr = url.split("&");
                var result = [];
                var str = '?';
                for (var i = 0; i < arr.length; i++) {
                    var param = arr[i].split("=");
                    if ('phoneNo' != param[0]) {
                        str += '&' + param[0] + '=' + param[1];
                    }
                }
                // '&orderId=' + goodsInfo.orderId +
                window.location.href = "payment.html" + str + '&phoneNo=' + goodsInfo.phoneNo + '&orderUrl=' + goodsInfo.orderUrl + '&fromGo=1';

            }
            //    (goodsInfo.sourceType == '浏览器') else
            // else if (goodsInfo.sourceType == '微博'){
            //     $(".error-main-t").html('该订单在微博上生成哒，请在同一个渠道完成支付~');
            //     $(".errorAlert").css("display", "block");
            //     $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            // }
            // else if (goodsInfo.sourceType == 'QQ'){
            //     $(".error-main-t").html('该订单在qq上生成哒，请在同一个渠道完成支付~');
            //     $(".errorAlert").css("display", "block");
            //     $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            // }
        }
        event.stopPropagation();
    },
    timeDiffer: function (nowTime, endTime) {
        var me = this;
        if ((getParamByUrl("os") == "iOS") || (!!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))) {
            endTime = endTime.replace(/-/g, "/");
            nowTime = nowTime.replace(/-/g, "/");
        } else { }
        var intDiff = new Date(endTime) - new Date(nowTime);
        // alert((new Date(endTime))+'|'+ (new Date(nowTime)));
        intDiff = parseInt(intDiff / 1000);//倒计时总秒数量
        console.log('intDiff', intDiff);
        var t1 = setInterval(function () {

            if (intDiff >= 0) {
                var day = Math.floor(intDiff / (60 * 60 * 24));
                var hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                var minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                var second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                hour = (hour < 10 ? '0' : '') + hour;
                minute = (minute < 10 ? '0' : '') + minute;
                second = (second < 10 ? '0' : '') + second;
                $("#hour").html(hour + ':');
                $('#minute').html(minute + ':');
                $('#second').html(second);
                intDiff--;
            } else if (intDiff < 0) {
                console.log(intDiff);
                clearInterval(t1);
                me.cancelOrder(3);  //关闭订单
            }
        }, 1000);
    },
    //订单取消或关闭；
    cancelOrder: function (orderType) {
        var me = this;
        console.log(goodsId);
        var finalUrl = ajaxLink + "/v1/api/campOrder/updateOrder" + window.location.search + "&goodsId=" + goodsId + "&orderType=" + orderType;
        //var finalUrl="http://172.17.1.233:8080/v1/api/campOrder/updateOrder"+window.location.search+"&goodsId="+goodsId+"&orderType="+orderType;
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function (data) {
                console.log(finalUrl);
                if (data.code == 200) {
                    if (orderType == 2) {
                        $(".fixbg").css("display", "none");
                        $(".status").css("display", "none");
                        $(".wait").html("已取消");
                        $(".wait").css("color", "#adadad");

                        $(".fixBg").css("display", "block");
                        $(".fixBg-p").css("display", "block");
                        $(".fixBg-p").html("订单已取消");
                        $(".fixBg").css("height", $(window).height());
                        $(".fixBg-main").css("width", $(window).width() - 140);
                        $(".fixBg-main").css("margin-top", -$(".fixBg-main").height() / 2);
                        setTimeout(function () {
                            $(".fixBg").css("display", "none");
                            $(".fixBg-p").css("display", "none");
                        }, 1500);
                    } else if (orderType == 3) {
                        $(".status").css("display", "none");
                        $(".wait").html("已关闭");
                        $(".wait").css("color", "#adadad");
                    }

                } else {
                    $(".fixbg").css("display", "none");
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
        })
    },
    //长按复制
    copyFunction: function () {



        /*var me = this;
        me.refs.activationCode.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令*/
        //alert("已复制好，可贴粘。");
        //$('.alertBox').stop(true).fadeIn(200).delay(2000).fadeOut(200);
    },

    //leftFunction
    leftFunction:function(){
        window.location.href = 'productDetails.html?eventName=fatBurn&typeSize=1&refer=1&linkId='+getParamByUrl('linkId');
    }
});

var Component = React.createClass({

    render: function () {
        return (
            <div>
                <OrderDetailsContainer />
                <Public_error />
            </div>
        );
    }
});

ReactDOM.render(
    <Component />, document.getElementById('orderDetailsBox')
);