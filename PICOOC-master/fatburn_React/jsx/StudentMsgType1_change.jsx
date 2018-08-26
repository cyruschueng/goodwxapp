var React=require("react");
var PubSub = require("pubsub-js");
//我的方案

var StudentMsgType1_Change=React.createClass({
	getInitialState:function(){
		this.getInfo();
		return {
			myBodyHref:""
		}
	},
	getInfo:function(){
		var me=this;
		var campIdLink="";
		if(getParamByUrl("campId")=="false"){
			campIdLink="&campId="+getCookie("campId");
		}
		setCookie("uploadurl",0,1);
		var finalUrl=ajaxLink+"/v1/api/campCommon/campPictureCount"+window.location.search;
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					//console.log("success");
					if(data.resp==0){
						setCookie("loadtourl",0,1);
						me.setState({myBodyHref:"figureContrast.html"+window.location.search+campIdLink+"&uploadurl=0"});
						//$(".changeList-main2").attr("href","figureContrast.html"+window.location.search+campIdLink);
						event.stopPropagation();

					}else if(data.resp==1){
						setCookie("loadtourl",1,1);
						setCookie("toPhoto",1,1);
						me.setState({myBodyHref:"photoAlbum.html"+window.location.search+campIdLink});
						//$(".changeList-main2").attr("href","photoAlbum.html"+window.location.search+campIdLink);
						event.stopPropagation();
					}else if(data.resp>1){
						setCookie("loadtourl",1,1);
						me.setState({myBodyHref:"figureContrast2.html"+window.location.search+campIdLink});
						//$(".changeList-main2").attr("href","figureContrast2.html"+window.location.search+campIdLink);
						event.stopPropagation();
					}
				}
				else{
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		})
	},
	myPlanClick:function(){
		window.location.href='trainPlan.html'+location.search;
	},
	render:function (){
		return (
			<article className="row change">
				<div className="col-xs-6 col-sm-6 changeList changeList1">
					<a className="row changeList-main1" onClick={this.myPlanClick}>
						<div className="col-xs-12 col-sm-12 changeList-icon"><img src="https://cdn2.picooc.com/web/res/fatburn/image/student/plan.png" /></div>
						<div className="col-xs-12 col-sm-12 changeList-p">我的方案</div>
					</a>
				</div>
				<div className="col-xs-6 col-sm-6 changeList changeList2">
					<a className="row changeList-main2" href={this.state.myBodyHref}>
						<div className="col-xs-12 col-sm-12 changeList-icon"><img src="https://cdn2.picooc.com/web/res/fatburn/image/student/body.png" /></div>
						<div className="col-xs-12 col-sm-12 changeList-p">我的身材</div>
					</a>
				</div>
			</article>
		);
	}
})
module.exports = StudentMsgType1_Change; 




