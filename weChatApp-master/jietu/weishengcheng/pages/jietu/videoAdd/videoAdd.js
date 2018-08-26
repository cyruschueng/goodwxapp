//index.js
//获取应用实例
var app = getApp()
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
        app:{},
        types:[
            {
                value: 0,
                name: '视频',
            },
            {
                value: 1,
                name: '语音'
            }
        ],
        status:[
            {
                value: 0,
                name: '正常通话',
            },
            {
                value: 1,
                name: '已取消'
            },
            {
                value: 2,
                name: '已拒绝'
            },
            {
                value: 3,
                name: '对方已取消'
            },
            {
                value: 4,
                name: '对方已拒绝'
            }
        ],
    },
    typeChange: function(e) {
        this.data[app][type].list[index]['typeIndex'] = e.detail.value
        this.setData({
            app:this.data[app]
        })
        wx.setStorageSync(app, this.data[app]);
    },
    statusChange: function(e) {
        this.data[app][type].list[index]['statusIndex'] = e.detail.value
        this.setData({
            app:this.data[app]
        })
        wx.setStorageSync(app, this.data[app]);
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

        index = wx.getStorageSync('current_'+app+'_'+type+'_index')

        if(!index){index = 0;}
        if(utils.isEmptyObject(_app[type].list[index])){_app[type].list[index] = {};}

        var temp_jietu_select_user=wx.getStorageSync('temp_jietu_select_user')
        if(temp_jietu_select_user){
            _app[type].list[index] = temp_jietu_select_user
            wx.removeStorageSync('temp_jietu_select_user')
        }

        if(!_app[type].list[index]['is_video']){
            _app[type].list[index]['is_video']=true
        }

        this.data[app] = _app
        this.setData({
            app:this.data[app],
            index:index
        })
    },
    bindContent:function (e) {
        console.log(e)
        this.data[app][type].list[index][e.currentTarget.id] = e.detail.value
        wx.setStorageSync(app, this.data[app]);
    },
    saveData:function () {
        if(this.data[app][type].list[index]['videoLength']){
            var lengthArr = this.data[app][type].list[index]['videoLength'].split(":");
            if(lengthArr.length == 2){
                if(lengthArr[0].length == 1){
                    lengthArr[0] = '0'+lengthArr[0]
                }
                if(lengthArr[1].length == 1){
                    lengthArr[1] = '0'+lengthArr[1]
                }
                this.data[app][type].list[index]['videoLength'] = lengthArr[0]+':'+lengthArr[1]
            }
        }
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

        if(typeof(_app[type].list[index].typeIndex) == "undefined"){
            this.showZanToast('类型必选哦');
            return
        }
        if(typeof(_app[type].list[index].statusIndex) == "undefined"){
            this.showZanToast('状态必选哦');
            return
        }
        if(_app[type].list[index].statusIndex==0&&_app[type].list[index].videoLength){
            if(!/^(?:\d{1,3})(?::[0-5]{0,1}\d)$/.test(_app[type].list[index].videoLength)){
                this.showZanToast('通话时长格式为：6:30 哦');
                return
            }
        }
        if(_app[type].list[index].statusIndex==0&&!_app[type].list[index].videoLength){
            this.showZanToast('通话时长必填哦');
            return
        }

        this.saveData()
        wx.navigateBack();
    },

    edit:function () {
        editUser.edit(app, type, "videoAdd");
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
      editUser.back(that, "视频/语音聊天");
    }
}));
