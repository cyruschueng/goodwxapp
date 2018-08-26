// pages/choseInfoTemplate/choseInfoTemplate.js
const app=getApp();
const basePath = app.globalData.basePath;
const imgPath = app.globalData.imgPath;
let tpl= ''
Page({
  data: {
    templates: []
  },
  onLoad: function (options) {
    const page=this;
    tpl = options.tpl;
    getTplList(page)
  },
  onShow: function () {

  },
  submitTemplateHandle:function(e){
    let value=e.detail.value;
    let tpls = this.data.templates;
    let tplIdx = parseInt(value.template)
    wx.setStorageSync('template', tpls[tplIdx])
    wx.navigateBack()
  }
})


function getTplList(page){
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: basePath +'template/all',
    data:{},
    method:'POST',
    success:res=>{
      console.log(res)
      if (res.statusCode == 200){
        let tpls = res.data.result;
        tpls.forEach((val, index) => {
          if (val.address == tpl) {
            val.checked = true
          }
        })
        page.setData({
          templates: tpls
        }) 
      }
    },
    complete:function(){
      wx.hideLoading()
    }
  })
}