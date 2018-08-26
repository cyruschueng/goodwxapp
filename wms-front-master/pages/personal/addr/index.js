import config from '../../../config'
import req from '../../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit: true,
    selectedAddrId: 0,
    addressType: '',
    addresses: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type == 'SENDER') {
      wx.setNavigationBarTitle({ title: '我的地址' });
    } else {
      wx.setNavigationBarTitle({ title: '收件人地址' });
    }

    if (options.edit == 'true') {
      this.setData({
        edit: true
      });
    } else {
      this.setData({
        edit: false
      });
    }

    this.setData({
      addressType: options.type
    });

    if (options.id) {
      this.setData({
        selectedAddrId: options.id
      });
    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.listAddresses();
  },

  /**
   * 打开工具面板
   */
  openToolPanel: function (e) {
    var _this = this;
    let addrId = e.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList: ['编辑', '删除'],
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            // 编辑
            _this.editAddress(addrId);
          } else if (res.tapIndex == 1) {
            // 删除
            _this.deleteAddress(addrId);
          }
        }
      }
    });
  },

  /**
   * 加载该用户的发件地址，或收件地址
   */
  listAddresses: function () {
    let _this = this;
    let url = config.api.addressList + '/' + this.data.addressType;
    req.get(url).then(res => res.data).then(result => {
      if (result.success) {
        let addressModels = result.data;
        let addresses = [];
        let defaultAddresses = [];
        let otherAddresses = [];
        for (let i = 0; i < addressModels.length; i++) {
          var address = {
            id: addressModels[i].id,
            name: addressModels[i].name,
            mobile: addressModels[i].tel,
            company: addressModels[i].company,
            province: addressModels[i].province,
            city: addressModels[i].city,
            region: addressModels[i].region,
            address: addressModels[i].detail,
            defaultSetting: addressModels[i].defaultSetting
          };
          if (address.defaultSetting) {
            defaultAddresses.push(address);
          } else {
            otherAddresses.push(address);
          }
        }
        for (let i = 0; i < defaultAddresses.length; i++) {
          addresses.push(defaultAddresses[i]);
        }
        for (let i = 0; i < otherAddresses.length; i++) {
          addresses.push(otherAddresses[i]);
        }
        _this.setData({ addresses: addresses });
      } else {
        wx.showToast({ icon: 'none', title: '加载用户地址列表失败' });
      }
    });
  },

  /**
   * 设置默认地址
   */
  setDefaultAddress: function (e) {
    let _this = this;
    let id = e.currentTarget.dataset.id;
    let url = config.api.setDefaultAddress + '/' + id + '/' + this.data.addressType;
    req.post(url).then(res => res.data).then(result => {
      if (result.success) {
        _this.listAddresses();
      }
    });
  },

  /**
   * 删除地址
   */
  deleteAddress: function (addrId) {
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          let url = config.api.address + '/' + addrId;
          req.delete(url).then(res => res.data).then(result => {
            if (result.success) {
              _this.listAddresses();
            }
          });
        }
      }
    });

  },

  /**
   * 编辑地址
   */
  editAddress: function (addrId) {
    let _this = this;
    wx.navigateTo({
      url: '/pages/personal/addr/edit?type=' + this.data.addressType + '&id=' + addrId
    });
  },

  /**
   * 选择地址
   */
  selectAddress: function (e) {
    let id = e.currentTarget.dataset.id;
    var pages = getCurrentPages();
    for (let i = 0; i < this.data.addresses.length; i++) {
      if (id == this.data.addresses[i].id) {
        pages[pages.length - 2].setData({ sender: this.data.addresses[i] });
      }
    }
    wx.navigateBack();
  },

  /**
  * 新建地址
  */
  createAddress: function () {
    wx.navigateTo({
      url: '/pages/personal/addr/edit?create=CREATE&type=' + this.data.addressType + '&id=' + 0
    });
  },
})