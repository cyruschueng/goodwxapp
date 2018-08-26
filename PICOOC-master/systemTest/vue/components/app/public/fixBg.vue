<template>
	<section class="fixBg">
		<div class="fixBgMain">
			<h3 class="fixBgTitle"></h3>
			<p class="fixBgDetail">{{detaile}}</p>
			<div class="confirmBox">
				<div class="confirmBtn confirmBtn1" @click="closeFixBg">取消</div>
				<div class="confirmBtn confirmBtn2" @click="confirm">确定</div>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	props:["detaile","confirmData"],
	methods:{
		closeFixBg:function(){
			$(".fixBg").css("display","none");
		},
		confirm:function(){
			this.$emit('confirmClick', this.confirmData);
			$(".fixBg").css("display","none");
		}
	}
}
</script>
<style lang="less">
@import "../../../public.less";
.fixBg{
	display: none;
	position: fixed;
	top: 30%;
	left: 30%;
	background: #fff;
	width: 400px;
	.border(1px,#C1C7D2);
	.fixBgMain{
		position: relative;
		width: 100%;
		height: 100%;
		padding: 30px;
	}
	.fixBgDetail{
		margin-bottom: 30px;
	}
	.confirmBox{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		.border-top(1px,#C1C7D2);
	}
	.confirmBtn{
		position: relative;
		width: 49%;
		display: inline-block;
		.cursor;
	}
	.confirmBtn1{
		.border-right(1px,#C1C7D2);
	}
}



</style>