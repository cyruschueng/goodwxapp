<template>
	<div class="columnAdd">
		<div class="title">管理后台 > APP > 内容管理 > 栏目管理 > 新增</div>
		<div class="name"><span class="tips">*栏目名称</span>(最高10字符)</div>
		<input  v-model.trim="name"/>
		<div class="btn" @click="saveColumnInfo">保存</div>
	</div>
</template>
<script>
    export default{
        data: function () {
            return {
                name: ''
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
                let finalUrl = ajaxLink + 'picooc-background/articleColumn/get?' + token + windowSearch;
                $.ajax({
                    type: 'get',
                    url: finalUrl,
                    success: function (data) {
                        console.log(finalUrl);
                        console.log(data);
                        if (data.code == 200) {
                            _this.name = data.data.name;
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
            saveColumnInfo: function () {

                let _this = this;
                let id = _this.$route.query.id;

                let name = _this.name;
                if ((name.length > 0) && (name.length <= 10)) {
                    if (id == undefined) {//新增

                        let updateData = {
                            name: _this.name
                        };
                        updateData = JSON.stringify(updateData);
                        console.log(updateData);

                        $.ajax({
                            type: 'POST',
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            url: ajaxLink + 'picooc-background/articleColumn/add?' + token + windowSearch,
                            data: updateData,
                            success: function (data) {
                                console.log(data);
                                if (data.code == 200) {
                                    alert('保存成功！');
                                    _this.$router.push({path: 'appContentColumnIndex'});//跳转路由
                                } else {
                                    alert(data.msg);
                                }
                            },
                            error: function (error) {
                                console.log(error);
                            }
                        });
                    } else {//编辑

                        let updateData = {
                            id: id,
                            name: _this.name
                        };
                        updateData = JSON.stringify(updateData);
                        console.log(updateData);

                        $.ajax({
                            type: 'POST',
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            url: ajaxLink + 'picooc-background/articleColumn/update?' + token + windowSearch,
                            data: updateData,
                            success: function (data) {
                                console.log(data);
                                if (data.code == 200) {
                                    alert('保存成功！');
                                    _this.$router.push({path: 'appContentColumnIndex'});//跳转路由
                                } else {
                                    alert(data.msg);
                                }
                            },
                            error: function (error) {
                                console.log(error);
                            }
                        });
                    }
                } else {
                    alert('栏目名称必填，最⾼不超过10字符');
                }

            }

        }
    }
</script>
<style lang="less">
@import "../../../../public.less";
.columnAdd{
	.name{
		margin: 20px 0;
    .tips{
      font-weight: bold;
    }
	}
	input{
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
}
</style>
