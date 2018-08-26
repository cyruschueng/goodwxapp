<template>
	<div class="articleAdd">
		<div class="articleMain">
			<input type="text" ref="articleAddTitle" class="articleInput1" placeHolder="请输入文章标题（最多不超过50字）" />
			<div id="editor" cols="20" rows="2" class="ckeditor" placeHolder="请输入正文（最多不超过10000字）" ></div>
			<div class="list" >
				<div class="listMain" v-for="(item,index) in column">
					<div class="list_li" :class="{active:index==activeIndex}" :id="item.id" @click="changeColumn(index)">{{item.name}}</div>
				</div>
			</div>
			<div class="btnList">
				<div class="btn save" @click="submitArtice">提交审核</div>
				<div class="btn save" @click="save">保存</div>
				<div class="btn save" @click="preview">预览</div>
			</div>
		</div>
		<div id="qrcode">
			<div id="qrcodeUrl"></div>
			<div id="qrcodeClose" @click="closePreview">关闭</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return {
			column:[],
			activeIndex:0
		}
	},
	created:function(){
		this.getColumn();
	},
	mounted:function(){
		CKEDITOR.replace('editor',{
			 height: 600
		});
	},
	methods:{
		getColumn:function(){
			console.log(getCookie("token"));
			console.log(token);
			let me = this;
			let finalUrl = ajaxLink + 'picooc-background/expertBackground/article/programList?'+token;
			console.log(finalUrl);
			$.ajax({
				type: 'get',
				url: finalUrl,
				success: function (data) {
					if(data.code==200){
						/*for(let i=0,len=data.data.length;i<len;i++){
							me.column.push(data.data[i].name);
						}*/
						me.column=data.data;
						if(typeof me.$route.query.id!='undefined'){
							me.getArtice(me.$route.query.id);
						}
					}
					else{
						alert(data.msg);
					}
				}
			})
		},
		changeColumn:function(index){
			this.activeIndex=index;
		},
		getArtice:function(id){
			let me=this;
			let finalUrl = ajaxLink + 'picooc-background/expertBackground/article/get?'+token+"&id="+id;
			console.log(finalUrl);
			$.ajax({
				type: 'get',
				url: finalUrl,
				success: function (data) {
					if(data.code==200){
						me.$refs.articleAddTitle.value=data.data.title;
						if(typeof data.data.latestContent!="undefined"){
							setTimeout(function(){
								CKEDITOR.instances.editor.setData(data.data.latestContent);
							},500);
						}
						if(data.data.programs.length!=0){
							for(let i=0,len=data.data.programs.length;i<len;i++){
								for(let j=0;j<me.column.length;j++){
									if(data.data.programs[i].id==me.column[j].id){
										me.changeColumn(j);
									}
								}
							}
						}
					}
					else{
						alert(data.msg);
					}
				}
			})
		},
		save:function(type){
			let me = this;
			let ajaxData={};
			var CText=CKEDITOR.instances.editor.getData();
			ajaxData.title=this.$refs.articleAddTitle.value;
			ajaxData.programs=[];
			$(".list_li").each(function(){
				if($(this).hasClass("active")){
					let programsItem={"id":$(this).attr("id")};
					ajaxData.programs.push(programsItem);
					return true;
				}
			});
			ajaxData.ownerType=1;
			/*$(".list_li").each(function(){
				if($(this).hasClass("active")){
					ajaxData.programs={"id":$(this).attr("id")};
					return true;
				}
			});*/
			console.log(ajaxData.programs);
			ajaxData.latestContent=CText;
			let finalUrl;
			if(typeof this.$route.query.id=='undefined'){
				finalUrl = ajaxLink + 'picooc-background/expertBackground/article/add?'+token;
			}
			else{
				finalUrl = ajaxLink + 'picooc-background/expertBackground/article/update?'+token;
				ajaxData.id=this.$route.query.id;
			}
			
			$.ajax({
				type: 'post',
				url: finalUrl,
				data:JSON.stringify(ajaxData),
				dataType:"json",
				contentType:"application/json; charset=utf-8",
				success: function (data) {

					if(data.code==200){
						if(type==3){
							let finalUrl = ajaxLink + 'picooc-background/expertBackground/article/submitAudit?'+token+"&id="+data.data;
								console.log(finalUrl);
								$.ajax({
									type: 'get',
									url: finalUrl,
									success: function (data) {
										if(data.code==200){
											$(".alertWrap").css("display","block");
											$(".submitBox").css("display","block");
										}
										else{
											alert(data.msg);
										}
									}
								})
						}
						else if(type==4){
							$("#qrcode").css("display","block");
							$("#qrcodeUrl").html("");
							let qrcode,text;
							//text=ajaxLink+link;
							text=ajaxLink+'article/view/'+data.data;
							qrcode= new QRCode("qrcodeUrl", {
								text: text,
								width: 128,
								height: 128,
								colorDark : "#000000",
								colorLight : "#ffffff",
								correctLevel : QRCode.CorrectLevel.H
							});
							
							 
							qrcode.clear(); // 清除代码
							qrcode.makeCode(text); // 生成另外一个二维码
						}
						else{
							alert(data.msg);
						}
						
					}
					else{
						alert(data.msg);
					}
				}
			})
		},
		submitArtice:function(){

			this.save(3);
			//expertBackground/article/submitAudit
		},
		preview:function(){
			this.save(4);
		},
		closePreview:function(){
			
			$("#qrcode").css("display","none");
			$("#qrcodeUrl").html("");
		}
	}
}

</script>
<style lang="less">
	@import "../../../public.less";
.articleAdd{
	min-height: 100vh;
	width: 100%;
	position: relative;
	.articleMain{
		width: 380/@rem;
		margin: 0 auto;
	}
	.articleInput1{
		width: 100%;
		height: 25/@rem;
		line-height: 25/@rem;
		padding-left: 10px;
		font-size: 8/@rem;
		margin: 10/@rem 0;
		.border(1px,#999999);
		.border-radius(2/@rem);
	}
	.list{
		margin: 15/@rem 0 0;
		padding-bottom: 15/@rem;
		position: relative;
		.border-bottom(1px,#EBEBEB);
	}
	.listMain{
		display: inline-block;
	}
	.list_li{
		display: inline-block;
		width: 60/@rem;
		height: 20/@rem;
		line-height: 20/@rem;
		text-align: center;
		color: #999999;
		font-size: 8/@rem;
		margin-right: 10/@rem;
		.border(1px,#999999);
		.border-radius(2/@rem);
	}
	.active{
		color: #FFFFFF;
		background: #999999;
	}
	.btnList{
		position: relative;
		margin-top: 15/@rem;
	}
	.btn{
		display: inline-block;
		width: 90/@rem;
		height: 20/@rem;
		line-height: 20/@rem;
		font-size: 10/@rem;
		color: #303030;
		text-align: center;
		.border(1px,#303030);
		.border-radius(2/@rem);
		margin-right: 20/@rem;
		margin-bottom: 15/@rem;
	}
	.btn:hover{
		background: #303030;
		color: #fff;
		.cursor;
	}
	#qrcode{
		display: none;
		width: 180px;
		height: 180px;
		background: #e3e3e3;
		position: fixed;
		top: 40%;
		left: 50%;
		z-index: 999;
	}
	#qrcodeUrl{
		position: absolute;
		width: 128px;
		height: 128px;
		top: 50%;
		left: 50%;
		margin: -64px 0 0 -64px;
	}
	#qrcodeClose{
		position: absolute;
		top: 10px;
		right: 10px;
	}
}
</style>
