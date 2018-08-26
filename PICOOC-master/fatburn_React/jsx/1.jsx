var React=require("react");
var ReactDOM=require("react-dom");
var PubSub = require("pubsub-js");
var mobiscroll=require("./mobiscroll.core.js");
var Student=React.createClass({
	render:function (){
		return (
			<mobiscroll.Timer ref="timer" theme="ios" display="bottom" countDirection="down" targetTime={10} maxWheel="minutes" minWidth={100}
                onFinish={function () {
                    alert('Countdown finished!');
                }}
                placeholder="Please Select..." />
		);
	}
})
ReactDOM.render(
	<Student />,
	document.getElementById('main')
);




