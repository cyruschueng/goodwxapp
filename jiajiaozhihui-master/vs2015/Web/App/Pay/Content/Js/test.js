$(function () {
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