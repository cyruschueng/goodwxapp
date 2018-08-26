var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
    pagesize:50,
    inverDev:[],
    CollectorInfo:[],
    // 率属电站
    webQueryPlants:[],
    // 连接设备
    collDevPage:[],
    coH:false,
    colH:true,
    tabBox: {
      label1: '参数',
      label2: '连接设备',
      tabArr1: {
        curHdIndex: 0,
        curBdIndex: 0
      },
    }, 
    gprsAdate:'',
    subMenuDisplay: initSubMenuDisplay(),
    dvaddrInput:'',
    cmd:'',
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
  modConfi: function () { //操作模态框
    var that = this;
    var modelShow = that.data.modelDat
    if (modelShow.modiStatus == true) {
      util.confiAliFunc(that, that.data.modiAliDat, 'editCollector', that.data.CollectorInfo)
    } else if (modelShow.delStatus == true) {
      util.confiDelFunc(that, 'delCollectorFromPlant', that.data.CollectorInfo)
    } else if (modelShow.debStatus == true) {
      if (that.data.dvaddrInput == '') {
        wx.showToast({
          title: '地址不能为空',
          icon: 'loading',
          duration: 1500
        })
      } else if (that.data.cmd == '') {
        wx.showToast({
          title: '指令不能为空',
          icon: 'loading',
          duration: 1500
        })
      }
      if (that.data.cmd != '' && (that.data.dvaddrInput != '')) {
        util.confidebuFunc(that, 'sendCmdToDevice', that.data.CollectorInfo, that.data.cmd, that.data.dvaddrInput)
      }
    }
  },
  // 
  modiAliInput: function (e) {// 改别名输入框input
    if (e.detail.value != null) {
      this.setData({
        modiAliDat: util.trim(e.detail.value)
      })
    }
  },
  devaddrInput: function (e) {  // 改别名的下拉菜单设置 end// 获取输入的设备地址
    var that = this
    if (e.detail.value != null) {
      that.setData({
        dvaddrInput: util.trim(e.detail.value)
      })
    }
  },
  inverbugInput: function (e) { // 获取输入的数据调试指令
    var that = this
    if (e.detail.value != null) {
      that.setData({
        cmd: util.trim(e.detail.value)
      })
    }
  },

  // 跳转到逆变器列表
  collToinver: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var app = getApp();
    app.requestDetailid = id;
    that.data.collDevPage.device[id].pn = that.data.collDevPage.pn
    that.data.collDevPage.device[id].alias = that.data.collDevPage.alias
    var devcode = that.data.collDevPage.device[id].devcode
    var DevPage = JSON.stringify(that.data.collDevPage.device[id])
    if (devcode < 768) { //逆变器
      wx.redirectTo({
        url: '/pages/inver/inver?inverDevPage=' + DevPage,
      })
    } else if (devcode < 1024 && (devcode >= 768)) {// 检测仪 
      wx.redirectTo({
        url: '/pages/EnvironM/EnvironM?EnvDevP=' + DevPage,
      })
    } else if (devcode < 1280 && (devcode >= 1024)) {// 电表
      wx.redirectTo({
        url: '/pages/wattM/wattM?WatDevP=' + DevPage,
      })
    } else if (devcode < 1536 && (devcode >= 1280)) {// 汇流箱
      wx.redirectTo({
        url: '/pages/boHox/boHox?boHDevice=' + DevPage,
      })
    }
  },
  tabFunc: function (e) {
    util.tabFun(e, this)
    var that = this;
    if (e.target.dataset.id == '0'){
      that.setData({
        coH: false,
        colH: true
      })
    } else if (e.target.dataset.id == '1'){
      that.setData({
        coH: true,
        colH: false
      })
      for (var index in that.data.collDevPage.device) {
        if (that.data.collDevPage.device[index].devcode <= 1280 || (that.data.collDevPage.device[index].devcode >1536)){
          that.inverterDetail(that, index)
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // collDevPage：选择的数采器信息pn 及其他
  onLoad: function (options) {
    var that = this;
    var collDevPage = JSON.parse(options.collDevPage)
    var webQueryPlants = wx.getStorageSync('checkPlant')
    var title = collDevPage.alias ? collDevPage.alias : collDevPage.pn
    wx.setNavigationBarTitle({ title: title })
    // 数采器参数
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    that.setData({
      collDevPage:collDevPage,
    })
    util.http_oper(encodeURI("&action=webQueryCollectorInfo" + "&pn=" + collDevPage.pn), function (err, dat, desc) {
      if (err == 0) {
        that.setData({
          CollectorInfo: dat.collector[0],
          webQueryPlants: webQueryPlants,
        })
        if (dat.collector[0].gprsAdate){
          that.setData({
            gprsAdate: dat.collector[0].gprsAdate.substring(0, 10),
          })
        }else{
          that.setData({
            gprsAdate: '',
          })
        }
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () { 
      util.netWork(that)
    },function(){
      wx.hideLoading()
    })
  },
  inverterDetail: function (that, i) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    var j = i;
    
    var collDevPage = that.data.collDevPage
    var pn = collDevPage.pn;
    var devcode = collDevPage.device[j].devcode;
    var devaddr = collDevPage.device[j].devaddr;
    var sn = collDevPage.device[j].sn;
    var parameter = '';
    var action = '';
    if (devcode<768){ //逆变器
      // parameter = "OUTPUT_POWER,ENERGY_TODAY,ENERGY_TOTAL"
      action = 'queryDeviceEnergyQuintetOneDay'
    } else if (devcode < 1024 && (devcode >= 768)) {// 检测仪 
      parameter = "WIND_SPEED,RADIATION,TEMP,BTEMP"
      action = 'webQueryDeviceKeyParameter' + "&parameter=" + parameter 
    } else if (devcode < 1024 && (devcode >= 768)) {// 电表
      parameter = "ACTIVE_POWER"
      action = 'webQueryDeviceKeyParameter' + "&parameter=" + parameter 
    } 
    //24.3.8
    var url = "&action="+ action +"&pn=" + pn + "&devcode=" + devcode + "&devaddr=" + devaddr + "&sn=" + sn 
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        if (devcode < 768) {
          // 逆变器
          collDevPage.device[j].pn = collDevPage.pn;
          collDevPage.device[j].energy_total = util.formatKwh(dat.energyTotal).join('')
          collDevPage.device[j].output_power = util.formatKw(dat.outputPower,1,1).join('')
          collDevPage.device[j].energy_today = util.formatKwh(dat.energyToday).join('')
        } else if (devcode < 1024 && (devcode >= 768)) {
          // 环境检测仪
          collDevPage.device[j].wind_speed = parseFloat(dat.parameter.wind_speed).toFixed(1)
          collDevPage.device[j].radiation = parseFloat(dat.parameter.radiation).toFixed(1)
          collDevPage.device[j].temp = parseFloat(dat.parameter.temp).toFixed(1)
          collDevPage.device[j].btemp = parseFloat(dat.parameter.btemp).toFixed(1)
        } else if (devcode < 1024 && (devcode >= 768)) {
          // 电表
          collDevPage.device[j].active_power = parseFloat(dat.parameter.active_power).toFixed(1)
        } 
        that.setData({
          collDevPage: collDevPage,
        })
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      
      util.netWork(that)
    }, function () {
      wx.hideLoading()
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var shareObj = util.shareFunc()
    return shareObj
  }
})

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