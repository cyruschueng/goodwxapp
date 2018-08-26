Page({
  data:{
    infoList:[{
      id:1,
      url:"../../img/list1.png",
      text:"雷凌双擎已预约",
      status:1
    },{
        id: 1,
        url: "../../img/list1.png",
        text: "预约试驾志炫",
        status: 2
      }, {
        id: 1,
        url: "../../img/list1.png",
        text: "预约试驾志炫",
        status: 1
      }]
  },
  redirect:function(event){
    var id = event.currentTarget.id
    var status = event.currentTarget.dataset.sta
    if (status==1){
      wx.navigateTo({ url: '../lookInfo/lookInfo?id=' + id }) 
    }else{
      wx.navigateBack({
        delta:2
      })
    }
  }
})