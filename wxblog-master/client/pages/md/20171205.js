const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    isloading: false,
    //article将用来存储towxml数据
    article: {}
  },
  onLoad: function () {
    var that = this;
    //请求Markdown文件内容
    app.getText(app.docDir + '2017-07-17-sass.md', (res) => {
      if (res.data) {
        //console.log(res.data);

        var article = res.data;
        WxParse.wxParse('article', 'html', article, that, 5);
       
      };
    });
  },
  doNav:function(){
    //闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages()) 获取当前的页面栈，决定需要返回几层
   /* wx.navigateBack({
      delta: 2
    })*/
    //将页面滚动到目标位置
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  queryMutipleNodes:function(){
    var query=wx.createSelectorQuery()
    query.select('#the-id').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      res[0].top//the-id 节点的上边界左边
      res[1].scrollTop//显示区域的竖直滚动位置
    })

  }
})
