var React = require("react");
var ReactDOM = require("react-dom");
var PubSub = require("pubsub-js");
var SXuanZeYouHuiQuan = {
    SCategory_SXuanZeYouHuiQuan: 5080300,
    SXuanZeYouHuiQuan_BuShiYongYouHuiQuan: 5080301,//不使用优惠券
    SXuanZeYouHuiQuan_ShiYongYouHuiQuan: 5080302//使用优惠券
};
var CouponList = React.createClass({

    CircleClick: function (event) {
        event.stopPropagation();
        event.preventDefault();
        setMaiDian(SXuanZeYouHuiQuan.SCategory_SXuanZeYouHuiQuan, SXuanZeYouHuiQuan.SXuanZeYouHuiQuan_BuShiYongYouHuiQuan);//不使用优惠券埋点
        $("#couponBox").css("display","none");

    },
    SelectCircle: function (event) {
        event.stopPropagation();
        //event.preventDefault();
        var couponList = this.props.couponList;
        var $circle1 = $(".circle1"); //伪数组
        var ele = event.currentTarget;
        $circle1.removeClass("active");
        $circle1.attr("src", "https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle2.png");
        $(ele).children().children(".circle1").attr("src", "https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png");
        $(ele).children().children(".circle1").addClass("active");
        var value = $(ele).find('.value2').html();
        //alert(value);

        var index = $(ele).attr('data-index');
        var currentCouponId = (value == undefined) ? null : couponList[index - 1].id;
        // setCookie('youHuiState', value, 1);//设置优惠状态的cookie
        // setCookie('currentCouponId', currentCouponId, 1);//设置优惠状态的cookie--id

        //PubSub.publish("youHuiState",value);
        //PubSub.publish("currentCouponId",currentCouponId);

        setCookie('chooseIndex', $(ele).index(), 1);//选中的优惠券列表的第几个
        if (ele.nodeName.toLowerCase() == 'aside') {
            setMaiDian(SXuanZeYouHuiQuan.SCategory_SXuanZeYouHuiQuan, SXuanZeYouHuiQuan.SXuanZeYouHuiQuan_BuShiYongYouHuiQuan);//不使用优惠券埋点
            setCookie('chooseIndex', 'noChoose2', 1);//不选优惠券
            // console.log(getCookie('chooseIndex'));

        } else if (ele.nodeName.toLowerCase() == 'div') {
            setMaiDian(SXuanZeYouHuiQuan.SCategory_SXuanZeYouHuiQuan, SXuanZeYouHuiQuan.SXuanZeYouHuiQuan_ShiYongYouHuiQuan);//使用优惠券埋点
            setCookie('chooseIndex', index - 1, 1);//选中的可用优惠券列表的第几个
            // console.log(getCookie('chooseIndex'));
        }
        
        var objYouhui = {
            youHuiState:value,
            currentCouponId:currentCouponId
        };
        var jsonData = JSON.stringify(objYouhui);
        PubSub.publish("jsonData",jsonData);
        $("#couponBox").css("display","none");

    },

    // 选择好优惠券之后，页面自动跳转到确认订单页面；
    /*deleteHistory: function () {
        var getPageInfo = function () {
            var data = {
                backNum: 1,//默认为1，
                closeWebview: 0//默认为0
            };
            return JSON.stringify(data);
        };
        appFc.deleteHistory(getPageInfo());
    },*/
    render: function () {
        var me=this;
        var couponList = this.props.couponList;
        var couponListHTML = [];
        // var NoCoupon = [];
        var hasCanUse = false;
        if (couponList.length > 0) {
            for (var i = 0; i < couponList.length; i++) {
                if (couponList[i].isUse == 0) {//没用过
                    if (!couponList[i].expire) {//没有过期
                        hasCanUse = true;
                        couponListHTML.push(
                            <div className="row col-xs-12 col-sm-12 avail isAvail" key={i} /* onClick={this.CircleClick}*/>
                                <div className="msg msg2 msgActive" onClick={this.SelectCircle} data-index={i + 1}>
                                    <div className="col-xs-8 col-sm-8 continue"><img className="circle circle1 aboutCircle keYongQuan" src="https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png" />&nbsp;&nbsp;
                                    <span>{couponList[i].name}</span>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 value"><span className="value1">¥</span> <span className="value2">{couponList[i].value}</span></div>
                                </div>
                                <div className="col-xs-12 col-sm-12 term">有效期：{couponList[i].beginTime + '-'}{couponList[i].endTime}</div>
                                <div className="col-xs-12 col-sm-12 require"> {couponList[i].rule}</div>
                            </div>
                        )
                    }
                    else {//过期
                        couponListHTML.push(
                            <div className="row col-xs-12 col-sm-12 avail notAvail" key={i}>
                                <div className="msg">
                                    <div className="col-xs-8 col-sm-8 continue"><img className="circle" src="https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle2.png" />&nbsp;&nbsp;
                                     <span>{couponList[i].name}</span>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 value"><span className="value1">¥</span> <span className="value2">{couponList[i].value}</span></div>
                                </div>
                                <div className="col-xs-12 col-sm-12 term">有效期：{couponList[i].beginTime + '-'}{couponList[i].endTime}</div>
                                <div className="col-xs-12 col-sm-12 require">{couponList[i].rule}</div>
                                <img className="status" src="https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/expire.png" />
                            </div>
                        )
                    }
                }
                else if (couponList[i].isUse == 1) {//已使用
                    couponListHTML.push(
                        <div className="row col-xs-12 col-sm-12 avail notAvail" key={i}>
                            <div className="msg">
                                <div className="col-xs-8 col-sm-8 continue"><img className="circle" src="https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle2.png" />&nbsp;&nbsp;<span>{couponList[i].name}</span></div>
                                <div className="col-xs-4 col-sm-4 value"><span className="value1">¥</span> <span className="value2">{couponList[i].value}</span></div>
                            </div>
                            <div className="col-xs-12 col-sm-12 term">有效期：{couponList[i].beginTime + ' - '}{couponList[i].endTime}</div>
                            <div className="col-xs-12 col-sm-12 require">{couponList[i].rule}</div>
                            <img className="status" src="https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/used.png" />
                        </div>
                    )
                }
            }
        } else {
            // NoCoupon.push(
            //     <div className="row noCoupon" key='0'>暂无可使用的优惠券～</div>
            // );
            // console.log(NoCoupon);
        }
        return (
            <div className="row">
                <aside className="row noCoupons msg2" onClick={this.SelectCircle} data-index='0'>
                    <div className="col-xs-2 col-sm-2 noImg"><img className="circle circle1" src={(hasCanUse == true)?"https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle2.png":"https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png"} /></div>
                    <div className="col-xs-10 col-sm-10 noUse">不使用优惠劵</div>
                </aside>
                <aside className="row coupons" style={{ 'display': 'block' }}>
                    {couponListHTML}
                    {/*{NoCoupon}*/}
                </aside>
            </div>
        )
    }
});

var CouponContainer = React.createClass({
    getInitialState: function () {
        /*var getPageInfo = function () {
            var data = {
                title: '我的优惠券',
                color: "",
                opacity: "",
                backgroundColor: "",
                backgroundOpacity: ""
            };
            return JSON.stringify(data);
        };
        appFc.controlTitle(getPageInfo());*/
        return {
            couponList: []
        }
    },
    componentWillMount: function () {
        //alert(1);
        var chooseIndex = getCookie('chooseIndex');
        //alert(chooseIndex);
        console.log('chooseIndex=' + chooseIndex);//选中的优惠券列表的第几个
        var finalUrl = ajaxLink + "/v1/api/campCoupon/findCouponOut" + window.location.search;
        //var finalUrl = "http://172.17.1.233:8080/v1/api/campCoupon/findCouponOut" + window.location.search;
        console.log(finalUrl);
        this.serverRequest = $.get(finalUrl, function (data) {
            console.log(1, data);
            if (data.code == 200) {

                //setCookie('youHuiState', '', 1);//清除优惠状态的cookie
                console.log("getCookie('youHuiState')", getCookie('youHuiState'));
                this.setState({
                    couponList: data.resp.couponList//获取优惠券列表数据
                });
                if (data.resp.couponList.length > 0) {
                    //如果只有一张可用券，则默认选中
                    if ($('.msg2 .keYongQuan').length == 0) {
                        $(".circle1:first").attr("src", "https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png");//不使用优惠券打勾
                    }
                    //判断选中的是哪一个优惠券，再次进入该页面时，上一次选中的优惠券前面打勾
                    $('.aboutCircle').attr('src', 'https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle2.png');
                    if (chooseIndex != '') {
                        if (chooseIndex == 'noChoose2') {
                            $(".circle1:first").attr("src", "https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png");//不使用优惠券
                        } else {
                            $('.aboutCircle').eq(Number(chooseIndex)).attr('src', 'https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png');//第chooseIndex个有效的优惠券前面打勾
                        }
                    } else {
                        $('.aboutCircle:first').attr('src', 'https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png');//第一个有效的优惠券前面打勾(默认状态)
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
    render: function () {
        var couponList = this.state.couponList;
        return (
            <section id="couponBox" className="container">
                {/*燃脂营优惠券*/}
                <CouponList couponList={couponList} />
            </section>
        )
    }
});
module.exports = CouponContainer; 
