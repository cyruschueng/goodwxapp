// pages/mine/page/result/index.js
const { imgDirUrl } = require('../../../../config.js');
Page({

  data: {
    result: null
  },

  onLoad(options){
    let { index } = options;
    this.getResult(index)
  },

  getResult(index){
    let self = this;
    let pages = getCurrentPages();
    let prePage = pages[pages.length-2];
    let { quizList } = prePage.data;
    if (quizList){  //存在列表时候
      let result = quizList[index];
      self.setData({
        result
      });
    }
  },

  onShareAppMessage(res) {
    let { _id, author: {nickName} } = this.data.result;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    //console.log(imgDirUrl);
    return {
      title: `来自${nickName}的一个问题`,
      path: `/page/mine/pages/vask/index?id=${_id}`,
      imageUrl: `${imgDirUrl}share_banner.jpg`
    }
  }
})