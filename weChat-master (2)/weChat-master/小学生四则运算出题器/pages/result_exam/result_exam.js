// pages/result/result.js
var util=require('../../utils/util.js');
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
    timushu:0 //在exam模式中规定的题目数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var app=getApp();
    console.log(app.globalData);
    this.setData({headImage: app.globalData.userInfo.avatarUrl});
    
    //获取用户操作的信息
    console.log(options);
    var end_time=options.haoshi;
    this.setData({haoshi:util.calcHaoshi(0,end_time)});//将耗时进行格式化，用于显示
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
    this.setData({time: util.calcHaoshi(0,Number(options.time)*1000),timushu: options.timushu});
    var score = wx.getStorageSync('score') || 0;
    if(score<this.data.correct_num){
      wx.setStorageSync('score', this.data.correct_num);
      this.setData({ score: this.data.correct_num});
    }else {
      this.setData({ score: score });
    }

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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var mode=this.data.mode;
    var score = wx.getStorageSync('score') || 0;
      return {
        title :'我的本次考试中的'+this.data.num+'题中做对了'+this.data.correct_num+'题',
        path: '/pages/index/index'
      }
  }
})