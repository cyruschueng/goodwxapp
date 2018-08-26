//index.js
//获取应用实例
import Auth from '../../utils/auth';
import API from '../../utils/api';

Page({
    // 定义数据
    data: {
        showMask: false,
        scene: getApp().globalData.scene,
        snInfo: [{ model: '', platform: '', system: '', version: '', language: '' }],
        banner: API.getStorageSync('banner'),
        weapp: API.getStorageSync('weapp'),
        items: [],
        phoneInfo: getApp().globalData.deviceInfo,
        phoneList: true,
        gid: ''
    },

    // 页面onLoad
    onLoad: function(res) {
        // wx.setNavigationBarTitle({title: '手机真伪查询'});

        API.getBanner().then(res => {
            this.setData({
                banner: res.banner,
                weapp: res.weapp
            });
        }, err => {
            console.log('获取Banner失败', res);
        });
    },

    onShow(res) {
        wx.showShareMenu({ withShareTicket: true });

        this.setData({ scene: getApp().globalData.scene });

        if (getApp().globalData.scene == 1044) {
            Auth.checkOrLogin().then(res => {
                this.getGroupPhones().then(res => {
                    console.log(res);
                    this.setData({
                        items: res.phones,
                        gid: res.gid
                    });
                    getApp().globalData.gid = res.gid;
                }, err => {
                    console.log(err);
                });
            });
        }
    },

    getGroupPhones: function() {
        if (getApp().globalData.gid) {
            console.log('gid: ', getApp().globalData.gid);
            return API.post('/api2/group.phones.json', { gid: getApp().globalData.gid, phone: getApp().globalData.deviceInfo.model });
        } else if (getApp().globalData.shareTicket) {
            return new Promise(function(resolve, reject) {
                console.log('shareTicket: ', getApp().globalData.shareTicket);
                Auth.code().then(code => {
                    wx.getShareInfo({
                        shareTicket: getApp().globalData.shareTicket,
                        success: function(res) {
                            API.post('/api2/group.phones.json', { code, iv: res.iv, encrypted_data: res.encryptedData, phone: getApp().globalData.deviceInfo.model }).then(res => {
                                resolve(res);
                            }, err => {
                                reject(err);
                            });
                        },
                        fail: function(err) {
                            reject(err);
                        }
                    });
                });
            });
        }
    },

    // 预览图片功能
    previewImageTap: function(e) {
        if (this.data.weapp.appid) {
            wx.navigateToMiniProgram({
                appId: this.data.weapp.appid,
                path: this.data.weapp.path,
                envVersion: this.data.weapp.version,
                success(res) {
                    // 打开成功
                    console.log('跳转成功');
                }
            })
        } else {
            wx.previewImage({
                current: this.data.banner,
                urls: [this.data.banner]
            })
        }
    },

    // 关闭mask
    closeMask: function() {
        this.setData({
            showMask: false
        })
    },

    // 分享页面功能
    onShareAppMessage: function() {
        return {
            title: '看看大家都在用什么手机？',
            path: '/pages/index/index',
            success(res) {
                // console.log('share', res)
            }
        }
    },


})