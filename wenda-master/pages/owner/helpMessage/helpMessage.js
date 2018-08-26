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
        smile:"../../../images/cute.png"
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
        person:'',
        questions: '',
        time: '',
        money: ''
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
      wx.navigateTo({
        url: '../helpPublish/helpPublish'
      })
  },
  detailEv(e){
      if(this.data.isSolvedPage){
        if(e.currentTarget.dataset.unread){
          this.setIsRead(e.currentTarget.dataset.id)
        }

        if(e.currentTarget.dataset.category==6){
          mta.Event.stat("messageclickevaluate",{})
        }else if(e.currentTarget.dataset.category==1){
          mta.Event.stat("messageclickadopt",{})
        }else if(e.currentTarget.dataset.category==2){
          mta.Event.stat("messageclickbeiadopt",{})
        }
        
        var helpId = e.currentTarget.dataset.helpid;
        app.globalData.helpId = helpId;
        wx.navigateTo({
          url: '../../index/helpDetail/helpDetail?helpId='+helpId
        })
      }
  },
  solveEv: function(e) {
      var helpid = e.currentTarget.dataset.helpid;
      app.globalData.helpId = helpid;
      wx.navigateTo({
        url: '../helpCommit/helpCommit?helpId='+helpId
      })
  },
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
      url: wxappServer + "help/indexViewTotal?&sid=" + sid,
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
    var done = this.data.isSolvedPage?1:2;
    var data = {pageNum, pageSize:10, sid, "type":done}
    if(this.data.lock)return;
    this.setData({
      lock:true
    })
    wx.request({
      url: wxappServer + "help/groupnotice/getlist",
      data: data,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
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
          var item = dataList[i];
                    console.log(item)
          var tempObj = {
            id:item.id,
            helpId:item.helpId==null?item.content.helpId:item.helpId,
            comment:item.comment,
            helpType:item.help==null?2:item.help.helpType,
            createTime:item.createTime,
            category:item.category,
            content:item.help==null?item.content.content:item.help.content,
            voiceDuration:item.help==null?null:item.help.voiceDuration,
            unRead:(item.isSign==1&&item.readTime==null),
            remarks:item.remarks
          }
          if(item.content!=null){
            tempObj.amount = app.globalData.userId==item.content.userId?item.content.amount/100:item.content.shareAmount/100
          }
          // if (dataList[i].creatorId == app.globalData.userId) {
          //   tempObj.idfy = 0;
          // }
          // else {
          //   tempObj.idfy = 1;
          // }
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
        arr.map((item, index) => {
            var time = new Date(item.createTime*1000);
            var m = (time.getMonth()+1<10)?"0"+(time.getMonth()+1):time.getMonth()+1;
            var d = time.getDate()<10?"0"+time.getDate():time.getDate();
            var h = time.getHours()<10?"0"+time.getHours():time.getHours();
            var mm = time.getMinutes()<10?"0"+time.getMinutes():time.getMinutes();
            item.timeDesc = m+'-'+d+'  '+h+':'+mm;

            if(this.data.isSolvedPage){
              if(item.category==1){
                item.desc = "去采纳";
              }else if(item.category==2){
                item.desc = "红包金额："+item.amount+"元";
              }
            }else if(item.remarks!=null){
              item.desc = item.remarks;
            }else{
              item.desc = '';
            }
        });
      
      listArr = listArr.concat(arr);
      //listArr.push(arr);
      console.log(listArr)
      this.setData({
        list: listArr
      })
    },
    setIsRead(id){
      wx.request({
        url: wxappServer + "help/groupnotice/isread",
        data: {id, 'sid':app.globalData.sid},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "content-type": "application/x-www-form-urlencoded"
        }, // 设置请求的 header
      })
    },
    onShow: function () {
      pageNum = 1;
      totalPage = 1;
      listArr = [];
      this.setData({
        list: listArr
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
      }, this);
      //this.getData();
    }
})
