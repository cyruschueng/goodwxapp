var SXiaDanChengGong={
	SCategory_SXiaDanChengGong:5080600,
	SXiaDanChengGong_LiJiTianXieWenJuan:5080601//立即填写问卷
};
$(function(){
	appNoShare();

	  $(".toQuestion").unbind("click").click(function(){
		 $(this).css("opacity","0.6");
		  setMaiDian(SXiaDanChengGong.SCategory_SXiaDanChengGong,SXiaDanChengGong.SXiaDanChengGong_LiJiTianXieWenJuan);
		setCookie("toQuestionnaire","1",1);
		window.location.href="questionnaire.html"+window.location.search;
	  });

	//rightBtnShow();

	var deviceType=isMobile();
	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		// alert(getCookie("toOrderSuccess"));
		if(getCookie("toOrderSuccess") == "1"){  //如果是从订单列表支付
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
		}else if(getCookie("toOrderSuccess") == "2"){
			var getPageInfo = function (){  //如果是从订单详情支付
				var data = {
					/*iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
					backNum:2,
					closeWebview:0,//默认为0
					iconUrl:""*/
					iconType:1,
					iconColor:"",
					backNum:2,
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
		}else{              //如果是从确认订单支付
			// var getPageInfo = function (){
			// 	var data = {
			// 		iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
			// 		backNum:2,
			// 		closeWebview:0,//默认为0
			// 		iconUrl:""
			// 	};
			// 	return JSON.stringify(data);
			// };
			// mobileApp.showLeftBtn(getPageInfo());
			var getPageInfo = function (){
				var data = {
					/*iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
					backNum:0,
					closeWebview:1,//默认为0
					iconUrl:""*/
					iconType:1,
					iconColor:"",
					backNum:0,
					closeWebview:1,
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

	}


	var getPageInfo6 = function (){
		var data = {
			iconType:1,//0走图片逻辑，1走文案逻辑
			rightStr:{
				str:"查看",
				color:"",
				opacity:"",
				id:"0",
				type:"0",
				functionName:"getControl",
				redDotType:"1",
				redDotShow:false,
				redDotNum:"0",
				nativeType:"",
				content:""
			},
			rightIcon:[]
		};
		return JSON.stringify(data);
	};
	if(getParamByUrl("os")=="android"){
		mobileApp.controlRight(getPageInfo6());
	}
	else{
		window.webkit.messageHandlers.controlRight.postMessage(getPageInfo6());
	}




});

function appNoShare(){
	var getPageInfo = function (){
		var data = {
			title:"下单成功",
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
	document.documentElement.style.webkitTouchCallout='none';
}










function rightBtnShow(){
	var iconUrl = '';
	if(getParamByUrl("os")=="android"){
		iconUrl = "http://cdn2.picooc.com/web/res/fatburn/image/icon/right-an.png";
	}else{
		iconUrl = "http://cdn2.picooc.com/web/res/fatburn/image/icon/right-ios.png";
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
  var deviceType=isMobile();
  if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
	  if(getParamByUrl("os")=="android"){
		  mobileApp.controlRightInfo(getPageInfo());
	  }
	  else{
		  mobileApp.controlRightInfo.postMessage(getPageInfo());
	  }
	//mobileApp.showRightBtn(data);
  }

}
function getControl(){
   setCookiePath("toOrderDetails","2",1,"/;domain=picooc.com");
   // setCookie("toOrderDetails","2",1); //在cookie中存放跳转到订单详情页面的标识 2为从下单成功页面跳转的
   window.location.href = "orderDetails.html"+window.location.search;
}