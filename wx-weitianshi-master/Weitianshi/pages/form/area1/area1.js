var app = getApp()
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    province: [],
    city: [],
    provinceNum: 1,
    nonet: true
  },
  onLoad: function (options) {
    // current==0发布融资项目 current==1 维护融资项目 current==2 添加投资案例
    let that = this;
    // 获取数据并标定check
    this._areaDeal();
    app.netWorkChange(that)
  },
  _areaDeal() {
    let that = this;
    let tran_area = wx.getStorageSync('tran_area');
    let provinceNum = this.data.provinceNum;
    let cityNum = this.data.cityNum;
    let province = wx.getStorageSync('area');

    if (tran_area.length != 0) {
      provinceNum = tran_area[0].area_id;
      cityNum = tran_area[1].area_id;
    }

    // 省
    province.forEach(x => {
      if (x.area_id == provinceNum) {
        x.check = true;
      }
    })
    // 市
    wx.request({
      url: app.globalData.url_common + '/api/category/getArea',
      data: {
        pid: provinceNum
      },
      method: 'POST',
      success: function (res) {
        let city = res.data.data;
        city.forEach(x => {
          x.check = false;
          if (x.area_id == cityNum) {
            x.check = true;
          }
        })
        that.setData({
          province: province,
          city: city
        })
      }
    });
  },
  province: function (e) {
    let that = this;
    let index = e.target.dataset.index;
    let id = e.target.dataset.id;
    let province = this.data.province;
    province.forEach(x => {
      x.check = false;
    })
    province[index].check = true;
    this.setData({
      province: province
    })

    wx.request({
      url: app.globalData.url_common + '/api/category/getArea',
      data: {
        pid: id
      },
      method: 'POST',
      success: function (res) {
        let city = res.data.data;
        that.setData({
          city: city,
        })
        let tran_area = wx.getStorageSync('tran_area');
        tran_area[0] = province[index];
        wx.setStorageSync('tran_area', tran_area);
      }
    });
  },
  city: function (e) {
    let that = this;
    let index = e.target.dataset.index;
    let id = e.target.dataset.id;
    let city = this.data.city;
    let cityNum = city[index].area_id;
    let tran_area = wx.getStorageSync('tran_area');
    tran_area[1] = city[index];
    if (!tran_area[0]) {
      tran_area[0] = { area_id: 1, area_title: "北京" }
    }
    wx.setStorageSync('tran_area', tran_area)
    city.forEach((x, idx) => {
      x.check = false;
      if (idx == index) {
        x.check = true;
      }
    })
    that.setData({
      cityNum: cityNum,
      city: city
    });

    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  // 重新加载
  refresh() {
    let timer = '';
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    timer = setTimeout(x => {
      wx.hideLoading();
      this.onShow();
    }, 1500)
  }
});