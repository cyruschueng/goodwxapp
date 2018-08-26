$(function () {
    var openid = $("#hfOpenID").val();
    var friendManage = new FriendManage(openid);
    friendManage.getFriend();
    friendManage.getNewFriend();

})
function FriendManage(openid) {
    this.openid = openid;
};
FriendManage.prototype.getFriend = function () {
    if (this.openid != "") {
        $.ajax({
            url: "./server/friend-manage.ashx",
            type: "POST",
            dataType: "json",
            data: { 'openid': '' + this.openid + '', 'method': 'get' },
            success: function (data) {
                $("#friendlist").empty();
                if (!$.isEmptyObject(data)) {
                    var friend = "";
                    $.each(data.ds, function (index, context) {
                        if (context.Type == 2 || context.Type == 3) {
                            friend += "<tr >";
                            friend += "<td><img src='" + context.HeadimgUrl + "' style=' width:48px; height:48px;'></td>";
                            friend += "<td style='height:48px; line-height:48px;'>" + context.NickName + "</td>";
                            friend += "<td style='height:48px; line-height:48px;'>作品：" + context.Number + "</td>";
                            if (context.Type == 3) {
                                friend += "<td style='height:48px; line-height:48px;'></td>";
                            } else {
                                friend += "<td style='height:48px; line-height:48px;'><span id='cancel" + context.ID + "'  onclick='cancel(" + context.ID + ")' class='btn btn-xs btn-info'>取消</span></td>";
                            }
                            friend += "</tr>";
                        }
                    });
                    if (friend == "") {
                        friend = "<tr><td colspan='4'>暂时还没有</td></tr>";
                    }
                    friend = "<tr><th colspan='4'>小伙伴们：</th></tr>" + friend;
                    $("#friendlist").append(friend);
                } else {
                    var friend = "<tr><td colspan='4'>暂时还没有</td></tr>";
                    friend = "<tr><th colspan='4'>小伙伴们：</th></tr>" + friend;
                    $("#friendlist").append(friend);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(textStatus.readyState);
                alert(errorThrown);
            }
        })
    }


}
FriendManage.prototype.getNewFriend = function () {
    if (this.openid != "") {
        $.ajax({
            url: "./server/friend-manage.ashx",
            type: "POST",
            dataType: "json",
            data: { 'openid': '' + this.openid + '', 'method': 'getnew' },
            success: function (data) {
                $("#newfriendlist").empty();
                if (!$.isEmptyObject(data)) {
                    var newfriend = "";
                    $.each(data.ds, function (index, context) {
                        if (context.Type == 1) {
                            newfriend += "<tr >";
                            newfriend += "<td ><img src='" + context.HeadimgUrl + "' style=' width:48px; height:48px;'></td>";
                            newfriend += "<td style='height:48px; line-height:48px;'>" + context.NickName + "</td>";
                            newfriend += "<td style='height:48px; line-height:48px;'>作品：" + context.Number + "</td>";
                            newfriend += "<td style='height:48px; line-height:48px;'><span id='agree" + context.ID + "' onclick='agree(" + context.ID + ")' class='btn btn-xs btn-info'>接受</span>&nbsp;&nbsp;<span id='refuse" + context.ID + "' onclick='refuse(" + context.ID + ")' class='btn btn-xs btn-info'>拒绝</span></td>";
                            newfriend += "</tr>";
                        }
                    });
                    if (newfriend != "") {
                        newfriend = "<tr><th colspan='4'>待通过邀请：</th></tr>" + newfriend;
                        $("#newfriendlist").append(newfriend);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(textStatus.readyState);
                alert(errorThrown);
            }
        })
    }

}
var agree = function (id) {
    $.ajax({
        url: "./server/friend-manage.ashx",
        type: "POST",
        dataType: "json",
        data: { 'id': '' + id + '', 'method': 'agree' },
        success: function (data) {
            if (data.code == 0) {
                alert("已通过");
                $("#agree" + id).text("已通过");
            }
        }
    })
}
var refuse = function (id) {
    $.ajax({
        url: "./server/friend-manage.ashx",
        type: "POST",
        dataType: "json",
        data: { 'id': '' + id + '', 'method': 'refuse' },
        success: function (data) {
            if (data.code == 0) {
                alert("已拒绝");
                $("#refuse" + id).text("已拒绝");
            }
        }
    })
}
var cancel = function (id) {
    $.ajax({
        url: "./server/friend-manage.ashx",
        type: "POST",
        dataType: "json",
        data: { 'id': '' + id + '', 'method': 'cancel' },
        success: function (data) {
            if (data.code == 0) {
                alert("已取消");
                $("#cancel" + id).text("已取消");
            }
        }
    })
}