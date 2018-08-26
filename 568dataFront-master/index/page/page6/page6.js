
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "page6",
  /**
   * 页面的初始数据
   */

  data: {
    fromOpenId: "",
    inputValue: "",
    licenseNo: "",
    frameNo: "",
    array: ['车架', '车牌'],
    objectArray: [
      {
        id: 0,
        name: '车架'
      },
      {
        id: 1,
        name: '车牌'
      }
    ],
    index: 0
  },
  onShareAppMessage: function (res) {
    wx.showLoading({ title: '' });
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    var now = new Date();
    var voucher_code = getApp().data.userOpenId + '_' + now.getTime() + Math.round(Math.random() * 10000);
    return {
      title: '快来分享领红包，手慢就没了',
      imageUrl: 'https://51yangcong.com/568data/image/1.jpg',
      path: 'page/page6/page6?from=' + getApp().data.userOpenId + "&voucher_code=" + voucher_code,
      success: function (res) {
        wx.request({
          url: 'https://51yangcong.com/568data/shareDaijinquan_daijinquan.do',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            'openId': getApp().data.userOpenId,
            voucher_code: voucher_code
          },
          success: function success(res) {
            console.log(res.data)
            var o = res.data;
            if (o.success) {
              console.log("转发成功")
            }
            wx.hideLoading();//////////////////////////////////////////////
          },
          'fail': function (res) {
            wx.hideLoading();//////////////////////////////////////////////
          }
        });
        // console.log(res.shareTickets[0])
        // wx.getShareInfo({
        //   shareTicket: res.shareTickets[0],
        //   success: function (res) { 
        //     console.log("已转发 来自openid:" + getApp().data.userOpenId);
        //     console.log(res)
        //      },
        //   fail: function (res) { console.log(res) },
        //   complete: function (res) { console.log(res) }
        // })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(res) {
    console.log('deng lu cheng gong');
    console.log(res);
    if (res.from != null && res.from != "" && res.voucher_code != null && res.voucher_code != "") {
      if (getApp().data.userOpenId == '' || getApp().data.userOpenId == null) {
        var voucher_code = res.voucher_code;
        var _from = res.from;
        console.log("获得openid失败");
        wx.login({
          success: function (res) {
            wx.request({
              url: 'https://51yangcong.com/568data/GetOpenId',
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                'code': res.code
              },
              success: function success(res) {
                getApp().data.userOpenId = res.data.openid;
                var openid = res.data.openid;
                console.log("接受转发消息，重新获得openid:" + openid);
                wx.request({
                  url: 'https://51yangcong.com/568data/acceptShareDaijinquan_daijinquan.do',
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    'fromopenId': _from,
                    'toopenId': openid,
                    voucher_code: voucher_code
                  },
                  success: function success(res) {
                    console.log(res.data)
                    var o = res.data;
                    if (o.success) {
                      console.log("接受转发成功")
                    }
                    wx.hideLoading();//////////////////////////////////////////////
                  },
                  'fail': function (res) {
                    wx.hideLoading();//////////////////////////////////////////////
                  }
                });
              },
              'fail': function (res) {
                wx.reLaunch({ url: '../../page/messagePage/messagePage' });
                wx.hideLoading();//////////////////////////////////////////////
              }
            });
          }
        });
      } else {
        console.log("获得openid成功");
        wx.request({
          url: 'https://51yangcong.com/568data/acceptShareDaijinquan_daijinquan.do',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            'fromopenId': res.from,
            'toopenId': getApp().data.userOpenId,
            voucher_code: res.voucher_code
          },
          success: function success(res) {
            console.log(res.data)
            var o = res.data;
            if (o.success) {
              console.log("接受转发成功")
            }
            wx.hideLoading();//////////////////////////////////////////////
          },
          'fail': function (res) {
            wx.hideLoading();//////////////////////////////////////////////
          }
        });
      }

    }

    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log('shareMenu share success')
        console.log('分享' + res)
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    })
  },
  bindKeyInput: function (e) {
    if (this.data.index == 0) {
      this.setData({
        inputValue: e.detail.value,
        frameNo: e.detail.value
      })
    } else {
      this.setData({
        inputValue: e.detail.value,
        licenseNo: e.detail.value
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // if (getApp().data.userOpenId == null || getApp().data.userOpenId == "") {
    //   wx.showLoading({ title: '' });
    //   wx.login({
    //     success: function (res) {
    //       wx.request({
    //         url: 'https://51yangcong.com/568data/GetOpenId',
    //         //url: 'http://localhost:8880/568data/GetOpenId',
    //         method: 'POST',
    //         header: {
    //           'content-type': 'application/x-www-form-urlencoded'
    //         },
    //         data: {
    //           'code': res.code
    //         },
    //         success: function success(res) {
    //           getApp().data.userOpenId = res.data.openid;
    //           wx.hideLoading();
    //         }
    //       });
    //     }
    //   });
    // }
    console.log("openid:" + getApp().data.userOpenId);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 执行coolsite360交互组件展示
    app.coolsite360.onShow(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //以下为自定义点击事件

  tap_bafd41db: function (e) {
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e, this);
  },
  //投保查询
  tap_7a42cdda: function (e) {
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e, this);
  },
  //状态查询
  tap_a51bae1f: function (e) {
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e, this);
  },

  tap_483ab025: function (e) {
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e, this);
  },
  //出险查询
  tap_4f1610c5: function (e) {
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e, this);
  },
  //维保查询
  tap_WBJL: function (e) {
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e, this);
  }

})

