<template>
  <div class="page">
    <img class="bgimg" src="./assets/images/l_sharetopbg.jpg">
    <!--rank-con-->
    <div class="ab rank_con">
      <div class="rank_li" v-for="(item,$index) in rankArr">
        <p class="td_a">{{$index+1}}</p>
        <p class="td_b">昵称:{{item.userInfo.nick}}</p>
        <p class="td_c">1分钟完成</p>
        <p class="td_d">{{item.nowGrade}}km</p>
      </div>
    </div>
    <!--mygrade-->
    <div class="ab mygrade">
      <p>我1分钟完成{{score}}KM</p>
      <p>{{sharewordArr[wordnum]}}</p>
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
  import urlApi from './assets/scripts/interface'
  import wxShare from './assets/scripts/wxShare'
  import axios from 'axios'
  import mapTrack from 'map-track';
  export default {
    data () {
      return {
        sharewordArr:['分分钟练就一指禅神功~','用力过猛点断手','全力以赴屏幕差点戳个洞','水土都不服我就服我自己'],
        wordnum:0,
        score:0,
        rankArr:[],
      }
    },
    mounted () {
      //http://localhost:3000/sharerouter.html?word=0&score=900
      //获取参数
      function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2]; return null;
      }
      var word=getQueryString('word');
      var score=getQueryString('score');
      this.wordnum=word;
      this.score=score;

      axios.get("//www.codoon.com/activity/v1/lanma-game/user/gradetop").then((res)=>{
        if(res.status){
          this.rankArr=res.data.data.items;
        }else {
//          alert(res.description);
        }
      }).catch((error)=>{
//        alert(error);
      })
      //todo 二次分享
      //wxshare
//      wxShare.config({
//        title: '捷克酷跑之旅·释放跑能量！勇闯6关，赢取捷克跑马护照',
//        desc: '好朋友，你还在苦等欧洲签证？我已经跑完了整个“捷克”赢得跑马护照，你也来试试！',
//        link: "https://www.codoon.com/activity/v1/czech-republic/sharerouter.html?routerid="+routerid+"&racename="+racename+"&mediaimg="+mediaimg+"&cerimg="+cerimg,
//        imgUrl: 'http://activity-codoon.b0.upaiyun.com/czech-republic/upload/share.jpg'
//      });

    }
  }
</script>

<style lang="scss" rel="stylesheet">
  @import './assets/styles/reset.scss';
  .rank_con{
    width: 450px;
    height: 500px;
    top:230px;
    left: 160px;
  }
  .rank_li{
    width: 450px;
    height: 46px;
    color: #1f1e56;
    display: flex;
    display: -webkit-flex;
    font-size: 24px;
    line-height: 46px;
  }
  .td_a{
    width: 40px;
  }
  .td_b{
    width: 180px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .td_c{
    width: 120px;
  }
  .td_d{
    width: 100px;
  }

  .mygrade{
    width: 518px;
    height: 108px;
    top: 775px;
    left: 125px;
    text-align: center;
    color: #1e2356;
    font-size: 30px;
  }
  .downbtn{
    width: 526px;
    height: 74px;
    top:1100px;
    left: 112px;
  }
</style>