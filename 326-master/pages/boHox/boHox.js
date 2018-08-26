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
    argid: '1#模块输入电压',
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
    tabBox: {
      label1: '图表',
      label2: '数据',
      tabArr1: {
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
    datUnit:['v'],
    boHDevice: [],//top里的pn和地址
    nowdate: '',
    subMenuDisplay: initSubMenuDisplay(),
    chartNavHid: false,//图标页隐藏
    datNav: true,//参数页控件隐藏
    slider: {
      sliderLength: 0,
      sliderVal: 1
    },
    modelDat: {
      label: '修改别名',
      mStatus: false,//模态框显示
      modiStatus: false,//修改
      delStatus: false,//删除
      debStatus: false//调试
    },
    invParaDetail: [],// 遍历的参数
    titleConInp: [],
    
    modiAliDat: '',// 下拉菜单
    subMenuDisplay: initSubMenuDisplay(),
  },
  tabFunc: function (e) {
    var that = this
    util.tabFunc(that, e)
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
  modConfi: function () { //操作模态框
    var that = this;
    var modelShow = that.data.modelDat
    if (modelShow.modiStatus == true) {
      util.confiAliFunc(that, that.data.modiAliDat, 'editDeviceInfo', that.data.EnvDevPPage)
    } else if (modelShow.delStatus == true) {
      util.confiDelFunc(that, 'delDeviceFromPlant', that.data.EnvDevPPage)
    } else if (modelShow.debStatus == true) {
      wx.showToast({
        title: '暂不支持此功能',
        icon: 'loading',
        duration: 1500
      })
    }
  },
 
  modiAliInput: function (e) { // 改别名输入框input
    if (e.detail.value != null) {
      this.setData({
        modiAliDat: util.trim(e.detail.value)
      })
    }
  },
  tapMainMenuHHH: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var newSubMenuDisplay = initSubMenuDisplay();
    if (this.data.subMenuDisplay[index] == 'hidden') {
      newSubMenuDisplay[index] = 'show';
      that.setData({
        chartHide:true,
      })
    } else {
      newSubMenuDisplay[index] = 'hidden';
      that.setData({
        chartHide: false,
      })
    }
    this.setData({
      subMenuDisplay: newSubMenuDisplay
    });
  },
  tapSubMenuHHH: function (e) {
    var that = this
    var initSubMenuHighLight = [
      ['', '', '', '', ''],
      ['', ''],
      ['', '', '']
    ];
    this.setData({
      subMenuDisplay: initSubMenuDisplay(),
      chartHide: false,
    });
    var indexArray = e.currentTarget.dataset.index.split('-');
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
    // 查询设备参数并画图
    var argid = e.currentTarget.id
    that.setData({
      argid: argid
    })
    queryParaDetail(that, '')
  },
  // 下拉菜单end

  // 图表数据显示隐藏
  chartNav: function () {
    this.setData({
      chartNavHid: false,
      datNav: true,
    })
  },
  datNav: function () {
    this.setData({
      chartNavHid: true,
      datNav: false,
    })
  },
  tabFun: function (e) {
    util.tabFun(e, this)
  },
  do1Day: function (e) {//图表页面日期切换
    var that = this
    var type = e.currentTarget.dataset.type
    var date = that.data.cdate
    if (type == 'pre') {
      date = util.getYestoday(date)
    } else if (type == 'after') {
      date = util.getNextday(date)
    }
    that.setData({
      cdate: date,
    });
    queryParaDetail(that,'fir')
  },
  slider: function (e) {// slider滑动出发
    var that = this;
    that.data.slider.sliderVal = e.detail.value
    that.setData({
      slider: that.data.slider
    })
    queryParaDetail(that,'')
  },
  
  onLoad: function (options) {

    var that = this;
    var boHDevice = JSON.parse(options.boHDevice)
   
    var title = boHDevice.alias ? boHDevice.alias : boHDevice.pn
    
    wx.setNavigationBarTitle({ title: title })
    wx.setNavigationBarTitle({ title: boHDevice.alias })
    var screenVal = wx.getStorageSync('screenVal')
    var cdate = screenVal.currentDate
    that.setData({
      nowdate: screenVal.nowdate,
      boHDevice: boHDevice,
      cdate: cdate,
      currentDat: cdate,
    })
   
    queryParaDetail(that, 'fir') // 查询设备参数
  },
  onPullDownRefresh: function () {
  },
  onReachBottom: function () {
  },
  onShareAppMessage: function () {
    var shareObj = util.shareFunc()
    return shareObj
  }
})

function queryParaDetail(that, fir) {//参数列表的 某天的输出有功功率明细(00:00:00 ~ 23:59:59)
  wx.showLoading({
    title: '加载中',
    mask: true,
  })
  var boHDevice = that.data.boHDevice
  var url = "&action=queryDeviceDataOneDay&i18n=zh_CN&pn=" + boHDevice.pn + "&devcode=" + boHDevice.devcode + "&devaddr=" + boHDevice.devaddr + "&sn=" + boHDevice.sn + '&date=' + that.data.cdate
  util.http_oper(encodeURI(url), function (err, dat, desc) {
    if (err == 0) {
      that.data.slider.sliderLength = dat.row.length
      that.setData({
        slider: that.data.slider
      })
      // 画图str  
      var argid = that.data.argid
      var titleCon = [], val_dat = [], val_currTs = [];
      // 取得选中的下拉值在title中的下标key
      for (var i = 0; i < dat.title.length; i++) {
        if (dat.title[i].title == argid) {
          // 取得对应的value值
          for (var j = 0; j < dat.row.length; j++) {
            val_dat.push(dat.row[j].field[i])
          }
        }
        if (dat.title[i].title == '时间戳') {
          for (var k = 0; k < dat.row.length; k++) {
            val_currTs.push(dat.row[k].field[i].substring(11, 16))
          }
        }
      }
      var titleConInput = [];
      for (var i = 0; i < dat.title.length; i++) {
        titleCon[i] = dat.title[i].title
      }
      if (fir == 'fir') {  // 值  目前是最后一笔   sliderVal
        var filedArr = dat.row[dat.row.length - 1].field
      } else if (parseFloat(that.data.slider.sliderVal) >= parseFloat(dat.row.length)) {
        var filedArr = dat.row[dat.row.length - 1].field
      } else {
        var filedArr = dat.row[that.data.slider.sliderLength-1].field
      }

      var fileTotal = [];
      for (var i = 0; i < titleCon.length; i++) {
        var fileObj = {}, fileObj_0 = {}  //fileObj_0为空值
        fileObj['title'] = titleCon[i]
        fileObj['unit'] = filedArr[i]
        fileTotal[i] = fileObj
        if (i != 0 && i != 1 && titleCon[i]!="版本号"){
          titleConInput.push(titleCon[i])

        }
      }
      var fileTotalStr = JSON.stringify(fileTotal) // 存储下拉菜单的值为数组
      var fileTotalpar = JSON.parse(fileTotalStr)

      that.setData({
        ts: val_currTs,//画图的数据
        valArr: val_dat,//画图的数据
        invParaDetail: fileTotalpar, // 参数表
        titleConInp: titleConInput,  // input下拉框里的值
      })
    } else {
      that.setData({
        chartHide: true,
      })
      util.errBoxFunc(that, err, desc)
    }
  }, function () {
    util.netWork(that)
  }, function () {
    wx.hideLoading()
    that.drawBar(that.data.ts, that.data.valArr)
  })
}
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