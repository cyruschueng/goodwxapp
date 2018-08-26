// pages/userinfo/userinfo.js
// 用户资料页，可以复用，首次进入，为注册页面精简信息，从个人设置页面，为全信息

import DataStructure from '../../../../datamodel/DataStructure'
import StorageUtils from '../../../../utils/StorageUtils'

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 显示控制，默认是注册页面，只显示必填项目
        displayControl: {
            avatar: false,
            nickName: true,
            cnName: false,
            enName: false,
            gender: true,
            dateOfBirth: false,
            mobileNumber: false,
            email: false,
            authorities: true
        },
        genderChArray: ["男", "女"],
        genderEnArray: ["Male", "Female"],
        authorities: [
            {name: 'teacher', value: '老师', checked: false, description: '发布课程、通知开课、考勤管理、发布作业以及点评'},
            {name: 'student', value: '学生', checked: false, description: '加入课程、查看课程、老师评价、上传作业'},
            {name: 'parent', value: '家长', checked: false, description: '代替小孩加入课程、查看老师评价、上传作业'},
        ],
        genderIdx: 0,
        userInfo: {}
    },

    /**
     * 设置页面的值
     */
    initPageUserInfo: function () {

        let userInfo = StorageUtils.loadUserInfo();
        let authorities = this.data.authorities;
        let genderIdx = 0;

        console.log("in initPageUserInfo", userInfo);

        // 默认值
        if (typeof userInfo.dateOfBirth === 'undefined' || userInfo.dateOfBirth === "") {
            userInfo.dateOfBirth = '1990-08-30';
        }

        // 以下信息，如果本地有信息，根据本地信息初始化，如果没有给个默认值
        if (userInfo.gender === 'Male') {
            genderIdx = 0;
        } else if (userInfo.gender === 'Female') {
            genderIdx = 1;
        } else {
            genderIdx = 0;
            userInfo.gender = 'Male';
        }

        if (userInfo.authorities.length > 0) {
            for (let auth of authorities) {
                for (let item of userInfo.authorities) {
                    if (auth.name === item) {
                        auth.checked = true;
                    }
                }
            }
        }

        this.setData({
            genderIdx: genderIdx,
            userInfo: userInfo,
            authorities: authorities
        });
    },

    onChangeAvatar: function (e) {
        console.log("Go to avatar page!");
        wx.navigateTo({
            url: '../set_avatar/set_avatar',
        });
    },

    /**
     * 响应选择，主要是因为要中英文显示性别，要用到genderIdx
     * @param e
     */
    onPickerChange: function (e) {
        let genderIdx = this.data.genderIdx;
        switch (e.target.id) {
            case "gender":
                genderIdx = parseInt(e.detail.value);
                break;
            default:
                break;
        }

        this.setData({
            genderIdx: genderIdx,
        });
    },

    onCheckboxChange: function (e) {
        // console.log(e);

    },

    /**
     * 提交表单
     * 需要在这里做验证
     */
    onFormSubmit: function (e) {
        // TODO 表单校验
        // 根据入口不同，选择切换不同的Tab
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        let userInfo = this.data.userInfo;

        // 1、校验表单信息

        // 1.1、收集昵称
        if (e.detail.value.nickName !== '') {
            userInfo.nickName = e.detail.value.nickName;
        } else {
            wx.showModal({
                title: 'Warning',
                content: '请填写昵称',
            });
            return;
        }

        // 1.2、收集性别
        userInfo.gender = e.detail.value.gender;

        // 1.3、收集角色
        let roleSet = [];
        if (e.detail.value.authorities.length !== 0) {
            userInfo.authorities = e.detail.value.authorities;
            userInfo.currentAuth = e.detail.value.authorities[0];
            for (let item of e.detail.value.authorities) {
                switch (item) {
                    case "teacher":
                        roleSet.push({id: 2});
                        break;
                    case "student":
                        roleSet.push({id: 3});
                        break;
                    case "parent":
                        roleSet.push({id: 4});
                        break;
                    default:
                        break;
                }
            }

            console.log("roleSet:", roleSet);
        } else {
            wx.showModal({
                title: 'Warning',
                content: '请选择一个角色',
            });
            return;
        }

        // 1.4、收集生日
        userInfo.dateOfBirth = e.detail.value.dateOfBirth;

        // 1.5、收集其他信息
        if (typeof e.detail.value.cnName !== 'undefined' && e.detail.value.cnName !== '') {
            userInfo.cnName = e.detail.value.cnName;
        }
        if (typeof e.detail.value.enName !== 'undefined' && e.detail.value.enName !== '') {
            userInfo.enName = e.detail.value.enName;
        }
        if (typeof e.detail.value.mobileNumber !== 'undefined' && e.detail.value.mobileNumber !== '') {
            userInfo.mobileNumber = e.detail.value.mobileNumber;
        }
        if (typeof e.detail.value.email !== 'undefined' && e.detail.value.email !== '') {
            userInfo.email = e.detail.value.email;
        }

        // 准备提交到后端服务器上的数据，为空的数据不能上传
        let userData;
        if (this.data.options.model === "register") {
            userData = {
                nickName: userInfo.nickName,
                gender: userInfo.gender,
                roleSet: roleSet,
                weChatInfo: {
                    unionId: app.tempData.unionId
                }
            };
        } else {
            userData = {
                nickName: userInfo.nickName,
                cnName: userInfo.cnName,
                enName: userInfo.enName,
                gender: userInfo.gender,
                dateOfBirth: userInfo.dateOfBirth,
                mobileNumber: userInfo.mobileNumber,
                email: userInfo.email,
                roleSet: roleSet,
                weChatInfo: {
                    unionId: app.tempData.unionId
                }
            };
        }
 

        // 准备跳转页面及保存数据
        let tabUrl = '';

        if (this.data.options.model === "register") {
            console.log("go to register on server!");
            console.log("userData:", userData);
            // 去服务器注册
            wx.request({
                url: 'https://www.yongrui.wang/WeChatMiniProgram/user/viaWeChat',
                method: 'POST',
                data: userData,
                success: res => {
                    userInfo.id = res.data.id;
                    // 后台创建或更新，并同步保存到本地
                    console.log("saved userInfo:", userInfo);
                    wx.setStorageSync("WeChatUser", userInfo);
                    console.log("Post succeeded, res.data:", res.data);
                },
                fail: res => {
                    // 失败也要保存本地
                    wx.setStorageSync("WeChatUser", userInfo);
                    console.log("Post failed, res:", res);
                }
            });

            // 由新建页面进入，创建用户信息，页面设置完成，跳转到首页
            tabUrl = '../../tabpages/student/student';
        } else {
            // 由更新页面进入，页面设置完成，跳转到设置
            console.log(app.tempData.request_header);
            // 这里PUT方法，要给id
            userData.id = userInfo.id;

            console.log("userData:", userData);

            wx.request({
                url: 'https://www.yongrui.wang/WeChatMiniProgram/user/',
                method: 'PUT',
                header: app.tempData.request_header,
                data: userData,
                success: res => {
                    console.log("Put succeeded, res.data:", res.data);
                },
                fail: res => {
                    console.log("Put failed, res:", res);
                }
            });

            // 失败也要保存本地
            wx.setStorageSync("WeChatUser", userInfo);

            tabUrl = '../../tabpages/setting/setting';
        }

        wx.switchTab({
            url: tabUrl,
        });
    },

    /**
     * 重置表单
     * 恢复到未修改之前
     */
    onFormReset: function () {
        let userInfo = wx.getStorageSync("WeChatUser");
        let authorities = this.data.authorities;
        // 重置角色选项
        if (userInfo.authorities.length > 0) {
            for (let auth of authorities) {
                for (let item of userInfo.authorities) {
                    if (auth.name === item) {
                        auth.checked = true;
                    }
                }
            }
        }
        this.setData({
            userInfo: userInfo,
            authorities: authorities
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("options:", options);
        let userInfoPageTitle = '';
        let displayControl = this.data.displayControl;
        if (options.model === "register") {
            userInfoPageTitle = "填写注册资料";
        } else {
            userInfoPageTitle = "修改资料";
            // 显示所有项
            for (let item in displayControl) {
                displayControl[item] = true;
            }
        }

        // 设置标题
        wx.setNavigationBarTitle({
            title: userInfoPageTitle,
        });

        // 初始化页面数据
        this.initPageUserInfo();

        this.setData({
            displayControl: displayControl,
            options: options
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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

    }
})