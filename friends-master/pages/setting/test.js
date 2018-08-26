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
    finish:false //提交答案
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
      url: "http://friend-guess.playonwechat.com/guess/get-my-guess-setting?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        g_id: that.data. g_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("我的编辑:", res);
        console.log(res.data.data);
        console.log(res.data.data[0]);
        that.setData({
          quesition: res.data.data,
          nowque: res.data.data[0],
          choices: res.data.data[0].choices
        })
      }
    })
  },

  // 设置答案
  checked:function(e){
    console.log(e);
    var that = this;
    var q_id = e.currentTarget.dataset.q_id;
    var c_id = e.currentTarget.dataset.index;
    //console.log(q_id,c_id);//下标
    var both = [];//新建both对象
    var listask = that.data.listask;
    var choices = that.data.nowque.choices;
    for (var i = 0; i < choices.length; i++) {
      choices[i].checked = false;
      choices[c_id].checked = true;
      
    }
    var c_id = choices[c_id].c_id;
    console.log("c_id:", c_id);
    var str =  q_id + '|' + c_id;
    // var a = '"' + q_id + '"';
    // listask[a] = c_id;
    listask[q_id-1] = str;
    console.log("listask:",listask);
    that.setData({
      choices: choices,
      c_id: c_id,
      listask: listask
    })
    wx.setStorageSync('listask', that.data.listask);
  },
  // 下一题
  next:function(){
    var that = this;
    var length = that.data.quesition.length;//总题说
    var nowlength = that.data.nowque.q_id; //现在题数
    console.log(length);
    console.log(nowlength);
    if (length == nowlength){
      that.setData({
          finish:true
      })
    }
    var disabled = that.data.disabled;
    var q_id = that.data.nowque.q_id ; 
    var listask = that.data.listask;
    console.log(listask,'000')
     if (!listask){
       that.setData({
         disabled: false
       })
       console.log(listask, '111')
    }else{
       for (var i in listask) {
         console.log(i,":i");
         var str = listask[i];
         var arr = str.split("|");
         if (q_id == arr[0]) {
           console.log(i)
           that.setData({
             disabled: true
           })
           var quesition = that.data.quesition;
           var q_id = that.data.q_id;
               q_id = q_id + 1;
               console.log(quesition);
               that.setData({
                 nowque: quesition[q_id],
                 choices: quesition[q_id].choices
               })
               console.log("nowque:", that.data.nowque);
               console.log("choices:", that.data.choices);
         } else {
           that.setData({
             disabled: false
           })
         }
       }
    }
    
    
     if (!that.data.disabled){
      wx.showToast({
        title: '你还未设置答案',
        icon: 'loading',
        duration: 800
      })
    }
  },
  // 提交答案
  finish: function () {
    var sign = wx.getStorageSync("sign");
    var that = this;
    console.log(that.data.listask, "00000");
    var dd = {
      setting: that.data.listask,
      g_id: that.data.g_id
    }
    console.log(dd);
    wx.request({
      url: "http://friend-guess.playonwechat.com/guess/set-guess-setting?sign=" + sign + '&operator_id=' + app.data.kid ,
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
        if (status==1){
            wx.navigateTo({
              url: '../goShare/goShare?title=' + that.data.title + '&g_id=' + that.data.g_id
            })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            duration: 800
          })
        }
        
      }
    })
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