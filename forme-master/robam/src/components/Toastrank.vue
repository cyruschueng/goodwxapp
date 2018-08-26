<template>
  <div class="toast toastrank">
    <!--word-->
    <div class="wordp ab">
      <!--closebtn-->
      <slot></slot>
      <!--word-->
      <div class="word ab">
        <div class="rank-con">
          <div class="rankli titli">
            <div class="li_a">排名</div>
            <div class="li_b">昵称</div>
            <div class="li_c">已消耗卡路里</div>
          </div>
          <div class="rankli" v-for="(item,$index) in rankArr.items">
            <div class="li_a">{{$index+1}}</div>
            <div class="li_b">{{item.userInfo.nick}}</div>
            <div class="li_c">{{item.calories | fixNumber}}</div>
          </div>
          <!--mine-->
          <div class="rankli myli ab">
            <div class="li_a">{{rankArr.mine}}</div>
            <div class="li_b">{{actInfo.userInfo.nick}}</div>
            <div class="li_c">{{actInfo.calories | fixNumber}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'toastrank',
  components:{

  },
  methods: {

  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      actInfo: 'actInfo',
      rankArr: 'rankArr',
    }),
  },
  mounted: function () {
    console.log(this.rankArr);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
  .wordp{
    top: 50%;
    left: 50%;
    width: 600px;
    height: 900px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    border-radius: 30px;
    .word{
      width: 600px;
      height: 900px;
      border-radius: 30px;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      box-sizing: border-box;
      background: url("./../assets/images/r_rankbg.png") no-repeat;
      .rank-con{
        width: 560px;
        height: 700px;
        margin: 0 auto;
        margin-top: 184px;
      }

    }
  }
  .rankli{
    display: flex;
    display: -webkit-flex;
    font-size: 24px;
    color: white;
    text-align: center;
    height: 58px;
    .li_a{
      width: 120px;
    }
    .li_b{
      width: 240px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .li_c{
      width: 160px;
    }
  }
  .titli{
    font-size: 26px;
  }
  .myli{
    line-height: 55px;
    color: #d7e064;
    text-align: center;
    height: 55px;
    top:826px;
  }
</style>
