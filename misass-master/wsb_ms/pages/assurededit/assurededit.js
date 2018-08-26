// pages/policyedit/policyedit.js
var address = require('../../utils/city.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**地图的默认数据**/
    areaInfo: '广东省-广州市-天河区',
    menuType: 0,
    begin: null,
    status: 1,
    end: null,
    isVisible: false,
    animationData: {},
    animationAddressMenu: {},
    addressMenuIsShow: false,
    startState: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    province: '',
    city: '',
    area: '',
    /*其他数据*/
    _type: 0,
    value: [9999, 1, 1],
    typeArr: ['个人', '公司'],
    policytype: '个人',
    ifType: false,
    role: '实际货主',
    roleArr: ['实际货主', '代货主'],
    email: "7687798@qq.com",
    idcard: 450825200005474598,
    _phoneshow: false,
    phonenum: null

  },


  /********投保人类型*************/
  //点击  弹出选框
  clickType: function (e) {
    this.setData({
      _type: 1
    })
  },
  //滑动选择
  bindType: function (e) {
    const val = e.detail.value;
    this.setData({
      policytype: this.data.typeArr[val[0]],
      ifType: true
    })
  },
  //点击取消
  closeType: function (e) {
    this.setData({
      _type: 0
    })
  },
  //点击确定
  rightType: function (e) {
    if (!this.data.ifType) {
      this.setData({
        policytype: this.data.typeArr[this.data.typeArr.length - 1]
      })
    }
    this.setData({
      _type: 0
    })
  },

  /********角色*************/
  //点击  弹出选框
  clickRole: function (e) {
    this.setData({
      _role: 1
    })
  },
  //滑动选择
  bindRole: function (e) {
    const val = e.detail.value;
    this.setData({
      role: this.data.roleArr[val[0]],
      ifType: true
    })
  },
  //点击取消
  closeRole: function (e) {
    this.setData({
      _role: 0
    })
  },
  //点击确定
  rightRole: function (e) {
    if (!this.data.ifType) {
      this.setData({
        role: this.data.roleArr[this.data.roleArr.length - 1]
      })
    }
    this.setData({
      _role: 0
    })
  },

  blurIDcard: function (e) {
    let idNum = e.detail.value;

    function IdCodeValid(code) {
      //身份证号合法性验证
      //支持15位和18位身份证号
      //支持地址编码、出生日期、校验位验证
      var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
      var row = {
        'pass': true,
        'msg': '验证成功'
      };

      if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)) {
        row = {
          'pass': false,
          'msg': '身份证号格式错误'
        };
      } else if (!city[code.substr(0, 2)]) {
        row = {
          'pass': false,
          'msg': '身份证号地址编码错误'
        };
      } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
          code = code.split('');
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          if (parity[sum % 11] != code[17].toUpperCase()) {
            row = {
              'pass': false,
              'msg': '身份证号校验位错误'
            };
          }
        }
      }
      console.log(row);
    }
    IdCodeValid(idNum);
  },

  //输入邮箱离开触发
  bluremail: function (e) {
    let value = e.detail.value;
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    if (!reg.test(value)) {
      console.log('正则验证不通过，格式不对')
    } else {
      console.log('验证正确格式')
    }

  },


  //点击手机号码
  clickPhone: function (e) {
    this.setData({
      _phoneshow: true
    })
  },
  //手机号码 取消弹窗
  closehide: function (e) {
    this.setData({
      _phoneshow: false
    })
  },
  //手机号码 确定弹窗
  phonesure: function (e) {
    this.setData({
      _phoneshow: false
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;
    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    })
  },

  /*********地区******************/
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this;
    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    var that = this
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.provinces[value[0]].name + '-' + that.data.citys[value[1]].name + '-' + that.data.areas[value[2]].name;
    that.setData({
      areaInfo: areaInfo,
    })
  },
  hideCitySelected: function (e) {
    this.startAddressAnimation(false)
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        areas: address.areas[citys[cityNum].id],
      })
    } else {
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
  },
  //保存信息
  saveEditpolicy: function (e) {
    console.log('保存成功!');
    // wx.navigateBack({});
    wx.navigateTo({
      url: '../assuredmsg/assuredmsg',
    })
  },
  getphonenum: function (e) {
    let self = this;
    let strnum = e.detail.value;
    function isPoneAvailable(str) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(str)) {
        console.log('手机号码格式不正确');
        self.setData({
          phonenum: null
        })
      } else {
        self.setData({
          phonenum: strnum
        })
      }
    }
    isPoneAvailable(strnum)
  },
  //获取验证码
  getCode: function (e) {
    console.log(this.data.phonenum)
  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})