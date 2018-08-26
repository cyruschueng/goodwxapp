var React=require("react");
//打卡列表
var StudentMsgType1_list_part=require("./StudentMsgType1_list_part.jsx");

var StudentMsgType1_shaixuan1=require("./StudentMsgType1_shaixuan1.jsx");
var StudentMsgType1_list_part2_weekSummary=require("./StudentMsgType1_list_part2_weekSummary.jsx");

var StudentMsgType1_list=React.createClass({
	render:function (){
		var getList1type = this.props.getList1type;
		var list=[];
		var shaixuan1Name="";
		var noCardList;
		var shaixuan1ComeFrom=this.props.shaixuan1ComeFrom;
		if(typeof getList1type.resp != "undefined"){
            //console.log('getList1type:',getList1type);
			var checkList = getList1type.resp.checkList;
			var xueYuanDaKaIndex = 0;
			var weekSummaryNum = 0;
			//alert(getList1type.resp.checkList.length);
			for(var i=0,len=getList1type.resp.checkList.length;i<len;i++){//此处需要添加周表现总结
				if(checkList[i].type == 6){
					weekSummaryNum++;
					list.push(<StudentMsgType1_list_part2_weekSummary weekSummaryNum={weekSummaryNum} check_basic_list={getList1type.resp.checkBasicList} week_summary_data={getList1type.resp.checkList[i]} week_summary_index={i} key={i} />);
				}else {
					list.push(<StudentMsgType1_list_part xueYuanDaKaIndex={xueYuanDaKaIndex} getList1type_part={getList1type.resp.checkList[i]} getList1type_index={i} key={i} />);
					xueYuanDaKaIndex++;
				}
			}
			if(publicData.weekSummaryNum == 0){//如果周表现总结数量大于0，则保存周表现总结数量；
				publicData.weekSummaryNum = weekSummaryNum;
			}
			if(getList1type.resp.checkList.length>0){
				var listIndex = 0;
				for(var j=0; j<getList1type.resp.checkList.length; j++){
					if(getList1type.resp.checkList[j].type!=6){
						listIndex = j;
						break;
					}
				}
				if(getList1type.resp.checkList[listIndex].isCampOver){
					shaixuan1Name='已结营';
				}
				else{
					if(getList1type.resp.checkList[listIndex].type == 6){
						var weekIndex = getList1type.resp.checkList[listIndex].weekIndex+1;
						shaixuan1Name='第'+weekIndex+'周';
					}else {
						shaixuan1Name='第'+getList1type.resp.checkList[listIndex].joinWeeks+'周';
					}

				}
			}
			if(!publicData.hasNextBtn1){
				if(getList1type.resp.checkList.length>0){
					noCardList=<div className="row cardListMessage" style={{display:"block"}}><span className="cardListLine"></span><br/><span>就这么多了～</span></div>;
				}
				else{
					noCardList=<div className="row noRecord" style={{display:"block"}}>暂无相关打卡记录哦～</div>;
				}
			}
			return (
				<article className="row list" style={{marginBottom:"0"}}>
					<div id="jumpToStudentHash" style={{width:0,height:0}}></div>
					<StudentMsgType1_shaixuan1 shaixuan1Name={shaixuan1Name} shaixuan1ComeFrom={shaixuan1ComeFrom}/>
					{list}
					{noCardList}
					<div className="col-xs-12 col-sm-12 noRecordBottom"><span>  </span></div>
				</article>
			);
		}
		else{
			return <i></i>;
		}
		
	}
})
module.exports = StudentMsgType1_list; 




