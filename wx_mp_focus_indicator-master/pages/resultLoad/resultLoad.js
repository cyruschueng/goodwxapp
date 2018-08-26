// resultLoad.js
var app = getApp()
var RequestUtil = require("../../utils/RequestUtil.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 页面切换
   */
  redirectToPage: function (url) {
    //直接跳转至指定页面
    var self = this
    wx.redirectTo({
      url: url,
      success: function() {
        console.log('index navigateTo url:', url)
        self.data.keywordVal = ''
        self.setData({
          inputValue: ''
        })
      }
    })
  },

  /**
   * 通过 WebSocket 连接发送消息，高级搜索
   */
  getKeywordsExtraction: function () {
    var self = this
    let keyword = app.globalData.keywordRuleVal.source_keyword
    RequestUtil.call(
      'fi_keywords_extraction', 
      {
        "keyword": keyword
      }, 
      function(result) {
        console.log('successCb fi_keywords_extraction', result)
        app.globalData.searchTitle = result.search_title;
        app.globalData.keywordRuleVal = result.keyword_rule;
        self.getSocketJsonrpcMessage()
      },
      function(error) {
        console.log('errorCb fi_keywords_extraction', error)
      }
    )
  },

  /**
   * 通过 WebSocket 连接发送消息，获取进度
   */
  getSocketJsonrpcMessage: function () {
    var self = this
    // let get_stream = app.globalData.getStream
    let source_keyword = app.globalData.keywordRuleVal.source_keyword
    let keyword_rule = app.globalData.keywordRuleVal
    let condition = {"keyword_rule": keyword_rule, "get_stream": false}
    let openid = app.globalData.openid
    console.log(openid)
    RequestUtil.call(
      'media_vane_scan', 
      {
        "keyword": source_keyword,
        "condition": condition,
        "document_id": openid
      }, 
      function(res) {
        console.log('getSocketJsonrpcMessage successCb', res)
        let stream_id = res.stream_id
        let path = ''
        // 判断start返回值，以判断服务端是否写入数据完成。
        if (res.start) {
          console.log('getSocketJsonrpcMessage start', res.start)
          // getStream为true显示检测页面
          if (res.score_validate && res.title_sign_list_validate) {
            console.log('getSocketJsonrpcMessage pages/result/result')
            path = '../../pages/result/result';
            self.redirectToPage(path)
          }
          // 否则getStream为false时直接显示结果列表页面
          else {
            path = '../../pages/progress/progress?stream_id=' + stream_id;
            self.redirectToPage(path)
          }
        }
        else {
          // 判断start返回值为false时直接跳转到首页
          path = '../../pages/index/index';
          self.redirectToPage(path)
          // wx.showModal({
          //   title: '当前服务器忙，请稍后查询',
          //   content: '',
          //   showCancel: false,
          //   success: function(res) {
          //     if (res.confirm) {
          //       console.log('用户点击确定')
          //     } else if (res.cancel) {
          //       console.log('用户点击取消')
          //     }
          //   }
          // })
        }
      },
      function(res) {
        console.log('errorCb', res)
      }
    );
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('resultLoad onLoad')
    app.globalData.keywordRuleVal = JSON.parse(decodeURIComponent(options.keywordRuleVal));
    // wx.showToast({
    //   title: 'loading',
    //   icon: 'loading',
    //   duration: 200000
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('resultLoad onReady')
    // 进行scan请求，判断跳转的页面
    this.getKeywordsExtraction()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('resultLoad onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('resultLoad onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('resultLoad onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {
  //   console.log('resultLoad onPullDownRefresh')
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   console.log('resultLoad onReachBottom')
  // },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  
  // }
})