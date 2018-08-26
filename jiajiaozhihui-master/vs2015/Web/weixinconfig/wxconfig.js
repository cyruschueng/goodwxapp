(function ($) {
    $.getJssdkConfig = function (options, fn) {
        var defaults = {
            url: ''
        };
        var opts = $.extend(defaults, options);
        var resultJson = {};
        var ajaxConfigData = {
            url: opts.url,
            type: 'POST',
            dataType: 'JSON',
            async: true,
            beforeSend: function () {
                config_beforeSend();
            },
            complete: function () {
                config_complete();
            },
            success: function (data) {
                fn(data);
            }
        };
        $.ajax(ajaxConfigData);
    };
    $.getJsPayConfig = function (options, fn) {
        var defaults = {
            url: ''
        };
        var opts = $.extend(defaults, options);
        var resultJson = {};
        var ajaxConfigData = {
            url: opts.url,
            type: 'POST',
            dataType: 'JSON',
            async: false,
            beforeSend: function () {
                pay_config_beforeSend();
            },
            complete: function () {
                pay_config_complete();
            },
            success: function (data) {
                fn(data);
            }
        };
        $.ajax(ajaxConfigData);
    };
    var totast = {
        info: function (msg) {
            if (msg == undefined || msg == '') {
                msg = "数据处理中";
            }
            var totast = '';
            totast += '<div id="payLoadingToast" class="weui_loading_toast" name="cccc" runat="server">';
            totast += '       <div class="weui_mask_transparent"></div>';
            totast += '       <div class="weui_toast">';
            totast += '           <div class="weui_loading">';
            totast += '               <div class="weui_loading_leaf weui_loading_leaf_0"></div>';
            totast += '               <div class="weui_loading_leaf weui_loading_leaf_1"></div>';
            totast += '               <div class="weui_loading_leaf weui_loading_leaf_2"></div>';
            totast += '               <div class="weui_loading_leaf weui_loading_leaf_3"></div>';
            totast += '               <div class="weui_loading_leaf weui_loading_leaf_4"></div>';
            totast += '               <div class="weui_loading_leaf weui_loading_leaf_5"></div>';
            totast += '               <div class="weui_loading_leaf weui_loading_leaf_6"></div>';
            totast += '               <div class="weui_loading_leaf weui_loading_leaf_7"></div>';
            totast += '               <div class="weui_loading_leaf weui_loading_leaf_8"></div>';
            totast += '               <div class="weui_loading_leaf weui_loading_leaf_9"></div>';
            totast += '               <div class="weui_loading_leaf weui_loading_leaf_10"></div>';
            totast += '               <div class="weui_loading_leaf weui_loading_leaf_11"></div>';
            totast += '           </div>';
            totast += '           <p class="weui_toast_content">' + msg + '</p>'
            totast += '       </div>'
            totast += '</div>';
            return totast;
        },
        show: function (msg) {
            $(document.body).append(this.info(msg));
        },
        hidde: function () {
            $("#payLoadingToast").remove();
        }
    }
    function config_beforeSend() {
        totast.show();
    };
    function config_complete() {
        totast.hidde();
    };
    function config_success(data) {
        return data;
    };

    function pay_config_beforeSend() {
        totast.show();
    };
    function pay_config_complete() {
        totast.hidde();
    };
    function pay_config_success(data) {
        return data;
    };

})(jQuery)