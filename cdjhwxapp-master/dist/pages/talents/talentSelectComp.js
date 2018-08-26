// pages/talents/talentSelectComp.js

import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';
import contactsInfoStore from '../../services/contacts-info-store';
import { Base64 } from '../../utils/urlsafe-base64'
import moment from '../../utils/npm/moment';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    talentList: [],
    talentOne: {},
    reserveddate: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    let taletntListQs = Base64.decode(options.talentList)
    let talentListQsObj = JSON.parse(taletntListQs)

    var reserveddate = wx.getStorageSync('reservedDate');

    if (reserveddate == '') {
      reserveddate = moment().format('YYYY-MM-DD');
    }

    this.setData({
      talentOne: options.talentOne, 
      talentList: hoteldata.formatTalentSelectComp(talentListQsObj),
      reserveddate: reserveddate
    })
      
  },
  
  // 点击事件
  bindCheckboxChange (e) {

    var index = e.currentTarget.dataset.checkidx;
    var talentList = this.data.talentList;
    talentList.forEach((talt,i) => {
      talt.checked = false;
    })
    talentList[index].checked = true;

    this.setData({
      talentList: talentList
    })

  },
  bindConfirmTap () {
    this.data.talentList.forEach(talent => {
      if (talent.checked == true) {
        this.getTalentDetails(talent.talentId);
      }
    })
  },
  bindCancelTap () {
    wx.navigateBack({
      delta: 1
    })
  },
  getTalentDetails(talentId) {

    HotelDataService.queryTalentDetails(talentId, this.data.reserveddate).then((result) => {
      console.log("queryTalentDetails success...");

      wx.navigateTo({
        url: 'talentComparison?talentOne=' + this.data.talentOne + '&talentTwo=' + Base64.encodeURI(JSON.stringify(result))
      })

    }).catch((error) => {
      console.log(error);
    })
  }

})