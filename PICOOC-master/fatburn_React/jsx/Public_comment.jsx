var React=require("react");
var PubSub = require("pubsub-js");
var Fc_comment=require("./Fc_comment.jsx");

var Public_comment=React.createClass({
	commentClick:function(event){
		event.stopPropagation();
	},
	render:function (){
		return (
			<div className="row">
				{/*<div className="row footer  comment2" onTouchStart={this.commentClick}>*/}
				<div className="row footer  comment2" onClick={this.commentClick}>

					   <div className="col-xs-2 col-sm-2">
							<div className="imgContainer" style={{width:"100%"}}>
								<img className="img1" src="image/student/student-19.png" />
								<div className="shuxian"></div>
							</div>
					   </div>
						<div className="footer-main1 col-xs-8 col-sm-8">
							<textarea id="comment2-msg1" className="" placeholder="回复:" onFocus={Fc_comment.focus} onBlur={Fc_comment.blur}></textarea>
					   </div>
					   <div className="col-xs-2 col-sm-2">
						   {/*<div className="btn" style={{width:"100%"}} onTouchStart={Fc_comment.sendMsg}>*/}
							<div className="btn" style={{width:"100%"}} onClick={Fc_comment.sendMsg}>
								<img className="comment2-send" src="image/student/send1.png" />
							</div>
					   </div>
				</div>
				<div className="row footer comment3">
						<div className="footer-main1 col-xs-8 col-sm-8">
							<textarea id="comment2-msg2" className=""></textarea>
					   </div>
				</div>
			</div>
		);
	}
})
module.exports = Public_comment; 




