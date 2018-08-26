var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List:[],
    hiddenmodalput:0,
    value:'',
    menuName:'',
    id:'',
    deskId:'',
    billsLogId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.menuWeightList(options.id)
    this.setData({
      deskId:options.id
    })
    wx.setNavigationBarTitle({
      title: '菜品称重详情'
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  cancel(){
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  weight(e){
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      menuName: e.currentTarget.dataset.menuname,
      id: e.currentTarget.dataset.id,
      billsLogId: e.currentTarget.dataset.billslogid
    })
  },

  weight_value(e){
    this.setData({
      value: e.detail.value
    })
  },

  sub_weight(e){

    var reg = /^[0-9]+(\.[0-9]{1,2})?$/;

    if (reg.test(this.data.value) && this.data.value >0){

      var subdata = {};

      subdata.id = this.data.id;
      subdata.weight = this.data.value;
      subdata.deskId = this.data.deskId;
      subdata.billsLogId = this.data.billsLogId;
      subdata.isWeighted = 1;

      app.commonAjax('/shop/manage/menu/updateMenuWeightOrPrice', ['shopId'], subdata, (res) => {

        if (res.data.code == 0) {
          this.menuWeightList(this.data.deskId)

          this.setData({
            value:'',
            hiddenmodalput:0
          })
        } else {
          wx.showToast({
            title: res.data.message,
            image: '/image/i/x.png',
            duration: 2000
          })
        }

      }, app, 'post')

    }else{
      wx.showToast({
        title: '输入格式有误！',
        image: '/image/i/x.png',
        duration: 2000
      })
    }
  },

  menuWeightList(id){
    app.commonAjax('/shop/manage/menu/menuWeightList', ['shopId'], { deskId: id}, (res) => {

      if (res.data.code == 0) {

        var cateringBookMenus = res.data.data.cateringBookMenus;

        for (var o in cateringBookMenus){
          console.log(cateringBookMenus[o].weight , cateringBookMenus[o].price)

          var allprice = cateringBookMenus[o].weight * cateringBookMenus[o].price

          allprice = allprice.toFixed(2)

          cateringBookMenus[o].allprice = allprice

        }

        this.setData({
          List: res.data.data.cateringBookMenus
        })
      } else {
        wx.showToast({
          title: res.data.message,
          image: '/image/i/x.png',
          duration: 2000
        })
      }

    }, app, 'get')
  }
})