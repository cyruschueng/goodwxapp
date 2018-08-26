// pages/talents/talentDetails.js

import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';
import { Base64 } from '../../utils/urlsafe-base64';
import moment from '../../utils/npm/moment';
import shoppingCarStore from '../../services/shopping-car-store';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    talentId: 0,
    talentType: '',
    // introduce: [{
    //   name: 'div',
    //   attrs: {
    //     class: 'div_class',
    //     style: 'font-size: 13px; color: #999999;'
    //   },
    //   children: [{
    //     type: 'text',
    //     text: '&nbsp;&nbsp;创意无限，为每一对有婚礼梦想的新人精雕细琢专属他们的完美品质婚礼！用我对时尚的敏锐触觉，和数百场婚礼策划经验，去为80后的新人诠释幸福，捍卫爱情美好的瞬间！将新人的个性与激情演绎成永恒的浪漫。'
    //   }]
    // }],
    comments: [],
    allComments: [],
    showAllcomment: false,

    // 评分
    // score: ['red', 'red', 'red', '', ''],
    tatDetl: null,
    completeTalent: [],

    // 时间段 选择器
    selectTimes: {
      selectTimePickerHidden: true,
      reservedDate: '',
      startHour: [],
      startMint: [],
      endHour: [],
      endMint: [],
      startTime: '',
      endTime: ''
    },
    selectTimeValue: '',

    // 入口 标识
    prePageType: '',

    // 购物车
    shoppingcar: [],
    talentInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    // 查看购物车
    this.getShoppingCarData();

    // 人才详情
    this.getTalentDetails(options.talentid);

    this.setData({
      talentId: options.talentid,
      prePageType: options.prepagetype ? options.prepagetype : ''
    })

    // 初始化 时间段 选择器
    this.initSelectTimePicker();

  },

  // 取数据
  getTalentDetails (talentId, reserveddate) {
    var me = this;

    var reserveddate = wx.getStorageSync('reservedDate');

    if (reserveddate == '') {
      reserveddate = moment().format('YYYY-MM-DD');
    }

    this.setData({
      'selectTimes.reservedDate': reserveddate
    })
    
    // 基本信息
    HotelDataService.queryTalentDetails(talentId, reserveddate).then((result) => {
      var details = hoteldata.formatTalentDetails(result);
      var comments = hoteldata.formatCommentList(result.talentCommentList);
      var talentInfo = hoteldata.formatWeddingTalentItem(result.talent, result.talent.occupation);
      // console.log( 'queryTalentDetails' +JSON.stringify(details));

      me.setData({
        tatDetl: details,
        comments: comments.length > 3 ? hoteldata.getTheTopN(comments, 3) : comments,
        allComments: comments,
        talentType: result.occupation,
        completeTalent: result,
        talentInfo: talentInfo
      })

    }).catch((error) => {
      console.log(error);
    })
  },
  initSelectTimePicker () {
    
    var hourArr = [];
    var hourSTr = 0;
    var mintArr = [];
    var mintStr = 0;

    for (var i=0; i<=24; i++) {
      hourSTr = i;
      if (i < 10) {
        hourSTr = '0' + i;
      }
      hourArr.push(hourSTr);
    }
    for (var j=0; j<=59; j++) {
      mintStr = j;
      if (j < 10) {
        mintStr = '0' + j;
      }
      mintArr.push(mintStr);
    }

    this.setData({
      'selectTimes.startHour': hourArr,
      'selectTimes.startMint': mintArr,
      'selectTimes.endHour': hourArr,
      'selectTimes.endMint': mintArr
    })

  },
  getShoppingCarData() {
    shoppingCarStore.get('shoppingcar').then(result => {
      console.log('shoppingcar...' + JSON.stringify(result));
      this.setData({
        shoppingcar: result
      })
    }).catch(error => {
      console.log(error);
    });
  },


  // 点击事件
  bindMoreCommentTap () {
    // 查看全部评论

    var showAllcomment = this.data.showAllcomment;
    var allComments = this.data.allComments;

    var initComments = [];

    this.setData({
      showAllcomment: !showAllcomment
    })

    if (this.data.showAllcomment) {
      initComments = allComments;
    } else {
      initComments = hoteldata.getTheTopN(allComments, 3);
    }
    
    this.setData({
      comments: initComments
    })

  },
  bindPhoneCallTap () {
    wx.makePhoneCall({
      phoneNumber: this.data.tatDetl.phonecall,
    })
  },
  // 选择 使用时间
  bindSelectTalentTimeTap () {
    this.setData({
      'selectTimes.selectTimePickerHidden': false
    })
  },
  bindTimePickerChange (e) {
    
    var val = e.detail.value;
    var selectTimes = this.data.selectTimes;

    var startTime = selectTimes.startHour[val[1]] + ':' + selectTimes.startMint[val[2]];
    var endTime = selectTimes.endHour[val[4]] + ':' + selectTimes.endMint[val[5]];

    console.log('starttime: ' + startTime);
    console.log('endTime: ' + endTime);
 
    this.setData({
      'selectTimes.startTime': startTime,
      'selectTimes.endTime': endTime
    })

  },
  bindSelectTimeConfirmTap () {

    // 记得 保存 所选 主持人 以及 时间段

    var startTime = this.data.selectTimes.startTime;
    var endTime = this.data.selectTimes.endTime;

    // 判断所选时间 是否 符合规则
    if (startTime.split(':')[0] > endTime.split(':')[0]) {
      wx.showModal({
        title: '提示',
        content: '请选择正确的时间段！',
      })
    } else if (startTime.split(':')[0] == endTime.split(':')[0] && startTime.split(':')[1] >= endTime.split(':')[1]) {
      wx.showModal({
        title: '提示',
        content: '请选择正确的时间段！',
      })
    } else {
      // 接口 验证
      HotelDataService.queryTalentVerify(this.data.talentId, this.data.selectTimes.reservedDate, this.data.selectTimes.startTime, this.data.selectTimes.endTime).then((result) => {
        console.log('queryTalentVerify .. ' + JSON.stringify(result));
        if (result == true) {
          this.setData({
            'selectTimes.selectTimePickerHidden': true
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '该时间段已被占用！',
          })
        }

      }).catch((error) => {
        console.log(error);
      })

    }
    
  },
  bindSelectTimeCancelTap () {
    this.setData({
      'selectTimes.selectTimePickerHidden': true
    })
  },
  // 预约按钮
  bindApptmentTap() {

    // 检查是否 选了 使用时间
    if (this.data.selectTimes.startTime != '' && this.data.selectTimes.endTime != '') {
      // 加入购物车
      var formatTalentInfo = hoteldata.formatLocalShoppingcar(this.data.talentInfo, '婚礼人才', null, null, this.data.selectTimes.startTime, this.data.selectTimes.endTime);
      var shoppingcar = this.data.shoppingcar;
      shoppingcar.push(formatTalentInfo);

      shoppingCarStore.save('shoppingcar', shoppingcar); 

      wx.navigateBack({
        delta: 1
      })

    } else {
      wx.showModal({
        title: '提示',
        content: '请选择使用时间！',
      })
    }
  },

  // 跳转
  goTalentComparisonPage (e) { 
      
    // 获取同类型人才
    HotelDataService.queryTalentSameTypeList(this.data.talentId, this.data.selectTimes.reservedDate).then((result) => {
      console.log("queryTalentSameTypeList success = " + JSON.stringify(result));
      if (result.length > 0) {
        wx.navigateTo({
          url: 'talentSelectComp?talentOne=' + Base64.encodeURI(JSON.stringify(this.data.completeTalent)) + '&talentId=' + this.data.talentId + '&talentList=' + Base64.encodeURI(JSON.stringify(result)),
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '该人才只有一位哦~',
        })
      }

    }).catch((error) => {
      console.log(error);
    })
    
  },
  goMorePicPage (e) {
    wx.navigateTo({
      url: 'talentMorePic?talentid=' + this.data.talentId,
    })
  }, 
  goMoreVideoPage (e) {
    wx.navigateTo({
      url: 'talentMoreVideo?talentid=' + this.data.talentId,
    })
  },
  goCommentPage (e) {
    wx.navigateTo({
      url: 'talentComment?talentid=' + this.data.talentId,
    })
  }


})