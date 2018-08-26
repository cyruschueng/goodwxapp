var app = getApp();
var url_common = app.globalData.url_common;
var user_id = wx.getStorageSync('user_id');

// 创建项目
function toCreateProject() {
  var user_id = wx.getStorageSync('user_id');//获取我的user_id
  app.checkUserInfo(this, res => {
    app.href('/pages/myProject/publishProject/publishProject')
  })
}

// 在电脑上创建
function createProjectPc() {
  wx.scanCode({
    success: function (res) {
      var user_id = wx.getStorageSync('user_id');
      var credential = res.result;//二维码扫描信息
      //发送扫描结果和项目相关数据到后台
      wx.request({
        url: url_common + '/api/auth/writeUserInfo',
        data: {
          type: 'create',
          credential: credential,
          user_id: user_id,
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data.status_code == 2000000) {
            app.href('/pages/scanCode/bpScanSuccess/bpScanSuccess')
          }
        }
      })
    },
  })
}

export {
  toCreateProject, createProjectPc
}