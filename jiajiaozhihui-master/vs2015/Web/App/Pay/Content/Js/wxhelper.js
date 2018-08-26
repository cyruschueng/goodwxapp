(function ($) {
    
    /*获取参数*/
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    };
    function wxconfig(res) {
        wx.config({
            debug: false,
            appId: res.info.jsSdk.appId,
            timestamp: res.info.jsSdk.timestamp,
            nonceStr: res.info.jsSdk.nonceStr,
            signature: res.info.jsSdk.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay']
        });
    }
    
    $.wx = {
        configRegist: function () {
            var def = $.Deferred();
            //var url = 'http://weixin.jiajiaozhihui.cn/app/appstart/share/Resolver.ashx';
            var url = 'http://161s5g6007.51mypc.cn/app/appstart/share/Resolver.ashx';
            var p = getQueryString("o");
            var data = { o: p, url: window.location.href };
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                dataType: 'JSON',
                success: function (res) {
                    wxconfig(res);
                    def.resolve(res);
                }
            });
            return def;
        },
        httpGet: function (url, data,type) {            
            var def = $.Deferred();
            $.ajax({
                url: url,
                data: data,
                type: "GET",
                dataType: (type == '' || type == null || type == undefined) ? 'JSON' : type,
                success: function (res) {
                    def.resolve(res);
                }
            });
            return def;
        },
        httpPost: function (url, data,type) {
            var def = $.Deferred();
            $.ajax({
                url: url,
                data: data,
                type: "POST",
                dataType: (type == '' || type == null || type==undefined) ? 'JSON' : type,
                success: function (res) {
                    def.resolve(res);
                }
            });
            return def;
        },
        showLoadding: function (tip) {
            var toastHtml = '<div id="wxloadingToast" class="weui_loading_toast" >' +
                '<div class="weui_mask_transparent"></div>' +
                '<div class="weui_toast">' +
                '<div class="weui_loading">' +
                '<div class="weui_loading_leaf weui_loading_leaf_0"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_1"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_2"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_3"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_4"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_5"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_6"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_7"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_8"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_9"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_10"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_11"></div>' +
                '</div>' +
                '<p class="weui_toast_content">数据加载中</p>' +
                '</div>' +
                '</div>';
            var toast = $(toastHtml);
            if (tip != undefined && tip != '') {
                toast.find("p").text(tip);
            }
            toast.remove();
            toast.appendTo("body");
        },
        hideLoadding: function () {
            var toast = $("#wxloadingToast");
            toast.remove();
        }
    };
})(jQuery)
