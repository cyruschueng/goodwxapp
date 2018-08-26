// pages/passwordPage/passwordPage.js
var util = require('../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usr: '',
    uid: '',
    passw:'',
    newPassw:'',
    confiNewpass:'',
    passw1: '',
    newPassw1: '',
    confiNewpass1: '',
    // 错误提示
    errtips:'',
    modipassH:true
  },
  // 取消
  modiPassCancel: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
  // 获取输入原密码
  passwInput: function (e) {
    var that = this
    if (util.trim(e.detail.value) != '') {
      that.setData({
        passw: util.trim(e.detail.value)
      })
    }
  },
  // 获取输入新密码
  newPasswInput: function (e) {
    var that = this
    if (util.trim(e.detail.value) != '') {
      that.setData({
        newPassw: util.trim(e.detail.value)
      })
    }
  },
  // 获取输入确认密码
  confiNewInput: function (e) {
    var that = this
    if (util.trim(e.detail.value) != '' && (that.data.passw!='')) {
      that.setData({
        confiNewpass: util.trim(e.detail.value)
      })
    }
  },
  modiPass:function(e){
    var that = this
    var passw = that.data.passw;
    var newPassw = that.data.newPassw; 
    var confiNewpass = that.data.confiNewpass;
    if (passw==''){
      that.setData({
          errtips: '请输入原密码',
          modipassH: false
        })
    } else if (newPassw == '') {
      that.setData({
        errtips: '请输入新密码',
        modipassH: false
      })
    } else if (newPassw.length < 6 || (newPassw.length > 32)) {
      that.setData({
        errtips: '长度6~32位字符',
        modipassH: false
      })
    }else if (passw == newPassw) {
      that.setData({
        errtips: '新旧密码不能相同',
        modipassH: false
      })
    } else if (confiNewpass == '') {
      that.setData({
        errtips: '确认密码为空',
        modipassH: false
      })
    } else if (confiNewpass != newPassw) {
      that.setData({
        errtips: '两次输入不一致',
        modipassH: false
      })
    }else{
      // 修改密码str
      // 请求star
      var SHAnewPassw = util.sha1(newPassw);
      var SHApassw = util.sha1(passw);
      var rcPWD = util.rc4(SHAnewPassw, SHApassw)
      var cryptPwd = util.byte2hex(rcPWD)
      wx.showLoading({
        title: '加载中',
        mask: true,
      })
      util.http_oper(encodeURI("&action=updatePassword&newpwd=" + cryptPwd), function (err, dat, desc) {
        if (err == 0) {
          that.setData({
            passw1: '',
            newPassw1:'',
            confiNewpass1:''
          })
          wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
        }else{
          util.errBoxFunc(that, err, desc)
        }
      },function(){
        util.netWork(that)
      },function(){
        wx.hideLoading()
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var AccountInfo = JSON.parse(options.AccountInfo)
    that.setData({
      usr: AccountInfo.usr,
      uid: AccountInfo.uid      
    })
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
    var shareObj = util.shareFunc()
    return shareObj
  }
})