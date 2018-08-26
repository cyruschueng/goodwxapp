//项目查看申请
function projectApply(that, pro_id, callBack) {
  let app = getApp();
  let url_common = app.globalData.url_common;
  let user_id = wx.getStorageSync('user_id');
  app.checkUserInfo(that, x => {
    wx.request({
      url: url_common + '/api/user/getUserGroupByStatus',
      data: {
        user_id: user_id
      },
      method: 'POST',
      success: function (res) {
        if (res.data.status_code == 2000000) {
          // 0:未认证1:待审核 2 审核通过 3审核未通过
          let status = res.data.status;
          if (status != 0) {
            var group_id = res.data.group.group_id;
          }
          if (status == 0) {
            wx.showModal({
              title: '友情提示',
              content: '认证的投资人,买方FA才可申请查看项目',
              confirmText: "去认证",
              confirmColor: "#333333",
              success: function (res) {
                if (res.confirm) {
                  app.href('/pages/my/identity/indentity/indentity');
                }
              }
            });
          } else if (status == 1) {
            wx.showModal({
              title: '友情提示',
              content: '您的身份正在审核中,只有投资人和买方FA才可申请查看项目',
              confirmColor: "#333333;",
              showCancel: false,
              success: function () {
              }
            });
          } else if (status == 2) {
            if (group_id) {
              if (group_id == 18 || group_id == 6) {
                projectApplyDirect(pro_id, callBack(res));
              } else if (group_id == 21) {
                wx.showModal({
                  title: '友情提示',
                  content: '您的身份是卖方FA,只有投资人和买方FA才可申请查看项目',
                  confirmColor: "#333333;",
                  showCancel: false,
                  success: function () {
                  }
                })
              } else if (group_id == 3) {
                wx.showModal({
                  title: '友情提示',
                  content: '您的身份是创业者,只有投资人和买方FA才可申请查看项目',
                  confirmColor: "#333333;",
                  showCancel: false,
                  success: function () {
                  }
                })

              } else if (group_id == 4) {
                wx.showModal({
                  title: '友情提示',
                  content: '您的身份是投资机构,只有投资人和买方FA才可申请查看项目',
                  confirmColor: "#333333;",
                  showCancel: false,
                  success: function (res) {
                  }
                })
              } else if (group_id == 7) {
                wx.showModal({
                  title: '友情提示',
                  content: '您的身份是政府、事业单位、公益组织,只有投资人和买方FA才可申请查看项目',
                  confirmColor: "#333333;",
                  showCancel: false,
                  success: function (res) {
                  }
                })
              } else if (group_id == 8) {
                wx.showModal({
                  title: '友情提示',
                  content: '您的身份是其他,只有投资人和买方FA才可申请查看项目',
                  confirmColor: "#333333;",
                  showCancel: false,
                  success: function (res) {
                  }
                })
              }
            }
          } else if (status == 3) {
            wx.showModal({
              title: '友情提示',
              content: '您的身份未通过审核,只有投资人和买方FA才可申请查看项目',
              confirmColor: "#333333;",
              confirmText: "重新认证",
              showCancel: false,
              success: function (res) {
                app.href('/pages/my/identity/indentity/indentity?group_id=' + group_id)
              }
            })
          }
        }
      }

    })
  })
}

//项目一键推送 (user_id:谁推送的; pushTo_user_id:推送给谁的; pushed_project_id:推送的项目)
function projectOneKeyPush(that, pushTo_user_id, pushed_project_id, callback) {
  let app = getApp();
  let url_common = app.globalData.url_common;
  wx.showLoading({
    title: 'loading',
    mask: true,
  })
  let user_id = wx.getStorageSync('user_id');
  app.checkUserInfo(that, x => {
    getPushProjectTimes(that, pushRequest())
    // 实现推送
    function pushRequest() {
      wx.request({
        url: url_common + '/api/project/pushProjectToUser',
        data: {
          user_id: user_id,
          pushed_user_id: pushTo_user_id,
          pushed_project: pushed_project_id
        },
        method: 'POST',
        success: function (res) {
          let statusCode = res.data.status_code;
          if (statusCode == 2000000) {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          } else if (statusCode == 490001) {
            app.errorHide(that, "没有选择任何项目", 1000)
          }
          if (callback) {
            callback(res);
          }
        },
        complete() {
          wx.hideLoading();
        }
      })
    }
  })
}

//项目推送 (user_id:谁推送的; pushTo_user_id:推送给谁的)
function projectPush(that, pushTo_user_id) {
  let app = getApp();
  let url_common = app.globalData.url_common;
  let user_id = wx.getStorageSync('user_id');
  app.checkUserInfo(that, x => {
    getPushProjectTimes(that, res => {
      app.href('/pages/myProject/pushTo/pushTo?user_id=' + user_id + '&&pushId=' + pushTo_user_id)
    })
  })
}

//人脉添加
function contactsAdd(that,added_user_id, callBack) {
  let app = getApp();
  let url_common = app.globalData.url_common;
  let user_id = wx.getStorageSync('user_id');
  app.checkUserInfo(that, x => {
    wx.request({
      url: url_common + '/api/user/UserApplyFollowUser',
      data: {
        user_id: user_id,
        applied_user_id: added_user_id
      },
      method: 'POST',
      success: function (res) {
        if (callBack) {
          callBack(res)
        }
      }
    })
  })
}

//人脉添加(直接)
function contactsAddDirect(that,added_user_id, callBack) {
  let app = getApp();
  let url_common = app.globalData.url_common;
  let user_id = wx.getStorageSync('user_id');
  app.checkUserInfo(that, x => {
    wx.request({
      url: url_common + '/api/user/handleApplyFollowUser',
      data: {
        user_id: user_id,
        apply_user_id: added_user_id
      },
      method: 'POST',
      success: function (res) {
        if (callBack) {
          callBack(res)
        }
      }
    })
  })
}

//获取用户当日推送次数(辅助函数)
function getPushProjectTimes(that, callBack) {
  let user_id = wx.getStorageSync('user_id');
  let app = getApp();
  let url_common = app.globalData.url_common;
  wx.request({
    url: url_common + '/api/user/getPushProjectTimes',
    data: {
      user_id: user_id
    },
    method: "POST",
    success(res) {
      app.log(that, 'getPushProjectTimes', res);
      let remain_time = res.data.data.remain_times;
      if (remain_time < 1) {
        app.errorHide(that, "您今日的提交次数已经用光了", 3000)
      } else {
        if (callBack) {
          callBack(res)
        }
      }
    },
    complete() {
      wx.hideLoading();
    }
  })
}

//直接项目查看申请(辅助函数)
function projectApplyDirect(pro_id, callBack) {
  let app = getApp();
  let url_common = app.globalData.url_common;
  let user_id = wx.getStorageSync('user_id');

  // 发送申请
  wx.request({
    url: url_common + '/api/project/applyProject',
    data: {
      user_id: user_id,
      project_id: pro_id
    },
    method: 'POST',
    success: function (res) {
      let statusCode = res.data.status_code;
      if (res.data.status_code == 2000000) {
        wx.showToast({
          title: '已提交申请',
          icon: 'success',
          duration: 2000
        })
        if (callBack) {
          callBack(res)
        }
      } else if (statusCode == 5005005) {
        wx.showToast({
          title: '请勿重复申请',
          icon: 'success',
          duration: 2000
        })
      }
    }
  })
}



export {
  projectApply,
  projectOneKeyPush,
  projectPush,
  contactsAdd,
  contactsAddDirect
}
