<template>
	<div class="columnIndex">
		<div class="title">管理后台 > APP > 内容管理 > 栏目管理</div>
		<search @search="searchFun"/>
		<router-link class="add" :to="{name:'appContentColumnAdd'}">新增</router-link>
		<div class="update" @click="updateOrder">更新并发布</div>
		<section class="tab">
			<aside class="tabLi tabTitle">
				<div class="tabId">ID</div>
				<div class="tabName">栏目名称</div>
				<div class="tabSort">顺序</div>
				<div class="tabStatu">状态</div>
				<div class="tabLastOperation">最后操作</div>
				<div class="tabOperation">操作</div>
			</aside>

			<aside class="tabLi tabTitle" v-for="(item, index) in columnList">
				<div class="tabId">{{item.id}}</div>
				<div class="tabName">{{item.name}}</div>
				<input class="indexIpt" type="text" v-model="item.sortIndex" @change="changeIndex(item.id, index, $event)">
				<!--<div class="tabSort">{{item.sortIndex}}</div>-->
				<div class="tabStatu" v-if="item.status==1">开启</div>
				<div class="tabStatu" v-if="item.status==2">关闭</div>
				<div class="tabLastOperation">
					<div class="name" v-html="item.lastOperationRecord"></div>
					<!--<div class="time">{{item.updateTime}}</div>-->
				</div>
				<div class="tabOperation">
					<div class="change"><router-link class="edit" :to="{name:'appContentColumnAdd',query: {id: item.id}}">编辑</router-link></div>
					<div class="close" v-if="item.status==1"><span @click="closeStatus(item.id,index)">关闭</span></div>
					<div class="close" v-if="item.status==2"><span @click="openStatus(item.id,index)">开启</span></div>
					<div class="delete"><span @click="deleteConfirm(item.id,index)">删除</span></div>
				</div>
			</aside>

		</section>
		<fixBg :detaile="'是否确认删除?'" :confirmData="confirmData" @confirmClick="deleteItem"></fixBg>
	</div>
</template>
<script>
import search from "../../public/search.vue";//引入别的vue
import fixBg from "../../public/fixBg.vue";//引入别的vue
export default {
	props:['test'],
	components:{
		search,
		fixBg
	},
	data:function(){

		return {
			ids:[],
			orders:[],
			columnList:[],
			confirmData:{},
			currentPage:1,
			pageCount:1,
			pageChangeNum:1,
			searchData:""
		}
	},
	created: function () {
		getWindowSearch();
		this.getColumnList('');
	},

	mounted:function(){

	},
	methods: {

		//修改顺序
		changeIndex: function (id, index, event) {
			let _this = this;
			let ordersReg = /^0*(0|[1-9]\d?|100)$/;
			if(ordersReg.test(event.target.value)){
				_this.orders.splice(index, 1, parseInt(event.target.value));//替换
			}else{
				_this.orders.splice(index, 1, event.target.value);//替换
			}
		},


		//搜索
		searchFun(keyWords) {
			this.currentPage=1;
			this.searchData=keyWords;
			this.getColumnList(keyWords);
		},

		//栏目列表
		getColumnList: function (searchName) {
			let _this = this;
			let finalUrl = ajaxLink + 'picooc-background/articleColumn/list?' + token + windowSearch + '&searchName=' + searchName ;
			$.ajax({
				type: 'get',
				url: finalUrl,
				success: function (data) {
					console.log(finalUrl);
					console.log(data);
					if (data.code == 200) {
						if (data.data.length > 0) {
							_this.columnList = data.data;
							var list = data.data;
							_this.ids = [];
							_this.orders = [];
							for (var i = 0; i < list.length; i++) {
								_this.ids.push(list[i].id);
								_this.orders.push(list[i].sortIndex);
							}
						} else {
							_this.columnList = [];
						}
						/*me.pageCount=[];
						 for(let i=1,len=data.data.pageCount;i<len;i++){
						 this.pageCount.push(i);
						 }*/
						_this.pageCount = data.data.pageCount;

					} else {
						alert(data.msg);
					}
				},
				error: function (error) {
					console.log(error);
				}
			});
		},

		//点击关闭
		closeStatus: function (id, index) {
			let _this = this;
			let finalUrl = ajaxLink + 'picooc-background/articleColumn/reject?'+token+windowSearch+'&id='+id;
			$.ajax({
				type:'get',
				url:finalUrl,
				success:function(data){
					console.log(data);
					if(data.code == 200){
						_this.columnList[index].status=2;
					}else{
						alert(data.msg);
					}
				},
				error:function(error){
					console.log(error);
				}
			});
		},
		changeCurrentPage:function(index){
			this.currentPage=index;
			this.getColumnList(this.searchData);
		},
		changePageChangeNum:function(index){
			this.pageChangeNum=index;
		},
		//点击开启
		openStatus: function (id, index) {
			let _this = this;
			let finalUrl = ajaxLink + 'picooc-background/articleColumn/pass?'+token+windowSearch+'&id='+id;
			$.ajax({
				type:'get',
				url:finalUrl,
				success:function(data){
					console.log(data);
					if(data.code == 200){
						_this.columnList[index].status=1;
					}else{
						alert(data.msg);
					}
				},
				error:function(error){
					console.log(error);
				}
			});
		},
		deleteConfirm:function(id,index){
			this.confirmData={
				id:id,
				index:index
			};
			$(".fixBg").css("display","block");
		},
		//点击删除
		deleteItem: function (confirmData) {
			let id=confirmData.id;
			let index=confirmData.index;
			let _this = this;
			let finalUrl = ajaxLink + 'picooc-background/articleColumn/delete?'+token+windowSearch+'&id='+id;
			$.ajax({
				type:'get',
				url:finalUrl,
				success:function(data){
					console.log(data);
					if(data.code == 200){
						_this.columnList.splice(index, 1);
						_this.ids.splice(index, 1);
						_this.orders.splice(index, 1);
					}else{
						alert(data.msg);
					}
				},
				error:function(error){
					console.log(error);
				}
			});
		},

		//更新并发布
		updateOrder: function () {
			let _this = this;

			let ordersBtn = true;
			let ordersReg = /^0*(0|[1-9]\d?|100)$/;
			for (var i = 0; i < this.orders.length; i++) {
				if (!ordersReg.test(this.orders[i])) {
					ordersBtn = false;
					break;
				}
			}
			console.log(ordersBtn);
			console.log(this.orders);

			if (ordersBtn) {
				let updateData = {
					ids: this.ids,
					orders: this.orders
				};

				updateData = JSON.stringify(updateData);
				$.ajax({
					type: 'POST',
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					url: ajaxLink + 'picooc-background/articleColumn/updateOrder?' + token + windowSearch,
					data: updateData,
					success: function (data) {
						console.log(data);
						if (data.code == 200) {
							alert('更新成功！');
							_this.getColumnList(_this.searchData);
						} else {
							alert(data.msg);
						}
					},
					error: function (error) {
						console.log(error);
					}
				});
			} else {
				alert('请确认列表顺序已填写并格式正确');
			}

		}

	}
}
</script>
<style lang="less">
@import "../../../../public.less";
.columnIndex{
	.tab{
		.border-top(1px,#C1C7D2);
		.border-left(1px,#C1C7D2);
		.border-right(1px,#C1C7D2);
		font-size: 12px;
		margin: 20px 0;
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
	}
	.tabSort{
		.flex-grow();
		text-align: center;
	}
	.tabStatu{
		.flex-grow(2);
		text-align: center;
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
	.close{
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
    cursor: pointer;
	}
	.indexIpt{
		color: #4A90E2;
		width: 49px;
		height: 28px;
		line-height: 28px;
		text-align: center;
		border-radius: 14px;
		border: 1px solid #C1C7D2;
	}
}
</style>
