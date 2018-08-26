//index.js
//获取应用实例
var app = getApp()
var Zan = require('../../../zanui/index');
var utils = require('../../../utils/util.js')
var index;
var app;
var type;
var date;
var time;

Page(Object.assign({}, Zan.Toast, {
  data: {
      app:{},
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
    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
        this.data[app][type].list[index].time = this.data.date+' '+this.data.time;
        wx.setStorageSync(app, this.data[app]);
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
        this.data[app][type].list[index].time = this.data.date+' '+this.data.time;
        wx.setStorageSync(app, this.data[app]);
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

        var timeStr  = _app[type].list[index]['time'];

        if(timeStr){
            var timeArr = timeStr.split(" ");
            if(timeArr.length==2){
                date = timeArr[0];
                time = timeArr[1];
            }else{
                date = utils.getDateStr();
                time = timeArr[0];
            }
        }else{
            date = utils.getDateStr();
            time = utils.getTimeStr()
        }

        this.data[app] = _app
        this.data[app][type].list[index].time = date+' '+time;
        this.setData({
            app:this.data[app],
            date:date,
            time:time,
            index:index
        })


    },

    saveData:function () {
        wx.setStorageSync(app, this.data[app]);
    },
    formSubmit: function (e) {
        var _app = this.data[app];
        if(!_app[type].list[index].time){
            this.showZanToast('时间必填哦');
            return
        }
        this.saveData()
        wx.navigateBack();
    }
}));
