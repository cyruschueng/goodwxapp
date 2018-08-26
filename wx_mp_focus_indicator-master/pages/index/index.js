//index.js
//获取应用实例
var app = getApp()
var RequestUtil = require("../../utils/RequestUtil.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loadingBarSrc: '../../image/logo@2x.png',
    keywordVal: '',
    searchAnimationData: {},
    hotKeywordArray: [],
    globalData: app.globalData.globaldata,
    keyword_rule: '',
    inputValue: ''
  },
  /**
   * PhoneNumber解码，获取用户手机号码
   */
  // getPhoneNumber: function(e) { 
  //   console.log(e.detail.errMsg) 
  //   console.log(e.detail.iv) 
  //   console.log(e.detail.encryptedData)
  //   var self = this
  //   let hostname = app.globalData.hostname
  //   let session_key = app.globalData.session_key
  //   let phoneNumberEncryptedData = e.detail.encryptedData
  //   let phoneNumberIv = e.detail.iv
  //   let url = 'https://' + hostname + '/api/v1/decrypt'
  //   let data = {
  //     app: 'focus-indicator',
  //     session_key: session_key,
  //     encrypted_data: phoneNumberEncryptedData,
  //     iv: phoneNumberIv
  //   }
  //   // 发起网络请求，上传session_key、shareInfoEncryptedData等信息
  //   wx.request({
  //     url: url,
  //     method: 'POST',
  //     data: data,
  //     success: function(res) {
  //       console.log('getPhoneNumber request url:',url)
  //       console.log('getPhoneNumber request data:',data)
  //       console.log('getPhoneNumber解码网络请求成功', res)
  //     }
  //   })
  // },
  /**
   * 底部点击执行指定页面跳转，开发过程测试使用
   */
  articleListTaptest: function () {
    wx.navigateTo({
      // url: '../../pages/article/article?title_sign=17422273544951413325&keyword=三星',
      url: '../../pages/article/article?title_sign=18308525811439881464&keyword=华为',
      success: function() {
      }
    })
  },
  /**
   * 监听页面input输入值
   */
  inputTyping: function(event) {
    console.log(event.detail.value)
    // 更新查询关键词，全局
    app.globalData.keywordVal = event.detail.value
    // 更新查询关键词，当前页面
    this.data.inputValue = event.detail.value
  },
  /**
   * 事件处理函数--点击时获取输入关键词后跳转页面
   */
  startSearchTap: function() {
    console.log('index startSearchTap')
    //判断用户输入是否为空
    if (this.data.inputValue == '') {
      wx.showModal({
        title: '请输入要查询的关键词',
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
      return false;
    }
    //判断用户输入是否为单个字
    if (this.data.inputValue.length == 1) {
      wx.showModal({
        title: '请输入正确长度的关键词',
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
      return false;
    }
    // 检测历史写入storage
    this.setKeywordStorage(app.globalData.keywordVal)
    // 检测历史
    this.getSearchHistoryStorage(app.globalData.keywordVal);
  },
  /**
   * 事件处理函数--点击排行关键词，直接跳转页面
   */
  hotSearchTap: function(e) {
    console.log(e.currentTarget.dataset.index)
    console.log('index hotSearch')
    app.globalData.keywordVal = e.currentTarget.dataset.index
    this.data.inputValue = e.currentTarget.dataset.index
    this.startSearchTap()
  },

  /**
   * 页面切换，用于跳转页面
   */
  navigateToPage: function (url) {
    console.log('index navigateToPage')
    //跳转页面的动画，先上升后淡出
    var animation = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    this.animation = animation
    this.animation.translateY(-200).opacity(0).step()
    this.setData({
      searchAnimationData: this.animation.export()
    })

    //延时后直接跳转至指定页面
    setTimeout(function() {
      var self = this
      wx.navigateTo({
        url: url,
        success: function() {
          console.log('index navigateTo url:', url)
          self.data.keywordVal = ''
          self.setData({
            inputValue: ''
          })
        }
      })
    }.bind(this), 500)
    //跳转页面后的恢复动画
    this.animation.translateY(0).opacity(1).step()
    setTimeout(function() {
      this.setData({
        searchAnimationData: this.animation.export()
      })
    }.bind(this), 800)
  },

  /**
   * 清空搜索历史storage
   */
  clearRecordsTap: function () {
    console.log('index clearRecordsTap')
    let keywordRecords = []
    let self = this
    wx.showModal({
      title: '请确认，是否要清空搜索历史？',
      content: '',
      showCancel: true,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.setStorage({
            key:"keyword",
            data: keywordRecords
          })
          self.setData({
            keywordRecords: []
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * wx.request获取排行关键词
   */
  // keywordRequest: function () {
  //   var self = this
  //   let hostname = app.globalData.hostname
  //   // let url = 'https://wxapp.ibiliang.com/focus-indicator/api/crisis/v1/keyword/rank?num='
  //   let url = 'https://' + hostname + '/focus-indicator/api/crisis/v1/keyword/rank?num='
  //   // 网络请求，获取关键词
  //   wx.request({
  //     url: url,
  //     method: 'GET',
  //     success: function(res) {
  //       console.log(res)
  //       console.log('keywordRequest url:', url)
  //       if (res.statusCode == 200) {
  //         console.log('获取到排行关键词: ' + res.data.keywords)
  //         self.setData({
  //           hotKeywordArray: res.data.keywords
  //         })
  //       }
  //     },
  //     fail: function (err) {
  //       console.log('request error: ', err)
  //     }
  //   })
  // },

  /**
   * 获取查询历史storage
   */
  getKeywordStorage: function() {
    console.log('getKeywordStorage')
    let self = this;
    // 从本地缓存中异步获取指定 key 对应的内容。
    wx.getStorage({
      key: 'keyword',
      success: function(res) {
        console.log('keyword records: ' + res.data)
        // 设置长度限制，清空搜索历史storage
        if (res.data.length > 20) {
          console.log(res.data)
          res.data.pop();
          console.log(res.data)
          wx.setStorage({
            key:"keyword",
            data: res.data
          })
        }
        self.setData({
          keywordRecords: res.data
        })
      },
      complete: function(res) {
        console.log('getStorage complete')
        console.log(res)
      },
      fail: function(res) {
        console.log('getStorage fail')
        console.log(res)
        // 若获取storage失败，执行初始化搜索历史storage
        wx.setStorage({
          key:"keyword",
          data: []
        })
      }
    })
    // 异步获取当前storage的相关信息
    wx.getStorageInfo({
      success: function(res) {
        console.log('当前storage的相关信息,所有的key:')
        console.log(res.keys)
        console.log('当前占用的空间大小: ' + res.currentSize + 'kb')
        console.log('限制的空间大小: ' + res.limitSize + 'kb')
      }
    })
  },

  /**
   * 检测历史storage写入
   */
  setKeywordStorage: function(keyword) {
    console.log('setKeywordStorage')
    let keywordArr;
    // 从本地缓存中异步获取指定 key 对应的内容。
    wx.getStorage({
      key: 'keyword',
      success: function(res) {
        keywordArr = res.data;
        if (keyword != '') {
          keywordArr.unshift(keyword);
          // 对关键词数组元素进行去重
          keywordArr = unique(keywordArr)
          // 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容。
          wx.setStorage({
            key:"keyword",
            data: keywordArr
          })
        }
      } 
    })
    // 使用ES6 部署了 Set 以及 Array.from 方法，进行数组元素的去重
    function unique(a) {
      return Array.from(new Set(a));
    }
  },

  /**
   * 检测历史storage获取
   */
  getSearchHistoryStorage: function(keywordVal) {
    console.log('getSearchHistoryStorage')
    let self = this;
    let currTime = new Date().getTime()
    let searchRecords;
    app.globalData.getStream = true;
    // 从本地缓存中异步获取指定 key 对应的内容。
    wx.getStorage({
      key: 'search_history',
      success: function(res) {
        console.log('search_history records:', res.data)
        console.log('search_history keywordVal:', keywordVal)
        // 设置长度限制，移除搜索历史storage最后一个关键词，遵循先进先出
        if (res.data.length > 20) {
          console.log(res.data)
          res.data.pop();
          console.log(res.data)
          wx.setStorage({
            key:"search_history",
            data: res.data
          })
        }
        searchRecords = res.data;
        for (let key in searchRecords) {
          if (keywordVal == searchRecords[key].data) {
            console.log('searchRecords time:',(currTime - searchRecords[key].time))
            if ((currTime - searchRecords[key].time) < 1800000) {
              app.globalData.getStream = false;
            }
          }
        }
        // 通过WebSocket 连接发送消息，高级搜索
        self.getKeywordsExtraction()
      },
      complete: function(res) {
        console.log('get searchHistoryStorage complete', res)
      },
      fail: function(res) {
        console.log('get searchHistoryStorage fail', res)
        // 若获取storage失败，执行初始化搜索历史storage
        wx.setStorage({
          key:"search_history",
          data: []
        })
      }
    })    
  },

  /**
   * 通过 WebSocket 连接发送消息，高级搜索
   */
  getKeywordsExtraction: function () {
    var self = this
    let keyword = app.globalData.keywordVal
    let openid = app.globalData.openid
    RequestUtil.call(
      'fi_keywords_extraction', 
      {
        "keyword": keyword,
        "document_id": openid
      }, 
      function(result) {
        console.log('successCb fi_keywords_extraction', result)
        app.globalData.searchTitle = result.search_title;
        app.globalData.keywordRuleVal = result.keyword_rule;
        // 通过 WebSocket 连接发送消息，获取进度
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
    let get_stream = app.globalData.getStream
    let source_keyword = app.globalData.keywordRuleVal.source_keyword
    let keyword_rule = app.globalData.keywordRuleVal
    let condition = {"keyword_rule": keyword_rule, "get_stream": get_stream}
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
          if (!get_stream && res.score_validate && res.title_sign_list_validate) {
            console.log('getSocketJsonrpcMessage pages/result/result')
            path = '../../pages/result/result';
            self.navigateToPage(path)
          }
          // 否则getStream为false时直接显示结果列表页面
          else {
            path = '../../pages/progress/progress?stream_id=' + stream_id;
            self.navigateToPage(path)
          }
        }
        else {
          wx.showModal({
            title: '当前服务器忙，请稍后查询',
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
      },
      function(res) {
        console.log('errorCb', res)
      }
    );
  },

  /**
   * 长按点击事件函数，用于显示小程序版本信息
   */
  versionlongtap: function () {
    console.log('index versionlongtap')
    var self = this
    let version = app.globalData.version
    let content = '比量科技“焦点风向标”小程序，当前版本 v' + version
    wx.showModal({
      title: '欢迎使用',
      content: content,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    console.log('index onLoad')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('index onReady')

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('index onShow')
    let self = this
    // 修改app全局变量传入为当前页面的标题
    // app.globalData.NavigationBarTitle = '焦点风向标';

    //动态设置当前页面导航条的标题
    let navTitle = '焦点风向标'
    wx.setNavigationBarTitle({
      title: navTitle,
      success: function (res) {
      console.log('success index navTitle:', res)
      console.log('index navTitle:', navTitle)
      // 修改app全局变量传入为当前页面的标题
      app.globalData.NavigationBarTitle = navTitle;
      // console.log('app.globalData.NavigationBarTitle:', app.globalData.NavigationBarTitle)
      },
      fail: function(err) {
        console.log('fail index navTitle:', err)
      }
    });
    
    // 获取查询历史storage
    this.getKeywordStorage();
    // 用户查询的关键词记录
    wx.getStorage({
      key: 'keyword',
      success: function(res) {
        console.log('keyword records: ', res.data[0])

      }
    })
    // 显示当前页面的转发按钮，开启带 shareTicket 的转发
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('index onHide')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log('index onShareAppMessage')
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log('index onShareAppMessage from menu')
      console.log(res.target)
    }
    return {
      title: '焦点风向标',
      path: '/pages/index/index',
      success: function(res) {
        // 转发成功
        console.log('success index onShareAppMessage')
      },
      fail: function(res) {
        // 转发失败
        console.log('fail index onShareAppMessage')
      }
    }
  }
})