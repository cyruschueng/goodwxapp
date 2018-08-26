var util = require("../../utils/util.js")
var app = getApp();
var that;
Page({
  data: {
    class_name:'',
    cls_all_parent_number: '',
    cls_now_parent_number: '',
    feedback_number: '',
    gid:'',
    cid:''
  },
  onLoad: function (options) {
    that = this;
    var class_name = options.class_name;
    var cls_all_parent_number = options.cls_all_parent_number;
    var cls_now_parent_number = options.cls_now_parent_number;
    var feedback_number = options.feedback_number;
    var gid = options.gid;
    var cid = options.cid;
    that.setData({
      class_name: class_name,
      cls_all_parent_number: cls_all_parent_number,
      cls_now_parent_number: cls_now_parent_number,
      feedback_number: feedback_number,
      gid: gid,cid:cid})
     },

  onShareAppMessage: function (options) {
    var cls_all_parent_number = that.data.cls_all_parent_number;
    var cls_now_parent_number = that.data.cls_now_parent_number;
    var cls_unjoin_number=cls_all_parent_number-cls_now_parent_number;
      wx.showShareMenu({
        withShareTicket: true //要求小程序返回分享目标信息
      });
      return {
        title: '注意啦,还有'+cls_unjoin_number+'位家长没有加入小管家,请尽快加入，以后我们通过班级群小管家发布通知、反馈作业',
        imageUrl: "http://campus002.oss-cn-beijing.aliyuncs.com/cc.jpg",
        path: '/example/bind/bind',
        success: function (res) {
          if (!res.shareTickets) {
            wx.showModal({
              title: '提示',
              content: '请分享到班级群',
            })
            return;
          }
          app.getImprint(function (imprint) {
            app.getGid(imprint, res.shareTickets[0], function (resData, err) {
              if (err) {
                return
              };
              if (resData.status == "ok"&& resData.gid) {
                   if(resData.gid!=that.data.gid){
                     wx.showModal({
                       title: '提示',
                       content: '您转发的班级有误，请检查',
                     })
                   }
              }
              })
          })
        },
        fail: function (res) {
          // 分享失败
          console.log(res)
        }
      }
    
  },
      
});
