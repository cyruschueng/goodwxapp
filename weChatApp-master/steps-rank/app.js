//app.js
const api = require("./api.js")
App({
  globalData: {
    opts:"",
    userInfo: null,
    code:"",
    user:'',
    sessionKey:'',
    system_info:'',
    rankList:"",
    selfRank:"",
  },
  onShow: function (opts) {
    var that = this;
    that.globalData.opts = opts;
    // api.login(function(res) {
    //   var userInfo = res;
    //     console.log("login",userInfo)
    //     console.log("scene",opts)

    //     if(opts.scene == 1044){
    //       console.log(opts.shareTicket)
    //       wx.login({
    //         success(res){
    //           var js_code = res.code;
           
    //        wx.getShareInfo({
    //         shareTicket: opts.shareTicket,
    //           complete(res){
    //             console.log("getTicket",res)
    //             console.log(res.iv)
    //             var share_info_encryptedData = res.encryptedData;
    //             var share_info_iv = res.iv;
    //             console.log("share_info",res)
    //             wx.getWeRunData({
    //               success(res){
    //                 console.log("getWeRunData",res)
    //                 var run_data_encryptedData=res.encryptedData;
    //                 var run_data_iv=res.iv;
    //                  wx.request({
    //                     url:"https://ai.maiyizhi.cn/producter/php/frontend/web/index.php?r=steps/default/index",
    //                     method:"POST",
    //                     data:{
    //                       js_code:js_code,
    //                       share_info_encryptedData:share_info_encryptedData,
    //                       share_info_iv:share_info_iv,
    //                       openid:userInfo.openid,
    //                       name:userInfo.user_name,
    //                       avatar:userInfo.avatar,
    //                       run_data_encryptedData:run_data_encryptedData,
    //                       run_data_iv:run_data_iv,
                          
    //                     },
    //                     header: {
    //                         'content-type': 'application/json' // 默认值
    //                     },  
    //                     success: function(res) {
    //                         console.log("qun",res)
    //                         var obj = res.data.data.group_ranks;
    //                         var users = obj.users;
    //                         var rankList = [];
    //                         var selfRank = {
    //                           user_rank:res.data.data.user_rank,
    //                           user_steps:res.data.data.user_steps
    //                         }
    //                         that.globalData.selfRank = selfRank;
    //                         for (var key in users){
    //                             var newObj = {
    //                               user:users[key],
    //                               todayRanks:obj["today_ranks"][key], 
    //                             }
    //                             rankList.push(newObj);
    //                         }
    //                         console.log("rankList",rankList)
    //                         that.globalData.rankList = rankList;
    //                         console.log("globalData",that.globalData.rankList)
    //                     },
    //                     fail(res){
    //                         console.log("fail")
    //                     }
    //                   })

    //               }
    //             })

               



    //           }
    //       })
    //         }
    //       })
    //     }
    //   }
    // );


    
   
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({

      success: res => {
        // console.log("setting")
        // console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              console.log("userif",res)
              that.globalData.userInfo = res.userInfo
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.getUserInfo({
            success: res => {
              that.globalData.userInfo = res.userInfo
              console.log("res.userInfo")
              console.log(res)
              console.log("res.userInfo")
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    wx.getSystemInfo({

      success: function(res) {
      
          // that.globalData.system_info = res
        }
      })

  },
  
})