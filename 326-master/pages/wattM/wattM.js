var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelDat: {
      label: '修改别名',
      mStatus: false,//模态框显示
      modiStatus: false,//修改
      delStatus: false,//删除
      debStatus: false//调试
    },
    tapBox: {
      tapTop: {
        topName: '',
        topPic: '/images/sett.png',
        width: '1.5rem',
        height: '1.5rem',
        subMenuDisplay: initSubMenuDisplay(),
        topSerial: 0
      },
      tapList: [{
        name: '',
        pic: '/images/modify.png'
      }, {
        name: '',
        pic: '/images/delet.png'
      }, {
        name: '',
        pic: '/images/debug.png'
      }]
    },
    WattDetailLis:[],
    WatDevPage:[],
    cdate:'',
    slider: {
      sliderLength: 0,
      sliderVal: 1
    },
    modiAliDat: '',
    cmd:'',
  },
 
  slider: function (e) { // slider的加减
    var that = this;
    var sVal = that.data.slider.sliderVal
    var type = e.currentTarget.dataset.type
    that.setData({
      WattDetailLis:[]
    })
    if (type == 'pre') { 
      if (sVal == 1) {
        return
      } else if (sVal > 1) {
        that.data.slider.sliderVal = sVal - 1
        that.setData({
          slider: that.data.slider
        })
      }
    } else if (type == 'after') {
      if (sVal >= that.data.sliderLength) {
        return
      } else {
        that.data.slider.sliderVal = sVal + 1
        that.setData({
          slider: that.data.slider
        })
      }
    }
    queryWatt(that)
  },
  tapMainMenu: function (e) {
    util.tapMainMenuFunc(this, e)
  },
  tapSubMenu: function (e) {
    util.tapSubMenuFunc(e, this)
  },
  modeCancel: function () {//关闭模态框
    util.modeCancel(this)
  },
  modiAliInput: function (e) {// 改别名输入框input
    if (e.detail.value != null) {
      this.setData({
        modiAliDat: util.trim(e.detail.value)
      })
    }
  },
  modConfi: function () { //操作模态框
    var that = this;
    var modelShow = that.data.modelDat
    if (modelShow.modiStatus == true) {
      util.confiAliFunc(that, that.data.modiAliDat, 'editDeviceInfo', that.data.WatDevPage)
    } else if (modelShow.delStatus == true) {
      util.confiDelFunc(that, 'delDeviceFromPlant', that.data.WatDevPage)
    } else if (modelShow.debStatus == true) {
      if (that.data.cmd == '') {
        wx.showToast({
          title: '指令不能为空',
          icon: 'loading',
          duration: 1500
        })
      } else {
        util.confidebuFunc(that, 'sendCmdToDevice', that.data.WatDevPage, that.data.cmd)
      }
    }
  },
  
  inverbugInput: function (e) {// 获取输入的数据调试指令
    var that = this
    if (e.detail.value != null) {
      that.setData({
        cmd: util.trim(e.detail.value)
      })
    }
  },
  
  listenerSlider: function (e) {// slider滑动触发
    var that = this;
    that.data.slider.sliderVal = e.detail.value
    that.setData({
      slider: that.data.slider
    })
    queryWatt(that)
  },
  do1Day: function (e) {
    var that = this
    var type = e.currentTarget.dataset.type
    var date = ''
      if (type == 'pre') {
        date = util.getYestoday(that.data.cdate)
      } else if (type == 'after') {
        date = util.getNextday(that.data.cdate)
      }
    that.setData({
      cdate: date,
      WattDetailLis: []
    })
    queryWatt(that)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var WatDevPage = JSON.parse(options.WatDevP)

    var title = WatDevPage.alias ? WatDevPage.alias : WatDevPage.pn
    wx.setNavigationBarTitle({ title: title })
    // 日历str
    var date = new Date();
    var currentDat = date.getFullYear() + '-' + util.doubDigit(date.getMonth() + 1) + '-' + util.doubDigit(date.getDate())
    that.setData({
      cdate: currentDat,
      WatDevPage: WatDevPage,
    })
    queryWatt(that, 'fir')
  },
  
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
function queryWatt(that,fir){
  wx.showLoading({
    title: '加载中',
    mask: true,
  })
  var WatDevPage = that.data.WatDevPage
  var url = "&action=queryDeviceDataOneDay&i18n=zh_CN&pn=" + WatDevPage.pn + "&devcode=" + WatDevPage.devcode + "&devaddr=" + WatDevPage.devaddr + "&sn=" + WatDevPage.sn + "&date=" + that.data.cdate
  util.http_oper(encodeURI(url), function (err, dat, desc) {
    if (err == 0) {
      // 设置滑块总长度为请求数组的长度
      that.data.slider.sliderLength = dat.row.length
      that.setData({
        slider: that.data.slider,
      })   
      // 遍历的单位
      var titleCon = [];
      for (var i = 0; i < dat.title.length; i++) {
        if (!dat.title[i].unit) {
          titleCon[i] = dat.title[i].title
        } else {
          titleCon[i] = dat.title[i].title + '(' + dat.title[i].unit + ')'
        }
      }
      // 遍历的值
      var fileTotal = [],valSum=0;
      if (fir == 'fir') {
        var filedArr = dat.row[dat.row.length - 1].field
      } else if (parseFloat(that.data.slider.sliderVal) >= parseFloat(dat.row.length)) {
        var filedArr = dat.row[dat.row.length - 1].field
      } else if (that.data.slider.sliderVal == 0) {
        that.data.slider.sliderVal = 1
        that.setData({
          slider: that.data.slider
        })
        var filedArr = dat.row[that.data.slider.sliderVal-1].field
      } else {
        var filedArr = dat.row[that.data.slider.sliderVal - 1].field
      }

      for (var i = 0; i < titleCon.length; i++) {
        var fileObj = {}
        fileObj['title'] = titleCon[i]
        fileObj['unit'] = filedArr[i]
        valSum += parseFloat(filedArr[i])
        fileTotal[i] = fileObj
      }
      if (valSum == 0){
        var slider = {
          sliderLength: 0,
          sliderVal: 0
        }
        that.setData({
          slider: slider
        })
      }else{
        var fileTotalStr = JSON.stringify(fileTotal)
        var fileTotalpar = JSON.parse(fileTotalStr)
        that.setData({
          WattDetailLis: fileTotalpar
        })
      }
    } else {
      var slider = {
        sliderLength: 0,
        sliderVal: 0
      }
      that.setData({
        slider: slider
      }) 
      util.errBoxFunc(that, err, desc)
    }
  },function(){
    util.netWork(that)
  },function(){
    wx.hideLoading()
  })
}
// 下拉菜单 str
function initSubMenuHighLight() {
  return [
    ['', '', '', '', ''],
    ['', ''],
    ['', '', '']
  ];
}
function initSubMenuDisplay() {
  return ['hidden', 'hidden', 'hidden'];
}
// 下拉菜单 end