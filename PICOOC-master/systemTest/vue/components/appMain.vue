<template>
	<div class="appMain">
		<left></left>
		<router-view name="appRight"></router-view>
	</div>
</template>
<script>
import left from "./app/appLeft.vue";//引入别的vue
export default {
	components:{
		left,
	}
}
</script>
<style lang="less">
@import "../public.less";
.appMain{
	.flex;
}
</style>