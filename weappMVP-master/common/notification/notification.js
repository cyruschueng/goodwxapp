const eb = require('../../lib/eventbus.js');

//注册全局事件监听
function subscribe(key, handler) {
    eb.eventbus.subscribe(key, handler);
}

// 注册全局事件监听
function bindSubscribe(key, handler, holder) {
    handler = handler.bind(holder);
    eb.eventbus.subscribe(key, handler);
}

//取消全局事件监听
function unSubscribe(key, handler) {
    eb.eventbus.unSubscribe(key, handler);
}

function post(key, data) {
    eb.eventbus.post(key, data);
}

module.exports = {
    bindSubscribe: bindSubscribe,
    subscribe: subscribe,
    unSubscribe: unSubscribe,
    post: post
};