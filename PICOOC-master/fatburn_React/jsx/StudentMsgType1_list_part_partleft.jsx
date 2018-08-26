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
		var paddingStr="1.8rem";
		if(getListPartIndex==0 && publicData.pageIndex1==1){
			//paddingStr='style={{paddingTop:"0px";}}';
			//alert(3);
			paddingStr="0px";
		}
		if(getList1type_partleft_item.isDayDisplay){
			if(getList1type_partleft_item.isCampOver){
				//console.log("isCampOver:"+isCampOver);
				var month = getList1type_partleft_item.checkDay.substring(0,3);//月份
				var dayth = getList1type_partleft_item.checkDay.substring(3,5);//日期
				if(publicData.type1left.checkDayBtn==getList1type_partleft_item.checkDay){
					publicData.type1left.isCampOver=true;
					strPartLeft='';
					publicData.type1left.checkDayBtn=getList1type_partleft_item.checkDay;
					return <i style={{display:"none"}}></i>;
				}
				else{
					if(publicData.type1left.isCampOver){
						publicData.type1left.isCampOver=true;
						publicData.type1left.checkDayBtn=getList1type_partleft_item.checkDay;
						return (
							<div className="col-xs-2 col-sm-2 partLeft2">
								<div className="row">
									<div className="col-xs-12 col-sm-12 partLeft-p4"><span>{dayth}</span></div>
									<div className="col-xs-12 col-sm-12 partLeft-p5"><span>{month}</span></div>
								</div>
							</div>
						);
							
					}else{
						publicData.type1left.isCampOver=true;
						publicData.type1left.checkDayBtn=getList1type_partleft_item.checkDay;
						return (
							<div className="col-xs-2 col-sm-2 partLeft">
								<div className="row">
									<div className="col-xs-12 col-sm-12 partLeft-p4"><span>{dayth}</span></div>
									<div className="col-xs-12 col-sm-12 partLeft-p5"><span>{month}</span></div>
								</div>
							</div>
						);	
					}

				}
				
			}
			else{
				publicData.type1left.isCampOver=false;
				if(publicData.type1left.checkDayBtn==getList1type_partleft_item.checkDay){
					strPartLeft='';
					publicData.type1left.checkDayBtn=getList1type_partleft_item.checkDay;
					return <i style={{display:"none"}}></i>;
				}
				else{
					if(publicData.type1left.joinweek == getList1type_partleft_item.joinWeeks){
						publicData.type1left.checkDayBtn=getList1type_partleft_item.checkDay;
						return (
							<div className="col-xs-2 col-sm-2 partLeft2">
								<div className="row">
									<div className="col-xs-12 col-sm-12 partLeft-p6"><span className="partLeft-p6-span"><span>第</span><span className="joinDays">{getList1type_partleft_item.joinDays}</span><span>天</span></span></div>
									<div className="col-xs-12 col-sm-12 partLeft-p7"><span>{getList1type_partleft_item.checkDay}</span></div>
								</div>
							</div>
						);
					}
					else{
						publicData.type1left.joinweek= getList1type_partleft_item.joinWeeks;
						publicData.type1left.checkDayBtn=getList1type_partleft_item.checkDay;
						return (
							<div className="col-xs-2 col-sm-2 partLeft">
								<div className="row">
									<div className="col-xs-12 col-sm-12 partLeft-p6"><span className="partLeft-p6-span"><span>第</span><span className="joinDays">{getList1type_partleft_item.joinDays}</span><span>天</span></span></div>
									<div className="col-xs-12 col-sm-12 partLeft-p7"><span>{getList1type_partleft_item.checkDay}</span></div>
								</div>
							</div>
						);
					}
				}
				
			}


		}
		else{
			publicData.type1left.checkDayBtn=getList1type_partleft_item.checkDay;
			return <i style={{display:"none"}}></i>;
		}		
		
	}
})
module.exports = StudentMsgType1_list_part_partleft; 




