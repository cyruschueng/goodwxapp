//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    companyName1:"上海显目企业登记代理中心",
    companyName2: "上海显目投资管理有限公司",
    jianjie:"一站式代办到底：让你不费心、少跑路",
    company_product1:"注册公司  代理记账  公司年检",
    company_product2: "社保办理  公司注销  公司变更",
    address:"上海青浦区凤马塘路205弄12号1204室",
    time:"8:30-21:00",
    phoneNumber:"13611880095",
    telphone:'021-60448555',
    picture:"公司照片"

    },

  //图片预览功能
  previewImg01: function (event) {
    var ImageLinkArray = [
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/by0tCeCk26u5RFQBIuS9K23hB19j5WeSDqQX44B3iLY!/b/dPIAAAAAAAAA&bo=WAIgAwAAAAARAE4!&rf=viewer_4",
      "http://a2.qpic.cn/psb?/V14aANop0J23cs/tAXXhUlDWmD8HqD8Fm8D2OwYHjh4VudDDCedhRGzCoU!/b/dD8BAAAAAAAA&bo=WAIgAwAAAAARAE4!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/lh16VB1AiLzE40J.yw1wHzFkRubnvPS6xv9wmMB0c04!/b/dPIAAAAAAAAA&bo=gAJWAwAAAAARAOA!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/h*sdKjZOUTnfPHBL91YJSiys60FAYcHPxntLJnaCEAE!/b/dPIAAAAAAAAA&bo=IANYAgAAAAARAE4!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/L23D8.qj6hqX3qYk92KGr1y.ej1kMpk8Szf6fXqN.fA!/b/dPIAAAAAAAAA&bo=WAIgAwAAAAARB0k!&rf=viewer_4"
      ]
    wx.previewImage({
      current: ImageLinkArray[0], // 当前显示图片的http链接
      urls: ImageLinkArray ,// 需要预览的图片http链接列表
    })
  },
  previewImg02: function (event) {
    var ImageLinkArray = [
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/by0tCeCk26u5RFQBIuS9K23hB19j5WeSDqQX44B3iLY!/b/dPIAAAAAAAAA&bo=WAIgAwAAAAARAE4!&rf=viewer_4",
      "http://a2.qpic.cn/psb?/V14aANop0J23cs/tAXXhUlDWmD8HqD8Fm8D2OwYHjh4VudDDCedhRGzCoU!/b/dD8BAAAAAAAA&bo=WAIgAwAAAAARAE4!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/lh16VB1AiLzE40J.yw1wHzFkRubnvPS6xv9wmMB0c04!/b/dPIAAAAAAAAA&bo=gAJWAwAAAAARAOA!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/h*sdKjZOUTnfPHBL91YJSiys60FAYcHPxntLJnaCEAE!/b/dPIAAAAAAAAA&bo=IANYAgAAAAARAE4!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/L23D8.qj6hqX3qYk92KGr1y.ej1kMpk8Szf6fXqN.fA!/b/dPIAAAAAAAAA&bo=WAIgAwAAAAARB0k!&rf=viewer_4"
    ]
    wx.previewImage({
      current: ImageLinkArray[1], // 当前显示图片的http链接
      urls: ImageLinkArray,// 需要预览的图片http链接列表
    })
  },
  previewImg03: function (event) {
    var ImageLinkArray = [
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/by0tCeCk26u5RFQBIuS9K23hB19j5WeSDqQX44B3iLY!/b/dPIAAAAAAAAA&bo=WAIgAwAAAAARAE4!&rf=viewer_4",
      "http://a2.qpic.cn/psb?/V14aANop0J23cs/tAXXhUlDWmD8HqD8Fm8D2OwYHjh4VudDDCedhRGzCoU!/b/dD8BAAAAAAAA&bo=WAIgAwAAAAARAE4!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/lh16VB1AiLzE40J.yw1wHzFkRubnvPS6xv9wmMB0c04!/b/dPIAAAAAAAAA&bo=gAJWAwAAAAARAOA!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/h*sdKjZOUTnfPHBL91YJSiys60FAYcHPxntLJnaCEAE!/b/dPIAAAAAAAAA&bo=IANYAgAAAAARAE4!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/L23D8.qj6hqX3qYk92KGr1y.ej1kMpk8Szf6fXqN.fA!/b/dPIAAAAAAAAA&bo=WAIgAwAAAAARB0k!&rf=viewer_4"
    ]
    wx.previewImage({
      current: ImageLinkArray[2], // 当前显示图片的http链接
      urls: ImageLinkArray,// 需要预览的图片http链接列表
    })
  },
  previewImg04: function (event) {
    var ImageLinkArray = [
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/by0tCeCk26u5RFQBIuS9K23hB19j5WeSDqQX44B3iLY!/b/dPIAAAAAAAAA&bo=WAIgAwAAAAARAE4!&rf=viewer_4",
      "http://a2.qpic.cn/psb?/V14aANop0J23cs/tAXXhUlDWmD8HqD8Fm8D2OwYHjh4VudDDCedhRGzCoU!/b/dD8BAAAAAAAA&bo=WAIgAwAAAAARAE4!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/lh16VB1AiLzE40J.yw1wHzFkRubnvPS6xv9wmMB0c04!/b/dPIAAAAAAAAA&bo=gAJWAwAAAAARAOA!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/h*sdKjZOUTnfPHBL91YJSiys60FAYcHPxntLJnaCEAE!/b/dPIAAAAAAAAA&bo=IANYAgAAAAARAE4!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/L23D8.qj6hqX3qYk92KGr1y.ej1kMpk8Szf6fXqN.fA!/b/dPIAAAAAAAAA&bo=WAIgAwAAAAARB0k!&rf=viewer_4"
    ]
    wx.previewImage({
      current: ImageLinkArray[3], // 当前显示图片的http链接
      urls: ImageLinkArray,// 需要预览的图片http链接列表
    })
  },
  previewImg05: function (event) {
    var ImageLinkArray = [
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/by0tCeCk26u5RFQBIuS9K23hB19j5WeSDqQX44B3iLY!/b/dPIAAAAAAAAA&bo=WAIgAwAAAAARAE4!&rf=viewer_4",
      "http://a2.qpic.cn/psb?/V14aANop0J23cs/tAXXhUlDWmD8HqD8Fm8D2OwYHjh4VudDDCedhRGzCoU!/b/dD8BAAAAAAAA&bo=WAIgAwAAAAARAE4!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/lh16VB1AiLzE40J.yw1wHzFkRubnvPS6xv9wmMB0c04!/b/dPIAAAAAAAAA&bo=gAJWAwAAAAARAOA!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/h*sdKjZOUTnfPHBL91YJSiys60FAYcHPxntLJnaCEAE!/b/dPIAAAAAAAAA&bo=IANYAgAAAAARAE4!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop0J23cs/L23D8.qj6hqX3qYk92KGr1y.ej1kMpk8Szf6fXqN.fA!/b/dPIAAAAAAAAA&bo=WAIgAwAAAAARB0k!&rf=viewer_4"
    ]
    wx.previewImage({
      current: ImageLinkArray[4], // 当前显示图片的http链接
      urls: ImageLinkArray,// 需要预览的图片http链接列表
    })
  },



  //地图导航  高德
  Mapnavigation: function (e) {
    wx.openLocation({
      type: 'wgs84',
      latitude: 31.18099,
      longitude: 121.22824,
      name: '上海显目投资管理有限公司',
      address: '上海青浦区凤马塘路205弄12号1204室',
      success: function () {
        console.log("地图导航成功！")
      },
      fail: function () {
        console.log("地图导航失败！")
      }
    
    })
  },
  
  //拨打电话
  callmeTap: function () {
    wx.makePhoneCall({
      phoneNumber: '13611880095',
      leading: "拨打热线",
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  callmephone: function () {
    wx.makePhoneCall({
      phoneNumber: '021-60448555',
      leading: "拨打热线",
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  

  onLoad: function (opt) {

    //转发前配置
    wx.showShareMenu({
      withShareTicket: true
    })

    //转发到群组后打开
    /** 判断场景值，1044 为转发场景，包含shareTicket 参数 */
    if (opt.scene == 1044) {
      wx.getShareInfo({
        shareTicket: opt.shareTicket,
        success: function (res) {
          var encryptedData = res.encryptedData;
          var iv = res.iv;
        }
      })
    }
  

    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  //转发时获取群信息
  onShareAppMessage: function () {
    return {
      title: '上海注册公司代理记账中心',
      desc: '小程序',
      path: '/pages/index/index'
    }
  }

})


