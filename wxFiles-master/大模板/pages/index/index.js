var app = getApp()
var sw = require("../../utils/sunwou")
Page({
  data: {
    tabBar:null,
    body:null,
    tabIndex:0,
    pageData:[]
  },
  onLoad: function (options) {
    var tabBar = app.config.tabBar;
    var pageData = []
    for(var i in tabBar.list){
      tabBar.list[i].active = false;
      pageData.push({ name: tabBar.list[i].pageUrl})
    }
    tabBar.list[0].active = true;
    this.setData({
      pageData: pageData,
      tabBar: tabBar,
      body: app.config.body,
      tabIndex: 0
    })
    sw.onLoad(this, { pageName: tabBar.list[0].pageUrl,pageType:'tabBar',tabBarFlag:0})
  },
  onShow: function () {
    
  },
  /**
   * 通用过滤器方法
   */
  generalFilterFunction:function(e){
    sw[e.currentTarget.dataset.function](this,e)
  }
})
