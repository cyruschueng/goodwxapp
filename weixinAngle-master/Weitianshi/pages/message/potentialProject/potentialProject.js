var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
let RG = require('../../../utils/model/register.js');
let register = new RG.register();
Page({
  data: {
    winWidth: 0,//选项卡
    winHeight: 0,//选项卡
    currentTab: 0,//选项卡
    modalBox: 0,
    buttonOneText: "确定",
    nonet: true
  },
  onLoad: function (e) {
    let that = this;
    app.netWorkChange(that);
    // 我申请查看的项目
    var user_id = wx.getStorageSync('user_id');//获取我的user_id
    wx.showLoading({
      title: 'loading',
      mask: true,
    });
    wx.request({
      url: url_common + '/api/message/applyProjectList',
      data: {
        user_id: user_id
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading();
        let count = res.data.count;
        let applyList = res.data.data;
        that.setData({
          count: count,
          applyList: applyList
        });
      }
    });
    // 推送给我的项目
    wx.request({
      url: url_common + '/api/message/getProjectWithPushToMe',
      data: {
        user_id: user_id
      },
      method: 'POST',
      success: function (res) {
        let pushToList = res.data.data;
        let count1 = res.data.count;
        that.setData({
          count1: count1,
          pushToList: pushToList
        });
      }
    });
    // 匹配推荐
    wx.request({
      url: url_common + '/api/investor/getMatchProjectList',
      data: {
        user_id : user_id,
        type: 'only_match'
      },
      method: 'POST',
      success: function (res) {
        if (res.data.status_code == 2000000) {
          let count2 = res.data.data.match_count;
          let getMatchList = res.data.data.projects;
          // button-type: 0=申请中 1.申请已通过 2.申请被拒绝(重新申请) 3.推送给我的 4.未申请也未推送(申请按钮)
          that.setData({
            count2: count2,
            getMatchList: getMatchList
          });
        } else {
          that.setData({
            count2: 0,
            getMatchList: 0
          });
        }
      }
    });
  },

  onShow: function (e) {
    // 我申请查看的项目
    var user_id = wx.getStorageSync('user_id');//获取我的user_id
    let that = this;
    // 取消红点 --推送给我的
    wx.request({
      url: url_common + '/api/message/setMessageToRead',
      data: {
        user_id: user_id,
        type_id: "7"
      },
      method: "POST",
      success: function (res) {
      }
    });
    that.setData({
      requestCheck: true,
      requestCheckBoolean: true,
      requestCheckThird: true,
      currentPage: 1,
      otherCurrentPage: 1,
      thirdCurrentPage: 1,
      page_end: false,
      page_endBoolean: false,
      page_endThird: false,
      push_page: 1,
      match_page: 1
    });

  },
  /*滑动切换tab*/
  bindChange: function (e) {
    var that = this;
    true;
    var current = e.detail.current;
    let pushToList = this.data.pushToList;
    let applyList = this.data.applyList;
    that.setData({ currentTab: e.detail.current });
    var user_id = wx.getStorageSync('user_id');//获取我的user_id
    if (current == 1) {
      //向后台发送信息取消红点
      wx.request({
        url: url_common + '/api/message/setFeedbackToRead',
        data: {
          user_id: user_id,
          type: "apply"
        },
        method: "POST",
        success: function (res) {
          applyList.forEach((x) => {
            x.message_status = 1;
          });
          that.setData({
            hasRedPoint: false
          });

        }
      });
    } else if (current == 0) {
      if (this.data.hasRedPoint === false) {
        that.setData({
          applyList: applyList
        });
      }
      // 推送给我的
      wx.request({
        url: url_common + '/api/message/setMessageToRead',
        data: {
          user_id: user_id,
          type_id: "7"
        },
        method: "POST",
        success: function (res) {
          if (res.data.status_code == 2000000) {
            pushToList.forEach((x) => {
              x.message_status = 1;
            });
            that.setData({
              pushToList: pushToList
            });
          }
        }
      });
    }
  },
  /*点击tab切换*/
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {

      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
    }
  },
  //我申请的项目加载更多
  loadMore: function () {
    //请求上拉加载接口所需要的参数
    var that = this;
    var user_id = wx.getStorageSync('user_id');
    // var currentPage = this.data.currentPage;
    var request = {
      url: url_common + '/api/message/applyProjectList',
      data: {
        user_id: user_id,
        page: this.data.currentPage
      }
    };
    //调用通用加载函数
    app.loadMore(that, request, "applyList");
  },
  //匹配更多
  matchMore: function () {
    //请求上拉加载接口所需要的参数
    var user_id = wx.getStorageSync("user_id");
    let that = this;
    let getMatchList = this.data.getMatchList;
    if (that.data.requestCheckThird) {
      if (user_id != '') {
        if (that.data.page_endThird == false) {
          wx.showToast({
            title: 'loading...',
            icon: 'loading'
          });
          that.data.match_page++;
          that.setData({
            thirdCurrentPage: this.data.match_page,
            requestCheckThird: false
          });
          //请求加载数据
          wx.request({
            url: url_common + '/api/investor/getMatchProjectList',
            data: {
              user_id: user_id,
              type: 'only_match',
              page: this.data.thirdCurrentPage
            },
            method: 'POST',
            success: function (res) {
              let newPage = res.data.data.projects;
              let page_end = res.data.page_end;
              for (var i = 0; i < newPage.length; i++) {
                getMatchList.push(newPage[i]);
              }
              that.setData({
                getMatchList: getMatchList,
                page_endThird: page_end,
                requestCheckThird: true
              });
            }
          });
        } else {
          app.errorHide(that, "没有更多了", that, 3000);
          that.setData({
            requestCheckThird: true
          });
        }
      }
    }
  },
  //推送给我更多
  pushMore: function () {
    //请求上拉加载接口所需要的参数
    var user_id = wx.getStorageSync("user_id");
    let that = this;
    let pushToList = this.data.pushToList;
    if (that.data.requestCheckBoolean) {
      if (user_id != '') {
        if (that.data.page_endBoolean == false) {
          wx.showToast({
            title: 'loading...',
            icon: 'loading'
          });
          that.data.push_page++;
          that.setData({
            otherCurrentPage: this.data.push_page,
            requestCheckBoolean: false
          });
          //请求加载数据
          wx.request({
            url: url_common + '/api/message/getProjectWithPushToMe',
            data: {
              user_id: user_id,
              page: this.data.otherCurrentPage
            },
            method: 'POST',
            success: function (res) {
              var newPage = res.data.data;
              var page_end = res.data.page_end;
              for (var i = 0; i < newPage.length; i++) {
                pushToList.push(newPage[i]);
              }
              that.setData({
                pushToList: pushToList,
                page_endBoolean: page_end,
                requestCheckBoolean: true
              });
            }
          });
        } else {
          app.errorHide(that, "没有更多了", that, 3000);
          that.setData({
            requestCheckBoolean: true
          });
        }
      }
    }
  },
  // 点击跳转
  projectDetail: function (e) {
    // 获取我自己的项目id
    // var that = this;
    // 获取当前点击的项目id
    var id = e.currentTarget.dataset.project;
    // 判斷項目是不是自己的
    wx.request({
      url: url + '/api/project/projectIsMine',
      data: {
        project_id: id
      },
      method: 'POST',
      success: function (res) {
        // var that = this;
        var userId = res.data.user_id;
        var user = wx.getStorageSync('user_id');
        if (userId == user) {
          app.href('/pages/myProject/projectDetail/projectDetail?id=' + id + '&&index=' + 0);
        } else {
          app.href('/pages/projectDetail/projectDetail?id=' + id);
        }
      }
    });
  },
  // 申请查看
  matchApply: function (e) {
    let user_id = wx.getStorageSync('user_id');//获取我的user_id
    let that = this;
    let getMatchList = this.data.getMatchList;
    let pro_id = e.currentTarget.dataset.project;
    app.operationModel('projectApply',this, pro_id, res => {
      getMatchList.forEach((x) => {
        if (x.project_id == pro_id) {
          x.relationship_button = 0;
        }
      });
      that.setData({
        getMatchList: getMatchList
      });
    });
  },
  //重新申请
  matchReApply: function (e) {
    var user_id = wx.getStorageSync('user_id');//获取我的user_id
    let that = this;
    let project_id = e.currentTarget.dataset.project;
    let applyList = this.data.applyList;
    // button-type: 0=申请中 1.申请已通过 2.申请被拒绝(重新申请) 3.推送给我的 4.未申请也未推送(申请按钮)
    wx.request({
      url: url_common + '/api/project/applyProject',
      data: {
        user_id: user_id,
        project_id: project_id
      },
      method: 'POST',
      success: function (res) {
        applyList.forEach((x) => {
          if (x.project_id == project_id) {
            x.handle_status = 0;
          }
        });
        that.setData({
          applyList: applyList
        });
      }
    });
  },
  // 感兴趣
  interesting: function (e) {
    // let that = this;
    // var user_id = wx.getStorageSync('user_id');//获取我的user_id
    let push_id = e.currentTarget.dataset.push;
    let status = e.currentTarget.dataset.status;
    // let pushToList = this.data.pushToList;
    let currentProject_id = e.currentTarget.dataset.project;
    // status: 1 =>感兴趣 2=>不感兴趣 0或3为待处理
    this.setData({
      modalBox: 1,
      currentProject_id: currentProject_id,
      push_id: push_id,
      status: status
    });
  },
  //不感兴趣
  noInteresting: function (e) {
    let that = this;
    var user_id = wx.getStorageSync('user_id');//获取我的user_id
    let push_id = e.currentTarget.dataset.push;
    let status = e.currentTarget.dataset.status;
    let pushToList = this.data.pushToList;
    // status: 1 =>感兴趣 2=>不感兴趣 0或3为待处理
    wx.request({
      url: url_common + '/api/message/handlePushProjectMessage',
      data: {
        user_id: user_id,
        push_id: push_id,
        status: status
      },
      method: 'POST',
      success: function (res) {
        let statusCode = res.data.status_code;
        if (statusCode == 2000000) {
          pushToList.forEach((x) => {
            if (x.push_id == push_id) {
              x.handle_status = 2;
            }
          });
          wx.showToast({
            title: '没兴趣',
            duration: 2000,
            image: "/img/icon-chacha@2x.png"
          });
          that.setData({
            pushToList: pushToList
          });
        } else {
        }
      }
    });
  },
  // 同意或者拒绝
  btn: function (e) {
    var user_id = wx.getStorageSync('user_id');//获取我的user_id
    let that = this;
    let record_id = e.currentTarget.dataset.record;
    // status 1:同意  2:拒绝
    let status = e.currentTarget.dataset.status;
    wx.request({
      url: url_common + '/api/message/handleApplyProjectMessage',
      data: {
        user_id: user_id,
        record_id: record_id
      },
      method: 'POST',
      success: function (res) {
        if (status == 1) {
        } else if (status == 2) {
          that.setData({
            record_id: record_id
          });
        }
      }
    });
  },
  //联系项目方
  contactPerson: function () {
    let user_id = wx.getStorageSync('user_id');
    let that = this;
    app.checkUserInfo(this, res => {
      var complete = res.data.is_complete;
      //如果信息完整就可以联系项目方
      that.setData({
        modalBox: 1
      });
    })
  },
  //关闭模态框
  closeModal: function () {
    this.setData({
      modalBox: 0
    });
  },
  //约谈
  contentProject: function (e) {

    let message = e.detail.value;
    let message_length = e.detail.value.length;
    let that = this;
    if (message_length <= 500) {
      this.setData({
        message: message
      });
    } else {
      app.errorHide(that, "不能超过500个数字", 1000);
    }
  },
  //约谈信息发送
  yesBtn: function () {
    let that = this;
    let currentProject_id = this.data.currentProject_id;
    let push_id = this.data.push_id;
    let pushToList = this.data.pushToList;
    let message = this.data.message;
    let status = this.data.status;
    let user_id = wx.getStorageSync('user_id'); //当前登陆者的 id
    let submitData = {
      url: url_common + '/api/project/met',
      data: {
        user_id: wx.getStorageSync('user_id'),
        project_id: currentProject_id,
        remark: message
      },
    };
    app.buttonSubmit(that, submitData, that.data.buttonOneText, res => {
      // 提交中过渡态处理
      setTimeout(x => {
        this.contactProjectPerson(user_id, push_id, status, pushToList);
      }, 1000);
    });
  },
  //加入项目库
  addProjectLibrary: function (e) {
    let user_id = wx.getStorageSync('user_id');
    let project_id = e.currentTarget.dataset.project;
    let pushToList = this.data.pushToList;
    let that = this;
    app.log("pushList", pushToList);
    wx.request({
      url: url_common + '/api/project/importProject',
      data: {
        user_id: user_id,
        project_id: project_id
      },
      method: 'POST',
      success: function (res) {
        if (res.data.status_code == 2000000) {
          pushToList.forEach((x) => {
            if (x.project_id == project_id) {
              x.import_status = 1;
            }
            that.setData({
              pushToList: pushToList
            });
          });
        } else {
        }
      }
    });
  },
  //联系项目方后..改变样式
  contactProjectPerson(user_id, push_id, status, pushToList) {
    let that = this;
    wx.request({
      url: url_common + '/api/message/handlePushProjectMessage',
      data: {
        user_id: user_id,
        push_id: push_id,
        status: status
      },
      method: 'POST',
      success: function (res) {
        let statusCode = res.data.status_code;
        if (statusCode == 2000000) {
          pushToList.forEach((x) => {
            if (x.push_id == push_id) {
              x.handle_status = 1;
            }
          });
          wx.showToast({
            title: '已感兴趣',
            icon: 'success',
            duration: 2000
          });
          that.setData({
            pushToList: pushToList
          });
        } else {
        }
      }
    });
    that.setData({
      modalBox: 0
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
  },
  // 微信授权绑定
  getPhoneNumber(e) {
    register.getPhoneNumber.call(this, e);
  },
  // 手机号码绑定
  telephoneRegister() {
    register.telephoneRegister.call(this);
  },
  // 关闭绑定方式选择弹框
  closeRegisterModal() {
    register.closeRegisterModal.call(this);
  }
});