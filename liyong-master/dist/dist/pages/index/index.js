import regeneratorRuntime from '../../lib/regenerator-runtime'
import { connect } from '../../lib/wechat-weapp-redux'
import { displayError, clearError } from '../../store/actions/loader'
import { fetchWeappEntry } from '../../store/actions/global'
import promisify from '../../lib/promisify'
import { defaultShareAppMessage, alertError, serialize } from '../../utils'
import { WEAPP_ENTRY_TYPE } from '../../constants'
import { getSessionId, postUserInfo } from '../../api/global'
import { setAuthHeader, setLocationHeader } from '../../api/_request'

const mapStateToData = state => {
  return {
    displayError: state.loader.displayError,

    scene: state.global.scene,
    shareTicket: state.global.shareTicket,
    entryPath: state.global.entryPath,
    entryQuery: state.global.entryQuery,
    entryType: state.global.entryType
  }
}

const mapDispatchToPage = dispatch => ({
  clearError: _ => dispatch(clearError()),
  displayError: error => dispatch(displayError(error)),
  fetchWeappEntry: ({ encryptedData, iv }) => dispatch(fetchWeappEntry({ encryptedData, iv }))
})

const pageConfig = {
  data: {
    WEAPP_ENTRY_TYPE
  },

  onShareAppMessage: defaultShareAppMessage,

  async onShow () {
    console.log('Index: onShow')
    wx.showShareMenu({
      withShareTicket: true
    })

    // @TODO remove.
    // add for test api
    setLocationHeader(1)

    const sessionId = wx.getStorageSync('sessionId')
    let existSession = true
    let needPostUserInfo = false

    try {
      await promisify(wx.checkSession)()
    } catch (err) {
      existSession = false
    }

    // login
    if (!sessionId || !existSession) {
      try {
        const { code } = await promisify(wx.login)()
        const { token } = await getSessionId(code)
        wx.setStorageSync('sessionId', token)
        setAuthHeader(token)
      } catch (error) {
        if (error.code === 500003) { // get sessionId => error
          needPostUserInfo = true
        } else {
          return this.displayError(error)
        }
      }
    }

    // register
    if (needPostUserInfo) {
      try {
        await promisify(wx.authorize)({ scope: 'scope.userInfo' })
        const { authSetting } = await promisify(wx.getSetting)()
        // 用户未授权 scope userInfo
        if (!authSetting['scope.userInfo']) {
          return this.handlerAuthFail()
        }
        const { encryptedData, iv, userInfo } = await promisify(wx.getUserInfo)({
          withCredentials: true
        })
        // get code again
        const { code } = await promisify(wx.login)()
        const { token } = await postUserInfo({ encryptedData, iv, code })
        setAuthHeader(token)
      } catch (error) {
        if (error.errMsg && error.errMsg.startsWith('authorize:fail')) {
          return this.handlerAuthFail()
        }
        return this.displayError(error)
      }
    }

    // get entry data
    const { scene, shareTicket, entryPath } = this.data
    try {
      wx.showLoading()
      let encryptedData, iv
      if (shareTicket) {
        const result = await promisify(wx.getShareInfo)({ shareTicket })
        encryptedData = result.encryptedData
        iv = result.iv
      }
      await this.fetchWeappEntry({ encryptedData, iv })
      // APPLY_HERO: 0, GROUP_QRCODE: 1, FORWARD_TO_GROUP: 2,
      // GROUP_NO_CREATE: 3, GROUP_NO_CLAIM: 4, GROUP_HOME: 5,
      // GROUP_MANAGE: 6,
      const { entryType, entryQuery } = this.data
      if (WEAPP_ENTRY_TYPE.GROUP_HOME === entryType) {
        if (entryPath != '/pages/index/index') {
          // wx.navigateBack()
          wx.redirectTo({ url: `${entryPath}?${serialize(entryQuery)}` })
        } else {
          wx.redirectTo({ url: '/pages/explore/selection/selection' })
        }
      } else if (WEAPP_ENTRY_TYPE.GROUP_MANAGE === entryType) {
        wx.redirectTo({ url: '/pages/group/manage/manage' })
      }
    } catch (error) {
      this.displayError(error)
    } finally {
      wx.hideLoading()
    }
  },

  reload () {
    this.clearError()
    this.onShow()
  },
  onUnload () {
    this.clearError()
  },

  async handlerAuthFail () {
    wx.setStorageSync('authFail', true)
    const modal = await promisify(wx.showModal)({
      title: '授权失败',
      content: '请允许使用用户信息',
      confirmText: '去授权',
      showCancel: false
    })
    if (modal.confirm) {
      wx.openSetting()
    }
  }
}

Page(
  connect(
    mapStateToData,
    mapDispatchToPage
  )(pageConfig)
)
