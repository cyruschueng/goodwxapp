var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
var vm = null
var read_id = 0
var bookInfo = []
var book_id = ""
var title=""
Page({
  data: {
    title: "",  //标题
    reaction: [],  //读后感
    bookInfo: [],
    book_id: ""
  },
  onLoad: function (options) {
    if (util.judgeIsAnyNullStr(options.readid)) {
      return;
    }
    vm = this
    read_id = options.readid
    // read_id=160    //测试
    util.showLoading('加载中...');
    //加载信息
    var param={
      tw_id: read_id
    }
    util.getTWDetailInfoById(param,function(ret){
      console.log("图文详情："+JSON.stringify(ret))
      if(ret.data.code=="200")
      {
        var reaction = ret.data.obj
        console.log("reaction：" + JSON.stringify(reaction))
        reaction.twInfo.create_time = vm.timeFormat(reaction.twInfo.create_time)  //格式化时间
        if (reaction.twStepInfos.length > 0) {
          //图片优化
          for (var k = 0; k < reaction.twStepInfos.length; k++) {
            reaction.twStepInfos[k].img = util.qiniuUrlTool(reaction.twStepInfos[k].img, "folder_index")
          }
        }
        reaction.twInfo.see = false
        book_id = reaction.twInfo.book_id
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
              bookInfo = vm.union(bookInfo)
              vm.setData({
                bookInfo: bookInfo
              })
              console.log("bookInfo：" + JSON.stringify(bookInfo))
            }
          })
        }
        vm.setData({
          reaction: reaction,
          title: reaction.twInfo.title
        })
        title = vm.data.title
        wx.setNavigationBarTitle({ title: title })
      }
    })
  },
  //转发
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    console.log(title)
    return {
      title: title,
      path: '/pages/readpage/readpage?readid=' + read_id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
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
  //收起
  transformationFalse: function (e) {
    var reaction = vm.data.reaction
    reaction.twInfo.see = false
    vm.setData({
      reaction: reaction
    })
  },
  //查看
  transformationTrue: function (e) {
    var reaction = vm.data.reaction
    reaction.twInfo.see = true
    vm.setData({
      reaction: reaction
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
  //借书
  getScan: function () {
    wx.navigateTo({
      url: "/pages/member/borrow/borrow"
    })
  },
  //写读后感
  addReaction: function () {
    var isbn = vm.data.bookInfo.isbn13
    wx.navigateTo({
      url: "/pages/addreaction/addreaction"
    })
  },
})