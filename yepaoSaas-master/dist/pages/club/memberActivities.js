// pages/club/memberActivities.js

import * as clubService from '../../services/club-service';
import * as clubdata from '../../utils/clubdata-format';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyText: '暂无活动',
    emptyIcon: '../../images/bg_img/no_data.png',

    clubList: [],
    clubListPageIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getClubList();
  },
  // 上拉触底 加载
  onReachBottom: function (options) {
    console.log('到底啦！！');

    var clubListPageIndex = this.data.clubListPageIndex;
    clubListPageIndex++;
    this.setData({
      clubListPageIndex: clubListPageIndex
    })

    this.getClubList();
  },

  // 查询推荐活动
  getClubList() {
    clubService.quaryClubList(this.data.clubListPageIndex, 'Y').then((result) => {
      this.setData({
        clubList: clubdata.formatClubList(result.result, this.data.clubList)
      })
      console.log(' out .... ' + JSON.stringify(this.data.clubList));
    }).catch((error) => {
      console.log(error);
    })
  },

  bindClubCellTap(e) {
    wx.navigateTo({
      url: 'memberActivitiesDetails?activeId=' + e.currentTarget.id,
    })
  }
})