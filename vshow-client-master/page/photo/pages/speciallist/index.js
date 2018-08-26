let { showTips, saveFormId } = require('../../../../utils/util');
let { imgDirUrl } = require('../../../../config');
const app = getApp();

Page({
  data: {
    navActive: 0,
    navList: [
      '全部', 'iphoneX', '恶搞', '炫富', '表白', '游戏', '证件', '红包', '明星', '节日', '其它'
    ],

    fnList: []
  },

  tapNavItem(e){
    let { index } = e.currentTarget.dataset;
    this.setData({
      navActive: index
    });
  },

  onReady(){
    let self = this;
    app.getUserInfo(userInfo => {
      self.init();
    });
    

  },

  init(){
    let self = this;
    showTips('正在获取...', false, 'loading');
    app.getSpecialList((err, fnList) => {
      console.log(err);
      if (err) return showTips('获取失败,稍后重试！');
      showTips('获取成功');
      self.setData({ fnList });
    });
    let { windowHeight } = self.getDevice();
    self.setData({
      winH: windowHeight
    });
  },

  getDevice(){
    let self = this;
    !self.device && (self.device = wx.getSystemInfoSync());
    return self.device;
  }
})