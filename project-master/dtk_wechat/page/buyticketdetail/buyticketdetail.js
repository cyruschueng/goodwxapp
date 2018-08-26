var common = require('../../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    msgList: [],
    loadingHidden: false,
    detailBox: true,
    image04: '../../image/image07.png',
    call: '../../image/call.png',
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
        _this.ticketdetail(res.data)
      }
    })
  },
  ticketdetail: function (e) {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/drafts/buy/' + _this.data.id,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': e
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          var msgList = res.data.data[0];
          if (msgList.draft_type == 1) {
            msgList.draft_type = '纸票 / 电票';
          } else if (msgList.draft_type == 2) {
            msgList.draft_type = '纸票';
          } else if (msgList.draft_type == 3) {
            msgList.draft_type = '电票';
          }
          for (var k = 0; k < msgList.draft_term.length; k++) {
            if (msgList.draft_term[k] == 1) {
              msgList.draft_term[k] = '不限'
            } else if (msgList.draft_term[k] == 2) {
              msgList.draft_term[k] = '1'
            } else if (msgList.draft_term[k] == 3) {
              msgList.draft_term[k] = '3'
            } else if (msgList.draft_term[k] == 4) {
              msgList.draft_term[k] = '6'
            } else if (msgList.draft_term[k] == 5) {
              msgList.draft_term[k] = '12'
            }
          }
          for (var z = 0; z < msgList.acceptance_type.length; z++) {
            if (msgList.acceptance_type[z] == 1) {
              msgList.acceptance_type[z] = '不限'
            } else if (msgList.acceptance_type[z] == 2) {
              msgList.acceptance_type[z] = '大商'
            } else if (msgList.acceptance_type[z] == 3) {
              msgList.acceptance_type[z] = '国股'
            } else if (msgList.acceptance_type[z] == 4) {
              msgList.acceptance_type[z] = '城商'
            } else if (msgList.acceptance_type[z] == 5) {
              msgList.acceptance_type[z] = '农商'
            } else if (msgList.acceptance_type[z] == 6) {
              msgList.acceptance_type[z] = '农信'
            } else if (msgList.acceptance_type[z] == 7) {
              msgList.acceptance_type[z] = '财司'
            }
          }
          for (var i = 0; i < msgList.draft_value.length; i++) {
            if (msgList.draft_value[i] == 1) {
              msgList.draft_value[i] = '不限'
            } else if (msgList.draft_value[i] == 2) {
              msgList.draft_value[i] = '5'
            } else if (msgList.draft_value[i] == 3) {
              msgList.draft_value[i] = '10'
            } else if (msgList.draft_value[i] == 4) {
              msgList.draft_value[i] = '20'
            } else if (msgList.draft_value[i] == 5) {
              msgList.draft_value[i] = '50'
            } else if (msgList.draft_value[i] == 6) {
              msgList.draft_value[i] = '100'
            } else if (msgList.draft_value[i] == 7) {
              msgList.draft_value[i] = '200'
            } else if (msgList.draft_value[i] == 8) {
              msgList.draft_value[i] = '300'
            } else if (msgList.draft_value[i] == 9) {
              msgList.draft_value[i] = '500'
            } else if (msgList.draft_value[i] == 10) {
              msgList.draft_value[i] = '1000'
            }
          }
          var draft_term = msgList.draft_term.sort(_this.sortNumber);
          var acceptance_type = msgList.acceptance_type;
          var draft_value = msgList.draft_value.sort(_this.sortNumber);
          msgList.draft_term = draft_term.join(' / ')
          msgList.acceptance_type = acceptance_type.join(' / ')
          msgList.draft_value = draft_value.join(' / ')

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
  //排序
  sortNumber: function (a, b) {
    return a - b
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
      title: '我要收票'
    }
  },
  makePhoneCall: function () {
    var _this = this;
    var phoneNumber = _this.data.msgList.creator.user_id.substring(1, 12)
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