var util = require('../../utils/util.js')
var vm = null
//获取应用实例
var app = getApp()
//图书列表相关加载参数
var start_r = 0
var num_r = 6
var loading_flag_r = false
var page = 0
var bookInfo = []
var book_id = ""
Page({
  data: {
    title: "书评",  //页面标题
    scrollTop: 0,
    scrollHeight: 0,
    reactions: [],
    hidden: true,
    bookInfo: [],
    book_id: ""
  },
  onLoad: function () {
    vm = this
    var title = vm.data.title
    wx.setNavigationBarTitle({ title: title })
    wx.getSystemInfo({
      success: function (res) {
        vm.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    util.showLoading("加载中")
    //加载读后感
    vm.getReaction()
  },
  addRead: function (e) {
    wx.navigateTo({
      url: "/pages/addreaction/addreaction"
    })
  },
  //加载读后感
  getReaction: function (e) {
    var param = {
      start: start_r,
      num: num_r,
      style: "all"
    }
    if (loading_flag_r) {
      return;
    }
    loading_flag_r = true //避免下拉时重复加载
    util.getTWDetailInfoByCon(param, function (ret) {
      if (ret.data.code == "200") {
        var reactions = ret.data.obj
        console.log("reaction：" + JSON.stringify(reactions))
        for (var i = 0; i < reactions.length; i++) {
          reactions[i].twInfo.create_time = vm.timeFormat(reactions[i].twInfo.create_time)  //格式化时间
          if (reactions[i].twStepInfos.length>0)
          {
            //图片优化
            for (var k = 0; k < reactions[i].twStepInfos.length; k++)
            {
              reactions[i].twStepInfos[k].img = util.qiniuUrlTool(reactions[i].twStepInfos[k].img, "folder_index")
            }
          }
          reactions[i].twInfo.see = false
          book_id = reactions[i].twInfo.book_id
          vm.setData({
            book_id: book_id
          })
          if (book_id != null) {
            var param = {
              book_id: book_id
            }
            util.getBookPageByBookId(param, function (res) {
              console.log("book：" + JSON.stringify(res))
              console.log("booke_id：" + book_id)
              if (res.data.code == "200") {
                  bookInfo = bookInfo.concat(res.data.obj.bookInfo)
                  bookInfo.images_medium = util.qiniuUrlTool(bookInfo.images_medium, "folder_index")  //处理图片
                  bookInfo=vm.union(bookInfo)
                  vm.setData({
                    bookInfo: bookInfo
                  })
                  console.log("bookInfo：" + JSON.stringify(bookInfo))
              }
            })
          }
        }
        console.log("加入字段后：" + JSON.stringify(bookInfo))
        if (start_r == 0) { //0则重新加载
          vm.setData({
            reactions: reactions,
          hidden: true,
          })
        } else {
          vm.setData({
            reactions: vm.data.reactions.concat(reactions),
            hidden: true,
          })
        }
      }
      start_r = start_r + num_r
      loading_flag_r = false  //避免下拉时重复加载
    })
  },
  //////数组元素去重
  union: function (arr) {
    arr = arr || [];
    var tmp = {};
    for (var i = 0, len = arr.length; i < len; i++) {
      var obj = arr[i];
      if (obj.id in tmp) {
        tmp[obj.id].num += obj.num;
      } else {
        tmp[obj.id] = obj;
      }
    }

    var result = [];
    for (var key in tmp) {
      result.push(tmp[key]);
    }

    return result;
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
  //页面滑动到底部
  bindDownLoad: function () {
    start_r += num_r
    console.log("start：" + start_r)
    vm.getReaction();
  },
  topLoad: function (event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    start_r = 0;
    this.setData({
      hidden: false,
    });
    vm.getReaction();
    console.log("lower");

  },
  //收起
  transformationFalse: function (e) {
    console.log(JSON.stringify(e))
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var reactions = vm.data.reactions
    reactions[index].twInfo.see = false
    console.log("reactions：" + JSON.stringify(reactions[index]))
    vm.setData({
      reactions: reactions
    })
  },
  //查看
  transformationTrue: function (e) {
    console.log(JSON.stringify(e))
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var reactions = vm.data.reactions
    reactions[index].twInfo.see = true
    console.log("reaction：" + JSON.stringify(reactions[index]))
    vm.setData({
      reactions: reactions
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
  //根据id获取读后感详情
  jumpReadInfo: function (e) {
    console.log(JSON.stringify("readid:" + e.currentTarget.dataset.readid))
    var readid = e.currentTarget.dataset.readid
    wx.navigateTo({
      url: '/pages/readpage/readpage?readid=' + readid
    })
  },
})
