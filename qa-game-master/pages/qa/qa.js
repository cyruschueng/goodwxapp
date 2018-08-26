const host = require('../../utils/data.js').host;
const nIndex = require('../../utils/data.js').nIndex;
const app_recover_share_icon = require('../../utils/data.js').app_recover_share_icon;
const app = getApp();
Page({
  data: {
    avatarUrl:wx.getStorageSync('avatarUrl'),
    nickName:wx.getStorageSync('nickName'),
    resultShow:false,
    showRight:false,
    qaIndex:0,
    time:12,
    timer:null,
    list:[],
    question:"",
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    result:true,
    qaId:'',
    chooseArr:[],
    needGzh:1
  },
  onLoad() {
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.showLoading();
    var param={
      'openId':wx.getStorageSync('openId')
    }
    wx.request({
      url: host + '/api/challenge', // 目标服务器 url
      dataType: 'json',
      method: 'POST',
      data: param,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync('token')
      },
      success: (res) => {
        var res = res.data;
        console.log(res.data)
        this.setData({
          list:res.data
        })
        this.showQA();
      },
      fail: (res) => {

      },
      complete: (res) => {
        wx.hideLoading();
      }
    });
  },
  /*onShow:function(){
    wx.showLoading();
    var param={
      'openId':wx.getStorageSync('openId')
    }
    wx.request({
      url: host + '/api/challenge', // 目标服务器 url
      dataType: 'json',
      method: 'POST',
      data: param,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync('token')
      },
      success: (res) => {
        var res = res.data;
        console.log(res.data)
        this.setData({
          list:res.data,
          resultShow:false,
          showRight:false,
          myAnswerRight:0,
          myAnswerError:0
        })
        this.showQA();
      },
      fail: (res) => {

      },
      complete: (res) => {
        wx.hideLoading();
      }
    });
  },*/
  onHide:function(){

  },
  showQA:function(){
    var self = this;
    var index = self.data.qaIndex;
    if(index>11){
      self.submitChallenge(true);
      return false;
    }else{
      self.setData({
        qaId:this.data.list[index].id,
        time:this.data.list[index].answerTime,
        question:this.data.list[index].title,
        option1:this.data.list[index].option1,
        option2:this.data.list[index].option2,
        option3:this.data.list[index].option3,
        option4:this.data.list[index].option4,
        answer:this.data.list[index].answer
      })
    }
    clearInterval(self.data.timer);
    self.data.timer = setInterval(function(){
      if(self.data.time>0){
        self.data.time--;
        self.setData({
          time:self.data.time
        })
      }else{
        clearInterval(self.data.timer);
        var answer = self.data.answer;
        var arr = self.data.chooseArr,obj={};
        obj.qId = self.data.qaId;
        obj.result = false;
        arr.push(obj);
        console.log(arr)
        /*if(index>3&&index<7){
          self.isNeedGzh();
        }else{
          self.setData({
            needGzh:1
          })
        }*/
        self.setData({
          resultShow:true,
          myAnswerRight:answer,
          chooseArr:arr
        })

        if(index>7){
          self.submitChallenge(false);
        }
      }
    },1000);

  },
  closeBtn:function(){
    this.submitChallenge(false);
  },
  chooseOne:function(e){
    var self = this;
    clearInterval(self.data.timer);
    var index = e.currentTarget.dataset.index;
    var answer = self.data.answer;
    var qaIndex = self.data.qaIndex;
    if(answer == index){
      self.setData({
        result:true,
        myAnswerRight:answer,
        showRight:true
      })
      setTimeout(function(){
        self.setData({
          showRight:false,
          myAnswerRight:0,
          myAnswerError:0
        })
        self.addOne();
      },1000)

      wx.playBackgroundAudio({
        dataUrl: 'http://7xq41n.com1.z0.glb.clouddn.com/%E7%AD%94%E5%AF%B9.mp3',
        title: '',
        coverImgUrl: ''
      })

    }else{
      /*if(qaIndex>3&&qaIndex<7){
        self.isNeedGzh();
      }else{
        self.setData({
          needGzh:1
        })
      }*/

      wx.playBackgroundAudio({
        dataUrl: 'http://7xq41n.com1.z0.glb.clouddn.com/%E7%AD%94%E9%94%99.mp3',
        title: '',
        coverImgUrl: ''
      })

      self.setData({
        result:false,
        resultShow:true,
        myAnswerRight:answer,
        myAnswerError:index
      })
      if(qaIndex>7){
        self.submitChallenge(false);
      }
    }
    var arr = self.data.chooseArr,obj={};
    obj.qId = self.data.qaId;
    obj.result = self.data.result;
    arr.push(obj);
    console.log(arr)
    self.setData({
      chooseArr:arr
    })
  },
  addOne:function(){
    var self = this;
    var qaIndex = self.data.qaIndex+1;
    self.setData({
      qaIndex:qaIndex
    })
    self.showQA();
  },
  isNeedGzh:function(){
    var self = this;
    var param = {
      openId:wx.getStorageSync('openId')
    }
    wx.showLoading();
    wx.request({
      url: host + '/api/isAtten', // 目标服务器 url
      dataType: 'json',
      data:param,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync('token')
      },
      success: (res) => {
        var isNeed = res.data.data;
        self.setData({
          needGzh:isNeed
        })
      },
      fail: (res) => {

      },
      complete: (res) => {
        wx.hideLoading();
      }
    });
  },
  btnGzh:function(){
    var self = this;
    var param = {
      openId:wx.getStorageSync('openId')
    }
    //wx.showLoading();
    wx.request({
      url: host + '/api/atten', // 目标服务器 url
      dataType: 'json',
      data:param,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync('token')
      },
      success: (res) => {
        self.setData({
          resultShow:false,
          showRight:false,
          myAnswerRight:0,
          myAnswerError:0
        })
        self.addOne();
      },
      fail: (res) => {

      },
      complete: (res) => {
        //wx.hideLoading();
      }
    });
  },

  submitChallenge:function(tf){

    // if (!tf) {
    //   wx.playBackgroundAudio({
    //     dataUrl: 'http://7xq41n.com1.z0.glb.clouddn.com/%E5%A4%B1%E8%B4%A5%20%E9%9F%B3%E6%95%88%20%E5%8A%A0%E9%80%9F%E8%BF%87%E7%9A%84%20%E7%94%A8%E8%BF%99%E4%B8%AA.mp3',
    //     title: '',
    //     coverImgUrl: ''
    //   })
    // }

    var self = this;
    var param = {
      openId:wx.getStorageSync('openId'),
      result:tf,
      detail:JSON.stringify(this.data.chooseArr)
    }
    wx.showLoading();
    wx.request({
      url: host + '/api/submitChallenge', // 目标服务器 url
      dataType: 'json',
      data:param,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync('token')
      },
      success: (res) => {
        console.log(tf)
        if(!tf){
           wx.redirectTo({
            url:"/pages/fail/fail?qaIndex=" + self.data.qaIndex
          })
        }else{
          wx.redirectTo({
            url:"/pages/success/success"
          })
        }
      },
      fail: (res) => {

      },
      complete: (res) => {
        wx.hideLoading();
      }
    });
  },
  onShareAppMessage: function () {
    var self = this;
    var that = this
    var qaIndex = self.data.qaIndex;
    var openId = wx.getStorageSync('openId');
    var title = '['+wx.getStorageSync('nickName')+"@我"+']'+'你有一款王者荣耀皮肤可以免费领取！赶紧去领取!'

    return {
      title: title,
      imageUrl: app_recover_share_icon,
      path: '/pages/index/index?recommendOpenId=' + openId,
      success:function(e){
        var tickets = e.shareTickets
        if(tickets){
          console.log(e)
          if (tickets.length>0) {
            var firstTicket = tickets[0]
            wx.getShareInfo({
              shareTicket: firstTicket,
              success: (res) => {
                console.log(res)
                that.receiptReviveShareSuccess(firstTicket, res.iv, res.encryptedData)
              },
            })
          }
        }else{
          wx.showModal({
            title: '提示',
            content: "请转发到群！",
            showCancel:false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    }
  },

  receiptReviveShareSuccess: function (ticket, iv, encryptedData) {
    var paramVal={
      'openId':wx.getStorageSync('openId')
    }
    if (ticket) {
      paramVal.groupOpenId = ticket
    }
    if (iv) {
      paramVal.iv = iv
    }
    if (encryptedData) {
      paramVal.encryptedData = encryptedData
    }

    var that = this;
    wx.request({
      url: host + '/api/reviveShare', // 目标服务器 url
      dataType: 'json',
      method: 'POST',
      data: paramVal,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync("token")
      },
      success: (res) => {
        console.log(res);
        if(res.data.error == 0){

          that.setData({
            resultShow:false,
            showRight:false,
            myAnswerRight:0,
            myAnswerError:0
          })
          that.addOne();

          // that.wetoast.toast({
          //     title: res.data.msg,
          //     duration: 2000
          // })
        }else{
          // 回执失败
          if (res.data.msg) {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel:false,
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      },
      fail: (res) => {

      },
      complete: (res) => {
        //wx.hideLoading();
      }
    });
  },

});
