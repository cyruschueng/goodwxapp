/**
 * API 
 * 
 * 1. 凡是一 wx.on 开头的事件接口，一般情况下接受一个对象作为参数，里面包含
 *  success: Function, 可选, 成功回调
 *  fail: Function, 可选, 失败回调
 *  complete: Function, 可选，接口调用结束回调(无论成功，失败都会被调用)
 * 
 * 2. networkApis: 网络相关
 * 
 * 3. mediaApis: 媒体相关
 * 
 * 4. fileApis: 文件相关
 * 
 * 5. storageApis: 本地数据缓存相关
 * 
 * 6. locationApis: 位置相关
 * 
 * 7. deviceApis: 设备相关
 * 
 * 8. uiApis: 页面相关
 * 
 * 9. wxmlApis: 元素相关
 * 
 * 10. openApis: 开放给用户接口相关
 */

// 1. 网络API
var networkApis = {
  // wx.request, 发起网络请求
  // wx.uploadFile
  // wx.downloadFile
  // wx.connectSocket，创建WebSocket连接
  // wx.onSocketOpen，监听WebSocket打开
  // wx.onSocketError
  // wx.sendSocketMessage, 发送WebSocket消息
  // wx.onSocketMessage，接受WebSocket消息
  // wx.closeSocket
  // wx.onSocketClose, 监听WebSocket关闭
}

var mediaApis = {
  // wx.chooseImage, 从相册选择图片或拍照
  // wx.previewImage
  // wx.startRecord，开始录音
  // wx.stopRecord
  // wx.playVoice, 播放录音
  // wx.pauseVoice
  // wx.stopVoice，结束播放录音
  // wx.getBackgroundAudioPlayerState，获取音乐播放状态
  // wx.pauseBackgroundAudio
  // wx.seekBackgroundAudio, 控制音乐播放进度
  // wx.stopBackgroundAudio
  // wx.onBackgroundAudioPlay，监听音乐开始播放
  // wx.onBackgroundAudioPause，监听音乐暂停
  // wx.onBackgroundAudioStop, 监听音乐结束
  // wx.chooseVideo，从相册选择视频或拍摄
}

var fileApis = {
  // wx.saveFile
  // wx.getSavedFileList
  // wx.getSavedFileInfo
  // wx.removeSavedFile
  // wx.openDocument
}

// 本地数据缓存 apis
var storageApis = {
  // wx.getStorage
  // wx.getStorageSync
  // wx.setStorage
  // wx.setStorageSync
  // wx.getStorageInfo
  // wx.getStorageInfoSync
  // wx.removeStorage
  // wx.removeStorageSync
  // wx.clearStorage
  // wx.clearStorageSync
}

var locationApis = {
  // wx.getLocation, 获取当前位置
  // wx.chooseLocation, 打开地图选择位置
  // wx.openLocation, 打开内置地图
  // wx.createMapContext, 地图组件控制
}

var deviceApis = {
  // wx.getNetworkType
  // wx.onNetworkStatusChange
  // wx.getSystemInfo
  // wx.getSystemInfoSync
  // wx.onAccelerometerChange, 监听加速度数据
  // wx.startAccelerometer，开始监听加速度数据
  // wx.stopAccelerometer
  // wx.onCompassChange, 监听罗盘数据
  // wx.startCompass，开始监听罗盘数据
  // wx.stopCompass
  // wx.setClipboardData，设置剪贴板内容
  // wx.getClipboardData
  // wx.makePhoneCall，拨打电话
  // wx.scanCode，扫码
}

var uiApis = {
  // wx.showToast, 显示提示框
  // wx.showLoading
  // wx.hideToast
  // wx.hideLoading
  // wx.showModal，显示模态弹窗
  // wx.showActionSheet，显示菜单列表
  // wx.setNavigationBarTitle，设置当前页标题
  // wx.showNavigationBarLoading，显示导航条加载动画
  // wx.hideNavigationBarLoading
  // wx.navigateTo，新窗口打开页面
  // wx.redirectTo, 原窗口打开页面
  // wx.switchTab，切换到tabbar页面
  // wx.navigateBack，返回上一页
  // wx.createAnimation，动画
  // wx.createCanvasContext，创建绘图上下文
  // wx.drawCanvas，绘图
  // wx.stopPullDownRefresh，停止下拉刷新动画
}

var wxmlApis = {
  // wx.createSlectorQuery，创建查询请求
  // selectorQuery.select
  // selectorQuery.selectAll
  // selectorQuery.selectViewport，选择显示区域
  // selectorQuery.exec，执行查询请求
  // nodesRef.boundingClientRect，获取布局位置和尺寸
  // nodesRef.scrollOffset，获取滚动位置
  // nodesRef.fields，获取任意字段
}

var openApis = {
  // wx.login
  // wx.getUserInfo
  // wx.chooseAddress，获取用户收货地址
  // wx.requestPayment，发起微信支付
  // wx.addCard，添加卡券
  // wx.openCard，打开卡券
}
