var app = getApp()
Page({

  data: {

    AddressInfo: {},
    activeId: '',
    active:''

  },

  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '地址列表'
    })

    this.setData({
      active: options.active
    })

  },

  onShow(){
    this.selectAddressInfo()
  },


  //获取地址列表
  selectAddressInfo () {

    // longitude: res.longitude, latitude: res.latitude 

    app.commonAjax('/miniapp/cat/takeout/queryAddressList', ['memberId', 'shopId'], { }, (res) => {

      this.setData({
        notRangeAddressList: res.data.data.notRangeAddressList,
        rangeAddressList: res.data.data.rangeAddressList
      })


    }, app.globalData, 'post')

    // wx.getLocation({
    //   type: 'wgs84',
    //   success:  (res) => {
        
    //   }
    // })


  },

  notaddress () {
    wx.showToast({
      title: '不在配送范围！',
      image: '/image/i/x.png'
    })
  },

  //选择收货地址
  address (e) {

    this.setData({
      activeId: e.currentTarget.dataset.id
    })

    wx.setStorageSync('activeAddressId', e.currentTarget.dataset.id)

    wx.navigateBack({
      delta: 1
    })

  },

  //设置为默认地址
  changedef(e){

    var subdata = {}
    subdata.id = e.currentTarget.dataset.id

    var clickid = e.currentTarget.dataset.id

    var index = e.currentTarget.dataset.index

    if (!(e.currentTarget.dataset.isDefault)){
      subdata.isDefault = true
      app.commonAjax('/miniapp/cat/takeout/setDefaultAddress', ['bizId', 'memberId'], subdata,  (res) => {

        if (res.data.code == 0) {

          wx.showToast({
            title: '操作成功！'
          })

          // this.selectAddressInfo()

          var def = false

          this.data.notRangeAddressList.forEach(item => {
            console.log(item)
            if (item.id == clickid) {
              item.isDefault = true
              def = true
            } else {
              item.isDefault = false
            }
          })

          if (def) {
            this.data.rangeAddressList.forEach(item => {
              item.isDefault = false
            })
          } else {
            this.data.rangeAddressList.forEach(item => {
              if (item.id == clickid) {
                item.isDefault = true
              } else {
                item.isDefault = false
              }
            })
          }
          this.setData({
            rangeAddressList: this.data.rangeAddressList,
            notRangeAddressList: this.data.notRangeAddressList
          })
          
            

          //  that.selectAddressInfo()

          // var datalist = this.data.AddressInfo

          // datalist.forEach((item)=>{
          //   item.isDefault = false
          // })

          // datalist[index].isDefault =true

          // this.setData({
          //   AddressInfo: datalist
          // })

        }

      }, app.globalData, 'post')
    }

    

  },

  //编辑地址
  edit(e) {
    wx.navigateTo({
      url: '/page/takeaway/submit/addAdd/index?id=' + e.currentTarget.dataset.id
    })
  },

  //删除地址
  delAddress (e) {

    var subdata = {}

    subdata.id = e.currentTarget.dataset.id

    if (e.currentTarget.dataset.isdefault == true){

      wx.showModal({
        title: '温馨提示',
        content: '不能删除默认地址！'
      })

    }else{
      wx.showModal({
        title: '确定删除',
        content: '是否确定删除本条地址？',
        success:  (res) => {
          if (res.confirm) {
            
            app.commonAjax('/miniapp/cat/takeout/delAddress', [ 'memberId'], subdata, (res) => {

              if(res.data.code == 0){
                this.selectAddressInfo()
              }

            }, app.globalData, 'post')
            


          } else if (res.cancel) {
            
          }
        }
      })
    }

    


    
  },

  //新增地址
  pageto: function () {

    wx.redirectTo({
      url: '/page/takeaway/submit/addAdd/index'
    })

  }

})