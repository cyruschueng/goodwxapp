var React=require("react");


var StudentMsgType2_list_part_partleft=require("./StudentMsgType2_list_part_partleft.jsx");
var StudentMsgType2_list_part_right=require("./StudentMsgType2_list_part_right.jsx");


var StudentMsgType2_list_part=React.createClass({
	render:function (){
		var xueYuanDaKaIndex=this.props.xueYuanDaKaIndex;
		var getList2type_part=this.props.getList2type_part;
		var getList2PartIndex=this.props.getList2type_index;
		return (

			<div className="studentListOrder">
				<aside className="row part line-length" >
					<StudentMsgType2_list_part_partleft getList1type_partleft={getList2type_part} index={getList2PartIndex}  />
					<StudentMsgType2_list_part_right xueYuanDaKaIndex={xueYuanDaKaIndex} getList1type_right={getList2type_part} index={getList2PartIndex}  />
				</aside>
			</div>

		);
	}
})
module.exports = StudentMsgType2_list_part; 




