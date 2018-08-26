import Promise from 'assets/promise'
import regeneratorRuntime from 'assets/regenerator'
import handleUserInfor from 'handlers/handleUserInfor'
import Request from 'utils/http'
import Tools from 'utils/tools'

App({
  onLaunch (opts) {
    this.globalData.opsCode = ops.scene
    if (this.globalData.opsCode === 1044) {
      this.globalData.shareTicket = ops.shareTicket
    }
  },
  async getShareId (cb) {
    let shareInfo, dolog
    try {
      shareInfo = await this.Tools.wxPromise(wx.getShareInfo)({
        shareTicket: this.globalData.shareTicket
      })
      dolog = await this.Http.get("/Share/decryptData", {
        dr_session: wx.getStorageSync("dr_session"),
        iv: shareInfo.iv,
        encryptedData: shareInfo.encryptedData
      })
      typeof cb == "function" && cb(shareInfo.data.info.openGId);  
    } catch (e) {
      console.log(e)
    }
  },
  async getUserInfo (cb) {
    let login, key, user, dolog
    if (this.globalData.userInfo && typeof cb == "function") {
      cb(this.globalData.userInfo)
      return
    }
    try {
      // 调用登录接口
      login = await this.Tools.wxPromise(wx.login)()

      // 获取session_key
      key = this.Http.get("/login/getSessionKey", { code: res.code })
      if (key.status == 0) {
        console.log('获取session_key失败: ' + key.data.msg)
      } else {
        wx.setStorage({ key: "dr_session", data: key.data.dr_session })
      }

      // 获取用户信息
      user = await handleUserInfor()
      if (!user) return
      Object.assign(this.globalData, {
        login: true,
        iv: user.iv,
        userInfo: user.userInfo,
        encryptedData: user.encryptedData
      })
      typeof cb == "function" && cb(this.globalData.userInfo);

      // 解密参数
      dolog = this.Http.get('/login/doLogin', {
        dr_session: wx.getStorageSync("dr_session"),
        encryptedData: user.encryptedData,
        iv: user.iv
      })
    } catch (e) {
      console.log(e)
    }
  },
  Http: new Request,
  Tools: new Tools,
  globalData:{
    login: false,
    userInfo: null,
    opsCode: 0,
    shareTicket: null
  }
})