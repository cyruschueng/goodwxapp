/*!
* artDialog 5 plugins
* Date: 2012-03-16
* https://github.com/aui/artDialog
* (c) 2009-2012 TangBin, http://www.planeArt.cn
*
* This is licensed under the GNU LGPL, version 2.1 or later.
* For details, see: http://creativecommons.org/licenses/LGPL/2.1/
*/

;(function ($) {

/**
 * 提示
 * @param   {String, HTMLElement}   提示内容
 * @param   {Number}                (可选) 提示时间
 * @param   {Function}              (可选) 回调函数
 */
$.tips = $.dialog.tips = function (content, time, callback) {
    return $.dialog({
        id: 'Tips',
        fixed: true,
        lock: true,
        title: 'loading',
        content: content === 'loading' ? '<div class="d-loading"></div>' : content,
        dbclickHide: false,
        time: time,
        initialize: function(){
            var tips = this;
            this.dom.title.hide();
            this.dom.close.hide();
            setTimeout(function(){
                tips.dom.close.show();
            },10000)
        },
        beforeunload: function(){
            this.dom.close.show();
            if(callback)callback();
        }
    });
};

/**
 * 警告
 * @param   {String, HTMLElement}   消息内容
 * @param   {Function}              (可选) 回调函数
 * @pramm opt {title: title,icon: true/false}  by zhiqiang
 */
$.alert = $.dialog.alert = function (content, callback, close, opt) {
    opt = opt || {};
    opt.title || (opt.title = '提示');
    typeof (opt.icon) == 'boolean' || (opt.icon = true);
    return $.dialog({
        id: 'Alert',
        fixed: true,
        lock: true,
        title: opt.title,
        content: [
            '<div class="dialog-panel">',
                '<table class="dialog-table">',
                    '<tr>',
                        '<td class="d-alert-content">',
                        content,
                        '</td>',
                    '</tr>',
                '</table>',
            '</div>'
        ].join(''),
        okValue:'关闭',
        ok: true,
        cancelValue:'关闭',
        cancel: close,
        initialize: function(){
            var self = this;
            $(document).one('keydown', function (e) {
                var target = e.target,
                    nodeName = target.nodeName,
                    rinput = /^input|textarea$/i,
                    api = artDialog.focus,
                    keyCode = e.keyCode;

                if (!api || rinput.test(nodeName) && target.type !== 'button') {
                    return;
                }
                if(keyCode === 13||keyCode === 32){
                    self.close();
                }
                return false;
            });
        },
        beforeunload: callback
    });
};


/**
 * 确认选择
 * @param   {String, HTMLElement}   消息内容
 * @param   {Function}              确定按钮回调函数
 * @param   {Function}              取消按钮回调函数
 */
$.confirm = $.dialog.confirm = function (content, ok, cancel, opt) {
    opt = opt || {};
    opt.title || (opt.title = '确认信息');
    typeof (opt.icon) == 'boolean' || (opt.icon = true);
    return $.dialog({
        id: 'Confirm',
        fixed: true,
        lock: true,
        title: opt.title,
        content: [
            '<div class="dialog-panel">',
                '<table class="dialog-table">',
                    '<tr>',
                        '<td class="d-alert-content">',
                        content,
                        '</td>',
                    '</tr>',
                '</table>',
            '</div>'
        ].join(''),
        okValue: opt.okValue || '确定',
        okClass:opt.okClass,
        cancelClass:opt.cancelClass,
        ok: function(){
            if(ok)ok();
        },
        cancelValue: opt.cancelValue || '取消',
        cancel: function(){
            if(cancel)cancel();
        }
    });
};


/**
 * 输入框
 * @param   {String, HTMLElement}   消息内容
 * @param   {Function}              确定按钮回调函数。函数第一个参数接收用户录入的数据
 * @param   {String}                输入框默认文本
 */
$.prompt = $.dialog.prompt = function (content, ok, defaultValue) {
    defaultValue = defaultValue || '';
    var input;
    
    return $.dialog({
        id: 'Prompt',
        fixed: true,
        lock: true,
        content: [
            '<div style="margin-bottom:5px;font-size:12px">',
                content,
            '</div>',
            '<div>',
                '<input type="text" class="d-input-text" value="',
                    defaultValue,
                '" style="width:18em;padding:6px 4px" />',
            '</div>'
            ].join(''),
        initialize: function () {
            input = this.dom.content.find('.d-input-text')[0];
            input.select();
            input.focus();
        },
        okValue:'确定',
        cancelValue:'取消',
        ok: function () {
            return ok && ok.call(this, input.value);
        },
        cancel: function () {}
    });
};


/** 抖动效果 */
$.dialog.prototype.shake = (function () {

    var fx = function (ontween, onend, duration) {
        var startTime = + new Date;
        var timer = setInterval(function () {
            var runTime = + new Date - startTime;
            var pre = runTime / duration;
                
            if (pre >= 1) {
                clearInterval(timer);
                onend(pre);
            } else {
                ontween(pre);
            };
        }, 13);
    };
    
    var animate = function (elem, distance, duration) {
        var quantity = arguments[3];

        if (quantity === undefined) {
            quantity = 6;
            duration = duration / quantity;
        };
        
        var style = elem.style;
        var from = parseInt(style.marginLeft) || 0;
        
        fx(function (pre) {
            elem.style.marginLeft = from + (distance - from) * pre + 'px';
        }, function () {
            if (quantity !== 0) {
                animate(
                    elem,
                    quantity === 1 ? 0 : (distance / quantity - distance) * 1.3,
                    duration,
                    -- quantity
                );
            };
        }, duration);
    };
    
    return function () {
        animate(this.dom.wrap[0], 40, 600);
        return this;
    };
})();


// 拖拽支持
var DragEvent = function () {
    var that = this,
        proxy = function (name) {
            var fn = that[name];
            that[name] = function () {
                return fn.apply(that, arguments);
            };
        };
        
    proxy('start');
    proxy('over');
    proxy('end');
};


DragEvent.prototype = {

    // 开始拖拽
    // onstart: function () {},
    start: function (event) {
        $(document)
        .bind('mousemove', this.over)
        .bind('mouseup', this.end);
            
        this.x = event.clientX;
        this.y = event.clientY;
        this.onstart(event.clientX, event.clientY);

        return false;
    },
    
    // 正在拖拽
    // onover: function () {},
    over: function (event) {		
        this.onover(
            event.clientX - this.x,
            event.clientY - this.y
        );
        
        return false;
    },
    
    // 结束拖拽
    // onend: function () {},
    end: function (event) {
        $(document)
        .unbind('mousemove', this.over)
        .unbind('mouseup', this.end);
        
        this.onend(event.clientX, event.clientY);
        return false;
    }
    
};

var $window = $(window),
    $document = $(document),
    html = document.documentElement,
    isIE6 = !('minWidth' in html.style),
    isLosecapture = !isIE6 && 'onlosecapture' in html,
    isSetCapture = 'setCapture' in html,
    dragstart = function () {
        return false
    };
    
var dragInit = function (event) {
    
    var dragEvent = new DragEvent,
        api = artDialog.focus,
        dom = api.dom,
        $wrap = dom.wrap,
        $title = dom.title,
        $main = dom.main,
        wrap = $wrap[0],
        title = $title[0],
        main = $main[0],
        wrapStyle = wrap.style,
        mainStyle = main.style;
        
        
    var isResize = event.target === dom.se[0] ? true : false;
    var isFixed = wrap.style.position === 'fixed',
        minX = isFixed ? 0 : $document.scrollLeft(),
        minY = isFixed ? 0 : $document.scrollTop(),
        maxX = $window.width() - wrap.offsetWidth + minX,
        maxY = $window.height() - wrap.offsetHeight + minY;
    
    
    var startWidth, startHeight, startLeft, startTop;
    
    
    // 对话框准备拖动
    dragEvent.onstart = function (x, y) {
    
        if (isResize) {
            startWidth = main.offsetWidth;
            startHeight = main.offsetHeight;
        } else {
            startLeft = wrap.offsetLeft;
            startTop = wrap.offsetTop;
        };
        
        $document.bind('dblclick', dragEvent.end)
        .bind('dragstart', dragstart);
            
        if (isLosecapture) {
            $title.bind('losecapture', dragEvent.end)
        } else {
            $window.bind('blur', dragEvent.end)
        };
            
        isSetCapture && title.setCapture();
        
        $wrap.addClass('d-state-drag');
        api.focus();
    };
    
    // 对话框拖动进行中
    dragEvent.onover = function (x, y) {
    
        if (isResize) {
            var width = x + startWidth,
                height = y + startHeight;
            
            wrapStyle.width = 'auto';
            mainStyle.width = Math.max(0, width) + 'px';
            wrapStyle.width = wrap.offsetWidth + 'px';
            
            mainStyle.height = Math.max(0, height) + 'px';
            
        } else {
            var left = Math.max(minX, Math.min(maxX, x + startLeft)),
                top = Math.max(minY, Math.min(maxY, y + startTop));

            wrapStyle.left = left  + 'px';
            wrapStyle.top = top + 'px';
        };
        
        
    };
    
    // 对话框拖动结束
    dragEvent.onend = function (x, y) {
    
        $document.unbind('dblclick', dragEvent.end)
        .unbind('dragstart', dragstart);
        
        if (isLosecapture) {
            $title.unbind('losecapture', dragEvent.end);
        } else {
            $window.unbind('blur', dragEvent.end)
        };
        
        isSetCapture && title.releaseCapture();
        
        $wrap.removeClass('d-state-drag');
    };
    
    
    dragEvent.start(event);
    
};


// 代理 mousedown 事件触发对话框拖动
$(document).bind('mousedown', function (event) {
    var api = artDialog.focus;
    if (!api) return;

    var target = event.target,
        config = api.config,
        dom = api.dom;
    
    if (config.drag !== false && target === dom.title[0]
    || config.resize !== false && target === dom.se[0]) {
        dragInit(event);
        
        // 防止firefox与chrome滚屏
        return false;
    };
});


}(this.art || this.jQuery));

