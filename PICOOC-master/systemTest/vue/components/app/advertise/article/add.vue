<template>
	<div class="advertiseArticleAdd">
		<div class="title">管理后台 > APP > 广告管理 > 文章 > 新增</div>
    <div class="type type1"><span class="tips bold">*广告主题</span> (用于后台记录，app内不展示，最高20字符)</div>
		<input class="type1_input1" v-model.trim="name" />
		<!--<div class="type type2">打开类型</div>
		<input type="radio" class="type2_input type2_input1" name="OpenType" value="1" checked="checked" @click="changeOpenType(true)" /><span>文章</span>
		<input type="radio" class="type2_input type2_input2" name="OpenType" value="2" @click="changeOpenType(false)" /><span>链接</span>-->
    <div class="type type3 bold" v-if="openType==true">*链接地址/文章id</div>
    <!--<div class="type type3" v-if="openType==false">链接地址</div>-->
		<input class="type3_input" v-model.trim="link"/>
    <div class="type type4 bold">*生效时间</div>
    <input class="type4_input type4_input1" id="type4_input1" placeHolder="时间选择器"  name="datetime" v-model="startTime" readonly/><span>--</span>
    <input class="type4_input type4_input2" id="type4_input2" placeHolder="时间选择器" v-model="endTime" readonly/>
		<div class="throw_top bold">投放策略</div>
		<div class="throw_title">*投放策略-投放范围</div>
		<div class="throw_type1">
			<input type="radio" class="throw_input1 throw_input1_1" name="range" value="1" ref="allUsers" /><span>所有用户</span>
		</div>
		<div class="throw_type1">
			<input type="radio" class="throw_input1 throw_input1_2" name="range" value="2" checked="checked" /><span>用户范围</span>
		</div>
		<div class="throw_card1">
			<div class="throw_card1_type1">
				<div class="throw_card1_title">按照板块投放</div>
				<span v-for="(item, index) in programsList" class="eachBox">
          <input type="checkbox" class="throw_card1_sex"  name="sex" value="1" @change="chooseBanKuai(item.id, index, $event)" /><span style="padding-right: 12px;">{{item.name}}</span>
        </span>
			</div>
		</div>
		<div class="type type3 bold">*图片</div>
		<div class="articleListViewBg" ref="articleListViewBg">
			<input class="articleListView" type="file" @change="upLoadImg" />
		</div>
		<div class="articleListViewBtn">
			<div class="articleListViewChange"><input class="articleListViewChangeInput" type="file" @change="upLoadImg" />修改</div>
			<div class="articleListViewDelete" @click="deleteImg">删除</div>
		</div>
		<div class="save" @click="saveAdInfo">保存</div>
	</div>
</template>
<script>

    export default {
        components: {},
        data(){
            return {
                programsId: [],//获取板块id
                programsList: [],//所有板块的列表


                openType: true,//打开类型
                name: '',
                link: '',
                startTime: '',
                endTime: '',
                image: ''
            }
        },
        created: function () {

            //获取板块内容
            this.getBanKuai();

            getWindowSearch();


        },
        mounted: function () {
            $(".advertiseArticleAdd .type4_input1").datetimepicker({format: 'yyyy-mm-dd hh:ii:ss', autoclose: true});
            $(".advertiseArticleAdd .type4_input2").datetimepicker({format: 'yyyy-mm-dd hh:ii:ss', autoclose: true});
        },
        methods: {


            chooseBanKuai(id, index, event){
                let _this = this;
                console.log(event.target.checked);
                if (event.target.checked == true) {//选中
                    console.log(1);
                    _this.programsId.push(id);
                    console.log(_this.programsId);
                } else {//未选中
                    for (var i = 0; i < _this.programsId.length; i++) {
                        if (_this.programsId[i] == id) {
                            _this.programsId.splice(i, 1);
                        }
                    }
                    console.log(_this.programsId);
                }
            },

            //打开类型：
            changeOpenType(type){
                this.openType = type;
            },

            getBanKuai: function () {
                let _this = this;
                $.ajax({
                    type: 'get',
                    url: ajaxLink + 'picooc-background/article/addView?' + token,
                    success: function (data) {
                        console.log(data);
                        if (data.code == 200) {
//              _this.authors = data.data.authors;
                            _this.programsList = data.data.programs;

                            //初始化板块之后再调用getEditInfo
                            let id = getParamByUrl("id");
                            if (id != 'false') {
                                _this.getEditInfo(id);
                            }


                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            },


            //获取编辑信息
            getEditInfo(id){
                let _this = this;
                let finalUrl = ajaxLink + 'picooc-background/articleAd/get?' + token + windowSearch;
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
                            if (info.startTime && info.endTime) {
                                _this.startTime = _this.transformTime(info.startTime);
                                _this.endTime = _this.transformTime(info.endTime);
                            } else {
                                _this.startTime = '';
                                _this.endTime = '';
                            }

                            _this.image = info.image;
                            if ((info.programs == '') || (info.programs == 0)) {//所有用户
                                _this.programsId = [];
                                _this.$refs.allUsers.setAttribute('checked', 'checked');
//              $('.throw_card1_sex').attr('checked', 'checked');
                            } else {
                                _this.programsId = info.programs.split(',');
                                console.log(_this.programsList);
                                console.log(_this.programsId);
                                for (var i = 0; i < _this.programsList.length; i++) {
                                    for (var j = 0; j < _this.programsId.length; j++) {
                                        if (_this.programsList[i].id == _this.programsId[j]) {
                                            $('.throw_card1_sex').eq(i).attr('checked', 'checked');
                                        }
                                    }
                                }
                            }


                            if (info.image != null) {
                                _this.$refs.articleListViewBg.style.backgroundImage = 'url(' + info.image + ')';
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


            //点击保存，提交审核
            saveAdInfo: function () {
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
                if ((this.image == '') || (this.image == null)) {
                    imagesBtn = false;
                }

                if(nameBtn){
                    if(linkBtn){
                        if(timesBtn){
                            if(imagesBtn){
                                let id = this.$route.query.id;
                                if (id == undefined) {//新增
                                    let addData = {
                                        name: this.name,
                                        link: this.link,
                                        startTime: startTime,
                                        endTime: endTime,
                                        image: this.image,
                                        programs: (_this.$refs.allUsers.checked == true) ? '' : _this.programsId.join(',')
                                    };
                                    addData = JSON.stringify(addData);
                                    console.log(addData);
                                    $.ajax({
                                        type: 'POST',
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                        url: ajaxLink + 'picooc-background/articleAd/add?' + token + windowSearch,
                                        data: addData,
                                        success: function (data) {
                                            console.log(data);
                                            if (data.code == 200) {
                                                alert('保存成功！');
                                                _this.$router.push({path: 'appAdvertiseArticleIndex'});//跳转路由
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
                                        image: this.image,
                                        programs: (_this.$refs.allUsers.checked == true) ? '' : _this.programsId.join(',')
                                    };
                                    addData = JSON.stringify(addData);
                                    console.log(addData);
                                    $.ajax({
                                        type: 'POST',
                                        dataType: "json",
                                        contentType: 'application/json',
                                        url: ajaxLink + 'picooc-background/articleAd/update?' + token + windowSearch,
                                        data: addData,
                                        success: function (data) {
                                            console.log(data);
                                            if (data.code == 200) {
                                                alert('保存成功！');
                                                _this.$router.push({path: 'appAdvertiseArticleIndex'});//跳转路由
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
                                alert('图片必填，尺寸620*190');
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
                /*if (nameBtn && linkBtn && timesBtn && imagesBtn) {

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
                    _this.image = url2;


                }).catch(function (err) {
                    alert(err);
                    console.log(err);
                });
            },

            deleteImg(event){
                $(".articleListViewBg").eq(0).css("background-image", '');
                let _this = this;
                _this.image = '';
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

.advertiseArticleAdd{
  .eachBox{
    margin-right: 40px;
    min-width: 20%;
  }

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
	.save{
		margin-top: 30px;
		.publicBtn;
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
	.throw_top{
		margin-top: 25px;
	}
	.throw_title{
		margin-top: 25px;
		margin-bottom: 15px;
	}
	.throw_type1{
		margin: 15px 0;
	}
	.throw_input1{
		width: 14px;
		height: 14px;
		margin: 0 8px 0 0;
	}
	.throw_card1{
		.flex;
		/*width: 378px;*/
		padding: 10px 14px;
		background: #FFFFFF;
		.border(1px,#C1C7D2);
		.border-radius(2px);
	}
	.throw_card1_type1{
		.flex-grow
	}
	.throw_card1_title{
		margin-bottom: 10px;
	}
	.throw_card1_sex{
		margin: 0 8px 0 0;
	}
	.articleListViewBg{
		width: 160px;
		height: 90px;
		position: relative;
		.border(1px,#C1C7D2);
		margin-bottom: 10px;
		background: center center no-repeat;
		background-size: contain;
    background-image: url("https://cdn2.picooc.com/web/res/system/static/image/bg/5.png");
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
}
</style>
