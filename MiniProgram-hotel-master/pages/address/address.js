// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedState:true,
    items:[
      { name: '张三李四', phone: '110110110', address: '北京故宫四合院中南海天路1号', },
      { name: '张三李四', phone: '110110110', address: '北京故宫四合院中南海天路1号', },
      { name: '张三李四', phone: '110110110', address: '北京故宫四合院中南海天路1号', },
    ]
  },

  //新增地址
  address_add:function(){
    wx.navigateTo({
      url: '/pages/address-add/address-add'
    })
  },
  //选中地址
  checkedState:function(e){
    let index = e.currentTarget.dataset.index;
    let items = this.data.items;
    if (items[index].checkedState){
      return false
    }
    for(let i = 0; i < items.length; i++){
      items[i].checkedState = false
    }
    items[index].checkedState = true;
    this.setData({
      items: items
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