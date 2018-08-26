var city = require("../../../utils/city.js")
Page({
  data: {
    list:[],
    province:'',
    city:'',
    area:''
  },
  onLoad: function (options) {
    this.setData({
      list: city.showProvince(),
    });
  },
  choose: function(e){
    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    if(this.data.province == ''){
      this.setData({
        province: e.currentTarget.dataset.name,
        list: city.showCity(e.currentTarget.dataset.name)
      })
    }else if(this.data.city == ''){
      this.setData({
        city: e.currentTarget.dataset.name,
        list: city.showArea(that.data.province,e.currentTarget.dataset.name)
      })
      if (!city.showArea(that.data.province,e.currentTarget.dataset.name)){
        prevPage.setData({
          province: that.data.province+'市',
          area: e.currentTarget.dataset.name
        })
        wx.navigateBack({
          delta:1
        })
      }
    }else{
      this.setData({
        area: e.currentTarget.dataset.name
      })
      prevPage.setData({
        province: that.data.province+'省',
        city: that.data.city,
        area: e.currentTarget.dataset.name
      })
      wx.navigateBack({
        delta: 1
      })
    }
  }
})