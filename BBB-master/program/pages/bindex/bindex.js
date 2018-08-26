const util = require('../../utils/util.js')
const HOST = 'https://bit.macsen318.com/xcx';
//index.js
//获取应用实例
const app = getApp();
const PAGESIZE = 10;
let curPage = 1;
let isPullDownRefreshing = false;
Page({
  data: { 
    motto: '',
    scrollHeight:0,
    list:[]
  },
  onReady:function(){
    
  },
  onShow:function(){
    let ops = wx.getStorageSync('ops');
    let that = this;
    if (ops.scene !== 1044) {
      that.getTokenByList(() => { that.fetchList(); that.getDate()});
    } else {
      that.fetchList();
      that.getDate();
    }
  },
  //从小程序列表
  getTokenByList: function (cb) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let openid = wx.getStorageSync('openid');
    let url = `${HOST}/main/addUser/${openid}`;
    openid && wx.request({
      url: url,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        console.log('token:' + res.data.details.token);
        wx.setStorageSync('token', res.data.details.token);
        cb && cb();
      },
      fail: function () {
        wx.hideLoading()
      }
    })
  }, 
  onShareAppMessage: function (res) {
       console.log(res.from)
    let coinName = res.target.dataset.coinname;
    return {
      title: coinName,
      path: `/pages/voteresult/voteresult?coin=${coinName}`,
      success: function (res) {
        console.log('shareTickets'+res.shareTickets[0])
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    })

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  lower: function () {
    console.log("reach to lower...");
    curPage = curPage + 1;
    this.fetchList();
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh...');
    curPage = 1;
    isPullDownRefreshing = true;
    this.fetchList();
  },

  fetchList: function () {
    wx.showNavigationBarLoading();
    var that = this;
    util.requestGet(`main/getAll${PAGESIZE}/${curPage}`,function(response){
      wx.hideNavigationBarLoading();
      let content = response.content||[];
      content.forEach(function(item){
        item['gainPercent'] = parseFloat(+item.gain /(+item.total) * 100)+'%';
          item['lossPercent'] = parseFloat(item.loss / (+item.total)*100) + '%';
          item['isGain'] = (+item.gain) > (+item.loss)? true : false;
          if ((+item.gain) > (+item.loss)){
            item['isGain'] = 1;
          } else if ((+item.gain) < (+item.loss)){
            item['isGain'] = 2;
          } else if ((+item.gain) == (+item.loss)){
            item['isGain'] = 3;
          }
      });
      let list = that.data.list||[];
      list.push(content);
      that.setData({
        list: list
      });
      if (isPullDownRefreshing)
        wx.stopPullDownRefresh();
    });
  },
  getDate:function(){
    var that = this;
    util.requestGet(`main/getPeriods`, function (response) {
      let date = response.details.date;
      that.setData({
        motto: date
      })
    });
  }
})
