(function ($) {
    var ranking = $("#hfRanking").val();
    if (ranking != "") {
        var data = $.parseJSON(ranking);
        show(data);
    }
    function show(data) {
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
                tr += "<td style='width:40%; padding-left:0px; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='nickname'>" + nameFormat(context.NickName) + "</span><span class='label label-primary' style='margin-top:10px;'> " + context.Score + " 分 / " + timeForamt(context.UsingTime) + "</span></td>";
                tr += "<td style='width:20%; padding-left:0px; text-align:right; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='province'>" + areaFormat(context.Province) + "</span></td>";
                tr += "</tr>";
            });
        }
        if (!$.isEmptyObject(data.top) && data.top.length != 0) {
            console.log(data.top);
            var context = data.top[0];
            if (context.RowIndex > 50) {
                var pre = (context.RowIndex - 50);
                tr += "<tr><td colspan='4' style='text-align:center;border-bottom:1px solid #ddd; color:#C7254E'><h6 >你与前50名还差,加油！" + pre + "步</h6></td></tr>";

                tr += "<tr>"
                tr += "<td style='width:20%; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='sn'>" + context.RowIndex + "." + "</span></td>";
                tr += "<td style='width:20%; padding-left:0px; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><img  class='head' src='" + context.HeaderImgUrl + "' alt='' ></td>";
                tr += "<td style='width:40%; padding-left:0px; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='nickname'>" + nameFormat(context.NickName) + "</span><span class='label label-primary' style='margin-top:10px;'>" + context.Score + " 分 / " + timeForamt(context.UsingTime) + "</span></td>";
                tr += "<td style='width:20%; padding-left:0px; text-align:right; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='province'>" + areaFormat(context.Province) + "</span></td>";
                tr += "</tr>";
                if (!$.isEmptyObject(data.subtotal) && data.subtotal.length != 0) {
                    var max = data.subtotal[0].Amount;
                    tr += "<tr><td colspan='4' style='text-align:center;color:#23527C'><h6>你以超越" + (max - context.RowIndex) + "小伙伴</h6></td></tr>";
                }
            }
        }
        $(".table tbody").append(tr);
        function timeForamt(timespan) {
            var t = timespan / 100;
            return t + "秒";
        }
        function areaFormat(area) {
            if (area.length > 3) {
                return area.substring(0, 3) + "...";
            }
            return area;
        }
        function nameFormat(name) {
            if (name.length > 5) {
                return name.substring(0, 5) + "...";
            }
            return name;
        }
    }
})(jQuery)