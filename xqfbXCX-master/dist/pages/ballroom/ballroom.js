// pages/ballroom/ballroom.js

import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';
import shoppingCarStore from '../../services/shopping-car-store';
import contactsInfoStore from '../../services/contacts-info-store';
import moment from '../../utils/npm/moment';
import { Base64 } from '../../utils/urlsafe-base64';

import { remove } from '../../utils/npm/lodash-wx';
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ballroomid: 0,
    ballInfo: {},

    // 弹窗
    reserveddateData: {
      dateViewHidden: true,
      picker_value: '',
      picker_year: [],
      picker_month: [],
      picker_day: [],
      choose_year: '',
      choose_month: '',
      choose_day: '',
      now_year: '',
      now_month: '',
      now_day: '',
      reserved: null
    },

    tableNum: 0,
    tableHidden: true,

    shoppingcar: [],
    // 联系人 方式
    contacts: {
      contact: '',
      contactInformation: '',
      gender: '女士'
    },
    // 性别
    genderItems: [
      { name: '女士', value: '女士', checked: 'true' },
      { name: '先生', value: '先生' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 设当前日期
    var date = new Date()
    this.setData({
      'reserveddateData.now_year': date.getFullYear(),
      'reserveddateData.now_month': date.getMonth() + 1,
      'reserveddateData.now_day': date.getDate(),
      ballroomid: options.ballroomid,
      'reserveddateData.picker_value': moment().format('YYYY-MM-DD'),
      'reserveddateData.choose_year': moment().format('YYYY'),
      'reserveddateData.choose_month': moment().format('MM'),
      // 'reserveddateData.choose_day': moment().format('DD') + 1
      'reserveddateData.choose_day': moment().add(1, 'days').format('DD')
    })

    

    console.log('reserveddateData.choose_day .. ' + this.data.reserveddateData.choose_month);

    this.getBallroomDetails(options.ballroomid);

    // 日期选择
    this.setThisMonthPicArr();

    // 查看购物车
    this.getShoppingCarData();


  },

  // 取数据
  getBallroomDetails(ballroomid) {
    var me = this;
    HotelDataService.queryBallroomDetails(+ballroomid).then((result) => {

      me.setData({
        balldetails: result,
        ballInfo: hoteldata.fomatBallroomInfo(result)
      })

      wx.setStorageSync('ballTablenNum', me.data.ballInfo.tabNumsText);
      // console.log('balldetails ... ' + JSON.stringify(result));
      
      // 切换title名字
      wx.setNavigationBarTitle({
        title: ballInfo.name,
      })

    }).catch(() => {
      console.log('fails');
    })
  },

  // 页面跳转
  goWeddingTalentPage () {
      
    var value = wx.getStorageSync('reservedDate');
//    console.log('reserveddate = ' + value);
      
    if (value) {
      wx.navigateTo({
        url: '../weddingTalent/weddingTalent?reservedDate=' + value
      })
    } else {
      // 弹窗选择日期
      this.setData({
        'reserveddateData.dateViewHidden': false
      })
    }

  },
  goScheduleQueryPage (e) {

    // 判断 购物车是否已有宴会厅 询问是否 替换宴会厅
    if (this.checkShoppingCar()) {
      // 替换宴会厅 并进入下一页
      // 宴会厅 加入购物车
      // this.joinShoppingCar();

    } else {
      console.log('sssssss');
    }

  },
  goAppointmentSitePage () {
    wx.navigateTo({
      url: '../calculate/appointmentSite?hallid=' + this.data.ballroomid
    })
  },
  goCommentPage () {
    wx.navigateTo({
      url: '../comment/commentListView?hallid=' + this.data.ballroomid + '&prePageType=ballroom'
    })
  },

  // 点击事件
  pickerChange(e) {
    const val = e.detail.value;

    var choose_year = this.data.reserveddateData.picker_year[val[0]] ? this.data.reserveddateData.picker_year[val[0]] : this.data.reserveddateData.choose_year,
      choose_month = this.data.reserveddateData.picker_month[val[1]] ? this.data.reserveddateData.picker_month[val[1]] : this.data.reserveddateData.choose_month,
      choose_day = this.data.reserveddateData.picker_day[val[2]] ? this.data.reserveddateData.picker_day[val[2]] : this.data.reserveddateData.choose_day;

    var dateString = choose_year + '-' + choose_month + '-' + choose_day;
    // 检测 日期 是否可预订
    HotelDataService.queryIsReserved(dateString, this.data.ballroomid).then((result) => {
      // false 没有被预订
      // console.log('queryIsReserved ... ' + JSON.stringify(result));
      this.setData({
        'reserveddateData.reserved': result
      })

      console.log('queryIsReserved ... ' + JSON.stringify(this.data.reserveddateData.reserved));

    }).catch(() => {
      console.log('fails');
    })
    
    this.setData({
      'reserveddateData.choose_year': choose_year,
      'reserveddateData.choose_month': choose_month,
      'reserveddateData.choose_day': choose_day
    })
  },
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  setThisMonthPicArr() {
    var now_year = this.data.reserveddateData.now_year,
      now_month = this.data.reserveddateData.now_month,
      now_day = this.data.reserveddateData.now_day;

    var picker_year = [],
        picker_month = [],
        picker_day = [];
    for (var i = now_year; i <= (now_year + 100); i++) {
      picker_year.push(i);
    }
    for (var i = 1; i <= 12; i++) {
      if (i < 10) {
        i = '0' + i;
      }
      picker_month.push(i);
    }
    var end_day = this.getThisMonthDays(now_year, now_month);
    for (var i = 1; i <= end_day; i++) {
      if (i < 10) {
        i = '0' + i;
      }
      picker_day.push(i);
    }
    var idx_year = picker_year.indexOf(now_year);
    var idx_month = picker_month.indexOf(now_month);
    var idx_day = picker_day.indexOf(now_day);

    // console.log('idx_year: ' + idx_year + ' idx_month: ' + idx_month + ' idx_day: ' + idx_day);

    this.setData({
      'reserveddateData.picker_value': [idx_year, idx_month, idx_day+1],
      'reserveddateData.picker_year': picker_year,
      'reserveddateData.picker_month': picker_month,
      'reserveddateData.picker_day': picker_day
    });
  },
  bindSaveChooseTime () {
    var chooseTime = this.data.reserveddateData.choose_year + '-' + this.data.reserveddateData.choose_month + '-' + this.data.reserveddateData.choose_day;
    chooseTime = moment(chooseTime).format('YYYY-MM-DD');

    if (moment(chooseTime).isBefore()) {
      wx.showModal({
        title: '提示',
        content: '不能选择今天以前的日期！',
        showCancel: false
      })
    } else {
      // 预订时间 联系人 存储本地
      this.saveLocalChooseTime(chooseTime);
      this.saveLocalContacts(this.data.contacts);
      // 加入购物车
      // this.joinShoppingCar();
      this.setData({
        'reserveddateData.dateViewHidden': true
      })
      
      wx.navigateTo({
        url: '../weddingTalent/weddingTalent?reservedDate=' + chooseTime
      })
    }
  },
  
  checkShoppingCar() {
    var shoppingcar = this.data.shoppingcar;
    var isBallroom = false;
    var me = this;
    shoppingcar.forEach(item => {
      if (item.title == '宴会厅') {
        isBallroom = true;
      }
    })

    if (isBallroom) {

      wx.showModal({
        title: '您已选有宴会厅！',
        content: '是否替换已有宴会厅？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            // 删除 购物车的 宴会厅
            remove(shoppingcar, function (n) {
              return n.title == '宴会厅';
            });

            me.setData({
              shoppingcar: shoppingcar
            })
            // 加入新的 宴会厅
            // me.joinShoppingCar();
            shoppingCarStore.save('shoppingcar', shoppingcar);

            wx.navigateTo({
              url: '../calculate/reservationInformation?hallid=' + me.data.ballroomid + '&balldetails=' + Base64.encodeURI(JSON.stringify(me.data.balldetails)) + '&ballinfo=' + Base64.encodeURI(JSON.stringify(me.data.ballInfo))
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })


    } else {
      // 加入 宴会厅
      // this.joinShoppingCar();
      wx.navigateTo({
        url: '../calculate/reservationInformation?hallid=' + this.data.ballroomid + '&balldetails=' + Base64.encodeURI(JSON.stringify(this.data.balldetails)) + '&ballinfo=' + Base64.encodeURI(JSON.stringify(this.data.ballInfo))
      })
    }


  },
  getShoppingCarData () {
    shoppingCarStore.get('shoppingcar').then(result => {

      console.log('shoppingcar...' + JSON.stringify(result));
      this.setData({
        shoppingcar: result
      })

    }).catch(error => {
      console.log(error);
    });
  },
  joinShoppingCar () {
    var balldetails = hoteldata.formatLocalShoppingcar(this.data.balldetails, '宴会厅');
    var newShoppingcar = this.data.shoppingcar;
    newShoppingcar.push(balldetails);
    shoppingCarStore.save('shoppingcar', newShoppingcar);
  },
  // 过滤购物车
  formatShoppingCar(talentinfo, talenttype) {

    var shoppingcar = this.data.shoppingcar;
    var talenttypes = shoppingcars.talenttypes;
    var shoppinglist = shoppingcars.shoppinglist;
    shoppingcars.shoppingtime = moment().format('YYYY-MM-DD');

    // 如果已经有这个类别了，购物车就不再+1，且替换原来已有的人
    if (talenttypes.length > 0) {

      for (var i = 0; i < talenttypes.length; i++) {
        var types = talenttypes[i];
        if (types != talenttype) {
          talenttypes.push(talenttype);
          shoppinglist.push(talentinfo);
          break;
        } else {
          // 替换已有类别的人
          var tylength = talenttypes.length - 1;
          shoppinglist[tylength] = talentinfo;
          break;
        }
      }

    } else {
      talenttypes.push(talenttype);
      shoppinglist.push(talentinfo);
    }

    this.setData({
      shoppingcars: shoppingcars
    })

    console.log('替换 宴会厅 后最终购物车：' + JSON.stringify(shoppinglist));
  },

  saveLocalChooseTime (chooseTime) {
    wx.setStorage({
      key: "reservedDate",
      data: chooseTime
    })
      
    //  contactsInfoStore.save('reservedDate', chooseTime);
  },
  saveLocalContacts (contacts) {
    wx.setStorage({
      key: "contacts",
      data: contacts
    })
    // contactsInfoStore.save('contacts', contacts);
    console.log('save local contacts ' + JSON.stringify(contacts))
  },

  bindContactInput (e) {
    this.setData({
      'contacts.contact': e.detail.value
    })
  },
  bindContactInfoInput (e) {
    this.setData({
      'contacts.contactInformation': e.detail.value
    })
  },
  bindGenderCheckboxChange(e) {
    this.setData({
      'contacts.gender': e.detail.value
    })
  },
  bindTableSliderChange (e) {
    this.setData({
      'ballInfo.tabNumsText': e.detail.value
    })
    //保存桌数
    wx.setStorageSync('ballTablenNum', e.detail.value);
  },
  bindCancelBtnTap (e) {
    if (e.currentTarget.dataset.type == 'table') {
      this.setData({
        tableHidden: true
      })
    } else {
      this.setData({
       'reserveddateData.dateViewHidden': true
      })
    }
  },
  bindConfirmBtnTap (e) {
    if (!this.data.reserveddateData.reserved) {
      // 检查是否有选过 预订时间
      this.bindSaveChooseTime();
    }
  }

})