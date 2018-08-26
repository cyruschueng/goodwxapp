$(function () {
    var friendInvite = new FriendInvite(1, 2);
    friendInvite.getDate("isnull(Stick,0) desc,a.id desc");

    $("#btnConfirmOrder").click(function () {
        if ($("#name").text() == "" || $("#telephone").text() == "") {
            alert("请选择与编辑收货地址");
        } else {
            dialogOrder.show();
        }
    });
    $("#btnSubmit").click(function () {
        friendInvite.sumitOrder();
    });
    $("#bntshare").click(function () {
        $("#share").show();
        setTimeout("$('#share').fadeOut()", 1500)
    })
    friendInvite.calculate();
    $('#myTab li:eq(0) a').tab('show');
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
        url: "./server/friend-invite.ashx",
        type: "POST",
        dataType: "json",
        data: { 'pageindex': this.pageindex, 'pagesize': this.pagesize, 'orderby': '' + orderby + '', 'openid': '' + openid + '','share':''+share+'','method': 'get' },
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
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(textStatus.readyState);
            alert(errorThrown);
        }
    });
}
FriendInvite.prototype.sumitOrder = function () {
    var openid = $("#hfOpenid").val();
    var friendid = $("#hfFriendid").val();
    var goodsid = $("#hfGoodsid").val();
    var txtprice = $("#hfPrice").val();
    var txtnumber = $("#txtNumber").text();
    var mode = $("#hfMode").val();
    var share = $("#hfShare").val();
    var address = $("#hfProvince").val()+" " +  $("#hfCity").val() + " " + $("#hfDistrict").val() + " " + $("#hfAddress").val();
    var remark = $("#remark").val();
    var tradeno =$("#hfTradeno").val();
    $.ajax({
        url: "./server/friend-invite.ashx",
        type: "POST",
        dataType: "json",
        data: { name: '' + $("#name").text() + '', phone: '' + $("#telephone").text() + '', province: '' + $("#hfProvince").val() + '', city: '' + $("#hfCity").val() + '', district: '' + $("#hfDistrict").val() + '', address: '' + address + '', postcode: '', remark: '' + remark + '', openid: '' + openid + '', friendid: '' + friendid + '', goodsid: '' + goodsid + '', txtPrice: '' + txtprice + '', txtNumber: '' + txtnumber + '', share: '' + share + '', mode: '' + mode + '', tradeno:''+tradeno+'', method: 'submit' },
        beforeSend: function () {
            toast.show("正在提交订单");
        },
        complete: function () {
            toast.hide();
        },
        success: function (data) {
            var o = jQuery.isEmptyObject(data);
            if (!o) {
                if (data.code == 0) {
                    //已订购
                    location.href = "./result/invite.html?code=0";
                } else if (data.code == 1) {
                    // 订购成功
                    location.href = "./result/invite.html?code=1";
                } else if (data.code == 2) {
                    //订购失败
                    location.href = "./result/invite.html?code=2";
                } else if (data.code == 3) {
                    location.href = "./result/invite.html?code=3";
                }
            } else {
                location.href = "./result/invite.html?code=0";
            }
        },
        error: function () {
            //订购失败
            location.href = "./result/order.html?code=2";
        }
    });
}
FriendInvite.prototype.add = function () {
    //return; //不可以增加
    var v = parseInt($("#txtNumber").text());
    v += 1;
    $("#txtNumber").text(v);
    this.calculate();
}
FriendInvite.prototype.subtract=function(){
    //return;//不可以减少
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
var seaudio = seAudio();
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
            html += "<div style='padding:2px 0'><i class='label label-warning' style='font-family:Arial'>LV" + context.Grade + context.GradeName + "</i></div>"
        }
        html += "</div>";
        html += "</div>";
        html += "<div class='media-body'>";
        html += "<h5 style='color:rgb(0,52,255)'>" + context.NickName + "</h5>";
        html += "<p>" + context.Resume + "</p>";
        
        html += "<p><img    id='img" + context.ID + "'  class='img-thumbnail privewimg'  src='" + (context.ImgCloudUrl || context.ImgUrl)  + "?imageView2/w/100'  /></p>";
	if (context.AudioUrl || context.AudioCloudUrl) {
            html += "<p><span style='font-size:12px;' class='btn btn-xs btn-info glyphicon glyphicon-volume-up' onclick=seaudio.play(\"" + (context.AudioCloudUrl || context.AudioUrl)  + "\")> 播放</span></p>";
        }
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
/*确认订单*/
var dialogOrder = {
    that: $('#dialogOrder'),
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

wx.ready(function () {
    wxJsApi.shareAppMessage();
    wxJsApi.shareTimeline();
    $(document).on("click", ".privewimg", function (event) {
        wxJsApi.privewimg(this);
    })
    wxJsApi.getLocation()
})

var wxJsApi = {
    shareData: {
        title: '我娃亲子书法第' + $("#hfAwayDays").val() + '天了，好棒，喊你娃一起学习！',
        desc: '家教智慧举办“亲子书法”活动，该活动是基于“书法+移动互联网”的创新理念，致力于打造一场万人书法盛宴',
        link: $("#hfShareLink").val(),
        imgUrl: 'http://weixin.jiajiaozhihui.cn/images/2015110908163066ea.jpg'
    },
    shareAppMessage: function () {
        wx.onMenuShareAppMessage(this.shareData);
    },
    shareTimeline: function () {
        wx.onMenuShareTimeline(this.shareData);
    },
    privewimg: function (that) {
        var src = $(this).attr("src");
        var index = src.lastIndexOf("?");
        src = src.substr(0, index);
        src = src + '?imageView2/2/w/600';
        wx.previewImage({
            current: src,
            urls: [src]
        });
    },
    getLocation: function () {
        wx.getLocation({
            success: function (res) {
                $.ajax({
                    url: "./server/index.ashx",
                    type: "POST",
                    dataType: "json",
                    data: { 'openid': '' + $("#hfOpenid").val() + '', 'latitude': '' + res.latitude + '', 'longitude': '' + res.longitude + '', 'method': 'location' },
                    success: function (data) {

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {

                    }
                });
            }
        });
    },
};