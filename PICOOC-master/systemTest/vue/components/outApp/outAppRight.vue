<template>
	<section class="right">
		<router-view  :msgRed="msgRed" :noticeRed="noticeRed" ></router-view>
	</section>
</template>

<script>
	export default{
		props:["msgRed", "noticeRed"],
		mounted:function(){
		},
		/*watch:{
			msgRed:function(){
                alert(this.msgRed);
			},
			noticeRed:function(){
                alert(this.noticeRed);
			}


		},*/
	}
</script>
<style lang="less">
@import "../../public.less";
.right{
	flex-grow: 1;
}
</style>
