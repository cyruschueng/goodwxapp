
var frontdefaultImg=["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-w.png","http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-m.png"];
var sidedefaultImg=["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-w.png","http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-m.png"];

var campId=getParamByUrl("campId");
var roleId=getParamByUrl("roleId");

$(function(){
	var deviceType=isMobile();
if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
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
	if(getParamByUrl("os")=="android"){
		mobileApp.controlLeft(getPageInfo());
	}
	else{
		mobileApp.controlLeft.postMessage(getPageInfo());
	}
	//mobileApp.showLeftBtn(getPageInfo());
}

	getCompareTOPicture();
	$(".part-img-li").css("height",$(".part-img-li").width()*500/376);
	$(".bodyChange").css("height",$(".partLeft").height());
	//样式调整
    $(".partTop").css("height",$(".partTop").width()*845/1242); 
    // $(".partRight-img-li2").css("height",$(".partRight-img-li2").width()*3/4);
    $(".headimg").css("height",$(".headimg").width()); 
    $(".line").css("height",$(".line").width()*7/527);
    $(".partBottom").css("height",$(".partBottom").width()*357/1242); 
    // $(".tag").css("height",$(".tag").width()*264/76);
    // $(".tag").css("top",$(".partTop").height()*500/510);
    $(".partTop-content").css("margin-top",$(".partTop").height()*110/510);


	//appNoShare();
	shareInfo();
	// var fontHeight=parseInt($("html").css("font-size"));
	// $(".info-t img").css("top",(2*fontHeight-0.8*fontHeight*33/29)/2);
	// if($(".partLeft-p3 span").width()>$(".partLeft-p1 span").width()){
	// 	$(".partLeft-p1").css("padding-left",($(".partLeft-p3 span").width()-$(".partLeft-p1 span").width())/2);
	// }
	// for(var i=0;i<$(".partLeft-p1 span").length;i++){
	// 	if($(".partLeft-p1 span").eq(i).width()>$(".partLeft-p2 span").eq(i).width()){
	// 		$(".partLeft-p2").eq(i).css("padding-left",parseInt($(".partLeft-p1").eq(0).css("padding-left"))+($(".partLeft-p1 span").eq(i).width()-$(".partLeft-p2 span").eq(i).width())/2);
	// 	}
	// }
    var now = new Date();
   
    // var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
   
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var checkDay ="";
    var checkTime = "";
    if(month < 10){
        month = "0"+month+"月";
    }else{
    	month = month+"月";
    }
    if(day < 10){
        day = "0"+day+"日";
    }else{
    	day = day+"日";
    }
       
    checkDay = month + day;
    if(hh < 10){
        hh = "0"+hh;
    }
    if (mm < 10){
    	mm = '0'+ mm;
    } ; 
    checkTime = hh+":"+mm; 
	$(".date").html(checkDay);
	$(".time").html(checkTime);
	//评论开始
getList();
function getList(){
	// alert("1");
	
	var finalUrl=ajaxLink+"/v1/api/campStu/getBodyChange"+window.location.search+"&targetRoleId="+roleId;
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){

					//用户昵称显示
					if(data.resp.title.name){
						$(".username").html(data.resp.title.name);
					}else{
						$(".username").html("");
					}
					//用户头像显示
					if(data.resp.title.head && data.resp.title.head!=""){
						$(".headimg").css('background','url('+data.resp.title.head+') no-repeat center center');
						$(".headimg").css('background-size','100% 100%');
					}else{
						$(".headimg").css('background','url('+arrHeadImg[data.resp.title.sex]+') no-repeat center center');
						$(".headimg").css('background-size','100% 100%');
					}

				// getCompareTOPicture();

			    // if(($(".container").height()+$(".partBottom").height())<window.innerHeight){
			    //   $(".partBottom").css("position","absolute");
			    //   $(".partBottom").css("left","0");
			    //   $(".partBottom").css("bottom","0");
			    // }else{}


			}
			else{
				// alert(data.message);
                    $(".error-main-t").html(data.message);
                    $(".errorAlert").css("display","block");
                    $(".error-main").css("margin-top",-$(".error-main").height()/2);
			}

		}
	})
}


//结束的反括号
})



//关闭webview
function closeWebview(){
    var getPageInfo = function (){
        var data = {
            backNum:1,//默认为1，
            closeWebview:0,//默认为0
        };
        return JSON.stringify(data);
    };
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		if(getParamByUrl("os")=="android"){
			mobileApp.deleteHistory(getPageInfo());
		}
		else{
			mobileApp.deleteHistory.postMessage(getPageInfo());
		}
        //mobileApp.deleteHistory(getPageInfo());
    }
    document.documentElement.style.webkitTouchCallout='none';
}

//截图分享
function shareInfo(){
    var getPageInfo = function (){
      var data = {
        title:'分享',
        /*backgroundColor:'#2c2f31',
        isShare:true,
        shareTitle:'有品·燃脂营',
        shareUrl:"",
        shareIcon:'',
        shareDesc:'#有品燃脂营，随时减脂有效塑形#@有品PICOOC',
        shareType:2,
        shareTypeDesc:""*/
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
	document.documentElement.style.webkitTouchCallout='none';

	//右上角
	var iconUrl = "";
	var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_share.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png"];
	if (getParamByUrl("os") == "android") {
		iconUrl = iconShare[0];
	}
	else {
		iconUrl = iconShare[1];
	}
	var getPageInfo2 = function (){
		var data5 = {
			iconType:0,//0走图片逻辑，1走文案逻辑
			rightStr:{
				str:"",
				color:"",
				opacity:"",
				id:"0"
			},
			rightIcon:[
				{
					type:"1",
					id:"1",
					functionName:"",
					iconUrl:iconUrl,
					iconName:"分享",
					redDotType:"1",
					redDotShow:false,
					redDotNum:"0",
					nativeType:"0",
					content:{
						shareTitle:'有品·燃脂营',
						shareUrl:"",
						shareIcon:"",
						shareDesc:'#有品燃脂营，随时减脂有效塑形#@有品PICOOC',
						shareTag:"",
						shareType:2,
						shareBackgroundColor:"",
						shareTypeDesc:"",
						fatBurnName:""
					}
				}]
		};
		return JSON.stringify(data5);
	};
	if(getParamByUrl("os")=="android"){
		mobileApp.controlRight(getPageInfo2());
	}
	else{
		mobileApp.controlRight.postMessage(getPageInfo2());
	}
}

function getCompareTOPicture(){
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

						// showBigImg();
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
						}else{isscale1 = "getImg-bg";}
						if(data.resp.campPictureFirst.facePicture=="" || data.resp.campPictureFirst.facePicture==null){
							data.resp.campPictureFirst.facePicture=defaultSideUrl;
							isscale2="";
						}else{isscale2 = "getImg-bg";}


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
						// showBigImg();
					}else{}


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
			$(".backall").css("height",$(window).height()+65);
			$(".backall").css("background-image",url);

		});
		//隐藏预览图
		$(".backall").unbind("click").click(function(){
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
			$(".backall").css("height","0");
			$(".backall").css("background-image","");

		});
}


