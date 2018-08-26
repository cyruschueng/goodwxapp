// progress.js
var app = getApp()
var RequestUtil = require("../../utils/RequestUtil.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    crisisboxAreaShowed: false, //
    scoreboxAreaShowed: false,
    checkboxAreaShowed: false,
    loadingDetailShow: false,
    loadingDecIcoShow: false,
    jsonstreamEnd: false, //进度结束标志，改变border、color样式
    unitShowed: { //显示带单位“万”的分数
      app: false,
      portals: false,
      search_engine: false,
      weixin: false,
      weibo: false,
      bbs: false
    },
    keywordVal: '',
    keyword_rule: '',
    crisisboxAnimationData: {}, //动画对象
    totalCrisisScore: '0', //总分
    productFormNameData: '开始查询',
    productFormIco: { //图标图片
      portals: 'icon_web.svg',
      search_engine: 'icon_search.svg',
      bbs: 'icon_forum.svg',
      app: 'icon_new.svg',
      weixin: 'icon_lock.svg',
      weibo: 'icon_weibo.svg'
    },
    productFormScore: { //分类分数
      app: 0,
      portals: 0,
      search_engine: 0,
      weixin: 0,
      weibo: 0,
      bbs: 0
    },
    stream_id: '', //定义stream_id用于判断websocket中added消息
    stopFlag: true, //定义stopSocketJsonrpc执行标志,正常执行完end不能调用stop
    progressPercent: null, //用于记录进度条百分比
  },

  /**
   * 检测完成页面切换
   */
  navigateToPage: function () {

    setTimeout(function() {
      console.log('navigateToPage 进度页切换')
      var animation = wx.createAnimation({
        duration: 600,
        timingFunction: 'ease',
      })
      this.animation = animation
        // this.animation.scaleY(0).step()
      this.animation.translateY(-600).opacity(0).step()
      this.setData({
        crisisboxAnimationData: this.animation.export(),
        loadingDecIcoShow: true
      })
      //延时后直接跳转至指定页面
      setTimeout(function() {
        console.log('navigateToPage 跳转到结果页')
        // let navTitle = '"' + this.data.keywordVal + '"' + '焦点指数'
        this.setData({
          crisisboxAreaShowed: true
        })
        wx.redirectTo({
          url: '../../pages/result/result',
          success: function() {
            console.log('progress navigateTo result')
          }
        })
        //动态设置当前页面导航条的标题
        // wx.setNavigationBarTitle({
        //   title: navTitle
        // })
      }.bind(this), 800)
    }.bind(this), 1000)
  },

  /**
   * 微博、微信分类图标的点击事件，显示提示信息
   */
  lockTipsTap: function (event) {
    console.log('lockTipsTap')
    wx.showModal({
      title: '该功能尚未开通，敬请期待！',
      content: '',
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * canvas圆环进度条
   * @ param  cavprogressPercent  进度百分比
   */
  canvasArc: function (cavprogressPercent) {
    if (cavprogressPercent <= 0) {
      return
    }
    var cxt_arc_arc = wx.createCanvasContext('canvasArc');
    cxt_arc_arc.setLineWidth(12); 
    cxt_arc_arc.setStrokeStyle('#00e4ff'); 
    cxt_arc_arc.setLineCap('round')
    cxt_arc_arc.beginPath();//开始一个新的路径 
    cxt_arc_arc.arc(116, 116, 100, Math.PI * 1 / 2, Math.PI*(1 / 2 + cavprogressPercent), false); 
    cxt_arc_arc.stroke();//对当前路径进行描边 
    cxt_arc_arc.draw(); 
    // console.log('canvasArc')
  },

  /**
   * canvas圆环进度条背景圆环
   */
  canvasArcBackground: function () {
    var cxt_arc = wx.createCanvasContext('canvasArcBg');//创建并返回绘图上下文context对象。 
    cxt_arc.setLineWidth(12); 
    cxt_arc.setShadow(0, 0, 20, '#0c94ec');
    cxt_arc.setStrokeStyle('#64b4ff'); 
    cxt_arc.setLineCap('round') 
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(116, 116, 100, 0, 2*Math.PI, false);//设置一个原点(116,116)，半径为100的圆的路径到当前路径 
    cxt_arc.stroke();//对当前路径进行描边 
    cxt_arc.draw();
  },

  /**
   * 订阅Jsonstream进度
   */
  subscribeJsonstream: function () {
    var self = this
    let stream_id = this.data.stream_id
    console.log('subscribeJsonstream')
    console.log('subscribeJsonstream stream_id:',stream_id)
    RequestUtil.subscribeJsonStream(
      stream_id,
      function(begin) {
        console.log('begin data', begin);
        self.onJsonstreamBegin(begin)
      },
      function(add) {
        console.log('add data', add);
        self.onJsonstreamAdded(add)
      },
      function(end) {
        console.log('end data', end);
        self.onJsonstreamEnd(end)
      }
    )
  },

  /**
   * 取消订阅Jsonstream进度
   */
  unSubscribeJsonstream: function () {
    var self = this
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
    // this.data.stream_id = data.data.stream_id
    this.setData({
      totalCrisisScore: '0',
      productFormScore: {
        app: 0,
        portals: 0,
        search_engine: 0,
        weixin: 0,
        weibo: 0,
        bbs: 0
      },
    });
    // 初始化圆环进度
    this.canvasArc(0)
  },

  /**
   * 针对websocket服务端发送消息，Jsonstream的Added消息事件处理
   */
  onJsonstreamAdded: function (data) {
    console.log('onJsonstreamAdded')
    let data_type = data.sub.data_type
    // 判断stream_id是否正确，执行总分、分类得分计算，执行进度绘制、进度描述的数据更新
    if (this.data.stream_id == data.data.stream_id) {
      // 判断data_type是否为虚拟数据
      if (data_type == 'fi_scan_added_prepare') {
        let dec = data.data.dec
        let cavprogressPercent = data.data.percent * 2
        console.log('onJsonstreamAdded fi_scan_added_prepare cavprogressPercent:', cavprogressPercent)
        this.data.progressPercent = data.data.percent
        // 更新总分数据、更新查询描述的媒体、查询的剩余时间
        this.setData({
          productFormNameData: dec
        });
        // 绘制圆环进度
        this.canvasArc(cavprogressPercent)
      }
      // 判断data_type是否实际数据
      else if (data_type == 'fi_scan_added_progress') {
        let cavprogressPercent = data.data.percent * 2
        console.log('onJsonstreamAdded fi_scan_added_progress cavprogressPercent:', cavprogressPercent)
        let total_score = data.data.total_score
        let dec = data.data.dec
        let pf_score = data.data.pf_score
        let remaining_time = data.data.remaining_time
        let unit = this.data.unitShowed

        if (total_score > 0) {
          //超过指定位数时，转换为单位显示
          if (total_score > 999999) {
            total_score = String(Math.round(total_score / 10000)) + '万';
          }
          total_score = String(total_score)

          // 遍历分类分数，判断是否为0，更改图标显示
          for (let key in pf_score) {
            if (pf_score[key] > 99999) {
              pf_score[key] = Math.round(pf_score[key] / 10000);
              unit[key] = true;
            }
          }
          // 更新总分数据、更新查询描述的媒体、查询的剩余时间、更新分类分数数据
          this.setData({
            totalCrisisScore: total_score,
            productFormNameData: dec,
            estimateTimeData: '剩余查询时间：' + remaining_time + ' 秒',
            productFormScore: pf_score,
            unitShowed: unit
          });
          // 绘制圆环进度
          this.canvasArc(cavprogressPercent)
        }
      }
    }
  },

  /**
   * 计算分类的总分
   */
  calPfScore: function (_pf_score) {
    // console.log(item_pf_score)
    let s_pf_id = item_pf_score.pf_id;
    let s_pf_score = item_pf_score.pf_score;
    let pf_score = this.data.productFormScore;
    let pf_score_cal= this.data.productFormScoreCal;
    let current_s_pf_score = pf_score_cal[s_pf_id] + s_pf_score;
    pf_score_cal[s_pf_id] = current_s_pf_score;

    // 遍历分类分数，判断是否为0，更改图标显示
    for (let key in pf_score) {
      console.log(pf_score[key])
      if (pf_score[key] > 99999) {
        pf_score[key] = String(Math.round(current_s_pf_score / 10000)) + '万';
        pf_score[key] = Math.round(current_s_pf_score / 10000);
      }
    }
    pf_score[s_pf_id] = String(current_s_pf_score);
    if (isdraw) {
      this.setData({
        productFormScore: pf_score,
        // productFormScoreCal: pf_score_cal
      });
    }
  },

  /**
   * 针对websocket服务端发送消息，Jsonstream的End消息事件处理
   */
  onJsonstreamEnd: function (data) {
    let total_score = data.data.total_score
    let pf_score = data.data.pf_score
    let unit = this.data.unitShowed
    let result_loading_dec = '完成';
    if (this.data.stream_id == data.data.stream_id) {
      // 停止标志，不能发送jsonStop请求
      this.data.stopFlag = false;
      //超过指定位数时，转换为单位显示
      if (total_score > 999999) {
        total_score = String(Math.round(total_score / 10000)) + '万';
      }
      total_score = String(total_score)

      // 遍历分类分数，判断是否为0，更改图标显示
      for (let key in pf_score) {
        if (pf_score[key] > 99999) {
          pf_score[key] = Math.round(pf_score[key] / 10000);
          unit[key] = true;
        }
      }
      // 更新页面数据，查询完成
      this.setData({
        loadingDecIcoShow: true,
        totalCrisisScore: total_score,
        productFormScore: pf_score,
        unitShowed: unit,
        productFormNameData: result_loading_dec,
        estimateTimeData: '',
        jsonstreamEnd: true
      });
      // 闭合圆环进度
      this.canvasArc(2)
      // 检测完成，调用页面切换动画
      this.navigateToPage()
      // 写入查询记录
      this.searchHistorySetStorage()
    }
  },

  /**
   * 检测历史storage写入
   */
  searchHistorySetStorage: function() {
    console.log('searchHistorySetStorage')
    var curTime = new Date().getTime();
    var keyword = app.globalData.keywordVal
    let searchTitle = app.globalData.searchTitle
    let keywordSearch = {
      data: searchTitle,
      time: curTime
    }
    // 从本地缓存中异步获取指定 key 对应的内容。
    wx.getStorage({
      key: 'search_history',
      success: function(res) {
        let keywordArr = res.data;
        if (searchTitle != '') {
          let repeat = false;
          // 对关键词数组元素进行去重
          for ( let key in keywordArr) {
            if (keywordArr[key].data == searchTitle) {
              repeat = true;
              keywordArr.splice(key, 1, keywordSearch)
            }
          }
          if (!repeat) {
            keywordArr.unshift(keywordSearch);
          }
          console.log('search_history records: ',keywordArr)
          // 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容。
          wx.setStorage({
            key:"search_history",
            data: keywordArr
          })
        }
      } 
    })
  },

  /**
   * 通过 WebSocket 连接发送消息，停止该关键词查询消息推送
   */
  stopSocketJsonrpc: function () {
    console.log('stopSocketJsonrpc')
    var self = this
    let source_keyword = app.globalData.keywordRuleVal.source_keyword
    let keyword_rule = app.globalData.keywordRuleVal
    let stream_id = this.data.stream_id
    let condition = {"keyword_rule": keyword_rule, 'stream_id': stream_id}
    let openid = app.globalData.openid
    // 初始化stream_id的值
    this.data.stream_id = 0;
    // 初始化圆环进度
    this.canvasArc(0);
    RequestUtil.call(
      'media_vane_stop', 
      {
        "keyword": source_keyword,
        "condition": condition,
        "document_id": openid
      }, 
      function(result) {
        console.log('successCb media_vane_stop', result)
      },
      function(error) {
        console.log('errorCb media_vane_stop', error)
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('progerss onLoad')
    this.data.stream_id = options.stream_id
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('progerss onReady')
    // 绘制canvas圆环进度条背景圆环
    this.canvasArcBackground()
    let searchTitle = app.globalData.searchTitle
    let navTitle = '"' + searchTitle + '"' + '焦点指数'
    //动态设置当前页面导航条的标题
    wx.setNavigationBarTitle({
      title: navTitle,
      success: function (res) {
      console.log('success progerss navTitle:', res)
      console.log('progerss navTitle:', navTitle)
      // 修改app全局变量传入为当前页面的标题
      app.globalData.NavigationBarTitle = navTitle;
      // console.log('app.globalData.NavigationBarTitle:', app.globalData.NavigationBarTitle)
      },
      fail: function(err) {
        console.log('fail progerss navTitle:', err)
      }
    })
    // 通过 WebSocket 连接发送消息，获取进度
    // this.getSocketJsonrpcMessage()
    this.subscribeJsonstream()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('progerss onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('progerss onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('progerss onUnload')
    // 取消订阅数据
    this.unSubscribeJsonstream()
    // 初始化stream_id的值
    // this.data.stream_id = 0;
    // 发送WebSocket的stop消息，以停止检测
    if (this.data.stopFlag) {
      this.stopSocketJsonrpc()
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('progerss onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('progerss onReachBottom')
  }
})