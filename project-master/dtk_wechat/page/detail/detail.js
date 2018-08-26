// detail.js
var common = require('../../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    title: '',
    tokenstorage: '',
    swapstorage:'',
    fundsvalue:'',
    userRole:'',
    user_id:'',
    abolition: '../../image/abolition.png',
    complete: '../../image/complete.png',
    msgList:'',
    image01: '../../image/image01.png',
    image02: '../../image/image02.png',
    image03: '../../image/image03.png',
    image04: '../../image/image07.png',
    userId: '',
    call: '../../image/call.png',
    detailBox: true,
    imgalist: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //获取storage的swap
    wx.getStorage({
      key: 'swapstorage',
      success: function (res) {
        _this.setData({
          swapstorage: res.data,
        })
      }
    })
    //获取storage的token
    wx.getStorage({
      key: 'userRole',
      success: function (res) {
        _this.setData({
          userRole: res.data,
        })
      }
    })
    //获取storage的token
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res.data+'我是登录用户id')
        _this.setData({
          userId: res.data,
        })
      }
    })
    this.setData({
      title: options.id
    })
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })
    //获取头像
    wx.getStorage({
      key: 'avatarInfo',
      success: function (res) {
        if (res.data == '') {
          _this.setData({
            avatar: '../../image/m1.png'
          })
        } else {
          _this.setData({
            avatar: res.data
          })
        }
      }
    })
    //获取storage的token
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data,
        })
        _this.sharedata(res.data)
      }
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
   
  onPullDownRefresh: function () {
    
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1000)
  },
*/
  /**
   * 页面上拉触底事件的处理函数
   
  onReachBottom: function () {

  },
*/
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '资金业务',
      path: '/page/detail/detail?id=' + this.data.title,
      success: function (res) {
        // 转发成功
        console.log(res.shareTickets[0]);
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },


  //换取 token
  exchangeToken: function () {
    console.log('换取 token');
    var _this = this;
    _this.setData({
      loadingHidden: false
    });
    wx.request({
      url: common.getRequestUrl + '/dtk/users/token',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'swap': this.data.swapstorage
      },
      success: function (res) {
        if (res.data.code !== 'OK') {
          wx.showToast({
            title: res.data.msg,
            icon: 'cancel',
            duration: 2000
          })
        } else {
          wx.setStorageSync('tokenstorage', res.data.token)
          _this.setData({
            tokenstorage: res.data.token,
            loadingHidden: true
          })

        }
      },
      fail: function (err) {
        console.log(err)
      }
    })

  },
  //获取信息
  sharedata: function (e) {
    console.log('---------------------------------------------------获取信息')
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/funds/' + _this.data.title,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': e
      },
      success: function (res) {
        console.log('success---------------------------------------------------' + res.data.code)
        if (res.data.code == 'OK') {
          console.log('OK---------------------------------------------------')
          _this.setData({
            loadingHidden: true,
            detailBox: false
          })
          //业务金额 0-1000000000，0时显示不限
          var str = res.data.data[0].funds_value;
          if (str == 0){
            var fundsvalue = '不限'
            res.data.data[0].fundsvalueunit = '金额'
          } else{
            var s = str.toString();
            var fundsvalue = s.substring(0, s.length - 4);
            res.data.data[0].fundsvalueunit = '万元'
          }
          var msgList = res.data.data[0];
          //未绑定手机号
          if (msgList.creator.user_id == null || msgList.creator.user_id == '') {
            msgList.creator.user_id = '(未绑定手机号)';
          }else{
            msgList.creator.user_id = '(' + msgList.creator.user_id+')';
          }
          //地址
          if (msgList.creator.address == null) {
            msgList.creator.address = '未知地点';
          }
          //公司
          if (msgList.creator.company == null) {
            msgList.creator.company = '保密';
          }
          if (msgList.creator.gender == 0) {
            msgList.creator.genderimage = '../../image/me.png';
            msgList.creator.addressimage = '../../image/position.png';
            msgList.creator.companyimage = '../../image/city.png';
          } else if (msgList.creator.gender == 1) {
            msgList.creator.genderimage = '../../image/man.png';
            msgList.creator.addressimage = '../../image/position.png';
            msgList.creator.companyimage = '../../image/city.png';
          } else if (msgList.creator.gender == 2) {
            msgList.creator.genderimage = '../../image/woman.png';
            msgList.creator.addressimage = '../../image/position.png';
            msgList.creator.companyimage = '../../image/city.png';
          }
          //业务期限0-1000，0时显示不限
          if (msgList.funds_duration == 0) {
            msgList.funds_duration = '面议';
            msgList.day = '';
          }else{
            msgList.day = '天';
          }
          //业务期限0-1000，0时显示不限
          if (msgList.yield_rate == 0) {
            msgList.yield_rate = '不限';
            msgList.yieldrateunit = '';
            msgList.yield_rate_item = '日收益率'
          }else{
            msgList.yieldrateunit = '‰';
            msgList.yield_rate_item = '日收益率'
          }
          _this.setData({
            msgList: msgList,
            user_id: res.data.data[0].creator.user_id,
            fundsvalue: fundsvalue,
            imgalist: res.data.data[0].creator.avatar
          })
        }else {
          console.log('不是okOK---------------------------------------------------')
          wx.showToast({
            title: res.data.msg,
            icon: 'cancel',
            duration: 1000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  //打电话
  makePhoneCall: function () {
    var _this = this;
    var phoneNumber = _this.data.user_id.substring(1, 12)
    wx.makePhoneCall({
      phoneNumber: phoneNumber
    })
  },
  /**
     * 预览图片
     */
  previewImage: function (e) {
    var _this = this;
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [_this.data.imgalist] // 需要预览的图片http链接列表
    })
  }
})