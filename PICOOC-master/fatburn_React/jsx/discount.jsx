var React=require("react");
var ReactDOM=require("react-dom");
var Public_error = require('./Public_error.jsx');
var SWoDeYouHuiQuan={
    SCategory_SWoDeYouHuiQuan:5080900,
    SWoDeYouHuiQuan_RanZhiYingYouHuiQuan:5080901,//燃脂营优惠券
    SWoDeYouHuiQuan_GouChengYouHuiMa:5080902,//购秤优惠码
    SWoDeYouHuiQuan_QianWangYouZan:5080903//前往有赞
};

var DiscountContainer=React.createClass({
    
    getInitialState:function(){
        var me = this;
        me.findCoupon();
        var titleData = {
            title:"燃脂营优惠券",
            color:"",
            opacity:"",
            backgroundColor:"",
            backgroundOpacity:""
        };
        titleData=JSON.stringify(titleData);
        appFc.controlTitle(titleData);
        return {
            couponList:[],
            codeList:[]
        }
    },
    render:function(){
        var me = this;
        var displayCoupon = me.state.couponList.length>0 ? "none" : "block";
        var displayCode = me.state.codeList.length>0 ? "none" : "block";
        var strCoupon = [];
        var strCode = [];
        return (
            <section className="container">

                {/*标题*/}
                <aside className="row title">
                    <div className="col-xs-6 col-sm-6 leftTitle leftBox" onClick={me.leftBoxFunction} ref="leftBox">燃脂营优惠券</div>
                    <div className="col-xs-6 col-sm-6 rightBox" onClick={me.rightBoxFunction} ref="rightBox">购秤优惠码</div>
                </aside>

                {/*燃脂营优惠券*/}
                <aside className="row coupons"  style={{display:'block'}}>
                    <div style={{display:displayCoupon}} className="row noCoupon">暂无可使用的优惠券~</div>
                    {
                        me.state.couponList.map(function(item, index){
                            if(item.isUse == 0){
                                if(!item.expire){
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
                                }else{
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
                                            <img className="status" src="image/withoutCamp/coupon3.png"/>
                                            <div className="col-xs-12 col-sm-12 goToSale" onClick={me.aaa}>立即使用</div>
                                        </div>
                                    )
                                }
                            }else if(item.isUse == 1){
                                strCoupon.push(
                                    <div key={index} className="row col-xs-12 col-sm-12 avail notAvail">
                                        <div className="msg">
                                            <div className="col-xs-6 col-sm-6 continue">{item.name}</div>
                                            <div className="col-xs-6 col-sm-6 value"><span className="value1">¥</span> <span
                                                className="value2">{item.value}</span></div>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 term">有效期：{item.beginTime} - {item.endTime}</div>
                                        <div className="col-xs-12 col-sm-12 require">{item.rule}</div>
                                        <img className="status" src="image/withoutCamp/coupon2.png"/>
                                        <div className="col-xs-12 col-sm-12 goToSale" onClick={me.aaa}>立即使用</div>
                                    </div>
                                )
                            }
                        })
                    }
                    {strCoupon}
                </aside>

                {/*购秤优惠码*/}
                <aside className="row couponCode" style={{display:'none'}}>
                    <div style={{display:displayCode}}  className="row noCoupon">暂无可使用的优惠码~</div>
                    {
                        me.state.codeList.map(function(item, index){
                            if(!item.expire){
                                strCode.push(
                                    <div key={index} className="row col-xs-12 col-sm-12 avail isAvail">
                                        <div className="msg msgActive">
                                            <div className="col-xs-8 col-sm-8 continue">
                                                <p className="zan">{item.name}</p>
                                                <p className="zanNum">{item.coupon_code}&nbsp;<span
                                                    data-code={item.coupon_code} className="copy copy3"
                                                    onClick={me.copyFunction}>&nbsp;复制&nbsp;</span></p>
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
                            }else{
                                strCode.push(
                                    <div key={index} className="row col-xs-12 col-sm-12 avail notAvail">
                                        <div className="msg">
                                            <div className="col-xs-8 col-sm-8 continue">
                                                <p className="zan">{item.name}</p>
                                                <p className="zanNum zanNum2">{item.coupon_code}&nbsp;<span
                                                    className="copy copy2">&nbsp;复制&nbsp;</span></p>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 value"><span className="value1">¥</span> <span
                                                className="value2">{item.value}</span></div>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 term">有效期：{item.begin_time}
                                            - {item.end_time}</div>
                                        <div className="col-xs-12 col-sm-12 require">{item.rule}</div>
                                        <img className="status" src="image/withoutCamp/coupon3.png"/>
                                        <div className="col-xs-12 col-sm-12 goTo goTo2" /*onClick={me.goToFunction}*/>前往有赞使用
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
    findCoupon:function(){
        var me =this;
        var finalUrl=ajaxLink+"/v1/api/campCoupon/findCoupon"+window.location.search;
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function (data) {
                console.log(data);
                console.log(finalUrl);
                if(data.code == 200){

                    me.setState({
                        couponList:data.resp.couponList,
                        codeList:data.resp.codeList
                    });

                }else{
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display","block");
                    $(".error-main").css("margin-top",-$(".error-main").height()/2);
                }
            }
        });
    },

    /*前往有赞使用*/
    goToFunction:function(){
        setMaiDian(SWoDeYouHuiQuan.SCategory_SWoDeYouHuiQuan,SWoDeYouHuiQuan.SWoDeYouHuiQuan_QianWangYouZan);
        var deviceType=isMobile();//判断是不是app的方法
        if(deviceType == "isApp"){
            var data={
                link:"https://h5.koudaitong.com/v2/goods/361jk71ya1ddk",
                animation: 1//默认1从右到左，2从下到上
            };
            data=JSON.stringify(data);
            appFc.openWebview(data);
        }else{
            window.location.href="https://h5.koudaitong.com/v2/goods/361jk71ya1ddk";
        }
    },
    /*复制有赞优惠码*/
    copyFunction:function(event){
        event.stopPropagation();
        var copycontent = event.currentTarget.getAttribute("data-code");
        //app复制内容到剪切板
        var deviceType=isMobile();
        if(deviceType == "isApp"){
            var getPageInfo = function (){
                var data = {
                    content:copycontent
                };
                return JSON.stringify(data);
            };
            appFc.copyContent(getPageInfo);
        }
        $(".fixBg").css("height",$(window).height());
        $(".fixBg-main").css("width",$(window).width()-140);
        $(".fixBg-p").css("display","block");
        $(".fixBg").css("display","block");
        $(".fixBg-p").html("复制成功，前往有赞去使用吧~");
        $(".fixBg-main").css("margin-top",-$(".fixBg-main").height()/2);
        setTimeout(function(){
            $(".fixBg").css("display","none");
            $(".fixBg-p").css("display","none");
        },1500);
    },
    /*切换到优惠券*/
    leftBoxFunction:function(event){
        var me = this;
        setMaiDian(SWoDeYouHuiQuan.SCategory_SWoDeYouHuiQuan,SWoDeYouHuiQuan.SWoDeYouHuiQuan_RanZhiYingYouHuiQuan);
        $(me.refs.leftBox).addClass('leftTitle').next().removeClass('rightTitle');
        $('.coupons').show();
        $('.couponCode').hide();
    },
    /*切换到优惠码*/
    rightBoxFunction:function(event){
        var me = this;
        setMaiDian(SWoDeYouHuiQuan.SCategory_SWoDeYouHuiQuan,SWoDeYouHuiQuan.SWoDeYouHuiQuan_GouChengYouHuiMa);
        $(me.refs.rightBox).addClass('rightTitle').prev().removeClass('leftTitle');
        $('.couponCode').show();
        $('.coupons').hide();
    },

    //可用优惠券可点击，跳转到售卖页面
    goToLink:function(event){
        var link = event.currentTarget.getAttribute("data-link");//设置埋点
        window.location.href = link+'&'+window.location.search.substring(1);
    }
});

var FixBg = React.createClass({
    render:function(){
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

var Component=React.createClass({

    render:function (){
        return (
            <div>
                <DiscountContainer />
                <Public_error />
                <FixBg />
            </div>
        );
    }
});

ReactDOM.render(
    <Component />,document.getElementById('discountBox')
);