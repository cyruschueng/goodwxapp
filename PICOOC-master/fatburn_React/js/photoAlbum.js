var frontdefaultImg=["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-w.png","http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-m.png"];
var sidedefaultImg=["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-w.png","http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-m.png"];

var campId=getParamByUrl("campId");
var roleId=getParamByUrl("roleId");
var SWoDeXiangCe={
    SCategory_SWoDeXiangCe:5060900,
    SWoDeXiangCe_ShanChuZhaoPian:5060901,//删除照片
    SWoDeXiangCe_BianJiZhaoPian:5060902,//编辑照片
    SWoDeXiangCe_TiaoZhuanShangChuanZhaoPian:5060903,//跳转上传照片
    SWoDeXiangCe_TuPianYuLan:5060904,//图片预览
};
  $(function(){
	var deviceType8=isMobile();
	if(deviceType8 == "isApp" && (typeof mobileApp != "undefined")){

	}else{
		$(".test").css("display","block");
		$(".bianji").unbind("click").click(function(){
			$(".manage").show();
		});
		$(".wancheng").unbind("click").click(function(){
			$(".manage").hide();
		});
	}
  	appNoShare();
  	topleftBtn(); //左上角控制
	// $(".fixbg-main").css("width",$(window).width()-50);
	$(".upload").unbind("click").click(function(){
		$(this).css("opacity","0.6");
		console.log('点击');
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
		setMaiDian(SWoDeXiangCe.SCategory_SWoDeXiangCe,SWoDeXiangCe.SWoDeXiangCe_TiaoZhuanShangChuanZhaoPian);
	});
  	
  	//数据列表
	getPictureList();
	//右上角按钮显示
	rightBtnShow();


  })

  //获取我的相册照片
 function getPictureList(){
	// var campId=getParamByUrl("campId");
	// var roleId=getParamByUrl("roleId");

		var finalUrl=ajaxLink+"/v1/api/campStu/pictureList"+window.location.search+"&campId="+campId+"&roleId="+roleId;
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					// alert(JSON.stringify(data));
					if(data.resp.sex==0){
						var defaultFrontUrl = frontdefaultImg[0];
						var defaultSideUrl = sidedefaultImg[0];
					}else{
						var defaultFrontUrl = frontdefaultImg[1];
						var defaultSideUrl = sidedefaultImg[1];
					}
					console.log("success");
					if(data.resp.data.length>0){
						var str="";
						var isscale1="getImg-bg";
						var isscale2="getImg-bg";
						for(i=0;i<data.resp.data.length;i++){
							if(data.resp.data[i].frontPicture=="" || data.resp.data[i].frontPicture==null){
								data.resp.data[i].frontPicture=defaultFrontUrl;
								isscale1="";
							}else{isscale1="getImg-bg";}
							if(data.resp.data[i].facePicture=="" || data.resp.data[i].facePicture==null){
								data.resp.data[i].facePicture=defaultSideUrl;
								isscale2="";
							}else{isscale2="getImg-bg";}
							if(data.resp.data[i].weight==null || data.resp.data[i].weight==""){
								data.resp.data[i].weight="--";
							}
							if(data.resp.data[i].fat==null || data.resp.data[i].fat==""){
								data.resp.data[i].fat="--";
							}
							if(data.resp.data[i].waistMeasure==null || data.resp.data[i].waistMeasure==""){
								data.resp.data[i].waistMeasure="--";
							}
							str+='<aside class="row page1 msgType1" campPictureId='+data.resp.data[i].id+'>'+

									'<article class="row list">'+
										'<aside class="row part ">'+
										  '<div class="col-xs-2 col-sm-2 partLeft2">'+
										    '<div class="row">'+
										      '<div class="col-xs-12 col-sm-12 partLeft-p1">'+
										        '<span>DAY</span></div>'+
										      '<div class="col-xs-12 col-sm-12 partLeft-p2">'+
										        '<span>'+data.resp.data[i].day+'</span></div>'+
										      '<div class="col-xs-12 col-sm-12 partLeft-p3">'+
										        '<span>'+data.resp.data[i].time+'</span></div>'+
										    '</div>'+
										  '</div>'+
										  '<div class="col-xs-12 col-sm-12 partRight" part="2">'+
										  	'<div class="content"><span class="" style="width:35%;">体重:<span class="weight">'+data.resp.data[i].weight+'KG</span></span><span class="" style="width:30%;">脂肪:<span class="fat">'+data.resp.data[i].fat+'%</span></span><span class="" style="width:35%;">腰围:<span class="waistline">'+data.resp.data[i].waistMeasure+'CM</span></span></div>'+
										    '<div class="row ">'+
										      '<div class="col-xs-6 col-sm-6 partRight-img">'+
										        '<div class="col-xs-12 col-sm-12 partRight-img-li partRight-img-li2 '+isscale1+'" objimg="img2" objimgindex="0" style="background-image: url('+data.resp.data[i].frontPicture+');"></div>'+
										      '</div>'+
										      '<div class="col-xs-6 col-sm-6 partRight-img">'+
										        '<div class="col-xs-12 col-sm-12 partRight-img-li partRight-img-li2 '+isscale2+'" objimg="img2" objimgindex="0" style="background-image: url('+data.resp.data[i].facePicture+');"></div>'+
										      '</div>'+
										    '</div>'+
										  '</div>'+
										'</aside>'+
									'</article>'+
									'<div class="manage"><a class="edit" campPictureId='+data.resp.data[i].id+' day='+data.resp.data[i].day+' waistMeasure='+data.resp.data[i].waistMeasure+' fat='+data.resp.data[i].fat+' weight='+data.resp.data[i].weight+' facePicture='+data.resp.data[i].facePicture+' frontPicture='+data.resp.data[i].frontPicture+' datetime='+data.resp.data[i].time+' campPictureId='+data.resp.data[i].id+'></a><span class="del" datetime='+data.resp.data[i].time+' campPictureId='+data.resp.data[i].id+' waistMeasureId='+data.resp.data[i].waistMeasureId+' createTime='+data.resp.data[i].createTime+' waistMeasure='+data.resp.data[i].waistMeasure+'></span></div>'+
								'</aside>'


						}
						$(".msg").append(str);

						$(".partRight-img-li2").css("height",$(".partRight-img-li2").width()*366/275);
						//part左边距离
						
						for(var i=0;i<$(".partLeft-p1 span").length;i++){
							if($(".partLeft-p1 span").eq(i).width()>$(".partLeft-p2 span").eq(i).width()){
								if($(".partLeft-p3 span").width()>$(".partLeft-p1 span").width()){
									$(".partLeft-p1").css("padding-left",($(".partLeft-p3 span").width()-$(".partLeft-p1 span").width())/2);
								}
								else{
									$(".partLeft-p3").css("padding-left",($(".partLeft-p1 span").width()-$(".partLeft-p3 span").width())/2);
								}
								$(".partLeft-p2").eq(i).css("padding-left",parseInt($(".partLeft-p1").eq(0).css("padding-left"))+($(".partLeft-p1 span").eq(i).width()-$(".partLeft-p2 span").eq(i).width())/2-1);
							}
							else{
								$(".partLeft-p1").eq(i).css("padding-left",($(".partLeft-p2 span").eq(i).width()-$(".partLeft-p1 span").eq(i).width())/2);
								$(".partLeft-p3").eq(i).css("padding-left",($(".partLeft-p2 span").eq(i).width()-$(".partLeft-p3 span").eq(i).width())/2);
							}
						}
						//底部上传按钮位置
						// $(".upload").css("display","inline-block");
						// var height = $(".container").height()+$(".upload").height()+60;
						// if(height<= window.innerHeight){
						// $(".upload").css({"position": "fixed","left":"8%","bottom":"30px"});
						// }else{
						// $(".upload").css("margin","30px 8%");
						// }
						$(".msg").css("margin-bottom",$(".upload-container").height());
						//显示预览图
						$(".getImg-bg").unbind("click").click(function(){
							//event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
							var url = $(this).css("background-image");
							$(".backall").css("height",$(window).height()+70);
							$(".backall").css("background-image",url);
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
							//$(".backall").css("height",window.innerHeight+70);
							//$(".backall").css("background-image",url);
							var t1=setTimeout(function(){
								$("body").css("max-height",$(window).height());
								$("body").css("overflow","hidden");
								$(".backall").css("display","block");
								document.addEventListener('touchmove', function(event) {
									//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
									if($("body").css("overflow")=="hidden"){
										event.preventDefault();
									}
								})
							},200);

							setMaiDian(SWoDeXiangCe.SCategory_SWoDeXiangCe,SWoDeXiangCe.SWoDeXiangCe_TuPianYuLan);
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

						//删除图片
						var len = $(".msgType1").length;
						$(".manage .del").unbind("click").click(function(){
							$(".fixbg").css("display","block");
							$(".fixbg-main").css("margin-top",-$(".fixbg-main").height()/2);
							$(".deltime").html($(this).attr("datetime"));
							var campPictureId = $(this).attr("campPictureId");
							var createTime = $(this).attr("createTime");
							var waistMeasureId = $(this).attr("waistMeasureId");
							
							var waistMeasure = $(this).attr("waistMeasure");
							if(waistMeasure=="--"){
								waistMeasure=0;
							}
							$(".fixbg-main-btn1").unbind("click").click(function(){
							$(".fixbg").css("display","none");
							
							});
							$(".fixbg-main-btn2").unbind("click").click(function(){
								
								var finalUrl=ajaxLink+"/v1/api/campStu/deletePicture"+window.location.search+"&campPictureId="+campPictureId;
								$.ajax({
									type:"get",
									url:finalUrl,
									dataType:"json",
									success:function(data){
										if(data.code == 200){
											// var id = $('[campPictureId='+campPictureId+']').attr("campPictureId");	
											$('[campPictureId='+campPictureId+']').hide();
											
											if(waistMeasureId!=null && waistMeasureId!=""){
												var getPageInfo9 = function (){
													var param = {
														roleId:roleId,
														serverId:waistMeasureId,
														girthNum:0,
														time:data.resp.operateTrime,
														// isDelete:true,  //删除体围标识，true是，false否
													};
													return JSON.stringify(param);
												};
												// alert(getPageInfo9());
												var deviceType=isMobile();
												if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
													mobileApp.changeGirth(getPageInfo9());
												}	
											}

											len--;

											if(len==1 || len==0){
												// alert(2);
												// alert(getCookie("toPhoto"));
												if(getCookie("toPhoto")==0){
													// alert(3);
													var getPageInfo = function (){
														var data = {
															iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
															backNum:2,//1为正常后退，
															closeWebview:0,//默认为0
															iconUrl:""
														};
														return JSON.stringify(data);
													};
													var deviceType=isMobile();
													if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
														mobileApp.showLeftBtn(getPageInfo());
													}
												}else{
													var getPageInfo = function (){
														var data = {
															iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
															backNum:1,//1为正常后退，
															closeWebview:0,//默认为0
															iconUrl:""
														};
														return JSON.stringify(data);
													};
													var deviceType=isMobile();
													if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
														mobileApp.showLeftBtn(getPageInfo());
													}
												}
											}
										}
										else{
											$(".error-main-t").html(data.result.message);
											$(".errorAlert").css("display","block");
											$(".error-main").css("margin-top",-$(".fixbg-main").height()/2);
											// alert(data.result.message);
										}
									}
								})
								
								$(".fixbg").css("display","none");
							});
							console.log('del点击触发了');
							setMaiDian(SWoDeXiangCe.SCategory_SWoDeXiangCe,SWoDeXiangCe.SWoDeXiangCe_ShanChuZhaoPian);
						});
						//编辑图片
						$(".manage .edit").unbind("click").click(function(){

							var campPictureId = $(this).attr("campPictureId");
							// var deviceType=isMobile();//判断是不是app的方法
							// if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
					

							// 		console.log('edit点击触发了');
							// 		var data={
							// 			// link:absoluteUrl+"editPhoto.html"+window.location.search+"&campId="+campId+"&roleId="+roleId+"&day="+day+"&time="+time+"&waistMeasure="+waistMeasure+"&weight="+weight+"&fat="+fat+"&facePicture="+facePicture+"&frontPicture="+frontPicture,
							// 		    link:absoluteUrl+"editPhoto.html"+window.location.search+"&imgId="+campPictureId,
							// 		    animation: 2//默认1从右到左，2从下到上
							// 		};
							// 		data=JSON.stringify(data);
							// 		// alert(data);
							// 		mobileApp.openWebview(data);
								
							// }else{
								// alert(campPictureId);
								if(getParamByUrl("imgId")!="false"){
									var searchLink=removeParamByUrl("imgId");
									window.location.href="editPhoto.html"+searchLink+"&imgId="+campPictureId;
								}
								else{
									window.location.href="editPhoto.html"+window.location.search+"&imgId="+campPictureId;	
								}

							// }
							event.stopPropagation();
							setMaiDian(SWoDeXiangCe.SCategory_SWoDeXiangCe,SWoDeXiangCe.SWoDeXiangCe_BianJiZhaoPian);
						});
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

 function rightBtnShow(){
 	if(getParamByUrl("os")=="android"){
 		if(getParamByUrl('webver')!="false" && getParamByUrl('webver')>1){
 			var data={
				rightImg: "http://cdn2.picooc.com/web/res/fatburn/image/icon/right6-an.png",//右上角图片
				function:"getControl"//右上角点击后需要调的h5的方法名
			};
 		}
 		else{
 			var data={
				rightImg: "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/right6-an.png",//右上角图片
				function:"getControl"//右上角点击后需要调的h5的方法名
			};
 		}
 	}else{
 		if(getParamByUrl('webver')!="false" && getParamByUrl('webver')>1){
 			var data={
				rightImg: "http://cdn2.picooc.com/web/res/fatburn/image/icon/right5-ios.png",//右上角图片
				function:"getControl"//右上角点击后需要调的h5的方法名
			};
 		}
 		else{
 			var data={
				rightImg: "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/right5-ios.png",//右上角图片
				function:"getControl"//右上角点击后需要调的h5的方法名
			};
 		}
	 	
 	}

	data=JSON.stringify(data);
	var deviceType=isMobile();
	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		mobileApp.showRightBtn(data);
	}
	
 }
 function getControl(){
 	$(".manage").show();
 	if(getParamByUrl("os")=="android"){
 		if(getParamByUrl('webver')!="false" && getParamByUrl('webver')>1){
 			var data={
				rightImg: "http://cdn2.picooc.com/web/res/fatburn/image/icon/complete.png",//右上角图片
				function:"controlOver"//右上角点击后需要调的h5的方法名
			};
 		}
 		else{
 			var data={
				rightImg: "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/complete.png",//右上角图片
				function:"controlOver"//右上角点击后需要调的h5的方法名
			};
 		}
 	}else{
 		if(getParamByUrl('webver')!="false" && getParamByUrl('webver')>1){
 			var data={
				rightImg: "http://cdn2.picooc.com/web/res/fatburn/image/icon/right7-ios.png",//右上角图片
				function:"controlOver"//右上角点击后需要调的h5的方法名
			};
 		}
 		else{
 			var data={
				rightImg: "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/right7-ios.png",//右上角图片
				function:"controlOver"//右上角点击后需要调的h5的方法名
			};
 		}
 	}

	data=JSON.stringify(data);
	var deviceType=isMobile();
	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		mobileApp.showRightBtn(data);
	}
	

 }

//管理完成
function controlOver(){
	$(".manage").hide();
	rightBtnShow();
}

 function appNoShare(){
	var getPageInfo1 = function (){
		var data = {
			title:'我的相册',
			isShare:false,
			backgroundColor:'#2c2f31'
		};
		return JSON.stringify(data);
	};
	var deviceType=isMobile();
		if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		mobileApp.getShareInfo(getPageInfo1());
	}
	/*mobileApp.getShareInfo(getPageInfo());*/
	document.documentElement.style.webkitTouchCallout='none';
}

//左上角返回控制
function topleftBtn(){
	var deviceType=isMobile();
	// var storage = window.localStorage;
	// var loadtourl = storage.getItem("loadtourl");
	var loadtourl = getCookie("loadtourl");
	if(loadtourl && loadtourl==0){
		// alert(loadtourl);
		if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
			var getPageInfo = function (){
				var data = {
					iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
					backNum:2,//1为正常后退，
					closeWebview:0,//默认为0
					iconUrl:""
				};
				return JSON.stringify(data);
			};
			mobileApp.showLeftBtn(getPageInfo());
		}
	}else{
		if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
		var getPageInfo = function (){
			var data = {
				iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
				backNum:1,//1为正常后退，
				closeWebview:0,//默认为0
				iconUrl:""
			};
			return JSON.stringify(data);
		};
		mobileApp.showLeftBtn(getPageInfo());
		}
	}
}

function hideIMG(){
		var deviceType7=isMobile();
		if(deviceType7 == "isApp" && (typeof mobileApp != "undefined")){
			var data={
				display:true
			}
			data=JSON.stringify(data);
			mobileApp.showTitle(data);
		};
		
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
		/*$(".backall").css("height","0");
		$(".backall").css("background-image","");*/
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

function hideBigImg(){
		//隐藏预览图
			var deviceType7=isMobile();
			if(deviceType7 == "isApp" && (typeof mobileApp != "undefined")){
				var data={
					display:true
				}
				data=JSON.stringify(data);
				mobileApp.showTitle(data);
			};
			
			if(getParamByUrl("os")=="android"){
				var getPageInfo = function (){
					var data = {
						controlBtn:false,
						function:""
					};
					return JSON.stringify(data);
				};
			   if(deviceType7 == "isApp" && (typeof mobileApp != "undefined")){
				mobileApp.showBackBtn(getPageInfo());
			   };
			}
			/*$(".backall").css("height","0");
			$(".backall").css("background-image","");*/
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