(function ($) {
    function config() {
        $.getJssdkConfig({
            url: '/weixinconfig/server/wxconfig.ashx?type=sdk'
        }, function (data) {
            wx.config({
                debug: true,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "chooseWXPay"]
            });
        })
    };
    function getJsPayConfig() {
        $.getJsPayConfig({
            url: '/weixinconfig/server/wxconfig.ashx?type=pay'
        }, function (data) {
            var data = {
                timestamp: data.timeStamp,
                nonceStr: data.nonceStr,
                package: data.package,
                signType: data.signType,
                paySign: data.paySign,
                success: function (res) {
                    if (res.errMsg == 'chooseWXPay:ok') {
                        location.href = "/Course/mycourse.aspx";
                    }
                }
            };
            wx.chooseWXPay(data);
        });
    }
    $(document).on("click", "#btnPay", function () {
        $.ajax({
            url: '../server/course.ashx?type=save',
            type: 'POST',
            dataType: 'JSON',
            data: {},
            beforeSend: function () {
                $("#loadingToast").show();
            },
            complete: function () {
                $("#loadingToast").hide();
            },
            success: function (data) {
                if (data.code == 1 || data.code == 3) {
                    //alert(JSON.stringify(data));
                    getJsPayConfig();
                }
            }
        })
    })
    config();
})(jQuery)


