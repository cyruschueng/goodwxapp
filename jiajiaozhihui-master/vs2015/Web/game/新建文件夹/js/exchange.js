$(function () {
    $("#order").click(function () {
        $("#mymodal").modal("show");
    });
    $("#province").change(function () {
        var province = $("#province").val();
        loadcity(province);
    })
    $("#btnSubmit").click(function () {
        submitForm();
    });
    $(".panel-body img").removeAttr("width").removeAttr("height").remove("style");
    $(".panel-body img").css({ "width": "100%", "height": "auto" });
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
            url: "../provide/exchange.ashx",
            type: "POST",
            dataType: "json",
            async: false,
            data: "productid=" + $("#hfProductID").val() + "&openid=" + $("#hfOpenID").val().replace(/\+/g, '%2B') + "&recipients=" + $("#recipients").val() + "&province=" + $("#province").val() + "&city=" + $("#city").val() + "&address=" + $("#address").val() + "&postcode=" + $("#postcode").val() + "&mobile=" + $("#mobile").val(),
            beforeSend: function () {
                $("#request").show();
            },
            complete: function () {
                $("#request").hide();
            },
            success: function (data) {
                if (!jQuery.isEmptyObject(data)) {
                    $("#mymodal").modal("hide");
                    var result = "";
                    if (data.status == "true") {
                        result = "<div id='result' class='alert alert-success alert-dismissible' role='alert' style='margin-top:20px;'>" +
                              "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                              "<strong>兑换成功!</strong>当前金币：" + data.gold + "</div>";
                    } else {
                        result = "<div id='result' class='alert alert-warning alert-dismissible' role='alert' style='margin-top:20px;'>" +
                              "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                              "<strong>兑换失败!</strong></div>";
                    }
                    $("#exchange-tip").modal("show");
                    $(".panel-body").append(result);
                }
            },
            error: function (a, b, c) {

            }
        })
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
                required:true,
                minlength: 10
            }
        }
    });
    if (o.form()) {
        return true;
    }
    return false;
}

