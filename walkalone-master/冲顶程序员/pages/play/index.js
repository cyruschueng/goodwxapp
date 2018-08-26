// pages/play/index.js
var WxParse = require('../../wxParse/wxParse.js');
var lighter = require('../../utils/code-lighter.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalTime:60,     //总计时间  一个常量
    remains: 60,      //答题保留时间
    count: 0,         // 设置 计数器 初始为0
    countTimer: null,  // 设置 定时器 初始为null
    freq:100,           //绘制频率 ms
    arcWidth:3,         //圆环宽度
    arcPointX:25,          //圆环中心x坐标 相对于canvas容器
    arcPointY: 25,           //圆环中心y坐标 相对于canvas容器
    arcRadius:20,          //圆环半径
    questions:[],         //全部问题数据
    index:0,              //当前问题索引
    status:0,             //是否已经作答 1 已作答 0 未作答
    showFailPanel:0,      //回答失败弹窗
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log('onLoad');
    var that = this;
    wx.request({
      url: app.globalData.apiDomain + '/question/index',
      data: {'token': wx.getStorageSync('token') },
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      dataType: 'json',
      success:function(res){
        that.setData({'questions':res.data.msg});
        var _index = that.data.index;
        var code = res.data.msg[_index].question;
        //console.log(code)
        var _code = lighter.code({
          target: code,
          language: 'php',
          style: 'light'
        });
        var _parese = _code.on();
        //console.log(article)
        WxParse.wxParse('wxParseData', 'html', _parese, that, 5)     //'wxParseData'为绑定数据键名
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //console.log('onReady');
    //this.drawProgressbg()
    //this.drawCircle(1)
    this.countInterval()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //console.log('onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //console.log('onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   * 关闭计时器
   */
  onUnload: function () {
    clearInterval(this.data.countTimer);
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //绘制圆
  drawProgressbg: function () {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(4);// 设置圆环的宽度
    ctx.setStrokeStyle('#20183b'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath();//开始一个新的路径
    ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  //绘制圆环
  drawCircle: function (step) {
    var context = wx.createCanvasContext('canvasProgress');
    // 设置渐变
    var gradient = context.createLinearGradient(200, 100, 100, 200);
    gradient.addColorStop("0", "#2661DD");
    //gradient.addColorStop("0.5", "#40ED94");
    //gradient.addColorStop("1.0", "#5956CC");
    context.setLineWidth(this.data.arcWidth);
    context.setStrokeStyle(gradient);
    context.setLineCap('round')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(this.data.arcPointX, this.data.arcPointY, this.data.arcRadius, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  },
  //倒计时
  countInterval: function () {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    this.data.countTimer = setInterval(() => {
      var _count = this.data.count
      var _max = parseInt(this.data.totalTime * 1000 / this.data.freq)
      if (_count <= _max) {
        /* 绘制彩色圆环进度条 
        注意此处 传参 step 取值范围是0到2，
        所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
        */
        this.drawCircle(_count / (_max / 2))
        _count++;
        this.setData({'count':_count})
      } else {
        clearInterval(this.data.countTimer);
        this.setData({ 'showFailPanel': 1 })
      }
      var _spent_time = parseInt(_count * this.data.freq/1000) //花费时间 s
      var _remains_time = this.data.totalTime - _spent_time       
      this.setData({
        remains: _remains_time
      })
    }, this.data.freq)
  },
  
  //选择答案
  choose_answer:function(e){
    
    var that = this;
    var _status = this.data.status;             //作答状态
    if(_status == 0){
      var _answer_index = e.currentTarget.id;    //选择答案在当前面板的序号
      var _question_index = this.data.index;      //当前问题序号
      var questions = this.data.questions;
      
      var _answers = questions[_question_index].answers; //当前问题所有答案
      var _answer = _answers[_answer_index];            //所选中的答案内容
      if(_answer.is_true == 1){
        //回答正确
        _answer.flag = 'correct';
        setTimeout(() => {
          this.goNext(_question_index);
        }, 600);
        
      } else {
        _answer.flag = 'error';
        //回答错误 显示正确答案
        for (var i in _answers){
          if(_answers[i].is_true == 1){
            _answers[i].flag = 'correct';
          }
        }
        //
        setTimeout(()=>{
          that.setData({'showFailPanel':1})
        },600);
      }
      clearInterval(this.data.countTimer);
      this.setData({ 'questions': questions, 'status': 1 });
    }
  },
  //取消弹窗
  cancelShowFail: function () {
    /*this.setData({
      'showFailPanel': false
    })*/
  },
  //回答正确 下一题
  goNext:function(index){
      //初始化变量
    this.setData({ 'index': index + 1, 'status': 0, 'count': 0, 'remains': 60, 'showFailPanel':0})
      var code = this.data.questions[index+1].question;
      //console.log(code)
      var _code = lighter.code({
        target: code,
        language: 'php',
        style: 'light'
      });
      console.log(_code)
      var _parese = _code.on();
      //console.log(_parese)
      WxParse.wxParse('wxParseData', 'html', _parese, this, 5)     //'wxParseData'为绑定数据键名
      this.countInterval()
  },
  //重新开始
  restart:function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  //使用复活卡
  usecard:function(){
    var that = this;
    
  }
})