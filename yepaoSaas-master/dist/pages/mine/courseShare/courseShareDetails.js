// pages/mine/courseShare/courseShareDetails.js

import weSwiper from '../../../utils/weSwiper/weSwiper.js';
import * as minedata from '../../../utils/minedata-format';
import * as mineService from '../../../services/mine-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rightItemHidden: true,

    shareDetailList: [],

    // 浏览视频
    videoIconUrl: '../../../images/icon/delete_back.png',
    showVideoHidden: true,
    videoIndex: 1,
    videoUrlsBrowse: [],

    videoContext: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getCourseShareDetails(options.ptId);

  },

  getCourseShareDetails(ptId) {
    mineService.queryShareCourseDetail(ptId).then((result) => {

    // console.log('queryShareCourseDetail *** ' + JSON.stringify(result));
      var formatList = minedata.formatShareCourseDetails(result.courseShareDetailList);
      this.setData({
        shareDetailList: formatList.courseList,
        videoUrlsBrowse: formatList.videoList
      })
      // console.log('queryShareCourseDetail *** ' + JSON.stringify(this.data.shareDetailList));

      this.initWeSwiper(formatList.videoList);
      

    }).catch((error) => {
      console.log(error);
    })
  },

  // weswiper 事件
  initWeSwiper(videoUrlsBrowse) {
    var me = this;
    new weSwiper({
      animationViewName: 'animationData',
      slideLength: videoUrlsBrowse.length,
      direction: 'horizontal',
      initialSlide: 0,
      /**
       *  swiper从一个slide过渡到另一个slide结束时执行
       */
      onSlideChangeEnd(weswiper) {

        console.log("weswiper == " + weswiper.activeIndex)
        me.setData({
          videoIndex: weswiper.activeIndex + 1,
        })
      },

    })
  },
  touchstart(e) {
    this.weswiper.touchstart(e)
  },
  touchmove(e) {
    this.weswiper.touchmove(e)
  },
  touchend(e) {
    this.weswiper.touchend(e)
  },
  // 视频播放结束 播放下一个视频 -- 
  bindVideoPalyEnded(e) {

    var index = +e.currentTarget.id;
    if (index < this.data.videoUrlsBrowse.length - 1) {
      index = index + 1;
      this.videoContext = wx.createVideoContext('' + index);
      this.videoContext.play();
      this.weswiper.slideTo(index);
      console.log('bindVideoPalyEnded ...' + index);
    }
    
    console.log(' ... end');

  },
  bindCloseVideoShowTap(e) {

    this.setData({
      showVideoHidden: true
    })

  },

  bindVideoCellTap (e) {
    var index = e.currentTarget.id;

    this.setData({
      showVideoHidden: false
    })
    this.weswiper.slideTo(+index);
    this.videoContext = wx.createVideoContext(index);
    this.videoContext.play();

  }

})