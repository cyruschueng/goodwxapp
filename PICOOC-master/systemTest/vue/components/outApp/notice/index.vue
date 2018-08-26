<template>
	<aside class="reportBox">
		<div class="sorts">
			<div class="sort part active" v-bind:class="[msgRed? 'redPoint' : '']" @click="toggleFun(0)">我的消息</div>
			<div class="sort part" v-bind:class="[noticeRed? 'redPoint' : '']" @click="toggleFun(1)">公告通知</span></div>
		</div>
		<div v-if="part==0" class="infoList" v-for="(item,index) in msgList">
			<div class="infoItem">
				<div class="title">{{item.msg}}</div>
				<div class="caoZuo">{{item.createTime}}</div>
			</div>
		</div>
		<div v-if="part==1" class="infoList" v-for="(item,index) in noticeList">
			<div class="infoItem">
				<div class="title">{{item.notice}}</div>
				<div class="caoZuo">{{item.updateTime}}</div>
			</div>
		</div>
		<pageList :currentPage="currentPage" :pageCount="pageCount" :pageChangeNum="pageChangeNum" @changeCurrentPage="changeCurrentPage" @changePageChangeNum="changePageChangeNum"></pageList>
	</aside>
</template>
<script>
	import pageList from "../../app/public/pageList.vue";//引入别的vue

	export default{
		props:["msgRed", "noticeRed"],
		components: {
			pageList
		},
		data: function () {
			return {
				part:0,//0:我的消息，1：公告通知
				msgList:[],
				noticeList:[],
				currentPage: 1,
				pageCount: 1,
				pageChangeNum: 1,
				pageSize: publicData.pageSize,
//				pageSize: 1,

			}
		},
		created: function () {
			getWindowSearch();
			this.getMyMsgList(this.currentPage,this.pageSize);

		},
		mounted: function () {
			let _this = this;
			$('.reportBox .sorts .part').unbind('click').click(function(){

				var index = $(this).index();
				$('.reportBox .sorts .part').removeClass('active').eq(index).addClass('active');
				_this.part = index;
			});
		},
		methods:{
			changeCurrentPage: function(index) {
				this.currentPage = index;
				if(this.part ==0){
					this.getMyMsgList(this.currentPage,this.pageSize);
				}else if(this.part ==1){
					this.getNoticeList(this.currentPage,this.pageSize);
				}
			},
			changePageChangeNum: function (index) {
				this.pageChangeNum = index;
			},

			toggleFun: function (part) {
				this.part = part;
				this.currentPage = 1;
				if(this.part ==0){
					this.getMyMsgList(this.currentPage,this.pageSize);
				}else if(this.part ==1){
					this.getNoticeList(this.currentPage,this.pageSize);
				}
			},
			//个人消息列表
			getMyMsgList: function (currentPage,pageSize) {
				let _this = this;
				let finalUrl = ajaxLink + 'picooc-background/expertBackground/personmessage/list?'+token+windowSearch+'&currentPage='+currentPage+'&pageSize='+pageSize;
				$.ajax({
					type:'get',
					url:finalUrl,
					success:function(data){
						console.log('我的消息',data);
						if(data.code == 200){
							var msgData = data.data;
							_this.msgList = msgData.recordList;

							_this.currentPage = currentPage;
							_this.pageSize = pageSize;
							if(msgData.recordList.length>0){
								_this.pageCount=msgData.pageCount;
							}else{
								_this.pageCount=1;
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
			//公告列表
			getNoticeList: function (currentPage,pageSize) {
				let _this = this;
				let finalUrl = ajaxLink + 'picooc-background/expertBackground/notice/list?'+token+windowSearch+'&currentPage='+currentPage+'&pageSize='+pageSize;
				$.ajax({
					type:'get',
					url:finalUrl,
					success:function(data){
						console.log('公告通知',data);
						if(data.code == 200){
							var noticeData = data.data;
							_this.noticeList = noticeData.recordList;
							console.log(_this.noticeList);

							_this.currentPage = currentPage;
							_this.pageSize = pageSize;
							if(noticeData.recordList.length>0){
								_this.pageCount=noticeData.pageCount;
							}else{
								_this.pageCount=1;
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
		}
	}
</script>

<style lang="less">
	@import "../../../public.less";
	.reportBox{
		position: relative;
		margin-bottom: 10/@rem;
		padding-bottom: 20/@rem;


		.sorts{
			background: #444444;
			height: 26/@rem;
			align-items:center;
			.flex;
			.sort{
				padding: 0 2/@rem;
				cursor:pointer;
				margin: 0 10/@rem;
				text-align: center;
				/*width: 60/@rem;*/
				font-size: 8/@rem;
				color: #999999;
			}
			.redPoint{
				background: url("https://cdn2.picooc.com/web/res/system/images/redPoint.png") no-repeat 32/@rem 0;
			}
			.active{
				color: #fff;
				border-bottom:1px solid #fff;
			}
		}
		.infoList{
			border: 1px solid #999;
			.infoItem{
				border-bottom: 1px solid #999999;
				height: 24/@rem;
				line-height: 24/@rem;
				font-size: 8/@rem;
				.flex;
				.title{
					color: #666666;
					padding-left: 10/@rem;
					flex-grow: 1;
				}
				.caoZuo{
					margin-right:20/@rem;
				}
			}
			.infoItem:last-child{
				border-bottom: none;
			}
		}
	}
</style>
