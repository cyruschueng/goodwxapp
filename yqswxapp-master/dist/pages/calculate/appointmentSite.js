// pages/calculate/appointmentSite.js

import * as HotelDataService from '../../services/hotel-service';

'use strict';
let choose_year = null,
  choose_month = null;
const conf = {
  data: {
    hasEmptyGrid: false,
    showPicker: false,
    preStr: '',
    nextStr: '',
    newDays: '',

    // 弹窗
    contactPhone: '',
    contactsName: '',
    commitHidden: true,

    hallId: 0,
  },
  onLoad(option) {

    // 预约看场
    this.initDataOnCalendar();

    this.setData({
      hallId: option.hallid
    })
  },
  initDataOnCalendar() {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);

    var start_date = cur_year + '-' + cur_month + '-' + date.getDate();
    var now_month = cur_month;
    //转义字符 < >
    this.setCalendarChangeBtn();

    this.setData({
      cur_year,
      cur_month,
      weeks_ch,
      start_date,
      now_month, 
      newDays: start_date
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
  calculateDays(year, month) {
    let days = [];
    const date = new Date();
    const thisMonthDays = this.getThisMonthDays(year, month);
    var dayStr = date.getDate();
    for (let i = 1; i <= thisMonthDays; i++) {
      var choosed = false;
      var lunar = '';
      var notOptional = false; //false 可以预约
      if (i == dayStr) {
        choosed = true;
        this.setData({
          oldChooseDayIndex: i - 1
        })
      }

      // 今天以前不可选 变灰
      if (i <= dayStr && month <= date.getMonth() + 1 && year <= date.getFullYear()) {
        notOptional = true;
      }

      days.push({
        day: i,
        choosed: choosed,
        lunar: lunar,
        notOptional: notOptional
      });

    }

    this.setData({
      days
    });
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

        this.calculateDays(newYear, newMonth);
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
      this.calculateDays(newYear, newMonth);
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
    const date = new Date();

    if (!days[idx].notOptional) {

      if (oldChooseDayIndex < days.length-1) {
        days[oldChooseDayIndex].choosed = false;
      }
      days[idx].choosed = true;

      this.setData({
        days,
        oldChooseDayIndex: idx,
        newDays: this.data.cur_year + '-' + this.data.cur_month + '-' + (idx + 1)
      });
    }

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
    this.calculateDays(choose_year, choose_month);

    this.setData({
      cur_year: choose_year,
      cur_month: choose_month
    });

  },
  bindCommitKeyInput (e) {

    if (e.currentTarget.dataset.type == 'name') {
      this.setData({
        contactsName: e.detail.value
      })
    } else {
      this.setData({
        contactPhone: e.detail.value
      })
    }

  },
  bindCommitBtnTap (e) {

    if (e.currentTarget.dataset.type == 'appointment') {
      this.setData({
        commitHidden: false
      })
    } else {
      this.setData({
        commitHidden: true
      })

      console.log('预约看场日期。。' + this.data.newDays);
      console.log('联系人' + this.data.contactsName);
      console.log('联系人电话' + this.data.contactPhone);

      if (this.data.newDays == '') {
        this.showModalContent('请选择预订日期！');
      }
      else if (this.data.contactsName == '') {
        this.showModalContent('请填写联系人！');
      }
      else if (this.data.contactPhone == '') {
        this.showModalContent('请填写联系电话！');
      } else {
        this.uploadAppointment();
      }

    }

  },

  uploadAppointment () {
    HotelDataService.uploadAppointmentDate(this.data.newDays, this.data.hallId, this.data.contactsName, this.data.contactPhone).then((result) => {
      console.log("uploadAppointmentDate success = " + JSON.stringify(result));

      wx.showToast({
        title: '预约成功！',
        icon: 'success',
        duration: 2000
      })

    }).catch((error) => {
      console.log(error);
    })
  }
};

Page(conf);