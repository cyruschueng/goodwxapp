/**
 * Created by xiabingwu on 2016/11/21.
 */
export default function (canvasConfig, labels, data) {
  var chartConfig = {
    type: 'line',
    data: {
      labels: labels,
      options: {
        responsive: false,
        legend: {
          // 标签的位置 
          position: 'bottom',
        },
      },
      datasets: [{
        label: '',
        // 背景色
        backgroundColor: "#ef831e",
        borderColor: "#ef831e",
        // 点标记的颜色
        pointBackgroundColor: '#ef831e',
        pointHitRadius: 0.1,
        borderWidth: 0.1, //曲线的宽度
        data: data
      }]
    },
    options: {
      legend: {
        displayFixed: false
      },
      layout: {
        padding: {
          right: 20//如果x轴最后一个坐标数字被部分隐藏的话 请把这个值调大
        }
      },
      scaleBeginAtZero: true,
      responsive: false,//自适应设置为false
      title: {
        display: false,
        text: ''
      },
      tooltips: {
        displayColors: true,//不显示小方框
        mode: 'x',
        callbacks: {
          title: function (tooltipItem) {
            return tooltipItem[0].xLabel+' kWh: '+tooltipItem[0].yLabel;
            // return  tooltipItem[0].yLabel;
          },
          label: function (tooltipItem) {
            return '';
          }
        }
      },
      scales: {
        xAxes: [{
          display: true,  // 是否显示x轴上的值
          gridLines: {
            //display:false,
            //hideX:true,//这是自定义参数 业务需要添加隐藏X轴
          },
          scaleLabel: {
            display: false,
            labelString: ''
          },
          ticks: {
            maxTicksLimit: 7, //x轴显示的坐标数量
            fontColor: '#9E9E9E',
            //beginAtZero:true
          }
        }],
        yAxes: [{
          display: true,
          gridLines: {
          },
          ticks: {
            maxTicksLimit: 5,//横着的分割线数量
            fontColor: '#9E9E9E', //y轴坐标颜色
            beginAtZero: true
          },
          scaleLabel: {
            display: false,
            labelString: ''
          }
        }]
      }
    }
  }
  return {
    chartConfig: chartConfig,
    canvasConfig: canvasConfig
  }
}