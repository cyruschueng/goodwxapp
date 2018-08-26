// 常用请求封装
import {
  loginPromisify,
  requestPromisify,
  getUserInfoPromisify,
  setClipboardDataPromisify,
  getStoragePromisify,
  getSettingPromisify,
  requestPaymentPromisify
} from 'Promisify.js'

import {config} from 'config.js'

let url = {
  login: `${config.commonHost}/login`,
  submitFormId: `${config.commonHost}/saveformid`,
  clipboardData: `${config.commonHost}/config/getappconfig`,
  pay: `${config.commonHost}/xcxpay/pay`,
  yewu: {
    addrecord: `${config.host}/idiom/addrecord`,
    idiom: `${config.host}/idiom/idiom`,
    pass: `${config.host}/idiom/myrecord`,
    addmoney: `${config.host}/idiom/addmoney`,
    cutmoney: `${config.host}/idiom/cutmoney`,
    sharegroup: `${config.host}/idiom/addgroup`,
    getgroup: `${config.host}/idiom/getqun`,
  },
  test: 'https://api.github.com/search/repositories'
}

module.exports = {
  /**
   * 登录方法，先进行 session 检查，过期的情况下才进行 login
   */
  login: function () {
    return getStoragePromisify({
      key: 'userClient'
    }).then(res => {
      if (res.data.Token && res.data.Expire && new Date().getTime() < res.data.Expire * 1000) {
        throw {
          code: 1,
          msg: 'Token 存在且未过期,无需 login',
          data: res.data
        }
      }
    }).then(loginPromisify).then(res => {
      if (res.code) {
        return requestPromisify({
          url: url.common.login,
          method: 'POST',
          data: {
            code: res.code
          },
          header: {
            cookie: `AppKey=${config.appid}`
          }
        })
      } else {
        console.log('用户 login 失败！')
        throw res.errMsg
      }
    }).then(res => {
      // console.log(res)
      if (res.f === 1) {
        // res.d: {Token: '', UserID: ''}
        wx.setStorage({
          key: 'userClient',
          data: res.d
        })
        return res.d
      } else {
        console.log('登录失败')
        return { Token: '', UserID: '' }
      }
    }).catch(err => {
      if (err.code) {
        return err.data
      } else {
        console.log('微信login调用失败')
        console.log(err)
      }
    })
  },
  /**
   * 登录方法增加 userInfo 参数(授权登录)
   * return: 1 已授权且登陆成功， 0 未授权， 2 已授权登录失败
   */
  loginWithUserinfo: function () {
    return this.getSetting().then(res => {
      if (!res) {
        // 未授权拿不到信息 返回false
        return 0
      } else {
        let promises = [
          loginPromisify().catch(err => { console.log(err) }),
          getUserInfoPromisify().catch(err => { console.log(err) })
        ]
        return Promise.all(promises).then(res => {
          console.log(res)
          // console.log(res[0].code)
          // console.log(res[1])
          let loginRes = res[0]
          let userInfoRes = res[1]
          if (loginRes && loginRes.code && userInfoRes && userInfoRes.userInfo) {
            return requestPromisify({
              url: url.login,
              method: 'POST',
              data: {
                code: loginRes.code,
                // userInfo: `{nickName: ${userInfoRes.userInfo.nickName || ''},avatarUrl: ${userInfoRes.userInfo.avatarUrl || ''}`
                nickName: userInfoRes.userInfo.nickName || '',
                avatarUrl: userInfoRes.userInfo.avatarUrl || ''
              },
              header: {
                cookie: `AppKey=${config.appid}`
              }
            })
          }
        }).then(res => {
          console.log(res)
          if (res.f === 1) {
            // res.d: {Expire: 1, Token: '', UserID: ''}
            wx.setStorage({
              key: 'userClient',
              data: res.d
            })
            return 1
          } else {
            console.log('登录失败')
            return 2
          }
        }).catch(err => { console.log(err) })
      }
    })
  },
  /**
   * 上传 formId
   * @param {* formId} formId
   * @param {* 1: 普通, 2: 支付} type
   */
  submitFormId: function (formId, type = 1) {
    return this.getUserClient().then(res => {
      if (res.Token === '') {
        throw '本地没有 Token 或 已失效'
      }
      let Token = res.Token
      return requestPromisify({
        url: url.common.submitFormId,
        method: 'POST',
        data: {
          formid: formId,
          type: type
        },
        header: {
          cookie: `AppKey=${config.appid};Token=${Token}`
        }
      })
    }).catch(err => {
      console.log(err)
    })
  },
  /**
 * 上传 Advid
 * @param {* advid} advid
 */
  submitAdvid: function (advID) {
    return this.getUserClient().then(res => {
      let Token = res.Token
      return requestPromisify({
        url: url.common.submitAdvid,
        method: 'POST',
        data: {
          advID: advID
        },
        header: {
          cookie: `AppKey=${config.appid};Token=${Token}`
        }
      })
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 微信支付
   * @param {* 支付金额} fee
   */
  pay: function (fee, from = '') {
    return this.login().then(res => {
      let Token = res.Token
      return requestPromisify({
        url: url.common.pay,
        data: {
          name: '打赏',
          fee: fee,
          from: from
        },
        header: {
          cookie: `AppKey=${config.appid};Token=${Token}`
        }
      })
    }).then(res => {
      let prepay_id = res.package.split('prepay_id=')
      if (prepay_id.length >= 2) {
        prepay_id = prepay_id[1]
        this.submitFormId(prepay_id, 2)
      }
      return requestPaymentPromisify({
        timeStamp: res.timeStamp,
        nonceStr: res.nonceStr,
        package: res.package,
        signType: res.signType,
        paySign: res.paySign
      })
    })
  },
  /**
   * 请求 API 获取内容，将内容复制在粘贴板上
   */
  setClipboardByApi: function () {
    requestPromisify({
      url: url.clipboardData,
      data: {
        AppID: config.appid
      }
    }).then(res => res.data).then(res => {
      if (res.m && res.m.Content) {
        return setClipboardDataPromisify({ data: res.m.Content })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 获取本地存储用户信息，返回格式： {Expire: 1, Token: '', UserID: ''}
   */
  getUserClient: function () {
    return getStoragePromisify({ key: 'userClient' }).then(res => {
      if (!res.data.Token) {
        throw '本地没有 Token ，登陆接口存在问题'
      } else {
        return res.data
      }
    })
  },
  /**
   * 获取用户 头像 昵称 等信息（wx.getUserInfo 的 promise 封装）
   */
  getUserInfo: function () {
    return getUserInfoPromisify()
  },
  /**
   * 获取用户 是否授权用户信息
   * return: true 已授权， false 未授权
   */
  getSetting: function () {
    return getSettingPromisify().then(res => {
      // console.log(res)
      if (res.authSetting['scope.userInfo']) {
        return true
      } else {
        return false
      }
    })
  },
  // --------------------------------------------------------  
  // 以下为业务 API 调用，调用后需要自己按照 Promise 用法写 catch 
  /*
  *添加初始化信息
  */
  addrecord: function () {
    return this.getUserClient().then(res => {
      let Token = res.Token
      return requestPromisify({
        url: url.yewu.addrecord,
        header: {
          cookie: `AppKey=${config.appid};Token=${Token}`
        }
      })
    })
  },
  /*
  *idiom方法 
  */
  idiom: function (passNUM) {
    return this.getUserClient().then(res => {
      let Token = res.Token
      return requestPromisify({
        url: url.yewu.idiom,
        data: {
          Pass: passNUM
        },
        header: {
          cookie: `AppKey=${config.appid};Token=${Token}`
        }
      })
    })
  },
  // 请求用户通关详情
  pass: function () {
    return this.getUserClient().then(res => {
      let Token = res.Token
      return requestPromisify({
        url: url.yewu.pass,
        header: {
          cookie: `AppKey=${config.appid};Token=${Token}`
        }
      })
    })
  },
  // 分享 通关 增加金币
  addmoney: function (type) {
    return this.getUserClient().then(res => {
      let Token = res.Token;
      let Type = type;
      return requestPromisify({
        url: url.yewu.addmoney,
        data: {
          Type: Type,
        },
        header: {
          cookie: `AppKey=${config.appid};Token=${Token}`
        }
      })
    })
  },
  // 提示减少金币
  cutmoney: function () {
    return this.getUserClient().then(res => {
      let Token = res.Token
      return requestPromisify({
        url: url.yewu.cutmoney,
        header: {
          cookie: `AppKey=${config.appid};Token=${Token}`
        }
      })
    })
  },
  // 分享到群组 
  // sharegroup: function (data,iv) {
  //   return this.getUserClient().then(res => {
  //     let Token = res.Token;
  //     let datas = data;
  //     let ivs = iv;
  //     return requestPromisify({
  //       url: url.yewu.sharegroup,
  //       method: 'POST',
  //       data:{
  //         encryptedData: datas,
  //         iv:ivs,
  //       },
  //       header: {
  //         cookie: `AppKey=${config.appid};Token=${Token}`
  //       }
  //     })
  //   })
  // },
  // 得到群组 用户
  getgroup: function (data, iv) {
    return this.getUserClient().then(res => {
      let Token = res.Token;
      let datas = data;
      let ivs = iv;
      return requestPromisify({
        url: url.yewu.getgroup,
        method: 'POST',
        data: {
          encryptedData: datas,
          iv: ivs,
        },
        header: {
          cookie: `AppKey=${config.appid};Token=${Token}`
        }
      })
    })
  },
  /**
   * 分享方法
   * @param {* 转发标题} title
   * @param {* 转发路径} sharePath
   * @param {* 自定义图片路径} imageUrl
   * @param {* 成功的回调函数} success
   * @param {* 失败的回调函数} fail
   */

  /**
   * 测试 Promise 封装请求接口
   */
  test: function () {
    return requestPromisify({
      url: url.test,
      data: {
        q: 'vscode',
        sort: 'stars',
        order: 'desc'
      }
    })
  }
}
