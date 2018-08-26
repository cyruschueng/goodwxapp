const { fetchLeaveWords, staticHostUrl } = require('../../../../config');
const { NetRequest, showTips } = require('../../../../utils/util');
const app = getApp();
Page({

  onShow: function (options) {
    let self = this;
    let parseNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
    app.getUserInfo(() => {
      wx.showLoading({
        title: '获取中...'
      });
      NetRequest({
        url: fetchLeaveWords,
        method: 'POST',
        data: {

        },
        success(res) {
          //console.log(res);
          let { statusCode, data } = res;
          if (-statusCode === -200) {
            if (data.length) {
              data.forEach(item => {
                let time = new Date(item.cretime);
                item.author.avatarUrl = /http/.test(item.author.avatarUrl) ? item.author.avatarUrl : staticHostUrl + item.author.avatarUrl;
                item.date = time.getDate();
                item.month = parseNums[time.getMonth() + 1];
                item.day = parseNums[time.getDay()];
                

              });
            }
            self.setData({
              leaveWords: data
            });
            showTips('获取成功!');
          } else {
            showTips('上传失败,请重试');
          }

        },
        fail() {
          showTips('上传失败,请重试');
        },
        complete() {

        }
      });
    });
    
  },

  onSend(){
    wx.navigateTo({
      url: '../sendleaveword/index'
    })
  },
  onShareAppMessage() {
    return {
      title: '一起来玩转微V秀吧',
      path: '/page/tabBar/photo/index'
    }
  }
})