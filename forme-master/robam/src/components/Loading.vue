<template>
  <transition name="move">
    <div class="loading" v-if="show">
      <!--people-->
      <div class="div-con">
        <div class="divout">
          <div class="divin" v-bind:style="{width: temp+'%'}"></div>
        </div>
        <p class="loadingword">loading...</p>
        <p class="ab per">{{temp}} %</p>
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
        temp: 0
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
    /*background: #06285a;*/
    background: url("./../assets/images/r_loadingbg.jpg");
    background-size: cover;
    background-color: rgba(0,0,0,0.5);
  }
  .div-con{
    width: 550px;
    height: 100px;
    margin: 0 auto;
    text-align: center;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    /*background: red;*/
    border-radius: 20px;
  }
  .divout{
    width: 550px;
    height: 20px;
    background: #38537b;
    border-radius: 20px;

  }
  .divin{
    width: 0;
    height: 20px;
    border-radius: 20px;
    background: #eae73d;
  }
  .loadingword{
    font-size: 40px;
    color: white;
    margin-top: 30px;
  }
  .per{
    width: 100px;
    top:0px;
    left: 540px;
    color: white;
    font-size: 24px;
  }



</style>
