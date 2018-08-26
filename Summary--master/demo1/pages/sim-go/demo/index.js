// pages/sim-go/demo/index.js
let sim = require('../../../static/js/sim.js/index')

Page({
  data: {
    blog:{
      id:0,
      title:"",
      content:"",
    }
  },
  bindSave(){
    sim.post("/api/1/x/blog/update",this.data.blog,()=>{
      console.log("保存成功")
      wx.showToast({
        title: '保存成功',
      })
    },()=>{
      console.log("保存失败")
    })
  },
  bindUserInput(e){
    let field = e.currentTarget.dataset.field
    console.log("field",field)

    let value = e.detail.value
    console.log("value",value)

    var blog = this.data.blog
    blog[field] = value 

    this.setData({
      "blog":blog,
    })
    console.log("blog",blog)
  },
  onLoad: function (options) {
    //页面初始化
  },
  onShow: function () {
    //页面显示
  },
  onReady: function () {
    //页面渲染完成
  },
  onHide: function () {
    //页面隐藏
  },
  onUnload: function () {
    //页面关闭
  }
})