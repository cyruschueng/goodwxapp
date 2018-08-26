<template>
  <div class="shot-container">
    <div class="header">
      <div>
        <div class="center">
          <div class="inputBox">
            <input :placeholder="header.search.placeholder" v-model='searchWord' @keyup.enter.stop="reStartSearch"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'component-shot',
  components: {
  },
  data () {
    return {

    }
  },
  created () {
  },
  methods: {
    reStartSearch () {
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  $margin: 24px;
  .header{
    margin:0 $margin;
    padding:20px 0px;
    border-bottom:1px solid #dedede;
  >div{
     display: flex;
     flex-wrap: nowrap;
     height:24px;
    .center{
      flex:1;
      display:flex;
      flex-wrap:nowrap;
      justify-content: center;
      .inputBox{
        width:240px;
        border:1px solid #9b9b9b;
        border-radius:2px;
        overflow: hidden;
        display:flex;
        flex-wrap:nowrap;
        flex-flow:row;
      }
      input{
        margin-left:10px;
        flex:1;
      }
    }
   }
  }
</style>
