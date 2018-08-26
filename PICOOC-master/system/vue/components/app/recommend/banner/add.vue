<template>
	<div class="recommendBannerAdd">
		<div class="title">管理后台 > APP > 推荐位管理 > 精选轮播图 > 新增</div>
		<!--<search />-->
    <div class="type type1"><span class="tips bold">*广告主题</span> (用于后台记录，app内不展示，最高20字符)</div>
		<input class="type1_input1" v-model.trim="theme"/>
		<div class="type type2 bold">*打开类型</div>
		<input type="radio" class="type2_input type2_input1" name="recommendBannerAdd_OpenType" value="0" checked="checked" ref="changeOpenType1" @change="changeOpenType(1,$event)" /><span>文章</span>
		<input type="radio" class="type2_input type2_input2" name="recommendBannerAdd_OpenType" value="1" ref="changeOpenType2" @change="changeOpenType(2,$event)" /><span>链接</span>
		<div class="type type3" v-if="type == 1">文章id</div>
		<div class="type type3" v-else="type == 2">链接地址</div>
		<input class="type3_input" v-model.tirm="openTypeValue"/>
		<div class="type type2 bold">*是否在首页列表出现</div>
		<input type="radio" class="type2_input type2_input1" name="recommendBannerAdd_show" value="0" checked="checked" ref="indexShow1" @change="indexShowFun(1,$event)" /><span>是</span>
		<input type="radio" class="type2_input type2_input2" name="recommendBannerAdd_show" value="1" ref="indexShow2" @change="indexShowFun(2,$event)" /><span>否</span>
		<throwIn  :conditions="conditions" />
		<div class="type type3 bold">*图片</div>
		<div class="articleListViewBg" ref="articleListViewBg">
			<input class="articleListView" type="file" @change="upLoadImg" />
		</div>
		<div class="articleListViewBtn">
			<div class="articleListViewChange"><input class="articleListViewChangeInput" type="file" @change="upLoadImg" />修改</div>
			<div class="articleListViewDelete" @click="deleteImg">删除</div>
		</div>
		<div class="splashScreenAdd_save" @click="saveBannerInfo">保存</div>
	</div>
</template>
<script>
	//import $ from "jquery";//引入别的vue

	import search from "../../public/search.vue";//引入别的vue
	import throwIn from "../../public/throwIn.vue";//引入别的vue
	// import '../../../../jquery-1.7.1.min.js';
	// import "../../../../jquery-ui-1.8.17.custom.min.js";
	// import "../../../../jquery-ui-timepicker-addon.js";
	// import "../../../../jquery-ui-timepicker-zh-CN.js";
	export default {
		components: {
			search,
			throwIn
		},
		data(){
			return {
				openTypeValue: '',//id/链接地址输入框中的内容

				theme: '',//String 轮播图主题
				type: 1,//int类型 1 文章 2 外链 3 广告
				imgUrl: '',//String 图片链接
				indexShow: 1,//int	是否出现在首页 1是 2 否
//      policy:1,//int	投放策略 1全量 2 条件
				conditions: ""
			}
		},

		created: function () {
			getWindowSearch();
		},
		mounted: function () {
			let id = this.$route.query.id;
			if (id != undefined) {
				this.getEditInfo(id);
			}
		},

		methods: {

			//打开类型：
			changeOpenType(type, event){
				console.log(event);
				event.target.checked = true;
				this.type = type;
			},

			//是否在首页列表出现
			indexShowFun: function (value, event) {
				this.indexShow = value;
			},


			//轮播获取
			getEditInfo(id){
				let _this = this;
				let finalUrl = ajaxLink + 'picooc-background/carousel/get?' + token + windowSearch;
				console.log(finalUrl);
				$.ajax({
					type: 'get',
					url: finalUrl,
					success: function (data) {
						console.log(data);
						if (data.code == 200) {
							_this.theme = data.data.theme;
							_this.type = data.data.type;
							var info = data.data;
							if (info.type == 1) {//文章，文章id
								_this.$refs.changeOpenType1.setAttribute('checked', 'checked');
								_this.openTypeValue = info.articleId;
							} else if (info.type == 2) {
								_this.$refs.changeOpenType2.setAttribute('checked', 'checked');
								_this.openTypeValue = info.link;
							}

							_this.indexShow = info.indexShow;
							if (info.indexShow == 1) {
								_this.$refs.indexShow1.setAttribute('checked', 'checked');
							} else {
								_this.$refs.indexShow2.setAttribute('checked', 'checked');
							}

							_this.imgUrl = info.imgUrl;
							if (info.imgUrl != '') {
								_this.$refs.articleListViewBg.style.backgroundImage = 'url(' + info.imgUrl + ')';
							}
							_this.conditions = info.conditions;
						} else {
							alert(data.msg);
						}
					},
					error: function (error) {
						console.log(error);
					}
				});
			},


			//点击保存
			saveBannerInfo: function () {
				let _this = this;


				//名称校验
				var nameBtn = true;
				if ((_this.theme.length == 0) || (_this.theme.length > 20)) {
					nameBtn = false;
				}

				//link校验
				var linkBtn = true;
				if (_this.openTypeValue.length == 0) {
					linkBtn = false;
				}


				//图片校验
				var imagesBtn = true;
				if ((this.imgUrl == '') || (this.imgUrl == null)) {
					imagesBtn = false;
				}

				if(nameBtn){
					if(linkBtn){
						if(imagesBtn){
							let id = this.$route.query.id;
							if (id == undefined) {//新增
								let addData = {
									theme: this.theme,
									type: this.type,
									articleId: (this.type == 1) ? this.openTypeValue : '',
									imgUrl: this.imgUrl,
									link: (this.type == 2) ? this.openTypeValue : '',
									indexShow: this.indexShow,
//          policy:this.policy,
									conditions: getThrowIn()
								};
								addData = JSON.stringify(addData);
								console.log(addData);
								$.ajax({
									type: 'POST',
									dataType: "json",
									contentType: "application/json; charset=utf-8",
									url: ajaxLink + 'picooc-background/carousel/add?' + token + windowSearch,
									data: addData,
									success: function (data) {
										console.log(data);
										if (data.code == 200) {
											alert('保存成功！');
											_this.$router.push({path: 'appRecommendBannerIndex'});//跳转路由
										} else {
											alert(data.msg);
										}
									},
									error: function (error) {
										console.log(error);
									}
								});
							} else {//编辑
								let addData = {
									id: id,
									theme: this.theme,
									type: this.type,
									articleId: (this.type == 1) ? this.openTypeValue : '',
									imgUrl: this.imgUrl,
									link: (this.type == 2) ? this.openTypeValue : '',
									indexShow: this.indexShow,
//          policy:this.policy,
									conditions: getThrowIn()
								};
								addData = JSON.stringify(addData);
								console.log(addData);
								$.ajax({
									type: 'POST',
									dataType: "json",
									contentType: "application/json; charset=utf-8",
									url: ajaxLink + 'picooc-background/carousel/update?' + token + windowSearch,
									data: addData,
									success: function (data) {
										console.log(data);
										if (data.code == 200) {
											alert('保存成功！');
											_this.$router.push({path: 'appRecommendBannerIndex'});//跳转路由
										} else {
											alert(data.msg);
										}
									},
									error: function (error) {
										console.log(error);
									}
								});
							}
						}else{
							alert('图片必填，尺寸750*306');
						}
					}else{
						alert('文章ID/链接必填，校验格式及是否存在');
					}
				}else {
					alert('广告主题必填，不超过20个字符');
				}

				/*if (nameBtn && linkBtn && imagesBtn) {
				} else {
					alert('请确保必填项填写完整及格式正确');
				}*/

			},


			//图片处理
			imgListAdd(){
				let imgListUl = ['620x1136', '620x1136', '620x1136', '620x1136', '620x1136', '620x1136'];
//			this.imgList.push(imgListUl);
			},
			upLoadImg(event){
				let _this = this;
				let file = event.target.files[0];
				let storeAs = 'web/res/system/test/';
				// console.log(file.name + ' => ' + storeAs);

				//时间戳加图片后缀名
				var imgTimestamp = Date.parse(new Date()) + file.name.split(".")[1];
				client.multipartUpload(storeAs + imgTimestamp, file).then(function (result) {
					var url2 = "https://cdn2.picooc.com/" + result.name;
					console.log(url2);
					_this.imgUrl = url2;
					$(".articleListViewBg").css("background-image", 'url(' + url2 + ')');
				}).catch(function (err) {
					alert(err);
					console.log(err);
				});
			},
			deleteImg(event){
				$(".articleListViewBg").css("background-image", '');
				this.imgUrl = '';
			}
		}
	}


</script>
<style lang="less">
@import "../../../../public.less";

.recommendBannerAdd{
  .bold{
    font-weight: bold;
  }
	.type{
		margin-top: 25px;
		margin-bottom: 15px;
	}
	.type1 span{
		color: #2A2A2A;
	}
	.type1_input1{
		width: 260px;
		height: 30px;
		line-height: 30px;
		.border(1px,#C1C7D2);
		.border-radius(2px);
		padding-left: 5px;
		margin-top: 15px;
	}
	.type2_input{
		width: 14px;
		height: 14px;
		margin: 0 8px 0 0;
	}
	.type2_input2{
		margin-left: 70px;
	}
	.type3_input{
		width: 260px;
		height: 30px;
		line-height: 30px;
		.border(1px,#C1C7D2);
	}
	.type4_input{
		width: 160px;
		height: 30px;
		line-height: 30px;
		padding-left: 10px;
		display: inline-block;
		.border(1px,#C1C7D2);
	}
	#type4_input1{
		margin-right: 20px;
	}
	#type4_input2{
		margin-left: 20px;
	}
	.imgList{
		display: block;
	}
	.imgList_ul{
		.flex;
		margin-bottom: 25px;
	}
	.imgList_li{
		width: 80px;
		display: inline-block;
		background: #FFFFFF;
		margin-right: 10px;
	}
	.imgList_li_bg{
		height: 134px;
		.border(1px,#C1C7D2);
		text-align: center;
		margin-bottom: 10px;
		background: center center no-repeat;
		background-size: contain;
	}
	.imgList_li_p{
		color: #C1C7D2;
		margin-top: 50px;
	}
	.imgList_li_upload{
		display: inline-block;
		color: #4A90E2;
		width: 80px;
		height: 134px;
		opacity: 0;
	}
	.imgList_li_chang{
		position: relative;
		width: 40px;
		display: inline-block;
		font-size: 12px;
		height: 17px;
		line-height: 17px;
		color: #4A90E2;
		cursor:pointer;
	}
	.imgList_li_change_upload{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 17px;
		display: inline-block;
		opacity: 0;
	}
	.imgList_li_delete{
		display: inline-block;
		font-size: 12px;
		height: 17px;
		line-height: 17px;
		color: #FD4F5D;
		float: right;
		cursor:pointer;
	}
	.imgList_add{
		width: 116px;
		height: 30px;
		display: inline-block;
		line-height: 30px;
		text-align: center;
		color: #4A90E2;
		.border(1px,#C1C7D2);
		.border-radius(15px);
		margin-top: 25px;
		margin-right: 30px;
	}
	.splashScreenAdd_save{
    cursor: pointer;
		width: 116px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		color: #4A90E2;
		.border(1px,#4A90E2);
		.border-radius(15px);
		margin-top: 25px;
	}
	.throw_number{
		margin: 0 8px 0 0;
	}
	#throw_number_2{
		margin-left: 40px;
	}
	#throw_number_2_input{
		width: 30px;
		padding-left: 4px;
		.border(1px,#CBD0D9);
		.border-radius(2px);
	}
	.articleListViewBg{
		width: 160px;
		height: 90px;
		position: relative;
		.border(1px,#C1C7D2);
		margin-bottom: 10px;
		background: center center no-repeat;
		background-size: contain;
    background-image: url("https://cdn2.picooc.com/web/res/system/static/image/bg/3.png");
	}
	.articleListView{
		width: 160px;
		height: 90px;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}
	.articleListViewBtn{
		position: relative;
		width: 160px;
		text-align: right;
	}
	.articleListViewChange{
		display: inline-block;
		color: #4A90E2;
		cursor:pointer;
		position: relative;
		width: 40px;
		height: 20px;
		line-height: 20px;
		overflow: hidden;
	}
	.articleListViewChangeInput{
		position: absolute;
		width: 40px;
		height: 20px;
		left: 0;
		top: 0;
		opacity: 0;
	}
	.articleListViewDelete{
		display: inline-block;
		color: #FD4F5D;
		margin-left: 20px;
		width: 40px;
		height: 20px;
		line-height: 20px;
		cursor:pointer;
	}
}
</style>
