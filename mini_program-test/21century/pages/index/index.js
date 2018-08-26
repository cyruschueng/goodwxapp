var util = require('../../utils/util.js');
var app = getApp();
var sign_key = app.globalData.sign_key;
var timeUrl = app.globalData.timeUrl;
var shelfUrl = app.globalData.shelfUrl;
var books = app.globalData.books;
var reportUrl = app.globalData.reportUrl;
var sysFlag = app.globalData.sysFlag;
var touchDot = 0;//触摸时的原点
var time = 0;//  时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = "";// 记录/清理 时间记录
var nth = 0;// 设置活动菜单的index
var nthMax = 5;//活动菜单的最大个数
var tmpFlag = true;// 判断左右华东超出菜单最大值时不再执行滑动事件
var cidArr = ['Level aa','Level A','Level B','Level C','Level D','Level E','Level F','Level G','Level H','Level I'];
var cArr = ['Level aa','Level A','Level B','Level C','Level D','Level E','Level F','Level D','Level E','Level F','Level G','Level H','Level I'];
var bgsrcArr = ['https://qnfile.abctime.com/animal_bg.png','https://qnfile.abctime.com/food_bg.png','https://qnfile.abctime.com/fruits_bg.png','https://qnfile.abctime.com/holiday_bg.png','https://qnfile.abctime.com/sport_bg.png','https://qnfile.abctime.com/universe_bg.png','https://qnfile.abctime.com/other_bg.png'];
var sceneArr = ['Animals','Food','Fruits','Holiday','Sport','Universe','Other'];
var ind = 0;
var endStatus,canTap=true;
//定时器和终止时间
var bTimer,time,end;
Page({
  /**
   * 页面的初始数据
   */
  data: {
      books:[],
      head_url:"",
      upStatus:true,
      selectCid:true,
      firstCid:'',
      selectArea:false,
      bg_src:'',
      cids:[{name:'Level aa',value:3},{name:'Level A',value:4},{name:'Level B',value:5},{name:'Level C',value:6},{name:'Level D',value:7},{name:'Level E',value:8},{name:'Level F',value:9},{name:'Level G',value:10},
          {name:'Level H',value:11},{name:'Level I',value:12}],
      scene: '',
      cid:'',
      c_day:'00',
      c_hour:'00',
      c_min:'00',
      c_sis:'00',
      modalStatus:true,
      is_read:true,
      timeStatus:3,
      gradeArr:[3,4,5,6,7,8,9,7,8,9,10,11,12],
      isIpx:app.globalData.isIpx?true:false,
      moStatus:false,
      canTap:true,
      endScore:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  hideCid:function () {
      this.setData({
          selectArea:false,
          selectCid:true,
      })
  },
  //选择绘本cid
  clickCid:function(){
      var selectCid = this.data.selectCid;
      // console.log(selectCid);
      if(selectCid == true){
          this.setData({
              selectArea:true,
              selectCid:false,
          })
      }else{
          this.setData({
              selectArea:false,
              selectCid:true,
          })
      }
  } ,
    //点击切换cid
    mySelect:function(e){
        this.setData({
            firstCid:cidArr[e.target.dataset.cid-3],
            selectCid:true,
            selectArea:false,
        });
        wx.setStorageSync('cid', e.target.dataset.cid);
        this.getBooks(e.target.dataset.cid);
    },
  onLoad: function (options) {
        let userInfo = wx.getStorageSync('userInfo');
        if(userInfo){
            this.setData({head_url:JSON.parse(userInfo).avatarUrl})
        }
        var open = wx.getStorageSync('openid');
        this.setData({bg_src:bgsrcArr[ind],firstCid:cidArr[ind],scene:sceneArr[ind],books:books})
        var that = this;
        bTimer = setInterval(function () {
            var open = wx.getStorageSync('openid');
            console.log(open);
            if(open !=''){
                clearInterval(bTimer);
                console.log(wx.getStorageSync('cid'));
                if(wx.getStorageSync('cid')){
                    that.getBooks(wx.getStorageSync('cid'));
                    that.setData({
                        firstCid:cidArr[parseInt(wx.getStorageSync('cid')-3)],
                    });
                }
                else if(wx.getStorageSync('grade')&&wx.getStorageSync('grade')>=0){
                    var a = wx.getStorageSync('grade');
                    console.log(a);
                    console.log(cArr[a]);
                    console.log(that.data.gradeArr[a]);
                    that.setData({firstCid:cArr[a]});
                    that.getBooks(that.data.gradeArr[a]);
                    // that.getBooks(that.data.gradeArr[a]);
                }else {
                    that.getBooks(3);
                }
            }
        },200);
  },
    // 触摸开始事件
    touchStart: function (e) {
        touchDot = e.touches[0].pageX; // 获取触摸时的原点
        // 使用js计时器记录时间
        interval = setInterval(function () {
            time++;
        }, 100);
    },
    // 触摸移动事件
    touchMove: function (e) {
        var touchMove = e.touches[0].pageX;
        // console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));
        // 向左滑动
        if (touchMove - touchDot <= -40 && time < 10) {
            endStatus = 'mLeft';
        }
        // 向右滑动
        if (touchMove - touchDot >= 40 && time < 10) {
            endStatus = 'mRight';
        }
    },
    // 触摸结束事件
    touchEnd: function (e) {
        switch (endStatus){
            case 'mLeft':
                if(ind<6){
                    ind++;
                    this.setData({bg_src:bgsrcArr[ind],scene:sceneArr[ind]})
                }else {
                    ind = 0;
                    this.setData({bg_src:bgsrcArr[ind],scene:sceneArr[ind]})
                }
                break;
            // case 'mRight':
            //     if(ind>=1){
            //         let c = ind +3
            //         this.getBooks(c);
            //         this.setData({bg_color:bgcArr[ind]})
            //     }else {
            //         ind = 6;
            //         let c = ind +3
            //         this.getBooks(c);
            //         this.setData({bg_color:bgcArr[ind]})
            //     }
            //     break;
            default:
                break;
        }
        clearInterval(interval); // 清除setInterval
        time = 0;
    },
    toReading:function (e) {
        var open = wx.getStorageSync('openid');
        var book_id = e.currentTarget.dataset.bookId;
        var book_cid = e.currentTarget.dataset.bookCid;
        var book_pic = e.currentTarget.dataset.bookPic;
        if(canTap){
            console.log(wx.getStorageSync('userInfo'));
            canTap = false;
            if(!wx.getStorageSync('userInfo')){
                wx.showModal({
                    title: '温馨提示',
                    content: '“公开信息”授权失败，允许授权后才可进行看书、答题。点击重新授权，则可重新使用',
                    cancelText:'不授权',
                    confirmText:'授权',
                    success: res=>{
                    if (res.confirm) {
                    wx.openSetting({
                        success:function(res){
                            if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                                //这里是授权成功之后 填写你重新获取数据的js
                                console.log('auth',res);
                                wx.getUserInfo({
                                    success:function (data) {
                                        var da = JSON.parse(data.rawData);
                                        // data.rawData=JSON.parse(data.rawData)
                                        wx.setStorageSync('userInfo',data.rawData);
                                        var s = "headimg_url"+da.avatarUrl+"nickname"+da.nickName+"openid"+wx.getStorageSync('openid')+"sex1"+sign_key;
                                        var sign = util.SHA256(s);
                                        var fd = {openid:wx.getStorageSync('openid'),sex:1,'nickname':da.nickName,headimg_url:da.avatarUrl,sign:sign};
                                        console.log('addREQ',fd);
                                        wx.request({
                                            // url:"http://dev.wechat.abctime.com/v1/activity/activity/add",
                                            url:app.globalData.addUrl,
                                            data:fd,
                                            method:'POST',
                                            header: {"Content-Type": "application/x-www-form-urlencoded"},
                                            success:function (res) {
                                                if(res.data.data.phone && res.data.data.phone!=''){
                                                    wx.setStorageSync('phoneNum', res.data.data.phone);
                                                    wx.setStorageSync('grade', res.data.data.grade);
                                                };
                                                if(res.data.code==200){
                                                    // wx.navigateTo({
                                                    //     url: '../../pages/reading/reading?id='+book_id+'&openid='+open+'&source=1&cid='+book_cid+'&pic='+book_pic,
                                                    // });
                                                    canTap = true;
                                                }else if(res.data.code==8003){
                                                    // wx.navigateTo({
                                                    //     url: '../../pages/reading/reading?id='+book_id+'&openid='+open+'&source=1&cid='+book_cid+'&pic='+book_pic,
                                                    // });
                                                    canTap = true;
                                                };
                                            },
                                            fail:function (res) {
                                                console.log(res);
                                                canTap = true;
                                            }
                                        })
                                    },
                                })
                            }
                        }
                    })
                }else {
                    canTap = true;
                }
            }
            });
                canTap = true;
            }else {
                wx.navigateTo({
                    url: '../../pages/reading/reading?id='+book_id+'&openid='+open+'&source=1&cid='+book_cid+'&pic='+book_pic,
                });
            }
        }else {}
    },
    toMatch:function () {
        console.log('ph',wx.getStorageSync('phoneNum'));
        if(this.data.timeStatus==1){
            wx.showModal({
                title: '温馨提示',
                content: '初赛未开始，敬请期待！',
                showCancel: false,
                confirmText: 'OK',
                success: res=>{
                if (res.confirm) {
                }
            }
            })
            return;
        };
        if(this.data.timeStatus == 3 || wx.getStorageSync('phoneNum')){
            this.setData({modalStatus:false})
        }
        var mStatus = this.data.modalStatus;
        var that = this;
        if(mStatus) {
            this.modalShow();
        } else {
            if(canTap){
                canTap = false;
                if(this.data.timeStatus==3){
                    console.log(!wx.getStorageSync('phoneNum'))
                    if(!wx.getStorageSync('phoneNum')){
                        wx.navigateTo({
                            url: '../../pages/ad/ad'
                        })
                    }else{
                        var phone = wx.getStorageSync('phoneNum');
                        var s = "phone"+phone+sign_key;
                        var sign = util.SHA256(s);
                        var str = "?phone="+phone+"&sign="+sign;
                        wx.request({
                            url: reportUrl+str,
                            success: function (res) {
                                wx.hideLoading();
                                if(res.data.code == 200){
                                    if(wx.getStorageSync('grade')>9){
                                        wx.navigateTo({
                                            url: '../../pages/score/score?fStatus='+true+'&rank='+res.data.data.ranking+'&score='+res.data.data.score
                                        })
                                    }else if(wx.getStorageSync('grade')<=9){
                                        wx.navigateTo({
                                            url: '../../pages/score/score?fStatus='+false+'&rank='+res.data.data.ranking+'&score='+res.data.data.score+'&read_score='+res.data.data.read_score+'&select_score='+res.data.data.select_score
                                        })
                                    }
                                }else {
                                    wx.navigateTo({
                                        url: '../../pages/ad/ad'
                                    })
                                };
                            },
                            fail:function () {
                                console.log('fail')
                            }
                        })
                    }
                } else if(this.data.timeStatus!=3&&!wx.getStorageSync('phoneNum')){
                    console.log(!wx.getStorageSync('userInfo'));
                    if(!wx.getStorageSync('userInfo')){
                        wx.showModal({
                            title: '温馨提示',
                            content: '“公开信息”授权失败，允许授权后才可进行看书、答题。点击重新授权，则可重新使用',
                            cancelText:'不授权',
                            confirmText:'授权',
                            success: res=>{
                            if (res.confirm) {
                            wx.openSetting({
                                success:function(res){
                                    if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                                        //这里是授权成功之后 填写你重新获取数据的js
                                        console.log('auth',res);
                                        wx.getUserInfo({
                                            success:function (data) {
                                                var da = JSON.parse(data.rawData);
                                                // data.rawData=JSON.parse(data.rawData)
                                                wx.setStorageSync('userInfo',data.rawData);
                                                var s = "headimg_url"+da.avatarUrl+"nickname"+da.nickName+"openid"+wx.getStorageSync('openid')+"sex1"+sign_key;
                                                var sign = util.SHA256(s);
                                                var fd = {openid:wx.getStorageSync('openid'),sex:1,'nickname':da.nickName,headimg_url:da.avatarUrl,sign:sign};
                                                console.log(fd);
                                                wx.request({
                                                    // url:"http://dev.wechat.abctime.com/v1/activity/activity/add",
                                                    url:app.globalData.addUrl,
                                                    data:fd,
                                                    method:'POST',
                                                    header: {"Content-Type": "application/x-www-form-urlencoded"},
                                                    success:function (res) {
                                                        console.log(res);
                                                        if(res.data.data.phone && res.data.data.phone!=''){
                                                            wx.setStorageSync('phoneNum', res.data.data.phone);
                                                            wx.setStorageSync('grade', res.data.data.grade);
                                                        };
                                                        if(res.data.code==200){
                                                            if(res.data.data.phone && res.data.data.phone!=''){
                                                                wx.setStorageSync('phoneNum', res.data.data.phone);
                                                                wx.setStorageSync('grade', res.data.data.grade);
                                                            };
                                                            canTap = true;
                                                        }else if(res.data.code==8003){
                                                            console.log('用户已添加');
                                                            canTap = true;
                                                        };
                                                    },
                                                    fail:function (res) {
                                                        console.log(res);
                                                        canTap = true;
                                                    }
                                                })
                                            },
                                        })
                                    }
                                }
                            })
                        }else {
                            canTap = true;
                        }
                    }
                    })
                    }else {
                        wx.navigateTo({
                            url: '../../pages/register/register'
                        })
                    }
                }else if(this.data.timeStatus!=3&&wx.getStorageSync('phoneNum')&&wx.getStorageSync('phoneNum')!=''){
                    // wx.navigateTo({
                    //     url: '../../pages/match/match'
                    // })
                    // return;
                    var phone = wx.getStorageSync('phoneNum');
                    var s = "phone"+phone+sign_key;
                    var sign = util.SHA256(s);
                    var str = "?phone="+phone+"&sign="+sign;
                    var that = this;
                    wx.request({
                        url: reportUrl+str,
                        success: function (res) {
                            wx.hideLoading();
                            if(res.data.code == 200){
                                if(wx.getStorageSync('grade')>9){
                                    wx.navigateTo({
                                        url: '../../pages/score/score?fStatus='+true+'&rank='+res.data.data.ranking+'&score='+res.data.data.score
                                    })
                                }else if(wx.getStorageSync('grade')<=9){
                                    wx.navigateTo({
                                        url: '../../pages/score/score?fStatus='+false+'&rank='+res.data.data.ranking+'&score='+res.data.data.score+'&read_score='+res.data.data.read_score+'&select_score='+res.data.data.select_score
                                    })
                                }
                            }else {
                                wx.navigateTo({
                                    url: '../../pages/match/match'
                                })
                            };
                        },
                        fail:function () {
                            console.log('fail')
                        }
                    })
                }else {
                    wx.navigateTo({
                        url: '../../pages/ad/ad'
                    })
                }
            }else {

            }
        }
    },
    modalShow:function () {
       this.setData({moStatus:true});
    },
    modalHide:function () {
        this.setData({modalStatus:false,moStatus:false});
    },
    getBooks:function (cid) {
        console.log('cid',cid);
        var open = wx.getStorageSync('openid');
        var s = "cid"+cid+"openid"+open+sign_key;
        var sign = util.SHA256(s);
        var str = "?cid="+cid+"&openid="+open+"&sign="+sign;
        var that = this;
        wx.showLoading({
            title: '加载绘本..',
        });
        console.log(shelfUrl+str);
        wx.request({
            url: shelfUrl+str,
            success: function (res) {
                console.log(res);
                wx.hideLoading();
                that.setData({
                    books:res.data.data.rows
                })
            },
            fail:function () {
                console.log('fffff')
            }
        })
    },
    listenerPickerSelected: function(e) {
        //改变index值，通过setData()方法重绘界面
        this.setData({
            index: e.detail.value
        });
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      canTap = true;
      var that = this;
      wx.request({
          url: timeUrl,
          success: function (res) {
              console.log('time',res);
              var info = res.data.data;
              // console.log(info.status)
              switch (info.status){
                  case 1:
                      end = info.start_time;
                      that.setData({timeStatus:1})
                      break;
                  case 2:
                      end = info.end_time;
                      that.setData({timeStatus:2})
                      break;
                  case 3:
                      end = info.end_time;
                      that.setData({timeStatus:3})
                      break;
              }
          },
          fail:function () {
              console.log('timeStatus_fail')
          }
      });
      time = setInterval(this.countDown,1000);
  },
  countDown:function ()
    {
        var now = new Date();
        // var endDate = new Date(2018, 2, 1);
        // var leftTime=endDate.getTime()-now.getTime();
        var leftTime=end*1000-now.getTime();
        // console.log(leftTime);
        var dd = parseInt(leftTime / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
        var hh = parseInt(leftTime / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
        var mm = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟数
        var ss = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
        dd = this.checkTime(dd);
        hh = this.checkTime(hh);
        mm = this.checkTime(mm);
        ss = this.checkTime(ss);//小于10的话加0
        this.setData({c_day:dd,c_hour:hh,c_min:mm,c_sis:ss});
        if(dd=='00'&&hh=='00'&&mm=='00'&ss=='00'){
            clearInterval(time)
        }
    },
  checkTime:function(i)
    {
        if (i < 10&&i>0) {
            i = "0" + i;
        }else if(i<=0){
            i = '00';
        }
        return i;
    },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      // canTap = true;
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  //   return {
  //     title: 'ABCtime邀你来竞赛',
  //     path: '/pages/index/index',
  //     success: function (res) {
  //       // 转发成功
  //     },
  //     fail: function (res) {
  //       // 转发失败
  //     }
  //   }
  },
})