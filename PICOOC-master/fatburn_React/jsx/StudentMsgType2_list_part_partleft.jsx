var React=require("react");
var PubSub = require("pubsub-js");
var Fc_MsgTotol=require("./Fc_right_MsgTotol.jsx");
var checkDayBtn=0;
var isFirstLoad=0;
var isCampOver = false;
var joinweek = 0;
var StudentMsgType1_list_part_partleft=React.createClass({
	render:function (){
		var getList1type_partleft_item=this.props.getList1type_partleft;
		
		var getListPartIndex=this.props.index;
		var targetCampId=getList1type_partleft_item.campId;
		return (
			<div className="partLeft">
				<a className="partLeft-headerHref" data-target_role_id={getList1type_partleft_item.roleId} data-target_camp_id={targetCampId} onClick={Fc_MsgTotol.bindStudentInfo}>
					<img src={getList1type_partleft_item.roleImg} onError={imgError.bind(this,getList1type_partleft_item.roleSex)} />
				</a>
			</div>
		)
		
				
	}
})
module.exports = StudentMsgType1_list_part_partleft; 




