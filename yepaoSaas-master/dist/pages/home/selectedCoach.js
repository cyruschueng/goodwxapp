// pages/home/selectedCoach.js
import * as homedata from '../../utils/homedata-format';
import * as homeService from '../../services/home-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],
    searchText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindSearchItemTap (e) {
    var index = e.currentTarget.id;
    var searchList = this.data.searchList;

    wx.navigateBack({
      delta: 1
    })

    console.log('searchList[index] .. ' + JSON.stringify(searchList[index]));

    // 保存所选教练
    wx.setStorageSync('buyCourseSelectCoach', searchList[index]);

  },

  bindSearchInput (e) {
    
    var value = e.detail.value;
    this.setData({
      searchText: value
    })
  },

  bindConfiSearchTap() {
    homeService.queryCoachList(this.data.searchText).then((result) => {

      console.log('queryCoachList *** ' + JSON.stringify(result));
      if (result.errCode == 0) {
        this.setData({
          searchList: homedata.formatCoachList(result.ptList)
        })
      } else if (result.errMsg == '无教练！') {
        wx.showToast({
          title: '查无此教练',
          icon: 'none',
          duration: 2000
        })
      }

    }).catch((error) => {
      console.log(error);
    })
  }
})