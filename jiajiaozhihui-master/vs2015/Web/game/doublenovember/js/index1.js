$(function () {
    var index = new Index(1, 10);
    index.init();
    index.latest("isnull(Stick,0) desc,a.id desc");
    $("#next").click(function () {
        index.next();
    });
    $("#btnLatest").click(function () {
        index.pageindex = 1;
        index.pagesize = 10
        $("#next").css("display", "block");
        $(this).parent().siblings().find("a").css("background-color", "#337AB7");
        $(this).css("background-color", "#286090");
        index.latest("isnull(Stick,0) desc, a.id desc");
    });
    $("#btnHot").click(function () {
        index.pageindex = 1;
        index.pagesize = 10
        $("#next").css("display", "block");
        $(this).parent().siblings().find("a").css("background-color", "#337AB7");
        $(this).css("background-color", "#286090");
        index.hot("isnull(Stick,0) desc, isnull(Like_Number,0) desc");
    })

})

function Index(pageindex, pagesize) {
    this.pageindex = pageindex;
    this.pagesize = pagesize;
    this.orderby = " a.id desc";

};
//最新的
Index.prototype.latest = function (orderby) {
    this.orderby = orderby;
    $.ajax({
        url: "/game/doublenovember/server/index.ashx",
        type: "POST",
        dataType: "json",
        data: { 'pageindex': this.pageindex, 'pagesize': this.pagesize, 'orderby': '' + orderby + '', 'openid': '' + $("#hfOpenID").val() + '', 'method': 'data' },
        beforeSend: function () {
            $("#modal-progress").modal('show');
        },
        complete: function () {
            $("#modal-progress").modal('hide');
        },
        success: function (data) {
            if (!$.isEmptyObject(data)) {
                $("#media-list").empty();
                $("#media-list").append(loadData(data.ds));
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
//最热的
Index.prototype.hot = function (orderby) {
    this.orderby = orderby;
    $.ajax({
        url: "/game/doublenovember/server/index.ashx",
        type: "POST",
        dataType: "json",
        data: { 'pageindex': this.pageindex, 'pagesize': this.pagesize, 'orderby': '' + orderby + '', 'openid': '' + $("#hfOpenID").val() + '', 'method': 'data' },
        beforeSend: function () {
            $("#modal-progress").modal('show');
        },
        complete: function () {
            $("#modal-progress").modal('hide');
        },
        success: function (data) {
            if (!$.isEmptyObject(data)) {
                $("#media-list").empty();
                $("#media-list").append(loadData(data.ds));
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
    $.ajax({
        url: "/game/doublenovember/server/index.ashx",
        type: "POST",
        dataType: "json",
        data: { 'pageindex': this.pageindex, 'pagesize': this.pagesize, 'orderby': '' + this.orderby + '', 'openid': '' + $("#hfOpenID").val() + '', 'method': 'data' },
        success: function (data) {
            if (!$.isEmptyObject(data)) {
                $("#media-list").append(loadData(data.ds));

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
Index.prototype.init = function () {
    $("#btnLatest").css("background-color", "#286090");
}

var like = function (id) {
    var like = $("#like" + id);
    if (like.hasClass("btn-success")) {
        return;
    }
    $.ajax({
        url: "/game/doublenovember/server/index.ashx",
        type: "POST",
        dataType: "json",
        data: { 'openid': '' + $("#hfOpenID").val() + '', 'id': id, 'method': 'like' },
        success: function (data) {
            if (!$.isEmptyObject(data)) {
                if (data.code == 0) {
                    like.removeClass("btn-default");
                    like.addClass("btn-success");
                    var n = like.text();
                    if (n == ' ') {
                        like.text(" 1");
                    } else {
                        like.text(" " + (parseInt(n) + 1));
                    }
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
//myLike当前用户的点赞数据
var loadData = function (data) {
    var html = "";
    $.each(data, function (i, context) {
        html += "<li class='media'>";
        html += "<div class='media-left' style='width:20%;'>";
        html += "<a href='javascript:void(0)'><img  class='media-object' style='width:100%;' src='" + context.HeadimgUrl + "'  alt=''></a>";
        html += "<div class='owner'>";
        //是谁的作品，是成人，还是孩子
        html += "<span class='label  label-success' >" + context.Owner + "作品</span>";
        html += "</div>";
        html += "</div>";
        html += "<div class='media-body'>";
        html += "<h5 style='color:rgb(0,52,255)'>" + context.NickName + "</h5>";
        html += "<p>" + context.Resume + "</p>";
        html += "<p><img onclick='showPic(" + context.ID + ")' id='img" + context.ID + "'  class='img-thumbnail privewimg'  src='" + context.ImgUrl + "?imageView2/w/100'  /></p>";
        html += "<p>";
        html += "<span class='bg btn-defaule glyphicon glyphicon-time'>" + context.Create_Date + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        html += "<span class='btn " + lightUp(context.LikeState) + " btn-xs glyphicon glyphicon-heart ' id='like" + context.ID + "'  onclick='like(" + context.ID + ")' > " + context.Like_Number + "</span>";
        html += "</p>";
        html += "</div>";
        html += "</li>";
    })
    return html;
}
var lightUp = function (likeState) {
    var result = "btn-default";
    if (likeState == 1) {
        result = "btn-success";
    }
    return result;
}


