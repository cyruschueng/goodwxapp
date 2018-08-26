//index.js

import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';
import * as AuthService from '../../services/auth-service';
import { flattenDeep } from '../../utils/npm/lodash-wx';

var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapKey = 'JJSBZ-TZ4CO-GW3WF-SLT4O-KR4BO-D5FGW';

const pageOptions = {
  data: {
    bodyHidden: true,
    emptyHidden: true,
    // 酒店基本信息
    hotelInfo:{},
    // 评分
    score: [],

    // 宴会厅
    ballrooms: [],
    ballroomsNum: 0,
    ballPackText: "收起",

    // 婚宴菜单
    weddingmenu: [],
    weddingmenuNum: 0,

    // 宴会庆典
    banquet: [],

    // 婚礼人才
    talents: []
  },
  //事件处理函数
  onLoad: function () {

    // 取数据
    this.getHotelData();    

  },

  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    // 取数据
    this.getHotelData();
    
    wx.startPullDownRefresh()
  },

  //页面跳转
  goBallroomPage (e) {
    var id = e.currentTarget.dataset.ballroomid;
    wx.navigateTo({
      url: '../ballroom/ballroom?ballroomid=' + id
    })
  },
  goCelebrationDetailsPage (e) {
    wx.navigateTo({
      url: '../celebration/celebrationDetails?celebrationid=' + e.currentTarget.id + '&prepagetype=home'
    })
  },
  goDishesDetailsPage (e) {
    wx.navigateTo({
      url: '../dishes/dishesDetails?dishesid=' + e.currentTarget.id + '&prepagetype=home',
    })
  },
  goCelebrationListPage () {
    wx.navigateTo({
      url: '../celebration/celebrationList?prepagetype=home',
    })
  },
  goTalentDetailsPage (e) {
    wx.navigateTo({
      url: '../talents/talentDetails?talentid=' + e.currentTarget.id + '&prepagetype=home',
    })
  },
  goTalentListPage () {
    wx.navigateTo({
      url: '../talents/talentListView?prepagetype=home',
    })
  },
  goBallroomListViewPage () {
    wx.navigateTo({
      url: '../ballroom/ballroomListView?prepagetype=home',
    })
  },

  // 点击事件
  bindLocationTap: function () {

    //初始化 腾讯地图提供地理编码，拿到经纬度后打开 微信内置地图
    var me = this;
    var qqmapsdk = new QQMapWX({
      key: qqmapKey
    });

    qqmapsdk.geocoder({
      address: me.data.hotelInfo.hotelLocation,
      success: function (res) {

        wx.openLocation({
          name: me.data.hotelInfo.hotelName,
          address: me.data.hotelInfo.hotelLocation,
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          scale: 28
        })

      },
      fail: function (res) {
        console.log('qqmapsdk error' + JSON.stringify(res));
      },
      complete: function (res) {
        // console.log(res);
      }
    });

  },
  bindPhoneCallTap (e) {
    console.log(this.data.hotelInfo.hotelPhonecall);
    wx.makePhoneCall({
      phoneNumber: this.data.hotelInfo.hotelPhonecall
    })
  },
  bindHotelDescTap (e) {
    wx.showModal({
      title: e.currentTarget.dataset.title,
      showCancel: false,
      content: e.currentTarget.dataset.content
    })
  },

  // 取数据
  getHotelData() {
    var me = this;
    HotelDataService.queryHotelHome().then((result) => {
      // console.log("success = " + JSON.stringify(result.hotel));
      // console.log("gethoteldata success...");

      if (result.hotel) {
        var hotelInfo = result.hotel ? hoteldata.formatHotelInfo(result.hotel) : {};

        me.setData({
          bodyHidden: false,
          hotelInfo: hotelInfo,
          score: hoteldata.getScoreStart(hotelInfo.hotelScore),
          ballrooms: result.banquetHallList ? hoteldata.getTheTopN(hoteldata.formatBallrooms(result.banquetHallList), 2) : [],
          ballroomsNum: result.banquetHallList ? result.banquetHallList.length : [],
          weddingmenu: result.comboList ? hoteldata.formatWeddingmenu(result.comboList) : [],
          weddingmenuNum: result.comboList ? result.comboList.length : 0,
          banquet: result.celebrationList ? hoteldata.formatBanquet(result.celebrationList) : [],
          talents: result.talentList ? flattenDeep(hoteldata.formatHomeTalent(result.talentList)) : []
        })

        // 保存 预付定金比例
        wx.setStorageSync('prepayPercent', result.hotel.prepayPercent);
      } else {
        me.setData({
          emptyHidden: false,
        })
      }

      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新

    }).catch((error) => {
      console.log(error);
    })
  }


};

Page(pageOptions);
