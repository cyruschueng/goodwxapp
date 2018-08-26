<template>
	<div class="articleAdd">
		<div class="title">管理后台 > APP > 内容管理 > 达人文章管理 > 新增</div>
		<div class="type">*文章标题</div>
		<input class="articleTitle" />
		<div class="type">*所属板块</div>
		<div class="articlePlateTotol">
			<div class="articlePlateList" v-for="(item,index) in column">
				<div class="articlePlateListP" v-if="index==0">
				<input type="checkbox" class="articlePlate" name="plate" :value="item.id"   /><span>{{item.name}}</span>
				</div>
				<div class="articlePlateListP" v-else >
				<input type="checkbox" class="articlePlate articlePlate2" name="plate" :value="item.id"   /><span>{{item.name}}</span>
				</div>
			</div>
		</div>
		<div class="type">*摘要</div>
		<textarea class="articleAbstract" ></textarea>
		<div class="type">*列表图</div>
		<div class="articleListViewBg">
			<input class="articleListView" type="file" @change="upLoadImg(1,$event)" />
		</div>
		<div class="articleListViewBtn">
			<div class="articleListViewChange"><input class="articleListViewChangeInput" type="file" @change="upLoadImg(1,$event)" />修改</div>
			<div class="articleListViewDelete" @click="deleteImg(1,$event)">删除</div>
		</div>
		<!-- <div class="type">*作者</div>
		<select class="articleAuthorSelection">
			<option v-for="item in authors" :value="item.id">{{item.name}}</option>
		</select> -->
		<div class="type">*分享标题</div>
		<input class="articleShareTitle" />
		<aside class="articleShareFlex">
			<div class="articleShareFlexLi">
				<div class="type">*分享描述</div>
				<textarea class="articleShareInfo" ></textarea>
			</div>
			<div class="articleShareFlexLi2">
				<div class="type">*分享小图</div>
				<div class="articleShareImg">
					<input class="articleShareImgUpload" type="file"  @change="upLoadImg(2,$event)"/>
				</div>
				<div class="articleShareImgBtn">
					<div class="articleShareImgChange"><input class="articleShareImgChangeInput" type="file" @change="upLoadImg(2,$event)" />修改</div>
					<div class="articleShareImgDelete" @click="deleteImg(2,$event)">删除</div>
				</div>
			</div>
		</aside>
		<div class="type">*文章图片类型</div>
		<aside class="imgTypeList">
			<div class="imgTypeList_li">
				<input type="radio" class="imgTypeList_li_input" name="imgTypeList_li_input" :value="0"  />原老版本文章
			</div>
			<div class="imgTypeList_li">
				<input type="radio" class="imgTypeList_li_input " name="imgTypeList_li_input" :value="1"   />短图
			</div>
			<div class="imgTypeList_li">
				<input type="radio" class="imgTypeList_li_input " name="imgTypeList_li_input" :value="2"   />长图
			</div>
		</aside>
		<div class="type">*文章类型</div>
		<aside class="typeList">
			<div class="typeList_li">
				<input type="radio" class="typeList_li_input" name="typeList_li_input" :value="0"  checked="checked" />图文
			</div>
			<div class="typeList_li">
				<input type="radio" class="typeList_li_input " name="typeList_li_input" :value="1"   />达人
			</div>
			<!-- <div class="typeList_li">
				<input type="radio" class="typeList_li_input " name="typeList_li_input" :value="2"   />投票
			</div>
			<div class="typeList_li">
				<input type="radio" class="typeList_li_input " name="typeList_li_input" :value="3"   />问答
			</div> -->
		</aside>
		<div class="type">*正文</div>
		<div id="editor" cols="20" rows="2" class="ckeditor"></div>
		<div class="type">初始点赞数</div>
		<input class="articleInitialZan" />
		<div class="save" @click="addArticle">保存</div>
	</div>
</template>
<script>
import search from "../../public/search.vue";//引入别的vue

export default {
	props:[],
	components:{
		search
	},
	data(){
		return {
			authors:[],
			column:[]
		}
	},
	created:function(){
		getWindowSearch();
	},
	mounted:function(){
		CKEDITOR.replace('editor',{
			 height: 600
		});
		this.getAddView();
	},
	methods:{
		getAddView:function(){
			let me=this;
			let url=ajaxLink+"picooc-background/article/addView?"+token+windowSearch;
			$.ajax({
				type:"get",
				url:url,
				dataType:"json",
				success:function(data){
					if(data.code == 200){
						me.authors=data.data.authors;
						me.column=data.data.programs;
						//alert(windowSearch);
						//alert(getParamByUrl("id"));
						if(getParamByUrl("id")!="false"){
							me.getArticle();
						}
					}
				}
			})
		},
		getArticle:function(){
			//alert(windowSearch);
			let me=this;
			let url=ajaxLink+"picooc-background/article/get?"+token+windowSearch;
			$.ajax({
				type:"get",
				url:url,
				dataType:"json",
				success:function(data){
					if(data.code == 200){
						$(".articleTitle").val(data.data.title);
						if(data.data.programs.length!=0){
							for(let i=0,len=data.data.programs.length;i<len;i++){
								for(let j=0;j<me.column.length;j++){
									if(data.data.programs[i].id==me.column[j].id){
										$(".articlePlate").eq(j).attr("checked","checked");
									}
								}
							}
						}
						if(data.data.dsc!=undefined){
							$(".articleAbstract").val(data.data.dsc);
						}
						if(data.data.image!=undefined){
							$(".articleListViewBg").css("background-image",'url('+data.data.image+')');
						}
						if(data.data.authorId!=undefined){
							$(".articleAuthorSelection").val(data.data.authorId);
						}
						if(data.data.shareTitle!=undefined){
							$(".articleShareTitle").val(data.data.shareTitle);
						}
						if(data.data.shareDsc!=undefined){
							$(".articleShareInfo").val(data.data.shareDsc);
						}
						if(data.data.shareImage!=undefined){
							$(".articleShareImg").css("background-image",'url('+data.data.shareImage+')');
						}
						if(data.data.listType!=undefined){
							$(".imgTypeList_li_input").removeAttr("checked","checked");
							$(".imgTypeList_li_input").eq(data.data.listType).attr("checked","checked");
						}
						if(data.data.type!=undefined){
							$(".typeList_li_input").removeAttr("checked","checked");
							$(".typeList_li_input").eq(data.data.type).attr("checked","checked");
						}
						if(data.data.praiseBase!=undefined){
							$(".articleInitialZan").val(data.data.praiseBase);
						}
						if(data.data.latestContent!=undefined){
							
							
							/*CKEDITOR.instances.editor.setData(data.data.latestContent);*/
							
							setTimeout(function(){
								CKEDITOR.instances.editor.setData(data.data.latestContent);
							},500);
						}
						
					}
				}
			})
		},
		addArticle:()=>{
			 // var CText=CKEDITOR.instances.WORK_INTRODUCTION.document.getBody().getText();
			 var CText=CKEDITOR.instances.editor.getData();
			//alert(CText);
			//alert($(".articleAuthorSelection").val());
			if($(".articleTitle").val().length>50){
				alert("文章标题最长不超过50字");
				return true;
			}
			if($(".articleAbstract").val().length>50){
				alert("文章摘要最长不超过50字");
				return true;
			}
			if($(".articleShareTitle").val().length>50){
				alert("文章分享标题最长不超过50字");
				return true;
			}
			if($(".articleShareInfo").val().length>50){
				alert("文章分享描述最长不超过50字");
				return true;
			}
			let ajaxData={};
			ajaxData.title=$(".articleTitle").val();
			ajaxData.programs=[];
			$(".articlePlate").each(function(){
				if($(this).is(":checked")){
					let programsItem={"id":$(this).val()};
					ajaxData.programs.push(programsItem);
				}
			});

			
			ajaxData.dsc=$(".articleAbstract").val();
			

			ajaxData.image=$(".articleListViewBg").css("background-image").split("(\"")[1];
			if(ajaxData.image!="" && typeof ajaxData.image!="undefined"){
				ajaxData.image=ajaxData.image.split("\")")[0];
			}
			//alert(ajaxData.image);
			ajaxData.authorId=$(".articleAuthorSelection").val();

			ajaxData.shareTitle=$(".articleShareTitle").val();

			ajaxData.shareDsc=$(".articleShareInfo").val();
			

			
			ajaxData.shareImage=$(".articleShareImg").css("background-image").split("(\"")[1];
				if(ajaxData.shareImage!="" && typeof ajaxData.shareImage!="undefined"){
					ajaxData.shareImage=ajaxData.shareImage.split("\")")[0];
				}
			$(".imgTypeList_li_input").each(function(){
				if($(this).is(":checked")){
					ajaxData.listType=$(this).val();
					return true;
				}
			});
			$(".typeList_li_input").each(function(){
				if($(this).is(":checked")){
					ajaxData.type=$(this).val();
					return true;
				}
			});

			if($(".articleInitialZan").val()!=""){
				ajaxData.praiseBase=$(".articleInitialZan").val();
			}
			ajaxData.latestContent=CText;
			let url;
			if(getParamByUrl("id")!="false"){
				ajaxData.id=getParamByUrl("id");
				url=ajaxLink+"picooc-background/article/update?"+token;
			}
			else{
				url=ajaxLink+"picooc-background/article/add?"+token;
			}
			$.ajax({
				type:"post",
				url:url,
				//data:'{"title":"55","dsc":"55"}',
				data:JSON.stringify(ajaxData),
				dataType:"json",
				contentType:"application/json; charset=utf-8",
				success:function(data){
					if(data.code == 200){
						alert(data.msg);
						router.push({ path: 'appContentOutArticleIndex' });
					}
					else{
						alert(data.msg);
					}
				}
			})
		},
		upLoadImg:(type,event)=>{
			let file = event.target.files[0];
			let storeAs = 'web/res/system/test/';
			// console.log(file.name + ' => ' + storeAs);

			//时间戳加图片后缀名
			var imgTimestamp = Date.parse(new Date())+'.'+file.name.split(".")[1]; 
			client.multipartUpload(storeAs + imgTimestamp, file).then(function (result) {
				var url2 = "https://cdn2.picooc.com/" + result.name;
				if(type==1){
					$(".articleListViewBg").eq(0).css("background-image",'url('+url2+')');
				}
				else if(type==2){
					$(".articleShareImg").eq(0).css("background-image",'url('+url2+')');
					
				}
				
			}).catch(function (err) {
				alert(err);
				console.log(err);
			});
			
		},
		deleteImg(type,event){
			if(type==1){
				$(".articleListView").val("");
				$(".articleListViewBg").eq(0).css("background-image",'');
			}
			else if(type==2){
				$(".articleShareImgUpload").val("");
				$(".articleShareImg").eq(0).css("background-image",'');
				
			}
		},
		setEditor:()=>{
			
		}
	}
}

</script>
<style lang="less">
@import "../../../../public.less";
.articleAdd{
	.type{
		margin-top: 25px;
		margin-bottom: 15px;
		font-weight: 700;
	}
	.type1 span{
		color: #2A2A2A;
	}
	.articleTitle{
		width: 560px;
		height: 30px;
		line-height: 30px;
		.border(1px,#C1C7D2);
		.border-radius(2px);
		padding-left: 5px;
		margin-top: 15px;
	}
	.articlePlateList{
		display: inline-block;
		//.flex-grow(160px);
		width: 200px;
	}
	.articlePlateListP{
		display: inline-block;
		
	}
	.articlePlate{
		width: 14px;
		height: 14px;
		margin: 0 8px 0 0;
	}
	.articlePlate2{
		//margin-left: 70px;
	}
	.articleAbstract{
		width: 540px;
		height: 90px;
		line-height: 30px;
		.border(1px,#C1C7D2);
	}
	.articleListViewBg{
		width: 160px;
		height: 90px;
		position: relative;
		.border(1px,#C1C7D2);
		margin-bottom: 10px;
		background: center center no-repeat;
		background-size: contain; 
		background-image: url("https://cdn2.picooc.com/web/res/system/static/image/bg/1.png");
	}
	.articleListView{
		width: 160px;
		height: 90px;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}
	.articleListViewBtn{
		position: relative;
		width: 160px;
		text-align: right;
	}
	.articleListViewChange{
		display: inline-block;
		color: #4A90E2;
		cursor:pointer;
		position: relative;
		width: 40px;
		height: 20px;
		line-height: 20px;
		overflow: hidden;
	}
	.articleListViewChangeInput{
		position: absolute;
		width: 40px;
		height: 20px;
		left: 0;
		top: 0;
		opacity: 0;
	}
	.articleListViewDelete{
		display: inline-block;
		color: #FD4F5D;
		margin-left: 20px;
		width: 40px;
		height: 20px;
		line-height: 20px;
		cursor:pointer;
	}
	.articleAuthorSelection{
		width: 320px;
		height: 30px;
	}
	.articleShareTitle{
		width: 350px;
		height: 30px;
		line-height: 30px;
		.border(1px,#C1C7D2);
	}
	.articleShareFlex{
		.flex;
	}
	.articleShareFlexLi{
		.flex-grow(400px);
		width: 400px;
	}
	.articleShareFlexLi2{
		.flex-grow(1);
	}
	.articleShareInfo{
		display: inline-block;
		width: 350px;
		height: 90px;
		line-height: 24px;
		.border(1px,#C1C7D2);
	}
	.articleShareImg{
		width: 160px;
		height: 90px;
		position: relative;
		line-height: 24px;
		.border(1px,#C1C7D2);
		margin-bottom: 10px;
		background: center center no-repeat;
		background-size: contain; 
		background-image: url("https://cdn2.picooc.com/web/res/system/static/image/bg/2.png");
	}
	.articleShareImgUpload{
		display: inline-block;
		position: absolute;
		left: 0;
		top: 0;
		width: 160px;
		height: 90px;
		opacity: 0;
	}
	.articleShareImgBtn{
		width: 160px;
		text-align: right;
	}
	.articleShareImgChange{
		display: inline-block;
		color: #4A90E2;
		position: relative;
		width: 40px;
		height: 20px;
		line-height: 20px;
		cursor:pointer;
		overflow: hidden;
	}
	.articleShareImgChangeInput{
		position: absolute;
		width: 40px;
		height: 20px;
		left: 0;
		top: 0;
		opacity: 0;
	}
	.articleShareImgDelete{
		display: inline-block;
		color: #FD4F5D;
		margin-left: 20px;
		width: 40px;
		height: 20px;
		line-height: 20px;
		cursor:pointer;
	}
	.imgTypeList{
		.flex();
	}
	.imgTypeList_li{
		.flex-grow(100px);
		width: 100px;
	}
	.imgTypeList_li_input{
		width: 14px;
		height: 14px;
    	margin: 0 8px 0 0;
	}
	.typeList{
		.flex();
	}
	.typeList_li{
		.flex-grow(100px);
		width: 100px;
	}
	.typeList_li_input{
		width: 14px;
		height: 14px;
    	margin: 0 8px 0 0;
	}
	.articleInitialZan{
		width: 160px;
		height: 30px;
		line-height: 30px;
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
	}
}
</style>