import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var APP_BASE = wxappServer;
var mta = require('../../../libs/mta_analysis.js');

Page({
  data: {
    show: false,
    pageNum: 1,
    list: [],
    show: false
  },
  onShow() {
    this.setData({
      show: false,
      pageNum: 1,
      list: []
    })
    APP.login(this.gainAll, this);
  },
  onReachBottom() {
    if (this.data.hasNextPage && !this.data.lock) {
      this.gainList();
      this.setData({
        lock: true
      })
      setTimeout(() => {
        this.setData({
          lock: false
        })
      }, 500)
    }
  },
  gainAll() {
    this.gainList();
  },
  gainList() {
    wx.request({
      url: APP_BASE + `/help/training/order/list/20/${this.data.pageNum}`,
      data: {
        sid: APP.globalData.sid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        let data = res.data;
        if (data.suc === '200') {
          let nowData = data.data;
          if (nowData.list.length) {
            nowData.list.map((item, index) => {
              if (item.processNode) {
                let nowTime = new Date(item.createTime * 1000);
                item.createTime = this.doubleDate(nowTime.getMonth() + 1) + "-" + this.doubleDate(nowTime.getDate()) + " " + this.doubleDate(nowTime.getHours()) + ":" + this.doubleDate(nowTime.getMinutes());
                if (item.gameRegion == 1) {
                  item.gameRegion = '微信大区';
                } else {
                  item.gameRegion = 'QQ大区';
                }
                if (!item.trainer.avatarUrl) {
                  item.trainer.avatarUrl = "https://image.qunmee.com/wxapp/qunmee_task1501658693434.jpg";
                }
                switch (item.processNode) {
                  case 1:
                    item.status = '进行中';
                    item.trainer.nickName = '正在等待接单';
                    break;
                  case 2:
                    item.status = '进行中';
                    break;
                  case 3:
                    item.status = '待认同';
                    break;
                  case 4:
                    item.status = '已完成';
                    break;
                  case 5:
                    item.status = '申诉中';
                    break;
                  case 6:
                    item.status = '申诉中';
                    break;
                  case 7:
                    item.status = '已取消';
                    item.trainer.nickName = '订单已取消';
                    break;
                  case 8:
                    item.status = '已取消';
                    item.trainer.nickName = '订单已取消';
                    break;
                  default:
                    break;
                }
              }
            })
          }
          let newList = this.data.list.concat(nowData.list);
          this.setData({
            total: nowData.total,
            hasNextPage: nowData.hasNextPage,
            pageNum: ++this.data.pageNum,
            show: true,
            list: newList
          })
        }
      }
    })
  },
  doubleDate: function (num) {
    return num < 10 ? '0' + num : num
  },
  toDetail(e) {
    mta.Event.stat("playtodetail", {})
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderId=' + e.currentTarget.dataset.id,
    })
  }
})