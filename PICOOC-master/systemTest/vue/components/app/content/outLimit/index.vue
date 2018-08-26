<template>
	<div class="outLimit">
		<div class="title">管理后台 > APP > 内容管理 > 达人权限管理</div>
		<!-- <search @search="search" /> -->
        
		<aside class="tabTop">
            <div class="add" @click='addAlertsShow'>新增达人</div>
			<!-- <div class="jumpBtn jumpBtnActive" @click="changeType(1)">已发布</div>
			<div  class="jumpBtn" @click="changeType(2)">草稿箱</div> -->
			<pageList v-if="pageCount > 0" :currentPage="currentPage" :pageCount="pageCount" :pageChangeNum="pageChangeNum" @changeCurrentPage="changeCurrentPage" @changePageChangeNum="changePageChangeNum"></pageList>
		</aside>
		<section class="tab">
			<aside class="tabLi">
				<div class="tabId">UID</div>
				<div class="tabPic">头像</div>
				<div class="tabArticleTitle">用户昵称</div>
				<div class="tabOpenType">已发布文章</div>
				<div class="tabStatu">备注</div>
				<div class="tabLastOperation">最后操作</div>
				<div class="tabOperation">操作</div>
			</aside>
			<aside class="tabLi" v-for="(item,index) in list1" :key="item.id">
				<div class="tabId">{{item.picoocUid}}</div>
				<div class="tabPic"><img class="tabPicImg" :src="item.head" ref="headImg" :gender="item.gender" @error="onerror"/></div>
				<div class="tabArticleTitle">{{item.userName}}</div>
				<div class="tabOpenType">{{item.article}}</div>
				<div class="tabStatu">{{item.dsc}}</div>
				<div class="tabLastOperation" v-html="item.lastOperationRecord"></div>
				<div class="tabOperation">
					<div class="changeBtn" @click="deleteConfirm(item.id,index)">删除</div>
				</div>
			</aside>
		</section>
		<fixBg :detaile="'确定删除该达人吗?'" :confirmData="confirmData" @confirmClick="deleteExpert"></fixBg>
        <div class="alertBox" ref="alertBox">
            <div class="box">
                <div class="box_title">新增达人用户</div>
				<div class="phone">
                    <label for="">手机号/邮箱</label>
                    <label for="">
						<input type="text" v-model.trim='phoneNo' placeholder="输入正确的手机号或邮箱查询UID">
						<button @click="searchUID">查询</button>
					</label>
                </div>
                <div class="uid">
                    <label for="">*UID</label>
                    <label for=""><input type="text" v-model.trim='picoocUid'></label>
                </div>
                <div class="source" ref="source">
                    <label for=""> *来源</label>
                    <label for=""><input type="radio" value="0" name="source" @change="changeSource">  官方征集</label>
                    <label for=""><input type="radio" value="1" name="source" @change="changeSource">  主动申请</label>
                </div>
                <div class="readme">
                    <label for="">备注</label>
                    <label for="">
                        <textarea name="" id="" v-model.trim="dsc"></textarea>
                    </label>
                </div>
                <div class="oprate"><button class="" @click="addExpert">保存</button class="save"><button class="cancel" @click="addAlertsHide" ref="cancel">取消</button></div>
            </div>
        </div>
	</div>
</template>
<script>
import pageList from "../../public/pageList.vue"; //引入别的vue
import search from "../../public/search.vue"; //引入别的vue
import fixBg from "../../public/fixBg.vue"; //引入别的vue
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
			currentPage: 1,//当前页
			pageCount: 1,//总页数
			pageChangeNum: 1,//选择页码
			confirmData: {},
			searchData: "",//搜索数据
			picoocUid: null,//app内用户id
			origin: null,//来源[0:官方征集,1:主动申请]
			dsc: "",//描述
			phoneNo: "",//手机号或者邮箱
		};
	},
	created: function () {
		this.getList();
	},
	methods: {
		onerror:function(event){
			event.currentTarget.src = arrHeadImg[event.currentTarget.getAttribute('gender')];
		},
		changeSource: function (event) {
			this.origin = event.currentTarget.value;
			console.log(this.origin);
		},
		addAlertsShow: function () {
			this.$refs.alertBox.style.display = "block";
		},
		addAlertsHide: function () {
			this.$refs.alertBox.style.display = "none";
		},
		getList: function () {
			var self = this;
			$.ajax({
				url: ajaxLink + "picooc-background/expert/list?" + token + "&currentPage=" + this.currentPage + "&pageSize=" + publicData.pageSize,
				type: "get",
				success: function (data) {
					if (data.code == 200) {
						self.list1 = data.data.recordList;
						console.log(self.list1);
						self.pageCount = data.data.pageCount;//总页数
					}
					// console.log(data)
				}
			});
		},
		addExpert: function () {
			var self = this;
			var picoocUid = this.picoocUid;//app内用户id
			// console.log(picoocUid);
			var origin = this.origin;//来源[0:官方征集,1:主动申请]
			var dsc = this.dsc;//描述
			if (picoocUid == null) {
				alert('请输入UID');
				return false;
			}
			if (origin == null) {
				alert('请选择来源');
				return false;
			}
			let data = {
				"picoocUid": Number(picoocUid),
				'origin': Number(origin),
				"dsc": dsc,
			}
			$.ajax({
				url: ajaxLink + "picooc-background/expert/add?" + token,
				type: "post",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(data),
				success: function (data) {
					if (data.code == 200) {
						self.picoocUid = '';
						// for(let i = 0; i < self.$refs.source.querySelectorAll('input').length;i++){
						// 	 $(self.$refs.source.querySelectorAll('input')[i]).removeAttr('checked');
						// }

						self.$refs.alertBox.style.display = "none";
						self.getList();
					}
					else {
						alert(data.msg);
					}
				},
				error: function () {
					alert('网络错误');
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
		deleteExpert: function (confirmData) {
			let self = this;
			let id = confirmData.id;
			let index = confirmData.index;
			$.ajax({
				url: ajaxLink + "picooc-background/expert/delete?" + token + '&id=' + id,
				type: "get",
				success: function (data) {
					if (data.code == 200) {
						self.getList();
					}
					else {
						alert(data.msg);
					}
				},
				error: function () {
					alert('网络错误');
				}
			});
		},
		search: function (searchData) {//用户搜索
			this.currentPage = 1;
			this.searchData = searchData;
			this.getList(searchData);
		},
		changeCurrentPage: function (index) {//获取某一页数据
			this.currentPage = index;
			this.getList(this.searchData);
		},
		changePageChangeNum: function (index) {
			this.pageChangeNum = index;//改变页码
		},
		searchUID: function () {
			var self = this;
			var param = self.phoneNo;
			$.ajax({
				url: ajaxLink + "picooc-background/expert/getPicoocUid?" + token + '&param=' + param,
				type: "get",
				success: function (data) {
					if (data.code == 200) {
						self.picoocUid = data.data;
						self.phoneNo = '';
					}
					else {
						alert(data.msg);
					}
				},
				error: function () {
					alert('网络错误');
				}
			});
		}
	}
};
</script>
<style lang="less">
@import "../../../../public.less";
.outLimit {
  .add {
    margin-bottom: 20px;
  }
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
    width: 44px;
    height: 44px;
    border-radius: 50%;
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
  .alertBox {
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
      height: 380px;
      background: #fff;
      position: absolute;
      z-index: 1000;
      padding: 0 40px;
      top: 50%;
      left: 50%;
      margin: -150px 0 0 -250px;
    }
    .box_title {
      text-align: center;
      height: 40px;
      line-height: 40px;
    }
    .phone,
    .uid,
    .source,
    .readme {
      text-align: left;
      height: 40px;
      line-height: 40px;
    }
    .phone {
      margin-bottom: 10px;
    }
    .uid input {
      border: 1px solid #d2d2d2;
      height: 38px;
      width: 350px;
      margin-left: 24px;
    }
    .phone input {
      border: 1px solid #d2d2d2;
      height: 38px;
      width: 248px;
      margin-left: 8px;
    }
    .phone button {
      border: 1px solid #d2d2d2;
      border-radius: 5px;
      width: 55px;
      height: 38px;
      line-height: 38px;
      color: #4a90e2;
      margin-left: 5px;
      display: inline-block;
      border: 1px solid #d2d2d2;
    }
    .source label {
      margin-right: 24px;
    }
    .source input {
      margin-bottom: 10px;
    }
    .readme {
      height: 80px;
    }
    .readme label {
      float: left;
    }
    .readme textarea {
      width: 352px;
      height: 78px;
      border: 1px solid #d2d2d2;
      margin-left: 32px;
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
