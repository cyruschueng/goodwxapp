var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')

Page({
  data: {
    class_name:"",
    winWidth: 0,
    winHeight: 0,
    day1: [],
    day2: [],
    day3: [],
    day4: [],
    day5: [],
    day6: [],
    role:''

  },
  onLoad: function (options) {
    that = this;
    var class_name =options.class_name;
    var cid=options.cid;
    that.setData({ class_name: class_name, cid: cid, role: app.globalData.role});
    var title = '课程表';
    if (class_name) {
      title = class_name + '课程表';
    };
    wx.setNavigationBarTitle({
      title: title
    })
    util.AJAX1(config.timeTableUrl, {cid:cid}, "post", {  }, function (res) {
      if(res.data.status=='ok'){
        var timetable=res.data.timetable;
        that.setData({ day1: timetable.day1, day2: timetable.day2, day3: timetable.day3, day4: timetable.day4, day5: timetable.day5, winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight });
      }
    });
  },

  onShow:function(){
    var subject= app.globalData.currentSubject;
    console.log(subject);
    var tt=  subject.split('|');
    var subjectName=tt[0];
    var j=tt[1];
    var i=tt[2];

    if (j == 1) {
      var day1 = that.data.day1;
      day1[i - 1].subject = subjectName;
      that.setData({ day1: day1 })
    }
   else if (j == 2) {
      var day2 = that.data.day2;
      day2[i - 1].subject = subjectName;
      that.setData({ day2: day2 })
    }
   else if (j == 3) {
      var day3 = that.data.day3;
      day3[i - 1].subject = subjectName;
      that.setData({ day3: day3 })
    }
    else if(j==4){
      var day4=that.data.day4;
      day4[i-1].subject=subjectName;
      that.setData({day4:day4})
    } else if (j == 5) {
      var day5 = that.data.day5;
      day5[i - 1].subject = subjectName;
      that.setData({ day5: day5 })
    }else if (j == 6) {
      var day6 = that.data.day6;
      day6[i - 1].subject = subjectName;
      that.setData({ day6: day6 })
    }
    console.log(tt)
  },




  edit: function (e) {
    if (app.globalData.isExpOpenid) {
      wx.showToast({
        title: '体验者无权限',
      })
      return;
    }
    var j = e.currentTarget.dataset.j;
    var i = e.currentTarget.dataset.i;
    if(app.globalData.role != "teacher"){
      return ;
    }
    console.log(j)
    console.log(i)
    wx.navigateTo({
      url: '../dateseletor/dateseletor?i=' + i+'&j='+(j-1)+'&cid='+that.data.cid
    })
  }
});
