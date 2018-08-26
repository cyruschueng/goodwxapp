//index.js
//获取应用实例
var app = getApp()
var Zan = require('../../../zanui/index');
var utils = require('../../../utils/util.js')
var api = require('../../../api.js')
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
                name: '发红包',
            },
            {
                value: 1,
                name: '收红包'
            }
        ]
    },
    typeChange: function(e) {
        console.log(this.data[app])
        console.log(wx.getStorageSync(app))
        this.data[app][type].list[index]['typeIndex'] = e.detail.value
        this.setData({
            app:this.data[app]
        })

        this.setFroms(this.data[app][type].list[index]['name'])

        wx.setStorageSync(app, this.data[app]);
    },
    setFroms:function (name) {
        var that = this
        api.login(function (user) {
            if(user.user_name == name){
                console.log(that.data[app])
                console.log(app)
                that.data[app][type].list[index]['fromIndex'] = '0'
                that.setData({
                    froms:[
                        {
                            value: 0,
                            name: '你领取了自己发的红包'
                        }
                    ],
                    app:that.data[app]
                })
                console.log(that.data[app])
                wx.setStorageSync(app, that.data[app]);
            }else{
                that.setData({
                    froms:[
                        {
                            value: 0,
                            name: '你领取了"'+name+'"的红包'
                        },
                        {
                            value: 1,
                            name: '"'+name+'"领取了你的红包'
                        }
                    ]
                })
            }
        },function () {
            that.setData({
                froms:[
                    {
                        value: 0,
                        name: '你领取了"'+name+'"的红包'
                    },
                    {
                        value: 1,
                        name: '"'+name+'"领取了你的红包'
                    }
                ]
            })
        },'必须授权登录之后才能操作呢，是否重新授权登录？')
    },
    fromChange:function (e) {
        console.log(e.detail.value)
        console.log(this.data[app])
        console.log(wx.getStorageSync(app))
        this.data[app][type].list[index]['fromIndex'] = e.detail.value
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
        if(!_app[type].list[index]['hongbao_price']){
            _app[type].list[index]['hongbao_price']=10
        }
        this.data[app] = _app
        this.setData({
            app:this.data[app],
            index:index
        })
        wx.setStorageSync(app, this.data[app]);
        if(_app[type].list[index]['name']){
            this.setFroms(_app[type].list[index]['name'])
        }

    },
    bindContent:function (e) {
        console.log(e)
        this.data[app][type].list[index][e.currentTarget.id] = e.detail.value
        wx.setStorageSync(app, this.data[app]);
    },
    switchChange:function (e) {
        console.log(e.detail.value)
        this.data[app][type].list[index]['yilingwan'] = e.detail.value
        this.setData({
            app:this.data[app]
        })
        wx.setStorageSync(app, this.data[app]);
    },
    saveData:function () {
        if(this.data[app][type].list[index]['typeIndex']==0 && !this.data[app][type].list[index]['hongbao_shuoming']){
            this.data[app][type].list[index]['hongbao_shuoming'] = "恭喜发财，大吉大利"
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

        if(_app[type].list[index].typeIndex == 1 && typeof(_app[type].list[index].fromIndex) == "undefined"){
            this.showZanToast('收红包类型必选哦');
            return
        }

        this.saveData()
        wx.navigateBack();
    },

    edit:function () {
        editUser.edit(app, type, "hongbaoAdd");
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
      editUser.back(that, "红包消息");
    }
}));
