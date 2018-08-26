var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()

var vm = null

var book_id = 0

var book_name = null

Page({
  data: {
    title:"",  //标题
    bookInfo: [],   //图书信息
    barInfos: [],   //书吧信息
    reaction:[],    //读后感
    img:"http://dsyy.isart.me/reaction.png",
    summaryShow:false,  //初始时，简介只显示几行

  },
  onLoad: function (options) {
    // wx.showShareMenu({
    //   withShareTicket: true
    // })

    if (util.judgeIsAnyNullStr(options.bookid)) {
      return;
    }
    vm = this
    book_id = options.bookid

    util.showLoading('加载中...');
    vm.loadbookPage()  //加载图书信息
  },
  //获取图书信息
  loadbookPage:function(){
    var param={
      book_id:book_id,
      lat: app.globalData.userLocation.lat,
      lon: app.globalData.userLocation.lon
    }
    util.getBookPageByBookId(param,function(ret){
      console.log("bookInfo :"+JSON.stringify(ret))
      if(ret.data.code=="200")
      {
        var bookInfo = ret.data.obj.bookInfo
        bookInfo.images_medium = util.qiniuUrlTool(bookInfo.images_medium, "folder_index")
        vm.setData({
          bookInfo: bookInfo,
          barInfos: ret.data.obj.barInfos,
          title: bookInfo.title
        })
        var title = vm.data.title
        wx.setNavigationBarTitle({ title: title })
        vm.getReaction()   //获取读后感
      }
    })
    
  },
  //根据ISBN号获取读后感
  getReaction:function(){
    var isbn = vm.data.bookInfo.isbn13
    var param={
      isbn:isbn
    }
    util.getTWDetailInfoByISBN(param,function(ret){
      console.log("reaction："+JSON.stringify(ret))
      if(ret.data.code=="200")
      {
        var reactions = ret.data.obj
        for (var i = 0; i < reactions.length; i++) {
          reactions[i].twInfo.create_time = vm.timeFormat(reactions[i].twInfo.create_time)  //格式化时间
          reactions[i].twInfo.see=false
        }
        vm.setData({
          reaction: reactions,
        })
        console.log("reactions：" + JSON.stringify(reactions))
      }
    })
  },
  //借书
  getScan:function(){
    wx.navigateTo({
      url: "/pages/member/borrow/borrow"
    })
  },
  //进入书吧
  intoBar:function(e){
    var bar_id = e.currentTarget.dataset.barid
    wx.navigateTo({
      url: '/pages/barpage/barpage?barid=' + bar_id
    })
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: vm.data.title,
      path: '/pages/bookpage/bookpage?bookid=' + book_id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  //拨打电话
  callPhonenum: function (e) {
    console.log(JSON.stringify(e))
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phonenum
    })
  },

  //查看位置
  getMapPosition: function (e) {
    console.log("lon lat：" + JSON.stringify(e.currentTarget.dataset))
    var lon = e.currentTarget.dataset.lon
    var lat = e.currentTarget.dataset.lat
    var name = e.currentTarget.dataset.name
    var address = e.currentTarget.dataset.address
    wx.openLocation({
      latitude: lon,
      longitude: lat,
      scale: 28,
      name: name,
      address: address
    })
  },

  //格式化时间
  timeFormat: function (time) {
    var date = new Date(time),
      curDate = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      curYear = curDate.getFullYear(),
      curHour = curDate.getHours(),
      timeStr;

    if (year < curYear) {
      timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
    } else {
      var pastTime = curDate - date,
        pastH = pastTime / 3600000;

      if (pastH > curHour) {
        timeStr = month + '月' + day + '日 ' + hour + ':' + minute;
      } else if (pastH >= 1) {
        timeStr = '今天 ' + hour + ':' + minute + '分';
      } else {
        var pastM = curDate.getMinutes() - minute;
        if (pastM > 1) {
          timeStr = pastM + '分钟前';
        } else {
          timeStr = '刚刚';
        }
      }
    }
    return timeStr;
  },

  //写读后感
  addReaction: function () {
    var isbn = vm.data.bookInfo.isbn13
    wx.navigateTo({
      url: "/pages/addreaction/addreaction?isbn=" + isbn
    })
  },
  //收起
  transformationFalse:function(e){
    console.log(JSON.stringify(e))
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var reaction = vm.data.reaction
    reaction[index].twInfo.see = false
    console.log("reaction：" + JSON.stringify(reaction[index]))
    vm.setData({
      reaction: reaction
    })
  },
  //查看
  transformationTrue: function (e) {
    console.log(JSON.stringify(e))
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var reaction = vm.data.reaction
    reaction[index].twInfo.see=true
    console.log("reaction：" + JSON.stringify(reaction[index]))
    vm.setData({
      reaction: reaction
    })
  }
})