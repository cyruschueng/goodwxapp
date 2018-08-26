// pages/index/mobans.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  //实现绑定的formSubmit 将formId传给服务器
  formSubmit: function (e) {
    var that = this
    var fId = e.detail.formId;
    var fObj = e.detail.value;
    var l = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=6_5d3cmOCOBCXcieISXavzlBP7YQRkKDROQxYCuCLd_mxTxXFmyX9wceSlqLqi9bfpRqD0hFaYsAmreIOELURyjp7U_xqjuzJVli0pTlKvr1BuqpMW1J0UBxrs7Esb7JCj-GflviHgIq3VF1kiWLSjAGAAPW';
    var d={
      touser:wx.getStorageSync('user').openid,
      template_id:'uIsYz0K3Ps2H4heUciFZvpw3VNpvwddINF6uaDKZlug',//申请模板消息的id
      page:'/pages/index/mobans',
      form_id:fId,
      data:{
        "keyword1": {
          "value":fObj.title,
          "color": "#4a4a4a"
        },
        "keyword2": {
          "value": fObj.name,
          "color": "#9b9b9b"
        },
        "keyword3": {
          "value": fObj.types,
          "color": "#9b9b9b"
        },
        "keyword4": {
          "value": fObj.summary,
          "color": "#9b9b9b"
        },
        "keyword5": {
          "value": fObj.aname,
          "color": "red"
        },
        "keyword6": {
          "value": fObj.time,
          "color": "#4a4a4a"
        },
        "keyword7": {
          "value": fObj.departement,
          "color": "#9b9b9b"
        },
        "keyword8": {
          "value": fObj.action,
          "color": "#9b9b9b"
        },
        "keyword9": {
          "value": fObj.daction,
          "color": "#9b9b9b"
        },
        "keyword10": {
          "value": fObj.dtime,
          "color": "red"
        }  
      },
      color: '#ccc',
      emphasis_keyword: 'keyword1.DATA' 
    }
    wx.request({
      url: l,
      data: d,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log("push msg")
        // success
        console.log(d.value.keyword1)
        console.log('成功' + res.data);
        console.log(res.statusCode)
        console.log(res.header)
        console.log(e.detail.formId);
      },
      fail: function (err) {
        // fail
        console.log('失败' + err);
      },
      complete: function () {
        // complete
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var user = wx.getStorageSync('user') || {};
    if (!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) {//不要在30天后才更换openid-尽量提前10分钟更新  
      wx.login({
        success: function (res) {
          // success  
         // var d = that.globalData.wxData;//这里存储了appid、secret、token串  
          var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxc450dca3adb0eced&secret=c8292f5a68bc33d9cf0dcff26dd221a4&js_code=' + res.code + '&grant_type=authorization_code';
          wx.request({
            url: l,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
            // header: {}, // 设置请求的 header  
            success: function (res) {
              var obj = {};
              obj.openid = res.data.openid;
              obj.expires_in = Date.now() + res.data.expires_in;

              wx.setStorageSync('user', obj);//存储openid  
            }
          });
        }
      });
    } else {
      console.log(user);
    }  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})