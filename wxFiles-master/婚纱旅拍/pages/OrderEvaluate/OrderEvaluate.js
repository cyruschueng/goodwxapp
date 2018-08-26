// pages/OrderEvaluate/OrderEvaluate.js
Page({
  data:{
    img:['/images/42.jpg'],
    flagList0:[true,true,true,true,true],
    flagList1:[true,true,true,true,true],
    flagList2:[true,true,true,true,true],
    MessageFalg:false,
  },
  //上传本地照片
  ChooseImg:function(){
    var that = this;
    wx.showModal({
  title: '只能上传5张图片',
  success: function(res) {
    if (res.confirm) {
       wx.chooseImage({
      count: 5, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        // success
        console.log(res.tempFilePaths)
        that.data.img = res.tempFilePaths
        that.setData({
          img:that.data.img
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    }
  }
})
  },
  //选择评价星星
  ChooseStar0:function(e){
   
    var Array=[false,false,false,false,false];
    var that = this;
    var index = parseInt(e.currentTarget.id)+1;

    that.data.flagList0 = Array;

     for(var i = 0; i < index; i++){
      that.data.flagList0[i] = true;
     }
     console.log(Array)
    that.setData({
      flagList0:that.data.flagList0
    })
  },
    //选择评价星星
  ChooseStar1:function(e){
   
    var Array=[false,false,false,false,false];
    var that = this;
    var index = parseInt(e.currentTarget.id)+1;

    that.data.flagList1 = Array;

     for(var i = 0; i < index; i++){
      that.data.flagList1[i] = true;
     }
     console.log(Array)
    that.setData({
      flagList1:that.data.flagList1
    })
  },
    //选择评价星星
  ChooseStar2:function(e){
   
    var Array=[false,false,false,false,false];
    var that = this;
    var index = parseInt(e.currentTarget.id)+1;

    that.data.flagList2 = Array;

     for(var i = 0; i < index; i++){
      that.data.flagList2[i] = true;
     }
     console.log(Array)
    that.setData({
      flagList2:that.data.flagList2
    })
  },
  Evaluation:function(){
    var that = this;
    var Time;
    clearTimeout(Time)
    that.setData({
      MessageFalg:true
    })
    clearTimeout(Time)
    Time = setTimeout(function(){
    that.setData({
      MessageFalg:false
    })
    },2000)

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})