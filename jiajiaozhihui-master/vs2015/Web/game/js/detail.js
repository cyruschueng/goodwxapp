$(function () {
    ranking();
})
function showPosition(position) {
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var result = "{}";
    $.ajax({
        url: "../provide/baiduapi.ashx",
        type: "post",
        dataType: "text",
        async: false,
        data: "openid=" + $("#hfOpenid").val().replace(/\+/g, '%2B') + "&longitude=" + longitude + "&latitude=" + latitude,
        beforeSend: function () {
            //$("#processed").show();
        },
        complete: function () {
            //$("#processed").hide();
        },
        success: function (data) {
            if (data != "") {
                alert("发生意外错误！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}
function ranking() {
    $("#ranking").click(function () {
        window.location.href = "ranking.aspx?openid=" + $("#hfOpenid").val().replace(/\+/g, '%2B');
    });
}
var share = function () {
    $.post("../provide/index.ashx");
}