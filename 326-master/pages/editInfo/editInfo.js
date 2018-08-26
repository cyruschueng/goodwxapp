var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    action:'',
    arg:'',
    infoPlaceH:'',
    buildData:'',
    inputH:false,
    calenH:false,
    dates0:'',
    time0: '',
    usr:'',
    pid:'',
    errtS:false,
    errMsg:'',
    todaye:''
  },
  //  点击日期组件确定事件  
  bindDateChange0: function (e) {
    this.setData({
      dates0: e.detail.value
    })
  },
  bindDateChange1: function (e) {
    this.setData({
      time0: e.detail.value
    })
  },
  Infoback:function(){
    wx.navigateBack({
      delta:1
    })
  },
  buildInput:function(e){
    var that = this
    if (util.trim(e.detail.value)!=''){
      that.setData({
        buildData: util.trim(e.detail.value) 
      })
    }
  },
  editbuild:function(){
    var that = this
    // 拼接url str
    var arg = that.data.arg
    var action = "&action=editPlant&plantid=" + that.data.pid + "&company-key=bnrl_frRFjEz8Mkn"
    if (arg == 'install') {
      action += "&install="
    } else {
      if (arg == 'sname') {
        action += "&name="
      } else if (arg == 'nominalPower') {
        action += "&nominalPower="
      } else if (arg == 'designCompany') {
        action += "&designCompany="
      } else if (arg == 'country') {
        action += "&address.country="
      } else if (arg == 'province') {
        action += "&address.province="
      } else if (arg == 'city') {
        action += "&address.city="
      } else if (arg == 'unitProfit') {
        action += "&profit.unitProfit="
      } else if (arg == 'coal') {
        action += "&profit.coal="
      } else if (arg == 'co2') {
        action += "&profit.co2="
      } else if (arg == 'so2') {
        action += "&profit.so2="
      }
    }
    // 拼接url end
    if (that.data.buildData == '' && (that.data.arg != 'install')){
      wx.showToast({
        title: '输入不能为空',
        icon: 'loading',
        duration: 1500,
      });
    } else if (that.data.buildData != '' && (that.data.arg != 'install')){
     action += that.data.buildData
    } else if (that.data.arg == 'install'){
      action += that.data.dates0 + ' 00:00:00'
    }
    that.queryEdit(that, action)
  },
  queryEdit: function (that, action){
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    util.http_oper(encodeURI(action), function (err, dat, desc) {
      if (err == 0) {
        wx.hideLoading()
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 1500
        })
        that.setData({
          buildData:''
        })
      } else {
        wx.hideLoading()
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      wx.hideLoading()
      util.netWork(that)
    },function(){
      setTimeout(function(){
        wx.navigateBack({
          delta:1
        })
      },1500)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;
  var arg = options.arg
  var date = new Date();
  var todaye = date.getFullYear() + "-" + util.doubDigit((date.getMonth() + 1)) + "-" + util.doubDigit(date.getDate());
  if (options.action){
    that.setData({
      action: options.action,
    })
  }
  that.setData({
    arg: arg,
    usr: options.usr,
    pid: options.pid,
    todaye: todaye,
  })
  if (arg == 'install'){
    that.setData({
      inputH: false,
      calenH: true,
      dates0: options.install.split(' ')[0],
      time0: options.install.split(' ')[1]
    })
  }else{
    that.setData({
      inputH: true,
      calenH: false,
    })
  }
  if (arg == 'sname') {
    that.setData({
      infoPlaceH:'请输入电站名称'
    })
  } else if (arg == 'nominalPower') {
    that.setData({
      infoPlaceH: '请输入装机容量(kW)'
    })
  } else if (arg == 'designCompany') {
    that.setData({
      infoPlaceH: '请输入安装商'
    })
  } else if (arg == 'country') {
    that.setData({
      infoPlaceH: '请输入国家'
    })
  } else if (arg == 'province') {
    that.setData({
      infoPlaceH: '请输入省份'
    })
  } else if (arg == 'city') {
    that.setData({
      infoPlaceH: '请输入城市'
    })
  } else if (arg == 'unitProfit') {
    that.setData({
      infoPlaceH: '请输入资金收益'
    })
  } else if (arg == 'coal') {
    that.setData({
      infoPlaceH: '请输入节约标准煤'
    })
  } else if (arg == 'co2') {
    that.setData({
      infoPlaceH: '请输入CO2减排(kg)'
    })
  } else if (arg == 'so2') {
    that.setData({
      infoPlaceH: '请输入SO2减排(kg)'
    })
  }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var shareObj = util.shareFunc()
    return shareObj
  }
})