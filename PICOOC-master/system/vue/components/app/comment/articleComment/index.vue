<template>
	<div class="articleCommentIndex">
		<div class="title">管理后台 > APP > 评论管理 > 文章评论</div>
		<search @search="search" />
		<!-- <router-link class="add addActive" :to="{name:'appCommentArticleCommentIndex'}">待审核</router-link>

		<router-link class="add" :to="{name:'appCommentArticleCommentPass'}">已通过</router-link>
		<router-link class="add" :to="{name:'appCommentArticleCommentDelete'}">已删除</router-link> -->
		<aside class="tabTop">
			<div  class="jumpBtn jumpBtnActive" @click="changeType(0)">待审核</div>
			<div  class="jumpBtn" @click="changeType(1)">已通过</div>
			<div  class="jumpBtn" @click="changeType(2)">已删除</div>
			<pageList :currentPage="currentPage" :pageCount="pageCount" :pageChangeNum="pageChangeNum" @changeCurrentPage="changeCurrentPage" @changePageChangeNum="changePageChangeNum"></pageList>
		</aside>
		<section class="tab">
			<aside class="tabLi tabTitle">
				<div class="tabId">ID</div>
				<div class="tabCommentInfo">评论详情</div>
				<div class="tabUser">用户</div>
				<div class="tabIP">IP</div>
				<div class="tabTime">时间</div>
				<div class="tabArticle">文章</div>
				<div class="tabReason" v-show="type==0">待审原因</div>
				<div class="tabLastOperation" v-show="type==1 || type==2">最后操作</div>
				<div class="tabOperation">操作</div>
			</aside>
			<aside class="tabLi tabTitle" v-for="(item,index) in tabList">
				<div class="tabId">{{item.id}}</div>
				<div class="tabCommentInfo" @click="showComment(item.comment)">{{item.comment}}</div>
				<div class="tabUser">
					<div class="tabUserName">{{item.userId}}</div>
					<div class="forbid" @click="addDisplay(item.userId)">禁言</div>
				</div>
				<div class="tabIP">{{item.ip}}</div>
				<div class="tabTime">
					{{item.createTime}}
				</div>
				<div class="tabArticle">{{item.title}}</div>
				<div class="tabReason" v-show="type==0">{{item.reason}}</div>
				<div class="tabLastOperation" v-show="type==1 || type==2" v-html="item.lastOperationRecord"></div>
				<div class="tabOperation">
					<div class="change"  v-show="type==0" @click="commentPass(item.id,item.type,index)">通过</div>
					<div class="delete"  v-show="type==0 || type==1" @click="deleteConfirm(item.id,item.type,index)">删除</div>
					<div class="recover" v-show="type==2" @click="commentRecover(item.id,item.type,index)">恢复</div>
				</div>
			</aside>
			<forbidAdd :uid="forbidUid"></forbidAdd>
		</section>
		<fixBg :detaile="'确定删除该评论吗?'" :confirmData="confirmData" @confirmClick="commentDelete"></fixBg>
		<div class="showComment">
			<div class="close" @click="closeShowComment">关闭</div>
			<div class="info"></div>
		</div>
	</div>
</template>
<script>
import search from "../../public/search.vue";//引入别的vue
import forbidAdd from "../forbidUser/add.vue";//引入别的vue
import pageList from "../../public/pageList.vue";//引入别的vue
import fixBg from "../../public/fixBg.vue";//引入别的vue
export default {
	props:['test'],
	components:{
		search,
		forbidAdd,
		pageList,
		fixBg
	},
	data(){
		return {
			type:0,
			tabList:[],
			currentPage:1,
			pageCount:1,
			pageChangeNum:1,
			forbidUid:"",
			confirmData:{},
			searchData:""
		}
	},
	created:function(){
		getWindowSearch();
		this.getList();
	},
	methods:{
		addDisplay:function(uid){
			this.forbidUid=uid;
			$(".forbidUserAdd").css("display","block");
		},
		getList:function(searchData){
			let status=1;
			if(this.type==1){
				status=2;
			}
			else if(this.type==2){
				status=-1;
			}
			let finalUrl;
			if(typeof searchData !="undefined"){
				finalUrl=ajaxLink+'picooc-background/commentandreply/list?'+token+windowSearch+"&status="+status+"&currentPage="+this.currentPage+"&pageSize="+publicData.pageSize+"&searchName="+searchData;
			}
			else{
				finalUrl=ajaxLink+'picooc-background/commentandreply/list?'+token+windowSearch+"&status="+status+"&currentPage="+this.currentPage+"&pageSize="+publicData.pageSize;
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
		changeType:function(type){
			this.type=type;
			this.tabList=[];
			this.currentPage=1;
			this.pageChangeNum=1;
			$(".jumpBtn").removeClass("jumpBtnActive");
			$(".jumpBtn").eq(type).addClass("jumpBtnActive");
			this.searchData="";
			this.getList();
		},
		commentPass:function(id,type,index){
			let url=ajaxLink+'picooc-background/commentandreply/pass?'+token+windowSearch+"&id="+id+"&type="+type;
			let me=this;
			$.ajax({
				type:"get",
				url:url,
				success:function(data){
					if(data.code == 200){
						me.tabList.splice(index,1);
						alert(data.msg);
					}
					else{
						alert(data.msg);
					}
				}
			})
		},
		deleteConfirm:function(id,type,index){
			this.confirmData={
				id:id,
				type:type,
				index:index
			};
			$(".fixBg").css("display","block");
		},
		commentDelete:function(confirmData){
			let id=confirmData.id;
			let type=confirmData.type;
			let index=confirmData.index;
			let url=ajaxLink+'picooc-background/commentandreply/delete?'+token+windowSearch+"&id="+id+"&type="+type;
			let me=this;
			$.ajax({
				type:"get",
				url:url,
				success:function(data){
					if(data.code == 200){
						me.tabList.splice(index,1);
						alert(data.msg);
					}
					else{
						alert(data.msg);
					}
				}
			})
		},
		commentRecover:function(id,type,index){
			let url=ajaxLink+'picooc-background/commentandreply/reject?'+token+windowSearch+"&id="+id+"&type="+type;
			let me=this;
			$.ajax({
				type:"get",
				url:url,
				success:function(data){
					if(data.code == 200){
						me.tabList.splice(index,1);
						alert(data.msg);
					}
					else{
						alert(data.msg);
					}
				}
			})
		},
		changeCurrentPage:function(index){
			this.currentPage=index;
			this.getList(this.searchData);
		},
		changePageChangeNum:function(index){
			this.pageChangeNum=index;
		},
		search:function(searchData){
			this.currentPage=1;
			this.searchData=searchData;
			this.getList(searchData);
			
			/*let status=2;
			if(this.type==1){
				status=1;
			}
			else if(this.type==2){
				status=-1;
			}
			let url=ajaxLink+"picooc-background/commentandreply/list?"+windowSearch+"&searchName="+searchData+"&status="+status+"&currentPage="+1+"&pageSize="+publicData.pageSize;
			let me=this;
			$.ajax({
				type:"get",
				url:url,
				dataType:"json",
				contentType:"application/json;charset=UTF-8",
				success:function(data){
					if(data.code == 200){
						me.tabList=data.data.recordList;
						me.pageCount=data.data.pageCount;

					}
					else{
						alert(data.msg);
					}
				}
			})*/
		},
		showComment:function(info){
			$(".showComment").css("display","block");
			$(".showComment .info").html(info);
		},
		closeShowComment:function(){
			$(".showComment").css("display","none");
		}
	}
}
</script>
<style lang="less">
@import "../../../../public.less";
.articleCommentIndex{
	.tab{
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
	.tabCommentInfo{
		.flex-grow(2);
		padding-right: 20px;
		.ellipsis;
	}
	.tabUser{
		.flex-grow(2);
		.flex;
		position: relative;
		padding-right: 10px;
	}
	.tabUserName{
		.flex-grow(2);
	}
	.forbid{
		.flex-grow(40px);
		width: 40px;
		text-align: center;
		color: #4A90E2;
	}
	.tabIP{
		.flex-grow(2);
		padding-right: 20px;
	}
	.tabTime{
		.flex-grow(2);
		line-height: 17px;
		padding-right: 20px;
	}
	.tabArticle{
		.flex-grow(2);
		padding-right: 20px;
	}
	.tabReason{
		.flex-grow(2);
		padding-right: 20px;
	}
	.tabLastOperation{
		.flex-grow(2);
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
	.recover{
		.flex-grow(2);
		color: #4A90E2;
		cursor:pointer
	}
	.jumpBtn{
    cursor: pointer;
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
	.jumpBtnActive{
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
	.showComment{
		display: none;
		position: fixed;
		top: 25%;
		left: 50%;
		width: 440px;
		background: #fff;
		padding: 35px 30px 25px;
		margin: 0 0 0 -220px;
		.border(4px,#C1C7D2);
		.border-radius(5px);
		.close{
			position: absolute;
			top: 10px;
			right: 10px;
			.cursor;
		}
	}
}
</style>
