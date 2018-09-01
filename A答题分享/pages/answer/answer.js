// pages/answer/answer.js
var util = require('../../utils/util.js');
Page({
  /*页面的初始数据*/
  data: {
    userInfo: {},
    lv: '',
    questionList: [],
    part:-1,
    reply:0,
    timu:{},
    btnStyleA: 'answerBtn',
    btnStyleB: 'answerBtn',
    btnStyleC: 'answerBtn',
    btnStyleD: 'answerBtn',
    numImg: ['../../img/djs3.png', '../../img/djs2.png', '../../img/djs1.png', '../../img/djs1.png'],
    showNum: '../../img/djs3.png',
    isXuan:true,
    num: 30,
    num_show: 10,
    jishu: 0,
    vsAnma: {},
    daojishi:0,
    qaaAnma:{},
    lastTimuAnma:{},
    djsAnma:{},
    lastTimu:true,
    isWin:true,
    isTanchuang:false,
    isPlaying:true,
    resurgence:2,
    isNormal:true,
    popBg:'popup',
    popIcon:'../../img/cuowu.png',
    rightAnswers:0
  },
  /* 生命周期函数--监听页面显示*/
  onShow: function () {
    this.coutDown_rest();
    this.setData({
      num: 30,
      num_show: 10,
      jishu: 0
    })
  },
  //页面加载完成
  onLoad: function (options) {
    this.VS();
    var that = this;
    wx.getStorage({
      key: 'sessionKey',
      success: function (res) {
        that.setData({
          sessionKey: res.data.sessionKey,
          openid: res.data.openid
        })
      
        wx.request({
          url: util.Apis + "/h5/game/user/login",
          data: {
            openid: that.data.openid,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'  // 默认值
          },
          method: 'POST',
          success: function (res) {
          
            that.setData({
              userInfo: res.data.data,
              chance: res.data.data.chance
            })
          }
        })
      }
    });
    wx.request({
      url: util.Apis + "/h5/game/user/question",
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'  // 默认值
      },
      method: 'POST',
      success: function (res) {
        var key = []
        res.data.data.forEach((value) => {
          if (value.level == 1) {
            value.lv = 'http://yukicomic-pic.oss-cn-hangzhou.aliyuncs.com/XCX_rongyao/lv1.png'
          } else if (value.level == 2) {
            value.lv = 'http://yukicomic-pic.oss-cn-hangzhou.aliyuncs.com/XCX_rongyao/lv2.png'
          } else {
            value.lv = 'http://yukicomic-pic.oss-cn-hangzhou.aliyuncs.com/XCX_rongyao/lv3.png'
          };
          key.push(value.correctOption)
        })
        
        that.setData({
          questionList: res.data.data
        })
        //扣除挑战机会
        wx.request({
          url: util.Apis + "/h5/game/user/minusChance",
          data: {
            openid: that.data.openid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'  // 默认值
          },
          method: 'POST',
          success: function (res) {
          
          }
        })
      }
    })
  },
  //游戏开始准备倒计时
  VS() {
    var animationDaojishi = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
      transformOrigin: "50% 50% 0"
    });
    this.animationDaojishi = animationDaojishi
      this.animationDaojishi.scale(1.5).opacity(1).step({ duration: 300 });
      this.setData({
        vsAnma: this.animationDaojishi.export(),
      })
    setTimeout(function () {
      this.VS_leave()
    }.bind(this), 1000)
  },
  //离场
  VS_leave() {
    var daojishi = this.data.daojishi,
      numImg = this.data.numImg,
      showNum = this.data.showNum;
    this.animationDaojishi.scale(0).opacity(0).step({ duration: 300 });
    this.setData({
      vsAnma: this.animationDaojishi.export()
    })
    daojishi++
    showNum = numImg[daojishi]
    setTimeout(function () {
      this.setData({
        daojishi:daojishi,
        showNum:showNum
      })
      if(daojishi<3){
        this.VS()
      }else{
       
        this.daojishiLeve()
      }
    }.bind(this), 200)
  },
  //倒计时离场
  daojishiLeve() {
    var animationDJS = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
      transformOrigin: "50% 50% 0"
    });
    animationDJS.left("-101vw").step({ duration: 300 });
    this.setData({
      djsAnma: animationDJS.export(),
    })
    setTimeout(function () {
      this.questionAnswerAnima()
    }.bind(this), 250)
  },


  //问题及答案动画
  questionAnswerAnima() {
    var reply = this.data.reply;
    var questionList = this.data.questionList,
      part = this.data.part;
    if (this.data.isNormal) {
      reply++;
    }
      part++;
    this.setData({
      reply: reply,
      part: part,
      isXuan: true,
      isNormal:true,
      timu: questionList[part]
    })
  
    var animationQAA = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      transformOrigin: "50% 50% 0"
    });
    this.animationQAA = animationQAA
    this.animationQAA.left('30rpx').step({ duration: 500 });
    this.coutDown(); // 开启计时器
    this.setData({
      qaaAnma: this.animationQAA.export(),
    })
  },
  //离场
  questionAnswerAnima_leave() {
    this.animationQAA.left("100vw").step({ duration: 300 });
    this.setData({
      qaaAnma: this.animationQAA.export(),
    })
    setTimeout(function () {
      this.setData({
        btnStyleA: 'answerBtn',
        btnStyleB: 'answerBtn',
        btnStyleC: 'answerBtn',
        btnStyleD: 'answerBtn',
        isXuan: true,
        num: 30,
        num_show: 10,
        jishu: 0
      })
      this.questionAnswerAnima()
    }.bind(this), 550)
  },
  // 题目最后离场
  lastTimu() {
    clearInterval(this.timer) //关闭计时器（防止计时器冲突）
    var animationlastTimu = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
      transformOrigin: "50% 50% 0"
    });
    this.animationlastTimu = animationlastTimu
    this.animationlastTimu.scale(0).opacity(0).step({ duration: 300 });
    this.setData({
      lastTimuAnma: this.animationlastTimu.export()
    })
    setTimeout(function () {
     this.setData({
       lastTimu:false
     })
     this.statistics()
    }.bind(this), 320)
  },
  // 结算入场
  statistics() {
    this.animationlastTimu.scale(1).opacity(1).step({ duration: 300 });
    this.setData({
      lastTimuAnma: this.animationlastTimu.export(),
      isPlaying:false
    })
    if (this.data.rightAnswers<10){
      this.setData({
        isWin: false //输
      })
    }else{
      this.setData({
        isWin: true
      })
    }
    this.consequence()
  },
  // 结算
  consequence(){
    var that = this
   
    wx.request({
      url: util.Apis + "/h5/game/user/settlement",
      data: {
        openid: that.data.openid,
        total: that.data.rightAnswers,
        result:that.data.isWin
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'  // 默认值
      },
      method: 'POST',
      success: function (res) {
      
      }
    })
  },
  //选择答案
  solutionA(e){
    if (this.data.num_show>1){
      clearInterval(this.timer) //关闭计时器（防止计时器冲突）
      if (this.data.isXuan) {
        var answer = this.data.timu.correctOption,
          rightAnswers = this.data.rightAnswers,
          selected = e.currentTarget.dataset.txt,
          reply = this.data.reply;
        var that = this;
        if (selected == answer) {
          rightAnswers ++;
          that.setData({
            btnStyleA: 'answerBtn-right',
            rightAnswers: rightAnswers,
            isXuan: false,
          })
          if (reply < 10) {
            that.questionAnswerAnima_leave()
          } else {
            that.lastTimu()
          }
        } else {
          that.coutDown_rest()
          if (that.data.resurgence) {
            that.setData({
              btnStyleA: 'answerBtn-error',
              isXuan: false,
            })
            that.showRight()
            setTimeout(function () {
              that.setData({
                isTanchuang: true,
                popBg: 'popup',
                popIcon: '../../img/cuowu.png',
              })
            }, 1000)
          } else {
            that.setData({
              isXuan: false,
              btnStyleA: 'answerBtn-error'
            })
            that.showRight()
            setTimeout(function () {
              that.setData({
                isTanchuang: false
              })
              that.lastTimu()
            }, 1000)
          }
        }
      }
    }
  },
  solutionB(e) {
    if (this.data.num_show > 1) {
      clearInterval(this.timer) //关闭计时器（防止计时器冲突）
      if (this.data.isXuan) {
        var answer = this.data.timu.correctOption,
          rightAnswers = this.data.rightAnswers,
          selected = e.currentTarget.dataset.txt,
          reply = this.data.reply;
        var that = this;
          if (selected == answer) {
            rightAnswers ++;
            that.setData({
              btnStyleB: 'answerBtn-right',
              rightAnswers: rightAnswers,
              isXuan: false,
            })
          
              if (reply < 10) {
                that.questionAnswerAnima_leave()
              } else {
                that.lastTimu()
              }
          
          } else {
            if (that.data.resurgence) {
              that.setData({
                isXuan: false,
                btnStyleB: 'answerBtn-error'
              })
              that.showRight()
              setTimeout(function () {
                that.setData({
                  isTanchuang: true,
                  popBg: 'popup',
                  popIcon: '../../img/cuowu.png',
                })
              }, 1000)
            } else {
              that.setData({
                isXuan: false,
                btnStyleB: 'answerBtn-error'
              })
              that.showRight()
              setTimeout(function () {
                that.setData({
                  isTanchuang: false,
                })
                that.lastTimu()
              }, 1000)
            }
          }
      
      }
    }
  },
  solutionC(e) {
    if (this.data.num_show > 1) {
      clearInterval(this.timer) //关闭计时器（防止计时器冲突）
      if (this.data.isXuan) {
        var answer = this.data.timu.correctOption,
          rightAnswers = this.data.rightAnswers,
          selected = e.currentTarget.dataset.txt,
          reply = this.data.reply;
        var that = this;
          if (selected == answer) {
            rightAnswers ++;
            that.setData({
              btnStyleC: 'answerBtn-right',
              rightAnswers: rightAnswers,
              isXuan: false,
            })
              if (reply < 10) {
                that.questionAnswerAnima_leave()
              } else {
                that.lastTimu()
              }
          } else {
            if (that.data.resurgence) {
              that.setData({
                isXuan: false,
                btnStyleC: 'answerBtn-error'
              })
              that.showRight()
              setTimeout(function () {
                that.setData({
                  isTanchuang: true,
                  popBg: 'popup',
                  popIcon: '../../img/cuowu.png'
                })
              }, 1000)
            } else {
              that.setData({
                isXuan: false,
                btnStyleC: 'answerBtn-error'
              })
              that.showRight()
              setTimeout(function () {
                that.setData({
                  isTanchuang: false,
                })
                that.lastTimu()
              }, 1000)
            }
          }
      }
    }
  },
  solutionD(e) {
    if (this.data.num_show > 1) {
      clearInterval(this.timer) //关闭计时器（防止计时器冲突）
      if (this.data.isXuan) {
        var answer = this.data.timu.correctOption,
          rightAnswers = this.data.rightAnswers,
          selected = e.currentTarget.dataset.txt,
          reply = this.data.reply;
        var that = this;
          if (selected == answer) {
            rightAnswers ++;
            that.setData({
              btnStyleD: 'answerBtn-right',
              rightAnswers: rightAnswers,
              isXuan: false,
            })
              if (reply < 10) {
                that.questionAnswerAnima_leave()
              } else {
                that.lastTimu()
              }
          } else {
            if (that.data.resurgence) {
              that.setData({
                isXuan: false,
                btnStyleD: 'answerBtn-error'
              })
              that.showRight()
              setTimeout(function () {
                that.setData({
                  isTanchuang: true,
                  popBg: 'popup',
                  popIcon: '../../img/cuowu.png',
                })
              }, 5000)
            } else {
              that.setData({
                isXuan: false,
                btnStyleD: 'answerBtn-error'
              })
              that.showRight()
              setTimeout(function () {
                that.setData({
                  isTanchuang: false,
                })
                that.lastTimu()
              }, 1000)
            }
          }
      }
    }
  },
  //显示正确答案
  showRight(){
    var answer = this.data.timu.correctOption,
      optionA = this.data.timu.optionA,
      optionB = this.data.timu.optionB,
      optionC = this.data.timu.optionC,
      optionD = this.data.timu.optionD;
    if (answer == optionA){
      this.setData({
        btnStyleA: 'answerBtn-right'
      })
    } else if (answer == optionB){
      this.setData({
        btnStyleB: 'answerBtn-right'
      })
    } else if (answer == optionC) {
      this.setData({
        btnStyleC: 'answerBtn-right'
      })
    } else if (answer == optionD) {
      this.setData({
        btnStyleD: 'answerBtn-right'
      })
    }
  },
  /* 生命周期函数--监听页面隐藏*/
  onHide: function () {
  
  },
  //倒计时重置
  coutDown_rest() {
    var cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。
    cxt_arc.setLineWidth(12);
    cxt_arc.setStrokeStyle('#3cff78');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径  
    cxt_arc.arc(32, 32, 24, -Math.PI * 10 / 20, Math.PI * 30 / 20, false);
    cxt_arc.stroke();//对当前路径进行描边  
    cxt_arc.draw();
    cxt_arc.clearRect(0, 0, 100, 100)
  },
  // 倒计时
  coutDown() {
    var cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。
    var num = this.data.num;
    var jishu = this.data.jishu;
    var num_show = this.data.num_show;
    var that = this;
    var timer = setInterval(function () {
      num -= 0.1;
      // 页面渲染完成    
      cxt_arc.setLineWidth(12);
      cxt_arc.setStrokeStyle('#3cff78');
      cxt_arc.setLineCap('round')
      cxt_arc.beginPath();//开始一个新的路径  
      cxt_arc.arc(32, 32, 24, -Math.PI * 10 / 20, Math.PI * num / 20, false);
      cxt_arc.stroke();//对当前路径进行描边  
      cxt_arc.draw();
      cxt_arc.clearRect(0, 0, 100, 100)
      jishu++
      if (jishu % 40 == 0) {
        num_show--;
        if (num_show<=0){
          //游戏结束 //游戏结束 //游戏结束 //游戏结束 //游戏结束 //游戏结束 //游戏结束 //游戏结束 //游戏结束 //游戏结束 //游戏结束 //游戏结束 //游戏结束 //游戏
          clearInterval(timer);
        
          if (that.data.isPlaying) {
            if (that.data.isXuan){
              if (!that.data.isTanchuang) {
                that.setData({
                  isTanchuang: true,
                  num_show:'OUT',
                  popBg: 'popupTime',
                  popIcon: '../../img/timeOut.png'
                })
              }
            }
          }
        }else{
          that.setData({
            num_show: num_show
          })
        }
      }
      that.setData({
        jishu: jishu
      })
    }, 25)
    this.timer = timer
  },
  //关闭弹窗
  closePopup(){
    this.setData({
      isTanchuang: false,
    })
    this.lastTimu()
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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

  // 转发分享
  onShareAppMessage: function (res) {
    var that = this;
    var resurgence = that.data.resurgence;
    var reply = that.data.reply;
    wx.showShareMenu({
      withShareTicket: true
    })
    if (res.from === 'button') {
      wx.showShareMenu({
        withShareTicket: true
      })
    }
    return {
      title: '荣耀大拷问',
      path: 'pages/index/index',
      imageUrl: 'http://yukicomic-pic.oss-cn-hangzhou.aliyuncs.com/XCX_rongyao/share.png',
      success: function (res) {
       
        wx.getShareInfo({
          shareTicket: res.shareTickets,
          success(res) {
           
            //解密
            wx.request({
              url: util.Apis + "/h5/game/weChat/decodeUserInfo",
              data: {
                sessionKey: that.data.sessionKey,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'  // 默认值
              },
              method: 'POST',
              success: function (res) {
                if (that.data.isPlaying){
                  //获取挑战次数---复活
                  wx.request({
                    url: util.Apis + "/h5/game/user/revive",
                    data: {
                      openGId: res.data.data.openGId,
                      openid: that.data.openid,
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'  // 默认值
                    },
                    method: 'POST',
                    success: function (res) {
                      if (res.data.code) {
                        wx.showToast({
                          title: '请分享到不同的群',
                          icon: 'none',
                          duration: 2000
                        })
                      } else {
                       
                        resurgence --;
                        if(reply<11){
                          that.setData({
                            isTanchuang: false,
                            btnStyleA: 'answerBtn',
                            btnStyleB: 'answerBtn',
                            btnStyleC: 'answerBtn',
                            btnStyleD: 'answerBtn',
                            isXuan: true,
                            num: 30,
                            num_show: 10,
                            jishu: 0,
                            resurgence: resurgence,
                            isNormal: false
                          })
                          that.questionAnswerAnima_leave();
                        }else{
                          //防止超出题库
                          that.lastTimu()
                        }
                      }
                    }
                  })
                }else{
                  //分享
                  wx.request({
                    url: util.Apis + "/h5/game/user/share",
                    data: {
                      openGId: res.data.data.openGId,
                      openid: that.data.openid,
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'  // 默认值
                    },
                    method: 'POST',
                    success: function (res) {
                      if (res.data.code) {
                        wx.showToast({
                          title: '请分享到不同的群',
                          icon: 'none',
                          duration: 2000
                        })
                      } else {
                       wx.reLaunch({
                          url: '../index/index'
                        })
                      }
                    }
                  })
                }
              }
            })
          },
          fail(res) {
         
            wx.showToast({
              title: '请分享到不同的群',
              icon: 'none',
              duration: 2000
            })
          }
        })
      },
      fail: function (res) {
       
        // 转发失败
      }
    }
  },
  //去挑选礼物
  goGift(){
    wx.redirectTo({
      url: '../souvenir/souvenir',
    })
  },
  //返回首页
  backIndex(){
    wx.switchTab({
      url: '../index/index',
    })
  }
})