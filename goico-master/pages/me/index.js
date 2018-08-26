var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages: [
      '"要在别人贪婪的时候恐惧，而在别人恐惧的时候贪婪"',
      '"投资人并不需要做对很多事情，重要的是要能不犯重大的过错"',
      '"架设桥梁时，你坚持载重量为3万磅，但你只准许1万磅的卡车穿梭其间。相同的原则也适用于投资领域"',
      '"逆反行为和从众行为一样愚蠢。我们需要的是思考，而不是投票表决"',
      '"投资者成功与否，是与他是否真正了解这项投资的程度成正比的"',
      '"有时成功的投资需要按兵不动"',
      '"永远不要问理发师你是否需要理发"',
      '"风险来自你不知道自己正在做什么"',
      '"如果我们有坚定的长期投资期望,那么短期的价格波动对我们来说就毫无意义,除非它们能够让我们有机会以更便宜的价格增加股份"',
      '"一个百万富翁破产的最好方法之一就是听小道消息并据此买卖股票"',
      '"因贪婪或受了惊吓的时候，他们时常会以愚蠢的价格买进或卖出股票"',
      '"承认错误是件值得骄傲的事情。我能承认错误，也就会原谅别人犯错。这是我与他人和谐共事的基础。犯错误并没有什么好羞耻的，只有知错不改才是耻辱"',
      '"永远不要孤注一掷"',
      '"金融世界是动荡的、混乱的，无序可循，只有辨明事理，才能无往不利。如果把金融市场的一举一动当作是某个数学公式中的一部分来把握，是不会奏效的。数学不能控制金融市场，而心理因素才是控制市场的关键"',
      '"想赚钱的最好方法，就是将钱投入一家成长中小公司，这家公司近几年内一直都出现盈利，而且将不断地成长"',
      '"试图跟随市场节奏，你会发现自己总是在市场即将反转时退出市场，而在市场升到顶部时介入市场。人们会认为碰到这样的事是因为自己不走运，实际上，这只是因为他们想入非非"',
      '"投资成功的关键之一: 把注意力集中在公司上而不是股票上"',
      '"不在成交量大增之后买进，不在成交量大减之后卖出"',
      '"人不一定要富有，但一定要独立"'
    ],
    showMessage: '',
    userInfo: {},
  },

  getMessage: function () {
    let len = this.data.messages.length
    let index = parseInt(Math.random() * len)

    this.setData({
      showMessage: this.data.messages[index]
    })
  },

  userLogin: function () {
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.showModal({
            title: 'code',
            content: res.code,
            confirmText: '拷贝',
            success: function (result) {
              if (result.confirm) {
                wx.setClipboardData({
                  data: res.code,
                  success: function (res) {
                  }
                })
              } else if (result.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },

  underConstruction: function () {
    wx.showToast({
      title: '由于上线压力太大，此功能还未开发完成，请耐心等待',
      duration: 1500,
      image: '/images/icons/exclamationmark.png',
    })
  },

  switchTrendColor: function (e) {
    let color = 'green'
    if (e.detail.value) {
      color = 'red'
    }

    this.setData({
      riseColor: color
    })
    wx.setStorage({
      key: 'riseColor',
      data: color,
    })
  },

  setFiat: function (e) {
    this.setData({
      defaultFiatIndex: e.detail.value
    })
    wx.setStorage({
      key: 'defaultFiatIndex',
      data: e.detail.value,
    })
  },

  setSymbolCnt: function (e) {
    this.setData({
      symbolCntIndex: e.detail.value
    })
    wx.setStorage({
      key: 'symbolCntIndex',
      data: e.detail.value,
    })
  },

  goSelected: function (e) {
    wx.navigateTo({
      url: '/pages/me/selected',
    })
  },

  addWechat: function (e) {
    wx.navigateTo({
      url: '/pages/me/wechat',
    })
  },

  aboutUs: function (e) {
    wx.navigateTo({
      url: '/pages/me/about',
    })
  },

  loadDefaultSettings: function () {
    let settings = {
      // fiatList: ['人民币', '美元'],
      // defaultFiatIndex: 0,
      // symbolCnt: ['Top 200', 'Top 500'],
      // symbolCntIndex: 0,
      // currencyListCnt: 200,
      riseColor: 'green',
    }
    let res = wx.getStorageInfoSync()

    for (let item in settings) {
      if (res.keys.indexOf(item) > -1) {
        console.log('load value from storage ', item)
        settings[item] = wx.getStorageSync(item)
      }
    }

    console.log(settings)
    return settings
  },

  clearStorage: function () {
    let that = this
    wx.showModal({
      title: '您正在清除缓存',
      content: '清除缓存后，您的自选货币和之前的设置数据都会丢失，需要重新设置',
      confirmText: '清除缓存',
      confirmColor: '#2196F3',
      cancelColor: '#888',
      success: function (result) {
        if (result.confirm) {
          wx.clearStorageSync()
          that.onShow()
        } else if (result.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
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
    this.getMessage()
    let settings = this.loadDefaultSettings()
    this.setData(settings)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})