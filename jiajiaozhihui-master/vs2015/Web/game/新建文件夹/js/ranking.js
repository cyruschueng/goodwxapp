$(function () {
    $("#area_city_ranking").click(function () {
        $("#area_city_ranking").attr("style", "border-bottom:3px solid #fff");
        $("#area_province_ranking").removeAttr("style");
        $("#area_nationwide_ranking").removeAttr("style");
        ranking("city");
        getPlayersNumber("city");
    });
    $("#area_province_ranking").click(function () {
        $("#area_city_ranking").removeAttr("style");
        $("#area_province_ranking").attr("style", "border-bottom:3px solid #fff");
        $("#area_nationwide_ranking").removeAttr("style");
        ranking("province");
        getPlayersNumber("province");
    });
    $("#area_nationwide_ranking").click(function () {
        $("#area_city_ranking").removeAttr("style");
        $("#area_province_ranking").removeAttr("style");
        $("#area_nationwide_ranking").attr("style", "border-bottom:3px solid #fff");
        ranking("nationwide");
        getPlayersNumber("nationwide");
    });
    ranking("city");
    getPlayersNumber("city");
    $("#area_city_ranking").attr("style", "border-bottom:3px solid #fff");
})
function ranking(type) {
    $.ajax({
        url: "../provide/ranking.ashx",
        type: "post",
        dataType: "json",
        async: false,
        data: "openid=" + $("#hfOpenid").val().replace(/\+/g, '%2B') + "&activityid=" + $("#hfID").val() + "&type=" + type,
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {
            
            loadranking(data, type);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}

function loadranking(data,type) {
    var tr = "";
    var area = "";
    if (!$.isEmptyObject(data.top20)) {
        $(".table tbody tr").remove();
	$("#cityName").text("全国");
        $.each(data.top20, function (index, context) {
            tr += "<tr>"
            if (context.RowIndex == 1) {
                tr += "<td style='width:20%; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><img class='rank' src='../images/ranking1.png' ></td>";
            } else if (context.RowIndex == 2) {
                tr += "<td style='width:20%; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><img class='rank' src='../images/ranking2.png'></td>";
            } else if (context.RowIndex == 3) {
                tr += "<td style='width:20%; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><img class='rank' src='../images/ranking3.png'></td>";
            } else {
                tr += "<td style='width:20%; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='sn'>" + context.RowIndex + "." + "</span></td>";
            }
            tr += "<td style='width:20%; padding-left:0px; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><img  class='head' src='" + context.HeaderImgUrl + "' alt='' ></td>";
            tr += "<td style='width:40%; padding-left:0px; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='nickname'>" + context.NickName + "</span><span class='label label-primary' style='margin-top:10px;'>等级 " + context.GradeName + "</span></td>";
            if (type == "city") {
                area = context.City;
                $("#cityName").text(area);
            } else {
                area = context.Province;
		if(type=="province"){
			$("#cityName").text(area);
		}else{
			
		}
                
            }
            tr += "<td style='width:20%; padding-left:0px; text-align:right; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='province'>" + area + "</span></td>";
            tr += "</tr>";
        });
    }
    if (!$.isEmptyObject(data.top) && data.top.length != 0) {
        var context=data.top[0];
        if (context.RowIndex > 20) {
            var pre = (context.RowIndex - 20);
            tr += "<tr><td colspan='4' style='text-align:center;border-bottom:1px solid #ddd;color:#C7254E'><h6 >你与前20名还差" + pre + "步,加油！</h6></td></tr>";

            tr += "<tr>"
            tr += "<td style='width:20%; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='sn'>" + context.RowIndex + "." + "</span></td>";
            tr += "<td style='width:20%; padding-left:0px; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><img  class='head' src='" + context.HeaderImgUrl + "' alt='' ></td>";
            tr += "<td style='width:40%; padding-left:0px; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='nickname'>" + context.NickName + "</span><span class='label label-primary' style='margin-top:10px;'>等级 " + context.GradeName + "</span></td>";
            if (type == "city") {
                area = context.City;
            } else {
                area = context.Province;
            }
            tr += "<td style='width:20%; padding-left:0px; text-align:right; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='province'>" + area + "</span></td>";
            tr += "</tr>";
            if (!$.isEmptyObject(data.subtotal) && data.subtotal.length != 0) {
                var max = data.subtotal[0].Amount;
                tr += "<tr><td colspan='4' style='text-align:center;color:#23527C'><h6 >你已超越" + (max - context.RowIndex) + "小伙伴</h6></td></tr>";
            }
        }
    }
    $(".table tbody").append(tr);
}
function getPlayersNumber(type) {
    var openid = $("#hfOpenid").val().replace(/\+/g, '%2B');
    var item = $("#hfID").val();

    $.get('../provide/playersNumber.ashx', { item: item, type: type, openid: openid }, function (results) {
        $("#playersNumber").text(+results+1000);
    })
    
}
