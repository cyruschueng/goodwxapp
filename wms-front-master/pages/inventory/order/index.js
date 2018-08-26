// pages/inventory/order/index.js
import config from '../../../config'
import utils from '../../../utils/util'
import resource from '../../../utils/resource'
import req from '../../../utils/request'

const app = getApp()
const regexSpecial = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
const regexProvince = /^(.*?(省|自治区))(.*?)$/;
const regex = /^(.*?[市]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    animationData: null,
    expresses: [],
    express: {},
    /**是否显示添加寄件人 */
    showSelectAddress: 0,
    commodityInventory: {},
    orderInfo: {},
    errorMsg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad");
    wx.setNavigationBarTitle({ title: '寄快递' });
    // 加载默认寄件人地址
    this.retrieveDefaultSenderAddress();
    this.queryCommodity(options.id);

    // 加载快递公司列表
    this.listExpresses();
    this.data.orderInfo.receiverProvince = "请选择地区";
  },
  queryCommodity: function (id) {
    let self = this;
    req.get(config.api.inventory, { id: id })
      .then(res => res.data)
      .then(data => {
        if (data.success) {
          self.setData({ commodityInventory: data.data });
          let inventory = data.data;
          self.data.orderInfo.commodityName = inventory.name;
          self.data.orderInfo.commodityId = inventory.commodityId;
        }
      });

  },

  /**
   * 获取默认寄件人地址
   */
  retrieveDefaultSenderAddress: function () {
    var self = this;
    req.get(config.api.defaultAddress + '/SENDER')
      .then(res => res.data)
      .then(data => {
        if (!data.success) {
          self.setData({
            showSelectAddress: 1
          });
          return;
        }
        self.buildSender(data.data);
        
        self.setData({
          showSelectAddress: 0
        });
      });
  },
  /**
   * 构建sender
   */
  buildSender: function(sender) {
    var self = this;
    self.data.orderInfo.senderName = sender.name;
    self.data.orderInfo.senderTel = sender.tel;
    self.data.orderInfo.senderProvince = sender.province;
    self.data.orderInfo.senderCity = sender.city;
    self.data.orderInfo.senderRegion = sender.region;
    self.data.orderInfo.senderAddressDetail = sender.detail;
    self.data.orderInfo.senderCompany = sender.company;

    self.setData({ orderInfo: self.data.orderInfo });
  },

  /**
   * 获取快递公司信息
   */
  listExpresses: function () {
    let self = this;
    req.get(config.api.expressList)
      .then(res => res.data)
      .then(data => {
        if (data.success) {
          let expresses = self.buildExpresses(data.data);
          self.setData({ expresses: expresses });

          for (let i = 0, len = expresses.length; i < len; ++i) {
            if (expresses[i].checked) {
              self.setData({ express: expresses[i] });
            }
          }
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
   * 跳转到添加寄件人列表
   */
  navigateToSender: function (event) {
    wx.navigateTo({
      url: '/pages/personal/addr/index?type=SENDER&edit=true'
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
   * 更换快递公司
   */
  expressChange: function (e) {
    let expresses = this.data.expresses;
    for (let i = 0, len = expresses.length; i < len; ++i) {
      expresses[i].checked = expresses[i].value == e.detail.value;
      if (expresses[i].checked) {
        this.data.orderInfo.expressType = e.detail.value;
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
    let self = this;
    if (!self.validate()) {
      return;
    }

    req.post(config.api.order + '/book',
      self.data.orderInfo
    )
      .then(res => res.data)
      .then(data => {
        if (data.success) {
          let price = data.data;
          // 跳转至订单明细确认页
          wx.navigateTo({
            url: '/pages/inventory/details/index?price=' + JSON.stringify(price)
          })
        } else {
          wx.showToast({
            title: data.errorMessage
          })
        }
      });
  },
  /**
   * 校验订单参数
   */
  validate: function () {
    if (!this.data.orderInfo.senderName) {
      utils.popError(this, '请填写寄件人');
      return false;
    }

    if (!this.data.orderInfo.receiverName) {
      utils.popError(this, '请填写收件人');
      return false;
    }
    if (!this.data.orderInfo.receiverTel) {
      utils.popError(this, '请填写收件人联系方式');
      return false;
    }
    if (!this.data.orderInfo.receiverAddressDetail || !this.data.orderInfo.receiverProvince || !this.data.orderInfo.receiverCity || !this.data.orderInfo.receiverRegion) {
      utils.popError(this, '请填写收件地址');
      return false;
    }
    if (!this.data.orderInfo.expressType) {
      utils.popError(this, '请选择物流公司');
      return false;
    }
    if (!this.data.orderInfo.commodityQuanity || this.data.orderInfo.commodityQuanity <= 0 || this.data.commodityQuanity > this.data.commodityInventory.amount) {
      utils.popError(this, '商品数量不正确');
      return false;
    }
    return true;
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
        this.data.orderInfo.expressType = express.value;
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
  /**
     * 填写的商品数量
     */
  bindCommodityAmount: function (e) {
    this.data.orderInfo.commodityQuanity = e.detail.value;
    this.data.orderInfo.commodityWeight = e.detail.value * this.data.commodityInventory.weight;
    
  },
  bindNameInput: function (e) {
    this.data.orderInfo.receiverName = e.detail.value;
  },

  bindMobileInput: function (e) {
    this.data.orderInfo.receiverTel = e.detail.value;
  },

  bindCompanyInput: function (e) {
    this.data.orderInfo.receiverCompany = e.detail.value;
  },

  bindAddressInput: function (e) {
    this.data.orderInfo.receiverAddressDetail = e.detail.value;
  },

  /**
   * 省市区选择器级联
   */
  bindRegionChange: function (e) {
    this.data.orderInfo.receiverProvince = e.detail.value[0];
    this.data.orderInfo.receiverCity = e.detail.value[1];
    this.data.orderInfo.receiverRegion = e.detail.value[2];
    this.setData({ orderInfo: this.data.orderInfo });
    
  },

  bindRemark: function (e) {
    this.data.orderInfo.remark = e.detail.value;
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
    // 加载默认寄件人地址
    this.retrieveDefaultSenderAddress();
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