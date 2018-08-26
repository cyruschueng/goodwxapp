// pages/home/personalTrainer.js

import * as homedata from '../../utils/homedata-format';
import * as homeService from '../../services/home-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 屏幕宽度
    windowWidth: 0,

    starUrl: '../../images/icon/star_pink.png',
    emptUrl: '../../images/icon/star_g.png',

    personalList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var res = wx.getSystemInfoSync();
    this.setData({
      windowWidth: res.windowWidth
    })

    homeService.queryMyPersonalCoach().then((result) => {

      console.log('queryMyPersonalCoach *** ' + JSON.stringify(result));
      if (result.rs == 'Y') {
        this.setData({
          personalList: homedata.formatPersonalTrainer(result.cards)
        })
      }

    }).catch((error) => {
      console.log(error);
    })
    
  },


})