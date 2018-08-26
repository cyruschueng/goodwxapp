<template>
  <div class="item-container">
    <div class="item-head">
      序号: {{num1}}
    </div>
    <div class="item">
      poi名称: {{item.poi.name}}
    </div>
    <div class="item-btn" @click="watchPano">
      查看全景
    </div>

  </div>
</template>
<script>
  export default{
    created () {
    },
    props: {
      num: Number,
      itemData: {
        type: Object,
        default: function () {
          return {name: '', poiId: ''}
        }
      }
    },
    data () {
      return {
        num1: this.num,
        item: this.itemData
      }
    },
    methods: {
      watchPano () {
        this.$emit('watchpano')
      }
    },
    watch: {
      itemData (value) {
        this.item = value
      }
    },
    mounted () {
    }
  }

</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .item-container {
    width: 98%;
    padding-left: 5px;
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .item-head {
      width: 50px;
      font-size: 15px;
    }
    .item {
      width: 150px;
      font-size: 15px;
      margin-left: 20px;
    }
    .item-btn {
      font-size: 12px;
      margin-left: 20px;
      padding: 4px 7px;
      border: 1px solid #dedede;
      cursor: pointer;
      border-radius: 2px;
    }
    .item-btn:hover {
      font-size: 12px;
      margin-left: 20px;
      padding: 4px 7px;
      background: #dedede;
      border: 1px solid #dedede;
      border-radius: 2px;
    }
  }

</style>
