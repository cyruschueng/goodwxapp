var React=require("react");
var PubSub = require("pubsub-js");

var StudentMsgType1_list_part_week=require("./StudentMsgType1_list_part_week.jsx");
//card1的筛选和星期
var StudentMsgType1_list_part_day=require("./StudentMsgType1_list_part_day.jsx");
//card1的单个打卡的日期
var StudentMsgType2_list_part_partleft=require("./StudentMsgType2_list_part_partleft.jsx");
//card1的单个打卡的左部分
var StudentMsgType2_list_part_right=require("./StudentMsgType2_list_part_right.jsx");
//card1的单个打卡的右部分


var StudentMsgType1_list_part=React.createClass({
	// componentDidMount:function(){
	// 	var getList2PartIndex=this.props.getList2type_index;
	// 	PubSub.subscribe("lineLength",function(evName,lineLengthDate){
	// 		//修改listState
	// 		console.log("i"+lineLengthDate);
	// 		this.setState({lineLength:lineLengthDate});
	// 	}.bind(this));
	// },
	render:function (){
		var lineLength="";
		var checkDayBtn=publicData.type1Week.checkDayBtn;
		var isCampOver = publicData.type1Week.isCampOver;
		var joinweek = publicData.type1Week.joinweek;
		var getList1type_part=this.props.getList1type_part;
		var getList1PartIndex=this.props.getList1type_index;
		var xueYuanDaKaIndex=this.props.xueYuanDaKaIndex;
		if(getList1type_part.isCampOver){
			if(checkDayBtn==getList1type_part.checkDay){
				lineLength="lineLength3";
			}
			else{
				if(isCampOver){
					lineLength="lineLength1";
				}
			}
			isCampOver=true;
		}
		else{
			isCampOver=false;
			if(checkDayBtn==getList1type_part.checkDay){
				lineLength="lineLength3";
			}
			else{
				if(joinweek == getList1type_part.joinWeeks){
					lineLength="lineLength1";
				}
				else{
					joinweek= getList1type_part.joinWeeks;
				}
			}
		}
		checkDayBtn=getList1type_part.checkDay;
		var paddingStr="1.25rem";
		//console.log(publicData.pageIndex1);
		if(getList1PartIndex==0 && publicData.pageIndex1==1){
			//paddingStr='style={{paddingTop:"0px";}}';
			//alert(3);
			paddingStr="0px";
		}
		return (
			<div className="row studentListOrder">
				<StudentMsgType1_list_part_week getList1type_partleft={getList1type_part} index={getList1PartIndex}  />
				<StudentMsgType1_list_part_day  getList1type_partleft={getList1type_part} index={getList1PartIndex} />
				<aside className={"row part "+lineLength}>
					<StudentMsgType2_list_part_partleft getList1type_partleft={getList1type_part} index={getList1PartIndex}  />
					<StudentMsgType2_list_part_right xueYuanDaKaIndex={xueYuanDaKaIndex} getList1type_right={getList1type_part} index={getList1PartIndex}  />
				</aside>
			</div>
		);
	}
})
module.exports = StudentMsgType1_list_part; 




