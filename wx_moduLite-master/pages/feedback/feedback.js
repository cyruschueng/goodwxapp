// pages/feedback/feedback.js
var app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
     * 提交反馈
     */
  formSubmit: function (e) {
    var that = this;
    var text = that.data.value

    if (text.length > 0) {

     
      wx.showToast({
        title: '反馈提交中',
        mask: true,
        duration: 5000
      });

      // setTimeout(function () {
      //   wx.showToast({
      //     title: '感谢您的反馈',
      //   })
      //   that.setData({
      //     value: ''
      //   })

      // }, 1000)

      wx.request({
        url: app.globalData.url + "/admin/wx/back",
        data: {'content': text, 'openid': app.globalData.openid },
        method: 'POST',
        success: function(res){
          wx.showToast({
            title: '感谢您的反馈',
            mask: true,
          });
          that.setData({
            value: ''
          })
          setTimeout(function(){
            wx.switchTab({
              url: "../mine/mine",
            })
          },1500)
        },
        fail: function(){
          wx.showToast({
            title: '网络错误',
            image: "../../pictures/fail.png",
            duration: 1000,
          });
        }
      });


    } else {
      wx.showModal({
        title: '提示',
        content: '请输入反馈内容',
        showCancel: false,
      })
    }
  },


/**
 * ==================
 */
  areaInput: function(e){
    this.setData({
      value: e.detail.value
    })
  },

})