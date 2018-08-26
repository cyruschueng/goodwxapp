var sortClassAsWeek = require('./sortClassAsWeek.js');
var sortClassAsQi = require('./sortClassAsQi.js');

// 获取班级列表并排序
function classList(classes, resData, obj){

  classes = [];
  var classArr = [];
  // console.log(resData);
  for(var i = 0 ; i < resData.length; i++){
    var cur = resData[i];
    var dotIndex = cur.sPrintTime.lastIndexOf(',');
    var lineIndex = cur.sPrintTime.lastIndexOf('-');

    if(dotIndex == -1){
      var times = cur.sPrintTime.slice(0,lineIndex); //上课时间
    }else{
      var times = cur.sPrintTime.slice(dotIndex+1,lineIndex);
    }
    var kemu = cur.sDeptName.substr(2,3);  //学科
    var sClassTypeName = cur.sClassTypeName;  //班级名称
    var studentNumber = cur.studentNum; //学生数量
    var SectBegin = cur.SectBegin; //排序时间
    var lessonNumber = cur.nLesson; //课节数量

    // console.log(resData)
    if(resData[i].sTimeQuanTumCode && resData[i].sTimeQuanTumCode.indexOf('P') == 0){

      if(resData[i].sTimeQuanTumCode.charAt(1) == '0'){
        times = '零期' + times;
        var grade = times +' '+ cur.sGrade + kemu;
      }else if(resData[i].sTimeQuanTumCode.charAt(1) == '1'){
        times = '一期' + times;
        var grade =  times +' '+ cur.sGrade + kemu;
      }else if(resData[i].sTimeQuanTumCode.charAt(1) == '2'){
        times = '二期' + times;
        var grade =  times +' '+ cur.sGrade + kemu;
      }else if(resData[i].sTimeQuanTumCode.charAt(1) == '3'){
        times = '三期' + times;
        var grade =  times +' '+ cur.sGrade + kemu;
      }else if(resData[i].sTimeQuanTumCode.charAt(1) == '4'){
        times = '四期' + times;
        var grade =  times +' '+ cur.sGrade + kemu;
      }
    }else{
      var grade = times +' '+ cur.sGrade + kemu;
    }
    classArr.push({
      SectBegin: SectBegin,
      grade: grade,
      classCode: cur.sClassCode,
      times: times,
      kemu: kemu,
      sClassTypeName: sClassTypeName,
      studentNumber: studentNumber,
      lessonNumber: lessonNumber
    })
  }
  // 给班级排序
  if(classArr[0].times.indexOf('期') != -1){
    // 按‘期’排序
    var newClassArr = sortClassAsQi.sortClassAsQi(classArr);
    console.log(newClassArr)
  }else{
    // 按‘星期’排序
    var newClassArr = sortClassAsWeek.sortClassAsWeek(classArr);
  }
  var j = 0;
  for(var k in newClassArr){
    j++;
    classes.push({id: j-1, value:newClassArr[k].grade})
  }
  obj.setData({classes:classes, classInfo:newClassArr})
  wx.setStorageSync('studentSize',newClassArr.studentNumber)
  wx.setStorageSync('classInfo',newClassArr)
  
}

module.exports = {
  classList:classList
}