//index.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        keyboards: '',
        boardsArr: [''],
        curWord: '',
        tmpWord: '',
        tmpArr: [],
        successNum: 0,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isShowKeyBoard: true
    },
    onReady() {
        this.keyboard = this.selectComponent("#kk");
        this.dialog = this.selectComponent("#gameDialog")

    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onShareAppMessage: function () {
        return {
            title: 'title_of_page',
            path: '/pages/logs',
        }
    },
    onLoad: function () {
        let curWord = this.getNextWord();
        const boards = util.randomKeyboard(curWord || 'hello');
        this.setData({
            curWord: curWord,
            keyboards: boards,
            boardsArr: boards.split('')
        })
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
    },

    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },

    randomKeyboard: function (e) {
        const wClicked = e.detail;
        const {curWord, tmpWord, successNum} = this.data;
        const boards = util.randomKeyboard();
        console.log(boards);
        this.setData({
            keyboards: boards,
            boardsArr: boards.split(''),
        });
        if (curWord.match(new RegExp(`^${tmpWord + wClicked}`))) {
            if (curWord === tmpWord + wClicked) {
                // 完成一个单词，进入下一个单词
                setTimeout(() => {
                    let next = this.getNextWord();
                    this.setData({
                        curWord: next,
                        tmpWord: '',
                        successNum: successNum + 1
                    })
                }, 100);
            } else {
                // 继续拼当前的单词
                this.setData({
                    tmpWord: tmpWord + wClicked
                })
            }
        } else {
            console.log("click wron");
            // this.dialog.showDialog();
            this.setData({
                tmpWord: tmpWord + wClicked,
                isShowKeyBoard: false
            });

            // 错误后逻辑处理
            wx.navigateTo({
                url: '../cvs/cvs?num=' + this.data.successNum
            })
        }
    },

    getNextWord() {
        let arr = ['hello', 'key', 'zl', 'yl', 'ct', 'th', 'hq'];
        return arr[util.random(0, arr.length)]
    },

    showKeyboard(showOrHide) {
        this.setData({
            isShowKeyBoard: showOrHide
        })
    },

    closeDialog() {
        this.dialog.hideDialog();
    },
    confirmDialog() {
        console.log('confirm')
        wx.canvasToTempFilePath({
            x: 100,
            y: 200,
            width: 50,
            height: 50,
            destWidth: 100,
            destHeight: 100,
            canvasId: 'gameDialog',
            success: function (res) {
                console.log(res.tempFilePath)
            }
        })
    }
});
