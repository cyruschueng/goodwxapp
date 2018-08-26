// pages/message/message.js
var app = getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    // 系统自动消息列表采用本地缓存，服务器不保留，长按删除
    list:[
      // {
      //   id: 5, 'type': 2,
      //   message: "<p>您参与的线下读书会活动，还有一天就要开始啦！快快准备吧……</p>",
      //   preview: "您参与的线下读书会活动，还有一天就要开始啦！快快准备吧……",
      //   image: 'https://www.shtongnian.com/ueditor/php/upload/image/20171027/1509084896547518.jpg',
      //   time: "2017-10-26 17:25",
      // },
      // { id: 3, 'type': 1, message: "您参与的线下读书会活动，还有一天就要开始啦！快快准备吧……", preview: "您参与的线下读书会活动，还有一天就要开始啦！快快准备吧……", time:"2017-10-26 08:22"},
      // { id: 2, 'type': 1, message: "您参与的线下读书会活动，还有一天就要开始啦！快快准备吧……", preview: "您参与的线下读书会活动，还有一天就要开始啦！快快准备吧……", time:"2017-10-25 10:40"},
      // { id: 1, 'type': 2, 
      //   message: "<p>您参与的线下读书会活动，还有一天就要开始啦！快快准备吧……</p>", 
      //   preview: "您参与的线下读书会活动，还有一天就要开始啦！快快准备吧……", 
      //   image: 'https://www.shtongnian.com/ueditor/php/upload/image/20171027/1509084896547518.jpg',
      //   time:"2017-10-24 17:25",
      // },
      
      
      // { id: "1", sender: { name: "掌上魔都", head: "https://tvax3.sinaimg.cn/crop.0.0.400.400.180/006VhaXvly8fiehmglbm2j30b40b4jse.jpg", other: "" }, message:"您的评论已通过审核",date:"2017-08-31"}, // 版本一
    ],
    beforeList:[],
    hide: 'hide',
    logo: "https://shtongnian.com/logo.png",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // wx.setStorage({
    //   key: 'systemList',
    //   data: that.data.list,
    // })

    // 读取数据，新消息数据在mine。js中已经执行并缓存。
    wx.getStorage({
      key: 'systemList',
      success: function(res) {

        that.setData({
          list: res.data
        })
      },
      fail: function(){
        console.log("暂无消息");
        that.setData({
          hide: ''
        })
      }
    })
    

    

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
 * ======================自定义方法========================
 */

  /**
   * 长按删除
   */
  deleteMsg: function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;

    wx.showActionSheet({
      itemList: ['删除'],
      success: function(res){
        if(res.tapIndex == 0){

          that.removeMsg(id);
        }
      }
    })
    
  },


  /**
   * 删除该消息并缓存
   */
  removeMsg: function(id){
    var list = this.data.list;

    for(var i in list){
      if(list[i].id == id){
        list.splice(i,1)
        break;
      }
    }
    
    this.setData({
      list: list
    })

    wx.setStorage({
      key: 'systemList',
      data: list,
    })
  },


  /**
   * 点击查看
   */
  viewDetail: function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;

    var touchTime = that.data.touch_end - that.data.touch_start;

    if (touchTime <= 350) {

      wx.navigateTo({
        url: '../msgdetail/msgdetail?id='+ id,
      })
    }
  },


  //按下事件开始  
  mytouchstart: function (e) {
    let that = this;
    that.setData({
      touch_start: e.timeStamp
    })
  },
  //按下事件结束  
  mytouchend: function (e) {
    let that = this;
    that.setData({
      touch_end: e.timeStamp
    })
  },

})