Page({
  data: {
    markers: [{
      iconPath: "/images/icon/zuobiaosea.png",
      id: 0,
      latitude: 30.480270,
      longitude: 114.421820,
      title:'享七科技,点我查看',
      width: 40,
      height: 40
    }]
  },
  regionchange(e) {
    // console.log(e.type)
  },
  markertap(e) {
    let longitude = 114.421820,latitude= 30.480270
    // console.log(e.markerId)
    let that = this;
    wx.openLocation({
      longitude: longitude,
      latitude: latitude,
      scale: 18,
      name: '享七科技',
      address: '武汉光谷大道总部国际二期时代2栋2101A',
      success: function (res) {
      }
    })
  },
  aboutMe:function(event){
    wx.navigateTo({
      url: 'officialWebsite/officialWebsite',
    })
  },
  controltap(e) {
    console.log(e.controlId)
  }
})