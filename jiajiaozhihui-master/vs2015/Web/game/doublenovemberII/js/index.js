$(function () {
    var index = new Index(1, 10);
    //index.init();
    index.latest("isnull(Stick,0) desc,a.id desc");
    $("#next").click(function () {
        index.next();
    });
    $("#btnLatest").click(function () {
        index.pageindex = 1;
        index.pagesize = 10
        $("#next").css("display", "block");
        index.latest("isnull(Stick,0) desc, a.id desc");
    });
    $("#btnHot").click(function () {
        index.pageindex = 1;
        index.pagesize = 10
        $("#next").css("display", "block");
        index.hot("isnull(Stick,0) desc, isnull(Like_Number,0) desc");
    })

    $("#btnComment").click(function () {
        
        submitComment();
    });
    $("#btnFriend").click(function () {
        invite();
    })
    $("#btnTop").click(function () {
        topFile();
    });
})

function Index(pageindex,pagesize) {
    this.pageindex = pageindex;
    this.pagesize = pagesize;
    this.orderby = " a.id desc";

};
//最新的
Index.prototype.latest = function (orderby) {
    this.orderby = orderby;
    $.ajax({
        url: "/game/doublenovemberII/server/index.ashx",
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
                $("#media-list").append(loadData(data));
                //播放广告
                if (!$.isEmptyObject(data.adv.ds)) { 
                    $.each(data.adv.ds, function (index, context) {
                        var position=context.Positions;//广告投放的位置
                        var html=adv(context);
                        $("#media-list>li").eq(position-1).before(html);
                    })
                }
            } else {
                $("#next").css("display", "none");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#modal-net-exception").modal('show');
        }
    });
}
//最热的
Index.prototype.hot = function (orderby) {
    this.orderby = orderby;
    $.ajax({
        url: "/game/doublenovemberII/server/index.ashx",
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
                $("#media-list").append(loadData(data));

            } else {
                $("#next").css("display", "none");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#modal-net-exception").modal('show');
        }
    });
}
//下一页
Index.prototype.next=function(){
    this.pageindex += 1;
    $.ajax({
        url: "/game/doublenovemberII/server/index.ashx",
        type: "POST",
        dataType: "json",
        data: { 'pageindex': this.pageindex, 'pagesize': this.pagesize, 'orderby': '' + this.orderby + '', 'openid': '' + $("#hfOpenID").val() + '', 'method': 'data' },
        success: function (data) {
            if (!$.isEmptyObject(data)) {
                $("#media-list").append(loadData(data));
            }else{
                $("#next").css("display","none");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#modal-net-exception").modal('show');
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
        url: "/game/doublenovemberII/server/index.ashx",
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
            $("#modal-net-exception").modal('show');
        }
    })
}
//myLike当前用户的点赞数据
var loadData = function (data) {
    var html = "";
    $.each(data.ds, function (i, context) {
        html += "<li class='media ' style=' border-bottom:1px solid #DDD;'>";
        html += "<div class='media-left' style='width:20%;'>";
        html += "<a href='friend-works.aspx?friend=" + context.OpenID + "&openid=" + $("#hfOpenID").val() + "&weixinid=" + $("#hfWeixinID").val() + "'><img  class='media-object' style='width:100%;' src='" + context.HeadimgUrl + "'  alt=''></a>";
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
        if (context.My !=1) {//如果是自己的就不作操作
            if (context.IsInvite == 1) {
                html += "<div class='btn btn-xs btn-info'  style='font-size:11px;padding:2px 0'>我的好友</div>";
            } else {
                html += "<div class='btn btn-xs btn-info' onclick='friend(\"" + context.OpenID + "\")' style='font-size:11px;padding:2px 0'>与TA结伴</div>";
            }
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
            
            if (context.MainWords != "" && context.UnscrambleAct=="1") {
		html += "<p >---" + context.BookName + "第" + context.PageNumber + "页&nbsp;&nbsp;<a href='unscramble.aspx?book=" + context.BookName + "&index=" + context.PageNumber + "&openid=" + $("#hfOpenID").val() + "&weixinid=" + $("#hfWeixinID").val() + "' class='btn btn-xs btn-info'>注解</a></p>";
                html += "<p ><i style='color:#0034FF'><strong>典语：</strong></i>" + context.MainWords + "</p>";
            }else{
	    	html += "<p >---" + context.BookName + "第" + context.PageNumber + "页</p>";
            }
            
        }
        html += "<p><img    id='img" + context.ID + "'  class='img-thumbnail privewimg'  src='" + context.ImgUrl + "?imageView2/w/200'  /></p>";
        html += "<p>";
        html += "<span class='bg btn-defaule glyphicon glyphicon-time'>" + context.Create_Date + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        html += "<span class='btn " + lightUp(context.LikeState) + " btn-xs glyphicon glyphicon-heart ' id='like" + context.ID + "'  onclick='like(" + context.ID + ")' > " + context.Like_Number + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        html += "<span id='comment" + context.ID + "' onclick='comment(" + context.ID + ")'  class='btn btn-xs btn-info glyphicon glyphicon-comment'> " + context.Comment_Number + "</span>";
	if ($("#hfA").val() == "1") {
            if (context.IsTop == "1") {
                html += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id='top" + context.ID + "' onclick='affirmTopFile(" + context.ID + ")'  class='btn btn-xs btn-success '>精华</span>";
            } else {
                html += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id='top" + context.ID + "' onclick='affirmTopFile(" + context.ID + ")'  class='btn btn-xs btn-default '>精华</span>";
            }
        } else {
            if (context.IsTop == "1") {
                html += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span  class='label label-danger'>精华</span>";
            }
        }
        html += "</p>";
        html += "<div id='commentList" + context.ID + "'>";
        html += "<ul class='list-group' style='background:#eee;'>" + commentList(data, context.ID) + "</ul>"; //评论
        html += "</div>";
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

var comment = function (id) {
    sessionStorage.setItem("commentid", id);
    $("#modal-comment").modal('show');
}
var submitComment = function () {
    var openid = $("#hfOpenID").val();
    var content = $("#comment-content").val();
    var fileid = sessionStorage.getItem("commentid");
    if (content == "") {
        alert("请输入内容");
        return;
    }
    $.ajax({
        url: "/game/doublenovemberII/server/index.ashx",
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
                    $("#commentList" + fileid + " ul ").append("<li style=' padding:3px 5px'><span style='color:#0034FF'>" + $("#hfNickName").val() + "</span>：" + content + "</li>");
                    var comment = $("#comment" + fileid);
                    var n = comment.text();
                    if (n == ' ') {
                        comment.text(" 1");
                    } else {
                        comment.text(' ' + ((parseInt(n) + 1)));
                    }
                }
            }
	    $("#comment-content").val(""); //清空评论内容
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#modal-net-exception").modal('show');
        }
    });
}
var affirmTopFile = function (id) {
    sessionStorage.setItem("topfile", id);
    var $top = $("#top" + id);
    if ($top.hasClass("btn-success")) {
        return;
    }
    $("#modal-top").modal('show');
}
var commentList = function (data, id) {
    var html = "";
    if (!$.isEmptyObject(data.comment.ds)) {
        $.each(data.comment.ds, function (index, context) {
            if (context.FileID == id) {
                html += "   <li style=' padding:3px 5px'><span style='color:#0034FF'>" + context.NickName + "</span>：" + context.Content + "</li>";
            }
        })
    }
    return html;
}
var friend = function (openid) {
    sessionStorage.setItem("friend", openid);
    $("#modal-friend").modal('show');
}
var invite = function () {
    var to = sessionStorage.getItem("friend");
    var from = $("#hfOpenID").val();
    var content = $("#friend-content").val();
    if (to != "" && from != "") {
        $.ajax({
            url: "/game/doublenovemberII/server/index.ashx",
            type: "POST",
            dataType: "JSON",
            data: { 'content': '' + content + '', 'to': '' + to + '', 'from': '' + from + '', 'method': 'invite' },
            beforeSend: function () {
                $("#modal-progress").modal('show');
            },
            complete: function () {
                $("#modal-progress").modal('hide');
            },
            success: function (data) {
                if (!$.isEmptyObject(data)) {
                    if (data.code == 5 || data.code == 0) {
                        alert("邀请已发出，请等待回应");
                    } else if (data.code == 1) {
                        alert("邀请成功，你们已是好友");
                    }
                    $("#modal-friend").modal('hide');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#modal-net-exception").modal('show');
            }
        });
    }
}
//播放广告
var adv = function (data) {
    var html = "";
    html += "<li class='media ' style=' border-bottom:1px solid #DDD;'>";
    html += "<div class='media-left' style='width:20%;'>";
    html += "<a href='javascript:void(0)'><img  class='media-object' style='width:100%;' src='images/teacher.jpg'  alt=''></a>";
    html += "<div class='owner'>";
    html += "<div style='padding:2px 0'><span class='glyphicon glyphicon-map-marker' ></span><span >深圳市</span></div>";
    html += "</div>";
    html += "</div>";
    html += "<div class='media-body'>";
    html += "<h5 style='color:rgb(0,52,255)'>亲子书法小慧老师</h5>";
    html += "<p>";
    html += data.Resume + "&nbsp;&nbsp;";
    if (data.OuterLink != "") {
        html += "<a href='" + data.OuterLink + "' class='bg btn-defaule '>详情<span class='glyphicon glyphicon-menu-right' style='font-size:9px'></span><span class='glyphicon glyphicon-menu-right' style='font-size:9px'></span><span class='glyphicon glyphicon-menu-right' style='font-size:9px'></span></a>";
    } else if (data.ContentLength > 0 || data.MediaUrl != "") {
        html += "<a href='advertisement.aspx?id=" + data.ID + "&openid=" + $("#hfOpenID").val() + "&weixinid=" + $("#hfWeixinID").val() + "' class='bg btn-defaule '>详情<span class='glyphicon glyphicon-menu-right' style='font-size:9px'></span><span class='glyphicon glyphicon-menu-right' style='font-size:9px'></span><span class='glyphicon glyphicon-menu-right' style='font-size:9px'></span></a>";
    }
    html += "</p>";
    html += "<p><img    id='img" + data.ID + "'  class='img-thumbnail privewimg'  src='" + data.ImgUrl + "'  /></p>";
    html += "<p>";
    html += "<span class='bg btn-defaule glyphicon glyphicon-time'>" + data.CreateDate + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    
    html += "</p>";
    html += "</div>";
    html += "</li>";
    return html;
}
var topFile = function () {
    var openid = $("#hfOpenID").val();
    var id = sessionStorage.getItem("topfile");
    var $top = $("#top" + id);
    $.ajax({
        url: "/game/doublenovemberII/server/index.ashx",
        type: "POST",
        dataType: "JSON",
        data: { 'fileid': '' + id + '', 'method': 'top' },
        beforeSend: function () {
            $("#modal-progress").modal('show');
        },
        complete: function () {
            $("#modal-progress").modal('hide');
            $top.removeClass("btn-default").addClass("btn-success");
        },
        success: function (data) {
            if (!$.isEmptyObject(data)) {
                if (data.code == 0) {
                    alert("设置成功");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#modal-net-exception").modal('show');
        }
    });
}