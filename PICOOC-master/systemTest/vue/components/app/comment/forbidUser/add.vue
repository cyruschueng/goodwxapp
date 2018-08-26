<template>
	<div class="forbidUserAdd">
		<div class="close" @click="closeDisplay">关闭</div>
		<div class="titleName">新增禁言用户</div>
		<div class="uid">UID<input type="number" class="input uidInput" :value="uid" /></div>
		<div class="time">时间<input type="number" class="input timeInput" /><div class="timeInputSpan">天</div></div>
		<div class="reason">原因<textarea class="input reasonInput" /></textarea></div>
		<div class="add" @click="addForbid">保存</div>
	</div>
</template>
<script>
export default {
	props:['uid'],
	methods:{
		closeDisplay:()=>{
			$(".timeInput").val("");
			$(".reasonInput").val("");
			$(".forbidUserAdd").css("display","none");
		},
		addForbid:function(){
			let uidInput=$(".uidInput").val();
			let timeInput=$(".timeInput").val();
			let reasonInput=$(".reasonInput").val();
			let ajaxData={
				"userId":uidInput,
				"reason":reasonInput,
				"nospeakingTime":timeInput
			};
			/*let url=ajaxLink+'picooc-background/nospeaking/add?'+token+windowSearch+"&userId="+uidInput+"&reason="+reasonInput+"&nospeakingTime="+timeInput;*/
			let url=ajaxLink+'picooc-background/nospeaking/add?'+token+windowSearch;
			let me=this;
			$.ajax({
				type:"post",
				url:url,
				data:JSON.stringify(ajaxData),
				dataType:"json",
				contentType:"application/json; charset=utf-8",
				success:function(data){
					if(data.code == 200){
						alert(data.msg);
						me.closeDisplay();
						router.go(0);
						//router.push({ path: 'appCommentForbidUserIndex' });
					}
					else{
						alert(data.msg);
					}
				}
			})
		}
	}
}
</script>
<style lang="less">
@import "../../../../public.less";
.forbidUserAdd{
	display: none;
	position: absolute;
	top: 25%;
	left: 50%;
	width: 440px;
	height: 286px;
	background: #fff;
	padding: 15px 20px;
	margin: 0 0 0 -220px;
	.border(4px,#C1C7D2);
	.border-radius(5px);
	.close{
		position: absolute;
		top: 10px;
		right: 10px;
		.cursor;
	}
	.titleName{
		margin-bottom: 13px;
	}
	.uid{
		height: 20px;
		line-height: 20px;
		position: relative;
		margin-bottom: 20px;
	}
	.input{
		display: inline-block;
		padding-left: 10px;
		.border(1px,#C1C7D2);
	}
	.uidInput{
		width: 150px;
		height: 20px;
		line-height: 20px;
		position: absolute;
		left: 40px;
		top: 0;
	}
	.time{
		height: 20px;
		line-height: 20px;
		position: relative;
		margin-bottom: 20px;
	}
	.timeInput{
		width: 70px;
		height: 20px;
		line-height: 20px;
		position: absolute;
		left: 40px;
		top: 0;
	}
	.timeInputSpan{
		position: absolute;
		left: 116px;
		top: 0;
	}
	.reason{
		height: 100px;
		line-height: 20px;
		position: relative;
		margin-bottom: 20px;
	}
	.reasonInput{
		width: 230px;
		height: 100px;
		line-height: 20px;
		position: absolute;
		left: 40px;
		top: 0;
	}
	.add{
		display: inline-block;
		background: #FFFFFF;
		padding: 0 23px;
		font-size: 12px;
		height: 30px;
		line-height: 30px;
		color: #4A90E2;
		margin-right: 40px;
		.cursor;
		.border(1px,#C1C7D2);
		.border-radius(15px);
	}
}
</style>