import api from '../../../api/api_v1.js'
import { Token } from '../../../utils/token.js';
import { Cache } from '../../../utils/cache.js';
var cache = new Cache();
Page({
  /**
   * 会员信息
   */
  card: [
    {
      name: '黄金会员',
      price: '28.00',
      shop_price: '28.00',
      product_id: 1,
      power: [
        '1. 可制作一份婚礼请柬',
        '2. 可持久保存一生记念',
        '3. 可支持在线播放视频',
        '4. 可分享请柬不限次数',
        '5. 可生成小程序码卡片',
        '6. 可使用所有风格模板',
        '7. 可选择90首背景音乐',
        '8. 可时时接收好友祝福',
        '9. 可查询出席婚礼名单',
      ]
    },
    {
      name: '钻石会员',
      price: '52.00',
      shop_price: '24.00',
      product_id: 2,
      power: [
        '1. 可制作多份婚礼请柬',
        '2. 可持久保存一生记念',
        '3. 可支持在线播放视频',
        '4. 可分享请柬不限次数',
        '5. 可生成小程序码卡片',
        '6. 可使用所有风格模板',
        '7. 可选择90首背景音乐',
        '8. 可时时接收好友祝福',
        '9. 可查询出席婚礼名单',
      ]
    },
    {
      name: '至尊会员',
      price: '99.00',
      shop_price: '47.00',
      product_id: 3,
      power: [
        '1. 可制作多份婚礼请柬',
        '2. 可持久保存一生记念',
        '3. 可支持在线播放视频',
        '4. 可分享请柬不限次数',
        '5. 可生成小程序码卡片',
        '6. 可使用所有风格模板',
        '7. 可选择90首背景音乐',
        '8. 可时时接收好友祝福',
        '9. 可查询出席婚礼名单',
        '10. 一对一服务定制请柬',
      ]
    }
  ],
  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    title: '邀请函',
    desc: '个人中心可编辑邀请函',
    order_sn: '',
    theme_id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (options.vip !== undefined && options.theme_id) {
      this.setData({ 
        info: this.card[options.vip - 1],
        theme_id: options.theme_id
      });

      let token = cache.get('token');
      if (token) { // 登录
        this.setData({ token: token })
        console.log('token1', this.data.token);

        this.makeOrder();

      } else {        
        let tk = new Token();

        tk.getTokenFromServer((cb) => {
          that.setData({ token: cb.token })
          console.log('token2', this.data.token);

          that.makeOrder();
        });

      }
    }

  },

  /**
   * 生成订单
   */
  makeOrder: function () {
    var that = this;
    api.placeOrder({
      method: 'post',
      data: {
        products: [
          { product_id: this.data.info.product_id, count: 1 }
        ]
      },
      success: (res) => {
        console.log('makeOrder', res.data);
        that.setData({
          order_sn: res.data.order_sn,
          order_id: res.data.order_id
        })
      }
    })
  },

  /**
   * 订单支付
   */
  payOrder: function () {
    let that = this;
    api.getPreOrder({
      method: 'post',
      data: { id: that.data.order_id },
      success: (res) => {
        console.log('getPreOrder', res.data);
        var time_stamp = res.data.timeStamp;
        if (time_stamp) { // 可以支付
          wx.requestPayment({
            'timeStamp': time_stamp.toString(),
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': res.data.signType,
            'paySign': res.data.paySign,
            success: function () {
              console.log('订单支付成功！');
              that.createCard();
            }
          });
        }
      }
    })
  },

  /**
   * 创建请柬
   */
  createCard: function () {
    let that = this;
    api.createCard({
      method: 'post',
      data: {
        theme_id: that.data.theme_id
      },
      success: (res) => {
        console.log('createCard', res.data);
        if (res.data.res === 0) {
          wx.redirectTo({ url: '/pages/card/my/index' })
        }
      }
    })
  },

  /**
   * 关闭当前页，返回上一页
   */
  toBack: function () {
    wx.navigateBack({ delta: 1 })
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

  }
})