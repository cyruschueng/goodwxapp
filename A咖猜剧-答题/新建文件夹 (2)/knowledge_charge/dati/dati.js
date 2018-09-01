
// 获取全局应用程序实例对象
const app = getApp();
let interval;
let varName;
let ctx = wx.createCanvasContext('canvasArcCir');
let totaltime = 0;


import http from '../../js/request'


// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "dati",
  /**
   * 页面的初始数据
   */

  data: {
    avatarUrl: '',
    progressTime: 10,
    questionList: [],
    questionIndex: 0,
    currentContent: '',
    currentOptionList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    this.drawCircleBg();
    wx.showLoading({
      title: '载入中...',
      mask: true,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.setData({avatarUrl: app.globalData.userInfo.photourl})
    let questionList = [];
    http.get('Qlist').then((res) =>{
      console.log(res)
      for (let i = 0; i < res.$qlist.length; i++) {
        questionList.push(res.$qlist[i]);
      }
      wx.hideLoading();
      this.setData({questionList: questionList});
      this.questionInit();
      this.drawCircle();
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },


  //以下为自定义点击事件
  selectOption(e) {
    let selectedOption = e.target.dataset.option;
    //console.log('selectedOption: ', selectedOption);
    if (selectedOption === this.data.questionList[this.data.questionIndex].answer){
      // 回答正确
      clearInterval(varName);
      this.calculationTime();
      wx.showModal({
        content: '回答正确',
        showCancel: false,
        confirmText: '下一题',
        success: () => {
          this.changeQuestion();
          this.drawCircle();
        },
      });
    } else {
      // 回答错误
      console.log('wrong');
      clearInterval(varName);
      this.calculationTime();
      wx.showToast({
        title: '回答错误',
        image: '../../images/叉.png',
        duration: 1500,
        mask: true,
        success: () => {
          setTimeout(this.fail, 1500); 
        }
      })
    }
  },

  //倒计时控制函数
  drawCircleBg() {
    // 绘制倒计时背景
    var cxt_arc = wx.createCanvasContext('canvasCircle');
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#fdf139');
    cxt_arc.setLineCap('round');
    cxt_arc.beginPath();
    cxt_arc.arc(35, 35, 29, 0, 2 * Math.PI, false);
    cxt_arc.stroke();
    cxt_arc.draw();
  },
  drawCircle() {
    //开始倒计时
    clearInterval(varName);
    function drawArc(s, e) {
      ctx.setFillStyle('white');
      ctx.clearRect(0, 0, 200, 200);
      ctx.draw();
      var x = 35, y = 35, radius = 29;
      ctx.setLineWidth(6);
      ctx.setStrokeStyle('#eaeaea');
      ctx.setLineCap('round');
      ctx.beginPath();
      ctx.arc(x, y, radius, s, e, true);
      ctx.stroke()
      ctx.draw()
    }
    let that = this;
    var step = 1, startAngle = 1.5 * Math.PI, endAngle = 0;
    var animation_interval = 100, n = 100;
    var animation = function () {
      if (step <= n) {
        that.setData({progressTime: 10 - parseInt(step/10)});
        endAngle = 1.5 * Math.PI -  ( step * 2 * Math.PI / n );
        drawArc(startAngle, endAngle);
        step++;
      } else {
        // 时间耗尽
        clearInterval(varName);
        totaltime = totaltime + 10;
        wx.showToast({
          title: '时间耗尽',
          image: '../../images/clock.png',
          duration: 1500,
          mask: true,
          success: () => {
            setTimeout(that.fail, 1500); 
          }
        })
      }
    };
    varName = setInterval(animation, animation_interval);
  },


  //自定义功能函数
  questionInit() {
    let optionList = [];
    let that = this.data.questionList[this.data.questionIndex];
    for (let i = 0; i < that.optionList.length; i++) {
      optionList.push(that.optionList[i]);
    }
    this.setData({currentContent: that.content});
    this.setData({currentOptionList: optionList});
  },
  changeQuestion() {
    let index = this.data.questionIndex + 1;
    this.setData({questionIndex: index});
    this.questionInit();
  },
  fail() {
    // 答题次数上传服务器，还没写

    wx.redirectTo({
      url: '../fail/fail?totaltime=' + totaltime + '&questionNum=' + this.data.questionIndex
    });
  },
  calculationTime() {
    //答对题目时累计时间
    totaltime = totaltime + ( 10 - this.data.progressTime );
  }
})

