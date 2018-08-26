import { Particulars } from './particulars-model.js';
import SafeRenderUtil from '../../utils/saveRender.js';

var app = getApp();
var particulars = new Particulars();

Page({
  data: {
    navbar: ['全部', '浏览商品', '预购商品', '点赞'],
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    currentNavbar: 0, // 当前选项
    allList: [], // 全部浏览历史记录
    viewList: [], // 点赞的商品列表
    collectList: [], // 收藏的商品列表
    praiseList: [], // 点赞客户列表
    params: [
      {
        hasMore: true,
        page: 1,
      },
      {
        hasMore: true,
        page: 1,
      },
      {
        hasMore: true,
        page: 1,
      },
      {
        hasMore: true,
        page: 1,
      }
    ],
    winHeight: '', // 内容高度
    loadingHidden: false,
    totalCount: 0,
  },
  onLoad: function () {
    var that = this;
    var current = this.data.currentNavbar;
    this.data.storeNo = wx.getStorageSync('storeNo');
    // // 默认是所有浏览历史记录列表数据
    this.render0 = new SafeRenderUtil({
      arrName: 'allList',
      setData: this.setData.bind(this)
    });
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 314;
        that.setData({
          winHeight: calc
        });
      }
    });
    wx.showLoading({
      title: '加载中...'
    })
    this.getTotalCustomer();
    this.pullUpLoadData();
  },

  getTotalCustomer() {
    var that = this;
    var params = {
      data: {
        storeNo: this.data.storeNo
      }
    };
    particulars.getTotalCount(params, res => {
      if (res && res.status) {
        that.setData({
          totalCount: res.data
        });
      }
    })
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
  // 获取全部、收藏、点赞的数据
  pullUpLoadData() {
    var that = this;
    var params = that.data.params;
    var current = that.data.currentNavbar, size = 10;
    /**
     * 此处还需要通过currentNavbar 
     * 来向后端请求不同种类的数据
     */
    //todo
    var postData = {
      current,
      data: {
        page: params[current].page,
        storeNo: this.data.storeNo,
        size,
      }
    };
    particulars.getCustomerData(postData, data => {
      if (data.status) {
        if (params[current].page + 1 > Math.ceil(data.total / size)) {
          params[current].hasMore = false;
        }
        var render = `render${current}`;
        this[render].addList(data.data);
      }
      that.setData({
        flag: true,
        loadingHidden: true,
        params: params
      });
      wx.hideLoading();
    })
  },
  // 滚动切换标签样式
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
    var nameList = this.data.navbar;
    // 如果当前类别没有数据则提示加载中并且从后端获取第一页数据
    if (!this.existData(current)) {
      // 获取当前数据（全部、收藏、点赞）
      wx.showLoading({
        title: '加载中...'
      });
      var render = `render${current}`;
      this[render] = new SafeRenderUtil({
        arrName: current == 1 ? 'viewList' : current == 2 ? "collectList" : 'praiseList',
        setData: this.setData.bind(this)
      });
      this.pullUpLoadData();
    }
  },
  /**
   * 判断是否存在数据
   */
  existData(current) {
    var list = current == 0 ? 'allList' : current == 1 ? 'viewList' : current == 2 ? "collectList" : 'praiseList';
    if (this.data[list].length)
      // 如果当前分类存在数据
      return true;
    else
      return false;
  },

})