
$(function(){
	/*页面显示tag--开始*/
	$(".info-tag .info-tag-item").each(function(index){
		$(this).unbind("click").click(function(){
			var currentIndex=0;
			var nextIndex=index;
			var slideWidth=(parseInt(nextIndex-currentIndex)*0.33+0.05)*$(window).width();
			var nextColor="";
			if(nextIndex == 0){
				nextColor="#7cce1c";
			}else if(nextIndex == 1){
				nextColor="#ffa700";
			}else{
				nextColor="#ff6162";
			}
			$(".navBar").animate({left:slideWidth,borderBottomColor:nextColor});
			console.info(currentIndex+"||"+nextIndex+"||"+slideWidth);
			$(".page"+(parseInt(nextIndex)+1)).css("display","block").siblings().css("display","none");
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
	
	

	/*画图区域--开始*/
	$(".line").css("height",$(window).width()/750*120);
	$(".lineNum").css("height",$(window).width()/750*158);
	$("#fat").css("width",$(".chartBottom").width()*0.8);
	//体重折线图
	/*var weightArr=[51,50.8,52,50.6,53.2,51.3,52.6];*/
	/*var weightArr=[51,50.8,52,50.6,53.2,51.3,52.6,51.7];*/
	/*var weightArr=[51,51,51,51,51,51,51,51,51];*/
	/*var weightArr=[51,50.8,52,50.6];*/
	var weightArr=[51,51];
	/*var weightArr1=[];*/

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
	var fatArr=[51,51,51,51,51,51,51,51,51];
	/*var weightArr1=[];*/

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
	$(".measure-time").css("top",($(".bodyChange-bottom").height()-$(".measure-time").height())/2);
	/*身体变化区域--完*/
})

function getLineChart(chartEntity){
	console.info(chartEntity);
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

	var minHeight=2*parseFloat($("html").css("font-size"));


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
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hPercentArr[i]/canScale-15)+"px;left:"+(wPercentArr[i]/canScale-16)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}else{
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hPercentArr[i]/canScale-25)+"px;left:"+(wPercentArr[i]/canScale-16)+"px;'>"+chartEntity.originArr[i]+"</div>");
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
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hPercentArr[i]/canScale-15)+"px;left:"+(wPercentArr[i]/canScale-5)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}
			}else{
			//用户数据变化
				hNumPosition=hPercentArr[i]/canScale;
				if(i == maxWeightIndex){
				//最高点
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition-25)+"px;left:"+(wPercentArr[i]/canScale-16)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}else if(i == minWeightIndex){
					//最低点
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition+8)+"px;left:"+(wPercentArr[i]/canScale-16)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}
				//最后一点
				if(i == chartEntity.originArr.length-1 && minWeight != chartEntity.originArr[chartEntity.originArr.length-1] && maxWeight != chartEntity.originArr[chartEntity.originArr.length-1]){
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition-25)+"px;left:"+(wPercentArr[i]/canScale-16)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}
			}
			
			
			
		}
		console.info(chartEntity.lineStrokeColor);
		context.strokeStyle = chartEntity.lineStrokeColor;
		context.lineWidth = 1*canScale;
		context.stroke();
	}






}
/*function getLineChart(testArr1,dateArr,chartID,chartNumID,lineFillColor,lineStrokeColor,dotFillColor1,dotFillColor2){
	var hPercentArr=[];
	var wPercentArr=[];
	var testArr2=testArr1.slice();
	testArr2.sort(function(a,b){return a>b?1:-1});
	var canScale=window.devicePixelRatio;
	var maxWeight=testArr2[testArr2.length-1];
	var minWeight=testArr2[0];
	var weightDef=maxWeight-minWeight;
	var waveHeight=2*parseFloat($("html").css("font-size"));
	var minHeight=2*parseFloat($("html").css("font-size"));
	console.info(waveHeight);
	for(var i=0;i<testArr1.length;i++){
		hPercentArr[i] = (maxWeight-testArr1[i])/weightDef*waveHeight*canScale+minHeight;
		wPercentArr[i] = (1-(dateArr[dateArr.length-1]-dateArr[i]+1)/dateArr[dateArr.length-1])*($("#"+chartID).width()-5)*canScale+15;
		console.info(hPercentArr[i]+"||"+wPercentArr[i]);
	}

	var canvas=document.getElementById(chartID);
	var context=canvas.getContext("2d");

	canvas.width=$("#"+chartID).width()*canScale;
	canvas.height=$("#"+chartID).height()*canScale;

	for(var i=0;i<testArr1.length;i++){
		context.lineTo(wPercentArr[i],hPercentArr[i]);
		if(hPercentArr[i] > hPercentArr[i-1] && i > 0){
			$("#"+chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hPercentArr[i]/canScale+8)+"px;left:"+(wPercentArr[i]/canScale-16)+"px;'>"+testArr1[i]+"</div>");
		}else{
			$("#"+chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hPercentArr[i]/canScale-20)+"px;left:"+(wPercentArr[i]/canScale-16)+"px;'>"+testArr1[i]+"</div>");
		}
		
	}
	context.strokeStyle = lineStrokeColor;
	context.lineWidth = 1*canScale;
	context.stroke();
}*/

