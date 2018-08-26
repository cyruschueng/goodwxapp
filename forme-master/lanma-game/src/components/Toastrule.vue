<template>
  <div class="toast toastrule">
    <!--word-->
    <div class="wordp ab">
      <!--closebtn-->
      <slot></slot>
      <!--word-->
      <div class="word ab">
        <img class="ab bgimg" src="./../assets/images/l_rulebg.png">
        <div class="ab word-con">
          <P><span>活动时间：</span>6.5-6.11</P>
          <P><span>活动形式：</span></P>
          <P>手指跑步游戏，1分钟内用两只手指连续点击屏幕，每点击1次代表跑步0.5km；</P>
          <P>游戏期间，点击随机出现的照相机，即可获得额外加时或照相卡片。</P>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toastrule',
  components:{

  },
  methods: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  mounted: function () {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
  .wordp{
    top: 50%;
    left: 50%;
    width: 562px;
    height: 799px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    .word{
      width: 562px;
      height: 799px;
      img{
        width: 562px;
        height: 799px;
      }
      .word-con{
        width: 462px;
        height: 700px;
        top:220px;
        left: 50px;
        p{
          color: #01002e;
          font-size: 32px;
          span{
            color: #ff5555;
          }
        }
      }
    }
  }
</style>
