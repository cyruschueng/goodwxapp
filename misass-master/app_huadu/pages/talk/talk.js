// pages/talk/talk.js

var trim = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bwechaId: null,
    mid: null,
    wecha_id: null,
    time: null,
    id: null,
    wechaId: null,
    messageList: [],
    messageListNew: [],
    value: '',
  },

  //发起对话接口
  toMessage: function() {
    var that = this;
    wx.request({
      url: 'https://xcx.misass.com/huadu/index.php?s=/api/Message/message_Initiate',
      method: 'POST',
      data: {
        awecha_id: getApp().globalData.wecha_id,
        bwecha_id: this.data.bwechaId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res);
        if(res.data.code == '100000') {
          that.setData({
            mid: res.data.mid
          })
          console.log(that.data.mid)
          wx.request({
            url: 'https://xcx.misass.com/huadu/index.php?s=/api/Message/message_info',
            method: 'POST',
            data: {
              mid: that.data.mid,
              wecha_id: getApp().globalData.wecha_id
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res);
              if (res.data.code == '100000') {
                that.setData({
                  time: res.data.time,
                  id: res.data.id,
                  messageList: res.data.message
                })
                setTimeout(function () {
                  that.showTalkInfo(1);
                }, 5000)
              } else {
                that.setData({
                  time: res.data.time,
                  id: 0,
                })
                setTimeout(function () {
                  that.showTalkInfo(1);
                }, 5000)
              }
            }
          })
        }
        
      }
    })
  },



  //定时显示聊天数据
  showTalkInfo: function(timeFlag) {
    var that = this;
    var time;
    
    if(timeFlag == 0) {
      clearInterval(time);
    } else if (timeFlag == 1) {
      time = setInterval(function () {

        var messageList2 = that.data.messageList;

        console.log(messageList2);
        console.log(getApp().globalData.wecha_id)
        wx.request({
          url: 'https://xcx.misass.com/huadu/index.php?s=/api/Message/message_info',
          method: 'POST',
          data: {
            mid: that.data.mid,
            wecha_id: getApp().globalData.wecha_id,
            time: that.data.time,
            id: that.data.id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            if (res.data.code == '100000') {
              var obj = res.data.message;
              for (var i = 0; i < obj.length; i++) {
                messageList2.push(obj[i]);
              }
              that.setData({
                messageList: messageList2,
                time: res.data.time,
                id: res.data.id
              })
            }
          }
        })
      }, 1500);
    }
  },

  //获取输入内容
  getValue: function(e) {
    var value = trim.trim(e.detail.value);
    console.log(value);
    this.setData({
      value: value
    })
  },

  //发送聊天
  sendMessage: function() {
    this.showTalkInfo(0);
    var that = this;
    console.log(this.data.mid);
    if(this.data.value == '') {
      wx.showModal({
        content: '发送不能为空',
        showCancel: false,
        confirmColor: '#29b6f6'
      })
    }else {
      wx.request({
        url: 'https://xcx.misass.com/huadu/index.php?s=/api/Message/message_add',
        method: 'POST',
        data: {
          value: this.data.value,
          wecha_id: getApp().globalData.wecha_id,
          mid: this.data.mid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          if (res.data.code == '100000') {
            that.setData({
              value: '',
            })
            that.showTalkInfo(1);
          } else {
            wx.showModal({
              content: '发送失败',
              confirmColor: '#29b6f6',
              showCancel: false
            })
          }
        }
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    if(options.bwechaId) {
      this.setData({
        bwechaId: options.bwechaId,
        wechaId: getApp().globalData.wecha_id        
      });
      this.toMessage();    
    }else{
      this.setData({
        mid: options.mid,
        wecha_id: options.wid,
        wechaId: getApp().globalData.wecha_id
      })
      console.log(options.mid);
      if (options.mid != null && getApp().globalData.wecha_id != null) {
        wx.request({
          url: 'https://xcx.misass.com/huadu/index.php?s=/api/Message/message_info',
          method: 'POST',
          data: {
            mid: options.mid,
            wecha_id: getApp().globalData.wecha_id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            if(res.data.code == '100000') {
              that.setData({
                time: res.data.time,
                id: res.data.id,
                messageList: res.data.message
              })
              that.showTalkInfo(1);
            }else {
              that.setData({
                time: res.data.time,
                id: 0,
              })
              that.showTalkInfo(1);
            }
          }
        })
      }
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