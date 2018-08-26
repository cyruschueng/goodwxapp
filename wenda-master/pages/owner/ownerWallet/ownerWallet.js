import {GET,POST,promisify} from '../../../libs/request.js';
import {server, imgServer, wxappServer } from '../../../libs/config.js';
var pageNum = 1;
var totalPage = 1;
var listArr = [];
var app = getApp();
Page({
  data: {
      userInfo: {},
      amountInt: "",
      amountFloat: "", 
      list: [],
      empty: false,
      dataEmpty: "../../../images/noAuth.png"
  },
  onReachBottom: function () {
    this.getData();
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },
  onLoad: function (options) {
    // var fromPage = options.comeFrom;
    // if (fromPage === 'index') {
    //   hotapp.onEvent('singCardFromPageIndex');
    // }
  },
  getBalance: function() {
    let sid = app.globalData.sid;
    wx.request({
      url: wxappServer + "help/account/balance",
      data: {sid},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        let count = res.data.data;
        this.setData({
            amountFloat: count ? count / 100 : 0
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  getData: function() {
    if (pageNum > totalPage) return;
    this.setData({
        userInfo: app.globalData.userInfo
    })
    var that = this;
    var sid = app.globalData.sid;
    var pageSize = 20;
    if (pageNum == 1) {
      this.getBalance();
    }
    wx.request({
      url: wxappServer + "help/account/bills/" + pageSize + "/" + pageNum + "?sid=" + sid,
      method: 'GET',
      "content-type": "application/x-www-form-urlencoded", 
      success: function(data){
       if (data.data.suc == '100') return;
       else if (data.data.suc == '200') {
      //  wx.request({
      //    url: wxappServer + "help/account/read?sid=" + sid,     
      //  })  
       var subData = data.data.data;
       totalPage = subData.lastPage;
       var dataList = subData.list;
       for (let i = 0;i < dataList.length;i++) {
          if (dataList[i].toUserId == app.globalData.userId) {
            dataList[i].income = 1;
          } else {
            dataList[i].income = 0;
          }
          dataList[i].amount = dataList[i].amount / 100;
          listArr.push(dataList[i]);
       }
       if (subData && dataList && dataList.length == 0) {
        that.setData({
          empty: true
        });
       }
       that.setData({
          list: listArr,
        });
        that.changeTime(that.data.list);
        pageNum++;
       }
      }
    })
  },
  changeTime: function(arr) {
    var that = this;
    this.data.list.map((item, index) => {
        var defaulTime = 'list[' + index + '].createTime';
        var time = arr[index].createTime;
        that.setData({
            [defaulTime]: that.transfer(time * 1000)
        })
    });
  },
  transfer: function (time) {
        var now = time ? new Date(time) : new Date();
        var nowMonth = now.getMonth() + 1;
        var nowDay = now.getDate();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var min = now.getMinutes();
        var value = '';
        function _tranferDate (val) {
            return val < 10 ? '0' + val : val;
        }
        return `${_tranferDate(nowMonth)}月${_tranferDate(nowDay)}日 ${_tranferDate(hour)}:${_tranferDate(min)}`;
    },
  onShow: function () {
    pageNum = 1;
    totalPage = 1;
    listArr = [];
    this.setData({
      empty: false
    })
    app.login(this.getData, this);
    //this.getData();
  }
})
