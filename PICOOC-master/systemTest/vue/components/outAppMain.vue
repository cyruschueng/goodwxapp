<template>
	<div class="outUserWrap">
		<outUserInfo />
		<div class="outUser flex">
			<div class="warningTip"> 「公告」 {{noticeStr}}</div>
			<outAppLeft :msgRed="msgRed" :noticeRed="noticeRed"></outAppLeft>
			<router-view name="outAppRight" :msgRed="msgRed" :noticeRed="noticeRed"></router-view>
		</div>
	</div>
</template>
<script>
import outUserInfo from "./outApp/outUserInfo.vue";//引入别的vue
import outAppLeft from "./outApp/outAppLeft.vue";//引入别的vue
export default {
	components:{
		outUserInfo,
		outAppLeft
	},
	data: function () {
		return {
			userId:1,
			noticeStr:'',

			msgRed:'',
			noticeRed:'',

		}
	},
	created: function () {
		getWindowSearch();
		this.getNoticeList(1,1,this.userId);
		this.msgRedFun(this.userId);
		this.noticeRedFun(this.userId);
	},
	methods:{
		//公告列表
		getNoticeList: function (currentPage,pageSize,userId) {
			let _this = this;
			let finalUrl = ajaxLink + 'picooc-background/expertBackground/notice/list?'+token+windowSearch+'&currentPage='+currentPage+'&pageSize='+pageSize+'&userId='+userId;
			$.ajax({
				type:'get',
				url:finalUrl,
				success:function(data){
					console.log('获取第一条公告',data);
					if(data.code == 200){
						_this.noticeStr = data.data.recordList[0].notice;
					}else{
						alert(data.msg);
					}
				},
				error:function(error){
					console.log(error);
				}
			});
		},
		//我的消息小红点
		msgRedFun: function (userId) {
			let _this = this;
			let finalUrl = ajaxLink + 'picooc-background/expertBackground/personmessage/getUpdate?'+token+windowSearch+'&userId='+userId;
			$.ajax({
				type:'get',
				url:finalUrl,
				success:function(data){
					console.log('我的消息小红点',data);
					if(data.code == 200){
						_this.msgRed = data.data;
					}else{
						alert(data.msg);
					}
				},
				error:function(error){
					console.log(error);
				}
			});
		},
		//公告小红点
		noticeRedFun: function (userId) {
			let _this = this;
			let finalUrl = ajaxLink + 'picooc-background/expertBackground/notice/getUpdate?'+token+windowSearch+'&userId='+userId;
			$.ajax({
				type:'get',
				url:finalUrl,
				success:function(data){
					console.log('公告小红点',data);
					if(data.code == 200){
						_this.noticeRed = data.data;
					}else{
						alert(data.msg);
					}
				},
				error:function(error){
					console.log(error);
				}
			});
		}
	}
}
</script>
<style lang="less">
@import "../public.less";
.outUserWrap{
	width: 100%;
	.outUser{
		flex-wrap:wrap;
	}
	.warningTip{
		width: 100%;
		font-size: 10/@rem;
		color: #FFFFFF;
		height: 26/@rem;
		line-height: 26/@rem;
		padding-left: 33/@rem;
		background-color: #1BB0F9;
	}
}
</style>