
var frontdefaultImg=["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-w.png","http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-m.png"];
var sidedefaultImg=["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-w.png","http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-m.png"];

var campId=getParamByUrl("campId");
var roleId=getParamByUrl("roleId");
var SWoDeShenCaiDuiBi={
    SCategory_SWoDeShenCaiDuiBi:5061100,
    SWoDeShenCaiDuiBi_TiaoZhuanWoDeXiangCe:5061101,//跳转我的相册
    SWoDeShenCaiDuiBi_TiaoZhuanShangChuanZhaoPian:5061102,//跳转上传照片
    SWoDeShenCaiDuiBi_TuPianYuLan:5061103,//图片预览
};
  $(function(){
	$(".part-img-li").css("height",$(".part-img-li").width()*500/376);
	$(".bodyChange").css("height",$(".partLeft").height());
	appNoShare();
	getCompareTOPicture();
	//rightBtnShow();
	$(".button1").unbind("click").click(function(){
		$(this).css("opacity","0.6");
		setCookie("toPhoto",0,1);
		// var deviceType=isMobile();//判断是不是app的方法
		// if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
			
		// 	var data={
		// 		link:absoluteUrl+"photoAlbum.html"+window.location.search+"&campId="+campId+"&roleId="+roleId,
		// 	    animation: 2//默认1从右到左，2从下到上
		// 	};
		// 	data=JSON.stringify(data);
		// 	mobileApp.openWebview(data);

		// }else{
			$(this).attr("href","photoAlbum.html"+window.location.search+"&campId="+campId+"&roleId="+roleId);
		// }
		event.stopPropagation();
		setMaiDian(SWoDeShenCaiDuiBi.SCategory_SWoDeShenCaiDuiBi,SWoDeShenCaiDuiBi.SWoDeShenCaiDuiBi_TiaoZhuanWoDeXiangCe);
	});	

	$(".button2").unbind("click").click(function(){
		$(this).css("opacity","0.6");
		setCookie("uploadurl",1,1); //跳转到上传照片页面的标识
		// var deviceType=isMobile();//判断是不是app的方法
		// if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
			
		// 	var data={
		// 		link:absoluteUrl+"figureContrast.html"+window.location.search+"&campId="+campId+"&roleId="+roleId,
		// 	    animation: 2//默认1从右到左，2从下到上
		// 	};
		// 	data=JSON.stringify(data);

		// 	mobileApp.openWebview(data);

		// }else{
			$(this).attr("href","figureContrast.html"+window.location.search+"&campId="+campId+"&roleId="+roleId);
		// }
		event.stopPropagation();
		setMaiDian(SWoDeShenCaiDuiBi.SCategory_SWoDeShenCaiDuiBi,SWoDeShenCaiDuiBi.SWoDeShenCaiDuiBi_TiaoZhuanShangChuanZhaoPian);
	});

	//分享
	// shareInfo();
  })

  //获取身材对比数据
  function getCompareTOPicture(){
	// var campId=getParamByUrl("campId");
	// var roleId=getParamByUrl("roleId");

		var finalUrl=ajaxLink+"/v1/api/campCommon/compareTOPicture"+window.location.search+"&campId="+campId+"&roleId="+roleId;
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					if(data.resp.sex==0){
						var defaultFrontUrl = frontdefaultImg[0];
						var defaultSideUrl = sidedefaultImg[0];
					}else{
						var defaultFrontUrl = frontdefaultImg[1];
						var defaultSideUrl = sidedefaultImg[1];
					}
					console.log("success");
					if(data.resp != ""){
						if(data.resp.campPictureLast){
							var isscale1 = "getImg-bg";
							var isscale2 = "getImg-bg";
							if(data.resp.campPictureLast.weight=="" || data.resp.campPictureLast.weight==null){
								data.resp.campPictureLast.weight="--";
							}else{}
							if(data.resp.campPictureLast.fat=="" || data.resp.campPictureLast.fat==null){
								data.resp.campPictureLast.fat="--";
							}else{}
							if(data.resp.campPictureLast.waistMeasure=="" || data.resp.campPictureLast.waistMeasure==null){
								data.resp.campPictureLast.waistMeasure="--";
							}else{}
							if(data.resp.campPictureLast.frontPicture=="" || data.resp.campPictureLast.frontPicture==null){
								data.resp.campPictureLast.frontPicture=defaultFrontUrl;
								isscale1="";
							}else{isscale1 = "getImg-bg";}
							if(data.resp.campPictureLast.facePicture=="" || data.resp.campPictureLast.facePicture==null){
								data.resp.campPictureLast.facePicture=defaultSideUrl;
								isscale2="";
							}else{isscale2 = "getImg-bg";}

							$("#day1").html(data.resp.campPictureLast.day);
							$("#datetime1").html(data.resp.campPictureLast.time);
							$(".partLeft-img-li1").css("background-image",'url('+data.resp.campPictureLast.frontPicture+')');
							$(".partLeft-img-li2").css("background-image",'url('+data.resp.campPictureLast.facePicture+')');
							$("#firstweight").html(data.resp.campPictureLast.weight);
							$("#firstfat").html(data.resp.campPictureLast.fat);
							$("#firstwaist").html(data.resp.campPictureLast.waistMeasure);
							$(".partLeft-img-li1").addClass(isscale1);
							$(".partLeft-img-li2").addClass(isscale2);

							showBigImg();
						}else{}

						if(data.resp.campPictureFirst){
							var isscale1 = "getImg-bg";
							var isscale2 = "getImg-bg";
							if(data.resp.campPictureFirst.weight=="" || data.resp.campPictureFirst.weight==null){
								data.resp.campPictureFirst.weight="--";
							}else{}
							if(data.resp.campPictureFirst.fat=="" || data.resp.campPictureFirst.fat==null){
								data.resp.campPictureFirst.fat="--";
							}else{}
							if(data.resp.campPictureFirst.waistMeasure=="" || data.resp.campPictureFirst.waistMeasure==null){
								data.resp.campPictureFirst.waistMeasure="--";
							}else{}	
							if(data.resp.campPictureFirst.frontPicture=="" || data.resp.campPictureFirst.frontPicture==null){
								data.resp.campPictureFirst.frontPicture=defaultFrontUrl;
								isscale1="";
							}else{}
							if(data.resp.campPictureFirst.facePicture=="" || data.resp.campPictureFirst.facePicture==null){
								data.resp.campPictureFirst.facePicture=defaultSideUrl;
								isscale2="";
							}else{}


							$("#day2").html(data.resp.campPictureFirst.day);
							$("#datetime2").html(data.resp.campPictureFirst.time);
							$(".partRight-img-li3").css("background-image",'url('+data.resp.campPictureFirst.frontPicture+')');
							$(".partRight-img-li4").css("background-image",'url('+data.resp.campPictureFirst.facePicture+')');

							$("#lastweight").html(data.resp.campPictureFirst.weight);
							$("#lastfat").html(data.resp.campPictureFirst.fat);
							$("#lastwaist").html(data.resp.campPictureFirst.waistMeasure);
							$(".partRight-img-li3").addClass(isscale1);
							$(".partRight-img-li4").addClass(isscale2);
							$(".changeContent").css("width",window.innerWidth*182/750);
							$(".changeContent").css("top",$(".partRight-img-li3").height()-$(".changeContent").height()/2-8);
							$(".changeContent").css("left",$(".partRight-img-li3").width()-$(".changeContent").width()/2);
							showBigImg();

							if($(".container").height()< $(window).height()){
								$(".container").css("height",$(window).height());
							}
						}else{}


					}


				}
				else{
					// alert(data.result.message);
		            $(".error-main-t").html(data.message);
		            $(".errorAlert").css("display","block");
		            $(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		})
  }

 function appNoShare(){
	var getPageInfo = function (){
		var data = {
			title:'身材对比',
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

//截图分享
// function shareInfo(){
// 	var getPageInfo = function (){
// 		var data = {
// 			title:'身材对比',
// 			backgroundColor:'#2c2f31',
// 			isShare:true,
// 			shareTitle:'',
// 			shareUrl:"",
// 			shareIcon:'',
// 			shareDesc:'微博分享话术哈哈哈哈哈',
// 			shareType:1,
// 			shareBackgroundColor:'#ffffff',
// 			shareTypeDesc:"有品燃脂营 · 身材对比"
// 		};
// 			return JSON.stringify(data);
// 	};
// 	var deviceType=isMobile();
// 		if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
// 		mobileApp.getShareInfo(getPageInfo());
// 	}
// 	document.documentElement.style.webkitTouchCallout='none';
// }

function showBigImg(){
		//显示预览图
		$(".getImg-bg").unbind("click").click(function(){
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动 
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
			
			$("body").css("max-height",$(window).height());
			$("body").css("overflow","hidden");
			document.addEventListener('touchmove', function(event) {
				//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
				if($("body").css("overflow")=="hidden"){
					event.preventDefault();
				}
			})

			setMaiDian(SWoDeShenCaiDuiBi.SCategory_SWoDeShenCaiDuiBi,SWoDeShenCaiDuiBi.SWoDeShenCaiDuiBi_TuPianYuLan);
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
		$("body").css("overflow","auto"); 
		$("body").css("max-height","auto");
		document.addEventListener('touchmove', function(event) {
			//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
			if($("body").css("overflow")=="hidden"){
				event.preventDefault();
			}
		})

}



var getPageInfo6 = function (){
	var iconUrl = '';
	if(getParamByUrl("os")=="android"){
		iconUrl = "https://cdn2.picooc.com/web/res/event/chrome/android_share.png";
	}else{
		iconUrl = "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png";
	}
	var data = {
		iconType:0,//0走图片逻辑，1走文案逻辑
		rightStr:{
			str:"",
			color:"",
			opacity:"",
			id:"0"
		},
		rightIcon:[
			{
				type:"0",
				id:"2",
				functionName:"getControl",
				iconUrl:iconUrl,
				iconName:"分享",
				redDotType:"1",
				redDotShow:false,
				redDotNum:"0",
				nativeType:"",
				content:""
			}
		]
	};
	return JSON.stringify(data);
};
var deviceType=isMobile();
if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
	if(getParamByUrl("os")=="android"){
		mobileApp.controlRight(getPageInfo6());
	}
	else{
		mobileApp.controlRight.postMessage(getPageInfo6());
	}
}


/*function rightBtnShow(){
	var iconUrl = '';
	if(getParamByUrl("os")=="android"){
		iconUrl = "http://cdn2.picooc.com/web/res/fatburn/image/icon/right1-an.png";
	}else{
		iconUrl = "http://cdn2.picooc.com/web/res/fatburn/image/icon/right1-ios.png";
	}
	var getPageInfo = function(){
		var data={
			//rightImg: "http://cdn2.picooc.com/web/res/fatburn/image/icon/right-an.png",//右上角图片
			//function:"getControl"//右上角点击后需要调的h5的方法名
			iconType:0,
			id:"2",
			functionName:"getControl",
			iconUrl:iconUrl
		};
		return JSON.stringify(data);
	};
	//data=JSON.stringify(data);
	var deviceType=isMobile();
	if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
		if(getParamByUrl("os")=="android"){
			alert(919);
			mobileApp.controlRightInfo(getPageInfo());
			alert(2);
		}
		else{
			mobileApp.controlRightInfo.postMessage(getPageInfo());
		}
		//mobileApp.showRightBtn(data);
	}
 }*/
 function getControl(){
	/*window.location.href="figureContrastShare.html"+window.location.search;*/
	var deviceType=isMobile();//判断是不是app的方法
	if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){

		var data={
			link:absoluteUrl+"figureContrastShare.html"+window.location.search,
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
	}

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