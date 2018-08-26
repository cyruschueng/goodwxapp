// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msglist:[],
    qa_begin:0,
    qa_function:null,
    type_id:0,
    input_question:'',
    scrollTop:0,
    hidden:true,
    inputVal:'',
    num_option:'1234567891011',
    nickName:'',
    avatarUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
        })
      },
      fail: function (res) {
        that.setData({
          nickName: '尊敬的用户',
          avatarUrl: '../../images/头像.png',
        })
      },
      complete: function(res){
        that.welcome();
      }
    });
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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
  
  },

  arrayFindString:function(arr,string)
  { 
    var str = arr.join(""); 
    return str.indexOf(string); 
  },

  scrollDown:function(len){
    var that = this;
    that.setData({
      scrollTop: this.data.scrollTop + len
    });
  },

  send:function(e){
    var that = this;
    console.log(this.data.num_option.indexOf(e.detail.value.msg));
    if(e.detail.value.msg.length > 0){
        var msg = { 'type': 0, 'msg': e.detail.value.msg}
        var msglist = this.data.msglist;
        msglist.push(msg);
        this.setData({
          msglist:msglist,
          hidden: false,
          inputVal: e.detail.value.msg,
          inputVal: ''
        });
        that.scrollDown(100)
        if (this.data.qa_begin == 1 && this.data.num_option.indexOf(e.detail.value.msg) > -1) {
          this.setData({
            type_id: e.detail.value.msg,
            qa_function: that.ask_question
          });
          this.scrollDown(500);
          
          
        }
        else if (this.data.qa_begin == 2) {
          this.setData({
            input_question: e.detail.value.msg,
            qa_function: that.get_similar_qa
          });
          that.scrollDown(800);
          
        }
        else if (this.data.qa_begin == 4) {
          if (e.detail.value.msg=="科室"){
            this.setData({
              qa_function: that.welcome

            });
            }
          else{
            this.setData({
              qa_function: that.get_similar_qa
            });
          }
          that.scrollDown(800);
        }
        else{
          this.setData({
            qa_function: that.error
          });
        }
        this.data.qa_function();
      }
    },

  

  welcome:function(){
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:5000/hello',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        user_name: that.data.nickName,
      },
      method: 'POST',
      success: function (res) {
        var msg = { 'type': 1, 'msg': res.data }
        var msglist = that.data.msglist;
        msglist.push(msg);
        that.setData({
          msglist: msglist
        });
      },
    })   
    wx.request({
      url: 'http://127.0.0.1:5000/type',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var msg = { 'type': 1, 'msg': res.data }
        var msglist = that.data.msglist;
        msglist.push(msg);
        that.setData({
          msglist: msglist,
          qa_begin:1,
          hidden: true
        });
        that.scrollDown(500); 
      },
      
    })
    
  },

  ask_question: function () {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:5000/ask',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var msg = { 'type': 1, 'msg': res.data }
        var msglist = that.data.msglist;
        msglist.push(msg);
        that.setData({
          msglist: msglist,
          qa_begin:2,
          hidden: true
        });
        that.scrollDown(200); 
      }
    })
  },

  get_similar_qa: function () {
    var that = this;
    console.log(that.data.type_id)
    wx.request({
      url: 'http://127.0.0.1:5000/get_qa',
      data: {
        key_option:that.data.type_id,
        q_file:that.data.input_question,
        user_name: that.data.nickName
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if(res.statusCode == 200){
          var msg = { 'type': 1, 'msg': res.data }
          var msglist = that.data.msglist;
          msglist.push(msg);
          
          that.setData({
            msglist: msglist,
            qa_begin: 3,
            hidden: true
          });
          that.scrollDown(200);
          that.back_to_first();
          }
        else if(res.statusCode == 400){
          var msg = { 'type': 1, 'msg': res.data }
          var msglist = that.data.msglist;
          msglist.push(msg);

          that.setData({
            msglist: msglist,
            hidden: true
          });
          that.scrollDown(200);
        }
      }
    })
  },

  back_to_first: function () {
    var that = this;
    console.log(that.data.type_id)
    wx.request({
      url: 'http://127.0.0.1:5000/return',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var msg = { 'type': 1, 'msg': res.data }
        var msglist = that.data.msglist;
        msglist.push(msg);

        that.setData({
          msglist: msglist,
          qa_begin: 4,
          hidden: true
        });
        that.scrollDown(200);
      }
    })
  },

  error: function () {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:5000/error',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        
        var msg = { 'type': 1, 'msg': res.data }
        var msglist = that.data.msglist;
        msglist.push(msg);
        
        that.setData({
          msglist: msglist,
          hidden: true
        });
        that.scrollDown(200);
      }
    })
  }  
  
  
}) 
  