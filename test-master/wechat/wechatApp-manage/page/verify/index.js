var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    cateringBookMenus:[],
    limit:8,
    deskTypeId:"",
    offset:0,
    toView:'content',
    menuname:'',
    value:'',
    menuId:'',
    index:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      deskTypeId: e.deskTypeId,
      deskNo: e.deskNo
    })


    wx.setNavigationBarTitle({
      title: '餐桌号：' + e.deskNo
    })

    this.loadIt(e.deskTypeId,this.data.limit)
  },

  loadIt(Id,limit) {
    app.commonAjax('/shop/manage/schedule/menuList', ['shopId'], { deskId: Id, limit: this.data.limit, offset: this.data.offset * this.data.limit}, (res) => {
      if (this.data.offset == 0){
        this.setData({
          cateringBookMenus: []
        })
      }

      var  arry=res.data.data.cateringBookMenus
      var arry2 = this.data.cateringBookMenus
    
      for (var i = 0; i < arry.length;i++){
        arry2.push(arry[i]);
      }
      this.setData({
        cateringBookMenus: arry2
      })
      wx.stopPullDownRefresh()//关闭上拉刷新

    }, app, 'post')
  },
  



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  //继续点菜
  to_takeoutpay(){
    wx.navigateTo({
      url: '/page/takeoutpay/index?deskId=' + this.data.deskTypeId
    })
  }

})