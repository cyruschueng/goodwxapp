// pages/mine/page/vquiz/index.js
const { saveQuizUrl, imgDirUrl } = require('../../../../config.js');
const { NetRequest, showTips } = require('../../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled1: true,
    disabled2: true,
    isLoading: false,
    showShareBtn: false,
    submitText: '提交生成',
    hideTips: true,
    quiz: null    //上传题目成功后赋值给他，以便转发
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  textBlur(e) {
    let { value } = e.detail;
    this.setData({
      disabled2: !value.trim()
    });
  },

  typeBlur(e){
    let { value } = e.detail;
    this.setData({
      disabled1: !value.trim()
    });
  },

  submit(e){
    let { quizType, quizText } = e.detail.value;
    let self = this;
    self.setData({
      isLoading: true,
      submitText: '生成中...'
    });

    NetRequest({
      url: saveQuizUrl,
      data: {
        quizType, quizText
      },
      success(res){
        console.log(res);
        if (-res.statusCode === -200){ //成功
          showTips('上传成功,请转发给微信好友答题');
          self.setData({
            isLoading: false,
            submitText: '提交生成',
            quiz: res.data,
            showShareBtn: true
          });
        }
      },
      fail(){
        showTips('上传失败,请重试');
      },
      complete(){
        self.setData({
          isLoading: false,
          submitText: '提交生成'
        });
      }
    });
  },

  onShareAppMessage(res){
    let { nickName } = app.globalData.userInfo, id;
    
    if(this.data.quiz){
      id = this.data.quiz._id;
    }else{
      id = -1;
    }
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    
    return {
      title: `来自${nickName}的一个问题`,
      path: `/page/mine/pages/vask/index?id=${ id }`,
      imageUrl: `${imgDirUrl }share_banner.jpg`
    }
  },

  showTips() {
    this.setData({
      hideTips: false
    });
  },

  hideTips() {
    this.setData({
      hideTips: true
    });
  }
})