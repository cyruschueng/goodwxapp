<template>
	<header class="outAppMainWrap">
		<div class="outAppMain flex">
			<!-- <outAppMain /> -->
			<router-view ></router-view>
		</div>
	</header>
	<!--<router-view></router-view>-->
</template>
<script>
import outAppMain from "./outAppMain.vue";//引入别的vue
export default {
	components:{
		outAppMain
	}
}
</script>

<style lang="less">
	@import "../public.less";
	.outAppMainWrap{
		min-width: 1244px;
		background: #fff;
	.outAppMain{
		height: 100%;
		width: 1244px;
		font-size: 12/@rem;
		margin: 0 auto;

	}
	}
</style>