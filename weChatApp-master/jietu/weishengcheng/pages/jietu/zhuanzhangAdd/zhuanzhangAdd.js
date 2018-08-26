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
                name: '转账',
            },
            {
                value: 1,
                name: '收钱'
            }
        ],
    },
    typeChange: function(e) {
        this.data[app][type].list[index]['typeIndex'] = e.detail.value

        if(e.detail.value=='0'&&!this.data[app][type].list[index].zhuanzhang_shuoming){
            if(this.data[app][type].list[index].name && !utils.isEmptyObject(this.data[app][type].users)  && this.data[app][type].users[0]['name']){
              if(this.data[app][type].list[index].name == this.data[app][type].users[0]['name']){
                  if(!utils.isEmptyObject(this.data[app][type].users[1])  && this.data[app][type].users[1]['name']){
                    this.data[app][type].list[index].zhuanzhang_shuoming='转账给'+this.data[app][type].users[1]['name']
                  }else{
                    this.data[app][type].list[index].zhuanzhang_shuoming='转账给***'
                  }
              }else{
                this.data[app][type].list[index].zhuanzhang_shuoming='转账给你'
              }
            }
        }
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
    switchChange:function (e) {
        console.log(e.detail.value)
        this.data[app][type].list[index]['yishou'] = e.detail.value
        this.setData({
            app:this.data[app]
        })
        wx.setStorageSync(app, this.data[app]);
    },
    saveData:function () {
        if(this.data[app][type].list[index]['zhuanzhang_price']){
            var num = new Number(this.data[app][type].list[index]['zhuanzhang_price']);
            this.data[app][type].list[index]['zhuanzhang_price'] = num.toFixed(2)
        }
        if(this.data[app][type].list[index]['shouqian_price']){
            var num = new Number(this.data[app][type].list[index]['shouqian_price']);
            this.data[app][type].list[index]['shouqian_price'] = num.toFixed(2)
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

        if(_app[type].list[index].typeIndex == 0 && !_app[type].list[index].zhuanzhang_price){
            this.showZanToast('转账金额必填哦');
            return
        }

        if(_app[type].list[index].typeIndex == 0 && !_app[type].list[index].zhuanzhang_shuoming){
            this.showZanToast('转账说明必填哦');
            return
        }

        if(_app[type].list[index].typeIndex == 1 && !_app[type].list[index].shouqian_price){
            this.showZanToast('收钱金额必填哦');
            return
        }

        this.saveData()
        wx.navigateBack();
    },

    edit:function () {
        editUser.edit(app, type, "zhuanzhangAdd");
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
      editUser.back(that, "转账消息");
    }
}));
