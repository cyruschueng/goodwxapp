<template>
  <div class="item-container" @click="mclick">
    <img class="item-img" :src="imgUrl"/>
    <div class="item-content1">
      <div class="item-name">{{panoName}}</div>
      <div class="item-type-sky" v-show="isSky">空采</div>
      <div class="item-type-land" v-show="!isSky">地采</div>
    </div>
    <div class="item-time">{{itemTime}}</div>
  </div>
</template>
<script>
  export default {
    name: 'pcitem',
    props: {
      itemData: {
        type: Object,
        default: {}
      },
      panoName: {
        type: String,
        default: '全景名称'
      },
      itemTime: {
        type: String,
        default: '2017-10-12'
      },
      panoType: {
        type: Number,
        default: -1
      },
      imgUrl: {
        type: String,
        default: ''
      },
      panoId: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    },
    created () {
//      if (this.panoType === 1) {
//        this.isSky = true
//      } else {
//        this.isSky = false
//      }
    },
    methods: {
      mclick () {
        this.$emit('itemclick', this.panoId, this.panoName)
      }
    },
    watch: {},
    computed: {
      isSky () {
        if (this.panoType === 1) {
          return true
        } else {
          return false
        }
      }
    },
    components: {}
  }

</script>

<style lang="scss">
  .item-container {
    width: 42%;
    margin-right: 20px;
    margin-bottom: 10px;
    .item-img {
      width: 100%;
      height: 160px;
    }
    .item-content1 {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .item-name {
        color: #000;
        font-size: 13px;
      }
      .item-type-sky {
        font-size: 12px;
        color: #ffffff;
        background: #8DB7F9;
        padding: 2px 6px 2px 6px;
        border: 1px solid #8DB7F9;
        border-radius: 4px;
      }
      .item-type-land {
        font-size: 12px;
        color: #ffffff;
        background: #DEBC5F;
        padding: 2px 6px 2px 6px;
        border: 1px solid #DEBC5F;
        border-radius: 4px;
      }
    }
    .item-time {
      font-size: 12px;
      color: #dedede;
    }
  }
</style>

