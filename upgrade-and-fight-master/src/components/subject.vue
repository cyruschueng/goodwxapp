<template>
  <div class="hourglass-subject-wrap">
    <div class="hourglass-subject-progress" v-if="type === 1">
      <div>
        <span :style="{width: width + '%'}"></span>
      </div>
      <span>{{currentSubjectOrder}}/10</span>
    </div>
    <div class="hourglass-subject-progress2" v-if="type === 2">
      <div class="hourglass-subject-pg">
        <span></span>
      </div>
      <head-photo :user-info="userInfo"></head-photo>
      <div class="hourglass-subject-time">
        <i class="icon icon-hourglass2"></i>
        <span>{{time}}S</span>
      </div>
      <head-photo :user-info="userInfo"></head-photo>
      <div class="hourglass-subject-pg">
        <span></span>
      </div>
    </div>
    <div class="hourglass-subject-content" v-for="(subject, index) in subjectList" :key="index" v-if="currentSubjectOrder == subject.order">
      <div class="hourglass-subject-content-title">
        {{subject.order}}、{{subject.title}}
      </div>
      <ul class="hourglass-subject-content-item">
        <li v-for="(item, itemIndex) in subject.list" :key="itemIndex" >
          <div :class="[currentItem === itemIndex ? clsName : '']" @click="selectHandler(item, itemIndex, subject.order)">{{item.label}} {{item.answer}}</div>
          <span v-show="select && currentItem == itemIndex">
            <i v-if="isCorrect" class="icon icon-check1" style="color:#35d87f"></i>
            <i v-else class="icon icon-error" style="color:#ff455b"></i>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 答题
import headPhoto from '@/components/head-photo';

export default {
  name: 'subject',
  computed: {
    width() {
      return `${(this.currentSubjectOrder / 10) * 100}`;
    },
  },
  components: {
    headPhoto,
  },
  props: {
    subjectList: Array,
    select: Boolean,
    result: Number,
    currentSubjectOrder: Number,
    currentItem: [Number, String],
    type: Number,
    userInfo: Object,
    time: Number,
    isCorrect: Boolean,
    clsName: String,
  },
  data() {
    return {};
  },
  methods: {
    selectHandler(item, index, order) {
      this.$emit('selectEmit', { item, index, order });
    },
  },
  mounted() {
    console.log(this.subjectList);
  },
};
</script>

<style lang="less" scoped>
@import '../assets/less/index.less';
@import '../assets/iconfont/iconfont.wxss';
  .hourglass-subject-wrap {
    width: 100%;
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
  }
  .hourglass-subject-progress {
    flex: 0 0 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;
    >div {
      flex: 0 0 84%;
      height: 6px;
      background-color: @color-shallow-gray;
      span {
        display: block;
        width: 0%;
        height: 6px;
        background-color: @color-progress;
      }
    }
    >span {
      flex: 0 0 16%;
      font-size: 14px;
      text-align: center;
    }
  }

  .hourglass-subject-progress2 {
    flex: 0 0 160px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 20px;
    .hourglass-subject-pg {
      flex: 0 0 4px;
      height: 140px;
      background-color: @color-shallow-gray;
      transform: rotate(180deg);
      span {
        display: block;
        width: 6px;
        height: 10px;
        background-color: @color-progress;
      }
    }

    .hourglass-subject-time {
      i {
        display: block;
        font-size: 30px;
        margin-bottom: 10px;
      }
    }
  }

  .hourglass-subject-content {
    flex: 0 0 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    .hourglass-subject-content-title {
      flex: 0 0 100px;
      line-height: 30px;
    }
    .hourglass-subject-content-item {
      flex: 1 0 auto;
      display: flex;
      width: 100%;
      flex-direction: column;
      li {
        display: flex;
        margin-bottom: 20px;
        div {
          flex: 0 0 86%;
          border: 1px solid @color-black;
          font-size: 14px;
          cursor: pointer;
          padding: 10px 2px;
        }
        span {
          flex: 0 0 14%;
          text-align: center;
          i {
            font-size: 26px;
          }
        }

        .active {
          background-color: #35d87f;
        }

        .error {
          background-color: #ff455b;
        }
      }
    }

  }
</style>