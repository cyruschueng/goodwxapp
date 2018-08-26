var React=require("react");
var ReactDOM=require("react-dom");
var DatePicker=require("react-mobile-datepicker");

var App=React.createClass({
	getInitialState:function(){
		console.log(new Date(1990, 0, 1).getFullYear());
		return {
			time: new Date(1990, 0, 1),
			isOpen: false,
			theme:'ios'
		}
		
	},
	handleClick:function(){
		this.setState({ isOpen: true });
	},
	handleCancel:function(){
		this.setState({ isOpen: false });
	},
	handleSelect:function(time){
		this.setState({ time, isOpen: false });
	},
	render:function(){
		
		return (
			<div className="App">
				<a
					className="select-btn"
					onClick={this.handleClick}>
					select time
				</a>
				<div>{this.state.time.getFullYear()}年{this.state.time.getMonth()+1}月{this.state.time.getDate()}日</div>
				<DatePicker
					value={this.state.time}
					theme={this.state.theme}
					isOpen={this.state.isOpen}
					dateFormat={['YYYY年', 'MM月', 'DD日']}
					min={new Date(1930, 0, 1)}
					max={new Date(2017, 11, 30)}
					onSelect={this.handleSelect}
					onCancel={this.handleCancel} />
			</div>
		);
	}
})


ReactDOM.render(
	<App />,
	document.getElementById('react-box')
);







