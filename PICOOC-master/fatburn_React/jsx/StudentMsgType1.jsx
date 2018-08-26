var React=require("react");

var StudentMsgType1_info=require("./StudentMsgType1_info.jsx");
//顶部的体重脂肪信息等
var StudentMsgType1_change=require("./StudentMsgType1_change.jsx");
//我的方案
var StudentMsgType1_list=require("./StudentMsgType1_list.jsx");
//打卡列表
var StudentMsgType1_setcard=require("./StudentMsgType1_setcard.jsx");
//打卡按钮
var Fc_comment=require("./Fc_comment.jsx");

var StudentMsgType1=React.createClass({
	hasMsgClick:function(){
		window.location.href='messageList.html'+location.search;
	},
	render:function (){
		var getList1type = this.props.getList1;
		var objHasMsg;
		if(getList1type.resp.hasNews){
			objHasMsg=<article className="row hasMsg" style={{display:"block"}}>
						<a className="col-xs-12 col-sm-12 hasMsg-info" onClick={this.hasMsgClick}>
							<img src="http://cdn2.picooc.com/web/res/fatburn/image/student/msg.png" />
							您有<span>{getList1type.resp.unReadNum}</span>条新评论
						</a>
					</article>;
		}
		else{
			objHasMsg=<i></i>;
		}
		
		return (
			<div className="row msgType1" style={{position:"relative",marginTop:0}} onClick={Fc_comment.hiddenComment2}>
				<div  style={{height:"4.25rem"}}></div>
				<StudentMsgType1_info />
				<StudentMsgType1_change />
				{objHasMsg}
				<StudentMsgType1_list getList1type={getList1type} shaixuan1ComeFrom="student" />
				<StudentMsgType1_setcard />
			</div>
		);
	}
})
module.exports = StudentMsgType1; 




