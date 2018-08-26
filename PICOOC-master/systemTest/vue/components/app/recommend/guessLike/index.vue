<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
	<div class="guessLikeIndex">
		<div class="title">管理后台 > APP > 推荐位管理 > 猜你喜欢</div>
		<search  @search="searchFun"/>
		<aside class="tabTop">
			<router-link class="add" :to="{name:'appRecommendGuessLikeAdd'}">新增</router-link>
			<div class="btn btn1 btnActive" @click="getLikeList(1,pageSize,'','')">全部</div>
			<div class="btn btn2" @click="getLikeList(1,pageSize,'',0)">固定推荐</div>
			<div class="btn btn2" @click="getLikeList(1,pageSize,'',1)">随机推荐</div>
			<div class="btn btn2" @click="updateOrder">更新并发布</div>
			<pageList :currentPage="currentPage" :pageCount="pageCount" :pageChangeNum="pageChangeNum" @changeCurrentPage="changeCurrentPage" @changePageChangeNum="changePageChangeNum"></pageList>
		</aside>
		<section class="tab">
			<aside class="tabLi tabTitle">
				<div class="tabName">猜你喜欢展示文章标题</div>
				<div class="tabOpenType">图片</div>
				<div class="tabStatu">顺序</div>
				<div class="tabLastOperation">最后操作</div>
				<div class="tabOperation">操作</div>
			</aside>

			<aside class="tabLi tabTitle" v-for="(item, index) in guessLikeList">
				<div class="tabName">{{item.name}}</div>
				<div class="tabOpenType"><img v-bind:src="item.image" alt=""></div>
				<input class="indexIpt" type="text" v-model="item.sortIndex" @change="changeIndex(item.id, index, $event)"/>
				<div class="tabLastOperation">
					<div class="name" v-html="item.lastOperationRecord"></div>
				</div>
				<div class="tabOperation">
					<div class="change"><router-link class="edit" :to="{name:'appRecommendGuessLikeAdd',query: {id: item.id}}">编辑</router-link></div>
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
				id: [],
				sortIndex: [],

				currentPage: 1,
				pageCount: 1,
				pageChangeNum: 1,
				pageSize: publicData.pageSize,
				title: '',
				status: '',
				guessLikeList: [],
				confirmData: {}
			}
		},
		created: function () {
			getWindowSearch();
			this.getLikeList(this.currentPage, this.pageSize, this.title, this.status);
		},
		methods: {

			//修改顺序
			changeIndex: function (id, index, event) {
				let _this = this;
				let ordersReg = /^0*(0|[1-9]\d?|100)$/;
				if (ordersReg.test(event.target.value)) {
					_this.sortIndex.splice(index, 1, parseInt(event.target.value));//替换
				} else {
					_this.sortIndex.splice(index, 1, event.target.value);//替换
				}
			},

			changeCurrentPage: function (index) {
				this.currentPage = index;
				this.getLikeList(this.currentPage, this.pageSize, this.title, this.status);
			},
			changePageChangeNum: function (index) {
				this.pageChangeNum = index;
			},


			searchFun(keyWords){
				this.title = keyWords;
				this.getLikeList(1, this.pageSize, keyWords, '');
			},
			//闪屏列表
			getLikeList: function (currentPage, pageSize, title, status) {

				$(function () {
					$(".guessLikeIndex .btn").unbind("click").click(function () {
						var index = $(".guessLikeIndex .btn").index(this);
						$(".guessLikeIndex .btn").removeClass("btnActive");
						$(".guessLikeIndex .btn").eq(index).addClass("btnActive");
					});
				});

				let _this = this;
				let finalUrl = ajaxLink + 'picooc-background/articleRecommend/list?' + token + windowSearch + '&currentPage=' + currentPage + '&pageSize=' + pageSize + '&title=' + title + '&status=' + status;
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
							_this.status = status;

							var list = data.data;
							if (list.recordList.length > 0) {
								_this.pageCount = list.pageCount;
								_this.guessLikeList = list.recordList;

								_this.id = [];
								_this.sortIndex = [];
								for (var i = 0; i < list.recordList.length; i++) {
									_this.id.push(list.recordList[i].id);
									_this.sortIndex.push(list.recordList[i].sortIndex);
								}

							} else {
								_this.guessLikeList = [];
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
				let finalUrl = ajaxLink + 'picooc-background/articleRecommend/delete?' + token + windowSearch + '&id=' + id;
				$.ajax({
					type: 'get',
					url: finalUrl,
					success: function (data) {
						console.log(data);
						if (data.code == 200) {
							_this.guessLikeList.splice(index, 1);
							_this.id.splice(index, 1);
							_this.sortIndex.splice(index, 1);
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
				for (var i = 0; i < this.sortIndex.length; i++) {
					if (!ordersReg.test(this.sortIndex[i])) {
						ordersBtn = false;
						break;
					}
				}
				console.log(ordersBtn);
				console.log(this.sortIndex);


				if (ordersBtn) {
					let updateData = {
						ids: this.id,
						orders: this.sortIndex
					};
					updateData = JSON.stringify(updateData);
					console.log(updateData);
					$.ajax({
						type: 'POST',
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						url: ajaxLink + 'picooc-background/articleRecommend/updateSortIndex?' + token + windowSearch,
						data: updateData,
						success: function (data) {
							console.log(data);
							if (data.code == 200) {
								alert('更新成功！');
								_this.getLikeList(_this.currentPage, _this.pageSize, _this.title, _this.status);
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

</script>
<style lang="less">
@import "../../../../public.less";
.guessLikeIndex{
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
			width: 98px;
			height: 50px;
			position: relative;
			right: 45px;
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
		margin-right: 60px;
	}
}
</style>
