<template>
	<div class="hotReviewAdd">
		<div class="title">管理后台 > APP > 推荐位管理 > 热评 > 新增</div>

		<div class="name bold">*文章id</div>
		<input type="number" class="nameInput"  v-model.trim="articleId"/>

    <div class="order bold">*轮播图主题</div>
    <input class="orderInput" v-model.trim="theme"/>

    <throwIn :conditions="conditions" />
		<div class="name bold">*图片</div>
		<div class="articleListViewBg" ref="articleListViewBg">
			<input class="articleListView" type="file" @change="upLoadImg" />
		</div>
		<div class="articleListViewBtn">
			<div class="articleListViewChange"><input class="articleListViewChangeInput" type="file" @change="upLoadImg" />修改</div>
			<div class="articleListViewDelete" @click="deleteImg">删除</div>
		</div>
		<div class="btn" @click="saveHotInfo">保存</div>
	</div>
</template>
<script>
	import throwIn from "../../public/throwIn.vue";//引入别的vue
	export default{
		components: {
			throwIn
		},
		data: function () {
			return {
				articleId: '',
				theme: '',
				imgUrl: '',
				conditions: ''
			}
		},
		created: function () {
			getWindowSearch();
		},
		mounted: function () {
			let id = getParamByUrl("id");
			if (id != 'false') {
				this.getEditInfo(id);
			}
		},
		methods: {

			//初始化获取栏目名称
			getEditInfo(id){
				let _this = this;
				let finalUrl = ajaxLink + 'picooc-background/hotreview/get?' + token + windowSearch;
				$.ajax({
					type: 'get',
					url: finalUrl,
					success: function (data) {
						console.log(data);
						if (data.code == 200) {
							_this.articleId = data.data.articleId;
							_this.theme = data.data.theme;
							_this.imgUrl = data.data.imgUrl;
							_this.conditions = data.data.conditions;
							if (data.data.imgUrl != null) {
								_this.$refs.articleListViewBg.style.backgroundImage = 'url(' + data.data.imgUrl + ')';
							}
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
			saveHotInfo: function () {
				let _this = this;


				//名称校验
				var nameBtn = true;
				if ((_this.theme.length == 0) || (_this.theme.length > 20)) {
					nameBtn = false;
				}

				//id校验
				var idBtn = true;
				var idReg = /^[\d]+$/;
				if (!idReg.test(_this.articleId)) {
					idBtn = false;
				}


				//图片校验
				var imagesBtn = true;
				if ((this.imgUrl == '') || (this.imgUrl == null)) {
					imagesBtn = false;
				}


				if(nameBtn){
					if(idBtn){
						if(imagesBtn){
							let id = this.$route.query.id;
							if (id == undefined) {//新增
								let addData = {
									articleId: this.articleId,
									theme: this.theme,
									imgUrl: this.imgUrl,
									conditions: getThrowIn()
								};
								addData = JSON.stringify(addData);
								console.log(addData);
								$.ajax({
									type: 'POST',
									dataType: "json",
									contentType: "application/json; charset=utf-8",
									url: ajaxLink + 'picooc-background/hotreview/add?' + token + windowSearch,
									data: addData,
									success: function (data) {
										console.log(data);
										if (data.code == 200) {
											alert('保存成功！');
											_this.$router.push({path: 'appRecommendHotReviewIndex'});//跳转路由
										} else {
											alert(data.msg);
										}
									},
									error: function (error) {
										console.log(error);
									}
								});

							} else {//闪屏更新/编辑
								let addData = {
									id: id,
									articleId: this.articleId,
									theme: this.theme,
									imgUrl: this.imgUrl,
									conditions: getThrowIn()
								};
								addData = JSON.stringify(addData);
								console.log(addData);
								$.ajax({
									type: 'POST',
									dataType: "json",
									contentType: "application/json; charset=utf-8",
									url: ajaxLink + 'picooc-background/hotreview/update?' + token + windowSearch,
									data: addData,
									success: function (data) {
										console.log(data);
										if (data.code == 200) {
											alert('保存成功！');
											_this.$router.push({path: 'appRecommendHotReviewIndex'});//跳转路由
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
							alert('图片必填，尺寸620*208');
						}
					}else{
						alert('文章ID必填，校验格式及是否存在');
					}
				}else {
					alert('轮播图主题必填，不超过20个字符');
				}
				/*if (nameBtn && idBtn && imagesBtn) {

				} else {
					alert('请确保必填项填写完整及格式正确');
				}*/

			},


			upLoadImg: function (event) {
				let _this = this;
				let file = event.target.files[0];
				let storeAs = 'web/res/system/test/';
				// console.log(file.name + ' => ' + storeAs);

				//时间戳加图片后缀名
				var imgTimestamp = Date.parse(new Date()) + "." + file.name.split(".")[1];
				client.multipartUpload(storeAs + imgTimestamp, file).then(function (result) {
					var url2 = "https://cdn2.picooc.com/" + result.name;
					$(".articleListViewBg").eq(0).css("background-image", 'url(' + url2 + ')');
					_this.imgUrl = url2;


				}).catch(function (err) {
					alert(err);
					console.log(err);
				});
			},

			deleteImg(event){
				$(".articleListViewBg").eq(0).css("background-image", '');
				let _this = this;
				_this.imgUrl = '';
			}

		}
	}
</script>
<style lang="less">
@import "../../../../public.less";
.hotReviewAdd{
  .bold{
    font-weight: bold;
  }
	.name, .order{
		margin: 20px 0;
	}
	.nameInput, .orderInput{
		width: 260px;
		height: 30px;
		line-height: 30px;
		padding-left: 10px;
		.border(1px,#C1C7D2);
	}
	.btn{
		width: 70px;
		height: 30px;
		line-height: 30px;
		margin-top: 30px;
		color: #4C91E3;
		text-align: center;
		.border(1px,#4A90E2);
		.border-radius(15px);
	}
	.btn:hover{
		cursor:pointer;
	}
	.articleListViewBg{
		width: 160px;
		height: 90px;
		position: relative;
		.border(1px,#C1C7D2);
		margin-bottom: 10px;
		background: center center no-repeat;
		background-size: contain;
    background-image: url("https://cdn2.picooc.com/web/res/system/static/image/bg/6.png");
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
