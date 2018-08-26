$(function () {
    (function ($) {
        var data = {
            gold: function () {
                this.initData('金币', '亲子书法')
            },
            diamond: function () {
                this.initData('钻石', '亲子书法')
            },
            initData: function (type, item) {
                var $this = this;
                $.ajax({
                    url: './server/index.ashx?type=' + type + '&item=' + item,
                    type: 'POST',
                    dataType: 'JSON',
                    success: function (data) {
                        $this.fillData(data);
                    }
                })
            },
            fillData: function (data) {
                if (!jQuery.isEmptyObject(data.ds)) {
                    $("#detail").empty();
                    $.each(data.ds, function (index, context) {
                        var html = "";
                        html += '<div class="col-xs-6" style=" padding-top:5px; ">\r\n';
                        html += '    <a href="detail.aspx?id=' + context.Id + '">\r\n';
                        html += '       <div class=" thumbnail">\r\n';
                        html += '             <img   src="' + context.Image + '" alt="">\r\n';
                        html += '             <div classs="weui_media_desc">' + context.Describe + '</div>\r\n';
                        html += '             <div><span  style=" color:#f00">' + context.Quantity + context.Type + '</span></div>\r\n';
                        html += '       </div">\r\n';
                        html += '     </a>\r\n';
                        html += '</div>\r\n';
                        $("#detail").append(html);
                    })
                }
            }
        }
        data.gold();
        $(document).on('click', "#selectGold", function () {
            data.gold();
            $(this).addClass("weui_bar_item_on").siblings("a").removeClass("weui_bar_item_on");
            $(this).siblings("a").find(".weui_tabbar_label").addClass("unselected");
            $(this).find(".weui_tabbar_label").removeClass("unselected");
        })
        $(document).on('click', '#selectDiamond', function () {
            data.diamond();
            $(this).addClass("weui_bar_item_on").siblings("a").removeClass("weui_bar_item_on");
            $(this).siblings("a").find(".weui_tabbar_label").addClass("unselected");
            $(this).find(".weui_tabbar_label").removeClass("unselected");
        })

    })(jQuery)
})
