var app = getApp()
Page({
  data: {
    id: '',
    country: '',
    province: '广东省', //省份
    city: '深圳市',//城市
    region: [],
    area: '福田区',//区县
    is_default:0, //是否默认
    username:'', //用户名
    phone:'', // 电话
    address:'', //详细地址
    items: [
      { name: '11', value: '是否选为默认地址' }
    ]

  },
  onLoad: function (option) {

    wx.setNavigationBarTitle({
      title: '地址管理'
    })

    console.log(option.id)

    if(option.id){
      this.getadd(option.id)
    }
    this.setData({
      id:option.id
    })

    var oarr = [];
    oarr[0] = this.data.province;
    oarr[1] = this.data.city;
    oarr[2] = this.data.area;
    this.setData({
      region: oarr
    })
  },

  //根据id获取地址详情

  getadd(id){

    var subdata= {},that = this;
    subdata.id = id;

    app.commonAjax('/miniapp/cat/takeout/getAddress', [], subdata,  (res) => {

      var oitems = that.data.items;

      if (res.data.data.isDefault){
        oitems[0].checked = 'true'
        that.setData({
          is_default: '11'
        })
      }

      // subdata.id = this.data.id;
      // subdata.name = this.data.username;
      // subdata.phone = this.data.phone;
      // subdata.address = this.data.chooseLocation.address;
      // subdata.addrDetail = this.data.addrDetail;
      // subdata.lng = this.data.chooseLocation.longitude;
      // subdata.lat = this.data.chooseLocation.latitude;

      var reschooseLocation = {}
      reschooseLocation.longitude = res.data.data.lng
      reschooseLocation.latitude = res.data.data.lat
      reschooseLocation.address = res.data.data.address

      that.setData({
        isDefault: res.data.data.isDefault,
        chooseLocation: reschooseLocation,
        phone: res.data.data.phone,
        username: res.data.data.name,
        id: res.data.data.id,
        addrDetail: res.data.data.addrDetail,
        city: res.data.data.city
      })


    }, app.globalData, 'post')

  },


  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  inputaddress: function (e) {
    this.setData({
      addrDetail: e.detail.value
    })
  },

  inputusername: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  inputphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  checkboxChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      is_default: e.detail.value
    })
  },

  //地图选地址

  location: function () {
    var that = this;
    wx.chooseLocation({
      type: 'wgs84',
      success: function (res) {

        console.log(res)

        var p = res.address.split('省')[0] + '省'

        // console.log((res.address.split('市')[0] + '市').replace(p,''))

        that.setData({
          city: (res.address.split('市')[0] + '市').replace(p, ''),
          chooseLocation: res
        })

      }
    })
  },

  //修改地址

  edit(){
    var that = this;


    if (this.data.username.length == 0) {
      wx.showToast({
        title: '请输入联系人！',
        icon: 'loading',
        image: '/image/i/x.png',
        duration: 1000
      })
    } else if (!(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.data.phone))) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'loading',
        image: '/image/i/x.png',
        duration: 1000
      })
    } else if (!this.data.addrDetail) {
      wx.showToast({
        title: '请输入详细地址！',
        icon: 'loading',
        image: '/image/i/x.png',
        duration: 1000
      })
    } else if (!this.data.chooseLocation) {
      wx.showToast({
        title: '请输入地址！',
        icon: 'loading',
        image: '/image/i/x.png',
        duration: 1000
      })
    } else {
      var subdata = {}

      subdata.id = this.data.id;
      subdata.name = this.data.username;
      subdata.phone = this.data.phone;
      subdata.address = this.data.chooseLocation.address;
      subdata.addrDetail = this.data.addrDetail;
      subdata.lng = this.data.chooseLocation.longitude;
      subdata.lat = this.data.chooseLocation.latitude;
      subdata.city = this.data.city;
      subdata.isDefault = this.data.isDefault

      app.commonAjax('/miniapp/cat/takeout/updateAddress', ['bizId', 'memberId'], subdata,  (res)=> {

        if(res.data.code == 0){

          wx.showToast({
            title: '修改成功',
            icon:'success',
            success:()=>{
              setTimeout(()=>{
                wx.navigateBack({
                  delta: 1
                })
              },1000)
            }
          })
          
        }

        

      }, app.globalData, 'post')
    }
  },



  //新增地址资料
  save: function () {
    var that = this;
    

    if (this.data.username.length ==0){
      wx.showToast({
        title: '请输入联系人！',
        icon: 'loading',
        image: '/image/i/x.png',
        duration: 1000
      })
    } else if (!(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.data.phone))) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'loading',
        image: '/image/i/x.png',
        duration: 1000
      })
    } else if (!this.data.addrDetail) {
      wx.showToast({
        title: '请输入详细地址！',
        icon: 'loading',
        image: '/image/i/x.png',
        duration: 1000
      })
    } else if (!this.data.chooseLocation) {
      wx.showToast({
        title: '请输入地址！',
        icon: 'loading',
        image: '/image/i/x.png',
        duration: 1000
      })
    }else{
      var subdata = {}

      subdata.name = this.data.username;
      subdata.phone = this.data.phone;
      subdata.address = this.data.chooseLocation.address;
      subdata.addrDetail = this.data.addrDetail;
      subdata.lng = this.data.chooseLocation.longitude;
      subdata.lat = this.data.chooseLocation.latitude;
      subdata.city = this.data.city;

      app.commonAjax('/miniapp/cat/takeout/insertAddress', ['bizId', 'memberId'], subdata,  (res) => {

        if(res.data.code == 0){

          wx.redirectTo({
            url: '/page/takeaway/submit/addList/index',
          })

        }

        // wx.navigateBack({
        //   delta: 1
        // })
        

      }, app.globalData, 'post')
    }


  },
})