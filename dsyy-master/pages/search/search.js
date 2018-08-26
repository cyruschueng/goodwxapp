var util = require('../../utils/util.js')
var app = getApp()
var vm = null

//获取传入书吧参数
var barInfo = null

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
    bookInfos: [],
    hotword:[],
    bar_id:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    //页面传入的options
    console.log("options:" + JSON.stringify(options))
    //如果options的barInfo不为空，则代表有barInfo值
    if (!util.judgeIsAnyNullStr(options.barInfo)) {
      //设置barInfo
      console.log("barInfo String:"+options.barInfo)
      barInfo = JSON.parse(options.barInfo)
      console.log(barInfo)
      vm.setData({
        bar_id: barInfo.id
      })
    }
    //初始化type
    vm.setData({
      hotword: getApp().globalData.bookTypeArr,
    })
  },
  //根据type查找书籍分类
  searchBookByType: function (e) {
    console.log("搜索的分类："+JSON.stringify(e))
    var param = {
      type: e.target.dataset.style,
      bar_id: vm.data.bar_id
    }
    //如果为零属于重新加载
    if (util.judgeIsAnyNullStr(vm.data.bookInfos)) {
      util.showLoading('加载图书');
    }
    util.getBookInfosByType(param, function (ret) {
      console.log("输出：" + JSON.stringify(ret))
      if (ret.data.code == "200") {
        //图片处理
        for (var i = 0; i < ret.data.obj.length; i++) 
        {
          ret.data.obj[i].images_medium = util.qiniuUrlTool(ret.data.obj[i].images_medium, "folder_index")
        }
        vm.setData({
          bookInfos: ret.data.obj,
        })
      }
    })
  },
  getTitle:function(e){
    console.log("输入框的文字：" + e.detail.value)
    vm.setData({
      inputVal: e.detail.value,
    })
  },
  //根据输入框中的值查找指定书籍
  searchBookByTitle: function (e) {
    var param = {
      title: vm.data.inputVal,
      bar_id: vm.data.bar_id
    }
    //如果为零属于重新加载
    if (util.judgeIsAnyNullStr(vm.data.bookInfos)) {
      util.showLoading('加载图书');
    }
    util.getBookInfosByTitle(param, function (ret) {
      console.log("输出：" + JSON.stringify(ret))
      if (ret.data.code == "200") {
        //图片处理
        for (var i = 0; i < ret.data.obj.length; i++) {
          ret.data.obj[i].images_medium = util.qiniuUrlTool(ret.data.obj[i].images_medium, "folder_index")
        }
        vm.setData({
          bookInfos: ret.data.obj,
        })
      }
    })
  },
  //根据图书id获取图书
  jumpBookInfo: function (e) {
    console.log(JSON.stringify("bookid:" + e.currentTarget.dataset.bookid))
    var bookid = e.currentTarget.dataset.bookid
    wx.navigateTo({
      url: '/pages/bookpage/bookpage?bookid=' + bookid
    })
  },

})
