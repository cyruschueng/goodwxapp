//app.js
App({
  onLaunch: function () {
    this.login()
  },
  //version 1.企业   2.个人
  version:2,
  //ip: 'http://192.168.5.223:8080/elMall/',
  ip:'https://www.tongzhuhe.com/elMall/',
  /**
   * 手动修改区域
   * storeType 店铺类型  1.普通商城   2.鲜花店
   * storeId   店铺ID
   * wxnumber  微信号 
   */
  storeId: 22,
  wxnumber: 'yanwulelaji',
  storeType:1,
  //**************** */
  store:null,
  userInfo: null,
  login(){
    var that = this;
    wx.login({
      success(res){
        that.post('user/info/wx/login',{
          js_code:res.code,
          storeId:that.storeId
        },function(res){
            that.userInfo = res.body;
            that.post('user/shopCar/wx/find',{
              userId: that.userInfo.userId
            },function(res){
              that.userInfo.shopCarId = res.body.shopCarId;
            })
            that.post('store/info/find',{
              storeId: that.storeId
            },function(res){
              that.store = res.body;
              wx.setNavigationBarTitle({
                title: res.body.storeName,
              })
            })
        })
      }
    })
  },
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
  },
  setWindowSize(that){
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          innerHeight: res.windowHeight,
          innerWidth: res.windowWidth
        })
      },
    })
  }
})