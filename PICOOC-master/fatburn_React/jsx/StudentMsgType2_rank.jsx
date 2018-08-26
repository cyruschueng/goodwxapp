var React=require("react");


var StudentMsgType2_rank=React.createClass({
	getInitialState:function(){
		this.rankListInfo();
		return {
			rankWeekData:[],
			rankTodayData:[]
		}
	},
	rankListInfo:function(){
		var me=this;
		var host=window.location.protocol+"//"+window.location.host;
		var finalUrlToday=host+"/v1/api/campCommon/dailyCampList"+window.location.search;
		//var finalUrlToday="http://pm.picooc.com:18092/v1/api/campCommon/dailyCampList"+window.location.search;
		$.ajax({
			type: "get",
			url: finalUrlToday,
			dataType: "json",
			success: function (data) {
				//console.log(data);
				if(data.code == 200){
					console.log('今日打卡排名', data);
					if(typeof me.state.rankTodayData.resp != "undefined"){
						if(me.state.rankTodayData.resp.stuList.length > 0){
							data.resp.stuList =  me.state.rankTodayData.resp.stuList.concat(data.resp.stuList);
						}
					}
					me.setState({rankTodayData:data});
				}else{
					$(".error-main-t").html("服务器开小差了～");
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		});

		var finalUrlWeek=host+"/v1/api/campCommon/campRankList"+window.location.search;
		//var finalUrlWeek="http://pm.picooc.com:18092/v1/api/campCommon/campRankList"+window.location.search;
		$.ajax({
			type: "get",
			url: finalUrlWeek,
			dataType: "json",
			success: function (data) {
				if(data.code == 200){
					console.log('减脂排名', data);
					if(typeof me.state.rankWeekData.resp != "undefined"){
						if(me.state.rankWeekData.resp.stuList.length > 0){
							data.resp.stuList =  me.state.rankWeekData.resp.stuList.concat(data.resp.stuList);
						}
					}
					me.setState({rankWeekData:data});
				}else{
					$(".error-main-t").html("服务器开小差了～");
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		});

	},
	rankClick:function(){
		/*setCookie("studentStatu",2,1);*/
		var rankUrl='rankList.html'+location.search;
		setCookie("campTrend",2,1);
		window.location.href=rankUrl;
	},
	render:function (){
		var me = this;
		var rankTodayStr = "";
		var rankWeekStr = "";
		if((typeof me.state.rankTodayData.resp != "undefined") && (typeof me.state.rankWeekData.resp != "undefined")){
			var rankTodayData = me.state.rankTodayData.resp;
			var rankWeekData = me.state.rankWeekData.resp;
			var rankTodayList = rankTodayData.stuList;
			var rankWeekList = rankWeekData.stuList;
			//console.log('rankTodayData', rankTodayData);
			if(publicData.isCampStatus == true){//在营
				if(rankWeekList.length == 0){
					rankTodayStr =
						<div className="row todayFirstBox" onClick={me.todayFirstFun}>
							<div className="col-xs-5 col-sm-5 left">今日打卡排名</div>
							<div className="col-xs-7 col-sm-7 right">
								<div className="infoMsg">
									<div className="headBox">
										<img src={rankTodayList[0].url} onError={imgError.bind(this,rankTodayList[0].sex)} alt="" className="headImg"/>
									</div>
									<div className="infoName">
										<span className="name">{rankTodayList[0].name}</span><br/>
										<span className="top">Top 1</span>
									</div>
									<img className="rightIcon" src="http://cdn2.picooc.com/web/res/fatburn/image/student/rightNew.png" />
								</div>
							</div>
						</div>;
				}else{
					rankWeekStr =
						<div className="row rankWeekBox">
							<div className="col-xs-6 col-sm-6 aboutTitle titleLeft">{'第'+rankWeekData.week+'周减脂冠军'}</div>
							<div className="col-xs-6 col-sm-6 aboutTitle titleRight">今日打卡王</div>
							<div className="col-xs-6 col-sm-6 aboutInfo rankFatInfo" onClick={me.rankFatInfoFun}>
								<div className="infoMsg">
									<div className="headBox">
										<img src={rankWeekList[0].url} onError={imgError.bind(this,rankWeekList[0].sex)} alt="" className="headImg"/>
										<img className="rankIcon" src="http://cdn2.picooc.com/web/res/fatburn/image/student/gold.png" />
									</div>
									<div className="infoName">
										<span className="name">{rankWeekList[0].name}</span><br/>
										<span className="top">Top 1</span>
									</div>
									<img className="rightIcon" src="http://cdn2.picooc.com/web/res/fatburn/image/student/rightNew.png" />
								</div>
							</div>
							<div className="col-xs-6 col-sm-6 aboutInfo rankTodayInfo" onClick={me.rankTodayInfoFun}>
								<div className="infoMsg">
									<div className="headBox">
										<img src={rankTodayList[0].url} onError={imgError.bind(this,rankTodayList[0].sex)} alt="" className="headImg"/>
										<img className="rankIcon" src="http://cdn2.picooc.com/web/res/fatburn/image/student/blue.png" />
									</div>
									<div className="infoName">
										<span className="name">{rankTodayList[0].name}</span><br/>
										<span className="top">Top 1</span>
									</div>
									<img className="rightIcon" src="http://cdn2.picooc.com/web/res/fatburn/image/student/rightNew.png" />
								</div>
							</div>
						</div>;
				}
				//新增需求：结营的班级 就不要今日打卡排名，下面的className暂时不换了。
			}else{//已结营
				if(rankWeekList.length > 0){
					rankWeekStr =
						<div className="row todayFirstBox" onClick={me.rankFatInfoFun}>
							<div className="col-xs-5 col-sm-5 left">{'第'+rankWeekData.week+'周减脂冠军'}</div>
							<div className="col-xs-7 col-sm-7 right">
								<div className="infoMsg">
									<div className="headBox">
										<img src={rankWeekList[0].url} onError={imgError.bind(this,rankWeekList[0].sex)} alt="" className="headImg"/>
									</div>
									<div className="infoName">
										<span className="name">{rankWeekList[0].name}</span><br/>
										<span className="top">Top 1</span>
									</div>
									<img className="rightIcon" src="http://cdn2.picooc.com/web/res/fatburn/image/student/rightNew.png" />
								</div>
							</div>
						</div>;
				}

			}

		}
		return (
			<div>
				{rankTodayStr}
				{rankWeekStr}
			</div>

		);
	},
	
	//新增

	//单排：今日打卡排名
	todayFirstFun:function(){
		setCookie("campTrend",2,1);//进入到排名页面，点击返回后显示营内动态
		window.location.href = 'rankListToday.html'+window.location.search;
	},

	//并排：周减脂冠军
	rankFatInfoFun:function(){
		setCookie("campTrend",2,1);
		window.location.href = 'rankListStu.html'+window.location.search;
	},
	//并排：今日打卡王
	rankTodayInfoFun:function(){
		setCookie("campTrend",2,1);
		window.location.href = 'rankListToday.html'+window.location.search;
	}

});
module.exports = StudentMsgType2_rank; 




