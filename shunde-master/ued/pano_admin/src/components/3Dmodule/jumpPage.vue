<template>
  <div id="bottomContainer">
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="10"
      v-show="isShowBottom">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name: 'jumpPage',
    props: {
      total: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        isShowBottom: false
      }
    },
    created () {
      if (this.total > 10) {
        this.isShowBottom = true
      } else {
        this.isShowBottom = false
      }
    },
    watch: {
      total (value) {
        if (value > 10) {
          this.isShowBottom = true
        } else {
          this.isShowBottom = false
        }
      }
    },
    methods: {
      handleCurrentChange (val) {
        this.$emit('jumpclick', val)
      }
    }
  }
</script>
<style lang="scss">
  #bottomContainer {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>
