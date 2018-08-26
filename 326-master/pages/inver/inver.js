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
      color: '#000'
    }
  },
  grid: {
    containLabel: true,
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
  },
  series: [{
    name: '销量',
    type: 'line',
    roseType: 'radius',
    label: {
      normal: {
        show: true,//是否显示框
        position: 'top',//选中提示位置
        distance: 2,//距离顶部位置
        color: '#000',//提示文字颜色
      },
      emphasis: {
        show: true
      },
    },
    data: [],
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
    colledatArr: [],
    dateStart: '',
    calendar: {
      label1: '日',
      label2: '月',
      label3: '年',
      label4: '总',
      date: '',
      tabArr: {
        curHdIndex: 0,
        curBdIndex: 0
      },
    },
    tapBox: {
      tapTop: {
        topName: '',
        topPic: '/images/sett.png',
        width: '1.5rem',
        height: '1.5rem',
        subMenuDisplay: initSubMenuDisplay(),
        topSerial: 0
      },
      tapList: [{
        name: '',
        pic: '/images/modify.png'
      }, {
        name: '',
        pic: '/images/delet.png'
      }, {
        name: '',
        pic: '/images/debug.png'
      }]
    },
    ts: [],
    val: [],
    datUnit: ['kW'],
    errtS: false,
    errMsg: '',
    chartHide: false,
    inverDevPage: [],
    cdate: '',//当前请求的时间
    currentDate: '', //今天的日
    currentMonth: '',//今天的月
    currentYear: '',//今天的年
    inverDetailLisDtail: [],
    tabBox: {
      label1: '图表',
      label2: '数据',
      tabArr1: {
        curHdIndex: 0,
        curBdIndex: 0
      },
    },
    chartNavHid: false,//图表显示隐藏
    datNav: true,
    slider: {
      sliderLength: 0,
      sliderVal: 1
    },
    invParaDetail: [],// 遍历的参数
    modelDat: {
      label: '修改别名',
      mStatus: false,//模态框显示
      modiStatus: false,//修改
      delStatus: false,//删除
      debStatus: false//调试
    },
    cmd: '',
    imgRateS: false,
    ratepInput: '',
    deviIn: true,
    drawType: 'line',
    typeColor:'#FCC199'
  },
  tooltip:function(){
    var that =this
    var tooltip = {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    }
    if (that.data.drawType == 'line'){
      return tooltip
    }else{
      return {}
    }
  },
  drawBar: function (xDat, yDat, type) {
    var that = this
    var typeColor = that.data.typeColor
    var tooltipObj = that.tooltip()
    option = {//更新数据
      tooltip: tooltipObj,
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
        color: typeColor,//图形颜色
        emphasis: {
          color: '#000'
        }
      },
      grid: {
        containLabel: true,
        top: 20,
        left: 5,
        right: 5,
        bottom: 25,
      },
      series: [{
        name: that.data.datUnit[0],
        type: type,
        roseType: 'radius',
        areaStyle: {
          normal: {
            color: '#F98D42'
          }
        },
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
    if (chart) {
      chart.setOption(option);
    }
  },
  deviback: function () {
    var that = this;
    if (that.data.deviIn == true) {
      wx.removeStorageSync('PlantIndev')
      that.setData({
        deviIn: false,
      })
      var stationArr = wx.getStorageSync('stationArr')
      if (stationArr && (stationArr.length != 0)) { // 子页面
        stationArr = stationArr.splice(0, stationArr.length - 1)
        wx.setStorageSync('stationArr', stationArr)
        wx.redirectTo({
          url: '/pages/deviceAdm/deviceAdm',
        })
      } else { // 非父页面跳转，返回电站业主list
        wx.redirectTo({
          url: '/pages/device/device',
        })
      }
    } else if (that.data.deviIn == false) {
      wx.removeStorageSync('deviIn')
      wx.navigateBack({
        delta: 1
      })
    }
  },
  slider: function (e) {  // slider的加减
    var that = this;
    var type = e.currentTarget.dataset.type
    var sVal = that.data.slider.sliderVal
    if (type == 'pre') {
      if (sVal == 1) {
        return
      } else if (sVal > 1) {
        that.data.slider.sliderVal = sVal - 1
        that.setData({
          slider: that.data.slider
        })
      }
    } else if (type == 'after') {
      if (sVal >= that.data.slider.sliderLength) {
        return
      } else {
        that.data.slider.sliderVal = sVal + 1
        that.setData({
          slider: that.data.slider
        })
      }
    }
    that.queryParaDetail(that)
  },
  listenerSlider: function (e) {// slider滑动出发
    var that = this;
    that.data.slider.sliderVal = e.detail.value
    that.setData({
      slider: that.data.slider
    })
    that.queryParaDetail(that)
  },

  tapMainMenu: function (e) {
    util.tapMainMenuFunc(this, e)
  },
  tapSubMenu: function (e) {
    util.tapSubMenuFunc(e, this)
  },

  modiAliInput: function (e) { // 改别名输入框input
    if (e.detail.value != null) {
      this.setData({
        modiAliDat: util.trim(e.detail.value)
      })
    }
  },

  onPageScroll: function (e) {// 页面滚动
    var that = this
    if (e.scrollTop > 0) {
      that.setData({
        chartHide: true
      })
    } else {
      that.setData({
        chartHide: false
      })
    }
  },

  inverbugInput: function (e) { // 获取输入的数据调试指令
    var that = this
    if (e.detail.value != null) {
      that.setData({
        cmd: util.trim(e.detail.value)
      })
    }
  },
  // 改别名 确定
  modConfi: function () {
    var that = this;
    var modelShow = that.data.modelDat
    if (modelShow.modiStatus == true) {
      util.confiAliFunc(that, that.data.modiAliDat, 'editDeviceInfo', that.data.inverDevPage)
    } else if (modelShow.delStatus == true) {
      util.confiDelFunc(that, 'delDeviceFromPlant', that.data.inverDevPage)
    } else if (modelShow.debStatus == true) {
      if (that.data.cmd == '') {
        wx.showToast({
          title: '指令不能为空',
          icon: 'loading',
          duration: 1500
        })
      } else {
        util.confidebuFunc(that, 'sendCmdToDevice', that.data.inverDevPage, that.data.cmd)
      }
    }
  },
  modeCancel: function () {
    util.modeCancel(this)
  },

  collec: function (e) {// 到数采器列表
    var that = this;
    var app = getApp();
    wx.redirectTo({
      url: '/pages/collec/collec?collDevPage=' + JSON.stringify(that.data.colledatArr[0]),
    })
  },

  tabFun: function (e) {// 点击切换标签的颜色
    var that = this;
    var _datasetId = e.target.dataset.id;
    var _obj = {};
    var calendar = that.data.calendar
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    calendar.tabArr = _obj
    that.setData({
      errBox: {},
    });
    if (_datasetId == '0') {
      calendar.date = that.data.currentDate
      that.setData({
        arg: 'day',
        datUnit: ['kW'],
        drawType: 'line',
        typeColor: '#FCC199'
      })
    } else if (_datasetId == '1') {
      calendar.date = that.data.currentMonth
      that.setData({
        arg: 'month',
        datUnit: ['kWh'],
        drawType: 'bar',
        typeColor: '#F98D42'
      })
    } else if (_datasetId == '2') {
      calendar.date = that.data.currentYear
      that.setData({
        arg: 'year',
        datUnit: ['kWh'],
        drawType: 'bar',
        typeColor: '#F98D42'
      })
    } else if (_datasetId == '3') {
      calendar.date = that.data.currentYear
      that.setData({
        arg: 'total',
        datUnit: ['kWh'],
        drawType: 'bar',
        typeColor: '#F98D42'
      })
    }
    that.setData({
      calendar: calendar
    })
    that.canvasPar(that)
  },
  tabFunc: function (e) {
    var that = this
    util.tabFunc(that, e)
    that.queryParaDetail(that, 'fir');
  },
  doDay: function (e) {
    var that = this
    var type = e.currentTarget.dataset.type
    var date = that.data.calendar.date
    if (that.data.arg == 'day') {
      if (type == 'pre') {
        date = util.getYestoday(date)
      } else if (type == 'after') {
        date = util.getNextday(date)
      }
    } else if (that.data.arg == 'month') {
      if (type == 'pre') {
        date = util.getPreMonth(date)
      } else if (type == 'after') {
        date = util.getNextMonth(date)
      }
    } else if (that.data.arg == 'year') {
      if (type == 'pre') {
        date = util.getPreYear(date)
      } else if (type == 'after') {
        date = util.getNextYear(date)
      }
    } else if (that.data.arg == 'total') {
      if (type == 'pre') {
        date = util.getPreYear(date)
      } else if (type == 'after') {
        date = util.getNextYear(date)
      }
    }
    that.data.calendar.date = date
    that.setData({
      calendar: that.data.calendar
    })
    that.canvasPar(that)
  },

  do1Day: function (e) {// 参数列表的上一天 下一天
    var that = this
    var type = e.currentTarget.dataset.type
    if (type == 'pre') {
      that.setData({
        cdate: util.getYestoday(that.data.cdate),
      })
    } else if (type == 'after') {
      that.setData({
        cdate: util.getNextday(that.data.cdate),
      })
    }
    that.queryParaDetail(that)
  },
  ratepnput: function (e) {  // 获取输入的额定功率
    var that = this
    that.setData({
      ratepInput: util.trim(e.detail.value)
    })
  },
  modirateP:function(){
    var that = this
    that.setData({
      imgRateS: true,
    })
  },
  modiRatepower: function () {  // 修改额定功率
    var that = this;
    var re = /^[0-9]+.?[0-9]*$/;
    that.setData({
      imgRateS: false,
    })
    if (that.data.ratepInput != '') {
      if (!re.test(that.data.ratepInput)) {
        wx.showToast({
          title: '请输入数字',
          icon: 'loading',
          mask: false,
          duration: 1500,
        });
      } else if ((re.test(that.data.ratepInput)) && (that.data.ratepInput != that.data.inverDevPage.ratePower)) {
        var paraOne = that.data.inverDevPage
        var url = "&action=editDeviceRatingPower&pn=" + paraOne.pn + "&devcode=" + paraOne.devcode + "&devaddr=" + paraOne.devaddr + "&sn=" + paraOne.sn + "&rating_power=" + that.data.ratepInput
        util.http_oper(encodeURI(url), function (err, dat, desc) {
          wx.hideLoading()
          if (err == 0) {
            that.data.inverDevPage.ratePower = that.data.ratepInput + 'kW'
            that.setData({
              inverDevPage: that.data.inverDevPage
            })
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              mask: false,
              duration: 1500,
            });
          } else {
            util.errBoxFunc(that, err, desc)
          }
        }, function () {
          util.netWork(that)
        })
      }
    }
  },
  onLoad: function (options) {
    var that = this;
    var deviIn = wx.getStorageSync('deviIn')
    var Adm = wx.getStorageSync('PlantIndev')

    if (deviIn && (deviIn == "deviIn")) { //电站业主显示
      that.setData({
        deviIn: false,
      })
    } else {
      if (Adm && (Adm == "Admdev")) {//厂家账号显示
        that.setData({
          deviIn: true,
        })
      }
    }
    var inverDevPage = JSON.parse(options.inverDevPage)

    // 设置页面名称
    var title = inverDevPage.alias ? inverDevPage.alias : inverDevPage.sn
    wx.setNavigationBarTitle({ title: title })
    var screenVal = wx.getStorageSync('screenVal')
    that.data.calendar.date = screenVal.currentDate
    that.setData({
      inverDevPage: inverDevPage,
      nowdate: screenVal.nowdate,
      dateStart: screenVal.currentDate,
      cdate: screenVal.currentDate,
      calendar: that.data.calendar,
      currentDate: screenVal.currentDate,
      currentMonth: screenVal.currentMonth,
      currentYear: screenVal.currentYear,
      currentDatee: screenVal.currentDate,
      arg: 'day',
      typ: 'column',
    })
    var action = "&pn=" + inverDevPage.pn + "&devcode=" + inverDevPage.devcode + "&devaddr=" + inverDevPage.devaddr + "&sn=" + inverDevPage.sn

    that.ratePower(that, inverDevPage, action)// 查额定功率
    that.eneryPower(that, inverDevPage, action) // 当日、当月、当年、总发电量
    that.collDev(that, inverDevPage, action)// 逆变器挂载的数采器
  },
  ratePower: function (that, inverDevPage, action) {
    util.http_oper(encodeURI("&action=queryDeviceRateActiveOutputPower" + action), function (err, dat, desc) {
      if (err == 0) {
        var ratePower = util.formatKw(dat.ratePower, 1, 1).join("")
        inverDevPage.ratePower = ratePower
        if ((!ratePower) || ((ratePower) && (parseFloat(ratePower) == 0.0))) {
          var percent = 0.0
        } else if (ratePower) {
          var percent = parseFloat(parseFloat(inverDevPage.output_power)) / parseFloat(ratePower)

        }
        util.drawCircle(that, 26, 26, 24.5, 0, 2 * Math.PI, -Math.PI * 1 / 2, -Math.PI * 1 / 2 + 2 * Math.PI * percent)
        var circ = (percent * 100).toFixed(1)
        var re = /^[0-9]+.?[0-9]*$/;
        if (!re.test(circ)) {
          circ = 0.0
        }
        that.setData({
          circ: circ,
        })
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    }, function () {
    })
  },
  eneryPower: function (that, inverDevPage, action) {
    util.http_oper(encodeURI("&action=queryDeviceEnergyQuintetOneDay" + action), function (err, dat, desc) {
      if (err == 0) {
        inverDevPage.energyToday = util.formatKwh(dat.energyToday).join(''),
          inverDevPage.energyMonth = util.formatKwh(dat.energyMonth).join(''),
          inverDevPage.energyYear = util.formatKwh(dat.energyYear).join(''),
          inverDevPage.energyTotal = util.formatKwh(dat.energyTotal).join('')

        inverDevPage.output_power = util.formatKw(parseFloat(dat.outputPower), 1, 1).join("")
        that.setData({
          inverDevPage: inverDevPage,
        })

      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    }, function () {
      that.canvasPar(that)
    })
  },
  collDev: function (that, inverDevPage) {
    util.http_oper(encodeURI("&action=queryCollectorDevicesStatus" + "&pn=" + inverDevPage.pn), function (err, dat, desc) {
      if (err == 0) {
        var statusT = dat.dev.length
        var normal = []
        var offline = []
        var colledatArr = []
        for (var i = 0; i < dat.dev.length; i++) {
          if (dat.dev[i].status == 1) {
            offline = offline.concat(dat.dev[i])
          } else {
            normal = normal.concat(dat.dev[i])
          }
        }
        dat.pn = that.data.inverDevPage.pn
        dat.alias = that.data.inverDevPage.alias
        dat.device = dat.dev
        dat.offline = offline
        dat.normal = normal

        colledatArr[0] = dat
        that.setData({
          colledatArr: colledatArr
        })
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    }, function () {
    })
  },
  onPullDownRefresh: function () {

  },
  onShareAppMessage: function () {
    var shareObj = util.shareFunc()
    return shareObj
  },
  canvasPar: function (that) { // 绘图提出
    that.setData({
      typ: 'column',
      ts: [],
      val: [],
    })
    var paraOne = that.data.inverDevPage
    var arg = that.data.arg
    var url = ''
    if (arg == 'day') {
      url = "&action=queryDeviceActiveOuputPowerOneDay"
      that.setData({
        typ: 'area'
      })
    } else if (arg == 'month') {
      url = "&action=queryDeviceEnergyMonthPerDay"
    } else if (arg == 'year') {
      url = "&action=queryDeviceEnergyYearPerMonth"
    } else if (arg == 'total') {
      url = "&action=queryDeviceEnergyTotalPerYear"
    }
    url += "&pn=" + paraOne.pn + "&devcode=" + paraOne.devcode + "&devaddr=" + paraOne.devaddr + "&sn=" + paraOne.sn + "&date=" + that.data.calendar.date + "&parameter=ENERGY_TODAY"
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        var ts = [], val = []
        if (arg == 'day') {
          dat = dat.outputPower
        } else if (arg == 'month') {
          dat = dat.perday
        } else if (arg == 'year') {
          dat = dat.permonth
        } else if (arg == 'total') {
          dat = dat.peryear
        }
        var valSum = 0;
        for (var i = 0; i < dat.length; i++) {
          if (arg == 'day') {
            ts[i] = util.trim(dat[i].ts).substring(11, 16)
          } else if (arg == 'month') {
            ts[i] = util.trim(dat[i].ts).substring(8, 10)
          } else if (arg == 'year') {
            ts[i] = util.trim(dat[i].ts).substring(5, 7)
          } else if (arg == 'total') {
            ts[i] = util.trim(dat[i].ts).substring(0, 4)
          }
          val[i] = parseFloat(dat[i].val).toFixed(1);
          valSum += parseFloat(dat[i].val)
        }
        var valArr = [] // 柱状图更改 更改Y轴值的传入形式
        for (var i = 0; i < val.length; i++) {
          var valObj = {}
          valObj.value = val[i],
            valArr.push(valObj)
        }
        that.setData({
          ts: ts,
          val: val,
          valArr: valArr,
        })
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    }, function () {
      if (that.data.drawType == 'line'){
        that.drawBar(that.data.ts, that.data.val, that.data.drawType)
      }else{
        that.drawBar(that.data.ts, that.data.valArr, that.data.drawType)
      }
      
    })
  },

  queryParaDetail: function (that, fir) {//参数列表的 某天的输出有功功率明细(00:00:00 ~ 23:59:59)
    that.setData({
      invParaDetail: [],
      errBox: {},
    })
    var inverDevPage = that.data.inverDevPage
    var url = "&action=queryDeviceDataOneDay&i18n=zh_CN&pn=" + inverDevPage.pn + "&devcode=" + inverDevPage.devcode + "&devaddr=" + inverDevPage.devaddr + "&sn=" + inverDevPage.sn + '&date=' + that.data.cdate
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        that.data.slider.sliderLength = dat.row.length
        that.setData({
          slider: that.data.slider
        })

        var titleCon = []; // 单位
        for (var i = 0; i < dat.title.length; i++) {
          if (!dat.title[i].unit) {
            titleCon[i] = dat.title[i].title
          } else {
            titleCon[i] = dat.title[i].title + '(' + dat.title[i].unit + ')'
          }
          if (dat.title[i].title == '总发电量') {
            var changUnit = i;
          }
        }

        if (fir == 'fir') { // 值  目前是最后一笔
          var filedArr = dat.row[dat.row.length - 1].field
        } else if (parseFloat(that.data.slider.sliderVal) >= parseFloat(dat.row.length)) {
          var filedArr = dat.row[dat.row.length - 1].field
        } else if (that.data.slider.sliderVal == 0) {
          that.data.slider.sliderVal = 1
          that.setData({
            slider: that.data.slider
          })
          var filedArr = dat.row[that.data.slider.sliderVal - 1].field
        } else {
          var filedArr = dat.row[that.data.slider.sliderVal - 1].field
        }

        var fileTotal = [];
        for (var i = 0; i < titleCon.length; i++) {
          if (i == changUnit) {
            titleCon[i] = dat.title[i].title + '(' + util.formatKwh(filedArr[i])[1] + ')'
            filedArr[i] = parseFloat(util.formatKwh(filedArr[i])[0])
          }
          var fileObj = {}
          fileObj['title'] = titleCon[i]
          fileObj['unit'] = filedArr[i]
          fileTotal[i] = fileObj
        }
        var fileTotalStr = JSON.stringify(fileTotal)
        var fileTotalpar = JSON.parse(fileTotalStr)
        that.setData({
          invParaDetail: fileTotalpar
        })
      } else {
        that.data.slider = {
          sliderLength: 0,
          sliderVal: 0
        }
        that.setData({
          slider: that.data.slider
        })
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    }, function () {
    })
  },
})
function initSubMenuDisplay() {
  return ['hidden', 'hidden', 'hidden'];
}
