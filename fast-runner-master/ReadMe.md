### 微信小游戏编码规范

#### 事件派发

监听事件

~~~
// 方式1 （需要手动移除监听）
// addCustomListener: function (eventName, callback)
cc.eventManager.addCustomListener('event-name', function(event) {
	var data = event.getUserData();
});

// 方式2 （当传入参数是node时，时间监听的生命周期同node绑定）
// addListener: function (listener, nodeOrPriority)
var eventListener = cc.EventListener.create({
    event: cc.EventListener.CUSTOM,
    eventName : 'say-hello',
    callback : function(event) {
    	var data = event.getUserData();
    },
});
cc.eventManager.addListener(eventListener, this.node);
~~~

事件派发

~~~
cc.eventManager.dispatchCustomEvent('event-name', {msg : 'test'});
~~~


### 发布流程

#### 1.修改远程服务器地址

在`game.js`中将

    wxDownloader.REMOTE_SERVER_ROOT = "";
改为

    wxDownloader.REMOTE_SERVER_ROOT = "https://pdkqn.nalrer.cn/pdk";