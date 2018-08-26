// pages/endless/endless.js
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
  
  },
  select: function(e) {
    var grade=e.target.dataset.grade;
    if(grade==='easy'){
      //简单模式
      wx.navigateTo({
        url: '/pages/main_endless/main_endless?yunsuanshu=' + 2 + "&weishu=" + 1 + "&yunsuanfu=" + '+,-' + "&timushu=" + 10000 + "&xiaoshuwei=" + 0+"&mode=endless"+"&timushu=-1"+"&time=-1"+"&grade="+grade
      });
    } else if (grade === 'normal'){
      //一般模式
      wx.navigateTo({
        url: '/pages/main_endless/main_endless?yunsuanshu=' + 3 + "&weishu=" + 1 + "&yunsuanfu=" + '+,-,×' + "&timushu=" + 10000 + "&xiaoshuwei=" + 0 + "&mode=endless" + "&timushu=-1" + "&time=-1" + "&grade=" + grade
      });
    } else if (grade === 'hard') {
      //困难模式
      wx.navigateTo({
        url: '/pages/main_endless/main_endless?yunsuanshu=' + 3 + "&weishu=" + 2 + "&yunsuanfu=" + '+,-,×' + "&timushu=" + 10000 + "&xiaoshuwei=" + 0 + "&mode=endless" + "&timushu=-1" + "&time=-1" + "&grade=" + grade
      });
    } else {
      console.log("未知难度");
    }
  }
})