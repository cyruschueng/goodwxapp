var util = require('../../../utils/util.js')
var vm = null
//获取应用实例
var app = getApp()
Page({
  data: {
    title: "历史借阅",  //页面标题
    systemInfo:[],
    bookInfos:[]
  },
  onLoad: function (options) {
    vm = this
    var title = vm.data.title
    wx.setNavigationBarTitle({ title: title })
    util.showLoading("加载中")
    var systemInfo = app.globalData.systemInfo
    vm.setData({
      systemInfo: systemInfo
    })
    //加载图书
    var param={}
    util.getDetailBorrowInfoByUserId(param,function(ret){
      console.log("历史借阅："+JSON.stringify(ret))
      if(ret.data.code="200")
      {
        var bookInfos = ret.data.obj
        for (var i = 0; i < bookInfos.length;i++)
        {
          //图片处理
          bookInfos[i].bookInfo.bookInfo.images_medium = util.qiniuUrlTool(bookInfos[i].bookInfo.bookInfo.images_medium, "folder_index")
          //格式化时间
          bookInfos[i].borrowInfo.borrow_time = vm.timeFormat(bookInfos[i].borrowInfo.borrow_time)
        }
        console.log("bookInfos：" + JSON.stringify(bookInfos))
        vm.setData({
          bookInfos:bookInfos
        })
      }
    })
  },
  jumpBookInfo:function(e){
    console.log(JSON.stringify("bookid:" + e.currentTarget.dataset.bookid))
    var bookid = e.currentTarget.dataset.bookid
    wx.navigateTo({
      url: '/pages/bookpage/bookpage?bookid=' + bookid
    })
  },
  //格式化时间
  timeFormat: function (time) {
    var date = new Date(time),
      curDate = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      timeStr;
    timeStr = year + '年' + month + '月' + day + '日 ';
    return timeStr;
  },
})