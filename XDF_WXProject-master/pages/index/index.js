//index.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
var url ='https://www.tongke.cn/xdf';
Page({
    data: {
        tabId: 'about',
        modalHidden: true,
        hasUserInfo: true,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        page: {
            week: {
                pageNo: 1,
                hasMore: true
            },
            total: {
                pageNo: 1,
                hasMore: true
            }
        },
        arrWrod:[],
        weekList: [],
        totalList: [],
    },
    onReady() {
        this.keyboard = this.selectComponent("#kk");
        this.modal = this.selectComponent("#modal");
    },
    //事件处理函数
    startGame: function () {
        wx.navigateTo({
            url: '../game/game'
        })
    },
    changeTab: function (e) {
        this.setData({
            tabId: e.currentTarget.dataset.tab
        })
    },
    lower: function () {
        console.log('scroll bottom')
        const {tabId} = this.data;
        if (tabId === 'list') {
            this.getWeekList();
        } else if (tabId === 'totalList') {
            this.getTotalList();
        }
        else {
            // do nothing
        }
    },
    /**
     * 生成假数据
     * @param len
     * @returns {Array}
     */
    genData(len = 10) {
      let dd = new Array(len).fill(1);
      return dd.map((it, idx) => {
        return {
          name: this.getNextWord() + (Math.random().toString(16).sub(2, 9)),
          header: ''
        }
      })
    },
    /**
     * 获取周列表
     */
    getWeekList: function () {
        //获取周排行榜
        wx.request({
          //上线接口地址要是https测试可以使用http接口方式
          url: url + '/ranking',
          data: {
            datepare: 'week',
          },
          method: 'GET',
          header: {
            //设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            //console.log("获取周排行榜成功" + res.data, 22222);
          },
          fail: function ({ errMsg }) {
            console.log('request fail 排行榜信息', errMsg)
          }
        })
        const {page, weekList} = this.data;
        if (page.week.hasMore) {
            const nd = this.genData(15);
            setTimeout(() => {
                this.setData({
                    weekList: [...weekList, ...nd]
                })
            }, Math.random() * 1000)
        }
    },
    /**
     * 获取总列表
     */
    getTotalList: function () {
      //获取总排行榜
      wx.request({
        //上线接口地址要是https测试可以使用http接口方式
        url: url +'/ranking',
        data: {
          datepare: 'all',
        },
        method: 'GET',
        header: {
          //设置参数内容类型为x-www-form-urlencoded
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log("获取总排行榜成功" + res.data);
        },
        fail: function ({ errMsg }) {
          console.log('request fail 排行榜信息', errMsg)
        }
      })
    },
    onLoad: function () {
          wx.showShareMenu({
            withShareTicket: true,
            success: function (res) {
              // 分享成功
              console.log('分享' + res)
            },
            fail: function (res) {
              // 分享失败
              console.log(res)
            }
          })
          //获取获取单词
          wx.request({
              //上线接口地址要是https测试可以使用http接口方式
              url: url +'/getChallengeContent',
              data: {
                openid: app.globalData.openId,
              },
              method: 'GET', 
              header: {
                //设置参数内容类型为x-www-form-urlencoded
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              success: function (res) {
                let arrWrod = res.data.msg;
                console.log("请求成功:"+res.data.msg);
              },
              fail: function ({ errMsg }) {
                console.log('request fail 获取单词失败', errMsg)
              }
          })
          //挑战成功
          wx.request({
            //上线接口地址要是https测试可以使用http接口方式
            url: url +'/challengeSuccess',
            data: {
              openid: app.globalData.openId,
            },
            method: 'GET',
            header: {
              //设置参数内容类型为x-www-form-urlencoded
              'content-type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            success: function (res) {
              //console.log("挑战成功" + res.data, 22222);
            },
            fail: function ({ errMsg }) {
              console.log('request fail 获取失败', errMsg)
            }
          })
        let curWord = this.getNextWord();
        const boards = util.randomKeyboard(curWord || 'hello');
        this.setData({
            curWord: curWord,
            keyboards: boards,
            boardsArr: boards.split('')
        });
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true,
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        this.getWeekList();
    },
    // 设置分享
    onShareAppMessage: function (options) {
      var that = this;
      // 设置菜单中的转发按钮触发转发事件时的转发内容
      var shareObj = {
        title: "拼词大作战", // 默认是小程序的名称(可以写slogan等)
        path: '/pages/index', // 默认是当前页面，必须是以‘/’开头的完整路径
        imgUrl: '',  //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
        success: function (res) {
          console.log("转发成功"+res.shareTickets[0])
          // console.log
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success: function (res) { 
              console.log(res) 
            },
            fail: function (res) { 
              console.log(res) 
            },
            complete: function (res) {
               console.log(res) 
            }
          })
          // 转发成功之后的回调
          if (res.errMsg == 'shareAppMessage:ok') {
            //挑战次数+1
            wx.request({
              //上线接口地址要是https测试可以使用http接口方式
              url: url + '/addTimes',
              data: {
                openid: app.globalData.openId,
                shareid: 'a'
              },
              method: 'GET',
              header: {
                //设置参数内容类型为x-www-form-urlencoded
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              success: function (res) {
                console.log("转发成功挑战次数+1");
              }
            })
          }
        }, fail: function (res) {
          // 转发失败之后的回调
          if (res.errMsg == 'shareAppMessage:fail cancel') {
            // 用户取消转发
          } else if (res.errMsg == 'shareAppMessage:fail') {
            // 转发失败，其中 detail message 为详细失败信息
          }
        },
      };
      // 来自页面内的按钮的转发
      if (options.from == 'button') {
        var eData = options.target.dataset;
        console.log(eData.name);     // shareBtn
        // 此处可以修改 shareObj 中的内容
        //shareObj.path = '/pages/btnname/btnname?btn_name=' + eData.name;
      }
      // 返回shareObj
      return shareObj;
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    /**
     * 按键事件处理，并根据需求 随机键盘排序
     * @param e
     */
    randomKeyboard: function (e) {
        const wClicked = e.detail;
        const {curWord, tmpWord} = this.data;
        if (curWord.match(new RegExp(`^${tmpWord + wClicked}`))) {
            if (curWord === tmpWord + wClicked) {
                // 完成一个单词，进入下一个单词
                setTimeout(() => {
                    let next = this.getNextWord();
                    const boards = util.randomKeyboard(next);

                    this.setData({
                        keyboards: boards,
                        boardsArr: boards.split(''),
                        curWord: next,
                        tmpWord: ''
                    })
                }, 100);
            } else {
                // 继续拼当前的单词
                this.setData({
                    tmpWord: tmpWord + wClicked
                })
            }
        } else {
            console.log("click wron")
            this.setData({
                tmpWord: tmpWord + wClicked
            })
            // 错误后逻辑处理
            wx.navigateTo({
                url: '../logs/logs'
            })
        }
    },
    /**
     *
     * @returns {string}
     */
    getNextWord() {
      let wordsBase = new Array();
      let count = 20;
      let wordlistf = new Array();
      let arr = ['hello', 'key', 'zl', 'yl', 'ct', 'th', 'hq','continue','vb'];
        return arr[util.random(0, arr.length)];
    },
    openModal() {
        this.modal.showDialog();
    },
    closeModal() {

    }, 
    onShow(e) {
      wx.showShareMenu({
        withShareTicket: true
      })
    }
})
