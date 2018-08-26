var app = getApp();
var url_common = app.globalData.url_common;
Page({
  data: {
    count: 0,
    nonet: true,
    messageList: [
      {
        event: "projectApply",
        iconPath: "/img/icon-shenqing@2x.png",
        message_name: "项目申请",
        count: 0,
        type_id: 0
      },
      {
        event: "projectPush",
        iconPath: "/img/icon-tijiao456.png",
        message_name: "项目提交",
        count: 0,
        type_id: 0
      },
      {
        event: "beAddedContacts",
        iconPath: "/img/icon-tijiao123.png",
        message_name: "好友申请",
        count: 0,
        type_id: 0
      } 
    ],
    status: 0
  },
  onLoad:function(){
    let that=this;
    app.netWorkChange(that);
  },
  onShow: function () {
    var that = this;
    var user_id = wx.getStorageSync('user_id');
    var messageList = this.data.messageList;
    let count = this.data.count;
    let type_id = this.data.type_id;
    if (user_id) {
      wx.request({
        url: url_common + '/api/message/messageType',
        data: {
          user_id: user_id
        },
        method: 'POST',
        success: function (res) {
          var list = res.data.data;
          list.forEach((x, index) => {
            messageList[index].message_name = x.message_name;
            messageList[index].count = x.count;
            messageList[index].type_id = x.type_id;
            if (x.count) {
              messageList[index].count = x.count;
            } else {
              messageList[index].count = 0;
            }
          });
          that.setData({
            messageList: messageList,
            count: count,
            type_id: type_id
          });
        }
      });
    }
  },
  // 跳转到人脉申请页面
  beAddedContacts: function () {
    app.href('/pages/message/beAddedContacts/beAddedContacts');
  },
  // 项目申请跳转
  projectApply: function (e) {
    let type = e.currentTarget.dataset.type;
    let group_id = this.data.group_id;
    app.delayDeal(x=>{
      if (group_id) {
        app.href('/pages/message/applyProject/applyProject?type=' + type + '&&group_id=' + group_id);
      } else {
        app.href('/pages/message/applyProject/applyProject?type=' + type);
      }
    });
  },
  // 项目推送
  projectPush: function (e) {
    let type = e.currentTarget.dataset.type;
    let group_id = this.data.group_id;
    if (group_id) {
      app.href('/pages/message/pushProject/pushProject?type=' + type + '&&group_id=' + group_id);
    } else {
      app.href('/pages/message/pushProject/pushProject?type=' + type);
    }
  },
  //测试一键尽调
  testOneKey() {
    app.href('/pages/oneKeyResearch/oneKeyResearch?id=RpAQ5jpx');
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