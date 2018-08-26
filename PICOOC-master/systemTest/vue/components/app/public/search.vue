<template>
	<div class="search">
		<input id="search" placeholder="请输入标题" @input="dataChange" />
		<div class="btn" @click="searchData">搜索</div>
	</div>
</template>
<script>
export default {
	props:[],
	methods:{
		searchData:function(){
			this.$emit('search', $("#search").val());
		},
		dataChange:function(){
			if($("#search").val()!=""){
				$(".search .btn").css("background","#4A90E2");
			}
			else{
				$(".search .btn").css("background","#C1C7D2");
			}
		}
	}
}
</script>
<style lang="less">
@import "../../../public.less";
.search{
	width: 237px;
	height: 28px;
	line-height: 28px;
	position: absolute;
	right: 46px;
	top: 27px;
	font-size: 12px;
	input{
		width: 237px;
		height: 28px;
		line-height: 28px;
		padding-left: 20px;
		padding-right: 60px;
		.border(1px,#C1C7D2);
		.border-radius(14px);
	}
	.btn{
		width: 50px;
		height: 23px;
		line-height: 23px;
		position: absolute;
		right: 3px;
		top: 3.5px;
		background: #C1C7D2;
		color: #fff;
		text-align: center;
		.border-radius(12px);
	}
	.btn:hover{
		cursor:pointer;
	}
}

</style>