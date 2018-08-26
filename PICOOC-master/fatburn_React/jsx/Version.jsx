var React=require("react");
require("../cssv2/version.css");

var Version=React.createClass({
	render:function (){
		return (
			<aside className="row">
				<Student_otherInfo_version  />
				<Student_otherInfo_version2 />
			</aside>
		);
	}
})

var Student_otherInfo_version=React.createClass({
	getInitialState:function(){
		var versionDisplay="none";
		if(getParamByUrl('os')=='iOS'){
			if(getParamByUrl('webver') > 3){   //版本正常
				$("body").css("overflow","auto"); 
				$("body").css("max-height","auto");
			}else{ //版本过低
				versionDisplay="block";
					// var t1=setTimeout(function(){
					// 	$("body").css("max-height",$(window).height());
					// 	$("body").css("overflow","hidden");
					// 	clearTimeout(t1);
					// },200);
			}
		}
		
		return {display:versionDisplay}
	},
	btnClick:function(){
		event.stopPropagation();
		$("body").css("overflow","auto"); 
		$("body").css("max-height","auto");
		$(".fixbg-version").css("display","none");
		var getPageInfo = function () {
			var data = {
				backNum: 0,//默认为1，
				closeWebview: 1//默认为0
			};
			return JSON.stringify(data);
		};
		appFc.deleteHistory(getPageInfo());
	},
	btnClick2:function(){
		window.location.href = 'https://itunes.apple.com/us/app/picooc/id729928969?mt=8';
		event.stopPropagation();
	},
	render:function (){
		return (
			<aside className="row fixbg-version" style={{display:this.state.display}}>
				<div className="col-xs-12 col-sm-12 fixbg-main-version">
					<div className="row">
						<div className="col-xs-12 col-sm-12 fixbg-main-t-version">当前App版本过低，无法进入新版燃脂营哦，快去更新吧~</div>
						<div className="col-xs-12 col-sm-12 fixbg-main-btn-version">
							<div className="row">
								<div className="col-xs-6 col-sm-6 fixbg-main-btn1-version" onClick={this.btnClick}>取消</div>
								<div className="col-xs-6 col-sm-6 fixbg-main-btn2-version" onClick={this.btnClick2}>前往AppStore</div>
							</div>
						</div>
					</div>
				</div>
			</aside>
		);
	}
})
var Student_otherInfo_version2=React.createClass({
	getInitialState:function(){
		var versionDisplay="none";
		if(getParamByUrl('os')=='android'){
			if(getParamByUrl('webver') > 3){   //版本正常
				$("body").css("overflow","auto"); 
				$("body").css("max-height","auto");
			}else{ //版本过低
					versionDisplay="block";
					// var t1=setTimeout(function(){
					// 	$("body").css("max-height",$(window).height());
					// 	$("body").css("overflow","hidden");
					// 	clearTimeout(t1);
					// },200);
			}
		}
		
		return {
			display:versionDisplay
		}
	},
	btnClick:function(){
		$("body").css("overflow","auto"); 
		$("body").css("max-height","auto");
		$(".fixbg-version2").css("display","none");
		event.stopPropagation();
		var getPageInfo = function () {
			var data = {
				backNum: 0,//默认为1，
				closeWebview: 1//默认为0
			};
			return JSON.stringify(data);
		};
		appFc.deleteHistory(getPageInfo());
	},
	render:function (){

		return (
			<aside className="row fixbg-version2" style={{display:this.state.display}}>
				<div className="col-xs-12 col-sm-12 fixbg-main-version2" >
					<div className="row">
						<div className="col-xs-12 col-sm-12 fixbg-main-t-version2">当前App版本过低，无法进入新版燃脂营哦，快去更新吧~</div>
						<div className="col-xs-12 col-sm-12 fixbg-main-btn-version2">
							<div className="row">
								<div className="col-xs-12 col-sm-12 fixbg-main-btn2-version2" onClick={this.btnClick}>我知道了</div>
							</div>
						</div>
					</div>
				</div>
			</aside>
		);
	}
})
$(function(){
	$(".fixbg-main-version").css("margin-top",-$(".fixbg-main-version").height()/2);
	$(".fixbg-main-version2").css("margin-top",-$(".fixbg-main-version2").height()/2);
});

module.exports = Version; 

