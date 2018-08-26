//index.js
//获取应用实例
var apps = getApp()
var Zan = require('../../../zanui/index');
var utils = require('../../../utils/util.js')
var api = require('../../../api.js')
var upload = require('../../../utils/upload.js')
var editUser = require('../selectUser/selectUser.js')
var index;
var app;
var type;

Page(Object.assign({}, Zan.Toast, {
    data: {
        app:{}
    },
    onLoad: function (options) {
        console.log(options)
        app = options.app
        type = options.type

        this.init()
        this.setData({
            disabled: false,
            app_name:app,
            type:type
        });
    },
    // onShow: function (options) {
    //     if(app){
    //         this.init()
    //     }else{
    //         console.log('dd')
    //     }
    // },
    init:function(){
        var _app  = wx.getStorageSync(app);
        if(utils.isEmptyObject(_app)){_app = {};}
        if(utils.isEmptyObject(_app[type])){_app[type] = {};}
        if(utils.isEmptyObject(_app[type].list)){_app[type].list = [];}
      if(utils.isEmptyObject(_app[type].users)){_app[type].users = [];}

        index = wx.getStorageSync('current_'+app+'_'+type+'_index')

        if(!index){index = 0;}
        if(utils.isEmptyObject(_app[type].list[index])){_app[type].list[index] = {};}

        var temp_jietu_select_user=wx.getStorageSync('temp_jietu_select_user')
        if(temp_jietu_select_user){
            _app[type].list[index] = temp_jietu_select_user
            wx.removeStorageSync('temp_jietu_select_user')
        }

        this.data[app] = _app
        this.setData({
            app:this.data[app],
            index:index
        })
      if(!utils.isEmptyObject(_app[type].users)&&_app[type].users[0]&&_app[type].users[0].name&&(_app[type].list[index].name == _app[type].users[0].name)){
        this.setData({
          isself:1,
        })
      }else{
        this.setData({
          isself:0,
        })
      }
    },
    bindContent:function (e) {
        console.log(e)
        this.data[app][type].list[index][e.currentTarget.id] = e.detail.value
        wx.setStorageSync(app, this.data[app]);
    },
    afterLinkAvatarChoose: function (localPic) {
        var that = this;

        that.data[app][type].list[index].linkAvatar = 'http://icons.maiyizhi.cn/uploading.png'
        that.setData({
            app: that.data[app]
        });
        wx.setStorageSync(app, that.data[app]);
        that.setData({ disabled: true });
        upload.uploadSingleB({path: localPic, state: 1}, function (pic) {
            if(pic){
                that.data[app][type].list[index].linkAvatar = pic.url
                that.setData({
                    app: that.data[app]
                });
                wx.setStorageSync(app, that.data[app]);
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
  switchChange:function (e) {
    console.log(e)
    this.data[app][type].list[index].isFail = e.detail.value
    wx.setStorageSync(app, this.data[app]);
  },
    saveData:function () {
        wx.setStorageSync(app, this.data[app]);
    },
    formSubmit: function (e) {
        var _app = this.data[app];
        if(!_app[type].list[index].avatar){
            this.showZanToast('必须选择头像呢');
            return
        }
        if(!_app[type].list[index].name){
            this.showZanToast('昵称必填哦');
            return
        }

        if(!_app[type].list[index].linkTitle){
            this.showZanToast('转发链接标题必填哦');
            return
        }
        if(!_app[type].list[index].linkContent){
            this.showZanToast('转发描述必填哦');
            return
        }

        this.saveData()
        wx.navigateBack();
    },

    edit:function () {
        editUser.edit(app, type, "urlAdd");
    },
    selectUser:function(e){
        console.log(e)
        var that = this;
        editUser.selectUser(that, app, type, e);
        if(app){
          that.init()
        }else{
            console.log('dd')
        }
    },
    showEditUser: function () {
      var that = this;
      editUser.showEditUser(that, "选择成员", app, type);
    },
    back: function () {
      var that = this;
      editUser.back(that, "转发");
    }
}));
