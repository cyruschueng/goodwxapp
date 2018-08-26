var app = getApp()

Page({

  /**
   * 页面的初始数据 
   */
  data: {
    //选项
    A: "",
    B: "",
    C: "",
    D: "",
    testnum: 1,
    description:"",
    result:[],
    screenWidth: '',
    isipx: false
  },
  //页尾跳转
  goAbout: function(){
    wx.navigateTo({
      url: '../about/about',
    })
  },
  //点击选项
  clickA: function () {
    var temp = this.data.result;
    temp.push('A')
    this.setData({
      result: temp
    })
    console.log(this.data.result)
  },
  clickB: function () {
    var temp = this.data.result;
    temp.push('B')
    this.setData({
      result: temp
    })
    console.log(this.data.result)
  },
  clickC: function () {
    var temp = this.data.result;
    temp.push('C')
    this.setData({
      result: temp
    })
    console.log(this.data.result)
  },
  clickD: function () {
    var temp = this.data.result;
    temp.push('D')
    this.setData({
      result: temp
    })
    console.log(this.data.result)
  },
  gonext: function() {
    //完成
    if(this.data.testnum>5){
      var that = this;
      console.log("postid = " + wx.getStorageSync("wx_id"))
      // 获取魅力指数
      wx.request({
        url: 'https://api.gentleleetommy.cn/bestcp/testResult',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data:{
          array: that.data.result,
          wx_id: wx.getStorageSync("wx_id")
        },
        method:'POST',
        success: function (res) {
          wx.setStorageSync('rate', res.data.type)
          wx.setStorageSync('rate-des', res.data.description)
          wx.redirectTo({
            url: '../rate/rate',
          })
        }
      })
      // 获取CP类型
      wx.request({
        url: 'https://api.gentleleetommy.cn/bestcp/cpResult',
        header: {
          'content-type': 'application/json' // 默认值
        },
        method:'POST',
        data:{
          array: that.data.result
        },
        success: function (res) {
          wx.setStorageSync('cptype', res.data[0].id)
          wx.setStorageSync('cp', res.data[0])
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
    else{
      var num = this.data.testnum+1;
      this.setData({
        testnum: num
      })
      this.showing();
    }
  },
  //获取题目数据
  showing: function () {
    var that = this;
    wx.request({
      url: 'https://api.gentleleetommy.cn/bestcp/questions',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var result = res.data['data'][that.data.testnum - 1];

        that.setData({
          description: result['description'],
          A: result['A'],
          B: result['B'],
          C: result['C'],
          D: result['D'],
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mobileModel = wx.getSystemInfoSync().model;
    var dat = mobileModel.substring(0, mobileModel.lastIndexOf("X")) + "X";
    if (dat == "iPhone X")
      this.setData({
        isipx: true
      })
      this.setData({
        screenWidth: wx.getSystemInfoSync().windowWidth
      })
      console.log(this.data.isipx)
     

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
    this.showing();
    
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