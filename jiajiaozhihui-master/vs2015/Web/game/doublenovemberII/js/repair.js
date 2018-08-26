$(function () {
    var repair = new Repair();
    repair.getData('', '')
    $("#btnSearch").click(function () {
        var tel = $("#telephone").val();
        var name = $("#name").val();
        repair.getData(tel, name);
    });
    $("#btnCorrect").click(function () {
        var openid = $("#hfOpenID").val();
        var tel = $("#telephone").val();
        var name = $("#name").val();
        if (tel == "" || name == "") {
            alert("请输入手机号码，联系人");
            return 
        }
        repair.correct(openid, tel, name);
    });
})
function Repair() { };
Repair.prototype.getData = function (tel, name) {
    $.ajax({
        url: "/game/doublenovemberII/server/repair.ashx",
        type: "POST",
        dataType: "json",
        data: { 'telephone': '' + tel + '', 'name': '' + name + '', 'method': 'data' },
        beforeSend: function () {
            //$("#modal-progress").modal('show');
        },
        complete: function () {
            //$("#modal-progress").modal('hide');
        },
        success: function (data) {
            if (!$.isEmptyObject(data.ds)) {
                var html = "";
                $("#tbody").empty();
                $.each(data.ds, function (index, context) {
                    html += "<tr>";
                    html += "<td>" +parseInt(index+1) + "</td>"
                    html += "<td>" + context.Name + "</td>"
                    html += "<td>" + context.TelePhone + "</td>"
                    html += "<td>" + context.SendName + "</td>"
                    html += "</tr>";
                })
                $("#tbody").append(html);
            } else {
                $("#tbody").empty();
                $("#tbody").append("<tr><td colspan='4'>没有要修改的数据</td></tr>");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(textStatus.readyState);
            alert(errorThrown);
        }
    });
}
Repair.prototype.correct = function (openid, telephone, name) {
    $.ajax({
        url: "/game/doublenovemberII/server/repair.ashx",
        type: "POST",
        dataType: "json",
        data: { 'telephone': '' + telephone + '', 'name': '' + name + '', 'openid': '' + openid + '', 'method': 'correct' },
        beforeSend: function () {
            //$("#modal-progress").modal('show');
        },
        complete: function () {
            //$("#modal-progress").modal('hide');
        },
        success: function (data) {
            if (!$.isEmptyObject(data)) {
                if (data.code == -1) {
                    alert("更成失败");
                } else if (data.code == 0) {
                    alert("不用更正");
                } else if (data.code == 1) {
                    alert("更正成功");
                } else {
                    alert("ok");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(textStatus.readyState);
            alert(errorThrown);
        }
    });
}