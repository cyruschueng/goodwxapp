$(function(){
	//运动方案数据交互--开始
	getTrainPlan();
	//运动方案数据交互--结束
	appNoShare();

})
function appNoShare(){
	var getPageInfo = function (){
		var data = {
			title:'运动方案',
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

function getTrainPlan(){
	var host=window.location.protocol+"//"+window.location.host;
	var finalUrl=host+"/v1/api/camp/getScheme"+window.location.search;
	console.info(finalUrl);
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				if(data.resp.length > 0){
					var trainHtml="";
					for(var i=0;i<data.resp.length;i++){
						var url="'"+data.resp[i].url+window.location.search+"'";
						/*trainHtml+='<a href="'+data.resp[i].url+window.location.search+'" class="sportPlan-item">'+data.resp[i].weekNum+'&nbsp;&nbsp;'+data.resp[i].title+'</a>';*/
						trainHtml+='<div onclick="trainPlan('+url+')" class="sportPlan-item">'+data.resp[i].weekNum+'&nbsp;&nbsp;'+data.resp[i].title+'</div>';
					}
					$(".part2").empty();
					$(".part2").append(trainHtml);
				}else{
					// alert("当前没有运动方案~");
	                $(".error-main-t").html("当前没有运动方案~");
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}else{
				// alert("服务器开小差了~");
	                $(".error-main-t").html("服务器开小差了~");
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
			}
		}
	});
}


function trainPlan(trainUrl){
	window.location.href=trainUrl;
}