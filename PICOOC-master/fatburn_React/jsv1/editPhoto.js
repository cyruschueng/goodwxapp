var uploadtype = ""; 
var isshowbtn1 = 0; //上传按钮颜色判断
var isshowbtn2 = 0;
var dateListLen = 0; //日期列表长度
var weightIndex = 0; //默认选中的体重体脂数据索引
var isWeightDate = 0; //体重脂肪是否有数据
var sex = ""; 
var waistMeasureId=""; //腰围ID
var weight = ""; //被选中的体重数值
var fat = "";	//被选中的脂肪数值
var waistMeasure = "";
var frontPicture="";
var facePicture="";
var campId=getParamByUrl("campId");
var roleId=getParamByUrl("roleId");
// var time =decodeURIComponent(getParamByUrl("time"));
// var frontPicture = getParamByUrl("frontPicture");
// var facePicture = getParamByUrl("facePicture");
var strTime="";
var SBianJiZhaoPian={
    SCategory_SBianJiZhaoPian:5061000,
    SBianJiZhaoPian_XuanZePaiZhaoRiQi:5061001,//选择拍照日期
    SBianJiZhaoPian_ShangChuanZhengMianZhao:5061002,//上传正面照
    SBianJiZhaoPian_ShangChuanCeMianZhao:5061003,//上传侧面照
    SBianJiZhaoPian_ChaKanShangChuanYaoQiu:5061004,//查看拍摄及上传要求
    SBianJiZhaoPian_TianJiaTiZhi:5061005,//添加体脂数据
    SBianJiZhaoPian_TianJiaYaoWei:5061006,//添加腰围数据
    SBianJiZhaoPian_XuanZeTiZhi:5061007,//选择体脂数据
    SBianJiZhaoPian_QuXiaoXuanZeTiZhi:5061008,//取消选择体脂数据
    SBianJiZhaoPian_XuanZeYaoWei:5061009,//选择腰围数据
    SBianJiZhaoPian_QuXiaoXuanZeYaoWei:5061010,//取消选择腰围数据
    SBianJiZhaoPian_ShangChuan:5061011,//点击完成按钮
    SBianJiZhaoPian_ShanChuZhaoPian:5061012,//删除照片
    SBianJiZhaoPian_XianShiYuLanTu:5061013,//显示预览图
    SBianJiZhaoPian_QuXiaoXuanZeShiJian:5061014,//取消选择时间
    SBianJiZhaoPian_XuanZeShiJian:5061015//选择时间
};
$(function(){

	var deviceType=isMobile();
	var getPageInfo = function (){
		var data = {
			/*iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
			backNum:1,
			closeWebview:0,//默认为0
			iconUrl:""*/
			iconType:1,
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
	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		if(getParamByUrl("os")=="android"){
			mobileApp.controlLeft(getPageInfo());
		}
		else{
			mobileApp.controlLeft.postMessage(getPageInfo());
		}
		//mobileApp.showLeftBtn(getPageInfo());
	}

	if(window.innerWidth>365){
		$(".weight-name").css("width","20%");
		$("#weightdata").css("width","76%");
	}else if(window.innerWidth<365 && window.innerWidth>340){
		$(".weight-name").css("width","21%");
		$("#weightdata").css("width","74%");
	}else if(window.innerWidth>=320 && window.innerWidth<340){
		$(".weight-name").css("width","22%");
		$("#weightdata").css("width","73%");
	}

	$(".prompt-back").css("height",$(window).height());
	$(".prompt-main").css("width",$(window).width()-50);
	var fontHeight=parseInt($("html").css("font-size"));
	var paddingTop = 1.4375*fontHeight;
	if(window.innerHeight<440){
		$(".prompt-main").css("padding","1rem 1.5625rem");
		$(".prompt-main .content p").css("margin-bottom","0.5rem");
		paddingTop = 1*fontHeight;
	}

	$(".prompt").unbind("click").click(function(){
			leftBtnHide();
		 	if(getParamByUrl("os")=="android"){
				var getPageInfo = function (){
					var data = {
						controlBtn:true,
						function:"promptAndroid"
					};
					return JSON.stringify(data);
				};
				var deviceType=isMobile();
				if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
					if(getParamByUrl("os")=="android"){
						mobileApp.showBackBtn(getPageInfo());
					}
					else{
						mobileApp.showBackBtn.postMessage(getPageInfo());
					}
					//mobileApp.showBackBtn(getPageInfo());
				}
		 	}
			$(".prompt-back").css("display","block");
			$(".prompt-pic-left").css("height",$(".prompt-pic-left").width()*4/3);
			$(".prompt-pic-right").css("height",$(".prompt-pic-left").width()*4/3);
			$(".prompt-main").css("margin-top",-$(".prompt-main").height()/2-paddingTop);
			setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_ChaKanShangChuanYaoQiu);
	});
	$(".prompt-main").unbind("click").click(function(event){
		event.stopPropagation();
	});
	$(".prompt-main .del").unbind("click").click(function(event){
		event.stopPropagation();
		$(".prompt-back").css("display","none");
		leftBtnShow();
	});
	$(".prompt-back").unbind("click").click(function(event){
		event.stopPropagation();
		$(".prompt-back").css("display","none");
		leftBtnShow();
	});


	$(".fixBg").css("height",$(window).height());
	$(".fixBg-main").css("width",$(window).width()-140);
	$(".fixBg-btn").unbind("click").click(function(){
		$(".fixBg").css("display","none");
	});
	//console.log(weight+":"+fat+":"+waistMeasure+":"+campId+":"+roleId+":"+day+":"+time+":"+frontPicture+":"+facePicture);
  	$(".front").css("height",$(".front").width()*408/306);
  	$(".side").css("height",$(".side").width()*408/306);

  	//通过pictureId获取该条数据
  	getPictureContent();

 //  	if(frontPicture!=""){
	// 	$("#front").removeClass("front-default");
	// 	$("#front").css("background-image",'url('+frontPicture+')');
	// 	$("#front").addClass("getImg-bg");
	// 	$(".delete1").show();
	// 	$(".upload").css("background-color","#7fa9ff");
	// 	isshowbtn1=1;

 //  	}else{}

 //  	if(facePicture!=""){
	// 	$("#side").removeClass("side-default");
	// 	$("#side").css("background-image",'url('+frontPicture+')');
	// 	$(".delete2").show();
	// 	$(".upload").css("background-color","#7fa9ff");
	// 	isshowbtn2=1;
 //  	}else{}
 //  	$("#selectdate").html(time);
 //  	$("#dayc").html(day);

	// if(weight!="" || fat!=""){
	// 	$("#weightdata").append('：'+weight+'KG/'+fat+'%<span class="clear"></span>');
	// 	$(".clear").unbind("click").click(function(event){
	// 		event.stopPropagation();
	// 		$("#weightdata").html("");
	// 		weight="";
	// 		fat="";
	// 		// showtitle();
	// 	});	
	// }
	//删除照片
  	$(".delete1").unbind("click").click(function(event){
  		event.stopPropagation();
  		$("#front").removeClass("getImg-bg");
  		$("#front").css("background-image","url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/front.png)");
  		$("#front").addClass("front-default");
  		$(this).hide();
  		//显示预览图
  		// $("#front").unbind("click");
  		addfrontImg();
  		isshowbtn1=0;
  		if(isshowbtn2==0){
  			$(".upload").css("background-color","#bbbbbb");
  		}
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_ShanChuZhaoPian);
	});

  	$(".delete2").unbind("click").click(function(event){
  		event.stopPropagation();
  		$("#side").removeClass("getImg-bg");
  		$("#side").css("background-image","url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/side.png)");
  		$("#side").addClass("side-default");
  		$(this).hide();
  		addsideImg();
  		isshowbtn2=0;
  		if(isshowbtn1==0){
  			$(".upload").css("background-color","#bbbbbb");
  		}
  		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_ShanChuZhaoPian);
	});


	// uploadLink();
	//appNoShare();
  	addfrontImg();
  	addsideImg();
  	//获取日期列表
	getDateList();



	$("#selectdate").unbind("click").click(function(){
		showDate();
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_XuanZePaiZhaoRiQi);
	});
	$("#selectday").unbind("click").click(function(){
		showDate();
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_XuanZePaiZhaoRiQi);
	});
	$("#selectweight").unbind("click").click(function(){
		//如果没有体重脂肪数据
		if(isWeightDate==1){
			// $(".fixBg-t").css("display","none");
			// $(".fixBg-p2").css("display","none");
			$(".fixBg-p").css("display","block");
			$(".fixBg-p").html("暂无测量数据哦，赶快去上秤吧~");
			$(".fixBg").css("display","block");
			$(".fixBg-main").css("margin-top",-$(".fixBg-main").height()/2);

			setTimeout(function(){
				$(".fixBg").css("display","none");
				$(".fixBg-p").css("display","none");
			},1000);
		}else{
			getCampBodyIndexData(1);
		}
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_TianJiaTiZhi);
	});

	$("#selectwaist").unbind("click").click(function(){
		getWaistList();
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_TianJiaYaoWei);
	});
	//编辑照片
	$(".upload").unbind("click").click(function(event){
		console.log(isshowbtn1+"|"+isshowbtn2);
		event.stopPropagation();
		if(isshowbtn1==0){
			frontPicture="";
		}else{}
		if(isshowbtn2==0){
			facePicture="";
		} else{}
		var day = $("#dayc").html();
		var time = $("#selectdate").html();
		var campPictureId = getParamByUrl("imgId");
		if(isshowbtn1!=0 || isshowbtn2!=0){		
			var dayUrl=ajaxLink+"/v1/api/campStu/updatePicture"+window.location.search+"&id="+campPictureId+"&frontPicture="+frontPicture+"&facePicture="+facePicture+"&weight="+weight+"&fat="+fat+"&waistMeasure="+waistMeasure+"&day="+day+"&time="+time+"&waistMeasureId="+waistMeasureId;
			// alert(dayUrl);
			$.ajax({
				type:"get",
				url:dayUrl,
				dataType:"json",
				success:function(data){
					if(data.code == 200){
						// alert(JSON.stringify(data));
						$(".upload").css("opacity","0.6");
						if(data.resp.waistMeasureId && data.resp.waistMeasureId!=null && data.resp.waistMeasureId!=""){
							if(waistMeasure==""|| waistMeasure==null){
								waistMeasure=0;
							}
							waistMeasureId=data.resp.waistMeasureId;
							var getPageInfo9 = function (){
								var param = {
									roleId:roleId,
									serverId:waistMeasureId,
									girthNum:waistMeasure,
									time:data.resp.operateTrime,
									// isDelete:false,  //删除体围标识，true是，false否
								};
								return JSON.stringify(param);
							};
							var deviceType=isMobile();
							if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
								if(getParamByUrl("os")=="android"){
									mobileApp.changeGirth(getPageInfo9());
								}
								else{
									mobileApp.changeGirth.postMessage(getPageInfo9());
								}
								//mobileApp.changeGirth(getPageInfo9());
							}	
						}else{
							if(waistMeasure==""|| waistMeasure==null){
								waistMeasure=0;
							}
							var getPageInfo9 = function (){
								var param = {
									roleId:roleId,
									serverId:waistMeasureId,
									girthNum:waistMeasure,
									time:data.resp.operateTrime,
									// isDelete:false,  //删除体围标识，true是，false否
								};
								return JSON.stringify(param);
							};
							var deviceType=isMobile();
							if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
								if(getParamByUrl("os")=="android"){
									mobileApp.changeGirth(getPageInfo9());
								}
								else{
									mobileApp.changeGirth.postMessage(getPageInfo9());
								}
								//mobileApp.changeGirth(getPageInfo9());
							}
						}
						var deviceType=isMobile();//判断是不是app的方法
						if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
						 	if(getParamByUrl("os")=="android"){
								var getPageInfo2 = function (){
								var data = {
								controlBtn:false,
								function:""
								};
								return JSON.stringify(data);
								};
								var deviceType=isMobile();
								if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
									if(getParamByUrl("os")=="android"){
										mobileApp.showBackBtn(getPageInfo2());
									}
									else{
										mobileApp.showBackBtn.postMessage(getPageInfo2());
									}
									//mobileApp.showBackBtn(getPageInfo2());
								}
						 	}
							var getPageInfo = function (){
									var data = {
										backNum:1,//默认为1，
										closeWebview:0,//默认为0
									};
								        return JSON.stringify(data);
								};
							if(getParamByUrl("os")=="android"){
								mobileApp.deleteHistory(getPageInfo());
							}
							else{
								mobileApp.deleteHistory.postMessage(getPageInfo());
							}
							//mobileApp.deleteHistory(getPageInfo());
							
						}else{
							if(getParamByUrl("imgId")!="false"){
								var searchLink=removeParamByUrl("imgId");
								window.location.href="photoAlbum.html"+searchLink;
							}
							else{
								window.location.href="photoAlbum.html"+window.location.search;	
							}
						}
						event.stopPropagation();
					}
					else{
						// alert(data.result.message);
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
					}
				}
			})
		}
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_ShangChuan);	
	});
})

function addfrontImg(){
  	$(".front-default").unbind("click").click(function(){
  			uploadtype=0;
  			if(getParamByUrl("testtype")=="tanchao"){
				getImg(["http://cdn2.picooc.com/web/res/event/bottle/image/msg-2.png","http://cdn2.picooc.com/web/res/event/bottle/image/bg1.jpg"]);
			}
			else{
				var t2=setTimeout(function(){
					var deviceType4=isMobile();
					if(deviceType4 == "isApp" && (typeof mobileApp != "undefined")){
						var data={
							maxNum:1, //上传图片的最大个数
							imageType:"bodyImg"
						}
						data=JSON.stringify(data);
						if(getParamByUrl("os")=="android"){
							mobileApp.uploadImg(data);
						}
						else{
							mobileApp.uploadImg.postMessage(data);
						}
						//mobileApp.uploadImg(data);
					}
					clearTimeout(t2);
				},250);
			}

			setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_ShangChuanZhengMianZhao);
	});	
}
function addsideImg(){
  	$(".side-default").unbind("click").click(function(){
  			uploadtype=1;
  			if(getParamByUrl("testtype")=="tanchao"){
				getImg(["http://cdn2.picooc.com/web/res/event/bottle/image/msg-2.png","http://cdn2.picooc.com/web/res/event/bottle/image/bg1.jpg"]);
			}
			else{

				var t2=setTimeout(function(){
					var deviceType4=isMobile();
					if(deviceType4 == "isApp" && (typeof mobileApp != "undefined")){
						var data={
							maxNum:1,//上传图片的最大个数
							imageType:"bodyImg"
						}
						data=JSON.stringify(data);
						if(getParamByUrl("os")=="android"){
							mobileApp.uploadImg(data);
						}
						else{
							mobileApp.uploadImg.postMessage(data);
						}
						//mobileApp.uploadImg(data);
					}
					clearTimeout(t2);
				},250);
			}
			setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_ShangChuanCeMianZhao);	
	});
}
function getImg(url){
		if(uploadtype == 0){
			$("#front").removeClass("front-default");
			for(var i=0;i<url.length;i++){
				$("#front").css("background-image",'url('+url[i]+')');
				frontPicture=url[i];
			}
			$("#front").addClass("getImg-bg");
			$(".delete1").show();
			$(".upload").css("background-color","#7fa9ff");
			isshowbtn1=1;
		}else if(uploadtype == 1){
			$("#side").removeClass("side-default");
			for(var i=0;i<url.length;i++){
				$("#side").css("background-image",'url('+url[i]+')');
				$("#side").addClass("getImg-bg");
				facePicture=url[i];
			}
			$(".delete2").show();
			$(".upload").css("background-color","#7fa9ff");
			isshowbtn2=1;
		}

	//删除照片
  	$(".delete1").unbind("click").click(function(event){
  		event.stopPropagation();
  		$("#front").removeClass("getImg-bg");
  		$("#front").css("background-image","url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/front.png)");
  		$("#front").addClass("front-default");
  		$(this).hide();
  		//显示预览图
  		// $("#front").unbind("click");
  		addfrontImg();
  		isshowbtn1=0;
  		if(isshowbtn2==0){
  			$(".upload").css("background-color","#bbbbbb");
  		}
  		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_ShanChuZhaoPian);
	});
  	$(".delete2").unbind("click").click(function(event){
  		event.stopPropagation();
  		$("#side").removeClass("getImg-bg");
  		$("#side").css("background-image","url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/side.png)");
  		$("#side").addClass("side-default");
  		$(this).hide();
  		addsideImg();
  		isshowbtn2=0;
  		if(isshowbtn1==0){
  			$(".upload").css("background-color","#bbbbbb");
  		}
  		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_ShanChuZhaoPian);
	});

  	showBigImg();

}
//隐藏日期选择
function hideDate(){
	$(".backscroll-time").hide();
}
//显示腰围选择
function getWaistList(){

	$(".backscroll-waist").css("height",$(window).height());
	$(".backscroll-waist").show();
	/*var str="";
	for(var i=480;i<1840;i++){
		str+='<div class="swiper-slide">'+i+'</div>';
	}
	$(".waistList").html(str);
	var x=(1840-480)/2;
	var mySwiper2 = new Swiper('.backscroll-waist .swiper-container', {
		centeredSlides: true,
		slidesPerView : 10,
		initialSlide:x

	});*/
		//腰围画图开始
		//var tScale  = window.devicePixelRatio;
		var tScale = 2;
		var oC1=$("#line").get(0);
		var oC1=oC1.getContext('2d');

		var startNum=70;
		if(sex==1){
			startNum=80;
			var linewidth = 14960;
			var iNum = 1360;
			var minNum = 48;
			var minNum2 = 4800;
			var leftNum = -13382;
		}else{
			startNum=70;
			var linewidth = 13090;
			var iNum = 1190;
			var minNum = 42;
			var minNum2 = 4200;
			var leftNum = -11713;
		}
		/*$("#line").css("width",8160+'px');
		$("#line").css("height",60+'px');
		$("#line").attr("width",8160*tScale);
		$("#line").attr("height",60*tScale);*/
		$("#line").css("width",linewidth+'px');
		$("#line").css("height",60+'px');
		$("#line").attr("width",linewidth*tScale);
		$("#line").attr("height",60*tScale);
		
	  	oC1.strokeStyle = "#000000";
		oC1.lineWidth = 1*tScale;
		oC1.font=(12*tScale)+"px  Arial";
		for(var i=1;i<iNum;i++){
			if(i%5==0){
				oC1.beginPath();
				oC1.moveTo(10*i*tScale+1,0);
				oC1.lineTo(10*i*tScale+1,32*tScale);
				oC1.strokeStyle = "#000000";
				oC1.stroke();
				oC1.textAlign="center";
				oC1.fillText(minNum+(i/10),10*i*tScale+1,46*tScale);
			}
			else{
				oC1.beginPath();
				oC1.moveTo(10*i*tScale+1,8*tScale);
				oC1.lineTo(10*i*tScale+1,32*tScale);
				oC1.strokeStyle = "#000000";
				oC1.stroke();
			}
			
		}

		if(waistMeasure != ""){
			startNum=waistMeasure;
		}
		var startX;
		var startY;
		var moveEndX;
		var moveEndY;
		var testLeft;
		$("#line-bg").css("left",parseInt($(window).width()/2));
		$("#line").css("left",parseInt(parseInt($(window).width()/2)+minNum2)-startNum*100);
		//$("#line").css("left",(parseInt($("#line").css("left")))+(parseInt($(window).width()/2)-parseInt($("#line").css("left")))%10);
		$(".num").html((parseInt($(window).width()/2)-parseInt($("#line").css("left"))+minNum2)/100);
		//$(".line").css("left","-1px");
		$(".waistList").on("touchstart",function(e){
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
			startX = e.originalEvent.changedTouches[0].pageX,
    		startY = e.originalEvent.changedTouches[0].pageY;
			testLeft=parseInt($("#line").css("left"));
		});
		$(".waistList").on("touchmove",function(e){
			moveEndX = e.originalEvent.changedTouches[0].pageX;
   			moveEndY = e.originalEvent.changedTouches[0].pageY;
   			var moveX;
   			var moveY;
   			moveX=moveEndX-startX;
   			moveY=moveEndY-startY;
   			
   			if((testLeft+moveX)>$(window).width()/2){
   				$("#line").css("left",$(window).width()/2);
   			}
   			else if((testLeft+moveX)<leftNum-$(window).width()/10){
   				$("#line").css("left",leftNum+"px");
   			}
   			else{
   				$("#line").css("left",testLeft+moveX);
   			}
				
		});
		
		$(".waistList").on("touchend",function(e){
			$("#line").css("left",(parseInt($("#line").css("left")))+(parseInt($(window).width()/2)-parseInt($("#line").css("left")))%10);
			$(".num").html((parseInt($(window).width()/2)-parseInt($("#line").css("left"))+minNum2)/100);
		})

	leftBtnHide();	
 	if(getParamByUrl("os")=="android"){
		var getPageInfo = function (){
			var data = {
				controlBtn:true,
				function:"wasitAndroid"
			};
			return JSON.stringify(data);
		};
		var deviceType=isMobile();
		if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
			if(getParamByUrl("os")=="android"){
				mobileApp.showBackBtn(getPageInfo());
			}
			else{
				mobileApp.showBackBtn.postMessage(getPageInfo());
			}
			//mobileApp.showBackBtn(getPageInfo());
		}		 
 	}
	$(".select-container").unbind("click").click(function(){
		event.stopPropagation();
	});	
	$(".select-cancel").unbind("click").click(function(){
		event.stopPropagation();
		$(".backscroll-waist").hide();
		leftBtnShow();
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_QuXiaoXuanZeYaoWei);
	});	
	$(".backscroll-waist").unbind("click").click(function(){
		event.stopPropagation();
		$(".backscroll-waist").hide();
		leftBtnShow();
	});	

	$(".select-sure").unbind("click").click(function(){
		waistMeasure = $(".num").html();
		$("#waistdata").html("");
		$(".backscroll-waist").hide();
			$("#waistdata").append('：'+waistMeasure+'CM<span class="clear"></span>');
			$("#waistdata .clear").unbind("click").click(function(event){
				event.stopPropagation();
				$("#waistdata").html("");
				waistMeasure="";
				// showtitle();
			});	
		leftBtnShow();
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_XuanZeYaoWei);
	});	

}

//显示日期选择
function showDate(){
	// notshowtitle();
	$(".backscroll-time").css("height",$(window).height());
	$(".backscroll-time").show();
	var mySwiper1 = new Swiper('.backscroll-time .swiper-container', {
		direction : 'vertical',
		slidesPerView : 5,
		initialSlide :dateListLen-1,
		centeredSlides:true

		/*onInit: function(swiper){
	      $(".swiper-slide-active").css("border-top","1px solid #ccc");
	      $(".swiper-slide-active").css("border-bottom","1px solid #ccc");
		}*/
	});
	leftBtnHide();
 	if(getParamByUrl("os")=="android"){
		var getPageInfo = function (){
		var data = {
		controlBtn:true,
		function:"dateAndroid"
		};
		return JSON.stringify(data);
		};
		if(getParamByUrl("os")=="android"){
			mobileApp.showBackBtn(getPageInfo());
		}
		else{
			mobileApp.showBackBtn.postMessage(getPageInfo());
		}
		//mobileApp.showBackBtn(getPageInfo());
 	}
	$(".select-container").unbind("click").click(function(){
		event.stopPropagation();
	});	
	$(".select-cancel").unbind("click").click(function(){
		event.stopPropagation();
		hideDate();
		// showtitle();
		leftBtnShow();
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_QuXiaoXuanZeShiJian);
	});
	$(".backscroll-time").unbind("click").click(function(){
		event.stopPropagation();
		hideDate();
		// showtitle();
		leftBtnShow();
	});		
	$(".select-sure").unbind("click").click(function(){
		hideDate();
		// showtitle();
		$("#selectdate").html($(".swiper-slide-active").html());
		leftBtnShow();
		strTime=$(".swiper-slide-active").attr("time");
		getCampDay(strTime);
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_XuanZeShiJian);
	});	
}

//显示体重/脂肪选择
function showWeight(){
	// notshowtitle();
	$(".backscroll-weight").css("height",$(window).height());
	$(".backscroll-weight").show();
	var mySwiper2 = new Swiper('.backscroll-weight .swiper-container', {
		direction : 'vertical',
		initialSlide :weightIndex,
		slidesPerView : 5,
		centeredSlides : false,
		

	});

	$(".backscroll-weight .swiper-wrapper .swiper-slide").eq(weightIndex).css("background-image","url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/pick.png)");
	weight=$(".backscroll-weight .swiper-wrapper .swiper-slide").eq(weightIndex).find(".selectweight-weight").html();
	fat = $(".backscroll-weight .swiper-wrapper .swiper-slide").eq(weightIndex).find(".selectweight-fat").html();

	leftBtnHide();
 	if(getParamByUrl("os")=="android"){
		var getPageInfo = function (){
		var data = {
		controlBtn:true,
		function:"weightAndroid"
		};
		return JSON.stringify(data);
		};
		if(getParamByUrl("os")=="android"){
			mobileApp.showBackBtn(getPageInfo());
		}
		else{
			mobileApp.showBackBtn.postMessage(getPageInfo());
		}
		//mobileApp.showBackBtn(getPageInfo());
 	}
	$(".select-container").unbind("click").click(function(){
		event.stopPropagation();
	});	
	$(".select-cancel").unbind("click").click(function(){
		event.stopPropagation();
		$(".backscroll-weight").hide();
		// showtitle();
		if($("#weight") || $("#fat")){
			weight=$("#weight").html();
			fat = $("#fat").html();
			if(weight=="undefined" || weight==undefined){
				weight="";
			}
			if(fat=="undefined" || fat==undefined){
				fat="";
			}
		}else{
			weight="";
			fat = "";
		}
		leftBtnShow();
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_QuXiaoXuanZeTiZhi);
	});	
	$(".backscroll-weight").unbind("click").click(function(){
		event.stopPropagation();
		$(".backscroll-weight").hide();
		// showtitle();
		if($("#weight") || $("#fat")){
			weight=$("#weight").html();
			fat = $("#fat").html();
		}else{
			weight="";
			fat = "";
		}
		leftBtnShow();
	});	


	$(".backscroll-weight .swiper-wrapper .swiper-slide").unbind("click").click(function(){
		$(".backscroll-weight .swiper-wrapper .swiper-slide").css("background-image","url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/nopick.png)");
		$(this).css("background-image","url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/pick.png)");
		weight=$(this).find(".selectweight-weight").html();
		fat = $(this).find(".selectweight-fat").html();
		weightIndex=$(".backscroll-weight .swiper-wrapper .swiper-slide").index(this);
		// $("#selectdate").html($(".swiper-slide-active").html());
	});	
	$(".select-sure").unbind("click").click(function(){
		$(".backscroll-weight").hide();
		// showtitle();
		if(weight!="" || fat!=""){
			$("#weightdata").html("");
			$("#weightdata").append('：'+'<span id="weight">'+weight+'</span>'+'KG/'+'<span id="fat">'+fat+'</span>'+'%<span class="clear"></span>');
			$(".clear").unbind("click").click(function(event){
				event.stopPropagation();
				$("#weightdata").html("");
				weight="";
				fat="";
				// showtitle();
			});	
		}
		leftBtnShow();
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_XuanZeTiZhi);
	});	
}
//移动端隐藏title栏
function notshowtitle(){
		var deviceType6=isMobile();
		if(deviceType6 == "isApp" && (typeof mobileApp != "undefined")){
			var data={
				display:false
			}
			data=JSON.stringify(data);
			if(getParamByUrl("os")=="android"){
				mobileApp.showTitle(data);
			}
			else{
				mobileApp.showTitle.postMessage(data);
			}
			//mobileApp.showTitle(data);
		}
}
//移动端显示title栏
function showtitle(){
		var deviceType6=isMobile();
		if(deviceType6 == "isApp" && (typeof mobileApp != "undefined")){
			var data={
				display:true
			}
			data=JSON.stringify(data);
			if(getParamByUrl("os")=="android"){
				mobileApp.showTitle(data);
			}
			else{
				mobileApp.showTitle.postMessage(data);
			}
			//mobileApp.showTitle(data);
		}
}
appNoShare();
function appNoShare(){
	var getPageInfo = function (){
		var data = {
			title:'编辑照片',
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
				mobileApp.controlTitle(getPageInfo());
			}
			else{
				mobileApp.controlTitle.postMessage(getPageInfo());
			}
			//mobileApp.getShareInfo(getPageInfo());
	}
	/*mobileApp.getShareInfo(getPageInfo());*/
	document.documentElement.style.webkitTouchCallout='none';
}

//获取日期列表
function getDateList(){

		console.log(campId);
		console.log(roleId);
		var finalUrl=ajaxLink+"/v1/api/campCommon/campDateList"+window.location.search+"&campId="+campId;
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					console.log("success");
					if(data.resp.dateList.length>0){
						dateListLen = data.resp.dateList.length;
						var currentDate = data.resp.dateList[data.resp.dateList.length-1];
						var str ="";
						var str1="";
						var str3='<div class="doubleline" style="width:100%;"></div>'
						for(i=0;i<data.resp.dateList.length;i++){
							
							str1+='<div class="swiper-slide" time=\"'+data.resp.dateList[i].time+'\">'+data.resp.dateList[i].date+'</div>'
						}
						var str4 = '<img src="http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/top-meng.png"  class="top-meng">'+
			 			'<img src="http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/bottom-meng.png"  class="bottom-meng">';
						str=str4+'<div class="swiper-wrapper">'+str1+'</div>'+str3;
						$(".backscroll-time .select-container .swiper-container").append(str);
						$(".doubleline").css("position","absolute");
						$(".doubleline").css("left","0");
						$(".doubleline").css("top","5.35rem");
						$(".doubleline").css("height","2.675rem");
					}

				}
				else{
					// alert(data.result.message);
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		})
}
//入营天数计算
function getCampDay(currentDate){
		var dayUrl=ajaxLink+"/v1/api/campCommon/campDay"+window.location.search+"&campId="+campId+"&roleId="+roleId+"&time="+currentDate;
		$.ajax({
			type:"get",
			url:dayUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					console.log("success");
					$("#dayc").html(data.resp);
				}
				else{
					// alert(data.result.message);
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		})
}

//学员历史身体数据
function getCampBodyIndexData(param){
	var time = $("#selectdate").html();
	var dayUrl=ajaxLink+"/v1/api/campCommon/campBodyIndexData"+window.location.search+"&campId="+campId+"&roleId="+roleId+"&time="+time;
	$.ajax({
		type:"get",
		url:dayUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				console.log("success");
				 if(data.resp){
				 	if(data.resp.sex){
				 		sex=data.resp.sex;
				 	}
					if(data.resp.bodyIndexDate && data.resp.bodyIndexDate.length>0){
						var str2="";
						weightIndex= data.resp.beginIndex;
						for(i=0;i<data.resp.bodyIndexDate.length;i++){
							str2+='<div class="swiper-slide">'+
						    	'<span class="col-xs-5 col-sm-5 selectweight-date">'+data.resp.bodyIndexDate[i].time+'</span>'+
						    	'<div class="col-xs-3 col-sm-3" style="display:inline-block"><span class="selectweight-fat">'+data.resp.bodyIndexDate[i].bodyFat+'</span><span>%</span></div>'+
						    	'<div class="col-xs-3 col-sm-3" style="display:inline-block"><span class="selectweight-weight">'+data.resp.bodyIndexDate[i].weight+'</span><span>KG</span></div></div>'
						}
						$(".backscroll-weight .select-container .swiper-container .swiper-wrapper").empty();
						$(".backscroll-weight .select-container .swiper-container .swiper-wrapper").append(str2);
						isWeightDate = 0;
						if(param==1){
							showWeight();
						}
					}else{
						isWeightDate = 1;
					}
				}
			}
			else{
				// alert(data.result.message);
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
			}
		}
	})
}
//判断上传次数，跳转
function uploadLink(){

		var finalUrl=ajaxLink+"/v1/api/campCommon/campPictureCount"+window.location.search+"&campId="+campId+"&roleId="+roleId;
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					console.log("success");
						if(data.resp==0){
							var deviceType=isMobile();//判断是不是app的方法
							if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
								$(".upload").unbind("click").click(function(){
								var data={
									link:absoluteUrl+"photoAlbum.html"+window.location.search+"&campId="+campId+"&roleId="+roleId,
								    animation: 2//默认1从右到左，2从下到上
								};
								data=JSON.stringify(data);
									if(getParamByUrl("os")=="android"){
										mobileApp.openWebview(data);
									}
									else{
										mobileApp.openWebview.postMessage(data);
									}
								//mobileApp.openWebview(data);
								})
							}else{
								$(".upload").attr("href","photoAlbum.html"+window.location.search+"&campId="+campId+"&roleId="+roleId);
							}
							event.stopPropagation();

						}else if(data.resp>0){
							var deviceType=isMobile();//判断是不是app的方法
							if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
								$(".upload").unbind("click").click(function(){
								var data={
									link:absoluteUrl+"figureContrast2.html"+window.location.search+"&campId="+campId+"&roleId="+roleId,
								    animation: 2//默认1从右到左，2从下到上
								};
								data=JSON.stringify(data);
									if(getParamByUrl("os")=="android"){
										mobileApp.openWebview(data);
									}
									else{
										mobileApp.openWebview.postMessage(data);
									}
									//mobileApp.openWebview(data);
								})
							}else{
								$(".upload").attr("href","figureContrast2.html"+window.location.search+"&campId="+campId+"&roleId="+roleId);
							}
							event.stopPropagation();
						}

				}
				else{
					// alert(data.result.message);
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		})
}

function getPictureContent(){
	var pictureId = getParamByUrl("imgId");
	var finalUrl=ajaxLink+"/v1/api/campStu/gitPicture"+window.location.search+"&pictureId="+pictureId;
	// alert(finalUrl);
	$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					// console.log("success");
					if(data.resp.waistMeasureId!="" && data.resp.waistMeasureId!=null){
						// alert(data.resp.waistMeasureId);
						waistMeasureId = data.resp.waistMeasureId;
					}
				  	if(data.resp.frontPicture!="" && data.resp.frontPicture!=null){
						$("#front").removeClass("front-default");
						$("#front").css("background-image",'url('+data.resp.frontPicture+')');
						$("#front").addClass("getImg-bg");
						$(".delete1").show();
						$(".upload").css("background-color","#7fa9ff");
						isshowbtn1=1;
						frontPicture=data.resp.frontPicture;
				  	}else{}

				  	if(data.resp.facePicture!="" && data.resp.facePicture!=null){
						$("#side").removeClass("side-default");
						$("#side").css("background-image",'url('+data.resp.facePicture+')');
						$("#side").addClass("getImg-bg");
						$(".delete2").show();
						$(".upload").css("background-color","#7fa9ff");
						isshowbtn2=1;
						facePicture = data.resp.facePicture;
				  	}else{}
				  	$("#selectdate").html(data.resp.time);
				  	$("#dayc").html(data.resp.day);

					if(data.resp.weight!="" && data.resp.fat!="" && data.resp.weight!=null && data.resp.fat!=null ){
						// $("#weightdata").append('：'+data.resp.weight+'KG/'+data.resp.fat+'%<span class="clear"></span>');
						$("#weightdata").append('：'+'<span id="weight">'+data.resp.weight+'</span>'+'KG/'+'<span id="fat">'+data.resp.fat+'</span>'+'%<span class="clear"></span>');
						weight=data.resp.weight;
						fat=data.resp.fat;
						$(".clear").unbind("click").click(function(event){
							event.stopPropagation();
							$("#weightdata").html("");
							weight="";
							fat="";
							// showtitle();
						});	
					}
					if(data.resp.waistMeasure!="" && data.resp.waistMeasure!=null){
							waistMeasure = data.resp.waistMeasure;
							$("#waistdata").append('：'+data.resp.waistMeasure+'CM<span class="clear"></span>');
							$("#waistdata .clear").unbind("click").click(function(event){
								event.stopPropagation();
								$("#waistdata").html("");
								waistMeasure="";
								// showtitle();
							});	
					}

					//显示预览图
					showBigImg();

					//获取学员历史身体数据
					getCampBodyIndexData(0);
				}
				else{
					// alert(data.result.message);
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
	})
}

function leftBtnShow(){
	var deviceType=isMobile();//判断是不是app的方法
	var getPageInfo = function (){
		var data = {
			/*iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
			backNum:1,//1为正常后退，
			closeWebview:0,//默认为0
			iconUrl:"",
			hidden:false*/
			iconType:1,
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
	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		if(getParamByUrl("os")=="android"){
			mobileApp.controlLeft(getPageInfo());
		}
		else{
			mobileApp.controlLeft.postMessage(getPageInfo());
		}
		//mobileApp.showLeftBtn(getPageInfo());
	}
 	if(getParamByUrl("os")=="android"){
		var getPageInfo = function (){
			var data = {
				controlBtn:false,
				function:""
			};
			return JSON.stringify(data);
		};
		var deviceType=isMobile();
		if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
			if(getParamByUrl("os")=="android"){
				mobileApp.showBackBtn(getPageInfo());
			}
			else{
				mobileApp.showBackBtn.postMessage(getPageInfo());
			}
			//mobileApp.showBackBtn(getPageInfo());
		}
 	}
}

function leftBtnHide(){
	var deviceType=isMobile();//判断是不是app的方法
	var getPageInfo = function (){
		var data = {
			/*iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
			backNum:1,//1为正常后退，
			closeWebview:0,//默认为0
			iconUrl:"",
			hidden:true*/
			iconType:1,
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
	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		if(getParamByUrl("os")=="android"){
			mobileApp.controlLeft(getPageInfo());
		}
		else{
			mobileApp.controlLeft.postMessage(getPageInfo());
		}
		//mobileApp.showLeftBtn(getPageInfo());
	}
}

function addAndroid(){
 	if(getParamByUrl("os")=="android"){
		var getPageInfo = function (){
		var data = {
		controlBtn:false,
		function:""
		};
		return JSON.stringify(data);
		};
		var deviceType=isMobile();
		if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
			if(getParamByUrl("os")=="android"){
				mobileApp.showBackBtn(getPageInfo());
			}
			else{
				mobileApp.showBackBtn.postMessage(getPageInfo());
			}
			//mobileApp.showBackBtn(getPageInfo());
		}
 	}
}

function weightAndroid(){
	leftBtnShow();
	$(".backscroll-weight").hide();
}
function wasitAndroid(){
	leftBtnShow();
	$(".backscroll-waist").hide();
}
function dateAndroid(){
	leftBtnShow();
	hideDate();
}
function promptAndroid(){
	leftBtnShow();
	$(".prompt-back").css("display","none");
}
function hideIMG(){
		var deviceType6=isMobile();
		if(deviceType6 == "isApp" && (typeof mobileApp != "undefined")){
			var data={
				display:true
			}
			data=JSON.stringify(data);
			if(getParamByUrl("os")=="android"){
				mobileApp.showTitle(data);
			}
			else{
				mobileApp.showTitle.postMessage(data);
			}
			//mobileApp.showTitle(data);
		}

		if(getParamByUrl("os")=="android"){
			var getPageInfo1 = function (){
				var data = {
					controlBtn:false,
					function:""
				};
				return JSON.stringify(data);
			};
			var deviceType=isMobile();
			if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
				if(getParamByUrl("os")=="android"){
					mobileApp.showBackBtn(getPageInfo1());
				}
				else{
					mobileApp.showBackBtn.postMessage(getPageInfo1());
				}
				//mobileApp.showBackBtn(getPageInfo1());
			}
		}	
		$(".backall").css("height","0");
		$(".backall").css("background-image","");

		$("body").css("overflow","auto"); 
		$("body").css("max-height","auto");
		document.addEventListener('touchmove', function(event) {
			//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
			if($("body").css("overflow")=="hidden"){
				event.preventDefault();
			}
		})
}
function showBigImg(){
	//显示预览图
	$(".getImg-bg").unbind("click").click(function(){
		var url = $(this).css("background-image");
		var deviceType6=isMobile();
		if(deviceType6 == "isApp" && (typeof mobileApp != "undefined")){
			var data={
				display:false
			}
			data=JSON.stringify(data);
			if(getParamByUrl("os")=="android"){
				mobileApp.showTitle(data);
			}
			else{
				mobileApp.showTitle.postMessage(data);
			}
			//mobileApp.showTitle(data);
		}

		if(getParamByUrl("os")=="android"){
			var getPageInfo = function (){
				var data = {
					controlBtn:true,
					function:"hideIMG"
				};
				return JSON.stringify(data);
			};
			var deviceType=isMobile();
			if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
				if(getParamByUrl("os")=="android"){
					mobileApp.showBackBtn(getPageInfo());
				}
				else{
					mobileApp.showBackBtn.postMessage(getPageInfo());
				}
				//mobileApp.showBackBtn(getPageInfo());
			}
		}
		if(getParamByUrl("os")=="android"){
			$(".backall").css("height",$(window).height()+70);
		}
		else{
			$(".backall").css("height",$(window).height()+64);
		}
		$(".backall").css("background-image",url);
		$(".backall").css("display","block");
		$("body").css("max-height",$(window).height());
		$("body").css("overflow","hidden");
		document.addEventListener('touchmove', function(event) {
			//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
			if($("body").css("overflow")=="hidden"){
				event.preventDefault();
			}
		});
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian,SBianJiZhaoPian.SBianJiZhaoPian_XianShiYuLanTu);
	});

		//保存图片
		var timeout;
		
		var timeBtn=true;
		var startX;
		var startY;
		var moveEndX;
		var moveEndY;
		$(".backall").on("touchstart",function(e){ 
			startX = e.originalEvent.changedTouches[0].pageX,
    		startY = e.originalEvent.changedTouches[0].pageY;
            // var x=$(".bigImg-li").index(this);
            saveLink=$(this).css("background-image").split("\(")[1].split("\)")[0];
	        console.log($(this));
	        console.log(saveLink);

	        console.log($(".backall").css("display"));
            timeout = setTimeout(function(){
            	if($(".backall").css("display")=="block"){
            		$(".saveImg-ceng").css("height",$(window).height());
                	$(".saveImg-ceng").css("display","block");
                	timeBtn=false;
                }
            }, 500);
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动 
		})

		$(".backall").on("touchmove",function(e){
			if($(".saveImg-ceng").css("display")=="block"){
				//$(".saveImg-ceng").css("display","none");
				clearTimeout(timeout);
				timeBtn=false;
			}
			else{
				moveEndX = e.originalEvent.changedTouches[0].pageX;
	   			moveEndY = e.originalEvent.changedTouches[0].pageY;
	   			var moveX;
	   			var moveY;
	   			moveX=moveEndX-startX;
	   			moveY=moveEndY-startY;
	   			
	   			if(moveX<-50 || moveX>50 || moveY<-50 || moveY>50){
	   				clearTimeout(timeout);
	   				timeBtn=false;
	   			}
			}
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
		});
		//退出保存图片
		$(".backall").on("touchend",function(){
			clearTimeout(timeout);
			if(timeBtn){
				hideBigImg();
			}
			timeBtn=true;
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
		});
		/*$(".bigImg-li").mouseout(function(){
			clearTimeout(timeout);
		});*/
		//调用客户端保存图片方法
		$(".saveImg-btn").unbind("touchstart").bind("touchstart",function(e){
		//$(".saveImg-btn").unbind("touchstart").touchstart(function(){
			event.stopPropagation();
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
			var deviceType=isMobile();//判断是不是app的方法
			/*alert(saveLink);
			saveLink=JSON.stringify(saveLink);
			console.log(typeof saveLink);
			console.log(saveLink);*/
			if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
				var getPageInfo = function (){
					var data = {
						url:saveLink
					};
					return JSON.stringify(data);
				};
				if(getParamByUrl("os")=="android"){
					mobileApp.saveImg(getPageInfo());
				}
				else{
					mobileApp.saveImg.postMessage(getPageInfo());
				}
				//mobileApp.saveImg(getPageInfo());
			}
			$(".saveImg-ceng").css("display","none");
			//$(".saveImg-btn").unbind("touchstart");
		});
		//取消客户端保存图片
		$(".cancelImg-btn").on("touchstart",function(e){ 
			event.stopPropagation();
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动 
			$(".saveImg-ceng").css("display","none");
			
		});
		$(".saveImg-ceng").on("touchstart",function(e){ 

			$(".saveImg-ceng").css("display","none");
			event.stopPropagation();
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
		});
}

function hideBigImg(){
			//隐藏预览图
		var deviceType6=isMobile();
		if(deviceType6 == "isApp" && (typeof mobileApp != "undefined")){
			var data={
				display:true
			}
			data=JSON.stringify(data);
			if(getParamByUrl("os")=="android"){
				mobileApp.showTitle(data);
			}
			else{
				mobileApp.showTitle.postMessage(data);
			}
			//mobileApp.showTitle(data);
		}
		if(getParamByUrl("os")=="android"){
			var getPageInfo1 = function (){
				var data = {
					controlBtn:false,
					function:""
				};
				return JSON.stringify(data);
			};
			var deviceType=isMobile();
			if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
				if(getParamByUrl("os")=="android"){
					mobileApp.showBackBtn(getPageInfo1());
				}
				else{
					mobileApp.showBackBtn.postMessage(getPageInfo1());
				}
				//mobileApp.showBackBtn(getPageInfo1());
			}
		}

		$(".backall").css("height","0");
		$(".backall").css("background-image","");
		$(".backall").css("display","none");
}