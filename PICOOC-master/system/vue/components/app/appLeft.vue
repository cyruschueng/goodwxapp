<template>
	<section class="left ">
		<div class="left-li">-&nbsp;&nbsp;内容管理</div>
		<aside class="left-group">
			<router-link :to="{name:'appContentColumnIndex'}" class="left-jump">栏目管理</router-link>
			<router-link :to="{name:'appContentArticleIndex'}" class="left-jump">文章管理</router-link>
		</aside>
		<div class="left-li">-&nbsp;&nbsp;评论管理</div>
		<aside class="left-group">
			<router-link :to="{name:'appCommentArticleCommentIndex'}" class="left-jump">文章评论</router-link>
			<router-link :to="{name:'appCommentSensitiveWordIndex'}" class="left-jump">敏感词管理</router-link>
			<router-link :to="{name:'appCommentForbidUserIndex'}" class="left-jump">禁言用户</router-link>
		</aside>
		<div class="left-li">-&nbsp;&nbsp;广告管理</div>
		<aside class="left-group">
			<router-link :to="{name:'appAdvertiseSplashScreenIndex'}" class="left-jump">闪屏</router-link>
			<router-link :to="{name:'appAdvertiseArticleIndex'}" class="left-jump">文章底部的链接</router-link>
			<router-link :to="{name:'appAdvertiseFindIndex'}" class="left-jump">电商发现轮播图管理</router-link>
		</aside>
		<div class="left-li">-&nbsp;&nbsp;推荐位管理</div>
		<aside class="left-group">
			<router-link :to="{name:'appRecommendBannerIndex'}" class="left-jump">精选轮播图</router-link>
			<!-- <router-link :to="{name:'appRecommendReadListIndex'}" class="left-jump">阅读列表</router-link> -->
			<router-link :to="{name:'appRecommendGuessLikeIndex'}" class="left-jump">猜你喜欢</router-link>
			<router-link :to="{name:'appRecommendHotReviewIndex'}" class="left-jump">热评</router-link>
		</aside>
	</section>
</template>
<script>
$(function(){
	$(".left").css("height",'1000px');
$(".left-li").unbind("click").click(function(){
	var index=$(".left-li").index(this);
	$(".left-group").eq(index).toggle();
});
})

</script>
<style lang="less">
@import "../../public.less";
.left{
	.flex-grow(160px);
	width:160px;
	height: 100%;
	background: #FFFFFF;
	line-height: 24px;
	font-size: 12px;
}
.left-li{
	padding-left: 30px;
}
.left-group{
	/*display: none;*/
}
.left-jump{
	display: block;
	padding-left:50px;
	color: #000;
}
</style>
