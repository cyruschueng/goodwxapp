var React = require("react");
var ReactDOM = require("react-dom");
var Public_error = require('./Public_error.jsx');
/*alert(getCookie('reloadBtn') == 'undefined');
if(getCookie('reloadBtn') == 'undefined'){
    //setCookie();
}
var reloadBtn = true;
//if(reloadBtn)*/
var SWoDeYouHuiQuan = {
    SCategory_SWoDeYouHuiQuan: 5080900,
    SWoDeYouHuiQuan_RanZhiYingYouHuiQuan: 5080901,//燃脂营优惠券
    SWoDeYouHuiQuan_GouChengYouHuiMa: 5080902,//购秤优惠码
    SWoDeYouHuiQuan_QianWangYouZan: 5080903,//前往有赞
    SWoDeYouHuiQuan_RanZhiYingDingDan: 5080904//燃脂营订单
};

var SWoDeDingDan = {
    SCategory_SWoDeDingDan: 5080400,
    SWoDeDingDan_DengDaiFuKuan: 5080401,//等待付款
    SWoDeDingDan_YiWanCheng: 5080402,//已完成
    SWoDeDingDan_YiGuanBi: 5080403,//已关闭
    SWoDeDingDan_YiQuXiao: 5080404,//已取消
    SWoDeDingDan_QuZhiFu: 5080405//去支付
};
var publicData = {
    outAppLogin: (getCookie('appOutPhone') == false) ? false : true
};
window.publicData = publicData;
var MyInfoBoxContainer = React.createClass({

    getInitialState: function () {
        var me = this;
        me.getOrders();
        me.findCoupon();
        //me.getCampCode();
        /*var titleData = {
            title: "燃脂营优惠券",
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        titleData = JSON.stringify(titleData);
        appFc.controlTitle(titleData);*/
        return {
            myOrderData: {},
            couponList: [],
            codeList: []
        }
    },
    componentWillMount: function () {
        if (publicData.outAppLogin == false) {
                window.location.href = 'productDetails.html?linkId=' + getParamByUrl('linkId') + "&innerToOut=1";
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
        var data = me.state.myOrderData;
        var str = "";


        if (typeof me.state.myOrderData.resp != "undefined") {


            if (data.resp.records.length > 0) {
                var str1 = "";
                var str2 = <span className="wait">等待付款</span>;
                var str3 = <span className="ok">已完成</span>;
                var str4 = <span className="ok">已关闭</span>;
                var str5 = <span className="ok">已取消</span>;
                var str6 = "";
                var str7 = "";
                var str8 = <span className="ok">退款中</span>;
                var str9 = <span className="ok">退款完成</span>;

                var list = [];
                for (var i = 0; i < data.resp.records.length; i++) {
                    if (data.resp.records[i].orderType == 0) {
                        str6 = str2;
                        str7 = <div className="col-xs-4 col-sm-4 gotoPay"><span data-order={JSON.stringify(data.resp.records[i])} onClick={me.payToFunction} className="PayTo" data-goods_type={data.resp.records[i].goodsType} data-price={data.resp.records[i].currentPrice} data-order_id={data.resp.records[i].orderId}>去支付</span></div>;
                    } else if (data.resp.records[i].orderType == 1) {
                        str6 = str3;
                        str7 = "";
                    } else if (data.resp.records[i].orderType == 2) {
                        str6 = str5;
                        str7 = "";
                    } else if (data.resp.records[i].orderType == 3) {
                        str6 = str4;
                        str7 = "";
                    } else if (data.resp.records[i].orderType == 4) {
                        str6 = str8;
                        str7 = "";
                    } else if (data.resp.records[i].orderType == 5) {
                        str6 = str9;
                        str7 = "";
                    }
                    //var goodsUrl = JSON.parse(data.resp.records[i].goodsUrl);
                    if (data.resp.records[i].goodsType == 1) {
                        list.push(
                            <aside key={i} data-index={i} className="row order" data-goods_type={data.resp.records[i].goodsType}
                                data-order_id={data.resp.records[i].orderId} onClick={me.orderFunction} >
                                <div className="row col-xs-12 col-sm-12 orderDetail">
                                    <div className="col-xs-8 col-sm-8 number">订单编号：{data.resp.records[i].orderId}</div>
                                    <div className="col-xs-4 col-sm-4 waitPay">{str6}<img
                                        src="http://cdn2.picooc.com/web/res/fatburn/image/myOrder/more.png" />
                                    </div>
                                </div>
                                <div className="row col-xs-12 col-sm-12 info">
                                    <div className="col-xs-3 col-sm-3 infoImg"><img src={data.resp.records[i].goodsUrl} /></div>
                                    <div className="col-xs-9 col-sm-9 infoDesc">
                                        <h3>{data.resp.records[i].goodsName}</h3>
                                        <p>开营时间：{data.resp.records[i].beginTime}</p>
                                    </div>
                                </div>
                                <div className="row col-xs-12 col-sm-12 pay">
                                    <div className="col-xs-8 col-sm-8 payNum">实付款：<span
                                        className="payprice">¥{data.resp.records[i].currentPrice}</span>
                                    </div>
                                    {str7}</div>
                            </aside>
                        );
                    } else if (data.resp.records[i].goodsType == 2) {
                        var saleTime = (data.resp.records[i].createTime).substring(0, 10);
                        list.push(
                            <aside key={i} data-index={i} className="row order" data-goods_type={data.resp.records[i].goodsType}
                                data-order_id={data.resp.records[i].orderId} onClick={me.orderFunction}>
                                <div className="row col-xs-12 col-sm-12 orderDetail">
                                    <div className="col-xs-8 col-sm-8 number">订单编号：{data.resp.records[i].orderId}</div>
                                    <div className="col-xs-4 col-sm-4 waitPay">{str6}<img src="http://cdn2.picooc.com/web/res/fatburn/image/myOrder/more.png" />
                                    </div>
                                </div>
                                <div className="row col-xs-12 col-sm-12 info">
                                    <div className="col-xs-3 col-sm-3 infoImg"><img src={data.resp.records[i].goodsUrl} /></div>{/**/}
                                    <div className="col-xs-9 col-sm-9 infoDesc">
                                        <h3>{data.resp.records[i].goodsName}</h3>
                                        <p>购买时间：{saleTime}</p>
                                    </div>
                                </div>
                                <div className="row col-xs-12 col-sm-12 pay">
                                    <div className="col-xs-8 col-sm-8 payNum">实付款：<span className="payprice">¥{data.resp.records[i].currentPrice}</span>
                                    </div>
                                    {str7}
                                </div>
                            </aside>
                        );
                    }
                }
                str = list;
            } else {
                str = <div className="row noOrder">暂无相关订单信息~</div>;
            }
        }


        var displayCoupon = me.state.couponList.length > 0 ? "none" : "block";
        var displayCode = me.state.codeList.length > 0 ? "none" : "block";
        var strCoupon = [];
        var strCode = [];
        return (
            <section className="container">
                <div className="row noAppTitle" style={{ display: 'none' }}>
                    <div className="col-xs-4 col-sm-4 left" onClick={me.leftFunction}>返回</div>
                    <div className="col-xs-4 col-sm-4 middle"><img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/logoLeft.png" /></div>
                    <div className="col-xs-4 col-sm-4"></div>
                </div>

                {/*标题*/}
                {
                    /*<aside className="row title">
                     <div className="col-xs-6 col-sm-6 leftTitle leftBox" onClick={me.leftBoxFunction} ref="leftBox">燃脂营优惠券</div>
                     <div className="col-xs-6 col-sm-6 rightBox" onClick={me.rightBoxFunction} ref="rightBox">购秤优惠码</div>
                     </aside>*/
                }
                <aside className="row titleNew">
                    <div className="col-xs-4 col-sm-4 tab activeTab" onClick={me.leftBoxFunction} ref="leftBox">订单</div>
                    <div className="col-xs-4 col-sm-4 tab" onClick={me.middleBoxFunction} ref="middleBox">优惠券</div>
                    <div className="col-xs-4 col-sm-4 tab" onClick={me.rightBoxFunction} ref="rightBox">购秤优惠码</div>
                </aside>

                <div className="myOrders">
                    {str}
                </div>

                {/*燃脂营优惠券*/}
                <aside className="row coupons" style={{ display: 'none' }}>
                    <div style={{ display: displayCoupon }} className="row noCoupon">暂无可使用的优惠券~</div>
                    {
                        me.state.couponList.map(function (item, index) {
                            if (item.isUse == 0) {
                                if (!item.expire) {
                                    strCoupon.push(
                                        <div key={index} className="row col-xs-12 col-sm-12 avail isAvail">
                                            <div className="msg msgActive">
                                                <div className="col-xs-6 col-sm-6 continue">{item.name}</div>
                                                <div className="col-xs-6 col-sm-6 value">
                                                    <span className="value1">¥</span> <span
                                                        className="value2">{item.value}</span></div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 term">有效期：{item.beginTime} - {item.endTime}</div>
                                            <div className="col-xs-12 col-sm-12 require">{item.rule}</div>
                                            <div className="col-xs-12 col-sm-12 goToSale goToSaleIsAlive" data-link={item.link} onClick={me.goToLink}>立即使用</div>
                                        </div>
                                    )
                                } else {
                                    strCoupon.push(
                                        <div key={index} className="row col-xs-12 col-sm-12 avail notAvail">
                                            <div className="msg">
                                                <div className="col-xs-6 col-sm-6 continue">{item.name}</div>
                                                <div className="col-xs-6 col-sm-6 value"><span
                                                    className="value1">¥</span> <span
                                                        className="value2">{item.value}</span></div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 term">有效期：{item.beginTime} - {item.endTime}</div>
                                            <div className="col-xs-12 col-sm-12 require">{item.rule}</div>
                                            <img className="status" src="image/withoutCamp/coupon3.png" />
                                            <div className="col-xs-12 col-sm-12 goToSale">立即使用</div>
                                        </div>
                                    )
                                }
                            } else if (item.isUse == 1) {
                                strCoupon.push(
                                    <div key={index} className="row col-xs-12 col-sm-12 avail notAvail">
                                        <div className="msg">
                                            <div className="col-xs-6 col-sm-6 continue">{item.name}</div>
                                            <div className="col-xs-6 col-sm-6 value"><span className="value1">¥</span> <span
                                                className="value2">{item.value}</span></div>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 term">有效期：{item.beginTime} - {item.endTime}</div>
                                        <div className="col-xs-12 col-sm-12 require">{item.rule}</div>
                                        <img className="status" src="image/withoutCamp/coupon2.png" />
                                        <div className="col-xs-12 col-sm-12 goToSale">立即使用</div>
                                    </div>
                                )
                            }
                        })
                    }
                    {strCoupon}
                </aside>

                {/*购秤优惠码*/}
                <aside className="row couponCode" style={{ display: 'none' }}>
                    <div style={{ display: displayCode }} className="row noCoupon">暂无可使用的优惠码~</div>
                    {
                        me.state.codeList.map(function (item, index) {
                            if (!item.expire) {
                                strCode.push(
                                    <div key={index} className="row col-xs-12 col-sm-12 avail isAvail divBox">
                                        <div className="msg msgActive">
                                            <div className="col-xs-8 col-sm-8 continue">
                                                <p className="zan">{item.name}</p>
                                                <input type="text" style={{ position: 'absolute', zIndex: '-999' }} id={'theCode' + index} ref={'theCode' + index} value={item.coupon_code} readOnly />
                                                <p className="zanNum">
                                                    <span className="aboutCouponCode">{item.coupon_code}</span>&nbsp;
                                                    <span data-index={index} data-code={item.coupon_code} className="copy copy3" id={"copyThisCode" + index} data-clipboard-action="copy" data-clipboard-target={"#theCode" + index}
                                                        /*onClick={me.copyFunction}*/>&nbsp;复制&nbsp;</span>
                                                </p>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 value"><span className="value1">¥</span> <span
                                                className="value2">{item.value}</span></div>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 term">有效期：{item.begin_time}
                                            - {item.end_time}</div>
                                        <div className="col-xs-12 col-sm-12 require">{item.rule}</div>
                                        <div className="col-xs-12 col-sm-12 goTo" onClick={me.goToFunction}>前往有赞使用</div>
                                    </div>
                                )
                            } else {
                                strCode.push(
                                    <div key={index} className="row col-xs-12 col-sm-12 avail notAvail divBox">
                                        <div className="msg">
                                            <div className="col-xs-8 col-sm-8 continue">
                                                <p className="zan">{item.name}</p>
                                                <input type="text" style={{ position: 'absolute', zIndex: '-999' }} id={'theCode' + index} ref={'theCode' + index} value={item.coupon_code} readOnly />
                                                <p className="zanNum zanNum2"><span className="aboutCouponCode">{item.coupon_code}</span>&nbsp;
                                                    <span data-index={index} data-code={item.coupon_code} className="copy copy2" id={"copyThisCode" + index} data-clipboard-action="copy" data-clipboard-target={"#theCode" + index}
                                                        /*onClick={me.copyFunction}*/> &nbsp;复制&nbsp;</span></p>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 value"><span className="value1">¥</span> <span
                                                className="value2">{item.value}</span></div>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 term">有效期：{item.begin_time}
                                            - {item.end_time}</div>
                                        <div className="col-xs-12 col-sm-12 require">{item.rule}</div>
                                        <img className="status" src="image/withoutCamp/coupon3.png" />
                                        <div className="col-xs-12 col-sm-12 goTo goTo2" onClick={me.goToFunction}>前往有赞使用
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                    {strCode}
                </aside>

            </section>
        );
    },
    /*获取优惠券列表*/
    findCoupon: function () {
        var me = this;
        var finalUrl = ajaxLink + "/v1/api/campCoupon/findCouponOut" + window.location.search;
        //var finalUrl="http://172.17.1.233:8080/v1/api/campCoupon/findCouponOut"+window.location.search;
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function (data) {
                console.log('获取优惠券列表', data);
                console.log(finalUrl);
                if (data.code == 200) {

                    me.setState({
                        couponList: data.resp.couponList,
                        codeList: data.resp.codeList
                    });

                    for (var i = 0; i < data.resp.codeList.length; i++) {
                        var clipboard = new Clipboard('#copyThisCode' + i);

                        clipboard.on('success', function (e) {
                            console.log(e);
                            $(".fixBg").css("height", $(window).height());
                            $(".fixBg-main").css("width", $(window).width() - 140);
                            $(".fixBg-p").css("display", "block");
                            $(".fixBg").css("display", "block");
                            $(".fixBg-p").html("复制成功，前往有赞去使用吧~");
                            $(".fixBg-main").css("margin-top", -$(".fixBg-main").height() / 2);
                            setTimeout(function () {
                                $(".fixBg").css("display", "none");
                                $(".fixBg-p").css("display", "none");
                            }, 1500);
                        });
                        clipboard.on('error', function (e) {
                            console.log(e);
                        });
                    }


                } else {
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            }
        });
    },

    /*获取购秤优惠码列表*/
    getCampCode: function () {
        var me = this;
        var finalUrl = ajaxLink + "/v1/api/campCode/getCampCode" + window.location.search;
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function (data) {
                console.log(data);
                console.log(finalUrl);
                if (data.code == 200) {
                    console.log('获取购秤优惠码列表', data);
                    /*me.setState({
                        couponList:data.resp.couponList,
                        codeList:data.resp.codeList
                    });*/

                } else {
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            }
        });
    },

    /*前往有赞使用*/
    goToFunction: function () {
        setMaiDian(SWoDeYouHuiQuan.SCategory_SWoDeYouHuiQuan, SWoDeYouHuiQuan.SWoDeYouHuiQuan_QianWangYouZan);
        var deviceType = isMobile();//判断是不是app的方法
        if (deviceType == "isApp") {
            var data = {
                link: "https://h5.koudaitong.com/v2/goods/361jk71ya1ddk",
                animation: 1//默认1从右到左，2从下到上
            };
            data = JSON.stringify(data);
            appFc.openWebview(data);
        } else {
            window.location.href = "https://h5.koudaitong.com/v2/goods/361jk71ya1ddk";
        }
    },
    /*复制有赞优惠码*/
    copyFunction: function (event) {
        var me = this;
        console.log(me);
        //alert($('.divBox').length);
        event.stopPropagation();
        var copycontent = event.currentTarget.getAttribute("data-code");
        var index = event.currentTarget.getAttribute("data-index");
        //alert(index);
        var aboutRef = 'theCode' + index;
        console.log('22', me.refs[aboutRef]);
        me.refs[aboutRef].select();
        document.execCommand("Copy"); // 执行浏览器复制命令
        //alert("已复制好，可贴粘。");

        //app复制内容到剪切板
        var deviceType = isMobile();
        if (deviceType == "isApp") {
            var getPageInfo = function () {
                var data = {
                    content: copycontent
                };
                return JSON.stringify(data);
            };
            appFc.copyContent(getPageInfo);
        }
        $(".fixBg").css("height", $(window).height());
        $(".fixBg-main").css("width", $(window).width() - 140);
        $(".fixBg-p").css("display", "block");
        $(".fixBg").css("display", "block");
        $(".fixBg-p").html("复制成功，前往有赞去使用吧~");
        $(".fixBg-main").css("margin-top", -$(".fixBg-main").height() / 2);
        setTimeout(function () {
            $(".fixBg").css("display", "none");
            $(".fixBg-p").css("display", "none");
        }, 1500);
    },
    /*切换到优惠券*/
    leftBoxFunction: function (event) {
        var me = this;
        setMaiDian(SWoDeYouHuiQuan.SCategory_SWoDeYouHuiQuan, SWoDeYouHuiQuan.SWoDeYouHuiQuan_RanZhiYingYouHuiQuan);
        $('.titleNew .tab').removeClass("activeTab");
        $(me.refs.leftBox).addClass('activeTab');
        $('.myOrders').show();
        $('.coupons,.couponCode').hide();
    },
    middleBoxFunction: function (event) {
        var me = this;
        setMaiDian(SWoDeYouHuiQuan.SCategory_SWoDeYouHuiQuan, SWoDeYouHuiQuan.SWoDeYouHuiQuan_RanZhiYingDingDan);
        $('.titleNew .tab').removeClass("activeTab");
        $(me.refs.middleBox).addClass('activeTab');
        $('.coupons').show();
        $('.myOrders,.couponCode').hide();
    },
    /*切换到优惠码*/
    rightBoxFunction: function (event) {
        var me = this;
        setMaiDian(SWoDeYouHuiQuan.SCategory_SWoDeYouHuiQuan, SWoDeYouHuiQuan.SWoDeYouHuiQuan_GouChengYouHuiMa);
        $('.titleNew .tab').removeClass("activeTab");
        $(me.refs.rightBox).addClass('activeTab');
        $('.couponCode').show();
        $('.myOrders,.coupons').hide();
    },



    //获取订单列表(原接口没有改)
    getOrders: function () {
        var me = this;
        var finalUrl = ajaxLink + "/v1/api/campOrder/findOrders" + window.location.search;
        //var finalUrl="http://172.17.1.233:8080/v1/api/campOrder/findOrders"+window.location.search;
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    console.log("获取订单列表", data);
                    //console.log(finalUrl);
                    if (typeof me.state.myOrderData.resp != "undefined") {
                        if (me.state.myOrderData.resp.records.length > 0) {
                            data.resp.records = me.state.myOrderData.resp.records.concat(data.resp.records);
                        }
                    }
                    me.setState({ myOrderData: data });
                } else {
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            }
        });
    },

    //跳转到订单详情页
    orderFunction: function (event) {
        event.stopPropagation();
        var me = this;
        var data = me.state.myOrderData;
        $(event.currentTarget).css("opacity", "0.6");
        var index = event.currentTarget.getAttribute("data-index");//设置埋点
        if (data.resp.records[index].orderType == 0) {
            setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan, SWoDeDingDan.SWoDeDingDan_DengDaiFuKuan);//等待付款
        } else if (data.resp.records[index].orderType == 1) {
            setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan, SWoDeDingDan.SWoDeDingDan_YiWanCheng);//已完成
        } else if (data.resp.records[index].orderType == 2) {
            setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan, SWoDeDingDan.SWoDeDingDan_YiQuXiao);//已取消
        } else if (data.resp.records[index].orderType == 3) {
            setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan, SWoDeDingDan.SWoDeDingDan_YiGuanBi);//已关闭
        }
        var orderId = event.currentTarget.getAttribute("data-order_id");
        setCookiePath("toOrderDetails", "1", 1, "/;domain=picooc.com");
        // setCookie("toOrderDetails","1",1); //在cookie中存放跳转到订单详情页面的标识 1为从订单列表跳转的
        if (event.currentTarget.getAttribute("data-goods_type") == 1) {
            window.location.href = "orderDetailsOut.html" + window.location.search + "&orderId=" + orderId;
        } else if (event.currentTarget.getAttribute("data-goods_type") == 2) {
            window.location.href = "OrderDetailsOut.html" + window.location.search + "&orderId=" + orderId;
        }
    },

    //去支付
    payToFunction: function (event) {
        event.stopPropagation();
        setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan, SWoDeDingDan.SWoDeDingDan_QuZhiFu);//去支付
        //$(event.currentTarget).css("opacity", "0.6");
        delCookie("toOrderSuccess");
        setCookiePath("toOrderSuccess", "1", 1, "/;domain=picooc.com");
        // alert("测试toOrderSuccess:"+getCookie("toOrderSuccess"));

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
                
                window.location.href = "payment.html" + str + '&phoneNo=' + goodsInfo.phoneNo + '&orderId=' + goodsInfo.orderId + '&fromGo=1';

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
                window.location.href = "payment.html" + str + '&phoneNo=' + goodsInfo.phoneNo + '&orderUrl=' + goodsInfo.orderUrl + '&orderId=' + goodsInfo.orderId + '&fromGo=1';

            }
            // if (goodsInfo.sourceType == '浏览器')
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
    //可用优惠券可点击，跳转到售卖页面
    goToLink: function (event) {
        var link = event.currentTarget.getAttribute("data-link");//设置埋点
        window.location.href = link;
    },
    //leftFunction
    leftFunction:function(){
        window.history.go(-1);
    }
});

var FixBg = React.createClass({
    render: function () {
        return (
            <div>
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
        );
    }
});

var Component = React.createClass({

    render: function () {
        return (
            <div>
                <MyInfoBoxContainer />
                <Public_error />
                <FixBg />
            </div>
        );
    }
});

ReactDOM.render(
    <Component />, document.getElementById('myInfoBox')
);