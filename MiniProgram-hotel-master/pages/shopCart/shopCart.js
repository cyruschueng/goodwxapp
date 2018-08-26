// pages/shopCart/shopCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // isEmpty:true,
    hotelName:'Vbed联盟酒店预定',
    isEdit:true,
    edit:'编辑',
    checkedAllState:true,
    
    items:[
      { url: '/image/2.jpg', goods_title: '时尚酒店1', goods_price: '20.00', room_num: 1, checkedState: true,},
      { url: '/image/2.jpg', goods_title: '时尚酒店2', goods_price: '20.00', room_num: 1, checkedState: false,},
      { url: '/image/2.jpg', goods_title: '时尚酒店3', goods_price: '20.00', room_num: 1, checkedState: true,},
    ],
    totalPrice:'200.00'
  },

  //空购物车
  toshop:function(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  //编辑购物车
  bindEdit:function(e){
    let isEdit = this.data.isEdit;
    var edit = this.data.edit;
    isEdit = !isEdit;
    if (isEdit){
      edit = '编辑'
    }else{
      edit = '完成'
    }
    this.setData({
      isEdit: isEdit,
      edit: edit
    })
  },
  //单位选中操作
  checkedState:function(e){
    let index = e.currentTarget.dataset.index;
    let items = this.data.items;
    let checkedState = items[index].checkedState;
    checkedState = !checkedState;
    items[index].checkedState = checkedState;
    let checkedAllState = this.data.checkedAllState;
    let checkedLength = items.filter(function(item){
      return item.checkedState == true
    }).length;
    if (checkedLength == items.length){
      checkedAllState = true
    }else{
      checkedAllState = false
    }
    let none;
    if (checkedLength == 0){
      none = true
    }else{
      none = false
    }
    this.data.checkedAllState = checkedAllState
    this.setData({
      items: items,
      checkedAllState: checkedAllState,
      none: none
    })
  },
  //全选购物车
  checkedAllState:function(){
    let checkedAllState = this.data.checkedAllState;
    checkedAllState = !checkedAllState;
    let items = this.data.items;
    for (let i = 0; i < items.length; i++) {
      items[i].checkedState = checkedAllState
    }
    let none;
    if (checkedAllState) {
      none = false
    } else {
      none = true
    }
    this.data.checkedAllState = checkedAllState;
    this.setData({
      checkedAllState: checkedAllState,
      items: items,
      none: none
    })
  },
  //删除购物车列表
  deleteOrder:function(){
    let items = this.data.items;
    let newItems = items.filter(function(item){
      return item.checkedState == false || item.checkedState == null
    });
    if (newItems.length == items.length){
      return false
    }
    if (newItems.length == 0){
      this.data.isEmpty = true
    }
    console.log(newItems)
    // console.log(typeof newItems) 数组也是对象？？
    this.setData({
      items: newItems,
      none:true,
      isEmpty: this.data.isEmpty
    })
  },
  //减少房间数量
  minusCount:function(e){
    let index = e.currentTarget.dataset.index;
    let items = this.data.items;
    items[index].room_num--;
    if (items[index].room_num == 0){
      items[index].room_num = 1;
      items[index].isOne = true
    }
    this.setData({
      items: items
    })
  },
  //增加房间数量
  addCount:function(e){
    let index = e.currentTarget.dataset.index;
    let items = this.data.items;
    items[index].room_num++;
    items[index].isOne = false;
    this.setData({
      items: items
    })
  },
  //手动输入房间数量
  inputNumber:function(e){
    let index = e.currentTarget.dataset.index;
    let items = this.data.items;
    items[index].room_num = e.detail.value;
    if (items[index].room_num < 1){
      items[index].room_num = 1;
      items[index].isOne = true
    }else{
      items[index].isOne = false
    }
    this.setData({
      items: items
    })
  },
  //获取总价
  getTotalPrice:function(){
    let items = this.data.items;
    let total = 0;
  },
  //提交支付
  toPayHtml: function () {
    if (this.data.none){
      return false
    }
    wx.navigateTo({
      url: '/pages/payHtml/payHtml'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //页面请求成功后判断
    // console.log(this.data)
    // let items = this.data.items;
    // let isEmpty = this.data.isEmpty;
    // if (items.length == 0) {
    //   this.data.isEmpty = true
    // } else {
    //   this.data.isEmpty = false
    // }
    // this.setData({
    //   items: items,
    //   isEmpty: isEmpty
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})