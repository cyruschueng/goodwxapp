//app.js
var SESSION_API_URL = "https://develop.mmmee.cn/cmd/qunxiao/public/index.php/index/wxlogin/authorize";
var LOGIN_API_URL = "https://develop.mmmee.cn/cmd/qunxiao/public/index.php/index/wxlogin/wxLogin";
var ShareInfo_API_URL = "https://develop.mmmee.cn/cmd/qunxiao/public/index.php/index/wxlogin/gid";
const utils = require('./utils/util');
App({
  onLaunch: function (options) {
    var app=this;
    console.log(options) 
    wx.removeStorageSync('isShare')
    /** 判断场景值，1044 为转发场景，包含shareTicket 参数 */
    if (options.scene == 1044){
      var shareTicket = ''
      shareTicket = options.shareTicket;
      wx.setStorageSync('isShare', true)
      wx.setStorageSync('shareTicket', shareTicket)
      //app.getShareInfo(shareTicket)
    }
  },
  getUserInfo: function (cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: res => {
          let code=res.code
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  // 登录获取wxBizKey
  checkInfo: function (cb){
    const that = this;
    try {
      var wxBizKey = wx.getStorageSync('wxBizKey');
      if (!wxBizKey || wxBizKey == "undefined") { //有值就保存，否则为空
        wxBizKey = "";
      }
    }
    catch (e) {
    }
    wx.checkSession({
      success:function(){
        console.log('checkSession success')
        wx.request({
          url: SESSION_API_URL,
          data: {
            wxBizKey: wxBizKey
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log('old.wxBizKey=' + wxBizKey)
            if (res.data.statusCode != '200') {//如果服务端没有记录，或者授权已过期
              console.log('需要重新登录')
              //调用登录接口
              wx.login({
                success: res => {
                  let code = res.code;
                  wx.getUserInfo({
                    success: function (res) {
                      that.globalData.userInfo = res.userInfo
                      login(cb, code, res.rawData, res.signature, res.encryptedData, res.iv)
                    },
                    fail: function (res) {
                      console.log('用户拒绝授权');
                    }
                  })
                }
              })
            } 
            else {
              typeof cb == "function" && cb();
            }
          }
        })
      },
      fail:function(){
        console.log('checkSession fail')
        //调用登录接口
        wx.login({
          success: res => {
            let code = res.code;
            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = res.userInfo
                login(cb, code, res.rawData, res.signature, res.encryptedData, res.iv)
              },
              fail: function (res) {
                console.log('用户拒绝授权');
              }
            })
          }
        })
      }
    })
  },
  // 获取从群分享进入小程序时的群信息
  getShareInfo: function (wxBizKey,shareTicket){
    const app = this;
    wx.getShareInfo({
      shareTicket: shareTicket,
      complete :res =>{
        postGid(wxBizKey, res)
      }
    })
  },
  globalData:{
    userInfo:null,
    basePath:'https://develop.mmmee.cn/cmd/qunxiao/public/index.php/index/',
    imgPath:'https://develop.mmmee.cn/cmd/qunxiao/public/uploads/'
  }
})

// 登录，重新获取wxBizKey
function login(cb,code, rawData,signature,encryptedData,iv) {
    wx.request({
      url: LOGIN_API_URL,
      data: {
        code: code,
        rawData: rawData,
        signature: signature,
        encryptedData: encryptedData,
        iv: iv
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        console.log(res)
        try {
          wx.setStorageSync('wxBizKey', res.data.wxBizKey);
          console.log('new.wxBizKey=' + wxBizKey)
        }catch (e) {
          typeof cb == "function" && cb();
        }
      }
    })  
}

// 提交群信息
function postGid(wxBizKey,res,cb){
  console.log('wxBizKey=' + wxBizKey + ',encryptedData=' + res.encryptedData + ',iv=' + res.iv)
  wx.request({
    url: ShareInfo_API_URL,
    data: {
      wxBizKey: wxBizKey,
      encryptedData: res.encryptedData,
      iv: res.iv
    },
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json'
    }, // 设置请求的 header
    success: res => {
      console.log(res)
      try {
        wx.setStorageSync('openGId', res.data.openGId)
      } catch (e) {
        typeof cb == "function" && cb();
      }
    }
  })
}
