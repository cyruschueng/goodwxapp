
var React = require("react");
var ReactDOM = require("react-dom");
var Public_error = require('./Public_error.jsx');

var SGongGaoLieBiao={
	SCategory_SGongGaoLieBiao:5061500,
	SGongGaoLieBiao_TiaoZhuanGongGaoXiangQing:5061501//跳转到公告详情页
};

var ReportList = React.createClass({
	getInitialState:function(){
		var me = this;
		me.getReportList();
		var titleData = {
			title:"公告列表",
			color:"",
			opacity:"",
			backgroundColor:"",
			backgroundOpacity:""
		};
		titleData=JSON.stringify(titleData);
		appFc.controlTitle(titleData);
		return {
			reportList:[]
		}
	},
	getReportList:function(){
		var me = this;
		var host=window.location.protocol+"//"+window.location.host;
		var finalUrl=host+"/v1/api/campStu/noticeList"+window.location.search;
		console.info(finalUrl);
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				console.info(data);
				if(data.code == 200){
					me.setState({reportList:data.resp});
				}else{
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		});
	},
	//打开一个新的webWiew
	getNewWebWiew:function(url){
		url=absoluteUrl+url;
		console.info(url);
		setMaiDian(SGongGaoLieBiao.SCategory_SGongGaoLieBiao,SGongGaoLieBiao.SGongGaoLieBiao_TiaoZhuanGongGaoXiangQing);
		var getPageInfo = function (){
			var data = {
				link:url,
				animation: 1//默认1从右到左，2从下到上
			};
			return JSON.stringify(data);
		};

		var deviceType=isMobile();
        if(deviceType == "isApp" && (getParamByUrl("testtype")!="tanchao")){
            appFc.openWebview(getPageInfo());
        }else{
            window.location.href=url;
        }
		document.documentElement.style.webkitTouchCallout='none';
	},
	render:function (){
		var me=this;
		var reportList = [];
		if(me.state.reportList != ""){
			for(var i=0;i<me.state.reportList.length;i++){
				me.state.reportList[i].content=escapeContent(me.state.reportList[i].content);
				var reportDetialUrl="reportDetial.html"+location.search+"&noticeId="+me.state.reportList[i].id;

				reportList.push(
				<div className="report-item" key={i} onClick={me.getNewWebWiew.bind(this,reportDetialUrl)}>
					<div className="item-title">{me.state.reportList[i].title}</div>
					<div className="item-content" dangerouslySetInnerHTML={{__html:me.state.reportList[i].content}}></div>
					<div className="item-date">{me.state.reportList[i].createTime}</div>
					<div className="item-icon"></div>
				</div>);
			}
		}else{
			reportList.push(<i></i>);
		}
		return (
			<div className="row reportList">
				{reportList}
			</div>
		);
	}
});

var Component = React.createClass({
	render:function (){
		return (
			<div>
				<ReportList />
				<Public_error />
			</div>
		);
	}
})

ReactDOM.render(
	<Component />,document.getElementById('reportMain')
);