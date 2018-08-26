import * as echarts from '../../ec-canvas/echarts';
var util = require('../../utils/util.js');
var app = getApp();

var chart = null;// 柱状图更改
var option = {
  color: ['#6DBA33', '#ED4C3C'],
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '13',
            fontWeight: 'normal'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        { value: 0, name: '未处理' },
        { value: 0, name: '已处理' }
      ]
    }
  ]
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
// 第二个
var chart1 = null;// 柱状图更改
var option1 = {//重新赋值即可更新数据
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
function initChart1(canvas, width, height) {
  var that = this
  chart1 = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart1);
  chart1.setOption(option1);
  return chart1;
}
Page({
  data: {
    dougcol1: [
      {
        value: 0, name: '未处理'
      }, {
        value: 0, name: '已处理'
      }
    ],
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
    // 第二个
    option1: {
      xAxis: {
        data: []
      },
      series: [{
        data: []
      }]
    },
    ec1: {
      onInit: initChart1
    },
    dougcol: [],
    ts: [],
    val: [],
    H1: '1',
    H2: '1',
    H3: '1',
    errtS: false,
    errMsg: '',
    handleCount: 0,
    noHandleCount: 0,
    handleCountPer: 0,
    noHandleCountPer: 0,
    //标记已执行完
    handY: '',
    noHandY: '',
    todaye: '',
    months: '',
    WarningCountRank: [],
    tabBox:{
      tabArr1: {
        curHdIndex: 0,
        curBdIndex: 0
      },
    },
    levelVal: '0'
  },
  alarmPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  drawBar: function (that, dat) {
    var that = this
    option = {
      color: ['#6DBA33', '#ED4C3C'],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '13',
                fontWeight: 'normal'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: dat
        }
      ]
    };
    if (chart) {
      chart.setOption(option);
    }
  },
  drawBar1: function (xDat, yDat) {
    var that = this
    option1 = {//更新数据
      tooltip: {
      },
      xAxis: {
        data: xDat
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
        name: '',
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
    if (chart1) {
      chart1.setOption(option1);
    }
  },
  // 3.33查询所有电站中的设备告警数
  queryPlantsWarningCount: function (that, handle, sdate, edate) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    that.setData({
      H1: '',
    })
    var url = "&action=queryPlantsWarningCount&sdate=" + sdate + '&edate=' + edate
    if (handle != '') {
      url += "&handle=" + handle
    }
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        if (handle == 'true') {
          that.setData({
            handleCount: parseFloat(dat.count ? dat.count:0),
            handY: '1',
          })
          that.queryPlantsWarningAllCount(that)
        } else if (handle == 'false') {
          that.setData({
            noHandleCount: parseFloat(dat.count ? dat.count:0),
            noHandY: '1',
          })
          that.queryPlantsWarningAllCount(that)
        } else if (handle == '') {
          that.setData({
            Count: dat.count,
            handleCountPer: (100 * that.data.handleCount / parseFloat(dat.count)).toFixed(1),
            noHandleCountPer: (100 * that.data.noHandleCount / parseFloat(dat.count)).toFixed(1),
          })
        }
        var dougcol1 = that.data.dougcol1
        dougcol1[0] = that.data.handleCount
        dougcol1[1] = that.data.noHandleCount
        that.setData({
          dougcol1: dougcol1
        })
        
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    }, function () {
      that.setData({
        H1: '1'
      })
      that.showHider(that)

    })
  },
  // 查询当月总告警数
  queryPlantsWarningAllCount: function (that) {
    if (that.data.noHandY == '1' && (that.data.handY == '1')) {
      that.queryPlantsWarningCount(that, '', that.data.months, that.data.todaye)
      // for(var i=0;i<2;i++){

        setTimeout(function(){
          // that.chartFunc1(that, that.data.dougcol)
        },1000)
       
      }
      
    // }
  },
  // 3.37查询所有电站中的设备告警数TOP-X
  queryPlantsWarningCountRankFunc: function (that) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    that.setData({
      H2: '',
    })
    var url = "&action=queryPlantsWarningCountRank&top=5"
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        that.setData({
          WarningCountRank: dat.rank
        })
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    }, function () {
      that.setData({
        H2: '1'
      })
      that.showHider(that)
    })
  },
  // 3.36查询所有电站中某月每天的设备告警数
  CountMonthPerDayFunc: function (that) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    that.setData({
      H3: '',
    })
    var url = "&action=queryPlantsWarningCountMonthPerDay&level=" + that.data.levelVal
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        var outputArr = dat.perday
        var ts = [], val = []
        for (var i = 0; i < outputArr.length; i++) {
          ts[i] = util.trim(outputArr[i].ts).substring(8, 10)
          val[i] = outputArr[i].val;
        }
        var valArr = [] // 柱状图更改
        for (var i = 0; i < val.length; i++) {
          var valObj = {}
          valObj.value = val[i],
            valArr.push(valObj)
        }
        that.setData({
          ts: ts,
          val: valArr,
        })
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    }, function () {
      that.setData({
        H3: '1'
      })
      that.showHider(that)
    })
  },
  showHider: function (that) {
    if (that.data.H1 == '1' && (that.data.H2 == '1') && (that.data.H3 == '1')) {
      wx.hideLoading()
      that.drawBar1(that.data.ts, that.data.val)
      that.drawBar(that, that.data.dougcol1)
    }
  },
  // 点击切换标签的颜色
  tabFun: function (e) {
    util.tabFun(e, this)
  },
  levelto: function (e) {
    var that = this;
    if (e.currentTarget.dataset.id == '0') {
      that.setData({
        levelVal: '0'
      })
    } else if (e.currentTarget.dataset.id == '1') {
      that.setData({
        levelVal: '1'
      })
    } else if (e.currentTarget.dataset.id == '2') {
      that.setData({
        levelVal: '2'
      })
    }
    that.CountMonthPerDayFunc(that)
  },

  onLoad: function (options) {
    var that = this;
    // 本月的起始时间
    var date = new Date();
    var months = util.getMonthTime()
    var todaye = date.getFullYear() + "-" + util.doubDigit((date.getMonth() + 1)) + "-" + util.doubDigit(date.getDate()) + " 23:59:59";
    that.setData({
      months: months,
      todaye: todaye,
    })
    that.queryPlantsWarningCount(that, 'true', months, todaye)
    that.queryPlantsWarningCount(that, 'false', months, todaye)
    that.queryPlantsWarningCountRankFunc(that)
    that.CountMonthPerDayFunc(that)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onShareAppMessage: function () {
    var shareObj = util.shareFunc()
    return shareObj
  }
  /**
   * 用户点击右上角分享
   */

})