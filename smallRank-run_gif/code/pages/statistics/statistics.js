'use strict';
const app = getApp()
let choose_year = null,
    choose_month = null;
const conf = {
    data: {
        hasEmptyGrid: false,
        monthInfo:{},
        weeks_ch: ['日', '一', '二', '三', '四', '五', '六'],
        cur_day:null,
        user:{},
        todayRunInfo:{}
    },

    stepChange:function (n) {
        if(n>=10000){
            n = parseInt(n/1000) + 'k';
        }
        return n;
    },
    initDate:function () {
        let date = new Date();
        var now = "";
        now = date.getFullYear() + "-"; //读英文就行了
        if (date.getMonth() < 10) {
            if((date.getMonth() + 1)<10){ now = now + "0" + (date.getMonth() + 1) + "-" }
            else{now = now + (date.getMonth() + 1) + "-"}
        } else {
            now = now + (date.getMonth() + 1) + "-";//取月的时候取的是当前月-1如果想取当前月+1就可以了
        }
        if(date.getDate()<10){
            now = now +"0"+ date.getDate();
        }else {
            now = now + date.getDate();
        }
        let cur_year = date.getFullYear();
        /**年份 */
        let cur_month = date.getMonth() + 1;
        /**月 */
        this.setData({
            cur_day:now
        })
         this.nowYear = cur_year;
        this.nowMonth = cur_month;
        let todayIndex = date.getDay() - 1;
        let today = date.getDate();

        this.setData({
            today:today,
            _month:cur_month,
            cur_month:cur_month,
            cur_year:cur_year,
            nowYear:cur_year,
            nowMonth:cur_month
        })


    },
    onLoad() {
        this.initDate();
        const date = new Date();
        const cur_year = date.getFullYear();
        const cur_month = date.getMonth() + 1;
        const cur_date = date.getDate();
        this.calculateEmptyGrids(cur_year, cur_month);
        this.calculateDays(cur_year, cur_month,cur_date);
        this.setData({
            cur_year,
            cur_month,
            cur_date,
            user:app.getUser()
        });

    },
    clickDay:function (e) {
        let step= e.currentTarget.dataset.step;
        let index= e.currentTarget.dataset.index;
        let days = this.data.days;
        for(let i =0;i<days.length;i++){
            if(i!=index){
                days[i].selected=false
            }else{
                days[i].selected=true
            }
        }
        this.setData({days})
        this.getDayRunInfo(step);
    },
    getDayRunInfo:function (step) {
        let _this=this;

        let showKm =0 , showPower=0;
        if(_this.data.user.sex==2){
              showKm = (step*0.66/1000).toFixed(1);
              showPower = parseInt(showKm*35)
        }else{
              showKm = (step*0.74/1000).toFixed(1);
              showPower = parseInt(showKm*40)
        }

        this.setData({
            todayRunInfo:{
                step:_this.stepChange(step),
                km:showKm,
                kll:showPower
            }
        })


    },


    getThisMonthDays(year, month) {
        return new Date(year, month, 0).getDate();
    },
    getFirstDayOfWeek(year, month) {
        return new Date(Date.UTC(year, month - 1, 1)).getDay();
    },
    calculateEmptyGrids(year, month) {
        const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
        let empytGrids = [];
        if (firstDayOfWeek > 0) {
            for (let i = 0; i < firstDayOfWeek; i++) {
                empytGrids.push(i);
            }
            this.setData({
                hasEmptyGrid: true,
                empytGrids
            });
        } else {
            this.setData({
                hasEmptyGrid: false,
                empytGrids: []
            });
        }
    },
    calculateDays(year, month,day) {

        let days = [];
        let _this=this;

        const thisMonthDays = this.getThisMonthDays(year, month);

        for (let i = 1; i <= thisMonthDays; i++) {
            days.push({index: i - 1, date: ""});
        }
        _this.setData({
            days:days
        });

        days = [];
        wx.request({
            url:  app.API_URL+'werun/month/statistics/'+app.getUserId()+'?date=' + year + '-'+ month +'-' + day,
            method: 'GET',
            success: function (response) {
                console.log(response)
                if(response.data.status===1){
                    //进度条统计


                    //文字统计

                    let monthchange = month;
                    if (month < 10) monthchange = "0" + monthchange;


                    //日历输出
                    if (thisMonthDays > 0) {
                        for (let i = 1; i <= thisMonthDays; i++) {
                            let dayChange = i;
                            if (i < 10) dayChange = "0" + i;
                            let dateStr = year + "-" + monthchange + "-" + dayChange;
                            let step = 0 ,stepShow=0;

                            for (let j = 0; j < response.data.data.length; j++) {
                                if (dateStr === response.data.data[j].date) {
                                    step = (response.data.data[j].step);
                                    stepShow = _this.stepChange(response.data.data[j].step);


                                    if(_this.data.cur_year + "-" + _this.data.cur_month + "-" +   _this.data.cur_date == year + "-" + month + "-" + i){
                                        _this.getDayRunInfo(step);
                                    }
                                }
                            }



                            if(dateStr<=_this.data.cur_day){
                                days.push({index: i - 1, date: dateStr, step:step,stepShow:stepShow});
                            } else{
                                days.push({index: i - 1, date: dateStr, step: -1});
                            }
                        }
                    }

                    _this.setData({
                        days:days
                    });


                }


            }
        });





    },
    handleCalendar(e) {
        const handle = e.currentTarget.dataset.handle;
        const cur_year = this.data.cur_year;
        const cur_month = this.data.cur_month;
        const cur_date = this.data.cur_date;

        if (handle === 'prev') {
            let newMonth = cur_month - 1;
            let newYear = cur_year;
            if (newMonth < 1) {
                newYear = cur_year - 1;
                newMonth = 12;
            }

            this.calculateDays(newYear, newMonth,cur_date);
            this.calculateEmptyGrids(newYear, newMonth);

            this.setData({
                cur_year: newYear,
                cur_month: newMonth
            });

        } else {
            let newMonth = cur_month + 1;
            let newYear = cur_year;
            if (newMonth > 12) {
                newYear = cur_year + 1;
                newMonth = 1;
            }

            let date=new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            if(newYear==year&&newMonth>month){


                return ;
            }
            this.calculateDays(newYear, newMonth,cur_date);
            this.calculateEmptyGrids(newYear, newMonth);

            this.setData({
                cur_year: newYear,
                cur_month: newMonth
            });
        }
    },




};

Page(conf);
