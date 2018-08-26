$(function () {
    $("#btnConfirmOrder").click(function () {
        if ($("#name").text() == "" || $("#telephone").text() == "") {
            alert("请选择与编辑收货地址");
        } else {
            dialogOrder.show();
        }
    });
    $("#btnSubmit").click(function () {
        publicgoods.submit();
    });

    $("#btnUp").click(function () {
        publicgoods.add();
    });
    $("#btnSubtract").click(function () {
        publicgoods.subtract();
    });
    
    $("#btnSure").click(function () {
        publicgoods.submit();
    });
    publicgoods.calculate();

})
var publicgoods = {
    submit: function () {
        var openid = $("#hfOpenid").val();
        var friendid = $("#hfFriendid").val();
        var goodsid = $("#hfGoodsid").val();
        var txtprice = $("#hfPrice").val();
        var txtnumber = $("#txtNumber").text();
        var mode = $("#hfMode").val();
        var share = $("#hfShare").val();
        var address = $("#hfProvince").val() + " " + $("#hfCity").val() + " " + $("#hfDistrict").val() + " " + $("#hfAddress").val();
        var remark = $("#remark").val();
        var tradeno = $("#hfTradeno").val();
        $.ajax({
            url: "./server/order.ashx",
            type: "POST",
            dataType: "json",
            data: { name: '' + $("#name").text() + '', phone: '' + $("#telephone").text() + '', province: '' + $("#hfProvince").val() + '', city: '' + $("#hfCity").val() + '', district: '' + $("#hfDistrict").val() + '', address: '' + address + '', postcode: '', remark: '' + remark + '', openid: '' + openid + '', friendid: '' + friendid + '', goodsid: '' + goodsid + '', txtPrice: '' + txtprice + '', txtNumber: '' + txtnumber + '', share: '' + share + '', mode: '' + mode + '', tradeno: '' + tradeno + '', method: 'submit' },
            beforeSend: function () {
                toast.show()
            },
            complete: function () {
                toast.hide();
            },
            success: function (data) {
                var o = jQuery.isEmptyObject(data);
                if (!o) {
                    if (data.code == 0) {
                        //已订购
                        location.href = "./result/order.html?code=0";
                    } else if (data.code == 1) {
                        // 订购成功
                        location.href = "./result/order.html?code=1";
                    } else if (data.code == 2) {
                        //订购失败
                        location.href = "./result/order.html?code=2";
                    } else if (data.code == 3) {
                        location.href = "./result/order.html?code=3";
                    }
                }
            },
            error: function () {
                location.href = "./result/order.html?code=2";
            }
        });
    },
    add: function () {
        return; //不可以增加
        var v = parseInt($("#txtNumber").text());
        v += 1;
        $("#txtNumber").text(v);
        this.calculate();
    },
    subtract: function () {
        return; //不可以减少
        var v = parseInt($("#txtNumber").text());
        if (v > 1) {
            v -= 1;
            $("#txtNumber").text(v);
            this.calculate();
        }
    },
    calculate: function () {
        var v = parseFloat($("#txtUnitPrice").text());
        var n = parseInt($("#txtNumber").text());
        var r = v * n;
        $("#hfPrice").val(r.toFixed(2));
    },
    affirm_info: function () {
        $("#affirm-number").text($("#txtNumber").text());
        $("#affirm-Price").text($("#hfPrice").val());
        $("#affirm-name").text($("#name").val());
        var province = $("#province").find("option:selected").text();
        var city = $("#city").find("option:selected").text();
        var address = $("#address").val();
        $("#affirm-address").text(province + city + address);
    }
}

/*数据加载*/
var toast = {
    that: $('#loadingToast'),
    defaultContent: "数据加载中",
    hide: function () {
        this.that.hide();
    },
    show: function (msg) {
        if (msg == '') {
            msg = this.defaultContent;
        }
        var $content = this.that.find('.weui_toast_content');
        $content.html(msg);
        this.that.show();
    }
};
/*确认订单*/
var dialogOrder = {
    that: $('#dialogOrder'),
    hide: function () {
        this.that.hide();
    },
    show: function () {
        var dialog = this.that;
        dialog.find('.weui_btn_dialog').one('click', function () {
            dialog.hide();
        });
        this.that.show();
    }
};
wx.ready(function () {
    
    wxJsApi.shareAppMessage();
    wxJsApi.shareTimeline();
    $(document).on("click", ".privewimg", function (event) {
        wxJsApi.privewimg(this);
    })
    wxJsApi.getLocation()
   
    toast.hide();
})


var wxJsApi = {
    shareData: {
        title: '家教智慧万人书法行动，一点小坚持，人生大变化',
        desc: '家教智慧举办“亲子书法”活动，该活动是基于“书法+移动互联网”的创新理念，致力于打造一场万人书法盛宴',
        link: $("#hfShareLink").val(),
        imgUrl: 'http://weixin.jiajiaozhihui.cn/images/2015110908163066ea.jpg'
    },
    shareAppMessage: function () {
        wx.onMenuShareAppMessage(this.shareData);
    },
    shareTimeline: function () {
        wx.onMenuShareTimeline(this.shareData);
    },
    privewimg: function (that) {
        var src = $(this).attr("src");
        var index = src.lastIndexOf("?");
        src = src.substr(0, index);
        src = src + '?imageView2/2/w/600';
        wx.previewImage({
            current: src,
            urls: [src]
        });
    },
    getLocation: function () {
        wx.getLocation({
            success: function (res) {
                $.ajax({
                    url: "./server/index.ashx",
                    type: "POST",
                    dataType: "json",
                    data: { 'openid': '' + $("#hfOpenid").val() + '', 'latitude': '' + res.latitude + '', 'longitude': '' + res.longitude + '', 'method': 'location' },
                    success: function (data) {

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {

                    }
                });
            }
        });
    }
};
