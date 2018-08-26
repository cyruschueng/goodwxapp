var app = getApp()

// 时间格式化 yyyy/mm/dd hh:mm:ss
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 数值格式化 01 - 99 - ...
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 发起get请求
function requestGet(para,callback){
  wx.request({
    url: para.url,
    data: para.data,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if(typeof callback == 'function'){
        callback(res);
      }
    },
    fail: function(){
      wx.showToast({
        title: '网络错误',
        icon: 'loading',
        duration: 1000
      })
    }
  })
}
// 发起post请求
function requestPost(para, callback) {
  para = $.extend( para ,{})
  wx.request({
    url: para.url,
    data: para.data,
    method: 'POST',
    header: {
      // 'content-type': 'application/json'
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      if (typeof callback == 'function') {
        callback(res);
      }
    },
    fail: function () {
      wx.showToast({
        title: '网络未连接',
        icon: 'loading',
        duration: 100
      })
    }
  })
}

// 合并多个对象
function merger(){

  var inner_merge = function (obj1, obj2) {
    for (var key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        obj1[key] = obj2[key]
      }
    }
    return obj1
  }
  var ret = {}
  for (var i = 0, l = arguments.length; i < l; i++) {
    inner_merge(ret, arguments[i])
  }
  // console.log(ret)
  return ret
}

// 分类加载失败 提示
function categoryError(){
  wx.showModal({
      title: '提示',
      content: '分类信息加载失败，请重试',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
}


/**
 * 收藏，文章、话题、活动
 * @resourceid 被收藏资源的id，如文章id等
 * @type 资源种类，如文章的type=1
 */
function toFollow(config, callback, error) {
  config = config || { 'resourceid': '', 'type': '', 'openid': '' };
  config.openid = app.globalData.openid

  if(!config.openid){
    app.userCheckLogin();
  }

  wx.request({
    url: app.globalData.url + '/admin/wx/collect',
    // url: '/fds/app.globalData',
    data: config,
    method: 'POST',
    success: function (res) {

      if (typeof callback == "function") {
        callback(res)
      }
    },
    fail: function () {
      if(typeof error == 'function'){
        error();
      }
      wx.showToast({
        title: '网络错误，请重试！',
        icon: 'loading',
        duration: 1000
      })
    }
  })

}

/**
 * 取消收藏，
 * @id 数据自增id
 */
function unFollow(id,callback,error){
  id = id || '';
  
  wx.request({
    url: app.globalData.url + '/admin/wx/collectdell',
    // url: '/fds/applData',
    data: { "id": id},
    method: 'POST',
    success: function (res) {

      if (typeof callback == "function") {
        callback(res)
      }
    },
    fail: function () {
      if (typeof error == 'function') {
        error();
      }
      wx.showToast({
        title: '网络错误，请重试！',
        icon: 'loading',
        duration: 1000
      })
    }
  })
}


/**
 * 用户点赞
 * @id 该条评论数据的id
 * @type 文章(1)和话题的区分
 */
function thumb(config, callback){
  if (!app.globalData.openid) {
    app.userCheckLogin();
  }
  var data = {
    'id': config.id,
    'type': config.type
  }

  wx.request({
    url: app.globalData.url + '/admin/wx/thumb',
    data: data,
    method: 'POST',
    success: function(res){
      if (typeof callback == "function") {
        callback(res)
      }
    }
  })

}

/**
 * 获取表单数据
 * @container为容器的id
 */
function getvalue(container){
  
}

// 将公共方法注册 输出，否则调用不到
module.exports = {
  formatTime: formatTime,
  requestGet: requestGet,
  requestPost: requestPost,
  merger: merger,
  categoryError: categoryError,
  toFollow: toFollow,
  unFollow: unFollow,
  thumb: thumb
}
