var Util = require('../../utils/util.js');
var User = require('../../utils/UserManager.js');
var Api = require('../../utils/GroupRequest.js');
var app = getApp();
var showTips = function (that, msg) {
  that.setData({
    showTopTips: true,
    tipMsg: msg
  });
  setTimeout(function () {
    that.setData({
      showTopTips: false,
    });
  }, 3000);
}
var vote = function(requestData){
  Api.request({
    url: '/api/vote/v1/addVote',
    data: requestData,
    method: 'POST',
    success: function (res) {
      wx.showToast({
        title: '添加成功',
      })
      wx.redirectTo({
        url: '../voteDetail/voteDetail?voteId=' + res.voteId
      })
    },
    compelete: function () {
      wx.hideLoading();
    }
  })
};
Page({
  data: {
    showTopTips: false,
    uploadHidden: false,
    checkboxItems: [
      { comment: '', value: '1', checked: true },
      { comment: '', value: '2', checked: true }
    ],
    date: Util.getNowFormatDate(1000 * 60 * 30),
    time: Util.getNowFormatTime(1000 * 60 * 30),

    accounts: [],
    accountIndex: 0,
    isAgree: false,
    themeCount: '0/80',
    addMore: false,
    switched: false,
    files: []
  },
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  themeInput: function (e) {
    this.setData({
      theme: e.detail.value,
      themeCount: e.detail.value.length + "/80"
    })
  },
  optionInput: function (e) {
    var checkBox = this.data.checkboxItems;
    checkBox[e.target.dataset.index].comment = e.detail.value;
    this.setData({
      checkboxItems: checkBox
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindAccountChange: function (e) {
    console.log(e)
    this.setData({
      accountIndex: e.detail.value
    })
  },
  switchhandle: function (e) {
    this.setData({
      switched: e.detail.value
    })
  },
  addCheckItem: function (e) {
    this.data.checkboxItems.push({ comment: '', value: this.data.checkboxItems.length + 1, checked: false });
    this.data.accounts.push(this.data.checkboxItems.length);
    this.setData({
      checkboxItems: this.data.checkboxItems,
      accounts: this.data.accounts,
      addMore: this.data.checkboxItems.length > 9 ? true : false
    })
  },
  deleteClick: function (e) {
    this.data.checkboxItems.splice(e.currentTarget.dataset.index, 1);
    this.data.accounts.splice(this.data.checkboxItems.length, 1);
    this.setData({
      checkboxItems: this.data.checkboxItems,
      accounts: this.data.accounts,
      accountIndex: this.data.accounts.length - 1,
      addMore: this.data.checkboxItems.length > 9 ? true : false
    });
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  onLoad: function () {
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      this.data.accounts.push(i + 1);
    }
    console.log(Util.getNowFormatDate(1000 * 60 * 30));
    this.setData({
      accounts: this.data.accounts
    })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var files = that.data.files.concat(res.tempFilePaths);
        console.log(files);
        that.setData({
          files: files,
          uploadHidden: true
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  deleteImage: function (e) {
    this.setData({
      files: [],
      uploadHidden: false
    });
  },
  publish: function (e) {
    if (!this.data.theme) {
      showTips(this, "请填写投票主题");
      return;
    }
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      if (!this.data.checkboxItems[i].comment) {
        showTips(this, "请把选项填写完整");
        return;
      }
    }

    var requestData = {};

    requestData.theme = this.data.theme;
    requestData.createrId = User.Singleton.getInstance().getLoginUserInfo().uid;
    requestData.comment = "";
    requestData.maxSelect = parseInt(this.data.accountIndex) + 1;
    requestData.options = this.data.checkboxItems;
    requestData.anonymous = this.data.switched ? 1 : 0;
    requestData.endTime = this.data.date + " " + this.data.time + ":00";
    wx.showLoading({
      title: '发布中...',
    })
    if (this.data.files.length > 0) {
      Api.uploadFile({
        url: "/api/image/imageUpload",
        filePath: this.data.files[0],
        name: 'file',
        success: function (data) {
          console.log(data);
          requestData.imgurl = data.url;
          vote(requestData);
        }
      })
    }else{
      vote(requestData);
    }
  }
});