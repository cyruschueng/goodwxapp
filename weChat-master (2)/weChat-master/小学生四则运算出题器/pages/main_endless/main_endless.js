var util = require('../../utils/util.js');
var id = 0;
Page({
  data: {
    yunsuanshu: 0,//参与运算的数字个数
    weishu: 0,//参与运算的数字位数
    yunsuanfu: [],//参与运算的运算符，这是个数组
    xioashuwei: 0,//结果的保留的位数
    bt_text: "下一题",
    biaodashi: "",
    timu: [],//题干
    answer: [],//用户输入结果
    correct_result: [],//正确结果
    input: "",//用户输入的答案
    focus: true,//输入框获得焦点
    yongshi: 0,//当前用时
    score: 0,//当前得分
    grade: '',//当前的难度等级
    xishu: 0,//得分系数
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
    //根据难度等级，计算得分系数
    if (option.grade === 'easy') {
      this.setData({ xishu: 1 });
    } else if (option.grade === 'normal') {
      this.setData({ xishu: 2 });
    } else {
      this.setData({ xishu: 3 });
    }
    var that = this;
    var t = 0;
    id = setInterval(function () {
      that.setData({ yongshi: that.data.yongshi+1 });
    }, 1000);
    this.setData({
      yunsuanshu: option.yunsuanshu,
      weishu: option.weishu,
      yunsuanfu: option.yunsuanfu.split(","),
      xiaoshuwei: option.xiaoshuwei,
      grade: option.grade
    });
    var result = util.getBiaodashi(this.data.yunsuanshu, this.data.yunsuanfu, this.data.weishu, this.data.timu, this.data.correct_result, this.data.xiaoshuwei);//return {correct_result: correct_result,biaodashi: biaodashi, timu: timu}
    this.setData({ correct_result: result.correct_result, biaodashi: result.biaodashi, timu: result.timu });
  },
  nextTap: function () {
    //下一题。判断上一题是否答对，答对则继续出题，打错则查看结果
    var ans = this.data.answer;
    ans.push(this.data.input);
    this.setData({ answer: ans });
    
    var timu = this.data.timu;
    var lastTimu = timu[timu.length - 1];//取出最后一道题
    var lastAnswer = util.calCommonExp(lastTimu.slice(0, -1));
    if (Number(this.data.input) !== lastAnswer) {
      //如果用户输入的答案和正确的答案不同，这就是最后一题了
      //同时更新好最高成绩
      clearInterval(id);
      var tm = util.simplyBiaodashi(this.data.timu);//将this.data.timu中的等号取消掉，否则传参数的时候，会有bug
      var url = '/pages/result_endless/result_endless?timu=' + tm + "&answer=" + this.data.answer + "&correct_result=" + this.data.correct_result + "&haoshi=" + this.data.yongshi + "&grade=" + this.data.grade;
      wx.redirectTo({
        url: url
      });
    } else {
      this.setData({ input: '', focus: true });//清空，还原
      this.setData({ score: this.data.score+1 });//得分加1
      //继续出题
      var result = util.getBiaodashi(this.data.yunsuanshu, this.data.yunsuanfu, this.data.weishu, this.data.timu, this.data.correct_result, this.data.xiaoshuwei);//return {correct_result: correct_result,biaodashi: biaodashi, timu: timu}
      this.setData({ correct_result: result.correct_result, biaodashi: result.biaodashi, timu: result.timu });
    }
  }
}
)