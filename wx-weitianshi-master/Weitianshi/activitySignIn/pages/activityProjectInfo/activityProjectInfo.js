var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
import * as ShareModel from '../../../utils/model/shareModel';
Page({
  data: {

  },
  onLoad: function (options) {
    let activity_id = options.activity_id;
    let user_id = wx.getStorageSync("user_id");
    let that = this;
    app.loginPage(function (user_id) {
      that.setData({
        user_id: user_id
      });
    });
    app.httpPost({
      url: url_common + '/api/activity/show',
      data: {
        "user_id": user_id,
        "activity_id": activity_id
      },
    }, this, res => {
      let data = res.data.data;
      this.check(data)
      that.setData({
        data: data,
        competition_id: data.competition_id,
        name: data.activity_title
      })
    })
    that.setData({
      activity_id: activity_id
    })
  },
  // 报名
  signIn(e) {
    let competition_id = e.currentTarget.dataset.competition;
    let activity_id = this.data.activity_id;
    if (competition_id && competition_id != 0){
      app.href("/activitySignIn/pages/activityIdentityInfo/activityIdentityInfo?activity_id=" + activity_id + "&&competition_id=" + competition_id)
    }else{
      app.href("/activitySignIn/pages/activityIdentityInfo/activityIdentityInfo?activity_id=" + activity_id)
    }
  },
  //进入微天使
  toWTS() {
    app.href("/pages/discoverProject/discoverProject")
  },
  //发布活动
  publishActive() {
    app.href("/activitySignIn/pages/publishActive/publishActive")
  },
  //分享
  onShareAppMessage() {
    let that = this;
    return ShareModel.shareActivity(that);
  },
  //报名列表
  personList() {
    let activity_id = this.data.activity_id;
    let competition_id = this.data.competition_id;
    if (competition_id != 0){
      app.href("/activitySignIn/pages/projectList/projectList?activity_id=" + activity_id)
    }else{
      app.href("/activitySignIn/pages/signUpList/signUpList?activity_id=" + activity_id)
    }

  },
  check(data) {
    let detail = data.detail;
    let hasThing = false;
    detail.forEach(x => {
      if (x.describle || x.image.length != 0) {
        this.setData({
          hasThing: true
        })
      }
    })
  }
})