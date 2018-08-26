// pages/normalpages/change_role/change_role.js
// 切换角色页面


Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorities: [
            {
                name: 'teacher',
                value: '老师',
                checked: false,
                disabled: true,
                description: '发布课程、通知开课、考勤管理、发布作业以及点评'
            },
            {
                name: 'parent',
                value: '家长',
                checked: false,
                disabled: true,
                description: '代替小孩加入课程、查看老师评价、上传作业'
            },
            {
                name: 'student',
                value: '学生',
                checked: false,
                disabled: true,
                description: '加入课程、查看课程、老师评价、上传作业'
            },
        ],
    },

    /**
     * 提交表单
     * 需要在这里做验证
     */
    onFormSubmit: function (e) {
        // TODO 表单校验
        // 根据入口不同，选择切换不同的Tab
        console.log('form发生了submit事件，携带数据为：', e.detail.value);

        let userInfo = wx.getStorageSync("WeChatUser");
        userInfo.currentAuth = e.detail.value.authorities;

        // 后台创建或更新，并同步保存到本地
        wx.setStorageSync("WeChatUser", userInfo);

        //页面设置完成，跳转到设置
        // 应对用户删除本地存储，在获取了用户id之后，更新用户信息，这步必须的。
        let tabUrl = '../../tabpages/setting/setting';

        wx.switchTab({
            url: tabUrl,
        });
    },

    /**
     * 重置表单
     * 恢复到未修改之前
     */
    onFormReset: function () {
        this.setData({
            userInfo: wx.getStorageSync("WeChatUser"),
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let authorities = this.data.authorities;
        let userInfo = wx.getStorageSync("WeChatUser");
        for (let item of authorities) {
            item.checked = item.name === userInfo.currentAuth;
        }

        // 禁止未拥有的角色启动单选按钮
        for (let role of userInfo.authorities) {
            for (let item of authorities) {
                if (role === item.name) {
                    item.disabled = false;
                }
            }
        }

        this.setData({
            authorities: authorities
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