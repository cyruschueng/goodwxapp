$(function () {
    Unscramble.getData();
    $("#curBookName").text($("#hfBookName").val());
})
function Unscramble(){};
Unscramble.getData = function () {
    $.ajax({
        url: "./server/unscramble.ashx",
        type: "POST",
        dataType: "JSON",
        data: { 'method': 'get' },
        beforeSend: function () {
            //$("#modal-progress").modal('show');
        },
        complete: function () {
            //$("#modal-progress").modal('hide');
        },
        success: function (data) {
            if (!$.isEmptyObject(data.unscramble)) {
                var html = "";
                $.each(data.unscramble, function (index, context) {
                    html += "<li>";
                    html += "     <a style='font-size:14px; color:#fff;' name='" + context.bookname + "' onclick='openmenu(" + context.id + ")' href='javascript:void(0)'>" + context.bookname + "</a>";
                    if ($("#hfBookName").val() == context.bookname) {
                        html += "    <div class='row' id='menu" + context.id + "' >" + menu_item(context.bookname, context.item) + "</div>";
                    } else {
                        html += "    <div class='row page' id='menu" + context.id + "' >" + menu_item(context.bookname, context.item) + "</div>";
                    }
                    html += "</li>";
                })
                $("#menu").empty().append(html);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(textStatus.readyState);
            alert(errorThrown);
        }
    });
}
var menu_item = function (book,data) {
    var html = "";
    $.each(data, function (index, context) {
        html += "<div class='col-xs-3 text-center' name='" + decodeURIComponent(context.mainwords) + "' style='padding-top:3px; padding-bottom:3px;'><a style=' color:#fff; ' href='unscramble.aspx?book=" + book + "&index=" + context.index + "&weixinid=" + $("#hfWeixinID").val() + "&openid=" + $("#hfOpenID").val() + "'>第" + context.index + "页</a></div>";
    })
    return html;
}
var openmenu = function (id) {
    $("#menu"+id).toggle();
}