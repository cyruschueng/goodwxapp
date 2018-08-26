const app = getApp()

Page({
  data: {
    timeCode: [
      {
        time: '10:00'
      },
      {
        time: '10:30'
      },
      {
        time: '11:15',
        isFill: true
      },
      {
        time: '11:30'
      },
      {
        time: '11:45'
      },
      {
        time: '12:00'
      },
      {
        time: '13:00',
        active: 'active'
      },
      {
        time: '14:00'
      },
      {
        time: '15:00'
      },
      {
        time: '16:00'
      },
      {
        time: '17:00'
      }
    ]
  },
  onLoad: function (option) {
    wx.setNavigationBarTitle({
      title: '选择时间',
    })
  }
})
