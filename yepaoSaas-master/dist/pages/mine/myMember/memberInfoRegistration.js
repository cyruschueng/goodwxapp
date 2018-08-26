// pages/mine/myMember/memberInfoRegistration.js
import * as minedata from '../../../utils/minedata-format';
import * as mineService from '../../../services/mine-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {

    textInputItems: [
      {
        id: 0,
        title: '姓名',
        placeholder: '请填写会员姓名',
        types: "txtInput",
        value: ''
      },
      {
        id: 1,
        title: '性别',
        placeholder: true,
        types: "other",
        value: 'male'
      },
      {
        id: 2,
        title: '生日',
        placeholder: '请选择出生日期',
        types: "txtPicker",
        value: ''
      },
      {
        id: 3,
        title: '手机号码',
        placeholder: '请填写手机号码',
        types: "txtInput",
        inputType: 'number',
        value: ''
      },
      {
        id: 4,
        title: '健身目的',
        placeholder: '请填写健身目的',
        types: "txtInput",
        value: ''
      },
      {
        id: 5,
        title: '意向卡',
        placeholder: '请选择意向卡',
        types: "txtPicker",
        pickerArr: ['通用月卡', '通用三年卡','震泽1000次卡'],
        value: ''
      },
      {
        id: 6,
        title: '健身时间',
        placeholder: '请选择健身时间',
        types: "txtPicker",
        pickerArr: ['上午', '下午', '晚上'],
        value: ''
      },
      {
        id: 7,
        title: '客户类型',
        placeholder: '请选择客户类型',
        types: "txtPicker",
        pickerArr: ['重要客户', '次要客户', '一般客户'],
        value: ''
      },
      {
        id: 8,
        title: '登记地址',
        placeholder: '请填写登记地址',
        types: "txtInput",
        value: ''
      },
      {
        id: 9,
        title: '备注信息',
        placeholder: '',
        types: "txtInput",
        value: ''
      }
    ],

    pickerViewHidden: true,
    pickerValueTitle: '',
    pickerList: [],
    pickerListIndex: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    mineService.queryGymUsableCards().then((result) => {

      console.log('queryGymUsableCards *** ' + JSON.stringify(result));
      if (result.errCode == 0) {
        this.setData({
          'textInputItems[5].pickerArr': minedata.formatMemInfoRegistCards(result.cardList)
        })
      }

    }).catch((error) => {
      console.log(error);
    })

  },
  
  // 性别选择
  bindSelectGenderTap(e) {
    this.setData({
      'textInputItems[1].value': e.currentTarget.id,
      'textInputItems[1].placeholder': !this.data.textInputItems[1].placeholder,
    })
  },
  // 点击 选择框 
  bindTextPickerTap (e) {
    var index = e.currentTarget.id;
    var textInputItems = this.data.textInputItems;
    var pickerList = [];

    this.setData({
      pickerListIndex: index
    })

    if (index == 2) {
      this.setThisMonthPicArr();
      this.setData({
        pickerViewHidden: false,
        pickerValueTitle: textInputItems[index].placeholder
      })
    } else {
      pickerList.push(textInputItems[index].pickerArr);
      this.setData({
        pickerViewHidden: false,
        pickerList: pickerList,
        pickerValueTitle: textInputItems[index].placeholder
      })
    }

  },
  // 取消 、确定选择器
  bindPickerConfirmTap(e) {
    this.setData({
      pickerViewHidden: true
    })
  },
  bindPickerCancelTap () {
    this.setData({
      pickerViewHidden: true
    })
  },

  // 选择器 变化
  bindPickerChange (e) {

    var val = e.detail.value;
    this.setPickerTextInputItemValue(val);
  },

  setPickerTextInputItemValue(val) {

    var textInputItems = this.data.textInputItems;
    var pickerList = this.data.pickerList;
    var title = this.data.pickerValueTitle;

    var chooseYear = '',
      chooseMonth = '',
      chooseDay = '';

    if (title == '请选择出生日期') {
      chooseYear = pickerList[0][val[0]];
      chooseMonth = pickerList[1][val[1]];
      chooseDay = pickerList[2][val[2]];
      this.setData({
        'textInputItems[2].value': chooseYear + '-' + chooseMonth + '-' + chooseDay
      })
    } else {

      textInputItems.forEach(item => {
        if (title == item.placeholder) {
          item.value = pickerList[0][val[0]];
        }
      })
      this.setData({
        textInputItems: textInputItems
      })
    }

  },

  // 日期选择器
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  setThisMonthPicArr() {
    var date = new Date();
    var now_year = date.getFullYear(),
      now_month = date.getMonth() + 1,
      now_day = date.getDate();

    var picker_year = [],
      picker_month = [],
      picker_day = [];
    for (var i = (now_year - 70); i <= now_year; i++) {
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

    var pickerList = [picker_year, picker_month, picker_day];

    this.setData({
      // pickerValue: [idx_year, idx_month, idx_day],
      pickerList: pickerList
    });
  },

  // 监听 输入框
  bindTextKeyInput (e) {
    
    var val = e.detail.value;
    
    var textInputItems = this.data.textInputItems;
    var title = e.currentTarget.dataset.title;

    textInputItems.forEach(item => {
      if (title == item.title) {
        item.value = val;
      }
    })
    this.setData({
      textInputItems: textInputItems
    })

  },
  // 保存信息按钮
  bindSaveInfoBtnTap() {

    var textInputItems = this.data.textInputItems;
    var isTextEmpt = false; //false 是填写完整
    textInputItems.forEach(item => {
      if (item.value == '') {
        wx.showToast({
          title: '不要留空哦~',
          icon: 'none'
        })
        isTextEmpt = true;
      }
    })
    var custDic = {
      memName: textInputItems[0].value,
      sex: textInputItems[1].value,
      birthday: textInputItems[2].value,
      phone: textInputItems[3].value,
      fitPurpose: textInputItems[4].value,
      intentionCard: textInputItems[5].value,
      checkinTimes: textInputItems[6].value,
      userType: textInputItems[7].value,
      address: textInputItems[8].value,
      remark: textInputItems[9].value
    }
    console.log('custdic ... ' + JSON.stringify(custDic));

    if (!isTextEmpt) {

      mineService.uploadMcRegisterMem(custDic).then((result) => {

        console.log('uploadMcRegisterMem *** ' + JSON.stringify(result));
        wx.showToast({
          title: '保存成功！',
          icon: 'success',
          duration: 2500,
          success: function (res) {
            wx.navigateBack({
              delta: 1
            })
          }
        })

      }).catch((error) => {
        wx.showToast({
          title: error.errMsg,
          icon: 'none'
        })
        console.log(error);
      })

    }
    

  }

})