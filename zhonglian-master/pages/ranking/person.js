import _ from '../../utils/underscore';
import { urls } from '../../utils/data';

Page({
    uid: 0,
    data: {
        isShowHelp: false,
        is_show_info: false,

        page: 1,
    },

    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.uid = options.uid;
        this.onPullDownRefresh();
    },

    onPullDownRefresh: function () {
        wx.request({
            url: urls.ranking.personDetail,
            data: { uid: this.uid },
            success: (res) => {
                this.data.page = 1;
                res = res.data;
                this.onDataHandler(res);
            },
            complete: wx.stopPullDownRefresh
        });
    },

    onReachBottom: function () {
        wx.request({
            url: urls.ranking.personDetail,
            data: {
                uid: this.uid,
                _p: this.data.page + 1
            },
            success: (res) => {
                this.data.page++;
                res = res.data;
                this.onDataHandler(res);
            },
        });
    },

    onShowHelpTap: function () {
        this.setData({ isShowHelp: true });
    },

    onHideHelpTap: function () {
        this.setData({ isShowHelp: false });
    },

    onDataHandler: function (res) {
        const total = res.TOTAL;
        var gradeClass = 'grade1', grade = 1, nextGradeStr = '', nextGrade = 0;
        if (total >= 0 && total < 100) {
            gradeClass = 'grade1'; grade = 1; nextGradeStr = '月桂树'; nextGrade = 100 - total;
        } else if (total >= 100 && total < 500) {
            gradeClass = 'grade2'; grade = 2; nextGradeStr = '月桂圆'; nextGrade = 500 - total;
        } else if (total >= 500 && total < 2000) {
            gradeClass = 'grade3'; grade = 3; nextGradeStr = '金桂'; nextGrade = 1000 - total;
        } else if (total >= 1000 && total < 1200) {
            gradeClass = 'grade4'; grade = 4; nextGradeStr = '金桂树'; nextGrade = 1200 - total;
        } else if (total >= 1200 && total < 2000) {
            gradeClass = 'grade5'; grade = 5; nextGradeStr = '金桂园'; nextGrade = 2000 - total;
        } else if (total >= 2000 && total < 3000) {
            gradeClass = 'grade6'; grade = 6; nextGradeStr = '丹桂'; nextGrade = 3000 - total;
        } else if (total >= 3000 && total < 3300) {
            gradeClass = 'grade7'; grade = 7; nextGradeStr = '丹桂树'; nextGrade = 3300 - total;
        } else if (total >= 3300 && total < 4500) {
            gradeClass = 'grade8'; grade = 8; nextGradeStr = '丹桂园'; nextGrade = 4500 - total;
        } else if (total >= 4500) {
            gradeClass = 'grade9'; grade = 9;
        }

        const data = this.data.page == 1 ? res.RESULT : this.data.data || [];
        this.setData({
            dept_id: res.DEPT_ID,
            dept_name: res.DEPT_NAME,
            season: res.SEASON,
            total: res.TOTAL,
            user: res.USER_ID,
            avatar: res.IMG,
            rank: res.RANK,
            data: this.data.page != 1 ? data.concat(res.RESULT) : data,
            is_show_info: res.USER_ID !== undefined,
            grade_class: gradeClass,
            grade: grade,
            next_grade_str: nextGradeStr,
            next_grade: nextGrade
        });
        console.log(res);
    }
});