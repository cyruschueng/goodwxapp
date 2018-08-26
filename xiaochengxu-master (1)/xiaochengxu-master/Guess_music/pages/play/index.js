var app = getApp();
const itemlvUrl = require('../../config').config.itemlvUrl;
const userInfoUrl = require('../../config').config.userInfoUrl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lv: '', //等级
    speed: '', //进度
    item: {},
    answer: '',
    mihuo: {},
    score: 300,
   showView:false,
   showView1: true,
   showView2: true,
  //  currentAni: 1,
  //  aniTimer: true,
   rotate: "rotate",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  stopMusic: function () {
    var that = this
    that.setData({
      showView: false,
      showView1: true,
      showView2: true,
      rotate: "rotate",
    })
    wx.playBackgroundAudio()
  },
  //暂停音乐//播放音乐
  playMusic: function () {
    var that = this
    that.setData({
      showView: true,
      showView1: false,
      showView2: true,  
      rotate: "", 
    })
    wx.pauseBackgroundAudio()
    
  },
  replay: function () {
    wx.playBackgroundAudio({
      dataUrl: getApp().globalData.dataUrl,
      title: '',
      coverImgUrl: '',
    })
    var that = this
    that.setData({
      showView: false,
      showView1: true,
      showView2: true,
      rotate: "rotate",
    })
  },
  // showAni: function () {
  //   var animation = wx.createAnimation({
  //     duration: 20000,
  //     timingFunction: "linear",
  //   })
  //   this.animation = animation
  //   animation.rotate(3600).step();
  //   this.setData({
  //     animationData: animation.export()
  //   })
  // },
  // 点击暂停按钮停止播放音乐
  onLoad: function (res) {
    var that = this; 
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      wx.setClipboardData({
        data: "SyjKlO190w",
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
          }
        })
      }
    })
      that.setData({
        lv: userInfo.lv,
        speed: userInfo.speed,
        score: userInfo.score
      })
      //获取数据
      this.getItemStore(userInfo.lv, userInfo.speed)
    } else {
      that.setData({
        lv: 1,
        speed: 1,
        score: 300
      })
      //获取数据
      this.getItemStore(1, 1)
    }
    /*
    try {
      var userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        that.setData({
          lv: userInfo.lv,
          speed: userInfo.speed,
          score: userInfo.score
        })
        //获取数据
        this.getItemStore(userInfo.lv, userInfo.speed)
      }
    } catch (e) {
      console.log('catch');
    }
    */

    //console.log(that.data);

  },
  //存formId
  obtainFormId: function (e) {
    var formId = e.detail.formId;
    wx.request({
      url: 'https://caimusic4.mytp8.cn/public_html/index.php/index/Index/addformid',
      method: 'POST',
      data: {
        openid: getApp().globalData.openId,
        fromid: e.detail.formId,
        user: getApp().globalData.nickName,
        pic: getApp().globalData.avatarUrl
      },
      success: function (res) {
      }
    })
  },
  /**
  * 获取数据函数封装
  * @param intval lv 等级ID
  * @param intval speed 精度
  */
  getItemStore: function (lv, speed) {
    var that = this 
    var lv_key = "lv_" + lv
    var lv_data = wx.getStorageSync(lv_key);
    if (lv_data) {
      var lv_sp = lv_data.length;
      if (speed > lv_sp) {
        //LV已满，进入下一个LV
        //console.log('go next lv');
        this.syncAndputData();
      } else {
        
        //返回页面数据并赋值
        var itemdata = lv_data[speed - 1];
        //获取答案长度
        var answerLT = itemdata.answer.length
        getApp().globalData.answerLT = itemdata.answer.length
        console.log(answerLT)
         var dataUrl = itemdata.pic
         getApp().globalData.dataUrl = itemdata.pic
         console.log(dataUrl)
         that.setData({
           showView: false,
           showView1: true,
           rotate: "rotate",
           showView2: true,
         })
          wx.playBackgroundAudio({
          dataUrl: dataUrl,
          title: '',
          coverImgUrl: '',
          success: function (res) {
            wx.onBackgroundAudioStop(function (){
              that.setData({
                showView: true,
                showView1: true,
                showView2: false,
                rotate: "",
              })
            })
          },
        }) 
        // var i = 0;
        // console.log(answerLT)
        // var str = new Array
        // for (i = 0; i < answerLT; i++){     
        //   str[i] = "str_" + i        
        // }
        // console.log(str)
        that.setData({
          lv: lv,
          speed: speed,
          item: itemdata,
          CD: itemdata.answer_num,
          answer: itemdata.answer,
          mihuo: itemdata.confound,
          //清空原有回答 
          str_1: '',
          str_2: '',
          str_3: '',
          str_4: '',
          str_5: '',
          str_6: '',
          str_7: '',
          str_8: '',
          str_9: '',
          str_10: '',
        })
        //console.log(itemdata)
      }
    } else {
      //远程请求数据
      this.getItem(lv, speed);
    }
  },
  /**
  * 获取远程数据并缓存
  * @param intval lv 等级ID
  * @param intval speed 精度
  */
  getItem: function (lv, speed) {
    console.log(lv)
    console.log(speed)
    var that = this
    wx.showLoading({
      title: '请稍等...',
    })
    var lv_key = "lv_" + lv
    //p1 先远程获取请求数据
    wx.request({
      url: itemlvUrl,
      data: {
        lv: lv
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data.data)
        var dataUrl = res.data.data[0].pic
        getApp().globalData.dataUrl = res.data.data[0].pic
        that.setData({
          showView: false,
          showView1: true,
          rotate:"rotate"
        })
        wx.playBackgroundAudio({
          dataUrl: dataUrl,
          title: '',
          coverImgUrl: '',
          success: function (res) {
            wx.onBackgroundAudioStop(function () {
              that.setData({
                showView: true,
                showView1: true,
                showView2: false,
                rotate: "",
              })
            })
          },
        }) 
        var answerLT = res.data.data[0].answer_num
        getApp().globalData.answerLT = res.data.data[0].answer_num
        console.log(res.data.data[0].answer_num)
        var arr = res.data;
        //console.log(arr.data[speed-1]);
        var items = arr.data[speed - 1];
        //缓存
        wx.setStorageSync(lv_key, arr.data);
        //解决异步
       
        that.setData({
          lv: lv,
          speed: speed,
          item: items,
          CD: res.data.data[0].answer_num,
          answer: items.answer,
          mihuo: items.confound,
          //清空原有回答
          str_1: '',
          str_2: '',
          str_3: '',
          str_4: '',
          str_5: '',
          str_6: '',
          str_7: '',
          str_8: '',
          str_9: '',
          str_10: '',
        })
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  //同步本地缓存至服务器
  syncAndputData: function () {
    //console.log(this.data);
    //p1更新本地缓存
    var userInfo = wx.getStorageSync('userInfo');
    var n_lv = parseInt(this.data.lv) + 1
    var n_speed = 1
    userInfo.lv = n_lv
    userInfo.speed = n_speed
    this.setData({
      lv: n_lv,
      speed: n_speed,
    })
    wx.setStorageSync('userInfo', userInfo)

    //p2 同步用户信息至服务器
    var uploaduserInfo = wx.getStorageSync('userInfo');
    //console.log(uploaduserInfo);
    wx.request({
      url: userInfoUrl, //仅为示例，并非真实的接口地址
      data: uploaduserInfo,
      method: 'POST',
      success: function (res) {
        console.log(res)
      }
    })
    //p3 拉取远程数据并赋值
    this.getItemStore(n_lv, n_speed)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //操作当前汉字
  Doasfunc: function (e) {
    var that = this;
    //console.log(e)
    var num = e.target.dataset.num;
    var str = e.target.dataset.key;
    //console.log(num);
    //console.log(str);

    //p1 消失当前字
    /*
    var param = {};
    var disable = "disabled_" + num;
    //console.log(disable);
    param[disable] = true;
    this.setData(param);
    */

    //p2 推送至输入框架
    // that.setData({
    //   str_1: str,
    // })
    var u = this.GetStrNum(str);
    //console.log(u);
  },

  //判断第几个字符为空
  GetStrNum: function (str) {
    var that = this;
    // console.log(str);
    var j = getApp().globalData.answerLT+1;
    var i
    // var str = new Array()
    for(i=1;i<j;i++){
      if(i==1){
        var str_1 = this.data.str_1;
      }
      if (i == 2) {
        var str_2 = this.data.str_2;
      }
      if (i == 3) {
        var str_3 = this.data.str_3;
      }
      if (i == 4) {
        var str_4 = this.data.str_4;
      }
      if (i == 5) {
        var str_5 = this.data.str_5;
      }
      if (i == 6) {
        var str_6 = this.data.str_6;
      }
      if (i == 7) {
        var str_7 = this.data.str_7;
      }
      if (i == 8) {
        var str_8 = this.data.str_8;
      }
      if (i == 9) {
        var str_9 = this.data.str_9;
      }
      if (i == 10) {
        var str_10 = this.data.str_10;
      }
    }
    //console.log(str_1);
    for(i=1;i<j;i++){
      if (!str_1 && i < j) {
      that.setData({
        str_1: str,
      })
    } else if (!str_2 && i < j) {
      that.setData({
        str_2: str,
      })
      } else if (!str_3 && i < j) {
      that.setData({
        str_3: str,
      })
      } else if (!str_4 && i < j) {
      that.setData({
        str_4: str,
      })
      } else if (!str_5 && i < j) {
        that.setData({
          str_5: str,
        })
      } 
      else if (!str_6 && i < j) {
        that.setData({
          str_6: str,
        })
      } 
      else if (!str_7 && i < j) {
        that.setData({
          str_7: str,
        })
      } 
      else if (!str_8 && i < j) {
        that.setData({
          str_8: str,
        })
      } 
      else if (!str_9 && i < j) {
        that.setData({
          str_9: str,
        })
      } 
      else if (!str_10 && i < j) {
        that.setData({
          str_10: str,
        })
      }  
    }
    this.CheckStr();
  },

  //取消已输入字符
  Dogofunc: function (e) {
    var that = this;
    var num = e.target.dataset.num
    var param = {};
    var str_go = "str_" + num;
    console.log(num)
    //console.log(disable);
    param[str_go] = '';
    this.setData(param);
  },

  //检查答案是否正确
  CheckStr: function () {
    var answer = this.data.answer;
    // var j = 4+1;
    // var i
    // var user_as = ''
    // for(i=1;i<j;i++){
    //   var str_i = "str_" + i;
    //   console.log(str_i)
    //   var str_i = "this.data.str_"+i;
    //   console.log(str_i)
    //   var user_as = user_as + ("str_" + i);
    //   console.log(user_as);
    // }
    
    var j = getApp().globalData.answerLT + 1;
    var i
    // var str = new Array()
    for (i = 1; i < j; i++) {
      if (i == 1) {
        var str_1 = this.data.str_1;
      }
      if (i == 2) {
        var str_2 = this.data.str_2;
      }
      if (i == 3) {
        var str_3 = this.data.str_3;
      }
      if (i == 4) {
        var str_4 = this.data.str_4;
      }
      if (i == 5) {
        var str_5 = this.data.str_5;
      }
      if (i == 6) {
        var str_6 = this.data.str_6;
      }
      if (i == 7) {
        var str_7 = this.data.str_7;
      }
      if (i == 8) {
        var str_8 = this.data.str_8;
      }
      if (i == 9) {
        var str_9 = this.data.str_9;
      }
      if (i == 10) {
        var str_10 = this.data.str_10;
      }
    }
    // if (!str_i) {
    //   console.log(str_i)
    //   return
    // }
    for (i = 1; i < j; i++) {
      if (i == 1) {
        if (!str_1) {
          // console.log(str_i)
          return
        }
      }
      if (i == 2) {
        if (!str_1 || !str_2) {
          // console.log(str_i)
          return
        }
      }
      if (i == 3) {
        if (!str_1 || !str_2 || !str_3) {
          // console.log(str_i)
          return
        }
      }
      if (i == 4) {
        if (!str_1 || !str_2 || !str_3 || !str_4) {
          // console.log(str_i)
          return
        }
      }
      if (i == 5) {
        if (!str_1 || !str_2 || !str_3 || !str_4 || !str_5) {
          // console.log(str_i)
          return
        }
      }
      if (i == 6) {
        if (!str_1 || !str_2 || !str_3 || !str_4 || !str_5 || !str_6) {
          // console.log(str_i)
          return
        }
      }
      if (i == 7) {
        if (!str_1 || !str_2 || !str_3 || !str_4 || !str_5 || !str_6 || !str_7) {
          // console.log(str_i)
          return
        }
      }
      if (i == 8) {
        if (!str_1 || !str_2 || !str_3 || !str_4 || !str_5 || !str_6 || !str_7 || !str_8) {
          // console.log(str_i)
          return
        }
      }
      if (i == 9) {
        if (!str_1 || !str_2 || !str_3 || !str_4 || !str_5 || !str_6 || !str_7 || !str_8 || !str_9) {
          // console.log(str_i)
          return
        }
      }
      if (i == 10) {
        if (!str_1 || !str_2 || !str_3 || !str_4 || !str_5 || !str_6 || !str_7 || !str_8 || !str_9 || !str_10) {
          // console.log(str_i)
          return
        }
      }
    }
    
    var user_as=""
    for (i = 1; i < j; i++) {  
      if (i == 1) {
        var user_as = str_1
      }
      if (i == 2) {
        var user_as = str_1 + str_2
      }
      if (i == 3) {
        var user_as = str_1 + str_2 + str_3
      }
      if (i == 4) {
        var user_as = str_1 + str_2 + str_3 + str_4
      }
      if (i == 5) {
        var user_as = str_1 + str_2 + str_3 + str_4 + str_5
      }
      if (i == 6) {
        var user_as = str_1 + str_2 + str_3 + str_4 + str_5 + str_6
      }
      if (i == 7) {
        var user_as = str_1 + str_2 + str_3 + str_4 + str_5 + str_6 + str_7
      }
      if (i == 8) {
        var user_as = str_1 + str_2 + str_3 + str_4 + str_5 + str_6 + str_7 + str_8
      }
      if (i == 9) {
        var user_as = str_1 + str_2 + str_3 + str_4 + str_5 + str_6 + str_7 + str_8 + str_9
      }
      if(i==10){
        var user_as = str_1 + str_2 + str_3 + str_4 + str_5 + str_6 + str_7 + str_8 + str_9 + str_10
      }
    }
    console.log(user_as);
    if (answer == user_as) {
      //1同步缓存，分数,进度
      var lv = this.data.lv;
      var n_speed = parseInt(this.data.speed) + 1
      var n_score = parseInt(this.data.score) + 5
      var userInfo = wx.getStorageSync('userInfo');
      userInfo.score = n_score
      userInfo.speed = n_speed
      //console.log(userInfo);
      this.setData({
        score: n_score,
        speed: n_speed,
      })
      wx.setStorageSync('userInfo', userInfo)

      //2弹出解释
      let _this = this
      wx.showModal({
        title: this.data.answer,
        content: this.data.item.explain + '\r\n' + '加5个金币',
        showCancel: false,
        confirmText: '下一关',
        success: function (res) {
          if (res.confirm) {
            //重新获取数据并负值optimizer、
            _this.getItemStore(lv, n_speed)
          }
        }
      })
    } else {
      wx.showToast({
        image: '/style/images/error.png',
        title: '答案存在错误',
        duration: 2000
      })
    }
  },
  //成语提示
  Remind: function () {
    var that = this;   
    getApp().globalData.score = that.data.score;
    console.log(getApp().globalData.score)
    if (getApp().globalData.score < 30) {
      wx.showToast({
        icon: 'success',
        title: '分享可获金币',
        duration: 2000
      })
      return;
    }
    //p1 减分操作 默认减30
    var n_score = getApp().globalData.score - 30
    console.log(n_score)
    that.setData({
      score: n_score
    })
    console.log(n_score)
    //2同步用户积分缓存
    var userInfo = wx.getStorageSync('userInfo')
    userInfo.score = n_score
    wx.setStorageSync('userInfo', userInfo)

    //3随即显示答案
    var j = getApp().globalData.answerLT + 1;
    var i
    var answer = this.data.answer;
    //数组切割
    var answer_arr = answer.split('');
    for(i=1;i<j;i++){
      if(i==1){
        var str_1 = this.data.str_1;
      }
      if (i == 2) {
        var str_1 = this.data.str_1;
        var str_2 = this.data.str_2;
      }
      if (i == 3) {
        var str_1 = this.data.str_1;
        var str_2 = this.data.str_2;
        var str_3 = this.data.str_3;
      }
      if (i == 4) {
        var str_1 = this.data.str_1;
        var str_2 = this.data.str_2;
        var str_3 = this.data.str_3;
        var str_4 = this.data.str_4;
      }
      if (i == 5) {
        var str_1 = this.data.str_1;
        var str_2 = this.data.str_2;
        var str_3 = this.data.str_3;
        var str_4 = this.data.str_4;
        var str_5 = this.data.str_5;
      }
      if (i == 6) {
        var str_1 = this.data.str_1;
        var str_2 = this.data.str_2;
        var str_3 = this.data.str_3;
        var str_4 = this.data.str_4;
        var str_5 = this.data.str_5;
        var str_6 = this.data.str_6;
      }
      if (i == 7) {
        var str_1 = this.data.str_1;
        var str_2 = this.data.str_2;
        var str_3 = this.data.str_3;
        var str_4 = this.data.str_4;
        var str_5 = this.data.str_5;
        var str_6 = this.data.str_6;
        var str_7 = this.data.str_7;
      }
      if (i == 8) {
        var str_1 = this.data.str_1;
        var str_2 = this.data.str_2;
        var str_3 = this.data.str_3;
        var str_4 = this.data.str_4;
        var str_5 = this.data.str_5;
        var str_6 = this.data.str_6;
        var str_7 = this.data.str_7;
        var str_8 = this.data.str_8;
      }
      if (i == 9) {
        var str_1 = this.data.str_1;
        var str_2 = this.data.str_2;
        var str_3 = this.data.str_3;
        var str_4 = this.data.str_4;
        var str_5 = this.data.str_5;
        var str_6 = this.data.str_6;
        var str_7 = this.data.str_7;
        var str_8 = this.data.str_8;
        var str_9 = this.data.str_9;
      }
      if (i == 10) {
        var str_1 = this.data.str_1;
        var str_2 = this.data.str_2;
        var str_3 = this.data.str_3;
        var str_4 = this.data.str_4;
        var str_5 = this.data.str_5;
        var str_6 = this.data.str_6;
        var str_7 = this.data.str_7;
        var str_8 = this.data.str_8;
        var str_9 = this.data.str_9;
        var str_10 = this.data.str_10;
      }
    }

    //console.log(str_1);
    for (i = 1; i < j; i++) {
      if (i == 1) {
        if (!str_1) {
          that.setData({
            str_1: answer_arr[0],
          })
          this.CheckStr();
        }
      }
      if (i == 2) {
        if (!str_1) {
          that.setData({
            str_1: answer_arr[0],
          })
        } else if (!str_2) {
          that.setData({
            str_2: answer_arr[1],
          })
          this.CheckStr();
        }
      }
      if (i == 3) {
        if (!str_1) {
          that.setData({
            str_1: answer_arr[0],
          })
        } else if (!str_2) {
          that.setData({
            str_2: answer_arr[1],
          })
        } else if (!str_3) {
          that.setData({
            str_3: answer_arr[2],
          })
          this.CheckStr();
        }
      }
      if (i == 4) {
        if (!str_1) {
          that.setData({
            str_1: answer_arr[0],
          })
        } else if (!str_2) {
          that.setData({
            str_2: answer_arr[1],
          })
        } else if (!str_3) {
          that.setData({
            str_3: answer_arr[2],
          })
        } else if (!str_4) {
          that.setData({
            str_4: answer_arr[3],
          })
          this.CheckStr();
        }
      }
      if (i == 5) {
        if (!str_1) {
          that.setData({
            str_1: answer_arr[0],
          })
        } else if (!str_2) {
          that.setData({
            str_2: answer_arr[1],
          })
        } else if (!str_3) {
          that.setData({
            str_3: answer_arr[2],
          })
        } else if (!str_4) {
          that.setData({
            str_4: answer_arr[3],
          })
        } else if (!str_5) {
          that.setData({
            str_5: answer_arr[4],
          })
          this.CheckStr();
        }
      }
      if (i == 6) {
        if (!str_1) {
          that.setData({
            str_1: answer_arr[0],
          })
        } else if (!str_2) {
          that.setData({
            str_2: answer_arr[1],
          })
        } else if (!str_3) {
          that.setData({
            str_3: answer_arr[2],
          })
        } else if (!str_4) {
          that.setData({
            str_4: answer_arr[3],
          })
        } else if (!str_5) {
          that.setData({
            str_5: answer_arr[4],
          })
        } else if (!str_6) {
          that.setData({
            str_6: answer_arr[5],
          })
          this.CheckStr();
        }
      }
      if (i == 7) {
        if (!str_1) {
          that.setData({
            str_1: answer_arr[0],
          })
        } else if (!str_2) {
          that.setData({
            str_2: answer_arr[1],
          })
        } else if (!str_3) {
          that.setData({
            str_3: answer_arr[2],
          })
        } else if (!str_4) {
          that.setData({
            str_4: answer_arr[3],
          })
        } else if (!str_5) {
          that.setData({
            str_5: answer_arr[4],
          })
        } else if (!str_6) {
          that.setData({
            str_6: answer_arr[5],
          })
        } else if (!str_7) {
          that.setData({
            str_7: answer_arr[6],
          })
          this.CheckStr();
        }
      }
      if (i == 8) {
        if (!str_1) {
          that.setData({
            str_1: answer_arr[0],
          })
        } else if (!str_2) {
          that.setData({
            str_2: answer_arr[1],
          })
        } else if (!str_3) {
          that.setData({
            str_3: answer_arr[2],
          })
        } else if (!str_4) {
          that.setData({
            str_4: answer_arr[3],
          })
        } else if (!str_5) {
          that.setData({
            str_5: answer_arr[4],
          })
        } else if (!str_6) {
          that.setData({
            str_6: answer_arr[5],
          })
        } else if (!str_7) {
          that.setData({
            str_7: answer_arr[6],
          })
        } else if (!str_8) {
          that.setData({
            str_8: answer_arr[7],
          })
          this.CheckStr();
        }
      }
      if (i == 9) {
        if (!str_1) {
          that.setData({
            str_1: answer_arr[0],
          })
        } else if (!str_2) {
          that.setData({
            str_2: answer_arr[1],
          })
        } else if (!str_3) {
          that.setData({
            str_3: answer_arr[2],
          })
        } else if (!str_4) {
          that.setData({
            str_4: answer_arr[3],
          })
        } else if (!str_5) {
          that.setData({
            str_5: answer_arr[4],
          })
        } else if (!str_6) {
          that.setData({
            str_6: answer_arr[5],
          })
        } else if (!str_7) {
          that.setData({
            str_7: answer_arr[6],
          })
        } else if (!str_8) {
          that.setData({
            str_8: answer_arr[7],
          })
        } else if (!str_9) {
          that.setData({
            str_9: answer_arr[8],
          })
          this.CheckStr();
        }
      }
      if (i == 10) {
        if (!str_1) {
          that.setData({
            str_1: answer_arr[0],
          })
        } else if (!str_2) {
          that.setData({
            str_2: answer_arr[1],
          })
        } else if (!str_3) {
          that.setData({
            str_3: answer_arr[2],
          })
        } else if (!str_4) {
          that.setData({
            str_4: answer_arr[3],
          })
        } else if (!str_5) {
          that.setData({
            str_5: answer_arr[4],
          })
        } else if (!str_6) {
          that.setData({
            str_6: answer_arr[5],
          })
        } else if (!str_7) {
          that.setData({
            str_7: answer_arr[6],
          })
        } else if (!str_8) {
          that.setData({
            str_8: answer_arr[7],
          })
        } else if (!str_9) {
          that.setData({
            str_9: answer_arr[8],
          })
        }else if (!str_10) {
          that.setData({
            str_10: answer_arr[9],
          })
          this.CheckStr();
        }
      }
    }
  },
  //分享提示
  shareBtn: function () {
    // wx.showToast({
    //   icon: 'success',
    //   title: '分享可获得金币',
    //   duration: 2000
    // })
  },
  /**
   * 用户点击右上角分享
   */

  onShareAppMessage: function (res) {
    var that = this
    var score = that.data.score;
    if (res.from == "button") {
      //分享为按键中的求助即id=1
      if (res.target.id == 1) {
        return {
          title: '我卡在了' + that.data.item.id + '关，帮我通通关吧！',
          path: '/pages/play/index',
          imageUrl: '/style/images/music_bg1.jpg', //这是我的图片路径
          success: function (res) {
            var n_score = score + 30
            that.setData({
              score: n_score
            })
            var userInfo = wx.getStorageSync('userInfo');
            userInfo.score = n_score
            wx.setStorageSync('userInfo', userInfo)
            wx.showToast({
              icon: 'success',
              title: '获得30个金币',
              duration: 2000
            })
          },
        }
      }
      //分享为按键中的分享即id=2
      if (res.target.id == 2) {
        return {
          title: '我已闯过' + that.data.item.id + '关，和我一起通关吧！',
          path: '/pages/index/index',
          imageUrl: '/style/images/music_bg2.jpg', //这是我的图片路径
          success: function (res) {
            var n_score = score + 30
            that.setData({
              score: n_score
            })
            var userInfo = wx.getStorageSync('userInfo');
            userInfo.score = n_score
            wx.setStorageSync('userInfo', userInfo)
            wx.showToast({
              icon: 'success',
              title: '获得30个金币',
              duration: 2000
            })
          },
        }
      }else{
        return {
          title: '我已闯过' + that.data.item.id + '关，和我一起通关吧！',
          path: '/pages/index/index',
          imageUrl: '/style/images/music_bg2.jpg', //这是我的图片路径
          success: function (res) {
            var n_score = score + 30
            that.setData({
              score: n_score
            })
            var userInfo = wx.getStorageSync('userInfo');
            userInfo.score = n_score
            wx.setStorageSync('userInfo', userInfo)
            wx.showToast({
              icon: 'success',
              title: '获得30个金币',
              duration: 2000
            })
          },
        }
      }
    } 
  },
})
