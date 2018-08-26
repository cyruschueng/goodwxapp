//app.js
App({
  onLaunch: function () {


  },
  onShow: function (options) {
    var self = this;
    // console.log(self);
    console.log(options);
    if (options.scene == 1044) {
      self.globalData.shareTicket = options.shareTicket
      if (options.shareTicket) {
        if (self.globalData.sessionKey == null) {
          self.waitShareInfoAES = function (sessionKey,alwaysFun) {
            wx.getShareInfo({
              shareTicket: options.shareTicket,
              success: function (res) {
                wx.request({
                  url: self.webUrl + "/api/Share/ShareInfoAES",
                  method: "POST",
                  data: {
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    sessionKey: sessionKey
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: function (res) {
                    console.log(res)
                    var query = options.query
                    if (query.shareUserId && res.data.openGId && self.globalData.userInfoId && query.shareUserId != self.globalData.userInfoId) {
                      console.log(self.globalData.userInfoId + "在群" + res.data.openGId + "打开了" + query.shareUserId + "的分享")
                      self.logShareSuccess(self, query.shareUserId, self.globalData.userInfoId, undefined, "在群分享中打开", res.data.openGId)
                    }else{
                      console.log("异步解密分享信息出错");
                      console.log(query.shareUserId)
                      console.log(res.data.openGId)
                      console.log(self.globalData.userInfoId)
                    }
                    if (alwaysFun){
                      alwaysFun()
                    }
                  },
                  fail: function (obj) {
                    console.log("解密失败", obj)
                  }
                })
              }
            })
          }
        } else {
          wx.getShareInfo({
            shareTicket: options.shareTicket,
            success: function (res) {
              console.log(res)
              self.shareInfoAES(self, res, options.query)
            }
          })
        }
      }
    }

  },
  globalData: {
    userInfo: null,
    openId: null,
    userInfoId: null,
    sessionKey: null,
    shareTicket: null
  },
  webUrl: "https://smallpro.1194792182.com",
  // webUrl: "http://localhost:51193",
  updateUserInfo: (myApp, userInfo, afterSuccessFun) => {

    wx.request({
      url: myApp.webUrl + "/api/Base",
      method: "GET",
      data: {
        NickName: userInfo.nickName,
        AvatarUrl: userInfo.avatarUrl,
        OpenId: myApp.globalData.openId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        myApp.globalData.userInfoId = res.data.UserInfoId
        afterSuccessFun()
        // console.log(res)
      }
    })
  },
  shareInfoAES: function (app, res, query, successFun) {
    wx.request({
      url: app.webUrl + "/api/Share/ShareInfoAES",
      method: "POST",
      data: {
        encryptedData: res.encryptedData,
        iv: res.iv,
        sessionKey: app.globalData.sessionKey
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res)
        if (query.shareUserId && res.data.openGId && app.globalData.userInfoId && query.shareUserId != app.globalData.userInfoId) {
          console.log(app.globalData.userInfoId + "在群" + res.data.openGId + "打开了" + query.shareUserId + "的分享")
          app.logShareSuccess(app, query.shareUserId, app.globalData.userInfoId, undefined, "在群分享中打开", res.data.openGId)
        }

        if (successFun) {
          successFun(res)
        }
      },
      fail: function (obj) {
        console.log("解密失败", obj)
      }
    })
  },
  logShareSuccess: function (app, shareUserId, targetUserId, shareType, shareName, openGId) {
    wx.request({
      url: app.webUrl + "/api/Share/AddShareLogInfo",
      method: "POST",
      data: {
        ShareUserInfoId: shareUserId,
        TargetUserInfoId: targetUserId,
        ShareType: shareType == undefined ? -1 : shareType,
        ShareName: shareName,
        OpenGId: openGId == undefined ? "" : openGId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res);
        console.log("成功保存分享成功的记录");
      },
      fail: function (obj) {
        console.log("保存分享成功的记录失败")
      }
    })
  },
  logShare: function (app, shareUserId, shareType, shareName, openGId){
    wx.request({
      url: app.webUrl + "/api/Share/AddShareInfo",
      method: "POST",
      data: {
        ShareUserInfoId: shareUserId,
        ShareType: shareType == undefined ? -1 : shareType,
        ShareName: shareName,
        OpenGId: openGId == undefined ? "" : openGId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("成功保存分享记录");
      },
      fail: function (obj) {
        console.log("保存分享的记录失败")
      }
    })
  }
})