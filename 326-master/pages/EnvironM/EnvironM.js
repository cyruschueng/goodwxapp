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
    modelDat: {
      label: '修改别名',
      mStatus: false,//模态框显示
      modiStatus: false,//修改
      delStatus: false,//删除
      debStatus: false//调试
    },
    ts: [],
    valArr:[],
    datUnit:['m/s'],
    EnvDevPPage:[],
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
    calendar: {
      label1: '风速',
      label2: '日照',
      label3: '环境温度',
      label4: '背板温度',
      date: '',
      tabArr: {
        curHdIndex: 0,
        curBdIndex: 0
      },
    }, 
    par:'',//请求参数
    modiAliDat:'',//别名内容
    cmd: '',//指令内容
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
          color: '#000'
        }
      },
      grid: {
        containLabel: true,
        top: 15,
        left: 5,
        right: 5,
        bottom: 25,
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
    if (chart) {
      chart.setOption(option);
    }
  },
  modeCancel: function () {//关闭模态框
    util.modeCancel(this)
  },
  tapMainMenu: function (e) {
    util.tapMainMenuFunc(this, e)
  },
  tapSubMenu: function (e) {
    util.tapSubMenuFunc(e, this)
  },

  modiAliInput: function (e) {  // 改别名输入框input
    if (e.detail.value != null) {
      this.setData({
        modiAliDat: util.trim(e.detail.value)
      })
    }
  },
  modConfi: function () { //操作模态框
    var that = this;
    var modelShow = that.data.modelDat
    if (modelShow.modiStatus == true) {
      util.confiAliFunc(that, that.data.modiAliDat, 'editDeviceInfo', that.data.EnvDevPPage)
    } else if (modelShow.delStatus == true) {
      util.confiDelFunc(that, 'delDeviceFromPlant', that.data.EnvDevPPage)
    } else if (modelShow.debStatus == true) {
      if (that.data.cmd == '') {
        wx.showToast({
          title: '指令不能为空',
          icon: 'loading',
          duration: 1500
        })
      } else {
        util.confidebuFunc(that, 'sendCmdToDevice', that.data.EnvDevPPage, that.data.cmd)
      }
    }
  },
  inverbugInput: function (e) {// 获取输入的数据调试指令
    var that = this
    if (e.detail.value != null) {
      that.setData({
        cmd: util.trim(e.detail.value)
      })
    }
  },
  tabFun: function (e) {// 点击切换标签的颜色
    var that = this;
    var _datasetId = e.target.dataset.id;
    var calendar = that.data.calendar
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    calendar.tabArr = _obj
    that.setData({
      errBox:{}
    })
    if (_datasetId == '0') {
      that.setData({
        par: "WIND_SPEED",
        datUnit: ['m/s'],
      })
    } else if (_datasetId == '1') {
      that.setData({
        par: "RADIATION",
        datUnit: ['W/m2'],
      })
    } else if (_datasetId == '2') {
      that.setData({
        par: "TEMP",
        datUnit: ['0.0℃'],
      })
    } else if (_datasetId == '3') {
      that.setData({
        par: "BTEMP",
        datUnit: ['0.0℃'],
      })
    }
    that.setData({
      calendar: calendar
    });
    that.canvasPar(that)
  },
  doDay: function (e) {// 上一日月年总
    var that = this
    var type = e.currentTarget.dataset.type
    var calendar = that.data.calendar
      if (type == 'pre') {
        calendar.date = util.getYestoday(calendar.date)
      } else if (type == 'after') {
        calendar.date = util.getNextday(calendar.date)
      }
      that.setData({
        ts: [],
        valArr: [],
        errBox: {},
        calendar: calendar
      })
      that.canvasPar(that)
    },
  onLoad: function (options) {
    var that = this;
    var screenVal = wx.getStorageSync('screenVal')
    that.data.calendar.date = screenVal.currentDate
    that.setData({
      calendar: that.data.calendar,
      EnvDevPPage: JSON.parse(options.EnvDevP),
      par: "WIND_SPEED",
    })
    that.canvasPar(that)
  },
  onPullDownRefresh: function () {
  
  },
  onShareAppMessage: function () {
    var shareObj = util.shareFunc()
    return shareObj
  },
  
  canvasPar: function (that) {// 绘图提出
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    var paraOne = that.data.EnvDevPPage
    var url = "&action=queryDeviceKeyParameterOneDay&pn=" + paraOne.pn + "&devcode=" + paraOne.devcode + "&devaddr=" + paraOne.devaddr + "&sn=" + paraOne.sn + "&date=" + that.data.calendar.date + "&parameter=" + that.data.par
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        var ts = [], val = []
        dat = dat.parameter
        var valSum = 0;
        for (var i = 0; i < dat.length; i++) {
          ts[i] = util.trim(dat[i].ts).substring(11, 16)
          val[i] = dat[i].val;
          valSum += parseFloat(val[i])
        }
        var valArr = [] // 柱状图更改
        for (var i = 0; i < val.length; i++) {
          var valObj = {}
          valObj.value = val[i],
            valArr.push(valObj)
        }
        that.setData({
          ts: ts,
          valArr: valArr
        })
      } else { 
        util.errBoxFunc(that, err, desc)
      }
    }, function () { 
      util.netWork(that)  
    },function(){
      wx.hideLoading()
      that.drawBar(that.data.ts, that.data.valArr)
    })
  },
})
function initSubMenuDisplay() {
  return ['hidden', 'hidden', 'hidden'];
}