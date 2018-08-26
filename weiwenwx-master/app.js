let DOMAIN = 'https://mini.xxxx.cn';
let arrss='';
App({
  appApi: {
    //创建或修改问卷
    createAPI: DOMAIN +'/Api/Question/add',
    upImgAPI: DOMAIN+'/Api/BaseApi/uploadImage',
    // 用户注册接口
    userLoginAPI: DOMAIN + '/Api/otherService/wechatCode',
    // 详情接口
    detailAPI: DOMAIN +'/Api/question/detail',
    // 题目添加／修改
    addAPI: DOMAIN + '/Api/QuestionOption/add',
    // 题目详情
    detailsAPI: DOMAIN + '/Api/QuestionOption/detail',
    // 删除题目
    delAPI: DOMAIN + '/Api/QuestionOption/delete',
    // 问卷推向广场
    pushAPI: DOMAIN + '/Api/Question/pushSquare',
    // 微信用户信息获取后更新接口
    updateUserAPI: DOMAIN + '/Api/OtherService/updateUser',
    // 用户信息获取接口
    getUserInfoAPI: DOMAIN + '/Api/BaseApi/getUserInfo',
    // 最新广场问卷列表
    squareAPI: DOMAIN + '/Api/Question/squareIndex',
    // 我发布的问卷列表接口
    myIssueAPI: DOMAIN + '/Api/Question/myIssue',
    // 问卷删除接口
    deleteAPI: DOMAIN + '/Api/Question/delete',
    // 问卷配置详情
    getInfoAPI: DOMAIN + '/Api/Question/getInfo',
    // 我参与回答的问卷列表接口
    myJoinAPI: DOMAIN + '/Api/Question/myJoin',
    // 回答问卷
    answerAPI: DOMAIN + '/Api/Question/answer',
    // 查看结果接口
    resultAPI: DOMAIN + '/Api/Question/detail_include_result',
    // 填空题查看更多答案
    replyListMoreAPI: DOMAIN + '/Api/Question/replyListMore',
    // 填空题查看更多答案
    replyListAPI: DOMAIN + '/Api/Question/scanOption',
    // 反馈接口
    feedbackAPI: DOMAIN + '/Api/OtherService/feedback',
    // 举报功能
    complainAPI: DOMAIN + '/Api/Question/complain',
    // 部门列表
    listAPI: DOMAIN + '/Api/OtherService/department',
    // 数据导出
    downloadAPI: DOMAIN + '/Api/OtherService/download',
  },
  globalData: {
    userInfo: {}, // 用户信息
    uid: '',
    domain: DOMAIN,
    default_avatar: DOMAIN+'/Public/Home/images/default_avatar.png',
    default_logo: DOMAIN + '/Public/Home/images/default_question_bg.png',
    token:'',
    openid:''
  },
  wxRequest:function(url,data,method){
    wx.request({
      url: url,
      data: data,
      dataType: 'json',
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token'),
        'uid': wx.getStorageSync('uid')
      },
      success: function (res) {
        setTimeout(() => {
          wx.hideLoading();
        }, 100); 
        if (res.data.code != 200) {
          wx.showModal({
            title: '提交失败！',
            content: res.data.msg,
            showCancel: false
          })
        }
        if (res.data.code == 1001) {
          getApp().userLogin();
          wx.navigateTo({
            url: '/pages/create/create',
          })
        }else{
          wx.redirectTo({
            url: '/pages/eidtAnswer/eidtAnswer?id=' + res.data.result.item.id,
          })
        }
      },
      fail: function (error) {
        setTimeout(() => {
          wx.hideLoading();
        }, 100); 
        wx.showModal({
          title: '提交失败！',
          content: error,
          showCancel: false
        })
        console.log(error);
      }
    })
  },
  wxRQ: function (url, data, method, success) {
    wx.showLoading({
      title: '加载中...',
    });
    return wx.request({
      url: url,
      data: data,
      dataType: 'json',
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token'),
        'uid': wx.getStorageSync('uid')
      },
      success: function (res) {
        setTimeout(() => {
          wx.hideLoading();
        }, 100);
        if (res.data.code != 200) {
          wx.showModal({
            title: '提交失败！',
            content: res.data.msg,
            showCancel: false
          })
        }else{
          success(res);
        }
      },
      fail: function (error) {
        setTimeout(() => {
          wx.hideLoading();
        }, 100);
        wx.showModal({
          title: '请求失败！',
          content: error,
          showCancel: false
        })
        console.log(error);
      }
    });
  },
  onLaunch: function () {
    let that = this;
    that.userLogin();

    wx.getUserInfo({
      success: function (res) {
        wx.setStorageSync('userInfo', res.userInfo);
        that.globalData.userInfo = wx.getStorageSync('userInfo');
      }
    });
  },

  // 用户登录
  userLogin: function () {
    let that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res.                                    e);
          //发起网络请求
          wx.request({
            url: getApp().appApi.userLoginAPI,
            data: {
              code: res.code
            },
            dataType: 'json',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data.code != 200) {
                wx.showModal({
                  title: '请求失败！',
                  content: res.data.msg,
                  showCancel: false
                })
              } else {
              console.log(res); 
              // 设置Storage
                wx.setStorageSync('token', res.data.result.item.token);
                getApp().globalData.token = res.data.result.item.token;
                wx.setStorageSync('uid', res.data.result.item.uid);
                wx.setStorageSync('openid', res.data.result.item.openid);
                getApp().globalData.uid = res.data.result.item.uid;
                getApp().globalData.openid = res.data.result.item.openid;
                // console.log(getApp().globalData)
              that.uploadUserInfo();
              }
              // wx.authorize({
              //   scope: 'scope.userInfo',
              //   success() {
              //     // 用户已经同意，后续调用，接口不会弹窗询问
              //     console.log('用户同意授权，用户信息');
              //     that.uploadUserInfo();
              //   },
              //   fail() {
              //     console.log('用户不同意授权');
              //     // wx.redirectTo({
              //     //   url: '../login/login'
              //     // })
              //   }
              // })
              // 是否第一次登陆
              // if (res.data.payload.isNewUser == 1) {
              //   wx.authorize({
              //     scope: 'scope.userInfo',
              //     success() {
              //       // 用户已经同意，后续调用，接口不会弹窗询问
              //       console.log('用户同意授权，用户信息');
              //       that.uploadUserInfo();
              //     },
              //     fail() {
              //       console.log('用户不同意授权');
              //       // wx.redirectTo({
              //       //   url: '../login/login'
              //       // })
              //     }
              //   })
              // }
            }
          })
        } else {
          wx.showModal({
            title: '请求失败！',
            content: '获取用户登录态失败！' + res.errMsg,
          })
        }
      }
    });
  },

  // 获取用户uid
  getUserId: function () {
    return wx.getStorageSync('uid');
  },

  // 检查用户登录
  checkUserLogin: function () {
    let that = this;
    wx.checkSession({
      success: function () {
      },
      fail: function () {
        //登录态过期 重新登录
        that.userLogin();
      }
    });
  },

  // 上传用户信息 wx.getUserInfo
  uploadUserInfo: function () {
    let that = this;
    that.checkUserLogin();
    wx.getSetting({
      success(res) {
        console.log("获取用户授权设置");
        // 检查用户是否授权，用户信息
        if (!res['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              console.log('获取用户信息成功');
              wx.request({
                url: getApp().appApi.updateUserAPI,
                dataType: 'json',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                  'token': wx.getStorageSync('token'),
                  'uid': wx.getStorageSync('uid')
                },
                data: {
                  openid: getApp().globalData.openid,
                  nickname: res.userInfo.nickName,
                  avatar: res.userInfo.avatarUrl,
                  gender: res.userInfo.gender,
                  province: res.userInfo.province,
                  city: res.userInfo.city,
                  country: res.userInfo.country
                },
                success: function (res) {
                  if (res.data.code != 200) {
                    wx.showModal({
                      title: '失败！',
                      content: res.data.msg,
                      showCancel: false
                    })
                  }
                }
              });
            }
          });
        }
      }
    })
  },
})
