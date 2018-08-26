const SERVER = 'https://wxapp.haizeihuang.com/wannengdequan_php/';
//const SERVER = 'https://wxapi.liunianshiguang.com';
const fetchErrorInfo = '服务器忙请稍后再试\n谢谢您的理解';
import { makePar,extend } from './utils/util';
import { Promise } from './utils/es6-promise.min';
import _ from './utils/underscore.js';
import { addIndex,add} from './utils/ramda.js';
import md5 from './utils/md5.js';

console.log("add-------->", add(1,2));

let endpoint={
  getOpenId: 'user.get_openid',
}


//app.js
App({
  onLaunch: function (){
    let that = this;
    let i = 1000000;
      // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: resa => {
              // 可以将 res 发送给后台解码出 unionId
              console.log("res.userInfo-------------->", resa.userInfo);
              that.globalData.userInfo = resa.userInfo
              that.fetchDataBase({
                func: 'user.save_userinfo',
                openid: that.globalData.openId,
                ...resa.userInfo
              });
            }
          })
        }else{
          try{
            wx.authorize({
              scope: 'scope.userInfo',
              success() {
                    // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                    wx.getUserInfo({
                            success(resa) {
                              // 可以将 res 发送给后台解码出 unionId
                              //console.log("res.userInfo-------------->", resa.userInfo);
                              that.globalData.userInfo = resa.userInfo
                            },
                            fail(error) {
                              console.log("res.userInfo----fail---------->", error);
                            },
                            complete(error) {
                              console.log("res.getUserInfo----console---------->", error);
                            }
                    })
              },
              fail(error) {
                console.log("res.userInfo----fail---------->", error);
              },
              complete(error) {
                console.log("res.getUserInfo----console---------->", error);
              }
            })
          }catch(e){
            console.log(e);
          }

        }
      },
      fail: error => console.log("wx.getUserInfo----------->error", error)
    })

    while(i){
        i--;
    }
  },
  globalData: {
    userInfo: {},
    levelInfo: {
      a: {
        levelId: 1,
        levelText: '幼儿园水平'
      },
      b: {
        levelId: 2,
        levelText: '小学水平'
      },
      c: {
        levelId: 3,
        levelText: '初中水平'
      },
      d: {
        levelId: 4,
        levelText: '高中水平'
      },
      e: {
        levelId: 5,
        levelText: '大学水平'
      }
    }
  },
  /*
      @purpose  微信登录
      @createTime 2017-09-03 09:14
      @author  miles_fk

  */
  wxLogin: function () {
    var that = this;
    var whiteList = this.globalData.whiteList;
    var wxLoginPromise = new Promise(function (resolve, reject) {
      wx.login({ //微信登录接口-微信提供的  res.code 到后台换取 openId, sessionKey, unionId
        success: function (res) {
            console.log("wxLogin------->wx.login----------------->", res);
            //decryptMpCode  解code的 测试  mpLogin

            that.fetchDataBase({ code: res.code, func:endpoint.getOpenId}, function (loginRes) {
              console.log("wxLogin------->wx.login------------mpLogin--loginRes--->", loginRes);
              let data = loginRes;
              that.globalData.openid = data.openid;
              that.globalData.session_key = data.session_key; //存储 微信会话key
              that.globalData.union_id = data.union_id;  // 微信端用户唯一id
              that.globalData.code = res.code;
              resolve();
            }, function(){
              reject({ isError: true });
            })
        },
        fail: function (e) {
          wx.showToast({ title: e.errMsg || fetchErrorInfo, image: "../../images/error-a.png" });
          reject({ isError: true });
        },
        complete: function (e) { }
      })
    });
    return wxLoginPromise
  },
  /*
    @purpose  请求数据基础包裹请求数据和判断登录
    @createTime 2017-09-03 09:14
    @author  miles_fk
*/
  fetchData: function (qo) {
    if (!qo.noloadding) wx.showLoading({ title: '数据加载中' });
    let that = this;
    var fetchDataPromise = new Promise(function (resolve, reject) {
      if (that.globalData.openid) { //已登录不需要重新请求 logIn
        qo.openid = that.globalData.openid;
        that.fetchDataBase(qo, resolve,reject);
      } else {
        that.wxLogin().then((value) => { //登录成功执行业务请求接口
          qo.openid = that.globalData.openid || 0;
          that.fetchDataBase(qo, resolve, reject);
        }).catch((err) => {//失败则执行 失败方案
          reject(err)
        })
      }
    });

    return fetchDataPromise
  },
      /*
      @purpose  请求数据基础函数
      @createTime 2017-09-03 09:14
      @author  miles_fk
      fetchDataBase: (endpoint, qo, okcb, fallcb) 现在不需要 endpoint 根据参数区分
  */
  fetchDataBase: function(qo, okcb, fallcb){
    //console.log("fetchDataBase------start----------------->", endpoint,qo);
    var that = this;
    let nqo = that.makeMd5Par(qo);
    wx.request(
      Object.assign({
        url: SERVER,
        data: nqo,
        method: 'POST',
        //header: {'content-type': 'application/json'},
        header:{
         'content-type':'application/x-www-form-urlencoded'
        },
        success: res => {
          wx.hideLoading();
          let that  = getApp();
          let code = res.data.code;
          //console.log("fetchDataBase--success--------------->", res);
          let rd = res.data.response;

          //TODO 0  为没有错误
          if ((code != void 0) && code == 0) {
            okcb&&okcb(rd);
          } else {
            let errInfo = res.data.msg || fetchErrorInfo;
            wx.hideLoading();
            wx.showToast({ title: errInfo, image: "../../images/error-a.png" });
            //console.log("fetchDataBase---errInfo----------endpoint------->",qo, errInfo);
            fallcb && fallcb(res.data)
          }
        },
        fail: function(res) {
          let errInfo = fetchErrorInfo || res.msg;
          if(res.data){
            errInfo = res.data.msg ;
          }else{
            wx.showToast({ title: errInfo, image: "../../images/error-a.png" });
          }
        },
        complete:function(e){
            //console.log("fetchDataBase--complete----->");
        }
      })
    )
  },

  /*
    @purpose 生产MD5函数
    @createTime 2018-01-09 20:46
    @author  miles_fk
*/
  makeMd5Par(data={}){
    //传近来的data里不包含包含timestamp，ak这两个参数
    let str = '';
    let secretKey = 'UbM81S7uFfUQlqu9';
    let nowDate = new Date().valueOf().toString().substr(0, 10);
    data.timestamp = nowDate;
    let nd = this.objKeySort(data);
    for (let i in nd) {
      str += i + nd[i];
    }
    let permd5 = secretKey + str + nowDate;

    //console.log("po--------------------------->", str);
    nd['ak'] = md5.hex_md5(permd5);
    //console.log("permd5-------------------->", permd5);
    //console.log("md5-------------------->", nd['ak'] );


    return nd;
  },
   /*
    @purpose 对象 排序的函数
    @createTime 2018-01-09 20:46
    @author  miles_fk
  */
  objKeySort(obj) {
      var newkey = Object.keys(obj).sort();
      var newObj = {};//创建一个新的对象，用于存放排好序的键值对
      for(var i = 0; i<newkey.length; i++) {//遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
      }
      return newObj;//返回排好序的新对象
  },
  /*
    @purpose 基础 跳转函数
    @createTime 2017-09-03 09:14
    @author  miles_fk
    @par
      pageName 跳转地址
      par 携带的参数
      gotoType 调用那个api to --> navigateTo
*/
  toPage: function (pageName, paro, gotoType) {
    if (pageName == "") return;
    let url = "";
    console.log('toPage---paro-------->', paro);
    if (paro) {
      let ps = makePar(paro);
      url = `/pages/${pageName}/${pageName}${ps}`
    } else {
      url = `/pages/${pageName}/${pageName}`
    }

    //console.log('toPage---url-------->',url);

    let rpo = {
      url: url,
      fail: function (e) {
        console.log("wx.navigate-fail------>", e);
      },
      complete: function (e) {
        //console.log("wx.navigate-complete------>", e);
      }
    }
    switch (gotoType) {
      case "to":
        wx.navigateTo(rpo)
        break;
      case "rel":
        wx.reLaunch(rpo)
        break;
      default:
        wx.redirectTo(rpo)
    }
  },
})



    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           // if (this.userInfoReadyCallback) {
    //           //   this.userInfoReadyCallback(res)
    //           // }
    //         }
    //       })
    //     }
    //   },
    //   fail: error => console.log("wx.getUserInfo----------->error", error)
    // })
