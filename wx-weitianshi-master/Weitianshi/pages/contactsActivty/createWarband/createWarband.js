var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    filePath: ''
  },
  onLoad: function (options) {
    let that = this;
    app.netWorkChange(that);
  },
  onShow: function () {
  },
  writeNewThing: function (e) {
    let type = e.currentTarget.dataset.type;
    let team_name = this.data.team_name;
    let team_founder = this.data.team_founder;
    if (type == 2) {
      app.href('/pages/contactsActivty/createInfo/createInfo?type=' + type + '&team_name=' + team_name);
    }
    else if (type == 3) {
      app.href('/pages/contactsActivty/createInfo/createInfo?type=' + type + '&team_founder=' + team_founder);
    }
  },
  // 战队logo上传
  warLogo: function () {
    let that = this;
    let user_id = wx.getStorageSync('user_id');
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        // let avatar = tempFilePaths[0];
        let size = res.tempFiles[0].size;
        app.log("size", size);
        if (size <= 1048576) {
          wx.uploadFile({
            url: url_common + '/api/team/uploadLogo', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'avatar',
            formData: {
              user_id: user_id,
            },
            success: function (res) {
              let data = JSON.parse(res.data);
              let image_id = data.data.image_id;
              that.setData({
                image_id: image_id
              });
            }
          });
          that.setData({
            filePath: tempFilePaths
          });
        } else {
          app.errorHide(that, "上传图片不能超过1M", 1500);
        }
      }
    });
  },
  createWar: function () {
    let user_id = wx.getStorageSync('user_id');
    let team_name = this.data.team_name;
    let team_founder = this.data.team_founder;
    let team_logo = this.data.image_id;
    let that = this;
    wx.request({
      url: url + '/api/team/create',
      data: {
        user_id: user_id,
        team_name: team_name,
        team_founder: team_founder,
        team_logo: team_logo
      },
      method: 'POST',
      success: function (res) {
        let team_id = res.data.team_id;
        let user_id = wx.getStorageSync('user_id');
        if (res.data.status_code == 2000000) {
          wx.showModal({
            title: '创建成功',
            content: '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0战队正在审核中,\n加FA哥微信weitianshicn，加速审核',
            confirmText: "下一步",
            confirmColor: "#333333",
            showCancel: false,
            success: function (res) {
              wx.redirectTo({
                url: '/pages/contactsActivty/activtyRegister/activtyRegister'
              });
            }
          });
        } else if (res.data.status_code == 411001) {
          wx.showModal({
            title: '创建提示',
            content: '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0您创建的该战队,\n\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0已被创建过，是否加入',
            confirmText: "加入",
            cancelText: "取消",
            confirmColor: "#333333",
            success: function (res) {
              if (res.confirm) {
                let arr = [];
                let parameter = [];
                arr.push(user_id);
                arr.push(team_id);
                parameter.push(arr);
                wx.request({
                  url: url_common + '/api/team/join',
                  data: {
                    teams: parameter
                  },
                  method: 'POST',
                  success: function (res) {
                    app.log("res",res);
                  }
                });
                app.href('/pages/contactsActivty/activtyRegister/activtyRegister');
              } else if (res.cancel) {
                app.log("用户点击取消");
              }
            }
          });
        } else if (res.data.status_code == 411000) {
          wx.showModal({
            title: '创建提示',
            content: '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0该战队已存在,\n\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0正在审核中',
            confirmText: "下一步",
            cancelText: "取消",
            confirmColor: "#333333",
            success: function (res) {
              if (res.confirm) {
                app.href('/pages/contactsActivty/activtyRegister/activtyRegister');
              } else if (res.cancel) {
                app.log("用户点击取消");
              }
            }
          });
        } else {
          app.errorHide(that, res.data.error_msg, 3000);
        }
      }
    });
  },
  // 重新加载
  refresh() {
    let timer = '';
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    timer = setTimeout(x => {
      wx.hideLoading();
      this.onShow();
    }, 1500);
  }
});