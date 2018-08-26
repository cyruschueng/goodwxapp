// pages/myCoach/courseCustom.js

import moment from '../../../utils/npm/moment';
import * as minedata from '../../../utils/minedata-format';
import * as mineService from '../../../services/mine-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前所选日期
    yearMonthDay: '',
    weekData:[],
    levelItem: [
      {
        level: '初级',
        selected: false,
      },
      {
        level: '中级',
        selected: false,
      },
      {
        level: '高级',
        selected: false,
      }
    ],

    muscleManImg: '',
    bodyItem: [
      {
        body: '有氧',
        selected: false,
        styles: ''
      },
      {
        body: '胸背',
        selected: false,
        styles: 'top-left-btn'
      },
      {
        body: '肩臂',
        selected: false,
        styles: 'top-right-btn'
      },
      {
        body: '核心',
        selected: false,
        styles: 'center-btn'
      },
      {
        body: '下半身',
        selected: false,
        styles: 'bottom-left-btn'
      }
    ],

    // 初 中 高
    customizeLevel: '',
    // 全身 
    customizeParts: '',

    footBtnTitle: '生成',
    isAllowCreate: false,
    isSelectedLevel: false,
    isSelectedBody: false,

    courseCustomizationId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 初始化 周历
    this.initWeekCalendar();

    
    var yearMonthDay = moment().add(0, 'days').format('YYYY-MM-DD');
    var memId = options.memid ? options.memid : null;

    this.setData({
      yearMonthDay: yearMonthDay,
      memId: memId
    })
    this.getCourseCustomization();

    console.log(' memId .. ' + memId);
  
  },

  // 取数据
  getCourseCustomization() {

    var customizeDateString = this.data.yearMonthDay;
    var memId = this.data.memId;
    var bodyItem = this.data.bodyItem;
    var levelItem = this.data.levelItem;
    var footBtnTitle = this.data.footBtnTitle;
    var courseCustomizationId = '';
    mineService.queryCourseCustomization(customizeDateString, memId).then((result) => {

      console.log('queryCourseCustomization *** ' + JSON.stringify(result));
      if (result.result.length > 0) {

        var bodys = result.result[0].customize_parts.split(',');
        courseCustomizationId = result.result[0].id;
        levelItem.forEach(item => {
          if (item.level == result.result[0].customize_level) {
            item.selected = true;
          } else {
            item.selected = false;
          }
        })

        bodys.forEach(resItem => {
          bodyItem.forEach(item => {
            if (item.body == resItem) {
              item.selected = true;
            }
          })
        })

        footBtnTitle = '查看';

      }

      if (this.data.muscleManImg == '') {
        this.setData({
          muscleManImg: result.muscleManImg
        })
      }

      this.setData({
        levelItem: levelItem,
        bodyItem: bodyItem,
        footBtnTitle: footBtnTitle,
        courseCustomizationId: courseCustomizationId
      })

    }).catch((error) => {
      console.log(error);

      if (this.data.muscleManImg == '') {
        this.setData({
          muscleManImg: error.muscleManImg
        })
      } 

      if (error.errCode == 2) {
        levelItem.forEach(item => {
          item.selected = false;
        })
        bodyItem.forEach(item => {
          item.selected = false;
        })
        footBtnTitle = '生成';
        this.setData({
          levelItem: levelItem,
          bodyItem: bodyItem,
          footBtnTitle: footBtnTitle,
          courseCustomizationId: ''
        })
      }

    })

  },

  // 初始化
  initWeekCalendar () {
    
    var weekData = [];
    for (var i=0; i<7; i++) {
      var w = moment().add(i, 'days').format('E');
      var d = moment().add(i, 'days').format('DD');
      weekData.push({
        week: minedata.FORMATNUMTOCHNESE[w],
        day: d,
        selected: false,
        yearMonthDay: moment().add(i, 'days').format('YYYY-MM-DD')
      })
      weekData[0].selected = true;
    }
    this.setData({
      weekData: weekData
    })
  },

  // 点击事件
  bindCalendarTodayTap (e) {
    var index = e.currentTarget.id;
    var weekData = this.data.weekData;
    weekData.forEach(item => {
      item.selected = false;
      weekData[index].selected = true;
    })
    var bodyItem = this.data.bodyItem;
    bodyItem.forEach(item => {
      item.selected = false;
    })
    this.setData({
      weekData: weekData,
      yearMonthDay: weekData[index].yearMonthDay,
      bodyItem: bodyItem
    })

    this.getCourseCustomization();

  },
  bindCourseBtnTap(e) {
    var index = e.currentTarget.id;
    var levelItem = this.data.levelItem;
    levelItem.forEach(item => {
      item.selected = false;
      levelItem[index].selected = true;
    })
    this.setData({
      levelItem: levelItem,
      customizeLevel: levelItem[index].level,
      isSelectedLevel: true,
      footBtnTitle: '生成'
    })
  },
  bindCourseBtnItemTap (e) {
    var index = e.currentTarget.id;
    var bodyItem = this.data.bodyItem;
    var isSelectedBody;
    bodyItem[index].selected = !bodyItem[index].selected;
    bodyItem.forEach(item => {
      if (item.selected == true) {
        isSelectedBody = true;
      }
    })
    this.setData({
      bodyItem: bodyItem,
      isSelectedBody: isSelectedBody,
      footBtnTitle: '生成'
    })
  },
  bindMakeUpTap (e) {
    // 生成

    var footBtnTitle = this.data.footBtnTitle;

    if (footBtnTitle == '生成') {

      if (!this.data.isSelectedLevel) {
        wx.showModal({
          title: '提示',
          content: '请选择训练级别！',
        })
      } else if (!this.data.isSelectedBody) {
        wx.showModal({
          title: '提示',
          content: '请选择训练部位！',
        })
      } else {

        this.uploadCourseCustom();
      }

    } else {
      wx.navigateTo({
        url: 'courseTraining?memId=' + this.data.memId + '&customizeDateString=' + this.data.yearMonthDay,
      })
    }


  },

  uploadCourseCustom() {

    var bodyItem = this.data.bodyItem;
    var customizeParts;
    var customizePartsArr = [];

    bodyItem.forEach(item => {
      if (item.selected == true) {
        customizePartsArr.push(item.body);
        customizeParts = customizePartsArr.join(',');
      }
    })

    mineService.uploadCourseCustomization(this.data.yearMonthDay, this.data.memId, this.data.customizeLevel, customizeParts, this.data.courseCustomizationId).then((result) => {

      console.log('uploadCourseCustomization *** ' + JSON.stringify(result));
      wx.navigateTo({
        url: 'courseTraining?memId=' + this.data.memId + '&customizeDateString=' + this.data.yearMonthDay,
      })

    }).catch((error) => {
      console.log(error);
    })
  }

})