var React=require("react");

require("./../css/a.css");


var Test1=React.createClass({
	render:function (){
		return (
			<div className="row a">
				<div className="test test1">1</div>
				<div className="test test2">2</div>
				<div className="test test3">3</div>
			</div>
		);
	}
})
module.exports = Test1; 




