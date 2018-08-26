<template>
  <div id="share-page" class="page">
    <img class="ab bgimg" src="./assets/images/r_sharebg.jpg">
    <!--bottombtn-->
    <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.codoon.gps&g_f=992971">
      <div class="joinbtn ab"><img src="./assets/images/r_sharepbtn.png"></div>
    </a>
  </div>
</template>

<script>
  import wxShare from './assets/scripts/wxShare';
  export default {
    data () {
      return  {

      }
    },
    mounted: function () {
      //wxshare
      wxShare.config({
        title: '老板电器618疯狂卡路里——趁现在，动起来！',
        desc: '纵情跑，只为放肆吃！掌控身体，纵享美食！老板电器疯狂卡路里——趁现在，动起来！',
        link: 'https://www.codoon.com/activity/v1/robam/share.html',
        imgUrl: 'http://activity-codoon.b0.upaiyun.com/robam/upload/share.png'
      });
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import './assets/styles/reset.scss';
  .joinbtn{
    width: 500px;
    height: 88px;
    left: 125px;
    top:1050px;
    img{
      width: 100%;
    }
  }
</style>
