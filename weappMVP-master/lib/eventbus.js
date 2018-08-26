/**
 * 事件总线: 用于页面间对象与消息的通知和传递
 * 订阅事件:
 *    onLoad: function() {
 *      getApp().globalData.eventbus.subscribe(key, function(){});
 *    }
 *
 * 发送事件
 *    getApp().globalData.eventbus.post(key, data);
 *
 * 接触订阅
 *    onUnLoad(): function() {
 *      getApp().globalData.eventbus.unSubscribe(key, function(){});
 *    }
 */
class EventBus {
    constructor() {
        this.EventBusCache = {
            $uid: 0
        };
    }

    // 订阅事件
    subscribe(type, handler) {
        let cache = this.EventBusCache[type] || (this.EventBusCache[type] = {});

        handler.$uid = handler.$uid || this.EventBusCache.$uid++;
        cache[handler.$uid] = handler;
    }

    // 发送事件
    post(type, ...param) {
        let cache = this.EventBusCache[type],
            key,
            tmp;

        if (!cache) return;

        for (key in cache) {
            tmp = cache[key];
            cache[key].call(this, ...param);
        }
    }

    // 解除订阅
    unSubscribe(type, handler) {
        let counter = 0,
            $type,
            cache = this.EventBusCache[type];

        if (handler == null) {
            if (!cache) return true;
            return !!this.EventBusCache[type] && (delete this.EventBusCache[type]);
        } else {
            !!this.EventBusCache[type] && (delete this.EventBusCache[type][handler.$uid]);
        }

        for ($type in cache) {
            counter++;
        }

        return !counter && (delete this.EventBusCache[type]);
    }
}

module.exports.eventbus = new EventBus();