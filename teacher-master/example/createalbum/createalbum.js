var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')

Page({
  data: {
   cid:'',
   gid:'',
   role:''
  },
  onLoad: function (options) {
    that = this
   var cid=  options.cid;
   var gid = options.gid;
   if(!cid||!gid){
     that.initClass();
   }
   that.setData({ cid: cid, gid: gid,role: app.globalData.role})
   
  },


  initClass: function () {
    wx.showLoading({
      title: '加载中....',
    });
    app.getImprint(function (imprint) {
      util.AJAX1(config.ClassByImprintUrl, {}, "post", { imprint: imprint }, function (res) {
        console.log(res)
        wx.hideLoading();
        if (res.data.status == "ok" && res.data && res.data.classes) {
          var classes = res.data.classes;
          var teacher_name = res.data.teacher_name;
          var class_items = Array();
          var cid = "";
          var gid = "";
          classes.forEach(function (item) {
            class_items.push({ name: item.class_name, gid: item.open_gid, value: item._id });
          });
          if (class_items.length > 0) {
            class_items[0].checked = true;
            cid = class_items[0].value;
            gid = class_items[0].gid;
          }
          that.setData({ loaded: true, class_items, class_items, cid: cid, gid: gid })
        }
      });
    });
  },


  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var class_items = this.data.class_items;
    var cid = e.detail.value;
    var gid = ""
    for (var i = 0, len = class_items.length; i < len; ++i) {
      class_items[i].checked = class_items[i].value == e.detail.value;
      if (class_items[i].checked) {
        gid = class_items[i].gid
      }
    }

    this.setData({
      class_items: class_items,
      cid: cid,
      gid: gid,
    });
  },

  // 提交 TODO
  submit: function (event) {

    if (app.globalData.isExpOpenid) {
      wx.showToast({
        title: '体验者无权限',
      })
      return;
    }
    var name = event.detail.value.name;
    var desc = "";

    if(name.length==0){
      wx.showToast({
        title: '名称不正确',
      })
      return ;
    }

    var cid = that.data.cid;
    var gid = that.data.gid;
    var role = that.data.role;
    wx.showLoading({
      title: '添加中....',
    })
    app.getImprint(function (imprint) {
      var formdata = { "name": name, "desc": desc, "cid": cid, "gid": gid, role: role }
      util.AJAX1(config.createAlbumUrl, formdata, "post", { imprint: imprint }, function (res) {
        that.setData({ button_loadding: false });
        var result = res.data;
        console.log(result);
        app.globalData.albumRefresh=true;
        if (result.status == 'ok') {
          // app.globalData.memberReload = 1;
          wx.navigateBack({ ddd: "as" });
        }
      });
    });
  },
  


});
