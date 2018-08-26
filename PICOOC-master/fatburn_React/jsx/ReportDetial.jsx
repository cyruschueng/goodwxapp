var React = require("react");
var ReactDOM = require("react-dom");
var Public_error = require('./Public_error.jsx');

var SGongGaoXiangQing={
	SCategory_SGongGaoXiangQing:5061600,
	SGongGaoXiangQing_FenXiangGongGao:5061601,//分享公告
	SGongGaoXiangQing_GuanBiGouMaiTuPian:5061602,//关闭引导购买图片
	SGongGaoXiangQing_DianJiGouMaiTuPian:5061603//点击引导购买图片
};

var ReportDetial =React.createClass({
	getInitialState:function(){
		var me = this;
		me.getReportDetial();
		var titleData = {
			title:"公告详情",
			color:"",
			opacity:"",
			backgroundColor:"",
			backgroundOpacity:""
		};
		titleData=JSON.stringify(titleData);
		appFc.controlTitle(titleData);
		return {
			reportDetialData:[]
		}
	},
	appShare:function(isShare,title,shareTitle,url,desc){
		 //右上角
		 var iconUrl = "";
		 var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_share.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png"];
		 if (getParamByUrl("os") == "android") {
			 iconUrl = iconShare[0];
		 }else {
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
							 shareTitle:shareTitle,
							 shareUrl:url,
							 shareIcon:'http://cdn2.picooc.com/web/res/fatburn/image/student/reportShareIcon.png',
							 shareDesc:desc,
							 shareTag:"",
							 shareType:"0",
							 shareBackgroundColor:"",
							 shareTypeDesc:"",
							 fatBurnName:''
						 }
					 }]
			};
			return JSON.stringify(data5);
		};
		appFc.controlRight(getPageInfo2());
	},
	//获得公告详情
	getReportDetial:function(){
		var me = this;
		var host=window.location.protocol+"//"+window.location.host;
		var finalUrl=host+"/v1/api/campCommon/getNoticeDesc"+window.location.search;
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					me.setState({reportDetialData:data});
					//分享
					var userId=getParamByUrl("userId");
					var shareUrl=absoluteUrl+"reportDetial.html?noticeId="+data.resp.id+"&token=655bc92e9a2f49e6613ffb6412553cf0";
					data.resp.content=escapeContent(data.resp.content);
					var shareContent=data.resp.content;
					shareContent=shareContent.replace(/<br\s*\/?>/g, "\n");
					console.info(data.resp.content);
					if(shareContent.length > 30){
						shareContent=shareContent.substring(0,30)+"...";
					}
					me.appShare(true,"公告详情",data.resp.title,shareUrl,shareContent);
					setShare(data.resp.title,shareContent,shareUrl);
				}else{
					me.appShare(false,"公告详情","","","");
					$(".error-main-t").html("服务器开小差了～");
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		});
	},
	closeImgCeng:function(){
		$(".ceng").css("display","none");
		setMaiDian(SGongGaoXiangQing.SCategory_SGongGaoXiangQing,SGongGaoXiangQing.SGongGaoXiangQing_GuanBiGouMaiTuPian);
		//event.preventDefault();
		//event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
	},
	closeCeng:function(){
		event.nativeEvent.stopImmediatePropagation();
		setMaiDian(SGongGaoXiangQing.SCategory_SGongGaoXiangQing,SGongGaoXiangQing.SGongGaoXiangQing_DianJiGouMaiTuPian);
		window.location.href="https://wap.koudaitong.com/v2/goods/2fnubhl3q250o";
	},
	render:function (){
		var me = this;
		var os= getParamByUrl("os") ;
		var isApp= (os=="iOS" || os== "android") ? true : false;
		if(isApp){
			$(".ceng").css("display","none");
		}else{
			$(".reportDetial").css("paddingBottom","6.25rem");
			$(".ceng").css("display","block");
		}
		$(".reportDetial").css("minHeight",$(window).height());
		if(me.state.reportDetialData.resp != null && me.state.reportDetialData.resp != ""){
			$(".container").css("display","block");
			$(".bodyMessage").css("display","none");
		}else{
			$(".container").css("display","none");
			$(".bodyMessage").css("display","block");
		}
		if(me.state.reportDetialData.resp != null){
			return (
				<div className="container">
					<div className="row reportDetial">
						<div className="title">{me.state.reportDetialData.resp.title}</div>
						<div className="date">{me.state.reportDetialData.resp.createTime}</div>
						<div className="content" dangerouslySetInnerHTML={{__html:me.state.reportDetialData.resp.content}}></div>
					</div>
					<div className="ceng" onClick={me.closeCeng}>
						<img className="cengClose" onClick={me.closeImgCeng} src="http://cdn2.picooc.com/web/res/fatburn/image/student/buyImgClose.png" />
					</div>
				</div>
			);
		}
		return (<i></i>);
	}
});

var Component = React.createClass({
	render:function (){

		return (
			<div>
				<ReportDetial />
				<Public_error />
				<div className="bodyMessage">
					该条公告已被删除哦～
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<Component />,document.getElementById('reportDetialMain')
);