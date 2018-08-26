var SShenCaiDuiBi={
	SCategory_SShenCaiDuiBi:5070500,
	SShenCaiDuiBi_ChaKanTaDeXiangCe:5070501,//查看Ta的相册
	SShenCaiDuiBi_XianShiYuLanTu:5070502//显示预览图
};
var frontdefaultImg=["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-w.png","http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-m.png"];
var sidedefaultImg=["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-w.png","http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-m.png"];

var campId=getParamByUrl("campId");
var roleId=getParamByUrl("roleId");

  $(function(){
	$(".part-img-li").css("height",$(".part-img-li").width()*500/376);
	$(".bodyChange").css("height",$(".partLeft").height());
	appNoShare();
	getCompareTOPicture();
	// rightBtnShow();
	// $(".button3").unbind("click").click(function(){
	// 	alert("111");
	// 	// setCookie("toPhoto",0,1);
	// 	// // var deviceType=isMobile();//判断是不是app的方法
	// 	// // if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
			
	// 	// // 	var data={
	// 	// // 		link:absoluteUrl+"photoAlbum.html"+window.location.search+"&campId="+campId+"&roleId="+roleId,
	// 	// // 	    animation: 2//默认1从右到左，2从下到上
	// 	// // 	};
	// 	// // 	data=JSON.stringify(data);
	// 	// // 	mobileApp.openWebview(data);

	// 	// // }else{
	// 	// 	$(this).attr("href","photoAlbum.html"+window.location.search+"&campId="+campId+"&roleId="+roleId);
	// 	// // }
	// 	// event.stopPropagation();
	// });	




  })

  //获取身材对比数据
  function getCompareTOPicture(){
	// var campId=getParamByUrl("campId");
	// var roleId=getParamByUrl("roleId");
		var targetRoleId=getParamByUrl("targetRoleId");
		var campId=getParamByUrl("targetCampId");
		// alert(targetRoleId);
		// var finalUrl="";
		// if(getParamByUrl("roleId")!="false"){
		// 	var searchLink=removeParamByUrl("roleId");
		// 	var finalUrl=ajaxLink+"/v1/api/campCommon/compareTOPicture"+searchLink+"&roleId="+targetRoleId+"&campId="+campId;
		// }else{
		// 	var finalUrl=ajaxLink+"/v1/api/campCommon/compareTOPicture"+window.location.search+"&targetRoleId="+targetRoleId+"&campId="+campId;
		// }
		var finalUrl=ajaxLink+"/v1/api/campCommon/compareTOPicture"+window.location.search+"&targetRoleId="+targetRoleId+"&campId="+campId;
		// alert(finalUrl);
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					$(".container").css("display","block");
					$(".part-img-li").css("height",$(".part-img-li").width()*500/376);
					$(".bodyChange").css("height",$(".partLeft").height());
					if(data.resp.sex==0){
						var defaultFrontUrl = frontdefaultImg[0];
						var defaultSideUrl = sidedefaultImg[0];
					}else{
						var defaultFrontUrl = frontdefaultImg[1];
						var defaultSideUrl = sidedefaultImg[1];
					}
					console.log("success");
					if(data.resp.hasOwnProperty("campPictureFirst")){
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
						}else{}

						var deviceType=isMobile();//判断是不是app的方法
						if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
							$(".button3").unbind("click").click(function(){
								$(this).css("opacity","0.6");
								setMaiDian(SShenCaiDuiBi.SCategory_SShenCaiDuiBi,SShenCaiDuiBi.SShenCaiDuiBi_ChaKanTaDeXiangCe);
								var data={
									link:absoluteUrl+"photoAlbumTrainer.html"+window.location.search+"&targetRoleId="+targetRoleId,
								    animation: 1//默认1从右到左，2从下到上
								};
								data=JSON.stringify(data);
								mobileApp.openWebview(data);
							});
						}else{
							$(".button3").attr("href","photoAlbumTrainer.html"+window.location.search+"&targetRoleId="+targetRoleId);
						}
						event.stopPropagation();
					}else{
						$(".container").css("display","block");
						$(".buttons").hide();
						$(".bodyChange").hide();
						var sttr = '<div class="tishi" style="display:-webkit-box;-webkit-box-pack:center;-webkit-box-align:center;">'+
											'Ta还没上传过身材对比照片哦~'+
									'</div>';
						$(".container").append(sttr);
						$(".tishi").css("width",window.innerWidth);
						$(".tishi").css("height",window.innerHeight);
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

 function appNoShare(){
	var getPageInfo = function (){
		var data = {
			title:'Ta的身材',
			isShare:false,
			backgroundColor:'#2c2f31'
		};
		return JSON.stringify(data);
	};
	var deviceType=isMobile();
		if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		mobileApp.getShareInfo(getPageInfo());
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
			setMaiDian(SShenCaiDuiBi.SCategory_SShenCaiDuiBi,SShenCaiDuiBi.SShenCaiDuiBi_XianShiYuLanTu);
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动 
			var url = $(this).css("background-image");
			var deviceType6=isMobile();
			if(deviceType6 == "isApp" && (typeof mobileApp != "undefined")){
				var data={
					display:false
				}
				data=JSON.stringify(data);
				mobileApp.showTitle(data);
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
					mobileApp.showBackBtn(getPageInfo());
				}
			}

			$(".backall").css("height",$(window).height()+70);
			$(".backall").css("background-image",url);
			$(".backall").css("display","block");
			$("body").css("max-height",$(window).height());
			$("body").css("overflow","hidden");
			document.addEventListener('touchmove', function(event) {
				//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
				if($("body").css("overflow")=="hidden"){
					event.preventDefault();
				}
			})
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
				mobileApp.saveImg(getPageInfo());
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
				mobileApp.showTitle(data);
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
					mobileApp.showBackBtn(getPageInfo1());
				}
			}
			$(".backall").css("height","0");
			$(".backall").css("background-image","");
			$(".backall").css("display","none");
			$("body").css("overflow","auto"); 
			$("body").css("max-height","auto");
			document.addEventListener('touchmove', function(event) {
				//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
				if($("body").css("overflow")=="hidden"){
					event.preventDefault();
				}
			})
}
 // function rightBtnShow(){
 // 	if(getParamByUrl("os")=="android"){
	//  	var data={
	// 		rightImg: "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/share-right.png",//右上角图片
	// 		function:"getControl"//右上角点击后需要调的h5的方法名
	// 	};
 // 	}else{
	//  	var data={
	// 		rightImg: "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/share-right1.png",//右上角图片
	// 		function:"getControl"//右上角点击后需要调的h5的方法名
	// 	};
 // 	}

	// data=JSON.stringify(data);
	// var deviceType=isMobile();
	// if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
	// 	mobileApp.showRightBtn(data);
	// }
 // }
 // function getControl(){
	// window.location.href="figureContrastShare.html"+window.location.search;

 // }

 function hideIMG(){
			var deviceType6=isMobile();
			if(deviceType6 == "isApp" && (typeof mobileApp != "undefined")){
				var data={
					display:true
				}
				data=JSON.stringify(data);
				mobileApp.showTitle(data);
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
					mobileApp.showBackBtn(getPageInfo1());
				}
			}
			$(".backall").css("height","0");
			$(".backall").css("background-image","");
			$(".backall").css("display","none");
			$("body").css("overflow","auto"); 
			$("body").css("max-height","auto");
			document.addEventListener('touchmove', function(event) {
				//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
				if($("body").css("overflow")=="hidden"){
					event.preventDefault();
				}
			})
}