/**
 * Created by xiabingwu on 2016/11/21.
 */
import Chart from '../canvas/chart'
export default function (canvasConfig, labels, data) {

  // 自定义数据

  var barChartData = {
    // 横坐标
    labels: labels,
    datasets: [{
      // 标签
      label: 'kWh',
      backgroundColor: '#ef831e',
      borderWidth: 1,
      data: data
    }]
  };
  var chartConfig = {
    type: 'bar',
    data: barChartData,
    options: {
      responsive: false,
      legend: {
        // 标签的位置 
        position: 'bottom',
      },
    }
  };
  return {
    chartConfig: chartConfig,
    canvasConfig: canvasConfig
  }
}