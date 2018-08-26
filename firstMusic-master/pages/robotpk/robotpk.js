// pages/music/music.js
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js';
var inter;
Page({
  data: {
    answer: [],
    play: false, //播放
    bg: false,
    right: false, //回答正确于否
    tishi: false,
    error: false,
    click: 0,
    userInfo: wx.getStorageSync('userInfo'),
    formNum: 0,
    otherName: wx.getStorageSync('otherName'),
    otherImg: wx.getStorageSync('otherImg'),
    houseName: wx.getStorageSync('houseName'),
    houseImg: wx.getStorageSync('houseImg'),
    question_list: wx.getStorageSync('question_list'),
    title: 1, //题目
    room_id: wx.getStorageSync('room_id'),
    second: 20,
    houseNum: 0,//分值
    otherNum: 0,
    houseCount: 0,//倍数
    otherCount: 0,//倍数
    otherRight: 0,
    houseRight: 0,
    mid: wx.getStorageSync('mid')
  },
  onLoad: function (options) {
    console.log("options:", options);
    let that = this;
  },
  onShow: function () {
    let that = this;
    that.setData({
      play: false,
      room_id: wx.getStorageSync('room_id'),
      setUrl: false,
      otherName: wx.getStorageSync('otherName'),
      otherImg: wx.getStorageSync('otherImg'),
      houseName: wx.getStorageSync('houseName'),
      houseImg: wx.getStorageSync('houseImg'),
      question_list: wx.getStorageSync('question_list'),
    })
    let title = that.data.title;
    let second = that.data.second;
    let answer = [];
    let problem = [];
    let both = {};
    let notice_key = [];
    let obj = {};
    console.log('question_list:', wx.getStorageSync('question_list'))
    let question_list = wx.getStorageSync('question_list');
    console.log("question_list:", question_list[title - 1]);
    console.log("num:", question_list[title - 1].num);
    var option = question_list[title - 1].option;
    that.setData({
      inform: question_list[title - 1],
      problem: question_list[title - 1].option,
      _problem: (question_list[title - 1].option).slice(0),
      num: question_list[title - 1].num
    })
    // return;
    app.AppMusic.src = question_list[title - 1].content;
    // 1  question_list[title - 1].length
    for (let i = 0; i < question_list[title - 1].length; i++) {
      both.text = 0;
      both.index = -1;
      both.notice = false;
      answer[i] = both;
    }
    // play
    that.play();
    answer = answer;
    console.log('answer:', answer);
    that.setData({
      answer
    })
    // that.setData({
    //   inform: res.data.data,
    //   problem: res.data.data.option,
    //   _problem: (res.data.data.option).slice(0),
    // })
    // 20s自动提交一个答案
    that.daojishi();
    // 监听是否错误
    wx.onSocketError(function (res) {
      socketOpen = false
      console.log('WebSocket连接打开失败，请检查！');
    })
    // 监听是否断开
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！');
      that.setData({
        bg: true
      })
    })
    // 接收服务器信息
    that.resultTab();
    // 打开
    wx.onSocketOpen(function (ress) {
      // that.sendSocketMessage(keyword);
      console.log('WebSocket连接已打开111！');
    })
  },
  daojishi() {
    let that = this;
    let second = that.data.second;
    // 20s自动提交一个答案
    inter = setInterval(function () {
      if (second <= 1) {
        that.resultTab();
        console.log('倒计时结束');
        if (that.data.title > that.data.question_list.length) {
          console.log('inter:', inter);
          console.log('title大于that.data.question_list.length');
          clearInterval(inter);
          that.endEvent();
          return;
          wx.redirectTo({
            url: '../result/result?room_id=' + that.data.room_id
          })

        }
        console.log(that.data.room_id);
        console.log(wx.getStorageSync('mid'));
        if (that.data.room_id == wx.getStorageSync('mid')) { //群主
          console.log('houseInform:', wx.getStorageSync('houseInform'));
          if (!wx.getStorageSync('houseInform')) {
            console.log('houseInform');
            console.log(app.data.apiurl2 + "guessmc/friend-answer?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"), '回答houseInform111', Date.parse(new Date()));
            wx.request({
              url: app.data.apiurl2 + "guessmc/friend-answer?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
              data: {
                num: that.data.num,
                answer: '0,0,0,0',
                guess_type: 'music',
                room_id: wx.getStorageSync('room_id'),
                time: 20 - that.data.second * 1
              },
              header: {
                'content-type': 'application/json'
              },
              method: "GET",
              success: function (res) {
                clearInterval(inter);
                console.log("回答:", res);
                that.stop();
                var status = res.data.status;
                let keyword = res.data.data;
                console.log(status);
                if (status == 0) {
                  if (res.data.msg == '已经回答过了此题') {
                    let title = that.data.title + 1;
                    console.log(that.data.room_id, 'room_id');
                    that.setData({
                      title: title,
                      click: 0
                    })
                    let question_list = wx.getStorageSync('question_list');
                    console.log("question_list:", question_list[title - 1]);
                    var option = question_list[title - 1].option;
                    that.setData({
                      question: question_list[title - 1],
                      option: question_list[title - 1].option,
                      num: question_list[title - 1].num,
                      title,
                      houseInform: false,
                      otherInform: false,
                      second: 20,
                      answer: [
                        {
                          text: 0,
                          askindex: -1,
                          notice: false
                        },
                        {
                          text: 0,
                          askindex: -1,
                          notice: false
                        },
                        {
                          text: 0,
                          askindex: -1,
                          notice: false
                        },
                        {
                          text: 0,
                          askindex: -1,
                          notice: false
                        }
                      ],
                    })
                  }
                  if (res.data.msg == 'Pk还未开始') {
                    clearInterval(inter);
                    that.setData({
                      bg: true
                    })
                  }
                }
                console.log(keyword);
                that.sendSocketMessage(keyword);
                console.log('是否发送keyword:', keyword);
                that.resultTab();
              }
            })
          }
        } else {
          console.log('otherInform:', wx.getStorageSync('otherInform'));
          console.log(app.data.apiurl2 + "guessmc/friend-answer?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"), '回答otherInform22222', Date.parse(new Date()));
          if (!wx.getStorageSync('otherInform')) {
            console.log('otherInform')
            wx.request({
              url: app.data.apiurl2 + "guessmc/friend-answer?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
              data: {
                num: that.data.inform.num,
                answer: '0,0,0,0',
                guess_type: 'music',
                room_id: wx.getStorageSync('room_id'),
                time: 20 - that.data.second * 1
              },
              header: {
                'content-type': 'application/json'
              },
              method: "GET",
              success: function (res) {
                that.stop();
                clearInterval(inter);
                console.log("回答:", res);
                var status = res.data.status;
                let keyword = res.data.data;
                that.sendSocketMessage(keyword);
                console.log('是否发送keyword:', keyword);
                that.resultTab();
              }
            })
          }
        }
      } else {
        second--;
        console.log(second);
        that.setData({
          second
        })
        if (second == 16) {
          let title = that.data.title;
          if (!that.data.otherInform) {
            if (title == 1 || title == 3) {
              wx.request({
                url: app.data.apiurl2 + "guessmc/friend-answer?sign=" + wx.getStorageSync('robot_sign') + '&operator_id=' + wx.getStorageSync("kid"),
                data: {
                  num: that.data.num,
                  answer: that.data.inform.right_key,
                  guess_type: 'music',
                  room_id: wx.getStorageSync('room_id'),
                  time: 20 - that.data.second * 1
                },
                header: {
                  'content-type': 'application/json'
                },
                method: "GET",
                success: function (res) {
                  console.log("回答000:", res);
                  //that.stop();
                  var status = res.data.status;
                  let keyword = res.data.data;
                  that.sendSocketMessage(keyword);
                  console.log('是否发送keyword:', keyword);
                  that.resultTab();
                }
              })
            } else {
              wx.request({
                url: app.data.apiurl2 + "guessmc/friend-answer?sign=" + wx.getStorageSync('robot_sign') + '&operator_id=' + wx.getStorageSync("kid"),
                data: {
                  num: that.data.num,
                  answer: '0,0,0,0',
                  guess_type: 'music',
                  room_id: wx.getStorageSync('room_id'),
                  time: 20 - that.data.second * 1
                },
                header: {
                  'content-type': 'application/json'
                },
                method: "GET",
                success: function (res) {
                  console.log("回答000:", res);
                  //that.stop();
                  var status = res.data.status;
                  let keyword = res.data.data;
                  that.sendSocketMessage(keyword);
                  console.log('是否发送keyword:', keyword);
                  that.resultTab();
                }
              })
            }

          }
        }
        that.resultTab();
        that.jianting();
      }
    }, 1000)
  },
  no() {
    this.setData({
      bg: false,
      tishi: false
    })
  },
  // 更多好玩
  morePlay() {
    wx.reLaunch({
      url: '../more/more',
    })
  },
  // send
  sendSocketMessage: function (msg) {
    wx.sendSocketMessage({
      data: msg
    })
  },

  // 分享
  share(e) {
    wx.setStorageSync('inform', this.data.inform);
    wx.navigateTo({
      url: '../share/share',
    })
  },
  // 刷新
  refresh(e) {
    console.log('refresh');
    let that = this;
    let inform = that.data.inform;
    if (inform.length == that.data.click) {
      return;
    }
    let answer = [];
    let both = {};
    // inform.length
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
  // 下一题
  //stop
  stop() {
    let that = this;
    that.setData({
      play: false
    })
    app.AppMusic.pause();
    app.AppMusic.onPause(() => {
      console.log('暂停播放');
      that.setData({
        play: false
      })
    })
    
    app.AppMusic.onError((res) => {
      console.log(res.errMsg, 'errMsg')
      console.log(res.errCode)
    })
  },
  jianting(){
    let that = this;
    app.AppMusic.onEnded(() => {
      console.log('播放结束');
      that.setData({
        play: false
      })
    })
  },
  outTap() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  //play
  play() {
    let that = this;
    console.log(app.AppMusic, 'app.AppMusic');
    app.AppMusic.autoplay = true;
    app.AppMusic.play();
    that.setData({
      play: true
    })
    app.AppMusic.onStop(() => {
      console.log('停止播放');
      that.setData({
        play: false
      })
    })
    app.AppMusic.onError((res) => {
      console.log(res.errMsg, 'errMsg')
      console.log(res.errCode)
    })
  },
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
    console.log('text:', text);

    if (text == 0) {
      return;
    }
    console.log('click == inform.length', inform.length, click);
    click = click + 1;
    if (click > inform.length) {
      return;
    }
    console.log("click:", click);
    that.setData({
      click
    })
    that.setData({
      click
    })
    // inform.length
    let both = {};
    // 答案
    for (let i = 0; i < answer.length; i++) {
      if (answer[i].text == 0 || !answer[i].text) {
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
    // inform.length
    if (click == inform.length) {
      let huida = [];
      for (let i = 0; i < answer.length; i++) {
        huida.push(answer[i].text)
      }
      console.log('huida:', app.data.apiurl2 + "guessmc/friend-answer?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid") + '&num=' + that.data.inform.num + '&time=' + 20 - that.data.second * 1 + '&room_id=' + wx.getStorageSync('room_id'));
      console.log(typeof (huida.toString()));
      // 答题
      if (that.data.second > 2) {
        wx.request({
          url: app.data.apiurl2 + "guessmc/friend-answer?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
          data: {
            num: that.data.inform.num,
            answer: huida.toString(),
            guess_type: 'music',
            room_id: wx.getStorageSync('room_id'),
            time: 20 - that.data.second * 1
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log("回答:", res);
            var status = res.data.status;
            that.stop();
            if (status == 1) {
              console.log('keyword', res.data.data);
              that.sendSocketMessage(res.data.data);

            } else {
              console.log(res.data.msg);
              that.setData({
                bg: true
              })
              return;
              tips.alert(res.data.msg);
              // inform.length
              for (let i = 0; i < inform.length; i++) {
                both.text = 0;
                both.index = -1;
                answer[i] = both;
              }
              that.setData({
                answer,
                problem: _problem
              })
            }
          }
        })
      }

    }
    // 如果点击6次就提交
  },
  // backText
  backText(e) {
    let that = this;
    let askindex = e.currentTarget.dataset.askindex;
    let index = e.currentTarget.dataset.index;
    let text = e.currentTarget.dataset.text;
    let problem = that.data.problem;
    let answer = that.data.answer;
    let click = that.data.click;
    let notice = e.currentTarget.dataset.notice;
    console.log('text', text);
    if (text == 'undefined' || text == undefined || click == that.data.inform.length) {
      return;
    }
    if (notice == true && text != 'undefined' && text != undefined) {
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
  onShareAppMessage: function (res) {
    let that = this;
    return {
      title: '猜猜音乐',
      path: '/pages/shareMusic/shareMusic?friend_mid=' + wx.getStorageSync('mid') + '&num=' + that.data.inform.num,
      success: function (res) {
        // 转发成功
        wx.request({
          url: app.data.apiurl + "guessmc/share-add-point?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
          data: {
            guess_type: 'music'
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log("求助加积分:", res);
            var status = res.data.status;
            if (status == 1) {
              tips.success('积分' + that.data.share_add_point + '')
              that.setData({
                point: res.data.data.point,
              })
            } else {
              console.log(res.data.msg)
            }
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // 保存formid
  formSubmit(e) {
    let that = this;
    let form_id = e.detail.formId;
    let formNum = that.data.formNum + 1;
    if (formNum > 5) {
      return;
    }
    wx.request({
      url: "https://w.kuaiduodian.com/api/save-form?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
      data: {
        form_id: form_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        that.setData({
          formNum: formNum
        })
      }
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
  },
  resultTab() {
    // console.log('resultTab');
    let that = this;
    let otherCount = that.data.otherCount;
    let houseCount = that.data.houseCount;
    let otherNum = that.data.otherNum;
    let houseNum = that.data.houseNum;
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容2：' + res.data);
      let result = JSON.parse(res.data);
      console.log(result);
      console.log(result.num);
      if (result.result == 'tie') {
        tips.alert('平局');
        wx.setStorageSync('result', 'tie');
        wx.setStorageSync('otherNum', that.data.otherNum);
        wx.setStorageSync('houseNum', that.data.houseNum);
        that.stop();
        that.setData({
          setUrl: true
        })
        wx.redirectTo({
          url: '../result/result'
        })
      } else if (result.loser_info) {
        wx.setStorageSync('loser_info', result.loser_info);
        wx.setStorageSync('winner_info', result.winner_info);
        wx.setStorageSync('otherNum', that.data.otherNum);
        wx.setStorageSync('houseNum', that.data.houseNum);
        that.stop();
        that.setData({
          setUrl: true
        })
        wx.redirectTo({
          url: '../result/result'
        })
      } else if (result.status == 0) {
        that.setData({
          bg: true
        })
        that.stop();
        that.setData({
          setUrl: true
        })
        clearInterval(inter);
      } else if (result.num) {
        if (result.mid == that.data.room_id) { //房主
          // 100的 1.2倍  
          if (result.result == true) {
            // 回答成功
            if (result.mid == wx.getStorageSync('mid')) {
              if (wx.getStorageSync('sound') == true) {
                app.AppMusic1.src = 'http://ovhvevt35.bkt.clouddn.com/chengyu/ok.mp3';
                app.AppMusic1.play();
                console.log('AppMusic1播放回答正确', app.AppMusic1);
              }
            }
            that.setData({
              houseNum: that.data.houseNum + result.point,
              houseCount: houseCount + 1,
              houseRight: 1
            })
          } else {
            console.log('回答false', houseCount, 0);
            // 回答错误
            if (result.mid == wx.getStorageSync('mid')) {
              if (wx.getStorageSync('sound') == true) {
                app.AppMusic1.src = 'http://ovhvevt35.bkt.clouddn.com/chengyu/wrong.mp3';
                app.AppMusic1.play();
                console.log('AppMusic1回答错误', app.AppMusic1);
              }
            }
            that.setData({
              houseNum: that.data.houseNum + result.point,
              houseCount: 0,
              houseRight: 2
            })
          }

          let houseInform = result;
          wx.setStorageSync('houseInform', houseInform);
          that.setData({  //回答反馈
            houseInform: result
          })
          setTimeout(function () {
            that.setData({
              houseRight: 0
            })
          }, 1500)
        } else if (result.mid != that.data.room_id) {  //对手other
          console.log('otherInform', result);
          let otherInform = result;
          wx.setStorageSync('otherInform', otherInform);
          that.setData({  //回答反馈
            otherInform: result
          })
          // 100的 1.2倍  
          if (result.result == true) {
            // 回答成功
            if (result.mid == wx.getStorageSync('mid')) {
              if (wx.getStorageSync('sound') == true) {
                app.AppMusic1.src = 'http://ovhvevt35.bkt.clouddn.com/chengyu/ok.mp3';
                app.AppMusic1.play();
                console.log('AppMusic1播放回答正确', app.AppMusic1);
              }
            }
            console.log(result.result, 'true:', otherCount)
            that.setData({
              otherNum: that.data.otherNum + result.point,
              otherCount: otherCount + 1,
              otherRight: 1
            })
          } else {
            console.log(result.result, 'false:', otherCount);
            // 回答错误
            if (result.mid == wx.getStorageSync('mid')) {
              if (wx.getStorageSync('sound') == true) {
                app.AppMusic1.src = 'http://ovhvevt35.bkt.clouddn.com/chengyu/wrong.mp3';
                app.AppMusic1.play();
                console.log('AppMusic1回答错误', app.AppMusic1);
              }
            }
            that.setData({
              otherNum: that.data.otherNum + result.point,
              otherCount: 0,
              otherRight: 2
            })
          }
          setTimeout(function () {
            that.setData({
              otherRight: 0
            })
          }, 1500)
        } console.log(wx.getStorageSync('otherInform'), wx.getStorageSync('houseInform'), wx.getStorageSync('houseInform').num);
        if (wx.getStorageSync('otherInform') && wx.getStorageSync('houseInform')) {
          if (wx.getStorageSync('otherInform').num == wx.getStorageSync('houseInform').num) {
            wx.removeStorageSync('otherInform');
            wx.removeStorageSync('houseInform');
            console.log('二者都有,下一题');
            clearInterval(inter);
            that.setData({
              second: 20
            })

            let title = that.data.title + 1;
            if (title > that.data.question_list.length) {
              that.endEvent();
              //console.log('inter:', inter);
              //clearInterval(inter);
              console.log('title大于that.data.question_list.length', that.data.question_list.length, title);
              //clearInterval(inter);

              return;
              wx.redirectTo({
                url: '../result/result?room_id=' + that.data.room_id
              })
            } else {
              let answer = [];
              let problem = [];
              let both = {};
              let notice_key = [];
              let obj = {};
              let second = that.data.second;
              console.log(that.data.room_id, 'room_id');
              that.daojishi();
              tips.alert(result.msg);
              that.setData({
                title: title,
                click: 0
              })
              let question_list = wx.getStorageSync('question_list');
              console.log("question_list:", question_list[title - 1]);
              var option = question_list[title - 1].option;
              that.setData({
                title: that.data.title,
                houseInform: false,
                otherInform: false,
                inform: question_list[title - 1],
                problem: question_list[title - 1].option,
                _problem: (question_list[title - 1].option).slice(0),
                num: question_list[title - 1].num
              })
              app.AppMusic.src = question_list[title - 1].content;
              that.play();
              // 1  
              console.log('length:', question_list[title - 1].length);
              for (let i = 0; i < question_list[title - 1].length; i++) {
                console.log('i:', i)
                both.text = 0;
                both.index = -1;
                both.notice = false;
                answer[i] = both;
              }
              console.log('answer:', answer);
              that.setData({
                answer,
                click: 0
              })
            }
          }
        }
      }
    })
  },
  commonAsk(result) {
    console.log('commonAsk:result', result);
    let that = this;
    let both = {};
    let answer = [];
    let otherCount = that.data.otherCount;
    let otherNum = that.data.otherNum;
    let houseCount = that.data.houseCount;
    let houseNum = that.data.houseNum;
    that.resultTab();
  },
  endEvent() {
    let that = this;
    let both = {};
    let answer = [];
    // 房主结束PK
    if (that.data.room_id == wx.getStorageSync('mid')) {
      //好友结束PKfriend-end-pk
      if (wx.getStorageSync('type') == 'friend') {
        console.log(app.data.apiurl2 + "guessmc/friend-end-pk?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid") + '&room_id=' + that.data.room_id + '&guess_type=music')
        wx.request({
          url: app.data.apiurl2 + "guessmc/friend-end-pk?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
          data: {
            room_id: that.data.room_id,
            guess_type: 'music'
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log("提示信息:", res);
            var status = res.data.status;
            if (status == 1) {
              that.setData({
                list: res.data.data,
                keyword: res.data.data
              })
              var keyword = res.data.data;
              console.log('keyword:', keyword);
              that.sendSocketMessage(keyword);
              wx.onSocketClose(function (res) {
                console.log('WebSocket 已关闭！');
                that.setData({
                  bg: true
                })
              })
              that.resultTab();
            } else {
              console.log(res.data.msg)
            }
          }
        })
      } else if (wx.getStorageSync('type') == 'paiwei') {
        console.log(app.data.apiurl2 + "guessmc/end-pk?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid") + '&room_id=' + that.data.room_id + '&guess_type=music')
        wx.request({
          url: app.data.apiurl2 + "guessmc/end-pk?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
          data: {
            room_id: that.data.room_id,
            guess_type: 'music'
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log("提示信息:", res);
            var status = res.data.status;
            if (status == 1) {
              that.setData({
                list: res.data.data,
                keyword: res.data.data
              })
              var keyword = res.data.data;
              console.log('keyword:', keyword);
              that.sendSocketMessage(keyword);
              
              wx.onSocketClose(function (res) {
                console.log('WebSocket 已关闭！');
                that.setData({
                  bg: true
                })
              })
              that.resultTab();
            } else {
              console.log(res.data.msg)
            }
          }
        })
      }
    }
  },
  // 卸载
  onUnload() {
    let that = this;
    that.stop();
    console.log('onUnload');
    if (this.data.setUrl == true) { //答完题
      console.log('runonUnload答完题')
    } else { //未答完题
      console.log('runonUnload未答完题')
      wx.reLaunch({
        url: '../index/index',
      })
    }
  },

})