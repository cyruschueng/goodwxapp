<template>
	<div class="advertiseArticleIndex">
		<div class="title">管理后台 > APP > 广告管理 > 文章</div>
		<search @search="searchFun"/>
		<aside class="tabTop">
			<router-link class="add" :to="{name:'appAdvertiseArticleAdd'}">新增</router-link>
			<div class="btn btn1 btnActive" @click="getArticleAdList(1,pageSize,name,'')">全部</div>
			<pageList :currentPage="currentPage" :pageCount="pageCount" :pageChangeNum="pageChangeNum" @changeCurrentPage="changeCurrentPage" @changePageChangeNum="changePageChangeNum"></pageList>
		</aside>
		<section class="tab">
			<aside class="tabLi tabTitle">
				<div class="tabId">ID</div>
				<div class="tabName">广告主题</div>
				<div class="tabTime">生效时间</div>
				<div class="tabStrategy">投放策略</div>
				<div class="tabOpenType">打开类型</div>
				<div class="tabStatu">状态</div>
				<div class="tabLastOperation">最后操作</div>
				<div class="tabOperation">操作</div>
			</aside>
			<aside class="tabLi tabTitle"  v-for="(item,index) in articleAdList">
				<div class="tabId">{{item.id}}</div>
				<div class="tabName">{{item.name}}</div>
				<div class="tabTime">
					<div class="startTime">{{transformTime(item.startTime)}}</div>
					<div class="endTime">{{transformTime(item.endTime)}}</div>
				</div>
				<div class="tabStrategy" v-if="item.programs==null || item.programs==''">全量</div>
				<div class="tabStrategy" v-else>条件</div>
        <div class="tabOpenType" v-if="(item.link!='') && (item.link!=null) && (parseFloat(item.link).toString() == 'NaN')">链接</div>
        <div class="tabOpenType" v-if="(item.link!='') && (item.link!=null) && (parseFloat(item.link).toString() != 'NaN')">文章</div>
        <div class="tabOpenType" v-if="((item.link=='') || (item.link==null))"></div>
				<div class="tabStatu">
					<span v-if="item.status==0">编辑中</span>
					<span v-if="item.status==1">待审核</span>
					<span v-if="item.status==2">待发布</span>
					<span v-if="item.status==3">已发布</span>
				</div>
				<div class="tabLastOperation">
					<div class="name" v-html="item.lastOperationRecord"></div>
					<!--<div class="time">207-10-10 10:45:00</div>-->
				</div>
				<div class="tabOperation">
					<div class="change"><router-link class="edit" :to="{name:'appAdvertiseArticleAdd',query: {id: item.id}}">编辑</router-link></div>
					<div class="recall" v-if="item.status==0"><span @click="submitItem(item.id,index)">提交审核</span></div>
					<div class="recall" v-if="item.status==1"><span @click="passItem(item.id,index)">审核通过</span></div>
					<div class="recall" v-if="item.status==1"><span @click="passNotItem(item.id,index)">审核不通过</span></div>
					<div class="recall" v-if="item.status==2"><span @click="publishNotItem(item.id,index)">发布</span></div>
					<div class="recall" v-if="item.status==3"><span @click="recallItem(item.id,index)">撤回</span></div>
					<div class="delete" v-if="item.status==3"></div>
					<div class="delete" v-else><span @click="deleteConfirm(item.id,index)">删除</span></div>
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
	components:{
		search,
		pageList,
		fixBg
	},
	data(){
		return {
			currentPage:1,
			pageCount:1,
			pageChangeNum:1,
			pageSize:publicData.pageSize,
			name:'',//模糊查询
			status:'',//[0:编辑中,1:待审核,2:待发布,3:已发布]（默认全部）
			articleAdList:[],
			confirmData:{}
		}
	},
	created: function () {
		getWindowSearch();
		this.getArticleAdList(this.currentPage,this.pageSize,this.name,this.status);
	},
	methods:{

		changeCurrentPage:function(index){
			this.currentPage=index;
			this.getArticleAdList(this.currentPage,this.pageSize,this.name,this.status);
		},
		changePageChangeNum:function(index){
			this.pageChangeNum=index;
		},


		//搜索
		searchFun(keyWords){
			this.name = keyWords;
			this.getArticleAdList(1,this.pageSize,keyWords,'');
		},

		//列表
		getArticleAdList: function (currentPage,pageSize,name,status) {
			let _this = this;
			let finalUrl = ajaxLink + 'picooc-background/articleAd/list?'+token+windowSearch+'&currentPage='+currentPage+'&pageSize='+pageSize+'&name='+name+'&status='+status;
			console.log(finalUrl);
			$.ajax({
				type:'get',
				url:finalUrl,
				success:function(data){
					console.log(data);
					if(data.code == 200){

						_this.currentPage = currentPage;
						_this.pageSize = pageSize;
						_this.name = name;
						_this.status = status;

						var list = data.data;

						if(data.data.recordList.length>0){
							_this.pageCount=list.pageCount;
							_this.articleAdList = data.data.recordList;
						}else {
							_this.articleAdList = [];
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


		//闪屏提交审核
		submitItem: function (id, index) {
			let _this = this;
			let finalUrl = ajaxLink + 'picooc-background/articleAd/submitAudit?'+token+windowSearch+'&id='+id;
			console.log(finalUrl);
			$.ajax({
				type:'get',
				url:finalUrl,
				success:function(data){
					console.log(data);
					if(data.code == 200){
						_this.articleAdList[index].status=1;
					}else{
						alert(data.msg);
					}
				},
				error:function(error){
					console.log(error);
				}
			});
		},

		//闪屏审核通过
		passItem: function (id, index) {
			let _this = this;
			let finalUrl = ajaxLink + 'picooc-background/articleAd/auditPass?'+token+windowSearch+'&id='+id;
			$.ajax({
				type:'get',
				url:finalUrl,
				success:function(data){
					console.log(data);
					if(data.code == 200){
						_this.articleAdList[index].status=2;
					}else{
						alert(data.msg);
					}
				},
				error:function(error){
					console.log(error);
				}
			});
		},

		//闪屏审核不通过
		passNotItem: function (id, index) {
			let _this = this;
			let finalUrl = ajaxLink + 'picooc-background/articleAd/auditReject?'+token+windowSearch+'&id='+id;
			$.ajax({
				type:'get',
				url:finalUrl,
				success:function(data){
					console.log(data);
					if(data.code == 200){
						_this.articleAdList[index].status=0;
					}else{
						alert(data.msg);
					}
				},
				error:function(error){
					console.log(error);
				}
			});
		},

		//闪屏发布
		publishNotItem: function (id, index) {
			let _this = this;
			let finalUrl = ajaxLink + 'picooc-background/articleAd/publish?'+token+windowSearch+'&id='+id;
			$.ajax({
				type:'get',
				url:finalUrl,
				success:function(data){
					console.log(data);
					if(data.code == 200){
						_this.articleAdList[index].status=3;
					}else{
						alert(data.msg);
					}
				},
				error:function(error){
					console.log(error);
				}
			});
		},

		//闪屏撤回
		recallItem: function (id, index) {
			let _this = this;
			let finalUrl = ajaxLink + 'picooc-background/articleAd/unPublish?'+token+windowSearch+'&id='+id;
			$.ajax({
				type:'get',
				url:finalUrl,
				success:function(data){
					console.log(data);
					if(data.code == 200){
						_this.articleAdList[index].status=0;
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
		deleteItem: function (confirmData) {
			let id=confirmData.id;
			let index=confirmData.index;
			let _this = this;
			let finalUrl = ajaxLink + 'picooc-background/articleAd/delete?'+token+windowSearch+'&id='+id;
			$.ajax({
				type:'get',
				url:finalUrl,
				success:function(data){
					console.log(data);
					if(data.code == 200){
						_this.articleAdList.splice(index, 1);
					}else{
						alert(data.msg);
					}
				},
				error:function(error){
					console.log(error);
				}
			});
		},






		transformTime: function (times) {
			var time = new Date(times);
			var year = time.getFullYear();
			var month = time.getMonth() + 1;
			month = (month<10?'0':'') + month;
			var day = time.getDate();
			day = (day<10?'0':'') + day;
			var week = time.getDay();//周一 1
			var arr = [7,1,2,3,4,5,6];
			week = arr[week];
			var hour = time.getHours(); //
			hour = (hour<10?'0':'') + hour;
			var minutes = time.getMinutes();
			minutes = (minutes<10?'0':'') + minutes;
			var seconds = time.getSeconds();
			seconds = (seconds<10?'0':'') + seconds;
			var minllseconds = time.getMilliseconds();
			if(minllseconds<10){
				minllseconds = '00'+minllseconds;
			}else if(minllseconds<100){
				minllseconds = '0'+minllseconds;
			}
			return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
		}

	}
}

</script>
<style lang="less">
@import "../../../../public.less";
.advertiseArticleIndex{
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
		text-align: center;
	}
	.tabOpenType{
		.flex-grow(3);
	}
	.tabStatu{
		.flex-grow(2);
		line-height: 17px;
		padding-right: 10px;
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
	.recall{
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
}
</style>
