import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
function initChart(canvas, width, height) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });
canvas.setChart(chart);
 let  option = {
    series: [
      {
        name: '访问来源',
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['50%', '70%'],
        hoverAnimation: true,  //是否开启hover 在扇区的放大动画效果
        silent: true,  //不响应和触发鼠标事件,默认为false,即响应和触发鼠标事件
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: function () {
              return '  累计得分\r\n  185 \r\n  奖分:185 \r\n 扣分:0'
            },
            textStyle: {
              fontSize: 20,
              color: '#010101'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        color: ['#70a21a', 'yellow', 'blueviolet'],
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 335, name: '累计积分' }
        ]
      }
   ],
  };
 chart.setOption(option, true);
  return chart;
}
function initOneChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  let option1 = {
    series: [
      {
        name: '访问来源',
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['50%', '70%'],
        hoverAnimation: true,  //是否开启hover 在扇区的放大动画效果
        silent: true,  //不响应和触发鼠标事件,默认为false,即响应和触发鼠标事件
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: function () {
              return '  累计得分\r\n  654 \r\n  奖分:654 \r\n 扣分:11'
            },
            textStyle: {
              fontSize: 20,
              color: '#010101'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        color: ['#70a21a', 'yellow', 'blueviolet'],
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 335, name: '累计积分' }
        ]
      }
    ],
  };
  chart.setOption(option1, true);
  return chart;
}


Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {}
    }
  },
  data: {
    _ifShow:0,
    ec: {
      onInit: initChart
    },
    ec1: {
      onInit: initOneChart
    },
    tabArr:[
      { 'name': '当月排名', 'reward': '9','punish':'185'},
      { 'name': '年度排名', 'reward': '4', 'punish': '2080' },
      { 'name': '总排名', 'reward': '6', 'punish': '5880' }
    ]
  },
  clickTab:function(e){
    const index = e.currentTarget.dataset.index;
    this.setData({
      _ifShow :index
    })
    if (index ==0){
    }
    if (index == 1) {
    }
  },
  onReady() {
  },
  jumpTable:function(){
    wx.navigateTo({
      url: '../table/table',
    })
  },

  other:function(){
    wx.navigateTo({
      url: '../other/other',
    })
  }
});
