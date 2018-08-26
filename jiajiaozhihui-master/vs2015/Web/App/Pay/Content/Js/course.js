﻿$(function () {
    var data = {
        courseId: '',
        openId: '',
        price: '',
        tradeno: '',
        courseType: ''
    };
    var params = {
        cid: 0,
        ctype: 0,
        oid: '',
        title: '',
        v: ''
    };
    var detailInfo = {
        info: ""
    };
    /*获取信息*/
    function init() {
        params.cid = getQueryString("cid");
        params.ctype = getQueryString("ctype");
        params.oid = getQueryString("oid");
        params.v = getQueryString("v");

        $.showLoading("正在加载数据...");
        $.ajax({
            url: '../project/course/controller/PayOrderController.ashx?method=state',
            type: 'POST',
            dataType: 'JSON',
            data: { oid: params.oid, cid: params.cid, ctype: params.ctype },
            success: function (res) {
                console.log(res);
                data.courseId = params.cid;
                data.openId = params.oid;
                data.price = res.courseInfo.price;
                params.title = res.courseInfo.courseName;
                data.courseType = params.ctype;
                payState(res.completedOrderInfo);
                courseInfo(res.courseInfo);
                $.hideLoading();
            }
        });

        $.getJSON('../project/course/controller/CourseController.ashx?method=view', { courseId: params.cid, themeId: 0, openId: params.oid }, function (result) {
            expertInfo(result);
        });
        $.getJSON("../project/course/Controller/WxPayController.ashx?method=config&openId=" + params.oid + "&page=course.html&v=" + getQueryString("v"), function (data) {
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名，见附录1
                jsApiList: ['chooseWXPay', 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
                var _shareData = {
                    title: '智慧父母特训营订购', // 分享标题
                    desc: '每一次学习都应有结果',
                    groupTitle: '智慧父母特训营订购',
                    link: 'http://weixin.jiajiaozhihui.cn/app/pay/share_course.html?cid=10&ctype=2', // 分享链接
                    imgUrl: '', // 分享图标
                    type: 'link',
                    dataUrl: '',
                    success: function () { },
                    error: function () { }
                };
                wx.onMenuShareTimeline(_shareData);
                wx.onMenuShareAppMessage(_shareData);
            });
            wx.error(function (res) {
                //alert(res);
            });
        })

        function courseInfo(info) {
            $("#imgSrc").attr("src", info.maxImgUrl)
            $("#price").text(info.price);
            $("#title").text(info.courseName);
            $("#courseContent").html(info.details);
        };
        function expertInfo(info) {
            $("#expertSrc").attr("src", info.expert.imgUrl)
            $("#expertName").text(info.expert.name);
            $("#expertInfo").html(info.expert.intro);
        };
        function payState(info) {
            if (info) {
                $("#btnPay").attr("disabled", "disabled");
                $("#btnPay").text("已支付");
            }
        }
        /*获取参数*/
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        };

    }
    function pay() {
        $("#btnPay").on('click', function () {
            $.showLoading("正在发起支付...");
            $.ajax({
                url: '../project/course/controller/PayOrderController.ashx?method=add',
                type: 'POST',
                dataType: 'text',
                data: data,
                success: function (res) {
                    if (res != "") {
                        unifiedOrder(res)
                    }
                    $.hideLoading();
                }
            })

            function unifiedOrder(tradeno) {
                var info = new Object();
                info.body = params.title;
                info.outTradeNo = tradeno;
                info.openid = params.oid;
                info.attach = params.ctype;
                info.notifyPage = "course.ashx";
                var json = JSON.stringify(info);

                $.ajax({
                    url: '../project/course/controller/WxPayController.ashx?method=pay',
                    type: 'POST',
                    dataType: 'JSON',
                    data: info,
                    success: function (res) {
                        wx.chooseWXPay({
                            appId: res.appId,
                            timestamp: res.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位
                            package: res.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                            signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: res.paySign, // 支付签名
                            success: function (res) {
                                window.location.href = '';
                            }
                        });
                    }
                })
            }
        })
    }
    function getuserInfo() {
        var url = '../tool/wx.ashx'
        $.getJSON(url, { method: 'wxbase' }, function (res) {
            alert(res.openid);
        });
    }
    getuserInfo();
    init();
    pay();
})