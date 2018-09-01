// pages/music/music.js
var app = getApp();
var util = require('../../utils/util.js');
const ctx = wx.createCanvasContext('myCanvas');
import tips from '../../utils/tips.js';
var wxDraw = require("../../utils/wxdraw.min.js").wxDraw;
var Shape = require("../../utils/wxdraw.min.js").Shape;
var AnimationFrame = require("../../utils/wxdraw.min.js").AnimationFrame;
Page({
  data: {
     answer:[],
     play:false, //播放
     bg: false,
     right:false, //回答正确于否
     tishi:false,
     error: false,
     color: false,
     zindexImg:'',
     num: Math.random(),
     click:0,
     userInfo: wx.getStorageSync('userInfo'),
     formNum:0,
     page_hide: true,
     point: wx.getStorageSync('point'),
     gold: wx.getStorageSync('point').gold,
     offline_answer_gold: wx.getStorageSync('point').offline_answer_gold,
     offline_notic_gold: wx.getStorageSync('point').offline_notic_gold,
     answers:[
       {
         text:'我',
         index:'1'
       },
       {
         text: '我',
         index: '1'
       },
       {
         text: '我',
         index: '1'
       },
       {
         text: '我',
         index: '1'
       },
     ],
     wxCanvas: null,
     stars_src: 'http://ovhvevt35.bkt.clouddn.com/music/lb_a_21.png',
     a: 10,
     stars_timer: null,
     stars: []
     
  },
  onLoad: function (options) {
    console.log("options:", options);
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
        });
      }
    });
    var context = wx.createCanvasContext('textA')
    this.wxCanvas = new wxDraw(context, 0, 0, 400, 750);//创建画布
    var stars = new Array();//存储对象
    var stars_count = 30;//星星个数
    for (var i = 0; i < stars_count; i++) {
      var random = this.rand_number(30, 375);//随机产生位置
      var _w = this.rand_number(10, 70);//随机产生大小
      stars[i] = new Shape('image', { x: random, y: -50, w: _w, h: _w, file: "../img/1.png" }, 'fill', false)//创建星星
      this.wxCanvas.add(stars[i]);//将星星添加到画布
    }
    for (var i = 0; i < stars_count; i++) {//为每个星星创建动画
      var img = stars[i];
      var random = this.rand_number(1000, 2000);//随机动画时长
      img.animate({ y: "+750", rotate: Math.PI / 1 }, { duration: random, easing: "easeInQuint" }).start(1)
    }
    
    setTimeout(function(){
      // this.wxCanvas.clear();
    },2000)
  },
  rand_number: function (m, n) {
    var random = Math.floor(Math.random() * (m - n + 1) + n);
    return random;
  },
  onShow: function () {
    let that = this;
    // 猜歌信息
    wx.request({
      url: app.data.apiurl2 + "guessmc/go?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data:{
        guess_type: 'music',
        type: 'self'
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("猜歌信息:", res);
        var status = res.data.status;
        let answer = [];
        let problem = [];
        let both = {};
        let notice_key =[];
        let obj = {};
        
        if (status == 1) {
          that.setData({
            inform:res.data.data,
            problem: res.data.data.option,
            _problem: (res.data.data.option).slice(0),
            notice: res.data.data.notice //提示信息
          })
          app.AppMusic.src = res.data.data.content;
          console.log(res.data.data.content,'content');
          //app.AppMusic.src = 'http://ovhvevt35.bkt.clouddn.com/chengyu/Various%20Artists%20-%20Give%20It%20Up.mp3';
          notice_key = res.data.data.notice;
          // 1
          for (let i = 0; i < res.data.data.length; i++) {
            both.text=0;
            both.index=-1;
            both.notice = false;
            answer[i]= both;
          }
          answer = answer;
          console.log('answer:', answer);
          // 2
          for (let i = 0; i < answer.length; i++) {
              for (let j = 0; j < res.data.data.notice.length; j++) {
                console.log('j:',j)
                answer[answer.length - i - 1].text = notice_key[i];
                let obj = {
                  text: notice_key[notice_key.length - i - 1],
                  index: 1,
                  notice: true
                };
                console.log('obj:', obj)
                answer[answer.length - i - 1] = obj;
                break;
              }
          }

          if (res.data.data.notice.length == answer.length) {
            let huida = [];
            let offline_add_point = that.data.offline_add_point;
            console.log('offline_add_point', offline_add_point);
            for (let i = 0; i < answer.length; i++) {
              huida.push(answer[i].text)
            }
            console.log(1111)
            // 答题
            wx.request({
              url: app.data.apiurl2 + "guessmc/offline-answer?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
              data: {
                num: that.data.inform.num,
                answer: huida.toString(),
                type: 'self',
                guess_type: 'music'
              },
              header: {
                'content-type': 'application/json'
              },
              method: "GET",
              success: function (res) {
                console.log("回答:", res);
                var status = res.data.status;
                if (status == 1) {
                  app.AppMusic.stop();
                  app.AppMusic.play();
                  that.setData({
                    bg: true,
                    right: true,
                    point: that.data.point + offline_add_point,
                    play: true,
                    page_hide:false
                  })
                  var arrLength = 15;
                  that.createStars(arrLength);
                  that.data.stars_timer = setInterval(function () {
                    that.runStars(arrLength);
                  }, 50);
                  setTimeout(function () {
                    clearInterval(that.data.stars_timer);
                    // that.setData({
                    //   page_hide: true
                    // })
                  }, 3000);
                  
                } else {
                  console.log(res.data.msg);
                  that.error();
                  return;
                  for (let i = 0; i < inform.length; i++) {
                    both.text = 0;
                    both.index = -1;
                    answer[i] = both;
                  }
                  that.setData({
                    answer,
                    click: 0,
                    problem: _problem
                  })
                }
              }
            })
          }
          console.log('objanswer:', answer)
          that.setData({
            answer,
            click: that.data.notice.length,
            problem: that.data.inform.option
          })
        } else {
          that.setData({
            finish:true,
            bg: true
          })
          console.log(res.data.msg);
        }
      }
    })  
    that.jianting();
  },
  jianting() {
    let that = this;
    app.AppMusic.onEnded(() => {
      console.log('播放结束');
      that.setData({
        play: false
      })
    })
  },
  createStars: function (num) {
    var that = this;
    var num = num || 1;
    var x, y, g, vy, w, h;
    for (let i = 0; i < num; i++) {
      x = that.data.windowWidth * Math.random();
      y = -300 * Math.random();
      g = (Math.floor((Math.random() * 10) + 1)) * 0.5;
      vy = Math.floor((Math.random() * 10) + 1);
      var rate = Math.random() * 0.3 + 0.3;
      w = 62 * rate;
      h = 60 * rate;

      that.data.stars[i] = { x: x, y: y, g: g, vy: vy, w: w, h: h };
    }
  },
  runStars: function (arrLength) {
    var that = this;

    ctx.clearRect(0, 0, that.data.windowWidth, that.data.windowHeight);
    for (let i = 0; i < arrLength; i++) {
      ctx.drawImage('../img/lb_a_21.png', that.data.stars[i].x, that.data.stars[i].y, that.data.stars[i].w, that.data.stars[i].h);
    }
    ctx.draw();
    for (let i = 0; i < arrLength; i++) {
      that.data.stars[i].vy += that.data.stars[i].g;
      that.data.stars[i].y += that.data.stars[i].vy;
    }
  },
  // 回答错误
  error(){
    let that = this;
    that.setData({
      error: true,
      color:true
    })
    setTimeout(function(){
      that.setData({
        error: false
      })
    },200)
    that.setData({
      error: true
    })
  },
  
  // 提示
  notice(e){
    console.log('notice');
    let that = this;
    that.setData({
      bg:true,
      tishi:true
    })
  },
  no(){
    this.setData({
      bg: false,
      tishi: false
    })
  },
  // 更多好玩
  morePlay(){
    wx.redirectTo({
      url: '../more/more',
    })
  },
  // 提示规则,不是提示的文字全部清掉,保留提示的字符,因为正确的字是唯一的话,若前边又选,提示就没有了
  ok(){
    let that = this;
    let answer = that.data.answer;
    let _answer = that.data.answer.reverse();
    let problem = that.data.problem;
    let _problem = that.data._problem;
    let point = that.data.point;
    let offline_notic_gold = that.data.offline_notic_gold;
    let inform = that.data.inform;
    let index= '';
    let obj = {};
    let _problemIndex = '';
    that.setData({
      bg: false,
      tishi: false
    })
    wx.request({
      url: app.data.apiurl2 + "guessmc/offline-notice?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        num: that.data.inform.num,
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
          console.log('answer:', answer);
          that.setData({
            gold: that.data.gold * 1 - that.data.offline_notic_gold * 1
          })
          let notice_key = res.data.data.notice_key;
          let both = {};
          console.log('notice_key:', res.data.data.notice_key);
          if (notice_key.length==answer.length){ //提示全部的

            for (let i = 0; i < answer.length; i++) {
              for (let j = 0; j < notice_key.length; j++) {
                //console.log('j:', j)
                answer[answer.length - i - 1].text = notice_key[i];
                let obj = {
                  text: notice_key[notice_key.length - i - 1],
                  index: 1,
                  notice: true
                };
                //console.log('obj:', obj)
                answer[answer.length - i - 1] = obj;
                break;
              }
            }
            // console.log('endanswer:', answer);
            that.setData({
              answer: answer,//answer.reverse()
            })
            let huida = [];
            let offline_add_point = that.data.offline_add_point;
            for (let i = 0; i < answer.length; i++) {
              huida.push(answer[i].text)
            }
            console.log(1111)
              // 答题
              wx.request({
                url: app.data.apiurl2 + "guessmc/offline-answer?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
                data: {
                  num: that.data.inform.num,
                  answer: huida.toString(),
                  type: 'self',
                  guess_type: 'music'
                },
                header: {
                  'content-type': 'application/json'
                },
                method: "GET",
                success: function (res) {
                  console.log("回答:", res);
                  var status = res.data.status;
                  app.AppMusic.stop();
                  app.AppMusic.play();
                  if (status == 1) {
                    that.setData({
                      bg: true,
                      right: true,
                      point: that.data.point + that.data.offline_add_point,
                      play: true,
                      page_hide: false
                    })
                    var arrLength = 15;
                    that.createStars(arrLength);
                    that.data.stars_timer = setInterval(function () {
                      that.runStars(arrLength);
                    }, 50);
                    setTimeout(function () {
                      clearInterval(that.data.stars_timer);
                      that.setData({
                        page_hide: true
                      })
                    }, 3000);
                   
                  } else {
                    console.log(res.data.msg);
                    that.error();
                    return;
                    for (let i = 0; i < inform.length; i++) {
                      both.text = 0;
                      both.index = -1;
                      answer[i] = both;
                    }
                    that.setData({
                      answer,
                      click: 0,
                      problem: _problem
                    })
                  }
                }
              })
          }else{
            for (let i = 0; i < answer.length; i++) {
              for (let j = 0; j < notice_key.length; j++) {
                //console.log('j:', j)
                answer[answer.length - i - 1].text = notice_key[i];
                let obj = {
                  text: notice_key[notice_key.length - i - 1],
                  index: 1,
                  notice: true
                };
                //console.log('obj:', obj)
                answer[answer.length - i - 1] = obj;
                break;
              }
            }
           // console.log('endanswer:', answer);
            that.setData({
              answer: answer,//answer.reverse()
            })
          }
          console.log('answer:', answer);
          that.setData({
            problem,
            click: notice_key.length,
            point: that.data.point - that.data.offline_notic_gold
          })
          return;
          for (let i = 0; i < res.data.data.length; i++) {
            both.text = 0;
            both.index = -1;
            both.notice = false;
            answer[i] = both;
          }
          console.log('objanswer:', answer)
          that.setData({
            answer,
            click: 0,
            problem: that.data.inform.option
          })


          _answer = _answer;
          console.log('清楚自己选择的_answer:', _answer);
          for (let i = 0; i < _answer.length; i++) {
            if (_answer[i].notice == false) {
              console.log(i);
              // 循环选择中与提示文字相同的
              for (let j = 0; j < problem.length;j++){
                if (problem[j] == notice_key){
                    console.log(j);
                    index = j;
                    let obj = {
                      text: notice_key[0],
                      index: index,
                      notice: true
                    };
                    _answer[i] = obj;
                    console.log(i);
                }
              }
              break;
            }
          }

          console.log('objanswer:', _answer)
          that.setData({
            answer: _answer,
            click: 0,
            problem: that.data.inform.option
          })
        } else {
          tips.alert(res.data.msg);
          console.log(res.data.msg)
        }
      }
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
  refresh(e){
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
      click:0,
      problem: inform.option,
      color:false
    })
    console.log('refreshAnswer:', answer);
  },
  // 禾葡兰
  hepulan(){
    util.jump()
  },
  // 下一题
  nextTitle(){
    console.log('nextTitle');
    let that = this;
    app.AppMusic.stop();
    app.AppMusic.onStop(() => {
      console.log('停止播放');
    })
    that.setData({
      right:false,
      bg: false, 
      play: false
    })
    wx.request({
      url: app.data.apiurl2 + "guessmc/go?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data:{
        guess_type: 'music',
        type: 'self'
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("下一题猜歌信息:", res);
        var status = res.data.status;
        let answer = [];
        let both = {};
        if (status == 1) {
          that.setData({
            inform: res.data.data,
            problem: res.data.data.option,
            _problem: res.data.data.option.slice(0)
          })
          for (let i = 0; i < res.data.data.length; i++) {
            both.text = 0;
            both.index = -1;
            both.notice = false;
            answer[i] = both;
          }
          that.setData({
            answer,
            click:0,
            problem: that.data.inform.option,
            play:true
          })
           app.AppMusic.src = res.data.data.content;
           console.log(res.data.data.content,'content');
          //app.AppMusic.src = 'http://ovhvevt35.bkt.clouddn.com/chengyu/Various%20Artists%20-%20Give%20It%20Up.mp3';
          //app.AppMusic.seek(60);
          app.AppMusic.stop();
          app.AppMusic.play();
          that.setData({
            play: true
          })
          // setTimeout(function(){
          //   console.log('15s');
          //   app.AppMusic.stop();
          //   app.AppMusic.onStop(() => {
          //     console.log('停止播放');
          //     that.setData({
          //       play: false
          //     })
          //   })
            
          // },15000)
        } else {
          that.setData({
            finish: true,
            bg:true
          })
          console.log(res.data.msg)
        }
      }
    })
  },
  //stop
  stop(){
    let that = this;
    that.setData({
      play:false
    })
    app.AppMusic.pause();
    app.AppMusic.onPause(() => {
      console.log('暂停播放');
    })
    app.AppMusic.onError((res) => {
      console.log(res.errMsg,'errMsg')
      console.log(res.errCode)
    })
  },
  //play
  play() {
    let that = this;
    console.log(app.AppMusic,'app.AppMusic');
    app.AppMusic.stop();
    app.AppMusic.play();     
    that.setData({
      play: true
    })
    // setTimeout(function(){
    //   console.log('15splay');
    //   app.AppMusic.stop();
    //   app.AppMusic.onStop(() => {
    //     console.log('停止播放');
    //   })
    //   that.setData({
    //     play: false
    //   })
    // },15000)
    app.AppMusic.onError((res) => {
      console.log(res.errMsg,'errMsg')
      console.log(res.errCode, 'errMsg')
    })
  },
  // 选择
  checked(e){
    let that = this;
    let text = e.currentTarget.dataset.text;
    let index = e.currentTarget.dataset.index;
    let answer = that.data.answer;
    let problem = that.data.problem;
    let inform = that.data.inform;
    let click = that.data.click;
    let point = that.data.point;
    let offline_add_point = that.data.offline_add_point;
    console.log('text:',text)
    if(text == 0){
        return;
    }
  
    if (click==inform.length){
      let huida = [];
      for (let i = 0; i < answer.length; i++) {
        huida.push(answer[i].text)
      }
      console.log(huida, 'huida:');
      console.log(typeof (huida.toString()));
      // 答题
      wx.request({
        url: app.data.apiurl2 + "guessmc/offline-answer?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
        data: {
          num: that.data.inform.num,
          answer: huida.toString(),
          type: 'self',
          guess_type: 'music'
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("回答:", res);
          var status = res.data.status;
          if (status == 1) {
            app.AppMusic.stop();
            app.AppMusic.play(); 
            that.setData({
              bg: true,
              right: true,
              point: point + offline_add_point,
              play: true,
              page_hide:false
            })
            var arrLength = 15;
            that.createStars(arrLength);
            that.data.stars_timer = setInterval(function () {
              that.runStars(arrLength);
            }, 50);
            setTimeout(function () {
              clearInterval(that.data.stars_timer);
              that.setData({
                page_hide: true
              })
            }, 3000);
            
          } else {
            console.log(res.data.msg);
            that.error();
            return;
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
        click = click+1;
        if (click > inform.length) {
          console.log('>');
          return;
        }
        console.log("click:", click);
        that.setData({
          click
        })
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
    if (click==inform.length){
      let huida = [];
      for (let i =0;i<answer.length;i++){
          huida.push(answer[i].text)
      }
      console.log(huida,'huida:');
      console.log(typeof(huida.toString()));
      // 答题
      wx.request({
        url: app.data.apiurl2 + "guessmc/offline-answer?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
          data: {
            num: that.data.inform.num,
            answer: huida.toString(),
            type: 'self',
            guess_type: 'music'
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log("回答:", res);
            var status = res.data.status;
            if (status == 1) {
              app.AppMusic.stop();
              app.AppMusic.play();
              that.setData({
                bg: true,
                right: true,
                play: true,
                point: that.data.point + that.data.offline_add_point,
                page_hide: false
              })
              var arrLength = 15;
              that.createStars(arrLength);
              that.data.stars_timer = setInterval(function () {
                that.runStars(arrLength);
              }, 50);
              setTimeout(function () {
                clearInterval(that.data.stars_timer);
                that.setData({
                  page_hide: true
                })
              }, 3000);
             // tips.alert(res.data.msg);
             
              app.AppMusic.onEnded(() => {
                console.log('播放结束事件');
                that.setData({
                  play:false
                })
              })
            } else {
              console.log(res.data.msg);
              that.error();
              return;
              for (let i = 0; i <inform.length; i++) {
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
  backText(e){
    let that = this;
    let askindex = e.currentTarget.dataset.askindex;
    let index = e.currentTarget.dataset.index;
    let text = e.currentTarget.dataset.text;
    let problem = that.data.problem;
    let answer = that.data.answer;
    let click = that.data.click;
    let notice = e.currentTarget.dataset.notice;
    console.log('text',text);
    if (text == 'undefined' || text == undefined){
      return;
    }
    if (notice == true && text != 'undefined' && text != undefined){
      console.log(text);
      tips.alert('提示的不能移除')
      return;
    }
    for (let i = 0; i < problem.length;i++){
      if (i == askindex){
         problem[i] = text
      }
    }
    for (let j = 0; j < answer.length; j++){
      if (j == index) {
        let obj = {
          text : 0,
          obj : -1
        }
        answer[j] = obj;
      }
      
    }
    that.setData({
       problem,
       answer,
       click: click - 1,
       color:false
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
          url: app.data.apiurl2 + "guessmc/after-share?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
          data:{
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
              tips.success('积分' + that.data.point.share_gold+'')
              that.setData({
                gold: res.data.data.gold
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
  // 星星
  
  // 保存formid
  formSubmit(e){
    let that = this;
    let form_id = e.detail.formId;
    let formNum = that.data.formNum+1;
    if (formNum>5){
        return;
    }
    wx.request({
      url:  "https://w.kuaiduodian.com/api/save-form?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
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
  onHide(e){
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