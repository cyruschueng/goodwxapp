//app.js
App({
  onLaunch: function() {
  },
  //获取用户接口
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  //全局IP地址访问
  ip:'http://127.0.0.1:8080/cjmz/',
  //全局配置
  phoneConfig:{
    theme: '#fe4070',
    frontColor: '#ffffff',
    projectName: '持久美妆',
    selectedTextColor: '#1864a0',
    defaultTextColor: '#707070',
    showBottomNav: true,
    page1: {
      active: true,
      show: true,
      text: '首页',
      onLoad:false,
      icon: '/static/img/default/wxhomed.png',
      selectedIcon: '/static/img/default/wxhomes.png',
      titleBar: {
        text: 'default',
        color: 'default',
        background: 'default'
      },
      contentList: [
        { name: 'searchBarClassic', config: { show: true, hasLocation: true, barColor: 'default', placeholder:'搜索...',data:{locationName:'杭州'}}}
      ],
    },
    page2: {
      active: false,
      show: true,
      text: '商城',
      icon: '/static/img/default/wxshopd.png',
      selectedIcon: '/static/img/default/wxshops.png',
      onLoad:false,
      titleBar: {
        text: 'default',
        color: 'default',
        background: 'default'
      }
    },
    page3: {
      active: false,
      show: true,
      text: '发现',
      icon: '/static/img/default/wxfindd.png',
      selectedIcon: '/static/img/default/wxfinds.png',
      onLoad: false,
      titleBar: {
        text: 'default',
        color: 'default',
        background: 'default'
      }
    },
    page4: {
      active: false,
      show: true,
      text: '课程',
      icon: '/static/img/default/wxschoold.png',
      selectedIcon: '/static/img/default/wxschools.png',
      onLoad: false,
      titleBar: {
        text: 'default',
        color: 'default',
        background: 'default'
      }
    },
    page5: {
      active: false,
      show: true,
      text: '我的',
      icon: '/static/img/default/wxuserd.png',
      selectedIcon: '/static/img/default/wxusers.png',
      onLoad: false,
      titleBar: {
        text: 'default',
        color: 'default',
        background: 'default'
      }
    }
  },
  globalData: {
    userInfo: null
  },
  /**
   * 请求接口方法
   * 参数 url(接口路劲) data(请求参数) success(请求成功回调函数) 
   * fail(请求失败回调函数) method(请求回掉函数)
   */
  post: function (url, data, success, fail, method) {
    var that = this;
    let _data = data || {};
    let _success = success || function (e) {
      console.log(e)
    };
    let _fail = fail || function (e) {
      console.log(e)
    };
    let _method = method || 'POST';
    let _header = { 'content-type': 'application/x-www-form-urlencoded' };

    if (_method.toUpperCase() == 'GET') {
      _header = { 'content-type': 'application/json' };
    }
    if (arguments.length == 2 && typeof _data == 'function') {
      _success = _data
    }

    wx.request({
      url: that.ip + url,
      method: _method,
      header: _header,
      data: _data,
      success: function (res) {
        if (typeof _success == 'function' && res.statusCode != 404 && res.statusCode != 500 && res.statusCode != 400) {
          console.log(`======== 接口 ${url} 请求成功 ========`);
          _success(res.data);
        } else {
          if (typeof _success != 'function') {
            console.log(`========  ${_success} 不是一个方法 ========`);
          }
          console.log(`======== 接口 ${url} 错误 ${res.statusCode} ========`);
        }
      },
      fail: function (res) {
        console.log(`======== 接口 ${url} 请求失败 ========`);
        if (typeof _fail == 'function') {
          _fail(res);
        }
      }
    });
  }
})
