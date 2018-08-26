// pages/home/article/article.js
var _function = require('../../../utils/functionData');
const app = getApp();
const requestUtil = require('../../../utils/requestUtil');
const _DuoguanData = require('../../../utils/data');
const WxParse = require('../../../wxParse/wxParse.js');
import plugUtil from '../../../utils/plugUtil';


var allinfo = [];//页面跳转所带来的参数
//当前播放标识
const playKey = 'play_info';
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  timeId: 0,
  palyUrl: '',
  data: {
    src: '',
    continue_read: false,//继续阅读
    single_read: 'single',// 单篇calllllllll阅读
    playStatus: 0,//未播放
    stepTime: "00:00",//播放进度
    durationTime: "00:00",//时长
    progress: '0',
    to_vip: 'month',//成为会员
    write_msg: false,//写留言
    zanshang_show: false,//赞留言
    message: '',//留言
    info_data: [],//详情内容
    article_good_count: '',//文章点赞数
    comment_list: [],//留言列表
    id: '',
    typeid: '',
    title: '',
    page: 1,//评论当前请求的页数
    c_page_size: 1,
    c_page_num: 5,
    is_load_more: true,
    readnum: '',//阅读量
    is_avAutoPlay: 0,//是否自动播放音视频
    jindu: 0,//视频播放进度
    isToplay: false,
    isEnd: false,
    iszan: 0,//用户是否点赞文章
    is_collection: false,//用户是否收藏该文章
    is_otherShang: false,//其他金额打赏
    tabOffsetTop: '',//距离顶部像素
  },



  //加载数据
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    //更新阅读量
    var id = options.id;
    requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/getReadnum.html", { id: id }, (data) => {
      this.setData({ readnum: data })
    }, this, {});

    allinfo = options;
    this.setData({ is_load_more: true, c_page_size: 1, info_data: [] });
    this.getArticleInfo();//请求加载数据

    // 监听播放、暂停、停止
    wx.onBackgroundAudioStop(this.onStop);
    wx.getBackgroundAudioPlayerState({
      success: (res) => {
        const playInfo = wx.getStorageSync(playKey),
          dataUrl = res.dataUrl;
        if (!playInfo || res.status != 1 || options.id != playInfo.id) return;
        this.startProgressListener();
      }
    })

  },
  onShow: function () {

  },
  /**
   * 页面卸载
   */
  onUnload: function () {
    this.stopProgressListener();
  },

  /**
   * 启动进度监听器
   */
  startProgressListener: function () {
    const that = this;
    const handler = function () {
      wx.getBackgroundAudioPlayerState({
        success: that.onProgressUpdate
      });
    };
    this.timeId = setInterval(handler, 250);
    handler();
  },

  /**
   * 停止进度监听器
   */
  stopProgressListener: function () {
    clearInterval(this.timeId);
  },
  //播放更新时间
  onProgressUpdate: function (res) {
    // console.log(res)
    if (res.status == 1) {
      this.playUrl = res.dataUrl;
      var stepTime = res.currentPosition, duration = res.duration,
        stepMinutes = Math.floor(stepTime / 60), stepSeconds = Math.floor(stepTime % 60),
        durationMinutes = Math.floor(duration / 60), durationSeconds = Math.floor(duration % 60);
      var stepTimeStr = (stepMinutes < 10 ? "0" + stepMinutes : stepMinutes) + ":" + (stepSeconds < 10 ? "0" + stepSeconds : stepSeconds);
      var durationStr = (durationMinutes < 10 ? "0" + durationMinutes : durationMinutes) + ":" + (durationSeconds < 10 ? "0" + durationSeconds : durationSeconds);
      var progress = stepTime / duration * 100;
      // console.log(progress, res);
      const info = {
        stepTime: stepTimeStr,
        durationTime: durationStr,
        progress: progress,
        downloadPercent: res.downloadPercent
      };
      if (res.status == 0 || res.status == 1)
        info['playStatus'] = res.status;
      this.setData(info);
    } else {
      return;
    }

  },
  onTogglePlayTap: function (e) {
    const that = this;

    if (that.data.playStatus) {
      wx.pauseBackgroundAudio({
        success: that.onPause,
        fail: (res) => {
          wx.showModal({
            content: '暂停失败：' + res.errMsg,
            showCancel: false,
          });
        }
      });
    } else {
      const playInfo = wx.getStorageSync(playKey)
      if (that.playUrl != playInfo.path) {
        wx.stopBackgroundAudio();
      }
      wx.playBackgroundAudio({
        dataUrl: that.data.info_data.c_info.upurl,
        complete: that.onPlay,
      });
    }
  },
  // 音频播放\暂停\停止
  onPlay: function () {
    this.setData({ playStatus: 1 });
    wx.setStorageSync(playKey, {
      id: this.data.id,
      path: this.data.info_data.c_info.upurl
    });
    this.startProgressListener();
  },
  onPause: function () {
    this.setData({ playStatus: 0 });
    this.stopProgressListener();
  },
  onStop: function (res) {
    this.setData({ playStatus: 0 });
    this.stopProgressListener();
    wx.removeStorageSync(playKey);
    wx.getBackgroundAudioPlayerState({
      success: this.onProgressUpdate
    });
  },
  // 请求获取内容详情
  getArticleInfo: function (isShowLoading) {
    var that = this;
    isShowLoading = isShowLoading || false;
    var id = allinfo.id;
    var typeid = allinfo.typeid;
    var this_data = that.data.comment_list;
    var requestData = {};
    requestData.id = id;
    requestData.typeid = typeid;
    requestData.pagesize = that.data.c_page_size;
    requestData.pagenum = that.data.c_page_num;
    requestData.is_pay_edition = 1;

    requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/getArticleInfo.html", requestData, (data) => {
      that.setData({
        info_data: data,
        article_good_count: data.c_info.good_count,
        id: data.c_info.id,
        typeid: data.c_info.typeid,
        title: data.c_info.title,
        is_avAutoPlay: data.pddata.is_avAutoPlay,
        iszan: data.c_info.iszan,
        is_collection: data.c_info.is_collection,
      });
      if (data.comment == null || data.comment == '') {
        that.setData({ is_load_more: false });
      } else {
        if (data.comment.length < that.data.c_page_num) {
          that.setData({ is_load_more: false });
        }
        if (that.data.c_page_size == 1) {
          that.setData({ comment_list: data.comment });
        } else {
          this_data = this_data.concat(data.comment);
          that.setData({ comment_list: this_data });
        }
      }
      WxParse.wxParse('content', 'html', data.c_info.content, that);

      //开启音频自动播放
      if (that.data.is_avAutoPlay == 1 && that.data.typeid == 2) {
        const playaudio = wx.getStorageSync(playKey)
        if (that.data.info_data.c_info.upurl != playaudio.path) {
          wx.stopBackgroundAudio();
          wx.playBackgroundAudio({
            dataUrl: that.data.info_data.c_info.upurl,
            complete: that.onPlay,
          });
        }
      } else {
        if (that.data.typeid == 2) {
          wx.onBackgroundAudioStop(this.onStop);
          wx.getBackgroundAudioPlayerState({
            success: (res) => {
              const playInfo = wx.getStorageSync(playKey),
                dataUrl = res.dataUrl;
              if (!playInfo || res.status != 1 || allinfo.id != playInfo.id) return;
              this.startProgressListener();
            }
          })
        } else {
          wx.stopBackgroundAudio();
        }
      }
    }, this, { completeAfter: wx.stopPullDownRefresh, isShowLoading: isShowLoading });
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.setData({ c_page_size: 1, is_load_more: true });
    that.getArticleInfo();

  },
  //滚动触底加载
  onReachBottom: function () {
    var that = this;
    if (that.data.is_load_more == false) {
      wx.hideNavigationBarLoading();
      return false;
    } else {
      that.setData({ c_page_size: ++that.data.c_page_size });
      that.getArticleInfo(true);
    }
  },

  // 监听视频加载错误状态
  videoErrorCallback: function (e) {
    console.log('视频错误信息:' + e.detail.errMsg);
  },
  //视频开始播放
  toPlay: function () {
    this.setData({ isToplay: true })
  },
  // 视频播放进度
  onTimejindu: function (res) {
    var nowtime = res.detail.currentTime
    var time = res.detail.duration
    var jindu = parseInt((nowtime / time) * 100)
    this.setData({ jindu: jindu, isToplay: false })
  },

  //点赞文章
  toZan: function (e) {
    var that = this;
    var cid = e.currentTarget.id;
    requestUtil.post(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/toDianzanArticle.html", { cid: cid }, (data) => {
      if (data.status == 1) {
        that.setData({
          article_good_count: ++that.data.article_good_count,
          iszan: 1
        })
      } else {
        wx.showToast({
          title: data.infos,
          icon: 'loading',
          duration: 2000
        })
      }

    }, this, {});
  },

  //跳转到该类别文章列表页
  toCateList: function (e) {
    var url = e.currentTarget.dataset.url
    var param = e.currentTarget.dataset.param;
    var path = param == "" ? url : url + "?" + param;
    wx.reLaunch({
      url: path,
    })

  },

  //跳转到包含关键词文章列表页
  toKeywordList: function (e) {
    var url = e.currentTarget.dataset.url
    var param = e.currentTarget.dataset.param;
    var path = param == "" ? url : url + "?" + param;
    wx.reLaunch({
      url: path,
    })
  },

  onNavigateTap: function (e) {
    //跳转相关类别文章详情页面
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  
  //点击留言展示图标
  CommentLocation: function (e) {
    console.log(e)
    var totap = e.currentTarget.offsetTop
    //滚动到留言页
    wx.pageScrollTo({
      scrollTop: totap,
    })
  },

  // 更新距离顶部像素距离
  updateTabOffsetTop() {
    const selectorQuery = wx.createSelectorQuery();
    selectorQuery.select('#comment').boundingClientRect();
    selectorQuery.selectViewport().scrollOffset();
    selectorQuery.exec((res) => {
      console.log(res)
      if (!res[0] || !res[1]) return;
      if (res[1].scrollTop > 0) {
        if (res[0].top > 0) {
          this.tabOffsetTop = res[1].scrollTop + res[0].top;
        } else {
          this.tabOffsetTop = (res[1].scrollTop - Math.abs(res[0].bottom)) + res[0].height * 2;
        }
      } else {
        this.tabOffsetTop = res[0].top;
      }
      this.setData({
        tabOffsetTop: this.tabOffsetTop,
      })
    });

  },

  // 写留言显示
  write_msg: function () {
    this.setData({
      write_msg: true,
    })
  },
  //留言
  formSubmit: function (e) {
    var that = this;
    var cid = e.detail.target.id;
    var ctitle = that.data.info_data.c_info.title;
    var requestData = {};

    var formData = e.detail.value;
    formData.cid = cid;
    formData.ctitle = ctitle;
    requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/toComment.html", formData, (data) => {
      wx.showToast({
        title: data,
        icon: 'loading',
        duration: 2000
      })
      //关闭评论输入框
      that.setData({ write_msg: false, is_load_more: true, c_page_size: 1, c_page_num: 5 });
      that.getArticleInfo();//调用下拉刷新

    }, this, {});
  },
  toClose: function (e) {
    //关闭评论输入框
    this.setData({ write_msg: false, })
  },

  //点赞留言评论
  toDianzan: function (e) {
    var that = this;
    var pid = e.currentTarget.id;
    requestUtil.post(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/toDianzanComment.html", { pid: pid }, (data) => {
      if (data.status == 1) {
        that.setData({
          comment_list: data.comment,
        })
      } else {
        wx.showToast({
          title: data.infos,
          icon: 'loading',
          duration: 2000
        })
      }
    }, this, {});
  },

  //返回首页
  toIndex: function (e) {
    wx.switchTab({
      url: e.currentTarget.dataset.url
    })
  },
  //收藏
  toCollection: function (e) {
    console.log(e)
    var that = this;
    var cid = e.currentTarget.id
    requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/toCollection.html", { cid: cid }, (data) => {
      if (data.status == 1) {
        this.setData({ is_collection: true });
      } else {
        this.setData({ is_collection: false });
      }
      wx.showToast({
        title: data.infos,
        icon: 'loading',
        duration: 2000
      })
    }, this, {});

  },
  //分享
  onShareAppMessage: function () {
    var that = this
    return {
      title: that.data.title,
      desc: '',
      path: '/pages/bigcms/article/article?id=' + that.data.id + '&typeid=' + that.data.typeid,
      success: () => {
        //分享好友获取抽奖次数
        plugUtil.share()
      }
    }
  },

  //点击留言展示图标
  commentLocation: function (e) {
    this.updateTabOffsetTop();//更新评论列表头距顶部距离，并滚动
  },
  // 更新距离顶部像素距离
  updateTabOffsetTop() {
    const selectorQuery = wx.createSelectorQuery();
    selectorQuery.select('#comment').boundingClientRect();
    selectorQuery.selectViewport().scrollOffset();
    selectorQuery.exec((res) => {
      console.log(res)
      if (!res[0] || !res[1]) return;
      if (res[1].scrollTop > 0) {
        if (res[0].top > 0) {
          this.tabOffsetTop = res[1].scrollTop + res[0].top;
        } else {
          this.tabOffsetTop = (res[1].scrollTop - Math.abs(res[0].bottom)) + res[0].height * 2;
        }
      } else {
        this.tabOffsetTop = res[0].top;
      }
      this.setData({
        tabOffsetTop: this.tabOffsetTop,
      })

    //滚动到留言页
      wx.pageScrollTo({
        scrollTop: this.data.tabOffsetTop,
      })
    });
  },

  //生成页面二维码
  getCode: function (e) {
    const that = this;
    var id = that.data.id;
    var typeid = that.data.typeid;
    const url = _DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/FXCode.html&id=" + id + "&typeid=" + typeid + "&token=" + _DuoguanData.duoguan_user_token + "&_r=" + (new Date().getTime());
    wx.showToast({
      title: '正在努力加载中...',
      icon: 'loading',
      duration: 10000
    });
    wx.getImageInfo({
      src: url,
      success: (res) => {
        console.log(res.path);
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
  // 继续阅读
  continue_read: function () {
    this.setData({
      continue_read: this.data.continue_read ? false : true,
    })
  },
  // 关闭继续阅读付费页
  toCloseRead: function () {
    this.setData({
      continue_read: false,
    })
  },
  // 单篇阅读
  single_read_change: function () {
    this.setData({
      single_read: 'single',
    })
  },
  // 成为会员
  to_vip_change: function () {
    this.setData({
      single_read: 'to_vip',
    })
  },
  to_vip_month: function () {
    this.setData({
      to_vip: 'month',
    })
  },
  to_vip_quarter: function () {
    this.setData({
      to_vip: 'quarter',
    })
  },
  to_vip_year: function () {
    this.setData({
      to_vip: 'year',
    })
  },
  //阅读支付
  formArticlePay: function (e) {
    var that = this;
    var cid = e.target.id;
    var money = e.currentTarget.dataset.money;

    requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/PayTypeApi/makePay.html", { cid: cid, money: money }, (data) => {
      wx.requestPayment({
        'timeStamp': data.timeStamp,
        'nonceStr': data.nonceStr,
        'package': data.package,
        'signType': 'MD5',
        'paySign': data.paySign,
        'success': function (res) {
          console.log("支付成功")
          that.setData({
            continue_read: false,
          })
          that.getArticleInfo();
        },
        'fail': function (res) {
          console.log("支付失败")
        },
        'complete': function (res) {

        }
      })
    }, this, {});
  },
  // 赞赏打赏
  zanshang_show: function () {
    this.setData({
      zanshang_show: true,
    })
  },
  //定额打赏
  shangMoney: function (e) {
    var money = e.target.dataset.name;
    console.log(money)
  },
  //其他金额打赏
  otherShangMoney: function () {
    this.setData({
      is_otherShang: true,
    })
  },
  //关闭其他金额打赏
  closeOther: function () {
    this.setData({
      is_otherShang: false,
      zanshang_show: false,
    })
  },
  // 关闭打赏页
  toCloseShang: function () {
    this.setData({
      zanshang_show: false,
    })
  },

})