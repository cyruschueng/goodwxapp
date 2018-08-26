<template>
	<div class="hotReviewIndex">
		<div class="title">管理后台 > APP > 推荐位管理 > 热评</div>
		<search  @search="searchFun"/>
		<aside class="tabTop">
			<router-link class="add" :to="{name:'appRecommendHotReviewAdd'}">新增</router-link>
			<div class="btn btn2" @click="updateOrder">更新并发布</div>
			<pageList :currentPage="currentPage" :pageCount="pageCount" :pageChangeNum="pageChangeNum" @changeCurrentPage="changeCurrentPage" @changePageChangeNum="changePageChangeNum"></pageList>
		</aside>
		<section class="tab">
			<aside class="tabLi tabTitle">
				<div class="tabName">主题</div>
				<div class="tabOpenType">文章ID</div>
				<div class="tabStatu">列表顺序</div>
				<div class="tabName">投放策略</div>
				<div class="tabLastOperation">最后操作</div>
				<div class="tabOperation">操作</div>
			</aside>

			<aside class="tabLi tabTitle" v-for="(item, index) in hotReviewList">
				<div class="tabName">{{item.theme}}</div>
				<div class="tabOpenType">{{item.articleId}}</div>
				<input class="indexIpt" type="text" v-model="item.order" @change="changeIndex(item.id, index, $event)"/>
				<div class="tabName" v-if="item.conditionId==0">全量</div>
				<div class="tabName" v-else>条件</div>
				<div class="tabLastOperation">
					<div class="name" v-html="item.lastOperationRecord"></div>
				</div>
				<div class="tabOperation">
					<div class="change"><router-link class="edit" :to="{name:'appRecommendHotReviewAdd',query: {id: item.id}}">编辑</router-link></div>
					<div class="delete"><span @click="deleteConfirm(item.id,index)">删除</span></div>
				</div>
			</aside>
		</section>
		<fixBg :detaile="'是否确认删除?'" :confirmData="confirmData" @confirmClick="deleteItem"></fixBg>
	</div>
</template>
<script>
	// import $ from "jquery";//引入别的vue
	import pageList from "../../public/pageList.vue";//引入别的vue
	import search from "../../public/search.vue";//引入别的vue
	import fixBg from "../../public/fixBg.vue";//引入别的vue


	export default {

		components: {
			search,
			pageList,
			fixBg
		},
		data: function () {
			return {
				ids: [],
				orders: [],

				currentPage: 1,
				pageCount: 1,
				pageChangeNum: 1,
				pageSize: publicData.pageSize,
				title: '',
				hotReviewList: [],
				confirmData: {}
			}
		},
		created: function () {
			getWindowSearch();
			this.getHotReviewList(this.currentPage, this.pageSize, this.title);
		},
		methods: {

			//修改顺序
			changeIndex: function (id, index, event) {
				let _this = this;
				let ordersReg = /^0*(0|[1-9]\d?|100)$/;
				if (ordersReg.test(event.target.value)) {
					_this.orders.splice(index, 1, parseInt(event.target.value));//替换
				} else {
					_this.orders.splice(index, 1, event.target.value);//替换
				}
			},

			changeCurrentPage: function (index) {
				this.currentPage = index;
				this.getHotReviewList(this.currentPage, this.pageSize, this.title);
			},
			changePageChangeNum: function (index) {
				this.pageChangeNum = index;
			},


			searchFun(keyWords){
				this.title = keyWords;
				this.getHotReviewList(1, this.pageSize, keyWords, '');
			},
			//闪屏列表
			getHotReviewList: function (currentPage, pageSize, title) {
				let _this = this;
				let finalUrl = ajaxLink + 'picooc-background/hotreview/list?' + token + windowSearch + '&currentPage=' + currentPage + '&pageSize=' + pageSize + '&searchName=' + title;
				console.log(finalUrl);
				$.ajax({
					type: 'get',
					url: finalUrl,
					success: function (data) {
						console.log(data);
						if (data.code == 200) {

							_this.currentPage = currentPage;
							_this.pageSize = pageSize;
							_this.title = title;

							var list = data.data;
							if (list.recordList.length > 0) {
								_this.pageCount = list.pageCount;
								_this.hotReviewList = list.recordList;

								_this.ids = [];
								_this.orders = [];
								for (var i = 0; i < list.recordList.length; i++) {
									_this.ids.push(list.recordList[i].id);
									_this.orders.push(list.recordList[i].order);
								}

							} else {
								_this.hotReviewList = [];
							}
						} else {
							alert(data.msg);
						}
					},
					error: function (error) {
						console.log(error);
					}
				});
			},


			deleteConfirm: function (id, index) {
				this.confirmData = {
					id: id,
					index: index
				};
				$(".fixBg").css("display", "block");
			},

			deleteItem: function (confirmData) {
				let id = confirmData.id;
				let index = confirmData.index;
				let _this = this;
				let finalUrl = ajaxLink + 'picooc-background/hotreview/delete?' + token + windowSearch + '&id=' + id;
				$.ajax({
					type: 'get',
					url: finalUrl,
					success: function (data) {
						console.log(data);
						if (data.code == 200) {
							_this.hotReviewList.splice(index, 1);
							_this.ids.splice(index, 1);
							_this.orders.splice(index, 1);
						} else {
							alert(data.msg);
						}
					},
					error: function (error) {
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
					console.log(updateData);
					$.ajax({
						type: 'POST',
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						url: ajaxLink + 'picooc-background/hotreview/updateOrder?' + token + windowSearch,
						data: updateData,
						success: function (data) {
							console.log(data);
							if (data.code == 200) {
								alert('更新成功！');
								_this.getHotReviewList(_this.currentPage, _this.pageSize, _this.title);
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

			},

			transformTime: function (times) {
				var time = new Date(times);
				var year = time.getFullYear();
				var month = time.getMonth() + 1;
				month = (month < 10 ? '0' : '') + month;
				var day = time.getDate();
				day = (day < 10 ? '0' : '') + day;
				var week = time.getDay();//周一 1
				var arr = [7, 1, 2, 3, 4, 5, 6];
				week = arr[week];
				var hour = time.getHours(); //
				hour = (hour < 10 ? '0' : '') + hour;
				var minutes = time.getMinutes();
				minutes = (minutes < 10 ? '0' : '') + minutes;
				var seconds = time.getSeconds();
				seconds = (seconds < 10 ? '0' : '') + seconds;
				var minllseconds = time.getMilliseconds();
				if (minllseconds < 10) {
					minllseconds = '00' + minllseconds;
				} else if (minllseconds < 100) {
					minllseconds = '0' + minllseconds;
				}
				return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
			}
		}
	}
	$(function () {
		$(".hotReviewIndex .btn").unbind("click").click(function () {
			var index = $(".hotReviewIndex .btn").index(this);
			$(".hotReviewIndex .btn").removeClass("btnActive");
			$(".hotReviewIndex .btn").eq(index).addClass("btnActive");
		});
	});
</script>
<style lang="less">
	@import "../../../../public.less";
	.hotReviewIndex{
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
	.flex-grow(4);
	}
	.tabTime{
	.flex-grow(4);
		line-height: 17px;
	}
	.tabStrategy{
	.flex-grow(3);
		line-height: 17px;
	}
	.tabOpenType{
	.flex-grow(3);
	img{
		width: 100%;
	}
	}
	.tabStatu{
	.flex-grow(2);
		line-height: 17px;
	}
	.tabLastOperation{
	.flex-grow(5);
		line-height: 17px;
	}
	.tabOperation{
	.flex-grow(5);
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
	.btn1,.btn2,.btn3,.btn4,.btn5{
		display: inline-block;
		background: #FFFFFF;
		padding: 0 23px;
		font-size: 12px;
		height: 30px;
		line-height: 30px;
		color: #4A90E2;
		margin-right: 30px;
	.border(1px,#C1C7D2);
	.border-radius(15px);
	}
	.btn1{
		margin-left: 100px;
	}
	.btn:hover{
		cursor:pointer;
	}
	.btnActive{
		background: #EAEFF5;
	}
	.indexIpt{
		color: #4A90E2;
		width: 49px;
		height: 28px;
		line-height: 28px;
		text-align: center;
		border-radius: 14px;
		border: 1px solid #C1C7D2;
		margin-right: 40px;
	}
	}
</style>
