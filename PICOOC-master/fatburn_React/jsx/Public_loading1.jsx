var React=require("react");
var ReactDOM = require("react-dom");
var PubSub = require("pubsub-js");

var Public_loading1 = React.createClass({
	getInitialState:function(){
	    var me = this;
	    return {
	    	loadingTime:""
	    }
	},
	startLoading:function(){
  		//loading动画
  		/*var me = this;*/
  		var loadingIndex=1;
		/*loadingTime=setInterval(function(){
		    if(loadingIndex==$(".loading-point").length){
		        loadingIndex=0;
		    }
		    $(".loading-point").removeClass("loading-point-active");
		    $(".loading-point").eq(loadingIndex).addClass("loading-point-active");
		    loadingIndex++; 

		},300);*/
		this.setState({loadingTime:setInterval(function(){
		    if(loadingIndex==$(".loading-point").length){
		        loadingIndex=0;
		    }
		    $(".loading-point").removeClass("loading-point-active");
		    $(".loading-point").eq(loadingIndex).addClass("loading-point-active");
		    loadingIndex++; 

		},300)});
	},	
	stopLoading:function(){
	  	$(".loading-load").css("display","none");
	  	clearInterval(this.state.loadingTime);
	},
	render:function (){
		return (
			<aside className="loading-load">
				<span className="loading-point loading-point-active"></span>
				<span className="loading-point"></span>
				<span className="loading-point"></span>
			</aside>
		);
	}
})

module.exports = Public_loading1; 