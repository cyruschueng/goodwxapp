var util = require('../../utils/util.js')
const qiniuUploader = require("../../utils/qiniuUploader");
var vm = null
//获取应用实例
var app = getApp()
var token = ""

var qnToken = ""
// 初始化七牛相关参数
function initQiniu() {
  var options = {
    region: 'ECN', // 华东区
    uptoken: qnToken
  };
  console.log("initQiniu options:" + JSON.stringify(options))
  qiniuUploader.init(options);
}

Page({
  data: {
    title: "发布",  //页面标题
    files: [],
    isbn: "",  //isbn
    bookDetail: [],  //图书详情
    searchHidden: false,  //显示搜索
    book_id: "",
    tit: "",
    intro: "",
  },
  onLoad: function (options) {
    vm = this
    var title = vm.data.title
    wx.setNavigationBarTitle({ title: title })

    token = app.globalData.userInfo.token
    if (!util.judgeIsAnyNullStr(options.isbn)) {
      var isbn = options.isbn;
      vm.setData({
        searchHidden: true,
        isbn: isbn
      })
      vm.getBookInfoByISBN()
    }
  },
  //选择图片
  chooseImage: function (e) {
    var count = 4 - vm.data.files.length
    wx.chooseImage({
      count: count,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log("tempFilePaths:" + JSON.stringify(tempFilePaths))
        // for (var i = 0; i < tempFilePaths.length; i++) {
        //   var tempFilePath = tempFilePaths[i]
        wx.showLoading({
          title: '正在上传',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        var param = {}
        //获取七牛上传token
        util.getQnToken(param, function (res) {
          console.log(JSON.stringify(res));
          if (res.data.result) {
            qnToken = res.data.obj;
            console.log("qiniu upload token:" + qnToken)
            initQiniu();
            //获取token成功后上传图片
            for (var i = 0; i < tempFilePaths.length; i++) {
              var tempFilePath = tempFilePaths[i]
              qiniuUploader.upload(tempFilePath, (res) => {
                console.log("qiniuUploader upload res:" + JSON.stringify(res));
                var picture = util.getImgRealUrl(res.key)
                vm.setData({
                  files: vm.data.files.concat(picture)
                })
                console.log("filvjgkkbkjgjk：" + JSON.stringify(vm.data.files))
              }, (error) => {
                console.error('error: ' + JSON.stringify(error));
              })
            }
          }
        }, null);
        // }

      }
    })
  },
  //删除图片
  updateImage: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(JSON.stringify(e))
    console.log(vm.data.files[id])
    var files = vm.data.files
    files.splice(id, 1)
    vm.setData({
      files: files
    });
    console.log("图片组：" + JSON.stringify(vm.data.files))
  },
  //预览
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
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
    vm.getBookInfoByISBN()
  },
  //通过搜索ISBN
  inputISBN: function (e) {
    console.log(JSON.stringify(e))
    vm.setData({
      isbn: e.detail.value
    })
  },
  searchISBN: function (e) {
    vm.getBookInfoByISBN()
  },
  //ISBN获取图书列表
  getBookInfoByISBN: function () {
    var param = {
      isbn: vm.data.isbn,
    }
    util.getBookInfoByISBN(param, function (ret) {
      console.log("book ：" + JSON.stringify(ret))
      if (ret.data.code == "200") {
        var bookDetail = ret.data.obj
        console.log("图书详情：" + JSON.stringify(bookDetail))
        //图片处理
        bookDetail.images_medium = util.qiniuUrlTool(bookDetail.images_medium, "folder_index")
        vm.setData({
          bookDetail: bookDetail,
          searchHidden: true,
          book_id: bookDetail.id
        })
      }
    })
  },
  //发布信息
  formSubmit: function (e) {
    console.log('form submit：', e.detail.value)
    var title = e.detail.value.title
    var book_id = vm.data.book_id
    var intro = e.detail.value.intro
    vm.setData({
      tit: title,
      intro: intro
    })
    var twInfo = {
      "title": title,
      "intro": intro,
      "book_id": book_id
    }
    console.log("图片组：" + JSON.stringify(vm.data.files))
    var twStepInfos = []
    var files = vm.data.files
    for (var i = 0; i < files.length; i++) {
      var stepObj = {}
      stepObj.img = files[i]
      stepObj.type = 0
      twStepInfos.push(stepObj)
    }

    var param = {
      token: token,
      twInfo: twInfo,
      twStepInfos: twStepInfos
    }
    util.createTWBaseInfo(param, function (ret) {
      console.log("createTWBaseInfo：" + JSON.stringify(ret))
      if (ret.data.code == "200") {
        vm.setData({
          tit: "",
          intro: "",
        })
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '发布信息成功',
          success: function (res) {
            if (res.confirm) {
              vm.setData({
                files: [],
                isbn: "",  //isbn
                bookDetail: [],  //图书详情
                searchHidden: false,  //显示搜索
                book_id: "",
                tit: "",
                intro: "",
              })
              wx.navigateTo({
                url: "/pages/read/read"
              })
            }
          }
        })
      }
      else {
        wx.showModal({
          title: '提示',
          content: '发布信息失败',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    })
  },
  catchTitle: function (e) {
    vm.setData({
      tit: e.detail.value,
    })
  },
  catchIntro: function (e) {
    vm.setData({
      intro: e.detail.value,
    })
  },
})