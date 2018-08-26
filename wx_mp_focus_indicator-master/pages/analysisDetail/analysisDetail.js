// pages/analysisDetail/analysisDetail.js
var app = getApp()
var RequestUtil = require("../../utils/RequestUtil.js");
var wxCharts = require('../../utils/wxcharts.js');
var areaChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasShowed: true,
    currentItem: null,
    label: '',
    key: '', // 保存上一页的字母序号标注
    rank: [],
    // rankColor: ['#f28d3d', '#6b489c', '#e15b74', '#58b8ad', '#7573b4', '#88cdf1', '#FF6666', '#FF9900', '#99CC33', '#33CC99'], // 设置标注的可选颜色
    rankColorDefault: {A:'#f28d3d', B:'#6b489c', C:'#e15b74', D:'#58b8ad', E:'#7573b4', F:'#88cdf1', G:'#FF6666', H:'#FF9900', I:'#99CC33', J:'#33CC99'}, // 设置标注的可选颜色
    titleSignCount: null,
    unfoldAnimationData: {}, // 定义展开动画对象
    titleAnimationData: {}, // 定义动画对象
    unfold: {}, // 用于控制列表展开标志的箭头图标
    // le: 37
  },

  /**
   * 更多相关信息的点击事件
   */
  loadMoreTap: function(event) {
    var self = this
    console.log('analysisDetail loadMoreTap')
    console.log(event)
    let id = event.currentTarget.dataset.id
    let currentItem = this.data.currentItem
    let itemId = '#item' + id
    let cntId = '#cnt' + id
    let itemHeight = null
    let cntHeight = null
    let unfold = this.data.unfold

    // 创建动画实例
    var animation = wx.createAnimation({
      duration: 600,
      timingFuction: 'ease'
    })
    // 当前的标志状态，没有更改的
    if (currentItem !== id) {
      currentItem = id;
      self.setData({
        currentItem: currentItem
      })
    }
    // 获取节点的相关信息，需要获取的字段在fields中指定。
    wx.createSelectorQuery().select(itemId).fields({
      size: true // 返回节点尺寸（width height）
    }, function(res){
      itemHeight = res.height; // 节点的高度
      console.log('itemHeight', itemHeight)

      // 获取节点的相关信息，需要获取的字段在fields中指定。
      wx.createSelectorQuery().select(cntId).fields({
        size: true // 返回节点尺寸（width height）
      }, function(res){
        cntHeight = res.height; // 节点的高度
        console.log('cntHeight', cntHeight)
        if (cntHeight !== 0) {
          if (itemHeight !== 0) {
            // 改变展开图标，为向下
            unfold[id] = -1;
            self.animation = animation
            // hide，设置高度为0，实现折叠隐藏
            self.animation.height(0).step({timingFunction: 'ease-out'})
            self.setData({
              unfoldAnimationData: animation.export(),
              unfold: unfold
            })
          } else {
            // 改变展开图标，为向上
            unfold[id] = id;
            self.animation = animation
            // show，设置到指定的高度，实现展开显示
            self.animation.height(cntHeight).step({timingFunction: 'ease'})
            self.setData({
              unfoldAnimationData: animation.export(),
              unfold: unfold
            })
          }
        }
      }).exec()
    }).exec()
  },

  /**
   * 锚点定位到相应字母序号的列表位置
   */
  inToView: function(data) {
    var self = this
    let inToView = ''
    let alphabetKey = this.data.key // 字母序号标记
    console.log('analysisDetail inToView')
    // 遍历列表数组数据
    for (let key in data) {
      // 遍历列表分片对象数据
      for (let k in data[key].data) {
        // 判断是否与上一页入口传入的字母序号标记一致
        if (data[key].data[k].key == alphabetKey) {
          // 赋值对应的锚点（标记 + 发布时间）
          inToView = 'inToView' + data[key].data[k].publish_at
          // 更新页面scroll-view需要滚动到的锚点位置数据
          this.setData({
            inToView: inToView
          })
          return;
        }
      }
    }
  },

  /**
   * wxCharts图表操作，用户点击图表显示数值
   */
  // touchHandler: function (e) {
  //   console.log(e)
  //   console.log(areaChart.getCurrentDataIndex(e));
  //   areaChart.showToolTip(e, {
  //     // background: '#7cb5ec'
  //   });
  // },

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
    // let categories = ["2017-08-27", "2017-08-28", "2017-08-29", "2017-08-30", "2017-08-31", "2017-09-01", "2017-09-02", "2017-09-03", "2017-09-04", "2017-09-05", "2017-09-06", "2017-09-07", "2017-09-08", "2017-09-09", "2017-09-10", "2017-09-11", "2017-09-12", "2017-09-13", "2017-09-14"]
    // let labelIndex = ["2017-08-27", "2017-09-01", "2017-09-06", "2017-09-11", "2017-09-14"]
    // let seriesAll = [3, 12, 1, 1, 0, 0, 2, 0, 12, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    // // let markPoint = {A:["2017-08-09", 60],B:["2017-07-11", 130],C:["2017-07-16", 66],D:["2017-07-21", 970],E:["2017-08-04", 123]}
    // let markPoint = {}
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
    areaChart = new wxCharts({
      canvasId: 'analysisDetailCanvas', //required 微信小程序canvas-id
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
        color: '#d6dbf4',
        stroke: '#d6dbf4',
        pointColor: '#4aabef'
      }],
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
        min: 0, //Y轴起始值
        // max: maxVal + 2, //Y轴终止值
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
        lineStyle: 'curve', //(仅对line, area图表有效) 可选值：curve曲线，straight直线 (default)
      }
    });
  },

  /**
   * 通过 WebSocket 连接发送消息，以获取数据
   */
  getSocketJsonrpcLabelDetail: function () {
    var that = this
    let label = this.data.label
    let source_keyword = app.globalData.keywordRuleVal.source_keyword
    let keyword_rule = app.globalData.keywordRuleVal
    let condition = {"keyword_rule": keyword_rule, "label": label}
    let openid = app.globalData.openid
    // let label = '中国 372 家 网警 账号 入驻'
    // let source_keyword = '百度'
    // let keyword_rule = {"source_keyword":"百度","and_keyword":[],"not_keyword":[]}
    // let condition = {"keyword_rule": keyword_rule, "label": label}
    // let openid = 'owrXu0Pjm42svXnSgfnV_2-q1PUg'
    console.log(openid)
    RequestUtil.call(
      'fi_label_detail', 
      {
        "keyword": source_keyword,
        "condition": condition,
        "document_id": openid
      }, 
      function(res) {
        console.log('getSocketJsonrpcLabelDetail successCb', res)
        that.data.stream_id = res.stream_id
        that.subscribeJsonstream(res.stream_id)
        // if (res) {
        //   self.setData({
        //     analysisData: res
        //   })
        //   // 绘制图表
        //   self.wxCharts()
        // }
        // that.data.stream_id = res.stream_id
        // that.subscribeJsonstream(res.stream_id)
      },
      function(res) {
        console.log('getSocketJsonrpcLabelDetail errorCb', res)
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
        // that.onJsonstreamEnd(end)
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
      if (data_type == 'fi_label_detail_added_chart') {
        let category = data.data.category
        // 设置可滚动视图区域高度
        let windowHeight = app.globalData.systemInfo.windowHeight // 获取可使用窗口高度
        let canvasHeight = 210 // canvas图表高度
        let canvasShowed = true // canvas图表显示开关
        // 只有一个点的时候不绘制图表
        if (category.length < 2) {
          canvasHeight = 0;
          canvasShowed = false;
        }
        let scrollHeight = windowHeight - canvasHeight - 5 // 减去canvas图表高度
        // 设置scroll-view的高度
        this.setData({
          canvasShowed: canvasShowed,
          scrollHeight: scrollHeight
        })
        if (category.length > 1) {
          // 绘制图表
          this.wxCharts(data.data)
        }

      }
      // 判断data_type是否实际数据
      else if (data_type == 'fi_label_detail_added_list') {
        let listData = data.data
        // // json数组数据分类分组处理
        // let map = {} //定义一个对象用于存储不同项分类
        // let dest = [] //定义一个数组用于存储分类分组后的数组
        // // 遍历json数组中每一个对象数据
        // for (let i = 0; i < listData.length; i++) {
        //   let art_i = listData[i];
        //   // 将发布时间中带00:00:00的过滤，只显示到年月日
        //   // art_i.publish_at = art_i.publish_at.replace('00:00:00', '')
        //   // 判断是否为新的分类
        //   if (!map[art_i.publish_at]) {
        //     // 存入新的一类数据
        //     dest.push({
        //       publish_at: art_i.publish_at,
        //       data: [art_i]
        //     });
        //     // 把新的不同分类判断的存入map
        //     map[art_i.publish_at] = art_i;
        //   } else {
        //     // 将相同的存入对应一组分类中
        //     for (let j = 0; j < dest.length; j++) {
        //       let dj = dest[j];
        //       if (dj.publish_at == art_i.publish_at) {
        //         dj.data.push(art_i);
        //         break;
        //       }
        //     }
        //   }
        // }
        // console.log('dest', dest)
        // json数组数据分类分组处理
        // 遍历json数组中每一个对象数据
        for (let i = 0; i < listData.group_list.length; i++) {
          // 截取月份部分，创建月份字段并赋值
          listData.group_list[i].month = listData.group_list[i].date.slice(5, 7);
          // 截取日期部分，创建日期字段并赋值
          listData.group_list[i].day = listData.group_list[i].date.slice(8, 10);
        }
        console.log('listData:', listData)
        // 更新页面列表数据
        this.setData({
          titleSignCount: listData.group_list.length,
          analysisData: listData
        })
        // scroll-into-view锚点到指定位置
        // this.inToView(dest) 
        // 动画
        setTimeout(function() {
          this.titleAnimation()
        }.bind(this), 1000)
      }
    // }
  },

  /**
   * 针对websocket服务端发送消息，Jsonstream的End消息事件处理
   */
  onJsonstreamEnd: function (data) {

  },

  /**
   * 列表标题文字的动画。
   */ 
  titleAnimation: function(){
    console.log('result titleAnimation')
    var self = this
    let windowWidth = this.data.windowWidth
    // 创建按钮部分的动画实例
    var animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'linear',
    })
    // 获取节点的相关信息，需要获取的字段在fields中指定。
    wx.createSelectorQuery().select('#headTitleId').fields({
      size: true // 返回节点尺寸（width height）
    }, function(res){
      // res.width; // 节点的宽度
      self.animation = animation
      // 动画，先右移，然后左移回原位置，重复多次实现效果
      for (var i = 0; i < 100; i++) {
        animation.translateX(-(res.width-windowWidth+36)).step();
        animation.translateX(0).step();
      }
      self.setData({
        titleAnimationData:animation.export()
      })
    }).exec()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('analysisDetail onLoad')
    this.data.label = JSON.parse(decodeURIComponent(options.label))
    this.data.key = JSON.parse(decodeURIComponent(options.key))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('analysisDetail onReady')
    // 设置可滚动视图区域高度
    // let windowHeight = app.globalData.systemInfo.windowHeight
    // let scrollHeight = windowHeight - 210 - 30 // 减去canvas图表高度和列表wrap的padding
    // this.setData({
    //   scrollHeight: scrollHeight
    // })
    // let key = this.data.key
    let searchTitle = app.globalData.searchTitle
    let navTitle = '"' + searchTitle + '"' + '观点分析'
    //动态设置当前页面导航条的标题
    wx.setNavigationBarTitle({
      title: navTitle,
      success: function (res) {
      console.log('success analysisDetail navTitle:', res)
      console.log('analysisDetail navTitle:', navTitle)
      // 修改app全局变量传入为当前页面的标题
      app.globalData.NavigationBarTitle = navTitle;
      // console.log('app.globalData.NavigationBarTitle:', app.globalData.NavigationBarTitle)
      },
      fail: function(err) {
        console.log('fail analysisDetail navTitle:', err)
      }
    })
    // 
    this.getSocketJsonrpcLabelDetail();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('analysisDetail onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('analysisDetail onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('analysisDetail onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('analysisDetail onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('analysisDetail onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  //   console.log('analysisDetail onShareAppMessage')
  // }
})