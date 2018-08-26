//index.js
//获取应用实例
var app = getApp()
var Zan = require('../../../zanui/index');
var utils = require('../../../utils/util.js')
var api = require('../../../api.js')
var index;
var app;
var type;
var items = {
    "qunliao":[
        {value:1,name: '邀请入群', text: '"张三"邀请"李四"加入了群聊'},
        {value:2,name: '扫二维码入群', text: '"张三"通过扫描"李四"分享的二维码加入群聊'},
        {value:3,name: '消息撤回提示', text: '"张三"撤回了一条消息'},
        {value:4,name: '修改群名提示', text: '你修改群名为"群聊"'},
        {value:6,name: '隐私安全提示', text: '"张三"与群里其他人都不是微信朋友关系，请注意隐私安全'}
    ],"danliao":[
        {value:1,name: '消息撤回提示', text: '"张三"撤回了一条消息'},
        {value:2,name: '加好友提示', text: '你已添加了"张三"，现在可以开始聊天了。'},
        {value:3,name: '打招呼提示', text: '以上是打招呼的内容'},
        {value:4,name: '陌生人提示', text: '如果陌生人主动添加你为朋友，请谨慎核实对方身份。'},
        {value:5,name: '被删除好友', text: '王尼玛开启了朋友验证，你还不是他（她）朋友。请先发送朋友验证请求，对方验证通过后，才能聊天。'}
    ]
}

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
    onShow: function (options) {
      if(app){
          this.init()
      }else{
          console.log('dd')
      }
    },
    init:function(){
        var _app  = wx.getStorageSync(app);
        if(utils.isEmptyObject(_app)){_app = {};}
        if(utils.isEmptyObject(_app[type])){_app[type] = {};}
        if(utils.isEmptyObject(_app[type].list)){_app[type].list = [];}

        index = wx.getStorageSync('current_'+app+'_'+type+'_index')

        if(!index){index = 0;}
        if(utils.isEmptyObject(_app[type].list[index])){_app[type].list[index] = {};}

        //if(_app[type].list[index])

        this.data[app] = _app
        this.setData({
            types: items[type],
            app:this.data[app],
            index:index
        })
    },

    bindContent:function (e) {
        this.data[app][type].list[index].message = e.detail.value
        wx.setStorageSync(app, this.data[app]);
    },
    typeChange: function(e) {
        console.log(e)
        console.log(items[type][e.detail.value])
        this.data[app][type].list[index]['typeIndex'] = items[type][e.detail.value].value
        this.data[app][type].list[index].message = items[type][e.detail.value].text
        this.setData({
            app:this.data[app]
        })

        wx.setStorageSync(app, this.data[app]);
    },
    saveData:function () {
        wx.setStorageSync(app, this.data[app]);
    },
    formSubmit: function (e) {
        var _app = this.data[app];

        if(!_app[type].list[index].message){
            this.showZanToast('内容必填哦');
            return
        }
        this.saveData()
        wx.navigateBack();
    }
}));
