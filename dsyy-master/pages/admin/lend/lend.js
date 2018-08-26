var util = require('../../../utils/util.js')
var vm = null
//获取应用实例
var token=null
var app = getApp()
Page({
  data: {
    title: "图书借出",  //页面标题
    user_photo: "",   //借书用户头像
    user_name: "",   //借书用户姓名
    user_tel: "",   //借书用户电话
    user_id: "",   //借阅者id
    userHidden:true,    //隐藏
    token:"",     //token
    isbn:"",    //isbn
    bar_id: "",   //书吧id
    bar_name: "",  //书吧name
    searchHidden:false,  //搜索隐藏
    bookDetail:[], //图书信息
    bookObj:[],  //图书对象
    lend_id: "",   //借出的图书id
    lendingHidden: false,    //借阅模块隐藏与显示
    oper_name:"",  //管理员name
    time:"",   //当前时间
    book_s_name: "",  //图书name（成功）
    user_s_name: "",  //借阅者name（成功）
    noBook: false   //没有搜索到图书的时候为true
  },
  onLoad: function (options) {
    vm = this
    var title = vm.data.title
    wx.setNavigationBarTitle({ title: title })

    token = app.globalData.userInfo.token
    var bar_id = app.globalData.barDetail.barid
    var bar_name = app.globalData.barDetail.barname
    var oper_name = app.globalData.userInfo.nick_name  //操作者name

    vm.setData({
      token: token,
      bar_id: bar_id,
      bar_name: bar_name,
      oper_name: oper_name
    })
  },
  //判断借书码
  judgeUser:function(e){
    console.log(JSON.stringify(e))
    var code = e.detail.value
    if (code.length==4)
    {
      vm.searchUser(code)
    }
    else
    {
      vm.setData({
        user_photo: "",   //借书用户头像
        user_name: "",   //借书用户姓名
        user_tel: "",   //借书用户电话
        user_id: "",   //借阅者id
        userHidden: true,    //隐藏
      })
    }
  },
  //根据借书码搜索用户
  searchUser: function (code) {
    //搜索用户
    wx.showLoading({
      title: '搜索中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

    var param={
      token: token,
      code: code
    }
    util.getUserInfoByBorrowCode(param,function(ret){
      console.log("UserInfoByBorrowCode："+JSON.stringify(ret))
      if(ret.data.code=="200")
      {
        if (ret.data.obj.length!=0)
        {
          vm.setData({
            user_photo: ret.data.obj.avatar,
            user_name: ret.data.obj.nick_name,
            user_id: ret.data.obj.id,
            user_tel: ret.data.obj.phonenum,
            userHidden: false,
            user_s_name: ret.data.obj.nick_name,  //借阅者name（成功）        
          })
        }
      }
    })
  },
  //通过扫描搜索图书
  scanBook:function(e){
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
  inputISBN:function(e){
    console.log(JSON.stringify(e))
    vm.setData({
      isbn: e.detail.value
    })
  },
  searchISBN: function (e){
    vm.getBookInfosByBarIdAndISBN()
  },
  //通过书吧id和ISBN获取图书列表
  getBookInfosByBarIdAndISBN:function(){
    var param={
      token:vm.data.token,
      bar_id:vm.data.bar_id,
      isbn:vm.data.isbn
    }
    util.getBookInfosByBarIdAndISBN(param,function(ret){
      console.log("book ："+JSON.stringify(ret))
      if (ret.data.code=="200")
      {
        if (ret.data.obj.length>0)
        {
          var bookDetail = ret.data.obj[0].bookInfo
          console.log("图书详情：" + JSON.stringify(bookDetail))
          var bookObj=[]
          for (var i = 0; i < ret.data.obj.length ; i++)
          {
            bookObj[i] = ret.data.obj[i].bookObj
            bookObj[i].checked=false
          }
          console.log("图书对象：" + JSON.stringify(bookObj))
          //图片处理
          bookDetail.images_medium = util.qiniuUrlTool(bookDetail.images_medium, "folder_index")
          vm.setData({
            noBook: false,
            bookDetail: bookDetail,
            bookObj: bookObj,
            searchHidden:true,
            book_s_name: bookDetail.title  //借阅图书（成功）
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
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var id = e.detail.value
    var radioItems = vm.data.bookObj
    for (var i = 0; i < radioItems.length ; i++) {
      if (radioItems[i].id == id)
      {
        radioItems[i].checked = true;
      }
      else
      {
        radioItems[i].checked = false;
      }
    }
    this.setData({
      lend_id: id   
    });
  },
  //借出图书
  lendBook:function(){
    var user_id = vm.data.user_id  //借阅者id
    var book_obj_id = vm.data.lend_id  //借出的图书id
    var oper_id = app.globalData.userInfo.id  //操作者id

    var param={
      user_id: user_id,
      token: token,
      oper_id: oper_id,
      book_obj_id: book_obj_id
    }
    util.borrowBook(param,function(ret){
      console.log("borrow ："+JSON.stringify(ret))
      if (ret.data.code=="200")
      {
        vm.setData({
          user_photo: "",   //借书用户头像
          user_name: "",   //借书用户姓名
          user_tel: "",   //借书用户电话
          user_id: "1",   //借阅者id
          userHidden: true,    //隐藏
          isbn: "",    //isbn
          searchHidden: false,  //搜索隐藏
          bookDetail: [], //图书信息
          bookObj: [],  //图书对象
          lend_id: "",   //借出的图书id
          lendingHidden:true,
        })
        vm.lendSuccess()
      }
    })
  },
  lendSuccess:function(){
    var time = vm.getNowTime()  //当前时间
    vm.setData({
      time:time
    })
  },
  //获取当前时间
  getNowTime:function(){
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
  back:function(){
    wx.navigateTo({
      url: '/pages/admin/lend/lend',
    })
  },
  
})