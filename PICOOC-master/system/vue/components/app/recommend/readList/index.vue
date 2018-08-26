<template>
	<div class="readListIndex">
		<div class="title">管理后台 > APP > 推荐位管理 > 阅读列表</div>
		<search @search="searchFun"/>
	<div class="tabTop">
	  <pageList :currentPage="currentPage" :pageCount="pageCount" :pageChangeNum="pageChangeNum" @changeCurrentPage="changeCurrentPage" @changePageChangeNum="changePageChangeNum"></pageList>
	</div>
		<section class="tab">
			<aside class="tabLi tabTitle">
		<div class="tabName">主题</div>
				<div class="tabId">文章ID</div>
				
				<div class="tabSort">顺序</div>
				<div class="tabLastOperation">最后操作</div>
				<div class="tabOperation">操作</div>
			</aside>

			<aside class="tabLi tabTitle" v-for="(item, index) in columnList">
				<div class="tabName">{{item.name}}</div>
		<div class="tabId">{{item.id}}</div>
				
				<div class="tabSort">{{item.sortIndex}}</div>
				<div class="tabLastOperation">
					<div class="name" v-html="item.lastOperationRecord"></div>
				</div>
				<div class="tabOperation">
			<!-- 		<div class="change"><router-link class="edit" :to="{name:'appContentColumnAdd',query: {id: item.id}}">编辑</router-link></div> -->
					<div class="delete" @click="deleteItem(item.id,index)">删除</div>
				</div>
			</aside>

		</section>
		<router-link class="add" :to="{name:'appRecommendReadListAdd'}">新增</router-link>
		<div class="update" @click="updateOrder">更新并发布</div>
		<!--<div>{{test}}</div>-->



	</div>
</template>
<script>
import search from "../../public/search.vue";//引入别的vue
import pageList from "../../public/pageList.vue";//引入别的vue
export default {
	components:{
		search,
		pageList
	},
	data:function(){

		return {
			ids:[],
			orders:[],
			columnList:[],
			currentPage:1,
			pageCount:1,
			pageChangeNum:1
		}
	},
	created: function () {
		getWindowSearch();
		this.getList();
	},

  mounted:function(){

  },
  methods: {
	//搜索
	searchFun(keyWords) {
	  this.getColumnList(keyWords);
	},

	//栏目列表
	getList: function (searchName) {
	  let _this = this;
	  let finalUrl = ajaxLink + 'picooc-background/articleColumn/list?'+token+windowSearch+'&searchName='+searchName;
	  $.ajax({
		type:'get',
		url:finalUrl,
		success:function(data){
			console.log(finalUrl);
			console.log(data);
			if(data.code == 200){
				if(data.data.pageCount>1){
					me.pageCount=data.data.pageCount;
				}
			}else{
				alert(data.msg);
			}
		},
		error:function(error){
		  console.log(error);
		}
	  });
	},
	//点击删除
	deleteItem: function (id, index) {
	},
	//更新并发布
	updateOrder: function () {
	},
	changeCurrentPage:function(index){
		this.currentPage=index;
		this.getList();
	},
	changePageChangeNum:function(index){
		this.pageChangeNum=index;
	},
  }
}
</script>
<style lang="less">
@import "../../../../public.less";
.readListIndex{
	.tab{
		.border-top(1px,#C1C7D2);
		.border-left(1px,#C1C7D2);
		.border-right(1px,#C1C7D2);
		font-size: 12px;
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
		.flex-grow();
		text-align: center;
	}
	.tabName{
		.flex-grow(2);
	text-align: center;
	}
	.tabSort{
		.flex-grow();
	}
	.tabLastOperation{
		.flex-grow(3);
		line-height: 17px;
	}
	.tabOperation{
		.flex-grow(3);
		.flex;
	}
	.change{
		.flex-grow(2);
		color: #4A90E2;
		cursor:pointer
	}
	.edit{
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
		.border(1px,#C1C7D2);
		.border-radius(15px);
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
