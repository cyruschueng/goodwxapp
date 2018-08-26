import * as echarts from '../../ec-canvas/echarts';
var util = require('../../utils/util.js');
var app = getApp();

var chart = null;// 柱状图更改
var option = {//重新赋值即可更新数据
  tooltip: {
  },
  xAxis: {
    data: []
  },
  yAxis: {},
  itemStyle: {
    color: '#F98D42',//图形颜色
    emphasis: {
      color: '#86390B'
    }
  },
  series: [{
    name: '',
    type: 'bar',
    roseType: 'radius',
    label: {
      normal: {
        show: true,//是否显示框
        position: 'top',//选中提示位置
        distance: 10,//距离顶部位置
        color: '#000',//提示文字颜色
      },
      emphasis: {
        show: true
      },
    },
    data: [],
    itemStyle: {
      emphasis: {
        color: '#fff',//选中颜色
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, .5)'//边缘颜色
      }
    } 
  }]
};
function initChart(canvas, width, height) {
  var that = this
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  chart.setOption(option);
  return chart;
}
Page({
  data: {
    option: {
      xAxis: {
        data: []
      },
      series: [{
        data: []
      }]
    },
    ec: {
      onInit: initChart
    },
    listNavData: {
      outPutT: '0kW',
      listNav: [
        {
          pic: '/images/5.png',
          label: '当日发电',
          val: '0',
          valUnit: '(kWh)'
        }, {
          pic: '/images/mainfar_leiji.png',
          label: '当日收益',
          val: '0',
          valUnit: '(￥)'
        }
      ]
    },
    stationAdmIn:true,
    ts:[],
    valArr:[],
    datUnit:['kW'],
    canvasChartId:{},
    calendar:{
      label1:'日',
      label2: '月',
      label3: '年',
      label4: '累计',
      date: '',
      tabArr: {
        curHdIndex: 0,
        curBdIndex: 0
      },
    },
    date0: '',
    pid: '',
    arg: 'OneDay',
    action1: 'queryPlantEnergyDay',
    webQueryPlants:{},
    cirColor:'#F98D42', 
    },
  drawBar: function (xDat, yDat) {
    var that = this
    option = {//更新数据
      tooltip: {
      },
      xAxis: {
        data: xDat
      },
      legend: {
        data: that.data.datUnit,
        bottom: 1,
        left: 'left',
      },
      yAxis: {},
      itemStyle: {
        color: '#F98D42',//图形颜色
        emphasis: {
          color: '#86390B'
        }
      },
      
      grid:{
      containLabel: true,
        top:15,
        left:5,
        right:5,
        bottom:25,
      },
      series: [{
        name: that.data.datUnit[0],
        type: 'bar',
        roseType: 'radius',
        label: {
          normal: {
            show: false,//是否显示框
            position: 'top',//选中提示位置
            distance: 2,//距离顶部位置
            color: '#000',//提示文字颜色
          },
          emphasis: {
            show: true
          },
        },
        data: yDat,
        itemStyle: {
          emphasis: {
            color: '#86390B',//选中颜色
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, .5)'//边缘颜色
          }
        }
      }]
    };
    if (chart){
      chart.setOption(option);
    }
  },

  userAdmInfoback: function () {
    var that = this;
    if (that.data.stationAdmIn == false){
      that.setData({
        stationAdmIn: true,
      })
      var stationArr = wx.getStorageSync('stationArr')

      if (stationArr && (stationArr.length != 0)) { // 子页面
       
        stationArr = stationArr.splice(0, stationArr.length - 1)
        wx.setStorageSync('stationArr', stationArr)
        wx.redirectTo({
          url: '/pages/stationAdm/stationAdm',
        })
        wx.removeStorageSync('PlantIn')
      } else {// 非父页面跳转，返回电站业主list
        
        wx.redirectTo({
          url: '/pages/list/list',
        })
      }
     } else if (that.data.stationAdmIn == true){
      wx.removeStorageSync('PlantIn')
      wx.navigateBack({
        delta: 1
      })
     }
  },
  
  tabFun: function (e) {// 点击切换标签的颜色
    var that = this;
    var _datasetId = e.target.dataset.id;
    var calendar = that.data.calendar
    var listNav = that.data.listNavData.listNav
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    calendar.tabArr = _obj
        
    if (_datasetId == '0'){
      listNav[0].label = '当日发电'
      listNav[1].label = '当日收益'
      calendar.date = that.data.cDate
      that.setData({
        date0: that.data.cDate,
        arg: 'OneDay',
        action1: 'queryPlantEnergyDay',
        datUnit: ['kW']
      })
    } else if (_datasetId == '1'){
      listNav[0].label = '当月发电'
      listNav[1].label = '当月收益'
      calendar.date = that.data.cMonth
      that.setData({
        date0: that.data.cMonth,
        arg: 'MonthPerDay',
        action1: 'queryPlantEnergyMonth',
        datUnit: ['kWh']
      })
    } else if (_datasetId == '2') {
      listNav[0].label = '当年发电'
      listNav[1].label = '当年收益'
      calendar.date = that.data.cYear
      that.setData({
        date0: that.data.cYear,
        arg: 'YearPerMonth',
        action1: 'queryPlantEnergyYear',
        datUnit: ['kWh']
      })
    } else if (_datasetId == '3') {
      listNav[0].label = '累计发电'
      listNav[1].label = '累计收益'
      calendar.date = that.data.cYear
      that.setData({
        date0: that.data.cYear,
        arg: 'TotalPerYear',
        action1: 'queryPlantEnergyTotal',
        datUnit: ['kWh']
      })
    }
    that.data.listNavData.listNav = listNav
    that.setData({
      listNavData: that.data.listNavData,
      calendar: calendar
    });
    that.PowerOneDay(that)
    that.queryChang(that)
  },
  
  doDay: function (e) {// 上一日月年总
    var that = this
    var type = e.currentTarget.dataset.type
    var calendar = that.data.calendar
    var index = calendar.tabArr.curHdIndex
    var date0 = ''
    if (index == '0') {
      if(type == 'pre'){
        calendar.date = util.getYestoday(calendar.date)
        date0 = util.getYestoday(calendar.date)
      }else if(type == 'after'){
        calendar.date = util.getNextday(calendar.date)
        date0 = util.getNextday(calendar.date)
      }
    } else if (index == '1') {
      if (type == 'pre') {
        calendar.date = util.getPreMonth(calendar.date)
        date0 = util.getPreMonth(calendar.date)
      } else if (type == 'after') {
        calendar.date = util.getNextMonth(calendar.date)
        date0 = util.getNextMonth(calendar.date)
      }
    } else if (index == '2'){
      if (type == 'pre') {
        calendar.date = util.getPreYear(calendar.date)
        date0 = util.getPreYear(calendar.date)
      } else if (type == 'after') {
        calendar.date = util.getNextYear(calendar.date)
        date0 = util.getNextYear(calendar.date)
      }
    } else if (index == '3'){
      if (type == 'pre') {
        calendar.date = util.getPreYear(calendar.date)
        date0 = util.getPreYear(calendar.date)
      } else if (type == 'after') {
        calendar.date = util.getNextYear(calendar.date)
        date0 = util.getNextYear(calendar.date)
      }
    }
    that.setData({
      date0: date0,
      calendar: calendar
    })
    that.PowerOneDay(that)
    that.queryChang(that) //当日发电和收益...
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onPullDownRefresh:function(){
    var that = this;
    wx.showNavigationBarLoading()
    that.PowerOneDay(that)
    that.queryChang(that) //当日发电和收益...
  },
  onLoad: function (options) {
    var that = this;
    var screenVal = wx.getStorageSync('screenVal')
    var date = new Date();// 日历str
    var cDate = date.getFullYear() + '-' + util.doubDigit(date.getMonth() + 1) + '-' + util.doubDigit(date.getDate())
    that.data.calendar.date = cDate

    app.editTabBar2();
    var Adm = wx.getStorageSync('PlantIn')
    if (Adm && (Adm == "Adm")) {
      that.setData({
        stationAdmIn: false,
      })
    }else{
      that.setData({
        stationAdmIn: true,
      })
    }
    var webQueryPlants = wx.getStorageSync('checkPlant')
    if (webQueryPlants.name) {
      wx.setNavigationBarTitle({ title: webQueryPlants.name })
    }
    webQueryPlants.nominalPower = parseFloat(webQueryPlants.nominalPower).toFixed(1)
    
    that.setData({
      ts: [],
      valArr: [],
      pid: webQueryPlants.pid,
      webQueryPlants: webQueryPlants,
      webQueryPlants: webQueryPlants,
      date0: cDate,// 渲染日期和请求的日期
      cDate: cDate,//日
      cMonth: date.getFullYear() + '-' + util.doubDigit(date.getMonth() + 1),
      cYear: date.getFullYear(),
      calendar: that.data.calendar,//请求date
    })
    if (that.data.webQueryPlants.outputPower && (that.data.webQueryPlants.nominalPower)) {
      var circ = parseFloat(parseFloat(that.data.webQueryPlants.outputPower) * 100 / parseFloat(that.data.webQueryPlants.nominalPower)).toFixed(1)
      var re = /^[0-9]+.?[0-9]*$/;
      if (!re.test(circ)) {
        circ = 0.0
      }
    } else {
      var circ = 0.0
    }
    that.setData({
      circ: circ
    })
    util.drawCircle(that, 40, 30, 27, 0, 2 * Math.PI,-Math.PI * 1 / 2, -Math.PI * 1 / 2 + 2 * Math.PI * (parseFloat(that.data.webQueryPlants.outputPower) / parseFloat(that.data.webQueryPlants.nominalPower)))
    that.PowerOneDay(that)
    that.queryChang(that)
  },
  onPullDownRefresh: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var shareObj = util.shareFunc()
    return shareObj
  },

actionFunc:function(that){
  var action = ''
  if (that.data.arg == 'OneDay') {
    action = 'queryPlantActiveOuputPowerOneDay'
  } else if (that.data.arg == 'MonthPerDay') {
    action = 'queryPlantEnergyMonthPerDay'
  } else if (that.data.arg == 'YearPerMonth') {
    action = 'queryPlantEnergyYearPerMonth'
  } else if (that.data.arg == 'TotalPerYear') {
    action = 'queryPlantEnergyTotalPerYear'
  }
  return action;
},
PowerOneDay: function (that) {
  wx.showLoading({
    title: '加载中',
    // mask: true,
  })
    that.setData({
      ts:[],
      val:[],
    })
    var action = that.actionFunc(that)
    var url = "&action=" + action + "&plantid=" + that.data.pid + "&date=" + that.data.calendar.date
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        var outputArr = []
        var ts = [], val = []
        if (that.data.arg == 'OneDay') {
          outputArr = dat.outputPower
        } else if (that.data.arg == 'MonthPerDay') {
          outputArr = dat.perday
        } else if (that.data.arg == 'YearPerMonth') {
          outputArr = dat.permonth
        } else if (that.data.arg == 'TotalPerYear') {
          outputArr = dat.peryear
        }
        var valSum = 0; 
        for (var i = 0; i < outputArr.length; i++) {
          if (that.data.arg == 'OneDay') {// 时分秒 2014-11-11 00:00:00
            ts[i] = util.trim(outputArr[i].ts).substring(11, 16)
          } else if (that.data.arg == 'MonthPerDay') { // 每天的数据
            ts[i] = util.trim(outputArr[i].ts).substring(8, 10)
          } else if (that.data.arg == 'YearPerMonth') {// 每月的数据
            
            ts[i] = util.trim(outputArr[i].ts).substring(5, 7)
          } else if (that.data.arg == 'TotalPerYear') {// 一整年的数据
            
            ts[i] = util.trim(outputArr[i].ts).substring(0, 4)
          }
          val[i] = parseFloat(outputArr[i].val).toFixed(1);
          valSum += parseFloat(outputArr[i].val)
        }
        var valArr = [] // 柱状图更改
        for (var i = 0; i < val.length; i++) {
          var valObj = {}
          valObj.value = val[i],
            valArr.push(valObj)
        }
        that.setData({
          ts:ts,
          valArr: valArr,
          val:val,
        })
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
      }, function () {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        that.drawBar(that.data.ts, that.data.valArr)
      })
  },

  queryChang: function (that){
    if (that.data.action1 =='queryPlantEnergyTotal'){
      var url = "&action=" + that.data.action1 + "&plantid=" + that.data.pid
    }else{
      var url = "&action=" + that.data.action1 + "&plantid=" + that.data.pid + "&date=" + that.data.calendar.date
    } 
    var listNav = that.data.listNavData.listNav
        listNav[0].valUnit = '(kWh)'
        listNav[0].val = '0'
        listNav[1].val = '0'
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        listNav[0].valUnit = '('+util.formatKwh(dat.energy)[1]+')'
        listNav[0].val = util.formatKwh(dat.energy)[0]
        listNav[1].val = util.turnVal(parseFloat(dat.energy) * parseFloat(that.data.webQueryPlants.profit.unitProfit))
      }else{
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    },function(){
      that.setData({
        listNavData: that.data.listNavData,
      })
    })
  },
})

