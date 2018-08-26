
var common = require('../../../utils/common.js');
var app = getApp();
var that;
Page({
  data: {
    title: '历年成绩',
    scoreList: [],
    detailStatus: false,
    scoreDetail: {},
    openid:'',
    secret:'',
    cookie:'',
    name:'',
    loading: false,
    imageUrl:'/image/yzmloading.png',
    yzmindex:1,
    help: {
      helpStatus: false,
      faqList: [
        {
          question: '1.为什么无法查询成绩?',
          answer:
            '由于在一段时间内有大规模流量同时访问教务处,以致其无法提供正常的服务。如果成绩不能及时更新,请稍后刷新重试！'
        }
      ]
    }
  },

  onLoad: function() {
    that = this;
   
    if (wx.getStorageSync('isBindFlag') != 1) {
      wx.showToast({
        title: '请先绑定学号',
        image: '/image/common/smile.png',
        duration: 2000
      });
      setTimeout(function () {
        wx.navigateTo({
          url: '../../login/login',
        })
      }, 2000);
     
      }
  },
  onShow:function(){
    this.setData({
      name: wx.getStorageSync('name')
    })
  },
  onPullDownRefresh: function() {
    // this.getScore();
    // wx.stopPullDownRefresh();
  },

  // 获取成绩
  getScore: function() {
    // 加载中
    wx.showLoading({
      title: '获取中',
      mask: true
    });
    console.log(wx.getStorageSync('xh'));
    //发起网络请求
    wx.request({
      url: getApp().data.updateCJUrl,
      method: 'POST',
      data: {
        xh: wx.getStorageSync('xh'),
        pwd1: wx.getStorageSync('pwd'),
        secret: this.data.secret,
        cookie:this.data.cookie,
        xn: '2015-2016',
        xq: '2',
        type: '1',

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: requestRes => {
        var _requestRes = requestRes.data;
        console.log(_requestRes);

        wx.hideLoading();
        if (_requestRes.stuInfo.flag == 1) {
          // 更新视图
          this.setData({
            scoreList: _requestRes.chengji
          });
        } else if (_requestRes.stuInfo.flag == 0) {
          wx.showToast({
            title: '登录失败，请重试',
            image: '/image/common/fail.png',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '未知错误',
            image: '/image/common/fail.png',
            duration: 2000
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: '未知错误',
          image: '/image/common/fail.png',
          duration: 2000
        });
      }
    });
  },
  // 详情
  showDetail: function(e) {
    var data = e.currentTarget.dataset.score;
    // 更新视图
    this.setData({
      detailStatus: true,
      scoreDetail: data
    });
  },

  hideDetail: function(e) {
    if (e.target.id === 'score-detail' || e.target.id === 'close-detail') {
      this.setData({
        detailStatus: false
      });
    }
  },
  addDiary: function (event) {
    var yzm = event.detail.value.yzm;
    console.log(yzm)
    if (!yzm) {
      common.showTip("不能为空", "loading");
    }
    else{
      that.setData({
        secret:yzm,
        loading: true,
        writeDiary: false,
        loading: false,

      })
      this.getScore();
    }
  },
  noneWindows: function () {
    that.setData({
      writeDiary: "",
      modifyDiarys: ""
    })
  },
  // 刷新
  showHelp: function() {
    this.setData({
      writeDiary: true
    })
    this.setData({
      openid: wx.getStorageSync('openid')
    })
    console.log(this.data.openid)
    //获取验证码
    this.getCookie();
  },
  hideHelp: function(e) {
    if (e.target.id === 'help' || e.target.id === 'close-help') {
      this.setData({
        'help.helpStatus': false
      });
    }
  },
  updatecj:function(e){
    
  },
  getCookie() {
    that = this
    that.setData({
      yzmindex: this.data.yzmindex + 1,
      imageUrl: '/image/yzmloading.png',
    })
    console.log(this.data.yzmindex)
    //获取验证码
    wx.request({
      url: getApp().data.getCookie,
      data: {
        qq: this.data.openid + this.data.yzmindex,
        pwd: '123'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
          cookie: res.data.cookie,
          imageUrl: 'https://fyapi.sinyu1012.cn/test/yzm/' + that.data.openid + that.data.yzmindex + '.png'
        })
      }
    })
  }

});
