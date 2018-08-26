var app = getApp()
Page({
  data: {
    active: 0,
    region: [],
    add: "选择地址",
    addList: {},
    thirdSession: ''
  },

  onLoad: function () {

    var that = this;

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var subdata = {};
        subdata.latitude = res.latitude;
        subdata.longitude = res.longitude;


        app.commonAjax('cat/baseInfo/selectShopByDistance', [], subdata , function (res) {
          var datalist = res.data.data;
          for (var i in datalist) {
            var newdistance = parseInt((datalist[i].distance / 1000))
            datalist[i].distance = newdistance
          }
          that.setData({
            addList: datalist
          })
        }, app)


      }
    })


  },

  changeAdd: function (e) {
    this.setData({
      active: e.currentTarget.dataset.id
    })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  setAdd: function (e) {

    console.log('this.data')
    console.log(e.currentTarget.dataset)


    app.globalData.bizId = e.currentTarget.dataset.bizid;
    app.globalData.shopId = e.currentTarget.dataset.shopid;
    app.globalData.busname = e.currentTarget.dataset.busname;

    app.globalData.address = e.currentTarget.dataset.address;
    app.globalData.linkphone = e.currentTarget.dataset.linkphone;
    app.globalData.endTime = e.currentTarget.dataset.endTime;
    app.globalData.startTime = e.currentTarget.dataset.starttime;

    console.log(app.globalData)


    

    wx.setStorage({
      key: 'bizId',
      data: e.currentTarget.dataset.bizid,
      success: function () {
        wx.setStorage({
          key: 'shopId',
          data: e.currentTarget.dataset.shopid,
          success: function () {
            wx.setStorage({
              key: 'busname',
              data: e.currentTarget.dataset.busname,
              success: function () {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }
        })
      }
    })




  },


  location: function () {
    var that = this;
    wx.chooseLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)

        that.setData({
          add: res.address
        })

        var subdata = {};
        subdata.latitude = res.latitude;
        subdata.longitude = res.longitude;
        console.log(subdata)

        app.commonAjax('cat/baseInfo/selectShopByDistance', [], subdata, function (res) {
          var datalist = res.data.data;
          for (var i in datalist) {
            var newdistance = parseInt((datalist[i].distance / 1000))
            datalist[i].distance = newdistance
          }
          that.setData({
            addList: datalist
          })
        }, app)

      }
    })
  }

})