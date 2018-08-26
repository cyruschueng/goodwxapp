<template>
	<div class="alertWrap">
		<div class="submitBox">
			<h3 class="title">作品提交成功</h3>
			<p class="desc">亲爱的有品达人用户，运营同学将在1个工作日内审核稿件，请耐心等待，审核状态请留意达人创作平台中心。如有疑问请邮件咨询：<span class="email">daren@picooc.com</span></p>
			<div class="chooseBtn flex">
				<!--<div class="myArticle">我的文章</div>-->
				<router-link class="myArticle" :to="{name:'outAppArticleIndex'}">我的文章</router-link>
				<router-link class="continueWrite" :to="{name:'outAppArticleAdd'}">继续写稿</router-link>
			</div>
		</div>
		<div class="erWeiMaBox">
			<div class="parts top"><img class="close" src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/close.png " alt=""></div>
			<div class="erWeiMa">
				<img src="http://picoocheadportrait.oss-cn-beijing.aliyuncs.com/web/res/system/images/erWeiMa.png" alt="">
				<br/>
				扫码查看文章
			</div>
			<div class="parts bottom">
				<img class="logo" src="https://cdn2.picooc.com/web/res/system/images/picoocLogo.png" alt=""><span>达人创作平台</span>
			</div>
		</div>
		<div class="errorAlert">132131</div>
	</div>
</template>

<style lang="less">
@import "../public.less";

.alertWrap{
	display: none;
	position: absolute;
	width: 100%;
	height: 100%;
	background: RGBA(0,0,0,.5);
	z-index: 999;
	/*opacity: 0.5;*/
	.submitBox{
		display: none;
		margin: 0 auto;
		margin-top: 20%;
		width:230/@rem;
		background-color: #fff;
		border-radius: 5/@rem;
		.title{
			font-size: 12/@rem;
			color: #666666;
			text-align: center;
			height: 30/@rem;
			line-height: 30/@rem;
		}
		.desc{
			margin: 10/@rem 12/@rem;
			font-size: 10/@rem;
			color: #999999;
			letter-spacing: 0;
			line-height: 18/@rem;
			.email{
				font-size: 10/@rem;
				color: #1BB0F9;
			}
		}
		.chooseBtn{
			border-top:1px solid #CCCCCC;
			*{
				flex-grow: 1;
				height: 25/@rem;
				line-height: 25/@rem;
				text-align: center;
			}
			.continueWrite{
				color: #1BB0F9;
				border-left:1px solid #CCCCCC;
			}
		}
	}
	.erWeiMaBox{
		display: none;
		margin: 0 auto;
		margin-top: 20%;
		width:150/@rem;
		background-color: #303030;
		border-radius: 5/@rem;
		.parts{
			height: 21/@rem;
			line-height: 21/@rem;
		}
		.top{
			text-align: right;
			img{
				width: 14/@rem;
				margin-right: 6/@rem;
			}
		}
		.bottom{
			text-align: center;
			.logo{
				width: 30/@rem;
				border-right: 1px solid #fff;
				padding-right: 5/@rem;
				margin-right: 5/@rem;
			}
			span{
				font-size: 8/@rem;
				color: #FFFFFF;
			}
		}
		.erWeiMa{
			text-align: center;
			font-size: 12/@rem;
			color: #544C6B;
			padding-bottom:15/@rem;
			background-color: #fff;

			img{
				width: 80/@rem;
				margin: 15/@rem 0;
			}
		}
	}
	.errorAlert{
		display: block;
	}
}

</style>
<script type="text/javascript">
	$(function(){
		$('.chooseBtn .myArticle').unbind('click').click(function(){
			$('body').css('overflow','auto');
			$('.alertWrap .submitBox').hide();
			$('.alertWrap').hide();
		});
		$('.chooseBtn .continueWrite').unbind('click').click(function(){
			$('body').css('overflow','auto');
			$('.alertWrap .submitBox').hide();
			$('.alertWrap').hide();
		});
		$('.erWeiMaBox .close').unbind('click').click(function(){
			$('body').css('overflow','auto');
			$('.alertWrap .erWeiMaBox').hide();
			$('.alertWrap').hide();
		});
	});
</script>