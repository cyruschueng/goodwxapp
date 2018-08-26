var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    apply_id: '',
    activity_id: '',
    activity: '',
    userInfo: '',
    user_id: '',
    apply_bg: app.globalData.picUrl.apply_bg,
    investorList: [],
    currentPage: 1,
    page_end: false
  },
  onLoad(options) {
    let activity_id = options.activity_id;
    let user_id = wx.getStorageSync("user_id")
    this.setData({
      activity_id: activity_id
    })
    app.getSession(user_id => {
      this.setData({
        user_id
      })
      this.getActivityDetail(activity_id, user_id);
    })
  },
  // 获取项目详情和用户信息
  getActivityDetail(activity_id, user_id) {
    app.httpPost({
      url: url_common + '/api/activity/applyUserInfo',
      data: {
        "user_id": user_id,
        "activity_id": activity_id,
      }
    }, this).then(res => {
      console.log(res)
      this.setData({
        activity: res.data.data.activity,
        userInfo: res.data.data.user
      })
      wx.hideLoading();
      this.getSignForm(activity_id, user_id)
    }).catch(res => {
      app.errorHide(this, res.data.error_msg);
    })
  },
  // 获取签到名单
  getSignForm(activity_id, user_id) {
    if (this.data.page_end) {
      app.errorHide(this, '没有更多了')
    } else {
      wx.showLoading({
        title: 'loading',
        mask: true
      })
      app.httpPost({
        url: url_common + '/api/activity/applyUserList',
        data: {
          activity_id: activity_id,
          user_id: user_id || 0,
          page: this.data.currentPage
        }
      }, this).then(res => {
        let currentPage = this.data.currentPage;
        let investorList = this.data.investorList;
        let newPage = res.data.data.list;
        currentPage++;
        investorList = investorList.concat(newPage);
        this.setData({
          currentPage: currentPage,
          investorList: investorList,
          page_end: res.data.data.page_end
        })
        wx.hideLoading();
      })
    }
  },
  // 跳转到活动议程页面
  goToActivityAgenda() {
    app.href('/activitySignIn/pages/activityAgenda/activityAgenda');
  },
  // 跳转用户详情
  userDetail(e) {
    let id = e.currentTarget.dataset.id
    var user_id = wx.getStorageSync("user_id");//用戶id
   if(id){
     if (id == user_id) {
       app.href('/pages/my/my/my');
     } else {
       app.href('/pages/userDetail/networkDetail/networkDetail?id=' + id)
     }
   }
  },
  // 直接加人脉
  contactsAddDirect(e) {
    let added_user_id = e.currentTarget.dataset.id;
    let that = this;
    app.operationModel('contactsAddDirect', that, added_user_id, function (res) {
      console.log('直接添加人脉完成', res)
      that.contactsAddSuccessFunc(res, added_user_id, 1);
    });
  },
  // 加好友
  contactsAdd(e) {
    let id = e.currentTarget.dataset.id;
    app.operationModel('contactsAdd', this, id, res => {
      console.log(res)
      let investorList = this.data.investorList;
      this.contactsAddSuccessFunc(res, id, 2);
    })
  },
  // 加人脉成功后处理(辅助函数)
  contactsAddSuccessFunc(res, added_user_id, num) {
    let that = this;
    let investorList = this.data.investorList;
    let faList = this.data.faList
    if (res.data.status_code == 2000000) {
      //更改投资人和FA列表中该人的加人脉按钮的字段
      if (investorList) {
        investorList.forEach(x => {
          if (x.user_id == added_user_id) {
            x.follow_status = num
          }
        })
        that.setData({
          investorList: investorList
        })
      }
      if (faList) {
        faList.forEach(x => {
          if (x.user_id == added_user_id) {
            x.follow_status = num
          }
        })
        that.setData({
          faList: faList
        })
      }
    } else {
      app.errorHide(that, res.data.error_Msg, 3000)
    }
  },
  // 一键拔号
  telephone(e) {
    let telephone = e.currentTarget.dataset.telephone;
    wx.makePhoneCall({
      phoneNumber: telephone,
    })
  },
  // 提交项目
  projectPush(e) {
    let pushed_id = e.currentTarget.dataset.id;
    console.log(pushed_id);
    app.operationModel('projectPush', this, pushed_id)
  },
  //跳转微天使首页
  goToIndex() {
    app.href('/pages/discoverProject/discoverProject');
  },
  //加载更多
  loadMore() {
    this.getSignForm(this.data.activity_id, this.data.user_id)
  }
})