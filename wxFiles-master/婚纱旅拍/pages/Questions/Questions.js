// pages/Questions/Questions.js
Page({
  data:{

    Questions:[
      {
        title:'我拍下后的产品什么时候发货？',
        answer:'您好，商家将在48小时内发货。'
      },
            {
        title:'已成团未发货如何退款',
         answer:''
      },
            {
        title:'没有收到货/商家发错地址了怎么办？',
        answer:''
      },
            {
        title:'收到产品有问题怎么办？',
        answer:''
      },
            {
        title:'如何联系商家客服？',
        answer:''
      },
            {
        title:'收到的产品能退换货吗？',
        answer:''
      },
            {
        title:'关于我们',
        answer:''
      },
    ]
  },
  //跳转到问题回答页面
  gotoQuestionText:function(e){
    var that = this;
    var ThisIndex = e.currentTarget.id;
    var ThisQuestion = that.data.Questions[ThisIndex]
    wx.navigateTo({
      url: '/pages/QuestionText/QuestionText?ThisQuestion='+JSON.stringify(ThisQuestion),
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
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