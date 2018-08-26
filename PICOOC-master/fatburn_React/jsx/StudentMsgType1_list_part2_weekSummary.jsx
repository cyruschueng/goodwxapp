var React=require("react");
var PubSub = require("pubsub-js");



var StudentMsgType1_list_part2_weekSummary=React.createClass({

	render:function (){
		var me = this;
		var weekSummaryNum=this.props.weekSummaryNum;
		var weekSummaryData=this.props.week_summary_data;
		//console.log('week_summary_data', weekSummaryData);
		var week_summary_index=this.props.week_summary_index;
		var isShowFatRanking = true;
		if((weekSummaryData.rankingChange==0) || (weekSummaryData.rankingChange==null)){
			isShowFatRanking = false;
		}


		//展示教练评价的标签
		var checkBasicList=this.props.check_basic_list;
		//console.log('checkBasicList', checkBasicList);
		var dietInfo = weekSummaryData.dietInfo;
		//console.log('dietInfo', dietInfo);
		var dietInfo1CheckKey = '';
		var dietInfo1CheckValue = '';
		var dietInfo1CheckMaxSum = '';

		var dietInfoList = [];
		if(dietInfo.length > 0){
			dietInfo.map(function (item, index) {
				var descClassName = '';
				if(index == 0){
					descClassName = 'desc left';
				}else if(index == 1){
					descClassName = 'desc middle';
				}else if(index == 2){
					descClassName = 'desc right';
				}

				var nowType1 = 0;
				var nowType2 = 0;
				for(var i=0; i<checkBasicList.length; i++){
					if(dietInfo[index].label.split('-')[0] == checkBasicList[i].id){
						nowType1 = i;
						break;
					}
				}


				for(var j=0; j<checkBasicList[nowType1].childTagList.length; j++){
					if(dietInfo[index].label.split('-')[1] == checkBasicList[nowType1].childTagList[j].id){
						nowType2 = j;
						break;
					}
				}

				//alert(nowType1);
				//alert(nowType2);




				dietInfoList.push(


					<div className="col-xs-4 col-sm-4" key={index}>



						<div className={descClassName}>
							<p className="descName">{checkBasicList[nowType1].checkName}</p>
							<p className="descState">{checkBasicList[nowType1].childTagList[nowType2].checkName}</p>
							<p className="descNum">{dietInfo[index].maxSum}</p>
						</div>
					</div>

				)
			});
		}



		//展示时间
		var createTime = new Date(weekSummaryData.createTime);
		var month = createTime.getMonth()+1;
		month = (month<10)?"0"+month:month;
		var day = createTime.getDate();
		day = (day<10)?"0"+day:day;
		var hour = createTime.getHours();
		hour = (hour<10)?"0"+hour:hour;
		var minute = createTime.getMinutes();
		minute = (minute<10)?"0"+minute:minute;

		var weekSummaryBox =
			<div className="weekSummaryWrap studentListOrder">
				<div className="weekSummaryTitle">
					{/*<span className="day">第<span className="dayText">{weekSummaryData.weekIndex*7+1}</span>天</span>*/}
					{/*<span className="day"style={{display:(weekSummaryData.isCampOver == false)?'inline':'none'}}>第<span className="dayText">1</span>天</span>*/}
					<span className="date">{month+'月'+day+'日 '+hour+':'+minute}</span>
				</div>
				<div className="row weekSummary">
					<div className="dataBox1">
						<div className="theFirst" onClick={me.rankTodayInfoFun} data-week-index={weekSummaryData.weekIndex}>
							<span className="gang"></span>
							<span className="text">{'第'+weekSummaryData.weekChar+'周减脂排名'}</span>
							<span className="one">{weekSummaryData.fatRanking}</span>
							<img className="topSummary" style={{display:(isShowFatRanking == true)?'inline':'none'}} src={(weekSummaryData.rankingChange>0)?"https://cdn2.picooc.com/web/res/fatburn/image/weekSummary/top.png":"https://cdn2.picooc.com/web/res/fatburn/image/weekSummary/down.png"}/>
							<span className="two" style={{display:(isShowFatRanking == true)?'inline':'none'}}>{Math.abs(weekSummaryData.rankingChange)}</span>
							<img className="right" src="https://cdn2.picooc.com/web/res/fatburn/image/weekSummary/right.png"/>
						</div>
						<div className="dataFirst">
							<span className="name cardName">打卡率</span><span className="valueBox"><span className="value cardNum">{weekSummaryData.totalRate}</span>%</span>
							<span className="name averageName">平均分</span><span className="valueBox"><span className="value averageNum">{weekSummaryData.averageScore}</span>分</span>
						</div>
					</div>
					<div className="dataBox2">
						<div className="dietPercent">
							<span className="gang"></span>
							<span className="name dietName">饮食打卡率</span><span className="valueBox"><span className="value">{weekSummaryData.dietRate}</span>%</span>
						</div>
						{/*<div className="row dietDesc" style={{display:(dietInfo.length >0)?"block":"none"}}>*/}
						{/*新增需求：有三个标签时才展示*/}
						<div className="row dietDesc" style={{display:(dietInfo.length == 3)?"block":"none"}}>
							{dietInfoList}
							{/*
							 <div className="col-xs-4 col-sm-4">
							 <div className="desc left">
							 <p className="descName">蔬菜</p>
							 <p className="descState">严重超标</p>
							 <p className="descNum">1</p>
							 </div>
							 </div>
							 <div className="col-xs-4 col-sm-4">
							 <div className="desc middle">
							 <p className="descName">蛋白质</p>
							 <p className="descState">完美</p>
							 <p className="descNum">21</p>
							 </div>
							 </div>
							 <div className="col-xs-4 col-sm-4">
							 <div className="desc right">
							 <p className="descName">烹饪</p>
							 <p className="descState">多油需过水</p>
							 <p className="descNum">11</p>
							 </div>
							 </div>
							*/}
						</div>
					</div>
					<div className="dataBox3">
						<div className="sportPercent">
							<span className="gang"></span>
							<span className="name sportName">运动打卡率</span><span className="valueBox"><span className="value">{weekSummaryData.sportRate}</span>%</span>
						</div>
						<div className="calendar">
							<div className="dataBox">
								<span className="data">{weekSummaryData.sportInfo[0].day}</span>
								<span className="data">{weekSummaryData.sportInfo[1].day}</span>
								<span className="data">{weekSummaryData.sportInfo[2].day}</span>
								<span className="data">{weekSummaryData.sportInfo[3].day}</span>
								<span className="data">{weekSummaryData.sportInfo[4].day}</span>
								<span className="data">{weekSummaryData.sportInfo[5].day}</span>
								<span className="data">{weekSummaryData.sportInfo[6].day}</span>
							</div>
							<div className="hr"></div>
							<div className="cardStateBox">
								<span className={(weekSummaryData.sportInfo[0].isCheck==1)?"cardState active":"cardState"}></span>
								<span className={(weekSummaryData.sportInfo[1].isCheck==1)?"cardState active":"cardState"}></span>
								<span className={(weekSummaryData.sportInfo[2].isCheck==1)?"cardState active":"cardState"}></span>
								<span className={(weekSummaryData.sportInfo[3].isCheck==1)?"cardState active":"cardState"}></span>
								<span className={(weekSummaryData.sportInfo[4].isCheck==1)?"cardState active":"cardState"}></span>
								<span className={(weekSummaryData.sportInfo[5].isCheck==1)?"cardState active":"cardState"}></span>
								<span className={(weekSummaryData.sportInfo[6].isCheck==1)?"cardState active":"cardState"}></span>
							</div>
						</div>
					</div>
				</div>
			</div>;


		return (
			<div>{weekSummaryBox}</div>
		);
	},
	
	//跳转到周减脂排名
	rankTodayInfoFun:function(event){
		var weekIndex = event.currentTarget.getAttribute("data-week-index");
		window.location.href = 'rankListStu.html'+window.location.search+'&weekIndex='+weekIndex;
	}
});
module.exports = StudentMsgType1_list_part2_weekSummary;




