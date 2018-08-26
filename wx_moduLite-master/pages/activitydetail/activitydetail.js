// activitydetail.js
var WxParse = require('../../components/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    activity: {
      // id: "10",
      // image: "http:\/\/img.weiye.me\/zcimgdir\/album\/file_591168c15d03c.jpg",
      // title: "【PSA 展览】巴克利希腊多西建筑回顾展",
      // limits: "100",
      // joined: "56",
      // joinedList: ["http:\/\/img.weiye.me\/zcimgdir\/album\/file_591168c15d03c.jpg"],
      // fee: "免费",
      // time: "2017-09-27,11:00-16:00,周二",
      // address: "上海当代艺术博物馆",
      // description: "上海当代艺术博物馆于2017年7月29日至10月29日期间举办印度著名建筑师、规划师、学者兼机构创建者巴克里希纳•多西（Balkrishna Doshi,1927- ）在中国地区的首次大型个展“栖居的庆典 真实 · 虚拟 · 想像——巴克里希纳•多西建筑回顾展”。",
    },
    comments:[],  // 问答列表数据 
    followHeart: '../../pictures/follow-ico.png',
    followOption: 'addFollow',  // 点击关注成功后，方法名变更，再次点击将执行其他方法
    followed_id: null , // 存储点击收藏后返回的收藏数据Id
    followtxt: '收藏',
    showbox: 'hide',
    showform: 'hide',
    value: '', // 评论框值
    current: '', // 问答列表加载中
    formList: [], // 报名需要的表单信息
    formloading: false,
    picker_index: 1,
    formRule: [ // 报名表单input和picker配置
      { 'id': 1, 'name': 'name', 'label': '姓名', 'tmp': 'input', 'type': 'text'},
      { 'id': 2, 'name': 'phone', 'label': '手机号', 'tmp': 'input', 'type': 'number'},
      { 'id': 3, 'name': 'email', 'label': '邮箱', 'tmp': 'input', 'type': 'text'},
      { 'id': 4, 'name': 'sex', 'label': '性别', 'tmp': 'picker', 'range': ["男","女","保密"]},
      { 'id': 5, 'name': 'age', 'label': '年龄', 'tmp': 'input', 'type': 'number' },
      { 'id': 6, 'name': 'wechat', 'label': '微信', 'tmp': 'input', 'type': 'text' },
      { 'id': 7, 'name': 'qq', 'label': 'QQ', 'tmp': 'input', 'type': 'number' },
      { 'id': 8, 'name': 'useraddress', 'label': '联系地址', 'tmp': 'input', 'type': 'text' },
      { 'id': 9, 'name': 'company', 'label': '工作单位', 'tmp': 'input', 'type': 'text' },
      { 'id': 10, 'name': 'position', 'label': '职位', 'tmp': 'input', 'type': 'text' },
      { 'id': 11, 'name': 'education', 'label': '学历', 'tmp': 'picker', 'range': ["专科","本科","硕士及以上","其他"] },
      { 'id': 12, 'name': 'hobby', 'label': '爱好', 'tmp': 'input', 'type': 'text' },
      { 'id': 13, 'name': 'blood', 'label': '血型', 'tmp': 'picker', 'range': ["A","B","O","AB","神秘血统"] },
    ],
    picker_value: {}, // 页面初始化时候，报名表单中picker的初始值
    userAddress: "",  // 用户地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      id: options.id
    })

    // 加载活动基本信息
    this.loadActivity();
    
    // 加载活动问答信息
    this.loadcomments();

    // 加载报名表单数据
    this.loadForm();

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadActivity(function(){
      wx.stopPullDownRefresh()
    })
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
    return {
      title: this.data.activity.title
    }
  },

  /**
   * =================================== 自定义方法 ===================================
   */

  /**
   * 加载活动基本信息
   */
  loadActivity: function(callback){
    var that = this;

    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: app.globalData.url + "/admin/activity/activity_detail",
      data: { "id": that.data.id , 'openid': app.globalData.openid},
      success: function (res) {
        wx.hideLoading();
        var data = res.data[0]

        data.fee = data.fee == 0 ? "免费" : data.fee + "元";
        data.percent = parseFloat(data.joined / data.limits * 100);
        data.des = data.description.split('\n');
        
        that.setData({
          activity: data,
        })
        // console.log(data.content)

        WxParse.wxParse('moduContent', 'html', that.data.activity.content, that, 0);

        that.Isfollowed();

        typeof callback == 'function' && callback(res)
      }
    })
  },



/**
 * 加载活动问答信息列表
 */
  loadcomments: function(){
    var that = this;
    
    wx.request({
      url: app.globalData.url + '/admin/wx/act_commentlist',
      data: { 'act_id': that.data.id, 'current': that.data.current },
      success: function(res){
        var data = res.data || [];

        var comments = that.data.comments.concat(data)
        if (comments.length > 0)
        that.setData({
          comments: comments,
          current: comments[comments.length - 1].id || ''
        })
      }
    })

  },


  /**
   * 点击收藏
   * 调用util方法
   */
  addFollow: function () {
    var that = this;
    var config = {
      'resourceid': this.data.id,
      'type': '3'
    }
    that.setData({
      followHeart: '../../pictures/followed.png',
      followOption: ''
    })

    util.toFollow(config, function (res) {
      wx.showToast({
        title: '收藏成功',
        duration: 500
      })

      if (res.data) {
        that.setData({
          followed_id: res.data.id,
          followOption: 'removeFollow',
          followtxt: '已收藏'
        })
      }
    }, function () {
      that.setData({
        followHeart: '../../pictures/follow-ico.png',
        followOption: 'addFollow'
      })
    })
  },


  /**
   * 取消收藏
   * 主要数据： 被收藏数据的Id
   */
  removeFollow: function () {
    var that = this;
    var id = that.data.followed_id;

    that.setData({
      followHeart: '../../pictures/follow-ico.png',
      followOption: ''
    })
    util.unFollow(id, function (res) {
      wx.showToast({
        title: '已取消',
        duration: 500
      })
      that.setData({
        followOption: 'addFollow',
        followtxt: '收藏'
      })
    }, function () {
      that.setData({
        followHeart: '../../pictures/followed.png',
        followOption: 'removeFollow'
      })
    })

  },


  /**
   * 活动是否已经收藏的判断
   */
  Isfollowed: function () {

    var collect = this.data.activity.collect;

    if (collect == 1) {
      var followedid = this.data.activity.collectid;
      // 已经收藏
      this.setData({
        followed_id: followedid,
        followOption: 'removeFollow',
        followHeart: '../../pictures/followed.png',
        followtxt: '已收藏'
      })
    }
  },



  /**
   * sendThought提交评论内容
   */
  sendThought: function (e) {
    var that = this;
    var user = app.globalData.userInfo;

    if (!user) {
      app.getUserInfo();
    }

    var data_ = {
      act_id: that.data.id,
      content: that.data.value,
      openid: app.globalData.openid,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
    }
    if (data_.content == '') {
      return;
    }
    wx.request({
      url: app.globalData.url + "/admin/wx/act_comment",
      data: data_,
      method: 'POST',
      success: function (res) {
        // 评论成功，返回本条评论数据

        wx.showToast({
          title: '发送成功！',
          duration: 800
        });

        // 显示已发送的评论
        that.showSendedInfo(res.data)
        that.closeComments();
      },
      fail: function () {
        wx.showToast({
          title: '网络出错，请重试',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },


/**
 * 发送成功，将提问内容显示在页面第一条
 */
  showSendedInfo: function (data) {
    data.thumb = 0;
    var list = this.data.comments;

    list.unshift(data);
    this.setData({
      comments: list
    })
  },


  /**
   * areaInput输入事件
   */
  areaInput: function (e) {
    this.setData({
      value: e.detail.value
    })
  },


/**
 * 加载报名表单，并显示
 */
loadForm: function(){
  var that = this;

  wx.request({
    url: app.globalData.url + '/admin/activity/joinactivity',
    data: {'id': that.data.id},
    success: function(res){
      var list = res.data; // 表示需要收集的表单信息
      var formRule = that.data.formRule;
      
      // result中间过度数据
      var result = []
      for(var i=0; i<list.length; i++){
        var cof = {
          label: list[i].split("=")[0],
          name: list[i].split("=")[1],
        }
        result.push(cof)
      }

      // format
      var format = {};
      for(var i in result){
        format[result[i].name] = result[i].label
      }

      // 表单规则匹配
      // picker数据初始化
      var f_rule = [],
          init_picker = {};

      for (var i in formRule) {
        for (var j in result) {
          if (formRule[i].name == result[j].name){
            if(formRule[i].tmp == 'picker'){
              formRule[i].rangeCurrent = formRule[i].range[0]

                init_picker[formRule[i].name] = formRule[i].range[0]

            }
            f_rule.push(formRule[i])
          }
        }
      }

      // formList: [{'label': '姓名', 'name': 'name'}]
      that.setData({
        formList: f_rule,
        formList_format: format,   // 作用是最终提交数据的“：”拼接
        picker_value: init_picker  // 作用是初始化表单中的picker
      })

    }
  })

},

/**
 * picker_change报名表单中picker改变，更新数据
 */
  picker_change: function(e){
    var that = this;
    var name = e.currentTarget.dataset.event; // 该picker字段名
    var index = e.detail.value; // 选中的range值索引
    var formlist = that.data.formList;
    var pickervalue = that.data.picker_value;

    for (var i in formlist){
      if(formlist[i].name == name){
        pickervalue[name] = formlist[i].range[index];
        formlist[i].rangeCurrent = formlist[i].range[index];

        that.setData({
          picker_value: pickervalue,
          formList: formlist
        })
        return;
      }
    }
  },


/**
 * 提交表单
 */
formsubmit: function(e){
  var that = this;
  var formId = e.detail.formId; // 获取formId准备下发模板消息
  // loading
  var result = e.detail.value;
  result = util.merger(result, that.data.picker_value)
  
  console.log(result)
  var cof = {};
  var format = that.data.formList_format;
  
  var bl_ = []

  for(var i in result){
    // 为空验证
    if(result[i] == ''){
      wx.showToast({
        title: '请填写'+ format[i],
        icon: 'loading',
        duration: 500
      })
      return;
    }else{
    }
    cof[i] = format[i] + "：" + result[i]
  }
  
  // 格式验证，是否通过继续执行以下提交
  for(var i in result){
    var l = that.rule_formCheck(i, result[i])
    // console.log(l)
    if(!l)
    return;
  }
  
  //
  this.setData({
    formloading: true
  })
  var data = util.merger(cof,{
      act_id: that.data.id,
      openid: app.globalData.openid,
      formid: formId
  })
  // console.log(data)

  // 报名表单提交
  wx.request({
    url: app.globalData.url + '/admin/activity/act_infogather',
    data: data,
    method: 'POST',
    success: function(res){
        that.formreset();
        wx.showModal({
          title: '提示',
          content: res.data.msg
        });
    }
  })

/**
 * 模板消息测试
 */
  /*wx.request({
    url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx93ff713a8e32c6be&secret=ddd2af2ceb83528ec190650762367f79',
    method: 'GET',
    success: function (res) {
      var _token = res.access_token;
      wx.request({
        url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + _token,
        method: 'POST',
        data: {
          "touser": "报名者的openid",
          "template_id": "7sCtVqm7LEEp8vEouTBZhp1Zm9k_joreASO2M0ZMaVw",
          "page": "activity/activity", // 模板消息卡片点击后跳转页面路径，不填则不跳转                              
          "form_id": "报名接口中的参数formid",
          "data": {
            "keyword1": {
              "value": "活动名称",
            },
            "keyword2": {
              "value": "报名者姓名",
            },
            "keyword3": {
              "value": "报名时间",
            },
            "keyword4": {
              "value": "活动地址",
            }
          },
        }
      })
    }
  })*/

},


/**
 * 表单验证相关，需要设置各种表单的填写限制
 */
/**
 * 根据表单name匹配对应的验证方法
 */
  rule_formCheck: function(name, value){
    var that = this;
    var method = "check_"+name;
    // console.log(method)

    if(typeof that[method] == 'function'){
      return that[method](value);
    }
    return true;
  },


  /**
   * 全部表单验证方法，（格式验证）
   */
  // phone手机号
  check_phone: function(phone){
    var that = this;
    var reg = /^1[34578][0-9]{9}$/
    if(!reg.test(phone)){
      return that.showinfo("手机号不存在","../../pictures/fail.png");
    }
    return true;
  },
  // emial邮箱
  check_email: function(email){
    var that = this;
    var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if(!reg.test(email)){
      return that.showinfo("邮箱格式错误", "../../pictures/fail.png");
    }
    return true;
  },

  /**
   * 选择地址
   */
  getLocation: function(){
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        that.setData({
          userAddress: res.address
        })
      },
    })
  },
  

  //=============================非功能方法==============================
//   表单提示
  showinfo: function(info,icon){
    wx.showModal({
      title: '提示',
      content: info,
      showCancel: false,
    })
    return false
  },


  /**
   * formreset重置并关闭表单
   */
  formreset: function () {
    this.setData({
      showform: 'hide',
      formloading: false
    })
  },


  /**
   * 关闭提问框
   */
  closeComments: function () {
    this.setData({
      showbox: "hide",
      value: ''
    })
  },


  /**
   * 用户点击提问
   */
  question: function (e) {
    this.setData({
      showbox: ''
    })
  },

  /**
   * 用户点击立即报名
   */
  signup: function () {
    var act = this.data.activity;
    if(act.joined >= act.limits){
      wx.showModal({
        title: '提示',
        content: '很抱歉，报名人数已满',
        showCancel: false
      })
      return;
    }
    // this.loadForm();
    this.setData({
      showform: ''
    })
  },

})