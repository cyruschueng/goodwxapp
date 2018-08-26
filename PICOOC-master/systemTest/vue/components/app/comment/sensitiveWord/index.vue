<template>
	<div class="sensitiveWordIndex">
		<div class="title">管理后台 > APP > 评论管理 > 敏感词管理</div>
		<search @search="search"/>
		<div class="add" @click="showAdd">新增</div>
		<div class="add changeClick changeClickActive" @click="changeClick(0)">先发后审</div>
		<div class="add changeClick" @click="changeClick(1)" >先审后发</div>
		<aside class="tabTop">
			<pageList :currentPage="currentPage" :pageCount="pageCount" :pageChangeNum="pageChangeNum" @changeCurrentPage="changeCurrentPage" @changePageChangeNum="changePageChangeNum"></pageList>
		</aside>
		<section class="tab">
			<aside class="tabLi tabTitle">
				<div class="tabId">ID</div>
				<div class="tabName">敏感词</div>
				<div class="tabOperation">操作</div>
			</aside>
			<aside class="tabLi tabTitle" v-for="(item,index) in tabList">
				<div class="tabId">{{item.id}}</div>
				<div class="tabName">{{item.word}}</div>
				<div class="tabOperation"><div class="delete" @click="deleteConfirm(item.id,index)">删除</div></div>
			</aside>
			<aside class="articleCommentAdd">
				<div class="close" @click="closeAdd">关闭</div>
				<div class="titleName">新增敏感词</div>
				<div class="uid">敏感词类型</div>
				<div class="type">
				
					<input type="radio" class="typeInput" name="articleCommentAddType" value="1" checked="checked" />先发后审
					<input type="radio" class="typeInput typeInput2" name="articleCommentAddType" value="2" />先审后发
				</div>
				<div class="reason">敏感词<textarea class="input reasonInput" /></textarea></div>
				<div class="add" @click="save">保存</div>
			</aside>
		</section>
		<fixBg :detaile="'确定删除该敏感词吗?'" :confirmData="confirmData" @confirmClick="deleteWord"></fixBg>
	
	</div>
</template>
<script>
import search from "../../public/search.vue";//引入别的vue
import fixBg from "../../public/fixBg.vue";//引入别的vue
import pageList from "../../public/pageList.vue";//引入别的vue
export default {
	props:['test'],
	components:{
		search,
		fixBg,
		pageList
	},
	data(){
		return {
			tabList:[],
			confirmData:{},
			type:0,
			currentPage:1,
			pageCount:1,
			pageChangeNum:1,
			searchData:""
		}
	},
	created:function(){
		getWindowSearch();
		this.getList(1);
	},
	methods:{
		getList:function(type,searchData){
			this.type=type;
			let finalUrl;
			if(typeof searchData !="undefined"){
				finalUrl=ajaxLink+'picooc-background/sensitiveword/list?'+token+windowSearch+"&type="+type+"&currentPage="+this.currentPage+"&pageSize="+publicData.pageSize+"&searchName="+searchData;
			}
			else{
				finalUrl=ajaxLink+"picooc-background/sensitiveword/list?"+token+windowSearch+"&type="+type+"&currentPage="+this.currentPage+"&pageSize="+publicData.pageSize;
			}
			let me=this;
			$.ajax({
				type:"get",
				url:finalUrl,
				success:function(data){
					if(data.code == 200){
						me.tabList=data.data.recordList;
						me.pageCount=data.data.pageCount;
					}
					else{
						alert(data.msg);
					}
				}
			})
		},
		changeCurrentPage:function(index){
			this.currentPage=index;
			this.getList(this.type,this.searchData);
		},
		changePageChangeNum:function(index){
			this.pageChangeNum=index;
		},
		changeClick:function(index){
			$(".changeClick").removeClass("changeClickActive");
			$(".changeClick").eq(index).addClass("changeClickActive");
			this.tabList=[];
			this.searchData="";
			this.currentPage=1;
			this.pageCount=1;
			this.pageChangeNum=1;
			this.getList(index+1);
		},
		showAdd:()=>{
			$(".articleCommentAdd").css("display","block");
		},
		closeAdd:()=>{
			$(".articleCommentAdd").css("display","none");
		},
		save:function(){
			let word=[];
			//console.log($(".reasonInput").val().split("\n"));
			//word.push($(".reasonInput").val());
			/*word.push($(".reasonInput").val());*/
			let strWord="";
			word=$(".reasonInput").val().split("\n");
			for(let i=0;i<word.length;i++){
				word[i]=word[i].replace(/ /g,"");
				console.log(word[i]==" ");
				if(word[i]=="" || word[i]==null || typeof(word[i])==undefined){
					word.splice(i,1);
					i=i-1;
				}
				else{
					if(i!=word.length){
						strWord+=word[i]+',';
					}
					else{
						strWord+=word[i];
					}
					
				}
			}
			let type;
			if($("input[name='articleCommentAddType']:checked").val()==1){
				type=1;
			}
			else{
				type=2;
			}
			if(strWord==""){
				alert("敏感词不能为空或空格");
				return true;
			}
			let jsonData={};
			jsonData.word=strWord;
			jsonData.type=type;
			let url=ajaxLink+"picooc-background/sensitiveword/add?"+token+windowSearch;
			let me=this;
			$.ajax({
				type:"post",
				url:url,
				data:JSON.stringify(jsonData),
				dataType:"json",
				contentType:"application/json; charset=utf-8",
				success:function(data){
					if(data.code == 200){
						alert(data.msg);
						me.closeAdd();
						router.go(0);
					}
					else{
						alert(data.msg);
					}
				}
			})
		},
		deleteConfirm:function(id,index){
			this.confirmData={
				id:id,
				index:index
			};
			$(".fixBg").css("display","block");
		},
		deleteWord:function(confirmData){
			let id=confirmData.id;
			let index=confirmData.index;
			let url=ajaxLink+"picooc-background/sensitiveword/delete?"+token+windowSearch+"&id="+id;
			let me=this;
			$.ajax({
				type:"get",
				url:url,
				success:function(data){
					if(data.code == 200){
						me.tabList.splice(index,1);
					}
					else{
						alert(data.msg);
					}
				}
			})
		},
		search:function(searchData){
			this.currentPage=1;
			this.searchData=searchData;
			this.getList(this.type,searchData);
			/*let url=ajaxLink+"picooc-background/sensitiveword/list?"+windowSearch+"&type="+this.type+"&searchName="+searchData;
			let me=this;
			$.ajax({
				type:"get",
				url:url,
				dataType:"json",
				contentType:"application/json;charset=UTF-8",
				success:function(data){
					if(data.code == 200){
						me.tabList=data.data.recordList;
					}
					else{
						alert(data.msg);
					}
				}
			})*/
		}

	}
}
</script>
<style lang="less">
@import "../../../../public.less";
.sensitiveWordIndex{
	.tab{
		width: 360px;
		.border-top(1px,#C1C7D2);
		.border-left(1px,#C1C7D2);
		.border-right(1px,#C1C7D2);
		font-size: 12px;
		margin-top: 20px;
		margin-bottom: 20px;
		background: #FFFFFF;
	}
	.tabLi{
		.flex;
		.border-bottom(1px,#C1C7D2);
		align-items:center;
		padding: 14px 0;
	}
	.tabId{
		.flex-grow(1);
		text-align: center;
	}
	.tabName{
		.flex-grow(2);
		.flex;
	}
	.tabOperation{
		.flex-grow(2);
		.flex;
	}
	.change{
		.flex-grow(2);
		color: #4A90E2;
		cursor:pointer
	}
	.delete{
		.flex-grow(2);
		color: #FD4F5D;
		cursor:pointer
	}
	.add{
		display: inline-block;
		background: #FFFFFF;
		padding: 0 23px;
		font-size: 12px;
		height: 30px;
		line-height: 30px;
		color: #4A90E2;
		margin-right: 20px;
		.border(1px,#C1C7D2);
		.border-radius(15px);
	}
	.changeClickActive{
		background: #EAEFF5;
	}
	.update{
		display: inline-block;
		background: #FFFFFF;
		padding: 0 23px;
		font-size: 12px;
		height: 30px;
		line-height: 30px;
		color: #4A90E2;
		.border(1px,#C1C7D2);
		.border-radius(15px);
		float: right;
	}
}
.articleCommentAdd{
	display: none;
	position: absolute;
	top: 25%;
	left: 50%;
	width: 440px;
	height: 286px;
	background: #fff;
	padding: 15px 20px;
	margin: 0 0 0 -220px;
	.border(1px,#C1C7D2);
	.border-radius(5px);
	.close{
		position: absolute;
		top: 10px;
		right: 10px;
		.cursor;
	}
	.titleName{
		margin-bottom: 13px;
	}
	.uid{
		height: 20px;
		line-height: 20px;
		position: relative;
		margin-bottom: 10px;
	}
	.typeInput{
		margin: 0 8px 0 0;
	}
	.typeInput2{
		margin-left: 40px;
	}
	.reason{
		height: 100px;
		line-height: 20px;
		position: relative;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.reasonInput{
		width: 230px;
		height: 100px;
		line-height: 20px;
		position: absolute;
		left: 40px;
		top: 0;
	}
	.add{
		display: inline-block;
		background: #FFFFFF;
		padding: 0 23px;
		font-size: 12px;
		height: 30px;
		line-height: 30px;
		color: #4A90E2;
		margin-right: 40px;
		.cursor;
		.border(1px,#C1C7D2);
		.border-radius(15px);
	}
}
</style>