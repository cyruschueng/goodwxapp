let app = getApp();
let url = app.globalData.url;
let url_common = app.globalData.url_common;
let RP = require('../../../utils/model/redPackets.js');
let rp = new RP.redPackets();
import * as shareModel from '../../../utils/model/shareModel.js';
Page({
  data: {
    bg_hongbao2: app.globalData.picUrl.bg_hongbao2,
    open: app.globalData.picUrl.open,
    currentPage: 1
  },
  onLoad: function (options) {
    //红包分享人的id
    let unique_id = options.unique_id;
    let user_id = wx.getStorageSync('user_id');
    console.log(options)
    // 更多群红包信息
    rp.otherGroupHB.call(this)
    // 其他领取人信息
    rp.getHBRecord.call(this, user_id, unique_id)
    // 发红包人和红包信息
    rp.pushHBPerson.call(this, unique_id)
    rp.makeSureHB.call(this)
    this.setData({
      user_id: wx.getStorageSync("user_id"),
      unique_id
    })
  },
  // 跳转到群详情
  redDetail(e) {
    let groupId = e.currentTarget.dataset.groupid;
    app.href('/redPackets/pages/crowdDetail/crowdDetail?groupId=' + groupId)
  },
  // 查看更多群红包
  seeMore() {
    app.href('/redPackets/pages/allCrowdHB/allCrowdHB')
  },
  // 跳转到首页 
  toFirst() {
    app.href("/pages/discoverProject/discoverProject")
  },
  //发红包
  sendHB() {
    app.href("/redPackets/pages/publishHB/publishHB")
  },
  // 加人脉成功后处理(辅助函数)
  contactsAddSuccessFunc(res, added_user_id, num, ) {
    let that = this;
    let whoGet = this.data.whoGet;
    let personInfo = this.data.personInfo;
    if (res.data.status_code == 2000000) {
      if (whoGet) {
        whoGet.forEach(x => {
          if (x.user.user_id == added_user_id) {
            x.is_card = num;
          }
        });
        if (personInfo.user.user_id == added_user_id) {
          personInfo.is_card = num;
        }
        that.setData({
          whoGet: whoGet,
          personInfo: personInfo
        });
      }
    } else {
      app.errorHide(that, res.data.error_Msg, 3000);
    }
  },
  // 申请加人脉
  contactsAdd(e) {
    let added_user_id = e.currentTarget.dataset.id;
    let that = this;
    let onlyPerson = e.currentTarget.dataset.only;
    app.operationModel('contactsAdd', this, added_user_id, function (res) {
      console.log('申请添加人脉完成', res);
      that.contactsAddSuccessFunc(res, added_user_id, 2, onlyPerson);
    });
  },
  // 直接加人脉
  contactsAddDirect(e) {
    let added_user_id = e.currentTarget.dataset.id;
    let onlyPerson = e.currentTarget.dataset.only;
    let that = this;
    app.operationModel('contactsAddDirect', this, added_user_id, function (res) {
      app.log("直接添加人脉完成", res);
      that.contactsAddSuccessFunc(res, added_user_id, 1, onlyPerson);
    });
  },
  // 查看个人名片
  userCard(e) {
    let id = e.currentTarget.dataset.id;
    let user_id = wx.getStorageSync('user_id');
    if (user_id == id) {
      app.href('/pages/my/myCard/myCard')
    } else {
      app.href('/pages/userDetail/networkDetail/networkDetail?id=' + id)
    }
  },
  // 分享页面
  onShareAppMessage() {
    let unique_id = this.data.unique_id;
    let personInfo = this.data.personInfo;
    return shareModel.redPacketsShare(personInfo.user.user_real_name, personInfo.packet.money, unique_id)
  },
  //查看当前发红包的人
  toUserDetail(e) {
    let id = e.currentTarget.dataset.id;
    let user_id = wx.getStorageSync('user_id');
    if (user_id == id) {
      app.href('/pages/my/my/my')
    } else {
      app.href('/pages/userDetail/networkDetail/networkDetail?id=' + id)
    }
  },
  // 加载更多
  loadMore() {
    let currentPage = this.data.currentPage;
    console.log(currentPage)
    let page_end = this.data.page_end;
    let unique_id = this.data.unique_id;
    let user_id = wx.getStorageSync('user_id');
    if (page_end == true) {
      return app.errorHide(this, '没有更多了');
    }
    currentPage++;
    this.setData({
      currentPage
    })
    // rp.groupInsideHB.call(this, groupId, currentPage);
    rp.getHBRecord.call(this, user_id, unique_id, currentPage)
  }
})