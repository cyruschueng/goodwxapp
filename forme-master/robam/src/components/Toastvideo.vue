<template>
  <div class="toast toastvedio">
    <!--看视频弹窗-->
    <div class="wordp ab" v-if="showWhich==0">
      <!--closebtn-->
      <slot></slot>
      <!--word-->
      <div class="word ab">
        <p class="titword">6月11日-6月13日</p>
        <p>观看完视频，可以点亮一枚勋章</p>
        <p>同时获得一次抽奖机会哦!</p>
        <div class="video_con">
          <!--http://activity-codoon.b0.upaiyun.com/test/upload/test.mp4-->
          <!--http://activity-codoon.b0.upaiyun.com/robamvideo/upload/robam.mp4-->
          <!--webkit-playsinline="true"-->
          <video id="spvideo" src="http://activity-codoon.b0.upaiyun.com/robamvideo/upload/robam1.mp4" controls="controls" preload="auto">
            您的浏览器不支持 video 标签。
          </video>
        </div>
      </div>
    </div>
    <!--视频看完弹窗-->
    <div class="morep ab" v-if="showWhich==1">
      <!--closebtn-->
      <slot></slot>
      <!--word-->
      <div class="word ab">
        <P>前往老板电器京东自营旗舰店</P>
        <P>惊喜等着你</P>
        <img @click="lookmore" class="morebtn" src="./../assets/images/r_morebtn.png">
      </div>
    </div>
  </div>
</template>

<script>
import codoonBrige from './../assets/scripts/codoon-native-bridge';
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'toastvedio',
  components:{

  },
  methods: {
    lookmore(){
      _hmt.push(['_trackEvent', '点击视频后的那个链接', 'click', 'videoAfter'])
      var nativejs=new codoonBrige();
      nativejs.jumpNative({
        type: 'webView',
        value: 'https://sale.jd.com/m/act/UpqsFmPOBdER.html'
      }, function() {
//          alert("从打开的新页面 回来了");
      });
    },
  },
  data () {
    return {
      showWhich:0,//0-视频，1-看完视频
    }
  },
  computed: {
    ...mapGetters({
      actInfo: 'actInfo',
    }),
  },
  mounted: function () {
    var _self=this;
    var myVid=document.getElementById("spvideo");
    var spTimer = setInterval(function () {
      if(myVid.ended){
        console.log(myVid.ended);
        clearInterval(spTimer);
        _self.showWhich=1;
        var dataObj={
          whichmedia:1,
        };
        _self.$store.dispatch('getMedia',dataObj);
      }
    },1000)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
  .wordp{
    top: 50%;
    left: 50%;
    width: 600px;
    height: 570px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    background: #2a70ff;
    border-radius: 30px;
    .word{
      width: 600px;
      height: 570px;
      background: #2a70ff;
      border-radius: 30px;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      box-sizing: border-box;
      padding-top: 20px;
      background: url("./../assets/images/r_toastbg2.png") no-repeat;
      p{
        color: white;
        font-size: 32px;
        font-weight: lighter;
        text-align: center;
      }
      .titword{
        font-size: 36px;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .video_con{
        width: 500px;
        height: 295px;
        margin-top: 30px;
        padding: 0;
        video{
          width: 600px;
        }
      }
    }
  }
  .morep{
    top: 50%;
    left: 50%;
    width: 600px;
    height: 580px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    background: #2a70ff;
    border-radius: 30px;
    .word{
      width: 600px;
      height: 580px;
      background: #2a70ff;
      border-radius: 30px;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      box-sizing: border-box;
      padding: 50px 20px;
      background: url("./../assets/images/r_toastbg3.png") no-repeat;
      p{
        color: white;
        font-size: 34px;
        text-align: center;
        font-weight: lighter;
        line-height: 70px;
      }
      .morebtn{
        width: 300px;
        height: 75px;
        display: block;
        margin: 0 auto;
        margin-top: 160px;
      }

    }
  }
</style>
