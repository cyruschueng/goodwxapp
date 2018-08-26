/*
* 计数器jQuery插件
* Copyright: Leepy
* Update: 2010-09-22
* Home:   http://www.cnblogs.com/liping13599168/
*/

(function($) {

    function Counter() {
        /* 计数器默认配置 */
        this._defaults = {
            pattern: 'down',    // 可选择参数：'up', 'down'；默认方式为减计数
            totalTime: 3600,    // 总共需要多少时间，单位为秒
            until: null,        // 默认直到日期的配置
            onInterval: null,   // 间隔时间回调函数
            onStop: null        // 结束时回调函数
        }
    }

    var DATA_NAME = 'data_counter';

    $.extend(Counter.prototype, {
        /* 共享所有的timer */
        _timer: setInterval(function() { $.counter._updateTargets(); }, 900),
        /* 当前激活的timer列表 */
        _timerTargets: [],
        /* 更新每一个绑定的目标计数器 */
        _updateTargets: function() {
            for (var i = 0, length = this._timerTargets.length; i < length; i++) {
                this._updateCounter(this._timerTargets[i]);
            }
        },
        /* 绑定计数器 */
        _attachCounter: function(target, options) {
            var inst = { options: $.extend({ 'from': new Date() }, options) };
            $.data(target, DATA_NAME, inst);
            this._changeCounter(target);
        },
        /* 重置计数器 */
        _changeCounter: function(target) {
            this._addTarget(target);
            this._updateCounter(target);

        },
        /* 重新显示计数器 */
        _updateCounter: function(target) {

            var remainTime = this._getTime(target);
            if (remainTime) {
                //回调函数调用
                var inst = $.data(target, DATA_NAME);
                if (remainTime >= 0) {
                    var time = this._getFormatTime(remainTime);
                    $(target).html(time);

                    var onInterval = this._get(inst, 'onInterval');
                    if (onInterval) {
                        onInterval.apply(target, [remainTime]);
                    }
                }
                else {
                    remainTime = 0;
                    var time = this._getFormatTime(remainTime);
                    $(target).html(time);

                    var onStop = this._get(inst, 'onStop');
                    if (onStop) {
                        onStop.apply(target, []);
                        this._removeTarget(target);
                    }
                }
            }

        },
        /* 暂停计数器 */
        _pauseCounter: function(target) {
            var inst = $.data(target, DATA_NAME);
            if (inst) {
                var pauseTime = new Date();
                $.extend(inst.options, { 'pauseTime': pauseTime });
                $.data(target, DATA_NAME, inst);
                this._removeTarget(target);
            }
        },
        /* 重新启动计数器 */
        _resumeCounter: function(target) {
            var inst = $.data(target, DATA_NAME);
            if (inst) {
                var nowDate = new Date();
                var pauseTime = this._get(inst, 'pauseTime');
                var from = this._get(inst, 'from');
                if (pauseTime) {
                    var fromTime = new Date(from.getTime() + (nowDate.getTime() - pauseTime.getTime()));
                    $.extend(inst.options, { 'from': fromTime });
                    $.data(target, DATA_NAME, inst);
                    this._changeCounter(target);
                }
            }
        },
        /* 获取当前计数器的时间秒数 */
        _getTime: function(target) {
            var inst = $.data(target, DATA_NAME);
            if (inst) {
                var pattern = this._get(inst, 'pattern');
                if (pattern == 'down') {
                    var totalTime = this._get(inst, 'totalTime');
                    var from = this._get(inst, 'from');
                    var nowDate = new Date();
                    var remainTime = parseInt((totalTime * 1000 - (nowDate.getTime() - from.getTime())) / 1000);
                    return remainTime;
                }
                else if (pattern == 'up') {
                    var from = this._get(inst, 'from');
                    var nowDate = new Date();
                    var remainTime = parseInt((nowDate.getTime() - from.getTime()) / 1000);
                    return remainTime;
                }
            }
            return null;
        },
        /* 获取格式化的时间 */
        _getFormatTime: function(remainTime) {
            var hour = parseInt(remainTime / 3600);
            var min = parseInt(remainTime / 60) % 60;
            var second = remainTime % 60;
            var time = this._stringFormat('{0}:{1}:{2}',
                    (hour < 10 ? '0' + hour : hour),
                    (min < 10 ? '0' + min : min),
                    (second < 10 ? '0' + second : second));
            return time;
        },
        /* 从配置中获取指定名称的值 */
        _get: function(inst, name) {
            return inst.options[name] != null ? inst.options[name] : $.counter._defaults[name];
        },
        /* 添加到目标计数器列表中 */
        _addTarget: function(target) {
            if (!this._hasTarget(target)) this._timerTargets.push(target);
        },
        /* 是否已经包含在目标计数器列表中 */
        _hasTarget: function(target) {
            return ($.inArray(target, this._timerTargets) > -1);
        },
        /* 移除指定目标计数器 */
        _removeTarget: function(target) {
            this._timerTargets = $.map(this._timerTargets, function(o) { return (o == target ? null : o); });
        },
        //string格式化构造器
        _stringFormat: function(str) {
            var args = arguments;
            return str.replace(/\{(\d+)\}/g,
                function(m, i) {
                    return args[parseInt(i) + 1];
                });
        }
    });

    /* 主函数 */
    $.fn.counter = function(options) {
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function() {
            if (typeof options == 'string') {
                $.counter['_' + options + 'Counter'].apply($.counter, [this].concat(args));
            }
            else {
                $.counter._attachCounter(this, options);
            }
        });
    };
    /* 获取计时器当前时间（总秒数） */
    $.fn.getTime = function() {
        var args = Array.prototype.slice.call(arguments, 1);
        if (this.length == 1) {
            return $.counter['_getTime'].apply($.counter, [this[0]].concat(args));
        }
        else if (this.length > 1) {
            var array = [];
            this.each(function() {
            var time = $.counter['_getTime'].apply($.counter, [this].concat(args));
                if (time) {
                    array.push(time);
                }
            });
            return array;
        }
        return null;
    };

    $.counter = new Counter();

})(jQuery);