// pages/orderdetail/orderdetail.js
Page({
  data: {
    steps: [
      { step: '拍照', operation:[ '预约'] }, { step: '修片', operation:[''] }, { step: '选片', operation: ['预约','在线选片'] }, { step: '精修', operation: [''] }, { step: '设计', operation: [''] }, { step: '看设计', operation: ['预约'] }, { step: '取件', operation: ['预约','在线查询'] },
    ],
   order:{order_sn: '3', state: '1', img: '/pages/source/images/detail1.jpg', title: '奇幻森林系列', seller: '贝小胖', price: '1677',consignee:'胖小北',address:'北京市丰台区大红门',createTime:'2017-07-07',payTime:'2017-07-08',step:'3'}
  },
  onLoad: function (options) {
    var that = this;
    var len = that.data.steps[that.data.order.step-1].operation.length;
    that.setData({
      len:len,
    })
  },
  dialogue:function(){

  },
  call:function(){
    wx.makePhoneCall({
      phoneNumber: '13167553096',
    })
  },
  tourl:function(e){
    var that = this;
    var order_sn = that.data.order.order_sn;
    var item = e.currentTarget.dataset.item;
    if(item=='预约'){
      wx.navigateTo({
        url: '/pages/appointment/appoinment?order_sn='+order_sn,
      })
    }
  }
})