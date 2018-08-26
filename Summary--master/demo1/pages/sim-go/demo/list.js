// pages/sim-go/demo/list.js
let sim = require('../../../static/js/sim.js/index')

var longtap = false
Page({
  data:{
    page:{},
  },
  viewItem(e){
    if (longtap){
      longtap = false
      return
    }
    // wx.showToast({title:"tap view"})
    let id = e.currentTarget.dataset.id
    // console.log("id",id)
    wx.navigateTo({
      url: `/pages/sim-go/demo/id?id=${id}`,
    })
  },
  editItem(e){
    longtap = true
    wx.showToast({title:"long tap edit"})
  },
  onLoad(options){
    // 页面初始化 options为页面跳转所带来的参数
    sim.get("/api/1/x/blog/page",(r)=>{
      let page = r.data.data;
      console.log(page)
      this.setData({
        page:page,
      })
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow(){
    // 页面显示
    wx.showModal({
      title: '提示',
      content: '运行本页demo需要在本机运行zero-weapp-server，单击确定自动复制server端下载链接，粘粘到群内查看',
      success: function(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: '第7节：使用sim.js实现向后端写数据\nhttp://note.youdao.com/noteshare?id=a3e30bf63020b2ecee0058d7dfc35451',
          })
        }
      }
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})