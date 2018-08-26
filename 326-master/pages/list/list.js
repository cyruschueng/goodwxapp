//获取应用实例 tapBox.tapTop.topName
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    listNavData :{
      monthPower:'0',//月发电量
      yearPower:'0',//年发电量
      width:'width50',
      outPutT: '0',
      listNav: [
        {
          pic:'/images/dat1.png',
          label: '当日发电',
          val: '0kWh',
          valUnit: ''
        }, {
          pic: '/images/pro1.png',
          label: '当日收益',
          val: '0',
          valUnit: ''
        }, {
          pic: '/images/dat2.png',
          label: '累计发电',
          val: '0kWh',
          valUnit: ''
        }, {
          pic: '/images/pro2.png',
          label: '累计收益',
          val: '0',
          valUnit: ''
        },
      ]
    },
    tapBox:{
      tapTop:{
        topName:'所有电站',
        topPic:'/images/xiala.png',
        width: '0.8rem',
        height: '0.8rem',
        subMenuDisplay: initSubMenuDisplay(),
        topSerial:0
      },
      tapList: [{
        name: '所有电站',
        pic: '/images/all.png'
      }, {
        name: '正常电站',
        pic: '/images/round3.png'
      }, {
        name: '告警电站',
        pic: '/images/round1.png'
      }, {
        name: '提醒电站',
        pic: '/images/round2.png'
      }, {
        name: '离线电站',
        pic: '/images/round.png'
      }]
    },
    inputBox: {
      pic: '/images/sousuo_black.png',
      bgColor:'#fff',
      color:'#808080',
      Val: '',
      placeHoder: '请输入电站名称'
    },
    errBox:{},
    wx_userInfo:{},
    PlantsEnergy:[],
    showAllisH: true,//nav下菜单
    webQueryPlants: [],
    stationBox: {
      more: false,
      list: [],
    },
    page: 0,
    pagesize: 10,
    secBuild: false,//显示一键创建
    touch_start: 0,
    touch_end: 0,
    sName: '',// 电站条件
    statusVal: '',
    accountInfo: {},
    noStation:false,
    ModeTimes:5,
    ModelHide: ['', '', '', '', ''],
  },
  QRcode:function(){
    util.QRcode()
  },
  More: function () {// 加载更多
    var that = this;
    that.setData({
      page: that.data.page + 1
    })
    that.webQueryPlantsFunc(that)
  },
  stationTap: function (e) {
    let that = this;
    var touchTime = that.data.touch_end - that.data.touch_start;
    if (touchTime > 350) {
      that.delItem(that, e)
    } else {
      that.dataPage(that, e)
    }
  },
  //按下事件开始  
  mytouchstart: function (e) {
    let that = this;
    that.setData({
      touch_start: e.timeStamp
    })
  },
  //按下事件结束  
  mytouchend: function (e) {
    let that = this;
    that.setData({
      touch_end: e.timeStamp
    })
  },
  showAllis: function (e) {
    var that = this
    that.setData({
      showAllisH: !that.data.showAllisH
    })
  },
   
  delItem: function (that, e) {//点击删除按钮事件
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
            mask: true,
          })
          
          var index = e.currentTarget.dataset.key;//获取列表中要删除项的下标 
          util.http_oper(encodeURI("&action=delPlant&plantid=" + that.data.webQueryPlants[index].pid), function (err, dat, desc) {
            if (err == 0) {
              wx.redirectTo({
                url: '/pages/list/list',
              })
            } else {
              util.errBoxFunc(that, err, desc)
            }
          }, function () {
            util.netWork(that)
          }, function () {
            wx.hideLoading()
          })
        }
      }
    })
  },
  
  mapPage: function () {// 跳转到地图
    var that = this;
    wx.navigateTo({
      url: '/pages/map/map?usr=' + that.data.accountInfo.usr,
    })
  },

 
  mapPage0: function () { // 一键创建电站
    var that = this;
    var date = new Date().getFullYear() + '-' + util.doubDigit(new Date().getMonth() + 1) + '-' + util.doubDigit(new Date().getDate())
    
    var d = new Date();// 获得当前时区
    var timezoneN = -(d.getTimezoneOffset() * 60)
    
    app.getLocationInfo(function (locationInfo) {// 获取当前位置
      that.setData({
        longitudeN: locationInfo.longitude,
        latitudeN: locationInfo.latitude,
      })
    })
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    var url = "&action=addPlant&profit.currency=￥&nominalPower=5&name=plant&install=" + date + '&profit.unitProfit=' + 1.02 + '&profit.coal=' + 0.400 + '&profit.co2=' + 0.997 + '&profit.so2=' + 0.030 + "&address.timezone=" + timezoneN + '&address.lon=' + that.data.longitudeN + '&address.lat=' + that.data.latitudeN + '&picBig=http://img.shinemonitor.com/img/2017/12/22/201712221616381182F135C33.png&picSmall=http://img.shinemonitor.com/img/2017/12/22/201712221616381182F135C34.png'
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        wx.hideLoading()
        wx.showToast({
          title: '创建成功！',
          icon: 'success',
          duration: 1500
        })
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/list/list',
          })
        }, 1500)
      } else {
        wx.hideLoading()
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      wx.hideLoading()
      util.netWork(that)
    }, function () {
      
    })
  },
  
  dataPage: function (that,e) {// 跳转dataPage
    var that = this;
    var checkPlant = that.data.webQueryPlants[e.currentTarget.dataset.key]
    var app = getApp();
    wx.setStorageSync('Plant', that.data.webQueryPlants)
    wx.setStorageSync('checkPlant', checkPlant)
    wx.setStorageSync('PlantIn', 'listIn')
    wx.navigateTo({
      url: '/pages/dataPage/dataPage',
    })
  },
 
  inputTap: function (e) { // 搜索电站
    var that = this;
    that.setData({
      webQueryPlants: []
    })
    if (util.trim(e.detail.value) != null) {
      that.setData({
        sName: util.trim(e.detail.value)
      })
      that.webQueryPlantsFunc(that)
    }
  },
  // 查询电站co2 so2
  querycoPower: function (that) {
    util.http_oper(encodeURI("&action=queryPlantsProfitStatisticOneDay"), function (err, dat, desc) {
      if (err == 0) {
        that.setData({
          PlantsEnergy: dat
        })
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    }, function () {
      that.data.ModelHide[0] = true
      that.setData({
        ModelHide: that.data.ModelHide
      })
      that.ModelHideFunc(that)
    })
  },
  // 查询所有电站总的装机容量
  queryNorPower: function (that) {
    util.http_oper(encodeURI("&action=queryPlantsNominalPower"), function (err, dat, desc) {
      if (err == 0) {
        that.setData({
          queryNorPower: util.formatKw(dat.nominalPower, 1, 1).join("")
        })
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    }, function () {
      that.data.ModelHide[1] = true
      that.setData({
        ModelHide: that.data.ModelHide
      })
      that.ModelHideFunc(that)
    })
  },
  onLoad: function (opt) {
    var that = this;
    util.queryOpenid()
    app.editTabBar();
    if (opt.fromIndex == 'true') {// 是否绑定微信
      util.queryWXbind(that)
    }
    that.eneryTotal()//nav四个发电量数据
    that.queryListInfo(that)//用户名设置页面名称
    that.webQueryPlantsFunc(that)// 请求账号信息：用户名  用户id end
    // 总的装机容量
    that.queryNorPower(that)
    that.querycoPower(that)
  },
  eneryTotal:function(){
    var that = this
    that.data.ModelHide[2] = false
    var listNavData = that.data.listNavData
    util.http_oper(encodeURI("&action=queryPlantsEnergyQuintetOneDay"), function (err, dat, desc) {
      if (err == 0) {
        that.setData({
          monthPower: dat.energyMonth,
          yearPower: dat.energyYear
        })
        listNavData.outPutT = util.formatKw(dat.outputPower, 1, 0)
        listNavData.listNav[0].val = util.formatKwh(dat.energyToday).join('')//值 当日发电

        listNavData.listNav[2].val = util.formatKwh(dat.energyTotal).join('')//累计发电

        that.data.listNavData = listNavData
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    }, function () {
      that.data.ModelHide[2] = true
      that.setData({
        ModelHide: that.data.ModelHide
      })
      that.ModelHideFunc(that)
      that.profitDay(listNavData)
    })
  },
  profitDay: function (listNavData){
    var that = this
    var listNavData = listNavData
    util.http_oper(encodeURI("&action=queryPlantsProfitStatisticOneDay"), function (err, dat, desc) {
      if (err == 0) {
        listNavData.listNav[1].val = util.turnVal(dat.profit)//当日收益
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    }, function () {
      that.profitTotal(listNavData)
    })
  },
  profitTotal: function (listNavData){
    var that = this
    var listNavData = listNavData
    util.http_oper(encodeURI("&action=queryPlantsProfitStatistic"), function (err, dat, desc) {
      if (err == 0) {
        listNavData.listNav[3].val = util.turnVal(dat.profit)//累计收益
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    }, function () {
      that.setData({
        listNavData: listNavData
      })
    })
  },

  queryListInfo: function (that) {// 请求账号信息：用户名  用户id
    util.http_oper(encodeURI("&action=queryAccountInfo"), function (err, dat, desc) {
      if (err == 0) {
        that.setData({
          accountInfo: dat
        })
        wx.setNavigationBarTitle({ title: dat.usr })// 设置页面名称
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    },function(){
      that.data.ModelHide[3] = true
      that.setData({
        ModelHide: that.data.ModelHide
      })
      that.ModelHideFunc(that)
    })
  },
  ModelHideFunc: function (that) {
    var hideBox = that.data.ModelHide
    var sum = 0
    for (var i = 0; i < hideBox.length;i++){
      if (hideBox[i]==true){
        sum+=1
      }
    }
    if (sum == that.data.ModeTimes) {
      wx.hideLoading()
      var shareWidth = wx.getSystemInfoSync('screenVal').windowWidth
      var listNav = that.data.listNavData.listNav
      var id = {
        'energyTodayT': parseFloat(listNav[0].val),//当日发电
        'energyTotalT': parseFloat(listNav[2].val),//当月
        'profitT': listNav[1].val,//当日收益
        'TotprofitT': listNav[3].val,//累计收益
        'shareWidth': shareWidth,
        'monthPower': util.formatKwh(that.data.monthPower)[0],
        'yearPower': util.formatKwh(that.data.yearPower)[1],
        "so2": util.turnVal((parseFloat(that.data.PlantsEnergy.so2) * parseFloat(listNav[2].val)).toFixed(1)),
        "co2": util.turnVal((parseFloat(that.data.PlantsEnergy.co2) * parseFloat(listNav[2].val)).toFixed(1)),
        "coal": util.turnVal((parseFloat(that.data.PlantsEnergy.coal) * parseFloat(listNav[2].val)).toFixed(1)),
        'queryNorPower': that.data.queryNorPower,
        'accountInfo': that.data.accountInfo,
        'monthPowerUnit': util.formatKwh(that.data.monthPower)[1],//月单位
        'yearPowerUnit': util.formatKwh(that.data.yearPower)[1],//年单位
        'energyTodayTUnit': listNav[0].val.substr(listNav[0].val.length - 3, 3),
        'energyTotalTUnit': listNav[2].val.substr(listNav[2].val.length - 3, 3),
      }
      wx.setStorageSync("shareId", id)
    }
  },
  // 所有电站总收益 end
  onShareAppMessage: function () {
    var shareObj = util.shareFunc()
    return shareObj
  },
  // 电站列表请求 
  webQueryPlantsFunc: function (that) {
    wx.showLoading({
      title: '加载中',
      mask: false,
    })
    var url = "&action=webQueryPlants&page=" + that.data.page + "&pagesize=" + that.data.pagesize
    if (that.data.statusVal != '') {
      url += '&status=' + that.data.statusVal
    }
    if (that.data.sName != '') {
      url += '&plantName=' + that.data.sName
    }
    that.setData({
      noStation: false,
    })
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        if (dat.plant.length < 10) {
          that.data.stationBox.more = false
        } else {
          that.data.stationBox.more = true
        }
        that.setData({
          secBuild: true,
          stationBox: that.data.stationBox
        })
        dat.plant = that.data.webQueryPlants.concat(dat.plant)
        for (var index in dat.plant) {
          dat.plant[index].Label1 = "当前功率："
          dat.plant[index].Label2 = "日发电量："
          dat.plant[index].Label3 = "当日收益(￥)："
          dat.plant[index].Label4 = "总发电量："
         
          if (dat.plant[index].picSmall == undefined) { // 图片不存在的情况
            dat.plant[index].picSmall = '/images/plant_img1.png'
          } else {
            var picUnde = dat.plant[index].picSmall.substring(28, dat.plant[index].picSmall.length) == 'undefined';
          }
          if (picUnde) {
            dat.plant[index].picSmall = '/images/plant_img1.png'
          }
          
          dat.plant[index].outputPower = util.formatKw(dat.plant[index].outputPower, 1, 0)// 当前功率
          dat.plant[index].outputPowerUnit = util.formatKw(dat.plant[index].outputPower, 0, 0)
          
          dat.plant[index].pro = util.turnVal((parseFloat(dat.plant[index].profit.unitProfit) * parseFloat(dat.plant[index].energy)))// 当日收益
          dat.plant[index].energy = util.formatKwh(dat.plant[index].energy).join('')
          dat.plant[index].energyTotal = util.formatKwh(dat.plant[index].energyTotal).join('')
          dat.plant[index].nominalPower = util.formatKw(dat.plant[index].nominalPower, 1, 0)
          dat.plant[index].nominalPowerUnit = util.formatKw(dat.plant[index].nominalPower, 0, 0)

          dat.plant[index].val1 = dat.plant[index].outputPower + dat.plant[index].outputPowerUnit
          dat.plant[index].val2 = dat.plant[index].energy
          dat.plant[index].val3 = dat.plant[index].pro
          dat.plant[index].val4 = dat.plant[index].energyTotal
        }
        that.data.stationBox.list = dat.plant
        that.setData({
          webQueryPlants: dat.plant,
          stationBox: that.data.stationBox
        })
      } else if (err == 260) {
        if ((that.data.statusVal == '') && (that.data.sName == '')) {
          that.setData({
            secBuild: false,
            noStation:true,
          })
        }
      } else{
        util.errBoxFunc(that, err, desc)
      } 
    }, function () {
      util.netWork(that)
    }, function () {
      that.data.ModelHide[4] = true
      that.setData({
        ModelHide: that.data.ModelHide
      })
      that.ModelHideFunc(that)

      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    })
  },
  tapMainMenu: function (e) {
    util.tapMainMenuFunc(this,e)
  },
  tapSubMenu: function (e) {
    var that = this
    var initSubMenuHighLight = [
      ['', '', '', '', ''],
      ['', ''],
      ['', '', '']
    ];
    that.data.tapBox.tapTop.subMenuDisplay = initSubMenuDisplay()
    that.data.stationBox.more = false
    that.data.stationBox.list = []
    that.setData({
      tapBox: that.data.tapBox,
      webQueryPlants: [],
      page: 0,
      stationBox: that.data.stationBox,
    });
    var indexArray = e.currentTarget.dataset.index.split('-');
    for (var i = 0; i < initSubMenuHighLight.length; i++) {
      if (indexArray[0] == i) {
        for (var j = 0; j < initSubMenuHighLight[i].length; j++) {
          initSubMenuHighLight[i][j] = '';
        }
      }
    }
    var indexArr1 = indexArray[0]
    var indexArr2 = indexArray[1]
    var statusVal = '', topName = ''
    initSubMenuHighLight[indexArray[0]][indexArray[1]] = 'highlight';
    
    if (indexArr2 == 0) {// 选择所有电站下拉菜单的二级菜单
      topName = '所有电站'
      statusVal = ''
    } else if (indexArr2 == 1) {
      topName = '正常电站'
      statusVal = '0'
    } else if (indexArr2 == 2) {
      topName = '异常电站'
      statusVal = '4'
    } else if (indexArr2 == 3) {
      topName = '提醒电站'
      statusVal = '7'
    } else if (indexArr2 == 4) {
      topName = '离线电站'
      statusVal = '1'
    }
    that.data.tapBox.tapTop.topName = topName
    that.setData({
      statusVal: statusVal,
      tapBox: that.data.tapBox,
    })
    that.webQueryPlantsFunc(that)
  },
 
  onPullDownRefresh: function () { // 下拉刷新
    var that = this
    wx.showNavigationBarLoading()
    that.setData({
      webQueryPlants: [],
      page:0,
    })
    that.eneryTotal()//nav四个发电量数据
    that.queryListInfo(that)//用户名设置页面名称
    that.webQueryPlantsFunc(that)// 请求账号信息：用户名  用户id end
    // 总的装机容量
    that.queryNorPower(that)
    that.querycoPower(that)
  }
})
function initSubMenuHighLight() {
  return [
    ['', '', '', '', ''],
    ['', ''],
    ['', '', '']
  ];
}
function initSubMenuDisplay() {
  return ['hidden', 'hidden', 'hidden'];
}