import wepy from 'wepy';
import api from './../common/api';
import G from './../common/global';

export default class extends wepy.mixin {
    data = {
        userInfo: null
    }


    methods = {
        // 页面跳转
        navigateTo(url){
            this.navigateTo(url);
        },
        // 调用打电话
        tel(username,telnumber){
            wx.showModal({
                title: '提示',
                content: `是否给 ${username} 拨打电话 ？`,
                success: function(res) {
                    if (res.confirm) {
                        wx.makePhoneCall({
                            phoneNumber: telnumber.toString()
                        })
                    } else if (res.cancel) {

                    }
                }
            })

        },
        // 显示隐藏模态框
        dialogToggle(origin){
            this.dialogToggle(origin);
        },
        // 表单提交
        async bindsubmit(ajaxUrl,event){
            this.bindsubmit(ajaxUrl,event);
        }
    }

    onShow() {

    }

    onLoad() {
        this.userInfo = api.getLocalStorageSync(G.userInfo);
        this.doEnsureUserInfo = api.getLocalStorageSync(G.doEnsureUserInfo);
    }

    // 获取用户授权信息
    async getUserInfo(){
        const userData = await this.$parent.requestUserInfo();
        return new Promise( (resolve, reject) => {
            // console.log(userData);
            if (userData) {
                this.userInfo = userData.userId;
                this.currentUser = userData.user;
                this.$apply();
                resolve(userData);
            }else{
                reject('获取用户信息失败');
            }
        })
    }

    // 检验用户授权
    checkUserInfoScope(){
        var That = this;
        return new Promise((resolve, reject) =>{
            // 获取用户当前的授权状态。
            wx.getSetting({
                success(res) {
                    // 判断用户信息是否授权
                    // console.log(res.authSetting['scope.userInfo'])
                    if (res.authSetting['scope.userInfo'] === undefined) {
                        // console.log('scope.userInfo : 未进行授权');
                        That.getUserInfo()
                            .then( res => {
                                resolve(res);
                            });

                    } else if(!res.authSetting['scope.userInfo']){
                        // console.log('scope.userInfo : 拒绝授权');
                        wx.showModal({
                            title: '微信授权',
                            content: '跳转到微信设置进行微信授权',
                            success: function(res) {
                                if (res.confirm) {
                                    // console.log('用户点击确定')
                                    wx.openSetting({
                                        success: (res) => {
                                            // 判断用户是否已经同意授权
                                            if(res.authSetting['scope.userInfo']){
                                                That.getUserInfo()
                                                    .then( res => {
                                                        resolve(res);
                                                    });
                                            }
                                        }
                                    });
                                } else if (res.cancel) {
                                    api.showModal('提示','微信授权后才能进行签到领券',false);
                                }
                            }
                        })
                    }  else {
                        // console.log('scope.userInfo : 已授权');
                        // wx.showLoading({
                        //     title: '签到中',
                        // });
                        That.getUserInfo()
                            .then( res => {
                                resolve(res);
                            });
                    }
                }
            });

        })


    }

    // 显示隐藏模态框
    dialogToggle(origin){
        this[origin].show = !this[origin].show;
        this.$apply();
    }

    // 表单提交
    async bindsubmit(ajaxUrl,event) {
        // console.log(`ajaxUrl:${ajaxUrl} , data: ${JSON.stringify(event.detail.value)}`);
        let data = event.detail.value;
        let origin = event.currentTarget.dataset.dialog;

        for (var key of Object.keys(data)) {
            if(!data[key]){
                wx.showToast({
                    title: '请将信息填写完整',
                    image: '/static/img/icon/waring.png',
                    duration: 1000
                })
                return new Promise( (resolve, reject) => {
                    reject();
                })
            }
            if(key == 'userPhone'){
                if(!(/^1(3|4|5|7|8)\d{9}$/.test(data[key]))){
                    wx.showToast({
                        title: '手机号不正确',
                        image: '/static/img/icon/waring.png',
                        duration: 1000
                    })
                    return new Promise( (resolve, reject) => {
                        reject();
                    })
                }
            }
        }
        wx.showLoading({
            title: '提交中',
        })
        await this.checkUserInfoScope();
        return new Promise((resolve, reject) => {
            api.request({
                url: G.host + ajaxUrl,
                data: data
            }).then(res => {
                wx.hideLoading();
                if (res.data.code == 'SUCCESS') {
                    wx.showToast({
                        title: '提交成功',
                        icon: 'success',
                        duration: 1500
                    });
                    this[origin].show = !this[origin].show;
                    this.$apply();
                    resolve();
                } else {
                    console.error(` code: ${res.data.code} \n msg: ${res.data.msg}`);
                    reject();
                }
            })
        });
    }

    // 页面跳转
    navigateTo(url){
        wx.navigateTo({
            url: url
        })
    }

}
