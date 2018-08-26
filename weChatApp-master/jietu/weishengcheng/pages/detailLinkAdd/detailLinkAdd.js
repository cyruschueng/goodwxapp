//index.js
//获取应用实例
var app = getApp()
var Zan = require('../../zanui/index');
var api = require('../../api.js')
var utils = require('../../utils/util.js')
var upload = require('../../utils/upload.js')

Page(Object.assign({}, Zan.Toast, {
  data: {
      detail:{}
  },
  onLoad: function (options) {
  },
    onShow: function (options) {
        var _index  =wx.getStorageSync('current_detail_index');
        if(_index ==99 || !_index){
            _index = 0
        }
        this.data.detail = utils.getDetail()
        if(!this.data.detail.time){this.data.detail.time = (_index+1)+'分钟前';}
        if(utils.isEmptyObject(this.data.detail.link)){this.data.detail.link = {};}
        this.setData({
            detail:this.data.detail,
            disabled: false
        })
    },
    help:function(){
        utils.previewSingalPic('http://icons.maiyizhi.cn/jialianjie.png?'+Date.parse(new Date()))
    },
    getUrl:function () {
        wx.showNavigationBarLoading();
        wx.showToast({
            title: 'Loading……',
            duration:2000,
            icon: 'loading'
        })
        api.getUrl(url,function(res) {
            console.log(res)

            wx.hideToast()
            wx.hideNavigationBarLoading();
        });
    },
    afterAvatarChoose: function (localPic) {
        var that = this;

        that.data.detail.avatar = 'http://icons.maiyizhi.cn/uploading.png'
        that.setData({
            detail: that.data.detail
        });
        utils.saveDetail(that.data.detail)
        this.setData({ disabled: true });
        upload.uploadSingleB({path: localPic, state: 1}, function (pic) {
            if(pic){
                that.data.detail.avatar = pic.url+'?imageView2/1/w/150/h/150'
                that.setData({
                    detail: that.data.detail
                });
                utils.saveDetail(that.data.detail)
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
                        url: "/pages/selectUser/selectUser?from=detail"
                    })
                }else if(res.tapIndex==2){
                    api.login(function (user) {
                        that.data.detail.avatar = user.avatar
                        that.data.detail.name = user.user_name
                        that.setData({
                            detail: that.data.detail
                        })
                        utils.saveDetail(that.data.detail)
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
                        console.log(res)
                        that.data.detail.avatar = res.user.avatar
                        that.data.detail.name = res.user.name
                        that.setData({
                            detail: that.data.detail
                        })
                        utils.saveDetail(that.data.detail)
                        wx.hideToast()
                        wx.hideNavigationBarLoading();
                    });
                }
            },
            fail: function(res) {
            }
        })
    },
    afterLinkAvatarChoose: function (localPic) {
        var that = this;

        that.data.detail.link.avatar = 'http://icons.maiyizhi.cn/uploading.png'
        that.setData({
            detail: that.data.detail
        });
        utils.saveDetail(that.data.detail)
        this.setData({ disabled: true });
        upload.uploadSingleB({path: localPic, state: 1}, function (pic) {
            if(pic){
                that.data.detail.link.avatar = pic.url+'?imageView2/1/w/150/h/150'
                that.setData({
                    detail: that.data.detail
                });
                utils.saveDetail(that.data.detail)
            }else{
                that.showZanToast('上传失败，请稍后再试呢');
            }
            that.setData({ disabled: false });
        });
    },
    linkAvatar:function(e){
        var that  = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            count:1,
            success: function (res) {
                that.afterLinkAvatarChoose(res.tempFilePaths[0])
            }
        })
    },
    bindName:function (e) {
        this.data.detail.name = e.detail.value
        utils.saveDetail(this.data.detail)
    },
    bindContent:function (e) {
        this.data.detail.content = e.detail.value
        utils.saveDetail(this.data.detail)
    },
    bindLinkContent:function (e) {
        this.data.detail.link.content = e.detail.value
        utils.saveDetail(this.data.detail)
    },
    nav:function(e){
        this.saveData();
        console.log(e)
        wx.navigateTo({
            url: e.currentTarget.id
        })
    },
    saveData:function () {
        utils.saveDetail(this.data.detail)
       // wx.setStorageSync("detail", this.data.detail)
    },
    formSubmit: function (e) {
        this.saveData()
        var _detail = this.data.detail;
        if(!_detail.avatar){
            this.showZanToast('必须选择头像呢');
            return
        }
        if(!_detail.name){
            this.showZanToast('昵称必填哦');
            return
        }
        if(!_detail.content){
            this.showZanToast('转发描述必填哦');
            return
        }
        if(!_detail.link.content){
            this.showZanToast('转发链接标题必填哦');
            return
        }
        wx.navigateBack();
    }
}));
