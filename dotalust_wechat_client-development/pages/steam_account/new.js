import Request from '../../utils/request'
import { $wuxDialog } from '../../components/wux'

var app = getApp()

Page({
  data: {
    userInfo: {}
  },

  formSubmit(e) {
    this.submitRequest(e.detail.value)
  },

  submitRequest(params) {
    Request.authSend(app.authentication, {
      url: '/api/wechat/steam_accounts',
      method: 'POST',
      data: {
        account_id: params.accountId
      },
      success: (data, response) => {
        console.log(response)
        if (response.statusCode == 200) {
          app.changeBound(true)

          wx.redirectTo({
            url: `/pages/loading/index?channel=account_sync:${data.id}`
          })
        } else if (response.statusCode == 422) {
          $wuxDialog.alert({
            title: data,
            content: ''
          })
        }
      }
    })
  },

  onLoad() {
    app.getUserInfo((userInfo) => {
      this.setData({
        userInfo: userInfo
      })
    })
  }
})
