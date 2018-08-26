
$(function(){
	
	/*页面显示tag--开始*/
	$(".info-tag .info-tag-item").each(function(index){
		$(this).unbind("click").click(function(){
			var currentIndex=0;
			var nextIndex=index;
			var slideWidth=(parseInt(nextIndex-currentIndex)*0.33+0.05)*$(window).width();
			var nextColor="";
			$(".page"+(parseInt(nextIndex)+1)).css("display","block").siblings().css("display","none");
			
			/*if(nextIndex == 0){
				nextColor="#7cce1c";
			}else if(nextIndex == 1){
				nextColor="#ffa700";
				if($(".partLeft-p3 span").width()>$(".partLeft-p1 span").width()){
					$(".partLeft-p1").css("padding-left",($(".partLeft-p3 span").width()-$(".partLeft-p1 span").width())/2);
				}
				else{
					$(".partLeft-p3").css("padding-left",($(".partLeft-p1 span").width()-$(".partLeft-p3 span").width())/2);
				}
				for(var i=0;i<$(".partLeft-p1 span").length;i++){
					if($(".partLeft-p1 span").eq(i).width()>$(".partLeft-p2 span").eq(i).width()){
						$(".partLeft-p2").eq(i).css("padding-left",parseInt($(".partLeft-p1").eq(0).css("padding-left"))+($(".partLeft-p1 span").eq(i).width()-$(".partLeft-p2 span").eq(i).width())/2-1);
					}
				}
				$(".partRight-img-li").css("height",$(".partRight-img-li").width());
			}else{
				nextColor="#ff6162";
			}*/
			if(nextIndex == 1){
				if($(".partLeft-p3 span").width()>$(".partLeft-p1 span").width()){
					$(".partLeft-p1").css("padding-left",($(".partLeft-p3 span").width()-$(".partLeft-p1 span").width())/2);
				}
				else{
					$(".partLeft-p3").css("padding-left",($(".partLeft-p1 span").width()-$(".partLeft-p3 span").width())/2);
				}
				for(var i=0;i<$(".partLeft-p1 span").length;i++){
					if($(".partLeft-p1 span").eq(i).width()>$(".partLeft-p2 span").eq(i).width()){
						$(".partLeft-p2").eq(i).css("padding-left",parseInt($(".partLeft-p1").eq(0).css("padding-left"))+($(".partLeft-p1 span").eq(i).width()-$(".partLeft-p2 span").eq(i).width())/2-1);
					}
				}
				$(".partRight-img-li").css("height",$(".partRight-img-li").width());
			}
			$(".navBar").animate({left:slideWidth,borderBottomColor:nextColor});
			/*$(".navBar").animate({left:slideWidth,borderBottomColor:nextColor});*/
			console.info(currentIndex+"||"+nextIndex+"||"+slideWidth);
			
			//page2初始化开始
			var fontHeight=parseInt($("html").css("font-size"));
			if($(".partLeft-p3 span").width()>$(".partLeft-p1 span").width()){
				$(".partLeft-p1").css("padding-left",($(".partLeft-p3 span").width()-$(".partLeft-p1 span").width())/2);
			}
			if($(".partLeft-p1 span").width()>$(".partLeft-p2 span").width()){
				$(".partLeft-p2").css("padding-left",parseInt($(".partLeft-p1").eq(0).css("padding-left"))+($(".partLeft-p1 span").width()-$(".partLeft-p2 span").width())/2);
			}
			//page2初始化结束
		});
	});
	/*页面显示tag--完*/

	/*体脂体重tag切换--开始*/
	$(".chartTag").children("span").each(function(){
		$(this).unbind("click").click(function(){
			/*$(this).css({"backgroundColor":"#1daffa","color":"#fff"}).siblings().css({"color":"#1daffa","backgroundColor":"#fff"});*/
			$(this).addClass("active").siblings().removeClass("active");
			if($(this).hasClass("tag-weight")){
				$(".weightContent").css("display","block");
				$(".fatContent").css("display","none");
			}else{
				$(".weightContent").css("display","none");
				$(".fatContent").css("display","block");
			}
		});
	});
	/*体脂体重tag切换--完*/

	/*身体变化区域--开始*/
	$(".bodyChange-title").css("height",$(window).width()/750*80);
	$(".bodyChange-title").css("lineHeight",$(window).width()/750*80+"px");
	$(".bodyChange-container").css("height",$(window).width()/750*90);
	$(".bodyChange-container").css("lineHeight",$(window).width()/750*90+"px");
	$(".bodyChange-tagName").css("lineHeight",$(window).width()/750*90+"px");
	$(".bodyChange-lowNum").css("lineHeight",$(window).width()/750*90+"px");
	$(".bodyChange-highNum").css("lineHeight",$(window).width()/750*90+"px");
	$(".bodyChange-lastImg").css("top",($(window).width()/750*90-0.4375*parseInt($("html").css("font-size"))*15/12)/2);
	/*$(".bodyChange-lastImg-type1").css("top",($(window).width()/750*90-0.4375*parseInt($("html").css("font-size"))*6/10)/2);*/
	$(".bodyChange-icon").css("top",($(window).width()/750*90-1.25*parseInt($("html").css("font-size")))/2);
	
	/*身体变化区域--完*/

	/*数据交互--开始*/
	var targetRoleId=getParamByUrl("targetRoleId");
	getBodyChange(targetRoleId);
	getBaseInfo(targetRoleId);
	/*数据交互--结束*/
	appNoShare();
})
function appNoShare(){
	var getPageInfo = function (){
		var data = {
			title:'xx的个人主页',
			isShare:false,
			backgroundColor:'#2c2f31'
		};
		return JSON.stringify(data);
	};
	var deviceType=isMobile();
		if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		mobileApp.getShareInfo(getPageInfo());
	}
	document.documentElement.style.webkitTouchCallout='none';
}
function getBaseInfo(targetRoleId){
	var host=window.location.protocol+"//"+window.location.host;
	var finalUrl=host+"/v1/api/camp/getBasicInfo"+window.location.search+"&targetRoleId="+targetRoleId;
	/*var finalUrl=host+"/v1/api/camp/getBasicInfo?roleId="+roleId;*/
	console.info(finalUrl);
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				/*头部基本信息数据交互--开始*/
				$("#first-weight").text(data.resp.title.firstWeight);
				$("#first-fat").text(data.resp.title.firstFat);
				$("#first-in-fat").text(data.resp.title.firstInfat);
				var headerImg="";
				if(data.resp.title.sex == 0){
					$(".sex").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/girl.png");
					headerImg="'http://cdn2.picooc.com/web/res/sex0.png'";
				}else{
					$(".sex").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/boy.png");
					headerImg="'http://cdn2.picooc.com/web/res/sex1.png'";
				}
				$(".head").attr("src",data.resp.title.head);
				$(".head").attr("onerror","this.src="+headerImg);
				/*头部基本信息数据交互--结束*/
				/*学员基本信息数据交互--开始*/
				if(data.resp.height != "" && data.resp.height != null){
					$(".height").find("span:eq(1)").text(data.resp.height);
				}else{
					$(".height").css("display","none");
				}
				if(data.resp.age != "" && data.resp.age != null){
					$(".age").find("span:eq(1)").text(data.resp.age);
				}else{
					$(".age").css("display","none");
				}
				if(data.resp.goalFat != "" && data.resp.goalFat != null){
					$(".goalFat").find("span:eq(1)").text(data.resp.goalFat);
				}else{
					$(".goalFat").css("display","none");
				}
				if(data.resp.goalWeight != "" && data.resp.goalWeight != null){
					$(".goalWeight").find("span:eq(1)").text(data.resp.goalWeight);
				}else{
					$(".goalWeight").css("display","none");
				}
				if(data.resp.career != "" && data.resp.career != null){
					$(".career").find("span:eq(1)").text(data.resp.career);
				}else{
					$(".career").css("display","none");
				}
				if(data.resp.physicalPeriod  != "" && data.resp.physicalPeriod  != null){
					$(".physicalPeriod ").find("span:eq(1)").text(data.resp.physicalPeriod );
				}else{
					$(".physicalPeriod ").css("display","none");
				}
				if(data.resp.area != "" && data.resp.area != null){
					$(".area").find("span:eq(1)").text(data.resp.area);
				}else{
					$(".area").css("display","none");
				}
				if(data.resp.periodDesc != "" && data.resp.periodDesc != null){
					$(".periodDesc").find("span:eq(1)").text(data.resp.periodDesc);
				}else{
					$(".periodDesc").css("display","none");
				}
				if(data.resp.wechat != "" && data.resp.wechat != null){
					$(".wechat").find("span:eq(1)").text(data.resp.wechat);
				}else{
					$(".wechat").css("display","none");
				}
				if(data.resp.phoneNo != "" && data.resp.phoneNo != null){
					$(".phoneNo").find("span:eq(1)").text(data.resp.phoneNo);
				}else{
					$(".phoneNo").css("display","none");
				}
				/*学员基本信息数据交互--结束*/
			}else{
				// alert("服务器开小差了~");
	                $(".error-main-t").html("服务器开小差了～");
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
			}
		}
	});
}

function getBodyChange(targetRoleId){
	var host=window.location.protocol+"//"+window.location.host;
	var finalUrl=host+"/v1/api/camp/getBodyChange"+window.location.search+"&targetRoleId="+targetRoleId;
	/*var finalUrl=host+"/v1/api/camp/getBodyChange?roleId="+roleId;*/
	console.info(finalUrl);
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				/*身体数据变化数据交互--开始*/
				if(data.resp.flag == 1){
					$(".bodyChange").css("display","block");
					/*对比周期数据交互--开始*/
					$(".start-time").text(data.resp.start);
					$(".end-time").text(data.resp.end);
					/*对比周期数据交互--结束*/
					/*指标对比数据交互--开始*/
					var bodyData=data.resp.data;
					$(".bodyChange-content .bodyChange-container").each(function(index){
						$(this).children(".bodyChange-lowNum").text(bodyData[index][0]);
						$(this).children(".bodyChange-highNum").text(bodyData[index][1]);
						if(bodyData[index][2] == "0"){
							$(this).children(".bodyChange-lastImg").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/4-10.png");
						}else if(bodyData[index][2] == "1"){
							$(this).children(".bodyChange-lastImg").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/4-12.png");
						}else if(bodyData[index][2] == "2"){
							$(this).children(".bodyChange-lastImg").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/4-11.png");
						}else if(bodyData[index][2] == "3"){
							$(this).children(".bodyChange-lastImg").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/4-13.png");
						}else{
							$(this).children(".bodyChange-lastImg").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/4-14.png");
						}
					});
					/*指标对比数据交互--结束*/
					/*测量时段数据交互--开始*/
					$(".measure-time").find("span").text(data.resp.period);
					$(".measure-time").find("img").attr("src",data.resp.url);
					$(".measure-time").css("top",($(".bodyChange-bottom").height()-$(".measure-time").height())/2);
					/*测量时段数据交互--结束*/
				}else{
					$(".bodyChange").css("display","none");
				}
				/*身体数据变化数据交互--结束*/

				/*体重变化--开始*/
				/*$(".wChange").text(data.resp.wChange);
				$(".fChange").text(data.resp.fChange);*/
				if(data.resp.wChange == "--"){
					$(".wFlag").css("display","none");
					$(".wChange").text(data.resp.wChange);
				}else{
					if(data.resp.wChange == "1"){
						$(".wFlag").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/rise.png");
					}else if(data.resp.wChange == "2" || data.resp.wFlag == 0){
						$(".wFlag").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/down.png");
					}
					$(".wChange").text(data.resp.wChange+"KG");
				}

				if(data.resp.fFlag == "--"){
					$(".fFlag").css("display","none");
					$(".fChange").text(data.resp.fChange);
				}else{
					if(data.resp.fFlag == "1"){
						$(".fFlag").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/rise.png");
					}else if(data.resp.fFlag == "2" || data.resp.fFlag == 0){
						$(".fFlag").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/down.png");
					}
					$(".fChange").text(data.resp.fChange+"%");
				}

				/*体重变化--结束*/

				/*画图区域--开始*/
				$(".line").css("height",$(window).width()/750*120);
				$(".lineNum").css("height",$(window).width()/750*158);
				$("#fat").css("width",$(".chartBottom").width()*0.8);
				//体重折线图
				/*var weightArr=[51,50.8,52,50.6,53.2,51.3,52.6,51.7];*/
				/*var weightArr=[51,50.8,52,50.6,53.2,51.3,52.6,51.7,53.2,51.3,52.6,51.7,53.2,51.3,55.6,54.7,51,50.8,52,50.6,53.2,51.3,52.6,51.7,53.2,51.3,52.6,51.7,55.7,51.3];*/
				/*var weightArr=[51,51,51,51,51,51,51,51,51];*/
				/*var weightArr=[51,50.8,52,50.6];*/
				/*var weightArr=[51,51];*/
				/*var weightArr1=[];*/
				var weightArr=data.resp.weight;
				var weightEntity={
					"originArr":weightArr,             //初始数组		
					/*"dateArr":dateArr1,					//称量时间*/
					"chartID":"weight",					//折线canvas的id名称
					"chartNumID":"weightNum",			//折线点的区域的名称
					"lineFillColor":"#c1e9fb",			//折线填充颜色
					"lineStrokeColor":"#1daffa",		//折线颜色
					"lineStrokeColor2":"#d2effe",		//折线颜色(数据时不满足7个时)
					"dotFillColor1":"#d2effe",			//折线点的外圈颜色
					"dotFillColor2":"#1daffa",			//折线点的内圈颜色
					"dotFillColor3":"#fff",				//折线点的内圈颜色(没有数据时)
					"waveHeight":(2*parseFloat($("html").css("font-size")))
				};
				getLineChart(weightEntity);

				//体脂折线图
				/*var fatArr=[];*/
				/*var fatArr=[51,51,51,51,51,51,51,51,51];*/
				/*var weightArr1=[];*/
				var fatArr=data.resp.fat;
				var fatEntity={
					"originArr":fatArr,            		//初始数组		
					/*"dateArr":dateArr1,				//称量时间*/
					"chartID":"fat",					//折线canvas的id名称
					"chartNumID":"fatNum",			//折线点的区域的名称
					"lineFillColor":"#c1e9fb",			//折线填充颜色
					"lineStrokeColor":"#1daffa",		//折线颜色
					"lineStrokeColor2":"#d2effe",		//折线颜色(数据时不满足7个时)
					"dotFillColor1":"#d2effe",			//折线点的外圈颜色
					"dotFillColor2":"#1daffa",			//折线点的内圈颜色
					"dotFillColor3":"#fff",				//折线点的内圈颜色(没有数据时)
					"waveHeight":(2*parseFloat($("html").css("font-size")))
				};
				getLineChart(fatEntity);
				/*画图区域--完*/
			}else{
				// alert("服务器开小差了~");
	                $(".error-main-t").html("服务器开小差了～");
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
				$(".bodyChange").css("display","none");
			}
		}
	});
}

function getLineChart(chartEntity){
	console.info(chartEntity);
	var fontSize=parseFloat($("html").css("font-size"));
	console.info(fontSize);
	var dateIsSame=false;
	var noData= chartEntity.originArr.length==0?true:false;
	var hPercentArr=[];
	var wPercentArr=[];
	//小于7的时候是7天数据，补全后面数据
	var originArr2=[];
	if(noData){
		originArr2=[50,50,50,50,50,50,50];
	}else{
		originArr2=chartEntity.originArr.concat();
	}

	//补充数据
	while(originArr2.length < 7){
		originArr2.push(chartEntity.originArr[chartEntity.originArr.length-1]);
	}
	console.info(originArr2);
	var canScale=window.devicePixelRatio;
	//获得数组最大值
	var maxWeight= chartEntity.originArr.length == 0 ? originArr2[0]:Math.max.apply(null, chartEntity.originArr);
	//获得数组最大值的下标
	var maxWeightIndex=chartEntity.originArr.indexOf(maxWeight);
	//获得数组最小值
	var minWeight= chartEntity.originArr.length == 0 ? originArr2[0]:Math.min.apply(null, chartEntity.originArr);
	//获得数组最小值的下标
	var minWeightIndex=chartEntity.originArr.indexOf(minWeight);
	//获得最大值最小值差值
	var weightDef= maxWeight-minWeight;
	console.info(maxWeight+"||"+minWeight);

	var minHeight=2*fontSize;


	//获取每天间隔
	var dateArr=[];
	var date=0;
	var dateLength=0;
	if(chartEntity.originArr.length > 7){
		dateLength=chartEntity.originArr.length;
	}else{
		dateLength=7;
	}
	for(var i=0;i<dateLength;i++){
		if(i == 0){
			dateArr.push(0);
		}else{
			date+=1/(dateLength-1);
			dateArr.push(date);
		}
		
	}
	console.info(dateArr);
	console.info(chartEntity.waveHeight);

	//最大值最小值一样
	if(weightDef == 0){
		weightDef = 1;
		dateIsSame=true;
	}

	console.info("--------"+$("#"+chartEntity.chartID).width());

	//初始坐标数据处理
	for(var i=0;i<originArr2.length;i++){
		hPercentArr[i] = (maxWeight-originArr2[i])/weightDef*chartEntity.waveHeight*canScale+minHeight;
		wPercentArr[i] = dateArr[i]*($("#"+chartEntity.chartID).width()-15)*canScale+15;
		console.info(hPercentArr[i]+"||"+wPercentArr[i]);
	}
	var diffWidth=(wPercentArr[1]-wPercentArr[0])/canScale;


	//画布初始化
	var canvas=document.getElementById(chartEntity.chartID);
	var context=canvas.getContext("2d");
	canvas.width=$("#"+chartEntity.chartID).width()*canScale;
	canvas.height=$("#"+chartEntity.chartID).height()*canScale;

	//小于7个点
	if(chartEntity.originArr.length <= 7){
		console.info("originArr2.length"+originArr2.length);
		//画线
		for(var i=0;i<originArr2.length;i++){
			if(dateIsSame){
				$("#"+chartEntity.chartID).css("marginTop","1.75rem");
			}
			context.lineTo(wPercentArr[i],hPercentArr[i]);
			if(i < chartEntity.originArr.length){
				if(dateIsSame){
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hPercentArr[i]/canScale-fontSize)+"px;left:"+(wPercentArr[i]/canScale-13)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}else{
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hPercentArr[i]/canScale-1.5*fontSize)+"px;left:"+(wPercentArr[i]/canScale-16)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}
			}

		}
		if(chartEntity.originArr.length < 7){
			context.strokeStyle = chartEntity.lineStrokeColor2;
		}else{
			context.strokeStyle = chartEntity.lineStrokeColor;
		}
		context.lineWidth = 1*canScale;
		context.stroke();
		//描点
		for(var i=0;i<originArr2.length;i++){
			context.lineWidth=1*canScale;
			context.beginPath();
			context.arc(wPercentArr[i],hPercentArr[i],4*canScale,0,2*Math.PI);
			context.closePath();
			context.fillStyle= chartEntity.dotFillColor1;
			context.fill();

			context.beginPath();
			context.arc(wPercentArr[i],hPercentArr[i],2*canScale,0,2*Math.PI);
			context.closePath();
			

			if(i < chartEntity.originArr.length){
				context.fillStyle= chartEntity.dotFillColor2;
			}else{
				context.fillStyle= chartEntity.dotFillColor3;
			}
			context.fill();
		}

	}else{
		for(var i=0;i<chartEntity.originArr.length;i++){
			context.lineTo(wPercentArr[i],hPercentArr[i]);
			var hNumPosition=0;
			//用户数据不变
			if(dateIsSame){
				$("#"+chartEntity.chartID).css("marginTop","1.75rem");
				if(i == chartEntity.originArr.length-1){
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hPercentArr[i]/canScale-fontSize)+"px;left:"+(wPercentArr[i]/canScale-10)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}
			}else{
			//用户数据变化
				hNumPosition=hPercentArr[i]/canScale;
				if(i == maxWeightIndex){
				//最高点
					if((chartEntity.originArr.length-1-maxWeightIndex)*diffWidth <= 24){
						$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition-1.5*fontSize)+"px;left:"+(wPercentArr[chartEntity.originArr.length-1]/canScale-10-24)+"px;'>"+chartEntity.originArr[i]+"</div>");
					}else{
						$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition-1.5*fontSize)+"px;left:"+(wPercentArr[i]/canScale-10)+"px;'>"+chartEntity.originArr[i]+"</div>");
					}
				}else if(i == minWeightIndex){
					//最低点
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition+0.5*fontSize)+"px;left:"+(wPercentArr[i]/canScale-16)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}
				//最后一点
				if(i == chartEntity.originArr.length-1 && minWeight != chartEntity.originArr[chartEntity.originArr.length-1] && maxWeight != chartEntity.originArr[chartEntity.originArr.length-1]){
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition-1.5*fontSize)+"px;left:"+(wPercentArr[i]/canScale-10)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}
			}			
		}
		console.info(chartEntity.lineStrokeColor);
		context.strokeStyle = chartEntity.lineStrokeColor;
		context.lineWidth = 1*canScale;
		context.stroke();
	}

}


