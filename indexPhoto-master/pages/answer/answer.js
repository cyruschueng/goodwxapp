// pages/answer/answer.js
var tunji = require('../../utils/tunji.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    show_btn: false,
    top_h: 0,
    options: "true"
   },

  onLoad: function (options) {
    console.log('options:', options);
    wx.hideShareMenu({});
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: wx.getStorageSync('bgColor'),
    })
    var that = this;
    var u_avatar = wx.getStorageSync("avatarUrl");
    var uid = options.uid;
    var set_number = options.set_number;
    console.log('set_number:', set_number);
    // scene = "532-28"
    // 统计
    tunji.statistic();
    tunji.fromPageData();
    tunji.userEvent();

    that.setData({
      u_avatar: u_avatar,
      uid: uid,
      set_number: set_number
    })
console.log("onload id",set_number,uid);
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      background: wx.getStorageSync('background'),
      backgroundColor: wx.getStorageSync('bgColor'),
      border: wx.getStorageSync('border'),
      userImg: wx.getStorageSync('userImg'),
      userIcon: wx.getStorageSync('userIcon'),
      sex: wx.getStorageSync('sex'),//"sex":1,//1 男 2女
    })
    var u_avatar = wx.getStorageSync("avatarUrl");
    var sign = wx.getStorageSync("sign");
    // sign = "6dc440d6ebefe00dbe21538d5dd357b6";
    var set_number = that.data.set_number;
    var uid = that.data.uid;
    var array = that.data.array;
    

    console.log("onshow id", uid,set_number,u_avatar);
    wx.showLoading({
      title: '加载中',
    })
    console.log("set_number:", set_number);
    console.log("uid:", uid);
    if (set_number && uid) {
      wx.request({
        url: app.data.apiurl + 'api/answer-question-by-uid' + '?operator_id=' + wx.getStorageSync("operator_id"),
        data: {
          sign: sign,
          problemMakerId: uid,
          set_number: set_number
        },
        success: function (res) {
          console.log("请求题目", res);
          let status = res.data.status;
          if (status==0){
            wx.showToast({
              title: res.data.msg,
            })
          }
          that.setData({
            diploma_number: res.data.diploma_number
          })
          var question = res.data.question;
          var answersList = res.data.answersList;
          console.log(question.option_c);
          var height, opt_height;
          if (question.option_c == "" || question.option_c == undefined) {
            height = 80;
            opt_height = 20;
          } else {
            height = 70;
            opt_height = 30;
          }

          if (answersList) {
            array = answersList
          }
          var ques_obj = {};

          if (array.length < 19) {
            ques_obj.direction = "left";
            ques_obj.avatar = question.avatar;
            ques_obj.text = question.title;
            array.push(ques_obj);
          } else {
            var p_avatar = res.data.problemMakerInfo.avatar;
            var makerId = res.data.problemMakerInfo.makerId;
            height = 100;
            opt_height = 0;
            that.setData({
              show_btn: true,
              p_avatar: p_avatar,
              makerId: makerId
            })
          }

          that.setData({
            question: question,
            array: array,
            uqid: question.uqid,
            height: height,
            opt_height: opt_height,
            opacity: 0
          })

          that.setData({
            top_h: 2000
          })
          wx.hideLoading();
        }
      })
    }
  },
  redUrl(){
    wx.navigateToMiniProgram({
      appId: 'wx22c7c27ae08bb935',
      path: 'pages/index/index',
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log(res);
      }
    })
  },
  answerSubject: function (e) {
    var that = this;
    that.setData({
      options: "false",
      opacity: 0
    })
    var array = that.data.array;
    var text = e.target.dataset.text;
    var answer = e.target.dataset.option;
    var avatar = wx.getStorageSync("avatarUrl");
    var uqid = that.data.uqid;
    var ques_obj = {};
    var ques_obj1 = {};
    var sign = wx.getStorageSync("sign");
    var set_number = that.data.set_number;
    var uid = that.data.uid;

    console.log("头像",avatar);
    // wx.showLoading({
    //   title: '证书生成中...',
    // })

    wx.request({
      url: app.data.apiurl + 'api/answer-question-by-uid' + '?operator_id=' + wx.getStorageSync("operator_id") + '&cc=cc',
      data: {
        sign: sign,
        problemMakerId: uid,
        set_number: set_number,
        uqid: uqid,
        answer: answer
      },
      success: function (res) {
        console.log("答题",res);
        var question = res.data.question;
        var answersList = res.data.answersList;
        var height, opt_height;
        if (question.option_c == "" || question.option_c == undefined) {
          height = 80;
          opt_height = 20;
        } else {
          height = 70;
          opt_height = 30;
        }

        that.setData({
          height: height,
          opt_height: opt_height,
          options: "true"
        })

        ques_obj.direction = "right";
        ques_obj.avatar = avatar;
        ques_obj.text = text;

        array.push(ques_obj);

        if (answersList.length < 20) {
          ques_obj1.direction = "left";
          ques_obj1.avatar = question.avatar;
          ques_obj1.text = question.title;
          array.push(ques_obj1);
          that.setData({
            array: array
          })
        } else {
          var p_avatar = res.data.problemMakerInfo.avatar;
          var makerId = res.data.problemMakerInfo.makerId;
          height = 100;
          opt_height = 0;
          that.setData({
            show_btn: true,
            p_avatar: p_avatar,
            makerId: makerId
          })
        }
        if (res.data.diploma_number){
          wx.setStorageSync("diploma_number", res.data.diploma_number);
        }

        that.setData({
          question: question,
          array: array,
          uqid: question.uqid,
          height: height,
          opt_height: opt_height
        })
        that.setData({
          top_h: 2000
        })
      }
    })

  },
  check_certi: function () {
    var that = this;
    var makerId = that.data.makerId;
    var uid = that.data.uid;
    var set_number = that.data.set_number;
    wx.navigateTo({
      url: '../getCerti/getCerti?makerId=' + makerId + '&set_number=' + set_number + '&uid=' + uid + '&diploma_number=' + that.data.diploma_number,
    })
  }
})



// // pages/answer/answer.js
// var app = getApp();
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     array: [],
//     show_btn: false,
//     top_h: 0,
//     options: "true"
//   },

//   onLoad:function(options){
//     wx.hideShareMenu({});
//     var that = this;
//     var u_avatar = wx.getStorageSync("avatarUrl");
//     var pageSharecode = options.pageSharecode;
//     var set_number = options.set_number;

//     that.setData({
//       u_avatar: u_avatar,
//       pageSharecode: pageSharecode,
//       set_number: set_number
//     })

//     var scene = options.scene;
//     var id = scene.split("-")[0];
//     var set_number = scene.split("-")[1];
//     console.log("答题",id,set_number)
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
//     var that = this;
//     // var sign = app.data.sign;
//     var sign = wx.getStorageSync("sign");
//     // sign = "6dc440d6ebefe00dbe21538d5dd357b6";
//     var set_number = that.data.set_number;
//     var pageSharecode = that.data.pageSharecode;
//     // var pageSharecode = "00d07a34673d1a5a674a5b56f7cdfc0e";
//     // var set_number = 5;
//     var array = that.data.array;
//     var u_avatar = wx.getStorageSync("avatarUrl");;
//     console.log("sign:",sign);
//     console.log("pageSharecode:",pageSharecode);
//     console.log("set_number:", set_number);
//     wx.showLoading({
//       title: '加载中',
//     })

//     if (set_number && pageSharecode){
//       wx.request({
//         url: 'https://friend-check.playonwechat.com/api/answer-question',
//         data: {
//           sign: sign,
//           sharecode: pageSharecode,
//           set_number: set_number
//         },
//         success: function (res) {
//           console.log("请求题目", res);
          
//           var question = res.data.question;
//           var answersList = res.data.answersList;
//           console.log(question.option_c);
//           var height, opt_height;
//           if (question.option_c == "" || question.option_c == undefined) {
//             height = 80;
//             opt_height = 20;
//           } else {
//             height = 70;
//             opt_height = 30;
//           }

//           if (answersList) {
//             array = answersList
//           }
//           var ques_obj = {};

//           if (array.length < 19) {
//             ques_obj.direction = "left";
//             ques_obj.avatar = question.avatar;
//             ques_obj.text = question.title;
//             // ques_obj.animate = "true";
//             array.push(ques_obj);
//           } else {
//             var p_avatar = res.data.problemMakerInfo.avatar;
//             var makerId = res.data.problemMakerInfo.makerId;
//             height = 100;
//             opt_height = 0;
//             that.setData({
//               show_btn: true,
//               p_avatar: p_avatar,
//               makerId: makerId
//             })
//           }

//           that.setData({
//             question: question,
//             array: array,
//             uqid: question.uqid,
//             height: height,
//             opt_height: opt_height,
//             opacity: 0
//           })

//           that.setData({
//             top_h: 2000
//           })
//           wx.hideLoading();
//         }
//       })
//     }
    

//   },
//   answerSubject:function(e){
//     var that = this;
//     that.setData({
//       options: "false",
//       opacity: 0
//     })
//     var array = that.data.array;
//     var text = e.target.dataset.text;
//     var answer = e.target.dataset.option;
//     var avatar = wx.getStorageSync("avatarUrl");
//     var uqid = that.data.uqid;
//     var ques_obj = {};
//     var ques_obj1 = {};
//     var sign = app.data.sign;
//     var set_number = that.data.set_number;
//     var pageSharecode = that.data.pageSharecode;
//     // var pageSharecode = "00d07a34673d1a5a674a5b56f7cdfc0e";
//     // var set_number = 5;
//     // console.log("请求1", new Date());
//       wx.request({
//         url: 'https://friend-check.playonwechat.com/api/answer-question',
//         data: {
//           sign: sign,
//           sharecode: pageSharecode,
//           set_number: set_number,
//           uqid: uqid,
//           answer: answer
//         },
//         success: function (res) {
//           var question = res.data.question;
//           var answersList = res.data.answersList;
//           var height, opt_height;
//           if (question.option_c == "" || question.option_c == undefined){
//             height = 80;
//             opt_height = 20;
//           }else{
//             height = 70;
//             opt_height = 30;
//           }     

//           that.setData({
//             height: height,
//             opt_height: opt_height,
//             options: "true"
//           })

//           ques_obj.direction = "right";
//           ques_obj.avatar = avatar;
//           ques_obj.text = text;
          
//           array.push(ques_obj);
          
//           if (answersList.length < 20) {
//             ques_obj1.direction = "left";
//             ques_obj1.avatar = question.avatar;
//             ques_obj1.text = question.title;
//             array.push(ques_obj1); 
//             that.setData({
//               array: array
//             })
//          } else {
//             var p_avatar = res.data.problemMakerInfo.avatar;
//             var makerId = res.data.problemMakerInfo.makerId;
//             height = 100;
//             opt_height = 0;
//             that.setData({
//               show_btn: true,
//               p_avatar: p_avatar,
//               makerId: makerId
//             })
//           }

//           that.setData({
//             question: question, 
//             array: array,           
//             uqid: question.uqid,
//             height: height,
//             opt_height: opt_height            
//           })
//           that.setData({
//             top_h: 2000
//           })
//         }
//       })

//   },
//   check_certi:function(){
//     var that = this;
//     var makerId = that.data.makerId;
//     var pageSharecode = that.data.pageSharecode;
//     var set_number = that.data.set_number;
//     wx.navigateTo({
//       url: '../getCerti/getCerti?makerId=' + makerId + '&set_number=' + set_number + '&pageSharecode=' + pageSharecode,
//     })
//   }
// })