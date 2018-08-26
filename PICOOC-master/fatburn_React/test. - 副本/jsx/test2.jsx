var React=require("react");
var ReactDOM=require("react-dom");
var A=require("./a.jsx");
var B=require("./b.jsx");
require("./../css/test2.css");
alert(4);
var Test=React.createClass({
	render:function (){
		return (
			<div>
				<A />
				<B />
			</div>
		);
	}
})
ReactDOM.render(
    <Test />,
    document.getElementById('main')
);




