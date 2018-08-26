var PubSub = require("pubsub-js");
var Fc_bindBigImg={};
var windowW=$(window).width();
var windowH=$(window).height();
var mySwiper;
var t1;
var saveLink;
var closeImgBtn=true;//防止连续点击

//保存图片
var timeout;

var timeBtn;
var startX;
var startY;
var moveEndX;
var moveEndY;
//绑定图片预览方法
// 将参数存到publicData.objImg下面，设置window.publicData=publicData;
// 参数格式类似于
// objImg={
// 		img0:[url0,url1,url2,url3,url4],
// 		img1:[url0,url1,url2,url3,url4],
// 		img2:[url0,url1,url2,url3,url4],
// 		img3:[url0,url1,url2,url3,url4]
// }
// 在小图上绑定data-obj_img=img0属性，小图点击绑定bindBigImg事件

window.commentDisplayBtn=false;
Fc_bindBigImg.bindBigImg=function(event){//publicData.objImg为图片预览对象
		if($(".comment2").css("display")=="block" || commentDisplayBtn){
			$("#comment-msg").blur();
			commentDisplayBtn=false;
		}
		else{
			timeBtn=true;
			//setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_YuLanTuPian);
			var bigImgNameData=event.currentTarget.getAttribute("data-obj_img");
			var swiperIndex=event.currentTarget.getAttribute("data-obj_img_index");
			var bigImgData=publicData.objImg[bigImgNameData];

			PubSub.publish("bigImgData",bigImgData);
			if($(".page1").css("display") == "block"){
				$(".setcard-img").css("display","none");
			}
			$(".comment").css("display","none");
			$("#comment-msg").blur();
			
			$(".getImg-bg").css("height",$(".getImg-bg").width());
			//设置宽高
			$(".bigImg-li").css("width",windowW);
			if(getParamByUrl("os")=="android"){
				$(".bigImg-li").css("height",windowH+70);
			}
			else{
				$(".bigImg-li").css("height",windowH+64);
			}

			//隐藏title
			var data={
				display:false
			}
			data=JSON.stringify(data);
			appFc.showTitle(data);
			
			
			//控制安卓返回键
			var getPageInfo = function (){
				var data = {
					controlBtn:true,
					function:"closeBigImg"
				};
				return JSON.stringify(data);
			};
			appFc.showBackBtn(getPageInfo());
			t1=setTimeout(function(){
				$("body").css("max-height",$(window).height());
				$("body").css("overflow","hidden");
				
				$(".swiper-container").css("width",$(window).width());
				$(".swiper-wrapper").css("width",$(window).width());
				$(".bigImg-li").css("width",$(window).width());
				$(".bigImg").css("display","block");
				document.addEventListener('touchmove', function(event) {
					//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
					if($("body").css("overflow")=="hidden"){
						event.preventDefault();
					}
				});
				if(publicData.objImg[bigImgNameData].length==1){
					mySwiper = new Swiper('.swiper-container-bigImg', {
					});
					console.log(mySwiper);
				}
				else{
					mySwiper = new Swiper('.swiper-container-bigImg', {
						pagination : '.swiper-pagination-bigImg',
					    spaceBetween: 1,
						centeredSlides: true,
						initialSlide :swiperIndex
					});
					console.log(mySwiper);
				}
			},200);
		}
}
Fc_bindBigImg.imgTouchStart=function(event){
	console.log(event);

	clearTimeout(timeout);
	timeout="";
	startX = event.changedTouches[0].pageX,
	startY = event.changedTouches[0].pageY;
	//startX = event.originalEvent.changedTouches[0].pageX,
	//startY = event.originalEvent.changedTouches[0].pageY;
    var x=event.currentTarget.getAttribute("data-index");
    console.log(event.currentTarget.getAttribute("data-index"));
    saveLink=$(event.currentTarget).css("background-image").split("\(")[1].split("\)")[0];
    console.log(saveLink);

    console.log($(".bigImg").css("display"));
    console.log("setTimeout1");
    timeout = setTimeout(function(){
    	if($(".bigImg").css("display")=="block"){
    		console.log("setTimeout2");
    		$(".saveImg-ceng").css("height",$(window).height());
        	$(".saveImg-ceng").css("display","block");
        	timeBtn=false;
        }
        clearTimeout(timeout);
    }, 800);
	event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动 
}
Fc_bindBigImg.imgTouchMove=function(event){
	
	if($(".saveImg-ceng").css("display")=="block"){
		//$(".saveImg-ceng").css("display","none");
		clearTimeout(timeout);
		timeBtn=false;
	}
	else{
		moveEndX = event.changedTouches[0].pageX;
		moveEndY = event.changedTouches[0].pageY;
		var moveX;
		var moveY;
		moveX=moveEndX-startX;
		moveY=moveEndY-startY;
		console.log(moveX+"|"+moveY);
		if(moveX<-50 || moveX>50 || moveY<-50 || moveY>50){
			clearTimeout(timeout);
			timeBtn=false;
		}
	}
	event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
}
Fc_bindBigImg.imgTouchEnd=function(event){
	//clearTimeout(timeout);
	moveEndX = event.changedTouches[0].pageX;
	moveEndY = event.changedTouches[0].pageY;
	var moveX;
	var moveY;
	moveX=moveEndX-startX;
	moveY=moveEndY-startY;
	
	if(moveX<-20 || moveX>20 || moveY<-20 || moveY>20){
		console.log("clearTimeout执行");
		clearTimeout(timeout);
		timeBtn=false;
	}
	clearTimeout(timeout);
	console.log("timeBtn:"+timeBtn);
	console.log(timeout);
	if(timeBtn){
		closeBigImg();
	}
	timeBtn=true;
	event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
}
Fc_bindBigImg.saveImgBtnTouchStart=function(){
	event.stopPropagation();
	event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
	var deviceType=isMobile();//判断是不是app的方法
	/*alert(saveLink);
	saveLink=JSON.stringify(saveLink);
	console.log(typeof saveLink);
	console.log(saveLink);*/
	var getPageInfo = function (){
		var data = {
			url:saveLink
		};
		return JSON.stringify(data);
	};
	appFc.saveImg(getPageInfo());
	$(".saveImg-ceng").css("display","none");
	//$(".saveImg-btn").unbind("touchstart");
}
Fc_bindBigImg.cancelImgBtnTouchStart=function(){
	event.stopPropagation();
	event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动 
	$(".saveImg-ceng").css("display","none");
}
Fc_bindBigImg.saveImgCengTouchStart=function(){
	$(".saveImg-ceng").css("display","none");
	event.stopPropagation();
	event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
}
//关闭图片预览
function closeBigImg(){
	if(closeImgBtn){
		closeImgBtn=false;

		var data={
			display:true
		}
		data=JSON.stringify(data);
		appFc.showTitle(data);
		//关闭返回键控制
		
		var getPageInfo = function (){
			var data = {
				controlBtn:false,
				function:""
			};
			return JSON.stringify(data);
		};
		appFc.showBackBtn(getPageInfo());
		
		var t2=setTimeout(function(){
			$("body").css("overflow","auto"); 
			//$("body").css("max-height","auto");
			$("body").removeAttr("style");
			$(".bigImg").css("display","none");
			if($(".page1").css("display") == "block"){
				$(".setcard-img").css("display","block");
			}
			$(".saveImg-ceng").css("display","none");
			document.addEventListener('touchmove', function(event) {
				//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
				if($("body").css("overflow")=="hidden"){
					event.preventDefault();
				}
			})
			clearTimeout(t1);
			clearTimeout(t2);
			console.log(mySwiper);

			//mySwiper.slideTo(0,1000,false);
			//$(".swiper-pagination").html('');
			// if(mySwiper && mySwiper.params && mySwiper.params.slideTo){
			// 	mySwiper.slideTo(0,1000,false);
			// }
			// if(mySwiper && mySwiper.detachEvents){
			// 	mySwiper.destroy(true);
			// }
			// var bigImgData=[];
			// PubSub.publish("bigImgData",bigImgData);
			try{
				mySwiper.slideTo(0,1000,false);
				mySwiper.destroy(true);
				console.log("mySwiper摧毁");
			}
			catch(err)
			{
				var bigImgData=[];
				PubSub.publish("bigImgData",bigImgData);
				console.log("mySwiper错误");
			}
			closeImgBtn=true;
		},200);
	}
	//mySwiper.update();
	//$(".bigImg-main").css("transform","translate3d(0px, 0px, 0px)");
	event.stopPropagation();
}

module.exports = Fc_bindBigImg; 