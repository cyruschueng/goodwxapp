// analysisReport.js
var app = getApp()
var RequestUtil = require("../../utils/RequestUtil.js");
var wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;
var lineChartFull = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultCanvasShowed: false, // 图表区域显示／隐藏
    analysisLoadShowed: false, // 加载中区域显示／隐藏
    currentItem: null, // 定义当前选中项
    scrollHeight: 375, // 
    stream_id: '', //定义stream_id用于判断websocket中added消息
    rank: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    rankColorDefault: {A:'#f28d3d', B:'#6b489c', C:'#e15b74', D:'#58b8ad', E:'#7573b4', F:'#88cdf1', G:'#FF6666', H:'#FF9900', I:'#99CC33', J:'#33CC99'}, // 设置标注的可选颜色
    keywordRuleVal: {},
    // analysisData: [{
    //   id: 0,
    //   rank: 'A',
    //   count: 23,
    //   title: '微信牵头小程序风潮遭阿里模仿',
    //   media_name: '腾讯科技',
    //   publish_at: '2017-09-01'
    // }, {
    //   id: 1,
    //   rank: 'B',
    //   count: 37,
    //   title: '360安全卫士',
    //   media_name: '奇虎科技',
    //   publish_at: '2017-09-01'
    // }, {
    //   id: 2,
    //   rank: 'C',
    //   count: 28,
    //   title: '百度外卖严重掉队',
    //   media_name: '百度科技',
    //   publish_at: '2017-09-01'
    // }, {
    //   id: 3,
    //   rank: 'D',
    //   count: 22,
    //   title: '日本新任内阁大臣翌日发表声明',
    //   media_name: '凤凰网',
    //   publish_at: '2017-09-01'
    // }, {
    //   id: 4,
    //   rank: 'E',
    //   count: 28,
    //   title: 'NBA将于10月19日开战，联盟各队积极备战。',
    //   media_name: '新浪体育',
    //   publish_at: '2017-09-01'
    // }
    // , {
    //   id: 5,
    //   rank: 'F',
    //   count: 16,
    //   title: '齐齐睇下香奈儿几款新品',
    //   media_name: '时尚追踪',
    //   publish_at: '2017-09-01'
    // }
    // ],
    // series: [{ //required 数据列表
    //   name: 'A', //数据名称
    //   data: [19, 12, 65, 37, 4, 8, 37, 12], //required (饼图、圆环图为Number) 数据，如果传入null图表该处出现断点
    //   color: '#ffe2de', //不传入则使用系统默认配色方案
    //   stroke: '#f28d3d', //不传入则使用系统默认配色方案
    //   pointColor: '#f28d3d', //不传入则使用系统默认配色方案
    //   format: function(val) { //自定义显示数据内容
    //     return val.toFixed(2) + '篇'; //显示小数点后两位
    //   }
    // }, {
    //   name: 'B',
    //   data: [30, 27, 45, 78, 29, 34, 62, 47],
    //   color: '#b5d9f1',
    //   stroke: '#88cdf1',
    //   pointColor: '#4aabef',
    //   format: function(val) {
    //     return val.toFixed(0) + '篇'; //显示整数型
    //   }
    // }, {
    //   name: 'C',
    //   data: [18, 67, 15, 48, 49, 14, 62, 17],
    //   color: '#ffd4de',
    //   stroke: '#e15b74',
    //   pointColor: '#fc4257',
    //   format: function(val) {
    //     return val.toFixed(0) + '篇'; //显示整数型
    //   }
    // }, {
    //   name: 'D',
    //   data: [10, 37, 45, 0, 37, 68, 10, 0],
    //   color: '#d8f0f4',
    //   stroke: '#58b8ad',
    //   pointColor: '#46b4c1',
    //   format: function(val) {
    //     return val.toFixed(0) + '篇'; //显示整数型
    //   }
    // }, {
    //   name: 'E',
    //   data: [0, 0, 25, 18, 69, 34, 42, 22],
    //   color: '#e3ddf9',
    //   stroke: '#7573b4',
    //   pointColor: '#585eea',
    //   format: function(val) {
    //     return val.toFixed(0) + '篇'; //显示整数型
    //   }
    // }, {
    //   name: 'All',
    //   data: [30, 200, 225, 178, 29, 364, 162, 47],
    //   rank: ['A', 'B', 'C', 'D','E', 'F','G', 'H'],
    //   rankColor: ['#f28d3d', '#88cdf1', '#e15b74', '#58b8ad', '#7573b4', '#88cdf1', '#f28d3d', '#4aabef'],
    //   color: '#b5d9f1',
    //   stroke: '#88cdf1',
    //   pointColor: '#4aabef',
    //   format: function(val) {
    //     return val.toFixed(0) + '篇'; //显示整数型
    //   }
    // }],

  },

  /**
   * 分析列表子项点击事件，跳转到分析详情页面
   */
  analysisDetailTap: function (event) {
    console.log('analysisDetailTap', event)
    let label = event.currentTarget.dataset.label
    let key = event.currentTarget.dataset.key
    label = JSON.stringify(label)
    key = JSON.stringify(key)
    let url = '../../pages/analysisDetail/analysisDetail?label=' + label + '&key=' + key
    wx.navigateTo({
      url: url,
      success: function() {
        console.log('analysisDetailTap url:', url)
      }
    })
  },

  /**
   * 更多相关信息的点击事件
   */
  fullviewTap: function(options) {
    var that = this
    console.log('analysis fullviewTap')
    // 获取设备屏幕宽度，并设置宽度
    // try {
    //   // let res = wx.getSystemInfoSync();
    //   // windowHeight = res.windowHeight;
    //   let windowHeight = app.globalData.systemInfo.windowHeight
    //   // 更新页面高度
    //   this.setData({
    //     fullHeight: windowHeight
    //   })
    // } catch (options) {
    //   console.error('getSystemInfoSync failed!');
    // }
  },
  //最小值
  arrayMin: function(array) {
    var min = array[0];
    var len = array.length;
    for (var i = 1; i < len; i++) {
      if (array[i] < min) {
        min = array[i];
      }
    }
    return min;
  },
  //最大值
  arrayMax: function(array) {
    var max = array[0];
    var len = array.length;
    for (var i = 1; i < len; i++) {
      if (array[i] > max) {
        max = array[i];
      }
    }
    return max;
  },
  /**
   * 更多相关信息的点击事件
   */
  relatedTap: function(options) {
    var that = this
    console.log('analysis relatedTap')

  },
  /**
   * 生成随机数据
   */
  createSimulationData: function() {
    var categories = [];
    var data = [];
    for (var i = 0; i < 8; i++) {
      categories.push('2016-' + (i + 1));
      data.push(Math.random() * (20 - 10) + 10);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },
  /**
   * 列表选中操作，用户点击列表改变当前列表样式，支持多选
   * @ param  options  事件对象
   */
  tagChooseTap:function(options){
    var that = this
    let id = options.currentTarget.dataset.id;
    let currentItem = this.data.currentItem
    let series_all = [this.data.series[5]] //全部图表数据
    let series_id = [this.data.series[id]] //对应列表项的图表数据
    console.log('analysis tagChooseTap')
    console.log('tagChoose id:', id)
    // if (currentItem[id] == id) {
    //   currentItem[id] = -1;
    //   this.setData({
    //     currentItem:currentItem
    //   })
    //   // 更新图表数据，显示全部
    //   this.updateChartData(currentItem)
    // } else {
    //   currentItem[id] = id;
    //   this.setData({
    //     currentItem:currentItem
    //   })
    //   // 更新图表数据，显示全部
    //   this.updateChartData(currentItem)
    // }
    if (currentItem == id) {
      // 取消列表选中项的当前样式
      this.setData({
        'currentItem': -1
      })
      // 更新图表数据，显示全部
      lineChart.updateData({
        series: series_all
      });
    } else if (currentItem !== id) {
      //设置当前选中项的样式
      this.setData({
        'currentItem':id
      })
      var simulationData = this.createSimulationData();
      // var series = [{
      //     name: '焦点',
      //     data: simulationData.data,
      //     format: function (val, name) {
      //         return val.toFixed(2) + '篇';
      //     }
      // }];
      // 更新图表数据，显示当前选中项
      lineChart.updateData({
          // categories: simulationData.categories,
          series: series_id
      });
    }
  },

  /**
   * 显示全部点击事件，显示全部图表
   */
  showAllTap:function(options){
    console.log('analysis showAllTap')
    var that = this
    // let currentItem = this.data.currentItem
    // let series = this.data.series
    let series_all = [this.data.series[5]] 
    // for (let i = 0; i < currentItem.length; i++) {
    //   currentItem[i] = -1
    // }
    // 取消列表选中的当前样式
    this.setData({
      currentItem: -1
    })
    // 更新图表数据
    lineChart.updateData({
      series: series_all
    });
  },
  /**
   * wxCharts图表操作，用户点击图表显示数值
   */
  touchHandler: function (e) {
    console.log(e)
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec'
    });
  },
  /**
   * 更新图表数据
   * @ param  currentItem  当前列表选中项数组，没有选中的项对应值为-1
   */
  updateChartData:function(data){
    console.log('analysis updateChartData')
    var that = this
    let categories = data.category
    // let categories = ['2017-09-01', '2017-09-02', '2017-09-03', '2017-09-04', '2017-09-05']
    let seriesAll = data.series.ALL
    let markPoint = data.mark_point
    let maxVal = this.arrayMax(seriesAll) // 排序找出最大值
    let rank = []
    let rankColorDefault = this.data.rankColor
    let rankColors = []
    let j = 0 // 定义保存rankColor颜色的索引号
    // 对应标注点
    for (let i = 0; i < categories.length; i++) {
      for (let key in markPoint) {
        if (categories[i] == markPoint[key]) {
          rank.push(key)
          rankColors.push(rankColorDefault[j])
          j++;
        }
      }
      if (rank[i] == undefined) {
        rank.push('')
        rankColors.push('')
      }
    }
    console.log('rank:', rank)
    console.log('rankColors:', rankColors)
    // 截取月日
    for (let i = 0; i < categories.length; i++) {
      categories[i] = categories[i].slice(5, 10)
    }
    // 
    seriesAll = [{
      name: 'All',
      data: seriesAll,
      rank: rank,
      rankColor: rankColors,
      color: '#ecf3ff',
      stroke: '#93bcfd',
      pointColor: '#4aabef'
    }]
    // 更新图表数据，显示全部图表
    lineChart.updateData({
      categories: categories,
      series: seriesAll
    });
  },
  /**
   * wxCharts图表绘制函数
   * updateData(data) 更新图表数据，data: object，data.categories(可选，具体见参数说明)，data.series(可选，具体见参数说明)，data.title(可选，具体见参数说明)，data.subtitle(可选，具体见参数说明)
   * stopAnimation() 停止当前正在进行的动画效果，直接展示渲染的最终结果
   * addEventListener(type, listener) 添加事件监听，type: String事件类型，listener: function 处理方法
   * getCurrentDataIndex(e) 获取图表中点击时的数据序列编号(-1表示未找到对应的数据区域), e: Object微信小程序标准事件，需要手动的去绑定touch事件
   * showToolTip(e, options?) 图表中展示数据详细内容(目前仅支持line和area图表类型)，e: Object微信小程序标准事件，options: Object可选，tooltip的自定义配置，支持option.background，默认为#000000; option.format, function类型，接受两个传入的参数，seriesItem(Object, 包括seriesItem.name以及seriesItem.data)和category，可自定义tooltip显示内容。
   */
  wxCharts: function(data) {
    var windowWidth = 320; //定义初始化图表宽度
    let categories = data.category
    let labelIndex = data.label_index
    let seriesAll = data.series.ALL
    let markPoint = data.mark_point
    // let categories = ["2017-06-28", "2017-06-29", "2017-06-30", "2017-07-01", "2017-07-02", "2017-07-03", "2017-07-04", "2017-07-05", "2017-07-06", "2017-07-07", "2017-07-08", "2017-07-09", "2017-07-10", "2017-07-11", "2017-07-12", "2017-07-13", "2017-07-14", "2017-07-15", "2017-07-16", "2017-07-17", "2017-07-18", "2017-07-19", "2017-07-20", "2017-07-21", "2017-07-22", "2017-07-23", "2017-07-24", "2017-07-25", "2017-07-26", "2017-07-27"]
    // let seriesAll = [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 14, 1, 0, 4, 0, 2, 6]
    // let labelIndex = ["2017-07-09", "2017-07-11", "2017-07-16", "2017-07-21", "2017-07-27"]
    // let markPoint = {A:["2017-07-09", 60],B:["2017-07-11", 130],C:["2017-07-16", 66],D:["2017-07-21", 970]}
    let maxVal = this.arrayMax(seriesAll) // 排序找出最大值
    let rank = []
    let rankColorDefault = this.data.rankColorDefault
    let rankColors = []
    let j = 0 // 定义保存rankColor颜色的索引号
    // 对应标注点
    for (let i = 0; i < categories.length; i++) {
      for (let key in markPoint) {
        if (categories[i] == markPoint[key][0]) {
          rank.push(key)
          rankColors.push(rankColorDefault[key])
          j++;
        }
      }
      if (rank[i] == undefined) {
        rank.push('')
        rankColors.push('')
      }
    }
    // 截取月日
    for (let i = 0; i < categories.length; i++) {
      categories[i] = categories[i].slice(5, 10)
      categories[i] = categories[i].replace('-', '.')
    }
    // 截取月日
    for (let i = 0; i < labelIndex.length; i++) {
      labelIndex[i] = labelIndex[i].slice(5, 10)
      labelIndex[i] = labelIndex[i].replace('-', '.')
    }
    // 获取设备屏幕宽度，并设置图表宽度
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
      console.log('windowWidth:', windowWidth)
      // 更新页面图表宽度
      this.setData({
        windowWidth: windowWidth
      })
    } catch (options) {
      console.error('getSystemInfoSync failed!');
    }
    lineChart = new wxCharts({
      canvasId: 'analysisCanvas', //required 微信小程序canvas-id
      type: 'area', //required 图表类型，可选值为pie, line, column, area, ring, radar
      categories: categories, //required (饼图、圆环图不需要) 数据类别分类
      labelIndex: labelIndex, // 绘制的对应的刻度(自定义)
      animation: true, //Boolean类型 default true 是否动画展示
      legend: false, //default true 是否显示图表下方各类别的标识
      background: '#f5f5f5',
      // series: [{ //required 数据列表
      //   name: '微信', //数据名称
      //   data: [15, 2, 45, 37, 4, 8, 37, 12], //required (饼图、圆环图为Number) 数据，如果传入null图表该处出现断点
      //   color: '#ff553e', //不传入则使用系统默认配色方案
      //   format: function(val) { //自定义显示数据内容
      //     return val.toFixed(2) + '篇'; //显示小数点后两位
      //   }
      // }, {
      //   name: '今日头条',
      //   data: [30, 37, 65, 78, 69, 54, 62, 47],
      //   color: '#ffe63e',
      //   format: function(val) {
      //     return val.toFixed(0) + '篇'; //显示整数型
      //   }
      // }],
      series: [{
        name: 'All',
        data: seriesAll,
        rank: rank,
        rankColor: rankColors,
        color: '#d6dbf4',
        stroke: '#d6dbf4',
        pointColor: '#4aabef'
      }],
      // series: [],
      xAxis: {
        gridColor: '#7cb5ec', //default #cccccc X轴网格颜色
        fontColor: '#999999', //default #666666 X轴数据点颜色
        disableGrid: false, //default false 不绘制X轴网格
        type: 'calibration' //可选值calibration(刻度) 默认为包含样式
      },
      yAxis: { //Y轴配置
        format: function(val) { //自定义Y轴文案显示
          return val.toFixed(0);
        },
        // min: 0, //Y轴起始值
        // max: maxVal, //Y轴终止值
        // title: '文章数 (篇)', //Y轴title
        // gridColor: '#e2e2e2', //default #cccccc Y轴网格颜色
        // fontColor: '#333333', //default #666666 Y轴数据点颜色
        // titleFontColor: '#333333', //default #333333 Y轴title颜色
        disabled: true //不绘制Y轴
      },
      width: windowWidth, //required canvas宽度，单位为px
      height: 200, //required canvas高度，单位为px
      dataLabel: false, //default true 是否在图表中显示数据内容值
      dataPointShape: false, //default true 是否在图表中显示数据点图形标识
      extra: {
        // ringWidth: 10, //ringChart圆环宽度，单位为px
        lineStyle: 'curve', //(仅对line, area图表有效) 可选值：curve曲线，straight直线 (default)
        // column: { //柱状图相关配置
        //   width: 10 //柱状图每项的图形宽度，单位为px
        // },
        // legendTextColor: '#ffffff', //default #cccccc legend文案颜色
      }
    });
  },

  /**
   * wxCharts全屏图表绘制函数
   */
  wxChartsFull: function(data) {
    var windowWidth = 603; //定义初始化图表宽度
    var windowHeight = 375; //定义初始化图表宽度
    let categories = data.category
    // let categories = ["2017-06-28", "2017-06-29", "2017-06-30", "2017-07-01", "2017-07-02", "2017-07-03", "2017-07-04", "2017-07-05", "2017-07-06", "2017-07-07", "2017-07-08", "2017-07-09", "2017-07-10", "2017-07-11", "2017-07-12", "2017-07-13", "2017-07-14", "2017-07-15", "2017-07-16", "2017-07-17", "2017-07-18", "2017-07-19", "2017-07-20", "2017-07-21", "2017-07-22", "2017-07-23", "2017-07-24", "2017-07-25", "2017-07-26", "2017-07-27"]
    let labelIndex = data.label_index
    let seriesAll = data.series.ALL
    // let seriesAll = [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 14, 1, 0, 4, 0, 2, 6]
    let markPoint = data.mark_point
    let maxVal = this.arrayMax(seriesAll) // 排序找出最大值
    let rank = []
    let rankColorDefault = this.data.rankColor
    let rankColors = []
    let j = 0 // 定义保存rankColor颜色的索引号
    // 对应标注点
    for (let i = 0; i < categories.length; i++) {
      for (let key in markPoint) {
        if (categories[i] == markPoint[key][0]) {
          rank.push(key)
          rankColors.push(rankColorDefault[j])
          j++;
        }
      }
      if (rank[i] == undefined) {
        rank.push('')
        rankColors.push('')
      }
    }
    // 截取月日
    for (let i = 0; i < categories.length; i++) {
      categories[i] = categories[i].slice(5, 10)
    }
    // 截取月日
    for (let i = 0; i < labelIndex.length; i++) {
      labelIndex[i] = labelIndex[i].slice(5, 10)
    }
    // 获取设备屏幕宽度，并设置图表宽度
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
      windowHeight = res.windowHeight;
      console.log('windowWidth:', windowWidth)
      // 更新页面图表宽度
      this.setData({
        windowWidth: windowWidth
      })
    } catch (options) {
      console.error('getSystemInfoSync failed!');
    }
    lineChartFull = new wxCharts({
      canvasId: 'areaCanvasFull', //required 微信小程序canvas-id
      type: 'area', //required 图表类型，可选值为pie, line, column, area, ring, radar
      categories: categories, //required (饼图、圆环图不需要) 数据类别分类
      labelIndex: labelIndex, // 绘制的对应的刻度(自定义)
      animation: true, //Boolean类型 default true 是否动画展示
      legend: false, //default true 是否显示图表下方各类别的标识
      background: '#f5f5f5',
      series: [{
        name: 'All',
        data: seriesAll,
        rank: rank,
        rankColor: rankColors,
        color: '#b5d9f1',
        stroke: '#88cdf1',
        pointColor: '#4aabef'
      }],
      // series: [],
      xAxis: {
        gridColor: '#7cb5ec', //default #cccccc X轴网格颜色
        fontColor: '#333333', //default #666666 X轴数据点颜色
        disableGrid: false, //default false 不绘制X轴网格
        type: 'calibration' //可选值calibration(刻度) 默认为包含样式
      },
      yAxis: { //Y轴配置
        format: function(val) { //自定义Y轴文案显示
          return val.toFixed(0);
        },
        // min: 0, //Y轴起始值
        max: maxVal + 2, //Y轴终止值
        // title: '文章数 (篇)', //Y轴title
        // gridColor: '#e2e2e2', //default #cccccc Y轴网格颜色
        // fontColor: '#333333', //default #666666 Y轴数据点颜色
        // titleFontColor: '#333333', //default #333333 Y轴title颜色
        disabled: true //不绘制Y轴
      },
      width: 603, //required canvas宽度，单位为px
      height: 375, //required canvas高度，单位为px
      dataLabel: false, //default true 是否在图表中显示数据内容值
      dataPointShape: false, //default true 是否在图表中显示数据点图形标识
      extra: {
        // ringWidth: 10, //ringChart圆环宽度，单位为px
        lineStyle: 'curve', //(仅对line, area图表有效) 可选值：curve曲线，straight直线 (default)
        // column: { //柱状图相关配置
        //   width: 10 //柱状图每项的图形宽度，单位为px
        // },
        // legendTextColor: '#ffffff', //default #cccccc legend文案颜色
      }
    });
  },

  /**
   * 通过 WebSocket 连接发送消息，以获取图表、列表数据
   */
  getSocketJsonrpcAnalysis: function () {
    var that = this
    let source_keyword = app.globalData.keywordRuleVal.source_keyword
    let keyword_rule = app.globalData.keywordRuleVal
    let condition = {"keyword_rule": keyword_rule}
    let openid = app.globalData.openid
    // let source_keyword = '百度'
    // let keyword_rule = {"source_keyword":"百度","and_keyword":[],"not_keyword":[]}
    // let condition = {"keyword_rule": keyword_rule}
    // let openid = 'owrXu0Pjm42svXnSgfnV_2-q1PUg'
    console.log(openid)
    RequestUtil.call(
      'fi_analysis_report', 
      {
        "keyword": source_keyword,
        "condition": condition,
        "document_id": openid
      }, 
      function(res) {
        console.log('getSocketJsonrpcAnalysis successCb', res)
        that.data.stream_id = res.stream_id
        that.subscribeJsonstream(res.stream_id)
      },
      function(res) {
        console.log('getSocketJsonrpcAnalysis errorCb', res)
      }
    );
  },

  /**
   * 订阅Jsonstream图表、列表数据
   */
  subscribeJsonstream: function (streamId) {
    var that = this
    let stream_id = streamId
    console.log('subscribeJsonstream')
    console.log('subscribeJsonstream stream_id:',stream_id)
    RequestUtil.subscribeJsonStream(
      stream_id,
      function(begin) {
        console.log('begin data', begin);
        // that.onJsonstreamBegin(begin)
      },
      function(add) {
        console.log('add data', add);
        that.onJsonstreamAdded(add)
      },
      function(end) {
        console.log('end data', end);
        that.onJsonstreamEnd(end)
      }
    )
  },

  /**
   * 取消订阅Jsonstream图表、列表数据
   */
  unSubscribeJsonstream: function () {
    var that = this
    let stream_id = this.data.stream_id
    console.log('unSubscribeJsonstream')
    console.log('unSubscribeJsonstream stream_id:',stream_id)
    RequestUtil.unSubscribeJsonStream(stream_id)
  },

  /**
   * 针对websocket服务端发送消息，Jsonstream的Begin消息事件处理
   */
  onJsonstreamBegin: function (data) {
    console.log('onJsonstreamBegin')

  },

  /**
   * 针对websocket服务端发送消息，Jsonstream的Added消息事件处理
   */
  onJsonstreamAdded: function (data) {
    console.log('onJsonstreamAdded')
    let data_type = data.sub.data_type
    console.log(data_type)
    // 判断stream_id是否正确，执行总分、分类得分计算，执行进度绘制、进度描述的数据更新
    // if (this.data.stream_id == data.data.stream_id) {
      // 判断data_type是否为虚拟数据
      if (data_type == 'fi_report_added_chart') {
        if (data.data.series.ALL.length > 0) {
          // 绘制图表
          this.wxCharts(data.data)
        }
        // 绘制全屏显示的图表
        // this.wxChartsFull(data.data)
        // this.updateChartData(data.data)
      }
      // 判断data_type是否实际数据
      else if (data_type == 'fi_report_added_list') {
        let analysisData = data.data
        // 设置可滚动视图区域高度
        let windowHeight = app.globalData.systemInfo.windowHeight
        let scrollHeight = windowHeight - 210 - 5 // 减去canvas图表高度
        this.setData({
          analysisData: analysisData,
          scrollHeight: scrollHeight
        })
      }
    // }
  },

  /**
   * 针对websocket服务端发送消息，Jsonstream的End消息事件处理
   */
  onJsonstreamEnd: function (data) {
    this.setData({
      analysisLoadShowed: true
    })
  },

  /**
   * 修改会员积分
   */
  addMembershipScore: function (data) {
    console.log('analysisReport addMembershipScore')
    let member_url = app.globalData.memberUrl // 修改会员积分的接口地址
    let app_id = app.globalData.appId // 公众号的appID
    let open_id = app.globalData.openid // 用户openID
    let card_id = app.globalData.cardId // 卡券ID
    let member_code = app.globalData.memberCode // 会员卡号
    wx.request({
      url: member_url, // 接口地址
      method: 'PUT',
      data: {
        "app_id": app_id, // 公众号appid
        "card_id": card_id, // 卡券id
        "code": member_code, // 会员卡号
        "type": "mini_program_click", // 积分变动类型
        "record_bonus": 'analysisReportPage' // 选填，积分变动说明，不超过14个汉字
      },
      success: function(res) {
        console.log('修改会员卡积分成功！')
        console.log('res.data', res.data)
      },
      fail: function (error) {
        console.log('修改会员卡积分失败！')
        console.log('member_url error', error)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('analysisReport onLoad')
    // 修改会员积分
    // this.addMembershipScore()
    // 测试用代码
    /*---- test start ----*/
    // console.log('analysisReport options:', options)
    // this.data.keywordRuleVal = JSON.parse(decodeURIComponent(options.keyword_rule))
    // console.log(this.data.keywordRuleVal)
    /*---- test end ----*/
  },

  /**
   * 生命周期函数--监听页面初次渲染完成 
   */
  onReady: function () {
    console.log('analysisReport onReady')
    let searchTitle = app.globalData.searchTitle
    let navTitle = '"' + searchTitle + '"' + '焦点分析'
    //动态设置当前页面导航条的标题
    wx.setNavigationBarTitle({
      title: navTitle,
      success: function (res) {
      console.log('success analysisReport navTitle:', res)
      console.log('analysisReport navTitle:', navTitle)
      // 修改app全局变量传入为当前页面的标题
      app.globalData.NavigationBarTitle = navTitle;
      // console.log('app.globalData.NavigationBarTitle:', app.globalData.NavigationBarTitle)
      },
      fail: function(err) {
        console.log('fail analysisReport navTitle:', err)
      }
    })
    // 
    this.getSocketJsonrpcAnalysis();
    // 
    // this.wxCharts();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('analysisReport onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('analysisReport onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('analysisReport onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('analysisReport onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('analysisReport onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  
  // }
})