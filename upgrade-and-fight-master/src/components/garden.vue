<template>
  <div class="garden-wrap" :style="{left: left}" @click="linkTo(order)">
    <div class="garden-content">
      {{order}}
      <div class="garden-lock" v-if="!starts">
        <i class="icon icon-lock3suo"></i>
      </div>
    </div>
    <ul class="garden-star clearfix">
      <li class="f-l" v-if="starts" v-for="(item, index) in newStarts" :key="index">
        <i class="icon" :class="item >= 1 ? 'icon-star1' : 'icon-star_half'"></i>
      </li>
    </ul>
  </div>
</template>

<script>
// 闯关导航
export default {
  name: 'garden',
  props: {
    order: Number,
    starts: [Number, String],
    left: Number,
  },
  computed: {
    newStarts() {
      let arr;
      const isInt = parseInt(this.starts, 10) === this.starts;
      if (isInt) {
        arr = new Array(this.starts || 0).fill(1);
      } else {
        arr = new Array(parseInt(this.starts || 0, 10)).fill(1);
        arr.push(0.5);
      }
      return arr;
    },
  },
  methods: {
    linkTo(order) {
      this.$emit('linkTo', order);
    },
  },
};
</script>

<style lang="less" scoped>
@import '../assets/less/index.less';
@import '../assets/iconfont/iconfont.wxss';
  .garden-wrap {
    position: relative;
    width: 160px;
    height: 60px;
    margin-top: 30px;
    .garden-content {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid @color-black;
      text-align: center;
      line-height: 40px;
      transform: translate(-50%, -60%);
      background-color: #fff;
    }

    .garden-lock {
      position: absolute;
      right: -5px;
      bottom: -10px;
    }

    .garden-star {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 0);
    }
  }
</style>


