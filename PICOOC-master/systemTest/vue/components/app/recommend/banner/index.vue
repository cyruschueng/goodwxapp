<template>
	<div class="recommendBannerIndex">
		<div class="title">管理后台 > APP > 推荐位管理 > 精选轮播图</div>
		<search @search="searchFun"/>
		<router-link class="add" :to="{name:'appRecommendBannerAdd'}">新增</router-link>
			<div class="save" @click="updateOrder">更新并发布</div>
		<aside class="tabTop">
			<router-link :to="{name:'appRecommendBannerIndex'}" class="jumpBtn jumpBtnActive">已发布</router-link>
			<router-link :to="{name:'appRecommendBannerDraft'}" class="jumpBtn">草稿箱</router-link>
			<pageList :currentPage="currentPage" :pageCount="pageCount" :pageChangeNum="pageChangeNum" @changeCurrentPage="changeCurrentPage" @changePageChangeNum="changePageChangeNum"></pageList>
		</aside>
		<section class="tab">
			<aside class="tabLi tabTitle">
				<div class="tabName">轮播图主题</div>
				<div class="tabPic">图片</div>
				<div class="tabType">类型</div>
				<div class="tabStrategy">投放策略</div>
				<div class="tabStatu">顺序</div>
				<div class="tabLastOperation">最后操作</div>
				<div class="tabOperation">操作</div>
			</aside>
			<aside class="tabLi tabTitle"  v-for="(item,index) in tabList">
				<div class="tabName">{{item.theme}}</div>
				<div class="tabPic"><img v-bind:src="item.imgUrl" alt=""/></div>
				<div class="tabType" v-if="item.type==1">文章</div>
				<div class="tabType" v-if="item.type==2">外链</div>
				<div class="tabType" v-if="item.type==3">广告</div>
				<div class="tabStrategy" v-if="item.conditionId==0">全量</div>
				<div class="tabStrategy" v-else>条件</div>
				<input class="indexIpt" type="text" v-model="item.order" @change="changeIndex(item.id, index, $event)"/>
				<!--<div class="tabStatu">{{item.order}}</div>-->
				<div class="tabLastOperation" v-html="item.lastOperationRecord"></div>
				<div class="tabOperation">
					<div class="change"><router-link class="edit" :to="{name:'appRecommendBannerAdd',query: {id: item.id}}">编辑</router-link></div>
					<div class="offline"><span @click="deleteConfirm(item.id,index)">下线</span></div> </div>
			</aside>

		</section>

    <fixBg :detaile="'确定下线吗?'" :confirmData="confirmData" @confirmClick="offlineItem"></fixBg>

	</div>
</template>
<script>
// import $ from "jquery";//引入别的vue
import pageList from "../../public/pageList.vue";//引入别的vue
import search from "../../public/search.vue";//引入别的vue
import fixBg from "../../public/fixBg.vue";//引入别的vue
export default {
	components:{
		search,
    fixBg,
		pageList
	},
	data(){
		return {
      confirmData:{},
			currentPage:1,
			pageCount:1,
			pageChangeNum:1,
			pageSize:publicData.pageSize,
			searchName:'',
			status:1,//状态 1 已发布 2 草稿箱
			ids:[],
			orders:[],
			tabList:[]
		}
	},
	created:function(){
		getWindowSearch();
		this.getTabList(this.searchName, this.status, this.currentPage, this.pageSize);
	},
	methods:{

		changeCurrentPage:function(index){
			this.currentPage=index;
			this.getTabList(this.searchName, this.status, this.currentPage, this.pageSize);
		},
		changePageChangeNum:function(index){
			this.pageChangeNum=index;
		},


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
		searchFun: function (keyWords) {
			this.searchName = keyWords;
			this.getTabList(keyWords, this.status, 1, this.pageSize);
		},

		//获取列表
		getTabList: function (searchName, status, currentPage, pageSize) {
			let _this = this;
			let finalUrl = ajaxLink + 'picooc-background/carousel/list?'+token+windowSearch+'&searchName='+searchName+'&status='+status+'&currentPage='+currentPage+'&pageSize='+pageSize;
			console.log(finalUrl);
			$.ajax({
				type:'get',
				url:finalUrl,
				success:function(data){
					console.log(data);
					if(data.code == 200){

						_this.searchName = searchName;
						_this.status = status;
						_this.currentPage = currentPage;
						_this.pageSize = pageSize;


						if(data.data.recordList.length>0){
							_this.pageCount=data.data.pageCount;
							_this.tabList = data.data.recordList;
							var list = data.data.recordList;
							  _this.ids = [];
							  _this.orders = [];
							for(var i=0; i<list.length; i++){
								_this.ids.push(list[i].id);
								_this.orders.push(list[i].order);
							}
							console.log(_this.orders);
						}else {
							_this.tabList = [];
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

    deleteConfirm:function(id, index){
      this.confirmData={
        id:id,
        index:index
      };
      $(".fixBg").css("display","block");
    },

		//下线
		offlineItem: function (confirmData) {

			let _this = this;
			let id = confirmData.id;
			let index = confirmData.index;
			let finalUrl = ajaxLink + 'picooc-background/carousel/reject?' + token + windowSearch + '&id=' + id;
			$.ajax({
				type: 'get',
				url: finalUrl,
				success: function (data) {
					console.log(data);
					if (data.code == 200) {
						_this.tabList.splice(index, 1);
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

			if(ordersBtn){
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
					url: ajaxLink + 'picooc-background/carousel/updateOrder?' + token + windowSearch,
					data: updateData,
					success: function (data) {
						console.log(data);
						if (data.code == 200) {
							alert('更新成功！');
							_this.getTabList(_this.searchName, _this.status, _this.currentPage, _this.pageSize);
						} else {
							alert(data.msg);
						}
					},
					error: function (error) {
						console.log(error);
					}
				});
			}else {
				alert('请确认列表顺序已填写并格式正确');
			}
		}

	}
}

</script>
<style lang="less">
@import "../../../../public.less";
.recommendBannerIndex{
	.jumpBtn{
		display: inline-block;
		width: 75px;
		height: 28px;
		line-height: 28px;
		text-align: center;
		margin: 20px 0 0;
		color: #C1C7D2;
		background: #F8FBFF;
		.border-top(1px,#C1C7D2);
		.border-left(1px,#C1C7D2);
		.border-right(1px,#C1C7D2);
	}
	.jumpBtnActive{
		color: #333333;
		background: #FFFFFF;
	}
	.tab{
		.border-top(1px,#C1C7D2);
		.border-left(1px,#C1C7D2);
		.border-right(1px,#C1C7D2);
		font-size: 12px;
		margin: 0px 0 20px;
		background: #FFFFFF;
	}
	.tabLi{
		.flex;
		.border-bottom(1px,#C1C7D2);
		align-items:center;
		padding: 14px 0;
	}
	.tabName{
		.flex-grow(4);
		text-align: center;
	}
	.tabPic{
		.flex-grow(4);
		text-align: center;
		line-height: 17px;
		img{
			/*width: 100%;*/
      width: 125px;
      height: 51px;
		}
	}
	.tabType{
		.flex-grow(3);
		text-align: center;
	}
	.tabStrategy{
		.flex-grow(3);
		line-height: 17px;
	}
	.tabStatu{
		.flex-grow(2);
		line-height: 17px;
		padding-right: 10px;
    text-align: center;
	}
	.tabLastOperation{
		.flex-grow(4);
		line-height: 17px;
	}
	.tabOperation{
		.flex-grow(4);
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
	.offline{
		.flex-grow(2);
		color: #4A90E2;
		cursor:pointer
	}
	.add{
		.publicBtn
	}
	.save{
		float: right;
		.publicBtn
	}
	.indexIpt{
		color: #4A90E2;
		width: 49px;
		height: 28px;
		line-height: 28px;
		text-align: center;
		border-radius: 14px;
		border: 1px solid #C1C7D2;
		margin-right: 20px;
	}
}

</style>
