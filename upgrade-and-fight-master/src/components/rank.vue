<template>
  <div class="rank-wrap">
    <ul class="rank-tab">
      <li v-for="(item, index) in tabs" :key="index" @click="tabChange(index)">{{item}}</li>
    </ul>
    <ul class="rank-content">
      <li v-for="(item, index) in items" :key="index">
        <span>{{item.order}}</span>
        <span>
          <img v-if="item.url" :src="item.url" alt="头像">
          <i v-else class="icon icon-LC_icon_photo_fill rank-content-icon"></i>
        </span>
        <span>{{item.name}}</span>
        <span>{{item.rate}}</span>
        <span class="rank-content-star">{{item.score}}<i class="icon icon-star1"></i></span>
      </li>
    </ul>
  </div>
</template>

<script>
// 排行榜
export default {
  name: 'rank',
  props: {
    tabs: Array,
    items: Array,
  },
  methods: {
    tabChange(index) {
      this.$emit('tabchange', index);
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../assets/less/index.less';
  @import '../assets/iconfont/iconfont.wxss';

  .rank-wrap {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin-top: 20px;
    background-color: @color-shallow-gray;
    .rank-tab {
      flex: 0 0 45px;
      display: flex;
      width: 100%;
      justify-content: space-around;
      li {
        flex: 0 0 100px;
        width: 45px;
        line-height: 45px;
        border: 1px solid @color-bdr;
        text-align: center;
        background-color: @color-white;
      }
    }

    .rank-content {
      flex: 1 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      li {
        flex: 0 0 50px;
        display: flex;
        width: 100%;
        line-height: 50px;
        justify-content: space-around;
        font-size: 16px;

        .rank-content-star {
          display: flex;
          i {
            font-size: 22px;
            margin-left: 5px;
          }
        }

        .rank-content-icon {
          font-size: 40px;
        }
      }
    }
  }


</style>


