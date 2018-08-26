webpackJsonp([30],{

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_error = __webpack_require__(3);

//alert(window.location.href);

var SXiaoXiLieBiao = {
    SCategory_SXiaoXiLieBiao: 5060600,
    SXiaoXiLieBiao_QianWangXiaoXiXiangQing: 5060601, //前往消息详情
    SXiaoXiLieBiao_ChaKanGengZaoHuiFu: 5060602 //查看更早回复
};

var MessageList = React.createClass({
    displayName: "MessageList",

    getInitialState: function getInitialState() {

        var me = this;
        return {
            //readedMessageData:[]
        };
    },
    setMessageStatus: function setMessageStatus(replyId, url, checkId) {
        var me = this;
        var validData = [];
        setMaiDian(SXiaoXiLieBiao.SCategory_SXiaoXiLieBiao, SXiaoXiLieBiao.SXiaoXiLieBiao_QianWangXiaoXiXiangQing);
        console.info(url);
        var host = window.location.protocol + "//" + window.location.host;
        var finalUrl = host + "/v1/api/camp/checkState" + window.location.search + "&replyId=" + replyId + "&checkId=" + checkId;
        $.ajax({
            type: "get",
            url: finalUrl,
            success: function success(data) {

                if (data.resp.check && data.resp.reply) {
                    var host1 = window.location.protocol + "//" + window.location.host;
                    var finalUrl1 = host1 + "/v1/api/camp/changeReplyRead" + window.location.search + "&replyId=" + replyId;
                    $.ajax({
                        type: "get",
                        url: finalUrl1,
                        success: function success(data1) {
                            if (data1.code != 200) {
                                $(".error-main-t").html("服务器开小差了～");
                                $(".errorAlert").css("display", "block");
                                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                            } else {
                                //打开一个新的webWiew
                                var deviceType = isMobile();
                                if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
                                    me.openNewWebview(url);
                                } else {
                                    window.location.href = url;
                                }
                            }
                        }
                    });
                } else {
                    if (!data.resp.check) {
                        $(".error-main-t").html("该条打卡已被删除~");
                        $(".errorAlert").css("display", "block");
                        $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                        for (var i = 0; i < me.props.messageData.resp.replyList.length; i++) {
                            if (me.props.messageData.resp.replyList[i].checkId != checkId) {
                                validData.push(me.props.messageData.resp.replyList[i]);
                            }
                        }
                        me.props.getVaildFc(validData);
                    } else {
                        $(".error-main-t").html("该条评论已被删除~");
                        $(".errorAlert").css("display", "block");
                        $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                        for (var i = 0; i < me.props.messageData.resp.replyList.length; i++) {
                            if (me.props.messageData.resp.replyList[i].replyId != replyId) {
                                validData.push(me.props.messageData.resp.replyList[i]);
                            }
                        }
                        me.props.getVaildFc(validData);
                    }
                    var noMsgNum = $("#noReadMessage li").length;
                    //$("#"+checkId).remove();
                    if (noMsgNum == 1) {
                        $("#getDataButton").find("span").click();
                    }
                }
            }
        });
    },
    openNewWebview: function openNewWebview(url) {
        //url=absoluteUrl+url;
        console.info(url);
        var getPageInfo = function getPageInfo() {
            var data = {
                link: url,
                animation: 1 //默认1从右到左，2从下到上
            };
            return JSON.stringify(data);
        };
        var deviceType = isMobile();
        if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
            appFc.openWebview(getPageInfo());
        } else {
            window.location.href = url;
        }
    },
    render: function render() {
        var me = this;
        var list = [];
        var data = me.props.messageData;
        console.info(JSON.stringify(data) == "{}");
        //if(data.resp.replyList.length > 0){
        if (!(JSON.stringify(data) == "{}")) {
            var listLength = data.resp.replyList.length;
            for (var i = 0; i < listLength; i++) {
                var notifyUrl = absoluteUrl + "info.html" + window.location.search + "&checkId=" + data.resp.replyList[i].checkId + "&replyId=" + data.resp.replyList[i].replyId;
                //data.resp.replyList[i].content=data.resp.replyList[i].content.replace(/<br\s*\/?>/gi,"\r\n");
                list.push(React.createElement(
                    "li",
                    { className: "li_border", id: data.resp.replyList[i].checkId, key: i, "data-index": i },
                    React.createElement(
                        "div",
                        { className: "tidings_list_header" },
                        React.createElement("img", { src: data.resp.replyList[i].headImg, onError: imgError.bind(this, data.resp.replyList[i].sex) })
                    ),
                    React.createElement(
                        "div",
                        { className: "tidings_list_right" },
                        React.createElement(
                            "div",
                            { onClick: me.setMessageStatus.bind(this, data.resp.replyList[i].replyId, notifyUrl, data.resp.replyList[i].checkId) },
                            React.createElement(
                                "div",
                                { className: "tidings_list_one" },
                                React.createElement(
                                    "span",
                                    { className: "tidings_list_name", style: data.resp.replyList[i].isCoach ? { color: '#ffa200' } : {} },
                                    data.resp.replyList[i].roleName
                                ),
                                "\u56DE\u590D\u4E86\u60A8\uFF1A"
                            ),
                            React.createElement("div", { className: "tidings_list_con", dangerouslySetInnerHTML: { __html: data.resp.replyList[i].content } }),
                            React.createElement(
                                "div",
                                { className: "tidings_list_time" },
                                data.resp.replyList[i].time
                            ),
                            React.createElement("span", { className: "tidings_list_icon" })
                        )
                    )
                ));
            }
        }
        return React.createElement(
            "ul",
            { id: "readedMessage" },
            list
        );
    }
});

var DateBtn = React.createClass({
    displayName: "DateBtn",

    getInitialState: function getInitialState() {
        var me = this;
        return {
            //hasNextData:0
        };
    },
    getDataBtn: function getDataBtn() {
        var me = this;
        var data = me.props.messageData;
        if (!(JSON.stringify(data) == "{}")) {
            if (data.resp.hasNext == 1) {
                me.props.getMessageListFc(data.resp.time);
            }
        }
    },
    render: function render() {
        var me = this;
        var data = me.props.messageData;
        var btnHtml;
        if (!(JSON.stringify(data) == "{}")) {
            if (data.resp.hasNext == 0) {
                if (data.resp.replyList.length == 0) {
                    $(".loading").css("display", "block");
                    $(".loading").text("目前没有消息回复哦");
                }
                btnHtml = React.createElement(
                    "li",
                    { className: "tidings_list_prompt noMoreData" },
                    React.createElement(
                        "div",
                        { className: "tidings_list_prompt_div" },
                        React.createElement("span", { style: { display: 'block' } })
                    )
                );
            } else {
                btnHtml = React.createElement(
                    "li",
                    { className: "tidings_list_prompt noMoreData" },
                    React.createElement(
                        "div",
                        { className: "tidings_list_prompt_div" },
                        React.createElement(
                            "span",
                            { style: { display: 'block' }, onClick: me.getDataBtn },
                            "\u67E5\u770B\u66F4\u65E9\u7684\u56DE\u590D\xA0"
                        ),
                        "\xA0\xA0",
                        React.createElement("span", { className: "tidings_list_icon2" })
                    )
                );
            }
        }
        return React.createElement(
            "div",
            { id: "getDataButton" },
            btnHtml
        );
    }
});

var MessageListContainer = React.createClass({
    displayName: "MessageListContainer",

    getInitialState: function getInitialState() {
        var me = this;
        me.getMessageListFc("-1");

        var titleData = {
            title: "消息列表",
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        titleData = JSON.stringify(titleData);
        appFc.controlTitle(titleData);
        return {
            hasNextData: 0,
            messageData: {}
        };
    },
    getVaildFc: function getVaildFc(validData) {
        var me = this;
        var oldData = me.state.messageData;
        oldData.resp.replyList = validData;
        console.info(oldData);
        me.setState({ messageData: oldData });
    },
    getMessageListFc: function getMessageListFc(lastDateTime) {
        var me = this;
        var targetRoleId = getParamByUrl("roleId");
        var classID = getParamByUrl("campId");
        var type = 1;
        var dataNum = 10;
        var host = window.location.protocol + "//" + window.location.host;
        var finalUrl = "";
        if (lastDateTime == "-1") {
            finalUrl = host + "/v1/api/camp/getReplyList" + window.location.search + "&type=" + type;
        } else {
            finalUrl = host + "/v1/api/camp/getReplyList" + window.location.search + "&count=" + dataNum + "&time=" + lastDateTime + "&type=" + type;
        }

        console.info(finalUrl);
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function success(data) {
                $(".loading").css("display", "none");
                if (data.code == 200) {
                    if (!(JSON.stringify(me.state.messageData) == "{}")) {
                        if (me.state.messageData.resp.replyList.length > 0) {
                            data.resp.replyList = me.state.messageData.resp.replyList.concat(data.resp.replyList);
                        }
                    }
                    me.setState({ messageData: data });
                } else {
                    $(".error-main-t").html("服务器开小差了～");
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            }
        });
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        var me = this;
        var data = me.state.messageData;
        if (data.resp.hasNext == 1 && data.resp.replyList.length == 0) {
            me.getMessageListFc(0);
        }
    },
    getDataClick: function getDataClick(event) {
        var me = this;
    },
    render: function render() {
        var me = this;
        return React.createElement(
            "div",
            { className: "container" },
            React.createElement(
                "div",
                { className: "row tidings_list" },
                React.createElement(
                    "span",
                    { className: "loading" },
                    "\u6570\u636E\u6B63\u5728\u52AA\u529B\u52A0\u8F7D..."
                ),
                React.createElement(MessageList, { messageData: me.state.messageData, getVaildFc: me.getVaildFc }),
                React.createElement(DateBtn, { messageData: me.state.messageData, getMessageListFc: me.getMessageListFc })
            )
        );
    }
});

var Component = React.createClass({
    displayName: "Component",


    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(MessageListContainer, null),
            React.createElement(Public_error, null)
        );
    }
});
ReactDOM.render(React.createElement(Component, null), document.getElementById('messageMain'));

/***/ })

},[219]);