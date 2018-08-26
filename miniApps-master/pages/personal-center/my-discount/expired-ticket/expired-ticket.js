import Api from '../../../../utils/config/config.js';
import { GLOBAL_API_DOMAIN } from '../../../../utils/config/config.js'; 
var app = getApp();
Page({
  data: {
    _build_url: GLOBAL_API_DOMAIN,
    ticket_list: [],
    page: 1,
    isUpdate: true
  },
  onLoad: function (options) {
    
  },
  onShow: function() {
    this.getTicketList();
  },
  onHide: function() {
    this.setData({
      ticket_list: [],
      page: 1,
      isUpdate: true
    });
  },
  //获取我的票券
  getTicketList: function () {
    let that = this;
    wx.request({
      url: that.data._build_url + 'cp/list',
      data: {
        userId: app.globalData.userInfo.userId,
        isUsed: 1,
        page: that.data.page,
        rows: 8
      },
      success: function (res) {
        if (res.data.code == 0) {
          if (res.data.data.list != null && res.data.data.list != [] && res.data.data.list != "") {
            let ticketList = res.data.data.list, ticketArr = that.data.ticket_list;
            for (let i = 0; i < ticketList.length; i++) {
              ticketList[i]["isDue"] = that.isDueFunc(ticketList[0].expiryDate);
              ticketArr.push(ticketList[i]);
            }
            that.setData({
              ticket_list: ticketArr
            })
          } else {
            that.setData({
              isUpdate: false
            })
          }
        } else {
          that.setData({
            isUpdate: false
          })
        }
      }
    })
  },
  //用户上拉触底
  onReachBottom: function () {
    if (this.data.isUpdate) {
      this.setData({
        page: this.data.page + 1
      });
      this.getTicketList();
    }
  },
  //对比时间是否过期
  isDueFunc: function (expiryDate) {
    let currentT = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate() + " 23:59:59",
      isDue = 0;
    if (new Date(expiryDate + " 23:59:59").getTime() < new Date(currentT).getTime()) {
      isDue = 1;
    }
    return isDue;
  }
})