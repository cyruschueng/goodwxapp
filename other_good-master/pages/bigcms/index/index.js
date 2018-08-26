const app = getApp();
const requestUtil = require('../../../utils/requestUtil');
const _DuoguanData = require('../../../utils/data');
Page({
  data: {
    tabIndex: '',//选项卡索引（发现）
    page: 1,//当前请求的页数
    cate_data: [],//分类
    c_data: [],//内容数据
    picdata: [],//轮播图
    indicatorDots: true,//是否面板指示点
    autoPlay: true,//是否自动切换
    change_title: '',//查询标题
    title: '',
    this_page_size: 1,
    this_page_num: 10,
    is_load_more: true,
    is_rmd: 1,//是否推荐
    isforios: false,//是否ios系统
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // wx.setNavigationBarTitle({
    //   title: _DuoguanData.duoguan_share_info.bigcms.share_title,
    // });

    this.setData({ is_load_more: true, this_page_size: 1, c_data: [] });
    this.getBigcmsList();//请求加载数据

    var that = this;
    // 获取系统改变样式
    wx.getSystemInfo({
      success: function (res) {
        var system = res.system;
        var isios = system.substr(0, 3);
        if (isios == 'iOS') {
          that.setData({ isforios: true })
        } else {
          that.setData({ isforios: false })
        }
      }
    })
    //分类
    requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/getCateList.html", {}, (data) => {
      that.setData({ cate_data: data });
    }, this, {});
    // 轮播图
    requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/getCarousel.html", {}, (data) => {
      that.setData({ picdata: data });//轮播图信息
      // 是否自动切换
      if (data.apdata == 1) {
        that.setData({ autoPlay: true });
      } else {
        that.setData({ autoPlay: false });
      }
      // 是否显示面板指示点
      if (data.iddata == 1) {
        that.setData({ indicatorDots: true });
      } else {
        that.setData({ indicatorDots: false });
      }
    }, this, {});

    //先隐藏分享按钮，等加载完数据之后再显示分享
    if (wx.hideShareMenu) wx.hideShareMenu();
    //获取分享信息
    requestUtil.get(_DuoguanData.duoguan_get_share_data_url, { mmodule: 'duoguanbigcms' }, (info) => {
      this.shareInfo = info;
      //显示分享按钮
      if (wx.showShareMenu) wx.showShareMenu();
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示

  },
  //请求获取内容列表
  getBigcmsList: function (isShowLoading) {
    var that = this;
    var this_data = that.data.c_data;
    isShowLoading = isShowLoading || false;

    var requestData = {};
    requestData.cateid = that.data.tabIndex;
    requestData.pagesize = that.data.this_page_size;
    requestData.pagenum = that.data.this_page_num;
    requestData.change_title = that.data.change_title;
    requestData.is_rmd = that.data.is_rmd;

    requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/getIndexDataList.html", requestData, (data) => {
      if (data == null || data == '') {
        that.setData({ is_load_more: false });
      } else {
        if (data.length < that.data.this_page_num) {
          that.setData({ is_load_more: false });
        }
        if (that.data.this_page_size == 1) {
          that.setData({ c_data: data });
        } else {
          this_data = this_data.concat(data);
          that.setData({ c_data: this_data });
        }
      }
      console.log(that.data.c_data)
    }, this, { completeAfter: wx.stopPullDownRefresh, isShowLoading: isShowLoading });
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.setData({ this_page_size: 1, is_load_more: true });
    that.getBigcmsList();//请求内容列表
  },
  //底部滚动之后
  onReachBottom: function () {
    var that = this;
    if (that.data.is_load_more == false) {
      wx.hideNavigationBarLoading();
      return false;
    } else {
      that.setData({ this_page_size: ++that.data.this_page_size });
      that.getBigcmsList(true);//请求内容列表
    }
  },

  onTabChangeTap: function (e) {
    //切换选项卡
    const that = this;
    that.setData({ is_load_more: true })
    var index = e.currentTarget.dataset.tabIndex;
    if (index == 'rmd') {
      that.setData({ tabIndex: '', is_rmd: 1, change_title: '', this_page_size: 1, this_page_num: 10, c_data: [] });
    } else {
      that.setData({ tabIndex: index, is_rmd: 0, change_title: '', this_page_size: '1', c_data: [] });
    }
    that.getBigcmsList();//加载数据
  },
  //搜索
  searchTitle: function (e) {
    this.setData({ title: e.detail.value, is_load_more: true });
  },
  onSearch: function (e) {
    var that = this;
    var title = that.data.title;
    that.setData({ change_title: title, this_page_size: 1, c_data: [], tabIndex: '' });
    that.getBigcmsList();//加载数据
  },
  // 关闭搜索
  closeSearch: function (e) {
    var that = this;
    that.setData({ title: '' });//清除搜索名
    var chtitle = that.data.change_title;

    if (chtitle) {
      that.setData({ tabIndex: '', is_rmd: 1, change_title: '', this_page_size: 1, this_page_num: 10, c_data: [] });
      that.getBigcmsList();//加载数据
    }
  },

  onNavigateTap: function (e) {
    //跳转页面
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  onLunboContent: function (e) {
    //轮播跳转页面
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  onShareAppMessage: function () {
    //分享页面
    this.shareInfo = this.shareInfo || {};
    const title = this.shareInfo.title || '微头条';
    const desc = this.shareInfo.desc || '';
    return {
      title: title,
      desc: desc,
      path: 'pages/bigcms/index/index'
    };
  },
  //生成页面二维码
  getCode: function (e) {
    const that = this;
    const url = _DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/FXIndexCode.html&&token=" + _DuoguanData.duoguan_user_token + "&_r=" + (new Date().getTime());
    wx.showToast({
      title: '正在努力加载中...',
      icon: 'loading',
      duration: 10000
    });
    wx.getImageInfo({
      src: url,
      success: (res) => {
        console.log(1)
        wx.hideToast();
        wx.previewImage({
          current: res.path,
          urls: [res.path],
        });
      },
      fail: function (res) {
        console.error(res);
        wx.showModal({ content: '加载失败！', showCancel: false, });
        wx.hideToast();
      },
      complete: function (res) {
        console.log(res)
      }
    });
  },

  changeSearchStatus: function () {
    this.setData({ search_open_status: this.data.search_open_status ? false : true });
  }
})
