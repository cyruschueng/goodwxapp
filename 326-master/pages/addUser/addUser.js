var util = require('../../utils/util.js');
var rc4 = require('../../utils/crypto-js.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errBox: {},
    // errtS: false,
    // errMsg: '',
  },
  formReset:function(){
    var that = this;
    that.onLoad();
  },
  userback: function () {
    wx.navigateBack({
      delta:1
    })
  },
  addUserSubmit:function(e){
    var that = this;
    if (util.trim(e.detail.value.addUname)==''){
      util.errBoxFunc1(that, '请输入用户名')
    } else if ((2 > util.trim(e.detail.value.addUname).length) || ((32 <= util.trim(e.detail.value.addUname).length))){
      util.errBoxFunc1(that, '用户名格式错误（2<=用户名长度<32）')
    } else if (util.trim(e.detail.value.addUpwd) == '') {
      util.errBoxFunc1(that, '请输入密码')
    } else if ((6 > util.trim(e.detail.value.addUpwd).length) || (32 <= util.trim(e.detail.value.addUpwd).length )){
      util.errBoxFunc1(that, '密码格式错误（6<=长度<32）')
    } else if (util.trim(e.detail.value.addUpwdy) == '') {
      util.errBoxFunc1(that, '请输入确认密码')
    } else if (util.trim(e.detail.value.addUpwdy) != (util.trim(e.detail.value.addUpwd))){
      util.errBoxFunc1(that, '两次输入密码不一致')
    }else{
      // 地址  请求地址
      if (that.data.roleVal == '2'){
        // 管理员
        var url = '&action=addDist&usr=' + util.trim(e.detail.value.addUname)
        var vcodeN = wx.getStorageSync('vcodeN')
        var vcodec = '';
        vcodec = vcodeN[0]
        for (var i = 1; i < vcodeN.length; i++) {
          vcodec += ',' + vcodeN[i]
        }
        url += '&vcode=' + vcodec
      } else if (that.data.roleVal == '0'){
        var url = '&action=addPlantOwner&usr=' + util.trim(e.detail.value.addUname)
      }
      if (util.trim(e.detail.value.addUemail) != '' && (((util.trim(e.detail.value.addUemail).length < 6) || ((util.trim(e.detail.value.addUemail).length >= 64))) )){
        util.errBoxFunc1(that, '邮箱格式错误（6<=邮箱长度<64）并包含@字符')
        return;
      } else if (util.trim(e.detail.value.addUemail) != '' &&(util.trim(e.detail.value.addUemail).indexOf("@") == -1)) {
        util.errBoxFunc1(that, '邮箱格式错误（6<=邮箱长度<64）并包含@字符')
        return;
      } else if (util.trim(e.detail.value.addUemail) != ''){
        url += '&email=' + e.detail.value.addUemail
      }
      if (util.trim(e.detail.value.addUNum) != '' && ((6 > util.trim(e.detail.value.addUNum).length) || (util.trim(e.detail.value.addUNum).length >= 32))) {
        util.errBoxFunc1(that, '电话号码格式错误（6<=号码长度<32）')
        return;
      } else if (util.trim(e.detail.value.addUNum) != ''){
        url += '&mobile=' + e.detail.value.addUNum
      }
      // 请求star
      var SHAaddUpwd = util.sha1(util.trim(e.detail.value.addUpwd)); 
      wx.getStorage({
        key: 'UAInfoRem_index',
        success: function (res) {
          var datAdm = res.data.datAdm
          var rcPWD = util.rc4(SHAaddUpwd, datAdm.secret)
          var cryptPwd = util.byte2hex(rcPWD)
          url += '&pwd=' + cryptPwd
          that.addDistFunc(that, url)
        }
        })
    }
  },
  // 16.2 创建经销商账号
  addDistFunc: function (that,url) {
    wx.showLoading({
      title: '加载中',
      mask: false,
    })
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        wx.hideLoading()
        util.toastOK(that,'创建成功')
        setTimeout(function(){
          wx.redirectTo({
            url: '/pages/user/user',
          })
        },1500)
      } else {
        wx.hideLoading()
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      wx.hideLoading()
      util.netWork(that)
      }, 'Manu', function () {
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;
  that.setData({
    roleVal: options.roleVal
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