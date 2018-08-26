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

var orderId = getParamByUrl("orderId");
/*var orderId = 100003;*/
var userId = getParamByUrl("userId");
$(function(){
  
  appNoShare("个人资料完善");
	//appNoShare();
  $(".select2").attr("disabled","disabled");
  $(".select1").change(function(){
     if($(".select1").val() != ""){
        $(".select2").removeAttr("disabled");
     }else{
        $(".select2").attr("disabled","disabled");
     }
  });

	//称重时段点击事件
  	$("#gaugeTime .radio").unbind("click").click(function(){
  		$("#gaugeTime .radio").css("background-color","#fff");
  		$("#gaugeTime .radio").css("color","#696969");
  		$("#gaugeTime .radio").removeClass("active");
  		$("#gaugeTime .radio img").attr("src","image/withoutCamp/nocheck.png");
  		$(this).addClass("active");
  		$(this).css("background-color","#7fa9ff");
  		$(this).css("color","#fff");
    	$(this).children("img").attr("src","image/withoutCamp/check.png");
    	var index = $(this).index();
    	gaugeTime = index;
  	});
  	//参加目标点击
  	$("#goal .radio").unbind("click").click(function(){
  		$("#goal .radio").css("background-color","#fff");
  		$("#goal .radio").css("color","#696969");
  		$("#goal .radio").removeClass("active");
  		$("#goal .radio2").removeClass("active");
  		$("#goal .radio img").attr("src","image/withoutCamp/nocheck.png");
  		$("#goal .radio3 img").attr("src","image/withoutCamp/nocheck.png");
  		$(this).addClass("active");
  		$(this).css("background-color","#7fa9ff");
  		$(this).css("color","#fff");
    	$(this).children("img").attr("src","image/withoutCamp/check.png");
      $("#goal textarea").val("");
    	goal = $(this).children("span").html();
    	// alert(goal);
  	});
  	$("#goal .radio2").unbind("click").click(function(){
  		$("#goal .radio").css("background-color","#fff");
  		$("#goal .radio").css("color","#696969");
  		$("#goal .radio").removeClass("active");
  		$("#goal .radio img").attr("src","image/withoutCamp/nocheck.png");
  		$(this).addClass("active");
    	$("#goal .radio3 img").attr("src","image/withoutCamp/check2.png");
    	$("#goal textarea").focus();
    	goal = "other";
  	});
  	//concern 关注 点击
  	$("#concern .radio").unbind("click").click(function(){
  		$("#concern .radio").css("background-color","#fff");
  		$("#concern .radio").css("color","#696969");
  		$("#concern .radio").removeClass("active");
  		$("#concern .radio2").removeClass("active");
  		$("#concern .radio img").attr("src","image/withoutCamp/nocheck.png");
  		$("#concern .radio3 img").attr("src","image/withoutCamp/nocheck.png");
  		$(this).addClass("active");
  		$(this).css("background-color","#7fa9ff");
  		$(this).css("color","#fff");
    	$(this).children("img").attr("src","image/withoutCamp/check.png");
    	concern = $(this).children("span").html();
    	// alert(concern);
  	});
  	$("#concern .radio2").unbind("click").click(function(){
  		$("#concern .radio").css("background-color","#fff");
  		$("#concern .radio").css("color","#696969");
  		$("#concern .radio").removeClass("active");
  		$("#concern .radio img").attr("src","image/withoutCamp/nocheck.png");
  		$(this).addClass("active");
    	$("#concern .radio3 img").attr("src","image/withoutCamp/check2.png");
    	$("#concern textarea").focus();
    	concern = "other";
  	});
  	//关注身体部位 position
  	$("#position .radio").unbind("click").click(function(){
  		var len =  $("#position .active").length;
  		console.log(len);
  		if(len<2){
	  		if($(this).hasClass("active")){
		  		$(this).removeClass("active");
		  		$(this).css("background-color","#fff");
		  		$(this).css("color","#696969");
		    	$(this).children("img").attr("src","image/withoutCamp/checkboxNo.png");
	  		}else{
		  		$(this).addClass("active");
		  		$(this).css("background-color","#7fa9ff");
		  		$(this).css("color","#fff");
		    	$(this).children("img").attr("src","image/withoutCamp/checkboxYes.png");
		    	// position = $(this).children("span").html();
	  		}
  		}else if(len==2){
	  		if($(this).hasClass("active")){
		  		$(this).removeClass("active");
		  		$(this).css("background-color","#fff");
		  		$(this).css("color","#696969");
		    	$(this).children("img").attr("src","image/withoutCamp/checkboxNo.png");
	  		}
  		}
    	// alert(position);
  	});
  	$("#position .radio2").unbind("click").click(function(){
  		var len =  $("#position .active").length;
  		console.log(len);
  		if(len<2){
	  		if($(this).hasClass("active")){
		  		$(this).removeClass("active");
		    	$("#position .radio3 img").attr("src","image/withoutCamp/checkboxNo.png");
		    	position = "";
	  		}else{
		  		$(this).addClass("active");
		    	$("#position .radio3 img").attr("src","image/withoutCamp/checkboxYes3.png");
		    	$("#position textarea").focus();
		    	position = "other";
	  		}
	  		$("#position .radio2 textarea").unbind("click").click(function(event){
	  			event.stopPropagation();
	  		})
  		}else if(len==2){
	  		if($(this).hasClass("active")){
		  		$(this).removeClass("active");
		    	$("#position .radio3 img").attr("src","image/withoutCamp/checkboxNo.png");
		    	position = "";
	  		}
  		}
  	});
  	//不良习惯 habit
  	$("#habit .radio").unbind("click").click(function(){
  		if($(this).hasClass("active")){
	  		$(this).removeClass("active");
	  		$(this).css("background-color","#fff");
	  		$(this).css("color","#696969");
	    	$(this).children("img").attr("src","image/withoutCamp/checkboxNo.png");
  		}else{
	  		$(this).addClass("active");
	  		$(this).css("background-color","#7fa9ff");
	  		$(this).css("color","#fff");
	    	$(this).children("img").attr("src","image/withoutCamp/checkboxYes.png");
  		}
    	// alert(habit);
  	});
  	$("#habit .radio2").unbind("click").click(function(){
  		if($(this).hasClass("active")){
	  		$(this).removeClass("active");
	    	$("#habit .radio3 img").attr("src","image/withoutCamp/checkboxNo.png");
	    	habit="";	
  		}else{
	  		$(this).addClass("active");
	    	$("#habit .radio3 img").attr("src","image/withoutCamp/checkboxYes3.png");
	    	$("#habit textarea").focus();
	    	habit="other";
  		}
  		$("#habit .radio2 textarea").unbind("click").click(function(event){
  			event.stopPropagation();
  		});
  	});
  	//diet 饮食方式
  	$("#diet .radio").unbind("click").click(function(){
  		$("#diet .radio").css("background-color","#fff");
  		$("#diet .radio").css("color","#696969");
  		$("#diet .radio").removeClass("active");
  		$("#diet .radio img").attr("src","image/withoutCamp/nocheck.png");
  		$(this).addClass("active");
  		$(this).css("background-color","#7fa9ff");
  		$(this).css("color","#fff");
    	$(this).children("img").attr("src","image/withoutCamp/check.png");
    	diet = $(this).children("span").html();
    	// alert(diet);
  	});

    //获取缓存的答案
    getUserResult();
  	//提交
  	//$(".submit").unbind("click").bind("click",function(){
    $("#submitBtn").unbind("click").bind("click",function(){
    		var str = "";
        var isGoal = false,isConcern = false,isPosition=false,isHabit = false,isSport=false,isSportAddress=false,isSportMerchine=false,isSickness=false;

    		var province = $("#question-map2 .select1 option:selected").attr("title"); //省份
    		var city = $("#question-map2 .select2 option:selected").attr("title");	//市
    		if(province=="请选择" || province==undefined){
    			province="";
    		}

    		if(city=="请选择" || city==undefined){
    			city="";
    		}
  		  var area = province+city;		
    		var wechatName = $.trim($("#wechatName").val()); //微信号
    		var occupation = $.trim($("#occupation").val()); //职业
    		//gaugeTime 称重时段
    		console.log(occupation);
    		console.log(wechatName);
    		if($("#goal .radio2.active").length>0){
          isGoal = true; 
    			goal = $.trim($("#goal textarea").val()); //入营目标
    		}
      	// var gaugeTime = ""; //称重时段
      	// var goal = ""; //入营目的
      	// var concern = ""; //关注
      	// var position = ""; //关注身体部位
      	// var habit = ""; //不良习惯
      	// var diet = ""; //饮食方式
      	// var sport = ""; //运动频率
      	// var sportAddress = ""; //运动地址
      	// var sportTime = ""; //运动时间
      	// var sportMerchine = ""; //运动装备
      	// var sportHurt = ""; //运动损伤
      	// var sickness = ""; //疾病
    		if($("#concern .radio2.active").length>0){
          isConcern = true;
    			concern = $.trim($("#concern textarea").val());
    		}
    		if($("#position .radio2.active").length>0){
          isPosition = true;
    			position = $.trim($("#position textarea").val());
    	  		var len2 =  $("#position .radio.active").length;
    	  		console.log("len2:"+len2);
    	  		if(len2>0){
    				position += "|"+$.trim($("#position .radio.active").eq(0).children("span").html());
    	  		}
    	  		console.log(position);
    		}else{
    			position = "";
    	  		var len2 =  $("#position .radio.active").length;
    	  		console.log("len2:"+len2);
    	  		if(len2>0){
    		  		for(i=0;i<len2;i++){
    		  			if(i==len2-1){
    		  				position += $.trim($("#position .radio.active").eq(i).children("span").html());
    		  			}else{
    		  				position += $.trim($("#position .radio.active").eq(i).children("span").html())+"|";
    		  			}
    		  		}
    	  		}
    	  		console.log(position);
    		}

		if($("#habit .radio2.active").length>0){
      isHabit = true;
			habit = $.trim($("#habit textarea").val());
	  		var len2 =  $("#habit .radio.active").length;
	  		console.log("len2:"+len2);
	  		if(len2>0){
	  			for(i=0;i<len2;i++){
	  				habit += "|"+$.trim($("#habit .radio.active").eq(i).children("span").html());
	  			}
	  		}
	  		console.log(habit);
		}else{
			habit = "";
	  		var len2 =  $("#habit .radio.active").length;
	  		console.log("len2:"+len2);
	  		if(len2>0){
		  		for(i=0;i<len2;i++){
		  			if(i==len2-1){
		  				habit += $.trim($("#habit .radio.active").eq(i).children("span").html());
		  			}else{
		  				habit += $.trim($("#habit .radio.active").eq(i).children("span").html())+"|";
		  			}
		  		}
	  		}
	  		console.log(habit);
		}





		if(wechatName==""){
			str+=" 1";
		}
		if(occupation==""){
			str+=" 2";
		}
		if(province=="" || city==""){
			str+=" 3";
		}
		
		if(!isGoal && goal==""){
			str+=" 4";
		}
		if(!isConcern && concern==""){
			str+=" 5";
		}
		if(!isPosition && position==""){
			str+=" 6";
		}
		if(!isHabit && habit==""){
			str+=" 7";
		}
		if(diet==""){
			str+=" 8";
		}

    if(gaugeTime===""){
      str+=" 9";
    }

    /*添加缓存完毕*/

    var questionData="{"+'"wechatName":'+'"'+wechatName+'"'+',"orderId":'+'"'+orderId+'"'+',"userId":'+'"'+userId+'"'+',"career":'+'"'+occupation+'"'+',"area":'+'"'+area+'"'+',"weightPeriod":'+'"'+gaugeTime+'"'+',"mostTargt":'+'"'+goal+'"'+',"careContent":'+'"'+concern+'"'+',"bodyParts":'+'"'+position+'"'+',"badEat":'+'"'+habit+'"'+',"eatType":'+'"'+diet+'"'+"}";
    //缓存:
    var questionResult="questionResult_"+orderId;
    setCookie(questionResult,questionData,30);
    //localStorage.setItem(questionResult,questionData)
		if(str==""){
			  //questionData="{"+'"wechatName":'+'"'+wechatName+'"'+',"orderId":'+'"'+orderId+'"'+',"userId":'+'"'+userId+'"'+',"career":'+'"'+occupation+'"'+',"area":'+'"'+area+'"'+',"weightPeriod":'+'"'+gaugeTime+'"'+',"physicalPeriod":'+'"'+physicalPeriod+'"'+',"mostTargt":'+'"'+goal+'"'+',"careContent":'+'"'+concern+'"'+',"bodyParts":'+'"'+position+'"'+',"badEat":'+'"'+habit+'"'+',"eatType":'+'"'+diet+'"'+',"sportTimes":'+'"'+sport+'"'+',"sportVenues":'+'"'+sportAddress+'"'+',"sportlong":'+'"'+sportTime+'"'+',"sportEquip":'+'"'+sportMerchine+'"'+',"sportInjury":'+'"'+sportHurt+'"'+',"injuryDesc":'+'"'+sportHurtContent+'"'+',"sick":'+'"'+sickness+'"'+"}";
		    //questionData="{}";
        var host=window.location.protocol+"//"+window.location.host;
		    var finalUrl=host+"/v1/api/campQuestion/insertQuestion"+window.location.search;
		    console.info(questionData);
		    console.info(finalUrl);
		    $.ajax({
		        type:"POST",
		        data:questionData,
		        url:finalUrl,
		        dataType:"json",
		        contentType: 'application/json',
		        success:function(data){
		            if(data.code == 200){
		                window.location.href="questionSubmit.html"+window.location.search;
		            }else{
		                $(".error-main-t").html(data.message);
		                $(".errorAlert").css("display","block");
		                $(".error-main").css("margin-top",-$(".error-main").height()/2);
		            }
		        }
		    });
		}else{
	        $(".error-main-t").html("请您填写完第"+$.trim(str)+"道题，再来提交吧~");
	        $(".errorAlert").css("display","block");
	        $(".error-main").css("margin-top",-$(".error-main").height()/2);
		}
  	});
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
      //目标
      var goal=result.mostTargt;
      var goalResult=false;
      $("#goal .radio").each(function(){
          if($(this).children("span").text() == goal){
              $(this).click();
              goalResult = true;
          }
      });
      if(!goalResult){
          $("#goal .radio3").click();
          $("#goal textarea").val(goal);
      }
      //关注
      var concern=result.careContent;
      var concernResult=false;
      $("#concern .radio").each(function(){
          if($(this).children("span").text() == concern){
              $(this).click();
              concernResult = true;
          }
      });
      if(!concernResult){
          $("#concern .radio3").click();
          $("#concern textarea").val(concern);
      }
      //身体部位
      var bodyParts=result.bodyParts.split("|");
      var bodyPartsResult=false;
      $("#position .radio").each(function(){
          for(var i=0;i<bodyParts.length;i++){
              if($(this).children("span").text() == bodyParts[i]){
                  $(this).click();
                  bodyPartsResult = true;
                  break;
              }
          }
      });
      if(!bodyPartsResult){
          $("#position .radio3").click();
          $("#position textarea").val(bodyParts[0]);
      }
      //不良选项
      var badEat=result.badEat.split("|");
      var badEatResult=false;
      $("#habit .radio").each(function(){
          for(var i=0;i<badEat.length;i++){
              if($(this).children("span").text() == badEat[i]){
                  $(this).click();
                  badEatResult = true;
                  break;
              }
          }
      });
      if(!badEatResult){
          $("#habit .radio3").click();
          $("#habit textarea").val(badEat[0]);
      }
      //日常饮食方式
      var eatType=result.eatType;
      var eatTypeResult=false;
      $("#diet .radio").each(function(){
          if($(this).children("span").text() == eatType){
              $(this).click();
              eatTypeResult = true;
          }
      });
      if(!eatTypeResult){
          $("#diet .radio3").click();
          $("#diet textarea").val(eatType);
      }
      //上称时段
      var weightPeriod=parseInt(result.weightPeriod);
      $("#gaugeTime .radio").eq(weightPeriod).click();

    }
}

var deviceType=isMobile();
//设置标题
function appNoShare(title){
  var getPageInfo = function (){
    var data = {
      title:title,
      /*isShare:false,
      backgroundColor:'#2c2f31'*/
      color:"",
      opacity:"",
      backgroundColor:"",
      backgroundOpacity:""
    };
    return JSON.stringify(data);
  };
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
      if(getParamByUrl("os")=="android"){
        mobileApp.controlTitle(getPageInfo());
      }
      else{
        mobileApp.controlTitle.postMessage(getPageInfo());
      }
    //mobileApp.getShareInfo(getPageInfo());
  }
  document.documentElement.style.webkitTouchCallout='none';
}