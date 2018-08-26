<template>
  <transition name="move">
    <div class="loading" v-if="show">
      <img class="ab loadingbg" src="./../assets/images/l_loadingbg.jpg">
      <!--loadingbg-->
      <div class="loadingcon">
        <img class="ab camera" v-bind:style="{left: leftpx+'px'}" src="./../assets/images/l_camera.png">
        <!--jingdu-->
        <div class="jingdu_out">
          <div class="jingdu_in" v-bind:style="{width: temp+'%'}"></div>
        </div>
        <p class="loadingword">loading...</p>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import imgList from '../assets/scripts/loadimg.js'
  export default {

    data () {
      return {
        show: true,
        progress: 0,
        temp: 0,
        leftpx:-100,
      }
    },

    mounted () {
      var _self = this
      let list = imgList.list
      let images = []
      let len = list.length;
      let count = 0;

      if (len > 0) {
        list.forEach((item) => {
          let imgUrl = require('../assets/images/' + item);
          let img = document.createElement('img');
          img.crossOrigin = "Anonymous"
          img.src = imgUrl;
          images.push(img);
        })
      }

      let bgUrl = require('../assets/images/logo.png')
      let bgImg = document.createElement('img')
      bgImg.src = bgUrl

      bgImg.onload = () => {

        var timer = window.setInterval( ()=>{

          images.forEach(function(img, index){
            if(img.complete){
              count = count + 1
              images.splice(index, 1)
            }
          })

          _self.progress = parseInt(count * 100 / len)

          if (_self.temp < _self.progress - 1) {

            _self.temp += 2
            _self.leftpx+=10.8

          }

          if(_self.progress >= 100 && _self.temp >= _self.progress - 1){

            window.clearInterval(timer)

            window.setTimeout(function(){

              _self.show = false

              _self.$emit('showView', true)

            }, 500)

          }
        }, 33)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .loading {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 97;
    width: 100%;
    position: fixed;
  }
  .loadingbg{
    width: 100%;
    height: 100%;
  }
  .loadingcon{
    width: 550px;
    height: 266px;
    margin: 0 auto;
    text-align: center;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }
  .camera{
    width: 150px;
    height: 146px;
    top:0px;
    left: -100px;
    /*left: 440px;*/
  }
  .jingdu_out{
    width: 550px;
    height: 20px;
    border-radius: 20px;
    border: 2px solid #1e2356;
    margin-top: 146px;
  }
  .jingdu_out .jingdu_in{
    width: 0%;
    height: 100%;
    background: #1e2356;
  }
  .loadingword{
    font-size: 30px;
    color: #1e2356;
    margin-top: 30px;
  }

</style>
