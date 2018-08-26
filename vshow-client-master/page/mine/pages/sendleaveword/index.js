const { addLeaveWords } = require('../../../../config');
const { NetRequest, showTips } = require('../../../../utils/util');
Page({

  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  sendLetter(e){
    let { letter } = e.detail.value;
    letter = letter.trim();
    if(!letter) return wx.showToast({
      title: '没有输入文字！',
      image: '/img/prompt.png'
    });

    NetRequest({
      url: addLeaveWords,
      method: 'POST',
      data: {
        letter: letter
      },
      success(res) {
        console.log(res);
        let { statusCode, data } = res;
        if (-statusCode === -200) {
          showTips('上传成功!', true);
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

  }
})