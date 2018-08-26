const app = getApp();
const apiurl = 'https://friend-guess.playonwechat.com/';
import tips from '../../utils/tips.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pw_id: options.pw_id,
      type: options.type,
      name: options.name
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },


  // 获取评论内容
  getText(e){
    var text = e.detail.value;
    this.setData({
      text
    })
  },


  // 发表
  publishText(e){
    var that = this;
    var content = that.data.text;
    let form_id = e.detail.formId;
    if (content){
      wx.request({
        url: app.data.apiurl2 + "photo/comment-photo-wall?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
        data: {
          pw_id: that.data.pw_id,
          content: content
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("照片墙详情:", res);
          var status = res.data.status;
          if (status == 1) {
            tips.success('评论成功！');
            wx.request({
              url: app.data.apiurl1 + "api/save-form?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
              data: {
                form_id: form_id
              },
              header: {
                'content-type': 'application/json'
              },
              method: "GET",
              success: function (res) {
              }
            })
            wx.navigateBack({
              url: '../inform/inform?pw_id=' + that.data.pw_id + '&type=' + that.data.type + '&name=' + that.data.name
            })
          } else {
            tips.alert(res.data.msg);
          }
        }
      })
    }else{
      tips.alert('内容不得为空');
    }
   
  },

  
})