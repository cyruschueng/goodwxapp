//调用App()函数来注册小程序
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var _this = this;
    console.log('onLaunch');
    //一加载，获取用户的位置信息
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: res => {
          console.log('获取经纬度',res);
        // 成功设置经度和纬度
        _this.latitude = res.latitude;
        _this.longitude = res.longitude;

        //根据经纬度获取城市信息，调用baiduAPI
        var bdAPI = "https://api.map.baidu.com/geocoder/v2/?location="+_this.latitude+","+_this.longitude+"&output=json&pois=1&ak=ta67M7R4GGToWMiWGfG5PajOXzQMwBik";

        //发送请求加载地址信息
        wx.request({
          url: bdAPI,
          success: function(res){
            console.log('百度地图API',res);
            console.log(res.data.result.addressComponent.city);
            _this.city = res.data.result.addressComponent.city;
          }
        })
        
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    console.log('onShow');
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    console.log('onHide');
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    console.log('onError');
  },

  //创建变量保存纬度
  latitude:40.137257,

  //创建变量保存经度
  longitude:116.680165,

  //创建一个变量，保存当前城市信息
  city:'北京市'
});

