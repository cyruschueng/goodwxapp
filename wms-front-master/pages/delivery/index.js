import config from '../../config'
import utils from '../../utils/util'
import resource from '../../utils/resource'
import req from '../../utils/request'

const app = getApp()
const regexSpecial = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
const regexProvince = /^(.*?(省|自治区))(.*?)$/;
const regex = /^(.*?[市]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    commodityTypes: resource.commodityTypes,
    commodity: {},
    showModalStatus: false,
    animationData: null,
    expresses: [],
    express: {},
    commodityWeight: 0,
    remark: '',
    sender: {},
    reciever: {},
    showDefaultAddress: 0,
    errorMsg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '寄快递' });
    // 加载默认寄件人地址
    this.retrieveDefaultSenderAddress();
    // 加载快递公司列表
    this.listExpresses();
  },

  /**
   * 获取默认寄件人地址
   */
  retrieveDefaultSenderAddress: function () {
    let _this = this;
    req.get(config.api.defaultAddress + '/SENDER').then(res => res.data).then(result => {
      if (result.success) {
        let sender = _this.buildAddress(result.data);
        _this.setData({
          sender: sender,
          showDefaultAddress: sender.defaultSetting ? 1 : 2
        });
      } else {
        wx.showToast({ icon: 'none', title: '获取默认寄件人信息失败' });
      }
    });
  },

  /**
   * 获取快递公司信息
   */
  listExpresses: function () {
    let _this = this;
    req.get(config.api.expressList).then(res => res.data).then(result => {
      if (result.success) {
        let expresses = _this.buildExpresses(result.data);
        _this.setData({ expresses: expresses });
        for (let i = 0, len = expresses.length; i < len; ++i) {
          if (expresses[i].checked) {
            _this.setData({ express: expresses[i] });
          }
        }
      } else {
        wx.showToast({ icon: 'none', title: '获取快递公司列表失败' });
      }
    });
  },

  /**
   * 省市区地区选择器
   */
  bingAddressTap: function () {
    let _this = this;
    wx.chooseLocation({
      success: function (res) {
        let addressArray = [];
        let reciever = _this.data.reciever;

        function regexReciever(address, reciever) {
          var _addressArray = regex.exec(address);
          reciever.region = _addressArray[1];
          reciever.city = _addressArray[2];
          reciever.address = _addressArray[3] + "(" + res.name + ")";
        }

        if (!(addressArray = regexSpecial.exec(res.address))) {
          addressArray = regexProvince.exec(res.address);
          reciever.province = addressArray[1];
          regexReciever(addressArray[3], reciever);
        } else {
          reciever.province = addressArray[1];
          regexReciever(res.address, reciever);
        }
        _this.setData({ reciever: reciever });
      }
    })
  },

  /**
   * 省市区选择器级联
   */
  bindRegionChange: function (e) {
    let reciever = this.data.reciever;
    reciever.province = e.detail.value[0];
    reciever.city = e.detail.value[1];
    reciever.region = e.detail.value[2];
    this.setData({
      reciever: reciever
    });
  },

  /**
   * 跳转到添加寄件人列表
   */
  navigateToSender: function (event) {
    wx.navigateTo({
      url: './sender/index'
    });
  },

  /**
   * 跳转到寄件人列表页
   */
  navigateToSenders: function (event) {
    let senderId = this.data.sender.id;
    wx.navigateTo({
      url: '/pages/personal/addr/index?type=SENDER&edit=false&id=' + senderId
    });
  },

  /**
   * 获取选择的商品类型
   */
  selectCommodity: function (e) {
    var $data = e.currentTarget.dataset;
    this.setData({
      commodity: $data
    });
    this.hideModal();
  },

  /**
   * 更换快递公司
   */
  expressChange: function (e) {
    let expresses = this.data.expresses;
    for (let i = 0, len = expresses.length; i < len; ++i) {
      expresses[i].checked = expresses[i].value == e.detail.value;
      if (expresses[i].checked) {
        this.setData({ express: expresses[i] });
      }
    }
    this.setData({
      expresses: expresses
    });
  },

  /**
   * 提交快递申请
   */
  book: function (e) {
    if (!this.data.sender.name) {
      utils.popError(this, '请填写寄件人');
      return;
    }
    if (!this.data.sender.mobile) {
      utils.popError(this, '请填写寄件人联系方式');
      return;
    }
    if (!this.data.sender.address || !this.data.sender.province || !this.data.sender.city || !this.data.sender.region) {
      utils.popError(this, '请填写寄件地址');
      return;
    }
    if (!this.data.reciever.name) {
      utils.popError(this, '请填写收件人');
      return;
    }
    if (!this.data.reciever.mobile) {
      utils.popError(this, '请填写收件人联系方式');
      return;
    }
    if (!this.data.reciever.address || !this.data.reciever.province || !this.data.reciever.city || !this.data.reciever.region) {
      utils.popError(this, '请填写收件地址');
      return;
    }
    if (!this.data.express) {
      utils.popError(this, '请选择物流公司');
      return;
    }
    if (!this.data.commodityWeight || this.data.commodityWeight <= 0) {
      utils.popError(this, '请填写包裹重量');
      return;
    }
    let orderInfo = {};
    orderInfo.sender = this.data.sender;
    orderInfo.receiver = this.data.reciever;
    orderInfo.commodity = this.data.commodity;
    orderInfo.commodityWeight = this.data.commodityWeight;
    orderInfo.remark = this.data.remark;
    orderInfo.expressCompany = this.data.express;
    let orderJson = JSON.stringify(orderInfo);

    // TODO 创建订单
    // 跳转至订单明细确认页
    wx.navigateTo({
      url: './details/index?order=' + orderJson
    });
  },

  /**
   * Address JSON to sender or receiver
   */
  buildAddress: function (addressJson) {
    let address = {};
    address.id = addressJson.id;
    address.name = addressJson.name;
    address.mobile = addressJson.tel;
    address.company = addressJson.company;
    address.province = addressJson.province;
    address.city = addressJson.city;
    address.region = addressJson.region;
    address.address = addressJson.detail;
    address.defaultSetting = addressJson.defaultSetting;
    return address;
  },

  /**
   * Expresses JSON to express object array
   */
  buildExpresses: function (expressArrayJson) {
    let expresses = [];
    for (let i = 0; i < expressArrayJson.length; i++) {
      let express = {};
      express.name = expressArrayJson[i].text;
      express.value = expressArrayJson[i].value;
      if (i == 0) {
        express.checked = true;
      } else {
        express.checked = false;
      }
      expresses.push(express);
    }
    return expresses;
  },

  /**
   * 呈现商品类型页面
   */
  showModal: function () {
    utils.showModal(this);
  },

  /**
   * 隐藏商品类型页面
   */
  hideModal: function () {
    utils.hideModal(this);
  },

  bindNameInput: function (e) {
    let reciever = this.data.reciever;
    reciever.name = e.detail.value;
    this.setData({
      reciever: reciever
    });
  },

  bindMobileInput: function (e) {
    let reciever = this.data.reciever;
    reciever.mobile = e.detail.value;
    this.setData({
      reciever: reciever
    });
  },

  bindCompanyInput: function (e) {
    let reciever = this.data.reciever;
    reciever.company = e.detail.value;
    this.setData({
      reciever: reciever
    });
  },

  bindAddressInput: function (e) {
    let reciever = this.data.reciever;
    reciever.address = e.detail.value;
    this.setData({
      reciever: reciever
    });
  },

  bindCommodityWeight: function (e) {
    this.setData({
      commodityWeight: e.detail.value
    });
  },

  bindRemark: function (e) {
    this.setData({
      remark: e.detail.value
    });
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