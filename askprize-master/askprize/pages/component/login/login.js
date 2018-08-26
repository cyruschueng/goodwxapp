// pages/inc/login/login.js
import { userApi } from '../../../utils/api/userApi.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示
    show: {
      type:Boolean,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    verifyCodeTime:'验证',
    mobile:'',
    verifyCode:'',
    // hidden: true,
    phoneBorder: false,
    codeBorder: false,
    error: false,
    loginEvent: ''
  },
  attached:function(){
    var that = this;
    // that.wxapi = new wxapi(that); 
    that.userApi = new userApi(that);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _callPage: function (pageEvent, event) {
       /*** 触发事件的选项 ***/
      // bubbles:事件是否冒泡
      // composed:事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部
      // capturePhase:事件是否拥有捕获阶段
      var myEventOption = { bubbles: false, composed: true, capturePhase: true };
      this.triggerEvent(pageEvent, event, myEventOption);

    },

    mobileInputEvent: function (e) {
      var that = this;
      // console.log(e.detail.value);
      that.data.mobile = e.detail.value
    },

    getCode: function (phone) {
      var that = this;
      console.log('发送')
      if (that.data.buttonDisable) return false;

      var mobile = that.data.mobile;
      console.log(mobile)

      var regMobile = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!regMobile.test(mobile)) {
        that.setData({
          error: true
        })
        wx.showToast({
          title: '手机号有误！',
          image: '/pages/images/error.png',
        })
        return false;
      }


      var c = 60;
      // 获取验证码按钮变灰
      that.setData({ 
        buttonDisable: true, 
        verifyCodeTime: c + 's' 
      });

      var intervalId = setInterval(function () {
        c = c - 1;
        that.setData({
          verifyCodeTime: c + 's'
        })
        if (c == 0) {
          clearInterval(intervalId);
          that.setData({
            verifyCodeTime: '重新验证',
            buttonDisable: false
          })
        }
      }, 1000)
      var args={
        mobile: that.data.mobile
      }

      // 发起验证码
      that.userApi.verifyCode(args, 'cb_verifyCode');


    },

    // 验证码回调方法
    cb_verifyCode: function (res, opt) {
      console.log('get mobile verify code');
      console.log(res);
    },

    codeInputEvent: function (e) {
      var that = this;
      that.data.verifyCode = e.detail.value;
    },
  


    phoneSubmit: function (e) {
      // console.log(e);
      var that = this;
      that.data.loginEvent = e;
      var mobile = that.data.mobile;
      var verifyCode = that.data.verifyCode;

      if (!mobile) {
        wx.showToast({
          title: '手机号不能为空！',
          image: '/pages/images/warning.png'
        });
        return false;
      }

      var regMobile = /^1\d{10}$/;
      if (!regMobile.test(mobile)) {
        wx.showToast({
          title: '手机号有误！',
          image: '/pages/images/error.png',
        })
        return false;
      }

      if (!verifyCode) {
        wx.showToast({
          title: '动态码不能为空！',
          image: '/pages/images/warning.png'
        });
        return false;
      }

      
      // 授权信息
      var user = that.userApi.getLoginInfo();
      var unionId = '';
      if (user.unionId) {
        unionId = user.unionId;
      }
      console.log(that.userApi.getLoginInfo())

      var args = {
        mobile: that.data.mobile,
        verifyCode: that.data.verifyCode,
        unionId: unionId
      }
      console.log(args)

      // 手机号登录
      // that.wxapi.phoneLogin(mobile, verifyCode, 'cb_phoneLogin');
      that.userApi.phoneVerify(args, 'cb_phoneLogin');

      
    },

    // 手机号登录回调方法,返回用户信息
    cb_phoneLogin: function (res, opt) {
      var that = this;
      console.log(res);
      if (res.code == 3001) {
        wx.showToast({
          title: '动态码错误！',
          image: '/pages/images/error.png',
        })
        return false
      } else {
        // wx.showToast({
        //   title: '登录中...',
        //   icon: 'loading'
        // })
        wx.showLoading({
          title: '登录中...',
        })
        console.log('qqqqq')
        that.userApi.wxlogin('cb_login');
       
      } 
    },

    cb_login: function(res, opt) {
      var that = this;
      console.log(res);
      wx.hideLoading();
      that.setData({
        show: false,
      })
      that._callPage('onSubmit', that.data.loginEvent);
     
    },

    inPhone: function () {
      var that = this;
      that.setData({
        phoneBorder: true,
        error: false

      })
    },

    outPhone: function () {
      var that = this;
      that.setData({
        phoneBorder: false
      })
    },

    inCode: function () {
      var that = this;
      that.setData({
        codeBorder: true
      })
    },

    outCode: function (e) {
      var that = this;
      that.setData({
        codeBorder: false
      })
    },

    close: function () {
      var that = this;
      that.setData({
        show: false
      })
    },

    _onDelete: function (e) {
      // 调取页面模板事件deleteEvent（bind:deleteEvent)
      this._callPage('onSubmit', e);
    },


  }
})
