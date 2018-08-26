/**
 * Created by kHRYSTAL on 17/11/28.
 */
//注册全局事件监听
function subscribe(key, handler) {
}

function bindSubscribe(key, handler, holder) {
}

//取消全局事件监听
function unSubscribe(key, handler) {
}

function post(key, data) {
}

module.exports = {
    subscribe: subscribe,
    unSubscribe: unSubscribe,
    post: post,
    bindSubscribe: bindSubscribe
}