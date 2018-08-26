// pages/index/rankList/rankList.js
import {GET,POST,promisify} from '../../../libs/request.js';
import {server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var mta = require('../../../libs/mta_analysis.js');
Page({
  data:{
    activeTab: 'share',
    ifShowRule: true,
    empty:false,
    myInfo: {},
    rankList: [],
    dataEmpty: "../../../images/noAuth.png",
  },
  onLoad: function () {
    mta.Page.init();
  },
  onShow: function() {
    mta.Event.stat("indexrank",{});
    let This = this;
    this.setData({
      activeTab: 'share',
      ifShowRule: true,
      empty:false,
      myInfo: {},
      rankList: [],
    })
    APP.login(function(){
      This.getShareData();
    }, this);
  },
  getShareData: function() {
    let sid = APP.globalData.sid;
    let pageNum = 20;
    wx.request({
      url: wxappServer + "help/top/shareTop/" + pageNum + "?sid=" + sid,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: (res) => {
        let ajaxData = res.data.data;
        console.log(ajaxData.length)
        this.setData({
          myInfo: ajaxData[0]
        });
        if (ajaxData.length > 1) {
          ajaxData.splice(0,1);
          this.setData({
            rankList: ajaxData
          });
        } else {
          this.setData({
            empty: true
          });
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  getmasterData: function () {
    let sid = APP.globalData.sid;
    let pageNum = 20;
    wx.request({
      url: wxappServer + "help/top/acceptTop/" + pageNum + "?sid=" + sid,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        let ajaxData = res.data.data;
        this.setData({
          myInfo: ajaxData[0]
        });
        if (ajaxData.length >1) {
          ajaxData.splice(0,1);
          this.setData({
            rankList: ajaxData
          });
        } else {
          this.setData({
            empty: true
          });
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  chooseTab: function(ev) {
    let target = ev.currentTarget.dataset.tab;
    this.setData({
      activeTab: target
    });
    if (target === 'share') {
      this.getShareData();
    }
    else {
       this.getmasterData();
    }
  },
  showRules: function() {
    let ifShowRule = this.data.ifShowRule;
    this.setData({
      ifShowRule: false 
    })
  },
  hideRules: function() {
    this.setData({
      ifShowRule: true 
    })
  }
})