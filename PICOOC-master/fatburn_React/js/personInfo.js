$(function(){

	appNoShare("个人资料");
	var targetRoleId=getParamByUrl("roleId");
	getBaseInfo(targetRoleId);

		//修改个人资料，页面跳转
	$(".jumpItem").each(function(index){
    	$(this).click(function(){
			if(index == 0){
				setMaiDian(SGeRenZiLiao.SCategory_SGeRenZiLiao,SGeRenZiLiao.SGeRenZiLiao_NiCheng);
			}else if(index == 1){
				setMaiDian(SGeRenZiLiao.SCategory_SGeRenZiLiao,SGeRenZiLiao.SGeRenZiLiao_ZhiYe);
			}else if(index == 2){
				setMaiDian(SGeRenZiLiao.SCategory_SGeRenZiLiao,SGeRenZiLiao.SGeRenZiLiao_SuoZaiDi);
			}
    		var itemName=$(this).children("span:eq(0)").text();
    		var itemValue=$(this).children("span:eq(1)").text();
            var index=$(".jumpItem").index(this);
            window.location.href="editInfo.html"+window.location.search+"&itemName="+itemName+"&index="+index+"&itemValue="+itemValue;
            /*var editUrl="editInfo.html"+window.location.search+"&itemName="+itemName+"&index="+index+"&itemValue="+itemValue;
            getNewWebWiew(editUrl);*/
    	});
    });
});

function getBaseInfo(targetRoleId){
	var host=window.location.protocol+"//"+window.location.host;
	var finalUrl=host+"/v1/api/camp/getBasicInfo"+window.location.search+"&targetRoleId="+targetRoleId;;
	console.info(finalUrl);
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				/*头部基本信息数据交互--开始*/
				/*$("#first-weight").text(data.resp.title.firstWeight);
				$("#first-fat").text(data.resp.title.firstFat);
				$("#first-in-fat").text(data.resp.title.firstInfat);*/
				$("#accountVal").text(data.resp.title.name);
				var headerImg="";
				if(data.resp.title.sex == 0){
					$(".sex").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/girl.png");
					headerImg="'http://cdn2.picooc.com/web/res/appFriend/head_portrait_pic02.png'";
				}else{
					$(".sex").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/boy.png");
					headerImg="'http://cdn2.picooc.com/web/res/appFriend/head_portrait_pic01.png'";
				}
				$(".head").attr("src",data.resp.title.head);
				$(".head").attr("onerror","this.src="+headerImg);
				/*头部基本信息数据交互--结束*/
				/*学员基本信息数据交互--开始*/
				//初始化信息选择控件
				var weightTime=data.resp.weightPreiod;
				var weightTimeText="";
				/*if(weightTime == 0){
					weightTimeText="凌晨 (00:00-04:00)";
				}else */
				if(weightTime == 1){
					weightTimeText="上午时段 (04:00-12:00)";
				}else if(weightTime == 2){
					weightTimeText="下午时段 (12:00-16:00)";
				}else if(weightTime == 3){
					weightTimeText="傍晚时段 (16:00-20:00)";
				}else if(weightTime == 4){
					weightTimeText="夜晚时段 (20:00-24:00)";
				}
				console.info("weightTimeText"+weightTimeText);
				/*getBasicData(data.resp.height,weightTimeText);*/
				getBasicData(data.resp.birthday,data.resp.height,weightTimeText,data.resp.physicalPeriod);
				$(".name").find("span:eq(1)").text(data.resp.title.name);
				$(".periodDesc ").find("input:eq(0)").val(weightTimeText);
				$(".height").find("input:eq(0)").val(data.resp.height);
				$(".age").find("input:eq(0)").val(data.resp.birthday);
				$(".career").find("span:eq(1)").text(data.resp.career);
				if(data.resp.title.sex == 1){
					$(".physicalPeriod").css("display","none");
				}else{
					$(".physicalPeriod").find("input:eq(0)").val(data.resp.physicalPeriod);
				}
				/*$(".physicalPeriod").find("input:eq(0)").val(data.resp.physicalPeriod);*/
				$(".area").find("span:eq(1)").text(data.resp.area);
				/*学员基本信息数据交互--结束*/
			}else{
                $(".error-main-t").html("服务器开小差了～");
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
			}
		}
	});
}

//页面标题设置
function appNoShare(title){
    var getPageInfo = function (){
        var data = {
            title:title,
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