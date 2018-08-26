// result.js
var app = getApp()
var RequestUtil = require("../../utils/RequestUtil.js");
let SnackBar = require("../../library/snackbar/snackbar.js")
let timer1 = null //检测获取最新缓存版本号的定时器
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultboxAreaShowed: false,
    resultArticleLoadShowed: false,
    resultArticleLoadNextShowed: true,
    resultArticleNoDataShowed: true,
    resultArticleFailDataShowed: true,
    topTitleBarShowed: true, // 
    // analysisBtnShowed: true, //用于控制焦点分析按钮显示状态
    titleFixed: false, // 用于控制媒体观点标题栏顶部定位
    titleOffsetTop: 0, // 用于存储媒体观点标题栏上边界距离
    pfFinalIcoShow: {
      app: true,
      portals: true,
      search_engine: true,
      weixin: false,
      weibo: true,
      bbs: true
    },
    keywordVal: '',
    keyword_rule: '',
    productFormIco: {
      portals: 'icon_web.svg',
      search_engine: 'icon_search.svg',
      bbs: 'icon_forum.svg',
      app: 'icon_new.svg',
      weixin: 'icon_lock.svg',
      weibo: 'icon_weibo.svg'
    },
    productFormScoreCal: {
      app: 0,
      portals: 0,
      search_engine: 0,
      weixin: 0,
      weibo: 0,
      bbs: 0
    },
    pfScore: {
      portals: '0',
      search_engine: '0',
      bbs: '0',
      app: '0',
      weixin: '0',
      weibo: '0'
    },
    resultArticleData: [], //定义上拉分页数据数组1
    titleSignCount: 0, //列表总条数
    skip: 1, //设置列表请求页数的值
    cacheVersion: null, //列表数据缓存版本号
    windowHeight: 667, //
    toView: 'inToView01',
    map: {}, //定义一个对象用于存储列表数据不同项分类（日期排序）
    analysisBtnAnimationData: {}, // 定义焦点分析按钮的动画对象
    createdUser: false, // 用户是否创建
  },
  scrollToViewFn: function (e) { 
   this.setData({ 
    toView: 'inToView2017-08-08' 
   }) 
   console.log(this.data.toView) 
  },
  /**
   * 微博、微信分类图标的点击事件，显示提示信息
   */
  lockTipsTap: function (event) {
    console.log('lockTipsTap')
    wx.showModal({
      title: '该功能尚未开通，敬请期待！',
      content: '',
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 媒体观点列表项的点击事件，传递页面数据参数
   */
  articleListTap: function (event) {
    console.log('articleListTap')
    console.log(event)
    let title_sign = event.currentTarget.dataset.article.title_sign
    title_sign = title_sign.replace('"', '')
    let keyword_rule = app.globalData.keywordRuleVal
    keyword_rule = JSON.stringify(keyword_rule)
    console.log(title_sign)
    let url = '../../pages/article/article?title_sign=' + title_sign + '&keyword_rule=' + keyword_rule 
    wx.navigateTo({
      url: url,
      success: function() {
        console.log('articleListTap url:', url)
        console.log('title_sign:', title_sign)
        console.log('keyword_rule:', keyword_rule)
      }
    })
  },

  /**
   * 获取用户信息
   */
  getUser: function() { 
    var self = this
    console.log('result getUser')
    let open_id = app.globalData.openid // 用户openID
    let get_userInfo_url = 'https://wxapp.ibiliang.com/util/wx/api/v1/user?open_id=' + open_id
    // 获取用户信息接口
    wx.request({
      url: get_userInfo_url, // 接口地址
      method: 'GET',
      success: function(res) {
        console.log('getUser res.data', res.data)
        if (res.data.user_info !== null) {
          self.setData({
            createdUser: true
          })
        }
      },
      fail: function (error) {
        console.log('获取用户信息失败！')
        console.log('get_userinfo_url error', error)
      }
    })
  },

  /**
   * PhoneNumber解码，获取用户手机号码
   */
  getPhoneNumber: function(e) { 
    console.log(e.detail.errMsg) 
    console.log(e.detail.iv) 
    console.log(e.detail.encryptedData)
    var self = this
    if (e.detail.encryptedData) {
      let hostname = app.globalData.hostname
      let session_key = app.globalData.session_key
      let phoneNumberEncryptedData = e.detail.encryptedData
      let phoneNumberIv = e.detail.iv
      let decrypt_url = 'https://' + hostname + '/api/v1/decrypt'
      let create_userInfo_url = 'https://wxapp.ibiliang.com/util/wx/api/v1/user'
      let open_id = app.globalData.openid // 用户openID
      let keyword_rule = app.globalData.keywordRuleVal
      keyword_rule = JSON.stringify(keyword_rule)
      let analysisReport_url = '../../pages/analysisReport/analysisReport?keyword_rule=' + keyword_rule
      let data = {
        app: 'focus-indicator',
        session_key: session_key,
        encrypted_data: phoneNumberEncryptedData,
        iv: phoneNumberIv
      }
      // 发起网络请求，上传session_key、shareInfoEncryptedData等信息
      wx.request({
        url: decrypt_url,
        method: 'POST',
        data: data,
        success: function(res) {
          console.log('getPhoneNumber request decrypt_url:',decrypt_url)
          console.log('getPhoneNumber解码网络请求成功', res)
          console.log('getPhoneNumber request data:',res.data)
          if (res.data.result) {
            let phone_data = {
              "app_id": 'wx9ea0feeb75ed925f', //
              "open_id": open_id, //
              "telephone": res.data.data.phoneNumber // 用户绑定的手机号（国外手机号会有区号）
            }
            console.log('create_userInfo_url', create_userInfo_url)
            console.log('phone_data', phone_data)
            // 创建用户信息接口
            wx.request({
              url: create_userInfo_url, // 接口地址
              method: 'POST',
              data: phone_data,
              success: function(resp) {
                console.log('创建用户成功！')
                console.log('resp.data', resp.data)
                self.setData({
                  createdUser: true
                })
                // 跳转页面到焦点分析页
                wx.navigateTo({
                  url: analysisReport_url,
                  success: function() {
                    console.log('analysisTap analysisReport_url:', analysisReport_url)
                  }
                })
              },
              fail: function (error) {
                console.log('创建用户失败！')
                console.log('create_userinfo_url error', error)
              }
            })
          }
        }
      })
    } else {
      // 提示用户手动激活会员卡
      wx.showModal({
        title: '获取手机号失败！',
        content: '提示：该功能需要获取手机号注册开通！',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  /**
   * 媒体观点分析点击事件，跳转到分析报告页面
   */
  analysisTap: function (event) {
    var self = this
    console.log('analysisTap', event)
    let keyword_rule = app.globalData.keywordRuleVal
    keyword_rule = JSON.stringify(keyword_rule)
    let analysisReport_url = '../../pages/analysisReport/analysisReport?keyword_rule=' + keyword_rule
    let open_id = app.globalData.openid // 用户openID
    let card_id = app.globalData.cardId // 卡券ID
    let card_url = 'https://wxapp.ibiliang.com/util/wx/api/v1/public/mini_program/user/card?mini_open_id=' + open_id + '&card_id=' + card_id // 获取是否已领取会员卡的接口地址
    console.log('card_url', card_url)
    let create_userInfo_url = 'https://wxapp.ibiliang.com/util/wx/api/v1/user'
    let get_userInfo_url = 'https://wxapp.ibiliang.com/util/wx/api/v1/user?open_id=' + open_id
    // 通过小程序openId和cardId获取是否已领取会员卡
    // wx.request({
    //   url: card_url, //接口地址
    //   success: function(res) {
    //     console.log('card_url', res.data)
    //     if (res.data.card_list.length < 1) {
    //       console.log('no membership card')
    //       // 执行领取会员卡流程
    //       self.getMembershipCard();
    //     } else {
    //       // 更新会员卡号数据
    //       if (res.data.card_list[0]) {
    //         app.globalData.memberCode = res.data.card_list[0].user_card_code;
    //         // 判断是否已经激活会员卡
    //         if (res.data.card_list[0].user_card_status === 'normal' && res.data.card_list[0].has_active) {
    //           // 跳转页面到焦点分析页
    //           wx.navigateTo({
    //             url: analysisReport_url,
    //             success: function() {
    //               console.log('analysisTap analysisReport_url:', analysisReport_url)
    //             }
    //           })
    //         } else {
    //           let cardCode = res.data.card_list[0].user_card_code
    //           // 查看微信卡包中的卡券
    //           wx.openCard({
    //             cardList: [
    //               {
    //                 cardId: card_id, // 卡券id
    //                 code: cardCode // 卡号，用解密后的code
    //               }
    //             ],
    //             success: function(respons) {
    //               console.log('查看微信卡包中的卡券成功！')
    //               console.log('openCard success', respons)
    //             },
    //             fail: function(error) {
    //               console.log('查看微信卡包中的卡券失败！')
    //               console.log('openCard error', error)
    //               // 提示用户手动激活会员卡
    //               wx.showModal({
    //                 title: '会员卡已经创建成功，请前往激活！打开微信，进入【我】->【卡包】->选择【会员卡】下的会员卡->点击【激活会员卡】！',
    //                 content: '',
    //                 showCancel: false,
    //                 success: function(res) {
    //                   if (res.confirm) {
    //                     console.log('用户点击确定')
    //                   } else if (res.cancel) {
    //                     console.log('用户点击取消')
    //                   }
    //                 }
    //               })
    //             }
    //           })
    //         }
    //       }
    //     }
    //   },
    //   fail: function (error) {
    //     console.log('判断会员卡领取情况失败！')
    //     console.log('card_url error', error)
    //   }
    // })

    // 跳转页面到焦点分析页
    wx.navigateTo({
      url: analysisReport_url,
      success: function() {
        console.log('analysisTap analysisReport_url:', analysisReport_url)
      }
    })
  },

  /*
  * 领取会员卡
  * 
  */
  getMembershipCard: function() {
    var self = this
    console.log('result getMembershipCard')
    // let timestamp = (new Date()).valueOf(); // 获取时间戳，单位为毫秒
    let timestamp = Date.parse(new Date())/1000; // 获取时间戳，单位为秒
    let nonce_str = this.randomWord(false, 32) // 生成32位随机串
    let app_id = app.globalData.appId // 公众号的appID
    let open_id = app.globalData.openid // 用户openID
    let card_id = app.globalData.cardId // 卡券ID
    let signature_url = app.globalData.signatureUrl // 获取js-sdk签名的接口地址
    let decryptCode_url = app.globalData.decryptCodeUrl // 获取解码code的接口地址
    let save_url = app.globalData.saveUrl   // 领取后保存会员卡信息的接口地址
    let signature = ''
    let signature_data = {
      "app_id": app_id, // 公众号appid
      "type": "card", // 卡券签名
      "timestamp": timestamp, // 时间戳
      "nonce_str": nonce_str, // 随机字符串
      "card_id": card_id, // 卡券id
    }
    console.log('signature_data', signature_data)
    // 获取js-sdk签名
    wx.request({
      url: signature_url, //接口地址
      method: 'POST',
      data: signature_data,
      success: function(resp) {
        console.log('signature', resp.data)
        signature = resp.data.signature;
        let cardExt = {
          "timestamp": timestamp, // 时间戳
          "nonce_str": nonce_str, // 随机字符串
          "signature": signature, // 卡券签名
        }
        console.log('cardExt',cardExt)
        // 添加卡券
        wx.addCard({
          cardList: [
            {
              cardId: card_id,
              cardExt: JSON.stringify(cardExt)
            }
          ],
          success: function(respo) {
            console.log('respo.cardList', respo.cardList) // 卡券添加结果

            let encrypt_code = respo.cardList[0].code // 加密code，为用户领取到卡券的code加密后的字符串
            console.log('encrypt_code', encrypt_code)
            // code解码
            wx.request({
              url: decryptCode_url, // code解码地址
              method: 'POST',
              data: {
                "app_id": app_id, // 公众号appid
                "encrypt_code": encrypt_code  // 加密code
              },
              success: function(respon) {
                console.log('respon.data', respon.data)
                let decryptCode = respon.data.code
                // 保存会员卡信息接口
                wx.request({
                  url: save_url, // 接口地址
                  method: 'POST',
                  data: {
                    "mini_open_id": open_id, // 小程序openid
                    "card_id": card_id, // 卡券id
                    "code": decryptCode // 卡号，用解密后的code
                  },
                  success: function(res) {
                    console.log('res.data', res.data)
                    // 查看微信卡包中的卡券
                    wx.openCard({
                      cardList: [
                        {
                          cardId: card_id, // 卡券id
                          code: decryptCode // 卡号，用解密后的code
                        }
                      ],
                      success: function(respons) {
                        console.log('查看微信卡包中的卡券成功！')
                        console.log('openCard success', respons)
                      },
                      fail: function(error) {
                        console.log('查看微信卡包中的卡券失败！')
                        console.log('openCard error', error)
                        // 提示用户手动激活会员卡
                        wx.showModal({
                          title: '会员卡已经创建成功，请前往激活！打开微信，进入【我】->【卡包】->选择【会员卡】下的会员卡->点击【激活会员卡】！',
                          content: '',
                          showCancel: false,
                          success: function(res) {
                            if (res.confirm) {
                              console.log('用户点击确定')
                            } else if (res.cancel) {
                              console.log('用户点击取消')
                            }
                          }
                        })
                      }
                    })
                  },
                  fail: function (error) {
                    console.log('保存会员卡失败！')
                    console.log('save_url error', error)
                  }
                })
              },
              fail: function (error) {
                console.log('解码失败！')
                console.log('decryptCode_url error', error)
              }
            })
          }
        })
      },
      fail: function (error) {
        console.log('获取js-sdk签名失败！')
        console.log('signature_url error', error)
      }
    })
  },

  /*
  * randomWord 产生任意长度随机字母数字组合
  * randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
  * 例：生成3-32位随机串：randomWord(true, 3, 32)
  * 例：生成43位随机串：randomWord(false, 43)
  */
  randomWord: function(randomFlag, min, max) {
    var str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
      let pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  },

  /**
   * 通过 WebSocket 连接发送消息，获取最终分数
   */
  getScoreJsonrpc: function () {
    var self = this
    let source_keyword = app.globalData.keywordRuleVal.source_keyword
    let keyword_rule = app.globalData.keywordRuleVal
    let condition = {"keyword_rule": keyword_rule}
    let openid = app.globalData.openid
    RequestUtil.call(
      'focus_indicator_score', 
      {
        "keyword": source_keyword,
        "condition": condition,
        "document_id": openid
      }, 
      function(result) {
        console.log('successCb focus_indicator_score', result)
        if (result) {
          // let scores = JSON.parse(result);
          let scores = result;
          // 更新页面总分、分类分数数据
          self.setData({
            finalCrisisScore: scores.total_score,
            pfScore: scores.pf_score,
            titleSignCount: scores.title_sign_count,
            mediaCount: scores.media_count
          });
        }
      },
      function(error) {
        console.log('errorCb focus_indicator_score', error)
      }
    )
  },

  /**
   * 通过 WebSocket 连接发送消息，获取列表
   */
  // getTitleSignJsonrpc: function () {
  //   var self = this
  //   let keyword_rule = app.globalData.keywordRuleVal
  //   let skip = this.data.skip
  //   let source_keyword = app.globalData.keywordRuleVal.source_keyword
  //   let condition = {"keyword_rule": keyword_rule, "skip": skip}
  //   let openid = app.globalData.openid
  //   RequestUtil.call(
  //     'media_vane_title_sign_list', 
  //     {
  //       "keyword": source_keyword,
  //       "condition": condition,
  //       "document_id": openid
  //     }, 
  //     function(result) {
  //       console.log('successCb media_vane_title_sign_list', result)
  //       if (result) {
  //         try {
  //           let articles = result;
  //           // result为false显示加载失败
  //           if (articles.result == false) {
  //             self.setData({
  //               resultArticleLoadShowed: true,
  //               resultArticleFailDataShowed: false
  //             });
  //           }
  //           // 没有列表数据显示暂无数据
  //           if (articles.length == 0) {
  //             self.setData({
  //               resultArticleLoadShowed: true,
  //               resultArticleNoDataShowed: false
  //             });
  //           }
  //           // 正常显示列表数据
  //           if (articles.length > 0) {
  //             // 截取时间，只显示到年月日
  //             for (var i = 0; i < articles.length; i++) {
  //               let date = articles[i].publish_at.slice(0, 10)
  //               articles[i].publish_at = date
  //             }
  //             try {
  //               self.setData({
  //                 resultArticleLoadShowed: true,
  //                 resultArticleFailDataShowed: true,
  //                 resultArticleData: articles
  //               });
  //             } catch (err) {
  //               console.log(err)
  //             }
  //             self.data.skip = skip + 100
  //           }
  //         } catch (error) {
  //           console.log(error)
  //           self.setData({
  //             resultArticleLoadShowed: true,
  //             resultArticleFailDataShowed: false
  //           });
  //         }
  //       }
  //       else {
  //         self.setData({
  //           resultArticleLoadShowed: true,
  //           resultArticleFailDataShowed: false
  //         });
  //       }
  //     },
  //     function(error) {
  //       console.log('errorCb media_vane_title_sign_list', error)
  //     }
  //   )
  // },

  /**
   * 通过 WebSocket 连接发送消息，获取列表数据，实现上拉刷新列表
   * 由于微信官方规定：
   * 1、直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
   * 2、单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
   * 这里设置当列表数据 titleSignCount 大于400条时开始第二个数组及模版接收列表数据。
   */
  // loadTitleSignJsonrpc: function () {
  //   var self = this
  //   let keyword_rule = app.globalData.keywordRuleVal
  //   let skip = this.data.skip
  //   let source_keyword = app.globalData.keywordRuleVal.source_keyword
  //   let condition = {"keyword_rule": keyword_rule, "skip": skip}
  //   let openid = app.globalData.openid
  //   let titleSignCount = this.data.titleSignCount
  //   let resultArticleData = this.data.resultArticleData
  //   let resultArticleData2 = this.data.resultArticleData2
  //   let listDataLength = resultArticleData.length + resultArticleData2.length
  //   if (listDataLength < titleSignCount && listDataLength < 600) {
  //     this.setData({
  //       resultArticleLoadShowed: false
  //     });
  //     RequestUtil.call(
  //       'media_vane_title_sign_list', 
  //       {
  //         "keyword": source_keyword,
  //         "condition": condition,
  //         "document_id": openid
  //       }, 
  //       function(result) {
  //         console.log('successCb media_vane_title_sign_list ', result)
  //         // for (let key in result) {
  //         //   if (result[key].abstract) {
  //         //     result[key].abstract = ''
  //         //   }
  //         // } 
  //         if (result) {
  //           try {
  //             let articles = result;
  //             if (result.result == false) {
  //               self.setData({
  //                 resultArticleLoadShowed: true
  //               });
  //               return
  //             }
  //             for (var i = 0; i < articles.length; i++) {
  //               let date = articles[i].publish_at.slice(0, 10)
  //               articles[i].publish_at = date
  //             }
  //             if (listDataLength < 400) {
  //               self.setData({
  //                 resultArticleData: resultArticleData.concat(articles),
  //                 resultArticleLoadShowed: true
  //               });
  //             }
  //             else if (listDataLength > 399 && listDataLength < 800) {
  //               try {
  //                 self.setData({
  //                   resultArticleData2: resultArticleData2.concat(articles),
  //                   resultArticleLoadShowed: true
  //                 });
  //               } catch (err) {
  //                 console.log(err)
  //                 self.setData({
  //                   resultArticleLoadShowed: true
  //                 });
  //               }
  //             }
  //             self.data.skip = skip + 100
  //           } catch (error) {
  //             console.log(error)
  //             self.setData({
  //               resultArticleLoadShowed: true
  //             });
  //           }
  //         }
  //       },
  //       function(error) {
  //         console.log('errorCb media_vane_title_sign_list', error)
  //       }
  //     )
  //   }
  //   // else if (listDataLength > 899) {
  //   //   this.setData({
  //   //     resultArticleLoadShowed: true
  //   //   });
  //   // }
  // },

  /**
   * 通过 WebSocket 连接发送消息，获取最新缓存版本号，用于判断列表数据是否更新
   */
  getCacheVersion: function () {
    console.log('result getCacheVersion')
    let self = this
    let source_keyword = app.globalData.keywordRuleVal.source_keyword
    let keyword_rule = app.globalData.keywordRuleVal
    let condition = {"keyword_rule": keyword_rule}
    let openid = app.globalData.openid
    let cacheVersion = this.data.cacheVersion
    RequestUtil.call(
      'fi_cache_version', 
      {
        "keyword": source_keyword,
        "condition": condition,
        "document_id": openid
      }, 
      function(result) {
        console.log('successCb fi_cache_version', result) 
        if (cacheVersion) {
          // 判断版本号是否改变，即redis缓存数据改变，可提示更新数据
          if (result.version != cacheVersion) {
            // SnackBar底部提示栏，用于提醒用户更新列表数据
            SnackBar.getInstance().make({
              snack_title: "发现媒体观点有新的数据可更新",
              snack_action: '马上更新',
              onActionClick: "onUpdateList",
              duration: 20000,
              style_snack_action: 'display: block; border-radius: 5px;',
              style_snackbar: 'background-color:rgba(0, 0, 0, 0.6);',
              cancelSnackBarTap: 'cancelSnackBarTap'
            })
            // 更新列表数据版本号
            self.data.cacheVersion = result.version
          }
        }else {
          // 缓存当前列表数据版本号
          self.data.cacheVersion = result.version
        }
      },
      function(error) {
        console.log('errorCb fi_cache_version', error)
      }
    )
  },

  /**
   * snackbar点击事件，显示提示信息
   */
  snackbarTap: function () {
    console.log('result snackbarTap')
    SnackBar.getInstance().make({
      snack_title: "发现媒体观点有新的数据可更新",
      snack_action: '马上更新',
      onActionClick: "onUpdateList",
      duration: 10000,
      style_snack_action: 'display: block; border-radius: 5px;',
      style_snackbar: 'background-color:rgba(0, 0, 0, 0.6);',
      cancelSnackBarTap: 'cancelSnackBarTap'
    })
  },

  /**
   * snackbar提示栏的onUpdateList点击事件，更新列表数据
   */
  onUpdateList: function () {
    console.log('result onActionClick')
    // 隐藏提示栏
    SnackBar.getInstance().hide();
    // 初始化列表数据
    this.data.skip = 1;
    this.setData({
      resultArticleLoadShowed: false,
      resultArticleData: []
    });
    // 获取带时间排序的列表
    this.getTitleSignListJsonrpc()
  },

  /**
   * 隐藏snackbar提示栏的点击事件函数
   */
  cancelSnackBarTap: function () {
    console.log('result cancelSnackBarTap')
    // 隐藏提示栏
    SnackBar.getInstance().hide();
  },

  /**
   * 设定定时器，获取redis版本号，开启snackbar提示栏提示用户可更新列表数据
   */
  detectCacheVersion: function () {
    console.log('result detectCacheVersion')
    // 关闭检测获取最新缓存版本号的定时器timer1
    clearInterval(timer1);
    // 开启检测获取最新缓存版本号的定时器timer1
    timer1 = setInterval(() => {
      console.log('detectCacheVersion setInterval timer1')
      // 获取最新缓存版本号
      this.getCacheVersion()
    }, 60000)
  },

  /**
   * 通过 WebSocket 连接发送消息，获取列表数据
   */
  getTitleSignListJsonrpc: function () {
    var self = this
    let source_keyword = app.globalData.keywordRuleVal.source_keyword
    let skip = this.data.skip
    let keyword_rule = app.globalData.keywordRuleVal
    let condition = {"keyword_rule": keyword_rule, "skip": skip, "sort": 'default'}
    let openid = app.globalData.openid
    console.log(openid)
    RequestUtil.call(
      'fi_title_sign_list', 
      {
        "keyword": source_keyword,
        "condition": condition,
        "document_id": openid
      }, 
      function(res) {
        console.log('getTitleSignListJsonrpc successCb:', res)
        // 判断是否为jsonstream数据类型带stream_id，或result直接返回列表数据结果。
        if (res.stream_id) {
          console.log('getTitleSignListJsonrpc stream_id:', res.stream_id)
          self.data.stream_id = res.stream_id
          // 开启订阅Jsonstream结果
          self.subscribeJsonstream(res.stream_id)
        } else {
          console.log('getTitleSignListJsonrpc directionResult')
          // 直接返回了result列表jsonrpc数据结果，直接调用jsonrpc数据处理
          self.jsonrpcDataFormat(res)
        }
      },
      function(res) {
        console.log('getTitleSignListJsonrpc errorCb:', res)
        self.setData({
          resultArticleLoadShowed: true,
          resultArticleNoDataShowed: false
        })
      }
    );
  },

  /**
   * 订阅Jsonstream进度
   */
  subscribeJsonstream: function (streamId) {
    var self = this
    let stream_id = streamId
    console.log('result subscribeJsonstream stream_id:',stream_id)
    RequestUtil.subscribeJsonStream(
      stream_id,
      function(begin) {
        console.log('begin data', begin);
        
      },
      function(add) {
        console.log('add data', add);
        
      },
      function(end) {
        console.log('end data', end);
        
      },
      function(result) {
        console.log('result data', result);
        // jsonstream列表数据处理
        self.jsonstreamDataFormat(result)
      }
    )
  },

  /**
   * jsonstream列表数据处理
   */
  jsonstreamDataFormat: function (result) {
    var self = this
    if (result) {
      try {
        let articles = result.data.title_sign_list;
        // result为false显示加载失败
        if (result.data.result == false) {
          self.setData({
            resultArticleLoadShowed: true,
            resultArticleFailDataShowed: false
          });
          return
        }
        // 没有列表数据显示暂无数据
        if (articles.length == 0) {
          self.setData({
            resultArticleLoadShowed: true,
            resultArticleNoDataShowed: false
          });
        }
        // 正常显示列表数据
        if (articles.length > 0) {
          // articles = articles.slice(0, 100);
          // 截取时间，只显示到年月日
          for (var i = 0; i < articles.length; i++) {
            let date = articles[i].publish_at.slice(0, 10)
            articles[i].publish_at = date
          }
          // json数组数据分类分组处理
          let map = {} //定义一个对象用于存储不同项分类
          let dest = [] //定义一个数组用于存储分类分组后的数组
          // 遍历json数组中每一个对象数据
          for (let i = 0; i < articles.length; i++) {
            let art_i = articles[i];
            // 将发布时间中带00:00:00的过滤，只显示到年月日
            art_i.publish_at = art_i.publish_at.replace('00:00:00', '')
            // 判断是否为新的分类
            if (!map[art_i.publish_at]) {
              // 存入新的一类数据
              dest.push({
                publish_at: art_i.publish_at,
                data: [art_i]
              });
              // 把新的不同分类判断的存入map
              map[art_i.publish_at] = art_i;
            } else {
              // 将相同的存入对应一组分类中
              for (let j = 0; j < dest.length; j++) {
                let dj = dest[j];
                if (dj.publish_at == art_i.publish_at) {
                  dj.data.push(art_i);
                  break;
                }
              }
            }
          }
          try {
            self.setData({
              resultArticleLoadShowed: true,
              resultArticleFailDataShowed: true,
              resultArticleData: dest
            });
          } catch (err) {
            console.log(err)
          }
          console.log('articles:', dest)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      self.setData({
        resultArticleLoadShowed: true,
        resultArticleFailDataShowed: false
      });
    }
  },
  
  /**
   * jsonrpc列表数据处理
   */
  jsonrpcDataFormat: function (result) {
    var self = this
    try {
      let articles = result;
      // result为false显示加载失败
      // if (result.data.result == false) {
      //   self.setData({
      //     resultArticleLoadShowed: true,
      //     resultArticleFailDataShowed: false
      //   });
      //   return
      // }
      // 没有列表数据显示暂无数据
      if (articles.length == 0) {
        this.setData({
          resultArticleLoadShowed: true,
          resultArticleNoDataShowed: false
        });
      }
      // 正常显示列表数据
      if (articles.length > 0) {
        // json数组数据分类分组处理
        let map = {} //定义一个对象用于存储不同项分类
        let dest = [] //定义一个数组用于存储分类分组后的数组
        // 遍历json数组中每一个对象数据
        for (let i = 0; i < articles.length; i++) {
          let art_i = articles[i];
          // 判断是否为新的分类
          if (!map[art_i.publish_at]) {
            // 存入新的一类数据
            dest.push({
              publish_at: art_i.publish_at,
              data: [art_i]
            });
            // 把新的不同分类判断的存入map
            map[art_i.publish_at] = art_i;
          } else {
            // 将相同的存入对应一组分类中
            for (let j = 0; j < dest.length; j++) {
              let dj = dest[j];
              if (dj.publish_at == art_i.publish_at) {
                dj.data.push(art_i);
                break;
              }
            }
          }
        }
        // 更新用于存储列表不同项分类的数据
        this.data.map = map
        // 增加对象成员count，用于统计对应日期内相同文章条数
        for (let i = 0; i < dest.length; i++) {
          dest[i].count = 0
          for (let j = 0; j < dest[i].data.length; j++) {
            dest[i].count += dest[i].data[j].media_num;
          }
        }
        // 更新页面数据
        try {
          this.setData({
            resultArticleLoadShowed: true,
            resultArticleFailDataShowed: true,
            analysisBtnShowed: true,
            resultArticleData: dest
          });
          // 焦点分析按钮动画
          this.analysisBtnAnimation()
        } catch (err) {
          console.log(err)
        }
        console.log('articles:', dest)
      }
    } catch (error) {
      console.log(error)
    }
  },

  /**
   * 通过 WebSocket 连接发送消息，获取
   */
  getTitleSignListJsonrpcNext: function () {
    var self = this
    let source_keyword = app.globalData.keywordRuleVal.source_keyword
    let skip = this.data.skip + 100
    // 更新列表页码数据
    this.data.skip = skip
    let keyword_rule = app.globalData.keywordRuleVal
    let condition = {"keyword_rule": keyword_rule, "skip": skip, "sort": 'default'}
    let openid = app.globalData.openid
    console.log(openid)
    // 
    this.setData({
      resultArticleLoadNextShowed: false
    });
    // 
    RequestUtil.call(
      'fi_title_sign_list', 
      {
        "keyword": source_keyword,
        "condition": condition,
        "document_id": openid
      }, 
      function(res) {
        console.log('getTitleSignListJsonrpcNext successCb:', res)
        // 判断是否为jsonstream数据类型带stream_id，或result直接返回列表数据结果。
        if (res.stream_id) {
          console.log('getTitleSignListJsonrpcNext stream_id:', res.stream_id)
          self.data.stream_id = res.stream_id
          // 开启订阅Jsonstream结果
          self.subscribeJsonstream(res.stream_id)
        } else {
          console.log('getTitleSignListJsonrpcNext directionResult')
          if (res.result == false) {
            self.setData({
              resultArticleLoadNextShowed: true
            });
          } else {
            // 直接返回了result列表jsonrpc数据结果，直接调用jsonrpc数据处理
            self.jsonrpcDataFormatNext(res)
          }
        }
      },
      function(res) {
        console.log('getTitleSignListJsonrpcNext errorCb:', res)
      }
    );
  },

  /**
   * jsonrpc分页列表数据处理
   */
  jsonrpcDataFormatNext: function (res) {
    var self = this
    let resultArticleData = this.data.resultArticleData
    try {
      let articles = res;
      // 正常显示列表数据
      if (articles.length > 0) {
        // json数组数据分类分组处理
        let map = this.data.map //定义一个对象用于存储不同项分类
        let dest = resultArticleData //定义一个数组用于存储分类分组后的数组
        // 遍历json数组中每一个对象数据
        for (let i = 0; i < articles.length; i++) {
          let art_i = articles[i];
          // 判断是否为新的分类
          if (!map[art_i.publish_at]) {
            // 存入新的一类数据
            dest.push({
              publish_at: art_i.publish_at,
              data: [art_i]
            });
            // 把新的不同分类判断的存入map
            map[art_i.publish_at] = art_i;
          } else {
            // 将相同的存入对应一组分类中
            for (let j = 0; j < dest.length; j++) {
              let dj = dest[j];
              if (dj.publish_at == art_i.publish_at) {
                dj.data.push(art_i);
                break;
              }
            }
          }
        }
        // 更新用于存储列表不同项分类的数据
        this.data.map = map
        // 增加对象成员count，用于统计对应日期内相同文章条数
        for (let i = 0; i < dest.length; i++) {
          dest[i].count = 0
          for (let j = 0; j < dest[i].data.length; j++) {
            dest[i].count += dest[i].data[j].media_num;
          }
        }
        // 更新页面列表数据
        try {
          this.setData({
            resultArticleLoadNextShowed: true,
            resultArticleData: dest
          });
        } catch (err) {
          console.log(err)
          this.setData({
            resultArticleLoadNextShowed: true
          });
        }
        console.log('articles:', dest)
      }
    } catch (error) {
      console.log(error)
      this.setData({
        resultArticleLoadNextShowed: true
      });
    }
  },

  /**
   * 获取节点的相关信息，需要获取的字段在fields中指定。
   * 返回值是nodesRef对应的selectorQuery。
   */ 
  getFields: function(){
    wx.createSelectorQuery().select('#the-id').fields({
      dataset: true,
      size: true,
      scrollOffset: true,
      properties: ['scrollX', 'scrollY']
    }, function(res){
      console.log('res.dataset', res.dataset)
      console.log('res.width', res.width)
      console.log('res.height', res.height)
      console.log('res.scrollLeft', res.scrollLeft)
      console.log('res.scrollTop', res.scrollTop)
      console.log('res.scrollX', res.scrollX)
      console.log('res.scrollY', res.scrollY)
      // res.dataset    // 节点的dataset
      // res.width      // 节点的宽度
      // res.height     // 节点的高度
      // res.scrollLeft // 节点的水平滚动位置
      // res.scrollTop  // 节点的竖直滚动位置
      // res.scrollX    // 节点 scroll-x 属性的当前值
      // res.scrollY    // 节点 scroll-x 属性的当前值
    }).exec()
  },

  /**
   * 获取媒体观点标题栏节点信息函数
   * 添加节点的布局位置的查询请求，相对于显示区域，以像素为单位。
   * 返回的节点信息中，每个节点的位置用left、right、top、bottom、width、height字段描述。
   */
  getArticleTitleRect: function(){
    var self = this
    wx.createSelectorQuery().select('#articleTitleId').boundingClientRect(function(rect){
      // 媒体观点标题栏上边界距离
      self.data.titleOffsetTop = rect.top;
      // rect.id      // 节点的ID
      // rect.dataset // 节点的dataset
      // rect.left    // 节点的左边界坐标
      // rect.right   // 节点的右边界坐标
      // rect.top     // 节点的上边界坐标
      // rect.bottom  // 节点的下边界坐标
      // rect.width   // 节点的宽度
      // rect.height  // 节点的高度
    }).exec()
  },

  /**
   * 焦点分析按钮的动画。
   */ 
  analysisBtnAnimation: function(){
    console.log('result analysisBtnAnimation')
    var self = this
    // 创建按钮部分的动画实例
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
    })
    this.animation = animation
    // 按钮部分动画，先上移，然后下移回原位置，重复多次实现按钮弹跳效果
    for (var i = 0; i < 3; i++) {
      this.animation.translateY(-12).step()
      this.animation.translateY(0).step({ duration: 300, timingFunction: 'ease', delay: 50})
    }
    this.animation.translateY(-12).step()
    this.animation.translateY(0).step({ duration: 400, timingFunction: 'linear', delay: 50})

    // 创建阴影部分的动画实例
    var animationShadow = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
    })
    // 阴影部分动画，先缩小，然后放大回原型，配合按钮动画的频次执行
    for (var i = 0; i < 3; i++) {
      animationShadow.scale(0.5).step()
      animationShadow.scale(1).step({ duration: 300, timingFunction: 'ease', delay: 50})
    }
    animationShadow.scale(0.5).step()
    animationShadow.scale(1).step({ duration: 400, timingFunction: 'linear', delay: 50})
    animationShadow.opacity(0).step({ duration: 200, timingFunction: 'linear'})

    // 延时100毫秒后执行
    setTimeout(function() {
      this.setData({
        analysisBtnAnimationData:animation.export(),
        analysisBtnShadowAnimationData: animationShadow.export(),
      })
    }.bind(this), 100)

    // 延时3500毫秒后执行,即等待动画执行完成后,开启焦点分析按钮可点击
    setTimeout(function() {
      this.setData({
        analysisTapBind: true
      })
    }.bind(this), 3500)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('result onLoad')
    console.log(options)
    // 获取媒体观点标题栏节点信息
    this.getArticleTitleRect()
    // 获取用户是否创建
    // this.getUser()
    // 设置可滚动视图区域高度为设备可使用设备窗口高度
    // this.setData({
    //   windowHeight: app.globalData.systemInfo.windowHeight
    // })
    // this.data.keywordVal = decodeURIComponent(options.keywordVal)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('result onReady')
    let searchTitle = app.globalData.searchTitle
    let navTitle = '"' + searchTitle + '"' + '焦点指数'
    //动态设置当前页面导航条的标题
    wx.setNavigationBarTitle({
      title: navTitle,
      success: function (res) {
      console.log('success result navTitle:', res)
      console.log('result navTitle:', navTitle)
      // 修改app全局变量传入为当前页面的标题
      app.globalData.NavigationBarTitle = navTitle;
      // console.log('app.globalData.NavigationBarTitle:', app.globalData.NavigationBarTitle)
      },
      fail: function(err) {
        console.log('fail result navTitle:', err)
      }
    });
    // 获取最终分数
    this.getScoreJsonrpc()
    // 获取redis版本号
    this.getCacheVersion()
    // 获取列表
    // this.getTitleSignJsonrpc()
    // 开启定时检测获取最新缓存版本号
    this.detectCacheVersion()
    // 获取带时间排序的列表
    this.getTitleSignListJsonrpc()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('result onShow')
    // 显示当前页面的转发按钮，开启带 shareTicket 的转发
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('result onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('result onUnload')
    // 关闭检测获取最新缓存版本号的定时器timer1
    clearInterval(timer1);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('result onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('result onReachBottom')
    let resultArticleData = this.data.resultArticleData
    let skip = this.data.skip
    let titleSignCount = this.data.titleSignCount
    let resultArticleDataCount = 0
    // 计算页面列表条数
    for (var i = 0; i < resultArticleData.length; i++) {
      resultArticleDataCount += resultArticleData[i].data.length
    }
    // 上拉刷新，加载分页列表
    if (resultArticleData.length > 0 && skip < 500 && resultArticleDataCount < titleSignCount) {
      // this.loadTitleSignJsonrpc()
      this.getTitleSignListJsonrpcNext()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log('result onShareAppMessage')
    let keyword_rule = app.globalData.keywordRuleVal
    let source_keyword = app.globalData.keywordRuleVal.source_keyword
    let url = '/pages/resultLoad/resultLoad?keywordRuleVal=' + JSON.stringify(keyword_rule)
    let title = '"' + source_keyword + '"' + '焦点指数'
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log('result onShareAppMessage from menu')
      // console.log(res.target)
    }
    return {
      title: title,
      path: url,
      success: function(res) {
        // 转发成功
        console.log('success result onShareAppMessage', res)
        console.log('result onShareAppMessage url:', url)
        console.log('result onShareAppMessage title:', title)
      },
      fail: function(res) {
        // 转发失败
        console.log('fail result onShareAppMessage')
      }
    }
  },

  /**
   * 页面滚动触发事件的处理函数
   */
  onPageScroll: function(options) {
    // Do something when page scroll
    // console.log('result onPageScroll')
    let system = app.globalData.systemInfo.system // 获取操作系统版本号
    let scrollTop = options.scrollTop
    let titleOffsetTop = this.data.titleOffsetTop
    // iOS下才开启标题栏顶部固定
    if (system.indexOf('iOS') !== -1) {
      // 判断滚动位置
      if (scrollTop > titleOffsetTop) {
        this.setData({
          titleFixed: true,
          // topTitleBarShowed: false,
        })
        // console.log('result onPageScroll titleFixed true')
      } else if (scrollTop < titleOffsetTop) {
        this.setData({
          titleFixed: false,
          // topTitleBarShowed: true,
        })
        // console.log('result onPageScroll titleFixed false')
      }
    }
  }
})