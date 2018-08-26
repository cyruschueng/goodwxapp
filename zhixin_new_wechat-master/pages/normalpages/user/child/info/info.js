// pages/userinfo/userinfo.js
// 用户资料页，可以复用，首次进入，为注册页面精简信息，从个人设置页面，为全信息

import StorageUtils from '../../../../../utils/StorageUtils'
import Models from '../../../../../datamodel/Models'
import SyncUtils from '../../../../../utils/SyncUtils'

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 显示控制，默认是注册页面，只显示必填项目
        genderChArray: ["男", "女"],
        genderEnArray: ["Male", "Female"],
        genderIdx: 0,
        studentInfo: {
            avatarUrl: "../../../../image/friend_64px.png", // 默认头像
            nickName: "",
            cnName: "",
            enName: "",
            gender: "",
            dateOfBirth: "2000-01-01",
            mobileNumber: "",
            email: "",
        },
        dateOfBirth: "2000-01-01",
        childIdx: -1
    },

    /**
     * 设置页面的值
     */
    initPageStudentInfo: function () {
        if (this.data.options.route === "modify") {
            let childIdx = this.data.options.idx;

            let userInfo = StorageUtils.loadUserInfo();
            let dateOfBirth = userInfo.dateOfBirth;
            this.setData({
                dateOfBirth: dateOfBirth,
                childIdx: childIdx,
                studentInfo: userInfo.parentSet[childIdx]
            })
        }
    },

    onChangeAvatar: function (e) {
        console.log("Go to avatar page!");
        wx.navigateTo({
            url: '../../set_avatar/set_avatar',
        });
    },

    /**
     * 响应选择，主要是因为要中英文显示性别，要用到genderIdx
     * @param e
     */
    onPickerChange: function (e) {
        let genderIdx = this.data.genderIdx;
        let dateOfBirth;
        // let studentInfo = this.data.studentInfo;
        switch (e.target.id) {
            case "gender":
                genderIdx = parseInt(e.detail.value);
                break;
            case "dateOfBirth":
                dateOfBirth = e.detail.value;
                break;
            default:
                break;
        }

        this.setData({
            // studentInfo: studentInfo,
            dateOfBirth: dateOfBirth,
            genderIdx: genderIdx,
        });
    },

    onCheckboxChange: function (e) {

    },

    /**
     * 提交表单
     * 需要在这里做验证
     */
    onFormSubmit: function (e) {
        // TODO 表单校验
        // 根据入口不同，选择切换不同的Tab
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        let studentInfo = this.data.studentInfo;

        // 准备提交到后端服务器上的数据，为空的数据不能上传
        let userData = {};

        // 1、校验表单信息

        // 1.1、收集昵称
        if (e.detail.value.nickName !== '') {
            studentInfo.nickName = e.detail.value.nickName;
            userData.nickName = e.detail.value.nickName;
        } else {
            wx.showModal({
                title: 'Warning',
                content: '请填写昵称',
            });
            return;
        }

        // 1.2、收集性别
        studentInfo.gender = e.detail.value.gender;
        userData.gender = e.detail.value.gender;

        // 1.3、设置角色
        studentInfo.roleSet = [{ id: 3 }];
        userData.roleSet = [{ id: 3 }];

        // 1.4、收集生日
        studentInfo.dateOfBirth = e.detail.value.dateOfBirth;
        userData.dateOfBirth = e.detail.value.dateOfBirth;

        userData.weChatInfo = studentInfo.weChatInfo;

        // 1.5、收集其他信息
        if (typeof e.detail.value.cnName !== 'undefined' && e.detail.value.cnName !== '') {
            studentInfo.cnName = e.detail.value.cnName;
            userData.cnName = e.detail.value.cnName;
        }
        if (typeof e.detail.value.enName !== 'undefined' && e.detail.value.enName !== '') {
            studentInfo.enName = e.detail.value.enName;
            userData.enName = e.detail.value.enName;
        }
        if (typeof e.detail.value.mobileNumber !== 'undefined' && e.detail.value.mobileNumber !== '') {
            studentInfo.mobileNumber = e.detail.value.mobileNumber;
            userData.mobileNumber = e.detail.value.mobileNumber;
        }
        if (typeof e.detail.value.email !== 'undefined' && e.detail.value.email !== '') {
            studentInfo.email = e.detail.value.email;
            userData.email = e.detail.value.email;
        }

        userData.avatarUrl = studentInfo.avatarUrl;

        // 准备跳转页面及保存数据
        if (this.data.options.route === "register") {
            let student_UserInfo = new Models.WeChatUser();
            for (let item in studentInfo) {
                if (student_UserInfo.hasOwnProperty(item)) {
                    student_UserInfo[item] = studentInfo[item];
                }
            }

            let parent_UserInfo = StorageUtils.loadUserInfo();

            parent_UserInfo.parentSet.push(studentInfo);

            console.log("new student, userData:", userData);

            console.log("new student, student_UserInfo:", student_UserInfo);

            SyncUtils.createUserInfo(userData, student_UserInfo, "parent");

        } else {

            let childIdx = this.data.childIdx;
            if (childIdx !== -1) {
                userInfo.parentSet.splice(childIdx, 1, studentInfo);
            }
        }
    },

    /**
     * 重置表单
     * 恢复到未修改之前
     */
    onFormReset: function () {
        let studentInfo = StorageUtils.loadUserInfo("WeChatUser");

        this.setData({
            studentInfo: studentInfo,
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("options:", options);
        let studentInfoPageTitle = '';

        if (options.route === "register") {
            studentInfoPageTitle = "填写注册资料";
        } else {
            studentInfoPageTitle = "修改资料";

        }

        // 设置标题
        wx.setNavigationBarTitle({
            title: studentInfoPageTitle,
        });

        this.setData({
            options: options
        });

        // 初始化页面数据
        this.initPageStudentInfo();
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