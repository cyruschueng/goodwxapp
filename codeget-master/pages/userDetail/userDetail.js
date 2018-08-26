// userDetail.js
var util = require('../../utils/util.js');
var common = require('../../utils/common.js');

var Bmob = util.Bmob;
var app = getApp()



function youAreSelected(e, pro_title, pro_content,userId){
  var fId = e.detail.formId;
  console.log("youAreSelected")
  var temp = {
    "touser": userId,
    "template_id": "bZP0ZnUFSKQ8kkf58HxEsv1ZsFXb2asrFTwxqtlicmQ",
    "page": "",
    "form_id": fId,
    "data": {
      "keyword1": {
        "value": pro_title,
        "color": "#173177"
      },
      "keyword2": {
        "value": pro_content
      },
      "keyword3": {
        "value": util.formatTime(new Date())
      }
    },
    "emphasis_keyword": "keyword1.DATA"
  }
  Bmob.sendMessage(temp).then(function (obj) {
    console.log('发送成功')
  },
    function (err) {
      console.log(err)
      common.showTip('失败' + err)
    });
}

function completeMsg(e, pro_title) {
  var fId = e.detail.formId;
  console.log(fId)
  var temp = {
    "touser": user.get("openid"),
    "template_id": "SzEtF4kAoDd9e9hU4KRyhbk5YHGn7T_6Hs6Q-W0gw5g",
    "page": "",
    "form_id": fId,
    "data": {
      "keyword1": {
        "value": pro_title,
        "color": "#173177"
      },
      "keyword2": {
        "value": util.formatTime(new Date())
      }
    },
    "emphasis_keyword": "keyword1.DATA"
  }
  Bmob.sendMessage(temp).then(function (obj) {
    console.log('发送成功')
  },
    function (err) {
      console.log(err)
      common.showTip('失败' + err)
    });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    result: {},
    selected: false,
    proid: null,
    developerid: null,
    pro_own: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentUser = Bmob.User.current()
    var User = Bmob.Object.extend("_User");
    var query = new Bmob.Query(User);
    var that = this;
    var developerid = options.developerid;
    var proid = options.proid;
    that.setData({
      developerid: options.developerid,
      proid: options.proid
    });
    query.get(developerid, {
      success: function (result) {
        // 查询成功，调用get方法获取对应属性的值
        that.setData({
          userInfo: result
        });
      },
      error: function (object, error) {
        // 查询失败
      }
    });

    util.getPersonalData(developerid).then(res => {
      that.setData({
        result: res.data
      });
    });

    util.getProjectStatus(proid, developerid, currentUser.id).then(res => {
      that.setData({
        pro_own: res.data
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //选择开发者
  select: function (e) {
    var that = this
    var currentUser = Bmob.User.current()
    var proid = this.data.proid
    var developerid = this.data.developerid
    util.addOrder(proid, developerid, currentUser.id).then(res => {
      that.setData({
        selected: res.data
      });
      
    });
    util.updateProjectStatus(proid, "开发中").then(res => {
      that.setData({
        pro_own: res.data
      });
    });
    youAreSelected(e, that.data.pro_own.get("titile"), that.data.pro_own.get("content"),developerid)
    
  },

  complete: function (e) {
    var that = this;
    var proid = this.data.proid;
    util.updateProjectStatus(proid, "完成").then(res => {
      that.setData({
        pro_own: res.data
      });
    });
    completeMsg(e, that.data.pro_own.get("titile"))
  },

  chatroom: function (e) {
    var currentUser = Bmob.User.current()
    wx.navigateTo({
      url: '../chatroom/chatroom?ownerid=' + currentUser.id + "&developerid=" + this.data.developerid
    })
  },

  

})