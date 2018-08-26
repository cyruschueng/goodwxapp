var React=require("react");


var Student_otherInfo=React.createClass({
	render:function (){
		return (
			<aside className="row">
				<Student_otherInfo_prompt />
				<Student_otherInfo_notify />
			</aside>
		);
	}
})
// var Student_otherInfo_prompt=React.createClass({
// 	render:function (){
// 		//删除打卡
// 		return (
// 			<aside className="row fixbg">
// 				<div className="col-xs-12 col-sm-12 fixbg-main">
// 					<div className="row">
// 						<div className="col-xs-12 col-sm-12 fixbg-main-t">您确定删除这条评论吗？</div>
// 						<div className="col-xs-12 col-sm-12 fixbg-main-btn">
// 							<div className="row">
// 								<div className="col-xs-6 col-sm-6 fixbg-main-btn1">取消</div>
// 								<div className="col-xs-6 col-sm-6 fixbg-main-btn2">确定</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</aside>
// 		);
// 	}
// })

var Student_otherInfo_prompt=React.createClass({
	render:function (){
		//新版本不调用
		return (
			<aside className="row prompt-back">
				<div className="col-xs-12 col-sm-12 prompt-main">
					<div className="row">
						<img className="del" src="image/figureContrast/no.png" />
					</div>
					<div className="row prompt-main-p">
						<p>填写有品燃脂营《满意度调查问卷》</p>
						<p>领取300元续营优惠券</p>
					</div>
					<div className="row">
						<img className="questionBack" src="image/student/wenjuan.png" />
					</div>
					<div className="row">
						<a className="button">立即填写</a>
					</div>
				</div>
				
			</aside>
		);
	}
})
var isCheckNotify = false;
var Student_otherInfo_notify=React.createClass({
	getInitialState:function(){
		window.notifyHidden=this.notifyHidden;
		leftControl(false);
		var statu=0;
		//if(getCookie("setCardL") && getCookie("setCardL")=="1" && getCookie("cardShareNotify")!="0"){
		if(getParamByUrl("os")=="android"){
			if(getCookie("setCardL") && getCookie("setCardL")=="1" && getCookie("cardShareNotify")!="0"){
				rightBtnHidden();
				leftControl(true);
				$("body").css("overflowY","hidden");
				var theDevice=getParamByUrl("os");
				if(theDevice == "android"){
					backControl(true,"notifyHidden");
				}
				//console.log("setCardL0");
				statu=1;
			}
			else{
				statu=0;
			}
		}
		else{
			//alert(localStorage.getItem("setCardL"));
			//alert(localStorage.getItem("cardShareNotify"));
			//alert(localStorage.getItem("cardShareNotify")!="0");
			if(localStorage.getItem("setCardL") && localStorage.getItem("setCardL")=="1" && localStorage.getItem("cardShareNotify")!="0"){
				rightBtnHidden();
				leftControl(true);
				$("body").css("overflowY","hidden");
				statu=1;
			}
			else{
				statu=0;
			}
		}
		
		return {
			strStatu:statu
		}
	},
	notifyClick:function(event){
		event.stopPropagation();
		if(!isCheckNotify){
			$(event.currentTarget).find("img").attr("src","image/student/check4.png");
			setCookie("cardShareNotify","0",100);
			if(getParamByUrl("os")=="iOS"){
				localStorage.setItem("cardShareNotify","0");
			}
			isCheckNotify=true;
		}else{
			$(event.currentTarget).find("img").attr("src","image/student/check3.png");
			setCookie("cardShareNotify","1",100);
			if(getParamByUrl("os")=="iOS"){
				localStorage.setItem("cardShareNotify","1");
			}
			isCheckNotify=false;
		}
	},
	shareClick:function(event){
		this.notifyHidden(event);
		var setCardLId = "";
		if(getParamByUrl("os")=="iOS"){
			setCardLId = localStorage.getItem("setCardId");
		}
		else{
			setCardLId = getCookie("setCardId");
		}
		var deviceType=isMobile();//判断是不是app的方法
		if(deviceType == "isApp" && (getParamByUrl("testtype")!="tanchao")){

			var data={
				//link:absoluteUrl+"infoShare.html"+window.location.search+"&checkId="+setCardLId,
				link:absoluteUrl+"cardShare.html"+window.location.search+"&checkId="+setCardLId,
				animation: 2//默认1从右到左，2从下到上
			};
			data=JSON.stringify(data);
			appFc.openWebview(data);
		
		}
		else{
			//window.location.href="infoShare.html"+window.location.search+"&checkId="+setCardLId;
			window.location.href="cardShare.html"+window.location.search+"&checkId="+setCardLId;
		}
		event.stopPropagation();
	},
	notifyHidden:function(event){
		// 隐藏弹出层
		setCookie("setCardL","0",1);
		if(getParamByUrl("os")=="iOS"){
			localStorage.setItem("setCardL","0");
		}
		$(".fixbg-notify").css("display","none");
		//$('body').unbind("touchmove");
		$("body").css("overflowY","auto");
		getMessage("getEntrance");
		leftControl(false);
		var theDevice=getParamByUrl("os");
		if(theDevice == "android"){
			backControl(false,"");
		}

	},
	render:function (){
		var objStr=<i></i>;
		if(this.state.strStatu==1){
			return (<aside className="row fixbg-notify" style={{"display":"block"}}>
						<div className="col-xs-12 col-sm-12 fixbg-main-notify" style={{"marginTop":-5*fontHeight}}>
							<div className="row">
								<div className="col-xs-12 col-sm-12 fixbg-main-t-notify">是否同步分享给好友？</div>
								<div className="col-xs-12 col-sm-12 fixbg-main-n-notify" onClick={this.notifyClick} >
									<img id="notify" src="image/student/check3.png" />不再提醒
								</div>
								<div className="col-xs-12 col-sm-12 fixbg-main-btn-notify">
									<div className="row">
										<div className="col-xs-6 col-sm-6 fixbg-main-btn1-notify" onClick={this.notifyHidden}>取消</div>
										<div className="col-xs-6 col-sm-6 fixbg-main-btn2-notify" onClick={this.shareClick}>去分享</div>
									</div>
								</div>
							</div>
						</div>
				</aside>
			)
		}
		else{
			this.notifyHidden();
			return (<i></i>);
		}
		
	}
})
// var Student_otherInfo_version=React.createClass({
// 	getInitialState:function(){
// 		var versionDisplay="none";
// 		var myDate = new Date();
// 		if(getCookie("nowDayL")!=(myDate.toLocaleDateString()) || getCookie("nowDayL")==""){
// 			if(getParamByUrl('os')=='iOS'){
// 				if(getParamByUrl('webver') > 1){   //版本正常
// 					$("body").css("overflow","auto"); 
// 					$("body").css("max-height","auto");
// 				}else{ //版本过低
// 						versionDisplay="block";
// 						var t1=setTimeout(function(){
// 							$("body").css("max-height",$(window).height());
// 							$("body").css("overflow","hidden");
// 							clearTimeout(t1);
// 						},200);
// 				}
// 			}
			
// 		}
		
// 		setCookie("nowDayL",myDate.toLocaleDateString(),1);
// 		return {display:versionDisplay}
// 	},
// 	btnClick:function(){
// 		event.stopPropagation();
// 		$("body").css("overflow","auto"); 
// 		$("body").css("max-height","auto");
// 		$(".fixbg-version").css("display","none");
// 	},
// 	btnClick2:function(){
// 		window.location.href = 'https://itunes.apple.com/us/app/picooc/id729928969?mt=8';
// 		event.stopPropagation();
// 	},
// 	render:function (){
// 		return (
// 			<aside className="row fixbg-version">
// 				<div className="col-xs-12 col-sm-12 fixbg-main-version">
// 					<div className="row">
// 						<div className="col-xs-12 col-sm-12 fixbg-main-t-version">请您更新至最新版本，即可享受更优质、稳定服务</div>
// 						<div className="col-xs-12 col-sm-12 fixbg-main-btn-version">
// 							<div className="row">
// 								<div className="col-xs-6 col-sm-6 fixbg-main-btn1-version" onClick={this.btnClick}>暂不更新</div>
// 								<div className="col-xs-6 col-sm-6 fixbg-main-btn2-version" onClick={this.btnClick2}>立即更新</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</aside>
// 		);
// 	}
// })
// var Student_otherInfo_version2=React.createClass({
// 	getInitialState:function(){
// 		var versionDisplay="none";
// 		var myDate = new Date();
// 		if(getCookie("nowDayL")!=(myDate.toLocaleDateString()) || getCookie("nowDayL")==""){
// 			if(getParamByUrl('os')=='android'){
// 				if(getParamByUrl('webver') > 1){   //版本正常
// 					$("body").css("overflow","auto"); 
// 					$("body").css("max-height","auto");
// 				}else{ //版本过低
// 						versionDisplay="block";
						
// 						var t1=setTimeout(function(){
// 							$("body").css("max-height",$(window).height());
// 							$("body").css("overflow","hidden");
// 							clearTimeout(t1);
// 						},200);
// 				}
// 			}
// 		}
// 		setCookie("nowDayL",myDate.toLocaleDateString(),1);
		
// 		return {
// 			display:versionDisplay
// 		}
// 	},
// 	btnClick:function(){
// 		$("body").css("overflow","auto"); 
// 		$("body").css("max-height","auto");
// 		$(".fixbg-version2").css("display","none");
// 		event.stopPropagation();
// 	},
// 	render:function (){

// 		return (
// 			<aside className="row fixbg-version2" style={{display:this.state.display}}>
// 				<div className="col-xs-12 col-sm-12 fixbg-main-version2" >
// 					<div className="row">
// 						<div className="col-xs-12 col-sm-12 fixbg-main-t-version2">请您打开手机应用商城，更新至最新版本，即可享受更优质、稳定服务</div>
// 						<div className="col-xs-12 col-sm-12 fixbg-main-btn-version2">
// 							<div className="row">
// 								<div className="col-xs-12 col-sm-12 fixbg-main-btn2-version2" onClick={this.btnClick}>暂不更新</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</aside>
// 		);
// 	}
// })
// $(function(){
// 	$(".fixbg-main-version").css("margin-top",-$(".fixbg-main-version").height()/2);
// 	$(".fixbg-main-version2").css("margin-top",-$(".fixbg-main-version2").height()/2);
// });
//左上角隐藏返回功能
function leftControl(isHidden){
	var iconType=0;
	if(getParamByUrl("refer")==2){
		iconType=1
	}
	var getPageInfo = function (){
		var data = {
			/*iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
			backNum:1,//1为正常后退，
			closeWebview:0,//默认为0
			hidden:isHidden,
			iconUrl:""*/
			iconType:iconType,
			iconColor:"",
			backNum:0,
			closeWebview:1,
			hidden:isHidden,
			isHandle:false,
			functionName:""
			//isRefreshPage:true
		};
		return JSON.stringify(data);
	}
	appFc.controlLeft(getPageInfo());
}
//右下角返回按钮设置
function backControl(isHidden,functionName){
	var getPageInfo = function (){
		var data = {
			controlBtn:isHidden,
			function:functionName
		};
		return JSON.stringify(data);
	};
	appFc.showBackBtn(getPageInfo());
}
//右上角隐藏消息入口
function rightBtnHidden(){
	var getPageInfo1=function (){
		var data = {
			iconType:0,
			id:"2",
			functionName:"noRight",
			iconUrl:"http://cdn2.picooc.com/web/res/fatburn/image/student/noRight.png"
		};
		return JSON.stringify(data);
	};
	appFc.controlRightInfo(getPageInfo1());

}

//右上角消息入口
function getMessage(functionName){
	var theDevice=getParamByUrl("os");
	var img="";
	if(getParamByUrl('webver')!="false" && getParamByUrl('webver')>1){

		if(theDevice == "android"){
			img="https://cdn2.picooc.com/web/res/event/chrome/android_more.png";
		}else{
			img="https://cdn2.picooc.com/web/res/event/chrome/ios_more.png";
		}
	}
	var getPageInfo1=function (){
		var data = {
			iconType:0,
			id:"2",
			functionName:functionName,
			iconUrl:img
		};
		return JSON.stringify(data);
	};
	appFc.controlRightInfo(getPageInfo1());
}
module.exports = Student_otherInfo; 




