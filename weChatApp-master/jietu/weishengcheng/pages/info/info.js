//index.js
//获取应用实例
var app = getApp()
var Zan = require('../../zanui/index');
var api = require('../../api.js')
var utils = require('../../utils/util.js')
var upload = require('../../utils/upload.js')

Page(Object.assign({}, Zan.Toast, {
  data: {
      info:{}
  },
  onLoad: function (options) {
  },
    onShow: function (options) {
        this.data.info = wx.getStorageSync('info')
        if(utils.isEmptyObject(this.data.info)){this.data.info = {};}

        this.setData({
            info:this.data.info,
            disabled: false
        })
    },
    afterAvatarChoose: function (localPic) {
        var that = this;

        that.data.info.avatar = 'http://icons.maiyizhi.cn/uploading.png'
        that.setData({
            info: that.data.info
        });
        wx.setStorageSync("info", that.data.info)
        this.setData({ disabled: true });
        upload.uploadSingleB({path: localPic, state: 1}, function (pic) {
            if(pic){
                that.data.info.avatar = pic.url+'?imageView2/1/w/150/h/150'
                that.setData({
                    info: that.data.info
                });
                wx.setStorageSync("info", that.data.info)
            }else{
                that.showZanToast('上传失败，请稍后再试呢');
            }
            that.setData({ disabled: false });
        });
    },
    avatarMenu:function(e){
        var that  = this;
        wx.showActionSheet({
            itemList: ['选择系统人物', '从相册选择','选择我自己','随机来一个'],
            success: function(res) {
                if(res.tapIndex==1){
                    wx.chooseImage({
                        sizeType: ['original', 'compressed'],
                        sourceType: ['album', 'camera'],
                        count:1,
                        success: function (res) {
                            that.afterAvatarChoose(res.tempFilePaths[0])
                        }
                    })
                }else if(res.tapIndex==0){
                    wx.navigateTo({
                        url: "/pages/selectUser/selectUser?from=info"
                    })
                }else if(res.tapIndex==2){
                    api.login(function (user) {
                        that.data.info.avatar = user.avatar
                        that.data.info.name = user.user_name
                        that.setData({
                            info: that.data.info
                        })
                        wx.setStorageSync("info", that.data.info)
                    },function () {

                    },'必须授权登录之后才能操作呢，是否重新授权登录？')
                }else if(res.tapIndex==3){
                    wx.showNavigationBarLoading();
                    wx.showToast({
                        title: 'Loading……',
                        duration:2000,
                        icon: 'loading'
                    })
                    api.random(function(res) {
                        that.data.info.avatar = res.user.avatar
                        that.data.info.name = res.user.name
                        that.setData({
                            info: that.data.info
                        })
                        wx.setStorageSync("info", that.data.info)
                        wx.hideToast()
                        wx.hideNavigationBarLoading();
                    });
                }
            },
            fail: function(res) {
            }
        })
    },
    afterBannerChoose: function (localPic) {
        var that = this;

        that.data.info.banner = 'http://icons.maiyizhi.cn/uploading.png'
        that.setData({
            info: that.data.info
        });
        wx.setStorageSync("info", that.data.info)
        this.setData({ disabled: true });
        upload.uploadSingleB({path: localPic, state: 1}, function (pic) {
            if(pic){
                that.data.info.banner = pic.url
                that.setData({
                    info: that.data.info
                });
                wx.setStorageSync("info", that.data.info)
            }else{
                that.showZanToast('上传失败，请稍后再试呢');
            }
            that.setData({ disabled: false });
        });
    },
    avatarBanner:function () {
        var that  = this;

        wx.showActionSheet({
            itemList: ['从相册选择','随机来一个'],
            success: function(res) {
                if(res.tapIndex==0) {
                    wx.chooseImage({
                        sizeType: ['original', 'compressed'],
                        sourceType: ['album', 'camera'],
                        count:1,
                        success: function (res) {
                            that.afterBannerChoose(res.tempFilePaths[0])
                        }
                    })
                }else if(res.tapIndex==1){
                    var num = utils.randomNum(1,20)
                    that.data.info.banner = 'https://ogrzx2jit.qnssl.com/cover_'+num+'.jpg?imageView2/1/w/'+640+'/h/'+Math.ceil(640*0.8542);
                    that.setData({
                        info: that.data.info
                    });
                    wx.setStorageSync("info", that.data.info)
                }
            },
            fail: function(res) {
            }
        })
    },
    afterAvatarNewsChoose: function (localPic) {
        var that = this;

        that.data.info.newsAvatar = 'http://icons.maiyizhi.cn/uploading.png'
        that.setData({
            info: that.data.info
        });
        wx.setStorageSync("info", that.data.info)
        this.setData({ disabled: true });
        upload.uploadSingleB({path: localPic, state: 1}, function (pic) {
            if(pic){
                that.data.info.newsAvatar = pic.url+'?imageView2/1/w/150/h/150'
                that.setData({
                    info: that.data.info
                });
                wx.setStorageSync("info", that.data.info)
            }else{
                that.showZanToast('上传失败，请稍后再试呢');
            }
            that.setData({ disabled: false });
        });
    },
    avatarNews:function (e) {
        var that  = this;
        wx.showActionSheet({
            itemList: ['选择系统人物', '从相册选择','随机来一个'],
            success: function(res) {
                if(res.tapIndex==1){
                    wx.chooseImage({
                        sizeType: ['original', 'compressed'],
                        sourceType: ['album', 'camera'],
                        count:1,
                        success: function (res) {
                            that.afterAvatarNewsChoose(res.tempFilePaths[0])
                        }
                    })
                }else if(res.tapIndex==0){
                    wx.navigateTo({
                        url: "/pages/selectUser/selectUser?from=newsAvatar"
                    })
                }else if(res.tapIndex==2){
                    wx.showNavigationBarLoading();
                    wx.showToast({
                        title: 'Loading……',
                        duration:2000,
                        icon: 'loading'
                    })
                    api.random(function(res) {
                        that.data.info.newsAvatar = res.user.avatar
                        that.setData({
                            info: that.data.info
                        })
                        wx.setStorageSync("info", that.data.info)
                        wx.hideToast()
                        wx.hideNavigationBarLoading();
                    });
                }
            },
            fail: function(res) {
            }
        })
    },
    bindName:function (e) {
        this.data.info.name = e.detail.value
        wx.setStorageSync("info", this.data.info)
    },
    bindNews:function (e) {
        this.data.info.news = e.detail.value
        wx.setStorageSync("info", this.data.info)
    },
    saveData:function () {
        wx.setStorageSync("info", this.data.info)
    },
    formSubmit: function (e) {
        this.saveData()
        var _info = wx.getStorageSync('info');
        if(!_info.avatar){
            this.showZanToast('必须选择头像呢');
            return
        }
        if(!_info.name){
            this.showZanToast('昵称必填哦');
            return
        }

        if(!_info.banner){
            this.showZanToast('必须选择封面呢');
            return
        }
        wx.navigateBack();
    }
}));
