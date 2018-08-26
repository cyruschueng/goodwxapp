import {$wuxRater} from '../../../wux/wux'
var api = require('../../../api.js')
var util = require('../../../utils/util.js')
var upload = require('../../../utils/upload.js')
var Zan = require('../../../zanui/index')
var id;
var questions;
var currentPage=1;
var hasMore;
var isStr = false;
Page(Object.assign({}, Zan.Toast, {
  data: {
    showSharebutton:false,
    list: [],
    item:[],
    condition: true,
    topicList: [
      {
        name: '你做事总是半途而废吗?',
        list: {
          0: '是的',
          1: '不是',
          2: '偶尔'
        }
      }
    ],
    lb: [
      "current",
      "right1",
      "right2",
      "right2",
      "right2"
    ],
    disable: true
  },

  onLoad: function (options) {
    var that = this
    if(options.scene){
      id = decodeURIComponent(options.scene);

      wx.showNavigationBarLoading();
      wx.showToast({
        title: 'Loading……',
        duration:20000,
        icon: 'loading'
      });

      this.getList(100,'');
      api.zhuangxinfo(id, function(res) {
        console.log("res",res);
        // wx.setNavigationBarTitle({
        //   title: res.name
        // });
        if(typeof(res.content)=='string'){
          res.content = JSON.parse(util.decode(util.decode(util.decode(res.content))));
        }
        console.log(res.content);
        questions = res.content.questions;
        var question = res.content.questions.question;
        var result = res.content.questions.result;
        result.map( res => {
          if (isNaN(res.store)) {
            isStr = true;
          }
        } );
        if (isStr) {
          question.map(res => {
            res.answer.map( res => {
              res.next = "";
            } )
          })
        }
        for (let i = 0; i < question.length; i++) {
          question[i].titleNumber = i + 1;
        }
        if (question.length > 1) {
          question = question.slice(0, 2);
        }
        var lb = that.data.lb;
        if (questions.question.length > 5) {
          for (let i = 5; i < questions.question.length; i++) {
            lb.push("right2")
          }
        }

        that.setData({
          disable: false,
          item: res,
          lb: lb,
          question: question
        })

        wx.hideNavigationBarLoading();
        wx.hideToast();
      },function(){
        wx.hideNavigationBarLoading();
        wx.hideToast();
        that.showZanToast('数据不存在或者被删除');
        setTimeout(function(){
          wx.navigateTo({
            url: "/pages/counsel/index/index?type=1"
          })
        },1500);
      });
    }
  },
  onReady: function() {
        //获得dialog组件
      this.dialog = this.selectComponent("#dialog");
  },
  start: function () {
    this.setData({
      condition: false
    })
  },
  getRandomArrayElements: function(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  },
  getList: function(index,search) {
    var that = this;
    var data = [];
    if(util.isEmptyObject(that.data.list)){that.data.list = []}

    api.zhuangxlist(index,5,currentPage,search, function(res) {
      currentPage = res.page;
      hasMore = res.pageCount > res.page;
      res.cats.selectedId = index;
      res.cats.scroll = true;
      res.cats.height = 45;

      if(currentPage == 1){
        that.data.list = []
      }
      if (currentPage > 10) {
        currentPage = 1;
      }
      var data = that.data.list.concat(res.list);
      that.setData({
        anoList: that.getRandomArrayElements(res.list,5),
        list: data,
        hasMore: hasMore
      })
      // that.setData({
      //   list: that.getRandomArrayElements(data,10),
      // })
    });
  },
  _showSharebutton() {
     // console.log(2)
      this.setData({
        showSharebutton:!this.data.showSharebutton
      });
  },
  shareToChats: function() {
        console.log('分享到微信');
        this._showSharebutton();
  },
  shareToMoments: function () {
    console.log('分享到朋友圈');
    this.saveResult();
    this._showSharebutton();
    
    
  },
 
   
  showDetail: function(e){
    wx.redirectTo({
      url: "/pages/counsel/detail/detail?scene="+e.currentTarget.dataset.id
    })
  },
  // inGroup: function () {
  //   currentPage++;
  //   this.getList(5,'');
  // },

  onPullDownRefresh: function () {
    currentPage=1
    this.getList(5,'');
  },

  onReachBottom: function() {
    if (!hasMore) return;
    if (!this.data.result) return;
    currentPage++;
    this.getList(5,'');
  },

  selectAnswer: function (e) {
    // console.log('e',e);
    var questionInd = e.currentTarget.dataset.questionind;
    var answerInd = e.currentTarget.dataset.answerind;
    var question = this.data.question;
    // console.log("question",question);
    var lb = this.data.lb;
    for (let i = 0; i < question[questionInd].answer.length; i++) {
      question[questionInd].answer[i].select = false;
    }
    question[questionInd].answer[answerInd].select = true;

    var isPop = true;
    if (question.length > 1) {
      if (question[questionInd].answer[answerInd].next > 0) {
        let nextQuestionInd = question[questionInd].answer[answerInd].next;
        // console.log("nextQuestionInd",nextQuestionInd);
        question[questionInd + 1] = questions.question[nextQuestionInd - 1];
        question[questionInd + 1].titleNumber = nextQuestionInd;
        if (nextQuestionInd < questions.question.length) {
          question[questionInd + 2] = questions.question[nextQuestionInd];
          question[questionInd + 2].titleNumber = Number(nextQuestionInd) + 1;
        }
      } else if (question[questionInd].answer[answerInd].next < 0 || questionInd >= lb.length - 1) {
        isPop = false;
        this.setData({
          showSubmit: true,
          questionInd: questionInd
        })
      } else {
        if (question.length < questions.question.length) {
          question.push(questions.question[question.length]);
          question[question.length - 1].titleNumber = question.length;
        }
      }

      if (questionInd == 0) {
        lb[lb.length - 2] = "left1";
        lb[lb.length - 1] = "left2";
      }
    } else {
      isPop = false;
      this.setData({
        showSubmit: true,
        questionInd: questionInd
      })
    }

    if (isPop) {
      let pop = lb.pop();
      lb.unshift(pop);
    }
    if (questionInd >= lb.length - 2) {
      lb[0] = "right2";
    }
    // console.log("lb",lb);
    this.setData({
      lb: lb,
      question: question
    })
  },

  submit: function (e) {
    var that = this;
    var item = this.data.item;
    api.zhuangxadd(item.id);
    api.login(function (_user) {
      // console.log("_user",_user);
      that.setData({
        user: _user
      });
    },function () {

    },'必须授权登录之后才能测试准确呢，是否重新授权登录？')

    var question = this.data.question;
    var questionInd = this.data.questionInd;
    // console.log("question",question);
    // console.log("questionInd",questionInd);
    // console.log("questions",questions);
    var totalStore = 0;
    for (let n = 0; n < question[questionInd].answer.length; n++) {
      if (question[questionInd].answer[n].select) {
        var nextValue = question[questionInd].answer[n].next
        break;
      }
    }
    console.log("nextValue",nextValue);
    let arr = [];
    //获取 答案结果
    questions.result.map((each,index) => {
      arr.push(each.store)
    });
    //对比选择的答案 如果没有 则默认选择最后一个
    var tmp = arr.find( store => {
      return store == nextValue;
    });
    if (nextValue < 0) {
      if (tmp == undefined) {
        var result = questions.result[arr.length - 1];
        var haibao = item.haibao[arr.length - 1];
      } else {
        for (let m = 0; m < questions.result.length; m++) {
          if (questions.result[m].store == nextValue) {
            var result = questions.result[m];
            var haibao = item.haibao[m];
            break;
          }
        }
      }
    } else {
      for (let i = 0; i < question.length; i++) {
        for (let j = 0; j < question[i].answer.length; j++) {
          if (question[i].answer[j].select) {
            totalStore += Number(question[i].answer[j].store);
            continue;
          }
        }
      }
      console.log("totalStore",totalStore);
      for (let m = 0; m < questions.result.length; m++) {
        console.log(questions.result[m].store.split("-")[1])
        if (questions.result[m].store.split("-")[1] >= totalStore) {
          var result = questions.result[m];
          var haibao = item.haibao[m];
          break;
        }
      }
    }

    wx.setNavigationBarTitle({
      title: "测试结果"
    });
    console.log("result",result);
    wx.showLoading({
      title: '正在分析结果...',
    });

    setTimeout(() => {
      wx.hideLoading();
      that.setData({
        result: result,
        haibao: haibao
      })
    },2000);
  },
 
  saveResult: function (successCB) {
    wx.showToast({
      title: 'loading',
      duration:20000,
      icon: 'loading'
    });
    var item = this.data.item;
    var haibao = this.data.haibao;
    var that = this;
    var tasks = [];
    var elements;
    if (this.data.user) {
      elements = [
        {
          dx: 20,
          dy: 0,
          gravity: "NorthWest",
          width: 50,
          height: 50,
          radiusx: "!50p",
          radiusy: "!50p",
          type: "image",
          value: "",
        },
        {
          color: "#999999",
          dx: 80,
          dy: 0,
          font: "黑体",
          gravity: "NorthWest",
          size: 24,
          type: "text",
          value: this.data.user.user_name
        },
        {
          dx: 23,
          dy: 0,
          gravity: "NorthWest",
          width: 200,
          height: 200,
          type: "image",
          value: item.qrcode
        },
      ];
      tasks[0] = new Promise(function (resolve) {
        api.getQiniuAvatar(that.data.user.avatar,
          function (res) {
            console.log("res", res);
            elements[0].value = res.avatar;
            resolve();
          }
        )
      })

      tasks[1] = new Promise(function (resolve) {
        wx.getImageInfo({
          src: util.replaceQiniuHttps(that.data.haibao.img_url),
          success: function (haibao) {
            console.log(haibao.width);
            elements[2].dy = Math.floor(haibao.height - 220);
            wx.getImageInfo({
              src: util.replaceQiniuHttps(item.avatar.url),
              success: function (res) {
                console.log(res.width);
                console.log(res.height);
                // elements[0].dy = Math.floor(res.height / res.width * haibao.width + 20);
                // elements[1].dy = Math.floor(res.height / res.width * haibao.width + 30);
                if (res.width < 750) {
                  elements[0].dy = Math.floor(res.height + 20);
                  elements[1].dy = Math.floor(res.height + 30);
                } else {
                  elements[0].dy = Math.floor(res.height / res.width * 750 + 20);
                  elements[1].dy = Math.floor(res.height / res.width * 750 + 30);
                }
                resolve();
              }
            })
          }
        })
      })
    } else {
      elements = [
        {
          dx: 23,
          dy: 0,
          gravity: "NorthWest",
          width: 200,
          height: 200,
          type: "image",
          value: item.qrcode
        },
      ];

      tasks[0] = new Promise(function (resolve) {
        wx.getImageInfo({
          src: util.replaceQiniuHttps(that.data.haibao.img_url),
          success: function (haibao) {
            console.log(haibao.width);
            elements[0].dy = Math.floor(haibao.height - 220);
            resolve();
          }
        })
      })
    }

    Promise.all(tasks).then(function () {
      var pic_url = that.data.haibao.img_url+'?watermark/3';
      elements.forEach(function (element, index, array) {
        if (element.type == "image") {
          pic_url += '/image/'+util.urlSafe(util.encode(util.getThumbnailUrl(element.value,element.width,element.height,element.radiusx?element.radiusx:0,element.radiusy?element.radiusy:0)))+'/gravity/'+element.gravity+'/dx/'+element.dx+'/dy/'+element.dy
        } else if (element.type == "text") {
          let value = (element.value + "").replace(/ /g, "");
          pic_url += that.textWatermark(element,value);
        }
      })
      console.log("pic_url",pic_url);
      // wx.hideToast();
      // successCB(pic_url);
      wx.downloadFile({
        url: util.replaceQiniuHttps(pic_url),
        // success: function(res) {
        //   console.log(21323)
        //   wx.hideToast()
        //   wx.hideNavigationBarLoading();
        //   console.log(res.tempFilePath)
        //     //previewSingalPic(res.tempFilePath)
        //   wx.navigateTo({
        //     url: '/pages/preview/preview?pic='+encodeURIComponent(res.tempFilePath)+'&title='+title+'&path='+encodeURIComponent(path)
        //   })
        // }
        success: function (res) {
          console.log("res",res);
          wx.getSetting({
            success: (result) => {
              console.log('result',result);
              wx.hideToast();
              wx.navigateTo({
                 url: '/pages/preview/preview?pic='+encodeURIComponent(res.tempFilePath)+'&title=loading'+'&path='+encodeURIComponent("path")
              })
              // if (result.authSetting['scope.writePhotosAlbum']==false) {
              //   wx.openSetting({
              //     success: () => {
              //       wx.saveImageToPhotosAlbum({
              //         filePath: res.tempFilePath,
              //         success: function () {
              //           wx.hideToast();
              //           wx.showToast({
              //             title: '测试结果海报已经保存到你的相册啦',
              //             duration:1000,
              //             icon: 'success'
              //           });
              //         },
              //         fail: function () {
              //           wx.hideToast();
              //         }
              //       })
              //     }
              //   })
              // } else {
              //   wx.saveImageToPhotosAlbum({
              //     filePath: res.tempFilePath,
              //     success: function () {
              //       wx.hideToast();
              //       wx.showToast({
              //         title: '测试结果海报已经保存到你的相册啦',
              //         duration:1000,
              //         icon: 'success'
              //       });
              //     },
              //     fail: function () {
              //       wx.hideToast();
              //     }
              //   })
              // }
            }
          })
        }
      })  
    })
  },

  textWatermark:function(element,value){
    var _url='';
    var gravity=element.gravity;
    var _size = element.size;
    _size = _size*20;
    var _urlSuffix = '/fill/'+util.urlSafe(util.encode(element.color))+'/fontsize/'+_size+'/gravity/'+gravity+'/dx/'+element.dx+'/dy/';
    if(element.lineLenght){
      var _arr = util.spliteByLength(value,0,element.lineLenght)
      if(element.lineHeight){
        for (var i = 0; i < _arr.length; i++) {
          _url += '/text/'+util.urlSafe(util.encode(_arr[i]))+_urlSuffix+(element.dy+element.lineHeight*i);
          if(element.font){
            _url += '/font/'+util.urlSafe(util.encode(element.font))
          }
        };
      }else{
        _url += '/text/'+util.urlSafe(util.encode(_arr.join('\r\n')))+_urlSuffix+(element.dy);
        if(element.font){
          _url += '/font/'+util.urlSafe(util.encode(element.font))
        }
      }

      return _url;
    }else{
      _url += '/text/'+util.urlSafe(util.encode(value)) +_urlSuffix+element.dy;
      if(element.font){
        _url += '/font/'+util.urlSafe(util.encode(element.font))
      }
      return _url;
    }
  },

  touchstart: function (e) {
    this.data.touchDot = e.touches[0].pageX;
    var that = this;
    this.data.interval = setInterval(function () {
      that.data.time += 1;
    }, 100);
  },

  touchmove: function (e) {
    let touchMove = e.touches[0].pageX;
    let touchDot = this.data.touchDot;
    let time = this.data.time;

    if (touchMove - touchDot >= 40 && time < 10 && !this.data.done) {
      this.data.done = true;
      this.scrollLeft(e);
    }
  },

  touchend: function (e) {
    clearInterval(this.data.interval);
    this.data.time = 0;
    this.data.done = false;
  },

  scrollLeft: function (e) {
    // console.log("e",e);
    var questionInd = e.target.dataset.questionind;
    console.log("questionInd",questionInd);
    if (!questionInd) {
      return;
    }
    if (this.data.index == false) {
      return;
    }
    this.setData({
      index: false
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        index: true
      })
    }, 500)

    let lb = this.data.lb;
    let shift = lb.shift();
    lb.push(shift);
    if (questionInd == 1) {
      lb[lb.length - 2] = "right2";
      lb[lb.length - 1] = "right2";
    }
    // console.log("lb",lb);
    this.setData({
      lb: lb,
      showSubmit: false
    })
  },

  onShareAppMessage: function () {
    return {
      title: this.data.item.name
    }
  },
}))
