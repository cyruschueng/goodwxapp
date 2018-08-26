<template>
  <div id="space-cell">
    <div id="left">
      <div id="left-head">
        <select v-model="selected">
          <option v-for="option in options" :value="option.value">
            {{ option.text }}
          </option>
        </select>
        <div>
          <input type="checkbox" id="checkbox" v-model="showCell">
          <label for="checkbox">显示网格号</label>
        </div>
      </div>
      <div class="line"></div>
      <map-view :show-grid-number="showCell"></map-view>
    </div>
    <div id="right">
      <h2>网格</h2>
      <div class="line"></div>
      <div class="cell-item-container">
        <cell-item :title="totalPoiCount" sub-title="Poi全景点数共计" class="space-cell-item"></cell-item>
        <cell-item :title="skyPoiCount" sub-title="空中全景数量" class="space-cell-item"></cell-item>
        <cell-item :title="groundPoiCount" sub-title="地面全景数量" class="space-cell-item"></cell-item>
      </div>
    </div>
  </div>
</template>
<script>
  import cellItem from './cellItem.vue'
  import mapView from './map.vue'
  export default {
    components: {
      cellItem,
      mapView
    },
    created () {
//      console.log(this.$router.history.current.path)
    },
    data () {
      return {
        totalPoiCount: 120,
        skyPoiCount: 99,
        groundPoiCount: 21,
        selected: 'all',
        options: [
          { text: '行政区域', value: 'all' },
          { text: 'One', value: 'A' },
          { text: 'Two', value: 'B' },
          { text: 'Three', value: 'C' }
        ],
        showCell: false
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  #space-cell{
    flex: 0 0 auto;
    height: 500px;
    /*width: 100%;*/
    /*max-width: 1200px;*/
    /*min-width: 1080px;*/
    width: 1200px;
    margin: 50px auto;
    display: flex;
    $cell-border-color: rgba(0,0,0,0.06);
    $cell-border: 1px solid $cell-border-color;

    #left{
      flex: 0 0 auto;
      width: 452px;
      /*padding: 0 10px 10px 10px;*/
      border-radius: 3px;
      background-color: #ffffff;
      box-shadow: 0px 6px 12px 0 rgba(4, 0, 0, 0.06);
      border:  $cell-border;
      display: flex;
      flex-direction: column;
      margin-right: 40px;
    }
    $head-height: 50px;
    #right{
      flex: 1 0 0;
      h2{
        height: $head-height;
        font-size: 21px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: $head-height;
        letter-spacing: 1.1px;
        color: #373737;
        margin: 0;
      }
    }
    #left-head{
      height: $head-height;
      flex: 0 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 25px;

      label{
        font-size: 12px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 0.3px;
        text-align: left;
        color: #9b9b9b;
      }
    }
    .line{
      flex: 0 0 auto;
      height: 1px;
      background:#dedede;
      margin-bottom: 18px;
    }
    .cell-item-container{
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      .space-cell-item{
        width: 200px;
        height: 88px;
      }
    }
  }

  /*@media (max-width: 1116px) {*/
    /*.space-cell-item{*/
      /*width: 280px!important;*/
      /*margin-bottom: 20px;*/
    /*}*/
  /*}*/

</style>
