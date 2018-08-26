// pages/club/clubDynamics.js

import * as clubService from '../../services/club-service';
import * as clubdata from '../../utils/clubdata-format';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyText: '暂无动态',
    emptyIcon: '../../images/bg_img/no_data.png',

    clubListPageIndex: 1,
    clubdyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.getClubdyList();
  },

  // 上拉触底 加载
  onReachBottom: function (options) {
    console.log('到底啦！！');

    var clubListPageIndex = this.data.clubListPageIndex;
    clubListPageIndex++;
    this.setData({
      clubListPageIndex: clubListPageIndex
    })

    this.getClubdyList();
  },

  // 查询 俱乐部动态
  getClubdyList() {
    clubService.queryClubArticleList(this.data.clubListPageIndex).then((result) => {
      this.setData({
        clubdyList: clubdata.formatClubDynamicsList(result.result, this.data.clubdyList)
      })
    }).catch((error) => {
      console.log(error);
    })
  },

  // 点赞
  bindGoodSelectedTap (e) {
    
    var index = e.currentTarget.id;
    var clubdyList = this.data.clubdyList;

    if (clubdyList[index].isGoodSelected == false) {
      clubdyList[index].goodNum = clubdyList[index].goodNum + 1;
    } else {
      clubdyList[index].goodNum = clubdyList[index].goodNum - 1;
    }

    clubdyList[index].isGoodSelected = !clubdyList[index].isGoodSelected;

    this.setData({
      clubdyList: clubdyList
    })
  },

  // 俱乐部动态详情
  bindClubdyCellTap (e) {
    wx.navigateTo({
      url: 'clubDynamicsDetails?articleId=' + e.currentTarget.id,
    })
  }
})