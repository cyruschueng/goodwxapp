import { Wallet } from './wallet-model.js';
import SafeRenderUtil from '../../utils/saveRender.js';
var wallet = new Wallet();
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['未使用', '已使用/过期'],
    currentNavbar: 0,
    cardList: [], // 未使用的红包
    uselessCardList: [],// 已使用或者过期红包
    params: [
      {
        hasMore: true,
        page: 1,
      },
      {
        hasMore: true,
        page: 1,
      }
    ],
    loadingHidden: false,
    isShowQrCode: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var current = this.data.currentNavbar;
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 80;
        that.setData({
          winHeight: calc
        });
      }
    });
    this.render0 = new SafeRenderUtil({
      arrName: 'cardList',
      setData: this.setData.bind(this)
    });
    this.pullData();
  },
  pullData() {
    var that = this;
    var params = that.data.params;
    var current = that.data.currentNavbar, size = 10;
    var postData = {
      data: {
        page: params[current].page,
        size: size,
        usedStatus: current,
        current: current
      }
    };
    wallet.getCardList(postData, res => {
      if (res.status) {
        if (params[current].page + 1 > Math.ceil(res.total / size)) {
          params[current].hasMore = false;
        }
        var render = `render${current}`;
        this[render].addList(res.data);
      }
      that.setData({
        flag: true,
        loadingHidden: true,
        params: params
      });
    });
  },

  /**
   * 切换顶部tabbar
   */
  switchNav(e) {
    var index = e.currentTarget.dataset.idx;
    if (index == this.data.currentNavbar) return false;
    /**
     * 这里更新currentNavbar 是为了让swiper 组件进行变换
     * 然后自动调用switchTab 方法
     */
    this.setData({
      currentNavbar: index
    })

  },
  /**
   * 左右滑动
   */
  switchTab(e) {
    var current = e.detail.current;
    this.setData({
      currentNavbar: current
    });
    // 如果当前类别没有数据则提示加载中并且从后端获取第一页数据
    if (!this.existData(current)) {
      // 获取当前数据（全部、收藏、点赞）
      this.setData({
        loadingHidden: false
      });
      var render = `render${current}`;
      this[render] = new SafeRenderUtil({
        arrName: 'uselessCardList',
        setData: this.setData.bind(this)
      });
      this.pullData();
    }
  },
  existData(current) {
    var list = current == 0 ? 'cardList' : 'uselessCardList';
    if (this.data[list].length)
      // 如果当前分类存在数据
      return true;
    else
      return false;
  },
  /**
   * 获取下一页更多数据
   */
  loadMoreData(e) {
    var index = this.data.currentNavbar;
    var params = this.data.params;
    var data = params[index], flag = this.data.flag;
    // console.log(flag);
    /**
     * 通过 flag 变量让加载下一页只执行一次
     */
    if (data.hasMore && flag) {
      data.page = data.page + 1;
      this.setData({
        params: params,
        flag: false
      });
      this.pullUpLoadData();
    }
  },
  // 显示二维码
  showQrCode(e) {
    var id = wallet.getDataSet(e, 'id');
    this.closeQrCode();
  },
  closeQrCode() {
    this.setData({
      isShowQrCode: !this.data.isShowQrCode
    });
  }
})