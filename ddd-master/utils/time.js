/*
    @purpose 生成一秒
    @createTime 2018-01-20 12:59
    @author mukes_fk
*/
function makeSecond(s=1){
  return s * 1000
}

/*
    @purpose 生成一分钟 或者 多分钟
    @createTime 2018-01-20 12:59
    @author mukes_fk
*/
function makeMinute(m=1){
  return m * 60 * makeSecond();
}

/*
    @purpose 生成一小时 或者多小时
    @createTime 2018-01-20 12:59
    @author mukes_fk
*/
function makeHour(h=1){
  return h * 60 * makeMinute();
}

/*
    @purpose 生成一天 或者多天
    @createTime 2018-01-20 12:59
    @author mukes_fk
*/
function makeDay(day=1){
  return day * 24 * makeHour();
}

/*
    @purpose 得到还剩多少秒(倒计时用的)
    @createTime 2018-01-20 12:59
    @author mukes_fk
*/
function getSecond(ms) {
  return floor(ms / 1000 % 60);
}

/*
    @purpose 得到还剩多少分(倒计时用的)
    @createTime 2018-01-20 12:59
    @author mukes_fk
*/
function getMinute(ms) {
  return floor(ms / 1000 /60 % 60);
}

/*
    @purpose 得到还剩多少小时(倒计时用的)
    @createTime 2018-01-20 12:59
    @author mukes_fk
*/
function getHour(ms) {
  return floor(ms /1000 / 60 / 60 % 24 );
}

/*
    @purpose 得到还剩多少小时(倒计时用的)
    @createTime 2018-01-20 12:59
    @author mukes_fk
*/
function getDay(ms) {
  return floor(ms /1000 / 60 / 60 / 24);
}





module.exports = {
    makeSecond,makeMinute,makeHour,makeDay,
    getSecond,getMinute,getHour,getDay
}
