$(function () {
    var index = new Index(1, 10);
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

    /*当前菜单*/
    $("#topmenu a").eq(0).css({ 'border-bottom': '1px solid #4CAE4C' })
    farstComment.setComment();
    setJiaJiaoZhiHuiGuWen($("#hfOpenID").val());
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
        url: "./server/index.ashx",
        type: "POST",
        dataType: "json",
        data: { 'pageindex': this.pageindex, 'pagesize': this.pagesize, 'orderby': '' + orderby + '', 'openid': '' + $("#hfOpenID").val() + '', 'method': 'data' },
        beforeSend: function () {
            toast.show("数据加载");
        },
        complete: function () {
            toast.hide();
        },
        success: function (data) {
            if (!$.isEmptyObject(data)) {
                $("#media-list").empty();
                $("#media-list").append(loadData(data));
                //播放广告
                if (!$.isEmptyObject(data.adv.ds)) {
                    $.each(data.adv.ds, function (index, context) {
                        var position = context.Positions; //广告投放的位置
                        var html = adv(context);
                        $("#media-list>li").eq(position - 1).before(html);
                    })
                }
            } else {
                $("#next").css("display", "none");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            location.href = "error.html";
        }
    });
}
//最热的
Index.prototype.hot = function (orderby) {
    this.orderby = orderby;
    $.ajax({
        url: "./server/index.ashx",
        type: "POST",
        dataType: "json",
        data: { 'pageindex': this.pageindex, 'pagesize': this.pagesize, 'orderby': '' + orderby + '', 'openid': '' + $("#hfOpenID").val() + '', 'method': 'data' },
        beforeSend: function () {
            toast.show();
        },
        complete: function () {
            toast.hide();
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
            location.href = "error.html";
        }
    });
}
//下一页
Index.prototype.next=function(){
    this.pageindex += 1;
    $.ajax({
        url: "./server/index.ashx", 
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
            location.href = "error.html";
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
        url: "./server/index.ashx",
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
            location.href = "error.html";
        }
    })
}

var seaudio = seAudio();
//myLike当前用户的点赞数据
var loadData = function (data) {
    var html = "";
    $.each(data.ds, function (i, context) {
        html += "<li class='media ' style=' border-bottom:1px solid #DDD;'>";
        html += "<div class='media-left' style='width:20%;'>";
        html += "<a href='friend-works.aspx?friend=" + context.OpenID + "'><img  class='media-object' style='width:100%;' src='" + context.HeadimgUrl + "'  alt=''></a>";
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
            html += "<div style='padding:2px 0'><i class='label label-warning' style='font-family:Arial'>LV" + context.Grade + context.GradeName + "</i></div>"
        }
        if (context.My != 1) {//如果是自己的就不作操作
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
        
        html += "<p><img    id='img" + context.ID + "'  class='img-thumbnail privewimg'  src='" + (context.ImgCloudUrl || context.ImgUrl)  + "?imageView2/w/200'  /></p>";
        if (context.AudioUrl || context.AudioCloudUrl) {
            html += "<p><span style='font-size:12px;' class='btn btn-xs btn-info glyphicon glyphicon-volume-up' onclick=seaudio.play(\"" + (context.AudioCloudUrl || context.AudioUrl) + "\")> 播放</span></p>";
        }
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
    commentDialog.setCommentId(id);
    commentDialog.show();
}
var submitComment = function () {
    var openid = $("#hfOpenID").val();
    var content = $("#comment-content").val();
    var fileid = commentDialog.getCommentId();
    if (content == "") {
        alert("请输入内容");
        return;
    }
    $.ajax({
        url: "./server/index.ashx",
        type: "POST",
        dataType: "JSON",
        data: { 'content': '' + content + '', 'openid': '' + openid + '', 'fileid': '' + fileid + '', 'method': 'comment' },
        beforeSend: function () {
            toast.show("数据处理中");
        },
        complete: function () {
            toast.hide();
            $("#comment-content").val("");
        },
        success: function (data) {
            if (!$.isEmptyObject(data)) {
                if (data.code == 0) {
                    commentDialog.hide();
                    $("#commentList" + fileid + " ul ").append("<li style=' padding:3px 5px'><span style='color:#0034FF'>" + $("#hfNickName").val() + "</span>：" + content + "</li>");
                    var comment = $("#comment" + fileid);
                    var n = comment.text();
                    if (n == ' ') {
                        comment.text(" 1");
                    } else {
                        comment.text(" " + (parseInt(n) + 1));
                    }
                }
            }
            $("#comment-content").val(""); //清空评论内容
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            location.href = "error.html";
        }
    });
}
var affirmTopFile = function (id) {
    topDialog.setFileId(id);
    var $top = $("#top" + id);
    if ($top.hasClass("btn-success")) {
        return;
    }
    topDialog.show();
}
var topFile = function () {
    var openid = $("#hfOpenID").val();
    var id = topDialog.getFileId();
    var $top = $("#top" + id);
    if ($top.hasClass("btn-success")) {
        return;
    }
    $.ajax({
        url: "./server/index.ashx",
        type: "POST",
        dataType: "JSON",
        data: { 'fileid': '' + id + '', 'method': 'top' },
        beforeSend: function () {
            toast.show("数据处理中");
        },
        complete: function () {
            toast.hide();
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
            location.href = "error.html";
        }
    });
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
    friendDialog.setFriendId(openid);
    friendDialog.show();
}
var invite = function () {
    var to = friendDialog.getFriendId();
    var from = $("#hfOpenID").val();
    var content = $("#friend-content").val();
    if (to != "" && from != "") {
        $.ajax({
            url: "./server/index.ashx",
            type: "POST",
            dataType: "JSON",
            data: { 'content': '' + content + '', 'to': '' + to + '', 'from': '' + from + '', 'method': 'invite' },
            beforeSend: function () {
                toast.show("正在邀请中");
            },
            complete: function () {
                toast.hide();
            },
            success: function (data) {
                if (!$.isEmptyObject(data)) {
                    if (data.code == 5 || data.code == 0) {
                        alert("邀请已发出，请等待回应");
                    } else if (data.code == 1) {
                        alert("邀请成功，你们已是好友");
                    }
                    friendDialog.hide();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                location.href = "error.html";
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
        html += "<a href='advertisement.aspx?id=" + data.ID + "' class='bg btn-defaule '>详情<span class='glyphicon glyphicon-menu-right' style='font-size:9px'></span><span class='glyphicon glyphicon-menu-right' style='font-size:9px'></span><span class='glyphicon glyphicon-menu-right' style='font-size:9px'></span></a>";
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
/*数据加载*/
var toast = {
    that: $('#loadingToast'),
    defaultContent: "数据加载中",
    hide: function () {
        this.that.hide();
    },
    show: function (msg) {
        if (msg == '') {
            msg = this.defaultContent;
        }
        var $content = this.that.find('.weui_toast_content');
        $content.html(msg);
        this.that.show();
    }
};
/*精华设置*/
var topDialog = {
    that: $('#modal-top'),
    hide: function () {
        this.that.hide();
    },
    show: function () {
        var dialog = this.that;
        dialog.find('.weui_btn_dialog').one('click', function () {
            dialog.hide();
        });
        this.that.show();
    },
    setFileId: function (id) {
        sessionStorage.setItem("topfile", id);
    },
    getFileId: function () {
        return sessionStorage.getItem("topfile");
    }
};
/*邀请朋友*/
var friendDialog = {
    that: $('#modal-friend'),
    setFriendId: function (id) {
        sessionStorage.setItem("friendid", id);
    },
    getFriendId: function () {
        return sessionStorage.getItem("friendid");
    },
    hide: function () {
        this.that.hide();
    },
    show: function () {
        var dialog = this.that;
        dialog.find('.weui_btn_dialog').one('click', function () {
            dialog.hide();
        });
        this.that.show();
    }
};
/*用户评论*/
var commentDialog = {
    top: 0,
    that: $('#modal-comment'),
    setCommentId: function (id) {
        sessionStorage.setItem("commentid", id);
    },
    getCommentId: function () {
        return sessionStorage.getItem("commentid");
    },
    hide: function () {
        this.that.hide();
    },
    show: function () {
        $this = this;
        var dialog = this.that;
        dialog.find('.weui_btn_dialog').one('click', function () {
            $(window).off('scroll');
            dialog.hide();
        });
	var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
            var y = $(document).scrollTop();
            $this.top = y;
            $(window).on('scroll', function () {
                $(document).scrollTop(y);
            })
        }
        this.that.show();
    }
};
var farstComment = {
    setComment: function () {
        $.getJSON('data/comment.txt', function (data) {
            $comment = $("#fastComment");
            $content = $("#comment-content");
            $comment.empty();
            $(document).on('change', '#fastComment', function () {
                var v = $comment.val();
                $content.val(v);
            })
            var option = '';
            $.each(data.items, function (index, context) {
                option += '<option  value="' + context.value + '">' + context.text + '</option>'
            })
            $comment.append(option);
        })
    }
};

function setJiaJiaoZhiHuiGuWen(openId) {
    $.getJSON("/App/Project/Information/Controller/WxUserInfoController.ashx?method=info", { openId: openId }, function (result) {
        if (result.subscribe == 0) {
            $("#jiajiaoguwen").show();
        } else {
            $("#jiajiaoguwen").hide();
        }
    })
}