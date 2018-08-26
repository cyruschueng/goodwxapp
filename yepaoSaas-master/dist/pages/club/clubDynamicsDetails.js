// pages/club/clubDynamicsDetail.js

import * as clubService from '../../services/club-service';
import * as clubdata from '../../utils/clubdata-format';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    clubService.queryClubArticleDetail(options.articleId).then((result) => {
      this.setData({
        article: clubdata.formatClubDynamicsListDetail(result.result)
      })
    }).catch((error) => {
      console.log(error);
    })

  },

  bindGoodSelectedTap (e) {
    var article = this.data.article;

    if (article.isGoodSelected == false) {
      article.goodNum = article.goodNum + 1;
    } else {
      article.goodNum = article.goodNum - 1;
    }

    article.isGoodSelected = !article.isGoodSelected;

    this.setData({
      article: article
    })
  }
})