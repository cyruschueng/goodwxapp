// page/component/list/list.js
Page({
  data:{
    foodList:[
      {
        url:'/image/s4.png',
        name:'瓜子',
        specification:'100g',
        price:'1.00'
      },
      {
        url: '/image/s5.png',
        name: '西芹',
        specification: '半斤',
        price: '3.50'
      },
      {
        url: '/image/s6.png',
        name: '素米',
        specification: '500g',
        price: '10.00'
      }
    ]
  },
  onload:function(options){
    //页面初始化options为页面跳转所带来的参数
  },
  onReady:function(){
    //页面渲染完成
  },
  onShow:function(){
    //页面显示
  },
  onHide:function(){
    //页面隐藏
  },
  onUnload:function(){
    //页面关闭
  }
})