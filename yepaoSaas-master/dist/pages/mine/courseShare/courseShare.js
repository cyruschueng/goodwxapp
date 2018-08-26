// pages/mine/courseShare/courseShare.js

import * as minedata from '../../../utils/minedata-format';
import * as mineService from '../../../services/mine-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyText: '暂无共享的课程',
    emptyIcon: '../../../images/bg_img/no_data.png',

    courseShareList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.getCourseShareList();
  },

  getCourseShareList () {
    mineService.queryShareCourse().then((result) => {

      console.log('queryShareCourse *** ' + JSON.stringify(result));
      if (result.rs == 'Y') {
        this.setData({
          courseShareList: minedata.formatShareCourseList(result.shareCourseMapList)
        })
      }

    }).catch((error) => {
      console.log(error);
    })
  },

  // 点击事件
  bindCourseCellTap (e) {

    wx.navigateTo({
      url: 'courseShareDetails?ptId=' + e.currentTarget.id,
    })

  }
  
})