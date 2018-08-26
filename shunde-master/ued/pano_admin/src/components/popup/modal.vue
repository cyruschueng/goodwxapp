<template>
  <div class="mod" v-show="selfShow">
    <div class="mod-head">
      <span>全景需求单</span>
      <i class="iconfont icon-guanbi" @click="selfShow=false"></i>
    </div>
    <div class="mod-content">
      <div class="item">
        <span class="item-head">单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</span>
        <span class="item-content">{{item.orderNo}}</span>
      </div>
      <div class="item">
        <span class="item-head">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</span>
        <span class="item-content" style="color: #1ab0e7;">{{item.status?config.select.status[item.status].label: ""}}</span>
      </div>
      <div class="item">
        <span class="item-head">需求用户:</span>
        <span class="item-content">{{item.createUserName}}</span>
      </div>
      <div class="item">
        <span class="item-head">单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位:</span>
        <span class="item-content">{{item.departmentName}}</span>
      </div>
      <div class="item">
        <span class="item-head">目标全景点Poi名称:</span>
        <span class="item-content">{{item.poiName}}</span>
      </div>
      <div class="item">
        <span class="item-head">经&nbsp;&nbsp;纬&nbsp;&nbsp;度:</span>
        <span class="item-content">【{{item.longitude}}】【{{item.latitude}}】</span>
      </div>
      <div class="item">
        <span class="item-head">属&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地:</span>
        <span class="item-content">{{item.provinceName}}{{item.cityName}}{{item.countyName}}{{item.areaName}}</span>
      </div>
      <div class="item">
        <span class="item-head">网格号码:</span>
        <span class="item-content">【{{item.longitude}}】【{{item.latitude}}】</span>
      </div>
      <div class="item">
        <span class="item-head">拍摄方式:</span>
        <span class="item-content">{{item.shotMode?config.shotMode[item.shotMode]:""}}</span>
      </div>
      <div class="item">
        <span class="item-head">拍摄高度:</span>
        <span class="item-content">{{item.shotHeight}}米</span>
      </div>
      <div class="item">
        <span class="item-head">期望完成日期:</span>
        <span class="item-content">{{$utils.format(new Date(item.expectDate),'yyyy-MM-dd hh:mm:ss')}}</span>
      </div>
      <div class="item">
        <span class="item-head">具体需求描述:</span>
        <span class="item-content">{{item.description}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { config } from '../../pages/shot/config'
  import Popup from './Popup'
  export default {
    mixins: [Popup],
    data () {
      return {
        config: config
      }
    },
    props: {
      item: {
        type: Object,
        default: function () {
          return null
        }
      }
    },
    methods: {
      overlayClick () {
        this.selfShow = false
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .mod{
    position: absolute;
    top: 120px;
    left: 0;
    right: 0;
    width: 300px;
    margin: 0 auto;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    .mod-head{
      height: 40px;
      background: #f4f5f6;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      font-size: 15px;
    }
    .mod-content{
      padding: 0 15px;
      .item{
        margin: 5px 0;
        .item-head{
          color: #a1a1a2;
        }
      }
    }
  }
</style>
