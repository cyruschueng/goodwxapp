<template>
	<div class="systemLoad">
		<div class="systemLoadMain">
		<div class="type1">用户名</div>
		<input type="text" class="input name" />
		<div class="type1">密码</div>
		<input type="text" class="input password" />
		<div class="save" @click="loadSystem">登录</div>
		</div>
	</div>
</template>
<script>
export default {
	methods:{
		loadSystem:function(){
			let url=ajaxLink + 'picooc-background/user/login';
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
				  	//alert(data.msg);
				  	setCookiePath("token",data.data,1,"/;domain=picooc.com");
				  	window.location.href="loadSuccess.html";
				  	
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
	.systemLoadMain{
		position: absolute;
		top: 50%;
		left: 50%;
		width: 300px;
		height: 400px;
		margin-left: -150px;
		margin-top: -200px;
	}
	.type1{
		display: block;
		font-weight: 500;
		margin: 10px 0;
	}
	.input{
		width: 300px;
		height: 30px;
		line-height: 30px;
		padding-left: 10px;
		.border(1px,#C1C7D2);
	}
	.save{
		width: 70px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		margin-top: 25px;
		color: #4C91E3;
		.border(1px,#4C91E3);
		.border-radius(15px);
		.cursor;
	}
}

</style>