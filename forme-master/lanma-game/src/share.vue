<template>
  <div id="share-page">
    <img class="bgimg" src="./assets/images/l_sharebodybg.jpg">
    <!--prebtn-->
    <div class="ab prebtn" @click="preImg">
      <img class="quanimg" src="./assets/images/l_prebtn.png">
    </div>
    <!--divcon-->
    <div class="ab imgcon">
      <!--大长腿-->
      <div v-if="imgArr[0] == 1" class="cardli card_one">
        <img class="tximg" :src="txurl">
        <img class="bodyimg" src="./assets/images/l_body_tui.png">
        <P>"大长腿"拍照卡片</P>
      </div>
      <!--秀肌肉-->
      <div v-if="imgArr[1] == 1"  class="cardli card_two">
        <img class="tximg" :src="txurl">
        <img class="bodyimg" src="./assets/images/l_body_jirou.png">
        <P>"秀肌肉"拍照卡片</P>
      </div>
      <!--蜜桃臀-->
      <div v-if="imgArr[2] == 1"  class="cardli card_three">
        <img class="tximg" :src="txurl">
        <img class="bodyimg" src="./assets/images/l_body_biv.png">
        <P>"蜜桃臀"拍照卡片</P>
      </div>
      <!--意想不到-->
      <div v-if="imgArr[3] == 1"  class="cardli card_four">
        <img class="tximg" :src="txurl">
        <img class="bodyimg" src="./assets/images/l_body_xiang.png">
        <P>"意想不到"拍照卡片</P>
      </div>
    </div>
    <!--nextbtn-->
    <div class="ab nextbtn" @click="nextImg">
      <img class="quanimg" src="./assets/images/l_nextbtn.png">
    </div>
    <!--btn-->
    <div class="ab downbtn">
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.codoon.gps&g_f=992971">
        <img class="quanimg" src="./assets/images/l_sharebtn.png">
      </a>
    </div>
  </div>
</template>

<script>
  import wxShare from './assets/scripts/wxShare';
  export default {
    name: 'share',
    components:{
    },
    data () {
      return {
        txurl:'',
        imgArr:[],
        imgtextArr:['大长腿','秀肌肉','蜜桃臀','意想不到'],
        imgli_tui:'<div class="cardli card_one"><img class="tximg" src="+'+
        this.txurl+
        '"><img class="bodyimg" src="./assets/images/l_body_tui.png"><P>"大长腿"拍照卡片</P></div>',
        imgli_jirou:'<div class="cardli card_two"><img class="tximg" src="+'+
        this.txurl+
        '"><img class="bodyimg" src="./assets/images/l_body_jirou.png"><P>"秀肌肉"拍照卡片</P></div>',
        imgli_mitun:'<div class="cardli card_three"><img class="tximg" src="+'+
        this.txurl+
        '"><img class="bodyimg" src="./assets/images/l_body_biv.png"><P>"蜜桃臀"拍照卡片</P></div>',
        imgli_xiang:'<div class="cardli card_four"><img class="tximg" src="+'+
        this.txurl+
        '"><img class="bodyimg" src="./assets/images/l_body_xiang.png"><P>"意想不到"拍照卡片</P></div>',

       }
    },
    methods: {
      preImg(){
        if($('.cardli').hasClass('act')){

        }
      },
      nextImg(){
        console.log($('.cardli').length);
      }
    },
    mounted: function () {
      //http://localhost:3000/share.html?imgArr=[0,1,1,1]&txurl=http://activity-codoon.b0.upaiyun.com/lanma-game/image/b1344b0c9c2cca1a441dc25d470602359417548e
      function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2]; return null;
      }
      var imgArr=getQueryString('imgArr');
      this.txurl=getQueryString('txurl');
//      if(parseInt(imgArr[1])==1){
//        document.getElementById('imgcon').html(this.imgli_tui);
//      }
//      if(parseInt(imgArr[3])==1){
//        document.getElementById('imgcon').append(this.imgli_jirou);
//      }
//      if(parseInt(imgArr[5])==1){
//        document.getElementById('imgcon').append(this.imgli_mitun);
//      }
//      if(parseInt(imgArr[7])==1){
//        document.getElementById('imgcon').append(this.imgli_xiang);
//      }



      this.imgArr.push(parseInt(imgArr[1]));
      this.imgArr.push(parseInt(imgArr[3]));
      this.imgArr.push(parseInt(imgArr[5]));
      this.imgArr.push(parseInt(imgArr[7]));

      //todo 二次分享
      wxShare.config({
        title: '捷克酷跑之旅·释放跑能量！勇闯6关，赢取捷克跑马护照',
        desc: '好朋友，你还在苦等欧洲签证？我已经跑完了整个“捷克”赢得跑马护照，你也来试试！',
        link: 'https://www.codoon.com/activity/v1/czech-republic/share.html',
        imgUrl: 'http://activity-codoon.b0.upaiyun.com/czech-republic/upload/share.jpg'
      });
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import './assets/styles/reset.scss';
  .prebtn{
    width: 88px;
    height: 88px;
    left: 50px;
    top:330px;
  }
  .nextbtn{
    width: 88px;
    height: 88px;
    right: 50px;
    top:330px;
  }

  .imgcon{
    width: 353px;
    height: 500px;
    /*background: red;*/
    top: 152px;
    left: 202px;
    overflow: hidden;
  }
  .cardli{
    width: 353px;
    height: 500px;
  }
  .cardli p{
    text-align: center;
    font-size: 30px;
    color: white;
    margin-top: 60px;
  }
  .tximg{
    width: 160px;
    height: 150px;
    display: block;
    position: relative;
    z-index: 50;
  }
  .card_one{
    .tximg{
      margin-left: 100px;
      margin-top: 20px;
    }
    .bodyimg{
      width: 109px;
      height: 203px;
      display: block;
      margin-left: 114px;
      margin-top: -30px;
    }
  }
  .card_two{
    .tximg{
      margin-left: 100px;
      margin-top: 20px;
    }
    .bodyimg{
      width: 174px;
      height: 192px;
      display: block;
      margin-left: 94px;
      margin-top: -50px;
    }
    p{
      margin-top: 110px;
    }
  }
  .card_three{
    .tximg{
      margin-left: 84px;
      margin-top: 20px;
    }
    .bodyimg{
      width: 216px;
      height: 221px;
      display: block;
      margin-left: 70px;
      margin-top: -80px;
    }
    p{
      margin-top: 110px;
    }
  }
  .card_four{
    .tximg{
      margin-left: 100px;
      margin-top: 20px;
    }
    .bodyimg{
      width: 174px;
      height: 192px;
      display: block;
      margin-left: 94px;
      margin-top: -30px;
    }
    p{
      margin-top: 90px;
    }
  }

  .downbtn{
    width: 526px;
    height: 74px;
    top:1050px;
    left: 112px;
  }
</style>
