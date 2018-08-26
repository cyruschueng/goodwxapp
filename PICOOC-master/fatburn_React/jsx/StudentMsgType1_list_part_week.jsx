var React=require("react");
var PubSub = require("pubsub-js");
var StudentMsgType1_shaixuan1=require("./StudentMsgType1_shaixuan1.jsx");
// var checkDayBtn=0;
// var isFirstLoad=0;
// var isCampOver = false;
// var joinweek = 0;
var StudentMsgType1_list_part_week=React.createClass({
	render:function (){
		var getList1type_partleft_item=this.props.getList1type_partleft;

		var getListPartIndex=this.props.index;
		
		var strPartLeft="";
		var lineLength="";
		var weekshow = "";
		var shaixuan1Name="";
		console.log("index:"+getListPartIndex+"|"+getList1type_partleft_item.isDayDisplay);
		if(getList1type_partleft_item.isDayDisplay && getList1type_partleft_item.isDayDisplay!="deletePartNext"){
			if(getList1type_partleft_item.isCampOver){
				var month = getList1type_partleft_item.checkDay.substring(0,3);//月份
				var dayth = getList1type_partleft_item.checkDay.substring(3,5);//日期
				//console.log("ceshi:"+publicData.type1Week.checkDayBtn+"|"+getList1type_partleft_item.checkDay);
				//console.log("ceshi2:"+publicData.type1Week.isCampOver+"|"+publicData.type1Week.isFirstLoad);
				if(publicData.type1Week.checkDayBtn==getList1type_partleft_item.checkDay){
					publicData.type1Week.checkDayBtn=getList1type_partleft_item.checkDay;
					publicData.type1Week.joinweek= getList1type_partleft_item.joinWeeks;
					return null;
				}
				else{
					if(publicData.type1Week.isCampOver){
						weekshow="";
						publicData.type1Week.checkDayBtn=getList1type_partleft_item.checkDay;
						publicData.type1Week.joinweek= getList1type_partleft_item.joinWeeks;
						publicData.type1Week.isCampOver=true;
						return null;
					}else{
						if(publicData.type1Week.isFirstLoad==0){
							//$(".shaixuan1").css("display","block");
							//$(".campstatusContent").css("display","block");
							//$(".campstatusContent").html("已结营");
							publicData.type1Week.isFirstLoad++;
							publicData.type1Week.checkDayBtn=getList1type_partleft_item.checkDay;
							publicData.type1Week.joinweek= getList1type_partleft_item.joinWeeks;
							publicData.type1Week.isCampOver=true;
							//shaixuan1Name='已结营';
							return null;
							//return <StudentMsgType1_shaixuan1 shaixuan1Name={shaixuan1Name} />
						}else{
							publicData.type1Week.checkDayBtn=getList1type_partleft_item.checkDay;
							publicData.type1Week.joinweek= getList1type_partleft_item.joinWeeks;
							publicData.type1Week.isCampOver=true;
							return (
								<div className="col-xs-12 col-sm-12 campstatus">
									<div className="campstatusContent">已结营</div>
								</div>
							);
						}
					}

				}
				
			}
			else{
				publicData.type1Week.isCampOver=false;
				if(publicData.type1Week.checkDayBtn==getList1type_partleft_item.checkDay){
					publicData.type1Week.checkDayBtn=getList1type_partleft_item.checkDay;
					publicData.type1Week.joinweek= getList1type_partleft_item.joinWeeks;
					return null;
				}
				else{
					if(publicData.type1Week.joinweek == getList1type_partleft_item.joinWeeks){
						publicData.type1Week.checkDayBtn=getList1type_partleft_item.checkDay;
						publicData.type1Week.joinweek= getList1type_partleft_item.joinWeeks;
						return null;
					}
					else{
						if(publicData.type1Week.isFirstLoad==0){
							publicData.type1Week.checkDayBtn=getList1type_partleft_item.checkDay;
							publicData.type1Week.joinweek= getList1type_partleft_item.joinWeeks;
							//$(".shaixuan1").css("display","block");
							//$(".campstatusContent").css("display","block");
							//$(".campstatusContent").eq(0).html('第'+getList1type_partleft_item.joinWeeks+'周');
							//publicData.aa[0]=第{getList1type_partleft_item.joinWeeks}周;
							publicData.type1Week.isFirstLoad++;
							// shaixuan1Name='第'+getList1type_partleft_item.joinWeeks+'周';
							return null;
							//return <StudentMsgType1_shaixuan1 shaixuan1Name={shaixuan1Name} />
						}else{
							publicData.type1Week.checkDayBtn=getList1type_partleft_item.checkDay;
							publicData.type1Week.joinweek= getList1type_partleft_item.joinWeeks;
							return (
								<div className="row campstatus" data-part_index={parseInt(getListPartIndex)} >
									<div className="campstatusContent">第{getList1type_partleft_item.joinWeeks}周</div>
								</div>
							);
						}

						
					}
				}
				
			}


		}
		else{
			publicData.type1Week.checkDayBtn=getList1type_partleft_item.checkDay;
			publicData.type1Week.joinweek= getList1type_partleft_item.joinWeeks;
			return null;
		}
		
	}
})
module.exports = StudentMsgType1_list_part_week; 




