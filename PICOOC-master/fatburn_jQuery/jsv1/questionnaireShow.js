var gaugeTime = ""; //称重时段
var goal = ""; //入营目的
var concern = ""; //关注
var position = ""; //关注身体部位
var habit = ""; //不良习惯
var diet = ""; //饮食方式
var sport = ""; //运动频率
var sportAddress = ""; //运动地址
var sportTime = ""; //运动时间
var sportMerchine = ""; //运动装备
var sportHurt = ""; //运动损伤
var sickness = ""; //疾病

//var orderId = getParamByUrl("orderId");
var orderId = 100003;
var userId = getParamByUrl("userId");
$(function(){
    getUserResult();
	
})


function getUserResult(){
    var questionResult="questionResult_"+orderId;
    var result=getCookie(questionResult);
    //var result={"wechatName":"委屈翁","orderId":"100003","userId":"925135","career":"委屈翁","area":"辽宁省鞍山市","weightPeriod":"0","mostTargt":"地方郭德纲","careContent":"饮食计划","bodyParts":"胸背","badEat":"偏爱油腻油炸食品和肉肉等","eatType":"食堂"}
    console.info(result);
    /*var questionResult="questionResult_"+orderId;
    localStorage.getItem(questionResult);
    console.info(localStorage.getItem(questionResult));*/
    if(result != "" && result != null){
      //var result=localStorage.getItem(questionResult);
      console.info(typeof result);
      result=eval('('+ result +')');
      console.info(typeof result);
      console.info(result.wechatName);
      //WX名称
      $("#wechatName").val(result.wechatName);
      //职业
      $("#occupation").val(result.career);
      //所在地
      $("#area").val(result.area);
      //目标
      var goal=result.mostTargt;
      var goalResult=false;
      $("#goal .radio").each(function(){
          if($(this).children("span").text() == goal){
              $(this).addClass("active");
              $(this).css("background-color","#7fa9ff");
              $(this).css("color","#fff");
              $(this).children("img").attr("src","image/withoutCamp/check.png");
              goalResult = true;
          }
      });
      if(!goalResult){
          $("#goal .radio2").addClass("active");
          $("#goal .radio3 img").attr("src","image/withoutCamp/check2.png");
          $("#goal textarea").val(goal);
      }
      //关注
      var concern=result.careContent;
      var concernResult=false;
      $("#concern .radio").each(function(){
          if($(this).children("span").text() == concern){
              $(this).addClass("active");
              $(this).css("background-color","#7fa9ff");
              $(this).css("color","#fff");
              $(this).children("img").attr("src","image/withoutCamp/check.png");
              concernResult = true;
          }
      });
      if(!concernResult){
          /*$("#concern .radio3").click();*/
          $("#concern .radio2").addClass("active");
          $("#concern .radio3 img").attr("src","image/withoutCamp/check2.png");
          $("#concern textarea").val(concern);
      }
      //身体部位
      var bodyParts=result.bodyParts.split("|");
      var bodyPartsResult=false;
      $("#position .radio").each(function(){
          for(var i=0;i<bodyParts.length;i++){
              if($(this).children("span").text() == bodyParts[i]){
                  $(this).addClass("active");
                  $(this).css("background-color","#7fa9ff");
                  $(this).css("color","#fff");
                  $(this).children("img").attr("src","image/withoutCamp/check.png");
                  bodyPartsResult = true;
                  break;
              }
          }
      });
      if(!bodyPartsResult){
          /*$("#position .radio3").click();*/
          $("#position .radio2").addClass("active");
          $("#position .radio3 img").attr("src","image/withoutCamp/check2.png");
          $("#position textarea").val(bodyParts[0]);
      }
      //不良选项
      var badEat=result.badEat.split("|");
      var badEatResult=false;
      $("#habit .radio").each(function(){
          for(var i=0;i<badEat.length;i++){
              if($(this).children("span").text() == badEat[i]){
                  $(this).addClass("active");
                  $(this).css("background-color","#7fa9ff");
                  $(this).css("color","#fff");
                  $(this).children("img").attr("src","image/withoutCamp/check.png");
                  badEatResult = true;
                  break;
              }
          }
      });
      if(!badEatResult){
          /*$("#habit .radio3").click();*/
          $("#habit .radio2").addClass("active");
          $("#habit .radio3 img").attr("src","image/withoutCamp/check2.png");
          $("#habit textarea").val(badEat[0]);
      }
      //日常饮食方式
      var eatType=result.eatType;
      var eatTypeResult=false;
      $("#diet .radio").each(function(){
          if($(this).children("span").text() == eatType){
              $(this).addClass("active");
              $(this).css("background-color","#7fa9ff");
              $(this).css("color","#fff");
              $(this).children("img").attr("src","image/withoutCamp/check.png");
              eatTypeResult = true;
          }
      });
      if(!eatTypeResult){
          /*$("#diet .radio3").click();*/
          $("#diet .radio2").addClass("active");
          $("#diet .radio3 img").attr("src","image/withoutCamp/check2.png");
          $("#diet textarea").val(eatType);
      }
      //上称时段
      var weightPeriod=parseInt(result.weightPeriod);
      $("#gaugeTime .radio").eq(weightPeriod).addClass("active");
      $("#gaugeTime .radio").eq(weightPeriod).css("background-color","#7fa9ff");
      $("#gaugeTime .radio").eq(weightPeriod).css("color","#fff");
      $("#gaugeTime .radio").eq(weightPeriod).children("img").attr("src","image/withoutCamp/check.png");

    }
}