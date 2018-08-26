$(function () {
    $("#province").change(function () {
        var province = $("#province").val();
        loadcity(province);
    })
    $("#btnSubmit").click(function () {
        submitForm();
    });

    $("#btnGet").click(function () {
        var gl = $("#hfGoodsClass").val();
        if (gl == "1") {
            $("#entityModal").modal("show");
        } else if (gl == "2") {
            $("#virtualModel").modal("show");
        } else {
            alert("暂无奖品可以领取，下次加油~~~~");
        }
    })
    $("#btnGetGold").click(function () {
        virtualmodel.submit();
    });
});
var loadcity = function (province) {
    var dataObj = eval("(" + $("#hfCity").val() + ")");
    if (!jQuery.isEmptyObject(dataObj.ds)) {
        var option = "";
        $.each(dataObj.ds, function (index, context) {
            if (context.PID == province && province != "") {
                option += "<option value='" + context.AreaID + "'>" + context.AreaName + "</option>";
            }
        });
        $("#city").empty();
        $("#city").append("<option value=''>请选择</option>");
        $("#city").append(option);
    }
}
var submitForm = function () {
    if (check()) {
        $.ajax({
            url: "provide/info.ashx",
            type: "POST",
            dataType: "json",
            async: false,
            data: "productid=" + $("#hfProductID").val() + "&openid=" + $("#hfOpenID").val().replace(/\+/g, '%2B') + "&recipients=" + $("#recipients").val() + "&province=" + $("#province").val() + "&city=" + $("#city").val() + "&address=" + $("#address").val() + "&postcode=" + $("#postcode").val() + "&mobile=" + $("#mobile").val() + "&activeid=" + $("#hfCompetition").val() + "&method=entity",
            beforeSend: function () {
                $("#request").show();

            },
            complete: function () {
                $("#request").hide();
            },
            success: function (data) {
                if (!jQuery.isEmptyObject(data)) {
                    var result = "";
                    var msg = "";
                    $("#entityModal").modal("hide");
                    if (data.status == "true") {
                        result = "领取成功";
                        msg = "<div id='result' class='alert alert-success alert-dismissible' role='alert' style='margin-top:20px;'>" +
                              "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                              "<strong>领取成功!</strong>";
                        $("#btnGet").css({display:"none"});
                    } else {
                        result = "领取失败";
                        msg = "<div id='result' class='alert alert-warning alert-dismissible' role='alert' style='margin-top:20px;'>" +
                              "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                              "<strong>领取失败!</strong></div>";
                    }
                    $("#tip .modal-body").html(result);
                    $("#tip").modal("show");
                    $("#tim_alert").append(msg);
                }
            }
        })
    }
}
var virtualmodel = {
    init: function () { },
    submit: function () {
        $.ajax({
            url: "provide/info.ashx",
            type: "POST",
            dataType: "text",
            data: { openid: $("#hfOpenID").val().replace(/\+/g, '%2B'), questionactiveid: $("#hfCompetition").val(), gold: $("#hfGold").val(), productid: $("#hfProductID").val(), method: "virtual" },
            beforeSend: function () {
                $("#request").show();
            },
            complete: function () {
                $("#request").hide();
            },
            success: function (data) {
                $("#virtualModel").modal("hide");
                var result = "领取失败，请重新试";
                var msg = "";
                if (data == "true") {
                    result = "领取成功";
                    msg = "<div id='result' class='alert alert-success alert-dismissible' role='alert' style='margin-top:20px;'>" +
                              "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                              "<strong>领取成功!</strong>";
                    $("#btnGet").addClass("disabled").text("已领取");
                } else {
                    msg = "<div id='result' class='alert alert-warning alert-dismissible' role='alert' style='margin-top:20px;'>" +
                              "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                              "<strong>领取失败!</strong></div>";
                }
                $("#tip .modal-body").html(result);
                $("#tip").modal("show");
                $("#tim_alert").append(msg);
            }
        })
    },
    increase: function () {
        var total = 10;
        var temp_total = 0;
        var interval = setInterval(function () {
            if (temp_total == total) {
                clearInterval(interval);
            } else {
                var c = $("#currgold").text();
                var n = 0;
                if (c != "") {
                    n = parseInt(c);
                }
                n += 1;
                $("#currgold").text(n);
                temp_total += 1;
            }
        }, 100);
    }
}


//表单验证
var check = function () {
    var o = $("#form1").validate({
        rules: {
            recipients: {
                required: true,
                minlength: 2
            },
            mobile: {
                required: true,
                mobile: true
            },
            province: {
                required: true,
                min: 1
            },
            city: {
                required: true,
                min: 1
            },
            address: {
                required: true,
                minlength: 10
            }
        }
    });
    if (o.form()) {
        return true;
    }
    return false;
}

