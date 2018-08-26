// pages/core/empty/empty.js
//获取应用实例
var app = getApp();

// 定义常量数据
var WEEK_DATA = ['', '第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周',
  '十一周', '十二周', '十三周', '十四周', '十五周', '十六周', '十七周', '十八周', '十九周', '二十周'],
  DAY_DATA = ['', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  CLASSTIME_DATA = ['', { time: '1-2节', index: '1' }, '', { time: '3-4节', index: '3' }, '', { time: '5-6节', index: '5' },

    '', { time: '7-8节', index: '7' }, '', { time: '9-10节', index: '9' }],
  BUILDING_DATA = ['', '一教', '二教', '三教', '四教', '五教',];

Page({
  data: {
    DATA: {
      WEEK_DATA: WEEK_DATA,
      DAY_DATA: DAY_DATA,
      CLASSTIME_DATA: CLASSTIME_DATA,
      BUILDING_DATA: BUILDING_DATA,
    },
    active: { // 发送请求的数据对象 初始为默认值
      weekNo: 1,
      weekDay: 1,
      buildingNo: 3,
      classNo: 1,
    },
    floors: [],
    nowWeekNo: 1,
    testData: null
  },

  onLoad: function () {
    this.setData({
      // 'nowWeekNo': app._time.week,
      // 'active.weekNo': app._time.week
      'nowWeekNo': "8",
      'active.weekNo': "8"
    });
    // 初始默认显示
    this.sendRequest();
  },

  //下拉更新
  onPullDownRefresh: function () {

    this.sendRequest();
  },

  // 发送请求的函数
  sendRequest: function (query, bd) {

    app.showLoadToast();

    var that = this;
    var query = query || {}, activeData = that.data.active;
    var requestData = {
      weekNo: query.weekNo || activeData.weekNo,
      weekDay: query.weekDay || activeData.weekDay,
      classNo: that.data.DATA.CLASSTIME_DATA[query.classNo || activeData.classNo].index,
      buildingNo: query.buildingNo || activeData.buildingNo,
      openid: app._user.openid,
    };

    // 对成功进行处理
    function doSuccess(data) {
      var arrXm = [];
      var floor1 = [];
      var floor2 = [];
      var floor3 = [];
      var floor4 = [];
      var floor5 = [];
      var floor6 = [];
      var floorn = [];
      for (var i = 0; i < data.length; i++) {
        arrXm = data[i].empty_no.split('');
        switch (Number(arrXm[1])) {
          case 1:
            floor1.push(data[i].empty_no);
            break;
          case 2:
            floor2.push(data[i].empty_no);
            break;
          case 3:
            floor3.push(data[i].empty_no);
            break;
          case 4:
            floor4.push(data[i].empty_no);
            break;
          case 5:
            floor5.push(data[i].empty_no);
            break;
          case 6:
            floor6.push(data[i].empty_no);
            break;
          default:
            floorn.push(data[i].empty_no);
        }
      }
      that.setData({
        'floors.1': floor1,
        'floors.2': floor2,
        'floors.3': floor3,
        'floors.4': floor4,
        'floors.5': floor5,
        'floors.6': floor6,
        'floors.n': floorn,
        'errObj.errorDisplay': true
      });
    }

    // 对失败进行处理
    function doFail(message) {

      app.showErrorModal(message);
    }

    // 发送请求
    wx.request({
      url: app._server + '/api/empty.php?empty_week=8&empty_day=' + requestData.weekDay + '&empty_time=' + requestData.classNo + '&empty_no=' + requestData.buildingNo,
      method: 'GET',
      data: {},
      success: function (res) {
        if (res.data && res.data.code === 200) {
          doSuccess(res.data.data);
          //执行回调函数
          if (bd) { bd(that); }
        } else {
          doFail(res.data.message);
        }
      },
      fail: function (res) {
        doFail(res.errMsg);
      },
      complete: function () {
        wx.hideToast();
        wx.stopPullDownRefresh();
      }
    });
  },

  // week
  chooseWeek: function (e) {

    var index = parseInt(e.target.dataset.weekno, 10);

    if (isNaN(index)) { return false; }

    this.sendRequest({
      weekNo: index
    }, function (that) {
      that.setData({
        'active.weekNo': index
      });
    });
  },

  // day
  chooseDay: function (e) {

    var index = parseInt(e.target.dataset.dayno, 10);

    if (isNaN(index)) { return false; }

    this.sendRequest({
      weekDay: index
    }, function (that) {
      that.setData({
        'active.weekDay': index
      });
    });
  },

  // classTime
  chooseClaasTime: function (e) {

    var index = e.target.dataset.classno;

    if (isNaN(index)) { return false; }

    this.sendRequest({
      classNo: index
    }, function (that) {
      that.setData({
        'active.classNo': index
      });
    });
  },

  // building
  chooseBuilding: function (e) {

    var index = parseInt(e.target.dataset.buildingno, 10);

    if (isNaN(index)) { return false; }

    this.sendRequest({
      buildingNo: index
    }, function (that) {
      that.setData({
        'active.buildingNo': index
      });
    });
  }
});