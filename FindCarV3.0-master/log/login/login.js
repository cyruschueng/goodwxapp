const app = getApp()
const wc = app.wc
const { data, code, success } = wc
Page({

  // 事件处理函数
  gotoRegisterTap: function () {
    wx.navigateTo({
      url: '/HomePage/apply/apply'
    })
  },
  login: function (e) {
    let formData = e.detail.value
    let phone = formData.phone
    let password = formData.password
    if (!phone || !password) {
      wc.showModal('请输入完整信息')
      return;
    }

    let loginData = {
      a: 'login',
      input: {
        account: phone,
        password: password
      }
    }

    wc.get(loginData, (json) => {
      if (json[code] === success) {
        app.companyNo = json[data].company_no
        wx.switchTab({
          url: '/HomePage/ZhaoCar/ZhaoCar'
        })
      } else {
        wc.showToast(['登录失败', 'loading', 3000])
      }
    })

  },
  onLoad: function () {

  }
})