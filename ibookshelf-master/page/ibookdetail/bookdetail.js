var app = getApp()
var util = require('../../util/util.js')

Page({
  data: {
    bookinfo: {},
    btn_loading: false,
    btn_addFlag: false,
    btn_autoAddFlag: false,
    btn_delFlag: false
  },
  onLoad: function (options) {
    var that = this
    var bookinfo = null

    var btn_addFlag = false
    var btn_autoAddFlag = false
    var btn_delFlag = options.delFlag

    // 判断书是否已收藏，若已收藏则从全局变量app.globalData中获取图书信息，并显示移出书架按钮
    // 判断依据为options.delFlag存在(即从藏书列表中点进来的，必然是收藏的书籍)，或搜索服务器数据
    if (btn_delFlag) {
      bookinfo = app.globalData.bookList[options.isbn13]
      that.setData({
        bookinfo: bookinfo,
        btn_addFlag: btn_addFlag,
        btn_autoAddFlag: btn_autoAddFlag,
        btn_delFlag: options.delFlag
      })
    } else {
      // Query the server to determine whether the book has been collected
      util.checkBookInfo(options.isbn13, function (isOwned) {

        if (isOwned) {
          btn_delFlag = true
          that.setData({
            btn_delFlag: btn_delFlag
          })
        }
        util.queryBookInfo(options.isbn13, function (bookinfo) {

          if (typeof bookinfo.code === 'number') {
            wx.showModal({
              content: '抱歉亲，图书未找到',
              showCancel: false,
              confirmText: '饶了小厉',
              complete: function () {
                wx.switchTab({
                  url: '../ibookshelf/index'
                })
              }
            })
          } else {
            if (!btn_delFlag) {
              // 获取是否自动放入书架配置
              wx.getStorage({
                key: 'autoAdd',
                success: function (res) {
                  btn_autoAddFlag = res.data
                }
              })

              // 若自动放入书架，则进行放入处理，并显示自动放入书架按钮
              if (btn_autoAddFlag) {
                util.addBookInfo(bookinfo, function(ret) {
                  if (ret.retCode != 0) {
                    wx.showModal({
                      content: '添加失败，请再试一次，要对准条形码哦',
                      showCancel: false,
                      complete: function () {
                        wx.switchTab({
                          url: '../ibookshelf/index'
                        })
                      }
                    })
                  }
                })
              } else { // 否则显示放入书架按钮
                btn_addFlag = true
              }
            }

            that.setData({
              bookinfo: bookinfo,
              btn_addFlag: btn_addFlag,
              btn_autoAddFlag: btn_autoAddFlag
            })
          }

        })
      })
    }
  },
  addToBookshelf: function () {
    console.log('addToBookshelf')

    // 修改"放入书架"按钮的加载状态
    this.setData({
      btn_loading: !this.data.btn_loading
    })

    util.addBookInfo(this.data.bookinfo, function () {
      if (ret.retCode != 0) {
        wx.showModal({
          content: '添加失败，请再试一次，要对准条形码哦',
          showCancel: false,
          complete: function () {
            this.setData({
              btn_loading: !this.data.btn_loading
            })
          }
        })
      } else {
        wx.switchTab({
          url: '../ibookshelf/index'
        })
      }
    })
  },
  removeFromBookshelf: function () {
    console.log('removeFromBookshelf')

    // 修改"移出书架"按钮的加载状态
    this.setData({
      btn_loading: !this.data.btn_loading
    })

    util.delBookInfo(this.data.bookinfo, function () {
      wx.switchTab({
        url: '../ibookshelf/index'
      })
    })
  }
})