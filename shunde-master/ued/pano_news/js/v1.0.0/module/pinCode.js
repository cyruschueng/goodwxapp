/**
 * @description: PIN码
 * @author: xiaoran(804785854@qq.com)
 * @update:
 */
define('module/pinCode', [], function () {

    var pinCode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        pinLength = 6;

    return {
        /**
         * 展示
         */
        show: function(call){
            var self = this,
                i = null,
                pinCodeHtmlArr = [
                    '<div class="pincode-warp">',
                        '<div class="pincode-title">',
                            '<span class="f24">输入PIN码</span>',
                    '</div>',
                    '<div class="pincode-view">'
                ],
                randKey = self.randArray(pinCode);

            for (i = 1; i <= pinLength; i++) {
                pinCodeHtmlArr.push('<span class="pincode' + i + '">*</span>');
            }
            pinCodeHtmlArr.push('</div><div class="pincode-key">');
            for (i = 0; i < 10; i++) {
                pinCodeHtmlArr.push('<div class="key-warp"><span class="key-num btn-default">' + randKey[i] + '</span></div>');
                if (i == 8) {
                    pinCodeHtmlArr.push('<div class="key-warp"><span class="key-opt btn-default btn-gray key-opt-goback"><i class="icon icon-goback"></i></span></div>');
                }
            }
            pinCodeHtmlArr.push('<div class="key-warp"><span class="key-opt btn-default btn-yellow key-opt-ok">确定</span></div>');
            pinCodeHtmlArr.push('</div></div>');

            $.dialog({
                id: 'Tips',
                fixed: true,
                lock: true,
                title: '输入Pin码',
                content: pinCodeHtmlArr.join(''),
                dbclickHide: true,
                initialize: function () {
                    var THIS_dialog = this;
                    THIS_dialog.dom.title.hide();
                    /**
                     * 回退
                     */
                    $(".key-opt-goback").on("click", function () {
                        var pincodeViews = $(this).parents(".pincode-warp").children(".pincode-view");
                        $("span.hover:last", pincodeViews).removeClass("hover");
                    });
                    /**
                     * 确认
                     */
                    $(".key-opt-ok").on("click", function () {
                        var pinCodeInputs = [],
                            hoverPins = $(".pincode-view span.hover", $(this).parents(".pincode-warp"));
                        for (i = 0; i < hoverPins.length; i++) {
                            pinCodeInputs.push(hoverPins.eq(i).attr("singel-val"));
                        }
                        if (pinCodeInputs.length == pinLength) {
                            THIS_dialog.close();
                            call && call(pinCodeInputs.join(""));
                        } else {
                            $.alert("请输入" + pinLength + "位PIN码！");
                        }
                    });
                    /**
                     * 输入
                     */
                    $('.key-num').on("click", function () {
                        var pinCodeViews = $(this).parents(".pincode-warp").children(".pincode-view");
                        if ($("span.hover", pinCodeViews).length < pinLength) {
                            var viewSpan = $(".pincode" + ($("span.hover", pinCodeViews).length + 1), pinCodeViews);
                            $(viewSpan).addClass("hover");
                            $(viewSpan).attr("singel-val", $(this).text());
                        }
                    });
                },
                beforeunload: function () {
                }
            });
        },
        /**
         * 随机排列数组元素
         */
        randArray: function (data) {
            var arrLen = data.length,//获取数组长度
                try1 = [],//创建数组 存放下标数
                try2 = [],//创建数组 生成随机下标数
                try3 = [],//创建数组 生成对应随机下标数的数组
                i = null;

            for (i = 0; i < arrLen; i++) {
                try1[i] = i;
            }
            for (i = 0; i < arrLen; i++) {
                try2[i] = try1.splice(Math.floor(Math.random() * try1.length), 1);
            }
            for (i = 0; i < arrLen; i++) {
                try3[i] = data[try2[i]];
            }
            return try3;
        }
    };
});
