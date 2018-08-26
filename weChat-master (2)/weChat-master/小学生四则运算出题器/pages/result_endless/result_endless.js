// pages/result/result.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:[],//将以上结果合并后的结果
    haoshi:"",//耗费的时间
    num:0,//题目数量
    correct_num:0,//回答正确的数量
    comment:"",//对于这个正确率，给一个评语鼓励之类的话，或者是名人名言，对于儿童，一个漫画是更好的选择
    headImage:"",//用户头像的url
    mode:'',//用户选择的模式
    score: 0,//历史最高得分
    time: 0,//在exam模式中，规定的考试时间
    timushu:0, //在exam模式中规定的题目数量
    xishu: 0,//根据难度等级，得到得分系数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //根据难度等级，计算得分系数
    if(options.grade==='easy'){
      this.setData({xishu:1,mode:'简单'});
    } else if (options.grade === 'normal'){
      this.setData({ xishu: 2 ,mode:'一般'});
    }else{
      this.setData({ xishu: 3 ,mode:'困难'});
    }
    var that=this;
    var app = getApp();
    this.setData({ headImage: app.globalData.userInfo.avatarUrl });
    //获取用户操作的信息
    console.log(options);
    var begin_time=0;
    var end_time=Number(options.haoshi)*1000;
    this.setData({haoshi:util.calcHaoshi(begin_time,end_time)});//将耗时进行格式化，用于显示
    var timu=options.timu.split(",");
    var answer=options.answer.split(",");
    var correct_result=options.correct_result.split(",");
    var result=[];
    var obj={};
    for(var i=0;i<timu.length;i++){
      obj={timu:timu[i],answer:answer[i],correct_result:correct_result[i]};
      result.push(obj);
    }
    this.setData({result:result});
    this.setData({correct_num: this.calcCorrectNum(result)});
    this.setData({num:result.length});
    this.setData({time: options.time,timushu: options.timushu});
    var score = wx.getStorageSync('score') || 0;
    if(score<this.data.correct_num){
      wx.setStorageSync('score', this.data.correct_num);
      this.setData({ score: this.data.correct_num});
    }else {
      this.setData({ score: score });
    }
    //将本次得分上传服务器
    let cs={};
    cs['openID']=getApp().globalData.secret.openid;
    cs['score']=this.data.correct_num;
    wx.request({
      url: getApp().globalData.host + "InsertScoreszys",
      data: cs,
      method: 'POST',
      header: { 'content-type': "application/x-www-form-urlencoded" },
      success: function (e) {
        console.log(e.data);
      }
    });//end of 本次得分上传服务器
  },
  
  calcCorrectNum: function(result){
    var correct_num=0;
    for(var i=0;i<result.length;i++){
      if(result[i].answer===result[i].correct_result){
        correct_num++;
      }
    }
    return correct_num;
  },
  copytap: function(){
    //导出结果
    var res=this.data.result;
    //obj={timu:timu[i],answer:answer[i],correct_result:correct_result[i]};
    var result="题目\t答案\t正确结果\t结论";
    var t="";
    for(var i=0;i<res.length;i++){
      if(res[i].answer===res[i].correct_result){
        t="正确";
      }else{
        t="错误";
      }
      result=result+"\n"+res[i].timu+"="+"\t"+res[i].answer+"\t"+res[i].correct_result+"\t"+t;
    }
    wx.setClipboardData({
      data: result,
      success: function(res){
        wx.showModal({
          title: '复制成功',
          content: '已复制，请打开记事本或Excel完成粘贴',
          showCancel: false,
          confirmText: '知道了',
          confirmColor: '#349023'
        });
      },
      fail: function(res){
        console.log(res);
        wx.showModal({
          title: '复制失败',
          content: '没有完成复制',
          showCancel: false,
          confirmText: '知道了',
          confirmColor: '#349023'
        });
      }
    });
  },
  sharetap: function(){

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var score = wx.getStorageSync('score') || 0;
    
      return{
        title: '我在无尽模式中的最高得分是'+score+'分，敢来挑战吗？',
        path : '/pages/index/index'
      }
  }
})