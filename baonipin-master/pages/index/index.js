//index.js
//获取应用实例
const app = getApp()
const common = require('../../common.js');
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js' 
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    style:'text', //红包类型
    array: ['30秒', '5秒', '10秒', '15秒', '20秒', '30秒', '40秒', '50秒', '60秒'],
    textList: ['请输入文字','大吉大利，今晚吃鸡', '升职加薪总经理，走上人生巅峰~', '科学研究明表汉怎字序排不也影响阅读', '生日快乐~'],
    speak:['我爱你','我喜欢你','我是逗比'],
    typeP: [
      {
        title:'拼字红包',
        typei:"text",
        red:'生成拼字红包',
        active:true
      }, {
        title: '拼图红包',
        typei: "img",
        red: '生成拼图红包',
        active: false
      }, {
        title: '口令红包',
        typei: "voice",
        red: '生成口令红包',
        active: false
      }, {
        title: '颜值红包',
        typei: "face",
        red: '生成颜值红包',
        active: false
      }
    ],
    footList:[
      {
        img:'../images/1.png',
        title:'我的记录',
        url:'../keep/keep'
      },
      {
        img: '../images/2.png',
        title: '余额提现',
        url: '../money/money'
      },
      {
        img: '../images/3.png',
        title: '常见问题',
        url: '../question/question'
      }
    ],
    index: 0,
    wenzi:0,
    shuo:0,
    word: "",
    money1: "",
    money2: "",
    num:'',
    options :false,
    speakAll:false,
    text:true, //文字
    img:false, //图片
    voice:false, //语音
    face:false,
    play:true //红包玩法
  },
  
  onLoad: function () {
    //回调
    common.getSign(function () {
      let  sign = wx.getStorageSync('sign');
      console.log('commonindexsign:', sign);
    })
  },
  onShow:function(){
    // 用户信息
    let that = this;
    let userInfo = wx.getStorageSync('userInfo');
    that.setData({
      userInfo: userInfo
    })
     //24h
    let timestamp = wx.getStorageSync('timestamp');//时间戳
    console.log("timestamp:",timestamp);
    if (!timestamp){
        wx.request({
          url: apiurl + "red/refunded?sign=" + sign + '&operator_id=' + app.data.kid,
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log("24h:", res);
            let timestamp = Date.parse(new Date());
            console.log(timestamp);
            wx.setStorageSync('timestamp', timestamp);
          }
        })
    } else { //有timestamp
      let nowtimestamp = Date.parse(new Date());
      var d = (nowtimestamp - timestamp) / 1000;
      console.log(d);
        if (d >= 86400) {
            wx.request({
              url: apiurl + "red/refunded?sign=" + sign + '&operator_id=' + app.data.kid,
              header: {
                'content-type': 'application/json'
              },
              method: "GET",
              success: function (res) {
                console.log("24h:", res);
                let timestamp = Date.parse(new Date());
                console.log(timestamp);
                wx.setStorageSync('timestamp', timestamp);
              }
            })
        }
    }
    
  },
  // 红包玩法 true拼 false普
  play(){
    this.setData({
      play: !this.data.play
    })
  },
  // 红包类型
  change(e){
    let that = this;
    let index = e.currentTarget.dataset.index;
    let typeP = that.data.typeP;
    if (index == 3){ //期待
      tips.alert("敬请期待！");
    }
    if(index==1){
      that.setData({
        text: false, //文字
        img: true, //图片
        voice: false, //语音
        face: false
      })
    } else if (index == 2){
      that.setData({
        text: false, //文字
        img: false, //图片
        voice: true, //语音
        face: false
      })
    } else if (index == 3) {
      that.setData({
        text: true, //文字
        img: false, //图片
        voice: false, //语音
        face: false
      })
    } else if (index == 0) {
      that.setData({
        text: false, //文字
        img: false, //图片
        voice: false, //语音
        face: true
      })
    }
    for (let i = 0; i < typeP.length;i++){
      typeP[i].active = false;
      if(i == index){
        typeP[i].active = true;
      }
      that.setData({
        typeP
      })
    }
  },
  // 生成红包
  formSubmit: function (e) {
    let that = this;
    let inform = {};
    let sign = wx.getStorageSync('sign');
    let style = that.data.style;//红包类型
    let form_id = e.detail.formId;//红包类型
    console.log(sign);
   
    if (!that.data.word) {
      tips.alert("您没有填写内容");
      return false;
    }
    if (!that.data.num) {
      tips.alert("您没有填写数量");
      return false;
    }
    if (!form_id) {
      tips.alert("formId错误");
      return false;
    }
    // 请求拼字红包 wenzi | content
    if (style == 'text'){
        let play = that.data.play;
        console.log("money:",that.data.money1, that.data.money2,);
        console.log("count:", that.data.num );
        console.log("content:", that.data.word);
        console.log("form_id:", e.detail.formId);
        if(play==true){
          if (!that.data.money1) {
            tips.alert("您没有填写金额");
            return false;
          }
          console.log("play拼:", play);
           inform = {
            money: that.data.money1,
            count: that.data.num,
            content: that.data.word,
            form_id: form_id + Math.random(),
            type: 'random'
          }
        }else{
          console.log("play普:", play);
          if (!that.data.money2) {
            tips.alert("您没有填写金额");
            return false;
          }
          inform = {
            money: that.data.money2 * that.data.num,
            count: that.data.num,
            content: that.data.word,
            form_id: form_id + Math.random(),
            type: 'average '
          }
        }
        wx.request({
            url: apiurl + "red/create-text-red?sign=" + sign + '&operator_id=' + app.data.kid ,
            data: inform,
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function (res) {
              console.log("拼字红包:", res);
              if (res.data.status == '1') {
                if (res.data.data.finished == false) {//余额不足 
                    let params = res.data.data.params;
                    // 调用支付
                    wx.requestPayment({
                      timeStamp: res.data.data.params.timeStamp,
                      nonceStr: res.data.data.params.nonceStr,
                      package: res.data.data.params.package,
                      signType: res.data.data.params.signType,
                      paySign: res.data.data.params.paySign,
                      'success': function (res) {
                          // 获取red_id
                        wx.request({
                          url: apiurl + "red/go-new-red-detail?sign=" + sign + '&operator_id=' + app.data.kid,
                          header: {
                            'content-type': 'application/json'
                          },
                          method: "GET",
                          success: function (res) {
                            console.log("红包详情:", res);
                            console.log(res.data.data);
                            that.setData({
                              red_id: res.data.data
                            })
                          }
                        })
                          setTimeout(function () {
                            // 微信支付成功跳转
                            wx.navigateTo({
                              url: '../inform/inform?red_id=' + that.data.red_id
                            })
                          }, 300)
                      },
                      fail: function (res) {
                        console.log(res);
                        tips.error(res.data.msg);
                      }
                    })
                }else{ 
                  tips.loading("创建成功");
                  // 余额支付成功跳转
                  wx.navigateTo({
                    url: '../inform/inform?red_id=' + res.data.data.finished
                  })
                }
                
              } else {
                tips.alert(res.data.msg)
              }
            }
        })
    }
    
  },
  //事件处理函数text
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      wenzi: e.detail.value,
      options: true
    })
  },
  //事件处理函数array
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //事件处理函数speak
  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      shuo: e.detail.value,
      speakAll: true
    })
  },
  //事件处理函数niceimg
  seeImg: function () {
    wx.navigateTo({
      url: '../niceimg/niceimg'
    })
  },
  // 文字
  word(e) {
    this.setData({
      word: e.detail.value
    })
  },
  // 单个金额
  money1(e) {
    this.setData({
      money1: e.detail.value
    })
  },
  // 总金额
  money2(e) {
    this.setData({
      money2: e.detail.value
    })
  },
  // 数量
  num(e) {
    this.setData({
      num: e.detail.value
    })
  },
  // 语音
  speakmove(e){
    this.setData({
      speakmove: e.detail.value
    })
  },
  phone:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        that.setData({
          tempFilePaths: tempFilePaths
        })
      }
    })
  },

})
