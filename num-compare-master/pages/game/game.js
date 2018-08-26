//index.js
//获取应用实例
const app = getApp()
const judgeImageArr = ['/static/images/correct@2x.png', '/static/images/error@2x.png']
const utils=  require('../../utils/util.js')
var random = require("../../utils/randomNum.js")

var timer = null;
var lifeTime = null;

Page({
  data: {
    nums: '',
    topBgc: '',
    bottomBgc: '',
    isShow: true,
    judgeModal: false,
    judgeImage: judgeImageArr[0],
    isEnd: true,
    timer: 10,
    point: 10,
    currGamePoint: 0,
    equalBgc:'',
    isShowText: true,
    gameProgress:1,
    continueLifeTime: 10,
    shareContinueLife: true,
    warning: false
  },
  onShow() {
    /*计时开始*/
    this.gameCountTime()

  },
  onLoad(options){
    wx.showShareMenu({
      withShareTicket: true
    })
    console.log(options)
    /**初始化游戏背景色和题目 */
    let _nums = random.random(options.progress);
    let gameSet = random.setGamePoint(options.progress)
    this.setData({
      nums: _nums,
      topBgc: _nums[0].bgC,
      bottomBgc: _nums[1].bgC,
      timer: gameSet.timing,
      point: gameSet.point,
      currGamePoint: parseInt(options.score),
      gameProgress: options.progress? parseInt(options.progress): 1
    })
  },
  onReady(){
    this.pause = this.selectComponent("#pause");
  },
  judge(event){
    if (!this.data.isEnd){
      return false;
    }
    this.setData({
      isShow: false,
      warning: false
    })
    let index = Number(event.currentTarget.dataset.value)

    if(index !== -1){
      if (this.data.nums[index].value > this.data.nums[(Number(index) + 1) % 2].value) {
        this.showTips(0)
        this.setData({
          topBgc: index == 0?random.bgc.rightColor: this.data.topBgc,
          bottomBgc: index == 1? random.bgc.rightColor: this.data.bottomBgc
        })
        utils.playMedia(0)
      } else {
        this.showTips(1);
        this.setData({
          isShowText: false,
          topBgc: index == 0 ? random.bgc.errorColor : this.data.topBgc,
          bottomBgc: index == 1 ? random.bgc.errorColor : this.data.bottomBgc
        })
        utils.playMedia(1)
      }
    }else{
      if (this.data.nums[0].value === this.data.nums[1].value) {
        this.showTips(0);
        this.setData({
          equalBgc: random.bgc.rightColor
        })
        utils.playMedia(0)
      } else {
        this.showTips(1);
        this.setData({
          isShowText: false,
          equalBgc: random.bgc.errorColor
        })
        utils.playMedia(1)
      }
    }
  },
  showTips(type){
    clearInterval(timer);
    this.setData({
      judgeImage: judgeImageArr[type],
      judgeModal: true,
      isEnd: false
    })
    if(type == 1){
      setTimeout(function(){
        this.countTime();
      }.bind(this), 500)
      
      console.log('game over');
      return false;
    }
    /*判断正确，设置分数*/
    this.countPoint();

    let timeOuter = setTimeout(function(){
      let gameProgress = this.data.gameProgress +1
      /*将下道题的分值和时间长度传回来*/
      let gamePoint = random.setGamePoint(gameProgress)
      
      let _nums = random.random(gameProgress)
      this.setData({
        judgeModal: false,
        isShow: true,
        nums: _nums,
        topBgc: _nums[0].bgC,
        bottomBgc: _nums[1].bgC,
        equalBgc: '',
        isEnd: true,
        isShowText: true,
        gameProgress: gameProgress,
        timer: gamePoint.timing,
        point: gamePoint.point
      })
      this.gameCountTime();
      clearTimeout(timeOuter);
    }.bind(this),500)
  },
  /** */
  gameCountTime(){
    timer = setInterval(function (){
      this.setData({
        timer: this.data.timer-1
      })
      if (this.data.timer === 0){
        clearInterval(timer);
        this.countTime();
      }
      if(this.data.timer <= 3){
        this.setData({
          warning: true
        })
        utils.playMedia(2)
      }
    }.bind(this),1000)
  },
  /*统计分数*/
  countPoint(){
    let currPoint = this.data.currGamePoint + this.data.timer * this.data.point
    this.setData({
      currGamePoint: currPoint
    })
  },
  /*继续游戏*/
  _goGame(){
    this.pause.hidePause()
    this.gameCountTime()
    wx.setNavigationBarTitle({
      title: '游戏中'
    })
  },
  /*暂停游戏*/
  pauseGame(){
    wx.setNavigationBarTitle({
      title: '暂停'
    })
    console.log('暂停游戏')
    clearInterval(timer);
    this.pause.showPause()
  },
  /**跳转到游戏结束页 */
  jumpGameOver() {
     wx.redirectTo({
        url: "/pages/rank/rank?score="+this.data.currGamePoint+"&progress="+this.data.gameProgress
      })
  },
  /**重新继续游戏 */
  repeatGame(){
    wx.redirectTo({
      url: "/pages/ready/ready?" + "progress=" + this.data.gameProgress + "&score=" + this.data.currGamePoint
    })
  },
  /**续命倒计时 */
  countTime(){
    /**停止游戏中的计时 */
    clearInterval(timer);

    let self = this;
    /**如果已经分享过了一次，则直接跳转到游戏结束页面 */
    wx.getStorage({
      key: 'gameChanceCount',
      success: function(res) {
        if(res.data == 0){
          self.jumpGameOver();
          return false;
        }
        
        self.setData({
          shareContinueLife: false
        })
        lifeTime = setInterval(function () {
          let restTime = self.data.continueLifeTime - 1;
          if (restTime <= 0) {
            
            self.jumpGameOver()
            self.setData({
              shareContinueLife: true
            })
            clearInterval(lifeTime)
          }else{
            self.setData({
              continueLifeTime: restTime
            })
          }
          
        }, 1000)
      },
    })
    
    
  },
  /**分享接口 */
  onShareAppMessage: function (res) {
    let self = this;
    let isShareContinueLife = false;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      if (res.target.dataset.value === "continueLife"){
        isShareContinueLife = true;
      }
      console.log(res.target)
    }
    /**清除分享重来定时器 */
    clearInterval(lifeTime)
    return {
      title: '[' + app.globalData.userInfo.nickName +'@我]一年级加减法，来虐一下？',
      path: '/pages/home/home',
      success: function (result) {
        if (isShareContinueLife){
          self.repeatGame()
        }
      },
      fail: function (res) {
        // 转发失败
        console.log('取消')
        self.countTime()
      }
    }
  },
  onUnload() {
    clearInterval(timer)
    clearInterval(lifeTime)
    timer = null;
    lifeTime = null;
  }
})
