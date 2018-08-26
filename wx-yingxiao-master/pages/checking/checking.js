// pages/checking/checking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    states:['拍照','修片','选片','精修','设计','看设计','选片'],
    order:[
      {order_sn:'001',state:'1',img:'/pages/source/images/detail1.jpg',title:'奇幻森林系列',saler:'贝小胖',price:'1677'},
      { order_sn: '002', state: '1', img: '/pages/source/images/detail1.jpg', title: '奇幻森林系列', saler: '贝小胖', price: '1677' },
      { order_sn: '003', state: '2', img: '/pages/source/images/detail1.jpg', title: '奇幻森林系列', saler: '贝小胖', price: '1677' },
    ]
  },
  onLoad:function(){},
  toDetail:function(e){
    var that = this;
    var order_sn = e.currentTarget.dataset.order_sn;
    wx.navigateTo({
      url: '/pages/orderdetail/orderdetail?order_sn='+order_sn,
    })
  }
})