var schoolevents = new Array(
  "20170218 开学",
  "20170219 开学",
  "20170220 上课",
  "20170402 清明放假",
  "20170403 清明放假",
  "20170404 清明放假",
  "20170429 五一放假",
  "20170430 五一放假",
  "20170501 五一放假",
  "20170528 端午放假",
  "20170529 端午放假",
  "20170530 端午放假",
  "20170617 四六级考试",
  "20170701 考试结束",
  "20170902 老生报到",
  "20170903 老生报到",
  "20170904 新生报到老生上课",
  "20170904 新生报到",
  "20170905 新生报到",
  "20170906 新生入学教育",
  "20170907 新生入学教育",
  "20170908 新生入学教育",
  "20170909 新生入学教育",
  "20170910 新生入学教育",
  "20171001 国庆节",
  "20171002 国庆节",
  "20171003 国庆节",
  "20171004 中秋节",
  "20171005 国庆节",
  "20171006 国庆节",
  "20171007 国庆节",
  "20180101 元旦",
  "20180119 寒假",
  "20180216 春节",
  "20180302 元宵",
  "20180303 报到",
  "20180304 报到",
  "20180304 上课",
  "20180405 清明放假",
  "20180406 清明放假",
  "20180407 清明放假",
  "20180429 五一放假",
  "20180430 五一放假",
  "20180501 五一放假",
  "20180618 端午放假",
  "20180619 端午放假",
  "20180620 端午放假",
  "20180720 暑假",
);
var schoolTime = new Array();
var schoolEvent = new Array();

for (var i = 0; i < schoolevents.length; i++) {
  schoolTime.push(schoolevents[i].split(" ")[0]);
  schoolEvent.push(schoolevents[i].split(" ")[1]);
}



function SchoolCalendar() {
  this.school = function (date) {

    var year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate();

    if (month < 10) {
      month = "0" + month
    }
    if (day < 10) {
      day = "0" + day
    }


    for (let i = 0; i < schoolTime.length; i++) {
      if (schoolTime[i] === year + month + day)
        return schoolEvent[i]
      else
        continue
    }
  }

}




module.exports = {
  SchoolCalendar: SchoolCalendar
}