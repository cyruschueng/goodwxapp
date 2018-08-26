$(function(){
	appNoShare();
	$(".container").css("minHeight",$(window).height());
	getHistoryList();
})
function appNoShare(){
	var getPageInfo = function (){
		var data = {
			title:'历史燃脂营',
			isShare:false,
			backgroundColor:'#2c2f31'
		};
		return JSON.stringify(data);
	};
	var deviceType=isMobile();
		if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		mobileApp.getShareInfo(getPageInfo());
	}
	document.documentElement.style.webkitTouchCallout='none';
}

function getHistoryList(){
	var campId=getParamByUrl("campId");
	var host=window.location.protocol+"//"+window.location.host;
	var finalUrl=host+"/v1/api/campStu/getCampHistory"+window.location.search+"&campId="+campId;
	/*var host=window.location.protocol+"//"+window.location.host;*/
	/*var finalUrl=host+"/v1/api/campStu/getCampHistory"+window.location.search+"&campId=2";*/
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				/*alert(data.resp.length);*/
				var historyHtml="";
				for(var i=0;i<data.resp.length;i++){
					/*var className=data.resp[i].name.split("-");*/
					var searchUrl=removeParamByUrl("targetCampId");
					var hrefUrl="student.html"+window.location.search+"&targetCampId="+data.resp[i].id;
					historyHtml+='<a class="historyItem row" href="'+hrefUrl+'">'
									+'<div class="title">'
										+'<span>燃脂营 <span class="theBlod">'+data.resp[i].name+'</span></span>'
									+'</div>'
									+'<div class="date">'
										+'<span>'+data.resp[i].beginTime+'-'+data.resp[i].endTime+'</span>'
									+'</div>'
								+'</a>';
				}
				$(".historyList").empty();
				$(".historyList").append(historyHtml);
			}
		}
	})
}