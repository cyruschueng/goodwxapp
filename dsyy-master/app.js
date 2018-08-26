//app.js
const util = require('./utils/util.js')

var vm = null

App({
  //监听小程序打开
  onShow: function (option) {
    ///////////////////////////////
    //获取vm
    vm = this
    //获取用户缓存数据
    var userInfo = wx.getStorageSync("userInfo");
    console.log("local storage userInfo:" + JSON.stringify(userInfo));
    //如果没有缓存
    if (userInfo == null || userInfo == undefined || userInfo == "") {
      //调用登录接口
      vm.login(null);
    } else {
      vm.globalData.userInfo = wx.getStorageSync("userInfo");
      console.log("vm.globalData.userInfo:" + JSON.stringify(vm.globalData.userInfo));
    }
    ///////////////////////////
    //获取用户地理位置
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var userLocation = [];
        userLocation.lat = longitude;
        userLocation.lon = latitude;
        vm.globalData.userLocation = userLocation
      }
    })

    //////////////////////////
    //判断是否通过微信群进入
    // if(option.scene==1044)
    // {
    // console.log(JSON.stringify("shareTicket：" + option.shareTicket))
    // //通过调用 wx.getShareInfo 函数，获取到目标微信群（加密过后的）ID 
    // wx.getShareInfo({
    //   shareTicket: option.shareTicket,
    //   complete(res) {
    //     res.errMsg; // 执行信息
    //     res.encryptedData; // 解密后为一个 JSON 结构（openGId  群对当前小程序的唯一 ID）
    //     res.iv; // 加密算法的初始向量
    //     ///之后转向后端进行解密回调出群ID和群名称
    //     ///为了保证用户隐私安全，微信特意将微信群 ID 进行了非常复杂的加密。当加密数据直接发到服务器后，服务器还需要再进行一步解码，才能正常使用微信群信息。
    //     ///如果你之前做过小程序中用户数据的解码，那么你可以将同样的代码套用到解码微信群数据上，因为二者的加密算法是一模一样的。
    //   }
    // })
    // }
  },
  login: function (callBack) {
    wx.login({
      success: function (res) {
        console.log("wx.login:" + JSON.stringify(res))
        if (res.code) {
          util.getOpenId({ code: res.code }, function (ret) {
            console.log("getOpenId:" + JSON.stringify(ret))
            var openId = ret.data.openid
            var param = {
              wx_id: openId
            }
            util.login(param, function (ret) {
              console.log("login:" + JSON.stringify(ret));
              if (ret.data.code=="200")
              {
                vm.storeUserInfo(ret.data.obj)
                  vm.updateUserInfo(function (ret) {
                   })
              }
            }, null);
          }, null);
        }
      }
    })
  },
  //更新用户信息
  updateUserInfo: function (callBack) {
    //获取用户基本信息
    wx.getUserInfo({
      //成功
      success: function (res) {
        console.log("wx.getUserInfo success:" + JSON.stringify(res))
        var param = {
          nick_name: res.userInfo.nickName,
          avatar: res.userInfo.avatarUrl,
          phonenum: vm.globalData.userInfo.phonenum,
          gender: res.userInfo.gender,
          // type: vm.globalData.userInfo.type,
        }
        util.updateUserInfo(param, function (ret, err) {
          console.log("updateUserInfo ret:" + JSON.stringify(ret))
          //更新缓存及globalData
          if (ret.data.code == "200") {
            vm.storeUserInfo(ret.data.obj)
          }
        })
        callBack()
      },
      //失败
      fail: function (res) {
        console.log("wx.getUserInfo fail:" + JSON.stringify(res))
        //引导用户授权
        vm.showModal()
      },
      complete: function (res) {
        console.log("wx.getUserInfo complete:" + JSON.stringify(res))
      }
    })
  },
  storeUserInfo: function (obj) {
    console.log("storeUserInfo :" + JSON.stringify(obj));
    wx.setStorage({
      key: "userInfo",
      data: obj
    });
    vm.globalData.userInfo = obj;
  },
  getUserInfo: function (cb) {
    typeof cb == "function" && cb(vm.globalData.userInfo)
  },
  getSystemInfo: function (cb) {

    if (vm.globalData.systemInfo) {
      typeof cb == "function" && cb(vm.globalData.systemInfo)
    } else {
      wx.getSystemInfo({
        success: function (res) {
          vm.globalData.systemInfo = res
          typeof cb == "function" && cb(vm.globalData.systemInfo)
        }
      })
    }
  },
  //引导用户授权
  showModal:function(){
    wx.showModal({
      title: '提示',
      content: '若不授权获取用户信息，则读书有益的部分重要功能将无法使用；请点击【重新授权】——选中【用户信息】和【地理位置】方可使用。',
      showCancel: false,
      confirmText: "重新授权",
      success: function (res) {
        if (res.confirm) {
          vm.openSetting()
        }
      }
    })
  },
  openSetting:function(){
    wx.openSetting({
      success: (res) => {
        console.log("Result" + JSON.stringify(res))
        if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
          vm.showModal()
        }
        else
        {
          vm.updateUserInfo(function (ret) {
          })
        }
      }
    })
  },
  //全局变量
  globalData: {
    userInfo: null,
    systemInfo: null,
    userLocation: {
      lat: "",
      lon: ""
    },
    bookTypeArr: ['儿童读物', '历史文化', '文学小说', '考试教育', '医疗养生', '心灵鸡汤'],
    barDetail: {
      barid:"",
      barname:""
    }
  }
})