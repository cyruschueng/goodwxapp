var common = require('../../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    msgList: [],
    loadingHidden: false,
    phone: '',
    wechat: '../../image/wx.png',
    phoneimg: '../../image/phone.png',
    position: '../../image/position.png',
    city: '../../image/city.png',
    Introduction: '../../image/Introduction.png',
    yes: '../../image/yes.png',
    listboxinforole:'',
    avatarname: '../../image/me.png',
    legalize_yes: '../../image/legalize_yes.svg',
    legalize_no: '../../image/legalize_no.svg',
    titledian: '../../image/dian.png',
    call: '../../image/call.png',
    detailBox: true,
    tokenstorage:'',
    swapstorage:'',
    imgalist: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
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
      key: 'tokenstorage',
      success: function (res) {
        _this.carddetail(res.data)
        _this.setData({
          tokenstorage: res.data,
        })
      }
    })
  },
  carddetail: function (e) {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/advertisements/' + _this.data.id,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': e
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          var msgList = res.data.data[0];
          if (msgList.ad_status == 1) {
            msgList.ad_status = '不公开';
          } else if (msgList.ad_status == 2) {
            msgList.ad_status = '公开';
          }
          if (msgList.creator.user_id == null || msgList.creator.user_id == '') {
            msgList.creator.user_id = '(未绑定手机号)';
          } else {
            msgList.creator.user_id = '(' + msgList.creator.user_id + ')';
          }
          if (msgList.creator.address == null) {
            msgList.creator.address = '未知地点';
          }
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
          _this.setData({
            msgList: msgList,
            loadingHidden: true,
            phone: res.data.data[0].creator.user_id,
            detailBox:false,
            imgalist: res.data.data[0].creator.avatar
          });
        } else {
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
  makePhoneCall:function(){
    var _this=this;
    var phoneNumber = _this.data.phone.substring(1, 12)
    wx.makePhoneCall({
      phoneNumber: phoneNumber
    })
  },
  editCard:function(){
    var _this = this;
    wx.navigateTo({ url: '../cardadd/advertisements?id=' + _this.data.id })
  },
  deleteCard:function(){
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/cards/' + _this.data.id,
      method: 'DELETE',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': _this.data.tokenstorage
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.showToast({
            title: '删除成功',
            icon: 'cancel',
            duration: 1000
          })
        } else if (res.data.code == 'TOKEN_INVLID') {
          _this.exchangeToken()
        } else {
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
  //换取 token
  exchangeToken: function () {
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
      title: '业务推广'
    }
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