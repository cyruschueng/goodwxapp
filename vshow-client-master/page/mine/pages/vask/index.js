// pages/mine/page/vquiz/index.js
const { askQuizUrl, getQuizUrl } = require('../../../../config.js');
const { NetRequest, showTips } = require('../../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    submitText: '提交回答',
    quiz: null    //上传题目成功后赋值给他，以便转发
  },

  onLoad(options){
    
    let { id } = options;
    if(id && id != -1){  //id存在
      app.getUserInfo(userInfo => {
        //console.log(userInfo);
        this.loadData(id);
      });

    }else{
      showTips('问题出现错误');
      setTimeout(()=>{
        wx.switchTab({
          url: '/page/tabBar/mine/index',
        });
      }, 1000);
      
    }
  },

  loadData(id){
    let self = this;
    wx.showLoading({
      title: '加载数据中...',
      mask: true
    });

    NetRequest({
      url: getQuizUrl,
      data: {
        id
      },
      success(res) {
        //console.log(res);
        
        if (-res.statusCode === -200) { //成功
          showTips('获取问题成功');
          self.setData({
            quiz: res.data
          });
        } else {
          showTips('获取问题失败');
          setTimeout(() => {
            wx.switchTab({
              url: '/page/tabBar/mine/index',
            });
          }, 1000);
        }
      },
      fail() {
        showTips('获取问题失败');
         setTimeout(() => {
          wx.switchTab({
            url: '/page/tabBar/mine/index',
          });
        }, 1000);
      },

      complete(){
        //wx.hideLoading();
      }
    });    

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
    let { askText, isAnonym } = e.detail.value;
    let { quiz: { _id}} = this.data;
    let self = this;
    if(!app.globalData.userInfo){
      showTips('登录失败,请重新登录');
      return setTimeout(() => {
        wx.switchTab({
          url: '/page/tabBar/mine/index',
        });
      }, 1000);
    }
    askText = askText.trim();
    if (!askText) return showTips('回答不能为空');
    self.setData({
      isLoading: true,
      submitText: '上传中...'
    });

    NetRequest({
      url: askQuizUrl,
      data: {
        askText, isAnonym, quizId: _id
      },
      success(res){
        console.log(res);
        if (-res.statusCode === -200){ //成功
          showTips('恭喜,回答成功');
          setTimeout(()=> {
            wx.switchTab({
              url: '/page/tabBar/mine/index',
            });
          }, 1000);
        }else{
          showTips('上传失败,请重试');
          self.setData({
            textarea: JSON.stringify(res),
            isLoading: false,
            submitText: '提交回答'
          });
        }
      },
      fail(){
        showTips('上传失败,请重试');
        self.setData({
          isLoading: false,
          submitText: '提交回答'
        });
      }
    });
  }
})