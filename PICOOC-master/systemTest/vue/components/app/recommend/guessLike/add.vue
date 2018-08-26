<template>
  <div class="guessLikeAdd">
    <div class="title">管理后台 > APP > 推荐位管理 > 猜你喜欢 > 新增</div>
    <!--<div class="type type1">广告主题<span>用于记录内容，不在App内出现</span></div>-->
    <!--<input class="type1_input1" v-model.trim="name" />-->
    <div class="type type2 bold">*推荐类型</div>
    <input type="radio" class="type2_input type2_input1" name="status" value="1" ref="typeStatus1" checked="checked" @click="changeOpenType(0)" /><span>固定</span>
    <input type="radio" class="type2_input type2_input2" name="status" value="2" ref="typeStatus2" @click="changeOpenType(1)" /><span>随机</span>

    <div class="type type3 bold">猜你喜欢展示文章标题</div>
    <input class="type3_input" v-model.trim="name"/>

    <div class="type type3 bold">*文章id</div>
    <input type="number" class="type3_input" v-model.trim="articleId"/>

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
        status: 0,//推荐类型  （0：固定，1：随机）
        name: '',
        articleId: '',
        image: ''
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

      //打开类型：
      changeOpenType(type){
        this.status = type;
      },

      //获取编辑信息
      getEditInfo(id){
        let _this = this;
        let finalUrl = ajaxLink + 'picooc-background/articleRecommend/get?' + token + windowSearch;
        console.log(finalUrl);
        $.ajax({
          type: 'get',
          url: finalUrl,
          success: function (data) {
            console.log(data);
            if (data.code == 200) {
              var info = data.data;
              _this.name = info.name;
              _this.articleId = info.articleId;
              _this.image = info.image;
              _this.status = info.status;
              if (_this.status == 0) {
                _this.$refs.typeStatus1.setAttribute('checked', 'checked');
              } else if (_this.status == 1) {
                _this.$refs.typeStatus2.setAttribute('checked', 'checked');
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
        var nameBtn = true;//名称是选填 不是必填
        /*if ((_this.name.length == 0) || (_this.name.length > 20)) {
          nameBtn = false;
        }*/

        //id校验
        var idBtn = true;
        var idReg = /^[\d]+$/;
        if (!idReg.test(_this.articleId)) {
          idBtn = false;
        }


        //图片校验
        var imagesBtn = true;
        if ((this.image == '') || (this.image == null)) {
          imagesBtn = false;
        }

        if(nameBtn){
          if(idBtn){
            if(imagesBtn){
              let id = this.$route.query.id;
              if (id == undefined) {//新增
                let addData = {
                  name: this.name,
                  articleId: this.articleId,
                  status: this.status,
                  image: this.image
                };
                addData = JSON.stringify(addData);
                console.log(addData);
                $.ajax({
                  type: 'POST',
                  dataType: "json",
                  contentType: "application/json; charset=utf-8",
                  url: ajaxLink + 'picooc-background/articleRecommend/add?' + token + windowSearch,
                  data: addData,
                  success: function (data) {
                    console.log(data);
                    if (data.code == 200) {
                      alert('保存成功！');
                      _this.$router.push({path: 'appRecommendGuessLikeIndex'});//跳转路由
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
                  articleId: this.articleId,
                  status: this.status,
                  image: this.image
                };
                addData = JSON.stringify(addData);
                console.log(addData);
                $.ajax({
                  type: 'POST',
                  dataType: "json",
                  contentType: "application/json; charset=utf-8",
                  url: ajaxLink + 'picooc-background/articleRecommend/update?' + token + windowSearch,
                  data: addData,
                  success: function (data) {
                    console.log(data);
                    if (data.code == 200) {
                      alert('保存成功！');
                      _this.$router.push({path: 'appRecommendGuessLikeIndex'});//跳转路由
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
              alert('图片必填，尺寸196*100');
            }
          }else{
            alert('文章ID必填，校验格式及是否存在');
          }
        }else {
          alert('推荐主题必填，不超过20个字符');
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

  $(function () {
    $(".guessLikeAdd #type4_input1").datetimepicker({format: 'yyyy-mm-dd hh:ii:ss'});
    $(".guessLikeAdd #type4_input2").datetimepicker({format: 'yyyy-mm-dd hh:ii:ss'});
  })


</script>
<style lang="less">
  @import "../../../../public.less";

  .guessLikeAdd{
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
    width: 378px;
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
    background-image: url("https://cdn2.picooc.com/web/res/system/static/image/bg/4.png");
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
