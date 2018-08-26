<template>
	<div class="systemLoad">
		<div class="header">
			<div class="header-img"><img src="https://cdn2.picooc.com/web/res/system/static/image/bg/icon1.png" /></div>
			<div class="header-p">|&nbsp;达人创作平台</div>
		</div>
		<div class="systemLoadMain">
		<div class="title">账号登录</div>
		<input type="text" class="input name" placeHolder="手机号/邮箱" />
		<input type="text" class="input password"  placeHolder="密码" />
		<div class="save" @click="loadSystem">登录</div>
		</div>
	</div>
</template>
<script>
export default {
	methods:{
		loadSystem:function(){
			let url=ajaxLink + 'picooc-background/expertBackground/user/login';
			let ajaxData={};
			ajaxData.userName=$(".name").val();
			ajaxData.password=$(".password").val();
			$.ajax({
				type:'post',
				url:url,
				//data:'{"title":"55","dsc":"55"}',
				data:JSON.stringify(ajaxData),
				dataType:"json",
				contentType:"application/json; charset=utf-8",
				success:function(data){
				  if(data.code == 200){
				  	alert(data.msg);
				  	setCookiePath("outToken",data.data.token,1,"/;domain=picooc.com");
				  	window.location.href="outIndex.html";
				  	
				  }else{
					alert(data.msg);
				  }
				},
				error:function(error){
				  console.log(error);
				}
		  });
		}
	}
}
</script>
<style lang="less">
@import "../../public.less";
.systemLoad{
	position: relative;
	min-height: 100vh;
	background: center center no-repeat ;
	background-size: cover;
	background-image: url("https://cdn2.picooc.com/web/res/system/static/image/bg/loadBg.png");
	.header{
		position: fixed;
		top: 12/@rem;
		left: 30%;
		width: 180/@rem;
		height: 17/@rem;
	}
	.header-img{
		position: absolute;
		left: 0;
		top: 1.5/@rem;
		width: 60/@rem;
		height: 14/@rem;
	}
	.header-img img{
		width: 100%;
		vertical-align: baseline;
	}
	.header-p{
		position: absolute;
		right: 0;
		top: 0;
		font-size: 17/@rem;
		line-height: 17/@rem;
	}
	.systemLoadMain{
		position: absolute;
		top: 50%;
		left: 50%;
		width: 280/@rem;
		height: 165/@rem;
		margin-left: -140/@rem;
		margin-top: -82.5/@rem;
		padding: 15/@rem 42/@rem 0;
		font-size: 10/@rem;
		background: rgba(255,255,255,0.50);
		.border(1px,#889EC4);
	}
	.title{
		font-size: 14/@rem;
		line-height: 20/@rem;
		color: #737CA2;
		margin-bottom: 15/@rem;
		font-weight: 700;
	}
	.input{
		width: 190/@rem;
		height: 20/@rem;
		line-height: 20/@rem;
		padding-left: 5/@rem;
		.border(1px,#C1C7D2);
	}
	.name{
		margin-bottom: 10/@rem;
	}
	.save{
		width: 190/@rem;
		height: 20/@rem;
		line-height: 20/@rem;
		text-align: center;
		margin-top: 25/@rem;
		background: #1BB0F9;
		color: #ffffff;
		.border-radius(2/@rem);
		.cursor;
	}
}

</style>