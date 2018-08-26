// pages/music/music.js
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js'
Page({
  data: {
    answer: [],
    play: false, //播放
    bg: false,
    right: false, //回答正确于否
    tishi: false,
    click: 0
  },
  onLoad: function (options) {
    console.log("options:", options);
    let that = this;
    if (options.friend_mid){
      that.setData({
        num: options.num,
        friend_mid: options.friend_mid //好友mid
      })
    }else{
      wx.switchTab({
        url: '../music/music',
      })
    }
    
    console.log('friend_mid:', options.friend_mid, 'num:', options.num);
    if (options.friend_mid == wx.getStorageSync('mid')) { //自己
    console.log(111111);
      wx.switchTab({
        url: '../music/music',
      })
    }
  },

  onShow: function () {
    let that = this;
    that.setData({
      play: false,
      num: that.data.num,
      friend_mid: that.data.friend_mid
    })
    app.getAuth(function () {
      // 猜歌信息
      wx.request({
        url: app.data.apiurl2 + "guessmc/go?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
        data:{
          type:'friend',
          num: that.data.num,
          guess_type: 'music'
          //mid: that.data.friend_mid
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("猜歌信息:", res);
          var status = res.data.status;
          let answer = [];
          let both = {};
          let notice_key = [];
          if (status == 1) {
            that.setData({
              inform: res.data.data,
              problem: res.data.data.option,
              notice: res.data.data.notice
            })
            app.AppMusic.src = res.data.data.content;
            console.log('AppMusic:', app.AppMusic);
            notice_key = res.data.data.notice;
            // 1
            for (let i = 0; i < res.data.data.length; i++) {
              both.text = 0;
              both.index = -1;
              both.notice = false;
              answer[i] = both;
            }
            answer = answer;
            console.log('answer:', answer);
            that.setData({
                answer
            })
            // if (res.data.data.notice.length == res.data.data.length){
            //   for (let i = 0; i < answer.length; i++) {
            //     for (let j = 0; j < res.data.data.notice.length; j++) {
            //       console.log('j:', j)
            //       answer[answer.length - i - 1].text = notice_key[i];
            //       let obj = {
            //         text: notice_key[notice_key.length - i - 1],
            //         index: 1,
            //         notice: true
            //       };
            //       console.log('obj:', obj)
            //       answer[answer.length - i - 1] = obj;
            //       break;
            //     }
            //   }
            //   app.AppMusic.play();
            //   that.setData({
            //       play:true,
            //       answer
            //   })
            // }
            
          } else {
            that.setData({
              finish:true,
              bg:true
            })
            console.log(res.data.msg)
          }
        }
      })
      // 积分信息
      wx.request({
        url: app.data.apiurl + "guessmc/get-point-info?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
        data:{
          guess_type: 'music',
          friend_mid: that.data.friend_mid
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("积分信息:", res);
          var status = res.data.status;
          if (status == 1) {
            wx.setStorageSync('jifen', res.data.data);
            that.setData({
              answer_add_point: res.data.data.answer_add_point,
              notice_use_point: res.data.data.notice_use_point,
              point: res.data.data.point,
              share_add_point: res.data.data.share_add_point
            })
          } else {
            console.log(res.data.msg)
          }
        }
      })
      // 加好友
      wx.request({
        url: app.data.apiurl + "guessmc/friend?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
        data: {
          guess_type: 'music',
          friend_mid: that.data.friend_mid
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("加好友:", res);
          var status = res.data.status;
          if (status == 1) {
            console.log('加好友成功!')
          } else {
            console.log(res.data.msg)
          }
        }
      })
    });
  },
  mine() {
    wx.switchTab({
      url: '../music/music',
    })
  },
  // 刷新
  refresh(e) {
    console.log('refresh');
    let that = this;
    let inform = that.data.inform;
    let answer = [];
    let both = {};
    for (let i = 0; i < inform.length; i++) {
      both.text = 0;
      both.index = -1;
      answer[i] = both;
    }
    that.setData({
      answer,
      click: 0,
      problem: inform.option
    })
    console.log('refreshAnswer:', answer);
  },
  // 禾葡兰
  hepulan() {
    util.jump()
  },
  
  //stop
  stop() {
    let that = this;
    that.setData({
      play: false
    })
    app.AppMusic.pause();
    app.AppMusic.onPause(() => {
      console.log('暂停播放');
    })
  },
  //play
  play() {
    let that = this;
    app.AppMusic.play();
    that.setData({
      play: true
    })
    //console.log('AppMusic:',app.AppMusic);
    setTimeout(function () {
        console.log('15s');
        app.AppMusic.stop();
        app.AppMusic.onStop(() => {
          console.log('停止播放');
        })
        that.setData({
          play: false
        })
    }, 15000)

  },
  // 选择
  // 选择
  checked(e) {
    let that = this;
    let text = e.currentTarget.dataset.text;
    let index = e.currentTarget.dataset.index;
    let answer = that.data.answer;
    let problem = that.data.problem;
    let inform = that.data.inform;
    let click = that.data.click;
    let point = that.data.point;
    let answer_add_point = that.data.answer_add_point;
    if (text == 0) {
      return;
    }
    if (click == inform.length) {
      let huida = [];
      for (let i = 0; i < answer.length; i++) {
        huida.push(answer[i].text)
      }
      console.log(huida, 'huida:');
      console.log(typeof (huida.toString()));
      // 答题
      wx.request({
        url: app.data.apiurl2 + "guessmc/answer?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
        data: {
          num: that.data.inform.num,
          answer: huida.toString(),
          type: 'friend',
          guess_type: 'music',
          num: that.data.num,
          friend_mid: that.data.friend_mid
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("回答:", res);
          var status = res.data.status;
          if (status == 1) {
            that.setData({
              bg: true,
              right: true,
              point: point + answer_add_point,
              play: true
            })
            app.AppMusic.src = that.data.inform.content;
            app.AppMusic.play();
          } else {
            console.log(res.data.msg);
            tips.alert(res.data.msg);
            for (let i = 0; i < inform.length; i++) {
              both.text = 0;
              both.index = -1;
              answer[i] = both;
            }
            that.setData({
              answer,
              click: 0,
              problem: inform.option
            })
          }
        }
      })
    }
    let both = {};
    click = click + 1;
    console.log("click:", click);
    that.setData({
      click
    })
    // 答案
    for (let i = 0; i < answer.length; i++) {
      if (answer[i].text == 0) {
        let obj = {
          text: text,
          index: index,
          notice: false
        };
        answer[i] = obj;
        break;
      }
    }
    for (let j = 0; j < problem.length; j++) {
      if (j == index) {
        problem[j] = 0;
      }
    }
    that.setData({
      answer,
      problem
    })
    if (click == inform.length) {
      let huida = [];
      for (let i = 0; i < answer.length; i++) {
        huida.push(answer[i].text)
      }
      console.log(huida, 'huida:');
      console.log(typeof (huida.toString()));
      // 答题
      wx.request({
        url: app.data.apiurl2 + "guessmc/answer?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
        data: {
          num: that.data.inform.num,
          answer: huida.toString(),
          type: 'friend',
          guess_type: 'music',
          friend_mid: that.data.friend_mid
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("回答:", res);
          var status = res.data.status;
          if (status == 1) {
            that.setData({
              bg: true,
              right: true,
              play:true
            })
            //tips.alert(res.data.msg);
            app.AppMusic.src = that.data.inform.content;
            app.AppMusic.play();
            app.AppMusic.onEnded(() => {
              console.log('播放结束事件');
              that.setData({
                play: false
              })
            })
          } else {
            console.log(res.data.msg);
            tips.alert(res.data.msg);
            for (let i = 0; i < inform.length; i++) {
              both.text = 0;
              both.index = -1;
              answer[i] = both;
            }
            that.setData({
              answer,
              click: 0,
              problem: inform.option
            })
          }
        }
      })
    }

    // 如果点击6次就提交
  },
  // backText
  backText(e) {
    console.log(e);
    let that = this;
    let askindex = e.currentTarget.dataset.askindex;
    let index = e.currentTarget.dataset.index;
    let text = e.currentTarget.dataset.text;
    let problem = that.data.problem;
    let answer = that.data.answer;
    let click = that.data.click;
    let notice = e.currentTarget.dataset.notice;
    if (text == 'undefined' || text == undefined) {
      return;
    }
    if (notice == true && text != 'undefined' && text!= undefined) {
      console.log(text);
      tips.alert('提示的不能移除')
      return;
    }
    for (let i = 0; i < problem.length; i++) {
      if (i == askindex) {
        problem[i] = text
      }
    }
    for (let j = 0; j < answer.length; j++) {
      if (j == index) {
        let obj = {
          text: 0,
          obj: -1
        }
        answer[j] = obj;
      }

    }

    that.setData({
      problem,
      answer,
      click: click - 1
    })
  },
  
  onHide(e) {
    console.log('musiconhide');
    let that = this;
    that.setData({
      play: false
    })
    app.AppMusic.pause();
    app.AppMusic.onPause(() => {
      console.log('暂停播放');
    })
  }

})