import { $wuxDialog } from '../../components/wux'
import Request from '../../utils/request'

var app = getApp()

Page({
  data: {
    lock: false,
    accounts: []
  },

  onLoad(options) {
    this.fetchSteamAccounts()

    wx.setNavigationBarTitle({
      title: 'Steam 帐号管理'
    })
  },

  onReady() {
    wx.hideShareMenu()
  },

  onShow() {
  
  },

  onHide() {
  
  },

  onUnload() {
  
  },

  onPullDownRefresh() {
  
  },

  onReachBottom() {
  
  },

  showRemoveIcon(e) {
    this.setData({ lock: true })

    this.changeStatusOfReadyToRemove(
      e.currentTarget.dataset.index, true
    )
  },

  checkAccountsAndRedirect() {
    if (this.data.accounts.length == 0) {
      app.changeBound(false)
    }
  },

  touchend() {
    if (this.data.lock) {
      setTimeout(() => {
        this.setData({ lock: false });
      }, 100);
    }
  },

  confirmForSwitchAccount(e) {
    if (this.data.lock) {
      return
    }

    let index = e.currentTarget.dataset.index
    let account = this.data.accounts[index]

    if (!account.valid) { 
      return 
    }

    $wuxDialog.confirm({
      title: '切换帐号',
      content: '你确定使用此帐号吗?',
      onConfirm: (e) => {
        this.switchDefaultSteamAccount(index)
      }
    })
  },

  confirmForDeleteAccount(event) {
    let index = event.currentTarget.dataset.index

    $wuxDialog.confirm({
      title: '删除帐号',
      content: '你确定删除此帐号吗?',
      onConfirm: (e) => {
        this.deleteSteamAccount(index)
      },
      onCancel: (e) => {
        this.changeStatusOfReadyToRemove(index, false)
      }
    })
  },

  changeStatusOfReadyToRemove(index, status) {
    this.setData({
      ['accounts[' + index + '].readyToRemove']: status
    })
  },

  // Server requests
  fetchSteamAccounts() {
    Request.authSend(app.authentication, {
      url: '/api/wechat/steam_accounts',
      success: (data) => {
        this.setData({
          accounts: data.map((account) => {
            return {
              id: account.id,
              accountId: account.account_id,
              avatars: account.avatars,
              default: account.default,
              displayName: account.display_name,
              valid: account.valid
            }
          })
        })

        this.checkAccountsAndRedirect()
      }
    })
  },

  switchDefaultSteamAccount(index) {
    let account = this.data.accounts[index]

    Request.authSend(app.authentication, {
      url: `/api/wechat/steam_accounts/${account.id}/default`,
      method: 'PATCH',
      success: (data) => {
        this.setData({
          accounts: this.data.accounts.map((account, i) => {
            account.default = i == index

            return account
          })
        })
      }
    })
  },

  deleteSteamAccount(index) {
    let account = this.data.accounts[index]

    Request.authSend(app.authentication, {
      url: `/api/wechat/steam_accounts/${account.id}`,
      method: 'DELETE',
      success: (data) => {
        this.setData({
          accounts: this.data.accounts.filter(i => i !== account)
        })

        this.checkAccountsAndRedirect()
      }
    })
  }
})
