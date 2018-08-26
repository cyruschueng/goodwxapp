var pageIndex=2;
var deviceType=isMobile();
var os=getParamByUrl("os");
$(function(){
	//样式设置
	
	if( os == "android" ){
		$(".container").css("minHeight",$(window).height()-70);
	}else{
		$(".container").css("minHeight",$(window).height()-68);
	}
	/*$(".pic-item").height($(".pic-item").width());
	if($(".cardContainer").height() < $(window).height() ){
		var marginTop=($(window).height()-$(".cardContainer").height()-fontHeight*3.75)*0.4;
		$(".cardContainer").css("marginTop",marginTop);
	}*/
	

	getList();
	shareInfo();
	/*var shareHeight=shareInfo();
	alert(shareHeight);*/
	getLeftIcon();
	/*getList();
	shareInfo();*/
	/*getLeftIcon();*/

})

function getList(){
	loading();
	$(".msgType2 .list").html('');
	var finalUrl=ajaxLink+"/v1/api/camp/checkDetail"+window.location.search+"&type=1";
	// alert("测试："+finalUrl);
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				//打卡图片区域
				var cardImgs=data.resp.imgs;
				var imgsLength=cardImgs.length;
				var imgsHtml="";
				if(imgsLength > 0){
					for(var i=0;i<imgsLength;i++){
						/*if(imgsLength == 1){
							imgsHtml+='<div class="col-xs-12 col-sm-12 pic-item pic-item-left pic-item-right" style="background-image:url('+cardImgs[i].url+')"></div>';
						}else if(imgsLength % 2 == 0 && imgsLength != 6){
							if(i == 0){
								imgsHtml+='<div class="col-xs-6 col-sm-6 pic-item pic-item-left" style="background-image:url('+cardImgs[i].url+')"></div>';
							}else if(i == 1){
								imgsHtml+='<div class="col-xs-6 col-sm-6 pic-item pic-item-right" style="background-image:url('+cardImgs[i].url+')"></div>';
							}else{
								imgsHtml+='<div class="col-xs-6 col-sm-6 pic-item" style="background-image:url('+cardImgs[i].url+')"></div>';
							}
						}else{
							if(i == 0){
								imgsHtml+='<div class="col-xs-4 col-sm-4 pic-item pic-item-left" style="background-image:url('+cardImgs[i].url+')"></div>';
							}else if(i == 2){
								imgsHtml+='<div class="col-xs-4 col-sm-4 pic-item pic-item-right" style="background-image:url('+cardImgs[i].url+')"></div>';
							}else{
								imgsHtml+='<div class="col-xs-4 col-sm-4 pic-item" style="background-image:url('+cardImgs[i].url+')"></div>';
							}
						}*/
						
						/*if(imgsLength == 1 ){
							$(".pic-item").height($(".pic-item").width()*0.75);
						}else{
							$(".pic-item").height($(".pic-item").width());
						}*/
						if(i == 0){
							imgsHtml+='<div class="col-xs-12 col-sm-12 pic-item pic-item-left pic-item-right" style="background-image:url('+cardImgs[i].url+')"></div>';
						}else{
							imgsHtml+='<div class="col-xs-12 col-sm-12 pic-item" style="background-image:url('+cardImgs[i].url+')"></div>';
						}
						
						
					}
					$(".cardPic").html(imgsHtml);
					var picWidth=$(window).width()-parseInt(3*fontHeight);
					$(".pic-item").height(picWidth*0.75);
					/*$(".pic-item").height($(".pic-item").width()*0.75);*/
				}else{
					$(".cardPic").css("display","none");
					$(".cardTop").css("display","block");
				}

				//打卡用户个人信息区域
				if(data.resp.sex == 0){
					headerImg="'http://cdn2.picooc.com/web/res/sex0.png'";
				}else{
					headerImg="'http://cdn2.picooc.com/web/res/sex1.png'";
				}
				var userInfo='<img src="'+data.resp.roleImg+'" onerror="this.src='+headerImg+'"><div>'+data.resp.roleName+'</div>';
				$(".cardHeader").html(userInfo);

				stopLoading();
				$(".cardContainer").css("display","block");

				//打卡内容区域
				var cardInfo=data.resp.content;
				if(cardInfo == "" || cardInfo == null){
					$(".cardInfo").css("display","none");
					$(".cardHeader").css("backgroundColor","#00bfb3");
					$(".cardHeader").css("color","#fff");
					$(".cardHeader").children("div").addClass("shareLine");
				}else{
					$(".info-content").html(cardInfo);
					if($(".info-content").height() == fontHeight*2){
						$(".info-content").css("text-align","center");
					}
				}	

				//打卡时间，打卡类型
				var cardType=["早餐","午餐","晚餐","加餐","运动"];
				$(".cardType").text(cardType[data.resp.type]);
				$(".cardTime").text(data.resp.checkDay+" "+data.resp.checkTime);

				if($(".cardContainer").height() < (parseInt($(".container").css("minHeight")) - 3*fontHeight) ){
					var marginTop=( parseInt($(".container").css("minHeight")) -$(".cardContainer").height())*0.4;
					$(".cardContainer").css("marginTop",marginTop);
				}else{
					$(".cardContainer").css("marginTop","1.5rem");
					$(".cardContainer").css("marginBottom","1.5rem");
				}

				$(".cardContainer").css("display","block");
			}else{
				// alert("您好,该打卡已被删除!");
	            $(".error-main-t").html(data.result.message);
	            $(".errorAlert").css("display","block");
	            $(".error-main").css("margin-top",-$(".error-main").height()/2);
			}

		}
	})
}

function jumpToTarget(){
	var replyId=getParamByUrl("replyId");
	/*alert($("span[replyid = '"+replyId+"']").length == 1);
	alert(replyId);*/
	if(replyId != "false" && replyId != "" && replyId != null){
		/*$('html,body').scrollTop($("#"+mcid).offset().top-80);*/
		if($("span[replyid = '"+replyId+"']").length == 1){
			$('html,body').scrollTop($("span[replyid = '"+replyId+"']").offset().top);
		}else{
			// alert("该评论已被删除~");
            $(".error-main-t").html("该评论已被删除~");
            $(".errorAlert").css("display","block");
            $(".error-main").css("margin-top",-$(".error-main").height()/2);
		}
		
	}
}

//关闭webview
function closeWebview(){
    var getPageInfo = function (){
        var data = {
            backNum:0,//默认为1，
            closeWebview:1,//默认为0
        };
        return JSON.stringify(data);
    };
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

//设置左上角图标
function getLeftIcon(){
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
	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		if(getParamByUrl("os")=="android"){
			mobileApp.controlRight(getPageInfo2());
		}
		else{
			mobileApp.controlRight.postMessage(getPageInfo2());
		}
	}
}

/*//获得分享区域图标高度
function getShareHeight(height){
	alert("height:"+height);
}*/
