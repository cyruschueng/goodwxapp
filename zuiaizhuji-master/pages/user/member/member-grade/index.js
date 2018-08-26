// pages/user/member/member-grade/index.js
import requestUtil from '../../../../utils/requestUtil.js';
import {
    duoguan_host_api_url as API_URL,
} from '../../../../utils/data.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        gradeNum: 0,//等级百分比0~100
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onPullDownRefresh();
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        requestUtil.get(API_URL + "/index.php?s=/addon/DuoguanUser/CardApi/getLevelInfo.html", {}, (info) => {
            this.setData(info);
        });
    },
});