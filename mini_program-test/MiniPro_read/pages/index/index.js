var util = require('../../utils/util.js');
var app = getApp();
var sign_key = app.globalData.sign_key;
var articleUrl = app.globalData.articleUrl;
var signUrl = app.globalData.signUrl;
var memaddUrl = app.globalData.memaddUrl;
var windowWidth = app.globalData.sysWidth;
var canTap=true,bTimer,day=0,sign_num=0;
var d = new Date(),todayTime;
var today = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();
var lockArr = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
Page({
  /**
   * 页面的初始数据
   */
  data: {
    razStatus:true,
    head_img:'',
    nickname:'',
    canUnlock:false,
    articleData:[
        {visited_nums:3333,cat_name:'Level A',title:'‘Maria goes to school’',pic:''},
    ],
    artInfo:[],
    lockArr:[],
    today_min:0,
    getFirst:false,
    infoStatus:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      bTimer = setInterval(function () {
          var mem = wx.getStorageSync('memberId');
          var is_new = wx.getStorageSync('is_new');
          if(mem !=''){
              clearInterval(bTimer);
              that.getArticles()
          }
          let userInfo = wx.getStorageSync('userInfo');
          if(userInfo){
              console.log(userInfo);
              that.setData({lockArr:lockArr,head_img:JSON.parse(userInfo).avatarUrl,nickname:JSON.parse(userInfo).nickName})
          }
          if(is_new==1){
              that.setData({getFirst:true})
          }
      },200);
  },
    drawCircle:function () {
        console.log('today',todayTime);
        this.setData({today_min:parseInt(todayTime/60)})
        var ctx = wx.createCanvasContext('timeCanvas');
        ctx.setLineWidth(5*windowWidth/375)
        ctx.arc(35*windowWidth/375, 33*windowWidth/375, 27*windowWidth/375, -.5*Math.PI, (todayTime/180)*2*Math.PI-.5 * Math.PI)
        ctx.setStrokeStyle('#F5A623');
        ctx.stroke();
        ctx.draw();
    },
    goArticle:function (e) {
        if(canTap){
            canTap = false;
            var id = e.currentTarget.dataset.id;
            var flag = e.currentTarget.dataset.canUse;
            console.log(flag);
            if(flag){
                wx.navigateTo({
                    url: '../../pages/article/article?id='+id
                })
            }
        }
    },
    toRole:function () {
        wx.navigateTo({
            url: '../../pages/role/role'
        })
    },
    getArticles:function () {
        var open = wx.getStorageSync('openid');
        var member_id = wx.getStorageSync('memberId');
        var s = "member_id"+member_id+"openid"+open+sign_key;
        var sign = util.SHA256(s);
        var str = "?member_id="+member_id+"&openid="+open+"&sign="+sign;
        var that = this;
        wx.showLoading({
            title: '加载课程..',
        });
        console.log(articleUrl+str);
        wx.request({
            url: articleUrl+str,
            success: function (res) {
                console.log(res);
                wx.hideLoading();
                that.setData({articleData:res.data.data.list,artInfo:res.data.data.info})
                sign_num = res.data.data.info.sign_num;
                wx.setStorageSync('sign', sign_num);
                for(var i=0;i<sign_num+1;i++){
                    lockArr[i]=false
                };
                that.setData({lockArr:lockArr})
            },
            fail:function () {
                console.log('fffff')
            }
        })
    },
    //选择绘本
    getBooks:function (e) {
      if(canTap){
          canTap = false;
          if(!wx.getStorageSync('userInfo')){
              wx.showModal({
                  title: '温馨提示',
                  content: '“公开信息”授权失败，允许授权后才可进行阅读、查看排行榜。点击重新授权，则可重新使用',
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
                                          url:memaddUrl,
                                          data:fd,
                                          method:'POST',
                                          header: {"Content-Type": "application/x-www-form-urlencoded"},
                                          success:function (res) {
                                              if(res.data.data.id && res.data.data.id!=''){
                                                  wx.setStorageSync('memberId', res.data.data.id);
                                                  if(res.data.data.is_new){
                                                      wx.setStorageSync('is_new', 1);
                                                  }else {
                                                      wx.setStorageSync('is_new', 0);
                                                  }
                                              };
                                              if(res.data.code==200){

                                              }else{
                                                  console.log('addRES',res.data.data)
                                              }
                                              canTap = true;
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
          }else {
              var cid = e.currentTarget.dataset.cid;
              wx.setStorageSync('cid', cid);
              wx.navigateTo({
                  url: '../../pages/library/library?cid='+cid
              })
          }
      }
    },
    showInfo:function () {
        this.setData({infoStatus:true})
    },
    hideInfo:function () {
        this.setData({infoStatus:false})
    },
    getLesson:function () {
        var that = this;
        if(parseInt(wx.getStorageSync('sign'))==sign_num&&this.data.canUnlock){
            var s = 'member_id'+wx.getStorageSync('memberId')+'poenid'+wx.getStorageSync('openid')+sign_key;
            var sign = util.SHA256(s);
            // var str = "?member_id="+wx.getStorageSync('memberId')+"&openid="+wx.getStorageSync('openid')+"&sign="+sign;
            var fd={member_id:wx.getStorageSync('memberId'),openid:wx.getStorageSync('openid'),sign:sign};
            wx.request({
                url:signUrl,
                data:fd,
                // data:JSON.stringify(fd),
                method:'POST',
                header: {"Content-Type": "application/x-www-form-urlencoded"},
                success:function (res) {
                    console.log(res)
                    if(res.data.code==200) {
                        console.log(res);
                        wx.showToast({
                            title: '打卡成功',
                            icon: 'success',
                            duration: 1500
                        });
                        that.setData({canUnlock:false});
                        wx.setStorageSync(today+'ed',true);
                        for(var i=0;i<sign_num+2;i++){
                            lockArr[i]=false
                        };
                        that.setData({lockArr:lockArr})
                    }else if(res.data.code==2001){
                        wx.showToast({
                            title: '打卡成功',
                            icon: 'success',
                            duration: 1500
                        });
                        that.setData({canUnlock:false});
                        wx.setStorageSync(today+'ed',true)
                    }
                },
                fail:function (res) {
                    console.log(res)
                    canAdd = true;
                }
            })
        }
    },
    clickRaz:function () {
      this.setData({razStatus:true})
    },
    clickLesson:function () {
        if(!wx.getStorageSync('userInfo')){
            wx.showModal({
                title: '温馨提示',
                content: '“公开信息”授权失败，允许授权后才可进行阅读、查看排行榜。点击重新授权，则可重新使用',
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
                                        url:memaddUrl,
                                        data:fd,
                                        method:'POST',
                                        header: {"Content-Type": "application/x-www-form-urlencoded"},
                                        success:function (res) {
                                            if(res.data.data.id && res.data.data.id!=''){
                                                wx.setStorageSync('memberId', res.data.data.id);
                                                if(res.data.data.is_new){
                                                    wx.setStorageSync('is_new', 1);
                                                }else {
                                                    wx.setStorageSync('is_new', 0);
                                                }
                                            };
                                            if(res.data.code==200){

                                            }else{
                                                console.log('addRES',res.data.data)
                                            }
                                            canTap = true;
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
        }else {
            this.setData({getFirst:false})
            this.getArticles()
            todayTime = parseInt(wx.getStorageSync(today)/1000);
            console.log(todayTime);
            this.drawCircle();
            // if(todayTime>=30){
            if(todayTime>=180&&!wx.getStorageSync(today+'ed')){
                this.setData({canUnlock:true})
            }else {
                this.setData({canUnlock:false})
            }
            this.setData({razStatus:false})
        }
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
  onShareAppMessage: function (res) {
      return {
          title: '海量绘本，纯正美式发音，等你来读',
          path: '/pages/index/index?to=index',
          imageUrl:'/images/index/share_index.png',
          success: function(res) {
              console.log(res);
          },
          fail: function(res) {
              console.log(res);
          }
      }
  }
})