<template>
	<footer class="footerWrap">
		<div class="footer flex">
			<div class="item">2013-2017 缤刻普锐（北京）科技有限公司保留所有权利    京ICP备13035511号  |  用户协议</div>
		</div>
	</footer>
</template>
<style lang="less">
@import "../public.less";

.footerWrap{
	display: none;
	min-width: 1244px;
	.border-bottom;
	height: 50/@rem;
	background: #303030;
	color: #fff;
	/*font-size: 12px;*/
	.footer{
		padding: 0 25/@rem;
		height: 100%;
		width: 1244px;
		font-size: 7/@rem;
		margin: 0 auto;
		align-items:center;
		justify-content:space-between;
	}
}

</style>
<script type="text/javascript">
	$(function(){
		var headerWrap = $('.headerWrap').height();
		var footerWrap = $('.footerWrap').height();
		$('.outAppMainWrap').css('min-height', $(window).height() - headerWrap - footerWrap-5);
		$('.footerWrap').fadeIn();
	});
</script>
