function sortClassAsWeek(week){
  for(var i = 0 ; i < week.length; i++){
    var timeStr = week[i].times;
    var timeNum = Number(timeStr.split(':').join('').substr(-4));
    if(timeStr.indexOf('周一上午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 1110000 + timeNum;
    }else if(timeStr.indexOf('周一下午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 1120000 + timeNum;
    }else if(timeStr.indexOf('周一夜晚') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 1130000 + timeNum;
    }else if(timeStr.indexOf('周二上午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 2210000 + timeNum;
    }else if(timeStr.indexOf('周二下午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 2220000 + timeNum;
    }else if(timeStr.indexOf('周二夜晚') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 2230000 + timeNum;
    }else if(timeStr.indexOf('周三上午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 3310000 + timeNum;
    }else if(timeStr.indexOf('周三下午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 3320000 + timeNum;
    }else if(timeStr.indexOf('周三夜晚') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 3330000 + timeNum;
    }else if(timeStr.indexOf('周四上午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 4410000 + timeNum;
    }else if(timeStr.indexOf('周四下午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 4420000 + timeNum;
    }else if(timeStr.indexOf('周四夜晚') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 4430000 + timeNum;
    }else if(timeStr.indexOf('周五上午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 5510000 + timeNum;
    }else if(timeStr.indexOf('周五下午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 5520000 + timeNum;
    }else if(timeStr.indexOf('周五夜晚') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 5530000 + timeNum;
    }else if(timeStr.indexOf('周六上午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 6610000 + timeNum;
    }else if(timeStr.indexOf('周六下午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 6620000 + timeNum;
    }else if(timeStr.indexOf('周六夜晚') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 6630000 + timeNum;
    }else if(timeStr.indexOf('周日上午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 7710000 + timeNum;
    }else if(timeStr.indexOf('周日下午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 7720000 + timeNum;
    }else if(timeStr.indexOf('周日夜晚') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 7730000 + timeNum;
    }
    /*else if(timeStr.indexOf('零期上午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 1110000 + timeNum;
    }else if(timeStr.indexOf('零期下午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 1120000 + timeNum;
    }else if(timeStr.indexOf('零期夜晚') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 1130000 + timeNum;
    }else if(timeStr.indexOf('一期上午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 2210000 + timeNum;
    }else if(timeStr.indexOf('一期下午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 2220000 + timeNum;
    }else if(timeStr.indexOf('一期夜晚') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 2230000 + timeNum;
    }else if(timeStr.indexOf('二期上午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 3310000 + timeNum;
    }else if(timeStr.indexOf('二期下午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 3320000 + timeNum;
    }else if(timeStr.indexOf('二期夜晚') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 3330000 + timeNum;
    }else if(timeStr.indexOf('三期上午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 4410000 + timeNum;
    }else if(timeStr.indexOf('三期下午') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 4420000 + timeNum;
    }else if(timeStr.indexOf('三期夜晚') != -1){
      week[i].saveTimes = timeStr;
      week[i].times = 4430000 + timeNum;
    }*/
  }

  week.sort(function(a,b){
    return a.times - b.times
  })
  for(var i = 0 ; i < week.length; i++){
    var cur = week[i];
    cur['times'] = cur['saveTimes'];
  }
  return week;
};


module.exports = {  
  sortClassAsWeek: sortClassAsWeek
}