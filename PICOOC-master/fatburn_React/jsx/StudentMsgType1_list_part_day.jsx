var React=require("react");
var PubSub = require("pubsub-js");
// var checkDayBtn=0;
// var isFirstLoad=0;
// var isCampOver = false;
// var joinweek = 0;
var StudentMsgType1_list_part_partleft=React.createClass({
	getInitialState:function(){
		// checkDayBtn=0;
		// isFirstLoad=0;
		// isCampOver = false;
		// joinweek = 0;
		return {

		}
	},
	render:function (){
		// var checkDayBtn=publicData.type1left.checkDayBtn;
		// var isCampOver = publicData.type1left.isCampOver;
		// var joinweek = publicData.type1left.joinweek;
		// var isFirstLoad=publicData.type1left.isFirstLoad;
		//console.log("checkDayBtn:"+publicData.type1left.checkDayBtn);
		var getList1type_partleft_item=this.props.getList1type_partleft;
		var getListPartIndex=this.props.index;
		var strPartLeft="";
		if(getList1type_partleft_item.isDayDisplay){
			if(getList1type_partleft_item.isCampOver){
				//console.log("isCampOver:"+isCampOver);
				var month = getList1type_partleft_item.checkDay.substring(0,3);//月份
				var dayth = getList1type_partleft_item.checkDay.substring(3,5);//日期
				if(publicData.type1left.checkDayBtn==getList1type_partleft_item.checkDay){
					publicData.type1left.isCampOver=true;
					strPartLeft='';
					publicData.type1left.checkDayBtn=getList1type_partleft_item.checkDay;
					return null;
				}
				else{
					if(publicData.type1left.isCampOver){
						publicData.type1left.isCampOver=true;
						publicData.type1left.checkDayBtn=getList1type_partleft_item.checkDay;
						return null;
							
					}else{
						publicData.type1left.isCampOver=true;
						publicData.type1left.checkDayBtn=getList1type_partleft_item.checkDay;
						return null;	
					}

				}
				
			}
			else{
				publicData.type1left.isCampOver=false;
				if(publicData.type1left.checkDayBtn==getList1type_partleft_item.checkDay){
					strPartLeft='';
					publicData.type1left.checkDayBtn=getList1type_partleft_item.checkDay;
					return null;
				}
				else{
					if(publicData.type1left.joinweek == getList1type_partleft_item.joinWeeks){
						publicData.type1left.checkDayBtn=getList1type_partleft_item.checkDay;
						return (
							<div className="joinDaysBox"><span className="joinDayText">第<span className="joinDays">{getList1type_partleft_item.joinDays}</span>天</span></div>
						);
					}
					else{
						publicData.type1left.joinweek= getList1type_partleft_item.joinWeeks;
						publicData.type1left.checkDayBtn=getList1type_partleft_item.checkDay;
						return (
							<div className="joinDaysBox"><span className="joinDayText">第<span className="joinDays">{getList1type_partleft_item.joinDays}</span>天</span></div>
						);
					}
				}
				
			}


		}
		else{
			publicData.type1left.checkDayBtn=getList1type_partleft_item.checkDay;
			return null;
		}		
		
	}
})
module.exports = StudentMsgType1_list_part_partleft; 




