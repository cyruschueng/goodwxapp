<template>
	<div class="articleIndex">
		<div class="title">管理后台 > APP > 内容管理 > 达人文章管理</div>
		<search @search="search" />
		<aside class="tabTop">
			<div class="jumpBtn jumpBtnActive" @click="changeType(1)">已发布</div>
			<div  class="jumpBtn" @click="changeType(0)">草稿箱</div>
			<pageList v-if="pageCount > 0" :currentPage="currentPage" :pageCount="pageCount" :pageChangeNum="pageChangeNum" @changeCurrentPage="changeCurrentPage" @changePageChangeNum="changePageChangeNum"></pageList>
		</aside>
		<section class="tab">
			<aside class="tabLi">
				<div class="tabId">ID</div>
				<div class="tabPic">图片</div>
				<div class="tabArticleTitle">文章标题</div>
				<div class="tabOpenType">栏目</div>
				<div class="tabStatu">状态</div>
				<div class="tabLastOperation">最后操作</div>
				<div class="tabOperation">操作</div>
			</aside>
			<aside class="tabLi" v-for="(item,index) in list1" :key="index">
				<div class="tabId">{{item.id}}</div>
				<div class="tabPic"><img class="tabPicImg" :src="item.image" /></div>
				<div class="tabArticleTitle">{{item.title}}</div>
				<div class="tabOpenType">
                    <span v-for="(itemType,index) in item.programs" :key="index">
                        <span v-if="index==item.programs.length-1">{{itemType.name}}</span>
                        <span v-else>{{itemType.name}}、</span>
                    </span>
                </div>
				<div class="tabStatu">
                    <span v-if="item.status==0">编辑中</span
                    ><span v-else-if="item.status==1">待审核,</span>
                    <span  v-else-if="item.status==2">待发布</span>
                    <span  v-else-if="item.status==3">已发布</span>
                    <span  v-else-if="item.status==4">有更新</span>
                </div>
				<div class="tabLastOperation" v-html="item.lastOperationRecord"></div>
				<div class="tabOperation">
					<router-link class="changeBtn" :to="{name:'appContentOutArticleAdd',query: { id:item.id}}">编辑</router-link>
					<div class="changeBtn examine" v-show="item.status==0" @click="examine(item.id,index)">提交审核</div>
					<div class="changeBtn pass" v-show="item.status==1" @click="pass(item.id,index)">审核通过</div>
					<div class="changeBtn publish" v-show="item.status==2" @click="publish(item.id,index)">发布</div>
					<div class="changeBtn reject" v-show="item.status==1 || item.status==2 || item.status==0" @click="reject(item.id,index)">驳回</div>
					<div class="update" v-show="item.status==4" @click="update(item.id,index)">更新</div>
					<div class="withdraw" v-show="item.status==3 || item.status==4"  @click="withdraw(item.id,index)">撤回</div>
					<div class="preview" @click="preview(item.id)">预览</div>
					<!-- <div class="delete"><span @click="deleteConfirm(item.id,index)">删除</span></div> -->
				</div>
			</aside>
		</section>
		<!-- <fixBg :detaile="'确定删除该文章吗?'" :confirmData="confirmData" @confirmClick="deleteItem"></fixBg> -->
		<div class="rejectBox" ref="rejectBox">
            <div class="box">
                <div class="box_title">驳回原因</div>
				
                <div class="readme">
                    <textarea name="" id="" v-model.trim="reason"></textarea>
                </div>
                <div class="oprate"><button class="" :rejectData="rejectData" @click="rejactItem">确定</button class="save"><button class="cancel" @click="addAlertsHide" ref="cancel">取消</button></div>
            </div>
        </div>
		<div id="qrcode">
			<div id="qrcodeUrl"></div>
			<div id="qrcodeClose" @click="closePreview">关闭</div>
		</div>
	</div>
</template>
<script>
import pageList from "../../public/pageList.vue";//引入别的vue
import search from "../../public/search.vue";//引入别的vue
import fixBg from "../../public/fixBg.vue";//引入别的vue
console.log(pageList);
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
			pageCount: 0,
			pageChangeNum: 1,
			confirmData: {},
			searchData: "",
			reason:null,
			rejectData:{},
		}
	},
	created: function () {
		getWindowSearch();
		this.getList();
	},
	methods: {
		// 获取达人文章列表
		getList: function (searchData) {
			let status = 0;
			if (this.type == 1) {//已发布
				status = 1;
			}
			let url;
			if (typeof searchData != "undefined") {//用户搜索时添加参数searchData
				url = ajaxLink + "picooc-background/article/expertList?" + token + "&status=" + status + "&currentPage=" + this.currentPage + "&pageSize=" + publicData.pageSize + "&title=" + searchData;
				// url=ajaxLink+"picooc-background/article/list?"+token+"&status="+status+"&currentPage="+this.currentPage+"&pageSize="+publicData.pageSize+"&title="+searchData;

			}
			else {//正常请求
				url = ajaxLink + "picooc-background/article/expertList?" + token + "&status=" + status + "&currentPage=" + this.currentPage + "&pageSize=" + publicData.pageSize;
				// url=ajaxLink+"picooc-background/article/list?"+token+"&status="+status+"&currentPage="+this.currentPage+"&pageSize="+publicData.pageSize;			
			}
			let me = this;
			$.ajax({
				type: "get",
				url: url,
				success: function (data) {
					if (data.code == 200) {
						console.log(data.data.recordList.length);
						me.list1 = data.data.recordList;//获取渲染数据
						me.pageCount = data.data.pageCount;//总页数
						console.log('lisg', me.list1)
					} else {
						alert(data.msg);
					}
				}
			})
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
			this.closePreview();
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
		addAlertsHide:function(){
			this.$refs.rejectBox.style.display="none";
		},
		reject: function (id, index) {
			console.log(3)
			this.$refs.rejectBox.style.display="block";
			this.rejectData = {
				id:id,
				index:index
			};
			
		},
		withdraw: function (id, index) {
			let url = ajaxLink + "picooc-background/article/unPublish?" + token + "&id=" + id;
			let me = this;
			$.ajax({
				type: "get",
				url: url,
				success: function (data) {
					if (data.code == 200) {
						//me.list1[index].status=0;
						router.go(0);
					}
					else {
						alert(data.msg);
					}
				}
			})
		},
		examine: function (id, index) {
			let url = ajaxLink + "picooc-background/article/submitAudit?" + token + windowSearch + "&id=" + id;
			let me = this;
			$.ajax({
				type: "get",
				url: url,
				success: function (data) {
					if (data.code == 200) {
						me.list1[index].status = 1;
					}
					else {
						alert(data.msg);
					}
				}
			})
		},
		pass: function (id, index) {
			let url = ajaxLink + "picooc-background/article/auditPass?" + token + windowSearch + "&id=" + id;
			let me = this;
			$.ajax({
				type: "get",
				url: url,
				success: function (data) {
					if (data.code == 200) {
						me.list1[index].status = 2;
					}
					else {
						alert(data.msg);
					}
				}
			})
		},
		publish: function (id, index) {
			let url = ajaxLink + "picooc-background/article/publish?" + token + windowSearch + "&id=" + id;
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
			let url = ajaxLink + "picooc-background/article/delete?" + token + windowSearch + "&id=" + id;
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
		rejactItem:function(){
			
			let me = this;
			if(me.reason== ''){
				alert('驳回原因不能为空');
			}
			// var rejectData = {
			// 	id : me.rejectData.id,
			// 	reason:me.reason
			// }
			let url = ajaxLink + "picooc-background/article/reject?" + token+"&id="+me.rejectData.id+"&reason="+me.reason;
			$.ajax({
				type: "post",
				url: url,
				// data:JSON.stringify(rejectData),
				contentType: "application/json; charset=utf-8",
				success: function (data) {
					if (data.code == 200) {
						me.list1.splice(me.rejectData.index,1);
						me.$refs.rejectBox.style.display="none";
					}
					else {
						alert(data.msg);
					}
				}
			})
		},
		preview(id) {
			$("#qrcode").css("display", "block");
			$("#qrcodeUrl").html("");
			let qrcode, text;
			text = ajaxLink + 'article/view/' + id;
			qrcode = new QRCode("qrcodeUrl", {
				text: text,
				width: 128,
				height: 128,
				colorDark: "#000000",
				colorLight: "#ffffff",
				correctLevel: QRCode.CorrectLevel.H
			});
			qrcode.clear(); // 清除代码
			qrcode.makeCode(text); // 生成另外一个二维码
		},
		closePreview() {
			$("#qrcode").css("display", "none");
			$("#qrcodeUrl").html("");
		}
	}
}
</script>
<style lang="less">
@import "../../../../public.less";
.articleIndex {
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
   .rejectBox {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    text-align: center;
    font-size: 1rem;
    padding: 0 25px;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
    .box {
      width: 500px;
      height: 290px;
      background: #fff;
      position: absolute;
      z-index: 1000;
      padding: 0 40px;
      top: 50%;
      left: 50%;
      margin: -150px 0 0 -250px;
    }
    .box_title {
      text-align: left;
      height: 40px;
	  line-height: 40px;
	  margin: 20px 0;
    }
    
    .readme {
      height: 100px;
    }
    .readme textarea {
      width: 436px;
      height: 100px;
      border: 1px solid #d2d2d2;
    //   margin-left: 32px;
    }
    .oprate {
      margin-top: 40px;
    }
    .oprate button {
      border-radius: 10px;
      width: 84px;
      height: 30px;
      line-height: 30px;
      color: #4a90e2;
      margin-left: 20px;
      display: inline-block;
      border: 1px solid #d2d2d2;
    }
  }
}
</style>
