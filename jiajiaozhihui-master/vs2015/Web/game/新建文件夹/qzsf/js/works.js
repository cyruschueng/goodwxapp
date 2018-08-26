$(function () {
    var index = new Index(1, 10);
    index.latest("isnull(Stick,0) desc,a.id desc");
    $("#next").click(function () {
        index.next();
    });
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
        url: "./server/index.ashx",
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
        url: "./server/index.ashx",
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

//myLike当前用户的点赞数据
var loadData = function (data) {
    var html = "";
    $.each(data, function (i, context) {
        html += "<li class='media'>";
        html += "<div class='media-left' style='width:20%;'>";
        html += "<a href='javascript:void(0)'><img  class='media-object' style='width:100%;' src='" + context.HeadimgUrl + "'  alt=''></a>";
        html += "<div class='owner'>";
        html += "<div style='padding:2px 0'><span class='label  label-success' >" + context.Owner + "作品</span></div>"; //是谁的作品，是成人，还是孩子
        if (context.Owner != "成人") {
            html += "<div style='padding:2px 0'><span class='glyphicon glyphicon-user' ></span><span >6岁</span></div>";
        }
        html += "<div style='padding:2px 0'><span class='glyphicon glyphicon-map-marker' ></span><span >深圳市</span></div>";
        html += "<div style='padding:2px 0'><span >练功11天</span></div>";
        html += "</div>";
        html += "</div>";
        html += "<div class='media-body'>";
        html += "<h5 style='color:rgb(0,52,255)'>" + context.NickName + "</h5>";
        html += "<p>" + context.Resume + "</p>";
        html += "<p><img    id='img" + context.ID + "'  class='img-thumbnail privewimg'  src='" + context.ImgUrl + "?imageView2/w/100'  /></p>";
        html += "<p>";
        html += "<span class='bg btn-defaule glyphicon glyphicon-time'>" + context.Create_Date + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        html += "</p>";
        html += headerList(data);
        html += "</div>";
        html += "</li>";
    })
    return html;
}
/*头像列表*/
var headerList = function (data) {
    var html = "";
    if (data.length != 0) {
        html += "<div class='row'>";
        $.each(data, function (index, context) {
            html += "   <div class='col-xs-1'>";
            html += "       <img class='img-rounded' src='" + context.HeadimgUrl + "'>";
            html += "   </div>";
        });
        html += "</div>"
    }
    return html;
}
/*评论*/
var comment = function (data) { 
    
};