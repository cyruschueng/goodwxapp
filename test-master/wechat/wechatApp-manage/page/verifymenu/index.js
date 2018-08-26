var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    orderMenuList:[],
    limit:8,
    deskTypeId:"",
    offset:0,
    toView:'content',
    states:"赠菜",
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

  to_home(){
    wx.navigateBack({
      delta: getCurrentPages().length
    })
  },

  loadIt(Id,limit) {
    app.commonAjax('/shop/manage/schedule/menuList', ['shopId'], { deskId: Id, limit: this.data.limit, offset: this.data.offset * this.data.limit}, (res) => {
      if (this.data.offset == 0){
        this.setData({
          orderMenuList: []
        })
      }

      var  arry=res.data.data
      var arry2 = this.data.orderMenuList
    
      for (var i = 0; i < arry.length;i++){
        arry2.push(arry[i]);
      }
      this.setData({
        orderMenuList: arry2
      })
      wx.stopPullDownRefresh()//关闭上拉刷新

    }, app, 'post')
  },
  serving(e){
    wx.showModal({
      content: '确定赠菜吗？',
      success: (res) => {
        if (res.confirm) {
          var index = e.currentTarget.dataset.index
          app.commonAjax('/shop/manage/schedule/presented', ['shopId'], { id: e.currentTarget.dataset.id, deskId: this.data.deskTypeId }, (res) => {
            if (res.data.code == 0) {
              var neworderMenuList = this.data.orderMenuList;
              neworderMenuList[index].free = true
              this.setData({
                orderMenuList: neworderMenuList
              })
            } else {
              wx.showToast({
                title: res.data.message,
                image: '/image/i/x.png',
                duration: 2000
              })
            }
          }, app, 'POST')
          
        } else if (res.cancel) {
        }
      }
    })
      
  },


  food_back(e){

    var index = e.currentTarget.dataset.index

    wx.showModal({
      content: '确定退菜吗？',
      success:  (res)=> {
        if (res.confirm) {
          app.commonAjax('/shop/manage/schedule/backOrderMenu', ['shopId'], { id: e.currentTarget.dataset.id, deskId: this.data.deskTypeId }, (res) => {
            if (res.data.code == 0) {


              this.setData({
                offset: 0
              })
              this.loadIt(this.data.deskTypeId, this.data.limit)

              // var neworderMenuList = this.data.orderMenuList;



              // if(index == 0 ){
              //   neworderMenuList.shift(index)
              // }else{
              //   neworderMenuList.splice(index,1)
              // }

              // this.setData({
              //   orderMenuList: neworderMenuList
              // })

            } else {
              wx.showToast({
                title: res.data.message,
                image: '/image/i/x.png',
                duration: 2000
              })
            }
          }, app, 'POST')
        } else if (res.cancel) {
        }
      }
    })

    
    
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      offset:0
    })
    this.loadIt(this.data.deskTypeId, this.data.limit)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      offset:(this.data.offset)+1
    })
    this.loadIt(this.data.deskTypeId, this.data.limit)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //继续点菜
  to_takeoutpay(){
    wx.navigateTo({
      url: '/page/takeoutpay/index?deskId=' + this.data.deskTypeId + '&deskNo=' + this.data.deskNo
    })
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框  
  modalinput: function (e) {
    
    this.setData({
      index: e.currentTarget.dataset.index,
      hiddenmodalput: !this.data.hiddenmodalput,
      menuId: e.currentTarget.dataset.id,
      menuname: e.currentTarget.dataset.menuname,
      billsLogId: e.currentTarget.dataset.billslogid
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      value:''
    });
  },
  input_(e){
    this.setData({
      value: e.detail.value
    })
  },
  //确认  
  confirm: function (e) {

    var index = e.currentTarget.dataset.index

    var reg = /^[0-9]+(\.[0-9]{1,2})?$/;

    if (reg.test(this.data.value) && this.data.value > 0) {
      var subdata = {};
      subdata.id = this.data.menuId;
      subdata.deskId = this.data.deskTypeId;
      subdata.billsLogId = this.data.billsLogId;
      subdata.price = this.data.value;

      app.commonAjax('/shop/manage/menu/updateMenuWeightOrPrice', ['shopId'], subdata, (res) => {

          if(res.data.code == 0){
            


            var neworderMenuList = this.data.orderMenuList;
            neworderMenuList[this.data.index].price = this.data.value
            this.setData({
              orderMenuList: neworderMenuList
            })

            this.setData({
              value: ''
            })


          }
          

      }, app, 'post')
      this.setData({
        hiddenmodalput: true
      })
    }else{
      wx.showToast({
        title: '价格格式错误！',
        image: '/image/i/x.png',
        duration: 2000,
        success: () => {

        }
      })
    }

    
  },
  //结账
  pay(){
    wx.redirectTo({
      url: "/page/pay/index?deskId=" + this.data.deskTypeId
    })
  }
})