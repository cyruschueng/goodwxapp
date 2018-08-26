//index.js
//获取应用实例
var app = getApp()
var Zan = require('../../zanui/index');
var utils = require('../../utils/util.js')
var api = require('../../api.js')
var upload = require('../../utils/upload.js')
var index;

Page(Object.assign({}, Zan.Toast, {
  data: {
      detail:{},
      fname:''
  },
  onLoad: function (options) {
      this.setData({ disabled: false });
      if(options&&options.fname){
          this.data.fname = options.fname;
      }
  },
    onShow: function (options) {
        this.data.detail = utils.getDetail()
        index = wx.getStorageSync('current_comment_index')

        if(utils.isEmptyObject(this.data.detail.comments)){this.data.detail.comments = [];}
        if(!index){index = 0;}
        if(utils.isEmptyObject(this.data.detail.comments[index])){this.data.detail.comments[index] = {};}
        if(!this.data.detail.comments[index].time){this.data.detail.comments[index].time = (index+1)+'分钟前';}
        if(this.data.fname){
            this.data.detail.comments[index].fName = this.data.fname;
            console.log(this.data.detail.comments[index])
        }
        this.setData({
            detail:this.data.detail,
            index:index
        })
    },
    afterAvatarChoose: function (localPic) {
        var that = this;
        that.data.detail.comments[index].avatar = 'http://icons.maiyizhi.cn/uploading.png'
        that.setData({
            detail: that.data.detail
        });
        utils.saveDetail(that.data.detail)
        this.setData({ disabled: true });
        upload.uploadSingleB({path: localPic, state: 1}, function (pic) {
            if(pic){
                that.data.detail.comments[index].avatar = pic.url+'?imageView2/1/w/150/h/150'
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
                        url: "/pages/selectUser/selectUser?from=comment"
                    })
                }else if(res.tapIndex==2){
                    api.login(function (user) {
                        console.log(user)
                        that.data.detail.comments[index].avatar = user.avatar
                        that.data.detail.comments[index].name = user.user_name
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
                        that.data.detail.comments[index].avatar = res.user.avatar
                        that.data.detail.comments[index].name = res.user.name
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
        this.data.detail.comments[index].name = e.detail.value
        utils.saveDetail(this.data.detail)
    },
    bindContent:function (e) {
        this.data.detail.comments[index].content = e.detail.value
        utils.saveDetail(this.data.detail)
    },
    nav:function(e){
        this.saveData();
        wx.navigateTo({
            url: e.currentTarget.id
        })
    },
    saveData:function () {
        //wx.setStorageSync("detail", this.data.detail)
        utils.saveDetail(this.data.detail)
    },
    formSubmit: function (e) {
        this.saveData()
        var _detail = this.data.detail;
        if(!_detail.comments[index].avatar){
            this.showZanToast('必须选择头像呢');
            return
        }
        if(!_detail.comments[index].name){
            this.showZanToast('昵称必填哦');
            return
        }
        if(!_detail.comments[index].content){
            this.showZanToast('内容必填哦');
            return
        }
        wx.navigateBack();
    }
}));
