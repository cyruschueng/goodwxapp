// pages/policyadd/policyadd.js
const address = require('../../utils/city.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**地图的默认数据**/
    areaInfo: '',    //地址
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
    roleArr: ['实际货主', '物流公司', '司机'],
    plocyTypeArr: ['个人', '公司'],
    _person:true,       //切换个人  公司页面
    _role: 0,
    _type: 0,
    phonenum:null, 
    _phonenum:"请输入手机号码" ,
    _email:'请输入邮箱',
    email:null,
    ifTure:false,    //判断是否进行判断是公司还是个人
  },
  //角色选择
  roleChecked: function (e) {
    let self = this;
    let _role = e.currentTarget.dataset.index;
    let role = self.data.roleArr[_role];
    self.setData({
      _role: _role,
    });
    if (role == '物流公司'){
      self.setData({
        _type: 1,
        ifTure:true,
        _person:false
      });
    }else if (role == '司机') {
      self.setData({
        _type: 0,
        ifTure: true,
        _person: true
      });
    }else{
      self.setData({
        _type: 0,
        ifTure: false,
        _person: true
      });
    }
  },
  //投保人类型
  typeChecked: function (e) {
    let self = this;
    let _type = e.currentTarget.dataset.index;
    let nameType = self.data.plocyTypeArr[_type];
    console.log(_type)
    if (this.data.ifTure) return;
    console.log(nameType)
    self.setData({
      _type: _type
    })
    if (nameType == '个人'){
      self.setData({
        _person: true
      })
    }else{
      self.setData({
        _person: false
      })
    }
  },
  // 离开手机号码触发
  getphonenum: function (e) {
    let self = this;
    let strnum = e.detail.value;
    function isPoneAvailable(str) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(str)) {
        console.log('手机号码格式不正确');
        self.setData({
          phonenum: null,
          _phonenum:"手机号码格式不正确"
        })
      } else {
        console.log(strnum);
        self.setData({
          phonenum: strnum
        })
      }
    }
    isPoneAvailable(strnum)
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

  //保存新增投保人
  saveAddpolicy:function(e){
    console.log('保存新增投保人');
    wx.navigateTo({
      url: '../policymsg/policymsg',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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