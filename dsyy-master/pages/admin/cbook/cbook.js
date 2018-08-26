var util = require('../../../utils/util.js')


//this
var vm = null
//app
var app = getApp()

Page({
  data: {
    isbn: '',
    bookInfo: {},
    bookObj: {
      o_n: "1",
      mail: "0",
      flag: "0"
    }
  },
  onLoad: function () {
    vm = this
  },
  //扫描图书
  scannerBook: function (e) {
    console.log(JSON.stringify(e))
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        //扫描成功
        if (res.result) {
          var isbn = res.result
          vm.getBookInfoByISBN(isbn)
        }
      }
    })
  },
  //设置邮寄
  changeMail: function (e) {
    console.log(JSON.stringify(e))
    var bookObjObj = vm.data.bookObj
    if (e.detail.value) {
      bookObjObj.mail = '1'
    } else {
      bookObjObj.mail = '0'
    }
    vm.setData({
      bookObj: bookObjObj
    })
  },
  //设置精品
  changeFlag: function (e) {
    console.log(JSON.stringify(e))
    var bookObjObj = vm.data.bookObj
    if (e.detail.value) {
      bookObjObj.flag = '1'
    } else {
      bookObjObj.flag = '0'
    }
    vm.setData({
      bookObj: bookObjObj
    })
  },
  //设置新旧
  changeO_n: function (e) {
    console.log(JSON.stringify(e))
    var bookObjObj = vm.data.bookObj
    if (e.detail.value) {
      bookObjObj.o_n = '1'
    } else {
      bookObjObj.o_n = '0'
    }
    vm.setData({
      bookObj: bookObjObj
    })
  },
  //根据isbn号获取图书信息
  getBookInfoByISBN: function (e) {
    console.log(JSON.stringify(e))
    console.log("globalData:" + JSON.stringify(app.globalData.userInfo))
    util.showLoading("检索图书");
    var param = {
      user_id: app.globalData.userInfo.id,
      token: app.globalData.userInfo.token,
      isbn: e
    }
    util.getBookInfoByISBN(param, function (ret) {
      console.log(JSON.stringify(ret))
      if (ret.data.code == '200') {
        vm.setData({
          bookInfo: ret.data.obj
        })
        //生成book_code
        var bookObjObj = vm.data.bookObj;
        bookObjObj.book_code = util.randomWord(false, 4)
        vm.setData({
          bookObj: bookObjObj
        })
        util.hideLoading()
        //判断图书类型，没有图书类型，需要设置
        if (util.judgeNoBookType(vm.data.bookInfo.type)) {
          wx.showActionSheet({
            itemList: app.globalData.bookTypeArr,
            success: function (res) {
              console.log(res.tapIndex)
              //更新bookInfo的type
              var bookInfoObj = vm.data.bookInfo
              bookInfoObj.type = app.globalData.bookTypeArr[res.tapIndex]
              vm.setData({
                bookInfo: bookInfoObj
              })
              var param = {
                user_id: app.globalData.userInfo.id,
                token: app.globalData.userInfo.token,
                id: vm.data.bookInfo.id,
                type: vm.data.bookInfo.type
              }
              util.updateBookInfo(param, function (ret) {
                console.log(JSON.stringify(ret))
                if (ret.data.code == '200') {
                }
                else {
                  util.showErrorModal(util.getErrorMsg(ret.data.code))
                }
              })
            },
            fail: function (res) {
              console.log(res.errMsg)
            }
          })
        }
      }
      else {
        util.showErrorModal(util.getErrorMsg(ret.data.code))
      }
    })
  },
  //input输入isbn号
  inputISBN: function (e) {
    console.log(JSON.stringify(e))
    vm.setData({
      isbn: e.detail.value
    })
  },
  //点击搜索ISBN号按钮
  searchISBN: function (e) {
    vm.getBookInfoByISBN(vm.data.isbn)
  },
  //录入图书
  createBookObj: function (e) {
    console.log(JSON.stringify(e))
    var param = {
      user_id: app.globalData.userInfo.id,
      token: app.globalData.userInfo.token,
      book_id: vm.data.bookInfo.id,
      owner_id: app.globalData.barDetail.barid,
      owner_type: '0',
      book_code: vm.data.bookObj.book_code,
      o_n: vm.data.bookObj.o_n,
      mail: vm.data.bookObj.mail,
      type: vm.data.bookInfo.type
    }
    console.log(JSON.stringify(param))
    util.showLoading('录入图书')
    util.createBookObj(param, function (ret) {
      console.log(JSON.stringify(ret))
      if (ret.data.code == '200') {
        util.showModal('提示', '录入图书成功', function (ret) { }, function (ret) { })
        vm.setData({
          bookInfo: {}
        })
      }
      else {
        util.showErrorModal(util.getErrorMsg(ret.data.code))
      }
    })
  }
})
