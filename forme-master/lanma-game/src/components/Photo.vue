<template>
  <div class="page photoPage">
    <img class="bgimg" src="./../assets/images/l_startbg.jpg">
    <div class="ab photo_con">
      <!--1(上传照片)-->
      <div class="upimg_a" v-if="toastType==1">
        <!--sexbtn-->
        <div class="sexbtn">
          <img @click="chooseSex(1)" v-if="!actSex" class="boybtn" src="./../assets/images/l_boy_an.png">
          <img @click="chooseSex(2)" v-else class="boybtn" src="./../assets/images/l_boy_light.png">
          <img @click="chooseSex(1)" v-if="actSex" class="girlbtn" src="./../assets/images/l_girl_an.png">
          <img @click="chooseSex(2)" v-else  class="girlbtn" src="./../assets/images/l_girl_light.png">
        </div>
        <!--txmb-->
        <div class="txmb cutbox" id="curbox">
          <img v-if="actSex" class="quanimg" src="./../assets/images/l_mbboy.png">
          <img v-else class="quanimg" src="./../assets/images/l_mbgirl.png">
        </div>
        <!--word-->
        <div class="word">
          <img class="quanimg" src="./../assets/images/l_photoword.png">
        </div>
        <!--twobtn-->
        <div class="twobtn">
          <img id="edit_finished" src="./../assets/images/l_sureimg.png">
          <img class="upimgbtn" @click="upImg" src="./../assets/images/l_uploadimgbtn.png">
        </div>
      </div>
      <!--2(填写号码牌)-->
      <div class="upimg_b" v-if="toastType==2">
        <img class="quanimg" src="./../assets/images/l_numbg.png">
        <img class="ab tximg" :src="actInfo.tximg">
        <!--inputnum-->
        <input class="ab inputnum" type="text" v-model="trueNum" placeholder="参赛号码">
        <!--surebtn-->
        <div class="ab surebtn" @click="sureImg">确认</div>
        <!--virnum-->
        <div class="ab virnum" @click="createVirname">没有参赛，生成虚拟号码</div>
      </div>
      <!--3(定妆照)-->
      <div class="upimg_c" v-if="toastType==3">
        <img class="quanimg" src="./../assets/images/l_finalbg.png">
        <!--头像-->
        <div class="ab tximg">
          <img class="quanimg" :src="actInfo.tximg">
        </div>
        <!--号码牌-->
        <div class="ab num_pai" v-if="actInfo.num_status == 1"><span>{{actInfo.lanma_num}}</span></div>
        <div class="ab num_pai" v-if="actInfo.num_status == 2"><span>{{actInfo.virtual_num}}</span></div>
        <!--changeimg-->
        <div class="ab changeimg" @click="changeImg"><span>· 再换一张 ·</span></div>
        <!--startgame-->
        <router-link to="game">
          <div class="ab startgame">
            <img class="quanimg" src="./../assets/images/l_startbtn2.png">
          </div>
        </router-link>
      </div>
    </div>
    <!--bottombtn-->
    <Botoombtn></Botoombtn>
  </div>
</template>

<script>
import imgCutjs from './../assets/scripts/jquery.ImageCutnew'
import Bridge from './../assets/scripts/codoon-native-bridge';
import Botoombtn from './Botoombtn.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'photo',
  components:{
    Botoombtn,//底部按钮
  },
  data () {
    return {
      actSex:true,//true-选中的是男孩，false-选中的是女孩
      trueNum:"",//
    }
  },
  methods: {
    chooseSex(num){
      if(num==1){
        if(this.actSex){
          this.actSex=false;
        }else {
          this.actSex=true;
        }
      }

    },
    upImg(){
      //test
      this.canvasImg("http://activity-codoon.b0.upaiyun.com/test/upload/l_people.png");
//        this.$store.dispatch('uploadImg',{'url':'http://activity-codoon.b0.upaiyun.com/sealy/upload/share.png'});

//      var _self=this;
//      var native = new Bridge();
//      native.nativeUploadImg(function(err, response) {
//        if (err) {
//          if(err == -1){
//            _self.setDialog({time: 1000, msg: '上传图片错误，请稍后操作'})
//          }
//        } else {
//          _self.$store.dispatch('uploadImg',{'url':response.imgUrl[0]});
//          console.log(response.imgUrl[0]);
//          _self.canvasImg(response.imgUrl[0]);
//        }
//      })

    },
    canvasImg(userimg){
      //图
      var _self=this;
      var cavasimg;
      if(this.actSex){//boy
        cavasimg='http://activity-codoon.b0.upaiyun.com/test/upload/l_mbboy.png'
      }else {
        cavasimg='http://activity-codoon.b0.upaiyun.com/test/upload/l_mbgirl.png'
      }
      $('.curbox').html='';
//      url:'http://activity-codoon.b0.upaiyun.com/test/upload/l_people.png',
//      mask:'http://activity-codoon.b0.upaiyun.com/test/upload/l_mbboy.png',
      $('.cutbox').imageCut({//userimg
        w:396,
        h:444,
        url:userimg,
        mask:cavasimg,
        sureDom:$('#edit_finished'),
        callback:function(ret){
          console.log(ret);
          _self.$store.dispatch('uploadImg',{'url':ret});
        }
      });
    },
    changeImg(){
      this.$store.dispatch('whickToast',{isShowlot:false,type:1});
    },
    sureImg(){
      if(this.trueNum.length == '4'){
        this.$store.dispatch('tjTruenum',{'gamenum':this.trueNum});
      }else {
        return this.setDialog({time: 2000, msg: '参赛号码没有填写对哦！'})
      }
    },
    createVirname(){
      console.log('生成虚拟码');
      this.$store.dispatch('getVirnum');
    },
    ...mapActions({
      setDialog: 'setDialog',
      setMum: 'setMum'
    })
  },
  computed: {
    ...mapGetters({
      actInfo: 'actInfo',
      isShowlot:'isShowlot',
      toastType:'toastType',
    }),
  },
  mounted: function () {
    console.log(this.actInfo);

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
  .photo_con{
    width: 580px;
    height: 940px;
    top:60px;
    left: 85px;
  }
  .upimg_a{
    width: 580px;
    height: 940px;
    box-sizing: border-box;
    border-radius: 20px;
    border: 5px solid #1e2356;
    background: white;
    .sexbtn{
      width: 100%;
      height: 80px;
      margin-top: 30px;
      text-align: center;
      img{
        width: 75px;
        height: 75px;
      }
      .girlbtn{
        margin-left: 40px;
      }
    }
    .txmb{
      width: 396px;
      height: 444px;
      margin-left: 92px;
      margin-top: 20px;
    }
    .word{
      width: 386px;
      height: 206px;
      margin-top: -30px;
      margin-left: 97px;
    }
    .twobtn{
      text-align: center;
      margin-top: 50px;
      img{
        width: 202px;
        height: 62px;
      }
      .upimgbtn{
        margin-left: 40px;
      }
    }
  }
  .upimg_b{
    .tximg{
      width: 300px;
      height: 320px;
      left: 140px;
      top:90px;
    }
    .inputnum{
      width: 260px;
      height: 44px;
      top:670px;
      left: 240px;
      font-size: 30px;
      line-height: 44px;
      color: #1e2356;
    }
    .surebtn{
      width: 160px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      color: white;
      background: #1e2356;
      font-size: 26px;
      top:740px;
      left: 210px;
    }
    .virnum{
      width: 500px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      color: #1e2356;
      border: 2px dotted #1e2356;
      border-radius: 10px;
      font-size: 30px;
      top:800px;
      left: 40px;
      box-sizing: border-box;
    }
  }
  .upimg_c{
    .tximg{
      width: 300px;
      height: 320px;
      left: 140px;
      top:100px;
    }
    .changeimg{
      width: 580px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 36px;
      color: #1e2356;
      top:750px;
    }
    .startgame{
      width: 250px;
      height: 74px;
      top:810px;
      left: 165px;
    }
    .num_pai{
      width: 88px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #1e2356;
      background: white;
      font-size: 30px;
      top: 398px;
      left: 246px;
    }
  }

</style>
