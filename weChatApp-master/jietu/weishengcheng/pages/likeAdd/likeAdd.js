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
        this.data.detail = utils.getDetail()

        if(utils.isEmptyObject(this.data.detail.likes)){this.data.detail.likes = [];}
        this.setData({
            detail:this.data.detail,
            disabled: false
        })
    },
    afterchoose: function (localPics) {
        var that = this
        for (var i=0;i<localPics.length;i++)
        {
            that.data.detail.likes.push('http://icons.maiyizhi.cn/uploading.png')
        }
        this.setData({
            detail:this.data.detail
        });
        this.setData({ disabled: true });
        utils.saveDetail(this.data.detail)
        this.startUpload(localPics);
    },
    startUpload: function (localPics) {
        var that = this;
        if(localPics.length) {
            upload.uploadSingleB({path: localPics[0], state: 1}, function (pic) {
                if(pic){
                    console.log(that.data.detail.likes.length)
                    that.data.detail.likes[that.data.detail.likes.length-localPics.length] = pic.url+'?imageView2/1/w/150/h/150'
                    localPics = localPics.splice(1, localPics.length)
                    that.onUploadComplete(localPics);
                    if (!localPics.length) {
                        that.setData({disabled: false});
                    }
                }else{
                    that.showZanToast('上传失败，请稍后再试呢');
                }
            });
        }
    },
    onUploadComplete: function (localPics) {
        this.setData({
            detail:this.data.detail
        });
        utils.saveDetail(this.data.detail)
        if(localPics.length){
            this.startUpload(localPics);
        }
    },
    chooseImage: function (e) {
        var that = this;

        wx.showActionSheet({
            itemList: ['选择系统人物', '从相册选择','选择我自己','随机来一个'],
            success: function(res) {
                if(res.tapIndex==1){
                    wx.chooseImage({
                        sizeType: ['original', 'compressed'],
                        sourceType: ['album', 'camera'],
                        count:10,
                        success: function (res) {
                            that.afterchoose(res.tempFilePaths)
                        }
                    })
                }else if(res.tapIndex==0){
                    wx.navigateTo({
                        url: "/pages/selectUser/selectUser?from=like"
                    })
                }else if(res.tapIndex==2){
                    api.login(function (user) {
                        that.data.detail.likes.push(user.avatar)
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
                        that.data.detail.likes.push(res.user.avatar)
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
    deleteImage: function(e){
        let that  = this;
        wx.showModal({
            title: '提示',
            content: '要删除这条点赞吗？',
            confirmText:'删除',
            success: function(res) {
                if (res.confirm) {
                    for(var i=0; i<that.data.detail.likes.length; i++) {
                        if(that.data.detail.likes[i] == e.currentTarget.id) {
                            that.data.detail.likes.splice(i, 1);
                            utils.saveDetail(that.data.detail)
                            that.setData({
                                detail: that.data.detail
                            });
                            utils.saveDetail(that.data.detail)
                            break;
                        }
                    }
                } else if (res.cancel) {

                }
            }
        })
    },
    saveData:function () {
        //wx.setStorageSync("detail", this.data.detail)
        utils.saveDetail(this.data.detail)
    },
    formSubmit: function (e) {
        this.saveData()

        wx.navigateBack();
    }
}));
