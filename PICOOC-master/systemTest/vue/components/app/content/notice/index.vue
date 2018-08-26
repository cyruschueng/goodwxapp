<template>
	<div class="noticeIndex">
		<div class="title">管理后台 > APP > 内容管理 > 公告</div>
		<!-- <search @search="search" /> -->
        <router-link class="add" :to="{name:'appContentNoticeAdd'}">新增</router-link>
		<aside class="tabTop">
			<div class="jumpBtn jumpBtnActive" @click="changeType(1)">已发布</div>
			<div  class="jumpBtn" @click="changeType(0)">草稿箱</div>
			<pageList v-if="pageCount > 0" :currentPage="currentPage" :pageCount="pageCount" :pageChangeNum="pageChangeNum" @changeCurrentPage="changeCurrentPage" @changePageChangeNum="changePageChangeNum"></pageList>
		</aside>
		<section class="tab">
			<aside class="tabLi">
				<div class="tabId">ID</div>
				<div class="tabPic">公告详情</div>
				<div class="tabLastOperation">最后操作</div>
				<div class="tabOperation">操作</div>
			</aside>
			<aside class="tabLi"  v-for="(item,index) in list1" :key="item.id">
				<div class="tabId">{{item.id}}</div>
				<div class="tabPic">{{item.notice}}</div>
				<div class="tabLastOperation" v-html="item.lastOperationRecord"></div>		
				<div class="tabOperation">
					<router-link class="changeBtn" :to="{name:'appContentNoticeAdd',query: { id:item.id}}">编辑</router-link>
					<div class="changeBtn examine" v-show="item.status==1" @click="rejectNotice(item.id,index)">下线</div>
					<div class="changeBtn pass" v-show="item.status==0" @click="passNotice(item.id,index)">上线</div>
					<div class="changeBtn publish" v-show="item.status==0" @click="delNotice(item.id,index)">删除</div>
				</div>
			</aside>
		</section>
		<fixBg :detaile="'确定删除该公告吗?'" :confirmData="confirmData" @confirmClick="deleteItem"></fixBg>
		<!-- <div id="qrcode">
			<div id="qrcodeUrl"></div>
			<div id="qrcodeClose" @click="closePreview">关闭</div>
		</div> -->
	</div>
</template>
<script>
import pageList from "../../public/pageList.vue";//引入别的vue
import search from "../../public/search.vue";//引入别的vue
import fixBg from "../../public/fixBg.vue";//引入别的vue
export default {
	props: [],
	components: {
		search,
		pageList,
		fixBg
	},
	data() {
		return {
			type: 1,
			list1: [],
			currentPage: 1,
			pageCount: 1,
			pageChangeNum: 1,
			confirmData: {},
			searchData: ""
		}
	},
	created: function () {
		this.getList();
	},
	methods: {
		// 获取公告列表
		getList: function (searchData) {
			let status = 0;
			if (this.type == 1) {//已发布
				status = 1;
			}
			let url;
			if (typeof searchData != "undefined") {//用户搜索时添加参数searchData
				// url=ajaxLink+"picooc-background/article/expertList?"+token+"&status="+status+"&currentPage="+this.currentPage+"&pageSize="+publicData.pageSize+"&title="+searchData;
				url = ajaxLink + "picooc-background/expert/notice/list?" + token + "&status=" + status + "&currentPage=" + this.currentPage + "&pageSize=" + publicData.pageSize + "&searchName=" + searchData;

			}
			else {//正常请求
				// url=ajaxLink+"picooc-background/article/expertList?"+token+"&status="+status+"&currentPage="+this.currentPage+"&pageSize="+publicData.pageSize;
				url = ajaxLink + "picooc-background/expert/notice/list?" + token + "&status=" + status + "&currentPage=" + this.currentPage + "&pageSize=" + publicData.pageSize;
			}
			let me = this;
			$.ajax({
				type: "get",
				url: url,
				success: function (data) {
					if (data.code == 200) {
						// console.log(data);
						// console.log(data.data.recordList.length);
						me.list1 = data.data.recordList;//获取渲染数据
						me.pageCount = data.data.pageCount;//总页数
						// console.log('lisg',me.list1)
					} else {
						alert(data.msg);
					}
				}
			})
		},
		changeCurrentPage: function (index) {//获取某一页数据
			this.currentPage = index;
			this.getList(this.searchData);
		},
		changePageChangeNum: function (index) {
			this.pageChangeNum = index;//改变页码
		},
		search: function (searchData) {//用户搜索
			this.currentPage = 1;
			this.searchData = searchData;
			this.getList(searchData);
		},
		changeType: function (type) {//切换已发布与草稿箱
			this.type = type;
			this.list1 = [];
			this.currentPage = 1;
			this.pageChangeNum = 1;
			this.searchData = "";
			$(".jumpBtn").removeClass("jumpBtnActive");
			$(".jumpBtn").eq(type - 1).addClass("jumpBtnActive");
			this.getList();//请求文章列表
			// this.closePreview();
		},
		delNotice: function (id, index) {//删除
			this.confirmData = {
				id: id,
				index: index
			};
			$(".fixBg").css("display", "block");
		},
		deleteItem: function (confirmData) {//确定删除
			let id = confirmData.id;
			let index = confirmData.index;
			let url = ajaxLink + "picooc-background/expert/notice/delete?" + token + "&id=" + id;
			let me = this;
			$.ajax({
				type: "get",
				url: url,
				success: function (data) {
					if (data.code == 200) {
						me.list1.splice(index, 1);
					}
					else {
						alert(data.msg);
					}
				}
			})
		},
		rejectNotice: function (id,index) {//下线
			// let id = confirmData.id;
			// let index = confirmData.index;
			let url = ajaxLink + "picooc-background/expert/notice/reject?" + token + "&id=" + id;
			let me = this;
			$.ajax({
				type: "get",
				url: url,
				success: function (data) {
					if (data.code == 200) {
						router.go(0);
					}
					else {
						alert(data.msg);
					}
				}
			})
		},
		passNotice:function(id,index){
			// let id = confirmData.id;
			// let index = confirmData.index;
			let url = ajaxLink + "picooc-background/expert/notice/pass?" + token + "&id=" + id;
			let me = this;
			$.ajax({
				type: "get",
				url: url,
				success: function (data) {
					if (data.code == 200) {
						router.go(0);
						// me.list1.splice(index, 1);
					}
					else {
						alert(data.msg);
					}
				}
			})
		}
	}
}
</script>
<style lang="less">
@import "../../../../public.less";
.noticeIndex {
  .jumpBtn {
    display: inline-block;
    width: 75px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    margin: 20px 0 0;
    color: #c1c7d2;
    background: #f8fbff;
    .border-top(1px,#C1C7D2);
    .border-left(1px,#C1C7D2);
    .border-right(1px,#C1C7D2);
  }
  .jumpBtnActive {
    color: #333333;
    background: #ffffff;
  }

  .tab {
    .border-top(1px,#C1C7D2);
    .border-left(1px,#C1C7D2);
    .border-right(1px,#C1C7D2);
    font-size: 12px;
    background: #ffffff;
    margin-bottom: 20px;
  }
  .tabLi {
    .flex;
    .border-bottom(1px,#C1C7D2);
    align-items: center;
    padding: 14px 0;
  }
  .tabId {
    .flex-grow();
    text-align: center;
  }
  .tabPic {
    .flex-grow(4);
    padding-right: 20px;
    text-align: center;
    // background: center center no-repeat;
    // background-image: url("http://picoocyy.oss-cn-shanghai.aliyuncs.com/detection/thumb/2017-09-26/%E5%81%A5%E5%BA%B7%E9%A4%90.jpg");
  }
  .tabPicImg {
    /*width: 100%;*/
    width: 124px;
    height: 38px;
  }
  .tabArticleTitle {
    .flex-grow(4);
    line-height: 17px;
    padding-right: 20px;
  }
  .tabStrategy {
    .flex-grow(3);
    line-height: 17px;
  }
  .tabOpenType {
    .flex-grow(3);
  }
  .tabStatu {
    .flex-grow(2);
    line-height: 17px;
    padding-right: 20px;
  }
  .tabLastOperation {
    .flex-grow(5);
    line-height: 17px;
  }
  .tabOperation {
    .flex-grow(5);
    .flex;
  }
  .changeBtn,
  .update,
  .withdraw,
  .preview {
    color: #4a90e2;
    .flex-grow(1);
  }
  .delele {
    color: #fd4f5d;
  }
  .add {
    display: inline-block;
    background: #ffffff;
    padding: 0 23px;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    color: #4a90e2;
    .border(1px,#C1C7D2);
    .border-radius(15px);
  }
  #qrcode {
    display: none;
    width: 180px;
    height: 180px;
    background: #fff;
    position: fixed;
    top: 40%;
    left: 50%;
    z-index: 999;
  }
  #qrcodeUrl {
    position: absolute;
    width: 128px;
    height: 128px;
    top: 50%;
    left: 50%;
    margin: -64px 0 0 -64px;
  }
  #qrcodeClose {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
