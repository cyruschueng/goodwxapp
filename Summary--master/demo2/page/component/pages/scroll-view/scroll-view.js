var order = ['demo1', 'demo2', 'demo3']
Page({
  data: {
    toView: 'green',
    dyncData:{}
  },
plusDyncData(e){
  var filedName = e.currentTarget.dataset.name
  // console.log(fileName)
  var dyncData = this.data.dyncData
  dyncData[filedName] = (dyncData[filedName] || 0)+5
  this.setData({
    dyncData:dyncData
  })
},
  setDyncData(e){
    var filedName = e.currentTarget.dataset.name
    var filedValue = e.currentTarget.dataset.value
    var dyncData = this.data.dyncData
    dyncData[filedName] = filedValue
    this.setData({
      dyncData:dyncData
    })
  },

scrollToSide(e) {
  console.log(e)
  if (e.detail.direction == "top"){
    wx.showToast({
      title: '滚动到达顶部',
    })
  } else if (e.detail.direction == "bottom"){
    wx.showToast({
      title: '滚动到达底部',
    })
  }
},

scroll: function(e) {
  console.log(e)
},
  scrollToTop: function(e) {
    this.setAction({
      scrollTop: 0
    })
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})
