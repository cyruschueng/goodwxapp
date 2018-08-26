$(function () {
    $("#btnConfirmOrder").click(function () {
        if ($("#hfWeiXinAddress").val() == "") {
            wxJsApi.editAddress();
        } else {
            dialogOrder.show();
        }
    });
    $("#btnSubmit").click(function () {
        publicgoods.submit();
    });

    $("#btnAdd").click(function () {
        publicgoods.add();
    });
    $("#btnSubtract").click(function () {
        publicgoods.subtract();
    });
    $("#province").change(function () {
        publicgoods.initcity();
    });
    $("#btnSure").click(function () {
        publicgoods.submit();
    });
    publicgoods.calculate();
})
var publicgoods = {
    formValidate: function () {
        var o = $("#form1").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: {
                    required: true,
                    mobile: true
                },
                area: {
                    required: true,
                    minlength: 5
                },
                address: {
                    required: true,
                    minlength: 5
                }
            },
            messages: {
                name: {
                    required: '请输入姓名',
                    minlength: '输入的姓名字符长度不能小于2'
                },
                phone: {
                    required: '请输入电话号码',
                    mobile: '输入的电话号码格式不对'
                },
                area: {
                    required: '请输入地区',
                    minlength: '输入的正确的地区格式(广东省 深圳市 南山区)'
                }, address: {
                    required: '请输入详细地址',
                    minlength: '输入的详细地址字符长度不能少于5'
                }
            },
            errorPlacement: function (error, element) {
                error.appendTo($("#tips"));
            }
        });
        if (o.form()) {
            return true;
        }
        return false;
    },
    submit: function () {
        var weixinAddress = JSON.parse($("#hfWeiXinAddress").val());
        var openid = $("#hfOpenid").val();
        var friendid = $("#hfFriendid").val();
        var goodsid = $("#hfGoodsid").val();
        var txtprice = $("#hfPrice").val();
        var txtnumber = $("#txtNumber").text();
        var mode = $("#hfMode").val();
        var share = $("#hfShare").val();
	var address = weixinAddress.proviceFirstStageName + " " + weixinAddress.addressCitySecondStageName + " " + weixinAddress.addressCountiesThirdStageName + " " + weixinAddress.addressDetailInfo;
        var remark = $("#remark").val();
        $.ajax({
            url: "./server/order.ashx",
            type: "POST",
            dataType: "json",
            data: { name: '' + weixinAddress.userName + '', phone: '' + weixinAddress.telNumber + '', province: '' + weixinAddress.proviceFirstStageName + '', city: '' + weixinAddress.addressCitySecondStageName + '', district: '' + weixinAddress.addressCountiesThirdStageName + '', address: '' + address + '', postcode: '' + weixinAddress.addressPostalCode + '', remark: '' + remark + '', openid: '' + openid + '', friendid: '' + friendid + '', goodsid: '' + goodsid + '', txtPrice: '' + txtprice + '', txtNumber: '' + txtnumber + '', share: '' + share + '', mode: '' + mode + '', method: 'submit' },
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
                    }
                }
            },
            error: function () {
                location.href = "./result/order.html?code=2";
            }
        });
    },
    add: function () {
        //return; //不可以增加
        var v = parseInt($("#txtNumber").text());
        v += 1;
        $("#txtNumber").text(v);
        this.calculate();
    },
    subtract: function () {
        //return; //不可以减少
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
    initcity: function () {
        if ($("#hfArea").val() != "") {
            $("#city").empty();
            var option = "<option value=''>----请选择---</option>";
            var jsondata = eval("(" + $("#hfArea").val() + ")");
            $.each(jsondata.ds, function (index, context) {
                if (context.PID == $("#province").val()) {
                    option += "<option value='" + context.AreaID + "'>" + context.AreaName + "</option>";
                }
            })
            $("#city").append(option);
        }
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
    wxJsApi.getLatestAddress();
    toast.hide();
    $(document).on("click", "#editAddress", function (event) {
       

        toast.show();
        wxJsApi.editAddress();
        toast.hide();
    })
})


var wxJsApi = {
    shareData: {
        title: '家教智慧万人书法行动，一点小坚持，人生大变化',
        desc: '家教智慧举办“亲子书法”活动，该活动是基于“书法+移动互联网”的创新理念，致力于打造一场万人书法盛宴',
        link: $("#hfShareLink").val(),
        imgUrl: 'http://weixin.jiajiaozhihui.cn/images/2015110908163066ea.jpg'
    },
    address: function () {
        var d = eval("(" + $("#hfAddressParameters").val() + ")");
        return {
            appId: d.appId,
            scope: d.scope,
            signType: d.signType,
            addrSign: d.addrSign,
            timeStamp: d.timeStamp,
            nonceStr: d.nonceStr
        }
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
    },
    getLatestAddress: function () {
        var adr = this.userAddress;
        WeixinJSBridge.invoke("getLatestAddress", this.address(),
            function (res) {
                if (res.err_msg == "get_recently_used_address:ok") {
                    adr(res);
                }
            }
        );
    },
    editAddress: function () {
        var adr = this.userAddress;
        WeixinJSBridge.invoke("editAddress", this.address(),
            function (res) {
                if (res.err_msg == "edit_address:ok") {
                    adr(res);
                }
                //JSON.stringify(res);
            }
        );
    },
    userAddress: function (res) {
	$("#name").text(res.userName);
        $("#telephone").text(res.telNumber);
        $("#address").text(res.proviceFirstStageName + " " + res.addressCitySecondStageName + " " + res.addressCountiesThirdStageName + " " + res.addressDetailInfo);
        $("#hfWeiXinAddress").val(JSON.stringify(res));
    }
};
