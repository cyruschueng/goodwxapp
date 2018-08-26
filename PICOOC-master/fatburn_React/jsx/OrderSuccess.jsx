var React = require("react");
var ReactDOM = require("react-dom");
var Public_error = require('./Public_error.jsx');

var SXiaDanChengGong = {
    SCategory_SXiaDanChengGong: 5080600,
    SXiaDanChengGong_LiJiTianXieWenJuan: 5080601//立即填写问卷
};

var OrderSuccess = React.createClass({
    getInitialState: function () {
        var getPageInfo = function () {
            var data = {
                title: "下单成功",
                /*isShare:false,
                backgroundColor:'#2c2f31'*/
                color: "",
                opacity: "",
                backgroundColor: "",
                backgroundOpacity: ""
            };
            return JSON.stringify(data);
        };
        appFc.controlTitle(getPageInfo());
        var getControl = function () {
            setCookiePath("toOrderDetails", "2", 1, "/;domain=picooc.com");
            // setCookie("toOrderDetails","2",1); //在cookie中存放跳转到订单详情页面的标识 2为从下单成功页面跳转的
            window.location.href = "orderDetails.html" + window.location.search;
        }
        window.getControl = getControl;
        var getPageInfo6 = function () {
            var data = {
                iconType: 1,//0走图片逻辑，1走文案逻辑
                rightStr: {
                    str: "查看",
                    color: "",
                    opacity: "",
                    id: "0",
                    type: "0",
                    functionName: "getControl",
                    redDotType: "1",
                    redDotShow: false,
                    redDotNum: "0",
                    nativeType: "",
                    content: ""
                },
                rightIcon: []
            };
            return JSON.stringify(data);
        };
        appFc.controlRight(getPageInfo6());
        var deviceType = isMobile();
        if (deviceType == "isApp" && (getParamByUrl("testtype") != "tanchao")) {
            // alert(getCookie("toOrderSuccess"));
            if (getCookie("toOrderSuccess") == "1") {
                //如果是从订单列表支付
                var getPageInfo = function () {
                    var data = {
                        iconType: 1,
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
            } else if (getCookie("toOrderSuccess") == "2") {
                var getPageInfo = function () {
                    //如果是从订单详情支付
                    var data = {
                        iconType: 1,
                        iconColor: "",
                        backNum: 2,
                        closeWebview: 0,
                        hidden: false,
                        isHandle: false,
                        functionName: ""
                    };
                    return JSON.stringify(data);
                };
                appFc.controlLeft(getPageInfo());
            } else {
                //如果是从确认订单支付
                var getPageInfo = function () {
                    var data = {
                        iconType: 1,
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
            }
        }
        return {}
    },
    ToQuestion: function (event) {
        event.stopPropagation();
        var ele = event.currentTarget;
        $(ele).css("opacity", "0.6");
        setMaiDian(SXiaDanChengGong.SCategory_SXiaDanChengGong, SXiaDanChengGong.SXiaDanChengGong_LiJiTianXieWenJuan);
        setCookie("toQuestionnaire", "1", 1);
        var finalUrl = location.origin + "/v1/api/campQuestion/complete" + window.location.search;
        $.ajax({
            url: finalUrl,
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    // 填写过问卷
                    if (data.resp.profile == true) {
                        var url = absoluteUrl + "questionnaireShow.html" + window.location.search;
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

                    } else { // 未填写过
                        var url = absoluteUrl + "questionnaire2.html" + window.location.search;
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
        var getPageInfo = function () {
            var data = {
                link: url,
                animation: 1//默认1从右到左，2从下到上
            };
            return JSON.stringify(data);
        };
        var deviceType = isMobile();
        if (deviceType == "isApp" && (getParamByUrl("testtype") != "tanchao")) {
            appFc.openWebview(getPageInfo());
        } else {
            window.location.href = url;
        }

    },
    render: function () {

        return (
            <section className="container">
                <aside className="row sucess">
                    <img src="image/withoutCamp/order1.png" alt="" /><br></br>
                    <span className="span1">恭喜您下单成功!</span><br></br>
                </aside>
                <aside className="row leadQuestion">
                    <p>立即填写<span className="greenfont">《入营前调查问卷》</span></p>
                    <p>获取您的专属定制服务</p>
                </aside>
                <aside className="row questionImg">
                    <img className="Img1" src="image/withoutCamp/bg14.png" />
                </aside>
                <aside className="row">
                    <div className="viewOrder toQuestion" onClick={this.ToQuestion}>立即填写问卷</div>
                </aside>
            </section>
        )
    }
});

ReactDOM.render(<OrderSuccess />, document.getElementById('orderSuccess_container'));


