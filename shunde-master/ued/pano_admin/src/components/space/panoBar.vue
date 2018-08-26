<template>
  <div id="barContainer">
    <el-button id="changeRoad" v-show="!isEmpty" @click="changeRoad">
      查看poi
    </el-button>

    <div v-show="!isEmpty" id="rightBtnContainer">
      <img id="allStop" v-bind:src="this.playStatus ? './static/pause.png' : './static/play.png'" v-on:click="stop"/>
      <img id="moreBig" src="../../../static/moreBig.png" v-on:click="jumpAllPano"/>
      <img id="vrBtn" src="../../../static/vr_btn.png" v-on:click="vr"/>
    </div>
  </div>
</template>
<script>
  export default{
    created () {
    },
    props: {
      isEmpty: Boolean,
      panoId: {
        type: String,
        default: ''
      },
      panoName: {
        type: String,
        default: ''
      },
      gridCode: {
        type: String,
        default: ''
      },
      leftCode: {
        type: Number,
        default: -1
      },
      rightCode: {
        type: Number,
        default: -1
      },
      markerList: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        playStatus: false
      }
    },
    methods: {
      jumpAllPano () {
        this.$router.push({
          path: '/allPano',
          name: 'allPano',
          params: {
            panoId: this.panoId,
            panoName: this.panoName,
            gridCode: this.gridCode,
            leftCode: this.leftCode,
            rightCode: this.rightCode,
            markerList: this.markerList
          }
        })
      },
      stop () {
        this.$emit('pbclick')
        this.playStatus = !this.playStatus
      },
      vr () {
        this.$emit('vrclick')
        this.playStatus = false
      },
      changeRoad () {
        this.$emit('changeRoadClick')
      }
    },
    mounted () {
    }
  }

</script>
<style scoped lang="scss" rel="stylesheet/scss">
  #barContainer {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center; /*垂直居中*/
    justify-content: space-between;
  }

  #changeRoad {
    flex: 0 0 auto;
    margin-left: 20px;
    display: inline-block;
    border-radius: 5px;
    padding: 5px 8px 5px 8px;
    width: auto;
    height: auto;
    font-size: 13px;
    border: 1px solid #00aeff;
    color: #00aeff;
  }

  #rightBtnContainer {
    display: flex;
    margin-right: 20px;
    width: auto;
    height: 50px;
    align-items: center; /*垂直居中*/
  }

  #vrBtn {
    width: 25px;
    height: auto;
    margin-left: 10px;
  }

  #moreBig {
    width: 25px;
    height: auto;
    margin-left: 10px;
  }

  #allStop {
    width: 25px;
    height: auto;
    margin-left: 10px;
  }

</style>
