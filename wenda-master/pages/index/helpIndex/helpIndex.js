import {GET,POST,promisify} from '../../../libs/request.js';
import {server, imgServer, wxappServer } from '../../../libs/config.js';
var mta = require('../../../libs/mta_analysis.js');
var pageNum = 1;
var totalPage = 1;
var listArr = [];
var app = getApp();
Page({
  data: {
      userInfo: {},
      pageImg:{
        bubbleBig:"../../../images/bubble-big.png",
        sound:"../../../images/sound.png",
        toSolve:"../../../images/to-solve.png",
        bg:"../../../images/BG2.png",
        smile:"../../../images/cute.png",
        close:"../../../images/wrong.png"
      },
      list: [
        // {
        //   id:1,
        //   price:22,
        //   clockDesc:'6566',
        //   content:'123',
        //   userCount:5,
        //   answerCount:33,
        //   idfy:0
        // }
      ],
      empty:false,
      nomore:false,
      animationData: {},
      headImg: "../../../images/person_s.png",
      dataEmpty: "../../../images/noAuth.png",
      fromPage:'',
      isShare:'',
      isSolvedPage:1,
      title:{
        presons:'',
        questions: '',
        avgTime: '',
        avgMoney: ''
      },
      ifShowRule:false,
      lock:false
  },
  onReachBottom: function () {
    this.getData();
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },
  scroll: function(e){
    //console.log(e)
  },
  onLoad: function (options) {
    mta.Page.init();
    if(options.helpId){
      app.globalData.helpId = options.helpId
    }
    this.setData({
      fromPage: options.fromPage
    })
    this.setData({
      isShare: options.isShare
    })
  },
  onShareAppMessage: function () {
    //return hotapp.onShare(this, '群通知', '微信群内好用的群通知工具，赶快来体验一下吧!');
    return {
      title: '问技',
      desc: '问技好用的求助工具,赶快来体验一下吧!',
      path: '/pages/index/helpIndex/helpIndex?isShare=self'
    }
  },
  showRules(){
    this.setData({
      ifShowRule:true
    })
  },
  hideRules(){
    this.setData({
      ifShowRule:false
    })
  },
  publishEv: function() {
      //hotapp.onEvent('entersignCardPublish');
    //   wx.redirectTo({
    //   url: '../helpIndex/helpIndex'
    // })
    //  if(this.data.fromPage=="b"){
    //   wx.navigateBack({
    //     delta: 2, // 回退前 delta(默认为1) 页面
    //   });
    //   }else{
      mta.Event.stat("indexask",{})
      wx.navigateTo({
        url: '../helpPublish/helpPublish'
      })
  },
  detailEv(e){
      var id = e.currentTarget.dataset.id;
      app.globalData.helpId = id;
      wx.navigateTo({
        url: '../helpDetail/helpDetail?helpId='+id
      })
  },
  // solveEv: function(e) {
  //     var id = e.currentTarget.dataset.id;
  //     app.globalData.helpId = id;
  //     wx.navigateTo({
  //       url: '../helpDetail/helpDetail?helpId='+id
  //     })
  // },
  toSolved(){
    if(this.data.isSolvedPage||this.data.lock)return;
    pageNum = totalPage = 1;
    listArr = [];
    this.setData({
      isSolvedPage:1,
      list:[],
      empty:false,
      nomore:false
    })
    this.getData();
  },
  toUnSolved(){
    mta.Event.stat("indexshowunsolved",{});
    if(!this.data.isSolvedPage||this.data.lock)return;
    pageNum = totalPage = 1;
    listArr = [];
    this.setData({
      isSolvedPage:0,
      list:[],
      empty:false,
      nomore:false
    })
    this.getData();
  },
  getInfo(){
    var that = this;
    var sid = app.globalData.sid;
    wx.request({
      url: wxappServer + "help/square/anlysis?&sid=" + sid,
      method: 'GET',
      "content-type": "application/x-www-form-urlencoded", 
      success: function(data){
        if (data.data.suc == '100') return;
        else if (data.data.suc == '200') {
          var subData = data.data.data;
          that.setData({
            title:subData
          })
        }
      }
    })
  },
  getData: function() {
    if (pageNum > totalPage) return;
    var that = this;
    // that.setData({
    //     hidden: false
    //   })
    var sid = app.globalData.sid;
    var done = this.data.isSolvedPage?3:2;
    if(this.data.lock)return;
    this.setData({
      lock:true
    })
    wx.request({
      url: wxappServer + "help/indexView?pageSize=10&pageNum="+pageNum+"&sid=" + sid+"&done="+done,
      method: 'GET',
      "content-type": "application/x-www-form-urlencoded", 
      success: function(data){
        that.setData({
          lock:false
        })
       if (data.data.suc == '100') return;
       else if (data.data.suc == '200') {
       var subData = data.data.data;
       totalPage = subData.lastPage;
       var dataList = subData.list;
       var tempArr = [];
       for (let i = 0;i < dataList.length;i++) {
          var tempObj = {
            id:dataList[i].id,
            creatorImg:imgServer + 'waheadimg/' + dataList[i].creatorImg,
            creatorName:dataList[i].creatorName,
            content:dataList[i].content,
            amount:dataList[i].amount/100,
            createTime:dataList[i].createTime,
            firstAskTime:dataList[i].firstAskTime,
            isPrivate:dataList[i].isPrivate,
            helpType:dataList[i].helpType,
            status:dataList[i].status,
            voiceDuration:dataList[i].voiceDuration,
          }
          if (dataList[i].creatorId == app.globalData.userId) {
            tempObj.idfy = 0;
          }
          else {
            tempObj.idfy = 1;
          }
          tempArr.push(tempObj);
          //listArr.push(tempObj);
       }
       if (pageNum == 1 && subData && dataList && dataList.length == 0) {
        that.setData({
          empty: true
        });
       }
      //  that.setData({
      //     //hidden: true,
      //     list: listArr,
      //   });
        that.getReminTime(tempArr);
        pageNum++;
        if (pageNum > totalPage){
          that.setData({
            nomore: true
          });
        }
       }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
    getReminTime(arr) {
      var that = this;
      if(this.data.isSolvedPage){
        arr.map((item, index) => {
            if (item.status === 3 || item.status === 4) {
                item.clockRes = "已解决";
                if((item.firstAskTime - item.createTime) >= 3600) {
                    let reminTime = Math.round((item.firstAskTime - item.createTime) / 3600);
                    item.clockDesc = `${reminTime}小时内抢答`;
                }else if((item.firstAskTime - item.createTime) < 0){

                } else {
                    let reminTime = Math.round((item.firstAskTime - item.createTime) / 60);
                    if(reminTime<1){
                      reminTime=1;
                    }
                    item.clockDesc = `${reminTime}分钟内抢答`;
                }
            }else {
                item.clockRes = "未解决";
            }
        });
      }else{
        let EXPIRE_S = 172800;
        let nowTime = parseInt(Date.now() / 1000);
        arr.map((item, index) => {
            if (item.status === 2) {
                if((EXPIRE_S + item.createTime - nowTime) >= 3600) {
                    let reminTime = Math.round((EXPIRE_S + item.createTime - nowTime) / 3600);
                    item.clockDesc = `剩余${reminTime}小时`;
                }else if((EXPIRE_S + item.createTime - nowTime) < 0){

                } else {
                    let reminTime = Math.round((EXPIRE_S + item.createTime - nowTime) / 60);
                    if(reminTime<1){
                      reminTime=1;
                    }
                    item.clockDesc = `剩余${reminTime}分钟`;
                }
            }
        });
      }
      listArr = listArr.concat(arr);
      //listArr.push(arr);
      console.log(listArr)
      this.setData({
        list: listArr
      })
    },
    onShow: function () {
      pageNum = totalPage = 1;
      listArr = [];
      this.setData({
        isSolvedPage:1,
        list:listArr,
        empty:false,
        nomore:false
      })
      var that = this;

      //调用应用实例的方法获取全局数据
      // app.getUserInfo(function(userInfo){
      //   //更新数据
      //   that.setData({
      //     userInfo:userInfo
      //   })
      // })
      app.login(function(){
        that.getData();
        that.getInfo();
      }, this);
      //this.getData();
    }
})
