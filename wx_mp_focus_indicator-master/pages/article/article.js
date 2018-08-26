// account.js
var app = getApp()
var wxCharts = require('../../utils/wxcharts-min.js');
// var wxCharts = require('../../utils/wxcharts.js');
var utilMd5 = require("../../utils/md5.js");
var RequestUtil = require("../../utils/RequestUtil.js");
var lineChart = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    resultCanvasShowed: true,
    resultArticleRightShow: true,
    keyword: '',
    keyword_rule: '',
    condition: '',
    title_sign: ''
  },
  /**
   * 用户点击图表显示数值
   */
  touchHandler: function (e) {
    console.log(e)
      console.log(lineChart.getCurrentDataIndex(e));
      lineChart.showToolTip(e, {
          // background: '#7cb5ec'
      });
  },
  /**
   * 图表绘制函数
   */
  wxCharts: function (options) {
    var windowWidth = 320;
    try {
        var res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
    } catch (options) {
        console.error('getSystemInfoSync failed!');
    }
    lineChart = new wxCharts({
        canvasId: 'areaCanvas',
        type: 'area',
        categories: ['2017-1', '2017-2', '2017-3', '2017-4', '2017-5', '2017-6'],
        animation: true,
        background: '#f5f5f5',
        series: [{
            name: '微信',
            data: [15, 2, 45, 37, 4, 8],
            color: '#ff553e',
            format: function (val) {
                return val.toFixed(2) + '条';
            }
        }, {
            name: '今日头条',
            data: [30, 37, 65, 78, 69, 54],
            color: '#ffe63e',
            format: function (val) {
                return val.toFixed(0) + '条';
            }
        }],
        yAxis: {
            title: '报道媒体 (家)',
            format: function (val) {
                return val.toFixed(0);
            },
            min: 0,
            gridColor: '#1788fb'
        },
        width: 320,
        height: 200,
        dataLabel: false,
        dataPointShape: true,
        extra: {
            lineStyle: 'curve'
        }
    });
  },

  /**
   * 通过 WebSocket 获取详情页信息
   */
  getTitleSignJsonrpcDetail: function () {
    var self = this
    let keyword_rule = this.data.keyword_rule
    let title_sign = this.data.title_sign
    let source_keyword = this.data.keyword_rule.source_keyword
    let condition = {"keyword_rule": keyword_rule, "title_sign": title_sign}
    let openid = app.globalData.openid
    RequestUtil.call(
      'media_vane_title_sign_detail', 
      {
        "keyword": source_keyword,
        "condition": condition,
        "document_id": openid
      }, 
      function(result) {
        console.log('successCb media_vane_title_sign_detail', result)
        if (result) {
          let articles = result;
          // articles[0] = {"title_sign_wind": 12,
          // "media_name_sign": "\u7535\u5b50\u4ea7\u54c1\u4e16\u754c",
          // "media_name": "\u7535\u5b50\u4ea7\u54c1\u4e16\u754c",
          // "score": 692,
          // "title": "\u4f59\u627f\u4e1c\u5439\u725b\u9010\u6e10\u6210\u771f,\u534e\u4e3a\u624b\u673a\u4e09\u5b63\u5ea6\u6709\u671b\u8d85\u82f9\u679c\u6210\u5168\u7403\u7b2c\u4e8c",
          // "title_sign": "18308525811439881464",
          // "is_sensitive": false,
          // "abstract": "\u2028",
          // "product_form_id":
          // "search_engine",
          // "url": "http://www.eepw.com.cn/article/201708/362862.htm",
          // "media_wind": 4,
          // "title_sign_score": 809,
          // "media_score": 692,
          // "publish_at": "2017-08-11 08:16:45",
          // "category_id": "baidu",
          // "media_num": 2,
          // "id": "59910023482ff75050b6e290"}

          // 过滤无法解析的unicode编码\u2028、\u2029
          for (let key in result.list) {
            if (result.list[key].abstract) {
              result.list[key].abstract = result.list[key].abstract.replace('\u2028', '')
              result.list[key].abstract = result.list[key].abstract.replace('\u2029', '')
            }
          }
          // 截取时间，只显示到年月日
          for (var i = 0; i < articles.length; i++) {
            let date = articles[i].publish_at.slice(0, 10)
            articles[i].publish_at = date
          }
          try {
            self.setData({
              resultArticleData: articles,
              resultArticleLoadShowed: true
            })
          } catch (error) {
            console.log(error)
            for (let key in result.list) {
              if (result.list[key].abstract) {
                result.list[key].abstract = ''
              }
            }
            self.setData({
              resultArticleData: articles,
              resultArticleLoadShowed: true
            })
          }
        }
        else {
          self.setData({
            resultArticleLoadShowed: true
          })
        }
      },
      function(error) {
        console.log('errorCb media_vane_title_sign_detail', error)
      }
    )
  },

  /**
   * 详情列表项的长按点击事件，复制URL连接至剪贴板
   */
  articleUrlClipTap: function (event) {
    console.log('articleUrlClipTap')
    console.log(event)
    let urlVal = event.currentTarget.dataset.url
    let curTime = new Date().getTime()
    let timestamp = parseInt(curTime/1000); //时间戳
    let signature =  utilMd5.hexMD5(timestamp + '6ae4ba78da'); //MD5
    let url = 'https://wxapp.ibiliang.com/service/yourls-api.php?timestamp=' + timestamp + '&signature=' + signature + '&action=shorturl&format=json&url=' +urlVal
    console.log(url)
    // 网络请求，获取短网址
    wx.request({
      url: url,
      method: 'GET',
      success: function(res) {
        console.log(res)
        if (res.statusCode == 200) {
          console.log('statusCode')
          let shortUrl = res.data.shorturl
          wx.setClipboardData({
            data: shortUrl,
            success: function(res) {
              wx.getClipboardData({
                success: function(res) {
                  console.log(res.data) // data
                }
              })
            }
          })
          wx.showModal({
            title: '原文链接已复制到剪贴板！',
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
        }
        else {

        }
      },
      fail: function (err) {
        console.log('request error: ', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('article onLoad')
    console.log(options)
    var self = this
    this.data.title_sign = options.title_sign
    this.data.keyword_rule = JSON.parse(decodeURIComponent(options.keyword_rule))
    console.log(this.data.keyword_rule)
    // 绘制图表
    // this.wxCharts()    

    // 通过 WebSocket 获取详情页信息
    this.getTitleSignJsonrpcDetail()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    console.log('article onReady')
    let searchTitle = app.globalData.searchTitle
    let navTitle = '"' + searchTitle + '"' + '媒体报道'
    //动态设置当前页面导航条的标题
    wx.setNavigationBarTitle({
      title: navTitle,
      success: function (res) {
      console.log('success article navTitle:', res)
      console.log('article navTitle:', navTitle)
      // 修改app全局变量传入为当前页面的标题
      app.globalData.NavigationBarTitle = navTitle;
      // console.log('app.globalData.NavigationBarTitle:', app.globalData.NavigationBarTitle)
      },
      fail: function(err) {
        console.log('fail article navTitle:', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('article onShow')
    console.log(this.route)
    // 显示当前页面的转发按钮，开启带 shareTicket 的转发
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('article onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('article onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('article onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  console.log('article onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log('article onShareAppMessage')
    let title_sign = this.data.title_sign
    title_sign = title_sign.replace('"', '')
    let keyword_rule = this.data.keyword_rule
    keyword_rule = JSON.stringify(keyword_rule)
    let url = '/pages/article/article?title_sign=' + title_sign + '&keyword_rule=' + keyword_rule;
    let title = '"' + this.data.keyword_rule.source_keyword + '"' + '焦点指数（详情）'
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log('article onShareAppMessage from menu')
      console.log(res.target)
    }
    return {
      title: title,
      path: url,
      success: function(res) {
        // 转发成功
        console.log('success article onShareAppMessage')
        console.log('article onShareAppMessage url:', url)
      },
      fail: function(res) {
        // 转发失败
        console.log('fail article onShareAppMessage')
      }
    }
  }
})