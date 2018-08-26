// pages/talents/talentComparison.js

import weSwiper from '../../utils/weSwiper/weSwiper.js'
import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';
import { Base64 } from '../../utils/urlsafe-base64'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    introduceHidden: true,
    showBigVideoHidden: true,

    comparisons: [],
    
    // 浏览大图视频
    showBigIndex: 1,
    showBigTime: '',
    showBigUrlsBrowse: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var talentOneQs = Base64.decode(options.talentOne)
    var talentOneQsObj = JSON.parse(talentOneQs)

    var talentTwoQs = Base64.decode(options.talentTwo)
    var talentTwoQsObj = JSON.parse(talentTwoQs)

    // console.log('talentOne = ' + JSON.stringify(talentOneQsObj));
    // console.log('talentTwo = ' + JSON.stringify(talentTwoQsObj));

    var comparisons = [];
    comparisons.push(hoteldata.formatTalentComparison(talentOneQsObj));
    comparisons.push(hoteldata.formatTalentComparison(talentTwoQsObj));

    // console.log('talentOne = ' + JSON.stringify(hoteldata.formatTalentComparison(talentOneQsObj)));
    console.log('talent ... ' + JSON.stringify(comparisons));

    this.setData({
      comparisons: comparisons
    })

  },

  bindIntroduceHiddenTap (e) {

    var index = e.currentTarget.id;
    var me = this;

    var lefthidden = this.data.comparisons[0].introduce.introduceHidden;
    var righthidden = this.data.comparisons[1].introduce.introduceHidden;

    switch (+index) 
    {
      case 0:
        me.setData({
          'comparisons[0].introduce.introduceHidden': !lefthidden
        })
      break;
      case 1:
        me.setData({
          'comparisons[1].introduce.introduceHidden': !righthidden
        })
      break;
    }

  },
  bindShowImgHiddenTap (e) {
    var index = e.currentTarget.id;
    var me = this;

    var lefthidden = this.data.comparisons[0].show.showImgHidden;
    var righthidden = this.data.comparisons[1].show.showImgHidden;

    switch (+index) {
      case 0:
        me.setData({
          'comparisons[0].show.showImgHidden': !lefthidden
        })
        break;
      case 1:
        me.setData({
          'comparisons[1].show.showImgHidden': !righthidden
        })
        break;
    }
  },
  bindShowComsHiddenTap (e) {
    var index = e.currentTarget.id;
    var me = this;

    var lefthidden = this.data.comparisons[0].comment.showAllComsHidden;
    var righthidden = this.data.comparisons[1].comment.showAllComsHidden;

    switch(+index) {
    case 0:
      me.setData({
        'comparisons[0].comment.showAllComsHidden': !lefthidden
      })
    break;
    case 1:
      me.setData({
        'comparisons[1].comment.showAllComsHidden': !righthidden
      })
    break;
    }
  },
  bindShowImgTap (e) {
      var index = e.currentTarget.id;
      var compIndex = e.currentTarget.dataset.compindex;
      // console.log(index);
      var urls = this.data.comparisons[compIndex].show.allShowImgs;
      this.setData({
        showBigIndex: (+index)+1,
        showBigTime: urls[index].time,
        showBigVideoHidden: false,
        showBigUrlsBrowse: urls
      })
      this.initWeSwiper(urls, +index);

  },

  // weswiper 事件 查看大图片 视频
  initWeSwiper(urls, imgIndex) {
    var me = this;
    new weSwiper({
      animationViewName: 'animationData',
      slideLength: urls.length,
      initialSlide: imgIndex,
      /**
       *  swiper从一个slide过渡到另一个slide结束时执行
       */
      onSlideChangeEnd(weswiper) {

        console.log("weswiper == " + weswiper.activeIndex)
        me.setData({
          showBigIndex: weswiper.activeIndex + 1,
          showBigTime: urls[weswiper.activeIndex].time
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
  bindPackupVideo() {
    this.setData({
      showBigVideoHidden: true,
    })
  }

})