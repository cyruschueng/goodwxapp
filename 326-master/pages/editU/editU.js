var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userStaIf:false,
    userdescIf: false,
    userpwdIf: false,
    usermobilIf: false,
    useremailIf: false,
    enableVal:'',
    optionId:'',
    optionUid:'',
    descVal:'',
    pwdVal:'',
    upwdVal: '',
    mobileVal: '',
    emailVal: '',
    errtS: false,
    errMsg: '',
  },
  descInput: function (e) {
    var that = this
    if (util.trim(e.detail.value) != null) {
      that.setData({
        descVal: util.trim(e.detail.value)
      })
    } 
  },
  // 输入密码
  pwdInput: function (e) {
    var that = this
    var www = that.data.upwdVal

    if (util.trim(e.detail.value) != null) {
      that.setData({
        pwdVal: util.trim(e.detail.value)
      })
    }
  },
  // 输入确认密码
  upwdInput: function (e) {
    var that = this
    var www = that.data.pwdVal

    if (util.trim(e.detail.value) != null) {
      that.setData({
        upwdVal: util.trim(e.detail.value)
      })
    }
  },
  mobileInput: function (e) {
    var that = this
    if (util.trim(e.detail.value) != null) {
      that.setData({
        mobileVal: util.trim(e.detail.value)
      })
    }
  },
  emailInput: function (e) {
    var that = this
    if (util.trim(e.detail.value) != null) {
      that.setData({
        emailVal: util.trim(e.detail.value)
      })
    }
  },
  radioStaChange:function(e){
    var that = this
    if(e.detail.value == 'openSta'){
      that.setData({
        enableVal:'true'
      })
    } else if (e.detail.value == "closeSta") {
      that.setData({
        enableVal: 'false'
      })
    }
  },
  userAdmInfoback:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  editUserAdmInfo:function(){
    var that = this;
    if (that.data.optionId == 'enableId') {
      // 改状态
      if (that.data.enableVal == ''){
        util.toast(that, '请选择操作')
      }else{
        var url = '&action=disableOrEnableAccount&uid=' + that.data.optionUid + '&enable=' + that.data.enableVal
        that.editUFunc(that, url)
      }
    } else if (that.data.optionId == 'pwdId'){
      // 重置密码 ???
      if (that.data.pwdVal == ''){
        util.toast(that, '请输入密码')
      } else if (that.data.pwdVal != '' && ((that.data.pwdVal.length < 6) ||(that.data.pwdVal.length>=32))){
        util.toast(that, '密码长度为6-32位')
      } else if (that.data.upwdVal == ''){
        util.toast(that, '请输入确认密码')
      } else if (that.data.pwdVal != '' && (that.data.pwdVal != that.data.upwdVal)){
        util.toast(that, '两次输入不一致')
      }else{
        // secret
        var datAdm = wx.getStorageSync('datAdm');
        var SHAsecret = util.sha1(datAdm.secret);
        var SHAaddUpwd = util.sha1(that.data.pwdVal);

        var rcPWD = util.rc4(SHAaddUpwd, SHAsecret)
        var cryptPwd = util.byte2hex(rcPWD)
        var url = '&action=resetSubUsrPassword&uid=' + that.data.optionUid + '&newpwd=' + cryptPwd
        that.editUFunc(that, url)
      }
    }else{
      var url = '&action=editSubAccount&uid=' + that.data.optionUid
      // 选择操作 可置空
      if (that.data.optionId == 'descId') {
        // 备注 
        url += '&desc=' + that.data.descVal
      } else if (that.data.optionId == 'mobilId') {
        // 手机号 
        if (that.data.mobileVal != '' && ((6 > that.data.mobileVal.length) || (that.data.mobileVal.length > 32))) {
          util.toast(that, '手机号为6~32位字符')
        }else{
          url += '&mobile=' + that.data.mobileVal
        }
      } else if (that.data.optionId == 'emailId') {
        // 邮箱 
        if (that.data.emailVal != '' && ((that.data.emailVal.length < 6) || (that.data.emailVal.length > 64))) {
          util.toast(that, '邮箱为6~64位')
        } else if (that.data.emailVal != '' && (that.data.emailVal.indexOf("@") == -1)) {
          util.toast(that, '邮箱格式包含"@"')
        }else{
          url += '&email=' + that.data.emailVal
        }
      } 
      that.editUFunc(that, url)
    } 
  },
  // 确定 提交请求
  editUFunc: function (that, url) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        wx.hideLoading()
        util.toastOK(that, '编辑成功')
        var accountArrOne = that.data.accountArrOne 
        setTimeout(function(){
          // 判断并将值传回
          if (that.data.optionId == 'enableId') {
            accountArrOne.enable = that.data.enableVal
            wx.redirectTo({
              url: '/pages/userAdmInfo/userAdmInfo?accountArrOne=' + JSON.stringify(accountArrOne),
            })
          } else if (that.data.optionId == 'descId') {
            accountArrOne.desc = that.data.descVal
            wx.redirectTo({
              url: '/pages/userAdmInfo/userAdmInfo?accountArrOne=' + JSON.stringify(accountArrOne),
            })
          } else if (that.data.optionId == 'pwdId') {
            accountArrOne.enableId = that.data.pwdVal
            wx.redirectTo({
              url: '/pages/userAdmInfo/userAdmInfo',
            })
          } else if (that.data.optionId == 'mobilId') {
            accountArrOne.mobile = that.data.mobileVal
            wx.redirectTo({
              url: '/pages/userAdmInfo/userAdmInfo?accountArrOne=' + JSON.stringify(accountArrOne),
            })
          } else if (that.data.optionId == 'emailId') {
            accountArrOne.email = that.data.emailVal
            wx.redirectTo({
              url: '/pages/userAdmInfo/userAdmInfo?accountArrOne=' + JSON.stringify(accountArrOne),
            })
          }
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
      optionId: options.id,
      optionUid: JSON.parse(options.accountArrOne).uid,
      accountArrOne: JSON.parse(options.accountArrOne)
    })
    if (options.id == 'enableId'){
      that.setData({
        userStaIf: true,
      })
    } else if (options.id == 'descId') {
      that.setData({
        userdescIf: true,
      })
    } else if (options.id == 'pwdId') {
      that.setData({
        userpwdIf: true,
      })
    } else if (options.id == 'mobilId') {
      that.setData({
        usermobilIf: true,
      })
    } else if (options.id == 'emailId') {
      that.setData({
        useremailIf: true,
      })
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
    var shareObj = util.shareFunc()
    return shareObj
  }
})