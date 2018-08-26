import * as echarts from '../../ec-canvas/echarts';
var util = require('../../utils/util.js');
var app = getApp();
var chart = null;// 柱状图更改
var option = {
  color: ['#6DBA33', '#ED4C3C', '#989898', '#EED200'], 
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  series: [
    {
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      name: '',
      type: 'pie',
      radius: '90%',
      center: ['50%', '50%'],
      data: [
        { value: 0, name: '正常' },
        { value: 0, name: '告警' },
        { value: 0, name: '提醒' },
        { value: 0, name: '离线' }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
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
  /**
   * 页面的初始数据
   */
  data: {
    dougcol: [
      {
        name: '正常', value: 0
      }, {
        name: '告警', value: 0
      }, {
        name: '提醒', value: 0
      }, {
        name: '离线', value: 0
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
    stationBox:{
      more:false,
      list:[],
    },
    admStaBox:[
      {
        pic:'/images/all.png',
        label:'电站总数：',
        valPercent:'0.0%',
        val:'0'
      }, {
        pic: '/images/round3.png',
        label: '正常电站：',
        valPercent: '0.0%',
        val: '0'
      }, {
        pic: '/images/round1.png',
        label: '告警电站：',
        valPercent: '0.0%',
        val: '0'
      }, {
        pic: '/images/round2.png',
        label: '提醒电站：',
        valPercent: '0.0%',
        val: '0'
      }, {
        pic: '/images/round.png',
        label: '离线电站：',
        valPercent: '0.0%',
        val: '0'
      },
    ],
    tapBox: {
      tapTop: {
        topName: '所有电站',
        topPic: '/images/xiala.png',
        width: '0.8rem',
        height: '0.8rem',
        subMenuDisplay: util.initSubMenuDisplay(),
        topSerial: 0
      },
      tapList: [{
        name: '所有电站',
        pic: '/images/all.png'
      }, {
        name: '正常电站',
        pic: '/images/round3.png'
      }, {
        name: '离线电站',
        pic: '/images/round.png'
      }, {
        name: '告警电站',
        pic: '/images/round1.png'
      }, {
        name: '提醒电站',
        pic: '/images/round2.png'
      }]
    },
    tapBox1: {
      tapTop: {
        topName: '按电站名称A-Z',
        topPic: '/images/xiala.png',
        width: '0.8rem',
        height: '0.8rem',
        subMenuDisplay: util.initSubMenuDisplay(),
        topSerial: 1
      },
      tapList: [{
          name: '按电站名称A-Z',
          pic: '/images/shouzimuz.png'
      }, {
          name: '按电站名称Z-A',
          pic: '/images/shouzimu.png'
      }, {
          name: '按创建时间',
          pic: '/images/down.png'
      }, {
          name: '按创建时间',
          pic: '/images/up.png'
      }]
    },
    errBox: {},
    page:0,
    pagesize:10,
    status:'',
    orderBy:'',
    moreIf: false,
    ToNextDelta: false,
  },
  drawBar: function (that, dat) {
    var that = this
    option = {
      color: ['#6DBA33', '#ED4C3C', '#989898', '#EED200'], 
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          name: '',
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
          data: dat,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    if (chart) {
      chart.setOption(option);
    }
  },
  stationTap:function(e){
    var that = this;
    console.log(e)
    var url = "&action=applyBrowsePermission&uid=" + e.currentTarget.dataset.uid
    util.stationTo(that, url, e.currentTarget.dataset.key,'stapage')
  },
  More: function () {// 加载更多
    var that = this;
    that.setData({
      page:that.data.page+1
    })
    that.queryPlantsFunc(that)
  },
  setCurrTapBox: function (indexArr1, currTapBox) {// 更新下拉菜单的数组
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
  tapSubMenu: function (e) {// 下拉菜单
    var that = this;
    that.data.stationBox.list = []
    that.data.stationBox.more = false
    that.setData({
      page: 0,
      stationBox: that.data.stationBox
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
    if (indexArr1 == 0) {  // 状态和排序 
      if (indexArr2 == '0'){
        currTapBox.tapTop.topName = '所有电站'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          status: '',
        })
      } else if (indexArr2 == '1') {
        currTapBox.tapTop.topName = '正常电站'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          status: '0',
        })
      } else if (indexArr2 == '2') {
        currTapBox.tapTop.topName = '离线电站'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          status: '1',
        })
      } else if (indexArr2 == '3') {
        currTapBox.tapTop.topName = '告警电站'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          status: '4',
        })
      } else if (indexArr2 == '4') {
        currTapBox.tapTop.topName = '提醒电站'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          status: '7',
        })
      }
    } else if (indexArr1 == 1) {
      if (indexArr2 == '0') {
        currTapBox.tapTop.topName = '按电站名称A-Z'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          orderBy: 'ascPlantName',
        })
      } else if (indexArr2 == '1') {
        currTapBox.tapTop.topName = '按电站名称Z-A'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          orderBy: 'descPlantName',
        })
      } else if (indexArr2 == '2') {
        currTapBox.tapTop.topName = '按创建时间↓'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          orderBy: 'ascInstall',
        })
      } else if (indexArr2 == '3') {
        currTapBox.tapTop.topName = '按创建时间↑'
        that.setCurrTapBox(indexArr1, currTapBox)
        that.setData({
          orderBy: 'descInstall',
        })
      }
    }
    that.queryPlantsFunc(that)
    initSubMenuHighLight[indexArray[0]][indexArray[1]] = 'highlight';
    that.setData({
      subMenuHighLight: initSubMenuHighLight
    });
  },
  tapMainMenu:function(e){
    util.tapMainMenuFunc(this,e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;
  app.editTabBar3();
  that.webQueryPlantsCountViewFunc(that)//百分比
  },
  // 24.2.22 查询电站数量视图  查询电站数量和状态  百分比
  webQueryPlantsCountViewFunc: function (that) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    var dougcol = that.data.dougcol
    util.http_oper(encodeURI("&action=webQueryPlantsCountView"), function (err, dat, desc) {
      if (err == 0) {
        var admStaBox = that.data.admStaBox
        admStaBox[0].valPercent = parseFloat(dat.total * 100 / dat.total).toFixed(1) + '%'
        admStaBox[0].val = dat.total
        admStaBox[1].valPercent = parseFloat(dat.normalCount * 100 / dat.total).toFixed(1) + '%'
        admStaBox[1].val = dat.normalCount
        admStaBox[2].valPercent = parseFloat(dat.warningCount * 100 / dat.total).toFixed(1) + '%'
        admStaBox[2].val = dat.warningCount
        admStaBox[3].valPercent = parseFloat(dat.attention * 100 / dat.total).toFixed(1) + '%'
        admStaBox[3].val = dat.attention
        admStaBox[4].valPercent = parseFloat(dat.offCount * 100 / dat.total).toFixed(1) + '%'
        admStaBox[4].val = dat.offCount

        dougcol[0].value = dat.normalCount
        dougcol[1].value = dat.attention
        dougcol[2].value = dat.offCount
        dougcol[3].value = dat.warningCount
        that.setData({
          admStaBox: admStaBox,
          dougcol: dougcol
        })
      } else {
        util.errBoxFunc(that,err,desc)
      }
    }, function () {
      util.netWork(that)
      }, function () {
        that.drawBar(that, that.data.dougcol)
        that.queryPlantsFunc(that) // 3.4电站列表
      })
  },
  queryPlantsFunc: function (that) {// 34.2.8查询电站24.2.9
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    var url = "&action=webQueryPlants&page=" + that.data.page + "&pagesize=" + that.data.pagesize
    if (that.data.status!=''){
      url += '&status=' + that.data.status
    }
    if (that.data.orderBy != '') {
      url += '&orderBy=' + that.data.orderBy
    }
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        if (dat.plant.length < 10) {
          that.data.stationBox.more = false
        }else{
          that.data.stationBox.more = true
        }
        that.setData({
          stationBox: that.data.stationBox
        })
        var list = that.data.stationBox.list.concat(dat.plant) //此次遍历的数组
        for (var i = 0; i < list.length;i++){
          list[i].Label1 = '当前功率：'
          list[i].Label2 = '日发电量：'
          list[i].Label3 = '当日收益(￥)：'
          list[i].Label4 = '建站时间：'
          list[i].val1 = util.formatKw(list[i].outputPower, 1, 1).join("")// 当前功率、日发电量、当日收益
          if (list[i].profit && (list[i].profit.unitProfit)){
            list[i].val3 = util.turnVal(parseFloat(list[i].energy) * parseFloat(list[i].profit.unitProfit))
          }else{
            list[i].val3 = '0.0'
          }
          list[i].val2 = util.formatKwh(list[i].energy).join("")
          list[i].val4 = list[i].install.substring(0,10) 
          // 处理图片 
          if (!list[i].picSmall) {// 如果没有picSmall,则赋值picSmall
            list[i].picSmall = '/images/plant_img1.png'
          } else { // 如果有picSmall
            var picUnde = list[i].picSmall.substring(28, list[i].picSmall.length) == 'undefined';
            if(picUnde){
              list[i].picSmall = '/images/plant_img1.png'
            }else{
              list[i].picSmall == list.picSmall 
            }
          }
        }
        that.data.stationBox.list = list
        that.setData({
          stationBox: that.data.stationBox
        })
      } else {
        util.errBoxFunc(that,err,desc)
      }
    }, function () {
      util.netWork(that)
      }, function () {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      })
  },
  //图文插件（封装） 传入（5个）:canvasId、type、横坐标、纵坐标、插件的宽（屏幕宽） str 
  // chartFunc: function (that, dougcol) {
  //   let pageThis = that
  //   app.promise.getDeviceInfo().then(function (deviceInfo) {
  //     let width = 100
  //     let height = 100
  //     let canvasId = 'myCanvas1'
  //     let canvasConfig = {
  //       width: width,
  //       height: height,
  //       id: canvasId
  //     }
  //     let config = getConfig(canvasConfig, dougcol)
  //     chartWrap.bind(pageThis)(config)
  //   });
  // },
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
      // 是否是子页面
      if (stationArr && (stationArr.length != 0)) {
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
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载

    that.data.stationBox.list = []
    that.setData({
      page:0,
      stationBox: that.data.stationBox
    })
     that.webQueryPlantsCountViewFunc(that)//百分比
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