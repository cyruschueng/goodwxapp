Page({
  data: {
    currentSite: "",
    latlng: [],
    resultPosition: [],
    hotcity: [
      { name: '武汉', open: '1' },
      { name: '十堰', open: '1' },
      { name: '北京', open: '0' },
      { name: '上海', open: '0' },
      { name: '广州', open: '0' },
      { name: '深圳', open: '0' },
      { name: '杭州', open: '0' },
      { name: '南京', open: '0' },
      { name: '长沙', open: '0' },
      { name: '成都', open: '0' },
      { name: '烏魯木齊', open: '0' }
    ]
  },
  onShow() {
    this.setData({
      resultPosition: []
    })
  },
  anewPosition() { //重新定位
    this.setData({
      currentSite: ""
    })
    this.getLoaction();
  },
  getLoaction() { //获取当前定位
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        let lat = res.latitude
        let lng = res.longitude
        this.requestCityName(lat, lng)
        that.setData({
          latlng: res
        })
      }
    })
  },
  requestCityName(latitude, longitude) {//获取当前位置
    let that = this;
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + "," + longitude + "&key=4YFBZ-K7JH6-OYOS4-EIJ27-K473E-EUBV7",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        that.setData({
          currentSite: res.data.result.address
        })
      }
    })
  },
  dangqian: function () {  //点击当前位置
    let _data = this.data.latlng
    wx.setStorageSync('lat', _data.latitude)
    wx.setStorageSync('lng', _data.longitude)
    wx.switchTab({  //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
      url: '../../index/index'
    })
  },
  searchAddress(e) {  //输入搜索
    let value = e.detail.value;
    if (!value) {
      wx.showToast({
        title: '请输入地址',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    let that = this;
    wx.request({
      url: 'https://apis.map.qq.com/ws/place/v1/suggestion?keyword=' + value + "&key=4YFBZ-K7JH6-OYOS4-EIJ27-K473E-EUBV7",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        that.setData({
          resultPosition: res.data.data
        })
      }
    })
  },
  selectAddress: function (event) { //选择地点
    const id = event.currentTarget.id;
    const _data = this.data.resultPosition;
    let lat = '', lng = '';
    for (let i = 0; i < _data.length; i++) {
      if (id == _data[i].id) {
        lat = _data[i].location.lat;
        lng = _data[i].location.lng;
      }
    }
    wx.setStorageSync('lat', lat)
    wx.setStorageSync('lng', lng)
    wx.switchTab({  //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
      url: '../../index/index'
    })
  },
  clickcity: function (e) {  //点击某个热门城市
    let that = this
    let ind = e.currentTarget.id
    let _data = this.data.hotcity
    for (let i = 0; i < _data.length; i++) {
      if (ind == i) {
        if (_data[i].open == 1) {
          wx.request({
            url: 'https://apis.map.qq.com/ws/place/v1/suggestion?keyword=' + _data[i].name + "&key=4YFBZ-K7JH6-OYOS4-EIJ27-K473E-EUBV7",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: (res) => {
              that.setData({
                resultPosition: res.data.data
              })
            }
          })
        } else {
          wx.showToast({
            title: _data[i].name + '暂未开通，敬请期待!',
            mask: true,
            icon:'none',
            duration: 2000
          })
        }
      }
    }
  }
})
