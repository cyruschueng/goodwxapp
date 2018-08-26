// pages/talents/talentMorePic.js

import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制显示
    showPicHidden: true,
    // 图片列表
    imgUrls:[],
    // 图片浏览
    picIndex: 1,
    picTime: '',
    picUrls: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
    // 图片
    var me = this;
    HotelDataService.queryTalentMorePic(options.talentid).then((result) => {
      // console.log("queryTalentMorePic success = " + JSON.stringify(result));
      me.setData({
        imgUrls: hoteldata.formatTalentMorePic(result),
        picUrls: hoteldata.formatTalentMorePicBrowse(result)
      })

    }).catch((error) => {
      console.log(error);
    })

  },

  bindImageTap (e) {
    console.log('tap index =' + e.currentTarget.dataset.index);
    this.setData({
      showPicHidden: false,
      picTime: this.data.picUrls[e.currentTarget.dataset.index-1].time,
      picIndex: e.currentTarget.dataset.index
    })

  },
  bindChangePicTap (e) {
    // console.log('current = ' + e.detail.current);
    this.setData({
      picIndex: e.detail.current + 1,
      picTime: this.data.picUrls[e.detail.current].time
    })
  },
  bindPackupPic (e) {

    this.setData({
      showPicHidden: true,
    })

  }



})