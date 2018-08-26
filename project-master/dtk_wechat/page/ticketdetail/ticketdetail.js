// ticketdetail.js
var common = require('../../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  id:'',
  msgList:[],
  loadingHidden:false,
  wechat: '../../image/wx.png',
  phoneimg: '../../image/phone.png',
  position: '../../image/position.png',
  city: '../../image/city.png',
  Introduction: '../../image/Introduction.png',
  yes: '../../image/yes.png',
  imgalistPic:'',
  imgalist: '',
  avatarname: '../../image/me.png',
  legalize_yes: '../../image/legalize_yes.svg',
  legalize_no: '../../image/legalize_no.svg',
  titledian: '../../image/dian.png',
  image04: '../../image/image04.png',
  image05: '../../image/image05.png',
  image06: '../../image/image06.png',
  call: '../../image/call.png',
  input: true,
  isEdit: false,
  isComfirm: true,
  draftprice: '',
  value: '',
  userId:'',
  uid:'',
  inputHidden:true,
  textHidden:false,
  sell_price:'',
  detailBox: true
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
    wx.getStorage({
      key:'userId',
      success:res=>this.setData({userId:res.data})
    })
    //获取storage的token
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data,
        })
        _this.ticketdetail(res.data)
      }
    })


  },
  ticketdetail: function (e) {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/drafts/sell/' + _this.data.id,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': e
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          var msgList = res.data.data[0];

          //汇票类型
          var draft_type = res.data.data[0].draft_type;
          if (draft_type == 1) {
            res.data.data[0]['draft_type'] ='银承纸票'
          } else if (draft_type == 2) {
            res.data.data[0]['draft_type'] = '商承纸票'
          } else if (draft_type == 3) {
            res.data.data[0]['draft_type'] = '银承电票'
          } else if (draft_type == 4) {
            res.data.data[0]['draft_type'] = '商承电票'
          }

          var str = res.data.data[0].draft_value;
          if (str == 0){
            msgList.draft_value = '不限'
          }else{
            var s = str.toString();
            msgList.draft_value = s.substring(0, s.length - 4) + '万元'
          }
          if (res.data.data[0].draft_type == 1 || res.data.data[0].draft_type == 3) {
            res.data.data[0]['cardImage'] = '../../image/businessdetail.png';
          } else {
            res.data.data[0]['cardImage'] = '../../image/silverblock.png';
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
          if (msgList.acceptance == '') {
            msgList.acceptance = '保密';
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
          //汇票张数
          if (msgList.draft_count == 0) {
            msgList.draft_count='不限'
          }
          //售价
          if (msgList.sell_price == 0) {
            msgList.sell_price = '不限'
          }
          _this.setData({
            msgList: msgList,
            imgalistPic: res.data.data[0].pics,
            loadingHidden: true,
            detailBox:false,
            draftprice:msgList.sell_price,
            value:msgList.sell_price,
            uid:msgList.creator.id,
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
  /**
     * 预览图片
     */
  previewImagePic: function (e) {
    var _this=this;
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: _this.data.imgalistPic // 需要预览的图片http链接列表
    })
  },
  previewImage: function (e) {
    var _this = this;
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [_this.data.imgalist] // 需要预览的图片http链接列表
    })
  },
  makePhoneCall: function () {
    var _this = this;
    var phoneNumber = _this.data.msgList.creator.user_id.substring(1, 12)
    wx.makePhoneCall({
      phoneNumber: phoneNumber
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
      title: '我要卖票'
    }
  },
  //监听修改售价
  sumChange: function (e) {
    this.setData({
      draftprice: e.detail.value
    })
  },
  //点击修改按钮
  edit: function () {
    this.setData({
      input: false,
      isEdit: true,
      isComfirm: false,
      inputHidden:false,
      textHidden:true
    })
  },
  //确认修改
  comfirmEdit: function () {
    if (this.data.draftprice=='不限'){
      var value = 0
    }else{
      var value = this.data.draftprice
    }
    var _this=this;
    wx.request({
      method: 'PUT',
      url: `${common.getRequestUrl}/dtk/drafts/sell/${this.data.id}/price`,
      header: {
        token: _this.data.tokenstorage,
        'Content-Type': 'application/json'
      },
      data: {
        value: value
      },
      success: res => {
        if (res.data.code !== 'OK') {
          wx.showToast({
            title: res.data.msg,
            image: '../../image/warn.png',
            duration: 2000
          })
        } else {
          _this.ticketdetail(_this.data.tokenstorage)
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          _this.setData({
            sell_price:value,
            input: true,
            isEdit: false,
            isComfirm: true,
            inputHidden:true,
            textHidden:false
          })
        }
      }
    })
  },
  //取消修改
  cancelEdit: function () {
    this.setData({
      input: true,
      isEdit: false,
      isComfirm: true,
      draftprice: this.data.value,
      inputHidden:true,
      textHidden:false
    })
  }
})
