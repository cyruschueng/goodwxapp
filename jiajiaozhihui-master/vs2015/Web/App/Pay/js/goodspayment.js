(function ($) {
    $("#add").on('click', function () {
        var v = $("#number").text();
        v = (parseInt(v) + 1);
        $("#number").text(v);
    });
    $("#sub").on('click', function () {
        var v = $("#number").text();
        if (v > 1) {
            v = (parseInt(v) - 1);
        }
        $("#number").text(v);
    });
    $("#btnConfirmOrder").on('click', function () {
        var param = {
            openid: $("#hfOpenid").val(),
            name: $("#name").text(),
            telephone: $("#telephone").text(),
            address: $("#address").text(),
            province: $("#hfProvince").val(),
            city: $("#hfCity").val(),
            district: $("#hfDistrict").val(),
            remark: $("#remark").val(),
            goodsid: $("#hfGoodsid").val(),
            tradeno: $("#hfTradeno").val(),
            price: $("#hfPrice").val(),
            number: $("#number").text()
        };
        if (testingAddress(param.name,param.telephone,param.address) == false) {
            alert("请填写收货信息！");
            return;
        }
        $.ajax({
            url: '../server/goodspayment.ashx',
            type: 'POST',
            dataType: 'JSON',
            data: param,
            success: function (data) {
                var o = jQuery.isEmptyObject(data);
                if (!o) {
                    if (data.code == 0) {
                        //已订购
                        location.href = "../result/order.html?code=0";
                    } else if (data.code == 1) {
                        // 订购成功
                        location.href = "../result/order.html?code=1";
                    } else if (data.code == 2) {
                        //订购失败
                        location.href = "../result/order.html?code=2";
                    } else if (data.code == 3) {
                        location.href = "../result/order.html?code=3";
                    }
                }
            }
        });
    });
    function config() {
        var url = window.location;
        $.getJssdkConfig({
            url: '/weixinconfig/server/wxconfig.ashx?type=sdk'
        }, function (data) {
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
            });
        })
    };
    function testingAddress(name, tel, address) {
        if (name == '' || tel == '' || address == '') {
            return false;
        }
        return true;
    };
    config();
})(jQuery)

