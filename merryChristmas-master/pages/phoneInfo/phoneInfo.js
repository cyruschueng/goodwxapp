let app = getApp();
Page({
  data: {
    phone: '',
    name: '',
    wx: ''
  },
  onLoad() {
    this.setData({
      phone: wx.getStorageSync("user_phone") || '',
      name: wx.getStorageSync("user_name") || '',
      wx: wx.getStorageSync("user_wx") || ''
    })
  },
  edit(e, text) {
    this.setData({
      [text]: e.detail.value
    })
  },
  phoneEdit(e) {
    let that = this;
    let phone = e.detail.value;
    let myreg = /^(1+\d{10})|(159+\d{8})|(153+\d{8})$/;
    if (!myreg.test(phone)) {
      app.showModel('报错', '手机号码格式不正确');
      this.setData({
        phone: ''
      })
    } else {
      this.edit(e, 'phone')
    }
  },
  nameEdit(e) {
    this.edit(e, 'name')
  },
  wxEdit(e) {
    this.edit(e, 'wx')
  },
  bindPhone() {
    console.log(this.data)
    let that = this;
    if (this.data.phone == '') {
      app.showModel('提交失败', '请填写手机号码')
    } else {
      let requestData = {
        url: app.globalData.url + '/api/wechat/updateInfo',
        data: {
          openid:app.globalData.openid,
          mobile: that.data.phone,
          name: that.data.name,
          wechat: that.data.wx
        }
      }
      app.httpPost(that, requestData, res => {
        wx.setStorageSync('user_phone', that.data.phone);
        wx.setStorageSync('user_name', that.data.name);
        wx.setStorageSync('user_wx', that.data.wx);
        app.errorHide(that,'表单提交成功',1000)
        setTimeout(x=>{
          wx.navigateBack({
            delta: 1,
          })
        },1000)
      })
    }
  }
})