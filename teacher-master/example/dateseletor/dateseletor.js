var util = require("../../utils/util.js")
var app = getApp();
const config = require('../../config')
var that;
Page({
    data: {
        i:'',
        j: '',
        cid:'',
        subjects:[],
        subject:'',
        from:'',
        show_add:true
    },
    onLoad: function (options) {
      that=this;
      // 页面初始化 options 为页面跳转所带来的参数
      var i = options.i;
      var j=options.j;
      var cid = options.cid;
      var from=options.from
      app.initData(function (configData) {
        var subject = configData.subject;
        var subjects=subject.split('|');
        that.setData({ i: i, j: j, cid: cid,subjects:subjects,from:from });
      });

    },
    showAdd:function(e){
      that.setData({show_add:false})
    },
    addSubject:function(e){
      var subject=e.detail.value.subject;
      app.initData(function (configData) {
         configData.subject = configData.subject+'|'+subject;
         var subjects = configData.subject.split('|');
        that.setData({subjects: subjects,subject:"",show_add:true});
      });
    },
    navigate: function (e) {
      var subject=e.detail.target.id;
      console.log(e)
      var cid=that.data.cid;
      var i=that.data.i;
      var j=that.data.j;
      console.log(cid+','+subject+',j='+j+',i='+i);
      if(that.data.from=="add"){
        app.globalData.currentSubjectPublish = subject ;
        var form_id = e.detail.formId;
        app.getImprint(function (imprint) {
          wx.showLoading({
            title: '处理中..',
          })
          util.AJAX1(config.putFormidUrl, { form_id: form_id }, "post", { imprint: imprint }, function (res) {
            wx.hideLoading()
            wx.navigateBack({})
          });
        });
      
      }else{
        util.AJAX2(config.editTimetableUrl, '添加中', { cid: cid, subject: subject, j: j, i: i }, "post", {}, function (res) {
          if (res.data.status == 'ok') {
            app.globalData.currentSubject = subject + "|" + j + "|" + i;
            console.log(subject);
            wx.navigateBack({})
          } else {
            wx.showToast({
              title: '出现异常...',
            })
          }
        })
      }
    },
});
