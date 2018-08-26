// pages/index/detail/index.js
var Bmob = require('../../../utils/bmob.js');
Page({
  data: {
    rows: {}
  },
  onLoad: function (e) {
    // 页面初始化 options为页面跳转所带来的参数

    console.log(e.objectId)
    var objectId = e.objectId;
    var that = this;
    // if (!e.objectId) {
    //   common.showTip("请重新进入", "loading");
    //   return false;
    // }

    var Book = Bmob.Object.extend("book");
    var query = new Bmob.Query(Book);

    query.get(objectId, {
      success: function (result) {
        console.log(result);

        that.setData({
          rows: result,

        })
        // var typeArray = new Array();
        // for (var i = 0, j = 0, lenI = booktype.length; i < lenI; ++i) {
        //   if (booktype[i].checked == true) {
        //     typeArray[j] = booktype[i].name;
        //     j++;
        //   }
        // }
        // var themeArray = new Array();
        // for (var i = 0, j = 0, lenI = booktheme.length; i < lenI; ++i) {
        //   if (booktheme[i].checked == true) {
        //     themeArray[j] = booktheme[i].name;
        //     j++;
        //   }
        // }
        // var categoryArray = new Array();
        // for (var i = 0, j = 0, lenI = bookcategory.length; i < lenI; ++i) {
        //   if (bookcategory[i].checked == true) {
        //     categoryArray[j] = bookcategory[i].name;
        //     j++;
        //   }
        // }
        // var levelArray = new Array();
        // for (var i = 0, j = 0, lenI = booklevel.length; i < lenI; ++i) {
        //   if (booklevel[i].checked == true) {
        //     levelArray[j] = booklevel[i].name;
        //     j++;
        //   }
        // }
        // The object was retrieved successfully.        
      },
      error: function (result, error) {
        console.log("查询失败");
      }
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})