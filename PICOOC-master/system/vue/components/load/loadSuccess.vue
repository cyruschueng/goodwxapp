<template>
	<div class="systemLoad">
		<a class="btn" href="javascript:void(0);" onclick="javascript:this.href='index.html'+location.search">内容管理</a>
		<a class="btn" href="javascript:void(0);" onclick="javascript:this.href='https://a.picooc.com/server/picooc-background-web/deviceManager.html'+location.search">设备管理</a>
	</div>
</template>
<script>
export default {
	components:{
		
	}
}
</script>
<style lang="less">
@import "../../public.less";
.systemLoad{
	position: relative;
	min-height: 100vh;
	padding: 30px;
	.btn{
		display: inline-block;
		background: #FFFFFF;
		padding: 0 23px;
		font-size: 20px;
		height: 50px;
		line-height: 50px;
		color: #4A90E2;
		margin-right: 30px;
		.border(1px,#C1C7D2);
		.border-radius(25px);
	}
}

</style>