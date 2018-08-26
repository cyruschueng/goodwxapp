let app = getApp();
let url = app.globalData.url;
let url_common = app.globalData.url_common;
import * as ShareModel from '../../../utils/model/shareModel';
Page({
  data: {
    longMore: false,
    listMore: false,
    aisChecked3: true,
    aisChecked4: true,
    textBeyond3: false,
    textBeyond4: false,
    nonet: true
  },

  onLoad: function (options) {
    this.setData({
      investment_id: options.investment_id,
    });
    let that = this;
    app.netWorkChange(that);
  },

  onShow: function () {
    let that = this;
    app.allPoint(that, 0);
    this.orgDetail();
  },
  //展开收起
  allPoint1() {
    var that = this;
    app.allPoint(that, 1);
  },
  // 详情信息获取
  orgDetail() {
    var that = this;
    wx.request({
      url: url_common + '/api/investment/info',
      data: {
        investment_id: this.data.investment_id
      },
      method: 'POST',
      success: function (res) {
        app.log(that,"机构详情", res);
        let orgDetail = res.data.data;
        let info = res.data.data.info;
        let investment_events = res.data.data.investment_events;
        let media_list = res.data.data.news_list;
        let media_list1 = res.data.data.news_list.list;
        let member_list = res.data.data.member_list;
        let memberList = member_list.list;
        let leave_member_list = res.data.data.leave_member_list;
        let leaveList = leave_member_list.list;
        let investId = info.investment_id;
        // 获取指定url
        media_list1.forEach(x => {
          let httpstr = that.cusstr(x.news_url, "/", 3);
          let str = x.news_url.indexOf('//');
          x.news_url = httpstr.substring(str, httpstr.length).substr(2);
        });
        that.setData({
          media_list1: media_list1,
          investId: investId,
          info: info,
          investment_events: investment_events,
          media_list: media_list,
          member_list: member_list,
          memberList: memberList,
          leave_member_list: leave_member_list,
          leaveList: leaveList
        });
        wx.setNavigationBarTitle({
          title: info.investment_name
        });
        // 机构介绍
        if (info.investment_introduce) {
          if (info.investment_introduce.length > 88) {
            that.setData({
              longMore: true
            });
          } else {
            that.setData({
              longMore: false
            });
          }
        }
        // 领域
        if (info.industry_list.length != 0) {
          if (info.industry_list.length > 7) {
            that.setData({
              textBeyond3: true,
              aisChecked3: true,
            });
          } else {
            that.setData({
              textBeyond3: false,
              aisChecked3: false,
            });
          }
        }
        // 轮次
        if (info.stage_list.length != 0) {
          if (info.stage_list.length > 12) {
            that.setData({
              textBeyond4: true,
              aisChecked4: true,
            });
          } else {
            that.setData({
              textBeyond4: false,
              aisChecked4: false,
            });
          }
        }
      }
    });
  },
  //查看全部
  checkMore: function (e) {
    let id = e.target.dataset.id;
    if (id == 5) {
      this.setData({
        industrialChangeMore: 5
      });
    }
  },
  // 折叠
  noCheckMore: function (e) {
    let id = e.target.dataset.id;
    if (id == 5) {
      this.setData({
        industrialChangeMore: 0
      });
    }
  },
  // 领域，轮次中的展开和收起
  allBrightPoint: function (e) {
    let check = e.currentTarget.dataset.check;
    if (check == 3) {
      this.setData({
        aisChecked3: false
      });
    } else if (check == 4) {
      this.setData({
        aisChecked4: false
      });
    }

  },
  noBrightPoint: function (e) {
    let check = e.currentTarget.dataset.check;
    console.log(check);
    if (check == 3) {
      this.setData({
        aisChecked3: true
      });
    } else if (check == 4) {
      this.setData({
        aisChecked4: true
      });
    }

  },
  // 媒体新闻url字符串截取
  cusstr(str, findStr, num) {
    var idx = str.indexOf(findStr);
    var count = 1;
    while (idx >= 0 && count < num) {
      idx = str.indexOf(findStr, idx + 1);
      count++;
    }
    if (idx < 0) {
      return '';
    }
    return str.substring(0, idx);
  },
  // 投资案例跳转
  toCase: function () {
    app.href('/pages/organization/subPage/list_investCase/list_investCase?investment_id=' + this.data.investId);
  },
  // 媒体跳转
  toMedia: function () {
    app.href('/pages/organization/subPage/list_media/list_media?investment_id=' + this.data.investId);
  },
  // 在职跳转
  toMember: function () {
    app.href('/pages/organization/subPage/list_orgMember/list_orgMember?investment_id=' + this.data.investId);
  },
  // 离职成员跳转
  toLeave: function () {
    app.href('/pages/organization/subPage/list_leaveMember/list_leaveMember?investment_id=' + this.data.investId);
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // 分享当前页面
  onShareAppMessage: function () {
    let that = this;
    return ShareModel.orgdetail(that);
  },
  // 重新加载
  refresh() {
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    setTimeout(x => {
      wx.hideLoading();
      this.onShow();
    }, 1500);
  }
});