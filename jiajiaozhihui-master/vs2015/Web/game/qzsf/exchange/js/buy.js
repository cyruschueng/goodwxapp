$(function () {
    $(document).on("click", "#btnOrder", function () {
        var name = $.trim($("#name").text());
        var telephone = $.trim($("#telephone").text());
        var address = $.trim($("#address").text());
        
        if (name == "" || telephone == "" || address == "") {
            alert("请先编辑选择收货地址！");
        } else {
            buy.affirmOrder().show();
        }
    });
    $(document).on('click', '#btnSubmit', function () {
        buy.runOrder();
    });
})

var buy = {
    toast: function () {
        return {
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
        }
    },
    affirmOrder: function () {
        return {
            that: $("#affirmOrder"),
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
        }
    },
    runOrder: function () {
        $this = this;
        var name = $.trim($("#name").text());
        var telephone = $.trim($("#telephone").text());
        var province = $("#hfProvince").val();
        var city = $("#hfCity").val();
        var district = $("#hfDistrict").val();
        var address = $.trim($("#address").text());
        var openid = $("#hfOpenId").val();
        var goodsid = $("#hfGoodsid").val();
        $.ajax({
            url: './server/buy.ashx',
            type: 'POST',
            dataType: 'JSON',
            data: { name: '' + name + '', phone: '' + telephone + '', province: '' + province + '', city: '' + city + '', district: '' + district + '', address: '' + address + '', openid: '' + openid + '', goodsid: '' + goodsid + '' },
            beforeSend: function () {
                $this.toast().show("正在提交订单");
            },
            complete: function () {
                $this.toast().hide();
            },
            success: function (data) {
                $this.showOrderMsg(data);
            }
        });
    },
    showOrderMsg: function (data) {
        if (!jQuery.isEmptyObject(data)) {
            if (data.code == 0) {
                window.location.href = "../exchange/result/order.html?code=0";
            } else if (data.code == 1) {
                window.location.href = "../exchange/result/order.html?code=1";
            } else if (data.code == 4) {
                window.location.href = "../exchange/result/order.html?code=4";
            } else if (data.code == 5) {
                window.location.href = "../exchange/result/order.html?code=5";
            }
        } else {
            window.location.href = "../exchange/result/order.html?code=3";
        }
    }
};