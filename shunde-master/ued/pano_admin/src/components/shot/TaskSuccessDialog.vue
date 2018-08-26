<template>
  <my-dialog v-if="show">
    <div class="container">
      <div class="head">提示</div>
      <div class="content">
        <img src="static/green-gou.png" alt="" width="100px" height="100px">
        <p>您的拍摄要求已经提交成功</p>
        <p>我们会尽快为您处理</p>
        <p>您可在需求大厅中查看需求状态</p>
        <div class="btn-bar">
          <btn text="查看" class="b" @click="show=false"></btn>
          <btn text="确认" class="b" @click="show=false"></btn>
        </div>
      </div>
    </div>
  </my-dialog>
</template>
<script>
  import myDialog from '../space/myDialog'
  import btn from '../btn.vue'

  export default {
    components: {myDialog, btn},
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      value (v) {
        this.show = v
      },
      show (v) {
        this.$emit('input', v)
      }
    },
    data () {
      return {
        show: this.value
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.container{
  width: 300px;
  height: 320px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  .head{
    height: 40px;
    line-height: 40px;
    background: #f4f5f6;
    padding-left: 20px;
    font-size: 16px;
    color: #2a2b2c;
  }
  .content{
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      margin: 15px 0;
    }
    p{
      color: #727374;
      font-size: 15px;
      line-height: 1.5;
    }
    .btn-bar{
      align-self: stretch;
      padding: 15px 20px;
      flex: 0 0 auto;
      display: flex;
      justify-content: space-between;
      .b{
        width: 120px;
        height: 40px;
        background: #1ab0e7;
        color: #fff;
        border-radius: 4px;
        font-size: 15px;
      }
    }
  }
}
</style>
