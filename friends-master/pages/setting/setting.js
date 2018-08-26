// pages/setting/setting.js
const app = getApp()
var   sign = wx.getStorageSync("sign");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},//头像
    q_id:0,//问题id
    nowque:[],//问题选项
    listask:[],//答案
    checked:false, //设置答案
    disabled: false,    //下一题按钮
    finish:false, //提交答案
    quesitionIndex: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var g_id = options.g_id;
    var title = options.title;
    this.setData({
      g_id: g_id,
      title: title
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var sign = wx.getStorageSync("sign");
    var that = this;
    wx.request({
      url: "https://friend-guess.playonwechat.com/guess/get-my-guess-setting?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        g_id: that.data. g_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("我的编辑:", res);
        that.setData({
          quesition: res.data.data
        })
      }
    })
  },

  // 设置答案
  checked:function(e){
    console.log(e);
    var that = this;
    let quesitionIndex = that.data.quesitionIndex;
    let quesition = that.data.quesition;
    let anwer = e.currentTarget.dataset.checked;
    let anwerIndex = e.currentTarget.dataset.index;
    let c_id = e.currentTarget.dataset.c_id;
    let listask = that.data.listask;
    let str = quesitionIndex + "|" + c_id;
    listask.push(str);
    that.setData({
      listask
    })
   // console.log(listask);
    for (var i = 0; i < quesition[quesitionIndex - 1].choices.length;i++){
      quesition[quesitionIndex - 1].choices[i].checked = false;
    }
    
    quesition[quesitionIndex - 1].choices[anwerIndex].checked = true;
    that.setData({
      quesition
    })
    if (quesitionIndex < that.data.quesition.length) {
      setTimeout(function () {
        quesitionIndex += 1;
        that.setData({
          quesitionIndex,
          actives: false,
          right: false
        })
      }, 1000)
    } else {
      var a = that.data.listask.join();
      var setting = '"' + a + '"';
      console.log(setting);
          var dd = {
            setting: setting,
            g_id: that.data.g_id
          }
          wx.request({
            url: "https://friend-guess.playonwechat.com/guess/set-guess-setting?sign=" + sign + '&operator_id=' + app.data.kid,
            data: dd,
            header: {
              'content-type': 'application/json'
            },
            traditional: true,//这里设置为true
            method: "GET",
            success: function (res) {
              console.log("我的编辑:", res);
              var status = res.data.status;
              console.log(res.data.status);
              if (status == 1) {
                wx.navigateTo({
                  url: '../goShare/goShare?title=' + that.data.title + '&g_id=' + that.data.g_id
                })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'loading',
                  duration: 800
                })
              }

            }
          })
      }
  },
  // 下一题
  // next:function(){
  //   var that = this;
  //   quesitionIndex += 1;
  //   if (length == quesitionIndex){
  //     that.setData({
  //         finish:true
  //     })
  //   }
  //   var disabled = that.data.disabled;
  //    if (!listask){
  //      that.setData({
  //        disabled: false
  //      })
  //      console.log(listask, '111')
  //   }else{
  //      for (var i in listask) {
  //        console.log(i,":i");
  //        var str = listask[i];
  //        var arr = str.split("|");
  //        if (quesitionIndex == arr[0]) {
  //          console.log(i)
  //          that.setData({
  //            disabled: true
  //          })
  //        } else {
  //          that.setData({
  //            disabled: false
  //          })
  //        }
  //      }
  //   }
    
    
  //    if (!that.data.disabled){
  //     wx.showToast({
  //       title: '你还未设置答案',
  //       icon: 'loading',
  //       duration: 800
  //     })
  //   }
  // },

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