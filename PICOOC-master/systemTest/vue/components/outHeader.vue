<template>
	<header class="headerWrap">
		<div class="header flex">
			<router-link class="item" :to="{name:'/'}" ><img class="logo" src="https://cdn2.picooc.com/web/res/system/images/picoocLogo.png" alt=""><span>达人创作平台</span></router-link>
			<div class="item headImgBox"><img class="headImg" id="headImgIcon" src="" alt=""><span class="logout" @click="logoutFun">登出</span></div>
		</div>
	</header>
</template>

<script type="text/javascript">
	export default{
		data: function () {
			return{

			}
		},
		methods:{
			logoutFun: function () {
				delCookiePath('token',"/;domain=picooc.com");
				window.location.href="outLoad.html";
			}
		}
	}
</script>

<style lang="less">
@import "../public.less";

.headerWrap{
	min-width: 1244px;
	.border-bottom;
	height: 50/@rem;
	/*line-height: 50px;*/
	background: #303030;
	color: #fff;
	/*font-size: 12px;*/
	.header{
		padding: 0 25/@rem;
		height: 100%;
		width: 1244px;
		font-size: 12/@rem;
		margin: 0 auto;
		align-items:center;
		justify-content:space-between;
		.item{
			color: #fff;
			.logo{
				padding-right: 10/@rem;
				margin-right: 10/@rem;
				width: 60/@rem;
				border-right: 1/@rem solid #fff;
			}
			.headImg{
				width: 20/@rem;
				height: 20/@rem;
				border-radius: 10/@rem;
			}
		}

		.headImgBox{
			position: relative;
			.logout{
				cursor:pointer;
				width: 35/@rem;
				text-align: center;
				left: -6/@rem;
				bottom: -24/@rem;
				height: 18/@rem;
				line-height: 17/@rem;
				background-color: #fff;
				border: 1px solid #999999;
				color: #999999;
				font-size: 8/@rem;
				position: absolute;
			}
		}
	}
}

</style>
