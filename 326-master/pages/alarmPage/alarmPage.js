var util = require('../../utils/util.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tapBox: {
      tapTop: {
        topName: '今日',
        topPic: '/images/perm_group_calendar.png',
        width:'1.8rem',
        height:'1.8rem',
        subMenuDisplay: initSubMenuDisplay(),
        topSerial: 0
      },
      tapList: [{
        name: '今日',
        pic: ''
      }, {
          name: '昨日',
        pic: ''
      }, {
          name: '本周',
        pic: ''
      }, {
          name: '本月',
        pic: ''
      }, {
          name: '本年',
        pic: ''
      }, {
          name: '累计',
        pic: ''
      }, {
          name: '自定义',
        pic: ''
      }]
    },
    tapBox1: {
      tapTop: {
        topName: '所有类型',
        topPic: '/images/arrow_expanded.png',
        width: '0.8rem',
        height: '0.8rem',
        subMenuDisplay: initSubMenuDisplay(),
        topSerial:1
      },
      tapList: [{
        name: '所有类型',
        pic: '/images/all.png'
      }, {
        name: '报警',
        pic: '/images/round2.png'
      }, {
        name: '故障',
        pic: '/images/round1.png'
      }]
    },
    tapBox2: {
      tapTop: {
        topName: '全部设备',
        topPic: '/images/arrow_expanded.png',
        width: '0.8rem',
        height: '0.8rem',
        subMenuDisplay: initSubMenuDisplay(),
        topSerial:2
      },
      tapList: [{
        name: '全部设备',
        pic: '/images/round3.png'
      }, {
          name: '逆变器',
          pic: '/images/nbqZC.png'
      }, {
          name: '汇流箱',
          pic: '/images/hlxZC.png'
      }, {
          name: '环境检测仪',
          pic: '/images/hcyZC.png'
      }, {
          name: '智能电表',
          pic: '/images/db.png'
      }, {
          name: '防孤岛',
          pic: '/images/nbqZC.png'
      }]
    },
    tapBox3: {
      tapTop: {
        topName: '未处理',
        topPic: '/images/arrow_expanded.png',
        width: '0.8rem',
        height: '0.8rem',
        subMenuDisplay: initSubMenuDisplay(),
        topSerial: 3
      },
      tapList: [{
        name: '全部状态',
        pic: '/images/all.png'
      }, {
          name: '已处理',
          pic: '/images/round3.png'
      }, {
          name: '未处理',
          pic: '/images/round1.png'
      }]
    },
    pid: '',
    alarList:{
      roleManagH: false,
      more:false,
      PlantWarning: [],
    },
    sdat:'',
    edat:'',
    sdate:'',
    edate:'',
    level:'',
    devtype:'',
    handle:'false',
    diy:true,
    // 自定义时间
    dates0: '',
    dates1: '',
    page:0,
    pagesize:10,
    pnSearchH: true, //告警管理显示隐藏
    pnSearchNH:false,//搜索框显示隐藏
    pnValue:'',
    pnSnHolder:'',//top搜索框内值
    warnTotal:'',//告警数红色字体值
  },
  alarmDetailPage:function(){
    wx.navigateTo({
      url: '/pages/alarmDetail/alarmDetail',
    })
  },
  pnInput:function(e){
    var that = this;
    if (util.trim(e.detail.value) != ''){
        that.setData({
          pnValue: util.trim(e.detail.value)
        }) 
    }
  },
  pnConfiInput: function () { 
    var that = this;
    if (that.data.pnValue == ''){
      wx.showToast({
        title: '输入不能为空',  
        icon: 'loading',  
        duration: 1500, 
        mask: false,  
      })  
    } else{
      that.queryAlarm(that)
    }
  },
  pnSearch:function(){
    var that = this;
    that.setData({
      pnSearchH: !that.data.pnSearchH,
      pnSearchNH: !that.data.pnSearchNH,
    })
  },
  //  点击日期组件确定事件  
  bindDateChange0: function (e) {
    this.setData({
      dates0: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindDateChange1: function (e) {
    this.setData({
      dates1: e.detail.value
    })
  },
  diyC:function(){
    var that = this
    var sdateDiyc = that.data.dates0 + ' 00:00:00'
    var edateDiyc = that.data.dates1 + ' 23:59:00'
      this.setData({
        sdate: sdateDiyc,
        edate: edateDiyc,
        diy: true
      })
    
    that.queryAlarm(that)
  },
  // 更新下拉菜单的数组
  setCurrTapBox: function (indexArr1, currTapBox) {
    if (indexArr1 == '0') {
      this.setData({
        tapBox: currTapBox,
      });
      var ww = this.data.tapBox
    } else if (indexArr1 == '1') {
      this.setData({
        tapBox1: currTapBox,
      });
    }else if (indexArr1 == '2') {
      this.setData({
        tapBox2: currTapBox,
      });
    } else if (indexArr1 == '3') {
      this.setData({
        tapBox3: currTapBox,
      });
    }
  },
  // 下拉菜单str
  tapSubMenu: function (e) {
    
    var that = this;
    that.data.alarList.PlantWarning = []
    that.setData({
      alarList: that.data.alarList,
      warnTotal:'---',
      page:0,
      diy:true,
    })
    var initSubMenuHighLight = [
      ['', '', '', '', ''],
      ['', ''],
      ['', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ];
      var indexArray = e.currentTarget.dataset.index.split('-');
      var indexArr1 = indexArray[0]
      var indexArr2 = indexArray[1]
      var currTapBox;
      if (indexArr1 == '0') {
        currTapBox = that.data.tapBox
      } else if (indexArr1 == '1') {
        currTapBox = that.data.tapBox1
      }else if (indexArr1 == '2') {
        currTapBox = that.data.tapBox2
      } else if (indexArr1 == '3') {
        currTapBox = that.data.tapBox3
      }

      currTapBox.tapTop.subMenuDisplay = initSubMenuDisplay()
      that.setCurrTapBox(indexArr1, currTapBox)

    for (var i = 0; i < initSubMenuHighLight.length; i++) {
      if (indexArray[0] == i) {
        for (var j = 0; j < initSubMenuHighLight[i].length; j++) {
          initSubMenuHighLight[i][j] = '';
        }
      }
    }
    initSubMenuHighLight[indexArray[0]][indexArray[1]] = 'highlight';
      this.setData({
        subMenuHighLight: initSubMenuHighLight
      }); 
    var date = new Date();
    var todays = date.getFullYear() + "-" + util.doubDigit((date.getMonth() + 1)) + "-" + (date.getDate()) + " 00:00:00";// 今日
    var todaye = date.getFullYear() + "-" + util.doubDigit((date.getMonth() + 1)) + "-" + util.doubDigit(date.getDate()) + " 23:59:59";
    var day1 = new Date(); // 昨日
        day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
        var yesterdays = day1.getFullYear() + "-" + util.doubDigit(day1.getMonth() + 1) + "-" + util.doubDigit(day1.getDate()) + " 00:00:00";
        var yesterdaye = day1.getFullYear() + "-" + util.doubDigit(day1.getMonth() + 1) + "-" + util.doubDigit(day1.getDate()) + " 23:59:59";
        var weeks = util.getWeekTime() // 本周的起始时间
        var months = util.getMonthTime()// 本月的起始时间
        var years = date.getFullYear() + "-01-01" + " 00:00:00";  // 今年的起始时间
    if ( indexArr1 == 0 ){
      if (indexArr2 == 0 ){
        currTapBox.tapTop.topName = todays.substring(0, 10)
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          sdate: todays,
          edate: todaye
        })
      } else if (indexArr2 == 1) {
        currTapBox.tapTop.topName = yesterdays.substring(0, 10),
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          sdate: yesterdays,
          edate: yesterdaye
        })
      }else if (indexArr2 == 2) {
        currTapBox.tapTop.topName = weeks.substring(0, 10) + '~' + todaye.substring(0, 10)
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          sdate: weeks,
          edate: todaye
        })
      } else if (indexArr2 == 3) {
        currTapBox.tapTop.topName = months.substring(0, 10) + '~' + todaye.substring(0, 10)
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          sdate: months,
          edate: todaye
        })
      } else if (indexArr2 == 4) {
        currTapBox.tapTop.topName = years.substring(0, 10) + '~' + todaye.substring(0, 10)
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          sdate: years,
          edate: todaye
        })
      } else if (indexArr2 == 5) {
        currTapBox.tapTop.topName = '累计'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          sdate: '',
          edate: todaye
        })
      } else if (indexArr2 == 6) {
        currTapBox.tapTop.topName = '自定义'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          diy: false
        })
      }
    } else if (indexArr1 == 1) {
      if (indexArr2 == 0) {
        currTapBox.tapTop.topName = '所有类型'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          level: ''
        })
      } else if (indexArr2 == 1) {
        currTapBox.tapTop.topName = '报警'
          that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          level: '0'
        })
      } else if (indexArr2 == 2) {
        currTapBox.tapTop.topName = '故障'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          level: '2'
        })
      }
    } else if (indexArr1 == 2) {
      if (indexArr2 == 0) {
        currTapBox.tapTop.topName = '全部设备'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          devtype: ''
        })
      } else if (indexArr2 == 1) {
        currTapBox.tapTop.topName = '逆变器'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          devtype: '512'
        })
      } else if (indexArr2 == 2) {
        currTapBox.tapTop.topName = '汇流箱'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          devtype: '1280'
        })
      } else if (indexArr2 == 3) {
        currTapBox.tapTop.topName = '环境检测仪'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          devtype: '768'
        })
      } else if (indexArr2 == 4) {
        currTapBox.tapTop.topName = '智能电表'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          devtype: '1024'
        })
      } else if (indexArr2 == 5) {
        currTapBox.tapTop.topName = '防孤岛'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          devtype: '2560'
        })
      }
    } else if (indexArr1 == 3) {
      if (indexArr2 == 0) {
        currTapBox.tapTop.topName = '全部状态'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          handle: ''
        })
      } else if (indexArr2 == 1) {
        currTapBox.tapTop.topName = '已处理'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          handle: 'true'
        })
      } else if (indexArr2 == 2) {
        currTapBox.tapTop.topName = '未处理'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          handle: 'false'
        })
      } 
    }
    if (!(indexArr1 == 0 && indexArr2 == 6)) { // 查询电站中设备告警
      that.queryAlarm(that)
    }
  },
  tapMainMenu: function (e) {
    var that = this
    util.tapMainMenuFunc(that, e)
  },
  onLoad: function (options) {
    var that = this;
    // 底部导航
    if (options.action == "queryPlantWarning") {
      app.editTabBar2();
      that.data.alarList.roleManagH = true
      that.setData({
        pnSnHolder:'输入PN或Sn',
        actionCag: "queryPlantWarning",
        alarList: that.data.alarList
      })
    }else{
      app.editTabBar3();
      that.data.alarList.roleManagH = false
      that.setData({
        pnSnHolder: '输入PN',
        actionCag: "webQueryPlantsWarning",
        alarList: that.data.alarList
      })
    }
    
    
    var date = new Date();
    var nowdate = new Date().toLocaleString()
    // 今日
    var dM = util.doubDigit(date.getMonth() + 1) 
    var dD = util.doubDigit(date.getDate())
    var todays = date.getFullYear() + "-" + dM + "-" + dD + " 00:00:00";
    var todaye = date.getFullYear() + "-" + dM + "-" + dD + " 23:59:59";
    // 自定义时间
    var todays0 = date.getFullYear() + "-" + dM + "-" + dD
    that.data.tapBox.tapTop.topName = todays.substring(0,10)
    that.setData({
      nowdate: nowdate,
      sdate: todays,
      edate: todaye,
      // 自定义时间
      dates0: todays0,
      times0: '00:00',
      dates1: todays0,
      times1: '23:59',
      action: options.action,
      tapBox: that.data.tapBox
    })
    // 查询电站中设备告警  
    that.queryAlarm(that)
  },
queryAlarm:function(that){
  var url = "&action=" + that.data.action + "&i18n=zh_CN&pagesize=" + that.data.pagesize + "&page=" + that.data.page + '&edate=' + that.data.edate
  if (that.data.sdate != '') {
    url += '&sdate=' + that.data.sdate
  }
  if (that.data.level != '') {
    url += '&level=' + that.data.level
  }
  if (that.data.devtype != '') {
    url += '&devtype=' + that.data.devtype
  }
  if (that.data.handle == 'true') {
    url += '&handle=' + that.data.handle
  } else if (that.data.handle == 'false') {
    url += '&handle=' + that.data.handle
  }
  // 判断用户3.20
  if (that.data.action == "queryPlantWarning"){
    that.setData({
      alarmAdm: false,
    })
    var pid = wx.getStorageSync('checkPlant').pid
    url += "&plantid=" + pid
    if (that.data.pnValue != '') {
      url += '&search=' + that.data.pnValue
    }
  } else if (that.data.action == "webQueryPlantsWarning"){
    that.setData({
      alarmAdm:true,
    })
    if (that.data.pnValue != '') {
      url += '&pn=' + that.data.pnValue
    }
  } 
  that.alarmAdmQuery(that, url)
  
  // 起始 截止日期
  //  sdate ='2017-10-00 00:00:00';
  //  edate = '2017-12-00 00:00:00';
},
More: function () {
  var that = this;
  that.setData({
    page: that.data.page + 1
  })
  that.queryAlarm(that)
},
alarmAdmQuery: function (that, url) {
  wx.showLoading({
    title: '加载中',
    mask: true,
  })
  var warnTotal = '';
  util.http_oper(encodeURI(url), function (err, dat, desc) {
    if (err == 0) {
      if (dat.total > '999') {
        dat.total = '999+'
      }
      if (dat.warning.length < 10) {
        that.data.alarList.more = false
      } else {
        that.data.alarList.more = true
      }
      that.setData({
        alarList: that.data.alarList
      })
      that.data.alarList.PlantWarning = that.data.alarList.PlantWarning.concat(dat.warning)
      warnTotal = dat.total
      that.setData({
        
      })
    } else {
      warnTotal = '---'
      that.data.alarList.more = false
      util.errBoxFunc(that, err, desc)
    }
  }, function () {
    warnTotal = '---'
    that.data.alarList.more = false
    util.netWork(that)
  }, function () {
    that.setData({
      warnTotal: warnTotal,
      alarList: that.data.alarList
    })
    wx.hideNavigationBarLoading()
    wx.hideLoading()
    wx.stopPullDownRefresh()
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
  onPullDownRefresh:function () {
    var that = this;
    that.data.alarList.PlantWarning = []
    that.setData({
      page:0,
      alarList: that.data.alarList
    })
    wx.showNavigationBarLoading() 
    that.queryAlarm(that)
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
// 下拉菜单 str
function initSubMenuHighLight() {
  return [
    ['', '', '', '', ''],
    ['', ''],
    ['', '', '']
  ];
}
function initSubMenuDisplay() {
  return ['hidden', 'hidden', 'hidden', 'hidden'];
}
// 下拉菜单 end
