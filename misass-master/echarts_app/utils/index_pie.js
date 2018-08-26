let pie = {
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
export default {
  pie: pie
}