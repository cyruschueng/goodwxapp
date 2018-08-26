<template>
  <div class="final-exam-container">
    <div class="all-exams">
      <div class="exam-item" v-for="(exam,index) in examList" :key="index">
        <div class="exam-title" @click="e => startExam(e,exam.key)">{{exam.title}}</div>  
        <div class="exam-result">{{ exam.score === null ? '待考核' : exam.score + '/' + exam.total }}</div>
      </div>  
    </div>
  </div>
</template>

<script>
import subject from '@/components/subject';
import { wxNavigateTo } from '../../utils/wechat';
// import subjectList from './data';

export default {
  data() {
    return {
      examList: [
        {
          title: '【移动销售】专题测试一',
          key: 'ceshiyi',
          score: '95分',
          total: '100分',
        },
        {
          title: '【移动销售】专题测试二',
          score: '95分',
          total: '100分',
        },
        {
          title: '【渠道管家】专题测试一',
          score: '95分',
          total: '100分',
        },
        {
          title: '【渠道管家】专题测试二',
          score: '95分',
          total: '100分',
        },
        {
          title: '【来访登记】专题测试一',
          score: null,
          total: '100分',
        },
        {
          title: '【来访登记】专题测试二',
          score: null,
          total: '100分',
        },
        {
          title: '【再现开盘】专题测试一',
          score: null,
          total: '100分',
        },
        {
          title: '【再现开盘】专题测试二',
          score: null,
          total: '100分',
        },
        {
          title: '【云行销】专题测试一',
          score: null,
          total: '100分',
        },
        {
          title: '【模拟测试一】',
          score: null,
          total: '100分',
        },
      ],
    };
  },
  components: {
    subject,
  },
  methods: {
    startExam(e, examKey) {
      wxNavigateTo(`exam/main?examId=${examKey}`);
    },
  },
};
</script>

<style lang="less">
.final-exam-container {
  min-height: 100vh;
  .all-exams {
    padding: 60rpx 40rpx 0 40rpx;
    .exam-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin: 20rpx 0;
      .exam-title {
        border: 1px solid rgba(121,121,121,1);
        padding: 10rpx;
      }
    }
  }

}

</style>
