// pages/post/post.js

var util = require('../../utils/util.js');


var Bmob = util.Bmob;
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hidden: true,
    num: 0,
    typelist: ['Web','移动APP','微信开发','爬虫类','数据挖掘类','其他'],
    budget: ['100-1000', '1000-5000', '5000-10000', '1万-3万', '3万-5万', '5万-10万', '10万以上', '待商议']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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


  /**
   * 用户点击右上角分享
   */
 
  bindPickerChange1: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      one: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindInput: function (e) {
    this.setData({
      num: e.detail.value.length
    })
  },
  bindPublish: function (e) {
    this.setData({
      hidden: false
    });
    var that = this

    let title = e.detail.value.title

    let typeone = e.detail.value.typepicker
    let protype = this.data.typelist[typeone]

    let index = e.detail.value.picker
    let budget = this.data.budget[index]

    let days = e.detail.value.days
    let content = e.detail.value.content
    let status = '招募中'
    
    let user  = Bmob.User.current();
    let telnum = e.detail.value.telnum
    if (title == null || title == "" || days == null || days == ""
      || content == null || content == "") {
      console.log("不能为空")
      this.setData(
        { popErrorMsg: "内容不能为空" },
      );
      wx.showToast({
        title: '内容不能为空！',
        icon: 'success',
        duration: 1000
      })
      this.ohShitfadeOut();
      that.setData({
        hidden: true
      });
      return;
    }


    util.addPost(title, protype,budget, days, content, user, telnum,status).then(res => {
      var that = this
      console.log(res);
      wx.showToast({
        title: '发布项目成功',
        success: function(){
          wx.switchTab({
            url: '../index/index'
          });
          that.setData({
            hidden: true
          });
        }
      });


    })
  },
  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ popErrorMsg: '' });
      clearTimeout(fadeOutTimeout);
    }, 3000);
  },
  validatemobile: function (e) {
    var that = this
    var mobile = e.detail.value
    var pos = e.detail.cursor
    if (pos != -1) {
      //光标在中间
      var left = e.detail.value.slice(0, pos)
      //计算光标的位置
      pos = left.replace(/11/g, '2').length
    }
    if (mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'success',
        duration: 1000
      })

      return
    }
    if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1000
      })

      return
    }
    var myreg = /^1[34578]\d{9}$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1000
      })

      return
    }

  }
})