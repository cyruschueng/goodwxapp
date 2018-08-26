const app = getApp()
const { wc } = app
let { companyNo } = app
const { imgUrl, data, code, success } = wc

// var app = getApp()
// var detail=''
// var dijkl=''
// var baoMa=''
// var beiZhun=''
// var lianXiRen=''
// var dianHua=''
var OBJ_PAGE_DATA = {}
OBJ_PAGE_DATA.data = {}
OBJ_PAGE_DATA.data.headImageUrl = '../icon/my.jpg'

// 编辑公告信息
OBJ_PAGE_DATA['onShow'] = function () {
  companyNo = app.companyNo
  if (!companyNo.length) {
    wx.redirectTo({
      url: '/log/login/login',
    })
    return
  }
  const that = this
  let getMyCarData = {
    a: 'getMyCar',
    input: {
      company_no: companyNo
    }
  }

  wc.get(getMyCarData, (json) => {
    if (json[code] === success) {
      wx.stopPullDownRefresh()
      that.setData({
        myInfo: json[data]
      })
    } else {
      wc.showToast(['请求失败', 'loading'])
    }
  })
}
// 编辑公告信息
OBJ_PAGE_DATA['onPullDownRefresh'] = function () {
  const that = this
  let getMyCarData = {
    a: 'getMyCar',
    input: {
      company_no: companyNo
    }
  }

  wc.get(getMyCarData, (json) => {
    if (json[code] === success) {
      wx.stopPullDownRefresh()
      that.setData({
        myInfo: json[data]
      })
    } else {
      wc.showToast(['请求失败', 'loading'])
    }
  })
}

// OBJ_PAGE_DATA['onShow'] = function () {
  // onLoad: function () {
  // console.log('onLoad')
  // var that = this
  // //调用应用实例的方法获取全局数据
  // app.getUserInfo(function (userInfo) {
  //   //更新数据
  //   that.setData({
  //     userInfo: userInfo,
  //     detail: "16年1.4Lpolo",
  //     dijkl: "奥迪A6",
  //     baoMa: "宝马",
  //     beiZhun: "备注：测试",
  //     lianXiRen: "姓名：张运龙",
  //     dianHua: "联系电话：15120814794"
  //   })
  // })

// }
// 编辑公告信息
OBJ_PAGE_DATA['long'] = function () {
  wx.navigateTo({
    url: '../ownInfo/ownInfo'
  })
}
// 编辑信息
OBJ_PAGE_DATA['ButtImage'] = function () {
  wx.navigateTo({
    url: '../carInfo/carInfo'
  })
}
// 我的分享
OBJ_PAGE_DATA['share'] = function () {
  wx.navigateTo({
    url: '../shareInfo/shareInfo'
  })
}

Page(OBJ_PAGE_DATA)
// Page({
//  // 事件处理函数
//   share: function() {
//     wx.navigateTo({
//       url: '../information/information'
//     })
//   },
//   //  login: function() {
//   //   wx.switchTab({
//   //     url: '../Car/car'
//   //   })

//   // },
//   onLoad: function () {
//     console.log('onLoad')
//     var that = this
//     //调用应用实例的方法获取全局数据
//     app.getUserInfo(function(userInfo){
//       //更新数据
//       that.setData({
//         userInfo:userInfo,
//         detail:"16年1.4Lpolo",
//         dijkl:"奥迪A6",
//         baoMa:"宝马",
//         beiZhun:"备注：测试",
//         lianXiRen:"姓名：张运龙",
//         dianHua:"联系电话：15120814794"
//       })
//     })
//   }
// })