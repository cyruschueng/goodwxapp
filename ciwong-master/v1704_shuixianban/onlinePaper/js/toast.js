(function($) {
    "use strict";

    var showweui = function(html, className) {
        className = className || "";
        var tpl = '<div class="weui_toast ' + className + '">' + html + '</div>';
        $('<div class="weui_masktransparent"></div>').appendTo(document.body);
        var dialog = $(tpl).appendTo(document.body);
        dialog.addClass("weui_toast_visible");
        dialog.show();
    };

    var hide = function(callback) {
        $(".weui_masktransparent").remove();
        $(".weui_toast").remove();
        $(".weui_toast").removeClass("weui_toast_visible").transitionEnd(function() {
            var $this = $(this);
            console.log($this);
            $this.remove();
            callback && callback($this);
        });
    };

    $.toast = function(text, style, callback) {
        if (typeof style === "function") {
            callback = style;
        }
        var className;
        if (style === "cancel") {
            className = "weui_toast_cancel";
        } else if (style === "forbidden") {
            className = "weui_toast_forbidden";
        } else if (style === "text") {
            className = "weui_toast_text";
        }
        showweui('<i class="weui_icon_toast"></i><p class="weui_toast_content">' + (text || "已经完成") + '</p>', className);

        setTimeout(function() {
            hide(callback);
        }, toastDefaults.duration);
    };

    $.showLoading = function(text) {
        var html = '<div class="weui_loading">';
        for (var i = 0; i < 12; i++) {
            html += '<div class="weui_loading_leaf weui_loading_leaf_' + i + '"></div>';
        }
        html += '</div>';
        html += '<p class="weui_toast_content">' + (text || "数据加载中") + '</p>';
        showweui(html, 'weui_loading_toast');
    };

    $.hideLoading = function() {
        hide();
    };

    var toasttoastDefaults = $.toast.prototype.defaults = {
        duration: 2000
    };

})($);