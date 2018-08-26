// pages/subject/subject.js
var tunji = require('../../utils/tunji.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,    //下一题按钮
    setOver: 'true',    //答题是否结束,是否显示二维码
    //show_arrow: true    //弹窗显示
    idArr:[],
    click:false, //点击次数
    setting:false, //点击3次可编辑
    question_type:'system',
    selftitle:false,
    text1:false,
    text2: false,
    text3: false,
    background: wx.getStorageSync('background'),
    backgroundColor: wx.getStorageSync('bgColor'),
    border: wx.getStorageSync('border'),
    color: wx.getStorageSync('color'),
    sex: wx.getStorageSync('sex'), //1 男 2女
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: wx.getStorageSync('bgColor'),
    })
    // 统计
    tunji.statistic();
    tunji.fromPageData();
    tunji.userEvent();
    
    var that = this;
    // var set_number = options.set_number;
    // var pageSharecode = options.pageSharecode;

    // that.setData({
    //   set_number: set_number,
    //   pageSharecode: pageSharecode
    // });  

    wx.hideShareMenu();
  },

  onShow: function () {
    console.log('set_number:', wx.getStorageSync('set_number'), 'uid:',wx.getStorageSync('uid'));
    var that = this;
    that.setData({
      background: wx.getStorageSync('background'),
      backgroundColor: wx.getStorageSync('bgColor'),
      border: wx.getStorageSync('border'),
      userImg: wx.getStorageSync('userImg'),
      userIcon: wx.getStorageSync('userIcon'),
      color: wx.getStorageSync('color'),
      sex: wx.getStorageSync('sex')//"sex":1,//1 男 2女
    })
    app.getUserInfo(function(){  
      var avatar = wx.getStorageSync("avatarUrl");
      var nickname = wx.getStorageSync("nickName");
      var sign = app.data.sign;
      var set_number;


      // // 生成无限制二维码按钮
      // wx.request({
      //   url: 'https://friend-check.playonwechat.com/api/show-model?sign=' + sign,
      //   success: function (res) {
      //     wx.hideLoading();
      //     console.log(res);
      //     var showModel = res.data.data.showModel;

      //     that.setData({
      //       showModel: showModel
      //     })
      //   }
      // })

      that.setData({
        avatar: avatar,
        nickname: nickname,
        disabled: false
      })

console.log("sign",sign);
     // 是否答题完成
      wx.request({
        url: app.data.apiurl +'api/change-question' + '?operator_id=' + wx.getStorageSync("operator_id"),
        data: {
          sign: sign,
          question_type: 'system'
        },
        success: function (res) {
          console.log("问题", res);
          var question = res.data.question;
          console.log("问题", question);
          var arr = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
          if (question.index > 10) {
            that.setData({
              setOver: 'false'
            })
          }else{
            that.setData({
              setOver: 'true'
            })
          }

          question.index = question.index - 1;
          var title = arr[question.index];
          var answer_arr = [
            { 'option': 'a', 'check': false, 'text': question.option_a }, 
            { 'option': 'b', 'check': false, 'text': question.option_b }];
          if (question.option_c) {
            var c = { 'option': 'c', "check": false, "text": question.option_c }
            answer_arr.push(c);
          }
          question = question;

          that.setData({
            question: question,
            answer_arr: answer_arr,
            qid: question.qid,
            title: title
          })
        }
      })
      // 是否允许用户编辑
      wx.request({
        url: app.data.apiurl + "api/change-v?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("operator_id"),
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("是否允许用户编辑:", res);
          var status = res.data.status;
          if (status == 1) {
            that.setData({
              flag: res.data.flag
            })
          } else {
            console.log(res.data.msg)
          }
          wx.hideLoading()
        }
      })
    })

},

// 下一题
  nextSubject: function(e){
    var that = this;  
    //设置不能编辑 

    that.setData({
      click:true,
      setting:false,
      inputSet:false
    })


    var disabled = that.data.disabled;
    var sign = app.data.sign;
    var service = that.data.service;
    if(disabled){

      var _formId = e.detail.formId;
      var idArr = that.data.idArr;
      var _idArr = wx.getStorageSync("idArr");
      if (_idArr && _idArr.length != 0) {
        _idArr.push(_formId);
        idArr = _idArr;
        wx.setStorageSync("idArr", idArr);
      } else {
        idArr.push(_formId);
        wx.setStorageSync("idArr", idArr);
      }

      var option = that.data.option;
      var qid = that.data.qid;
      var question = that.data.question;
      var answer_arr = that.data.answer_arr;
      // question = question;
      // 如果是system
      if (that.data.question_type =='system'){
          var data={
            sign: wx.getStorageSync('sign'),
            option: option,
            qid: that.data.qid,
            question_type: that.data.question_type// 'system' 
          }
      } else if (that.data.question_type == 'diy'){// 如果是diy
        if (question.option_c) {
          if (answer_arr[0].text){

          }
          var _diy_question = {
            'title': question.title, 'option': { 'a': answer_arr[0].text, 'b': answer_arr[1].text, 'c': answer_arr[2].text}
          }
        } else {
          var _diy_question = {
            'title': question.title, 'option': { 'a': answer_arr[0].text, 'b': answer_arr[1].text}
          }
        }
        console.log("_diy_question:",_diy_question)
        var data = {
          sign: wx.getStorageSync('sign'),
          option: option,
          qid: that.data.qid,
          question_type: that.data.question_type,// 'diy'
          diy_question: _diy_question
        }
      }
      // console.log('下一题', app.data.apiurl + 'api/change-question' + '?operator_id=' + wx.getStorageSync("operator_id") + '&sign=' + wx.getStorageSync('sign') + '&option=' + option + '&qid=' + qid + '&question_type=' + that.data.question_type + '&diy_question=' + _diy_question)
      console.log()
      wx.request({
        url: app.data.apiurl +'api/change-question' + '?operator_id=' + wx.getStorageSync("operator_id"),
        data: data,
        success: function (res) {
          console.log("下一题", res); 
          let status = res.data.status;
          if (status==0){
            wx.showToast({
              title: res.data.msg,
            })
            return;
          }         
          var question = res.data.question;
          var set_number = question.set_number;
          wx.setStorageSync('set_number', set_number);
          console.log(question.index);
          that.setData({
            set_number: set_number,
            question_type: 'system',
            selftitle: '',
            text1: '',
            text2: '',
            text3: ''
          })
          if(question.index == 11){
            wx.request({
              url: 'https://friend-check.playonwechat.com/api/save-form-ids',
              data: {
                sign: sign,
                form_ids: JSON.stringify(idArr)
              },
              success: function (res) {
                if (res.data.status) {
                  wx.removeStorageSync("idArr");
                }
                
              }
            })    
          }
          if(question.index > 10){     
               
            that.setData({
              setOver: 'false'
            })
            wx.setStorageSync("set_number", set_number);
          }

          var arr = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
          question.index = question.index - 1;
          var title = arr[question.index];

          var answer_arr = [{ 'option': 'a', 'check': false, 'text': question.option_a }, { 'option': 'b','check': false, 'text': question.option_b }];
          if (question.option_c) {
            var c = { 'option': 'c', "check": false, "text": question.option_c }
            answer_arr.push(c);
          }
          question = question;

          that.setData({
            question: question,
            answer_arr: answer_arr,
            qid: question.qid,
            disabled: false,
            title: title
          })
        }
      })
    }else{
      // wx.showModal({
      //   content: "必须要选择答案才能进行下一题哦",
      //   showCancel:false,
      //   success:function(res){
      //     if(res.confirm){
      //       console.log("用户点击了确定");
      //     }
      //   }
      // })
      that.setData({
        zindex:true
      })
    }
       
  },
  // 确定
  // 取消
  catale() {
    this.setData({
      zindex: false
    })
  },
  // 隐藏箭头弹层
  hidden_arrow:function(){
    this.setData({
      show_arrow: true
    })
  },
  //保存
  baocun(){
    console.log('sfdssafsretesrttyg')
    let that = this;
    let question = that.data.question;
    that.setData({
      inputSet: false,
      question_type: 'diy'
    })
    var arr = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
    var title = arr[question.index];
    question.index = question.index;
    if (that.data.selftitle){
      question.title = that.data.selftitle;
    }
  
    let answer_arr = [
      { 'option': 'a', 'check': false, 'text': question.option_a },
      { 'option': 'b', 'check': false, 'text': question.option_b }];
    if (question.option_c) {
      var c = { 'option': 'c', "check": false, "text": question.option_c }
      answer_arr.push(c);
    }
    if (title.length<1){
      wx.showToast({
        title: '题目不能为空',
        icon: 'none'
      })
      return;
    }
    console.log('answer_arr:', answer_arr);
    // console.log('length:', answer_arr.length);
    // if (answer_arr.length == 2) {
    //   for (var i = 0; i < answer_arr.length; i++) {
    //     if (answer_arr[i].text.length < 1) {
    //       console.log(answer_arr[i].text.length,'length')
    //       wx.showToast({
    //         title: '选项不能为空',
    //         icon: 'none'
    //       })
    //       return;
    //     }
    //   }
    // } else if (answer_arr.length == 3) {
    //   for (var j = 0; j < answer_arr.length; j++) {
    //     if (answer_arr[j].text.length < 1) {
    //       console.log(answer_arr[j].text, 'length')
    //       console.log(answer_arr[j].text.length, 'length')
    //       wx.showToast({
    //         title: '选项不能为空',
    //         icon: 'none'
    //       })
    //       return;
    //     }
    //   }
    // }
    // 1111  2222
    if (that.data.text1 && !that.data.text2){
      console.log(11111)
      if (answer_arr.length == 3){
        answer_arr = [
          { 'option': 'a', 'check': false, 'text': that.data.text1 },
          { 'option': 'b', 'check': false, 'text': question.option_b },
          { 'option': 'c', "check": false, "text": question.option_c }
        ];
      }else{
        answer_arr = [
          { 'option': 'a', 'check': false, 'text': that.data.text1 },
          { 'option': 'b', 'check': false, 'text': question.option_b }
        ];
      }
    } 
    if (that.data.text2 && !that.data.text1) {
      console.log(22222)
      if (answer_arr.length == 3) {
        answer_arr = [
          { 'option': 'a', 'check': false, 'text': question.option_a},
          { 'option': 'b', 'check': false, 'text': that.data.text2},
          { 'option': 'c', "check": false, "text": question.option_c }
        ];
      } else {
        answer_arr = [
          { 'option': 'a', 'check': false, 'text': that.data.text1 },
          { 'option': 'b', 'check': false, 'text': question.option_b }
        ];
      }
    } 
    if (that.data.text1 && that.data.text2){
      console.log(2222)
      if (answer_arr.length == 3) {
        answer_arr = [
          { 'option': 'a', 'check': false, 'text': that.data.text1 },
          { 'option': 'b', 'check': false, 'text': that.data.text2 },
          { 'option': 'c', "check": false, "text": question.option_c }
        ];
      } else {
        answer_arr = [
          { 'option': 'a', 'check': false, 'text': that.data.text1 },
          { 'option': 'b', 'check': false, 'text': that.data.text2 }
        ];
      }
       
    } 
    //3333
    if (!that.data.text1 && that.data.text2 && that.data.text3) {
      console.log(2222)
      if (answer_arr.length == 3) {
        answer_arr = [
          { 'option': 'a', 'check': false, 'text': question.option_a},
          { 'option': 'b', 'check': false, 'text': that.data.text2 },
          { 'option': 'c', "check": false, "text": that.data.text3 }
        ];
      } else {
        answer_arr = [
          { 'option': 'a', 'check': false, 'text': question.option_a },
          { 'option': 'b', 'check': false, 'text': that.data.text2 }
        ];
      }
    } 
    if (that.data.text1 && !that.data.text2 && that.data.text3) {
      console.log(2222)
      if (answer_arr.length == 3) {
        answer_arr = [
          { 'option': 'a', 'check': false, 'text': that.data.text1},
          { 'option': 'b', 'check': false, 'text': question.option_b},
          { 'option': 'c', "check": false, "text": that.data.text3}
        ];
      } else {
        answer_arr = [
          { 'option': 'a', 'check': false, 'text': that.data.text1 },
          { 'option': 'b', 'check': false, 'text': question.option_b }
        ];
      }
    } 
    if (!that.data.text1 && !that.data.text2 && that.data.text3) {
      console.log(11111)
      answer_arr = [
          { 'option': 'a', 'check': false, 'text': question.option_a},
          { 'option': 'b', 'check': false, 'text': question.option_b },
          { 'option': 'c', "check": false, "text": that.data.text3 }
        ];
    } 
    if (that.data.text1 && that.data.text2 && that.data.text3){
      console.log(3333)
      answer_arr = [
        { 'option': 'a', 'check': false, 'text': that.data.text1 },
        { 'option': 'b', 'check': false, 'text': that.data.text2 },
        { 'option': 'c', "check": false, "text": that.data.text3 }
      ];
    }
    if (!that.data.text1 && !that.data.text2 && !that.data.text3) {
      answer_arr
    }
    

    
    var selftitle = that.data.selftitle;
    question = question;
    console.log("question:", question);
    console.log("answer_arr:", answer_arr);
    that.setData({
      question: question,
      answer_arr: answer_arr,
      title: title
    })
  },
  titleInput(e){
    console.log('selftitle:', e.detail.value);
    let selftitle = e.detail.value;
    this.setData({
      selftitle:selftitle
    })
  },
  textInput0(e) {
    console.log('text1:', e.detail.value);
    let text1 = e.detail.value;
    this.setData({
      text1: e.detail.value
    })
  },
  textInput1(e) {
    console.log('text2:', e.detail.value);
    let text2 = e.detail.value;
    this.setData({
      text2: e.detail.value
    })
  },
  textInput2(e) {
    console.log('text3:', e.detail.value);
    let text3 = e.detail.value;
    this.setData({
      text3: e.detail.value
    })
  },
  // 编辑完成
  finish(){
    let that = this;
    let question = that.data.question;
    that.setData({
      inputSet: false,
      question_type:'diy'
    })
    var arr = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
    var title = arr[question.index];
    question.index = question.index - 1;
    question.title = that.data.selftitle;
    var selftitle = that.data.selftitle;
    var answer_arr = [
      { 'option': 'a', 'check': false, 'text': that.data.text1 },
      { 'option': 'b', 'check': false, 'text': that.data.text2 }];
    if (that.data.text3) {
      var c = { 'option': 'c', "check": false, "text": that.data.text3}
      answer_arr.push(c);
    }
    question = question;

    that.setData({
      question: question,
      answer_arr: answer_arr,
      title: title
    })
  },
  // 自己编辑
  bianji(){
    console.log('bianji');
    let that = this;
    that.setData({
      setting: false,
      inputSet:true
    })
  },
  // baocun(){
  //   console.log('baocun');
  //   let that = this;

  //   wx.showToast({
  //     title: '保存成功',
  //   })
  // },
  // 换一题事件
  changeSubject:function(){
    var that = this;
    var sign = app.data.sign;
    let click = that.data.click;
    that.setData({
      question_type: 'system',
      selftitle: '',
      text1: '',
      text2: '',
      text3: ''
    })
    console.log(that.data.click);
    if (click == false){
      wx.showToast({
        title: '可任意编辑题目',
        icon: 'success',
        duration: 3000
      })
      that.setData({
        setting:true,
        click:true
      })
    }else{
      that.setData({
        setting: true,
        click: true
      })
    }
    console.log('换一题', app.data.apiurl + 'api/change-question' + '?operator_id=' + wx.getStorageSync("operator_id") + '&sign=' + sign +'&question_type=system')
    wx.request({
      url: app.data.apiurl + 'api/change-question' + '?operator_id=' + wx.getStorageSync("operator_id"),
      data: {
        sign: sign,
        question_type:'system'
      },
      success: function (res) {

        var question = res.data.question;
        var arr = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
        question.index = question.index - 1;
        var title = arr[question.index];

        var answer_arr = [{ 'option': 'a', 'check': false, 'text': question.option_a }, { 'option': 'b', 'check': false, 'text': question.option_b }];
        if (question.option_c) {
          var c = { 'option': 'c', "check": false, "text": question.option_c }
          answer_arr.push(c);
        }
        question = question;

        that.setData({
          question: question,
          answer_arr: answer_arr,
          qid: question.qid,
          disabled: false
        })
      }
    })
    
  },
  // 选择答案
  choose: function(e){
   var idx = e.currentTarget.dataset.idx;
   var option = e.currentTarget.dataset.option;
   console.log(this.data.answer_arr);
   var array = this.data.answer_arr;
   for(var i=0;i<array.length;i++){
     array[i].check = false;
     array[idx].check = true;  
   }
   this.setData({
     answer_arr: array,
     disabled: true,
     option: option
   })
  },


  // 点击二维码
  shareImg:function(){
    var share_img = wx.getStorageSync("share_img");
    var sign = app.data.sign;
    var set_number = wx.getStorageSync("set_number");
    wx.showLoading({
      title: '海报生成中',
    })
    wx.request({
      url: app.data.apiurl+'api/save-user-question',
      data: {
        sign: sign
      },
      success: function (res) {
        console.log(app.data.apiurl + 'api/create-qrcode-picture' + '?operator_id=' + wx.getStorageSync("operator_id") + '&sign=' + sign + '&set_number=' + set_number)
        set_number = res.data.set_number;
        console.log(set_number);
        wx.request({
          url: app.data.apiurl + 'api/create-qrcode-picture' + '?operator_id=' + wx.getStorageSync("operator_id"),
          data: {
            sign: sign,
            set_number: set_number
          },
          success: function (res) {
            console.log(res);
            wx.hideLoading();
            if(res.data.data.upper_limit){
              // wx.showToast({
              //   title: '今天获取二维码的名额抢完啦，明天请赶早哟~',
              // })
              wx.showModal({
                content: '今天获取二维码的名额抢完啦，明天请赶早哟~',
                showCancel: false
              })
            }else{
              wx.previewImage({
                current: 'res.data.data.url', // 当前显示图片的http链接
                urls: [res.data.data.url] // 需要预览的图片http链接列表
              })
              
            }
            
          }
        })
      }
    })
    
  },
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var uid = wx.getStorageSync("uid");
    var set_number = wx.getStorageSync("set_number");
    console.log("用户分享",uid,set_number);
    console.log('set_number:', wx.getStorageSync('set_number'), 'uid:', wx.getStorageSync('uid'));
    return {
      title: '' + wx.getStorageSync("nickName")+'邀请你参加默契检测，不服来战！',
      path: '/pages/begin_answer/begin_answer?uid=' + uid + "&set_number=" + set_number + "&sex=" + that.data.sex,
      success: function (res) {
        console.log("转发成功");
      }
    }
  },


  // 转发前保存题目信息
  share: function () {
    var sign = app.data.sign;
    wx.request({
      url: app.data.apiurl +'api/save-user-question',
      data: {
        sign: sign
      },
      success: function (res) {}
    })
  },
  // 重新出题
  newObject: function () {
    var sign = app.data.sign;
    wx.removeStorageSync("set_number")
    wx.request({
      url: 'https://friend-check.playonwechat.com/api/requestion',
      data: {
        sign: sign
      },
      success: function (res) {
        if (res.data.status == 1) {
          wx.switchTab({
            url: '../before/before',
          })
        }
      }
    })
  },

  // 返回首页
  backHome: function () {
    wx.switchTab({
      url: '../before/before'
    })
  },

  previewHpl(){
    // https://qncdn.playonwechat.com//moqimoqi-hpl.png
    wx.previewImage({
      current:"https://qncdn.playonwechat.com/moqi/hpl_erwei.jpg",
      urls: ["https://qncdn.playonwechat.com/moqi/hpl_erwei.jpg"]
    })

  },

  // 跳转语录范
  // toYlf:function(){
  //   if (wx.navigateToMiniProgram) {
  //     wx.navigateToMiniProgram({
  //       appId: 'wx22c7c27ae08bb935',
  //       path: 'pages/index/index?codeId=huangrenzhen_3',
  //       extraData: {
  //       },
  //       envVersion: 'release',
  //       success(res) {
  //         // 打开成功
  //         console.log("成功", res);
  //       },
  //       fail:function(res){
  //         console.log("失败",res);
  //       }
  //     })
  //   } else {
  //     // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
  //     wx.showModal({
  //       title: '提示',
  //       content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
  //     })
  //   }
   
  // }
})