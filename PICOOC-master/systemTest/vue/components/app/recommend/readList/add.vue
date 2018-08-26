<template>
	<div class="readListAdd">
		<div class="title">管理后台 > APP > 推荐位管理 > 阅读列表 > 新增</div>
		<div class="name">文章id</div>
		<input  v-model="name"/>
		<div class="btn" @click="saveolumnInfo">保存</div>
	</div>
</template>
<script>
  export default{
    data: function () {
      return {
        name:''
      }
    },
    created:function(){
      getWindowSearch();
      let id = getParamByUrl("id");
      if(id != 'false'){
        this.getEditInfo(id);
      }
    },
    methods: {

      //初始化获取栏目名称
      getEditInfo(id){
        let _this = this;
        let finalUrl = ajaxLink + 'picooc-background/articleColumn/get?'+token+windowSearch+'&id='+id;
        $.ajax({
          type:'get',
          url:finalUrl,
          success:function(data){
            console.log(data);
            if(data.code == 200){
              _this.name = data.data.name;
            }else{
              alert(data.msg);
            }
          },
          error:function(error){
            console.log(error);
          }
        });
      },

      //点击保存
      saveolumnInfo: function () {

        let _this = this;
        let id = _this.$route.query.id;
        if(id == undefined){//新增
          $.ajax({
            type:'get',
            url:ajaxLink + 'picooc-background/articleColumn/add?'+token+windowSearch+'&name='+_this.name,
            success:function(data){
              console.log(data);
              if(data.code == 200){
                _this.$router.push({ path: 'appContentColumnIndex' });//跳转路由
              }else{
                alert(data.msg);
              }
            },
            error:function(error){
              console.log(error);
            }
          });
        }else{//编辑
          $.ajax({
            type:'get',
            url:ajaxLink + 'picooc-background/articleColumn/update?'+token+windowSearch+'&name='+_this.name+'&id='+id,
            success:function(data){
              console.log(data);
              if(data.code == 200){
                _this.$router.push({ path: 'appContentColumnIndex' });//跳转路由
              }else{
                alert(data.msg);
              }
            },
            error:function(error){
              console.log(error);
            }
          });
        }
      }

    }
  }
</script>
<style lang="less">
@import "../../../../public.less";
.readListAdd{
	.name{
		margin: 20px 0;
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
