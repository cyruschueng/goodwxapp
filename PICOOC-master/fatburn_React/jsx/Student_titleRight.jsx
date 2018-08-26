var React=require("react");
var ReactDOM=require("react-dom");
var PubSub = require("pubsub-js");

var Student_titleRight=React.createClass({
	getInitialState:function(){
		window.cengHidden=this.cengHidden;
		window.getEntrance=this.getEntrance;
		this.controlRight();
		//在营是否填写入营前调查问卷
		//this.isSubmit();

		return {
			myBodyHref:""
		}
	},
	controlRight:function(){
		//默认右上角显示管理
		var getPageInfo6 = function (){
			var iconUrl = '';
			if(getParamByUrl("os")=="android"){
				iconUrl="https://cdn2.picooc.com/web/res/event/chrome/android_more.png";
			}else{
				iconUrl="https://cdn2.picooc.com/web/res/event/chrome/ios_more.png";
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
						functionName:"getEntrance",
						//functionName:"getMessage",
						iconUrl:iconUrl,
						iconName:"",
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
		appFc.controlRight(getPageInfo6());
		
	},
	getEntrance:function(){
		if($("#comment2-msg1").is(":visible") == false){
			var cengHeight=Math.max($(window).height(),$(".ceng").height());
			$(".ceng").css("position","fixed");
			$(".ceng").css("top",0);
			var u = navigator.userAgent.toLowerCase();
			if(u.indexOf("gt-i9300") > 0){
				$(".ceng").css("height","843px");
			}else{
				$(".ceng").css("height",cengHeight);
			}
			$(".ceng").css("display","block");
			$('body').bind("touchmove",function(e){
				e.preventDefault();
			});
			$("body").css("overflowY","hidden");
			this.getMessage("cengHidden");
			this.leftControl(true);
			var theDevice=getParamByUrl("os");
			if(theDevice == "android"){
				this.backControl(true,"cengHidden");
			}
		}
	},
	cengHidden:function(event){
		event.stopPropagation();
		$(".ceng").css("display","none");
		$('body').unbind("touchmove");
		$("body").css("overflowY","auto");

		this.getMessage("getEntrance");
		this.leftControl(false);
		var theDevice=getParamByUrl("os");
		if(theDevice == "android"){
			this.backControl(false,"");
		}
	},
	notifyHidden:function(event){
		event.stopPropagation();
		$(".fixbg-notify").css("display","none");
		$('body').unbind("touchmove");
		$("body").css("overflowY","auto");
		this.getMessage("getEntrance");
		this.leftControl(false);
		var theDevice=getParamByUrl("os");
		if(theDevice == "android"){
			this.backControl(false,"");
		}
	},
	//右上角消息入口
	getMessage:function(functionName){
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
	},
	//右上角隐藏消息入口
	rightBtnHidden:function(){
	    var getPageInfo1=function (){
	        var data = {
	            iconType:0,
	            id:"2",
	            functionName:"noRight",
	            iconUrl:"http://cdn2.picooc.com/web/res/fatburn/image/student/noRight.png"
	        };
	        return JSON.stringify(data);
	    };
	    window.noRight=this.noRight;
	    appFc.controlRightInfo(getPageInfo1());
	},
	noRight:function(){

	},
	//左上角隐藏返回功能
	leftControl:function(isHidden){
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
	},
	//右下角返回按钮设置
	backControl:function(isHidden,functionName){
		var getPageInfo = function (){
			var data = {
				controlBtn:isHidden,
				function:functionName
			};
			return JSON.stringify(data);
		};
		appFc.showBackBtn(getPageInfo());
	},
	//在营是否填写入营前调查问卷
	isSubmit:function(){
			var finalUrl=ajaxLink+"/v1/api/campQuestion/isSubmit"+window.location.search;
			$.ajax({
				type:"get",
				url:finalUrl,
				dataType:"json",
				success:function(data){
					if(data.code == 200){
						if(data.resp.hasFuture && !data.resp.isSubmit){
							$(".campBeginQue").css("display","block");
							$(".campBeginQue").unbind("click").click(function(e){
									setCookie("toQuestionnaire","3",1); //跳转到入营前调查问卷标识 3为在营首页跳转的
									window.location.href="questionnaire.html"+window.location.search+"&orderId="+data.resp.orderId;
									event.stopPropagation();
							});
						}
					}
				}
			})
	},
	campBeginQueClick:function(event){
		event.stopPropagation();
		setCookie("toQuestionnaire","3",1); //跳转到入营前调查问卷标识 3为在营首页跳转的
		window.location.href="questionnaire.html"+window.location.search+"&orderId="+data.resp.orderId;
		
	},
	messageListClick:function(event){
		event.stopPropagation();
	    event.preventDefault();
		if(publicData.pageIndex==2){
			setCookie("campTrend",1,1);
		}
		window.location.href=absoluteUrl+'messageList.html'+location.search;
	},
	render:function (){
		return (
			<div className="row ceng" onTouchStart={this.cengHidden}>
				<div className="entrance">
					<div className="entranceItem messageList" onTouchStart={this.messageListClick}>消息列表</div>
					<div className="entranceItem campBeginQue" style={{display:"none"}} onTouchStart={this.campBeginQueClick}>立即填写下期入营前问卷</div>
				</div>
			</div>
		);
	}
})
module.exports = Student_titleRight; 




