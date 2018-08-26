<template>
	<div class="noticeIndex">
		<div class="title">管理后台 > APP > 内容管理 > 公告 > 新增</div>
		<aside class="content">
            <div class="text">公告内容 <span class="small">(必填，最高不超过40字符)</span> </div> 
            <div class="input"><input type="text" v-model.trim="noticeText"></div>
            <div class="save" @click="addNotice">保存</div>
        </aside>
	</div>
</template>
<script>
import fixBg from "../../public/fixBg.vue"; //引入别的vue
export default {
	props: [],
	components: {
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
			searchData: "",
			noticeText: null,
		};
	},
	created: function () {
		getWindowSearch();

	},
	mounted: function () {
		this.getNotice();
	},
	methods: {
		addNotice: function () {
			if (this.noticeText == '') {
				alert('公告内容不能为空');
				return false
			}
			var ajaxData = {};
			ajaxData.notice = this.noticeText;
			if (getParamByUrl('id') != "false") {
				var url = ajaxLink + "picooc-background/expert/notice/update?" + token;
				ajaxData.id = Number(getParamByUrl('id'));
			} else {
				var url = ajaxLink + "picooc-background/expert/notice/add?" + token;
			}
			let self = this;
			$.ajax({
				type: "post",
				data: JSON.stringify(ajaxData),
				url: url,
				contentType: "application/json; charset=utf-8",
				success: function (data) {
					if (data.code == 200) {
						self.noticeText = "";
						router.push({ path: 'appContentNoticeIndex' });
					} else {
						alert(data.msg);
					}
				}
			})
		},
		getNotice: function () {
			var self = this;
			let url = ajaxLink + "picooc-background/expert/notice/get?" + token + windowSearch;
			$.ajax({
				type: "get",
				url: url,
				dataType: "json",
				success: function (data) {
					if (data.code == 200) {
						self.noticeText = data.data.notice;

					}
				}
			})
		}
	}
};
</script>
<style lang="less">
@import "../../../../public.less";
.noticeIndex {
  .text {
    font-weight: 600;
  }
  .small {
    font-weight: 0;
  }
  .input {
    margin-top: 20px;
    height: 40px;
    width: 600px;
    border: 1px solid #c1c1c1;
    margin-bottom: 60px;
  }
  .input input {
    width: 100%;
    height: 100%;
  }
  .save {
    width: 80px;
    height: 30px;
    color: #63a0e7;
    border-radius: 0.25rem;
    border: 1px solid #d2d2d2;
    text-align: center;
    line-height: 30px;
  }
}
</style>
