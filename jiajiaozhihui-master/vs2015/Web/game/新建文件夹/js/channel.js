/**
* Channel.js: Browser support for multipage communication
* 
* @author Kyriosli
*/
var channel = function (entry) {
    var listeners = {};

    if (/MSIE 8/.test(navigator.userAgent)) {
        window.attachEvent('storage', function () {
            // TODO: ie8 support
        });
    } else {
        window.addEventListener('storage', function (e) {
            if (e.newValue !== null && /^channel\.(.+)/.test(e.key)) {
                broadcast(RegExp.$1, e.newValue);
            }
        });
    }

    function broadcast(channelName, str) {
        if (channelName in listeners) {
            var value = JSON.parse(str);
            for (var i = 0, arr = listeners[channelName], L = arr.length; i < L; i++) {
                try {
                    arr[i](value);
                } catch (e) {
                    console.error(e.stack);
                }
            }
        }
    }

    return {
        /**
        * 发布数据到其它页面
        * 
        * @param name
        *            命名空间名称
        * @param value
        *            要发布的数据
        * @returns this
        */
        post: function (name, value) {
            entry["channel." + name] = JSON.stringify(value);
            setTimeout(function () {
                entry.removeItem("channel." + name);
            }, 0);
            return this;
        },
        /**
        * 注册监听器
        * 
        * @param name
        *            要监听的命名空间
        * @param callback
        *            回调函数
        * @returns this
        */
        on: function (name, callback) {
            if (name in listeners) {
                listeners[name].push(callback);
            } else {
                listeners[name] = [callback];
            }
            return this;
        },
        /**
        * 取消监听器
        * 
        * @param name
        *            要取消监听的命名空间
        * @param callback
        *            回调函数，如果为空，则取消所有监听函数
        * @returns this
        */
        off: function (name, callback) {
            var arr = listeners[name];
            if (arr) {
                if (!callback) {
                    delete listeners[name];
                } else {
                    var i = arr.length;
                    while (i--) {
                        if (arr[i] === callback) {
                            arr.splice(i, 1);
                        }
                    }
                }
            }
            return this;
        }
    };
} (localStorage);