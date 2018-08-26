var util = require('../../utils/util.js');
var id = 0;
var num = 0;//剩余题目数量

Page({
  data: {
    yunsuanshu: 0,//参与运算的数字个数
    weishu: 0,//参与运算的数字位数
    yunsuanfu: [],//参与运算的运算符，这是个数组
    originalTimushu: 0,//原始的题目数
    timushu: 1,//题目数量
    xioashuwei: 0,//结果的保留的位数
    bt_text: "下一题",
    biaodashi: "",
    timu: [],//题干
    answer: [],//用户输入结果
    correct_result: [],//正确结果
    input: "",//用户输入的答案
    focus: true,//输入框获得焦点
    begin_time: 0,//记录开始时间
    time: 0,//初始的时间，即选定的考试时间
    daojishi: 0,//倒计时，即在页面上展示的时间
    isAuthority: getApp().globalData.authority
  },


  answer_input: function (e) {
    //用户输入时，记录输入内容
    var input = e.detail.value;
    this.setData({ input: input });
  },
  onUnload: function(e){
    clearInterval(id);
  },
  onLoad: function (option) {
    this.setData({
      yunsuanshu: option.yunsuanshu,
      weishu: option.weishu,
      yunsuanfu: option.yunsuanfu.split(","),
      timushu: option.timushu,
      originalTimushu: option.timushu,
      xiaoshuwei: option.xiaoshuwei,
      begin_time: new Date().getTime(),
      time: Number(option.time)//设置的考试时长
    });
    num = option.timushu;//剩余题目数量
    var that = this;
    var t = Number(option.time);//设置的考试时长
    console.log(option);
    id = setInterval(function () {
      t--;
      
      that.setData({ daojishi: t });
      if (t <= 0) {
        //应该停止运算了，时间到了
        clearInterval(id);
        wx.showModal({
          title: '时间到了',
          content: '时间到，点击确定查看结果',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              var tm = util.simplyBiaodashi(that.data.timu);//将this.data.timu中的等号取消掉，否则传参数的时候，会有bug
              wx.redirectTo({
                url: '/pages/result_exam/result_exam?timu=' + tm + "&answer=" + that.data.answer + "&correct_result=" + that.data.correct_result + "&time=" + that.data.time + "&timushu=" + that.data.originalTimushu + "&haoshi=" + that.data.time * 1000//haoshi是实际用时，因为时间到，因此实际用时与考试的规定时间是一致的。
              });
            }
          }
        });
      }
    }, 1000);

    //初始化题目
    var result = util.getBiaodashi(this.data.yunsuanshu, this.data.yunsuanfu, this.data.weishu, this.data.timu, this.data.correct_result, this.data.xiaoshuwei);//return {correct_result: correct_result,biaodashi: biaodashi, timu: timu}
    this.setData({ correct_result: result.correct_result, biaodashi: result.biaodashi, timu: result.timu });
    num--;//第一道题出完，因此num--
  },
  nextTap: function () {
    //下一题
    /*
    剩余题目数-1;
    记录用户输入的答案;
    判断是否应该更改按钮的提示文字了
    判断是否该跳转到结果报告了
     */
    var ans = this.data.answer;
    ans.push(this.data.input);
    this.setData({ answer: ans });
    if (num == 0) {
      clearInterval(id);
      //页面跳转查看结果
      var haoshi = new Date().getTime() - this.data.begin_time;
      var tm = util.simplyBiaodashi(this.data.timu);//将this.data.timu中的等号取消掉，否则传参数的时候，会有bug
      var url = '/pages/result_exam/result_exam?timu=' + tm + "&answer=" + this.data.answer + "&correct_result=" + this.data.correct_result + "&time=" + this.data.time + "&timushu=" + this.data.originalTimushu + "&haoshi=" + haoshi;
      console.log(url);
      wx.redirectTo({
        url: url
      });
    } else {
      this.setData({ input: '', focus: true });//清空，还原
      this.setData({ timushu: num });
      var result = util.getBiaodashi(this.data.yunsuanshu, this.data.yunsuanfu, this.data.weishu, this.data.timu, this.data.correct_result, this.data.xiaoshuwei);//return {correct_result: correct_result,biaodashi: biaodashi, timu: timu}
      this.setData({ correct_result: result.correct_result, biaodashi: result.biaodashi, timu: result.timu });
      num--;//出完一道题，num--
    }
    if (num == 0) {
      //最后一题
      this.setData({ bt_text: "完成，查看结果" });
    }
  }
}
)