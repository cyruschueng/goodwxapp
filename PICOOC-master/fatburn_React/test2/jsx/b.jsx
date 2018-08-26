var React=require("react");

require("./../css/b.css");

var Test2=React.createClass({
	render:function (){
		return (
			<div className="row b">
				<div className="test test1">B1</div>
				<div className="test test2">B2</div>
				<div className="test test3" data-tt_id="1">B3</div>
			</div>
		);
	}
})
module.exports = Test2; 




