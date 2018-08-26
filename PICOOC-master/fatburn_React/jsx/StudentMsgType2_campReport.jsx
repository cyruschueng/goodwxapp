var React=require("react");


var StudentMsgType2_campReport=React.createClass({
	getInitialState:function(){
		this.getInfo();
		return {
			resp:[],
			campReportStyle:{display:"block"},
			reportTitleDisplay:{display:"none"},
			reportContentStyle:{display:"none"},
			reportTitleStyle:{},
			paginationStyle:{display:"block"}

		}
		
	},
	getInfo:function(){
		var me=this;
		var host=window.location.protocol+"//"+window.location.host;
		var finalUrl=host+"/v1/api/campStu/noticeList"+window.location.search;
		console.info(finalUrl);
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200 && data.resp.length>0){
					//console.log('report', data);
					
					me.setState({reportTitleDisplay:{display:"block"}});
					me.setState({resp:data.resp});
				// var reportHtml="";
				// var reportList=data.resp;
				// var reportLength=data.resp.length > 3 ? 3 : data.resp.length;
				// if(reportLength > 0){
				// 	$(".campReport").css("display","block");
				// 	$("#reportList").empty();
				// 	for(var i=0;i<reportLength;i++){
				// 		var url="'"+"reportDetial.html"+location.search+"&noticeId="+reportList[i].id+"'";
				// 		reportHtml+='<div className="swiper-slide report-item" onclick="reportJump('+url+')">'
				// 						+'<div className="item-title">'+data.resp[i].title+'</div>'
				// 						+'<div className="item-content">'+data.resp[i].content+'</div>'
				// 						+'<div className="item-date">'+data.resp[i].createTime+'</div>'
				// 					+'</div>';
				// 	}
				// 	$("#reportList").append(reportHtml);
					var nowReportId=data.resp[0].id;
					var oldReportId=getCookie("oldReportId");
					console.info(nowReportId+"||"+oldReportId);
					//console.log(nowReportId <= oldReportId);
					if(nowReportId <= oldReportId){
						me.setState({reportContentStyle:{display:"none"}});
						me.setState({reportTitleStyle:{borderBottom:"none"}});
						// $(".reportTitle").css("border","none");
						// $(".reportTitle").css("borderStyle","none");
						// $(".reportTitle").css("borderWidth","0px");
					}else{
						me.setState({reportContentStyle:{display:"block"}});
						me.setState({reportTitleStyle:{borderBottom:"1px solid rgb(238, 220, 206)"}});
						// $(".reportTitle").css("border-width","0px 0px 1px");
						// $(".reportTitle").css("border-style","solid");
						// $(".reportTitle").css("border-color","rgb(238, 220, 206)");
					}
					setCookie("oldReportId",data.resp[0].id,30);
					
					if(data.resp.length == 1){
						me.setState({paginationStyle:{display:"none"}});
					}
				}else{
					me.setState({campReportStyle:{display:"none"}});
				}
			}
		})
	},
	reportJump:function(url,event){
		setCookie("campTrend",2,1);
		window.location.href=url;
	},
	reportTitleJump:function(){
		setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_YingNeiGongGao);
		/*$(".reportContent").css("display","none");
		$(this).css("border","none");*/
		setCookie("campTrend",2,1);
		var url='reportList.html'+location.search;
		window.location.href=url;
	},
	componentDidMount:function(){
		var time1=setInterval(function(){
			if($(".swiper-container2").html()!=undefined){
				var swiper = new Swiper('.swiper-container2', {
			        pagination: '.swiper-pagination2',
			        paginationClickable: true,
			        observer:true,//修改swiper自己或子元素时，自动初始化swiper
					observeParents:true//修改swiper的父元素时，自动初始化swiper
			    });
			    clearInterval(time1);
			}
			
		},10);
		
	},
	render:function (){
		var me=this;
		var campReport,list=[],paginationList=[];
		var reportLength=this.state.resp.length > 3 ? 3 : this.state.resp.length;
		if(reportLength > 0){
			for(var i=0;i<reportLength;i++){
				var url="reportDetial.html"+location.search+"&noticeId="+this.state.resp[i].id;
				list.push(
					<div className="swiper-slide report-item" key={i} onClick={this.reportJump.bind(this,url)}>
						<div className="item-title">{this.state.resp[i].title}</div>
						<div className="item-content">{this.state.resp[i].content}</div>
						<div className="item-date">{this.state.resp[i].createTime}</div>
					</div>
				);
			}
		}
		if(reportLength>1){
			for(var j=0;j<reportLength;j++){
				paginationList.push(<span className="swiper-pagination-bullet" key={j}></span>);
			}
			
		}
		if(this.state.resp.length==0){
			campReport=<i></i>;
		}
		else{
			campReport=<div className="row campReport" style={{display:this.state.campReportStyle.display}}>
					<div className="reportTitle" style={{display:this.state.reportTitleDisplay.display,borderBottom:this.state.reportTitleStyle.borderBottom}} onClick={this.reportTitleJump}>
						<img className="reportIcon" src="http://cdn2.picooc.com/web/res/fatburn/image/student/reportNew.png" />
						<span>营内公告</span>
						<img className="rightIcon" src="http://cdn2.picooc.com/web/res/fatburn/image/student/rightNew.png" />
					</div>
					<div className="reportContent" style={{display:this.state.reportContentStyle.display}}>
						<div className="swiper-container2">
							<div className="swiper-wrapper" id="reportList">
								{list}
							</div>
							<div className="swiper-pagination2" id="report-pagination" style={{display:this.state.paginationStyle.display}}>{paginationList}</div>
						</div>
					</div>
				</div>
		}
		//display:this.state.reportContentStyle.display
		
		return (
			campReport
		);
	}
})
module.exports = StudentMsgType2_campReport; 




