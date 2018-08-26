$(function () {
    $("#area_city_ranking").click(function () {
        cityRanking();
    });
    $("#area_province_ranking").click(function () {
        provinceRanking()
    });
    $("#area_nationwide_ranking").click(function () {
        nationwideRanking();
    });
    nationwideRanking();
})
function ranking(type) {
    console.log($("#hfCity").val());
    $.ajax({
        url: "provide/ranking.ashx?method="+type,
        type: "post",
        dataType: "json",
        async: false,
        data: "openid=" + $("#hfOpenid").val().replace(/\+/g, '%2B') + "&activityid=" + $("#hfID").val() + "&top=20&city=" + $("#hfCity").val() + "&province=" + $("#hfProvince").val(),
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {
            $("#playerNumber").text(data.subtotal[0].Amount);
            loadranking(data, type);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            
        }
    });
};
function cityRanking() {
    ranking("city");
    var city = $("#hfCity").val();
    $("#curArea").text(city);
};
function provinceRanking() {
    ranking("province");
    var province = $("#hfProvince").val();
    $("#curArea").text(province);
};
function nationwideRanking() {
    ranking("nationwide")
    $("#curArea").text("全国");
};

function loadranking(data,type) {
    var tr = "";
    var area = "";
    if (!$.isEmptyObject(data.top20)) {
        $(".table tbody tr").remove();
        $.each(data.top20, function (index, context) {
            tr += "<tr>"
            if (context.RowIndex == 1) {
                tr += "<td style='width:20%; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><img class='rank' src='images/ranking1.png' ></td>";
            } else if (context.RowIndex == 2) {
                tr += "<td style='width:20%; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><img class='rank' src='images/ranking2.png'></td>";
            } else if (context.RowIndex == 3) {
                tr += "<td style='width:20%; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><img class='rank' src='images/ranking3.png'></td>";
            } else {
                tr += "<td style='width:20%; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='sn'>" + context.RowIndex + "." + "</span></td>";
            }
            tr += "<td style='width:20%; padding-left:0px; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><img  class='head' src='" + context.HeaderImgUrl + "' alt='' ></td>";
            tr += "<td style='width:40%; padding-left:0px; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='nickname'>" + context.NickName + "</span><span class='label label-primary' style='margin-top:10px;'> " + context.Score + " 分 / " + timeForamt(context.UsingTime) + "</span></td>";
            if (type == "city") {
                area = context.City;
            } else {
                area = context.Province;
            }
            tr += "<td style='width:20%; padding-left:0px; text-align:right; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='province'>" + area + "</span></td>";
            tr += "</tr>";
        });
    }
    if (!$.isEmptyObject(data.top) && data.top.length != 0) {
        var context = data.top[0];
        if (context.RowIndex > 50) {
            var pre = (context.RowIndex - 50);
            tr += "<tr><td colspan='4' style='text-align:center;border-bottom:1px solid #ddd; color:#C7254E'><h6 >你与前50名还差,加油！" + pre + "步</h6></td></tr>";

            tr += "<tr>"
            tr += "<td style='width:20%; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='sn'>" + context.RowIndex + "." + "</span></td>";
            tr += "<td style='width:20%; padding-left:0px; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><img  class='head' src='" + context.HeaderImgUrl + "' alt='' ></td>";
            tr += "<td style='width:40%; padding-left:0px; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='nickname'>" + context.NickName + "</span><span class='label label-primary' style='margin-top:10px;'> " + context.Score + " 分 / " + timeForamt(context.UsingTime) + "</span></td>";
            if (type == "city") {
                area = context.City;
            } else {
                area = context.Province;
            }
            tr += "<td style='width:20%; padding-left:0px; text-align:right; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='province'>" + area + "</span></td>";
            tr += "</tr>";
            if (!$.isEmptyObject(data.subtotal) && data.subtotal.length != 0) {
                var max = data.subtotal[0].Amount;
                tr += "<tr><td colspan='4' style='text-align:center;color:#23527C'><h6>你以超越" + (max - context.RowIndex) + "小伙伴</h6></td></tr>";
            }
        }
    }
    $(".table tbody").append(tr);
}
var timeForamt = function (timespan) {
    var t = timespan / 1000;
    return t + "秒";
}