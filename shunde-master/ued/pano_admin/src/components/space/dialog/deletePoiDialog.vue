<template>
  <my-dialog v-if="selfShow">
    <div class="alert-item">
      <div class="alert-item-top">
        <span id="top-tishi">提示</span>
      </div>
      <img src="static/space/img/alert.jpeg" alt="alert.jpeg" class="alert-img">
      <p class="main">如果已入库数据被删除，将无法恢复</p>
      <span class="sub">是否执行删除</span>
      <div class="btn-bar">
        <btn class="alert-btn" text="取消" @click="selfShow=false"></btn>
        <btn class="alert-btn" text="确认删除" @click="sure"></btn>
      </div>
    </div>
  </my-dialog>
</template>
<script>
  import myDialog from '../myDialog.vue'
  import btn from '../../btn.vue'
  export default {
    components: {myDialog, btn},
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        selfShow: this.value
      }
    },
    watch: {
      value (v) {
        this.selfShow = v
      },
      selfShow (v) {
        this.$emit('input', v)
      }
    },
    methods: {
      cancel () {
        this.$emit('cancel')
      },
      sure () {
        this.$emit('sure')
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  .alert-item{
    width: 260px;
    height: 260px;
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    .alert-item-top{
      align-self: stretch;
      height: 50px;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      #top-tishi{
        padding-left: 10px;
        font-size: 17px;
      }
    }
    .alert-img{
      width: 80px;
      height: 70px;
      margin: 20px 0px 15px 0px;
    }
    p.main{
      font-size: 14px;
      margin-bottom: 5px;
    }
    span.sub{
      font-size: 14px;
      color: #f17a34;
      margin-bottom: 20px;
    }
    .btn-bar{
      display: flex;
      align-self: stretch;
      margin: 0 15px;
      justify-content: space-between;
      .alert-btn{
        flex: 0 0 auto;
        width: 90px;
        height: 30px;
        background: #1bb1e6;
        border-radius: 3px;
        font-size: 13px;
        color: #fff;
        font-weight: 300;
      }
    }
  }
</style>
