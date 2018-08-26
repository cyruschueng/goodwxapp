var util = require('../../utils/util.js');
var app = getApp();
var sign_key = app.globalData.sign_key;
var topicUrl = app.globalData.topicUrl;
var tscoreUrl = app.globalData.tsorceUrl;
var page = 0,totalTime = 3600000,time,subStatus = false,bTimer,answer;
var ansArr = {
    '0':[false,false,false,false],
    '1':[false,false,false,false],
    '2':[false,false,false,false],
    '3':[false,false,false,false],
    '4':[false,false,false,false],
    '5':[false,false,false,false],
    '6':[false,false,false,false],
    '7':[false,false,false,false],
    '8':[false,false,false,false],
    '9':[false,false,false,false]
};
var five_topic = [{"words_id":null,"time":1000,"score":null,"options":""},
                  {"words_id":null,"time":1000,"score":null,"options":""},
                  {"words_id":null,"time":1000,"score":null,"options":""},
                  {"words_id":null,"time":1000,"score":null,"options":""},
                  {"words_id":null,"time":1000,"score":null,"options":""}];
var ten_topic = [{"words_id":null,"time":1000,"score":null,"options":""},
                 {"words_id":null,"time":1000,"score":null,"options":""},
                 {"words_id":null,"time":1000,"score":null,"options":""},
                 {"words_id":null,"time":1000,"score":null,"options":""},
                 {"words_id":null,"time":1000,"score":null,"options":""},
                 {"words_id":null,"time":1000,"score":null,"options":""},
                 {"words_id":null,"time":1000,"score":null,"options":""},
                 {"words_id":null,"time":1000,"score":null,"options":""},
                 {"words_id":null,"time":1000,"score":null,"options":""},
                 {"words_id":null,"time":1000,"score":null,"options":""}];
var resArr = [];
var quizLen = 2,bookIds = [{score:null,time:0,book_id:null}, {score:null,time:0,book_id:null}];
var qTimer,canRole = true;
Page({
  /**
   * 页面的初始数据
   */
  data: {
      showMessage: false,
      messageContent: '',
      books: [],
      quiz: [],
      head_url: "",
      upStatus: true,
      startStatus: true,
      page: 0,
      c_hour: '01',
      c_min: '00',
      c_sis: '00',
      countTime:3600000,
      // countTime:30000,
      pageLength: null,
      itemArr: ['A', 'B', 'C', 'D'],
      ans: {
          '0': [false, false, false, false],
          '1': [false, false, false, false],
          '2': [false, false, false, false],
          '3': [false, false, false, false],
          '4': [false, false, false, false],
          '5': [false, false, false, false],
          '6': [false, false, false, false],
          '7': [false, false, false, false],
          '8': [false, false, false, false],
          '9': [false, false, false, false]
      },
      book_ids:[
        {score:null,time:0,book_id:null},
        {score:null,time:0,book_id:null},
      ],
      submitStatus:false,
      titleH:null,
      ansH:null,
      isIpx:app.globalData.isIpx?true:false,
      moStatus:false,
      modalStatus:false,
      tranStatus:false,
      modalText:'先跟读绘本，提交成绩后才可答题呦～'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.hideShareMenu();
      console.log(options);
      page=0;
      ansArr={'0': [false, false, false, false],
              '1': [false, false, false, false],
              '2': [false, false, false, false],
              '3': [false, false, false, false],
              '4': [false, false, false, false],
              '5': [false, false, false, false],
              '6': [false, false, false, false],
              '7': [false, false, false, false],
              '8': [false, false, false, false],
              '9': [false, false, false, false]};
      this.setData({
          submitStatus:false,
          ans:{'0': [false, false, false, false],
              '1': [false, false, false, false],
              '2': [false, false, false, false],
              '3': [false, false, false, false],
              '4': [false, false, false, false],
              '5': [false, false, false, false],
              '6': [false, false, false, false],
              '7': [false, false, false, false],
              '8': [false, false, false, false],
              '9': [false, false, false, false]},
          book_ids:[{score:null,time:0,book_id:null},
                    {score:null,time:0,book_id:null}]
        })
      if(wx.getStorageSync('grade')>9){
          resArr = [{"words_id":null,"time":1000,"score":null,"options":""},
              {"words_id":null,"time":1000,"score":null,"options":""},
              {"words_id":null,"time":1000,"score":null,"options":""},
              {"words_id":null,"time":1000,"score":null,"options":""},
              {"words_id":null,"time":1000,"score":null,"options":""},
              {"words_id":null,"time":1000,"score":null,"options":""},
              {"words_id":null,"time":1000,"score":null,"options":""},
              {"words_id":null,"time":1000,"score":null,"options":""},
              {"words_id":null,"time":1000,"score":null,"options":""},
              {"words_id":null,"time":1000,"score":null,"options":""}]
          // resArr = new Array({"words_id":null,"time":1000,"score":null,"options":""})
      }else {
          resArr = [{"words_id":null,"time":1000,"score":null,"options":""},
              {"words_id":null,"time":1000,"score":null,"options":""},
              {"words_id":null,"time":1000,"score":null,"options":""},
              {"words_id":null,"time":1000,"score":null,"options":""},
              {"words_id":null,"time":1000,"score":null,"options":""}]
      };
      console.log(resArr);
      wx.hideShareMenu();
      if(options.flag=='1'){
          var index = parseInt(options.index);
          answer = JSON.parse(options.ans);
          ansArr = JSON.parse(options.ans);
          resArr = JSON.parse(options.res);
          console.log(answer);
          if(options.score){
              bookIds[index].score = parseInt(options.score);
          }
          bookIds[index].time = parseInt(options.duration||30000);
          bookIds[index].book_id = parseInt(options.book_id);
          totalTime -= parseInt(options.duration);
          console.log('_sss',Boolean(options.status));
          time = setInterval(this.countDown,1000);
          // bookIds[index].status = 1;
          page = options.page;
          this.setData({
              page:options.page,
              ans:answer,
              books:wx.getStorageSync('read_book'),
              quiz:wx.getStorageSync('book_quiz'),
              quizLength:wx.getStorageSync('quiz_length'),
              book_ids:bookIds,
              submitStatus:options.status=='true'?true:false
          });
          for(var i in answer){
              if(resArr[i].options&&resArr[i].options!=''){
                  subStatus = true;
              }else {
                  subStatus = false;
                  return;
              }
          };
      }else {
          bookIds = [{score:null,time:0,book_id:null}, {score:null,time:0,book_id:null}];
          var that = this;
          totalTime = 3600000;
          // totalTime = 30000;
          bTimer = setInterval(function () {
              var open = wx.getStorageSync('phoneNum');
              if(open !=''){
                  that.getTopic();
                  clearInterval(bTimer);
              }
          },200);
          time = setInterval(this.countDown,1000);
      };
  },
    imageLoad:function (e) {
        console.log(e);
        var w = e.detail.width;
        var h = e.detail.height;
        this.setData({titleH:h/w*300})
    },
    imageError:function (e) {
        console.log('error',e);
    },
    imgsLoad:function (e) {
      console.log(e.detail);
        var w = e.detail.width;
        var h = e.detail.height;
        this.setData({ansH:h/w*200})

    },
  getTopic:function () {
      var phone = wx.getStorageSync('phoneNum');
      console.log(phone);
      var s = "phone"+phone+sign_key;
      var sign = util.SHA256(s);
      console.log(s);
      console.log(sign);
      var str = "?phone="+phone+"&sign="+sign;
      var that = this;
      wx.showLoading({
          title: '加载中..',
      });
      wx.request({
          url: topicUrl+str,
          success: function (res) {
              console.log(res);
              console.log(wx.getStorageSync('grade'));
              if(wx.getStorageSync('grade')<=9){
                  wx.setStorageSync('read_book', res.data.data.read_book);
                  wx.setStorageSync('book_quiz', res.data.data.book_quiz);
                  wx.setStorageSync('quiz_length', res.data.data.book_quiz.length-1);
                  wx.hideLoading();
                  that.setData({
                      books:res.data.data.read_book,
                      quiz:res.data.data.book_quiz,
                      quizLength:res.data.data.book_quiz.length-1
                  });
                  quizLen = res.data.data.book_quiz.length-1;
                  wx.hideLoading();
              }else if(wx.getStorageSync('grade')>9){
                  var qArr = res.data.data.book_quiz[0].quiz.concat(res.data.data.book_quiz[1].quiz);
                  var quizArr = [];
                  for(var i in qArr){
                      var ans = [];
                      for(var j in qArr[i].tdata){
                          ans.push({title:qArr[i].tdata[j].title,flag:qArr[i].tdata[j].is_answer})
                      }
                      var o = {title:qArr[i].import_title,quiz:ans};
                      quizArr.push(o);
                  }
                  console.log(quizArr);
                  wx.setStorageSync('read_book', res.data.data.read_book);
                  wx.setStorageSync('book_quiz', quizArr);
                  wx.setStorageSync('quiz_length',quizArr.length-1);
                  that.setData({
                      books:res.data.data.read_book,
                      quiz:quizArr,
                      quizLength:quizArr.length-1
                  });
                  quizLen = quizArr.length-1;
                  wx.hideLoading();
              }

          },
          fail:function () {
              console.log('fffff')
          }
      })
  },
  showRole:function () {
      if(canRole){
          canRole = false;
          wx.navigateTo({
              url: '../../pages/role/role'
          })
      }
  },
  toWeb:function (e) {
        clearInterval(time)
        console.log('ssss',this.data.submitStatus);
        var open = wx.getStorageSync('openid');
        var grade = wx.getStorageSync('grade');
        console.log(open);
        var book_id = e.currentTarget.dataset.bookId;
        var book_pic = e.currentTarget.dataset.bookPic;
        var book_ind = e.currentTarget.dataset.bookIndex;
        wx.redirectTo({
            url: '../../pages/reading/reading?source=2&id='+book_id+'&pic='+book_pic+'&index='+book_ind+'&grade='+grade+'&page='+this.data.page+'&ans='+JSON.stringify(ansArr)+'&res='+JSON.stringify(resArr)+'&status='+this.data.submitStatus,
            // url: '../../pages/web/web?id='+book_id+'&openid='+open+'&index='+book_ind+'&grade='+grade+'&page='+this.data.page+'&ans='+JSON.stringify(ansArr)+'&res='+JSON.stringify(resArr)+'&status='+this.data.submitStatus,
        })
    },
  start:function () {
      var grade = wx.getStorageSync('grade');
      if(!this.data.modalStatus) {
          if (grade >= 10 && !this.data.modalStatus) {
              for (var i in this.data.book_ids) {
                  if (this.data.book_ids[i].book_id > 0) {
                      this.setData({startStatus: false})
                  } else {
                      this.modalShow();
                      this.setData({modalText:'阅读绘本后再答题效果更好呦！'})
                      this.setData({modalStatus: true, startStatus: true})
                      return;
                  }
              }
          } else {
              for (var i in this.data.book_ids) {
                  if (this.data.book_ids[i].book_id >0) {
                      this.setData({startStatus: false})
                  } else {
                      this.setData({startStatus: true})
                      this.setData({modalText:'先跟读绘本，提交成绩后才可答题呦～'})
                      this.modalShow();
                      return;
                  }
              }
          }
      }else {
          this.setData({startStatus: false})
      }
      // wx.navigateTo({
      //     url: '../../pages/score/score'
      // })
  },
  quiz_pre:function () {
      if(page>0){
          page--;
          this.setData({page:page})
      }else{
          return
      }
  },
  quiz_next:function () {
    clearInterval(qTimer);
    if(page<quizLen){
        page++;
        this.setData({page:page})
    }else{
        return
    }
  },
  //  验证是否全选
  check_ans:function (e) {
      clearInterval(qTimer);
      //判断选中状态
      var p = e.currentTarget.dataset.page;
      var ind = e.currentTarget.dataset.ind;
      ansArr[p] = [false,false,false,false];
      ansArr[p][ind] = true;
      this.setData({ans:ansArr});
      //判断结果
      var flag = e.currentTarget.dataset.flag;
      resArr[p].words_id = e.currentTarget.dataset.word;
      resArr[p].options = e.currentTarget.dataset.content;
      if(flag){
          resArr[p].score = 10;
      }else{
          resArr[p].score = 0;
      }
      // this.quiz_next();
      qTimer = setInterval(this.quiz_next,800);
      console.log(resArr);
      for(var i in resArr){
        if(resArr[i].options&&resArr[i].options!=''){
            subStatus = true;
        }else {
            subStatus = false
            return;
        }
      };
      this.setData({submitStatus:subStatus})
  },
    //提交成绩
    subResult:function () {
      console.log(subStatus);
      if(subStatus){
          var phone = wx.getStorageSync('phoneNum');
          var grade = wx.getStorageSync('grade');
          var readScore = 0;
          var selectScore = 0;
          console.log(page);
          if(grade<10){
              for(var i in this.data.book_ids){
                  if(this.data.book_ids[i].book_id >0){
                      readScore += this.data.book_ids[i].score;
                  }else {
                      this.showMessage('请阅读所有绘本')
                      this.setData({startStatus:true,page:page});
                      return
                  }
              }
          }
          for(var j in resArr){
              selectScore += resArr[j].score;
          };
          var allScore = parseInt(readScore/4) + selectScore;
          var s = "duration"+300000+"phone"+phone+"read_book"+this.data.book_ids+"read_score"+parseInt(readScore/4)+"select_score"+selectScore+"select_topic"+resArr+sign_key;
          var sign = util.SHA256(s);
          var fd={duration:300000,phone:phone,read_book:JSON.stringify(this.data.book_ids),read_score:parseInt(readScore/4),select_score:selectScore,select_topic:JSON.stringify(resArr),sign:sign};
          console.log(fd);
          wx.request({
              url:tscoreUrl,
              // data:JSON.stringify(fd),
              data:fd,
              method:'POST',
              header: {"Content-Type": "application/x-www-form-urlencoded"},
              success:function (res) {
                  console.log(res);
                  // wx.navigateTo({
                  //     url: '../../pages/score/score?grade='+grade+'&score='+allScore
                  // });
                  if(res.data.code==200){
                      wx.redirectTo({
                        url: '../../pages/score/score?grade='+grade+'&score='+allScore
                      })
                  };
              },
              fail:function (res) {
              }
          })
      }else {
      }
    },
    countDown:function ()
    {
        var now = new Date();
        totalTime -= 1000;
        var leftTime=totalTime;
        // var dd = parseInt(leftTime / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
        var hh = parseInt(leftTime / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
        var mm = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟数
        var ss = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
        // dd = this.checkTime(dd);
        hh = this.checkTime(hh);
        mm = this.checkTime(mm);
        ss = this.checkTime(ss);//小于10的话加0
        this.setData({c_hour:hh,c_min:mm,c_sis:ss,countTime:leftTime});
        if(totalTime <= 0){
            console.log('over');
            clearInterval(time);
            wx.reLaunch({
                url: '../../pages/index/index'
            })
        }
    },
    checkTime:function(i)
    {
        if (i < 10&&i>0) {
            i = "0" + i;
        }else if(i<=0){
            i = '00';
        }
        return i;
    },
    showMessage: function(text) {
        var that = this
        that.setData({
            showMessage: true,
            messageContent: text
        })
        setTimeout(function(){
            that.setData({
                showMessage: false,
                messageContent: ''
            })
        }, 2000)
    },
    modalShow:function () {
        this.setData({moStatus:true});
    },
    modalHide:function () {
        this.setData({moStatus:false});
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      canRole = true;
      // this.setData({tranStatus:false})
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      clearInterval(time);
      console.log('onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  toRole:function () {
    wx.navigateTo({
      url: '../../pages/role/role'
    })  
  },
})