<template>
	<div class="forbidUserIndex">
		<div class="title">管理后台 > APP > 评论管理 > 禁言用户</div>
		<search  @search="search"/>
		<div class="add"  @click="addDisplay">新增</div>
		<div class="tabTop">
			<pageList :currentPage="currentPage" :pageCount="pageCount" :pageChangeNum="pageChangeNum" @changeCurrentPage="changeCurrentPage" @changePageChangeNum="changePageChangeNum"></pageList>
		</div>
		
		<section class="tab">
			<aside class="tabLi tabTitle">
				<div class="tabId">ID</div>
				<div class="tabUserName">用户昵称</div>
				<div class="tabUid">UID</div>
				<div class="tabTime">禁言时间</div>
				<div class="tabReason">禁言原因</div>
				<div class="tabLastOperation">最后操作</div>
				<div class="tabOperation">操作</div>
			</aside>
			<aside class="tabLi tabTitle" v-for="(item,index) in tabList">
				<div class="tabId">{{item.id}}</div>
				<div class="tabUserName">{{item.userName}}</div>
				<div class="tabUid">{{item.userId}}
				</div>
				<div class="tabTime">{{item.nospeakingTime}}</div>
				<div class="tabReason">{{item.reason}}
				</div>
				<div class="tabLastOperation" v-html="item.lastOperationRecord"></div>
				<div class="tabOperation">
					<div class="change" @click="deleteConfirm(item.id,index)">取消禁言</div>
				</div>
			</aside>
		</section>
		<fixBg :detaile="'确定取消禁言吗?'" :confirmData="confirmData" @confirmClick="rejectForbid"></fixBg>
		<forbidAdd></forbidAdd>
	</div>
</template>
<script>
import search from "../../public/search.vue";//引入别的vue
import forbidAdd from "./add.vue";//引入别的vue
import pageList from "../../public/pageList.vue";//引入别的vue
import fixBg from "../../public/fixBg.vue";//引入别的vue
export default {
	components:{
		search,
		forbidAdd,
		pageList,
		fixBg
	},
	data(){
		return {
			tabList:[],
			currentPage:1,
			pageCount:1,
			pageChangeNum:1,
			confirmData:{},
			searchData:""
		}
	},
	created:function(){
		getWindowSearch();
		this.getList();
	},
	methods:{
		addDisplay:function(){
			$(".forbidUserAdd").css("display","block");
		},
		getList:function(searchData){
			let url;
			if(typeof searchData !="undefined"){
				url=ajaxLink+'picooc-background/nospeaking/list?'+token+windowSearch+"&currentPage="+this.currentPage+"&pageSize="+publicData.pageSize+"&searchName="+searchData;
			}
			else{
				url=ajaxLink+'picooc-background/nospeaking/list?'+token+windowSearch+"&currentPage="+this.currentPage+"&pageSize="+publicData.pageSize;
			}
			let me=this;
			$.ajax({
				type:"get",
				url:url,
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
		deleteConfirm:function(id,index){
			this.confirmData={
				id:id,
				index:index
			};
			$(".fixBg").css("display","block");
		},
		rejectForbid:function(confirmData){
			let id=confirmData.id;
			let index=confirmData.index;
			let url=ajaxLink+'picooc-background/nospeaking/reject?'+token+windowSearch+"&id="+id;
			let me=this;
			$.ajax({
				type:"get",
				url:url,
				success:function(data){
					if(data.code == 200){
						alert(data.msg);
						router.go(0);
						//me.tabList.splice(index,1);
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

			/*let url=ajaxLink+"picooc-background/nospeaking/list?"+windowSearch+"&searchName="+searchData+"&currentPage="+this.currentPage+"&pageSize="+publicData.pageSize;
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
		}
	}
}
</script>
<style lang="less">
@import "../../../../public.less";
.forbidUserIndex{
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
	.tabUserName{
		.flex-grow(2);
		padding-right: 20px;
	}
	.tabUid{
		.flex-grow(2);
		.flex;
		position: relative;
		padding-right: 10px;
	}
	.tabTime{
		.flex-grow(4);
		padding-right: 20px;
	}
	.tabReason{
		.flex-grow(4);
		padding-right: 20px;
	}
	.tabLastOperation{
		.flex-grow(4);
		line-height: 17px;
		padding-right: 20px;
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
		.cursor;
		.border(1px,#C1C7D2);
		.border-radius(15px);
	}
	.addActive{
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
</style>