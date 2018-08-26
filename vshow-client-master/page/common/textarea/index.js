const { NetRequest, showTips } = require('../../../utils/util');
Page({

  onLoad(options) {
    let { url }  = options;
    this.setData({
      url: url
    });
  },

  sendLetter(e){
    let { letter } = e.detail.value;
    let { url } = this.data;
    letter = letter.trim();
    if (!url) return wx.showToast({
      title: '路径错误',
      image: '/img/prompt.png'
    });
    if(!letter) return wx.showToast({
      title: '没有输入文字！',
      image: '/img/prompt.png'
    });

    NetRequest({
      url: url,
      method: 'POST',
      data: {
        letter: letter
      },
      success(res) {
        //console.log(res);
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

  },
  onShareAppMessage() {
    return {
      title: '一起来玩转微V秀吧',
      path: '/page/tabBar/photo/index'
    }
  }
})