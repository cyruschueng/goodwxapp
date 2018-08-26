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
        url: "/game/doublenovember/server/info.ashx",
        type: "POST",
        dataType: "json",
        data: { 'pageindex': this.pageindex, 'pagesize': this.pagesize, 'orderby': '' + orderby + '','openid':''+$("#hfOpenID").val()+'','method': 'data' },
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
        url: "/game/doublenovember/server/info.ashx",
        type: "POST",
        dataType: "json",
        data: { 'pageindex': this.pageindex, 'pagesize': this.pagesize, 'orderby': '' + this.orderby + '', 'openid': '' + $("#hfOpenID").val() + '', 'method': 'data' },
        beforeSend: function () {
            $("#modal-progress").modal('show');
        },
        complete: function () {
            $("#modal-progress").modal('hide');
        },
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
//个人订单信息
Index.prototype.order = function () {
    $.ajax({
        url: "/game/doublenovember/server/info.ashx",
        type: "POST",
        dataType: "json",
        data: { 'openid': '' + $("#hfOpenID").val() + '', 'id': '' + $("#hfProductID").val() + '', 'method': 'order' },
        beforeSend: function () {
            $("#modal-progress").modal('show');
        },
        complete: function () {
            $("#modal-progress").modal('hide');
        },
        success: function (data) {
            if (!$.isEmptyObject(data.ds)) {
                
                $("#media-list").append(orderInfo(data.ds));
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
    $.each(data, function (i, context) {
        html += "<li class='media'>";
        html += "<div class='media-left' style='width:20%;'>";
        html += "<a href='javascript:void(0)'><img class='media-object' style='width:100%;' src='" + context.HeadimgUrl + "'  alt=''></a>";
        html += "</div>";
        html += "<div class='media-body'>";
        html += "<h5 style='color:rgb(0,52,255)'>" + context.NickName + "</h5>";
        html += "<p>" + context.Resume + "</p>";
        html += "<p><img class='img-thumbnail' src='" + context.ImgUrl + "?imageView2/w/200'  /></p>";
        html += "<p>";
        html += "<span class='bg btn-defaule glyphicon glyphicon-time'>" + context.Create_Date + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        html += "<span class='btn btn-success btn-xs glyphicon glyphicon-heart ' id='like" + context.ID + "'  onclick='like(" + context.ID + ")' > " + context.Like_Number + "</span>";
        html += "</p>";
        html += "</div>";
        html += "</li>";
    })
    return html;
}

var orderInfo = function (data) {
    var html = "";
    html += "<li class='media'>";
    html += "<div class='media-body'>";
    html += "<table class='table' >"
    $.each(data, function (i, context) {
        html += "<tr>";
        html += "<td>产品名称：</td>";
        html += "<td>亲子书法</td>";
        html += "</tr>";

        html += "<tr>";
        html += "<td>订单状态：</td>";
        html += "<td>" + context.SendName + "</td>";
        html += "</tr>";

        html += "<tr>";
        html += "<td>订购人：</td>";
        html += "<td>" + context.Name + "</td>";
        html += "</tr>";

        html += "<tr>";
        html += "<td>订购日期：</td>";
        html += "<td>" + context.OrderDate + "</td>";
        html += "</tr>";


        html += "<tr>";
        html += "<td>收货地址：</td>";
        html += "<td>" + context.ProvinceName + context.CityName + context.Address + "</td>";
        html += "</tr>";

        html += "<tr>";
        html += "<td>联系电话：</td>";
        html += "<td>" + context.TelePhone + "</td>";
        html += "</tr>";
    })
    html += "</table>"
    html += "</div>";
    html += "</li>";
    return html;
}
var parseDate = function (data) {
    if (data == "1900/1/1") {
        return "";
    }
    return data;
}