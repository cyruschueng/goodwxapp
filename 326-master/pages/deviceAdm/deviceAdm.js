import * as echarts from '../../ec-canvas/echarts';
var util = require('../../utils/util.js');
var app = getApp();
var chart = null;// 柱状图更改
var option = {
  color: ['#6DBA33', '#ED4C3C', '#EED200', '#989898'], 
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '13',
            fontWeight: 'normal'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        { value: 0, name: '正常' },
        { value: 0, name: '故障' },
        { value: 0, name: '告警' },
        { value: 0, name: '离线' }
      ]
    }
  ]
};
function initChart(canvas, width, height) {
  var that = this
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  chart.setOption(option);
  return chart;
}
Page({
  data: {
    ecShow: false,//显示圆环图
    dougcol:[
      {
        value: 0,name: '正常'
      }, {
        value: 0, name: '故障'
      }, {
        value: 0, name: '告警'
      }, {
        value: 0,name: '离线'
      },
    ],
    option: {
      xAxis: {
        data: []
      },
      series: [{
        data: []
      }]
    },
    ec: {
      onInit: initChart
    },
    tapBox: {
      tapTop: {
        topName: '逆变器',
        topPic: '/images/more_unfold.png',
        width: '0.8rem',
        height: '0.8rem',
        subMenuDisplay: util.initSubMenuDisplay(),
        topSerial: 0,//下拉菜单序列号
      },
      tapList: [{
        name: '逆变器',
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
        topName: 'pn',
        topPic: '/images/arror.png',
        width: '0.8rem',
        height: '0.8rem',
        subMenuDisplay: util.initSubMenuDisplay(),
        topSerial: 1,//下拉菜单序列号
      },
      tapList: [{
        name: 'PN',
        pic: '/images/nbqZC.png'
      }, {
          name: '别名/SN',
          pic: '/images/hcyZC.png'
      }]
    },
    tapBox2: {
      tapTop: {
        topName: '全部',
        topPic: '/images/arror.png',
        width: '0.8rem',
        height: '0.8rem',
        subMenuDisplay: util.initSubMenuDisplay(),
        topSerial: 2,//下拉菜单序列号
      },
      tapList: [{
        name: '全部',
        pic: '/images/all.png'
      }, {
        name: '正常',
        pic: '/images/round3.png'
      }, {
          name: '告警',
          pic: '/images/round2.png'
      }, {
          name: '故障',
          pic: '/images/round1.png'
      }, {
          name: '离线',
          pic: '/images/round.png'
      }, {
          name: '待机',
          pic: '/images/round5.png'
      }, {
          name: '错误',
          pic: '/images/round1.png'
      }, {
          name: '协议错误',
          pic: '/images/round1.png'
      }]
    },
    admStaBox: [
       {
        pic: '/images/round3.png',
        label: '正常：',
        valPercent: '0.0%',
        val: '0'
      }, {
        pic: '/images/round2.png',
        label: '告警：',
        valPercent: '0.0%',
        val: '0'
      }, {
        pic: '/images/round1.png',
        label: '故障：',
        valPercent: '0.0%',
        val: '0'
      }, {
        pic: '/images/round.png',
        label: '离线：',
        valPercent: '0.0%',
        val: '0'
      },
    ],
    inputBox: {
      pic:'/images/sousuo.png',
      bgColor: '#B2ACAC',
      color: '#fff',
      Val: '',
      placeHoder: ''
    },
    errBox: {},
    stationAdmH: false,
    // 拼接url
    devtype:200,
    status: '',
    listBox:{
      more:false,
      list: []
    },
    page:0,
    pagesize:10,
    deviInputVal:'',//输入框的值
    pnVal: '1', //选按照pn
    aliasVal: '',//选按照名字
    statusQueryData:[],//拼接2.4.5.6状态的数组
    statusQuery:0,
    ToNextDelta: false,
  },
  drawBar: function (that,dat) {
    var that = this

    option = {
      color: ['#6DBA33', '#EED200', '#ED4C3C', '#989898'], 
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '13',
                fontWeight: 'normal'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: dat
        }
      ]
    };
    if (chart) {
      chart.setOption(option);
    }
  },
  deviListTap: function (e) {
    var that = this;
    var url = "&action=applyBrowsePermission&uid=" + e.currentTarget.dataset.uid
    util.stationTo(that, url, e.currentTarget.dataset.uindex, 'devpage', that.data.listBox.list[e.currentTarget.dataset.uindex])
  },
  // 加载更多
  More: function () {
    var that = this;
    that.setData({
      page: that.data.page + 1
    })
    that.queryDevicesAdm(that)
  },
  // 更新下拉菜单的数组
  setCurrTapBox: function (indexArr1, currTapBox) {
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
  // 下拉菜单
  tapSubMenu: function (e) {
    var that = this;
    that.data.listBox.more = false
    that.setData({
      listBox: that.data.listBox,
      ecShow: false,
      page: 0,
      errBox: {},
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
    if (indexArr1 == '0') {
      currTapBox = that.data.tapBox
    } else if (indexArr1 == '1') {
      currTapBox = that.data.tapBox1
    } if (indexArr1 == '2') {
      currTapBox = that.data.tapBox2
    }
    currTapBox.tapTop.subMenuDisplay = util.initSubMenuDisplay()
    that.setCurrTapBox(indexArr1, currTapBox)
    for (var i = 0; i < initSubMenuHighLight.length; i++) {
      if (indexArray[0] == i) {
        for (var j = 0; j < initSubMenuHighLight[i].length; j++) {
          initSubMenuHighLight[i][j] = '';
        }
      }
    }
    // 设备类型
    if (indexArr1 == '0') {
      that.data.listBox.list = []
      that.setData({
        listBox: that.data.listBox
      })
      if (indexArr2 == '0' ){
        currTapBox.tapTop.topName = '逆变器'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          devtype: '200',
        })
      } else if (indexArr2 == '1') {
        currTapBox.tapTop.topName = '环境监测仪'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          devtype: '768',
        })
      } else if (indexArr2 == '2') {
        currTapBox.tapTop.topName = '智能电表'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          devtype: '1024',
        })
      } else if (indexArr2 == '3') {
        currTapBox.tapTop.topName = '汇流箱'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          devtype: '1280',
        })
      } else if (indexArr2 == '4') {
        currTapBox.tapTop.topName = 'devtype1536'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          devtype: '1536',
        })
      } else if (indexArr2 == '5') {
        currTapBox.tapTop.topName = 'devtype1792'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          devtype: '1792',
        })
      } else if (indexArr2 == '6') {
        currTapBox.tapTop.topName = 'devtype2048'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          devtype: '2048',
        })
      } else if (indexArr3 == '7') {
        currTapBox.tapTop.topName = 'devtype2304'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          devtype: '2304',
        })
      } else if (indexArr3 == '8') {
        currTapBox.tapTop.topName = 'devtype2560'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          devtype: '2560',
        })
      }
      that.queryDevicesAdm(that)
    } else if (indexArr1 == '1'){
      if (indexArr2 == '0') {
        currTapBox.tapTop.topName = 'Pn'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.data.inputBox.Val = ''
        that.setData({
          pnVal: '1',
          aliasVal: '',
          inputBox: that.data.inputBox
        })
      } else if (indexArr2 == '1') {
        currTapBox.tapTop.topName = '别名/SN'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.data.inputBox.Val = ''
        that.setData({
          pnVal: '',
          aliasVal: '1',
          inputBox: that.data.inputBox
        })
      }
    } else if (indexArr1 == '2') {
      that.data.listBox.list = []
      that.setData({
        status: '',
        page: 0,
        listBox: that.data.listBox
      })
      if (indexArr2 == '0') {
        currTapBox.tapTop.topName = '全部'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          status: '',
        })
      } else if (indexArr2 == '1') {
        currTapBox.tapTop.topName = '正常'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          status: '0',
        })
      } else if (indexArr2 == '2') {
        currTapBox.tapTop.topName = '告警'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          status: '4',
        })
      } else if (indexArr2 == '3') {
        currTapBox.tapTop.topName = '故障'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          status: '2',
          statusQuery: 0,
        })
      } else if (indexArr2 == '4') {
        currTapBox.tapTop.topName = '离线'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          status: '1',
        })
      } else if (indexArr2 == '5') {
        currTapBox.tapTop.topName = '待机'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          status: '3',
        })
      } else if (indexArr2 == '6') {
        currTapBox.tapTop.topName = '错误'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          status: '5',
        })
      } else if (indexArr2 == '7') {
        currTapBox.tapTop.topName = '协议错误'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          status: '6',
        })
      }
      that.queryDevicesAdm(that)
    }
    // 状态
    initSubMenuHighLight[indexArray[0]][indexArray[1]] = 'highlight';
    that.setData({
      subMenuHighLight: initSubMenuHighLight
    });
  },
  tapMainMenu: function (e) {
    util.tapMainMenuFunc(this, e)
    // var index = parseInt(e.currentTarget.dataset.index);
    // var newSubMenuDisplay = util.initSubMenuDisplay();
    
    // if (index == 0) {
    //   var currTapBox = that.data.tapBox
    // } else if (index == 1) {
    //   var currTapBox = that.data.tapBox1
    // } else if (index == 2) {
    //   var currTapBox = that.data.tapBox2
    // }

    // if (currTapBox.tapTop.subMenuDisplay[index] == 'hidden') {
    //   newSubMenuDisplay[index] = 'show';
    //   if (index == 0 || (index == 1)){
    //     that.setData({
    //       ecShow: true
    //     })
    //   }
    // } else {
    //   newSubMenuDisplay[index] = 'hidden';
    //   if (index == 0 || (index == 1)) {
    //     that.setData({
    //       ecShow: false
    //     })
    //   }
    // }
    // currTapBox.tapTop.subMenuDisplay = newSubMenuDisplay
    // if (index == 0) {
    //   that.setData({
    //     tapBox: currTapBox,
    //   });
    // } else if (index == 1) {
    //   that.setData({
    //     tapBox1: currTapBox,
    //   });
    // } else if (index == 2) {
    //   that.setData({
    //     tapBox2: currTapBox,
    //   });
    // }
  },
  // 输入框
  inputTap: function (e) {
    var that = this;
    if (e.detail.value != null) {
      that.setData({
        deviInputVal: e.detail.value
      })
    } 
  },
  deviSearch:function(){
    var that = this;
    that.data.listBox.list = []
    that.setData({
      page:[],
      listBox: that.data.listBox
    })
    that.queryDevicesAdm(that)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    app.editTabBar3();
    that.queryDevicesAdm(that)
    that.webQueryWarningDeviceCountViewFunc(that)
  },
  // 24.3.5查询设备数量视图 
  webQueryWarningDeviceCountViewFunc: function (that) {
    var url = "&action=webQueryWarningDeviceCountView" 
    util.http_oper(encodeURI(url), function (err, dat, desc) { 
      if (err == 0) { //正常 告警 故障 离线
        var admStaBox = that.data.admStaBox
        admStaBox[0].valPercent = parseFloat(dat.normalCount * 100 / dat.total).toFixed(1) + '%'
        admStaBox[0].val = dat.normalCount
        admStaBox[1].valPercent = parseFloat(dat.warningCount * 100 / dat.total).toFixed(1) + '%'
        admStaBox[1].val = dat.warningCount
        admStaBox[2].valPercent = parseFloat(dat.faultCount * 100 / dat.total).toFixed(1) + '%'
        admStaBox[2].val = dat.faultCount
        admStaBox[3].valPercent = parseFloat(dat.offCount * 100 / dat.total).toFixed(1) + '%'
        admStaBox[3].val = dat.offCount
        var dougcol = that.data.dougcol
        dougcol[0].value = dat.normalCount
        dougcol[1].value = dat.warningCount
        dougcol[2].value = dat.faultCount
        dougcol[3].value = dat.offCount
          that.setData({
            admStaBox: admStaBox,
            dougcol: dougcol,
          })
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
        util.netWork(that)
      },function () {
        that.drawBar(that, that.data.dougcol)
      })
  },
  //图文插件（封装） 传入（5个）:canvasId、type、横坐标、纵坐标、插件的宽（屏幕宽） str
  // chartFunc: function (that, dougcol) {
  //   let pageThis = that
  //   app.promise.getDeviceInfo().then(function (deviceInfo) {
  //     let width = 100
  //     let height = 100
  //     let canvasId = 'myCanvas2'
  //     let canvasConfig = {
  //       width: width,
  //       height: height,
  //       id: canvasId
  //     }
  //     let config = getConfig(canvasConfig, dougcol)
  //     chartWrap.bind(pageThis)(config)
  //   });
  // },
  // 24.3.1查询设备
  queryDevicesAdm: function (that) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    var url = "&action=webQueryDeviceInfo&page=" + that.data.page + '&pagesize=' + that.data.pagesize
    if (that.data.devtype!=''){
      url += '&devtype=' + that.data.devtype
    } 
    // 输入框的值
    if (that.data.pnVal == '1' && (that.data.deviInputVal != '')) { //未选择默认为pn
      url += '&pn=' + that.data.deviInputVal
    }
    if (that.data.aliasVal == '1' && (that.data.deviInputVal != '')) {
      url += '&search=' + that.data.deviInputVal	
    } 
    if (that.data.status != '') {
      url += '&status=' + that.data.status
    } 
    that.queryDetail(that, url) 
  },
  queryDetail:function(that,url){
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        if (dat.device.length < 10) {
          that.data.listBox.more = false
        } else {
          that.data.listBox.more = true
        }
        that.setData({
          listBox: that.data.listBox
        })
        var listBoxDev = that.data.listBox.list.concat(dat.device)
        var deviceArg = ['0', '1', '2', '3']
        that.setData({
          deviceArg: deviceArg,
        })
        
        for (var i = 0; i < listBoxDev.length;i++){
          listBoxDev[i].Label1 = '所属用户：'
          listBoxDev[i].Label2 = '所属电站：'
          listBoxDev[i].Label3 = '所属采集器：'
          listBoxDev[i].devaddrName = ''
          listBoxDev[i].Value1 = listBoxDev[i].usr
          listBoxDev[i].Value2 = listBoxDev[i].plant
          listBoxDev[i].Value3 = listBoxDev[i].pn
          listBoxDev[i].Value11 = listBoxDev[i].uid
          listBoxDev[i].Value22 = listBoxDev[i].plant
        }
        that.data.listBox.list = listBoxDev
          that.setData({
            listBox: that.data.listBox
          })

      } else {
        that.data.listBox.more = false
        that.setData({
          listBox: that.data.listBox
        })
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
        util.netWork(that)
    }, function(){
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
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
    var that = this;
    if (that.data.ToNextDelta == true) {
      var stationArr = wx.getStorageSync('stationArr')
      if (stationArr && (stationArr.length != 0)) {// 是否是子页面
        stationArr = stationArr.splice(0, stationArr.length - 1)
        wx.setStorageSync('stationArr', stationArr)

        wx.navigateBack({
          delta: 1
        })
      }
    }
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
    var that = this
    wx.showNavigationBarLoading()
    that.data.listBox.list = []
    that.setData({
      page:0,
      listBox: that.data.listBox
    })
    that.queryDevicesAdm(that)
    that.webQueryWarningDeviceCountViewFunc(that)
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