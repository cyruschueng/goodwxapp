<template>
	<div class="splashScreenAdd">
		<div class="title">管理后台 > APP > 广告管理 > 闪屏 > 新增</div>
		<div class="type type1"><span class="tips">*广告主题</span> (用于后台记录，app内不展示，最高20字符)</div>
		<input class="type1_input1" v-model.trim="name"/>
		<!--<div class="type type2">打开类型</div>
		<input type="radio" class="type2_input type2_input1" name="OpenType" value="1" checked="checked" @click="changeOpenType(true)" /><span>文章</span>
		<input type="radio" class="type2_input type2_input2" name="OpenType" value="2" @click="changeOpenType(false)" /><span>链接</span>-->
    <div class="type type3 bold" v-if="openType==true">*链接地址/文章id</div>
		<!--<div class="type type3" v-if="openType==false">链接地址</div>-->
		<input class="type3_input" v-model.trim="link"/>
		<div class="type type4 bold">*生效时间</div>
		<input class="type4_input type4_input1" id="type4_input1" placeHolder="时间选择器"  name="datetime"  readonly /><span>--</span>
		<input class="type4_input type4_input2" id="type4_input2" placeHolder="时间选择器" name="datetime" readonly />
		<throwIn :conditions="conditions" />
		<div class="type">* 投放策略-展示次数</div>
		<div class="throw_type2">
			<input type="radio" class="throw_number" id="throw_number_1" name="number" value="1" checked="checked" @change="changeDisplayNum" /><span>始终展示</span>
			<input type="radio" class="throw_number" id="throw_number_2" name="number" value="2" ref="throwNumber" /><span>生效期间每用户展示<input id="throw_number_2_input" type="tel" v-model.trim="displayNum"/>次</span>
		</div>
		<div class="type bold">*闪屏图片</div>
		<aside class="imgList" >
			<div class="imgList_ul" v-for="(ul,ulIndex) in imgList">
				<div class="imgList_li" v-for="(item,index) in ul">
					<div class="imgList_li_bg" :style="{backgroundImage:'url('+item+')'}">
						<!-- <div class="imgList_li_p">{{item}}<br />点击上传</div> -->
						<input class="imgList_li_upload" :data-index="index" type="file" @change="uploadImg(ulIndex,index,$event)" />
					</div>
					<div class="imgList_li_chang"><input class="imgList_li_change_upload" :data-index="index" type="file" @change="uploadImg(ulIndex,index,$event)" />修改</div>
					<div class="imgList_li_delete" @click="deleteImg(ulIndex,index)" :data-index="index">删除</div>
				</div>
				<div class="imgList_delete" @click="deleteImgList(ulIndex)">删除该组图片</div>
			</div>
		</aside>
		<div class="imgList_add" @click="imgListAdd">再增加一组图片</div>
		<span>当有多组图片时，客户端会随机显示其中一组图片</span>
		<div class="splashScreenAdd_save" @click="saveSplashInfo">保存，提交审核</div>
	</div>
</template>
<script>
	//import $ from "jquery";//引入别的vue


	import throwIn from "../../public/throwIn.vue";//引入别的vue
	// import '../../../../jquery-1.7.1.min.js';
	// import "../../../../jquery-ui-1.8.17.custom.min.js";
	// import "../../../../jquery-ui-timepicker-addon.js";
	// import "../../../../jquery-ui-timepicker-zh-CN.js";
	export default {
		components: {
			throwIn
		},
		data(){
			return {
				openType: true,//打开类型
				name: '',
				link: '',
				startTime: '',
				endTime: '',
				displayNum: null,//0:始终展示，N：展示N次
				imagesArr: [[]],//存储所有上传的图片
				imgList: [
					['https://cdn2.picooc.com/web/res/system/static/image/splashScreen/1.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/2.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/3.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/4.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/5.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/6.png']
				],
				conditions: ""
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

			$(".splashScreenAdd #type4_input1").datetimepicker({format: 'yyyy-mm-dd hh:ii:ss', autoclose: true});
			$(".splashScreenAdd #type4_input2").datetimepicker({format: 'yyyy-mm-dd hh:ii:ss', autoclose: true});
			/*$(function(){
			 $(".splashScreenAdd #type4_input1").datetimepicker({format: 'yyyy-mm-dd hh:ii:ss'});
			 $(".splashScreenAdd #type4_input2").datetimepicker({format: 'yyyy-mm-dd hh:ii:ss'});
			 })*/

		},
		methods: {

			changeDisplayNum: function () {
				this.displayNum = 0;
			},

			//打开类型：
			changeOpenType: function (type) {
				this.openType = type;
			},
			//闪屏获取
			getEditInfo: function (id) {
				let _this = this;
				let finalUrl = ajaxLink + 'picooc-background/splashScreen/get?' + token + windowSearch;
				console.log(finalUrl);
				$.ajax({
					type: 'get',
					url: finalUrl,
					success: function (data) {
						console.log(data);
						if (data.code == 200) {
							var info = data.data;
							_this.name = info.name;
							_this.link = info.link;
							//transformTime
							if (info.startTime && info.endTime) {
								_this.startTime = _this.transformTime(info.startTime);
								_this.endTime = _this.transformTime(info.endTime);
								$(".splashScreenAdd #type4_input1").val(_this.transformTime(info.startTime));
								$(".splashScreenAdd #type4_input2").val(_this.transformTime(info.endTime));
							} else {
								_this.startTime = '';
								_this.endTime = '';
							}
							if (info.displayNum > 0) {
								_this.displayNum = info.displayNum;
								_this.$refs.throwNumber.setAttribute('checked', 'checked');
							} else {
								_this.displayNum = '';
							}

							console.log(info.images);

							//展示图片的数组
							for (var i = 0; i < info.images.length; i++) {
								if (i > 0) {
									let imgListUl = ['https://cdn2.picooc.com/web/res/system/static/image/splashScreen/1.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/2.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/3.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/4.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/5.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/6.png'];
									_this.imgList.push(imgListUl);
								}
							}


							//函数在DOM渲染后执行
							_this.$nextTick(function () {
								for (var j = 0; j < _this.imgList.length; j++) {
									for (var k = 0; k < _this.imgList[j].length; k++) {
										$(".imgList_ul:eq(" + j + ") .imgList_li_bg").eq(k).css("background-image", 'url(' + info.images[j][k] + ')');
									}
								}
							});


							//存储图片的数组
							_this.imagesArr = info.images;

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

			//点击保存，提交审核
			saveSplashInfo: function () {
				let _this = this;

				//名称校验
				var nameBtn = true;
				if ((_this.name.length == 0) || (_this.name.length > 20)) {
					nameBtn = false;
				}

				//link校验
				var linkBtn = true;
				if (_this.link.length == 0) {
					linkBtn = false;
				}


				//时间校验
				var timesBtn = true;
				let startTime = '';
				let endTime = '';
				if (($('#type4_input1').val() != '') && ($('#type4_input2').val()) != '') {
					startTime = new Date($('#type4_input1').val()).getTime();
					endTime = new Date($('#type4_input2').val()).getTime();
					if (startTime >= endTime) {
						timesBtn = false;
					}
				} else {
					timesBtn = false;
				}

				//图片校验
				var imagesBtn = true;
				console.log(this.imagesArr);
				loop:for (var i = 0; i < this.imagesArr.length; i++) {
					if (this.imagesArr[i].length == 6) {
						for (var j = 0; j < this.imagesArr[i].length; j++) {
							if ((this.imagesArr[i][j] == '') || (this.imagesArr[i][j] == undefined)) {
								imagesBtn = false;
								break loop;//跳出当前for循环
							}
						}
					} else {
						imagesBtn = false;
						break;
					}
				}


				if(nameBtn){
					if(linkBtn){
						if(timesBtn){
							if(imagesBtn){
								let id = this.$route.query.id;
								if (id == undefined) {//新增闪屏
									let addData = {
										name: this.name,
										link: this.link,
										startTime: startTime,
										endTime: endTime,
										displayNum: (this.displayNum > 0) ? this.displayNum : 0,
										images: this.imagesArr,
										conditions: getThrowIn()
									};
									addData = JSON.stringify(addData);
									console.log(addData);
									$.ajax({
										type: 'POST',
										dataType: "json",
										contentType: "application/json; charset=utf-8",
										url: ajaxLink + 'picooc-background/splashScreen/add?' + token + windowSearch,
										data: addData,
										success: function (data) {
											console.log(data);
											if (data.code == 200) {
												alert('保存成功！');
												_this.$router.push({path: 'appAdvertiseSplashScreenIndex'});//跳转路由
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
										name: this.name,
										link: this.link,
										startTime: startTime,
										endTime: endTime,
										displayNum: (this.displayNum > 0) ? this.displayNum : 0,
										images: this.imagesArr,
										conditions: getThrowIn()
									};
									addData = JSON.stringify(addData);
									console.log(addData);
									$.ajax({
										type: 'POST',
										dataType: "json",
										contentType: 'application/json',
										url: ajaxLink + 'picooc-background/splashScreen/update?' + token + windowSearch,
										data: addData,
										success: function (data) {
											console.log(data);
											if (data.code == 200) {
												alert('保存成功！');
												_this.$router.push({path: 'appAdvertiseSplashScreenIndex'});//跳转路由
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
								alert('每6张图片同时必填');
							}
						}else{
							alert('生效时间必填，开始时间小于结束时间');
						}
					}else{
						alert('文章ID/链接必填，校验格式及是否存在');
					}
				}else {
					alert('广告主题必填，不超过20个字符');
				}
				/*if (nameBtn && linkBtn && timesBtn && imagesBtn) {//图片格式正确

				} else {
					alert('请确保必填项填写完整及格式正确');
				}*/

			},

			imgListAdd: function () {
				this.imagesArr.push([]);//添加一个新的空数组
				let imgListUl = ['https://cdn2.picooc.com/web/res/system/static/image/splashScreen/1.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/2.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/3.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/4.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/5.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/6.png'];
				console.log(this.startTime);
				console.log("endTime:"+this.endTime);
				this.imgList.push(imgListUl);
				console.log(this.imgList);
			},
			deleteImgList: function (index) {
				console.log(this.startTime);
				this.imagesArr.splice(index, 1);//添加一个新的空数组
				this.imgList.splice(index, 1);//添加一个新的空数组


				let newBg = ['https://cdn2.picooc.com/web/res/system/static/image/splashScreen/1.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/2.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/3.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/4.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/5.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/6.png'];

				//函数在DOM渲染后执行
				this.$nextTick(function () {
					for (var j = 0; j < this.imgList.length; j++) {

						for (var k = 0; k < this.imgList[j].length; k++) {

							$(".imgList_ul:eq(" + j + ") .imgList_li_bg").eq(k).css("background-image", 'url(' + newBg[k] + ')');

							if (this.imagesArr[j][k] != undefined) {
								$(".imgList_ul:eq(" + j + ") .imgList_li_bg").eq(k).css("background-image", 'url(' + this.imagesArr[j][k] + ')');
							}
						}
					}
				});

				console.log(this.imgList);
			},
			uploadImg: function (ulIndex, index, event) {
				let _this = this;
				let file = event.target.files[0];
				let storeAs = 'web/res/system/test/';
				// console.log(file.name + ' => ' + storeAs);

				//时间戳加图片后缀名
				var imgTimestamp = Date.parse(new Date()) + "." + file.name.split(".")[1];
				client.multipartUpload(storeAs + imgTimestamp, file).then(function (result) {
					var url2 = "https://cdn2.picooc.com/" + result.name;
					_this.imagesArr[ulIndex][index] = url2;//对当前位置赋值
					console.log(_this.imagesArr);
					$(".imgList_ul:eq(" + ulIndex + ") .imgList_li_bg").eq(index).css("background-image", 'url(' + url2 + ')');
				}).catch(function (err) {
					alert(err);
					console.log(err);
				});
			},
			deleteImg(ulIndex, index, event){
				let _this = this;
				let bgArr=['https://cdn2.picooc.com/web/res/system/static/image/splashScreen/1.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/2.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/3.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/4.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/5.png', 'https://cdn2.picooc.com/web/res/system/static/image/splashScreen/6.png'];
				console.log(bgArr[index]);
				$(".imgList_ul:eq(" + ulIndex + ") .imgList_li_bg").eq(index).css("background-image", 'url('+bgArr[index]+')');
				_this.imagesArr[ulIndex].splice(index, 1);//删除当前数值
				console.log(_this.imagesArr);
			},

			transformTime: function (times) {
				var time = new Date(times);
				var year = time.getFullYear();
				var month = time.getMonth() + 1;
				month = (month < 10 ? '0' : '') + month;
				var day = time.getDate();
				day = (day < 10 ? '0' : '') + day;
				var week = time.getDay();//周一 1
				var arr = [7, 1, 2, 3, 4, 5, 6];
				week = arr[week];
				var hour = time.getHours(); //
				hour = (hour < 10 ? '0' : '') + hour;
				var minutes = time.getMinutes();
				minutes = (minutes < 10 ? '0' : '') + minutes;
				var seconds = time.getSeconds();
				seconds = (seconds < 10 ? '0' : '') + seconds;
				var minllseconds = time.getMilliseconds();
				if (minllseconds < 10) {
					minllseconds = '00' + minllseconds;
				} else if (minllseconds < 100) {
					minllseconds = '0' + minllseconds;
				}
				return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
			}
		}
	}


</script>
<style lang="less">
@import "../../../../public.less";

.splashScreenAdd{
  .bold{
    font-weight: bold;
  }
	.type{
		margin-top: 25px;
		margin-bottom: 15px;
	}
	.type1 span{
    font-weight: bold;
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
		overflow: hidden;
	}
	.imgList_li_change_upload{
		position: absolute;
		left: 0;
		top: 0;
		width: 40px;
		height: 17px;
		display: inline-block;
		opacity: 0;
		font-size: 12px;
	}
	.imgList_li_delete{
		display: inline-block;
		font-size: 12px;
		height: 17px;
		line-height: 17px;
		color: #FD4F5D;
		float: right;
		cursor:pointer;
		width: 40px;
		z-index: 5;
		text-align: right;
	}
	.imgList_delete{
    cursor: pointer;
		width: 116px;
		height: 30px;
		display: inline-block;
		line-height: 30px;
		text-align: center;
		color: #4A90E2;
		.border(1px,#C1C7D2);
		.border-radius(15px);
		margin-top: 130px;
		margin-left: 40px;
	}
	.imgList_add{
    cursor: pointer;
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
}
</style>
