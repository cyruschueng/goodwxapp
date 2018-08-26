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
// alert("测试，不要方");
$(function(){
	showTime();
	appNoShare();
	leftControl(false);

  $(".select2").attr("disabled","disabled");
  $(".select1").change(function(){
     if($(".select1").val() != ""){
        $(".select2").removeAttr("disabled");
     }else{
        $(".select2").attr("disabled","disabled");
     }
  });

  var deviceType=isMobile();
  if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
      // if(getCookie("toQuestionnaire") == "1"){ //从下单成功页面进入
      //     if(getCookie("toOrderSuccess") == "1"){ //从订单列表进入的下单成功页
      //       var getPageInfo = function (){
      //         var data = {
      //           iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
      //           backNum:2,
      //           closeWebview:0,//默认为0
      //           iconUrl:""
      //         };
      //         return JSON.stringify(data);
      //       };
      //       mobileApp.showLeftBtn(getPageInfo());
      //     }else if(getCookie("toOrderSuccess") == "2"){ //从订单详情进入的下单成功页
      //       var getPageInfo = function (){
      //         var data = {
      //           iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
      //           backNum:3,
      //           closeWebview:0,//默认为0
      //           iconUrl:""
      //         };
      //         return JSON.stringify(data);
      //       };
      //       mobileApp.showLeftBtn(getPageInfo());
      //     }else{   //从确认订单页面进入下单成功页
      //       var getPageInfo = function (){
      //         var data = {
      //           iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
      //           backNum:3,
      //           closeWebview:0,//默认为0
      //           iconUrl:""
      //         };
      //         return JSON.stringify(data);
      //       };
      //       mobileApp.showLeftBtn(getPageInfo());
      //     }
      // }else{
            var getPageInfo = function (){
              var data = {
                /*iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
                backNum:1,
                closeWebview:0,//默认为0
                iconUrl:""*/
				  iconType:0,
				  iconColor:"",
				  backNum:1,
				  closeWebview:0,
				  hidden:false,
				  isHandle:false,
				  functionName:""
				  //isRefreshPage:true
              };
              return JSON.stringify(data);
            };
			  if(getParamByUrl("os")=="android"){
				  mobileApp.controlLeft(getPageInfo());
			  }
			  else{
				  mobileApp.controlLeft.postMessage(getPageInfo());
			  }
            //mobileApp.showLeftBtn(getPageInfo());
      // }

      //   var rightdata={
      //     rightImg: "",//右上角图片
      //     function:""//右上角点击后需要调的h5的方法名
      //   };
      // mobileApp.showRightBtn("");

  }
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
  	//运动频率 sport
  	$("#sport .radio").unbind("click").click(function(){
  		$("#sport .radio").css("background-color","#fff");
  		$("#sport .radio").css("color","#696969");
  		$("#sport .radio").removeClass("active");
  		$("#sport .radio2").removeClass("active");
  		$("#sport .radio img").attr("src","image/withoutCamp/nocheck.png");
  		$("#sport .radio3 img").attr("src","image/withoutCamp/nocheck.png");
  		$(this).addClass("active");
  		$(this).css("background-color","#7fa9ff");
  		$(this).css("color","#fff");
    	$(this).children("img").attr("src","image/withoutCamp/check.png");
    	sport = $(this).children("span").html();
    	// alert(sport);
  	});
  	$("#sport .radio2").unbind("click").click(function(){
  		$("#sport .radio").css("background-color","#fff");
  		$("#sport .radio").css("color","#696969");
  		$("#sport .radio").removeClass("active");
  		$("#sport .radio img").attr("src","image/withoutCamp/nocheck.png");
  		$(this).addClass("active");
    	$("#sport .radio3 img").attr("src","image/withoutCamp/check2.png");
    	$("#sport textarea").focus();
    	sport = "other";
  	});
  	//sportAddress 运动地址
  	$("#sportAddress .radio").unbind("click").click(function(){
  		$("#sportAddress .radio").css("background-color","#fff");
  		$("#sportAddress .radio").css("color","#696969");
  		$("#sportAddress .radio").removeClass("active");
  		$("#sportAddress .radio2").removeClass("active");
  		$("#sportAddress .radio img").attr("src","image/withoutCamp/nocheck.png");
  		$("#sportAddress .radio3 img").attr("src","image/withoutCamp/nocheck.png");
  		$(this).addClass("active");
  		$(this).css("background-color","#7fa9ff");
  		$(this).css("color","#fff");
    	$(this).children("img").attr("src","image/withoutCamp/check.png");
    	sportAddress = $(this).children("span").html();
    	// alert(sportAddress);
  	});
  	$("#sportAddress .radio2").unbind("click").click(function(){
  		$("#sportAddress .radio").css("background-color","#fff");
  		$("#sportAddress .radio").css("color","#696969");
  		$("#sportAddress .radio").removeClass("active");
  		$("#sportAddress .radio img").attr("src","image/withoutCamp/nocheck.png");
  		$(this).addClass("active");
    	$("#sportAddress .radio3 img").attr("src","image/withoutCamp/check2.png");
    	$("#sportAddress textarea").focus();
    	sportAddress = "other";
  	});
  	//sportTime 运动时间
  	$("#sportTime .radio").unbind("click").click(function(){
  		$("#sportTime .radio").css("background-color","#fff");
  		$("#sportTime .radio").css("color","#696969");
  		$("#sportTime .radio").removeClass("active");
  		$("#sportTime .radio img").attr("src","image/withoutCamp/nocheck.png");
  		$(this).addClass("active");
  		$(this).css("background-color","#7fa9ff");
  		$(this).css("color","#fff");
    	$(this).children("img").attr("src","image/withoutCamp/check.png");
    	sportTime = $(this).children("span").html();
    	// alert(sportTime);
  	});
  	//sportMerchine 运动装备
  	$("#sportMerchine .radio").unbind("click").click(function(){
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
  	$("#sportMerchine .radio2").unbind("click").click(function(){
  		if($(this).hasClass("active")){
	  		$(this).removeClass("active");
	    	$("#sportMerchine .radio3 img").attr("src","image/withoutCamp/checkboxNo.png");
	    	sportMerchine="";	
  		}else{
	  		$(this).addClass("active");
	    	$("#sportMerchine .radio3 img").attr("src","image/withoutCamp/checkboxYes3.png");
	    	$("#sportMerchine textarea").focus();
	    	sportMerchine="other";
  		}
  		$("#sportMerchine .radio2 textarea").unbind("click").click(function(event){
  			event.stopPropagation();
  		});
  	});
  	//sportHurt 运动损伤
  	$("#sportHurt .radio").unbind("click").click(function(){
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
  	//sickness 疾病
  	$("#sickness .radio").unbind("click").click(function(){
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
  	$("#sickness .radio2").unbind("click").click(function(){
  		if($(this).hasClass("active")){
	  		$(this).removeClass("active");
	    	$("#sickness .radio3 img").attr("src","image/withoutCamp/checkboxNo.png");
	    	sickness="";	
  		}else{
	  		$(this).addClass("active");
	    	$("#sickness .radio3 img").attr("src","image/withoutCamp/checkboxYes3.png");
	    	$("#sickness textarea").focus();
	    	sickness="other";
  		}
  		$("#sickness .radio2 textarea").unbind("click").click(function(event){
  			event.stopPropagation();
  		});
  	});
  	

  	//提交
  	$(".submit").unbind("click").click(function(){
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
  		var physicalPeriod = $.trim($("#physicalPeriod").val()); //上次生理期
      if(physicalPeriod!=""){
        physicalPeriod=(new Date().getYear()+1900)+"-"+physicalPeriod.substring(0,2)+"-"+physicalPeriod.substring(3,5);
      }
  		console.log(physicalPeriod);
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

		// if(diet=="other"){
  //     isDiet = true;
		// 	diet = $.trim($("#diet textarea").val());
		// }
		if($("#sport .radio2.active").length>0){
      isSport = true;
			sport = $.trim($("#sport textarea").val());
		}
		if($("#sportAddress .radio2.active").length>0){
      isSportAddress = true;
			sportAddress = $.trim($("#sportAddress textarea").val());
		}
		// if(sportTime=="other"){
  //     isSportTime == true;
		// 	sportTime = $.trim($("#sportTime textarea").val());
		// }

		if($("#sportMerchine .radio2.active").length>0){
      isSportMerchine = true;
			sportMerchine = $.trim($("#sportMerchine textarea").val());
	  		var len2 =  $("#sportMerchine .radio.active").length;
	  		if(len2>0){
	  			for(i=0;i<len2;i++){
	  				sportMerchine += "|"+$.trim($("#sportMerchine .radio.active").eq(i).children("span").html());
	  			}
	  		}
	  		console.log(sportMerchine);
		}else{
			sportMerchine = "";
	  		var len2 =  $("#sportMerchine .radio.active").length;
	  		if(len2>0){
		  		for(i=0;i<len2;i++){
		  			if(i==len2-1){
		  				sportMerchine += $.trim($("#sportMerchine .radio.active").eq(i).children("span").html());
		  			}else{
		  				sportMerchine += $.trim($("#sportMerchine .radio.active").eq(i).children("span").html())+"|";
		  			}
		  		}
	  		}
	  		console.log(sportMerchine);
		}

		if(sportHurt != "other"){
			sportHurt = "";
	  		var len2 =  $("#sportHurt .radio.active").length;
	  		if(len2>0){
		  		for(i=0;i<len2;i++){
		  			if(i==len2-1){
		  				sportHurt += $.trim($("#sportHurt .radio.active").eq(i).children("span").html());
		  			}else{
		  				sportHurt += $.trim($("#sportHurt .radio.active").eq(i).children("span").html())+"|";
		  			}
		  		}
	  		}
	  		console.log(sportHurt);
		}

		if($("#sickness .radio2.active").length>0){
			isSickness = true;
			sickness = $.trim($("#sickness textarea").val());
	  		var len2 =  $("#sickness .radio.active").length;
	  		if(len2>0){
	  			for(i=0;i<len2;i++){
	  				sickness += "|"+$.trim($("#sickness .radio.active").eq(i).children("span").html());
	  			}
	  		}
	  		console.log(sickness);
		}else{
        sickness = "";
        var len2 =  $("#sickness .radio.active").length;
        if(len2>0){
          for(i=0;i<len2;i++){
            if(i==len2-1){
              sickness += $.trim($("#sickness .radio.active").eq(i).children("span").html());
            }else{
              sickness += $.trim($("#sickness .radio.active").eq(i).children("span").html())+"|";
            }
          }
        }
	  		console.log(sickness);
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
		if(gaugeTime===""){
			str+=" 4";
		}

		if(!isGoal && goal==""){
			str+=" 6";
		}
		if(!isConcern && concern==""){
			str+=" 7";
		}
		if(!isPosition && position==""){
			str+=" 8";
		}
		if(!isHabit && habit==""){
			str+=" 9";
		}
		if(diet==""){
			str+=" 10";
		}
		if(!isSport && sport==""){
			str+=" 11";
		}
		if(!isSportAddress && sportAddress==""){
			str+=" 12";
		}
		if(sportTime==""){
			str+=" 13";
		}
		if(!isSportMerchine && sportMerchine==""){
			str+=" 14";
		}
		if(sportHurt==""){
			str+=" 15";
		}
		if(!isSickness && sickness==""){
			str+=" 16";
		}

		var userId = getParamByUrl("userId");
    var orderId = getParamByUrl("orderId");
		var sportHurtContent = $.trim($("#sportHurtContent").val()); //损伤程度和时间
    var questionData="{"+'"wechatName":'+'"'+wechatName+'"'+',"orderId":'+'"'+orderId+'"'+',"userId":'+'"'+userId+'"'+',"career":'+'"'+occupation+'"'+',"area":'+'"'+area+'"'+',"weightPeriod":'+'"'+gaugeTime+'"'+',"physicalPeriod":'+'"'+physicalPeriod+'"'+',"mostTargt":'+'"'+goal+'"'+',"careContent":'+'"'+concern+'"'+',"bodyParts":'+'"'+position+'"'+',"badEat":'+'"'+habit+'"'+',"eatType":'+'"'+diet+'"'+',"sportTimes":'+'"'+sport+'"'+',"sportVenues":'+'"'+sportAddress+'"'+',"sportlong":'+'"'+sportTime+'"'+',"sportEquip":'+'"'+sportMerchine+'"'+',"sportInjury":'+'"'+sportHurt+'"'+',"injuryDesc":'+'"'+sportHurtContent+'"'+',"sick":'+'"'+sickness+'"'+"}";
    console.info(questionData);
		if(str==""){
			  var questionData="{"+'"wechatName":'+'"'+wechatName+'"'+',"orderId":'+'"'+orderId+'"'+',"userId":'+'"'+userId+'"'+',"career":'+'"'+occupation+'"'+',"area":'+'"'+area+'"'+',"weightPeriod":'+'"'+gaugeTime+'"'+',"physicalPeriod":'+'"'+physicalPeriod+'"'+',"mostTargt":'+'"'+goal+'"'+',"careContent":'+'"'+concern+'"'+',"bodyParts":'+'"'+position+'"'+',"badEat":'+'"'+habit+'"'+',"eatType":'+'"'+diet+'"'+',"sportTimes":'+'"'+sport+'"'+',"sportVenues":'+'"'+sportAddress+'"'+',"sportlong":'+'"'+sportTime+'"'+',"sportEquip":'+'"'+sportMerchine+'"'+',"sportInjury":'+'"'+sportHurt+'"'+',"injuryDesc":'+'"'+sportHurtContent+'"'+',"sick":'+'"'+sickness+'"'+"}";
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

function appNoShare(){
  var getPageInfo3 = function (){
    var data = {
      title:"入营信息调查表",
      /*isShare:false,
      backgroundColor:'#2c2f31'*/
		color:"",
		opacity:"",
		backgroundColor:"",
		backgroundOpacity:""
    };
    return JSON.stringify(data);
  };
  var deviceType=isMobile();
  if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
	  if(getParamByUrl("os")=="android"){
		  mobileApp.controlTitle(getPageInfo3());
	  }
	  else{
		  mobileApp.controlTitle.postMessage(getPageInfo3());
	  }
    //mobileApp.getShareInfo(getPageInfo3());
  }
  document.documentElement.style.webkitTouchCallout='none';
}

function showTime(){

    var physicalPeriodTime=new Date();
    console.info(physicalPeriodTime);
    $('#physicalPeriod').mobiscroll().date({
        theme: 'android-holo-light',
        lang: 'zh',
        display: 'bottom',
       /* closeOnOverlayTap:false,  //true的时候点击遮罩消失控件*/
        cancelText:"",
        setText:"",
        headerText:'上次生理期',
        dateWheels: 'mm  dd',
        dateFormat: 'mm月dd日', //面板中日期排列格式
        defaultValue: physicalPeriodTime,
        monthText: '月',
        dayText: '日',
        onBeforeShow: function (event, inst) {
            leftControl(true);
        },
        onClose: function (event, inst) {
            leftControl(false);
        }
        /*max: new Date()*/
        /*min: new Date(new Date().setFullYear(currYear - 80)),*/
    });
}

//左上角刷新返回功能
function leftControl(isHidden){
    /*alert("leftControl++");*/
    var getPageInfo = function (){
        var data = {
            /*iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
            backNum:1,//1为正常后退，
            closeWebview:0,//默认为0
            hidden:isHidden,
            iconUrl:""*/
			iconType:0,
			iconColor:"",
			backNum:1,
			closeWebview:0,
			hidden:isHidden,
			isHandle:false,
			functionName:""
			//isRefreshPage:true
        };
        return JSON.stringify(data);
    }
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		if(getParamByUrl("os")=="android"){
			mobileApp.controlLeft(getPageInfo());
		}
		else{
			mobileApp.controlLeft.postMessage(getPageInfo());
		}
        //mobileApp.showLeftBtn(getPageInfo());
    }
    document.documentElement.style.webkitTouchCallout='none';
}