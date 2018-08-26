App({
  onLaunch: function (ops){
    var that = this;
    var query = ops.query;
    var path = ops.path;
    var code = ops.scene;
    var userInfo = wx.getStorageSync('userInfo');

    wx.checkSession({
      success: function (res) {
        that.globalData.userInfo = userInfo
        that.checkScene(code,path,query)
      },
      fail: function (res) {
        wx.login({
          success: function (res) {
            var code = res.code;
            wx.request({
              url: 'https://api.changching.cn/api/v1/users',
              method: 'POST',
              data: {
                js_code: code
              },
              header: {
                'Accept': "*/*",
              },
              success: function (res) {
                var userInfo = {
                  name: res.data.wename,
                  avatar: res.data.weno,
                  id: res.data.id,
                  gender: res.data.gender,
                  xqid: res.data.xiaoqu_id,
                  xqname: res.data.xqname,
                  sqname: res.data.sqname,
                  thirdkey: res.data.thirdkey,
                  phone: res.data.phone
                }

                that.globalData.userInfo = userInfo

                wx.setStorage({
                  key: 'userInfo',
                  data: userInfo,
                  success: function () {
                    that.checkScene(code,path,query)
                  }
                })
              }
            })
          }
        })
      }
    })
  },

  checkScene: function (code,path,query){
    var that = this
    var userInfo = wx.getStorageSync('userInfo');
 
    if (userInfo.xqid == null) {
      wx.getUserInfo({
        success: res => {
          userInfo.name = res.userInfo.nickName;
          userInfo.avatar = res.userInfo.avatarUrl;
          userInfo.gender = res.userInfo.gender;
          wx.setStorage({
            key: "userInfo",
            data: userInfo
          })
          that.globalData.userInfo = userInfo

          wx.request({
            url: 'https://api.changching.cn/api/v1/users/' + userInfo.id,
            method: 'PUT',
            data: {
              wename: res.userInfo.nickName,
              weno: res.userInfo.avatarUrl,
              gender: res.userInfo.gender
            },
            header: {
              'Accept': "*/*",
              'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
            },
            success: function (res) {
              if (JSON.stringify(query) == "{}") {
                wx.reLaunch({
                  url: '/pages/index/index'
                })
              }
              else {
                wx.reLaunch({
                  url: "/" + path + "?id=" + query.id + "&xqid=" + query.xqid + "&xqname=" + query.xqname + "&invitor=" + query.name,
                })
              }
            }
          })
        }
      })
    }else{
      if(code==1007 || code ==1008){
        wx.reLaunch({
          url: "/" + path + "?id=" + query.id + "&xqid=" + query.xqid + "&xqname=" + query.xqname + "&invitor=" + query.name,
        })
      }
    }
    // if (ops.shareTicket) {
    //   // 获取转发详细信息
    //   wx.getShareInfo({
    //     shareTicket: ops.shareTicket,
    //     success(res) {
    //       res.errMsg; //错误信息
    //         //解密后为一个JSON结构（openGId群对当前小程序的唯一ID）
    //       res.encryptedData; 
    //       res.iv; // 加密算法的初始向量
    //     },
    //     fail() { },
    //     complete() { }
    //   });
    // }
   
  },

  globalData: {
    baseAPI: "https://api.changching.cn/api/v1",
    picurl: "https://api.changching.cn/",
    userInfo:'',
    temp:{}
  }
})
