// pages/home/recommendedCourses.js

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
import * as homedata from '../../utils/homedata-format';
import * as homeService from '../../services/home-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyText: '暂无课程',
    emptyIcon: '../../images/bg_img/no_data.png',

    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    navbarTabs: ['私教课','单次入场券'],

    personalClassList: [],
    singleClassList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var res = wx.getSystemInfoSync();
    this.setData({
      sliderLeft: (res.windowWidth / this.data.navbarTabs.length - sliderWidth) / 2
    })

    this.getPersonalClassList();
  
  },

  getPersonalClassList() {
    homeService.queryRecomdCourse('006').then((result) => {

      console.log('queryRecomdCourse *** ' + JSON.stringify(result));
      if (result.rs == 'Y') {
        this.setData({
          personalClassList: homedata.formatRecommendCourse(result.cardList)
        })
      }

    }).catch((error) => {
      console.log(error);
    })
  },
  getSingleClassList() {
    homeService.queryRecomdCourse('005').then((result) => {

      console.log('queryRecomdCourse *** ' + JSON.stringify(result));
      if (result.rs == 'Y') {
        this.setData({
          singleClassList: homedata.formatRecommendCourse(result.cardList)
        })
      }

    }).catch((error) => {
      console.log(error);
    })
  },

  // 点击事件 navbar
  bindNavbarTabTap(e) {

    this.setData({
      activeIndex: e.currentTarget.id,
      sliderOffset: e.currentTarget.offsetLeft
    });

    if (e.currentTarget.id == 0) {
      this.getPersonalClassList();
    } else {
      this.getSingleClassList();
    }
    
  },

  bindRecoCellTap(e) {
      var index = e.currentTarget.id;
      wx.navigateTo({
        url: 'onlinePaymentForClass?cardid=' + index + '&price=' + e.currentTarget.dataset.price,
      })
  },

  bindBuyTap(e) {
    var index = e.currentTarget.id;
    wx.navigateTo({
      url: 'onlinePaymentForClass?cardid=' + index + '&price=' + e.currentTarget.dataset.price,
    })
  },
})