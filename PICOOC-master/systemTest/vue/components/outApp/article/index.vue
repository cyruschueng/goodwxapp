<template>
	<aside class="boHuiBox">
		<div class="sorts">
			<div class="sort part active" @click="toggleFun('')">全部文章(<span id="num1">{{totalNum}}</span>)</span></div>
			<div class="sort part" @click="toggleFun(2)">已驳回(<span id="num2">{{numsArr[2]}}</span>)</span></div>
			<div class="sort part" @click="toggleFun(0)">草稿箱(<span id="num3">{{numsArr[0]}}</span>)</span></div>
			<div class="sort part" @click="toggleFun(1)">待审核(<span id="num4">{{numsArr[1]}}</span>)</span></div>
			<div class="sort part" @click="toggleFun(3)">已发布(<span id="num5">{{numsArr[3]}}</span>)</span></div>
			<div class="sort sortRight">
				<img src="https://cdn2.picooc.com/web/res/system/images/write.png" alt=""/>
				<!--<span class="">撰写文章</span>-->
				<router-link class="zhuanXie" :to="{name:'outAppArticleAdd'}">撰写文章</router-link>
			</div>
		</div>
		<div class="articleList">

			<div class="articleItem" v-for="(item,index) in articleList">
				<div class="title">{{statusArr[item.expertStatus]+item.title}}</div>
				<div class="caoZuo">
					<!--[0:编辑中,1:待审核,2:已驳回,3:已发布]（默认全部）-->
					<span v-if="item.expertStatus==0" @click="submitItem(item.id,index)">提交审核</span>
					<router-link v-show="item.expertStatus==0 || item.expertStatus==2" class="edit" :to="{name:'outAppArticleAdd',query: { id:item.id}}">编辑</router-link>
					<span v-if="item.expertStatus==0 || item.expertStatus==2" @click="deleteConfirm(item.id,index)">删除</span>
				</div>
			</div>
		</div>
		<pageList :currentPage="currentPage" :pageCount="pageCount" :pageChangeNum="pageChangeNum" @changeCurrentPage="changeCurrentPage" @changePageChangeNum="changePageChangeNum"></pageList>
		<fixBg :detaile="'亲爱的有品达人用户，每一篇文章都是你的辛勤付出与劳动所得，一旦删除将无法找回。'" :confirmData="confirmData" @confirmClick="deleteItem"></fixBg>
	</aside>

</template>
<script>
	import pageList from "../../app/public/pageList.vue";//引入别的vue
	import fixBg from "../../app/public/fixBg.vue";//引入别的vue

	export default{
		components: {
			pageList,
			fixBg
		},
		data: function () {
			return {
				articleList:[],
				confirmData: {},
				statusArr:[' 「草稿箱」 ', ' 「待审核」 ', ' 「已驳回」 ', ' 「已发布」 '],
				getListBtn:true,
				numsArr:[],
				totalNum:0,

				currentPage: 1,
				pageCount: 1,
				pageChangeNum: 1,
				pageSize: publicData.pageSize,
//				pageSize: 1,
				title:'',//模糊查询
				status:''//[0:编辑中,1:待审核,2:已驳回,3:已发布]（默认全部）
			}
		},
		created: function () {
			getWindowSearch();
			this.getArticleList(this.currentPage,this.pageSize,this.title,this.status);
		},
		mounted: function () {
			$('.boHuiBox .sorts .part').unbind('click').click(function(){
				var index = $(this).index();
				$('.boHuiBox .sorts .part').removeClass('active').eq(index).addClass('active');
			});
		},
		methods:{
			changeCurrentPage: function(index) {
				this.currentPage = index;
				this.getArticleList(this.currentPage,this.pageSize,this.title,this.status);
			},
			changePageChangeNum: function (index) {
				this.pageChangeNum = index;
			},

			toggleFun: function (status) {
				if(status === ''){
					this.statusArr = [' 「草稿箱」 ', ' 「待审核」 ', ' 「已驳回」 ', ' 「已发布」 '];
				}else{
					this.statusArr = ['','','',''];
				}
				this.status = status;
				this.currentPage = 1;
				this.getArticleList(this.currentPage,this.pageSize,this.title,this.status);
			},

			//列表
			getArticleList: function (currentPage,pageSize,title,status) {
				let _this = this;
				let finalUrl = ajaxLink + 'picooc-background/expertBackground/article/list?'+token+windowSearch+'&currentPage='+currentPage+'&pageSize='+pageSize+'&title='+title+'&status='+status;
				$.ajax({
					type:'get',
					url:finalUrl,
					success:function(data){
						console.log('我的文章列表',data);
						if(data.code == 200){
							var listData = data.data;
							_this.articleList = listData.recordList;


							if(_this.getListBtn){
								_this.getListBtn = false;
								var statusArr = [];
								for(var i=0; i<_this.articleList.length; i++){
									statusArr.push(_this.articleList[i].expertStatus);
								}

								var json = [0,0,0,0];
								for(var i=0; i<statusArr.length; i++){
									//最开始json[str.charAt(i)]为undefined;
									if(!json[statusArr[i]]){
										json[statusArr[i]] = 1;
									}else{
										json[statusArr[i]] ++;
									}
								}
								_this.numsArr = json;

								var count = 0;
								for(var j=0; j<json.length; j++){
									count+=_this.numsArr[j];
								}
								_this.totalNum = count;
								console.log(_this.numsArr);
								console.log(_this.totalNum);
							}

							_this.currentPage = currentPage;
							_this.pageSize = pageSize;
							if(listData.recordList.length>0){
								_this.pageCount=listData.pageCount;
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
			//提交审核
			submitItem: function (id, index) {
				let _this = this;
				let finalUrl = ajaxLink + 'picooc-background/expertBackground/article/submitAudit?' + token + windowSearch + '&id=' + id;
				$.ajax({
					type: 'get',
					url: finalUrl,
					success: function (data) {
						console.log(data);
						if (data.code == 200) {
							_this.articleList[index].expertStatus = 1;
							$('body').css('overflow','hidden');
							$('.alertWrap .submitBox').show();
							$('.alertWrap').show();
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
			//删除
			deleteItem: function (confirmData) {
				let id = confirmData.id;
				let index = confirmData.index;
				let _this = this;
				let finalUrl = ajaxLink + 'picooc-background/expertBackground/article/delete?' + token + windowSearch + '&id=' + id;
				$.ajax({
					type: 'get',
					url: finalUrl,
					success: function (data) {
						console.log(data);
						if (data.code == 200) {
							_this.articleList.splice(index, 1);
						} else {
							alert(data.msg);
						}
					},
					error: function (error) {
						console.log(error);
					}
				});
			},
		}
	}
</script>

<style lang="less">
	@import "../../../public.less";
	.boHuiBox{
		position: relative;
		margin-bottom: 10/@rem;
		padding-bottom: 20/@rem;


		.sorts{
			background: #444444;
			height: 26/@rem;
			align-items:center;
			.flex;
			.sort{
				cursor:pointer;
				margin: 0 10/@rem;
				text-align: center;
				/*width: 60/@rem;*/
				font-size: 8/@rem;
				color: #999999;
			}
			.active{
				color: #fff;
				border-bottom:1px solid #fff;
			}
			.sortRight{
				flex-grow: 2;
				color: #fff;
				text-align: right;
				margin-right: 24/@rem;
				.zhuanXie{
					color: #fff;
				}
				img{
					width: 12/@rem;
					margin-right:7/@rem;
				}
			}
		}
		.articleList{
			border: 1px solid #999;
			.articleItem{
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
					span{
						text-align: center;
						cursor:pointer;
						min-width: 36/@rem;
						color: #1BB0F9;
					}
					.edit{
						text-align: center;
						cursor:pointer;
						min-width: 36/@rem;
						color: #1BB0F9;
						display: inline-block;
					}
				}
			}
			.articleItem:last-child{
				border-bottom: none;
			}
		}
	}
</style>
