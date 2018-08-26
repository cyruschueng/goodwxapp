import Request from './request'

export default class Authentication {
  constructor(opts = {}) {
    this.authenticated = false
    this.session = null
    this.sessionLocalStorageKey = opts.sessionLocalStorageKey || 'session'
    this.pendingTasks = []
    this.pendingGroupTasks = []
  }

  checkSession(successCallback) {
    wx.checkSession({
      success: () => {
        this.checkLocalSession(successCallback)
      },
      fail: () => this.login()
    })
  }

  executeAuthTask(callback) {
    if (this.authenticated) {
      callback(this.session)
    } else {
      this.pendingTasks.push(callback)
    }
  }

  executeGroupAuthTask(callback) {
    if (this.session && this.session.groupId) {
      callback(this.session)
    } else {
      this.pendingGroupTasks.push(callback)
    }
  }

  updateState(authenticated) {
    this.authenticated = authenticated

    if (authenticated) {
      this.pendingTasks.forEach(c => c(this.session))
      this.pendingTasks = []
    }
  }

  isTokenExpired(session = this.session) {
    let { expiredAt } = session

    return expiredAt ? (Date.now() / 1000 > expiredAt) : true
  }

  checkLocalSession(successCallback) {
    if (this.session) { return }

    wx.getStorage({
      key: this.sessionLocalStorageKey,
      success: ({ data }) => {
        if (this.isTokenExpired(data)) {
          wx.removeStorage({
            key: 'session',
            complete: () => this.login()
          })
        } else {
          this.session = data
          this.updateState(true)

          successCallback(data)
        }
      },
      fail: () => {
        this.login()
      }
    })
  }

  saveSession(data) {
    this.session = data

    wx.setStorage({
      key: this.sessionLocalStorageKey,
      data: data
    })
  }

  login() {
    this.updateState(false)

    wx.login({
      success: ({ code }) => {
        this.fetchSessionFromServer(code, (data) => {
          this.saveSession(data)

          this.updateState(true)
        })
      }, 
      fail: () => {
        this.updateState(false)

        console.log("Login Wechat failed!")
      }
    })
  }

  fetchSessionFromServer(code, callback) {
    Request.send({
      url: '/api/wechat/login',
      method: 'POST',
      data: {
        code: code,
      },
      success: (data) => {
        callback({
          token: data.token,
          expiredAt: data.expired_at,
          steamIdBound: data.steam_id_bound
        })
      },
      fail: () => {
        console.log("Can't get session data from server.")
      }
    })
  }

  upsertGroupId(encryptedData, iv) {
    Request.authSend(this, {
      url: '/api/wechat/users_groups',
      method: 'POST',
      data: {
        encrypted_data: encryptedData,
        iv: iv
      },
      success: (data) => {
        this.session.groupId = data.group_id

        this.pendingGroupTasks.forEach(c => c(this.session))
      }
    })
  }

  changeBound(bound, callback) {
    this.executeAuthTask((session) => {
      this.saveSession(
        Object.assign(session, { steamIdBound: bound })
      )

      callback(session)
    })
  }
}
