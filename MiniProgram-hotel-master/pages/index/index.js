//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrl: ['/image/1.jpg', '/image/1.jpg', '/image/1.jpg',],
    serviceList:[
      { img: '/image/1.png', title: '商务大床房' },
      { img: '/image/1.png', title: '商务标间' },
      { img: '/image/1.png', title: '豪华主题房' },
      { img: '/image/1.png', title: '豪华标间' },
      { img: '/image/1.png', title: '商务大床房' },
      { img: '/image/1.png', title: '商务标间' },
      { img: '/image/1.png', title: '豪华主题房' },
      { img: '/image/1.png', title: '豪华标间' },
    ],
    lists:[
      { url: '/image/3.jpg', title: '街头涂鸦 2103#', price: 222, num: 5 },
      { url: '/image/3.jpg', title: '街头涂鸦 2103#', price: 222, num: 5 },
      { url: '/image/3.jpg', title: '街头涂鸦 2103#', price: 222, num: 5 },
      { url: '/image/3.jpg', title: '街头涂鸦 2103#', price: 222, num: 5 },
      { url: '/image/3.jpg', title: '街头涂鸦 2103#', price: 222, num: 5 },
    ]
  },
  //事件处理函数
  
  hotel_list:function(e){
    wx.navigateTo({
      url: '/pages/hotel-list/hotel-list'
    })
  },
  toReserve:function(e){
    let idx = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/hotel-reserve/hotel-reserve?id=' + idx
    })
  },
  onLoad: function () {
    
  },
 
})
