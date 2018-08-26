// pages/celebration/celebrationShowMore.js

import weSwiper from '../../utils/weSwiper/weSwiper.js'
import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {

    navbarTabs: ['图片', '视频'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    // 控制显示
    showPicHidden: true,
    // 图片列表
    imgUrls: [],
    // 图片浏览
    picIndex: 1,
    picTime: '',
    picUrls: [],

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

    var res = wx.getSystemInfoSync();
    this.setData({
      'windowHeight': res.windowHeight,
      celebrationid: options.celebrationid
    });

    this.getCelePic();
    // this.getCeleVideo();

  },

  // 取数据
  getCelePic() {
    // 图片
    HotelDataService.queryCelebrationDetailPics(this.data.celebrationid).then((result) => {
      this.setData({
        imgUrls: hoteldata.formatCeleDetailMorePic(result),
        picUrls: hoteldata.formatCeleDetailMorePicBrowse(result)
      })
    }).catch((error) => {
      console.log(error);
    })
  },
  getCeleVideo(celebrationid) {
    HotelDataService.queryCelebrationDetailMedia(this.data.celebrationid).then((result) => {
      this.setData({
        showBigVideoHiddenL: false,
        videoUrls: hoteldata.formatCeleDetatilMoreVideo(result),
        videoUrlsBrowse: hoteldata.formatCeleMoreVideoBrowse(result)
      })
      //初始化 视频浏览器 
      this.initWeSwiper(this.data.videoUrlsBrowse);

    }).catch((error) => {
      console.log(error);
    })
  },

  bindImageTap(e) {
    console.log('tap index =' + e.currentTarget.dataset.index);
    this.setData({
      showPicHidden: false,
      picTime: this.data.picUrls[e.currentTarget.dataset.index - 1].time,
      picIndex: e.currentTarget.dataset.index
    })

  },
  bindChangePicTap(e) {
    // console.log('current = ' + e.detail.current);
    this.setData({
      picIndex: e.detail.current + 1,
      picTime: this.data.picUrls[e.detail.current].time
    })
  },
  bindPackupPic(e) {

    this.setData({
      showPicHidden: true,
    })

  },
  // 点击事件
  bindNavbarTabTap: function (e) {
    // console.log(e.currentTarget.offsetLeft);

    switch (+e.currentTarget.id) {
      case 0:
        // 图片 数据
        if (this.data.imgUrls.length <= 0) {
          this.getCelePic();
        }
      break;
      case 1:
        //视频 数据
        if (this.data.videoUrls.length <= 0) {
          this.getCeleVideo();
        }
      break;
    }

    this.setData({
      activeIndex: e.currentTarget.id,
    });
  },

  // weswiper 事件
  initWeSwiper(videoUrlsBrowse) {
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

  bindVideoTap(e) {

    // this.weswiper.slideTo(e.currentTarget.id);
    console.log(e.currentTarget.id);
    this.setData({
      showBigVideoHidden: false,
      videoTime: this.data.videoUrlsBrowse[0].time
    })
  },
  bindPackupVideo() {
    this.setData({
      showBigVideoHidden: true,
    })
  }

})