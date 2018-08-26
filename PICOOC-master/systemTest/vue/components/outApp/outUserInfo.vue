<template>
	<aside class="userInfoWrap">
		<div class="userInfo flex">
			<div class="headImg"><img class="icon" v-bind:src="head" alt=""><span class="username">{{name}}</span></div>
			<div class="count"><span class="num">{{article}}</span><br><span>文章总数</span></div>
		</div>
	</aside>
</template>
<script type="text/javascript">
	export default{
		data: function () {
			return {
				name:'',
				head:'',
				article:0,

				currentPage: 1,
				pageCount: 1,
				pageChangeNum: 1,
				pageSize: publicData.pageSize,
				title:'',//模糊查询
				status:''//[0:编辑中,1:待审核,2:已驳回,3:已发布]（默认全部）
			}
		},
		created: function () {
			getWindowSearch();
			this.getUserInfo(this.currentPage,this.pageSize,this.title,this.status);
		},

		methods:{
			getUserInfo: function () {
				let _this = this;
				let finalUrl = ajaxLink + 'picooc-background/expertBackground/user/index?'+token+windowSearch;
				$.ajax({
					type:'get',
					url:finalUrl,
					success:function(data){
						console.log('获取用户信息',data);
						if(data.code == 200){

							_this.name = data.data.name;
							_this.head = data.data.head;
							_this.article = data.data.article;
							$('#headImgIcon').attr('src', _this.head);

						}else{
//							alert(data.msg);
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
@import "../../public.less";

.userInfoWrap{
	width: 100%;
	height: 100/@rem;
	/*line-height: 50px;*/
	background: #fff;
	.userInfo{
		font-weight: bold;
		padding: 0 55/@rem 0 25/@rem;
		height: 100%;
		margin: 0 auto;
		align-items:center;
		background: url("https://cdn2.picooc.com/web/res/system/images/bg.png") no-repeat;
		/*background-size: 100% 100%;*/
		justify-content:space-between;
		.headImg{
			.icon{
				width: 60/@rem;
				height: 60/@rem;
				border-radius: 60/@rem;
			}
			.username{
				padding-left: 10/@rem;
				font-size: 12/@rem;
				color: #333;
			}
		}
		.count{
			line-height: 18/@rem;
			font-size: 12/@rem;
			color: #333333;
			text-align: center;
			.num{
				font-size: 20/@rem;
			}
		}

	}
}

</style>
