//index.js
//获取应用实例
var app = getApp()
var max_pics = 9;
var utils = require('../../utils/util.js')
var Zan = require('../../zanui/index');
var api = require('../../api.js')
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
        if(utils.isEmptyObject(this.data.detail.files)){
            this.data.detail.files = [];
        }
        this.setData({
            detail:this.data.detail,
            disabled: false
        })
    },
    help:function(){
        utils.previewSingalPic('http://icons.maiyizhi.cn/jiatuwen.png?'+Date.parse(new Date()))
    },
    chooseImage: function (e) {
        var that = this;

        if(that.data.detail.files.length>=max_pics){
            that.showZanToast('最多只能发9张图呢');
            return;
        }
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            count:9,
            success: function (res) {
                if((that.data.detail.files.length+res.tempFilePaths.length)>max_pics){
                    that.showZanToast('最多只能发9张图呢');
                }
                console.log(res.tempFilePaths)
                console.log(that.data.detail.files.length)
                that.afterchoose(res.tempFilePaths.slice(0,max_pics-that.data.detail.files.length));
            }
        })
    },
    afterchoose: function (localPics) {
        console.log(localPics)
        var that = this
        for (var i=0;i<localPics.length;i++)
        {
            that.data.detail.files = that.data.detail.files.concat({"url":'http://icons.maiyizhi.cn/uploading.png',"width":300,"height":300})
        }
        this.setData({
            detail:this.data.detail
        });
        utils.saveDetail(this.data.detail)
        this.setData({ disabled: true });
        this.startUpload(localPics);
    },
    startUpload: function (localPics) {
        var that = this;
        console.log(localPics)
        if(localPics.length) {
            upload.uploadSingleB({path: localPics[0], state: 1}, function (pic) {
                if(pic){
                    that.data.detail.files[that.data.detail.files.length-localPics.length] = {"url":pic.url+'?imageView2/1/w/'+Math.ceil(app.globalData.system_info.windowWidth / 2*app.globalData.system_info.pixelRatio)+'/h/'+Math.ceil(app.globalData.system_info.windowWidth / 2*app.globalData.system_info.pixelRatio*pic.height/pic.width),"width":pic.width,"height":pic.height}
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
    //--------------------------------------------多选图片后上传
    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.detail.files // 需要预览的图片http链接列表
        })
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
        console.log(e)
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
    bindName:function (e) {
        this.data.detail.name = e.detail.value
        utils.saveDetail(this.data.detail)
    },
    bindContent:function (e) {
        this.data.detail.content = e.detail.value
        console.log(this.data.detail.content)
        utils.saveDetail(this.data.detail)
    },
    deleteImage: function(e){
        let that  = this;
        wx.showModal({
            title: '提示',
            content: '要删除这张图片吗？',
            confirmText:'删除',
            success: function(res) {
                if (res.confirm) {
                    for(var i=0; i<that.data.detail.files.length; i++) {
                        if(that.data.detail.files[i].url == e.currentTarget.id) {
                            that.data.detail.files.splice(i, 1);
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
    nav:function(e){
        this.saveData();
        console.log(e)
        wx.navigateTo({
            url: e.currentTarget.id
        })
    },
    saveData:function () {
        //wx.setStorageSync("detail", this.data.detail)
        utils.saveDetail(this.data.detail)
    },
    formSubmit: function (e) {
        this.saveData(this.data.detail)
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
            this.showZanToast('内容必填哦');
            return
        }
        wx.navigateBack();
    }
}));
