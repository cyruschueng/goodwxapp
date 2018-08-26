var util = require('../../utils/util.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {  
    tapBox: {
      tapTop: {
        topName: '逆变器',
        topPic: '/images/unfold.png',
        width: '0.8rem',
        height: '0.8rem',
        subMenuDisplay: initSubMenuDisplay(),
        topSerial: 0,//下拉菜单序列号
      },
      tapList: [{
        name: '逆变器',
        pic: '/images/nbqZC.png'
      }, {
          name: '数采器',
          pic: '/images/nbqZC.png'
      }, {
          name: '环境监测仪',
          pic: '/images/hcyZC.png'
      }, {
          name: '智能电表',
          pic: '/images/db.png'
      }, {
          name: '汇流箱',
          pic: '/images/hlxZC.png'
      }]
    },
    tapBox1: {
      tapTop: {
        topName: '排序',
        topPic: '/images/xiala.png',
        width: '0.8rem',
        height: '0.8rem',
        subMenuDisplay: initSubMenuDisplay(),
        topSerial: 1
      },
      tapList: [{
        name: '首字母A-Z',
        pic: '/images/shouzimuz.png'
      }, {
          name: '首字母Z-A',
          pic: '/images/shouzimu.png'
      }, {
          name: '功率低-高',
          pic: '/images/power02.png'
      }, {
          name: '功率高-低',
          pic: '/images/power01.png'
      }]
    },
    tapBox2: {
      tapTop: {
        topName: '筛选',
        topPic: '/images/xiala.png',
        width: '0.8rem',
        height: '0.8rem',
        subMenuDisplay: initSubMenuDisplay(),
        topSerial: 2
      },
      tapList: [{
        name: '全部',
        pic: '/images/all.png'
      }, {
        name: '正常',
        pic: '/images/round3.png'
      }, {
          name: '离线',
        pic: '/images/round.png'
      }, {
          name: '待机',
          pic: '/images/round5.png'
      }, {
          name: '告警',
          pic: '/images/round2.png'
      }, {
          name: '故障',
        pic: '/images/round1.png'
      }]
    },
    devtypeVal: 200,
    inputDev:true,
    devInputVal:'',
    tapVal01H:true,
    page:0,
    pagesize:10,
    scanVal:'',
    writtH: true,// 添加数采器
    choseWS:false,
    chosews: false,
    CollpN:'',
    Collalias:'',
    pid:'',
    // 下拉菜单
    tapCate:'0',//显示设备：0逆变器1数采器2电表3环测4汇流箱
    listBox: {// 渲染的数组
      more: false,
      type:'inver',
      list: []
    },
    collDev:[],
    powState:'',//设备状态
    sort:'',//排序
    addCollV1: '',// 添加数采器input
    addCollV2:'',
    devName:'',
  },
  pageBack:function(){
    wx.navigateBack({
      delta:1
    })
  },
  // 获取输入设备名字
  devInput: function (e) {
    var that = this
    if (util.trim(e.detail.value) != '') {
      that.setData({
        devName: util.trim(e.detail.value)
      })
    }
  },
  // 搜索设备
  inputdevSearch:function(){
    var that = this;
    that.data.listBox.list = []
    that.data.listBox.more = false
    that.setData({
      listBox: that.data.listBox,
    })
    if (that.data.tapCate == "0") {
        that.queryInver(that)
    } else if (that.data.tapCate == '1') {
        that.queryColl(that)
      } else {
        that.queryEnv(that)
      }
  },
  devSearch:function(){
    var that = this;
    that.setData({
      inputDev: !that.data.inputDev,
      tapVal01H: !that.data.tapVal01H
      })
    if (that.data.inputDev == false){
        that.setData({
          devInputVal: '',
          devName: ''
        })
      }
  },
  // 选择手动添加PN
  writtS:function(){
    var that = this;
    that.setData({
      choseWS:true,
      writtH: false,
      chosews:true,
      addCollV1:'',
      addCollV2:'',
    })
  },
  // 选择扫码添加PN
  scanningS: function (event) {
    var that = this;
    wx.scanCode({
      success: (res) => {

        this.setData({
          scanVal: res.result
        })
        var action = '&action=addCollectorToPlant&plantid=' + that.data.pid + '&alias=' + that.data.scanVal + '&pn=' + that.data.scanVal
        that.addPn(that, action)
      },
      fail:(res)=>{

        wx.showToast({
          title: '扫描失败!',
          icon: 'loading',
          duration: 1500
        })
        that.setData({
          choseWS: false,
          writtH: true,
        })
      },
      complete:function(){

      }
    })
  },

  powerOthCancel:function(){
    var that = this;
    that.setData({
      showaddColl:false,
      showaddColl0:false,
      writtH: true,
      choseWS: false,
    })
  },
  addCollpN: function (e) {
    var that = this
    if (e.detail.value != null) {
      that.setData({
        CollpN: e.detail.value
      })
    } 
  },
  addCollalias: function (e) {
    var that = this
    if (e.detail.value != null) {
      that.setData({
        Collalias: e.detail.value
      })
    }
  },
  // 添加数采器
  powerDrawer:function(e){
    var that = this;
    that.setData({
      showaddColl:true,
      showaddColl0:true,
    })
  },
  // 手动输入PN号后确定
  confiAliadd:function(){
    var that = this
    var action = '&action=addCollectorToPlant&plantid=' + that.data.pid
    // 加别名
    if (that.data.Collalias != '') {
      action += '&alias=' + that.data.Collalias
    }
    // 加pn
    
    if (that.data.CollpN==''){
      wx.showToast({
        title: 'PN号不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else if (that.data.CollpN.length != 14){
      wx.showToast({
        title: 'PN号应为14位',
        icon: 'loading',
        duration: 1500
      })
    }else{
      action += '&pn=' + that.data.CollpN
      // 发请求
      that.addPn(that, action)
    } 
  },
  // 手动输入后输入框满足要求后：发请求
  addPn:function(that,action){
    wx.showLoading({
      title: '加载中',
      // mask: true,
    })
    util.http_oper(encodeURI(action), function (err, dat, desc) {
      wx.hideLoading()
      if (err == 0) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1500
        })
      setTimeout(function(){
        that.setData({
          showaddColl0: false,
        })
        wx.redirectTo({
          url: '/pages/device/device',
        })
      },1500)
      } else {
        util.errBoxFunc(that, err, desc)
        setTimeout(function () {
          that.setData({
            showaddColl: true,
            showaddColl0: true,
            choseWS: false,
            writtH: true,
            choseWS:false,
            chosews:false,
          })
        }, 5000)
      }
    }, function () {
      wx.hideLoading()
      util.netWork(that)
      that.setData({
        showaddColl: true,
        showaddColl0: true,
        choseWS: false,
        writtH: true,
      })
      setTimeout(function () {
        that.setData({
          choseWS: false,
          chosews: false,
        })
      }, 5000)
    })
  },
  // 逆变器跳转inver deviListTap
  deviListTap:function(e){
    var that = this;
    console.log(e)
    var id = e.currentTarget.id;
    var app = getApp();
    app.requestDetailid = id;
    var tyy = that.data.listBox
    var type = e.currentTarget.dataset.type
    if (type == 'inver'){
      wx.setStorageSync('deviIn', 'deviIn')
      wx.navigateTo({
        url: '/pages/inver/inver?inverDevPage=' + JSON.stringify(that.data.listBox.list[id]),
      })
    } else if (type == 'Env') {
      wx.navigateTo({
        url: '/pages/EnvironM/EnvironM?EnvDevP=' + JSON.stringify(that.data.listBox.list[id]),
      })
    } else if (type == 'watt') {
      wx.navigateTo({
        url: '/pages/wattM/wattM?WatDevP=' + JSON.stringify(that.data.listBox.list[id]),
      })
    } else if (type == 'boHox') {
      wx.navigateTo({
        url: '/pages/boHox/boHox?boHDevice=' + JSON.stringify(that.data.listBox.list[id]),
      })
    }
  },
  // 数采器  
  collec: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var app = getApp();
    app.requestDetailid = id;
    wx.navigateTo({
      url: '/pages/collec/collec?collDevPage=' + JSON.stringify(that.data.collDev[id]),
    })
  },
 
  setCurrTapBox: function (indexArr1, currTapBox) { // 更新下拉菜单的数组
    if (indexArr1 == '0') {
      this.setData({
        tapBox: currTapBox,
      });
    } else if (indexArr1 == '1') {
      this.setData({
        tapBox1: currTapBox,
      });
    } if (indexArr1 == '2') {
      this.setData({
        tapBox2: currTapBox,
      });
    }
  },

  tapSubMenu: function (e) {// 下拉菜单str
    var that = this;
    that.data.listBox.list = []
    that.data.listBox.more = false
    that.setData({
      listBox: that.data.listBox, 
      page:0,
      devName: '',
      errBox:{},
      collDev:[]
    })
    var initSubMenuHighLight = [
      ['', '', '', '', ''],
      ['', ''],
      ['', '', '']
    ];
    var indexArray = e.currentTarget.dataset.index.split('-');
    var indexArr1 = indexArray[0]
    var indexArr2 = indexArray[1]
    var currTapBox;
    if (indexArr1 == '0'){
      currTapBox = that.data.tapBox
    } else if (indexArr1 == '1') {
      currTapBox = that.data.tapBox1
    } if (indexArr1 == '2') {
      currTapBox = that.data.tapBox2
    }
    currTapBox.tapTop.subMenuDisplay = initSubMenuDisplay()
    that.setCurrTapBox(indexArr1, currTapBox)
    for (var i = 0; i < initSubMenuHighLight.length; i++) {
      if (indexArray[0] == i) {
        for (var j = 0; j < initSubMenuHighLight[i].length; j++) {
          initSubMenuHighLight[i][j] = '';
        }
      }
    }
    var type = ''
    var listBox = that.data.listBox
    if (indexArr1 == 0 ){
      if (indexArr2 == 0){
        listBox.type = 'inver'
        currTapBox.tapTop.topName = '逆变器'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          tapCate: '0',
          devtypeVal: 200,
          listBox: listBox
        })
        that.queryInver(that)
      } else if (indexArr2 == 1){
        listBox.type = 'coll'
        currTapBox.tapTop.topName = '数采器'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          tapCate: '1',
          inputDev: true,
          listBox: listBox
        })
        that.queryColl(that)
      }else{
        if (indexArr2 == 2) {
          listBox.type = 'Env'
          currTapBox.tapTop.topName = '环境监测仪'
          that.setCurrTapBox(indexArr1, currTapBox)
          that.setData({
            tapCate: '2',
            devtypeVal: 768,
            listBox: listBox
          })
        } else if (indexArr2 == 3){
          listBox.type = 'watt'
          currTapBox.tapTop.topName = '智能电表'
          that.setCurrTapBox(indexArr1, currTapBox)
          that.setData({
            tapCate: '3',
            devtypeVal: 1024,
            listBox: listBox
          })
          that.queryEnv(that)
        } else if (indexArr2 == 4) {
          listBox.type = 'boHox'
          currTapBox.tapTop.topName = '汇流箱'
          that.setCurrTapBox(indexArr1, currTapBox)
          that.setData({
            tapCate: '4',
            devtypeVal: 1280,
            listBox: listBox
          })
        } 
        that.queryEnv(that)
      }
    }
      
    if (indexArr1==2 ){// 设备状态：0正常 1离线 3待机 2456告警
      that.setData({
        tapCate: '0',
      })
      if (indexArr2 == 0){
        currTapBox.tapTop.topName = '全部'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          powState: ''
        })
      } else if (indexArr2 == 1) {
        currTapBox.tapTop.topName = '正常'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          powState: '0'
        })
      } if (indexArr2 == 2) {
        currTapBox.tapTop.topName = '离线'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          powState: '1'
        })
      } if (indexArr2 == 3) {
        currTapBox.tapTop.topName = '待机'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          powState: '3'
        })
      } if (indexArr2 == 4) {
        currTapBox.tapTop.topName = '告警'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          powState: '4'
        })
      } if (indexArr2 == 5) {
        currTapBox.tapTop.topName = '故障'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          powState: '2'
        })
      }
      that.queryInver(that)
    } 
    if (indexArr1 == 1) {
       that.setData({
         tapCate: '0',
       })
       if (indexArr2 == 0){
         currTapBox.tapTop.topName = '首字母A-Z'
         that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          sort: 'sort0'
        })
       } else if (indexArr2 == 1) {
         currTapBox.tapTop.topName = '首字母Z-A'
         that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          sort: 'sort1'
        })
       } else if (indexArr2 == 2) {
         currTapBox.tapTop.topName = '功率低-高'
         that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          sort: 'sort2'
        })
       } else if (indexArr2 == 3) {
         currTapBox.tapTop.topName = '功率高-低'
         that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          sort: 'sort3'
        })
      } 
      that.queryInver(that)
    } 
     
    initSubMenuHighLight[indexArray[0]][indexArray[1]] = 'highlight';
    that.setData({
      subMenuHighLight: initSubMenuHighLight
    });
  },
  tapMainMenu: function (e) {
    var that = this
    var index = parseInt(e.currentTarget.dataset.index);
    var newSubMenuDisplay = initSubMenuDisplay();
    if (index == "0") {
      var currTapBox = that.data.tapBox
    } else if (index == "1"){
      var currTapBox = that.data.tapBox1
    } else if (index == "2"){
      var currTapBox = that.data.tapBox2
    }
    if (currTapBox.tapTop.subMenuDisplay[index] == 'hidden') {
      newSubMenuDisplay[index] = 'show';
    } else {
      newSubMenuDisplay[index] = 'hidden';
    }
    currTapBox.tapTop.subMenuDisplay = newSubMenuDisplay
    if (index == "0") {
      that.setData({
        tapBox: currTapBox,
      });
    } else if (index == "1") {
      that.setData({
        tapBox1: currTapBox,
      });
    } else if (index == "2") {
      that.setData({
        tapBox2: currTapBox,
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;
  app.editTabBar2();
  var pid = wx.getStorageSync('checkPlant').pid
  that.setData({
    pid: pid,
  })
  that.queryInver(that)// 请求逆变器数量
  },
  More: function () {
    var that = this;
    that.setData({
      page: that.data.page + 1
    })
    if (that.data.tapCate == '0'){
      that.queryInver(that)
    } else if (that.data.tapCate == '1') {
      that.queryColl(that)
    } else{
      that.queryEnv(that)
    }
  },
 
  onPullDownRefresh: function () { // 下拉刷新
    var that = this
    wx.showNavigationBarLoading()
    that.data.listBox.list = []
    that.setData({
      listBox: that.data.listBox,
      page:0,
      collDev:[],
    })
    that.queryInver(that)
  },

  queryInver: function (that) {  // 请求逆变器 5.1
    wx.showLoading({
      title: '加载中',
      // mask: true,
    })
    
    var url = "&action=webQueryDeviceEnergy&devtype=200&page=" + that.data.page + '&pagesize=' + that.data.pagesize + "&plantid=" + that.data.pid
    if (that.data.devName != ''){
      url += '&search=' + that.data.devName
    }
    if (that.data.powState != '' ){ 
      url += '&status=' + that.data.powState
    } 
    that.queryDetail(that, url)
  },
  queryDetail: function (that, url){
    util.http_oper(encodeURI(url), function (err, dat, desc) {  //pn
      if (err == 0) {
        if (dat.device.length < 5) {
          that.data.listBox.more = false
        } else {
          that.data.listBox.more = true
        }
        var inverDat = that.data.listBox.list.concat(dat.device)
        
        for (var i = 0, len = inverDat.length; i < len; i++) {
          inverDat[i].energy_total = util.formatKwh(inverDat[i].energyTotal).join('')
          inverDat[i].output_power = util.formatKw(inverDat[i].outpower, 1, 1).join('')
          inverDat[i].energy_today = util.formatKwh(inverDat[i].energyToday).join('')
          inverDat[i].Label1 = "当前功率："
          inverDat[i].Label2 = "日发电量："
          inverDat[i].Label3 = "总发电量："
     
          inverDat[i].Value1 = inverDat[i].output_power
          inverDat[i].Value2 = inverDat[i].energy_today
          inverDat[i].Value3 = inverDat[i].energy_total

          if (i == (len - 1)) {
            if (that.data.sort == '') {
              inverDat = util.getOrder(inverDat, 'alias', 'asc')
            } else if (that.data.sort == 'sort0') {
              inverDat = util.getOrder(inverDat, 'alias', 'asc')
            }
            else if (that.data.sort == 'sort1') {
              inverDat = util.getOrder(inverDat, 'alias', 'desc')
            }
            else if (that.data.sort == 'sort2') {
              inverDat = util.getOrder(inverDat, 'output_power', 'asc')
            } else if (that.data.sort == 'sort3') {
              inverDat = util.getOrder(inverDat, 'output_power', 'desc')
            }
          }
          that.data.listBox.list = inverDat
          that.data.listBox.devaddrName = "地址："
          that.setData({
            listBox: that.data.listBox
          })
        }      
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    }, function () {
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    })
  },
 
  queryColl: function (that) { // 请求数采器 3.8
    wx.showLoading({
      title: '加载中',
      // mask: true,
    })
    
    var url = "&action=queryPlantDeviceStatus&plantid=" + that.data.pid
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        if (dat.collector.length < 5) {
          that.data.listBox.more = false
        } else {
          that.data.listBox.more = true
        }
        dat.collector = that.data.collDev.concat(dat.collector)
       
        for (var index in dat.collector) { // 设备状态4种：0正常 1离线  4告警 （2故障 3待机 5错误 6协议错误 ）
          var norm = [], offline = [], bloc = [], alarm = []
          for (var j = 0; j < dat.collector[index].device.length;j++){ 
            if (dat.collector[index].device[j].status == 0) {
              norm.push(dat.collector[index].device[j])
            } else if (dat.collector[index].device[j].status == 1) {
              offline.push(dat.collector[index].device[j])
            } else if (dat.collector[index].device[j].status == 4) {
              alarm.push(dat.collector[index].device[j])
              } else{
              bloc.push(dat.collector[index].device[j])
              }
          }
          dat.collector[index].normal = norm
          dat.collector[index].offline = offline
          dat.collector[index].bloc = bloc
          dat.collector[index].alarm = alarm
        }
       
        that.setData({ // 设置选择状态切换  
          collDev: dat.collector,
        })
      } else {
        if (err == 258){
          that.queryCollnoDevice(that)
        }else{
          util.errBoxFunc(that, err, desc)
        }
      }
    }, function () {
      util.netWork(that)
    },function(){
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    })
  },
//  数采器无设备时候调用：查询无设备时候的数采器并拼接
  queryCollnoDevice: function (that){
    var url = "&action=webQueryCollectors&plantid=" + that.data.pid + "&page=0" + "&pagesize=" + that.data.pagesize
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        for (var i = 0; i < dat.collector.length;i++){
          dat.collector[i].normal = []
          dat.collector[i].offline = []
          dat.collector[i].device = []
        }
        that.setData({
          collDev: dat.collector
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
  
  queryEnv: function (that) {// 请求环测仪
    wx.showLoading({
      title: '加载中',
      // mask: true,
    })
    // 环测、电表、汇流箱
    var url = "&action=queryDevices&devtype=" + that.data.devtypeVal+"&pagesize=" + that.data.pagesize + "&plantid=" + that.data.pid + "&page=" + that.data.page
    if (that.data.devName != '') {
      url += '&alias=' + that.data.devName
    }
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        if (dat.device.length < 5) {
          that.data.listBox.more = false
        } else {
          that.data.listBox.more = true
        }

        var listDat = that.data.listBox.list.concat(dat.device)
        if (that.data.tapCate == '2' || (that.data.tapCate == '3')) {  // 环测仪、电表
          for (var index in listDat) {
            that.EnvDetail(that, index, listDat)
          }
        } else if (that.data.tapCate == '4'){
         
          that.data.listBox.list = listDat
          that.data.listBox.devaddrName = "地址："
          that.setData({
            listBox: that.data.listBox
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
  EnvDetail: function (that, i, device) {
    var index = i;
    if (that.data.tapCate == '2'){
     
      var parameter = "WIND_SPEED,WIND_DIRECTION,TEMP,RADIATION,BTEMP"
    } else if (that.data.tapCate == '3'){
      
      var parameter = "ACTIVE_ENERGY,REACTIVE_ENERGY,ACTIVE_POWER,REACTIVE_POWER"
    }

    var url = "&action=webQueryDeviceKeyParameter&pn=" + device[index].pn + "&devcode=" + device[index].devcode + "&devaddr=" + device[index].devaddr + "&sn=" + device[index].sn + "&parameter=" + parameter// 24.3.8

    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if(err == 0){
        if (that.data.tapCate == '2') {
          device[index].wind_speed = parseFloat(dat.parameter.wind_speed).toFixed(1)
          device[index].radiation = parseFloat(dat.parameter.radiation).toFixed(1)
          device[index].temp = parseFloat(dat.parameter.temp).toFixed(1)
          device[index].btemp = parseFloat(dat.parameter.btemp).toFixed(1)
          device[index].Label1 = "风速："
          device[index].Label2 = "日照："
          device[index].Label3 = "环境温度："
          device[index].Label4 = "背板温度："

          device[index].Value1 = device[index].wind_speed+"m/s"
          device[index].Value2 = device[index].radiation+"W/m2"
          device[index].Value3 = device[index].temp +"℃"
          device[index].Value4 = device[index].btemp + "℃"
        } else if (that.data.tapCate == '3') {
          device[index].active_power = parseFloat(dat.parameter.active_power).toFixed(1)
          device[index].Label1 = "总有功功率："
          device[index].Value1 = device[index].active_power + "kW"

        }
        that.data.listBox.devaddrName = "地址："
        that.data.listBox.list[index] = device[index]
        that.setData({
          listBox: that.data.listBox,
        })
      }else{
        util.errBoxFunc(that, err, desc)
      }
    },function(){
      util.netWork(that)
    },function(){
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    })
  },
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