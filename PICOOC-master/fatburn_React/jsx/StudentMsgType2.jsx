var React=require("react");

var StudentMsgType2_rank=require("./StudentMsgType2_rank.jsx");
//card2顶部的排行榜
var StudentMsgType2_campReport=require("./StudentMsgType2_campReport.jsx");
//card2上面的公共
var StudentMsgType2_shaixuan=require("./StudentMsgType2_shaixuan.jsx");
//card2的筛选
var StudentMsgType2_list=require("./StudentMsgType2_list.jsx");
//card2的打卡列表
var Fc_comment=require("./Fc_comment.jsx");

var StudentMsgType2=React.createClass({
	render:function (){
		var getList2type = this.props.getList2;

		return (
			<div className="row msgType2" onClick={Fc_comment.hiddenComment2}>
				<StudentMsgType2_rank  />
				<StudentMsgType2_campReport  />
				<StudentMsgType2_shaixuan  />
				<StudentMsgType2_list getList2type={getList2type} />
			</div>
		);
	}
})
module.exports = StudentMsgType2; 




