/*
class DateUtility{
    static instance;
    constructor(){
    }
    static getInstance(){
        if(!this.instance) this.instance = new DateUtility();
        return this.instance;
    }
}
module.exports = DateUtility.getInstance();
*/
let day = ['星期七','星期一','星期二','星期三','星期四','星期五','星期六'];
let getTimeFormate = (hour,minute)=>{
    hour = hour<10?'0'+hour:hour;
    minute = minute<10?'0'+minute:minute;
    return hour+':'+minute;
};

class DateUtility{
    static getDateAndDay(dateString){
        let d = new Date(dateString);
        let date = `${d.getMonth()+1}月${d.getDate()}日,${day[d.getDay()]}`;
        return date;
    }
    static getDateAndTime(timeString){
        let d = new Date(timeString);
        let date = `${d.getMonth()+1}月${d.getDate()}日 ${getTimeFormate(d.getHours(),d.getMinutes())}`;
        return date;
    }
}
module.exports = DateUtility;