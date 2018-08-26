var React=require("react");
var Fc_bindChartImg = require("./Fc_bindChartImg.jsx");
var PubSub = require("pubsub-js");
/*var chart={
	weightNum:[],
	fatNum:[],
	waistNum:[]
}
var key=0;*/
//顶部的体重脂肪信息
var StudentMsgType1_info=React.createClass({
	getInitialState:function(){
		this.getCanvasData();
		return {
			joinStatus:[],
			change0:[],
			change1:[],
			weightNum:[],
			fatNum:[],
			waistNum:[]
		}
	},
	getCanvasData:function(){
		var targetRoleId=getParamByUrl("roleId");
		var host=window.location.protocol+"//"+window.location.host;
		var finalUrl=host+"/v1/api/camp/getTrend"+window.location.search;
		var me=this;
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					if(data.resp.headPortraitUrl && data.resp.headPortraitUrl!=null && data.resp.headPortraitUrl!=""){
						$(".headimg").css("background-image","url("+data.resp.headPortraitUrl+")");
						
					}else{
						$(".headimg").css('background-image',"url("+arrHeadImg[data.resp.sex]+")");
						
					}
					var arrIcon=["http://cdn2.picooc.com/web/res/fatburn/image/student/student-10.png","http://cdn2.picooc.com/web/res/fatburn/image/student/student-11.png"];
					if(data.resp.isOver){
						me.setState({joinStatus:<span>已结营&nbsp;&nbsp;{data.resp.beginTime}-{data.resp.endTime}</span>});
						//$(".joinStatus").html("已结营 "+data.resp.beginTime+"-"+data.resp.endTime);
						// $(".campstatus").css("display","block");
						
						var titleData = {
							title:"有品燃脂营"+data.resp.campName,
							color:"",
							opacity:"",
							backgroundColor:"",
							backgroundOpacity:""
						};
						titleData=JSON.stringify(titleData);
						appFc.controlTitle(titleData);
					}else{
						me.setState({joinStatus:<span>参营第<span className="joinWeek">{data.resp.week}</span>周&nbsp;&nbsp;&nbsp;&nbsp;第<span className="joinDay">{data.resp.day}</span>天</span>});
						//$(".joinWeek").html(data.resp.week);
						//$(".joinDay").html(data.resp.day);
						// $(".campstatus").css("display","none");
						
						var titleData = {
							title:"有品燃脂营",
							color:"",
							opacity:"",
							backgroundColor:"",
							backgroundOpacity:""
						};
						titleData=JSON.stringify(titleData);
						appFc.controlTitle(titleData);
					}
					//调用右上角方法
					//getMessage("getEntrance");
					//joinDate=data.resp.day;
					if(data.resp.wFlag!=undefined ){
						
						me.setState({change0:<p><span className="num"><img src={arrIcon[data.resp.wFlag-1]} />{data.resp.wChange}</span>kg</p>});
						me.setState({change1:<p><span className="num"><img src={arrIcon[data.resp.fFlag-1]} />{data.resp.fChange}</span>%</p>});
					}
					else{
						me.setState({change0:<span className="num">{data.resp.wChange}</span>});
						me.setState({change1:<span className="num">{data.resp.fChange}</span>});
					}
					
					//$(".info-change1-p2 span").eq(2).html(data.resp.inFat);
					/*画图区域--开始*/
					$(".line").css("height",$(window).width()/750*120);
					$(".lineNum").css("height",$(window).width()/750*158);
					$(".chartBottom").css("width","100%");
					$("#weight").css("width",$(".chartBottom").width()*0.96);
					$("#fat").css("width",$(".chartBottom").width()*0.96);
					$("#waist").css("width",$(".chartBottom").width()*0.96);
					//体重折线图
					var weightArr=data.resp.weight;
					var weightEntity={
						"originArr":weightArr,              //初始数组		
						/*"dateArr":dateArr1,				//称量时间*/
						"chartID":"weight",					//折线canvas的id名称
						"chartNumID":"weightNum",			//折线点的区域的名称
						"lineFillColor":"#c1e9fb",			//折线填充颜色
						"lineStrokeColor":"#fff",		//折线颜色
						"lineStrokeColor2":"rgba(255,255,255,0.3)",		//折线颜色(数据时不满足7个时)
						"dotFillColor1":"rgba(255,255,255,0.3)",			//折线点的外圈颜色
						"dotFillColor2":"#fff",			    //折线点的内圈颜色
						"dotFillColor3":"#1daffa",			//折线点的内圈颜色(没有数据时)
						"waveHeight":(2*parseFloat($("html").css("font-size")))
					};
					Fc_bindChartImg.getLineChart(weightEntity);
					//me.getLineChart(weightEntity);
					//体脂折线图
					var fatArr=data.resp.fat;
					var fatEntity={
						"originArr":fatArr,            		//初始数组		
						/*"dateArr":dateArr1,				//称量时间*/
						"chartID":"fat",					//折线canvas的id名称
						"chartNumID":"fatNum",			//折线点的区域的名称
						"lineFillColor":"#c1e9fb",			//折线填充颜色
						"lineStrokeColor":"#fff",		//折线颜色
						"lineStrokeColor2":"rgba(255,255,255,0.3)",		//折线颜色(数据时不满足7个时)
						"dotFillColor1":"rgba(255,255,255,0.3)",			//折线点的外圈颜色
						"dotFillColor2":"#fff",			    //折线点的内圈颜色
						"dotFillColor3":"#1daffa",			//折线点的内圈颜色(没有数据时)
						"waveHeight":(2*parseFloat($("html").css("font-size")))
					};
					//me.getLineChart(fatEntity);
					Fc_bindChartImg.getLineChart(fatEntity);
					//体围（胸围）折线图
					var waistArr=data.resp.bodyMeasure;
					var waistEntity={
						"originArr":waistArr,            		//初始数组		
						/*"dateArr":dateArr1,				//称量时间*/
						"chartID":"waist",					//折线canvas的id名称
						"chartNumID":"waistNum",			//折线点的区域的名称
						"lineFillColor":"#c1e9fb",			//折线填充颜色
						"lineStrokeColor":"#fff",		//折线颜色
						"lineStrokeColor2":"rgba(255,255,255,0.3)",		//折线颜色(数据时不满足7个时)
						"dotFillColor1":"rgba(255,255,255,0.3)",			//折线点的外圈颜色
						"dotFillColor2":"#fff",			    //折线点的内圈颜色
						"dotFillColor3":"#1daffa",			//折线点的内圈颜色(没有数据时)
						"waveHeight":(2*parseFloat($("html").css("font-size")))
					};
					//me.getLineChart(waistEntity);
					//Fc_bindChartImg.getLineChart(waistEntity);
					var chart = Fc_bindChartImg.getLineChart(waistEntity);
					me.setState({
				       	weightNum:chart.weightNum,
				       	fatNum:chart.fatNum,
				       	waistNum:chart.waistNum
				    });
				   
					/*画图区域--完*/
				}else{
					$(".error-main-t").html("服务器开小差了~");
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		});
	},
	componentDidMount: function () {
	 	var me = this;
	    PubSub.subscribe('chart', function (event, chart) {
		    me.setState({
		       	weightNum:chart.weightNum,
		       	fatNum:chart.fatNum,
		       	waistNum:chart.waistNum
		    });
	    }.bind(this));
	},
	headimgClick:function(event){
		event.stopPropagation();
		setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_WoDeTouXiang);
		window.location.href='personInfo.html'+location.search;
	},
	btnClick:function(event){
		event.stopPropagation();
		//console.log(event.currentTarget.getAttribute("data-index"));
		$(".info-tab-btn").removeClass("active");
		
		$(event.currentTarget).addClass("active");
		if($(event.currentTarget).hasClass("tag-weight")){
			setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_TiZhong);
			$(".weightContent").css("display","block");
			$(".fatContent").css("display","none");
			$(".waistContent").css("display","none");
		}else if($(event.currentTarget).hasClass("tag-fat")){
			setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ZhiFang);
			$(".weightContent").css("display","none");
			$(".fatContent").css("display","block");
			$(".waistContent").css("display","none");
		}else{
			setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_YaoWei);
			$(".weightContent").css("display","none");
			$(".fatContent").css("display","none");
			$(".waistContent").css("display","block");
		}
	},
	bodyChangeClick:function(){
		event.stopPropagation();
		setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_GengDuoZhiBiao);
		
		var bodyUrl='bodyChange.html'+location.search;
		getNewWebWiew(bodyUrl);
	},
	render:function (){
		return (
			<article className="row info">
					<div className="col-xs-12 col-sm-12 headimg" onClick={this.headimgClick} style={{display:"block",top:"-1.2rem",left:($(window).width()-2.5*fontHeight-3.125*fontHeight)/2}}></div>
					<div className="col-xs-12 col-sm-12 info-t">
						<img src="http://cdn2.picooc.com/web/res/fatburn/image/student/time.png" style={{top:(2-1.125)*fontHeight/2}} />
						<span className="joinStatus">{this.state.joinStatus}</span>
						<a className="rightTop">测试</a>
					</div>
					<div className="row info-change1">
						<div className="col-xs-6 col-sm-6 info-change1-info1">
							<div className="row">
								<div className="col-xs-12 col-sm-12 info-change1-p1">体重变化</div>
								<div className="col-xs-12 col-sm-12 info-change1-p2">{this.state.change0}</div>
							</div>
						</div>
						<div className="col-xs-6 col-sm-6 info-change1-info1 info-change1-info2">
							<div className="row">
								<div className="col-xs-12 col-sm-12 info-change1-p1">脂肪变化</div>
								<div className="col-xs-12 col-sm-12 info-change1-p2">{this.state.change1}</div>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-12 info-tab">
						<div className="row">
							<span className="col-xs-4 col-sm-4 info-tab-btn tag-weight active" data-index="0" onClick={this.btnClick}>体重</span>
							<span className="col-xs-4 col-sm-4 info-tab-btn tag-fat" data-index="1"  onClick={this.btnClick}>脂肪</span>
							<span className="col-xs-4 col-sm-4 info-tab-btn tag-waist" data-index="2"  onClick={this.btnClick}>腰围</span>
						</div>
					</div>
					<div className="col-xs-12 col-sm-12 info-line">
						<div className="row chartBottom weightContent">
							<canvas className="line" id="weight" width="100px" height="100px"></canvas>
							<div id="weightNum" className="lineNum">{this.state.weightNum}</div>
						</div>
						<div className="row chartBottom fatContent">
							<canvas className="line" id="fat" width="100px" height="100px"></canvas>
							<div id="fatNum" className="lineNum">{this.state.fatNum}</div>
						</div>
						<div className="row chartBottom waistContent">
							<canvas className="line" id="waist" width="100px" height="100px"></canvas>
							<div id="waistNum" className="lineNum">{this.state.waistNum}</div>
						</div>
					</div>
					<div className="bodyChange" onClick={this.bodyChangeClick}>
						<span>更多指标变化</span>
						<img src="http://cdn2.picooc.com/web/res/fatburn/image/student/right.png" />
					</div>
				</article>
		);
	}
})
module.exports = StudentMsgType1_info; 

function getNewWebWiew(url){
	url=absoluteUrl+url;
	console.info(url);
	//url="http://"+location.host+"/web/fatburntest/"+url;
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
		
		//mobileApp.openWebview(getPageInfo());
	}else{
		window.location.href=url;
	}
	document.documentElement.style.webkitTouchCallout='none';
}


