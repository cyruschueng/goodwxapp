$(function () {
    $("#province").change(function () {
        var province = $("#province").val();
        loadcity(province);
    })
})

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