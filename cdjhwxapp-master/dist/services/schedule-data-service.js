
export function getLaohuangli () {
  wx.request({
    url: 'http://v.juhe.cn/laohuangli/d', //仅为示例，并非真实的接口地址
    data: {
      date: '2017-11-08',
      key: 'ee3a5c66fd5b36506903aff39d709522'
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data)
    }
  })
}