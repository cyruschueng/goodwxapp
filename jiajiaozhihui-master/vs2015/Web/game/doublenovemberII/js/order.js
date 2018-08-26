

var msg = "<div id='alert_orderstatus' class='alert alert-danger alert-dismissible fade in' role='alert' >"
      + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>×</span></button>"
      + "<span id='alert_msg' style=' font-size:16px;'>@@</span>"
    + "</div>";
var msg0 = "你已订购";
var msg1 = "订购成功";
var msg2 = "订购失败";


$(function () {
    $("#btnSubmit").click(function () {
        var b = publicgoods.formValidate();
        if (b) {
            //publicgoods.affirm_info();
            //$("#modal-affirm").modal('show');
            publicgoods.submit();
        }
    })
    $("#btnBack").click(function () {

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
        $("#modal-affirm").modal('hide');
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
                provice: {
                    required: true,
                    min: 1
                },
                city: {
                    required: true,
                    min: 1
                },
                address: {
                    required: true,
                    minlength: 6
                }
            }
        });
        if (o.form()) {
            return true;
        }
        return false;
    },
    submit: function () {
        $.ajax({
            url: "/game/doublenovemberII/server/order.ashx",
            type: "POST",
            dataType: "json",
            data: $("input:text,select ,textarea").serialize() + "&openid=" + $("#hfOpenid").val() + "&friendid=" + $("#hfFriendid").val() + "&goodsid=" + $("#hfGoodsid").val() + "&txtPrice=" + $("#hfPrice").val() + "&txtNumber=" + $("#txtNumber").text() + "&mode=" + $("#hfMode").val() + "&method=submit",
            beforeSend: function () {
                $("#modal-progress").modal('show');
            },
            complete: function () {
                $("#modal-progress").modal('hide');
            },
            success: function (data) {
                var o = jQuery.isEmptyObject(data);
                $("#alert_orderstatus").remove();
                if (!o) {
                    if (data.code == 0) {
                        //已订购
                        $(document.body).append(msg.replace("@@", msg0));
                    } else if (data.code == 1) {
                        // 订购成功
                        //$(document.body).append(msg.replace("@@", msg1));
                        window.location.href = $("#hfOnlinePay").val();
                    } else if (data.code == 2) {
                        //订购失败
                        $(document.body).append(msg.replace("@@", msg2));
                    }
                    $("#alert_orderstatus").css("display", "block");
                }
            },
            error: function () {

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
        return;//不可以减少
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