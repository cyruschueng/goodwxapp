Page({
  data:{
     login:false,
  },
  onLoad(){
    wx.setNavigationBarTitle({
			title: '关于接车单'
		})
    if(wx.getStorageSync('token')){
       this.setData({
          login:true
       })
    }
  },
  toCreateOrder(){
     wx.switchTab({
         url:"/src/containers/transferCreaterOrder/transferCreaterOrder",
     })
  },
  teacher(){
    wx.navigateTo({
      url: '/src/containers/teacher/teacher'
    })
  }
})
