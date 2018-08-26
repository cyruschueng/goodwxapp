import api from '../../../api/api_v1.js'
import { $wuxToast } from '../../../packages/@wux/components/wux'
import { $wuxDialog } from '../../../packages/@wux/components/wux'
import { Cache } from '../../../utils/cache.js';
var cache = new Cache();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themes: [],
    choose_id: 0,
    choose_color: '#000000',
    audioAction: {
      method: 'pause'
    }
  },
  card_id: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getThemeList();
  },

  getThemeList: function () {
    var that = this;
    api.getThemeList({
      success: (res) => {
        console.log('getThemeList', res.data.data);
        if (res.data.res === 0) {
          that.setData({
            themes: res.data.data
          })
        }
      }
    })
  },

  radioChange: function (e) {
    var that = this;
    console.log(e);
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var themes = this.data.themes;
    for (var i = 0, len = themes.length; i < len; ++i) {
      themes[i].checked = themes[i].id == e.detail.value;
      if ( themes[i].checked ) {
        that.setData({ 
          choose_id: themes[i].id,
          choose_color: themes[i].bg_color
        })
      }
    }
    this.setData({
      themes: themes
    });
  },
  themePreview: function () {
    if (this.data.choose_id === 0) {
      $wuxToast.show({
        type: 'text',
        timer: 1500,
        color: '#fff',
        text: '请选择一套主题',
        success: () => console.log('请选择一套主题')
      })
      return false;
    }
    var url = 'https://www.juhuibei.com/card/' + this.data.choose_id
    wx.navigateTo({
      url: '../view/index?url=' + url + '&color=' + this.data.choose_color,
    })
  },

  makeCard: function () {
    if (this.data.choose_id === 0) {
      $wuxToast.show({
        type: 'text',
        timer: 1500,
        color: '#fff',
        text: '请选择一套主题',
        success: () => console.log('请选择一套主题')
      })
      return false;
    } else { // 选择了主题 1 检查是是否登录，2 检查会员等级 3 为符合条件的会员创建邀请卡
      this.getVipInfo();
    }
    
  },

  getVipInfo: function () {
    let that = this;
    let uid = cache.get('uid');
    if (uid) {
      api.getVipInfo({
        success: (res) => {
          console.log('getVipInfo', res.data.data);
          if (res.data.res === 0) {
            let vip = res.data.data.vip;
            let card_count = res.data.data.card_count;
            that.card_id = res.data.data.card_id;

            if (vip < 1) { // 进入支付升级vip1
              that.toPayOrder(1);

            } else if (vip === 1 && card_count === 1) { // 先提示 升级或更新card_id的关联theme_id和module_data数据

              if (res.data.data.theme_id === this.data.choose_id) { // 已经有了一套选择的主题的请柬，跳转到我的请柬页面
                that.toCardMy();
              } else { // 与创建的不同的请柬
                that.showDialog();
              }
              
            } else { // 创建一个card
              that.createCard();
            }
          }
        }
      })

    }
  },

  /**
   * 跳转到我的请柬
   */
  toCardMy: function () {
    wx.navigateTo({ url: '../my/index' })
  },

  /**
   * 转到支付订单 并创建一个card
   */
  toPayOrder: function (vip) {
    wx.navigateTo({
      url: '../order/index?theme_id=' + this.data.choose_id + '&vip=' + vip,
    })
  },

  showDialog() {
    let dialogComponent = this.selectComponent('.wxc-dialog');
    dialogComponent && dialogComponent.show();
  },

  hideDialog() {
    let dialogComponent = this.selectComponent('.wxc-dialog');
    dialogComponent && dialogComponent.hide();
  },

  /**
   * 覆盖制作
   */
  onCoverMake: function () {
    let that = this;
    let card_id = this.card_id;
    let theme_id = this.data.choose_id;
    if (card_id !== 0 && theme_id !== 0) {
      api.coverMakeCard({
        method: 'post',
        data: {
          card_id: card_id,
          theme_id: theme_id,
        },
        success: (res) => {
          if (res.data.res === 0) {
            that.toCardMy();
          }
        }
      })
    }
    this.hideDialog();
  },

  /**
   * 升级制作
   */
  onUpdateMake: function () {
    this.toPayOrder(2);
    this.hideDialog();
  },

  /**
   * 取消
   */
  onCancel: function() {
    console.log('点击了取消按钮');
    this.hideDialog();
  },

  createCard : function () {
    let that = this;
    api.createCard({
      method: 'post',
      data: {
        theme_id: that.data.choose_id
      },
      success: (res) => {
        if (res.data.res === 0) {
          that.toCardMy();
        }
      }
    })
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