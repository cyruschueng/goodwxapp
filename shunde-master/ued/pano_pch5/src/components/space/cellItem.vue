<template>
  <div class="cell-item">
    <div class="left">
      <img :src="icon" alt="">
    </div>
    <div class="right">
      <h3>{{title}}</h3>
      <h4>{{subTitle}}</h4>
    </div>
  </div>
</template>
<script>
 export default {
   props: ['title', 'subTitle', 'icon']
 }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../style/space";
  .cell-item{

    @include base-cell;
    height: 100px;
    border: solid 1px rgba(0, 0, 0, 0.18);
    align-items: center;
    .left{
      flex: 0 0 auto;
      width: 70px;
      height: 70px;
      background: #d3d3d3;
      border: solid 1px #b9b9b9;
      margin-left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        max-width: 45px;
      }
    }

    .right{
      flex: 1 0 0;
      h3,h4{
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        text-align:center;
        margin: 0;
      }
      h3{
        font-weight: bold;
        font-size: 26px;
        color: #6f6f6f;
        margin-bottom: 8px;
      }
      h4{
        font-weight: normal;
        font-size: 12px;
        letter-spacing: 0.9px;
        color: #9b9b9b;
      }
    }
  }

</style>
