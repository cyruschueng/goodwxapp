// pages/sim-go/demo/id.js
let sim = require('../../../static/js/sim.js/index')
let session = require('../../../static/js/sim.js/lib/session')

Page({
  data:{
    my:{},
    blog:{},
  },
  onLoad(options){
    // 页面初始化 options为页面跳转所带来的参数
    let id = options.id 
    sim.get(`/api/1/x/blog/id/${id}`,(r)=>{
      let blog = r.data.data 
      // console.log("blog",blog)
      blog.created = sim.formatDate(new Date(blog.created*1000),"M月d日")
      this.setData({
        blog:blog,
      })
    })
  },
  onReady(){
    // 页面渲染完成
    let my = session.get().my
    // console.log("my",my)
    this.setData({
      my:my,
    })
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