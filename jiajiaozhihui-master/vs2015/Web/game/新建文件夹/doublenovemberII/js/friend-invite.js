$(function () {
    var friendInvite = new FriendInvite(1, 2);
    friendInvite.getDate("isnull(Stick,0) desc,a.id desc");

    $("#province").change(function () {
        friendInvite.initCity();
    });

    $("#btnSubmit").click(function () {
        var b = friendInvite.formValidate();
        if (b) {
            friendInvite.sumitOrder();
        }
    });
    $("#bntshare").click(function () {
        $("#share").show();
        setTimeout("$('#share').fadeOut()", 1500)
    })
    friendInvite.calculate();
})
function FriendInvite(pageindex, pagesize) {
    this.pageindex = pageindex;
    this.pagesize = pagesize;
    this.orderby = "";
};
FriendInvite.prototype.getDate = function (orderby) {
    /*处量分享模式与正常模式*/
    /*朋友打开分享页后显示朋友的数据*/
    var share = $("#hfShare").val();
    var openid = "";
    if (share == "true") {
        openid = $("#hfFriendid").val();
    } else {
        openid = $("#hfOpenid").val();
    }

    $.ajax({
        url: "/game/doublenovemberII/server/friend-invite.ashx",
        type: "POST",
        dataType: "json",
        data: { 'pageindex': this.pageindex, 'pagesize': this.pagesize, 'orderby': '' + orderby + '', 'openid': '' + openid + '', 'method': 'get' },
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
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(textStatus.readyState);
            alert(errorThrown);
        }
    });
}
FriendInvite.prototype.formValidate = function () {
    var o = $("#form1").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phone: {
                required: true,
                mobile: true
            },
            provice: {
                required: true,
                min: 1
            },
            city: {
                required: true,
                min: 1
            },
            address: {
                required: true,
                minlength: 8
            }
        }
    });
    if (o.form()) {
        return true;
    }
    return false;
}
FriendInvite.prototype.initCity = function () {
    if ($("#hfArea").val() != "") {
        $("#city").empty();
        var option = "<option value=''>----请选择---</option>";
        var jsondata = eval("(" + $("#hfArea").val() + ")");
        $.each(jsondata.ds, function (index, context) {
            if (context.PID == $("#province").val()) {
                option += "<option value='" + context.AreaID + "'>" + context.AreaName + "</option>";
            }
        })
        $("#city").append(option);
    }
}
FriendInvite.prototype.sumitOrder = function () {
    var openid = $("#hfOpenid").val();
    var friendid = $("#hfFriendid").val();
    var goodsid = $("#hfGoodsid").val();
    var txtprice = $("#hfPrice").val();
    var txtnumber = $("#txtNumber").text();
    var mode = $("#hfMode").val();
    var share = $("#hfShare").val();
    $.ajax({
        url: "/game/doublenovemberII/server/friend-invite.ashx",
        type: "POST",
        dataType: "json",
        data: $("input:text,select ,textarea").serialize() + "&openid=" + openid + "&friendid=" + friendid + "&goodsid=" + goodsid + "&txtPrice=" + txtprice + "&txtNumber=" + txtnumber + "&share="+share+"&mode=" + mode + "&method=submit",
        beforeSend: function () {
            $("#modal-progress").modal('show');
        },
        complete: function () {
            $("#modal-progress").modal('hide');
        },
        success: function (data) {
            var o = jQuery.isEmptyObject(data);
            $("#alert_orderstatus").remove();
            if (!o) {
                if (data.code == 0) {
                    //已订购
                    $(document.body).append(msg.replace("@@", msg0));
                } else if (data.code == 1) {
                    // 订购成功
                    //$(document.body).append(msg.replace("@@", msg1));
                    window.location.href = $("#hfOnlinePay").val();
                } else if (data.code == 2) {
                    //订购失败
                    $(document.body).append(msg.replace("@@", msg2));
                }
                $("#alert_orderstatus").css("display", "block");
            }else{
               alert("你已订购了");
            }
        },
        error: function () {

        }
    });
}
FriendInvite.prototype.add = function () {
    return; //不可以增加
    var v = parseInt($("#txtNumber").text());
    v += 1;
    $("#txtNumber").text(v);
    this.calculate();
}
FriendInvite.prototype.subtract=function(){
    return;//不可以减少
    var v = parseInt($("#txtNumber").text());
    if (v > 1) {
        v -= 1;
        $("#txtNumber").text(v);
        this.calculate();
    }
}
FriendInvite.prototype.calculate=function(){
    var v = parseFloat($("#txtUnitPrice").text());
    var n = parseInt($("#txtNumber").text());
    var r = v * n;
    $("#hfPrice").val(r.toFixed(2));
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
        if (context.Owner != "成人" && context.AwayYear!="") {
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
        html += "</div>";
        html += "</div>";
        html += "<div class='media-body'>";
        html += "<h5 style='color:rgb(0,52,255)'>" + context.NickName + "</h5>";
        html += "<p>" + context.Resume + "</p>";
        if (context.BookName != "") {
            if (context.MainWords != "" && context.UnscrambleAct == "1") {
                html += "<p >---" + context.BookName + "第" + context.PageNumber + "页 &nbsp;&nbsp;<a href='unscramble.aspx?book=" + context.BookName + "&index=" + context.PageNumber + "&openid=" + $("#hfOpenid").val() + "&weixinid=" + $("#hfWeixinID").val() + "' class='btn btn-xs btn-info'>注解</a></p>";
                html += "<p ><i style='color:#0034FF'><strong>典语：</strong></i>" + context.MainWords + "&nbsp;&nbsp;</p>";
            } else {
                html += "<p >---" + context.BookName + "第" + context.PageNumber + "页 </p>";
            }
        }
        html += "<p><img    id='img" + context.ID + "'  class='img-thumbnail privewimg'  src='" + context.ImgUrl + "?imageView2/w/100'  /></p>";
        html += "<p>";
        html += "<span class='bg btn-defaule glyphicon glyphicon-time'>" + context.Create_Date + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        html += "<span class='btn btn-success btn-xs glyphicon glyphicon-heart ' id='like" + context.ID + "'  onclick='like(" + context.ID + ")' > " + context.Like_Number + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        html += "<span id='comment" + context.ID + "'  class='btn btn-xs btn-info glyphicon glyphicon-comment'> " + context.Comment_Number + "</span>";
        html += "</p>";
        html += "<div id='commentList" + context.ID + "'>";
        html += "<ul class='list-group' style='background:#eee;'>" + commentList(data, context.ID) + "</ul>"; //评论
        html += "</div>";
        html += "</div>";
        html += "</li>";
    })
    return html;
}

var commentList = function (data, id) {
    var html = "";
    if (!$.isEmptyObject(data.comment.ds)) {
        $.each(data.comment.ds, function (index, context) {
            if (context.FileID == id) {
                html += "   <li style=' padding:3px 5px'>" + context.NickName + "：" + context.Content + "</li>";
            }
        })
    }
    return html;
}
var msg = "<div id='alert_orderstatus' class='alert alert-danger alert-dismissible fade in' role='alert' >"
      + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>×</span></button>"
      + "<span id='alert_msg' style=' font-size:16px;'>@@</span>"
    + "</div>";
var msg0 = "你已订购";
var msg1 = "订购成功";
var msg2 = "订购失败";