var SXueYuanDaKa={
	SCategory_SXueYuanDaKa:5060300,
	SXueYuanDaKa_ShuRuKuang:5060301,//输入框
	SXueYuanDaKa_TianJiaTuPian:5060302,//添加图片
	SXueYuanDaKa_XianShiYuLanTu:5060303,//显示预览图
	SXueYuanDaKa_BaoCunTuPian:5060304,//保存图片
	SXueYuanDaKa_QuXiaoBaoCunTuPian:5060305,//取消保存图片
	SXueYuanDaKa_ShanChuTuPian:5060306,//删除图片
	SXueYuanDaKa_XuanZeDaKaBiaoQian:5060307,//选择打卡标签
	SXueYuanDaKa_DianJiDaKa:5060308//点击打卡
};
var btnShow=false;
var arrbg3=[];
var arrgetImg=0;
var btnType=0;
var roleId=getParamByUrl("roleId");
/*var joinDate=getParamByUrl("joinDate");*/
var loadImg=[];
var focusBtn=false;

var imgMaxNum = 6;
var mySwiper;
/*if(joinDate=="false"){
	$(".title").html("");
}
else{
	$(".title span").html("入营第"+joinDate+"天");
}*/
$(".main").css("min-height",$(window).height()-5*fontHeight);
$(function(){
	leftControl();
	function appNoShare(){
		var getPageInfo = function (){
			var data = {
				title:'打卡',
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
	appNoShare();
	var arrbg1=["image/setcard/setcard-2.png","image/setcard/setcard-3.png","image/setcard/setcard-4.png","image/setcard/setcard-5.png","image/setcard/setcard-7.png"];
	var arrbg2=["image/setcard/setcard-31.png","image/setcard/setcard-32.png","image/setcard/setcard-33.png","image/setcard/setcard-34.png","image/setcard/setcard-36.png"];
	
	$(".icon").unbind("click").click(function(){
		setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa,SXueYuanDaKa.SXueYuanDaKa_XuanZeDaKaBiaoQian);
		var index=$(".icon").index(this);
		btnType=index;
		if(arrbg3.length!=0){
			$(".icon").eq(arrbg3[0]).find("img").attr("src",arrbg1[arrbg3[0]]);
		}
		arrbg3[0]=index;
		$(".icon").eq(index).find("img").attr("src",arrbg2[index]);
		showBtn();

	});
	$("#msgInfo").focus(function(){
		focusBtn=true;
		
	});
	$("#msgInfo").blur(function(){
		var t3=setTimeout(function(){
			focusBtn=false;
			clearTimeout(t3);
		},100);
	});
	$(".getImg-bg1").unbind("click").click(function(){
		$("#msgInfo").blur();
		setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa,SXueYuanDaKa.SXueYuanDaKa_TianJiaTuPian);
		if(getParamByUrl("testtype")=="tanchao"){
			getImg(["http://cdn2.picooc.com/web/res/event/bottle/image/msg-2.png","http://cdn2.picooc.com/web/res/event/bottle/image/bg1.jpg"]);
		}
		if(focusBtn){
			console.log(1);
			var t2=setTimeout(function(){
				var deviceType4=isMobile();
				if(deviceType4 == "isApp" && (typeof mobileApp != "undefined")){
					var data={
						maxNum:imgMaxNum//上传图片的最大个数
					}

					data=JSON.stringify(data);
					mobileApp.uploadImg(data);

				}
				clearTimeout(t2);
			},250);
		}
		else{
			console.log(2);
			var deviceType4=isMobile();
			if(deviceType4 == "isApp" && (typeof mobileApp != "undefined")){
				var data={
					maxNum:imgMaxNum//上传图片的最大个数
				}
				data=JSON.stringify(data);
				mobileApp.uploadImg(data);
			}
		}
		
	});
	$(".bigImg-delete").unbind("click").click(function(){
		$(".bigImg").css("display","none");
	});
	$("#msgInfo").unbind("focus").focus(function(){
		setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa,SXueYuanDaKa.SXueYuanDaKa_ShuRuKuang);
	});
	$("#msgInfo").bind("input propertychange",function(){
		showBtn();
	});
	$(".footbtn-btn").unbind("click").click(function(){
		setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa,SXueYuanDaKa.SXueYuanDaKa_DianJiDaKa);
		if(btnShow){
			var imgs=[];
			for(var i = 0; i<loadImg.length; i++) {
				imgs.push({"url":loadImg[i],"labels":[]});
			};
			imgs=JSON.stringify(imgs);
			console.log(imgs);
			var content=$.trim($("#msgInfo").val());
			content=content.replace(/\%/g, "%25");
			content=content.replace(/\&/g, "%26");
			content=content.replace(/\+/g, "%2B");
			content=content.replace(/\#/g, "%23");
			content=content.replace(/\n/g, "<br />");
			var finalUrl=ajaxLink+"/v1/api/campStu/checkIn"+window.location.search+"&type="+btnType+"&content="+content+"&imgs="+imgs;
			
			//var finalUrl="http://pm.picooc.com:9989/v1/api/camp/checkIn?roleId="+roleId+"&type="+btnType+"&content="+$("#msgInfo").val()+"&imgs="+imgs;
			$.ajax({
				type:"get",
				url:finalUrl,
				dataType:"json",
				success:function(data){
					if(data.code == 200){
						setCookie("setCardL","1",1);
						setCookie("setCardId",data.resp,1);
						if(getParamByUrl("testtype")=="tanchao"){
							console.log(imgs);
						}
						else{
							var deviceType=isMobile();
							if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
								var getPageInfo = function (){
									var data = {
										backNum:1,//默认为1，
										closeWebview:0//默认为0
									};
								    return JSON.stringify(data);
								};
								mobileApp.deleteHistory(getPageInfo());
							}
							else{
								window.location.href=ajaxLink+"/web/fatburntest/student.html"+window.location.search;
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
		
	});
})
function getImg(url){
	var str='';
	var str2='';
	for(var i=0;i<url.length;i++){
		loadImg.push(url[i]);
		//str+='<div class="col-xs-3 col-sm-3 getImg-img"><img class="getImg-bg" src="'+url[i]+'" /><img class="getImg-delete" src="image/setcard/setcard-10.png" /></div>';
		str+='<div class="col-xs-4 col-sm-4 getImg-img"><div class="getImg-bg" style=\"background-image:url('+url[i]+')\"></div><img class="getImg-delete" src="image/setcard/setcard-10.png" /></div>';
		str2+='<div class="col-xs-12 col-sm-12 swiper-slide bigImg-li" style=\"background-image:url('+url[i]+')\"></div>';
	}
	/*$(".getImg").prepend(str);
	$(".bigImg-main").prepend(str2);*/
	$(".getImg-add").before(str);
	$(".bigImg-main").append(str2);
	$(".getImg-bg").css("height",$(".getImg-bg").width());
	//显示预览图
	$(".getImg-bg").unbind("click").click(function(){
		setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa,SXueYuanDaKa.SXueYuanDaKa_XianShiYuLanTu);
		
		var swiperIndex=$(".getImg-bg").index(this);
		$(".bigImg").css("display","block");
		if($(".getImg-bg").length==1){
			$(".swiper-pagination").html('');
			mySwiper = new Swiper('.swiper-container', {
				pagination : null,
				initialSlide : 0
			});
		}
		else{
			if(swiperIndex==0){
				$(".bigImg-main").css("transform","translate3d(0px, 0px, 0px)");
			}
			mySwiper = new Swiper('.swiper-container', {
				pagination : '.swiper-pagination',
				spaceBetween: 1,
				initialSlide : swiperIndex
			});
			//swiper.slideTo(swiperIndex, 1000, false);
		}
		//alert("已经添加隐藏标题方法");
		var deviceType6=isMobile();
		if(deviceType6 == "isApp" && (typeof mobileApp != "undefined")){
			var data={
				display:false
			}
			data=JSON.stringify(data);
			mobileApp.showTitle(data);
			//控制安卓返回键
			if(getParamByUrl("os")=="android"){
				var getPageInfo = function (){
					var data = {
						controlBtn:true,
						function:"closeBigImg"
					};
					return JSON.stringify(data);
				};
				mobileApp.showBackBtn(getPageInfo());
			}
		}

		//保存图片
		var timeout;
		
		var timeBtn=true;
		var startX;
		var startY;
		var moveEndX;
		var moveEndY;
		$(".bigImg-li").on("touchstart",function(e){ 
			startX = e.originalEvent.changedTouches[0].pageX,
    		startY = e.originalEvent.changedTouches[0].pageY;
            var x=$(".bigImg-li").index(this);
            saveLink=$(this).css("background-image").split("\(")[1].split("\)")[0];
	        console.log($(this));
	        console.log(saveLink);

	        console.log($(".bigImg").css("display"));
            timeout = setTimeout(function(){
            	if($(".bigImg").css("display")=="block"){
            		$(".saveImg-ceng").css("height",$(window).height());
                	$(".saveImg-ceng").css("display","block");
                	timeBtn=false;
                }
            }, 500);
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动 
		})

		$(".bigImg-li").on("touchmove",function(e){
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
		$(".bigImg-li").on("touchend",function(){
			clearTimeout(timeout);
			if(timeBtn){
				closeBigImg();
			}
			timeBtn=true;
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
		});
		/*$(".bigImg-li").mouseout(function(){
			clearTimeout(timeout);
		});*/
		//调用客户端保存图片方法
		$(".saveImg-btn").unbind("touchstart").bind("touchstart",function(e){
			setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa,SXueYuanDaKa.SXueYuanDaKa_BaoCunTuPian);
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
				mobileApp.saveImg(getPageInfo());
			}
			$(".saveImg-ceng").css("display","none");
			//$(".saveImg-btn").unbind("touchstart");
		});
		//取消客户端保存图片
		$(".cancelImg-btn").on("touchstart",function(e){
			setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa,SXueYuanDaKa.SXueYuanDaKa_QuXiaoBaoCunTuPian);
			event.stopPropagation();
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动 
			$(".saveImg-ceng").css("display","none");
			
		});
		$(".saveImg-ceng").on("touchstart",function(e){ 

			$(".saveImg-ceng").css("display","none");
			event.stopPropagation();
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
		});		
		//隐藏预览
		// $(".bigImg-li").unbind("click").click(function(){
		// 	closeBigImg();
		// })
	});
	
	$(".bigImg-li").css("width",$(window).width());
	$(".bigImg-li").css("height",$(window).height()+64);
	//退出预览图


	arrgetImg=url.length;
	showBtn();
	//删除图片
	$(".getImg-delete").unbind("click").click(function(){
		setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa,SXueYuanDaKa.SXueYuanDaKa_ShanChuTuPian);
		var index=$(".getImg-delete").index(this);
		$(".getImg-img").eq(index).remove();
		$(".bigImg-li").eq(index).remove();
		loadImg.splice(index,1);
		if(mySwiper!=undefined){
			//mySwiper.slideTo(0, 1000, false);
			//mySwiper.destroy(true);
			$(".bigImg-main").css("transform","translate3d(0px, 0px, 0px)");
		}
		
		/*mySwiper = new Swiper('.swiper-container', {
			pagination : null
		});*/

		if($(".getImg-img").length<6){
			$(".getImg-bg1").css("display","block");
			arrgetImg=$(".getImg-img").length;
			imgMaxNum=6-arrgetImg;
			showBtn();
		}
	});
	//$(".getImg-bg1").css("display","none");
	if($(".getImg-img").length==6){
		$(".getImg-bg1").css("display","none");
	}
	else if($(".getImg-img").length>6){
		for(var i=6;i<$(".getImg-img").length;i++){
			$(".getImg-img").eq(i).remove();
			$(".bigImg-li").eq(i).remove();
		}
		$(".getImg-bg1").css("display","none");
	}

	imgMaxNum=imgMaxNum-arrgetImg;
}
function showBtn(){
	if((arrbg3.length>0 && $(".getImg-img").length>0) || (arrbg3.length>0 && $.trim($("#msgInfo").val()).replace(/[ ]/g,"").length>0)){
		btnShow=true;
		$(".footbtn-btn").css("background","#ffc36e");
	}
	else{
		btnShow=false;
		$(".footbtn-btn").css("background","#bbb");
	}
}
function closeBigImg(){
	$(".bigImg").css("display","none");
	var strBigImg=$(".bigImg").html();
	//mySwiper.slideTo(0, 1000, false);
	$(".bigImg").html("");
	mySwiper.destroy(true);
	var deviceType6=isMobile();
	if(deviceType6 == "isApp" && (typeof mobileApp != "undefined")){
		var data={
			display:true
		}
		data=JSON.stringify(data);
		mobileApp.showTitle(data);
		//关闭返回键控制
		if(getParamByUrl("os")=="android"){
			var getPageInfo = function (){
				var data = {
					controlBtn:false,
					function:""
				};
				return JSON.stringify(data);
			};
			mobileApp.showBackBtn(getPageInfo());
		}
	}
	$(".bigImg").html(strBigImg);
}


//左上角隐藏返回功能
function leftControl(){
	/*alert("leftControl++");*/
	var getPageInfo = function (){
		var data = {
			iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
			backNum:1,//1为正常后退，
			closeWebview:0,//默认为0
			hidden:false,
			iconUrl:""
		};
		return JSON.stringify(data);
	}
	var deviceType=isMobile();
	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		mobileApp.showLeftBtn(getPageInfo());
	}
	document.documentElement.style.webkitTouchCallout='none';
}


