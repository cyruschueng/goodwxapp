var app = getApp()
Page({
  data: {
    id:1,
    country:'',
    province:'',
    city:'',
    region: [],
    area:'',
    address:'',
  },
  onLoad: function (option) {
    var oarr = [];
    oarr[0] = (option.province);
    oarr[1] = (option.city);
    oarr[2] = (option.area);
    this.setData({
      area: option.area,
      country: option.country,
      province: option.province,
      city: option.city,
      region: oarr,
      id: option.id,
      address: option.address
    })
    this.setData({
      id: app.globalData.memberId
    })
  },


  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  inputaddress:function(e){
    this.setData({
      address: e.detail.value
    })
  },

  //修改资料
  save: function () {
    var that = this;
    var subdata = { };
    
    subdata.id = this.data.id;
    subdata.province = this.data.region[0];
    subdata.city = this.data.region[1];
    subdata.area = this.data.region[2];
    subdata.address = this.data.address;


    app.commonAjax('cat/messagecenter/modifymemberinfo', [], subdata, function (res) {
      if (res.data.code >= 0) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })

        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({
          title: '修改失败',
          image: '/image/i/x.png',
          duration: 2000
        })
      }
    },app)

    
  },
})