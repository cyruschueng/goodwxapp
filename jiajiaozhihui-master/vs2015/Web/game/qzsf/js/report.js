(function ($) {
    $("#selectWeek").click(function () {
        $("#navbar").hide();
        var mask = $('#mask');
        var weuiActionsheet = $('#weui_actionsheet');
        weuiActionsheet.addClass('weui_actionsheet_toggle');
        mask.show()
            .focus()
            .addClass('weui_fade_toggle').one('click', function () {
                hideActionSheet(weuiActionsheet, mask);
            });
        $('#actionsheet_cancel').one('click', function () {
            hideActionSheet(weuiActionsheet, mask);
        });

        $(".weui_actionsheet_menu").on('click', '.week', function () {
            var week = $(this).data("week");
            document.title = "第" + week + "周记录";
            getData(week);
            hideActionSheet(weuiActionsheet, mask);
        })
        mask.unbind('transitionend').unbind('webkitTransitionEnd');
        function hideActionSheet(weuiActionsheet, mask) {
            weuiActionsheet.removeClass('weui_actionsheet_toggle');
            mask.removeClass('weui_fade_toggle');
            mask.on('transitionend', function () {
                mask.hide();
            }).on('webkitTransitionEnd', function () {
                mask.hide();
            })
            $("#navbar").show();
        }
    })

    function getData(week) {
        var openid = $("#hfOpenID").val();
        $.ajax({
            url: "./server/report.ashx",
            type: "POST",
            dataType: "json",
            data: { 'openid': '' + openid + '', 'week': '' + week + '', 'method': 'data' },
            beforeSend: function () {
                //toast.show();
            },
            complete: function () {
                //toast.hide();
            },
            success: function (data) {

                if (!$.isEmptyObject(data)) {
                    $("#media-list").empty();
                    $("#media-list").append(loadData(data));
                } else {
                    $("#media-list").empty();
                    var html = "<li class='media text-center'>当前没有数据</li>";
                    $("#media-list").append(html);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
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

            html += "<p><img    id='img" + context.ID + "'  class='img-thumbnail privewimg'  src='" + (context.ImgCloudUrl || context.ImgUrl) + "?imageView2/w/100'  /></p>";
            if (context.AudioUrl || context.AudioCloudUrl) {
                html += "<p><span style='font-size:12px;' class='btn btn-xs btn-info glyphicon glyphicon-volume-up' onclick=seaudio.play(\"" + (context.AudioCloudUrl || context.AudioUrl) + "\")> 播放</span></p>";
            }
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

    document.title = "第1周记录";
    getData(1);
})(jQuery)