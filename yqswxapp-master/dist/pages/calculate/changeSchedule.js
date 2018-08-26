// pages/calculate/changeScheduleDate.js
import * as HotelDataService from '../../services/hotel-service';

'use strict';
let choose_year = null,
  choose_month = null;
const conf = {
  data: {
    hallId: 0,
    bodyhidden: true,
    hasEmptyGrid: false,
    showPicker: false,
    preStr: '',
    nextStr: '',
    newDays: ''
  },
  onLoad(option) {

    this.setData({
      hallId: option.hallid ? option.hallid : 1
    })
    // 档期查询
    this.initDataOnCalendar();

    // 当前选择的日期

//    var reserveddate = wx.getStorageSync('reservedDate');

  },
  initDataOnCalendar() {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    // this.calculateDays(cur_year, cur_month);

    this.getOldCalendarLuckydays(cur_year, cur_month);

    var start_date = cur_year + '-' + cur_month + '-' + date.getDate();
    var now_month = cur_month;
    //转义字符 < >
    this.setCalendarChangeBtn();

    this.setData({
      cur_year,
      cur_month,
      weeks_ch,
      start_date,
      now_month
    });
  },
  setCalendarChangeBtn() {
    var preStr = '&lt;';
    preStr = preStr.replace(/&lt;/g, '<');
    var nextStr = '&gt;';
    nextStr = nextStr.replace(/&gt;/g, '>');
    preStr = '';

    this.setData({
      preStr: preStr,
      nextStr: nextStr
    })
  },
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month, luckydays) {
    let days = [];
    const date = new Date();
    const thisMonthDays = this.getThisMonthDays(year, month);
    var dayStr = date.getDate();

    for (let i = 1; i <= thisMonthDays; i++) {
      var choosed = false;
      var lunar = '';
      if (i == dayStr) {
        choosed = true;
        this.setData({
          oldChooseDayIndex: i - 1
        })
      }

      if (luckydays[i - 1].goodFlag == true) {
        lunar = '吉日';
      }

      days.push({
        day: i,
        choosed: choosed,
        lunar: lunar
      });

    }

    this.setData({
      days
    });
  },
  getOldCalendarLuckydays(year, month) {
    // 遍历吉日
    //获取老黄历
    var me = this;
    HotelDataService.queryScheduleList(year, month, me.data.hallId).then((result) => {

      me.calculateDays(year, month, result);

      me.setData({
        bodyhidden: false
      })

    }).catch(() => {
      console.log('fails');
    })
  },
  handleCalendar(e) {
    var handle = e.currentTarget.dataset.handle;
    var cur_year = this.data.cur_year;
    var cur_month = this.data.cur_month;

    console.log('当前月份 = ' + this.data.cur_month);
    console.log('真实月份 = ' + this.data.now_month);

    if (handle === 'prev') {

      if (cur_month == this.data.now_month) {
        console.log('不可往后预约 ');
        this.setData({
          preStr: ''
        });
      } else {
        let newMonth = cur_month - 1;
        let newYear = cur_year;
        if (newMonth < 1) {
          newYear = cur_year - 1;
          newMonth = 12;
        }
        console.log('-1 ');

        // this.calculateDays(newYear, newMonth);
        this.getOldCalendarLuckydays(newYear, newMonth);
        this.calculateEmptyGrids(newYear, newMonth);

        this.setData({
          cur_year: newYear,
          cur_month: newMonth
        });
      }

    } else {

      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
      console.log('+1 ');
      // this.calculateDays(newYear, newMonth);
      this.getOldCalendarLuckydays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        preStr: '<',
        cur_year: newYear,
        cur_month: newMonth
      });

    }

  },
  tapDayItem(e) {
    const idx = e.currentTarget.dataset.idx;
    const days = this.data.days;
    var oldChooseDayIndex = this.data.oldChooseDayIndex;

    days[oldChooseDayIndex].choosed = false;
    days[idx].choosed = true;
    this.setData({
      days,
      oldChooseDayIndex: idx,
      newDays: this.data.cur_year + '-' + this.data.cur_month + '-' + (idx + 1)
    });
  },
  chooseYearAndMonth() {
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    let picker_year = [],
      picker_month = [];
    for (let i = 1900; i <= 2100; i++) {
      picker_year.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      picker_month.push(i);
    }
    const idx_year = picker_year.indexOf(cur_year);
    const idx_month = picker_month.indexOf(cur_month);
    this.setData({
      picker_value: [idx_year, idx_month],
      picker_year,
      picker_month,
      showPicker: true,
    });
  },
  pickerChange(e) {
    const val = e.detail.value;

    choose_year = val.split("-")[0];
    choose_month = val.split("-")[1];

    this.calculateEmptyGrids(choose_year, choose_month);
    // this.calculateDays(choose_year, choose_month);
    this.getOldCalendarLuckydays(choose_year, choose_month);

    this.setData({
      cur_year: choose_year,
      cur_month: choose_month
    });

  },

  bindNextBtnTap() {

    if (this.data.navigationBarTitle == '预约看场') {


      
      

      console.log(this.data.newDays)
    } else {

    }

  }
};

Page(conf);