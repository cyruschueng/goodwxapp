// pages/calendar/calendar.js
const app = getApp();
let dayscount = 90;
let moenyDescArray = new Array;
var isContain=true
var totalMoney=0
Page({

        /**
         * 页面的初始数据
         */
        data: {
                checkInDay: '',
                checkOutDay: '',
                festivaltag: {
                        "2017/1/1": "元旦"
                }

        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                moenyDescArray = JSON.parse(options.moenyDesc)
                this.setData({
                        moenyDescArray: moenyDescArray
                })
                if (dayscount == 0) {
                        wx.showModal({
                                title: '警告',
                                showCancel: false,
                                content: '不可预订',
                                success: function (res) {
                                        if (res.confirm) {
                                                wx.navigateBack();
                                        }
                                }
                        })
                } else {
                        wx.setNavigationBarTitle({
                                title: '请选择入住日期'
                        })
                        intDate(this);
                }

        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {
                wx.hideLoading()
                console.log("onReady:"+new Date().getTime())
        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {
                wx.showLoading({
                        title: '加载中..',
                })
                console.log("onShow:" + new Date().getTime())
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
        chooseDay(e) {
                isContain = true
                totalMoney=0
                let checkDay = e.currentTarget.dataset.checkDay;
                //2018/04/19
                console.error("日期格式："+checkDay)
                let checkInDay = this.data.checkInDay,
                        checkOutDay = this.data.checkOutDay;
                if (checkInDay == '') {
                        checkInDay = checkDay;
                        wx.setNavigationBarTitle({
                                title: '请选择退房日期'
                        })
                } else if (checkInDay != '' && checkOutDay == '') {
                        let turn = new Date(checkInDay) >= new Date(checkDay);
                        if (turn) {
                                checkInDay = checkDay
                        } else {
                                //计算退房日期和入住日期之间是否都有空房
                                //有就可以入住  无就提示客户不可预订
                                // checkOutDay = checkDay;
                                var start_time = checkInDay;
                                var end_time = checkDay;
                                var bd = new Date(start_time), be = new Date(end_time);
                                var bd_time = bd.getTime(), be_time = be.getTime(), time_diff = be_time - bd_time;
                                var d_arr = [];
                                for (var i = 0; i < time_diff; i += 86400000) {
                                        var ds = new Date(bd_time + i);
                                        var _month = ds.getMonth() + 1
                                        var _day = ds.getDate()
                                        _month = _month > 9 ? _month : "0" + _month
                                        _day = _day > 9 ? _day : "0" + _day
                                        d_arr.push(ds.getFullYear() + '' + _month + '' + _day)
                                        console.log(ds.getFullYear()+ '年'+(ds.getMonth() + 1) + '月' + ds.getDate() + '日')
                                }  
                                moenyDescArray.forEach((v, k) => {
                                        //console.log(v.ActivityDate)
                                        // if (v.year === valueYear && v.month === valueMonth) {
                                        //         currentMonth = v.items
                                        // }
                                })
                                for (let i = 0; i < moenyDescArray.length; i++) {
                                        d_arr.forEach((v, k, array) => {
                                                //console.log(array[k])
                                                if (moenyDescArray[i].ActivityDate == array[k] && moenyDescArray[i].Num == 0) {
                                                        console.log(array[k])
                                                        console.log(moenyDescArray[i].ActivityDate)

                                                        console.error(moenyDescArray[i].DailyPrice)
                                                        isContain = false
                                                } else if (moenyDescArray[i].ActivityDate == array[k] && moenyDescArray[i].Num > 0) {
                                                        console.log(moenyDescArray[i].DailyPrice)
                                                        totalMoney+= moenyDescArray[i].DailyPrice

                                                }
                                        })
                                }
                                if (isContain){
                                        checkOutDay = checkDay;
                                }else{
                                        checkInDay = checkDay
                                }
                                console.log(isContain +"totalMoney:"+ totalMoney)
                        }
                }
                this.setData({ checkInDay, checkOutDay });
                if (checkInDay != '' && checkOutDay != '') {
                        var livingDays = new Date(checkOutDay) - new Date(checkInDay);
                        livingDays = livingDays / 24 / 60 / 60 / 1000;

                        wx.showModal({
                                title: '确认入住和离开日期',
                                content: checkInDay + '--' + checkOutDay,
                                success: (res) => {
                                        if (res.confirm) {
                                                app.globalData.checkInDay = checkInDay;
                                                app.globalData.checkOutDay = checkOutDay;
                                                app.globalData.livingDays = livingDays;

                                                totalMoney = Math.round(parseFloat(totalMoney) * 100) / 100
                                                var pages = getCurrentPages();
                                                var currPage = pages[pages.length - 1];   //当前页面
                                                var prevPage = pages[pages.length - 2];  //上一个页面

                                                prevPage.setData({
                                                        start: checkInDay,
                                                        end: checkOutDay,
                                                        day: livingDays,
                                                        roomPrice: totalMoney
                                                })
                                                wx.navigateBack({
                                                        delta: 1
                                                })
                                        } else if (res.cancel) {
                                                this.setData({
                                                        checkInDay: '',
                                                        checkOutDay: ''
                                                })
                                                wx.setNavigationBarTitle({
                                                        title: '请选择入住日期'
                                                })
                                        }
                                }
                        })
                }
        }
});

function intDate(self) {
        let nowDate = new Date(),
                nowYear = nowDate.getFullYear(),
                nowMonth = nowDate.getMonth(),
                today = nowDate.getDate();
        let endDate = new Date(nowYear, nowMonth, today + dayscount),
                endYM = new Date(endDate.getFullYear(), endDate.getMonth());
               
        let dates = [];
        for (let i = nowMonth; new Date(nowYear, i) <= endYM; i++) {
                let item = [];
                let monthDays = new Date(nowYear, i + 1, 0).getDate(); //获取该月天数  +1
                for (let j = 1; j <= monthDays; j++) {
                        let _year = new Date(nowYear, i).getFullYear(),
                                _month = new Date(nowYear, i).getMonth() + 1; //获取该月月份 +1
                        _month = _month > 9 ? _month : "0" + _month
                        console.error(_month)
                        j = j > 9 ? j : "0" + j
                        let day = _year + '/' + _month + '/' + j;
                        item.push(day.toString());
                }
                // fillDay(item);
                dates.push(item);
        }
        let startDay = `${nowYear}/${nowMonth + 1}/${today}`,
                endDay = `${endDate.getFullYear()}/${endDate.getMonth() + 1}/${endDate.getDate()}`;
        console.error("startDay:" + startDay + "endDay:" + endDay)
        self.setData({ dates, startDay, endDay })
}