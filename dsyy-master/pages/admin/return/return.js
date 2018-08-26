var util = require('../../../utils/util.js')
var vm = null
//获取应用实例
var token = null
var app = getApp()
Page({
  data: {
    title: "图书归还",  //页面标题
    returningHidden: false,  //隐藏
    searchHidden: false,  //搜索隐藏
    token: "",     //token
    isbn: "",    //isbn
    bar_id: "",   //书吧id
    bar_name: "",  //书吧name
    bookDetail: [], //图书信息
    bookObj: [],  //图书对象
    lendBookObj: [],  //被借出的图书信息
    oper_name: "",  //管理员name
    time: "",   //当前时间
    book_s_name: "",  //图书name（成功）
    user_s_name: "",  //借阅者name（成功）
    noBook:false   //没有搜索到图书的时候为true
  },
  onLoad: function (options) {
    vm = this
    var title = vm.data.title
    wx.setNavigationBarTitle({ title: title })

    token = app.globalData.userInfo.token
    var bar_id = app.globalData.barDetail.barid
    var bar_name = app.globalData.barDetail.barname
    var oper_name = app.globalData.userInfo.nick_name  //操作者name
    wx.getSystemInfo({
      success: function (res) {
        vm.setData({
          system_height: res.screenHeight
        })
      }
    })
    vm.setData({
      token: token,
      bar_id: bar_id,
      // bar_id: 2,    //测试
      bar_name: bar_name,
      oper_name: oper_name
    })
  },
  //通过扫描搜索图书
  scanBook: function (e) {
    //获取ISBN号
    wx.scanCode({
      onlyFromCamera: true,
      success: (ret) => {
        console.log(ret)
        //扫描成功
        if (ret.result) {
          var isbn = ret.result
          vm.setData({
            isbn: isbn
          })
          vm.searchISBN()
        }
      }
    })
    vm.getBookInfosByBarIdAndISBN()
  },
  //通过搜索ISBN
  inputISBN: function (e) {
    console.log(JSON.stringify(e))
    vm.setData({
      isbn: e.detail.value
    })
  },
  searchISBN: function (e) {
    vm.getBookInfosByBarIdAndISBN()  //通过书吧id和ISBN获取图书列表
    vm.getBorrowedOutInfoByBarIdAndISBN()  //根据ISBN和书吧id获取借出图书信息
  },
  //通过书吧id和ISBN获取图书列表
  getBookInfosByBarIdAndISBN: function () {
    var param = {
      token: vm.data.token,
      bar_id: vm.data.bar_id,
      isbn: vm.data.isbn
    }
    util.getBookInfosByBarIdAndISBN(param, function (ret) {
      console.log("book ：" + JSON.stringify(ret))
      if (ret.data.code == "200") {
        if (ret.data.obj.length > 0) {
          var bookDetail = ret.data.obj[0].bookInfo
          console.log("图书详情：" + JSON.stringify(bookDetail))
          var bookObj = []
          for (var i = 0; i < ret.data.obj.length; i++) {
            bookObj[i] = ret.data.obj[i].bookObj
            bookObj[i].checked = false
          }
          console.log("图书对象：" + JSON.stringify(bookObj))
          vm.setData({
            noBook: false,
            bookDetail: bookDetail,
            bookObj: bookObj,
            searchHidden: true,
            book_s_name: bookDetail.title  //归还图书（成功）
          })
          var book_s_name = vm.data.bookObj.title
          vm.setData({
            book_s_name: book_s_name
          })
        }
        else
        {
          vm.setData({
            noBook: true,
          })
        }
      }
    })
  },
  //根据ISBN和书吧id获取借出图书信息
  getBorrowedOutInfoByBarIdAndISBN:function(){
    var param = {
      token: vm.data.token,
      bar_id: vm.data.bar_id,
      isbn: vm.data.isbn
    }
    util.getBorrowedOutInfoByBarIdAndISBN(param,function(ret){
      console.log("借出图书信息："+JSON.stringify(ret))
      if (ret.data.code == "200") {
        var lendBookObj=ret.data.obj
        for (var i = 0; i < lendBookObj.length;i++)
        {
          lendBookObj[i].borrowInfo.borrow_time = vm.timeFormat(lendBookObj[i].borrowInfo.borrow_time)  //借书的时间
        }
        console.log("lendUser：" + JSON.stringify(lendBookObj))
        vm.setData({
          lendBookObj: lendBookObj
        })
      }
    })
  },
  timeFormat:function (time){
    var date = new Date(time),
    curDate = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    timeStr;
    timeStr = year + '年' + month + '月' + day + '日 ' ;
    return timeStr;
  },
  //还书
  returnBook: function(e){
    console.log(JSON.stringify(e.target.dataset))
    var borrow_id = e.target.dataset.borrow_id
    var user_s_name = e.target.dataset.nick_name
    var param={
      token: vm.data.token,
      borrow_id: borrow_id,
    }
    util.returnBook(param,function(ret){
      console.log("return ："+JSON.stringify(ret))
      if (ret.data.code == "200") {
        vm.setData({
          returningHidden: true,  //隐藏
          searchHidden: false,  //搜索隐藏
          isbn: "",    //isbn
          bookDetail: [], //图书信息
          bookObj: [],  //图书对象
          lendBookObj: [],  //被借出的图书信息
          user_s_name: user_s_name
        })
        vm.returnSuccess()
      }
    })
  },
  returnSuccess: function () {
    var time = vm.getNowTime()  //当前时间
    vm.setData({
      time: time
    })
  },
  //获取当前时间
  getNowTime: function () {
    var dtCur = new Date();
    var yearCur = dtCur.getFullYear();
    var monCur = dtCur.getMonth() + 1;
    var dayCur = dtCur.getDate();
    var hCur = dtCur.getHours();
    var mCur = dtCur.getMinutes();
    var sCur = dtCur.getSeconds();
    var timeCur = yearCur + "-" + (monCur < 10 ? "0" + monCur : monCur) + "-"
      + (dayCur < 10 ? "0" + dayCur : dayCur) + " " + (hCur < 10 ? "0" + hCur : hCur)
      + ":" + (mCur < 10 ? "0" + mCur : mCur) + ":" + (sCur < 10 ? "0" + sCur : sCur);
    return timeCur;
  },
  back: function () {
    wx.navigateTo({
      url: '/pages/admin/return/return',
    })
  }
})