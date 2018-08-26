const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

Page({
    data: {
        isload: true,//是否第一次加载
    },
    //加载完成后 读取用户信息
    onLoad: function () {
        this.onPullDownRefresh();
        listener.addEventListener('member.update', this.onPullDownRefresh);
        listener.addEventListener('member.bind', this.onPullDownRefresh);
    },
    onUnload: function () {
        listener.removeEventListener('member.update', this.onPullDownRefresh);
        listener.removeEventListener('member.bind', this.onPullDownRefresh);
    },
    //下拉刷新
    onPullDownRefresh: function () {
        //加载用户信息
        requestUtil.get(urls.member.info, {}, (info) => {
            info.isload = false;
            this.setData(info);
        }, { completeAfter: wx.stopPullDownRefresh });
    },
    onNavigateTap: function (e) {
        //跳转页面
        const openType = e.currentTarget.dataset.type || "navigate";
        const url = e.currentTarget.dataset.url;
        const handler = () => {
            const name = e.currentTarget.dataset.name;
            const value = e.currentTarget.dataset.value;
            if (name) {
                const info = {};
                info[name] = value;
                this.setData(info);
            }
        };
        if (openType === "redirect") {
            wx.redirectTo({ url: url, success: handler });
        } else if (openType === "switchTab") {
            wx.switchTab({ url: url, success: handler });
        } else if (openType === "reLaunch") {
            wx.reLaunch({ url: url, success: handler });
        } else if (openType === "navigateBack") {
            wx.navigateBack({ success: handler });
        } else {
            wx.navigateTo({ url: url, success: handler });
        }
    },
    //用户充值
    bind_user_charge: function () {
        wx.navigateTo({
            url: '../user_account/index'
        })
    },
    //编辑资料
    bind_user_edit: function () {
        wx.navigateTo({
            url: '../user_edit/index'
        })
    },
    bind_user_paylog: function () {
        wx.navigateTo({
            url: '../user_pay/index'
        })
    },
    //收货地址
    bind_user_address: function () {
        wx.navigateTo({
            url: '../shop/address_list/index'
        })
    },
    //我的帖子
    bind_user_bbspost: function () {
        wx.navigateTo({
            url: '../bbs/list/index'
        })
    },
    //我的订单
    bind_user_order: function () {
        wx.navigateTo({
            url: '../order/list/index'
        })
    },
    tapUserInfo: function () {
        wx.navigateTo({
            url: 'user_info/user_info'
        })
    },
    //切换
    bbs_tab_change_bind: function () {
        var that = this
        that.setData({
            bbs_show_status: that.data.bbs_show_status ? false : true
        })
    },
    shop_tab_change_bind: function () {
        var that = this
        that.setData({
            shop_show_status: that.data.shop_show_status ? false : true
        })
    },
    //显示隐藏
    isShow_bind: function (e) {
        var that = this
        var datas = that.data.menu_list
        for (var i = 0; i < datas.length; i++) {
            if (datas[i].name == e.currentTarget.id) {
                var isShow = (datas[i].isshow == true) ? false : true;
                datas[i].isshow = isShow
            }
        }
        that.setData({
            menu_list: datas,
        })
    },
    menu_link_bind: function (e) {
        var link_url = e.currentTarget.id
        console.log(link_url)
        wx.navigateTo({
            url: '/' + link_url
        })
    },

    initgetUserMenuData: function (data) {
        var that = this
        that.setData({
            menu_list: data.info
        })
    },
    initGetUserInfoData: function (data) {
        var that = this
        if (data.code == 1) {
            that.setData({
                userInfo: data.info,
                glo_is_load: false
            })
        } else if (data.code == 2) {
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel: false,
                success: function (res) {
                    app.getNewToken(function (token) {
                        _function.getUserInfo(wx.getStorageSync("utoken"), that.initGetUserInfoData, that)
                    })
                }
            })
        }
    },

    /**
     * 清除缓存
     */
    onClearCacheTap: function () {
        wx.showToast({
            title: '正在清除...', icon: 'loading', duration: 10000, mask: true,
        });
        wx.clearStorage();
        app.globalData.utoken = '';
        wx.showToast({
            title: '已清除...', icon: 'success', mask: true,
        });
    },

    /**
     * 更新头像
     */
    onModifyAvatar: function () {
        wx.showActionSheet({
            itemList: ['选择图片'],
            success: (res) => {
                wx.chooseImage({
                    count: 1,
                    success: (res) => {
                        this.modifyAvatar(res.tempFilePaths[0]);
                    },
                })

            },
        });
    },

    /**
     * 上传头像
     */
    modifyAvatar: function (path) {
        console.log(path, urls.member.modifyAvatar + "?UID=" + this.data.uid);
        wx.uploadFile({
            url: urls.member.modifyAvatar + "?UID=" + this.data.uid,
            filePath: path,
            name: 'AVATAR',
            success: (res) => {
                res = JSON.parse(res.data);
                console.log(res);
                if ("OK" == res.RESULT) {
                    this.setData({ avatar: path });
                }
            },
            fail: (res) => {
                wx.showModal({
                    title: '温馨提示',
                    content: '更新失败，请稍后再试~',
                    showCancel: false,
                });
            },
        });
    },

    /**
    * 解绑当前账号
    */
    onUnBindAccountTap: function () {
        if (requestUtil.isLoading(this.unbindId)) return;

        wx.showModal({
            title: '温馨提示',
            content: '解绑后，需要重新绑定账号，你确定要解除绑定当前微信号吗？',
            showCancel: true,
            confirmText: '解绑',
            confirmColor: '#E64340',
            success: (res) => {
                if (res.cancel) return;

                this.onUnBindAccount();
            },
        });
    },

    onUnBindAccount: function () {
        this.unbindId = requestUtil.post(urls.member.unbind, {}, (data) => {
            wx.showModal({
                title: '温馨提示',
                content: '解绑成功，请重新登录！',
                showCancel: false,
                confirmText: '马上登录',
                confirmColor: '#E64340',
                success: (res) => {
                    // wx.redirectTo({ url: 'bind', });
                    this.onPullDownRefresh();
                },
            })
        });
    }

})