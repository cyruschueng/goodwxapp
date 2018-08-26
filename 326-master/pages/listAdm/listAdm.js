var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listAdmBox:[
      {
        label:'电站总数',
        val:'0',
        pic:'/images/vender_main_plant.png'
      }, {
        label: '用户数',
        val: '0',
        pic: '/images/vender_main_user.png'
      }, {
        label: '设备总数',
        val: '0',
        pic: '/images/vender_main_device.png'
      }, {
        label: '告警数',
        val: '0',
        pic: '/images/vender_main_alarm.png'
      },
    ],//电站总数、用户数等4个参数
    EnergyQuintetOneDay: {},//当前功率,当日发电
    PlantCount:'',//电站总数
    PlantsEnergyTotal:'',//累计发电
    PlantsEnergyTotalUnit: '',//累计发电单位
    WarningDeviceCountView:{},//告警数
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    errBox:{},
    AccountInfoAdm:{},    
  },
  listAdmTap:function(e){//跳转至对应页面
    var index = e.currentTarget.id
    if(index == "0"){
      wx.redirectTo({
        url: '/pages/stationAdm/stationAdm',
      })
    } else if (index == "1") {
      wx.redirectTo({
        url: '/pages/user/user',
      })
    } if (index == "2") {
      wx.redirectTo({
        url: '/pages/deviceAdm/deviceAdm',
      })
    } if (index == "3") {
      wx.redirectTo({
        url: '/pages/alarmPage/alarmPage?action=webQueryPlantsWarning',
      })
    }
  },
  ListAdmOut: function () { // 退出
    wx.clearStorage()
    wx.clearStorageSync()
    wx.redirectTo({
      url: '/pages/index/index?fromLoginOut=true',
    })
  },
  ListAdmcenter: function () {// 跳转个人中心
    var that = this;
    wx.navigateTo({
      url: '/pages/centerAdm/centerAdm?PlantCount=' + that.data.PlantCount + '&WarningDeviceCountView=' + JSON.stringify(that.data.WarningDeviceCountView) + '&webQueryAccounts=' + JSON.stringify(that.data.webQueryAccounts) + "&uid=" + that.data.AccountInfoAdm.uid + "&usr=" + that.data.AccountInfoAdm.usr,
    })
  },
  showHider: function (that) {//隐藏图标
    if (that.data.EnergyQuintetOneDay != {} && that.data.PlantsEnergyTotal != '' && that.data.listAdmBox.length==4){
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.editTabBar3();
    if (options.fromIndex == 'true') {// 是否绑定微信
      util.queryWXbind(that)
    }
    wx.showLoading({
      title: '加载中',
      // mask: true,
    })
    that.queryEnergyQuintetOneDayFunc(that) // 查询当前功率、当日发电、
    that.queryPlantsEnergyTotalFunc(that) // 3.29累计发电
    that.queryAdmBasic(that,'queryPlantCount','station') // 查询电站总数
    that.queryAdmBasic(that,'webQueryAccounts','usr')//24.1.2账号查询  查询用户数
    that.queryAdmBasic(that,'webQueryWarningDeviceCountView','dev') // 3.33查询所有电站中的设备告警数
    that.queryAdmBasic(that,'queryPlantsWarningCount','alarm') //24.3.5查询设备数量视图
    
    that.queryAccountInfoFunc(that);
  },
  queryEnergyQuintetOneDayFunc: function (that) {// 查询当前功率、当日发电、累计发电
    util.http_oper(encodeURI("&action=queryPlantsEnergyQuintetOneDay"), function (err, dat, desc) {
      if (err == 0) {
        var dat;
        dat.outputPower = util.formatKw(dat.outputPower,1,1).join('')
        dat.energyToday = util.formatKwh(dat.energyToday)[0]
        dat.energyTodayUnit = util.formatKwh(dat.energyToday)[1]
        dat.energyTotal = util.formatKwh(dat.energyTotal)[0]
        dat.energyTotalUnit = util.formatKwh(dat.energyTotal)[1]
        that.setData({
          EnergyQuintetOneDay:dat 
        })
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
        util.netWork(that)
      },function () {
        that.showHider(that)
      })
  },
  queryPlantsEnergyTotalFunc: function (that) { // 3.29查询所有电站的总发电量
    util.http_oper(encodeURI("&action=queryPlantsEnergyTotal"), function (err, dat, desc) {
      if (err == 0) {
        var dat;
        that.setData({
          PlantsEnergyTotal: util.formatKwh(dat.energy)[0],
          PlantsEnergyTotalUnit: util.formatKwh(dat.energy)[1],
        })
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
      }, function () {
        that.showHider(that)
      })
  },
  queryAdmBasic: function (that, url, type) { // 查询电站总数
    if(type == 'station'){
      var listAdmBox = that.data.listAdmBox[0]
    } else if (type == 'usr') {
      var listAdmBox = that.data.listAdmBox[1]
    } else if (type == 'dev') {
      var listAdmBox = that.data.listAdmBox[2]
    } else if (type == 'alarm') {
      var listAdmBox = that.data.listAdmBox[3]
    }
    
    util.http_oper(encodeURI("&action=" + url), function (err, dat, desc) {
      if (err == 0) {
        if (type == 'station') {
          listAdmBox.val = dat.count
          that.data.listAdmBox[0] = listAdmBox
          that.setData({
            PlantCount: dat.count,
          })
        } else if (type == 'usr') {
          listAdmBox.val = dat.total
          that.data.listAdmBox[1] = listAdmBox
          that.setData({
            webQueryAccounts: dat
          })
        } else if (type == 'dev') {
          listAdmBox.val = dat.total
          that.data.listAdmBox[2] = listAdmBox
          that.setData({
            WarningDeviceCountView: dat
          })
        } else if (type == 'alarm') {
          listAdmBox.val = dat.count
          that.data.listAdmBox[3] = listAdmBox
          that.setData({
            PlantsWarningCount: dat.count
          })
        }
        that.setData({
          listAdmBox: that.data.listAdmBox,
        })
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
      }, function () {
        that.showHider(that)
      })
  },
  queryAccountInfoFunc: function (that) { // 2.4查询账号信息
    util.http_oper(encodeURI("&action=queryAccountInfo"), function (err, dat, desc) {
      if (err == 0) {
        that.setData({
          AccountInfoAdm:dat
        })
        if (dat.vendor){
          wx.setStorageSync('vcodeN', dat.vendor.vcode)
        } else if (dat.dist){
          wx.setStorageSync('vcodeN', dat.dist.vcode)
        }  
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    }, function(){
      that.showHider(that)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
    var that = this;
    wx.showNavigationBarLoading()
    that.queryEnergyQuintetOneDayFunc(that) // 查询当前功率、当日发电、
    that.queryPlantsEnergyTotalFunc(that) // 3.29累计发电
    that.queryAdmBasic(that, 'queryPlantCount', 'station') // 查询电站总数
    that.queryAdmBasic(that, 'webQueryAccounts', 'usr')//24.1.2账号查询  查询用户数
    that.queryAdmBasic(that, 'webQueryWarningDeviceCountView', 'dev') // 3.33查询所有电站中的设备告警数
    that.queryAdmBasic(that, 'queryPlantsWarningCount', 'alarm') //24.3.5查询设备数量视图
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var shareObj = util.shareFunc()
    return shareObj
  }
})