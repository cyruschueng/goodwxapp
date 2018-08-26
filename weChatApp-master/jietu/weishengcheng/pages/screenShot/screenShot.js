var app = getApp();
var upload = require('../../utils/upload.js')
var utils = require('../../utils/util.js')
var api = require('../../api.js')
var Zan = require('../../zanui/index');
var cat;
var title='';
var pay_tips_name='pay_times_cache';
var tips_name='has_show_screenshot_preview_tip';
var id;
var isVip=0;
var _system_info;

Page(Object.assign({}, Zan.Toast, {
  data: {
    dianliang: ["31%", "46%", "68%", "85%"],
    dianliangIndex: 0,
    yunyingshang: ["中国联通", "中国移动", "中国电信"],
    yunyingshangIndex: 0
  },
  binddianliangChange: function(e) {
    this.setData({
      dianliangIndex: e.detail.value
    })
  },
  bindyunyingshangChange: function(e) {
    this.setData({
      yunyingshangIndex: e.detail.value
    })
  },
  onReady:function () {
    _system_info = wx.getSystemInfoSync()
    console.log(app.globalData.system_info)
  },
  onLoad: function (options) {
    let list={
      "1":{"left":"http://pics.maiyizhi.cn/ios_pengyouquan_chuliqian.jpg","right":"http://pics.maiyizhi.cn/ios_pengyouquan_chulihou.jpg"},
      "2":{"left":"http://pics.maiyizhi.cn/ios_xiangqingyewenzi_chuliqian.jpg","right":"http://pics.maiyizhi.cn/ios_xiangqingyewenzi_chulihou.jpg"},
      "3":{"left":"http://pics.maiyizhi.cn/ios_danliao_chuliqian.jpg","right":"http://pics.maiyizhi.cn/ios_danliao_chulihou.jpg"},
      "4":{"left":"http://pics.maiyizhi.cn/ios_qunliao_chuliqian.jpg","right":"http://pics.maiyizhi.cn/ios_qunliao_chulihou.jpg"},
      "5":{"left":"http://pics.maiyizhi.cn/ios_xiangqingye_chuliqian.jpg","right":"http://pics.maiyizhi.cn/ios_xiangqingye_chulihou.jpg"},
    };
    if(app.globalData.system_info.platform=='android'){
      list={
        "1":{"left":"http://pics.maiyizhi.cn/az_pengyouquan_chuliqian.jpg","right":"http://pics.maiyizhi.cn/az_pengyouquan_chulihou.jpg"},
        "2":{"left":"http://pics.maiyizhi.cn/az_xiangqingye_chuliqian.jpg","right":"http://pics.maiyizhi.cn/az_xiangqingye_chulihou.jpg"},
        "3":{"left":"http://pics.maiyizhi.cn/az_danliao_chuliqian.jpg","right":"http://pics.maiyizhi.cn/az_danliao_chulihou.jpg"},
        "4":{"left":"http://pics.maiyizhi.cn/az_qunliao_chuliqian.jpg","right":"http://pics.maiyizhi.cn/az_qunliao_chulihou.jpg"},
        "5":{"left":"http://pics.maiyizhi.cn/az_xiangqingye_chuliqian.jpg","right":"http://pics.maiyizhi.cn/az_xiangqingye_chulihou.jpg"},
      };
    }
    cat = options.cat;
    id = options.id;
    if(options.title){
      title = options.title;
    }
    api.getUser(function (res) {
      console.log(res);
      if(res.isVip){
        isVip = res.isVip
      }
    },function () {
    })
    this.setData({
      list:list[cat],
    })
  },
  deal:function (res,has_pay) {
    var that = this
    wx.showNavigationBarLoading();
    wx.showToast({
      title: '处理中……',
      duration:40000,
      icon: 'loading'
    });
    upload.uploadSingleB({path: res.tempFilePaths[0], state: 1}, function (pic) {
      if(pic){
        var _pic = {}
        _pic.url = pic.url
        _pic.width = pic.width
        _pic.height = pic.height

        var _size=26;
        var _color='ffffff';
        var _ziti = 'PingFangB.ttf';
        if(app.globalData.system_info.platform=='android'){
          _size=30;
          _color='cbcbcc';
          _ziti = 'weiruanyahei.ttc';
        }

        var dianliang = that.data.dianliang[that.data.dianliangIndex].replace(/%/g,'');
        var yunyingshang = that.data.yunyingshang[that.data.yunyingshangIndex];
        api.xiezi(utils.getTimeStr(),_ziti,_size,_color,0,0,function (res) {
            api.ScreenshotDeal(JSON.stringify(_pic),JSON.stringify(_system_info),cat,title,res.preview,has_pay,dianliang,yunyingshang, function(res) {
            wx.hideNavigationBarLoading();
            wx.hideToast();
            if(wx.getStorageSync(pay_tips_name)){
              wx.setStorageSync(pay_tips_name,parseInt(wx.getStorageSync(pay_tips_name))+1)
            }else{
              wx.setStorageSync(pay_tips_name,1)
            }
            utils.downloadAndPreview(res.url, '生成朋友圈界面；生成微信对话；装X神器；',"/pages/index/index",'生成中...')
            //utils.showPreviewTip(tips_name,'长按图片来保存哦',res.url)
          },function(res){
            wx.hideNavigationBarLoading();
            wx.hideToast();
            that.showZanToast(res);
          });
        },function () {
            api.ScreenshotDeal(JSON.stringify(_pic),JSON.stringify(_system_info),cat,title,'',has_pay,dianliang,yunyingshang, function(res) {
            wx.hideNavigationBarLoading();
            wx.hideToast();
            utils.downloadAndPreview(res.url, '生成朋友圈界面；生成微信对话；装X神器；',"/pages/index/index",'生成中...')
            //utils.showPreviewTip(tips_name,'长按图片来保存哦',res.url)
          },function(res){
            wx.hideNavigationBarLoading();
            wx.hideToast();
            that.showZanToast(res);
          });
        })

      }else{
        that.showZanToast('图片上传失败，请稍后再试');
        wx.hideNavigationBarLoading();
        wx.hideToast();
      }
    });
  },
  select:function (e) {
      let formId = e.detail.formId;
      utils.dealFormIds(formId);
      let formIds = app.globalData.gloabalFomIds;
      api.saveformids(JSON.stringify(formIds), function () {
        app.globalData.gloabalFomIds = []
      });
      var that = this;

      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        count:1,
        success: function (pic) {
          console.log(wx.getStorageSync(pay_tips_name))
          console.log(isVip)
          if(wx.getStorageSync(pay_tips_name)<1||wx.getStorageSync('pay'+id)||isVip) {
              that.deal(pic,0);
          }else{
            wx.showModal({
              title: '提示',
              content: '你的免费处理额度已用完，支付2块钱，才能完成处理哦',
              confirmText:'去支付',
              success: function(res) {
                if (res.confirm) {
                  api.login(function (user) {
                    wx.showNavigationBarLoading()
                    wx.showToast({
                      title: 'Loading……',
                      duration:2000,
                      icon: 'loading'
                    })
                    api.pay(user.openid,2,'截图处理',function (res) {
                      console.log(res)
                      wx.hideToast()
                      wx.hideNavigationBarLoading();

                      wx.requestPayment({
                        'timeStamp': res.timeStamp,
                        'nonceStr': res.nonceStr,
                        'package': res.package,
                        'signType': res.signType,
                        'paySign': res.paySign,
                        'success': function (re) {
                          that.deal(pic,1);
                        },
                        'fail': function (res) {
                          that.showZanToast('支付失败，请稍后再试');
                        }
                      })
                    })
                  },function () {

                  },'必须授权登录之后才能处理呢，是否重新授权登录？')
                }
              }
            })
          }


        }
      })
    },
}));
