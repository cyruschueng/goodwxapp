// pages/talents/talentListView.js

import moment from '../../utils/npm/moment';
import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    prePageType: '',

    windowHeight: '',
    leftTabs: [],
    talentList: [],
    allTalentList: [],
    itemSelectIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      prePageType: options.prepagetype ? options.prepagetype : ''
    })

    var res = wx.getSystemInfoSync();
    this.setData({
      'windowHeight': res.windowHeight
    });
    
    this.getTalentList(moment().format('YYYY-MM-DD'));

  },

  getTalentList(reservedDate) {
    HotelDataService.queryTalentList(reservedDate).then((result) => {
      console.log('queryTalentList .. ' + JSON.stringify(result))
      //婚礼人才 数据
      this.setData({
        talentList: hoteldata.formatWeddingTalent(result[0].talentList, '主持人'),
        allTalentList: result,
        leftTabs: hoteldata.formatWeddingTalentLeftTab(result)
      })
    }).catch((error) => {
      console.log(error);
    })
  },
  bindLeftTabsTap(e) {

    var id = e.currentTarget.id;
    console.log('itemSelectIndex = ' + id);
    this.setData({
      itemSelectIndex: id,
      talentList: hoteldata.formatWeddingTalent(this.data.allTalentList[id].talentList, this.data.leftTabs[id])
    })

    console.log('talentlist = ' + JSON.stringify(this.data.talentList));

  },
  goTalentDetailsPage(e) {
    wx.navigateTo({
      url: '../talents/talentDetails?talentid=' + e.currentTarget.dataset.talentid + '&prepagetype=' + this.data.prePageType,
    })
  },

})