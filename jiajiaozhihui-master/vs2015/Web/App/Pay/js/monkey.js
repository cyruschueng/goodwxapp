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
                        location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa0f624ad8cdb46c4&redirect_uri=http%3A%2F%2Fweixin.jiajiaozhihui.cn%2Fsale%2Fstart%2Fstartmonkey.aspx%3Finfoid%3D1&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect";
                    }
                }
            };
            wx.chooseWXPay(data);
        });
    }
    var calculate = {
        add: function () {
            $("#add").click(function () {
                init();
            });
            function init() {
                var value = parseInt($("#payNumber").text());
                value += 1;
                $("#payNumber").text(value);
                account();
            }
        },
        subtraction: function () {
            $("#subtraction").click(function () {
                init();
            });
            function init() {
                var value = $("#payNumber").text();
                if (value > 1) {
                    value -= 1;
                    $("#payNumber").text(value);
                    account();
                }
            }
        },
        run: function () {
            this.add();
            this.subtraction();
        }
    };
    function account() {
        var pice = $("#price").text();
        var payNumber = $("#payNumber").text();
        $("#totalprice").text((pice * payNumber).toFixed(2));
        var data = {
            body: $("#caption").text(),
            number: $("#payNumber").text(),
            price: $("#totalprice").text()
        };
        updatePayConfig(data);
    }
    function updatePayConfig(data) {
        $.ajax({
            url: '../server/monkey.ashx?type=payconfig',
            type: 'POST',
            dataType: 'JSON',
            data: data,
            beforeSend: function () {
                $("#loadingToast").show();
            },
            complete: function () {
                $("#loadingToast").hide();
            },
            success: function (msg) {
                alert(msg.code);
            }
        });
    }
    calculate.run();

    $(document).on("click", "#btnPay", function () {
        var province = $("#hfProvince").val();
        var city = $("#hfCity").val();
        var district = $("#hfDistrict").val();
        var name = $("#name").text();
        var telephone = $.trim($("#telephone").text());
        var address = $("#hfProvince").val() + " " + $("#hfCity").val() + " " + $("#hfDistrict").val() + " " + $("#hfAddress").val();
        var producttype = $("#hfType").val();
        var type = $("#hfUpdataModel").val();
        $.ajax({
            url: '../server/monkey.ashx?type=save',
            type: 'POST',
            dataType: 'JSON',
            data: { province: province, city: city, district: district, name: name, telephone: telephone, address: address, producttype: producttype },
            beforeSend: function () {
                $("#loadingToast").show();
            },
            complete: function () {
                $("#loadingToast").hide();
            },
            success: function (data) {
                if (data.code == 1 || data.code == 3) {
                    getJsPayConfig();
                } else if (data.code == 4) {
                    alert("未知收货信息，请先编辑收货信息！");
                }
            }
        })
    })
    config();
})(jQuery)


