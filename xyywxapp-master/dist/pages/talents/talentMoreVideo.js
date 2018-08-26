// pages/talents/talentMoreVideo.js

import weSwiper from '../../utils/weSwiper/weSwiper.js'
import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';

const option = {
  /**
   * 页面的初始数据
   */
  data: {
    videoList: false,
    showBigVideoHidden: true,
    videoUrls: [],
    // 浏览视频
    videoIndex: 1,
    videoTime: '',
    videoUrlsBrowse: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;

    // 视频
    HotelDataService.queryTalentMoreVideo(options.talentid).then((result) => {
      // console.log("queryTalentMorePic success = " + JSON.stringify(result));
      me.setData({
        videoUrls: hoteldata.formatTalentMoreVideo(result),
        videoUrlsBrowse: hoteldata.formatTalentMoreVideoBrowse(result)
      })
      //初始化 视频浏览器 
      me.initWeSwiper(me.data.videoUrlsBrowse);

    }).catch((error) => {
      console.log(error);
    })

  },
  // weswiper 事件
  initWeSwiper (videoUrlsBrowse) {
    var me = this;
    new weSwiper({
      animationViewName: 'animationData',
      slideLength: videoUrlsBrowse.length,
      initialSlide: 0,
      /**
       *  swiper从一个slide过渡到另一个slide结束时执行
       */
      onSlideChangeEnd(weswiper) {

        console.log("weswiper == " + weswiper.activeIndex)
        me.setData({
          videoIndex: weswiper.activeIndex + 1,
          videoTime: videoUrlsBrowse[weswiper.activeIndex].time
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

  // 点击事件
  bindVideoTap (e) {

    // this.weswiper.slideTo(e.currentTarget.id);
    console.log(e.currentTarget.id);
    this.setData({
      showBigVideoHidden: false,
      videoTime: this.data.videoUrlsBrowse[0].time
    })
  },
  bindPackupVideo () {
    this.setData({
      showBigVideoHidden: true,
    }) 
  }
  
}
Page(option)