var React=require("react");
var PubSub = require("pubsub-js");

var StudentMsgType1_info=React.createClass({
	render:function (){
		return (
			<article className="row info">
					<div className="col-xs-12 col-sm-12 info-t">
						<img src="http://cdn2.picooc.com/web/res/fatburn/image/student/time.png" />
						<span className="joinStatus">参营第<span className="joinWeek"></span>周  第<span className="joinDay"></span>天</span>
						<a className="rightTop">测试</a>
					</div>
					<div className="row info-change1">
						<div className="col-xs-6 col-sm-6 info-change1-info1">
							<div className="row">
								<div className="col-xs-12 col-sm-12 info-change1-p1">体重变化</div>
								<div className="col-xs-12 col-sm-12 info-change1-p2"><span></span></div>
							</div>
						</div>
						<div className="col-xs-6 col-sm-6 info-change1-info1 info-change1-info2">
							<div className="row">
								<div className="col-xs-12 col-sm-12 info-change1-p1">脂肪变化</div>
								<div className="col-xs-12 col-sm-12 info-change1-p2"><span></span></div>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-12 info-tab">
						<div className="row">
							<span className="col-xs-4 col-sm-4 info-tab-btn tag-weight active">体重</span>
							<span className="col-xs-4 col-sm-4 info-tab-btn tag-fat">脂肪</span>
							<span className="col-xs-4 col-sm-4 info-tab-btn tag-waist">腰围</span>
						</div>
					</div>
					<div className="col-xs-12 col-sm-12 info-line">
						<div className="row chartBottom weightContent">
							<canvas className="line" id="weight" width="100px" height="100px"></canvas>
							<div id="weightNum" className="lineNum"></div>
						</div>
						<div className="row chartBottom fatContent">
							<canvas className="line" id="fat" width="100px" height="100px"></canvas>
							<div id="fatNum" className="lineNum"></div>
						</div>
						<div className="row chartBottom waistContent">
							<canvas className="line" id="waist" width="100px" height="100px"></canvas>
							<div id="waistNum" className="lineNum"></div>
						</div>
					</div>
					<div className="bodyChange">
						<span>更多指标变化</span>
						<img src="http://cdn2.picooc.com/web/res/fatburn/image/student/right.png" />
					</div>
				</article>
		);
	}
})
module.exports = StudentMsgType1_info; 




