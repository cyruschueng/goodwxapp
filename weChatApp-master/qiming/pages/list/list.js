//index.js
//获取应用实例
var app = getApp()
var hasMore;
var currentPage=1;
var isLoading;
var s_list;
var pageCount=30;
var api = require('../../api.js')
var util = require('../../utils/util.js')
var payKey
var nonceStr;
var packagea;
var paySign;
var signType;
var timeStamp;

Page({
  data: {
  },
    onShareAppMessage: function () {
        var shareText = '免费起名，生辰八字起名，宝宝起名。名字打分，三才配置解析和五格命理分析';
        return {
            title: shareText,
            path: "/pages/index/index"
        }
    },
  onLoad: function (options) {
      let that = this
      currentPage=1;
      api.login(function (user) {
          console.log(user)
      },function () {

      },'必须授权登录之后才能操作呢，是否重新授权登录？')
      //that.setData({desc: wx.getStorageSync('qiming_info')});
      let _fname = wx.getStorageSync('fName')
      that.setData({fName: _fname});
      that.setData({xingshi: options.xingshi});
      that.setData({pianhao: options.pianhao});
      that.setData({xingbie: options.xingbie});
      payKey=_fname+'_'+options.xingshi+'_'+options.pianhao+'_'+options.xingbie+'_pay'
      //that.setData({gender: app.config.sex[parseInt(wx.getStorageSync('gender'))].name});
      //that.setData({xingshi: app.config.pianhao1[parseInt(wx.getStorageSync('pianhao1'))].name});
      //that.setData({pianhao: app.config.pianhao2[parseInt(wx.getStorageSync('pianhao2'))].name});
      isLoading = false;
      s_list = wx.getStorageSync('qiming_data')
      if(s_list.length > pageCount){
          hasMore = true
      }
      that.getList();
  },
    getList: function() {
      if(!this.data.data_list){this.data.data_list = []}
        if (isLoading) {
            return;
        } else {
            isLoading = true;
        }
        var that = this
        console.log(currentPage)
        console.log(this.hasPay())
        if(currentPage == 1 || this.hasPay()){
          console.log('no need')
          this.showData();
        }else{
            var len = s_list.length-30
            wx.showModal({
                title: '提示',
                content: '支付1块钱，才能查看剩下的精选名字哦',
                confirmText:'去支付',
                success: function(res) {
                    if (res.confirm) {
                        api.login(function (user) {
                            console.log(user)
                            wx.showNavigationBarLoading()
                            wx.showToast({
                                title: 'Loading……',
                                duration:2000,
                                icon: 'loading'
                            })
                            api.getPayParamsApi(user.openid,1,function (res) {
                                console.log(res)
                                nonceStr = res.nonceStr;
                                packagea = res.package;
                                paySign = res.paySign;
                                signType = res.signType;
                                timeStamp = res.timeStamp;
                                wx.hideToast()
                                wx.hideNavigationBarLoading();

                                wx.requestPayment({
                                    'timeStamp': timeStamp,
                                    'nonceStr': nonceStr,
                                    'package': packagea,
                                    'signType': signType,
                                    'paySign': paySign,
                                    'success': function (re) {
                                        wx.setStorageSync(payKey,1)
                                        that.showData();
                                    },
                                    'fail': function (res) {
                                        wx.showToast({
                                            image:'../../styles/info_icon.png',
                                            title: '支付失败，请稍后再试',
                                            duration: 1000
                                        });
                                        isLoading = false;
                                        if(s_list.length > pageCount){
                                            hasMore = true
                                        }
                                        that.setData({
                                            //hasMore: false
                                        })
                                    }
                                })
                            })
                        },function () {
                            isLoading = false;
                            if(s_list.length > pageCount){
                                hasMore = true
                            }
                            that.setData({
                                //hasMore: false
                            })
                        },'必须授权登录之后才能查看更多呢，是否重新授权登录？')
                    } else if (res.cancel) {
                        isLoading = false;
                        if(s_list.length > pageCount){
                            hasMore = true
                        }
                        that.setData({
                            //hasMore: false
                        })
                    }
                }
            })
        }
    },
    hasPay:function () {
        if(wx.getStorageSync(payKey)){
            return true
        }else{
            return false
        }
    },
    showData:function () {
        wx.showToast({
            title: 'Loading……',
            duration:2000,
            icon: 'loading'
        })
        hasMore = Math.ceil(s_list.length/pageCount) > currentPage;
        let start = (currentPage-1)*pageCount;
        let _data = [];
        let _data_list = [];
        let _temp = [];

        _data = s_list.slice(start,start+pageCount);
        console.log(_data)
        for (let i = 0; i < _data.length; i++) {
            if(_temp.length == 3){
                _data_list.push(_temp)
                _temp = [];
                _temp.push(_data[i])
            }else{
                _temp.push(_data[i])
            }
        }
        if(_temp.length){
            _data_list.push(_temp);
        }

        _data_list = this.data.data_list.concat(_data_list);

        console.log(_data_list)
        isLoading = false;

        this.setData({
            data_list: _data_list,
            hasMore: hasMore
        })
        wx.hideToast()
    },
    onReachBottom: function() {
        if (!hasMore) return;
        currentPage++;
        this.getList();
    }
})
