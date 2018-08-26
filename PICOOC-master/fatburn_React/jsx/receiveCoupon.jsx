var React=require("react");
var ReactDOM=require("react-dom");
var Public_error = require('./Public_error.jsx');
var STianWenJuanLingQuan={
	SCategory_STianWenJuanLingQuan:5081100,
	STianWenJuanLingQuan_LiJiXuYing:5081101,//立即续营
	STianWenJuanLingQuan_WoZhiDaoLe:5081102//我知道了
};
var windowSearch = getCookie("windowSearch");
var ReceiveCouponContainer=React.createClass({
    getInitialState:function(){
        var me = this;
        $('body').height($(window).height());
        me.getCoupon();
        var titleData = {
            title:"有品燃脂营",
            color:"",
            opacity:"",
            backgroundColor:"",
            backgroundOpacity:""
        };
        titleData=JSON.stringify(titleData);
        appFc.controlTitle(titleData);

        var getPageInfo = function (){
            var data = {
                iconType:1,
                iconColor:"",
                backNum:2,
                closeWebview:0,
                hidden:false,
                isHandle:false,
                functionName:""
            };
            return JSON.stringify(data);
        };
        appFc.controlLeft(getPageInfo());

        return {
            receiveCouponData:[]
        }
    },

    render:function(){
        var me = this;
        var data = [];
        var receiveCouponStr = "";
        var continueName = "";
        if(me.state.receiveCouponData.resp != undefined){
            var showAside = me.state.receiveCouponData.resp.success?"block":"none";
            var hideAside = me.state.receiveCouponData.resp.success?"none":"block";
            data = me.state.receiveCouponData;
            receiveCouponStr = (
                <section className="container">
                    <aside className="row receive receive1" style={{display:showAside}}>
                        <div className="col-xs-12 col-sm-12 status"><img src="image/_receiveCoupon/true.png" alt=""/></div>
                        <div className="col-xs-12 col-sm-12 status2">领取成功!</div>
                        <div className="col-xs-12 col-sm-12 content1" id="rule">恭喜您获得续营优惠券及提前购买资格，点击下方“立即续营”</div>
                        <div className="row col-xs-12 col-sm-12 xuying">
                            <div className="col-xs-6 col-sm-6 continue" id="name">{data.resp.coupon.name}</div>
                            <div className="col-xs-6 col-sm-6 value"><span className="value1">¥</span> <span className="value2" id="value">{data.resp.coupon.value}</span></div>
                            <div className="col-xs-12 col-sm-12 term">有效期：<span id="beginTime">{data.resp.coupon.beginTime}</span> - <span id="endTime">{data.resp.coupon.endTime}</span></div>
                        </div>
                        <div className="col-xs-12 col-sm-12 now saveCamp" onClick={me.saveCampFunction}>立即续营</div>
                    </aside>
                    <aside className="row receive receive2" style={{display:hideAside}}>
                        <div className="col-xs-12 col-sm-12 status"><img src="image/_receiveCoupon/false.png"/></div>
                        <div className="col-xs-12 col-sm-12 status2 statusFalse">领取失败!</div>
                        <div className="col-xs-12 col-sm-12 content2">已经领过本券了哦～</div>
                        <div className="col-xs-12 col-sm-12 girl"><img src="image/_receiveCoupon/girl.png"/></div>
                        <div className="col-xs-12 col-sm-12 now iknow" onClick={me.iknowFunction}>我知道了</div>
                    </aside>
                </section>
            );
        }
        return (
            <div>{receiveCouponStr}</div>
        );
    },

    /*获取优惠券信息*/
    getCoupon:function () {
        var me = this;
        var finalUrl = ajaxLink + "/v1/api/campCoupon/getCoupon" + windowSearch;
        //var finalUrl = ajaxLink + "/v1/api/campCoupon/getCoupon?userId=1620003&campId=20";//测试
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function (data) {
                console.log(data);
                console.log(finalUrl);
                if (data.code == 200) {
                    me.setState({
                        receiveCouponData: data
                    });
                } else {
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            }
        })
    },

    /*我知道了*/
    iknowFunction:function(){
        setMaiDian(STianWenJuanLingQuan.SCategory_STianWenJuanLingQuan, STianWenJuanLingQuan.STianWenJuanLingQuan_WoZhiDaoLe);
        var getPageInfo = function () {
            var data = {
                backNum: 2,//默认为1，
                closeWebview: 0//默认为0
            };
            return JSON.stringify(data);
        };
        appFc.deleteHistory(getPageInfo);
    },

    /*立即续营*/
    saveCampFunction:function(){
        var me = this;
        setCookiePath("saveCampFrom", "1", 1, "/;domain=picooc.com");
        setMaiDian(STianWenJuanLingQuan.SCategory_STianWenJuanLingQuan, STianWenJuanLingQuan.STianWenJuanLingQuan_LiJiXuYing);
        var link = me.state.receiveCouponData.resp.link;
        var linkSearch = "";
        if (link.indexOf("?") >= 0) {
            linkSearch = '&' + link.split("?")[1];
            link = link.split("?")[0];
        }
        window.location.href = link + windowSearch + linkSearch;
    }
});

var Component=React.createClass({

    render:function (){
        return (
            <div>
                <ReceiveCouponContainer />
                <Public_error />
            </div>
        );
    }
});

ReactDOM.render(
    <Component />,document.getElementById('receiveCouponBox')
);