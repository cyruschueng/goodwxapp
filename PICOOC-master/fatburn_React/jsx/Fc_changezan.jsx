var Fc_changezan={};
var zanBtn=true;//防止点赞连续点击
var PubSub = require("pubsub-js");

Fc_changezan.changeZan=function(event){
	event.stopPropagation();
	setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_DianZan);

	//console.log(event.currentTarget.getAttribute("class").hasClass("hasZan"));
	//console.log($(event.currentTarget).hasClass("hasZan"));
	console.log(publicData.pageIndex);
	if(publicData.isCanDianZan){
		publicData.isCanDianZan=false;

		var partIndex=parseInt(event.currentTarget.getAttribute("data-xue-yuan-da-ka-index"));//checkList中：学员自己打卡的下标（除去周表现总结）


		var partIndex2=parseInt(event.currentTarget.getAttribute("data-part_index"));//checkList中所有列表的下标
		//alert('partIndex='+partIndex);

		if($(event.currentTarget).hasClass("hasZan")){
			var checkId=event.currentTarget.getAttribute("data-check_id");
			var checkRoleId=event.currentTarget.getAttribute("data-check_role_id");
			var finalUrl=ajaxLink+"/v1/api/camp/cancelPraise"+window.location.search+"&checkId="+checkId+"&checkRoleId="+checkRoleId;
			$.ajax({
				type:"get",
				url:finalUrl,
				dataType:"json",
				success:function(data){
					if(data.code == 200){
						//删除点赞名字开始
						var deleteZanIndex;
						//$(".partRight:eq("+partIndex+") .msgZan .zanSize").css('color', 'red');
						for(var i=0;i<$(".partRight:eq("+partIndex+") .msgZan .zanSize").length;i++){
							if($(".partRight:eq("+partIndex+") .msgZan .zanSize").eq(i).attr("data-target_role_id")==roleId){
								deleteZanIndex=i;
							}
						}
						var deleteZanData={
							pageIndex:publicData.pageIndex,
							partIndex:partIndex2,
							deleteZanIndex:deleteZanIndex
							
						}
						console.log(deleteZanData);
						PubSub.publish("deleteZan",deleteZanData);
						//删除点赞名字结束
						//zanBtn=true;
					}
					else{
						// alert(data.result.message);
						$(".error-main-t").html(data.result.message);
						$(".errorAlert").css("display","block");
						$(".error-main").css("margin-top",-$(".error-main").height()/2);
						publicData.isCanDianZan = true;
					}
				}
			})
		}
		else{
			var checkId=event.currentTarget.getAttribute("data-check_id");
			var checkRoleId=event.currentTarget.getAttribute("data-check_role_id");
			var finalUrl=ajaxLink+"/v1/api/camp/praise"+window.location.search+"&checkId="+checkId+"&checkRoleId="+checkRoleId;
			$.ajax({
				type:"get",
				url:finalUrl,
				dataType:"json",
				success:function(data){
					if(data.code == 200){
					
						//添加点赞名字开始
						var addZanData={
							pageIndex:publicData.pageIndex,
							partIndex:partIndex2,
							resp:data.resp
						};
						PubSub.publish("addZan",addZanData);
						//添加点赞名字结束
						//zanBtn=true;
					}
					else{
						// alert(data.result.message);
						$(".error-main-t").html(data.result.message);
						$(".errorAlert").css("display","block");
						$(".error-main").css("margin-top",-$(".error-main").height()/2);
						publicData.isCanDianZan = true;
					}
					//zanBtn=true;
				}
			})
		}
	}
}
module.exports = Fc_changezan; 