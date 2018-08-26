// HomePage/apply/apply.js
const app = getApp()
const { wc, companyNo } = app
const { imgUrl, data, code, success } = wc

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        name: 'username',
        desc: '登录账号',
        holder: '请输入登录账号*必填',
        Type: 'text'
      },
      {
        name: 'password',
        desc: '登录密码',
        holder: '请输入登录密码*必填',
        Type: 'password'
      },
      {
        name: 'confirmPassword',
        desc: '确认密码',
        holder: '请输入确认密码*必填',
        Type: 'password'
      },
      {
        name: 'company_name',
        desc: '公司名称',
        holder: '请输入公司名称*必填',
        Type: 'text'
      },
      {
        name: 'charge_person',
        desc: '联系人',
        holder: '请输入联系人*必填',
        Type: 'text'
      },
      {
        name: 'phone',
        desc: '联系电话',
        holder: '限制至多11位数字*必填',
        Type: 'number',
        maxLength: 11
      }
    ],
    array: ['请选择公司归属地', '海口', '三亚'],
    arrayIndex: 0
  },
  register: function (e) {
    let thisData = this.data
    let formData = e.detail.value
    formData.attribution = thisData.array[thisData.arrayIndex]
    let registerData = {
      a: 'register',
      input: formData
    }
    for (let i in formData) {
      if (!formData[i]) {
        wc.showModal('请输入完整信息')
        return
      }
    }
    if (parseInt(thisData.arrayIndex) < 1) {
      wc.showModal(thisData.array[0])
      return
    }
    if (formData.password !== formData.confirmPassword) {
      wc.showModal('密码与确认密码不一致')
      return
    }
    if (formData.phone.length !== 11) {
      wc.showModal('请输入11位长度的手机号码')
      return
    }

    wc.get(registerData, (json) => {
      if (json[code] === parseInt(success)) {
        setTimeout(() => {
          wc.showToast(['注册成功，待审核'])
        }, 100)
        setTimeout(() => {
          wx.navigateTo({
            url: '/log/login/login',
          })
        }, 2100)
      } else {
        wc.showToast(['注册失败', 'loading', 3000])
      }
    })
  },
  changeAttr: function (e) {
    this.setData({
      arrayIndex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})