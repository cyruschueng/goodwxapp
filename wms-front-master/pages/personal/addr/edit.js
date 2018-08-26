import utils from '../../../utils/util'
import req from '../../../utils/request'
import config from '../../../config'

const regexSpecial = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
const regexProvince = /^(.*?(省|自治区))(.*?)$/;
const regex = /^(.*?[市]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    errorMsg: '',
    create: false,
    addressType: '',
    address: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type == 'SENDER') {
      wx.setNavigationBarTitle({ title: '寄件人地址' });
    } else {
      wx.setNavigationBarTitle({ title: '收件人地址' });
    }

    if (options.create == 'CREATE') {
      // 设置是否创建地址
      this.setData({
        create: true
      });
    }

    // 设置地址类型
    this.setData({
      addressType: options.type
    });
    // 加载地址数据
    this.loadAddress(options.id);
  },

  /**
   * 加载地址
   */
  loadAddress: function (id) {
    let _this = this;
    let url = config.api.address + '/' + id;
    req.get(url).then(res => res.data).then(result => {
      if (result.success) {
        let addr = result.data;
        let address = {};
        address.id = addr.id;
        address.name = addr.name;
        address.mobile = addr.tel;
        address.company = addr.company;
        address.province = addr.province;
        address.city = addr.city;
        address.region = addr.region;
        address.address = addr.detail;
        address.addressType = addr.addressType;
        address.defaultSetting = addr.defaultSetting;
        _this.setData({
          address: address
        });
      } else {
        wx.showToast({ icon: 'none', title: '加载地址失败' });
      }
    });
  },

  /**
   * 更新地址信息
   */
  updateAddress: function (e) {
    var _this = this;
    if (!this.data.address.name) {
      utils.popError(this, '请填写姓名');
      return;
    }
    if (!this.data.address.mobile) {
      utils.popError(this, '请填写联系方式');
      return;
    }
    if (!this.data.address.address || !this.data.address.province || !this.data.address.city || !this.data.address.region) {
      utils.popError(this, '请填地址');
      return;
    }
    // 更新寄件人信息
    let param = {
      id: this.data.address.id,
      name: this.data.address.name,
      tel: this.data.address.mobile,
      province: this.data.address.province,
      city: this.data.address.city,
      region: this.data.address.region,
      detail: this.data.address.address,
      company: this.data.address.company,
      addressType: this.data.address.addressType,
      defaultSetting: this.data.address.defaultSetting
    };
    req.post(config.api.updateAddress, param).then(res => res.data).then(result => {
      if (result.success) {
        wx.navigateBack();
      } else {
        wx.showToast({ icon: 'none', title: '地址更新失败' });
      }
    });
  },

  /**
   * 新建地址
   */
  createAddress: function () {
    var _this = this;
    if (!this.data.address.name) {
      utils.popError(this, '请填写姓名');
      return;
    }
    if (!this.data.address.mobile) {
      utils.popError(this, '请填写联系方式');
      return;
    }
    if (!this.data.address.address || !this.data.address.province || !this.data.address.city || !this.data.address.region) {
      utils.popError(this, '请填写地址');
      return;
    }
    // 添加新寄件人
    let param = {
      name: this.data.address.name,
      tel: this.data.address.mobile,
      province: this.data.address.province,
      city: this.data.address.city,
      region: this.data.address.region,
      detail: this.data.address.address,
      company: this.data.address.company,
      addressType: this.data.addressType,
      defaultSetting: false
    };
    req.post(config.api.address, param).then(res => res.data).then(result => {
      if (result.success) {
        wx.navigateBack();
      } else {
        wx.showToast({ icon: 'none', title: '新增地址失败' });
      }
    });
  },

  /**
   * 省市区
   */
  bingAddressTap: function () {
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        var addressArray = [];
        var address = that.data.address;
        function regexSender(addr, address) {
          var _addressArray = regex.exec(addr);
          address.region = _addressArray[1];
          address.city = _addressArray[2];
          address.address = _addressArray[3] + "(" + res.name + ")";
        }

        if (!(addressArray = regexSpecial.exec(res.address))) {
          addressArray = regexProvince.exec(res.address);
          address.province = addressArray[1];
          regexSender(addressArray[3], address);
        } else {
          address.province = addressArray[1];
          regexSender(res.address, address);
        }
        that.setData({ address: address });
      }
    })
  },

  /**
   * 省市区选择器级联
   */
  bindRegionChange: function (e) {
    var address = this.data.address;
    address.province = e.detail.value[0];
    address.city = e.detail.value[1];
    address.region = e.detail.value[2];
    this.setData({
      address: address
    });
  },

  bindNameInput: function (e) {
    var address = this.data.address;
    address.name = e.detail.value;
    this.setData({
      address: address
    });
  },

  bindMobileInput: function (e) {
    var address = this.data.address;
    address.mobile = e.detail.value;
    this.setData({
      address: address
    });
  },

  bindCompanyInput: function (e) {
    var address = this.data.address;
    address.company = e.detail.value;
    this.setData({
      address: address
    });
  },

  bindAddressInput: function (e) {
    var address = this.data.address;
    address.address = e.detail.value;
    this.setData({
      address: address
    });
  }
})