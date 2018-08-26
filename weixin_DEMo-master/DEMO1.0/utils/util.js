function DateDiff(i) {    //sDate1和sDate2是2002-12-18格式  
 var year,month,day,today,thatDay;
    today = new Date().getTime();
    thatDay = new Date( today + i*(24*60*60*1000) ).toLocaleString().substr(0,9);
    year  = thatDay.substr(0,4);
    month = thatDay.substr(5,1);
    day = thatDay.substr(7,2);
    thatDay = year+"-"+month +"-"+day;
   return thatDay
}
function DateF(){

 var d = new Date();
 var curr_date = d.getDate();
 var curr_month = d.getMonth() + 1;//Months are zero based
 var curr_year = d.getFullYear();
 return curr_date +"-" + curr_month +"-" + curr_year;
}
module.exports={
    DateDiff:DateDiff,
    DateF:DateF
}