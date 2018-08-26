$(function () {
    var index = new Index(1, 10);
    index.latest("isnull(Stick,0) desc,a.id desc");
    $("#btnPersonal").css("background-color", "#286090");
    $("#next").click(function () {
        index.next();
    });
    $("#btnOrderInfo").click(function () {
        $(this).parent().siblings().find("a").css("background-color", "#337AB7");
        $(this).css("background-color", "#286090");
        $("#next").css("display", "none");
        $("#media-list").empty();
        index.order();
    });
    $("#btnPersonal").click(function () {
        $(this).parent().siblings().find("a").css("background-color", "#337AB7");
        $(this).css("background-color", "#286090");
        $("#next").css("display", "block");
        index.pageindex = 1;
        index.pagesize = 10;
        $("#media-list").empty();
        index.latest("isnull(Stick,0) desc,a.id desc");
    });

    $("#btnComment").click(function () {
        var value = $("#comment-content").val();
        if (value == "") {
            alert("没有填写评语");
            return false;
        }
        submitComment();
    });
    $("#btnDelete").click(function () {
        var id = sessionStorage.getItem("deleteid");
        $("#modal-delete").modal('hide');
        subDeleteFile(id);
    });
    $("#bntshare").click(function () {
        $("#share").show();
        setTimeout("$('#share').fadeOut()", 1500)
    })
    if ($("#hfShare").val() == "true") {
        $("#alert-invite").css("display","none");
    }
})

function Index(pageindex, pagesize) {
    this.pageindex = pageindex;
    this.pagesize = pagesize;
    this.orderby = " a.id desc";
};
//最新的
Index.prototype.latest = function (orderby) {
    this.orderby = orderby;
    var openid = $("#hfOpenID").val();
    var friendopenid = $("#hfFriendid").val(); ;
    var share = $("#hfShare").val();
    $.ajax({
        url: "/game/doublenovemberII/server/info.ashx",
        type: "POST",
        dataType: "json",
        data: { 'pageindex': this.pageindex, 'pagesize': this.pagesize, 'orderby': '' + orderby + '', 'share': '' + share + '', 'openid': '' + openid + '', 'friendopenid': '' + friendopenid + '', 'method': 'data' },
        beforeSend: function () {
            $("#modal-progress").modal('show');
        },
        complete: function () {
            $("#modal-progress").modal('hide');
        },
        success: function (data) {
            if (!$.isEmptyObject(data)) {
                $("#media-list").empty();
                $("#media-list").append(loadData(data));
            } else {
                $("#next").css("display", "none");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(textStatus.readyState);
            alert(errorThrown);
        }
    });
}

//下一页
Index.prototype.next = function () {
    this.pageindex += 1;
    var openid = $("#hfOpenID").val();
    var friendopenid = $("#hfFriendid").val(); ;
    var share = $("#hfShare").val();
    $.ajax({
        url: "/game/doublenovemberII/server/info.ashx",
        type: "POST",
        dataType: "json",
        data: { 'pageindex': this.pageindex, 'pagesize': this.pagesize, 'orderby': '' + this.orderby + '', 'share': '' + share + '', 'openid': '' + openid + '', 'friendopenid': '' + friendopenid + '', 'method': 'data' },
        beforeSend: function () {
            $("#modal-progress").modal('show');
        },
        complete: function () {
            $("#modal-progress").modal('hide');
        },
        success: function (data) {
            if (!$.isEmptyObject(data)) {
                $("#media-list").append(loadData(data));
            } else {
                $("#next").css("display", "none");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(textStatus.readyState);
            alert(errorThrown);
        }
    });
}

var loadData = function (data) {
    var html = "";
    $.each(data.ds, function (i, context) {
        html += "<li class='media ' style=' border-bottom:1px solid #DDD;' id='item" + context.ID + "'>";
        html += "<div class='media-left' style='width:20%;'>";
        html += "<a href='javascript:void(0)'><img  class='media-object' style='width:100%;' src='" + context.HeadimgUrl + "'  alt=''></a>";
        html += "<div class='owner'>";
        //是谁的作品，是成人，还是孩子
        html += "<div style='padding:2px 0'><span class='label  label-success' >" + context.Owner + "作品</span></div>";
        if (context.Owner != "成人" && context.AwayYear != "") {
            if (context.Sex == "男") {
                html += "<div style='padding:2px 0'><span class='glyphicon glyphicon-user' style=' color:#0034FF' ></span><span >" + context.AwayYear + "岁</span></div>";
            } else {
                html += "<div style='padding:2px 0'><span class='glyphicon glyphicon-user' style='color:#f00'></span><span >" + context.AwayYear + "岁</span></div>";
            }
        }
        html += "<div style='padding:2px 0'><span class='glyphicon glyphicon-map-marker' ></span><span >" + context.CityName + "</span></div>";
        html += "<div style='padding:2px 0'><span >第" + context.AwayDay + "天</span></div>";
        if (context.Grade == "") {
            html += "<div style='padding:2px 0'><i class='label label-warning' style='font-family:Arial'>LV1书生</i></div>"
        } else {
            html += "<div style='padding:2px 0'><i class='label label-warning' style='font-family:Arial'>LV"+context.Grade+context.GradeName +"</i></div>"
        }
	if (context.Share != "true") { //如果不是分享，也就是自己打开那么是可以删除的
            html += "<div style='padding:2px 0'><span onclick=deleteFile(" + context.ID + ") class='btn btn-xs btn-danger' >删除</span></div>";
        }
        html += "</div>";
        html += "</div>";
        html += "<div class='media-body'>";
        if (context.IsAlias == 1) {
            html += "<h5 style='color:rgb(0,52,255)'>" + context.Alias + "</h5>";
        } else {
            html += "<h5 style='color:rgb(0,52,255)'>" + context.NickName + "</h5>";
        }
        html += "<p>" + context.Resume + "</p>";
        if (context.BookName != "") {
            if (context.MainWords != "" && context.UnscrambleAct == "1") {
                html += "<p >---" + context.BookName + "第" + context.PageNumber + "页 &nbsp;&nbsp;<a href='unscramble.aspx?book=" + context.BookName + "&index=" + context.PageNumber + "&openid=" + $("#hfOpenID").val() + "&weixinid=" + $("#hfWeixinID").val() + "' class='btn btn-xs btn-info'>注解</a></p>";
                html += "<p ><i style='color:#0034FF'><strong>典语：</strong></i>" + context.MainWords + "&nbsp;&nbsp;</p>";
            } else {
                html += "<p >---" + context.BookName + "第" + context.PageNumber + "页 </p>";
            }
        }
        html += "<p><img    id='img" + context.ID + "'  class='img-thumbnail privewimg'  src='" + context.ImgUrl + "?imageView2/w/200'  /></p>";
        html += "<p>";
        html += "<span class='bg btn-defaule glyphicon glyphicon-time'>" + context.Create_Date + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        html += "<span class='btn btn-success btn-xs glyphicon glyphicon-heart ' id='like" + context.ID + "'  onclick='like(" + context.ID + ")' > " + context.Like_Number + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        html += "<span id='comment" + context.ID + "' onclick='comment(" + context.ID + ")'  class='btn btn-xs btn-info glyphicon glyphicon-comment'> " + context.Comment_Number + "</span>";
        html += "</p>";
        html += "<div id='commentList" + context.ID + "'>";
        html += "<ul class='list-group' style='background:#eee;'>" + commentList(data, context.ID) + "</ul>"; //评论
        html += "</div>";
        html += "</div>";
        html += "</li>";
    })
    return html;
}
var comment = function (id) {
    sessionStorage.setItem("commentid", id);
    $("#modal-comment").modal('show');
}
var commentList = function (data, id) {
    var html = "";
    if (!$.isEmptyObject(data.comment.ds)) {
        $.each(data.comment.ds, function (index, context) {
            console.log("FileID=" + context.FileID + ",id=" + id);
            if (context.FileID == id) {
                html += "   <li style=' padding:3px 5px'><span style='color:#0034FF'>" + context.NickName + "</span>：" + context.Content + "</li>";
            }
        })
    }
    return html;
}
var submitComment = function () {
    var openid = $("#hfOpenID").val();
    var content = $("#comment-content").val();
    var fileid = sessionStorage.getItem("commentid");
    $.ajax({
        url: "/game/doublenovemberII/server/info.ashx",
        type: "POST",
        dataType: "JSON",
        data: { 'content': '' + content + '', 'openid': '' + openid + '', 'fileid': '' + fileid + '', 'method': 'comment' },
        beforeSend: function () {
            $("#modal-progress").modal('show');
        },
        complete: function () {
            $("#modal-progress").modal('hide');
            $("#comment-content").val("");
        },
        success: function (data) {
            if (!$.isEmptyObject(data)) {
                if (data.code == 0) {
                    $("#modal-comment").modal('hide');
                    $("#commentList" + fileid + " ul ").append("<li style=' padding:3px 5px'><span style='color:#0034FF'> " + $("#hfNickName").val() + "</span>：" + content + "</li>");
                    var comment = $("#comment" + fileid);
                    var num = comment.text();
                    if (num ==' ') {
                        comment.text(" 1");
                    } else {
                        comment.text(" "+(parseInt(num) + 1));
                    }
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
var deleteFile=function(id){
    sessionStorage.setItem("deleteid", id);
    $("#modal-delete").modal('show');
}
var subDeleteFile = function (id) {
    $.ajax({
        url: "/game/doublenovemberII/server/info.ashx",
        type: "POST",
        dataType: "JSON",
        data: { 'id': '' + id + '', 'method': 'delete' },
        beforeSend: function () {
            $("#modal-progress").modal('show');
        },
        complete: function () {
            $("#modal-progress").modal('hide');
        },
        success: function (data) {
            if (!$.isEmptyObject(data)) {
                if (data.code == 0) {
                    alert("删除成功");
                    $("#item" + id).remove();
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