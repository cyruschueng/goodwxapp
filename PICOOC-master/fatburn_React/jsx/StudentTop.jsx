var React=require("react");
var PubSub = require("pubsub-js");
var Fc_comment=require("./Fc_comment.jsx");

var StudentTop=React.createClass({
	componentDidMount:function(){
		$(".tabList").eq(publicData.pageIndex-1).addClass("active");
		if(publicData.pageIndex==1){
			$(".msgType1").css("display","block");
			$(".msgType2").css("display","none");
			publicData.functionType=1;
		}
		else{
			$(".msgType1").css("display","none");
			$(".msgType2").css("display","block");
			publicData.functionType=3;
		}
	},
	changeType:function(num,event){
		event.stopPropagation();
		publicData.pageIndex=num;
		$(".tabList").removeClass("active");
		$(event.currentTarget).addClass("active");
		PubSub.publish("listState",publicData.pageIndex);
		if(publicData.pageIndex==1){
			$(".msgType1").css("display","block");
			$(".msgType2").css("display","none");
			publicData.functionType=1;
		}
		else{
			$(".msgType1").css("display","none");
			$(".msgType2").css("display","block");
			publicData.functionType=3;
		}
	},
	render:function (){
		return (
			<aside className="row tab" onTouchStart={Fc_comment.hiddenComment2}>
				<div className="col-xs-6 col-sm-6 tabList tab1" onTouchStart={this.changeType.bind(this,1)}>个人进展</div>
				<div className="col-xs-6 col-sm-6 tabList" onTouchStart={this.changeType.bind(this,2)}>营内动态</div>
			</aside>
		);
		
	}
})
module.exports = StudentTop; 




